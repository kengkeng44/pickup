/**
 * v2.0.B.232 (2026-06-06) — Notification system P0 scaffold.
 *
 * Source-of-truth: docs/research/notification-design.md § B (7 types).
 * Tone rules: CLAUDE.md § Vision (兒童 pivot, no guilt, narrator voice).
 * Hook mapping: src/data/lessonHooks.ts (B1-B6 framework).
 *
 * Scaffold-only — scheduler.scheduleAll() must NOT be wired into boot
 * until LessonPage agent confirms integration points. See index.ts.
 */

/**
 * 7 notification types per research § B1.
 * P0 highest ROI: unfinished-story + mochi-daily-ritual.
 */
export type NotifKind =
  | 'unfinished-story'    // half-finished chapter (1 <= lessons <= 23)
  | 'cross-chapter-hook'  // chapter just completed, next not started
  | 'mochi-daily-ritual'  // habit anchor at user's active hour
  | 'srs-weak-word'       // SRS queue >= 5, soft Mochi voice
  | 'milestone'           // streak 30/100/365 or chapter complete (offline)
  | 'weekly-recap'        // Sunday 20:00 +/- 90 min
  | 'soft-winback';       // lapse 14-21d, A/B emotional vs reverse-psych

/**
 * Hook framework reused from src/data/lessonHooks.ts. Optional on copy
 * because not every variant maps to a Bell HIP hook (mochi-ritual,
 * weekly-recap are generic).
 */
export type HookType = 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6';

/**
 * Bilingual copy variant. zh + en are both required (memory rule:
 * Pickup is bilingual UI, A2 audience can't read pure English).
 */
export interface NotifCopy {
  zh: string;
  en: string;
  /** Optional Bell HIP inquiry tag (B1-B6 per lessonHooks.ts). */
  hookType?: HookType;
  /** Chapter scope; absent = generic across all chapters. */
  chapter?: number;
}

/**
 * Trigger evaluation context. Pure data — triggers.ts evaluator takes
 * this and returns a list of pending Notif.
 */
export interface TriggerContext {
  now: Date;
  lastAppOpenAt: Date | null;
  lastLessonCompleteAt: Date | null;
  currentChapter: number | null;
  /** lessons finished this chapter, 0..24. */
  completedLessonsThisChapter: number;
  /** chapter-final lesson completed (gates cross-chapter-hook). */
  lastChapterCompletedAt: Date | null;
  srsQueueSize: number;
  streak: number;
  /** user-historical active hour (0-23 local), null = unknown. */
  activeHour: number | null;
  /** how many notifs already fired this week (LinkedIn 2019 cap = 2). */
  notifsFiredThisWeek: number;
}

/**
 * Scheduled notification record (persisted to localStorage).
 * fireAt is ISO string so localStorage round-trip is safe.
 */
export interface Scheduled {
  id: string;
  kind: NotifKind;
  fireAtIso: string;
  /** Snapshot of chapter at schedule-time so copy lookup is stable. */
  chapter: number | null;
  /** dedupe tag — same tag replaces, doesn't stack. */
  tag: string;
}

/**
 * Runtime notification payload (post-copy-resolution). What scheduler
 * hands to Notification API.
 */
export interface Notif {
  id: string;
  kind: NotifKind;
  copy: NotifCopy;
  tag: string;
  /** deep link — empty string for P0, populated when LessonPage routing lands. */
  deepLink: string;
}
