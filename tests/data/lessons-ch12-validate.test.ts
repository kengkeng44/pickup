import { describe, it, expect } from 'vitest';
import ch12raw from '../../public/lessons-ch12.json';
import { LessonsSchema } from '../../src/data/lessons';

// v2.0.B.240+: Ch12 牛郎織女 (Cowherd & Weaver) URL pipeline ship 2026-06-07.
// JSON-import pattern follows ch9 (B.239) — 0 額外依賴, TS-native.

describe('Ch12 牛郎織女 (Cowherd & Weaver, Chinese folk public domain)', () => {
  it('lessons-ch12.json parses LessonsSchema', () => {
    const result = LessonsSchema.safeParse(ch12raw);
    if (!result.success) console.error(result.error.issues);
    expect(result.success).toBe(true);
  });

  it('Ch12 has 7 lessons × 11 Q = 77 Q', () => {
    expect(ch12raw).toHaveLength(7);
    const totalQ = (ch12raw as Array<{ questions: unknown[] }>).reduce(
      (s, l) => s + l.questions.length,
      0
    );
    expect(totalQ).toBeGreaterThanOrEqual(77);
  });

  it('Ch12 lessons all chapter=12 and id pattern kt-ch12-l*', () => {
    const arr = ch12raw as Array<{ chapter: number; id: string }>;
    for (let i = 0; i < arr.length; i++) {
      expect(arr[i].chapter).toBe(12);
      expect(arr[i].id).toBe(`kt-ch12-l${i + 1}`);
    }
  });

  it('Ch12 contains 0 adult romance vocabulary (兒童 ELT pivot)', () => {
    const raw = JSON.stringify(ch12raw);
    // 兒童化 — 不可出現成人 romance 字
    expect(raw).not.toMatch(/\bwife\b/i);
    expect(raw).not.toMatch(/\bhusband\b/i);
    expect(raw).not.toMatch(/\bfall in love\b/i);
    expect(raw).not.toMatch(/\bmarry\b/i);
    expect(raw).not.toMatch(/\bmarried\b/i);
    expect(raw).not.toMatch(/\bwedding\b/i);
    // 死亡 / 暴力字也禁
    expect(raw).not.toMatch(/\bdie\b/i);
    expect(raw).not.toMatch(/\bdied\b/i);
    expect(raw).not.toMatch(/\bkill\b/i);
    expect(raw).not.toMatch(/\bkilled\b/i);
  });

  it('Ch12 uses "magic lady" NOT "fairy" (avoid Western mix-up)', () => {
    const raw = JSON.stringify(ch12raw);
    expect(raw).toMatch(/magic lady/i);
    // 'fairy' as a noun unmodified is banned (allow 'fairy-tale' if ever needed —
    // none present in Ch12). Use word-boundary to exclude compound.
    expect(raw).not.toMatch(/\bfairy\b/i);
  });

  it('Ch12 anchors the Qixi (七夕) cultural reference', () => {
    const raw = JSON.stringify(ch12raw);
    expect(raw).toMatch(/Qixi/);
    expect(raw).toMatch(/magpie/i);
  });
});
