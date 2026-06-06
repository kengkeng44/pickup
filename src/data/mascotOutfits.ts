/**
 * v2.0.B.234 招 3 — Mascot Customization (wardrobe / outfit system).
 *
 * Per docs/strategy/2026-06-06-children-content-and-attention-competitors.md
 * (Brookhaven autonomy — 8-12 兒童最缺自主權). Players unlock 11 Mochi outfits
 * by progressing through chapters or hitting milestone streaks, then choose
 * which to wear. Outfit applies to Mochi mascot on:
 *   - MapPage (grandma + Mochi anchor)
 *   - ChapterIntroPage
 *   - LessonPage completion screen
 *
 * Storage:
 *   pickup.outfits.unlocked  — JSON string[] of unlocked outfit ids
 *   pickup.outfits.current   — current outfit id ('default' if unset)
 *
 * Microcopy rule (CLAUDE.md): no shame for locked items — warm hint that
 * explains how to unlock. Bilingual zh + en throughout.
 *
 * Image assets are placeholder strings — the user will generate WebPs to
 * /mascots/outfits/ later. UI falls back to default calico-anchor.webp +
 * emoji badge overlay so locked / not-yet-arted outfits are still visible.
 */

export type OutfitId = string;

export type UnlockCondition =
  | { type: 'default' }
  | { type: 'chapterComplete'; chapter: number }
  | { type: 'lessonComplete'; lessonId: string }
  | { type: 'milestoneStreak'; streakDays: number };

export interface MascotOutfit {
  id: OutfitId;
  name: { zh: string; en: string };
  bio: { zh: string; en: string };
  /** Placeholder image path. File may not exist yet — UI falls back to
   * calico-anchor.webp + emoji badge overlay until art lands. */
  imageSrc: string;
  /** Emoji shown as overlay badge on top of the cat (when art is missing,
   * also doubles as a visual hint for what this outfit looks like). */
  emojiBadge: string;
  unlockCondition: UnlockCondition;
  /** Hint shown on locked tiles (warm framing — never "you haven't earned"). */
  unlockHint: { zh: string; en: string };
}

