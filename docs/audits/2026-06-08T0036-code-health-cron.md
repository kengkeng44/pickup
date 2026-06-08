# Code Health — 2026-06-08 00:36 UTC

Today's angle: **Web Vitals (LCP / FID / CLS / INP)**
Focus layer: Rendering pipeline — image loading, data-fetch waterfalls, layout shift sources, React interaction latency

---

## A. Recent commits

```
40b22e8 cron-walk: ⚠️ P0 2026-06-08-0017 persona: 阿銘 29yo deuteranopia Pixel8
e3a92de ⚠️ cron-content: 2026-06-08-0012 angle: audio-sync-round2
63fc88b cron-ui: 2026-06-08-0008 angle: Khan Academy progress visualization
5a198fe v2.0.B.260: Ch30-31 (Heracles + Robin Hood ep1)
489b330 v2.0.B.259: MapPage + ChaptersPage 解鎖 Ch9-29
d5ce4b2 cron-ui: 2026-06-07-2106 angle: Speak AI tutor mic UX
e963b11 cron-code: 2026-06-07-1835 angle: WebAudio decodeAudioData main thread block
```

---

## B. Signal (counts per angle)

| Metric | Count | Verdict |
|--------|-------|---------|
| Images with `height: auto` (no intrinsic dims) | 4 | ⚠️ CLS risk |
| Independent fetch callsites for same JSON | 3 | ⚠️ duplicate network |
| `modulePreload: false` (kills ALL preload hints) | 1 | ⚠️ lazy chunk waterfall |
| `useEffect` missing deps array (fires every render) | 1 | ⚠️ INP waste |
| `useState(null)` + `useEffect` banner (CLS trigger) | 1 | ⚠️ CLS shift |
| Sync-imported carousel on critical path | 1 | ⚠️ main bundle bloat |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `LessonPage.tsx:58` | Raw `fetch()` on every mount — does NOT use MapPage's module-level `lessonCache`. Same-session navigation back from lesson → map → lesson refetches full `lessons-ch{N}.json` (110+ Q, max-age=3600). Browser cache helps on 2nd hit but adds ~50ms waterfall vs 0ms memory. Loading flash visible as empty lesson screen. | INP / perceived load | Extract `lessonCache` to shared `src/data/lessonFetch.ts`; LessonPage + KeySentencesSheet + ChapterIntroPage all import same cache. | S (30min) |
| **P0** | `MapPage.tsx:235-241` | `tomorrowQueue` banner: `useState(null)` + `useEffect(() => setTomorrowQueue(readTomorrowQueue()), [])`. Banner is added to DOM on 2nd render (after mount), pushing chapter header card + all 24 nodes down → measurable CLS for any returning user who queued a story. `readTomorrowQueue()` is a cheap localStorage read — no reason to defer it. | CLS | Change `useState(null)` to lazy initializer: `useState(() => isTomorrowBannerDue() ? readTomorrowQueue() : null)`. Remove the `useEffect`. Slot is stable on first paint. | XS (10min) |
| **P0** | `LessonPage.tsx:173-175` | `NarrativeLine` `useEffect(() => { wireSentenceHints(ref.current) })` has **no deps array** → fires on every render of `NarrativeLine`. A lesson with 6 narrative lines fires 6 DOM mutations on every state update (e.g., each keypress in `type-what-you-hear`, each answer tap). `wireSentenceHints` wraps words in `<span>` — re-running on mounted DOM is a no-op but costs style recalc. | INP | Add `[text]` as deps array: `useEffect(() => { wireSentenceHints(ref.current) }, [text])`. One-time on mount. | XS (5min) |
| **P1** | `vite.config.ts:17` | `modulePreload: false` disables ALL `<link rel="modulepreload">` hints — not just the polyfill. With 6 lazy chunks (LessonPage 63KB, react 139KB, zod 56KB, react-router 19KB), browser discovers them only at parse-time, not speculatively. First lesson tap = cold waterfall. Fix should be `{ polyfill: false }` to keep hints without polyfill. | LCP (lesson entry) | Change `modulePreload: false` → `modulePreload: { polyfill: false }`. Vite generates `<link rel="modulepreload">` for all chunks without injecting the 1.6KB polyfill. | XS (2min) |
| **P1** | `App.tsx:16` + `MapPage.tsx:16` | `GrandmaRecommendCarousel` is **synchronously imported** into `MapPage`, which is a sync route in `App`. The carousel drags in 1121 lines of recommendation engine (`storyRecommend.ts` + `storyTags.ts` + `userProfile.ts`) into `index-BwIebtgx.js` (168KB raw / 49KB gz). For `xp=0` first-time users the carousel is entirely hidden — they pay full parse cost for code they never see. | LCP (main bundle parse) | `const GrandmaRecommendCarousel = lazy(() => import('../components/GrandmaRecommendCarousel'))` in MapPage + wrap render site in `<Suspense fallback={null}>`. Saves ~8-10KB gz from critical path. | S (20min) |
| **P2** | `MapPage.tsx:424,452` | `iso-grandma.webp` (128KB) and `iso-shiba.webp` (98KB) rendered with `width: 88/80, height: 'auto'`. Both are preloaded in index.html. Browser fetches early, but without an intrinsic height the layout engine can't reserve vertical space until the image decodes → micro-shift in the absolutely-positioned mascot container on slow connections. | CLS (minor) | Add `height` attribute matching actual image aspect ratio. `iso-grandma.webp`: image is ~88×110, so `height={110}`. `iso-shiba.webp`: ~80×90, `height={90}`. Keeps `height: auto` style for CSS flexibility but satisfies the browser's native aspect-ratio reservation. | XS (10min) |
| **P2** | `KeySentencesSheet.tsx:32` | 3rd independent `fetch()` for `lessons-ch${chapter}.json`. MapPage caches in `lessonCache`, LessonPage fetches independently, KeySentencesSheet adds a 3rd callsite. All three have divergent Lesson interface shapes. A shared fetch module would eliminate the duplication and unify the type. | Network waste | Same fix as P0-1: shared `lessonFetch.ts`. | S (30min, bundled with P0) |
| **P2** | `renderers.tsx:903` | `picture-mc` renderer `<img>` has no `width` or `height` attributes — only `maxWidth: 200, maxHeight: 160` via CSS. Browser can't reserve aspect-ratio box before image loads → layout shifts content below the image card on question transitions. | CLS (lesson) | Add `width={200} height={160}` to the `<img>`. The CSS `objectFit: contain` + `maxWidth/maxHeight` already handles oversized images gracefully. | XS (2min) |

