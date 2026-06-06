import { describe, it, expect } from 'vitest';
import ch16raw from '../../public/lessons-ch16.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.264+: Ch16 一寸法師 (Issun-bōshi, Japanese folk public domain).
// URL pipeline ship 2026-06-07. Completes 日本民間三部曲 with Ch1 桃太郎 +
// Ch14 浦島太郎 (三個都公有領域口傳). 自創 A2 句式, 不引特定譯本/繪本.
// 'tiny boy' (not 'dwarf'); 'demon' (not 'oni'); 'gave up and ran away'
// (not 'killed'); 'big enough now' / 'became family' (child-friendly,
// not 'married'). JSON module import = TS-native.

describe('Ch16 一寸法師 (Issun-bōshi, Japanese folk public domain)', () => {
  it('lessons-ch16.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch16raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch16 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch16raw).toHaveLength(7);
    const totalQ = (ch16raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch16 lessons all chapter=16 and id pattern kt-ch16-l*', () => {
    const arr = ch16raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(16);
      expect(arr[i].id).toBe(`kt-ch16-l${i + 1}`);
    }
  });

  it('Ch16 uses A2 child-friendly replacements (no dwarf / married / killed)', () => {
    const raw = JSON.stringify(ch16raw);
    expect(raw).not.toMatch(/\bdwarf\b/i);
    expect(raw).not.toMatch(/\bmarried\b/i);
    expect(raw).not.toMatch(/\bmarriage\b/i);
    expect(raw).not.toMatch(/\bwedding\b/i);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bdeath\b/i);
    // 'oni' romanization avoided (must use 'demon')
    expect(raw).not.toMatch(/\boni\b/i);
  });

  it('Ch16 keeps key plot anchors (tiny boy / demon / mallet / princess)', () => {
    const raw = JSON.stringify(ch16raw);
    expect(raw).toMatch(/tiny/i);
    expect(raw).toMatch(/demon/i);
    expect(raw).toMatch(/mallet/i);
    expect(raw).toMatch(/princess/i);
    // canonical user-given phrasings for the no-violence ending + transformation
    expect(raw).toMatch(/gave up and ran away/);
    expect(raw).toMatch(/big enough now/);
    // Japanese trio anchor — Kyoto destination (room-machi setting)
    expect(raw).toMatch(/Kyoto/);
  });
});
