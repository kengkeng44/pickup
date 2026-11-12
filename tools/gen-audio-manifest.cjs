/**
 * 產生 public/audio/lessons/manifest.json —— 實際有出貨的 mp3 檔名清單 (不含 .mp3)。
 *
 * 為什麼: 題目 ID 改名後音檔沒跟上, tts.ts 查表命中卻抓不到檔, Pages 的 SPA fallback
 * 回 index.html (200) → 解碼失敗 + 白跑請求 + SW 把 HTML 當 mp3 快取。
 * tts.ts 讀這份清單, 不在清單裡的句子直接走 WebSpeech。
 *
 * 跑時機: npm run build 前段自動跑; 新增 / 刪除 mp3 後也可手動 `node tools/gen-audio-manifest.cjs`。
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'audio', 'lessons');
const names = fs.readdirSync(dir)
  .filter((f) => f.endsWith('.mp3'))
  .map((f) => f.slice(0, -4))
  .sort();
const out = path.join(dir, 'manifest.json');
const next = JSON.stringify(names) + '\n';
if (!fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== next) fs.writeFileSync(out, next);
console.log(`[gen-audio-manifest] ${names.length} mp3 → ${path.relative(process.cwd(), out)}`);
