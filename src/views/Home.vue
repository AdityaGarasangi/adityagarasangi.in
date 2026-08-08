<template>
  <div class="home">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="glow-blob"></div>
      <div class="container hero-content">
        <h1 class="hero-title">Hey, I'm <span class="text-gradient">Aditya</span></h1>
        <div class="hero-subtitle-container" v-if="mounted">
          <div class="intro-text">
            <p class="hero-subtitle">{{ typedLine1 }}<span class="cursor" v-if="typingPhase === 1">|</span></p>
            <p class="hero-subtitle" v-if="currentIntro.line2 || typingPhase === 2">{{ typedLine2 }}<span class="cursor" v-if="typingPhase === 2">|</span></p>
          </div>
        </div>
        <div class="hero-actions">
          <router-link to="/side-hustles" class="btn btn-primary">See my side hustles</router-link>
          <a href="#contact" class="btn btn-secondary" @click.prevent="scrollTo('#contact')">Let's talk</a>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects">
      <div class="container">
        <div class="section-header-row">
          <h2 class="section-title">Side Hustles</h2>
          <router-link to="/side-hustles" class="btn-link">View everything <i class="fas fa-arrow-right"></i></router-link>
        </div>
        
        <div v-if="loadingProjects" class="grid grid-cols-2">
          <div v-for="i in 4" :key="i" class="glass-card flex flex-col gap-4">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%"></div>
            <div class="flex gap-4 mt-auto">
              <div class="skeleton skeleton-pill"></div>
              <div class="skeleton skeleton-pill"></div>
            </div>
          </div>
        </div>
        <div v-else-if="featuredProjects.length" class="grid grid-cols-2">
          <ProjectCard v-for="repo in featuredProjects" :key="repo.id" :project="repo" />
        </div>
        <div v-else class="error-msg">Failed to load projects.</div>
      </div>
    </section>

    <!-- Blogs Section -->
    <section id="blogs">
      <div class="container">
        <div class="section-header-row">
          <h2 class="section-title">Blogs</h2>
          <router-link to="/blogs" class="btn-link">View everything <i class="fas fa-arrow-right"></i></router-link>
        </div>
        
        <div v-if="loadingBlogs" class="grid grid-cols-2">
          <div v-for="i in 4" :key="i" class="glass-card flex flex-col gap-4">
            <div class="flex gap-4 mb-2">
              <div class="skeleton skeleton-pill" style="width: 40px"></div>
              <div class="skeleton skeleton-pill" style="width: 80px"></div>
            </div>
            <div class="skeleton skeleton-title" style="width: 90%"></div>
            <div class="flex justify-between items-center mt-auto">
              <div class="flex gap-2">
                <div class="skeleton skeleton-pill"></div>
                <div class="skeleton skeleton-pill"></div>
              </div>
              <div class="skeleton skeleton-pill" style="width: 50px"></div>
            </div>
          </div>
        </div>
        <div v-else-if="featuredBlogs.length" class="grid grid-cols-2 blogs-grid">
          <BlogCard v-for="(post, index) in featuredBlogs" :key="post.slug" :post="post" :isFeatured="index === 0" />
        </div>
        <div v-else class="text-center mt-8">
          <p class="text-muted" style="font-size: 1.1rem">Still no blogs to show yet, but I'm working on some cool stuff!</p>
        </div>
      </div>
    </section>

    <!-- Quick About & Journey Overview -->
    <section id="overview" class="py-12">
      <div class="container">
        <div class="glass-card overview-dashboard">
          <div class="overview-left">
            <div class="overview-img-container">
              <div class="overview-glow"></div>
              <img src="/images/pfp.jpg" alt="Aditya" class="overview-img" />
            </div>
            <div class="overview-intro text-center md:text-left">
              <h3 class="text-2xl font-bold mb-3">Me, in a nutshell</h3>
              <p class="text-muted mb-6">Just a tech enthusiast who loves diving into new technologies, sipping good coffee, and building cool things.</p>
              <router-link to="/about" class="btn-link font-bold">Get to know me better <i class="fas fa-arrow-right ml-1"></i></router-link>
            </div>
          </div>
          
          <div class="overview-divider"></div>

          <div class="overview-right relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 text-indigo-400 opacity-10 text-8xl pointer-events-none">
              <i class="fas fa-briefcase"></i>
            </div>
            <h3 class="text-xl font-bold mb-6 text-accent uppercase tracking-wider"><i class="fas fa-satellite-dish mr-2 pulse-icon"></i> What I’m up to</h3>
            <div class="mb-6 z-10">
              <span class="text-muted text-sm font-bold uppercase tracking-wider block mb-1">Currently working as</span>
              <p class="text-xl font-bold">Product Engineer <span class="text-muted font-normal">@ SecurEnds</span></p>
            </div>
            <div class="mb-8 z-10">
              <span class="text-muted text-sm font-bold uppercase tracking-wider block mb-1">Spending most of my time on</span>
              <p class="text-lg">DevOps, Cloud and IaC</p>
            </div>
            <router-link to="/journey" class="btn btn-primary text-sm self-start z-10">View my full journey</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
      <div class="container">
        <div class="section-header text-center mb-8">
          <h2 class="section-title mb-4">Reach out</h2>
          <p class="text-muted">Have a question, an opportunity, or just want to chat? Drop me a line.</p>
        </div>

        <div class="contact-grid">
          <div class="glass-card contact-form-card">
            <form @submit.prevent="submitForm">
              <!-- Honeypot -->
              <input type="text" v-model="form.hp" style="display: none;" tabindex="-1" autocomplete="off" />
              
              <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" v-model="form.name" class="form-control" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" v-model="form.email" class="form-control" required />
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea v-model="form.message" class="form-control" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%" :disabled="formStatus.loading">
                <span v-if="formStatus.loading"><i class="fas fa-circle-notch fa-spin"></i> Sending...</span>
                <span v-else>Send Message</span>
              </button>
              
              <p v-if="formStatus.message" :class="['form-msg', formStatus.type]">{{ formStatus.message }}</p>
            </form>
          </div>
          
          <div class="contact-info">
            <h3 class="mb-4">Let's connect</h3>
            <p class="text-muted mb-8">I'm pretty active on email and LinkedIn. Feel free to reach out anytime.</p>
            
            <div class="info-item">
              <div class="info-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <span class="info-label">Email</span>
                <a href="mailto:adityagarasangi77@gmail.com" class="info-val">adityagarasangi77@gmail.com</a>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon"><i class="fab fa-linkedin"></i></div>
              <div>
                <span class="info-label">Network</span>
                <a href="https://www.linkedin.com/in/adityagarasangi/" target="_blank" class="info-val">LinkedIn Profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import ProjectCard from '../components/ProjectCard.vue';
