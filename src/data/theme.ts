// v2.0.B.282: app theme (light / dark) — bedtime night mode.
// 故事燈 是睡前 app, 暗色不只護眼, 是品牌契合 (媽媽關燈哄睡時不該被亮米色螢幕打臉)。
// 套用方式: <html data-theme="dark">, token (--t-*) 自動翻色, 元件零改動。
// v2.0.B.558 (per user「其他全部都要改」): 預設改 dark — 故事燈夜色是全 app 的臉。
// 明確存過 'light' 的玩家保留亮色; 設定的夜間模式開關照常可切。
const KEY = 'pickup.theme';
const EVT = 'pickup-theme-changed';

export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
}

export function applyTheme(theme: Theme = getTheme()): void {
  try { document.documentElement.setAttribute('data-theme', theme); } catch {}
}

export function setTheme(t: Theme): void {
  try { localStorage.setItem(KEY, t); } catch {}
  applyTheme(t);
  try { window.dispatchEvent(new Event(EVT)); } catch {}
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function subscribeThemeChange(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
