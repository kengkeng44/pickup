# Content QA — 2026-07-19 06:07 UTC

**Today's angle:** R2 — Distractor Doctrine (4-option functional plausibility audit)
**Focus:** Ch9–16 (Cinderella / Chang'e & Hou Yi / Ten Suns / Cowherd & Weaver / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Tom Thumb range)
**Scored questions:** 632 (491 from node scan; position-distribution base 371 four-option items)
**Academic backing:** Haladyna & Rodriguez 2013 Guidelines 14, 22, 29; Buck 2001 §4 "implausibility tell"; ACL 2025 "Generating Plausible Distractors via Student Choice Prediction" (aclanthology.org/2025.acl-long.1154/)

---

## A. validate-lessons.js result

```
Build: PASS
Total mirror-lint issues: 440 (warn-only)
Ch9 lint: 8 issues (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3)
Ch10–16: comparable pattern (X2, X49, X57 ongoing structural issues, consistent across chapters)
```

---

## B. R2 Distractor Doctrine Scan — Methodology

**Scanner checks:**
- SAME_START_ALL: all options share first word → pronoun/article anchoring
- PHANTOM_MORPH: correct/distractor morphological overlap → transparency (base/-s/-ed/-ing)
- LENGTH_SKEW: max/min option length ratio ≥ 3× → visual length tell
- SYNTAX_MISMATCH: single-word option mixed with full-clause option
- Manual review: 20 sampled comprehension + listen-mc for plausibility

**Scanner results:**
| Check | Hits | Classification |
|-------|------|---------------|
| SAME_START_ALL | 14 | 9 picture-mc "a" (structural P2), 5 comprehension "she/he" (structural P2) |
| PHANTOM_MORPH | 12 | ALL grammar-mc morphological form sets — false positives, intentional design |
| LENGTH_SKEW | 0 | — |
| SYNTAX_MISMATCH | 0 | — |
| Correct-position bias | — | pos0=23.7%, pos1=25.6%, pos2=25.1%, pos3=25.6% — **uniform, no bias** |

**Manual review findings:** 7 genuine violations (3 P0, 4 P1)

---

## C. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 10 | kt-ch10-l5-x6 | comprehension | "What feeling does 'What now?' give us?" | **P0 ABSURD_DISTRACTOR**: "bored — nothing more interesting will happen" — fairy-tale climax pivot; any 8yo story reader eliminates instantly; violates Haladyna G29 (plausible) | Replace with "hopeful — the story has a happy ending coming" (plausible competing inference) | No |
| 10 | kt-ch10-l7-x4 | comprehension | "What does putting out her food tell us?" | **P0 CROSS_SEMANTIC**: "very hungry — cooking too much food every night" — misreads "put out food" (set food outside) as active cooking; cross-category confusion that no story-aware player makes | Replace with "regretful — wishing he had kept her safe" (plausible emotional alternative) | No |
| 11 | kt-ch11-l7-x2 | comprehension | "What did they gain by living on earth?" | **P0 PREMISE_CONTRADICTION**: "a place in the clouds" — story explicitly states they chose earth over heaven; choosing earth = giving up their place in clouds; direct logical contradiction | Replace with "immortal power from the elixir" (plausible competing claim, incorrect but story-adjacent) | No |
| 14 | kt-ch14-l3-x2 | comprehension | "What were the walls made of?" | **P1 VERBATIM_ECHO**: correct "walls that shone like pearl" shares 3-gram "shone like pearl" with stimulus "The walls shone like pearl" — Haladyna G12: avoid verbatim restatement as correct | Reword to "they glowed with a soft pearly light" (paraphrase preserves meaning, removes copy signal) | No |
| 12 | kt-ch12-l5-x2 | comprehension | "What did Niulang do after Zhinu was taken?" | **P1 ROLE_CROSS**: "started weaving by himself" assigns Zhinu's story role (weaver) to Niulang — child who read Ch12 eliminates immediately via character knowledge | Replace with "set out to climb to the sky to find her" (plausible action for Niulang's character arc) | No |
| 9 | kt-ch9-l4-lg2 | comprehension | "What does this scene tell us?" (no door, no window) | **P1 STIMULUS_CONTRADICTION**: "she arrived through an open door at the back" directly contradicts stimulus sentence "No door opened" — same sentence, opposite claim | Replace with "she had lived in the forest nearby for years" (plausible but unsupported inference) | No |
| 13 | kt-ch13-l6-x4 | comprehension | Wolf's last answer reveals? | **P1 COMIC_ABSURD**: "he just liked the girl's hat" — at story climax ("All the better to eat you with!"), a hat-preference distractor breaks story register and is obviously dismissible | Replace with "he was actually playing a joke on her" (plausible competing interpretation for young readers) | No |

---

## D. Stats

| Category | Count | Notes |
|----------|-------|-------|
| Total scored questions Ch9-16 | 491 | narration excluded |
| 4-option MC items | 371 | correct-position distribution measured |
| P0 violations (genuine) | 3 | absurd/contradiction distractors in comprehension |
| P1 violations (genuine) | 4 | verbatim echo, role-cross, stimulus-contradiction, comic-absurd |
| P2 structural (not violations) | 14 | picture-mc "a" prefix + comprehension "she/he" parallel — grammatically required |
| False positives (scanner) | 12 | grammar-mc morphological form sets (base/-s/-ed/-ing) — intentional design |
| Position bias | None | pos1 peak = 25.6%, within ±1pp of uniform 25% |
| Grammar-mc form sets | 12 | {base/-s/-ed/-ing} — correct R2 design for morphology items |

