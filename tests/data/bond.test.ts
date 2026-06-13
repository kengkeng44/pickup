/**
 * v2.0.B.283 — Mochi Bond tests.
 *
 * Covers:
 *   - getStage: stage resolution from points
 *   - nextStage: next stage pointer + null at max
 *   - stageFraction: progress fraction
 *   - addLessonBond: +10 per call, threshold crossing detection
 *   - recordVisit: new-day +20, sameDay no award, fewDays/nextDay buckets
 *   - getBondPoints: reads 0 when cold, reads back after writes
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getBondPoints,
  getStage,
  nextStage,
  stageFraction,
  addLessonBond,
  recordVisit,
  getGreeting,
} from '../../src/data/bond';

// ─── localStorage mock (Node env has no localStorage) ──────────────────────
const memStore: Record<string, string> = {};
const localStorageMock = {
  getItem:    (k: string) => memStore[k] ?? null,
  setItem:    (k: string, v: string) => { memStore[k] = v; },
  removeItem: (k: string) => { delete memStore[k]; },
  clear:      () => { Object.keys(memStore).forEach(k => delete memStore[k]); },
};

// window.dispatchEvent mock (avoid "window is not defined" in Node)
const windowMock = {
  addEventListener:    vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent:       vi.fn(),
};

beforeEach(() => {
  memStore['pickup.bond.points'] !== undefined && delete memStore['pickup.bond.points'];
  memStore['pickup.bond.lastVisit'] !== undefined && delete memStore['pickup.bond.lastVisit'];
  Object.keys(memStore).forEach(k => delete memStore[k]);

  vi.stubGlobal('localStorage', localStorageMock);
  vi.stubGlobal('window', windowMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function setDate(iso: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(iso + 'T12:00:00'));
}

// ─── getStage ──────────────────────────────────────────────────────────────

describe('getStage', () => {
  it('returns shy at 0 points (cold start)', () => {
    expect(getStage(0).key).toBe('shy');
  });

  it('shy below first threshold (0–49)', () => {
    expect(getStage(49).key).toBe('shy');
  });

  it('curious at exactly 50', () => {
    expect(getStage(50).key).toBe('curious');
  });

  it('warming at 150', () => {
    expect(getStage(150).key).toBe('warming');
  });

  it('trusting at 350', () => {
    expect(getStage(350).key).toBe('trusting');
  });

  it('family at 700', () => {
    expect(getStage(700).key).toBe('family');
  });

  it('family at 999 (above max threshold)', () => {
    expect(getStage(999).key).toBe('family');
  });

  it('resolves from getBondPoints() when called with no arg', () => {
    localStorageMock.setItem('pickup.bond.points', '50');
    expect(getStage().key).toBe('curious');
  });
});

// ─── nextStage ─────────────────────────────────────────────────────────────

describe('nextStage', () => {
  it('shy → curious (threshold 50)', () => {
    expect(nextStage(0)?.key).toBe('curious');
  });

  it('trusting → family (threshold 700)', () => {
    expect(nextStage(350)?.key).toBe('family');
  });

  it('returns null at family (max stage)', () => {
    expect(nextStage(700)).toBeNull();
    expect(nextStage(999)).toBeNull();
  });
});

// ─── stageFraction ─────────────────────────────────────────────────────────

describe('stageFraction', () => {
  it('returns 0 at stage floor', () => {
    expect(stageFraction(0)).toBe(0);   // shy floor
    expect(stageFraction(50)).toBe(0);  // curious floor
  });

  it('returns 0.5 halfway through curious (50–150)', () => {
    // 50 pts into 100-pt range = 0.5
    expect(stageFraction(100)).toBeCloseTo(0.5);
  });

  it('returns 1 at max stage (family)', () => {
    expect(stageFraction(700)).toBe(1);
    expect(stageFraction(999)).toBe(1);
  });
});

// ─── addLessonBond ─────────────────────────────────────────────────────────

describe('addLessonBond', () => {
  it('starts at 0, after 1 lesson = 10', () => {
    const result = addLessonBond();
    expect(result.points).toBe(10);
    expect(result.leveledUpTo).toBeNull();
  });

  it('crosses shy→curious threshold at 50 points (5 lessons)', () => {
    // Add 4 lessons → 40 pts, no stage up
    addLessonBond(); addLessonBond(); addLessonBond(); addLessonBond();
    // 5th lesson → 50 pts, should cross into curious (id=2)
    const result = addLessonBond();
    expect(result.points).toBe(50);
    expect(result.leveledUpTo).toBe(2); // curious.id === 2
  });

  it('does NOT return leveledUpTo on subsequent calls within same stage', () => {
    // Already at 50 after 5 calls above — fresh test, so 0 start
    // 5 lessons → curious; 6th lesson still curious
    for (let i = 0; i < 5; i++) addLessonBond();
    const result = addLessonBond(); // 6th → 60pts, still curious
    expect(result.leveledUpTo).toBeNull();
  });

  it('persists points to localStorage', () => {
    addLessonBond();
    expect(localStorageMock.getItem('pickup.bond.points')).toBe('10');
  });

  it('accumulates correctly across multiple calls', () => {
    for (let i = 0; i < 10; i++) addLessonBond();
    expect(getBondPoints()).toBe(100);
  });
});

// ─── recordVisit ───────────────────────────────────────────────────────────

describe('recordVisit', () => {
  it('first-ever visit: sameDay bucket, +20 awarded', () => {
    setDate('2026-06-13');
    const result = recordVisit();
    expect(result.greetingBucket).toBe('sameDay');
    expect(result.awarded).toBe(true);
    expect(result.points).toBe(20);
  });

  it('same-day revisit: sameDay bucket, no points awarded', () => {
    setDate('2026-06-13');
    recordVisit();
    const result = recordVisit(); // same day
    expect(result.greetingBucket).toBe('sameDay');
    expect(result.awarded).toBe(false);
    expect(result.points).toBe(20); // unchanged
  });

  it('1-day gap: nextDay bucket, +20 awarded', () => {
    setDate('2026-06-12');
    recordVisit();
    setDate('2026-06-13');
    const result = recordVisit();
    expect(result.greetingBucket).toBe('nextDay');
    expect(result.awarded).toBe(true);
    expect(result.points).toBe(40); // 20 + 20
  });

  it('2-day gap: nextDay bucket, +20 awarded', () => {
    setDate('2026-06-11');
    recordVisit();
    setDate('2026-06-13');
    const result = recordVisit();
    expect(result.greetingBucket).toBe('nextDay');
    expect(result.awarded).toBe(true);
  });

  it('3+ day gap: fewDays bucket (happy reunion, no guilt), +20 awarded', () => {
    setDate('2026-06-01');
    recordVisit();
    setDate('2026-06-10'); // 9 days gap
    const result = recordVisit();
    expect(result.greetingBucket).toBe('fewDays');
    expect(result.awarded).toBe(true);
  });

  it('points never go negative after long gap (no decay)', () => {
    setDate('2026-06-01');
    for (let i = 0; i < 5; i++) addLessonBond(); // 50 pts
    setDate('2026-06-01');
    recordVisit(); // 70 pts
    setDate('2026-07-01'); // 30 day gap
    const result = recordVisit();
    expect(result.points).toBeGreaterThanOrEqual(70); // bond only grows
  });

  it('updates lastVisit in localStorage', () => {
    setDate('2026-06-13');
    recordVisit();
    expect(localStorageMock.getItem('pickup.bond.lastVisit')).toBe('2026-06-13');
  });
});

// ─── getGreeting ───────────────────────────────────────────────────────────

describe('getGreeting', () => {
  it('returns a zh + en line for current state', () => {
    const g = getGreeting();
    expect(typeof g.zh).toBe('string');
    expect(typeof g.en).toBe('string');
    expect(g.zh.length).toBeGreaterThan(0);
    expect(g.en.length).toBeGreaterThan(0);
  });

  it('cold start returns shy sameDay greeting', () => {
    const g = getGreeting();
    // Should match shy/sameDay from bondCopy
    expect(g.zh).toBe('糰糰在牆角偷偷看你');
  });
});
