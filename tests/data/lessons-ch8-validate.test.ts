import { describe, it, expect } from 'vitest';
import raw from '../../public/lessons-ch8.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('lessons-ch8.json content', () => {
  it('parses successfully against LessonsSchema', () => {
    const result = LessonsSchema.safeParse(raw);
    if (!result.success) {
      console.error(result.error.issues);
    }
    expect(result.success).toBe(true);
  });

  it('contains the expected 25 lessons (Ch8 finale)', () => {
    expect(raw).toHaveLength(25);
    expect(raw[0].id).toBe('kt-ch8-l1');
    expect(raw[0].lessonInChapter).toBe(1);
    expect(raw[0].segmentType).toBe('outer-prologue');
    expect(raw[3].id).toBe('kt-ch8-l4');
    expect(raw[3].segmentType).toBe('main-story');
    expect(raw[3].storyId).toBe('yexian');
    expect(raw[17].id).toBe('kt-ch8-l18');
    expect(raw[17].segmentType).toBe('main-story');
    expect(raw[18].id).toBe('kt-ch8-l19');
    expect(raw[18].segmentType).toBe('aesop-side');
    expect(raw[18].storyId).toBe('snail-maiden');
    expect(raw[20].storyId).toBe('chang-e');
    expect(raw[22].id).toBe('kt-ch8-l23');
    expect(raw[22].segmentType).toBe('outer-outro');
    expect(raw[23].id).toBe('kt-ch8-l24');
    expect(raw[23].segmentType).toBe('outer-outro');
    expect(raw[24].id).toBe('kt-ch8-l25');
    expect(raw[24].segmentType).toBe('review');
  });

  it('totals 150 questions across Ch8', () => {
    const totalQ = raw.reduce((sum: number, lesson: any) => sum + lesson.questions.length, 0);
    expect(totalQ).toBe(150);
  });
});
