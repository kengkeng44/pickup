/**
 * Achievements — revived as the shared source of truth (was v1.9.7).
 *
 * Read-only definitions. Each achievement has an unlock predicate that
 * checks current state (lessons / streak / xp). UI (AlertsPage) calls
 * `evaluateAchievements()` and renders the result.
 *
 * No persistence needed — unlock state is derived from existing data.
 * IMPORTANT: this module must never WRITE to localStorage.
 *
 * Live localStorage keys (written by the React app, see LessonPage.tsx):
 *   - pickup.chapter.{N}.lessons.completed  → readCompletedLessons() (runStore)
 *   - pickup.streak.count                   → readStreak() (streak.ts)
 *   - pickup.xp.total                       → readXp() (xp.ts)
 *
 * (The old v1.9.7 predicates read `wordwar.story.chapterProgress` via
 * storyKitten.readChapterProgress — that key is only written by the dead
 * Phaser layer, so React users would never unlock anything. Chapter
 * completion is now derived the same way ChaptersPage does it:
 * a chapter counts as complete when >= 7 of its lessons are done.)
 */
import { readXp, levelForXp } from './xp';
import { readStreak } from './streak';
import { readCompletedLessons } from '../store/runStore';

/** Mirrors ChaptersPage CHAPTERS list (31 stories in the pokedex). */
const TOTAL_CHAPTERS = 31;
/** ChaptersPage convention: a chapter is complete at >= 7 lessons done. */
const LESSONS_PER_CHAPTER = 7;

export interface Achievement {
  id: string;
  emoji: string;
  /** v1.9.42: optional WebP icon — if present, render `<img>` instead of emoji. */
  iconSrc?: string;
  title: string;
  description: string;
  unlocked: boolean;
  progressLabel?: string; // optional "5/7 days" style label
}

interface AchievementDef {
  id: string;
  emoji: string;
  iconSrc?: string;
  title: string;
  description: string;
  check: (state: AppState) => { unlocked: boolean; progressLabel?: string };
}

interface AppState {
  xp: number;
  level: number;
  streak: number;
  /** Total lessons completed across all chapters. */
  lessonsCompleted: number;
  /** Chapters with >= LESSONS_PER_CHAPTER lessons done (ChaptersPage rule). */
  chaptersCompleted: number;
}

const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-lesson',
    emoji: '🐾',
    iconSrc: '/mascots/icon-paw.webp',
    title: 'First Paw',
    description: 'Complete your first lesson',
    check: (s) => ({
      unlocked: s.lessonsCompleted >= 1,
      progressLabel: s.lessonsCompleted >= 1 ? undefined : '0/1 lessons',
    }),
  },
  {
    id: 'ch1-complete',
    emoji: '📚',
    title: 'Storyteller',
    description: 'Finish all of Chapter 1',
    check: (s) => ({
      unlocked: s.chaptersCompleted >= 1,
      progressLabel: s.chaptersCompleted >= 1 ? undefined : 'Ch1 in progress',
    }),
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    iconSrc: '/mascots/icon-flame.webp',
    title: 'Three-Day Spark',
    description: 'Learn 3 days in a row',
    check: (s) => ({
      unlocked: s.streak >= 3,
      progressLabel: s.streak >= 3 ? undefined : `${s.streak}/3 days`,
    }),
  },
  {
    id: 'streak-7',
    emoji: '⚡',
    iconSrc: '/mascots/icon-lightning.webp',
    title: 'One-Week Wonder',
    description: 'Learn 7 days in a row',
    check: (s) => ({
      unlocked: s.streak >= 7,
      progressLabel: s.streak >= 7 ? undefined : `${s.streak}/7 days`,
    }),
  },
  {
    id: 'streak-30',
    emoji: '🌟',
    iconSrc: '/mascots/icon-star.webp',
    title: 'Monthly Master',
    description: 'Learn 30 days in a row',
    check: (s) => ({
      unlocked: s.streak >= 30,
      progressLabel: s.streak >= 30 ? undefined : `${s.streak}/30 days`,
    }),
  },
  {
    id: 'xp-50',
    emoji: '⭐',
    iconSrc: '/mascots/node-star.webp',
    title: 'Rising Star',
    description: 'Reach Level 2 (50 XP)',
    check: (s) => ({
      unlocked: s.level >= 2,
      progressLabel: s.level >= 2 ? undefined : `${s.xp}/50 XP`,
    }),
  },
  {
    id: 'xp-200',
    emoji: '🎯',
    title: 'Sharpshooter',
    description: 'Reach Level 3 (200 XP)',
    check: (s) => ({
      unlocked: s.level >= 3,
      progressLabel: s.level >= 3 ? undefined : `${s.xp}/200 XP`,
    }),
  },
  {
    id: 'all-chapters',
    emoji: '🏆',
    iconSrc: '/mascots/icon-trophy.webp',
    title: 'Story Collector',
    description: `Finish all ${TOTAL_CHAPTERS} stories`,
    check: (s) => ({
      unlocked: s.chaptersCompleted >= TOTAL_CHAPTERS,
      progressLabel:
        s.chaptersCompleted >= TOTAL_CHAPTERS
          ? undefined
          : `${s.chaptersCompleted}/${TOTAL_CHAPTERS} stories`,
    }),
  },
];

/** Read-only derivation of current app state from live localStorage keys. */
function readAppState(): AppState {
  const xp = readXp();
  let lessonsCompleted = 0;
  let chaptersCompleted = 0;
  for (let ch = 1; ch <= TOTAL_CHAPTERS; ch++) {
    const done = readCompletedLessons(ch).size;
    lessonsCompleted += done;
    if (done >= LESSONS_PER_CHAPTER) chaptersCompleted += 1;
  }
  return {
    xp,
    level: levelForXp(xp),
    streak: readStreak(),
    lessonsCompleted,
    chaptersCompleted,
  };
}

export function evaluateAchievements(): Achievement[] {
  const state = readAppState();
  return ACHIEVEMENTS.map(def => {
    const { unlocked, progressLabel } = def.check(state);
    return {
      id: def.id,
      emoji: def.emoji,
      iconSrc: def.iconSrc,
      title: def.title,
      description: def.description,
      unlocked,
      progressLabel,
    };
  });
}

export function countUnlocked(): { unlocked: number; total: number } {
  const all = evaluateAchievements();
  return { unlocked: all.filter(a => a.unlocked).length, total: all.length };
}
