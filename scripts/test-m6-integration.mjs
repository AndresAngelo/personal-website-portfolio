import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [manifest, serviceWorker, layout, localizedPage, selector, i18n, english, spanish, config] = await Promise.all([
  read('public/manifest.webmanifest'),
  read('public/sw.js'),
  read('src/layouts/Layout.astro'),
  read('src/pages/[lang]/index.astro'),
  read('src/components/LanguageSelector.astro'),
  read('src/lib/i18n.ts'),
  read('src/content/i18n/en.json'),
  read('src/content/i18n/es.json'),
  read('astro.config.mjs'),
]);

const parsedManifest = JSON.parse(manifest);
assert.equal(parsedManifest.display, 'standalone');
assert.match(parsedManifest.name, /Personal Portfolio/);
assert.match(parsedManifest.short_name, /Portfolio/);
assert.equal(parsedManifest.icons.length, 2);
assert.deepEqual(parsedManifest.icons.map((icon) => icon.sizes).sort(), ['192x192', '512x512']);

assert.match(`${layout}\n${localizedPage}`, /rel="manifest"/);
assert.match(`${layout}\n${localizedPage}`, /serviceWorker\.register\('\/sw\.js'\)/);
assert.match(selector, /localStorage\.setItem\(storageKey, language\)/);
assert.match(selector, /window\.location\.assign\(localizedPath\(language\)\)/);
assert.ok(selector.includes("replace(/^\\/(en|es)(?=\\/|$)/"));
assert.match(config, /prefixDefaultLocale: true/);
assert.match(config, /locales: \['en', 'es'\]/);

const en = JSON.parse(english);
const es = JSON.parse(spanish);
function leafKeys(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === 'object' ? leafKeys(child, next) : [next];
  });
}
assert.deepEqual(leafKeys(es).sort(), leafKeys(en).sort());
assert.match(i18n, /readKey\(translations\.en, key\)/);
assert.match(i18n, /getMissingTranslationKeys/);

const listeners = {};
const cacheStore = new Map();
const cacheApi = {
  open: async (name) => {
    if (!cacheStore.has(name)) cacheStore.set(name, new Map());
    const store = cacheStore.get(name);
    return {
      add: async (url) => store.set(url, new Response(`cached:${url}`)),
      put: async (request, response) => store.set(request.url ?? request, response),
    };
  },
  keys: async () => [...cacheStore.keys()],
  delete: async (name) => cacheStore.delete(name),
  match: async (request) => {
    for (const store of cacheStore.values()) {
      const response = store.get(request.url ?? request);
      if (response) return response.clone();
    }
    return undefined;
  },
};
const context = {
  caches: cacheApi,
  URL,
  Response,
  Request,
  fetch: async (request) => new Response(`network:${request.url ?? request}`, { status: 200 }),
  self: {
    location: { origin: 'https://example.test' },
    addEventListener: (type, handler) => { listeners[type] = handler; },
    skipWaiting: async () => {},
    clients: { claim: async () => {} },
  },
};
vm.runInNewContext(serviceWorker, context);
assert.ok(listeners.install && listeners.activate && listeners.fetch);
await listeners.install({ waitUntil: (promise) => promise });
assert.ok(cacheStore.has('portfolio-static-v1'));
const staticRequest = new Request('https://example.test/styles.css');
let staticResponse;
await listeners.fetch({ request: staticRequest, respondWith: (promise) => { staticResponse = promise; } });
assert.match(await (await staticResponse).text(), /^network:/);
const apiRequest = new Request('https://example.test/api/chat', { method: 'GET' });
let apiResponse;
await listeners.fetch({ request: apiRequest, respondWith: (promise) => { apiResponse = promise; } });
assert.match(await (await apiResponse).text(), /^network:/);

console.log('M6 integration checks passed: manifest, service worker caching strategies, i18n parity, locale routing, and language persistence.');
