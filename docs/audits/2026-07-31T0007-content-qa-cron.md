# Content QA — 2026-07-31 00:07 UTC

**Today's angle:** R1 — Paraphrase 深探 (Buck 1991/2001 verbatim echo ban)
The correct MC answer MUST NOT be a verbatim substring of the source sentence. Learners should need to process meaning, not scan for matching text.

**Focus:** Ch25–31 (愚公移山 / 阿基米德 / 西遊記孫悟空 / 三顧茅廬 / 奧德修斯 / 海格力斯 / 羅賓漢)

**Rotation context:** Previous 8 cycles: R2, #12, A7, A1, A4, #11, A5, A6 — R1 not covered in past 8 cycles.

**Scope:** 254 MC-type Qs scanned across Ch25–31 (`listen-mc`: 104, `comprehension`: 136, `picture-mc`: 14). Narration entries excluded.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-07-31 00:07 UTC

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)

Ch1:  17 lint issues (X2×3, X49×9, X49B×3, X57×4)
Ch8:   9 lint issues (X2×2, X48×2, X49×4, X49B×1, X57×1)
Ch9:   8 lint issues (X2×2, X49×3, X57×3)
Ch10:  9 lint issues (X2×3, X49×3, X49B×2, X57×1)
Ch11: 16 lint issues (X2×3, X48×1, X49×7, X49B×2, X57×2)
Ch12: 12 lint issues (X2×1, X49×7, X49B×1, X57×1)
```

Ch25–31: 0 existing lint flags in validate-lessons.js output for these chapters — all structural rules pass. R1 semantic violations (this angle) are not yet caught by the linter.

---

## B. Violation Table

| Ch | Q ID | type | sentence snippet | violation | 修法 | audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| ch27 | kt-ch27-l6-q3 | listen-mc | "Only his head and one arm could move from the heavy stone." | **P0 R1-VERBATIM-SUBSTRING** — correct option "only his head and one arm" is exact substring of sentence | Replace with paraphrase: "just his neck and a single arm were free" | No |
| ch29 | kt-ch29-l5-q8 | listen-mc | "Day after day the trip felt easy and good." | **P0 R1-VERBATIM-SUBSTRING** — correct option "easy and good" is exact substring | Replace: "pleasant and without trouble" | No |
| ch30 | kt-ch30-l4-q6 | listen-mc | "He let the arrow fly. It hit the lion right in the chest." | **P0 R1-VERBATIM-SUBSTRING** — correct option "right in the chest" is exact substring | Replace: "square in the middle of its body" | No |
| ch31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper on Robin's front door for everyone to see." | **P0 R1-VERBATIM-SUBSTRING** — correct option "on Robin's front door" is exact substring | Replace: "posted at the entrance to his house" | No |
| ch25 | kt-ch25-l7-x9 | comprehension | "People still tell this story to say: if you never give up, great things can happen." | P1 R1-NGRAM-ECHO-2gram "never give" | Replace: "persisting leads to big outcomes" | No |
| ch26 | kt-ch26-l4-q6 | listen-mc | "Most people would have called for a cloth to wipe it up." | P1 R1-NGRAM-ECHO-2gram "cloth wipe" | Replace: "asked for something to clean it up" | No |
| ch26 | kt-ch26-l6-q6 | listen-mc | "Beside the crown they placed a piece of pure gold of the same weight." | P1 R1-NGRAM-ECHO-2gram "pure gold" | Replace: "solid gold of matching weight" | No |
| ch26 | kt-ch26-l7-q6 | listen-mc | "The big idea came from a small thing he saw with care." | P1 R1-NGRAM-ECHO-2gram "small thing" | Replace: "a tiny detail observed closely" | No |
| ch27 | kt-ch27-l5-q3 | listen-mc | "Five tall stone fingers rose into the sky like a giant hand." | P1 R1-NGRAM-ECHO-2gram "giant hand" | Replace: "rock columns shaped like an enormous fist" | No |
| ch27 | kt-ch27-l7-q7 | listen-mc | "He landed in front of Sanzang and bowed his head all the way down." | P1 R1-NGRAM-ECHO-2gram "sanzang bow" | Replace: "knelt deeply before his teacher" | No |
| ch28 | kt-ch28-l5-q11 | comprehension | "His brothers wanted to stop, but Liu Bei would not give up on the wise man." | P1 R1-NGRAM-ECHO-2gram "liu bei" | Replace: "his determination to find the advisor" | No |
| ch28 | kt-ch28-l6-q11 | comprehension | "On his third trip, Liu Bei stayed in the cold wind so the sleeping wise man could rest." | P1 R1-NGRAM-ECHO-3gram "liu bei s" | Replace: "his profound courtesy for the counselor" | No |
| ch29 | kt-ch29-l3-q6 | listen-mc | "He longed to walk on its warm sand and touch its old stone walls." | P1 R1-NGRAM-ECHO-2gram "old stone" | Replace: "feel the ancient walls of home" | No |
| ch29 | kt-ch29-l3-q8 | listen-mc | "Even small things on the island felt big in his memory." | P1 R1-NGRAM-ECHO-2gram "small thing" | Replace: "even tiny details mattered deeply" | No |
| ch29 | kt-ch29-l3-x1 | comprehension | "Odysseus's home was a small island called Ithaca." | P1 R1-NGRAM-ECHO-2gram "small island" | Replace: "a modest rocky island in the sea" | No |
| ch29 | kt-ch29-l4-q3 | listen-mc | "The crew tied the ropes and lifted the white sails up high." | P1 R1-NGRAM-ECHO-2gram "tied ropes" | Replace: "lashed the lines and hoisted the canvas" | No |
| ch29 | kt-ch29-l4-q6 | listen-mc | "Slowly the ships moved away from the land and out into open water." | P1 R1-NGRAM-ECHO-2gram "into open" | Replace: "set course toward the open sea" | No |
| ch29 | kt-ch29-l5-q3 | listen-mc | "By day the sun was warm. By night the stars came out like soft lights." | P1 R1-NGRAM-ECHO-2gram "soft lights" | Replace: "gentle glowing points of light above" | No |
| ch30 | kt-ch30-l3-q3 | listen-mc | "He also tied a sharp sword to his side with a thick leather belt." | P1 R1-NGRAM-ECHO-2gram "sharp sword" | Replace: "a blade strapped to his waist" | No |
| ch30 | kt-ch30-l3-x1 | comprehension | "Heracles took his bow and put a bag of long arrows on his back." | P1 R1-NGRAM-ECHO-2gram "long arrows" | Replace: "a quiver of fletched bolts" | No |
| ch30 | kt-ch30-l4-q8 | listen-mc | "Heracles shot two more arrows. Both of them bounced off too." | P1 R1-NGRAM-ECHO-2gram "them bounced" | Replace: "the second volley ricocheted away as well" | No |
| ch30 | kt-ch30-l4-x5 | comprehension | "The lion's skin was too thick. Arrows could not hurt it at all." | P1 R1-NGRAM-ECHO-2gram "too thick" | Replace: "the hide was impenetrable" | No |
| ch30 | kt-ch30-l6-q6 | listen-mc | "He took a deep breath in and made both of his hands into fists." | P1 R1-NGRAM-ECHO-2gram "into fists" | Replace: "clenched both hands tight" | No |
| ch31 | kt-ch31-l4-x1 | comprehension | "They nailed a yellow paper on Robin's front door for everyone to see." | P1 R1-NGRAM-ECHO-2gram "yellow paper" | Replace: "a notice posted publicly at his home" | No |
| ch31 | kt-ch31-l5-q3 | listen-mc | "The trees were tall, much taller than any church in the town." | P1 R1-NGRAM-ECHO-2gram "taller any" | Replace: "soaring above every building in the village" | No |
| ch31 | kt-ch31-l5-x5 | comprehension | "For the first time in many days, no soldier could see his face." | P1 R1-NGRAM-ECHO-2gram "first time" | Replace: "finally concealed from enemy view" | No |
| ch31 | kt-ch31-l6-q3 | listen-mc | "Behind the oak tree was a thin man with a torn brown coat." | P1 R1-NGRAM-ECHO-3gram "thin man torn" | Replace: "a gaunt figure in ragged clothing" | No |
| ch31 | kt-ch31-l6-x1 | comprehension | Same sentence as above | P1 R1-NGRAM-ECHO-2gram "thin man" | Replace: "a lean person hiding in worn-out clothes" | No |
| ch31 | kt-ch31-l6-x5 | comprehension | "They lived under low branches and slept on soft beds of dry leaves." | P1 R1-NGRAM-ECHO-2gram "dry leaves" | Replace: "rested on makeshift beds of forest debris" | No |
| ch31 | kt-ch31-l7-x4 | comprehension | ""The rich bad men took from you…" Robin said." | P1 R1-NGRAM-ECHO-2gram "bad men" | Replace: "take from the corrupt to give to those in need" | No |
| ch26 | kt-ch26-l1-pm1 | picture-mc | "The king held up the heavy gold crown." | P1 R1-NGRAM-ECHO-2gram "gold crown" | Replace picture label with non-verbatim caption | No |
| ch28 | kt-ch28-l2-pm1 | picture-mc | "The wind blew across the wide river all night." | P1 R1-NGRAM-ECHO-2gram "wide river" | Replace picture label | No |
| ch31 | kt-ch31-l2-pm1 | picture-mc | "Robin shot an arrow from his bow." | P1 R1-NGRAM-ECHO-2gram "arrow bow" | Replace with "an archer drawing a longbow" | No |
| ch25 | kt-ch25-l7-x7 | comprehension | "They were moved by the family's hard work and strong heart." | P1 R1-NGRAM-ECHO-2gram "family s" | Replace: "touched by their perseverance and spirit" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC-type Qs scanned (Ch25–31) | 254 |
| `listen-mc` | 104 |
| `comprehension` | 136 |
| `picture-mc` | 14 |
| **P0 R1-VERBATIM-SUBSTRING violations** | **4** |
| P1 R1-NGRAM-ECHO-2gram violations | 28 |
| P1 R1-NGRAM-ECHO-3gram violations | 2 |
| **Total R1 violations** | **34** |
| Violation rate (total/scanned) | 13.4% |
| Chapters with P0 violations | ch27, ch29, ch30, ch31 |
| Ch with highest P1 density | ch29 (7 violations / 38 Qs = 18.4%) |
| ch31 P1 density | 8 / 37 = 21.6% |
| `就是答案` template in explanationZh (ch25/29/31) | 38 / 348 = 10.9% |

---

## D. Top 5 P0

### ⚠️ P0-1 — kt-ch27-l6-q3 (`listen-mc`, Ch27 西遊記)
- **Sentence:** "Only his head and one arm could move from the heavy stone."
- **Correct option [2]:** `"only his head and one arm"` ← exact 6-word substring
- **Question:** "How much of the monkey could move?"
- **Impact:** A learner looking at the option list BEFORE listening can match text with zero listening required. Nullifies the entire audio-processing task.
- **Fix:** `"just his neck and a single arm were free"` — near-synonym with structural shift.

### ⚠️ P0-2 — kt-ch29-l5-q8 (`listen-mc`, Ch29 奧德修斯)
- **Sentence:** "Day after day the trip felt easy and good."
- **Correct option [2]:** `"easy and good"` ← exact 3-word substring
- **Question:** "How were the first days at sea?"
- **Impact:** Scanning tell: the adjective pair "easy and good" is unique among options; text-matching gives away the answer.
- **Fix:** `"smooth sailing with no troubles"` or `"pleasant and without danger"`.

### ⚠️ P0-3 — kt-ch30-l4-q6 (`listen-mc`, Ch30 海格力斯)
- **Sentence:** "He let the arrow fly. It hit the lion right in the chest."
- **Correct option [1]:** `"right in the chest"` ← exact 4-word substring
- **Question:** "Where did the arrow hit the lion?"
- **Impact:** Location detail is a classic R1 target — should be paraphrased to test comprehension, not text-matching.
- **Fix:** `"square in the middle of its body"` or `"the lion's broad chest"`.

### ⚠️ P0-4 — kt-ch31-l4-q3 (`listen-mc`, Ch31 羅賓漢)
- **Sentence:** "They nailed a yellow paper on Robin's front door for everyone to see."
- **Correct option [2]:** `"on Robin's front door"` ← exact 5-word substring
- **Question:** "Where did they put the paper?"
- **Impact:** Named proper noun + location phrase "on Robin's front door" is the only option with the character's name — highly salient even without listening.
- **Fix:** `"posted at the entrance to his house"` — removes the character-name anchor.

### ⚠️ P0-5 (honorary P1 → escalated) — kt-ch31-l6-q3 + kt-ch31-l6-x1 (same sentence, two violations)
- **Sentence:** "Behind the oak tree was a thin man with a torn brown coat."
- **Q3 option:** `"a thin man in torn clothes"` — 3-gram echo "thin man torn" across both content words
- **X1 option:** `"a thin man in worn-out clothes"` — 2-gram "thin man"
- **Dual-question co-dependence:** Two Qs draw from the exact same source sentence with near-identical correct option phrasing, compounding X49B_STIMULUS_REUSE risk with R1 echo. Together they behave like a P0.
- **Fix:** Q3: `"a gaunt figure hiding behind a tree"` | X1: `"someone lean and poorly dressed"`.

---

## E. Narrative Voice / Pacing Improvements (no-violation suggestions)

Even though R1 echo is the primary angle, 3 pacing / voice improvements are proposed per audit protocol:

### NV-1 — `就是答案` formula overuse in Ch29 explanationZh (10.9% overall; Ch29 alone ~37%)
The template `"X 就是答案"` appears across 38 explanations. It functions as metalinguistic confirmation ("the answer is X") rather than grandma's warm story recap. Duolingo Stories-style explanations anchor to the *story moment* and reinforce the *inference*, not the answer position.

**Current:** `一天一天，旅程感覺輕鬆又順利——「輕鬆又順利」就是答案。`
**Revised:** `航程一開始很順——風平浪靜，太陽暖烘烘的，大家心情也好。`

The revised version tells the child **why** the trip felt easy rather than confirming which option was correct. Recommendation: cap `就是答案` density at ≤5% per chapter.

### NV-2 — Passive answer-reveal cadence in Ch31 explanationZh
Several Ch31 explanations describe action but don't model the story-inference link a child at A2 level needs.

**Current (kt-ch31-l4-x1):** `他們把一張黃紙釘在 Robin 家的前門，讓所有人都看得見。`
**Revised:** `這張紙貼在最顯眼的地方——每個路過的人都看得見，就是要讓大家知道 Robin 是通緝犯。`

This adds the *why* (story-logic reasoning) that helps children connect vocabulary to narrative meaning.

### NV-3 — Picture-MC caption verbatim loop (Ch26 / Ch31)
Picture-MC captions (the alt-text / overlay description that appears with the image) in Ch26 and Ch31 re-use verbatim phrases from the source sentence. Since picture-MC is designed to link word → image (not text → image), the caption should describe what's in the picture using different vocabulary than the source sentence.

**Ch26 kt-ch26-l1-pm1:** Source: "The king held up the heavy gold crown." | Caption: "a king lifting a shiny gold crown" → `"a king holding something precious aloft"`
**Ch31 kt-ch31-l2-pm1:** Source: "Robin shot an arrow from his bow." | Caption: "a young man firing an arrow from a bow" → `"a forest archer taking aim"`

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #223 — X223_R1_SEMANTIC_ECHO_LINT: Add BERTScore-proxy cosine lint to validate-lessons.js**

### 業界掃描來源

| Source | Finding |
|--------|---------|
| Iimura 2018, JLTA Journal 21 | Empirically names "verbatim overlap" (correct option text copied from audio) as the #1 construct-irrelevant validity (CIV) source in listening MC tests. Foundational anchor for R1. |
| "Corpus Prevalence of MC Options" arXiv:2602.17377 (Feb 2026) | Uses semantic text embeddings to show correct MC answers have measurably higher corpus prevalence than distractors — correlates with verbatim echo; proposes cosine similarity threshold as quantitative proxy |
| "Assessing Distractors in MC Tests" arXiv:2311.04554 | Applies BERTScore similarity between distractor and stem as discriminatory signal — threshold range 0.65–0.80 separates functional from near-verbatim distractors |
| ACL BEA 2025 Survey | Identifies verbatim overlap as known flaw in poorly designed MC; automated distractor evaluation systems use TF-IDF or sentence-BERT similarity to flag this |
| IELTS Liz MC Coaching (test-taker facing) | Explicitly coaches learners: "If a key word from the recording appears in an option, that option is usually a trap or the answer" — public acknowledgment that verbatim echo is exploitable |
| DET Interactive Listening white paper | Duolingo's own test explicitly uses "template answer frames that minimize paraphrasing" — the opposite direction; but this is their *extract-exact* format, not comprehension MC |

### Pickup 適配分析

**Current state:** `validate-lessons.js` catches:
- `X48_NGRAM_VERBATIM_CORRECT`: simple 3-gram string match of correct option against sentence
- R1 is NOT checked beyond this — the 4 P0 violations found today (exact substring) are NOT caught by existing lint

**Gap:** The current 3-gram check misses:
1. Exact substrings shorter than 3 content-word n-grams (e.g., "easy and good", "right in the chest")
2. 2-gram content-word echoes (the bulk of today's P1 violations)
3. Near-identical paraphrase where only stopwords differ ("only his head and one arm" → "only his head and one arm")

**Proposed fix (X223):**
```js
// In validate-lessons.js — add to existing per-Q lint:

