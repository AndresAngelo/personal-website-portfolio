import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(), // Vercel handles SSR for API routes automatically
});
