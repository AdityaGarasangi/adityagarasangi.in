<template>
  <div class="project-card glass-card">
    <div class="card-header">
      <div class="title-group">
        <h3 class="project-title">
          <a :href="project.html_url" target="_blank">{{ project.displayName || formatProjectTitle(project.name) }}</a>
        </h3>
        <div class="project-topics" v-if="project.topics?.length">
          <span v-for="topic in project.topics.slice(0, 3)" :key="topic" class="topic-tag">#{{ topic }}</span>
        </div>
      </div>
      <div class="header-actions">
        <button @click="$emit('peek', project)" class="icon-btn" title="Quick Look">
          <i class="far fa-eye"></i>
        </button>
        <a :href="project.html_url" target="_blank" class="icon-btn" title="View on GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>

    <div class="project-body">
      <p class="description">{{ project.description || 'No description available.' }}</p>
      
      <!-- Minimalist Language Bar -->
      <div class="tech-stack" v-if="Object.keys(project.languages || {}).length">
        <div class="mini-progress-bar">
          <span 
            v-for="(bytes, lang) in project.languages" 
            :key="lang"
            class="progress-seg"
            :style="{ 
              width: calculatePercentage(bytes, project.languages) + '%',
              backgroundColor: getLanguageColor(lang)
            }"
          ></span>
        </div>
        <div class="lang-labels">
          <span v-for="(bytes, lang) in project.languages" :key="lang" class="lang-item">
            <span class="lang-dot" :style="{ backgroundColor: getLanguageColor(lang) }"></span>
            {{ lang }} <span class="percent">{{ calculatePercentage(bytes, project.languages) }}%</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatProjectTitle } from '../utils/projectFormatter';

const props = defineProps({
  project: Object
});

defineEmits(['peek']);

const calculatePercentage = (bytes, allLanguages) => {
  const total = Object.values(allLanguages).reduce((sum, b) => sum + b, 0);
  return total > 0 ? Math.round((bytes / total) * 100) : 0;
};

const getLanguageColor = (lang) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#41b883',
    'Go': '#00ADD8',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'HCL': '#844FBA',
    'Java': '#b07219',
    'Ruby': '#701516'
  };
  return colors[lang] || '#6e7681';
};
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.01);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.project-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--accent-primary);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-primary-rgb), 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
  gap: 1rem;
}

.title-group {
  flex: 1;
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
}

.project-title a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-card:hover .project-title a {
  color: var(--accent-primary);
}

.topic-tag {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-right: 0.6rem;
  font-weight: 500;
  opacity: 0.7;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.icon-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: scale(1.1);
}

.project-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tech-stack {
  margin-top: auto;
}

.mini-progress-bar {
  height: 4px;
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-seg {
  height: 100%;
}

.lang-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
