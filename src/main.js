import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import { routes, scrollBehavior } from './router.js'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, routes, isClient, initialState }) => {
    app.directive('reveal', {
      mounted(el) {
        el.classList.add('reveal-item');
        // Only run IntersectionObserver on the client side
        if (isClient) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                el.classList.add('is-visible');
                observer.unobserve(el);
              }
            });
          }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
          observer.observe(el);
        }
      }
    });
  }
)
