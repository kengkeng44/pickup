# Code Health — 2026-06-07 18:35 UTC

Today's angle: **WebAudio decodeAudioData main thread block**
Focus layer: audio pipeline — tts.ts / bgm.ts / AudioManager.ts — buffering, gain chain wiring, cache eviction, concurrent decode load

---

## A. Recent commits

```
06d48a5 v2.0.B.258: round 1 mid-long ship — Ch27-29
8c98423 v2.0.B.cron-ui: 2026-06-07-1807 angle: Brilliant interactive demo
2ac39ae ⚠️ v2.0.B.cron-content: 2026-06-07-1807 angle: A1-obvious-correct
dccf0cb docs(cockpit): cockpit.html master matrix sync
1843baa docs: CLAUDE.md sync B.161 → B.257
3c73946 v2.0.B.257: cockpit 全域 1-tap copy + ✓ feedback 統一
12251c6 v2.0.B.256: CI cockpit deploy branch main → master
```

Build: ✅ 38 test files / 382 tests PASS  
Bundle: index.js 164.71 KB / 48.61 KB gz — within budget

---

## B. Signal (counts per angle)

| Signal | Count |
|--------|-------|
| `decodeAudioData` calls | 2 (bgm.ts:39, tts.ts:192) |
| `audioBufferCache` entries at full Ch1 warmup | 245 MP3s → ~62 MB PCM |
| `ctx.destination` direct connects (bypasses masterGain) | 2 (tts.ts:232, tts.ts:512) |
| Unlock listeners without `{ once: true }` | 3 (tts.ts:549-551) |
| `Promise.allSettled` concurrent decode floods | 2 (tts.ts:442, tts.ts:469) |
| Dead variable never assigned | 1 (`activeBufferSource` tts.ts:295) |
| BGM decoded AudioBuffer estimated size | ~81 MB PCM from 7.36 MB MP3 |

---

## C. Hot path bug risk table

| Pri | File:line | Issue | Risk | 修法 | Effort |
|-----|-----------|-------|------|------|--------|
| **P0** | tts.ts:232 | `playBuffer` connects `src` directly to `ctx.destination`, bypassing `masterGain` chain. BGM + SFX route through masterGain→0 on mute, but TTS MP3 playback routes around it. `AudioManager.setAudioMuted(true)` silences BGM/SFX but grandma voice keeps playing | 父母靜音後奶奶繼續說話 — 哄睡場景的 P0 對立面 | Change `src.connect(ctx.destination)` → `src.connect(audioMgr.getSfxDestination() ?? ctx.destination)` in `playBuffer()` | S (5 min) |
| **P0** | tts.ts:172 | `audioBufferCache` is unbounded `Map<string, AudioBuffer>` — 245 MP3 files × avg ~258 KB PCM = **62 MB** latent. Future Ch2-8 adds 7× more. No LRU eviction. Sessions that replay multiple chapters accumulate all decoded buffers forever | iOS Safari OOM tab-kill after multi-chapter session; iPhone SE / 2 GB RAM devices most at risk | Add LRU cap (e.g. 80 entries). Evict oldest on insert when `audioBufferCache.size > LRU_LIMIT`. CLAUDE.md Decision Board already lists "audioBufferCache LRU 80 entries (M 1hr)" as #3 | M (1 hr) |
| **P0** | tts.ts:548–551 | Three `window.addEventListener` calls in module body — `touchstart`, `click`, `pointerdown` — attach `unlockOnce` without `{ once: true }`. The `isAudioUnlocked` flag prevents double-execution of `unlockAudio()` body, but the three listeners remain active for the entire page lifetime. Every tap/click dispatches through all three handlers. CLAUDE.md B.257 Decision Board lists this as **#1 recommendation (S 5min)** | CPU waste on every user interaction; listener leak contradicts "unlock once" semantics | Add `{ once: true }` to all three `addEventListener` calls. Guard inside `unlockAudio` stays as defense-in-depth | S (5 min) |
| **P1** | tts.ts:192 | `ctx.decodeAudioData(ab.slice(0), resolve, reject)` — the `.slice(0)` copies the entire ArrayBuffer before passing to callback-style `decodeAudioData`. `ab` is a local variable that's never used after the call. During `warmUpChapterAudio` which fires 245 concurrent decodes, peak temporary memory from copies = 245 × 68 KB = **~33 MB extra** | iOS: 33 MB spike on top of normal decode buffers; on 1-2 GB RAM devices causes memory pressure during chapter-start transition | Remove `.slice(0)`: use `ctx.decodeAudioData(ab, resolve, reject)`. Callback API already transfers ownership (neuterizes `ab`), so the copy is gratuitous | S (5 min) |
| **P1** | tts.ts:469 | `warmUpChapterAudio` calls `Promise.allSettled(Array.from(urls).map(u => loadBuffer(u)))` — fires all 245 MP3 fetch+decode operations simultaneously. HTTP/2 multiplexes but the audio decode queue receives 245 tasks at once. Called from CTA click handler in `ChapterIntroScene:386`, competing with transition animation for render resources | Jank / stutter on chapter-start transition, especially on mid-range Android (Redmi / Galaxy A). 245 concurrent decodes saturate audio worker thread | Batch in chunks of 10-20 using a `pLimit`-style queue: `for (const batch of chunks(urls, 16)) await Promise.allSettled(batch.map(loadBuffer))` | M (30 min) |
| **P2** | tts.ts:295 | `let activeBufferSource: AudioBufferSourceNode \| null = null` — declared, referenced in `stopSpeaking()` (lines 370-373), but **never assigned**. Only `currentSource` (line 173) tracks the live Web Audio source. `stopSpeaking()` has a dead branch that will never fire | Logic confusion — future dev adding a code path might assign `activeBufferSource` expecting it to stop; it won't because `stopSpeaking()` is the intended cleanup point, creating a silent double-track bug | Remove the declaration and its `stopSpeaking()` guard block. Use only `currentSource` | S (5 min) |
| **P2** | bgm.ts:39 | `ctx.decodeAudioData(arrayBuf)` on 7.36 MB peace.mp3. Decoded PCM ≈ 3:50 × 44100 Hz × 2 ch × 4 bytes = **~81 MB AudioBuffer** stored permanently in `cachedBuffer`. On first boot, this single allocation represents the largest single Web Audio object in the app | Low-RAM devices (iPhone 8, Android 2 GB): 81 MB BGM buffer + 62 MB TTS cache = 143 MB Web Audio memory before JS heap. No crash evidence yet, but headroom is thin | Acceptable for now; document the 81 MB footprint. Mitigated by bgm's `cachedBuffer` being a single item (unlike TTS's 245). Long-term: consider OGG Vorbis BGM (smaller compressed, faster decode) | L (deferred) |
| **P2** | tts.ts:512 | `unlockAudio()` inner silent-buffer src also does `src.connect(ctx.destination)` direct — bypasses masterGain. Silent 1-sample buffer is harmless (0 amplitude), but sets a precedent for the `playBuffer` fix above | No audible impact (0-sample buffer inaudible), but code pattern inconsistency | Change to `src.connect(audioMgr.masterGain ?? ctx.destination)` for consistency after P0 fix | S (2 min) |

