<template>
  <div class="about-view pt-32 pb-16">
    <div class="container about-container">
      
      <!-- Top Hero Section -->
      <div class="about-hero glass-card mb-16">
        <div class="about-image-wrapper">
          <div class="glow-backdrop"></div>
          <img src="/images/pfp.jpg" alt="Aditya Garasangi" class="about-img" />
          <div class="exp-badge pulse-subtle">
            <span class="exp-num">{{ expBadge.num }}</span>
            <span class="exp-text" v-html="expBadge.text"></span>
          </div>
        </div>
        <div class="about-intro">
          <h1 class="text-4xl font-bold mb-2">Hey👋, I’m Aditya!</h1>
          <p class="text-accent text-xl font-medium tracking-wide uppercase mb-8">DevOps & Cloud Engineer</p>
          <div class="flex gap-4">
            <a href="/#contact" class="btn btn-primary">Say hello</a>
            <a href="https://drive.google.com/file/d/1aaov9G2PWMhvER-yXzbksmCdQOC_4XbK/view?usp=sharing" target="_blank" class="btn btn-secondary">Grab my CV</a>
          </div>
        </div>
      </div>

      <!-- Clean Article Layout for Text -->
      <div class="about-content-wrapper">
        <div class="about-text-clean">
          <p class="lead-text">This is my little corner on the internet where I share things I build, experiment with, and occasionally break. You’ll find a mix of projects, ideas, and random stuff I’ve been curious enough to explore.</p>
          
          <div class="text-divider"></div>

          <p>I work in DevOps, but I’m really just someone who enjoys building things and figuring out how they work (and sometimes why they don’t). A lot of my time goes into side projects, small automations, and trying to make everyday things a bit simpler and smoother.</p>
          <p>Most of what I do starts with a random thought like “this could probably be better” — and then turns into a mini project that I spend way too much time on.</p>
          <p>When I’m not staring at logs or tweaking configs, I’m probably out hunting for good coffee, discovering new indie music, or deep into a YouTube rabbit hole that I didn’t plan on entering.</p>
          <p>I like keeping things simple, learning as I go, and sharing whatever I pick up along the way — so feel free to explore.</p>
          <p>If you ever want to talk about tech, ideas, or just random internet stuff, feel free to reach out 🙂</p>
          <p class="footer-note">Oh, and there’s a good chance I’ve spent more time than necessary on some tiny detail on this site — see if you can spot one.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Experience Badge Logic
const expBadge = ref({ num: '0', text: '' });
const calcExperience = () => {
  const start = new Date(2025, 7); // Aug 2025
  const now = new Date();
  let totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
  totalMonths = Math.max(0, totalMonths);
  
  const years = Math.floor(totalMonths / 12);
  const rem = totalMonths % 12;
  
  if (years === 0) {
    expBadge.value = { num: totalMonths, text: `Month${totalMonths !== 1 ? 's' : ''}<br>Experience` };
  } else if (rem === 0) {
    expBadge.value = { num: years, text: `Year${years !== 1 ? 's' : ''}<br>Experience` };
  } else {
    expBadge.value = { num: (years + rem/12).toFixed(1), text: 'Years<br>Experience' };
  }
};

onMounted(() => {
  calcExperience();
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-16 { margin-bottom: 4rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }

.about-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Hero Section */
.about-hero {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;
  align-items: center;
  border-radius: var(--radius-lg);
}

@media (min-width: 768px) {
  .about-hero {
    flex-direction: row;
    padding: 4rem;
    gap: 4rem;
  }
}

.about-image-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .about-image-wrapper {
    width: 220px;
    height: 220px;
  }
}

.glow-backdrop {
  position: absolute;
  inset: -15px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  filter: blur(20px);
  opacity: 0.4;
  border-radius: var(--radius-lg);
  z-index: 0;
}

.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-lg);
  border: 3px solid var(--glass-border);
  position: relative;
  z-index: 1;
}

.exp-badge {
  position: absolute;
  bottom: -1.5rem;
  right: -2.5rem;
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 2;
}

.pulse-subtle {
  animation: pulse-border 4s infinite alternate;
}

@keyframes pulse-border {
  0% { border-color: var(--glass-border); }
  100% { border-color: var(--accent-primary); box-shadow: 0 0 15px rgba(96, 165, 250, 0.2); }
}

.exp-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-primary);
  line-height: 1;
}

.exp-text {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.2;
}

.about-intro {
  text-align: center;
}

@media (min-width: 768px) {
  .about-intro {
    text-align: left;
  }
}

.text-4xl { font-size: 2.5rem; line-height: 1.2; }
.text-xl { font-size: 1.25rem; }
.text-accent { color: var(--accent-primary); }
.uppercase { text-transform: uppercase; }
.tracking-wide { letter-spacing: 0.05em; }

/* Article Content */
.about-content-wrapper {
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .about-content-wrapper {
    padding: 0 2rem;
  }
}

.about-text-clean {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.about-text-clean p {
  margin-bottom: 1.8rem;
  color: rgba(255, 255, 255, 0.85); /* Slightly brighter than text-muted for readability */
}

.lead-text {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--text-primary) !important;
  line-height: 1.6;
}

.text-divider {
  width: 40px;
  height: 4px;
  background: var(--accent-primary);
  border-radius: 2px;
  margin: 2.5rem 0;
  opacity: 0.7;
}

.footer-note {
  font-style: italic;
  color: var(--text-muted) !important;
  font-size: 1rem;
  border-left: 3px solid var(--glass-border);
  padding-left: 1.5rem;
  margin-top: 3rem;
}
</style>
