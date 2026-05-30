# iOS Safari Audio Autoplay — Investigation Reference

User's iPhone 15 / iOS 18 / Safari can't auto-play despite 11 attempts. Hardware NOT muted (silent loop confirmed in Safari URL bar; manual tap plays).

## Approaches tried (B.68 → B.79)

| # | Approach | Result | Reason failed |
|---|---|---|---|
| B.68 | HTML5 Audio + setTimeout(speak, 280) | ❌ NotAllowedError | setTimeout breaks gesture token |
| B.68 | Persistent Audio element + silent.mp3 prime in .then() | ❌ | isAudioUnlocked flag set in Promise that often never resolves on iOS |
| B.69 | Aggressive cache-bust meta tags | partial | Cache fixed, audio still failed |
| B.70 | Reuse persistent audio across speak() calls | ❌ | iOS revoked gesture-token on src change |
| B.71 | Real silent.mp3 file via ffmpeg + audio.load() before play | ❌ | Same gesture-token issue |
| B.72 | DON'T reset src='' post-unlock + objectPosition avatar crop | ❌ audio | Avatar fix OK, audio still broken |
| B.73 | Web Audio API + AudioBuffer cache + AudioContext.resume() | ❌ | Two AudioContext instances (temp + shared) — temp died, shared never gesture-resumed |
| B.74 | Single shared AudioContext singleton | ❌ | Buffers not preloaded by Q1 mount |
| B.75 | silentLoopAudio for ringer-channel bypass | ✅ ringer works | But Web Audio still didn't reach playBuffer |
| B.76 | Sync warm-up fetch+decode all Ch1 audio in Next CTA gesture | ❌ | Loading hung indefinitely (Promise.allSettled never resolved) |
| B.77 | Howler.js production lib (dynamic import) | ❌ | Dynamic import races past first gesture; autoUnlock listener installed too late |
| B.78 | 1.2s timeout race for warm-up + hero shrink | ⚠ Loading unstuck | Audio still failing |
| B.79 | Kill Howler + sync-set isAudioUnlocked + Web Audio primary | ❌ | Still no auto-play per user report |

## Root cause hypotheses still in play

1. **Multi-context split**: Despite B.74 singleton fix, maybe Pickup has yet another AudioContext somewhere (Phaser's audio? AudioManager.ts singleton?). Need to audit ALL AudioContext.constructor calls.

2. **Bundle race**: Web Audio AudioBufferSourceNode requires AudioContext.state === 'running' at .start() time. If context auto-suspends 5sec after gesture (iOS 18.5 issue), and user takes 7sec to get to Q1, the context is suspended again. Need to resume() inside Q1's autoSpeak call too.

3. **TypeScript / Vite bundling**: Maybe the singleton isn't truly singleton due to Vite ESM module duplication on dynamic imports. Static import only fixes part of it.

## Remaining options to try

### Option 1: Manual gesture per question (canonical iOS-safe)
- Show pulsing 🔊 + "Tap to listen" overlay on Q1 mount
- User taps → speak() in gesture → audio plays
- For Q2-Q8: similar; small but visible affordance per question
- **UX cost**: forces user tap per question (loses auto-play flow)
- **iOS reliability**: 100%

### Option 2: Service Worker + pre-cache
- Use Workbox to pre-cache all chapter audio
- Eliminates fetch latency from cache miss + private browsing limitations
- Web Audio with cache hit may work better

### Option 3: Switch to Web Speech API entirely
- Drop pre-recorded MP3 system
- Use SpeechSynthesisUtterance (browser TTS)
- Less control over voice quality (robotic) but auto-play works
- **Cost**: lose Mochi/Grandma voice distinction

### Option 4: External lib battle-tested
- `howler.js` (tried in B.77, but static import) — retry with static import
- `tone.js` (audio-game focused, more aggressive iOS handling)
- `audiomotion-analyzer` (Web Audio wrapper that handles iOS gracefully)

### Option 5: Per-question audio prefetch in gesture chain
- In CHECK click handler (gesture), peek next question's audio URL
- Start fetch + decode + AudioBufferSourceNode.start(currentTime + 2.4)
- Scheduled play preserves gesture token
- Q2 audio plays exactly when Q1 dwell ends + Q2 mounts

### Option 6: Server-side rendered audio in HTML
- Embed audio as data: URIs in HTML
- iOS may be more lenient on data: URI playback
- Bundle size impact: 150 audio × 50KB = 7.5MB (too big)

### Option 7: Detect failure + graceful manual fallback
- Try Web Audio first
- If fails after 500ms, swap to manual-tap-required UI on the fly
- Hybrid approach — auto for Android/Desktop, manual for iOS

## Recommendation order

1. **First try**: Option 1 (manual tap UI) — pragmatic, 100% works
2. **If user insists auto**: Option 5 (scheduled Web Audio) — most technical-elegant
3. **If still failing**: Option 4 (battle-tested external lib retry)

## Diagnostic commands for next session

```bash
# Audit all AudioContext creations across codebase
grep -rn "new AudioContext\|new (.*AudioContext)\|webkitAudioContext" src/

# Check Phaser internal audio config (maybe Pickup uses Phaser sounds elsewhere)
grep -rn "this.sound\|Phaser.Sound" src/

# Verify silent.mp3 actually serving
curl -I https://pickupwords.pages.dev/silent.mp3

# Check Service Worker presence (Pickup currently has none)
grep -rn "serviceWorker\|workbox" src/ index.html
```
