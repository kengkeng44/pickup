/**
 * v2.0.B.232 招 1: streak + freeze logic.
 *
 * Covers:
 *  - First-time call seeds streak = 1 and freezes = 2.
 *  - Same-day call is idempotent (no double-increment).
 *  - Consecutive day +1.
 *  - Missed day with freeze available → auto-consumes 1, streak continues.
 *  - Missed day with zero freezes → streak resets to 1.
 *  - addFreezes() caps at 5.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('streak + freeze (招 1)', () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
    // Reset module cache so module-level paths get fresh state.
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('first-time updateStreak seeds count=1 and grants 2 freezes', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-06T10:00:00'));
    const { updateStreak, readFreezes } = await import('../../src/data/streak');

    const result = updateStreak();
    expect(result.count).toBe(1);
    expect(result.freezeUsed).toBe(false);
    expect(result.resetOccurred).toBe(false);
    expect(readFreezes()).toBe(2);
  });

  it('same-day call is idempotent', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-06T10:00:00'));
    const { updateStreak } = await import('../../src/data/streak');

    const first = updateStreak();
    const second = updateStreak();
    expect(first.count).toBe(1);
    expect(second.count).toBe(1);
    expect(second.freezeUsed).toBe(false);
  });

  it('consecutive day increments streak', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-06T10:00:00'));
    const { updateStreak } = await import('../../src/data/streak');

    updateStreak();
    vi.setSystemTime(new Date('2026-06-07T08:00:00'));
    const result = updateStreak();
    expect(result.count).toBe(2);
    expect(result.freezeUsed).toBe(false);
  });

  it('missed day auto-consumes 1 freeze (Mochi 幫你保住 streak)', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-06T10:00:00'));
    const { updateStreak, readFreezes } = await import('../../src/data/streak');

    updateStreak(); // day 1, 2 freezes
    // Skip to 2 calendar days later (missed 1 day)
    vi.setSystemTime(new Date('2026-06-08T09:00:00'));
    const result = updateStreak();

    expect(result.count).toBe(2); // streak preserved
    expect(result.freezeUsed).toBe(true);
    expect(result.freezesRemaining).toBe(1);
    expect(result.resetOccurred).toBe(false);
    expect(readFreezes()).toBe(1);
  });

  it('missed day with zero freezes resets streak (warm framing handles in UI)', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-06T10:00:00'));
    const { updateStreak, readFreezes } = await import('../../src/data/streak');

    updateStreak();              // day 1, 2 freezes
    vi.setSystemTime(new Date('2026-06-08T10:00:00'));
    updateStreak();              // missed 1, freeze→1, streak=2
    vi.setSystemTime(new Date('2026-06-10T10:00:00'));
    updateStreak();              // missed 1, freeze→0, streak=3
    vi.setSystemTime(new Date('2026-06-12T10:00:00'));
    const reset = updateStreak(); // missed 1, no freeze → reset

    expect(reset.count).toBe(1);
    expect(reset.resetOccurred).toBe(true);
    expect(reset.freezeUsed).toBe(false);
    expect(readFreezes()).toBe(0);
  });

  it('addFreezes caps at 5 to prevent hoarding', async () => {
    const { addFreezes, readFreezes } = await import('../../src/data/streak');

    readFreezes();           // seed to 2
    expect(addFreezes(2)).toBe(4);
    expect(addFreezes(10)).toBe(5); // capped
    expect(readFreezes()).toBe(5);
  });
});
