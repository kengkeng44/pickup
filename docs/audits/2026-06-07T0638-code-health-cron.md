# Code Health — 2026-06-07 06:38 UTC

Today's angle: **Bundle analyzer / chunk split**
Focus layer: Rolldown chunk manifest · manualChunks strategy · eager vs lazy page imports · critical-path Zod pull-in · tts.ts module-load fetch side-effect · lesson JSON delivery

---

## A. Recent commits

```
4c90f73 ⚠️ v2.0.B.cron-content: 2026-06-07-0607 angle: A3-story-semantic-leak
fe40257 v2.0.B.cron-ui:   2026-06-07-0608 angle: Cake short-video onboarding
47df809 v2.0.B.249: 🐛 fix tap-pairs '本題型沒有 pairsEn data' — 27 章全炸
16d73db v2.0.B.248: 🚀 CI deploy 加 accountId
0ec0351 v2.0.B.247: _sync-hooks STORY_BY_CH 加 Ch8-26
cdb8ab5 v2.0.B.cron-ui:   2026-06-07-0306 angle: Memrise MemBot AI
b82641e ⚠️ v2.0.B.cron-code: 2026-06-07-0035 angle: Error boundary coverage
26e2f40 ⚠️ v2.0.B.cron-walk: P0 2026-06-07-0017 persona: 阿凱 15yo Android Chrome
```

---

## B. Signal (counts per angle)

