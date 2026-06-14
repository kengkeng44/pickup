# Content QA — 2026-06-14 06:13 UTC

Today's angle: **A2 — Answer Echo in Audio Stimulus (Adapted Blank-Position Audit)**
Focus: **Ch2 (Ugly Duckling), Ch4 (Camel's Hump), Ch8 (Three Little Pigs), Ch17 (Crane Wife), Ch25 (Giant's Hill), Ch26 (Archimedes)**

> **A2 rotation history**: First dedicated A2 pass on this codebase.
>
> **Angle definition (adapted)**:
> All 462 questions across 6 audited chapters use `listen-mc` / `listen-comprehension` / `emoji-pick` / `listen-tf` format — no traditional `___` cloze blanks exist. A2 is therefore applied as:
>
> - **(A2a) No-evidence-in-sentence**: Correct answer is not derivable from the audio sentence alone — requires cultural/story-schema knowledge that the sentence does not encode. Flag when `c_in_s=0` AND factual Q-type AND distractors have higher sentence overlap than correct answer.
> - **(A2b) Near-verbatim 3-gram echo**: Correct answer contains a 3-gram (`N≥3 consecutive words`) that appears verbatim in the audio sentence. This is the MC equivalent of a "cloze blank answered by position": the learner can match surface words rather than demonstrate comprehension.
> - **(A2c) Cognitive overload**: Sentence ≥18 words — exceeds A2 child WM span (~7±2 chunks / ~14 words comfortable ceiling per Baddeley 2000 + Cowan 2001).
> - **(A2d) Temporal cross-reference**: Question uses "at first" / "finally" / "in the end" requiring multi-sentence sequence tracking not encoded in the single-sentence stimulus.
>
> **Source authority**:
> - Buck (2001) *Assessing Listening*: "items must not allow test-takers to answer from surface features of the text alone, bypassing the listening construct."
> - Distractor Plausibility in MC Listening Tests (ResearchGate): "overlap [verbatim words from text] is the most influential factor making distractors plausible" — by inversion, verbatim overlap in the **correct answer** makes it trivially identifiable by surface-matching, bypassing comprehension.
> - EMNLP 2024 "Distractor Generation in MCQ" survey: surface-form overlap is the #1 tell for non-paraphrased options.
> - TELPAS item rationale 2025: each item keyed to "evidence from the text" — but "evidence" must be paraphrased, not echoed.

---

## A. validate-lessons.js result

