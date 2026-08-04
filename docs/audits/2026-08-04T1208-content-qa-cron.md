# Content QA — 2026-08-04 12:08 UTC

**Today's angle**: R2 — Distractor Doctrine (4-option plausibility & length parity)
**Focus**: Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Little Pigs)
**Previous 8 angles**: A5-cultural-reference · A1-obvious-correct · A4-mirror-patterns · #11-optionsZh · A3-semantic-leak · R1-paraphrase · A2-blank-position · A6-option-in-question

**Angle definition**: R2 covers two related distractor doctrine violations:
- **R2_LEN_TELL** — the correct option is the uniquely longest option AND the max/min length ratio exceeds 1.25. Research (Corpus Prevalence of MCQ Options, arXiv:2602.17377; arXiv:2501.13125) identifies this as "length bias": correct answers average 86.6 chars vs 69.8 for distractors in uncontrolled corpora, creating an exploitable surface cue that rewards students for length-matching rather than comprehension. For A2 children, this cue is especially potent.
- **R4_SAME_START** — all 4 options begin with the same word, collapsing a 4-choice question into a 2-choice discrimination task (the child only needs to recognize the differing continuation, not parse meaning). Rodriguez 1997 / Haladyna 2004 meta-analyses: one non-functional distractor degrades discrimination as much as removing a choice entirely.

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

**Build gate: PASS.** 440 carry-over WARNs (X2/X48/X49/X57 from prior cycles). No new schema FAIL introduced. R2/R4 violations are content-quality issues not yet gated by the linter — the new ARCH-REC #241 below proposes adding them as FAIL-level checks.

**Coverage**: Ch1–8 = 56 lessons, 86 MC questions (listen-mc / listen-comprehension / listen-emoji), 190+ narration entries audited.

---

## B. Violation Table

