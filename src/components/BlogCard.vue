<template>
  <div class="glass-card blog-card group" v-reveal>
    <router-link :to="`/blog/${post.slug}`" class="blog-card-link">
      
      <div class="blog-content">
        <div class="meta-top">
          <span class="date">{{ formatDate(post.publishedAt) }}</span>
          <span class="read-time"><i class="far fa-clock"></i> {{ post.readTimeInMinutes }} min read</span>
        </div>
        
        <h3 class="title group-hover:text-gradient">{{ post.title }}</h3>
        
        <div class="footer-row">
          <div class="tags-container" v-if="post.tags?.length">
            <span v-for="tag in post.tags.slice(0, 3)" :key="tag.name" class="tag-pill">
              {{ tag.name }}
            </span>
          </div>
          
          <span class="read-more">Read <i class="fas fa-arrow-right ml-1"></i></span>
        </div>
      </div>
    </router-link>
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

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.blog-card {
  padding: 0;
  overflow: hidden;
  transition: all var(--transition-slow);
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(15, 15, 15, 0.4);
}

.blog-card:hover {
  transform: translateX(10px);
  border-color: rgba(96, 165, 250, 0.2);
  background: rgba(20, 20, 20, 0.6);
  box-shadow: -10px 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(96, 165, 250, 0.05);
}

.blog-card-link {
  display: block;
  padding: 1.5rem 2rem;
  height: 100%;
}

.blog-content {
  display: flex;
  flex-direction: column;
}

.meta-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.read-time {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.blog-card:hover .title {
  color: var(--accent-primary);
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.tags-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-pill {
  background: rgba(96, 165, 250, 0.05);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-fast);
}

.blog-card:hover .tag-pill {
  border-color: rgba(96, 165, 250, 0.2);
  color: var(--accent-primary);
}

.read-more {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  transition: all var(--transition-fast);
}

.blog-card:hover .read-more {
  color: var(--accent-primary);
  transform: translateX(4px);
}

.ml-1 { margin-left: 0.25rem; }

@media (max-width: 768px) {
  .blog-card-link {
    padding: 1.2rem 1.5rem;
  }
  .title {
    font-size: 1.2rem;
  }
}
</style>
