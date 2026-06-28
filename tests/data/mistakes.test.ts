import { describe, it, expect, beforeEach } from 'vitest';

if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as { localStorage: unknown }).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
}

import {
  isReviewableType,
  mistakeKey,
  buildReviewRound,
  addChapterMistake,
  readChapterMistakes,
  clearChapterMistakes,
  type ReviewQuestion,
} from '../../src/data/mistakes';

describe('mistakes — 錯題統整 (單字/文法/時態, 不含理解)', () => {
  beforeEach(() => localStorage.clear());

  it('可複習題型 = 單字/文法/時態; 理解題排除', () => {
    expect(isReviewableType('tap-pairs')).toBe(true);
    expect(isReviewableType('grammar-mc')).toBe(true);
    expect(isReviewableType('type-translate')).toBe(true);
    // 排除: 旁白 + 閱讀/聽力理解
    expect(isReviewableType('narration')).toBe(false);
    expect(isReviewableType('comprehension')).toBe(false);
    expect(isReviewableType('listen-mc')).toBe(false);
    expect(isReviewableType('listen-tf')).toBe(false);
  });

  it('mistakeKey 去掉複習後綴 → 同題去重', () => {
    expect(mistakeKey({ id: 'kt-ch1-l3-q2', type: 'grammar-mc' })).toBe('kt-ch1-l3-q2');
    expect(mistakeKey({ id: 'kt-ch1-l3-q2-rv0', type: 'grammar-mc' })).toBe('kt-ch1-l3-q2');
  });

  it('buildReviewRound 去重 + 濾掉理解題 + 給新 id', () => {
    const pool: ReviewQuestion[] = [
      { id: 'a', type: 'grammar-mc' },
      { id: 'a', type: 'grammar-mc' },     // 重複 → 去掉
      { id: 'b', type: 'comprehension' },  // 理解 → 濾掉
      { id: 'c', type: 'tap-pairs' },
    ];
    const round = buildReviewRound(pool);
    expect(round.map(q => mistakeKey(q))).toEqual(['a', 'c']);
    expect(round[0].id).toBe('a-rv0'); // 新 id 讓 renderer remount
  });

  it('沒有錯題 → 複習輪空 (題數自然減少)', () => {
    expect(buildReviewRound([])).toEqual([]);
    expect(buildReviewRound([{ id: 'x', type: 'listen-mc' }])).toEqual([]); // 全是理解 → 空
  });

  it('章末錯題庫: 累積去重 + 排除理解 + 可清空', () => {
    addChapterMistake(1, { id: 'kt-ch1-l1-q1', type: 'grammar-mc' });
    addChapterMistake(1, { id: 'kt-ch1-l1-q1', type: 'grammar-mc' }); // 重複
    addChapterMistake(1, { id: 'kt-ch1-l2-q3', type: 'tap-pairs' });
    addChapterMistake(1, { id: 'kt-ch1-l2-q9', type: 'comprehension' }); // 理解 → 不收
    const list = readChapterMistakes(1);
    expect(list.map(q => mistakeKey(q))).toEqual(['kt-ch1-l1-q1', 'kt-ch1-l2-q3']);
    clearChapterMistakes(1);
    expect(readChapterMistakes(1)).toEqual([]);
  });
});
