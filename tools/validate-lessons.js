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
  // 精準版 (ARCH-REC #92): 有 culturalOrigin metadata 的課, bridgeNoteZh 不可空。
  for (const lesson of lessons) {
    const co = lesson.culturalOrigin;
    if (co && (!co.bridgeNoteZh || !String(co.bridgeNoteZh).trim())) {
      issues.push(`${file} ${lesson.id}: X47_CULTURAL_BRIDGE (culturalOrigin 有標但 bridgeNoteZh 空)`);
    }
  }
  // keyword stopgap: 未標 culturalOrigin 的章節, 用關鍵字掃「整章專名缺文化橋接」。
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

// X48_NGRAM_VERBATIM_CORRECT (ARCH-REC #93, per user 同意 A 類): 理解類題的正解不該「從句子
// 原封不動抄 3 個連續實詞」(verbatim copy tell — 不用懂意思, 抄最像的就對)。把 X3 單詞檢查
// 擴成 3-gram sliding window。picture-mc / 打字 / 重組類天生需 verbatim → 不掃; 只掃理解家族。
// 來源: arxiv 2404.07720 ROUGE-2 overlap filter。warn-only。
const X48_TYPES = new Set(['comprehension', 'listen-mc', 'read-comprehension', 'listen-comprehension']);
function ngram3Overlap(sentence, opt) {
  const sent = String(sentence).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
  const ow = String(opt).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  for (let i = 0; i <= ow.length - 3; i++) {
    const g = ow.slice(i, i + 3).join(' ');
    if (sent.includes(g)) return g;
  }
  return null;
}
function lintNgramVerbatim(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (!X48_TYPES.has(q.type) || typeof q.correctIndex !== 'number' || !Array.isArray(q.options)) continue;
      const correct = q.options[q.correctIndex];
      const sent = q.sentence || q.questionEn || q.question || '';
      if (!correct || !sent) continue;
      const g = ngram3Overlap(sent, correct);
      if (g) issues.push(`${file} ${q.id}: X48_NGRAM_VERBATIM_CORRECT (正解與句子重疊 3-gram「${g}」— 抄句 tell)`);
    }
  }
  return issues;
}

// X49_STIMULUS_REUSE (ARCH-REC #94, per user 同意 A 類 lint): 同一節內, 同一句 sentence 同時
// 當 comprehension/listen-mc/listen-comprehension 的考題 stimulus *又* 當 listen-tf 的 stimulus →
// 學生第一題已聽/讀過, 第二題退化成「回憶」而非「聽力」(Buck 2001 §5.3 stimulus repetition)。
// X49B_STIMULUS_REUSE_COMP (per user 2026-07-01「立規則不要重複」): 同一句被 ≥2 個理解/聽力題
// 重複當 stimulus (即使沒 listen-tf) 也退化成回憶 → 一併掃出。兩者皆 warn-only, content cron 漸修
// (改寫其中一題為 paraphrase 或換 stimulus, 不動 correctIndex)。build gate = cron gate, 自動生效。
const X49_COMP_TYPES = new Set(['comprehension', 'listen-mc', 'listen-comprehension', 'read-comprehension']);
function normStimulus(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
}
function lintStimulusReuse(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    // norm sentence → { comp: bool, tf: bool }
    const seen = new Map();
    for (const q of lesson.questions || []) {
      const sent = q.sentence || q.questionEn || q.text || '';
      const key = normStimulus(sent);
      if (!key || key.split(' ').length < 3) continue; // 太短不算 stimulus
      const isComp = X49_COMP_TYPES.has(q.type);
      const isTf = q.type === 'listen-tf';
      if (!isComp && !isTf) continue;
      const rec = seen.get(key) || { comp: false, compCount: 0, tf: false, snippet: sent };
      if (isComp) { rec.comp = true; rec.compCount += 1; }
      if (isTf) rec.tf = true;
      seen.set(key, rec);
    }
    for (const [, rec] of seen) {
      const snip = String(rec.snippet).slice(0, 48);
      if (rec.comp && rec.tf) {
        issues.push(`${file} ${lesson.id}: X49_STIMULUS_REUSE (同句「${snip}…」同節既當理解題又當 listen-tf — 退化成回憶)`);
      } else if (rec.compCount >= 2) {
        // X49B (per user「立規則不要重複」): 同一句被 ≥2 個理解/聽力題當 stimulus →
        // 第二題退化成回憶而非理解 (Buck 2001 §5.3)。warn-only, content cron 漸修。
        issues.push(`${file} ${lesson.id}: X49B_STIMULUS_REUSE_COMP (同句「${snip}…」同節被 ${rec.compCount} 個理解/聽力題重複當 stimulus — 退化成回憶)`);
      }
    }
  }
  return issues;
}

