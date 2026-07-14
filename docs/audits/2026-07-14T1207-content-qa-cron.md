# Content QA — 2026-07-14 12:07 UTC

**Today's angle:** #2 — R2 Distractor Doctrine (4-option failure-mode coverage + position balance)
**Focus:** Ch17-24 (Crane Wife / Heungbu-Nolbu / Mouse Deer / Giant Turnip / Anansi / Mother Meng / Sima Guang / Kong Rong)

> R2 Distractor Doctrine = each listen-mc Q must have ≥3 distinct distractor failure modes (phonological confusion / local-detail substitution / schema-driven inference / partial parse), AND correct-answer position must be balanced across A/B/C/D per chapter.

---

## A. validate-lessons.js result

```
WARN across all chapters — 440 total mirror-lint issues (warn-only, no build FAIL)
Schema shape: PASS (no Zod errors)
```

Key lint counts for Ch17-24:

| Ch | X2 list-bias | X57 antonym | X49 stimulus-reuse | X49B comp-reuse |
|----|-------------|-------------|-------------------|-----------------|
| 17 | 1 | 2 | 4 | 6 |
| 18 | 2 | 2 | 5 | 4 |
| 19 | 6 | 4 | 3 | 5 |
| 20 | 1 | 4 | 3 | 5 |
| 21 | **9** | 2 | 2 | 6 |
| 22 | 2 | 1 | 1 | 4 |
| 23 | 1 | **4** | 5 | 5 |
| 24 | 2 | 3 | 6 | 3 |

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 17 | **CHAPTER-LEVEL** | listen-mc | ALL q3 ci=2, ALL q9 ci=0, B/D never correct (10/10 Qs) | **P0 R3_SYSTEMATIC_AB_ONLY**: correct answers locked to positions A/C — learners discover B/D = always wrong → 50% giveaway | Randomize ci: shift some q3 to ci=1 or ci=3 by swapping option order; never touch correctIndex of content, swap the entire options[] array + update ci | No |
| 18 | **CHAPTER-LEVEL** | listen-mc | ALL q3 ci=2, ALL q9 ci=0, B/D never correct (10/10 Qs) | **P0 R3_SYSTEMATIC_AB_ONLY**: same alternating A/C-only pattern as Ch17 | Same as Ch17 fix | No |
| 21 | kt-ch21-l3-q6 | listen-mc | opts: "to make him look very pretty \| to keep something off his head \| to feed the hungry hornets \| to make music in the soft wind" | **P0 R4_ALL_SAME_START**: all 4 options begin "to…" — grammatically identical, eliminates structural distractor diversity | Rewrite 2 options to avoid infinitive-only list (e.g. "rain was coming" / "a friend was near") | No |
| 21 | kt-ch21-l4-q6 | listen-mc | opts: "that he was the king…\| that he could fly…\| that some friend doubted…\| that the river was dry" | **P0 R4_ALL_SAME_START**: all 4 options begin "that…" | Rewrite ≥2 distractors to varied structures (e.g. "his length was a secret" / "the stick was too short") | No |
| 21 | kt-ch21-l5-q3 | listen-mc | opts: "they came close to play\| they brought him food\| they all kept far away\| they slept under the tree" | **P0 R4_ALL_SAME_START**: all 4 options begin "they…" | Correct=C. Rewrite A/B/D to mixed starts: "nobody came near" / "food was left at the base" / "a nest appeared above" | No |
| 23 | kt-ch23-l4-q6 | listen-mc | sentence: "Every second, the water held him tighter." opts: "he was getting out by himself\| **he was making bubbles for fun**\| he was learning to swim\| time was running out for him" | **P0 A3_JUNK_DISTRACTOR**: "making bubbles for fun" in a drowning scene is context-incongruent — "for fun" immediately signals wrong, no genuine confusion | Replace with: "he was resting near the edge" (schema-plausible near-miss) | No |
| 17 | kt-ch17-l3-q3 | listen-mc | sentence: "She cooked the meals. She cleaned the house." opts: "singing songs all day\| counting his bags of coins\| doing daily house work\| cutting wood in the snow" | **P1 R4_SCHEMA_SATURATION**: all 3 distractors = schema-inference only (things one might do for an old man). No phonological or local-detail distractor. | Swap one distractor to local-detail: "washing just the dishes" (right concept, wrong scope) | No |
| 19 | kt-ch19-l3-q5 | listen-mc | sentence: "His small eyes turned bright. His tail started to move quick." opts: "he had an idea\| **he was sleepy\| he was sad\| he was hot**" | **P1 R4_SCHEMA_SATURATION**: 3 distractors = single-word emotional/physical-state tokens, all same cognitive schema. No partial-parse or phonological option. | Replace 2 with phonological/detail distractors: "he heard a sound" (partial parse) / "his eyes went dim" (local-detail negation of cue) | No |
| 24 | kt-ch24-l6-q6 | listen-mc | question: "What did the father ask about now?" opts: "his older brothers\| **the family dog**\| the rice for dinner\| the broken window" | **P1 A3_JUNK_DISTRACTOR**: "the family dog" is not established in Kong Rong story — thematically incongruous obvious-miss. "the broken window" equally uncontextualized. | Replace with story-grounded distractors: "his younger sister" / "the pear tree outside" | No |
| 21 | kt-ch21-l5-q8 | listen-mc | opts: "he dropped into the hole\| he jumped over the hole\| he turned around and left\| he sat down on a big rock" | **P1 R4_ALL_SAME_START**: all 4 begin "he…" | Rewrite: "the trap was empty" / "a rope caught his foot" — break pronoun monotony | No |
| 19 | kt-ch19-l6-q9 | listen-mc | opts: "they were full from a big meal\| they were trapped in the water\| they were too busy playing games\| they fell asleep by the river" | **P1 R4_ALL_SAME_START + schema-saturation**: all 4 "they were…" + all distractors = schema-inference (plausible animal behaviors) | Rewrite 2: "their teeth were too dull" (partial-parse) / "mouse deer swam first" (partial-parse redirect) | No |
| 17 | kt-ch17-l7-x7 | listen-mc | opts: "because the old man had seen who she really was\| because she did not like the cold winter\| because the old man asked her to go away\| because she had run out of white cloth" + X48 flag | **P1 X2_LIST_BIAS + X48_VERBATIM combo**: all 4 options begin "because…" (structural tell); correct contains "the old man" (verbatim from sentence) | Rewrite: drop "because" prefix from ≥2 options → "she was seen" / "her secret was gone"; correct's verbatim "the old man" → "once he saw the truth" | No |
| 18 | kt-ch18-l6-x5 | listen-mc | X57: correct "helped" ↔ distractor "hurt" antonym pair | **P2 X57_ANTONYM_PAIR_MIRROR**: 4選1 退化成 2選1 | Replace "hurt" with: "turned away from" (same valence as wrong, no antonym tell) | No |
| 20 | kt-ch20-l3-x5 | listen-mc | X57: "happy" ↔ antonym distractor | **P2 X57_ANTONYM_PAIR_MIRROR** (×4 in Ch20) | Replace antonym distractor with same-valence near-miss | No |
| 19 | kt-ch19-l7-q5 | listen-mc | X57: "big" ↔ "small" antonym pair | **P2 X57_ANTONYM_PAIR_MIRROR** (×4 in Ch19) | Replace antonym | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch17-24 listen-mc Qs audited | 231 |
| R3 systematic A/C-only chapters | **2** (Ch17, Ch18) |
| R4_ALL_SAME_START violations (4-opt) | 9 (Ch21×7, Ch19×2) |
| R4_SAME_START distractors-only | 6 (Ch22-24) |
| R4_SCHEMA_SATURATION (manual) | 4 |
| A3 junk distractor (context-incongruent) | 3 |
| X57 antonym pairs (Ch17-24) | 22 total |
| X2 list-bias (Ch21 worst) | 9 in Ch21 alone |
| **Total unique violation sites** | **38** |

