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
// v2.0.B.277: R2 length-parity is now fail-on-violation by default (corpus is
// at 0 after B.273-276, so this only catches regressions). Escape hatch:
// R2_LINT_OFF=1 downgrades it back to warn-only.
const R2_OFF = process.env.R2_LINT_OFF === '1';

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
      // Rule X1: listen/comprehension sentence-is-question (TTS plays question)
      if ((q.type === 'listen-comprehension' || q.type === 'comprehension') && typeof q.sentence === 'string' && q.sentence.trim().endsWith('?')) {
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
      if ((q.type === 'listen-mc' || q.type === 'listen-comprehension' || q.type === 'comprehension') && q.subSkill !== 'vocab') {
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

// v2.0.B.273: R2 length-parity lint (ARCH-REC #21, follow-up to ARCH-REC #1).
// Option length is a top-3 test-wiseness cue — when the correct option is the
// longest, children aged 8-12 learn "longest = correct" in 2-3 trials. Applies
// to any ≥3-option MCQ with a numeric correctIndex (listen-mc / emoji-pick /
// listen-comprehension / listen-emoji / picture-mc). 2-option Yes/No (listen-tf)
// is structurally exempt via the length<3 skip. warn-only like the other rules.
function lintR2LengthParity(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (!Array.isArray(q.options) || q.options.length < 3) continue;
      if (typeof q.correctIndex !== 'number') continue;
      const lens = q.options.map(o => String(o).trim().length);
      const maxL = Math.max(...lens);
      const minL = Math.min(...lens);
      if (minL === 0) continue;
      if (lens[q.correctIndex] !== maxL) continue; // only flag when correct is the (tied) longest
      const ratio = maxL / minL;
      if (ratio > 2.0) {
        issues.push(`${file} ${q.id}: X8_R2_LENGTH_SEVERE (ratio=${ratio.toFixed(2)}, correct=longest — near-certain length tell)`);
      } else if (ratio > 1.5) {
        issues.push(`${file} ${q.id}: X8_R2_LENGTH_WARN (ratio=${ratio.toFixed(2)}, correct=longest — likely length tell)`);
      }
    }
  }
  return issues;
}

// v2.0.B.295 (cron content 0614 ARCH-REC #31): A5 cultural-reference schema gate.
// high_unfamiliar Q → correct answer MUST be audio-anchored (content-word overlap
// with sentence ≥ 0.25 OR a sentence word appears inside the correct option),
// else the answer relies on cultural schema, not listening. high_familiar Q →
// must be difficulty 'easy' (over-familiar to Taiwanese kids = difficulty floor).
function lintCulturalSchema(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (!q.culturalLoad || q.culturalLoad === 'low') continue;
      if (q.culturalLoad === 'high_familiar') {
        if (q.difficulty && q.difficulty !== 'easy') {
          issues.push(`${file} ${q.id}: A5_HIGH_FAMILIAR_DIFF (high_familiar 應標 difficulty: easy, 現為 ${q.difficulty})`);
        }
        continue;
      }
      if (q.culturalLoad === 'high_unfamiliar') {
        const correct = (q.options || [])[q.correctIndex];
        const sentence = q.sentence || q.sentenceEn || q.text || '';
        if (typeof correct !== 'string' || !sentence) continue;
        const corr = contentTokens(correct);
        if (corr.length === 0) continue;
        const sent = contentTokens(sentence);
        const overlap = corr.filter((w) => sent.includes(w)).length / corr.length;
        const substringAnchor = sent.some((w) => correct.toLowerCase().includes(w));
        if (overlap < 0.25 && !substringAnchor) {
          issues.push(`${file} ${q.id}: A5_CULTURAL_SCHEMA (high_unfamiliar Q: 正解未被句子錨定 — 靠文化背景才答得出)`);
        }
      }
    }
  }
  return issues;
}

// v2.0.B.497 (ARCH-REC #91, per user 同意 A 類 lint): X44 + X46 (WARN-only).
// X45 (all-morph) + X47 (cultural) = B 類 (與 distribution-standard grammar-mc 教條衝突 /
// 需 culturalOrigin schema), 依 docs/standards/2026-06-29-arch-rec-handling-convention.md 留人決定。

// X44_NON_WORD_VERB: grammar-mc 選項出現不規則動詞硬加 -ed 的非字 (goed/puted/leaded/hitted…)。
// 來源: ArXiv 2403.02078 / Duolingo distractor pipeline — 所有干擾項必須是真實英文字。
const X44_IRREG = ['go','come','run','put','lead','hit','cut','set','make','take','give','find',
  'tell','keep','sit','win','sing','swim','ring','begin','fly','grow','know','throw','eat','see',
  'say','do','have','get','feel','meet','read','build','send','spend','hold','stand','catch',
  'teach','buy','bring','think','fight','break','speak','steal','drive','ride','write','fall',
  'wear','choose','forget','hide','bite','beat','lose'];
