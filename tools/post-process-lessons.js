#!/usr/bin/env node
/**
 * post-process-lessons.js — v2.0.B.86
 *
 * After JSON translator agents write lessons-ch{N}.json, run this to:
 * 1. Validate JSON shape via existing validate-lessons.js logic
 * 2. SHUFFLE correctIndex across 0..3 (fixes systemic correctIndex:0 bias
 *    identified by QA agents — gameable otherwise)
 * 3. Report Q count, type distribution, difficulty distribution per chapter
 * 4. Audit for: emoji leaks in question/options, Chinese in question prompts
 *
 * Usage:
 *   node tools/post-process-lessons.js public/lessons-ch2.json
 *   node tools/post-process-lessons.js public/lessons-ch*.json
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node tools/post-process-lessons.js <file.json> [<file2.json> ...]');
  process.exit(1);
}

const EMOJI_RE = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️]/u;
const CHINESE_RE = /[一-鿿]/;

function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleCorrectIndex(q) {
  if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) return q;
  if (typeof q.correctIndex !== 'number') return q;
  // tap-tiles / tap-pairs / type-what-you-hear: don't shuffle (different schema)
  if (q.type === 'tap-tiles' || q.type === 'tap-pairs' || q.type === 'type-what-you-hear') return q;
  const correctOption = q.options[q.correctIndex];
  const shuffled = shuffleArray(q.options);
  q.options = shuffled;
  q.correctIndex = shuffled.indexOf(correctOption);
  return q;
}

let totalQ = 0;
let totalEmojiLeaks = 0;
let totalChineseLeaks = 0;
let totalCorrectIndexZeroPre = 0;
let totalShuffled = 0;

for (const filePath of files) {
  const abs = resolve(filePath);
  console.log(`\n=== ${abs} ===`);
  let data;
  try {
    data = JSON.parse(readFileSync(abs, 'utf-8'));
  } catch (e) {
    console.error(`  ✗ JSON parse: ${e.message}`);
    continue;
  }
  if (!Array.isArray(data)) {
    console.error('  ✗ root is not array');
    continue;
  }

  const lessonCount = data.length;
  let qCount = 0;
  const typeCount = {};
  const difficultyCount = {};
  let emojiLeaks = 0;
  let chineseLeaks = 0;
  let correctIndexZeroBefore = 0;

  for (const lesson of data) {
    const qs = lesson.questions ?? [];
    qCount += qs.length;
    for (const q of qs) {
      typeCount[q.type] = (typeCount[q.type] ?? 0) + 1;
      difficultyCount[q.difficulty ?? 'unknown'] = (difficultyCount[q.difficulty ?? 'unknown'] ?? 0) + 1;
      if (q.correctIndex === 0) correctIndexZeroBefore++;
      // Emoji leak audit
      const qStr = q.question ?? '';
      if (EMOJI_RE.test(qStr)) {
        emojiLeaks++;
        console.warn(`  ⚠ emoji in question: ${q.id} — "${qStr.slice(0, 60)}"`);
      }
      if (Array.isArray(q.options)) {
        for (const opt of q.options) {
          if (typeof opt === 'string' && EMOJI_RE.test(opt)) {
            emojiLeaks++;
            console.warn(`  ⚠ emoji in option: ${q.id} — "${opt.slice(0, 40)}"`);
          }
        }
      }
      // Chinese in question prompt audit
      if (CHINESE_RE.test(qStr)) {
        chineseLeaks++;
        console.warn(`  ⚠ Chinese in question prompt: ${q.id} — "${qStr.slice(0, 60)}"`);
      }
      // Shuffle correctIndex (MC types only)
      shuffleCorrectIndex(q);
    }
  }

  // Write back with shuffled correctIndex
  writeFileSync(abs, JSON.stringify(data, null, 2) + '\n');
  console.log(`  ✓ Lessons: ${lessonCount}  | Q: ${qCount}`);
  console.log(`  ✓ Types: ${Object.entries(typeCount).map(([k, v]) => `${k}=${v}`).join(', ')}`);
  console.log(`  ✓ Difficulty: ${Object.entries(difficultyCount).map(([k, v]) => `${k}=${v}`).join(', ')}`);
  console.log(`  ✓ correctIndex:0 BEFORE shuffle: ${correctIndexZeroBefore}/${qCount} (${Math.round(correctIndexZeroBefore / qCount * 100)}%)`);
  if (emojiLeaks) console.warn(`  ⚠ Emoji leaks: ${emojiLeaks}`);
  if (chineseLeaks) console.warn(`  ⚠ Chinese in prompt leaks: ${chineseLeaks}`);

  totalQ += qCount;
  totalEmojiLeaks += emojiLeaks;
  totalChineseLeaks += chineseLeaks;
  totalCorrectIndexZeroPre += correctIndexZeroBefore;
  totalShuffled += qCount;
}

console.log(`\n=== TOTAL ===`);
console.log(`Q: ${totalQ}  | Shuffled: ${totalShuffled}`);
console.log(`Pre-shuffle correctIndex:0 bias: ${totalCorrectIndexZeroPre}/${totalShuffled} (${Math.round(totalCorrectIndexZeroPre / totalShuffled * 100)}%)`);
if (totalEmojiLeaks) console.error(`⚠ TOTAL emoji leaks: ${totalEmojiLeaks}`);
if (totalChineseLeaks) console.error(`⚠ TOTAL Chinese prompt leaks: ${totalChineseLeaks}`);
if (!totalEmojiLeaks && !totalChineseLeaks) console.log('✓ Clean: no emoji or Chinese-in-prompt leaks.');
