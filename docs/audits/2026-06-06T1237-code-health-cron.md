# Code Health — 2026-06-06 12:37 UTC

Today's angle: **Service Worker cache poisoning**
Focus layer: SW strategy correctness / CDN cache headers / offline reliability

---

## A. Recent commits

```
0fa14e2 v2.0.B.cron-walk: 2026-06-06-1219 persona: 玉珍 66yo iPad Pro landscape
797e5f2 v2.0.B.cron-arch: 2026-06-06 angle: test coverage gap
247cd5f v2.0.B.cron-ui: 2026-06-06-1206 angle: Anki SRS card design
6400f96 ⚠️ v2.0.B.cron-content: 2026-06-06-1206 angle: A7-content-word-repetition
4399150 v2.0.B.cron-ui: 2026-06-06-0904 angle: Khan Academy progress visualization
eb243c3 v2.0.B.cron-code: 2026-06-06-0635 angle: PWA install / manifest
0dbf218 ⚠️ v2.0.B.cron-content: 2026-06-06-0606 angle: A4-mirror-patterns
ba82281 v2.0.B.cron-ui: 2026-06-06-0605 angle: Duolingo Streak/League gamification
```

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| SW fetch handlers | 3 (navigate / cache-first / default) |
| Routes with cache-first | 4 (`/lessons-*` / `/audio/*` / `/mascots/*` / `/assets/*`) |
| Routes missing cache-first | `/silent.mp3`, `/sw.js`, `/manifest.webmanifest`, `/vocab.json`, `/scenarios.json`, `/sentences.json`, `/word-hints.json` |
| `_headers` entries | 8 rules (0 for `/sw.js`, 0 for `/manifest.webmanifest`) |
| Audio files vs LRU cap | 245 MP3s vs 60-entry cap (25% coverage) |
| `content-length` checks | 1 (sw.js:90-93) — broken for chunked-encoded responses |
| `skipWaiting()` calls | 2 (install + message handler) — both unconditional |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `public/sw.js:117-119` | **`undefined` respondWith crash** — default handler does `fetch(request).catch(() => caches.match(request))`. `caches.match()` returns `Promise<Response \| undefined>`. When offline + not cached, `event.respondWith(Promise<undefined>)` throws DOMException in SW context. Affects: `/silent.mp3`, `/favicon.svg`, `/vocab.json`, `/sentences.json`, `/scenarios.json`, `/word-hints.json`, `/story-kitten.json`. | SW crashes silently; offline requests to uncategorized assets return network error. Free-practice mode (uses `/sentences.json`) can't load data offline. | Change fallback to `caches.match(request).then(r => r \|\| new Response('Offline', {status: 503}))` | 15 min |
| **P1** | `public/_headers` | **`/sw.js` missing `Cache-Control: no-cache`** — Cloudflare edge caches `.js` files by default TTL (4h free tier). After a new deploy that changes `CACHE_VERSION`, CF may serve stale `sw.js` for hours. Browser 24-hour update cap does not protect against CF edge serving an unchanged body (304 or stale). Old SW keeps old `CACHE_VERSION`, never cleans old caches. | Users stuck on previous CACHE_VERSION with stale lesson JSON / audio for 4+ hours post-deploy. Defeats the entire cache-versioning mechanism. | Add `/sw.js\n  Cache-Control: no-cache, must-revalidate` to `_headers` | 5 min |
| **P1** | `public/sw.js:92-113` | **LRU cap 60 vs 245 audio files** — Ch1 alone has 245 MP3s; the 60-entry RUNTIME_CACHE cap means only the first 60 fetched entries survive. LRU overflow deletes `keys[0..overflow]` — insertion-order FIFO, not access-order. So Ch1 L1 audio (most replayed) gets evicted first as users progress through Ch1. Offline replay of lesson 1 after completing lesson 5 finds empty audio cache. | Offline playback broken for any session where a user replays earlier lessons after progressing. Exact threshold: after fetching >60 distinct MP3 URLs, first-visited audio is gone. With `preloadLessonAudio` batching 14 sentences/lesson, cap hit by lesson 5. | Raise cap to 300 or restructure as per-chapter LRU (60/chapter). Add `Map<url, timestamp>` for true LRU. | 45 min |
| **P1** | `public/sw.js:97-104` | **FIFO not LRU** — `cache.keys()` returns insertion order; `keys[i]` for `i < overflow` deletes oldest-inserted = most frequently replayed early lesson audio. Access-order tracking is absent. Same impact as above but a separate code-level cause. | Compounds #P1 LRU cap bug: even with a higher cap, eviction is still wrong order. | Track access timestamps in a `Map<url, number>` in SW memory; sort by ascending timestamp to evict least-recently-used on overflow. | 30 min |
| **P2** | `public/_headers` | **`/manifest.webmanifest` missing `no-cache`** — Only `/favicon.svg` has a 7-day cache entry. The manifest is missing from `_headers`; CF default could cache it for hours/days. Icon updates or `theme_color` changes from `manifest.webmanifest` won't propagate until CF TTL expires. | PWA home-screen icon stays stale after rebrand or icon swap. Low frequency, but painful when it happens. | Add `/manifest.webmanifest\n  Cache-Control: public, max-age=0, must-revalidate` to `_headers`. | 5 min |
| **P2** | `public/sw.js:29-32` | **Unconditional `skipWaiting()` in `install`** — New SW immediately takes control of all open tabs. Activation purges old CACHE_VERSION caches (`pickup-v2.0.B.177-*`). If user is mid-lesson when this fires, their tab already has chunks in JS memory — no visible crash — but any subsequent same-tab `fetch()` for a non-memory resource (e.g. a dynamically-loaded lesson JSON) goes through new SW with empty RUNTIME_CACHE. Network-first handles this; but if momentarily offline at that exact window, the fetch fails even though the old cache had it. | Extremely rare window (offline at precise moment of mid-lesson SW transition). Added urgency: per B.157 comment, `skipWaiting` was added as a hotfix for a specific stale-chunk bug — removing it risks re-introducing that bug. Mitigate rather than remove. | Keep `skipWaiting()` but ensure SHELL_CACHE install also pre-fetches the critical JS entry point (`/assets/index-*.js`). This requires a build-time injected hash or using a `/__manifest` JSON. | 60 min |
| **P2** | `public/sw.js:88-113` | **`content-length` guard skips caching when header absent** — Line 93: `if (size > 0 && size < 500*1024)` silently no-ops when `content-length` is missing (chunked transfer encoding). CF Pages sends `content-length` for static MP3s in practice, but streaming or future range-request responses may omit it. `size=0` → neither path (`> 0`) is true → file silently not cached. | Audio files returned without `content-length` are never cached for offline play. Silent failure — no error, SW just skips caching. Workaround: use `res.clone().blob()` to get actual size if content-length is absent. | Change guard to also cache when `sizeHeader` is absent (rely only on upper bound check via blob size): `if (!sizeHeader \|\| size < 500*1024)` — removes the false exclusion. | 20 min |

