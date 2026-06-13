/**
 * Tests for src/data/learnLog.ts — Parent Corner data layer.
 *
 * Covers:
 *   - logLesson: appends record, caps at 300, SSR-safe
 *   - getTodayStats: aggregates today's records only (by local calendar date)
 *   - getWeekStats: last 7 days, activeDays distinct calendar days
 *   - getRecentLessons: newest-first slice
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  logLesson,
  getTodayStats,
  getWeekStats,
  getRecentLessons,
  type LearnRecord,
} from '../../src/data/learnLog';

// ─── localStorage mock ──────────────────────────────────────────────────────
const memStore: Record<string, string> = {};
const lsMock = {
  getItem:    (k: string) => memStore[k] ?? null,
  setItem:    (k: string, v: string) => { memStore[k] = v; },
  removeItem: (k: string) => { delete memStore[k]; },
  clear:      () => { Object.keys(memStore).forEach(k => delete memStore[k]); },
};

beforeEach(() => {
  Object.keys(memStore).forEach(k => delete memStore[k]);
  vi.stubGlobal('localStorage', lsMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

/** Create a minimal LearnRecord at a given Date. */
function rec(date: Date, overrides: Partial<LearnRecord> = {}): LearnRecord {
  return {
    ts: date.getTime(),
    chapter: 1,
    lessonId: 'kt-ch1-l1',
    total: 10,
    correct: 8,
    ms: 90_000,
    ...overrides,
  };
}

/** Pin system time to a specific ISO date string (local noon). */
function setDate(iso: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${iso}T12:00:00`));
}

// ─── logLesson ──────────────────────────────────────────────────────────────

describe('logLesson', () => {
  it('appends a record and can be read back via getRecentLessons', () => {
    const r = rec(new Date(), { lessonId: 'kt-ch1-l2' });
    logLesson(r);
    const recent = getRecentLessons(5);
    expect(recent.length).toBe(1);
    expect(recent[0].lessonId).toBe('kt-ch1-l2');
  });

  it('newest-first ordering in getRecentLessons', () => {
    const now = Date.now();
    logLesson(rec(new Date(now - 10_000), { lessonId: 'older' }));
    logLesson(rec(new Date(now),          { lessonId: 'newer' }));
    const recent = getRecentLessons(5);
    expect(recent[0].lessonId).toBe('newer');
    expect(recent[1].lessonId).toBe('older');
  });

  it('caps at 300 entries (drops oldest)', () => {
    // Insert 305 records
    for (let i = 0; i < 305; i++) {
      logLesson(rec(new Date(i), { lessonId: `l${i}` }));
    }
    const recent = getRecentLessons(1000); // ask for more than cap
    expect(recent.length).toBe(300);
    // Oldest (l0-l4) should be dropped; newest (l304) first
    expect(recent[0].lessonId).toBe('l304');
  });

  it('is SSR-safe: no-op when localStorage is undefined', () => {
    vi.stubGlobal('localStorage', undefined);
    // Should not throw
    expect(() => logLesson(rec(new Date()))).not.toThrow();
  });
});

// ─── getTodayStats ───────────────────────────────────────────────────────────

describe('getTodayStats', () => {
  it('returns zeros when no records exist', () => {
    setDate('2026-06-13');
    const s = getTodayStats();
    expect(s.lessons).toBe(0);
    expect(s.correct).toBe(0);
    expect(s.total).toBe(0);
    expect(s.ms).toBe(0);
  });

  it('sums only records from today (local date)', () => {
    setDate('2026-06-13');
    // Today record
    logLesson(rec(new Date('2026-06-13T10:00:00'), { correct: 7, total: 10, ms: 60_000 }));
    // Yesterday record — should be excluded
    logLesson(rec(new Date('2026-06-12T23:59:59'), { correct: 5, total: 10, ms: 50_000 }));

    const s = getTodayStats();
    expect(s.lessons).toBe(1);
    expect(s.correct).toBe(7);
    expect(s.total).toBe(10);
    expect(s.ms).toBe(60_000);
  });

  it('aggregates multiple lessons on the same day', () => {
    setDate('2026-06-13');
    logLesson(rec(new Date('2026-06-13T09:00:00'), { correct: 5, total: 8, ms: 30_000 }));
    logLesson(rec(new Date('2026-06-13T21:00:00'), { correct: 3, total: 5, ms: 20_000 }));

    const s = getTodayStats();
    expect(s.lessons).toBe(2);
    expect(s.correct).toBe(8);
    expect(s.total).toBe(13);
    expect(s.ms).toBe(50_000);
  });
});

// ─── getWeekStats ────────────────────────────────────────────────────────────

describe('getWeekStats', () => {
  it('returns zeros when no records exist', () => {
    setDate('2026-06-13');
    const s = getWeekStats();
    expect(s.lessons).toBe(0);
    expect(s.activeDays).toBe(0);
  });

  it('counts activeDays as distinct calendar days', () => {
    setDate('2026-06-13');
    // Two lessons on the same day → 1 active day
    logLesson(rec(new Date('2026-06-13T09:00:00')));
    logLesson(rec(new Date('2026-06-13T21:00:00')));
    // One lesson on another day → +1 active day
    logLesson(rec(new Date('2026-06-11T18:00:00')));

    const s = getWeekStats();
    expect(s.activeDays).toBe(2);
    expect(s.lessons).toBe(3);
  });

  it('excludes records older than 7 days', () => {
    setDate('2026-06-13');
    // 8 days ago — outside window
    const eightDaysAgo = new Date('2026-06-05T12:00:00');
    logLesson(rec(eightDaysAgo, { correct: 9, total: 10 }));
    // 6 days ago — inside window
    const sixDaysAgo = new Date('2026-06-07T12:00:00');
    logLesson(rec(sixDaysAgo, { correct: 4, total: 10 }));

    const s = getWeekStats();
    expect(s.lessons).toBe(1);
    expect(s.correct).toBe(4);
    expect(s.activeDays).toBe(1);
  });

  it('handles a full 7-day window with one lesson per day', () => {
    setDate('2026-06-13');
    // Lessons on days 13, 12, 11, 10, 9, 8, 7 (exactly 7 days back from today)
    const days = ['2026-06-13', '2026-06-12', '2026-06-11', '2026-06-10', '2026-06-09', '2026-06-08', '2026-06-07'];
    for (const d of days) {
      logLesson(rec(new Date(`${d}T12:00:00`)));
    }
    const s = getWeekStats();
    expect(s.lessons).toBe(7);
    expect(s.activeDays).toBe(7);
  });
});

// ─── getRecentLessons ────────────────────────────────────────────────────────

describe('getRecentLessons', () => {
  it('returns empty array when no data', () => {
    expect(getRecentLessons(5)).toEqual([]);
  });

  it('slices to n newest records', () => {
    for (let i = 0; i < 5; i++) {
      logLesson(rec(new Date(i * 1000), { lessonId: `l${i}` }));
    }
    const recent = getRecentLessons(3);
    expect(recent.length).toBe(3);
    // newest first: l4, l3, l2
    expect(recent[0].lessonId).toBe('l4');
    expect(recent[2].lessonId).toBe('l2');
  });

  it('returns all records when n > total', () => {
    logLesson(rec(new Date(), { lessonId: 'only' }));
    expect(getRecentLessons(50).length).toBe(1);
  });
});
