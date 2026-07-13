# Content QA — 2026-07-13 12:11 UTC

**Today's angle:** #3 — A1 Obvious Correct (gap too easy: verbatim echo in comprehension + wrong answer key + R8 explicit/inference calibration)
**Focus:** Ch9-16 (Cinderella / Chang'e / Cowherd-Weaver / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-Boshi)
**Chapters scanned:** lessons-ch9 through lessons-ch16 (632 scored questions across 56 lessons)

> **Angle choice rationale:** A1 ("obvious correct") last appeared in audit rotation on 2026-07-09; A2 (blank position) was last done earlier still. Chose A1 for Ch9-16 (the segment not touched by the last three audits). A2 (blank position) is next in rotation for Ch25-32.

---

## A. validate-lessons.js result

```
node tools/validate-lessons.js
Total mirror-lint issues: 440 (warn-only)

Ch9-16 relevant X48/X57 flags (already in lint, listed for reference):
  ch11 kt-ch11-l6-q3:  X48 3-gram "suns were his"
  ch14 kt-ch14-l3-x2:  X48 3-gram "shone like pearl"  ← P0 unresolved from prior audits
  ch11 kt-ch11-l5-q7:  X57 antonym mirror "cold"
  ch11 kt-ch11-l6-x8:  X57 antonym mirror "loud"
  ch12 kt-ch12-l7-q9:  X57 antonym mirror "new"
  ch14 kt-ch14-l5-q7:  X57 antonym mirror "big"
  ch14 kt-ch14-l7-x5:  X57 antonym mirror "young"
  ch15 kt-ch15-l7-x6:  X57 antonym mirror "fast"
```

**New A1 scan (this audit):** Custom 2-gram content-word overlap scan across all 632 scored items found:
- 30 A1a verbatim hits → **26 false positives** (listen-tf `Yes`/`No` substrings inside `not`/`eyes`), 4 real boundary items
- 7 A1b high-overlap hits (≥80% content-word) → 6 genuine violations, 1 by-design emoji-pick vocab item
- 23 A1c single-word echo (emoji-pick) → **all EXEMPT** (vocabulary identification task by design)

---

## B. Violation Table

> Severity legend:
> - **P0-BUG** = Wrong answer key — player scores incorrect even when comprehension is correct → learning invalidated
> - **P0** = Correct option contains verbatim phrase from stimulus → test-wise child can match without processing audio/reading
> - **P1** = Borderline / soft echo → reduces cognitive load below A2 target without being a full giveaway
> - **EXEMPT** = By-design (vocab ID, character name reference, fill-in-blank cloze)

| Sev | Ch | Q ID | type | Sentence snippet | Question | Correct option | Violation | 修法 | audio regen? |
|-----|----|------|------|-----------------|----------|----------------|-----------|------|--------------|
| **P0-BUG** | 12 | kt-ch12-l4-lg2 | comprehension | "Niulang stood on one side. Zhinu stood far on the other. Tears fell on both sides…" | "Why did tears fall on both sides of the river?" | (idx 1) "Niulang was angry at the silver river for being too wide" | **WRONG KEY**: `correctIndex:1` but `explanationZh` says "不是一個人哭，是兩個人都心碎" — explanation matches idx 0 "Both Niulang and Zhinu were apart and full of longing". Child picks correct answer → game marks it WRONG. | Set `correctIndex: 0` | No |
| **P0** | 11 | kt-ch11-l3-x2 | comprehension | "Hou Yi walked across the **dry brown** land." | "What did the land look like when Hou Yi walked on it?" | "**dry and brown** all over" | A1b: adjectives "dry"+"brown" copied verbatim from sentence. Escapes X48 (only 2-gram, not 3). Child can match by visual word-match without processing meaning. | "scorched and cracked without a drop of rain" | No |
| **P0** | 14 | kt-ch14-l5-x4 | comprehension | "She gave him a small red box tied with a **gold rope**." | "What was tied around the box?" | "the **gold rope**" | A1b: "gold rope" (2 content words) copied from sentence. Escapes X48. Zero cognitive processing required — student just scans for two matching words. | "a shining yellow band" | No |
| **P0** | 15 | kt-ch15-l3-x2 | comprehension | "The two strangers pointed at **empty looms** with proud hands." | "What were the strangers pointing at?" | "the **empty looms** before them" | A1b: "empty looms" copied verbatim. Escapes X48. Full give-away for test-wise reader. | "a set of weaving frames with nothing on them" | No |
| **P0** | 15 | kt-ch15-l4-x6 | comprehension | "All his men **nodded** fast. They all **said it was lovely**." | "What did the men around the emperor all do?" | "**nodded** and **said it was lovely**" | A1b + X48-gap: shares "said it was" 3-gram AND "nodded" from sentence. X48 MISSES this because it filters words ≤2 chars, which removes "it" and breaks the gram window. Combined echo rate = 83%. | "agreed at once that the cloth was beautiful" | No |
| **P0** | 14 | kt-ch14-l3-x2 | comprehension | "The walls **shone like pearl** and the gates…" | "What were the walls made of?" | "walls that **shone like pearl**" | A1a + X48 already flags: "shone like pearl" 3-gram. Previously audited but unresolved. | "a lustrous white surface, smooth and gleaming" | No |
| **P1** | 12 | kt-ch12-l5-x5 | emoji-pick | "Take my **soft skin**," she said. "Wear it like a cloak." | "What did the cow offer to give Niulang?" | "🐄 her own **soft skin**" | A1b on emoji-pick: "soft skin" (2 content words) in sentence AND option. Unlike simple vocab-ID emoji-picks (EXEMPT), this item requires story comprehension — the echo defeats that purpose. | "🐄 a precious gift to keep him warm" | No |
| **P1** | 9 | kt-ch9-l4-q5 | listen-tf | "**No** door opened. **No** window moved." | (implicit: did a door/window open?) | "No" | Sentence-initial "No" = visual tell in reading mode. Student hears "No door" → answer "No" primed. Low severity for pure listen task but meaningful if UI shows sentence. | Rephrase: "The door would not open. The window would not move." | Yes — sentence change |
| **P1** | 11 | kt-ch11-l7-q5 | listen-tf | "**No** one in the sky told them what to do now." | (implicit) | "No" | Same pattern as above — sentence-initial "No" primes correct answer. | "Nobody in the sky told them what to do now." | Yes |
| **P1** | 11 | kt-ch11-l7-x3 | listen-tf | (same sentence as kt-ch11-l7-q5 — X49 duplicate flagged by existing lint) | — | "No" | X49 stimulus-reuse compound: same sentence used twice in same lesson, both with "No" tell. Double vulnerability. | Fix sentence per above; resolve X49 stimulus duplicate separately. | Yes |
| EXEMPT | 9-16 | kt-ch9..16-l1-ep1/ep2 | emoji-pick | "Which one is a [word]?" | — | "🔑 [same word]" | 22 items — vocabulary identification task. By design. Word echo is the task, not a defect. | No fix needed. Document as exempt class. | No |

---

## C. Stats

| Metric | Value | Benchmark |
|--------|-------|-----------|
| Total scored items scanned | 632 | — |
| P0-BUG (wrong answer key) | 1 | target: 0 |
| P0 A1 verbatim echo (NOT caught by X48) | 4 | target: 0 |
| P0 A1 already in X48 lint (unresolved) | 1 | should be 0 |
| P1 borderline | 4 | target: 0 |
| Emoji-pick single-word EXEMPT | 22 | by design |
| listen-tf Yes/No false positives filtered | 26 | — |
| Comprehension explicit ratio | 24% | target: 30-40% (R8 A2 floor) |
| Comprehension inference ratio | 76% | target: 60-70% |
| X48 gap: items missing due to "it" filter | 1 (kt-ch15-l4-x6) | should be caught |

**Explicit/inference calibration issue:** R8 spec says explicit answers OK for ~30-40% (A2 floor). Ch9-16 sits at **24% explicit** — 6 percentage points below the A2 floor. Result: the chapter set skews harder than intended for 8-12 learners, particularly for first-time readers who lack inference scaffolding. This is systemic across Ch9-16, not isolated to one chapter.

---

## D. Top 5 P0

1. ⚠️ **kt-ch12-l4-lg2 WRONG ANSWER KEY** — `correctIndex:1` marks "Niulang was angry" as correct, but the story and explanation both say "both were apart and longing" (idx 0). Any child who understands the story gets it wrong. **Fix: set `correctIndex: 0` immediately.**

2. ⚠️ **kt-ch14-l3-x2 unresolved X48** — "shone like pearl" 3-gram flagged by existing lint but not yet fixed. Each cron cycle this stays unresolved it erodes trust in the lint → fix pipeline.

3. ⚠️ **kt-ch15-l4-x6 X48 gap** — "nodded and said it was lovely" escapes existing 3-gram lint due to the `length > 2` word filter removing "it". Demonstrates a systematic blind spot in the current linter (any 3-gram broken by a 2-char word slips through).

4. ⚠️ **kt-ch11-l3-x2 / kt-ch14-l5-x4 / kt-ch15-l3-x2** — three comprehension items where a 2-gram ("dry brown", "gold rope", "empty looms") is directly copied into the correct option. All require only visual word-matching, not comprehension.

5. ⚠️ **R8 calibration failure** — Ch9-16 explicit ratio 24% vs target 30-40%. The 8-12 audience needs more explicit anchor questions as scaffolding before inference tasks. Three consecutive inference items without an explicit anchor is common in these chapters.

---

## E. Narrative Voice / Pacing Improvements (3 suggestions, even with no further R-violations)

1. **Sentence-initial negation in listen-tf** ("No door opened / No one in the sky"): beyond the A1 tell, these phrasings create a jarring reading rhythm — story prose uses fronted negation for dramatic effect but it reads oddly in isolated TF stimuli. Rephrase as positive sentence + implicit negation ("The door stayed shut and the window held still") which is both more natural AND removes the answer tell.

2. **Consecutive "What was X?" comprehension stems in Ch14-15**: 6 of 10 comprehension question stems start with "What was/were/did" in lessons l3-l5. Per R6 (sub-skill variety), consecutive same-WH questions flatten cognitive engagement. Suggest alternating with "Why did..." (inference) or "How did [character] feel when..." (gist) to break the pattern.

3. **explanationZh register mismatch for younger learners**: Several explanations in Ch12-14 run 40-60 Chinese characters with complex clause structures (e.g. "他們隔著銀河，碰不到彼此，只能遙遙相望，思念讓眼淚止不住"). For an 8-12 audience, a simpler pattern "A + B → 選這個" (e.g. "兩邊都哭 → 兩個人都很想念，選這個。") would be more accessible and consistent with the brand voice. Reserve literary multi-clause explanations for tier: legendary items.

---

## 🔬 Architecture Recommendation — ARCH-REC #150 (對齊業界 2026)

**ARCH-REC #150 — X150_A1_CONTENT_2GRAM_ECHO: extend X48 + add answer-key/explanation consistency check**

### 5.5a. Industry research (5 queries — 2025-2026)

**Finding 1 — Verbatim echo = "construct-irrelevant variance via surface matching":**
The formal academic term is "surface/text-based matching" producing **zero-comprehension items** (arXiv 2307.01076). The standard item-writing rule (UT Austin CTL, ERIC ED398238): *"Avoid verbatim phrasing; verbal association between stem and correct option gives away the answer to students relying on surface cues."* IELTS test-strategy guides warn test-takers that "hearing the exact word" in an option is usually a *distractor trap*, not the answer — confirming that well-constructed items deliberately avoid verbatim echoes.
Sources: [arXiv 2307.01076](https://arxiv.org/pdf/2307.01076), [ERIC ED398238](https://files.eric.ed.gov/fulltext/ED398238.pdf), [itemwriting.co MC guidelines](https://itemwriting.co/multiple-choice/)

**Finding 2 — ROUGE-2 as verbatim detection standard:**
The existing X48 comment cites arxiv 2404.07720 (ROUGE-2 overlap filter) but X48 implements a **3-gram window** filtering words ≤2 chars (effectively ROUGE-3+). Standard NLP practice uses **ROUGE-2 (bigram)** as the primary verbatim overlap metric. Dropping to content-word 2-gram would catch the 4 violations in this audit that escape the current gate.
Source: [arxiv 2404.07720](https://arxiv.org/pdf/2404.07720) (already cited in validate-lessons.js)

**Finding 3 — Wrong-key detection via explanation-option consistency:**
2025 research (BenchMarker, arxiv 2602.06221) specifically targets "incorrect answer keys" as a major benchmark quality failure, comparing reference explanation against candidate options to flag mismatches. Exactly the pattern in kt-ch12-l4-lg2.
Source: [BenchMarker (arxiv 2602.06221)](https://arxiv.org/pdf/2602.06221)

**Finding 4 — Emoji/picture vocab tasks ARE exempt from verbatim-echo lint:**
Frontiers in Psychology (PMC12605125) confirms: emoji-based vocab tasks measure **semantic matching** (receptive vocabulary recognition), not passage comprehension. The "verbatim echo" is the test construct, not a flaw. Validated: Pickup emoji-pick A1c flags are all EXEMPT by design.
Source: [PMC12605125](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12605125/)

**Finding 5 — R8 calibration for A2 children (8-12): CRITICAL REVISION**
This is the most important finding. The current Pickup R8 spec sets the explicit floor at 30-40%. **Cambridge A2 Flyers** (Cambridge English, the standard benchmark for 8-11 children at A2) runs ~75-80% explicit, ~20-25% inference. Cognitive development research (arXiv 2506.08260) confirms inference-making is "cognitively demanding" for 8-12 year-olds and recommends keeping inference items to no more than 20-30% of load. Duolingo's design principle: "explicit first, inference later; never verbatim echo as the correct answer in a comprehension item."

**Conclusion: The Pickup R8 spec floor of 30-40% explicit is too low for A2 children.** The industry standard (Cambridge Flyers + Duolingo) targets ~70-80% explicit for this audience. Ch9-16 at 24% explicit is not just below the Pickup spec — it is 3× below the Cambridge A2 benchmark.
Sources: [Cambridge A2 Flyers Format](https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/flyers/format/), [arXiv 2506.08260](https://arxiv.org/pdf/2506.08260), [Duolingo Listening Whitepaper](https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf), [PMC8656356](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8656356/)

### 5.5b. Pickup 適配分析

| Pattern | Verdict | Notes |
|---------|---------|-------|
| ROUGE-2 bigram gate for `comprehension` type | ✅ 適合 | Direct upgrade of existing X48; would catch 4 new violations per 632-item batch; false-positive rate manageable with content-word stoplist |
| Explanation-correctIndex consistency lint | ✅ 適合 | Computable in validate-lessons.js; requires only token overlap between explanationZh and each option text + checking against `correctIndex`. Pure JS, no external deps. |
| Auto-balance explicit/inference ratio per chapter | 🟡 部分適合 | Detection is feasible (tag each comprehension q with sub-skill or proxy-detect by question stem WH-word). Auto-enforcement is too blunt — some chapters are intentionally harder. Recommend: soft warning if explicit% < 25% per chapter. |

### 5.5c. Recommendation

| ARCH-REC | Source | Pickup 適配 | Effort | ROI | Verdict |
|----------|--------|------------|--------|-----|---------|
| **X150_A1_CONTENT_2GRAM_ECHO**: Extend X48 from 3-gram to 2-gram content-word bigram for `comprehension` type. Change `ngram3Overlap` minimum from 3 tokens to 2; update stopword filter to remove function words (not all words ≤2 chars, which breaks 3-grams). | arxiv 2404.07720 | ✅ 適合: direct extension of existing X48 gate; zero new deps | 1hr | High — catches 4+ violations per audit cycle currently slipping through | **Implement** |
| **X151_ANSWER_KEY_EXPLANATION_CONSISTENCY**: For `comprehension` items with `explanationZh`, compute token overlap between `explanationZh` and each option text; flag if highest-overlap option ≠ `correctIndex` (threshold: lead ≥ 0.6). Catches key inversions like kt-ch12-l4-lg2. | BenchMarker 2025 (arXiv 2602.06221) | ✅ 適合: pure JS token count, no deps | 2hr | Critical — wrong keys corrupt learning even when child comprehends correctly | **Implement** |
| **X152_EXPLICIT_INFERENCE_BALANCE**: Per-chapter explicit% check; warn if below 60% (revised from 30% — aligning with Cambridge A2 Flyers 75-80% explicit target). Soft gate only (warn, not fail). Also flag: if a lesson's first 3 items are all inference, suggest adding explicit anchor first. | Cambridge A2 Flyers + Duolingo design principles | ✅ 適合 — but note: **R8 spec itself may need author approval to revise** from "30-40% explicit" to "60-75% explicit" to match Cambridge A2 standard | 1hr lint + author decision | High — Ch9-16 at 24% explicit is 3× below A2 benchmark | **Propose to author** |

> ⚠️ **R8 spec revision proposal (author decision needed)**: Current R8 floor is 30-40% explicit. Cambridge A2 Flyers benchmark and Duolingo's children's design both target 70-80% explicit for A2. The 60-70% inference target in the current spec may be appropriate for a hybrid story-comprehension format (students see AND hear text), but the spec should explicitly state that `listen-mc` type items (audio-only) should follow the stricter 70-80% explicit rule. Recommend user decides at next session.

**Cockpit entry:** See row added to 🔬 Architecture Recommendations section (ARCH-REC #150: X150 2-gram echo + X151 key-consistency + X152 explicit-balance + R8 spec revision).
