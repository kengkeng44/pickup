import { z } from 'zod';

/**
 * Cloze (fill-in-the-blank) question schema.
 *
 * sentences.json is an array of these. The blank is rendered as ___ in
 * the source string; the UI replaces it with a visual gap.
 */
export const ClozeLevelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

export const ClozeQuestionSchema = z.object({
  id: z.string(),
  level: ClozeLevelSchema,
  sentence: z.string(),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  explanationZh: z.string(),
  tags: z.array(z.string()).optional(),
});

export const ClozeQuestionsSchema = z.array(ClozeQuestionSchema);

export type ClozeLevel = z.infer<typeof ClozeLevelSchema>;
export type ClozeQuestion = z.infer<typeof ClozeQuestionSchema>;

let cached: ClozeQuestion[] | null = null;

/**
 * Loads + validates /sentences.json. Caches result.
 */
export async function loadSentences(): Promise<ClozeQuestion[]> {
  if (cached) return cached;
  const res = await fetch('/sentences.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch sentences.json: ${res.status}`);
  }
  const raw = await res.json();
  const parsed = ClozeQuestionsSchema.parse(raw);
  cached = parsed;
  return parsed;
}

/** Filter by level, then shuffle a copy. */
export function pickByLevel(
  all: ClozeQuestion[],
  level: ClozeLevel,
  limit?: number
): ClozeQuestion[] {
  const filtered = all.filter((q) => q.level === level);
  const shuffled = shuffle(filtered);
  return typeof limit === 'number' ? shuffled.slice(0, limit) : shuffled;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
