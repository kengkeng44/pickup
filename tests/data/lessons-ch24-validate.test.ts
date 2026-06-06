import { describe, it, expect } from 'vitest';
import ch24raw from '../../public/lessons-ch24.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.290+: Ch24 孔融讓梨 (Kong Rong Shares the Pear, 中華歷史民間,
// 公有領域 >1800 年). URL pipeline ship 2026-06-07. 孔融 (153-208 CE) 歷史
// 人物 + 讓梨民間傳說 (Pei Songzhi 5th-c. citation of 《孔融別傳》, 流傳於
// 《三字經》《二十四悌》 蒙學讀本). 主題: 分享 / 長幼有序 / 家庭體貼. 0 衝突 /
// 0 暴力 / 100% 溫馨家庭. 四歲小孩 quiet wisdom — 自己想清楚為什麼, 不是被逼.
// 兒童核心情感教育 trio with Ch20 蘿蔔大冒險 (家庭分享) + Ch22 孟母三遷 (家庭
// 教育). 自創 A2 句式, 不引特定譯本 / 蒙學課本 / 兒歌 / picture book /
// animation. JSON module import = TS-native.

describe('Ch24 孔融讓梨 (Kong Rong Shares the Pear, 中華歷史民間 PD)', () => {
  it('lessons-ch24.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch24raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch24 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch24raw).toHaveLength(7);
    const totalQ = (ch24raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch24 lessons all chapter=24 and id pattern kt-ch24-l*', () => {
    const arr = ch24raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(24);
      expect(arr[i].id).toBe(`kt-ch24-l${i + 1}`);
    }
  });

  it('Ch24 uses A2 child-friendly tone (no conflict / no violence)', () => {
    const raw = JSON.stringify(ch24raw);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bcried\b/i);
    expect(raw).not.toMatch(/\bpunished\b/i);
    expect(raw).not.toMatch(/\bforced\b/i);
    expect(raw).not.toMatch(/\bscolded\b/i);
    // A2 surface — no B1+ adult vocab
    expect(raw).not.toMatch(/\bhumble\b/i);
    expect(raw).not.toMatch(/\bvirtue\b/i);
    expect(raw).not.toMatch(/\brespectful\b/i);
    expect(raw).not.toMatch(/\bsiblings?\b/i);
    expect(raw).not.toMatch(/\beldest\b/i);
  });

  it('Ch24 keeps Kong Rong plot anchors (Kong Rong / youngest / brothers / pear / father)', () => {
    const raw = JSON.stringify(ch24raw);
    expect(raw).toMatch(/Kong Rong/);
    expect(raw).toMatch(/youngest/i);
    expect(raw).toMatch(/brothers?/i);
    expect(raw).toMatch(/pear/i);
    expect(raw).toMatch(/father/i);
  });

  it('Ch24 keeps sharing + family-order theme (small / big / should)', () => {
    const raw = JSON.stringify(ch24raw);
    expect(raw).toMatch(/small/i);
    expect(raw).toMatch(/big/i);
    expect(raw).toMatch(/should/i);
    // Kong Rong's reasoning: "I am the youngest" + "they are bigger than me"
    expect(raw).toMatch(/I am the youngest/);
    expect(raw).toMatch(/bigger than me/);
  });

  it('Ch24 stays in 中華 historical PD lane (no Disney / no modern adaptation hooks)', () => {
    const raw = JSON.stringify(ch24raw);
    expect(raw).not.toMatch(/Disney/i);
    expect(raw).not.toMatch(/Pixar/i);
    // No Chinese (Hanzi) inside English sentence/options surface — only in
    // explanationZh which is post-reveal (per pickup-story-standards.md).
    const lessons = ch24raw as Array<{ questions: Array<Record<string, unknown>> }>;
    for (const lesson of lessons) {
      for (const q of lesson.questions) {
        if (typeof q.sentence === 'string') {
          expect(q.sentence).not.toMatch(/[一-龥]/);
        }
        if (Array.isArray(q.options)) {
          for (const opt of q.options) {
            if (typeof opt === 'string') {
              expect(opt).not.toMatch(/[一-龥]/);
            }
          }
        }
      }
    }
  });
});
