# Content QA — 2026-07-17 04:00 UTC

**Today's angle:** R2 — Distractor Doctrine (length-parity tell + R4 functional foil coverage)
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Weaving Maid / LRRH / Hansel & Gretel / Emperor's New Clothes / Jack and Beanstalk)
**Chapters scanned:** Ch9–Ch16, 491 question entries, 371 4-option questions audited

> **Angle choice rationale:** 8-cycle July 15–16 covered R1, A4, A6, #10, #11, A5, A7, #12. R2 distractor doctrine last appeared July 14T1207 on Ch17-24. This run rotates to Ch9-16 — the Cinderella-through-Beanstalk arc — where new chapters (Ch13-16) have never been checked against R2 and show the highest accumulation of length-tell bias.

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 9 lint issue(s)
  X2_OPTION_LIST_BIAS ×2, X48_NGRAM_VERBATIM_CORRECT ×2, X49_STIMULUS_REUSE ×4, X57_ANTONYM_PAIR_MIRROR ×1
WARN lessons-ch9.json: 8 lint issue(s)
  X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT not set)
```

No schema-break errors. Existing X2/X48/X49/X57 issues are carried forward from prior cycles.

---

## B. Violation table

### Primary finding: R2 Length-parity violation systemic (57% overall)

Per-chapter breakdown:

| Ch | Story | 4-opt Qs | R2 viol (>1.25) | Length-tell (longest=correct) |
|----|-------|----------|----------------|-------------------------------|
| Ch9 | Cinderella | 39 | 19 (49%) | 7 (18%) |
| Ch10 | Chang'e & Hou Yi | 43 | 15 (35%) | 5 (12%) |
| Ch11 | Hou Yi Shoots Suns | 50 | 29 (58%) | 12 (24%) |
| Ch12 | Weaving Maid & Cowherd | 54 | 27 (50%) | 11 (20%) |
| Ch13 | Little Red Riding Hood | 53 | 33 (62%) | 15 (28%) |
| Ch14 | Hansel & Gretel | 42 | 32 **(76%)** | 17 **(40%)** |
| Ch15 | Emperor's New Clothes | 48 | 29 (60%) | 16 (33%) |
| Ch16 | Jack and the Beanstalk | 42 | 29 (69%) | 14 (33%) |
| **TOTAL** | | **371** | **213 (57%)** | **97 (26%)** |

**Ch14 is the worst offender**: 76% R2 violation rate + 40% length-tell rate. Ch16 (69%) and Ch15 (60%) also critically above acceptable threshold.

---

### High-ratio length tells (ratio ≥ 1.40, correct = longest option)

| Ch | Q ID | type | ratio | snippet (options, [C]=correct) | violation | 修法 | audio regen? |
|----|------|------|-------|-------------------------------|-----------|------|-------------|
| Ch9 | kt-ch9-l3-x5 | comprehension | 1.41 | [C]left behind while everyone else went to … / tired out from all the cooking… | Correct is 6 words longer; foils end earlier → look like "wrong answer shape" | Balance foil length to ≈ same word count | No |
| Ch9 | kt-ch9-l4-q7 | emoji-pick | 1.43 | [C]🧚 a fairy godmother / 👵 the new wife / 🐱 a magic cat / 🦊 a clever old fox | Emoji + 3-word vs emoji + 2-word foils; extra article phrase tips off | Shorten correct to `🧚 fairy godmother` or lengthen foils | No |
| Ch10 | kt-ch10-l4-q3 | listen-mc | 1.46 | [C]one thin long blade / food in a bag / soft cloth and rope / books and paper | 4 words vs 3 words — ratio 1.46; correct has extra modifier | Replace foil `books and paper` with `a long sharp blade` variant (local-detail) | No |
| Ch10 | kt-ch10-l4-q7 | listen-mc | 1.50 | it was too small / [C]others would not be safe / her hand was tired / the box was locked | 5 words vs 4 words; phrase rhythmically longer signals elaboration | `it was too heavy` or expand foil to `people could be in danger` | No |
| Ch10 | kt-ch10-l5-q3 | listen-mc | 1.50 | [C]drank it down inside her / kept it on her tongue / spit it out fast / gave it to a bird | Correct: 5 words; all foils: 4 words. Systematic 1-extra-word tell | Trim to `swallowed it` or pad foils | No |
| Ch11 | kt-ch11-l4-lg2 | comprehension | 1.42 | [C]He chose to think of others, not just fi… / He forgot how… / He was sure… / He wanted the Emperor… | All start "He +" but correct uniquely uses "not just" extended clause | Rebalance to equal syllable count per option | No |
| Ch11 | kt-ch11-l7-x2 | comprehension | 1.50 | [C]freedom from heaven's rules / great power and riches / many new followers / a place in the clouds | 4 words vs 3 words; possessive genitive in correct makes it visually heavier | `free from heaven's law` (equal length) | No |
| Ch12 | kt-ch12-l7-x4 | comprehension | 1.50 | [C]just one single night / one whole week / one full month / three long days | Ironic: correct is actually LONGEST here (4 words vs 3); yet conceptually the "small" answer | `one brief night` or `that one night` (3 words) | No |
| Ch13 | kt-ch13-l4-x5 | emoji-pick | 1.47 | [C]🎭 pretending to be the girl / 🙋 asking for water / 📦 delivering a package / 🎵 singing a lullaby | 5 words vs 3 words; gerund + long noun phrase distinguishes correct | Trim to `🎭 pretending to be her` | No |
| Ch13 | kt-ch13-l5-q3 | listen-mc | 1.44 | [C]dressed up like grandma / ran far away from house / cooked some food / called for the girl | Correct: 4 words, foil "ran far away from house" is 5 words → but correct is still longest on average | `dressed as grandma` (3 words) | No |
| Ch13 | kt-ch13-l5-q9 | listen-mc | 1.41 | the bed was empty / the door was open / [C]grandma looked different / her basket was gone | Correct: 3 words with predicative adjective; others 4 words but shorter chars | Fine word-count-wise; char ratio violation; acceptable | No |
| Ch14 | kt-ch14-l3-q7 | listen-mc | 1.40+ | (multiple instances in L3 block) | Ch14 L3 has 4 consecutive listen-mc where correct is consistently longer | Needs systematic L3 distractor rebuild | No |
| Ch15 | kt-ch15-l5-x1 | comprehension | ≥1.40 | Pattern repeats across L4-L6 | 5 consecutive lessons in Ch15 have ratio > 1.35 with correct=longest | Batch trim or pad for Ch15 L4-L6 | No |
| Ch16 | kt-ch16-l2-gm1 | grammar-mc | special | `is`/`am`/`be` vs correct — 3 junk distractors (all ≤2 chars) | X3-JUNK: grammar-mc should use inflections (is/was/were/been) not paradigm fragments | Replace `am`/`be` with `was` / `are` | No |

