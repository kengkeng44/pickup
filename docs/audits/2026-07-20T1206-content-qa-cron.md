# Content QA — 2026-07-20 12:06 UTC

**Today's angle:** A7 — Content-word repetition (stimulus → correct-option verbatim lift)
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi & Ten Suns / Cowherd & Weaving Maid / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-Boshi)
**Scored questions analysed:** 208 listen-mc + comprehension across Ch9–16 (picture-mc and grammar-mc excluded — see §D)
**Academic backing:**
- Haladyna, Downing & Rodriguez (2002) "A review of multiple-choice item-writing guidelines" — rates **word repetition / stem-option overlap** as one of the highest-severity construct-irrelevant variance (CIV) sources in MCQ design. Correct option must not re-use content words from stem.
- Buck (2001) *Assessing Listening*, §6: distractors must not be eliminable without genuine audio comprehension; verbatim repetition from stimulus in the key fails this.
- ASC Item Writing Guide 2025 (assess.com): "Do not include keywords from the stem in response options."
- PMC 2025 (Artificial Intelligence Meets Item Analysis, ncbi.nlm.nih.gov/pmc/articles/PMC11911725/): catalogs **word repetition** as one of the primary automated-detection flaw types.
- ETS TOEIC Score User Guide: TOEIC *intentionally* places verbatim/near-verbatim stimulus words in **wrong** options (phonological distractors), and requires correct option to use paraphrase. Pickup currently has the opposite pattern on 39% of questions.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
WARN Ch9: 8 lint issues (X2/X49/X57 known patterns)
Build gate: PASS (tsc + vite)
No schema errors.
```

---

## B. Violation Table — A7_CONTENT_WORD_REPEAT

> **Scope note:** picture-mc exempted (correct option must describe the picture which *is* the sentence — overlap is by design). grammar-mc exempted (options test grammar forms, not paraphrase).
> **Legend:** `leaked_words` = content words from stimulus that appear in correct option but NOT in any distractor — enabling word-match shortcut.

### P0 Violations (≥2 leaked words — child can word-match without listening)

| Ch | Q ID | type | Stimulus snippet | Leaked words (correct only) | 修法 | audio regen? |
|----|------|------|-----------------|----------------------------|------|--------------|
| Ch9 | kt-ch9-l3-x2 | comprehension | "Every girl in the whole town was asked" | `girl`, `town` | Rewrite: "all the young women from nearby" | No |
| Ch9 | kt-ch9-l3-x5 | comprehension | "The door shut. The house went quiet. She sat down and cried." | `left`, `went` | Rewrite: "she was the only one who stayed home" | No |
| Ch9 | kt-ch9-l4-x2 | comprehension | "No door opened. No window opened when she appeared." | `appeared`, `opened`, `window` | Rewrite: "she arrived without using any entrance" | No |
| Ch10 | kt-ch10-l3-x6 | comprehension | "Chang'e was home alone." | `alone`, `chang'e` | Rewrite: "she had no one to protect her" | No |
| Ch11 | kt-ch11-l3-q9 | listen-mc | "One sun fell down." | `down`, `sun` | Rewrite: "one light vanished from the sky" | No |
| Ch11 | kt-ch11-l3-x2 | comprehension | "Hou Yi walked across the dry brown land." | `brown`, `dry` | Rewrite: "cracked earth with no colour" | No |
| Ch12 | kt-ch12-l4-lg2 | comprehension | "Tears fell on both sides of the river." | `silver`, `wide` | Rewrite: "the barrier between them was too great" | No |
| Ch12 | kt-ch12-l5-x2 | comprehension | "Niulang sat by the river and cried for many days." | `river`, `sat` | Rewrite: "stayed at the water's edge weeping" | No |
| Ch12 | kt-ch12-l7-x7 | comprehension | "They tell the story to their children under the bright stars." | `stars`, `under` | Rewrite: "on a clear night, looking up at the sky" | No |
| Ch13 | kt-ch13-l4-x2 | comprehension | "He knocked on the wooden door." | `door`, `knocked` | Rewrite: "rapped to be let in" | No |
| Ch13 | kt-ch13-l4-x7 | comprehension | "Back in the woods, the girl picked many bright flowers." | `flowers`, `woods` | Rewrite: "gathering blooms among the trees" | No |
| Ch14 | kt-ch14-l3-x2 | comprehension | "The walls shone like pearl." | `like`, `pearl`, `shone` | Rewrite: "gleaming mother-of-pearl surfaces" | No |
| Ch14 | kt-ch14-l4-x4 | comprehension | "He walked in the coral garden with the princess." | `garden`, `walked` | Rewrite: "strolled through the reef grounds together" | No |
| Ch14 | kt-ch14-l5-x4 | comprehension | "She gave him a small red box tied with a gold rope." | `gold`, `rope` | Rewrite: "a cord of yellow silk bound it shut" | No |
| Ch14 | kt-ch14-l5-x6 | comprehension | '"Please, never open it. Never."' | `never`, `open` | Rewrite: "keep it sealed — that was her only request" | No |
| Ch14 | kt-ch14-l6-q9 | listen-mc | '"That name is in old stories."' | `old`, `stories` | Rewrite: "belongs to ancient tales" | No |
| Ch14 | kt-ch14-l7-q9 | listen-mc | "He was a very old man with a long beard." | `man`, `old` | Rewrite: "aged centuries in an instant" | No |
| Ch15 | kt-ch15-l3-x2 | comprehension | "The two strangers pointed at empty looms." | `empty`, `looms` | Rewrite: "bare frames with nothing on them" | No |
| Ch15 | kt-ch15-l4-x6 | comprehension | "All his men nodded fast. They all said it was lovely." | `lovely`, `nodded`, `said` | Rewrite: "agreed aloud in unison" | No |
| Ch15 | kt-ch15-l7-x6 | comprehension | "He kept walking with the slow steps of a king." | `slow`, `steps` | Rewrite: "a measured, unhurried pace" | No |
| Ch16 | kt-ch16-l3-x2 | comprehension | "His mother gave him a sewing needle for a sword." | `needle`, `sewing` | Rewrite: "a tiny pin as his blade" | No |
| Ch16 | kt-ch16-l3-x6 | comprehension | "The water carried him far from home." | `carried`, `river` | Rewrite: "the current swept his bowl downstream" | No |
| Ch16 | kt-ch16-l7-q3 | listen-mc | '"This is a lucky mallet. It can grant a wish."' | `mallet`, `wish` | Rewrite: "a hammer that makes dreams come true" | No |
| Ch16 | kt-ch16-l7-x2 | comprehension | '"This is a lucky mallet. It can grant a wish."' | `grant`, `wish` | Rewrite: "could make any desire real" | No |
| Ch16 | kt-ch16-l7-x4 | comprehension | "Soon he stood as tall as any young man." | `man`, `young` | Rewrite: "reached the height of an ordinary person" | No |

