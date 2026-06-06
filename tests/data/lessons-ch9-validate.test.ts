import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { LessonsSchema } from '../../src/data/lessons';

describe('Ch9 灰姑娘 (Cinderella, Perrault 1697 public domain)', () => {
  it('lessons-ch9.json parses LessonsSchema', () => {
    const raw = JSON.parse(readFileSync('./public/lessons-ch9.json', 'utf-8'));
    const result = LessonsSchema.safeParse(raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });
  it('Ch9 has 7 lessons × 11 Q = 77 Q', () => {
    const raw = JSON.parse(readFileSync('./public/lessons-ch9.json', 'utf-8'));
    expect(raw).toHaveLength(7);
    const totalQ = raw.reduce((s: number, l: { questions: unknown[] }) => s + l.questions.length, 0);
    expect(totalQ).toBe(77);
  });
  it('Ch9 lessons all chapter=9 and id pattern kt-ch9-l*', () => {
    const raw = JSON.parse(readFileSync('./public/lessons-ch9.json', 'utf-8'));
    for (let i = 0; i < raw.length; i++) {
      expect(raw[i].chapter).toBe(9);
      expect(raw[i].id).toBe(`kt-ch9-l${i + 1}`);
    }
  });
  it('Ch9 contains 0 Disney 1950 elements', () => {
    const raw = readFileSync('./public/lessons-ch9.json', 'utf-8');
    expect(raw).not.toMatch(/glass slipper/i);
    expect(raw).not.toMatch(/bibbidi/i);
    expect(raw).not.toMatch(/bobbidi/i);
    expect(raw).not.toMatch(/Tremaine/);
    expect(raw).not.toMatch(/Anastasia/);
    expect(raw).not.toMatch(/Drizella/);
    expect(raw).not.toMatch(/Lucifer/);
  });
  it('Ch9 uses Perrault original fur slipper, NOT glass', () => {
    const raw = readFileSync('./public/lessons-ch9.json', 'utf-8');
    expect(raw).toMatch(/fur slipper/);
  });
});
