/**
 * Cloudflare Worker — Contact Form Proxy
 * ────────────────────────────────────────
 * Deploy this at: https://dash.cloudflare.com → Workers & Pages → Create Worker
 *
 * Set these as Worker Environment Variables (NOT in code):
 *   BOT_TOKEN  = your Telegram bot token
 *   CHAT_ID    = your Telegram chat ID
 *   ALLOWED_ORIGIN = https://yourdomain.com  (your actual domain)
 *
 * How to deploy:
 *   1. Go to dash.cloudflare.com → Workers & Pages → Create application → Create Worker
 *   2. Paste this entire file into the editor
 *   3. Click Settings → Variables → Add:
 *        BOT_TOKEN  (Secret)
 *        CHAT_ID    (Secret)
 *        ALLOWED_ORIGIN (Plain text) e.g. https://adityagarasangi.in
 *   4. Save and deploy
 *   5. Copy your Worker URL (e.g. https://contact.yourname.workers.dev)
 *   6. Set WORKER_URL in main.js to that URL
 */

// ── Rate limiting store (in-memory per isolate, resets on cold start)
const rateLimitMap = new Map();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX       = 3;      // max 3 requests per IP per window

export default {
  async fetch(request, env) {

    // ── CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse('', 204, env);
    }

    // ── Only accept POST
    if (request.method !== 'POST') {
      return corsResponse(JSON.stringify({ ok: false, error: 'Method not allowed' }), 405, env);
    }

    // ── Origin check
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    if (allowed && origin !== allowed) {
      return corsResponse(JSON.stringify({ ok: false, error: 'Forbidden' }), 403, env);
    }

    // ── IP-based rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, windowStart: now };

    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      entry.count = 0;
      entry.windowStart = now;
    }

    entry.count++;
    rateLimitMap.set(ip, entry);

    if (entry.count > RATE_LIMIT_MAX) {
      return corsResponse(
        JSON.stringify({ ok: false, error: 'Too many requests. Please wait a minute.' }),
        429, env
      );
    }

    // ── Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return corsResponse(JSON.stringify({ ok: false, error: 'Invalid request body' }), 400, env);
    }

    const { name, email, message, _hp } = body;

    // ── Honeypot check (bots fill hidden fields)
    if (_hp && _hp.length > 0) {
      // Silently accept to fool bots, but don't actually send
      return corsResponse(JSON.stringify({ ok: true }), 200, env);
    }

    // ── Field validation
    if (!name || !email || !message) {
      return corsResponse(JSON.stringify({ ok: false, error: 'All fields are required.' }), 400, env);
    }

    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return corsResponse(JSON.stringify({ ok: false, error: 'Input exceeds maximum length.' }), 400, env);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return corsResponse(JSON.stringify({ ok: false, error: 'Invalid email address.' }), 400, env);
    }

    // ── Sanitize: strip HTML/Markdown injection attempts
    const clean = (str) => str.replace(/[<>*`\\]/g, '').trim();
    const safeName    = clean(name);
    const safeEmail   = clean(email);
    const safeMessage = clean(message);

    // ── Build Telegram message
    const text = [
      '📬 *New Portfolio Message*',
      '───────────────────',
      `👤 *Name:* ${safeName}`,
      `📧 *Email:* ${safeEmail}`,
      '',
      '💬 *Message:*',
      safeMessage,
      '───────────────────',
      '_Sent via portfolio contact form_',
    ].join('\n');

    // ── Forward to Telegram
    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (!tgRes.ok) {
        const err = await tgRes.text();
        console.error('Telegram error:', err);
        return corsResponse(JSON.stringify({ ok: false, error: 'Delivery failed.' }), 502, env);
      }

      return corsResponse(JSON.stringify({ ok: true }), 200, env);

    } catch (err) {
      console.error('Fetch error:', err);
      return corsResponse(JSON.stringify({ ok: false, error: 'Server error.' }), 500, env);
    }
  }
};

function corsResponse(body, status, env) {
  const origin = env.ALLOWED_ORIGIN || '*';
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
