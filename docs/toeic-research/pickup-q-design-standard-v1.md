# Pickup Question Design Standard v1

> Synthesized 2026-05-31 from three research streams (TOEIC Part 2 / Part 3-4 / Psychometric item-writing). Source reports in same directory.

## Hard rules (lint MUST enforce)

### R1 — Paraphrase, not echo (TOP rule)
Correct option **MUST NOT** be a substring of `sentence`. Use synonym, hypernym, nominalisation, or pragmatic reformulation.

**Source:** Buck 1991/2001 (verbatim = #1 CIV source). ETS Part 3-4 sample 90-100% paraphrased.

**Lint:** `for each Q: assert(correct_option.lower() not in sentence.lower())`

### R2 — Length parity ≤ 1.25×
`max(len(option)) / min(len(option)) ≤ 1.25`. Prevents "longest option is correct" tell.

### R3 — Key position balance per lesson
Across 12-Q lesson: `count(correctIndex==i) ∈ [3, 4]` for each `i ∈ {0,1,2,3}` (≈25% each ±5%).

### R4 — 4 different failure modes per Q (replaces "1+1+1+1")
The 3 distractors must cover at least 3 of:
- **phonological confusion** (rhymes / minimal pair / phonetic decoy)
- **local-detail substitution** (right concept, wrong specific — "4th" vs "14th")
- **schema-driven inference** (plausible from world knowledge but unsupported by audio)
- **partial parse** (catches half the sentence semantics)

**Banned:** "obvious-miss" / "junk distractor" — non-functional. Rodriguez meta-analysis: 3 functional ≈ 4 functional for reliability,但 1 non-functional 透露答案。

### R5 — Cross-question Jaccard < 0.4
For any two Qs in same lesson, content-word overlap < 40%. Catches Q1↔Q5 duplication.

**Lint:** `jaccard(stopword_filter(q1.question_words), stopword_filter(q2.question_words)) < 0.4`

### R6 — Sub-skill variety per 12-Q lesson
Tag each Q with one of `gist | detail | inference | vocab | function`. Lesson must contain:
- ≥ 3 gist
- ≥ 5 detail
- ≥ 2 inference
- ≥ 2 vocab/function

No 2 consecutive Qs with same sub-skill.

### R7 — WH-question distribution
For listen-mc / listen-comprehension prompts:
- WH 40-55%, Yes/No 25-30%, rest tag/negative/choice
- WH internal: What > When ≈ Where > Who ≈ How > Why > Which
- Stem ≤ 8 words (Pickup tighter than TOEIC's ≤ 10)
- Single sentence ending `?`

### R8 — A2 calibration
- GSL-2000 vocab in options
- No tag/negative questions in stem
- Audio ≤ 130 wpm (Pickup uses 0.7 rate ≈ 105 wpm — comfortably under)
- explicit answers OK for ~30-40% (A2 floor), indirect for ~60-70% (push toward B1)

## Anti-patterns (BANNED)

| # | Pattern | Detect | Example |
|---|---------|--------|---------|
| **A1** | Verbatim give-away | `option ⊆ sentence` | sentence "I am stray" + option "stray" |
| **A2** | Generic phonetic prompts | regex banned list | "Which word did you hear?" |
| **A3** | Junk/obvious-miss distractor | manual review | options [happy, sad, blue, refrigerator] for "How is Mochi?" |
| **A4** | Grammar mirror | same VP structure | Q: "Where do you go?" → option "I go to school" (Yes/No expected) |
| **A5** | Length tell | R2 violation | longest option = correct |
| **A6** | Question contains answer | `option ⊆ question` | Q: "Mochi is a stray cat. What kind?" + A: "stray" |
| **A7** | Repeated content-word as correct | TOEIC trap inverted | sentence "meeting at 3pm" + Q "what time?" + A "3pm" — should be paraphrased to "afternoon" |

## Question type taxonomy (Pickup-specific)

| `type` | Cognitive op | Sub-skill | Audio queue |
|--------|--------------|-----------|-------------|
| `listen-mc` | direct detail | detail / vocab | sentence → question → A-D options |
| `listen-comprehension` | gist / inference | gist / inference | sentence → question → A-D options |
| `listen-emoji` | concept ↔ visual mapping | vocab | sentence → question → A-D options |

Distribute per 12-Q lesson:
- ~3 gist (listen-comprehension type)
- ~5 detail (listen-mc, paraphrased)
- ~2 inference (listen-comprehension)
- ~2 vocab/function (listen-emoji or listen-mc with concept)

## Distractor failure-mode tagging

Schema extension proposal (additive, optional):
```ts
optionsFailureMode?: ('correct' | 'phonological' | 'local-detail' | 'schema-inference' | 'partial-parse')[]
```

Allows analytics: which failure mode catches A2 learners most? Iterate distractor mix.

## Cross-references

- TOEIC Part 2 research: `part2-question-logic.md`
- TOEIC Part 3-4 research: `part3-4-comprehension-design.md`
- Psychometric standards: `listening-item-writing-standards.md`
- Memory rule: `feedback-pickup-q-prompt-quality` (update with R1 + A6 + A7)
- Memory rule: `feedback-pickup-q-design-standard` (NEW — references this doc)

## Apply-agent prompt template

When rewriting questions against this standard, agent must:
1. Verify every Q passes R1 (sentence does not contain correct option literal)
2. Verify R2 length parity
3. Tag each Q with sub-skill
4. Verify R5 Jaccard cross-Q
5. Verify R6 variety per lesson (rebalance if monotonic)
6. Generate failure-mode tag per distractor
7. Output diff summary + lint report
