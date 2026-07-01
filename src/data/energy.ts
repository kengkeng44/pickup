// v2.0.B.539 — 每日體力 (daily play energy) — 免費版每日配額 gate。
//
// per user (2026-07-01) 決策:
//   1. 「答對率」= first-try (第一次就對的比例, 不是 blindRetry 到最後的 100%)
//   2. 每天配額 (daily quota) — 隔天刷新體力
//   3. 觸牆 = 溫柔提示 + 家長解鎖入口 (不焦慮、不紅色)
//
// 迴圈 (獎勵導向, 非懲罰):
//   - 進一個 lesson 消耗 1 體力。
//   - 一節 first-try 正確率 ≥ BONUS_ACCURACY → +1 體力 (做得好就能持續玩)。
//   - 連續 UNLIMITED_STREAK 節都達標 → 當日「不限」(全對一直玩下去)。
//   - 隔天 (日期變) → 體力刷新回 DAILY_QUOTA, 連續達標歸零, 解除不限。
//
// ⚠️ 這是「每日配額」概念, 跟 hp.ts (每節愛心, 純視覺) 不同, 兩者獨立。
// 數字皆為可調常數 (per user「具體數字先上再依 UX 微調」)。

export const DAILY_QUOTA = 5;        // 免費版每日可玩關數
export const BONUS_ACCURACY = 0.9;   // 一節 first-try ≥ 90% → +1 體力
export const UNLIMITED_STREAK = 3;   // 連續 3 節達標 → 當日不限
export const ENERGY_CAP = 10;        // 體力上限 (加碼不無限囤積)

const KEY_COUNT = 'pickup.energy.count';
const KEY_DATE = 'pickup.energy.date';
const KEY_UNLIMITED = 'pickup.energy.unlimited';
const KEY_STREAK = 'pickup.energy.goalStreak';
const EVT = 'pickup-energy-changed';

function today(): string {
  // local date YYYY-MM-DD (app runtime; only workflow scripts forbid new Date())
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, v: string): void {
  try { localStorage.setItem(key, v); } catch { /* private mode */ }
}

// 日期換天 → 刷新。回傳「當日狀態」的 raw。
function ensureToday(): { count: number; unlimited: boolean; streak: number } {
  if (read(KEY_DATE) !== today()) {
    write(KEY_DATE, today());
    write(KEY_COUNT, String(DAILY_QUOTA));
    write(KEY_UNLIMITED, '0');
    write(KEY_STREAK, '0');
  }
  const count = Math.max(0, Math.min(ENERGY_CAP, parseInt(read(KEY_COUNT) || String(DAILY_QUOTA), 10) || 0));
  const unlimited = read(KEY_UNLIMITED) === '1';
  const streak = parseInt(read(KEY_STREAK) || '0', 10) || 0;
  return { count, unlimited, streak };
}

function emit(): void {
  try { window.dispatchEvent(new Event(EVT)); } catch { /* SSR/none */ }
}

export interface EnergyState { count: number; unlimited: boolean; quota: number }

export function getEnergy(): EnergyState {
  const { count, unlimited } = ensureToday();
  return { count, unlimited, quota: DAILY_QUOTA };
}

/** 還能不能開始一節 (有體力 或 當日不限)。 */
export function canPlay(): boolean {
  const { count, unlimited } = ensureToday();
  return unlimited || count > 0;
}

/** 進一節 → 消耗 1 體力 (不限日不扣)。回傳是否成功 (false = 沒體力)。 */
export function spendEnergy(): boolean {
  const { count, unlimited } = ensureToday();
  if (unlimited) return true;
  if (count <= 0) return false;
  write(KEY_COUNT, String(count - 1));
  emit();
  return true;
}

function grantEnergy(n: number): void {
  const { count } = ensureToday();
  write(KEY_COUNT, String(Math.min(ENERGY_CAP, count + n)));
  emit();
}

/**
 * 一節結束時呼叫, 依 first-try 正確率決定加碼。
 * - rate ≥ BONUS_ACCURACY → 連續達標 +1, 並 +1 體力
 * - 連續達標 ≥ UNLIMITED_STREAK → 當日不限
 * - 未達標 → 連續歸零
 */
export function onLessonResult(firstTryRate: number): void {
  const { streak } = ensureToday();
  if (firstTryRate >= BONUS_ACCURACY) {
    const next = streak + 1;
    write(KEY_STREAK, String(next));
    if (next >= UNLIMITED_STREAK) { write(KEY_UNLIMITED, '1'); }
    grantEnergy(1);
  } else {
    write(KEY_STREAK, '0');
  }
  emit();
}

export function subscribeEnergy(cb: () => void): () => void {
  try { window.addEventListener(EVT, cb); } catch { /* none */ }
  return () => { try { window.removeEventListener(EVT, cb); } catch { /* none */ } };
}
