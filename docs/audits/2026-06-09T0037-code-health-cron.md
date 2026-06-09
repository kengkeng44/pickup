# Code Health — 2026-06-09 00:37 UTC

Today's angle: **Zustand selector performance** (re-render overhead + stale-data on mobile ELT game)
Focus layer: `src/store/runStore.ts`, `src/ui/ClozeUI.ts`, `src/react-app/pages/{MapPage,TasksPage,ProfilePage}.tsx`, `useMemo` dep arrays.

---

## A. Recent commits

```
b395c84 v2.0.B.cron-walk: 2026-06-09-0016 persona: 子安 B1 PM Android Chrome [ARCH-REC: LevelTest wire + B1 tier]
ed14ad3 v2.0.B.296 IntersectionObserver ROOT FIX: 砍 scrollY listener + idleChapter
a3d5eb6 ⚠️ v2.0.B.cron-ui: 2026-06-09-0009 angle: iOS Health chart UX + ARCH-REC #6
f4ea691 v2.0.B.cron-content: 2026-06-09-0007 angle: R1-paraphrase Ch2/3/6/8 [ARCH-REC #5]
62ab625 v2.0.B.cron-code: 2026-06-08-1837 angle: TS strict mode quirks + ARCH-REC
47e634d v2.0.B.cron-ui: 2026-06-08-1807 angle: Apple Music audio UI + ARCH-REC Zustand audioSlice
```

---

## B. Signal (counts per angle)

| Signal | Count | Note |
|--------|-------|------|
| Broad `useRunStore.subscribe(full-state)` | **1** | ClozeUI.ts:343 — no round selector |
| Non-reactive LS reads in render body | **7** | readXp/readCoins/readStreak/readFreezes across 3 pages |
| `useMemo` dep uses `.length` not ref | **1** | MapPage.tsx:269 `[lessons.length]` |
| `completedByChapter` memo stale dep | **1** | MapPage.tsx:314 `requestedChapter` vs `chapter` |
| `useRunStore` hook-form calls in React | **1** | Only ProfilePage.tsx:16 — all others use getState() |
| `subscribeWithSelector` middleware used | **0** | Not installed — broad subscribe is only option |
| `React.memo` used | **1** | MapNode.tsx — correct |
| `useCallback` stabilising MapNode props | **3** | MapPage.tsx:400-404 — correct |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** ⚠️ | `src/ui/ClozeUI.ts:343` | `useRunStore.subscribe((state) => syncFromState(state.round))` 訂全狀態 — answer() 每次觸發 8+ 個 field 更新 → subscriber 跑 8 次，每次 syncFromState() 重建 DOM option buttons | answer() 答一題 → 8× DOM rebuild → 慢機器可見閃動或 button 短暫 disabled 狀態不符預期 | 加 prevRound guard: `let prev = init.round; subscribe(s => { if (s.round !== prev) { prev = s.round; syncFromState(s.round); } })` | XS 10min |
| **P0** ⚠️ | `src/react-app/pages/MapPage.tsx:258,345` + `TasksPage.tsx:6` + `ProfilePage.tsx:18` | `readStreak()` / `readXp()` / `readCoins()` / `readFreezes()` 全是直接呼叫 localStorage 的純函式，無 React state 包裹 | 完成 lesson → 返回 Map/Tasks/Profile → 看到舊 streak/XP/coins 直到下次整頁 reload。8-12 兒童客群會認為「沒有變」→ 打斷 reward loop | `useSyncExternalStore` pattern (見 §E + ARCH-REC) | M 1hr |
| **P1** | `src/react-app/pages/MapPage.tsx:269` | `useMemo(..., [lessons.length])` — dep 用 `.length` 基本型不用陣列參考 | progressive load 後 lessons ref 換但 length 同 → stream memo stale (chest 節點計算錯)。目前影響小但 aggregate 30ch load path 可能觸發 | 改 `[lessons]` | XS 5min |
| **P1** | `src/react-app/pages/MapPage.tsx:314` | `completedByChapter` memo deps: `[lessons, isAggregate, requestedChapter]` — `requestedChapter` 是 URL param 衍生值，aggregate 捲動時 `chapter` state 更新但 `requestedChapter` 不動 | aggregate scroll 跨章時 completedByChapter 不 recompute → 節點顯示上一章的 done set → 錯誤的 done/locked 狀態到下次 lessons 更新 | deps 改 `[lessons, isAggregate, chapter]` (用 IO state 的 `chapter`) | XS 5min |
| **P1** | `src/react-app/pages/ProfilePage.tsx:16` | `useRunStore(s => s.streak)` 讀 in-session streak，但 `readXp()` / `readCoins()` 讀 localStorage。in-session streak reset() 時清零，但 localStorage persistent streak 是另一個值 | lesson 結束 → ProfilePage: streak 顯示 in-session (正確) 但 XP/coins 是 stale localStorage。不一致的資料來源讓數字「看起來不對」 | 統一: xp/coins/streak 都用 `useSyncExternalStore` 或都走 Zustand persist | S 20min |

---

## D. Bundle / build health

```
dist/assets/zustand-ELZZeSVj.js    2.30 kB │ gzip: 1.03 kB    ← 輕量 ✅
dist/assets/LessonPage-By-FWmS4.js 65.23 kB │ gzip: 17.61 kB
dist/assets/index-ByI7f9tV.js      175.70 kB │ gzip: 52.14 kB

Total gzip: ~137 kB (React + router + index + lesson) — ✅ within budget
```

