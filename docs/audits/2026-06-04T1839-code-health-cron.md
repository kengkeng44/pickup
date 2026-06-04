# Code Health — 2026-06-04 18:39 UTC

Today's angle: **Memory leak (event listener / RAF)**
Focus layer: uncleaned `setTimeout` closures in React renderers · unbounded AudioBuffer cache · raw window timer in Phaser scene · wireSentenceHints deps omission

---

## A. Recent commits

```
f2850eb v2.0.B.229: Ch2 give-away + Ch4 paraphrase→inference fix
c49111f v2.0.B.228: 7 P1 quick wins from Ch5/Ch6/Ch7 walkthrough audits
c4d78d1 v2.0.B.227: 3 systemic P0 fixes from Ch2-7 walkthrough audits
741202c v2.0.B.cron-walk: P0 2026-06-04-1219 dyslexic 阿文 Android Chrome
fc4017a v2.0.B.cron-code: 2026-06-04-0639 localStorage / private mode
```

---

## B. Signal (counts per angle)

| Category | Count |
|---|---|
| `window.setTimeout` outside `useEffect` (no cancel) | 6 call-sites |
| `window.setTimeout` inside `onEnd` callback (nested, no cancel) | 2 call-sites |
| `window.setTimeout` in Phaser scene with discarded id | 1 call-site |
| `useEffect` missing deps array (runs every render) | 1 |
| `audioBufferCache` Map — zero eviction policy | 1 global |
| `cancelAnimationFrame` paired with RAF loop | ✅ correct (Confetti) |
| `removeEventListener` paired with `window.addEventListener` | ✅ correct (Mascot, Confetti, WordHint) |
| `destroy()` methods present on all major UI classes | ✅ |
| Async IIFE in constructor continues after `destroy()` | 1 (StoryMapView) |

---

## C. Hot path bug-risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|---|---|---|---|---|---|
| **P0** | `src/react-app/renderers.tsx:349` | `TapTilesRenderer.submit()` calls `window.setTimeout(() => onAdvance(en), 3-5s)` outside `useEffect`; timer id discarded; no cancel on unmount | User taps back button mid-lesson → `onAdvance` fires into unmounted component / navigates after user is already on a different screen | Wrap in a `useRef<number>` + store id in submit + `useEffect(() => () => clearTimeout(refId))` | S |
| **P0** | `src/react-app/renderers.tsx:412` | `TapTilesRenderer` same pattern (second occurrence — `TapTilesRenderer` has two exit paths: correct vs wrong) | Same as above | Same | S |
| **P0** | `src/react-app/renderers.tsx:479` | `TapPairsRenderer.tap()` — `window.setTimeout(() => onAdvance(), 2500)` discarded, no cancel | Same stale-advance risk | Same | S |
| **P0** | `src/react-app/renderers.tsx:541,546` | `EmojiPickRenderer.onTap()` — two `window.setTimeout` calls discarded (setPhase + setShakeIdx) | `setShakeIdx` on unmounted = React silent state update; `setPhase` fires reveal after user already left | Same | S |
| **P0** | `src/react-app/renderers.tsx:199` | `ListenTfRenderer` useEffect chains `speak(en, { onEnd: () => setTimeout(speak(qPrompt), 400) })` — inner 400ms setTimeout has no id, no cleanup; useEffect returns `void` | Fast q.id change (programmatic advance) fires `speak(qPrompt)` into new question's audio context → wrong audio bleeds | Store inner setTimeout id in ref, `clearTimeout` in useEffect cleanup | S |
| **P0** | `src/react-app/renderers.tsx:268` | `ListenMcRenderer` — identical pattern: `onEnd → setTimeout(speak(qPrompt), 400)`, no cleanup | Same bleed risk on rapid navigation | Same | S |
| **P0** | `src/scenes/LessonScene.ts:337` | `window.setTimeout(advance, fallbackMs)` in `_renderNarration()` — timer id discarded; `cleanupOverlay()` only cancels `this.advanceTimer` (Phaser), NOT this raw window timer | X button pressed mid-narration → `advance()` fires up to 20s later into destroyed scene; `advanced` guard prevents double-render but closure still runs `this.questionIdx += 1` on potentially-null `this.lesson` | Store id in `private narrationFallbackTimer?: number`; clear in `cancelAdvanceTimer()` / `cleanupOverlay()` | XS |
| **P1** | `src/audio/tts.ts:168` | `audioBufferCache = new Map<string, AudioBuffer>()` — never evicted. Ch1 preloads ~200 MP3s → decoded PCM ≈ 5-20× compressed size → ~20MB RAM never released. Ch2-8 ship will scale to 100MB+/session | Memory pressure on low-end Android phones (1-2GB RAM) → tab kill / OOM crash | Cap to LRU(50) or evict on lesson change: `audioBufferCache.clear()` in `stopSpeaking()` when new lesson starts | M |
| **P2** | `src/react-app/pages/LessonPage.tsx:113` | `NarrativeLine.useEffect` missing deps array — runs after every render | `wireSentenceHints` is idempotent (guards via `data-pickup-word-hints`), so no listener double-bind, but needless DOM read on every React render cycle | Add `[text]` dep: `useEffect(() => { ... }, [text])` | XS |
| **P2** | `src/ui/StoryMapView.ts:338` | Async IIFE `(async () => { ... await loadChapterLessons() })()` in constructor body continues running after `destroy()` could be called, pushing nodes into `this.nodes` array post-destroy | Benign in practice (StoryModeScene destroys only on tab-switch, async resolves in < 200ms), but violates teardown contract — no abort signal | Store IIFE's promise; in `destroy()` set a `this._destroyed` flag; IIFE checks flag before `this.nodes.push()` | S |

