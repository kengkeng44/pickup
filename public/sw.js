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
const CACHE_VERSION = 'pickup-v2.0.B.161.24';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// v2.0.B.157 bug-check #1 fix: drop '/' duplicate. SW was caching BOTH '/'
// AND '/index.html' as separate keys; network-first only updated whichever
// URL user navigated with, the other stayed stale → returning users could
// get cached-old shell loading new-hashed chunk URLs that 404.
const SHELL_URLS = ['/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.addAll(SHELL_URLS).catch(() => {
        // Ignore individual failures — partial cache is OK
      })
    )
  );
  // v2.0.B.161.24: skipWaiting() force activate new SW + bust stale B.161.22
  // chunks (preloadLessonAudio 14 parallel decode 卡 main thread).
  // 累積到此 user 反 '更卡了 載入不進去', 強制 update.
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
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
  // v2.0.B.161.25: skip caching >500KB items + LRU cap 60 entries per
  // code-reviewer audit (iOS 50MB SW quota — 200+ MP3 would evict all).
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
            const sizeHeader = res.headers.get('content-length');
            const size = sizeHeader ? parseInt(sizeHeader, 10) : 0;
            // Skip >500KB items (prevent iOS quota saturation)
            if (size > 0 && size < 500 * 1024) {
              const copy = res.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, copy);
                // LRU: cap RUNTIME_CACHE 60 entries, delete oldest
                cache.keys().then((keys) => {
                  if (keys.length > 60) {
                    const overflow = keys.length - 60;
                    for (let i = 0; i < overflow; i++) {
                      cache.delete(keys[i]).catch(() => {});
                    }
                  }
                });
              });
            }
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
