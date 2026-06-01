# Pickup Code Health Cron Audit — 2026-06-01 16:32 UTC

## A. Recent commits
```
210e4eb v2.0.B.172.1: dashboard inline audit md viewer
e0f5c5d v2.0.B.172: dashboard.html 控制中心 (5-cron decision dashboard)
763fa77 v2.0.B.cron: ⚠️ P0 UI/UX audit 2026-06-01-0831
af87056 v2.0.B.171: UI/UX polish 7 條
d1832d4 v2.0.B.170: HUD 4 icon + Shiba + locked nodes + ChapterIntroPage
cdf0bb9 v2.0.B.169: 拿掉 480 width cap (full mobile width)
41c2aec v2.0.B.168: MapPage redesign + ChaptersPage 分離
c6f453a v2.0.B.167: Phase 3a — 9 renderer registry + 5 bug fixes
1673ec5 v2.0.B.166: audio unlock + BGM + WordHint wire (2nd-round audit)
3b054cc v2.0.B.165: self-audit perf fixes (4 root cause)
03f2e17 v2.0.B.164: React Phase 2 — full cutover + 5 routes
7492fa6 v2.0.B.163: Phase 1 React sandbox (multi-page entry)
ad83294 v2.0.B.162: Phase 0 React migration setup
2795d03 v2.0.B.161.25: 4 quick wins from code-reviewer audit
7aee7fb v2.0.B.161.24: SW cache bust + drop howler dead dep
```

## B. TS strict signal
- `as any`: 18 (all in `src/scenes/LessonScene.ts` — legacy Phaser scene)
- `as unknown as`: 14 (AudioManager, posthog, storyKitten, LessonScene, ClozeUI, domUtil)
- `@ts-ignore`: 0
- `@ts-expect-error`: 0
- `eslint-disable exhaustive-deps`: 11 (10 in renderers.tsx + 1 in LessonPage.tsx)

## C. Hot path bug risk

