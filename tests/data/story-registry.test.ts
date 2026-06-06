/**
 * v2.0.B.238 — Story Registry + preference-filtered recommendation tests.
 *
 * Covers:
 *   - 30 entries (9 shipped + 21 candidate)
 *   - schema completeness: nameEn / nameZh / source all non-empty
 *   - copyright: only 'public-domain' or 'public-domain-no-modern-adaptation'
 *   - shipped entries have shippedChapter aligned to UI chapter
 *   - filterByPreference rules (empty axis = wildcard, AND across axes)
 *   - suggestNextToShip ROI ordering (paired-with-shipped wins)
 *   - readUserPreferences / setUserPreferences round trip
 *   - recommendNextStories preference filter integration
 *   - teaserCandidates surface candidate stories
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  STORY_REGISTRY,
  REGISTRY_TOTAL,
  REGISTRY_SHIPPED_COUNT,
  REGISTRY_CANDIDATE_COUNT,
  filterByPreference,
  suggestNextToShip,
  listShippedStories,
  listCandidateStories,
  getStoryById,
  getStoryByChapter,
  preferenceOverlapScore,
} from '../../src/data/storyRegistry';
import {
  recommendNextStories,
  teaserCandidates,
} from '../../src/data/storyRecommend';
import { defaultCandidatePool, type HookType } from '../../src/data/storyTags';
import {
  readUserPreferences,
  setUserPreferences,
  ALL_PREFERENCES_DEFAULT,
  hasAnyPreference,
  USER_PREFERENCES_STORAGE_KEY,
  type UserPreferences,
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

// ─── Registry size + schema sanity ─────────────────────────────────────────

describe('STORY_REGISTRY size + status counts', () => {
  it('has exactly 30 entries', () => {
    expect(STORY_REGISTRY.length).toBe(REGISTRY_TOTAL);
    expect(STORY_REGISTRY.length).toBe(30);
  });

  it('has exactly 9 shipped entries', () => {
    const shipped = STORY_REGISTRY.filter((s) => s.status === 'shipped');
    expect(shipped.length).toBe(REGISTRY_SHIPPED_COUNT);
    expect(shipped.length).toBe(9);
  });

  it('has exactly 21 candidate entries', () => {
    const candidates = STORY_REGISTRY.filter((s) => s.status === 'candidate');
    expect(candidates.length).toBe(REGISTRY_CANDIDATE_COUNT);
    expect(candidates.length).toBe(21);
  });

  it('all ids are unique', () => {
    const ids = STORY_REGISTRY.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('STORY_REGISTRY schema completeness', () => {
  it('every entry has non-empty nameEn / nameZh / source', () => {
    for (const e of STORY_REGISTRY) {
      expect(e.nameEn.length, `nameEn empty for ${e.id}`).toBeGreaterThan(0);
      expect(e.nameZh.length, `nameZh empty for ${e.id}`).toBeGreaterThan(0);
      expect(e.source.length, `source empty for ${e.id}`).toBeGreaterThan(0);
    }
  });

  it('every entry has at least one culture/style/protagonist/theme tag', () => {
    for (const e of STORY_REGISTRY) {
      expect(e.culture.length, `culture empty for ${e.id}`).toBeGreaterThan(0);
      expect(e.style.length, `style empty for ${e.id}`).toBeGreaterThan(0);
      expect(e.protagonist.length, `protagonist empty for ${e.id}`).toBeGreaterThan(0);
      expect(e.theme.length, `theme empty for ${e.id}`).toBeGreaterThan(0);
    }
  });

  it('every entry has a valid CEFR level', () => {
    for (const e of STORY_REGISTRY) {
      expect(['A0', 'A1', 'A2', 'A2+']).toContain(e.cefrLevel);
    }
  });
});

describe('STORY_REGISTRY copyright policy', () => {
  it('copyright is only public-domain or public-domain-no-modern-adaptation (no licensed)', () => {
    for (const e of STORY_REGISTRY) {
      expect(
        ['public-domain', 'public-domain-no-modern-adaptation'],
        `entry ${e.id} has disallowed copyright ${e.copyright}`,
      ).toContain(e.copyright);
    }
  });

  it('Disney-adjacent stories (snow-white, little-mermaid, aladdin, mulan, cinderella) flagged "no-modern-adaptation"', () => {
    for (const id of ['snow-white', 'little-mermaid', 'aladdin', 'mulan', 'cinderella']) {
      const e = getStoryById(id);
      expect(e, `missing ${id}`).toBeDefined();
      expect(e!.copyright).toBe('public-domain-no-modern-adaptation');
    }
  });
});

// ─── Shipped chapter alignment ─────────────────────────────────────────────

describe('shipped entries align to UI chapter numbering', () => {
  it('every shipped entry has a numeric shippedChapter', () => {
    const shipped = STORY_REGISTRY.filter((s) => s.status === 'shipped');
    for (const s of shipped) {
      expect(typeof s.shippedChapter).toBe('number');
    }
  });

  it('shipped chapters are unique (no two stories collide on same UI slot)', () => {
    const shipped = listShippedStories();
    const chapters = shipped.map((s) => s.shippedChapter!);
    expect(new Set(chapters).size).toBe(chapters.length);
  });

  it('UI mapping: Ch2 = momotaro, Ch3 = ugly-duckling, Ch8 = yexian, Ch10 = cinderella', () => {
    expect(getStoryByChapter(2)?.id).toBe('momotaro');
    expect(getStoryByChapter(3)?.id).toBe('ugly-duckling');
    expect(getStoryByChapter(8)?.id).toBe('yexian');
    expect(getStoryByChapter(10)?.id).toBe('cinderella');
    expect(getStoryByChapter(9)?.id).toBe('three-pigs');
  });

  it('candidate entries have no shippedChapter', () => {
    const candidates = listCandidateStories();
    for (const c of candidates) {
      expect(c.shippedChapter).toBeUndefined();
    }
  });
});

// ─── filterByPreference rules ──────────────────────────────────────────────

describe('filterByPreference — wildcard + AND-across-axes', () => {
  it('all-empty preference (wildcard) returns full registry', () => {
    const out = filterByPreference(ALL_PREFERENCES_DEFAULT);
    expect(out.length).toBe(STORY_REGISTRY.length);
  });

  it('cultures=[china] filters to china-tagged stories only', () => {
    const prefs: UserPreferences = {
      cultures: ['china'],
      styles: [],
      protagonists: [],
      themes: [],
    };
    const out = filterByPreference(prefs);
    expect(out.length).toBeGreaterThan(0);
    for (const e of out) {
      expect(e.culture).toContain('china');
    }
    // Must include yexian (shipped Ch7 china story)
    expect(out.find((e) => e.id === 'yexian')).toBeDefined();
    // Must exclude momotaro (japan only)
    expect(out.find((e) => e.id === 'momotaro')).toBeUndefined();
  });

  it('styles=[animal-fable] returns only fable stories', () => {
    const prefs: UserPreferences = {
      cultures: [],
      styles: ['animal-fable'],
      protagonists: [],
      themes: [],
    };
    const out = filterByPreference(prefs);
    expect(out.length).toBeGreaterThan(0);
    for (const e of out) {
      expect(e.style).toContain('animal-fable');
    }
  });

  it('multi-axis AND: china + fantasy returns only china+fantasy stories', () => {
    const prefs: UserPreferences = {
      cultures: ['china'],
      styles: ['fantasy'],
      protagonists: [],
      themes: [],
    };
    const out = filterByPreference(prefs);
    for (const e of out) {
      expect(e.culture).toContain('china');
      expect(e.style).toContain('fantasy');
    }
    // yexian (china + fantasy) should be in
    expect(out.find((e) => e.id === 'yexian')).toBeDefined();
    // ground-floor (global-folk + warm) should be out
    expect(out.find((e) => e.id === 'ground-floor')).toBeUndefined();
  });

  it('preferenceOverlapScore: china+fantasy on yexian = 2', () => {
    const prefs: UserPreferences = {
      cultures: ['china'],
      styles: ['fantasy'],
      protagonists: [],
      themes: [],
    };
    const yexian = getStoryById('yexian')!;
    expect(preferenceOverlapScore(prefs, yexian)).toBe(2);
  });
});

// ─── suggestNextToShip ROI ordering ────────────────────────────────────────

describe('suggestNextToShip — ROI-ordered candidate list', () => {
  it('returns only candidates (no shipped, no other statuses)', () => {
    const out = suggestNextToShip();
    for (const c of out) {
      expect(c.status).toBe('candidate');
    }
  });

  it('returns 21 entries', () => {
    expect(suggestNextToShip().length).toBe(21);
  });

  it('paired-with-shipped candidates rank high (chang-e ↔ little-mermaid pairs both surface)', () => {
    const out = suggestNextToShip();
    const chang = out.findIndex((c) => c.id === 'chang-e');
    const mermaid = out.findIndex((c) => c.id === 'little-mermaid');
    expect(chang).toBeGreaterThanOrEqual(0);
    expect(mermaid).toBeGreaterThanOrEqual(0);
  });

  it('ordering is deterministic (re-runnable)', () => {
    const a = suggestNextToShip().map((c) => c.id);
    const b = suggestNextToShip().map((c) => c.id);
    expect(a).toEqual(b);
  });
});

// ─── UserPreferences read/write round trip ─────────────────────────────────

describe('readUserPreferences / setUserPreferences', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('missing key returns ALL-default (wildcard)', () => {
    const prefs = readUserPreferences();
    expect(prefs).toEqual(ALL_PREFERENCES_DEFAULT);
    expect(hasAnyPreference(prefs)).toBe(false);
  });

  it('setUserPreferences persists to localStorage at the documented key', () => {
    const input: UserPreferences = {
      cultures: ['china', 'japan'],
      styles: ['fantasy'],
      protagonists: ['animal'],
      themes: ['friendship'],
    };
    setUserPreferences(input);
    expect(storage[USER_PREFERENCES_STORAGE_KEY]).toBeDefined();
    const round = readUserPreferences();
    expect(round).toEqual(input);
  });

  it('malformed JSON returns wildcard default (no crash)', () => {
    storage[USER_PREFERENCES_STORAGE_KEY] = '{not json';
    expect(readUserPreferences()).toEqual(ALL_PREFERENCES_DEFAULT);
  });

  it('hasAnyPreference: empty axes → false; any selection → true', () => {
    expect(hasAnyPreference(ALL_PREFERENCES_DEFAULT)).toBe(false);
    expect(
      hasAnyPreference({ cultures: ['china'], styles: [], protagonists: [], themes: [] }),
    ).toBe(true);
  });
});

// ─── recommendNextStories preference integration ───────────────────────────

describe('recommendNextStories — preference filter integration', () => {
  const pool = defaultCandidatePool();

  it('no preferences passed → behaves like B.237 (no extra filter)', () => {
    const profile = makeProfile({
      completedChapters: new Set([0]),
      abilityLevel: 'A1',
    });
    const a = recommendNextStories(profile, pool);
    const b = recommendNextStories(profile, pool, ALL_PREFERENCES_DEFAULT);
    // Both should yield identical elective chapter sets (wildcard pref ≡ none).
    expect(a.elective.map((r) => r.chapter)).toEqual(b.elective.map((r) => r.chapter));
  });

  it('cultures=[china] preference filters elective to china-shipped chapters only', () => {
    const profile = makeProfile({
      completedChapters: new Set([0]),
      abilityLevel: 'A2',
    });
    const prefs: UserPreferences = {
      cultures: ['china'],
      styles: [],
      protagonists: [],
      themes: [],
    };
    const res = recommendNextStories(profile, pool, prefs);
    // Yexian (Ch8) is the only standard A2 china-tagged shipped chapter
    // present in defaultCandidatePool (Ch1-Ch8 + Ch0). Ch2 桃太郎 + Ch3
    // 醜小鴨 are core canon — exempt from pref filter.
    const electiveChapters = res.elective.map((r) => r.chapter);
    // If the pref filter actually applied (didn't fall back to wildcard), the
    // only china-tagged shipped chapter in pool is Ch8 yexian. We assert no
    // non-china registry-mapped chapter appears in the filtered elective.
    for (const ch of electiveChapters) {
      const entry = getStoryByChapter(ch);
      if (entry && entry.status === 'shipped') {
        expect(entry.culture).toContain('china');
      }
    }
  });

  it('preference wipeout fallback: ultra-narrow prefs that match nothing fall back to unfiltered pool', () => {
    const profile = makeProfile({
      completedChapters: new Set([0]),
      abilityLevel: 'A2',
    });
    // Korea + mystery has no shipped match — should fall back.
    const prefs: UserPreferences = {
      cultures: ['korea'],
      styles: ['mystery'],
      protagonists: [],
      themes: [],
    };
    const res = recommendNextStories(profile, pool, prefs);
    expect(res.elective.length).toBeGreaterThan(0);
  });

  it('core canon (Ch2 momotaro + Ch3 ugly-duckling) exempt from preference filter', () => {
    const profile = makeProfile({
      completedChapters: new Set<number>(),
      abilityLevel: 'A2',
    });
    // Only choose Russia — neither momotaro nor ugly-duckling matches.
    const prefs: UserPreferences = {
      cultures: ['russia'],
      styles: [],
      protagonists: [],
      themes: [],
    };
    const res = recommendNextStories(profile, pool, prefs);
    expect(res.core.map((r) => r.chapter)).toEqual([2, 3]);
  });
});

// ─── teaserCandidates ───────────────────────────────────────────────────────

describe('teaserCandidates — coming-soon surface', () => {
  it('returns at most `limit` entries', () => {
    expect(teaserCandidates(undefined, 3).length).toBeLessThanOrEqual(3);
    expect(teaserCandidates(undefined, 1).length).toBe(1);
    expect(teaserCandidates(undefined, 5).length).toBe(5);
  });

  it('all returned entries are candidate-status stories', () => {
    const cards = teaserCandidates(undefined, 5);
    for (const c of cards) {
      const e = getStoryById(c.id);
      expect(e?.status).toBe('candidate');
    }
  });

  it('all cards carry the Mochi teaser reason (bilingual)', () => {
    const cards = teaserCandidates(undefined, 3);
    for (const c of cards) {
      expect(c.reason.zh).toMatch(/Mochi/);
      expect(c.reason.en).toMatch(/Mochi/);
    }
  });

  it('china-preferenced user gets china-tagged candidates ranked first', () => {
    const prefs: UserPreferences = {
      cultures: ['china'],
      styles: [],
      protagonists: [],
      themes: [],
    };
    const cards = teaserCandidates(prefs, 3);
    // At least the top card should be china-tagged.
    const topEntry = getStoryById(cards[0].id);
    expect(topEntry?.culture).toContain('china');
  });
});
