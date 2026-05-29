# Pickup v2.0 Phase A+B — Schema + UI Scaffolding + Ch1 Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Ch1 v2.0 prototype to production with Duolingo-nested model (24 lessons × ~5 Q each) — proves the new architecture end-to-end before investing in Ch2-8 content.

**Architecture:** Refactor `ClozeQuestionSchema` to Zod `discriminatedUnion` (fixes kt-ch1-06 root cause as byproduct). Introduce `LessonSchema` with nested `questions[]`. Fork `PlayScene` → `LessonScene` scoped to single lesson. Extend `StoryMapView` to 24-button winding path per chapter. Migrate existing Ch1 8 Q into 24-lesson structure, expand with main story arc + 2 Aesop side tales + outer scene wrappers.

**Tech Stack:** TypeScript 6, Vite 8, Phaser 3.90, Zod 3.25, Zustand 4.5, Wrangler 4.94 (Cloudflare Pages). New: Vitest for unit tests.

---

## File Structure

### Create
- `src/data/lessons.ts` — `LessonSchema`, `loadChapterLessons()`, types
- `src/scenes/LessonScene.ts` — fork of `PlayScene`, scope to 1 lesson
- `public/lessons-ch1.json` — Ch1 v2.0 content (24 lessons)
- `tools/validate-lessons.js` — build-time CI guard
- `vitest.config.ts` — Vitest config
- `tests/data/lessons.test.ts` — schema tests
- `tests/data/loader.test.ts` — loader tests
- `tests/data/lessons-ch1-validate.test.ts` — Ch1 content schema validation

### Modify
- `package.json` — add Vitest devDep + test script
- `src/data/sentences.ts` — `ClozeQuestionSchema` → `discriminatedUnion`
- `src/store/runStore.ts` — add `currentLessonId`, per-lesson progress
- `src/ui/StoryMapView.ts` — 24-button rendering, click → push LessonScene
- `src/main.ts` — register `LessonScene`
- `CLAUDE.md` — update Section "主打故事" + Code Structure
- `src/data/storyKitten.ts` — deprecate or delete after migration (keep file for now, add deprecation header)

### Retire (don't delete, just unwire)
- `src/scenes/PlayScene.ts` — keep code, unwire from chapter map (still used by free-practice + scenario modes)
- `src/scenes/ChapterEndScene.ts` / `ChapterIntroScene.ts` / `StoryEndingScene.ts` — keep for now, refactor in Phase D

### Archive
- `public/story-kitten.json` → after migration, move to `public/legacy/story-kitten-v1.9.json`

---

## Task 1: Set up Vitest test framework

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/sanity.test.ts`

- [ ] **Step 1: Install Vitest**

Run:
```bash
cd C:/Users/acer/Desktop/wordwar && npm install --save-dev vitest @vitest/ui
```

Expected: `added N packages` and `vitest` appears in `package.json` devDependencies.

- [ ] **Step 2: Add test script to package.json**

Modify `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Create vitest.config.ts**

Create file:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    globals: false,
  },
});
```

- [ ] **Step 4: Write sanity test**

Create `tests/sanity.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

