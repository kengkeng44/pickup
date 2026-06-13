/**
 * 拾光 (Pickup) — Mochi Bond / 羈絆 v1 (v2.0.B.283).
 *
 * Warm relationship meter with Mochi that grows with nightly visits +
 * lesson completions. NEVER punishes breaks — opposite of streak anxiety.
 *
 * localStorage keys:
 *   pickup.bond.points    — cumulative bond points (number, never negative)
 *   pickup.bond.lastVisit — ISO date YYYY-MM-DD of last visit award
 *
 * Point rules:
 *   +10 per lesson completed (call addLessonBond())
 *   +20 first open on a new calendar day (call recordVisit() on home mount)
 *   NO decay — bond only grows.
 *
 * Stage thresholds (from BOND_COPY.stages):
 *   shy 0 / curious 50 / warming 150 / trusting 350 / family 700
 */

import { BOND_COPY } from './bondCopy';
import type { BondStage, StageKey, GreetingBucket, BilingualLine } from './bondCopy';

// ─── localStorage keys ─────────────────────────────────────────────────────

const LS_POINTS = 'pickup.bond.points';
const LS_LAST_VISIT = 'pickup.bond.lastVisit';
const EVT = 'pickup-bond-changed';

// ─── helpers ───────────────────────────────────────────────────────────────

function isoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / (24 * 60 * 60 * 1000));
}

function lsGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(key); } catch { return null; }
}

function lsSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, value); } catch { /* quota / private browsing */ }
}

function dispatch(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(EVT));
  }
}

// ─── public read API ───────────────────────────────────────────────────────

/** Current bond points (0–∞). */
export function getBondPoints(): number {
  const raw = lsGet(LS_POINTS);
  if (raw === null) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

/** Resolve which stage a given points value falls into.
 *  Defaults to current getBondPoints() when called with no argument. */
export function getStage(points?: number): BondStage {
  const pts = points ?? getBondPoints();
  // Walk stages in reverse (highest threshold first)
  const sorted = [...BOND_COPY.stages].sort((a, b) => b.threshold - a.threshold);
  for (const stage of sorted) {
    if (pts >= stage.threshold) return stage;
  }
  return BOND_COPY.stages[0]; // fallback: shy
}

/** Stage the player would reach next (null when already at max). */
export function nextStage(points?: number): BondStage | null {
  const pts = points ?? getBondPoints();
  const current = getStage(pts);
  const sorted = [...BOND_COPY.stages].sort((a, b) => a.threshold - b.threshold);
  const idx = sorted.findIndex(s => s.id === current.id);
  return idx >= 0 && idx + 1 < sorted.length ? sorted[idx + 1] : null;
}

/**
 * Fraction (0–1) of progress toward the next stage threshold.
 * Returns 1 when at max stage (family).
 */
export function stageFraction(points?: number): number {
  const pts = points ?? getBondPoints();
  const cur = getStage(pts);
  const next = nextStage(pts);
  if (!next) return 1;
  const range = next.threshold - cur.threshold;
  if (range <= 0) return 1;
  return Math.min(1, (pts - cur.threshold) / range);
}

// ─── mutation API ──────────────────────────────────────────────────────────

export interface AddLessonBondResult {
  /** New stage id (1–5) if the player crossed a threshold; null otherwise. */
  leveledUpTo: number | null;
  /** Updated points total. */
  points: number;
}

/**
 * Award +10 bond points for completing a lesson.
 * Returns the new stage id if a threshold was crossed (else null).
 * Persists + dispatches change event.
 */
export function addLessonBond(): AddLessonBondResult {
  const before = getBondPoints();
  const stageBefore = getStage(before);
  const after = before + BOND_COPY.points.perLesson;
  lsSet(LS_POINTS, String(after));
  dispatch();
  const stageAfter = getStage(after);
  const leveledUpTo = stageAfter.id !== stageBefore.id ? stageAfter.id : null;
  return { leveledUpTo, points: after };
}

export interface RecordVisitResult {
  /** Which greeting bucket applies. */
  greetingBucket: GreetingBucket;
  /** True if +20 points were awarded (new calendar day). */
  awarded: boolean;
  /** Updated points total. */
  points: number;
}

/**
 * Called once on home/map mount.
 * - Compares today vs stored lastVisit.
 * - Awards +20 on a new calendar day only.
 * - Updates lastVisit.
 * - Returns which greeting bucket applies (based on day gap).
 *
 * Bucket rules:
 *   gap === 0            → sameDay
 *   gap === 1 or 2       → nextDay   (1-2 day gap still a "next day" feel)
 *   gap >= 3 OR no prior → fewDays   (happy reunion, never guilt)
 *   first-ever visit     → sameDay
 */
export function recordVisit(): RecordVisitResult {
  const today = isoDate();
  const lastVisit = lsGet(LS_LAST_VISIT);

  // Determine bucket from gap
  let bucket: GreetingBucket = 'sameDay';
  let awarded = false;

  if (!lastVisit) {
    // First-ever visit → sameDay feel, award points
    bucket = 'sameDay';
    awarded = true;
  } else {
    const gap = daysBetween(lastVisit, today);
    if (gap === 0) {
      bucket = 'sameDay';
      awarded = false; // already got daily bonus today
    } else if (gap <= 2) {
      bucket = 'nextDay';
      awarded = true;
    } else {
      bucket = 'fewDays';
      awarded = true;
    }
  }

  // Award +20 if new day
  let points = getBondPoints();
  if (awarded) {
    points = points + BOND_COPY.points.perNewDay;
    lsSet(LS_POINTS, String(points));
  }

  // Always update lastVisit to today (idempotent on same day)
  lsSet(LS_LAST_VISIT, today);

  if (awarded) dispatch();

  return { greetingBucket: bucket, awarded, points };
}

// ─── greeting API ──────────────────────────────────────────────────────────

/**
 * Compute the current greeting bucket WITHOUT mutating state.
 * (recordVisit mutates; getGreeting only reads.)
 */
function computeBucket(): GreetingBucket {
  const lastVisit = lsGet(LS_LAST_VISIT);
  if (!lastVisit) return 'sameDay'; // no history → treat as first visit
  const today = isoDate();
  const gap = daysBetween(lastVisit, today);
  if (gap === 0) return 'sameDay';
  if (gap <= 2) return 'nextDay';
  return 'fewDays';
}

/**
 * Current stage greeting: (stage key) × (time-since-last-visit bucket).
 * Read-only — does NOT award points or update lastVisit.
 */
export function getGreeting(): BilingualLine {
  const stage = getStage();
  const bucket = computeBucket();
  return BOND_COPY.greetings[bucket][stage.key as StageKey];
}

// ─── subscription ──────────────────────────────────────────────────────────

/** Subscribe to any bond change (lesson award or new-day award). Returns unsub fn. */
export function subscribeBondChange(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
