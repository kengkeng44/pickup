# Code Health — 2026-06-04 00:40 UTC

Today's angle: **iOS Safari WebAudio race**
Focus layer: AudioContext unlock chain · gesture token lifetime · Web Audio routing graph · WebSpeech `onend` reliability · ringer-channel bypass · audioBufferCache memory

---

## A. Recent commits
```
4e1d29b v2.0.B.cron-walk: ⚠️ P0 2026-06-04-0020 persona: deuteranopia Wei 4G network
1510ac9 v2.0.B.cron-ui: 2026-06-04-0008 angle: Speak AI tutor mic UX
6b54e36 ⚠️ v2.0.B.cron-content: 2026-06-04-0005 angle: A6-option-in-question
48740db v2.0.B.cron-ui: 2026-06-03-2108 angle: Babbel SRS visual representation
74ee5ae v2.0.B.cron-code: 2026-06-03-1838 angle: Error boundary coverage
```

---

## B. Signal (iOS WebAudio angle)

| Metric | Count | Location |
|--------|-------|----------|
| `AudioContext` creation sites | 1 (singleton) | `AudioManager.ts:82` |
| `ctx.destination` direct connects | 2 | `tts.ts:211, 459` |
| `void ctx.resume()` without await | 2 | `tts.ts:204, 455` |
| `speechEndCallback` set without cleanup guard | 5 renderers | `renderers.tsx:163,198,266,328,394` |
| `speakWebSpeech` has `onerror` but no timeout fallback | 1 | `tts.ts:244-248` |
| Sequential `await fetch()` in lookup init | 8 round trips | `tts.ts:54` |
| Unbounded `audioBufferCache` (244 MP3s on disk) | 1 | `tts.ts:157` |
| `silentLoopAudio.loop = true`, never paused | 1 | `tts.ts:444` |
| Raw `window.speechSynthesis.speak()` outside `tts.ts` | 3 callsites | `LessonView.tsx:20,37,118` |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | Fix | Effort |
|-----|-----------|-------|------|-----|--------|
| **P0** | `tts.ts:211` | `playBuffer` connects `src` directly to `ctx.destination`, skips `masterGain` | TTS ignores app-level mute toggle (`audioMgr.setAudioMuted(true)`). StoryModeScene mute button silences BGM+SFX but voice keeps playing. | `src.connect(audioMgr.getSfxDestination() ?? ctx.destination)` (use sfxGain channel; or add dedicated speechGain → masterGain) | 15 min |
| **P0** | `tts.ts:204` | `void ctx.resume()` not awaited → `src.start(0)` fires immediately while context still suspended | On iOS after page background/foreground, context re-suspends. `start()` throws `InvalidStateError` (caught), audio silently fails, NarrationRenderer stuck waiting for `onEnd` that never fires. Advance only happens via 7-13s fallback timer. | Make `playBuffer` async; `await ctx.resume()` before `src.start(0)`. Alternatively queue `start()` via `ctx.resume().then(() => src.start(0))` | 20 min |
| **P0** | `renderers.tsx:166` | `NarrationRenderer` cleanup returns only `clearTimeout(timer)`, not `stopSpeaking()` | After lesson advance/nav-away: `speechEndCallback` remains set in module scope. Audio ends → `fireSpeechEnd()` → `dwellAdvance()` → 2s setTimeout → `onAdvance()` fires against stale parent closure. Risk: double-advance, state corruption, or onAdvance against unmounted component | `return () => { stopSpeaking(); window.clearTimeout(timer); }` in NarrationRenderer effect. Same pattern needed in `ListenTfRenderer` effect (line 210), `ListenMcRenderer` effect (line 280). | 10 min |
| **P1** | `tts.ts:443-448` | `silentLoopAudio` plays forever after first gesture; `visibilitychange` only suspends `ctx`, not HTML5 Audio | iOS keeps app in "active audio" state while `silentLoopAudio` loops. Prevents screen dimming, holds media session, drains battery. On backgrounded pages, iOS may kill the element; on return, ringer-channel bypass is lost silently. | Stop `silentLoopAudio` after 5 seconds (enough to prime media channel); or pause it in `AudioManager`'s `visibilitychange` handler alongside `ctx.suspend()` | 15 min |
| **P1** | `tts.ts:52-65` | `loadAudioLookup` fetches ch1-ch8.json sequentially with 8 `await fetch()` in a `for...of` loop | On mobile 4G (50ms RTT), minimum 400ms serial latency before lookup is populated. Any `speak()` call during this window misses lookup → falls to slower WebSpeech. Compounds with cold-cache first load. | `await Promise.all(chapters.map(async ch => { try { const r = await fetch(...); ... } catch {} }))` | 10 min |
| **P1** | `tts.ts:244-248` | `speakWebSpeech` has `onerror` callback but no timeout fallback for silent iOS `onend` non-fires | iOS Safari Web Speech `onend` event documented unreliable; sometimes never fires. If it silently fails: `fireSpeechEnd()` never runs, `NarrationRenderer` dwellAdvance never fires, only the 7-13s fallback timer advances the lesson. Impacts all iOS users on Ch2-8 (no MP3 → pure WebSpeech) | Add word-count-based backup timer: `const backup = setTimeout(() => fireSpeechEnd(), text.split(/\s+/).length * 500 + 2000); u.onend = () => { clearTimeout(backup); fireSpeechEnd(); };` | 15 min |
| **P2** | `tts.ts:157` | `audioBufferCache = new Map<string, AudioBuffer>()` never evicted | 244 MP3 files on disk; if player warms up full chapter, `AudioBuffer` decoded PCM = sampleRate × channels × duration × 4B ≈ 2-8MB per file × 200 = up to 150-200MB RAM. On iPhone 8 (2GB), competes with DOM + React. | Cap at 80 entries: evict oldest when over limit (simple insertion-order via `keys().next()`) | 20 min |
| **P2** | `views/LessonView.tsx:20` | Raw `window.speechSynthesis.speak()` in `useEffect` — bypasses `tts.ts` unlock chain and `speechEndCallback` registry | On iOS, this `useEffect`-triggered speak fires outside gesture → silent fail. Also: no `onend` registered → no `fireSpeechEnd` → narration auto-advance not wired. This file is prototype/sandbox code but is still importable. | Replace 3 callsites with `speak(text, 'en-US')` from `tts.ts`, or delete if it's dead route code (confirm via router) | 10 min |
| **P2** | `tts.ts:459` | `unlockAudio` silent 1-sample buffer also routes to `ctx.destination` | Minor architectural inconsistency; 1-sample buffer is silent so no audible effect. | `src.connect(audioMgr.getSfxDestination() ?? ctx.destination)` | 2 min |

