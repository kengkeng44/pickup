# Code Health — 2026-06-02 06:39 UTC

Today's angle: **React 18 concurrent / Suspense**
Focus layer: concurrent-mode safety · error boundaries · Suspense · stale closures · fetch races · StrictMode

---

## A. Recent commits
```
c748190 v2.0.B.cron-ui: 2026-06-02-0611 angle: LingQ known-words counter
b4e4ba3 ⚠️ v2.0.B.cron-content: 2026-06-02-0607 angle: A3-story-continuity
f16be5d v2.0.B.184: qa-dashboard Google-style flat drawer
7517f64 v2.0.B.182: dashboard QA-shortcut tile at top
5632f15 v2.0.B.cron-ui: 2026-06-02-0308 angle: Babbel SRS visual representation
f33a64f v2.0.B.181: qa-dashboard 44px top bar + slide-out hamburger drawer
ac84157 v2.0.B.180: qa-dashboard compact header + horizontal chapter scroll
8d60457 v2.0.B.179: qa-dashboard prose sentence card + question pill (game-mirror)
5a94b92 v2.0.B.cron-code: 2026-06-02-0039 angle: Web Vitals (LCP/FID/CLS/INP)
8adeb41 v2.0.B.178: question speaker btn + Q&A dashboard + SW v178 bump
```

---

## B. Signal (counts — React 18 concurrent angle)

| Signal | Count | Location |
|--------|-------|----------|
| `createRoot` usage | 1 | `src/main.tsx:17` |
| `StrictMode` in use | 0 | disabled — comment at `main.tsx:12` |
| `Suspense` in use | 0 | nowhere |
| `React.lazy()` | 0 | nowhere (all routes eagerly imported) |
| `useTransition / useDeferredValue / startTransition` | 0 | nowhere |
| `ErrorBoundary` class / hook | 0 | **nowhere** |
| `useEffect` total (react-app/) | 17 | across 6 files |
| `useEffect` with `// eslint-disable exhaustive-deps` | 10 | renderers.tsx (9) + MapPage.tsx (1) |
| `fetch()` without `AbortController` | 3 | LessonPage, MapPage, ChapterIntroPage |
| `dangerouslySetInnerHTML` callsites | 5 | renderers.tsx (4) + LessonPage.tsx (1) |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | Fix | Effort |
|-----|-----------|-------|------|-----|--------|
| **P0** | `src/react-app/App.tsx` (missing) | **Zero error boundaries** — any renderer exception crashes the entire React tree; user sees blank screen with no recovery | Crash = full app wipe. Triggered by bad JSON lesson data, wireSentenceHints throw, wrapWords edge case | Add `ErrorBoundary` class wrapping `<Routes>` and optionally per-renderer. Show friendly "載入出錯，請重新整理" fallback | 1 hr |
| **P0** | `src/react-app/pages/LessonPage.tsx:33-47` | **fetch race — no AbortController**. If user taps lesson A → immediately taps ✕ → taps lesson B, the A-fetch resolves and `setLesson(lessonA)` runs after B-mount, loading wrong content | Wrong lesson shown. Silent data corruption — no error thrown, React 18 won't warn | Add `AbortController` in `useEffect` cleanup: `controller.abort()`. Check `!signal.aborted` before `setLesson` | 30 min |
| **P0** | `src/main.tsx:12-14` | **StrictMode disabled masking TTS cleanup bug**. Comment: "double-mount race in audio onEnd". Root cause: `NarrationRenderer` effect cleanup (`renderers.tsx:106-118`) only clears `setTimeout`, never cancels in-flight `speak()`. In concurrent mode any Suspense or `startTransition` re-mount will double-invoke the effect, causing two simultaneous TTS calls | With StrictMode OFF in prod this is low-risk today, but the moment any Suspense boundary is added the bug re-surfaces as double audio + potential double-advance | Fix cleanup: expose `stop()` from `speak()` / `audio/tts.ts` and call it in the `useEffect` return. Then re-enable StrictMode | 1-2 hr |
| **P1** | `src/react-app/pages/MapPage.tsx:161-166` | **`xp`, `level`, `coins` hardcoded to `0`/`1`**. HUD always renders L1/Silver crown, 0 coins, 0 XP regardless of player progress | Feature regression: player earns XP/coins but HUD never reflects it. Crown tier permanently Silver | Read from `localStorage` (same pattern as `readCompletedLessons`) or wire Zustand xp/coins selectors | 30 min |
| **P1** | `src/react-app/pages/MapPage.tsx:150-157` | **`currentNodeIdx` useMemo missing `completed` dep**. `completed.size` is used in body but deps are only `[lessons.length, chapter]`. If completions change (e.g. Phaser scene still marks chapters) while `lessons.length` and `chapter` stay the same, the memo returns stale cat position — grandma stays on old node | Low-frequency bug (concurrent Phaser ↔ React writes). Cat position silently wrong | Add `completed.size` to useMemo deps array | 5 min |
| **P2** | `src/react-app/pages/MapPage.tsx:170-177` `src/react-app/pages/ChapterIntroPage.tsx:30-37` | **MapPage + ChapterIntroPage fetch also lack AbortController** | Milder than LessonPage (no wrong content, just stale loading state) but causes `setLessons`/`setIntroZh` calls on unmounted components — React 18 makes these no-ops but still wasteful | Same `AbortController` pattern as LessonPage fix | 20 min |
| **P2** | `src/react-app/renderers.tsx:51-55` | **`useWordHint` suppresses exhaustive-deps warning** with a forwarded `deps` array of `unknown[]`. All 9 callsites pass `[q.id]` or `[revealed, q.id]`. If a caller passes the wrong deps the hint wiring silently never fires | Silent no-op; difficult to catch in review | Type `deps` as `readonly unknown[]` and add a comment contract. Consider wrapping in `useSentenceHints(ref, sentence, deps)` | 15 min |
| **P2** | `src/react-app/pages/LessonPage.tsx:109-111` | **`NarrativeLine useEffect` has no deps array** (empty second arg) — fires on every render. `wireSentenceHints` is idempotent but `ref.current` DOM walk on every parent render (history grows) is wasteful | Perf only — no correctness bug | Add `// eslint-disable-next-line` OR switch to `useEffect(() => {...}, [text])` | 5 min |