---

## D. Top 5 P0

| # | ID | Why P0 |
|---|-----|--------|
| 1 | Ch17 R3 SYSTEMATIC | ALL 10 listen-mc Qs have correct only at A or C — any child who plays twice figures out B/D = always wrong. 50% chance becomes certainty without audio. This is a psychometric validity collapse. |
| 2 | Ch18 R3 SYSTEMATIC | Same binary A/C-only pattern as Ch17. Both chapters authored together with same template flaw. |
| 3 | Ch21 kt-ch21-l4-q6 R4_ALL_SAME_START ("that…"×4) | "that he was the king / that he could fly / that some friend doubted / that the river was dry" — all grammatically identical subordinate clauses. The learner is distinguishing content within a locked template, not demonstrating listening comprehension. |
| 4 | Ch21 kt-ch21-l3-q6 R4_ALL_SAME_START ("to…"×4) | Same problem: "to make him look… / to keep something off… / to feed the hornets… / to make music in the wind" — 4 infinitive phrases, all plausible leaf uses, no failure-mode diversity. |
| 5 | ⚠️ Ch23 kt-ch23-l4-q6 A3_JUNK | "making bubbles for fun" in a drowning scene: "for fun" is an emotional register mismatch that signals wrongness before any audio comprehension occurs. True junk distractor. |

---

## E. Narrative Voice / Pacing Improvements (min. 3 required)

