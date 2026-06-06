/**
 * v2.0.B.234 招 3: Mascot Customization unit tests.
 *
 * Covers:
 *  - 11 outfits + 1 default = 12 entries.
 *  - Fresh save: only 'default' is in unlocked set.
 *  - readOutfit() → 'default' on fresh save.
 *  - setOutfit() refuses locked ids, accepts unlocked.
 *  - unlockOutfit() idempotent.
 *  - unlockOutfitsForLesson() respects chapter-complete / lesson-id /
 *    milestone-streak conditions.
 *  - Completing a Ch1 lesson never unlocks Ch3 outfits (chapter isolation).
 *  - Streak milestone outfit unlocks once streak >= threshold.
 *  - isOutfitUnlockable pure helper respects all 4 condition types.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  OUTFITS,
  isOutfitUnlockable,
  unlockOutfit,
  unlockOutfitsForLesson,
  readUnlockedOutfits,
  readOutfit,
  setOutfit,
  getAllOutfits,
  getOutfitById,
  getActiveOutfitVisual,
} from '../../src/data/mascotOutfits';

describe('mascot outfits (招 3)', () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  function markLessonComplete(chapter: number, lessonId: string) {
    const key = `pickup.chapter.${chapter}.lessons.completed`;
    const raw = storage[key];
    const arr: string[] = raw ? JSON.parse(raw) : [];
    if (!arr.includes(lessonId)) arr.push(lessonId);
    storage[key] = JSON.stringify(arr);
  }

  function setChapterTotal(chapter: number, total: number) {
    storage[`pickup.chapter.${chapter}.lessons.total`] = String(total);
  }

  function setStreakCount(n: number) {
    storage['pickup.streak.count'] = String(n);
  }

  it('exposes 12 total outfits (default + 11 spec entries)', () => {
    expect(getAllOutfits().length).toBe(12);
    expect(OUTFITS.length).toBe(12);
    // Spot-check ids from task spec
    expect(getOutfitById('default')).toBeDefined();
    expect(getOutfitById('kimono')).toBeDefined();
    expect(getOutfitById('duck-hat')).toBeDefined();
    expect(getOutfitById('bunny-ears')).toBeDefined();
    expect(getOutfitById('tortoise-shell')).toBeDefined();
    expect(getOutfitById('desert-cloak')).toBeDefined();
    expect(getOutfitById('witch-hat')).toBeDefined();
    expect(getOutfitById('swan-cloak')).toBeDefined();
    expect(getOutfitById('tang-robe')).toBeDefined();
    expect(getOutfitById('space-suit')).toBeDefined();
    expect(getOutfitById('santa-suit')).toBeDefined();
    expect(getOutfitById('scholar-cap')).toBeDefined();
  });

  it('every outfit has bilingual name + bio + warm unlockHint', () => {
    for (const o of OUTFITS) {
      expect(o.name.zh.length).toBeGreaterThan(0);
      expect(o.name.en.length).toBeGreaterThan(0);
      expect(o.bio.zh.length).toBeGreaterThan(0);
      expect(o.bio.en.length).toBeGreaterThan(0);
      expect(o.unlockHint.zh.length).toBeGreaterThan(0);
      expect(o.unlockHint.en.length).toBeGreaterThan(0);
      // Microcopy guard: no shame language anywhere in the database.
      expect(o.unlockHint.zh.toLowerCase()).not.toContain('haven');
      expect(o.unlockHint.zh.toLowerCase()).not.toContain('locked out');
      expect(o.unlockHint.en.toLowerCase()).not.toContain("haven't earned");
      expect(o.unlockHint.en.toLowerCase()).not.toContain('not allowed');
    }
  });

  it('fresh save: only default is unlocked', () => {
    const set = readUnlockedOutfits();
    expect(set.has('default')).toBe(true);
    expect(set.size).toBe(1);
  });

  it('readOutfit() defaults to default on fresh save', () => {
    expect(readOutfit()).toBe('default');
  });

  it('setOutfit refuses to set a locked outfit', () => {
    const ok = setOutfit('kimono');
    expect(ok).toBe(false);
    expect(readOutfit()).toBe('default');
  });

  it('setOutfit accepts default at any time', () => {
    const ok = setOutfit('default');
    expect(ok).toBe(true);
    expect(readOutfit()).toBe('default');
  });

  it('setOutfit accepts an unlocked outfit', () => {
    unlockOutfit('kimono');
    const ok = setOutfit('kimono');
    expect(ok).toBe(true);
    expect(readOutfit()).toBe('kimono');
  });

  it('setOutfit refuses unknown outfit id', () => {
    expect(setOutfit('nonexistent-outfit-id')).toBe(false);
  });

  it('unlockOutfit is idempotent — second call returns false', () => {
    expect(unlockOutfit('kimono')).toBe(true);
    expect(unlockOutfit('kimono')).toBe(false);
    expect(readUnlockedOutfits().has('kimono')).toBe(true);
  });

  it('unlockOutfit returns false for default (always considered unlocked)', () => {
    expect(unlockOutfit('default')).toBe(false);
  });

  it('isOutfitUnlockable: default always true', () => {
    const def = getOutfitById('default')!;
    expect(isOutfitUnlockable(def, new Set(), {}, {}, 0)).toBe(true);
  });

  it('isOutfitUnlockable: chapterComplete needs >= total lessons in chapter', () => {
    const kimono = getOutfitById('kimono')!;
    // Total = 5 lessons, only 4 done → not unlockable
    expect(isOutfitUnlockable(kimono, new Set(), { 1: 4 }, { 1: 5 }, 0)).toBe(false);
    // 5 / 5 → unlockable
    expect(isOutfitUnlockable(kimono, new Set(), { 1: 5 }, { 1: 5 }, 0)).toBe(true);
    // Total unknown + >= 1 lesson done → conservative true
    expect(isOutfitUnlockable(kimono, new Set(), { 1: 1 }, {}, 0)).toBe(true);
    // Total unknown + 0 lessons done → false
    expect(isOutfitUnlockable(kimono, new Set(), { 1: 0 }, {}, 0)).toBe(false);
  });

  it('isOutfitUnlockable: lessonComplete needs exact lesson id', () => {
    const tortoise = getOutfitById('tortoise-shell')!;
    expect(isOutfitUnlockable(tortoise, new Set(['kt-ch3-l5']), {}, {}, 0)).toBe(true);
    expect(isOutfitUnlockable(tortoise, new Set(['kt-ch3-l4']), {}, {}, 0)).toBe(false);
  });

  it('isOutfitUnlockable: milestoneStreak needs streak >= threshold', () => {
    const santa = getOutfitById('santa-suit')!;
    expect(isOutfitUnlockable(santa, new Set(), {}, {}, 6)).toBe(false);
    expect(isOutfitUnlockable(santa, new Set(), {}, {}, 7)).toBe(true);
    expect(isOutfitUnlockable(santa, new Set(), {}, {}, 30)).toBe(true);
  });

  it('unlockOutfitsForLesson: completing Ch1 final lesson unlocks kimono', () => {
    setChapterTotal(1, 3);
    markLessonComplete(1, 'kt-ch1-l1');
    markLessonComplete(1, 'kt-ch1-l2');
    markLessonComplete(1, 'kt-ch1-l3');
    const newly = unlockOutfitsForLesson('kt-ch1-l3');
    expect(newly).toContain('kimono');
  });

  it('unlockOutfitsForLesson: completing only 1 of 3 Ch1 lessons does NOT unlock kimono', () => {
    setChapterTotal(1, 3);
    markLessonComplete(1, 'kt-ch1-l1');
    const newly = unlockOutfitsForLesson('kt-ch1-l1');
    expect(newly).not.toContain('kimono');
  });

  it('unlockOutfitsForLesson: chapter isolation — Ch1 progress never unlocks Ch3 outfits', () => {
    setChapterTotal(1, 3);
    markLessonComplete(1, 'kt-ch1-l1');
    markLessonComplete(1, 'kt-ch1-l2');
    markLessonComplete(1, 'kt-ch1-l3');
    const newly = unlockOutfitsForLesson('kt-ch1-l3');
    // Ch3 outfits stay locked
    expect(newly).not.toContain('bunny-ears');
    expect(newly).not.toContain('tortoise-shell');
    // Ch7 outfit also stays locked
    expect(newly).not.toContain('tang-robe');
  });

  it('unlockOutfitsForLesson: lesson-id direct match unlocks tortoise-shell', () => {
    markLessonComplete(3, 'kt-ch3-l5');
    const newly = unlockOutfitsForLesson('kt-ch3-l5');
    expect(newly).toContain('tortoise-shell');
  });

  it('unlockOutfitsForLesson: idempotent — second call returns empty', () => {
    setChapterTotal(1, 3);
    markLessonComplete(1, 'kt-ch1-l1');
    markLessonComplete(1, 'kt-ch1-l2');
    markLessonComplete(1, 'kt-ch1-l3');
    const first = unlockOutfitsForLesson('kt-ch1-l3');
    expect(first).toContain('kimono');
    const second = unlockOutfitsForLesson('kt-ch1-l3');
    expect(second).toEqual([]);
  });

  it('unlockOutfitsForLesson: streak >= 7 unlocks santa-suit alongside lesson completion', () => {
    setStreakCount(7);
    markLessonComplete(1, 'kt-ch1-l1');
    const newly = unlockOutfitsForLesson('kt-ch1-l1');
    expect(newly).toContain('santa-suit');
  });

  it('unlockOutfitsForLesson: streak >= 30 unlocks all milestone outfits', () => {
    setStreakCount(30);
    markLessonComplete(1, 'kt-ch1-l1');
    const newly = unlockOutfitsForLesson('kt-ch1-l1');
    expect(newly).toContain('santa-suit');
    expect(newly).toContain('space-suit');
    expect(newly).toContain('scholar-cap');
  });

  it('getActiveOutfitVisual: returns default base + empty badge on fresh save', () => {
    const vis = getActiveOutfitVisual();
    expect(vis.outfit.id).toBe('default');
    expect(vis.imageSrc).toBe('/mascots/calico-anchor.webp');
    expect(vis.emojiBadge).toBe('');
  });

  it('getActiveOutfitVisual: returns badge once an outfit is applied', () => {
    unlockOutfit('kimono');
    setOutfit('kimono');
    const vis = getActiveOutfitVisual();
    expect(vis.outfit.id).toBe('kimono');
    expect(vis.emojiBadge).toBe('👘');
  });
});
