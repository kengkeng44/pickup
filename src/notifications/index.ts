/**
 * v2.0.B.232 (2026-06-06) — Notification system public API barrel.
 *
 * Source-of-truth: docs/research/notification-design.md
 *
 * Wiring policy: this module is import-only safe — no top-level side
 * effects. Boot must be called explicitly by LessonPage / App owner
 * agent after:
 *   1. User passed L3 (per research § B3 consent UX)
 *   2. hasNotificationConsent() === true
 *   3. Notification.permission === 'granted'
 *
 * Suggested boot sequence (when LessonPage agent is ready):
 *
 *   import { bootScheduler, evaluateTriggers, scheduleNotif } from '@/notifications';
 *
 *   // On app boot:
 *   bootScheduler();   // fires past-due + arms pending
 *
 *   // After significant events (lesson complete, app open, etc):
 *   const intents = evaluateTriggers(buildContext());
 *   for (const i of intents) {
 *     scheduleNotif(i.kind, i.fireAt, { chapter: i.chapter, tag: i.tag });
 *   }
 *
 * Soft-prompt sequence:
 *
 *   import { shouldShowSoftPrompt, NotifConsentPrompt } from '@/notifications';
 *
 *   // After L3 complete:
 *   if (shouldShowSoftPrompt()) {
 *     // render <NotifConsentPrompt onAccept={bootScheduler} />
 *   }
 */

// Types
export type {
  NotifKind,
  NotifCopy,
  HookType,
  TriggerContext,
  Scheduled,
  Notif,
} from './types';

// Copy
export { COPY, pickVariant } from './copy';

// Triggers (pure functions)
export type { TriggerIntent } from './triggers';
export {
  evaluateTriggers,
  evalUnfinishedStory,
  evalCrossChapterHook,
  evalMochiRitual,
  evalSrsWeakWord,
  evalMilestone,
  evalWeeklyRecap,
  evalSoftWinback,
} from './triggers';

// Scheduler (side-effect-bearing; caller controls boot)
export {
  scheduleNotif,
  cancelNotif,
  cancelByTag,
  listScheduled,
  bootScheduler,
  clearAllScheduled,
  getHistory,
} from './scheduler';

// Consent
export {
  hasNotificationConsent,
  setNotificationConsent,
  shouldShowSoftPrompt,
  NotifConsentPrompt,
} from './consent';
export type { NotifConsentPromptProps } from './consent';
