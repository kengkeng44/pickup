# Code Health — 2026-06-07 00:35 UTC

Today's angle: **Error boundary coverage**
Focus layer: React render crash surface — missing ErrorBoundary components, unguarded fetch, NaN chapter param, useMemo without try/catch, silent root failure.

---

## A. Recent commits

```
26e2f40 v2.0.B.cron-walk: ⚠️ P0 2026-06-07-0017 persona: 阿凱 15yo Android Chrome
3490c22 v2.0.B.cron-content: 2026-06-07-0009 angle: A5-cultural-reference
59def2c v2.0.B.cron-ui: 2026-06-07-0008 angle: Duolingo Stories UX
86da90e v2.0.B.cron-ui: 2026-06-06-2216 angle: Lingq known-words counter
14c81fd v2.0.B.246: 🚀 啟用 CI auto-deploy to Cloudflare Pages
7b49ce7 v2.0.B.245: NextStoryPicker (兩按鈕系統) + STORY_REGISTRY 擴張 110 entries
7f5b302 v2.0.B.244: 5 歷史故事 ship (Ch22-26) + 兒童故事排名研究
ab3c066 v2.0.B.cron-code: 2026-06-06-1835 angle: SEO (meta tags / Open Graph)
```

Build: ✅ 38 test files / 382 tests passed. Vite build clean.
Bundle: main 164 kB raw / 48 kB gz · LessonPage chunk 62 kB raw / 17 kB gz. Within budget.

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| Files with `ErrorBoundary` / `componentDidCatch` / `getDerivedStateFromError` | **0** |
| `<Suspense>` usage (loading only, not error boundary) | 1 |
| `fetch()` without `.catch()` | **1** (LessonPage) |
| `useMemo` without try/catch around external reads | **1** (GrandmaRecommendCarousel) |
| Render paths that can produce NaN → undefined property access | **1** (MapPage chapter param) |
| Silent app non-render (null root element, no log) | 1 |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/LessonPage.tsx:57–71` | `fetch()` chain has no `.catch()`. If request fails (offline, CDN 503, malformed JSON), promise rejects unhandled → `lesson` stays `null` forever → spinner freeze. Unlike MapPage's `loadChapterLessons()` which has `.catch(() => [])`, LessonPage is completely unguarded. Children on unstable mobile connections hit this regularly. | Lesson page hangs with no error message. If the rejection propagates up, blank white screen. | Add `.catch(() => setLesson(null))` after the `.then()` chain AND add an error state to show "無法載入課程 — 請重試" banner + retry button. | 20 min |
| **P0** | `src/react-app/pages/MapPage.tsx:191` | `Math.min(8, Math.max(1, Number('abc')))` evaluates to `NaN`. `CHAPTER_META[NaN]` → `undefined`. Immediately after: `const meta = CHAPTER_META[chapter]` at line 203. Next render: `meta.accent` → TypeError: Cannot read properties of undefined. URL `/?ch=abc` or `/?ch=` from a shared link crashes MapPage render. | Hard crash. No error boundary → blank white screen. Affects anyone who bookmarks a malformed chapter URL or receives a social-share link that gets URL-encoded incorrectly. | Add `isNaN(chapter)` guard: `const chapter = (() => { const n = Number(searchParams.get('ch') \|\| 1); return isNaN(n) ? 1 : Math.min(8, Math.max(1, n)); })();` | 5 min |
| **P0** | `src/react-app/App.tsx:75–87` (entire app) | Zero `ErrorBoundary` components exist anywhere. `<Suspense>` handles loading but **not render errors**. Any unhandled throw inside a React component (malformed lesson JSON shape, corrupted localStorage deserialization, unexpected null from a DB-less store read) produces a blank white screen with no recovery UX. This is the most impactful gap: it's the absence of a safety net for all other error classes. | On mobile (target platform), no native browser error dialog. User sees blank screen, thinks app crashed permanently, uninstalls. Children 8-12 cannot diagnose this. | Add a root-level `<ErrorBoundary>` wrapping `<Routes>` in App.tsx that renders a "Mochi 睡著了 — 重新整理試試" fallback with a reload button. One class component + one wrap in App.tsx. | 30 min |
| **P1** | `src/react-app/components/GrandmaRecommendCarousel.tsx:170–173` | `useMemo(() => { const profile = readUserProfile(); return recommendNextStories(profile, defaultCandidatePool()); })` has no try/catch. `readUserProfile()` itself is guarded but `recommendNextStories()` is a pure computation (329 lines in storyRecommend.ts) that could throw on unexpected profile shape. Throw propagates synchronously during MapPage render. | MapPage crash → blank screen. Carousel is always mounted on the map (after cold start), so every map load is at risk. | Wrap useMemo body in try/catch: `useMemo(() => { try { ... } catch { return { recommendations: [] } } }, [])` | 10 min |
| **P1** | `src/react-app/pages/LessonPage.tsx:89–90` | `const q = lesson.questions[idx]` then `const Renderer = RENDERERS[q.type]`. If `lesson.questions` from server JSON is not an array (malformed lesson file) or `idx` exceeds bounds (race between setState calls), `q` is `undefined` → `q.type` → TypeError → render crash with no boundary. | Silent blank screen mid-lesson. Child loses lesson progress and engagement. | Guard: `const q = lesson.questions[idx]`; before render, add `if (!q) return null` (same pattern as `if (!lesson)` check above). Also validate `lesson.questions` is an array when fetched. | 10 min |
| **P1** | `src/main.tsx:15–21` | `if (rootEl) { createRoot(rootEl).render(...) }` silently does nothing if `#app` is missing. Zero console error, zero user feedback. | App never renders. Happens if index.html is served stale from SW cache with a different element ID, or if the SW is poisoned (per B.157 audit). | Change to: `if (!rootEl) { console.error('[pickup] #app element missing — check index.html'); } else { createRoot(rootEl).render(...); }` | 2 min |
| **P2** | `src/react-app/pages/LessonPage.tsx:57` | On `r.ok === false` (e.g., 404 for a chapter file that doesn't exist), `r.json()` is still called. On some CDN configs a 404 returns HTML not JSON → `r.json()` throws → same unhandled rejection as P0. | Chapter not found → unhandled rejection → spinner freeze. | Replace with `r.ok ? r.json() : Promise.reject(new Error(r.status))` | 5 min |
| **P2** | `src/react-app/renderers.tsx:95–103` | `SpeakerBtn` has `width: size, height: size` (default 22px) — below iOS HIG 44px minimum tap target. When called with default size (no override), renders a 22×22 button. This is a render-time styling bug not a crash, but breaks accessibility / usability for the target 8-12 child audience with small fingers. | Taps miss, children think audio is broken, churn. | Change default: `size = 44` or add `minWidth: 44, minHeight: 44` with `width: size, height: size` for the img only. | 5 min |

---

## D. Bundle / build health

```
dist/index-Cex-0lPz.js       164.21 kB raw / 48.46 kB gz   ← main shell
dist/LessonPage-C9-_Dbzw.js   62.71 kB raw / 16.90 kB gz   ← lazy lesson chunk
dist/react-CvBZlOBd.js        139.88 kB raw / 45.36 kB gz   ← React
dist/zod-Cohpjn9R.js           56.50 kB raw / 12.93 kB gz   ← Zod
```

- 38 test files / 382 tests: all pass ✅
- No new build warnings beyond the pre-existing PLUGIN_TIMINGS note for `vite:prepare-out-dir` (known, non-blocking).
- Lesson lazy split is working: LessonPage not in main bundle. Good.
- Zod 56 kB gz is the heaviest non-React chunk. Worth noting for future — if schema validation moves server-side, this chunk can be dropped.

---

## E. Top 5 P0

**#1 — LessonPage.tsx:57 fetch no `.catch()`**
The highest-traffic page (every lesson play) has no network error handling. Offline = eternal spinner. Fix: 20 min.

**#2 — MapPage.tsx:191 NaN chapter → meta undefined crash**
Any URL with a non-numeric `?ch=` param crashes the map. Fix: 5 min. Trivially blocked by an `isNaN` guard.

**#3 — Zero ErrorBoundary in entire React tree**
The root structural gap. Every render error produces a blank white screen. One root `<ErrorBoundary>` class component with a "Mochi 睡著了 — 重新整理" fallback catches all unhandled renders. Fix: 30 min.

**#4 — GrandmaRecommendCarousel useMemo unguarded**
`recommendNextStories()` throws on unexpected profile → MapPage crash. Called on every map mount. Fix: 10 min.

**#5 — LessonPage.tsx:89 q undefined on bounds overrun**
`lesson.questions[idx]` can be `undefined` from malformed JSON. `q.type` then crashes. Fix: 10 min.
