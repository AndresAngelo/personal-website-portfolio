import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const languages = ['en', 'es'] as const;

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const normalizeDate = (value: Date | string | undefined) => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
};

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? 'https://example.com';
  const [projects, activities] = await Promise.all([
    getCollection('projects'),
    getCollection('activities'),
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const entries = new Map<string, { lastmod?: string; alternates?: string[] }>();

  const add = (path: string, lastmod?: string, alternates?: string[]) => {
    entries.set(path, { lastmod: lastmod ?? today, alternates });
  };

  add('/');
  add('/en/', undefined, languages.map((language) => `${origin}/${language}/`));
  add('/es/', undefined, languages.map((language) => `${origin}/${language}/`));
  add('/projects/');
  add('/contact/');

  for (const project of projects) add(`/projects/${project.id}/`);
  for (const activity of activities) {
    const date = normalizeDate(activity.data.date);
    add(`/activities/${activity.id}/`, date);
  }

  const urls = [...entries].map(([path, entry]) => {
    const alternates = entry.alternates?.map((href) =>
      `<xhtml:link rel="alternate" hreflang="${href.split('/').at(-2)}" href="${escapeXml(href)}" />`,
    ).join('') ?? '';
    return `<url><loc>${escapeXml(new URL(path, origin).toString())}</loc><lastmod>${entry.lastmod}</lastmod>${alternates}</url>`;
  }).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