---

## E. Top 5 P0/P1 Ranked

1. **⚠️ P0 · kt-ch10-l5-x6** — "bored" distractor at Chang'e's ascension climax — breaks 4-option functional test, degrades to 3-option
2. **⚠️ P0 · kt-ch11-l7-x2** — "a place in the clouds" contradicts explicit story resolution — logical inverse of correct answer
3. **⚠️ P0 · kt-ch10-l7-x4** — "cooking too much food" misreads "put out food" — semantic category error, implausible to story reader
4. **P1 · kt-ch14-l3-x2** — verbatim-echo correct answer (3-gram from stimulus) — reading comprehension collapses to text-matching
5. **P1 · kt-ch9-l4-lg2** — distractor directly contradicts stimulus sentence — same-text elimination, no inference needed

---

## F. Narrative Voice / Pacing Improvements (required — 3 proposals)

Even with no P0, three structural voice improvements recommended:

1. **Grammar-mc stem genericness** — 8 of 12 grammar-mc stems use "Which word is correct?" / "Which word fits the blank?" — atomised from story world. Proposed: embed in奶奶 framing, e.g. "奶奶讀到這一句——選出對的字填進去：" This grounds morphology drill in storytelling register and signals to child that this is part of the story session, not a decontextualised grammar test. (Haladyna G8: the stem should convey context clearly; story-embedded stem increases ecological validity for ELT.)

2. **comprehension-lg2 explanationZh register** — current explanations use logical-inference language ("這說明她「不是普通人」，是有魔法的存在！"). Good but academic. Propose adding one奶奶-voice bridge sentence per lg2 explanation: "奶奶輕聲說：..." before the logical explanation. This maintains the "bedtime story" frame even during metacognitive feedback, consistent with v2.0 brand pillar (溫暖陪伴).

3. **listen-mc feedback missing story-moral callback** — post-answer feedback for listen-mc shows "✓ correct" + explanationZh but never ties back to chapter moral. Propose: for the final lesson's listen-mc questions (l7 in each chapter), append a one-line moral echo: e.g. Ch11 final question → "這就是后羿的選擇——力量要用來保護別人，才是英雄。" This is standard Duolingo practice for story-mode units (unit-end reflection sentence).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #177: X177_DISTRACTOR_TELEMETRY_LOOP

**Source:** ACL 2025, "Generating Plausible Distractors for Multiple-Choice Questions via Student Choice Prediction" — https://aclanthology.org/2025.acl-long.1154/

**Industry pattern:** Leading ELT platforms now validate distractors via **student-choice telemetry** rather than purely author review. Key insight: a distractor chosen by <2% of players is functionally invisible — players skip it without considering it, meaning it provides zero measurement value and may signal implausibility to other players (reducing 4→3 effective options). ACL 2025 trains a Student Choice Prediction model on response logs to pre-screen generated distractors before deployment.

**Pickup 適配分析:**
- ✅ **Relevant problem**: This audit found 3 P0 absurd distractors in Ch9-16 that automated content generation missed; these would be caught by telemetry in 1-2 weeks of player data
- ✅ **Architecturally feasible**: React + localStorage → add `distractor_choice` event alongside existing `runStore` lesson-progress writes
- ✅ **Static hosting compatible**: Cloudflare Pages KV or a lightweight CF Worker endpoint can aggregate event counts; no database required
- ✅ **Effort**: Low (event write) + Medium (cockpit surfacing); no app-level architecture change
- 🟡 **Scale concern**: Pickup's player base may be small; 2% threshold needs minimum ~50 plays per question to be meaningful. Threshold should start at 1% with ≥20 plays guard

**Proposed implementation path:**
```json
// localStorage pickup.distractorChoices
{
  "kt-ch10-l5-x6": { "0": 12, "1": 87, "2": 3, "3": 5 },
  ...
}
```
Weekly CF Worker reads aggregate → computes per-distractor selection rate → cockpit surfaces: "⚠️ kt-ch10-l5-x6 distractor[2]='bored' chosen by 2.8% — candidate for replacement"

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Distractor Telemetry Loop | [ACL 2025](https://aclanthology.org/2025.acl-long.1154/) | ✅ High fit — absurd distractor detection, no backend DB needed, CF KV stores aggregate counts | Low (write) + Medium (cockpit) | High (auto-detects R2 P0 violations passively as players play) | **推薦實作** — surfaces content bugs that 5-agent audit misses, scales with player growth |

**ARCH-REC #177 cockpit 1-tap prompt:**
> 請拉最新 master. 實作 2026-07-19T0607 audit ARCH-REC #177 (X177_DISTRACTOR_TELEMETRY_LOOP): 1) 在 renderers.tsx 的 MC answer-submission handler 加 distractor_choice 事件 write 到 localStorage key `pickup.distractorChoices`，格式 `{[qid]: {[optionIndex]: count}}`; 2) 在 cockpit-deploy/index.html 加 section 讀取並展示 top-5 low-selection distractors (選擇率 <5%); 3) npm run build 過; 4) commit + push. Commit: v2.0.B.NEXT: distractor telemetry loop — localStorage distractor_choice tracking (ARCH-REC #177)

---

*Auditor: Claude Sonnet 4.6 cron — 2026-07-19 06:07 UTC · angle 8/12 (R2) · Ch9-16 first R2 pass*
