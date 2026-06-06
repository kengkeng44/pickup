import { describe, it, expect } from 'vitest';
import ch26raw from '../../public/lessons-ch26.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.300+: Ch26 Archimedes' Eureka Moment (Vitruvius De architectura
// c. 25 BCE, anecdote about Archimedes 287-212 BCE, public domain worldwide
// >2200 years). URL pipeline ship 2026-06-07. 科學啟蒙 + 觀察的力量 — 兒童最愛
// 的「發現」moment. 配 Ch3 龜兔 + Ch4 駱駝 同 Greek/classical 文化分佈 band.
// A2 兒童 friendly, 0 衝突 / 0 暴力 (金匠判決原典橋段移除). 自創 A2 句式,
// 不引任何特定譯本 / 現代繪本 / 動畫. JSON module import = TS-native.

describe('Ch26 Archimedes\' Eureka Moment (Vitruvius c. 25 BCE, PD)', () => {
  it('lessons-ch26.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch26raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch26 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch26raw).toHaveLength(7);
    const totalQ = (ch26raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch26 lessons all chapter=26 and id pattern kt-ch26-l*', () => {
    const arr = ch26raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(26);
      expect(arr[i].id).toBe(`kt-ch26-l${i + 1}`);
    }
  });

  it('Ch26 uses A2 child-friendly replacements (no density / displacement / volume / mass / naked)', () => {
    const raw = JSON.stringify(ch26raw);
    expect(raw).not.toMatch(/\bdensity\b/i);
    expect(raw).not.toMatch(/\bdisplacement\b/i);
    expect(raw).not.toMatch(/\bvolume\b/i);
    expect(raw).not.toMatch(/\bmass\b/i);
    expect(raw).not.toMatch(/\bnaked\b/i);
    expect(raw).not.toMatch(/\bpondered\b/i);
    expect(raw).not.toMatch(/\bgoldsmith\b/i);
  });

  it('Ch26 keeps Vitruvius plot anchors (Archimedes / Syracuse / crown / Eureka / bath)', () => {
    const raw = JSON.stringify(ch26raw);
    expect(raw).toMatch(/Archimedes/);
    expect(raw).toMatch(/Syracuse/);
    expect(raw).toMatch(/crown/i);
    expect(raw).toMatch(/Eureka/);
    expect(raw).toMatch(/bath|tub/i);
  });

  it('Ch26 keeps king + gold + water + discovery theme', () => {
    const raw = JSON.stringify(ch26raw);
    expect(raw).toMatch(/king/i);
    expect(raw).toMatch(/gold/i);
    expect(raw).toMatch(/water/i);
    // 'I have found it' Chinese gloss in explanationZh confirms cultural anchor
    expect(raw).toMatch(/我找到了/);
  });
});
