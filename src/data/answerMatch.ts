/**
 * 外文打字題 答案比對引擎 + 近似判斷標準 (v2.0.B.434).
 *
 * 用於 `type-translate` 題型:玩家看「來源語言」句子,用外文打出一樣的意思。
 * 一個意思常有多種文法正確的講法 (「我很好」= I'm good / I am good / I'm fine / I'm doing well…),
 * 所以題目預先列好所有可接受講法 (answer + accept[]),引擎再做:
 *
 *   1. 正規化 (大小寫 / 標點 / 彎引號 / 縮寫展開) 後比對 → 完全相符 = correct。
 *   2. 近似判斷 (近似判斷標準, 見 docs/standards/2026-06-26-freetype-nearmiss-standard.md):
 *        - 只差一個小地方 (拼字 1-2 字、漏冠詞 a/the、漏撇號) → 'near' (跳「差一點」提示, 不罰)。
 *        - 明顯不同 (字數差很多 / 編輯距離大) → 'wrong' (跳錯誤)。
 *
 * 設計目標:作者只需列「主要講法」, 引擎自動吃下縮寫/標點/大小寫變體, 降低 content 負擔;
 * 真正語意不同的別句仍需作者放進 accept[] (文法正確才放)。
 */

export type MatchStatus = 'correct' | 'near' | 'wrong';
export type NearReason = 'typo' | 'article' | 'extra' | 'order';

export interface MatchResult {
  status: MatchStatus;
  /** near 時的細分原因 (給 UI 顯示對應提示)。 */
  reason?: NearReason;
}

// ─── 正規化 ───────────────────────────────────────────────────────────────

// 縮寫 → 展開, 讓 "I'm" / "I am" 互通。兩邊都會跑同一套, 所以一定對稱。
// 注意: 用空白包夾比對, 避免吃到字中。順序: 多字元先 (n't 在 't 前)。
const EXPANSIONS: Array<[RegExp, string]> = [
  [/\bcannot\b/g, 'can not'],
  [/\bgonna\b/g, 'going to'],
  [/\bwanna\b/g, 'want to'],
  [/\bgotta\b/g, 'got to'],
  // 不規則否定縮寫先處理 (否則 n't→not 會吃掉 ca[n]'t 的 n → "ca not")。
  [/\bcan't\b/g, 'can not'],
  [/\bwon't\b/g, 'will not'],
  [/\bshan't\b/g, 'shall not'],
  [/n't\b/g, ' not'],   // 規則型: don't→do not, isn't→is not, doesn't→does not
  [/'re\b/g, ' are'],   // you're→you are
  [/'ve\b/g, ' have'],  // I've→I have
  [/'ll\b/g, ' will'],  // I'll→I will
  [/'m\b/g, ' am'],     // I'm→I am
  [/'d\b/g, ' would'],  // I'd→I would
  [/'s\b/g, ' is'],     // it's→it is (對稱轉換, 所有格也一致處理)
];

/**
 * 正規化成可比對的 canonical 形式:
 *   小寫 → 彎引號轉直 → 標點(除撇號)轉空白 → 縮寫展開 → 去殘餘撇號 → 收斂空白。
 */
export function canonical(s: string): string {
  let t = (s || '')
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'") // ' ' ` ´ → '
    .replace(/[“”]/g, '"')                   // " " → "
    .replace(/[.,!?;:"()\[\]{}。，！？]/g, ' ') // 標點(含全形)→空白, 保留 '
    .replace(/\s+/g, ' ')
    .trim();
  t = ' ' + t + ' ';
  for (const [re, to] of EXPANSIONS) t = t.replace(re, to);
  t = t.replace(/'/g, ''); // 殘餘撇號(所有格等)去掉, 讓 "dogs"≈"dog's"
  return t.replace(/\s+/g, ' ').trim();
}

// Wagner-Fischer 編輯距離 (O(a×b) / O(b) 空間)。長度差 > cap 直接 Infinity 提早退出。
function editDistance(a: string, b: string, cap = 4): number {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (Math.abs(al - bl) > cap) return Infinity;
  const dp = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) dp[j] = j;
  for (let i = 1; i <= al; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= bl; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(dp[j - 1], dp[j], prev);
      prev = tmp;
    }
  }
  return dp[bl];
}

const ARTICLES = new Set(['a', 'an', 'the']);

// 兩 token 陣列只差「一個冠詞」(多或少 a/an/the) → near('article')。
function differsByOneArticle(ti: string[], ta: string[]): boolean {
  if (Math.abs(ti.length - ta.length) !== 1) return false;
  const [shorter, longer] = ti.length < ta.length ? [ti, ta] : [ta, ti];
  // longer 去掉一個 token 後等於 shorter, 且那個 token 是冠詞。
  for (let k = 0; k < longer.length; k++) {
    if (!ARTICLES.has(longer[k])) continue;
    const spliced = longer.slice(0, k).concat(longer.slice(k + 1));
    if (spliced.length === shorter.length && spliced.every((w, i) => w === shorter[i])) return true;
  }
  return false;
}

// 同一組字、只是順序不同 → near('order') (英文語序通常要對, 但「差一點」可提示而非直接錯)。
function sameWordsDifferentOrder(ti: string[], ta: string[]): boolean {
  if (ti.length !== ta.length || ti.length < 2) return false;
  const sa = [...ti].sort().join(' ');
  const sb = [...ta].sort().join(' ');
  return sa === sb && ti.join(' ') !== ta.join(' ');
}

/** 拼字容忍度: 依字串長度放寬 (短句要嚴, 長句容 typo)。 */
function typoTolerance(len: number): number {
  if (len <= 6) return 1;
  if (len <= 20) return 2;
  return 3;
}

/**
 * 比對玩家輸入 vs 所有可接受答案, 回傳 correct / near / wrong。
 *
 * @param input    玩家打的字
 * @param answer   主要正確答案
 * @param accept   其他文法正確的可接受講法 (選填)
 */
export function checkAnswer(input: string, answer: string, accept: string[] = []): MatchResult {
  const ci = canonical(input);
  if (!ci) return { status: 'wrong' };

  const accepted = [answer, ...accept].map(canonical).filter(Boolean);
  if (accepted.includes(ci)) return { status: 'correct' };

  // 找最接近的可接受答案, 判斷是不是「只差一點」。
  const ti = ci.split(' ');
  let best: MatchResult | null = null;
  for (const a of accepted) {
    if (ci === a) return { status: 'correct' };
    const ta = a.split(' ');
    // 1) 漏/多一個冠詞
    if (differsByOneArticle(ti, ta)) { best = { status: 'near', reason: 'article' }; continue; }
    // 2) 同字不同序
    if (sameWordsDifferentOrder(ti, ta)) { best = best ?? { status: 'near', reason: 'order' }; continue; }
    // 3) 拼字小錯 (編輯距離)
    const tol = typoTolerance(Math.max(ci.length, a.length));
    const dist = editDistance(ci, a, tol + 1);
    if (dist !== Infinity && dist <= tol) { best = { status: 'near', reason: 'typo' }; continue; }
    // 4) 整句對、只多尾巴一兩個多餘字 (extra)
    if (ta.length >= 1 && ti.length === ta.length + 1) {
      const extraAtEnd = ta.every((w, i) => w === ti[i]);
      const extraAtStart = ta.every((w, i) => w === ti[i + 1]);
      if (extraAtEnd || extraAtStart) { best = best ?? { status: 'near', reason: 'extra' }; }
    }
  }
  return best ?? { status: 'wrong' };
}
