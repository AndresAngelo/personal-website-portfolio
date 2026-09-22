import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    problem: z.string(),
    role: z.string(),
    techStack: z.array(z.string()),
    heroImage: z.string().optional(),
    videoPitch: z.string().optional(),
    pinned: z.boolean().optional(),
    links: z.object({
      repo: z.string().optional(),
      demo: z.string().optional(),
      caseStudy: z.string().optional(),
    }).optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    backgroundImage: z.string().optional(),
    mediaType: z.enum(['image', 'video', 'gallery']).optional(),
    links: z.object({
      eventPage: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    relatedProjects: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, activities, faq };