import BlogCard from '../components/BlogCard.vue';
import { FEATURED_REPOS } from '../utils/projectFormatter';

useHead({
  title: 'Aditya Garasangi | Portfolio',
  meta: [
    { name: 'description', content: 'Explore the portfolio of Aditya Garasangi, a DevOps and Cloud Engineering enthusiast building scalable infrastructure and modern web apps.' },
    { property: 'og:title', content: 'Aditya Garasangi | Portfolio' },
    { property: 'og:description', content: 'DevOps, Cloud Engineering, and Software Development Portfolio.' },
    { property: 'og:type', content: 'website' }
  ]
});

// Rotating Intro Text
const introLines = [
  "I like building things that are clean, simple, and actually work — and fixing them when they don’t.",
  "I like creating things that feel simple, useful, and thoughtfully made.",
  "Building, learning, breaking things, and figuring them out along the way.",
  "Somewhere between creativity, curiosity, and controlled chaos.",
  "Trying to make useful things while enjoying life along the way.",
  "Making life better with music, memes, and good food.",
  "Probably listening to music or laughing at something dumb right now.",
  "Enjoying good food, good music, and peaceful little moments.",
  "Here for good vibes, fun conversations, and comfort shows.",
  "Just vibing through life with music in the background."
];

const currentIntro = ref({ line1: '', line2: '' });
const typedLine1 = ref('');
const typedLine2 = ref('');
const typingPhase = ref(1);
const mounted = ref(false);

