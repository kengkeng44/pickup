# Content QA — 2026-08-03 00:08 UTC

**Today's angle:** R1 — Paraphrase深探 (Buck 2001 verbatim-echo ban)
**Focus:** Ch9–16 (灰姑娘 / 嫦娥 / 后羿 / 牛郎織女 / 小紅帽 / 浦島太郎 / 國王的新衣 / 一寸法師)

**Previous 8 angles:** A2-blank-position · A6-option-in-question · #12-explanationZh · R2-distractor · A1-obvious-correct · A7-content-word-repeat · A5-cultural-ref · A4-mirror-patterns

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Build passes (no schema failures). 440 existing mirror-lint warnings are carry-over from previous audits, concentrated in Ch8–9 (X2_OPTION_LIST_BIAS, X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR).

---

## B. Violation table

### B1. P0/P1 — 100% content-word echo (verbatim answer lift)

These comprehension items are answerable by pure keyword scanning — no inference or paraphrase required. Violates Buck 2001 R1 ("correct option MUST NOT re-echo stimulus content words").

| Ch | Q ID | type | sentence snippet | correct option | overlap words | 修法 | audio regen? |
|----|------|------|-----------------|----------------|---------------|------|-------------|
| 14 | kt-ch14-l3-x2 | comprehension | "The walls shone like pearl and the gates were made of shell." | "walls that shone like pearl" | walls, shone, like, pearl (100%) | Rewrite: "made of precious pale material" or "built from something white and lustrous" | No |
| 14 | kt-ch14-l5-x4 | comprehension | "She gave him a small red box tied with a gold rope." | "the gold rope" | gold, rope (100%) | Rewrite: "a twisted yellow cord" or "a shiny binding thread" | No |
| 15 | kt-ch15-l4-x6 | comprehension | "All his men nodded fast. They all said it was lovely." | "nodded and said it was lovely" | nodded, said, lovely (100%) | Rewrite: "agreed with the emperor" or "gave their approval at once" | No |

### B2. P2 — 60–75% content-word echo (moderate echo)

Items where ≥60% of the correct option's content words appear verbatim in the sentence — still testable by scanning, not paraphrase skill.

