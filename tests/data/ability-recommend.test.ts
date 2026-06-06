/**
 * v2.0.B.237 — Ability-adaptive recommendation engine tests.
 *
 * Covers:
 *   - inferAbilityLevel() — pre-A1 / A1 / A2 / A2+ promotion rules
 *   - recommendNextStories() ability filter — gates elective pool by tier
 *   - reason renderer surfaces "matches your level" string for matched chapters
 *   - Ch0 ground floor lands first for A0 users (cold-start prior + filter)
 *   - A2+ recommendation surfaces Ch7 (六天鵝, the only A2+ chapter)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recommendNextStories } from '../../src/data/storyRecommend';
import {
  defaultCandidatePool,
  CHAPTER_DIFFICULTY,
  getChapterDifficulty,
  type HookType,
} from '../../src/data/storyTags';
import {
  inferAbilityLevel,
  readAnswerAccuracy,
  readExplicitAbilityLevel,
  ABILITY_THRESHOLDS,
  type AbilityLevel,
  type UserProfile,
} from '../../src/data/userProfile';

function zeroHook(): Record<HookType, number> {
  return { B1: 0, B2: 0, B3: 0, B4: 0, B5: 0, B6: 0 };
}

function makeProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    completedChapters: overrides.completedChapters ?? new Set<number>(),
    hookCompletionByType: overrides.hookCompletionByType ?? zeroHook(),
    preferredTags: overrides.preferredTags ?? [],
    abilityLevel: overrides.abilityLevel,
  };
}

// ─── inferAbilityLevel — promotion rules ───────────────────────────────────

describe('inferAbilityLevel — CEFR tier inference', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('no history + no explicit level → A0 (零基礎 預設)', () => {
    expect(inferAbilityLevel(new Set<number>())).toBe('A0');
  });

  it('Ch0 ground floor done, no main chapter → A1', () => {
    const level = inferAbilityLevel(new Set([0]), { correct: 0, total: 0, rate: 0 });
    expect(level).toBe('A1');
  });

  it('≥ 2 main chapters + > 70% accuracy → A2', () => {
    const level = inferAbilityLevel(
      new Set([0, 2, 3]),
      { correct: 80, total: 100, rate: 0.8 },
    );
    expect(level).toBe('A2');
  });

  it('≥ 5 main chapters + > 85% accuracy → A2+', () => {
    const level = inferAbilityLevel(
      new Set([0, 2, 3, 4, 5, 6, 7]),
      { correct: 90, total: 100, rate: 0.9 },
    );
    expect(level).toBe('A2+');
  });

  it('5 main chapters but only 75% accuracy → stays A2 (not promoted to A2+)', () => {
    const level = inferAbilityLevel(
      new Set([2, 3, 4, 5, 6, 7]),
      { correct: 75, total: 100, rate: 0.75 },
    );
    expect(level).toBe('A2');
  });

  it('explicit pickup.ability.level overrides derived level (LevelTest result)', () => {
    storage['pickup.ability.level'] = 'A2+';
    // Even with empty history, explicit level wins.
    expect(inferAbilityLevel(new Set<number>())).toBe('A2+');
  });

  it('explicit "I am beginner" path stores A0', () => {
    storage['pickup.ability.level'] = 'A0';
    expect(readExplicitAbilityLevel()).toBe('A0');
    expect(inferAbilityLevel(new Set([0, 2, 3]), { correct: 90, total: 100, rate: 0.9 })).toBe('A0');
  });

  it('partial main progress (1 main chapter, low accuracy) → A1, not A2', () => {
    const level = inferAbilityLevel(
      new Set([2]),
      { correct: 5, total: 10, rate: 0.5 },
    );
    expect(level).toBe('A1');
  });

  it('readAnswerAccuracy parses localStorage stub correctly', () => {
    storage['pickup.stats.answer'] = JSON.stringify({ correct: 80, total: 100 });
    const acc = readAnswerAccuracy();
    expect(acc.rate).toBeCloseTo(0.8);
    expect(acc.correct).toBe(80);
    expect(acc.total).toBe(100);
  });

  it('readAnswerAccuracy: malformed payload returns zero (no NaN)', () => {
    storage['pickup.stats.answer'] = '{not json';
    const acc = readAnswerAccuracy();
    expect(acc.rate).toBe(0);
    expect(acc.total).toBe(0);
  });

  it('readAnswerAccuracy: total=0 returns rate=0 (no divide-by-zero)', () => {
    storage['pickup.stats.answer'] = JSON.stringify({ correct: 0, total: 0 });
    expect(readAnswerAccuracy().rate).toBe(0);
  });
});

// ─── Ability filter on recommendNextStories ────────────────────────────────

describe('recommendNextStories — ability adaptive filter', () => {
  const pool = defaultCandidatePool();

  it('A0 user → elective only contains Ch0 ground floor', () => {
    const res = recommendNextStories(
      makeProfile({ abilityLevel: 'A0' }),
      pool,
    );
    // Ch2 + Ch3 are core canon (exempt from filter, still appear in core).
    // Elective should be A0 chapters only — just Ch0.
    const electiveChapters = res.elective.map((r) => r.chapter);
    expect(electiveChapters).toEqual([0]);
    expect(res.elective[0].chapter).toBe(0);
  });

  it('A0 user reason on Ch0 mentions ground-floor / "零基礎 ok"', () => {
    const res = recommendNextStories(
      makeProfile({ abilityLevel: 'A0' }),
      pool,
    );
    const ch0Rec = res.elective.find((r) => r.chapter === 0);
    expect(ch0Rec).toBeDefined();
    expect(ch0Rec!.reason.zh).toMatch(/零基礎|程度/);
    expect(ch0Rec!.reason.en).toMatch(/level|Beginner/i);
  });

  it('A1 user → elective contains Ch0 + A2 chapters (Ch1, Ch4-6, Ch8)', () => {
    const res = recommendNextStories(
      makeProfile({
        completedChapters: new Set([0]),
        abilityLevel: 'A1',
      }),
      pool,
    );
    const electiveChapters = res.elective.map((r) => r.chapter);
    // Ch0 already completed → not in elective. Standard A2 chapters appear.
    expect(electiveChapters).not.toContain(0);
    // Ch7 is A2+ — should NOT appear for A1 user
    expect(electiveChapters).not.toContain(7);
    // Some standard A2 chapters should be present
    expect(electiveChapters).toContain(1);
  });

  it('A2 user → elective contains standard A2 chapters, excludes A2+ (Ch7)', () => {
    const res = recommendNextStories(
      makeProfile({
        completedChapters: new Set([0, 2, 3]),
        abilityLevel: 'A2',
      }),
      pool,
    );
    const electiveChapters = res.elective.map((r) => r.chapter);
    expect(electiveChapters).not.toContain(7); // A2+ chapter filtered out
    expect(electiveChapters.length).toBeGreaterThan(0);
    // All elective chapters should be A0 or A2 difficulty
    for (const ch of electiveChapters) {
      const diff = getChapterDifficulty(ch);
      expect(['A0', 'A2']).toContain(diff);
    }
  });

  it('A2+ user → elective only contains A2+ chapters (Ch7 六隻天鵝)', () => {
    const res = recommendNextStories(
      makeProfile({
        completedChapters: new Set([0, 2, 3, 4, 5]),
        abilityLevel: 'A2+',
      }),
      pool,
    );
    const electiveChapters = res.elective.map((r) => r.chapter);
    // Should contain Ch7 (the A2+ chapter) at minimum
    expect(electiveChapters).toContain(7);
    // All elective chapters should be A2+ difficulty
    for (const ch of electiveChapters) {
      expect(getChapterDifficulty(ch)).toBe('A2+');
    }
  });

  it('A2+ user reason on Ch7 mentions "matches your level" / 「適合你目前的程度」', () => {
    const res = recommendNextStories(
      makeProfile({
        completedChapters: new Set([0, 2, 3, 4, 5]),
        abilityLevel: 'A2+',
      }),
      pool,
    );
    const ch7Rec = res.elective.find((r) => r.chapter === 7);
    expect(ch7Rec).toBeDefined();
    expect(ch7Rec!.reason.zh).toMatch(/適合你目前的程度|挑戰/);
    expect(ch7Rec!.reason.en).toMatch(/matches your level|stretch/i);
  });

  it('Ability filter wipe-out fallback: A2+ with all A2+ chapters completed → falls back to unfiltered pool', () => {
    const res = recommendNextStories(
      makeProfile({
        completedChapters: new Set([7]), // only A2+ chapter completed
        abilityLevel: 'A2+',
      }),
      pool,
    );
    // Fallback prevents empty elective when ability filter would otherwise nuke it.
    expect(res.elective.length).toBeGreaterThan(0);
  });

  it('Default profile (no abilityLevel field) → behaves as A2 (back-compat)', () => {
    const res = recommendNextStories(
      makeProfile({
        // abilityLevel: undefined  (back-compat default)
        completedChapters: new Set([0, 2, 3]),
      }),
      pool,
    );
    // Should match A2 behaviour: no A2+ chapters in elective
    const electiveChapters = res.elective.map((r) => r.chapter);
    expect(electiveChapters).not.toContain(7);
  });
});

// ─── Sanity: CHAPTER_DIFFICULTY taxonomy is well-formed ────────────────────

describe('CHAPTER_DIFFICULTY taxonomy', () => {
  it('every chapter in STORY_TAGS has a difficulty mapping', () => {
    // STORY_TAGS chapters 0..8 are mapped.
    for (let ch = 0; ch <= 8; ch++) {
      const diff = CHAPTER_DIFFICULTY[ch];
      expect(diff).toBeDefined();
      expect(['A0', 'A1', 'A2', 'A2+']).toContain(diff);
    }
  });

  it('Ch0 is A0 (零基礎 ground floor anchor)', () => {
    expect(CHAPTER_DIFFICULTY[0]).toBe('A0');
  });

  it('Ch7 六隻天鵝 is A2+ (詩意 stretch chapter)', () => {
    expect(CHAPTER_DIFFICULTY[7]).toBe('A2+');
  });

  it('getChapterDifficulty defaults to A2 for unmapped chapter', () => {
    expect(getChapterDifficulty(99)).toBe('A2');
  });
});

// ─── ABILITY_THRESHOLDS tunables are reasonable ────────────────────────────

describe('ABILITY_THRESHOLDS', () => {
  it('A2+ thresholds strictly stricter than A2', () => {
    expect(ABILITY_THRESHOLDS.A2_PLUS_MIN_MAIN_CHAPTERS)
      .toBeGreaterThan(ABILITY_THRESHOLDS.A2_MIN_MAIN_CHAPTERS);
    expect(ABILITY_THRESHOLDS.A2_PLUS_MIN_ACCURACY)
      .toBeGreaterThan(ABILITY_THRESHOLDS.A2_MIN_ACCURACY);
  });

  it('Accuracy thresholds are in 0..1 range', () => {
    expect(ABILITY_THRESHOLDS.A2_MIN_ACCURACY).toBeGreaterThan(0);
    expect(ABILITY_THRESHOLDS.A2_MIN_ACCURACY).toBeLessThan(1);
    expect(ABILITY_THRESHOLDS.A2_PLUS_MIN_ACCURACY).toBeGreaterThan(0);
    expect(ABILITY_THRESHOLDS.A2_PLUS_MIN_ACCURACY).toBeLessThan(1);
  });
});

// ─── AbilityLevel type sanity ──────────────────────────────────────────────

describe('AbilityLevel type', () => {
  it('all 4 tiers are recognized', () => {
    const levels: AbilityLevel[] = ['A0', 'A1', 'A2', 'A2+'];
    expect(levels.length).toBe(4);
  });
});
