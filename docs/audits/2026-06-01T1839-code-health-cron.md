# Code Health — 2026-06-01 18:39 UTC

Today's angle: **Memory leak (event listener / RAF)**
Focus layer: React lifecycle teardown, DOM event cleanup, setTimeout/fetch abort

---

## A. Recent commits
```
90e8dbc v2.0.B.cron-content: 2026-06-01-1808 angle: explanationZh-story-voice
f8860a9 v2.0.B.cron-ui: 2026-06-01-1803 angle: Drops 5-min session pacing
7cee4c8 v2.0.B.173.1: POV slip fix kt-ch4-l25-q10 (audit WARN)
3a7811a v2.0.B.173: Ch3+Ch4 51 sentence-is-question fix (cron content P0-1)
9a0ba0c v2.0.B.cron-content: QA 2026-06-01-1638
08b9eba v2.0.B.cron-walk: ⚠️ P0 A2 walkthrough 2026-06-01-1633
226bed2 chore: sync package-lock.json after npm install (arch cron)
c8ae90f ⚠️ P0 arch cron 2026-06-01T1633
36a0bcb v2.0.B.cron-code: code health 2026-06-01-1632
24848b5 v2.0.B.cron: ⚠️ P0 UI/UX audit 2026-06-01-1631
```

---

## B. Signal (Memory Leak angle)

| Metric | Count | Notes |
|--------|-------|-------|
| `addEventListener` (TS files) | 99 total | across 22 files |
| `removeEventListener` (TS files) | 3 total | only WordHint + Mascot |
| Files with 0 removes vs ≥1 adds | 20/22 | most rely on DOM node removal for GC |
| `requestAnimationFrame` calls | 9 | 1 in Confetti with cancel, 8 one-shot (safe) |
| `cancelAnimationFrame` calls | 1 | Confetti loop only |
| `setInterval` without `clearInterval` | 0 | EndScene clears its interval correctly |
| `setTimeout` in React event handlers (no cancel) | 5 | renderers.tsx lines 269, 332, 399 + 2 more |
| `useEffect` missing deps array | 1 | NarrativeLine (runs every render) |
| `fetch()` without `AbortController` | 3 | LessonPage, MapPage, ChapterIntroPage |
| `window.addEventListener` never removed | 3 | tts.ts unlock handlers persist post-unlock |
| Nested `setTimeout` inside `onEnd` callback | 1 | ListenMC renderer — rogue TTS risk |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | `src/react-app/pages/LessonPage.tsx:34` | `fetch()` sets state after component unmounts — no `AbortController`. Rapid navigation (back button during load) triggers `setState` on dead tree, React 18 warns + closure holds refs alive | Medium — happens on slow network + fast nav | Add `AbortController`; return cleanup that calls `controller.abort()` from `useEffect` | 15 min |
| **P0** | `src/react-app/pages/MapPage.tsx:37` + `ChapterIntroPage.tsx:31` | Same unguarded `fetch` pattern in 2 more pages — same stale-state risk | Medium | Same AbortController pattern per page | 10 min |
| **P1** | `src/audio/tts.ts:495-498` | 3 `window.addEventListener` (touchstart/click/pointerdown) registered at module-load time, never removed. After `unlockAudio()` runs once, `isAudioUnlocked=true` guards the body — but all 3 listeners still fire a noop on every tap/click forever | Low-Med — adds 3 dispatch calls to every user interaction for app lifetime | Inside `unlockOnce`, call `window.removeEventListener` for all 3 before calling `unlockAudio()` | 5 min |
| **P1** | `src/react-app/renderers.tsx:142-149` | ListenMC `speak(en, { onEnd: () => setTimeout(() => speak(qEn), 400) })`. If `q.id` changes before the 400ms fires, stale `speak(qEn)` plays for old question. The `speechEndCallback` singleton gets overwritten but the pending `setTimeout` closure still fires — rogue TTS over new question audio | Medium — audible glitch on fast taps through narration | Capture a `cancelled` flag in the `useEffect` closure; set it in the cleanup return; guard `setTimeout` callback | 10 min |
| **P1** | `src/react-app/renderers.tsx:269,332,399` | `window.setTimeout(() => onAdvance(...), 3000-5000)` in submit/tap handlers with no cancel. If parent replaces the component before timer fires, `onAdvance` calls into potentially stale closure (question index advances twice) | Low-Med — LessonPage `onAdvance` increments `idx` which is safe, but double-advance skips a question | Move timeouts into a `useEffect` that returns cleanup; or store `id = setTimeout(...)` and cancel on `revealed` change | 20 min |
| **P2** | `src/react-app/pages/LessonPage.tsx:109-111` | `NarrativeLine` `useEffect(() => { wireSentenceHints(ref.current); })` — no deps array → runs on **every render**. `wireSentenceHints` is idempotent (dataset guard), so no functional bug, but fires DOM queries on each render as `history[]` grows | Low — pure perf waste | Add `[]` deps (runs once on mount — idempotent guard makes this safe) | 2 min |
| **P2** | `src/ui/StoryMapView.ts:445-448` | `destroy()` only calls `this.root.remove()`. The 16 `addEventListener` calls on node buttons, paw icon, key-sentences overlay are never explicitly removed. GC clears them when DOM nodes are released — safe only if nothing holds a reference to `this.root` after destroy | Low — Phaser scene lifecycle is the only owner; no ref escape confirmed | No immediate action needed; acceptable DOM-removal GC pattern. Document as known non-issue | — |
| **P2** | `src/audio/AudioManager.ts:51` | `document.addEventListener('visibilitychange', lambda)` in constructor. Singleton pattern means this lives forever — acceptable. But the lambda captures `this` (the AudioManager) — prevents GC of AudioManager if the pattern ever changes to non-singleton | Negligible | No action needed while singleton holds. Note: if tests ever create multiple instances this leaks | — |

