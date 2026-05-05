<template>
  <div class="projects-view pt-32 pb-16">
    <div class="container text-center mb-12">
      <h1 class="section-title mb-4">Side Hustles</h1>
      <p class="text-muted">Exploring my latest repositories, experiments, and contributions</p>
    </div>
    
    <div class="container">
      <div v-if="loading" class="grid grid-cols-2">
        <div v-for="i in 6" :key="i" class="skeleton glass-card" style="height: 200px"></div>
      </div>
      <div v-else-if="projects.length" class="grid grid-cols-2">

        <ProjectCard v-for="repo in projects" :key="repo.id" :project="repo" />
      </div>
      <div v-else class="text-center text-red-400">Failed to load projects.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';

const GITHUB_USERNAME = 'adityagarasangi';
const projects = ref([]);
const loading = ref(true);

const fetchProjects = async () => {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    const repos = await res.json();
    projects.value = repos.filter(repo => !repo.fork);
  } catch (e) {
    console.error('Failed to load projects', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjects();
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }

.stats-card {
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.02);
}

.stats-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.stat-img {
  height: 160px;
  width: auto;
  max-width: 100%;
}

@media (min-width: 768px) {
  .stats-images {
    flex-direction: row;
  }
}
</style>
