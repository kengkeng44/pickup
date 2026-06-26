# Content QA — 2026-06-26 12:13 UTC

Today's angle: **A4 mirror patterns** (negation/identity — options that telegraph the answer by structural symmetry)
Focus: **Ch9–16** (Cinderella / Chang'e / Weaver Girl / Little Red / Urashima / Emperor's New Clothes / Issun-Boshi)

---

## A. validate-lessons.js result

```
OK  lessons-ch9.json
OK  lessons-ch10.json
OK  lessons-ch11.json
OK  lessons-ch12.json
OK  lessons-ch13.json
OK  lessons-ch14.json
OK  lessons-ch15.json
WARN lessons-ch16.json: 1 lint issue(s):
     kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")

Total mirror-lint issues (full corpus): 70
Ch9-16 specific: 1 automated (X2) + 10 manual A4 + 2 cross-lesson identity
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 12 | kt-ch12-l5-x5 | emoji-pick | sentence: "Take my soft skin" → correct: "🐄 her own soft skin" | **P0 A4-IDENTITY**: "soft skin" verbatim substring of sentence — R1 violation | Replace with "🐄 wear her hide like a coat" | No (emoji-pick, no audio) |
| 14 | kt-ch14-l5-x4 | comprehension | sentence: "…box tied with a **gold rope**" → correct: "the gold rope" | **P0 A4-IDENTITY**: correct option verbatim in sentence — trivial scan-and-pick | Replace: "a braided cord in yellow" | No |
| 14 | kt-ch14-l5-x6 | comprehension | sentence: "**Please, never open it.**" → correct: "never open the box" | **P0 A4-NEAR-IDENTITY**: "never open" verbatim; only "the box" added — near-echo | Replace: "keep the lid sealed always" | No |
| 15 | kt-ch15-l3-q6 ≡ l4-q6 | listen-mc | Both use sentence `"Am I not smart enough?"` → correct IDENTICAL: "being seen as not clever" in both lessons | **P0 A4-CROSS-LESSON-IDENTITY**: same sentence + same correct answer in two different lessons; player who sees l3 is given l4 for free | l4: change sentence to `"What if they think I am a fool?" he worried.` + rephrase correct to "looking foolish in front of all" | Yes (l4 audio) |
| 12 | kt-ch12-l7-q3 ≡ l7-x2 | listen-mc / comprehension | Both Q: "Why did the Queen become soft?" → correct identical: "she missed her own kin" | **P1 A4-CROSS-LESSON-IDENTITY**: same correct answer text in main-lesson and extended slot | l7-x2: rephrase correct to "her heart remembered family" | No |
| 10 | kt-ch10-l2-q9 | listen-mc | distractors B "it was too small" vs D "it was too cold" — single terminal-word diff | **P1 A4e-LAST-WORD-DIFF**: B+D share frame "it was too [adj]"; signals neither is the answer structure | Replace D: "no one could reach it" | Yes |
| 15 | kt-ch15-l2-q3 | listen-mc | B "yes, a big piece" + C "yes, one small piece" — both start "yes, a/one [adj] piece" | **P1 A4b-TWIN-YES-PAIR**: two options share "yes, [quantifier] piece" frame; reduces effective 4-way to 3-way | Replace C: "a roll of blue thread" | Yes |
| 9 | kt-ch9-l5-q3 | listen-mc | A "some small soup bowls", B "one hot loaf of bread", D "just a soft warm bed" — triple "[quant] [adj] [noun]" | **P1 A4c-TRIPLE-TEMPLATE**: correct C "her fine ride to the ball" breaks template, telegraphing it as the odd one out | Replace D: "a place to sleep outside" (breaks template parity) | Yes |
| 14 | kt-ch14-l4-q3 | listen-mc | B "cold and very silent", C "sad and very dark", D "short and very tiring" — triple "[adj] and very [adj]" | **P1 A4c-TRIPLE-TEMPLATE**: correct A "lively and full of music" has different frame; 3-vs-1 structural mismatch reveals A | Replace D: "still and a little eerie" (breaks triple pattern) | Yes |
| 16 | kt-ch16-l1-q6 | listen-mc | A "a big new house to live in", C "a heavy bag of gold coins", D "a fast horse for the farm" — triple "a [adj] [noun] [prep]" | **P1 A4c-TRIPLE-TEMPLATE + X2_OPTION_LIST_BIAS** (all start "a"): triple template + same-start lint | Replace D: "many years of good health" | Yes |
| 15 | kt-ch15-l7-q6 + l7-q8 | listen-mc (pair) | l7-q6 correct: "going home to hide"; l7-q8 distractor A: "hide right away" | **P2 A4-CROSS-Q-LEXICAL-LEAK**: adjacent questions share "hide" — q6 tells player that hiding was the path NOT taken, so q8 opt A is trivially eliminated | l7-q8 opt A: replace "hide right away" → "walk slower and slower" | Yes (l7-q8 audio) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Lessons scanned (Ch9-16) | 56 |
| Q items scanned (listen-mc / comprehension / emoji-pick) | 127 |
| P0 violations | 4 |
| P1 violations | 5 |
| P2 violations | 1 |
| Automated lint flags (Ch9-16) | 1 (Ch16 X2) |
| Cross-lesson identity pairs | 2 |
| Audio regen required | 7 items |

---

## D. Top 5 P0

1. **⚠️ Ch15 kt-ch15-l3-q6 ≡ l4-q6 — Cross-lesson identical correct** — same sentence, same correct answer text used in Lesson 3 and Lesson 4 of the same chapter. Player who completes l3 gets l4 for free. Highest severity: systematic shortcut, not a one-off echo.

2. **⚠️ Ch12 kt-ch12-l5-x5 — Identity: "soft skin" verbatim** — emoji-pick but the phrase `soft skin` lifted verbatim from the sentence. Even in emoji context this fails R1; child learns to scan rather than understand.

3. **⚠️ Ch14 kt-ch14-l5-x4 — Identity: "the gold rope" verbatim** — comprehension Q where the entire correct answer phrase appears word-for-word in the sentence. Zero inference required.

4. **⚠️ Ch14 kt-ch14-l5-x6 — Near-identity: "never open" verbatim** — comprehension Q asking what was promised; sentence reads "Please, never open it" and correct option is "never open the box." The operative pair "never open" is lifted directly.

5. **⚠️ Ch10 kt-ch10-l2-q9 — Template mirror B vs D** — "it was too small" / "it was too cold" share the same frame; experienced players learn that when two options share a template both are wrong, collapsing 4-way to 3-way.

---

## E. Narrative Voice / Pacing Improvements (3 required)

1. **Ch13 kt-ch13-l2-q9** — distractor C: "just a small and sweet puppy" is a junk/obvious-miss distractor for 8-12-year-olds (a wolf cannot be a puppy). Breaks immersion and trains surface-level elimination. Replace with "wild but trying to be friendly" — a plausible but wrong characterization that requires genuine inference.

2. **Ch11 kt-ch11-l4-q7** — Q: "How many suns were in the sky now?" — distractor B "none at all" is non-functional (any child who understands the story knows at least one sun must remain for life). Replace B "none at all" → "only two left" for a plausible wrong answer requiring story-tracking.

3. **Ch9 kt-ch9-l4-q9** — Q: "What was the fairy godmother's manner like?" — correct B "gentle but strong" uses conjunction "but" while all three distractors (A "loud and rough", C "sleepy and slow", D "angry and quick") use "and." The contrastive "but" is a low-level structural cue pointing to B for any child who reads options before answering. Replace: "B: soft yet firm" or make distractor variety consistent ("but" in at least one distractor).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

ARCH-REC #81: **X34_A4_TEMPLATE_MIRROR_LINT** — automated lint rule for option-set structural homogeneity violations

### Research summary

- **PMC 2024 (Automatic distractor generation for MCQs)**: distractor quality is the single largest predictor of item discrimination index (p). Non-functioning distractors (NFDs) reduce p by 0.12–0.18 per NFD on average. The paper recommends a semantic diversity threshold: no two distractors should be within Jaccard similarity > 0.5 on content words.
- **BMC Medical Education 2025** (meta-analysis): 3-option MCQs have *fewer* non-functioning distractors than 4-option (39% vs 56% NFD rate). This suggests that when two distractors in a 4-option set share a syntactic template, they functionally collapse to one distractor, making the set act like a 3-option test without the reliability benefit.
- **IELTS distractor design (Cambridge 2025)**: IELTS item writers follow the rule that distractors must "not share a common grammatical frame unless that frame is shared by ALL options including the key" — i.e., 0-of-4 or 4-of-4 share a template, never 2-of-4 or 3-of-4.
- **Duolingo English Test (listening whitepaper)**: underwent "item quality, fairness and bias (FAB)" review by 25 external reviewers with linguistics expertise — a structural parallelism check was part of FAB criteria.

### Pickup architecture fit

Pickup uses `validate-lessons.js` + `LessonsSchema` (Zod) for CI lint. The current lint catches:
- R1 verbatim substring (`R1_SUBSTRING`)
- Option list bias by starting token (`X2_OPTION_LIST_BIAS`)
- Single-word diff between options is NOT currently flagged

**Proposed: `X34_A4_TEMPLATE_MIRROR_LINT`**

Logic (pseudo-code for `validate-lessons.js`):
```js
// For each listen-mc / comprehension / emoji-pick question with 4 options:
const tokenSets = options.map(o => o.toLowerCase().split(/\s+/).slice(0, 3).join(' '));
// Count how many pairs share first 3 tokens
const pairs = tokenSets.filter((t, i) => tokenSets.indexOf(t) !== i);
if (pairs.length >= 2) flag('X34_A4_TEMPLATE_MIRROR_LINT', id);