---

## D. Bundle / build health

```
dist/assets/index-BwIebtgx.js     168.35 kB │ gzip: 49.55 kB  ← main (includes GrandmaRecommendCarousel eagerly)
dist/assets/react-CvBZlOBd.js     139.88 kB │ gzip: 45.36 kB
dist/assets/LessonPage-DhC6stwg.js  63.85 kB │ gzip: 17.20 kB  ← lazy ✓
dist/assets/zod-Cohpjn9R.js         56.50 kB │ gzip: 12.93 kB
dist/assets/react-router-wgzytNDj.js 19.90 kB │ gzip:  7.51 kB
dist/assets/ChapterIntroPage-BEYDUe_B.js 3.02 kB │ gzip: 1.48 kB ← lazy ✓
dist/assets/WardrobeView-BXwfocmC.js 5.14 kB │ gzip: 1.98 kB ← lazy ✓
dist/assets/zustand-ELZZeSVj.js      2.30 kB │ gzip:  1.03 kB
Total gz (excl. peace.mp3):  ~136 kB
```

**Observations:**
- Build PASS, 0 warnings, 382 tests pass.
- `modulePreload: false` prevents Vite from emitting `<link rel="modulepreload">` for `react-CvBZlOBd.js` (45KB gz). On first lesson tap the browser discovers + downloads it sequentially — ~200ms penalty on 4G.
- `zod-Cohpjn9R.js` (12.93KB gz) loads eagerly because it's imported by the main bundle path (lessons.ts schema). Acceptable; zod is used at runtime for lesson validation.
- `GrandmaRecommendCarousel` not code-split; recommendation engine modules included in `index-BwIebtgx.js`.

