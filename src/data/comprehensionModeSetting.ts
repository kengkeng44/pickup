// v2.0: 全域「理解題:聽 or 讀」單一開關 (per user 決策 — 斷掉 session 接回).
//
// 決策脈絡: 理解類題型 (listen-comprehension / read-comprehension) 在 schema 上
// 結構完全相同 (都是 FourOptionShape + type literal), 差別只在 renderer 行為:
//   - listen = 盲聽音檔 4選1 (ListenMcRenderer)
//   - read   = 可讀段落 + 提問 4選1 (ReadComprehensionRenderer)
// 所以「聽 or 讀」做成 render-time 全域開關, 不動任何內容 JSON。
// 全 app 一個開關決定所有理解題走聽還是讀 (per user 「全域單一開關」)。
//
// Pattern 照 src/data/muteSetting.ts: localStorage 持久化 + window event 給 UI subscribe。

export type ComprehensionMode = 'listen' | 'read';

const KEY = 'pickup.comprehension.mode';
const EVT = 'pickup-comprehension-mode-changed';
// 預設 listen: 拾光核心是「聽奶奶說故事」, 且現行配比聽 > 讀。
const DEFAULT: ComprehensionMode = 'listen';

export function getComprehensionMode(): ComprehensionMode {
  try {
    return localStorage.getItem(KEY) === 'read' ? 'read' : 'listen';
  } catch {
    return DEFAULT;
  }
}

export function setComprehensionMode(m: ComprehensionMode): void {
  try {
    localStorage.setItem(KEY, m);
    window.dispatchEvent(new Event(EVT));
  } catch {}
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
