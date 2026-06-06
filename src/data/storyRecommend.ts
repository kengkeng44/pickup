/**
 * v2.0.B.235 — Pickup AI recommendation engine, Phase 1 (rule-based).
 *
 * NOT ML. NO npm packages. NO server calls. Pure transparent rules.
 *
 * Rules (composed, weights tunable below):
 *
 *   1. Skip 已完成章                — filter completedChapters out of pool.
 *   2. Tag overlap                  — Jaccard similarity of preferredTags ∩
 *                                     candidate.tags / union (canon range 0..1).
 *   3. Hook 偏好 boost              — if user has high completion rate on
 *                                     hookType T, boost candidates with > 0
 *                                     lessons of T. Boost proportional to
 *                                     hookCompletionByType[T] * (T_count /
 *                                     total_T_in_chapter).
 *   4. Similarity 推薦              — exact tag matches against ad-hoc
 *                                     "recent" anchor inferred from
 *                                     preferredTags (already captured via
 *                                     Jaccard, so this becomes an extra
 *                                     "narrative kinship" multiplier when
 *                                     the candidate's PROTAGONIST or THEME
 *                                     axes overlap with the user's top tag).
 *   5. Cold start                   — empty preferredTags + empty completed
 *                                     → seed candidate scores with a chapter-
 *                                     order prior (Ch1 桃太郎-anchor wins).
 *
 * Output: { core: [Ch1, Ch2], elective: [...] } — solves the 共同故事悖論
 * (per CLAUDE.md + brainstorm): Ch1 桃太郎 (UI Ch2) + Ch2 醜小鴨 (UI Ch3)
 * are *required* — always shown in `core` regardless of completed state,
 * everything else is ranked in `elective` by score.
 *
 * NOTE: 任務 spec table uses story numbering (桃太郎=Ch1, 醜小鴨=Ch2).
 * The live app shifts these +1 (CHAPTER_META Ch1=meta-frame 院子, Ch2=桃太郎,
 * Ch3=醜小鴨). This engine speaks the UI numbering throughout.
 */
import {
  TAGS,
  getChapterDifficulty,
  type ChapterInfo,
  type HookType,
  type TagId,
} from './storyTags';
import type { AbilityLevel, UserProfile } from './userProfile';

// ─── Tunables ───────────────────────────────────────────────────────────────
const WEIGHT_TAG_OVERLAP = 0.55;
const WEIGHT_HOOK_BOOST = 0.30;
const WEIGHT_KINSHIP = 0.15;
const COLD_START_DECAY = 0.85; // Ch1 → 1.0, Ch2 → 0.85, Ch3 → 0.72 ...

// v2.0.B.237: ability-level → allowed-chapter-tier filter. Each tier matches
// chapters whose CHAPTER_DIFFICULTY ∈ allowed set. Order matters: lowest
// ability has shortest allowed set.
const ABILITY_ALLOWED_DIFFICULTY: Record<AbilityLevel, ReadonlySet<AbilityLevel>> = {
  // A0 零基礎 — Ch0 only. Strict gate so absolute beginners don't land in 桃太郎.
  A0: new Set<AbilityLevel>(['A0']),
  // A1 — Ch0 ground floor still allowed + standard A2 chapters allowed.
  A1: new Set<AbilityLevel>(['A0', 'A2']),
  // A2 — full standard pool minus A2+ poetic chapters.
  A2: new Set<AbilityLevel>(['A0', 'A2']),
  // A2+ — show stretch chapters only (六天鵝 etc) so the recommender's CTA
  // points at the next challenge instead of revisiting easy stuff.
  // Other tiers still appear in `elective` via the score fallthrough.
  'A2+': new Set<AbilityLevel>(['A2+']),
};

// Per 共同故事悖論 (per dialogue 軌道 A/B/C) — Ch2 桃太郎 + Ch3 醜小鴨 are
// the **canon must-play** for shared cultural reference. Ch1 frame stays out
// of `core` (it's the meta-anchor, not a story everyone must finish).
const CORE_CANON_CHAPTERS: readonly number[] = [2, 3];

// ─── Public types ──────────────────────────────────────────────────────────
export interface RankedRecommendation {
  chapter: number;
  /** 0..1 (clamped, transparent rule contribution sum). */
  score: number;
  /** What rules drove the score — useful for debug + future PostHog event */
  contributions: {
    tagOverlap: number;
    hookBoost: number;
    kinship: number;
    coldStart?: number;
  };
  reason: { zh: string; en: string };
}

