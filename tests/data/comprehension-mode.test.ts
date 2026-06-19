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
  toggleComprehensionMode,
  subscribeComprehensionMode,
} from '../../src/data/comprehensionMode';

describe('comprehensionMode global switch (理解選擇 merge)', () => {
  beforeEach(() => localStorage.clear());

  it("defaults to 'listen'", () => {
    expect(getComprehensionMode()).toBe('listen');
  });

  it('persists set value to localStorage', () => {
    setComprehensionMode('read');
    expect(getComprehensionMode()).toBe('read');
    expect(localStorage.getItem('pickup.comprehensionMode')).toBe('read');
  });

  it('toggle flips listen <-> read', () => {
    expect(toggleComprehensionMode()).toBe('read');
    expect(toggleComprehensionMode()).toBe('listen');
  });

  it('falls back to default for garbage values', () => {
    localStorage.setItem('pickup.comprehensionMode', 'nonsense');
    expect(getComprehensionMode()).toBe('listen');
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
});