---

### Secondary finding: Phonological homogeneity (distractors cluster on same start-chars)

36 cases where all 3 distractors begin with the same 3-character prefix, collapsing option discrimination to start-letter visual pattern.

| Ch | Q ID | type | homogeneous prefix | impact |
|----|------|------|--------------------|--------|
| Ch9 | kt-ch9-l4-x5 | grammar-mc | "hol" (hold/holds/holding) | For grammar-mc (inflection), this is acceptable — testing form distinction |
| Ch9 | kt-ch9-l4-lg2 | comprehension | "she " | All foils start "she had/arrived/was" → child can scan for "different first word" |
| Ch9 | kt-ch9-l5-x5 | comprehension | "the " | 3 foils: "the ball would…/the fairy would…/the prince would…" vs correct "she would…" — correct identified by pronoun switch alone |
| Ch9 | kt-ch9-l7-x5 | comprehension | "the " | Same pattern; correct diverges at pronoun | 
| Ch10 | kt-ch10-l3-q7 | listen-mc | "to " | All foils: "to clean/to fix/to paint"; correct "for the right moment" — odd-one-out trivially |
| Ch11 | kt-ch11-l5-x3 | comprehension | "the " | Pattern repeats |
| Ch13 | multiple | listen-mc | "she " / "the " | 8 instances in Ch13 alone |

