import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Projects from './views/Projects.vue';
import Blogs from './views/Blogs.vue';
import BlogRead from './views/BlogRead.vue';
import Journey from './views/Journey.vue';
import About from './views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/side-hustles',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/blog/:slug',
    name: 'BlogRead',
    component: BlogRead
  },
  {
    path: '/journey',
    name: 'Journey',
    component: Journey
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'instant' }
    }
  }
});

export default router;
