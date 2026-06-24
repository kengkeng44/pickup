#!/usr/bin/env node
/**
 * v2.0.B.396 — 抽出題目「可翻譯中文欄位」成 i18n 來源骨架.
 *
 * 讀 public/lessons-ch{N}.json, 對每題抽出:
 *   s = sentenceZh, e = explanationZh, q = questionZh, o = optionsZh[], p = pairs[].left[]
 * 輸出 tools/_i18n-src/ch{N}.json = { "<qid>": {s,e,q,o,p} }  (只含存在的欄位, 值=繁中)
 *
 * 譯者 (subagent) 拿這份 → 把「值」翻成 ja/ko (結構/key 不動) → 存成
 * public/lessons-i18n/ch{N}-{lang}.json。載入時覆寫對應 *Zh 欄位 (見 lessons.ts)。
 *
 *   node tools/extract-content-i18n.cjs [chapter]   # 不給 chapter = 全部
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'tools', '_i18n-src');

function extractChapter(ch) {
  const f = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(f)) return null;
  const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
  const out = {};
  for (const lesson of arr) {
    for (const q of lesson.questions) {
      const e = {};
      if (typeof q.sentenceZh === 'string') e.s = q.sentenceZh;
      if (typeof q.explanationZh === 'string') e.e = q.explanationZh;
      if (typeof q.questionZh === 'string') e.q = q.questionZh;
      if (Array.isArray(q.optionsZh)) e.o = q.optionsZh.slice();
      if (Array.isArray(q.pairs)) e.p = q.pairs.map((pr) => pr.left);
      if (Object.keys(e).length) out[q.id] = e;
    }
  }
  return out;
}

function main() {
  const only = process.argv[2] ? Number(process.argv[2]) : null;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let total = 0;
  for (let ch = 0; ch <= 31; ch++) {
    if (only != null && ch !== only) continue;
    const data = extractChapter(ch);
    if (!data) continue;
    const dst = path.join(OUT_DIR, `ch${ch}.json`);
    fs.writeFileSync(dst, JSON.stringify(data, null, 1));
    const n = Object.keys(data).length;
    total += n;
    console.log(`ch${ch}: ${n} entries → ${path.relative(ROOT, dst)}`);
  }
  console.log(`done. ${total} translatable entries.`);
}

main();
