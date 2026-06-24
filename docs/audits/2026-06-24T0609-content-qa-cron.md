# Content QA — 2026-06-24 06:09 UTC

**Today's angle: A4 — Mirror Patterns (negation/identity/positional key dominance)**
**Focus: Ch25–31**

---

## A. validate-lessons.js result

```
WARN lessons-ch30.json: 5 lint issue(s)
  kt-ch30-l4-q6: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("right in the chest")
  kt-ch30-l3-q3: X2_OPTION_LIST_BIAS (all start "a")
  kt-ch30-l7-q3: X3_R1_VERBATIM_WORDS ("around the neck")
  kt-ch30-l7-q6: X2_OPTION_LIST_BIAS (all start "it")

WARN lessons-ch31.json: 8 lint issue(s)
  kt-ch31-l1-q8: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("in a tall stone castle")
  kt-ch31-l4-q3: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("on Robin's front door")
  kt-ch31-l1-q6: X2_OPTION_LIST_BIAS (all start "he")
  kt-ch31-l2-q7: X2_OPTION_LIST_BIAS (all start "with")
  kt-ch31-l6-q6: X2_OPTION_LIST_BIAS (all start "they")
  kt-ch31-l6-q8: X2_OPTION_LIST_BIAS (all start "in")

Ch25–29: OK (no structural/schema failures)
Total mirror-lint issues (backlog): 70
```

---

## B. Violation table — A4 Mirror Patterns, Ch25–31

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 25 | ALL 91 Qs (7 lessons) | listen-mc/comprehension/listen-tf | kt-ch25-l1: **13/13** correctIdx=1; L2: 10/13; L3: 11/13; L4: 11/13; L5: 11/13; L6: 9/13; L7: 10/13 | **P0 A4_KEY_POSITION_DOMINANCE** correctIndex=1 in 82% of all MC Qs in Ch25 — "always tap B" strategy works chapter-wide; L1 is 100% idx=1 (13 consecutive). Violates R3 (should be ≤40% per position per lesson) | Re-shuffle correctIndex for all 7 lessons to Latin-square balance (0/1/2/3 ≈25% each). Update options array to match — options are 4-option so all positions are used. Add `validate-lessons.js` R3_LESSON_BALANCE lint: ≥6-Q lessons must have no single idx >40% | No |
| 29 | kt-ch29-l5 + Ch29 overall | listen-mc/comprehension/listen-tf | kt-ch29-l5: **9/13 consecutive** correctIdx=0; Ch29 overall 63% idx=0 | **P0 A4_KEY_POSITION_DOMINANCE** "always tap A" strategy works for 63% of Ch29. kt-ch29-l5 has 9-in-a-row at idx=0 | Same as Ch25 fix: re-balance correctIndex per lesson with Latin square | No |
| 29 | kt-ch29-l1-x6 | grammar-mc | `For ten long years he ___ fighting a big war.` opts: ["is fighting","will fight","**had fought**","has fought"] | **P1 A4_TENSE_MIRROR** "had fought" vs "has fought" differ only in perfect vs pluperfect aspect — 8-12y learners at A2 cannot meaningfully distinguish as distractors; creates a 50/50 guess between positions 2 and 3 | Replace "has fought" with "was fighting" — aspectual contrast (progressive past) covers the same phonological similarity but is more teachable | No |
| 29 | kt-ch29-l2-x6 | grammar-mc | `His wife ___ waiting. His son ___ waiting.` opts: ["are","were","is","was"] | **P1 A4_TENSE_MIRROR** Present pair (are/is) and past pair (were/was) create a 2×2 mirror; correct="was". For A2, two present and two past forms as distractors in the same Q are confusing mirror pairs | Replace one distractor with "had been" or remove "were" in favour of "will be" to break the present/past symmetry | No |
| 25 | kt-ch25-l6-x4, kt-ch25-l7-x7 | comprehension | correct: "family never ends but mountains cannot grow" (43ch) vs max distractor 32ch | **P1 A4_LONGEST_CORRECT (R2 violation)** correct option is >35% longer than next-longest distractor; 14/180 comprehension Qs (8%) exhibit this; signals correct answer via length | Trim correct option OR expand distractors to match length within 1.25× ratio | No |
| 26 | kt-ch26-l4-x4, kt-ch26-l7-x7 | comprehension | correct 43-46ch vs distractors 30-37ch | **P1 A4_LONGEST_CORRECT** same pattern as Ch25 | Same fix | No |
| 28 | kt-ch28-l7-q11 | comprehension | correct "patience and respect win a great friend" (39ch) vs max distractor 30ch | **P1 A4_LONGEST_CORRECT** | Same fix | No |
| 26/27/28 | All lessons | all MC | Ch26:57% idx=0, Ch27:58% idx=0, Ch28:54% idx=0 | **P1 A4_KEY_POSITION_BIAS** borderline — exceeds the ≤40% per position R3 target. Less severe than Ch25/29 but still detectable pattern | Re-balance correctIndex per lesson | No |
| 31 | kt-ch31-l1-x7 | emoji-pick | opts: ["💖 they really liked him","😡 they were angry at him","😨 they were afraid of him","😒 they did not care about him"] | **P2 A4_SUFFIX_MIRROR** all 4 options end with "him" — structural suffix dominates; discriminating meaning requires reading all words, not just the end | Acceptable for emoji-pick (emotion discrimination is the skill); note as minor. Could vary last pronoun in one distractor | No |
| 31 | kt-ch31-l6-q10 | emoji-pick | opts: ["😡 angry and mean to them","💗 sorry and warm to them","😴 just very sleepy now","😨 scared of them"] | **P2 A4_SUFFIX_MIRROR** 3/4 end with "them"; offset by one option "sleepy now" breaking the pattern | Minor — 3/4 not 4/4; acceptable as written | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC questions audited (Ch25-31) | 620 |
| Yes/No binary Qs | 171 (28%) — within R7 bounds (25-30%) |
| Yes/No distribution | Yes=86 (50%), No=85 (50%) — balanced ✅ |
| Ch25 correctIndex=1 rate | **82%** (P0) |
| Ch29 correctIndex=0 rate | **63%** (P0) |
| Ch26/27/28 idx=0 rate | 54-58% (P1) |
| Ch30/31 idx=1 rate | 57-65% (P1) |
| A4_TENSE_MIRROR violations | 2 (Ch29) |
| A4_LONGEST_CORRECT (>8ch margin) | 5; (>5ch margin in comprehension) 14/180 = 8% |
| A4_SUFFIX_MIRROR | 2 (Ch31) |
| A4_NEGATION_MIRROR / IDENTITY | 0 |
| validate-lessons.js structural failures | 0 |

