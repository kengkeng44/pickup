/**
 * v2.0.B.238 — Story Registry (30-entry metadata DB).
 *
 * Source-of-truth for every story Pickup ever ships or might ship. Drives:
 *
 *   - OnboardingPicker (user 4-axis taste filter)
 *   - GrandmaRecommendCarousel (preference-filtered ranking)
 *   - "Mochi 之後會講這個 🤫" teaser cards (candidate stories)
 *   - Future ROI/ship-order planning (suggestNextToShip)
 *
 * 30 entries total = 9 shipped (Ch0-Ch9) + 21 candidates (future Mochi
 * universe). All entries are public-domain (Andersen pre-1875, Grimm 1812,
 * Aesop, Perrault 1697, Tang dynasty 段成式, Kipling 1902 Just So Stories,
 * Joseph Jacobs 1890, 1001 Nights, 民間故事). NOT Disney/Pixar/modern
 * adaptations.
 *
 * 14-dimension schema lets the recommender match user preferences across 4
 * orthogonal axes (culture / style / protagonist / theme), with CEFR + content
 * flags for adaptive surfacing.
 *
 * Pure-data + pure-fn. No localStorage, no React, no side effects.
 */

import type { UserPreferences } from './userProfile';

// ─── Axis types (14-dimension schema) ──────────────────────────────────────

export type Culture =
  | 'china'
  | 'japan'
  | 'korea'
  | 'india'
  | 'europe'
  | 'russia'
  | 'middle-east'
  | 'africa'
  | 'latin-america'
  | 'global-folk';

export type Style =
  | 'fantasy'
  | 'animal-fable'
  | 'dark-fairy-tale'
  | 'warm'
  | 'adventure'
  | 'mystery';

export type Protagonist =
  | 'animal'
  | 'child'
  | 'elder'
  | 'mythical'
  | 'object';

export type Theme =
  | 'friendship'
  | 'growth'
  | 'wit'
  | 'justice'
  | 'courage'
  | 'creativity';

export type ContentFlag =
  | 'mild-violence'
  | 'sadness'
  | 'separation'
  | 'death-themed'
  | 'fear-themed';

export type StoryStatus =
  | 'candidate'   // 21 future stories, status pending
  | 'draft'       // canon being written
  | 'canon-done'  // narrative locked, lessons pending
  | 'cuts-done'   // cuts agreed, MP3 pending
  | 'lessons-done'// lesson JSON shipped, MP3 pending
  | 'mp3-done'    // all narration TTS rendered
  | 'shipped';    // live in production

export interface StoryEntry {
  id: string;
  nameEn: string;
  nameZh: string;
  source: string;           // 'Andersen 1843' / 'Grimm KHM 21' / 'Tang 段成式 酉陽雜俎' …
  sourceUrl?: string;
  copyright: 'public-domain' | 'public-domain-no-modern-adaptation' | 'licensed';
  culture: Culture[];
  style: Style[];
  protagonist: Protagonist[];
  theme: Theme[];
  cefrLevel: 'A0' | 'A1' | 'A2' | 'A2+';
  contentFlags: ContentFlag[];
  /** Cross-cultural teaching pairs (葉限 ↔ 灰姑娘) */
  pairedWith?: string[];
  status: StoryStatus;
  /** Only set when status === 'shipped'. UI chapter number in MapPage. */
  shippedChapter?: number;
}

// ─── 30 entries — 9 shipped + 21 candidates ────────────────────────────────

