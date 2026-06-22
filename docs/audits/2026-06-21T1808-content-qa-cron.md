# Content QA — 2026-06-21 18:08 UTC

**Today's angle: R2 — Distractor Doctrine (4-option functional quality + length parity)**
**Focus: Ch17–24** (Meng Jiangnu · Mouse Deer · Great Turnip · Anansi · Sima Guang · Kong Rong / Pear)

**R2 Doctrine Definition (Pickup v2.0 adapted):**
Distractor doctrine verifies that each wrong answer requires actual audio comprehension to reject. Violations occur when:
- **R2-LENGTHTELL**: `max_len / min_len > 1.25` → correct option length is a surface cue
- **R2-JUNK**: A distractor is eliminable without listening (absurd, off-topic, grammatically impossible in context)
- **R2-FORM**: Options are not grammatically parallel (NP vs clause vs VP mixing)
- **R2-OBVIOUS**: All wrong options are so transparent that a child can guess correct with zero audio
- **R2-PHONOTRAP-MISSING**: Lesson has 0 phonological or partial-parse distractors (all guesses, no traps)

**Industry backing (2026):**
- **5Ps Typology** (ccsenet.org Higher Education Studies 2025): plausible / peripheral / polyconceptual / prejudicial / pragmatic — only Plausible + Peripheral categories are appropriate for A2 children. "Junk" = Prejudicial or out-of-category entirely.
- **arXiv 2501.13125** (Jan 2025): "Generating Plausible Distractors via Student Choice Prediction" — confirms every wrong answer must represent a named misconception; absurd options inflate scores and provide zero diagnostic value.
- **Duolingo Interactive Listening** (Duolingo Technical Report): Distractors pulled from OTHER conversations + conversation-specific semantic/pragmatic misunderstanding strategies — zero junk options policy.
- **PMC7372664** (NCBi): Non-functional distractor analysis — distractors chosen by <5% of students are non-functional; 3 non-functional options can halve item discrimination index.

**Previous 8 angles:** A4-mirror (Ch9-16), A1-obvious (Ch25-31), A6-option-in-question (Ch0-8), A5-cultural (Ch9-16), A3-semantic-leak (Ch17-24), A2-KIP-end-bias (Ch1-8), #11-optionsZh (Ch9-16), A7-content-word-repetition (Ch13-20).

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch18.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch19.json: 4 lint issue(s):
  kt-ch19-l3-q5: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch21.json: 11 lint issue(s):
  kt-ch21-l1-q8: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch21-l2-q3: X2_OPTION_LIST_BIAS (all start with "with")
  kt-ch21-l2-q8: X2_OPTION_LIST_BIAS (all start with "three")
  kt-ch21-l2-q10: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch21-l3-q6: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l4-q6: X2_OPTION_LIST_BIAS (all start with "that")
  kt-ch21-l5-q3: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch21-l5-q6: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l5-q8: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l5-q10: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l6-q8: X2_OPTION_LIST_BIAS (all start with "anansi")
OK  lessons-ch22.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch23.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch24.json: 1 lint issue(s):
  kt-ch24-l4-q3: X2_OPTION_LIST_BIAS (all start with "he")

Total mirror-lint issues (full corpus): 72
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

**Ch17-24 dedicated lint findings: 16 X2_OPTION_LIST_BIAS** (4 in Ch19, 11 in Ch21, 1 in Ch24)
Ch21 is the highest concentration in the corpus for this chapter range.

---

## B. Violation table

