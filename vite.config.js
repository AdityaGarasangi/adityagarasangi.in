import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    async includedRoutes(paths, routes) {
      // Base static routes
      const staticRoutes = routes.flatMap(r => {
        return r.path === '/blog/:slug' ? [] : [r.path]
      });
      
      try {
        // Fetch all blog slugs from the running API server
        // Requires the express server to be running during build
        let allBlogs = [];
        let hasMore = true;
        let cursor = null;
        
        while (hasMore) {
          const url = cursor ? `http://localhost:3000/api/blogs?cursor=${cursor}` : 'http://localhost:3000/api/blogs';
          const res = await fetch(url);
          if (!res.ok) throw new Error('API down');
          const data = await res.json();
          allBlogs = [...allBlogs, ...data.data.blogs];
          hasMore = data.data.has_more;
          cursor = data.data.next_cursor;
        }
        
        const dynamicRoutes = allBlogs.map(blog => `/blog/${blog.slug}`);
        return [...staticRoutes, ...dynamicRoutes];
      } catch (err) {
        console.warn('Could not fetch dynamic routes for SSG. Ensure API server is running on port 3000. Building static routes only.');
        return staticRoutes;
      }
    }
  }
})
