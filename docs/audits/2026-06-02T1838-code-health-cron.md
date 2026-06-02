# Code Health — 2026-06-02 18:38 UTC

Today's angle: **Zustand selector performance**
Focus layer: store subscription patterns / React re-render cost / localStorage read coupling

---

## A. Recent commits

```
f031b3a v2.0.B.cron-ui: 2026-06-02-1809 angle: Anki SRS card design
a7d8038 v2.0.B.197: Ch1 開頭 hook — emoji-pick Q0 + n1 emotional bridge
0c2e6a3 v2.0.B.196: todo 加 Sketch-to-Code workflow + dashboard 第 2 個 todo tile
d6d2a97 ⚠️ v2.0.B.cron-content: 2026-06-02-1208 angle: optionsZh-translation-quality
db777f0 v2.0.B.195: static QA HTML 8 chapters + index + edit-export tool
31ee956 v2.0.B.194.1: cockpit-deploy sync markdown + index.html
8439c1e v2.0.B.192: lazy-split + XP/Coins wire + img height CLS
45df397 v2.0.B.190: Code Health 3 P0 + 1 P1 (perf batch)
```

---

## B. Signal counts (Zustand angle)

| Category | Count |
|----------|-------|
| `useRunStore(selector)` in React components | 3 (MapPage / ProfilePage / TasksPage) |
| `useRunStore.subscribe(state => ...)` without selector | 1 (ClozeUI.ts:339) |
| `useRunStore.getState()` imperative reads | ~18 across scenes |
| `useRunStore.setState(...)` direct mutations from non-store code | 3 (TapInputUI×2, LessonScene) |
| `readXp()` / `readCoins()` in React render body (no useState) | 2 files (MapPage, ProfilePage) |
| `readCompletedLessons()` in React render body (no useMemo) | 1 file (MapPage:166) |
| Re-render triggers in MapPage | 4 (streak / pressedId / loading / showKeySheet) |
| Event handlers without `useCallback` in 24-node loop | 4 per node × 24 = 96 lambdas per render |
| `shallow` equality selectors used | 0 |

---