| Ch | Q ID | type | sentence snippet | correct option | overlap ratio | 修法 | audio regen? |
|----|------|------|-----------------|----------------|---------------|------|-------------|
| 9 | kt-ch9-l3-x2 | comprehension | "…Every girl in town was asked." | "every girl in the whole town" | every, girl, town (75%) | Rewrite: "all young women nearby" or "the whole village's daughters" | No |
| 13 | kt-ch13-l7-x4 | comprehension | "Grandma sat up. The girl held her hand. Both could breathe again." | "both sat up and breathed again" | both, sat, again (75%) | Rewrite: "they recovered together" or "the danger had passed for them both" | No |
| 16 | kt-ch16-l7-x4 | comprehension | "Soon he stood as tall as any young man." | "as tall as a normal young man" | tall, young, man (75%) | Rewrite: "the same height as grown men" or "full-grown at last" | No |
| 11 | kt-ch11-l3-x2 | comprehension | "Hou Yi walked across the dry brown land." | "dry and brown all over" | dry, brown (67%) | Rewrite: "parched and lifeless" or "scorched beyond recognition" | No |
| 12 | kt-ch12-l3-x7 | comprehension | "One day she came down on a long white cloud." | "rode down on a cloud" | down, cloud (67%) | Rewrite: "descended from the sky on a pale ribbon" | No |
| 12 | kt-ch12-l5-x2 | comprehension | "Niulang sat by the river and cried for many days." | "sat weeping by the river" | sat, river (67%) | Rewrite: "grieved alone at the water's edge" | No |
| 13 | kt-ch13-l4-x4 | comprehension | "He knocked on the wooden door. Knock, knock, knock." | "knocked on the front door" | knocked, door (67%) | Rewrite: "rapped to be let inside" or "made his presence known at the entrance" | No |
| 13 | kt-ch13-l4-x7 | comprehension | "Back in the woods, the girl picked many bright flowers." | "picking flowers in the woods" | flowers, woods (67%) | Rewrite: "gathering blooms along the forest path" | No |
| 13 | kt-ch13-l7-x2 | comprehension | "The huntsman saw the wolf fast asleep in grandma's bed." | "the wolf sleeping in the bed" | wolf, bed (67%) | Rewrite: "a creature snoring in the old lady's place" | No |
| 14 | kt-ch14-l4-x4 | comprehension | "He walked in the coral garden with the princess." | "walked in the garden together" | walked, garden (67%) | Rewrite: "strolled side by side beneath the sea" | No |
| 14 | kt-ch14-l5-x6 | comprehension | '"Please, never open it. Promise me. Never."' | "never open the box" | never, open (67%) | Rewrite: "keep the lid shut forever" or "leave it sealed, always" | No |
| 15 | kt-ch15-l4-x4 | comprehension | "His heart went cold inside his chest." | "cold and worried inside" | cold, inside (67%) | Rewrite: "filled with dread" or "deeply uneasy" | No |
| 15 | kt-ch15-l7-x6 | comprehension | "He kept walking with the slow steps of a king." | "with slow and steady steps" | slow, steps (67%) | Rewrite: "moving at a royal pace, dignified still" | No |
| 16 | kt-ch16-l3-x2 | comprehension | "His mother gave him a sewing needle for a sword." | "the sewing needle itself" | sewing, needle (67%) | Rewrite: "the tiny blade she had at hand" | No |
| 16 | kt-ch16-l7-q3 | listen-mc | '"This is a lucky mallet. It can grant a wish."' | "a magic wish mallet" | wish, mallet (67%) | Rewrite: "a tool that makes dreams real" | No |
| 16 | kt-ch16-l7-x2 | comprehension | '"This is a lucky mallet. It can grant a wish."' | "able to grant a wish" | grant, wish (67%) | Rewrite: "could make any desire come true" | No |
| 9 | kt-ch9-l4-x2 | comprehension | "…No door opened. No window moved." | "no door or window had opened when she appeared" | door, window, opened (60%) | Rewrite: "she seemed to arrive from nowhere, without any entry" | No |

### B3. ExplanationZh jargon violations (should be story-voice)

| Ch | Q ID | type | jargon used | 修法 |
|----|------|------|-------------|------|
| 10 | kt-ch10-l3-q2 | narration | 代表 | 奶奶說：外表好看不等於心也好。 |
| 10 | kt-ch10-l5-x2 | comprehension | 代表 | 吃了藥就要飛走，這就是「永遠離開」的代價啊。 |
| 11 | kt-ch11-l5-x8 | comprehension | 表示 | 大家都敢出門了——這就是說，事情慢慢好起來了！ |
| 12 | kt-ch12-l3-q9 | listen-mc | 表示 | 她搖搖頭、緊緊握住手——這就是「不想走」的意思！ |
| 12 | kt-ch12-l4-ttx2 | type-translate | 表示 | could not 就是「做不到」。兩人伸手，卻碰不到——They could not touch。 |
| 15 | kt-ch15-l5-q4 | listen-tf | 表示 | 笑得僵硬、很不自然，代表他很不舒服——答 No。 |
| 16 | kt-ch16-l4-ttx1 | type-translate | 表示 | bowed 就是「鞠了個躬」；very low / deeply 都是「深深地」。 |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch9–16 (8 chapters) |
| Total items audited | 880 entries (248 narration + 88 listen-mc + 120 comprehension + 120 listen-tf + rest) |
| Comprehension items (R1 scope) | 120 |
| P0/P1 violations (100% echo) | 3 (2.5%) |
| P2 violations (60–75% echo) | 16 (13.3%) |
| Total R1 violations | 19 / 120 = **16% violation rate** |
| Listen-mc R1 clean | ✅ 0 violations (88 items) — excellent paraphrase quality |
| ExplanationZh jargon | 7 |
| ExplanationZh total | ~400 |

---

## D. Top 5 P0

All three genuine P0/P1 violations are in comprehension items. The top 5 (combining severity and prominence):

