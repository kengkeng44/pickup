import { readFileSync } from 'node:fs';
const before = JSON.parse(readFileSync('./tools/_backup_lessons-ch1-pre-toeic.json', 'utf-8'));
const after = JSON.parse(readFileSync('./public/lessons-ch1.json', 'utf-8'));
console.log(`lessons: before=${before.length}, after=${after.length}`);
let diffs = 0;
for (let i = 10; i < before.length; i++) {
  const a = JSON.stringify(before[i]);
  const b = JSON.stringify(after[i]);
  if (a !== b) {
    console.log(`DIFF at lesson ${i}: ${before[i].id}`);
    diffs++;
  }
}
console.log(`L11-L24 diffs: ${diffs}`);
// Also verify first 10 IDs match
for (let i = 0; i < 10; i++) {
  if (before[i].id !== after[i].id) console.log(`L${i+1} id mismatch!`);
  if (before[i].chapter !== after[i].chapter) console.log(`L${i+1} chapter mismatch!`);
  if (before[i].lessonInChapter !== after[i].lessonInChapter) console.log(`L${i+1} lessonInChapter mismatch!`);
  if (before[i].segmentType !== after[i].segmentType) console.log(`L${i+1} segmentType mismatch!`);
  if (before[i].storyId !== after[i].storyId) console.log(`L${i+1} storyId mismatch!`);
  // questions: check ids and types unchanged
  for (let j = 0; j < before[i].questions.length; j++) {
    const qb = before[i].questions[j];
    const qa = after[i].questions[j];
    if (qb.id !== qa.id) console.log(`Q ${qb.id} id changed!`);
    if (qb.type !== qa.type) console.log(`Q ${qb.id} type changed: ${qb.type} → ${qa.type}`);
    if (qb.level !== qa.level) console.log(`Q ${qb.id} level changed!`);
    if (qb.difficulty !== qa.difficulty) console.log(`Q ${qb.id} difficulty changed!`);
    if (JSON.stringify(qb.tags) !== JSON.stringify(qa.tags)) console.log(`Q ${qb.id} tags changed!`);
  }
}
console.log('L1-L10 metadata check complete.');
