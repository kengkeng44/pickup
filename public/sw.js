/**
 * Pickup v2.0.B.155 service worker — minimal offline shell.
 *
 * Strategy: stale-while-revalidate for app shell + cache-first for
 * lessons JSON + audio MP3s. Network-first for HTML so updates ship
 * immediately on next visit.
 *
 * No cache versioning yet — relies on filename-hashed Vite chunks for
 * cache busting. SW itself is updated by browser detecting byte diff.
 */
const CACHE_VERSION = 'pickup-v2.0.B.155';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Pre-cache only the index. Hashed Vite chunks fetched + cached at runtime.
const SHELL_URLS = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.addAll(SHELL_URLS).catch(() => {
        // Ignore individual failures — partial cache is OK
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML (so deploys ship to users immediately)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Cache-first for lessons + audio + images (heavy, rarely changed)
  if (
    url.pathname.startsWith('/lessons-') ||
    url.pathname.startsWith('/audio/') ||
    url.pathname.startsWith('/mascots/') ||
    url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Default: network with fallback to cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
