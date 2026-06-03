# Code Health — 2026-06-03 18:38 UTC

Today's angle: **Error boundary coverage**
Focus layer: React ErrorBoundary placement · renderer throw paths · unhandled promise rejections · fallback UX · crash observability

---

## A. Recent commits
```
ade8d42 v2.0.B.cron-ui: 2026-06-03-1209 angle: LingQ known-words counter
4eba002 v2.0.B.cron-arch: 2026-06-03 angle: i18n architecture
1272d50 ⚠️ v2.0.B.cron-content: 2026-06-03-1206 angle: A7-content-word-repetition
5cd1b89 v2.0.B.cron-ui: 2026-06-03-0908 angle: Khan Academy progress visualization
4fca033 v2.0.B.cron-code: 2026-06-03-0639 angle: Accessibility WCAG 2.1 AA
fb31dda v2.0.B.205: ID 全面對齊 chapter 編號 + audio 跟進 rename
3830940 v2.0.B.204: Ch1 (rainy-night-cat) 刪除 + Ch2-8 renumber 成 Ch1-7
2836ec2 v2.0.B.203: Intro 章節分離 + lesson-head 22px amber 反身
```

Build: ✅ 23/23 tests pass · 309 KB raw / **93 KB gzip** · 0 warnings

---

## B. Signal (error boundary angle)

