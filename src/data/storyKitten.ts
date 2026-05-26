import { z } from 'zod';
import { ClozeQuestionSchema, type ClozeQuestion } from './sentences';

// Production v1.0: chapters unlock progressively (Ch1 free, rest via earned progression).
// Set true during dev to test all chapters without playing through.
const DEV_UNLOCK_ALL = false;

/**
 * StoryQuestion — A2 cloze tied to a chapter of the "小貓回家路" story.
 * Each chapter has exactly 6 questions in fixed order (questionInChapter 1..6).
 *
 * Stored in /public/story-kitten.json. Validated with zod on load.
 */
export const ChapterIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
]);

export type ChapterId = z.infer<typeof ChapterIdSchema>;

export const StoryQuestionSchema = ClozeQuestionSchema.extend({
  chapter: ChapterIdSchema,
  questionInChapter: z.number().int().min(1).max(6),
  storyBeat: z.string().optional(),
});

export const StoryQuestionsSchema = z.array(StoryQuestionSchema);

export type StoryQuestion = z.infer<typeof StoryQuestionSchema>;

let cached: StoryQuestion[] | null = null;

export async function loadStoryQuestions(): Promise<StoryQuestion[]> {
  if (cached) return cached;
  const res = await fetch('/story-kitten.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch story-kitten.json: ${res.status}`);
  }
  const raw = await res.json();
  const parsed = StoryQuestionsSchema.parse(raw);
  cached = parsed;
  return parsed;
}

export function questionsForChapter(
  all: StoryQuestion[],
  chapter: ChapterId
): StoryQuestion[] {
  return all
    .filter((q) => q.chapter === chapter)
    .sort((a, b) => a.questionInChapter - b.questionInChapter);
}

export function toClozeQuestion(q: StoryQuestion): ClozeQuestion {
  return {
    id: q.id,
    level: q.level,
    sentence: q.sentence,
    options: q.options,
    correctIndex: q.correctIndex,
    explanationZh: q.explanationZh,
    tags: q.tags,
  };
}

// ─── Chapter metadata: title, theme, kitten state, NPC mascot ───────────────

export interface ChapterMeta {
  id: ChapterId;
  emoji: string;
  titleZh: string;
  titleEn: string;
  /** Intro narration shown on ChapterIntroScene. */
  narration: string;
  /** Outro narration shown on ChapterEndScene. */
  outro: string;
  /** Mascot id for the kitten state shown during this chapter. */
  kittenMascotId: string;
  /** Mascot id for the chapter NPC (umbrella grandma, baker, ...). */
  npcMascotId: string;
  /** Soft halo tint behind mascot. */
  tint: string;
  /** Accent color for chapter card / chip. */
  accent: string;
}

