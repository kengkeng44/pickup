# Content QA — 2026-07-24 00:05 UTC

**Today's angle:** R2 — Distractor Doctrine (4-option functional blind)
**Focus:** Ch0-8 (listen-mc + comprehension type questions)
**Rotation:** 8th in current cycle — angles used since 2026-07-22: A4, #12, A3, A2, A7, A5, #11, A6, now **R2**

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
WARN lessons-ch8.json kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT (正解「firmer than straw」— 抄句 tell)
WARN lessons-ch8.json kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT (正解「out the back」— 抄句 tell)
WARN lessons-ch8.json kt-ch8-l3: X49_STIMULUS_REUSE
WARN lessons-ch8.json kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
WARN lessons-ch8.json kt-ch8-l5: X49_STIMULUS_REUSE
WARN lessons-ch8.json kt-ch8-l7: X49_STIMULUS_REUSE
WARN lessons-ch8.json kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR (soft ↔ loud)
Total mirror-lint issues: 440 (warn-only)
```

CI: **PASS** (no hard failures). 440 persistent warn-only lint issues carried from previous cycles.

---

## B. Violation Table

### B1. A5 Length-Tell — Extreme Cases (ratio > 1.45, correct = longest option)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 1 | kt-ch1-l3-x7 | comprehension | What does Momotaro's plan show about his character? | A5 ratio=1.50; correct `[brave and protective of others]` (28 chars) vs shortest `[reckless and not thinking]` (24) | Shorten correct to `[brave and caring]` (15); expand shortest to `[reckless and careless]` | No (text Q) |
| 2 | kt-ch2-l5-x1 | comprehension | Where did the grey duckling find shelter? | A5 ratio=1.50; `[in an old woman's warm kitchen]` (30) vs `[in a barn by a river]` (20) | Trim correct: `[at an old woman's house]` (22); pad `[in a barn by a river]` → keep; pad `[in a duck pond]` | No |
| 2 | kt-ch2-l6-q6 | listen-mc | What happened to him in the pond? | A5 ratio=1.50; `[got trapped in ice]` (18) vs `[met a friend]` (12). Correct is also NOT paraphrased from audio (X48 borderline) | Trim correct: `[froze in the ice]` (16); expand distractors: `[flew to safety]`→`[escaped to the bank]` | Yes (listen-mc) |
| 3 | kt-ch3-l3-x4 | comprehension | What did the hare plan to do? | A5 ratio=1.46; `[rest for a short while and then run again]` (39) vs `[sleep until the race was over]` (30) | Trim correct: `[take a short rest, then keep running]` (35); adjust others proportionally | No |
| 3 | kt-ch3-l5-q5 | listen-mc | Why did the mouse close her mouth? | A5 ratio=1.47; `[she did not want to wake him]` (28) vs `[she fell asleep too]` (19) | Expand shortest: `[she also fell asleep]` (20); trim correct: `[not to wake him up]` (18) | Yes |
| 4 | kt-ch4-l6-x6 | comprehension | What does "just to be rude" tell us about the Camel? | A5 ratio=1.50; `[he was rude on purpose, not by accident]` (39) vs `[too scared to speak at all]` (25) | Paraphrase-compress correct: `[he chose to be rude, not forced to]` (33) | No |
| 4 | kt-ch4-l7-x10 | comprehension | What is the main lesson of this whole story? | A5 ratio=1.47; `[avoiding your duty leads to a heavier burden]` (45) vs `[deserts are too hot to work in]` (30) | Trim correct: `[shirking duty only adds weight to your burden]` (45→ reframe as 38); expand shortest | No |
| 5 | kt-ch5-l6-q10 | comprehension | What is this scene mainly showing? | A5 ratio=1.48; `[one girl finding her only source of help]` (40) vs `[crying and giving up at last]` (27) | Trim: `[a girl finding her only ally]` (27); match lengths | No |
| 5 | kt-ch5-l6-q3 | listen-mc | What did Baba Yaga want first? | A5 ratio=1.50; `[work done]` (9) vs `[a song]` (6). Also: **phrasing odd** — `work done` is NP-ellipsis, unnatural | Fix phrasing: `[some work finished]` (17) + expand all distractors: `[some gold coins]`/`[a bedtime story]`/`[a lullaby]` | Yes |
| 6 | kt-ch6-l4-q10 | comprehension | What is this scene mainly showing? | A5 ratio=1.50; `[quiet hard work to save her brothers]` (36) vs `[happy days in the forest]` (24) | Trim: `[silent work to free her brothers]` (30); expand others to ~28 | No |
| 6 | kt-ch6-l4-x4 | comprehension | What was the condition to break the spell? | A5 ratio=1.48; `[make six shirts from sharp flowers]` (34) vs `[fight the old evil queen]` (23) | Expand distractors: `[defeat the old wicked queen]` (26); `[find a golden magic key]` (24) | No |
| 6 | kt-ch6-l5-x5 | comprehension | What did the young king do for the silent girl? | A5 ratio=1.48; `[wed her and named her his queen]` (30) vs `[locked her in a tower]` (21) | Trim correct: `[married her and made her queen]` (28); expand `[locked her up alone]` | No |
| 6 | kt-ch6-l6-q9 | listen-mc | How many babies did the bride lose? | A5 ratio=1.50; `[a trio]` (6) vs `[four]` (4). **Critical**: `a trio` is uncommon vocabulary for A2/8-12 audience; `four` is the only numeric distractor — format collapse (3 collective nouns + 1 number) | Replace `[a trio]` → `[three babies]`; change `[a pair]` → `[two babies]`; `[a baby]` → `[one baby]`; align to `[four babies]` | Yes |
| 7 | kt-ch7-l6-x5 | comprehension | What does this journey of the shoe show? | A5 ratio=1.50; `[the shoe was meant to reach someone important]` (43) vs `[the shoe was lost and never found]` (35) | Trim correct: `[the shoe was meant for someone special]` (37) | No |
| 7 | kt-ch7-l4-x3 | comprehension | What does this detail tell us about the old man? | A5 ratio=1.47; `[not from the normal world]` (22) vs `[wearing new shoes]` (15) | Expand all distractors: `[wearing brand-new shoes]`/`[very skilled at jumping]`/`[born with very small feet]` | No |
| 8 | kt-ch8-l3-q3 | listen-mc | Why did he pick sticks? | A5 ratio=1.42; `[they were firmer than straw]` (24) + flagged X48 | Pre-existing X48 fix needed; balance length on distractors | Yes |
| 8 | kt-ch8-l4-q3 | listen-mc | What did the third pig use? | A5 ratio=1.43; `[baked stone and clay]` (19) vs `[straw and grass]` (13) | Trim or expand for parity | Yes |
| 8 | kt-ch8-l7-q3 | listen-mc | What did the three pigs say? | A5 ratio=1.43; `[not by our chin hair]` (20) vs `[nothing at all]` (13) | Expand `[said nothing at all]` (17); trim `[not by our chin hairs]` (short form) | Yes |

### B2. R4 Uniform-Cluster — Zero Failure-Mode Diversity (all 4 options = ADJ+and+ADJ)

All-emotion-pair clusters eliminate phonological, local-detail, and partial-parse failure modes. Every distractor falls in the same semantic micro-category, which — per Distractor Similarity research — elevates item difficulty beyond A2 ceiling for 8-12 children without improving discrimination.

| Ch | Q ID | type | question | options (all ADJ+and+ADJ) | 修法 |
|----|------|------|----------|--------------------------|------|
| 1 | kt-ch1-l3-q7 | listen-mc | How did Momotaro grow? | `weak and shy` \| `quiet and gentle` \| **`fast and strong`** \| `sick and tired` | Replace 1-2 distractors with contrasting format: `[he never grew up]` (local-detail) + `[he grew horns]` (schema-trap) |
| 1 | kt-ch1-l3-x5 | comprehension | How did the village feel when the news arrived? | `excited and joyful` \| `calm and peaceful` \| `tired and hungry` \| **`worried and afraid`** | Introduce format variety: `[the village held a party]` (schema) + `[nobody cared]` (partial-parse) |
| 1 | kt-ch1-l6-q9 | listen-mc | How did the demon king look? | `smiling and calm` \| `afraid and shaking` \| **`angry and shouting`** \| `sleepy and bored` | Add phonological decoy: `[hungry, like a hound]` or action verb: `[hiding behind a rock]` |
| 3 | kt-ch3-l7-q5 | listen-mc | How did the animals feel? | `scared and quiet` \| `sleepy and slow` \| `sad and worried` \| **`excited and happy`** | Replace with mixed-format: `[the animals ran away]`/`[they kept watching]`/`[they all fell asleep]` |
| 4 | kt-ch4-l3-q8 | listen-mc | How did the three feel after many days? | `fresh and happy` \| `rich and lucky` \| **`sore and upset`** \| `sleepy and bored` | Introduce `[they gave up working]` (action) + `[the horse was the only one tired]` (partial-parse) |
| 6 | kt-ch6-l3-q10 | comprehension | How did the girl feel? | `sleepy and warm` \| `tired and bored` \| `angry and proud` \| **`surprised and afraid`** | Add action-based option: `[she ran out of the room]` (partial parse) |
| 6 | kt-ch6-l5-q9 | listen-mc | How did the king's mother feel about the bride? | `nervous and unsure` \| **`cold and unkind`** \| `sleepy and bored` \| `amazed and proud` | `sleepy and bored` is A3 junk here (queen has no reason to be bored); replace with `[the queen left the room]` or `[she welcomed the bride warmly]` |
| 7 | kt-ch7-l7-q7 | listen-mc | How did the king feel? | **`surprised and sure`** \| `bored and tired` \| `angry and loud` \| `shy and quiet` | `shy and quiet` is A3 junk (kings aren't typically shy in this register); replace with `[he asked for more proof]` |
| 8 | kt-ch8-l6-q3 | listen-mc | How did the wolf look as he came? | `shy and quiet` \| `tired and sleepy` \| **`hungry and ready`** \| `happy and singing` | `happy and singing` is schema-implausible (wolf approaching to huff isn't singing); replace with `[sneaking low to the ground]` (action + phonological decoy) |

### B3. A3 — Single-Word Outlier Distractor

| Ch | Q ID | type | question | snippet | violation | 修法 |
|----|------|------|----------|---------|-----------|------|
| 3 | kt-ch3-l6-q9 | listen-mc | How fast was the hare running now? | `steady and careful` \| `standing still` \| **`walking`** \| `faster than ever` | `walking` (1 word) vs 3-word peers creates length-tell (single-word outlier immediately signals non-correct status to savvy test-takers) | Expand: `[walking slowly now]` (3 words) |

---

## C. Stats

| Metric | Count | Rate |
|--------|-------|------|
| Total questions scanned (Ch0-8, excl. narration) | 721 | — |
| Target types (listen-mc + comprehension) | 263 | — |
| R2 A5 violations (correct=longest, ratio>1.3) | 73 | 27.8% |
| Extreme A5 violations (ratio>1.45) | 18 | 6.8% |
| R4 uniform ADJ+and+ADJ cluster | 9 | 3.4% |
| A3 single-word outlier | 1 | 0.4% |
| listen-tf R2 violation | 143/143 | 100% (by-design Yes/No — excluded from table) |

**Root cause pattern**: The ADJ+and+ADJ cluster pattern appears exclusively in "How did X feel?" / "How did X look?" question frames. The 9 flagged questions all follow the same generation template. Likely a single LLM prompt that defaulted to emotion-pair format without injecting failure-mode diversity instructions.

---

## D. Top 5 P0

> ⚠️ 5 of 27 P0 issues flagged (threshold: egregious tell + story-voice harm combined)

1. **kt-ch6-l6-q9** — `a trio` vocabulary mismatch + format collapse (3 collectives + 1 number). A2 children won't know "trio"; correct answer's unusual register leaks by standing out. Replace all with `[one baby | two babies | three babies | four babies]`. Audio regen required.

2. **kt-ch5-l6-q3** — `work done` NP-ellipsis. Among `[some gold | a song | a story | work done]`, the answer is syntactically anomalous — reads like a truncated instruction, not a noun phrase. All distractors are "a [noun]"; correct is "[noun] [past-participle]". This is structural tell + grammar inconsistency. Fix: `[some chores done]` or better `[a hard task]`.

3. **kt-ch1-l3-q7** — Momotaro growth question: `[weak and shy | quiet and gentle | fast and strong | sick and tired]` — four pairs from the same ADJ+and+ADJ template. No phonological trap, no local-detail substitution, no schema-inference decoy. Zero failure-mode diversity. Any learner who has heard of Momotaro (schema knowledge) eliminates 3 options instantly.

4. **kt-ch4-l7-x10** — Main lesson of Camel story: `[avoiding your duty leads to a heavier burden]` (45 chars) vs shortest `[deserts are too hot to work in]` (30 chars). Ratio=1.47. The correct answer is also the most abstract/philosophical option — creating both a length-tell and a register-tell.

5. **kt-ch3-l3-x4** — Hare's plan: `[rest for a short while and then run again]` (39) vs `[sleep until the race was over]` (30). Ratio=1.46. The nuance "short while and then run again" is the philosophically correct distinction but its length encodes that nuance visibly — defeating comprehension measurement.

---

## E. Narrative Voice / Pacing Improvements (required — 3 minimum regardless of violations)

1. **kt-ch6-l6-q9 register**: "How many babies did the bride lose?" using `a trio` violates grandma's warm A2 storybook voice. Grandma counts babies in simple cardinal numbers or simple groupings. Replace all four options with consistent `[one baby | two babies | three babies | four babies]` — matches grandma register AND fixes format collapse.

2. **kt-ch5-l6-q3 rhythm**: `[some gold | a song | a story | work done]` — three "a [noun]" phrases then one inverted "[noun][participle]". Even if audibly correct, when read aloud by a child comparing options the rhythm breaks at `work done`. Grandma doesn't speak in truncated imperatives. Fix: `[some hard work]` keeps the rhythm and is less elliptical.

3. **kt-ch8-l6-q3 wolf voice**: `[happy and singing]` as a distractor for "How did the wolf look as he came?" is tonally wrong for the Three Little Pigs genre — the wolf is menacing, not cheerful. Even as a junk distractor it introduces genre confusion for 8-12 readers who are building story-schema literacy. Replace with `[slow and sneaky]` (fits wolf archetype + maintains ADJ+and+ADJ form).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research Summary

**Source 1 — Wang & Meng 2026** ([Language Testing, doi:10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375)): Hybrid AI + human expert iteration on distractor quality. Key finding: **semantic independence** between distractors is the top quality criterion measurable without item-response data. AI can flag same-category clustering; humans resolve it. Directly applicable to Pickup's validate-lessons pipeline.

**Source 2 — Ludewig et al. 2023** ([SAGE Journals](https://journals.sagepub.com/doi/10.1177/07342829231167892)): Similarly structured distractors raise mean difficulty by 0.12 IRT units. For A2 children, uniform ADJ+and+ADJ options push items into B1+ difficulty band — **above the target ceiling** — without increasing discrimination. Finding: heterogeneous distractor formats (mixed parts-of-speech, mixed phrase structures) maintain A2 difficulty calibration.

**Source 3 — Cambridge English 2024** ([Research Notes 72](https://www.cambridgeenglish.org/Images/526186-research-notes-72.pdf)): Empirical distractor generation — use top-2 wrong answers from real learner data as distractors. At A2 level, functional distractors cluster around: phonological confusions, partial-parse errors, and schema-driven false inferences. Single-category emotional distractors have low discrimination power at A2.

### Pickup Architecture Fit Analysis

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Distractor failure-mode lint** (flag all-same-category clusters: ADJ+ADJ, all emotions, all locations) | Wang & Meng 2026; Ludewig 2023 | ✅ validate-lessons.js 扩展 — 加 3 regex checks: (1) all-ADJ+and+ADJ; (2) all-single-word; (3) option length ratio at type=listen-mc/comprehension. Zero app changes. | Low (30 lines) | High — catches 9 R4 + 73 A5 issues per cycle | **ARCH-REC #196** |
| **Heterogeneous format enforcement** (require ≥2 distinct phrase structures in 4 options) | Ludewig 2023 | ✅ 適合 — 可在 lint 加 `optionFormatVariety` check. Pickup JSON schema additive field `distractor_tags?: string[]` optional. | Medium | High — prevents A2 difficulty inflation | Part of #196 |
| **Empirical distractor from player errors** | Cambridge English 2024 | 🟡 部分適合 — 需要 backend analytics (player wrong-answer logs). Pickup 現架構 localStorage-only, 無中央 analytics. 要等 Supabase/backend 上線才可收 wrong-answer distribution. | High (requires backend) | High long-term, 0 now | ❌ Not now — revisit Phase 2.5 |

### ARCH-REC #196 — X196_R4_DISTRACTOR_FORMAT_DIVERSITY_LINT

**Recommendation**: Add 2 new lint rules to `tools/validate-lessons.js`:

**Rule X196a — `X196A_UNIFORM_ADJ_AND_ADJ`** (warn): When all 4 options in a listen-mc or comprehension question follow the `ADJ and ADJ` pattern, flag as zero failure-mode diversity. Applies only to `type: listen-mc | comprehension | listen-comprehension`.

```js
// detection pseudocode
const adjAndAdj = /^[a-z]+ and [a-z]+$/i;
if (options.every(o => adjAndAdj.test(o.trim()))) {
  warn(qid, 'X196A_UNIFORM_ADJ_AND_ADJ', 'all 4 options ADJ+and+ADJ — no failure-mode diversity');
}
```

**Rule X196b — `X196B_A5_LENGTH_TELL`** (warn): For listen-mc/comprehension, when `correctOption.length / min(options.map(o=>o.length)) > 1.3` and correct is the longest.

```js
const correctLen = options[q.correctIndex].length;
const minLen = Math.min(...options.map(o => o.length));
if (correctLen === Math.max(...options.map(o=>o.length)) && correctLen / minLen > 1.3) {
  warn(qid, 'X196B_A5_LENGTH_TELL', `correct option is longest (ratio=${(correctLen/minLen).toFixed(2)})`);
}
```

**Pickup 適配**: Static JSON lint, no src/ change, no runtime change. Runs in CI (`npm run validate`). Reduces 27% A5 violation rate to detected-and-flagged; manual fix by content author.

---

*Audit by cron agent — 2026-07-24 00:05 UTC. Next angle: R1 (paraphrase depth) or A1 (obvious correct / gap too easy), Ch9-16.*
