# Content QA — 2026-06-13 12:12 UTC

Today's angle: **A4 — Mirror Patterns (Negation / Identity / Parallel Flood / Structural Outlier)**
Focus: **All chapters · Systematic structural give-away detection**

> A4 rotation history: First dedicated A4 pass.
> Scope: all 31 lesson files. Four sub-patterns: (1) negation mirror between options, (2) near-identity option pairs (1-word diff), (3) parallel-flood (all 4 options same grammatical structure), (4) structural-outlier correct (correct answer has different syntactic prefix from all 3 distractors).

---

## A. validate-lessons.js result

```
69 mirror-lint warnings across 31 files (warn-only, existing X2_OPTION_LIST_BIAS lint)
No schema errors. All lesson files parse cleanly.

New A4-specific issues found via manual detection script (not currently linted):
  PARALLEL_FLOOD all-4-identical-structure: 2 true violations (ch17, ch3)
  STRUCTURAL_OUTLIER_CORRECT (all-3-distractors same prefix, correct differs): 3 violations (ch19, ch22, ch23)
  NEGATION_PAIR between options: 1 violation (ch21-l6-q6)
  NEAR_IDENTITY_PAIR (1-word-diff, semantically confusing): 4 violations

CI lints ZERO of the above — no A4_STRUCTURAL_OUTLIER rule exists yet.
```

---

## B. Violation table

| Ch | Q ID | Type | Sentence (excerpt) | Options | Violation | 修法 | audio regen? |
|----|------|------|--------------------|---------|-----------|------|-------------|
| 17 | kt-ch17-l5-q3 | listen-mc | `Each cloth shone brighter than the one before.` | `darker each time \| brighter each time \| smaller each time \| rougher each time` | **P0 A4_PARALLEL_FLOOD + R1_VERBATIM**: All 4 options are "ADJECTIVE each time" — identical structure, only adjective differs. "brighter" verbatim in sentence. Zero comprehension demand; learner only needs to spot same adjective | Replace 2 distractors with structurally different options: e.g. "the first cloth was the best" / "they were all the same" — break the "X each time" flood | No |
| 19 | kt-ch19-l3-q5 | listen-mc | `His small eyes turned bright. His tail started to move quick.` | `he was sleepy \| he had an idea \| he was sad \| he was hot` | **P1 A4_STRUCTURAL_OUTLIER**: Correct "he had an idea" has different syntactic structure (SV + NP) from all 3 distractors ("he was ADJ"). Test-taker eliminates by form-matching, not comprehension | Restructure distractors to remove "he was X" uniformity. E.g. "he felt very cold" → "he wanted to run away" / "he had lost the track" — keep inference demand intact | No |
| 22 | kt-ch22-l5-q6 | listen-mc | `The teacher's words were calm and full of care.` | `how to win in fights \| how to count coins fast \| how to catch fish \| good ways to live and act` | **P1 A4_STRUCTURAL_OUTLIER**: Correct "good ways to live and act" breaks the "how to VERB" pattern of all 3 distractors. Structural outlier gives away the answer | Rewrite correct to align structurally: "what good people do each day" or make distractors one noun-phrase: "fish and rice only" / "coins and gold" — consistent sentence form | No |
| 23 | kt-ch23-l4-q6 | listen-mc | `Every second, the water held him tighter.` | `he was getting out by himself \| he was learning to swim \| he was making bubbles for fun \| time was running out for him` | **P1 A4_STRUCTURAL_OUTLIER**: Correct "time was running out for him" breaks the "he was VERB-ing" pattern of all 3 distractors. SVO vs. "he was X-ing" mismatch signals the answer | Rewrite correct to consistent structure: "he was running out of time" — then all 4 options match "he was X" frame while still testing comprehension | No |
| 21 | kt-ch21-l6-q6 | listen-mc | `He could not see any rope on his back or any cut on his skin.` | `the animals were hurt \| no animal had been hurt \| they were all asleep \| they were all sick` | **P1 A4_NEGATION_PAIR**: Options 0 and 1 form a direct negation mirror ("animals were hurt" / "no animal had been hurt"). Learner eliminates option 0 immediately, reducing to 3-choice. Also options 2+3 near-identity ("they were all X") | Replace option 0 with a non-negation distractor: e.g. "the animals were still hungry" or "the rope had broken already" — keeps semantic difficulty without binary flip | No |
| 21 | kt-ch21-l6-q8 | listen-mc | `He meant Anansi had used his clever ideas, not his strong arms.` | `Anansi had a big hat \| Anansi was very clever \| Anansi was very tall \| Anansi was very loud` | **P2 A4_3WAY_PARALLEL**: 3/4 options share "Anansi was very X" → reduces to 3-choice after eliminating absurd "big hat" distractor | Replace "Anansi had a big hat" with a plausible structural match: "Anansi was very lucky" or "Anansi had many friends" — make it 4 genuine choices | No |
| 3 | kt-ch3-l3-q9 | listen-mc | `His head dropped down onto his paws, soft and heavy.` | `he was waking up \| he was falling asleep \| he was running again \| he was eating lunch` | **P2 A4_PARALLEL_FLOOD**: All 4 options "he was VERB-ing" — identical structure. Semantically diverse enough (waking / sleeping / running / eating) but a structural flood. Medium concern for advanced test-takers | Accept for A2 children (semantic diversity strong enough) but note for future revision: can replace one option with a noun-phrase option to break parallelism | No |
| 6 | kt-ch6-l3-q6 | listen-mc | `They lifted into the pale light of the night and were soon gone.` | `the sunny sky \| the moonlit sky \| a dark cave \| the deep sea` | **P2 A4_NEAR_IDENTITY_PAIR**: "the sunny sky" vs "the moonlit sky" differ only in adjective; reduces to 1-adjective vocabulary test at this slot | Replace "the sunny sky" with a different environment: "a bright window" or "a warm room" — removes the adjective-comparison trap | No |
| 2 | kt-ch2-l4-q8 | listen-mc | `The warm sun made his grey feathers feel almost soft.` | `really scared \| tired and sleepy \| a little better \| a little angry` | **P2 A4_NEAR_IDENTITY_PAIR**: "a little better" vs "a little angry" share "a little X" structure; 2 of 4 options leak same frame | Replace "a little angry" with different structure: "ready to leave" or "less alone" — removes the "a little X" duplicate | No |
| 28 | kt-ch28-l7-q6 | listen-mc | `"You came to my door three times. You did not give up."` | `that he was loud \| that he did not give up \| that he was young \| that he had a fast horse` | **P2 A4_NEAR_IDENTITY + LENGTH_TELL**: Options 0/2 are "that he was X" near-pair; correct is longest option (length-tell R2 risk). Distractors 0+2 too similar | Replace "that he was young" with different structure: "that his sword was sharp" — break the "that he was X" repeat; also shorten correct if possible | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Chapters scanned | 31 (all) |
| Lessons scanned | ~217 |
| Questions scanned | ~1,500+ |
| P0 (critical) | 1 |
| P1 (high) | 4 |
| P2 (medium) | 5 |
| Total A4 violations | **10** |
| CI-linted (currently) | 0 of 10 |
| Most common pattern | STRUCTURAL_OUTLIER_CORRECT (3 instances) |

