import { z } from 'zod';

/**
 * Cloze (fill-in-the-blank) question schema.
 *
 * sentences.json is an array of these. The blank is rendered as ___ in
 * the source string; the UI replaces it with a visual gap.
 *
 * v2.0: ClozeLevelSchema + DifficultySchema canonical definitions moved
 * to `./lessons.ts` to break a circular dependency. Re-exported here so
 * existing import paths (`from './sentences'`) keep working unchanged.
 */
export {
  ClozeLevelSchema,
  DifficultySchema,
  type ClozeLevel,
  type Difficulty,
} from './lessons';
import type { ClozeLevel, Difficulty } from './lessons';

// v2.0: ClozeQuestionSchema now aliases the new discriminated union.
// Free-practice and scenario modes can still use the loose 4-option types.
// tap-tiles / tap-pairs are admissible but free-practice UI only handles 4-option types.
//
// Legacy JSON data (public/sentences.json + public/scenarios.json) was written
// without an explicit `type` field — under v1.x ClozeQuestionSchema it was
// `type: ...optional()` and defaulted to `'listen-mc'` at the UI layer. The
// new discriminated union REQUIRES `type` as the discriminator, so we
// preprocess incoming data here: if `type` is missing on an array entry, we
// stamp it as `'listen-mc'` before discriminated-union parsing runs.
//
// TypeScript note: `ClozeQuestion` (the type) is a structurally permissive
// shape with all type-specific payload fields marked optional. We can't
// alias it to the new discriminated `Question` union because v1.x code in
// PlayScene / ClozeUI / runStore reads both 4-option fields (options /
// correctIndex) and tap-tiles / tap-pairs fields (tiles / correctOrder /
// pairs) off the same `round` object based on a runtime `.type` check —
// the discriminated union would narrow on access and break those reads.
// Runtime validation still goes through the strict `ClozeQuestionSchema`.
import { QuestionSchema, type Question } from './lessons';

export { QuestionSchema as ClozeQuestionSchema } from './lessons';

/**
 * Backwards-compatible `ClozeQuestion` type. v1.x callsites in PlayScene /
 * ClozeUI / runStore read both 4-option fields (`options`/`correctIndex`)
 * and tap-tiles / tap-pairs fields (`tiles`/`correctOrder`/`pairs`) off
 * the same `round` object based on a runtime `type` check. The new
 * discriminated `Question` union narrows on access, which would break
 * those callsites — so we expose a structurally permissive shape here
 * (all type-specific payload fields optional). Runtime validation still
 * goes through the strict discriminated `ClozeQuestionSchema`.
 */
export type ClozeQuestion = {
  id: string;
  level: ClozeLevel;
  difficulty?: 'easy' | 'medium' | 'hard';
  sentence: string;
  explanationZh: string;
  tags?: string[];
  type?: Question['type'];
  question?: string;
  // 4-option fields (listen-mc / listen-emoji / listen-comprehension /
  // read-mc-with-audio / type-what-you-hear).
  // Required on the type for backwards-compat with v1.x callsites that
  // read `.options` / `.correctIndex` without a null check. Tap-tiles /
  // tap-pairs entries omit these at runtime, which is unsafe but matches
  // v1.x behavior — guard at the `.type` discriminator level in callers.
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  // tap-tiles fields
  tiles?: string[];
  correctOrder?: number[];
  // tap-pairs fields
  pairs?: { left: string; right: string }[];
};

/**
 * Array schema for cloze pools. Preprocesses each entry to default
 * `type: 'listen-mc'` when absent — keeps existing JSON content
 * compatible with the new discriminated union without a data migration.
 *
 * Note: parsed result is the broader `Question[]`; callers that want the
 * narrower `ClozeQuestion[]` cast (free-practice / scenario data is
 * authored without tap-tiles / tap-pairs by convention).
 */
export const ClozeQuestionsSchema = z.preprocess(
  (val) => {
    if (!Array.isArray(val)) return val;
    return val.map((entry) => {
      if (entry && typeof entry === 'object' && !('type' in entry)) {
        return { ...entry, type: 'listen-mc' };
      }
      return entry;
    });
  },
  z.array(QuestionSchema),
);

/** Difficulty of a question — defaults to 'medium' if not tagged. */
export function difficultyOf(q: { difficulty?: Difficulty }): Difficulty {
  return q.difficulty ?? 'medium';
}

/**
 * Filter cloze pool by difficulty with a graceful fallback. If the
 * requested tier has zero questions, walks outward to adjacent tiers
 * (easy↔medium↔hard) rather than failing — the player never sees an
 * empty round.
 *
 * Returns a NEW array (not a mutation of input).
 *
 * Generic constraint loosened in v2.0 from `T extends ClozeQuestion` to
 * `T extends { difficulty?: Difficulty }` so story + scenario question
 * shapes (which have different required fields) can pass through without
 * structural-typing complaints.
 */
export function filterByDifficulty<T extends { difficulty?: Difficulty }>(
  pool: T[],
  difficulty: Difficulty
): T[] {
  const exact = pool.filter((q) => difficultyOf(q) === difficulty);
  if (exact.length > 0) return exact;

  // Fallback chain — adjacent tiers first, then the remaining one.
  const fallback: Difficulty[] =
    difficulty === 'easy'
      ? ['medium', 'hard']
      : difficulty === 'hard'
        ? ['medium', 'easy']
        : ['easy', 'hard']; // medium → either side
  for (const tier of fallback) {
    const next = pool.filter((q) => difficultyOf(q) === tier);
    if (next.length > 0) return next;
  }
  return pool; // last resort: everything
}

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
  // v2.0: ClozeQuestionsSchema accepts the broad `Question` union; we
  // narrow to the 4-option subset because /sentences.json is authored as
  // plain MC questions (no tap-tiles / tap-pairs). Cast through unknown
  // because the discriminated-union narrowing isn't expressible at the
  // .parse() boundary.
  const parsed = ClozeQuestionsSchema.parse(raw) as unknown as ClozeQuestion[];
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