---

## D. Bundle / Build health

```
dist/assets/react-9SDNQsEM.js     139.84 kB │ gzip: 45.34 kB
dist/assets/zod-Cohpjn9R.js        56.50 kB │ gzip: 12.93 kB
dist/assets/index-CNIPX8S7.js      47.57 kB │ gzip: 15.32 kB
dist/assets/LessonPage-Da8suCV4.js  23.25 kB │ gzip:  6.69 kB
dist/assets/react-router-BM6lXbF0.js 19.90 kB │ gzip: 7.51 kB
Total JS gzip: ~88 KB   ✅ within budget
Build: ✓ 352ms, 23 tests pass
Audio on CDN: 24 MB total (17 MB lessons MP3s, 244 files)
```

No new build warnings. Bundle stable vs last audit.

---

## E. Top 5 P0

### ⚠️ P0-1 — TTS bypasses mute (`tts.ts:211`)
`src.connect(ctx.destination)` instead of going through `masterGain`. App mute toggle silences BGM + SFX but voice still plays. Affects any user who mutes via the Phaser-era mute button or programmatic `setAudioMuted(true)`.

**Fix:** `src.connect(audioMgr.getSfxDestination() ?? ctx.destination)`

### ⚠️ P0-2 — `ctx.resume()` unawaitd race → silent fail after backgrounding (`tts.ts:204`)
`void ctx.resume()` fires async. `src.start(0)` runs immediately. If context still suspended on iOS, start() throws → falls to WebSpeech → if WebSpeech also fails silently, `NarrationRenderer` waits 7-13s for fallback timer.

**Fix:** `if (ctx.state === 'suspended') { try { await ctx.resume(); } catch {} }` before `src.start(0)`. Requires making `playBuffer` async and callers handle the promise.

### ⚠️ P0-3 — Stale `speechEndCallback` fires after component unmount (`renderers.tsx:166`)
`NarrationRenderer` cleanup doesn't call `stopSpeaking()`. Stale `onEnd` callback fires → `dwellAdvance` → `onAdvance` on unmounted parent. Risk: double-advance or LessonPage state mutation after navigation.

**Fix:** `return () => { stopSpeaking(); window.clearTimeout(timer); }` — same pattern for `ListenTfRenderer`/`ListenMcRenderer` first useEffect.

### P1-4 — `silentLoopAudio` eternal loop drains iOS battery (`tts.ts:444`)
Silent-loop HTML5 Audio never paused. Holds iOS media session indefinitely. Should be stopped after 5s or paused in `visibilitychange`.

### P1-5 — Sequential 8× `await fetch()` for audio lookup (`tts.ts:52-65`)
8 serial round trips at init = 400ms+ on 4G. First `speak()` calls during this window miss lookup → WebSpeech fallback. `Promise.all()` reduces to 1 RTT.
