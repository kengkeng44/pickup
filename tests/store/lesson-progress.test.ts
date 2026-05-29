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

  it('isLessonUnlocked: lesson 1 always unlocked', () => {
    expect(isLessonUnlocked(1, 1, 0)).toBe(true);
  });

  it('isLessonUnlocked: lesson N unlocks after N-1 completed', () => {
    expect(isLessonUnlocked(1, 5, 4)).toBe(true);
    expect(isLessonUnlocked(1, 5, 3)).toBe(false);
  });
});
