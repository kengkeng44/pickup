/**
 * Persistent daily streak — v1.9.4.
 * + v2.0.B.232 Streak Freeze 🧊 (招 1 of 7-trick addiction matrix).
 *
 * Counts consecutive calendar days the user opened the app and
 * completed at least one round. localStorage keys:
 *   pickup.streak.count    — current streak length
 *   pickup.streak.lastDate — ISO date (YYYY-MM-DD) of last activity
 *   pickup.streak.freezes  — number of available freeze items (default 2)
 *   pickup.streak.lastFreezeUsedDate — last date a freeze was auto-consumed
 *
 * Call updateStreak() on:
 *   - app boot (in BootScene)
 *   - any milestone the user "did something today" (round complete, etc.)
 *
 * Logic (with freeze):
 *   - Today is the same as lastDate → no change (already counted today)
 *   - Today is exactly 1 day after lastDate → increment (streak continues)
 *   - Today is 2+ days after lastDate AND freezes > 0 →
 *       auto-consume 1 freeze, increment streak (Mochi 幫你保住了)
 *   - Today is 2+ days after lastDate AND freezes = 0 → reset to 1
 *   - lastDate empty → first time, set to 1
 *
 * Microcopy rule: never frame as "You LOST your streak!" — Mochi 是隊友。
 */
const LS_COUNT = 'pickup.streak.count';
const LS_LAST = 'pickup.streak.lastDate';
const LS_FREEZES = 'pickup.streak.freezes';
const LS_LAST_FREEZE = 'pickup.streak.lastFreezeUsedDate';
// v2.0.B.483: 每日打卡記錄 (連勝戰績頁的週曆 ✓ 用)。存最近 ~60 個 ISO 日期。
const LS_DAYS = 'pickup.streak.days';

const DEFAULT_FREEZES = 2;

function isoDate(d = new Date()): string {
  // Local date YYYY-MM-DD (not UTC) so the streak respects user timezone
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / (24 * 60 * 60 * 1000));
}

export function readStreak(): number {
  if (typeof localStorage === 'undefined') return 0;
  try {
    const v = localStorage.getItem(LS_COUNT);
    const n = v == null ? 0 : Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

export function readLastDate(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(LS_LAST);
  } catch {
    return null;
  }
}

/**
 * Read current freeze count. First-ever read seeds DEFAULT_FREEZES (=2)
 * so brand-new users start with 2 freezes available.
 */
export function readFreezes(): number {
  if (typeof localStorage === 'undefined') return DEFAULT_FREEZES;
  try {
    const v = localStorage.getItem(LS_FREEZES);
    if (v == null) {
      // First-time read — seed default
      try { localStorage.setItem(LS_FREEZES, String(DEFAULT_FREEZES)); } catch {}
      return DEFAULT_FREEZES;
    }
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return DEFAULT_FREEZES;
  }
}

/**
 * Returns ISO date string of the last time updateStreak() auto-consumed
 * a freeze. Used by LessonPage CompletePanel to detect "freeze was used
 * today" and show the Mochi-saved-your-streak microcopy.
 */
export function readLastFreezeUsedDate(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(LS_LAST_FREEZE);
  } catch {
    return null;
  }
}

function writeFreezes(n: number): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_FREEZES, String(Math.max(0, Math.floor(n))));
  } catch {
    // ignore
  }
}

export interface StreakUpdateResult {
  count: number;
  freezesRemaining: number;
  /** true if a freeze was auto-consumed during this update. */
  freezeUsed: boolean;
  /** true if the streak reset (gap >= 2 and no freeze available). */
  resetOccurred: boolean;
}

/**
 * Idempotent — call as often as you like. Updates count + lastDate only
 * when the calendar day has changed. Returns detailed result so callers
 * can render "Mochi 用 freeze 幫你保住 streak" microcopy.
 */
