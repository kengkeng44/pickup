import { describe, it, expect } from 'vitest';
import ch17raw from '../../public/lessons-ch17.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.266: CI fix — JSON module import 對齊 ch1/ch9/ch14 pattern.

describe('Ch17 鶴的報恩 (Tsuru no Ongaeshi, Japanese folk public domain)', () => {
  it('lessons-ch17.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch17raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch17 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch17raw).toHaveLength(7);
    const totalQ = (ch17raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch17 lessons all chapter=17 and id pattern kt-ch17-l*', () => {
    const arr = ch17raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(17);
      expect(arr[i].id).toBe(`kt-ch17-l${i + 1}`);
    }
  });

  it('Ch17 never uses "died" — crane flies away, does not die', () => {
    const raw = JSON.stringify(ch17raw);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bdeath\b/i);
    expect(raw).not.toMatch(/\bdead\b/i);
    expect(raw).not.toMatch(/\bkilled\b/i);
  });

  it('Ch17 never uses "wife" / "husband" / "marry" — child-friendly framing', () => {
    const raw = JSON.stringify(ch17raw);
    // 兒童化規則: 'wife' → companion / family framing
    expect(raw).not.toMatch(/\bwife\b/i);
    expect(raw).not.toMatch(/\bhusband\b/i);
    expect(raw).not.toMatch(/\bmarry\b/i);
    expect(raw).not.toMatch(/\bmarried\b/i);
    expect(raw).not.toMatch(/\bwedding\b/i);
  });

  it('Ch17 uses A2-safe phrasing for the crane truth-reveal beat', () => {
    const raw = JSON.stringify(ch17raw);
    // canonical user-given phrasing for the feather-pulling moment (non-blood)
    expect(raw).toMatch(/pulling her own feathers|pulled her own feathers/);
    // Closing image: crane flies away to the sky (NOT dies / gives up)
    expect(raw).toMatch(/flew up/);
    // L1 setup uses 'old man' (not 'old grandfather' / 'ancient')
    expect(raw).toMatch(/old man/);
    // Forbidden-room rule (A2 simple, no archaic 'forbade thee')
    expect(raw).toMatch(/never look/);
  });
});
