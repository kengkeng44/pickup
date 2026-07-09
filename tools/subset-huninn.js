#!/usr/bin/env node
/**
 * jf 粉圓 open-huninn subset 管線 (v2.0.B.579)。
 * 內容新增後若出現 subset 外的字 (畫面 fallback 成 Noto), 重跑本管線:
 *   1. curl -sL -o /tmp/huninn.ttf https://raw.githubusercontent.com/justfont/open-huninn-font/master/font/jf-openhuninn-2.1.ttf
 *   2. npm i --no-save subset-font
 *   3. node tools/subset-huninn.js /tmp/huninn.ttf
 * 輸出: public/fonts/jf-openhuninn-sub.woff2 + tools/huninn-charset.txt (掃描結果)。
 * 授權: SIL OFL 1.1 (justfont open-huninn)。
 */
const fs = require('fs'), path = require('path');
const ttfPath = process.argv[2];
if (!ttfPath) { console.error('用法: node tools/subset-huninn.js <ttf 路徑>'); process.exit(1); }
const chars = new Set();
const addText = (s) => { for (const ch of String(s)) chars.add(ch); };
const walk = (o) => { if (typeof o === 'string') addText(o); else if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') Object.values(o).forEach(walk); };
const pub = path.resolve(__dirname, '../public');
for (const f of fs.readdirSync(pub)) if (f.endsWith('.json')) walk(JSON.parse(fs.readFileSync(path.join(pub, f), 'utf8')));
for (const f of fs.readdirSync(pub + '/lessons-i18n')) if (f.endsWith('.json')) walk(JSON.parse(fs.readFileSync(path.join(pub, 'lessons-i18n', f), 'utf8')));
const walkSrc = (dir) => { for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f); const st = fs.statSync(p); if (st.isDirectory()) walkSrc(p); else if (/\.(tsx?|css|html)$/.test(f)) addText(fs.readFileSync(p, 'utf8')); } };
walkSrc(path.resolve(__dirname, '../src'));
addText(fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8'));
for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c));
for (let c = 0x3040; c <= 0x30ff; c++) chars.add(String.fromCharCode(c));
for (const c of '。,、!?:;「」『』(){}—…·・×÷%+-=→←↑↓⭐🔒') chars.add(c);
const text = [...chars].join('');
fs.writeFileSync(path.join(__dirname, 'huninn-charset.txt'), text);
require('subset-font')(fs.readFileSync(ttfPath), text, { targetFormat: 'woff2' }).then((buf) => {
  fs.writeFileSync(path.join(pub, 'fonts/jf-openhuninn-sub.woff2'), buf);
  console.log('chars:', chars.size, '→ woff2', (buf.length / 1024).toFixed(0), 'KB');
});
