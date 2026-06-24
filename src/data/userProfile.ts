/**
 * v2.0.B.235 — User profile reader for recommendation engine (Phase 1).
 * v2.0.B.237 — adds AbilityLevel + inferAbilityLevel() for adaptive
 *              chapter recommendation (零基礎 / A0 path support).
 *
 * Distills the raw player save state into a UserProfile shape the rule-based
 * engine in storyRecommend.ts can consume. P1 reads:
 *
 *   - completedChapters   → derive from `pickup.chapter.{N}.lessons.completed`
 *                           (per-chapter completion threshold: ≥ 75% of slots
 *                           or chapter explicitly flagged complete)
 *   - hookCompletionByType → P1 hardcoded stub (PostHog wiring is P2 work)
 *   - preferredTags        → inferred from completed chapters' tag overlap
 *   - abilityLevel         → A0 / A1 / A2 / A2+ inferred from completion
 *                           history + answer accuracy stub (PostHog wiring P2)
 *
 * Stays pure-read — never writes to localStorage.
 */
import { STORY_TAGS, type HookType, type TagId } from './storyTags';
// v2.0.B.392 (arch-cron 0609 Cycle 1): 改從 types.ts 取 axis 型別,
// 移除 userProfile → storyRegistry 的 back-edge, 斷開型別循環。
import type {
  Culture,
  Style,
  Protagonist,
  Theme,
} from './types';

/**
 * v2.0.B.237 — CEFR-aligned ability tier used by chapter recommender.
 * v2.0.B.298 (arch-cron P0): moved to src/data/types.ts to break the
 * userProfile ↔ storyTags circular dep; imported for internal use +
 * re-exported here so existing `from './userProfile'` importers keep working.
 */
import type { AbilityLevel } from './types';
export type { AbilityLevel };

export interface UserProfile {
  /** chapter ids the user has substantively completed */
  completedChapters: Set<number>;
  /** fraction 0..1 of lessons of each B-hook type the user has finished */
  hookCompletionByType: Record<HookType, number>;
  /** tag ids the user has shown affinity for (tally from completed chapters) */
  preferredTags: TagId[];
  /**
   * v2.0.B.237: CEFR-aligned ability tier for adaptive recommendation.
   * Optional for back-compat with pre-B.237 tests; engine defaults to 'A2'
   * when missing so legacy callers see the same behaviour they did before.
   */
  abilityLevel?: AbilityLevel;
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
 *
 * v2.0.B.237: range bumped 1..8 → 0..9 so Ch0 ground floor + future Ch9
 * (灰姑娘) can register completion. Ch0 has only 7 lessons → uses a
 * separate, lower threshold so finishing the ground floor counts.
 */
export function readCompletedChapters(
  threshold: number = CHAPTER_COMPLETE_LESSON_THRESHOLD,
): Set<number> {
  const out = new Set<number>();
  if (!isLocalStorageAvailable()) return out;
  for (let ch = 0; ch <= 9; ch++) {
    try {
      const raw = localStorage.getItem(`pickup.chapter.${ch}.lessons.completed`);
      const arr = safeJsonArray(raw);
      // Ch0 ground floor has 7 lessons; use 5 as completion threshold so
      // pre-A1 users get credit when they've done the bulk of ground work.
      const effectiveThreshold = ch === 0 ? 5 : threshold;
      if (arr.length >= effectiveThreshold) out.add(ch);
    } catch {
      // ignore
    }
  }
  return out;
}

// ─── v2.0.B.237: Ability inference ──────────────────────────────────────────

const ABILITY_STORAGE_KEY = 'pickup.ability.level';
const ANSWER_STATS_KEY = 'pickup.stats.answer';

/**
 * Tunables for ability promotion thresholds. Exported for tests + future
 * PostHog-driven re-tune.
 */
export const ABILITY_THRESHOLDS = {
  /** A1 promotion: must have completed at least Ch0 ground floor */
  A1_REQUIRES_CH0: 0,
  /** A2 promotion: completed ≥ N main chapters (1..8 range) */
  A2_MIN_MAIN_CHAPTERS: 2,
  /** A2 promotion: answer accuracy must exceed this fraction */
  A2_MIN_ACCURACY: 0.7,
  /** A2+ promotion: completed ≥ N main chapters */
  A2_PLUS_MIN_MAIN_CHAPTERS: 5,
  /** A2+ promotion: answer accuracy must exceed this fraction */
  A2_PLUS_MIN_ACCURACY: 0.85,
} as const;

/**
 * Read answer-accuracy stub from localStorage (P1) — `{ correct, total }`.
 * P2 will be PostHog event-derived. Empty / missing → returns 0/0.
 */
export function readAnswerAccuracy(): { correct: number; total: number; rate: number } {
  if (!isLocalStorageAvailable()) return { correct: 0, total: 0, rate: 0 };
  try {
    const raw = localStorage.getItem(ANSWER_STATS_KEY);
    if (!raw) return { correct: 0, total: 0, rate: 0 };
    const parsed = JSON.parse(raw);
    const correct = Number(parsed?.correct ?? 0);
    const total = Number(parsed?.total ?? 0);
    if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) {
      return { correct: 0, total: 0, rate: 0 };
    }
    return { correct, total, rate: correct / total };
  } catch {
    return { correct: 0, total: 0, rate: 0 };
  }
}

/**
 * Read the explicit level-test result from localStorage (set by LevelTest.tsx).
 * Returns null if user never took the test or chose "I am beginner" path.
 */
