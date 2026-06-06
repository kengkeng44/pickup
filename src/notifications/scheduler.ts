/**
 * v2.0.B.232 (2026-06-06) — Client-side notification scheduler (P0).
 *
 * Source-of-truth: docs/research/notification-design.md § B3.
 *
 * Strategy:
 *   - setTimeout-based local push via Notification API
 *   - No server, no VAPID, no service worker push subscription
 *   - Persists to localStorage `pickup.notifs.scheduled[]` so survive reload
 *   - On app boot, replay due ones + reschedule pending ones
 *
 * Limits (per research):
 *   - iOS Safari: only fires if PWA is installed (iOS 16.4+)
 *   - Chrome / Edge / Firefox: works in normal browser context
 *   - Hard requirement: Notification.permission === 'granted' AND hasConsent()
 *
 * IMPORTANT: scheduleAll() is NOT auto-invoked. LessonPage owner agent
 * decides the hook-up point. See index.ts.
 */
import type { NotifKind, Scheduled, Notif } from './types';
import { pickVariant } from './copy';
import { hasNotificationConsent } from './consent';

const STORAGE_KEY = 'pickup.notifs.scheduled';
const HISTORY_KEY = 'pickup.notifs.history';

// In-memory timer registry — id → setTimeout handle
const timers = new Map<string, ReturnType<typeof setTimeout>>();

// ──────────────────────────────────────────────────────────────────────
// Persistence
// ──────────────────────────────────────────────────────────────────────

function loadScheduled(): Scheduled[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isScheduled);
  } catch {
    return [];
  }
}

function saveScheduled(list: Scheduled[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage write fail — silent, scheduler degrades to in-memory only
  }
}