1. ⚠️ **kt-ch14-l3-x2** — "walls that shone like pearl" — 4 content words copied verbatim from sentence. Trivially scannable. Fix: "made of precious pale material".
2. ⚠️ **kt-ch15-l4-x6** — "nodded and said it was lovely" — reconstructs entire sentence action. Fix: "gave their approval at once".
3. ⚠️ **kt-ch14-l5-x4** — "the gold rope" — lifted directly from "tied with a gold rope". Fix: "a twisted yellow cord".
4. ⚠️ **kt-ch13-l7-x4** — "both sat up and breathed again" — 75% echo, sentence is only 9 words. Fix: "they recovered together".
5. ⚠️ **kt-ch16-l7-x4** — "as tall as a normal young man" — 75% echo with 4 matching words. Fix: "full-grown at last".

---

## E. Narrative voice / pacing improvements (non-R1)

Three improvements not covered by the rule violations above:

1. **Ch14 (浦島太郎) pacing**: The lesson sequence has Urashima admire the coral garden (l4) then immediately receive the box warning (l5) with no transitional narration about time passing. In the folk tale, Urashima spends *years* at the palace before leaving — add a narration entry between l4 and l5 that conveys time: "Days turned to months. The palace was beautiful, but something pulled at his heart." This gives the tragic ending more weight.

2. **Ch15 (國王的新衣) question distribution**: 5 of the 16 comprehension/listen-mc questions are in l4 (the weaving scene). The climax — the child calling out "But he has no clothes!" — only has 2 items in l7. Redistribute: move 2 questions from l4 to l7 and l8 to weight the moral moment, which is the lesson's emotional core.

3. **Ch9 (灰姑娘) explanationZh warmth**: Several explanations in Ch9 are technically accurate but tonally flat (e.g., "had no gown——沒有禮服可穿，所以去不了！"). The story-voice standard calls for grandma's empathy: "沒有美麗的衣服可以穿……她只能留在家裡啊。這樣多可惜" — bring in Mochi and Hana as imagined listeners to warm the register.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis:** Bi & Wang (2024) on SSRN ("Modeling the Relationships between EFL Learners' Construct-Relevant and Irrelevant Strategies in Listening Test Performance") — studied 473 Chinese EFL learners on an IELTS listening test. **Key finding:** keyword/lexical matching from written options to audio is the #1 construct-irrelevant strategy, inflating scores without measuring comprehension. IELTS test design mandates paraphrase at the question-design stage to counter this. Directly corroborates Buck 2001. Source: https://doi.org/10.2139/ssrn.4913377

**Current Pickup pattern:** Comprehension questions with 16% R1 violation rate (19/120 items). The `comprehension` type delivers sentence + 4 options simultaneously — learners see both sentence and options, so keyword matching is the easiest solving path. Unlike `listen-mc` (which hides options pre-reveal), comprehension shows everything at once.

**Proposed pattern (ARCH-REC X235):**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **X235: Comprehension paraphrase-distance linter** — add `paraphraseScore` metadata field to comprehension items + lint rule that fails items where correct option has ≥70% content-word overlap with sentence | Bi & Wang 2024 + Buck 2001 | ✅ 非常適合 — Pickup 的 `comprehension` type 正是 Bi & Wang 描述的「option-preview MCQ」場景; JSON schema additive (optional field); linter is ~30 lines of JS extending `validate-lessons.js` | 2hr (linter + lint 19 P0/P2 fixes) | High — blocks future R1 regressions in comprehension at commit time; already 19 known violations | **SHIP** |

**Specific implementation:**
1. Extend `validate-lessons.js` with a `R1_COMPREHENSION_ECHO` rule: for every `comprehension` item, compute content-word overlap ratio between `sentence` and correct `options[correctIndex]`; fail (not warn) if ratio ≥ 0.70
2. Fix the 19 violations found in this audit (rewrite correct options per the 修法 column in B table)
3. No `src/` or lesson-file schema change needed — linter only

**ARCH-REC #235: X235_R1_COMPREHENSION_PARAPHRASE_LINTER**