---

## D. Bundle / build health

```
react-9SDNQsEM.js       139.84 KB │ gzip: 45.34 KB
zod-Cohpjn9R.js          56.50 KB │ gzip: 12.93 KB
index-Dhh_fNzw.js        47.60 KB │ gzip: 15.34 KB   (main app)
LessonPage-DR88EyQR.js   23.25 KB │ gzip:  6.69 KB
react-router-BM6lXbF0.js 19.90 KB │ gzip:  7.51 KB
index-CpTfSFtW.css        23.60 KB │ gzip:  5.51 KB
Total gzip (JS+CSS):             ~93.7 KB  ✅ (target < 400 KB ✓)
```

Build: **✅ clean** — 0 errors, 0 warnings, 23 tests pass.

Note: `audioBufferCache` is runtime RAM, not bundle size — doesn't show here but matters on device.

---

## E. Top 5 P0

1. **renderers.tsx:349/412 — TapTilesRenderer stale advance timer**
   `window.setTimeout(() => onAdvance(en), ...)` in `submit()` not in useEffect. Navigate-away while pending → stale navigation fires. Fix: `const timerRef = useRef<number>(); ... timerRef.current = window.setTimeout(...); useEffect(() => () => clearTimeout(timerRef.current), []);`

2. **renderers.tsx:479 — TapPairsRenderer stale advance timer**
   Same pattern inside `tap()` event handler. Same fix pattern.

3. **renderers.tsx:199 — ListenTfRenderer chained audio setTimeout no cleanup**
   `onEnd` callback schedules `speak(qPrompt)` with 400ms delay, no cancel path. `q.id` changes before 400ms → wrong audio fires on new Q. Fix: store id in `useRef`; return `clearTimeout` from useEffect.

4. **renderers.tsx:268 — ListenMcRenderer same chained audio pattern**
   Identical to #3.

5. **LessonScene.ts:337 — narration fallback timer discarded**
   `window.setTimeout(advance, fallbackMs)` id never stored; `cleanupOverlay()` can't cancel it. Fix: `private narrationFallbackTimer?: number; ... this.narrationFallbackTimer = window.setTimeout(advance, fallbackMs);` and clear in `cancelAdvanceTimer()`.
