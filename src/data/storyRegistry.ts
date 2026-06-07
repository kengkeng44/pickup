/**
 * v2.0.B.242 — Story Registry (110-entry metadata DB).
 *
 * Source-of-truth for every story Pickup ever ships or might ship. Drives:
 *
 *   - OnboardingPicker (user 4-axis taste filter)
 *   - GrandmaRecommendCarousel (preference-filtered ranking)
 *   - "Mochi 之後會講這個 🤫" teaser cards (candidate stories)
 *   - Future ROI/ship-order planning (suggestNextToShip)
 *   - Bear cultural-distribution dashboard (中華 35% / 歐美 40% / 日韓東南亞 15% / 其他 10%)
 *
 * 110 entries total = 27 shipped (Ch0 ground floor + Ch1-Ch26) + 73 short
 * candidates + 10 mid-long candidates. All entries are 100% public-domain
 * (民間口傳 / pre-1929 written works / 公有民俗) per
 * docs/strategy/2026-06-07-market-research-cc-licensing.md PD checklist.
 *
 * 14-dimension schema lets the recommender match user preferences across 4
 * orthogonal axes (culture / style / protagonist / theme), with CEFR + content
 * flags for adaptive surfacing. The new `lengthClass` axis distinguishes
 * short stories (~77 Q × 7 lessons, single chapter) from mid-long serials
 * (5-10 chapter arcs, `suggestedEpisodes` count carried alongside).
 *
 * Pure-data + pure-fn. No localStorage, no React, no side effects.
 *
 * NOTE: Ship-chapter numbering follows lessons-ch{N}.json indexing
 * (Ch1 = momotaro, Ch26 = archimedes-eureka). Ch0 = ground floor (zero-base
 * ABC/numbers/colors) shipped separately as the onboarding aisle.
 */

import type { UserPreferences } from './userProfile';

// ─── Axis types (15-dimension schema, +lengthClass v2.0.B.242) ────────────

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
  | 'southeast-asia'
  | 'historical'
  | 'global-folk';

export type Style =
  | 'fantasy'
  | 'animal-fable'
  | 'dark-fairy-tale'
  | 'warm'
  | 'adventure'
  | 'mystery'
  | 'historical-anecdote'
  | 'epic';

export type Protagonist =
  | 'animal'
  | 'child'
  | 'elder'
  | 'mythical'
  | 'object'
  | 'historical-figure';

export type Theme =
  | 'friendship'
  | 'growth'
  | 'wit'
  | 'justice'
  | 'courage'
  | 'creativity'
  | 'family'
  | 'perseverance'
  | 'honesty';

export type ContentFlag =
  | 'mild-violence'
  | 'sadness'
  | 'separation'
  | 'death-themed'
  | 'fear-themed';

export type StoryStatus =
  | 'candidate'   // pending stories
  | 'draft'       // canon being written
  | 'canon-done'  // narrative locked, lessons pending
  | 'cuts-done'   // cuts agreed, MP3 pending
  | 'lessons-done'// lesson JSON shipped, MP3 pending
  | 'mp3-done'    // all narration TTS rendered
  | 'shipped';    // live in production

/**
 * Story length classification.
 *
 *   'short'    — single chapter (~77 Q × 7 lessons, Pickup current model)
 *   'mid-long' — serialised arc (5-10 chapter episodes). When
 *                lengthClass === 'mid-long' the entry MUST carry
 *                `suggestedEpisodes` (planned chapter count).
 */
export type LengthClass = 'short' | 'mid-long';

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
  /** v2.0.B.242 length class. Defaults to 'short' when omitted. */
  lengthClass?: LengthClass;
  /** Only set when lengthClass === 'mid-long'. Planned episode (chapter) count. */
  suggestedEpisodes?: number;
}

// ─── 110 entries — 27 shipped + 73 short candidate + 10 mid-long candidate ─

