#!/usr/bin/env node
/**
 * v2.0.B.206 — Fix sentence-question duplicates across all chapters.
 *
 * 14 Q where sentence == question or sentence contains question. User feedback:
 * "這種題目裡面就有問句的就不需要再覆述一次了 直接說答案的選項".
 *
 * Strategy: rewrite sentence to be substantive statement that the question
 * can then ask comprehension about. Context drawn from adjacent questions in
 * same lesson.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// [chapter, qId, sentence_new]
const FIXES = [
  // ch0 Q0 — split setup + question
  ['ch0', 'kt-ch0-l1-q0', 'Mochi is hungry.'],

  // ch4 駱駝
  ['ch4', 'kt-ch4-l5-q6', 'The Camel only stands and eats in the desert.'],
  ['ch4', 'kt-ch4-l9-q5', 'The Dog must work twice as hard because of the Camel.'],

  // ch5 Baba Yaga / Vasilisa
  ['ch5', 'kt-ch5-l5-q6', 'The doll speaks softly and helps Vasilisa with hard tasks.'],
  ['ch5', 'kt-ch5-l8-q4', 'Vasilisa must reach the witch\'s house to bring fire home.'],
  ['ch5', 'kt-ch5-l8-q6', 'Vasilisa carries her tiny doll in a warm pocket.'],
  ['ch5', 'kt-ch5-l14-q4', 'The doll only helps when Vasilisa shares her bread.'],
  ['ch5', 'kt-ch5-l18-q3', 'The skull glows and lights every dark corner of the path.'],
  ['ch5', 'kt-ch5-l24-q10', 'Mochi carries the brave words from the story back to the street.'],
  ['ch5', 'kt-ch5-l25-q4', 'Tonight Grandma told the story of brave Vasilisa.'],

  // ch6 六隻天鵝
  ['ch6', 'kt-ch6-l2-q5', 'Grandma sits in her chair and opens a thick old book.'],
  ['ch6', 'kt-ch6-l3-q5', 'Tonight Grandma reads the tale of six brothers and one sister.'],
  ['ch6', 'kt-ch6-l6-q5', 'The six brothers had no time to say goodbye before they changed.'],
  ['ch6', 'kt-ch6-l9-q5', 'She walked for many days on sharp stones to find her brothers.'],
];

let applied = 0;
const byCh = {};
for (const f of FIXES) {
  byCh[f[0]] = byCh[f[0]] ?? [];
  byCh[f[0]].push(f);
}

for (const ch of Object.keys(byCh)) {
  const fp = path.join(ROOT, 'public', `lessons-${ch}.json`);
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  for (const [, qId, newSentence] of byCh[ch]) {
    let q;
    for (const l of data) {
      q = (l.questions || []).find(x => x.id === qId);
      if (q) break;
    }
    if (!q) { console.log(`SKIP ${qId}: not found`); continue; }
    const oldSentence = q.sentence;
    if (oldSentence === newSentence) {
      console.log(`SKIP ${qId}: already fixed`);
      continue;
    }
    q.sentence = newSentence;
    console.log(`OK ${qId}: "${oldSentence}" -> "${newSentence}"`);
    applied++;
  }
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

console.log(`\n[SUMMARY] applied=${applied}`);

// Re-scan to verify 0 duplicates remain
function norm(s) { return s.replace(/\s+/g, ' ').trim().toLowerCase(); }
let dupsAfter = 0;
for (let ch = 0; ch <= 7; ch++) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', `lessons-ch${ch}.json`), 'utf-8'));
  for (const l of data) for (const q of l.questions || []) {
    const s = q.sentence || '';
    const qP = q.question || q.questionEn || '';
    if (!s || !qP) continue;
    if (norm(s).includes(norm(qP))) {
      dupsAfter++;
      console.log(`STILL DUP: ${q.id} sentence="${s}" question="${qP}"`);
    }
  }
}
console.log(`\nDuplicates remaining after fix: ${dupsAfter}`);