---

## D. Top 5 P0/P1 Prioritized

1. **⚠️ P0 — kt-ch17-l5-q3** (`lessons-ch17.json`) — PARALLEL_FLOOD + R1 verbatim "brighter" in sentence. All 4 options are "ADJECTIVE each time". No comprehension required — learner just copies adjective. Worst A4 case in entire corpus.

2. **P1 — kt-ch19-l3-q5** (`lessons-ch19.json`) — STRUCTURAL_OUTLIER: correct "he had an idea" (SV+NP) vs 3 distractors all "he was ADJ". Test-taker eliminates by structure, not meaning. Invalidates the inference question.

3. **P1 — kt-ch22-l5-q6** (`lessons-ch22.json`) — STRUCTURAL_OUTLIER: correct "good ways to live and act" (NP) vs 3 distractors all "how to VERB". Form gives away the answer before reading for content.

4. **P1 — kt-ch23-l4-q6** (`lessons-ch23.json`) — STRUCTURAL_OUTLIER: correct "time was running out for him" (SVO passive) vs 3 distractors "he was VERB-ing". Simple fix: rewrite correct to "he was running out of time".

5. **P1 — kt-ch21-l6-q6** (`lessons-ch21.json`) — NEGATION_PAIR: options "the animals were hurt" / "no animal had been hurt" form a true/false binary, inflating guessing probability and leaking the correct option's polarity.

