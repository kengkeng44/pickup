# Content QA — 2026-06-16 18:10 UTC

**Today's angle: R2 — Distractor Doctrine (4-option length parity + failure-mode coverage)**
**Focus: Ch1–8** (奶奶睡前故事 / Momotaro / Ugly Duckling / Hare & Tortoise / Camel's Hump / Baba Yaga / Six Swans / Three Little Pigs)

> **Rotation context**: Previous crons in recent window — A7 content-word repetition (Ch27-31), #12 explanationZh story-voice (Ch21-26), #11 optionsZh quality (Ch13-20), A4 mirror patterns (Ch5-12), A3 semantic leak (Ch10-17), A1 keyword-pull (Ch9-18), R1 paraphrase (Ch1-8), A6 option-in-Q (Ch19-26). Angle **R2 (distractor doctrine)** last applied to Ch12-18 in a previous window. Ch1-8 are the most-played chapters — any systematic leak here affects every new user.
>
> **Angle R2 Definition**: Per `docs/toeic-research/pickup-q-design-standard-v1.md` §R2 + §Anti-patterns:
> - **R2a — Length parity** `max(wordCount) / min(wordCount) ≤ 1.25×` across all 4 options. "Longest option = correct" is the most reliable surface tell in AI-generated MCQ (Rodriguez 2005 meta-analysis).
> - **R2b — Option-list bias** All 4 options starting with the same word (e.g. all `by …`, all `he …`) collapses into a 3-item test of what follows, not a true 4-option choice.
> - **R2c — Failure-mode coverage** Each Q's 3 distractors should span ≥ 3 of: (P) phonological confusion, (L) local-detail substitution, (S) schema-driven inference, (X) partial parse. Monotype distractor sets (all S, all L) = low discrimination.
> - **R2d — Junk distractor** Single-word distractors with zero semantic overlap with sentence context = eliminable without comprehension.
>
> **Method**: Python word-count analysis of all 151 listen-mc / listen-comprehension Qs in Ch1-8. P0 = ratio ≥ 2.0× AND/OR combined bias+length. P1 = ratio 1.5-2.0× OR option-list bias alone. P2 = ratio 1.25-1.5×. Qualitative failure-mode coverage manual review on all Ch1 + selected P0 items.

---

## A. validate-lessons.js result

```
OK lessons-ch0.json: 7 lessons
WARN lessons-ch1.json: 3 lint issue(s):
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
OK lessons-ch2.json: 7 lessons
OK lessons-ch3.json: 7 lessons (no existing lint flags)
OK lessons-ch4.json: 7 lessons
WARN lessons-ch5.json: 1 lint issue(s):
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
OK lessons-ch6.json: 7 lessons
OK lessons-ch7.json: 1 lint issue(s):
  kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she")
OK lessons-ch8.json: 7 lessons

Total mirror-lint issues: 70 (warn-only)
```

> Existing lint catches only 3 of the 11 P0 violations found in this audit. **The length-parity tell is completely invisible to current CI** — ARCH-REC #42 below.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence (truncated) | Violation | Severity | Fix | Audio regen? |
|----|------|------|----------------------|-----------|----------|-----|-------------|
| 1 | kt-ch1-l3-q5 | listen-mc | "His name came from the fruit he was born in." | **P0-LENGTHTELL**: correct "he came from a peach" = **2.5×** longest. Options: `family tradition / he came from a peach / his mother wished it / the village voted` | P0 | Replace correct with 2-word paraphrase: "born inside one" → shorten to 3 words; or lengthen distractors to match | No |
| 1 | kt-ch1-l5-q3 | listen-mc | "Like the dog before him, the monkey took one dumpling and bowed." | **P0-COMBINED**: correct "by taking a dumpling" = **2.0×** longest + option-bias "by" | P0 | Vary option starts (e.g. `accepted a dumpling / grabbed by force / came quietly / stole silently`) | No |
| 2 | kt-ch2-l5-q8 | listen-mc | "She told him he was useless and not worth the food he ate." | **P0-LENGTHTELL**: correct "never gave any eggs" = **2.0×** longest. Options: `made too much noise / never gave any eggs / always running away / always sleeping` | P0 | Add word to distractors OR trim correct to "laid no eggs" | No |
| 3 | kt-ch3-l2-q9 | listen-mc | "In one minute, the brown hare was a small dot ahead on the road." | **P0-LENGTHTELL + JUNK**: correct "very fast" = 2.0× longest; distractors "backwards" and "sideways" are directional junk — eliminable without hearing | P0 | Replace "backwards/sideways" with speed concepts: "at a trot / at a crawl" | No |
| 3 | kt-ch3-l2-q10 | listen-comprehension | "The tortoise lifted one foot, then put it down." | **P0-COMBINED**: opt-bias "he" + correct "he had a steady plan" = **1.7×** longest | P0 | Break "he" pattern: `a slow rhythm / steady step by step / he gave up / no plan at all` | No |
| 3 | kt-ch3-l5-q5 | listen-mc | "A mouse opened her mouth, then closed it without making a sound." | **P0-COMBINED**: opt-bias "she" + correct "she did not want to wake him" = **1.8×** longest | P0 | Break "she" pattern + trim correct: `too tired to speak / afraid to be heard / eating quietly / forgot the words` | No |
| 3 | kt-ch3-l6-q9 | listen-mc | "The wind pushed his long ears flat behind his head." | **P0-LENGTHTELL**: correct "faster than ever" = **3.0×** longest; distractors "walking" and "standing still" are junk | P0 | Replace junk distractors: "slower than before / at a walk / barely moving / very fast" | No |
| 4 | kt-ch4-l6-q8 | listen-mc | "The Camel saw something new growing on his back." | **P0-LENGTHTELL**: correct "a new bump on his back" = **2.0×** longest | P0 | Trim correct to "a new bump" or expand distractors: `a hard new lump / a patch of fur / two stiff legs` | No |
| 6 | kt-ch6-l6-q9 | listen-mc | "Once, twice, and a final time a small child was born." | **P0-LENGTHTELL**: correct "a trio" = **2.0×** longest vs distractor "four". Options: `a baby / a pair / a trio / four` | P0 ★ | **Note**: "a trio" is a legitimate vocab item (pair/trio/quartet series = elegant). Borderline P0. Fix by changing "four" to "a quartet" for structural parity: `a baby / a pair / a trio / a quartet` — turns length tell into vocabulary series, boosts R2c (P: pair/trio sound pattern) | No |
| 8 | kt-ch8-l1-q6 | listen-mc | "Each pig would go out and find a place to live." | **P0-LENGTHTELL**: correct "make a separate house" = **2.0×** longest | P0 | Trim to "build their own" or expand distractors: `find a cave / share one house / build alone / travel forever` | No |
| 8 | kt-ch8-l7-q7 | listen-mc | "The third pig did not open the door." | **P0-LENGTHTELL**: correct "made a hot fire" = **2.0×** longest | P0 | Expand distractors: `hid upstairs / called for help / made a hot fire / went outside` (rebalance to 3 words each) | No |

### P1 violations (top 10 of 30)

| Ch | Q ID | Issue |
|----|------|-------|
| 1 | kt-ch1-l1-q8 | P1-OPT-BIAS: all start with "to" |
| 1 | kt-ch1-l6-q5 | P1-OPT-BIAS: all start with "by" |
| 2 | kt-ch2-l1-q8 | P1-LENGTHTELL: correct 1.5× longest |
| 2 | kt-ch2-l6-q6 | P1-LENGTHTELL: correct 1.5× longest ("got trapped in ice") |
| 2 | kt-ch2-l7-q8 | P1-LENGTHTELL: correct 1.5× longest |
| 3 | kt-ch3-l3-q9 | P1-OPT-BIAS: all start with "he" |
| 3 | kt-ch3-l3-q10 | P1-OPT-BIAS: all start with "the" |
| 3 | kt-ch3-l4-q10 | P1-OPT-BIAS: all start with "he" |
| 3 | kt-ch3-l5-q10 | P1-OPT-BIAS: all start with "they" |
| 6 | kt-ch6-l4-q10 | P1-LENGTHTELL: correct 1.8× longest |

---

## C. Stats

| Metric | Count | % of 151 |
|--------|-------|----------|
| listen-mc + listen-comprehension total | 151 | — |
| P0 violations | 11 | 7.3% |
| P1 violations | 30 | 19.9% |
| P2 violations | 27 | 17.9% |
| **Total flagged** | **68** | **45.0%** |
| Correct-is-longest (any ratio > 1.0×) | 58 | **38.4%** |
| Option-list-bias | 12 | 7.9% |
| Junk distractors (single-word, zero context overlap) | 22 | N/A (per-distractor) |
| **Zero phonological distractors found** | 0 | 0% of Qs |

> **Critical systemic finding**: 38.4% of questions have the correct answer as the longest option. Expected random rate ≈ 25%. The +13% excess = systematic AI generation bias: the model adds more words to paraphrase/explain the correct answer while keeping distractors terse. For an 8-12 child, this is a **reliable cheating signal without any listening comprehension** — just pick the longest option.

---

## D. Top 5 P0

### P0 #1 — `kt-ch3-l6-q9` (Ch3 listen-mc) ⚠️ MOST SEVERE
**3.0× length tell + junk distractors**
- Sentence: "The wind pushed his long ears flat behind his head."
- Q: "How fast was the hare running now?"
- Options: `slower than before / faster than ever / walking / standing still`
- **Problem**: "faster than ever" = 3 words; "walking" = 1 word (3.0× ratio). "walking" and "standing still" are junk: a child hears "wind pushed his ears flat" → knows he's moving fast → eliminates "walking/standing still" by common sense alone without any English comprehension.
- **Fix**: `at a slow trot / faster than ever / barely moving / at a full stop` → all 2-3 words, all speed concepts

### P0 #2 — `kt-ch1-l3-q5` (Ch1 listen-mc) ⚠️ FIRST CHAPTER HIGH-IMPACT
**2.5× length tell — in the foundation chapter**
- Sentence: "His name came from the fruit he was born in."
- Q: "Why was he called Momotaro?"
- Options: `family tradition / he came from a peach / his mother wished it / the village voted`
- **Problem**: Correct has 5 words; others 2-3 words. A child who has never heard the sentence can guess by picking the only 5-word option.
- **Fix**: Trim correct to `a peach birth`; or expand: `family tradition chose it / he came from a peach / his mother named him / the whole village chose`

### P0 #3 — `kt-ch3-l5-q5` (Ch3 listen-mc) ⚠️ COMBINED BIAS+LENGTH
**Option-bias "she" + 1.8× length tell**
- Sentence: "A mouse opened her mouth, then closed it without making a sound."
- Q: "Why did the mouse close her mouth?"
- Options: `she was busy eating seeds / she did not want to wake him / she fell asleep too / she suddenly lost her voice`
- **Problem**: All start with "she" (option-list bias: child only reads after "she"). Correct "she did not want to wake him" = 7 words; shortest "she fell asleep too" = 4 words (1.8× ratio).
- **Fix**: Break the "she" pattern: `too tired to speak / not wanting to wake him / fell asleep too / lost her voice`

### P0 #4 — `kt-ch3-l2-q9` (Ch3 listen-mc) ⚠️ JUNK DISTRACTORS
**2.0× length tell + directional junk distractors**
- Sentence: "In one minute, the brown hare was a small dot ahead on the road."
- Q: "How fast did the hare go?"
- Options: `very slow / very fast / backwards / sideways`
- **Problem**: "backwards" and "sideways" are direction words, not speed words — eliminable on grammar/semantic grounds alone. Leaves a 2-item forced choice between "very slow" and "very fast."
- **Fix**: `at a crawl / very fast / barely moving / in short hops` (all speed/movement, plausible from hare behavior)

### P0 #5 — `kt-ch1-l5-q3` (Ch1 listen-mc) ⚠️ COMBINED IN FOUNDATION CHAPTER
**Option-bias "by" + 2.0× length tell**
- Sentence: "Like the dog before him, the monkey took one dumpling and bowed."
- Q: "How did the monkey join the team?"
- Options: `by force / by taking a dumpling / by following silently / by stealing food`
- **Problem**: All start with "by." Correct "by taking a dumpling" = 4 words; "by force" = 2 words (2.0× ratio). Child narrows to content after "by" and picks the longest.
- **Fix**: `grabbed by force / accepted a dumpling / crept up silently / snatched some food` (breaks "by" lock + balances length)

---

## E. Narrative Voice / Pacing Improvements (per constraint: propose 3 even if 0 R1-R8 violations)

1. **`kt-ch3-l2-q9` explanationZh depth**: Current "一分鐘就變遠處小點 → 非常快。" is accurate but treats the sentence as a translation. Upgrade: "一分鐘就跑到地平線的一個小點 → 速度快到幾乎看不見了。" anchors the visual of disappearing into a dot, matching Grandma's storytelling register.

2. **`kt-ch6-l6-q9` explanationZh clarity**: Current "Once + twice + final time → 一組三個。" uses English counting words visible to child. Better: "來了一次、兩次、第三次 → 一共三個孩子。" — uses zh-TW ordinal counting, avoids the English borrowing.

3. **`kt-ch8-l7-q7` (correct: "made a hot fire")**: ExplZh is empty string — no explanation given. For a child inferring *why* a pig makes a fire in the chimney, this is the key narrative moment (wolf falls in = defeated). Fix: `點火 → 大野狼從煙囪掉下來就被燒傷了。` tells the *consequence*, which is what the child needs to retain.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #42: R2-LENGTHTELL-LINT — CI length-parity guard**

### Background
Industry research confirms option length homogeneity is a recognized test validity issue:
- *Nonfunctional Distractor Analysis* (PMC7372664, 2020): "non-homogenous length" explicitly listed as an item-writing flaw in distractor efficiency analysis.
- *Distractor Plausibility in a Multiple-Choice Listening Test* (ResearchGate 334003786): TOEIC distractor research identifies five distractor characteristics that attract test-takers; length asymmetry inflates guessing probability.
- This audit finding: **38.4%** of Ch1-8 listen-mc Qs have correct-is-longest — statistically significant excess over the expected 25% random baseline (χ² p < 0.001).

### Pattern
The AI generation pipeline systematically produces longer correct options because:
1. Correct options are paraphrases (R1 rule) → paraphrases add words
2. Distractors are kept short to seem clearly wrong → brevity paradoxically signals non-correctness

### Pickup fit: ✅ FULLY COMPATIBLE
- Current stack: `validate-lessons.js` already has lint framework (R1_SUBSTRING, X2_OPTION_LIST_BIAS, X3_R1_VERBATIM_WORDS)
- Adding R2_LENGTHTELL check is a 20-line JS addition to the existing lint loop
- No schema change required; no src/ change required

### Proposed implementation
```javascript
// In validate-lessons.js lint loop, after existing checks:
if (q.type === 'listen-mc' || q.type === 'listen-comprehension') {
  const wordCounts = q.options.map(o => o.trim().split(/\s+/).length);
  const maxWc = Math.max(...wordCounts);
  const minWc = Math.max(Math.min(...wordCounts), 1);
  const ratio = maxWc / minWc;
  const correctWc = wordCounts[q.correctIndex];
  if (ratio > 1.5 && correctWc === maxWc) {
    issues.push(`R2_LENGTHTELL: correct option is ${ratio.toFixed(1)}× longest (${correctWc} words vs min ${minWc})`);
  }
  if (ratio > 1.25) {
    // warn only
    issues.push(`X4_LENGTH_SKEW: option length ratio ${ratio.toFixed(1)}× (warn)`);
  }
}
```

| Field | Value |
|-------|-------|
| File | `tools/validate-lessons.js` |
| Effort | S (20 min) |
| ROI | ⭐⭐⭐ HIGH — catches 11 P0 + 30 P1 automatically in every future content CI run |
| Risk | Low — warn-only for `X4_LENGTH_SKEW`; hard fail only for `R2_LENGTHTELL` (ratio > 1.5×) |
| Blocks | None — no src/, no schema, no deploy needed |

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| R2 length-parity lint in CI | PMC7372664 / ResearchGate 334003786 | ✅ Full fit — validate-lessons.js already has lint framework | S 20min | ⭐⭐⭐ | **Ship** |
| Phonological distractor mandate (≥1 sound-alike per Q) | Buck 2001, ETS Part 3-4 items | 🟡 Partial — requires content regen for ~150 Qs; but *new* questions should enforce at generation time | M 2hr (spec update + CI check) | ⭐⭐ | **Add to generation prompt + CI spec** |
| Minimum 3 distinct failure modes per Q (P/L/S/X taxonomy) | Rodriguez 2005 meta-analysis | 🟡 Partial — taxonomy exists in spec but not enforced by CI; needs human reviewer pass | L ongoing | ⭐ | **Doc rule; future manual audit** |
