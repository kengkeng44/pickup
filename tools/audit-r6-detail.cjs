const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'lessons-ch1.json'), 'utf8'));
const lessons = data.filter(l => l.lessonInChapter >= 1 && l.lessonInChapter <= 10);

console.log('R6 detail per lesson (target: >=3 gist, >=5 detail, >=2 inference, >=2 vocab/function for 12-Q lesson)');
console.log('');

const violations = [];
for (const lesson of lessons) {
  const qs = lesson.questions || [];
  const counts = { gist: 0, detail: 0, inference: 0, vocab: 0, function: 0, other: 0, untagged: 0 };
  const sequence = [];
  for (const q of qs) {
    const s = q.subSkill || 'untagged';
    sequence.push(s);
    if (counts[s] !== undefined) counts[s]++;
    else counts.other++;
  }
  const vocabFunction = counts.vocab + counts.function;
  const meetsGist = counts.gist >= 3;
  const meetsDetail = counts.detail >= 5;
  const meetsInf = counts.inference >= 2;
  const meetsVocab = vocabFunction >= 2;
  const ok = meetsGist && meetsDetail && meetsInf && meetsVocab;
  console.log(lesson.id + ' (' + qs.length + ' Q):', JSON.stringify(counts), 'ok=' + ok);
  console.log('  sequence:', sequence.join(' > '));
  // Find consecutive same
  const consec = [];
  for (let i = 1; i < sequence.length; i++) {
    if (sequence[i] === sequence[i-1]) consec.push(i + ':' + sequence[i]);
  }
  if (consec.length) console.log('  consecutive_same:', consec.join(', '));
  if (!ok) {
    const missing = [];
    if (!meetsGist) missing.push('gist=' + counts.gist + '/3');
    if (!meetsDetail) missing.push('detail=' + counts.detail + '/5');
    if (!meetsInf) missing.push('inference=' + counts.inference + '/2');
    if (!meetsVocab) missing.push('vocab+function=' + vocabFunction + '/2');
    violations.push({ id: lesson.id, missing });
  }
}

console.log('\nR6 minimum violations (per 12-Q standard):');
violations.forEach(v => console.log('  ' + v.id + ': ' + v.missing.join(', ')));
console.log('Total R6 minimum violations:', violations.length);