**Root cause**: LLM generation aligns distractors by parallel grammatical structure (e.g. all `she + VP` or all `the + N + VP`). The correct option then becomes the structural outlier regardless of content — visual discrimination replaces semantic discrimination.

---

### Tertiary finding: Grammar-mc R2 exception vs inflection-trap overlap

20 grammar-mc questions use inflection-set options (base/past/3s/progressive). These are **by design** (testing verb tense) and R2 length parity is waived for grammar-mc. However, **Ch16-l2-gm1** uses junk fragments (`is`/`am`/`be`) instead of the standard 4-tense set — the `am` and `be` are non-functional for A2 learners who don't confuse those forms.

---

## C. Stats

| Metric | Value |
|--------|-------|
| 4-option Qs scanned (Ch9-16) | 371 |
| R2 violations (ratio > 1.25) | 213 (57%) |
| Length-tell (longest = correct) | 97 (26%) |
| High-ratio (≥1.40) length-tell | 36 |
| R3 position balance issues | **0** ✅ |
| Phonological homogeneity (all distractors same 3-char prefix) | 36 |
| Grammar-mc inflection sets (by design) | 20 |
| Grammar-mc junk distractor (Ch16-l2-gm1) | 1 (X3-JUNK) |
| Ch with worst length-tell rate | **Ch14 (40%)** |
| Ch with cleanest length-tell rate | **Ch10 (12%)** |

---

## D. Top 5 P0

### P0-1 — `kt-ch14-l3` (listen-mc block, Ch14 Hansel & Gretel)
**Pattern**: All 4 questions in Ch14-L3 have correct = longest option. A child completing this lesson who guesses "the longest phrase" scores 100% without listening.
**Scale**: L3 is a 10-question lesson; 4 consecutive systematic length-tells collapse the listening signal entirely for this segment.
**Fix priority**: Full L3 distractor rebuild — every correct option needs length-equalized foils. Start by listing correct options and trimming to same word count as median foil.

---

### P0-2 — `kt-ch16-l2-gm1` (grammar-mc, Ch16 Jack and the Beanstalk)
**Sentence**: "The tiny boy ___ clever and brave."
**Options**: `[C] is` / `am` / `be` (junk distractors)
**Why P0**: X3-JUNK — `am` cannot follow "The tiny boy" (subject-verb agreement); `be` is a paradigm fragment not a competing form. A2 learners would never confuse "am/be" with "is" in subject+predicate context. 3 non-functional distractors = 0 item discrimination.
**Fix**: Replace with `was` / `are` / `were` — all plausible tense alternatives that test agreement + tense together.

---

### P0-3 — Phonological homogeneity: Ch9 kt-ch9-l5-x5, kt-ch9-l7-x5 (comprehension)
**Pattern**: All 3 distractors = `the [something] would...`; correct option = `she would...`. Child identifies correct by pronoun alone (she vs the).
**Why P0**: Correct option is the visual outlier by surface grammar (pronoun vs article), not by semantic content. This eliminates the comprehension test and replaces it with a pronoun-spotting task.
**Fix**: Align all options to same opening pronoun (`she would / she could / she might / she had to`) so semantic discrimination is required.

---

### P0-4 — `kt-ch12-l7-x4` (comprehension, Ch12 Weaving Maid)
**Options**: `[C]just one single night` / `one whole week` / `one full month` / `three long days`
**Why P0**: Ratio=1.50. The correct answer is the longest option (4 words vs 3). The story context (lovers allowed to meet for only one night per year on the Qixi bridge) is emotionally rich — but the answer is identifiable by counting words. Worse: the foils are all `[number][adj][noun]` (parallel) while the correct has a stacking modifier (`just one single`) that sounds "different" even without comprehension.
**Fix**: `one short night` (3 words) or `that one night only` (equal rhythm) — shorter, matching foil length profile.

---

