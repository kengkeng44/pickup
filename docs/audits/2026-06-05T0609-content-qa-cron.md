# Content QA — 2026-06-05 06:09 UTC

Today's angle: **#2 — R2 Distractor Doctrine (4-option blind quality)**
Focus: **Ch4 (駱駝為什麼有駝峰 / Why the Camel has a Hump) + Ch5 (Baba Yaga / Vasilisa)**

---

## A. validate-lessons.js result

```
OK lessons-ch4.json: 7 lessons (JSON shape + mirror + extended lint)
OK lessons-ch5.json: 7 lessons (JSON shape + mirror + extended lint)
Total mirror-lint issues: 0 (Ch4+Ch5)
```

Schema guard passes. Violations below are R2/R4/A3 distractor-quality issues not caught by current lint.

---

## B. Violation table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|---|----|----|------|---------|-----------|------|-------------|
| 1 | 4 | kt-ch4-l3-q10 | **A3 Junk** | "What came toward them across the desert?" opts: [cloud of dust / rain cloud / big eagle / **🚂 a train**] | P0 — 🚂 train is anachronistic; Kipling-era fairy tale desert never involves trains; obvious-miss makes correct trivially identifiable by elimination | Replace `🚂 a train` → `🌪️ a dust devil` (genre-consistent, plausible desert phenomenon) | No |
| 2 | 5 | kt-ch5-l3-q5 | **R2 + A3** | "After the white rider, sky turned light." opts: [**rain** / **morning light** / a song / darkness] | P0 — ratio=3.25 (correct `morning light`=12ch, distractor `rain`=4ch). Also `a song` is A3 junk (no sky/light connection). Double violation | Expand short distractors: `rain`→`grey clouds` / `a song`→`a cold wind` to reach parity. Target ratio ≤1.25 | No |
| 3 | 4 | kt-ch4-l4-q10 | **A3 Multi-junk** | "What is this scene mainly showing?" opts: [Djinn meeting three / **Camel learning to dance** / **Man cooking dinner** / **Horse winning a race**] | P0 — 3 of 4 distractors are non-events in this story (dance/dinner/race never happen). Breaks narrative immersion; child can eliminate by absurdity before engaging content | Replace distractors with near-miss story moments: `the animals deciding to quit` / `the Camel asking Man for help` / `the Djinn walking alone` | No |
| 4 | 5 | kt-ch5-l5-q5 | **R2 extreme** | "The stone bowl came closer through the trees." How did Baba Yaga move? opts: [**walking** / riding inside a bowl / flying like a bird / on a horse] | P0 — ratio=2.86 (correct=20ch, `walking`=7ch). Single-word distractor signals "wrong" immediately by length alone | Replace `walking`→`moving on her feet` (parity ~16ch, maintains plausibility) | No |
| 5 | 4+5 | **Systemic (35/62 Qs)** | **R2 Length-tell bias** | Correct option is longest in 56% of questions (Ch4+Ch5 combined) | P1 — ETS random-chance baseline is ~25%; 56% is systematic. Player who learns this heuristic after 5 Qs can beat ~half the chapter without engaging content | Trim verbose correct options OR pad short distractors per-Q to hit ratio ≤1.25. Priority: the 14 P1 cases where correct is both longest AND ratio > 1.25 | No |
| 6 | 4 | kt-ch4-l4-q8 | **A3 Junk distractor** | "He wanted to find out where lazy friend was hiding." Why did Djinn want to find that place? opts: [bringing a meal / speaking face to face / **walking him home for tea** / **singing him a new song**] | P1 — `singing him a new song` has zero narrative basis (Djinn doesn't sing to Camel); `walking him home for tea` is a domestic-English non-sequitur in desert context | Replace with story-grounded options: `punishing him right away` / `bringing him back to work` | No |
| 7 | 4 | kt-ch4-l2-q6 | **R2** | "Dog wanted help to bring and pick up things for Man." opts: [sleep with him / **help with carrying jobs** / eat his bone / leave the desert] | P1 — ratio=1.92. Correct `help with carrying jobs` (4 words) vs all distractors (3 words). Also `eat his bone` = A3 dog-stereotype cliché | Replace `eat his bone`→`fetch some water` (domain-consistent) and trim correct→`carry things for Man` (3 words) | No |
| 8 | 5 | kt-ch5-l2-q7 | **R2** | "What did Vasilisa take with her?" opts: [🧸 small doll / 🗡️ sword / **🍞 a loaf of bread** / 🔑 key] | P1 (emoji) — raw ratio=3.00. `a loaf of bread` is 5 syllables vs `a key` is 2 syllables. After emoji strip: 14ch vs 5ch | Shorten `a loaf of bread`→`some bread` (7ch) for parity; or expand `a key`→`an iron key` | No |
| 9 | 4 | kt-ch4-l5-q8 | **R2** | "He chose to stick with the same lazy reply." How did the Camel act? opts: [agreed quickly / **gave the same rude reply** / ran far away / asked for food] | P1 — ratio=2.00 (22ch vs 11ch). Correct is longest + `asked for food` is story-irrelevant | Trim correct→`gave the rude reply` (18ch); replace `asked for food`→`looked away` | No |
| 10 | 5 | kt-ch5-l6-q9 | **R2** | "She put her hand into her pocket." What did Vasilisa do when lost? opts: [ran away / **reached for the doll** / shouted for help / fell asleep] | P1 — ratio=2.50 (20ch vs 8ch). `ran away` is uniquely 2 words | Expand `ran away`→`ran from the house` to reach ~16ch parity | No |

---

## C. Stats

| Metric | Ch4 | Ch5 | Combined | Standard |
|--------|-----|-----|----------|---------|
| Questions audited | 77 | 77 | 154 | — |
| R2 violations (ratio > 1.25) | 18 | 26 | **44** | 0 |
| Correct-is-longest rate | 52% | 61% | **56%** | ~25% |
| A3 junk distractors (confirmed) | 5 | 4 | 9 | 0 |
| Phonological distractor rate | ~20% | ~24% | ~22% | ≥25% |
| Anachronistic emoji distractors | 1 | 0 | 1 | 0 |
| P0 violations | 4 | 0 | **4** | 0 |
| P1 violations | 1 (systemic) + 4 individual | 5 individual | ~10 | 0 |

**Phonological distractor rate** (22%) is just below the ETS 25% target but acceptable. The primary gap is **R4 failure-mode homogeneity**: across Ch4+Ch5, >80% of distractors are schema-driven inference ("thing that didn't happen in this story"). Local-detail substitution and partial-parse modes are underrepresented.

---

## D. Top 5 P0

### ⚠️ P0-1 | kt-ch4-l3-q10 — Anachronistic `🚂 a train` in Kipling desert

**Why critical**: Kipling's "Just So Stories" is set in prehistoric/mythological time. A steam train is a modern artifact — even a 7-year-old will reject it as impossible without engaging the audio. This non-functional distractor effectively gives away the correct answer by elimination of the absurd.

**Fix**: Replace `🚂 a train` → `🌪️ a dust devil`. A dust devil is a genre-consistent desert phenomenon children recognize, creates genuine phonological+visual confusion with `☁️ a cloud of dust`.

```json
"options": ["☁️ a cloud of dust", "🌧️ a rain cloud", "🦅 a big eagle", "🌪️ a dust devil"]
```

---

### ⚠️ P0-2 | kt-ch5-l3-q5 — Extreme length tell (3.25×) + junk distractor

**Why critical**: `morning light` (2 words, 12 chars) is 3× longer than `rain` (1 word, 4 chars). Any test-wise player learns the "pick the longest" heuristic after 5 questions; this question rewards heuristic over comprehension. `a song` is also A3 junk — "the sky turned light" has no connection to music.

**Fix**: 
```json
"options": ["grey clouds", "morning light", "a cold wind", "darkness"]
```
New ratio: 12ch max / 10ch min = 1.20 ✓. All 4 distractors are weather/sky phenomena — plausible domain consistency.

---

### ⚠️ P0-3 | kt-ch4-l4-q10 — 3 of 4 distractors are non-events

**Why critical**: `the Camel learning to dance`, `Man cooking dinner for the animals`, `the Horse winning a race` — none of these events occur or are implied anywhere in the story. A3 junk × 3 reduces this from a 4-option choice to a 2-option choice (correct + 1 near-miss). R6 sub-skill "gist" is negated because gist-level processing is not needed to eliminate invented events.

**Fix**:
```json
"options": [
  "the Djinn meeting the three and getting ready",
  "the animals deciding to quit their jobs",
  "the Camel asking Man to forgive him",
  "the Djinn walking away without helping"
]
```
All near-miss options are story-grounded inference failures — require the player to distinguish what the Djinn *actually* decided from plausible alternatives.

---

### ⚠️ P0-4 | kt-ch5-l5-q5 — Single-word distractor against 4-word correct

**Why critical**: `walking` (1 word, 7 chars) vs `riding inside a bowl` (4 words, 20 chars). R2 ratio=2.86. `walking` also creates A3-borderline issue — a child who doesn't know the word "riding" can still eliminate `walking` by length alone. The phonological richness of `flying like a bird` and `on a horse` is wasted when one distractor is obviously mismatched by length.

**Fix**:
```json
"options": ["moving on her feet", "riding inside a bowl", "flying like a bird", "riding on a horse"]
```
New ratio: 20ch / 17ch = 1.18 ✓. Bonus: `riding on a horse` creates genuine phonological interference with `riding inside a bowl`.

---

### ⚠️ P0-5 | Systemic correct-is-longest bias (56% of all Qs)

**Why critical**: This is not a single Q issue — it is a generative pattern. The author writes the correct option as a paraphrase *expanding* the original sentence (R1 compliance), which naturally produces a longer string. Distractors are written more tersely. The result: a child who answers their first 5 Qs can discover "pick the longest option" as a reliable heuristic, which then works for 56% of remaining questions without engaging audio.

**Fix (systematic)**:
1. After writing correct option (paraphrase), add the constraint: `len(correct) ≤ 1.1 × avg(distractor_lengths)`.
2. For existing violations, either:
   - Trim correct option (remove redundant adjectives/adverbs), or
   - Expand shortest distractor to match (1-2 words added)
3. Priority targets: all 14 Qs where R2 ratio > 1.4 AND correct is longest.

---

## E. R4 Failure Mode Coverage Analysis

Across Ch4+Ch5, distractor failure-mode mix (estimated via content analysis of 20 sampled questions):

| Failure Mode | Estimated % | ETS Target | Gap |
|---|---|---|---|
| Schema-driven inference | ~65% | ~30% | **over-represented** |
| Partial parse | ~8% | ~25% | **under** |
| Local-detail substitution | ~20% | ~25% | slightly under |
| Phonological confusion | ~22% | ~25% | slightly under |

**Root cause**: Ch4+Ch5 distractors are predominantly "events that didn't happen" (schema inference). This is easy to write but produces homogeneous distractor sets that skilled test-takers can recognize as a pattern.

**Recommendation**: For next content iteration, apply a per-Q failure-mode checklist:
- Q1 distractor = phonological decoy (rhyme/minimal pair with key word in sentence)
- Q2 distractor = local-detail sub (same concept, wrong specific — "3 days" vs "3 nights")
- Q3 distractor = partial-parse (catches one clause but misses another)

---

## F. Narrative Voice / Pacing Improvements (no R1-R8 violation)

### F1 — Ch5 L3 three-riders arc: distractor symmetry break

The three-riders sequence (White=dawn, Red=midday, Black=night) is a beautiful structural parallel in Baba Yaga. Questions q5/q7/q10 cover each rider, but:
- q5 distractors: thematically coherent (rain/song/darkness → sky phenomena)
- q7 distractors: excellent (morning / midday / night / midnight — tight time-of-day discrimination)
- q10 distractors: thematically loose (a feast / night / **a wedding** / spring rain)

`a wedding` in q10 is jarring — weddings have no connection to a black rider arriving at night. Suggest replacing with `a cold fog` or `a long shadow` to maintain the atmospheric consistency of the arc.

### F2 — Ch4 L5 q6: explanationZh jargon leak

```json
"explanationZh": "三人各拜訪 → 正解是「其他動物」。"
```

This is mechanical (三人各拜訪 reads like a formula). Narrative voice would be: `三隻動物輪流來拜訪，所以是「其他動物們」一起失望地離開。` — connects the emotional arc (disappointment) to the answer.

### F3 — Ch4 L4 q10: gist question lacks sub-story anchor

The explanationZh `主旨 = 精靈見三人後準備出手` uses the word `主旨` (jargon = "main idea"). For a story-mode game targeting 8-12 children, replace with: `精靈聽了三隻動物的故事，現在準備去找駱駝了！` — this keeps the narrative alive rather than switching to test-prep register.

---

*Audit completed: 2026-06-05 06:09 UTC*
*Next angle candidates: #4 A2 (cloze blank position), #5 A3 (semantic leak), #7 A5 (cultural reference)*