// ─── Outfit database — 11 outfits per 7-chapter + 3 universal ──────────────
export const OUTFITS: MascotOutfit[] = [
  // Default — always unlocked
  {
    id: 'default',
    name: { zh: 'Mochi 原樣', en: 'Mochi (default)' },
    bio: {
      zh: '原本的三花貓。每晚跳上奶奶矮牆,聽她說故事。',
      en: 'The calico cat herself. She hops onto grandma\'s wall every night to listen.',
    },
    imageSrc: '/mascots/calico-anchor.webp',
    emojiBadge: '',
    unlockCondition: { type: 'default' },
    unlockHint: { zh: '預設裝扮', en: 'Default outfit' },
  },

  // Ch1 — 桃太郎 日和服 (kimono)
  {
    id: 'kimono',
    name: { zh: '日和服', en: 'Kimono' },
    bio: {
      zh: '桃太郎的小和服。聽完第 1 章奶奶就交給 Mochi 試穿。',
      en: 'A tiny kimono from the Momotaro story. Grandma stitched it after Ch1.',
    },
    imageSrc: '/mascots/outfits/mochi-kimono.webp', // TODO 待生圖
    emojiBadge: '👘',
    unlockCondition: { type: 'chapterComplete', chapter: 1 },
    unlockHint: {
      zh: '完成第 1 章 桃太郎 解鎖日和服',
      en: 'Complete Ch1 Momotaro to unlock the kimono',
    },
  },

  // Ch2 — 醜小鴨 鴨子帽
  {
    id: 'duck-hat',
    name: { zh: '鴨子帽', en: 'Duck Hat' },
    bio: {
      zh: '醜小鴨的小黃帽。Mochi 戴上後一直回頭看自己的尾巴。',
      en: 'A tiny duckling hat. Mochi keeps peeking at her own tail wearing it.',
    },
    imageSrc: '/mascots/outfits/mochi-duck-hat.webp', // TODO 待生圖
    emojiBadge: '🦆',
    unlockCondition: { type: 'chapterComplete', chapter: 2 },
    unlockHint: {
      zh: '完成第 2 章 醜小鴨 解鎖鴨子帽',
      en: 'Complete Ch2 The Ugly Duckling to unlock the duck hat',
    },
  },

  // Ch3 — 龜兔賽跑 兔耳朵
  {
    id: 'bunny-ears',
    name: { zh: '兔耳朵', en: 'Bunny Ears' },
    bio: {
      zh: '龜兔賽跑的兔耳朵。Mochi 戴上跑很快,但也愛打盹。',
      en: 'Long bunny ears from the Tortoise and Hare. Fast, but naps too long.',
    },
    imageSrc: '/mascots/outfits/mochi-bunny-ears.webp', // TODO 待生圖
    emojiBadge: '🐰',
    unlockCondition: { type: 'chapterComplete', chapter: 3 },
    unlockHint: {
      zh: '完成第 3 章 龜兔賽跑 解鎖兔耳朵',
      en: 'Complete Ch3 Tortoise and Hare to unlock the bunny ears',
    },
  },

  // Ch3 alt — 龜兔賽跑 烏龜殼
  {
    id: 'tortoise-shell',
    name: { zh: '烏龜殼', en: 'Tortoise Shell' },
    bio: {
      zh: '烏龜的小背殼。Mochi 慢慢走,但走到最後。',
      en: 'A tiny tortoise shell. Slow steps, but always to the finish.',
    },
    imageSrc: '/mascots/outfits/mochi-tortoise-shell.webp', // TODO 待生圖
    emojiBadge: '🐢',
    unlockCondition: { type: 'lessonComplete', lessonId: 'kt-ch3-l5' },
    unlockHint: {
      zh: '完成第 3 章第 5 課 解鎖烏龜殼',
      en: 'Complete Ch3 lesson 5 to unlock the tortoise shell',
    },
  },

  // Ch4 — 駱駝 沙漠斗篷
  {
    id: 'desert-cloak',
    name: { zh: '沙漠斗篷', en: 'Desert Cloak' },
    bio: {
      zh: '駱駝的沙漠斗篷。能擋風沙,Mochi 走到哪都酷酷的。',
      en: 'A desert cloak from the Camel story. Wind-proof, sand-proof, cat-cool.',
    },
    imageSrc: '/mascots/outfits/mochi-desert-cloak.webp', // TODO 待生圖
    emojiBadge: '🐪',
    unlockCondition: { type: 'chapterComplete', chapter: 4 },
    unlockHint: {
      zh: '完成第 4 章 駱駝為什麼有駝峰 解鎖沙漠斗篷',
      en: 'Complete Ch4 How the Camel Got Its Hump to unlock the desert cloak',
    },
  },

  // Ch5 — Baba Yaga 巫師帽
  {
    id: 'witch-hat',
    name: { zh: '巫師帽', en: 'Witch Hat' },
    bio: {
      zh: 'Baba Yaga 的小巫師帽,帶把迷你掃把。Mochi 一戴上,雞腳屋走得更穩。',
      en: 'A small witch hat with a mini broom. Even the chicken-leg house steadies up.',
    },
    imageSrc: '/mascots/outfits/mochi-witch-hat.webp', // TODO 待生圖
    emojiBadge: '🧙',
    unlockCondition: { type: 'chapterComplete', chapter: 5 },
    unlockHint: {
      zh: '完成第 5 章 Baba Yaga 解鎖巫師帽',
      en: 'Complete Ch5 Baba Yaga to unlock the witch hat',
    },
  },

  // Ch6 — 六天鵝 羽毛披風
  {
    id: 'swan-cloak',
    name: { zh: '天鵝羽毛披風', en: 'Swan Feather Cloak' },
    bio: {
      zh: '六天鵝公主織的羽毛披風。Mochi 穿上,變得溫柔安靜。',
      en: 'A feather cloak woven by the Swan Princess. Soft, quiet, brave.',
    },
    imageSrc: '/mascots/outfits/mochi-swan-cloak.webp', // TODO 待生圖
    emojiBadge: '🦢',
    unlockCondition: { type: 'chapterComplete', chapter: 6 },
    unlockHint: {
      zh: '完成第 6 章 六隻天鵝 解鎖羽毛披風',
      en: 'Complete Ch6 The Six Swans to unlock the feather cloak',
    },
  },

  // Ch7 — 葉限 唐裝
  {
    id: 'tang-robe',
    name: { zh: '唐裝', en: 'Tang Robe' },
    bio: {
      zh: '葉限的唐裝。紅金繡花,Mochi 走過去鈴鐺都會響。',
      en: 'Ye Xian\'s Tang dynasty robe. Red and gold, with tiny bells that chime.',
    },
    imageSrc: '/mascots/outfits/mochi-tang-robe.webp', // TODO 待生圖
    emojiBadge: '🏮',
    unlockCondition: { type: 'chapterComplete', chapter: 7 },
    unlockHint: {
      zh: '完成第 7 章 葉限 解鎖唐裝',
      en: 'Complete Ch7 Ye Xian to unlock the Tang robe',
    },
  },

  // Universal 1 — 太空裝 (future Ch8+ teaser)
  {
    id: 'space-suit',
    name: { zh: '太空裝', en: 'Space Suit' },
    bio: {
      zh: 'Mochi 的太空裝。將來奶奶說太空冒險時用的上。',
      en: 'Mochi\'s space suit. For the day grandma tells the space stories.',
    },
    imageSrc: '/mascots/outfits/mochi-space-suit.webp', // TODO 待生圖
    emojiBadge: '🚀',
    unlockCondition: { type: 'milestoneStreak', streakDays: 14 },
    unlockHint: {
      zh: '連續學習 14 天 解鎖太空裝',
      en: 'Reach a 14-day streak to unlock the space suit',
    },
  },

  // Universal 2 — 聖誕裝 (December seasonal pack reserve)
  {
    id: 'santa-suit',
    name: { zh: '聖誕裝', en: 'Santa Suit' },
    bio: {
      zh: '紅白聖誕裝。月主題包預留,12 月奶奶會多講一段。',
      en: 'A red-and-white Santa suit. Saved for December\'s seasonal story.',
    },
    imageSrc: '/mascots/outfits/mochi-santa-suit.webp', // TODO 待生圖
    emojiBadge: '🎅',
    unlockCondition: { type: 'milestoneStreak', streakDays: 7 },
    unlockHint: {
      zh: '連續學習 7 天 解鎖聖誕裝',
      en: 'Reach a 7-day streak to unlock the Santa suit',
    },
  },

  // Ch8 — 三隻小豬 磚屋工裝 (B.236 ship)
  {
    id: 'three-pigs',
    name: { zh: '磚屋工裝', en: 'Builder Overalls' },
    bio: {
      zh: 'Mochi 戴農夫帽 + 工裝,蓋自己的磚屋。慢慢來,但很堅固。',
      en: 'Mochi in farmer hat + overalls, building her own brick house.',
    },
    imageSrc: '/mascots/outfits/mochi-three-pigs.webp', // TODO 待生圖
    emojiBadge: '🧰',
    unlockCondition: { type: 'chapterComplete', chapter: 8 },
    unlockHint: {
      zh: '完成第 8 章 三隻小豬 解鎖磚屋工裝',
      en: 'Complete Ch8 Three Little Pigs to unlock the builder overalls',
    },
  },

  // Universal 3 — 學者方帽 (milestone graduation)
  {
    id: 'scholar-cap',
    name: { zh: '學者方帽', en: 'Scholar Cap' },
    bio: {
      zh: '畢業方帽。Mochi 戴上後,正經一秒,然後就甩掉去追蝴蝶。',
      en: 'A graduation cap. Mochi looks serious for one second — then chases a butterfly.',
    },
    imageSrc: '/mascots/outfits/mochi-scholar-cap.webp', // TODO 待生圖
    emojiBadge: '🎓',
    unlockCondition: { type: 'milestoneStreak', streakDays: 30 },
    unlockHint: {
      zh: '連續學習 30 天 解鎖學者方帽',
      en: 'Reach a 30-day streak to unlock the scholar cap',
    },
  },
];

