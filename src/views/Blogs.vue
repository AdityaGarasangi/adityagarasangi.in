<template>
  <div class="blogs-view pt-32 pb-16">
    <div class="container text-center mb-12">
      <h1 class="section-title mb-4">All Blogs</h1>
      <p class="text-muted">Documenting my journey, experiences, and learnings in tech.</p>
    </div>
    
    <div class="container">
      <div v-if="loading" class="grid grid-cols-3">
        <div v-for="i in 6" :key="i" class="skeleton glass-card" style="height: 300px"></div>
      </div>
      <div v-else-if="blogs.length" class="grid grid-cols-3">
        <BlogCard v-for="post in blogs" :key="post.slug" :post="post" />
      </div>
      <div v-else class="text-center mt-8">
        <p class="text-muted" style="font-size: 1.1rem">Still no blogs to show yet, but I'm working on some cool stuff!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BlogCard from '../components/BlogCard.vue';

const HASHNODE_USERNAME = 'adityagarasangi0';
const blogs = ref([]);
const loading = ref(true);

const fetchBlogs = async () => {
  const query = `
    query GetPosts {
      user(username: "${HASHNODE_USERNAME}") {
        posts(page: 1, pageSize: 20) {
          nodes { title brief slug coverImage { url } readTimeInMinutes publishedAt }
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
    blogs.value = result.data?.user?.posts?.nodes || [];
  } catch (e) {
    console.error('Failed to load blogs', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBlogs();
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.pt-32 { padding-top: 8rem; }
.pb-16 { padding-bottom: 4rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-4 { margin-bottom: 1rem; }
</style>