**P0 count: 25 across Ch9–16**

### P1 Violations — representative sample (1 leaked word; 56 total)

| Ch | Q ID | type | Stimulus snippet | Leaked word | 修法 |
|----|------|------|-----------------|-------------|------|
| Ch9 | kt-ch9-l6-x2 | comprehension | "They danced every dance." | `prince` | Rewrite: "so caught up in the evening" |
| Ch10 | kt-ch10-l2-pm1 | picture-mc | — | — | **Exempt** (picture-mc by design) |
| Ch10 | kt-ch10-l4-q3 | listen-mc | "He pulled out a long sharp knife" | `long` | Rewrite: "one slender blade" |
| Ch11 | kt-ch11-l5-q7 | listen-mc | "They saw warm light" | `warm` | Rewrite: "gentle, not burning" |
| Ch12 | kt-ch12-l4-q3 | listen-mc | "It shone with cold light, sharp at one end." | `sharp` | Rewrite: "bright and pointed" |
| Ch12 | kt-ch12-l5-x4 | comprehension | "The old cow opened her mouth. Words came out clear." | `clear` | Rewrite: "spoke plain human speech" |
| Ch13 | kt-ch13-l5-q9 | listen-mc | "The shape in the bed did not look like her dear grandma." | `grandma` | Rewrite: "the figure was all wrong" |
| Ch13 | kt-ch13-l7-x7 | comprehension | '"I will always listen to mother."' | `listen` | Rewrite: "obey the people who care for you" |
| Ch14 | kt-ch14-l4-q3 | listen-mc | "Music played all night long." | `music` | Rewrite: "lively songs filled every hour" |
| Ch14 | kt-ch14-l7-x2 | comprehension | "His mother was gone. His friends were gone too." | `gone` | Rewrite: "no one he knew was left" |
| Ch15 | kt-ch15-l6-x4 | comprehension | '"But he has no clothes on!" the child said.' | `clothes` | Rewrite: "the emperor was bare" |
| Ch16 | kt-ch16-l6-q3 | listen-mc | "Inside the demon, it was very dark." | `dark` | Rewrite: "no light at all" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Scope | listen-mc + comprehension, Ch9–16 |
| Total scored Qs (listen-mc + comp) | 208 |
| A7 violations | 81 (39%) |
| P0 (≥2 leaked content words) | 25 (12%) |
| P1 (1 leaked content word) | 56 (27%) |
| Worst chapter | Ch13 Little Red Riding Hood (54% violation rate) |
| Best chapter | Ch11 Hou Yi (19% violation rate) |
| Most affected type | comprehension (55/81 = 68% of violations) |
| Most affected listen-mc | 26/81 = 32% of violations |

### Violation rate by chapter

| Ch | Story | Qs (listen-mc+comp) | A7 violations | Rate |
|----|-------|--------------------:|:-------------:|-----:|
| Ch9 | Cinderella | 22 | 5 | 23% |
| Ch10 | Chang'e (pill) | 26 | 6 | 23% |
| Ch11 | Hou Yi / Ten Suns | 27 | 5 | 19% |
| Ch12 | Cowherd & Weaving Maid | 27 | 13 | 48% |
| Ch13 | Little Red Riding Hood | 26 | 14 | 54% |
| Ch14 | Urashima Taro | 24 | 14 | 58% |
| Ch15 | Emperor's New Clothes | 31 | 12 | 39% |
| Ch16 | Issun-Boshi | 25 | 12 | 48% |