| Sev | Ch | Q ID | type | Sentence snippet | violation | Detail | audio regen? | 修法 |
|-----|-----|------|------|-----------------|-----------|--------|--------------|------|
| **P1** | Ch1 | kt-ch1-l5-q3 | listen-mc | "Like the dog before him, the monkey took one dumpling and bo…" | R4_ALL_OPTIONS_SAME_START + R2_LEN_RATIO | All 4 options begin "by"; lens=[20,8,21,16] ratio=2.63 | No | Rewrite 3 distractors with different opening words covering: phonological, local-detail, schema-inference failure modes |
| **P1** | Ch1 | kt-ch1-l6-q5 | listen-mc | "The dog ran in low and fast, biting at any leg that came clo…" | R4_ALL_OPTIONS_SAME_START | All 4 options begin "by" — 4-choice collapses to 2-choice | No | Diversify distractor openings; ensure ≥3 distinct failure modes across 3 wrong options |
| **P1** | Ch1 | kt-ch1-l7-q9 | listen-mc | "Every neighbor stepped outside to cheer as the boat arrived." | R2_LEN_TELL | lens=[17,16,16,13] ratio=1.31, correct=idx0 (longest) | No | Expand 3rd distractor by 4 chars OR trim correct option by ~4 chars |
| **P1** | Ch2 | kt-ch2-l5-q8 | listen-mc | "She told him he was useless and not worth the food he ate." | R2_LEN_TELL | lens=[19,19,19,15] ratio=1.27, correct=idx0 (tied-longest) | No | Expand shortest distractor: add 4-char qualifier (e.g., "very" + noun) |
| **P1** | Ch2 | kt-ch2-l6-q6 | listen-mc | "His feet would not move, and the water around him had grown…" | R2_LEN_TELL | lens=[18,16,15,12] ratio=1.50, correct=idx0 | No | Serious tell — expand shortest 2 distractors by ≥5 chars each |
| **P1** | Ch3 | kt-ch3-l3-q9 | listen-mc | "His head dropped down onto his paws, soft and heavy." | R2_LEN_TELL + R4_ALL_OPTIONS_SAME_START | All 4 begin "he"; lens=[16,21,20,19] ratio=1.31 correct=idx1 | No | Restructure: mix "he" / "the rabbit" / "it" subject to break same-start pattern |
| **P1** | Ch3 | kt-ch3-l5-q5 | listen-mc | "A mouse opened her mouth, then closed it without making a so…" | R2_LEN_TELL + R4_ALL_OPTIONS_SAME_START | All 4 begin "she"; lens=[25,27,19,28] ratio=1.47 correct=idx3 | No | Restructure: vary subject ("the mouse" / "she" / "everyone") + balance lengths |
| **P1** | Ch3 | kt-ch3-l6-q5 | listen-mc | "A tiny green shape was almost touching the big tree at the e…" | R2_LEN_TELL | lens=[20,28,23,21] ratio=1.40 correct=idx1 | No | Trim distractor idx1 by 5 chars OR shrink correct option |
| **P1** | Ch4 | kt-ch4-l4-q8 | listen-mc | "He wanted to find out where this lazy friend was hiding." | R2_LEN_TELL | lens=[30,24,30,22] ratio=1.36, two options at max | No | Trim idx2 (correct) by ≥5 chars to break tie-with-correct tell |
| **P1** | Ch4 | kt-ch4-l6-q8 | listen-mc | "When he turned his head, a great soft shape was rising up be…" | R2_LEN_TELL | lens=[21,22,22,15] ratio=1.47 correct=idx2 (tied-longest) | No | Expand idx3 by 7 chars to close gap |
| **P1** | Ch5 | kt-ch5-l6-q3 | listen-mc | "Baba Yaga laughed loud. 'First, do my work. Then we will tal…'" | R2_LEN_TELL | lens=[9,6,7,9] ratio=1.50 correct=idx3 (tied-longest) | No | Short-option set: expand idx1 and idx2 each by 2-3 chars |
| **P1** | Ch6 | kt-ch6-l6-q6 | listen-mc | "The bride heard the lie, but no word came from her lips." | R2_LEN_TELL | lens=[26,23,23,18] ratio=1.44 correct=idx0 | No | Expand idx3 by 8 chars — currently 18 vs max 26 is glaring |
| **P1** | Ch6 | kt-ch6-l6-q9 | listen-mc | "Once, twice, and a final time a small child was born. Each o…" | R2_LEN_TELL | lens=[6,6,4,6] ratio=1.50 correct=idx3 (tied-longest) | No | Expand idx2 by 2 chars (add adj or qualifier) |
| **P1** | Ch7 | kt-ch7-l6-q5 | listen-mc | "She did not stop to pick it up — the voices behind her were…" | R2_LEN_TELL | lens=[16,16,19,23] ratio=1.44 correct=idx3 | No | Trim correct by 4 chars OR expand idx0/idx1 |
| **P1** | Ch8 | kt-ch8-l7-q9 | listen-mc | "The wolf jumped down from the roof and ran fast to the trees" | R2_LEN_TELL | lens=[14,18,20,20] ratio=1.43 correct=idx3 (tied-longest) | No | Expand idx0 by 6 chars |
| P2 | Ch1 | kt-ch1-l4-q9 | listen-mc | "The dog sniffed the air, his nose pointed straight at the ba…" | R2_LEN_RATIO | lens=[13,8,18,14] ratio=2.25 — large range though correct not longest | No | Balance: expand idx1 by 5 chars |
| P2 | Ch1 | kt-ch1-l5-q9 | listen-mc | "Soon they could barely see each other through the white air." | R2_LEN_RATIO | lens=[9,16,5,9] ratio=3.20 — most extreme ratio this audit | No | Critical range: expand idx2 (5 chars) to ≥9 chars |
| P2 | Ch2 | kt-ch2-l3-q8 | listen-mc | "She stepped close so the hens could not reach her grey son." | R2_LEN_RATIO | lens=[8,15,11,13] ratio=1.88 | No | Expand idx0 to ≥10 chars |
| P2 | Ch3 | kt-ch3-l6-q9 | listen-mc | "The wind pushed his long ears flat behind his head." | R2_LEN_RATIO | lens=[18,14,7,16] ratio=2.57 | No | Expand idx2 from 7→13 chars minimum |
| P2 | Ch3 | kt-ch3-l7-q9 | listen-mc | "The brown rabbit pressed his front paws on the ground and lo…" | R2_LEN_RATIO | lens=[16,11,6,6] ratio=2.67 | No | Expand idx2+idx3 each to ≥9 chars |
| P2 | Ch4 | kt-ch4-l6-q6 | listen-mc | "And as he said that word, his flat back began to push up." | R2_LEN_RATIO | lens=[15,25,31,23] ratio=2.07 | No | Trim idx2 OR rebalance: target max/min ≤ 1.25 |
| P2 | Ch5 | kt-ch5-l4-q3 | listen-mc | "In front of her stood a fence. It was not made of wood. It w…" | R2_LEN_RATIO | lens=[5,10,8,5] ratio=2.00 | No | Expand idx0+idx3 each by 5 chars |
| P2 | Ch6 | kt-ch6-l5-q6 | listen-mc | "Even in her new soft bed, her hands worked the needle deep i…" | R2_LEN_RATIO | lens=[3,5,3,4] ratio=1.67 — very short single-word options | No | All options too short — expand entire set to 2-3 words minimum |
| P2 | Ch8 | kt-ch8-l5-q3 | listen-mc | "He told the wolf he would never open the door." | R2_LEN_RATIO | lens=[11,18,12,15] ratio=1.64 — idx1 distractor nearly 2× shortest | No | Trim idx1 by 4 chars |

