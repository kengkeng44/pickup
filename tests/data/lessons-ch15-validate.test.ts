import { describe, it, expect } from 'vitest';
import ch15raw from '../../public/lessons-ch15.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.262+: Ch15 國王的新衣 (Andersen 1837 public domain).
// URL pipeline ship 2026-06-07. 智取主題, A2 兒童 friendly, 0 風險.
// 自創 A2 句式, 不引特定譯本延伸段落. JSON module import = TS-native.

describe('Ch15 國王的新衣 (Emperor\'s New Clothes, Andersen 1837 PD)', () => {
  it('lessons-ch15.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch15raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch15 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch15raw).toHaveLength(7);
    const totalQ = (ch15raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch15 lessons all chapter=15 and id pattern kt-ch15-l*', () => {
    const arr = ch15raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(15);
      expect(arr[i].id).toBe(`kt-ch15-l${i + 1}`);
    }
  });

  it('Ch15 uses A2 child-friendly replacements (no naked / stupid)', () => {
    const raw = JSON.stringify(ch15raw);
    expect(raw).not.toMatch(/\bnaked\b/i);
    expect(raw).not.toMatch(/\bstupid\b/i);
    expect(raw).not.toMatch(/\bswindlers?\b/i);
    expect(raw).not.toMatch(/\bmagnificent\b/i);
    expect(raw).not.toMatch(/\bprocession\b/i);
  });

  it('Ch15 keeps Andersen 1837 plot anchors (cloth / parade / child)', () => {
    const raw = JSON.stringify(ch15raw);
    expect(raw).toMatch(/cloth/i);
    expect(raw).toMatch(/parade/i);
    expect(raw).toMatch(/child/i);
    expect(raw).toMatch(/no clothes/i);
  });
});
