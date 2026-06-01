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

// ─── Haptic vibration (B.161.17 per user '網頁有辦法震動嗎') ───────────────
// Android Chrome ✅ / iOS Safari ❌ (Apple block since 2015). Graceful no-op.
// Capacitor wrap 上之後可改 @capacitor/haptics 用 native API.
function vibrate(pattern: number | number[]): void {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  try { navigator.vibrate(pattern); } catch {}
}

// ─── Public SFX library ─────────────────────────────────────────────────────

/** Soft click on card press (~50ms) + 10ms vibrate. */
export function sfxCardPress(): void {
  audio.ensureContext();
  tone({ freq: 880, type: 'triangle', duration: 0.05, attack: 0.002, gain: 0.18 });
  vibrate(10);
}

/**
 * Bell-like tone — fundamental + harmonics with slow attack and
 * exponential release. Sounds chime-y, not buzzy. Used by sfxCorrect.
 */
function bellTone(
  fundamental: number,
  duration: number,
  peak: number,
  startAt = 0
): void {
  const ctx = audio.ctx;
  const dest = audio.getSfxDestination();
  if (!ctx || !dest) return;
  const now = ctx.currentTime + startAt;
  // Harmonic series with decreasing amplitude — bell timbre.
  const harmonics: Array<{ mult: number; amp: number }> = [
    { mult: 1, amp: 1.0 },
    { mult: 2, amp: 0.35 },
    { mult: 3, amp: 0.18 },
    { mult: 4.2, amp: 0.08 }, // slightly inharmonic — adds shimmer
  ];
  const attack = 0.04;
  const sustain = Math.max(0.04, duration * 0.25);
  const end = now + duration;
  for (const h of harmonics) {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(fundamental * h.mult, now);
    const p = peak * h.amp;
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(p, now + attack);
    env.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, p * 0.5),
      now + attack + sustain
    );
    env.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(env);
    env.connect(dest);
    osc.start(now);
    osc.stop(end + 0.02);
  }
}

/**
 * Ascending bell chime for correct answer (~520ms).
 * Layered: two-note rising bell (E5, B5) + a soft major triad pad
 * (C5/E5/G5) struck under it for warmth. Slow attack so it feels
 * "encouraging" not "video-gamey."
 */
export function sfxCorrect(): void {
  audio.ensureContext();
  // Two bright bell strikes — E5 then B5, classic "lesson complete" feel.
  bellTone(659.25, 0.5, 0.26, 0);
  bellTone(987.77, 0.46, 0.22, 0.09);
  // Soft C major triad pad underneath (low gain, sine for warmth).
  tone({ freq: 523.25, type: 'sine', duration: 0.42, attack: 0.04, gain: 0.1 }, 0.02);
  tone({ freq: 659.25, type: 'sine', duration: 0.42, attack: 0.04, gain: 0.08 }, 0.02);
  tone({ freq: 783.99, type: 'sine', duration: 0.42, attack: 0.04, gain: 0.07 }, 0.02);
  // B.161.17: positive haptic pattern (Android) — 雙短 pulse 正向感受
  vibrate([25, 40, 25]);
}

/**
 * Gentle descending minor-third for wrong (~300ms).
 * Two sine tones (A4 → F4) with cosine-shaped envelope so the
 * release is smooth, no clicks, no noise. Sounds "aw, missed" not
 * "BUZZ WRONG."
 */
export function sfxWrong(): void {
  audio.ensureContext();
  // B.161.17: negative haptic pattern (Android) — 較長 pulse 提示錯誤
  vibrate([60, 40, 60]);
  const ctx = audio.ctx;
  const dest = audio.getSfxDestination();
  if (!ctx || !dest) return;
  const now = ctx.currentTime;

  // Helper: smooth cosine-shaped envelope (no harsh clicks).
  const playSoft = (
    freq: number,
    startAt: number,
    duration: number,
    peak: number
  ): void => {
    const t0 = now + startAt;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    // Subtle downward glide for a "deflating" feel.
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, freq * 0.94),
      t0 + duration
    );
    // Cosine attack/release ≈ raised-cosine for smoothness.
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.025);
    env.gain.setValueAtTime(peak, t0 + duration * 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(env);
    env.connect(dest);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  };

  // A4 → F4 = descending minor third. Gentle, classic "wrong" cue.
  playSoft(440, 0, 0.16, 0.22);
  playSoft(349.23, 0.11, 0.22, 0.24);
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
