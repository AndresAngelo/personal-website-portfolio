import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(), // Vercel handles SSR for API routes automatically
  output: 'server',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  vite: {
    build: {
      minify: 'esbuild',
    },
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
    fallback: {
      es: 'en',
    },
  },
});
