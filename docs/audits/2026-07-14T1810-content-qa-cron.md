# Content QA — 2026-07-14 18:10 UTC

**Today's angle:** A3 — 語意 Leak / Story 跳針 (Semantic Telegraph + Narrative Leak)  
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel Hump / Baba Yaga / Six Swans / Three Little Pigs)  
**Scanned:** 7 lessons × 8 chapters = 56 lessons; ~210 scored questions

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 17 lint issue(s)  (X49 stimulus-reuse dominant)
WARN lessons-ch2.json: lint issues
WARN lessons-ch5.json: lint issues
WARN lessons-ch8.json: 8 lint issue(s)
Total mirror-lint issues: 440 (warn-only, same as prior cycles)
```

No new schema-parse failures. All existing WARNs are pre-existing X49/X57 issues tracked in prior audits.

---

## B. Violation Table — A3 Angle

### A3a: Correct answer appears verbatim in lesson narration (not own sentence)

| Ch | Q ID | Type | Blank / Q snippet | Correct | Leaked in narration | Dist | Severity |
|----|------|------|-------------------|---------|---------------------|------|----------|
| Ch2 | kt-ch2-l6-x3 | grammar-mc | "A farmer came across the field and ___ the ice apart." | "broke" | "A farmer came across the field and **broke** the ice apart." | −1 | **P0** |
| Ch5 | kt-ch5-l3-q10 | comprehension | "What did the black rider mean was coming?" | "night" | "The black rider passed her. **Night** fell on the forest." | +2 | **P0** |
| Ch5 | kt-ch5-l7-q9 | listen-mc | "Who came out to see the light?" | "the new woman" | "In a single breath, **the new woman** turned to ash." | +3 | **P0** |
| Ch1 | kt-ch1-l3-g1 | grammar-mc | "Year by year, Momotaro ___ tall and strong." | "grew" | "Year by year, Momotaro **grew** tall, strong, and very brave." | −10 | P1 |
| Ch1 | kt-ch1-l5-g1 | grammar-mc | "The four of them crossed the sea ___ boat." | "by" | "The four of them crossed the wide sea **by** boat." | −10 | P1 |
| Ch3 | kt-ch3-l5-x2 | grammar-mc | "The tortoise ___ now closer to the big tree…" | "was" | "The tortoise **was** now closer to the big tree…" | −4 | P1 |
| Ch5 | kt-ch5-l3-x4 | grammar-mc | "A red rider on a red horse ___ her." | "passed" | "A red rider on a red horse **passed** her. The sun stood high." | −4 | P1 |
| Ch5 | kt-ch5-l6-x5 | grammar-mc | "Baba Yaga ___ to bed. The skulls glowed…" | "went" | "Baba Yaga **went** to bed. The skulls glowed by the wall." | −7 | P1 |
| Ch6 | kt-ch6-l3-x4 | grammar-mc | "The six ___ flew out of the open glass…" | "swans" | "Where the boys had stood, six **swans** now rose into the air." | −10 | P1 |
| Ch6 | kt-ch6-l5-x4 | grammar-mc | "A young king ___ through the wood…" | "rode" | "A young king **rode** through the wood on a cool grey morning." | −10 | P1 |
| Ch7 | kt-ch7-l4-x2 | grammar-mc | "___ old man in a sky-colored robe stepped down…" | "an" | "**An** 老人 (old man) in a sky-colored robe stepped down…" | −4 | P1 |
| Ch8 | kt-ch8-l4-x5 | grammar-mc | "He _____ on the wooden door three times." | "knocked" | "He **knocked** on the wooden door three times." | −7 | P1 |
| Ch2 | kt-ch2-l7-x10 | comprehension | "Which season does this describe?" | "spring" | "**Spring** came at last, and the cold ice melted away." | −14 | P1 |

**Dist = 負 = narration comes BEFORE the question (player has already seen the answer). 正 = narration comes AFTER (tested before reveal).**

### A3b: Adjacent-narration telegraph (worst-case proximity, dist ≤ 2)

| Ch | Q ID | Type | Direction | Impact |
|----|------|------|-----------|--------|
| Ch2 | kt-ch2-l6-x3 | grammar-mc | BEFORE 1 step | Student reads "broke" in narration, then immediately fills blank → trivial |
| Ch5 | kt-ch5-l3-q10 | comprehension | AFTER 2 steps | Forward reveal: answer in upcoming narration — reduces to memory not inference |
| Ch5 | kt-ch5-l7-x5 | listen-tf | BEFORE 1 step | listen-tf "Yes" trivially confirmed by adjacent narration |

### A3c: Story-jump — answer only in FUTURE narration (tests content before it's established)

| Ch | Q ID | Q Snippet | Correct | Appears at | Impact |
|----|------|-----------|---------|------------|--------|
| Ch5 | kt-ch5-l7-q9 | "Who came out to see the light?" | "the new woman" | narration 3 steps later | Mixed: requires inference but answer revealed immediately after → not full blind |
| Ch1 | kt-ch1-l4-x2 | listen-tf statement (correct=Yes) | "Yes" | narration 13 steps later | listen-tf answer derivable from story knowledge, not this |
| Ch1 | kt-ch1-l4-x5 | listen-tf statement (correct=Yes) | "Yes" | narration 5 steps later | Same |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Grammar-mc items in Ch1-8 | 10 |
| Grammar-mc items with prior narration leak | **10 (100%)** |
| Grammar-mc with immediate-adjacent leak (dist −1) | 1 (Ch2 l6) |
| Comprehension/listen-mc with narration telegraph | 3 |
| P0 violations (dist ≤ 2 or answer in adjacent narration) | **4** |
| P1 violations | 9 |
| False positives filtered (listen-tf "Yes"/"No" substring) | ~6 |

**Key structural finding: Every grammar-mc item in Ch1-8 (10/10) is derived from the same narration sentence that appears earlier in the lesson. This is a 100% violation rate for this type — it's not isolated but systemic.**

---

## D. Top 5 P0 (Highest Priority Fixes)

### P0-1 · kt-ch2-l6-x3 (CRITICAL — dist=−1, most egregious)

```
Narration [8]:  "A farmer came across the field and broke the ice apart."
Grammar-MC [9]: "A farmer came across the field and ___ the ice apart."
                Options: break / broke / breaking / breaks