const X44_RE = new RegExp('^(' + X44_IRREG.join('|') + ')ed$', 'i');
function lintNonWordVerb(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'grammar-mc' || !Array.isArray(q.options)) continue;
      for (const o of q.options) {
        if (X44_RE.test(String(o).trim())) {
          issues.push(`${file} ${q.id}: X44_NON_WORD_VERB (非字「${o}」— 不規則動詞不能加 ed)`);
        }
      }
    }
  }
  return issues;
}

// X46_LISTEN_TF_POLARITY: 一節內 listen-tf 同一個答案 (Yes/No) 佔比 ≥75% → acquiescence bias。
// 來源: GESIS 2016 / ETS TOEIC T/F 45-55% 平衡。樣本 <4 題不判 (太小)。correctIndex 1 = No。
function lintListenTfPolarity(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    const tfs = (lesson.questions || []).filter(q => q.type === 'listen-tf' && typeof q.correctIndex === 'number');
    if (tfs.length < 4) continue;
    const noCount = tfs.filter(q => q.correctIndex === 1).length;
    const yesCount = tfs.length - noCount;
    const ratio = Math.max(noCount, yesCount) / tfs.length;
    if (ratio >= 0.75) {
      const dom = noCount >= yesCount ? 'No' : 'Yes';
      issues.push(`${file} ${lesson.id}: X46_LISTEN_TF_POLARITY (${dom} 佔 ${Math.round(ratio * 100)}% / ${tfs.length} 題 — acquiescence bias)`);
    }
  }
  return issues;
}

// X47_CULTURAL_BRIDGE (per user 同意, keyword stopgap — 正式版需 culturalOrigin schema = B 類待批)。
// 規則: 一「章」出現文化專名 (djinn/baba yaga/洞節…) 但**整章沒有任一題** expZh 含文化橋接
// marker (阿拉伯/俄羅斯/民間/虛構/節日…) → WARN。只判「整章缺橋接」(非每題), 避免「同一專名
// 每次出現都 flag」的噪音 (audit 指引: 首次出現給橋接即可)。清單可擴。warn-only。
const X47_ENTITIES = ['djinn', 'baba yaga', 'vasilisa', 'kipling', 'howling desert', 'chicken leg', 'chicken-leg', '洞節'];
const X47_MARKERS = ['阿拉伯', '俄羅斯', '斯拉夫', '民間', '傳統', '虛構', '神話', '文化', '節日', '護身', '天道', '吉卜林', '洞節是'];
function lintCulturalBridge(lessons, file) {
  const issues = [];
  for (const ent of X47_ENTITIES) {
    let appears = false, bridged = false;
    for (const lesson of lessons) {
      for (const q of lesson.questions || []) {
        const en = String(q.sentence || q.questionEn || q.question || q.questionZh || '').toLowerCase();
        if (!en.includes(ent)) continue;
        appears = true;
        const zh = String(q.explanationZh || '');
        if (X47_MARKERS.some(m => zh.includes(m))) bridged = true;
      }
    }
    if (appears && !bridged) {
      issues.push(`${file} [${ent}]: X47_CULTURAL_BRIDGE (整章出現文化專名「${ent}」但無任一題 expZh 有文化橋接 marker)`);
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
      // listen-mc / listen-comprehension / comprehension: option leak in sentence/question
      if ((q.type === 'listen-mc' || q.type === 'listen-comprehension' || q.type === 'comprehension') && q.subSkill !== 'vocab') {
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
let r2Total = 0;
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
    const r2Issues = lintR2LengthParity(raw, file);
    const culturalIssues = lintCulturalSchema(raw, file);
    const nonWordIssues = lintNonWordVerb(raw, file);       // X44 (WARN)
    const tfPolarityIssues = lintListenTfPolarity(raw, file); // X46 (WARN)
    const cultBridgeIssues = lintCulturalBridge(raw, file);  // X47 (WARN, keyword stopgap)
    r2Total += r2Issues.length;
    const allIssues = [...mirrorIssues, ...extendedIssues, ...r2Issues, ...culturalIssues, ...nonWordIssues, ...tfPolarityIssues, ...cultBridgeIssues];
    totalIssues += allIssues.length;
    if (allIssues.length > 0) {
      console.warn(`WARN ${file}: ${allIssues.length} lint issue(s):`);
      for (const m of allIssues) console.warn(`  ${m}`);
      if (STRICT) allOk = false;
    } else {
      console.log(`OK ${file}: ${raw.length} lessons (JSON shape + mirror + extended lint)`);
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
// R2 length-parity: fail-on-violation by default (regression guard).
if (r2Total > 0 && !R2_OFF) {
  console.error(`\n${r2Total} R2 length-tell violation(s) (X8_R2_LENGTH_*). R2 is fail-on-violation — expand short distractors to within 1.5× of the correct option, or set R2_LINT_OFF=1 to bypass.`);
  allOk = false;
}
if (!allOk) {
  console.error('\nValidation failed. Run `npm test` for full Zod validation details.');
}
process.exit(allOk ? 0 : 1);
