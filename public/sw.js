const CACHE_VERSION = 'v1';
const STATIC_CACHE = `portfolio-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `portfolio-runtime-${CACHE_VERSION}`;
const PRECACHE_URLS = ['/', '/manifest.webmanifest', '/icons/icon-192.svg', '/icons/icon-512.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then(async (cache) => {
    await Promise.all(PRECACHE_URLS.map(async (url) => {
      try { await cache.add(url); } catch { /* Optional shell routes may be unavailable. */ }
    }));
    await self.skipWaiting();
  }));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(
    names.filter((name) => name.startsWith('portfolio-') && ![STATIC_CACHE, RUNTIME_CACHE].includes(name))
      .map((name) => caches.delete(name)),
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return event.respondWith(networkFirst(request));
  if (request.mode === 'navigate') return event.respondWith(networkFirst(request, '/'));
  return event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(RUNTIME_CACHE)).put(request, response.clone());
  return response;
}

async function networkFirst(request, fallbackPath) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(RUNTIME_CACHE)).put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallbackPath) return (await caches.match(fallbackPath)) || Response.error();
    return Response.error();
  }
}