| Pri | File:line | Issue | 風險 | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/LessonPage.tsx:109` | `NarrativeLine.useEffect` 沒有 deps array → 每次父元件 re-render 都重跑 `wireSentenceHints(ref.current)` | 每次 idx 改變（每題答完）都對 DOM 執行一次 hint wiring；history 有 N 條就跑 N 次，累積呼叫數 O(N²)，長 lesson 拖慢 | 加 `[text]` deps | 5 min |
| **P0** | `src/react-app/renderers.tsx:269,332,399` | `TypeWhatYouHearRenderer.submit()` / `TapTilesRenderer.submit()` / `TapPairsRenderer` 內直接 `window.setTimeout(() => onAdvance(...))` 沒有 cleanup ref，unmount 後 timeout 仍在 | 玩家快速點 Close（`✕`）後仍可觸發 `onAdvance → setIdx` on unmounted component → React 18 setState-after-unmount warning，prod 下 route 變但 timer 繼續跑，可能雙次 navigate | 把 timeout 存進 `useRef`，在 `useEffect` return cleanup 清掉；或限制在 `useEffect` 內 start timer | 20 min |
| **P0** | `src/react-app/pages/LessonPage.tsx:33-47` | `fetch('/lessons-ch${chapter}.json')` 無 `AbortController`，unmount 後 `.then(setLesson)` 仍執行 | 用戶快速切章節（或網路慢），前一章 fetch 回來後 setLesson → wrong chapter data displayed | `const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal })` + `return () => ctrl.abort()` | 10 min |
| **P0** | `npm run build` fails: `vitest: not found` | `package.json` `test` script 呼叫 `vitest run` 但 `vitest` binary 不在 node_modules（環境未 npm install） | CI build gate 壞掉；每次 push 的 build 驗證是假的 | 環境層面：`npm ci` 先裝 devDeps；或改 build script skip test (`tsc && vite build`) — 後者有風險 | env fix |
| **P1** | `src/react-app/views/LessonView.tsx` (130 lines) | Phase 1 sandbox prototype，0 import 引用；同目錄 `SplashView.tsx` (32 lines) 和 `MapView.tsx` (62 lines) 也是 0 import 死碼 | Vite tree-shakes 它們不進 bundle，但仍佔 224 lines 維護負擔；新人讀 `src/react-app/views/` 誤以為這是現役路徑 | `git rm src/react-app/views/*.tsx` | 5 min |
| **P1** | `package.json` `dependencies.phaser: ^3.90.0` | React app (`main.tsx`) 不 import Phaser；Phaser 只在 legacy `src/scenes/` + `src/bootGame.ts` + `src/main.ts`，而 index.html 現已指向 `main.tsx` | Phaser 仍被 Vite manualChunks 分出獨立 chunk，但若 bootGame dynamic import 路徑不再觸發，chunk 是死體積；若觸發，是 1.2 MB 未裁剪 dep | 確認 bootGame lazy import 是否仍在 React code path；若無，移至 devDep 或移除 | 30 min |
| **P1** | `src/scenes/LessonScene.ts` 1424 lines legacy | React `LessonPage` 已完全替代，18 `as any` 殘留；被 `bootGame.ts` import 仍進 Phaser chunk | Phaser chunk 被拖大；`as any` 型別洞會在 tsc strict 下誤標 false-positive clean | 若 bootGame path 確認廢棄，整個 `src/scenes/` + `src/bootGame.ts` 可 rm | 1 hr |
| **P1** | `main.tsx:18` — `StrictMode` disabled | 禁用原因是 dev double-mount audio race（B.167 documented），但 StrictMode 是 React 18 唯一免費的 useEffect cleanup 驗證工具 | dev 環境抓不到 P0 level 的 cleanup leak（如上面 fetch abort），等 prod 才爆 | 修好 P0 cleanup issues → 重新啟用 StrictMode | after P0 |
| **P2** | `renderers.tsx:177,242,348` + `LessonPage.tsx:97` | `key={i}` array index 作 key — `NarrativeLine` history list / OptionBtn list / tile buttons | history list 是 append-only，index key 尚可；OptionBtn 4 選 1 固定長度也無 reorder 問題；tile buttons 若 shuffle 則 broken | OptionBtn/tiles 改 `key={label}` 即解；narration 改 `key={s}` | 10 min |
| **P2** | `src/react-app/renderers.tsx:51-55` `useWordHint` | deps 被 `// eslint-disable-next-line` suppress，傳入 `deps` array 是呼叫者控制的，但 `wireSentenceHints` 本身是 stable ref；suppress 原因合理但沒留 comment 說為什麼 | 無立即風險，但 11 處 disable 全無說明 → 下次 Claude 看可能重新「修」掉 | 加一行 comment 說明為什麼跳過（e.g. `// wireSentenceHints is side-effect-safe to re-run`） | 15 min |

## D. Bundle health
- `npm run build` 失敗：`vitest run` 報 `sh: 1: vitest: not found`（node_modules 未完整安裝）
- 無法取得本次 gzip chunk size — 以上次 CF Pages deploy log 估算：main chunk ~400 KB gz，phaser chunk ~370 KB gz
- vite.config.ts manualChunks: phaser / zustand / zod / react-router / react 皆有正確拆分
- 警告：build gate 因 vitest missing 壞掉（P0 級 CI 問題）

## E. Top 5 P0 — 下次 session 可立刻接

1. **`NarrativeLine` missing deps `[text]`** — `LessonPage.tsx:109`：加 `}, [text]);` 一行，O(N²) DOM 操作 → O(N)
2. **submit() timer no cleanup** — `renderers.tsx:269/332/399`：改 `useRef` + `useEffect` cleanup pattern，防 unmount-after-timer bug
3. **fetch no AbortController** — `LessonPage.tsx:33`：加 AbortController，防 wrong-chapter stale state
4. **死碼 224 lines** — `src/react-app/views/*.tsx`：三個 view 0 import，直接 `git rm`
5. **build gate 壞** — `npm run build` 失敗因 vitest 未裝；需 `npm ci` 或調整 CI script 先裝 devDeps

---
*Auditor: claude-sonnet-4-6 — 0 src/ modifications*
