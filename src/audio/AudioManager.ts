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
  private bgmStop?: BgmStopHandle;

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

    return ctx;
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
