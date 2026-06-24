# Content QA — 2026-06-24 00:09 UTC

**Today's angle: R2 — Distractor Doctrine (4-option functional quality, length parity, key-position balance)**
**Focus: Ch9–16**

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 70  (warn-only)
Ch9:  OK
Ch10: OK
Ch11: OK
Ch12: OK
Ch13: OK
Ch14: OK
Ch15: OK
Ch16: WARN — 1 issue (kt-ch16-l1-q6: X2_OPTION_LIST_BIAS all start "a")
```

No structural schema failures. All chapters pass shape guard. Lint finds 70 existing X2/X3/R1_SUBSTRING issues (pre-existing backlog, not new).

---

## B. Violation table — R2 Distractor Doctrine, Ch9–16

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 11 | ALL 7 lessons | listen-mc | 37 of 39 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 95% of MC Qs across entire Ch11 — "always tap B" strategy works for 95% of questions | Shuffle correctIndex across 0-3 using balanced Latin square per lesson; update validate-lessons.js R3 rule to enforce ≤40% per position | No |
| 15 | ALL 7 lessons | listen-mc | 38 of 43 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 88% — Ch15 Ugly Duckling entire chapter B-dominant | Same fix | No |
| 16 | ALL 7 lessons | listen-mc | 32 of 35 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 91% — Ch16 Issun-boshi almost all B | Same fix | No |
| 14 | ALL 7 lessons | listen-mc | 30 of 35 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 86% — Ch14 Urashima Taro | Same fix | No |
| 13 | ALL 7 lessons | listen-mc | 35 of 42 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 83% — Ch13 Red Riding Hood | Same fix | No |
| 12 | ALL 7 lessons | listen-mc | 36 of 43 MC questions | **P0 R3_KEY_DOMINANCE** correctIndex=1 in 84% — Ch12 Cowherd & Weaver | Same fix | No |
| 11 | kt-ch11-l1-x7 | listen-mc | `['they felt very hungry','the heat was too much','they were quite lost','their toys were gone']` | **P0 R2_ALL4_SAME_START** All 4 options start "the…" — student reads first letter and taps any; no discrimination | Ensure at least 3 distinct first-word stems across options | No |
| 11 | kt-ch11-l5-x5 | grammar-mc | `['laugh','laughs','laughed','laughing']` | **P0 R2_ALL4_SAME_START** All start "lau…" — pure length/inflection tell | Keep 4 tenses but lead with different context verbs to avoid identical prefix; or reframe as cloze without stem pattern | No |
| 12 | kt-ch12-l7-x8 | grammar-mc | `['point','points','pointed','pointing']` | **P0 R2_ALL4_SAME_START** All start "poi…" | Same | No |
| 13 | kt-ch13-l3-x8 | grammar-mc | `['nod','nods','nodded','nodding']` | **P0 R2_ALL4_SAME_START** All start "nod…" — 5 consecutive lessons (l3-l7) all use same "base/3ps/past/gerund" pattern with all-same-prefix | Vary verb choice each lesson so prefixes differ | No |
| 13 | kt-ch13-l4-x8 | grammar-mc | `['knock','knocks','knocked','knocking']` | **P0 R2_ALL4_SAME_START** All start "kno…" | Same | No |
| 13 | kt-ch13-l5-x8 | grammar-mc | `['put','puts','putting','puted']` | **P0 R2_ALL4_SAME_START + A3_JUNK** All start "put…" AND "puted" is not a real English word — obvious-miss non-functional distractor | Replace "puted" with "had put" or "was putting" | No |
| 13 | kt-ch13-l6-x8 | grammar-mc | `['hear','hears','heard','hearing']` | **P0 R2_ALL4_SAME_START** | Vary verb | No |
| 13 | kt-ch13-l7-x8 | grammar-mc | `['pull','pulls','pulled','pulling']` | **P0 R2_ALL4_SAME_START** | Vary verb | No |
| 14 | kt-ch14-l7-x4 | grammar-mc | `['until','untils','untiled','untiling']` (all start "unt…") | **P0 R2_ALL4_SAME_START** | Vary | No |
| 15 | kt-ch15-l5-x3 | grammar-mc | `['step','steps','stepped','stepping']` | **P0 R2_ALL4_SAME_START** All start "ste…" | Vary | No |
| 16 | kt-ch16-l5-x4 | grammar-mc | `['shout','shouts','shouted','shouting']` | **P0 R2_ALL4_SAME_START** All start "sho…" | Vary | No |
| 9 | kt-ch9-l2-x5 | grammar-mc | `['got','get','gets','getting']` ratio=2.33 | **P1 R2_LENGTH_TELL** longest option (8 chars) vs shortest (3 chars) — gerund form always longest | Cap option length at 1.25× shortest; or pair with different-length distractors | No |
| 11 | kt-ch11-l1 | ALL Qs | correctIdx=1 in 5/5 (100%) | **P1 R3_KEY_DOMINANCE** entire lesson B-only | Rebalance | No |
| 11 | kt-ch11-l2 | ALL Qs | correctIdx=1 in 6/6 (100%) | **P1 R3_KEY_DOMINANCE** | Rebalance | No |
| 11 | kt-ch11-l4 | ALL Qs | correctIdx=1 in 6/6 (100%) | **P1 R3_KEY_DOMINANCE** | Rebalance | No |
| 9 | kt-ch9-l1-q6 | listen-mc | `correct="an easy and rich life"` ratio=1.50 | **P1 A5_SUBTLE_LENGTH_TELL** correct is longest; distractors visibly shorter | Pad or rephrase distractors to same word count | No |
| 14 | kt-ch14-l1-q6 | listen-mc | `['feeding it','hurting it','washing it','singing to it']` | **P1 R4_ALL_RHYME** all 4 end in "it" — partial rhyme trap obscures discrimination | Diversify ending phonology across distractors | No |
| 14 | kt-ch14-l1-x6 | listen-mc | `['Momotaro Taro','Kintaro Taro','Urashima Taro','Issun-boshi']` | **P1 R4_ALL_RHYME** 3 of 4 end in "Taro" — for 8-year-old A2 learner, phonological convergence makes Taro-ending feel "safe" | Replace 1 Taro-ending distractor with character from different tale | No |
| 10 | kt-ch10-l4 | ALL Qs | correctIdx=0 in 4/6 (67%) | **P1 R3_KEY_DOMINANCE** | Rebalance | No |
| 13 | kt-ch13-l2-x7 | listen-mc | lens=[18,22,26,29] ratio=1.61 correct=idx1 longest | **P1 R2_LENGTH_TELL** correct option progressively longer in set | Equal-length reformulation | No |
| 11 | kt-ch11-l2-x7 | comprehension | `['all ten of them','just nine','only three','exactly four']` lens=[15,9,10,12] | **P1 R2_LENGTH_TELL** "all ten of them" longest by 1.67× — and it's a distractor, which confusingly makes the correct short option look odd | Balance to ≤1.25× | No |
| 15 | kt-ch15-l2-x4 | grammar-mc | `['can','cans','could to','canning']` ratio=2.67 | **P1 R2_LENGTH_TELL + A3_JUNK** "could to" is ungrammatical (modal + to-infinitive without verb) and "canning" is wrong semantic field | Replace with "could", "could have", "would" | No |
| 9–16 | (159 instances) | listen-mc | correct option is longest in 159/~304 MC questions | **P1 A5_SYSTEMATIC_LENGTH_TELL** 52% of Ch9-16 MC questions give away answer by option length — children will meta-learn "tap longest" within first 2-3 lessons | Systematic reformulation: verify all options within ±1 word of correct length | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters audited | 8 (Ch9–16) |
| Total lessons | 56 |
| Total MC questions examined | ~304 |
| P0 violations | 17 lessons (100% correctIndex=1) + 11 all4-same-start = **28 P0** |
| P1 violations | 35 lessons (≥60% correctIndex bias) + 48 R2 ratio>1.5 + 25 grammar-mc + 159 A5 = **267 P1** |
| P2 violations | 2 capitalization inconsistency |
| validate-lessons.js WARN/FAIL | 1 WARN (Ch16); 0 FAIL |
| Most severe chapter | **Ch11** (95% correctIdx=1; 7/7 lessons biased; multiple P0) |
| Systematic root cause | LLM generation positional bias — correct option placed at idx=1 by default, never reshuffled |

---

## D. Top 5 P0

| Rank | ID | Issue | Impact |
|------|----|-------|--------|
| 🥇 P0-1 | Ch11 entire chapter (7 lessons, 37 Qs) | R3_KEY_DOMINANCE: correctIndex=1 in 95% of MC — "always tap B" works for entire chapter | A 10-year-old metacognitive learner discovers exploit after lesson 1 and never processes audio again |
| 🥈 P0-2 | Ch15 (88%) + Ch16 (91%) + Ch14 (86%) | Same R3 dominance pattern — 3 full chapters where B is almost always correct | 3 chapters × 7 lessons = 21 lessons wasted for any student who figures out the pattern |
| 🥉 P0-3 | kt-ch13-l5-x8: `['put','puts','putting','puted']` | "puted" is not English — non-functional A3 junk distractor, makes item trivially easy AND teaches incorrect morphology | 8-year-old sees "puted" and immediately eliminates it, reducing to 3-option question; worse: encounters a pseudo-word and may internalize it |
| 4 | Ch11-16 grammar-mc (11 items) — all4-same-start | R2_ALL4_SAME_START: All 4 verb forms share same first 3 characters — no visual discrimination possible; length is the only cue | Student scans length of each option and taps longest/past-tense form; zero phonological processing required |
| 5 | A5 systematic length tell (159 instances across Ch9-16) | Correct option is longest in 52% of questions — children quickly learn "tap longest" heuristic | Entire listening practice converted to reading-option-length game; defeats purpose of ELT item |

---

## E. Narrative Voice / Pacing Improvements (3 mandatory per spec)

1. **Ch11-l3-x3 `explanationZh`**: Current: "因為十個太陽使地球過熱了。" — clinical scientific statement. Grandma voice改法: "奶奶說，十個太陽一起出現，地球熱得像一個大烤箱呢！" (具體比喻 + 奶奶語氣 + 驚嘆)

2. **Ch13-l2 narration (Red Riding Hood wolf meeting)**: Current narration uses "The wolf spoke very kindly" — flat. Grandma voice改法: "The wolf smiled his widest smile — the kind that shows just a little too many teeth." (Ghibli-era grandma storytelling tension without horror; age-appropriate for 8-12)

3. **Ch15-l6 (Emperor parades naked)**: Current `explanationZh`: "皇帝其實沒有穿衣服。" — too blunt. Grandma voice改法: "奶奶輕聲笑了——有時候，說真話的人是最小的孩子。" (connects moral to story, adds grandma presence, non-embarrassing for child audience)

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Source Research

**arxiv 2605.01846** — "Do Large Language Models Plan Answer Positions? Position Bias in Multiple-Choice Question Generation" (2026-05):
> "Through extensive experiments with 10 LLMs and 5 VLMs, LLMs exhibit **systematic position biases** during MCQ generation. Hidden representations in the question stem encode predictive signals of the correct answer position — answer position may be **implicitly planned during generation**."

This directly explains the Ch11-16 correctIndex=1 dominance: Pickup's lesson JSON was generated by LLM (likely Claude/GPT-4) without a post-generation shuffle step. The LLM's internal bias placed correct answers at index 1 by default.

**BMC Medical Education 2024** — Item analysis: distractor efficiency:
> "A functioning distractor must attract >5% of examinees. Non-functioning distractors (NFD) reduce item discrimination power. Items with 0 NFD show appropriate difficulty and discriminate well."

**Rodriguez 2005 meta-analysis** (cited in design spec):
> "3 functional distractors ≈ 4 functional for reliability — but 1 non-functional distractor telegraphs the answer and drops discrimination to near-zero."

### Pickup 適配分析

The root cause is **architectural**: lesson JSON is generated by LLM and written directly without a **correctIndex shuffle + balance verification** pass. This is a build-time fix, not a content-rewrite fix.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| **correctIndex shuffle + R3 balance lint in validate-lessons.js** | [arxiv 2605.01846](https://arxiv.org/abs/2605.01846) + TOEIC item writing standard R3 | ✅ Pure build-time fix: `validate-lessons.js` adds R3 check (correctIdx distribution per lesson: each position 15-40%); companion `tools/shuffle-correct-index.js` script auto-rebalances all ch JSON without touching content | Low-Medium (1 lint rule ~20 lines + 1 shuffle script ~40 lines + JSON update pass across 32 chapters) | **Critical** — fixes root cause of 28 P0 + 35 P1 violations, 63 total lesson-level issues in one script pass | **X24 — ARCH-REC #71: R3_CORRECTINDEX_BALANCE_SHUFFLE** |
| Verb-tense grammar-mc: phonologically distinct distractors (different root verbs) | [LookAlike arxiv 2505.01903](https://arxiv.org/pdf/2505.01903) — consistent distractor generation in MCQs | ✅ Applicable: replace [go/goes/went/going] same-root pattern with [went / had gone / was going / used to go] — different prefix lengths, all grammatically plausible | Medium (content rewrite for 25 grammar-mc items) | High — eliminates P0 all4-same-start AND R2 length tell in grammar items simultaneously | ✅ Recommend combined with X24 |
| Distractor efficiency analytics field (`distractorTag`) | [PMC 10461025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10461025/) — functional distractor count vs discrimination | 🟡 Partial: additive JSON field `distractorTag: ('phonological'\|'schema-inference'\|'local-detail'\|'partial-parse')[]` enables future analytics; not needed until player data available | High (tagging all ~900 MC questions) | Medium (future analytics payoff; no immediate user benefit) | Defer to Phase 2.5 post-iOS ship |

### ARCH-REC cockpit entry

```
ARCH-REC #71: X24_R3_CORRECTINDEX_BALANCE_SHUFFLE
Pattern: validate-lessons.js R3 lint (per-lesson correctIndex distribution ≤40% per position) + tools/shuffle-correct-index.js auto-rebalance script
Source: arxiv 2605.01846 (LLM position bias in MCQ generation, 2026) + BMC Medical Education 2024 (distractor efficiency)
Pickup fit: ✅ pure build-time fix; correctIndex shuffle is content-neutral (correct answer stays correct, position changes); eliminates 28 P0 + 35 P1 in one script pass
Effort: Low-Medium (2 scripts ~60 lines total + 1 JSON update pass) | ROI: Critical
Fixes root cause of: Ch11 entire chapter, Ch12-16 key-position bias (63 lesson-level P0/P1)
Audit file: docs/audits/2026-06-24T0009-content-qa-cron.md
```