export interface RecommendationResult {
  /** Forced: Ch2 桃太郎 + Ch3 醜小鴨, always present, in CORE_CANON_CHAPTERS order. */
  core: RankedRecommendation[];
  /** Ranked rest. Already filters out completedChapters AND core. */
  elective: RankedRecommendation[];
}

// ─── Tag scoring helpers ────────────────────────────────────────────────────

/** Jaccard similarity of two tag id lists. */
export function jaccard(a: readonly TagId[], b: readonly TagId[]): number {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 && B.size === 0) return 0;
  let intersect = 0;
  for (const t of A) if (B.has(t)) intersect++;
  const union = A.size + B.size - intersect;
  return union === 0 ? 0 : intersect / union;
}

/** Intersection size — used for kinship multiplier + reason generation. */
export function intersection(a: readonly TagId[], b: readonly TagId[]): TagId[] {
  const A = new Set(a);
  return [...new Set(b)].filter((t) => A.has(t));
}

/**
 * Hook boost contribution. For each user hook-completion rate, take the
 * portion of this chapter's lessons that match that hook; weight by the
 * completion rate. Result in 0..1.
 */
function computeHookBoost(
  hookCompletion: Record<HookType, number>,
  hookCounts: Record<HookType, number>,
): number {
  const totalLessons = Object.values(hookCounts).reduce((s, n) => s + n, 0);
  if (totalLessons === 0) return 0;
  let raw = 0;
  for (const [k, rate] of Object.entries(hookCompletion)) {
    const t = k as HookType;
    const fraction = hookCounts[t] / totalLessons;
    raw += fraction * rate;
  }
  // raw is already in 0..1 because the fractions sum to 1.
  return Math.max(0, Math.min(1, raw));
}

/**
 * Kinship multiplier — boosts candidates whose top preferred tag matches
 * any candidate tag, scaled by the position in preferredTags (the first
 * preferred tag worth more than the sixth).
 */
function computeKinship(
  preferredTags: readonly TagId[],
  candidateTags: readonly TagId[],
): number {
  if (preferredTags.length === 0 || candidateTags.length === 0) return 0;
  const cand = new Set(candidateTags);
  let best = 0;
  for (let i = 0; i < preferredTags.length; i++) {
    if (cand.has(preferredTags[i])) {
      const weight = 1 - i / preferredTags.length;
      if (weight > best) best = weight;
    }
  }
  return best;
}

// ─── Reason renderer ───────────────────────────────────────────────────────

interface ReasonContext {
  chapter: number;
  story: string;
  sharedTags: TagId[];
  topHookForUser: HookType | null;
  hookCount: number;
  coldStart: boolean;
  /** v2.0.B.237: ability-match reason takes precedence over tag/hook fallbacks */
  abilityMatch?: { user: AbilityLevel; chapter: AbilityLevel };
}

