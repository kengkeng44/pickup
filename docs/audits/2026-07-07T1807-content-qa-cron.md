# ⚠️ Content QA — 2026-07-07 18:07 UTC

**Today's angle:** #8 — A6 Option-in-Question (answer keyword echoed in stem) + A1 Sentence-echo (correct option near-verbatim from sentence)
**Focus:** Ch9–Ch16 (灰姑娘 / 嫦娥奔月 / 后羿射日 / 牛郎織女 / 小紅帽 / 小美人魚 / 皇帝的新衣 / 一寸法師 — 252 MCQ questions audited)

**Angle definition:**
- **A6** — Option-in-question: a significant keyword from the *question stem* appears in the correct (or distractor) option, allowing surface-form text-matching bypass without real comprehension.
- **A1** — Sentence-echo (R1/Buck 2001): the correct option reproduces ≥60% content words from the audio *sentence*, collapsing the task from "listen/infer" to "transcribe and match."

**Industry basis (2026):**
- PMC 10711986 (2024): Linguistic cues (stem-option word repetition) found in ~10% of MCQ items; represents a validity flaw independent of content correctness.
- BenchMarker arXiv 2602.06221 (2025): Structural/lexical overlap between stem and correct option is a detectable, systematic flaw enabling surface-form bypass by both learners and LLMs.
- Frontiers in Computer Science 2026: AI-assisted MCQ generation *increases* this class of flaw through automation bias — automated pre-screening recommended.
- Buck 2001 / LanguageScreen (ASHA 2024): Verbatim repetition in listening MCQs collapses comprehension into transcription; paraphrase is required for valid listening assessment.
- PMC 5648954: "Extra detail in correct option" is the 2nd-most-common item-writing flaw at 18.18% of flagged items.

**Detection method:**
Content-word overlap ratio between `options[correctIndex]` and `question` (A6) or `sentence` (A1), using a 30-word stopword filter. P0 = ratio ≥0.5 for A6 (≥2 shared content words from question key phrase echoed in correct option); P0 = ratio ≥0.60 for A1 (correct option substantially reconstructs the audio sentence).

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 611  (warn-only)
  Ongoing: X59_EXPLAINZH_VOICE (Ch8/Ch9 「答案是」non-story voice)
  Ch9: X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR, X2_OPTION_LIST_BIAS
