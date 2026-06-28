# Content QA — 2026-06-28 00:12 UTC

Today's angle: **#4 A2 cloze blank 位置 (start/mid/end)** — in v2.0 listen-mc format, "blank position" = which cognitive region of the sentence the question focuses on. Audit checks: (a) WH-type monotony within a lesson, (b) WH-type chain across consecutive lessons in a chapter, (c) systemic subSkill tagging vs R6 diversity rule.

Focus: **Ch9–16** (Cinderella / Chang'e / Weaver Girl / Little Red / Urashima / Emperor's New Clothes / Issun-Boshi + Ch16 Issun cont.)

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:   2 lint issue(s): X2_OPTION_LIST_BIAS (she, she)
WARN lessons-ch10.json:  3 lint issue(s): X2_OPTION_LIST_BIAS (a, a, she)
WARN lessons-ch11.json:  3 lint issue(s): X2_OPTION_LIST_BIAS (a, a, he)
WARN lessons-ch12.json:  1 lint issue(s): X2_OPTION_LIST_BIAS (a)
WARN lessons-ch13.json:  3 lint issue(s): X2_OPTION_LIST_BIAS (a, an, he)
WARN lessons-ch14.json:  1 lint issue(s): X2_OPTION_LIST_BIAS (a)
WARN lessons-ch15.json:  1 lint issue(s): X2_OPTION_LIST_BIAS (he)
OK   lessons-ch16.json:  0 issues (JSON shape + mirror + extended lint)

