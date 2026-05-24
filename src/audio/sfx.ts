/**
 * Procedural sound effects via Web Audio API.
 *
 * All effects: short (≤ 500ms), oscillator + AD/AR-shaped gain envelope.
 * No assets, no library — every sound is synthesized at runtime.
 *
 * Envelope helper hides the boilerplate of "ramp gain in, hold, ramp out".
 */

import { audio } from './AudioManager';

interface ToneOpts {
  freq: number;
  type?: OscillatorType;
  duration: number; // seconds
  attack?: number; // seconds, default 0.005
  release?: number; // seconds, default duration - attack
  gain?: number; // peak gain (0..1), default 0.6
  detune?: number;
}

function tone(opts: ToneOpts, startAt = 0): void {
  const ctx = audio.ctx;
  const dest = audio.getSfxDestination();
  if (!ctx || !dest) return;
  const now = ctx.currentTime + startAt;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(opts.freq, now);
  if (opts.detune) osc.detune.setValueAtTime(opts.detune, now);

  const attack = opts.attack ?? 0.005;
  const dur = opts.duration;
  const release = opts.release ?? Math.max(0.02, dur - attack);
  const peak = opts.gain ?? 0.6;

  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(peak, now + attack);
  // sustain (decay to ~70%) then release
  env.gain.exponentialRampToValueAtTime(
    Math.max(0.0001, peak * 0.7),
    now + attack + Math.min(0.02, dur * 0.2)
  );
  env.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);

  osc.connect(env);
  env.connect(dest);
  osc.start(now);
  osc.stop(now + attack + release + 0.02);
}

/**
 * Lightweight noise burst (used for thuds/clicks). Filtered white noise via
 * a short buffer source + biquad.
 */
function noiseBurst(opts: {
  duration: number;
  cutoff?: number;
  type?: BiquadFilterType;
  gain?: number;
}): void {
  const ctx = audio.ctx;
  const dest = audio.getSfxDestination();
  if (!ctx || !dest) return;
  const now = ctx.currentTime;
  const dur = opts.duration;
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < sampleCount; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = opts.type ?? 'lowpass';
  filter.frequency.value = opts.cutoff ?? 1200;
  const env = ctx.createGain();
  const peak = opts.gain ?? 0.4;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(peak, now + 0.005);
  env.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  src.connect(filter);
  filter.connect(env);
  env.connect(dest);
  src.start(now);
  src.stop(now + dur + 0.02);
}

// ─── Public SFX library ─────────────────────────────────────────────────────

/** Soft click on card press (~50ms). */
export function sfxCardPress(): void {
  audio.ensureContext();
  tone({ freq: 880, type: 'triangle', duration: 0.05, attack: 0.002, gain: 0.18 });
}

/** Ascending warm arpeggio for correct answer (~320ms). */
export function sfxCorrect(): void {
  audio.ensureContext();
  // C5 → E5 → G5 → C6, triangle wave for chiptune-warm character
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => {
    tone(
      {
        freq: f,
        type: 'triangle',
        duration: 0.18,
        attack: 0.005,
        gain: 0.32,
      },
      i * 0.06
    );
  });
}

/** Gentle descending tone + soft thud for wrong (~280ms). */
export function sfxWrong(): void {
  audio.ensureContext();
  const ctx = audio.ctx;
  if (!ctx) return;
  // Two-note descent A4 → F4
  tone({ freq: 440, type: 'sine', duration: 0.12, gain: 0.28 });
  tone({ freq: 349.23, type: 'sine', duration: 0.18, gain: 0.3 }, 0.1);
  // Soft thud under it
  noiseBurst({ duration: 0.12, cutoff: 280, gain: 0.2 });
}

/** Subtle 'tic' for low-timer warning (~80ms). */
export function sfxTimerTick(): void {
  audio.ensureContext();
  tone({ freq: 1500, type: 'square', duration: 0.04, attack: 0.001, gain: 0.1 });
}

/** Transition swoosh between rounds (~220ms). */
export function sfxRoundTransition(): void {
  audio.ensureContext();
  const ctx = audio.ctx;
  const dest = audio.getSfxDestination();
  if (!ctx || !dest) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = 'sine';
  // Pitch sweep up
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(0.18, now + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  osc.connect(env);
  env.connect(dest);
  osc.start(now);
  osc.stop(now + 0.25);
}

/** Score count-up tick (very short, used repeatedly). */
export function sfxScoreTick(): void {
  audio.ensureContext();
  tone({ freq: 1200, type: 'triangle', duration: 0.03, attack: 0.001, gain: 0.1 });
}

/** HP loss — lower thump. */
export function sfxHpLoss(): void {
  audio.ensureContext();
  tone({ freq: 110, type: 'sawtooth', duration: 0.18, gain: 0.25 });
  noiseBurst({ duration: 0.15, cutoff: 200, gain: 0.28 });
}

/** End-of-run fanfare (used on EndScene mount). */
export function sfxEndFanfare(): void {
  audio.ensureContext();
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  notes.forEach((f, i) => {
    tone(
      {
        freq: f,
        type: 'triangle',
        duration: 0.25,
        attack: 0.01,
        gain: 0.3,
      },
      i * 0.09
    );
  });
}
