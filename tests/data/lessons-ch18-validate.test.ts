import { describe, it, expect } from 'vitest';
import ch18raw from '../../public/lessons-ch18.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.264+: Ch18 興夫和孬夫 (Heungbu and Nolbu, Korean folk PD).
// URL pipeline ship 2026-06-07. East Asian folk trio with Ch1 桃太郎 + Ch14
// 浦島太郎. Theme: 善有善報 — 兄弟之間的選擇. 自創 A2 句式, 不引繪本/特定譯本.
// JSON module import = TS-native.

describe('Ch18 興夫和孬夫 (Heungbu and Nolbu, Korean folk PD)', () => {
  it('lessons-ch18.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch18raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch18 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch18raw).toHaveLength(7);
    const totalQ = (ch18raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch18 lessons all chapter=18 and id pattern kt-ch18-l*', () => {
    const arr = ch18raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(18);
      expect(arr[i].id).toBe(`kt-ch18-l${i + 1}`);
    }
  });

  it('Ch18 uses A2 child-friendly replacements (no died / killed / banished)', () => {
    const raw = JSON.stringify(ch18raw);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bdead\b/i);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bbanished\b/i);
    expect(raw).not.toMatch(/\binherited\b/i);
    expect(raw).not.toMatch(/\blamented\b/i);
    expect(raw).not.toMatch(/\bwretched\b/i);
    expect(raw).not.toMatch(/\bcunning\b/i);
  });

  it('Ch18 keeps canonical Korean folk plot anchors (Heungbu / Nolbu / swallow / gourd)', () => {
    const raw = JSON.stringify(ch18raw);
    expect(raw).toMatch(/Heungbu/);
    expect(raw).toMatch(/Nolbu/);
    expect(raw).toMatch(/swallow/i);
    expect(raw).toMatch(/gourd/i);
    expect(raw).toMatch(/kicked/i);
    // Nolbu punishment must be transformation, not death
    expect(raw).toMatch(/dust/i);
    // Forgiveness ending — Heungbu shares
    expect(raw).toMatch(/shared/i);
    expect(raw).toMatch(/family/i);
  });
});
