import { describe, it, expect } from 'vitest';
import ch19raw from '../../public/lessons-ch19.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.266+: Ch19 Sang Kancil 鼠鹿 (Maritime Southeast Asia oral folk PD —
// Malaysia / Indonesia / Brunei). URL pipeline ship 2026-06-07. Animal wisdom
// fable cluster with Ch3 龜兔賽跑 / Ch4 駱駝駝峰. Trickster cycle, kin with
// Anansi / Br'er Rabbit / Reynard. 自創 A2 句式, 不引繪本/教科書/動畫.
// JSON module import = TS-native.

describe('Ch19 Sang Kancil 鼠鹿 (Maritime SEA oral folk PD)', () => {
  it('lessons-ch19.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch19raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch19 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch19raw).toHaveLength(7);
    const totalQ = (ch19raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch19 lessons all chapter=19 and id pattern kt-ch19-l*', () => {
    const arr = ch19raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(19);
      expect(arr[i].id).toBe(`kt-ch19-l${i + 1}`);
    }
  });

  it('Ch19 uses A2 child-friendly replacements (no deceive / cunning / furious)', () => {
    const raw = JSON.stringify(ch19raw);
    expect(raw).not.toMatch(/\bdeceived?\b/i);
    expect(raw).not.toMatch(/\bcunning\b/i);
    expect(raw).not.toMatch(/\boutwit\b/i);
    expect(raw).not.toMatch(/\bfurious\b/i);
    expect(raw).not.toMatch(/\bravenous\b/i);
    expect(raw).not.toMatch(/\benraged\b/i);
  });

  it('Ch19 keeps Sang Kancil oral folk plot anchors (mouse deer / crocodile / fruit / river)', () => {
    const raw = JSON.stringify(ch19raw);
    expect(raw).toMatch(/mouse deer/i);
    expect(raw).toMatch(/crocodile/i);
    expect(raw).toMatch(/fruit/i);
    expect(raw).toMatch(/river/i);
    expect(raw).toMatch(/Sang Kancil/);
  });

  it('Ch19 keeps trick theme vocab (smart / trick / lie OK for trickster tale)', () => {
    const raw = JSON.stringify(ch19raw);
    expect(raw).toMatch(/\bsmart\b/i);
  });

  it('Ch19 avoids violent action (crocodile attack / bite)', () => {
    const raw = JSON.stringify(ch19raw);
    expect(raw).not.toMatch(/\battack\w*\b/i);
    expect(raw).not.toMatch(/\bbit\b/i);
    expect(raw).not.toMatch(/\bbite\b/i);
  });
});