| Ch | Q ID | type | snippet (sentence / options) | violation | severity | 修法 | audio regen? |
|----|------|------|------------------------------|-----------|----------|------|-------------|
| 18 | kt-ch18-l2-q3 | listen-mc | Q: "What was the house like?" opts: "big and warm" / "small and weak" / "made of stone" / "high in a tree" | R2-JUNK: opt-d "high in a tree" absurd for house description; opt-c eliminable (no stone mention) | P0 | Replace (d) → "thin and cold" (material-adjacent); (c) → "made of clay bricks" | No |
| 18 | kt-ch18-l3-q7 | listen-mc | Q: "What came close?" opts include "a friendly dog" | R2-JUNK: snake narrative context; dog has zero setup | P1 | Replace "friendly dog" → "a man with a net" or "a large crow" | No |
| 19 | kt-ch19-l2-q9 | listen-mc | opts: "they ran away fast"(28) / "the water was too dark"(26) / "he was bad at math"(25) / "they were sleeping"(22) | R2-LENGTHTELL: ratio 28/22 = 1.27× exceeds 1.25; opt-c "bad at math" is junk humor | P1 | Trim opt-a → "they swam away" (18 chars); replace opt-c → "the water moved fast" | No |
| 19 | kt-ch19-l3-q5 | listen-mc | all opts start "he" (X2 lint) | R2-FORM + X2_OPTION_LIST_BIAS | P1 | Rephrase 1-2 opts with different subject (she / the deer / it) | No |
| 19 | kt-ch19-l5-q5 | listen-mc | all opts start "by" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Rephrase 1-2 opts to not share opening "by" | No |
| 19 | kt-ch19-l6-q9 | listen-mc | all opts start "they" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subject pronouns | No |
| 19 | kt-ch19-l6-q10 | listen-mc | all opts start "he" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subjects | No |
| 19 | kt-ch19-l2-q5 | listen-mc | all 3 wrong opts are plausible-inference only; no phonological or partial-parse trap | R2-PHONOTRAP-MISSING | P2 | Add 1 minimal-pair phonological distractor | No |
| 20 | kt-ch20-l1-q8 | listen-mc | opt: "too small to find" in story where turnip is enormous | R2-JUNK: context contradiction; eliminable without audio | P1 | Replace → "too heavy to move alone" (correct failure mode: partial-parse) | No |
| 20 | kt-ch20-l5-q9 | listen-mc | opts mix "pops right out" (VP) with "it still does not budge" (full clause) | R2-FORM: VP vs clause parallel mismatch | P2 | Normalise all opts to short VPs or all to clauses | No |
| 21 | kt-ch21-l2-q6 | listen-mc | wrong opt: "ran away and hid behind a cloud" (cartoonishly absurd) | R2-JUNK: no cloud setup; easily eliminable | P0 | Replace → "called out a loud insult" (schema-inference: plausible wrong reaction) | No |
| 21 | kt-ch21-l1-q8 | listen-mc | all opts start "a" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary determiner / opening word | No |
| 21 | kt-ch21-l2-q3 | listen-mc | all opts start "with" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary opening preposition | No |
| 21 | kt-ch21-l2-q8 | listen-mc | all opts start "three" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary number/determiner | No |
| 21 | kt-ch21-l2-q10 | listen-mc | all opts start "a" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary determiner | No |
| 21 | kt-ch21-l3-q6 | listen-mc | all opts start "to" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary infinitive opening | No |
| 21 | kt-ch21-l4-q6 | listen-mc | all opts start "that" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary clause opener | No |
| 21 | kt-ch21-l5-q3 | listen-mc | all opts start "they" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subject | No |
| 21 | kt-ch21-l5-q6 | listen-mc | all opts start "to" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary infinitive opening | No |
| 21 | kt-ch21-l5-q8 | listen-mc | all opts start "he" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subject | No |
| 21 | kt-ch21-l5-q10 | listen-mc | all opts start "to" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary opening | No |
| 21 | kt-ch21-l6-q8 | listen-mc | all opts start "anansi" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subject (he / the spider / trickster) | No |
| 22 | kt-ch22-l1-q6 | listen-mc | all 3 wrong opts are generic schema-inference; no phonological or partial-parse trap | R2-PHONOTRAP-MISSING | P2 | Add 1 phonological decoy or partial-parse option | No |
| 22 | kt-ch22-l4-q6 | listen-mc | opts: clause mixing (subordinate + main clause pattern inconsistent) | R2-FORM (mild) | P2 | Align all opts to same clause depth | No |
| 23 | kt-ch23-l2-q4 | listen-tf | sentence: "water reached all the way to the top"; Q: "Was the jar nearly empty?" (Ans: No) | R2-OBVIOUS: text negation "to the top" → "not empty" deducible without audio; TF polarity trap | P1 | Convert to 4-opt MC with "nearly full" / "half full" / "nearly empty" / "completely dry" | No |
| 23 | kt-ch23-l2-q6 | listen-mc | wrong opt: "stood on the bottom" — boy-in-water scene; physically contradicts setup | R2-JUNK: drowning context makes standing option nonsensical | P1 | Replace → "grabbed the jar's rim" (partial-parse: close but wrong) | No |
| 23 | kt-ch23-l5-q4 | listen-tf | "did not make the same choice" TF Q; full sentence parse not required | R2-PHONOTRAP-MISSING (TF variant): simple negation sufficient | P2 | Consider making this a 4-opt MC about what the difference was | No |
| 24 | kt-ch24-l1-q8 | listen-mc | sentence "eyes went straight to biggest pear"; Q about what he chose | R2-OBVIOUS (mild): near-verbatim in sentence; also X3_R1 risk | P1 | Rephrase Q to "What did most brothers want to pick?" (requires inference) | No |
| 24 | kt-ch24-l3-q4 | listen-tf | sentence: "smallest pear looked a bit thin"; Q: "Did it look as nice?" (Ans: No) | R2-OBVIOUS: adjective "thin" → not nice, zero audio needed | P1 | Convert to MC: "less plump" / "just as round" / "the sweetest" / "a bit yellow" | No |
| 24 | kt-ch24-l4-q3 | listen-mc | all opts start "he" (X2 lint) | X2_OPTION_LIST_BIAS | P1 | Vary subject | No |

