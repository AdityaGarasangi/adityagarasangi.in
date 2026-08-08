<template>
  <div class="about-view">
    <div class="container about-canvas">
      <!-- Huge Masthead -->
      <header class="about-hero fade-in">
        <h1 class="about-title">Aditya Garasangi</h1>
        <p class="about-subtitle">DevOps Engineer & Cybersecurity Enthusiast</p>
      </header>

      <div class="about-content fade-in-delayed">
        <div class="story-section">
          <p class="lead">just a tiny corner of the internet that feels a little like home.</p>
          
          <p>This is my little spot on the web - somewhere to dump my posts, projects, random experiments, half-baked notes, and whatever else I feel like sharing. I'm an engineer by day, explorer by… also day, honestly.</p>

          <p>When I'm not working, you'll probably find me deep in a rabbit hole of music or memes, accidentally staying up till 2am doomscrolling (we've all been there), or watching "just one more episode" of a sitcom - which always, <em>always</em> turns into four.</p>

          <p>Oh, and I take Bangalore's biryani scene very seriously. Like, embarrassingly seriously. Some people collect stamps or experiences - I collect "bro you HAVE to try this place" recommendations. My list keeps growing and I have zero regrets.</p>

          <p>Still figuring a lot of things out as I go, but honestly? That's the fun part.</p>

          <p class="footer-note">Glad you made it here. Stay as long as you like 🙂</p>
        </div>

        <!-- Aesthetic Footer Navigation -->
        <div class="about-footer-nav">
          <div class="nav-group">
            <span class="nav-label">Connect</span>
            <div class="nav-links">
              <a href="https://linkedin.com/in/adityagarasangi" target="_blank">LinkedIn</a>
              <span class="nav-sep">•</span>
              <a href="https://github.com/adityagarasangi" target="_blank">GitHub</a>
              <span class="nav-sep">•</span>
              <a href="https://twitter.com/adityagarasangi" target="_blank">Twitter</a>
            </div>
          </div>
          
          <div class="nav-group">
            <span class="nav-label">Inquiries</span>
            <a href="mailto:adityagarasangi77@gmail.com" class="email-link">adityagarasangi77@gmail.com</a>
          </div>

          <div class="nav-group">
            <span class="nav-label">Credentials</span>
            <a href="https://drive.google.com/file/d/1aaov9G2PWMhvER-yXzbksmCdQOC_4XbK/view?usp=sharing" target="_blank" class="email-link">View Resume</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'About | Aditya Garasangi',
  meta: [
    { name: 'description', content: 'DevOps Engineer focused on simplicity, efficiency, and building reliable cloud infrastructure.' }
  ]
});
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  padding: 180px 0 100px 0;
  background: var(--bg-primary);
}

.about-canvas {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Masthead */
.about-hero {
  margin-bottom: 5rem;
  text-align: center;
}

.about-title {
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  background: linear-gradient(to bottom, #fff 50%, rgba(255,255,255,0.4));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-subtitle {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--accent-primary);
  letter-spacing: -0.02em;
}

/* Content Layout */
.about-content {
  margin: 0 auto;
  max-width: 680px;
}

.story-section {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #94a3b8;
}

.story-section p {
  margin-bottom: 2.5rem;
}

.story-section .lead {
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.03em;
  margin-bottom: 3rem;
  text-align: center;
}

.footer-note {
  font-style: italic;
  color: var(--text-muted);
  font-size: 1rem;
  margin-top: 4rem;
  text-align: center;
}

/* Links Section */
.about-footer-nav {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.nav-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.nav-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-primary);
  font-weight: 800;
}

.nav-links, .email-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.nav-sep {
  color: rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
}

.nav-links a:hover, .email-link:hover {
  color: var(--accent-primary);
  transform: translateY(-2px);
}

/* Animations */
.fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.fade-in-delayed {
  opacity: 0;
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .about-title { font-size: 4rem; }
  .about-footer-nav { gap: 2.5rem; }
}

@media (max-width: 768px) {
  .about-view { padding-top: 120px; }
  .about-title { font-size: 3.5rem; }
  .story-section .lead { font-size: 1.5rem; }
  .about-footer-nav { flex-direction: column; gap: 2rem; }
}
</style>