export const CHAPTER_META: Record<ChapterId, ChapterMeta> = {
  1: {
    id: 1,
    emoji: '',
    titleZh: '流落街頭',
    titleEn: 'Lost on the Streets',
    narration:
      '小貓在巷子裡醒來,雨下得好大,身上的毛都濕了。肚子餓,身體冷,牠不知道家在哪裡。\n\n這時,一個撐著藍傘的阿嬤走了過來……',
    outro: '阿嬤把傘遮在小貓身上,雨聲變遠了。小貓第一次覺得,世界沒有那麼可怕。',
    kittenMascotId: 'kittenCh1',
    npcMascotId: 'npcGrandma',
    tint: '#e6e9f0',
    accent: '#6e88a8',
  },
  2: {
    id: 2,
    emoji: '',
    titleZh: '麵包店午後',
    titleEn: 'Bakery Afternoon',
    narration:
      '小貓躲在一家麵包店的後門。一股甜甜的香味從裡面飄出來。\n\n門開了,圍著白圍裙的老闆走出來,手上拿著一塊麵包……',
    outro: '小貓吃飽了,在老闆的腳邊磨蹭。從今天起,牠不再只是流浪的小貓。',
    kittenMascotId: 'kittenCh2',
    npcMascotId: 'npcBaker',
    tint: '#fce8c2',
    accent: '#e7a44a',
  },
  3: {
    id: 3,
    emoji: '',
    titleZh: '公園的小妹妹',
    titleEn: 'Park Girl',
    narration:
      '公園的長椅旁,一個綁馬尾的小女孩遠遠看著小貓。她手裡拿著一小包貓零食。\n\n「你好,我叫美美。」她輕輕地說……',
    outro: '美美天天來,慢慢地,小貓敢讓她摸了。世界比想像中還要溫柔。',
    kittenMascotId: 'kittenCh3',
    npcMascotId: 'npcMeimei',
    tint: '#fde2e8',
    accent: '#e7659c',
  },
  4: {
    id: 4,
    emoji: '',
    titleZh: '流浪狗大哥',
    titleEn: 'Stray Dog Big Brother',
    narration:
      '夜晚的街角,一隻獨眼的老狗布魯托走了過來。他看起來凶,卻擋在小貓前面,趕走了想欺負牠的大狗。\n\n他低聲地說:「跟我走吧,我教你……」',
    outro: '布魯托和小貓一起穿過街道。原來街頭也可以有家人。',
    kittenMascotId: 'kittenCh4',
    npcMascotId: 'npcBrutus',
    tint: '#d8dfd0',
    accent: '#6e7d5a',
  },
  5: {
    id: 5,
    emoji: '',
    titleZh: '永遠的家',
    titleEn: 'Forever Home',
    narration:
      '美美帶著爸媽來到公園。媽媽蹲下來,輕輕摸著小貓的頭。\n\n「我們帶你回家好嗎?」',
    // ── False ending. Kitten is in the home, surrounded by love, but realizes
    // she was CHOSEN, not that she CHOSE. Slips out into the snow. The arc
    // continues into Ch6-8.
    outro:
      '屋子裡有燈、有飯、有抱著牠的人。媽媽笑了,美美哭了,爸爸把暖氣調高了一格。\n\n夜裡,小貓蜷在窗邊。窗外開始下雪,一片一片,落得好慢。\n\n「他們選擇了我。」牠看著自己模糊的倒影。「但我選擇了這個家嗎?」\n\n窗戶沒關緊。牠輕輕跳了下去,腳掌陷進雪裡。\n\n「我需要知道——如果有一天我回來,是因為我想回來,不是因為沒地方去。」',
    kittenMascotId: 'kittenCh5',
    npcMascotId: 'npcFamily',
    tint: '#fef0d0',
    accent: '#e7a44a',
  },
  6: {
    id: 6,
    emoji: '',
    titleZh: '寒冬考驗',
    titleEn: 'Winter Trial',
    narration:
      '牠從那扇沒關緊的窗戶溜出來,腳印一個一個,被新雪慢慢蓋掉。\n\n風好冷,世界靜得只剩自己的呼吸。走著走著,牠走進了夢——夢裡走來一個熟悉的身影,是老黑,街頭的老導師,早就不在了的老朋友。\n\n「孩子,你終於為自己做了選擇。」老黑看著牠。「選擇本身,就是長大。」',
    outro: '小貓在雪地上站起來,腳印一個接一個,深深地、堅定地往前。\n\n牠不再只是被照顧的小貓——牠選擇了活下去,選擇了往前走。這一刻,牠長大了。',
    // NOTE: kittenCh6 + ghost-mentor (老黑) SVG not yet drawn — reusing kittenCh4
    // (standing/forward pose) + npcBrutus (老狗導師 fits the ghost mentor vibe) as
    // visual stand-ins. Replace with dedicated mascots in a follow-up.
    kittenMascotId: 'kittenCh4',
    npcMascotId: 'npcBrutus',
    tint: '#dfe7ee',
    accent: '#6a7d8f',
  },
  7: {
    id: 7,
    emoji: '',
    titleZh: '神社的相遇',
    titleEn: 'Shrine Encounter',
    narration:
      '雪一直下,直到牠走進一座山邊的小神社。\n\n奇怪的是,踏進石階的那一刻,雪停了。月光從雲縫裡漏下來,照在朱紅色的鳥居上。\n\n殿前的香爐旁,坐著一個說不出形狀的存在——像霧、像光、像一隻很老很老的貓。\n\n「沒有人是偶然走進你的故事的。」它的聲音很輕。「每一個人,都是你回家路上的一塊石頭。」',
    outro: '她在神社靜靜坐了一夜。第一次,她知道自己屬於哪裡了——\n\n不是哪一個屋簷,而是哪一群人。',
    // NOTE: kittenCh7 + 神社靈 SVG not yet drawn — reusing kittenCh5 (mature
    // posture) + npcGrandma (gentle mystical vibe-adjacent) as visual stand-ins.
    // Replace with dedicated mascots in a follow-up.
    kittenMascotId: 'kittenCh5',
    npcMascotId: 'npcGrandma',
    tint: '#e8e0ee',
    accent: '#8a6ea8',
  },
  8: {
    id: 8,
    emoji: '',
    titleZh: '選擇了家人',
    titleEn: 'I Chose My People',
    narration:
      '天快亮的時候,美美在雪地裡找到了她。\n\n美美的眼睛紅紅的——從 Ch5 那扇沒關緊的窗開始,她和爸媽找了好幾天好幾夜。她把三花輕輕抱起來,沒有責備,只是一直、一直地擁著。\n\n溫熱的浴、軟綿的毛巾、燉得很爛的小魚乾。然後是那張軟軟的小床。她睡著了——這次是真的睡著了,安全得不能再安全。',
    // ── The REAL real ending (v0.9.2). Same warm family, but in the night she
    // hears 布魯托's bark and realises her people are also out there. She doesn't
    // reject 美美 — she chooses BOTH. Walks back to the street family not as
    // victim, but as the one they look to.
    outro:
      '半夜她醒過來。\n\n遠遠的、很遠的地方,風裡傳來一聲熟悉的狗吠——布魯托,還在外面,聲音裡有疲倦。\n\n她想起神社靈說的:「每一個人,都是你回家路上的一塊石頭。」原來布魯托、阿嬤、麵包店老闆,他們也是她的家人,不是只有這扇窗裡的人。\n\n她在美美床邊坐了很久。然後輕輕跳到地上,在新雪上留下一串腳印,通往美美的房門。\n\n美美沒有醒。但在睡夢裡,她伸出手——像是早就知道了——輕輕地、放開。\n\n三花從那扇沒關緊的窗,再一次溜了出去。\n\n這次,不是逃。是去接她的人。\n\n她在街角找到布魯托,瘸著腿,身邊圍著一隻發抖的小奶貓和兩三個街頭的老朋友。布魯托抬起頭,獨眼裡有光。\n\n「我就知道你會回來。」\n\n她沒回話,只是走到他們中間,輕輕用頭蹭了蹭那隻小奶貓。\n\n那一刻她明白了——\n她有過家。她現在,選了家人。\n\n雪又下了起來。但這次,她不再是被風吹著走的小貓。\n她是那群人圍著的、那個中心。',
    // NOTE: kittenCh8 (中年從容領袖貓 + 街頭家族圍繞構圖) SVG not yet drawn —
    // reusing kittenCh5 (mature posture) + npcBrutus (street family stand-in)
    // as visual stand-ins. v0.9.2 ending pivot calls for new "三花 + 街頭家族
    // group composition" mascot art — main Claude will dispatch follow-up.
    kittenMascotId: 'kittenCh5',
    npcMascotId: 'npcBrutus',
    tint: '#dfe7ee',
    accent: '#6a7d8f',
  },
};

