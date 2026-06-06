# Code Health — 2026-06-06 00:37 UTC

Today's angle: **Zustand selector performance**
Focus layer: subscription granularity · stale-closure memos · non-reactive localStorage reads · full-store subscriber cost · missing `shallow` equality · streak data source mismatch

---

## A. Recent commits

```
2783c23 v2.0.B.cron-walk: ⚠️ P0 2026-06-06-0019 persona: 小玲
e9eb4ed v2.0.B.cron-ui: 2026-06-06-0006 angle: Drops 5-min session pacing
cda58c5 v2.0.B.cron-walk: ⚠️ P0 2026-06-05-1218 persona: 阿英 Galaxy Fold folded
4956218 v2.0.B.cron-content: 2026-06-05-1212 optionsZh-translation-quality
6fc9581 v2.0.B.cron-code: 2026-06-05-0635 Android Chrome touch event
```

23/23 tests pass. Build: 6 chunks, 99 KB total gzip.

---

## B. Signal (counts per angle)

| Signal | Count | Files |
|--------|-------|-------|
| `useRunStore` hooks in React pages | 5 | MapPage, ProfilePage, TasksPage (×3) |
| `readXp()` / `readCoins()` called at render-time (non-reactive) | 4 callsites | MapPage, ProfilePage |
| `updateStreak()` never called in React entry | 1 gap | App.tsx |
| `useMemo` deps intentionally missing `completed` | 1 | MapPage:176 |
| Full-store subscribe (no selector) in non-React class | 1 | ClozeUI.ts:343 |
| `useEffect` missing dep array (`wireSentenceHints` every render) | 1 | LessonPage:114 |
| AlertsPage achievements `earned: false` hardcoded | 8 badges | AlertsPage.tsx:1-10 |
| `useCallback` / `React.memo` usage | 0 | entire react-app/ |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `MapPage.tsx:165` `TasksPage.tsx:4` `ProfilePage.tsx:7` | `useRunStore(s => s.streak)` reads the **in-session answer streak** (reset every `runStore.reset()`), NOT `pickup.streak.count` persistent daily calendar streak. All three pages show 0 after any reload. | User sees 0-day streak despite a real 7-day streak; "每日任務" logic `streakDone = streak > 0` is always false after reload | Replace `useRunStore(s => s.streak)` with `useState(() => readStreak())` (or a small `useStreak()` hook that reads from `src/data/streak.ts`) | 30 min |
| **P0** | `MapPage.tsx:170-177` | `useMemo` for `currentNodeIdx` has deps `[lessons.length, chapter]`. Inside the body it uses `completed` (a `Set<string>` read from localStorage). When a lesson finishes and user navigates back, `lessons.length` and `chapter` haven't changed → memo returns stale index → grandma mascot sits on wrong (already-done) node | Cat character anchors on completed node; node unlock highlight points at stale position; auto-scroll jumps to wrong target | Add `completed.size` to deps array and remove the `// eslint-disable-next-line` suppression: `}, [lessons.length, chapter, completed.size])` | 5 min |
| **P1** | `App.tsx` | `updateStreak()` (from `src/data/streak.ts`) is only called inside Phaser `BootScene.ts:26`. The React-first entry path (`src/main.tsx` → `App.tsx`) never calls it. Users who open the PWA without Phaser loading will never advance their daily streak counter. | Streak stays frozen at last-Phaser-session value; Duolingo-style streak retention loses its motivational function | Call `updateStreak()` once in `App.tsx` `useEffect([], [])` on mount — same pattern as `BootScene` | 10 min |
| **P1** | `ClozeUI.ts:343` | `useRunStore.subscribe((state) => this.syncFromState(state.round))` receives the **full state snapshot on every store write** — score, streak, HP, answered, pool, etc. — even writes that have nothing to do with `round`. `syncFromState` is called ~10× per Q when only 1 call is needed. | Unnecessary DOM re-syncs on non-round mutations (score ticks, streak increments). Low severity now, higher if `syncFromState` grows. | Use the selector overload: `useRunStore.subscribe(s => s.round, (round) => this.syncFromState(round))` — fires only when `round` reference changes | 5 min |
| **P1** | `LessonPage.tsx:114-116` (`NarrativeLine`) | `useEffect(() => { wireSentenceHints(ref.current) })` has **no dep array** — runs after every render of `NarrativeLine`. As `history` grows (N narration entries), each new entry causes all N `NarrativeLine` siblings to re-run `wireSentenceHints`. `wireSentenceHints` adds `mouseenter`/`click` listeners to every `.word` span — duplicate listeners accumulate | Duplicate tooltip handlers on every word in all history lines; UI defects on second+ tap (double speak, double tooltip). Worsens linearly with lesson length (O(N²) total listener adds for N narrations). | Add `[]` as dep array (hints wired once on mount, stable). Or `[q.id]` if the text can change in-place. | 5 min |
| **P1** | `AlertsPage.tsx:1-10` | Eight achievements are hardcoded with `earned: false`. `src/data/achievements.ts` exists, calls `readStreak()` / `readXp()` / `readCompletedLessons()`, and exports `getAchievements()`. AlertsPage never imports or calls it. | All badge icons permanently locked regardless of user progress; breaks gamification loop | Replace inline `ACHIEVEMENTS` with `getAchievements()` import; map its returned `.unlocked` flag to `earned` prop | 20 min |
| **P2** | `MapPage.tsx:183-190` | `readXp()`, `readCoins()`, `levelForXp()`, `levelProgress()` called inline during render — not backed by React state. Values are stable across same-session renders because `addXp()`/`addCoins()` only write to localStorage and don't emit any React signal. In practice, navigation causes a remount so the values refresh, but if MapPage were ever kept mounted (e.g. future keep-alive routing), HUD would show stale XP/coins within the session. | Stale HUD XP + coins after in-session `addXp` without navigation. Currently masked by full-page remounts but fragile. | Lift `readXp()`/`readCoins()` into `useState` + re-read on mount, or store XP/coins in Zustand alongside the localStorage write-through. | 45 min (if store migration) / 10 min (useState snapshot) |
| **P2** | `LessonPage.tsx:69-87` | `onAdvance` and `onAnswer` are plain arrow functions defined in the component body — new reference every render. `Renderer` components accept them as props. No `useCallback` wrapping, no `React.memo` on renderers. If any renderer is ever memoized (a natural optimization for complex question UIs), all would immediately re-render on every LessonPage state change due to unstable prop refs. | No immediate bug; latent tech debt that silently negates future memoization. Common "it worked until we tried to optimize" trap. | Wrap both in `useCallback` with appropriate deps (`[q, idx]`) | 15 min |

