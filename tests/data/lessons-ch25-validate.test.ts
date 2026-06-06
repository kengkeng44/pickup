import { describe, it, expect } from 'vitest';
import ch25raw from '../../public/lessons-ch25.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.300+: Ch25 愚公移山 (Yu Gong Moves the Mountains, 列子《湯問》春秋戰國
// classical Chinese parable, public domain >2000 years). URL pipeline ship
// 2026-06-07. 堅持 + 家庭主題, 配 Ch20 蘿蔔大冒險 同 cumulative-family genre
// (大家輪流加入). 自創 A2 句式, 不引特定譯本/繪本/動畫. 兒童 friendly:
// '子子孫孫無窮匱' → 'family will go on forever and ever'; 'sky gods' →
// 'kind giants from above'; 'die' → 'after you are gone'; '愚公' → 'old man
// called Yu Gong' (不 'foolish'). 0 死亡 / 0 衝突 / 0 暴力. JSON module
// import = TS-native.

describe('Ch25 愚公移山 (列子《湯問》 classical Chinese parable, PD >2000 yr)', () => {
  it('lessons-ch25.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch25raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch25 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch25raw).toHaveLength(7);
    const totalQ = (ch25raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBe(77);
  });

  it('Ch25 lessons all chapter=25 and id pattern kt-ch25-l*', () => {
    const arr = ch25raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(25);
      expect(arr[i].id).toBe(`kt-ch25-l${i + 1}`);
    }
  });

  it('Ch25 uses A2 child-friendly replacements (no die / death / killed / foolish)', () => {
    const raw = JSON.stringify(ch25raw);
    expect(raw).not.toMatch(/\bdie\b/i);
    expect(raw).not.toMatch(/\bdeath\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bkilled\b/i);
    expect(raw).not.toMatch(/\bfoolish\b/i);
    expect(raw).not.toMatch(/\bsky gods?\b/i);
    expect(raw).not.toMatch(/heavenly emperor/i);
  });

  it('Ch25 keeps Yu Gong plot anchors (Yu Gong / mountains / baskets / sons / grandsons / river)', () => {
    const raw = JSON.stringify(ch25raw);
    expect(raw).toMatch(/Yu Gong/);
    expect(raw).toMatch(/mountain/i);
    expect(raw).toMatch(/basket/i);
    expect(raw).toMatch(/sons/i);
    expect(raw).toMatch(/grandsons/i);
    expect(raw).toMatch(/river/i);
  });

  it('Ch25 keeps perseverance + family forever theme', () => {
    const raw = JSON.stringify(ch25raw);
    // 子子孫孫無窮匱 兒童化 paraphrase
    expect(raw).toMatch(/forever and ever/i);
    // sky gods → kind giants
    expect(raw).toMatch(/kind giants/i);
    // day-by-day persistence motif
    expect(raw).toMatch(/day by day/i);
  });

  it('Ch25 all 7 lessons are main-story segmentType and storyId yugong', () => {
    const arr = ch25raw as Array<{ segmentType: string; storyId: string }>;
    for (const l of arr) {
      expect(l.segmentType).toBe('main-story');
      expect(l.storyId).toBe('yugong');
    }
  });
});