| Signal | Count | Detail |
|--------|-------|--------|
| ErrorBoundary class components | **0** | Zero anywhere in `src/` |
| `componentDidCatch` / `getDerivedStateFromError` | **0** | Not implemented |
| Suspense without ErrorBoundary wrapper | **1** | `App.tsx:49` |
| Fetch calls with no `.catch()` | **2** | `LessonPage:36`, `ChapterIntroPage:31` |
| `window.setTimeout` in event handlers (no cleanup ref) | **4** | lines 349, 412, 479, 541 |
| `ERROR_CAUGHT` PostHog event defined but never called | **1** | `posthog.ts` EVENT enum |
| `window.addEventListener('error'/'unhandledrejection')` | **0** | No global fallback |
| `NarrativeLine` useEffect with no deps array | **1** | `LessonPage:113` (unfixed since audit-1) |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/main.tsx` — entire tree | **Zero ErrorBoundary**. React tree is `<BrowserRouter>→<App>→<Suspense>→<Routes>→<LessonPage>→<Renderer>`. Any thrown JS in any renderer propagates uncaught to `createRoot`, which in React 18 leaves the DOM in a broken/blank state. | User sees white screen, loses lesson progress, no retry option. Happens on: JSON with bad `correctIndex`, `q.options` undefined, `pairs[origIdx]?.[1]` accessing malformed data, `wireSentenceHints` DOM mutation throwing. | Add one `<AppErrorBoundary>` wrapping `<Suspense>` in `App.tsx`; display a warm "頁面出了點問題 · 回首頁" card; call `track(EVENT.ERROR_CAUGHT, { message })` inside `componentDidCatch`. | 30 min |
| **P0** | `src/react-app/App.tsx:49` | **`<Suspense>` without `<ErrorBoundary>` sibling**. If `import('./pages/LessonPage')` fails (CDN cache miss, 3G timeout, service-worker stale), React throws the lazy load error. With no boundary, React 18 re-throws to root → blank app. | Reproducible on first cold load over slow mobile when CF Pages CDN hasn't warmed the chunk. User has no recovery path. | Wrap `<Suspense>` in an `<ErrorBoundary fallback={<ChunkLoadError />}>`. The fallback can show "重新載入" with `window.location.reload()`. | 20 min (same boundary component as P0-1) |
| **P0** | `src/analytics/posthog.ts` — `EVENT.ERROR_CAUGHT` | **Production crashes are invisible**. `ERROR_CAUGHT` event is defined in taxonomy and the PostHog instance is wired, but `track(EVENT.ERROR_CAUGHT, ...)` is never called anywhere. ErrorBoundary `componentDidCatch` is the standard callsite — but the boundary doesn't exist (P0-1). Result: zero visibility into how often users hit JS errors in prod. | Cannot measure reliability SLO. Auth bugs, malformed JSON from Ch2-8 (1100+ Q), TTS edge cases all fail silently. | Fix P0-1 first; inside `componentDidCatch(error, info)`, call `track(EVENT.ERROR_CAUGHT, { message: error.message, component: info.componentStack?.slice(0,200) })`. | 5 min (inside P0-1 fix) |
| **P1** | `src/react-app/pages/LessonPage.tsx:36-48` | **Fetch no `.catch()`**. `fetch('/lessons-ch${chapter}.json').then(r => r.json()).then(setLesson)` — no error handler. If network rejects or server returns 404/503, the Promise rejects silently and `lesson` stays `null`. | User sees "載入中…" spinner indefinitely. No retry, no error message. Affects: offline mode, first-visit before SW caches, CDN blip. Also missing `AbortController` (flagged in audit-1, still unfixed). | Add `.catch(() => setLesson('error' as any))` and render an error card when `lesson === 'error'`; or use a proper `[loading, error, data]` state tuple. Add `AbortController` to the same useEffect. | 20 min |
| **P1** | `src/react-app/pages/ChapterIntroPage.tsx:31-36` | **Fetch no `.catch()`**. Same pattern as LessonPage. If `/lessons-ch${ch}.json` fails, `introZh` stays empty forever — user sees the chapter intro card but no intro text, and tapping "🔊 重聽" calls `speak('')` on empty string (TTS no-op). | Chapter intro page is broken on network error, silently. | `.catch(() => {})` at minimum; better: set error state and show "暫時無法載入介紹" fallback text. | 10 min |
| **P1** | `src/react-app/pages/LessonPage.tsx:113-115` | **`NarrativeLine` useEffect no deps** (unfixed since audit-1 P0). `useEffect(() => { wireSentenceHints(ref.current); })` — fires on every parent render cycle. Lesson with 10 history items triggers 10 calls per `setIdx`. By question 8, each index change runs wireSentenceHints 8× instead of once. | O(N²) DOM mutation cost. On Snapdragon 430 + Ch1 lesson with 6 narration history items: ~48 extra DOM walks per lesson session. Cumulative jank on answer tap. | Change to `useEffect(() => { ... }, [text])` — run only when narration text changes. `text` is the prop, stable per render. | 5 min |
| **P2** | `src/react-app/renderers.tsx:349` | **`TypeWhatYouHearRenderer.submit()` setTimeout no cleanup**. `window.setTimeout(() => onAdvance(en), ...)` called inside an imperative event handler — cannot be cancelled by useEffect cleanup. If user taps ✕ during the 3-6s advance window, the timeout fires `onAdvance` → `setIdx` on unmounted component. | React 18 setState-on-unmount: no crash (React silently ignores it in v18), but the navigation side-effect in `onAdvance` (`setHistory`) may fire after the component tree is already at a different route. Affects fast users / `autoadvance` race. | Store `const timerRef = useRef<ReturnType<typeof setTimeout> \| null>(null)` at component top; assign in `submit()`; cancel in `useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, [])`. | 15 min |
| **P2** | `src/react-app/renderers.tsx:412` | **`TapTilesRenderer.submit()` same pattern**. `window.setTimeout(() => onAdvance(en), ...)` — no cleanup ref. | Same as P2-1. | Same fix pattern — `timerRef` + useEffect cleanup. | 10 min |
| **P2** | `src/react-app/renderers.tsx:479` | **`TapPairsRenderer.tap()` same pattern**. `window.setTimeout(() => onAdvance(), 2500)` — no cleanup ref. | Same as P2-1. | Same fix. | 10 min |
| **P2** | `src/react-app/renderers.tsx:541` | **`EmojiPickRenderer.onTap()` setTimeout no cleanup**. `window.setTimeout(() => setPhase('reveal'), 800)`. If user taps option, then taps ✕ within 800ms, `setPhase` fires on unmounted. | Low probability window (800ms), but `setPhase` doesn't trigger navigation so actual impact is silent. Still a React state-update-after-unmount pattern. | `timerRef` + cleanup useEffect. | 10 min |
| **P2** | `src/react-app/renderers.tsx:162` | **`NarrationRenderer` dwellAdvance timer not cleanable**. `const dwellAdvance = () => window.setTimeout(advanceOnce, 2000)` is passed as TTS `onEnd` callback — timer is created inside the async callback, outside the useEffect return scope. The `fallbackMs` timer IS cleaned up (line 166), but the 2000ms dwell is orphaned if user exits immediately after TTS fires. | `advanceOnce` guards with `advancedRef.current` flag, so double-advance is prevented. But the 2s timeout itself still runs — minor resource leak on each narration card. | Extract dwell timer ID into a component-level ref; fire and assign inside `onEnd`; clean up same ref alongside `fallbackMs` timer. | 10 min |

---

## D. Bundle / build health

```
dist/assets/react-9SDNQsEM.js        139.84 kB  │ gz: 45.34 kB
dist/assets/zod-Cohpjn9R.js          56.50 kB  │ gz: 12.93 kB
dist/assets/index-CNIPX8S7.js        47.57 kB  │ gz: 15.32 kB
dist/assets/LessonPage-Da8suCV4.js   23.25 kB  │ gz:  6.69 kB
dist/assets/react-router-BM6lXbF0.js 19.90 kB  │ gz:  7.51 kB
dist/assets/ChapterIntroPage.js        2.98 kB  │ gz:  1.46 kB
Total                                309 KB raw │    93 KB gz  ✅
```

- Build clean, 0 warnings, 23/23 tests pass
- Chunk split healthy: LessonPage lazy ✓, ChapterIntroPage lazy ✓
- Zod (12.93 KB gz) still in main chunk path — acceptable; used for lesson schema validation
- Bundle budget well under 400 KB gz target

---

## E. Top 5 P0 — 下次 session 可立刻接

1. **[30 min] Add `AppErrorBoundary` in `App.tsx`** — class component, wrap `<Suspense>`, warm fallback card "頁面出了點問題 · 回首頁", `componentDidCatch` calls `track(EVENT.ERROR_CAUGHT, ...)`. This single fix plugs P0-1 + P0-2 + P0-3 simultaneously.

2. **[20 min] Fix `LessonPage` fetch** — add `.catch(err => { console.error(err); setLesson(null); })` and render a "載入失敗 · 重試" CTA; add `AbortController` cleanup (fixes P1-1, also closes audit-1 P0 that was never addressed).

3. **[10 min] Fix `ChapterIntroPage` fetch** — add `.catch(() => setIntroZh(''))` and display fallback intro text (P1-2).

4. **[5 min] Fix `NarrativeLine` useEffect deps** — change `useEffect(fn)` → `useEffect(fn, [text])` in `LessonPage:113-115`. Halts O(N²) DOM mutation cascade (P1-3, unfixed since audit-1).

5. **[15 min × 4 renderers] Add `timerRef` cleanup to TypeWhatYouHear / TapTiles / TapPairs / EmojiPick** — standard `useRef<ReturnType<typeof setTimeout> | null>(null)` pattern (P2-1 through P2-4).

---

*Angle history: TS strict (Jun-01), Memory leak (Jun-01), Web Vitals (Jun-02), React 18 concurrent (Jun-02), Zustand selector (Jun-02), Bundle analyzer (Jun-03), Accessibility (Jun-03), **Error boundary** (Jun-03)*
