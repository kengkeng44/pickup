// v2.0.B.424 — 體力 (愛心 HP). per user: 打錯扣體力, 右上角顯示愛心 🧡。
//
// 設計 (測試版, 溫和不卡關 — 對齊 CLAUDE.md「故事模式不能死」):
//   - 5 顆心, localStorage 持久 + window event 給 UI 即時更新 (mirror lang.ts)。
//   - 答錯 → loseHp() 扣 1 (最低 0)。
//   - 進入每個 lesson refillHp() 補滿 (每節重新開始, 不跨節懲罰)。
//   - 歸 0 不鎖關 (blindRetry 仍可繼續) — 目前只是視覺反饋。之後要硬性扣關再加 gate。

const KEY = 'pickup.hp';
const EVT = 'pickup-hp-changed';
export const MAX_HP = 5;

export function getHp(): number {
  try {
    const v = parseInt(localStorage.getItem(KEY) || '', 10);
    return Number.isFinite(v) ? Math.max(0, Math.min(MAX_HP, v)) : MAX_HP;
  } catch {
    return MAX_HP;
  }
}

function setHp(v: number): void {
  try {
    localStorage.setItem(KEY, String(Math.max(0, Math.min(MAX_HP, v))));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* private browsing */
  }
}

export function loseHp(): void { setHp(getHp() - 1); }
export function refillHp(): void { setHp(MAX_HP); }

export function subscribeHp(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
