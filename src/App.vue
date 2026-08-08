<template>
  <div id="app-container">
    <!-- Particle Background -->
    <canvas ref="particleCanvas" class="particles-bg"></canvas>
    
    <Navbar />
    
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const particleCanvas = ref(null);

onMounted(() => {
  // Simple particle system for aesthetic background
  const canvas = particleCanvas.value;
  const ctx = canvas.getContext('2d');
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', resize);
  resize();
  
  const particles = [];
  const particleCount = 50; // Performance friendly
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
});
</script>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