```
OK  lessons-ch2.json:  7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch4.json:  7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch8.json:  7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch17.json: 7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch25.json: 7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch26.json: 7 lessons  (JSON shape + mirror + extended lint)

Pre-existing global warns: 70 mirror-lint issues (unrelated to this angle)
Total mirror-lint issues: 70
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

All 6 chapters pass schema validation. A2 violations are semantic — not caught by current lint.

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|----|------|------|---------|-----------|------|--------------|
| ch8 | `kt-ch8-l3-q3` | A2b P0 | sentence: "…they **felt firmer than straw**" / correct: "they were **firmer than straw**" | 3-gram `"firmer than straw"` verbatim echo. Only `felt`→`were` changes. Near-R1 violation. | correct: `"harder than his brother chose"` or `"sturdier than the last"` | No |
| ch26 | `kt-ch26-l5-q3` | A2b P0 | sentence: "Gold and silver have **different sizes** for the **same weight**." / correct: "**same weight** can have **different size**" | Word-reorder only — not a paraphrase. Both key terms verbatim-swapped. | correct: `"metals with equal mass can fill different spaces"` | No |
| ch8 | `kt-ch8-l6-q9` | A2b P0 | sentence: "Both brothers ran **out the back**, fast as they could." / correct: "**out the back**, very fast" | 3-gram `"out the back"` verbatim. Correct = sentence + "very fast" appended. | correct: `"through the back exit quickly"` or `"escaped from behind"` | No |
| ch8 | `kt-ch8-l4-q3` | A2a P1 | sentence: "He lifted heavy **red blocks** and mixed cold **wet earth** all day." / correct: "**baked stone** and clay" | Vocabulary inaccuracy: "red blocks" ≠ "baked stone" for A2. Child who recalls "red blocks" may reject correct answer. "baked stone" is adult/archaic register, not A2-safe. | correct: `"red blocks and wet earth"` (direct paraphrase) or `"bricks and clay"` | No |
| ch8 | `kt-ch8-l7-q7` | A2b P1 | sentence: "The third pig built **a hot fire** inside a big pot." / correct: "made **a hot fire**" | 3-gram `"a hot fire"` verbatim. | correct: `"lit flames in the pot"` or `"prepared a burning trap"` | No |
| ch26 | `kt-ch26-l4-q6` | A2b P1 | sentence: "…called **for a cloth to wipe** it up." / correct: "ask **for a cloth to wipe** it" | 5-gram `"for a cloth to wipe"` verbatim echo. Only `called`→`ask` changes. | correct: `"reach for something to clean up"` | No |
| ch26 | `kt-ch26-l6-q6` | A2b P1 | sentence: "…placed a piece of **pure gold of the same weight**." / correct: "**pure gold of** equal weight" | 3-gram `"pure gold of"` verbatim. Only `same`→`equal` changes. | correct: `"matching gold in weight"` or `"a gold piece weighing the same"` | No |
| ch17 | `kt-ch17-l7-q9` | A2b P1 | sentence: "She flew up, up, **up into the** morning sky." / correct: "far **up into the** sky" | 3-gram `"up into the"` verbatim. | correct: `"high above, far away"` or `"away through the clouds"` | No |
| ch25 | `kt-ch25-l7-q3` | A2b P1 | sentence: "They were **kind giants from** above." / correct: "**kind giants from** the sky" | 3-gram `"kind giants from"` verbatim. Only `above`→`the sky` changes. | correct: `"gentle tall beings in the clouds"` | No |
| ch2 | `kt-ch2-l3-q8` | A2d P1 | sentence: "She stepped close so the hens could not reach her grey son." / Q: "What did mother duck do **at first**?" | "at first" = temporal cross-ref across sentences. Single sentence doesn't establish sequence. Child who only processes this sentence has no cue that this is "first" in a series. | Q→ `"What did mother duck do to keep him safe?"` | No |
| ch8 | `kt-ch8-l7-q9` | A2d P1 | sentence: "The wolf jumped down from the roof and ran fast to the trees." / Q: "What did the wolf **finally** do?" | "finally" implies end-of-sequence requiring multi-sentence tracking. | Q→ `"What did the wolf do after jumping down?"` | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 6 (Ch2, Ch4, Ch8, Ch17, Ch25, Ch26) |
| Total Qs in scope | 462 (77 per chapter × 6) |
| MC-type Qs audited | 183 (listen-mc + listen-comprehension) |
| A2b near-verbatim violations | 8 (across Ch8, Ch17, Ch25, Ch26) |
| A2a vocab-mismatch / no-evidence | 1 (Ch8) |
| A2d temporal cross-ref | 2 (Ch2, Ch8) |
| **Total violations** | **11** |
| **P0 (needs fix before next deploy)** | **3** |
| **P1 (fix this week)** | **8** |
| Audio regen required | 0 |
| Ch8 violation density | 5/29 MC-type = 17% |
| Ch26 violation density | 4/35 MC-type = 11% |

---

## D. Top 5 P0

### #1 — `kt-ch8-l3-q3` · A2b · Near-verbatim 3-gram echo (Ch8 Three Little Pigs)

```
sentence:  "He picked sticks because they felt firmer than straw."
Q:         "Why did he pick sticks?"
  [0] they were cheaper to buy
✓ [1] they were firmer than straw   ← "firmer than straw" verbatim from sentence
  [2] his brother said so
  [3] he had no other choice left
