#!/usr/bin/env node
/**
 * v2.0.B.202 — Deeper grammar scan (v2): catches Chinglish + idiomatic issues
 * regex pass missed.
 *
 * NEW patterns vs v1:
 *   H. POV slip "she thinks that I" / "Mochi says I"
 *   I. Intensifier dup "very very" / "really really" / "so so"
 *   J. Awkward "She does X. Then she does Y. Then she does Z." sequencing
 *   K. Quote punctuation "She said , 'X'" or 'X.' She said
 *   L. Double article "the the" / "a a"  (already in F but expand)
 *   M. Missing comma in compound: "She walks and he runs" needs comma if both subj
 *   N. "[adj] than [adj]" comparative typo
 *   O. "the" before bare proper noun: "the Mochi"
 *   P. Awkward "make/give/take" + noun ("makes a meow" → "meows")
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const findings = [];
function flag(file, qId, type, snippet, suggestion) {
  findings.push({ file, qId, type, snippet, suggestion: suggestion || '' });
}

function scanSentence(file, qId, s, field) {
  if (typeof s !== 'string' || !s.trim()) return;

  // H: POV slip — 3rd-person verb + 1st-person clause
  if (/\b(she|he|they|Mochi|Hana|Grandma)\s+(thinks|says|knows|hears|sees)\s+(that\s+)?I\b/i.test(s)) {
    flag(file, qId, 'H_POV_SLIP', `${field}: "${s}"`,
      'Mixed POV: 3rd-person verb + 1st-person clause; restructure');
  }

  // I: Intensifier duplicates
  if (/\b(very|really|so|quite|pretty)\s+\1\b/i.test(s)) {
    const m = s.match(/\b(very|really|so|quite|pretty)\s+\1\b/i);
    flag(file, qId, 'I_INTENSIFIER_DUP', `${field}: "${s}" (rep: "${m[1]}")`,
      `Drop one "${m[1]}"`);
  }

  // J: "Then X. Then Y. Then Z." sequencing (>= 3 "then")
  const thenCount = (s.match(/\bthen\b/gi) || []).length;
  if (thenCount >= 2 && field === 'sentence') {
    flag(file, qId, 'J_THEN_OVERUSE', `${field}: "${s}" (${thenCount}× "then")`,
      'Vary connectors (next/after/later) for natural flow');
  }

  // K: Quote punct — "X" she said vs "X," she said
  if (/"[A-Z][^"]*[a-z]"\s+(she|he|they|Mochi|Hana|Grandma)/i.test(s)) {
    flag(file, qId, 'K_QUOTE_PUNCT', `${field}: "${s}"`,
      'Quote should end with comma before attribution: "X," she said.');
  }

  // L: "the the" / "a a" / "an an"
  if (/\b(the|a|an)\s+\1\b/i.test(s)) {
    flag(file, qId, 'L_ARTICLE_DUP', `${field}: "${s}"`, 'Duplicate article');
  }

  // O: "the" + proper noun
  if (/\bthe\s+(Mochi|Hana|Grandma|Momotaro|Camel|Djinn|Baba\s+Yaga|Ye\s+Xian)\b/i.test(s)) {
    flag(file, qId, 'O_THE_PROPER', `${field}: "${s}"`,
      'Drop "the" before proper noun');
  }

  // P: filler "make/give/take/do" + sound/look/walk noun (expand v1)
  const fillerExpanded = [
    [/\bmakes?\s+a\s+(meow|bark|cry|laugh|smile|jump)\b/i, 'Use verb directly: meows/barks/cries/jumps'],
    [/\bgives?\s+(a|an)\s+(answer|reply)\b/i, '"gives an answer" → "answers" / "replies"'],
    [/\bdoes?\s+a\s+(dance|sing|run)\b/i, 'Use verb directly: dances/sings/runs'],
  ];
  for (const [pat, hint] of fillerExpanded) {
    if (pat.test(s)) flag(file, qId, 'P_FILLER_VERB_V2', `${field}: "${s}"`, hint);
  }

  // Q: Bare comparative "more better" / "more easier"
  if (/\bmore\s+(better|easier|faster|slower|harder|smaller|bigger|nicer|prettier)\b/i.test(s)) {
    flag(file, qId, 'Q_DOUBLE_COMPARATIVE', `${field}: "${s}"`,
      'Drop "more" — adjective already comparative');
  }

  // R: "didn't [past tense]" — should be "didn't [base form]"
  if (/\b(didn't|did not)\s+(went|came|saw|made|took|ate|gave|said|knew|found|got|brought|thought|caught)\b/i.test(s)) {
    flag(file, qId, 'R_DOUBLE_PAST', `${field}: "${s}"`,
      'After "didn\'t" use base form: didn\'t go / didn\'t see');
  }
}

for (const ch of CHAPTERS) {
  const filePath = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const lesson of data) {
    for (const q of (lesson.questions || [])) {
      if (q.sentence) scanSentence(`ch${ch}`, q.id, q.sentence, 'sentence');
      if (q.question) scanSentence(`ch${ch}`, q.id, q.question, 'question');
      if (Array.isArray(q.options)) {
        for (let i = 0; i < q.options.length; i++) {
          scanSentence(`ch${ch}`, q.id, q.options[i], `options[${i}]`);
        }
      }
    }
  }
}

const byType = {};
for (const f of findings) {
  byType[f.type] = byType[f.type] ?? [];
  byType[f.type].push(f);
}

const lines = [`# Grammar Scan v2 — ${new Date().toISOString().slice(0, 16)}`, ''];
lines.push(`Total findings: **${findings.length}**`);
lines.push('');
for (const type of Object.keys(byType).sort()) {
  const items = byType[type];
  lines.push(`## ${type} (${items.length})`);
  lines.push('');
  if (items[0]?.suggestion) {
    lines.push(`> ${items[0].suggestion}`);
    lines.push('');
  }
  for (const f of items.slice(0, 40)) {
    lines.push(`- **${f.file} ${f.qId}** — ${f.snippet}`);
  }
  if (items.length > 40) lines.push(`- ... and ${items.length - 40} more`);
  lines.push('');
}

const outPath = path.join(ROOT, 'docs', 'audits', `grammar-scan-v2-${new Date().toISOString().slice(0,10)}.md`);
fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
console.log(`Report → ${outPath}`);
console.log(`Total: ${findings.length}`);
for (const t of Object.keys(byType).sort((a,b) => byType[b].length - byType[a].length)) {
  console.log(`  ${t}: ${byType[t].length}`);
}
