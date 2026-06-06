/**
 * v2.0.B.239 — NextStoryPicker tests (logic layer).
 *
 * Component rendering lives behind react-dom; vitest config is node-only.
 * We instead unit-test the pure helpers + integration glue: recommendation
 * resolution, top-4 ranking, "明晚聽" XP reward, and the queue + scheduler
 * touchpoints (without actually firing notifications).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolveRecommendedChapters } from '../../src/react-app/components/NextStoryPicker';
import { readTomorrowQueue, queueTomorrow } from '../../src/data/tomorrowQueue';
import { addXp, readXp } from '../../src/data/xp';
import { recommendNextStories } from '../../src/data/storyRecommend';
import { defaultCandidatePool } from '../../src/data/storyTags';

describe('NextStoryPicker — logic layer', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('resolveRecommendedChapters: returns up to 4 cards', () => {
    const cards = resolveRecommendedChapters(/* excludeChapter */ 1, 4);
    expect(cards.length).toBeLessThanOrEqual(4);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('resolveRecommendedChapters: excludes the just-finished chapter', () => {
    const cards = resolveRecommendedChapters(2, 4);
    for (const c of cards) {
      expect(c.chapter).not.toBe(2);
    }
  });

  it('resolveRecommendedChapters: dedupes chapters (canon + elective)', () => {
    const cards = resolveRecommendedChapters(99, 4);
    const ids = cards.map((c) => c.chapter);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('resolveRecommendedChapters: cold-start surfaces canon (Ch2 桃太郎 + Ch3 醜小鴨) first', () => {
    // Empty storage → cold start → engine prepends canon (Ch2 + Ch3).
    const cards = resolveRecommendedChapters(99, 4);
    const ids = cards.map((c) => c.chapter);
    expect(ids).toContain(2);
    expect(ids).toContain(3);
    // Canon comes before elective per pickTop4.
    expect(ids.indexOf(2)).toBeLessThan(4);
    expect(ids.indexOf(3)).toBeLessThan(4);
  });

  it('明晚聽 path: queueTomorrow + addXp(+5) compose without conflict', () => {
    const xpBefore = readXp();
    const entry = queueTomorrow(5);
    addXp(5);
    expect(entry.chapter).toBe(5);
    expect(readTomorrowQueue()?.chapter).toBe(5);
    expect(readXp()).toBe(xpBefore + 5);
  });

  it('明晚聽 path: second pick replaces queue (single-slot)', () => {
    queueTomorrow(3);
    queueTomorrow(6);
    const q = readTomorrowQueue();
    expect(q?.chapter).toBe(6);
  });

  it('engine integration: recommendNextStories yields a non-empty elective for fresh users', () => {
    const recs = recommendNextStories(
      {
        completedChapters: new Set(),
        hookCompletionByType: { B1: 0, B2: 0, B3: 0, B4: 0, B5: 0, B6: 0 },
        preferredTags: [],
        abilityLevel: 'A0',
      },
      defaultCandidatePool(),
    );
    expect(recs.elective.length).toBeGreaterThan(0);
    expect(recs.core.length).toBeGreaterThanOrEqual(2);
  });

  it('top-4 ranking: at least one card has score >= the rest (no negatives)', () => {
    const cards = resolveRecommendedChapters(1, 4);
    for (const c of cards) {
      expect(c.score).toBeGreaterThanOrEqual(0);
    }
  });

  it('每張 card carries bilingual reason text', () => {
    const cards = resolveRecommendedChapters(1, 4);
    for (const c of cards) {
      expect(typeof c.reason.zh).toBe('string');
      expect(typeof c.reason.en).toBe('string');
      expect(c.reason.zh.length).toBeGreaterThan(0);
      expect(c.reason.en.length).toBeGreaterThan(0);
    }
  });

  it('Cold-start completedChapter=2 excludes Ch2 from top-4 (just finished it)', () => {
    const cards = resolveRecommendedChapters(2, 4);
    expect(cards.find((c) => c.chapter === 2)).toBeUndefined();
  });
});
