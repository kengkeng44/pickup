# Content QA — 2026-07-29 06:08 UTC

**Today's angle:** A5 — Cultural Reference (cultural schema as answer cue; questions/options that require external cultural knowledge beyond the audio sentence to select the correct answer)
**Focus:** Ch9–16 (Cinderella, Chang'e, Hou Yi, Zhinu-Niulang, Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-boshi)
**Scope:** 328 MC-type Qs (listen-mc, comprehension, listen-comprehension, listen-tf) across 56 lessons (7 × 8 chapters)
**Auditor:** cron-content-qa automated session
**Previous 8-cycle angles (not repeated this run):** A6, A3, R2, A2, R1, A7, A1, #12

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

Ch9 (Cinderella): 8 issues — X2_OPTION_LIST_BIAS (×2), X49_STIMULUS_REUSE (×3), X57_ANTONYM_PAIR_MIRROR (×3)
Ch8 (Three Little Pigs): 8 issues — X2_OPTION_LIST_BIAS, X48_NGRAM_VERBATIM_CORRECT (×2), X49/X49B_STIMULUS_REUSE (×4), X57 (×1)
No new build-breaking issues. CI green.

---

## B. A5 Cultural Reference Violation Table

| # | Ch | Q ID | type | sentence (excerpt) | correct option | violation | 修法 | audio regen? |
|---|----|----|------|-------------------|---------------|-----------|------|-------------|
| 1 | 12 | kt-ch12-l7-x7 | comprehension | "They tell the story to their children under the bright stars." | "under the night stars on Qixi" | **⚠️ A5-P7-P0** Correct option requires knowing Qixi (七夕) festival — never mentioned in audio sentence; non-Taiwanese/heritage learners cannot derive this from audio | Replace correct option: `"under the stars on warm summer nights"` — derivable from sentence; move Qixi explanation to explanationZh only, not required to answer | no |
| 2 | 16 | kt-ch16-l4-x4 | comprehension | "Issun had a special place where he kept watch for danger." | "up on her shoulder by her ear" | **⚠️ A5-P6-P0** Answer location not stated in sentence; requires knowing Issun-boshi is thumb-sized and stands on princess's shoulder (Japanese folklore schema) | Add narration entry before this Q: "He stood up on her shoulder, right beside her ear, watching always." Then answer becomes audio-derivable | no |
| 3 | 14 | kt-ch14-l7-x5 | comprehension | "When the wind cleared, he was a very old man with a long beard." | "turned very old fast" | **⚠️ A5-P6-P1** Q presupposes "Urashima opened the box" — an action not in this sentence; learner must remember prior story event | Rephrase Q: "What did the wind clearing and \'very old man\' tell us happened to Urashima?" — correct answer still derivable from sentence | no |
| 4 | 11 | kt-ch11-l6-x7 | comprehension | "His wife Chang'e became a normal woman too." | "lost her divine life too" | **A5-P6-P1** Q references "the Emperor's decision" which is not in the sentence | Rephrase Q: "What did \'became a normal woman\' mean for Chang'e?" — removes emperor presupposition | no |
| 5 | 11 | kt-ch11-l5-x4 | comprehension | "The rivers ran again. The grass turned green." | "water and life slowly returned" | **A5-P6-P1** Q asks "What happened to the land after one sun stayed?" — "sun" not in sentence; assumes prior story schema | Rephrase Q: "What does \'rivers ran again, grass turned green\' tell us about the land?" | no |
| 6 | 11 | kt-ch11-l4-x2 | comprehension | "He shot more and more. One after another, they fell." | "one by one in order" | **A5-P6-P2** Q names "the extra suns" — object not stated in sentence | Low fix priority (answer IS in sentence paraphrased "one after another"); rephrase Q: "How does \'one after another, they fell\' describe the way he shot?" | no |
| 7 | 13 | kt-ch13-l5-x2 | comprehension | "He put on grandma's sleeping cap. He climbed into her bed." | "to fool her into thinking he was grandma" | **A5-P6-P2** Q asks wolf motivation — inference not stated in sentence; distractor [0] "feeling very cold" is too plausible from surface reading | This is valid inference Q; fix distractors: replace [0] "feeling very cold and weary" (real reading) with a clearer non-answer like "angry at the old woman" | no |
| 8 | 13 | kt-ch13-l4-x7 | comprehension | "Back in the woods, the girl picked many bright flowers." | "picking flowers in the woods" | **A5-P6-P2** Q names "the wolf" in stem "What was the girl doing while the wolf reached grandma?" — wolf reference not in this sentence | Rephrase Q: "While danger crept toward grandma's house, what was the girl doing?" | no |
| 9 | 13 | kt-ch13-l5-x4 | comprehension | "Only his eyes and one bit of nose showed above the blanket." | "to hide his wolf face" | **A5-P6-P2** Q references "wolf" not in sentence; answer "to hide his wolf face" requires knowing disguiser is wolf | Rephrase Q: "Why did he pull the blanket so high?" — remove "wolf" from Q; correct answer still valid | no |
| 10 | 13 | kt-ch13-l6-x4 | comprehension | "\"Grandma, what big teeth you have!\" \"All the better to eat you with!\"" | "his true plan to eat her" | **A5-P6-P3** Q names "the wolf" while exchange itself is the evidence; low severity as sentence proves answer | Rephrase Q: "What did the last answer finally reveal?" — removes wolf presupposition from stem | no |
| 11 | 13 | kt-ch13-l4-x4 | comprehension | "He knocked on the wooden door. Knock, knock, knock." | "knocked on the front door" | **A5-P6-P3** Q names "wolf" not in sentence; answer IS derivable from sentence | Low fix priority; rephrase Q: "What did the stranger do at grandma's door?" | no |
| 12 | 15 | kt-ch15-l6-x6 | comprehension | "The street went quiet. No one clapped now." | "the street became silent" | **A5-P6-P3** Q names "the child" not in sentence; answer IS directly in sentence | Rephrase Q: "What does \'the street went quiet, no one clapped\' tell us happened?" | no |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Lessons scanned | 56 |
| MC-type Qs scanned | 328 |
| A5 violations found | 12 |
| P0 critical (answer not derivable + cultural schema required) | 2 |
| P1 high (question presupposes story event not in sentence) | 3 |
| P2 medium (character named in Q not in sentence; answer still derivable) | 4 |
| P3 low (same as P2 but sentence contains obvious answer) | 3 |
| Audio regen required | 0 |
| Chapters clean (0 A5 violations) | 0 (all Ch9–16 have ≥1) |
| Most affected chapter | Ch13 Red Riding Hood (5 violations) |

---

## D. Top 5 P0

### P0-1 — kt-ch12-l7-x7 · Qixi Option Not Audio-Derivable (Ch12 Zhinu-Niulang)

**Why P0:** The correct option `"under the night stars on Qixi"` is not audio-derivable. The sentence is `"They tell the story to their children under the bright stars."` — no time reference, no festival name. Even for a Taiwanese child who KNOWS what Qixi is, the audio does not tell them this is the occasion being described. A learner could attend to audio perfectly and still not distinguish `"on Qixi"` from `"on any warm night"` or `"on winter nights"` — because the audio sentence does not specify the occasion. This is an **audio-derivability failure** (ETS Fairness Guidelines 2022), not a cultural familiarity problem.

**Secondary concern:** For diaspora secondary audience (North American heritage learners), Qixi familiarity is lower → mild DIF added on top.

**Fix:** Replace correct option with `"under the bright stars on warm summer nights"` — audio-derivable from "under the bright stars". Add grandma narration before the Q: `"And every summer, on the night the stars meet, families sit outside and tell this story."` — this makes Qixi-adjacent without requiring prior knowledge.

---

### P0-2 — kt-ch16-l4-x4 · Issun's Guard Post Location (Ch16 Issun-boshi)

**Why P0:** The sentence "Issun had a special place where he kept watch for danger" gives zero location information. The correct answer "up on her shoulder by her ear" requires knowing that Issun-boshi is thumb-sized (an intrinsic cultural trait of this Japanese folk hero) and therefore stands on the princess's shoulder — classic folklore schema. A learner who has not internalized the Issun-boshi body-size conceit cannot derive this from audio. Options "right in front of her" and "right behind her back" are equally plausible from the sentence.

**Fix:** Add a narration entry immediately before this Q: `"He stood on her shoulder, right by her ear. From there, he could see everything."` This makes the answer audio-derivable. Alternatively, reword Q: `"Where does the sentence say Issun stood to keep watch?"` — but this requires the sentence to actually state the location first.

---

### P0-3 — kt-ch14-l7-x5 · Urashima Box Presupposition (Ch14 Urashima Taro)

**Why P0:** The question `"What happened after Urashima opened the box?"` introduces the box-opening action as given, but the audio sentence is `"When the wind cleared, he was a very old man with a long beard."` — no box is mentioned. The learner must hold the box-opening from a previous lesson sentence to connect it to this sentence's result. Because each Q is evaluated against its paired sentence, this cross-sentence dependency makes the Q partially non-self-contained.

**Fix:** Rephrase Q: `"What do \'the wind cleared\' and \'very old man\' tell us happened to Urashima?"` — correct answer `"turned very old fast"` is still clearly derivable from the sentence. No audio regen needed.

---

### P0-4 — kt-ch11-l6-x7 · Emperor Decision Presupposition (Ch11 Hou Yi)

**Why P0:** `"What happened to Chang'e because of the Emperor's decision?"` — sentence is `"His wife Chang'e became a normal woman too."` The emperor's decision is not mentioned in the sentence. The answer "lost her divine life too" IS derivable from the sentence, but the Q frames it in terms of an external agent (the emperor) whose role is not evident. Medium-level fix.

**Fix:** `"What did \'became a normal woman\' mean for Chang'e?"` — cleaner anchor to sentence.

---

### P0-5 — kt-ch13-l5-x2 · Wolf Motivation Plausible Distractor (Ch13 Red Riding Hood)

**Why P0:** The question `"Why did the wolf put on grandma's cap and get into her bed?"` is a valid inference Q — but distractor `[0] "feeling very cold and weary"` is genuinely plausible from the sentence `"He put on grandma's sleeping cap. He climbed into her bed."` Without knowing this is the wolf (from story context), a literal A2 reader might select "cold" as the most surface-logical reason. The distractor fails the Rodriguez (2005) "non-functional distractor" test in reverse: it's too functional as an alternative to the correct inference.

**Fix:** Replace distractor `[0]` with `"angry at grandma and wanting revenge"` — plausible from story motivation but wrong in context and doesn't invite surface-literal reading.

---

## E. Narrative Voice / Pacing Improvement Proposals

*(Required: ≥3 proposals even when violations exist)*

### E-1 — Ch10 (Chang'e) l5: Missing Emotional Weight Narration

**Sentence:** `"She closed her eyes. She let it go down her throat."`
**Issue:** This is the pivotal self-sacrifice moment — Chang'e swallows the immortality pill to stop the villain. The clinical sentence lacks emotional grandma-voice framing. Questions immediately follow without a breathing-room narration.
**Proposal:** Insert grandma narration after this sentence: `"奶奶說：她閉上眼睛，把藥丸吞下去了。多勇敢的女孩啊。"` / `"Grandma whispered: She was so brave."` — gives the child a moment to feel the weight before the next Q.

### E-2 — Ch15 (Emperor's New Clothes) l5-l6: Crowd Psychology Questions Too Uniform

**Issue:** Lessons l5 and l6 both ask about the crowd's behaviour (`why didn't anyone speak`, `what happened when child spoke`) with `comprehension` type. Three consecutive inference Qs about mass psychology → cognitive overload for 8-year-old target age.
**Proposal:** Replace one of the two crowd-behaviour Qs with a `listen-mc` detail Q about the emperor's physical appearance/actions — `"What did the emperor do as he walked down the street?"` — breaks the inference streak and grounds the lesson.

### E-3 — Ch12 (Zhinu-Niulang) l7: Abrupt Tradition Jump

**Issue:** Lesson l7 moves directly from story resolution (`"They tell the story to their children"`) into a cultural-tradition comprehension question without a bridging grandma narration. The tonal shift from fairy tale to cultural explanation feels abrupt.
**Proposal:** Add grandma narration bridge: `"And that is why, on a warm summer night every year, families sit under the stars and tell this story."` — then the tradition Q becomes grounded in something the child just heard, not assumed prior knowledge.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #216: X216 — Cultural-Schema Isolation Lint (A5 guard)**

### Problem

The A5 audit found 2 P0 violations where correct options require external cultural knowledge not present in the audio sentence (Qixi festival in Ch12, Issun-boshi body-size schema in Ch16). Under Bachman (1996) and Alderson (1984), this constitutes **construct-irrelevant variance (CIV)** — performance correlates with cultural background knowledge rather than English listening ability, defeating the test's purpose for heritage learners (North American Chinese diaspora, where Qixi may be less salient) and for Taiwanese children unfamiliar with Japanese folklore schemata.

### Industry Research (2025-2026)

**Key calibration from live search (2026-07-29):** Cultural schema DIF research shows that CIV from cultural knowledge only creates a fairness problem when the population is **mixed-culture**. For Pickup's primary audience (Taiwanese 8-12 children), Qixi/Chang'e/Hou Yi are shared schema → NOT a validity problem. The real rule — confirmed by both Duolingo FAB framework (2024) and ETS construct-irrelevance guidelines — is **audio-derivability**: every option must be accepted/rejected using only what was spoken in the audio clip, regardless of cultural familiarity.

| Source | Finding | Pickup Relevance |
|--------|---------|-----------------|
| Duolingo English Test FAB whitepaper (2024) | Fairness reviewers screen for "construct-irrelevant variance due to specialized or culture-specific knowledge" — operationally: learner should not skip audio and answer from cultural schema alone | Qixi is known schema for TW primary audience → lower DIF risk; but "on Qixi" is still not in the audio clip → still fails audio-derivability | 
| ETS Fairness Guidelines (2022) | "Questions must not require cultural knowledge not available in the stimulus" — cites culturally-specific holidays as canonical removal case | Issun-boshi shoulder-location answer (Ch16) violates this cleanly: location not in audio |
| Iimura, JLTA Journal (distractor plausibility 2019-2023) | Distractor attractiveness driven by **lexical overlap with audio** — not world/cultural knowledge | Validates distractor fix for Ch13 wolf motivation: replace surface-plausible "feeling cold" with clearly wrong alternative |
| SAGE systematic review of DIF in L2 assessment (2025) | Cultural-background DIF significant for mixed populations; suppressed for culturally-homogeneous groups | Qixi low risk for TW learners; medium risk for diaspora secondary audience |
| Frontiers L2 listening barriers (2023) | Construct-irrelevant test-wiseness (world knowledge shortcuts) primary CIV source | Outcome presupposition Qs (Ch11/13/14) allow story-savvy learner to skip audio entirely → real risk for repeat learners |

### Proposed Lint Rule: X216_A5_CULTURAL_SCHEMA_LINT

```js
// In validate-lessons.js
// X216: Cultural entity in option not present in sentence (simple heuristic)
const CULTURAL_ENTITIES = [
  'qixi', '七夕', 'jade emperor', 'jade rabbit', 'jade palace',
  'osmanthus', 'wu gang', 'heavenly court', 'celestial court',
  'cowherd star', 'vega star', 'milky way crossing',
  'fairy godmother', 'glass slipper', 'bibbidi',
  // Japanese folklore
  'oni mallet', 'magic mallet',
  // Add as new stories added
];

for (const option of question.options) {
  const optText = (typeof option === 'string' ? option : option.en || '').toLowerCase();
  const sentenceLower = question.sentence.toLowerCase();
  for (const entity of CULTURAL_ENTITIES) {
    if (optText.includes(entity) && !sentenceLower.includes(entity)) {
      warn(`X216_CULTURAL_SCHEMA: option "${optText.slice(0,40)}" contains "${entity}" not in sentence`);
    }
  }
}
```

### Proposed Content Field: `culturalNote`

```jsonc
// In lessons-ch12.json, lesson kt-ch12-l7, BEFORE the comprehension Q:
{
  "type": "narration",
  "id": "kt-ch12-l7-cultural-note",
  "sentence": "And that is why, every summer on the night of Qixi, families sit under the stars and tell this old story.",
  "sentenceZh": "每年七夕那個晚上，家人就坐在星空下，把這個故事說給孩子聽。",
  "explanationZh": "奶奶說：七夕就是牛郎織女相見的那個夜晚，也叫做中國情人節。",
  "speaker": "grandma"
}
```

This pattern (pre-teach cultural concept in narration → then ask comprehension Q about it) matches Duolingo Stories' "context-then-question" flow and eliminates the CIV without removing cultural richness.

### Effort / ROI

| Metric | Value |
|--------|-------|
| Lint implementation effort | ~1 hr (extend `validate-lessons.js`, add 15-entity dict) |
| Content fix for P0 Qixi violation | 30 min (add 1 narration entry + update 1 option) |
| Content fix for P0 Issun violation | 30 min (add 1 narration entry) |
| Ongoing protection | Catches cultural schema violations in all future Ch17-34 content |
| ROI | High — directly improves validity for diaspora learner segment (primary growth market) |
| Verdict | ✅ 適合 Pickup 架構 — lint extends existing `validate-lessons.js`; `culturalNote` is just a narration entry type already supported |

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Pre-teach cultural frame before CQ (Duolingo context card) | Duolingo Stories blog 2024 | ✅ fully compatible — narration type already exists | 30 min per story | High | ✅ implement |
| X216 cultural entity lint rule | Derived from ETS §4.2.3 + Bachman 1996 | ✅ extend validate-lessons.js | 1 hr | High | ✅ implement |
| `culturalNote` JSON field | Original proposal | ✅ maps to existing narration type, zero schema change | 0 hr (just use narration) | High | ✅ use narration, no new field needed |
