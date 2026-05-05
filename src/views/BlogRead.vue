<template>
  <div class="blog-read-view pt-32 pb-16">
    <div class="container max-w-3xl">
      <div v-if="loading" class="text-center">
        <i class="fas fa-circle-notch fa-spin fa-3x text-accent mb-4"></i>
        <p>Loading article...</p>
      </div>
      
      <div v-else-if="post">
        <router-link to="/blogs" class="back-link mb-8"><i class="fas fa-arrow-left"></i> Back to blogs</router-link>
        
        <div class="blog-header mb-8 text-center">
          <h1 class="title mb-4">{{ post.title }}</h1>
          <div class="meta text-muted">
            <span><i class="far fa-calendar"></i> {{ new Date(post.publishedAt).toLocaleDateString() }}</span>
            <span class="mx-3">•</span>
            <span><i class="far fa-clock"></i> {{ post.readTimeInMinutes }} min read</span>
          </div>
        </div>
        
        <div v-if="post.coverImage?.url" class="cover-image mb-12">
          <img :src="post.coverImage.url" :alt="post.title" class="rounded-xl w-full" />
        </div>
        
        <div class="blog-content markdown-body" v-html="compiledMarkdown"></div>
      </div>
      
      <div v-else class="text-center">
        <i class="fas fa-exclamation-triangle fa-3x text-red-400 mb-4"></i>
        <p>Post not found or failed to load.</p>
        <router-link to="/blogs" class="btn btn-primary mt-6">Go Back</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';

const route = useRoute();
const post = ref(null);
const loading = ref(true);

const HASHNODE_USERNAME = 'adityagarasangi0';

const fetchPost = async () => {
  const slug = route.params.slug;
  const query = `
    query GetPost {
      user(username: "${HASHNODE_USERNAME}") {
        post(slug: "${slug}") {
          title
          contentMarkdown
          coverImage { url }
          readTimeInMinutes
          publishedAt
        }
      }
    }
  `;
  
  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const result = await res.json();
    post.value = result.data?.user?.post;
  } catch (e) {
    console.error('Failed to load post', e);
  } finally {
    loading.value = false;
  }
};

const compiledMarkdown = computed(() => {
  if (!post.value?.contentMarkdown) return '';
  return marked.parse(post.value.contentMarkdown);
});

onMounted(() => {
  fetchPost();
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-4 { margin-bottom: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mx-3 { margin-left: 0.75rem; margin-right: 0.75rem; }

.max-w-3xl {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-primary);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.back-link:hover {
  color: var(--accent-secondary);
  transform: translateX(-5px);
}

.title {
  font-size: 2.5rem;
  line-height: 1.2;
}

.text-muted {
  color: var(--text-muted);
}

.rounded-xl {
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
}

.w-full {
  width: 100%;
}

/* Markdown Styles */
:deep(.markdown-body) {
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.8;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3) {
  font-family: var(--font-display);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

:deep(.markdown-body p) {
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

:deep(.markdown-body a) {
  color: var(--accent-primary);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all var(--transition-fast);
}

:deep(.markdown-body a:hover) {
  text-decoration-color: var(--accent-primary);
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  color: var(--text-muted);
}

:deep(.markdown-body li) {
  margin-bottom: 0.5rem;
}

:deep(.markdown-body pre) {
  background: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

:deep(.markdown-body code) {
  font-family: monospace;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--accent-secondary);
}

:deep(.markdown-body pre code) {
  background: transparent;
  padding: 0;
  color: var(--text-primary);
}

:deep(.markdown-body blockquote) {
  border-left: 4px solid var(--accent-primary);
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
  font-style: italic;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
  border: 1px solid var(--glass-border);
}

@media (max-width: 768px) {
  .title { font-size: 2rem; }
}
</style>
