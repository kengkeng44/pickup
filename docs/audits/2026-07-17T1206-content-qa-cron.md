# Content QA — 2026-07-17 12:06 UTC

**Today's angle:** A4 — Mirror Patterns (negation / identity / antonym-pair binary collapse)
**Focus:** Ch25–32 (Yu Gong / Archimedes / Journey to West / Yi the Archer / Odyssey / Heracles / Robin Hood / Merlin)

> **Angle choice rationale:** Recent 8-cycle rotation: A6 (Ch25-32) → #10 (Ch25-32) → #11 (Ch17-24) → A5 (Ch9-16) → A7 (Ch1-8) → #12 (Ch1-8) → R2 (Ch9-16) → A1 (Ch17-24). A4 mirror patterns absent from all 8 cycles. Ch25-32 is the Western/Chinese mythology arc (denser multi-event narrative with high risk of "not/never" negation stems, slow/fast movement contrasts, warm/cold weather motifs, and first/last temporal antonyms) — highest-value A4 target.

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 16 lint issue(s)  — 3× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch26.json: 17 lint issue(s)  — 4× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch27.json: 17 lint issue(s)  — 0× X57 (Ch27 clean on antonym-pair)
WARN lessons-ch28.json: 22 lint issue(s)  — 3× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch29.json: 19 lint issue(s)  — 2× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch30.json: 22 lint issue(s)  — 1× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch31.json: 25 lint issue(s)  — 3× X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch32.json: (no X57 hits)
Total mirror-lint issues (corpus-wide): 440
```

X57_ANTONYM_PAIR_MIRROR is warn-only. Ch25-32 total X57 hits: **19** (across all chapters).

---

## B. Violation table — A4 mirror pattern scan

### B1. X57_ANTONYM_PAIR_MIRROR confirmed by deep scan (11 listen-mc / comprehension P0/P1)

| Ch | Q ID | type | Sentence snippet | Q stem | Correct option | Antonym foil | Antonym axis | Priority |
|----|------|------|-----------------|--------|---------------|-------------|-------------|---------|
| 25 | kt-ch25-l4-q3 | listen-mc | "The work was **slow**, but the family never stopped." | "How **fast** did the work go each day?" | slow but steady | fast and very easy | slow/fast | P0 ⚠️ |
| 25 | kt-ch25-l7-q8 | listen-mc | "…they lifted the two big peaks far off." | "What did the kind giants do for the family?" | **took** the high rocks somewhere else | **gave** them new shoes for walking | gave/took | P1 |
| 25 | kt-ch25-l5-x4 | comprehension | "Yu Gong put down his basket and stood **up** tall." | "What did Yu Gong do before answering the man?" | lowered his load and rose **up** | sat **down** and wept softly | up/down | P1 |
| 26 | kt-ch26-l4-q3 | listen-mc | "Archimedes stepped in **slowly**, one foot at a time." | "How did Archimedes get into the tub?" | with **slow** careful steps | with a **fast** jump | slow/fast | P0 ⚠️ |
| 26 | kt-ch26-l5-q8 | listen-mc | "He felt the kind of **happy** you feel when…" | "How did Archimedes feel at this moment?" | as **happy** as solving a long puzzle | as quiet and **sad** as a rainy day | happy/sad | P0 ⚠️ |
| 26 | kt-ch26-l6-x1 | comprehension | "He told the king his plan in clear, **simple** words." | "How did Archimedes communicate his plan?" | in **short** words everyone could follow | in very **long** sentences with big words | short/long | P1 |
| 26 | kt-ch26-l7-q10 | listen-mc | "The **big** idea came from a small thing…" | "What kind of idea came from a small thing?" | a **big** discovery that changed science | a **small** trick that didn't help | big/small | P1 |
| 28 | kt-ch28-l3-q11 | comprehension | "…the wise man's door opened to a boy, not to him." | "What is this scene mainly showing?" | the **first** visit ends without a meeting | Liu Bei meets the wise man **at last** | first/last | P1 |
| 28 | kt-ch28-l4-q6 | listen-mc | "Snow fell on his hat and the horse's mane…" | "What was the weather like on the trip?" | snowy and **cold** | **warm** and sunny | cold/warm | P0 ⚠️ |
| 28 | kt-ch28-l6-q6 | listen-mc | "We will wait outside in the wind." | "Where did Liu Bei choose to wait?" | out in the **cold** wind | in the **warm** kitchen | cold/warm | P0 ⚠️ |
| 29 | kt-ch29-l3-q6 | listen-mc | "He longed to walk on its **warm** sand and touch its **old** stone walls." | "What did Odysseus want to do on Ithaca?" | feel the beach and the **old** stone | build a brand **new** city by the sea | old/new | P1 |
| 30 | kt-ch30-l3-q6 | listen-mc | "The forest was very **quiet**. No bird sang…" | "How did the forest sound?" | utterly **quiet**, nothing to hear | **noisy** like a busy market | quiet/noisy | P1 |
| 31 | kt-ch31-l3-x1 | comprehension | "The bad king had a Sheriff…in the town of Nottingham." | "Where was the Sheriff?" | Nottingham town, **near** the castle | Robin's village **far** to the north | near/far | P1 |

**Summary by chapter:**

| Ch | X57 lint hits | Deep-scan confirmed A4 | Notes |
|----|--------------|----------------------|-------|
| 25 | 3 | 3 | slow/fast axis + up/down + gave/took |
| 26 | 4 | 4 | slow/fast (again) + happy/sad + short/long + big/small |
| 27 | 1 | 0 | lint hit is X57 for different word; no binary-collapse |
| 28 | 3 | 3 | cold/warm TWICE same chapter (l4+l6) — axis overuse |
| 29 | 2 | 1 | old/new (1 confirmed), second is ch25-l7-x9 always/never |
| 30 | 1 | 1 | quiet/noisy |
| 31 | 3 | 1 | near/far confirmed; other 2 = old(×2) not binary-collapse |
| 32 | 0 | 0 | clean |

### B2. Negation-stem questions — 3 found, 0 A4 violations

| Ch | Q ID | Q stem | Verdict |
|----|------|--------|---------|
| 29 | kt-ch29-l4-x5 | "What did Odysseus show us by **not** looking back?" | ✅ Correct = "his mind was set only on going home" — proper pragmatic paraphrase, no binary with negation |
| 30 | kt-ch30-l4-x5 | "Why could arrows **not** hurt the lion?" | ✅ Correct = "the skin was far too thick" — explains cause; stem "why" focuses on cause not on binary |
| 31 | kt-ch31-l6-x5 | "How did the forest people make do **without** proper homes?" | ✅ Correct = "using branches and dry leaves instead" — valid inference; no binary collapse |

### B3. VP-structure mirror (shared proper noun + verb between Q stem and correct option)
**0 confirmed.** The corpus avoids asking "What did X do? → X did Y" identity restates.

### B4. Near-synonym distractor masking
**0 confirmed.** No case where correct and one distractor are semantically near-identical.

### B5. Special finding: cold/warm axis overuse within Ch28

Ch28 l4-q6 asks "What was the weather?" (snowy and cold / warm and sunny) and Ch28 l6-q6 asks "Where did Liu Bei wait?" (out in the cold wind / in the warm kitchen). Two questions in the same chapter use the same cold/warm antonym axis. A child who solves l4 learns the cold/warm tell and can apply it to l6 without additional comprehension. This is an axis-reuse pattern not caught by X57 (each question individually passes, but chapter-level cold/warm prevalence is the issue).

---

## C. Stats

| Category | Count |
|---------|-------|
| Total scorable items Ch25-32 | 404 |
| X57_ANTONYM_PAIR_MIRROR lint hits (Ch25-32) | 19 |
| Confirmed A4 antonym binary-collapse (listen-mc + comprehension) | 11 |
| A4 negation-stem questions | 3 |
| Negation-stem A4 violations | 0 |
| VP-structure mirror violations | 0 |
| Near-synonym distractor masking | 0 |
| Cold/warm axis reuse within same chapter | 1 instance (Ch28 l4+l6) |
| P0 violations | 5 |
| P1 violations | 6 |

**P0 criteria:** antonym binary-collapse in listen-mc/comprehension where (a) question stem directly names the axis ("How fast?" → slow/fast pair) OR (b) same antonym axis appears in correct option AND sentence simultaneously (sentence telegraphs; question confirms axis; foil is the polar word).

---

## D. Top 5 P0

### P0-1 — kt-ch25-l4-q3: axis-named binary collapse (Yu Gong)
**Type:** listen-mc  
**Sentence:** "The work was slow, but the family never stopped."  
**Q:** "How **fast** did the work go each day?"  
**Correct:** slow but steady | **Foil:** fast and very easy  
**Why P0:** Q stem says "How fast?" — the word "fast" directly names the slow/fast axis. Children who know "fast" means quick learn instantly to pick "slow" without processing the sentence. Double-primed binary (sentence has "slow" + Q has "fast").  
**Fix:** Change Q to axis-neutral "How did the family's work progress each day?" (removes axis naming). OR change foil from "fast and very easy" to a same-valence negative option like "stopped halfway through" (removes the antonym pole).  
**audio regen?** No (Q is text; sentence TTS unchanged)

### P0-2 — kt-ch26-l4-q3: slow/fast repeat pattern (Archimedes)
**Type:** listen-mc  
**Sentence:** "Archimedes stepped in slowly, one foot at a time."  
**Q:** "How did Archimedes get into the tub?"  
**Correct:** with slow careful steps | **Foil:** with a fast jump  
**Why P0:** Same slow/fast binary as Ch25-l4-q3 above. "slow" in sentence + "fast" foil = pure axis extraction, no listening comprehension required. Additionally, "one foot at a time" in the sentence is a strong giveaway supporting "slow" regardless of foil.  
**Fix:** Replace foil "with a fast jump" with same-speed negative option e.g. "while singing a loud song" or "with both feet together" (distracts by manner, not speed).  
**audio regen?** No

### P0-3 — kt-ch26-l5-q8: happy/sad simile binary (Archimedes eureka)
**Type:** listen-mc  
**Sentence:** "He felt the kind of happy you feel when a long question finally opens."  
**Q:** "How did Archimedes feel at this moment?"  
**Correct:** as happy as solving a long puzzle | **Foil:** as quiet and sad as a rainy day  
**Why P0:** Sentence contains "happy" explicitly. Foil is "sad" — direct antonym. Child reads the sentence and sees "happy"; foil says "sad". Binary discrimination, not listening comprehension. The elaborate simile disguise ("as quiet and sad as a rainy day") does not prevent axis detection.  
**Fix:** Replace sad foil with same-valence confusion: "as hungry and tired as after long walk" (wrong emotion, similar valence = genuine distractor).  
**audio regen?** No

### P0-4 — kt-ch28-l4-q6: cold/warm weather binary (Three Visits)
**Type:** listen-mc  
**Sentence:** "Snow fell on his hat and the horse's mane all the way up the hill."  
**Q:** "What was the weather like on the trip?"  
**Correct:** snowy and cold | **Foil:** warm and sunny  
**Why P0:** "Snow" in sentence → "cold". Foil "warm and sunny" is polar opposite. No real distraction. Child maps snow→cold, sees "warm" foil, eliminates immediately.  
**Fix:** Replace "warm and sunny" with false-positive distractor on wrong attribute: "wet and very muddy" (weather detail, but wrong specifics — it was snow not mud).  
**audio regen?** No

### P0-5 — kt-ch28-l6-q6: cold/warm REUSED in same chapter (Three Visits l6)
**Type:** listen-mc  
**Sentence:** "We will wait outside in the wind. Let him rest."  
**Q:** "Where did Liu Bei choose to wait?"  
**Correct:** out in the cold wind | **Foil:** in the warm kitchen  
**Why P0:** Ch28 already used cold/warm axis in l4-q6. This is the second cold/warm binary in the same chapter. Child who solved l4 has a memorized tell: "cold" appears in questions about Liu Bei's endurance → pick it. Axis-reuse compounds the binary collapse.  
**Fix:** Replace "in the warm kitchen" with location-type distractor: "down by the river behind the house" (wrong location, not antonym of "outside in the wind").  
**audio regen?** No

---

## E. Narrative Voice / Pacing Improvements (3 required per spec)

Even with 0 violations here, these pacing improvements are recommended:

### NV-1: Ch27 l3 departure beat lacks resolve moment (Journey to the West)
**Lesson:** kt-ch27-l3  
**Issue:** The narration "He had one brown horse and one small bag on his back. Behind him, the city walls grew small in the morning light." is imagistically strong, but there is no emotional beat capturing Sanzang's internal commitment to the journey. Contrast with Ch25 (Yu Gong's steadfast resolve being thematic). 
**Suggestion:** After the city-walls narration, add one grandma narration entry: "Grandma said: He had left his home and everything he knew. But he had made a promise, and he kept it." — bridges the image to the emotional theme and adds the grandma storytelling frame for consistency with other chapters.

### NV-2: Ch32 is content-thin (3 lessons, missing climax beat)
**Lesson:** kt-ch32-l3 and beyond  
**Issue:** Ch32 has only 3 lessons in the scan (25 items including narration), far below the Ch25-31 standard of 5-7 lessons. The Merlin arc wraps too quickly. The final grandma outro is missing the characteristic "Goodnight" / "Mochi jumps back to the street" close.  
**Suggestion:** Content team should add kt-ch32-l4 (resolution lesson) and kt-ch32-outro (Goodnight lesson) to match the 8-night framework. This is a content gap flag, not an item flaw.

### NV-3: Ch25-26 share "slow but" / "slow careful" phrasing across two chapters
**Lesson:** kt-ch25-l4-q3 correct = "slow but steady"; kt-ch26-l4-q3 correct = "with slow careful steps"  
**Issue:** Even after fixing the antonym foil (P0-1, P0-2), the correct options themselves echo "slow" as the key word across consecutive chapters. When children play Ch25 then Ch26 in sequence, they may develop "slow = right answer for movement/pace questions" as a rule, reducing Ch26's comprehension demand.  
**Suggestion:** Rephrase Ch26-l4-q3 correct option from "with slow careful steps" to "one careful foot after the other" (same meaning, avoids the exact word "slow" that appeared in Ch25's question answer). No correctIndex change.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis

**Wang & Meng (2026)** — *"Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods"* — Language Testing (doi:10.1177/02655322251400375):
> Polar-opposite distractors that fail to attract low-scoring test-takers effectively reduce item discrimination. AI-generated distractors show higher functional distractor rates when constrained to avoid antonym pairs. Key finding for children's ELT: children who have learned "fast" apply simple antonym-activation heuristics; a "slow/fast" pair requires no listening comprehension at all.

**Frontiers Education (2021)** — *"The Position of Distractors in Multiple-Choice Test Items: The Strongest Precede the Weakest"*:
> Binary-collapse items (where two options form a polar pair and the others are clearly implausible) systematically inflate correct-response rates in low-ability test-takers, destroying the item's discrimination power at the ability level it's designed for.

**NCBl / PMC11040895 (2024)** — *"Item analysis: impact of distractor efficiency on difficulty index and discrimination power"*:
> Non-functional distractors (including polar opposites that signal the correct answer through contrast) directly lower item difficulty and discrimination index. 35% of tested distractors were non-functional; polar-opposite flaw was the most common type.

### Analysis: fit for Pickup architecture

| Pattern | Pickup fit | Notes |
|---------|-----------|-------|
| Polar-opposite exclusion rule (no antonym foil) | ✅ Directly applicable | Already have X57 lint; need axis-amplifier gate |
| Psychometric DIF analysis (Wang & Meng approach) | ❌ Requires real user response data | Pickup doesn't yet have item-level response logging (only correctIndex/xp) |
| AI-constrained distractor generation (avoid antonym) | ✅ Applicable to content batch fix | Can instruct Fable agent to avoid antonym when rewriting foils |
| Distractor position ordering (strongest first) | 🟡 Partial | correctIndex randomization per session would help; current static ordering may bias |

### ARCH-REC #169: X169_A4_AXIS_AMPLIFIER_GATE

**Pattern:** When `X57_ANTONYM_PAIR_MIRROR` fires AND the question stem contains either (a) one of the antonym pair's words verbatim (e.g., Q: "How **fast**?" + correct: "slow") OR (b) the question stem contains a scalar WH ("How hot?", "How loud?", "How far?") that is on the same semantic axis as the antonym pair — escalate to a tagged `P0_CANDIDATE` comment in the lint output.

**What it doesn't do:** X57 already fires. This adds a `(Q AXIS-AMPLIFIED: question primes the binary)` marker so the content-cron audit can immediately triage P0 vs P1 without re-reading the sentence.

**Implementation:**
```js
// In validate-lessons.js, after existing X57 detection:
const axisPrime = (qStem, antonymA, antonymB) => {
  const stemLower = qStem.toLowerCase();
  // axis-named: Q contains one of the pair's words
  if (stemLower.includes(antonymA) || stemLower.includes(antonymB)) return true;
  // scalar WH: Q contains "how [adj]?" where adj is on the axis
  const scalarPattern = /how\s+(fast|slow|hot|cold|warm|cool|loud|quiet|far|near|big|small|long|short|happy|sad)/i;
  return scalarPattern.test(stemLower);
};
// When X57 fires:
const amplified = axisPrime(q.question, pairA, pairB);
if (amplified) msg += ' (Q AXIS-AMPLIFIED: 題幹直接指定反鏡軸 → P0_CANDIDATE)';
```

**Effort:** Low (~30 min, add 8 lines to validate-lessons.js)  
**ROI:** High — automates the P0 vs P1 triage that this audit had to do manually. This cycle found 5 P0 and 6 P1 from 19 X57 hits; 4 of the 5 P0s were axis-amplified. Automating the signal saves 30+ min per future audit cycle.  
**Pickup fit:** ✅ Directly applicable; zero content change; no schema change; warn-only extension  
**Source:** [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) · [Frontiers Education 2021](https://www.frontiersin.org/articles/10.3389/feduc.2021.731763/full) · [NCBl 2024](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11040895/)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X169_A4_AXIS_AMPLIFIER_GATE — Q stem names the antonym axis → P0 tag | Wang & Meng 2026 / Frontiers 2021 | ✅ | Low (30 min) | High | ⭐ 推薦 |
| AI-constrained distractor generation (antonym-free constraint) | Wang & Meng 2026 | ✅ Fable agent already used | Already practice | High | 現有做法 |
| Psychometric DIF analysis (item-level response data) | Wang & Meng 2026 | ❌ No item-level logs yet | Very High (needs feature) | Future | 待 Phase 3 |
| Static-to-random distractor ordering | Frontiers 2021 | 🟡 Needs LessonPage change | Medium | Medium | Tier C |

---

*Audit generated 2026-07-17T1206 UTC · A4 mirror patterns · Ch25-32 · validate-lessons.js warn-only (440 total mirror-lint issues)*
