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

  // v2.0.B.473: 還原章內循序解鎖 (per user「還沒解鎖的要是灰色的」+「第一章一三節容易出問題」)。
  // lesson 解鎖 iff lessonInChapter <= totalCompleted + 1。
  it('isLessonUnlocked: sequential gating within chapter', () => {
    // 0 完成 → 只有第 1 關解鎖
    expect(isLessonUnlocked(1, 1, 0)).toBe(true);
    expect(isLessonUnlocked(1, 2, 0)).toBe(false);
    expect(isLessonUnlocked(1, 5, 0)).toBe(false);
    // 2 完成 → 第 1-3 關解鎖, 第 4 起鎖
    expect(isLessonUnlocked(1, 1, 2)).toBe(true);
    expect(isLessonUnlocked(1, 3, 2)).toBe(true);
    expect(isLessonUnlocked(1, 4, 2)).toBe(false);
    // 全完成 → 全解鎖
    expect(isLessonUnlocked(1, 7, 7)).toBe(true);
  });
});