export const STORY_REGISTRY: StoryEntry[] = [
  // ─── Shipped (Ch1-Ch9, 9 stories) ───────────────────────────────────────
  // Note: Ch0 "ground floor" (ABC + numbers + colors) is the onboarding aisle,
  // not a narrative story — tracked via CHAPTER_DIFFICULTY[0]='A0' in
  // storyTags.ts, not in STORY_REGISTRY. The registry holds story entries
  // only (entries you'd want to filter by culture/protagonist/theme).
  {
    id: 'momotaro',
    nameEn: 'Momotaro the Peach Boy',
    nameZh: '桃太郎',
    source: 'Japanese folktale (Edo period)',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'animal'],
    theme: ['friendship', 'courage', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    // UI chapter — STORY_TAGS in storyTags.ts uses Ch2 for 桃太郎 (Ch1 is the
    // meta-frame). shippedChapter mirrors UI numbering so the recommender
    // joins cleanly with ChapterInfo.chapter.
    shippedChapter: 2,
  },
  {
    id: 'ugly-duckling',
    nameEn: 'The Ugly Duckling',
    nameZh: '醜小鴨',
    source: 'Andersen 1843',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale', 'warm'],
    protagonist: ['animal'],
    theme: ['growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'shipped',
    shippedChapter: 3,
  },
  {
    id: 'tortoise-hare',
    nameEn: 'The Tortoise and the Hare',
    nameZh: '龜兔賽跑',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 4,
  },
  {
    id: 'camel-hump',
    nameEn: 'How the Camel Got His Hump',
    nameZh: '駱駝為什麼有駝峰',
    source: 'Kipling 1902 (Just So Stories)',
    copyright: 'public-domain',
    culture: ['middle-east', 'global-folk'],
    style: ['animal-fable', 'warm'],
    protagonist: ['animal'],
    theme: ['growth', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 5,
  },
  {
    id: 'baba-yaga',
    nameEn: 'Baba Yaga',
    nameZh: 'Baba Yaga 雞腳屋',
    source: 'Russian folktale',
    copyright: 'public-domain',
    culture: ['russia'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'mythical'],
    theme: ['courage', 'wit'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    status: 'shipped',
    shippedChapter: 6,
  },
  {
    id: 'six-swans',
    nameEn: 'The Six Swans',
    nameZh: '六隻天鵝',
    source: 'Grimm KHM 49 (1812)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'animal'],
    theme: ['courage', 'friendship'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation', 'fear-themed'],
    status: 'shipped',
    shippedChapter: 7,
  },
  {
    id: 'yexian',
    nameEn: 'Ye Xian',
    nameZh: '葉限',
    source: 'Tang dynasty 段成式 酉陽雜俎 (~860 AD)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['justice', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    pairedWith: ['cinderella'],
    status: 'shipped',
    shippedChapter: 8,
  },
  {
    id: 'three-pigs',
    nameEn: 'The Three Little Pigs',
    nameZh: '三隻小豬',
    source: 'Joseph Jacobs 1890 (English Fairy Tales)',
    copyright: 'public-domain',
    culture: ['europe', 'global-folk'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    // CLAUDE.md table: Ch8 三隻小豬 maps to UI Ch9 (CHAPTER_DIFFICULTY[9]='A2').
    shippedChapter: 9,
  },
  {
    id: 'cinderella',
    nameEn: 'Cinderella',
    nameZh: '灰姑娘',
    source: 'Perrault 1697 (Histoires ou contes du temps passé)',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['justice', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    pairedWith: ['yexian'],
    status: 'shipped',
    // Cinderella ships to UI Ch10 (last slot in the v2.0 24-lesson run).
    // STORY_TAGS only covers Ch1-Ch8 in storyTags.ts today; Ch9 + Ch10 are
    // the upcoming-ship slots staged for the next content batch.
    shippedChapter: 10,
  },

  // ─── Candidates: 中華民間 5 ────────────────────────────────────────────
  {
    id: 'chang-e',
    nameEn: 'Chang E Flies to the Moon',
    nameZh: '嫦娥奔月',
    source: 'Chinese folklore (myth, Han dynasty origins)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy'],
    protagonist: ['mythical'],
    theme: ['courage', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    pairedWith: ['little-mermaid'],
    status: 'candidate',
  },
  {
    id: 'hou-yi',
    nameEn: 'Hou Yi Shoots the Suns',
    nameZh: '后羿射日',
    source: 'Chinese folklore (myth)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'adventure'],
    protagonist: ['mythical'],
    theme: ['courage', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'candidate',
  },
  {
    id: 'cowherd-weaver',
    nameEn: 'The Cowherd and the Weaver Girl',
    nameZh: '牛郎織女',
    source: 'Chinese folklore (Qixi festival origin)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'warm'],
    protagonist: ['mythical'],
    theme: ['friendship', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'candidate',
  },
  {
    id: 'meng-jiangnu',
    nameEn: 'Meng Jiangnu and the Great Wall',
    nameZh: '孟姜女',
    source: 'Chinese folklore (Qin dynasty origin)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['courage', 'justice'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation', 'death-themed'],
    status: 'candidate',
  },
  {
    id: 'bai-she',
    nameEn: 'The Legend of the White Snake',
    nameZh: '白蛇傳',
    source: 'Chinese folklore (Ming/Qing dynasty written form)',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['mythical'],
    theme: ['friendship', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation'],
    status: 'candidate',
  },

  // ─── Candidates: Grimm / Andersen 5 ─────────────────────────────────────
  {
    id: 'red-riding-hood',
    nameEn: 'Little Red Riding Hood',
    nameZh: '小紅帽',
    source: 'Grimm KHM 26 (1812)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    status: 'candidate',
  },
  {
    id: 'snow-white',
    nameEn: 'Snow White',
    nameZh: '白雪公主',
    source: 'Grimm KHM 53 (1812, pre-Disney)',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['friendship', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'death-themed'],
    pairedWith: ['mulan'],
    status: 'candidate',
  },
  {
    id: 'hansel-gretel',
    nameEn: 'Hansel and Gretel',
    nameZh: '漢賽爾與葛麗特',
    source: 'Grimm KHM 15 (1812)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['friendship', 'wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'separation', 'mild-violence'],
    status: 'candidate',
  },
  {
    id: 'princess-and-pea',
    nameEn: 'The Princess and the Pea',
    nameZh: '豌豆公主',
    source: 'Andersen 1835',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['warm', 'fantasy'],
    protagonist: ['child'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'little-mermaid',
    nameEn: 'The Little Mermaid',
    nameZh: '小美人魚',
    source: 'Andersen 1837 (pre-Disney)',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['mythical'],
    theme: ['courage', 'growth'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation', 'death-themed'],
    pairedWith: ['chang-e'],
    status: 'candidate',
  },

  // ─── Candidates: Aesop 寓言 4 ───────────────────────────────────────────
  {
    id: 'ant-grasshopper',
    nameEn: 'The Ant and the Grasshopper',
    nameZh: '螞蟻與蚱蜢',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'fox-grapes',
    nameEn: 'The Fox and the Grapes',
    nameZh: '狐狸與葡萄',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'crow-fox',
    nameEn: 'The Crow and the Fox',
    nameZh: '烏鴉與狐狸',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'boy-cried-wolf',
    nameEn: 'The Boy Who Cried Wolf',
    nameZh: '狼來了',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['child', 'animal'],
    theme: ['growth', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'candidate',
  },

  // ─── Candidates: 世界各國 4 ────────────────────────────────────────────
  {
    id: 'mulan',
    nameEn: 'Hua Mulan',
    nameZh: '花木蘭',
    source: 'Chinese folklore (Northern Wei "Ballad of Mulan")',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['china'],
    style: ['adventure'],
    protagonist: ['child'],
    theme: ['courage', 'justice', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence', 'separation'],
    pairedWith: ['snow-white'],
    status: 'candidate',
  },
  {
    id: 'ali-baba',
    nameEn: 'Ali Baba and the Forty Thieves',
    nameZh: '阿里巴巴與四十大盜',
    source: '1001 Nights (Antoine Galland 1717 French translation)',
    copyright: 'public-domain',
    culture: ['middle-east'],
    style: ['adventure', 'mystery'],
    protagonist: ['child'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence'],
    status: 'candidate',
  },
  {
    id: 'aladdin',
    nameEn: 'Aladdin and the Magic Lamp',
    nameZh: '阿拉丁與神燈',
    source: '1001 Nights (Antoine Galland 1710s, pre-Disney)',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['middle-east'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'mythical'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'jack-beanstalk',
    nameEn: 'Jack and the Beanstalk',
    nameZh: '傑克與豌豆',
    source: 'English folktale (Joseph Jacobs 1890)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child'],
    theme: ['courage', 'wit'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence', 'fear-themed'],
    status: 'candidate',
  },

  // ─── Candidates: 動物寓言 3 ────────────────────────────────────────────
  {
    id: '3-billy-goats',
    nameEn: 'The Three Billy Goats Gruff',
    nameZh: '三隻山羊',
    source: 'Norwegian folktale (Asbjornsen & Moe 1841)',
    copyright: 'public-domain',
    culture: ['europe', 'global-folk'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed'],
    status: 'candidate',
  },
  {
    id: 'gingerbread-man',
    nameEn: 'The Gingerbread Man',
    nameZh: '薑餅人',
    source: 'English folktale (St. Nicholas Magazine 1875)',
    copyright: 'public-domain',
    culture: ['europe', 'global-folk'],
    style: ['animal-fable', 'warm'],
    protagonist: ['object', 'animal'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
  {
    id: 'city-mouse-country-mouse',
    nameEn: 'The City Mouse and the Country Mouse',
    nameZh: '城市鼠與鄉村鼠',
    source: 'Aesop',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['friendship', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
  },
];

// ─── Sanity guard: registry size + status counts ───────────────────────────

export const REGISTRY_TOTAL = 30;
export const REGISTRY_SHIPPED_COUNT = 9;
export const REGISTRY_CANDIDATE_COUNT = 21;

// ─── Filter helpers ────────────────────────────────────────────────────────

/**
 * True if at least one element in `entryAxis` is in `prefAxis`. Empty
 * preference list = "user likes everything on this axis" → always true.
 * Matches OnboardingPicker "Skip → 全部都喜歡" semantics.
 */
function axisMatches<T>(prefAxis: readonly T[], entryAxis: readonly T[]): boolean {
  if (prefAxis.length === 0) return true;
  for (const t of entryAxis) {
    if ((prefAxis as readonly T[]).includes(t)) return true;
  }
  return false;
}

/**
 * Filter STORY_REGISTRY by user preference. AND-across-axes (culture AND
 * style AND protagonist AND theme); OR-within-axis (any tag overlap counts).
 * Empty axis = wildcard.
 */
export function filterByPreference(prefs: UserPreferences): StoryEntry[] {
  return STORY_REGISTRY.filter(
    (s) =>
      axisMatches(prefs.cultures, s.culture) &&
      axisMatches(prefs.styles, s.style) &&
      axisMatches(prefs.protagonists, s.protagonist) &&
      axisMatches(prefs.themes, s.theme),
  );
}

/**
 * Compute per-entry tag-overlap count vs preferences (sum across 4 axes).
 * Used by recommender ranking + suggestNextToShip ROI scoring.
 */
export function preferenceOverlapScore(
  prefs: UserPreferences,
  entry: StoryEntry,
): number {
  let s = 0;
  for (const c of entry.culture) if (prefs.cultures.includes(c)) s++;
  for (const st of entry.style) if (prefs.styles.includes(st)) s++;
  for (const p of entry.protagonist) if (prefs.protagonists.includes(p)) s++;
  for (const t of entry.theme) if (prefs.themes.includes(t)) s++;
  return s;
}

/**
 * Rank candidate stories by rough ship-ROI:
 *   - paired-with-shipped entries score higher (cross-cultural teaching pair)
 *   - A2 entries score higher than A2+ (broader audience)
 *   - fewer content flags score higher (less editorial review needed)
 *   - culture overlap with already-shipped cultures scores lower (diversify)
 *
 * Pure heuristic for PM planning — not user-facing. Returns candidates only,
 * sorted desc by ROI score.
 */
export function suggestNextToShip(): StoryEntry[] {
  const shipped = STORY_REGISTRY.filter((s) => s.status === 'shipped');
  const shippedCultures = new Set<Culture>();
  const shippedIds = new Set<string>();
  for (const s of shipped) {
    shippedIds.add(s.id);
    for (const c of s.culture) shippedCultures.add(c);
  }

  const candidates = STORY_REGISTRY.filter((s) => s.status === 'candidate');

  const scored = candidates.map((c) => {
    let score = 0;
    // Pair bonus: existing shipped story already pairs with this candidate.
    if (c.pairedWith) {
      for (const p of c.pairedWith) {
        if (shippedIds.has(p)) score += 3;
      }
    }
    // CEFR: prefer A2 (broader) over A2+ (stretch).
    if (c.cefrLevel === 'A2') score += 2;
    else if (c.cefrLevel === 'A2+') score += 0;
    else if (c.cefrLevel === 'A1') score += 1;
    // Content flags: fewer = easier to ship.
    score += Math.max(0, 2 - c.contentFlags.length);
    // Diversification: penalize cultures already heavily shipped.
    const newCultureBonus = c.culture.some((cu) => !shippedCultures.has(cu))
      ? 1
      : 0;
    score += newCultureBonus;
    return { entry: c, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.id.localeCompare(b.entry.id);
  });

  return scored.map((s) => s.entry);
}

/** Convenience: get the entry for a shipped UI chapter, or undefined. */
export function getStoryByChapter(chapter: number): StoryEntry | undefined {
  return STORY_REGISTRY.find(
    (s) => s.status === 'shipped' && s.shippedChapter === chapter,
  );
}

/** Convenience: get the entry by id. */
export function getStoryById(id: string): StoryEntry | undefined {
  return STORY_REGISTRY.find((s) => s.id === id);
}

/**
 * All shipped entries (canonical ordering by shippedChapter asc). Drives the
 * preference-filtered recommender pool.
 */
export function listShippedStories(): StoryEntry[] {
  return STORY_REGISTRY.filter((s) => s.status === 'shipped').sort(
    (a, b) => (a.shippedChapter ?? 999) - (b.shippedChapter ?? 999),
  );
}

/** All candidate entries (for teaser cards). */
export function listCandidateStories(): StoryEntry[] {
  return STORY_REGISTRY.filter((s) => s.status === 'candidate');
}
