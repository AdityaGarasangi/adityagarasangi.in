import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import NodeCache from 'node-cache';
import RSS from 'rss';
import https from 'https';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security and middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Caching
const cache = new NodeCache({ stdTTL: 900 }); // Cache for 15 minutes

// Notion Setup
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
console.log(notion);
const n2m = new NotionToMarkdown({ notionClient: notion });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Helper to extract plain text from rich text array
const getPlainText = (richTextArray) => {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  return richTextArray.map(t => t.plain_text).join('');
};

// Helper to sanitize and map Notion page to our public blog format
const mapNotionPageToBlog = (page) => {
  const props = page.properties;

  const title = getPlainText(props.Title?.title) || 'Untitled';
  const slug = getPlainText(props.Slug?.rich_text) || page.id;
  const publishedAt = props.Date?.date?.start || page.created_time;
  const tags = props.Tags?.multi_select?.map(t => ({ name: t.name, color: t.color })) || [];
  const readTimeInMinutes = props.ReadTime?.number || 5;

  let coverImage = null;
  if (page.cover) {
    if (page.cover.type === 'external') {
      coverImage = { url: page.cover.external.url };
    } else if (page.cover.type === 'file') {
      coverImage = { url: page.cover.file.url };
    }
  }

  return {
    id: page.id,
    title,
    slug,
    publishedAt,
    tags,
    readTimeInMinutes,
    coverImage
  };
};

// Helper: promisified HTTPS GET (works on all Node.js versions)
const fetchJson = (urlStr, headers = {}) => new Promise((resolve, reject) => {
  const url = new URL(urlStr);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'GET',
    headers: {
      'User-Agent': 'adityagarasangi.in',
      'Accept': 'application/vnd.github.v3+json',
      ...headers
    }
  };

  const req = https.request(options, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      if (res.statusCode >= 400) {
        console.error(`GitHub API ${res.statusCode}: ${raw.slice(0, 200)}`);
        reject(new Error(`HTTP ${res.statusCode}`));
      } else {
        try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
      }
    });
  });
  req.on('error', reject);
  req.end();
});

// ─── GitHub Proxy ──────────────────────────────────────────────
const GITHUB_USERNAME = 'adityagarasangi';

