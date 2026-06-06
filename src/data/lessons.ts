import { z } from 'zod';
// v2.0.B.148: applyCatName/applyDogName imports retired — loader is passthrough now.

// v2.0: ClozeLevelSchema + DifficultySchema previously lived in
// `./sentences.ts`, but `sentences.ts` now re-exports `QuestionSchema`
// from this module. To break the resulting circular dependency the
// canonical definitions moved here; `./sentences` re-exports them so
// existing import paths keep working.
export const ClozeLevelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export type ClozeLevel = z.infer<typeof ClozeLevelSchema>;

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export type Difficulty = z.infer<typeof DifficultySchema>;

// Shared base fields for all question types
const QuestionBaseFields = {
  id: z.string(),
  level: ClozeLevelSchema,
  difficulty: DifficultySchema.optional(),
  sentence: z.string(),
  question: z.string().optional(),
  explanationZh: z.string(),
  tags: z.array(z.string()).optional(),
  // v2.0.B.25: who's speaking the sentence — dispatches to different TTS
  // voice per speaker. 'narrator' is the default (uses奶奶 voice). Mochi
  // uses a per-gender voice (player-selected). Hana uses a young voice.
  speaker: z.enum(['grandma', 'mochi', 'hana', 'narrator']).optional(),
  // v2.0.C.1: TOEIC-aligned sub-skill tag per question. Used for R6
  // variety balancing per 12-Q lesson (≥3 gist + ≥5 detail + ≥2
  // inference + ≥2 vocab/function). Optional — only L1-L10 of Ch1
  // tagged at introduction; future lessons add as they're written.
  subSkill: z.enum(['gist', 'detail', 'inference', 'vocab', 'function']).optional(),
};

// 4-option multiple choice shape (5 types share this).
// Exported so legacy schemas in `./scenarios` and `./storyKitten` can
// `.extend()` with their own discriminator-free additions (scenario id,
// chapter id, etc) without falling foul of discriminated-union restrictions.
export const FourOptionShape = z.object({
  ...QuestionBaseFields,
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  // v2.0.B.137 bug-check #5: optionsZh was substituted at runtime + read by
  // ClozeUI but never in Zod. The B.124/B.130/B.134 phantom-field cycle keeps
  // repeating because schema is permissive. Locking shape here so future drift
  // is caught by validate-lessons.js.
  optionsZh: z.tuple([z.string(), z.string(), z.string(), z.string()]).optional(),
  correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
});

export const ListenMcSchema = FourOptionShape.extend({
  type: z.literal('listen-mc'),
});
export const ListenEmojiSchema = FourOptionShape.extend({
  type: z.literal('listen-emoji'),
});
export const ListenComprehensionSchema = FourOptionShape.extend({
  type: z.literal('listen-comprehension'),
});
export const ReadMcWithAudioSchema = FourOptionShape.extend({
  type: z.literal('read-mc-with-audio'),
});
export const TypeWhatYouHearSchema = FourOptionShape.extend({
  type: z.literal('type-what-you-hear'),
});

// v2.0.B.197 (Ch1 hook): emoji-pick — 4 emoji 視覺選擇,A2 entry point.
// 用於 Ch1 L1 Q0 開場 hook (3 秒情緒鉤 + 5 秒小勝利)。option string 格式
// "🐟 fish" (emoji + space + EN label),renderer split 後分別大字 / 小字呈現。
export const EmojiPickSchema = FourOptionShape.extend({
  type: z.literal('emoji-pick'),
});

// v2.0.B.232 (TODO content expansion 1/5): picture-mc — 顯示 1 張圖
// (emoji big or img URL), 4 個英文句子選 1 描述。培養「圖 → 語言」翻譯。
// imageEmoji 與 imageUrl 至少要有一個 (cross-field guard in QuestionSchema).
export const PictureMcSchema = FourOptionShape.extend({
  type: z.literal('picture-mc'),
  imageEmoji: z.string().optional(),
  imageUrl: z.string().optional(),
});

// v2.0.B.232 (TODO content expansion 2/5): read-and-tap — 顯示 1 句英文,
// 兒童 tap 某個關鍵字 (e.g. tap the verb)。培養語法意識。
// correctWordIndex 0-indexed against sentence.split(/\s+/).
export const ReadAndTapSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('read-and-tap'),
  sentenceZh: z.string(),
  promptEn: z.enum(['Tap the verb', 'Tap the noun', 'Tap the color word', 'Tap the adjective', 'Tap the animal']),
  correctWordIndex: z.number().int().nonnegative(),
});

