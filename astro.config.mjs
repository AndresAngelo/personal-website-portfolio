import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import tsconfigPaths from 'tsconfig-paths';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://aea-portfolio.vercel.app',
  integrations: [sitemap(), tsconfigPaths()],
});

