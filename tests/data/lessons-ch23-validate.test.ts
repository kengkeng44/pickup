import { describe, it, expect } from 'vitest';
import ch23raw from '../../public/lessons-ch23.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.280+: Ch23 司馬光砸缸 (Sima Guang Breaks the Jar, 中華歷史民間
// 公有領域 >900 年). URL pipeline ship 2026-06-07. 司馬光 (1019-1086 CE)
// 歷史人物 + 砸缸救人民間傳說 (Song Shi 1345 CE 收錄 + 12th-c 口傳). 主題:
// 急時用聰明救人 (smart-not-strong, time-pressure decision). 智取 trio
// pair with Ch15 國王的新衣 (truth-by-child) + Ch19 Sang Kancil (small
// body smart head). 0 風險 (朋友被救出 / no death). 'drown' →
// 'could not breathe' / 'going under water'. 自創 A2 句式, 不引特定譯本
// / 教科書 / 繪本 / 動畫. JSON module import = TS-native.

describe('Ch23 司馬光砸缸 (Chinese folk legend, Song Shi 1345 CE recording, PD)', () => {
  it('lessons-ch23.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch23raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch23 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch23raw).toHaveLength(7);
    const totalQ = (ch23raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch23 lessons all chapter=23 and id pattern kt-ch23-l*', () => {
    const arr = ch23raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(23);
      expect(arr[i].id).toBe(`kt-ch23-l${i + 1}`);
    }
  });

  it('Ch23 uses A2 child-friendly replacements (no drown / died / smashed)', () => {
    const raw = JSON.stringify(ch23raw);
    expect(raw).not.toMatch(/\bdrown(ed|ing)?\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bsmashed\b/i);
    expect(raw).not.toMatch(/\bvessel\b/i);
    expect(raw).not.toMatch(/\bcistern\b/i);
    expect(raw).not.toMatch(/\bgenius\b/i);
  });

  it('Ch23 keeps Sima Guang plot anchors (jar / water / stone / break / friend)', () => {
    const raw = JSON.stringify(ch23raw);
    expect(raw).toMatch(/Sima Guang/);
    expect(raw).toMatch(/jar/i);
    expect(raw).toMatch(/water/i);
    expect(raw).toMatch(/stone/i);
    expect(raw).toMatch(/break|broke|cracked/i);
    expect(raw).toMatch(/friend/i);
  });

  it('Ch23 keeps smart-thinking-saves-life theme + China cultural anchor', () => {
    const raw = JSON.stringify(ch23raw);
    expect(raw).toMatch(/old China/);
    // smart-thinking moral line in L7
    expect(raw).toMatch(/smart thinking/i);
  });
});