const typeText = () => {
  let i = 0;
  const speed = 40;
  
  const typeLine1 = () => {
    if (i < currentIntro.value.line1.length) {
      typedLine1.value += currentIntro.value.line1.charAt(i);
      i++;
      setTimeout(typeLine1, speed);
    } else {
      if (currentIntro.value.line2) {
        typingPhase.value = 2;
        i = 0;
        setTimeout(typeLine2, 200);
      } else {
        typingPhase.value = 0;
      }
    }
  };
  
  const typeLine2 = () => {
    if (i < currentIntro.value.line2.length) {
      typedLine2.value += currentIntro.value.line2.charAt(i);
      i++;
      setTimeout(typeLine2, speed);
    } else {
      typingPhase.value = 0;
    }
  };
  
  typeLine1();
};

const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const getBalancedLines = (text) => {
  if (text.length <= 50) return { line1: text, line2: '' };
  
  const words = text.split(' ');
  let bestSplit = 0;
  let smallestDiff = Infinity;
  
  for (let i = 1; i < words.length - 1; i++) {
    const l1 = words.slice(0, i).join(' ');
    const l2 = words.slice(i).join(' ');
    const diff = l1.length - l2.length;
    
    if (diff > 0 && diff < smallestDiff) {
      smallestDiff = diff;
      bestSplit = i;
    }
  }
  
  if (bestSplit === 0) bestSplit = Math.ceil(words.length / 2);
  
  return {
    line1: words.slice(0, bestSplit).join(' '),
    line2: words.slice(bestSplit).join(' ')
  };
};

const initRotatingText = () => {
  let savedState = null;
  try {
    savedState = JSON.parse(localStorage.getItem('intro_rotation'));
  } catch (e) {}

  if (!savedState || !savedState.shuffled || savedState.currentIndex >= savedState.shuffled.length) {
    savedState = {
      shuffled: shuffleArray(introLines),
      currentIndex: 0
    };
  }

  const selectedText = savedState.shuffled[savedState.currentIndex];
  currentIntro.value = getBalancedLines(selectedText);
  
  savedState.currentIndex += 1;
  localStorage.setItem('intro_rotation', JSON.stringify(savedState));
  mounted.value = true;
  
  setTimeout(typeText, 300);
};

// Data fetching
const GITHUB_USERNAME = 'adityagarasangi';

const featuredProjects = ref([]);
const loadingProjects = ref(true);

const featuredBlogs = ref([]);
const loadingBlogs = ref(true);

const fetchProjects = async () => {
  try {
    const res = await fetch('/api/github/repos');
    if (!res.ok) throw new Error('Failed to fetch repos');
    const result = await res.json();
    const allRepos = result.data || [];
    featuredProjects.value = FEATURED_REPOS
      .map(name => allRepos.find(r => r.name === name))
      .filter(Boolean);
  } catch (e) {
    console.error('Failed to load projects', e);
  } finally {
    loadingProjects.value = false;
  }
};

const fetchBlogs = async () => {
  try {
    const res = await fetch('/api/blogs?limit=4');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const result = await res.json();
    featuredBlogs.value = result.data?.blogs || [];
  } catch (e) {
    console.error('Failed to load blogs', e);
  } finally {
    loadingBlogs.value = false;
  }
};
const WORKER_URL = 'https://portfolio-contact.adityagarasangi.workers.dev/';
const form = ref({ name: '', email: '', message: '', hp: '' });
const formStatus = ref({ loading: false, message: '', type: '' });

