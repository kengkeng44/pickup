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

// v2.0.B.204: 刪原 Ch1 (rainy-night-cat) + Ch2-8 renumber 成 Ch1-7
// Intro → Ch1 桃太郎 → Ch2 醜小鴨 → ... → Ch7 葉限
// v2.0.B.236+: Ch9 灰姑娘 (Cinderella Perrault 1697) URL pipeline ship.
// v2.0.B.250+: Ch10 嫦娥奔月 + Ch11 后羿射日 (中華神話 cross-POV pair, public
// domain). URL pipeline ship 2026-06-07.
// v2.0.B.260+: Ch14 浦島太郎 (Urashima Taro, Japanese folk PD) URL pipeline
// ship 2026-06-07. Japanese folk pair with Ch1 桃太郎.
// v2.0.B.242+: Ch13 小紅帽 (Little Red Riding Hood, Grimm KHM 26 1812 first
// edition, PD) URL pipeline ship 2026-06-07. NO Perrault 1697 / Disney /
// Hoodwinked / Sondheim / Dahl. 3rd 兒童安全教育 trio with Ch1/Ch6.
// v2.0.B.264+: Ch18 興夫和孬夫 (Heungbu and Nolbu, Korean folk PD) URL pipeline
// ship 2026-06-07. East Asian folk trio with Ch1 桃太郎 + Ch14 浦島太郎.
// v2.0.B.266+: Ch19 鼠鹿 Sang Kancil (Maritime SEA oral folk PD — Malaysia /
// Indonesia / Brunei) URL pipeline ship 2026-06-07. Trickster animal cycle.
// v2.0.B.270+: Ch21 Anansi the Spider (West African Akan/Ashanti oral folk
// PD) URL pipeline ship 2026-06-07. Trickster cycle pair with Ch19.
// v2.0.B.300+: Ch25 愚公移山 (Yu Gong Moves the Mountains, 列子《湯問》春秋戰國
// classical parable PD >2000 年) URL pipeline ship 2026-06-07. 堅持 + 家庭主題,
// 子子孫孫無窮匱, 配 Ch20 cumulative-family genre. Slot 22-24 covered by
// sibling ship (孟母三遷 / 司馬光砸缸 / 孔融讓梨 中華 heritage 三部曲).
// v2.0.B.300+: Ch26 Archimedes' Eureka Moment (Vitruvius c. 25 BCE PD,
// anecdote about Archimedes 287-212 BCE >2200 年). URL pipeline ship
// 2026-06-07. 科學啟蒙 + 觀察的力量 — 兒童最愛的「發現」moment.
const CHAPTERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const CHAPTER_TITLES = {
  0: 'Intro · 認識 Mochi 與奶奶',
  1: '桃太郎', 2: '醜小鴨', 3: '龜兔賽跑',
  4: '駱駝為什麼有駝峰', 5: 'Baba Yaga', 6: '六隻天鵝', 7: '葉限',
  8: '三隻小豬',
  9: '灰姑娘',
  10: '嫦娥奔月',
  11: '后羿射日',
  12: '牛郎織女',
  13: '小紅帽',
  14: '浦島太郎',
  15: '國王的新衣',
  16: '一寸法師',
  17: '鶴的報恩',
  18: '興夫和孬夫',
  19: 'Sang Kancil 鼠鹿',
  20: '蘿蔔大冒險',
  21: 'Anansi 蜘蛛',
  22: '孟母三遷',
  23: '司馬光砸缸',
  24: '孔融讓梨',
  25: '愚公移山',
  26: 'Archimedes 阿基米德',
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
.lesson-block { margin-bottom: 28px; }

/* v2.0.B.203: lesson-head 拉大 — 22px 字級 + amber 背景倍量,跟 Q cards
   形成明顯層次,user 一眼看出「這是小節標題」vs「這是題目卡」 */
.lesson-head {
  font-size: 22px; font-weight: 900; color: var(--accent-dark);
  margin-bottom: 12px; padding: 14px 18px;
  background: linear-gradient(135deg, #fff7e8 0%, rgba(231,164,74,0.18) 100%);
  border: 1.5px solid var(--accent);
  border-radius: 14px;
  box-shadow: inset 0 4px 0 rgba(231,164,74,0.25);
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}
.lesson-head .lesson-id { font-family: ui-monospace,Consolas,monospace; font-size: 11px;
  background: var(--accent); color: #fff; padding: 4px 10px; border-radius: 999px; font-weight: 800; }
.lesson-head .lesson-beat { color: var(--text); font-weight: 900; font-size: 18px; flex: 1; min-width: 0; }
.lesson-head .meta { font-size: 11px; color: var(--muted); font-weight: 700;
  background: rgba(255,255,255,0.5); padding: 3px 9px; border-radius: 999px; }
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
.type-chip[data-type="emoji-pick"] { background: #ec4899; }
.type-chip[data-type="grammar-mc"] { background: #7c3aed; }
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
    // v2.0.B.207: display Ch{N}-{L} convention (e.g. Ch1-1, Ch1-2) instead of raw id
    const displayId = `Ch${ch}-${lesson.lessonInChapter}`;
    const qCount = (lesson.questions || []).length;
    lessonsHtml.push(`<div class="lesson-block" id="L${lesson.lessonInChapter}">`);
    lessonsHtml.push(`<div class="lesson-head">`);
    lessonsHtml.push(`<span class="lesson-id">${escapeHtml(displayId)}</span>`);
    if (lesson.storyBeat) lessonsHtml.push(`<span class="lesson-beat">${escapeHtml(applyDefaults(lesson.storyBeat))}</span>`);
    lessonsHtml.push(`<span class="meta">${qCount}Q · ${escapeHtml(lesson.segmentType)}</span>`);
    if (introZh) lessonsHtml.push(`<div style="flex:1 1 100%; font-size:11px; color:var(--muted); margin-top:4px; font-weight:600;">${escapeHtml(introZh)}</div>`);
    // internal id 小字附在底下,給人工查 debug
    lessonsHtml.push(`<div style="flex:1 1 100%; font-family:ui-monospace,Consolas,monospace; font-size:9px; color:var(--muted); opacity:0.55; margin-top:2px;">${escapeHtml(lesson.id)}</div>`);
    lessonsHtml.push(`</div>`);
    for (const q of (lesson.questions || [])) {
      lessonsHtml.push(renderQCard(q, original));
    }
    lessonsHtml.push(`</div>`);
  }

  // v2.0.B.363 (per user A): 小章節快速跳 — Ch{N}-1 / -2 … 按鈕列, 點了跳到該 lesson.
  const jumpNav = lessons.map((l) =>
    `<a class="lesson-jump" href="#L${l.lessonInChapter}">Ch${ch}-${l.lessonInChapter}</a>`
  ).join('');

  return `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<title>Pickup QA Ch${ch} ${CHAPTER_TITLES[ch] || ''} — Static</title>
${SHARED_CSS}
<style>
.lesson-jump-bar { position: sticky; top: 0; z-index: 40; display: flex; flex-wrap: wrap; gap: 6px;
  padding: 8px 12px; background: rgba(241,235,225,0.97); border-bottom: 1px solid var(--border); }
.lesson-jump { font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 999px;
  background: #fff; border: 1.5px solid var(--accent-dark); color: var(--accent-dark); text-decoration: none; }
.lesson-jump:active { background: var(--accent-dark); color: #fff; }
.lesson-block { scroll-margin-top: 52px; }
</style>
</head>
<body>
<header>
  <h1>📖 Ch${ch} · ${escapeHtml(CHAPTER_TITLES[ch] || '')}</h1>
  <div class="actions">
    <button class="btn" onclick="exportDiffs()">📤 export 改動</button>
    <a class="btn secondary" href="qa-static.html">← 索引</a>
  </div>
</header>
<div class="lesson-jump-bar">📑 小章節:${jumpNav}</div>
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

// v2.0.B.355: 題型分佈總覽 — 索引最上方. 每章一列: 按鈕(lessons) 數 + 各題型計數 chip.
// narration 是旁白不算題, 標灰提示. listen-mc 佔比 > 40% 時標紅旗 (依分佈標準 §5).
function renderDistribution(stats) {
  const NON_Q = new Set(['narration']);
  const rows = stats.map(s => {
    const tc = s.typeCounts || {};
    const qTotal = Object.entries(tc).reduce((n, [t, c]) => n + (NON_Q.has(t) ? 0 : c), 0);
    const chips = Object.entries(tc)
      .sort((a, b) => b[1] - a[1])
      .map(([t, c]) => {
        const isNarr = NON_Q.has(t);
        const pct = !isNarr && qTotal ? Math.round((c / qTotal) * 100) : null;
        const over = t === 'listen-mc' && pct !== null && pct > 40;
        return `<span class="type-chip" data-type="${escapeHtml(t)}" style="${isNarr ? 'opacity:.45;' : ''}${over ? 'outline:2px solid #c84a3a;' : ''}">${escapeHtml(t)} ${c}${pct !== null ? ` · ${pct}%` : ''}${over ? ' 🚩' : ''}</span>`;
      }).join(' ');
    return `<tr>
      <td style="white-space:nowrap;font-weight:800;"><a href="qa-static-ch${s.ch}.html" style="color:var(--accent-dark);text-decoration:none;">Ch${s.ch}</a></td>
      <td style="white-space:nowrap;font-weight:800;text-align:center;">${s.lessons}</td>
      <td style="white-space:nowrap;text-align:center;color:var(--muted);">${qTotal}</td>
      <td style="line-height:2;">${chips}</td>
    </tr>`;
  }).join('');
  return `
  <div class="dist-wrap">
    <h2 style="font-size:15px;font-weight:900;margin:0 0 4px;">📊 題型分佈總覽</h2>
    <div style="font-size:11px;color:var(--muted);margin-bottom:8px;">每章「按鈕數(lessons)」+ 各題型計數/佔比(不含旁白 narration)。🚩 = listen-mc &gt; 40%(依分佈標準偏食)。標準見 <code>docs/standards/2026-06-22-question-distribution-standard.md</code>。</div>
    <table class="dist-table">
      <thead><tr><th>章</th><th>按鈕</th><th>題數</th><th>題型分佈</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
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
.dist-wrap { background:#fff; border:1.5px solid var(--border); border-radius:14px; padding:14px 16px; margin-bottom:16px; }
.dist-table { width:100%; border-collapse:collapse; font-size:11px; }
.dist-table th { text-align:left; font-size:10px; color:var(--muted); border-bottom:1.5px solid var(--border); padding:4px 8px; }
.dist-table td { border-bottom:1px solid #eee2cf; padding:6px 8px; vertical-align:top; }
.dist-table code { font-size:10px; }
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
  ${renderDistribution(stats)}
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
  // v2.0.B.355 (per user): per-chapter 題型分佈 — 索引最上方總覽用.
  const typeCounts = {};
  for (const l of lessons) {
    for (const q of (l.questions || [])) {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    }
  }
  stats.push({ ch, lessons: lessons.length, questions: qCount, typeCounts, size: Buffer.byteLength(html) });
  console.log(`OK   ch${ch}: ${lessons.length} lessons / ${qCount} Q → ${outPath} (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
}

const indexHtml = renderIndex(stats);
fs.writeFileSync(path.join(PUBLIC, 'qa-static.html'), indexHtml, 'utf-8');
console.log(`\nOK index → public/qa-static.html (${stats.length} chapters)`);
console.log(`Total: ${stats.reduce((s, x) => s + x.questions, 0)} Q across ${stats.reduce((s, x) => s + x.lessons, 0)} lessons`);
