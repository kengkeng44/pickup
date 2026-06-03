#!/usr/bin/env node
/**
 * v2.0.B.200 — Auto-tag speaker field across Ch2-8 lessons.
 *
 * Rule (segment-aware):
 *   - Sentence contains I/my/me (word-boundary):
 *     - outer-prologue/outer-outro/review → mochi (cat 1st-person 外框)
 *     - main-story/aesop-side             → grandma (奶奶讀故事代主角 voice)
 *     - other                             → narrator
 *   - Sentence no 1st-person → narrator (背景旁白 / 第三人稱描述)
 *
 * Skip Q already tagged (Ch1 L1 manually done in B.198).
 *
 * Run: node tools/_batch-tag-speakers-ch2-8.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHAPTERS = [2, 3, 4, 5, 6, 7, 8];

function detectSpeaker(sentence, segmentType) {
  if (typeof sentence !== 'string') return 'narrator';
  const tokens = sentence.toLowerCase().split(/\W+/);
  const has1stPerson = tokens.includes('i') || tokens.includes('my') || tokens.includes('me');
  if (!has1stPerson) return 'narrator';
  if (segmentType === 'outer-prologue' || segmentType === 'outer-outro' || segmentType === 'review') {
    return 'mochi';
  }
  if (segmentType === 'main-story' || segmentType === 'aesop-side') {
    return 'grandma';
  }
  return 'narrator';
}

const stats = {};
for (const ch of CHAPTERS) {
  const filePath = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP ch${ch}: ${filePath} not found`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let chTagged = 0;
  let chSkipped = 0;
  const distribution = { mochi: 0, grandma: 0, hana: 0, narrator: 0 };
  for (const lesson of data) {
    const segType = lesson.segmentType;
    for (const q of (lesson.questions || [])) {
      if (q.speaker) { chSkipped++; distribution[q.speaker] = (distribution[q.speaker]||0)+1; continue; }
      const sp = detectSpeaker(q.sentence, segType);
      q.speaker = sp;
      distribution[sp]++;
      chTagged++;
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  stats[`ch${ch}`] = { tagged: chTagged, skipped: chSkipped, distribution };
  console.log(`OK   ch${ch}: tagged=${chTagged} skipped=${chSkipped} | mochi=${distribution.mochi} grandma=${distribution.grandma} narrator=${distribution.narrator}`);
}

console.log('\n[DONE] Ch2-8 speaker auto-tag complete');
console.log(JSON.stringify(stats, null, 2));
