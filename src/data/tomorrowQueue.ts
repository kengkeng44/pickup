/**
 * v2.0.B.239 — TomorrowQueue (NextStoryPicker "明晚聽" persistence).
 *
 * Stores the chapter the user picked at the end of a chapter completion so
 * the next time they open the app, MapPage can surface a "Mochi 記得了"
 * banner that deep-links straight into the queued story.
 *
 * Behavior contract (per NextStoryPicker spec):
 *   - queueTomorrow(chapter): clobbers any existing queue with a fresh entry.
 *     scheduled = next day 21:00 local time. Returns the persisted entry.
 *   - readTomorrowQueue(): returns the queued entry or null. Pure-read.
 *   - consumeTomorrowQueue(): marks the queue consumed (stamps `consumed`
 *     ISO + clears the queue from localStorage). Returns the entry that was
 *     consumed, or null when nothing was queued. Idempotent — second call
 *     returns null because the queue is already cleared.
 *   - clearTomorrowQueue(): silently drops the queue. No-op if empty.
 *
 * Storage key: 'pickup.tomorrow.queued'. Single-slot (the latest pick wins).
 *
 * Pure persistence, no UI side effects. NotifConsentPrompt + scheduleNotif
 * are the caller's responsibility — this module just remembers the choice.
 */

export interface TomorrowQueueEntry {
  /** Chapter number the user picked at the picker. */
  chapter: number;
  /** ISO timestamp the user made the pick. */
  chosenAt: string;
  /** ISO timestamp for the next-day 21:00 local-time notification slot. */
  scheduled: string;
  /** ISO timestamp the user actually opened the queued story. Optional. */
  consumed?: string;
}

const STORAGE_KEY = 'pickup.tomorrow.queued';

function isLocalStorageAvailable(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function safeRead(): TomorrowQueueEntry | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const o = parsed as Record<string, unknown>;
    const chapter = Number(o.chapter);
    const chosenAt = typeof o.chosenAt === 'string' ? o.chosenAt : null;
    const scheduled = typeof o.scheduled === 'string' ? o.scheduled : null;
    if (!Number.isFinite(chapter) || chosenAt == null || scheduled == null) {
      return null;
    }
    const entry: TomorrowQueueEntry = {
      chapter: Math.floor(chapter),
      chosenAt,
      scheduled,
    };
    if (typeof o.consumed === 'string') entry.consumed = o.consumed;
    return entry;
  } catch {
    return null;
  }
}

function safeWrite(entry: TomorrowQueueEntry | null): void {
  if (!isLocalStorageAvailable()) return;
  try {
    if (entry == null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    }
  } catch {
    // ignore — quota / private-mode
  }
}

/**
 * Compute the next-day 21:00 local time as an ISO string. Exposed so callers
 * (and tests) can predict scheduling without re-implementing the rule.
 */
export function nextTomorrowSlot(from: Date = new Date()): Date {
  const next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 21, 0, 0, 0);
  return next;
}

/** Pure-read. Returns null when no queue is set or storage missing. */
export function readTomorrowQueue(): TomorrowQueueEntry | null {
  return safeRead();
}

/**
 * Persist the chapter pick. Clobbers any prior queue (single-slot policy).
 * Returns the persisted entry so the caller can echo it back into UI state.
 */
export function queueTomorrow(chapter: number): TomorrowQueueEntry {
  const now = new Date();
  const slot = nextTomorrowSlot(now);
  const entry: TomorrowQueueEntry = {
    chapter: Math.floor(chapter),
    chosenAt: now.toISOString(),
    scheduled: slot.toISOString(),
  };
  safeWrite(entry);
  return entry;
}

/**
 * Mark the queued story as opened. Returns the entry that was consumed,
 * with `consumed` ISO stamped, or null when nothing was queued.
 *
 * Idempotent: a second call returns null because the queue was cleared on
 * the first call. This is intentional — MapPage calls this on banner tap
 * and shouldn't re-fire it on remount.
 */
export function consumeTomorrowQueue(): TomorrowQueueEntry | null {
  const entry = safeRead();
  if (!entry) return null;
  const consumed: TomorrowQueueEntry = {
    ...entry,
    consumed: new Date().toISOString(),
  };
  // Clear from storage — consumer logic relies on idempotency here.
  safeWrite(null);
  return consumed;
}

/** Drop the queue. No-op when nothing is queued. */
export function clearTomorrowQueue(): void {
  safeWrite(null);
}

/**
 * Check whether the queue should be surfaced as a banner now. Per spec:
 * banner shows when an entry exists AND now is past 18:00 local time.
 * Pure-read helper used by MapPage.
 */
export function isTomorrowBannerDue(now: Date = new Date()): boolean {
  const entry = safeRead();
  if (!entry) return false;
  if (entry.consumed) return false;
  return now.getHours() >= 18;
}

export const TOMORROW_QUEUE_STORAGE_KEY = STORAGE_KEY;
