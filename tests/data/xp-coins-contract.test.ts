/**
 * P19 — XP / Coins formula as a frozen contract.
 *
 * Two layers:
 *  1. src/data/xp.ts pure curve functions (importable, tested directly).
 *  2. The lesson-complete award formula (correct×10 XP / correct×3 coins,
 *     v2.0.B.192) lives INLINE in src/react-app/pages/LessonPage.tsx
 *     (CompletePanel) — not an importable pure module, and importing the
 *     .tsx page would drag React/window deps into node-env vitest. So it
 *     is locked as a source-text contract instead: if someone changes the
 *     multiplier or extracts the formula, this test fails and must be
 *     updated deliberately (that's the point of a frozen contract).
 */
import { describe, it, expect } from 'vitest';
import { levelForXp, xpForLevel, levelProgress } from '../../src/data/xp';

// Read LessonPage source as raw text via Vite glob (no node:fs; keeps tsc
// green under types:["vite/client"]).
const LESSONPAGE_SRC = import.meta.glob(
  '../../src/react-app/pages/LessonPage.tsx',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

describe('XP level curve (src/data/xp.ts) — frozen contract', () => {
  it('levelForXp follows floor(sqrt(xp/50)) + 1', () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(49)).toBe(1);
    expect(levelForXp(50)).toBe(2);
    expect(levelForXp(199)).toBe(2);
    expect(levelForXp(200)).toBe(3);
    expect(levelForXp(450)).toBe(4);
    expect(levelForXp(800)).toBe(5);
    expect(levelForXp(1250)).toBe(6);
    expect(levelForXp(1800)).toBe(7);
  });

  it('levelForXp clamps negative xp to level 1', () => {
    expect(levelForXp(-100)).toBe(1);
  });

  it('xpForLevel is the inverse threshold: xpForLevel(levelForXp(x)) <= x', () => {
    expect(xpForLevel(1)).toBe(0);
    expect(xpForLevel(2)).toBe(50);
    expect(xpForLevel(3)).toBe(200);
    expect(xpForLevel(4)).toBe(450);
    for (const xp of [0, 49, 50, 123, 200, 449, 450, 999, 5000]) {
      const lvl = levelForXp(xp);
      expect(xpForLevel(lvl)).toBeLessThanOrEqual(xp);
      expect(xpForLevel(lvl + 1)).toBeGreaterThan(xp);
    }
  });

  it('levelProgress fraction is 0 at level start and < 1 just before level-up', () => {
    const atStart = levelProgress(50); // exactly L2 start
    expect(atStart.level).toBe(2);
    expect(atStart.intoLevel).toBe(0);
    expect(atStart.fraction).toBe(0);

    const nearEnd = levelProgress(199); // 1 XP before L3
    expect(nearEnd.level).toBe(2);
    expect(nearEnd.fraction).toBeGreaterThan(0.9);
    expect(nearEnd.fraction).toBeLessThan(1);
  });
});

describe('lesson-complete award formula (LessonPage.tsx) — source-text contract', () => {
  // v2.0.B.192: correct×10 XP + correct×3 coins. Inline in CompletePanel;
  // see header comment for why this is a text-level lock.
  const src = Object.values(LESSONPAGE_SRC)[0] ?? '';

  it('XP award is still correct * 10', () => {
    expect(src).toMatch(/const\s+xp\s*=\s*correct\s*\*\s*10\b/);
  });

  it('coin award is still correct * 3', () => {
    expect(src).toMatch(/const\s+coinDelta\s*=\s*correct\s*\*\s*3\b/);
  });

  it('both awards are persisted via addXp/addCoins', () => {
    expect(src).toMatch(/addXp\(xp\)/);
    expect(src).toMatch(/addCoins\(coinDelta\)/);
  });
});
