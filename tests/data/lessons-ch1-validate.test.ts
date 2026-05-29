import { describe, it, expect } from 'vitest';
// Vite/vitest natively supports JSON imports (bundler module resolution),
// so we sidestep needing @types/node for fs.readFileSync. The import
// path is relative to repo root via the public/ alias-free path.
import raw from '../../public/lessons-ch1.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('lessons-ch1.json content', () => {
  it('parses successfully against LessonsSchema', () => {
    const result = LessonsSchema.safeParse(raw);
    if (!result.success) {
      console.error(result.error.issues);
    }
    expect(result.success).toBe(true);
  });

  it('contains the expected 24 lessons (L1-L3 prologue + L4-L15 main story + L16-L18 aesop ant + L19-L21 aesop north-wind + L22-L23 outer-outro + L24 review)', () => {
    expect(raw).toHaveLength(24);
    expect(raw[0].id).toBe('kt-ch1-l1');
    expect(raw[0].lessonInChapter).toBe(1);
    expect(raw[0].segmentType).toBe('outer-prologue');
    expect(raw[3].id).toBe('kt-ch1-l4');
    expect(raw[3].lessonInChapter).toBe(4);
    expect(raw[3].segmentType).toBe('main-story');
    expect(raw[3].storyId).toBe('rainy-night-cat');
    expect(raw[8].id).toBe('kt-ch1-l9');
    expect(raw[8].lessonInChapter).toBe(9);
    expect(raw[9].id).toBe('kt-ch1-l10');
    expect(raw[9].lessonInChapter).toBe(10);
    expect(raw[9].segmentType).toBe('main-story');
    expect(raw[9].storyId).toBe('rainy-night-cat');
    expect(raw[14].id).toBe('kt-ch1-l15');
    expect(raw[14].lessonInChapter).toBe(15);
    expect(raw[14].segmentType).toBe('main-story');
    expect(raw[15].id).toBe('kt-ch1-l16');
    expect(raw[15].lessonInChapter).toBe(16);
    expect(raw[15].segmentType).toBe('aesop-side');
    expect(raw[15].storyId).toBe('ant-and-grasshopper');
    expect(raw[18].id).toBe('kt-ch1-l19');
    expect(raw[18].lessonInChapter).toBe(19);
    expect(raw[18].segmentType).toBe('aesop-side');
    expect(raw[18].storyId).toBe('north-wind-and-sun');
    expect(raw[21].id).toBe('kt-ch1-l22');
    expect(raw[21].lessonInChapter).toBe(22);
    expect(raw[21].segmentType).toBe('outer-outro');
    expect(raw[23].id).toBe('kt-ch1-l24');
    expect(raw[23].lessonInChapter).toBe(24);
    expect(raw[23].segmentType).toBe('review');
  });
});
