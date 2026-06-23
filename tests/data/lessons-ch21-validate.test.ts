import { describe, it, expect } from 'vitest';
import ch21raw from '../../public/lessons-ch21.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.270+: Ch21 Anansi the Spider (West African Akan/Ashanti oral folk,
// public domain). URL pipeline ship 2026-06-07. 智取 trickster underdog pair
// with Ch19 Sang Kancil. 起源神話: 為什麼每個家都聽得到故事. A2 兒童 friendly,
// 0 風險 (三個動物都 'gave up and went home' / 'caught safely', 沒有任何動物
// 被殺). 自創 A2 句式, 不引 Gerald McDermott 1972 picture book / Disney /
// 任何 modern adaptation. JSON module import = TS-native.

describe('Ch21 Anansi the Spider (Akan/Ashanti oral tradition, PD)', () => {
  it('lessons-ch21.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch21raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch21 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch21raw).toHaveLength(7);
    const totalQ = (ch21raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch21 lessons all chapter=21 and id pattern kt-ch21-l*', () => {
    const arr = ch21raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(21);
      expect(arr[i].id).toBe(`kt-ch21-l${i + 1}`);
    }
  });

  it('Ch21 uses A2 child-friendly replacements (no killed / strangled / trapped)', () => {
    const raw = JSON.stringify(ch21raw);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bstrangled\b/i);
    expect(raw).not.toMatch(/\btrapped\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bcunning\b/i);
  });

  it('Ch21 keeps Akan/Ashanti plot anchors (Nyame / hornet / python / leopard / story)', () => {
    const raw = JSON.stringify(ch21raw);
    expect(raw).toMatch(/Nyame/);
    expect(raw).toMatch(/hornet/i);
    expect(raw).toMatch(/python/i);
    expect(raw).toMatch(/leopard/i);
    expect(raw).toMatch(/story|stories/i);
    expect(raw).toMatch(/Anansi/);
  });

  it('Ch21 keeps Sky God + smart-not-strength theme', () => {
    const raw = JSON.stringify(ch21raw);
    expect(raw).toMatch(/Sky God/);
    // smart-head-not-strong-arms moral line in L6
    expect(raw).toMatch(/head is big/i);
  });
});
