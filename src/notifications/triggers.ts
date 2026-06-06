/**
 * v2.0.B.232 (2026-06-06) — Trigger evaluation (pure functions).
 *
 * Source-of-truth: docs/research/notification-design.md § B1.
 * Pure data in (TriggerContext) → pending Notif intents out. Easy to test,
 * no side effects, no DOM, no localStorage.
 *
 * Each evaluator returns null (no fire) or { kind, fireAt, chapter, tag }.
 * scheduler.ts is responsible for resolving copy + dedupe via tag.
 */
import type { NotifKind, TriggerContext } from './types';

export interface TriggerIntent {
  kind: NotifKind;
  fireAt: Date;
  chapter: number | null;
  tag: string;
}

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** LinkedIn 2019 paper threshold — research § A3. */
const WEEKLY_NOTIF_CAP = 2;

// ──────────────────────────────────────────────────────────────────────
// Individual evaluators (each handles exactly one NotifKind)
// ──────────────────────────────────────────────────────────────────────

/**
 * Type 1 · 半完故事續讀.
 *   - last lesson 24-168h ago
 *   - 1 ≤ completed lessons in chapter ≤ 23 (non-empty, non-full)
 */
export function evalUnfinishedStory(ctx: TriggerContext): TriggerIntent | null {
  if (!ctx.lastLessonCompleteAt) return null;
  if (ctx.currentChapter == null) return null;
  const completed = ctx.completedLessonsThisChapter;
  if (completed < 1 || completed > 23) return null;

  const elapsed = ctx.now.getTime() - ctx.lastLessonCompleteAt.getTime();
  if (elapsed < 24 * HOUR_MS || elapsed > 7 * DAY_MS) return null;

  // Fire at user's active hour (or current time + 4h if unknown).
  const fireAt = nextActiveHour(ctx, 4 * HOUR_MS);
  return {
    kind: 'unfinished-story',
    fireAt,
    chapter: ctx.currentChapter,
    tag: `unfinished-story-ch${ctx.currentChapter}`,
  };
}

/**
 * Type 2 · 跨章 cliffhanger.
 *   - chapter-final lesson completed 24h-14d ago
 *   - next chapter not yet started
 */
export function evalCrossChapterHook(ctx: TriggerContext): TriggerIntent | null {
  if (!ctx.lastChapterCompletedAt) return null;
  if (ctx.currentChapter == null) return null;
  if (ctx.completedLessonsThisChapter > 0) return null; // next ch already started

  const elapsed = ctx.now.getTime() - ctx.lastChapterCompletedAt.getTime();
  if (elapsed < 24 * HOUR_MS || elapsed > 14 * DAY_MS) return null;

  const fireAt = nextActiveHour(ctx, 4 * HOUR_MS);
  // Tag by *completed* chapter so copy lookup hits the Ch{n}→Ch{n+1} variant.
  const completedChapter = ctx.currentChapter - 1;
  return {
    kind: 'cross-chapter-hook',
    fireAt,
    chapter: completedChapter > 0 ? completedChapter : null,
    tag: `cross-chapter-hook-ch${completedChapter}`,
  };
}

/**
 * Type 3 · Mochi daily ritual.
 *   - app not opened ≥ 18h
 *   - week cap not yet hit
 *   - fires at user's active hour (or 21:30 default)
 */
export function evalMochiRitual(ctx: TriggerContext): TriggerIntent | null {
  if (ctx.notifsFiredThisWeek >= WEEKLY_NOTIF_CAP) return null;
  if (!ctx.lastAppOpenAt) return null;

  const elapsed = ctx.now.getTime() - ctx.lastAppOpenAt.getTime();
  if (elapsed < 18 * HOUR_MS) return null;

  const fireAt = nextActiveHour(ctx, 0, 21); // 21:30 default
  return {
    kind: 'mochi-daily-ritual',
    fireAt,
    chapter: null,
    tag: 'mochi-daily-ritual',
  };
}

/**
 * Type 4 · SRS weak word reminder.
 *   - SRS queue ≥ 5
 *   - last lesson ≥ 48h
 *   - lifetime cap: max 1/week (caller enforces via notifsFiredThisWeek)
 */
export function evalSrsWeakWord(ctx: TriggerContext): TriggerIntent | null {
  if (ctx.srsQueueSize < 5) return null;
  if (!ctx.lastLessonCompleteAt) return null;

  const elapsed = ctx.now.getTime() - ctx.lastLessonCompleteAt.getTime();
  if (elapsed < 48 * HOUR_MS) return null;
  if (ctx.notifsFiredThisWeek >= WEEKLY_NOTIF_CAP) return null;

  const fireAt = nextActiveHour(ctx, 6 * HOUR_MS);
  return {
    kind: 'srs-weak-word',
    fireAt,
    chapter: ctx.currentChapter,
    tag: 'srs-weak-word',
  };
}

