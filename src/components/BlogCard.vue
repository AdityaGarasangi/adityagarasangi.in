<template>
  <div class="glass-card blog-card" :class="{ 'featured': isFeatured }">
    <div class="blog-image">
      <img :src="post.coverImage?.url || '/images/favicon.svg'" :alt="post.title" :class="{ 'placeholder': !post.coverImage }" />
    </div>
    
    <div class="blog-content">
      <div v-if="isFeatured" class="featured-badge">Latest Story</div>
      
      <h3><router-link :to="`/blog/${post.slug}`" class="text-gradient hover-underline">{{ post.title }}</router-link></h3>
      <p class="desc">{{ post.brief }}</p>
      
      <div class="footer-meta">
        <span class="read-time"><i class="far fa-clock"></i> {{ post.readTimeInMinutes }} min read</span>
        <router-link :to="`/blog/${post.slug}`" class="btn" :class="isFeatured ? 'btn-primary' : 'btn-link'">
          Read <i class="fas fa-arrow-right ml-2"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object,
  isFeatured: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.blog-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.blog-card.featured {
  grid-column: 1 / -1;
  flex-direction: row;
}

.blog-image {
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.blog-card.featured .blog-image {
  height: auto;
  min-height: 300px;
  width: 50%;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-image img.placeholder {
  object-fit: contain;
  padding: 3rem;
  opacity: 0.2;
}

.blog-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog-card.featured .blog-content {
  padding: 3rem;
  width: 50%;
  justify-content: center;
}

.featured-badge {
  color: var(--accent-primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.blog-card.featured h3 {
  font-size: 1.8rem;
}

.desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.blog-card.featured .desc {
  -webkit-line-clamp: 4;
  font-size: 1.05rem;
}

.footer-meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--glass-border);
}

.read-time {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.btn-link {
  color: var(--accent-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.btn-link:hover {
  color: var(--accent-secondary);
}

.ml-2 {
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .blog-card.featured {
    flex-direction: column;
  }
  .blog-card.featured .blog-image {
    width: 100%;
    min-height: 250px;
  }
  .blog-card.featured .blog-content {
    width: 100%;
    padding: 1.5rem;
  }
}
</style>
