#!/usr/bin/env node
/**
 * v2.0.B.201 — Grammar scan across all 8 chapters.
 *
 * Flags suspect patterns:
 *   A1. Abstract-subject modal Q: "What can [verb] [obj]?" (user-reported)
 *   A2. Awkward modal: "Can [obj] be [done]" passive forms
 *   B.  Filler verb noun: "make a sound", "give a look" (vs barks/glances)
 *   C.  Subject-pronoun missing: sentence starts with verb (imperative-like in narrative)
 *   D.  Long sentence: > 14 words (A2 cognitive overload)
 *   E.  Trailing punctuation missing / wrong (questions without ?)
 *   F.  Repeated word adjacent ("the the", "is is")
 *   G.  Article confusion: "a [vowel]" vs "an [vowel]"
 *   H.  Tense bleed: 'today is' + 'and then went' mix
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

  // A1: "What can [verb]" abstract subject (user-reported)
  if (/^What can (feed|hold|carry|stop|catch|find|reach|see)\s+(her|him|them|it)\??/i.test(s)) {
    flag(file, qId, 'A1_ABSTRACT_MODAL_Q', `${field}: "${s}"`,
      'Subject should be the character, not implicit. Try "What can she eat?" / "What does she need?"');
  }

  // A2: Awkward "Be [past-participle]" passive
  if (/\b(am|is|are|was|were)\s+(seen|found|heard|told|shown)\s+by\s+\w+/i.test(s)) {
    flag(file, qId, 'A2_PASSIVE_BY_AWKWARD', `${field}: "${s}"`,
      'Consider active voice for A2 clarity');
  }

  // B: Filler verb noun ("make a sound" vs "bark")
  const fillerPatterns = [
    [/\bmakes?\s+a\s+sound\b/i, '"makes a sound" → "barks/meows/cries"'],
    [/\bgives?\s+a\s+(look|stare|glance)\b/i, '"gives a look" → "looks/stares/glances"'],
    [/\btakes?\s+a\s+walk\b/i, '"takes a walk" → "walks" (more natural for A2)'],
    [/\bdoes?\s+a\s+jump\b/i, '"does a jump" → "jumps"'],
  ];
  for (const [pat, hint] of fillerPatterns) {
    if (pat.test(s)) flag(file, qId, 'B_FILLER_VERB', `${field}: "${s}"`, hint);
  }

  // C: Sentence starts with bare verb (likely missing subject) — narrative only
  if (field === 'sentence' && /^(Walk|Run|Jump|Eat|Sleep|Look|See|Hear)s?\s+/i.test(s)) {
    flag(file, qId, 'C_MISSING_SUBJECT', `${field}: "${s}"`,
      'Narrative sentence starts with verb; needs subject (She/He/It/Mochi)');
  }

  // D: Long sentence > 14 words
  const wordCount = s.split(/\s+/).filter(Boolean).length;
  if (wordCount > 14 && field === 'sentence') {
    flag(file, qId, 'D_LONG_SENTENCE', `${field}: ${wordCount}w "${s}"`,
      'A2 cognitive load; split into 2 sentences');
  }

  // E: Question missing ?
  if (field === 'question' && s.length > 5 && !/[?!.]\s*$/.test(s)) {
    flag(file, qId, 'E_MISSING_PUNCT', `${field}: "${s}"`,
      'Question missing terminal punctuation');
  }

  // F: Adjacent repeated word
  const repeatMatch = s.match(/\b(\w+)\s+\1\b/i);
  if (repeatMatch && !/^(that|had|will|did)$/i.test(repeatMatch[1])) {
    flag(file, qId, 'F_DUPLICATE_WORD', `${field}: "${s}" (rep: "${repeatMatch[1]}")`,
      'Possible typo / duplicate');
  }

  // G: "a" + vowel-starting word (potential "an" needed)
  const aVowelMatch = s.match(/\ba\s+([aeiouAEIOU]\w+)/);
  if (aVowelMatch && !/^(university|union|user|unique|one|once|euro)/i.test(aVowelMatch[1])) {
    flag(file, qId, 'G_A_VOWEL', `${field}: "${s}" ("a ${aVowelMatch[1]}")`,
      'Likely should be "an ' + aVowelMatch[1] + '"');
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
      if (q.questionEn) scanSentence(`ch${ch}`, q.id, q.questionEn, 'questionEn');
      if (Array.isArray(q.options)) {
        for (let i = 0; i < q.options.length; i++) {
          scanSentence(`ch${ch}`, q.id, q.options[i], `options[${i}]`);
        }
      }
    }
  }
}

// Group by type
const byType = {};
for (const f of findings) {
  byType[f.type] = byType[f.type] ?? [];
  byType[f.type].push(f);
}

// Write markdown report
const lines = [`# Grammar Scan — ${new Date().toISOString().slice(0, 16)}`, ''];
lines.push(`Total findings: **${findings.length}** across ${Object.keys(byType).length} pattern types`);
lines.push('');
for (const type of Object.keys(byType).sort()) {
  const items = byType[type];
  lines.push(`## ${type} (${items.length})`);
  lines.push('');
  if (items[0]?.suggestion) {
    lines.push(`> ${items[0].suggestion}`);
    lines.push('');
  }
  for (const f of items.slice(0, 30)) {
    lines.push(`- **${f.file} ${f.qId}** — ${f.snippet}`);
  }
  if (items.length > 30) lines.push(`- ... and ${items.length - 30} more`);
  lines.push('');
}

const outPath = path.join(ROOT, 'docs', 'audits', `grammar-scan-${new Date().toISOString().slice(0,10)}.md`);
fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
console.log(`OK report → ${outPath}`);
console.log(`Total: ${findings.length} findings`);
console.log('Top types:');
for (const t of Object.keys(byType).sort((a,b) => byType[b].length - byType[a].length).slice(0, 10)) {
  console.log(`  ${t}: ${byType[t].length}`);
}
