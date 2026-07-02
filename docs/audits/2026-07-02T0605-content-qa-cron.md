# ⚠️ Content QA — 2026-07-02 06:05 UTC

Today's angle: **A7 — Content-Word Repetition (correct answer echoes sentence stem vocabulary)**
Focus: **Ch17–24** (鶴的報恩 / 興夫傳 / Sang Kancil / 大蘿蔔 / Anansi / Meng Mother / Sima Guang / Kong Rong)

> **A7 definition (pickup-q-design-standard-v1.md §A7):**
> The CORRECT answer option shares one or more non-trivial content words with the sentence stem or question.
> This degrades MC comprehension from *inferential reconstruction* to *keyword spotlight* — a test-wise
> 8-year-old can spot the matching word without processing the audio at all.
> Buck (2001) calls this the "verbatim give-away" (#1 construct-irrelevant variance source in L2 listening).
> TOEIC Part 3/4 item writing mandates full paraphrase of the correct option relative to the stimulus.

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 16 lint issue(s)
WARN lessons-ch18.json: 13 lint issue(s)
WARN lessons-ch19.json: 18 lint issue(s)
WARN lessons-ch20.json: 12 lint issue(s)
WARN lessons-ch21.json: 23 lint issue(s)
WARN lessons-ch22.json:  8 lint issue(s)
WARN lessons-ch23.json: 14 lint issue(s)
WARN lessons-ch24.json: 17 lint issue(s)
Total mirror-lint issues (all chapters): 447
BUILD GATE: PASS (warn-only; MIRROR_LINT_STRICT=1 not set)
```

---

## B. Violation Table

**Scope:** `listen-mc`, `comprehension`, `read-mc` in Ch17–24.
**Method:** Python stopword-filtered content-word intersection between `sentence + question` and `correct option`.
**Severity:**
- **P0** = ≥ 3 overlapping words (near-verbatim paraphrase)
- **P1** = 2 overlapping distinctive content words (partial surface lift)
- **P2** = 1 overlapping distinctive word (mild keyword spotlight)

**Total found: 102 violations** (1 P0 · 14 P1 · 87 P2)

### B1. P0 — Near-verbatim correct option (1 violation)

| Ch | Q ID | Type | Sentence stem (60 ch) | Correct option | Overlap words | 修法 | audio regen? |
|----|------|------|----------------------|----------------|---------------|------|-------------|
| Ch18 | kt-ch18-l6-x5 | comprehension | "He grabbed a baby bird. He broke its leg on purpose." | "Nolbu hurt the bird; Heungbu helped one" | bird, heungbu, nolbu | → "The cruel brother harmed it; the kind one healed it" | No |

**Why P0:** Both character names AND the story pivot noun ("bird") appear verbatim in the answer. Student does not need to comprehend contrast — they just spot the three proper nouns and select.

### B2. P1 — Dual content-word surface lift (14 violations)

| Ch | Q ID | Type | Sentence stem (60 ch) | Correct option | Overlap words | 修法 | audio regen? |
|----|------|------|----------------------|----------------|---------------|------|-------------|
| Ch17 | kt-ch17-l4-x1 | comprehension | "She held a soft white cloth. It shone like fresh snow." | "shining white and soft" | soft, white | → "gleaming like moonlight on silk" | No |
| Ch17 | kt-ch17-l4-x3 | comprehension | "The old man went home with the heavy bag of gold." | "gold coins in a bag" | bag, gold | → "heavy riches to carry home" | No |
| Ch17 | kt-ch17-l4-x7 | comprehension | "At night, the small back door stayed closed and quiet." | "the secret behind the closed door" | closed, door | → "a mystery kept sealed from view" | No |
| Ch17 | kt-ch17-l5-x8 | comprehension | "Every night he sat by the door. He heard feathers brushing…" | "feathers touching the wood" | feathers, wood | → "rustling sounds from within, like wings on timber" | No |
| Ch18 | kt-ch18-l4-x1 | comprehension | "Heungbu wrapped the bird's leg in soft cloth." | "cloth tied around its leg" | cloth, leg | → "bandaged with care using soft material" | No |
| Ch18 | kt-ch18-l7-x1 | comprehension | "But nothing good came out. Out came dust. Out came mud." | "only dust and mud inside" | dust, mud | → "nothing useful, only filth and grime" | No |
| Ch18 | kt-ch18-l7-x5 | comprehension | "Heungbu opened the door. He shared his food, his house…" | "food, gold, and his home" | food, gold | → "all his provisions and wealth with others" | No |
| Ch19 | kt-ch19-l5-q10 | comprehension | "Every jump moved mouse deer one step closer to the fruit…" | "mouse deer was crossing the river" | deer, mouse | → "Sang Kancil was making his way across" | No |
| Ch19 | kt-ch19-l6-x1 | comprehension | "Sang Kancil jumped off the last crocodile onto the other…" | "jumped onto dry land across the river" | jumped, onto | → "leaped to safety on the far bank" | No |
| Ch19 | kt-ch19-l6-x5 | comprehension | "But the river was too wide. They could not chase him." | "river too wide to cross to dry land" | river, wide | → "the crocodiles were trapped on their own side" | No |
| Ch21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his clever ideas, not his strong…" | "Anansi was very clever" | anansi, clever | → "wit mattered more than muscle" | Yes |
| Ch23 | kt-ch23-l6-x4 | comprehension | "He aimed not at the sky and not at his feet — at the side…" | "at the jar's clay side" | jar, side | → "the vessel's weakest point, its curved wall" | No |
| Ch24 | kt-ch24-l4-x2 | comprehension | "Kong Rong reached out and took the smallest pear." | "the very smallest pear" | pear, smallest | → "whichever fruit was least prized" | No |
| Ch24 | kt-ch24-l7-q8 | listen-mc | "His eyes were bright. He put a hand on Kong Rong's head." | "with bright eyes and a soft touch" | bright, eyes | → "gazing warmly, hand resting on his son's head" | Yes |

### B3. P2 — Single content-word spotlight (87 violations, top 15 shown)

| Ch | Q ID | Type | Sentence (key word) | Correct option | Overlap | 修法 |
|----|------|------|---------------------|----------------|---------|------|
| Ch17 | kt-ch17-l3-q3 | listen-mc | "…cleaned the **house**." | "doing daily **house** work" | house | → "keeping the home tidy" |
| Ch17 | kt-ch17-l3-q9 | listen-mc | "The **wooden** loom began to click…" | "**wooden** clicking" | wooden | → "the loom's sharp knocking sound" |
| Ch17 | kt-ch17-l3-x3 | comprehension | "I will not **look**," | "never **look** inside the room" | look | → "promised to stay away" |
| Ch17 | kt-ch17-l6-x8 | comprehension | "The old man saw the **crane**…" | "the young woman was the **crane**" | crane | → "she was no human at all" |
| Ch18 | kt-ch18-l3-x7 | comprehension | "A **snake** came near the bird…" | "hurt birds cannot escape a **snake**" | snake | → "an injured bird has no defence against predators" |
| Ch18 | kt-ch18-l5-x5 | comprehension | "Out came a new **house**." | "a whole new **house** appeared" | house | → "a dwelling sprang fully formed from the gourd" |
| Ch19 | kt-ch19-l3-x7 | comprehension | "…tell the **crocodiles** something…" | "trick the **crocodiles** with a lie" | crocodiles | → "deceive the creatures with a false claim" |
| Ch19 | kt-ch19-l7-x1 | comprehension | "…his small **full** belly." | "**full** and satisfied" | full | → "content, belly rounded with the meal" |
| Ch21 | kt-ch21-l3-q8 | listen-mc | "hornets thought…**rain**…" | "the **rain** was here" | rain | → "they believed a downpour had arrived" |
| Ch21 | kt-ch21-l7-x5 | comprehension | "The **stories** flew out…" | "**stories** spread everywhere at once" | stories | → "tales scattered in every direction" |
| Ch22 | kt-ch22-l3-q3 | listen-mc | "She **packed** their things…" | "**packed** everything up to go" | packed | → "gathered everything and set off" |
| Ch22 | kt-ch22-l5-x1 | comprehension | "…right next to a small **school**." | "nearby **school**" | school | → "an institution of learning just steps away" |
| Ch23 | kt-ch23-l5-q3 | listen-mc | "It was the quiet one — the **boy**…" | "Sima Guang, the still **boy**" | boy | → "the calm child others had overlooked" |
| Ch24 | kt-ch24-l3-x2 | comprehension | "…the big pears and the small **pears**." | "**pears** of two sizes" | pears | → "fruit differing in size before him" |
| Ch24 | kt-ch24-l7-x7 | comprehension | "…his **older** brothers…" | "respect for those **older** than you" | older | → "deference to those who came before you" |

**Full P2 list (87 items) not reproduced here to keep file compact; raw data in python scan above.**

---

## C. Stats

| Metric | Value |
|--------|-------|
| Questions scanned (Ch17–24 MC types) | ~315 |
| A7 violations found | 102 |
| Violation rate | ~32% |
| P0 | 1 |
| P1 | 14 |
| P2 | 87 |
| Ch with most violations | Ch21 (18) · Ch17 (18) · Ch19 (12) |
| Most common overlap type | Single noun from sentence ("house", "crane", "stories") |
| audio regen needed (P0+P1 listen-mc) | 3 questions |

**Chapter breakdown:**
| Ch | Total A7 |
|----|----------|
| Ch17 | 18 |
| Ch18 | 13 |
| Ch19 | 12 |
| Ch20 | 8 |
| Ch21 | 18 |
| Ch22 | 11 |
| Ch23 | 10 |
| Ch24 | 12 |

---

## D. Top 5 P0 (actual P0 = 1; listing P0 + worst P1)

1. **⚠️ P0 kt-ch18-l6-x5** — "Nolbu hurt the bird; Heungbu helped one" echoes both character names + "bird" from "He grabbed a baby bird." Triple verbatim lift. Replace with: "The cruel brother harmed it; the kind one healed it."

2. **P1 kt-ch24-l4-x2** — Sentence: "Kong Rong…took the smallest pear." Answer: "the very smallest pear." Both "pear" AND "smallest" echoed. This is near-P0. Replace: "whichever fruit was least prized."

3. **P1 kt-ch17-l4-x1** — Sentence: "She held a soft white cloth." Answer: "shining white and soft." Adjectives copied wholesale, just reordered. Replace: "gleaming like moonlight on silk."

4. **P1 kt-ch19-l6-x5** — Sentence: "the river was too wide." Answer: "river too wide to cross." Almost verbatim lift of the sentence subject + predicate adjective. Replace: "the crocodiles were trapped on their own side."

5. **P1 kt-ch18-l7-x1** — Sentence: "Out came dust. Out came mud." Answer: "only dust and mud inside." Key nouns repeated unchanged. Replace: "nothing useful, only filth and grime."

---

## E. Narrative Voice / Pacing Improvements (even where no R-violation)

Even among clean questions, three pacing patterns recur across Ch17–24:

1. **Explanation-as-restatement (Ch20, Ch22):** `explanationZh` fields often just echo the correct answer: "他煮飯打掃 → 每天煮飯打掃。" No added value for 8-12 learner. Better: Explain *why* the three wrong options fail, e.g., "砍柴的是爺爺，不是她，選項 D 混了角色。" Adds contrastive value.

2. **Repetitive sentence structure in Ch21 (Anansi):** Questions across L3–L5 all open "What did Anansi do to…?" — four consecutive WH-same-verb questions. Per R7 no two consecutive Qs should share sub-skill; here sub-skill *and* stem opening are identical. Vary with "Why did the hornet nest fall quiet?" or "How did Anansi manage to tie the python?"

3. **Ch19 (Sang Kancil) explanation tone:** Several `explanationZh` use the academic connector "這說明了" (this illustrates) which is adult/textbook register. Pivot to grandma voice: "你看，小鹿真的很聰明對不對！牠說謊讓鱷魚全部排成一排，這招太棒了！"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #104: X60_CONTENT_WORD_OVERLAP_LINT**

### Research finding
- **Source 1 (ResearchGate):** [Distractor Plausibility in a Multiple-Choice Listening Test](https://www.researchgate.net/publication/334003786_Distractor_Plausibility_in_a_Multiple-Choice_Listening_Test) — confirms that *overlap* (distractor contains words from the audio stimulus) is the single largest predictor of distractor selection. The same mechanism inverted — correct option sharing words with stimulus — equally degrades construct validity.
- **Source 2 (BenchMarker 2026):** [BenchMarker: Toolkit for Highlighting Flaws in Multiple-Choice Benchmarks](https://arxiv.org/pdf/2602.06221) — 2026 NLP paper demonstrates that "surface form matching" between answer and stem is the #1 shortcut that lets solvers bypass comprehension. Finding transfers directly to ELT MC listening items.
- **Buck (2001), §5.3:** Verbatim correct option is classified as the top "Construct-Irrelevant Variance" (CIV) source in L2 listening assessment. Pickup R1 already covers exact substring; A7 extends this to single/multi word overlap in the *correct* option.

### Current Pickup architecture
- `validate-lessons.js` already detects **X48_NGRAM_VERBATIM_CORRECT** (3-gram exact match) and **R1** (option is substring of sentence).
- **Gap:** No lint rule for 1–2 word content-word overlap (the dominant pattern in this audit: 102 violations, 87 of them single-word).

### Recommendation
Add **X60_CONTENT_WORD_OVERLAP_LINT** to `tools/validate-lessons.js`:

```js
// X60: correct option shares ≥1 non-trivial content word with sentence stem
function x60_contentWordOverlap(sentence, question, opts, correctIdx) {
  const STOP = new Set(['the','a','an','is','are','was','were','of','in',
    'on','at','to','for','and','but','or','he','she','it','they','his',
    'her','its','their','i','we','you','my','your','with','from','by',
    'as','up','out','not','had','has','have','did','do','does','be',
    'been','so','if','can','will','that','this','very','just','all',
    'than','then','when','what','who','how','which','there','here',
    'into','about','after','before','also','no','yes','more','most',
    'some','any','each','few','too','yet','only','both','same','other',
    'good','long','right','left','well','down','back','way','like',
    'make','take','say','said','tell','told','give','find','keep','put',
    'let','much','many','little','small','big','old','young','first',
    'next','would','could','should','might','may','between','around',
    'never','always','every','need','want','feel','time','day','year']);
  const cw = t => new Set((t.toLowerCase().match(/[a-z]{3,}/g)||[]).filter(w=>!STOP.has(w)));
  const stemWords = cw((sentence||'') + ' ' + (question||''));
  const opt = opts[correctIdx] || '';
  const overlap = [...cw(opt)].filter(w => stemWords.has(w));
  if (overlap.length >= 1) {
    const sev = overlap.length >= 3 ? 'P0' : overlap.length === 2 ? 'P1' : 'P2';
    return `X60_CONTENT_WORD_OVERLAP (${sev}) 正解「${opt}」與題幹共享詞: [${overlap.join(', ')}] — 改用同義/上位詞`;
  }
  return null;
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X60 content-word overlap lint (correct option echoes stem) | Buck 2001 + BenchMarker 2026 | ✅ 直接適配 — validate-lessons.js 已有 X48 3-gram；X60 extends to 1–2 word level | ~2 hr (add check + wire into per-file loop) | ★★★★★ 102 violations found in Ch17-24 alone; catches largest class of A7 bug | 強烈推薦立刻實作 |

**Fix priority:** P0 (1 Q) → P1 listen-mc that need audio regen (3 Q) → P1 comprehension (11 Q) → P2 systematically.
**Note:** P2 single-word overlaps involving proper nouns (character names like "Anansi", "Heungbu") are highest priority within P2, as name repetition is most exploitable by young test-takers.