// v2.0.B.232 (TODO content expansion 3/5): drag-blank — 拖字到空格,
// 但 iOS Safari fallback tap-to-place (跟招 7 tap-tiles 同邏輯)。
// sentenceTemplate 用 __ 表示 blanks;tiles 是 candidate bank;
// correctTiles 是依序填空答案 (length == sentenceTemplate 的 __ 數量)。
export const DragBlankSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('drag-blank'),
  sentenceTemplate: z.string(),
  sentenceZh: z.string(),
  tiles: z.array(z.string()).min(2).max(12),
  correctTiles: z.array(z.string()).min(1).max(6),
});

// v2.0.B.232 (TODO content expansion 4/5): speak-back — 錄音對齊,
// 需 Web Speech Recognition API。顯示 sentence + 'Say:' + record button,
// 抓 user 唸的字 → 字串比對 → 對 / 錯 / try again。
// iOS Safari speech recognition 支援差, 偵測 → fallback 'tap to skip'。
export const SpeakBackSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('speak-back'),
  sentenceZh: z.string(),
  acceptableVariants: z.array(z.string()).optional(),
});

// v2.0.B.145: Duolingo Stories format — narration chunks + Chinese true/false.
// Narration = story sentence, no answer, just listening + tap-reveal practice.
export const NarrationSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('narration'),
});

// Chinese 對/錯 true-false comprehension. questionZh + optionsZh are Chinese
// (carve-out from feedback-pickup-no-chinese-pre-reveal for this type).
export const ListenTfZhSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('listen-tf-zh'),
  questionZh: z.string(),
  options: z.tuple([z.string(), z.string()]),
  optionsZh: z.tuple([z.string(), z.string()]),
  correctIndex: z.union([z.literal(0), z.literal(1)]),
});

// v2.0.B.147: English-only true/false (replaces listen-tf-zh per user '中文也是
// 永遠不出現'). questionEn visible English; options ["Yes","No"]; no Chinese.
export const ListenTfSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('listen-tf'),
  questionEn: z.string(),
  options: z.tuple([z.string(), z.string()]),
  correctIndex: z.union([z.literal(0), z.literal(1)]),
});

// v2.0.B.237 (TODO content expansion 6/N): listen-build — 純聽音檔 → 沒視覺
// sentence template → tap tiles 完整建構句子. 跟 tap-tiles 差異: tap-tiles
// 視覺顯示 sentence, 跟 drag-blank 差異: drag-blank 含部份 sentence + 空格.
// listen-build = 盲聽 + 自由排列 = 難度最高聽力題, A2 上限.
//
// 為 discriminatedUnion 不能 carry ZodEffects, cross-field guard (correctTiles
// 全在 tiles, distractors >= 1) 寫進下方 QuestionSchema.superRefine().
export const ListenBuildSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('listen-build'),
  level: z.literal('A2'),
  difficulty: DifficultySchema,
  speaker: z.enum(['narrator', 'mochi', 'hana', 'grandma']),
  sentence: z.string(),
  sentenceZh: z.string(),
  tiles: z.array(z.string()).min(2).max(14),
  correctTiles: z.array(z.string()).min(1).max(10),
});

// Variable-length tile bank, no max-4 constraint
// NOTE: .refine() applied to the discriminated union below (z.discriminatedUnion
// requires plain ZodObject members; ZodEffects from .refine() breaks it).
export const TapTilesSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('tap-tiles'),
  tiles: z.array(z.string()).min(3).max(12),
  correctOrder: z.array(z.number().int().nonnegative()).min(2),
});

// Exactly 4 pairs
export const TapPairsSchema = z.object({
  ...QuestionBaseFields,
  type: z.literal('tap-pairs'),
  pairs: z.array(z.object({
    left: z.string(),
    right: z.string(),
  })).length(4),
});

const QuestionUnion = z.discriminatedUnion('type', [
  ListenMcSchema,
  ListenEmojiSchema,
  ListenComprehensionSchema,
  ReadMcWithAudioSchema,
  TypeWhatYouHearSchema,
  TapTilesSchema,
  TapPairsSchema,
  NarrationSchema,
  ListenTfZhSchema,
  ListenTfSchema,
  EmojiPickSchema,
  // v2.0.B.232 new types
  PictureMcSchema,
  ReadAndTapSchema,
  DragBlankSchema,
  SpeakBackSchema,
  // v2.0.B.237 blind listen + 自由排列
  ListenBuildSchema,
]);

