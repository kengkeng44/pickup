// v2.0.B.329 (per user): 音訊設定 — 背景音樂 / 音效 各自開關.
// 目的之一: 關掉背景音樂 → 玩家自己耳機的音樂可同時播, app 只剩題目語音 + (選) 音效.
// (完整「不 duck 混音」需 Capacitor 原生 AVAudioSession .ambient + mixWithOthers, 見 cockpit todo。)
// 預設皆 on. localStorage 持久化 + window event 給 UI / bgm subscribe。

const KEY_BGM = 'pickup.audio.bgm';
const KEY_SFX = 'pickup.audio.sfx';
const EVT = 'pickup-audio-settings-changed';

function readFlag(key: string): boolean {
  try { return localStorage.getItem(key) !== '0'; } catch { return true; } // 預設 on
}
function writeFlag(key: string, v: boolean): void {
  try {
    localStorage.setItem(key, v ? '1' : '0');
    window.dispatchEvent(new Event(EVT));
  } catch { /* ignore */ }
}

export function isBgmEnabled(): boolean { return readFlag(KEY_BGM); }
export function setBgmEnabled(v: boolean): void { writeFlag(KEY_BGM, v); }
export function isSfxEnabled(): boolean { return readFlag(KEY_SFX); }
export function setSfxEnabled(v: boolean): void { writeFlag(KEY_SFX, v); }

export function subscribeAudioSettings(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