---

## D. Top 5 P0

1. **⚠️ kt-ch14-l3-x2** (Ch14 comprehension) — 3 content words leaked (`like`, `pearl`, `shone`). Q: "What were the walls made of?" → Correct: "walls that shone like pearl" is verbatim lift of the sentence. A 8-year-old can word-match without hearing or understanding.

2. **⚠️ kt-ch15-l4-x6** (Ch15 comprehension) — 3 leaked words (`lovely`, `nodded`, `said`). Q: "What did the men all do?" → Correct: "nodded and said it was lovely" = near-verbatim copy. Zero inference required.

3. **⚠️ kt-ch9-l4-x2** (Ch9 comprehension) — 3 leaked words (`appeared`, `opened`, `window`). Q: "What is unusual about how she appeared?" → Correct: "no door or window had opened when she appeared" = verbatim lift of the sentence pattern. Should encode magic inferentially.

4. **⚠️ kt-ch13-l4-x7** (Ch13 comprehension) — 2 leaked words (`flowers`, `woods`). Q: "What was the girl doing while the wolf reached grandma?" → Correct: "picking flowers in the woods" is verbatim from "picked many bright flowers" + "Back in the woods." Classic shortcut.

5. **⚠️ kt-ch16-l7-q3** (Ch16 listen-mc) — 2 leaked words (`mallet`, `wish`). Q: "What kind of mallet was it?" → Correct: "a magic wish mallet" with both key nouns from stimulus. A child can select this without comprehension.

---

## E. Narrative Voice / Pacing Observations (3 required)

### E1 — Ch13 Little Red Riding Hood: question over-anchors on verbatim dialogue
Questions like `kt-ch13-l6-x2` ("Grandma, what big ears you have!") and `kt-ch13-l6-x4` ("All the better to eat you with!") ask comprehension of lines that are famous set-piece quotes. A child who has heard the story once recognises the quote without processing meaning. Recommend inference-based replacements: "Why did the wolf keep answering in the same pattern?" tests deeper comprehension.

### E2 — Ch14 Urashima Taro: detail Qs cluster in lesson-4 (palace scenes)
Lessons 3–5 each have comprehension Qs asking detail-level facts about the palace (walls/garden/box). The clustering of concrete-detail Qs in a row creates a fatigue valley where pacing slows to trivia retrieval. Recommend replacing one detail Q per lesson with an inference or emotional-response Q (e.g. "How might Urashima feel walking in a garden with someone he just met?").

### E3 — Ch12 Cowherd & Weaving Maid: ending compression
The 七夕 story's emotional climax — a single night reunion every year — is resolved in a single listen-tf (`kt-ch12-l7-x4`) and one comprehension Q. Given the emotional weight this ending carries for Chinese-speaking families (the target demographic), a 2–3 extra inference Q cluster (What does waiting a whole year feel like? Why do magpies come?) would deepen the story-as-ELT experience and give the Qixi cultural moment the pedagogical space it deserves.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis:** PMC 2025 "Artificial Intelligence Meets Item Analysis" (ncbi.nlm.nih.gov/pmc/articles/PMC11911725/) demonstrates that automated stem-option overlap detection (A7-class flaws) can be encoded as a CI lint rule with near-100% precision for the strict (≥2 leaked words) case. ETS TOEIC item construction guidelines (the gold standard) explicitly mandate that correct options use paraphrase, not verbatim repetition of stimulus words. Current Pickup Ch9–16 violates this on 39% of listen-mc + comprehension questions.

**ARCH-REC #182: X182_A7_STEM_OPTION_OVERLAP_LINT — add content-word overlap CI gate to validate-lessons.js**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| ARCH-REC #182 — A7 Stem-Option Overlap CI Lint | PMC 2025 item-flaw detection + ETS TOEIC guidelines | ✅ Fully compatible — add rule to `validate-lessons.js`: for each listen-mc/comprehension Q, assert that ≥1 content word from `sentence` leaking into `options[correctIndex]` is also present in ≥1 distractor (i.e. not exclusively in correct). P0 threshold: ≥2 exclusive leaked words = build WARN. | Low (3–5 hr) | High — eliminates 81 construct-validity violations, enforces Buck 2001 R1 paraphrase rule at CI level | ✅ Recommend |

**Architectural note:** The pattern is already partially captured by existing `X48_NGRAM_VERBATIM_CORRECT` (3-gram verbatim lift in sentence), but X48 only catches exact N-gram substring matches. X182 is a content-word-level overlap check that catches single-word and 2-word leaks that slip past X48's 3-gram threshold. They are complementary, not redundant.

**Pickup架構影響:** Add to `tools/validate-lessons.js` — no schema change, no app code change, no deploy needed. Pure build-time quality gate.