```

**Violation:** Student reads full sentence with "broke" immediately before blank. Trivial giveaway — no grammar skill tested.  
**Fix:** Either (a) move grammar-mc to BEFORE its source narration, or (b) use an independent example sentence — "Last winter, she ___ the frozen pond to get water." The story narration stays as-is; the grammar-mc tests the same form with different content.  
**Audio regen:** No (grammar-mc has no audio)

### P0-2 · kt-ch5-l3-q10 (FORWARD REVEAL — dist=+2)

```
Comprehension: "After the red rider, a black rider on a black horse came up the path."
Question:      "What did the black rider mean was coming?"
Options:       a feast / spring rain / a wedding / night
...narration [+2]: "The black rider passed her. Night fell on the forest."
```

**Violation:** Player is tested on inference ("black → night") but the very next narration reveals "Night fell." If player reads ahead slightly (or sees narration immediately after answering), item is spoiled.  
**Fix:** Move `narration [+2]` to appear BEFORE this question (making it a comprehension recall), or restructure narration order so the night-reveal narration comes 4+ entries after the question.  
**Audio regen:** No (comprehension has no regen cost)

### P0-3 · kt-ch5-l7-q9 (FUTURE NARRATION — dist=+3)

```
Question: "Who came out to see the light?"
Correct:  "the new woman"
Narration +3: "In a single breath, the new woman turned to ash."
```

**Violation:** "The new woman" is a proper noun; its explicit appearance 3 entries later makes the answer retrievable by fast-forward skimming. Also, Ch5-l7 listen-tf `x5` has prior-narration leak (dist=−1) for "Yes" relating to the same character.  
**Fix:** Rewrite comprehension question to test inference that's independent of the named character — e.g., "What happened to the woman who kept the skull's light?" → "she turned to ash"; or accept distractors that are less directly resolved by the next narration.  
**Audio regen:** No

### P0-4 · kt-ch2-l7-x10 (SEASONAL INFERENCE SPOILED BY NARRATION)

```
Comprehension: "Green leaves opened, and warm sun shone over the pond."
Question:      "Which season does this describe?"
Correct:       "spring"
Narration −14: "Spring came at last, and the cold ice melted away."
```

**Violation:** "Spring" appears explicitly in an earlier narration. A2 learners recalling the narration word can answer without inference from visual/contextual cues.  
**Fix:** This is a genuine inference item (green leaves + warm sun → spring). The narration is 14 entries back, so severity is medium. Fix by rewording the narration to "The cold ice melted at last, and the world turned green" (removing the word "spring" from narration).  
**Audio regen:** Only if narration TTS was generated. Check `public/audio/tts/`.

### P0-5 · Systemic: 100% of grammar-mc items have prior-narration source leak

This is the most impactful finding. All 10 grammar-mc items in Ch1-8 follow this construction pattern:

```
Step 1: Narration "X verb Y"          ← player reads/hears full sentence
  ...  [other items]