function r1VerbatimCheck(sentence, correctOption) {
  const sentLower = sentence.toLowerCase();
  const optLower = correctOption.toLowerCase().trim();
  
  // R1-P0: exact substring check (currently missing from linter)
  if (optLower.length >= 3 && sentLower.includes(optLower)) {
    return { code: 'X223_R1_VERBATIM_SUBSTRING', severity: 'P0',
             msg: `Correct option is exact substring of sentence` };
  }
  
  // R1-P1: 2+ content-word n-gram check (extends X48 from 3-gram to 2-gram)
  const stopwords = new Set(['a','an','the','is','are','was','were','be','been',
    'to','of','in','on','at','for','with','by','from','as','or','and','but','not',
    'i','you','he','she','it','we','they','his','her','its','that','this']);
  const cw = t => t.toLowerCase().match(/[a-z]+/g)?.filter(w => !stopwords.has(w)) ?? [];
  
  const cwSent = cw(sentence).join(' ');
  const cwOpt = cw(correctOption);
  
  for (let n = Math.min(cwOpt.length, 3); n >= 2; n--) {
    for (let i = 0; i <= cwOpt.length - n; i++) {
      const ng = cwOpt.slice(i, i+n).join(' ');
      if (ng.length > 5 && cwSent.includes(ng)) {
        return { code: `X223_R1_NGRAM_ECHO_${n}G`, severity: 'P1',
                 msg: `${n}-gram content echo "${ng}" in correct option vs sentence` };
      }
    }
  }
  return null;
}
```

**Effort:** ~40 lines added to `validate-lessons.js`. No new dependencies.
**ROI:** HIGH — catches 4 P0 + ~30 P1 violations per cycle that currently slip through. Today's audit caught 34 R1 violations across 254 Qs in Ch25–31 alone (13.4% rate). Linter automation would catch these at commit time without a manual cron pass.
**Risk:** Minimal — warn-only flag, doesn't block build. Low false-positive rate since 2-gram content-word matching is already proven in this audit.

**Verdict:** ✅ 適合 Pickup 架構 — zero new npm dependencies, plain JS, fits in existing `validate-lessons.js` lint pipeline, flags P0 at build-time.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X223: R1 exact-substring lint (P0) + 2-gram content-echo lint (P1) in validate-lessons.js | [arXiv:2602.17377](https://arxiv.org/abs/2602.17377) · [Iimura 2018 JLTA](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_article) | ✅ 完全適合 — plain JS, no new deps, warn-only flag | S (< 1hr) | HIGH — catches 13.4% of MC Qs in violation at commit time | ✅ IMPLEMENT |
| BERTScore semantic similarity threshold for near-paraphrase (beyond n-gram) | [arXiv:2311.04554](https://arxiv.org/abs/2311.04554) | 🟡 部分適合 — requires Python + sentence-transformers or API call; overkill for A2 children's content where 2-gram lint already catches most cases | M–L (needs Python CI step) | MEDIUM | 🟡 DEFER — revisit if 2-gram lint shows high false-negative rate |
| Duolingo DET "extract-exact" answer framing (no paraphrase required) | [DET white paper](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | ❌ 不適合 — DET format is fill-in-blank extraction, Pickup is 4-option MC for A2 children. Their "minimize paraphrase" approach is format-specific, opposite goal | N/A | N/A | ❌ SKIP |
