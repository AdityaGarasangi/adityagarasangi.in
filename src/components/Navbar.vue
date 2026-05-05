<template>
  <nav :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="container navbar-content">
      <a href="/" class="logo" @click.prevent="scrollToTop">
        AG<span class="text-accent">.</span>
      </a>
      
      <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle Menu">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
      
      <div :class="['nav-links', { 'active': isMenuOpen }]">
        <router-link to="/side-hustles" class="nav-item" :class="{ 'active-link': isRoute('/side-hustles') }" @click="closeMenu">Side Hustles</router-link>
        <router-link to="/blogs" class="nav-item" :class="{ 'active-link': isRoute('/blogs') }" @click="closeMenu">Blogs</router-link>
        <router-link to="/journey" class="nav-item" :class="{ 'active-link': isRoute('/journey') }" @click="closeMenu">Journey</router-link>
        <router-link to="/about" class="nav-item" :class="{ 'active-link': isRoute('/about') }" @click="closeMenu">About</router-link>
        <a href="/#contact" class="nav-item" :class="{ 'active-link': currentSection === 'contact' && isRoute('/') }" @click="closeMenu">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const currentSection = ref('home');

const route = useRoute();
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const isRoute = (path) => {
  return route.path === path;
};

const scrollToTop = (e) => {
  if (route.path === '/') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  } else {
    router.push('/');
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  
  if (route.path !== '/') {
    currentSection.value = '';
    return;
  }

  const sections = ['home', 'projects', 'blogs', 'contact'];
  let found = 'home';
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      if (window.scrollY >= section.offsetTop - 150) {
        found = sections[i];
        // Treat projects and blogs sections on the home page as 'home' for navbar highlight
        if (found === 'projects' || found === 'blogs') {
          found = 'home';
        }
        break;
      }
    }
  }
  currentSection.value = found;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(() => route.path, () => {
  setTimeout(handleScroll, 100);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.3s ease;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  padding: 0.75rem 0;
  background: rgba(5, 5, 5, 0.9);
  border-bottom: 1px solid var(--glass-border);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.text-accent {
  color: var(--accent-primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  position: relative;
}

.nav-item:hover, .nav-item.active-link {
  color: var(--text-primary);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.nav-item:hover::after, .nav-item.active-link::after {
  width: 100%;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: clip-path 0.4s ease-in-out;
    border-bottom: 1px solid var(--glass-border);
  }
  
  .nav-links.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
</style>
