/**
 * v2.0.B.232 招 2 — Collectible Card 圖鑑 (Pokédex-style character cards).
 *
 * Each card represents one story character. Cards unlock when the player
 * completes a qualifying lesson (`unlockCondition.lessonId` matches, OR
 * the player completes >= `unlockCondition.minChapterLessons` lessons of
 * the listed chapter — whichever happens first).
 *
 * Storage: `pickup.cards.unlocked` = JSON string[] of unlocked card ids.
 *
 * Microcopy rule (CLAUDE.md): no streak threat / no shame for missing.
 * Locked cards just show grayscale silhouettes — no "you must do X" text.
 *
 * Art: placeholder emoji string for now. `iconSrc` field reserved for
 * when user-generated PNG cards land. UI uses iconSrc if present, else
 * emoji.
 */

export type CardId = string;

export interface CardUnlockCondition {
  /** Unlock when this specific lesson is completed. */
  lessonId?: string;
  /** Chapter this card belongs to (1-8). Always set, used for grouping. */
  chapter: number;
  /** Alternative: unlock when >= N lessons in this chapter are completed.
   * Useful for "reward at lesson 5 of chapter 2". */
  minChapterLessons?: number;
}

export interface CharacterCard {
  id: CardId;
  nameZh: string;
  nameEn: string;
  chapter: number;
  chapterTitleZh: string;
  /** Placeholder visual — single emoji at scale 96px. Replace with iconSrc
   * once art is ready. */
  emoji: string;
  /** Optional path to a WebP/PNG card art. Takes precedence over emoji. */
  iconSrc?: string;
  /** A2-level English bio + 中文翻譯. Short — fits in a card. */
  bioEn: string;
  bioZh: string;
  /** "How to unlock" microcopy shown on locked cards. Warm framing. */
  unlockHintZh: string;
  unlockHintEn: string;
  unlock: CardUnlockCondition;
}

// ─── Card database ──────────────────────────────────────────────────────────
// 11 cards as specified in task. Lesson ids match v2.0 nested format
// (kt-ch{N}-l{M}). Where the chapter has fewer lessons than required, we
// fall back to "complete 3 lessons of this chapter".

