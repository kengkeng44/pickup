# Code Health — 2026-06-05 00:39 UTC

Today's angle: **TS strict mode quirks (cast / narrowing)**
Focus layer: `as any` / `as unknown as` escapes · discriminated-union narrowing bypass · missing `strict:true` · implicit nullability · `!` assertions · property-existence mistakes

---

## A. Recent commits
```
444243e v2.0.B.cron-walk: ⚠️ P0 2026-06-05-0019 persona: trauma 阿美 iOS Safari 18 private
1bb3197 v2.0.B.cron-ui: 2026-06-05-0008 angle: Khan Academy progress visualization
513b1bc v2.0.B.230: hook inquiry microcopy + PostHog tag move to React LessonPage
c1acd3a v2.0.B.cron-ui: 2026-06-04-2109 angle: Duolingo Streak/League gamification
8bafddc v2.0.B.cron-code: 2026-06-04-1839 angle: Memory leak (event listener / RAF)
```

---

## B. Signal (counts per angle)

| Category | Count | Files |
|---|---|---|
| `as any` escapes | 18 | `LessonScene.ts` ×18 |
| `as unknown as` double-casts | 14 | 10 files |
| `_render*(q: any)` typed params | 3 | `LessonScene.ts` |
| `!` non-null assertions on class fields | 2 | `EndOverlay.ts` |
| `!` non-null on nullable runtime value | 1 | `EndOverlay.ts:207` |
| Needless cast on already-typed value | 3 | `LessonScene.ts:694,967,980` |
| Dead property access via `as any` | 1 | `LessonScene.ts:1108` |
| Missing `strict:true` in tsconfig | 1 | `tsconfig.json` |

`tsc --noEmit --strict` passes clean — meaning all `as any` casts are already suppressing the errors that strict mode would otherwise surface.

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | Fix | Effort |
|---|---|---|---|---|---|
| **P0** | `LessonScene.ts:694` | `(q as any).type` — `q` is `Question` with `.type` typed; cast is **needless** and erases the discriminant, preventing downstream narrowing | If a future refactor changes dispatch logic, TS will silently miss the narrowing | Delete cast: use `q.type` directly | 1 min |
| **P0** | `LessonScene.ts:1108` | `(state as any).dailyStreak` — field does **not exist** in `RunState`; always `undefined`, falls to `.streak` | Analytics STREAK_UPDATE event silently sends wrong data via the `.streak` fallback; the `dailyStreak` branch is dead code | Replace with `useRunStore.getState().streak` directly | 5 min |
| **P1** | `LessonScene.ts:266,344,427` | `_renderNarration(q: any)`, `_renderListenTfZh(q: any)`, `_renderListenTf(q: any)` — called after type-narrowing at line 694-702, but params typed `any` inside, so all `.sentence` / `.questionEn` / `.questionZh` accesses are unchecked | Typo in a field name (e.g. `questionEn` → `questionEN`) is invisible to the compiler | Re-type: `_renderNarration(q: z.infer<typeof NarrationSchema>)` etc. | 20 min |
| **P1** | `LessonScene.ts:108` | `lessonAnswerLog: Array<{q: any; ...}>` — entire question payload stored as `any`; `_showLessonReview` then reads `.sentence`, `.question`, `.explanationZh` off it without type safety | Review screen silently renders `undefined` if field name drifts | Type as `Array<{q: Question; ...}>` — `Question` union is already imported | 5 min |
| **P1** | `LessonScene.ts:967,980` | `(q as any).type` inside `handleAnswer` and `_snapshotAnsweredQ` — `q: Question` is in scope, `.type` is accessible without cast; same pattern as P0 at line 694 | Silent: erases discriminant where it matters for analytics + snapshot routing | Replace `(q as any).type` → `q.type` | 2 min |
| **P2** | `tsconfig.json` | `strict: true` absent — only partial linting enabled (`noUnusedLocals`, `noFallthroughCasesInSwitch`). Missing: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictPropertyInitialization` | Currently masked by pervasive `as any`; adding `strict` would surface 0 new errors now, but future code added without casts gains no null-safety guarantee | Add `"strict": true` to `tsconfig.json`; confirm `tsc --strict` passes (it does today) | 2 min |
| **P2** | `EndOverlay.ts:207` | `this.opts.scenarioId!` non-null assertion — `scenarioId` is `string \| undefined` in opts; only called inside `makeScenarioCard()` which is guarded by `this.opts.mode === 'scenario'`. Correct at runtime but fragile | If caller ever omits the guard, runtime throws `SCENARIO_META[undefined]` | Add `if (!this.opts.scenarioId) return` guard instead of `!` | 3 min |
| **P2** | `sentences.ts:156` | `ClozeQuestionsSchema.parse(raw) as unknown as ClozeQuestion[]` — the schema returns `Question[]` (discriminated union) but is double-cast to the looser `ClozeQuestion` alias; intent is documented but the alias has `options` and `correctIndex` as required fields even for tap-tiles/tap-pairs which omit them | If a tap-tiles entry enters the free-practice pool, `.options[i]` returns `undefined` while typed as `string`; no runtime guard | Either make `options`/`correctIndex` optional on `ClozeQuestion`, or filter out non-MC types before the cast | 15 min |
| **P2** | `storyKitten.ts:151` | `return out as unknown as ClozeQuestion` in `toClozeQuestion()` — copies optional fields shallowly; `tiles`/`correctOrder`/`pairs` pass through but `options` is declared required yet may be absent for tap-tiles | Same as above — downstream reads `.options[i]` without guard | Guard: `if (q.type === 'tap-tiles' \|\| q.type === 'tap-pairs') return q as unknown as ClozeQuestion` early with a field-presence check | 10 min |

---

## D. Bundle / build health

```
Tests:  23/23 pass
tsc:    0 errors (noEmit)
tsc --strict: 0 errors (all existing `as any` casts suppress what strict would catch)

Chunks (raw → gzip):
  react.js          139.8 KB →  45.3 KB
  zod.js             56.5 KB →  12.9 KB
  index.js           47.6 KB →  15.3 KB  (main app logic)
  LessonPage.js      27.1 KB →   8.4 KB
  react-router.js    19.9 KB →   7.5 KB
  CSS                23.6 KB →   5.5 KB

Total JS+CSS gzip: 94.6 KB  (under 400 KB budget ✅)
```

---

## E. Top 5 P0 / P1

1. **⚠️ P0 `LessonScene.ts:1108` — `dailyStreak` phantom field** — property does not exist on `RunState`; analytics STREAK_UPDATE always sends the fallback `.streak` value; the `dailyStreak` branch is dead code silently introduced by an `as any` escape.

2. **⚠️ P0 `LessonScene.ts:694` — needless `(q as any).type`** — `q` is typed `Question` which includes `.type`; casting erases the discriminant that the if-else below needs, defeating the entire discriminated-union design.

3. **P1 `LessonScene.ts:266/344/427` — `_render*(q: any)` signatures** — three render methods that receive properly-narrowed `Question` subtypes at their call sites but immediately widen to `any`, making all field accesses inside unchecked and invisible to the compiler.

4. **P1 `LessonScene.ts:108` — `lessonAnswerLog: Array<{q: any}>` ** — the Lesson Review screen data source stores every question as `any`; field renames inside `Question` subtypes will silently render `undefined` in the review UI.

5. **P2 `tsconfig.json` — missing `strict: true`** — adding it costs nothing today (`tsc --strict` passes clean), but without it all new code written without explicit annotations inherits the same type-erased patterns; the discipline only works if the compiler enforces it by default.