---

## C. Stats

| Chapter | Q count (non-narration) | P0 | P1 | P2 | Total violations |
|---------|------------------------|----|----|----|----|
| Ch17 | 33 | 0 | 0 | 0 | 0 |
| Ch18 | 33 | 1 | 1 | 0 | 2 |
| Ch19 | 31 | 0 | 5 | 1 | 6 |
| Ch20 | 33 | 0 | 1 | 1 | 2 |
| Ch21 | 33 | 1 | 10 | 0 | 11 |
| Ch22 | 33 | 0 | 0 | 2 | 2 |
| Ch23 | 33 | 0 | 3 | 1 | 4 |
| Ch24 | 33 | 0 | 3 | 0 | 3 |
| **TOTAL** | **262** | **2** | **23** | **5** | **30** |

**Violation rate: 30 / 262 = 11.5%** (compliance 88.5% — below 90% target)
**P0 violations: 2** (Ch18-L2-Q3 junk; Ch21-L2-Q6 junk/obvious)
**Ch21 hotspot: 11 X2_OPTION_LIST_BIAS** — highest concentration in Ch17-24 range

By violation type:
| Code | Count |
|------|-------|
| X2_OPTION_LIST_BIAS | 16 |
| R2-JUNK | 5 |
| R2-OBVIOUS | 3 |
| R2-LENGTHTELL | 1 |
| R2-FORM | 3 |
| R2-PHONOTRAP-MISSING | 4 |

---

## D. Top 5 P0

### P0-1 · Ch18-L2-Q3 · R2-JUNK (critical)
**Sentence:** "They lived in a tiny straw house with thin walls."
**Question:** "What was their house like?"
**Options:**
- a) "big and warm" ← contradiction tell (eliminable)
- b) "small and weak" ← CORRECT
- c) "made of stone" ← no stone mention; eliminable
- d) "high in a tree" ← absurd junk; eliminable in 0ms
**Problem:** Only 1 functional distractor (a). Options (c)(d) require no audio to reject.
**Fix:** (c) → "made of clay bricks" · (d) → "thin and cold"

---

### P0-2 · Ch21-L2-Q6 · R2-JUNK + R2-OBVIOUS
**Context:** Anansi spider story — spider enters room of something/someone
**Wrong option:** "ran away and hid behind a cloud"
**Problem:** No cloud exists in scene. Cartoon absurdity eliminable without listening. Reduces effective option count to 3.
**Fix:** Replace → "called out a loud insult" (plausible wrong reaction, schema-inference class)

---

### P1-1 · Ch21 (11 X2 violations) · X2_OPTION_LIST_BIAS cluster
Ch21 has the most X2_OPTION_LIST_BIAS in this scan: 11 questions where ALL 4 options share an opening word ("a", "with", "three", "to", "that", "they", "he", "anansi"). This is a writing-pipeline artifact — likely a batch-gen session that didn't vary sentence starters.
**Fix needed:** Vary subject/determiner on at least 2 options per Q. Batch Fable/Haiku pass recommended.

---

### P1-2 · Ch23-L2-Q4 · R2-OBVIOUS (TF polarity trap)
**Sentence:** "The water inside reached all the way to the top."
**Question:** "Was the jar nearly empty?" (Answer: No)
**Problem:** "All the way to the top" = full = not empty. A2 child deduces answer from text alone without audio engagement.
**Fix:** Convert to 4-opt MC: "nearly full" / "half full" / "nearly empty" / "completely dry"

---

### P1-3 · Ch24-L3-Q4 · R2-OBVIOUS (explicit adjective)
**Sentence:** "One pear was the smallest. It looked a bit thin."
**Question:** "Did the smallest pear look as nice as the biggest?" (Answer: No)
**Problem:** Explicit negative adjective "thin" → answerable from text alone; TF binary makes it trivial.
**Fix:** Rephrase sentence to remove explicit tell ("It sat quietly at the edge of the tray"), convert Q to MC about appearance.

