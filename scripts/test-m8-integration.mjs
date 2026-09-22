import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const vercel = JSON.parse(read('vercel.json'));
const headers = vercel.headers.find(({ source }) => source === '/(.*)')?.headers ?? [];
const values = new Map(headers.map(({ key, value }) => [key.toLowerCase(), value]));
const csp = values.get('content-security-policy-report-only');

for (const [key, expected] of [
  ['strict-transport-security', 'max-age=63072000; includeSubDomains; preload'],
  ['x-frame-options', 'DENY'],
  ['x-content-type-options', 'nosniff'],
  ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['x-xss-protection', '1; mode=block'],
]) assert.equal(values.get(key), expected, `${key} security header contract`);

assert.ok(csp, 'CSP report-only header is configured');
for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'", 'report-uri /api/csp-report']) {
  assert.ok(csp.includes(directive), `CSP directive missing: ${directive}`);
}
assert.ok(!csp.includes("'unsafe-inline'") && !csp.includes("'unsafe-eval'"), 'CSP must not allow unsafe script execution');

const privacy = read('src/pages/privacy-policy.astro');
for (const marker of ['privacy-page', 'id="information"', 'id="services"', 'id="cookies"', 'id="retention"', 'id="contact"', 'hello@aea.dev']) {
  assert.ok(privacy.includes(marker), `privacy policy marker missing: ${marker}`);
}

const cookie = read('src/components/CookieConsent.astro');
for (const marker of ['data-cookie-accept', 'data-cookie-reject', 'localStorage.setItem(STORAGE_KEY, value)', 'localStorage.getItem(STORAGE_KEY)', 'privacy-policy#cookies', 'settings.addEventListener']) {
  assert.ok(cookie.includes(marker), `cookie-consent marker missing: ${marker}`);
}

assert.ok(existsSync(resolve(root, 'public/security.txt')), 'security.txt must exist');
const securityTxt = read('public/security.txt');
for (const marker of ['Contact:', 'Expires:', 'Preferred-Languages:', 'Canonical:']) assert.match(securityTxt, new RegExp(`^${marker}`, 'm'));

const cspReport = read('src/pages/api/csp-report.ts');
assert.match(cspReport, /export const POST/);
assert.match(cspReport, /status: 204/);
assert.match(cspReport, /status: 413/);

const collectFiles = (file) => {
  const absolute = resolve(root, file);
  if (statSync(absolute).isFile()) return [file];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => collectFiles(resolve(file, entry.name)));
};
const sourceFiles = ['src', 'public', 'astro.config.mjs', 'vercel.json'].flatMap(collectFiles);
const insecureReferences = [];
for (const file of sourceFiles) {
  const contents = read(file);
  for (const match of contents.matchAll(/(?<!:)http:\/\/(?!www\.w3\.org|www\.sitemaps\.org)[^\s"'`<>)]*/g)) insecureReferences.push(`${file}:${match[0]}`);
}
assert.deepEqual(insecureReferences, [], `mixed-content references found: ${insecureReferences.join(', ')}`);

console.log('M8 integration checks passed: headers, CSP reporting, privacy, cookies, security.txt, and mixed content.');
