/**
 * Procedural background music — calm, lo-fi-ish chiptune loop.
 *
 * Architecture:
 *   - A "scheduler" runs every ~50ms via setTimeout, peeking ~250ms ahead.
 *   - It enqueues triangle-wave notes for melody + sine bass on the AudioContext
 *     timeline (scheduled at precise `ctx.currentTime + offset` to stay tight).
 *   - The 8-bar pattern (one bar = 2s) repeats indefinitely until stop() runs.
 *
 * This is deliberately sparse — we never want the music fighting for attention
 * with the word puzzle. Volume is also throttled by AudioManager's bgmGain
 * (default 0.18) and master gain (mute switch).
 */

import { audio } from './AudioManager';

// ─── Musical material ───────────────────────────────────────────────────────
// Key: A minor (relaxed, vocab-puzzle-friendly).
// Tempo: 90 BPM. Bar = 4 beats, beat = 60/90 ≈ 0.667s. Bar = 2.667s. We use
// 16th-note grid (= 0.1667s) for melodic phrasing.

const BEAT = 60 / 90;
const SIXTEENTH = BEAT / 4;
const BAR = BEAT * 4;

// MIDI note → Hz
function hz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Melody: 8-bar (32 beats) loop, each entry = [midi-or-null, sixteenth-duration]
// `null` = rest. Soft, mostly-stepwise motion in A natural minor.
type NotePat = [number | null, number];

const MELODY: NotePat[] = [
  // Bar 1
  [69, 2], [72, 2], [76, 2], [72, 2],
  [74, 2], [72, 2], [69, 4],
  // Bar 2
  [67, 2], [69, 2], [72, 2], [69, 2],
  [67, 2], [65, 2], [64, 4],
  // Bar 3
  [69, 2], [72, 2], [76, 2], [77, 2],
  [76, 2], [72, 2], [69, 4],
  // Bar 4 (rest-heavy for breathing room)
  [67, 4], [null, 4], [69, 4], [null, 4],
];

// Bass: one note per bar, root motion Am → F → C → G → Am → F → Dm → E
const BASS: number[] = [45, 41, 48, 43, 45, 41, 38, 40, 45, 41, 48, 43, 45, 41, 38, 40];

// ─── Scheduling ─────────────────────────────────────────────────────────────

const LOOKAHEAD = 0.25; // seconds — schedule notes up to this far ahead
const POLL_INTERVAL_MS = 60;

interface BgmHandle {
  stop: () => void;
}

export function startBgm(): BgmHandle | undefined {
  audio.ensureContext();
  const ctx = audio.ctx;
  const dest = audio.getBgmDestination();
  if (!ctx || !dest) return undefined;

  let stopped = false;
  let nextNoteTime = ctx.currentTime + 0.1;
  let stepIndex = 0; // index into MELODY
  let barIndex = 0; // for bass

  // Precompute melody durations as seconds.
  const stepDurs = MELODY.map(([, d]) => d * SIXTEENTH);
  const loopDur = stepDurs.reduce((a, b) => a + b, 0);
  const stepStartsInLoop: number[] = [];
  {
    let t = 0;
    for (const d of stepDurs) {
      stepStartsInLoop.push(t);
      t += d;
    }
  }

  const playMelodyNote = (midi: number, when: number, dur: number) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(hz(midi), when);
    const peak = 0.35;
    env.gain.setValueAtTime(0, when);
    env.gain.linearRampToValueAtTime(peak, when + 0.01);
    env.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, peak * 0.4),
      when + Math.min(0.08, dur * 0.5)
    );
    env.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.95);
    osc.connect(env);
    env.connect(dest);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  };

  const playBassNote = (midi: number, when: number, dur: number) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(hz(midi), when);
    const peak = 0.45;
    env.gain.setValueAtTime(0, when);
    env.gain.linearRampToValueAtTime(peak, when + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.98);
    osc.connect(env);
    env.connect(dest);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  };

  // Bass plays one note per bar; we track which bar we're entering whenever
  // the melody index crosses certain boundaries.
  const melodyBarBoundaries: number[] = [];
  {
    let t = 0;
    for (let i = 0; i < MELODY.length; i++) {
      if (i === 0 || Math.floor(t / BAR) !== Math.floor((t - stepDurs[i - 1]) / BAR)) {
        melodyBarBoundaries.push(i);
      }
      t += stepDurs[i];
    }
  }

  const scheduleAhead = () => {
    if (stopped) return;
    if (ctx.state !== 'running') {
      // Will be resumed when page becomes visible / unmute.
      return;
    }
    while (nextNoteTime < ctx.currentTime + LOOKAHEAD) {
      const [midi, ] = MELODY[stepIndex];
      const dur = stepDurs[stepIndex];
      if (midi != null) {
        playMelodyNote(midi, nextNoteTime, dur);
      }
      // Bass: trigger on bar boundaries
      if (melodyBarBoundaries.includes(stepIndex)) {
        const bassNote = BASS[barIndex % BASS.length];
        playBassNote(bassNote, nextNoteTime, BAR * 0.9);
        barIndex++;
      }
      nextNoteTime += dur;
      stepIndex = (stepIndex + 1) % MELODY.length;
      if (stepIndex === 0) {
        // Loop boundary — keep continuous, do NOT add gap.
        // (nextNoteTime already advanced to right time.)
      }
    }
  };

  // Use setInterval so we can clear it cleanly; setTimeout chain would leak
  // if cleared mid-callback.
  const intervalId = window.setInterval(scheduleAhead, POLL_INTERVAL_MS);
  scheduleAhead(); // prime

  const handle: BgmHandle = {
    stop: () => {
      if (stopped) return;
      stopped = true;
      window.clearInterval(intervalId);
      // Already-scheduled notes finish; we don't forcibly kill them because
      // they're short and shaped with envelopes (no clicks).
    },
  };

  // Register so AudioManager.setAudioMuted can stop us.
  audio.registerBgm(() => handle.stop());

  // Silence unused-variable lint on loopDur (kept for debugging clarity).
  void loopDur;

  return handle;
}
