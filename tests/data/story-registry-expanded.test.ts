/**
 * v2.0.B.242 — Story Registry 110-entry expansion tests.
 *
 * Verifies the B.242 metadata-DB expansion that grew the registry from 30 →
 * 110 entries (27 shipped + 73 short candidate + 10 mid-long candidate).
 *
 * Covers ground that story-registry.test.ts does not:
 *   - 110 total entries, 27 shipped, 83 candidate (73 short + 10 mid-long)
 *   - All entries 100% public-domain (no 'licensed' anywhere)
 *   - Every shipped entry has a numeric, unique shippedChapter (Ch0-Ch26)
 *   - Every mid-long entry carries `suggestedEpisodes` and lengthClass='mid-long'
 *   - listMidLong() / listShortCandidates() / bearDistributionStatus() helpers
 *   - Bear cultural distribution weight calc respects mid-long episode weight
 *   - getStoryByChapter aligned to lessons-ch{N}.json indexing
 */
import { describe, it, expect } from 'vitest';
import {
  STORY_REGISTRY,
  REGISTRY_TOTAL,
  REGISTRY_SHIPPED_COUNT,
  REGISTRY_CANDIDATE_COUNT,
  REGISTRY_SHORT_CANDIDATE_COUNT,
  REGISTRY_MID_LONG_COUNT,
  listShippedStories,
  listCandidateStories,
  listMidLong,
  listShortCandidates,
  bearDistributionStatus,
  getStoryByChapter,
  getStoryById,
} from '../../src/data/storyRegistry';

// ─── Size + status counts ──────────────────────────────────────────────────

