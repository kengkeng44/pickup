# Code Health — 2026-06-08 18:37 UTC

Today's angle: **TS strict mode quirks (cast / narrowing)**
Focus layer: `tsconfig.json` flags, `as any` / `as unknown` hot-path casts, discriminated union under-use, React 18 StrictMode status, catch-block narrowing.

---

## A. Recent commits

```
47e634d v2.0.B.cron-ui: 2026-06-08-1807 angle: Apple Music audio UI
5da575d v2.0.B.cron-content: 2026-06-08-1805 angle: R2-distractor-doctrine
834b3a2 v2.0.B.294 解閃動: chapter debounce 150ms + book cover compositor layer
1ad2059 v2.0.B.293 REVERT B.291: 砍 scroll-snap
39b4ff9 v2.0.B.292 NUCLEAR TEST: 砍虛擬化, render 全 260 nodes
d71e63e v2.0.B.291: CSS scroll-snap (proximity + center)
0ca3d3f v2.0.B.290 ROOT FIX: container height 預固定 + html overflow-anchor
bc6614d v2.0.B.262: Capacitor 8.x + iOS native (Fabu) + Codemagic CI
```

---

## B. Signal (counts per angle)

| Signal | Count | Note |
|--------|-------|------|
| `as any` casts | **18** | 17 in LessonScene.ts alone |
| Explicit `: any` annotations | **9** | 7 private method params in LessonScene.ts |
| `as unknown as` double-casts | **15** | scattered across scenes + ui/ |
| `@ts-ignore` / `@ts-nocheck` | **0** | ✅ clean |
| `strict: true` in tsconfig | **missing** | only 4 loose flags enabled |
| `strictNullChecks` | **off** | not listed in tsconfig.json |
| `noImplicitAny` | **off** | not listed in tsconfig.json |
| React 18 StrictMode | **disabled** | main.tsx:13 comment says "no-op in prod" — incorrect |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| ⚠️ P0 | `tsconfig.json` | `strict: true` missing — `strictNullChecks` + `noImplicitAny` + `strictFunctionTypes` all OFF | TypeScript 6.0 will enable strict by default; today a `q.options[undefined]` crash is uncatchable at compile time | Add `"strictNullChecks": true` first (safe incremental step per 2026 migration guide) | S 30min |
| ⚠️ P0 | `src/scenes/LessonScene.ts:702` | `(q as any).type` — `q` is already typed `Question` (discriminated union); discriminant `type` is directly accessible without cast | Casts away all type info; if schema adds new question type, tsc will NOT warn about missing branch | Change to `switch(q.type)` — tsc then narrows each branch to the specific variant | M 2hr |
| ⚠️ P0 | `src/scenes/LessonScene.ts:108` | `lessonAnswerLog: Array<{q: any; ...}>` — answer log stores questions as `any` | Lesson review screen accesses fields without safety; a field rename in Zod schema will silently break the review UI at runtime | Change `q: any` → `q: Question` (already imported) | S 15min |
| P1 | `src/scenes/LessonScene.ts:274,352,435,579,604,653` | 6 private methods `_renderNarration(q: any)`, `_renderListenTf(q: any)`, `_renderListenTfZh(q: any)`, `_snapshotTf(q: any)`, `_snapshotNarration(q: any)`, `_snapshotTfZh(q: any)` | No exhaustiveness check; adding a new question type won't produce a compile error on the dispatch switch | Re-type each to the specific narrowed variant from the discriminated union | M 1hr |
| P1 | `src/main.tsx:13-14` | React 18 StrictMode explicitly disabled — comment says `"StrictMode no-op in prod"` which is **incorrect** | StrictMode double-mounts effects in dev only to catch cleanup bugs. Disabling it hides the audio `onEnd` race (B.166) rather than fixing it | Fix the audio cleanup bug, re-enable StrictMode; the race is a real memory leak candidate | M 2hr |
| P1 | `src/react-app/renderers.tsx:16-45` | `RawQuestion` interface has 20+ optional fields instead of a discriminated union — same data as Zod `Question` but untyped | Renderer components access `q.options?.[0]` without knowing if the question type even has `options`; silent undefined access | Alias `RawQuestion = Question` (already defined in `src/data/lessons.ts`) and update import | S 30min |
| P2 | `src/scenes/LessonScene.ts:1116` | `(state as any).dailyStreak ?? (state as any).streak ?? 0` — accesses Zustand state with `as any` instead of typed selector | Will silently return 0 if store field renamed; streak analytics will under-count | Use `useRunStore.getState().streak` (typed) | XS 10min |
| P2 | `src/data/storyKitten.ts:151` | `return out as unknown as ClozeQuestion` — double cast to force legacy shape into new type | If `ClozeQuestion` shape changes, cast hides the mismatch at compile time | Add explicit `satisfies ClozeQuestion` check before cast, or migrate storyKitten to use `Question` | S 20min |

---

## D. Bundle / build health

Build: ✅ clean (38 tests pass, 380 assertions, 0 TS errors under current tsconfig)
```
dist/assets/index-y91XCt0c.js    175.76 kB raw / 52.14 kB gzip
dist/assets/react-CvBZlOBd.js    139.88 kB raw / 45.36 kB gzip
dist/assets/LessonPage-mmcOcapR.js  65.23 kB raw / 17.61 kB gzip
dist/assets/zod-Cohpjn9R.js       56.50 kB raw / 12.93 kB gzip
Total raw: ~490 kB / ~137 kB gzip (within budget)
```