export function updateStreak(): StreakUpdateResult {
  if (typeof localStorage === 'undefined') {
    return { count: 0, freezesRemaining: 0, freezeUsed: false, resetOccurred: false };
  }
  const today = isoDate();
  recordCheckedDay(today); // v2.0.B.483: 週曆打卡 (即使今天已計過 streak 也要記)
  const last = readLastDate();
  let count = readStreak();
  let freezes = readFreezes();
  let freezeUsed = false;
  let resetOccurred = false;

  if (!last) {
    count = 1;
  } else if (last === today) {
    // already counted, no-op (return current state)
    return { count, freezesRemaining: freezes, freezeUsed: false, resetOccurred: false };
  } else {
    const gap = daysBetween(last, today);
    if (gap === 1) {
      count += 1;
    } else if (gap >= 2 && freezes > 0) {
      // Auto-consume one freeze to preserve the streak. Mochi 幫你保住了 🧊
      freezes -= 1;
      count += 1;
      freezeUsed = true;
      writeFreezes(freezes);
      try { localStorage.setItem(LS_LAST_FREEZE, today); } catch {}
    } else {
      count = 1; // gap >= 2 with no freezes → streak broken
      resetOccurred = true;
    }
  }
  try {
    localStorage.setItem(LS_COUNT, String(count));
    localStorage.setItem(LS_LAST, today);
  } catch {
    // ignore
  }
  return { count, freezesRemaining: freezes, freezeUsed, resetOccurred };
}

/**
 * Manually grant freezes (e.g. monthly refresh, reward).
 * Caps at a soft maximum of 5 to avoid hoarding.
 */
export function addFreezes(delta: number): number {
  const current = readFreezes();
  const next = Math.min(5, current + Math.max(0, Math.floor(delta)));
  writeFreezes(next);
  return next;
}

export function resetStreak(): void {
  try {
    localStorage.removeItem(LS_COUNT);
    localStorage.removeItem(LS_LAST);
    localStorage.removeItem(LS_FREEZES);
    localStorage.removeItem(LS_LAST_FREEZE);
  } catch {
    // ignore
  }
}

export const STREAK_DEFAULTS = { DEFAULT_FREEZES } as const;

// ─── v2.0.B.483: 每日打卡記錄 + 連勝戰績週曆 ──────────────────────────────
const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六'];

export function readCheckedDays(): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LS_DAYS);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch { return new Set(); }
}

function recordCheckedDay(iso: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const days = readCheckedDays();
    if (days.has(iso)) return;
    days.add(iso);
    // 只留最近 60 天 (按日期排序後取尾端), 避免無限長。
    const trimmed = [...days].sort().slice(-60);
    localStorage.setItem(LS_DAYS, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

export interface StreakDay {
  iso: string;
  label: string;     // 週幾 (日一二三四五六)
  checked: boolean;  // 有打卡
  isToday: boolean;
  isReward: boolean; // 視窗最後一天 = 完美連勝周寶箱
}

export interface StreakWeek {
  days: StreakDay[];
  remaining: number; // 還要打卡幾天才完美 (視窗內未打卡天數)
  perfect: boolean;  // 視窗 7 天全打卡
}

/**
 * 連勝戰績頁的 7 天視窗: 今天置中 (today-3 ... today+3), 對齊截圖。
 * 已打卡 = checkedDays 命中; 未來天 = 空; 最後一格 = 完美周寶箱。
 */
export function getStreakWeek(): StreakWeek {
  const checked = readCheckedDays();
  const todayIso = isoDate();
  const base = new Date(todayIso + 'T00:00:00');
  const days: StreakDay[] = [];
  let checkedCount = 0;
  for (let offset = -3; offset <= 3; offset++) {
    const d = new Date(base);
    d.setDate(base.getDate() + offset);
    const iso = isoDate(d);
    const isChecked = checked.has(iso);
    if (isChecked) checkedCount++;
    days.push({
      iso,
      label: WEEKDAY_ZH[d.getDay()],
      checked: isChecked,
      isToday: offset === 0,
      isReward: offset === 3,
    });
  }
  return { days, remaining: Math.max(0, 7 - checkedCount), perfect: checkedCount >= 7 };
}
