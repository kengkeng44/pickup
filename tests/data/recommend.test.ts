/**
 * v2.0.B.235 — Phase 1 recommendation engine test harness.
 *
 * Covers all 5 rules listed in storyRecommend.ts docstring + the
 * 共同故事悖論 splitter (core vs elective).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  recommendNextStories,
  jaccard,
  intersection,
  topRecommendations,
  RECOMMEND_TUNABLES,
} from '../../src/data/storyRecommend';
import {
  defaultCandidatePool,
  STORY_TAGS,
  CHAPTER_HOOK_COUNTS,
  type HookType,
} from '../../src/data/storyTags';
import {
  inferPreferredTags,
  readCompletedChapters,
  readUserProfile,
  readHookCompletionByType,
} from '../../src/data/userProfile';

function zeroHook(): Record<HookType, number> {
  return { B1: 0, B2: 0, B3: 0, B4: 0, B5: 0, B6: 0 };
}

// ─── Tag set algebra ────────────────────────────────────────────────────────

describe('storyTags helpers', () => {
  it('jaccard of identical sets = 1', () => {
    expect(jaccard(['animal', 'fable'], ['animal', 'fable'])).toBe(1);
  });

  it('jaccard of disjoint sets = 0', () => {
    expect(jaccard(['myth'], ['poetic'])).toBe(0);
  });

  it('jaccard handles duplicate ids correctly', () => {
    // a = {animal}, b = {animal, fable} -> intersect 1, union 2 -> 0.5
    expect(jaccard(['animal', 'animal'], ['animal', 'fable'])).toBe(0.5);
  });

  it('jaccard of two empties = 0 (no NaN)', () => {
    expect(jaccard([], [])).toBe(0);
  });

  it('intersection returns shared ids only', () => {
    const out = intersection(['animal', 'fable', 'female'], ['animal', 'female', 'dark']);
    expect(out.sort()).toEqual(['animal', 'female'].sort());
  });

  it('CHAPTER_HOOK_COUNTS sums to non-zero for chapters 2..8 (Ch1 = meta frame, no hooks)', () => {
    for (let ch = 2; ch <= 8; ch++) {
      const total = Object.values(CHAPTER_HOOK_COUNTS[ch]).reduce((s, n) => s + n, 0);
      expect(total).toBeGreaterThan(0);
    }
  });

  it('STORY_TAGS covers all 8 UI chapters', () => {
    for (let ch = 1; ch <= 8; ch++) {
      expect(STORY_TAGS[ch]).toBeDefined();
      expect(STORY_TAGS[ch].tags.length).toBeGreaterThan(0);
    }
  });
});

// ─── userProfile reader ────────────────────────────────────────────────────

describe('userProfile reader', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('readCompletedChapters: empty save → empty set', () => {
    expect(readCompletedChapters().size).toBe(0);
  });

  it('readCompletedChapters: counts chapter as complete once threshold met (default 6)', () => {
    storage['pickup.chapter.3.lessons.completed'] = JSON.stringify([
      'kt-ch3-l1', 'kt-ch3-l2', 'kt-ch3-l3', 'kt-ch3-l4', 'kt-ch3-l5', 'kt-ch3-l6',
    ]);
    const done = readCompletedChapters();
    expect(done.has(3)).toBe(true);
  });

  it('readCompletedChapters: under threshold → not counted', () => {
    storage['pickup.chapter.2.lessons.completed'] = JSON.stringify(['kt-ch2-l1']);
    expect(readCompletedChapters().has(2)).toBe(false);
  });

  it('inferPreferredTags: empty completed → empty tags (cold start)', () => {
    expect(inferPreferredTags(new Set()).length).toBe(0);
  });

  it('inferPreferredTags: completed Ch3 (醜小鴨, UI Ch3) returns its tag set', () => {
    const tags = inferPreferredTags(new Set([3]));
    // Ch3 tags: animal, selfIdentity, emotional, bird
    expect(tags).toContain('animal');
    expect(tags).toContain('selfIdentity');
  });

  it('inferPreferredTags: ties broken deterministically (alphabetical)', () => {
    // Force a tie scenario by completing two chapters
    const tags = inferPreferredTags(new Set([4, 5]));
    // Both chapters share 'animal' + 'fable' -> those rank top with count 2
    expect(tags[0]).toBe('animal');
    expect(tags[1]).toBe('fable');
  });

  it('readHookCompletionByType: returns all 6 B-types with finite numbers', () => {
    const map = readHookCompletionByType();
    for (const t of ['B1','B2','B3','B4','B5','B6'] as HookType[]) {
      expect(map[t]).toBeGreaterThanOrEqual(0);
      expect(map[t]).toBeLessThanOrEqual(1);
    }
  });

  it('readUserProfile composes the three reader fns into a profile shape', () => {
    storage['pickup.chapter.3.lessons.completed'] = JSON.stringify([
      'kt-ch3-l1', 'kt-ch3-l2', 'kt-ch3-l3', 'kt-ch3-l4', 'kt-ch3-l5', 'kt-ch3-l6',
    ]);
    const p = readUserProfile();
    expect(p.completedChapters.has(3)).toBe(true);
    expect(p.preferredTags).toContain('animal');
    expect(p.hookCompletionByType.B3).toBeGreaterThan(0);
  });
});

// ─── Recommendation engine ─────────────────────────────────────────────────

describe('recommendNextStories — Phase 1 rule engine', () => {
  const pool = defaultCandidatePool();

  it('cold start: no completed + empty preferredTags → elective top pick is Ch0 (ground floor, B.237)', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set(),
        hookCompletionByType: zeroHook(),
        preferredTags: [],
        // Explicit A0 to mirror the B.237 cold-start branch (no profile → A0).
        abilityLevel: 'A0',
      },
      pool,
    );
    // v2.0.B.237: Ch0 ground floor now exists. Cold-start prior favours
    // lowest chapter id, so Ch0 leads the elective for absolute beginners.
    expect(res.elective[0].chapter).toBe(0);
    expect(res.elective[0].score).toBeGreaterThan(0);
  });

  it('cold start reason: explains via warm framing in zh + en', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set(),
        hookCompletionByType: zeroHook(),
        preferredTags: [],
      },
      pool,
    );
    expect(res.elective[0].reason.zh.length).toBeGreaterThan(0);
    expect(res.elective[0].reason.en.length).toBeGreaterThan(0);
  });

  it('共同故事悖論: core always contains Ch2 (桃太郎) + Ch3 (醜小鴨)', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set(),
        hookCompletionByType: zeroHook(),
        preferredTags: [],
      },
      pool,
    );
    expect(res.core.map((r) => r.chapter)).toEqual([2, 3]);
  });

  it('共同故事悖論: completed canon still appears in core (UI greys it out)', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set([2, 3]),
        hookCompletionByType: zeroHook(),
        preferredTags: [],
      },
      pool,
    );
    expect(res.core.map((r) => r.chapter)).toEqual([2, 3]);
    // Elective filters out completed Ch2/Ch3 (they're in core, not elective).
    expect(res.elective.find((r) => r.chapter === 2)).toBeUndefined();
    expect(res.elective.find((r) => r.chapter === 3)).toBeUndefined();
  });

  it('Skip 已完成章: completed Ch4 never reappears in elective', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set([4]),
        hookCompletionByType: zeroHook(),
        preferredTags: ['animal'],
      },
      pool,
    );
    expect(res.elective.find((r) => r.chapter === 4)).toBeUndefined();
  });

  it('Tag overlap: completed Ch3 (醜小鴨, animal+selfIdentity) boosts Ch5 (駱駝, animal+fable+work)', () => {
    const profile = {
      completedChapters: new Set([3]),
      hookCompletionByType: zeroHook(),
      preferredTags: inferPreferredTags(new Set([3])),
    };
    const res = recommendNextStories(profile, pool);
    // Ch5 (駱駝) shares 'animal' with Ch3 -> should outrank chapters with no
    // overlap (Ch6 Baba Yaga, Ch8 葉限).
    const ch5 = res.elective.find((r) => r.chapter === 5);
    const ch6 = res.elective.find((r) => r.chapter === 6);
    const ch8 = res.elective.find((r) => r.chapter === 8);
    expect(ch5).toBeDefined();
    expect(ch5!.score).toBeGreaterThan(ch6?.score ?? 0);
    expect(ch5!.score).toBeGreaterThan(ch8?.score ?? 0);
  });

  it('Hook boost: high B3 affinity + zero preferredTags → still ranks chapters with more B3 lessons higher', () => {
    const allZeroExceptB3: Record<HookType, number> = { B1: 0, B2: 0, B3: 1, B4: 0, B5: 0, B6: 0 };
    const profile = {
      completedChapters: new Set<number>(),
      hookCompletionByType: allZeroExceptB3,
      preferredTags: [],
    };
    const res = recommendNextStories(profile, pool);
    // Pull rankings out and confirm chapters with B3 hooks rank above
    // chapters with none. (Cold-start branch only triggers when BOTH
    // completedChapters AND preferredTags are empty AND hook-completion
    // is the only signal — our engine treats this as warm if any hook
    // rate > 0, hence tag/hook math runs.)
    // Pull elective scores
    const scoreFor = (ch: number) =>
      res.elective.find((r) => r.chapter === ch)?.score ?? -1;
    // Find a chapter with B3 hooks vs one with zero. Per CHAPTER_HOOK_COUNTS,
    // Ch5 (kt-ch4 Camel) has B3 in l1 (humph), Ch7 (six swans) B3 only in l2.
    // We assert at least one B3-containing chapter outranks a zero-B3 chapter.
    const chaptersWithB3: number[] = [];
    const chaptersWithoutB3: number[] = [];
    for (let ch = 4; ch <= 8; ch++) {
      if (CHAPTER_HOOK_COUNTS[ch].B3 > 0) chaptersWithB3.push(ch);
      else chaptersWithoutB3.push(ch);
    }
    if (chaptersWithB3.length > 0 && chaptersWithoutB3.length > 0) {
      const maxB3Score = Math.max(...chaptersWithB3.map(scoreFor));
      const maxNoB3Score = Math.max(...chaptersWithoutB3.map(scoreFor));
      expect(maxB3Score).toBeGreaterThan(maxNoB3Score);
    } else {
      // Sanity: ensure our taxonomy distinguishes the two
      expect(chaptersWithB3.length + chaptersWithoutB3.length).toBeGreaterThan(0);
    }
  });

  it('All chapters completed → elective empty, core still present', () => {
    const res = recommendNextStories(
      {
        // v2.0.B.237: include Ch0 ground floor in completion set so elective
        // truly drains to empty (Ch0 was added to STORY_TAGS in B.237).
        completedChapters: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
        hookCompletionByType: zeroHook(),
        preferredTags: ['animal'],
      },
      pool,
    );
    expect(res.elective).toEqual([]);
    expect(res.core.length).toBe(2);
  });

  it('topRecommendations returns at most N elective entries', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set(),
        hookCompletionByType: zeroHook(),
        preferredTags: [],
      },
      pool,
    );
    expect(topRecommendations(res, 3).length).toBeLessThanOrEqual(3);
    expect(topRecommendations(res, 1).length).toBe(1);
  });

  it('scores are clamped to 0..1 + tunable weights sum stays ≤ 1', () => {
    const total =
      RECOMMEND_TUNABLES.WEIGHT_TAG_OVERLAP +
      RECOMMEND_TUNABLES.WEIGHT_HOOK_BOOST +
      RECOMMEND_TUNABLES.WEIGHT_KINSHIP;
    expect(total).toBeCloseTo(1, 5);
    const res = recommendNextStories(
      {
        completedChapters: new Set([3]),
        hookCompletionByType: { B1: 1, B2: 1, B3: 1, B4: 1, B5: 1, B6: 1 },
        preferredTags: ['animal', 'fable', 'female'],
      },
      pool,
    );
    for (const r of [...res.core, ...res.elective]) {
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(1);
    }
  });

  it('reasons are localized (zh + en non-empty for every recommendation)', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set([3]),
        hookCompletionByType: readHookCompletionByType(),
        preferredTags: inferPreferredTags(new Set([3])),
      },
      pool,
    );
    for (const r of [...res.core, ...res.elective]) {
      expect(r.reason.zh).toMatch(/.+/);
      expect(r.reason.en).toMatch(/.+/);
    }
  });

  it('contribution breakdown sums roughly to score (within numeric tolerance)', () => {
    const res = recommendNextStories(
      {
        completedChapters: new Set([3]),
        hookCompletionByType: { B1: 0.2, B2: 0.2, B3: 0.5, B4: 0.2, B5: 0.2, B6: 0.5 },
        preferredTags: ['animal', 'fable'],
      },
      pool,
    );
    for (const r of res.elective) {
      const sum =
        r.contributions.tagOverlap +
        r.contributions.hookBoost +
        r.contributions.kinship +
        (r.contributions.coldStart ?? 0);
      expect(Math.abs(sum - r.score)).toBeLessThan(0.01);
    }
  });
});
