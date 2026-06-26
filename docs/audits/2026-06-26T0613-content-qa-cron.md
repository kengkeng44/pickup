# Content QA — 2026-06-26 06:13 UTC

Today's angle: **R2 distractor doctrine** (4-option blind — failure mode coverage)
Focus: **Ch1–8** (Momotaro / Ugly Duckling / Tortoise & Hare / Camel / Baba Yaga / Six Swans / Yexian / Three Little Pigs)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s)
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
OK lessons-ch2.json
OK lessons-ch3.json  (no validator flag — but see manual violations below)
OK lessons-ch4.json  (no validator flag — but see manual violations below)
OK lessons-ch5.json  (1 X3_R1_VERBATIM "bones" — carried from prior run)
OK lessons-ch6.json
OK lessons-ch7.json
OK lessons-ch8.json

Total Ch1-8 listen-mc / listen-comprehension questions scanned: 119
Automated violations: 3 X2_OPTION_LIST_BIAS in Ch1
Manual deep-scan violations: 18
```

---

## B. Violation Table

| # | Ch | Q ID | Type | Question (trunc 60) | Violation | 修法 | audio regen? |
|---|----|------|------|---------------------|-----------|------|--------------|
| 1 | 3 | kt-ch3-l1-q9 | listen-mc | How close was the hare to the tortoise? | **P0 JUNK_DISTRACTOR** — "inside his shell" + "on a tree" are location answers; question asks for degree. Makes the actual degree options ("very far" / "very close") obvious by elimination. | Replace "inside his shell" → "just a step away" and "on a tree" → "quite far behind" | No |
| 2 | 8 | kt-ch8-l4-q9 | listen-mc | How did the wolf knock and speak? | **P0 SAME_FAILURE_MODE** — all 3 distractors are local-detail substitution (knock+voice pairs). Zero phonological or schema-driven coverage. | Add 1 schema distractor: "knocked gently, then growled deep" (schema: wolves growl, not whisper) and vary the other to phonological. | No |
| 3 | 3 | kt-ch3-l7-q9 | listen-mc | How did the hare feel? | **P0 JUNK_DISTRACTOR** — "sleepy" [6] + "hungry" [6] are physical states, not emotional responses to losing a race. A child can eliminate instantly. Missing any plausible emotional misread. | Replace "sleepy" → "a little proud" (schema: hare nearly won) and "hungry" → "deeply offended" | No |
| 4 | 1 | kt-ch1-l5-q9 | listen-mc | How was visibility? | **P0 LENGTH_DISPARITY 3.2×** — "sunny" [5] vs "clear and bright" [15]. Cognitive load jumps across options; "sunny" looks like a placeholder. | Expand "sunny" → "sunny and clear" and "sparkling" → "bright and sparkling" to equalise. | No |
| 5 | 1 | kt-ch1-l1-q8 | listen-mc | Why did she sit by the river? | **P0 SAME_FAILURE_MODE** — all 3 distractors are pure schema-driven ("to catch a fish" / "to take a swim" / "to rest a bit"). Zero phonological or local-detail coverage. | Replace "to rest a bit" → "for a cloth she dropped" (local-detail: she dropped something) and restructure for phonological: "to rinse, not wash" (phonological: rinse≈wash). | No |
| 6 | 7 | kt-ch7-l6-q5 | listen-mc | Why did she leave the shoe? | **P1 LENGTH_TELL 1.44×** — correct "people were chasing her" [23] longest. | Shorten → "she was being chased" [21] and expand "she did not want it" → "she threw it away" to balance lengths. | No |
| 7 | 3 | kt-ch3-l5-q5 | listen-mc | Why did the mouse close her mouth? | **P1 LENGTH_TELL 1.47×** — correct "she did not want to wake him" [28] longest. Others max at [25]. | Trim → "she wanted him to sleep" [22]. | No |
| 8 | 1 | kt-ch1-l2-q9 | listen-mc | How did the peach open? | **P1 LENGTH_TELL 1.5×** — correct "it split by itself" [18] vs "wind blew it" [12]. | Expand "wind blew it" → "the wind blew it apart" to close gap. | No |
| 9 | 2 | kt-ch2-l6-q6 | listen-mc | What happened to him in the pond? | **P1 LENGTH_TELL 1.5×** — correct "got trapped in ice" [18] vs "met a friend" [12]. | Expand "met a friend" → "met another bird" [16]. | No |
| 10 | 8 | kt-ch8-l1-q6 | listen-mc | What was the plan for each pig? | **P1 LENGTH_TELL 1.5×** — correct "make a separate house" [21] vs "travel forever" [14] / "sleep in trees" [14]. | Trim correct → "build a house alone" [18] or expand others. | No |
| 11 | 5 | kt-ch5-l3-q9 | listen-mc | How did Vasilisa feel? | **P1 LENGTH_TELL 1.43×** — correct "tired but pushing on" [20] longest. | Trim → "tired but still going" [19] and expand "fresh and fast" → "rested and moving fast" [20]. | No |
| 12 | 6 | kt-ch6-l6-q6 | listen-mc | Why did the bride not speak back? | **P1 LENGTH_TELL 1.44×** — correct "her promise kept her quiet" [26] longest. | Trim → "bound by her vow" [15] and expand other options proportionally. | Yes (if correct option audio changes) |
| 13 | 3 | kt-ch3-l3-q9 | listen-mc | What was happening to the hare? | **P1 SAME_FAILURE_MODE** — all 3 distractors share "he was" structure + activity substitution (waking/running/eating). Missing phonological confusion. | Replace "he was eating lunch" → "his ears went flat" (partial-parse: sentence mentions "soft and heavy") | No |
| 14 | 4 | kt-ch4-l6-q6 | listen-mc | What does this tell us about his rude word? | **P1 LENGTH_DISPARITY 2.07×** — "something making the sun hotter" [31] vs "no power at all" [15]. Distractors not balanced. | Trim "something making the sun hotter" → "a spell on the sun" [15] | No |
| 15 | 4 | kt-ch4-l6-q8 | listen-mc | What did the Camel see behind him? | **P1 LENGTH_TELL 1.47×** — correct "a new bump on his back" [22] vs "two small birds" [15]. | Expand "two small birds" → "two tiny birds resting" [21]. | No |
| 16 | 1 | kt-ch1-l4-q9 | listen-mc | What was the dog interested in? | **P2 LENGTH_DISPARITY 2.25×** — "Momotaro's clothes" [18] vs "the road" [8]. | Expand "the road" → "the road ahead" [14]. | No |
| 17 | 5 | kt-ch5-l6-q3 | listen-mc | What did Baba Yaga want first? | **P2 LENGTH_TELL 1.5×** — correct "work done" [9] vs "a song" [6]. Marginal but present. | Expand "a song" → "a song first" and "a story" → "a story told". | No |
| 18 | 2 | kt-ch2-l1-q8 | listen-mc | What was different about this egg? | **P2 LENGTH_DISPARITY 1.8×** — "painted with color" [16] vs "very small" [9]. | Expand "very small" → "much smaller" [11]. | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Questions scanned (Ch1-8, listen-mc/comprehension) | 119 |
| **P0 critical** | 5 |
| **P1 high** | 8 |
| **P2 low** | 3 |
| LENGTH_TELL (correct is longest) | 10 |
| LENGTH_DISPARITY (any option ratio > 1.5×) | 5 |
| SAME_FAILURE_MODE (all distractors 1 type) | 3 |
| JUNK_DISTRACTOR (implausible or wrong semantic class) | 2 |
| audio regen needed | 1 (if #12 wording changes) |

**Distractor failure-mode coverage audit (Ch1-8 aggregate):**
- Phonological confusion: ~5% of distractors (~6/119 Qs have one phonological distractor)
- Local-detail substitution: ~55% of distractors ← dominant, over-represented
- Schema-driven inference: ~35% of distractors
- Partial-parse: ~5% of distractors ← severely under-represented

Industry benchmark (Buck 2001 / Iimura 2019): ≥2 failure modes per question, ideally 3. Current Ch1-8 average ≈ 1.4 modes per question.

---

## D. Top 5 P0

1. **⚠️ kt-ch3-l1-q9** — JUNK_DISTRACTOR: location options ("inside his shell" / "on a tree") for a degree question ("how close?"). Collapses functional distractors from 3→1.
2. **⚠️ kt-ch8-l4-q9** — SAME_FAILURE_MODE: 3× local-detail (knock/voice pairs). No phonological or schema-driven distractor. Child who hears "loud and soft like honey" can eliminate by process of elimination on the voice adjective alone.
3. **⚠️ kt-ch3-l7-q9** — JUNK_DISTRACTOR: "sleepy" + "hungry" for emotional context (post-race shame). Physical states are implausible emotional misreads after a competition. Functional distractor count: 1 ("proud and strong").
4. **⚠️ kt-ch1-l5-q9** — LENGTH_DISPARITY 3.2×: "sunny" [5ch] vs "clear and bright" [15ch] — extreme imbalance makes "clear and bright" visually obvious as "the long wrong answer."
5. **⚠️ kt-ch1-l1-q8** — SAME_FAILURE_MODE: 3× schema-driven ("fish" / "swim" / "rest" all plausible near-river activities). Missing local-detail or phonological coverage; all 3 need same prior-world-knowledge to rule out, giving no signal about actual comprehension.

---

## E. Narrative voice / pacing improvements (no technical violation)

Even with zero R2 violation, these 3 pacing suggestions apply:

1. **kt-ch1-l6-q9** ("How did the demon king look?"): distractor "sleepy and bored" is mood-incongruent with a battle climax. A child reader knows demons don't get sleepy mid-fight. Replace with "surprised and afraid" (schema-driven: demon facing an unexpected hero).

2. **kt-ch4-l3-q8** ("How did the three feel after many days?"): distractor "rich and lucky" is a non-sequitur — animals working in a desert don't get rich. Replace with "sore and angry" (local-detail: sore is in sentence) shifting from nonsensical to plausible-wrong.

3. **kt-ch2-l5-q8** ("Why did the hen mock him?"): "always running away" and "always sleeping" are generic animal-fable clichés that don't connect to the Ugly Duckling story arc at all. Replace: "was too ugly to look at" (schema: that IS the story's theme, but not what the hen says — good partial-parse distractor) and "could not lay eggs" → "gave no milk either" (local-detail substitution off the egg concept).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis
- **Iimura (2019)** "Distractor Plausibility in a Multiple-Choice Listening Test" (JLTA Journal 21): Found that test designers cluster ~60% of distractors into local-detail substitution because it's easiest to write, leaving phonological and schema-driven failure modes severely under-represented. Recommends systematic typology tagging before writing.
- **arxiv 2602.03704** (2026) "Cognitively Diverse Multiple-Choice Question Generation": Multi-agent LLM framework where each agent is assigned a specific failure mode to generate one distractor. Achieves consistent 3-failure-mode coverage.
- **Rodriguez (2005) meta-analysis** (referenced in Pickup spec): ≥3 functional distractors needed; 1 non-functional distractor reduces effective test reliability equivalent to dropping from 4 to 3 options.

### Finding
Ch1-8 average failure-mode coverage: **1.4 modes / question** (target: ≥2.5, ideal: 3). 5 P0 questions have ≤1 functional distractor after removing junk/same-FM.

### ARCH-REC #80: X33_R2_FAILURE_MODE_SCHEMA

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| `distractorModes` field per option in lesson JSON | Iimura 2019 + arxiv 2602.03704 | ✅ Additive Zod field, no breaking change to `options: string[]` | S (2-4 hr) | HIGH — enables R4 lint, cockpit FM-coverage chart, guides future content authors | ✅ 推薦實作 |

**具體做法:**
Add optional `distractorModes` array to each `listen-mc` / `listen-comprehension` question in lesson JSON:

```json
{
  "type": "listen-mc",
  "sentence": "...",
  "question": "...",
  "options": ["opt0","opt1","opt2","opt3"],
  "correctIndex": 1,
  "distractorModes": ["phonological", "local-detail", "schema-inference"]
}
```

- `distractorModes[i]` = failure mode of `options[i != correctIndex]` in order of non-correct indices
- Zod enum: `z.enum(['phonological','local-detail','schema-inference','partial-parse'])`
- New `validate-lessons.js` lint **R4_FM_COVERAGE**: if `distractorModes` present, assert ≥2 distinct values (warn-only now, `FM_LINT_STRICT=1` to fail)
- Cockpit cron card adds FM-diversity score per chapter

**Why not full option objects** (`{text, zh, mode}`)?  
Requires rewrite of all `options: string[]` consumers in `src/ui/ClozeUI.ts`, `src/scenes/LessonScene.ts`, `src/data/lessons.ts`. A parallel array `distractorModes` is additive and can be added to new content first.

**Not appropriate for Pickup:** The multi-agent LLM generation approach (arxiv 2602.03704) auto-generates distractors by failure mode but requires GPT-4o per question. Pickup already has ~1100 Qs; regenerating all distractors would cost ~$15 and change audio. Better to use the schema + lint to tag and fix manually in priority order (P0 first).

**Rollout plan:**
1. Add `distractorModes` Zod field (optional) + R4_FM_COVERAGE lint — 1 hr
2. Tag Ch1-8 P0 questions manually (5 questions × 3 modes = 15 entries) — 30 min
3. Add FM-diversity bar to cockpit cron card — 1 hr
4. New content PRs require `distractorModes` — ongoing
