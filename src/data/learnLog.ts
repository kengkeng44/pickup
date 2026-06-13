/**
 * 拾光 (Pickup) — Learning history log (Parent Corner data layer).
 *
 * Persists to localStorage key `pickup.learnLog` as a JSON array.
 * Capped at 300 entries (oldest dropped first).
 *
 * Used by:
 *   - src/react-app/pages/ParentPage.tsx — 今晚 / 本週 stats display
 *   - src/react-app/pages/LessonPage.tsx CompletePanel — fires logLesson()
 */

export interface LearnRecord {
  /** Unix timestamp (ms) when the lesson was completed. */
  ts: number;
  /** Chapter number (1-based). */
  chapter: number;
  /** Lesson ID, e.g. 'kt-ch1-l1'. */
  lessonId: string;
  /** Total questions in the lesson. */
  total: number;
  /** Number of correct (first-attempt) answers. */
  correct: number;
  /** Elapsed time in milliseconds. */
  ms: number;
}

const LS_KEY = 'pickup.learnLog';
const CAP = 300;

// ─── helpers ───────────────────────────────────────────────────────────────

function isoLocalDate(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayIso(): string {
  return isoLocalDate(Date.now());
}

function readAll(): LearnRecord[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as LearnRecord[];
  } catch {
    return [];
  }
}

function writeAll(records: LearnRecord[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(records));
  } catch {
    // quota / private browsing — silently ignore
  }
}

// ─── public write API ──────────────────────────────────────────────────────

/**
 * Append a completed lesson record. Caps at 300 (drops oldest).
 * SSR-safe: no-op if localStorage is unavailable.
 */
export function logLesson(rec: LearnRecord): void {
  try {
    const all = readAll();
    all.push(rec);
    // Drop oldest if over cap
    const capped = all.length > CAP ? all.slice(all.length - CAP) : all;
    writeAll(capped);
  } catch {
    // never throws to caller
  }
}

// ─── public read API ───────────────────────────────────────────────────────

export interface DayStats {
  /** Number of lessons completed. */
  lessons: number;
  /** Total correct answers. */
  correct: number;
  /** Total questions answered. */
  total: number;
  /** Total elapsed time in milliseconds. */
  ms: number;
}

/** Stats for today (local calendar day). */
export function getTodayStats(): DayStats {
  const today = todayIso();
  const records = readAll().filter(r => isoLocalDate(r.ts) === today);
  return aggregate(records);
}

export interface WeekStats {
  /** Number of lessons completed in last 7 days. */
  lessons: number;
  /** Total correct answers. */
  correct: number;
  /** Total questions answered. */
  total: number;
  /** Total elapsed time in milliseconds. */
  ms: number;
  /** Number of distinct calendar days with at least 1 lesson completed. */
  activeDays: number;
}

/**
 * Stats for the last 7 calendar days (inclusive of today).
 * "Last 7 days" = today + 6 prior days.
 */
export function getWeekStats(): WeekStats {
  const now = Date.now();
  const cutoff = now - 7 * 24 * 60 * 60 * 1000;
  const records = readAll().filter(r => r.ts >= cutoff);
  const base = aggregate(records);
  const activeDaySet = new Set(records.map(r => isoLocalDate(r.ts)));
  return { ...base, activeDays: activeDaySet.size };
}

/**
 * Last `n` records, newest first.
 */
export function getRecentLessons(n: number): LearnRecord[] {
  const all = readAll();
  return all.slice().reverse().slice(0, n);
}

// ─── internal ──────────────────────────────────────────────────────────────

function aggregate(records: LearnRecord[]): DayStats {
  return records.reduce<DayStats>(
    (acc, r) => ({
      lessons: acc.lessons + 1,
      correct: acc.correct + r.correct,
      total: acc.total + r.total,
      ms: acc.ms + r.ms,
    }),
    { lessons: 0, correct: 0, total: 0, ms: 0 },
  );
}
