import { describe, it, expect, beforeEach } from 'vitest';
import {
  lessonResumeKey,
  readSavedIdx,
  hasInProgress,
  clearSavedProgress,
  getInProgressLessonIds,
} from '../../src/data/lessonProgress';

// minimal localStorage shim (jsdom usually provides one; guard for node env)
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as { localStorage: unknown }).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() { return store.size; },
  };
}

const save = (chapter: number | string, lessonId: string, idx: number) =>
  localStorage.setItem(lessonResumeKey(chapter, lessonId), JSON.stringify({ idx }));

describe('lessonProgress', () => {
  beforeEach(() => localStorage.clear());

  it('key is stable across string/number chapter', () => {
    expect(lessonResumeKey(1, 'kt-ch1-l3')).toBe('pickup.lesson.resume.ch1.kt-ch1-l3');
    expect(lessonResumeKey('1', 'kt-ch1-l3')).toBe(lessonResumeKey(1, 'kt-ch1-l3'));
  });

  it('readSavedIdx returns 0 when absent / idx 0 / malformed', () => {
    expect(readSavedIdx(1, 'kt-ch1-l1')).toBe(0);
    save(1, 'kt-ch1-l1', 0);
    expect(readSavedIdx(1, 'kt-ch1-l1')).toBe(0);
    localStorage.setItem(lessonResumeKey(1, 'kt-ch1-l1'), 'not-json');
    expect(readSavedIdx(1, 'kt-ch1-l1')).toBe(0);
  });

  it('readSavedIdx / hasInProgress report a started lesson', () => {
    save(1, 'kt-ch1-l5', 4);
    expect(readSavedIdx(1, 'kt-ch1-l5')).toBe(4);
    expect(hasInProgress(1, 'kt-ch1-l5')).toBe(true);
    expect(hasInProgress(1, 'kt-ch1-l6')).toBe(false);
  });

  it('clearSavedProgress removes the entry', () => {
    save(1, 'kt-ch1-l5', 4);
    clearSavedProgress(1, 'kt-ch1-l5');
    expect(hasInProgress(1, 'kt-ch1-l5')).toBe(false);
  });

  it('getInProgressLessonIds returns only idx>0 lessonIds, ignores other keys', () => {
    save(1, 'kt-ch1-l2', 3);   // in progress
    save(2, 'kt-ch2-l7', 1);   // in progress (other chapter)
    save(1, 'kt-ch1-l9', 0);   // started=0 → not in progress
    localStorage.setItem('pickup.streak.count', '5'); // unrelated key
    const ids = getInProgressLessonIds();
    expect(ids.has('kt-ch1-l2')).toBe(true);
    expect(ids.has('kt-ch2-l7')).toBe(true);
    expect(ids.has('kt-ch1-l9')).toBe(false);
    expect(ids.size).toBe(2);
  });
});