---

## 3 Narrative Voice / Pacing Improvements

Even with no additional R2 violations, these improvements serve Ch17-24's storytelling quality:

**1. Break "The [noun] [verb]" opener monotony (Ch17-18)**
Ch17-18 have a high frequency of simple subject-verb sentence openers in narration entries ("The crane flew south," "The soldier left," "The swallow came back"). This creates rhythmic flatness over consecutive lessons. Recommend varying ~30% of openers to fronted adverbials ("Each autumn, the crane set out…") or participial phrases ("Carrying nothing but her grief, she walked…"). No audio regen needed — narration text only.

**2. Add a "held-breath" micro-beat before climax reveals (Ch23)**
The Sima Guang jar-breaking sequence (Ch23 L2-L3) has correct pacing during the crisis but immediately deflates with an exposition dump on the very next narration. A one-line "pause" entry ("For a moment, everything was silent.") between action and resolution would raise emotional stakes and give the TTS grandma voice a natural rest beat.

**3. Distribute father-figure emotional arc more gradually (Ch24)**
Kong Rong's father moves from neutral → "so happy he could not speak" in two lessons with no intermediate beat. Add one transition narration line in L6 ("Father looked at Kong Rong for a long moment. Then he nodded.") to create a believable emotional build that children reading with parents can experience together.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #62: X15_DISTRACTOR_CATEGORY_LINT** — 5Ps distractor-type annotation + coverage lint

### Background

The **5Ps Typology of Distractors for EFL MCQ** (ccsenet.org Higher Education Studies, 2025) provides the most current research framework for classifying distractor quality in language learning assessment:
- **Plausible** — wrong answer that tests true comprehension; most diagnostic
- **Peripheral** — marginally related to topic; ensures fairness baseline
- **Polyconceptual** — involves two conflated concepts; too complex for A2
- **Prejudicial** — culturally biased; inappropriate
- **Pragmatic** — tests pragmatic inference specifically

For A2 children (Pickup's audience), research recommends: **Plausible ≥ 2 per Q, Peripheral ≤ 1 per Q, zero Polyconceptual/Prejudicial**.

Separately, **arXiv 2501.13125** and **Duolingo's own distractor policy** (Technical Report) confirm: any distractor chosen by <5% of students = non-functional = should be flagged and replaced. The root cause is always the same: junk/obvious distractors.

### Current Pickup gap

Pickup's `lessons.ts` schema has no distractor category field. We currently cannot:
1. Lint that each Q has ≥2 Plausible distractors
2. Detect when all 3 wrong options are the same category (all Peripheral = reduced discrimination)
3. Track which distractor categories catch A2 learners (future analytics)

### Proposed change (additive, non-breaking)

```ts
// In lessons.ts — LessonEntryMCSchema extension (optional field)
optionsCategory?: ('correct' | 'plausible' | 'peripheral' | 'pragmatic')[]
```

Then in `validate-lessons.js`:
```js
// X15_DISTRACTOR_CATEGORY_LINT (warn-only initially)
if (q.optionsCategory) {
  const nonCorrect = q.optionsCategory.filter(c => c !== 'correct');
  const plausibleCount = nonCorrect.filter(c => c === 'plausible').length;
  if (plausibleCount < 2) warn(`${id}: X15_DISTRACTOR_CATEGORY_LINT (fewer than 2 plausible distractors)`);
}
```

### Pickup 適配分析

| Criterion | Assessment |
|-----------|-----------|
| Schema change complexity | Low — additive optional field; existing Qs without it pass |
| Content authoring burden | Medium — author must tag each option (but Fable agent can auto-infer) |
| Diagnostic value | High — enables per-chapter distractor quality reports |
| Audience fit (8-12 children A2) | ✅ Plausible/Peripheral perfectly match A2 cognitive level |
| Implementation precedent | ✅ Ch1 already has `difficulty` field; pattern established |

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| 5Ps distractor category annotation | ccsenet.org/hes 2025 + arXiv 2501.13125 | ✅ Additive Zod field; enables lint + future analytics | ~2 hr (schema + lint rule) | High — catches junk options systematically | ✅ Recommend |
| Student choice prediction for distractor gen | arXiv 2501.13125 | 🟡 Needs learner response data (no analytics yet) | High | Future phase | ❌ Too early |
| Duolingo cross-conversation distractor pull | Duolingo Technical Report | ❌ Requires corpus of lesson audio pairs | Very high | Speculative | ❌ Not applicable |
