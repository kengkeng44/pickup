import { describe, it, expect } from 'vitest';
import ch22raw from '../../public/lessons-ch22.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.272+: Ch22 孟母三遷 (Mencius's Mother Moves Three Times,
// 中華歷史 + 民間傳說 public domain). URL pipeline ship 2026-06-07.
// 孟子 (372-289 BCE) 歷史人物 + 民俗 (最早見漢代《列女傳》劉向 ~16 BCE).
// 海外華人家長 #1 共鳴 (教育 / 換學區 / 為孩子搬家 heritage anchor).
// 主題: 環境塑人 + 媽媽用行動教持之以恆. 0 死亡 explicit.
// 自創 A2 句式, 不引特定譯本 / 教科書 / 動畫 / 繪本改編.
// JSON module import = TS-native.

describe('Ch22 孟母三遷 (Mencius\'s Mother, 中華歷史 + 民間傳說 PD)', () => {
  it('lessons-ch22.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch22raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch22 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch22raw).toHaveLength(7);
    const totalQ = (ch22raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch22 lessons all chapter=22 and id pattern kt-ch22-l*', () => {
    const arr = ch22raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(22);
      expect(arr[i].id).toBe(`kt-ch22-l${i + 1}`);
    }
  });

  it('Ch22 uses A2 child-friendly replacements (no graveyard / funeral / philosopher)', () => {
    const raw = JSON.stringify(ch22raw);
    expect(raw).not.toMatch(/\bgraveyard\b/i);
    expect(raw).not.toMatch(/\bfuneral\b/i);
    expect(raw).not.toMatch(/\bphilosopher\b/i);
    expect(raw).not.toMatch(/\bmourner\b/i);
    expect(raw).not.toMatch(/\bcemetery\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bdead\b/i);
  });

  it('Ch22 keeps 孟母三遷 plot anchors (mother / move / market / school / cloth / thinker)', () => {
    const raw = JSON.stringify(ch22raw);
    expect(raw).toMatch(/mother/i);
    expect(raw).toMatch(/move/i);
    expect(raw).toMatch(/market/i);
    expect(raw).toMatch(/school/i);
    expect(raw).toMatch(/cloth/i);
    expect(raw).toMatch(/thinker/i);
    expect(raw).toMatch(/Meng/);
  });

  it('Ch22 uses A2 vocab (place where people remembered family, not graveyard)', () => {
    const raw = JSON.stringify(ch22raw);
    // L1 must paraphrase graveyard via A2 framing
    expect(raw).toMatch(/place of rest|remembered family|long white lines|walk past/i);
  });
});
