#!/usr/bin/env node
/**
 * Build-time validation: parse all public/lessons-ch*.json files against
 * the runtime Zod schema. Catches schema-data mismatches before deploy.
 *
 * Root cause prevention: kt-ch1-06 bug (5-element options array vs
 * tuple([4])) shipped in v1.9.50 because no build-time validation
 * existed. Production users hit it 7 commits later.
 *
 * Design note: full Zod validation requires running the TS schema in
 * Node which needs tsx / vite-node. We bypass by doing fast JSON shape
 * checks here (top-level array + parseable JSON); chapter-specific
 * vitest files (Task 10+) do the real Zod validation. Splitting the
 * checks lets `npm run build` stay fast (~20ms node script) and reuse
 * the test framework's existing TS support.
 *
 * v2.0.B.161.3: added mirror lint guards per B.160 + B.161.2 QA agent
 * verdicts. Catches identity / negation / substring leaks at build time
 * so future content authors can't ship them. Set MIRROR_LINT_STRICT=1
 * env to fail build on warning; default = warn-only.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const publicDir = resolve(repoRoot, 'public');

const STRICT = process.env.MIRROR_LINT_STRICT === '1';
// E3 content-guard rules (emoji / CJK pre-reveal / stem length) get their
// own opt-in flag so flipping MIRROR_LINT_STRICT doesn't suddenly fail the
// build on pre-existing content violations. Default = warn-only.
const CONTENT_STRICT = process.env.CONTENT_LINT_STRICT === '1';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'and', 'or', 'but', 'if', 'so', 'of', 'to', 'in', 'on', 'at', 'by', 'for',
  'with', 'from', 'as', 'it', 'its', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'we', 'they', 'his', 'her', 'their',
  'do', 'does', 'did', 'has', 'have', 'had', 'will', 'would', 'can', 'could',
  'my', 'your', 'me', 'him', 'us', 'them', 'mine', 'yours',
]);
const NEGATION_WORDS = new Set(['no', 'not', 'never', "don't", "doesn't", "didn't", "won't", "can't", "isn't", "aren't", "wasn't", "weren't"]);

function tokenize(s) {
  return String(s || '').toLowerCase().replace(/[.,!?;:"'()]/g, '').split(/\s+/).filter(Boolean);
}
function contentTokens(s) {
  return tokenize(s).filter((t) => !STOPWORDS.has(t));
}
function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : inter / union;
}
function negationOnlyDiff(s1, s2) {
  const t1 = tokenize(s1).filter((t) => !NEGATION_WORDS.has(t));
  const t2 = tokenize(s2).filter((t) => !NEGATION_WORDS.has(t));
  return t1.join(' ') === t2.join(' ');
}
function substring3(haystack, needle) {
  // needle ≥3 連續 token substring of haystack
  const h = tokenize(haystack).join(' ');
  const n = tokenize(needle);
  if (n.length < 3) return false;
  return h.includes(n.join(' '));
}

// v2.0.B.173: 3 new lint rules per content QA audit Section E.
function lintExtended(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      // Rule X1: listen-comprehension sentence-is-question (TTS plays question)
      if (q.type === 'listen-comprehension' && typeof q.sentence === 'string' && q.sentence.trim().endsWith('?')) {
        issues.push(`${file} ${q.id}: X1_SENTENCE_IS_QUESTION ("${q.sentence.slice(0, 40)}")`);
      }
      // Rule X2: option-list-bias (all 4 options share first word)
      if (Array.isArray(q.options) && q.options.length === 4) {
        const firsts = q.options.map(o => String(o).trim().split(/\s+/)[0]?.toLowerCase() || '');
        if (firsts.every(w => w && w === firsts[0])) {
          issues.push(`${file} ${q.id}: X2_OPTION_LIST_BIAS (all start with "${firsts[0]}")`);
        }
      }
      // Rule X3: R1 verbatim word-level — every word of correct option appears in sentence
      if ((q.type === 'listen-mc' || q.type === 'listen-comprehension') && q.subSkill !== 'vocab') {
        const correct = (q.options || [])[q.correctIndex];
        const sentence = q.sentence || q.sentenceEn || q.text || '';
        if (typeof correct === 'string' && correct.length > 3 && sentence) {
          const words = correct.toLowerCase().split(/\s+/).filter(w => w.length > 2);
          const sentLower = sentence.toLowerCase();
          if (words.length > 0 && words.every(w => sentLower.includes(w))) {
            issues.push(`${file} ${q.id}: X3_R1_VERBATIM_WORDS ("${correct}" all words in sentence)`);
          }
        }
      }
    }
  }
  return issues;
}

// E3 content guard — mirrors pickup-item-writer authoring rules at build
// time. Warn-only by default (existing chapters violate the CJK rule);
// set CONTENT_LINT_STRICT=1 to fail the build on these.
//   C1_EMOJI_IN_TEXT   — no emoji in question/options for non-emoji types
//                        (emoji-pick / listen-emoji are the by-design
//                        exceptions; pure language learning elsewhere)
//   C2_CJK_PRE_REVEAL  — no Chinese in pre-reveal fields question /
//                        options / sentence (Chinese only in explanationZh
//                        / post-reveal; listen-tf-zh carve-out exempt)
//   C3_STEM_TOO_LONG   — stem (question text) word count ≤ 11
const EMOJI_RE = /\p{Extended_Pictographic}/u;
const CJK_RE = /\p{Script=Han}/u;
const EMOJI_EXEMPT_TYPES = new Set(['emoji-pick', 'listen-emoji']);
const CJK_EXEMPT_TYPES = new Set(['listen-tf-zh']); // Chinese by design

function stemWordCount(s) {
  // strip emoji (e.g. legacy 🔊 prefix) so glyphs don't count as words
  return String(s || '')
    .replace(/\p{Extended_Pictographic}/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function lintContent(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      const opts = Array.isArray(q.options) ? q.options : [];
      // Rule C1: emoji in question/options (non-emoji question types)
      if (!EMOJI_EXEMPT_TYPES.has(q.type)) {
        if (typeof q.question === 'string' && EMOJI_RE.test(q.question)) {
          issues.push(`${file} ${q.id}: C1_EMOJI_IN_TEXT (question: "${q.question.slice(0, 40)}")`);
        }
        for (const o of opts) {
          if (typeof o === 'string' && EMOJI_RE.test(o)) {
            issues.push(`${file} ${q.id}: C1_EMOJI_IN_TEXT (option: "${String(o).slice(0, 40)}")`);
          }
        }
      }
      // Rule C2: CJK in pre-reveal fields (question / options / sentence)
      if (!CJK_EXEMPT_TYPES.has(q.type)) {
        for (const [field, val] of [['question', q.question], ['sentence', q.sentence]]) {
          if (typeof val === 'string' && CJK_RE.test(val)) {
            issues.push(`${file} ${q.id}: C2_CJK_PRE_REVEAL (${field}: "${val.slice(0, 40)}")`);
          }
        }
        for (const o of opts) {
          if (typeof o === 'string' && CJK_RE.test(o)) {
            issues.push(`${file} ${q.id}: C2_CJK_PRE_REVEAL (option: "${String(o).slice(0, 40)}")`);
          }
        }
      }
      // Rule C3: stem (question text) word count ≤ 11
      if (typeof q.question === 'string') {
        const wc = stemWordCount(q.question);
        if (wc > 11) {
          issues.push(`${file} ${q.id}: C3_STEM_TOO_LONG (${wc} words: "${q.question.slice(0, 50)}")`);
        }
      }
    }
  }
  return issues;
}

function lintMirror(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      const sentence = q.sentence || q.sentenceEn || q.text || '';
      // listen-tf: sentence vs questionEn
      if (q.type === 'listen-tf') {
        const qEn = q.questionEn || '';
        if (!sentence || !qEn) continue;
        if (tokenize(sentence).join(' ') === tokenize(qEn).join(' ')) {
          issues.push(`${file} ${q.id}: MIRROR_IDENTITY (sentence == questionEn byte-equal)`);
        } else if (negationOnlyDiff(sentence, qEn)) {
          issues.push(`${file} ${q.id}: MIRROR_NEGATION (only no/not differs)`);
        } else {
          const j = jaccard(contentTokens(sentence), contentTokens(qEn));
          if (j >= 0.7) issues.push(`${file} ${q.id}: MIRROR_GRAMMAR (jaccard ${j.toFixed(2)})`);
        }
      }
      // listen-mc / listen-comprehension: option leak in sentence/question
      if ((q.type === 'listen-mc' || q.type === 'listen-comprehension') && q.subSkill !== 'vocab') {
        const correct = (q.options || [])[q.correctIndex];
        if (typeof correct !== 'string' || correct.length < 3) continue;
        if (substring3(sentence, correct)) {
          issues.push(`${file} ${q.id}: R1_SUBSTRING (correct option ⊆ sentence: "${correct}")`);
        }
        const qPrompt = q.question || q.questionEn || '';
        if (qPrompt && substring3(qPrompt, correct)) {
          issues.push(`${file} ${q.id}: A6_OPTION_IN_QUESTION ("${correct}")`);
        }
      }
    }
  }
  return issues;
}

const files = readdirSync(publicDir).filter(
  (f) => /^lessons-ch\d+\.json$/.test(f)
);

if (files.length === 0) {
  console.log('No lessons-ch*.json files found. Skipping validation.');
  process.exit(0);
}

let allOk = true;
let totalIssues = 0;
let totalContentIssues = 0;
for (const file of files) {
  const path = resolve(publicDir, file);
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8'));
    if (!Array.isArray(raw)) {
      console.error(`FAIL ${file}: top-level must be an array`);
      allOk = false;
      continue;
    }
    const mirrorIssues = lintMirror(raw, file);
    const extendedIssues = lintExtended(raw, file);
    const contentIssues = lintContent(raw, file);
    const allIssues = [...mirrorIssues, ...extendedIssues, ...contentIssues];
    totalIssues += mirrorIssues.length + extendedIssues.length;
    totalContentIssues += contentIssues.length;
    if (allIssues.length > 0) {
      console.warn(`WARN ${file}: ${allIssues.length} lint issue(s):`);
      for (const m of allIssues) console.warn(`  ${m}`);
      if (STRICT && (mirrorIssues.length > 0 || extendedIssues.length > 0)) allOk = false;
      if (CONTENT_STRICT && contentIssues.length > 0) allOk = false;
    } else {
      console.log(`OK ${file}: ${raw.length} lessons (JSON shape + mirror + extended + content lint)`);
    }
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
    allOk = false;
  }
}

if (totalIssues > 0) {
  console.warn(`\nTotal mirror-lint issues: ${totalIssues}`);
  if (STRICT) console.error('STRICT mode: build failed.');
  else console.warn('(warn-only; set MIRROR_LINT_STRICT=1 to fail build)');
}
if (totalContentIssues > 0) {
  console.warn(`\nTotal content-lint (E3) issues: ${totalContentIssues}`);
  if (CONTENT_STRICT) console.error('CONTENT_LINT_STRICT mode: build failed.');
  else console.warn('(warn-only; set CONTENT_LINT_STRICT=1 to fail build)');
}
if (!allOk) {
  console.error('\nValidation failed. Run `npm test` for full Zod validation details.');
}
process.exit(allOk ? 0 : 1);
