/**
 * XP / Level persistence — v1.7.11.
 *
 * Single source of truth for "how much XP has this user earned, total".
 * Persists to localStorage `pickup.xp.total`. Level is *derived* from
 * XP via a progressive square-root curve so each level needs more XP
 * than the last (50, 200, 450, 800, 1250, 1800, ...).
 *
 * Where XP is awarded:
 *   - +3 per correct cloze answer (runStore.submitAnswer)
 *   - +5 listening-completion bonus (ChapterEnd story listening mode)
 *   - +0 reading-completion bonus (reading is the default — no bonus)
 */

const LS_XP_TOTAL = 'pickup.xp.total';

export function readXp(): number {
  if (typeof localStorage === 'undefined') return 0;
  try {
    const v = localStorage.getItem(LS_XP_TOTAL);
    if (!v) return 0;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

export function addXp(delta: number): number {
  const current = readXp();
  const next = Math.max(0, current + Math.round(delta));
  try {
    localStorage.setItem(LS_XP_TOTAL, String(next));
  } catch {
    // ignore
  }
  return next;
}

/**
 * Level curve: level = floor(sqrt(xp / 50)) + 1.
 *   xp=0   → L1
 *   xp=50  → L2
 *   xp=200 → L3
 *   xp=450 → L4
 *   xp=800 → L5
 *   xp=1250 → L6
 */
export function levelForXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
}

/** XP threshold at the start of `level`. xpForLevel(2) = 50. */
export function xpForLevel(level: number): number {
  return 50 * Math.max(0, level - 1) ** 2;
}

/** Progress within the current level — { current, next, fraction 0..1 }. */
export function levelProgress(xp: number): { level: number; intoLevel: number; nextLevelAt: number; fraction: number } {
  const level = levelForXp(xp);
  const base = xpForLevel(level);
  const nextLevelAt = xpForLevel(level + 1);
  const span = nextLevelAt - base;
  const intoLevel = xp - base;
  const fraction = span > 0 ? Math.min(1, intoLevel / span) : 0;
  return { level, intoLevel, nextLevelAt: nextLevelAt - base, fraction };
}

export function resetXp(): void {
  try {
    localStorage.removeItem(LS_XP_TOTAL);
  } catch {
    // ignore
  }
}

// ─── Lesson-completion XP standard (v2.0.B.433) ──────────────────────────────
// 對齊 Duolingo 的「節點點開 → 跳框 → 選難度」模式 (見
// docs/standards/2026-06-26-lesson-xp-and-legendary-standard.md)。
// Duolingo 實值 ≈ 一般 10–15 / 複習 5 / 傳奇 40;作者拍板用下列數字。
export const LESSON_XP = {
  /** 第一次完成一般難度。 */
  firstClear: 30,
  /** 已完成過 → 再玩一般 (複習)。 */
  review: 5,
  /** 第一次用傳奇難度完成。 */
  legendaryFirst: 45,
  /** 已完成過 → 再用傳奇難度 (複習)。 */
  legendaryReview: 40,
} as const;

/** 依「是否傳奇 / 是否已完成過」算這次完成該發多少 XP。 */
export function lessonXp(opts: { legendary: boolean; alreadyDone: boolean }): number {
  if (opts.legendary) return opts.alreadyDone ? LESSON_XP.legendaryReview : LESSON_XP.legendaryFirst;
  return opts.alreadyDone ? LESSON_XP.review : LESSON_XP.firstClear;
}
