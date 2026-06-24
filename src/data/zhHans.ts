// v2.0.B.395 — 繁→簡 執行時轉換 (簡體中文版).
//
// 簡中不另存字典/內容檔: 直接把現有繁中 (UI t() 輸出 + 題目 sentenceZh/explanationZh/
// optionsZh + 單字卡 gloss) 用 opencc-js 轉簡。優點: 永遠跟繁中同步、零逐句翻譯、零內容檔。
//
// 效能: opencc t2cn ≈ 38KB gzip。用 **動態 import lazy-load** — 只有切到簡中才抓,
// 繁中/英/日/韓 多數用戶的主 bundle 不揹這塊。載入前 toSimplified 先回繁中 (一瞬),
// 載好後 dispatch lang 事件 → 元件 re-render 成簡體。
import { getLang } from './lang';

let convert: ((s: string) => string) | null = null;
let loading = false;
const cache = new Map<string, string>();

// 非同步載入 opencc t2cn (繁→簡) converter; 載好後通知 UI 重繪。
function loadConverter(): void {
  if (convert || loading) return;
  loading = true;
  import('opencc-js/t2cn')
    .then((OpenCC) => {
      convert = OpenCC.Converter({ from: 'tw', to: 'cn' });
      cache.clear(); // 清掉載入前回的繁中暫值
      // 通知訂閱語言的元件重繪 (mirror lang.ts EVT)
      try { window.dispatchEvent(new Event('pickup-lang-changed')); } catch { /* SSR/無 window */ }
    })
    .catch(() => { /* 載入失敗 → 維持繁中, 不擋畫面 */ })
    .finally(() => { loading = false; });
}

// 強制繁→簡 (不看當前語言, 給 i18n.translate('zh-Hans') 用)。converter 沒好前回原字串。
export function convertTw2Cn(text: string | undefined | null): string {
  const s = text ?? '';
  if (!s) return s;
  if (!convert) { loadConverter(); return s; }
  const hit = cache.get(s);
  if (hit !== undefined) return hit;
  let out = s;
  try {
    out = convert(s);
  } catch {
    out = s;
  }
  cache.set(s, out);
  return out;
}

// 把繁中字串轉簡 (只在簡中模式)。其他語言原樣回 — 給內容元件無腦呼叫。
export function toSimplified(text: string | undefined | null): string {
  const s = text ?? '';
  if (!s || getLang() !== 'zh-Hans') return s;
  return convertTw2Cn(s);
}

// 是否目前為簡中模式。
export function isSimplified(): boolean {
  return getLang() === 'zh-Hans';
}
