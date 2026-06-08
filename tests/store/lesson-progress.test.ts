import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  readCompletedLessons,
  markLessonCompleted,
  isLessonUnlocked,
} from '../../src/store/runStore';

describe('lesson progress', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('readCompletedLessons returns empty set initially', () => {
    expect(readCompletedLessons(1).size).toBe(0);
  });

  it('markLessonCompleted persists across reads', () => {
    markLessonCompleted(1, 'kt-ch1-l3');
    const s = readCompletedLessons(1);
    expect(s.has('kt-ch1-l3')).toBe(true);
    expect(s.size).toBe(1);
  });

  // v2.0.B.261: free-select 模式 — isLessonUnlocked 永遠 true (user 「不要按順序 要用選的」)
  // 之前 B.109 線性 unlock 規則被取代, 推薦邏輯改走章末 NextStoryPicker 大數據引擎
  it('isLessonUnlocked: always returns true (free-select mode)', () => {
    expect(isLessonUnlocked(1, 1, 0)).toBe(true);
    expect(isLessonUnlocked(1, 5, 0)).toBe(true);
    expect(isLessonUnlocked(1, 10, 0)).toBe(true);
    expect(isLessonUnlocked(1, 15, 0)).toBe(true); // 之前 false, 現在 true
    expect(isLessonUnlocked(1, 24, 0)).toBe(true);
    expect(isLessonUnlocked(99, 999, 0)).toBe(true); // 任意 chapter / lesson 都 unlock
  });
});
