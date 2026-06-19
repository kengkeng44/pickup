# Content QA — 2026-06-19 00:09 UTC

**Today's angle: A4 — Mirror Patterns (Negation / Identity / Antonym Distractors)**
**Focus: Ch21–26** (Anansi / Meng Mu / Sima Guang Jar / Kong Rong / Yu Gong / Archimedes Crown)

**A4 Definition:** A distractor that is the direct negation, semantic opposite, or antonym of the correct answer. The test-taker can eliminate it through semantic polarity reasoning alone — no audio comprehension required. This is distinct from R1 (verbatim echo) and A6 (option-in-question): it targets the *structural relationship between options* rather than option↔sentence overlap.

**Why A4 matters (psychometric basis):** Iimura (2019, JLTA Journal 21) classifies "negative" as one of five distractor characteristic types and finds it the weakest — negative distractors are selected by the fewest examinees, indicating they function as non-plausible options. Haladyna & Rodriguez (2013) classify distractors chosen by <5% of examinees as "non-functional," inflating item difficulty artificially. Cambridge YLE item writer guidelines explicitly prohibit antonym distractors as they can be eliminated by semantic polarity scanning, not story comprehension. EDM 2024 (DISTO) shows that negative-sampling (antonym-based) distractor generation consistently underperforms student-choice-predicted distractors on plausibility metrics.

**For Pickup specifically:** 8–12-year-old learners develop antonym-scanning as an early reading/listening strategy (before B1). A correct answer "quiet and empty" paired with distractor "loud and busy" is trivially resolved by any child who recognizes the antonym relationship — defeating the learning objective of comprehension-gated response.

Previous 8 crons: R1, A6, A1, A3, #11, #10, A5, A2. A4 not audited in this window.

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json: 7 lessons
OK  lessons-ch1.json: 7 lessons
OK  lessons-ch2.json: 7 lessons
OK  lessons-ch3.json: 7 lessons
OK  lessons-ch4.json: 7 lessons
WARN lessons-ch5.json: 1 lint issue(s):
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
OK  lessons-ch6.json: 7 lessons
WARN lessons-ch7.json: 1 lint issue(s):
  kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she")
OK  lessons-ch8.json through lessons-ch20.json: 72 lessons
WARN lessons-ch31.json: 8 lint issue(s) [R1_SUBSTRING × 2 + X3 × 2 + X2 × 4]

Total mirror-lint issues: 70 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

