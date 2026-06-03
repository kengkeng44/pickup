#!/usr/bin/env node
/**
 * v2.0.B.198 — Insert Mochi 自我介紹 + label speaker on every Ch1 L1 Q.
 *
 * - Insert n00 (narrator 背景) + n01 (mochi self-intro) before Q0
 * - Delete n2 (現在跟 n01 內容重複)
 * - Add speaker field to every Q in L1 (rule: contains "I"/"my"/"me" → mochi, else narrator)
 * - Q0 marked narrator (是讀者問題)
 * - Specific manual override (例如 n5/n6 改成 mochi 第一人稱)
 */
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'public', 'lessons-ch1.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const l1 = data.find(l => l.id === 'kt-ch1-l1');
if (!l1) { console.error('FAIL: kt-ch1-l1 not found'); process.exit(1); }

// ─── Step 1: 移除舊 n2 (跟 n01 重複) ───────────────────────────────────────
const n2Idx = l1.questions.findIndex(q => q.id === 'kt-ch1-l1-n2');
if (n2Idx >= 0) {
  l1.questions.splice(n2Idx, 1);
  console.log('OK   removed kt-ch1-l1-n2 (deprecated, content moved to n01)');
}

// ─── Step 2: 插入 2 個新 narration 在 Q0 前 ────────────────────────────────
const n00 = {
  type: 'narration',
  id: 'kt-ch1-l1-n00',
  level: 'A1',
  difficulty: 'easy',
  speaker: 'narrator',
  sentence: 'This is Mochi. A small cat with no home.',
  explanationZh: '這是 Mochi。一隻沒有家的小貓。',
  tags: ['story', 'ch1', 'intro', 'background'],
};
const n01 = {
  type: 'narration',
  id: 'kt-ch1-l1-n01',
  level: 'A1',
  difficulty: 'easy',
  speaker: 'mochi',
  sentence: 'Hi! I am Mochi. Every night, I visit Grandma for a story.',
  explanationZh: '嗨!我是 Mochi。每晚我都去奶奶那聽故事。',
  tags: ['story', 'ch1', 'intro', 'self-intro'],
};

// Idempotent: 若已存在則 refresh,否則 unshift
const ensureAtTop = (newQ) => {
  const existingIdx = l1.questions.findIndex(q => q.id === newQ.id);
  if (existingIdx >= 0) {
    l1.questions[existingIdx] = newQ;
    console.log(`OK   refreshed ${newQ.id}`);
  } else {
    l1.questions.unshift(newQ);
    console.log(`OK   inserted ${newQ.id} at index 0`);
  }
};

// Insert in reverse order so n00 ends up at index 0, n01 at index 1
ensureAtTop(n01);  // becomes index 0 temp
ensureAtTop(n00);  // becomes index 0, pushes n01 to 1

// ─── Step 3: 給每個 Q 加 speaker 欄位 (1st-person Mochi rule) ─────────────
// 1st-person hint: 句子有獨立 "I"/"my"/"me" (word-boundary) → mochi, else narrator
function detectSpeaker(sentence) {
  if (typeof sentence !== 'string') return 'narrator';
  const tokens = sentence.toLowerCase().split(/\W+/);
  if (tokens.includes('i') || tokens.includes('my') || tokens.includes('me')) return 'mochi';
  return 'narrator';
}

// Specific overrides — narration 中有「Tonight she...」想改成 Mochi 第一人稱的
// 但要改 sentence + audio,留給之後內容輪做。此 commit 只 set speaker。
let auto = 0;
for (const q of l1.questions) {
  if (q.speaker) continue;  // 已手設不動 (n00/n01)
  q.speaker = detectSpeaker(q.sentence);
  auto++;
}
console.log(`OK   auto-tagged ${auto} questions with speaker (rule: 1st-person → mochi else narrator)`);

// Q0 explicit override (emoji-pick 問句是「給玩家的」,narrator)
const q0 = l1.questions.find(q => q.id === 'kt-ch1-l1-q0');
if (q0) q0.speaker = 'narrator';

// Verify max 20
if (l1.questions.length > 20) {
  console.error(`FAIL: ${l1.questions.length} > schema max 20`);
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
console.log(`\n[DONE] kt-ch1-l1 now has ${l1.questions.length} questions`);

// Print final structure
console.log('\nFinal L1 sequence:');
l1.questions.forEach((q, i) => {
  console.log(`  ${i.toString().padStart(2)} ${q.id.padEnd(20)} ${q.type.padEnd(14)} ${(q.speaker||'-').padEnd(9)} ${(q.sentence||'').slice(0,55)}`);
});
