#!/usr/bin/env node
/**
 * One-shot conversion: rewrite every `type-what-you-hear` question in
 * public/lessons-ch1..8.json as `listen-mc` (4-option multiple choice).
 *
 * Rationale: TOEIC LR is 100% MC; user wants consistent ABCD UX across
 * all questions. type-what-you-hear (text input dictation) is being
 * deprecated. All current TWYH questions already carry a 4-option array
 * so this is purely a `type` field swap — no distractor synthesis needed.
 *
 * Preserves: id, level, difficulty, sentence, question, options,
 * correctIndex, explanationZh, tags, speaker, and any other fields.
 * Output: in-place rewrite, UTF-8 no BOM, 2-space indent, trailing newline.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

const perChapter = {};
const diffSamples = [];
let totalConverted = 0;

for (let ch = 1; ch <= 8; ch++) {
  const path = resolve(publicDir, `lessons-ch${ch}.json`);
  if (!existsSync(path)) {
    console.warn(`SKIP lessons-ch${ch}.json (not found)`);
    perChapter[ch] = 0;
    continue;
  }
  const raw = readFileSync(path, 'utf-8');
  if (raw.charCodeAt(0) === 0xFEFF) {
    console.warn(`WARN lessons-ch${ch}.json has BOM — will be stripped on write`);
  }
  const data = JSON.parse(raw);
  let chCount = 0;
  for (const lesson of data) {
    for (const q of lesson.questions) {
      if (q.type === 'type-what-you-hear') {
        // Sanity: must already have exactly 4 options. Pre-flight scan
        // confirmed all 127 TWYH questions match this shape.
        const opts = q.options;
        if (!Array.isArray(opts) || opts.length !== 4) {
          throw new Error(
            `${q.id}: expected 4 options, got ${opts && opts.length}. ` +
            `Distractor synthesis not implemented (was advertised in spec ` +
            `but unneeded for current dataset).`
          );
        }
        if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
          throw new Error(`${q.id}: bad correctIndex ${q.correctIndex}`);
        }
        q.type = 'listen-mc';
        chCount++;
        totalConverted++;
        if (diffSamples.length < 5) {
          diffSamples.push({
            ch,
            id: q.id,
            sentence: q.sentence,
            options: [...q.options],
            correctIndex: q.correctIndex,
            correctWord: q.options[q.correctIndex],
          });
        }
      }
    }
  }
  perChapter[ch] = chCount;
  // Match the existing file shape: 2-space indent + trailing newline,
  // UTF-8 no BOM. writeFileSync default encoding is utf8 without BOM.
  const out = JSON.stringify(data, null, 2) + '\n';
  writeFileSync(path, out, 'utf-8');
  console.log(`OK ch${ch}: converted ${chCount}`);
}

console.log('\n=== Summary ===');
console.log('Total converted:', totalConverted);
console.log('Per chapter:', JSON.stringify(perChapter));

// Emit machine-readable summary for the report writer.
const summaryPath = resolve(__dirname, '_twyh-conversion-summary.json');
writeFileSync(
  summaryPath,
  JSON.stringify({ totalConverted, perChapter, diffSamples }, null, 2) + '\n',
  'utf-8'
);
console.log('Wrote summary →', summaryPath);
