// v2.0.B.cron 理解選擇 merge (per user, 2026-06-19):
// read-comprehension + listen-comprehension 合併成單一「理解選擇」題型。
// 內容層題型 (read-comprehension / listen-comprehension / comprehension) 全部
// 等價 — 呈現方式 (聽 vs 讀) 由「全域開關」決定, 不再綁在每題的 type 上。
//
//   'listen' = 盲聽模式: 段落以 blanks 隱藏, 自動 TTS, 答完才 reveal (像 listen-mc)
//   'read'   = 閱讀模式: 段落一直可見, 答完開放點詞看中文 (舊 read-comprehension UX)
//   'auto'   = 跟著難度自動切 (預設, 鷹架式) — 見 resolveComprehension()
//
// 全 surface 共享, localStorage 持久化, window event 給 UI subscribe (mirror muteSetting.ts)。

const KEY = 'pickup.comprehensionMode';
const EVT = 'pickup-comprehension-mode-changed';

export type ComprehensionMode = 'listen' | 'read' | 'auto';
// 實際呈現只有兩種 (resolve 後)
export type ResolvedComprehension = 'listen' | 'read';

// 預設 'auto': 跟著難度鷹架 (easy→讀 / medium→混 / hard→聽), 兒童 ELT 最佳實踐。
// 家長想鎖死一種仍可在設定頁手動選 'listen' / 'read'。
const DEFAULT: ComprehensionMode = 'auto';

export function getComprehensionMode(): ComprehensionMode {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'read' || v === 'listen' || v === 'auto' ? v : DEFAULT;
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

export function subscribeComprehensionMode(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}

// djb2 — 穩定 hash, 同一題 id 永遠對到同一種呈現 (medium 混合模式用)。
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

// 把全域 mode (含 'auto') 解析成這一題實際要「聽」還是「讀」。
//   listen / read → 直接回傳 (家長手動鎖死)
//   auto → 跟著 pickup.difficulty 鷹架:
//     easy   (低年級/初學)   → read  (有字 + 點詞看中文, 零挫折)
//     hard   (進階/親子)     → listen (盲聽原文)
//     medium (主客群預設)    → 混合: 依 q.id hash ~1/3 讀 + 2/3 聽 (交錯 + 鷹架, 同題穩定)
export function resolveComprehension(qId: string): ResolvedComprehension {
  const mode = getComprehensionMode();
  if (mode === 'listen' || mode === 'read') return mode;
  let d = 'medium';
  try { d = localStorage.getItem('pickup.difficulty') || 'medium'; } catch { /* ignore */ }
  if (d === 'easy') return 'read';
  if (d === 'hard') return 'listen';
  return hashStr(qId) % 3 === 0 ? 'read' : 'listen';
}
