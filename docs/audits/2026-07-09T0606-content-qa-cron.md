# Content QA — 2026-07-09 06:06 UTC

**Today's angle:** #3 — A1 obvious correct (gap too easy)
**Focus:** Ch17–Ch24 (鶴の恩返し / 興夫놀부 / Kancil the mouse deer / Giant Turnip / Anansi / Meng's mother / Secret Garden / Kong Rong's pears — 8 chapters, 116 listen-mc / picture-mc items audited)

**Angle definition — A1 obvious correct:**
The correct answer is identifiable without fully processing the stimulus, because: (a) it contains content-words verbatim from the stimulus while all distractors share zero content-word overlap (combined A1b+A7 — keyword-matching shortcut); (b) it is structurally distinct from all three distractors in format or first-word pattern (A1f — format-cluster tell); (c) its word-count is ≥1.5× longer or shorter than all distractors (A5/R2 — length tell). Any of these signals alone degrades a 4-option item toward 2-option difficulty. Together they allow guessing without listening.

**Industry basis (2025–2026):**
- NCBI PMC (teacher-developed ELT listening tests): only 52.2% of distractors in classroom tests are functioning (selected by ≥5% of candidates). Non-functioning distractors = those with zero overlap with stimulus plausibility domain — effectively collapsing 4-choice to 2-choice. ([PMC7372664](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/))
- PMC 2025 AI item-analysis study: "obviously correct answer" is a recognized item-writing flaw class: when structural, semantic, or grammatical cues in stem or options make one choice trivially identifiable, the item stops measuring target knowledge and instead rewards test-wiseness. ([PMC11911725](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11911725/))
- **Duolingo Interactive Listening (2025 update)**: Duolingo calibrates distractors on three explicit factors: (1) position in the conversation, (2) **length ratio to the correct answer**, (3) **conditional generation probability relative to correct answer** — specifically targeting semantic/pragmatic misunderstanding, not surface-word swaps. ([Duolingo DET paper](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf)) — directly validates our R2 length-parity rule and the domain-overlap requirement.
- Young learner cognition (age 8–12): Children rely heavily on keyword-matching heuristics before meaning synthesis. When correct options echo stimulus keywords that no distractor shares, A2 children can bypass listening construct entirely. ([ResearchGate distractor analysis L2](https://www.researchgate.net/publication/343302303))

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 441
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Ch17-24 lint excerpt (Ch17-21 range):
- kt-ch17: 0 lint issues in this range
- kt-ch18: 0 lint issues (X48/X49 patterns in ch17-21 range clean)
- Ch19-21: 0 lint issues beyond existing 441 aggregate

**Validator does NOT currently catch A1b (zero-overlap distractors) or A1f (format-cluster). The 8 P0 violations below are new findings not caught by validate-lessons.js.**

---

## B. Violation table

### P0 Violations — Combined A1b + A7 (correct echoes stem keywords; all distractors zero-overlap)

| Ch | Q ID | type | stimulus snippet | echo words in correct | correct option | distractors | 修法 | audio regen? |
|----|------|------|-----------------|----------------------|----------------|-------------|------|--------------|
| 17 | kt-ch17-l2-pm1 | picture-mc | "The young woman sat at the loom to weave cloth all night." | **woman, loom** | "a woman at a wooden loom by candlelight" | girl cooking / old man reading / child playing in snow | 改正解：「someone working at a frame by lamplight」(remove woman+loom) | No |
| 21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his clever ideas, not his strong arms." | **anansi, clever** | "Anansi was very clever" | hat won't fit / spiders have big heads / sky god joking | 改正解：「He used his mind, not his muscles」+ 改干擾項包含anansi | No |
| 21 | kt-ch21-l7-q6 | listen-mc | "The stories flew out like birds and went in every direction." | **birds, out** (near-verbatim) | "birds flying out" | stones falling / quiet river / soft yarn | **最嚴重**：正解幾乎是 verbatim 抄句。改正解：「they scattered like a flock taking wing」| Yes |
| 22 | kt-ch22-l3-q8 | listen-mc | "He held up sticks and called out, just like the sellers." | **sellers, called, out** | "the way sellers called out prices" | children at school / birds in sky / old men's songs | 改正解：「copying the vendors' street cries」| No |
| 22 | kt-ch22-l7-q3 | listen-mc | "For many years, he sat with his books from sunrise to night." | **many, years** | "many years in a row" | one short week / few summer days / one winter only | 改正解：「for a long stretch of time」| No |
| 23 | kt-ch23-l1-pm1 | picture-mc | "The children played in the garden." | **children, garden** | "children running in an open garden" | boy at desk / girl sleeping under tree / old man on bench | 改正解：「young ones playing outdoors」| No |
| 24 | kt-ch24-l1-pm1 | picture-mc | "The father came home with a plate of fruit." | **fruit, home** | "a man arriving home holding a fruit tray" | boy eating alone / cat sleeping / brother reading | 改正解：「a man entering a house carrying a gift」| No |
| 24 | kt-ch24-l7-q8 | listen-mc | "His eyes were bright. He put a hand on Kong Rong's head." | **bright, eyes** | "with bright eyes and a soft touch" | leaving quietly / shouting at brothers / hiding pears | 改正解：「his face lit up and he reached out gently」| No |

### P1 Violations — A1f Format-cluster (correct alone starts with unique word class)

| Ch | Q ID | type | stimulus snippet | correct option | distractors | cluster tell | 修法 |
|----|------|------|-----------------|----------------|-------------|--------------|------|
| 17 | kt-ch17-l5-q9 | listen-mc | "Just one peek. She will never know" | "A small look will be safe" | I must keep… / I should leave… / She is just… | correct starts "A" (article-NP); distractors all start "I"/"She" (pronoun-VP) | 改為「Checking once will not hurt」(pronoun-VP 格式對齊) |
| 17 | kt-ch17-l7-q9 | listen-mc | "She flew up, up, up into the morning sky." | "high above the clouds" | into the warm house / down into the snow / into the dark forest | correct is ADV-phrase; all 3 distractors start "into/down" (PP) | 改為「away beyond the rooftops」(PP 對齊) |
| 18 | kt-ch18-l3-q9 | listen-mc | "He picked up the small bird with very soft hands." | "soft and gentle" | fast and rough / with a stick / with a net | correct is ADJ-pair; distractors start fast+ADJ / with+N / with+N | 改為「with care and delicacy」(with+N 格式) |
| 18 | kt-ch18-l7-q3 | listen-mc | "Nolbu planted the seed. Big gourds grew very fast." | "rice and gold like Heungbu" | nothing good at all / a big snake / a new wife | correct is "N and N" NP; distractors start nothing/a/a | 改為「a large pile of treasure」(a+NP 格式) |
| 19 | kt-ch19-l6-q5 | listen-mc | "The little mouse deer turned around and called back across the water." | "there was no king's message" | the king said hello / the river is too cold / come visit tomorrow | correct starts "there" (existential); distractors "the/the/come" | 改為「the message was fake」(the+N 格式) |
| 20 | kt-ch20-l6-q9 | listen-mc | "The turnip moves a tiny bit. The top wobbles in the dirt." | "it starts to come loose" | the turnip flies up / the dirt turns to mud / a new green leaf grows | correct starts "it" (pronoun); distractors "the/the/a" | 改為「the turnip stirs at last」(the+N 格式) |
| 21 | kt-ch21-l3-q8 | listen-mc | "The hornets thought a sudden rain had come too soon." | "the rain was here" | a fire started / a king arrived / a song was playing | correct starts "the" (definite); distractors all start "a" (indefinite) | 改為「rain was falling on them」(sentence structure + no definite article tell) |

### P1 Violations — A5/R2 Length parity (max/min ratio > 1.5, correct longest or shortest)

| Ch | Q ID | ratio | correct len | avg dist len | note | 修法 |
|----|------|-------|------------|-------------|------|------|
| 18 | kt-ch18-l3-q3 | 1.67 | 4w "high up on the house" | 3.3w | correct longest by 1w | 加 1w to 2 distractors: "inside a big tree" / "by the cold river" |
| 18 | kt-ch18-l7-q9 | 2.00 | 2w "shared everything" | 3w avg | correct shortest — **reverse tell** | 改正解：「gave all he had」(3w 對齊) |
| 19 | kt-ch19-l6-q5 | 1.67 | 5w "there was no king's message" | 3.5w avg | correct longest | 壓短正解：「it was all made up」|
| 20 | kt-ch20-l3-q5 | 1.75 | 7w "on the man in front of her" | 4.3w avg | correct longest | 壓短正解：「onto the person ahead」|
| 20 | kt-ch20-l6-q5 | 2.00 | 6w "holding it with her front feet" | 3w avg | correct longest | 壓短正解：「gripping the tail carefully」|
| 23 | kt-ch23-l3-q6 | 2.00 | 3w "going under water" | 2.3w avg | longest by 1w | 加 1w to 2 distractors: "swimming for the fun" / "floating there happily" |
| 23 | kt-ch23-l5-q3 | 2.00 | 6w "Sima Guang, the still boy" | 4.0w avg | correct longest | 壓短正解：「the calm, quiet one」|
| 24 | kt-ch24-l3-q3 | 2.00 | 4w "such a tasty look" | 3.3w avg | ratio borderline | 對齊：「looking very tasty」|
| 24 | kt-ch24-l3-q6 | 2.00 | 2w "thinking carefully" | 2.7w avg | correct shortest — **reverse tell** | 改正解：「sitting and thinking carefully」|

---

## C. Stats

| Metric | Value | Standard | Status |
|--------|-------|----------|--------|
| Total listen-mc + picture-mc Q audited | 116 | — | — |
| P0 combined A1b+A7 violations | **8** | 0 | ⚠️ |
| P1 format-cluster violations | **7** | 0 | ⚠️ |
| P1 R2 length-parity violations (ratio >1.5) | **9** (6 at ratio ≥2.0) | 0 | ⚠️ |
| R3 key-position ci=3 under-use | ci=3: 17.2% (target 20-30%) | 20-30% per pos | ⚠️ |
| R3 key-position ci=2 over-use | ci=2: 31.0% (target 20-30%) | 20-30% per pos | ⚠️ mild |
| Combined A1b+A7 severity | 3 verbatim-echo (Ch21 l7-q6, Ch22 l3-q8, Ch22 l7-q3) | — | 🔴 |

---

## D. Top 5 P0 (ranked by severity)

1. **🔴 kt-ch21-l7-q6** (Ch21 Anansi) — near-verbatim stimulus echo in correct ("birds flying out" from "flew out like birds"), all 3 distractors zero-overlap. Child can select correct by matching "birds" before audio ends. Audio regen needed.

2. **🔴 kt-ch22-l3-q8** (Ch22 Meng's mother) — 3 content words from stimulus ("sellers", "called", "out") appear exclusively in correct ("the way sellers called out prices"). All distractors (school/birds/songs) are off-domain. Format also clusters (NP vs S-clause).

3. **🔴 kt-ch22-l7-q3** (Ch22 Meng's mother) — "many years" verbatim in correct vs distractors (week/days/winter) that form a tight semantic set. Correct is semantically obvious by quantity-scale: "many years" vs "one week / few days / one winter." Compound flaw: A1b + antonym-scale.

4. **⚠️ kt-ch24-l7-q8** (Ch24 Kong Rong) — "bright eyes" verbatim echo + all distractors (leaving/shouting/hiding) are clearly negative actions while stimulus is warm/positive. Tone-match shortcut makes correct obvious even without audio.

5. **⚠️ kt-ch21-l6-q8** (Ch21 Anansi) — "anansi" and "clever" both in correct and stimulus. Distractor "his hat did not fit him" is a literal-absurd reading that no A2 child would select. Non-functional distractor.

---

## E. Narrative voice / pacing improvement proposals (even if 0 structural violations, per cron rules)

1. **Ch19 (Kancil) — Question register too formal for A2 child:** "What did mouse deer tell the crocodiles?" → mouse deer's trickster voice should echo in the question: "How did Kancil fool the crocodiles?" The passive-witness register ("what did X tell Y") undercuts the storytelling warmth. Revise ≥3 Ch19 Qs to match Kancil's playful frame.

2. **Ch23 (Secret Garden) — Picture-mc option register inconsistent:** "children running in an open garden" vs "a girl sleeping under a tree" — the correct option uses "-ing" progressive; distractors switch to "-ing" too, so at this level it's fine structurally. But the distractor "an old man sitting on a bench" is clearly adult/off-register for a children's garden chapter. Replace with "a group of children looking over a wall" to keep age/register coherent.

3. **Ch20 (Giant Turnip) — Chain-pull questions miss cumulative story logic:** Each pull question is self-contained ("where does X hold on?") but the story's emotional payoff is the growing chain of helpers. One or two questions per lesson should reference the chain explicitly: "Who joins the pull after the dog?" / "How many helpers pull now?" This tests inference-level comprehension (R6 sub-skill variety) rather than detail-only queries.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #133: X70_A1_DISTRACTOR_PLAUSIBILITY_GATE

**Source:** Duolingo Interactive Listening paper (2025) + PMC 2025 item-flaw study

**Pattern:** Duolingo calibrates distractors on **length ratio to correct answer** AND **conditional generation probability** (how plausible is the distractor given the same conversational context?). PMC 2025 classifies "obviously correct answer" as a standard item flaw detectable by automated analysis.

**Current gap:** validate-lessons.js catches verbatim 3-gram overlap (X48) and antonym mirror (X57) but does **not** catch:
- Correct option echoing ≥2 content words from stimulus while all distractors share 0 overlap (A1b+A7 combined = 8 P0 cases this cycle)
- Option word-count ratio > 1.5 where correct is outlier (6 ratio-2.0 cases)
- Correct's first-word class unique vs all distractors (7 A1f cases)

**Proposed lint rule (additive, non-breaking):**

```js
// X70_A1_DISTRACTOR_PLAUSIBILITY_GATE
// For each listen-mc / listen-comprehension / picture-mc question:
//   step 1: count content-word overlap between correct and sentence → correct_cw_hit
//   step 2: count content-word overlap between each distractor and sentence → dist_cw_hits[]
//   step 3: if correct_cw_hit >= 2 AND all(dist_cw_hits == 0) → WARN X70a
//
// X70b: max(lens)/min(lens) > 1.5 AND correct is the outlier (longest or shortest alone) → WARN X70b
//
// X70c: correct[0].word class (article/pronoun/preposition) is unique vs distractors → WARN X70c
```

**Pickup 適配:** ✅ Fully compatible. Additive to `tools/validate-lessons.js`. No changes to src/ or lessons JSON. Same pattern as X48/X57. Expected to catch all 8 P0 and ~16 P1 violations above on first run.

**Effort:** 2 hrs (add three sub-checks to existing lint loop)
**ROI:** High — catches 25 violations in this one cycle alone; prevents same flaws in future content batches (Ch25-32 have same generator patterns)
**Verdict:** ✅ Strongly recommended — implement before next content batch

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X70a: correct-echo + zero-dist-overlap lint | [PMC11911725](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11911725/) + [Duolingo DET 2025](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | ✅ additive to validate-lessons.js | 1 hr | High — blocks 8 P0/cycle | Implement |
| X70b: length-ratio-correct-outlier lint | [Duolingo DET 2025 §3.2 distractor length ratio](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | ✅ additive | 30 min | High — 9 P1 caught | Implement |
| X70c: first-word-class-cluster lint | [PMC11911725 flaw taxonomy](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11911725/) | ✅ additive | 30 min | Medium — 7 P1 caught | Implement |
