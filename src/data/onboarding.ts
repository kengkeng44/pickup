// v2.0.B.394 — 首次啟動 onboarding 狀態 + 本地帳號 (local-first, 無後端).
//
// 流程: 初始畫面 → 登入/註冊(本地 or 訪客) → 語言 → 程度 → 完成.
// 真雲端帳號 (跨裝置同步) 之後接 — 現在全存 localStorage, 零後端成本.
// 對齊 lang.ts / muteSetting.ts 的 localStorage + window event 模式.

import { writeDifficulty, type Difficulty } from './difficulty';

const DONE_KEY = 'pickup.onboarded';
const ACCT_KEY = 'pickup.account';

export type AccountMode = 'guest' | 'local';

export interface Account {
  name: string;        // 顯示名 / 暱稱
  mode: AccountMode;   // guest = 沒留資料; local = 有本地帳號
  email?: string;      // local 帳號可選填 (之後接雲端用)
}

export function isOnboarded(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setOnboarded(): void {
  try {
    localStorage.setItem(DONE_KEY, '1');
  } catch {
    /* ignore — private browsing */
  }
}

export function getAccount(): Account | null {
  try {
    const raw = localStorage.getItem(ACCT_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as Account;
    if (a && typeof a.name === 'string') return a;
    return null;
  } catch {
    return null;
  }
}

export function setAccount(a: Account): void {
  try {
    localStorage.setItem(ACCT_KEY, JSON.stringify(a));
  } catch {
    /* ignore */
  }
}

// onboarding 程度選擇 → 同時寫 ability level + 出題難度 (對齊既有 key).
export type OnboardLevel = 'A0' | 'A1' | 'A2' | 'A2+';

const ABILITY_KEY = 'pickup.ability.level';   // 同 LevelTest.tsx

const LEVEL_TO_DIFFICULTY: Record<OnboardLevel, Difficulty> = {
  A0: 'easy',
  A1: 'easy',
  A2: 'medium',
  'A2+': 'hard',
};

export function setLevel(level: OnboardLevel): void {
  try { localStorage.setItem(ABILITY_KEY, level); } catch { /* ignore */ }
  writeDifficulty(LEVEL_TO_DIFFICULTY[level]);
}
