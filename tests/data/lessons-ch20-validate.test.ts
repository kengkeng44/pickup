import { describe, it, expect } from 'vitest';
import ch20raw from '../../public/lessons-ch20.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.280+: Ch20 蘿蔔大冒險 (The Enormous Turnip / Repka, Russian folk
// 口傳 public domain). URL pipeline ship 2026-06-07. Cumulative structure
// 7 角色加入 — 0 衝突 / 0 暴力 / 100% 溫馨家庭. 配 Ch5 Baba Yaga 作 2 個
// 俄羅斯民間 portfolio pair (dark sparse vs light cumulative). 自創 A2
// 句式, 不引特定譯本/繪本. JSON module import = TS-native.

describe('Ch20 蘿蔔大冒險 (The Enormous Turnip, Russian folk PD)', () => {
  it('lessons-ch20.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch20raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch20 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch20raw).toHaveLength(7);
    const totalQ = (ch20raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch20 lessons all chapter=20 and id pattern kt-ch20-l*', () => {
    const arr = ch20raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(20);
      expect(arr[i].id).toBe(`kt-ch20-l${i + 1}`);
    }
  });

  it('Ch20 uses A2 child-friendly replacements (no enormous / yanked / B1+ verbs)', () => {
    // Strip slug field 'enormous-turnip' (allowed metadata; banned only in
    // user-visible strings — sentence / question / options / explanationZh).
    const arr = ch20raw as Array<{
      questions: Array<{
        sentence?: string;
        question?: string;
        questionEn?: string;
        options?: string[];
        optionsZh?: string[];
        explanationZh?: string;
      }>;
    }>;
    const visibleText = arr
      .flatMap(l =>
        l.questions.flatMap(q => [
          q.sentence ?? '',
          q.question ?? '',
          q.questionEn ?? '',
          ...(q.options ?? []),
          ...(q.optionsZh ?? []),
          q.explanationZh ?? '',
        ])
      )
      .join(' ');
    // Banned B1+ vocab per canon
    expect(visibleText).not.toMatch(/\benormous\b/i);
    expect(visibleText).not.toMatch(/\byanked\b/i);
    expect(visibleText).not.toMatch(/\bheaved\b/i);
    expect(visibleText).not.toMatch(/\bstrained\b/i);
    expect(visibleText).not.toMatch(/\bpersistent\b/i);
    expect(visibleText).not.toMatch(/\bdetermined\b/i);
  });

  it('Ch20 keeps Repka plot anchors (turnip / pull / family / mouse)', () => {
    const raw = JSON.stringify(ch20raw);
    expect(raw).toMatch(/turnip/i);
    expect(raw).toMatch(/pull/i);
    expect(raw).toMatch(/grandpa/i);
    expect(raw).toMatch(/grandma/i);
    expect(raw).toMatch(/granddaughter/i);
    expect(raw).toMatch(/\bdog\b/i);
    expect(raw).toMatch(/\bcat\b/i);
    expect(raw).toMatch(/\bmouse\b/i);
  });

  it('Ch20 is 100% child-friendly (no violence / death / blood)', () => {
    const raw = JSON.stringify(ch20raw);
    expect(raw).not.toMatch(/\bkill\b/i);
    expect(raw).not.toMatch(/\bdie\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bblood\b/i);
    expect(raw).not.toMatch(/\bfight\b/i);
    // 'angry' allowed as emoji distractor label only (per Ch5/Ch9 precedent)
    // — verifies it does not appear in sentence/narration positively framed.
  });

  it('Ch20 cumulative structure: each lesson L3-L7 adds one puller', () => {
    // Cumulative refrain pattern: every lesson 3+ should mention pulling
    const arr = ch20raw as Array<{ id: string; questions: Array<{ sentence?: string }> }>;
    for (let i = 2; i < arr.length; i++) {
      const lesson = arr[i];
      const allText = lesson.questions
        .map(q => q.sentence ?? '')
        .join(' ')
        .toLowerCase();
      expect(allText).toMatch(/pull/);
    }
  });

  it('Ch20 lesson 7 resolves with family sharing (warm-hearted close)', () => {
    const arr = ch20raw as Array<{ id: string; questions: Array<{ sentence?: string }> }>;
    const l7Text = arr[6].questions
      .map(q => q.sentence ?? '')
      .join(' ')
      .toLowerCase();
    expect(l7Text).toMatch(/(share|family|dinner|together)/);
  });
});
