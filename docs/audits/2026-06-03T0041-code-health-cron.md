# Code Health — 2026-06-03 00:41 UTC

Today's angle: **Bundle analyzer (chunk split)**
Focus layer: Vite rollup output, manual chunk config, modulePreload, dead source, zod in initial load

---

## A. Recent commits
```
d7d02f4 v2.0.B.cron-walk: ⚠️ P0 2026-06-03-0017 persona: 15yo student Android no-earbuds
21b624b v2.0.B.cron-ui: 2026-06-03-0009 angle: Drops 5-min session pacing
6b1072c ⚠️ v2.0.B.cron-content: 2026-06-03-0007 angle: A1-obvious-correct
bdb523f v2.0.B.cron-ui: 2026-06-02-2110 angle: Brilliant interactive demo
089f519 v2.0.B.cron-code: 2026-06-02-1838 angle: Zustand selector performance
f031b3a v2.0.B.cron-ui: 2026-06-02-1809 angle: Anki SRS card design
a7d8038 v2.0.B.197: Ch1 開頭 hook — emoji-pick Q0 + n1 emotional bridge
0c2e6a3 v2.0.B.196: todo 加 Sketch-to-Code workflow + dashboard 第 2 個 todo tile
324dd64 v2.0.B.cron-ui: 2026-06-02-1209 angle: Memrise MemBot conversation pattern
d6d2a97 ⚠️ v2.0.B.cron-content: 2026-06-02-1208 angle: optionsZh-translation-quality
```

---

## B. Signal (bundle angle)

| Metric | Value |
|--------|-------|
| Total initial load (blocking) | **290.4 KB raw / 87.7 KB gzip** |
| Largest blocking chunk | `react` 139.8 KB raw / 45.3 KB gz |
| Zod in blocking load | 56.5 KB raw / 12.9 KB gz |
| Lazy chunks (lesson nav) | LessonPage 22.4 KB + ChapterIntroPage 3.0 KB |
| Total build chunks | 9 (no Phaser chunk — correctly tree-shaken) |
| `modulePreload` setting | `false` — no preload hints generated |
| HTML `<script>` tags | 1 (only `index-C5jOBh95.js`) — deps waterfall |
| Dead Phaser source (not bundled) | `src/main.ts` 176L + `src/bootGame.ts` 62L + 9 scenes 4,565L total |
| `posthog-js` (38 MB pkg) | Correctly excluded: env-gate makes `import()` unreachable at build time |
| StrictMode | Disabled in `src/main.tsx` (line 12) |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `vite.config.ts:20` | `modulePreload: false` — 5 static dep chunks (`react`, `zod`, `react-router`, `zustand`, `rolldown-runtime`) are hidden inside `index-C5jOBh95.js`; browser only discovers them after downloading + parsing the 47 KB index chunk. On slow 4G (~1 MB/s), this adds 1 full RTT waterfall (~200-400 ms) before React mounts. `<link rel="modulepreload">` for all chunks would turn this serial into parallel. | First-paint delay on mobile, especially Snapdragon 430 targets. | Change `modulePreload: false` → `modulePreload: { polyfill: true }` (Vite default). This auto-injects `<link rel="modulepreload">` for all statically-importable chunks in built `index.html`. | 5 min |
| **P0** | `vite.config.ts:27-28` + `src/store/runStore.ts:29` | `zod` (56.5 KB raw / 12.9 KB gz) is in the **blocking** initial load. All 4 data schema files (`sentences.ts`, `scenarios.ts`, `storyKitten.ts`, `lessons.ts`) define their `z.object()`/`z.discriminatedUnion()` at **module scope**. These are statically imported by `runStore.ts` → `MapPage.tsx` → main chunk. Every app cold-start pays zod's full schema-construction cost even before the map renders. | ~50-80 ms parse/exec overhead on low-end Android; zod is the 2nd-largest initial chunk after React itself. | Move zod schemas + parse calls into the async `load*()` functions (they're already async). Mark schema constants as lazily initialised: `let schema: ZodSchema | null = null`. This moves the module evaluation to first actual data fetch, not app parse. Alternatively split data modules into LessonPage chunk. | 2-3 hr |
| **P1** | `src/store/runStore.ts:4-27` | `runStore` statically imports `sentences.ts`, `scenarios.ts`, and `storyKitten.ts` — all three contain full zod schema definitions at module scope. These modules serve **legacy Phaser free/scenario/story-play modes** that no longer exist in the React UI (no route exposes them). Yet their schemas + boilerplate all parse at startup. `Oe()` (loadSentences), `Pe()` (loadScenarios), `tt()` (loadStoryQuestions) are defined in the main bundle but never called from any React page. | Wasted 40-50 KB raw of module code evaluated at boot; latent network fetches for `sentences.json`, `scenarios.json`, `story-kitten.json` fire if anyone calls `runStore.loadContent()`. | Remove dead `sentences`/`scenarios`/`storyKitten` imports from `runStore.ts`; keep only the `markLessonCompleted` / `isLessonUnlocked` / `readCompletedLessons` slice that React actually uses. This unlocks the zod-splitting work above too. | 3-4 hr |
| **P1** | `src/main.tsx:12-15` | `React.StrictMode` is disabled. Comment cites dev double-mount race in audio `onEnd` + `setTimeout` fallback (B.166), but that race was fixed in B.160. StrictMode is no-op in production but in development it double-invokes effects to surface cleanup bugs — currently those bugs would go undetected until prod. | Future effects/subscriptions that miss cleanup will silently leak in dev without the double-invoke signal. Already caused one audio race that reached production. | Re-enable `<StrictMode>` in `src/main.tsx` and verify audio unlock/BGM effects handle the second-invoke correctly with `return () => { ... }` cleanup. | 1 hr |
| **P2** | `src/main.ts` (176L) + `src/bootGame.ts` (62L) + `src/scenes/*.ts` (9 files, 4,565L) | **Dead source code** — `index.html` now points to `src/main.tsx` (React). The entire Phaser bootstrap (`main.ts`, `bootGame.ts`, all 9 scene files) is correctly tree-shaken from the bundle, but remains in source. Vite's `manualChunks` rule for `'phaser'` in `vite.config.ts:27` is also dead (no Phaser in the React module graph). | Developer confusion: new contributors may not know which `main.ts` entry is active; `manualChunks` for phaser silently does nothing. | Delete `src/main.ts`, `src/bootGame.ts`, `src/scenes/` (or archive to `_archive/`). Remove the `'phaser'` manualChunks rule from `vite.config.ts`. | 30 min |
| **P2** | `vite.config.ts:27` | `manualChunks` for `phaser` is dead code — Phaser is not reachable from `src/main.tsx` so no chunk ever forms. The rule wastes a string comparison on every module ID during build. | Negligible build perf; misleading config implies Phaser is still code-split intentionally. | Remove `if (id.includes('node_modules/phaser')) return 'phaser';` line. | 2 min |

