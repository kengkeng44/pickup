import { describe, it, expect } from 'vitest';
import ch14raw from '../../public/lessons-ch14.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.260: CI fix — JSON module import 對齊 ch1/ch9 pattern.

describe('Ch14 浦島太郎 (Urashima Taro, Japanese folk public domain)', () => {
  it('lessons-ch14.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch14raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch14 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch14raw).toHaveLength(7);
    const totalQ = (ch14raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch14 lessons all chapter=14 and id pattern kt-ch14-l*', () => {
    const arr = ch14raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(14);
      expect(arr[i].id).toBe(`kt-ch14-l${i + 1}`);
    }
  });

  it('Ch14 never uses "died" — Urashima transforms, does not die', () => {
    const raw = JSON.stringify(ch14raw);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bdeath\b/i);
    // Mother is 'gone', never explicitly 'dead'
    expect(raw).not.toMatch(/\bdead\b/i);
  });

  it('Ch14 uses A2-safe transformation phrasing', () => {
    const raw = JSON.stringify(ch14raw);
    // canonical user-given phrasing for the 老頭 final image
    expect(raw).toMatch(/a very old man with a long beard/);
    // sea palace / sea king A2 vocab (not '龍宮' / '龍王' romanized)
    expect(raw).toMatch(/sea palace/);
    expect(raw).toMatch(/sea king/);
  });
});
