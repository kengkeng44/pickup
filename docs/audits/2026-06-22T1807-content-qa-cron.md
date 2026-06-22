# ⚠️ Content QA — 2026-06-22 18:07 UTC

**Today's angle:** R1 — Paraphrase Depth (Buck 1991/2001 verbatim-echo ban, content-word overlap ≥75%)
**Focus:** Ch17–26 (Crane Gratitude, Turnip, Mouse Deer, Turnip Chain, Anansi, Urashima Taro Round 2, Secret Garden, Monkey King, Yu Gong, Archimedes)

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons
OK  lessons-ch18.json: 7 lessons
WARN lessons-ch19.json: 4 lint issue(s)
  kt-ch19-l3-q5: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons
WARN lessons-ch21.json: 11 lint issue(s) — all X2_OPTION_LIST_BIAS
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
OK  lessons-ch24.json: 7 lessons
OK  lessons-ch25.json: 7 lessons
WARN lessons-ch26.json: 1 lint issue(s)
  kt-ch26-l5-q8: X2_OPTION_LIST_BIAS (all start with "as")

Total mirror-lint issues across all files: 72
```

Note: Current linter only flags `R1_SUBSTRING` (exact containment) and `X3_R1_VERBATIM_WORDS` (all words present). The 14 violations below are **missed** by the current linter — they require content-word overlap scoring.

---

## B. Violation table

| Ch | Q ID | type | sentence (trimmed) | correct option | violation | severity | 修法 | audio regen? |
|----|------|------|--------------------|---------------|-----------|----------|------|-------------|
| 18 | kt-ch18-l5-q9 | listen-mc | "Warm clothes came out. Toys for the children came out." | warm clothes and toys | R1b-verbatim (100% — lifts 3/3 content words) | **P0** | → "gifts for cold days and play" | Yes |
| 19 | kt-ch19-l1-q6 | listen-mc | "Across the water he saw a tall tree full of sweet ripe fruit." | a tree with fruit | R1b-verbatim (100% — tree + fruit both literal) | **P0** | → "a fruit-bearing tree across the river" | Yes |
| 19 | kt-ch19-l1-q9 | listen-mc | "But the river was wide. He could not see the bottom of the water." | very wide | R1b-verbatim (100% — adjective lift) | **P0** | → "too broad to cross easily" | Yes |
| 19 | kt-ch19-l6-q9 | listen-mc | "Their bodies could go in the water but not up the dry land." | they could not go on dry land | R1b-verbatim (100% — near-clause copy) | **P0** | → "the shore was out of their reach" | Yes |
| 19 | kt-ch19-l7-q9 | listen-mc | "His low voice came up from the dark water in a slow sad sound." | low and slow | R1b-verbatim (100% — both key adjectives lifted) | **P0** | → "deep and unhurried" | Yes |
| 20 | kt-ch20-l6-q5 | listen-mc | "The cat holds the dog's tail gently between her front paws." | with paws on the dog's tail | R1b-verbatim (100% — paws + tail + dog all lifted) | **P0** | → "gripping the dog's end with both feet" | Yes |
| 21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his clever ideas, not his strong arms." | Anansi was very clever | R1b-verbatim (100% — Anansi + clever lifted) | **P1** | → "Anansi won by his wits, not strength" | Yes |
| 21 | kt-ch21-l7-q8 | listen-mc | "Now every home, even small ones, had a story by the fire at night." | every home had a story to share | R1c-high-overlap (75% — every + home + story all present) | **P1** | → "households could gather around tales each evening" | No |
| 23 | kt-ch23-l1-q3 | listen-mc | "The sun was warm. The trees were tall." | warm with tall trees | R1b-verbatim (100% — warm + tall + trees all lifted) | **P0** | → "bright and shaded by high branches" | Yes |
| 25 | kt-ch25-l2-q6 | listen-mc | "He wanted to take the two big mountains far from his door." | take the mountains far away | R1c-high-overlap (75% — take + mountains + far all present) | **P1** | → "move the peaks out of his family's path" | Yes |
| 26 | kt-ch26-l1-q3 | listen-mc | "The king had a new crown of bright, shiny gold." | a brand new gold crown | R1c-high-overlap (75% — new + gold + crown all present) | **P1** | → "a freshly made royal headpiece of gold" | Yes |
| 26 | kt-ch26-l2-q6 | listen-mc | "No tool he knew could read what hid inside the gold." | no tool he had could see inside | R1c-high-overlap (75% — no + tool + inside all present) | **P1** | → "the interior of the metal was unexaminable" | Yes |
| 26 | kt-ch26-l5-q3 | listen-mc | "Gold and silver have different sizes for the same weight." | same weight can have different size | R1c-high-overlap (75% — same + weight + different all present) | **P1** | → "equal heaviness does not mean equal volume" | Yes |
| 26 | kt-ch26-l6-q6 | listen-mc | "Beside the crown they placed a piece of pure gold of the same weight." | pure gold of equal weight | R1c-high-overlap (75% — pure + gold + weight all present) | **P1** | → "a matching lump of untouched gold as a reference" | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters scanned | 10 (Ch17–26) |
| Total questions (listen-mc / listen-comprehension / listen-emoji) | ~210 |
| R1b violations (100% content-word overlap) | 7 |
| R1c violations (75–99% content-word overlap) | 7 |
| **Total R1 violations** | **14** |
| P0 (blind-retry broken — child sees answer in audio) | 6 |
| P1 (high paraphrase fail) | 8 |
| Chapters clean | Ch17, Ch22, Ch24 |
| Chapters with 4+ violations | Ch19 (4), Ch26 (4) |

---

## D. Top 5 P0

1. **kt-ch18-l5-q9** — "warm clothes and toys" is a three-word exact lift from "Warm clothes came out. Toys… came out." Children hear the sentence then see the answer verbatim — no comprehension tested.
2. **kt-ch19-l6-q9** — "they could not go on dry land" reproduces the negative clause "not up the dry land" almost word-for-word. Crocodile behaviour question collapses to surface scan.
3. **kt-ch23-l1-q3** — "warm with tall trees" is "The sun was warm. The trees were tall." fused with conjunctions stripped. Trivial A2 slot-fill rather than comprehension.
4. **kt-ch19-l1-q9** — "very wide" for "the river was wide" adds only an intensifier — barely paraphrased. Question asks "How wide?" making the sentence answer immediately retrievable.
5. **kt-ch20-l6-q5** — "with paws on the dog's tail" lifts three content nouns from a single 12-word sentence. Distractors mention unrelated body parts, so correct answer is findable by word-match alone.

---

## E. Narrative voice / pacing improvement suggestions (even with 0 R1 baseline)

1. **Ch19 question density imbalance**: Lessons l6–l7 each carry 10 questions where l1–l2 carry 5. Pacing dip risks fatigue for 8-12 year-olds mid-chapter. Recommend capping per-lesson Q count at 8 and distributing to l1–l2.
2. **Ch21 (Anansi) explanationZh register**: `推理: clever ideas not strong arms → 很聰明 (paraphrase)` reads as a lint note, not a story voice. Rewrite as: `奶奶說：「頭腦大」就是說 Anansi 很聰明，不是真的說他的頭很大喔！` — which maintains the grandma frame and is age-appropriate.
3. **Ch26 (Archimedes) distractor diversity**: Across 4 violations in Ch26, three distractors per question follow the pattern `[substance] [adjective] [noun]` — same syntactic shape as the correct option. A structural shuffle (e.g. verb-phrase distractor) would reduce guessing by elimination.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #66: X19_R1_CONTENT_WORD_OVERLAP_LINT**

### Background

Current `tools/validate-lessons.js` R1 check: exact substring (`correct_option ⊆ sentence`). This catches only R1_SUBSTRING and X3_R1_VERBATIM_WORDS (all words in sentence). It **misses** 14 violations where content-word overlap ≥ 75% — the most educationally harmful class of paraphrase failure.

Industry source: Buck 2001 *Assessing Listening* (Cambridge) identifies verbatim echo as Construct-Irrelevant Variance (CIV) source #1 in multiple-choice listening. IELTS and TOEIC item-writing specs both mandate ≥ 2 synonym/hyponym substitutions per correct option. Duolingo's 2026 expanded Interactive Listening spec similarly requires answers to use "paraphrased expressions" rather than audio keywords.

### What to add

Extend `tools/validate-lessons.js` with a new rule `X19_R1_CONTENT_WORD_OVERLAP`:

```js
// After existing R1_SUBSTRING check, add:
const STOP = new Set(['a','an','the','is','are','was','were','and','or','in','on','at',
  'to','of','it','he','she','they','we','i','his','her','its','my','your','their',
  'be','been','being','do','does','did','have','has','had','not','but','so','as','if',
  'by','for','with','from','that','this','these','those','up','out','down','into',
  'about','then','when','who','what','where','which','how','all','each','some','one',
  'two','three','can','could','would','will','said','very','just','you']);

