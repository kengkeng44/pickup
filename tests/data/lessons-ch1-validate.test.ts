import { describe, it, expect } from 'vitest';
import ch1raw from '../../public/lessons-ch1.json';
import ch0raw from '../../public/lessons-ch0.json';
import { LessonsSchema } from '../../src/data/lessons';

describe('Intro (ch0) + Ch1 桃太郎 (v2.0.B.205 IDs aligned)', () => {
  it('lessons-ch0.json (Ground floor 零基礎 B.237) parses + IDs aligned to kt-ch0-*', () => {
    const result = LessonsSchema.safeParse(ch0raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
    // v2.0.B.489 (per user「ch0 統整成跟其他章節一樣的題目分配」): Ch0 擴回 7 課,
    // 比照標準章節題型分配 (取代 B.415 的 5 課輕量精簡)。
    expect(ch0raw).toHaveLength(7);
    expect(ch0raw[0].id).toBe('kt-ch0-l1');
    expect(ch0raw[0].chapter).toBe(0);
    expect(ch0raw[0].segmentType).toBe('outer-prologue');
    // 1..7 連號無缺 (修舊版缺 l5/l7 的 gap)
    expect(ch0raw.map((l: { lessonInChapter: number }) => l.lessonInChapter).sort((a: number, b: number) => a - b))
      .toEqual([1, 2, 3, 4, 5, 6, 7]);
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