export const CARDS: CharacterCard[] = [
  // ─── Ch1 院子裡的第一個故事 ────────────────────────────────────────────────
  {
    id: 'mochi',
    nameZh: 'Mochi',
    nameEn: 'Mochi',
    chapter: 1,
    chapterTitleZh: '院子裡的第一個故事',
    emoji: '🐱',
    iconSrc: '/mascots/calico-anchor.webp',
    bioEn: 'A shy calico cat who jumps on grandma\'s wall every night to hear a story.',
    bioZh: '害羞的三花貓。每晚跳上奶奶的矮牆,聽她說一個故事。',
    unlockHintZh: '完成第 1 章任何一課',
    unlockHintEn: 'Complete any lesson in Ch1',
    unlock: { chapter: 1, lessonId: 'kt-ch1-l1' },
  },
  {
    id: 'hana',
    nameZh: 'Hana',
    nameEn: 'Hana',
    chapter: 1,
    chapterTitleZh: '院子裡的第一個故事',
    emoji: '🐕',
    bioEn: 'Grandma\'s warm shiba dog. She listens too, with her chin on grandma\'s shoe.',
    bioZh: '奶奶養的柴犬。下巴靠在奶奶的鞋上,一起聽故事。',
    unlockHintZh: '完成第 1 章第 2 課',
    unlockHintEn: 'Complete Ch1 lesson 2',
    unlock: { chapter: 1, lessonId: 'kt-ch1-l2', minChapterLessons: 2 },
  },
  {
    id: 'grandma-mei',
    nameZh: '梅奶奶 Grandma Mei',
    nameEn: 'Grandma Mei',
    chapter: 1,
    chapterTitleZh: '院子裡的第一個故事',
    emoji: '👵',
    bioEn: 'A kind grandma who tells stories under the moon. Her voice is soft and brave.',
    bioZh: '溫柔的梅奶奶。月光下說故事,聲音很輕,故事很大。',
    unlockHintZh: '完成第 1 章第 3 課',
    unlockHintEn: 'Complete Ch1 lesson 3',
    unlock: { chapter: 1, lessonId: 'kt-ch1-l3', minChapterLessons: 3 },
  },

  // ─── Ch2 桃太郎 ─────────────────────────────────────────────────────────────
  {
    id: 'momotaro',
    nameZh: '桃太郎',
    nameEn: 'Momotaro',
    chapter: 2,
    chapterTitleZh: '桃太郎',
    emoji: '🍑',
    bioEn: 'A brave boy born from a giant peach. He shares his rice balls with friends.',
    bioZh: '從大桃子裡誕生的勇敢男孩。他分糰子給朋友,一起去冒險。',
    unlockHintZh: '完成第 2 章第 1 課',
    unlockHintEn: 'Complete Ch2 lesson 1',
    unlock: { chapter: 2, lessonId: 'kt-ch2-l1' },
  },

  // ─── Ch3 醜小鴨 ─────────────────────────────────────────────────────────────
  {
    id: 'ugly-duckling',
    nameZh: '醜小鴨',
    nameEn: 'The Ugly Duckling',
    chapter: 3,
    chapterTitleZh: '醜小鴨',
    emoji: '🦆',
    bioEn: 'A duckling who feels different. One spring, he sees who he really is.',
    bioZh: '覺得自己跟別人不一樣的小鴨。直到那年春天,他看見水面上的自己。',
    unlockHintZh: '完成第 3 章第 1 課',
    unlockHintEn: 'Complete Ch3 lesson 1',
    unlock: { chapter: 3, lessonId: 'kt-ch3-l1' },
  },

  // ─── Ch4 龜兔賽跑 ───────────────────────────────────────────────────────────
  {
    id: 'rabbit',
    nameZh: '兔子',
    nameEn: 'Hare',
    chapter: 4,
    chapterTitleZh: '龜兔賽跑',
    emoji: '🐰',
    bioEn: 'A fast hare who likes to nap. He is sure he will win — but he sleeps too long.',
    bioZh: '跑得快的兔子,愛打瞌睡。他覺得自己一定贏,但他睡太久了。',
    unlockHintZh: '完成第 4 章第 1 課',
    unlockHintEn: 'Complete Ch4 lesson 1',
    unlock: { chapter: 4, lessonId: 'kt-ch4-l1' },
  },
  {
    id: 'tortoise',
    nameZh: '烏龜',
    nameEn: 'Tortoise',
    chapter: 4,
    chapterTitleZh: '龜兔賽跑',
    emoji: '🐢',
    bioEn: 'A slow tortoise who never stops. Step by step, she walks past the finish line.',
    bioZh: '走得慢但不停下來的烏龜。一步一步,她走過了終點線。',
    unlockHintZh: '完成第 4 章第 2 課',
    unlockHintEn: 'Complete Ch4 lesson 2',
    unlock: { chapter: 4, lessonId: 'kt-ch4-l2', minChapterLessons: 2 },
  },

  // ─── Ch5 駱駝為什麼有駝峰 ───────────────────────────────────────────────────
  {
    id: 'camel',
    nameZh: '駱駝',
    nameEn: 'Camel',
    chapter: 5,
    chapterTitleZh: '駱駝為什麼有駝峰',
    emoji: '🐪',
    bioEn: 'A lazy camel who only says "Humph". A magic Djinn gives him a hump to carry.',
    bioZh: '懶懶的駱駝,只會說「哼」。一隻神靈給了他一個駝峰來背。',
    unlockHintZh: '完成第 5 章第 1 課',
    unlockHintEn: 'Complete Ch5 lesson 1',
    unlock: { chapter: 5, lessonId: 'kt-ch5-l1' },
  },

  // ─── Ch6 Baba Yaga 雞腳屋 ──────────────────────────────────────────────────
  {
    id: 'baba-yaga',
    nameZh: 'Baba Yaga',
    nameEn: 'Baba Yaga',
    chapter: 6,
    chapterTitleZh: 'Baba Yaga 雞腳屋',
    emoji: '🏚️',
    bioEn: 'A witch in a house on chicken legs. Strange — but she gives a small gift of light.',
    bioZh: '住在雞腳屋裡的巫婆。看起來可怕,但她給了一份小小的光。',
    unlockHintZh: '完成第 6 章第 1 課',
    unlockHintEn: 'Complete Ch6 lesson 1',
    unlock: { chapter: 6, lessonId: 'kt-ch6-l1' },
  },

  // ─── Ch7 六隻天鵝 ───────────────────────────────────────────────────────────
  {
    id: 'swan-princess',
    nameZh: '六天鵝公主',
    nameEn: 'The Swan Princess',
    chapter: 7,
    chapterTitleZh: '六隻天鵝',
    emoji: '🦢',
    bioEn: 'A quiet princess who weaves six shirts. She does not speak for six years to save her brothers.',
    bioZh: '安靜的公主。為了救六個哥哥,她六年不說一句話,只織衣服。',
    unlockHintZh: '完成第 7 章第 1 課',
    unlockHintEn: 'Complete Ch7 lesson 1',
    unlock: { chapter: 7, lessonId: 'kt-ch7-l1' },
  },

  // ─── Ch8 葉限 (legacy — chapter pivoted to Three Little Pigs in B.236) ─────
  {
    id: 'ye-xian',
    nameZh: '葉限',
    nameEn: 'Ye Xian',
    chapter: 8,
    chapterTitleZh: '葉限',
    emoji: '🏺',
    bioEn: 'A girl in old China. A magic fish bone helps her find her one golden shoe.',
    bioZh: '古中國的女孩。一根神奇的魚骨,幫她找回那雙金色的鞋。',
    unlockHintZh: '完成第 8 章第 1 課',
    unlockHintEn: 'Complete Ch8 lesson 1',
    unlock: { chapter: 8, lessonId: 'kt-ch8-l1' },
  },

  // ─── Ch8 三隻小豬 Three Little Pigs (B.236 ship) ───────────────────────────
  {
    id: 'pig-straw',
    nameZh: '草屋小豬',
    nameEn: 'Pig Straw',
    chapter: 8,
    chapterTitleZh: '三隻小豬',
    emoji: '🐷',
    bioEn: 'The first little pig. He built his house with straw — fast and easy.',
    bioZh: '第一隻小豬。他用稻草蓋房子,又快又輕鬆。',
    unlockHintZh: '完成第 8 章第 1 課 解鎖草屋小豬',
    unlockHintEn: 'Complete Ch8 lesson 1 to meet the straw-house pig',
    unlock: { chapter: 8, lessonId: 'kt-ch8-l1' },
  },
  {
    id: 'pig-sticks',
    nameZh: '木屋小豬',
    nameEn: 'Pig Sticks',
    chapter: 8,
    chapterTitleZh: '三隻小豬',
    emoji: '🐷',
    bioEn: 'The second little pig. He built his house with sticks — a little stronger.',
    bioZh: '第二隻小豬。他用木枝蓋房子,稍微堅固一些。',
    unlockHintZh: '完成第 8 章第 3 課 解鎖木屋小豬',
    unlockHintEn: 'Complete Ch8 lesson 3 to meet the wood-house pig',
    unlock: { chapter: 8, lessonId: 'kt-ch8-l3', minChapterLessons: 3 },
  },
  {
    id: 'big-bad-wolf',
    nameZh: '大野狼',
    nameEn: 'Big Bad Wolf',
    chapter: 8,
    chapterTitleZh: '三隻小豬',
    emoji: '🐺',
    bioEn: 'The big bad wolf from the woods. He huffs and puffs — but the brick walls do not move.',
    bioZh: '住在森林裡的大野狼。他用力吹氣,但磚牆紋風不動。',
    unlockHintZh: '完成第 8 章第 4 課 解鎖大野狼',
    unlockHintEn: 'Complete Ch8 lesson 4 to meet the big bad wolf',
    unlock: { chapter: 8, lessonId: 'kt-ch8-l4', minChapterLessons: 4 },
  },
  {
    id: 'pig-bricks',
    nameZh: '磚屋小豬',
    nameEn: 'Pig Bricks',
    chapter: 8,
    chapterTitleZh: '三隻小豬',
    emoji: '🐷',
    bioEn: 'The third little pig. He took his time and built with bricks — strong and safe.',
    bioZh: '第三隻小豬。他慢慢來,用磚塊蓋房子,結實又安全。',
    unlockHintZh: '完成第 8 章第 6 課 解鎖磚屋小豬',
    unlockHintEn: 'Complete Ch8 lesson 6 to meet the brick-house pig',
    unlock: { chapter: 8, lessonId: 'kt-ch8-l6', minChapterLessons: 6 },
  },
];

