import { z } from 'astro:content';

/**
 * Metadata required to render a project card, plus optional fields used by
 * the portfolio's richer project presentation.
 */
export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  image: z.string().min(1),
  link: z.string().min(1),

  heroImage: z.string().min(1).optional(),
  videoPitch: z.string().url().optional(),
  pinned: z.boolean().optional(),

  tagline: z.string().optional(),
  problem: z.string().optional(),
  role: z.string().optional(),
  techStack: z.array(z.string().min(1)).optional(),
  links: z.object({
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    caseStudy: z.string().url().optional(),
  }).optional(),
});