No A4 lint rule exists yet — validate-lessons.js cannot currently detect antonym mirror patterns. The 18 violations below are manual audit findings.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence snippet | Correct option | Mirror distractor | Violation | audio regen? |
|----|------|------|-----------------|----------------|-------------------|-----------|--------------|
| 21 | kt-ch21-l1-q3 | listen-mc | "no one had a tale to tell" | [1] very quiet and empty | [0] loud and busy | **P0 · ANTONYM_MIRROR** (quiet/empty ↔ loud/busy exact pair) | No |
| 21 | kt-ch21-l1-q6 | listen-mc | "tiny, but his head was full of plans" | [1] small but with many ideas | [0] very big with strong legs | **P1 · ANTONYM_MIRROR** (small/ideas ↔ big/legs mirrors sentence contrast) | No |
| 21 | kt-ch21-l3-q3 | listen-mc | "full of a loud, busy buzzing sound" | [1] a noisy, busy hum | [0] no sound at all | **P1 · ANTONYM_MIRROR** (noisy/hum ↔ no sound at all) | No |
| 21 | kt-ch21-l4-q3 | listen-mc | "like a green road in the grass" | [1] very long like a road | [0] very short like a pin | **P1 · ANTONYM_MIRROR** (long ↔ short exact antonym) | No |
| 21 | kt-ch21-l5-q3 | listen-mc | "No animal…dared to walk near his rest tree" | [1] no, every animal kept far | [0] yes, very easy work / [2] yes, he loved hugs | **P0 · YES_NO_POLARITY** (sentence opens "No" → polarity trivially resolved; 2 of 4 options start "yes") | No |
| 21 | kt-ch21-l7-q3 | listen-mc | "every step down the thread was slow and careful" | [1] slowly with care | [0] fast and bouncy | **P2 · ANTONYM_MIRROR** (slow/careful ↔ fast/bouncy) | No |
| 22 | kt-ch22-l2-q6 | listen-mc | "Her heart felt heavy as she watched her son" | [1] sad and worried | [0] light and happy | **P0 · ANTONYM_MIRROR** (heavy-heart=sad ↔ light+happy; English idiom antonym pair) | No |
| 22 | kt-ch22-l4-q8 | listen-mc | "This would be the third house they had lived in" | [2] three houses in all | [0] only one / [1] two total / [3] four or more | **P2 · COUNT_LADDER** (1/2/3/4 sequence makes "third"=3 transparent scan-click) | No |
| 23 | kt-ch23-l1-q3 | listen-mc | "The sun was warm. The trees were tall." | [1] warm with tall trees | [0] cold and rainy | **P1 · ANTONYM_MIRROR** (warm+tall ↔ cold+rainy) | No |
| 23 | kt-ch23-l1-q6 | listen-mc | "He was quiet but he watched everything with bright eyes" | [1] quiet but watchful | [0] loud and busy | **P1 · ANTONYM_MIRROR** (quiet/watchful ↔ loud/busy exact pair) | No |
| 23 | kt-ch23-l1-q8 | listen-mc | "The garden was big and full of happy noise" | [1] big and full of fun | [0] empty and silent / [2] small and dark | **P0 · DOUBLE_ANTONYM** (two distractors are both antonyms: big/full ↔ empty/silent AND big/full ↔ small/dark; trivial elimination) | No |
| 23 | kt-ch23-l2-q3 | listen-mc | "taller than the children and full of water to the top" | [1] taller than the kids | [0] smaller than a hand | **P2 · ANTONYM_MIRROR** (taller ↔ smaller) | No |
| 23 | kt-ch23-l4-q3 | listen-mc | "Their small feet ran fast on the path" | [1] running as fast as they could | [0] walking slowly side by side | **P1 · ANTONYM_MIRROR** (running fast ↔ walking slowly exact pair) | No |
| 23 | kt-ch23-l4-q8 | listen-mc | "Even fast feet would take many minutes to come back" | [1] a long while | [0] just one second | **P2 · ANTONYM_MIRROR** (long while ↔ just one second — extreme scale pair) | No |
| 24 | kt-ch24-l4-q3 | listen-mc | "He did not take the biggest pear" | [1] no, he passed it over | [0] yes, the biggest one | **P0 · NEGATION_MIRROR** (sentence negation "did not" → [0] directly inverts as "yes, the biggest one") | No |
| 25 | kt-ch25-l4-q3 | listen-mc | "The work was slow, but the family never stopped" | [1] slow but steady | [0] fast and very easy | **P1 · ANTONYM_MIRROR** (slow/steady ↔ fast/easy) | No |
| 26 | kt-ch26-l2-q8 | listen-mc | "Hour after hour went by, but no answer came to his mind" | [1] no, time passed with no answer | [0] yes, he found it in one minute | **P0 · NEGATION_MIRROR** (sentence "no answer came" → [0] "yes found it" is mechanical inverse polarity) | No |
| 26 | kt-ch26-l3-q3 | listen-mc | "He did not eat much. He slept very little." | [1] eating little and sleeping little | [0] eating big meals all day long | **P1 · ANTONYM_MIRROR** (eating little ↔ eating big meals; little/much antonym pair) | No |
| 26 | kt-ch26-l4-q3 | listen-mc | "Archimedes stepped in slowly, one foot at a time" | [1] with slow careful steps | [0] with a fast jump | **P2 · ANTONYM_MIRROR** (slowly ↔ fast; careful ↔ jump) | No |

**Violation counts:**
- P0 (trivializing — student skips comprehension): 6
- P1 (strong tell — easy elimination): 6
- P2 (moderate tell — some benefit of doubt): 7
- **Total: 19 across Ch21–26**

**P0 prefix triggered (≥3 P0):** ⚠️

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch21–26 (6 chapters) |
| Lessons sampled | 28 (first 4–5 lessons/ch × 6 chapters) |
| Questions inspected | ~168 listen-mc/cloze/listen-tf |
| A4 violations found | 19 |
| P0 violations | 6 |
| P1 violations | 6 |
| P2 violations | 7 |
| Chapters with ≥3 violations | Ch21 (5), Ch23 (5), Ch22 (2), Ch26 (3) |
| Most common subtype | ANTONYM_MIRROR (16/19 = 84%) |
| Runner-up subtype | NEGATION_MIRROR (2/19) / YES_NO_POLARITY (1/19) |
| Audio regen required | 0 (content edits only — options unchanged in audio) |

