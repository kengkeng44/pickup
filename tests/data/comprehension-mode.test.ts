import { describe, it, expect, beforeEach } from 'vitest';

// minimal localStorage + window shim (node env; mirrors lesson-progress.test.ts)
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
if (typeof (globalThis as { window?: unknown }).window === 'undefined') {
  (globalThis as { window: unknown }).window = new EventTarget();
}

import {
  getComprehensionMode,
  setComprehensionMode,
  resolveComprehension,
  subscribeComprehensionMode,
  setRunComprehensionOverride,
  readLessonCompMode,
  writeLessonCompMode,
} from '../../src/data/comprehensionMode';

describe('comprehensionMode global switch (理解選擇 merge)', () => {
  beforeEach(() => localStorage.clear());

  it("defaults to 'auto'", () => {
    expect(getComprehensionMode()).toBe('auto');
  });

  it('persists set value to localStorage', () => {
    setComprehensionMode('read');
    expect(getComprehensionMode()).toBe('read');
    expect(localStorage.getItem('pickup.comprehensionMode')).toBe('read');
  });

  it('falls back to default for garbage values', () => {
    localStorage.setItem('pickup.comprehensionMode', 'nonsense');
    expect(getComprehensionMode()).toBe('auto');
  });

  it('notifies subscribers on change, stops after unsubscribe', () => {
    let hits = 0;
    const off = subscribeComprehensionMode(() => { hits++; });
    setComprehensionMode('read');
    setComprehensionMode('listen');
    off();
    setComprehensionMode('read'); // after unsubscribe — should not fire
    expect(hits).toBe(2);
  });

  describe('resolveComprehension (auto = 跟著難度鷹架)', () => {
    it('manual listen/read overrides difficulty', () => {
      setComprehensionMode('listen');
      localStorage.setItem('pickup.difficulty', 'easy');
      expect(resolveComprehension('any-id')).toBe('listen');
      setComprehensionMode('read');
      localStorage.setItem('pickup.difficulty', 'hard');
      expect(resolveComprehension('any-id')).toBe('read');
    });

    it('auto: easy → read, hard → listen', () => {
      setComprehensionMode('auto');
      localStorage.setItem('pickup.difficulty', 'easy');
      expect(resolveComprehension('kt-ch1-l1-q6')).toBe('read');
      localStorage.setItem('pickup.difficulty', 'hard');
      expect(resolveComprehension('kt-ch1-l1-q6')).toBe('listen');
    });

    it('auto + medium → deterministic mix (same id stable, ~1/3 read)', () => {
      setComprehensionMode('auto');
      localStorage.setItem('pickup.difficulty', 'medium');
      const r1 = resolveComprehension('kt-ch1-l1-q6');
      const r2 = resolveComprehension('kt-ch1-l1-q6');
      expect(r1).toBe(r2); // stable per id
      const modes = Array.from({ length: 60 }, (_, i) => resolveComprehension(`q-${i}`));
      const reads = modes.filter((m) => m === 'read').length;
      expect(reads).toBeGreaterThan(0);    // 有讀
      expect(reads).toBeLessThan(modes.length); // 也有聽 (混合)
    });
  });
});

// v2.0.B.484: 閱讀/聽力 per-run override + per-lesson 記憶 (重現挑戰沿用當初模式)。
describe('comprehensionMode — run override + per-lesson memory', () => {
  beforeEach(() => { localStorage.clear(); setRunComprehensionOverride(null); });

  it('run override 優先於全域開關', () => {
    setComprehensionMode('read');           // 全域=讀
    setRunComprehensionOverride('listen');   // 但這個 run 玩家選了聽
    expect(resolveComprehension('q1')).toBe('listen');
  });

  it('清掉 override 後回到全域開關', () => {
    setComprehensionMode('read');
    setRunComprehensionOverride('listen');
    setRunComprehensionOverride(null);
    expect(resolveComprehension('q1')).toBe('read');
  });

  it('per-lesson 模式 round-trip (重現挑戰沿用)', () => {
    expect(readLessonCompMode('kt-ch1-l3')).toBe(null);
    writeLessonCompMode('kt-ch1-l3', 'listen');
    expect(readLessonCompMode('kt-ch1-l3')).toBe('listen');
    writeLessonCompMode('kt-ch1-l3', 'read');
    expect(readLessonCompMode('kt-ch1-l3')).toBe('read');
  });
});