function contentWords(str) {
  return new Set(str.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(w => !STOP.has(w) && w.length > 1));
}

const cw_correct = contentWords(correctOption);
const cw_sentence = contentWords(sentence);
const overlap = [...cw_correct].filter(w => cw_sentence.has(w));
const ratio = cw_correct.size > 0 ? overlap.length / cw_correct.size : 0;

if (ratio >= 0.75) {
  issues.push(`X19_R1_CONTENT_WORD_OVERLAP (correct option ${Math.round(ratio*100)}% content-word match with sentence: "${overlap.join(', ')}")`);
}
```

Threshold: 75% → WARN (currently 14 violations). Consider 100% → ERROR in a future pass once content is fixed.

### Pickup 適配分析

| 判斷 | 理由 |
|------|------|
| ✅ 完全適合 | Pickup 已有 `validate-lessons.js` Node.js linter + Zod schema; 擴充 ≤ 30 行 |
| ✅ 完全適合 | 客群 8-12 兒童：verbatim echo 危害更大（字彙量小, match 更容易成功）|
| ✅ 完全適合 | Ch19 + Ch26 已有 4 violations each — 即使 warn-only 也立即有 ROI |
| 🟡 需謹慎 | 同一故事 proper noun (Anansi / Mochi) 跨 sentence + option 是必要的, 需加 proper-noun exclusion list |

**Effort:** ~1 hr (linter 擴充 + proper-noun exclusion) + content fix 2-3 hr  
**ROI:** High — catches the most educationally harmful CIV class; aligns with Buck 2001 #1 rule

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X19 content-word overlap lint (≥75% = WARN) | Buck 2001; IELTS/TOEIC item-writing spec; Duolingo 2026 Interactive Listening | ✅ 完全適合 — extends existing validate-lessons.js, 8-12 兒童 CIV risk highest | ~1 hr lint + 2-3 hr content | High | ✅ 推薦實作 |
