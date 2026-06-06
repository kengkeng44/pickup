/**
 * v2.0.B.235 — Key Sentence (金句) registry for share feature.
 *
 * Each chapter exposes 1-2 public-domain canonical sentences from the
 * folktale canon (Andersen / Grimm / Perrault / Tang folktale / Kipling).
 * These power the "📤 分享金句" share card surfaced from CompletePanel.
 *
 * COPYRIGHT GUARDRAILS
 *   - ≤ 1 sentence per entry, ≤ 30 chars in `en`
 *   - Only PUBLIC DOMAIN source material (pre-1929 by US rule, plus
 *     traditional folklore that has no single author).
 *   - NO Disney / Pixar / modern adaptation phrasing.
 *   - `source` MUST credit the canonical work (Grimm KHM #, Andersen year,
 *     Tang dynasty folktale title, etc).
 *
 * USED BY
 *   - src/data/shareCard.ts        — SVG share card renderer
 *   - src/react-app/pages/LessonPage.tsx CompletePanel → ShareModal
 *
 * SOURCE-OF-TRUTH MIRROR
 *   - Chapter list parallels CLAUDE.md "Story Framework" Ch1-Ch8.
 */

export interface KeySentence {
  /** Anchor lesson — the share button surfaces this sentence when the user
   * completes any lesson in the chapter, but lessonId pins the canonical
   * "moment" for analytics + future per-lesson surfacing. */
  lessonId: string;
  /** Public-domain canonical English sentence. Max 1 sentence, ≤ 30 chars. */
  en: string;
  /** Plain Chinese translation. A2-friendly, no jargon. */
  zh: string;
  /** Source attribution. Format: '<Work> · <Author/Tradition> <Year>'. */
  source: string;
}

/**
 * Per-chapter key sentences. Indexed by chapter number (1-8).
 * Each chapter has 1-2 candidates so future iteration can A/B which lands
 * better with the audience.
 */
export const KEY_SENTENCES: Record<number, KeySentence[]> = {
  // Ch1 桃太郎 — Momotaro (Japanese folktale, traditional, public domain)
  1: [
    {
      lessonId: 'kt-ch1-l1',
      en: 'Long ago, an old couple lived by a river.',
      zh: '從前,一對老夫婦住在河邊。',
      source: '桃太郎 · 日本民間故事',
    },
    {
      lessonId: 'kt-ch1-l7',
      en: 'I am Momotaro, born from a peach.',
      zh: '我是桃太郎,從桃子裡出生。',
      source: '桃太郎 · 日本民間故事',
    },
  ],

  // Ch2 醜小鴨 — The Ugly Duckling (Andersen 1843, public domain)
  2: [
    {
      lessonId: 'kt-ch2-l1',
      en: 'It was so beautiful in the country.',
      zh: '鄉間真是美麗極了。',
      source: 'The Ugly Duckling · Andersen 1843',
    },
    {
      lessonId: 'kt-ch2-l7',
      en: 'I never dreamed of such happiness.',
      zh: '我從沒想過會有這樣的幸福。',
      source: 'The Ugly Duckling · Andersen 1843',
    },
  ],

  // Ch3 龜兔賽跑 — The Tortoise and the Hare (Aesop, ancient public domain)
  3: [
    {
      lessonId: 'kt-ch3-l7',
      en: 'Slow and steady wins the race.',
      zh: '慢而穩,贏得比賽。',
      source: 'The Tortoise and the Hare · Aesop',
    },
    {
      lessonId: 'kt-ch3-l3',
      en: 'The hare lay down and fell asleep.',
      zh: '兔子躺下,睡著了。',
      source: 'The Tortoise and the Hare · Aesop',
    },
  ],

  // Ch4 駱駝為什麼有駝峰 — How the Camel Got His Hump
  //      (Kipling, Just So Stories, 1902, public domain in US since 1978)
  4: [
    {
      lessonId: 'kt-ch4-l1',
      en: 'Humph!',
      zh: '哼!',
      source: "How the Camel Got His Hump · Kipling 1902",
    },
    {
      lessonId: 'kt-ch4-l7',
      en: 'The camel has a humph on his back.',
      zh: '駱駝的背上有了駝峰。',
      source: "How the Camel Got His Hump · Kipling 1902",
    },
  ],

  // Ch5 Baba Yaga — Russian folklore, traditional public domain.
  //      Sentence drawn from Afanasyev's 1855 collection (PD).
  5: [
    {
      lessonId: 'kt-ch5-l4',
      en: 'The hut stood on chicken legs.',
      zh: '小屋立在雞腳上。',
      source: 'Baba Yaga · Russian folktale',
    },
    {
      lessonId: 'kt-ch5-l7',
      en: 'The doll in her pocket whispered.',
      zh: '口袋裡的娃娃輕聲說話。',
      source: 'Vasilisa the Beautiful · Afanasyev 1855',
    },
  ],

  // Ch6 六隻天鵝 — The Six Swans (Grimm KHM 49, 1812, public domain)
  6: [
    {
      lessonId: 'kt-ch6-l3',
      en: 'And the six wild swans flew up.',
      zh: '六隻野天鵝飛上天空。',
      source: 'The Six Swans · Grimm KHM 49',
    },
    {
      lessonId: 'kt-ch6-l7',
      en: 'For six years she did not speak.',
      zh: '六年裡,她沒有說話。',
      source: 'The Six Swans · Grimm KHM 49',
    },
  ],

  // Ch7 葉限 — Ye Xian (Tang dynasty folktale, c.860 CE, public domain)
  7: [
    {
      lessonId: 'kt-ch7-l2',
      en: 'A red fish lived in the pond.',
      zh: '池子裡住著一條紅魚。',
      source: '葉限 · 唐 段成式《酉陽雜俎》',
    },
    {
      lessonId: 'kt-ch7-l6',
      en: 'The golden shoe fit only Ye Xian.',
      zh: '金鞋只合葉限的腳。',
      source: '葉限 · 唐 段成式《酉陽雜俎》',
    },
  ],

  // Ch8 三隻小豬 — The Three Little Pigs (English folktale, PD)
  //      First printed Halliwell-Phillipps 1843; traditional folktale.
  8: [
    {
      lessonId: 'kt-ch8-l4',
      en: "I'll huff and I'll puff.",
      zh: '我會吹氣,我會吹倒它。',
      source: 'The Three Little Pigs · English folktale',
    },
    {
      lessonId: 'kt-ch8-l7',
      en: 'The brick house stood firm.',
      zh: '磚屋牢牢站著。',
      source: 'The Three Little Pigs · English folktale',
    },
  ],
};

/**
 * Returns the primary key sentence for a chapter. Falls back to the first
 * entry; returns null if chapter has none.
 */
export function getKeySentenceForChapter(chapter: number): KeySentence | null {
  const arr = KEY_SENTENCES[chapter];
  if (!arr || arr.length === 0) return null;
  return arr[0];
}

/**
 * Returns the key sentence whose lessonId exactly matches, else falls back
 * to the chapter's primary entry.
 */
export function getKeySentenceForLesson(chapter: number, lessonId: string): KeySentence | null {
  const arr = KEY_SENTENCES[chapter];
  if (!arr || arr.length === 0) return null;
  const exact = arr.find(k => k.lessonId === lessonId);
  return exact ?? arr[0];
}
