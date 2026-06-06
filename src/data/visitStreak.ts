/**
 * v2.0.B.236 — Soft Visit Streak (自動打卡)
 *
 * 跟 streak.ts 不同:
 *   - streak.ts = 完成 lesson 才 +1 (硬目標)
 *   - visitStreak.ts = 開 app 就算今天有來 (soft visit / 自動打卡)
 *
 * 為什麼分軌:
 *   - 兒童客群:小孩開 app 但被叫去洗澡 → 沒完成 lesson 但有來
 *   - 軟硬兼施像健身房:來 + 真練 兩條獨立 streak
 *   - 失敗一條另一條撐住,**不挫敗 retention 仍存**
 *
 * localStorage keys:
 *   pickup.visit.count    — current visit streak length
 *   pickup.visit.lastDate — ISO YYYY-MM-DD of last visit
 *   pickup.visit.longest  — longest visit streak ever
 *
 * Call recordVisit() on App.tsx boot (useEffect mount only).
 * Idempotent — multiple calls same day = no-op.
 *
 * Logic:
 *   - lastDate empty → first visit, count=1
 *   - Today === lastDate → no-op (已記)
 *   - Today === lastDate + 1 → +1 (continuous)
 *   - gap >= 2 → reset to 1 (沒 freeze 機制 — soft streak 不用救)
 *
 * No freeze logic — visit streak 「軟」就是其武器:重置不痛,
 * 因為 lesson streak (硬) 還有 freeze 救。雙保險不重複。
 *
 * Microcopy on first visit of day:'今天 Mochi 看到你了 🐾 / Mochi saw you today'
 */
const LS_COUNT = 'pickup.visit.count';
const LS_LAST = 'pickup.visit.lastDate';
const LS_LONGEST = 'pickup.visit.longest';

function isoDate(d = new Date()): string {
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

export interface VisitStreakResult {
  count: number;
  /** true 表示這次呼叫是今天的第一次造訪 (可 toast 慶祝). */
  isNewVisitToday: boolean;
  longest: number;
}

export function readVisitStreak(): number {
  if (typeof localStorage === 'undefined') return 0;
  try {
    const v = localStorage.getItem(LS_COUNT);
    const n = v == null ? 0 : Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

export function readVisitLastDate(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(LS_LAST);
  } catch {
    return null;
  }
}

export function readVisitLongest(): number {
  if (typeof localStorage === 'undefined') return 0;
  try {
    const v = localStorage.getItem(LS_LONGEST);
    const n = v == null ? 0 : Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

/**
 * Idempotent. 在 App.tsx mount useEffect 內呼叫即可.
 * Returns { count, isNewVisitToday, longest } 給 toast 判斷.
 */
export function recordVisit(): VisitStreakResult {
  if (typeof localStorage === 'undefined') {
    return { count: 0, isNewVisitToday: false, longest: 0 };
  }
  const today = isoDate();
  const last = readVisitLastDate();
  let count = readVisitStreak();
  let longest = readVisitLongest();

  if (!last) {
    count = 1;
  } else if (last === today) {
    // 已記過今天 — no-op
    return { count, isNewVisitToday: false, longest };
  } else {
    const gap = daysBetween(last, today);
    if (gap === 1) {
      count += 1;
    } else {
      // gap >= 2 → reset (soft streak 不用 freeze 救, lesson streak 已有 freeze)
      count = 1;
    }
  }

  if (count > longest) longest = count;

  try {
    localStorage.setItem(LS_COUNT, String(count));
    localStorage.setItem(LS_LAST, today);
    localStorage.setItem(LS_LONGEST, String(longest));
  } catch {
    // ignore
  }

  return { count, isNewVisitToday: true, longest };
}

export function resetVisitStreak(): void {
  try {
    localStorage.removeItem(LS_COUNT);
    localStorage.removeItem(LS_LAST);
    localStorage.removeItem(LS_LONGEST);
  } catch {
    // ignore
  }
}