// ─── Storage ────────────────────────────────────────────────────────────────
const LS_UNLOCKED = 'pickup.cards.unlocked';

export function readUnlockedCardIds(): Set<CardId> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LS_UNLOCKED);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeUnlockedCardIds(ids: Set<CardId>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_UNLOCKED, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

/**
 * Check unlock conditions for a card given the player's current progress.
 * Pure helper — no localStorage write.
 *
 * Match if:
 *   - card.unlock.lessonId is in completedLessonIds (specific lesson done), OR
 *   - card.unlock.minChapterLessons set AND number of completed lessons
 *     in card.unlock.chapter >= minChapterLessons.
 */
export function isCardUnlockable(
  card: CharacterCard,
  completedLessonIds: Set<string>,
  completedCountByChapter: Record<number, number>
): boolean {
  const cond = card.unlock;
  if (cond.lessonId && completedLessonIds.has(cond.lessonId)) return true;
  if (typeof cond.minChapterLessons === 'number') {
    const done = completedCountByChapter[cond.chapter] ?? 0;
    if (done >= cond.minChapterLessons) return true;
  }
  return false;
}

/**
 * Called by LessonPage on completion. Returns the list of newly-unlocked
 * card ids (so UI can celebrate). Idempotent — re-completing a lesson
 * never re-grants cards that were already unlocked.
 *
 * Reads `pickup.chapter.{N}.lessons.completed` for cross-chapter checks
 * so chapter-progress unlock rules work across the whole save.
 */
export function unlockCardsForLesson(lessonId: string): CardId[] {
  if (typeof localStorage === 'undefined') return [];
  const already = readUnlockedCardIds();
  // Build completed-lesson + completed-count snapshots from localStorage
  const completedLessonIds = new Set<string>();
  const completedCountByChapter: Record<number, number> = {};
  for (let ch = 1; ch <= 8; ch++) {
    try {
      const raw = localStorage.getItem(`pickup.chapter.${ch}.lessons.completed`);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          for (const id of arr) completedLessonIds.add(String(id));
          completedCountByChapter[ch] = arr.length;
        }
      }
    } catch {
      // ignore
    }
  }
  // Ensure the just-completed lesson is included (markLessonCompleted may
  // have written after our snapshot started).
  completedLessonIds.add(lessonId);

  const newly: CardId[] = [];
  for (const card of CARDS) {
    if (already.has(card.id)) continue;
    if (isCardUnlockable(card, completedLessonIds, completedCountByChapter)) {
      already.add(card.id);
      newly.push(card.id);
    }
  }
  if (newly.length > 0) writeUnlockedCardIds(already);
  return newly;
}

export function getAllCards(): CharacterCard[] {
  return CARDS;
}

export function getCardById(id: CardId): CharacterCard | undefined {
  return CARDS.find(c => c.id === id);
}

export function resetCards(): void {
  try { localStorage.removeItem(LS_UNLOCKED); } catch {}
}
