import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const vercel = JSON.parse(read('vercel.json'));
const headers = vercel.headers.find(({ source }) => source === '/(.*)')?.headers ?? [];
const values = new Map(headers.map(({ key, value }) => [key.toLowerCase(), value]));

assert.equal(values.get('strict-transport-security'), 'max-age=63072000; includeSubDomains; preload');
assert.equal(values.get('x-content-type-options'), 'nosniff');
assert.equal(values.get('referrer-policy'), 'strict-origin-when-cross-origin');

// Vercel provisions certificates and redirects HTTP requests to HTTPS at the
// platform edge. The repository must not add a hostname-specific redirect
// that would break preview deployments or custom domains.
assert.equal(vercel.redirects, undefined, 'HTTPS is managed by Vercel; do not add a hostname-specific redirect');

const collectFiles = (file) => {
  if (!existsSync(resolve(root, file))) return [];
  if (statSync(resolve(root, file)).isFile()) return [file];
  return readdirSync(resolve(root, file), { withFileTypes: true })
    .flatMap((entry) => collectFiles(resolve(file, entry.name)));
};
const sourceFiles = ['src', 'public', 'astro.config.mjs', 'vercel.json'].flatMap(collectFiles);
const insecureReferences = [];
for (const file of sourceFiles) {
  const source = read(file);
  for (const match of source.matchAll(/(?<!:)http:\/\/(?!www\.w3\.org|www\.sitemaps\.org)[^\s"'`<>)]*/g)) {
    insecureReferences.push(`${file}:${match[0]}`);
  }
}
assert.deepEqual(insecureReferences, [], `mixed-content references found: ${insecureReferences.join(', ')}`);

console.log('M8 HTTPS checks passed: Vercel edge HTTPS, HSTS, and mixed-content contract.');
