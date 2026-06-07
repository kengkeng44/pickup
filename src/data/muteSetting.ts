// v2.0.B.251 P0 fix (Walkthrough cron audit 2026-06-07T1218 persona 佳蓉 34yo 媽媽):
// 「narration auto-TTS 無靜音 gate, 深夜外放吵醒孩子 → 30 秒內關 app」
// 解法: 全 surface 共享的 mute toggle, localStorage 持久化, window event 給 UI subscribe。
//
// auto-speak (useEffect mount triggered) → 受 mute 約束, mute 時 silent + onEnd 仍 fire (advance 邏輯不卡)
// manual tap (SpeakerBtn onClick) → 帶 force: true, 用戶主動點即使 mute mode 也播 (重聽需求)。

const KEY = 'pickup.audio.muted';
const EVT = 'pickup-mute-changed';

export function isMuted(): boolean {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
}

export function setMuted(v: boolean): void {
  try {
    localStorage.setItem(KEY, v ? '1' : '0');
    window.dispatchEvent(new Event(EVT));
  } catch {}
}

export function toggleMuted(): boolean {
  const next = !isMuted();
  setMuted(next);
  return next;
}

export function subscribeMuteChange(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