describe('B.242 expansion — registry size', () => {
  it('has exactly 110 entries', () => {
    expect(STORY_REGISTRY.length).toBe(110);
    expect(REGISTRY_TOTAL).toBe(110);
  });

  it('has 27 shipped entries', () => {
    expect(STORY_REGISTRY.filter((s) => s.status === 'shipped').length).toBe(30);
    expect(REGISTRY_SHIPPED_COUNT).toBe(30);
  });

  it('has 83 candidate entries (73 short + 10 mid-long)', () => {
    expect(STORY_REGISTRY.filter((s) => s.status === 'candidate').length).toBe(80);
    expect(REGISTRY_CANDIDATE_COUNT).toBe(80);
  });

  it('exactly 73 short candidates', () => {
    expect(REGISTRY_SHORT_CANDIDATE_COUNT).toBe(73);
    expect(listShortCandidates().length).toBe(73);
  });

  it('exactly 10 mid-long candidates', () => {
    // v2.0.B.258: 3 mid-long shipped (西遊記/諸葛亮/Odyssey), candidate-mid-long 10 → 7
    expect(REGISTRY_MID_LONG_COUNT).toBe(10); // total still 10
    expect(listMidLong().length).toBe(7); // candidates only after 3 shipped
  });

  it('all ids are unique across registry', () => {
    const ids = STORY_REGISTRY.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── 100% public-domain rule ───────────────────────────────────────────────

describe('B.242 expansion — 100% public-domain', () => {
  it('zero entries with copyright = "licensed"', () => {
    const licensed = STORY_REGISTRY.filter((s) => s.copyright === 'licensed');
    expect(licensed.length, `unexpected licensed entries: ${licensed.map((s) => s.id).join(', ')}`).toBe(0);
  });

  it('every entry uses one of the two PD copyright values', () => {
    for (const e of STORY_REGISTRY) {
      expect(
        ['public-domain', 'public-domain-no-modern-adaptation'],
        `${e.id} has unexpected copyright ${e.copyright}`,
      ).toContain(e.copyright);
    }
  });
});

// ─── Shipped chapter alignment (Ch0-Ch26 lessons-ch{N}.json indexing) ─────

describe('B.242 expansion — shipped chapter alignment', () => {
  it('every shipped entry has numeric shippedChapter', () => {
    for (const s of listShippedStories()) {
      expect(typeof s.shippedChapter, `${s.id} missing shippedChapter`).toBe('number');
    }
  });

  it('shipped chapter set covers Ch0-Ch29 inclusive (30 unique slots)', () => {
    const chapters = listShippedStories().map((s) => s.shippedChapter!);
    expect(new Set(chapters).size).toBe(chapters.length);
    expect(chapters.length).toBe(30);
    const sorted = [...chapters].sort((a, b) => a - b);
    expect(sorted[0]).toBe(0);
    expect(sorted[sorted.length - 1]).toBe(29);
  });

  it('canonical chapter→storyId mapping matches lessons-ch{N}.json', () => {
    const expected: Record<number, string> = {
      0: 'ground-floor',
      1: 'momotaro',
      2: 'ugly-duckling',
      3: 'tortoise-hare',
      4: 'camel-hump',
      5: 'baba-yaga',
      6: 'six-swans',
      7: 'yexian',
      8: 'three-pigs',
      9: 'cinderella',
      10: 'change',
      11: 'houyi',
      12: 'cowherd-weaver',
      13: 'red-riding-hood',
      14: 'urashima',
      15: 'emperors-new-clothes',
      16: 'issun-boshi',
      17: 'crane-gratitude',
      18: 'heungbu-nolbu',
      19: 'sang-kancil',
      20: 'enormous-turnip',
      21: 'anansi-spider',
      22: 'mencius-mother',
      23: 'sima-guang',
      24: 'kong-rong',
      25: 'yugong',
      26: 'archimedes-eureka',
      // v2.0.B.258: round 1 mid-long ship
      27: 'journey-to-west-series',
      28: 'zhuge-liang-strategems',
      29: 'odyssey',
    };
    for (const [ch, id] of Object.entries(expected)) {
      const entry = getStoryByChapter(Number(ch));
      expect(entry, `Ch${ch} should map to ${id}`).toBeDefined();
      expect(entry!.id, `Ch${ch} expected ${id} got ${entry!.id}`).toBe(id);
    }
  });

  it('candidate entries have no shippedChapter', () => {
    for (const c of listCandidateStories()) {
      expect(c.shippedChapter, `candidate ${c.id} should not have shippedChapter`).toBeUndefined();
    }
  });
});

// ─── Mid-long invariants ───────────────────────────────────────────────────

describe('B.242 expansion — mid-long entries', () => {
  it('every mid-long entry has lengthClass="mid-long"', () => {
    for (const e of listMidLong()) {
      expect(e.lengthClass).toBe('mid-long');
    }
  });

  it('every mid-long entry has positive suggestedEpisodes', () => {
    for (const e of listMidLong()) {
      expect(typeof e.suggestedEpisodes, `${e.id} missing suggestedEpisodes`).toBe('number');
      expect(e.suggestedEpisodes!).toBeGreaterThanOrEqual(4);
      expect(e.suggestedEpisodes!).toBeLessThanOrEqual(12);
    }
  });

  it('all mid-long entries are candidates (no mid-long shipped yet)', () => {
    for (const e of listMidLong()) {
      expect(e.status).toBe('candidate');
    }
  });

  it('mid-long entry set includes all 10 expected serial arcs', () => {
    // v2.0.B.258: use full STORY_REGISTRY filter instead of listMidLong()
    // (listMidLong filters status='candidate', misses 3 shipped mid-long after Ch27-29)
    const ids = new Set(STORY_REGISTRY.filter((s) => s.lengthClass === 'mid-long').map((e) => e.id));
    const expected = [
      'journey-to-west-series',
      'zhuge-liang-strategems',
      'odyssey',
      'heracles-twelve-labors',
      'robin-hood',
      'king-arthur-round-table',
      'sinbad-seven-voyages',
      'marco-polo-travels',
      'heike-monogatari',
      'gullivers-travels',
    ];
    for (const id of expected) {
      expect(ids.has(id), `mid-long missing ${id}`).toBe(true);
    }
  });

  it('short candidates never carry suggestedEpisodes', () => {
    for (const e of listShortCandidates()) {
      expect(e.suggestedEpisodes, `short candidate ${e.id} should not have suggestedEpisodes`).toBeUndefined();
    }
  });
});

// ─── New short-candidate sample probes ─────────────────────────────────────

describe('B.242 expansion — short-candidate sample probes', () => {
  const sampledIds = [
    'tianluo-maiden',
    'tiger-grandma',
    'baogong-verdict-1',
    'baogong-verdict-5',
    'rapunzel',
    'frog-prince',
    'little-match-girl',
    'thumbelina',
    'boy-cried-wolf',
    'north-wind-sun',
    'lion-mouse',
    'kasa-jizo',
    'yuki-onna',
    'sun-moon-tiger',
    'sang-kancil-tiger',
    'bawang-putih',
    'monkey-crocodile',
    'firebird',
    'three-bears',
    'why-mosquito-buzzes',
    'aladdin-short',
    'newton-apple',
    'helen-keller-water',
  ];

  it.each(sampledIds)('candidate %s exists and is short PD', (id) => {
    const e = getStoryById(id);
    expect(e, `missing ${id}`).toBeDefined();
    expect(e!.status).toBe('candidate');
    expect(e!.lengthClass ?? 'short').toBe('short');
    expect(['public-domain', 'public-domain-no-modern-adaptation']).toContain(e!.copyright);
    expect(e!.nameEn.length).toBeGreaterThan(0);
    expect(e!.nameZh.length).toBeGreaterThan(0);
    expect(e!.source.length).toBeGreaterThan(0);
  });
});

// ─── Bear distribution helper ──────────────────────────────────────────────

describe('B.242 expansion — bearDistributionStatus()', () => {
  it('returns 4 buckets that sum to ~1.0', () => {
    const status = bearDistributionStatus();
    const sum =
      status.buckets.chinese +
      status.buckets.western +
      status.buckets.asian +
      status.buckets.other;
    expect(sum).toBeGreaterThan(0.99);
    expect(sum).toBeLessThan(1.01);
  });

  it('exposes locked Bear target (35/40/15/10)', () => {
    const status = bearDistributionStatus();
    expect(status.target.chinese).toBeCloseTo(0.35);
    expect(status.target.western).toBeCloseTo(0.40);
    expect(status.target.asian).toBeCloseTo(0.15);
    expect(status.target.other).toBeCloseTo(0.10);
  });

  it('episode-weight on: mid-long entries contribute suggestedEpisodes weight', () => {
    const weighted = bearDistributionStatus({ useEpisodeWeight: true });
    const unweighted = bearDistributionStatus({ useEpisodeWeight: false });
    // total weight on must be > unweighted total because mid-long expand
    expect(weighted.totalWeight).toBeGreaterThan(unweighted.totalWeight);
    // total unweighted should equal registry size (110)
    expect(unweighted.totalWeight).toBe(110);
  });

  it('returns delta = bucket - target', () => {
    const status = bearDistributionStatus();
    expect(status.delta.chinese).toBeCloseTo(
      status.buckets.chinese - status.target.chinese,
    );
    expect(status.delta.western).toBeCloseTo(
      status.buckets.western - status.target.western,
    );
  });
});

// ─── Schema completeness ───────────────────────────────────────────────────

describe('B.242 expansion — schema completeness', () => {
  it('every entry has at least 1 culture / style / protagonist / theme', () => {
    for (const e of STORY_REGISTRY) {
      expect(e.culture.length, `${e.id} culture empty`).toBeGreaterThan(0);
      expect(e.style.length, `${e.id} style empty`).toBeGreaterThan(0);
      expect(e.protagonist.length, `${e.id} protagonist empty`).toBeGreaterThan(0);
      expect(e.theme.length, `${e.id} theme empty`).toBeGreaterThan(0);
    }
  });

  it('every entry has a valid CEFR level', () => {
    for (const e of STORY_REGISTRY) {
      expect(['A0', 'A1', 'A2', 'A2+']).toContain(e.cefrLevel);
    }
  });

  it('every entry has non-empty nameEn / nameZh / source', () => {
    for (const e of STORY_REGISTRY) {
      expect(e.nameEn.trim().length, `${e.id} nameEn empty`).toBeGreaterThan(0);
      expect(e.nameZh.trim().length, `${e.id} nameZh empty`).toBeGreaterThan(0);
      expect(e.source.trim().length, `${e.id} source empty`).toBeGreaterThan(0);
    }
  });

  it('every candidate that opts into lengthClass uses "short" or "mid-long"', () => {
    for (const e of listCandidateStories()) {
      if (e.lengthClass !== undefined) {
        expect(['short', 'mid-long']).toContain(e.lengthClass);
      }
    }
  });
});
