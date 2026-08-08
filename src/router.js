import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Projects from './views/Projects.vue';
import Blogs from './views/Blogs.vue';
import BlogRead from './views/BlogRead.vue';
import Journey from './views/Journey.vue';
import About from './views/About.vue';
import NotFound from './views/NotFound.vue';

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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

export const scrollBehavior = (to, from, savedPosition) => {
  return new Promise((resolve) => {
    // Wait for the out-in transition to finish (var(--transition-slow) is 500ms)
    setTimeout(() => {
      if (to.hash) {
        resolve({ el: to.hash, behavior: 'smooth' });
      } else if (savedPosition) {
        resolve(savedPosition);
      } else {
        // Scroll instantly so the new page appears at the top when it fades in
        resolve({ top: 0, behavior: 'instant' });
      }
    }, 500);
  });
};

export { routes };