---

## D. Bundle / build health

| Chunk | Raw | Notes |
|-------|-----|-------|
| react (vendor) | 140 KB | React 18 runtime, expected |
| index (app code) | 60 KB | includes renderers, pages, audio, store |
| zod | 57 KB | large for validation-only; consider tree-shaking audit |
| react-router | 20 KB | expected |
| zustand | 2.3 KB | excellent |
| **Total raw JS** | **279 KB** | well under 400 KB target |
| **Total gzip (est)** | **~90 KB** | read from build output: 90 KB gzip total |

Build: ✅ 34/34 tests pass. No TS errors. 796ms build time.

---

## E. Top 5 P0/P1 — prioritized

1. **⚠️ P0 — Fetch abort missing (3 pages)**: LessonPage + MapPage + ChapterIntroPage all call `fetch()` in `useEffect` without cleanup. Fast navigation triggers `setState` on unmounted components. Add `AbortController` pattern to all 3. Combined effort ~25 min.

2. **⚠️ P0 — Stale-state double-advance risk (TapTiles / TypeWhatYouHear / TapPairs)**: `setTimeout(() => onAdvance(), 3-5s)` lives outside React's cleanup lifecycle. If question changes (shouldn't normally happen) or component unmounts, timer fires into stale closure. Low probability but non-zero. Move into `useEffect` with cleanup. ~20 min.

3. **P1 — TTS unlock listeners persist post-unlock**: 3 window listeners fire forever after audio unlocks. Self-removing `unlockOnce` pattern (remove before calling) eliminates perpetual dispatch overhead. ~5 min.

4. **P1 — ListenMC rogue TTS (nested setTimeout in onEnd)**: 400ms chained speak fires for wrong question on fast taps. Add `cancelled` flag to the `useEffect` closure. ~10 min.

5. **P2 — NarrativeLine missing deps array**: `useEffect` without `[]` runs on every render as lesson history grows. Add `[]` (or `[text]`). 2-min fix, zero risk.