**E1 — Ch17/18 mechanical position alternation reveals authoring template**
Both chapters have q3→ci=2, q9→ci=0 without exception. Beyond the validity issue (P0 above), this makes the content *feel* templated — the rhythm of "third option is right" appears every lesson. Even after fixing the balance, vary the sentence structures for q3 and q9 entries to avoid the identical-slot feel.

**E2 — Ch21 Anansi chapter: prepositional-list fatigue**
9 X2 violations in one chapter means the player sees "to…/by…/they…/that…/he…" opening every single set of options. The Anansi trickster stories deserve options with more linguistic variety — "a vine stretched across" vs "the jungle path twisted" vs "his skin was pale" — showing functional failure modes, not just structural variety.

**E3 — Ch24 Kong Rong: thematic coherence of distractors**
"The family dog" and "the broken window" appear as distractors in a story about a 4-year-old sharing pears with siblings. These objects don't exist in the story world. Good distractor design requires all options to be plausible *in the story universe* (Bachman 1996). Replace with: "his younger sister" / "what pears were left" / "who was oldest" — all story-grounded.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Industry scan:**
- **Wang & Meng (2026)** — "Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods" (SAGE, 2026) — confirms that *psychometric item analysis* (IRT discrimination + distractor-choice frequency) integrated with AI generation is now the gold standard for L2 listening test design.
- **Corpus Prevalence of MCQ Options (arXiv 2602.17377, 2026)** — shows LLM-generated MCQs systematically place correct answers at certain positions (A/C bias well-documented). Human-expert designed tests still fall into the same trap.
- **TOEIC JLTA Research (Iimura)** — identified 5 distractor characteristics that attract test-takers: overlap, synonym, derivative, negative, specific-determiner. The "negative" type (antonym distractor) is the weakest because it collapses to binary choice — directly matching our X57 finding.
- **ACL 2025 (Generating Plausible Distractors, 2501.13125)** — recommends *student choice prediction* to select distractors that A2 learners will actually consider, not just domain-plausible options. Suggests IRT-informed distractor selection over rule-based generation.

**Pickup 適配評估:**
- ✅ R3 position balance gate: directly addresses Ch17/18 P0. Pickup already has the `correctIndex` field — a lint checking 0% occupancy at any position per chapter is a 5-line check.
- ✅ TOEIC 5-distractor taxonomy → already partially in our R4 spec; can be encoded as a `optionsFailureMode[]` field (already proposed in design standard, not yet in schema).
- ✅ IRT-informed distractor selection: applicable when we have real play data (post-launch). Pre-launch: use the 5-type taxonomy as a proxy.
- ❌ Student choice prediction (ML model from 2501.13125): requires training data. Not applicable pre-launch.

### ARCH-REC #154: X156_CORRECT_POSITION_BALANCE_GATE

**What:** Add lint rule to `validate-lessons.js` — for each chapter's `listen-mc` questions, check that positions B (index 1) and D (index 3) each receive ≥10% of correct answers (i.e., they're NOT permanently empty). If a chapter has ≥5 listen-mc Qs and either index 1 or index 3 has 0 correct answers → WARN.

**Why:** Ch17 and Ch18 P0 above. Position bias is the #1 threat to MC test validity (Tarrant 2009; ETS guidelines; arXiv 2602.17377 2026). A lint gate would have caught both chapters automatically.

**Effort:** Low — 15 lines in `validate-lessons.js`. No schema change. Warn-only.

**ROI:** High — catches the worst possible structural flaw (systematic position tell) automatically in every future chapter.

**Verdict:** ✅ ARCH-REC #154 — implement in validate-lessons.js as X156_CORRECT_POSITION_BALANCE_GATE (warn-only; alert when any position index is 0% across ≥5 listen-mc Qs in a chapter).

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| R3 position balance gate (X156) | arXiv 2602.17377; Tarrant 2009 | ✅ correctIndex exists; lint reads it | Low (15 lines lint) | High (prevent validity collapse) | **ARCH-REC #154** |
| IRT distractor-choice analytics | Wang & Meng 2026 (SAGE doi 10.1177/02655322251400375) | 🟡 post-launch only (needs real answer logs) | High | High post-launch | Hold for v2.1 data phase |
| optionsFailureMode[] field in schema | TOEIC JLTA Iimura; R4 spec (already proposed) | ✅ Zod schema + content authoring | Medium | High (enables auto-audit of R4 diversity) | Tier C — author decision on when to add |

---

*Sources consulted: [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) · [arXiv 2602.17377](https://arxiv.org/pdf/2602.17377) · [arXiv 2501.13125](https://arxiv.org/pdf/2501.13125) · [TOEIC Distractor Plausibility (JLTA)](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_pdf)*