Schema: PASS (no Zod parse errors)
```

Lint is warn-only; no hard build failure.

---

## B. Violation Table

### B1. A6 — Option Key Words Echoed in Question Stem (P0 = correct; P1 = distractor)

| Ch | Q ID | type | question snippet | correct option | shared keywords | violation | 修法 | audio regen? |
|----|------|------|-----------------|---------------|-----------------|-----------|------|-------------|
| 16 | kt-ch16-l7-q3 | listen-mc | "What kind of **mallet** was it?" | "a magic wish **mallet**" | mallet | **A6_P0**: WH-Q repeats the key object noun into the correct option — learner can match 'mallet' without comprehension | 改 Q: "What could this mallet do?" → correct opt can stay "grant a wish" (paraphrase) | No |
| 12 | kt-ch12-l6-x7 | comprehension | "How were these **tears** different from before?" | "wept **tears** of joy" | tears | **A6_P0**: 'tears' from question echoes directly into correct option; learner can spot answer by keyword match | 改 correct opt: "cried out of happiness" — eliminates 'tears' overlap | No |
| 9 | kt-ch9-l2-pm1 | picture-mc | "matches '**a glass shoe**'" | "a small shiny shoe made of **glass**" | glass, shoe | **A6_P0_STRUCT**: picture-mc stem quotes the target phrase directly; correct option can be identified by text-matching 'glass' + 'shoe' without viewing picture | 改 Q 不 quote 詞彙: "Which picture shows what the prince found on the steps?" | No |
| 14 | kt-ch14-l2-pm1 | picture-mc | "matches '**a sea palace**'" | "a grand **palace** deep under the **sea**" | sea, palace | **A6_P0_STRUCT**: same picture-mc stem-quote pattern; both key words in correct option | 改 Q: "Which picture shows where the turtle princess lived?" | No |
| 13 | kt-ch13-l4-lg2 | comprehension | "...wolf want the **girl** to pick **flowers**?" | (P1-distractor) "flowers would cheer the **girl** up" | girl, flowers | **A6_P1_DIST**: distractor reproduces Q keywords — inflates apparent plausibility without semantic difficulty | 改 distractor: "he needed something to carry in his paws" | No |
| 10 | kt-ch10-l3-q3 | listen-mc | "What **kind** of person was the student?" | (P1-distractor) "**kind** and brave" | kind | **A6_P1_DIST**: 'kind' (=student quality noun) re-used in distractor option; A2 learner may select it by word-echo | 改 distractor: "gentle and patient" (避開 kind 詞匯) | No |

### B2. A1 — Correct Option Near-Verbatim Echo of Sentence (R1/Buck 2001 violation)

| Ch | Q ID | type | sentence snippet | correct option | overlap ratio | violation | 修法 | audio regen? |
|----|------|------|-----------------|---------------|---------------|-----------|------|-------------|
| 14 | kt-ch14-l3-x2 | comprehension | "The **walls shone like pearl**…" | "**walls that shone like pearl**" | 1.00 | **A1_P0_VERBATIM**: 4/4 content words identical; task collapses to transcription | 改 correct opt: "covered in gleaming white stone" | No |
| 14 | kt-ch14-l5-x4 | comprehension | "…tied with **a gold rope**" | "**the gold rope**" | 1.00 | **A1_P0_VERBATIM**: exact 2-word key phrase lifted from sentence | 改 correct opt: "a bright yellow cord" | No |
| 15 | kt-ch15-l4-x6 | comprehension | "All his men **nodded** fast. They all **said** it was **lovely**." | "**nodded** and **said** it was **lovely**" | 1.00 | **A1_P0_VERBATIM**: 3/3 content words directly from sentence; zero paraphrase | 改 correct opt: "agreed and praised it out loud" | No |
| 13 | kt-ch13-l7-x4 | comprehension | "Grandma sat up. The girl held her hand. **Both** could **breathe** again." | "**both** sat up and **breathed** again" | 0.75 | **A1_P0_HIGH**: 3/4 content words echo sentence | 改 correct opt: "were alive and safe at last" | No |
| 9 | kt-ch9-l3-x2 | comprehension | "…find a wife. **Every** **girl** in **town** was asked." | "**every** **girl** in the whole **town**" | 0.75 | **A1_P0_HIGH**: 3/4 content words echoed; Q "Who was invited?" answered by matching | 改 correct opt: "all women from the village" | No |
| 16 | kt-ch16-l7-x4 | comprehension | "…he stood as **tall** as any **young** **man**." | "as **tall** as a normal **young** **man**" | 0.75 | **A1_P0_HIGH**: 3/4 content words echoed | 改 correct opt: "the same height as other people" | No |
| 16 | kt-ch16-l7-q3 | listen-mc | "This is a lucky **mallet**. It can grant a **wish**." | "a magic **wish** **mallet**" | 0.67 | **A1_P0 + A6_P0** (dual flag): both sentence and question echo | 確認修法見 B1 — same fix covers both | No |
| 14 | kt-ch14-l4-x4 | comprehension | "He **walked** in the coral **garden** with the princess." | "**walked** in the **garden** together" | 0.67 | **A1_P1_MOD**: 2/3 content words echoed | 改 correct opt: "spent time exploring with her" | No |
| 13 | kt-ch13-l4-x4 | comprehension | "He **knocked** on the wooden **door**." | "**knocked** on the front **door**" | 0.67 | **A1_P1_MOD**: 2/3 echoed; minor rephrasing acceptable | 改 correct opt: "rapped hard at the entrance" | No |
| 15 | kt-ch15-l7-x6 | comprehension | "He kept **walking** with the **slow** **steps** of a king." | "with **slow** and steady **steps**" | 0.67 | **A1_P1_MOD**: 2/3 echoed | 改 correct opt: "with dignity, one foot at a time" | No |

### B3. Additional P1 Sampled (partial list)

| Ch | Q ID | overlap | fix note |
|----|------|---------|---------|
| Ch14 | kt-ch14-l5-x6 | "never open" in both sentence and opt | 改 correct opt: "keep the lid always shut" |
| Ch11 | kt-ch11-l3-q9 | "sun came down" echoes "one sun fell down" (0.67) | 改 correct opt: "the sky grew a little cooler" |
| Ch11 | kt-ch11-l3-x2 | "dry and brown all over" echoes "dry brown land" (0.67) | 改 correct opt: "cracked and lifeless everywhere" |
| Ch12 | kt-ch12-l3-x7 | "rode down on a cloud" echoes "came down on a long white cloud" (0.67) | 改 correct opt: "descended from the heavens" |
| Ch13 | kt-ch13-l6-x2 | "those ears were much too big for grandma" echoes "what big ears you have" (0.6) | 改 correct opt: "something strange about the head on the pillow" |
| Ch15 | kt-ch15-l3-x2 | "empty looms before them" echoes "pointed at empty looms" (0.67) | 改 correct opt: "machinery that showed no fabric at all" |
| Ch16 | kt-ch16-l3-x2 | "sewing needle itself" echoes "gave him a sewing needle for a sword" (0.67) | 改 correct opt: "a thin sharp pin to fight with" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MCQ questions audited (Ch9–Ch16) | 252 |
| listen-mc | 76 |
| comprehension | 112 |
| grammar-mc | 19 |
| picture-mc | 13 |
| fill-in / fill-in-blank | 32 |
| **A6 P0** (correct option keywords echoed in question) | **4** |
| **A6 P1** (distractor echoed in question) | **2** |
| **A1 P0** (correct option ≥0.6 overlap with sentence) | **10** |
| **A1 P1** (moderate sentence overlap 0.5-0.59) | **16** |
| Verbatim ratio=1.0 violations | 3 (kt-ch14-l3-x2, kt-ch14-l5-x4, kt-ch15-l4-x6) |
| Dual A1+A6 flag (same Q fails both) | 1 (kt-ch16-l7-q3) |
| Chapters with ≥3 P0 | **Ch14** (5 P0: l3-x2, l4-x4, l5-x4, l5-x6, l2-pm1) |
| Clean chapters (0 P0) | Ch10, Ch11 (only P1) |

---

## D. Top 5 P0

1. **kt-ch14-l3-x2** `'walls that shone like pearl'` — ratio=1.00; correct option is literal transcription of sentence. The hardest-looking comprehension Q in the lesson is solvable by reading the sentence rather than listening. **Critical**: Ch14 is 小美人魚 (Little Mermaid), A2 level, targeting 8-12; this destroys the listening challenge.

2. **kt-ch15-l4-x6** `'nodded and said it was lovely'` — ratio=1.00; "All his men nodded fast. They all said it was lovely." → correct opt uses 'nodded', 'said', 'lovely' all three. Emperor's New Clothes Ch15 inference question ("What did the men around the emperor do?") is answered by pattern-matching three lifted words.

3. **kt-ch14-l5-x4** `'the gold rope'` — ratio=1.00; "tied with a gold rope" → correct opt "the gold rope." Two-word exact echo on a detail question. Learner never needs to listen — scans the sentence display (post-reveal of earlier Q or sentence card) for 'gold rope'.

4. **kt-ch16-l7-q3** `'a magic wish mallet'` — DUAL A1+A6 flag. Q says "What kind of **mallet** was it?" → correct opt says "a magic wish **mallet**" + sentence says "This is a lucky **mallet**. It can grant a **wish**." The stem noun 'mallet' also appears in the sentence; learner can match on both surfaces simultaneously. Particularly bad for blindRetry: learner can guess by pattern without engaging the audio.

5. **kt-ch9-l2-pm1** `'a small shiny shoe made of glass'` — picture-mc where Q quotes "a glass shoe" verbatim; correct picture-option reconstructs "shoe made of glass". A6_STRUCT — the picture-mc question format has a systemic design issue where stem-to-option keyword leak is baked in. Root-cause fix: rephrase picture-mc stems as scene/context questions instead of vocabulary-quote questions.

---

## E. Narrative Voice / Pacing Improvements (required even if 0 violations)

1. **Ch13 — 小紅帽 l6 approach sequence**: The sequence "Grandma, what big eyes you have!" / "Grandma, what big ears you have!" / "Grandma, what big teeth you have!" is an iconic repetition pattern, but the current narration sentences break the triptych rhythm by varying the surrounding context between Qs. Suggestion: add a narration entry between each exchange to preserve the classic "pause → question → wolf reply" structure. Creates more dramatic tension for children.

2. **Ch15 — 皇帝的新衣 minister scenes (l3-l4)**: The emperor's ministers each silently refuse to speak truth. Currently conveyed in two quick sentences. Adding one narration entry: "No one wanted to be the first to say nothing was there." would make the social pressure visible and comprehensible to 8-12 readers before the Q about why everyone stayed silent — reducing inference load while maintaining story impact.

3. **Ch14 — 小美人魚 l7 ending**: The departure sentence "She turned to the sea and did not look back." ends on a single spare line. For 8-12 readers, a one-sentence warm grandma framing cue in explanationZh — "她轉身走向大海,沒有回頭——這就是小美人魚選擇的勇氣" — would convert a potentially sad/confusing ending into an empowerment message consistent with Pickup's 兒童治癒感 principle.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #127 — X64_A6_STEM_OVERLAP_LINT**

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-------------|--------|-----|---------|
| Automated stem-option content-word overlap lint (A6 detection) | [BenchMarker arXiv 2602.06221](https://arxiv.org/pdf/2602.06221) · [PMC 10711986](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10711986/) · [Frontiers CompSci 2026](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1831250/full) | ✅ 直接適用 | 30 min | HIGH | **推薦實作** |

**What to add to `tools/validate-lessons.js`:**

```js
// X64_A6_STEM_OVERLAP: correct option content-word overlap with question stem ≥40%
// X65_A1_SENTENCE_OVERLAP: correct option content-word overlap with sentence ≥60%
const STOP = new Set(['the','a','an','is','was','are','were','he','she','it','they','to','of',
  'in','on','at','for','and','or','but','with','her','his','their','what','how','why',
  'when','who','where','which','did','do','does','this','that','not','no','its','had',
  'have','has','be','been','could','would','will','can','may','might','if','than','so']);

