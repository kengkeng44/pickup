import { describe, it, expect } from 'vitest';
import ch9raw from '../../public/lessons-ch9.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.239: CI fix — 改 JSON module import 對齊 ch1 pattern.
// 原本用 'fs' readFileSync, tsconfig 無 @types/node 在 tsc --noEmit 時掛.
// JSON import = TS-native, 0 額外依賴.

describe('Ch9 灰姑娘 (Cinderella, Perrault 1697 public domain)', () => {
  it('lessons-ch9.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch9raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch9 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch9raw).toHaveLength(7);
    const totalQ = (ch9raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch9 lessons all chapter=9 and id pattern kt-ch9-l*', () => {
    const arr = ch9raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(9);
      expect(arr[i].id).toBe(`kt-ch9-l${i + 1}`);
    }
  });

  it('Ch9 contains 0 Disney 1950 elements', () => {
    const raw = JSON.stringify(ch9raw);
    expect(raw).not.toMatch(/glass slipper/i);
    expect(raw).not.toMatch(/bibbidi/i);
    expect(raw).not.toMatch(/bobbidi/i);
    expect(raw).not.toMatch(/Tremaine/);
    expect(raw).not.toMatch(/Anastasia/);
    expect(raw).not.toMatch(/Drizella/);
    expect(raw).not.toMatch(/Lucifer/);
  });

  it('Ch9 uses Perrault original fur slipper, NOT glass', () => {
    const raw = JSON.stringify(ch9raw);
    expect(raw).toMatch(/fur slipper/);
  });
});
