#!/usr/bin/env node
/**
 * v2.0.B.391 — 題庫地圖產生器 (question bank index).
 *
 * 讀 public/lessons-ch{0..N}.json + src/data/storyRegistry.ts (章名),
 * 輸出 docs/content/question-bank-index.md:
 *   - 全題庫一覽 (章數 / 節數 / 題數 / 題型分佈)
 *   - 每章一列: 檔案 / 故事 / 節數 / 題數 / 估時 / 題型分佈
 *
 * 純讀取, 不改任何題庫內容。內容改動後重跑即更新地圖。
 *   node tools/gen-bank-index.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'docs', 'content', 'question-bank-index.md');

// 估時權重 (對齊 src/data/lessons.ts estimateLessonSeconds)
const SLOW = new Set(['tap-pairs', 'phrase-pairs', 'listen-pairs', 'tap-tiles', 'listen-build', 'drag-blank', 'type-what-you-hear', 'speak-back']);
const estSec = (t) => (t === 'narration' ? 7 : SLOW.has(t) ? 26 : 16);

// 章名 (盡力從 storyRegistry.ts 抓 title, 抓不到留空)
function chapterTitles() {
  const titles = {};
  try {
    const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'storyRegistry.ts'), 'utf8');
    // 抓 { chapter: N, ... title: '...' } 形式 (容錯, 抓不到無所謂)
    const re = /chapter:\s*(\d+)[\s\S]{0,200?}?title:\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(src))) {
      const c = Number(m[1]);
      if (titles[c] == null) titles[c] = m[2];
    }
  } catch { /* 無 registry 就留空 */ }
  return titles;
}

function chapterFiles() {
  return fs
    .readdirSync(PUBLIC)
    .map((f) => f.match(/^lessons-ch(\d+)\.json$/))
    .filter(Boolean)
    .map((m) => ({ ch: Number(m[1]), file: m[0] }))
    .sort((a, b) => a.ch - b.ch);
}

function main() {
  const titles = chapterTitles();
  const files = chapterFiles();
  const rows = [];
  const grandTypes = {};
  let gLessons = 0, gEntries = 0, gReal = 0, gSec = 0;

  for (const { ch, file } of files) {
    const arr = JSON.parse(fs.readFileSync(path.join(PUBLIC, file), 'utf8'));
    const types = {};
    let real = 0, sec = 0;
    let storyId = '';
    for (const l of arr) {
      if (!storyId && l.storyId) storyId = l.storyId;
      for (const q of l.questions) {
        types[q.type] = (types[q.type] || 0) + 1;
        grandTypes[q.type] = (grandTypes[q.type] || 0) + 1;
        sec += estSec(q.type);
        if (q.type !== 'narration') real++;
      }
    }
    const minPerLesson = arr.length ? Math.round(sec / arr.length / 60 * 10) / 10 : 0;
    const dist = Object.entries(types).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join('、');
    rows.push({ ch, file, title: titles[ch] || storyId || '—', lessons: arr.length, real, minPerLesson, dist });
    gLessons += arr.length; gEntries += real + (types.narration || 0); gReal += real; gSec += sec;
  }

  const grandDist = Object.entries(grandTypes).sort((a, b) => b[1] - a[1]);
  const realTotal = grandDist.filter(([k]) => k !== 'narration').reduce((s, [, v]) => s + v, 0);

  let md = '';
  md += '# 題庫地圖 (Question Bank Index) — 自動產生\n\n';
  md += '> 由 `tools/gen-bank-index.cjs` 產生。**不要手改本檔**, 題庫變動後重跑:\n';
  md += '> `node tools/gen-bank-index.cjs`\n\n';
  md += '題庫實體 = `public/lessons-ch{0..' + (files.length - 1) + '}.json`, 一章一檔, Zod schema 驗證, CI 把關。\n';
  md += '增 / 改 / 刪題的 SOP 見 `docs/content/MAINTENANCE.md`。\n\n';
  md += '## 全題庫一覽\n\n';
  md += `- 章數: **${files.length}**　節數 (lessons): **${gLessons}**　真題 (不含旁白): **${gReal}**　旁白: **${grandTypes.narration || 0}**\n`;
  md += `- 估總時長: **約 ${Math.round(gSec / 60)} 分**　平均每節: **約 ${gLessons ? Math.round(gSec / gLessons / 60 * 10) / 10 : 0} 分**\n\n`;
  md += '### 全域題型分佈 (不含旁白)\n\n';
  md += '| 題型 | 數量 | 佔比 |\n|------|-----:|-----:|\n';
  for (const [k, v] of grandDist) {
    if (k === 'narration') continue;
    md += `| ${k} | ${v} | ${(v / realTotal * 100).toFixed(1)}% |\n`;
  }
  md += `| narration (旁白·非題) | ${grandTypes.narration || 0} | — |\n\n`;

  md += '## 每章明細\n\n';
  md += '| 章 | 檔案 | 故事 | 節數 | 真題 | 每節估時 | 題型分佈 |\n';
  md += '|---:|------|------|---:|---:|---:|------|\n';
  for (const r of rows) {
    md += `| ${r.ch} | \`${r.file}\` | ${r.title} | ${r.lessons} | ${r.real} | ~${r.minPerLesson}m | ${r.dist} |\n`;
  }
  md += '\n---\n*題型分佈標準見 `docs/standards/2026-06-22-question-distribution-standard.md`。*\n';

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, md);
  console.log(`gen-bank-index: 寫出 ${path.relative(ROOT, OUT)} (${files.length} 章 / ${gLessons} 節 / ${gReal} 真題) ✓`);
}

main();
