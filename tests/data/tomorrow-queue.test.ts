/**
 * v2.0.B.239 — TomorrowQueue tests.
 *
 * Covers: read/write round-trip, idempotent consume, banner-due gating
 * (18:00 threshold), and corrupt-storage defensive paths.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  readTomorrowQueue,
  queueTomorrow,
  consumeTomorrowQueue,
  clearTomorrowQueue,
  isTomorrowBannerDue,
  nextTomorrowSlot,
  TOMORROW_QUEUE_STORAGE_KEY,
} from '../../src/data/tomorrowQueue';

describe('tomorrowQueue', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('readTomorrowQueue returns null when nothing queued', () => {
    expect(readTomorrowQueue()).toBeNull();
  });

  it('queueTomorrow persists chapter + chosenAt + scheduled', () => {
    const entry = queueTomorrow(3);
    expect(entry.chapter).toBe(3);
    expect(typeof entry.chosenAt).toBe('string');
    expect(typeof entry.scheduled).toBe('string');
    // round-trip via storage
    const raw = storage[TOMORROW_QUEUE_STORAGE_KEY];
    expect(raw).toBeDefined();
    const parsed = JSON.parse(raw);
    expect(parsed.chapter).toBe(3);
  });

  it('readTomorrowQueue echoes the queued entry', () => {
    queueTomorrow(5);
    const got = readTomorrowQueue();
    expect(got?.chapter).toBe(5);
  });

  it('queueTomorrow clobbers prior entries (single-slot policy)', () => {
    queueTomorrow(2);
    queueTomorrow(7);
    const got = readTomorrowQueue();
    expect(got?.chapter).toBe(7);
  });

  it('consumeTomorrowQueue returns the entry with consumed timestamp + clears storage', () => {
    queueTomorrow(4);
    const got = consumeTomorrowQueue();
    expect(got?.chapter).toBe(4);
    expect(typeof got?.consumed).toBe('string');
    // storage cleared
    expect(storage[TOMORROW_QUEUE_STORAGE_KEY]).toBeUndefined();
  });

  it('consumeTomorrowQueue is idempotent — second call returns null', () => {
    queueTomorrow(6);
    expect(consumeTomorrowQueue()?.chapter).toBe(6);
    expect(consumeTomorrowQueue()).toBeNull();
    expect(consumeTomorrowQueue()).toBeNull();
  });

  it('clearTomorrowQueue drops the queue silently (no-op when empty)', () => {
    expect(() => clearTomorrowQueue()).not.toThrow();
    queueTomorrow(8);
    clearTomorrowQueue();
    expect(readTomorrowQueue()).toBeNull();
  });

  it('isTomorrowBannerDue: false when no queue, even past 18:00', () => {
    const eve = new Date(2026, 5, 7, 20, 0, 0);
    expect(isTomorrowBannerDue(eve)).toBe(false);
  });

  it('isTomorrowBannerDue: false before 18:00 even with queue', () => {
    queueTomorrow(2);
    const noon = new Date(2026, 5, 7, 12, 0, 0);
    expect(isTomorrowBannerDue(noon)).toBe(false);
  });

  it('isTomorrowBannerDue: true after 18:00 with queue', () => {
    queueTomorrow(2);
    const eve = new Date(2026, 5, 7, 20, 0, 0);
    expect(isTomorrowBannerDue(eve)).toBe(true);
  });

  it('isTomorrowBannerDue: false when entry already consumed', () => {
    queueTomorrow(2);
    // Manually stamp consumed
    const raw = JSON.parse(storage[TOMORROW_QUEUE_STORAGE_KEY]);
    raw.consumed = new Date().toISOString();
    storage[TOMORROW_QUEUE_STORAGE_KEY] = JSON.stringify(raw);
    const eve = new Date(2026, 5, 7, 20, 0, 0);
    expect(isTomorrowBannerDue(eve)).toBe(false);
  });

  it('nextTomorrowSlot: returns next day 21:00 local time', () => {
    const ref = new Date(2026, 5, 7, 22, 30, 0); // 2026-06-07 22:30
    const slot = nextTomorrowSlot(ref);
    expect(slot.getFullYear()).toBe(2026);
    expect(slot.getMonth()).toBe(5);
    expect(slot.getDate()).toBe(8);
    expect(slot.getHours()).toBe(21);
    expect(slot.getMinutes()).toBe(0);
  });

  it('corrupt storage → readTomorrowQueue returns null defensively', () => {
    storage[TOMORROW_QUEUE_STORAGE_KEY] = '{not-json';
    expect(readTomorrowQueue()).toBeNull();
  });

  it('missing fields in storage → readTomorrowQueue returns null', () => {
    storage[TOMORROW_QUEUE_STORAGE_KEY] = JSON.stringify({ chapter: 3 });
    expect(readTomorrowQueue()).toBeNull();
  });
});
