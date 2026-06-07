# Code Health — 2026-06-07 12:36 UTC

Today's angle: **Memory leak (event listener / RAF)**
Focus layer: Unremoved `window`/`document` addEventListener · unbounded AudioBuffer cache · stale TTS `onEnd` closures · untracked `setTimeout` in `useEffect` completion paths · RAF / setInterval lifecycle

---

## A. Recent commits

```
3fc9350 v2.0.B.cron-walk: ⚠️ P0 2026-06-07-1218 佳蓉 34yo Android Chrome
36d3ba7 v2.0.B.cron-arch: 2026-06-07 SOLID compliance
47df809 v2.0.B.249: 🐛 fix tap-pairs '本題型沒有 pairsEn data' — 27 章全炸
16d73db v2.0.B.248: 🚀 CI deploy 加 accountId
d963e29 v2.0.B.cron-code: 2026-06-07-0638 Bundle analyzer (chunk split)
b82641e ⚠️ v2.0.B.cron-code: 2026-06-07-0035 Error boundary coverage
```

Build: ✅ clean — 382 tests pass, 0 TS errors, gzip total ~92 KB (main chunks).

---

## B. Signal (counts per angle)

| Category | Count | Notes |
|---|---|---|
| `window.addEventListener` | 14 | 3 in tts.ts module scope — never removed |
| `document.addEventListener` | 4 | 1 anonymous in AudioManager ctor — can't remove |
| `removeEventListener` callsites | 10 | Several are proper paired cleanups |
| `setTimeout` without tracked ID | 8 | escape paths in renderer completion branches |
| `setInterval` | 1 | EndScene — properly cleared in SHUTDOWN |
| `requestAnimationFrame` loop | 1 | Confetti — properly cancelled via `rafId` |
| Zustand `.subscribe()` | 1 | ClozeUI — properly unsubbed in `destroy()` |
| `audioBufferCache` | unbounded Map | No eviction policy, grows across chapters |
| useEffect hooks in renderers.tsx | 23 | 8 have cleanup return, 15 do not |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|---|---|---|---|---|---|
| **P0** | `src/react-app/renderers.tsx:175` | `NarrationRenderer` useEffect cleanup calls `clearTimeout(timer)` but does NOT call `stopSpeaking()` — leaves `speechEndCallback = dwellAdvance` alive in tts.ts module. When TTS ends after component unmounts (user taps X mid-narration), `dwellAdvance()` fires → schedules a brand-new untracked `setTimeout(advanceOnce, 2000)` → that timer fires `onAdvance()` against stale/already-destroyed LessonScene state | Scene advance called on dead scene; `this.hud` / `this.advance()` throws or silently double-advances next question | Add `return () => { window.clearTimeout(timer); stopSpeaking(); }` in NarrationRenderer effect cleanup | 10 min |
| **P0** | `src/audio/tts.ts:168` | `audioBufferCache: Map<string, AudioBuffer>` has zero eviction. `warmUp()` preloads 32 buffers per chapter on each lesson start. Over an 8-chapter session with ~200 MP3s, all decoded AudioBuffers remain in RAM forever. Each 2-3s clip at 16kHz mono ≈ 64-96 KB RAM; 200 clips ≈ 13-20 MB audio RAM. On iOS 16 total app memory budget is ~300 MB — audio cache alone is a meaningful fraction | App crash / Safari tab killed on low-memory iPhones mid-session (8-12 yr old users often share devices with other apps open) | Cap at e.g. 80 entries with LRU eviction (track `lastUsed` timestamp; on `set` if size > 80, delete oldest entry) | 1 hr |
| **P0** | `src/audio/tts.ts:534-537` | Module-level unlock listeners registered WITHOUT `{ once: true }`. `unlockOnce = () => unlockAudio()` is an anonymous wrapper — reference is lost, so `removeEventListener` is impossible. All three (`touchstart`, `click`, `pointerdown`) fire on every user interaction forever. After `isAudioUnlocked = true` the handlers return immediately but still traverse capture-phase event chain on every tap | Minor CPU waste on every tap; main risk is if `tts.ts` module is somehow re-evaluated (unlikely in Vite but possible in test harness) — 3 duplicate persistent listeners accumulate | Change to `{ once: true }` on all three to auto-remove after first fire. Store ref if `once` not safe: `window.addEventListener('click', unlockOnce, { capture: true, once: true })` | 5 min |
| **P1** | `src/react-app/renderers.tsx:362` | `TypeWhatYouHearRenderer.submit()` is a click handler (not useEffect) but calls `window.setTimeout(() => onAdvance(en), correct ? 3000 : 6000)`. Timer ID is not stored. If the LessonPage unmounts during the 3-6s window (user taps X to abort lesson), the timer fires `onAdvance` on an unmounted component tree | `setState` on unmounted React component; `onAdvance` in LessonPage context may call `this.advance()` on a destroyed scene | Capture timer in a `useRef`, clear it in a `useEffect` cleanup. Or: check a `mounted` ref in the callback before calling `onAdvance` | 30 min |
| **P1** | `src/react-app/renderers.tsx:451,1058,1227` | `TapTilesRenderer`, `MultiBlankFillRenderer`, `MultiBlankTilesRenderer` — all have a "completion detect" `useEffect` that fires `window.setTimeout(() => onAdvance(...), 2800)` with no cleanup return. Same stale-timer risk as P1 above — if question is reset (q.id change) during the 2.8s celebration window, the old timer fires `onAdvance` on the new question's context | Double-advance: lesson skips one question | Same fix as P1 above: capture timer ID in ref, clear in effect cleanup OR use `setRevealed`/guard in callback | 30 min |
| **P1** | `src/scenes/LessonScene.ts:345` | `_renderNarration()` fires `window.setTimeout(advance, fallbackMs)` — a raw browser timer, NOT `this.time.delayedCall()`. Therefore `this.cancelAdvanceTimer()` (which calls `this.advanceTimer.remove(false)`) cannot cancel it. If the narration question is skipped via the skip button or `cleanupOverlay()` before the fallbackMs elapses, `advance()` fires on a cleaned-up scene | `advance()` calls `this.renderQuestion()` which accesses `this.hud` (already `undefined` after cleanup) → silent no-op or exception | Track the raw timeout ID on `this` and cancel in `cleanupOverlay()`: `this.narrationFallbackTimer = window.setTimeout(advance, fallbackMs)` + `clearTimeout(this.narrationFallbackTimer)` in cleanup | 20 min |
| **P2** | `src/audio/AudioManager.ts:51` | `visibilitychange` listener registered with anonymous function in singleton constructor — cannot be removed. Acceptable since AudioManager is a true singleton (never re-constructed), but if tests or SSR create multiple instances (Jest jsdom, server components), listeners accumulate per instance | N/A in production; test environment leak if AudioManager._instance is reset | Store the listener function as a private field; expose a `dispose()` method | 30 min |
| **P2** | `src/ui/domUtil.ts:47-57` | `attachPressFeedback(el, opts)` adds 4 pointer listeners to `el` without providing a removal mechanism. Called from 7 callsites (SpeakerButton, StoryMapView, etc.). DOM nodes are GC'd when removed from tree, which releases the listeners — so this is safe as long as callers call `el.remove()`. Confirmed: all 7 callsites are inside components that call `destroy()` / `root.remove()`. | None at present — just fragile convention | Document the "call el.remove() to release" invariant in a JSDoc comment on `attachPressFeedback` | 10 min |
| **P2** | `src/audio/tts.ts:291` | `activeBufferSource` shadow variable declared at line 291, never assigned (all play paths use `currentSource` at line 169). Dead write — vestigial from a refactor. Not a leak per se but confusing: a maintainer adding cleanup code might clear `activeBufferSource` believing it stops playback | False sense of safety; `currentSource` is the real handle | Delete `activeBufferSource` declaration and any references | 5 min |

