<template>
  <div class="blog-read-view">
    <!-- Ambient Background -->
    <div class="ambient-glow"></div>

    <div class="container blog-container">
      <div v-if="loading" class="loading-screen">
        <div class="luxury-loader"></div>
        <p>Polishing the story...</p>
      </div>
      
      <article v-else-if="post" class="post-canvas">
        <header class="post-hero">
          <div class="post-topic" v-if="post.tags?.length">
            <span class="topic-tag">{{ post.tags[0].name }}</span>
          </div>
          <h1 class="hero-title">{{ post.title }}</h1>
          
          <div class="hero-meta glass">
            <div class="meta-author-group">
              <img src="/images/pfp.jpg" alt="Aditya" class="meta-pfp" />
              <div class="meta-name-stack">
                <span class="m-name">Aditya Garasangi</span>
                <span class="m-date">{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-stats">
              <span class="m-read-time">{{ post.readTimeInMinutes }} MIN READ</span>
            </div>
          </div>
        </header>

        <section class="post-body-wrap">
          <div class="markdown-body premium-content" v-html="compiledMarkdown"></div>
        </section>

        <footer class="post-finish">
          <div class="finish-callout glass">
            <div class="callout-header">
              <div class="callout-icon"><i class="fas fa-pencil-alt"></i></div>
              <h3>Thought this was interesting?</h3>
            </div>
            <p>Share this article with your friends and colleagues</p>
            <div class="callout-footer">
              <div class="social-row">
                <button @click="copyLink" class="social-circle" title="Copy Link"><i class="fas fa-link"></i></button>
                <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`" target="_blank" class="social-circle twitter"><i class="fab fa-x-twitter"></i></a>
                <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`" target="_blank" class="social-circle linkedin"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <router-link to="/blogs" class="finish-back-btn">
                All Stories <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </div>
        </footer>
      </article>

      <div v-else class="post-not-found">
        <i class="fas fa-wind text-6xl opacity-10 mb-8"></i>
        <h2>Story not found</h2>
        <p class="text-muted mb-8">This article has been moved or deleted.</p>
        <router-link to="/blogs" class="btn btn-primary">Return to Library</router-link>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="slide-up">
      <div v-if="toast.show" class="luxury-toast">
        <div class="toast-content">
          <i class="fas fa-check-circle"></i>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const readingProgress = ref(0);
const currentUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '');
const toast = ref({ show: false, message: '' });

const copyLink = () => {
  navigator.clipboard.writeText(currentUrl.value).then(() => {
    toast.value = { show: true, message: 'Link copied to clipboard' };
    setTimeout(() => toast.value.show = false, 3000);
  });
};

useHead({
  title: () => post.value ? `${post.value.title} | Blog` : 'Loading...',
  meta: [
    { name: 'description', content: () => post.value?.brief || 'Engineering blog by Aditya Garasangi' }
  ]
});

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const fetchPost = async () => {
  const slug = route.params.slug;
  try {
    const res = await fetch(`/api/blogs/${slug}`);
    if (!res.ok) throw new Error();
    const result = await res.json();
    post.value = result.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const compiledMarkdown = computed(() => post.value?.contentMarkdown ? marked.parse(post.value.contentMarkdown) : '');

const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const updateProgress = () => {
  const h = document.documentElement;
  const st = h.scrollTop || document.body.scrollTop;
  const sh = h.scrollHeight || document.body.scrollHeight;
  const ch = h.clientHeight;
  readingProgress.value = (st / (sh - ch)) * 100;
};

onMounted(() => {
  fetchPost();
  window.addEventListener('scroll', updateProgress);
});
onUnmounted(() => window.removeEventListener('scroll', updateProgress));
</script>

<style scoped>
.blog-read-view {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 60px;
  position: relative;
}

.blog-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

/* Ambient Glow */
.ambient-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 80% 20%, rgba(var(--accent-primary-rgb), 0.05) 0%, transparent 40%),
    radial-gradient(circle at 20% 80%, rgba(var(--accent-secondary-rgb), 0.05) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

/* Hero Section */
.post-hero {
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

.topic-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: rgba(var(--accent-primary-rgb), 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0.8rem 0 1.2rem 0;
  color: var(--text-primary);
  letter-spacing: -0.05em;
  text-wrap: balance;
  background: linear-gradient(to bottom, #fff 60%, rgba(255,255,255,0.7));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-meta {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
}

.meta-author-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.meta-pfp {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--accent-primary);
}

.meta-name-stack {
  display: flex;
  flex-direction: column;
}

.m-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.m-date {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.meta-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
}

.m-read-time {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

/* Content Area */
.post-body-wrap {
  margin-bottom: 4
  rem;
}

:deep(.premium-content) {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cbd5e1;
}

:deep(.premium-content p) {
  margin-bottom: 1.8rem;
}

:deep(.premium-content h2) {
  font-size: 2.2rem;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

:deep(.premium-content h3) {
  font-size: 1.6rem;
  margin-top: 3rem;
}

:deep(.premium-content blockquote) {
  border-left: none;
  background: rgba(255, 255, 255, 0.02);
  padding: 2.5rem;
  margin: 3rem 0;
  border-radius: 20px;
  font-size: 1.4rem;
  font-style: italic;
  position: relative;
  color: var(--text-primary);
}

:deep(.premium-content blockquote::before) {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1.5rem;
  font-size: 4rem;
  color: var(--accent-primary);
  opacity: 0.3;
  font-family: serif;
}

:deep(.premium-content pre) {
  background: #08080a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  margin: 2.5rem 0;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
}

:deep(.premium-content img) {
  border-radius: 20px;
  margin: 3rem 0;
  max-width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

/* Finish Callout */
.finish-callout {
  padding: 3rem;
  border-radius: 24px;
  text-align: left;
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
}

.callout-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1rem;
}

.callout-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #fff;
}

.finish-callout h3 {
  font-size: 1.6rem;
  margin: 0;
}

.finish-callout p {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 90%;
}

.callout-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-row {
  display: flex;
  gap: 0.8rem;
}

.social-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s;
}

.social-circle:hover {
  transform: translateY(-3px);
  color: #fff;
}

.social-circle.twitter:hover { background: #1da1f2; border-color: #1da1f2; }
.social-circle.linkedin:hover { background: #0077b5; border-color: #0077b5; }

.finish-back-btn {
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.finish-back-btn:hover {
  color: var(--accent-primary);
  transform: translateX(5px);
}

/* Toast Luxury */
.luxury-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 5000;
}

.toast-content {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
}

.toast-content i {
  color: var(--accent-primary);
}

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-leave-to { opacity: 0; transform: translateY(20px); }

.fade-in {
  animation: pageEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.8rem; }
  .post-hero { margin-bottom: 4rem; }
  .hero-meta { flex-direction: column; align-items: flex-start; border-radius: 24px; padding: 1.5rem; }
  .meta-divider { display: none; }
  :deep(.premium-content) { font-size: 1.15rem; }
  :deep(.premium-content pre), :deep(.premium-content img) { margin-left: 0; margin-right: 0; max-width: 100%; }
  .callout-footer { flex-direction: column; align-items: flex-start; gap: 2rem; }
  .luxury-toast { right: 1.5rem; bottom: 1.5rem; left: 1.5rem; }
  .toast-content { width: 100%; justify-content: center; }
}
</style>