export function readExplicitAbilityLevel(): AbilityLevel | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(ABILITY_STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'A0' || raw === 'A1' || raw === 'A2' || raw === 'A2+') return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * Infer CEFR-aligned ability tier from save state.
 *
 * Order of precedence:
 *   1. explicit `pickup.ability.level` (LevelTest result or "I am beginner")
 *   2. derived from completedChapters + answer accuracy
 *      - no completed chapters at all → 'A0' (ground floor recommended)
 *      - Ch0 done, no main chapters → 'A1'
 *      - ≥ 5 main chapters + ≥ 85% accuracy → 'A2+'
 *      - ≥ 2 main chapters + ≥ 70% accuracy → 'A2'
 *      - default fallback → 'A1'
 *
 * Pure-read. Tests stub localStorage + override args.
 */
export function inferAbilityLevel(
  completedChapters?: Set<number>,
  accuracy?: { correct: number; total: number; rate: number },
): AbilityLevel {
  const explicit = readExplicitAbilityLevel();
  if (explicit) return explicit;

  const completed = completedChapters ?? readCompletedChapters();
  const acc = accuracy ?? readAnswerAccuracy();

  const mainChapterCount = [...completed].filter((ch) => ch >= 1 && ch <= 8).length;
  const hasCh0 = completed.has(0);

  // Cold start — nothing completed, no level test taken
  if (completed.size === 0) return 'A0';

  // Promoted to A2+: power user, ≥ 5 main chapters at ≥ 85% accuracy
  if (
    mainChapterCount >= ABILITY_THRESHOLDS.A2_PLUS_MIN_MAIN_CHAPTERS &&
    acc.rate >= ABILITY_THRESHOLDS.A2_PLUS_MIN_ACCURACY
  ) {
    return 'A2+';
  }

  // A2: ≥ 2 main chapters at ≥ 70% accuracy
  if (
    mainChapterCount >= ABILITY_THRESHOLDS.A2_MIN_MAIN_CHAPTERS &&
    acc.rate >= ABILITY_THRESHOLDS.A2_MIN_ACCURACY
  ) {
    return 'A2';
  }

  // Ch0 done, no main chapter qualifying yet → A1
  if (hasCh0 && mainChapterCount === 0) return 'A1';

  // Partial main progress that didn't hit A2 threshold → A1 (still warming up)
  if (mainChapterCount >= 1) return 'A1';

  // Fallback
  return 'A0';
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
 *
 * v2.0.B.237: now also populates `abilityLevel` via inferAbilityLevel().
 */
export function readUserProfile(overrides?: Partial<UserProfile>): UserProfile {
  const completedChapters = overrides?.completedChapters ?? readCompletedChapters();
  const hookCompletionByType =
    overrides?.hookCompletionByType ?? readHookCompletionByType();
  const preferredTags =
    overrides?.preferredTags ?? inferPreferredTags(completedChapters);
  const abilityLevel =
    overrides?.abilityLevel ?? inferAbilityLevel(completedChapters);
  return { completedChapters, hookCompletionByType, preferredTags, abilityLevel };
}

export const USER_PROFILE_DEFAULTS = {
  CHAPTER_COMPLETE_LESSON_THRESHOLD,
} as const;

// ─── v2.0.B.238: Story-taste preferences ────────────────────────────────────
//
// Driven by OnboardingPicker (4-axis multi-select). Empty array on any axis
// = "all stories on this axis are fine" (wildcard), matching the
// "跳過 → 全部都喜歡" skip path. The recommender (storyRegistry +
// storyRecommend) treats empty axes as wildcards.

export interface UserPreferences {
  cultures: Culture[];
  styles: Style[];
  protagonists: Protagonist[];
  themes: Theme[];
}

export const USER_PREFERENCES_STORAGE_KEY = 'pickup.story.preferences';

/** Default = "all 4 axes empty" = user likes everything (wildcard). */
export const ALL_PREFERENCES_DEFAULT: UserPreferences = {
  cultures: [],
  styles: [],
  protagonists: [],
  themes: [],
};

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

/**
 * Read story-taste preferences from localStorage. Returns the
 * all-wildcard default if missing, malformed, or storage unavailable.
 *
 * Pure-read. No side effects.
 */
export function readUserPreferences(): UserPreferences {
  if (!isLocalStorageAvailable()) return { ...ALL_PREFERENCES_DEFAULT };
  try {
    const raw = localStorage.getItem(USER_PREFERENCES_STORAGE_KEY);
    if (!raw) return { ...ALL_PREFERENCES_DEFAULT };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...ALL_PREFERENCES_DEFAULT };
    }
    return {
      cultures: asStringArray((parsed as Record<string, unknown>).cultures) as Culture[],
      styles: asStringArray((parsed as Record<string, unknown>).styles) as Style[],
      protagonists: asStringArray((parsed as Record<string, unknown>).protagonists) as Protagonist[],
      themes: asStringArray((parsed as Record<string, unknown>).themes) as Theme[],
    };
  } catch {
    return { ...ALL_PREFERENCES_DEFAULT };
  }
}

/**
 * Persist story-taste preferences to localStorage. Defensive about
 * missing localStorage / quota errors.
 */
export function setUserPreferences(prefs: UserPreferences): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(USER_PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore — quota / private-mode write block
  }
}

/**
 * True if any axis has at least one selection. Used by the recommender to
 * decide whether to apply preference filtering at all (no selections =
 * wildcard, skip the filter).
 */
export function hasAnyPreference(prefs: UserPreferences): boolean {
  return (
    prefs.cultures.length > 0 ||
    prefs.styles.length > 0 ||
    prefs.protagonists.length > 0 ||
    prefs.themes.length > 0
  );
}
