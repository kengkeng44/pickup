import { z } from 'zod';

import { ClozeLevelSchema, DifficultySchema } from './sentences';

// Shared base fields for all question types
const QuestionBaseFields = {
  id: z.string(),
  level: ClozeLevelSchema,
  difficulty: DifficultySchema.optional(),
  sentence: z.string(),
  question: z.string().optional(),
  explanationZh: z.string(),
  tags: z.array(z.string()).optional(),
};

// 4-option multiple choice shape (5 types share this)
const FourOptionShape = z.object({
  ...QuestionBaseFields,
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
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

export const QuestionSchema = z.discriminatedUnion('type', [
  ListenMcSchema,
  ListenEmojiSchema,
  ListenComprehensionSchema,
  ReadMcWithAudioSchema,
  TypeWhatYouHearSchema,
  TapTilesSchema,
  TapPairsSchema,
]);

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

export const LessonSchema = z.object({
  id: z.string(),
  chapter: ChapterIdSchema,
  lessonInChapter: z.number().int().min(1).max(24),
  segmentType: SegmentTypeSchema,
  storyId: z.string().optional(),
  storyBeat: z.string().optional(),
  questions: z.array(QuestionSchema).min(3).max(15),
});

export const LessonsSchema = z.array(LessonSchema);

export type Lesson = z.infer<typeof LessonSchema>;