---

## D. Bundle / build health

```
Build: ✅ 34/34 tests pass, vite build succeeds in 819 ms
Mirror-lint warnings: 482 (warn-only, not blocking)

Chunk map (2026-06-03):
  rolldown-runtime   0.7 KB gz: 0.4
  zustand            2.3 KB gz: 1.0
  ChapterIntroPage   3.0 KB gz: 1.5   ← lazy ✅
  react-router      19.9 KB gz: 7.5
  LessonPage        22.4 KB gz: 6.4   ← lazy ✅
  CSS               23.6 KB gz: 5.5
  index/main        47.6 KB gz: 15.3
  zod               56.5 KB gz: 12.9  ⚠️ blocking
  react            139.8 KB gz: 45.3  (expected, unavoidable)

  Total initial blocking: 290.4 KB raw / 87.7 KB gz
  Lazy (lesson tap): +25.4 KB raw

Target: ≤ 250 KB raw blocking (sans React).
Current overshoot: +40 KB raw (mostly zod).

posthog-js (38 MB pkg): ✅ correctly excluded — VITE_POSTHOG_KEY env gate
causes Vite to replace with undefined → Rollup DCE removes the dynamic import().
Phaser (148 MB pkg): ✅ correctly excluded — no path from main.tsx reaches bootGame.ts.
```

---

## E. Top 5 P0

1. **⚠️ `modulePreload: false` → 5-chunk waterfall on cold load** (`vite.config.ts:20`)
   - Fix: `modulePreload: { polyfill: true }` — 5-min change, immediate parallel-fetch gain for react/zod/router
   
2. **⚠️ `zod` 56.5 KB in blocking initial parse** (`vite.config.ts:27` + all data/*.ts)
   - Fix: lazy-initialise zod schemas inside async load functions; don't define at module scope

3. **P1: Dead `sentences`/`scenarios`/`storyKitten` imports in `runStore.ts`** (L4-27)
   - Prerequisite for #2; removes ~40KB of module code from initial bundle

4. **P1: `StrictMode` disabled** (`src/main.tsx:12`)
   - Audio race cited is fixed; re-enable to surface future cleanup bugs

5. **P2: Dead Phaser source (4,800+ lines)** + dead `manualChunks` phaser rule
   - Tree-shaken from bundle but misleading; safe delete

---

*Angles used so far: TS strict (06-01), Memory leak (06-01), Web Vitals (06-02), React 18 concurrent (06-02), Zustand selector perf (06-02), Bundle analyzer (06-03)*
