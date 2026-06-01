#!/usr/bin/env node
// Pre-scan: dump every question prompt with word count + multi-sentence flag
// so we can hand-verify rewrites without running the mutator.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

function countWords(s) {
  if (!s) return 0;
  const trimmed = s.replace(/[?.,!:;"']+$/g, '').trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}
function isMulti(s) {
  if (!s) return false;
  const trimmed = s.trim().replace(/\?$/, '').trim();
  return /[.!?]/.test(trimmed);
}

const rows = [];
for (let ch = 1; ch <= 8; ch++) {
  const file = resolve(publicDir, `lessons-ch${ch}.json`);
  const data = JSON.parse(readFileSync(file, 'utf-8'));
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (q.type === 'tap-tiles' || q.type === 'tap-pairs') continue;
      const wc = countWords(q.question);
      const multi = isMulti(q.question);
      rows.push({
        ch,
        id: q.id,
        type: q.type,
        question: q.question,
        wc,
        multi,
        flag: wc > 8 || multi,
        correctIdx: q.correctIndex,
        correctOpt: q.options ? q.options[q.correctIndex] : null,
        sentence: q.sentence,
      });
    }
  }
}

const flagged = rows.filter(r => r.flag);
console.log(`total non-tap questions: ${rows.length}`);
console.log(`flagged (>8 words OR multi-sentence): ${flagged.length}`);
console.log('per chapter flagged:');
for (let ch = 1; ch <= 8; ch++) {
  console.log(`  ch${ch}: ${flagged.filter(r => r.ch === ch).length}`);
}
writeFileSync(resolve(__dirname, '_scan-prompts.json'),
  JSON.stringify({ flagged, totalChecked: rows.length }, null, 2),
  'utf-8');