export const CHAPTERS_IN_ORDER: ChapterId[] = [1, 2, 3, 4, 5, 6, 7, 8];

// ─── Chapter progress persistence ────────────────────────────────────────────

const LS_CHAPTER_PROGRESS = 'wordwar.story.chapterProgress';
const LS_SRS_QUEUE = 'wordwar.srs.kitten';

export interface ChapterProgress {
  /** Highest chapter the player has completed (0..8). 0 = none. */
  highestCompleted: number;
}

export function readChapterProgress(): ChapterProgress {
  if (typeof localStorage === 'undefined') return { highestCompleted: 0 };
  try {
    const v = localStorage.getItem(LS_CHAPTER_PROGRESS);
    if (!v) return { highestCompleted: 0 };
    const parsed = JSON.parse(v);
    const n = Number(parsed.highestCompleted);
    if (Number.isFinite(n) && n >= 0 && n <= 8) {
      return { highestCompleted: Math.floor(n) };
    }
  } catch {
    // ignore
  }
  return { highestCompleted: 0 };
}

export function markChapterCompleted(chapter: ChapterId): void {
  if (typeof localStorage === 'undefined') return;
  const prev = readChapterProgress();
  const next: ChapterProgress = {
    highestCompleted: Math.max(prev.highestCompleted, chapter),
  };
  try {
    localStorage.setItem(LS_CHAPTER_PROGRESS, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function resetStoryProgress(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(LS_CHAPTER_PROGRESS);
    localStorage.removeItem(LS_SRS_QUEUE);
  } catch {
    // ignore
  }
}

export function isChapterUnlocked(chapter: ChapterId): boolean {
  if (DEV_UNLOCK_ALL) return true;
  if (chapter === 1) return true;
  const { highestCompleted } = readChapterProgress();
  return highestCompleted >= chapter - 1;
}

export function isChapterCompleted(chapter: ChapterId): boolean {
  const { highestCompleted } = readChapterProgress();
  return highestCompleted >= chapter;
}

// ─── SRS queue (simple — array of question IDs answered wrong) ──────────────

export function readSrsQueue(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const v = localStorage.getItem(LS_SRS_QUEUE);
    if (!v) return [];
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === 'string');
    }
  } catch {
    // ignore
  }
  return [];
}

export function writeSrsQueue(ids: string[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    // Dedup, keep order.
    const seen = new Set<string>();
    const out: string[] = [];
    for (const id of ids) {
      if (!seen.has(id)) {
        seen.add(id);
        out.push(id);
      }
    }
    localStorage.setItem(LS_SRS_QUEUE, JSON.stringify(out));
  } catch {
    // ignore
  }
}

export function addToSrs(questionId: string): void {
  const existing = readSrsQueue();
  if (existing.includes(questionId)) return;
  writeSrsQueue([...existing, questionId]);
}

export function removeFromSrs(questionId: string): void {
  const existing = readSrsQueue();
  writeSrsQueue(existing.filter((id) => id !== questionId));
}

export function srsReviewBatch(
  all: StoryQuestion[],
  limit = 3
): StoryQuestion[] {
  const ids = readSrsQueue();
  if (ids.length === 0) return [];
  const byId = new Map(all.map((q) => [q.id, q] as const));
  const out: StoryQuestion[] = [];
  for (const id of ids) {
    const q = byId.get(id);
    if (q) out.push(q);
    if (out.length >= limit) break;
  }
  return out;
}