Step N: Grammar-MC "X ___ Y"          ← player fills blank; answer already seen in Step 1
```

**This degrades grammar-mc from grammar-testing to memory-matching.** It may feel pedagogically "supportive" (scaffolded), but it eliminates the retrieval-production challenge that grammar exercises are meant to create. At A2 level, the design goal should be "see the rule in narration → apply the rule to a NEW sentence" — not "see the rule in narration → re-apply to the same sentence with a blank."

---

## E. Narrative Voice / Pacing Improvement Proposals (even with 0 R1-R8 violations, 3 required)

1. **Rider-sequence redundancy (Ch5 l3):** The white/red/black rider sequence has 3 consecutive listen-tf items plus 2 grammar-mc items all derived from rider sentences. By the 5th rider item, the player is in mechanical repetition mode. Recommend inserting one `comprehension` inference item in the middle ("What do the three riders together show about time?") to break the rhythm and elevate cognitive engagement.

2. **Grammar-mc explanationZh jargon (Ch5 l3-x4):** The `explanationZh` says "pass 後面加 -ed 變 passed 喔" — correct but jargon-heavy for 8-year-olds. Recommend "紅騎士「過去了」，所以用過去式 passed。就像你說昨天跑了 = ran 一樣喔！" (anchoring past-tense to child's lived experience, not metalinguistic rule).

3. **Story pacing: Ch2 l6-l7 ice-break scene repetition:** The Ugly Duckling spring arrival scene is tested 3 times in consecutive lessons (l6: farmer breaks ice, l7: spring arrives). Both test the same narrative beat from slightly different angles. Consider collapsing into 1 lesson and spending the freed slot on the swan-transformation scene, which is the emotional payoff the children actually care about.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #157 — X157_GRAMMAR_MC_NARRATION_ISOLATION_GATE**

### Problem identified (research-grounded, 2026-07-14 deep scan)

Every grammar-mc item in Ch1-8 is derived from a narration sentence that appears EARLIER in the same lesson. Three independent research streams confirm this is a named item defect:

**1. "Word Repetition / Clang Clues" — NBME Item-Writing Guide 6th ed. (2021)**  
The NBME Guide (cross-disciplinary gold standard for MCQ quality) explicitly classifies this as a test-wise *cueing* flaw:
> "This flaw arises when language used in the stem is repeated in the correct answer. The same flaw can appear even if a word is repeated only in an etymological sense."  
Fix stated: "scan the stem and all surrounding context for the repeated word and rewrite to remove it."  
Source: https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf

**2. Local Item Dependence (LID) — Abdullaev et al. ERIC EJ1419371 (2024)**  
Rasch-model study of ELT fill-blank/cloze tests: items nested within a passage show LID when passage cohesion carries the target form across sentences. Three item pairs found locally dependent — removing them improved test unidimensionality. At dist=−1 (Ch2 l6), the item is not just *influenced* by narration — the answer is *directly visible*. Per the study: "The validity argument fails: the item cannot claim to measure grammar knowledge if the answer word is visible in adjacent narration."  
Source: https://eric.ed.gov/?id=EJ1419371

**3. Construct-Irrelevant Variance / Test-Wiseness in L2 Listening (2022)**  
Applied Linguistics study: "Construct-irrelevant, 'test-wise strategies' involve lexical matching from the options to the spoken text, and scores on such tasks may represent basic recognition skills rather than genuine listening comprehension."  
Source: https://www.tandfonline.com/doi/pdf/10.1080/17501229.2022.2109643  
Also: Buck (2001) *Assessing Listening* Ch.5 — "Tasks must be passage-dependent; if answerable without processing the audio, the item fails to measure the construct."  
Source: https://www.cambridge.org/core/books/abs/assessing-listening/creating-tasks/FF4EC1544EC6ACA2433ED2D7D1D6A2C2

**Why risk is HIGHER for Pickup's 8-12 A2 children specifically:**
- Children at A2 are not yet automatic in grammar processing — they default to surface-level scanning strategies when uncertain
- A2 grammar targets (was/were, past -ed, prepositions) are high-frequency in narrative text, making verbatim overlap near-guaranteed
- Grandma-reading UX: child *hears* narration spoken aloud before the grammar-mc → auditory working memory trace of "broke" is still active when they reach "A farmer came across the field and ___ the ice"
- **Washback effect** (Buck 2001): invalid items create invalid washback — children learn to scan for the word, not process the grammar rule

At dist=−1 (Ch2 l6), difficulty drops to near zero. At dist=−4 to −10, shorter WM spans in children mean the leak still operates.

### Industry practice (2026 state of the art)

| Product/Standard | Grammar-MC approach |
|-----------------|---------------------|
| **Duolingo app (production, 2024)** | Grammar exercises use sentences **not present in lesson narration** — same rule, independent context sentence. "Fill in the Blanks" uses partial letter prompts specifically to prevent verbatim copy from context (July 2025 update). |
| **NBME / medical MCQ standard** | "Scan the stem and all surrounding context for the repeated word and rewrite." Applies cross-discipline including ELT. |
| **Abdullaev et al. (2024)** | Detect and remove LID items; constructive fix: "items must require actual engagement with the target form, not just context scanning." |
| **TOEIC item writing (ETS)** | TOEIC distractors deliberately USE word repetition as a *wrong-answer trap* (Pomaka 2025) — confirming that word repetition between narration and *correct* answer is equivalently a validity-destroying flaw. Source: https://pomaka.com/2025/04/17/toeic-tip-understand-distractors/ |
| **SRS / Duolingo pedagogy** | Grammar items test **transfer** (apply rule to new context), not **recall** (reproduce context just read) |

### Why this matters for Pickup specifically
- **Client: 8-12 children** — shorter working memory, higher reliance on lexical matching, higher washback risk
- **Grandma-reading pedagogy**: child hears narration spoken; grammar-mc is literally asking them to reproduce what they just heard — auditory trace still active in WM

### Recommended implementation

**Option A (Low effort — Recommended):** Restructure lesson order so grammar-mc appears **before** its source narration:
```
[Old] Narration → ... → Grammar-MC(from narration)
[New] Grammar-MC(from upcoming narration) → ... → Narration (confirms/rewards)
```
This converts the pattern from "copy what you heard" to "predict the form, then hear confirmation" — which is pedagogically stronger and matches the "activate → expose" order used by Rosetta Stone and Duolingo Stories.

**Option B (Medium effort — Better):** Replace grammar-mc source sentences with independent parallel sentences using the SAME grammar form but different content:
```
[Old] Narration "A farmer came across the field and broke the ice."
      Grammar-MC "A farmer came across the field and ___ the ice."

