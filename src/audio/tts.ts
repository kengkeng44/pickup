/**
 * Text-to-speech with pre-generated MP3 priority + Web Speech fallback.
 *
 * v2.0.B.11 — wires OpenAI-generated grandma voice MP3s.
 *
 * Architecture:
 *   1. At module load, fetch lessons-ch{1..8}.json, build text -> audioId
 *      lookup map. Keys are sentences with {catName}/{dogName}
 *      substituted with defaults (Mochi/Hana) — matches script generation.
 *   2. On speak(text):
 *      - If lookup hits, play /audio/lessons/{audioId}.mp3 (real grandma)
 *      - Else fall back to Web Speech API (robotic but free + universal)
 *   3. Players who customised cat/dog names won't match lookup
 *      and get Web Speech fallback. Acceptable trade-off (customisers
 *      opt in to robotic voice).
 *
 * Why this works without changing 6 callsites:
 *   - speak(text, lang) signature unchanged
 *   - Lookup is internal; callers don't pass audioId
 *   - stopSpeaking() handles both audio paths
 */

// text -> audioId (Q id) for pre-generated MP3 lookup
const audioLookup = new Map<string, string>();
let lookupPromise: Promise<void> | null = null;

function applyDefaults(s: string): string {
  return s.replace(/\{catName\}/g, 'Mochi').replace(/\{dogName\}/g, 'Hana');
}

async function loadAudioLookup(): Promise<void> {
  // Only Ch1 ships with MP3s today. Add Ch2+ here as chapters land.
  const chapters = [1];
  for (const ch of chapters) {
    try {
      const res = await fetch(`/lessons-ch${ch}.json`);
      if (!res.ok) continue;
      const lessons = await res.json();
      for (const lesson of lessons) {
        for (const q of lesson.questions) {
          if (!q.sentence || !q.id) continue;
          const text = applyDefaults(q.sentence);
          if (!audioLookup.has(text)) {
            audioLookup.set(text, q.id);
          }
        }
      }
    } catch {
      // ignore — lookup misses fall back to Web Speech
    }
  }
}

function ensureLookup(): Promise<void> {
  if (!lookupPromise) {
    lookupPromise = loadAudioLookup();
  }
  return lookupPromise;
}

// Eagerly start lookup at module evaluation
if (typeof window !== 'undefined') {
  void ensureLookup();
}

let activeAudio: HTMLAudioElement | null = null;

function cleanText(text: string): string {
  return text.replace(/_{2,}/g, ' ').replace(/\s+/g, ' ').trim();
}

function speakWebSpeech(text: string, lang: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    // v1.9.38 audit-2 F10: rate 0.85 — A2 Taiwanese learners need slower
    u.rate = 0.85;
    u.pitch = 1;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore
  }
}

function debugLog(msg: string) {
  if (typeof document === 'undefined') return;
  console.log('[TTS]', msg);
  let el = document.getElementById('pickup-tts-debug');
  if (!el) {
    el = document.createElement('div');
    el.id = 'pickup-tts-debug';
    el.style.cssText = 'position:fixed;top:8px;right:8px;background:rgba(0,0,0,0.88);color:#fff;padding:6px 10px;border-radius:8px;font:11px/1.3 monospace;z-index:99999;max-width:220px;pointer-events:none;word-break:break-all;';
    document.body.appendChild(el);
  }
  el.textContent = msg.slice(0, 200);
}

export function speak(text: string, lang = 'en-US'): void {
  const cleaned = cleanText(text);
  if (!cleaned) {
    debugLog('speak: empty text');
    return;
  }

  stopSpeaking();

  const mapSize = audioLookup.size;
  const audioId = audioLookup.get(cleaned);

  if (audioId && typeof Audio !== 'undefined') {
    try {
      const url = `/audio/lessons/${audioId}.mp3`;
      debugLog(`MP3 try: ${audioId} map=${mapSize}`);
      const audio = new Audio(url);
      audio.playbackRate = 1.0;
      audio.volume = 1.0;
      activeAudio = audio;
      audio.play().then(() => {
        debugLog(`MP3 play OK: ${audioId}`);
      }).catch((err) => {
        debugLog(`MP3 play FAIL: ${err?.name || 'err'} → WebSpeech`);
        if (activeAudio === audio) activeAudio = null;
        speakWebSpeech(cleaned, lang);
      });
      audio.addEventListener('ended', () => {
        if (activeAudio === audio) activeAudio = null;
      });
      return;
    } catch (e: any) {
      debugLog(`MP3 ctor FAIL: ${e?.message?.slice(0,40)}`);
    }
  } else {
    debugLog(`no mp3id (map=${mapSize}) txt=${cleaned.slice(0,40)} → WebSpeech`);
  }
  speakWebSpeech(cleaned, lang);
}

export function stopSpeaking(): void {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function isTtsSupported(): boolean {
  return typeof window !== 'undefined' && !!window.speechSynthesis;
}
