// v2.0.B.282: app theme (light / dark) — bedtime night mode.
// 拾光 是睡前 app, 暗色不只護眼, 是品牌契合 (媽媽關燈哄睡時不該被亮米色螢幕打臉)。
// 套用方式: <html data-theme="dark">, token (--t-*) 自動翻色, 元件零改動。
// 預設 light; 由 Profile 切換, localStorage 持久化, window event 給 UI subscribe。
const KEY = 'pickup.theme';
const EVT = 'pickup-theme-changed';

export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
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