---

## D. Top 5 P0 / P1

1. **⚠️ P0 — Ch25 correctIndex=1 dominates at 82%** (L1 is 100%, 13 consecutive). "Always tap B" strategy fully exploitable. All 7 lessons affected. Fix: Latin-square re-balance correctIndex across all 91 Qs.

2. **⚠️ P0 — Ch29 correctIndex=0 dominates at 63%** (kt-ch29-l5: 9 consecutive idx=0). Fix: same Latin-square re-balance.

3. **P1 — Ch26/27/28/30/31 all exceed 40% per position R3 target** (54-65%). Ch30 at 57% idx=1, Ch31 at 65% idx=1. System-wide structural issue: content was generated with correctIndex=0 or 1 as default without shuffling.

4. **P1 — kt-ch29-l1-x6 + kt-ch29-l2-x6 A4_TENSE_MIRROR** grammar-mc distractors differ only in tense/aspect pair; 8-12y A2 learners cannot distinguish "had fought" vs "has fought" meaningfully.

5. **P1 — A4_LONGEST_CORRECT in comprehension** (14/180 = 8%): correct answer telegraphed by length. Most concentrated in Ch25/26/28. Fix: add R2 lint for comprehension type + trim/pad options.

---

## E. Narrative voice / pacing improvements (even if 0 structural violations)

1. **Ch25 lesson pacing too uniform**: All 7 lessons have the same structure (listen-mc, listen-tf, comprehension). The R6 sub-skill variety rule mandates ≥2 inference Qs per lesson — Ch25 lessons are almost exclusively `detail` sub-skill. Add 1-2 open-ended inference questions per lesson (e.g., "Why do you think Yu Gong kept digging even when others laughed?").

2. **Ch29 lesson opener tone**: kt-ch29-l1 opens with `listen-tf` Yes/No questions about Odysseus's travels before any narration establishes the setting. Per grandma story-voice spec, narration entries should precede comprehension checks. Move the first 3 listen-tf questions to positions 4-6, letting narration entries set scene first.

