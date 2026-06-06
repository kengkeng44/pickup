/**
 * v2.0.B.236 — Demo lessons-demo-new-types.json sanity:
 * the 5 new question types (listen-emoji / picture-mc / read-and-tap /
 * drag-blank / speak-back) each get an 11-Q lesson, all parse against
 * LessonsSchema. This file does NOT pollute the lessons-ch{0-8}.json
 * pipeline (validate-lessons.js regex `^lessons-ch\d+\.json$` skips it),
 * so it stays as a demo for renderer + schema smoke verification.
 */
import { describe, it, expect } from 'vitest';
import demoRaw from '../../public/lessons-demo-new-types.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('lessons-demo-new-types.json (5 new question types)', () => {
  it('top-level LessonsSchema parses', () => {
    const result = LessonsSchema.safeParse(demoRaw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('contains exactly 5 lessons covering all new question types', () => {
    expect(demoRaw).toHaveLength(5);
    const types = demoRaw.map(l => l.questions[0]?.type);
    expect(types).toEqual([
      'listen-emoji',
      'picture-mc',
      'read-and-tap',
      'drag-blank',
      'speak-back',
    ]);
  });

  it('each lesson has 11 questions of its declared type', () => {
    for (const lesson of demoRaw) {
      expect(lesson.questions).toHaveLength(11);
      const firstType = lesson.questions[0].type;
      const sameType = lesson.questions.every(q => q.type === firstType);
      expect(sameType).toBe(true);
    }
  });
});
