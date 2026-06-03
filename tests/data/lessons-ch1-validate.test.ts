import { describe, it, expect } from 'vitest';
import ch1raw from '../../public/lessons-ch1.json';
import ch0raw from '../../public/lessons-ch0.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('Intro (ch0) + Ch1 桃太郎 (v2.0.B.204 renumber)', () => {
  it('lessons-ch0.json (Intro) parses + has 3 outer-prologue lessons', () => {
    const result = LessonsSchema.safeParse(ch0raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    expect(ch0raw).toHaveLength(3);
    expect(ch0raw[0].id).toBe('kt-ch1-l1');
    expect(ch0raw[0].chapter).toBe(0);
    expect(ch0raw[0].segmentType).toBe('outer-prologue');
  });

  it('lessons-ch1.json (post-renumber) is now 桃太郎 (was ch2)', () => {
    const result = LessonsSchema.safeParse(ch1raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    // IDs preserved as kt-ch2-* (intentional — audio MP3 + localStorage 不破壞)
    expect(ch1raw[0].id).toBe('kt-ch2-l1');
    expect(ch1raw[0].chapter).toBe(1);  // chapter field renumbered
  });
});
