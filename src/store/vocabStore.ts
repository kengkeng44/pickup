/**
 * vocabStore — 玩家自選單字卡 (單字庫) 資料層.
 *
 * v2.0.B.365 (per user): 課程中點句子裡的字 → tooltip 出現「＋」→ 收進個人單字庫.
 * 一般玩家上限 100 張; 超過要付費 (premium flag, 目前 stub — 之後接 paywall).
 *
 * - localStorage 持久化 (key: pickup.vocab.v1). 純 client-side, 零後端.
 * - Zustand store → React (圖鑑單字庫區塊) 用 hook; 非 React 模組 (WordHint DOM
 *   tooltip) 用 `vocab.*` 同步 helper (getState).
 * - normalize: 小寫 + 去標點, 同一個字只存一張 (river / River / "river." 視為同一張).
 *
 * 之後要接真正付費: 把 setPremium(true) 接到 IAP / 後端授權即可, 其餘不動.
 */
import { create } from 'zustand';

export interface VocabCard {
  /** normalized lookup key (lowercase, no punctuation) */
  word: string;
  /** original-case word for display */
  display: string;
  /** Chinese gloss (from word-hints dict at save time) */
  zh: string;
  /** epoch ms when saved */
  addedAt: number;
  /** optional provenance: lesson id / chapter, for future "where I learned it" */
  source?: string;
}

const LS_KEY = 'pickup.vocab.v1';
const PREMIUM_KEY = 'pickup.vocab.premium';

/** 免費玩家單字卡上限. 超過需 premium. */
export const FREE_CARD_CAP = 100;

export type AddResult = { ok: true } | { ok: false; reason: 'exists' | 'cap' | 'empty' };

function normalize(word: string): string {
  return String(word || '').toLowerCase().replace(/[.,!?;:"'()，。、！？；：「」『』]/g, '').trim();
}

function loadCards(): VocabCard[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
function saveCards(cards: VocabCard[]): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(cards)); } catch { /* quota / private mode — silent */ }
}
function loadPremium(): boolean {
  try { return localStorage.getItem(PREMIUM_KEY) === '1'; } catch { return false; }
}

interface VocabState {
  cards: VocabCard[];
  premium: boolean;
  /** 加入單字庫. 回傳成功與否 + 失敗原因 (已存在 / 達上限). */
  add: (word: string, zh: string, source?: string) => AddResult;
  /** 移除一張 (依 normalize key). */
  remove: (word: string) => void;
  /** 是否已收藏. */
  has: (word: string) => boolean;
  /** 是否已達免費上限 (premium 則永不達). */
  capReached: () => boolean;
  /** 解鎖 premium (之後接 IAP / 後端). */
  setPremium: (v: boolean) => void;
}

export const useVocabStore = create<VocabState>((set, get) => ({
  cards: loadCards(),
  premium: loadPremium(),

  add: (word, zh, source) => {
    const key = normalize(word);
    if (!key) return { ok: false, reason: 'empty' };
    const { cards, premium } = get();
    if (cards.some((c) => c.word === key)) return { ok: false, reason: 'exists' };
    if (!premium && cards.length >= FREE_CARD_CAP) return { ok: false, reason: 'cap' };
    const next = [...cards, { word: key, display: word, zh, addedAt: Date.now(), source }];
    saveCards(next);
    set({ cards: next });
    return { ok: true };
  },

  remove: (word) => {
    const key = normalize(word);
    const next = get().cards.filter((c) => c.word !== key);
    saveCards(next);
    set({ cards: next });
  },

  has: (word) => {
    const key = normalize(word);
    return get().cards.some((c) => c.word === key);
  },

  capReached: () => {
    const { cards, premium } = get();
    return !premium && cards.length >= FREE_CARD_CAP;
  },

  setPremium: (v) => {
    try { localStorage.setItem(PREMIUM_KEY, v ? '1' : '0'); } catch { /* silent */ }
    set({ premium: v });
  },
}));

/**
 * 同步 helper 給非 React 模組用 (e.g. WordHint DOM tooltip).
 * React 元件請用 useVocabStore() hook 以取得 reactive 更新.
 */
export const vocab = {
  add: (word: string, zh: string, source?: string): AddResult => useVocabStore.getState().add(word, zh, source),
  remove: (word: string): void => useVocabStore.getState().remove(word),
  has: (word: string): boolean => useVocabStore.getState().has(word),
  capReached: (): boolean => useVocabStore.getState().capReached(),
  count: (): number => useVocabStore.getState().cards.length,
};