---

## E. Top 5 P0

### #1 · `LessonPage.tsx:58` — triple-fetch for same JSON (no shared cache)

**Problem:** `LessonPage`, `KeySentencesSheet`, and `ChapterIntroPage` each `fetch()` `lessons-ch${chapter}.json` independently. `MapPage` has a module-level `lessonCache` but doesn't export it. Every lesson navigation = a new fetch (or browser-cache hit that still adds ~50ms RTT on CF edge).

**Fix:**
```ts
// NEW: src/data/lessonFetch.ts
const _cache: Record<number, Promise<unknown[]>> = {};
export function fetchLessons(chapter: number): Promise<unknown[]> {
  _cache[chapter] ??= fetch(`/lessons-ch${chapter}.json`)
    .then(r => r.ok ? r.json() : [])
    .catch(() => []);
  return _cache[chapter];
}
```
Then `LessonPage` + `KeySentencesSheet` + `ChapterIntroPage` + `MapPage` all import from this module. Second navigation = 0ms memory.

---

### #2 · `MapPage.tsx:235-241` — tomorrowQueue CLS

**Problem:**
```ts
const [tomorrowQueue, setTomorrowQueue] = useState<TomorrowQueueEntry | null>(null);
useEffect(() => {
  try { if (isTomorrowBannerDue()) setTomorrowQueue(readTomorrowQueue()); }
  catch {}
}, []);
```
Banner height (~60px) appears post-first-render, shifting all chapter nodes down.

**Fix:** Lazy initializer reads synchronously, no shift:
```ts
const [tomorrowQueue, setTomorrowQueue] = useState<TomorrowQueueEntry | null>(
  () => { try { return isTomorrowBannerDue() ? readTomorrowQueue() : null; } catch { return null; } }
);
```
Remove the `useEffect` block entirely.

---

### #3 · `LessonPage.tsx:173` — NarrativeLine useEffect fires on every render

**Problem:**
```ts
useEffect(() => {
  if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
}); // ← no deps array!
```
`wireSentenceHints` rewraps text nodes in `<span class="word">` elements. Called on every render = style recalc triggered by every interaction (option tap, counter update). Compounds with multiple NarrativeLines in prologue lessons.

**Fix:**
```ts
useEffect(() => {
  if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
}, [text]); // ← run once per text change
```

---

### #4 · `vite.config.ts:17` — modulePreload: false kills chunk hints

**Problem:** `modulePreload: false` is documented in Vite as "disable link injection entirely". The intent was to drop the 1.6KB polyfill. But this also removes `<link rel="modulepreload">` for all chunks.

**Symptom:** First lesson tap on cold load: browser discovers `react-CvBZlOBd.js` (45KB gz) only when the module graph requests it, adding a sequential network round-trip.

**Fix:**
```ts
modulePreload: { polyfill: false },
```
Vite emits preload hints for all entry chunks without the polyfill script.

---

### #5 · `App.tsx:16` + `MapPage.tsx:16` — GrandmaRecommendCarousel eager import

**Problem:** `GrandmaRecommendCarousel` pulls `storyRecommend.ts` (504 lines) + `storyTags.ts` (250 lines) + `userProfile.ts` (367 lines) = 1121 lines into the critical path. For `xp=0` users the carousel never renders.

**Fix:**
```ts
// MapPage.tsx — replace static import
const GrandmaRecommendCarousel = lazy(() => import('../components/GrandmaRecommendCarousel'));

// render site
<Suspense fallback={null}>
  <GrandmaRecommendCarousel />
</Suspense>
```
Removes ~8KB gz from first-paint parse cost. Recommendation engine loads only after first user XP is earned.