export const STORY_REGISTRY: StoryEntry[] = [
  // ─── Shipped Ch0 ground floor ──────────────────────────────────────────
  {
    id: 'ground-floor',
    nameEn: 'Ground Floor (ABC + numbers + colors)',
    nameZh: '入門:ABC・數字・顏色',
    source: 'Pickup original onboarding aisle',
    copyright: 'public-domain',
    culture: ['global-folk'],
    style: ['warm'],
    protagonist: ['animal'],
    theme: ['growth'],
    cefrLevel: 'A0',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 0,
    lengthClass: 'short',
  },

  // ─── Shipped Ch1-Ch26 (26 narrative chapters) ──────────────────────────
  {
    id: 'momotaro',
    nameEn: 'Momotaro the Peach Boy',
    nameZh: '桃太郎',
    source: 'Japanese folktale (Edo period)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Momotar%C5%8D',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'animal'],
    theme: ['friendship', 'courage', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    shippedChapter: 1,
    lengthClass: 'short',
  },
  {
    id: 'ugly-duckling',
    nameEn: 'The Ugly Duckling',
    nameZh: '醜小鴨',
    source: 'Andersen 1843',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Ugly_Duckling',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale', 'warm'],
    protagonist: ['animal'],
    theme: ['growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'shipped',
    shippedChapter: 2,
    lengthClass: 'short',
  },
  {
    id: 'tortoise-hare',
    nameEn: 'The Tortoise and the Hare',
    nameZh: '龜兔賽跑',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Tortoise_and_the_Hare',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth', 'wit', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 3,
    lengthClass: 'short',
  },
  {
    id: 'camel-hump',
    nameEn: 'How the Camel Got His Hump',
    nameZh: '駱駝為什麼有駝峰',
    source: 'Kipling 1902 (Just So Stories)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Just_So_Stories',
    copyright: 'public-domain',
    culture: ['middle-east', 'global-folk'],
    style: ['animal-fable', 'warm'],
    protagonist: ['animal'],
    theme: ['growth', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 4,
    lengthClass: 'short',
  },
  {
    id: 'baba-yaga',
    nameEn: 'Baba Yaga',
    nameZh: 'Baba Yaga 雞腳屋',
    source: 'Russian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Baba_Yaga',
    copyright: 'public-domain',
    culture: ['russia'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'mythical'],
    theme: ['courage', 'wit'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    status: 'shipped',
    shippedChapter: 5,
    lengthClass: 'short',
  },
  {
    id: 'six-swans',
    nameEn: 'The Six Swans',
    nameZh: '六隻天鵝',
    source: 'Grimm KHM 49 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Six_Swans',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'animal'],
    theme: ['courage', 'friendship', 'family'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation', 'fear-themed'],
    status: 'shipped',
    shippedChapter: 6,
    lengthClass: 'short',
  },
  {
    id: 'yexian',
    nameEn: 'Ye Xian',
    nameZh: '葉限',
    source: 'Tang dynasty 段成式 酉陽雜俎 (~860 AD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ye_Xian',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['justice', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    pairedWith: ['cinderella'],
    status: 'shipped',
    shippedChapter: 7,
    lengthClass: 'short',
  },
  {
    id: 'three-pigs',
    nameEn: 'The Three Little Pigs',
    nameZh: '三隻小豬',
    source: 'Joseph Jacobs 1890 (English Fairy Tales)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Three_Little_Pigs',
    copyright: 'public-domain',
    culture: ['europe', 'global-folk'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    shippedChapter: 8,
    lengthClass: 'short',
  },
  {
    id: 'cinderella',
    nameEn: 'Cinderella',
    nameZh: '灰姑娘',
    source: 'Perrault 1697 (Histoires ou contes du temps passé)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Cinderella',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['justice', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    pairedWith: ['yexian'],
    status: 'shipped',
    shippedChapter: 9,
    lengthClass: 'short',
  },
  {
    id: 'change',
    nameEn: 'Chang E Flies to the Moon',
    nameZh: '嫦娥奔月',
    source: 'Chinese folklore (myth, Han dynasty origins)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Chang%27e',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy'],
    protagonist: ['mythical'],
    theme: ['courage', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    pairedWith: ['little-mermaid'],
    status: 'shipped',
    shippedChapter: 10,
    lengthClass: 'short',
  },
  {
    id: 'houyi',
    nameEn: 'Hou Yi Shoots the Suns',
    nameZh: '后羿射日',
    source: 'Chinese folklore (myth)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Hou_Yi',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'adventure'],
    protagonist: ['mythical'],
    theme: ['courage', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    shippedChapter: 11,
    lengthClass: 'short',
  },
  {
    id: 'cowherd-weaver',
    nameEn: 'The Cowherd and the Weaver Girl',
    nameZh: '牛郎織女',
    source: 'Chinese folklore (Qixi festival origin)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Weaver_Girl_and_the_Cowherd',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'warm'],
    protagonist: ['mythical'],
    theme: ['friendship', 'courage', 'family'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'shipped',
    shippedChapter: 12,
    lengthClass: 'short',
  },
  {
    id: 'red-riding-hood',
    nameEn: 'Little Red Riding Hood',
    nameZh: '小紅帽',
    source: 'Grimm KHM 26 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Little_Red_Riding_Hood',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    status: 'shipped',
    shippedChapter: 13,
    lengthClass: 'short',
  },
  {
    id: 'urashima',
    nameEn: 'Urashima Taro',
    nameZh: '浦島太郎',
    source: 'Japanese folktale (Nihon Shoki, 720 AD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Urashima_Tar%C5%8D',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['fantasy', 'warm'],
    protagonist: ['child', 'mythical'],
    theme: ['growth', 'family'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'shipped',
    shippedChapter: 14,
    lengthClass: 'short',
  },
  {
    id: 'emperors-new-clothes',
    nameEn: "The Emperor's New Clothes",
    nameZh: '國王的新衣',
    source: 'Andersen 1837',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Emperor%27s_New_Clothes',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['warm'],
    protagonist: ['child', 'elder'],
    theme: ['honesty', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 15,
    lengthClass: 'short',
  },
  {
    id: 'issun-boshi',
    nameEn: 'Issun-boshi (The Inch-High Boy)',
    nameZh: '一寸法師',
    source: 'Japanese folktale (Otogi-zōshi, Muromachi period)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Issun-b%C5%8Dshi',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child'],
    theme: ['courage', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    shippedChapter: 16,
    lengthClass: 'short',
  },
  {
    id: 'crane-gratitude',
    nameEn: "The Crane's Return of a Favor",
    nameZh: '鶴的報恩',
    source: 'Japanese folktale (Tsuru no Ongaeshi)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Tsuru_no_Ongaeshi',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['warm', 'fantasy'],
    protagonist: ['animal', 'elder'],
    theme: ['friendship', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'separation'],
    status: 'shipped',
    shippedChapter: 17,
    lengthClass: 'short',
  },
  {
    id: 'heungbu-nolbu',
    nameEn: 'Heungbu and Nolbu',
    nameZh: '興夫和孬夫',
    source: 'Korean folktale (Joseon period)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Heungbu_and_Nolbu',
    copyright: 'public-domain',
    culture: ['korea'],
    style: ['warm', 'animal-fable'],
    protagonist: ['child', 'animal'],
    theme: ['justice', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 18,
    lengthClass: 'short',
  },
  {
    id: 'sang-kancil',
    nameEn: 'Sang Kancil and the Crocodiles',
    nameZh: 'Sang Kancil 與鱷魚',
    source: 'Malay/Indonesian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sang_Kancil',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 19,
    lengthClass: 'short',
  },
  {
    id: 'enormous-turnip',
    nameEn: 'The Enormous Turnip',
    nameZh: '蘿蔔大冒險',
    source: 'Russian folktale (Tolstoy 1863 retelling, originally folk)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Gigantic_Turnip',
    copyright: 'public-domain',
    culture: ['russia', 'global-folk'],
    style: ['animal-fable', 'warm'],
    protagonist: ['elder', 'animal'],
    theme: ['friendship', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 20,
    lengthClass: 'short',
  },
  {
    id: 'anansi-spider',
    nameEn: 'Anansi the Spider',
    nameZh: 'Anansi 蜘蛛',
    source: 'West African Akan folklore',
    sourceUrl: 'https://en.wikipedia.org/wiki/Anansi',
    copyright: 'public-domain',
    culture: ['africa'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 21,
    lengthClass: 'short',
  },
  {
    id: 'mencius-mother',
    nameEn: "Mencius's Mother Moves Three Times",
    nameZh: '孟母三遷',
    source: 'Chinese classics (Han 列女傳, ~1st century BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Mencius',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote', 'warm'],
    protagonist: ['historical-figure', 'child'],
    theme: ['family', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 22,
    lengthClass: 'short',
  },
  {
    id: 'sima-guang',
    nameEn: 'Sima Guang Smashes the Vat',
    nameZh: '司馬光砸缸',
    source: 'Song dynasty 宋史 (1345 AD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sima_Guang',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure', 'child'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 23,
    lengthClass: 'short',
  },
  {
    id: 'kong-rong',
    nameEn: 'Kong Rong Gives Up the Pear',
    nameZh: '孔融讓梨',
    source: 'Later Han 後漢書 (5th century)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Kong_Rong',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote', 'warm'],
    protagonist: ['historical-figure', 'child'],
    theme: ['family', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 24,
    lengthClass: 'short',
  },
  {
    id: 'yugong',
    nameEn: 'The Foolish Old Man Moves the Mountains',
    nameZh: '愚公移山',
    source: 'Chinese classics 列子・湯問 (~400 BCE compilation)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Foolish_Old_Man_Removes_the_Mountains',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['warm'],
    protagonist: ['elder'],
    theme: ['perseverance', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 25,
    lengthClass: 'short',
  },
  {
    id: 'archimedes-eureka',
    nameEn: 'Archimedes and the Eureka Moment',
    nameZh: 'Archimedes 的尤里卡',
    source: 'Greek historical anecdote (Vitruvius, ~25 BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Eureka_(word)',
    copyright: 'public-domain',
    culture: ['historical', 'europe'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['creativity', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'shipped',
    shippedChapter: 26,
    lengthClass: 'short',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SHORT CANDIDATES (~73)
  // 100% public-domain. Metadata only — no canon / lesson content yet.
  // Per docs/strategy/2026-06-07-market-research-cc-licensing.md PD checklist.
  // ═══════════════════════════════════════════════════════════════════════

  // ─── 中華民間 / 古典 (~20) ──────────────────────────────────────────────
  {
    id: 'tianluo-maiden',
    nameEn: 'The River Snail Maiden',
    nameZh: '田螺姑娘',
    source: 'Chinese folklore (Soushen Houji, ~4th century)',
    sourceUrl: 'https://zh.wikipedia.org/wiki/%E7%94%B0%E8%9E%BA%E5%A7%91%E5%A8%98',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'warm'],
    protagonist: ['mythical'],
    theme: ['friendship', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'gold-axe-silver-axe',
    nameEn: 'The Gold Axe and the Silver Axe',
    nameZh: '金斧頭與銀斧頭',
    source: 'East Asian folktale (Aesop-influenced 樵夫故事)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Mercury_and_the_Woodman',
    copyright: 'public-domain',
    culture: ['china', 'global-folk'],
    style: ['fantasy'],
    protagonist: ['elder'],
    theme: ['honesty', 'justice'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'nian-monster',
    nameEn: 'Nian the New Year Monster',
    nameZh: '年獸',
    source: 'Chinese New Year folk legend',
    sourceUrl: 'https://en.wikipedia.org/wiki/Nian',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['mythical', 'elder'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'tiger-grandma',
    nameEn: 'Grandaunt Tiger',
    nameZh: '虎姑婆',
    source: 'Taiwanese / Southern Chinese folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Grandaunt_Tiger',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    pairedWith: ['red-riding-hood'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'mouse-wedding',
    nameEn: "The Mouse's Wedding",
    nameZh: '老鼠嫁女',
    source: 'Chinese folktale',
    sourceUrl: 'https://zh.wikipedia.org/wiki/%E8%80%81%E9%BC%A0%E5%AB%81%E5%A5%B3%E5%85%92',
    copyright: 'public-domain',
    culture: ['china', 'global-folk'],
    style: ['animal-fable', 'warm'],
    protagonist: ['animal'],
    theme: ['wit', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'magic-brush-ma-liang',
    nameEn: "Ma Liang's Magic Brush",
    nameZh: '神筆馬良',
    source: 'Chinese folklore (Hong Xuntao 1955 retelling, source motif older)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ma_Liang',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['creativity', 'justice'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'three-monks',
    nameEn: 'The Three Monks',
    nameZh: '三個和尚',
    source: 'Chinese proverb / folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Three_Monks',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['warm', 'animal-fable'],
    protagonist: ['elder'],
    theme: ['friendship', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'chenxiang-rescues-mother',
    nameEn: 'Chenxiang Rescues His Mother',
    nameZh: '沉香救母',
    source: 'Chinese folklore (Tang origins, full text Ming/Qing)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Magic_Lotus_Lantern',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'mythical'],
    theme: ['family', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['separation', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sea-snail-maiden',
    nameEn: 'The Sea Snail Maiden',
    nameZh: '海螺姑娘',
    source: 'Chinese coastal folklore (Fujian origin)',
    sourceUrl: 'https://zh.wikipedia.org/wiki/%E6%B5%B7%E8%9E%BA%E5%A7%91%E5%A8%98',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'warm'],
    protagonist: ['mythical'],
    theme: ['friendship', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baogong-verdict-1',
    nameEn: 'Judge Bao: The Lost Hairpin',
    nameZh: '包公斷案・遺釵記',
    source: 'Chinese folklore (Northern Song historical figure, 元 stories)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bao_Zheng',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['mystery', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['justice', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baogong-verdict-2',
    nameEn: 'Judge Bao: The Stone Witness',
    nameZh: '包公斷案・石頭證人',
    source: 'Chinese folklore (Yuan/Ming court case collection)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bao_Zheng',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['mystery', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['justice', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baogong-verdict-3',
    nameEn: 'Judge Bao: The Cat Sold as Prince',
    nameZh: '包公斷案・狸貓換太子',
    source: 'Chinese folklore (Yuan opera tradition)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bao_Zheng',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['mystery', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['justice'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baogong-verdict-4',
    nameEn: 'Judge Bao: The Magic Bowl',
    nameZh: '包公斷案・烏盆案',
    source: 'Chinese folklore (Ming 三俠五義)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bao_Zheng',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['mystery', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['justice'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baogong-verdict-5',
    nameEn: 'Judge Bao: The Lying Brothers',
    nameZh: '包公斷案・兄弟分家',
    source: 'Chinese folklore (Ming/Qing court case tradition)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bao_Zheng',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['mystery', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['justice', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'iron-pestle-needle',
    nameEn: 'Grinding an Iron Pestle into a Needle',
    nameZh: '鐵杵磨成針',
    source: 'Chinese proverb (Tang dynasty, Li Bai biography)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Li_Bai',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure', 'child', 'elder'],
    theme: ['perseverance', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'wang-xizhi-eats-ink',
    nameEn: 'Wang Xizhi Eats Ink',
    nameZh: '王羲之吃墨',
    source: 'Chinese historical anecdote (Eastern Jin)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Wang_Xizhi',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote', 'warm'],
    protagonist: ['historical-figure'],
    theme: ['perseverance', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'standing-in-snow-at-cheng-gate',
    nameEn: 'Standing in Snow at the Cheng Gate',
    nameZh: '程門立雪',
    source: 'Chinese historical anecdote (Song dynasty 宋史)',
    sourceUrl: 'https://baike.baidu.com/item/%E7%A8%8B%E9%97%A8%E7%AB%8B%E9%9B%AA',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['perseverance', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'zheng-he-voyages',
    nameEn: "Zheng He's Western Voyages",
    nameZh: '鄭和下西洋',
    source: 'Chinese history (Ming, 1405-1433)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Zheng_He',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote', 'adventure'],
    protagonist: ['historical-figure'],
    theme: ['courage', 'creativity'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  // ─── Grimm 補 (~10) ────────────────────────────────────────────────────
  {
    id: 'rapunzel',
    nameEn: 'Rapunzel',
    nameZh: '長髮公主',
    source: 'Grimm KHM 12 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Rapunzel',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['courage', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: ['separation', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'frog-prince',
    nameEn: 'The Frog Prince',
    nameZh: '青蛙王子',
    source: 'Grimm KHM 1 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Frog_Prince',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['fantasy'],
    protagonist: ['mythical', 'child'],
    theme: ['honesty', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'wolf-seven-kids',
    nameEn: 'The Wolf and the Seven Young Kids',
    nameZh: '狼與七隻小山羊',
    source: 'Grimm KHM 5 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Wolf_and_the_Seven_Young_Kids',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['animal-fable', 'dark-fairy-tale'],
    protagonist: ['animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'mild-violence'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'bremen-musicians',
    nameEn: 'The Town Musicians of Bremen',
    nameZh: '不來梅的城市樂手',
    source: 'Grimm KHM 27 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Town_Musicians_of_Bremen',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['animal-fable', 'warm'],
    protagonist: ['animal'],
    theme: ['friendship', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'hansel-gretel',
    nameEn: 'Hansel and Gretel',
    nameZh: '漢賽爾與葛麗特',
    source: 'Grimm KHM 15 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Hansel_and_Gretel',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['friendship', 'wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'separation', 'mild-violence'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sleeping-beauty',
    nameEn: 'Sleeping Beauty',
    nameZh: '睡美人',
    source: 'Grimm KHM 50 / Perrault 1697',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sleeping_Beauty',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['courage', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'rumpelstiltskin',
    nameEn: 'Rumpelstiltskin',
    nameZh: 'Rumpelstiltskin 名字之謎',
    source: 'Grimm KHM 55 (1812)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Rumpelstiltskin',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['fantasy', 'mystery'],
    protagonist: ['child', 'mythical'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'fisherman-goldfish',
    nameEn: 'The Fisherman and the Goldfish',
    nameZh: '漁夫和金魚',
    source: 'Pushkin 1833 (after Grimm KHM 19 motif)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Tale_of_the_Fisherman_and_the_Fish',
    copyright: 'public-domain',
    culture: ['russia', 'europe'],
    style: ['fantasy'],
    protagonist: ['elder', 'animal'],
    theme: ['honesty', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  // ─── Andersen 補 (~8) ──────────────────────────────────────────────────
  {
    id: 'little-match-girl',
    nameEn: 'The Little Match Girl',
    nameZh: '賣火柴的小女孩',
    source: 'Andersen 1845',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Little_Match_Girl',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale', 'warm'],
    protagonist: ['child'],
    theme: ['family', 'growth'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'death-themed', 'separation'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'thumbelina',
    nameEn: 'Thumbelina',
    nameZh: '拇指姑娘',
    source: 'Andersen 1835',
    sourceUrl: 'https://en.wikipedia.org/wiki/Thumbelina',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'animal'],
    theme: ['courage', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: ['separation'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'tin-soldier',
    nameEn: 'The Steadfast Tin Soldier',
    nameZh: '錫兵',
    source: 'Andersen 1838',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Steadfast_Tin_Soldier',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['warm', 'dark-fairy-tale'],
    protagonist: ['object'],
    theme: ['courage', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: ['sadness', 'death-themed'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'red-shoes',
    nameEn: 'The Red Shoes',
    nameZh: '紅鞋',
    source: 'Andersen 1845',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Red_Shoes_(fairy_tale)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'object'],
    theme: ['honesty', 'growth'],
    cefrLevel: 'A2+',
    contentFlags: ['fear-themed', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'snow-queen-short',
    nameEn: 'The Snow Queen (children short edit)',
    nameZh: '雪后(兒童短篇)',
    source: 'Andersen 1844',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Snow_Queen',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['europe'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child'],
    theme: ['friendship', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['separation', 'fear-themed'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'nightingale',
    nameEn: 'The Nightingale',
    nameZh: '夜鶯',
    source: 'Andersen 1843',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Nightingale_(fairy_tale)',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['warm', 'fantasy'],
    protagonist: ['animal'],
    theme: ['friendship', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'princess-and-pea',
    nameEn: 'The Princess and the Pea',
    nameZh: '豌豆公主',
    source: 'Andersen 1835',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Princess_and_the_Pea',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['warm', 'fantasy'],
    protagonist: ['child'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'wild-swans',
    nameEn: 'The Wild Swans',
    nameZh: '野天鵝',
    source: 'Andersen 1838',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Wild_Swans',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['dark-fairy-tale'],
    protagonist: ['child', 'animal'],
    theme: ['family', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation'],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── Aesop 補 (~10) ────────────────────────────────────────────────────
  {
    id: 'boy-cried-wolf',
    nameEn: 'The Boy Who Cried Wolf',
    nameZh: '狼來了',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Boy_Who_Cried_Wolf',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['child', 'animal'],
    theme: ['honesty', 'justice'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'north-wind-sun',
    nameEn: 'The North Wind and the Sun',
    nameZh: '北風與太陽',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_North_Wind_and_the_Sun',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['mythical'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'lion-mouse',
    nameEn: 'The Lion and the Mouse',
    nameZh: '獅子與老鼠',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Lion_and_the_Mouse',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['friendship', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'mice-council',
    nameEn: 'The Mice in Council',
    nameZh: '老鼠開會',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/Belling_the_Cat',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'wolf-crane',
    nameEn: 'The Wolf and the Crane',
    nameZh: '狼與鶴',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Wolf_and_the_Crane',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'ant-grasshopper',
    nameEn: 'The Ant and the Grasshopper',
    nameZh: '螞蟻與蚱蜢',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Ant_and_the_Grasshopper',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'fox-grapes',
    nameEn: 'The Fox and the Grapes',
    nameZh: '狐狸與葡萄',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Fox_and_the_Grapes',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'crow-fox',
    nameEn: 'The Crow and the Fox',
    nameZh: '烏鴉與狐狸',
    source: 'Aesop',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Fox_and_the_Crow',
    copyright: 'public-domain',
    culture: ['global-folk', 'europe'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 日本民間 (~5) ─────────────────────────────────────────────────────
  {
    id: 'kasa-jizo',
    nameEn: 'The Straw Hat Jizo Statues',
    nameZh: '笠地藏',
    source: 'Japanese folktale (Edo period)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Kasa_Jiz%C5%8D',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['warm', 'fantasy'],
    protagonist: ['elder', 'mythical'],
    theme: ['honesty', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'yuki-onna',
    nameEn: 'Yuki-onna the Snow Woman',
    nameZh: '雪女',
    source: 'Japanese folktale (Lafcadio Hearn 1904 collected, source older)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Yuki-onna',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['dark-fairy-tale'],
    protagonist: ['mythical'],
    theme: ['honesty', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['fear-themed', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'kachi-kachi-yama',
    nameEn: 'Kachi-kachi Yama',
    nameZh: 'カチカチ山',
    source: 'Japanese folktale (Edo period)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Kachi-kachi_Yama',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['animal-fable', 'dark-fairy-tale'],
    protagonist: ['animal'],
    theme: ['justice', 'wit'],
    cefrLevel: 'A2',
    contentFlags: ['mild-violence'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'taketori-short',
    nameEn: 'The Tale of the Bamboo Cutter (children short edit)',
    nameZh: '竹取物語(短篇)',
    source: 'Japanese folktale (Taketori Monogatari, ~10th century)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Tale_of_the_Bamboo_Cutter',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['fantasy'],
    protagonist: ['child', 'mythical'],
    theme: ['family', 'growth'],
    cefrLevel: 'A2',
    contentFlags: ['separation', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'rabbit-island',
    nameEn: 'The Hare of Inaba',
    nameZh: '兔島(因幡白兔)',
    source: 'Japanese myth (Kojiki, 712 AD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Hare_of_Inaba',
    copyright: 'public-domain',
    culture: ['japan'],
    style: ['animal-fable'],
    protagonist: ['animal', 'mythical'],
    theme: ['friendship', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 韓國 (~3) ─────────────────────────────────────────────────────────
  {
    id: 'sun-moon-tiger',
    nameEn: 'The Sun, the Moon, and the Tiger',
    nameZh: '虎兄妹日月起源',
    source: 'Korean folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Sun_and_the_Moon_(Korean_folktale)',
    copyright: 'public-domain',
    culture: ['korea'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['child', 'animal'],
    theme: ['courage', 'family'],
    cefrLevel: 'A2',
    contentFlags: ['fear-themed', 'sadness'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'snail-bride',
    nameEn: 'The Snail Bride',
    nameZh: '田螺新娘',
    source: 'Korean folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Korean_folklore',
    copyright: 'public-domain',
    culture: ['korea'],
    style: ['fantasy', 'warm'],
    protagonist: ['mythical', 'elder'],
    theme: ['friendship', 'family'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'baekiljong',
    nameEn: 'The Hundred-Day Red Flower',
    nameZh: '百日紅',
    source: 'Korean folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Korean_folklore',
    copyright: 'public-domain',
    culture: ['korea'],
    style: ['warm', 'dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['friendship', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['sadness', 'separation'],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 東南亞 (~5) ───────────────────────────────────────────────────────
  {
    id: 'sang-kancil-tiger',
    nameEn: 'Sang Kancil and the Tiger',
    nameZh: 'Sang Kancil 與老虎',
    source: 'Malay/Indonesian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sang_Kancil',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sang-kancil-snail',
    nameEn: 'Sang Kancil and the Snail',
    nameZh: 'Sang Kancil 與蝸牛',
    source: 'Malay/Indonesian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sang_Kancil',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sang-kancil-elephant',
    nameEn: 'Sang Kancil and the Elephant',
    nameZh: 'Sang Kancil 與大象',
    source: 'Malay/Indonesian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sang_Kancil',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sang-kancil-cucumber',
    nameEn: "Sang Kancil and the Farmer's Cucumber Field",
    nameZh: 'Sang Kancil 與黃瓜田',
    source: 'Malay/Indonesian folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sang_Kancil',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'bawang-putih',
    nameEn: 'Bawang Merah and Bawang Putih',
    nameZh: 'Bawang Merah 和 Bawang Putih',
    source: 'Indonesian/Malay folktale',
    sourceUrl: 'https://en.wikipedia.org/wiki/Bawang_Merah_Bawang_Putih',
    copyright: 'public-domain',
    culture: ['southeast-asia'],
    style: ['fantasy'],
    protagonist: ['child'],
    theme: ['justice', 'family'],
    cefrLevel: 'A2',
    contentFlags: ['sadness'],
    pairedWith: ['cinderella', 'yexian'],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 印度 Panchatantra (~5) ────────────────────────────────────────────
  {
    id: 'lion-and-mouse-panchatantra',
    nameEn: 'The Lion and the Clever Mouse (Panchatantra)',
    nameZh: '獅與鼠(印度版)',
    source: 'Panchatantra (~300 BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Panchatantra',
    copyright: 'public-domain',
    culture: ['india'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['friendship', 'wit'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'monkey-crocodile',
    nameEn: 'The Monkey and the Crocodile',
    nameZh: '猴子與鱷魚',
    source: 'Panchatantra (~300 BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Monkey_and_the_Crocodile',
    copyright: 'public-domain',
    culture: ['india'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'friendship'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'lion-and-rabbit',
    nameEn: 'The Lion and the Clever Rabbit',
    nameZh: '獅子與聰明的兔子',
    source: 'Panchatantra (~300 BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Panchatantra',
    copyright: 'public-domain',
    culture: ['india'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 俄羅斯 / 北歐 (~3) ────────────────────────────────────────────────
  {
    id: 'firebird',
    nameEn: 'The Firebird',
    nameZh: '火鳥',
    source: 'Russian folktale (Afanasyev collection, 1855-1863)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Firebird',
    copyright: 'public-domain',
    culture: ['russia'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'mythical'],
    theme: ['courage', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'vasilisa-beautiful',
    nameEn: 'Vasilisa the Beautiful',
    nameZh: 'Vasilisa 美人',
    source: 'Russian folktale (Afanasyev 1855-1863)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Vasilisa_the_Beautiful',
    copyright: 'public-domain',
    culture: ['russia'],
    style: ['fantasy', 'dark-fairy-tale'],
    protagonist: ['child'],
    theme: ['courage', 'family'],
    cefrLevel: 'A2+',
    contentFlags: ['fear-themed', 'separation'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'three-bears',
    nameEn: 'Goldilocks and the Three Bears',
    nameZh: '三隻熊',
    source: 'English folktale (Southey 1837)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Goldilocks_and_the_Three_Bears',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['fantasy', 'animal-fable'],
    protagonist: ['child', 'animal'],
    theme: ['wit', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 非洲 (~2) ─────────────────────────────────────────────────────────
  {
    id: 'anansi-and-pot-of-wisdom',
    nameEn: 'Anansi and the Pot of Wisdom',
    nameZh: 'Anansi 與智慧之罐',
    source: 'West African Akan folklore',
    sourceUrl: 'https://en.wikipedia.org/wiki/Anansi',
    copyright: 'public-domain',
    culture: ['africa'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'why-mosquito-buzzes',
    nameEn: "Why Mosquitoes Buzz in People's Ears",
    nameZh: '為何蚊子在耳邊嗡嗡叫',
    source: 'West African folktale (children retold from oral tradition)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Why_Mosquitoes_Buzz_in_People%27s_Ears',
    copyright: 'public-domain',
    culture: ['africa'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['justice', 'honesty'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 拉美 / 中東 (~5) ──────────────────────────────────────────────────
  {
    id: 'quetzalcoatl',
    nameEn: 'Quetzalcoatl and the Maize',
    nameZh: 'Quetzalcoatl 與玉米',
    source: 'Aztec myth (pre-Columbian, recorded 16th century)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Quetzalcoatl',
    copyright: 'public-domain',
    culture: ['latin-america'],
    style: ['fantasy'],
    protagonist: ['mythical'],
    theme: ['family', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'tortuga-and-tigre',
    nameEn: 'The Tortoise and the Tiger (Latin American variant)',
    nameZh: '龜與虎(拉美變體)',
    source: 'Latin American folktale (Trickster tradition)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Trickster',
    copyright: 'public-domain',
    culture: ['latin-america', 'global-folk'],
    style: ['animal-fable'],
    protagonist: ['animal'],
    theme: ['wit', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'sinbad-first-voyage',
    nameEn: "Sinbad's First Voyage (children short edit)",
    nameZh: '辛巴達第一次航海',
    source: '1001 Nights (Antoine Galland 1717 French translation)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sinbad_the_Sailor',
    copyright: 'public-domain',
    culture: ['middle-east'],
    style: ['adventure'],
    protagonist: ['child'],
    theme: ['courage', 'creativity'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'ali-baba-short',
    nameEn: 'Ali Baba and the Forty Thieves (children short edit)',
    nameZh: '阿里巴巴與四十大盜(短篇)',
    source: '1001 Nights (Antoine Galland 1717 French translation)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ali_Baba',
    copyright: 'public-domain',
    culture: ['middle-east'],
    style: ['adventure', 'mystery'],
    protagonist: ['child'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence'],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'aladdin-short',
    nameEn: 'Aladdin and the Magic Lamp (children short edit)',
    nameZh: '阿拉丁與神燈(短篇)',
    source: '1001 Nights (Antoine Galland 1710s, pre-Disney)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Aladdin',
    copyright: 'public-domain-no-modern-adaptation',
    culture: ['middle-east'],
    style: ['fantasy', 'adventure'],
    protagonist: ['child', 'mythical'],
    theme: ['wit', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ─── 古典 + 歷史 PD (~5) ───────────────────────────────────────────────
  {
    id: 'newton-apple',
    nameEn: "Newton's Apple",
    nameZh: '牛頓的蘋果',
    source: 'British historical anecdote (Stukeley 1752 biography)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Isaac_Newton%27s_apple_tree',
    copyright: 'public-domain',
    culture: ['historical', 'europe'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['creativity', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'franklin-kite',
    nameEn: "Franklin and the Lightning Kite",
    nameZh: 'Franklin 風箏實驗',
    source: 'American historical anecdote (Joseph Priestley 1767 account)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Kite_experiment',
    copyright: 'public-domain',
    culture: ['historical'],
    style: ['historical-anecdote', 'adventure'],
    protagonist: ['historical-figure'],
    theme: ['creativity', 'courage'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'marie-curie-radium',
    nameEn: 'Marie Curie and Radium',
    nameZh: '居禮夫人與鐳',
    source: 'Historical record (Eve Curie 1937 biography for source, life events PD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Marie_Curie',
    copyright: 'public-domain',
    culture: ['historical', 'europe'],
    style: ['historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['perseverance', 'creativity'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'helen-keller-water',
    nameEn: 'Helen Keller Learns the Word "Water"',
    nameZh: '海倫凱勒學會「水」',
    source: 'Historical (Helen Keller 1903 autobiography, PD US)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Helen_Keller',
    copyright: 'public-domain',
    culture: ['historical'],
    style: ['historical-anecdote', 'warm'],
    protagonist: ['historical-figure', 'child'],
    theme: ['perseverance', 'growth'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },
  {
    id: 'florence-nightingale-lamp',
    nameEn: 'Florence Nightingale and the Lamp',
    nameZh: '南丁格爾的提燈',
    source: 'Historical (Crimean War records 1854-56, PD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Florence_Nightingale',
    copyright: 'public-domain',
    culture: ['historical', 'europe'],
    style: ['historical-anecdote', 'warm'],
    protagonist: ['historical-figure'],
    theme: ['courage', 'perseverance'],
    cefrLevel: 'A2',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'short',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MID-LONG CANDIDATES (10)
  // Multi-chapter serialised arcs (5-12 episodes). All 100% public-domain.
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'journey-to-west-series',
    nameEn: 'Journey to the West (Monkey King Episodes)',
    nameZh: '西遊記(取經episodes)',
    source: '吳承恩 1592',
    sourceUrl: 'https://en.wikipedia.org/wiki/Journey_to_the_West',
    copyright: 'public-domain',
    culture: ['china'],
    style: ['fantasy', 'adventure', 'epic'],
    protagonist: ['mythical'],
    theme: ['courage', 'friendship', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence', 'fear-themed'],
    status: 'shipped',
    lengthClass: 'mid-long',
    shippedChapter: 27,
    suggestedEpisodes: 9,
  },
  {
    id: 'zhuge-liang-strategems',
    nameEn: "Zhuge Liang's Strategems (Three Kingdoms)",
    nameZh: '三國諸葛亮智謀系列',
    source: '羅貫中 三國演義 (14th century)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Romance_of_the_Three_Kingdoms',
    copyright: 'public-domain',
    culture: ['china', 'historical'],
    style: ['historical-anecdote', 'epic'],
    protagonist: ['historical-figure'],
    theme: ['wit', 'courage', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence'],
    status: 'shipped',
    lengthClass: 'mid-long',
    shippedChapter: 28,
    suggestedEpisodes: 6,
  },
  {
    id: 'odyssey',
    nameEn: 'The Odyssey (children serialised)',
    nameZh: '奧德賽(兒童連載)',
    source: 'Homer (~8th century BCE)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Odyssey',
    copyright: 'public-domain',
    culture: ['europe', 'historical'],
    style: ['epic', 'adventure'],
    protagonist: ['historical-figure', 'mythical'],
    theme: ['courage', 'family', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence', 'fear-themed', 'separation'],
    status: 'shipped',
    shippedChapter: 29,
    lengthClass: 'mid-long',
    suggestedEpisodes: 8,
  },
  {
    id: 'heracles-twelve-labors',
    nameEn: 'The Twelve Labors of Heracles',
    nameZh: '赫拉克勒斯十二任務',
    source: 'Greek myth (multiple Classical sources)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Labours_of_Hercules',
    copyright: 'public-domain',
    culture: ['europe', 'historical'],
    style: ['epic', 'adventure', 'fantasy'],
    protagonist: ['mythical'],
    theme: ['courage', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence', 'fear-themed'],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 12,
  },
  {
    id: 'robin-hood',
    nameEn: "Robin Hood's Children's Adventures",
    nameZh: 'Robin Hood 兒童歷險',
    source: 'English folklore (medieval ballads, Howard Pyle 1883 children edition PD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Robin_Hood',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['adventure'],
    protagonist: ['historical-figure'],
    theme: ['justice', 'courage', 'friendship'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence'],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 7,
  },
  {
    id: 'king-arthur-round-table',
    nameEn: 'King Arthur and the Round Table (children edit)',
    nameZh: 'King Arthur 圓桌(兒童版)',
    source: 'Medieval English/Welsh tradition (Malory 1485, Howard Pyle 1903 PD)',
    sourceUrl: 'https://en.wikipedia.org/wiki/King_Arthur',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['epic', 'adventure', 'fantasy'],
    protagonist: ['historical-figure', 'mythical'],
    theme: ['courage', 'friendship', 'justice'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence'],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 8,
  },
  {
    id: 'sinbad-seven-voyages',
    nameEn: "Sinbad's Seven Voyages",
    nameZh: '辛巴達七航海',
    source: '1001 Nights (Antoine Galland 1717 French translation)',
    sourceUrl: 'https://en.wikipedia.org/wiki/Sinbad_the_Sailor',
    copyright: 'public-domain',
    culture: ['middle-east'],
    style: ['adventure', 'epic'],
    protagonist: ['child'],
    theme: ['courage', 'creativity', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence', 'fear-themed'],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 7,
  },
  {
    id: 'marco-polo-travels',
    nameEn: "Marco Polo's Travels (children excerpts)",
    nameZh: '馬可波羅旅行記(兒童摘錄)',
    source: 'Marco Polo / Rustichello da Pisa (~1300)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Travels_of_Marco_Polo',
    copyright: 'public-domain',
    culture: ['historical', 'europe', 'china'],
    style: ['historical-anecdote', 'adventure'],
    protagonist: ['historical-figure'],
    theme: ['courage', 'creativity'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 6,
  },
  {
    id: 'heike-monogatari',
    nameEn: 'Tales of the Heike (children episodes)',
    nameZh: '平家物語(兒童episodes)',
    source: 'Japanese (13th century, multiple oral biwa traditions)',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Tale_of_the_Heike',
    copyright: 'public-domain',
    culture: ['japan', 'historical'],
    style: ['epic', 'historical-anecdote'],
    protagonist: ['historical-figure'],
    theme: ['courage', 'family', 'perseverance'],
    cefrLevel: 'A2+',
    contentFlags: ['mild-violence', 'sadness', 'separation'],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 6,
  },
  {
    id: 'gullivers-travels',
    nameEn: "Gulliver's Travels (children four-land edit)",
    nameZh: '格列佛遊記(四國兒童版)',
    source: 'Jonathan Swift 1726',
    sourceUrl: 'https://en.wikipedia.org/wiki/Gulliver%27s_Travels',
    copyright: 'public-domain',
    culture: ['europe'],
    style: ['adventure', 'fantasy'],
    protagonist: ['historical-figure'],
    theme: ['creativity', 'wit'],
    cefrLevel: 'A2+',
    contentFlags: [],
    status: 'candidate',
    lengthClass: 'mid-long',
    suggestedEpisodes: 4,
  },
];

// ─── Sanity guard: registry size + status counts ───────────────────────────

export const REGISTRY_TOTAL = 110;
// v2.0.B.258: round 1 mid-long ship (Ch27-29 西遊記/諸葛亮/Odyssey), 27→30 shipped, 83→80 candidate
export const REGISTRY_SHIPPED_COUNT = 30;
export const REGISTRY_CANDIDATE_COUNT = 80;
export const REGISTRY_SHORT_CANDIDATE_COUNT = 73;
export const REGISTRY_MID_LONG_COUNT = 10; // total still 10 (3 shipped + 7 candidates)

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
 *   - short stories score higher than mid-long (faster to ship)
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
    // Length penalty: mid-long = bigger ship lift, score lower for "next".
    if ((c.lengthClass ?? 'short') === 'mid-long') score -= 2;
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

/** All candidate entries (short + mid-long, for teaser cards). */
export function listCandidateStories(): StoryEntry[] {
  return STORY_REGISTRY.filter((s) => s.status === 'candidate');
}

/** v2.0.B.242 — only short-length candidates (single-chapter ship). */
export function listShortCandidates(): StoryEntry[] {
  return STORY_REGISTRY.filter(
    (s) => s.status === 'candidate' && (s.lengthClass ?? 'short') === 'short',
  );
}

/** v2.0.B.242 — only mid-long candidates (serialised arcs). */
export function listMidLong(): StoryEntry[] {
  return STORY_REGISTRY.filter(
    (s) => s.status === 'candidate' && s.lengthClass === 'mid-long',
  );
}

/**
 * v2.0.B.242 Bear cultural distribution helper.
 *
 * Computes the candidate-pool culture mix and compares against the locked
 * Bear targets (per pickup-story-standards.md §文化分佈):
 *   中華 35% / 歐美 40% / 日韓東南亞 15% / 其他 10%
 *
 * `lengthClass` weights each candidate equally by default; mid-long stories
 * count as `episodeWeight` (default = suggestedEpisodes ?? 1) so a 10-episode
 * 西遊記 carries 10x the cultural weight of a single-chapter Aesop fable.
 *
 * Returns the per-bucket fractional share + delta vs target. Pure-fn,
 * no I/O. Used by future Bear dashboard surface + PM ROI planning.
 */
export interface BearDistribution {
  buckets: {
    chinese: number;
    western: number;
    asian: number;
    other: number;
  };
  weights: {
    chinese: number;
    western: number;
    asian: number;
    other: number;
  };
  totalWeight: number;
  target: {
    chinese: number;
    western: number;
    asian: number;
    other: number;
  };
  delta: {
    chinese: number;
    western: number;
    asian: number;
    other: number;
  };
}

const BEAR_TARGET = {
  chinese: 0.35,
  western: 0.40,
  asian: 0.15,
  other: 0.10,
};

function classifyBucket(cultures: readonly Culture[]): keyof BearDistribution['buckets'] {
  if (cultures.includes('china')) return 'chinese';
  if (cultures.includes('japan') || cultures.includes('korea') || cultures.includes('southeast-asia')) {
    return 'asian';
  }
  if (cultures.includes('europe') || cultures.includes('russia')) return 'western';
  return 'other';
}

export function bearDistributionStatus(
  options: { useEpisodeWeight?: boolean } = {},
): BearDistribution {
  const useEpisodeWeight = options.useEpisodeWeight ?? true;
  const weights = { chinese: 0, western: 0, asian: 0, other: 0 };
  let total = 0;

  for (const s of STORY_REGISTRY) {
    if (s.status !== 'candidate' && s.status !== 'shipped') continue;
    const bucket = classifyBucket(s.culture);
    const w = useEpisodeWeight && s.lengthClass === 'mid-long'
      ? (s.suggestedEpisodes ?? 1)
      : 1;
    weights[bucket] += w;
    total += w;
  }

  const buckets = {
    chinese: total > 0 ? weights.chinese / total : 0,
    western: total > 0 ? weights.western / total : 0,
    asian: total > 0 ? weights.asian / total : 0,
    other: total > 0 ? weights.other / total : 0,
  };

  return {
    buckets,
    weights,
    totalWeight: total,
    target: { ...BEAR_TARGET },
    delta: {
      chinese: buckets.chinese - BEAR_TARGET.chinese,
      western: buckets.western - BEAR_TARGET.western,
      asian: buckets.asian - BEAR_TARGET.asian,
      other: buckets.other - BEAR_TARGET.other,
    },
  };
}
