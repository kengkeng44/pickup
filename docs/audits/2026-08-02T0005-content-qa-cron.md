# Content QA — 2026-08-02 00:05 UTC

**Today's angle:** R2 — Distractor Doctrine (4-option blind)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Three Little Pigs)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s):
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l3/l4/l5/l7: X49_STIMULUS_REUSE (4 instances)
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR

Total mirror-lint issues (all chapters): 440 (warn-only)
```

**CI gate**: Build passes (tsc + vite). No P0 schema errors in Ch1-8.

---

## B. Violation Table — R2 Distractor Doctrine

**Scope**: 86 MC-type questions scanned (listen-mc / listen-comprehension / listen-emoji), Ch1–8.
**R2 rule**: `max(len(option)) / min(len(option)) ≤ 1.25`. R4 rule: 3 distractors must cover ≥3 distinct failure modes.

| Sev | Ch | Q ID | type | Correct option | Distractors | Violation | Ratio | Fix | audio regen? |
|-----|-----|------|------|---------------|-------------|-----------|-------|-----|------|
| P1 | 1 | kt-ch1-l5-q9 | listen-mc | "very poor" | ["clear and bright", "sunny", "sparkling"] | LENGTH_TELL_STRONG + STRUCTURAL_MISMATCH | 3.20× | Pad shortest: "bright and clear" / "mild and warm" / "calm and still" | No |
| P1 | 3 | kt-ch3-l7-q9 | listen-mc | "embarrassed" | ["proud and strong", "sleepy", "hungry"] | LENGTH_TELL_STRONG | 2.67× | Rebalance: "proud", "confused", "relieved" | No |
| P1 | 3 | kt-ch3-l6-q9 | listen-mc | "faster than ever" | ["steady and careful", "standing still", "walking"] | LENGTH_TELL_STRONG | 2.57× | "slow and steady" / "step by step" / "walking slow" | No |
| P1 | 1 | kt-ch1-l5-q3 | listen-mc | "by taking a dumpling" | ["by force", "by following silently", "by stealing food"] | LENGTH_TELL_STRONG + R4_SAME_FORM | 2.62× | Diversify form: "with a gift" / "by force" / "through a bargain" | No |
| P1 | 1 | kt-ch1-l4-q9 | listen-mc | "the dumplings" | ["the road", "Momotaro's clothes", "a passing bird"] | LENGTH_TELL_STRONG | 2.25× | "his sword" / "Momotaro's bag" / "a passing bird" | No |
| P1 | 1 | kt-ch1-l6-q5 | listen-mc | "by running fast and biting" | ["by jumping down from above", "by waiting quietly nearby", "by hiding behind the rocks"] | R4_SAME_FORM (all "by") | — | Replace one distractor: "with a loud roar" | No |
| P1 | 5 | kt-ch5-l4-q3 | listen-mc | "bones" | ["stone", "cold metal", "old rope"] | LENGTH_TELL_STRONG | 2.00× | "rocks" / "metal scraps" / "frayed rope" | No |
| P1 | 4 | kt-ch4-l6-q6 | listen-mc | "a force changing his body" | ["no power at all", "something making the sun hotter", "a call to other animals"] | LENGTH_TELL_STRONG | 2.07× | "a hidden power" / "the sun's heat" / "an animal's call" | No |
| P1 | 2 | kt-ch2-l3-q8 | listen-mc | "protected him" | ["ran away", "helped the hens", "fell asleep"] | LENGTH_TELL_STRONG | 1.88× | "ran off quickly" / "helped the hens" / "hid away" | No |
| P1 | 5 | kt-ch5-l7-q9 | listen-mc | "the new woman" | ["her father", "the village priest", "a neighbor"] | LENGTH_TELL_STRONG | 1.80× | "the new wife" / "the village man" / "a passerby" | No |
| P1 | 3 | kt-ch3-l3-q9 | listen-mc | "he was falling asleep" | ["he was waking up", "he was running again", "he was eating lunch"] | R4_SAME_FORM (all "he was") | — | Diversify: "still awake", "running again", "he was eating lunch" | No |
| P1 | 3 | kt-ch3-l5-q5 | listen-mc | "she did not want to wake him" | ["she was busy eating seeds", "she suddenly lost her voice", "she fell asleep too"] | R4_SAME_FORM (all "she") | — | Diversify: "he was too far ahead" / "it was not the right time" / "she fell asleep too" | No |
| P1 | 2 | kt-ch2-l6-q8 | listen-mc | "took him home" | ["cooked him", "sold him", "left him there"] | LENGTH_TELL_STRONG | 1.75× | "let him go" / "sold him" / "left him behind" | No |
| P1 | 6 | kt-ch6-l5-q6 | listen-mc | "sew" | ["cry", "dance", "read"] | LENGTH_TELL_STRONG | 1.67× | Identical length fine; issue: "sew" vs 3 intransitive — diversify: "cry", "hide", "pray" | No |
| P1 | 8 | kt-ch8-l5-q3 | listen-mc | "a strong no" | ["please come inside", "come for tea", "goodbye, friend"] | LENGTH_TELL_STRONG | 1.64× | "go away now" / "not today" / "please leave" | No |
| P1 | 8 | kt-ch8-l3-q9 | listen-mc | "soft heavy steps" | ["birds singing", "rain falling", "his brother's laugh"] | LENGTH_TELL_STRONG | 1.58× | "birdsong outside" / "rain on the roof" / "his brother's laugh" | No |
| P2 (×50) | 1–8 | various | listen-mc | — | — | LENGTH_TELL_MOD (ratio 1.25–1.50) | 1.25–1.50× | Pad shortest options to match longest ±1.25 | No |

**P2 per chapter**: Ch1(2), Ch2(5), Ch3(6), Ch4(7), Ch5(5), Ch6(10), Ch7(8), Ch8(9)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC-type Qs scanned | 86 |
| Unique Qs with any violation | 66 (76.7%) |
| P0 (correct longest + ratio >1.5) | 0 |
| P1 (ratio >1.5 OR R4_SAME_FORM) | 16 |
| P2 (ratio 1.25–1.50) | 50 |
| Chapters with P1 violations | Ch1(5), Ch2(2), Ch3(4), Ch4(1), Ch5(2), Ch6(1), Ch8(2) |
| Ch7 violations | 8 (all P2, no P1) |
| Audio regen required | 0 |

**Pattern**: The length-parity problem is systemic across Ch1-8. 76.7% of MC questions exceed the R2 ≤1.25× threshold. The root cause is that distractors were authored as semantic contrasts (opposite meaning) without normalizing character length, causing the shorter distractor to signal "probably wrong" visually before listening.

---

## D. Top 5 Priority Items (P0/P1)

1. **kt-ch1-l5-q9** (Ch1, R2+STRUCTURAL): `"very poor"` vs `["clear and bright", "sunny", "sparkling"]` — ratio 3.20×, multi-word vs single-word contrast makes "very poor" visually odd. Fix: replace with 3 adjective phrases of equal length.

2. **kt-ch3-l7-q9** (Ch3, R2): `"embarrassed"` vs `["proud and strong", "sleepy", "hungry"]` — ratio 2.67×. Single-emotion adjectives vs 3-word phrase. Fix: normalize to 4 single-word emotions.

3. **kt-ch3-l6-q9** (Ch3, R2): `"faster than ever"` vs `["steady and careful", "standing still", "walking"]` — ratio 2.57×. Fix: rebalance all to 2-3 word adverbial phrases.

4. **kt-ch1-l5-q3** (Ch1, R2+R4): `"by taking a dumpling"` vs `["by force", "by following silently", "by stealing food"]` — ratio 2.62× AND all distractors start "by" (R4: single syntactic failure mode). Fix: diversify structure + equalize length.

5. **kt-ch3-l3-q9** (Ch3, R4): `"he was falling asleep"` vs `["he was waking up", "he was running again", "he was eating lunch"]` — all distractors "he was …" collapses 4-option to pattern-match on final verb only. Fix: vary subject/tense: "still awake", "he ran again", "having lunch".

---

## E. Narrative Voice / Pacing — 3 Improvements (even though no P0)

1. **Distractor-type monotony in "by + gerund" sets** (Ch1 l5-q3, l6-q5): When 3-4 consecutive MC questions all use `"by [verb]-ing"` distractors, players learn to select the non-"by" outlier. Mix prepositional (`by force`), nominal (`a gift`), and verbal (`he ran`) frames within the same lesson to maintain genuine 4-option uncertainty.

2. **Single-word vs phrase mixing signals answer tier** (Ch3 l7-q9, Ch5 l4-q3): Children's working memory is limited (Miller's 7±2). When one option is `"bones"` and three others are `"stone"`, `"cold metal"`, `"old rope"`, the odd-word-out is salient for the wrong reason. Normalize: either all single-word OR all 2+ word phrases within each question.

3. **Pronoun-uniform distractors degrade to true/false** (Ch3 l3-q9, Ch3 l5-q5): Four options all beginning `"he was…"` / `"she was…"` mean the child only needs to identify the final verb, not process the full phrase. This reduces cognitive depth from detail comprehension to verb-slot recall — exactly the degradation R4 was designed to prevent. Replace ≥1 distractor per such set with a non-pronoun frame.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #231: X231_R2_LENGTH_NORMALIZATION_LINTER**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **LLM-hybrid distractor quality validation** — Ya Wang & Yaru Meng (2026) combine generative AI with psychometric analysis of 2,267 learner responses to flag non-functional distractors | [DOI 10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375) | ✅ Pickup already uses Fable for distractor rewrites; adding a length-normalization pass before commit would catch 76% of current violations automatically | M (2-3 hr): extend `validate-lessons.js` X2 check to flag ratio>1.25 per Q + suggest equalized alternatives | High — 66/86 Qs affected, single linter catches all | **Implement** |
| **Semantic-category constraint for distractor pool** — Iimura: overlap-based distractors (sharing semantic category with answer) improve plausibility; purely unrelated distractors become non-functional (<5% selection rate) | [JLTA Journal 21 (2021)](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_pdf) | ✅ R4 failure-mode tagging in lesson JSON — add optional `distractor_types: ["phonological", "schema", "local-detail", "partial-parse"]` array per Q for audit validation | M (3 hr): add field + lint rule in validate-lessons.js | Medium — not blocking now, improves future authoring guidance | **Recommend for v2.1** |
| **3-option format** — Rodriguez (2005) meta-analysis shows 3 options = equivalent discrimination to 4 + less guessing variance | [Ed Measurement 24(2) 2005](https://journals.sagepub.com/doi/10.1177/2158244014553586) | ❌ Pickup's blindRetry mechanic requires ≥4 options to avoid 50/50 repeat-until-correct; reducing to 3 would make blindRetry trivially fast | — | — | **Skip** |
| **Phonological trap distractors for children** — NCBI eye-tracking study (ages 6-10): phonologically similar distractors produce more deliberate processing than semantic ones | [PMC12384167 (2025)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12384167/) | 🟡 Partially applicable — Pickup is audio-first (listen then choose), so phonological traps (sound-alikes) are valid for `listen-mc` but not `listen-comprehension` (gist/inference) | M — requires selective application | Medium — differentiates `listen-mc` from `listen-comprehension` distractor strategy | **Consider for content sprint** |

**Recommended immediate action**: Extend `validate-lessons.js` to add `X60_LENGTH_PARITY` lint rule — flag any MC question where `max(len(option)) / min(len(option)) > 1.25` with `WARN` and output suggested padding. This single rule would surface all 66 violations at build time, reducing the current 76.7% silent violation rate to 0 without modifying any lesson files today.

**Implementation sketch** (tools/validate-lessons.js addition):
```js
// X60: R2 length parity (max/min ≤ 1.25)
if (q.options && q.options.length >= 2) {
  const lens = q.options.map(o => o.length);
  const ratio = Math.max(...lens) / Math.min(...lens);
  if (ratio > 1.25) issues.push(`X60_LENGTH_PARITY ratio=${ratio.toFixed(2)}`);
}
```

---

*Audit completed: 2026-08-02 00:05 UTC — angle R2 (Distractor Doctrine) — 86 Qs scanned — 66 violations — 0 P0, 16 P1, 50 P2 — ARCH-REC #231*