explanationZh: 比稻草硬 → firmer than straw。
```

**Issue**: The 3-gram `"firmer than straw"` appears word-for-word in both the sentence and the correct answer. Only `"felt"` → `"were"` differs. This is a surface-match answer: an 8-year-old can select [1] by *hearing* the phrase without understanding the sentence structure or semantics. Violates the spirit of R1 (paraphrase required) and the core purpose of the MC format.

**Fix**: `correct: "sturdier than the first material"` or `"stronger than what pig one used"`

---

### #2 — `kt-ch26-l5-q3` · A2b · Word-reorder, not paraphrase (Ch26 Archimedes)

```
sentence:  "Gold and silver have different sizes for the same weight."
Q:         "What was the secret Archimedes found?"
  [0] gold and silver have the same size
✓ [1] same weight can have different size  ← word-by-word scramble of sentence
  [2] gold floats but silver sinks
  [3] silver always weighs more than gold
```

**Issue**: The correct answer is a syntactic reorder of the sentence: `"different sizes / same weight"` → `"same weight / different size"`. No synonyms. No higher-order abstraction. A learner can find this by "which option contains both key words?" without comprehension. Worst A2b violation this cycle.

**Fix**: `correct: "metals of equal mass can fill different amounts of space"` (introduces `mass`, `space` — genuine paraphrase)

---

### #3 — `kt-ch8-l6-q9` · A2b · 3-gram exact echo (Ch8 Three Little Pigs)

```
sentence:  "Both brothers ran out the back, fast as they could."
Q:         "How did the pigs leave?"
  [0] through the front door
✓ [1] out the back, very fast   ← "out the back" verbatim phrase
  [2] under the floor boards
  [3] they did not leave
```

**Issue**: The correct answer opens with `"out the back"` — a direct copy of the sentence phrase. The only addition is `"very fast"` (which is also derivable from `"fast as they could"`). A child need only recognize the sound of `"out the back"` to pick [1].

**Fix**: `correct: "through the rear exit as quickly as they could"` or `"escaped from behind the house"`

---

### #4 — `kt-ch8-l4-q3` · A2a · Vocabulary inaccuracy in correct paraphrase (Ch8 Three Little Pigs)

```
sentence:  "He lifted heavy red blocks and mixed cold wet earth all day."
Q:         "What did the third pig use?"
  [0] straw and grass
✓ [1] baked stone and clay
  [2] paper and tape
  [3] cold snow and ice
```

**Issue**: The sentence says `"heavy red blocks"` (bricks). The correct answer says `"baked stone"`. For an A2 Taiwanese 8-12 year old: "red blocks" ≠ "baked stone" lexically. "Baked stone" is adult/archaic vocabulary (not GSL-2000). A child who correctly recalls `"red blocks"` from the audio may reject [1] because the audio word (blocks) is absent. The mapping `"red blocks" = "baked stone"` requires adult brick-manufacturing knowledge.

**Fix**: `correct: "red bricks and wet earth"` or `"hard blocks and clay"` — keeps register at A2.

---

### #5 — `kt-ch26-l4-q6` · A2b · 5-gram echo (Ch26 Archimedes)

```
sentence:  "Most people would have called for a cloth to wipe it up."
Q:         "What did most people do when bath water spilled?"
  [0] ignore the water completely
✓ [1] ask for a cloth to wipe it   ← "for a cloth to wipe it" verbatim
  [2] pour more water in the tub
  [3] leave the bath fast