---

## D. Bundle / build health

```
dist/assets/index-BOzdjNS_.js    164.21 kB │ gzip: 48.46 kB
dist/assets/LessonPage-BHt_vsLk  62.76 kB  │ gzip: 16.93 kB
dist/assets/zod-Cohpjn9R.js      56.50 kB  │ gzip: 12.93 kB
dist/assets/react-CvBZlOBd.js   139.88 kB  │ gzip: 45.36 kB
Total gz (JS):  ~92 kB (main shell) + 17 kB lazy LessonPage
```

No regressions from previous bundle audit (2026-06-07T0638).

---

## E. Top 5 P0

1. **⚠️ `NarrationRenderer` effect cleanup missing `stopSpeaking()`** — `dwellAdvance` timer escapes, calls `onAdvance` on stale scene (`renderers.tsx:175-179`)
2. **⚠️ `audioBufferCache` unbounded** — zero eviction, 200+ AudioBuffers accumulate across 8-chapter session, risks iOS low-memory kill (`tts.ts:168`)
3. **⚠️ `tts.ts` unlock listeners not `{ once: true }`** — fire capture-phase on every user tap for app lifetime; impossible to remove (`tts.ts:534-537`)
4. **P1 `LessonScene._renderNarration()` raw `setTimeout` bypasses `cancelAdvanceTimer()`** — fires `advance()` on cleaned-up scene after skip/exit (`LessonScene.ts:345`)
5. **P1 Completion-branch timers untracked in `TapTiles` / `MultiBlankFill` / `MultiBlankTiles`** — double-advance risk when q.id changes during 2.8s celebration window (`renderers.tsx:451,1058,1227`)
