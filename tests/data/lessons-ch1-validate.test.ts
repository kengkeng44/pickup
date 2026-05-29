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

  it('contains the expected 3 stub lessons', () => {
    expect(raw).toHaveLength(3);
    expect(raw[0].id).toBe('kt-ch1-l1');
    expect(raw[0].lessonInChapter).toBe(1);
    expect(raw[0].segmentType).toBe('outer-prologue');
  });
});