3. **Ch31 emoji-pick options overly negative-skewed**: In kt-ch31-l1-x7, three of four emoji-picks are negative emotions (angry, afraid, do not care) against one positive. For 8-12y children, distractors should be more emotionally varied — replace one negative with a neutral option like "😐 they did not know him yet" to avoid fatigue from negative emotion processing.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #72: X25_A4_LESSON_CORRECTINDEX_LATIN_SQUARE**

### Background
Industry research (Rodriguez 2005, ETS internal guidelines, UT Austin CTL 2026) consistently mandates **balanced key distribution** in MC tests: each position (A/B/C/D) should appear as correct ≈25% of the time across any test section. Studies on AI-generated MCQ show LLMs systematically bias toward position 1 or 2 when generating answer options — exactly what Pickup exhibits (Ch25: 82% idx=1; Ch29: 63% idx=0). Children are especially vulnerable to test-wiseness exploitation since they lack meta-test experience to resist the heuristic.

Sources:
- [Rules For Writing Multiple Choice Questions (eLearning Coach)](https://theelearningcoach.com/elearning_design/rules-for-multiple-choice-questions/) — "Vary positions of correct options to prevent pattern detection"
- [UT Austin Multiple Choice Question Writing Guide](https://ctl.utexas.edu/multiple-choice-questions) — "Randomize correct answer positions"
- [LLM position bias in MCQ benchmark research (arXiv 2402.01781)](https://arxiv.org/pdf/2402.01781) — AI models exhibit consistent position preference; same applies to AI-generated content

### Current Pickup State
`validate-lessons.js` has R3_KEY_DOMINANCE warning at chapter level (≥45% triggers WARN) but **does not enforce per-lesson balance**. Content generation pipeline does not shuffle correctIndex — LLM output is taken as-is with options in [correct, distractor1, distractor2, distractor3] order, resulting in structural idx=0 or idx=1 bias.

### Verdict: ✅ 適合 Pickup 架構

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Per-lesson Latin square correctIndex balance lint | ETS/UT Austin best practice | Add 1 rule to `validate-lessons.js` + apply to existing JSON | Low (1-2hr lint; 4-6hr JSON fix for Ch25-31) | Critical — eliminates test-wiseness for entire Ch25-31 | ✅ IMPLEMENT |
| Build-time correctIndex shuffler script | Duolingo engineering practice | `tools/shuffle-correct-index.js` reads lesson JSON, reorders options array so correctIndex is balanced across 0-3 per lesson | Medium (3hr) | High — prevents recurrence in new chapters | ✅ IMPLEMENT |
| R3_LESSON_BALANCE lint rule | Item writing standards | Add to `validate-lessons.js`: per-lesson, if ≥6 MC Qs, no single correctIndex position >40%; WARN at >35%; FAIL at >50% | Low (1hr) | High — catch future regressions at CI | ✅ IMPLEMENT |

### Specific Implementation

**`validate-lessons.js` R3_LESSON_BALANCE addition** (in lesson loop):
```js
// R3_LESSON_BALANCE: per-lesson key position balance
const mcQs = lesson.questions.filter(q => q.options && q.correctIndex !== undefined);
if (mcQs.length >= 6) {
  const posCount = [0,0,0,0];
  mcQs.forEach(q => posCount[q.correctIndex]++);
  const maxPct = Math.max(...posCount) / mcQs.length;
  if (maxPct > 0.50) issues.push(`${lesson.id}: R3_LESSON_BALANCE FAIL (${(maxPct*100).toFixed(0)}% same position)`);
  else if (maxPct > 0.40) issues.push(`${lesson.id}: R3_LESSON_BALANCE WARN (${(maxPct*100).toFixed(0)}% same position)`);
}
```

**Scope of JSON fix needed**:
- Ch25: all 7 lessons (91 Qs) — CRITICAL
- Ch29: all 6 lessons (91 Qs) — CRITICAL
- Ch26/27/28/30/31: all lessons (moderate bias, lower urgency)

**Effort**: JSON fixes only (no src/ changes). Ch25+29 fix ≈ 4-6hr content edit.

**Cockpit entry**: See below for Decision Board addition.