/**
 * Type 5 · Milestone (offline-only — caller checks Document.hidden).
 *   - streak 7/30/100/365 just hit, OR
 *   - chapter-final lesson just completed
 *
 * This evaluator returns the intent; offline-vs-online gate is
 * scheduler-layer concern.
 */
export function evalMilestone(ctx: TriggerContext): TriggerIntent | null {
  const milestoneStreaks = [7, 30, 100, 365];
  const hit = milestoneStreaks.includes(ctx.streak);
  if (!hit && !ctx.lastChapterCompletedAt) return null;

  // Fire within 30s — Notification API supports immediate display.
  const fireAt = new Date(ctx.now.getTime() + 30_000);
  return {
    kind: 'milestone',
    fireAt,
    chapter: ctx.currentChapter,
    tag: hit ? `milestone-streak-${ctx.streak}` : `milestone-ch${ctx.currentChapter}`,
  };
}

/**
 * Type 6 · Weekly recap.
 *   - Sunday local 20:00 ±90 min window
 *   - app opened at least once this week
 *   - max 1/week
 */
export function evalWeeklyRecap(ctx: TriggerContext): TriggerIntent | null {
  if (!ctx.lastAppOpenAt) return null;
  const weekAgo = ctx.now.getTime() - 7 * DAY_MS;
  if (ctx.lastAppOpenAt.getTime() < weekAgo) return null;

  // Schedule for upcoming Sunday 20:00 local time.
  const fireAt = nextSundayAt(ctx.now, 20, 0);
  return {
    kind: 'weekly-recap',
    fireAt,
    chapter: ctx.currentChapter,
    tag: `weekly-recap-${weekTagOf(fireAt)}`,
  };
}

/**
 * Type 7 · Soft win-back.
 *   - lapse 14-21 days
 *   - lifetime cap: 2 (caller enforces via persisted history)
 */
export function evalSoftWinback(ctx: TriggerContext): TriggerIntent | null {
  if (!ctx.lastAppOpenAt) return null;
  const elapsed = ctx.now.getTime() - ctx.lastAppOpenAt.getTime();
  if (elapsed < 14 * DAY_MS || elapsed > 21 * DAY_MS) return null;

  const fireAt = nextActiveHour(ctx, 4 * HOUR_MS);
  return {
    kind: 'soft-winback',
    fireAt,
    chapter: null,
    tag: 'soft-winback',
  };
}

// ──────────────────────────────────────────────────────────────────────
// Master orchestrator
// ──────────────────────────────────────────────────────────────────────

/**
 * Evaluate all 7 triggers, return any that fire.
 * Order matters: higher-priority kinds first (research § C P0 ranking).
 */
export function evaluateTriggers(ctx: TriggerContext): TriggerIntent[] {
  const evaluators = [
    evalUnfinishedStory,
    evalMochiRitual,
    evalCrossChapterHook,
    evalMilestone,
    evalWeeklyRecap,
    evalSrsWeakWord,
    evalSoftWinback,
  ];

  const intents: TriggerIntent[] = [];
  for (const e of evaluators) {
    const intent = e(ctx);
    if (intent) intents.push(intent);
  }

  // Hard weekly cap — drop excess after first WEEKLY_NOTIF_CAP.
  // Milestone bypasses cap (it's celebration, not nag).
  const capExempt = intents.filter(i => i.kind === 'milestone');
  const capped = intents.filter(i => i.kind !== 'milestone').slice(0, Math.max(0, WEEKLY_NOTIF_CAP - ctx.notifsFiredThisWeek));
  return [...capExempt, ...capped];
}

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

/**
 * Next occurrence of the user's active hour, falling back to a default
 * offset from now. If activeHour is null, return now + fallbackMs.
 */
function nextActiveHour(
  ctx: TriggerContext,
  fallbackMs: number,
  defaultHour = 21
): Date {
  const targetHour = ctx.activeHour ?? defaultHour;
  if (targetHour == null) return new Date(ctx.now.getTime() + fallbackMs);

  const next = new Date(ctx.now);
  next.setHours(targetHour, 30, 0, 0);
  if (next.getTime() <= ctx.now.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

/**
 * Upcoming Sunday at HH:MM local. If today is Sunday and time has passed,
 * jumps to next Sunday.
 */
function nextSundayAt(from: Date, hour: number, minute: number): Date {
  const result = new Date(from);
  result.setHours(hour, minute, 0, 0);
  const daysUntilSunday = (7 - result.getDay()) % 7;
  if (daysUntilSunday === 0 && result.getTime() <= from.getTime()) {
    result.setDate(result.getDate() + 7);
  } else {
    result.setDate(result.getDate() + daysUntilSunday);
  }
  return result;
}

/** Compact week tag (YYYY-Www) for dedupe across weekly fires. */
function weekTagOf(d: Date): string {
  const year = d.getFullYear();
  // ISO-week-ish: just use day-of-year / 7. Sufficient for dedupe.
  const start = new Date(year, 0, 1).getTime();
  const week = Math.floor((d.getTime() - start) / (7 * DAY_MS));
  return `${year}-w${week}`;
}