**Note**: 0 tsc errors is misleading — without `strictNullChecks`, TypeScript doesn't check `q?.options` vs `q.options`. Real error count under `strict: true` = unknown but safe to estimate 30-60 errors from the 18 `as any` + 15 `as unknown as` + 9 `: any` patterns.

---

## E. Top 5 P0

1. **`tsconfig.json` — missing `"strictNullChecks": true`** (⚠️ P0, S 30min)
   - `strict: true` = 8 flags; incremental strategy: enable `strictNullChecks` first (catches real null crashes), then `noImplicitAny`
   - TypeScript 6.0 will make strict the default — starting now avoids a future 60-error avalanche
   - File: `tsconfig.json`

2. **`LessonScene.ts:702` — `(q as any).type` on typed `Question`** (⚠️ P0, M 2hr)
   - `q: Question` already has `.type` as the discriminant — change to `switch(q.type)` and TypeScript narrows all branches automatically
   - Eliminates 15 downstream `as any` casts in the same function
   - File: `src/scenes/LessonScene.ts:684-760`

3. **`LessonScene.ts:108` — `lessonAnswerLog: Array<{q: any; ...}>`** (⚠️ P0, S 15min)
   - Answer log drives the lesson review screen — `q: any` means a Zod schema field rename is invisible
   - Fix: `q: Question` (already imported at top of file)
   - File: `src/scenes/LessonScene.ts:108`

4. **`main.tsx:13-14` — React 18 StrictMode disabled with wrong rationale** (P1, M 2hr)
   - Comment "StrictMode no-op in prod" is factually wrong — StrictMode only affects dev builds but the double-mount it reveals catches cleanup bugs that WILL exist in prod (audio leaks, dangling listeners)
   - The actual fix is to repair the audio `onEnd` cleanup in `renderers.tsx:NarrationRenderer useEffect`, then re-enable StrictMode
   - File: `src/main.tsx:13`, `src/react-app/renderers.tsx`

5. **`renderers.tsx:16-45` — `RawQuestion` re-invents `Question`** (P1, S 30min)
   - Duplicate interface with all-optional fields defeats discriminated union narrowing in all 12+ renderer components
   - Fix: `export type RawQuestion = Question` — import `Question` from `src/data/lessons.ts`, delete the 30-line hand-rolled interface
   - File: `src/react-app/renderers.tsx:16-45`

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background
TypeScript 6.0 (tracked at [microsoft/TypeScript#62333](https://github.com/microsoft/TypeScript/issues/62333)) will flip `strict: true` as the default. The 2026 migration guide consensus ([logic-leap.co.uk](https://www.logic-leap.co.uk/blog/typescript-strict-mode-migration-guide), [oneuptime.com](https://oneuptime.com/blog/post/2026-02-20-typescript-strict-mode-guide/view)) is to enable flags incrementally, in this order:
1. `strictNullChecks` (catches most crashes, fewest noise errors)
2. `noImplicitAny` (most verbose to fix but prevents all `as any` hotpaths)

Industry standard (Retool, Linear, Stripe) for discriminated unions in React: Zod schema → infer type → `switch(q.type)` for exhaustiveness. Never `as any` on a typed discriminant. Pickup has the Zod schema and the inferred type — it just abandons them at the method dispatch boundary.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Enable `strictNullChecks` incrementally | [TypeScript incremental migration](https://kevinwil.de/incremental-migration/) | ✅ Direct fit — single tsconfig line, ~10 null-guard fixes | S 30min | ⭐⭐⭐ | **RECOMMEND NOW** |
| `switch(q.type)` discriminant narrowing | [Advanced TS for React devs](https://www.developerway.com/posts/advanced-typescript-for-react-developers-discriminated-unions) | ✅ Zod schema already defines the union; just stop casting | M 2hr | ⭐⭐⭐ | **RECOMMEND** |
| `RawQuestion = Question` alias | [Stop using optional props](https://www.clint-johnson.com/articles/typescript-discriminated-unions-react) | ✅ Delete 30-line hand-rolled interface, import from lessons.ts | S 30min | ⭐⭐ | **RECOMMEND** |
| Re-enable React 18 StrictMode | React 18 docs | ✅ Surfaces cleanup bugs in dev that are live in prod | M 2hr | ⭐⭐ | Recommend after audio leak fixed |
| Full `strict: true` in one shot | TypeScript docs | 🟡 Pickup has 18 `as any` + 9 `: any` + 15 `as unknown as` — too many errors for one PR | L 4hr | ⭐ | **Do incrementally, not in one shot** |

### Recommended incremental order for Pickup
1. **Today**: `"strictNullChecks": true` in tsconfig.json → fix ~10 null guards → commit
2. **Next week**: `renderQuestion` switch refactor → eliminates 15 `as any` casts in one diff
3. **After that**: `RawQuestion = Question` alias → 12 renderer components gain exhaustiveness
4. **Then**: `"noImplicitAny": true` → mop up remaining `: any` params
5. **Finally**: `"strict": true` (all 8 flags) before TypeScript 6.0 lands

This is safe because Pickup uses Zod for all data entry (runtime validation is solid) — the TS casts are cosmetic workarounds, not fundamental design problems.