---

## D. Bundle / build health

```
dist/assets/index-BnCm34qw.js     47.60 kB │ gzip: 15.34 kB   (main — no regressions)
dist/assets/LessonPage-CsgaJQJe.js 27.05 kB │ gzip:  8.39 kB   (lazy chunk OK)
dist/assets/react-9SDNQsEM.js    139.84 kB │ gzip: 45.34 kB   (React — expected)
dist/assets/zod-Cohpjn9R.js       56.50 kB │ gzip: 12.93 kB   (zod still in main path)

Total gzip (all chunks):  ~99.3 KB
Tests: 23/23 pass
Build warnings: 0 errors. PLUGIN_TIMINGS note on vite:prepare-out-dir (non-blocking).
```

No bundle regressions this cycle. Zod 13 KB chunk still worth evaluating for lazy-load (already flagged in bundle audit 2026-06-03).

---

## E. Top 5 P0 / P1

### ⚠️ P0-A — Wrong streak source in all three React HUD pages

`MapPage:165`, `TasksPage:4`, `ProfilePage:7` all call `useRunStore(s => s.streak)`.

`runStore.streak` is the **answer-run streak** — it resets to 0 on `reset()` and on every page load. The persistent calendar streak lives in `localStorage[pickup.streak.count]` and is read via `readStreak()` from `src/data/streak.ts`.

Result: every user sees "🔥 0" in the HUD after any reload, regardless of real streak. The "連勝" stat in ProfilePage and the "連續學習至少 1 天" task check are permanently broken for returning users.

Fix (3 files, ~10 min total):
```ts
// before
const streak = useRunStore(s => s.streak);
// after
const [streak] = useState(() => readStreak()); // import readStreak from '../../data/streak'
```

---

### ⚠️ P0-B — `currentNodeIdx` useMemo stale closure on `completed`

`MapPage.tsx:170-177`. The memo body uses `completed` (a `Set<string>` from `readCompletedLessons(chapter)`) but `completed` is not in the dep array. After a lesson completion + back-navigation, `lessons.length` and `chapter` are unchanged → memo returns cached index → cat sits on already-done node.

Fix (2-line change):
```ts
// MapPage.tsx:176
}, [lessons.length, chapter, completed.size]);  // add completed.size
// remove the eslint-disable-next-line above it
```

---

### P1-A — `updateStreak()` never called in React flow

`App.tsx` has no call to `updateStreak()`. Only Phaser `BootScene.ts:26` calls it. PWA users (no Phaser path) never advance their calendar streak.

Fix:
```ts
// App.tsx useEffect
useEffect(() => {
  void preloadHints();
  updateStreak();   // add this line — import from '../data/streak'
  ...
}, []);
```

---

### P1-B — Full-store Zustand subscribe in ClozeUI

`ClozeUI.ts:343`: `useRunStore.subscribe((state) => this.syncFromState(state.round))` fires on all 20+ store fields. Should use selector overload:

```ts
// before
this.unsub = useRunStore.subscribe((state) => {
  this.syncFromState(state.round);
});
// after
this.unsub = useRunStore.subscribe(
  s => s.round,
  (round) => this.syncFromState(round)
);
```

---

### P1-C — NarrativeLine `wireSentenceHints` runs on every render (O(N²))

`LessonPage.tsx:114`:
```ts
useEffect(() => {
  if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
});  // ← no dep array
```

Runs after every render of every `NarrativeLine`. With N history entries, each new entry causes N calls. Fix: add `[]` dep array.

```ts
useEffect(() => {
  if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
}, []);
```