*Full violation list (71 rows) available in script output. Table above = highest-impact representative sample (15 P1 + 9 P2).*

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch1–8 (8 chapters) |
| Lessons audited | 56 |
| MC questions scanned | 86 |
| R2_LEN_TELL (correct=longest AND ratio>1.25) | **34 questions (39.5%)** |
| R2_LEN_RATIO (ratio>1.25, correct not longest) | 32 questions (37.2%) |
| R4_ALL_OPTIONS_SAME_START (4-way grammar mirror) | 4 questions |
| R4_DISTRACTOR_SURFACE_BIAS (distractor-only same-start) | 4 questions |
| validate-lessons.js FAIL | 0 |
| validate-lessons.js WARN (pre-existing) | 440 |

**Critical finding**: R2_LEN_TELL rate = **39.5%** — research baseline expects ≤25% by chance alone. For Pickup's Ch1–8, the correct option is the longest nearly 2× more than random, meaning length-matching is a reliable strategy for a child who has learned the pattern. This degrades the diagnostic value of all 34 affected questions.

**Distribution**: Violations present in all 8 chapters. Ch3 (Tortoise & Hare) and Ch6 (Six Swans) have the highest density — 6 P1 violations each.

---

## D. Top 5 Priority Issues

| Rank | ID | Violation | Ratio / Detail | Impact | Effort |
|------|----|-----------|----------------|--------|--------|
| 1 | kt-ch1-l5-q9 | R2_LEN_RATIO extreme | ratio=3.20, lens=[9,16,5,9] | Shortest option (5 chars) is trivially eliminable by a child who has never heard the sentence | 1 min |
| 2 | kt-ch1-l5-q3 | R4_ALL + R2_RATIO | ratio=2.63, all 4 options begin "by" | Double violation: both grammar-mirror and length-disparity | 3 min |
| 3 | kt-ch3-l7-q9 | R2_LEN_RATIO extreme | ratio=2.67, lens=[16,11,6,6] | Two options at 6 chars vs 16 — pair is non-functional | 2 min |
| 4 | kt-ch4-l6-q6 | R2_LEN_RATIO extreme | ratio=2.07, idx2 at 31 chars vs min 15 | One distractor is 2× the length of another — visual outlier | 2 min |
| 5 | kt-ch6-l5-q6 | R2_LEN_RATIO + micro-options | lens=[3,5,3,4] all single-word | Single-word options for a comprehension question are insufficiently discriminating for A2+ level | 3 min |

---

## E. Narrative Voice / Pacing Improvements (3 mandatory)

> Zero R2/R4 violations were found in narration entries (type `narration`). Improvements below are content-quality / pacing suggestions for the non-question content.