function contentWords(text) {
  return new Set((text || '').toLowerCase().match(/\b[a-z]{3,}\b/g)?.filter(w => !STOP.has(w)) || []);
}

function overlapRatio(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let count = 0;
  for (const w of setA) if (setB.has(w)) count++;
  return count / Math.min(setA.size, setB.size);
}

// Inside the question loop (for listen-mc and comprehension types):
if (q.correctIndex !== undefined && q.options?.[q.correctIndex]) {
  const correctWords = contentWords(q.options[q.correctIndex]);
  const qWords = contentWords(q.question);
  const sWords = contentWords(q.sentence);
  if (overlapRatio(correctWords, qWords) >= 0.4)
    warn(id, 'X64_A6_STEM_OVERLAP', `correct option overlaps question stem`);
  if (overlapRatio(correctWords, sWords) >= 0.6)
    warn(id, 'X65_A1_SENTENCE_OVERLAP', `correct option near-verbatim of sentence (Buck R1)`);
}
```

**Why MEDIUM effort, HIGH ROI:**
- 30 min implementation (extend existing lint loop with 10 lines of JS)
- Catches a confirmed systematic pattern: Ch14 has 5 P0s, Ch9/Ch15/Ch16 each have confirmed verbatim-echo violations
- Prevents future content regression: as Ch33+ are added, LLM-generated options naturally reproduce sentence vocabulary (confirmed by Frontiers CompSci 2026 findings)
- Integrates with existing warn-only lint output; set `A6_STEM_STRICT=1` for hard failure in CI
- **Does NOT touch lessons JSON** — pure validator addition

**Pickup 適配分析:**
- Tech stack: Node.js validate-lessons.js already runs `zod.parse()` per lesson + per-question loops → adding content-word comparison is 10-20 lines, no new dependencies
- 客群: 8-12 兒童 blindRetry → A6/A1 violations are MORE harmful than in adult assessments because children are MORE susceptible to surface-form cues (Piaget: concrete operational stage prioritizes pattern matching over abstract inference)
- Not applicable to: narration, tap-pairs, phrase-pairs, fill-in (no correct-option field)