// X56_PICTURE_MC_SUBJECT_NP_VERBATIM (ARCH-REC #100, per user 2026-07-01 核准): X48 天生放過
// picture-mc (caption 需描述畫面 → 難免與句子有字重疊), 但若正解 caption 的「主詞名詞片語」
// (開頭 3 個實詞) 跟句子開頭 3 個實詞照抄 → 小孩用文字比對就選中, 繞過看圖理解 (Buck 2001 §5.3;
// Cambridge YL item spec: caption 應描述構圖/動作/位置, 不是複述句子主角)。warn-only, cron 漸修:
// 把 caption 改成描述畫面的說法 (不動 correctIndex)。
const X56_STOP = new Set(['the', 'a', 'an', 'is', 'was', 'to', 'of', 'in', 'and', 'or', 'it', 'on', 'at', 'with']);
function firstContentTokens(s, n) {
  return String(s).toLowerCase().match(/\b[a-z]+\b/g)?.filter(w => !X56_STOP.has(w)).slice(0, n) || [];
}
function lintPictureMcSubjectNp(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'picture-mc' || typeof q.correctIndex !== 'number' || !Array.isArray(q.options)) continue;
      const correct = q.options[q.correctIndex] || '';
      const sent = q.sentence || '';
      if (!correct || !sent) continue;
      const sentTok = firstContentTokens(sent, 3);
      const capTok = firstContentTokens(correct, 3);
      const shared = sentTok.filter(t => capTok.includes(t));
      if (shared.length >= 2) {
        issues.push(`${file} ${q.id}: X56_PICTURE_MC_SUBJECT_NP_VERBATIM (caption 主詞「${shared.join(' ')}」照抄句子開頭 — 繞過看圖)`);
      }
    }
  }
  return issues;
}

// X57_ANTONYM_PAIR_MIRROR (ARCH-REC #101, per user 2026-07-01 核准): 若正解與「剛好一個」干擾項
// 成反義對 (fast/slow, warm/cold, proud/shy…), 其餘干擾項不含正解的反義詞 → 小孩不用理解、挑對立
// 那個就中, 4 選 1 退化成 2 選 1 (Tarrant 2009 / Rodriguez 2005 / ETS 2024「contrast tell」禁用)。
// warn-only, build gate = cron gate 自動生效, content cron 漸修 (改該干擾項成非對立, 不動 correctIndex)。
const X57_ANTONYM_MAP = {
  happy: ['sad', 'unhappy'], sad: ['happy'], fast: ['slow'], slow: ['fast'],
  big: ['small', 'tiny', 'little'], small: ['big', 'large'], large: ['small', 'tiny'],
  warm: ['cold', 'cool'], cold: ['warm', 'hot'], hot: ['cold'],
  strong: ['weak'], weak: ['strong'], old: ['young', 'new'], young: ['old'],
  loud: ['quiet', 'silent', 'soft'], quiet: ['loud', 'noisy'], noisy: ['quiet'],
  full: ['empty'], empty: ['full'], found: ['lost'], lost: ['found'],
  gave: ['took'], took: ['gave'], won: ['lost'], brave: ['afraid', 'scared'],
  afraid: ['brave'], scared: ['brave', 'proud'], proud: ['shy', 'scared', 'ashamed'],
  shy: ['proud', 'bold'], kind: ['cruel', 'unkind', 'mean'], cruel: ['kind'], unkind: ['kind'],
  easy: ['hard', 'difficult'], hard: ['easy'], difficult: ['easy'],
  always: ['never'], never: ['always'], first: ['last'], last: ['first'],
  best: ['worst'], worst: ['best'], alive: ['dead'], dead: ['alive'],
  opened: ['closed'], closed: ['opened'], open: ['closed', 'shut'],
  helped: ['hurt'], hurt: ['helped'], high: ['low'], low: ['high'],
  fresh: ['tired'], tired: ['fresh'], light: ['heavy'], heavy: ['light'],
  bigger: ['smaller'], smaller: ['bigger'], longer: ['shorter'], shorter: ['longer'],
  short: ['long'], long: ['short'], rich: ['poor'], poor: ['rich'],
};
const X57_STOP = new Set(['the', 'a', 'an', 'is', 'was', 'were', 'to', 'of', 'in', 'and', 'or', 'it',
  'on', 'at', 'with', 'he', 'she', 'they', 'him', 'her', 'his', 'them', 'not', 'no', 'but', 'so', 'as', 'too', 'very']);
function contentWordSet(s) {
  return new Set((String(s).toLowerCase().match(/\b[a-z]+\b/g) || []).filter(w => !X57_STOP.has(w)));
}
function lintAntonymPairMirror(lessons, file) {
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (typeof q.correctIndex !== 'number' || !Array.isArray(q.options) || q.options.length < 3) continue;
      const correct = contentWordSet(q.options[q.correctIndex]);
      const correctAntonyms = new Set();
      for (const w of correct) for (const a of (X57_ANTONYM_MAP[w] || [])) correctAntonyms.add(a);
      if (correctAntonyms.size === 0) continue;
      let hits = 0, hitWord = '';
      q.options.forEach((opt, i) => {
        if (i === q.correctIndex) return;
        const dw = contentWordSet(opt);
        for (const a of correctAntonyms) if (dw.has(a)) { hits++; hitWord = a; break; }
      });
      if (hits === 1) {
        issues.push(`${file} ${q.id}: X57_ANTONYM_PAIR_MIRROR (正解與「剛好一個」干擾項成反義對「${hitWord}」— 4選1 退化成 2選1)`);
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
    const ngramIssues = lintNgramVerbatim(raw, file);        // X48 (WARN, 3-gram verbatim)
    const stimulusIssues = lintStimulusReuse(raw, file);     // X49 (WARN, cross-type stimulus reuse)
    const pictureNpIssues = lintPictureMcSubjectNp(raw, file); // X56 (WARN, picture-mc subject-NP verbatim)
    const antonymMirrorIssues = lintAntonymPairMirror(raw, file); // X57 (WARN, antonym-pair mirror)
    r2Total += r2Issues.length;
    const allIssues = [...mirrorIssues, ...extendedIssues, ...r2Issues, ...culturalIssues, ...nonWordIssues, ...tfPolarityIssues, ...cultBridgeIssues, ...ngramIssues, ...stimulusIssues, ...pictureNpIssues, ...antonymMirrorIssues];
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
