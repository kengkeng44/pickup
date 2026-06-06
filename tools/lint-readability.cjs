#!/usr/bin/env node
/**
 * lint-readability.cjs (桶 C 新 lint 1/3)
 *
 * Flesch-Kincaid grade-level check on every sentence / question / option /
 * narration string in public/lessons-ch{N}.json.
 *
 * Target audience (per CLAUDE.md v2.0.B.231): 8-12 兒童 + 親子 + A2 Taiwanese.
 * Ideal Flesch-Kincaid grade band = 1.0 - 4.0.
 *
 * Rule:
 *   - WARN if grade > 5    (too hard for A2 / 8-12 kid)
 *   - WARN if grade < 0.5  (suspicious: fake data / single-word / numeric-only)
 *
 * Algorithm (Flesch-Kincaid Grade Level):
 *   0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
 *
 * Syllable count = naive vowel-group count (consonant-vowel transitions).
 *   - lowercase + strip non-alpha
 *   - count groups of consecutive vowels [aeiouy] as 1 syllable
 *   - subtract 1 for trailing silent 'e' if word > 3 chars
 *   - minimum 1 syllable per non-empty word
 *
 * Exit code: 0 always (warn-only — does not block pre-commit hook).
 *
 * Usage:
 *   node tools/lint-readability.cjs           # all chapters
 *   node tools/lint-readability.cjs --ch=1    # ch1 only
 */
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(repoRoot, 'public');

// -----------------------------------------------------------------------------
// CLI args
// -----------------------------------------------------------------------------
function parseArgs() {
  let chFilter = null;
  for (const a of process.argv.slice(2)) {
    const m = /^--ch=(\d+)$/.exec(a);
    if (m) chFilter = Number(m[1]);
  }
  return { chFilter };
}

// -----------------------------------------------------------------------------
// Syllable counter (naive vowel-group)
// -----------------------------------------------------------------------------
function countSyllables(word) {
  const w = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 2) return 1;

  // count vowel groups
  let groups = 0;
  let inVowel = false;
  for (const ch of w) {
    const isVowel = 'aeiouy'.includes(ch);
    if (isVowel && !inVowel) groups += 1;
    inVowel = isVowel;
  }
  // silent trailing 'e' adjustment
  if (w.endsWith('e') && groups > 1 && !w.endsWith('le')) groups -= 1;
  return Math.max(1, groups);
}

// -----------------------------------------------------------------------------
// Flesch-Kincaid grade for one English string
// -----------------------------------------------------------------------------
function fleschKincaid(text) {
  const s = String(text || '').trim();
  if (!s) return null;
  // sentence count: . ! ? as boundary; min 1
  const sentenceMatches = s.match(/[.!?]+/g);
  const sentences = sentenceMatches ? sentenceMatches.length : 1;
  // word count: alpha tokens only
  const wordList = s.split(/\s+/).map(w => w.replace(/[^A-Za-z']/g, '')).filter(Boolean);
  const words = wordList.length;
  if (words === 0) return null;
  let syllables = 0;
  for (const w of wordList) syllables += countSyllables(w);
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  return { grade, words, sentences, syllables };
}

// -----------------------------------------------------------------------------
// Walk lessons -> emit (qId, field, text) tuples
// -----------------------------------------------------------------------------
function collectEnglishStrings(lessons) {
  const out = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      const fields = [];
      if (typeof q.sentence === 'string') fields.push(['sentence', q.sentence]);
      if (typeof q.sentenceEn === 'string') fields.push(['sentenceEn', q.sentenceEn]);
      if (typeof q.question === 'string') fields.push(['question', q.question]);
      if (typeof q.questionEn === 'string') fields.push(['questionEn', q.questionEn]);
      if (typeof q.text === 'string') fields.push(['text', q.text]);
      if (Array.isArray(q.options)) {
        q.options.forEach((o, i) => {
          if (typeof o === 'string') fields.push([`option[${i}]`, o]);
        });
      }
      for (const [field, text] of fields) out.push({ qId: q.id, field, text });
    }
  }
  return out;
}

// -----------------------------------------------------------------------------
// Verdict
// -----------------------------------------------------------------------------
function verdict(grade) {
  if (grade === null) return 'skip';
  if (grade > 5) return 'WARN_TOO_HARD';
  if (grade < 0.5) return 'WARN_SUSPICIOUS';
  return 'OK';
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
function main() {
  const { chFilter } = parseArgs();
  const files = fs
    .readdirSync(publicDir)
    .filter(f => /^lessons-ch\d+\.json$/.test(f))
    .filter(f => {
      if (chFilter == null) return true;
      const m = /^lessons-ch(\d+)\.json$/.exec(f);
      return m && Number(m[1]) === chFilter;
    })
    .sort();

  if (files.length === 0) {
    console.log('lint-readability: no lessons-ch*.json files matched.');
    process.exit(0);
  }

  console.log('lint-readability (Flesch-Kincaid, ideal band 1-4, warn >5 or <0.5)');
  console.log('='.repeat(78));

  let totalWarn = 0;
  let totalOk = 0;
  let totalSkip = 0;

  for (const file of files) {
    const fullPath = path.resolve(publicDir, file);
    let lessons;
    try {
      lessons = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } catch (e) {
      console.error(`  FAIL parse ${file}: ${e.message}`);
      continue;
    }
    const samples = collectEnglishStrings(lessons);

    const warnRows = [];
    let okCount = 0;
    let skipCount = 0;

    for (const { qId, field, text } of samples) {
      const r = fleschKincaid(text);
      if (!r) {
        skipCount += 1;
        continue;
      }
      const v = verdict(r.grade);
      if (v === 'WARN_TOO_HARD' || v === 'WARN_SUSPICIOUS') {
        warnRows.push({ qId, field, grade: r.grade, words: r.words, verdict: v, preview: text.slice(0, 60) });
      } else {
        okCount += 1;
      }
    }

    console.log(`\n--- ${file} (${samples.length} English strings) ---`);
    if (warnRows.length === 0) {
      console.log(`  OK — all within band  (ok=${okCount} skip=${skipCount})`);
    } else {
      console.log(`  ${warnRows.length} warning(s):  (ok=${okCount} skip=${skipCount})`);
      console.log(`  ${'Q ID'.padEnd(22)} ${'field'.padEnd(12)} ${'grade'.padStart(6)}  ${'verdict'.padEnd(16)} preview`);
      for (const r of warnRows) {
        console.log(`  ${r.qId.padEnd(22)} ${r.field.padEnd(12)} ${r.grade.toFixed(2).padStart(6)}  ${r.verdict.padEnd(16)} "${r.preview}"`);
      }
    }
    totalWarn += warnRows.length;
    totalOk += okCount;
    totalSkip += skipCount;
  }

  console.log('\n' + '='.repeat(78));
  console.log(`Summary: OK=${totalOk}  WARN=${totalWarn}  SKIP=${totalSkip}`);
  console.log('(warn-only; exit 0 — does not block pre-commit)');
  process.exit(0);
}

main();
