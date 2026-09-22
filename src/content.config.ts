import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { activitySchema } from './content/activities/schema';
import { faqSchema } from './content/faq/schema';
import { projectSchema } from './content/projects/schema';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: activitySchema,
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' }),
  schema: faqSchema,
});

export const collections = { projects, activities, faq };
