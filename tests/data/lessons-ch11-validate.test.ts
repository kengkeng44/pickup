import { describe, it, expect } from 'vitest';
import ch11raw from '../../public/lessons-ch11.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.250+: Ch11 后羿射日 (Hou Yi Shoots the Suns, 中華神話 public domain).
// Cross-POV pair with Ch10 嫦娥奔月 (same myth, Chang'e POV).
// Pattern mirrors lessons-ch9-validate.test.ts (JSON import, 0 fs deps).

describe('Ch11 后羿射日 (Hou Yi, 中華神話 public domain)', () => {
  it('lessons-ch11.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch11raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch11 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch11raw).toHaveLength(7);
    const totalQ = (ch11raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch11 lessons all chapter=11 and id pattern kt-ch11-l*', () => {
    const arr = ch11raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(11);
      expect(arr[i].id).toBe(`kt-ch11-l${i + 1}`);
    }
  });

  it('Ch11 contains 0 blood / death framing for suns (per user prompt)', () => {
    const raw = JSON.stringify(ch11raw);
    // 太陽不是 living — 禁 killed / died / slaughtered
    expect(raw).not.toMatch(/killed the sun/i);
    expect(raw).not.toMatch(/the suns? died/i);
    expect(raw).not.toMatch(/slaughter/i);
    expect(raw).not.toMatch(/sacrificed/i);
    // Hou Yi 主動放下 — 不是被罰
    expect(raw).not.toMatch(/was punished/i);
  });

  it('Ch11 uses safe folk-myth framing', () => {
    const raw = JSON.stringify(ch11raw);
    // L2 / L3 use "shoot down" or "shot" (action verb, not violence)
    expect(raw).toMatch(/[Ss]hoot/);
    // L6 uses "gave up" voluntarily
    expect(raw).toMatch(/gave up/);
  });

  it('Ch11 L7 points forward to Chang\'e (Ch10 pairing hook)', () => {
    const arr = ch11raw as Array<{ id: string; questions: Array<{ sentence?: string }> }>;
    const l7 = arr.find((l) => l.id === 'kt-ch11-l7');
    expect(l7).toBeDefined();
    const allText = JSON.stringify(l7);
    expect(allText).toMatch(/Chang/);
  });
});