// Cross-field guard: tap-tiles correctOrder indices must be < tiles.length.
// Applied on the union (not on TapTilesSchema itself) because
// z.discriminatedUnion requires plain ZodObject members, and .refine()
// produces a ZodEffects that breaks discriminator detection.
export const QuestionSchema = QuestionUnion.superRefine((data, ctx) => {
  if (data.type === 'tap-tiles') {
    if (!data.correctOrder.every((idx) => idx < data.tiles.length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'correctOrder indices must be < tiles.length',
        path: ['correctOrder'],
      });
    }
  }
  // v2.0.B.232 cross-field guards for new question types.
  if (data.type === 'picture-mc') {
    if (!data.imageEmoji && !data.imageUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'picture-mc requires imageEmoji or imageUrl',
        path: ['imageEmoji'],
      });
    }
  }
  if (data.type === 'read-and-tap') {
    const words = data.sentence.split(/\s+/).filter(Boolean);
    if (data.correctWordIndex >= words.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'correctWordIndex must be < sentence word count',
        path: ['correctWordIndex'],
      });
    }
  }
  if (data.type === 'drag-blank') {
    const blanks = (data.sentenceTemplate.match(/__/g) ?? []).length;
    if (blanks !== data.correctTiles.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `sentenceTemplate has ${blanks} blanks but correctTiles has ${data.correctTiles.length}`,
        path: ['correctTiles'],
      });
    }
    if (!data.correctTiles.every((t) => data.tiles.includes(t))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'every correctTile must appear in tiles bank',
        path: ['correctTiles'],
      });
    }
  }
  // v2.0.B.237 listen-build cross-field guards.
  if (data.type === 'listen-build') {
    // correctTiles 全在 tiles bank 內 (允許重複 word, 用 set 不夠 — 用 array
    // .includes per item, 重複 tile 視為 bank 有提供即可).
    if (!data.correctTiles.every((t) => data.tiles.includes(t))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'every correctTile must appear in tiles bank',
        path: ['correctTiles'],
      });
    }
    // distractors >= 1 (推薦 2-3): tiles 長度必須 > correctTiles 長度.
    // Tighten to >= correct + 1 (至少 1 distractor 避免「全填就對」).
    if (data.tiles.length < data.correctTiles.length + 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'tiles bank must contain at least 1 distractor beyond correctTiles',
        path: ['tiles'],
      });
    }
  }
});

export type Question = z.infer<typeof QuestionSchema>;

// ============================================================
// LessonSchema — a Duolingo path button
// ============================================================

export const SegmentTypeSchema = z.enum([
  'outer-prologue',
  'main-story',
  'aesop-side',
  'outer-outro',
  'review',
]);
export type SegmentType = z.infer<typeof SegmentTypeSchema>;

// v2.0.B.204: Ch1 (rainy-night-cat) dropped, Ch2-8 renumbered to Ch1-7.
// Intro (ch0) → Ch1 桃太郎 → ... → Ch7 葉限. Schema keeps 0-7 (was 0-8).
// v2.0.B.234+: Ch8 三隻小豬 (Three Little Pigs) URL pipeline ship 2026-06-06.
// Schema bumped 0-7 → 0-8 to accept ch=8 lessons.
// v2.0.B.236+: Ch9 灰姑娘 (Cinderella, Perrault 1697) URL pipeline ship 2026-06-06.
// Cross-cultural pair with Ch7 葉限 (Tang Cinderella). Schema 0-8 → 0-9.
// v2.0.B.250+: Ch10 嫦娥奔月 + Ch11 后羿射日 (中華神話 cross-POV pair) URL
// pipeline ship 2026-06-07. Same myth from female (Ch10) and male (Ch11)
// POV — pairs with Ch7/Ch9 Cinderella pair as 2nd cross-cultural reading set.
// Schema 0-9 → 0-11 (Ch10 + Ch11 both accepted).
// v2.0.B.260+: Ch14 浦島太郎 (Urashima Taro, Japanese folk PD) URL pipeline
// ship 2026-06-07. Japanese folk pair with Ch1 桃太郎 (兩日本民間, 公有領域).
// Schema 0-11 → 0-14 (Ch12 + Ch13 reserved for future ships — slots stay
// empty until claimed, but schema accepts so a single bump covers them).
// v2.0.B.262+: Ch15 國王的新衣 (Andersen 1837 public domain) URL pipeline
// ship 2026-06-07. 智取主題 (peer pressure + truth), A2 兒童 friendly, 0 風險.
// Schema 0-14 → 0-15.
// v2.0.B.242+: Ch13 小紅帽 (Little Red Riding Hood, Grimm KHM 26 1812 first
// edition, PD) URL pipeline ship 2026-06-07. Theme: 媽媽說別跟陌生人講話 +
// huntsman rescue (3rd 兒童安全教育 trio with Ch1 桃太郎 + Ch6 Baba Yaga).
// NO Perrault 1697 / Disney / Hoodwinked / Sondheim / Dahl elements. Slot
// was reserved by B.260 Ch14 ship, now claimed by URL pipeline.
export const ChapterIdSchema = z.union([
  z.literal(0),
  z.literal(1), z.literal(2), z.literal(3),
  z.literal(4), z.literal(5), z.literal(6), z.literal(7),
  z.literal(8), z.literal(9), z.literal(10), z.literal(11),
  z.literal(12), z.literal(13), z.literal(14), z.literal(15),
]);
export type ChapterId = z.infer<typeof ChapterIdSchema>;