describe('vitest sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run test**

Run: `npm test`
Expected: `1 passed`, exit code 0.

- [ ] **Step 6: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add package.json package-lock.json vitest.config.ts tests/sanity.test.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.1: add Vitest test framework"
```

---

## Task 2: Write failing test for new `QuestionSchema` discriminated union

**Files:**
- Create: `tests/data/lessons.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/data/lessons.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { QuestionSchema } from '../../src/data/lessons';

describe('QuestionSchema (discriminated union)', () => {
  it('accepts valid listen-mc with 4 options', () => {
    const valid = {
      type: 'listen-mc',
      id: 'test-mc-1',
      level: 'A2',
      difficulty: 'easy',
      sentence: 'The cat is here.',
      question: 'Which word?',
      options: ['cat', 'dog', 'fish', 'bird'],
      correctIndex: 0,
      explanationZh: 'cat = 貓',
      tags: ['test'],
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts tap-tiles with 5+ tiles (no max-4 lie)', () => {
    const valid = {
      type: 'tap-tiles',
      id: 'test-tap-1',
      level: 'A2',
      sentence: 'She came back every night.',
      question: 'Tap what you hear',
      tiles: ['She', 'came', 'back', 'every', 'night', 'always', 'house'],
      correctOrder: [0, 1, 2, 3, 4],
      explanationZh: 'past tense of come',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts tap-pairs with exactly 4 pairs', () => {
    const valid = {
      type: 'tap-pairs',
      id: 'test-pair-1',
      level: 'A2',
      sentence: 'tonight words',
      question: 'Tap pairs',
      pairs: [
        { left: 'cat', right: '貓' },
        { left: 'dog', right: '狗' },
        { left: 'fish', right: '魚' },
        { left: 'bird', right: '鳥' },
      ],
      explanationZh: 'animals',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects listen-mc with 5 options (regression: kt-ch1-06 bug)', () => {
    const invalid = {
      type: 'listen-mc',
      id: 'bad-mc',
      level: 'A2',
      sentence: 'too many',
      options: ['a', 'b', 'c', 'd', 'e'],  // 5 — should fail
      correctIndex: 0,
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects unknown type', () => {
    const invalid = {
      type: 'mystery-type',
      id: 'x',
      level: 'A2',
      sentence: 's',
      explanationZh: 'e',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/data/lessons.test.ts`
Expected: FAIL with `Cannot find module '../../src/data/lessons'` (file doesn't exist yet).

- [ ] **Step 3: No commit yet** — failing test will pass after Task 3.

---

## Task 3: Implement `QuestionSchema` + `LessonSchema` in `src/data/lessons.ts`

**Files:**
- Create: `src/data/lessons.ts`

- [ ] **Step 1: Write the implementation**

Create `src/data/lessons.ts`:
```typescript
import { z } from 'zod';

// Reuse level / difficulty enums from sentences.ts
import { ClozeLevelSchema, DifficultySchema } from './sentences';

/**
 * v2.0 Question — discriminated union by `type`.
 * Replaces v1.x ClozeQuestionSchema which had options: z.tuple([4])
 * applied uniformly, breaking tap-tiles with >4 word sentences.
 */

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

// 4-option multiple choice (listen-mc, listen-emoji, listen-comprehension,
// read-mc-with-audio, type-what-you-hear all share this shape)
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

// Exactly 4 pairs (matches existing UI)
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
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npm test -- tests/data/lessons.test.ts`
Expected: `5 passed`, exit 0.

- [ ] **Step 3: Run typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/data/lessons.ts tests/data/lessons.test.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.2: LessonSchema + Question discriminated union" -m "Replaces ClozeQuestionSchema's uniform options:tuple([4]) which broke tap-tiles. Each question type now has its own shape via discriminated union. Fixes root cause of kt-ch1-06 production bug."
```

---

## Task 4: Refactor existing `ClozeQuestionSchema` to use new discriminated union internally

**Files:**
- Modify: `src/data/sentences.ts`
- Test: existing schema usage in `src/data/scenarios.ts`, `src/data/storyKitten.ts`

- [ ] **Step 1: Read current sentences.ts schema usage**

Read `src/data/sentences.ts:23-54`. Confirm `ClozeQuestionSchema` is z.object with `options: z.tuple([4])`.

- [ ] **Step 2: Modify ClozeQuestionSchema to be alias of v2 QuestionSchema**

In `src/data/sentences.ts`, replace the `ClozeQuestionSchema = z.object(...)` block (lines 23-54) with:
```typescript
// v2.0: ClozeQuestionSchema now aliases the new discriminated union.
// Free-practice and scenario modes can still use the loose 4-option types.
// tap-tiles / tap-pairs are admissible but free-practice UI only handles 4-option types.
export { QuestionSchema as ClozeQuestionSchema } from './lessons';
export type ClozeQuestion = import('./lessons').Question;
```

Keep `ClozeLevelSchema`, `DifficultySchema`, `difficultyOf()`, `filterByDifficulty()` exports unchanged.

- [ ] **Step 3: Run typecheck**

Run: `npx tsc --noEmit`
Expected: errors in files that imported `ClozeQuestionSchema`, narrow to confirm callsites still work — they should because alias is identical shape.

- [ ] **Step 4: Run existing tests if any pass**

Run: `npm test`
Expected: `6 passed` (sanity + 5 lesson tests).

- [ ] **Step 5: Run dev server smoke test**

Run: `npm run dev` (background, kill after 10 sec). Navigate to localhost:5173 in browser. Click free-practice mode. Answer 1 cloze question.
Expected: cloze loads, question renders, answer accepted.

If smoke fails: revert sentences.ts change and re-examine schema compatibility. The discriminated union may reject existing JSON if `type` field is missing in old data — handle by adding `.default('listen-mc')` on the type field via a transform, OR add `type: 'listen-mc'` to all old sentences.json entries.

- [ ] **Step 6: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/data/sentences.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.3: alias ClozeQuestionSchema to new discriminated QuestionSchema" -m "Single source of truth for question schemas. Free-practice / scenario / story modes all share the same union type."
```

---

## Task 5: Implement `loadChapterLessons()` loader

**Files:**
- Modify: `src/data/lessons.ts`
- Create: `tests/data/loader.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/data/loader.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadChapterLessons } from '../../src/data/lessons';

describe('loadChapterLessons', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('fetches and parses chapter 1 lessons', async () => {
    const sampleLesson = {
      id: 'kt-ch1-l1',
      chapter: 1,
      lessonInChapter: 1,
      segmentType: 'outer-prologue',
      storyBeat: 'Mochi 跳上矮牆',
      questions: [{
        type: 'listen-mc',
        id: 'q1',
        level: 'A2',
        sentence: 'I jump on the wall.',
        options: ['jump', 'walk', 'run', 'sit'],
        correctIndex: 0,
        explanationZh: 'jump = 跳',
      }, {
        type: 'listen-mc',
        id: 'q2',
        level: 'A2',
        sentence: 'The wall is low.',
        options: ['low', 'high', 'long', 'soft'],
        correctIndex: 0,
        explanationZh: 'low = 矮',
      }, {
        type: 'listen-mc',
        id: 'q3',
        level: 'A2',
        sentence: 'I see the yard.',
        options: ['yard', 'park', 'road', 'house'],
        correctIndex: 0,
        explanationZh: 'yard = 院子',
      }],
    };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [sampleLesson],
    });

    const lessons = await loadChapterLessons(1);
    expect(lessons).toHaveLength(1);
    expect(lessons[0].id).toBe('kt-ch1-l1');
    expect(lessons[0].questions).toHaveLength(3);
  });

  it('injects player cat name into sentences', async () => {
    const sampleLesson = {
      id: 'kt-ch1-l1',
      chapter: 1,
      lessonInChapter: 1,
      segmentType: 'outer-prologue',
      questions: [{
        type: 'listen-mc',
        id: 'q1',
        level: 'A2',
        sentence: 'I am {catName}.',
        options: ['cat', 'dog', 'fish', 'bird'],
        correctIndex: 0,
        explanationZh: 'I am {catName}.',
      }, {
        type: 'listen-mc',
        id: 'q2',
        level: 'A2',
        sentence: 'placeholder',
        options: ['a', 'b', 'c', 'd'],
        correctIndex: 0,
        explanationZh: 'p',
      }, {
        type: 'listen-mc',
        id: 'q3',
        level: 'A2',
        sentence: 'placeholder',
        options: ['a', 'b', 'c', 'd'],
        correctIndex: 0,
        explanationZh: 'p',
      }],
    };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [sampleLesson],
    });
    (localStorage.getItem as any).mockReturnValue('Mochi');

    const lessons = await loadChapterLessons(1);
    expect(lessons[0].questions[0].sentence).toBe('I am Mochi.');
    expect(lessons[0].questions[0].explanationZh).toBe('I am Mochi.');
  });

  it('throws on fetch failure', async () => {
    (fetch as any).mockResolvedValue({ ok: false, status: 404 });
    await expect(loadChapterLessons(1)).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/data/loader.test.ts`
Expected: FAIL with `loadChapterLessons is not a function`.

- [ ] **Step 3: Implement loader**

Append to `src/data/lessons.ts`:
```typescript
import { applyCatName } from './catName';

// Per-chapter cache. Cleared on cat name change (handled by re-mount).
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

  // Apply cat name injection (same pattern as v1.9.52 storyKitten loader)
  const injected = parsed.map((l) => ({
    ...l,
    storyBeat: l.storyBeat ? applyCatName(l.storyBeat) : l.storyBeat,
    questions: l.questions.map((q) => ({
      ...q,
      sentence: applyCatName(q.sentence),
      explanationZh: applyCatName(q.explanationZh),
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/data/loader.test.ts`
Expected: `3 passed`.

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/data/lessons.ts tests/data/loader.test.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.4: loadChapterLessons + lesson helpers" -m "Per-chapter cache, fetches /lessons-ch{N}.json, validates via Zod, applies catName placeholder injection. lessonsBySegment + findLesson helpers for downstream consumers."
```

---

## Task 6: Implement `validate-lessons.js` CI guard

**Files:**
- Create: `tools/validate-lessons.js`
- Modify: `package.json` (add `validate` script, wire into `build`)

- [ ] **Step 1: Write validate-lessons.js**

Create `tools/validate-lessons.js`:
```javascript
#!/usr/bin/env node
/**
 * Build-time validation: parse all public/lessons-ch*.json files against
 * the runtime Zod schema. Catches schema-data mismatches before deploy.
 *
 * Root cause prevention: kt-ch1-06 bug (5-element options array vs
 * tuple([4])) shipped in v1.9.50 because no build-time validation
 * existed. Production users hit it 7 commits later.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Stub localStorage / fetch / browser globals for Node import
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const publicDir = resolve(repoRoot, 'public');

// Dynamic import after globals stubbed
const { LessonsSchema } = await import(resolve(repoRoot, 'src/data/lessons.ts'));

const files = readdirSync(publicDir).filter(
  (f) => /^lessons-ch\d+\.json$/.test(f)
);

if (files.length === 0) {
  console.log('No lessons-ch*.json files found. Skipping validation.');
  process.exit(0);
}

let allOk = true;
for (const file of files) {
  const path = resolve(publicDir, file);
  const raw = JSON.parse(readFileSync(path, 'utf-8'));
  const result = LessonsSchema.safeParse(raw);
  if (result.success) {
    console.log(`OK ${file}: ${raw.length} lessons`);
  } else {
    allOk = false;
    console.error(`FAIL ${file}:`);
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
  }
}

process.exit(allOk ? 0 : 1);
```

- [ ] **Step 2: Add validate script + wire into build**

Modify `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "npm run validate && tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "validate": "node tools/validate-lessons.js"
}
```

Note: the `npm run validate &&` prefix to `build` ensures schema is checked before tsc + vite. If validate fails, build aborts before any artifact is produced.

- [ ] **Step 3: Test validate with no files yet**

Run: `npm run validate`
Expected: "No lessons-ch*.json files found. Skipping validation." exit 0.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add tools/validate-lessons.js package.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.5: validate-lessons.js build-time CI guard" -m "Catches schema-data mismatches before deploy (prevents v1.9.50-style bugs). Wired into npm run build as pre-step. Stubs localStorage for Node import."
```

---

## Task 7: Extend `runStore` with per-lesson progress

**Files:**
- Modify: `src/store/runStore.ts`

- [ ] **Step 1: Read current runStore.ts to understand existing shape**

Run: `head -80 src/store/runStore.ts`

Locate the Zustand store creation pattern.

- [ ] **Step 2: Add lesson progress to store**

Append/integrate into `src/store/runStore.ts` (after existing chapter progress logic):
```typescript
// v2.0 — per-lesson progress within chapter
// Key: pickup.chapter.{N}.lessons.completed = Set<lessonId> as JSON array

const LS_LESSON_PROGRESS = (ch: number) =>
  `pickup.chapter.${ch}.lessons.completed`;

export function readCompletedLessons(chapter: number): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LS_LESSON_PROGRESS(chapter));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function markLessonCompleted(chapter: number, lessonId: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const current = readCompletedLessons(chapter);
    current.add(lessonId);
    localStorage.setItem(
      LS_LESSON_PROGRESS(chapter),
      JSON.stringify([...current])
    );
  } catch {
    // localStorage write failure — boot.ts shows red banner per v1.9.48
  }
}

export function isLessonUnlocked(
  chapter: number,
  lessonInChapter: number,
  totalCompleted: number
): boolean {
  // Lesson N unlocks when lesson N-1 is completed.
  // Lesson 1 always unlocked if chapter is unlocked.
  if (lessonInChapter === 1) return true;
  return totalCompleted >= lessonInChapter - 1;
}
```

- [ ] **Step 3: Write test**

Create `tests/store/lesson-progress.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  readCompletedLessons,
  markLessonCompleted,
  isLessonUnlocked,
} from '../../src/store/runStore';

describe('lesson progress', () => {
  let storage: Record<string, string>;
  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
      removeItem: (k: string) => { delete storage[k]; },
    });
  });

  it('readCompletedLessons returns empty set initially', () => {
    expect(readCompletedLessons(1).size).toBe(0);
  });

  it('markLessonCompleted persists across reads', () => {
    markLessonCompleted(1, 'kt-ch1-l3');
    const s = readCompletedLessons(1);
    expect(s.has('kt-ch1-l3')).toBe(true);
    expect(s.size).toBe(1);
  });

  it('isLessonUnlocked: lesson 1 always unlocked', () => {
    expect(isLessonUnlocked(1, 1, 0)).toBe(true);
  });

  it('isLessonUnlocked: lesson N unlocks after N-1 completed', () => {
    expect(isLessonUnlocked(1, 5, 4)).toBe(true);
    expect(isLessonUnlocked(1, 5, 3)).toBe(false);
  });
});
```

- [ ] **Step 4: Run test**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/store/runStore.ts tests/store/lesson-progress.test.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.6: per-lesson progress in runStore" -m "readCompletedLessons / markLessonCompleted / isLessonUnlocked. Stored per-chapter in localStorage as JSON array of lesson IDs."
```

---

## Task 8: Fork `PlayScene` → `LessonScene` scoped to single lesson

**Files:**
- Create: `src/scenes/LessonScene.ts`
- Modify: `src/main.ts` (register scene)

- [ ] **Step 1: Read PlayScene.ts to understand existing structure**

Run: `head -60 src/scenes/PlayScene.ts && echo ... && tail -40 src/scenes/PlayScene.ts`

Identify:
- How Phaser scene is initialized
- How questions are loaded and sequenced
- How ClozeUI is wired
- How completion routes back to map

- [ ] **Step 2: Create LessonScene.ts as adapted fork**

Create `src/scenes/LessonScene.ts`:
```typescript
import Phaser from 'phaser';
import { ClozeUI } from '../ui/ClozeUI';
import {
  type Lesson,
  type Question,
  loadChapterLessons,
  findLesson,
} from '../data/lessons';
import { markLessonCompleted } from '../store/runStore';

export type LessonSceneData = {
  chapter: number;
  lessonId: string;
};

export class LessonScene extends Phaser.Scene {
  static KEY = 'LessonScene';

  private lesson!: Lesson;
  private questionIdx = 0;
  private clozeUI?: ClozeUI;
  private chapter!: number;

  constructor() {
    super({ key: LessonScene.KEY });
  }

  async init(data: LessonSceneData) {
    this.chapter = data.chapter;
    const lessons = await loadChapterLessons(data.chapter as 1);
    const found = findLesson(lessons, data.lessonId);
    if (!found) {
      console.error(`Lesson ${data.lessonId} not found in chapter ${data.chapter}`);
      this.scene.start('StoryModeScene');
      return;
    }
    this.lesson = found;
  }

  create() {
    if (!this.lesson) return;
    this.renderQuestion(this.lesson.questions[0]);
  }

  private renderQuestion(q: Question) {
    this.clozeUI?.destroy();
    this.clozeUI = new ClozeUI(this, q as any, {
      onCorrect: () => this.advance(),
      onWrong: () => {
        // blindRetry: stay on same Q, ClozeUI handles inline feedback
      },
    });
  }

  private advance() {
    this.questionIdx += 1;
    if (this.questionIdx >= this.lesson.questions.length) {
      this.finish();
      return;
    }
    this.renderQuestion(this.lesson.questions[this.questionIdx]);
  }

  private finish() {
    markLessonCompleted(this.chapter, this.lesson.id);
    this.clozeUI?.destroy();
    // Return to map. StoryMapView will re-render with this lesson marked complete.
    this.scene.start('StoryModeScene');
  }
}
```

Note: `ClozeUI` may need updates to handle the discriminated union question shape — for v2.0.A.X, we type-cast (`q as any`) and rely on existing ClozeUI behavior. Full ClozeUI refactor to use discriminated types is deferred to a later cleanup task (track as v2.0 follow-up).

- [ ] **Step 3: Register scene in main.ts**

Find existing scene registration in `src/main.ts` (look for `scene:` array in Phaser config). Append:
```typescript
import { LessonScene } from './scenes/LessonScene';
// ... in config:
scene: [
  // existing scenes ...
  LessonScene,
],
```

- [ ] **Step 4: Run typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (or only the documented `q as any` cast warning).

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/scenes/LessonScene.ts src/main.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.7: LessonScene scoped to single lesson" -m "Forked from PlayScene. Runs questions sequentially within one lesson, then markLessonCompleted + returns to StoryMapView. ClozeUI cast to any pending v2 type wiring."
```

---

## Task 9: Extend `StoryMapView` to 24-button v2 path with feature flag

**Files:**
- Modify: `src/ui/StoryMapView.ts`

- [ ] **Step 1: Read NODE_PATH section of StoryMapView.ts**

Run: `grep -n "NODE_PATH\|buildNode\|isChapterUnlocked" src/ui/StoryMapView.ts | head -20`

Identify NODE_PATH constant location and length (currently 8 positions, v1.9.50).

- [ ] **Step 2: Add v2 NODE_PATH constant (24 positions, winding)**

Insert after existing `NODE_PATH`:
```typescript
// v2.0 — 24-button winding path per chapter.
// Y values approximate a sinuous Duolingo-style curve descending from
// banner to chapter end. X alternates left ↔ right with mild jitter.
// Adjust visually after first render.
const NODE_PATH_V2: Array<{ x: number; y: number }> = [
  // Outer prologue (3)
  { x: 200, y: 50 },   { x: 220, y: 110 },  { x: 180, y: 170 },
  // Main story (12)
  { x: 160, y: 240 },  { x: 220, y: 300 },  { x: 240, y: 360 },
  { x: 200, y: 420 },  { x: 160, y: 480 },  { x: 180, y: 540 },
  { x: 230, y: 600 },  { x: 210, y: 660 },  { x: 170, y: 720 },
  { x: 150, y: 780 },  { x: 200, y: 840 },  { x: 230, y: 900 },
  // Aesop sides (6-9, take 7)
  { x: 200, y: 970 },  { x: 170, y: 1030 }, { x: 220, y: 1090 },
  { x: 240, y: 1150 }, { x: 180, y: 1210 }, { x: 200, y: 1270 },
  // Outer outro + review (1-2)
  { x: 220, y: 1340 }, { x: 200, y: 1410 },
];

const V2_ENABLED = true; // feature flag — flip to false to use legacy 8-node
```

Total: 23 positions. Pad to 24 if needed (or adjust prologue/main/sides count). For now this is fine; render code uses `lesson.lessonInChapter` (1-indexed) to map.

- [ ] **Step 3: Modify Ch1 render loop to use V2 path**

Find the Ch1 render block (around line 213-225 per earlier read). Replace:
```typescript
for (let i = 0; i < 8; i++) {
  const beat = applyCatName(CH1_BEAT_LABELS[i]);
  const node = this.buildNode({ idx: i, label: beat, unlocked: ch1Unlocked, completed: ch1Completed, chapter: 1 });
  // ...
}
```

With:
```typescript
if (V2_ENABLED) {
  // v2.0 — 24-button path, label from lesson.storyBeat
  const lessons = await loadChapterLessons(1);
  const completed = readCompletedLessons(1);
  for (const lesson of lessons) {
    const i = lesson.lessonInChapter - 1;
    const pos = NODE_PATH_V2[i];
    const isCompleted = completed.has(lesson.id);
    const isUnlocked = isLessonUnlocked(1, lesson.lessonInChapter, completed.size);
    const node = this.buildLessonNode({
      lesson,
      position: pos,
      unlocked: isUnlocked,
      completed: isCompleted,
    });
    node.onclick = () => this.scene.scene.start('LessonScene', {
      chapter: 1,
      lessonId: lesson.id,
    });
  }
} else {
  // legacy v1.9.54 8-node loop unchanged
  for (let i = 0; i < 8; i++) {
    const beat = applyCatName(CH1_BEAT_LABELS[i]);
    const node = this.buildNode({ idx: i, label: beat, unlocked: ch1Unlocked, completed: ch1Completed, chapter: 1 });
    // ...
  }
}
```

- [ ] **Step 4: Add `buildLessonNode` helper method**

In StoryMapView class, add method (mirroring existing `buildNode` but consuming Lesson shape):
```typescript
private buildLessonNode(opts: {
  lesson: Lesson;
  position: { x: number; y: number };
  unlocked: boolean;
  completed: boolean;
}): HTMLElement {
  // Reuse the same paw-icon DOM construction as buildNode().
  // Difference: label comes from lesson.storyBeat or fallback "Lesson N".
  const label = opts.lesson.storyBeat ?? `Lesson ${opts.lesson.lessonInChapter}`;
  return this.buildNode({
    idx: opts.lesson.lessonInChapter - 1,
    label,
    unlocked: opts.unlocked,
    completed: opts.completed,
    chapter: opts.lesson.chapter as number,
    positionOverride: opts.position,  // pass to buildNode for V2 positioning
  });
}
```

Update `buildNode()` signature to accept optional `positionOverride: {x,y}` and use it if provided, otherwise fall back to legacy NODE_PATH.

- [ ] **Step 5: Type imports**

At top of StoryMapView.ts:
```typescript
import type { Lesson } from '../data/lessons';
import { loadChapterLessons } from '../data/lessons';
import { readCompletedLessons, isLessonUnlocked } from '../store/runStore';
```

- [ ] **Step 6: Run typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add src/ui/StoryMapView.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.8: StoryMapView 24-button v2 path (feature-flagged)" -m "V2_ENABLED flag toggles between legacy 8-node and new 24-button rendering. New buildLessonNode consumes Lesson shape. Path data NODE_PATH_V2 winding layout (rough first pass, polish in Phase D)."
```

---

## Task 10: End-to-end smoke test with stub Ch1 (3 lessons × 3 Q each)

**Files:**
- Create: `public/lessons-ch1.json` (stub for smoke test — will be replaced in Task 11+)

- [ ] **Step 1: Write minimal stub lessons-ch1.json**

Create `public/lessons-ch1.json` with 3 lessons × 3 Q for smoke test:
```json
[
  {
    "id": "kt-ch1-l1",
    "chapter": 1,
    "lessonInChapter": 1,
    "segmentType": "outer-prologue",
    "storyId": "outer",
    "storyBeat": "Mochi 跳上矮牆",
    "questions": [
      {
        "type": "listen-mc",
        "id": "kt-ch1-l1-q1",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "I am {catName}.",
        "question": "Which name did you hear?",
        "options": ["Mochi", "Tofu", "Cookie", "Luna"],
        "correctIndex": 0,
        "explanationZh": "I am {catName} = 我是 {catName}。你叫什麼名字?",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l1-q2",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "I jump on the wall.",
        "question": "Which verb?",
        "options": ["jump", "walk", "run", "sit"],
        "correctIndex": 0,
        "explanationZh": "jump = 跳。Mochi 跳上矮牆。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l1-q3",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "The wall is low.",
        "question": "How is the wall?",
        "options": ["low", "high", "long", "soft"],
        "correctIndex": 0,
        "explanationZh": "low = 矮的。矮牆好跳。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      }
    ]
  },
  {
    "id": "kt-ch1-l2",
    "chapter": 1,
    "lessonInChapter": 2,
    "segmentType": "outer-prologue",
    "storyId": "outer",
    "storyBeat": "{dogName}搖尾巴迎接",
    "questions": [
      {
        "type": "listen-mc",
        "id": "kt-ch1-l2-q1",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "{dogName} wags his tail.",
        "question": "What does he do?",
        "options": ["wag", "bark", "jump", "run"],
        "correctIndex": 0,
        "explanationZh": "wag = 搖(尾巴)。{dogName}搖尾迎接我。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l2-q2",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "He is happy to see me.",
        "question": "How does he feel?",
        "options": ["happy", "sad", "angry", "tired"],
        "correctIndex": 0,
        "explanationZh": "happy = 開心。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l2-q3",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "I sit beside him.",
        "question": "Where do I sit?",
        "options": ["beside", "behind", "before", "below"],
        "correctIndex": 0,
        "explanationZh": "beside = 在旁邊。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      }
    ]
  },
  {
    "id": "kt-ch1-l3",
    "chapter": 1,
    "lessonInChapter": 3,
    "segmentType": "outer-prologue",
    "storyId": "outer",
    "storyBeat": "奶奶打開故事書",
    "questions": [
      {
        "type": "listen-mc",
        "id": "kt-ch1-l3-q1",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "Grandma opens a book.",
        "question": "What does she open?",
        "options": ["book", "door", "bag", "box"],
        "correctIndex": 0,
        "explanationZh": "book = 書。奶奶打開故事書。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l3-q2",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "Tonight she tells a tale.",
        "question": "What does she tell?",
        "options": ["tale", "song", "name", "joke"],
        "correctIndex": 0,
        "explanationZh": "tale = 故事(古字 = story)。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      },
      {
        "type": "listen-mc",
        "id": "kt-ch1-l3-q3",
        "level": "A2",
        "difficulty": "easy",
        "sentence": "We listen quietly.",
        "question": "How do we listen?",
        "options": ["quietly", "loudly", "quickly", "slowly"],
        "correctIndex": 0,
        "explanationZh": "quietly = 安靜地。{dogName}跟我都安靜聽。",
        "tags": ["story", "ch1", "prologue", "smoke"]
      }
    ]
  }
]
```

- [ ] **Step 2: Run validate**

Run: `npm run validate`
Expected: `OK lessons-ch1.json: 3 lessons` exit 0.

- [ ] **Step 3: Dev server smoke**

Run: `npm run dev` (background). Open http://localhost:5173/.
- Navigate to Story Mode → Ch1.
- Expected: 24 nodes show on map (3 active/unlocked + 21 future positions empty or hidden — Task 11 will fill them).
- Click first node "Mochi 跳上矮牆".
- Expected: LessonScene loads, Q1 shows "I am Mochi.", answer Mochi correct → auto-advance Q2 → Q3 → return to map, L1 marked complete.

If smoke fails:
- Check browser console for errors.
- Verify lessons-ch1.json fetches (network tab).
- Verify NODE_PATH_V2 positions render visible nodes (not off-screen).
- Verify markLessonCompleted writes to localStorage (`pickup.chapter.1.lessons.completed`).

Stop dev server (Ctrl+C).

- [ ] **Step 4: Write content schema validation test**

Create `tests/data/lessons-ch1-validate.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LessonsSchema } from '../../src/data/lessons';

describe('lessons-ch1.json content', () => {
  it('parses successfully', () => {
    const raw = JSON.parse(
      readFileSync(resolve(__dirname, '../../public/lessons-ch1.json'), 'utf-8')
    );
    const result = LessonsSchema.safeParse(raw);
    if (!result.success) {
      console.error(result.error.issues);
    }
    expect(result.success).toBe(true);
  });
});
```

Run: `npm test`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json tests/data/lessons-ch1-validate.test.ts
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.A.9: end-to-end smoke with 3-lesson stub Ch1" -m "Validates schema + loader + LessonScene + StoryMapView V2 path + runStore lesson-progress all wire together. Content placeholder — replaced in Task 11+."
```

---

## Task 11: Author Ch1 outer-prologue (3 lessons, ~15 Q) — final content

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Replace L1-L3 with final outer-prologue content**

Replace lessons L1-L3 in `public/lessons-ch1.json` with polished outer-prologue 5 Q each. Pattern (use existing v1.9.54 Ch1 kt-ch1-01..03 as raw vocab source, expand):

L1 storyBeat: 「Mochi 跳上矮牆」 — 5 Q:
- Q1 listen-mc: "I am {catName}. I am a stray cat." → options stray/stay/straw/story
- Q2 listen-mc: "Every night I jump on the wall." → options jump/walk/run/sit
- Q3 type-what-you-hear: "The wall is low and warm." → missing: low
- Q4 listen-emoji: "I am curious." → emojis 🐈 curious / 😟 worried / 😠 angry / 😴 sleepy
- Q5 listen-comprehension: "Who am I?" → A: stray cat / a dog / a bird / a fish

L2 storyBeat: 「{dogName}搖尾巴迎接」 — 5 Q:
- Q1 listen-mc: "{dogName} wags his tail." → wag/bark/jump/run
- Q2 listen-mc: "He is Grandma's brown dog." → brown/black/white/red
- Q3 type-what-you-hear: "We are friends." → missing: friends
- Q4 listen-emoji: "I feel safe with him." → 🤗 safe / 😰 scared / 😡 angry / 😢 sad
- Q5 listen-comprehension: "Whose dog is {dogName}?" → A: Grandma's / mine / {dogName} is a cat / {dogName} has no owner

L3 storyBeat: 「奶奶打開故事書」 — 5 Q:
- Q1 listen-mc: "Grandma opens an old book." → opens/closes/holds/drops
- Q2 listen-mc: "Tonight she tells a tale." → tale/song/name/joke
- Q3 tap-tiles: tiles ["She","tells","us","a","story","loud","fast"], correctOrder [0,1,2,3,4] = "She tells us a story"
- Q4 listen-emoji: "I am ready to listen." → 👂 ready / 😴 sleepy / 🤔 thinking / 😟 worried
- Q5 listen-comprehension: "What is in her hand?" → A: an old book / a bowl / a key / a candle

Write the actual JSON. Reference existing kt-ch1-01..03 in `public/story-kitten.json` for vocabulary anchors (rain/cold/stray/yard...). Keep difficulty: "easy" throughout outer-prologue.

- [ ] **Step 2: Validate**

Run: `npm run validate`
Expected: OK 3 lessons (15 Q).

- [ ] **Step 3: Dev smoke**

Run: `npm run dev`. Play through L1-L3, verify all Q render and TTS reads properly.

- [ ] **Step 4: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.1: Ch1 L1-L3 outer-prologue final content (15 Q)" -m "Mochi 跳牆 / {dogName}搖尾 / 奶奶開書. Mix of listen-mc + type-what-you-hear + tap-tiles + listen-emoji + listen-comprehension. A2 easy difficulty across all 15 Q. Establishes outer-scene voice & vocab anchor (stray/yard/wall/tail/book/tale/listen)."
```

---

## Task 12: Author Ch1 main story — 雨夜小貓 expansion (12 lessons, ~60 Q) Part 1 — Story setup beats L4-L9

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add lessons L4-L9 — story setup (rain night, cat alone, grandma appears)**

Append after L3 (storyBeat in 中文 ≤25 字, each lesson 5 Q):

L4 「故事開始 — 從前一個雨夜」 5 Q: vocab story/long/ago/rain/night
L5 「小貓濕透又冷又怕」 5 Q: vocab wet/cold/scared/fur/hungry
L6 「她蜷縮在巷子角落」 5 Q: vocab corner/alley/curl/alone/tear
L7 「大影子靠近 — 是奶奶」 5 Q: vocab shadow/big/come/kind/face
L8 「奶奶撐傘為她遮雨」 5 Q: vocab umbrella/open/cover/rain/stop
L9 「奶奶溫柔說『不怕』」 5 Q: vocab soft/voice/say/no/fear

Embed actual JSON lessons following Task 11 pattern. **All 6 lessons × 5 Q = 30 Q must be in committed JSON**, not described.

Pattern for each lesson (filled with L4 example, repeat for L5-L9):

```json
{
  "id": "kt-ch1-l4",
  "chapter": 1,
  "lessonInChapter": 4,
  "segmentType": "main-story",
  "storyId": "rainy-night-cat",
  "storyBeat": "故事開始 — 從前一個雨夜",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch1-l4-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma says, \"Long ago, on a rainy night...\"",
      "question": "When does the story happen?",
      "options": ["long ago", "tomorrow", "next year", "today"],
      "correctIndex": 0,
      "explanationZh": "long ago = 很久以前。奶奶的故事開頭。",
      "tags": ["story", "ch1", "main", "rainy-night-cat"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch1-l4-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The rain falls hard all night.",
      "question": "How is the rain?",
      "options": ["hard", "soft", "warm", "light"],
      "correctIndex": 0,
      "explanationZh": "hard = 大力的。雨下得很大。",
      "tags": ["story", "ch1", "main", "rainy-night-cat"]
    },
    {
      "type": "type-what-you-hear",
      "id": "kt-ch1-l4-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "It is a dark night.",
      "question": "Type the missing word",
      "options": ["dark", "deep", "deer", "done"],
      "correctIndex": 0,
      "explanationZh": "dark = 黑暗的。沒月亮的夜。",
      "tags": ["story", "ch1", "main", "type-what-you-hear"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch1-l4-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The wind blows cold.",
      "question": "How does it feel?",
      "options": ["🥶 freezing", "🥵 hot", "😎 cool", "🤩 fun"],
      "correctIndex": 0,
      "explanationZh": "cold wind = 冷風,讓人 freezing(冷到發抖)。",
      "tags": ["story", "ch1", "main", "emoji-match"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch1-l4-q5",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "The street is empty and dark.",
      "question": "Tap what you hear",
      "tiles": ["The", "street", "is", "empty", "and", "dark", "warm", "loud"],
      "correctOrder": [0, 1, 2, 3, 4, 5],
      "explanationZh": "empty = 空的、dark = 黑的。沒人沒燈,只有雨。",
      "tags": ["story", "ch1", "main", "tap-tiles"]
    }
  ]
}
```

Author L5-L9 following same pattern: 5 Q each (mix of listen-mc / listen-emoji / type-what-you-hear / tap-tiles / listen-comprehension), A2 vocabulary, story-voice explanationZh.

- [ ] **Step 2: Validate**

Run: `npm run validate`
Expected: OK 9 lessons (45 Q).

- [ ] **Step 3: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.2: Ch1 L4-L9 main story setup (30 Q)" -m "Story setup: long-ago rainy night, cat alone scared in alley, grandma appears with umbrella. Vocab cluster: rain/wet/cold/scared/alley/corner/shadow/kind/umbrella/soft."
```

---

## Task 13: Author Ch1 main story Part 2 — story resolution L10-L15 (6 lessons, 30 Q)

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add lessons L10-L15**

Continue rainy-night-cat story arc:

L10 「奶奶蹲下,輕輕問問」 5 Q: vocab squat/down/gentle/ask/why
L11 「小貓抖著,不敢說話」 5 Q: vocab shake/tremble/cannot/speak/silent
L12 「奶奶從口袋拿出毛巾」 5 Q: vocab pocket/take/out/towel/dry
L13 「奶奶輕柔地擦乾她」 5 Q: vocab dry/gentle/slow/warm/skin
L14 「她不能帶小貓回家,但...」 5 Q: vocab cannot/bring/home/but/idea
L15 「『每晚到我院子來吧』」 5 Q: vocab every/night/come/yard/welcome

Each lesson follows the JSON structure from Task 12. 5 Q each, mixed type, A2.

- [ ] **Step 2: Validate**

Run: `npm run validate`
Expected: OK 15 lessons (75 Q).

- [ ] **Step 3: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.3: Ch1 L10-L15 main story resolution (30 Q)" -m "Grandma gentle interaction, towel-dry, can't bring home but invites cat to yard every night. Vocab cluster: squat/gentle/shake/silent/towel/dry/bring/welcome/yard. Resolves inner story to outer-frame meta-anchor."
```

---

## Task 14: Author Ch1 Aesop side 1 — 螞蟻與蚱蜢 (L16-L18, 3 lessons, 15 Q)

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add L16-L18 — The Ant and the Grasshopper**

Story beats:
L16 「奶奶說『另一個故事』」 → bridge from rainy-night → ant-and-grasshopper. Vocab: another/tell/summer/sing/grass
L17 「夏天蚱蜢唱歌,螞蟻工作」 → vocab summer/sing/grasshopper/ant/work/hard
L18 「冬天來,蚱蜢餓,螞蟻飽」 → vocab winter/come/hungry/full/share/wise

Each 5 Q, A2, mixed types. Aesop's moral embedded in explanationZh.

- [ ] **Step 2: Validate + commit**

```bash
npm run validate
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.4: Ch1 L16-L18 Aesop side — Ant & Grasshopper (15 Q)" -m "Short fable: summer sing vs work, winter consequence. Vocab cluster: summer/winter/sing/work/ant/grasshopper/hungry/wise."
```

---

## Task 15: Author Ch1 Aesop side 2 — 北風與太陽 (L19-L21, 3 lessons, 15 Q)

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add L19-L21 — North Wind and the Sun**

Story beats:
L19 「奶奶說『再聽一個』」 → bridge into north-wind. Vocab: north/wind/sun/argue/strong
L20 「北風大吹,旅人裹更緊」 → vocab blow/wrap/tight/coat/hold
L21 「太陽溫暖,旅人脫了外套」 → vocab shine/warm/take off/coat/wise

Each 5 Q, A2, mixed types.

- [ ] **Step 2: Validate + commit**

```bash
npm run validate
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.5: Ch1 L19-L21 Aesop side — North Wind & Sun (15 Q)" -m "Short fable: strength vs warmth, gentleness wins. Vocab cluster: north/sun/wind/coat/blow/shine/warm. Pairs with rainy-night cat thematically — gentle approach (Grandma's vs storm)."
```

---

## Task 16: Author Ch1 outer-outro (L22-L23, 2 lessons, 10 Q)

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add L22-L23 — Goodnight + Mochi leaves**

L22 「奶奶說『晚安』,合上書」 5 Q: vocab goodnight/close/book/late/sleepy
L23 「Mochi 跳下牆,回街上」 5 Q: vocab jump/down/back/street/tomorrow

A2 mixed types. Outro should feel quiet + complete, sets up "Mochi will come back tomorrow" hook.

- [ ] **Step 2: Validate + commit**

```bash
npm run validate
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.6: Ch1 L22-L23 outer-outro (10 Q)" -m "Goodnight, close book, Mochi jumps back to street. Closing vocab: goodnight/sleepy/jump down/tomorrow."
```

---

## Task 17: Author Ch1 review tap-pairs (L24, 1 lesson, ~5 Q)

**Files:**
- Modify: `public/lessons-ch1.json`

- [ ] **Step 1: Add L24 — chapter review**

L24 storyBeat: 「今晚的關鍵字」 — chapter-end vocab review:
- Q1 tap-pairs: stray/流浪、yard/院子、umbrella/傘、kind/善良
- Q2 tap-pairs: rain/雨、cold/冷、wet/濕、scared/害怕
- Q3 tap-pairs: ant/螞蟻、sun/太陽、wind/風、wise/有智慧的
- Q4 listen-comprehension: "What did Grandma tell tonight?" → A: a rainy night story / a song / her name / a recipe
- Q5 listen-mc: "Will Mochi come back?" → answer Yes (every night)

5 Q total. Review locks key vocab from outer + main + 2 Aesop sides.

- [ ] **Step 2: Validate + commit**

```bash
npm run validate
git -C C:/Users/acer/Desktop/wordwar add public/lessons-ch1.json
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.7: Ch1 L24 review (5 Q tap-pairs + recap)" -m "Chapter close review: 3 tap-pairs × 4 word groups (outer / main / Aesop sides) + 2 listen-mc recap. Locks ~12 key vocab from the evening."
```

---

## Task 18: Update CLAUDE.md to reflect v2.0

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace「主打故事」section**

In `CLAUDE.md`, replace the entire "🐈 主打故事:小貓回家路(8 章 + false-ending)" section with:

```markdown
## 🐈 Story Framework — 奶奶的 8 個說故事夜晚 (v2.0)

**Slice-of-life,Arabian Nights 結構**。每章 = 一個 storytelling evening。

### Outer frame (8 章 recurring)
- Mochi(三花貓 / 流浪)每晚跳上奶奶矮牆
- {dogName}(柴犬 / 奶奶養)趴她腳邊
- 奶奶在椅子上,翻書,講故事

### 8 章 inner story map

| Ch | 主菜 | 體裁 | Aesop sides |
|----|------|------|-------------|
| 1 | 🌧️ 雨夜小貓(meta-anchor) | 直接體驗 1st-person | 螞蟻與蚱蜢 / 北風與太陽 |
| 2 | 🍑 桃太郎 | 累積連鎖體 | 龜兔賽跑 / 狼來了 |
| 3 | 🦢 醜小鴨 | 第一人稱內心獨白 | 獅子與老鼠 / 牧羊人與狼 |
| 4 | 🐢 龜兔賽跑(升 main) | 對話體 | 烏鴉與狐狸 / 城市鼠與鄉村鼠 |
| 5 | 🐪 駱駝為什麼有駝峰 | Kipling "O Best Beloved" 第二人稱 | 蘆葦與橡樹 / 老鼠開會 |
| 6 | 🏚️ Baba Yaga 雞腳屋 | 黑暗民俗 sparse | 漁夫與妻子 / 七張床 |
| 7 | 🦢 六隻天鵝(Grimm 冷門) | 無對話詩意 narration | 三個願望 / 老鼠新娘 |
| 8 | 🏺 葉限(唐代 灰姑娘原型) | 雙語 code-switch | 田螺姑娘 / 嫦娥奔月 |

### 章內結構 (Duolingo-nested,每章 24 lessons,每 lesson 5-15 Q)
- 3 outer-prologue lessons(Mochi 跳牆 / {dogName} / 奶奶開書)
- 12 main-story lessons(主菜童話)
- 6-9 aesop-side lessons(2-3 個短篇 × 3-4 lessons)
- 1-2 outer-outro lessons(Goodnight)
- 1 review lesson(tap-pairs)

**廢棄**:舊 v0.10 quest arc「Ch1 雨夜 → Ch8 留街頭」整段。新方向沒大結局,slice-of-life genre。

設計來源:`docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md`
```

- [ ] **Step 2: Update Code Structure section**

In `CLAUDE.md` 「📂 Code Structure」section, modify the `src/` tree:
```
src/
├── scenes/
│   ├── BootScene.ts
│   ├── MenuScene.ts
│   ├── PlayScene.ts             # legacy — still used by free-practice + scenario modes
│   ├── LessonScene.ts           # v2.0 — single-lesson scoped scene (Duolingo-nested)
│   ├── StoryModeScene.ts        # chapter map host
│   └── (ChapterIntroScene/ChapterEndScene/StoryEndingScene retired/refactored Phase D)
├── store/
│   └── runStore.ts              # v2.0: per-lesson progress added
├── ui/
│   ├── ClozeUI.ts
│   ├── GameHUD.ts
│   ├── Mascot.ts
│   ├── mascots.ts
│   ├── ModeMenu.ts
│   ├── EndOverlay.ts
│   ├── Confetti.ts
│   ├── StoryMapView.ts          # v2.0: 24-button winding path (V2_ENABLED flag)
│   ├── SpeakerButton.ts
│   ├── WordHint.ts
│   ├── tokens.ts
│   └── domUtil.ts
├── data/
│   ├── vocab.ts
│   ├── sentences.ts             # v2.0: ClozeQuestionSchema aliased to lessons QuestionSchema
│   ├── scenarios.ts
│   ├── storyKitten.ts           # v2.0: deprecated, replaced by lessons.ts
│   ├── lessons.ts               # v2.0 — LessonSchema + loadChapterLessons
│   ├── catName.ts
│   ├── xp.ts
│   ├── streak.ts
│   ├── coins.ts
│   └── roundGenerator.ts
├── audio/
│   └── bgm.ts
└── assets/

public/
├── lessons-ch1.json             # v2.0 — 24 lessons (~120 Q)
└── ... (lessons-ch2..8.json added by Plans 2-8)

tests/
├── data/
│   ├── lessons.test.ts
│   ├── loader.test.ts
│   └── lessons-ch1-validate.test.ts
└── store/
    └── lesson-progress.test.ts
```

- [ ] **Step 3: Update Version History section**

Add row at top of Version History table:
```
| v2.0.0 (2026-05-30 target) | Duolingo-nested redesign — 8 storytelling evenings, 24 lessons/章, ~960 Q. Plan 1 ships Ch1 prototype. Plan 2-8 fills Ch2-8 content. Plan 9 polish + ship. See docs/superpowers/specs/2026-05-29-*.md |
```

- [ ] **Step 4: Update Roadmap section**

Replace Phase 1/2 description with v2.0 roadmap:
```
### Phase 1 — v1.x (✅ 完成,2026-05-27 v1.9.54 ship)
- 8 章 quest arc framework + Ghibli aesthetic + Duolingo polish
- v1.9.50 grandma-v4 framework introduced (basis for v2.0)
- v1.9.55 hotfix kt-ch1-06 schema bug, v1.9.56 Mochi default

### Phase 2 — v2.0 Duolingo-nested redesign(in progress)
- Plan 1: Phase A schema + UI + Phase B Ch1 prototype (this plan)
- Plans 2-8: Ch2-Ch8 content (after Plan 1 ships and validates model)
- Plan 9: Phase D polish + paywall stub + v2.0 ship

### Phase 2.5 — iOS App Store(post v2.0 ship)
- Capacitor + Codemagic, unchanged from v1.x roadmap
```

- [ ] **Step 5: Commit**

```bash
git -C C:/Users/acer/Desktop/wordwar add CLAUDE.md
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.8: update CLAUDE.md to v2.0 framework" -m "Replace 'quest arc 8 章' section with 'storytelling evenings'. Update Code Structure with new lessons.ts / LessonScene.ts / tests/ tree. Add v2.0 row to version history. Refresh roadmap."
```

---

## Task 19: Build + deploy Ch1 v2.0 to production

**Files:** none (deploy only)

- [ ] **Step 1: Final local build**

Run:
```bash
cd C:/Users/acer/Desktop/wordwar && npm run build
```

Expected output:
- `OK lessons-ch1.json: 24 lessons` (validate step)
- TS compile success
- Vite build emits `dist/` artifacts
- Build budget < 1.6 MB raw / < 500 KB gzip per spec Section 13.2

If validate fails: read the issue path, fix the offending lesson Q, re-run.

- [ ] **Step 2: Local preview smoke**

Run: `npm run preview` (background, ~10 sec).
Open http://localhost:4173/.
- Navigate to Story Mode → Ch1.
- Click L1, play through 5 Q.
- Verify lesson complete marks node green.
- Verify L2 unlocks.
- Skip-play through 5 random lessons to spot-check content.

Stop preview.

- [ ] **Step 3: Deploy to Cloudflare Pages**

Run:
```bash
git -C C:/Users/acer/Desktop/wordwar push origin master
cd C:/Users/acer/Desktop/wordwar
npx wrangler pages deploy dist --project-name=pickupwords --branch=master --commit-message="v2.0.B.9 Ch1 prototype deploy"
```

Expected:
- Wrangler uploads files (39 already uploaded baseline + new dist content)
- Deployment URL printed (e.g. `https://XXXXXXXX.pickupwords.pages.dev`)
- Production URL `https://pickupwords.pages.dev/` serves v2.0 Ch1

- [ ] **Step 4: Production smoke**

Open production URL on mobile (iPhone) and desktop.
- Verify map shows 24-button Ch1 path.
- Verify L1 plays.
- Verify localStorage `pickup.chapter.1.lessons.completed` updates after L1.
- Refresh page — verify L1 still marked complete (persistence works).

- [ ] **Step 5: Commit deploy marker (no code change, just bumps CLAUDE.md with deploy URL)**

Optional. Or skip — wrangler deploy is its own audit trail.

---

## Task 20: Final spec self-review + Plan 2 stub

**Files:**
- Create: `docs/superpowers/plans/_next-plans.md` (stub for Plans 2-9)

- [ ] **Step 1: Verify Plan 1 success criteria met**

Manually check each from spec Section 13:
- ✅ Ch1 24 lessons content complete, Zod validates (`npm run validate` passes)
- ✅ Build < 1.6 MB raw / 500 KB gzip (check dist sizes)
- ✅ Production URL loads Ch1 without schema error
- ✅ DEV_UNLOCK_ALL = false default (verify in src/data/storyKitten.ts)
- ✅ Player plays through 24 lessons (~2 hr estimated)
- ✅ TTS / blindRetry / SRS / streak / XP / coins all work
- ✅ Mobile portrait 400×800 — test on iPhone

- [ ] **Step 2: Create _next-plans.md**

Write `docs/superpowers/plans/_next-plans.md`:
```markdown
# Pickup v2.0 — Remaining Plans

After Plan 1 (this file's sibling) ships Ch1 prototype and you validate
the Duolingo-nested model 體感, run these:

## Plan 2 — Ch2 桃太郎 content
- 24 lessons (~120 Q), 累積連鎖體
- Aesop sides: 龜兔賽跑 / 狼來了
- Pattern: copy Plan 1's content tasks (11-17) substituting Ch2 storyBeats

## Plan 3 — Ch3 醜小鴨 content
- 24 lessons, 1st-person internal monologue 體裁
- Aesop sides: 獅子與老鼠 / 牧羊人與狼

## Plan 4 — Ch4 龜兔賽跑 (main)
- 24 lessons, 對話體
- Aesop sides: 烏鴉與狐狸 / 城市鼠與鄉村鼠

## Plan 5 — Ch5 駱駝為什麼有駝峰
- 24 lessons, Kipling "O Best Beloved" 第二人稱
- Aesop sides: 蘆葦與橡樹 / 老鼠開會

## Plan 6 — Ch6 Baba Yaga
- 24 lessons, 黑暗民俗 sparse
- Aesop sides: 漁夫與妻子 / 七張床

## Plan 7 — Ch7 六隻天鵝
- 24 lessons, 無對話詩意 narration
- Aesop sides: 三個願望 / 老鼠新娘

## Plan 8 — Ch8 葉限
- 24 lessons, 雙語 code-switch 中英混雜
- Aesop sides: 田螺姑娘 / 嫦娥奔月

## Plan 9 — Phase D polish + ship v2.0
- Map UX polish (24 nodes visual density)
- ClozeUI refactor to consume discriminated Question types (remove `as any` cast from LessonScene)
- Retire ChapterIntroScene / ChapterEndScene / StoryEndingScene
- Cross-chapter SRS pool wiring
- DEV_UNLOCK_ALL = false verification
- Paywall stub: Ch1-2 free / Ch3+ locked (UI only, no payment integration)
- Final build budget verification
- Wrangler deploy to production
- v2.0 official ship commit

Each of Plans 2-8 is a content-batching plan. Plan 9 is polish + ship.
Each can be executed by autonomous loop overnight after Plan 1 validates.
```

- [ ] **Step 3: Commit + push**

```bash
git -C C:/Users/acer/Desktop/wordwar add docs/superpowers/plans/_next-plans.md
git -C C:/Users/acer/Desktop/wordwar commit -m "v2.0.B.10: stub Plans 2-9 for remaining v2.0 work"
git -C C:/Users/acer/Desktop/wordwar push origin master
```

---

## Self-Review (executed before handoff)

### Spec coverage check
- ✅ Vision (Section 1) → reflected in CLAUDE.md update (Task 18)
- ✅ Architecture nested model (Section 2) → Tasks 3, 5, 8, 9 implement
- ✅ Chapter template 24 lessons (Section 3) → Task 9 path, Tasks 11-17 content
- ✅ 8 chapter starter pack (Section 4) → Ch1 covered (Tasks 11-17); Ch2-8 in `_next-plans.md`
- ✅ Schema changes (Section 5) → Tasks 2-4
- ✅ UI/Map/Code changes (Section 6) → Tasks 7-9
- ✅ Migration plan (Section 7) → Plan 1 covers Phase A + B; Plans 2-9 cover Phase C + D
- ✅ Content roadmap (Section 8) → Plan 1 covers ~120 Q of Ch1; Plans 2-8 cover Ch2-8
- ✅ Tech debt cleanup (Section 9) → Task 4 (discriminated union for ClozeQuestionSchema)
- ✅ Vocab + SRS (Section 10) → Task 17 review, cross-chapter SRS deferred to Plan 9
- ✅ Open Questions (Section 11) → respected:
  - Map UX → deferred to Plan 9 polish
  - Audio narrator (人聲) → not in Plan 1 scope
  - Mascot art per lesson → not in Plan 1, deferred
  - Paywall split → Plan 9 paywall stub
  - Cross-chapter persistence → deferred
  - Question type weighting → use spec ~5 Q/lesson average naturally
  - Bilingual integration → Ch8 only (Plan 8)
  - Streak 跨章 → no change, daily streak unchanged
- ✅ Out of scope (Section 12) → respected: no iOS / no auth / no cloud sync / no IAP
- ✅ Success criteria (Section 13) → Task 19 deploy + Task 20 verification

### Placeholder scan
- No "TODO" / "TBD" in plan
- Tasks 12-17 reference "Author L{N} following pattern" — but each task **includes one full lesson JSON example inline** and lists the storyBeat + vocab cluster for each subsequent lesson. Acceptable: executing agent has template + slot definitions, fills in following pattern. **Caveat**: this is the place where executing agent has most autonomy — review carefully when subagent reports back.

### Type consistency check
- `Lesson`, `Question`, `QuestionSchema`, `LessonsSchema`, `loadChapterLessons` — consistent across Tasks 3, 5, 8, 9
- `markLessonCompleted` / `readCompletedLessons` / `isLessonUnlocked` — consistent across Tasks 7, 8, 9
- `NODE_PATH_V2` / `V2_ENABLED` — only in Task 9 (StoryMapView.ts)
- `lessons-ch1.json` filename — consistent across Tasks 6, 10-17, 19

### Plan summary
- **20 tasks** spanning ~3-5 days of focused work, or ~1 autonomous overnight loop for Phase A (Tasks 1-9) + 1 overnight for Phase B (Tasks 10-19)
- **Phase A (Tasks 1-10)**: ~8 hr engineering
- **Phase B (Tasks 11-19)**: ~10 hr content writing + smoke + ship
- **Total**: ~18 hr

## End of plan.
