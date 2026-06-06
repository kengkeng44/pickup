import { describe, it, expect } from 'vitest';
import ch10raw from '../../public/lessons-ch10.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.238+: Ch10 嫦娥奔月 (Chang'e Flies to the Moon, 中華神話 public domain).
// JSON module import 對齊 ch1/ch9 pattern. tsconfig 無 @types/node 在
// tsc --noEmit 時掛, JSON import = TS-native, 0 額外依賴.

describe('Ch10 嫦娥奔月 (Chang\'e Flies to the Moon, 中華神話 public domain)', () => {
  it('lessons-ch10.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch10raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch10 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch10raw).toHaveLength(7);
    const totalQ = (ch10raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch10 lessons all chapter=10 and id pattern kt-ch10-l*', () => {
    const arr = ch10raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(10);
      expect(arr[i].id).toBe(`kt-ch10-l${i + 1}`);
    }
  });

  it('Ch10 contains 0 Disney 2020 *Over the Moon* elements', () => {
    const raw = JSON.stringify(ch10raw);
    // Disney 2020 character names
    expect(raw).not.toMatch(/Fei\s?Fei/i);
    expect(raw).not.toMatch(/Bungee/i);
    expect(raw).not.toMatch(/\bGobi\b/i);
    expect(raw).not.toMatch(/Mrs\.\s?Zhong/i);
    // Disney 2020 plot additions
    expect(raw).not.toMatch(/rocket/i);
    expect(raw).not.toMatch(/hover scooter/i);
    expect(raw).not.toMatch(/space dog/i);
  });

  it('Ch10 uses public-domain character names Chang\'e + Hou Yi', () => {
    const raw = JSON.stringify(ch10raw);
    expect(raw).toMatch(/Chang'e/);
    expect(raw).toMatch(/Hou Yi/);
  });

  it('Ch10 follows anti-violence A2 rule (no killed/stabbed/blood)', () => {
    const raw = JSON.stringify(ch10raw);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bstab(bed)?\b/i);
    expect(raw).not.toMatch(/\bblood\b/i);
    expect(raw).not.toMatch(/\bmurder/i);
    expect(raw).not.toMatch(/\bslay\b/i);
    expect(raw).not.toMatch(/\bwound(ed)?\b/i);
  });

  it('Ch10 uses A2 vocab whitelist (no B1+ banned words)', () => {
    const raw = JSON.stringify(ch10raw);
    // R3 ban list per pickup-item-writer skill
    expect(raw).not.toMatch(/\bimmortal\b/i);
    expect(raw).not.toMatch(/\bdivine\b/i);
    expect(raw).not.toMatch(/\bsacrifice\b/i);
    expect(raw).not.toMatch(/\bascend(ed)?\b/i);
    expect(raw).not.toMatch(/\bbanish(ed)?\b/i);
    expect(raw).not.toMatch(/\btreacherous\b/i);
    expect(raw).not.toMatch(/\bapprentice\b/i);
    expect(raw).not.toMatch(/\bdisciple\b/i);
  });
});