## C. Hot path bug / risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/ui/ClozeUI.ts:339` | `useRunStore.subscribe(state => syncFromState(state.round))` — **no selector**. Fires on EVERY mutation (score, hp, streak, answered, history, wrongAttempts…). During an answer cycle `set()` is batched (1 notify), but narration / retry / hud updates each fire separately, calling `syncFromState` 3-5× unnecessarily per Q. | Medium-high: `syncFromState` does DOM attribute writes + style resets on 4 buttons each call — wasted DOM work per extra fire. | Upgrade to `useRunStore.subscribe(s => s.round, syncFromState)` (subscribeWithSelector pattern — available in zustand 4.5 via `import { subscribeWithSelector } from 'zustand/middleware'` or simply use the `(selector, callback)` overload on the raw store). | 15 min |
| **P0** | `src/react-app/pages/MapPage.tsx:166` | `const completed = readCompletedLessons(chapter)` called **in render body** (not `useMemo`/`useEffect`). MapPage re-renders on `pressedId` change (every pointer-down on any of 24 nodes) → 24 separate `localStorage.getItem` + `JSON.parse` calls per tap. | Medium: `localStorage` is synchronous I/O; on mid-range Android (Redmi, Samsung A-series) 24 reads can block main thread 2-8ms. Compounds with 24-node render pass. | Wrap in `useMemo(() => readCompletedLessons(chapter), [chapter, lessons])` or move to `useState` updated in the `useEffect([chapter])` that already fetches lessons. | 10 min |
| **P0** | `src/react-app/pages/MapPage.tsx:183-184` | `readXp()` + `readCoins()` called every render, outside any hook. **No subscription mechanism**. After a lesson completes (XP/coins written by `CompletePanel`), navigating back to `MapPage` shows stale HUD values until a fresh mount. `streak` is subscribed via Zustand (`useRunStore(s => s.streak)`) but XP/Coins are not — asymmetric freshness. | High (UX correctness): player earns 10 XP + 3 coins per lesson but HUD still shows old values. Discovered by audit P1 #35 (B.192) — root cause not yet fixed for the Map HUD. | Add `const [xp, setXp] = useState(readXp)` + `const [coins, setCoins] = useState(readCoins)` and a `useEffect` with `window.addEventListener('focus', ...)` refresh OR expose XP/coins in Zustand store so a selector can subscribe. Simplest: `useFocusRefresh` effect on mount. | 20 min |
| **P1** | `src/react-app/pages/MapPage.tsx:350-354` | 24-node loop creates **4 new arrow functions per node per render** (onClick, onPointerDown, onPointerUp, onPointerLeave / onPointerCancel). Every `pressedId` change → 24×4 = 96 new closures GC'd. With React 18 concurrent mode this runs twice in StrictMode dev, 96 → 192. | Low-medium: object allocation pressure on mobile. Each pressedId flip (tap down + tap up = 2 re-renders) = 192 closures created + released. On low-end devices this contributes to jank. | Extract handler factory with `useCallback` + data attributes: `onPointerDown` reads `e.currentTarget.dataset.id` instead of capturing `l.id` per closure. Single stable handler for all 24 nodes. | 25 min |
| **P1** | `src/react-app/pages/TasksPage.tsx:8-10` | `for (let ch = 1; ch <= 8; ch++) readCompletedLessons(ch)` — up to 8 `localStorage.getItem` + `JSON.parse` calls on **every render**. TasksPage re-renders whenever `streak` Zustand slice updates. | Low: TasksPage is a mostly-static view, re-renders infrequent. But the localStorage read loop is still unnecessary on repeated renders. | Wrap in `useMemo(() => { for ch 1..8; return found }, [streak])` (streak as proxy for "something changed"). | 5 min |
| **P1** | `src/ui/ClozeUI.ts:414` | `useRunStore.getState().awaitingRetry` — imperative `getState()` read inside a synchronous click handler. This is correct for non-reactive reads, but if `awaitingRetry` is toggled by `TapInputUI.setState` (`:252`, `:404`) concurrently with a ClozeUI click, the read races against the setter. | Low: unlikely in practice given single-threaded JS, but setter `s => ({ wrongAttempts: Math.max(s.wrongAttempts, 1) })` at TapInputUI:252/404 does NOT set `awaitingRetry` — only `wrongAttempts`. The race is benign. Document the invariant to avoid future confusion. | Add inline comment clarifying awaitingRetry setter path (LessonScene's answer() → runStore.answer()) vs wrongAttempts path (TapInputUI direct setState). | 3 min |
| **P2** | `src/store/runStore.ts:403` | `history.some((h) => h.question.id === round.id && !h.correct)` — O(n) linear scan of `history` array on every `answer()` call to detect retry-correct. In a long run (many wrong answers), history grows unbounded; the scan cost scales linearly. | Low: lesson length is max ~15 Q, history stays small. Not a crisis today, but the pattern doesn't scale to future "endless drill" modes. | No change needed now. Document as tech debt. If lessons grow to 50+ Q, switch to a `Set<string>` of "first-time-wrong IDs" maintained alongside history. | — |
| **P2** | `src/store/runStore.ts:443` | `history: [...history, entry]` — spread-copies the full array on every answer. With blind-retry, a single Q can generate 2-3 entries before continuing, so copies happen more than once per Q. | Low: array is short (≤15 entries per lesson). Negligible today. | Same as above — not worth fixing until session length grows. | — |

---

## D. Bundle / build health

```
dist/assets/index-C5jOBh95.js    47.57 kB │ gzip: 15.33 kB  ← main app chunk
dist/assets/react-9SDNQsEM.js   139.84 kB │ gzip: 45.34 kB  ← React
dist/assets/zod-Cohpjn9R.js      56.50 kB │ gzip: 12.93 kB  ← validation
dist/assets/zustand-Bee562SY.js    2.30 kB │ gzip:  1.03 kB  ← ✅ tiny
Total JS: ~289 kB raw / ~81 kB gzip
```

Build: ✅ clean, 0 errors, 0 warnings, all 34 tests pass.

Zustand bundle (2.3 kB) is negligibly small — the cost is not in bundle size but in runtime subscription patterns. `subscribeWithSelector` middleware adds ~0.5 kB if needed.

---

## E. Top 5 P0 / P1

### ⚠️ P0-1 — ClozeUI whole-store subscribe fires on every mutation
`src/ui/ClozeUI.ts:339`
```ts
// CURRENT: fires on every store mutation
this.unsub = useRunStore.subscribe((state) => {
  this.syncFromState(state.round);
});

// FIX: subscribe only when round changes
// Zustand 4.5 supports (selector, callback) overload natively:
this.unsub = useRunStore.subscribe(
  (s) => s.round,
  (round) => this.syncFromState(round)
);
```

### ⚠️ P0-2 — MapPage readCompletedLessons() on every pressedId re-render
`src/react-app/pages/MapPage.tsx:166`
```tsx
// CURRENT: 24 localStorage reads per pointer event
const completed = readCompletedLessons(chapter);

// FIX: memoize until chapter or lessons change
const completed = useMemo(
  () => readCompletedLessons(chapter),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [chapter, lessons]
);
```

### ⚠️ P0-3 — MapPage HUD shows stale XP/Coins after lesson return
`src/react-app/pages/MapPage.tsx:183-184`
```tsx
// CURRENT: snapshot read, no refresh on focus
const xp = readXp();
const coins = readCoins();

// FIX: refresh on window focus (user comes back from lesson)
const [xp, setXp] = useState(readXp);
const [coins, setCoins] = useState(readCoins);
useEffect(() => {
  const refresh = () => { setXp(readXp()); setCoins(readCoins()); };
  window.addEventListener('focus', refresh);
  return () => window.removeEventListener('focus', refresh);
}, []);
```

### P1-4 — MapPage 96 closure allocations per pressedId flip
`src/react-app/pages/MapPage.tsx:350-354`

Use `useCallback` + `data-*` attributes to replace 96 per-render lambdas with 4 stable handlers reading `e.currentTarget.dataset.id`.

### P1-5 — TasksPage 8 localStorage reads every streak re-render
`src/react-app/pages/TasksPage.tsx:8-10`

Wrap in `useMemo(..., [streak])` — streak is already subscribed and is the correct invalidation signal.