const submitForm = async () => {
  if (formStatus.value.loading) return;
  formStatus.value = { loading: true, message: '', type: '' };
  
  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form.value, _hp: form.value.hp })
    });
    
    const data = await res.json().catch(() => ({}));
    
    if (res.ok && data.ok) {
      formStatus.value = { loading: false, message: 'Message sent successfully!', type: 'success' };
      form.value = { name: '', email: '', message: '', hp: '' };
      setTimeout(() => formStatus.value.message = '', 5000);
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (e) {
    formStatus.value = { loading: false, message: e.message || 'Network error.', type: 'error' };
  }
};

const scrollTo = (hash) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  initRotatingText();
  fetchProjects();
  fetchBlogs();
});
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
}

.glow-blob {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(0,0,0,0) 70%);
  z-index: -1;
  pointer-events: none;
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}

.hero-subtitle-container {
  min-height: 80px;
  margin-bottom: 2.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink { 50% { opacity: 0; } }

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-header-row .section-title {
  margin-bottom: 0;
}

.btn-link {
  color: var(--accent-primary);
  font-weight: 500;
}

.btn-link:hover {
  color: var(--accent-secondary);
}

.text-muted {
  color: var(--text-muted);
}

.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
/* Blur Fade Transition */
.blur-fade-enter-active {
  transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), 
              filter 1s cubic-bezier(0.2, 0.8, 0.2, 1), 
              transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.blur-fade-enter-from {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(10px);
}
.blur-fade-enter-to {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}

.intro-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
/* Overview Layout */
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.overview-dashboard {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .overview-dashboard {
    flex-direction: row;
    align-items: center;
  }
}

.overview-left, .overview-right {
  padding: 3rem;
  flex: 1;
}

.overview-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .overview-left {
    flex-direction: row;
    align-items: center;
  }
}

.overview-img-container {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

.overview-glow {
  position: absolute;
  inset: -10px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  filter: blur(15px);
  opacity: 0.5;
  border-radius: var(--radius-lg);
  z-index: 0;
}

.overview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-lg);
  border: 3px solid var(--glass-border);
  position: relative;
  z-index: 1;
}

.overview-divider {
  height: 1px;
  background: var(--glass-border);
  width: 100%;
}

@media (min-width: 768px) {
  .overview-divider {
    width: 1px;
    height: auto;
    align-self: stretch;
  }
}

.overview-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pulse-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; text-shadow: 0 0 5px var(--accent-primary); }
  50% { opacity: 0.5; text-shadow: none; }
  100% { opacity: 1; text-shadow: 0 0 5px var(--accent-primary); }
}

.text-2xl { font-size: 1.5rem; }
.font-normal { font-weight: 400; }
.ml-1 { margin-left: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-1 { margin-bottom: 0.25rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.05em; }
.block { display: block; }
.absolute { position: absolute; }
.top-0 { top: 0; }
.right-0 { right: 0; }
.p-4 { padding: 1rem; }
.text-indigo-400 { color: #818cf8; }
.opacity-10 { opacity: 0.1; }
.text-8xl { font-size: 6rem; }
.z-10 { z-index: 10; position: relative; }
.self-start { align-self: flex-start; }
.pointer-events-none { pointer-events: none; }

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.info-icon {
  width: 50px;
  height: 50px;
  background: rgba(129, 140, 248, 0.1);
  color: var(--accent-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.info-label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.info-val {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1.05rem;
}

.form-msg {
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.form-msg.success { color: #4ade80; }
.form-msg.error { color: #f87171; }

@media (max-width: 992px) {
  .hero-title { font-size: 3rem; }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .md\:grid-cols-2 { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .hero-actions { flex-direction: column; }
  .section-header-row { flex-direction: column; gap: 1rem; text-align: center; }
}
</style>