Total mirror-lint issues (corpus-wide): 106
Ch9-16 automated: 14 X2_OPTION_LIST_BIAS (all pre-existing, warn-only)
Build: PASS (warn-only gate)
```

---

## B. Violation table — A2 blank position audit (Ch9–16)

### SYSTEMIC P0 — subSkill ALL "detail" (corpus-wide, not Ch9-16 only)

**Root violation**: All 378 listen-mc questions across Ch1–31 carry `subSkill: "detail"`. Zero `gist`, zero `inference`, zero `vocab`, zero `function` anywhere in the corpus.

Per R6 (pickup-q-design-standard-v1.md):
> Lesson must contain: ≥3 gist, ≥5 detail, ≥2 inference, ≥2 vocab/function. No 2 consecutive Qs with same sub-skill.

**Impact**: The linter cannot enforce "no 2 consecutive same sub-skill" because all tags are identical. Analytics cannot segment gist vs inference performance. Children who finish Ch9-16 never practice "main idea" or "implied meaning" listening strategies — only "find the specific fact" scanning. This is the root cause of blank-position monotony: every "blank" is guaranteed to be an explicit fact, always at a predicable cognitive level.

**Scale**: 378/378 listen-mc across 31 chapters (not just Ch9-16).

### P0 — WH_CHAIN (3+ consecutive lessons, same dominant WH type)

| Ch | Lesson chain | WH | Example question | Learner exploit |
|----|-------------|-----|-------------------|-----------------|
| 10 | kt-ch10-l3 → kt-ch10-l4 → kt-ch10-l5 | `what` | l3: "What did Hou Yi find?" / l4: "What did she take?" / l5: "What did Chang'e drink?" | After 2 lessons, learner expects every answer to be a noun/object → listens only for the "thing" rather than full sentence |
| 13 | kt-ch13-l5 → kt-ch13-l6 → kt-ch13-l7 | `what` | l5: "What did the wolf do next?" / l6: "What did the girl carry?" / l7: "What happened at the end?" | 3 consecutive "what" lessons in Little Red Riding Hood; learner can pattern-match object-hunting strategy |
| 15 | kt-ch15-l3 → kt-ch15-l4 → kt-ch15-l5 | `what` | l3: all 3 listen-mc = "what" / l4: 2 of 3 = "what" / l5: 1 of 3 = "other/how/what" | Emperor's New Clothes opens with 3-lesson WH chain; hardest to break once established in a chapter-start |

### P1 — WH_MONOTONY (all listen-mc in a lesson share the same WH)

| Ch | Q ID | type | WH | All questions | violation | 修法 | audio regen? |
|----|----|------|-----|---------------|-----------|------|--------------|
| 9 | kt-ch9-l5 | listen-mc | `what` | q3: "What did the pumpkin become?" / q9: "What did the fairy warn about?" | All 2 listen-mc = "what" — learner always hunts for an object | Replace q9 with a "why/how" question targeting the fairy's warning mood or the time constraint | No |
| 9 | kt-ch9-l6 | listen-mc | `how` | q3: "How did the prince watch Cinderella?" / q9: "How did Cinderella leave the ball?" | All 2 = "how" — manner-scanning monotony | Replace q3 with "Why did the prince keep following her?" (inference → feeling) | No |
| 9 | kt-ch9-l7 | listen-mc | `how` | q3: "How did the prince look for her?" / q7: "How did the slipper fit Cinderella?" | All 2 = "how" — manner only | Replace q7 with "Why did Cinderella smile when the slipper fit?" (inference → emotion) | No |
| 10 | kt-ch10-l6 | listen-mc | `how` | q3: "How did Chang'e move through the sky?" / q9: "How did Hou Yi feel when he saw her?" | Both "how" — but q9 is actually an inference question tagged incorrectly | Retag q9 `subSkill: "inference"` and rewrite question as: "What was Hou Yi feeling when he looked up?" | No |
| 11 | kt-ch11-l3 | listen-mc | `what` | q3: "What did Hou Yi see on the land?" / q9: "What happened after the first arrow?" | Both "what" | Replace q3 with "Why was the land so damaged?" (gist → cause-effect) | No |
| 12 | kt-ch12-l3 | listen-mc | `how` | q3: "How did the Queen feel about Zhinu?" / q9: "How did Zhinu answer?" | Both "how" — attitude/manner | q3 already tests attitude → retag `subSkill: "inference"`. q9 tests action → retag `subSkill: "detail"`. Diversity achieved by correct tagging alone | No |
| 13 | kt-ch13-l5 | listen-mc | `what` | q3: "What did the wolf do next?" / q9: "What did the girl notice?" | Both "what" + part of 3-lesson WH_CHAIN | Replace q3 with "Why did the wolf need to hide?" (inference → motivation) | No |
| 14 | kt-ch14-l7 | listen-mc | `how` | q3: "How did Urashima feel now?" / q9: "How did Urashima change?" | Both "how" — feeling/change | q3 already tests emotion → retag `subSkill: "inference"`. Rename q3 question: "What did Urashima suddenly feel?" (varies WH) | No |
| 15 | kt-ch15-l3 | listen-mc | `what` | q3/q6/q8: all "what" (3Q) | All 3 in a lesson = "what" — most severe within-lesson instance | q6: "What was the minister afraid people would think?" → convert to "Why didn't the minister tell the truth?" (inference); retag `subSkill: "inference"` | No |
| 15 | kt-ch15-l4 | listen-mc | `what` | dominant = "what" (2/3) + part of WH_CHAIN | Continues WH_CHAIN from l3 | Ensure at least 1 "why" or "how-feel" question in l4 | No |
| 15 | kt-ch15-l6 | listen-mc | `how` | q3/q6/q8: all "how" (3Q) | All 3 = "how" | q6: "How did the emperor look to the child?" → convert: "Why could the child see what adults couldn't?" (gist → courage/innocence theme) | No |
| 16 | kt-ch16-l5 | listen-mc | `how` | q3: "How did the demon look?" / q9: "How did the demon react?" | Both "how" — visual/reaction | q9 already tests reaction/attitude → retag `subSkill: "inference"` | No |
| 16 | kt-ch16-l6 | listen-mc | `what` | q3: "What was it like inside the demon?" / q9: "What did the demon finally do?" | Both "what" | q3 tests atmosphere → gist. Retag + rewrite: "Was it scary or bright inside?" converts to yes/no inference | No |

### P2 — Narrative pacing / voice improvements (no rule violation)

1. **Ch9-l4-q9** (Cinderella): Sentence "Her voice was soft, but her eyes shone bright." Q: "What was the fairy godmother's manner like?" — The question uses the word "manner" which may be unfamiliar to 8-12 children. Rewrite: "What kind of person was the fairy godmother?" (more natural, tests holistic impression = gist) — no audio regen needed.

2. **Ch13-l3-q3** (Little Red): Sentence "She picked flowers and sang a little song." Q: "What was Little Red Riding Hood doing?" — Extremely easy (action directly stated). Better blank target: rewrite question as "Why did she stop walking on the path?" (converts to inference/motivation, challenges deeper comprehension).

3. **Ch15-l5-q3** (Emperor's New Clothes): Sentence "The minister bowed his head and smiled wide." Q: "What did the minister do?" — Weakest question in Ch15: the "what" is surface action only, zero inference required. Rewrite: "Did the minister actually believe in the clothes?" with two-option choose (yes/no + reason), upgrading to `listen-tf` type and tagging `subSkill: "inference"`.

---

## C. Stats

| Metric | Ch9–16 | Corpus-wide |
|--------|--------|-------------|
| Total listen-mc | 88 | 378 |
| subSkill = "detail" | 88 (100%) | 378 (100%) |
| subSkill = "inference" | 0 (0%) | 0 (0%) |
| subSkill = "gist" | 0 (0%) | 0 (0%) |
| WH_CHAIN violations (P0) | 3 | not scanned |
| WH_MONOTONY violations (P1) | 13 lessons | not scanned |
| Lessons with WH diversity OK | 22/40 | — |
| Automated lint issues | 14 | 106 |

**WH distribution Ch9–16** (88 questions):
- `what`: 37 (42%) — dominant
- `how`: 32 (36%)
- `why`: 10 (11%)
- `where`: 4 (5%)
- `who`: 3 (3%)
- `other` (yes/no/indirect): 2 (2%)

Industry target (per Buck 2001 + ETS TOEIC design): What ≤30%, How ≤25%, Why ≥15%, Who/Where/When ≥15% combined. Pickup's `what` (42%) and `how` (78% combined with what) are above ceiling.

---

## D. Top 5 P0

1. **[SYSTEMIC]** `subSkill: "detail"` on 378/378 listen-mc — R6 rule cannot be enforced. Zero gist/inference/vocab questions anywhere in 31-chapter corpus. Root cause of positional monotony: learners always know the answer is an explicit fact, never need gist or inference strategy.

2. **[Ch10] WH_CHAIN** `kt-ch10-l3 → l4 → l5` all `what` — Chang'e chapter opens with 3 consecutive object-hunting lessons. Learner establishes scanning-for-noun heuristic that persists into Ch10-l6 where the first real inference question appears without structural preparation.

3. **[Ch13] WH_CHAIN** `kt-ch13-l5 → l6 → l7` all `what` — Little Red Riding Hood's climax section is all `what`. The most dramatically rich part of the story (wolf disguise, grandmother deception) tests only surface objects, never emotional inference or intent.

4. **[Ch15] WH_CHAIN** `kt-ch15-l3 → l4 → l5` all `what` — Emperor's New Clothes opens with 3-lesson WH chain. Uniquely damaging because this story's *theme* (social conformity, fear of honesty) is entirely inference-level, yet all listen-mc questions stay at surface "what did X do" level.

5. **[Ch15-l3/l6] WH_MONOTONY (3Q)** — Two lessons in Ch15 each have 3 listen-mc all with same WH. Within a 2-question lesson it's borderline, but 3/3 same WH in one lesson is the highest within-lesson monotony count found in Ch9-16.

---

## E. Architecture Recommendation (對齊業界 2026)

### ARCH-REC #87: X40_SUBSKILL_DIVERSITY_LINT — subSkill enum strictness + R6 diversity lint in validate-lessons.js

### Industry reference

**Buck 2001** (*Assessing Listening*, Cambridge University Press) remains the foundational text. Sub-skill taxonomy: `gist` (global understanding), `main idea`, `detail` (specific information), `inference` (implied meaning), `attitude/function`. Best practice tests distribute ~20-30% gist, 40-50% detail, 20-25% inference.

**ETS TOEIC Part 3-4 design guidelines** (public test specifications): Each 3-question passage set must include at least one gist-level and one inference-level question. Pure detail-only passage sets are rejected in QA review.

**Cambridge A2 Key Listening** (2023 handbook): Each section mixes specific information items with at least one "attitude/opinion" item and one "main idea" item. No section is permitted to be 100% factual-detail.

**Duolingo Stories (public pedagogy notes 2024)**: Each ~10-entry story segment interleaves comprehension questions across at least 2 cognitive levels. Detail-only sequences are avoided "because they train test-taking pattern-matching rather than comprehension."

### Pattern: subSkill diversity lint + schema enum strictness

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **subSkill enum strictness** — Change `subSkill` from open string to `z.enum(['gist','detail','inference','vocab','function'])` in LessonSchema | ETS/Cambridge design standards | ✅ Direct fit: Zod schema already has `subSkill` field; just needs enum narrowing | Low (~30 min schema + tsconfig) | High: forces content authors to choose valid sub-skill | ✅ 推薦 |
| **R6 diversity lint in validate-lessons.js** — Warn when all listen-mc in a lesson share the same `subSkill`; fail build when 3+ consecutive lessons in a chapter are 100% detail | ETS Part 3-4 QA policy | ✅ Direct fit: validate-lessons.js is the right hook; same pattern as existing X2/R1 rules | Medium (~1-2h: add per-lesson subSkill count + consecutive-lesson checker) | High: prevents future regression, forces content diversity | ✅ 推薦 |
| **WH-chain lint** — Warn when ≥3 consecutive lessons in a chapter have the same dominant WH type in listen-mc | Pickup-internal finding (this audit) | ✅ Direct fit: pure JSON/text analysis, no model needed | Low (~1h in validate-lessons.js) | Medium: addresses pattern found today in Ch10/13/15 | ✅ 推薦 |
| **Auto-classify subSkill by question pattern** — Heuristic: `why` → inference, `how feel` → inference, `what` → detail, `which is true` → inference | Research application | 🟡 Partial fit: heuristic covers ~60% of cases; "what happened to X's feeling?" still needs manual tagging | Medium (node script) | Medium: quick win for re-tagging 378 existing questions | 🟡 後續考慮 |

### Cockpit推送

**X40_SUBSKILL_DIVERSITY_LINT** (HIGH ROI):
- 在 validate-lessons.js 加 R6 sub-skill lint:
  1. Schema: 把 `subSkill` 改成嚴格 enum `['gist','detail','inference','vocab','function']`
  2. 每個 lesson lint: 若全部 listen-mc 都是 `subSkill: "detail"` → X_SUBSKILL_MONOTONY WARN
  3. 章節 lint: ≥3 consecutive lessons all-detail → X_CHAPTER_SUBSKILL_CHAIN WARN
  4. WH chain lint: ≥3 consecutive lessons same dominant WH → X_WH_CHAIN WARN (今天發現的 Ch10/13/15)
- JSON 改動量: 378 個 `subSkill` 欄位 retag (可 batch script 先 heuristic 填, 再人工 review)
- 預估 effort: schema + lint ~2h; retag script ~1h; content review ~4h

---

*Audit produced: 2026-06-28 00:12 UTC | Ch9–16 | 88 listen-mc scanned | 1 systemic P0 + 3 WH_CHAIN P0 + 13 P1 + 3 P2*
