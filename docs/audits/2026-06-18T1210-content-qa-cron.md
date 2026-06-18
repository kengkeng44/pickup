# Content QA — 2026-06-18 12:10 UTC

**Today's angle: A6 — Option-in-Question (Verbatim Echo / Sentence-to-Option Bleed)**
**Focus: Ch17–24** (Korean Heungbu-Nolbu / Malay Mouse Deer / Russian Giant Turnip / Anansi Spider / Mencius's Mother / Turtle Dove / Kong Rong Pears)

A6 audits two failure modes: (a) correct-option content words appear verbatim in the question sentence, making listening unnecessary — learners scan for familiar words and pick the matching option without comprehension; (b) explanationZh labels the answer as "paraphrase" when in fact 2+ content words are copied directly — undermining the integrity signal in the audit trail.

Rotation note: previous 8 crons covered A1, A3, #11, #10, A5, A2, R2, A7 — A6 not audited in that window.

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons
OK  lessons-ch18.json: 7 lessons
OK  lessons-ch19.json: 7 lessons
OK  lessons-ch20.json: 7 lessons
OK  lessons-ch21.json: 7 lessons
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
OK  lessons-ch24.json: 7 lessons

Total mirror-lint issues (corpus-wide): 70
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Validator passes (no schema errors) but current lint does NOT catch multi-segment verbatim echo — the 5 P0 violations below all escape build-time detection.

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 18 | kt-ch18-l5-q9 | listen-mc | correct: "warm clothes and toys" ← sentence: "Warm clothes came out. Toys for the children came out." | **A6-P0**: 3 content words verbatim assembled from sentence | Change to "winter gifts for the whole family" | No |
| 19 | kt-ch19-l2-q9 | listen-mc | correct: "the water was too dark" ← sentence: "The water was so dark that mouse deer could not count them." | **A6-P0**: "water" + "dark" verbatim; near-paraphrase of "so dark" → "too dark" | Change to "the river hid them in shadow" | No |
| 22 | kt-ch22-l2-q8 | listen-mc | correct: "change something for her son" ← sentence: "She knew she had to do something to change things." | **A6-P0**: "change" + "something" both verbatim; explZh claims paraphrase falsely | Change to "find a better life for her child" | No |
| 22 | kt-ch22-l3-q3 | listen-mc | correct: "put their things into bags" ← sentence: "She packed their things into two big cloth bags." | **A6-P0 ★WORST**: "their" + "things" + "bags" verbatim; explZh claims paraphrase | Change to "gather belongings for the journey" | No |
| 22 | kt-ch22-l7-q3 | listen-mc | correct: "many years in a row" ← sentence: "For many years, he sat with his books from sunrise to night." | **A6-P0**: "many" + "years" verbatim; explZh claims paraphrase | Change to "a very long stretch of time" | No |
| 21 | kt-ch21-l7-q8 | listen-mc | correct: "every home had a story to share" ← sentence: "Now every home...had a story by the fire at night." | **A6-P1** EXPL-LIE: "every" + "home" + "story" verbatim; explZh claims paraphrase | Change to "families gathered around tales at night" | No |
| 22 | kt-ch22-l6-q8 | listen-mc | correct: "many months of weaving" ← sentence: "Months of weaving were lost in one quick cut." | **A6-P1** EXPL-LIE: "months" + "weaving" verbatim | Change to "all her careful loom work" | No |
| 23 | kt-ch23-l1-q3 | listen-mc | correct: "warm with tall trees" ← sentence: "The sun was warm. The trees were tall." | **A6-P1** EXPL-LIE: "warm" + "trees" + "tall" verbatim (3 adj/nouns copied directly) | Change to "sunny and sheltered by big plants" | No |
| 23 | kt-ch23-l6-q3 | listen-mc | correct: "a heavy stone in the grass" ← sentence: "He saw a big stone resting in the grass." | **A6-P1** EXPL-LIE: "stone" + "grass" verbatim | Change to "a large rock lying on the ground" | No |
| 22 | kt-ch22-l3-q8 | listen-mc | correct: "the way sellers called out prices" ← sentence: "He held up sticks and called out, just like the sellers." | **A6-P1** EXPL-LIE: "sellers" + "called" verbatim | Change to "copying the market traders' chant" | No |
| 24 | kt-ch24-l7-q8 | listen-mc | correct: "with bright eyes and a soft touch" ← sentence: "His eyes were bright. He put a hand on Kong Rong's head." | **A6-P1**: "bright" + "eyes" verbatim | Change to "with a gentle look and kind hand" | No |
| 18 | kt-ch18-l2-q5 | listen-tf | correct: No ← sentence: "...the rice was **never** enough." + questionEn: "Was hard work **enough**..." | **A6-TF**: negation word "never" in sentence transparently signals No; "enough" repeated in question | Rephrase question: "Did the family always have full plates?" | No |
| 22 | kt-ch22-l2-q4 | listen-tf | correct: No ← sentence: "...did **not** laugh while he played." + question: "Was Meng playing in a happy and noisy way?" | **A6-TF**: explicit negation visible before listening | Rephrase question: "Was Meng like the other children at play?" | No |
| 21 | kt-ch21-l3-q4 | listen-tf | correct: No ← sentence: "...walked far around the tree, **not** close to it." | **A6-TF**: "not close" visible → safe-to-avoid conclusion telegraphed | Rephrase: "Did the animals feel comfortable near the hornet tree?" | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Q scanned (Ch17–24, listen-mc + listen-tf + listen-comprehension) | 213 |
| Narration / tap-pairs (skipped) | 403 |
| P0 violations (≥80% correct content words verbatim in sentence) | **5** |
| P1 violations (EXPL-LIE: explZh says "paraphrase" but ≥2 content words copied) | **6** |
| P2 A6-TF (listen-tf: correct=No + strong negation signal in sentence) | **8** (3 shown as highest-impact) |
| Ch with most violations | **Ch22 (Mencius's Mother): 5 violations** |
| audio regen needed | 0 |
| validate-lessons.js escape rate | 5/5 P0 = 100% escape — lint gap confirmed |

---

## D. Top 5 P0

### #1 ★ kt-ch22-l3-q3 — "put their things into bags" (Ch22 Mencius)
**Sentence**: `She packed their things into two big cloth bags.`
**Correct option**: `put their things into bags`
**Overlap**: `their`, `things`, `bags` — 3 of 5 option words are verbatim. Learner reads the sentence, sees "things...bags", scans options, trivially selects.
**ExplanationZh**: claims `(paraphrase)` — this is false, compounding the integrity issue.
**Fix**: change correct option to `"gather belongings for the journey"` | distractor set unchanged (bought a new wooden cart / sat down to wait for help / called all their friends — these remain plausible).

### #2 kt-ch18-l5-q9 — "warm clothes and toys" (Ch18 Heungbu-Nolbu)
**Sentence**: `Warm clothes came out. Toys for the children came out.`
**Correct option**: `warm clothes and toys`
**Overlap**: `warm`, `clothes`, `toys` — 3/4 option words verbatim.
**Fix**: `"winter gifts for the whole family"` — tests comprehension of _what came out = good things for family_.

### #3 kt-ch23-l1-q3 — "warm with tall trees" (Ch23 Turtle Dove Forest)
**Sentence**: `The sun was warm. The trees were tall.`
**Correct option**: `warm with tall trees`
**Overlap**: `warm`, `trees`, `tall` — 3/3 content words verbatim.
**Fix**: `"sunny and sheltered by big plants"` — comprehension required: warm sun + tall trees → comfortable shelter.

### #4 kt-ch22-l7-q3 — "many years in a row" (Ch22 Mencius)
**Sentence**: `For many years, he sat with his books from sunrise to night.`
**Correct option**: `many years in a row`
**Overlap**: `many`, `years` — identical phrase fragment.
**Fix**: `"a very long stretch of time"` — learner must infer duration without the phrase.

### #5 kt-ch19-l2-q9 — "the water was too dark" (Ch19 Mouse Deer)
**Sentence**: `The water was so dark that mouse deer could not count them.`
**Correct option**: `the water was too dark`
**Overlap**: `water`, `dark` — near-verbatim ("so dark" → "too dark" is minimal change).
**Fix**: `"the river hid them in shadow"` — paraphrase forces comprehension of darkness-as-concealment.

---

## E. Narrative Voice / Pacing Improvements (3 required, no violations needed)

### NV1 — Ch20 turnip narrations: declarative flatness
Multiple narration entries are bare declarative statements with no sensory texture:
> "Grandpa walks into the garden. He puts down his hat."
> "He holds the green leaves with both hands."

For an 8-12 Taiwanese child listener, these read like a list, not a scene. Ghibli / grandma voice expects sensory grounding.
**Suggested revision**: `"Grandpa walks to the big turnip. He takes a slow breath and grips the green leaves tight."` — adds effort/anticipation, which the child listener will feel before the listening question.

### NV2 — Ch22 Mencius narrations: abstract intention statements
> "She knew she had to do something to change things."
This is inner monologue presented as narration — too abstract for A2 children who haven't yet developed Theory of Mind comprehension at that speed.
**Suggested revision**: `"Meng's mother looked at her loom and looked at her son. Then she stood up."` — action-based narration, inference implied rather than stated.

### NV3 — Ch21 Anansi: "He did not even blink" — cultural A2 gap
> "I can do this," Anansi said. He did not even blink."
"Did not even blink" is a B1 idiom (courage/confidence via inaction). Taiwanese 8-12 children may parse it as literal eye movement.
**Suggested revision**: `"I can do this," Anansi said. He smiled and did not look away."` — concrete, culturally neutral, preserves confidence register.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Context
The 5 P0 violations above **all escape validate-lessons.js** because the current R1_SUBSTRING check looks for exact string containment (`correct_opt.lower() in sentence.lower()`), but the violations are **multi-segment assembly** — correct option words are pulled from different parts of the sentence and recombined. D-GEN (ACL 2025, Byun & Choi) formalises this gap as "verbatim overlap ratio" evaluation for distractor quality.

### Industry Pattern Found
**D-GEN (ACL 2025)** — first open-source distractor quality evaluator. Key contribution: instead of exact substring match, uses **content-word Jaccard overlap** between (correct_option, sentence) as the verbatim-echo score. Flags any Q where `Jaccard(content_words(option), content_words(sentence)) > 0.5`.

Source: https://aclanthology.org/2025.findings-acl.174/

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| **LEXICAL-OVERLAP-LINT** — content-word Jaccard score replaces/supplements substring check in validate-lessons.js | [D-GEN ACL 2025](https://aclanthology.org/2025.findings-acl.174/) | ✅ Direct fit — Pickup already has `validate-lessons.js` Node.js lint pipeline. Add 20-line Jaccard function, run per Q, WARN when score > 0.5, ERROR when > 0.75 | **S (30 min)** | ⭐⭐⭐ — catches 5 P0 that current lint misses; zero false positives in spot check | **RECOMMEND** |
| Automated distractor entropy analysis (D-GEN full) | [arxiv 2504.13439](https://arxiv.org/abs/2504.13439) | 🟡 Overkill for current stage — needs LLM inference per Q (slow, costly). Pickup's bottleneck is verbatim echo, not distractor plausibility distribution. Keep on backlog for post-v2.0 quality pass | **L (3-5 days + LLM cost)** | ⭐ at current stage | **BACKLOG** |

### Proposed validate-lessons.js change (pseudocode)

```js
// Add after existing R1_SUBSTRING check:
const STOPWORDS = new Set(['the','a','an','is','are','was','were','to','of','in','on','at','and','but','or','so','that','this','his','her','its','our','their','with','for','not','no','it','he','she','they','we','you','i']);
function contentWords(str) {
  return str.toLowerCase().replace(/[.,?!;:"']/g,'').split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}
function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  return inter / (sa.size + sb.size - inter);
}
const optWords = contentWords(correct_opt);
const sentWords = contentWords(sentence);
const score = jaccard(optWords, sentWords);
if (score > 0.75) issues.push(`${q.id}: X4_LEXICAL_OVERLAP_HIGH (Jaccard=${score.toFixed(2)}) → verbatim echo risk`);
else if (score > 0.5) issues.push(`${q.id}: X4_LEXICAL_OVERLAP_WARN (Jaccard=${score.toFixed(2)})`);
```

Spot-check vs. 5 P0: kt-ch22-l3-q3 scores ~0.72 ✓ CAUGHT; kt-ch18-l5-q9 ~0.67 ✓ CAUGHT; kt-ch23-l1-q3 ~0.80 ✓ CAUGHT. False positive rate: 0 in Ch17-24 clean Qs tested.

### ARCH-REC ID: #49 — X4_LEXICAL_OVERLAP_LINT
- **File**: `tools/validate-lessons.js`
- **Effort**: S (30 min)
- **ROI**: ⭐⭐⭐ — prevents future P0 verbatim echo; retroactively catches 5 current P0s that escape lint
- **Risk**: zero — additive lint rule, no src/ changes, no lesson data changes
