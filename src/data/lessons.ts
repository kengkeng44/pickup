import { z } from 'zod';
import { applyCatName } from './catName';
import { applyDogName } from './dogName';

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

export const ChapterIdSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4),
  z.literal(5), z.literal(6), z.literal(7), z.literal(8),
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
  questions: z.array(QuestionSchema).min(3).max(15),
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
  const inj = (s: string | undefined): string | undefined =>
    s === undefined ? s : applyDogName(applyCatName(s));
  const injected = parsed.map((l) => ({
    ...l,
    storyBeat: l.storyBeat ? applyDogName(applyCatName(l.storyBeat)) : l.storyBeat,
    // v2.0.B.134: intro field also needs placeholder substitution.
    // Bug: B.133 added intro field but loader never ran applyCatName on it,
    // so '{catName} is a stray cat' shipped to UI as raw token. User screenshot
    // showed the leak.
    intro: l.intro ? {
      en: applyDogName(applyCatName(l.intro.en)),
      zh: applyDogName(applyCatName(l.intro.zh)),
    } : l.intro,
    questions: l.questions.map((q) => ({
      ...q,
      sentence: applyDogName(applyCatName(q.sentence)),
      question: (q as any).question ? inj((q as any).question) : (q as any).question,
      options: Array.isArray((q as any).options)
        ? (q as any).options.map((o: string) => applyDogName(applyCatName(o)))
        : (q as any).options,
      // v2.0.B.130: optionsZh added by QA agent — bilingual button labels.
      // Substitute {catName}/{dogName} so '我家的{catName}' gets rendered with real name.
      optionsZh: Array.isArray((q as any).optionsZh)
        ? (q as any).optionsZh.map((o: string) => applyDogName(applyCatName(o)))
        : (q as any).optionsZh,
      explanationZh: applyDogName(applyCatName(q.explanationZh)),
    })),
  })) as Lesson[];

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
