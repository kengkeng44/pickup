#!/usr/bin/env node
/**
 * v2.0.B.195 — Render static QA HTML per chapter for offline editing.
 *
 * Output:
 *   public/qa-static.html         — index with 8 chapter cards
 *   public/qa-static-ch{1-8}.html — per-chapter Q list (game-mirror style)
 *
 * Features:
 *   - Self-contained (no fetch / no JS dependency)
 *   - Game-mirror visual (sentence card / blanks / question pill /
 *     option grid w/ correct ✓)
 *   - contenteditable on all editable fields (sentence/question/options/
 *     optionsZh/explanationZh)
 *   - 📤 Export button: collects all diffs vs original, copies to
 *     clipboard as patch instructions
 *   - 🔊 button uses WebSpeech (no MP3 lookup parity)
 *
 * Run: node tools/_render-qa-static.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const CHAPTER_TITLES = {
  1: '院子裡的第一個故事', 2: '桃太郎', 3: '醜小鴨', 4: '龜兔賽跑',
  5: '駱駝為什麼有駝峰', 6: 'Baba Yaga', 7: '六隻天鵝', 8: '葉限',
};
const BLIND_CLOZE_TYPES = new Set(['listen-mc', 'listen-comprehension', 'listen-emoji', 'read-mc-with-audio']);

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function applyDefaults(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/\{catName\}/g, 'Mochi').replace(/\{dogName\}/g, 'Hana');
}
function gameBlanks(text) {
  return applyDefaults(text).split(/\s+/).filter(Boolean).map(() => '____').join(' ');
}

const SHARED_CSS = `
<style>
:root { --bg:#f1ebe1; --card:#fff; --border:#e0d0b8; --accent:#c8a878; --accent-dark:#8b6f4a; --text:#3c2a1c; --muted:#7a6850; --correct:#7ac74a; --correct-dark:#5d9a35; }
* { box-sizing: border-box; }
html,body { margin:0; padding:0; background: var(--bg); color: var(--text);
  font-family: 'Nunito','Noto Sans TC',system-ui,-apple-system,'PingFang TC','Microsoft JhengHei',sans-serif;
  font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
header { position: sticky; top: 0; z-index: 50; background: rgba(241,235,225,0.96);
  backdrop-filter: blur(10px); border-bottom: 1.5px solid var(--border);
  padding: max(10px,env(safe-area-inset-top)) 14px 10px;
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
h1 { margin: 0; font-size: 16px; font-weight: 900; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.actions { display: flex; gap: 6px; flex: 0 0 auto; }
.btn { padding: 7px 12px; font-size: 12px; font-weight: 800; background: var(--accent);
  color: #fff; border: none; border-radius: 999px; cursor: pointer; font-family: inherit;
  -webkit-tap-highlight-color: transparent; }
.btn.secondary { background: #fffbf2; color: var(--accent-dark); border: 1.5px solid var(--border); }
main { padding: 14px; max-width: 720px; margin: 0 auto 80px; }
.lesson-block { margin-bottom: 22px; }
.lesson-head { font-size: 12px; font-weight: 800; color: var(--accent-dark);
  margin-bottom: 8px; padding: 6px 10px; background: rgba(200,168,120,0.10);
  border-radius: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.lesson-head .lesson-id { font-family: ui-monospace,Consolas,monospace; font-size: 10px;
  background: var(--accent); color: #fff; padding: 2px 7px; border-radius: 999px; font-weight: 700; }
.lesson-head .lesson-beat { color: var(--text); font-weight: 800; font-size: 13px; }
.lesson-head .meta { font-size: 9px; color: var(--muted); margin-left: auto; }
.q-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px;
  padding: 10px; margin-bottom: 6px; }
.q-head { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
.type-chip { display: inline-block; padding: 2px 8px; border-radius: 999px;
  font-size: 10px; font-weight: 900; color: #fff; letter-spacing: 0.5px; text-transform: uppercase;
  background: #94a3b8; }
.type-chip[data-type="narration"] { background: #a78bfa; }
.type-chip[data-type="listen-tf"], .type-chip[data-type="listen-tf-zh"] { background: #60a5fa; }
.type-chip[data-type="listen-mc"] { background: #f59e0b; }
.type-chip[data-type="listen-comprehension"] { background: #ef6b3d; }
.type-chip[data-type="listen-emoji"] { background: #ec4899; }
.type-chip[data-type="type-what-you-hear"] { background: #14b8a6; }
.type-chip[data-type="tap-tiles"] { background: #84cc16; }
.type-chip[data-type="tap-pairs"] { background: #3d8aae; }
.type-chip[data-type="read-mc-with-audio"] { background: #b08838; }
.q-id { font-family: ui-monospace,Consolas,monospace; font-size: 10px; color: var(--muted); }
.q-tags { font-size: 10px; color: var(--muted); margin-left: auto; }

.sentence-card { display: flex; align-items: center; gap: 10px; padding: 12px 14px;
  background: #fff7e8; border: 1.5px solid var(--accent); border-radius: 14px; margin: 6px 0 10px;
  box-shadow: inset 0 4px 0 rgba(231,164,74,0.18); }
.sentence-prose { flex:1; font-size:15px; font-weight:800; color:var(--text); line-height:1.7; }
.sentence-blanks { flex: 1; font-size: 16px; font-weight: 900; color: var(--accent-dark);
  line-height: 1.7; letter-spacing: 0.15em; font-family: ui-monospace,Consolas,monospace; }
.sentence-truth { font-size: 11px; color: var(--muted); font-style: italic; margin-top: 4px; font-weight: 600; }

.question-pill { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: #fff; border: 1.5px solid var(--border); border-bottom-width: 2.5px;
  border-radius: 12px; margin-bottom: 10px; }
.question-text { flex: 1; font-size: 15px; font-weight: 800; color: var(--text); line-height: 1.6; }

.speaker-btn { flex: 0 0 30px; height: 30px; width: 30px; padding: 0;
  background: var(--accent-dark); color: #fff; border: none; border-radius: 50%;
  cursor: pointer; font-size: 14px; line-height: 1; }

.opts { display: grid; grid-template-columns: 1fr; gap: 4px; margin-top: 4px; }
.opt { display: flex; align-items: center; gap: 8px; padding: 6px 10px;
  border-radius: 8px; background: #fef8ed; border: 1px solid var(--border); font-size: 13px; }
.opt.correct { background: #eaf6d5; border-color: var(--correct-dark);
  box-shadow: inset 3px 0 0 var(--correct-dark); }
.opt-num { flex: 0 0 18px; font-family: ui-monospace,Consolas,monospace; font-size: 11px; font-weight: 700; color: var(--muted); }
.opt-en { flex: 1; color: var(--text); font-weight: 700; }
.opt-zh { flex: 0 0 auto; font-size: 11px; color: var(--muted); font-weight: 600;
  border-left: 1px solid var(--border); padding-left: 8px; max-width: 35%; text-align: right; }
.opt.correct .opt-num::before { content: '✓ '; color: var(--correct-dark); }

.explanation { font-size: 12px; color: var(--muted); font-style: italic; margin-top: 8px;
  padding: 6px 10px; background: #fef8ed; border-left: 3px solid var(--accent); border-radius: 0 6px 6px 0; }

[contenteditable="true"] { outline: none; }
[contenteditable="true"]:focus { background: #fef3c7; border-radius: 3px; padding: 0 2px; margin: 0 -2px; }
[contenteditable="true"][data-dirty="1"] { background: #fde0d2; }
.dirty-badge { display:none; position:fixed; bottom: 16px; right: 16px; z-index: 60;
  padding: 10px 14px; background: var(--accent); color: #fff; border-radius: 999px;
  font-weight: 900; font-size: 12px; box-shadow: 0 4px 16px rgba(60,42,28,0.25); }
.dirty-badge.show { display: inline-flex; gap: 8px; align-items: center; }

.toast { position: fixed; bottom: 70px; left: 50%; transform: translateX(-50%); z-index: 70;
  padding: 10px 14px; background: var(--text); color: #fff; border-radius: 8px;
  font-size: 12px; font-weight: 700; opacity: 0; pointer-events: none;
  transition: opacity 200ms; }
.toast.show { opacity: 1; }
</style>
`;

const SHARED_JS = `
<script>
// Track edits + compute diff
const original = window.__QA_ORIGINAL__ || {};
const dirtyFields = new Map(); // 'qId|field|idx' -> { old, new }

function fieldKey(qId, field, idx) {
  return idx !== undefined ? qId + '|' + field + '|' + idx : qId + '|' + field;
}
function recordEdit(el) {
  const qId = el.dataset.qid;
  const field = el.dataset.field;
  const idx = el.dataset.idx;
  if (!qId || !field) return;
  const k = fieldKey(qId, field, idx);
  const oldVal = original[k];
  const newVal = el.textContent.trim();
  if (oldVal !== undefined && oldVal !== newVal) {
    dirtyFields.set(k, { old: oldVal, new: newVal, qId, field, idx });
    el.dataset.dirty = '1';
  } else {
    dirtyFields.delete(k);
    delete el.dataset.dirty;
  }
  updateBadge();
}
function updateBadge() {
  const badge = document.getElementById('dirty-badge');
  const count = dirtyFields.size;
  if (count > 0) {
    badge.classList.add('show');
    badge.textContent = '✏️ ' + count + ' 處改動 · 點 📤 export';
  } else {
    badge.classList.remove('show');
  }
}
function exportDiffs() {
  if (dirtyFields.size === 0) { toast('沒有改動'); return; }
  const lines = ['# Pickup QA 改動 ' + new Date().toISOString().slice(0,16)];
  const byQ = {};
  for (const [, d] of dirtyFields) {
    byQ[d.qId] = byQ[d.qId] ?? [];
    byQ[d.qId].push(d);
  }
  for (const qId of Object.keys(byQ).sort()) {
    lines.push('');
    lines.push('## ' + qId);
    for (const d of byQ[qId]) {
      const field = d.idx !== undefined ? d.field + '[' + d.idx + ']' : d.field;
      lines.push('- ' + field + ': "' + d.old + '" → "' + d.new + '"');
    }
  }
  const text = lines.join('\\n');
  navigator.clipboard.writeText(text).then(() => {
    toast('✅ 已複製到剪貼簿 (貼給 Claude)');
  }).catch(() => {
    prompt('複製此文字貼給 Claude:', text);
  });
}
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function speak(text) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch {}
}
document.addEventListener('input', (e) => {
  if (e.target.hasAttribute('contenteditable')) recordEdit(e.target);
});
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('speaker-btn')) speak(e.target.dataset.speak);
});
</script>
`;

// v2.0.B.199: speaker badge mapping (game-mirror)
const SPEAKER_META = {
  mochi:    { emoji: '🐱', label: 'Mochi',   bg: '#fed7aa', fg: '#9a3412' },
  grandma:  { emoji: '👵', label: 'Grandma', bg: '#fef3c7', fg: '#78350f' },
  hana:     { emoji: '🐕', label: 'Hana',    bg: '#f5e6d3', fg: '#6b4226' },
  narrator: { emoji: '📖', label: '背景',    bg: '#e5e7eb', fg: '#4b5563' },
};
function renderSpeakerBadge(speaker) {
  const meta = SPEAKER_META[speaker] || SPEAKER_META.narrator;
  return `<span style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:999px;background:${meta.bg};color:${meta.fg};font-size:10px;font-weight:800;letter-spacing:.3px;margin-right:6px;"><span style="font-size:12px;">${meta.emoji}</span>${meta.label}</span>`;
}

function renderQCard(q, original) {
  const isBlind = BLIND_CLOZE_TYPES.has(q.type);
  const speakText = escapeHtml(applyDefaults(q.sentence || ''));
  const tags = (q.tags || []).join(', ');
  const subSkill = q.subSkill ? ` · ${q.subSkill}` : '';
  const diff = q.difficulty ? ` · ${q.difficulty}` : '';
  const level = q.level ? ` · L${q.level}` : '';

  const parts = [];
  parts.push(`<div class="q-card">`);
  parts.push(`<div class="q-head">`);
  parts.push(renderSpeakerBadge(q.speaker));
  parts.push(`<span class="type-chip" data-type="${escapeHtml(q.type)}">${escapeHtml(q.type)}</span>`);
  parts.push(`<span class="q-id">${escapeHtml(q.id)}</span>`);
  parts.push(`<span class="q-tags">${escapeHtml(tags + subSkill + level + diff)}</span>`);
  parts.push(`</div>`);

  // Sentence
  if (q.sentence) {
    parts.push(`<div class="sentence-card">`);
    parts.push(`<button class="speaker-btn" data-speak="${speakText}">🔊</button>`);
    if (isBlind) {
      parts.push(`<div style="flex:1;">`);
      parts.push(`<div class="sentence-blanks">${escapeHtml(gameBlanks(q.sentence))}</div>`);
      const editableId = `${q.id}|sentence`;
      original[editableId] = applyDefaults(q.sentence);
      parts.push(`<div class="sentence-truth">答案: <span contenteditable="true" data-qid="${q.id}" data-field="sentence">${escapeHtml(applyDefaults(q.sentence))}</span></div>`);
      parts.push(`</div>`);
    } else {
      const editableId = `${q.id}|sentence`;
      original[editableId] = applyDefaults(q.sentence);
      parts.push(`<div class="sentence-prose" contenteditable="true" data-qid="${q.id}" data-field="sentence">${escapeHtml(applyDefaults(q.sentence))}</div>`);
    }
    parts.push(`</div>`);
  }

  // Question
  const qP = q.question || q.questionEn;
  if (qP) {
    const speakQ = escapeHtml(applyDefaults(qP));
    const editableId = `${q.id}|question`;
    original[editableId] = applyDefaults(qP);
    parts.push(`<div class="question-pill">`);
    parts.push(`<button class="speaker-btn" data-speak="${speakQ}">🔊</button>`);
    parts.push(`<div class="question-text" contenteditable="true" data-qid="${q.id}" data-field="question">${escapeHtml(applyDefaults(qP))}</div>`);
    parts.push(`</div>`);
  }

  // Options
  if (Array.isArray(q.options) && q.options.length > 0) {
    parts.push(`<div style="margin-bottom:6px; font-size:10px; font-weight:900; color:var(--muted); letter-spacing:.5px; text-transform:uppercase;">Options · 正解 #${q.correctIndex}</div>`);
    parts.push(`<div class="opts">`);
    for (let i = 0; i < q.options.length; i++) {
      const isCorrect = i === q.correctIndex;
      original[`${q.id}|options|${i}`] = applyDefaults(q.options[i] ?? '');
      original[`${q.id}|optionsZh|${i}`] = q.optionsZh?.[i] ?? '';
      parts.push(`<div class="opt${isCorrect ? ' correct' : ''}">`);
      parts.push(`<span class="opt-num">${i}</span>`);
      parts.push(`<span class="opt-en" contenteditable="true" data-qid="${q.id}" data-field="options" data-idx="${i}">${escapeHtml(applyDefaults(q.options[i]))}</span>`);
      if (q.optionsZh?.[i]) {
        parts.push(`<span class="opt-zh" contenteditable="true" data-qid="${q.id}" data-field="optionsZh" data-idx="${i}">${escapeHtml(q.optionsZh[i])}</span>`);
      }
      parts.push(`</div>`);
    }
    parts.push(`</div>`);
  }

  // listen-tf answer
  if (q.type === 'listen-tf' || q.type === 'listen-tf-zh') {
    parts.push(`<div style="margin-top:6px; font-size:12px;">正解: <strong style="color:${q.answer === 'T' ? 'var(--correct-dark)' : '#a82020'}">${q.answer === 'T' ? '✓ TRUE' : '✗ FALSE'}</strong></div>`);
  }

  // Explanation
  if (q.explanationZh) {
    original[`${q.id}|explanationZh`] = applyDefaults(q.explanationZh);
    parts.push(`<div class="explanation" contenteditable="true" data-qid="${q.id}" data-field="explanationZh">${escapeHtml(applyDefaults(q.explanationZh))}</div>`);
  }

  parts.push(`</div>`);
  return parts.join('');
}

function renderChapter(ch, lessons) {
  const original = {};
  const lessonsHtml = [];
  for (const lesson of lessons) {
    const introZh = lesson.intro?.zh ? applyDefaults(lesson.intro.zh).slice(0, 80) : '';
    lessonsHtml.push(`<div class="lesson-block">`);
    lessonsHtml.push(`<div class="lesson-head">`);
    lessonsHtml.push(`<span class="lesson-id">${escapeHtml(lesson.id)}</span>`);
    if (lesson.storyBeat) lessonsHtml.push(`<span class="lesson-beat">${escapeHtml(applyDefaults(lesson.storyBeat))}</span>`);
    if (introZh) lessonsHtml.push(`<span class="meta">${escapeHtml(introZh)}</span>`);
    lessonsHtml.push(`</div>`);
    for (const q of (lesson.questions || [])) {
      lessonsHtml.push(renderQCard(q, original));
    }
    lessonsHtml.push(`</div>`);
  }

  return `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<title>Pickup QA Ch${ch} ${CHAPTER_TITLES[ch] || ''} — Static</title>
${SHARED_CSS}
</head>
<body>
<header>
  <h1>📖 Ch${ch} · ${escapeHtml(CHAPTER_TITLES[ch] || '')}</h1>
  <div class="actions">
    <button class="btn" onclick="exportDiffs()">📤 export 改動</button>
    <a class="btn secondary" href="qa-static.html">← 索引</a>
  </div>
</header>
<main>
${lessonsHtml.join('\n')}
</main>
<div id="dirty-badge" class="dirty-badge"></div>
<div id="toast" class="toast"></div>
<script>window.__QA_ORIGINAL__ = ${JSON.stringify(original)};</script>
${SHARED_JS}
</body>
</html>`;
}

function renderIndex(stats) {
  const cards = stats.map(s => `
    <a class="ch-card" href="qa-static-ch${s.ch}.html">
      <div class="ch-num">Ch${s.ch}</div>
      <div class="ch-title">${escapeHtml(CHAPTER_TITLES[s.ch] || '')}</div>
      <div class="ch-stats">${s.lessons} lessons · ${s.questions} Q</div>
    </a>
  `).join('');

  return `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<title>Pickup QA Static — Index</title>
${SHARED_CSS}
<style>
.ch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.ch-card { display: block; padding: 16px; background: #fff;
  border: 1.5px solid var(--border); border-radius: 14px;
  border-bottom: 4px solid var(--accent-dark);
  text-decoration: none; color: var(--text);
  box-shadow: inset 0 4px 0 rgba(231,164,74,0.10);
  transition: transform 100ms; }
.ch-card:hover, .ch-card:active { transform: translateY(-2px); }
.ch-num { font-family: ui-monospace,Consolas,monospace; font-size: 11px; font-weight: 800; color: var(--accent-dark); }
.ch-title { font-size: 18px; font-weight: 900; color: var(--text); margin-top: 4px; }
.ch-stats { font-size: 11px; color: var(--muted); margin-top: 6px; font-weight: 600; }
.note { background: #fff7e8; border: 1px solid var(--accent);
  border-radius: 10px; padding: 12px 14px; margin-bottom: 14px;
  font-size: 12px; color: var(--text); line-height: 1.6; }
.note strong { color: var(--accent-dark); }
</style>
</head>
<body>
<header>
  <h1>📚 Pickup QA Static — Index</h1>
  <a class="btn secondary" href="qa-dashboard">← 動態版</a>
</header>
<main>
  <div class="note">
    <strong>編輯流程</strong><br>
    1. 點任一章節進入靜態頁<br>
    2. 任何字 (sentence / question / option / explanation) 都可直接點下去編輯<br>
    3. 改完按右下角 <strong>📤 export 改動</strong> 按鈕 → 自動 copy 改動清單到剪貼簿<br>
    4. 貼給 Claude → 我跑 script 改 JSON + regen 靜態頁
  </div>
  <div class="ch-grid">${cards}</div>
</main>
</body>
</html>`;
}

// ─── Main ───────────────────────────────────────────────────────────────
const stats = [];
for (const ch of CHAPTERS) {
  const filePath = path.join(PUBLIC, `lessons-ch${ch}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP ch${ch}: ${filePath} not found`);
    continue;
  }
  const lessons = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const html = renderChapter(ch, lessons);
  const outPath = path.join(PUBLIC, `qa-static-ch${ch}.html`);
  fs.writeFileSync(outPath, html, 'utf-8');
  const qCount = lessons.reduce((s, l) => s + (l.questions?.length || 0), 0);
  stats.push({ ch, lessons: lessons.length, questions: qCount, size: Buffer.byteLength(html) });
  console.log(`OK   ch${ch}: ${lessons.length} lessons / ${qCount} Q → ${outPath} (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
}

const indexHtml = renderIndex(stats);
fs.writeFileSync(path.join(PUBLIC, 'qa-static.html'), indexHtml, 'utf-8');
console.log(`\nOK index → public/qa-static.html (${stats.length} chapters)`);
console.log(`Total: ${stats.reduce((s, x) => s + x.questions, 0)} Q across ${stats.reduce((s, x) => s + x.lessons, 0)} lessons`);
