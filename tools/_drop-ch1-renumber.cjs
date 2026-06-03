#!/usr/bin/env node
/**
 * v2.0.B.204 — Delete Ch1 (rainy-night-cat) + renumber Ch2-8 → Ch1-7.
 *
 * After B.203:
 *   ch0 Intro (3 lessons), ch1 rainy-night-cat (21 lessons), ch2-8 (24-25 each)
 *
 * After B.204:
 *   ch0 Intro (3 lessons), ch1 桃太郎 (was ch2), ch2 醜小鴨 (was ch3), ..., ch7 葉限 (was ch8)
 *
 * IDs preserved: kt-ch2-l* stays kt-ch2-l* even though file moved to
 * lessons-ch1.json. Audio MP3 + localStorage progress + PostHog events
 * continue to work without rename.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Step 1: Delete old lessons-ch1.json (rainy-night-cat)
const ch1Path = path.join(ROOT, 'public', 'lessons-ch1.json');
if (fs.existsSync(ch1Path)) {
  fs.unlinkSync(ch1Path);
  console.log('OK   deleted lessons-ch1.json (was rainy-night-cat 21 lessons)');
}

// Step 2: Rename ch2→ch1, ch3→ch2, ..., ch8→ch7
// 依序處理,避免覆寫衝突 (ch2 → ch1 先,再 ch3 → ch2 ...)
for (let oldCh = 2; oldCh <= 8; oldCh++) {
  const newCh = oldCh - 1;
  const oldPath = path.join(ROOT, 'public', `lessons-ch${oldCh}.json`);
  const newPath = path.join(ROOT, 'public', `lessons-ch${newCh}.json`);
  if (!fs.existsSync(oldPath)) {
    console.log(`SKIP lessons-ch${oldCh}.json: not found`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(oldPath, 'utf-8'));
  // Update chapter field in every lesson
  for (const l of data) {
    l.chapter = newCh;
  }
  fs.writeFileSync(newPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  fs.unlinkSync(oldPath);
  console.log(`OK   ${oldPath} → ${newPath} (chapter field ${oldCh}→${newCh})`);
}

// Step 3: Delete orphan qa-static-ch{2..8}.html (will regen as ch1-7)
for (let ch = 2; ch <= 8; ch++) {
  const p = path.join(ROOT, 'public', `qa-static-ch${ch}.html`);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`OK   deleted stale ${path.basename(p)}`);
  }
  const dp = path.join(ROOT, 'dist', `qa-static-ch${ch}.html`);
  if (fs.existsSync(dp)) fs.unlinkSync(dp);
}
// Also delete old qa-static-ch1.html (rainy-night-cat) — will regen for 桃太郎
const oldQaCh1 = path.join(ROOT, 'public', 'qa-static-ch1.html');
if (fs.existsSync(oldQaCh1)) {
  fs.unlinkSync(oldQaCh1);
  console.log('OK   deleted stale qa-static-ch1.html (rainy-night-cat)');
}

console.log('\n[DONE] Ch1 deleted + Ch2-8 renumbered to Ch1-7');
