import { z } from 'astro:content';

const isoDate = z.string().refine(
  (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
  },
  { message: 'Date must be a valid ISO date in YYYY-MM-DD format' },
);

/**
 * Metadata for an activity timeline entry and its optional media links.
 */
export const activitySchema = z.object({
  title: z.string().min(1),
  date: isoDate,
  description: z.string().min(1),
  location: z.string().min(1),

  backgroundImage: z.string().min(1).optional(),
  mediaType: z.enum(['image', 'video', 'gallery']).optional(),
  links: z.object({
    eventPage: z.string().url().optional(),
    video: z.string().url().optional(),
  }).optional(),
});
