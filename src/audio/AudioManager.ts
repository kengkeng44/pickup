/**
 * AudioManager — singleton wrapper around Web Audio API.
 *
 * Responsibilities:
 *   - Lazily create AudioContext on first user gesture (browser autoplay policy).
 *   - Hold master gain nodes for BGM + SFX channels.
 *   - Persist mute state (audio + haptics) to localStorage.
 *   - Pause BGM on `visibilitychange` (page hidden).
 *   - Provide vibrate() with mobile haptics feature detection.
 *
 * Mute semantics: muted = silent. We set channel gain to 0; we do NOT keep
 * oscillators producing inaudible output to "save state". BGM also stops its
 * scheduler so no leaked nodes accumulate.
 */

const LS_AUDIO_MUTED = 'wordwar.audioMuted';
const LS_HAPTICS_MUTED = 'wordwar.hapticsMuted';

const BGM_VOLUME = 0.18; // background-appropriate; chiptune tends to be peaky
const SFX_VOLUME = 0.5;

type BgmStopHandle = () => void;

export class AudioManager {
  private static _instance?: AudioManager;

  ctx?: AudioContext;
  private masterGain?: GainNode;
  private bgmGain?: GainNode;
  private sfxGain?: GainNode;
  private warnGain?: GainNode;
  private bgmStop?: BgmStopHandle;
  private warningStop?: () => void;

  private _audioMuted: boolean;
  private _hapticsMuted: boolean;
  private listeners = new Set<() => void>();

  static get instance(): AudioManager {
    if (!AudioManager._instance) AudioManager._instance = new AudioManager();
    return AudioManager._instance;
  }

