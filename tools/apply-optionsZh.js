#!/usr/bin/env node
/**
 * Read each public/lessons-ch{N}.json, add `optionsZh: string[]` to every
 * question that has an `options: string[]`, write the file back in place
 * (UTF-8 no BOM, 2-space indent, trailing newline preserved).
 *
 * Does NOT mutate any other field.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { translate } from './translate-options.js';

const repoRoot = 'C:/Users/acer/Desktop/wordwar';

const summary = { totalAdded: 0, perChapter: {}, missingCoverage: new Set() };
const samples = [];

for (let ch = 1; ch <= 8; ch++) {
  const path = `${repoRoot}/public/lessons-ch${ch}.json`;
  const raw = readFileSync(path, 'utf8');
  const lessons = JSON.parse(raw);

  let chAdded = 0;
  for (const lesson of lessons) {
    for (const q of lesson.questions) {
      if (Array.isArray(q.options)) {
        const optionsZh = q.options.map((en) => {
          const zh = translate(en);
          // Track when translator returned raw English (likely missing dict entry)
          if (/^[A-Za-z][A-Za-z\s,.'?-]*$/.test(zh)) {
            summary.missingCoverage.add(en);
          }
          return zh;
        });

        // Insert optionsZh as a NEW field — preserve original key order
        // by rebuilding the object with options/optionsZh adjacent.
        // Strip any pre-existing optionsZh so we don't double-insert.
        const newQ = {};
        for (const [k, v] of Object.entries(q)) {
          if (k === 'optionsZh') continue; // skip stale field, will re-add fresh
          newQ[k] = v;
          if (k === 'options') {
            newQ.optionsZh = optionsZh;
          }
        }
        // Replace question in place
        Object.keys(q).forEach((k) => delete q[k]);
        Object.assign(q, newQ);

        chAdded++;
        // Sample first 1 per chapter
        if (samples.length < 5 && optionsZh.length === q.options.length) {
          samples.push({
            id: q.id,
            options: q.options,
            optionsZh,
          });
        }
      }
    }
  }
  summary.perChapter[ch] = chAdded;
  summary.totalAdded += chAdded;

  // Write back preserving 2-space indent + trailing newline
  // Detect whether original had trailing newline
  const hadTrailingNewline = raw.endsWith('\n');
  let out = JSON.stringify(lessons, null, 2);
  if (hadTrailingNewline) out += '\n';
  writeFileSync(path, out, 'utf8');
  console.log(`ch${ch}: ${chAdded} optionsZh added`);
}

console.log(`\nTOTAL added: ${summary.totalAdded}`);
console.log(`per chapter: ${JSON.stringify(summary.perChapter)}`);
console.log(`untranslated (likely missing dict): ${summary.missingCoverage.size}`);
if (summary.missingCoverage.size > 0) {
  console.log('first 30:');
  Array.from(summary.missingCoverage).slice(0, 30).forEach((s) => console.log('  ' + JSON.stringify(s)));
}

// Save for QA report
writeFileSync(
  `${repoRoot}/tools/_optionsZh-summary.json`,
  JSON.stringify(
    {
      totalAdded: summary.totalAdded,
      perChapter: summary.perChapter,
      samples,
      missingCoverage: Array.from(summary.missingCoverage),
    },
    null,
    2
  ),
  'utf8'
);
