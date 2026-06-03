#!/usr/bin/env node
/**
 * v2.0.B.203 — Extract Ch1 L1-L3 outer-prologue to new Intro chapter (ch0).
 *
 * Architecture before:
 *   Ch1 (24 lessons): L1-L3 outer-prologue + L4-L15 main-story + L16-L21 aesop + L22-L23 outro + L24 review
 *
 * After:
 *   Intro (3 lessons): L1-L3 outer-prologue (kt-ch1-l1/l2/l3 IDs preserved)
 *   Ch1 (21 lessons): L4-L24 renumbered to L1-L21 (IDs kt-ch1-l4...l24 preserved)
 *
 * IDs are preserved → audio mapping (kt-ch1-l1.mp3 etc), localStorage progress,
 * PostHog events all continue to work. Only `chapter` field changes for moved
 * lessons (1 → 0) and `lessonInChapter` reassigned for Ch1.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ch1Path = path.join(ROOT, 'public', 'lessons-ch1.json');
const ch0Path = path.join(ROOT, 'public', 'lessons-ch0.json');

const ch1 = JSON.parse(fs.readFileSync(ch1Path, 'utf-8'));

// Idempotency: if Intro already split (Ch1 has < 24 lessons), abort
if (ch1.length < 24) {
  console.log(`SKIP: lessons-ch1.json has ${ch1.length} lessons (already split)`);
  process.exit(0);
}

// Split: L1-L3 → Intro, L4-L24 → Ch1
const introLessons = ch1.slice(0, 3).map(l => ({ ...l, chapter: 0 }));
const ch1Remaining = ch1.slice(3).map((l, i) => ({
  ...l,
  chapter: 1,
  lessonInChapter: i + 1,  // L4→1, L5→2, ..., L24→21
}));

// Write Intro
fs.writeFileSync(ch0Path, JSON.stringify(introLessons, null, 2) + '\n', 'utf-8');
console.log(`OK   wrote lessons-ch0.json (${introLessons.length} lessons / ${introLessons.reduce((s,l)=>s+l.questions.length,0)} Q)`);

// Write Ch1 stripped
fs.writeFileSync(ch1Path, JSON.stringify(ch1Remaining, null, 2) + '\n', 'utf-8');
console.log(`OK   rewrote lessons-ch1.json (${ch1Remaining.length} lessons / ${ch1Remaining.reduce((s,l)=>s+l.questions.length,0)} Q)`);

console.log('\n[STRUCTURE AFTER]');
console.log('Intro (ch0): ' + introLessons.map(l => `${l.id} (${l.questions.length}Q)`).join(', '));
console.log('Ch1 starts: ' + ch1Remaining[0].id + ' (lessonInChapter=' + ch1Remaining[0].lessonInChapter + ')');