---

## E. Narrative Voice / Pacing Improvements (advisory, 3 proposals)

Even if no R1-R8 violation, these three items can improve story engagement:

1. **kt-ch17-l5-q3 explanationZh** currently reads `推理: brighter than before → 一次比一次亮。` — After fixing the parallel flood, the explanation should reinforce the inference path from `shone brighter than the one before` → `brighter each time`, using Mochi/Hana story voice: `「每塊布都比上一塊亮」→ 一次比一次亮，就像奶奶說故事一樣，越來越有趣。`

2. **kt-ch23-l4-q6** sentence `Every second, the water held him tighter.` is evocative but the correct option `time was running out for him` is abstract for A2 children. After fixing to "he was running out of time", add `explanationZh`: `水越來越緊 → 時間快要到了，比較具體。`

3. **kt-ch3-l3-q9** explanation `頭垂在腳上 + 重 → 在睡著。` — Story voice improvement: `頭垂下來、軟綿綿的重 — 奶奶說這叫做「要睡著了」。` — Anchors the explanation to the grandma storytelling frame.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #29: `A4_STRUCTURAL_OUTLIER_CORRECT` lint rule in validate-lessons.js**

**Source research**: Buck (2001) *Assessing Listening* + 5Ps Typology of Distractors (ResearchGate 2023) + recent ArXiv distractor-generation paper (2025). All confirm: if correct answer has different surface structure (grammatical prefix) from all 3 distractors, test-takers can eliminate wrong answers by form-matching rather than comprehension — fundamentally undermining item validity.

**Pickup-specific finding**: 3 questions found (ch19/ch22/ch23) where correct option breaks the "he was X" or "how to VERB" pattern that all distractors share. CI currently catches 0 of these.

**Proposed lint rule** (add to `tools/validate-lessons.js`):

```js
// A4_STRUCTURAL_OUTLIER: correct option has different 2-word prefix from ALL 3 distractors
function checkStructuralOutlier(q) {
  const opts = q.options;
  if (!opts || opts.length !== 4) return null;
  const prefix2 = (s) => s.toLowerCase().trim().split(/\s+/).slice(0,2).join(' ');
  const correctPfx = prefix2(opts[q.correctIndex]);
  const distractorPfxs = opts.filter((_, i) => i !== q.correctIndex).map(prefix2);
  const uniqueDistPfxs = new Set(distractorPfxs);
  if (uniqueDistPfxs.size === 1 && !uniqueDistPfxs.has(correctPfx)) {
    return `A4_STRUCTURAL_OUTLIER (correct "${opts[q.correctIndex]}" has different prefix "${correctPfx}" from all distractors: "${distractorPfxs[0]}")`;
  }
  return null;
}
```

**Also add** `A4_PARALLEL_FLOOD` rule for when all 4 options share same 2-word prefix (ch17 case):

```js
function checkParallelFlood(q) {
  const opts = q.options;
  if (!opts || opts.length !== 4) return null;
  const suffix1 = (s) => s.toLowerCase().trim().split(/\s+/).slice(-1)[0];
  const prefix2 = (s) => s.toLowerCase().trim().split(/\s+/).slice(0,2).join(' ');
  const allSameLen = new Set(opts.map(o => o.split(/\s+/).length)).size === 1;
  const allSamePfx = new Set(opts.map(prefix2)).size === 1;
  if (allSameLen && allSamePfx && opts[0].split(/\s+/).length >= 2) {
    return `A4_PARALLEL_FLOOD (all 4 options share prefix "${prefix2(opts[0])}" — only terminal word differs)`;
  }
  return null;
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| A4_STRUCTURAL_OUTLIER_CORRECT lint | Buck 2001 / ArXiv 2025 distractor gen | ✅ 直接對應 3 個已發現違規; validate-lessons.js 加 ~15 行 | S (30 min) | ⭐⭐⭐ HIGH | **Implement** |
| A4_PARALLEL_FLOOD lint | 5Ps Typology 2023 + ETS item spec | ✅ 發現 ch17 P0; suffix-compare ~10 行 | S (20 min) | ⭐⭐ MED | **Implement** |
| AI-driven distractor generation (structural diversity check) | ArXiv 2025 MCQ generation | 🟡 適合 B1 expansion; 現階段手工夠用 | L (days) | ⭐ LOW now | Defer to v2.1 |
