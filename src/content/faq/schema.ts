import { z } from 'astro:content';

/**
 * Metadata for an FAQ entry and its optional content relationships.
 */
export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1).optional(),
  relatedProjects: z.array(z.string().min(1)).optional(),
});