| Signal | Count | Notes |
|--------|-------|-------|
| Chunks emitted | 11 | 6 JS + 1 CSS + index.html + misc |
| Lazy-split pages | 2/7 | LessonPage ✅  ChapterIntroPage ✅  other 5 ❌ |
| Eager pages in App.tsx | 5 | ChaptersPage / ProfilePage / TasksPage / AlertsPage / CardsPage |
| manualChunks entries | 5 | phaser (dead) / zustand / zod / react-router / react |
| Module-load fetch side-effects | 1 | tts.ts:138 `void ensureLookup()` at boot |
| Lesson JSON files in public/ | 27 | ~1.3 MB total, only ch1 preloaded |
| Zod in critical path | YES | via runStore → sentences.ts / scenarios.ts / storyKitten.ts → zod |
| Double JSON.parse of lessons-ch1.json | YES | tts.ts + MapPage both parse independently |
| chunkSizeWarningLimit | 800 KB | 5× default; index chunk 164KB raw is above standard 160KB |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/App.tsx:12-16` | 5 secondary pages (ChaptersPage / ProfilePage / TasksPage / AlertsPage / CardsPage) imported **statically**. User lands on MapPage; none of these render on first load. Only LessonPage + ChapterIntroPage get `lazy()`. Pattern inconsistency inflates main `index` chunk with deps from all 5 pages. | JS parse overhead on Snapdragon-class CPUs. CardsPage (257 lines, 2 unique imports), ProfilePage (167 lines, `notifications` import), AlertsPage pull content never needed on first paint. | Add `const ChaptersPage = lazy(() => import('./pages/ChaptersPage'))` etc. for all 5 — identical pattern to LessonPage. Wrap existing `<Suspense fallback={<LoadingShell />}>` already covers them. | S (30 min) |
| **P0** | `src/store/runStore.ts:4-29` | Monolith store imports 3 Zod-dependent v1.x data modules (`sentences.ts`, `scenarios.ts`, `storyKitten.ts`) at the top level. React 18 app only calls `readCompletedLessons` / `isLessonUnlocked` / `markLessonCompleted` — none of these need Zod or v1.x question pools. The pull-in chain forces Zod (56.5 KB raw / 12.93 KB gzip) into critical-path execution even though v1.x gameplay is Phaser-only. | Synchronous Zod library parse + 3 schema object constructions on every first load before MapPage is interactive. On mid-range Android (Snapdragon 430, JS parse ~3 MB/s) = ~20 ms wasted per boot. Compounds with zod chunk being a separate network round-trip even when deduplicated by HTTP/2. | Split runStore into (a) `lessonProgressStore.ts` — pure localStorage R/W for React paths (readCompletedLessons, isLessonUnlocked, markLessonCompleted, XP, coins, streak); (b) keep `runStore.ts` for Phaser v1.x gameplay, lazy-loaded inside `bootGame.ts`. React imports switch to `lessonProgressStore`. | M (2–3 hr) |
| **P1** | `src/audio/tts.ts:136-139` | `void ensureLookup()` fires at **module evaluation** (`if (typeof window !== 'undefined')` guard). Since `tts.ts` is statically imported from `KeySentencesSheet.tsx → MapPage → App`, this triggers `fetch('/lessons-ch1.json')` + `JSON.parse(45 KB)` unconditionally on boot — the same resource MapPage also fetches independently in `loadChapterLessons()`. Two separate `JSON.parse` calls consume ~8–12 ms each on mobile. | Double CPU parse of 45 KB JSON at boot; minor on fast hardware but measurable on A50-class Android (CLAUDE.md target "Snapdragon 430"). No duplicate *network* request (HTTP preload + browser dedup), but duplicate JS heap allocation. | Move `void ensureLookup()` call to the first actual invocation of `speak()` (`ensureLookupReady()` already does this correctly — remove the eager module-level call). This defers the parse to when audio is actually needed (user taps a speaker icon), saving ~10–15 ms from boot critical path. | XS (15 min) |
| **P1** | `vite.config.ts:23-24` | `manualChunks` includes a `phaser` case but Phaser is **only** dynamically imported via `import('./bootGame')` in `main.ts` — never as a static import in the React entry (`main.tsx`). Rolldown never sees a `node_modules/phaser` static dep from the React graph, so the `phaser` chunk name is never emitted. The build output confirms: no `phaser-*.js` chunk. Dead `manualChunks` entry is misleading and may confuse future devs adjusting chunk strategy. | Zero runtime risk. But dead config creates false confidence that Phaser is "explicitly chunked". If a future dev adds a static Phaser import it would land in the phaser chunk (fine), but currently the name is inert. | Remove the `phaser` manualChunks case; add a code comment on the `zod` case explaining it's critical-path via runStore (to track the P0 above). | XS (5 min) |
| **P2** | `vite.config.ts:31` | `chunkSizeWarningLimit: 800` is 5× the Vite default (160 KB). The `index` chunk is **164.21 KB raw / 48.46 KB gzip** — which would trigger the standard warning. The elevated limit silences this signal. Future additions to App.tsx or MapPage deps will keep growing silently. | No runtime risk now. Risk accumulates: next 50 KB of eager deps (new page import, large data file) passes without CI signal. | Lower to `300` (still above current 164 KB raw, allows reasonable growth room, will warn if index chunk crosses 300 KB). | XS (1 min) |
| **P2** | `vite.config.ts:8` | `modulePreload: false` set in B.151 to "disable modulepreload polyfill". Vite's modulepreload injects `<link rel="modulepreload">` for async chunks known at build time — without this, LessonPage.js (62.76 KB raw / 16.93 KB gzip) is not prefetched until the `import()` executes when user taps a lesson node. On slow 3G (1.5 Mbps), this adds ~330 ms latency for the lazy chunk. The polyfill concern (Safari < 16 / Firefox < 115) applies to the **polyfill** flag, not the native hints; modern mobile Safari 16+ supports modulepreload natively. | Lesson-start feels slow on 3G — user sees a `載入中…` spinner for 300–500 ms after tapping a node. Target audience (Taiwan families, potentially on mobile data) is affected. | Change `modulePreload: false` → `modulePreload: { polyfill: false }` to emit native `<link rel="modulepreload">` hints without the polyfill JS overhead. Native hints land in Safari 16+ / Chrome 66+ / Firefox 115+ — covers 95%+ of target. | XS (5 min) |

---

## D. Bundle / build health

```
dist/assets/rolldown-runtime-*.js    0.69 kB │ gzip:  0.42 kB  ✅
dist/assets/zustand-*.js             2.30 kB │ gzip:  1.03 kB  ✅
dist/assets/ChapterIntroPage-*.js    3.02 kB │ gzip:  1.48 kB  ✅ (lazy)
dist/assets/WardrobeView-*.js        5.14 kB │ gzip:  1.98 kB  ✅ (lazy)
dist/assets/react-router-*.js       19.90 kB │ gzip:  7.51 kB  ✅
dist/assets/zod-*.js                56.50 kB │ gzip: 12.93 kB  ⚠️ critical path (P0)
dist/assets/LessonPage-*.js         62.76 kB │ gzip: 16.93 kB  ✅ (lazy)
dist/assets/react-*.js             139.88 kB │ gzip: 45.36 kB  ✅
dist/assets/index-*.js             164.21 kB │ gzip: 48.46 kB  ⚠️ above std 160 KB
dist/assets/index-*.css             23.60 kB │ gzip:  5.51 kB  ✅
```

**First-paint JS total**: ~121 KB gzip (index + zod + react + react-router + zustand + runtime)
**Lazy JS total**: ~20 KB gzip (LessonPage + ChapterIntroPage + WardrobeView)
**Phaser chunk**: not emitted (lazy dynamic import auto-split by Rolldown) ✅
**posthog-js**: not bundled (conditional env-gated dynamic import, no VITE_POSTHOG_KEY in build) ✅
**Lesson JSONs** (public/): 27 files × ~47 KB avg = 1.27 MB uncompressed; only ch1 preloaded via `<link rel="preload">` ✅

**Build warnings**:
- `PLUGIN_TIMINGS: vite:prepare-out-dir` — Rolldown internal, not actionable
- 25 `X2_OPTION_LIST_BIAS` lint issues (warn-only, Ch1/Ch3/Ch19/Ch21) — content quality, not bundle
- No chunk size warning (suppressed by `chunkSizeWarningLimit: 800`) ← masked by P2 above

---

## E. Top 5 P0

1. **5 secondary pages eagerly bundled** (`App.tsx:12-16`): ChaptersPage / ProfilePage / TasksPage / AlertsPage / CardsPage — add `lazy()` wrappers; `<Suspense>` already wraps them. Zero logic change, pure split.

2. **runStore pulls Zod into critical path** (`runStore.ts:4-29`): v1.x data imports (sentences / scenarios / storyKitten) force Zod (56 KB raw) into the main chunk execution path. React app never calls `loadSentences()` — split store into React-only progress slice (no Zod) + Phaser-only gameplay store.

3. **tts.ts eager module-load fetch** (`tts.ts:136-139`): `void ensureLookup()` fires on import, triggering `fetch + JSON.parse(45 KB)` before user interacts. Defer to first `speak()` call; saves ~10–15 ms from boot critical path.

4. **Dead `phaser` manualChunks case** (`vite.config.ts:23-24`): never triggers in React entry; remove to reduce config noise.

5. **`modulePreload: false` blocks lazy chunk preloading** (`vite.config.ts:8`): change to `{ polyfill: false }` to emit native `<link rel="modulepreload">` hints for LessonPage; saves 300–500 ms on 3G lesson-start latency.