// ─── Storage ────────────────────────────────────────────────────────────────
const LS_UNLOCKED = 'pickup.outfits.unlocked';
const LS_CURRENT = 'pickup.outfits.current';
const DEFAULT_OUTFIT_ID: OutfitId = 'default';

export function readUnlockedOutfits(): Set<OutfitId> {
  // Default outfit is always considered unlocked, even on fresh save.
  const out = new Set<OutfitId>([DEFAULT_OUTFIT_ID]);
  if (typeof localStorage === 'undefined') return out;
  try {
    const raw = localStorage.getItem(LS_UNLOCKED);
    if (!raw) return out;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      for (const id of arr) out.add(String(id));
    }
  } catch {
    // ignore
  }
  return out;
}

function writeUnlockedOutfits(ids: Set<OutfitId>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_UNLOCKED, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

/** Current outfit id. Defaults to 'default' (Mochi original). */
export function readOutfit(): OutfitId {
  if (typeof localStorage === 'undefined') return DEFAULT_OUTFIT_ID;
  try {
    return localStorage.getItem(LS_CURRENT) ?? DEFAULT_OUTFIT_ID;
  } catch {
    return DEFAULT_OUTFIT_ID;
  }
}

/**
 * Switch the current outfit. Refuses to set a locked outfit (returns false).
 * Default 'default' outfit is always allowed.
 */
export function setOutfit(id: OutfitId): boolean {
  const outfit = OUTFITS.find(o => o.id === id);
  if (!outfit) return false;
  if (id !== DEFAULT_OUTFIT_ID) {
    const unlocked = readUnlockedOutfits();
    if (!unlocked.has(id)) return false;
  }
  if (typeof localStorage === 'undefined') return true;
  try {
    localStorage.setItem(LS_CURRENT, id);
  } catch {
    // ignore
  }
  return true;
}

/**
 * Pure helper — does this outfit's unlock condition match the player's
 * current progress snapshot?
 */
export function isOutfitUnlockable(
  outfit: MascotOutfit,
  completedLessonIds: Set<string>,
  completedCountByChapter: Record<number, number>,
  chapterTotalLessons: Record<number, number>,
  currentStreak: number,
): boolean {
  const cond = outfit.unlockCondition;
  if (cond.type === 'default') return true;
  if (cond.type === 'lessonComplete') {
    return completedLessonIds.has(cond.lessonId);
  }
  if (cond.type === 'chapterComplete') {
    const done = completedCountByChapter[cond.chapter] ?? 0;
    const total = chapterTotalLessons[cond.chapter];
    // If we don't know total lessons (no fetch yet), fall back to a
    // conservative threshold of "at least 1 lesson completed in target
    // chapter" — better than blocking forever.
    if (typeof total === 'number' && total > 0) return done >= total;
    return done >= 1;
  }
  if (cond.type === 'milestoneStreak') {
    return currentStreak >= cond.streakDays;
  }
  return false;
}

/**
 * Idempotent — grant a single outfit id if its condition is met. Returns
 * true if the outfit was newly unlocked, false otherwise.
 *
 * Source param is purely for analytics labelling and is not persisted.
 */
export function unlockOutfit(
  id: OutfitId,
  _source: 'lesson' | 'streak' | 'manual' = 'manual',
): boolean {
  void _source;
  if (id === DEFAULT_OUTFIT_ID) return false;
  const outfit = OUTFITS.find(o => o.id === id);
  if (!outfit) return false;
  const unlocked = readUnlockedOutfits();
  if (unlocked.has(id)) return false;
  unlocked.add(id);
  writeUnlockedOutfits(unlocked);
  return true;
}

/**
 * Called by LessonPage on completion. Snapshots progress + streak from
 * localStorage, walks all outfits, unlocks any whose conditions are now met.
 * Returns the list of newly-unlocked outfit ids (so UI can celebrate).
 *
 * Parallels unlockCardsForLesson() in src/data/cards.ts.
 */
export function unlockOutfitsForLesson(lessonId: string): OutfitId[] {
  if (typeof localStorage === 'undefined') return [];
  const already = readUnlockedOutfits();
  // Build completed-lesson + completed-count snapshots
  const completedLessonIds = new Set<string>();
  const completedCountByChapter: Record<number, number> = {};
  for (let ch = 0; ch <= 8; ch++) {
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
  // Ensure the just-completed lesson is included.
  completedLessonIds.add(lessonId);

  // Total lessons per chapter — read from `pickup.chapter.{N}.lessons.total`
  // if seeded. Otherwise leave undefined; isOutfitUnlockable() falls back
  // to ">= 1 lesson completed" as a conservative gate.
  const chapterTotalLessons: Record<number, number> = {};
  for (let ch = 0; ch <= 8; ch++) {
    try {
      const raw = localStorage.getItem(`pickup.chapter.${ch}.lessons.total`);
      if (raw) {
        const n = Number(raw);
        if (Number.isFinite(n) && n > 0) chapterTotalLessons[ch] = n;
      }
    } catch {
      // ignore
    }
  }

  // Streak — read directly so we don't import streak.ts (avoid cycle).
  let currentStreak = 0;
  try {
    const raw = localStorage.getItem('pickup.streak.count');
    if (raw) {
      const n = Number(raw);
      if (Number.isFinite(n) && n >= 0) currentStreak = Math.floor(n);
    }
  } catch {
    // ignore
  }

  const newly: OutfitId[] = [];
  for (const outfit of OUTFITS) {
    if (already.has(outfit.id)) continue;
    if (
      isOutfitUnlockable(
        outfit,
        completedLessonIds,
        completedCountByChapter,
        chapterTotalLessons,
        currentStreak,
      )
    ) {
      already.add(outfit.id);
      newly.push(outfit.id);
    }
  }
  if (newly.length > 0) writeUnlockedOutfits(already);
  return newly;
}

export function getAllOutfits(): MascotOutfit[] {
  return OUTFITS;
}

export function getOutfitById(id: OutfitId): MascotOutfit | undefined {
  return OUTFITS.find(o => o.id === id);
}

/**
 * Returns the image src + emoji badge to render for the current (or a given)
 * outfit. UI helper — falls back to default calico-anchor.webp if the
 * outfit's WebP is missing or hasn't been generated yet.
 */
export function getActiveOutfitVisual(id?: OutfitId): {
  imageSrc: string;
  emojiBadge: string;
  outfit: MascotOutfit;
} {
  const outfitId = id ?? readOutfit();
  const outfit =
    OUTFITS.find(o => o.id === outfitId) ??
    OUTFITS.find(o => o.id === DEFAULT_OUTFIT_ID)!;
  // Always use the default calico image as the base — outfit WebPs are not
  // yet generated (per task spec: placeholder image + emoji overlay).
  // Once user generates real outfit art, swap to outfit.imageSrc directly.
  return {
    imageSrc: '/mascots/calico-anchor.webp',
    emojiBadge: outfit.emojiBadge,
    outfit,
  };
}

export function resetOutfits(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(LS_UNLOCKED);
    localStorage.removeItem(LS_CURRENT);
  } catch {
    // ignore
  }
}

export const OUTFIT_DEFAULTS = { DEFAULT_OUTFIT_ID } as const;
