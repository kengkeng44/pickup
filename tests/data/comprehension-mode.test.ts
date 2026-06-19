import { describe, it, expect, beforeEach } from 'vitest';

// minimal localStorage shim (node env — vitest.config environment: 'node')
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
// minimal window shim for dispatchEvent / addEventListener (Event constructor)
if (typeof globalThis.window === 'undefined') {
  const listeners = new Map<string, Set<() => void>>();
  (globalThis as { Event: unknown }).Event = class { type: string; constructor(t: string) { this.type = t; } };
  (globalThis as { window: unknown }).window = {
    addEventListener: (t: string, cb: () => void) => {
      if (!listeners.has(t)) listeners.set(t, new Set());
      listeners.get(t)!.add(cb);
    },
    removeEventListener: (t: string, cb: () => void) => listeners.get(t)?.delete(cb),
    dispatchEvent: (e: { type: string }) => { listeners.get(e.type)?.forEach((cb) => cb()); return true; },
  };
}

import {
  getComprehensionMode,
  setComprehensionMode,
  toggleComprehensionMode,
  subscribeComprehensionMode,
} from '../../src/data/comprehensionModeSetting';

describe('comprehensionModeSetting', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to listen when unset', () => {
    expect(getComprehensionMode()).toBe('listen');
  });

  it('persists read / listen', () => {
    setComprehensionMode('read');
    expect(getComprehensionMode()).toBe('read');
    expect(localStorage.getItem('pickup.comprehension.mode')).toBe('read');
    setComprehensionMode('listen');
    expect(getComprehensionMode()).toBe('listen');
  });

  it('toggle flips and returns next', () => {
    expect(getComprehensionMode()).toBe('listen');
    expect(toggleComprehensionMode()).toBe('read');
    expect(getComprehensionMode()).toBe('read');
    expect(toggleComprehensionMode()).toBe('listen');
  });

  it('any non-read value reads back as listen', () => {
    localStorage.setItem('pickup.comprehension.mode', 'garbage');
    expect(getComprehensionMode()).toBe('listen');
  });

  it('subscribe fires on change and unsubscribes', () => {
    let hits = 0;
    const unsub = subscribeComprehensionMode(() => { hits += 1; });
    setComprehensionMode('read');
    setComprehensionMode('listen');
    expect(hits).toBe(2);
    unsub();
    setComprehensionMode('read');
    expect(hits).toBe(2);
  });
});
