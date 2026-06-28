/**
 * 錯題統整 (v2.0.B.488, per user) — 每小節末 + 每章末把答錯的題重做一次。
 *
 * 規則 (per user):
 *  - 只統整「單字 / 文法 / 時態」題, **不含閱讀/聽力理解** (comprehension / listen-mc / listen-tf)。
 *  - 盡量不重複 (依題目 base id 去重)。
 *  - 真的都沒錯 → 複習題數 = 0 (那一輪直接跳過, 自然減少總題數)。
 *
 * 兩層:
 *  - 小節末: 重做「這一節」答錯的可複習題。
 *  - 章末 (最後一節): 重做「整章」累積的可複習錯題 (跨節, 去重)。
 */

export interface ReviewQuestion {
  id: string;
  type: string;
  [k: string]: unknown;
}

// 可複習題型 = 單字 (配對/選圖/選字) + 文法/時態 (grammar/填空) + 產出 (打字/排序)。
// 排除: narration(旁白) / comprehension·read-comprehension·listen-comprehension (閱讀理解) /
//       listen-mc·listen-tf (聽力理解)。
const REVIEWABLE = new Set([
  // 單字
  'tap-pairs', 'phrase-pairs', 'listen-pairs', 'emoji-pick', 'picture-mc', 'listen-emoji',
  // 文法 / 時態
  'grammar-mc', 'scroll-pick', 'read-and-tap', 'drag-blank',
  // 產出 (字 / 句)
  'type-translate', 'type-what-you-hear', 'tap-tiles', 'listen-build',
]);

export function isReviewableType(type: string): boolean {
  return REVIEWABLE.has(type);
}

// 去重 key = 拿掉複習後綴的原始 id。
export function mistakeKey(q: ReviewQuestion): string {
  return String(q.id).replace(/-rv\d+$/, '');
}

// 給複習題一個新 id (讓 renderer 重新 mount, 不跟原題撞 key)。
export function toReviewCopy(q: ReviewQuestion, i: number): ReviewQuestion {
  return { ...q, id: `${mistakeKey(q)}-rv${i}` };
}

const chKey = (ch: number) => `pickup.chapter.${ch}.mistakes`;

export function readChapterMistakes(ch: number): ReviewQuestion[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(chKey(ch));
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export function addChapterMistake(ch: number, q: ReviewQuestion): void {
  if (typeof localStorage === 'undefined' || !isReviewableType(q.type)) return;
  try {
    const list = readChapterMistakes(ch);
    const key = mistakeKey(q);
    if (list.some((x) => mistakeKey(x) === key)) return; // 去重
    list.push({ ...q, id: key });
    // 上限 30, 避免無限長。
    localStorage.setItem(chKey(ch), JSON.stringify(list.slice(-30)));
  } catch { /* ignore */ }
}

export function clearChapterMistakes(ch: number): void {
  try { localStorage.removeItem(chKey(ch)); } catch { /* ignore */ }
}

/** 去重一批題 (依 base id), 回傳複習副本 (新 id)。 */
export function buildReviewRound(questions: ReviewQuestion[]): ReviewQuestion[] {
  const seen = new Set<string>();
  const out: ReviewQuestion[] = [];
  for (const q of questions) {
    if (!isReviewableType(q.type)) continue;
    const key = mistakeKey(q);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(toReviewCopy(q, out.length));
  }
  return out;
}
