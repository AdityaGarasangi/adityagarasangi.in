<template>
  <div class="not-found">
    <div class="glow-blob"></div>
    <div class="container nf-content">
      <div class="nf-code">404</div>
      <h1 class="nf-title">You seem lost.</h1>
      <p class="nf-subtitle">This page doesn't exist — or maybe it did and I deleted it. Either way, it's not here anymore.</p>
      <div class="nf-actions">
        <router-link to="/" class="btn btn-primary">Take me home</router-link>
        <router-link to="/blogs" class="btn btn-secondary">Read my blogs</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nothing to do here — it's just a 404.
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
}

.glow-blob {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, rgba(0,0,0,0) 70%);
  z-index: -1;
  pointer-events: none;
}

.nf-content {
  max-width: 600px;
  padding: 2rem;
}

.nf-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  letter-spacing: -4px;
}

.nf-title {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.nf-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.nf-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