---

## D. Bundle / build health

```
dist/assets/index-BEHVjttd.js    164.71 kB │ gzip: 48.61 kB  ← main bundle
dist/assets/LessonPage-DtNrR36m.js 63.85 kB │ gzip: 17.20 kB
dist/assets/react-CvBZlOBd.js   139.88 kB │ gzip: 45.36 kB
dist/assets/zod-Cohpjn9R.js      56.50 kB │ gzip: 12.93 kB
Total gz: ~130 kB (target <400 KB) ✅
```

⚠️ Audio pipeline NOT in bundle (public/audio/) — 16 MB MP3 + 7.36 MB BGM CDN-served. Runtime Web Audio memory is the concern, not bundle size.

---

## E. Top 5 P0

### ⭐ #1 — tts.ts:548–551 — Unlock listeners missing `{ once: true }` (S 5 min)

```ts
// Current (tts.ts:548-551)
const unlockOnce = () => unlockAudio();
window.addEventListener('touchstart', unlockOnce, { capture: true, passive: true });
window.addEventListener('click', unlockOnce, { capture: true });
window.addEventListener('pointerdown', unlockOnce, { capture: true });

// Fix:
window.addEventListener('touchstart', unlockOnce, { capture: true, passive: true, once: true });
window.addEventListener('click', unlockOnce, { capture: true, once: true });
window.addEventListener('pointerdown', unlockOnce, { capture: true, once: true });
```

Already in CLAUDE.md Decision Board as #1. 3-line change. No side effects.

---

### #2 — tts.ts:232 — `playBuffer` bypasses `masterGain` (S 5 min)

```ts
// Current (tts.ts:227-232)
src.connect(ctx.destination);          // ← bypasses masterGain

// Fix: route through sfxGain (already wired to masterGain)
const sfxDest = audioMgr.getSfxDestination();
src.connect(sfxDest ?? ctx.destination);
```

Diagram: `src → sfxGain(0.5) → masterGain(0 when muted) → ctx.destination`  
Muting AudioManager now silences TTS MP3 just like BGM. The `isMuted()` gate in `speak()` is now defense-in-depth rather than sole gate.

---

### #3 — tts.ts:172 — Unbounded `audioBufferCache` (M 1 hr)

Already in CLAUDE.md Decision Board as #3. LRU cap at 80 entries:

```ts
// Add above audioBufferCache declaration:
const CACHE_MAX = 80;

// In loadBuffer, after audioBufferCache.set(url, buf):
if (audioBufferCache.size > CACHE_MAX) {
  const firstKey = audioBufferCache.keys().next().value;
  if (firstKey) audioBufferCache.delete(firstKey); // Map preserves insertion order
}
```

Map insertion-order eviction is a simple O(1) LRU approximation without a full LRU library.

---

### #4 — tts.ts:192 — Remove wasteful `ab.slice(0)` (S 5 min)

```ts
// Current:
const buf = await new Promise<AudioBuffer>((resolve, reject) => {
  ctx.decodeAudioData(ab.slice(0), resolve, reject);    // ← copies 68 KB
});

// Fix: drop the slice — ab is local, not reused, ownership transfer is fine:
const buf = await new Promise<AudioBuffer>((resolve, reject) => {
  ctx.decodeAudioData(ab, resolve, reject);
});
```

Saves ~33 MB peak memory spike during warmUpChapterAudio.

---

### #5 — tts.ts:295 — Remove dead `activeBufferSource` variable (S 5 min)

```ts
// Lines 295, 370-373 — remove entirely:
let activeBufferSource: AudioBufferSourceNode | null = null;  // never set
// in stopSpeaking():
if (activeBufferSource) {           // always false
  try { activeBufferSource.stop(); } catch {}
  activeBufferSource = null;
}
```

Removes dead branch, prevents future confusion about which variable tracks the live source.

---

## Severity summary

| Level | Count |
|-------|-------|
| P0 | 3 |
| P1 | 2 |
| P2 | 3 |

**Recommended ship order:**  
#1 + #4 + #5 (3× S 5min) → batch commit now  
#2 (S 5min, verify mute behavior) → follow-up commit  
#3 (M 1hr, LRU cache) → aligns with CLAUDE.md Decision Board #3
