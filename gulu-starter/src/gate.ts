// 免費閘 (spec §8): 一天 first-try 答錯 10 題 → 咕嚕想睡, 明天再來 (或家長付費解鎖)。
// 溫柔上限, 非付費牆。算 first-try 錯, 不算 blindRetry 重試 (由 Practice 判斷後才呼叫 recordWrong)。
const K_WRONG = 'gulu.wrong.count';
const K_DATE = 'gulu.wrong.date';
export const DAILY_WRONG_CAP = 10;

function today(): string {
  // app runtime 可用 new Date (只有 workflow 腳本禁用)。
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function syncDay(): void {
  if (localStorage.getItem(K_DATE) !== today()) {
    localStorage.setItem(K_DATE, today());
    localStorage.setItem(K_WRONG, '0');
  }
}

export function wrongToday(): number {
  syncDay();
  return Number(localStorage.getItem(K_WRONG)) || 0;
}

export function canPlay(): boolean {
  return wrongToday() < DAILY_WRONG_CAP;
}

// first-try 答錯一題時呼叫。回傳新的當日錯誤數。
export function recordWrong(): number {
  syncDay();
  const n = wrongToday() + 1;
  localStorage.setItem(K_WRONG, String(n));
  return n;
}
