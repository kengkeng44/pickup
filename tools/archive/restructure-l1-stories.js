#!/usr/bin/env node
/**
 * One-shot: replace kt-ch1-l1.questions with a Duolingo Stories-style
 * narration + tf-zh + listen-mc flow. Leaves L2-L24 + Ch2-Ch8 untouched.
 *
 * Story arc (Mochi jumps the low wall): 6 narration chunks interleaved
 * with 4 中文 對/錯 + 4 English blind ABCD = 14 array entries.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, '..', 'public', 'lessons-ch1.json');
const raw = readFileSync(path, 'utf-8');
const lessons = JSON.parse(raw);

const tags = ['story', 'ch1', 'narration'];
const qTags = ['story', 'ch1', 'prologue', 'smoke'];

const narration = (n, sentence) => ({
  type: 'narration',
  id: `kt-ch1-l1-n${n}`,
  level: 'A2',
  sentence,
  explanationZh: '',
  tags,
});

const tfZh = (q, sentence, questionZh, correctIndex, explanationZh) => ({
  type: 'listen-tf-zh',
  id: `kt-ch1-l1-q${q}`,
  level: 'A2',
  difficulty: 'easy',
  sentence,
  question: '(unused)',
  questionZh,
  options: ['對', '不對'],
  optionsZh: ['對,是這樣的', '不,不是這樣'],
  correctIndex,
  explanationZh,
  tags: ['story', 'ch1', 'tf-zh'],
  subSkill: 'gist',
});

const listenMc = (q, sentence, question, options, optionsZh, correctIndex, explanationZh, subSkill) => ({
  type: 'listen-mc',
  id: `kt-ch1-l1-q${q}`,
  level: 'A2',
  difficulty: 'easy',
  sentence,
  question,
  options,
  optionsZh,
  correctIndex,
  explanationZh,
  tags: qTags,
  subSkill,
});

const newQuestions = [
  // 1. Setting
  narration(1, 'It is dark and cold tonight.'),
  // 2. Mochi appears
  narration(2, '{catName} is a stray cat.'),
  // tf-zh after narration #2 — check "stray = no home"
  tfZh(
    1,
    '{catName} has no home.',
    '{catName} 是一隻有家的貓。',
    1,
    'narration 說 {catName} 是 stray cat(流浪貓),所以這句陳述「有家」是錯的。'
  ),
  // 3. No home
  narration(3, 'She has no home of her own.'),
  // tf-zh after narration #3 — check stray concept again
  tfZh(
    2,
    'She has no home of her own.',
    '{catName} 自己沒有一個家。',
    0,
    'narration 直接說 She has no home of her own,「沒有自己的家」是對的。'
  ),
  // vocab listen-mc on "stray" — classic blind ABCD
  listenMc(
    3,
    '{catName} is a stray cat with no home.',
    'What kind of cat is {catName}?',
    ['straw', 'stay', 'stray', 'story'],
    ['稻草', '留', '流浪的', '故事'],
    2,
    'stray = 流浪的(沒有固定家的)。每晚她自己找東西吃。',
    'vocab'
  ),
  // 4. Visits Grandma's yard
  narration(4, 'Every night she visits Grandma\'s small yard.'),
  // vocab listen-mc on "yard"
  listenMc(
    4,
    'Every night she visits Grandma\'s small yard.',
    'Where does {catName} go every night?',
    ['road', 'park', 'house', 'yard'],
    ['路', '公園', '房子', '院子'],
    3,
    'yard = 院子。每晚她去奶奶家的小院子落腳。',
    'detail'
  ),
  // 5. Jumps up wall
  narration(5, 'Tonight she jumps up the low wall.'),
  // vocab listen-mc on "jump"
  listenMc(
    5,
    'Tonight she jumps up the low wall.',
    'Onto the wall — what move?',
    ['run', 'walk', 'jump', 'sit'],
    ['跑', '走', '跳', '坐'],
    2,
    'jumps up = 一躍而上。輕輕一跳就上了矮牆。',
    'vocab'
  ),
  // tf-zh after narration #5 — comprehension check
  tfZh(
    6,
    'Tonight she jumps up the low wall.',
    '今晚 {catName} 跳上了矮牆。',
    0,
    'narration 說 she jumps up the low wall,「跳上矮牆」是對的。'
  ),
  // 6. Waits quietly
  narration(6, 'She waits quietly for Grandma\'s story.'),
  // tf-zh after final narration — summary
  tfZh(
    7,
    'She waits quietly for Grandma\'s story.',
    '{catName} 在矮牆上大聲叫，吵醒奶奶。',
    1,
    'narration 說 She waits quietly,「安靜地等」才對,「大聲叫」是錯的。'
  ),
  // Final summary listen-mc — gist
  listenMc(
    8,
    'She sits on the wall and waits for the story.',
    'What does {catName} do after jumping up?',
    ['leaves the yard', 'waits for the story', 'runs back home', 'looks for fish'],
    ['離開院子', '等故事開始', '跑回家', '找魚吃'],
    1,
    '她跳上矮牆後安靜地坐著,等奶奶開始說故事。',
    'gist'
  ),
];

// Surgical: only mutate L1.questions, keep everything else byte-identical.
if (lessons[0].id !== 'kt-ch1-l1') {
  console.error('FAIL: first lesson is not kt-ch1-l1');
  process.exit(1);
}
lessons[0].questions = newQuestions;

// JSON.stringify with 2-space indent matches existing file style.
const out = JSON.stringify(lessons, null, 2) + '\n';
// Write UTF-8 no BOM — Buffer.from(str,'utf8') gives raw bytes, no BOM.
writeFileSync(path, Buffer.from(out, 'utf8'));

console.log('Updated kt-ch1-l1.questions:');
console.log(`  total entries: ${newQuestions.length}`);
const dist = newQuestions.reduce((m, q) => {
  m[q.type] = (m[q.type] || 0) + 1;
  return m;
}, {});
console.log('  distribution:', dist);
console.log(`  L2 preserved: ${lessons[1].id} (${lessons[1].questions.length} Qs)`);
console.log(`  total lessons: ${lessons.length}`);
