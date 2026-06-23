import { describe, it, expect } from 'vitest';
import ch13raw from '../../public/lessons-ch13.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.242+: Ch13 小紅帽 URL pipeline ship 2026-06-07.
// JSON module import pattern aligned with ch1/ch9 — no fs / no @types/node.

describe('Ch13 小紅帽 (Little Red Riding Hood, Grimm KHM 26 1812 first edition, public domain)', () => {
  it('lessons-ch13.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch13raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch13 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch13raw).toHaveLength(7);
    const totalQ = (ch13raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch13 lessons all chapter=13 and id pattern kt-ch13-l*', () => {
    const arr = ch13raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(13);
      expect(arr[i].id).toBe(`kt-ch13-l${i + 1}`);
    }
  });

  it('Ch13 contains 0 Perrault 1697 / Disney / modern derivative elements', () => {
    const raw = JSON.stringify(ch13raw);
    // Disney / Hoodwinked named scenes (no overlap with Grimm plot)
    expect(raw).not.toMatch(/Hoodwinked/i);
    expect(raw).not.toMatch(/Sondheim/i);
    // 'Into the Woods' title — match capitalized title with surrounding context;
    // 'into the woods' as Grimm plot phrase is fine (lowercase).
    expect(raw).not.toMatch(/Into the Woods/);
    expect(raw).not.toMatch(/Revolting Rhymes/i);
    expect(raw).not.toMatch(/Roald Dahl/i);
    // No Perrault attribution (Grimm 1812 only)
    expect(raw).not.toMatch(/Perrault/i);
  });

  it('Ch13 uses Grimm KHM 26 1812 PD-safe child-friendly word swaps', () => {
    const raw = JSON.stringify(ch13raw);
    // 'killed' is banned — child safety
    expect(raw).not.toMatch(/\bkilled\b/i);
    // 'cut belly' / 'cut open the belly' banned — too graphic
    expect(raw).not.toMatch(/cut belly/i);
    expect(raw).not.toMatch(/cut open the belly/i);
    // 'devoured' / 'slumbered' banned per A2 vocab rule
    expect(raw).not.toMatch(/devoured/i);
    expect(raw).not.toMatch(/slumbered/i);
  });

  it('Ch13 uses required Grimm-source PD names', () => {
    const raw = JSON.stringify(ch13raw);
    // 'Little Red Riding Hood' is the Grimm English PD name (≥1884 editions)
    expect(raw).toMatch(/Little Red Riding Hood/);
    // 'big bad wolf' OK per task spec — Grimm 原典正式名稱
    expect(raw).toMatch(/big bad wolf/i);
    // 'huntsman' is the Grimm-source generic role
    expect(raw).toMatch(/huntsman/i);
  });
});