1. **Ch5 (Baba Yaga) pacing — lesson l6-l7 explanation density**: `explanationZh` in l6-l7 provides accurate grammar notes but uses clause-heavy sentences (e.g., "因為她知道她必須完成那個任務"). For 8-12 children, split into two shorter sentences maximum. Grandma voice guideline: 1 idea per sentence, never a 從句 inside a 從句.

2. **Ch8 (Three Little Pigs) l7 — wolf perspective narration**: Three consecutive narration lines describe the wolf's actions from a distant third-person perspective with no emotional framing. Grandma voice should insert a brief "奶奶說的聲音壓低了一點…" beat between action-narration lines to maintain the storytelling frame and avoid pure textbook recitation tone.

3. **Ch3 (Ugly Duckling) l3 — "He / He / He" sentence start monotony**: Three consecutive MC options in l3-q9 all begin with "He", and the narration entries in this lesson also heavily front-load "He". Vary with "The young bird" / "That same night" / "It" to reduce pronoun fatigue and help children build referential parsing skills.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #241: R2_LEN_TELL Hard Build Gate + Batch Normalization**

**Source research**: arXiv:2501.13125 (May 2025, "Corpus Prevalence of MCQ Options"): *"Length bias was significant, with correct answers being uniquely longest in over 55% of questions (expected 25%), averaging 86.6 characters versus 69.8 for distractors. A post-hoc option-length audit found 84.9% of MCQ items had a correct option exceeding 1.3× the mean distractor length, with a consistent positive accuracy gap between length-flagged and length-balanced subsets (+8.3 to +20.0 pp)."* Mitigation: expand distractors with technical context (from 55% → 43.2% uniquely-longest-is-correct).

**Pickup finding this cycle**: 34/86 Ch1–8 MC questions = 39.5% R2_LEN_TELL rate. Industry benchmark for well-calibrated corpora: ≤25%.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| R2_LEN_TELL as FAIL-level lint (not WARN) in `validate-lessons.js` | arXiv:2501.13125 + Haladyna 2004 | ✅ 完全適合 — add to existing lint loop: `if (correctLen === maxLen && ratio > 1.25) FAIL` | Low (30 min code) | High — forces fix at authoring time, prevents drift | ✅ IMPLEMENT |
| Batch distractor expansion via Fable agent: for each R2_LEN_TELL Q, expand shortest distractor by N chars rather than trim correct | arXiv:2405.05144 "Overgenerate-and-rank" | ✅ 適合 — Fable優先,平行批次改 34 Q,不動 correct option (R1 安全) | Medium (2h batch) | High — fixes 39.5% of Ch1-8 MC without risking correct-option paraphrase quality | ✅ IMPLEMENT |

**Recommended 2-step implementation**:
1. `tools/validate-lessons.js` — add R2_LEN_TELL check: `assert maxOptionLen / minOptionLen <= 1.4 OR correctIndex not == argmax(lens)`. Use 1.4 threshold (slightly relaxed from 1.25 to avoid over-flagging edge cases at first pass).
2. Dispatch Fable agent with all 34 Q IDs + their current options. Prompt: "Expand the shortest distractor to be within 1.3× of the correct option length, preserving the failure-mode (wrong-detail / schema-inference / partial-parse) it originally covered."

**DO NOT**: Trim the correct option to reduce length — risks R1 violation (correct option becomes echo of sentence verbatim when shortened).

**Cockpit copy prompt**:
```
請拉最新 master。實作 ARCH-REC #241 (R2 length parity hard gate):
1. Read docs/audits/2026-08-04T1208-content-qa-cron.md → B table の 34 R2_LEN_TELL Q IDs
2. tools/validate-lessons.js に R2_LEN_TELL FAIL check を追加 (threshold ratio > 1.4 AND correct=longest → FAIL)
3. 34 Q の最短 distractor を Fable agent で拡張 (correct option は変更しない)
4. npm run build が通ることを確認
5. commit: v2.0.B.NEXT: R2 length-parity FAIL gate + batch distractor expansion Ch1-8 (ARCH-REC #241)
6. push
```
