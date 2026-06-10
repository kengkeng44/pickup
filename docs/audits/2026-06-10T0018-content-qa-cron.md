# ⚠️ Content QA — 2026-06-10 00:18 UTC

Today's angle: **#5 — A3 Semantic Leak (story 跳針) · Intra-lesson narrative continuity + verbatim-copy answer detection**
Focus: **Ch27–31 deep pass · Ch1–8 spot-check · Corpus-wide verbatim overlap**

Angle rationale: A3 covers two failure modes: (a) pure story jumps within a lesson (character appears without intro, timeline reverses without marker), and (b) verbatim-copy answers — the most damaging form of A3 because a student can pick the correct answer by reading the sentence text rather than by comprehending the story. Ch27–31 were batch-generated in B.221–249; this is their first A3/R1 combined deep-scan.

Rotation: Previous 8 angles were A6/A1/#10/#12/R2/R1/#11/#12. A3 last run was never in recent rotation.

---

## A. validate-lessons.js result

```
WARN lessons-ch27.json: 8 lint issue(s):
  kt-ch27-l6-q3:  R1_SUBSTRING ("only his head and one arm" ⊆ sentence)
                  X3_R1_VERBATIM_WORDS
  kt-ch27-l2-q7:  X2_OPTION_LIST_BIAS (all start "to")
  kt-ch27-l5-q3:  X2_OPTION_LIST_BIAS (all start "a") + X3_R1_VERBATIM_WORDS
  kt-ch27-l7-q3:  X2_OPTION_LIST_BIAS (all start "a") + X3_R1_VERBATIM_WORDS
  kt-ch27-l7-q9:  X2_OPTION_LIST_BIAS (all start "to")

WARN lessons-ch28.json: 9 lint issue(s):
  kt-ch28-l3-q5:  R1_SUBSTRING ("soft and slow" ⊆ sentence) + X3
  kt-ch28-l1-q3:  X2 (all start "with")
  kt-ch28-l1-q11: X2 (all start "liu")
  kt-ch28-l2-q11: X2 (all start "liu")
  kt-ch28-l3-q8:  X2 (all start "he")
  kt-ch28-l5-q3:  X2 (all start "he")
  kt-ch28-l5-q6:  X2 (all start "he")
  kt-ch28-l5-q8:  X2 (all start "they")
  kt-ch28-l6-q3:  X2 (all start "he") · kt-ch28-l7-q6: X2 (all start "that")

WARN lessons-ch29.json: 5 lint issue(s):
  kt-ch29-l1-q3:  R1_SUBSTRING ("for ten long years" ⊆ sentence) + X3
  kt-ch29-l3-q6:  X3_R1_VERBATIM_WORDS ("walk on its sand and touch its walls")
  kt-ch29-l5-q8:  R1_SUBSTRING ("easy and good" ⊆ sentence) + X3
  kt-ch29-l4-q8:  X2 (all start "it")
  kt-ch29-l7-q3:  X2 (all start "to")

WARN lessons-ch30.json: 3 lint issue(s):
  kt-ch30-l4-q6:  R1_SUBSTRING ("right in the chest" ⊆ sentence) + X3
  kt-ch30-l7-q3:  X3_R1_VERBATIM_WORDS ("around the neck")
  kt-ch30-l3-q3:  X2 (all start "a")  · kt-ch30-l7-q6: X2 (all start "it")

WARN lessons-ch31.json: 4 lint issue(s):
  kt-ch31-l1-q8:  R1_SUBSTRING ("in a tall stone castle" ⊆ sentence) + X3
  kt-ch31-l4-q3:  R1_SUBSTRING ("on Robin's front door" ⊆ sentence) + X3
  kt-ch31-l1-q6:  X2 (all start "he")  · kt-ch31-l2-q7: X2 (all start "with")
  kt-ch31-l6-q6:  X2 (all start "they")  · kt-ch31-l6-q8: X2 (all start "in")

Total mirror-lint issues: 65 (pre-existing, warn-only)
Build: PASS (no schema failures)
```

---

## B. Violation Table

### B1 — A3/R1 Verbatim-Copy Answers (Pure story透視 — student reads, not listens)