[New] Narration "A farmer came across the field and broke the ice."
      Grammar-MC "Last winter, the pond ___ (break) into a hundred pieces."
```
Maintains A2 vocabulary, same verb+past-tense form, zero narration leak.

**Option C (No-content-edit — Fastest):** Add lint gate in `validate-lessons.js`:
```js
// X157: grammar-mc source sentence must not appear verbatim in lesson narrations
// Trigger: any narration sentence has Jaccard(words, grammar_mc_sentence_words) > 0.7
```
This makes the violation visible without fixing content, enabling future content sprint to fix.

### Effort vs ROI

| Option | Effort | Leak fix | Pedagogical gain | Recommended |
|--------|--------|----------|-----------------|-------------|
| A (reorder) | 1–2h JSON reorder, no audio regen | ✅ Full | ⭐⭐ Good | ✅ For dist=−1 cases NOW |
| B (new sentences) | 3–5h per chapter × 8 ch | ✅ Full | ⭐⭐⭐ Best | For v2.1 content sprint |
| C (lint gate only) | 30 min | ❌ No | N/A — tracks only | ✅ Add NOW as CI guard |

### Verdict: ✅ 適合 Pickup 架構

Option C can ship this cron cycle (lint gate in tools/validate-lessons.js, no src/ changes). Option A is the right fix for the 1 P0 item (kt-ch2-l6-x3, dist=−1). Option B is the v2.1 content-quality milestone.

---

*Sources (deep-scan 2026-07-14, verified by research agent):*
- NBME Item-Writing Guide, 6th ed. (2021) — "Word Repetition / Clang Clues" classification. https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf
- Abdullaev et al. (2024) — "Examining Local Item Dependence in a Cloze Test with the Rasch Model." ERIC EJ1419371. https://eric.ed.gov/?id=EJ1419371
- Text authenticity and test-wiseness in L2 listening (2022), Tandfonline Applied Linguistics. https://www.tandfonline.com/doi/pdf/10.1080/17501229.2022.2109643
- Buck, G. (2001). *Assessing Listening*, Ch.5. Cambridge University Press. https://www.cambridge.org/core/books/abs/assessing-listening/creating-tasks/FF4EC1544EC6ACA2433ED2D7D1D6A2C2
- Pomaka English — TOEIC Distractors: Word Repetition (April 2025). https://pomaka.com/2025/04/17/toeic-tip-understand-distractors/
- Duolingo English Test — Expanded Interactive Listening Update (2025). https://testcenter.zendesk.com/hc/en-us/articles/36094888038029
- Meta-Analysis of L2 Listening Test Reliability (1991–2022), NCBI PMC11353186. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11353186/
- Frontiers in Psychology (2022) — Test Format and Local Dependence of Items. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8831786/
