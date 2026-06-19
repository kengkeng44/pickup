// v2.0.B.cron 理解選擇 merge (per user, 2026-06-19):
// read-comprehension + listen-comprehension 合併成單一「理解選擇」題型。
// 內容層題型 (read-comprehension / listen-comprehension / comprehension) 全部
// 等價 — 呈現方式 (聽 vs 讀) 由「全域開關」決定, 不再綁在每題的 type 上。
//
//   'listen' = 盲聽模式: 段落以 blanks 隱藏, 自動 TTS, 答完才 reveal (像 listen-mc)
//   'read'   = 閱讀模式: 段落一直可見, 答完開放點詞看中文 (舊 read-comprehension UX)
//
// 全 surface 共享, localStorage 持久化, window event 給 UI subscribe (mirror muteSetting.ts)。

const KEY = 'pickup.comprehensionMode';
const EVT = 'pickup-comprehension-mode-changed';

export type ComprehensionMode = 'listen' | 'read';

// 預設 'listen': app 是「奶奶說故事」聽力為主, 舊配比 listen-comp 18% vs read-comp 9% 也 2:1 偏聽。
const DEFAULT: ComprehensionMode = 'listen';

export function getComprehensionMode(): ComprehensionMode {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'read' ? 'read' : v === 'listen' ? 'listen' : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function setComprehensionMode(v: ComprehensionMode): void {
  try {
    localStorage.setItem(KEY, v);
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* ignore — private browsing */
  }
}

export function toggleComprehensionMode(): ComprehensionMode {
  const next: ComprehensionMode = getComprehensionMode() === 'listen' ? 'read' : 'listen';
  setComprehensionMode(next);
  return next;
}

export function subscribeComprehensionMode(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
