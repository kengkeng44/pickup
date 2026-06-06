/**
 * v2.0.B.235 — User profile reader for recommendation engine (Phase 1).
 *
 * Distills the raw player save state into a UserProfile shape the rule-based
 * engine in storyRecommend.ts can consume. P1 reads:
 *
 *   - completedChapters   → derive from `pickup.chapter.{N}.lessons.completed`
 *                           (per-chapter completion threshold: ≥ 75% of slots
 *                           or chapter explicitly flagged complete)
 *   - hookCompletionByType → P1 hardcoded stub (PostHog wiring is P2 work)
 *   - preferredTags        → inferred from completed chapters' tag overlap
 *
 * Stays pure-read — never writes to localStorage.
 */
import { STORY_TAGS, type HookType, type TagId } from './storyTags';

export interface UserProfile {
  /** chapter ids the user has substantively completed */
  completedChapters: Set<number>;
  /** fraction 0..1 of lessons of each B-hook type the user has finished */
  hookCompletionByType: Record<HookType, number>;
  /** tag ids the user has shown affinity for (tally from completed chapters) */
  preferredTags: TagId[];
}

// Threshold: ≥ this many completed lessons → mark chapter as "consumed enough"
// to count toward preferences. Tunable. Set high enough to avoid 1-lesson
// drive-bys hijacking recommendation but low enough to handle partial saves.
const CHAPTER_COMPLETE_LESSON_THRESHOLD = 6;

function isLocalStorageAvailable(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function safeJsonArray(raw: string | null): unknown[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/**
 * Read completed chapters from localStorage. Threshold = at least N
 * completed lesson ids in `pickup.chapter.{ch}.lessons.completed`.
 */
export function readCompletedChapters(
  threshold: number = CHAPTER_COMPLETE_LESSON_THRESHOLD,
): Set<number> {
  const out = new Set<number>();
  if (!isLocalStorageAvailable()) return out;
  for (let ch = 1; ch <= 8; ch++) {
    try {
      const raw = localStorage.getItem(`pickup.chapter.${ch}.lessons.completed`);
      const arr = safeJsonArray(raw);
      if (arr.length >= threshold) out.add(ch);
    } catch {
      // ignore
    }
  }
  return out;
}

/**
 * P1 stub: hardcoded hook-type completion fractions. Replaced by real
 * PostHog lesson_complete tally in P2. Tuned slightly above zero on B3+B6
 * (the most common hooks in early chapters) so cold-start users still
 * get sensible boosts.
 */
export function readHookCompletionByType(): Record<HookType, number> {
  return {
    B1: 0.3,
    B2: 0.4,
    B3: 0.8, // P1 fake: assume strong B3 affinity (resonates Ch1/Ch5 hooks)
    B4: 0.4,
    B5: 0.4,
    B6: 0.5,
  };
}

/**
 * Infer the player's preferred tags from chapters they've already completed.
 * Tally tag frequency across completed chapters; keep the top-K most frequent
 * ids. Ties broken by deterministic id order so tests stay stable.
 *
 * Cold start (no completed chapter) returns empty list — engine will fall
 * through to its cold-start branch.
 */
export function inferPreferredTags(
  completedChapters: Set<number>,
  topK: number = 6,
): TagId[] {
  if (completedChapters.size === 0) return [];
  const tally: Record<string, number> = {};
  for (const ch of completedChapters) {
    const entry = STORY_TAGS[ch];
    if (!entry) continue;
    for (const t of entry.tags) {
      tally[t] = (tally[t] ?? 0) + 1;
    }
  }
  const entries = Object.entries(tally);
  entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
  return entries.slice(0, topK).map(([id]) => id as TagId);
}

/**
 * One-stop reader. Pulls everything the engine needs. Pure-read.
 *
 * `overrides` lets callers (tests, debug UI, future PostHog wiring)
 * substitute any field without rewriting save state.
 */
export function readUserProfile(overrides?: Partial<UserProfile>): UserProfile {
  const completedChapters = overrides?.completedChapters ?? readCompletedChapters();
  const hookCompletionByType =
    overrides?.hookCompletionByType ?? readHookCompletionByType();
  const preferredTags =
    overrides?.preferredTags ?? inferPreferredTags(completedChapters);
  return { completedChapters, hookCompletionByType, preferredTags };
}

export const USER_PROFILE_DEFAULTS = {
  CHAPTER_COMPLETE_LESSON_THRESHOLD,
} as const;