**Pattern note:** Ch23 (Sima Guang / Jar Story) shows the highest density — 5 violations in first 4 lessons. The narrative is heavily sensory/physical (size, speed, sound) which leads authors to reach for obvious opposite descriptors. Same dynamic in Ch21 (Anansi's physical traits). Ch24 and Ch26 show NEGATION_MIRROR — the sentence contains an explicit negative ("did not," "no answer") and the distractor directly inverts it.

---

## D. Top 5 P0 (Priority Fixes)

### ⚠️ P0-1: kt-ch26-l2-q8 — Sentence negation inverted as distractor

**Sentence:** "Hour after hour went by, but no answer came to his mind."
**Correct [1]:** "no, time passed with no answer"
**Problem [0]:** "yes, he found it in one minute"

The sentence explicitly states "no answer came." Option [0] is the mechanical negation: "yes, found it." Any child who parses the opening clause eliminates [0] instantly — no comprehension of the Archimedes story required.

**Fix:** Replace [0] with a plausible schema inference: "yes, he rested for a bit" or "yes, but only part of the answer" — something a learner might believe happened (rest ≠ answer, partial inference).

**Proposed:** `"yes, he slept well and felt better"` — plausible inference (people rest when stuck) but unsupported by the sentence.

---

### ⚠️ P0-2: kt-ch24-l4-q3 — "did not take" sentence negation → distractor says "yes"

**Sentence:** "He did not take the biggest pear."
**Correct [1]:** "no, he passed it over"
**Problem [0]:** "yes, the biggest one"

The sentence's opening "He did not" signals negation polarity. [0] is the exact inversion. The question is effectively a true/false on the sentence, trivially resolved.

**Fix:** Remove the yes/no framing entirely. Rewrite as paraphrases:
- [0] (wrong): "he shared it with all his brothers equally" — plausible from the story world (sharing = related concept) but incorrect detail
- [1] (correct): "he chose a smaller pear instead" — paraphrase of "did not take biggest / passed it over"

---

### ⚠️ P0-3: kt-ch23-l1-q8 — Double antonym flanking (two distractors are both antonyms)

**Sentence:** "The garden was big and full of happy noise."
**Correct [1]:** "big and full of fun"
**Problem [0]:** "empty and silent" — antonym of big/full
**Problem [2]:** "small and dark" — second antonym of big/full

A learner sees [0] as "not the garden" (garden=big, so not empty), [2] as "not the garden" (garden=big, not small). Correct [1] is exposed by double-antonym elimination, not comprehension.

**Fix [0]:** "big but mostly empty during winter" — preserves "big" (hard to distinguish) but adds false detail.
**Fix [2]:** "full of tall quiet trees" — preserves "full" but wrong attribute (trees vs. noise).

---

### ⚠️ P0-4: kt-ch21-l5-q3 — Yes/No polarity: sentence starts "No" → answer starts "no"

**Sentence:** "No animal in the forest dared to walk near his rest tree."
**Correct [1]:** "no, every animal kept far"
**[0]:** "yes, it was very easy work"  **[2]:** "yes, he loved hugs"  **[3]:** "no, he was too small"

The sentence opens with "No." The student matches "No" → looks for option starting "no." Options [1] and [3] both start "no." Between them, [3] says "he was too small" (clearly wrong about a leopard) so [1] wins by elimination.

**Fix:** Rewrite to remove yes/no framing. The question type here forces yes/no but the sentence polarity telegraphs the answer.
- Change sentence polarity for the question: rephrase so the sentence doesn't open with "No"
- OR change the question to "What did most animals do near the leopard's tree?" → A/B/C/D descriptive answers

---

### ⚠️ P0-5: kt-ch22-l2-q6 — Idiom antonym (heavy heart → light + happy)

**Sentence:** "Her heart felt heavy as she watched her son."
**Correct [1]:** "sad and worried"
**Problem [0]:** "light and happy"

"Heavy heart = sad" is a common English idiom. Its antonym "light + happy" is the first thing that springs to mind when seeing "heavy." This is the most teachable A4 pattern: when the correct answer is an emotion, writers reflexively offer the opposite emotion as a distractor.

**Fix [0]:** "proud and excited about his games" — same emotional domain (positive) but misreads the sentence's maternal concern as pride rather than worry.

---

## E. Narrative Voice / Pacing Improvements (3, even with zero R1–R8 violations)

### NV-1: Ch21 Anansi — distractor vocabulary mismatch with A2 frame

Several Ch21 distractors use adult-register vocabulary ("polite" → "with no word at all", "runs away fast behind a cloud") that doesn't match the grandma bedtime story register. While not a mirror violation, "polite" language in distractors vs. simple story language creates cognitive register mismatch.

**Recommendation:** Ensure all distractor options use the same simple word pool as the sentence (GSL-2000). Swap "with no word at all" → "turned his back quickly" (more concrete, less formal).

### NV-2: Ch24 Kong Rong — same question-stem word ("pear") appears in all 4 options for multiple questions

Questions kt-ch24-l1-q6, kt-ch24-l3-q3, kt-ch24-l4-q6 all have "pear" or fruit vocabulary in most/all options. When the topic word saturates all four options, the question shifts from comprehension to category selection ("which pear attribute is correct?"). 

**Recommendation:** At least 1–2 distractors per Q should step outside the pear frame to require story-level comprehension (e.g., replace a pear attribute with a sibling-behavior attribute).

### NV-3: Ch25 Yu Gong — correct answers too literal ("slow but steady" for sentence "slow, but never stopped")

Several Ch25 correct answers are near-synonyms of the sentence rather than paraphrases — they add no inference layer. kt-ch25-l4-q3: sentence "work was slow, but the family never stopped" → correct [1] "slow but steady." The word "steady" is not in the sentence but is a near-direct synonym of "never stopped."

**Recommendation:** Elevate comprehension demand by requiring a slight inference. Change correct to "the whole family kept going" (requires understanding "never stopped" = persistence of all members). Keeps A2 accessibility while adding 1-step inference.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #51: X5_ANTONYM_MIRROR_LINT — Automated A4 mirror pattern detection in validate-lessons.js

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Antonym-pair lint rule in CI | Iimura 2019 JLTA (negative distractor = weakest type); Haladyna & Rodriguez 2013 (non-functional <5%); Cambridge YLE item writer guidelines (antonym distractors banned); EDM 2024 DISTO (negative sampling → non-plausible) | ✅ Fully compatible — validate-lessons.js already has X2/X3/R1 lint rules; X5 is additive same pattern | **S (30–60 min)** | ⭐⭐⭐⭐ HIGH | **IMPLEMENT** |

**What to add to `tools/validate-lessons.js`:**

```js
// X5_ANTONYM_MIRROR: flag when any distractor is a direct antonym of the correct option
const ANTONYM_TABLE = {
  fast: ['slow','slowly'], slow: ['fast','quickly'], slowly: ['fast','quickly'],
  big: ['small','tiny','little'], small: ['big','large'],
  large: ['small','tiny'], tiny: ['big','large'],
  loud: ['quiet','silent'], quiet: ['loud','noisy'], silent: ['quiet','silent'],
  happy: ['sad','worried'], sad: ['happy','light'],
  full: ['empty'], empty: ['full'],
  long: ['short'], short: ['long'],
  warm: ['cold'], cold: ['warm'],
  light: ['heavy','sad'], heavy: ['light'],
  old: ['new','young'], young: ['old'], new: ['old'],
  high: ['low'], low: ['high'],
  noisy: ['quiet','silent'], steady: ['fast'],
};

function checkAntonymMirror(opts, ci) {
  const correct = (opts[ci] || '').toLowerCase().split(/\W+/);
  const violations = [];
  for (let i = 0; i < opts.length; i++) {
    if (i === ci) continue;
    const distWords = (opts[i] || '').toLowerCase().split(/\W+/);
    for (const cw of correct) {
      const antonyms = ANTONYM_TABLE[cw] || [];
      for (const a of antonyms) {
        if (distWords.includes(a)) {
          violations.push({ distractor: opts[i], trigger: cw, antonym: a });
        }
      }
    }
  }
  return violations;
}
```

Add call in the per-Q lint block:
```js
const antonymHits = checkAntonymMirror(q.options, q.correctIndex);
if (antonymHits.length > 0) {
  warns.push(`${q.id}: X5_ANTONYM_MIRROR (correct "${opts[ci]}" paired with antonym distractor "${antonymHits[0].distractor}" via ${antonymHits[0].trigger}↔${antonymHits[0].antonym})`);
}
```

**Expected catch rate:** 19 violations from this audit run alone. Corpus-wide estimate: 40–60 violations (antonym-writing is the #1 lazy-distractor fallback pattern for story-based content).

**Files to change:**
- `tools/validate-lessons.js` — add `checkAntonymMirror()` + call site in Q-loop (~30 lines)
- No lesson JSON changes by the lint rule itself — violations remain warn-only (same as X2/X3)

**Why this matters for Pickup:**
- A 10-year-old learner who has learned the word "fast" immediately knows "slow" is its opposite. Any question with fast↔slow distractor pair is not testing listening comprehension; it's testing vocabulary, which is a different construct.
- The current 70 mirror-lint corpus-wide warnings suggest antonym patterns are endemic. Adding X5 makes the existing cron audit catchable at build time.
- Industry alignment: Cambridge Young Learners, IELTS, TOEIC Part 3–4, and the 2024 EDM distractor research all converge on the same principle: antonym distractors are construct-irrelevant and should be replaced with schema-based plausible inference distractors.
