import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    problem: z.string(),
    role: z.string(),
    techStack: z.array(z.string()),
    // Media fields
    heroImage: z.string().optional().describe('Optional hero image for the project'),
    videoPitch: z.string().optional().describe('Optional video pitch URL (YouTube/Vimeo)'),
    pinned: z.boolean().optional().describe('Pin this project to the top of the list'),
    links: z.object({
      repo: z.string().optional(),
      demo: z.string().optional(),
      caseStudy: z.string().optional(),
    }).optional(),
  }),
});

const activities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    // Media fields
    backgroundImage: z.string().optional().describe('Optional background image for the activity'),
    mediaType: z.enum(['image', 'video', 'gallery']).optional().describe('Type of media content'),
    links: z.object({
      eventPage: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    // Enhanced fields
    category: z.string().optional().describe('Category for organizing FAQ items'),
    relatedProjects: z.array(z.string()).optional().describe('Array of related project slugs'),
  }),
});

export const collections = { projects, activities, faq };
