<template>
  <div class="glass-card project-card">
    <div class="project-content">
      <h3>
        <a :href="project.html_url" target="_blank" class="text-gradient">{{ project.name }}</a>
      </h3>
      <p class="desc">{{ project.description || 'No description available.' }}</p>
      
      <div class="meta">
        <span class="meta-item"><i class="fas fa-star text-accent"></i> {{ project.stargazers_count }}</span>
        <span class="meta-item"><i class="fas fa-code-branch text-accent"></i> {{ project.forks_count }}</span>
        <span class="meta-item"><i class="fas fa-circle text-accent"></i> {{ project.language || 'N/A' }}</span>
      </div>
    </div>
    
    <div class="actions">
      <a :href="project.html_url" target="_blank" class="btn btn-secondary">
        View Project <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: Object
});
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-content {
  flex: 1;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.text-accent {
  color: var(--accent-primary);
}

.actions {
  margin-top: auto;
}

.btn-secondary {
  width: 100%;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