// v2.0.C.2: lesson-level intro overlay (前情提要). User reported B.132
// paraphrase rule R1 left some Qs answerable only with prior context.
// Intro shown on LessonScene mount, before Q1. EN + ZH side-by-side card,
// user dismisses with 'Begin'. Optional — lessons without intro skip overlay.
export const LessonIntroSchema = z.object({
  en: z.string(),
  zh: z.string(),
});
export type LessonIntro = z.infer<typeof LessonIntroSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  chapter: ChapterIdSchema,
  lessonInChapter: z.number().int().min(1).max(25),
  segmentType: SegmentTypeSchema,
  storyId: z.string().optional(),
  storyBeat: z.string().optional(),
  intro: LessonIntroSchema.optional(),
  // v2.0.B.198: max bumped 15→20 to allow Ch1 opening Mochi self-intro
  // (n00 + n01 before Q0 + n1 existing arc). headroom for future hooks.
  questions: z.array(QuestionSchema).min(3).max(20),
});

export const LessonsSchema = z.array(LessonSchema);

export type Lesson = z.infer<typeof LessonSchema>;

// ============================================================
// Loader — fetch /lessons-ch{N}.json, parse, inject {catName}.
// Pattern follows src/data/storyKitten.ts:loadStoryQuestions() (v1.9.52).
// Cache key is chapter id (not URL) to keep memory bounded.
// ============================================================

const cache = new Map<ChapterId, Lesson[]>();

export async function loadChapterLessons(ch: ChapterId): Promise<Lesson[]> {
  const cached = cache.get(ch);
  if (cached) return cached;

  const res = await fetch(`/lessons-ch${ch}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch lessons-ch${ch}.json: ${res.status}`);
  }
  const raw = await res.json();
  const parsed = LessonsSchema.parse(raw);

  // v1.9.52 pattern: inject player catName at load time
  // v2.0.B.124: ALSO substitute in `question` field + `options[]` array.
  // Bug: B.121/B.123 agent rewrites introduced {catName}/{dogName} placeholders
  // into question prompts (e.g. "What kind of cat is {catName}?"). The original
  // loader only substituted sentence + explanationZh — question + options leaked
  // raw tokens to the UI. User report: "題目跟問題中間好像夾雜奇怪的 cat name".
  // Fix: cover EVERY user-visible string field on the Question.
  // v2.0.B.148: placeholder system retired per user '不要給他們自訂 就固定叫
  // mochi'. All {catName}/{dogName} now hardcoded 'Mochi'/'Hana' literal in
  // JSON (sed-replaced across 8 lessons-ch*.json). Loader is pure passthrough.
  // applyCatName/applyDogName functions kept in src/data/{cat,dog}Name.ts for
  // back-compat with non-lesson modules (Profile / mascot wiring) but no
  // longer called here. Resolves B.124 → B.130 → B.134 phantom-field cycle
  // structurally — no more loader/schema sync drift.
  const injected = parsed as Lesson[];

  cache.set(ch, injected);
  return injected;
}

export function lessonsBySegment(
  lessons: Lesson[],
  segmentType: SegmentType
): Lesson[] {
  return lessons.filter((l) => l.segmentType === segmentType);
}

export function findLesson(lessons: Lesson[], lessonId: string): Lesson | undefined {
  return lessons.find((l) => l.id === lessonId);
}

/**
 * Test-only: clear the per-chapter cache so unit tests can
 * exercise loadChapterLessons() fresh in each `it()` block.
 * Not for production use.
 */
export function _clearLessonCacheForTests(): void {
  cache.clear();
}
