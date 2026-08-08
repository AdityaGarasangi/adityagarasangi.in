<template>
  <div class="projects-view pt-32 pb-16">
    <div class="container text-center mb-12">
      <h1 class="section-title mb-4">Side Hustles</h1>
      <p class="text-muted">Exploring my latest repositories, experiments, and contributions</p>
    </div>
    
    <div class="container">
      <div v-if="loading" class="grid grid-cols-2">
        <div v-for="i in 6" :key="i" class="glass-card flex flex-col gap-4">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 80%"></div>
          <div class="flex gap-4 mt-auto">
            <div class="skeleton skeleton-pill"></div>
            <div class="skeleton skeleton-pill"></div>
          </div>
        </div>
      </div>
      <div v-else-if="projects.length" class="grid grid-cols-2">
        <ProjectCard 
          v-for="repo in projects" 
          :key="repo.id" 
          :project="repo" 
          @peek="handlePeek"
        />
      </div>
      <div v-else class="text-center text-red-400">Failed to load projects.</div>
    </div>

    <!-- README Quick Peek Modal -->
    <Modal 
      :show="showReadmeModal" 
      :title="peekProject?.name ? formatProjectTitle(peekProject.name) : 'Project Documentation'" 
      @close="closeModal"
    >
      <div v-if="loadingReadme" class="text-center py-12">
        <i class="fas fa-spinner fa-spin fa-3x text-accent mb-4"></i>
        <p class="text-muted">Fetching documentation from GitHub...</p>
      </div>
      <div v-else class="markdown-body" v-html="renderedReadme"></div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import ProjectCard from '../components/ProjectCard.vue';
import Modal from '../components/Modal.vue';
import { FEATURED_REPOS, formatProjectTitle } from '../utils/projectFormatter';

// Configure marked with highlight.js
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

useHead({
  title: 'Side Hustles | Aditya Garasangi',
  meta: [
    { name: 'description', content: 'A collection of my technical projects, tools, and side hustles.' }
  ]
});
const projects = ref([]);
const loading = ref(true);

// Readme Modal State
const showReadmeModal = ref(false);
const loadingReadme = ref(false);
const peekProject = ref(null);
const renderedReadme = ref('');

const handlePeek = async (project) => {
  peekProject.value = project;
  showReadmeModal.value = true;
  loadingReadme.value = true;
  renderedReadme.value = '';

  try {
    // URL pattern: /api/github/readme/:owner/:repo?branch=:branch
    // The owner is currently hardcoded in server.js as 'adityagarasangi'
    const res = await fetch(`/api/github/readme/adityagarasangi/${project.name}?branch=${project.default_branch || 'main'}`);
    if (!res.ok) throw new Error('README not found');
    const result = await res.json();
    
    // Parse markdown to HTML
    renderedReadme.value = marked.parse(result.data || 'No documentation found.');
  } catch (e) {
    console.error('Failed to load README', e);
    const errorMsg = e.message === 'README not found' ? 'No README.md found for this repository.' : `Failed to load: ${e.message}`;
    renderedReadme.value = `<div class="text-center py-12 text-muted">${errorMsg}</div>`;
  } finally {
    loadingReadme.value = false;
  }
};

const closeModal = () => {
  showReadmeModal.value = false;
};

const fetchProjects = async () => {
  try {
    const res = await fetch('/api/github/repos');
    if (!res.ok) throw new Error('Failed to fetch repos');
    const result = await res.json();
    projects.value = result.data || [];
  } catch (e) {
    console.error('Failed to load projects', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjects();
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
