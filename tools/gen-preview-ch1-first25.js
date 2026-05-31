#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync('public/lessons-ch1.json', 'utf-8'));
const flat = [];
for (const lesson of data) {
  for (const q of lesson.questions ?? []) {
    flat.push({
      lessonId: lesson.id,
      lesson: lesson.lessonInChapter,
      storyBeat: lesson.storyBeat,
      ...q,
    });
    if (flat.length >= 25) break;
  }
  if (flat.length >= 25) break;
}

function escape(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let body = '';
let lastLesson = null;
for (const q of flat) {
  if (q.lesson !== lastLesson) {
    body += `<div class="lesson-divider">Lesson ${q.lesson} — ${escape(q.storyBeat ?? '')}</div>\n`;
    lastLesson = q.lesson;
  }
  const diffClass = `diff-${q.difficulty ?? 'easy'}`;
  const opts = q.options ?? [];
  // Reorder for review: correct first, then 3 distractors in original order.
  // Preserves "正解最先" preview readability without affecting game JSON.
  const reordered = q.correctIndex != null && opts.length === 4
    ? [opts[q.correctIndex], ...opts.filter((_, i) => i !== q.correctIndex)]
    : opts;
  const optsHtml = reordered
    .map((o, i) => `<div class="opt ${i === 0 ? 'correct' : ''}">${escape(o)}</div>`)
    .join('');
  body += `
    <div class="q">
      <div class="q-head">
        <span>${q.id} · L${q.lesson}</span>
        <span><span class="q-type">${q.type}</span> <span class="q-difficulty ${diffClass}">${q.difficulty ?? 'easy'}</span></span>
      </div>
      <div class="sentence">${escape(q.sentence)}</div>
      <div class="question">${escape(q.question)}</div>
      <div class="options">${optsHtml}</div>
      <div class="expl">${escape(q.explanationZh)}</div>
    </div>
  `;
}

const html = `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<title>Pickup Ch1 前 25 題 Preview</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:'Noto Sans TC',system-ui,-apple-system,sans-serif;max-width:720px;margin:0 auto;padding:20px;background:#fef8ed;color:#3c2a1c;line-height:1.6;}
h1{color:#8b6f4a;border-bottom:3px solid #e7a44a;padding-bottom:8px;}
.q{background:#fff;border:2px solid #e7a44a;border-left-width:6px;border-radius:12px;padding:16px;margin:18px 0;}
.q-head{display:flex;justify-content:space-between;color:#7a6850;font-size:12px;font-weight:800;letter-spacing:.5px;margin-bottom:8px;align-items:center;}
.q-type{background:#3d8aae;color:#fff;padding:2px 8px;border-radius:8px;font-size:11px;margin-right:6px;}
.q-difficulty{padding:2px 8px;border-radius:8px;font-size:11px;color:#fff;}
.diff-easy{background:#7d9a4f;}.diff-medium{background:#e7a44a;}.diff-hard{background:#c84a3a;}
.sentence{font-size:17px;font-weight:800;margin:8px 0;color:#3c2a1c;}
.question{font-size:15px;font-weight:700;color:#5a4830;margin:8px 0;font-style:italic;}
.options{display:flex;flex-direction:column;gap:6px;margin:8px 0;}
.opt{padding:8px 14px;border:1.5px solid #d0c5a8;border-radius:10px;background:#fafafa;}
.opt.correct{background:#7d9a4f;color:#fff;font-weight:800;border-color:#5a7a35;}
.opt.correct::before{content:'✓ ';}
.expl{margin-top:10px;padding:10px 14px;background:rgba(231,164,74,.08);border-left:3px solid #e7a44a;font-size:13px;color:#6a5440;border-radius:6px;line-height:1.7;}
.lesson-divider{margin-top:30px;padding:10px 14px;background:#e7a44a;color:#fff;font-weight:900;border-radius:8px;letter-spacing:.5px;font-size:15px;}
.intro{color:#7a6850;font-style:italic;background:#fff4d4;padding:12px 16px;border-radius:10px;border:1.5px dashed #e7a44a;margin-bottom:20px;}
</style>
</head>
<body>
<h1>Pickup Ch1 雨夜小貓 — 前 25 題 Preview</h1>
<div class="intro">
從 lessons-ch1.json 拉的前 25 題。<br>
✓ 標的是正解。distractor 是 3 個誤導選項(同類陷阱 / 部分事實陷阱 / 離題陷阱)。<br>
<strong>explanationZh</strong> 是 Mochi 視角的中文解釋 + 雙語關鍵字。
</div>
${body}
</body>
</html>`;

writeFileSync('public/preview-ch1-first25.html', html);
console.log('OK', flat.length, 'questions written to public/preview-ch1-first25.html');
console.log('Lessons covered:', [...new Set(flat.map((q) => q.lesson))].join(','));
