<template>
  <footer class="site-footer">
    <div class="container footer-inner">

      <!-- Top Row: Logo (Left) and Socials (Right) -->
      <div class="footer-top">
        <div class="footer-brand">
          <router-link to="/" class="logo">AG<span class="dot">.</span></router-link>
        </div>

        <div class="footer-socials">
          <a href="https://github.com/adityagarasangi" target="_blank" rel="noopener" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/adityagarasangi/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://x.com/adityagarasangi" target="_blank" rel="noopener" aria-label="Twitter / X">
            <i class="fab fa-x-twitter"></i>
          </a>
          <a href="https://www.instagram.com/aditya._.garasangi/" target="_blank" rel="noopener" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <!-- Bottom Row: Copyright (Left) and Note (Right) -->
      <div class="footer-bottom">
        <span class="copyright">&copy; {{ currentYear }} Aditya Garasangi. All rights reserved.</span>
        <span class="footer-note">Made with <span class="heart">♥</span> and way too much caffeine.</span>
      </div>

    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--glass-border);
  background: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(10px);
  padding: 2rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 320px;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -1px;
  text-decoration: none;
}

.dot { color: var(--accent-primary); }

.footer-tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.footer-socials {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-size: 1rem;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.footer-socials a:hover {
  color: var(--accent-primary);
  border-color: rgba(96, 165, 250, 0.4);
  background: rgba(96, 165, 250, 0.05);
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid var(--glass-border);
  padding-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  justify-content: space-between;
  align-items: center;
}

.copyright, .footer-note {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.heart { color: #f87171; }

@media (max-width: 640px) {
  .footer-top { flex-direction: column; gap: 2rem; }
  .footer-bottom { flex-direction: column; text-align: center; gap: 0.5rem; }
}
</style>

