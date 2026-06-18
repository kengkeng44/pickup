/**
 * Background music — loaded from public/audio/peace.mp3.
 *
 * Switched from procedural triangle-wave synth (v0.x) to streamed mp3
 * (v0.9.3) once the brand pivoted to 拾光 + Ghibli warm palette. The
 * original sparse chiptune fought the new aesthetic; Peace! by ryoish
 * (Pixabay, 3:50 piano) is on-brand.
 *
 * Architecture:
 *   - Lazy-fetch mp3 once, decode to AudioBuffer, cache in module scope.
 *   - On startBgm(): AudioBufferSourceNode with loop=true plays through
 *     AudioManager's bgmGain → master (so mute switch + volume still work).
 *   - stop() halts the current source; cached buffer is kept for re-start
 *     (cheap, instant).
 */
import { audio } from './AudioManager';
import { isBgmEnabled } from '../data/audioSettings';

const BGM_URL = '/audio/peace.mp3';

interface BgmHandle {
  stop: () => void;
}

// Module-scope cache so we only fetch + decode once per page load.
let cachedBuffer: AudioBuffer | null = null;
let inflightLoad: Promise<AudioBuffer | null> | null = null;

async function loadBgm(ctx: AudioContext): Promise<AudioBuffer | null> {
  if (cachedBuffer) return cachedBuffer;
  if (inflightLoad) return inflightLoad;
  inflightLoad = (async () => {
    try {
      const res = await fetch(BGM_URL);
      if (!res.ok) {
        console.warn('[bgm] fetch failed', res.status, BGM_URL);
        return null;
      }
      const arrayBuf = await res.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arrayBuf);
      cachedBuffer = buffer;
      return buffer;
    } catch (err) {
      console.warn('[bgm] decode failed', err);
      return null;
    } finally {
      inflightLoad = null;
    }
  })();
  return inflightLoad;
}

// module-scope handle so settings 可 stop/start
let activeHandle: BgmHandle | undefined;

export function stopBgm(): void {
  try { activeHandle?.stop(); } catch { /* ignore */ }
  activeHandle = undefined;
}

export function startBgm(): BgmHandle | undefined {
  // v2.0.B.329 (per user): 設定關背景音樂 → 不播, 讓玩家自己的音樂繼續.
  if (!isBgmEnabled()) return undefined;
  audio.ensureContext();
  const ctx = audio.ctx;
  const dest = audio.getBgmDestination();
  if (!ctx || !dest) return undefined;

  let stopped = false;
  let source: AudioBufferSourceNode | null = null;

  // Load (or use cache) then start playback. If stop() runs before load
  // resolves, we skip starting — `stopped` guards the race.
  loadBgm(ctx).then((buffer) => {
    if (stopped || !buffer) return;
    source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(dest);
    try {
      source.start();
    } catch (err) {
      // Re-entry guard for browsers that complain if start() runs while
      // ctx is suspended; AudioManager will resume on user gesture and
      // future startBgm() calls will work.
      console.warn('[bgm] source.start failed', err);
    }
  });

  const handle: BgmHandle = {
    stop: () => {
      if (stopped) return;
      stopped = true;
      if (source) {
        try { source.stop(); } catch { /* already stopped */ }
        try { source.disconnect(); } catch { /* already disconnected */ }
        source = null;
      }
    },
  };

  audio.registerBgm(() => handle.stop());
  activeHandle = handle;
  return handle;
}
