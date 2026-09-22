import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const expectIncludes = (file, values) => {
  const source = read(file);
  for (const value of values) assert.match(source, value, `${file} is missing ${value}`);
};

expectIncludes('src/components/OptimizedImage.astro', [
  /<Picture/, /formats=\{\['webp', 'avif'\]\}/, /width=\{resolvedWidth\}/,
  /height=\{resolvedHeight\}/, /loading=\{loading\}/,
]);
expectIncludes('src/components/StructuredData.astro', [
  /application\/ld\+json/, /'@context': 'https:\/\/schema\.org'/,
  /'@type': 'Person'/, /'@type': 'Project'/, /'@type': 'Event'/,
]);
expectIncludes('src/pages/robots.txt.ts', [/Sitemap:/, /Disallow: \/api\//]);
expectIncludes('src/pages/sitemap.xml.ts', [
  /application\/xml/, /lastmod/, /hreflang/, /getCollection\('projects'\)/,
  /getCollection\('activities'\)/,
]);

const deployedChunks = resolve(root, '.vercel/output/_functions/chunks');
assert.ok(existsSync(deployedChunks), 'build output is missing Vercel server chunks');
const chunkText = readdirSync(deployedChunks)
  .filter((file) => file.endsWith('.mjs'))
  .map((file) => readFileSync(resolve(deployedChunks, file), 'utf8'))
  .join('\n');
assert.match(chunkText, /<urlset[^>]+xmlns:xhtml=/);
assert.match(chunkText, /<lastmod>/);
assert.match(chunkText, /xhtml:link rel="alternate"/);
assert.match(chunkText, /User-agent: \*/);
assert.match(chunkText, /Sitemap:/);

console.log('M7 integration checks passed: image optimization, SEO contracts, structured data, sitemap, and robots.txt.');