function renderReason(ctx: ReasonContext): { zh: string; en: string } {
  const { chapter, story, sharedTags, topHookForUser, hookCount, coldStart, abilityMatch } = ctx;

  // v2.0.B.237: ability-level reason — surfaces "this story matches your level"
  // when the chapter difficulty aligns with the user's tier.
  if (abilityMatch) {
    const { user, chapter: chDiff } = abilityMatch;
    if (user === 'A0' && chDiff === 'A0') {
      return {
        zh: '零基礎 ok!我們從 ABC 開始,慢慢來',
        en: 'Beginner-friendly start. Adapted to your level.',
      };
    }
    if (user === 'A1' && chapter === 0) {
      return {
        zh: '先把 ABC 跟基本字穩了 — 這課適合你目前的程度',
        en: 'Lock in ABC + base words — this story matches your level.',
      };
    }
    if (user === 'A2+' && chDiff === 'A2+') {
      return {
        zh: `${story} 比較有挑戰 — 適合你目前的程度`,
        en: `${story} is a stretch story — this matches your level.`,
      };
    }
    // generic ability match (A1/A2 reading standard A2)
    if (user === chDiff || (user === 'A1' && chDiff === 'A2')) {
      return {
        zh: `${story} 適合你目前的程度`,
        en: `${story} — this story matches your level.`,
      };
    }
  }

  if (coldStart) {
    return {
      zh: '剛開始?從桃太郎的院子矮牆出發,Mochi 跟你一起聽',
      en: 'New here? Start at Momotaro\'s yard wall with Mochi.',
    };
  }
  const sharedZh = sharedTags.map((id) => TAGS[id]?.zh ?? id).join('、');
  const sharedEn = sharedTags.map((id) => TAGS[id]?.en ?? id).join(', ');
  if (sharedTags.length >= 2) {
    return {
      zh: `你喜歡 ${sharedZh},${story} 也走這條路`,
      en: `You loved ${sharedEn}; ${story} shares those threads.`,
    };
  }
  if (sharedTags.length === 1 && topHookForUser && hookCount > 0) {
    return {
      zh: `${story} 含 ${TAGS[sharedTags[0]]?.zh ?? ''} 線,也常用你拿手的 ${topHookForUser} 結尾`,
      en: `${story} threads ${TAGS[sharedTags[0]]?.en ?? ''} and ends with the ${topHookForUser} beats you nail.`,
    };
  }
  if (sharedTags.length === 1) {
    return {
      zh: `跟你最近喜歡的 ${TAGS[sharedTags[0]]?.zh ?? ''} 同路`,
      en: `Same ${TAGS[sharedTags[0]]?.en ?? ''} thread as your recent reads.`,
    };
  }
  if (topHookForUser && hookCount > 0) {
    return {
      zh: `${story} 常用你拿手的 ${topHookForUser} 結尾`,
      en: `${story} ends with ${topHookForUser} beats you nail.`,
    };
  }
  return {
    zh: `${story} — 換個口味試試?`,
    en: `${story} — fancy a new flavour?`,
  };
}

// ─── Main engine ────────────────────────────────────────────────────────────

/**
 * Score a single candidate chapter against the user profile. Pure.
 *
 * v2.0.B.237: optional `abilityMatch` flag lets the engine signal the
 * reason renderer that this chapter aligns with the user's CEFR tier.
 */
function scoreCandidate(
  candidate: ChapterInfo,
  profile: UserProfile,
  coldStart: boolean,
  coldStartIndex: number,
  abilityMatch?: { user: AbilityLevel; chapter: AbilityLevel },
): RankedRecommendation {
  const tagOverlap = jaccard(profile.preferredTags, candidate.tags);
  const hookBoost = computeHookBoost(profile.hookCompletionByType, candidate.hookCounts);
  const kinship = computeKinship(profile.preferredTags, candidate.tags);

  let coldStartScore = 0;
  if (coldStart) {
    // Cold-start prior: earlier chapter wins. Ch1 = 1.0, decay geometrically.
    coldStartScore = Math.pow(COLD_START_DECAY, coldStartIndex);
  }

  const blended =
    WEIGHT_TAG_OVERLAP * tagOverlap +
    WEIGHT_HOOK_BOOST * hookBoost +
    WEIGHT_KINSHIP * kinship;

  // Cold start strictly overrides the tag-based score (which is 0 anyway with
  // no preferredTags). For warm users, cold-start contributes nothing.
  const score = coldStart ? coldStartScore : blended;

  const sharedTags = intersection(profile.preferredTags, candidate.tags);
  // Top hook for user (highest completion rate)
  let topHook: HookType | null = null;
  let topRate = 0;
  for (const [k, rate] of Object.entries(profile.hookCompletionByType)) {
    if (rate > topRate) {
      topRate = rate;
      topHook = k as HookType;
    }
  }
  const hookCountForTopHook = topHook ? candidate.hookCounts[topHook] : 0;

  const reason = renderReason({
    chapter: candidate.chapter,
    story: candidate.story,
    sharedTags,
    topHookForUser: topHook,
    hookCount: hookCountForTopHook,
    coldStart,
    abilityMatch,
  });

  return {
    chapter: candidate.chapter,
    score: Number(score.toFixed(4)),
    contributions: {
      tagOverlap: Number((WEIGHT_TAG_OVERLAP * tagOverlap).toFixed(4)),
      hookBoost: Number((WEIGHT_HOOK_BOOST * hookBoost).toFixed(4)),
      kinship: Number((WEIGHT_KINSHIP * kinship).toFixed(4)),
      ...(coldStart ? { coldStart: Number(coldStartScore.toFixed(4)) } : {}),
    },
    reason,
  };
}

