import { describe, it, expect } from 'vitest';
import ch1raw from '../../public/lessons-ch1.json';
import ch0raw from '../../public/lessons-ch0.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('Intro (ch0) + Ch1 structure (v2.0.B.203 split)', () => {
  it('lessons-ch0.json (Intro) parses + has 3 outer-prologue lessons', () => {
    const result = LessonsSchema.safeParse(ch0raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    expect(ch0raw).toHaveLength(3);
    expect(ch0raw[0].id).toBe('kt-ch1-l1');
    expect(ch0raw[0].chapter).toBe(0);
    expect(ch0raw[0].segmentType).toBe('outer-prologue');
    expect(ch0raw[2].id).toBe('kt-ch1-l3');
  });

  it('lessons-ch1.json (post-split) parses + has 21 lessons starting from main-story', () => {
    const result = LessonsSchema.safeParse(ch1raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    expect(ch1raw).toHaveLength(21);
    // L1 of Ch1 is now main-story (was L4)
    expect(ch1raw[0].id).toBe('kt-ch1-l4');
    expect(ch1raw[0].lessonInChapter).toBe(1);
    expect(ch1raw[0].segmentType).toBe('main-story');
    expect(ch1raw[0].storyId).toBe('rainy-night-cat');
    // Last lesson is the review (was L24)
    expect(ch1raw[20].id).toBe('kt-ch1-l24');
    expect(ch1raw[20].lessonInChapter).toBe(21);
    expect(ch1raw[20].segmentType).toBe('review');
  });
});