---

## D. Bundle / build health

```
dist/assets/react-9SDNQsEM.js    139.84 kB │ gzip: 45.34 kB
dist/assets/index-CAGmUonK.js    66.32 kB │ gzip: 19.28 kB
dist/assets/zod-Cohpjn9R.js      56.50 kB │ gzip: 12.93 kB
dist/assets/react-router-BM6lXbF0.js 19.90 kB │ gzip: 7.51 kB
dist/assets/index-CsOoi-y2.css   23.23 kB │ gzip:  5.38 kB
dist/assets/zustand-Bee562SY.js   2.30 kB │ gzip:  1.03 kB
Total JS (gzip):                           ~93 kB
```

- ✅ Under 100 KB gz — very clean for React 18 + router + zod
- ✅ Zustand tree-shaken correctly (2.3 KB)
- ⚠️ Zod (56.5 KB raw) is the second-largest chunk — verify `zod` is needed at runtime (lessons schema validation only happens in `tests/` + `tools/validate-lessons.js`). If `parseLesson` is only called server-side/CI, zod can be `devDependency` to trim 12 KB gz from main bundle
- ℹ️ All 6 page routes eagerly imported — no `React.lazy` code-splitting. Bundle is small enough that this is fine today; note for future if index.js > 100 KB gz

Build: **34/34 tests pass, 0 warnings**

---

## E. Top 5 P0

| # | Title | Why P0 |
|---|-------|--------|
| 1 | **No error boundary** | Single renderer throw → entire app blank screen, no recovery |
| 2 | **LessonPage fetch race (no AbortController)** | Fast navigation loads wrong lesson content silently |
| 3 | **StrictMode disabled, TTS not cancelled in cleanup** | Concurrent interruption will double-speak + risk double-advance |
| 4 | **HUD xp/level/coins hardcoded 0** | Player progress invisible in primary HUD (functional regression) |
| 5 | **`currentNodeIdx` useMemo stale `completed` dep** | Grandma cat position wrong after chapter completion |

---

*Auditor: code-health-cron | Angle 1/16 | Next available: iOS Safari WebAudio race (#3)*