- `subscribeWithSelector` middleware 若加入: +0 KB (已含在 zustand middleware.js bundle 內，tree-shaken)
- `useSyncExternalStore` is a React 18 built-in: +0 KB

---

## E. Top 5 P0

### E1 — ClozeUI.ts:343 broad-subscribe guard (P0 ⚠️ XS 10min)

```ts
// BEFORE (src/ui/ClozeUI.ts:343)
this.unsub = useRunStore.subscribe((state) => {
  this.syncFromState(state.round);
});
const init = useRunStore.getState();
this.syncFromState(init.round);

// AFTER — prevRound guard, fires only when round object changes
const init = useRunStore.getState();
let prevRound = init.round;
this.syncFromState(prevRound);
this.unsub = useRunStore.subscribe((state) => {
  if (state.round !== prevRound) {
    prevRound = state.round;
    this.syncFromState(state.round);
  }
});
```

Impact: 答題 1 次 DOM rebuild 次數 8× → 1×. syncFromState 重建 4 個 option button 的 innerHTML/style/disabled — 少 7 次不必要 DOM write per answer.

### E2 — Non-reactive LS reads: useSyncExternalStore pattern (P0 ⚠️ M 1hr)

業界 2026 標準做法 (React docs + DEV community): `useSyncExternalStore` + custom event dispatch.

```ts
// src/hooks/useLocalStorage.ts (new tiny file)
import { useSyncExternalStore } from 'react';

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener('pickup-storage-update', cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener('pickup-storage-update', cb);
  };
}

export function useLocalStorage<T>(key: string, fallback: T): T {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        const raw = localStorage.getItem(key);
        return raw !== null ? (JSON.parse(raw) as T) : fallback;
      } catch { return fallback; }
    },
    () => fallback  // server snapshot (Capacitor SSR safe)
  );
}
```

Write side (xp.ts / streak.ts / coins.ts) 在每次 setItem 後加一行:
```ts
window.dispatchEvent(new Event('pickup-storage-update'));
```

Call sites 改:
```ts
// MapPage.tsx:258
const streak = useLocalStorage('pickup.streak', 0);
// MapPage.tsx:345
const xp = useLocalStorage('wordwar.xp', 0);
```

### E3 — MapPage.tsx:269 useMemo dep fix (P1 XS)

```ts
// BEFORE
}, [lessons.length]);
// AFTER
}, [lessons]);
```

### E4 — MapPage.tsx:314 completedByChapter dep fix (P1 XS)

```ts
// BEFORE
}, [lessons, isAggregate, requestedChapter]);
// AFTER  — 用 IO state 的 chapter, 不是 URL param
}, [lessons, isAggregate, chapter]);
```

### E5 — ProfilePage.tsx data source unification (P1 S)

`streak` 改從 `readStreak()` 讀 (persistent, 不是 in-session) 或全移到 `useLocalStorage`. 目前 `useRunStore(s => s.streak)` 讀的 in-session streak 在冷啟動 = 0, 跟 localStorage streak 不一致.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| `useSyncExternalStore` custom `useLocalStorage` hook | [React 18 docs](https://react.dev/reference/react/useSyncExternalStore) · [DEV: The Right Way to Sync React with localStorage](https://dev.to/muhammed_fayazts_e35676/usesyncexternalstore-the-right-way-to-sync-react-with-localstorage-3c5f) | ✅ 適合 — React 18 built-in, 0KB overhead, 解決 MapPage/TasksPage/ProfilePage 三個頁面的 stale XP/streak/coins. write side 只需 1 行 dispatchEvent. | M 1hr total (new file 30 行 + 7 callsite 改 + write side 3 dispatch) | ⭐⭐⭐ | **實作** |
| Zustand `persist` middleware 把 xp/streak/coins 移進 store | [Zustand persist docs](https://zustand.docs.pmnd.rs/reference/middlewares/persist) | 🟡 部分適合 — persist 可解 reactive 問題, 但 xp.ts/streak.ts/coins.ts 有獨立邏輯 (addXp SRS calc / streak freeze logic). 搬進 store 需重寫這些模組, 風險 > reward | L 4hr | ⭐⭐ | **延後** — Phase 3 重構時考慮 |
| `subscribeWithSelector` middleware (ClozeUI) | [Zustand middleware.js](https://github.com/pmndrs/zustand) · [Discussion #1328](https://github.com/pmndrs/zustand/discussions/1328) | ❌ 不適合 — 2026 社群建議 avoid for new code; ClozeUI 是 imperative TS class (non-React), 改加 prevRound guard 更簡單且同效果. 0 額外 bundle. | XS 10min | ⭐ | **改 prevRound guard 替代** |
| Zustand `useShallow` multi-field selector | [Medium Apr 2026: Optimizing React Component Rendering with Zustand](https://medium.com/@nuwan.thuduwage/optimizing-react-component-rendering-with-zustand-stop-re-rendering-what-didnt-change-e538163717e5) | 🟡 部分適合 — 目前 React components 幾乎不用 useRunStore hook form (僅 ProfilePage 1 處). 若未來 LessonPage 移 Zustand, 加 useShallow 防多 field subscription re-render | S 20min 屆時 | ⭐⭐ | **Note now, 實作 when LessonPage migrates** |

**本 cycle ARCH-REC #8**: `useSyncExternalStore` custom `useLocalStorage` hook — 3 pages 的 stale LS reads 一次解決，React 18 primitive 0KB 增量，寫法業界標準。