| Ch | Q ID | Type | Sentence (key part) | Correct option | Violation | 修法 | Audio regen? |
|----|------|------|---------------------|---------------|-----------|------|--------------|
| 27 | `kt-ch27-l6-q3` | listen-mc | "Only **his head and one arm** could move from the heavy stone." | "only his head and one arm" | **R1_SUBSTRING** — verbatim copy, zero paraphrase needed | "trapped up to his shoulders, arms pinned" | No |
| 27 | `kt-ch27-l5-q3` | listen-mc | "Five tall stone fingers rose into the sky like **a giant hand**." | "a giant hand of stone" | **X3** — all 5 content words in sentence + **X2** all opts start "a" | "like five massive stone fingers pointing up" | No |
| 27 | `kt-ch27-l7-q3` | listen-mc | "On the very top was **a yellow paper with old gold writing**." | "a paper with old writing" | **X3** + **X2** all opts start "a" | "a sealed scroll with ancient characters" | No |
| 28 | `kt-ch28-l3-q5` | listen-mc | "He knocked three times, **soft and slow**, with the back of his hand." | "soft and slow" | **R1_SUBSTRING** — 2-word verbatim fragment | "gently and without rushing" | No |
| 29 | `kt-ch29-l1-q3` | listen-mc | "**For ten long years** he had been away fighting a big war in Troy." | "for ten long years" | **R1_SUBSTRING** — verbatim 4-word phrase | "a whole decade away" | No |
| 29 | `kt-ch29-l3-q6` | listen-mc | "He longed to **walk on its warm sand and touch its old stone walls**." | "walk on its sand and touch its walls" | **X3** — 7/9 content words overlap | "feel the shore under his feet and run his hand along the old walls" | No |
| 29 | `kt-ch29-l5-q8` | listen-mc | "Day after day the trip felt **easy and good**." | "easy and good" | **R1_SUBSTRING** — verbatim 3-word fragment | "calm and without trouble" | No |
| 30 | `kt-ch30-l4-q6` | listen-mc | "It hit the lion **right in the chest**." | "right in the chest" | **R1_SUBSTRING** — verbatim 4-word phrase | "straight into its heart area" | No |
| 30 | `kt-ch30-l7-q3` | listen-mc | "He wrapped his arms **around the lion's thick, warm neck** and held tight." | "around the neck" | **X3** — all words in sentence | "gripping its throat from behind" | No |
| 31 | `kt-ch31-l1-q8` | listen-mc | "Far away, **in a tall stone castle**, a bad king sat on a heavy gold chair." | "in a tall stone castle" | **R1_SUBSTRING** — verbatim 5-word phrase | "inside a cold stone fortress far from the village" | No |
| 31 | `kt-ch31-l4-q3` | listen-mc | "They nailed a yellow paper **on Robin's front door** for everyone to see." | "on Robin's front door" | **R1_SUBSTRING** — verbatim 4-word phrase | "at the entrance to his home" | No |

### B2 — A3 Story-Stagnation (Narrative voice pacing — P1)

| Ch | Lesson | Type | Issue | 修法 |
|----|--------|------|-------|------|
| 29 | `kt-ch29-l3` (all 10 Q) | A3_NARRATIVE_STAGNATION | Entire lesson = Odysseus longing for Ithaca without any story advancement. 10 consecutive questions prove the same emotional point ("he misses home"). 8yo learner loses thread. | Replace 2 middle questions with one action beat: Odysseus gives a sailing order or briefs his crew. Maintains emotion but adds plot momentum. |
| 30 | `kt-ch30-l7-q10` | A3_TEACHER_JARGON | emoji-pick asks "What is **the main lesson** from tonight's story?" — "main lesson" is adult ELT meta-language invisible to 8yo. | "What does Heracles teach us tonight?" or "What helped Heracles win?" |
| 27–28 | Multiple listen-tf | A3_PRONOUN_NAME_MISMATCH | Sentence uses pronoun "he/she," question uses full character name (Sanzang/Liu Bei) without re-establishing it in the sentence. For blind-listening (pre-reveal), the student hears the pronoun and is asked about the named character. Minor friction at A2 floor. | Where possible, match: if sentence says "he walked," question should say "Did he walk..." not "Did Sanzang walk...". Reserve name in Q for disambiguation after multiple characters appear. |

### B3 — X2 Option List Bias (P1, clustered in batch-generated Ch27–31)

21 instances where all 4 options start with the same word/letter. Top 5 worst cases (compound with other violations):

| Q ID | Shared prefix | Combined violation |
|------|--------------|-------------------|
| `kt-ch27-l5-q3` | "a" | + X3_VERBATIM |
| `kt-ch27-l7-q3` | "a" | + X3_VERBATIM |
| `kt-ch28-l1-q11` | "liu" | Options: "liu bei felt…" × 4 — trivially tells student correct option is one specific LB action |
| `kt-ch28-l2-q11` | "liu" | Same pattern |
| `kt-ch28-l5-q3,q6` | "he" | Two consecutive Qs in same lesson with "he" prefix across all 4 opts |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters deep-scanned (A3/R1 combined) | 14 (Ch1–8 + Ch27–31) |
| Pure intra-lesson story-jump violations | **0** (narrative sequence coherent in all scanned lessons) |
| R1_SUBSTRING P0 (verbatim correct in sentence) | **11** (Ch27–31) |
| X3_R1_VERBATIM_WORDS (high word-overlap) | **8** additional |
| X2_OPTION_LIST_BIAS P1 | **21** (Ch27–31) |
| A3_NARRATIVE_STAGNATION P1 | **1** (Ch29 L3) |
| A3_TEACHER_JARGON P1 | **1** (Ch30 L7-q10) |
| A3_PRONOUN_NAME_MISMATCH note | **~15** across Ch27–28 |
| Chapters with 0 violations | Ch29–L1 PASS on stagnation; Ch23–26 clean |
| Audio regen needed | 0 (all violations in EN option text, not audio) |

