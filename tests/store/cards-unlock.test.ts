/**
 * v2.0.B.232 招 2: collectible card unlock logic.
 *
 * Covers:
 *  - Fresh save: no cards unlocked.
 *  - Completing kt-ch1-l1 unlocks Mochi (lesson-id direct match).
 *  - Completing kt-ch1-l2 unlocks Hana (lesson-id direct match).
 *  - Re-completing same lesson is idempotent (no duplicate unlocks).
 *  - Completing a lesson in chapter N never unlocks cards from chapter M.
 *  - isCardUnlockable pure helper respects both lessonId + minChapterLessons.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  isCardUnlockable,
  unlockCardsForLesson,
  readUnlockedCardIds,
  getAllCards,
  getCardById,
} from '../../src/data/cards';

describe('collectible cards (招 2)', () => {
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

  it('fresh save has zero unlocked cards', () => {
    expect(readUnlockedCardIds().size).toBe(0);
  });

  it('all 11 expected character cards are defined', () => {
    const cards = getAllCards();
    expect(cards.length).toBe(11);
    // Spot-check the 11 character ids from the task spec.
    expect(getCardById('mochi')).toBeDefined();
    expect(getCardById('hana')).toBeDefined();
    expect(getCardById('grandma-mei')).toBeDefined();
    expect(getCardById('momotaro')).toBeDefined();
    expect(getCardById('ugly-duckling')).toBeDefined();
    expect(getCardById('rabbit')).toBeDefined();
    expect(getCardById('tortoise')).toBeDefined();
    expect(getCardById('camel')).toBeDefined();
    expect(getCardById('baba-yaga')).toBeDefined();
    expect(getCardById('swan-princess')).toBeDefined();
    expect(getCardById('ye-xian')).toBeDefined();
  });

  it('completing kt-ch1-l1 unlocks Mochi', () => {
    markLessonComplete(1, 'kt-ch1-l1');
    const newly = unlockCardsForLesson('kt-ch1-l1');
    expect(newly).toContain('mochi');
    expect(readUnlockedCardIds().has('mochi')).toBe(true);
  });

  it('completing kt-ch1-l2 unlocks Hana', () => {
    markLessonComplete(1, 'kt-ch1-l2');
    const newly = unlockCardsForLesson('kt-ch1-l2');
    expect(newly).toContain('hana');
  });

  it('re-completing same lesson returns empty newly list (idempotent)', () => {
    markLessonComplete(1, 'kt-ch1-l1');
    const first = unlockCardsForLesson('kt-ch1-l1');
    const second = unlockCardsForLesson('kt-ch1-l1');
    expect(first).toContain('mochi');
    expect(second).toEqual([]);
    expect(readUnlockedCardIds().size).toBe(1);
  });

  it('completing a Ch1 lesson does not unlock Ch4 cards', () => {
    markLessonComplete(1, 'kt-ch1-l1');
    const newly = unlockCardsForLesson('kt-ch1-l1');
    expect(newly).not.toContain('rabbit');
    expect(newly).not.toContain('tortoise');
  });

  it('isCardUnlockable: lesson-id match overrides minChapterLessons gate', () => {
    const hana = getCardById('hana')!;
    // Hana's unlock has lessonId 'kt-ch1-l2' AND minChapterLessons 2.
    const completed = new Set(['kt-ch1-l2']);
    expect(isCardUnlockable(hana, completed, { 1: 1 })).toBe(true);
  });

  it('isCardUnlockable: returns false when neither condition met', () => {
    const swan = getCardById('swan-princess')!;
    expect(isCardUnlockable(swan, new Set(), {})).toBe(false);
  });
});