function isScheduled(v: unknown): v is Scheduled {
  if (!v || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string'
    && typeof o.kind === 'string'
    && typeof o.fireAtIso === 'string'
    && typeof o.tag === 'string';
}

/**
 * Append a fired notif to history (for analytics + week-cap calc).
 * Trimmed to last 100 entries to keep localStorage footprint bounded.
 */
function appendHistory(entry: { id: string; kind: NotifKind; firedAtIso: string }): void {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
    const list = Array.isArray(arr) ? arr : [];
    list.push(entry);
    const trimmed = list.slice(-100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {}
}

// ──────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────

/**
 * Schedule a notif of given kind to fire at `when`. Dedupes by tag —
 * same tag replaces existing.
 *
 * ctx.chapter resolves to chapter-specific copy variant (see copy.ts).
 */
export function scheduleNotif(
  kind: NotifKind,
  when: Date,
  ctx: { chapter?: number | null; tag?: string } = {}
): string | null {
  if (!canSchedule()) return null;

  const id = generateId();
  const chapter = ctx.chapter ?? null;
  const tag = ctx.tag ?? `${kind}-${chapter ?? 'g'}`;

  // Drop pre-existing scheduled with same tag.
  cancelByTag(tag);

  const record: Scheduled = {
    id,
    kind,
    fireAtIso: when.toISOString(),
    chapter,
    tag,
  };

  const list = loadScheduled();
  list.push(record);
  saveScheduled(list);

  armTimer(record);
  return id;
}

/**
 * Cancel by scheduled id. Returns true if cancelled.
 */
export function cancelNotif(id: string): boolean {
  const handle = timers.get(id);
  if (handle) {
    clearTimeout(handle);
    timers.delete(id);
  }

  const list = loadScheduled();
  const idx = list.findIndex(s => s.id === id);
  if (idx < 0) return false;
  list.splice(idx, 1);
  saveScheduled(list);
  return true;
}

/**
 * Cancel all scheduled records sharing a tag. Used internally for dedupe
 * + exposed for explicit "user toggled off this kind" flows.
 */
export function cancelByTag(tag: string): number {
  const list = loadScheduled();
  const removed = list.filter(s => s.tag === tag);
  for (const r of removed) {
    const handle = timers.get(r.id);
    if (handle) {
      clearTimeout(handle);
      timers.delete(r.id);
    }
  }
  const remaining = list.filter(s => s.tag !== tag);
  saveScheduled(remaining);
  return removed.length;
}

/**
 * Return all currently-scheduled records (sorted by fireAtIso asc).
 */
export function listScheduled(): Scheduled[] {
  return [...loadScheduled()].sort((a, b) => a.fireAtIso.localeCompare(b.fireAtIso));
}

/**
 * Replay scheduler: on app boot, fire any past-due ones immediately,
 * arm timers for pending ones.
 *
 * Call this from LessonPage / App boot AFTER consent confirmed.
 * NOT auto-invoked on module import.
 */
export function bootScheduler(): void {
  if (!canSchedule()) return;

  const now = Date.now();
  const list = loadScheduled();
  const stillPending: Scheduled[] = [];

  for (const r of list) {
    const fireAt = new Date(r.fireAtIso).getTime();
    if (Number.isNaN(fireAt)) continue;

    if (fireAt <= now) {
      // Past-due — fire immediately (caps suspended for replay).
      fireNotif(r);
    } else {
      stillPending.push(r);
      armTimer(r);
    }
  }

  saveScheduled(stillPending);
}

/**
 * Clear ALL scheduled + history. Used by Profile-tab "disable all
 * Mochi messages" toggle.
 */
export function clearAllScheduled(): void {
  for (const handle of timers.values()) clearTimeout(handle);
  timers.clear();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

/**
 * Read history (for week-cap calc in triggers.ts caller layer).
 */
export function getHistory(): Array<{ id: string; kind: NotifKind; firedAtIso: string }> {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr.filter((v): v is { id: string; kind: NotifKind; firedAtIso: string } => {
      if (!v || typeof v !== 'object') return false;
      const o = v as Record<string, unknown>;
      return typeof o.id === 'string' && typeof o.kind === 'string' && typeof o.firedAtIso === 'string';
    });
  } catch {
    return [];
  }
}

// ──────────────────────────────────────────────────────────────────────
// Internals
// ──────────────────────────────────────────────────────────────────────

function canSchedule(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof Notification === 'undefined') return false;
  if (Notification.permission !== 'granted') return false;
  if (!hasNotificationConsent()) return false;
  return true;
}

function armTimer(record: Scheduled): void {
  const delay = Math.max(0, new Date(record.fireAtIso).getTime() - Date.now());
  // setTimeout max delay ~24.8 days (2^31-1 ms). Past-due records fire
  // instantly on boot. Records >24d out are clamped to ~24d — bootScheduler
  // re-arms each app open, so re-clamping is fine.
  const safeDelay = Math.min(delay, 2_000_000_000);
  const handle = setTimeout(() => fireNotif(record), safeDelay);
  timers.set(record.id, handle);
}

function fireNotif(record: Scheduled): void {
  // Re-check consent at fire time (user may have revoked).
  if (!canSchedule()) {
    removeFromStorage(record.id);
    return;
  }

  const copy = pickVariant(record.kind, {
    chapter: record.chapter ?? undefined,
    seed: new Date(record.fireAtIso).getTime(),
  });

  const notif: Notif = {
    id: record.id,
    kind: record.kind,
    copy,
    tag: record.tag,
    deepLink: '', // P0: scheduler-layer not deeplink-aware yet
  };

  try {
    // Notification API: title = zh (primary line), body = en (secondary).
    // tag dedupes — same tag in OS notification tray replaces prior.
    new Notification(notif.copy.zh, {
      body: notif.copy.en,
      icon: '/mascots/calico-anchor.webp',
      badge: '/favicon.svg',
      tag: notif.tag,
    });
  } catch {
    // iOS Safari throws if not in PWA — silent fail.
  }

  appendHistory({
    id: record.id,
    kind: record.kind,
    firedAtIso: new Date().toISOString(),
  });

  removeFromStorage(record.id);
}

function removeFromStorage(id: string): void {
  const list = loadScheduled();
  const remaining = list.filter(s => s.id !== id);
  saveScheduled(remaining);
  timers.delete(id);
}

function generateId(): string {
  return 'n-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
