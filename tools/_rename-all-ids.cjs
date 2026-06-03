#!/usr/bin/env node
/**
 * v2.0.B.205 — Comprehensive ID rename + audio file rename.
 *
 * After B.204 chapter renumber, internal IDs were preserved. User feedback
 * "Ch1 跟主題沒關係" — because Ch1 桃太郎 still showed kt-ch2-* IDs.
 * This commit aligns IDs with chapter numbers across all files + audio.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio', 'lessons');

const RENAMES = [
  { ch: 0, old: 'kt-ch1-', neu: 'kt-ch0-' },
  { ch: 1, old: 'kt-ch2-', neu: 'kt-ch1-' },
  { ch: 2, old: 'kt-ch3-', neu: 'kt-ch2-' },
  { ch: 3, old: 'kt-ch4-', neu: 'kt-ch3-' },
  { ch: 4, old: 'kt-ch5-', neu: 'kt-ch4-' },
  { ch: 5, old: 'kt-ch6-', neu: 'kt-ch5-' },
  { ch: 6, old: 'kt-ch7-', neu: 'kt-ch6-' },
  { ch: 7, old: 'kt-ch8-', neu: 'kt-ch7-' },
];

let jsonRenamedTotal = 0;
let audioRenamed = 0;
let audioSkipped = 0;

// Step 1: JSON ID replacement via simple string split-join (no regex needed)
for (const r of RENAMES) {
  const fp = path.join(ROOT, 'public', `lessons-ch${r.ch}.json`);
  if (!fs.existsSync(fp)) { console.log(`SKIP ch${r.ch}: not found`); continue; }
  let raw = fs.readFileSync(fp, 'utf-8');
  const occurrences = raw.split(r.old).length - 1;
  raw = raw.split(r.old).join(r.neu);
  fs.writeFileSync(fp, raw, 'utf-8');
  console.log(`OK   ch${r.ch}: ${r.old} -> ${r.neu} (${occurrences} replacements)`);
  jsonRenamedTotal += occurrences;
}

// Step 2: Audio file rename for Intro (kt-ch1-l{1,2,3}* -> kt-ch0-l{1,2,3}*)
console.log('\n=== Audio file rename (Intro lessons only) ===');
if (fs.existsSync(AUDIO_DIR)) {
  const files = fs.readdirSync(AUDIO_DIR);
  const introPattern = /^kt-ch1-l[123](-|\.|$)/;
  for (const f of files) {
    if (!introPattern.test(f)) continue;
    const newName = f.replace(/^kt-ch1-/, 'kt-ch0-');
    const oldPath = path.join(AUDIO_DIR, f);
    const newPath = path.join(AUDIO_DIR, newName);
    if (fs.existsSync(newPath)) { audioSkipped++; continue; }
    fs.renameSync(oldPath, newPath);
    audioRenamed++;
  }
  console.log(`OK   audio renamed=${audioRenamed} skipped=${audioSkipped}`);
} else {
  console.log('SKIP: audio dir not found');
}

console.log('\n[SUMMARY]');
console.log(`  JSON ID replacements: ${jsonRenamedTotal} across 8 chapter files`);
console.log(`  Audio files renamed (Intro): ${audioRenamed}`);
console.log(`  Orphan audio (was Ch1 main story): kt-ch1-l4..l24 not touched`);