### P0-5 — Phonological homogeneity cluster: Ch13 (8 instances)
**Ch13 (LRRH)** has 8 phonological homogeneity cases — the most of any chapter. The wolf/girl/grandma arc generates many `she` and `the wolf` foil runs. An 8-12 child who memorizes "pick the option that starts differently" solves LRRH lessons without listening.
**Fix**: Audit Ch13 L4-L6 distractors; ensure at least 2 distractors have unique first words. Simple batch check: `opts.map(o => o[0].toLowerCase())` — if 3 start same letter, flag.

---

## F. Narrative voice / pacing improvements (zero hard-violation zone)

Three observations where content is technically compliant but narration pacing could improve:

1. **Ch11 Hou Yi mid-arc (L4-L5)**: Comprehension questions cluster on action verification ("He did X — Yes/No?") without any character-interiority question. Suggest adding 1 inference Q per lesson: "Why does Hou Yi hesitate before the last sun?" — tests deeper reading.

2. **Ch14 L6 (Hansel & Gretel candy house)**: All 4 listen-mc questions ask What-did-[character]-do. No How-did-character-feel Q. The emotional peak (Gretel confronting the witch) has no empathy anchor. Adds an affective dimension that the 8-12 target audience expects from story-mode learning.

3. **Ch16 L7 (Jack after golden goose)**: Narration entries are very short (avg 12 words). Other chapters maintain 18-25 word narration sentences that establish scene atmosphere. Ch16 L7 feels compressed vs the Ghibli-warmth pacing standard.

---

## G. Architecture Recommendation (對齊業界 2026)

### Research scanned
- **D-GEN (2025)** — Choi, ACL Findings 2025: Automatic distractor generation + quality filter pipeline that explicitly normalizes candidate length before selection. Length parity is a first-class quality signal in their filter.
- **Corpus Prevalence of MCQ Options (arxiv 2602.17377, 2026)** — Empirical finding: LLM-generated correct options trend longer than distractors in 63% of cases across 6 major MCQ corpora. Confirms this is a systemic LLM generation bias, not a Pickup-specific issue.
- **LookAlike (2025, arxiv 2505.01903)** — Uses direct preference optimization to align distractor length/complexity with typical student error distributions. Shows 12% discrimination improvement from length normalization alone.

### ARCH-REC #166 — X166_R2_LENGTH_PARITY_NORMALIZER: Post-generation distractor length audit script

**Pattern**: Add `tools/audit-distractor-length.js` — a CI-friendly script that scans all `public/lessons-ch*.json`, detects every Q where `correctIndex` option is the longest AND ratio > 1.25, and outputs a prioritized fix-list (file / qid / ratio / suggested trim target).

**Why it fits Pickup**:
- Pickup is static JSON + React — no server-side generation. All content is hand-authored or LLM-batch-generated then committed. A linter is the right control point.
- The existing `tools/validate-lessons.js` pattern proves this works in CI (run pre-deploy). The new script is additive.
- Ch9-16 has 97 length-tells. A one-pass normalizer script surfaces all 97 as a prioritized queue for a single content-editor pass — much cheaper than finding them ad-hoc.
- No schema change needed; pure read-only analysis.

**Effort**: ~2 hr (script + CI hook integration)
**ROI**: High — eliminates 26% of 4-opt test items that can be guessed by word-count alone, directly increasing item discrimination for the 8-12 audience.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| Length-parity lint as CI gate | D-GEN 2025; Corpus Prevalence 2026 | ✅ fits static JSON + validate-lessons.js pattern | 2 hr | High | ✅ Recommend |
| Direct-preference-optimized distractor generation (LookAlike) | LookAlike 2025 | 🟡 Future — applies when batch-generating Ch17+ content; add length constraint to generation prompt first | 4+ hr | Medium | Defer |
| Automatic distractor length normalization (LLM-trim) | D-GEN 2025 | 🟡 LLM batch-trim of existing 97 tell items — accurate but requires content review pass | 3 hr | High | Consider after linter confirms scope |

---

*Audit completed 2026-07-17. Next rotation suggestion: A1 (obvious correct / gap too easy) on Ch17-24.*