/**
 * Phase 1 engine — rule-based ranking with 共同故事悖論 splitter.
 *
 * Returns:
 *   - core: Ch2 桃太郎 + Ch3 醜小鴨 (canon must-play, even if completed —
 *           UI may grey them out if `completedChapters` includes them).
 *   - elective: everything else, ranked, filters out completed AND core.
 *
 * When ALL chapters are completed, elective is `[]` and `core` still
 * contains the canon for symbolic display. UI fallback ("all done")
 * is the caller's responsibility.
 */
export function recommendNextStories(
  userProfile: UserProfile,
  candidatePool: ChapterInfo[],
): RecommendationResult {
  const completed = userProfile.completedChapters;
  const coldStart =
    completed.size === 0 && userProfile.preferredTags.length === 0;

  // v2.0.B.237: ability-tier — gate elective pool by chapter difficulty.
  // A0 → only Ch0. A1 → Ch0 + standard A2. A2 → standard A2. A2+ → stretch A2+.
  const ability = userProfile.abilityLevel ?? 'A2';
  const allowedDifficulty = ABILITY_ALLOWED_DIFFICULTY[ability] ?? new Set<AbilityLevel>(['A0', 'A2', 'A2+']);

  // Sort the pool by chapter id so cold-start prior is deterministic.
  const ordered = [...candidatePool].sort((a, b) => a.chapter - b.chapter);

  // Split: canon vs elective. Canon is exempt from ability gating so the
  // 共同故事悖論 (Ch2 桃太郎 + Ch3 醜小鴨) still shows in core regardless of
  // ability — UI displays them as "core canon" labelled separately from
  // the level-matched elective recommendations.
  const canonCh = new Set(CORE_CANON_CHAPTERS);
  const coreCandidates: ChapterInfo[] = [];
  const electiveCandidates: ChapterInfo[] = [];
  for (const c of ordered) {
    if (canonCh.has(c.chapter)) {
      coreCandidates.push(c);
      continue;
    }
    if (completed.has(c.chapter)) continue;
    // Apply ability filter to elective pool.
    const chDiff = getChapterDifficulty(c.chapter);
    if (!allowedDifficulty.has(chDiff)) continue;
    electiveCandidates.push(c);
  }

  // Edge case: if ability filter wipes out the elective pool entirely (e.g.
  // A2+ user with no A2+ chapters left), fall back to the unfiltered set so
  // the carousel never goes empty. This keeps "your level" UX honest without
  // stranding the user.
  if (electiveCandidates.length === 0) {
    for (const c of ordered) {
      if (canonCh.has(c.chapter)) continue;
      if (completed.has(c.chapter)) continue;
      electiveCandidates.push(c);
    }
  }

  // Core is presented in CORE_CANON_CHAPTERS order — fixed, not ranked.
  // Still score them for transparency / debug.
  const core: RankedRecommendation[] = CORE_CANON_CHAPTERS
    .map((ch) => coreCandidates.find((c) => c.chapter === ch))
    .filter((c): c is ChapterInfo => Boolean(c))
    .map((c) => {
      const idx = ordered.findIndex((o) => o.chapter === c.chapter);
      const chDiff = getChapterDifficulty(c.chapter);
      const abilityMatch = allowedDifficulty.has(chDiff)
        ? { user: ability, chapter: chDiff }
        : undefined;
      return scoreCandidate(c, userProfile, coldStart, idx, abilityMatch);
    });

  // Elective: score + sort desc by score, ties by chapter id asc.
  const elective: RankedRecommendation[] = electiveCandidates
    .map((c) => {
      const idx = ordered.findIndex((o) => o.chapter === c.chapter);
      const chDiff = getChapterDifficulty(c.chapter);
      const abilityMatch = allowedDifficulty.has(chDiff)
        ? { user: ability, chapter: chDiff }
        : undefined;
      return scoreCandidate(c, userProfile, coldStart, idx, abilityMatch);
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.chapter - b.chapter;
    });

  return { core, elective };
}

/**
 * Helper for UI carousel — top-K elective (P1 = 3 cards). Returns flat list,
 * core first then top elective up to limit.
 */
export function topRecommendations(
  result: RecommendationResult,
  limit: number = 3,
): RankedRecommendation[] {
  const head = result.elective.slice(0, limit);
  return head;
}

export const RECOMMEND_TUNABLES = {
  WEIGHT_TAG_OVERLAP,
  WEIGHT_HOOK_BOOST,
  WEIGHT_KINSHIP,
  COLD_START_DECAY,
  CORE_CANON_CHAPTERS,
} as const;
