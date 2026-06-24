#!/usr/bin/env node
/**
 * v2.0.B.201 — Apply grammar fixes from scan 2026-06-03.
 *
 * Fix categories:
 *   A. Q0 awkward modal: "What can feed her?" → "What can she eat?"
 *   B. Tap-pairs missing punct: "Tap the pairs" → "Tap the pairs."  (×14)
 *   C. Duplicate word typos
 *   D. "a" vowel article (a occasion / a easy)
 *   E. Long sentence splits (selective — only ones over 15w that aren't quoted Grandma dialogue)
 *   F. Mangled rewrites
 *
 * Each fix specifies exact match → replacement for idempotency.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// [chapter, qId, field, oldValue, newValue]
const FIXES = [
  // A — Q0 abstract modal (user-reported)
  [1, 'kt-ch1-l1-q0', 'question', 'What can feed her?', 'What can she eat?'],
  [1, 'kt-ch1-l1-q0', 'sentence', 'Mochi is hungry. What can feed her?', 'Mochi is hungry. What can she eat?'],

  // B — tap-pairs missing period (14 total, all "Tap the pairs" Q prompts)
  [1, 'kt-ch1-l24-q1', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [1, 'kt-ch1-l24-q2', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [1, 'kt-ch1-l24-q3', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [2, 'kt-ch2-l24-q9', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [2, 'kt-ch2-l24-q10', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [3, 'kt-ch3-l25-q1', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [3, 'kt-ch3-l25-q2', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [3, 'kt-ch3-l25-q3', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [5, 'kt-ch5-l25-q1', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [5, 'kt-ch5-l25-q2', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [5, 'kt-ch5-l25-q3', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [6, 'kt-ch6-l25-q1', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [6, 'kt-ch6-l25-q2', 'question', 'Tap the pairs', 'Tap the pairs.'],
  [6, 'kt-ch6-l25-q3', 'question', 'Tap the pairs', 'Tap the pairs.'],

  // C — duplicate word typos
  [3, 'kt-ch3-l12-q1', 'sentence', 'A loud loud sound shakes the marsh.', 'A loud sound shakes the marsh.'],
  // ch6-l23-q1 is mangled "shiver a a tiny bit of on" — also has wrong preposition. Rewrite.
  [6, 'kt-ch6-l23-q1', 'sentence', 'I shiver a a tiny bit of on the wall.', 'I shiver a little on the wall.'],

  // D — "a" + vowel articles
  [4, 'kt-ch4-l24-q2', 'sentence',
    'I walk back to the alley single pace forward at a occasion.',
    'I walk back to the alley, one step at a time.'],  // also rewrites broken phrasing
  [5, 'kt-ch5-l13-q5', 'sentence', 'The Djinn listens with a easy face.', 'The Djinn listens with an easy face.'],

  // E — long sentence splits (selective, only true awkward ones)
  [4, 'kt-ch4-l21-q5', 'sentence',
    'The city mouse might not enjoy country food because he is used to fancier meals.',
    'The city mouse may not enjoy country food. He is used to fancier meals.'],
  [4, 'kt-ch4-l22-q5', 'sentence',
    'The lesson of the two mice is that a simple safe life beats a fancy scary one.',
    'The lesson is simple. A safe quiet life beats a fancy scary one.'],

  // F — C_MISSING_SUBJECT ch1-l23-q5: imperative-style "See you" in narration
  [1, 'kt-ch1-l23-q5', 'sentence',
    'See you the day after this night.',
    "I'll see you tomorrow night."],
];

let applied = 0;
let skipped = 0;
const log = [];

// Group by chapter for efficient file I/O
const byChapter = {};
for (const f of FIXES) {
  const ch = f[0];
  byChapter[ch] = byChapter[ch] ?? [];
  byChapter[ch].push(f);
}

for (const ch of Object.keys(byChapter).map(Number).sort()) {
  const filePath = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const [, qId, field, oldVal, newVal] of byChapter[ch]) {
    let q;
    for (const lesson of data) {
      q = (lesson.questions || []).find(x => x.id === qId);
      if (q) break;
    }
    if (!q) {
      log.push(`SKIP ${qId}: not found`);
      skipped++;
      continue;
    }
    if (q[field] === newVal) {
      log.push(`SKIP ${qId} ${field}: already fixed (idempotent)`);
      skipped++;
      continue;
    }
    if (q[field] !== oldVal) {
      log.push(`SKIP ${qId} ${field}: expected "${oldVal}" got "${q[field]}"`);
      skipped++;
      continue;
    }
    q[field] = newVal;
    log.push(`OK   ${qId} ${field}: "${oldVal.slice(0,40)}" → "${newVal.slice(0,40)}"`);
    applied++;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

console.log(log.join('\n'));
console.log(`\n[SUMMARY] applied=${applied} skipped=${skipped}`);
