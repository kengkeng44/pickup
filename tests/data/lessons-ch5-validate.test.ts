import { describe, it, expect } from 'vitest';
import raw from '../../public/lessons-ch5.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('lessons-ch5.json content', () => {
  it('parses successfully against LessonsSchema', () => {
    const result = LessonsSchema.safeParse(raw);
    if (!result.success) {
      console.error(result.error.issues);
    }
    expect(result.success).toBe(true);
  });

  it('contains the expected 25 lessons with 150 questions', () => {
    expect(raw).toHaveLength(25);
    const totalQ = (raw as any[]).reduce((sum, l) => sum + l.questions.length, 0);
    expect(totalQ).toBe(150);
    expect(raw[0].id).toBe('kt-ch5-l1');
    expect(raw[0].segmentType).toBe('outer-prologue');
    expect(raw[3].id).toBe('kt-ch5-l4');
    expect(raw[3].segmentType).toBe('main-story');
    expect(raw[3].storyId).toBe('camel-hump');
    expect(raw[18].id).toBe('kt-ch5-l19');
    expect(raw[18].segmentType).toBe('aesop-side');
    expect(raw[18].storyId).toBe('reed-and-oak');
    expect(raw[20].id).toBe('kt-ch5-l21');
    expect(raw[20].storyId).toBe('belling-the-cat');
    expect(raw[24].id).toBe('kt-ch5-l25');
    expect(raw[24].segmentType).toBe('review');
  });
});