// GET /api/github/repos — returns all non-fork repos, cached
app.get('/api/github/repos', async (req, res) => {
  try {
    const cacheKey = 'github_repos_v10';
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    const authHeaders = {};
    if (process.env.GH_TOKEN_PRIVATE) {
      authHeaders['Authorization'] = `token ${process.env.GH_TOKEN_PRIVATE}`;
      console.log('✅ GitHub Authentication Active');
    }

    const repos = await fetchJson(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      authHeaders
    );

    // Flexible Env Parser Helper
    const parseEnvArray = (val) => {
      if (!val) return [];
      try {
        if (val.trim().startsWith('[')) return JSON.parse(val);
        return val.split(',').map(s => s.trim().toLowerCase());
      } catch (e) {
        return val.split(',').map(s => s.trim().toLowerCase());
      }
    };

    const parseEnvObject = (val) => {
      if (!val) return {};
      try {
        if (val.trim().startsWith('{')) return JSON.parse(val);
        return val.split(',').reduce((acc, pair) => {
          const [repo, title] = pair.split(':');
          if (repo && title) acc[repo.trim().toLowerCase()] = title.trim();
          return acc;
        }, {});
      } catch (e) {
        return {};
      }
    };

    // Load configuration from .env
    const hiddenRepos = parseEnvArray(process.env.HIDDEN_REPOS);
    const featuredRepos = parseEnvArray(process.env.FEATURED_REPOS);
    const customTitlesMap = parseEnvObject(process.env.CUSTOM_TITLES);

    // Filter non-forks and excluded repos
    const ownRepos = repos.filter(r => !r.fork && !hiddenRepos.includes(r.name.toLowerCase()));

    // Fetch detailed languages for each repo
    const reposWithLangs = await Promise.all(ownRepos.map(async (r) => {
      try {
        const languagesObj = await fetchJson(r.languages_url, authHeaders);
        
        // If we got languages, use the full object (byte counts)
        if (Object.keys(languagesObj).length > 0) {
          return { ...r, languages: languagesObj };
        }
        
        // Fallback 1: Primary language
        if (r.language) return { ...r, languages: { [r.language]: 100 } };
        
        return { ...r, languages: {} };
      } catch (e) {
        console.warn(`⚠️ [GitHub] Could not fetch languages for ${r.name}: ${e.message}`);
        const fallback = r.language ? { [r.language]: 100 } : {};
        return { ...r, languages: fallback };
      }
    }));

    // Map to public format
    const publicRepos = reposWithLangs.map(r => {
      const repoNameLower = r.name.toLowerCase();
      return {
        id: r.id,
        name: r.name,
        displayName: customTitlesMap[repoNameLower] || null, // Priority 1: .env custom title
        description: r.description,
        html_url: r.html_url,
        languages: r.languages,
        topics: r.topics || [],
        isFeatured: featuredRepos.includes(repoNameLower),
        default_branch: r.default_branch || 'main',
        updated_at: r.updated_at
      };
    });

    cache.set(cacheKey, publicRepos);
    res.json({ data: publicRepos });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
});

// GET /api/github/readme/:owner/:repo — fetches and decodes README, rewriting relative URLs
app.get('/api/github/readme/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const branch = req.query.branch || 'main';
  const cacheKey = `readme_v3_${owner}_${repo}_${branch}`;
  
  try {
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    const authHeaders = {};
    if (process.env.GH_TOKEN_PRIVATE) {
      authHeaders['Authorization'] = `token ${process.env.GH_TOKEN_PRIVATE}`;
    }

    const readmeData = await fetchJson(
      `https://api.github.com/repos/${owner}/${repo}/readme?ref=${branch}`,
      authHeaders
    );

    let content = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    
    // Rewrite relative image/link URLs to absolute GitHub raw URLs
    // Pattern: ![alt](path) or [text](path)
    const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
    
    // Replace Markdown image and link paths that don't start with http/https/mailto/#
    content = content.replace(/(!?\[.*?\])\((?!(?:https?:\/\/|mailto:|#))(.+?)\)/g, (match, text, path) => {
      // Normalize path (remove leading ./)
      const cleanPath = path.startsWith('./') ? path.slice(2) : path;
      return `${text}(${baseUrl}/${cleanPath})`;
    });

    // Replace HTML <img> src and <a> href paths
    content = content.replace(/(src|href)="(?!(?:https?:\/\/|mailto:|#))(.+?)"/g, (match, attr, path) => {
      const cleanPath = path.startsWith('./') ? path.slice(2) : path;
      return `${attr}="${baseUrl}/${cleanPath}"`;
    });
    
    cache.set(cacheKey, content);
    res.json({ data: content });
  } catch (error) {
    console.error(`❌ [GitHub] README error for ${owner}/${repo}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});
// GET /api/blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const cursor = req.query.cursor;
    const limit = parseInt(req.query.limit) || 10;
    const cacheKey = cursor ? `blogs_list_${cursor}_${limit}` : `blogs_list_first_page_${limit}`;

    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    if (!DATABASE_ID) {
      return res.status(500).json({ error: 'Database ID not configured' });
    }

    const queryParams = {
      data_source_id: DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      page_size: limit
    };

    if (cursor) {
      queryParams.start_cursor = cursor;
    }

    const response = await notion.dataSources.query(queryParams);

    const blogs = response.results.map(mapNotionPageToBlog).map(blog => {
      // Strip ID to prevent leakage of internal IDs
      const { id, ...publicData } = blog;
      return publicData;
    });

    const responseData = {
      blogs,
      has_more: response.has_more,
      next_cursor: response.next_cursor
    };

    cache.set(cacheKey, responseData);
    res.json({ data: responseData });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET /api/clear-cache
app.get('/api/clear-cache', (req, res) => {
  const secret = req.query.secret;
  // Use NOTION_API_KEY as a simple auth secret, or define a new env variable CACHE_SECRET
  if (secret !== process.env.NOTION_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  cache.flushAll();
  res.json({ message: 'Cache successfully cleared' });
});

// GET /api/blogs/:slug
app.get('/api/blogs/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const cacheKey = `blog_${slug}`;
    if (cache.has(cacheKey)) {
      return res.json({ data: cache.get(cacheKey) });
    }

    if (!DATABASE_ID) {
      return res.status(500).json({ error: 'Database ID not configured' });
    }

    // First find the page by slug
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          }
        ]
      },
      page_size: 1,
    });

    if (!response.results || response.results.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const page = response.results[0];
    const blogMeta = mapNotionPageToBlog(page);

    // Fetch blocks and convert to markdown
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    // Robust extraction of markdown string
    let markdown = '';
    if (typeof mdString === 'string') {
      markdown = mdString;
    } else if (mdString && typeof mdString === 'object') {
      // notion-to-md v3 returns { parent: '...', ... } or similar
      markdown = mdString.parent || mdString.content || '';
    }

    if (!markdown) {
      console.warn(`No content found for blog: ${slug}`);
    }

    const wordCount = markdown.split(/\s+/).length;
    const readTimeInMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const fullBlog = {
      ...blogMeta,
      readTimeInMinutes,
      contentMarkdown: markdown,
    };

    // Remove internal ID
    delete fullBlog.id;

    cache.set(cacheKey, fullBlog);
    res.json({ data: fullBlog });
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    res.status(500).json({ error: 'Failed to fetch blog content' });
  }
});

// GET /rss.xml
app.get('/rss.xml', async (req, res) => {
  try {
    const cacheKey = 'rss_feed';
    if (cache.has(cacheKey)) {
      res.type('application/xml');
      return res.send(cache.get(cacheKey));
    }

    if (!DATABASE_ID) {
      return res.status(500).send('Database ID not configured');
    }

    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    const blogs = response.results.map(mapNotionPageToBlog);

    const feed = new RSS({
      title: 'Aditya Garasangi Blog',
      description: 'Documenting my journey, experiences, and learnings in tech.',
      feed_url: 'https://adityagarasangi.in/rss.xml',
      site_url: 'https://adityagarasangi.in',
      language: 'en',
      pubDate: new Date().toUTCString(),
    });

    for (const blog of blogs) {
      feed.item({
        title: blog.title,
        description: `Read more about ${blog.title}`,
        url: `https://adityagarasangi.in/blog/${blog.slug}`,
        date: blog.publishedAt,
        categories: blog.tags.map(t => t.name)
      });
    }

    const xml = feed.xml({ indent: true });
    cache.set(cacheKey, xml);

    res.type('application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating RSS:', error);
    res.status(500).send('Failed to generate RSS feed');
  }
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
