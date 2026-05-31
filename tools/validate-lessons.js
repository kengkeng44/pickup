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
    totalIssues += mirrorIssues.length;
    if (mirrorIssues.length > 0) {
      console.warn(`WARN ${file}: ${mirrorIssues.length} mirror-lint issue(s):`);
      for (const m of mirrorIssues) console.warn(`  ${m}`);
      if (STRICT) allOk = false;
    } else {
      console.log(`OK ${file}: ${raw.length} lessons (JSON shape + mirror lint)`);
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
if (!allOk) {
  console.error('\nValidation failed. Run `npm test` for full Zod validation details.');
}
process.exit(allOk ? 0 : 1);
