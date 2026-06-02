#!/usr/bin/env node
/**
 * v2.0.B.197 — Insert Ch1 hook Q0 + update n1 narration for 3-sec hook UX.
 *
 * Idempotent: if Q0 already exists, refresh content; else insert at index 0.
 * Updates n1 sentence + explanationZh for tighter emotional bridge.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'public', 'lessons-ch1.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

const l1 = data.find(l => l.id === 'kt-ch1-l1');
if (!l1) { console.error('FAIL: kt-ch1-l1 not found'); process.exit(1); }

const Q0 = {
  type: 'emoji-pick',
  id: 'kt-ch1-l1-q0',
  level: 'A1',
  difficulty: 'easy',
  sentence: 'Mochi is hungry. What can feed her?',
  question: 'What can feed her?',
  options: ['🐟 fish', '🍬 candy', '🍎 apple', '🥛 milk'],
  optionsZh: ['魚', '糖', '蘋果', '牛奶'],
  correctIndex: 0,
  explanationZh: 'Mochi 開心地吃了。她想跟你說個故事…',
  tags: ['story', 'ch1', 'hook'],
  subSkill: 'vocab',
};

// Idempotent insert
let q0Idx = l1.questions.findIndex(q => q.id === 'kt-ch1-l1-q0');
if (q0Idx >= 0) {
  l1.questions[q0Idx] = Q0;
  console.log('OK   refreshed kt-ch1-l1-q0');
} else {
  l1.questions.unshift(Q0);
  console.log('OK   inserted kt-ch1-l1-q0 at index 0');
}

// Update n1 for emotional bridge
const n1 = l1.questions.find(q => q.id === 'kt-ch1-l1-n1');
if (n1) {
  n1.sentence = 'It is dark and cold tonight. I am hungry.';
  n1.explanationZh = '今晚又黑又冷。我餓了。';
  console.log('OK   updated kt-ch1-l1-n1 sentence + explanationZh');
} else {
  console.log('WARN kt-ch1-l1-n1 not found, n1 update skipped');
}

// Schema constraint: questions array max 15. Verify after insert.
if (l1.questions.length > 15) {
  console.error(`FAIL: kt-ch1-l1 now has ${l1.questions.length} questions (schema max 15)`);
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
console.log(`\n[DONE] kt-ch1-l1 now has ${l1.questions.length} questions`);
