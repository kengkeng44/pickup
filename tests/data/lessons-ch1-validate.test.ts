import { describe, it, expect } from 'vitest';
import ch1raw from '../../public/lessons-ch1.json';
import ch0raw from '../../public/lessons-ch0.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('Intro (ch0) + Ch1 桃太郎 (v2.0.B.205 IDs aligned)', () => {
  it('lessons-ch0.json (Ground floor 零基礎 B.237) parses + IDs aligned to kt-ch0-*', () => {
    const result = LessonsSchema.safeParse(ch0raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    // v2.0.B.237: Ch0 expanded from 3 outer-prologue → 7 ground-floor lessons
    // (ABC / 1-10 / colors / animals / family / greetings / simple sentences).
    expect(ch0raw).toHaveLength(7);
    expect(ch0raw[0].id).toBe('kt-ch0-l1');
    expect(ch0raw[0].chapter).toBe(0);
    expect(ch0raw[0].segmentType).toBe('outer-prologue');
  });

  it('lessons-ch1.json (桃太郎) IDs aligned to kt-ch1-*', () => {
    const result = LessonsSchema.safeParse(ch1raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    expect(ch1raw[0].id).toBe('kt-ch1-l1');
    expect(ch1raw[0].chapter).toBe(1);
    // verify all questions also have kt-ch1- prefix
    const allCh1Ids = ch1raw.every(l =>
      l.id.startsWith('kt-ch1-') && (l.questions || []).every(q => q.id.startsWith('kt-ch1-'))
    );
    expect(allCh1Ids).toBe(true);
  });
});