  private constructor() {
    this._audioMuted = readBool(LS_AUDIO_MUTED, false);
    // Default haptics: ON for touch devices, OFF for desktop.
    const defaultHaptics = !isTouchDevice();
    this._hapticsMuted = readBool(LS_HAPTICS_MUTED, defaultHaptics);

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!this.ctx) return;
        if (document.hidden) {
          // suspend pauses scheduling; bgm scheduler also checks ctx.state
          this.ctx.suspend().catch(() => {});
        } else if (!this._audioMuted) {
          this.ctx.resume().catch(() => {});
        }
      });
    }
  }

  /**
   * MUST be called from a user gesture handler the first time, or the
   * AudioContext will be created in `suspended` state and never produce sound.
   * Idempotent.
   */
  ensureContext(): AudioContext | undefined {
    if (typeof window === 'undefined') return undefined;
    if (this.ctx) {
      if (this.ctx.state === 'suspended' && !this._audioMuted) {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }
    const Ctor =
      (window as unknown as { AudioContext?: typeof AudioContext })
        .AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return undefined;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = this._audioMuted ? 0 : 1;
    this.masterGain.connect(ctx.destination);

    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = BGM_VOLUME;
    this.bgmGain.connect(this.masterGain);

    this.sfxGain = ctx.createGain();
    this.sfxGain.gain.value = SFX_VOLUME;
    this.sfxGain.connect(this.masterGain);

    // Warning layer — separate gain so we can fade it in over BGM without
    // affecting other channels.
    this.warnGain = ctx.createGain();
    this.warnGain.gain.value = 0;
    this.warnGain.connect(this.masterGain);

    return ctx;
  }

  getWarnDestination(): AudioNode | undefined {
    return this.warnGain;
  }

  /**
   * Start the timer-low warning layer. Idempotent — if already playing,
   * no-op. The warning is a subtle low pulse that fades in over 200ms.
   */
  playWarningLayer(): void {
    if (this.warningStop) return;
    if (this._audioMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.warnGain) return;

    // Two-oscillator dissonant low pulse, modulated by a slow LFO via a
    // gain ramp pattern (heartbeat-ish).
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.value = 110;
    osc2.frequency.value = 116; // beating against osc1 for unease
    const pulseGain = ctx.createGain();
    pulseGain.gain.value = 0;

    osc1.connect(pulseGain);
    osc2.connect(pulseGain);
    pulseGain.connect(this.warnGain);

    // Fade the warning channel in over 200ms.
    const now = ctx.currentTime;
    this.warnGain.gain.cancelScheduledValues(now);
    this.warnGain.gain.setValueAtTime(0, now);
    this.warnGain.gain.linearRampToValueAtTime(0.35, now + 0.2);

    // Heartbeat-ish: pulse every 0.8s (~75 bpm). Schedule pulses out ~6s
    // ahead — the warning only ever lasts ~5s before resolve, so this is plenty.
    osc1.start(now);
    osc2.start(now);
    const beatDur = 0.8;
    for (let i = 0; i < 8; i++) {
      const t = now + i * beatDur;
      pulseGain.gain.setValueAtTime(0.0001, t);
      pulseGain.gain.linearRampToValueAtTime(0.6, t + 0.05);
      pulseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    }

    this.warningStop = () => {
      const stopNow = ctx.currentTime;
      if (this.warnGain) {
        this.warnGain.gain.cancelScheduledValues(stopNow);
        this.warnGain.gain.setValueAtTime(this.warnGain.gain.value, stopNow);
        this.warnGain.gain.linearRampToValueAtTime(0, stopNow + 0.08);
      }
      // Stop oscillators after the fade-out so we don't click.
      try {
        osc1.stop(stopNow + 0.1);
        osc2.stop(stopNow + 0.1);
      } catch {
        // already stopped
      }
    };
  }

  stopWarningLayer(): void {
    this.warningStop?.();
    this.warningStop = undefined;
  }

  get audioMuted(): boolean {
    return this._audioMuted;
  }

  setAudioMuted(muted: boolean): void {
    if (this._audioMuted === muted) return;
    this._audioMuted = muted;
    writeBool(LS_AUDIO_MUTED, muted);
    if (this.masterGain && this.ctx) {
      // Hard cut — no ramp — so toggling feels immediate.
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
    if (muted) {
      this.stopBgm();
      this.stopWarningLayer();
    }
    this.emit();
  }

  toggleAudioMuted(): void {
    this.setAudioMuted(!this._audioMuted);
  }

  get hapticsMuted(): boolean {
    return this._hapticsMuted;
  }

  setHapticsMuted(muted: boolean): void {
    if (this._hapticsMuted === muted) return;
    this._hapticsMuted = muted;
    writeBool(LS_HAPTICS_MUTED, muted);
    this.emit();
  }

  /** Subscribe to mute state changes (for UI sync). Returns unsubscribe. */
  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }

  getSfxDestination(): AudioNode | undefined {
    return this.sfxGain;
  }

  getBgmDestination(): AudioNode | undefined {
    return this.bgmGain;
  }

  /**
   * v2.0.B.140: BGM ducking — attenuate background music while voice plays.
   * Per audio-debug agent finding: peace.mp3 piano overlay with grandma TTS
   * caused user perception of '語音是錯的'. Duck BGM to ~10% during voice,
   * smooth fade restore on release (300ms each direction).
   * Idempotent: multiple speak() calls just nest; restore on last release.
   */
  private duckCount = 0;
  duckBgm(): void {
    this.duckCount += 1;
    if (!this.bgmGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const g = this.bgmGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(BGM_VOLUME * 0.1, now + 0.3);
  }
  unduckBgm(): void {
    this.duckCount = Math.max(0, this.duckCount - 1);
    if (this.duckCount > 0) return;
    if (!this.bgmGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const g = this.bgmGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(BGM_VOLUME, now + 0.3);
  }

  registerBgm(stop: BgmStopHandle): void {
    this.bgmStop?.();
    this.bgmStop = stop;
  }

  get isBgmRunning(): boolean {
    return !!this.bgmStop;
  }

  stopBgm(): void {
    this.bgmStop?.();
    this.bgmStop = undefined;
  }

  /**
   * Fire haptic vibration if supported + not muted.
   * Returns true if vibration was actually dispatched.
   */
  vibrate(pattern: number | number[]): boolean {
    if (this._hapticsMuted) return false;
    if (typeof navigator === 'undefined') return false;
    const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
    if (typeof nav.vibrate !== 'function') return false;
    try {
      return nav.vibrate(pattern);
    } catch {
      return false;
    }
  }
}

function readBool(key: string, fallback: boolean): boolean {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === '1' || v === 'true';
  } catch {
    return fallback;
  }
}

function writeBool(key: string, value: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, value ? '1' : '0');
  } catch {
    // private mode / quota — ignore
  }
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
  );
}

export const audio = AudioManager.instance;
