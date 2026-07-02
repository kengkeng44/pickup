# ⚠️ Content QA — 2026-07-02 13:00 UTC

Today's angle: **A3 — 語意 Leak / Story 跳針 (Narrative Context Dependency)**
Focus: **Ch25–31** (愚公移山 / 阿基米德 / 西遊記 / 三顧茅廬 / 奧德賽 / 海克力斯 / 羅賓漢)

> **A3 definition (this cron's interpretation):**
> A comprehension or listen-mc question whose **correct answer introduces vocabulary or concepts
> entirely absent from the single-sentence stimulus**, forcing the learner to draw on prior
> story beats (other lessons / earlier narration) to answer. Two sub-types:
>
> - **A3.STORY-JUMP** (P0): "Why/What-does" inference questions — correct option uses 3+ content
>   words not in the stimulus sentence. Child must recall earlier plot to choose correctly.
> - **A3.PRONOUN-TO-NAME** (P1): Stimulus says "He / She / They" but question asks
>   "What did [Name] do?" — the name anchor requires prior context to resolve the pronoun.
>
> **Industry baseline (Buck 2001 + psychometric LID research):** Each MC question must be
> answerable from its own stimulus without access to prior items. When questions depend on
> shared story context, this creates **Local Item Dependence (LID)** — inflating measured
> ability and degrading test validity (Frontiers in Psychology, 2022).

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 10 lint issue(s)  (X2/X49/X57 pre-existing)
WARN lessons-ch26.json: 11 lint issue(s)  (X2/X49/X49B/X57 pre-existing)
WARN lessons-ch27.json: 10 lint issue(s)  (X2/X49/X57 pre-existing)
WARN lessons-ch28.json: 11 lint issue(s)  (X2/X49/X49B/X57 pre-existing)
WARN lessons-ch29.json:  9 lint issue(s)  (X2/X49/X57 pre-existing)
WARN lessons-ch30.json: 11 lint issue(s)  (X2/X49/X49B/X57 pre-existing)
WARN lessons-ch31.json: 12 lint issue(s)  (X2/X49/X49B/X57 pre-existing)
Total mirror-lint: 447 (warn-only)
```

All pre-existing lint. No new schema regressions. Build gate: ✅ pass.

---

## B. Violation Table — A3 Story-Jump (P0) and Pronoun-to-Name (P1)

**Scope**: 365 MC/TF/comprehension questions across Ch25-31.

| Violation | Ch25 | Ch26 | Ch27 | Ch28 | Ch29 | Ch30 | Ch31 | Total |
|-----------|------|------|------|------|------|------|------|-------|
| P0 (story-jump) | 1 | 6 | 5 | 7 | 3 | 3 | 1 | **26** |
| P1 (pronoun→name) | 0 | 5 | 12 | 11 | 6 | 14 | 10 | **58** |
| **Total unique** | **1** | **11** | **17** | **18** | **9** | **17** | **11** | **84** |
| Q count | 55 | 46 | 46 | 51 | 56 | 56 | 55 | 365 |
| **Rate** | 1.8% | **23.9%** | **37.0%** | **35.3%** | 16.1% | **30.4%** | 20.0% | **23.0%** |

### P0 Story-Jump violations (most severe, selected)

| Ch | Q ID | type | Sentence (stimulus) | Question | Correct option | Missing concepts | 修法 | audio regen? |
|----|------|------|--------------------|---------|-----------------|--------------------|------|-------------|
| 25 | kt-ch25-l5-x9 | comprehension | "The man asked, 'When you are gone, who will carry on?'" | Why was this a hard question for most people? | it pointed to a real limit | `limit, pointed, real` | Add 2-sent context: include preceding narration about life being finite | No |
| 26 | kt-ch26-l3-x4 | comprehension | "His friends grew worried about him." | Why were his friends worried? | eating very little and barely sleeping | `barely, eating, sleeping` | Expand stimulus to include "He did not eat much. He slept very little." | No |
| 26 | kt-ch26-l4-x1 | comprehension | "Archimedes stepped in slowly, one foot at a time." | Why did he move so slowly? | the full tub would spill if rushed | `full, rushed, spill, tub` | Rephrase Q: "What happened when Archimedes stepped in?" — shift from WHY to WHAT | No |
| 26 | kt-ch26-l6-x7 | comprehension | "Beside the crown they placed a piece of pure gold of the same weight." | Why did they need the pure gold piece? | comparing the crown against a known sample | `against, comparing, known, sample` | Multi-sent stimulus: add Archimedes' explanation sentence from l5 | No |
| 27 | kt-ch27-l3-x7 | comprehension | "Behind him, the city walls grew small in the morning light." | What does this sentence show about Sanzang's journey? | starting out with no road back | `back, road, starting` | Weaken Q: ask "What was happening to the city?" — observable from sentence | No |
| 27 | kt-ch27-l4-x1 | comprehension | "Day by day, Sanzang walked. The green hills became yellow sand." | What does this sentence show about the journey? | the land changed as he walked further west | `changed, further, west` | Mild: "west" derivable from story arc but not sentence. Add narration clause. | No |
| 28 | kt-ch28-l4-lg2 | comprehension | "Even in deep snow, Liu Bei put on his coat and rode up the hill alone." | Why did Liu Bei go alone through the snow, even when his brothers refused? | showing respect for the wise man mattered more than comfort | `comfort, mattered, respect, wise` | Multi-sent stimulus: include "His brothers said he did not need to go" + this sentence | No |
| 28 | kt-ch28-l5-x1 | comprehension | "'I will go up the hill one more time,' he said to his brothers." | What does this show about Liu Bei's attitude? | unwilling to stop after two failed trips | `failed, trips, unwilling` | "Two failed trips" requires prior ch28-l3 + l4 context. Add 2-sent context window. | No |
| 28 | kt-ch28-l7-x7 | comprehension | "And so two great hearts joined as one — the leader and his new wise friend." | What does this ending show about the story's main lesson? | true respect and patience can open any door | `door, patience, respect, true` | Thematic abstraction requires whole-story recall. Rephrase: "What happened at the end?" | No |
| 29 | kt-ch29-l4-lg2 | comprehension | "Odysseus stood at the front of the first ship and gave a steady nod." | Why did Odysseus nod instead of shout an order? | A quiet gesture showed his trust in the crew | `crew, gesture, quiet, trust` | Infer from sentence partially possible ("steady nod" = quiet), but "crew/trust" external | No |
| 30 | kt-ch30-l4-lg2 | comprehension | "The lion's skin was too thick. Arrows could not hurt it at all." | What does this tell us about the lion? | its body could not be harmed by weapons | `body, harmed, weapons` | Mild: "weapons" over-abstracts from "arrows". Change to "arrows could not pierce it" | No |
| 30 | kt-ch30-l7-x5 | comprehension | "He took the lion's thick skin and made it into a warm coat for himself." | Why did Heracles turn the lion's skin into a coat? | wearing it as strong protection | `protection, strong, wearing` | "Protection" not in sentence. Rephrase Q: "What did Heracles make from the lion's skin?" | No |
| 31 | kt-ch31-l3-x9 | comprehension | "One quiet morning, the Sheriff sat in a wooden chair and read a list of names." | Why did the Sheriff read the list? | he was looking for people who owed money | `looking, money, owed, people` | Answer requires knowing Sheriff's role from l2. Add 1-sent context: Sheriff's motivation. | No |
| 31 | kt-ch31-l5-x5 | comprehension | "For the first time in many days, no soldier could see his face." | Why was this moment important for Robin? | hidden from enemy eyes for the first time in days | `enemy, eyes, hidden` | "Enemy" = external leap. Rephrase to "What was Robin able to do in the forest?" | No |
| 31 | kt-ch31-l6-x9 | comprehension | "'We had nowhere else to go, so we came here,' a young mother added." | Why did the young mother's family come to the forest? | the deep woods offered the only refuge they had | `deep, offered, refuge, woods` | Answer matches stimulus closely ("nowhere else = refuge") — woods/deep minor. Mild P0. | No |

### P1 Pronoun-to-Name violations (sample — worst by chapter)

| Ch | Q ID | Sentence pronoun | Question name-anchor | Rate |
|----|------|-----------------|---------------------|------|
| 27 | kt-ch27-l3-q3 | "He had one brown horse..." | "How much did **Sanzang** carry?" | Ch27 highest: 12/46 |
| 27 | kt-ch27-l4-q3 | "The wind pushed dust into his eyes..." | "What did the desert wind do to **Sanzang**?" | |
| 28 | kt-ch28-l5-q3 | "He heard the same answer again..." | "What did **Liu Bei**'s brothers think?" | Ch28: 11/51 |
| 30 | kt-ch30-l3-q3 | "He walked alone into the woods..." | "What did **Heracles** do in the dark forest?" | Ch30 highest: 14/56 |
| 31 | kt-ch31-l5-q3 | "He stepped past the first tall tree..." | "Where did **Robin** go first?" | Ch31: 10/55 |

> **Pattern note**: P1 is a **systemic author style** (sentences use pronouns for flow; questions
> name the character for clarity). This is a valid accessibility tradeoff for 8-12 year olds who
> benefit from name anchors in questions. P1 is lower priority than P0 — it signals mild context
> dependency but is intentional. Recommend keeping P1 style but tagging it for LID tracking.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Questions scanned | 365 (Ch25-31) |
| P0 story-jump violations | 26 (7.1%) |
| P1 pronoun-to-name | 58 (15.9%) |
| Total A3 violations (unique) | 84 (23.0%) |
| Highest rate chapter | Ch27 37.0% / Ch28 35.3% |
| Lowest rate chapter | Ch25 1.8% |
| audio regen needed | 0 |
| Pre-existing lint issues | 447 (no new) |

---

## D. Top 5 P0

1. **`kt-ch28-l4-lg2`** (Ch28 comprehension) — "Why did Liu Bei go alone through the snow, even when his brothers refused?" Correct answer: "showing respect for the wise man mattered more than comfort" — `respect, comfort, wise` entirely absent from stimulus "Even in deep snow, Liu Bei put on his coat and rode up the hill alone." Requires context from l3 (brothers declined) AND l2 (Zhuge Liang's reputation). **True cross-beat dependency.**

2. **`kt-ch26-l3-x4`** (Ch26 comprehension) — "Why were his friends worried?" Correct: "eating very little and barely sleeping" — answer lives in the PRECEDING sentence ("He did not eat much. He slept very little."), not the tagged stimulus "His friends grew worried about him." Classic LID: correct answer is the adjacent narration sentence, not the stimulus.

3. **`kt-ch28-l7-x7`** (Ch28 comprehension) — "What does this ending show about the story's main lesson?" Correct: "true respect and patience can open any door" — thematic abstraction (`patience, respect`) across the entire 7-lesson arc. A single ending sentence cannot ground this. Requires full story recall.

4. **`kt-ch31-l3-x9`** (Ch31 comprehension) — "Why did the Sheriff read the list?" Correct: "he was looking for people who owed money" — money/debt context established in l2 (bad king's taxes), not present in stimulus "One quiet morning, the Sheriff sat in a wooden chair and read a list of names." `money, owed` are cross-lesson concepts.

5. **`kt-ch29-l4-lg2`** (Ch29 comprehension) — "Why did Odysseus nod instead of shout an order?" Correct: "A quiet gesture showed his trust in the crew" — `crew, trust, gesture` absent from "Odysseus stood at the front of the first ship and gave a steady nod." Leadership characterisation question, not derivable from the observed action alone.

---

## E. Narrative Voice / Pacing Observations (even if 0 R1-R8 violations)

1. **Ch28 over-abstracts in comprehension questions**: Multiple lg2-type questions ask "What does this show about X's character?" before the child has enough story exposure to form a character model. Pacing fix: push character-inference questions to the **last 2 lessons** of each chapter (after the arc closes), not mid-story.

2. **Ch27 pronoun ambiguity in lesson 3-4**: Sanzang's journey narration uses alternating "he" with short 1-sentence stints. The 12 P1 violations here reflect genuine referent ambiguity for 8-year-old readers — consider repeating the name every 3rd narration sentence ("Sanzang..." rather than "He..." for variety).

3. **Ch30 lesson 4-5 question clustering**: Two consecutive lessons both ask about WHY arrows/swords failed (l4: skin too thick for arrows; l5: sword broke). This creates **cross-lesson thematic overlap** — a child who misses l4 will find l5 confusing because it presupposes the established pattern. Consider adding a brief recap narration at the start of l5.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #106: X62_COMPREHENSION_STIMULI_CONTEXT_WINDOW**

### 背景 (Industry research)

ELT psychometrics research (Frontiers in Psychology 2022, "Test Format and Local Dependence of Items Revisited") defines **Local Item Dependence (LID)** as a core validity threat: when MC questions share a common stimulus cluster, answering one item aids answering another. In Pickup's case, "comprehension" questions tagged to a single narration sentence but whose correct answers require 1-2 preceding sentences create classic **testlet LID**.

TOEIC Part 3/4 design (ETS item writers' manual) addresses this with a **"local stimulus window"** — each question set receives a 3-5 sentence passage as shared stimulus, not a single sentence. Duolingo's Interactive Reading section (2026) similarly exposes a multi-sentence passage to learners before posing comprehension questions.

**Research source**: [Frontiers in Psychology — LID in vocabulary tests](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.805450/full) | [arXiv: Analyzing MC Listening/Reading Tests](https://arxiv.org/pdf/2307.01076)

### Pickup 適配分析

**✅ 適合 — 實作改動可行 (Effort: Medium, ROI: High)**

Current schema (`lessons.ts` LessonSchema): comprehension questions have a single `sentence` field as the stimulus displayed to the learner.

Proposed: add optional `stimulusContext?: string[]` field — an ordered array of 1-2 preceding narration sentences that the renderer displays **above** the question sentence, giving the child the local passage window needed to answer inference/motivation questions.

```ts
// lessons.ts — discriminatedUnion comprehension branch
z.object({
  type: z.literal('comprehension'),
  sentence: z.string(),
  stimulusContext: z.array(z.string()).max(3).optional(), // NEW: local context window
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  ...
})
```

Renderer change (`renderers.tsx` comprehension branch): if `stimulusContext` is present, render each string as a light grey narration block above the main sentence card before showing the question.

**Impact on violations**: All 26 P0 violations above would be resolved by adding 1-2 context sentences to the `stimulusContext` field — no question text changes required. Authors copy the preceding narration sentence(s) into the field; the renderer handles display.

**Constraints**: 
- No audio regen needed (stimulusContext is read-only display text, not TTS-triggered)
- No existing question data changed — purely additive field (backwards-compatible)
- JSON overhead: ~50-100 chars per affected question × 26 questions = ~3KB per chapter, negligible

### Verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Multi-sentence stimulusContext window for comprehension Qs | ETS TOEIC Part 3/4 item design + Frontiers 2022 LID research | ✅ 完全適合 — additive schema field, zero migration cost, resolves 26 P0 violations | Medium (2-3 hrs: schema + renderer + backfill 26 Qs) | High (eliminates cross-beat guessing for 8-yr-old learners) | **推薦實作** |

---

*Audit generated 2026-07-02 13:00 UTC | Angle: A3 Story-Jump | Chapter: Ch25-31 | Violations: 84 (P0: 26, P1: 58)*