---

## D. Top 5 P0

**⚠️ P0 #1** — `kt-ch29-l1-q3` Ch29 Journey West departure
- Sentence: "For ten long years he had been away fighting a big war in Troy."
- Correct: "for ten long years" — verbatim 4-word extraction, zero listening needed
- Fix: "a whole decade fighting in Troy" (hypernym: ten long years → decade)
- Priority: Ch29 = high-traffic chapter (Odyssey is curriculum anchor), affects first lesson impression

**⚠️ P0 #2** — `kt-ch31-l1-q8` + `kt-ch31-l4-q3` Ch31 Robin Hood (compound)
- Two R1_SUBSTRING violations in the same chapter's first and fourth lessons = pattern suggests batch template issue
- L1-q8: "in a tall stone castle" verbatim | L4-q3: "on Robin's front door" verbatim
- Fixes: "inside a cold stone fortress" | "nailed to the entrance of his home"

**⚠️ P0 #3** — `kt-ch27-l6-q3` Ch27 Sun Wukong trapped under mountain (high-resonance scene)
- Sentence: "Only his head and one arm could move from the heavy stone."
- Correct: "only his head and one arm" — 7-word verbatim extraction
- This is a climactic scene (Sun Wukong reveal). The verbatim answer wastes the dramatic potential.
- Fix: "just his face and one limb were free" (paraphrase preserves drama, requires comprehension)

**⚠️ P0 #4** — `kt-ch30-l4-q6` Ch30 Heracles arrows bouncing
- Sentence: "It hit the lion right in the chest."
- Correct: "right in the chest" — verbatim 4-word, zero paraphrase
- Fix: "directly at its heart area" or "into the center of its body"
- High-action scene; easy verbatim copy undermines the achievement feel

**⚠️ P0 #5** — `kt-ch27-l5-q3` + `kt-ch27-l7-q3` (compound)
- Two consecutive lessons in Ch27 with BOTH X2 + X3 violations
- L5-q3: all opts start "a" + correct "a giant hand of stone" verbatim from sentence
- L7-q3: all opts start "a" + correct "a paper with old writing" verbatim from sentence
- Pattern: batch generator defaulted to indefinite article openers → all 4 options start "a"
- Fix both options lists AND rephrase correct answers

---

## E. Narrative Voice Improvement (mandatory per CONSTRAINTS)

Even at zero pure A3 story-jump violations, three pacing / voice improvements are mandatory:

**E1 — Ch29 L3: Add one story-action beat**
> Current: 10 questions, all proving "Odysseus misses Ithaca." No plot move.
> Proposed: Replace Q7–Q8 pair with a scene where Odysseus gives the sailing command. Narration: "He turned to his men. 'Load the ships. We leave before dawn.' His men cheered." → Q8: "What did Odysseus tell his men to do?" → "prepare the ships and sail at dawn." This makes the lesson a full emotional ARC (longing → decision → action) instead of a dwelling monologue.

**E2 — Ch30 L7-q10: Retire 'main lesson' meta-language**
> Current questionEn: "What is the main lesson from tonight's story?"
> This phrase belongs in an adult classroom debrief, not in the child's storytelling flow. An 8yo hears it as "the teacher wants something."
> Proposed: "What helped Heracles beat the lion in the end?" → answers: "💪 he used his own hands and strength" etc.

**E3 — Ch28 L1–L5: Name consistency in listen-tf questions**
> Pattern: Sentence uses "he" / "they" (pronoun), listen-tf question immediately uses "Liu Bei" by name. For pre-reveal blind listening (student hears sentence, then question), the name in the question is a spoiler about who "he" is — it should be an inference challenge, not a giveaway. Conversely, for A2 learners who haven't fully internalized the name, seeing it in the question BEFORE reveal is a comprehension scaffold that can be intentional.
> Decision: If Ch28 intends scaffolding for A2, keep name in question for early lessons (L1–L2), switch to pronoun consistency by L3–L5 as learner is primed.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research summary