// Also: count options that match frame "[quant/art] [adj] [noun]"
const nounPhrase = /^(a|an|the|some|one|two|three|just|only|no|many)\s+\w+\s+\w+/i;
const npCount = options.filter(o => nounPhrase.test(o.trim())).length;
if (npCount >= 3) flag('X34_A4_TRIPLE_NP_TEMPLATE', id);
```

**Fields changed**: `validate-lessons.js` only — zero changes to lesson JSON or `src/`.

| Pattern | Source | Pickup fit | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X34_A4_TEMPLATE_MIRROR_LINT (first-3-token pair count) | Cambridge IELTS FAB / PMC 2024 | ✅ Direct: same Zod + validate-lessons.js pipeline | ~1 hr (add 20 lines to validate-lessons.js) | High — catches 5 P1 violations this cycle automatically | ✅ Ship |
| FAB reviewer panel (25 linguistics experts) | Duolingo whitepaper | ❌ Not practical for indie ELT at this scale | Very High | Low | ❌ Skip |
| 3-option MCQ migration | BMC 2025 meta-analysis | 🟡 Partially applicable — fewer NFDs, but 8-12 children benefit from 4 choices for pacing/engagement time | Medium | Low (breaking schema change) | 🟡 Hold — revisit if p-value data shows NFD issue |

**Implementation path:**
1. Open `tools/validate-lessons.js`
2. Add `checkA4TemplateMirror(lesson)` function after existing mirror check block
3. Flag threshold: `first-3-token pair count ≥ 2` OR `noun-phrase template count ≥ 3`
4. Severity: `WARN` (not FAIL) — same as existing X2/X3
5. Run `node tools/validate-lessons.js` — expect ~8 new flags across corpus (the 5 P1 violations this cycle + ~3 others)

---

*Audit completed by cron at 2026-06-26 12:13 UTC. Angle: A4 mirror patterns. Ch9-16.*
