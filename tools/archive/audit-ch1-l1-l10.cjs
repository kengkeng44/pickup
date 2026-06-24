const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'lessons-ch1.json'), 'utf8'));

// Filter L1-L10
const lessons = data.filter(l => l.lessonInChapter >= 1 && l.lessonInChapter <= 10);
console.log('Total lessons L1-L10:', lessons.length);

let totalQ = 0;
const violations = { R1: [], A6: [], A7: [], R3: [], R6: [], placeholder: [] };

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const lesson of lessons) {
  const qs = lesson.questions || [];
  totalQ += qs.length;

  // intro placeholder safety
  if (lesson.intro) {
    const introEn = lesson.intro.en || '';
    const introZh = lesson.intro.zh || '';
    const malformed = /\{[^}]*$|\{\s+\w|\w\s+\}/;
    if (malformed.test(introEn) || malformed.test(introZh)) {
      violations.placeholder.push({ lesson: lesson.id, intro: introEn });
    }
    // Check no stray unmatched braces
    const openCountEn = (introEn.match(/\{/g) || []).length;
    const closeCountEn = (introEn.match(/\}/g) || []).length;
    if (openCountEn !== closeCountEn) {
      violations.placeholder.push({ lesson: lesson.id, reason: 'unbalanced-brace-en', intro: introEn });
    }
    const openCountZh = (introZh.match(/\{/g) || []).length;
    const closeCountZh = (introZh.match(/\}/g) || []).length;
    if (openCountZh !== closeCountZh) {
      violations.placeholder.push({ lesson: lesson.id, reason: 'unbalanced-brace-zh', intro: introZh });
    }
  }

  // R3 — key position balance
  const positionCounts = [0,0,0,0];
  for (const q of qs) {
    if (typeof q.correctIndex === 'number') {
      positionCounts[q.correctIndex]++;
    }
  }
  if (qs.length >= 8) {
    const minCount = Math.min(...positionCounts);
    const maxCount = Math.max(...positionCounts);
    if (minCount === 0 || maxCount > qs.length * 0.6) {
      violations.R3.push({ lesson: lesson.id, counts: positionCounts, qCount: qs.length });
    }
  }

  // R6 — sub-skill variety
  const skillCounts = {};
  for (const q of qs) {
    const s = q.subSkill || 'untagged';
    skillCounts[s] = (skillCounts[s] || 0) + 1;
  }
  if (qs.length >= 5) {
    const total = qs.length;
    for (const [skill, count] of Object.entries(skillCounts)) {
      if (count / total > 0.8 && skill !== 'untagged') {
        violations.R6.push({ lesson: lesson.id, dominantSkill: skill, count, total, type: 'monotonic' });
      }
    }
    let consecCount = 0;
    for (let i = 1; i < qs.length; i++) {
      if (qs[i].subSkill && qs[i].subSkill === qs[i-1].subSkill) {
        consecCount++;
      }
    }
    // Soft threshold: more than 50% of pairs same
    if (consecCount > (qs.length - 1) * 0.5) {
      violations.R6.push({ lesson: lesson.id, consecSamePairs: consecCount, qCount: qs.length, type: 'consecutive' });
    }
  }

  // Per-question checks
  for (const q of qs) {
    const sentence = (q.sentence || '').toLowerCase();
    const question = (q.question || '').toLowerCase();
    const options = q.options || [];
    const correct = options[q.correctIndex];

    if (!correct) continue;
    const correctLower = correct.toLowerCase();

    if (correctLower.length < 2) continue;

    // R1 — verbatim: substring check (per standard)
    if (sentence && sentence.includes(correctLower)) {
      // Word boundary tighter check
      const wordRegex = new RegExp('\\b' + escapeRegex(correctLower) + '\\b');
      if (wordRegex.test(sentence)) {
        violations.R1.push({
          id: q.id,
          sentence: q.sentence,
          correct,
          question: q.question
        });
      }
    }

    // A6 — question contains answer
    if (question && question.includes(correctLower) && correctLower.length >= 3) {
      const wordRegex = new RegExp('\\b' + escapeRegex(correctLower) + '\\b');
      if (wordRegex.test(question)) {
        violations.A6.push({
          id: q.id,
          question: q.question,
          correct
        });
      }
    }

    // A7 — number/time in sentence and option matches
    const numMatch = correctLower.match(/\b\d+\b/);
    if (numMatch && sentence.includes(numMatch[0])) {
      violations.A7.push({
        id: q.id,
        sentence: q.sentence,
        correct
      });
    }
  }
}

console.log('Total questions L1-L10:', totalQ);
console.log('\nViolations summary:');
console.log('  R1:', violations.R1.length);
console.log('  A6:', violations.A6.length);
console.log('  A7:', violations.A7.length);
console.log('  R3:', violations.R3.length);
console.log('  R6:', violations.R6.length);
console.log('  placeholder:', violations.placeholder.length);

for (const [cat, list] of Object.entries(violations)) {
  if (list.length > 0) {
    console.log('\n--- ' + cat + ' samples (up to 5) ---');
    list.slice(0, 5).forEach(v => console.log(JSON.stringify(v)));
  }
}

// Storybeat / intro raw placeholder leak (raw {catName} should still be present pre-load)
// The audit verifies fields exist and intro structure is OK
console.log('\nLessons inspected:');
lessons.forEach(l => {
  console.log('  ' + l.id + ': ' + l.questions.length + ' Q, segment=' + l.segmentType + ', intro=' + (l.intro ? 'yes' : 'no'));
});
