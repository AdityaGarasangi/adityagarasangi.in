<template>
  <div class="blogs-view pt-32 pb-16">
    <div class="container text-center mb-12">
      <h1 class="section-title mb-4">All Blogs</h1>
      <p class="text-muted">Documenting my journey, experiences, and learnings in tech.</p>
    </div>

    <div class="container">
      <!-- Tag Filter Bar -->
      <div class="tag-filter-bar mb-8" v-if="allTags.length">
        <button
          class="tag-filter-btn"
          :class="{ active: activeTag === null }"
          @click="activeTag = null"
        >All</button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="tag-filter-btn"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >{{ tag }}</button>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loading" class="blogs-list max-w-3xl mx-auto flex flex-col gap-6">
        <div v-for="i in 5" :key="i" class="glass-card flex flex-col gap-4" style="padding: 1.5rem 2rem;">
          <div class="flex gap-4 mb-2">
            <div class="skeleton skeleton-pill" style="width: 80px"></div>
            <div class="skeleton skeleton-pill" style="width: 60px"></div>
          </div>
          <div class="skeleton skeleton-title" style="width: 90%; height: 2rem;"></div>
          <div class="flex justify-between items-center mt-2">
            <div class="flex gap-2">
              <div class="skeleton skeleton-pill"></div>
              <div class="skeleton skeleton-pill"></div>
              <div class="skeleton skeleton-pill"></div>
            </div>
            <div class="skeleton skeleton-pill" style="width: 60px"></div>
          </div>
        </div>
      </div>

      <!-- Blog list -->
      <div v-else-if="filteredBlogs.length" class="blogs-list max-w-3xl mx-auto flex flex-col gap-6">
        <BlogCard v-for="post in filteredBlogs" :key="post.slug" :post="post" />

        <div v-if="hasMore && !activeTag" class="text-center mt-8 mb-4">
          <button @click="loadMore" class="btn btn-primary" :disabled="loadingMore">
            <span v-if="loadingMore"><i class="fas fa-spinner fa-spin mr-2"></i> Loading...</span>
            <span v-else>Load More</span>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center mt-8">
        <p class="text-muted" style="font-size: 1.1rem">
          <span v-if="activeTag">No posts tagged "<strong>{{ activeTag }}</strong>" yet.</span>
          <span v-else>Still no blogs to show yet, but I'm working on some cool stuff!</span>
        </p>
        <button v-if="activeTag" class="btn btn-secondary mt-4" @click="activeTag = null">Clear filter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import BlogCard from '../components/BlogCard.vue';

useHead({
  title: 'Blogs | Aditya Garasangi',
  meta: [
    { name: 'description', content: 'Technical articles, thoughts, and tutorials on DevOps and Cloud engineering.' }
  ]
});

const blogs = ref([]);
const loading = ref(true);
const loadingMore = ref(false);
const hasMore = ref(false);
const nextCursor = ref(null);
const activeTag = ref(null);

// Derive unique sorted tags from all loaded blogs
const allTags = computed(() => {
  const tagSet = new Set();
  blogs.value.forEach(post => {
    post.tags?.forEach(t => tagSet.add(t.name));
  });
  return [...tagSet].sort();
});

const filteredBlogs = computed(() => {
  if (!activeTag.value) return blogs.value;
  return blogs.value.filter(post =>
    post.tags?.some(t => t.name === activeTag.value)
  );
});

const fetchBlogs = async (cursor = null) => {
  try {
    const url = cursor ? `/api/blogs?cursor=${cursor}` : '/api/blogs';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const result = await res.json();

    if (cursor) {
      blogs.value = [...blogs.value, ...result.data.blogs];
    } else {
      blogs.value = result.data.blogs || [];
    }

    hasMore.value = result.data.has_more;
    nextCursor.value = result.data.next_cursor;
  } catch (e) {
    console.error('Failed to load blogs', e);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadMore = () => {
  if (hasMore.value && !loadingMore.value) {
    loadingMore.value = true;
    fetchBlogs(nextCursor.value);
  }
};

onMounted(() => {
  fetchBlogs();
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-8  { margin-bottom: 2rem; }
.mb-4  { margin-bottom: 1rem; }
.mt-4  { margin-top: 1rem; }
.mt-8  { margin-top: 2rem; }
.max-w-3xl { max-width: 800px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mr-2 { margin-right: 0.5rem; }

/* Tag filter bar */
.tag-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.tag-filter-btn {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tag-filter-btn:hover {
  color: var(--text-primary);
  border-color: rgba(96, 165, 250, 0.3);
}

.tag-filter-btn.active {
  background: rgba(96, 165, 250, 0.12);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
</style>

