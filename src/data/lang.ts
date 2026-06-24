// v2.0.B.cron 介面語言切換 (per user 2026-06-20):
// UI 語言 zh / en 全域開關。原本「EN-only UI」rule (feedback_pickup_no_chinese_ui.md)
// 改為「使用者可選語言」, 預設 zh (主客群台灣兒童導覽友善)。
// localStorage 持久化 + window event 給 UI subscribe (mirror muteSetting.ts / comprehensionMode.ts)。
// '其他語言' (日/韓...) 預留: type 之後可擴, dict 加 key 即可。

const KEY = 'pickup.lang';
const EVT = 'pickup-lang-changed';

// v2.0.B.395 — 5 語言: 繁中 / 英 / 日 / 韓 / 簡中.
// 'zh-Hans' (簡中) 不需獨立字典 — 由 opencc 執行時把 zh(繁) 轉簡 (UI + 內容皆然).
export type UiLang = 'zh' | 'en' | 'ja' | 'ko' | 'zh-Hans';
const SUPPORTED: UiLang[] = ['zh', 'en', 'ja', 'ko', 'zh-Hans'];
const DEFAULT: UiLang = 'zh';

export function getLang(): UiLang {
  try {
    const v = localStorage.getItem(KEY) as UiLang | null;
    return v && SUPPORTED.includes(v) ? v : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function setLang(v: UiLang): void {
  try {
    localStorage.setItem(KEY, v);
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* ignore — private browsing */
  }
}

export function subscribeLang(cb: () => void): () => void {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}