---

## D. Bundle / build health

```
dist/assets/rolldown-runtime-QTnfLwEv.js     0.69 kB │ gzip:  0.42 kB
dist/assets/zustand-Bee562SY.js              2.30 kB │ gzip:  1.03 kB
dist/assets/ChapterIntroPage-BPmwqgzn.js    2.98 kB │ gzip:  1.46 kB
dist/assets/react-router-BM6lXbF0.js       19.90 kB │ gzip:  7.51 kB
dist/assets/LessonPage-CsgaJQJe.js         27.05 kB │ gzip:  8.39 kB
dist/assets/index-BnCm34qw.js              47.60 kB │ gzip: 15.34 kB
dist/assets/zod-Cohpjn9R.js               56.50 kB │ gzip: 12.93 kB
dist/assets/react-9SDNQsEM.js             139.84 kB │ gzip: 45.34 kB
dist/assets/index-CpTfSFtW.css             23.60 kB │ gzip:  5.51 kB

Total JS: ~297 kB raw / ~92 kB gzip ✅ (< 400 kB target)
Total CSS: ~24 kB raw / ~5.5 kB gzip ✅
Build: 6/6 tests pass, 0 TS errors, 0 build warnings ✅
```

SW budget note: 245 MP3s × avg ~30 kB each ≈ 7.3 MB offline audio. RUNTIME_CACHE capped at 60 entries × ~30 kB ≈ 1.8 MB. iOS SW quota ≈ 50 MB — the cap is functionally right but the eviction strategy is wrong.

---

## E. Top 5 P0 / P1

1. **⚠️ P0 — `undefined` respondWith crashes SW** (`sw.js:117-119`): The default offline fallback passes `undefined` to `event.respondWith`. Fix: return a 503 Response instead of `undefined` when cache misses. Affects free-practice mode (sentences.json), vocab lookup, legacy story-kitten.json.

2. **⚠️ P1 — `/sw.js` not in `_headers` `no-cache`** (`_headers`): CF edge caches `sw.js` with default TTL. New SW deploys with changed `CACHE_VERSION` may not reach users for hours, leaving them on stale SW that doesn't clean old caches. Two-line fix in `_headers`.

3. **⚠️ P1 — 245 audio files vs 60 LRU cap** (`sw.js:97-104`): 80% of Ch1 audio cannot fit in offline cache simultaneously. Returning users who replay early lessons offline hear silence. Raise cap to 300 or implement per-chapter LRU buckets.

4. **⚠️ P1 — FIFO eviction evicts most-replayed content first** (`sw.js:97-104`): `cache.keys()` insertion order means Ch1 L1 audio (always-first-fetched, most-replayed) is deleted first when cap is hit. Needs access-timestamp-based LRU.

5. **P2 — `manifest.webmanifest` no explicit `no-cache`** (`_headers`): PWA manifest changes (icon, color) don't propagate until CF edge TTL expires. Low urgency but high confusion potential during rebrands.