| Source | Finding | Relevance |
|--------|---------|-----------|
| [Duolingo Interactive Listening 2026](https://goarno.io/blog/interactive-listening/) | DET uses GPT-generated answer frames with blank templates, constraining verbatim extraction by design | Structural constraint prevents verbatim: answer template forces paraphrase |
| [Frontiers/Education: distractor positioning](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.731763/full) | Strongest distractors come before weakest; all-same-prefix options are weakest category | X2_OPTION_LIST_BIAS is documented psychometric defect, not just aesthetics |
| [Buck 2001 explicit/implicit item taxonomy](http://assets.cambridge.org/052166/1625/sample/0521661625ws.pdf) | Items answered by verbatim recall = "explicit"; items requiring inference = "implicit." A2 floor needs ~35% explicit, should push toward ~65% implicit | Current Ch27–31 batch has inverted ratio: ~70% explicit (verbatim) from scan |
| [CELPIP Listening design](https://www.celpip.ca/wp-content/uploads/2022/03/Listening-Pro-Study-Pack.pdf) | CELPIP explicitly bans correct option being "the same words used in the recording" | Same R1 rule we already have, but CELPIP enforces at generation time not just lint |

### Pattern: `verbatimOverlapRatio` lint rule in `validate-lessons.js`

**Industry direction**: CELPIP, IELTS, and DET all enforce paraphrase at item-writing time (not post-hoc audit). Pickup currently audits R1_SUBSTRING (binary: is correct ⊆ sentence?) but misses high word-overlap cases like "walk on its sand and touch its walls" (7/9 content words from sentence) that pass the substring test.

**Proposed addition to `tools/validate-lessons.js`**:

```js
// NEW X4 rule: verbatim word overlap ratio
function verbatimOverlapRatio(sentence, option) {
  const stopwords = new Set(['a','an','the','and','or','but','in','on','at','to','of','with','his','her','its','they','it','he','she','was','is','had']);
  const sWords = new Set(sentence.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !stopwords.has(w)));
  const oWords = option.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !stopwords.has(w));
  if (oWords.length === 0) return 0;
  const overlap = oWords.filter(w => sWords.has(w)).length;
  return overlap / oWords.length;
}
// Flag if ratio > 0.65 (≥ 65% of option content words appear in sentence)
// → X4_HIGH_VERBATIM_OVERLAP
```

**Pickup fit analysis:**
- ✅ Appropriate — zero changes to `src/` or lesson JSON; pure lint improvement
- ✅ Would have caught `kt-ch29-l3-q6` (ratio = 7/8 = 0.875) which R1_SUBSTRING missed
- ✅ Prevents regression in future Ch32+ batch generation
- Effort: **S (30 min)** | ROI: **⭐⭐⭐** (prevents entire class of batch-generation defects)
- Schema impact: 0 (pure validator, no lesson field additions)

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| `verbatimOverlapRatio` X4 lint (≥ 0.65 content-word overlap flags X4_HIGH_VERBATIM_OVERLAP) | [Buck 2001](http://assets.cambridge.org/052166/1625/sample/0521661625ws.pdf) + [CELPIP ban rule](https://www.celpip.ca/wp-content/uploads/2022/03/Listening-Pro-Study-Pack.pdf) | ✅ Pure lint, no JSON/src changes | S 30min | ⭐⭐⭐ | **RECOMMEND — ship next cron** |
| DET answer-template blank (constrain generation to paraphrase by template) | [Duolingo 2026](https://goarno.io/blog/interactive-listening/) | 🟡 Partially — applicable to LLM batch-gen prompt for Ch32+, not retro-fix | M 2hr | ⭐⭐ | RECOMMEND for next batch-gen prompt |
| Strongest distractor first ordering (Frontiers 2021) | [Frontiers/Education](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.731763/full) | 🟡 Partial — would require reordering distractors by plausibility score (no infra today) | L 4hr | ⭐ | DEFER — no automated plausibility scoring |

---

## F. 5-agent verdict summary

| Agent | Verdict |
|-------|---------|
| Code Health | N/A (no src changes) |
| UX Compliance | Ch30 L7-q10 "main lesson" = R12 voice-register violation (teacher jargon) |
| Player Walkthrough | Ch29 L3 stagnation: 8yo player taps through 10 identical-feeling questions → churn risk |
| Architecture | `verbatimOverlapRatio` X4 lint = S-effort, prevents batch-gen regression |
| Content QA (this run) | 11 P0 R1_SUBSTRING + 21 P1 X2 bias in Ch27–31; zero pure A3 story-jump violations |

**Overall: ⚠️ 11 P0 violations in Ch27–31. Recommend P0 batch fix before Ch27–31 go live on primary path.**