```

**Issue**: 5-gram `"for a cloth to wipe it"` is lifted directly from the sentence. Only `"called"` → `"ask"` changes. This is the longest verbatim echo found this cycle — 5 consecutive words. Completely bypasses comprehension.

**Fix**: `correct: "reach for something to dry the floor"` (uses `"floor"` reference + `"dry"` semantic paraphrase of `"wipe"`)

---

## E. Narrative Voice / Pacing Improvements (required even with violations present)

### NV-1: Ch8 Wolf-centric Question Cluster (L4–L6)
Three consecutive lesson-end questions (L4-q9, L5-q9, L6-q3 / L6-q9) all test wolf behavior: how wolf knocked, how wolf approached, how pigs reacted. This creates a wolf-perspective cluster that de-centers the pig protagonists at the most dramatic moment. Recommend rotating at least one question to test pig *emotional response*:

> Current: "How did the wolf look as he came?" (L6-q3)
> Proposed: "How did the two brothers feel when they saw him?" — tests emotional inference, child POV.

### NV-2: Ch2 "at first" Temporal Anchor (kt-ch2-l3-q8)
The question "What did mother duck do **at first**?" implies a future reversal that the child should track — but that reversal is in a later sentence. For a single-sentence stimulus, "at first" creates artificial complexity without adding inferential value. The sentence is perfectly good for a simpler Q:

> Current Q: "What did mother duck do at first?"
> Proposed Q: "What did mother duck do to keep him safe?" — same target concept, no cross-sentence temporal dependency.

### NV-3: Ch26 ExplanationZh Register Too Dry for Child Audience
Ch26 (Archimedes) has 4 explanationZh entries that use the pattern `"推理: X → Y (paraphrase)"`. This is adult-academic framing. For 8-12 Taiwanese children, Mochi-voice story register is more appropriate:

> Current (kt-ch26-l5-q3): `"推理: same weight, different sizes → 相同重量可以有不同大小 (paraphrase)。"`
> Proposed: `"阿基米德的秘密: 金和銀重量一樣, 但佔的空間不一樣! 就像把一顆葡萄和一顆蘋果放在同一個秤上。"`

This applies to kt-ch26-l4-q6, l5-q3, l6-q6, l7-q6 — all use the same dry format.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #32 — `A2B_CORRECT_ECHO_LINT` (3-gram verbatim check on correct answer)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Flag when correct answer's 3-gram appears verbatim in audio sentence | EMNLP 2024 "Distractor Generation in MCQ" + ResearchGate "Distractor Plausibility in MC Listening Tests" | ✅ Simple string search; same pattern as existing R1_SUBSTRING lint | S (30 min, ~15 lines in validate-lessons.js) | ⭐⭐⭐ | ✅ Ship |

**Industry backing:**
- EMNLP 2024 survey (ACL Anthology 2024.emnlp-main.799): "surface form overlap is the primary feature enabling test-takers to match options without comprehension"
- ResearchGate Distractor Plausibility study: "overlap [verbatim words from text] is the most influential factor to make distractors plausible" — by inversion, the same overlap in the **correct answer** creates an echo bypass that undermines the construct.
- Existing Pickup `R1_SUBSTRING` lint checks if correct option is a *substring* of the sentence. This ARCH-REC extends to *partial phrase echo* (3-gram) which R1 misses (since "firmer than straw" is not a full substring of the sentence).

**Current architecture gap:**
- `validate-lessons.js` checks `R1_SUBSTRING`: `correct_option.toLowerCase() in sentence.toLowerCase()`
- This misses 3-gram echoes where correct = `"they were firmer than straw"` and sentence = `"they felt firmer than straw"` (R1 fails to catch because "they were firmer than straw" ≠ substring)

**Proposed lint rule:**
```js
// A2B_CORRECT_ECHO: flag 3-gram from correct answer verbatim in sentence
const cWords = correctOption.toLowerCase().split(/\s+/);
for (let i = 0; i <= cWords.length - 3; i++) {
  const trigram = cWords.slice(i, i + 3).join(' ');
  if (sentence.toLowerCase().includes(trigram)) {
    issues.push(`${qId}: A2B_CORRECT_ECHO (3-gram "${trigram}" in sentence)`);
    break;
  }
}
```

**Expected catch**: Would have flagged all 8 A2b violations this cycle (Ch8: 3, Ch17: 1, Ch25: 1, Ch26: 3). Across full corpus, estimated 15-25 additional catches given Ch26 density pattern.

**Pickup architecture fit**: ✅ Direct drop-in to `tools/validate-lessons.js` extended lint block. No schema changes. No src/ changes. Output integrates with existing WARN format.

**Risk**: Possible false positives for short correct answers (2-word answers can't form a trigram → safe). For `"out the back"` pattern, trigram IS the full answer — correctly flagged.

---

*Audit complete. 11 violations (3 P0, 8 P1). 0 audio files require regen. ARCH-REC #32 ready for cockpit decision.*
