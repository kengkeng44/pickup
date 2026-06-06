/**
 * v2.0.B.236 — Visit Streak tests (Track A 自動打卡)
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  recordVisit,
  readVisitStreak,
  readVisitLastDate,
  readVisitLongest,
  resetVisitStreak,
} from '../../src/data/visitStreak';

// localStorage polyfill (Node env)
const memStore: Record<string, string> = {};
const localStorageMock = {
  getItem: (k: string) => memStore[k] ?? null,
  setItem: (k: string, v: string) => { memStore[k] = v; },
  removeItem: (k: string) => { delete memStore[k]; },
  clear: () => { Object.keys(memStore).forEach(k => delete memStore[k]); },
};

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });
  localStorageMock.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

function setDate(iso: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(iso + 'T12:00:00'));
}

describe('visitStreak', () => {
  it('first visit: count = 1, isNewVisitToday = true', () => {
    setDate('2026-06-06');
    const r = recordVisit();
    expect(r.count).toBe(1);
    expect(r.isNewVisitToday).toBe(true);
    expect(r.longest).toBe(1);
  });

  it('same day re-visit: no-op, isNewVisitToday = false', () => {
    setDate('2026-06-06');
    recordVisit();
    const r = recordVisit();
    expect(r.count).toBe(1);
    expect(r.isNewVisitToday).toBe(false);
  });

  it('consecutive days +1', () => {
    setDate('2026-06-06');
    recordVisit();
    setDate('2026-06-07');
    const r = recordVisit();
    expect(r.count).toBe(2);
    expect(r.isNewVisitToday).toBe(true);
  });

  it('gap of 2+ days resets to 1 (no freeze for soft streak)', () => {
    setDate('2026-06-06');
    recordVisit();
    setDate('2026-06-09'); // gap = 3
    const r = recordVisit();
    expect(r.count).toBe(1);
    expect(r.isNewVisitToday).toBe(true);
  });

  it('longest tracked across resets', () => {
    setDate('2026-06-01');
    recordVisit();
    setDate('2026-06-02');
    recordVisit();
    setDate('2026-06-03');
    recordVisit(); // streak = 3, longest = 3
    setDate('2026-06-10'); // gap 7 → reset
    const r = recordVisit();
    expect(r.count).toBe(1);
    expect(r.longest).toBe(3); // 保留歷史最長
  });

  it('readVisitStreak returns 0 when nothing stored', () => {
    expect(readVisitStreak()).toBe(0);
    expect(readVisitLastDate()).toBeNull();
    expect(readVisitLongest()).toBe(0);
  });

  it('resetVisitStreak clears state', () => {
    setDate('2026-06-06');
    recordVisit();
    resetVisitStreak();
    expect(readVisitStreak()).toBe(0);
    expect(readVisitLastDate()).toBeNull();
    expect(readVisitLongest()).toBe(0);
  });
});
