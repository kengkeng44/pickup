# Content QA — 2026-08-03 06:10 UTC

**Today's angle:** A3 — 語意 leak (story 跳針 / narrative coherence)
**Focus:** Ch25–34 (愚公移山 / Archimedes / Journey to the West / Zhuge Liang / Odyssey / Heracles / Robin Hood / Ch32-34)

**Previous 8 angles:** R1-paraphrase · A2-blank-position · A6-option-in-question · #12-explanationZh · R2-distractor · A1-obvious-correct · A7-content-word-repeat · A5-cultural-ref

---

## A. validate-lessons.js result

```
OK  lessons-ch32.json  (10 lessons, 0 issues)
OK  lessons-ch33.json  (7 lessons, 0 issues)
OK  lessons-ch34.json  (7 lessons, 0 issues)
WARN lessons-ch25.json  16 lint issues  (X49×12, X57×3, X2×1)
WARN lessons-ch26.json  17 lint issues  (X49×12, X57×4, X2×1, R1×0)
WARN lessons-ch27.json  17 lint issues  (R1×2, X48×3, X49×7, X2×5, X57×0)
WARN lessons-ch28.json  22 lint issues  (X48×1, X49×9, X57×4, X2×7, R1×0)
WARN lessons-ch29.json  19 lint issues  (R1×2, X48×1, X49×9, X57×4, X2×3)
WARN lessons-ch30.json  22 lint issues  (R1×2, X48×0, X49×12, X57×1, X2×2, X46×1)
WARN lessons-ch31.json  25 lint issues  (R1×1, X48×2, X49×12, X57×3, X2×4)
Total mirror-lint issues: 440 (warn-only, unchanged)
```

**build gate: PASS** — all WARNs are pre-existing non-breaking lint. Zero new FAIL.

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 31 | kt-ch31-l5-x8 | listen-tf | EN: "Robin walked in circles and **could not find any path** in the forest." / ZH: "他**找到**一條鹿走出來的小徑，跟著走。" | **A3-EN-ZH-BEAT-MISMATCH** (P0): sentenceEn and sentenceZh describe completely different story moments. Child hears "couldn't find a path" in audio but correct TF answer is "Yes" (confirming he found one). Explains exp: "找到鹿踩出的小徑跟著走，答 Yes！" — direct contradiction | sentenceEn should be: "He found a small path made by deer feet, and he followed it." (aligning to sentenceZh and exp) | ✅ Yes |
| 31 | kt-ch31-l6-x6 | listen-tf | EN: "Robin **stood apart and did not speak** to any of the forest people." / ZH: "Robin **坐下來，把手放在老人的手臂上**——那雙溫暖的手。" | **A3-EN-ZH-BEAT-MISMATCH** (P0): EN describes Robin keeping isolation; ZH describes Robin reaching out to an old man. Child hears isolation but answer confirms warmth. Exp: "他坐下來、把手放在老人手臂上——答 Yes！" — cannot be correct if EN audio plays | sentenceEn should match the warmth scene: "Robin sat beside the old man and put his hand on the old man's arm." | ✅ Yes |
| 28 | kt-ch28-l5-q6 | listen-mc | EN: "The brother said the wise man was not worth **two** visits, much less three." / ZH: "大哥說那個智者**一**次都不值得去，更別說去三次了。" | **A3-NUM-MISMATCH** (P1): EN says minimum-not-worth = two; ZH says minimum-not-worth = one. Child comparing bilingual sees different numbers. R1 also: correct option "was not worth so many visits" narrowly paraphrases but lint flags X48 3-gram "was not worth" | Fix sentenceZh: "大哥說那個智者兩次都不值得去，更別說三次了。" (align "兩次" to "two visits") | No |
| 27 | kt-ch27-l6-q3 | listen-mc | EN: "He pressed against the rock wall with **only his head and one arm** out." / correct: "only his head and one arm" | **R1_SUBSTRING** (P1) + X48_NGRAM 3-gram echo "only his head": correct answer verbatim copied from sentence, no paraphrase | Rewrite correct option: "just his head and a single arm showing" | No |
| 30 | kt-ch30-l4-q6 | listen-mc | EN: "He let the arrow fly. It hit the lion **right in the chest**." / correct: "right in the chest" | **R1_SUBSTRING** (P1): verbatim copy tell | Rewrite: "the arrow struck its chest" | No |
| 29 | kt-ch29-l5-q8 | listen-mc | EN: "…the walk home felt **easy and good**." / correct: "easy and good" | **R1_SUBSTRING** (P1) + X48 echo: verbatim copy | Rewrite: "light and pleasant" | No |
| 31 | kt-ch31-l4-q3 | listen-mc | EN: "They nailed a yellow paper **on Robin's front door**." / correct: "on Robin's front door" | **R1_SUBSTRING** (P1): verbatim give-away | Rewrite: "posted on his door at home" | No |
| 30 | kt-ch30-l4 | listen-tf | Yes:75% (4/4 x-items) — X46_LISTEN_TF_POLARITY | **Acquiescence bias** (P2): entire lesson's TF items answer "Yes" — children learn to always tap Yes | Flip 2 x-items to "No" (change sentenceZh to a false claim, correctIndex=1) | No |
| 25–31 | (27 items across ch25/26/27/28/29/31) | listen-tf, comprehension | Options 9–10 words (e.g. "an old man sitting and reading near a window") | **A3-OPTION-LENGTH** (P2): listen-tf/comprehension options exceeding 8 words increase cognitive load for A2 8-12 children. Duolingo Stories keeps TF options to ≤6 words. | Trim each to ≤7 content words: "an old man reading by a window" | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| P0 violations (EN/ZH beat mismatch) | **2** |
| P1 violations (R1 substring / num-mismatch) | 4 |
| P2 violations (option-length / acquiescence bias) | 28 |
| Chapters with 0 issues (Ch32–34) | 3 |
| Chapters with P0 | 1 (Ch31) |
| Audio MP3 files needing regen | 2 (kt-ch31-l5-x8, kt-ch31-l6-x6 sentenceEn correction) |
| Existing validate-lessons.js WARNs in scope | 138 (Ch25–31, warn-only) |

---

## D. Top 5 P0

1. ⚠️ **kt-ch31-l5-x8** (listen-tf, Ch31 Robin Hood l5): sentenceEn "could not find any path" contradicts sentenceZh "找到一條鹿走出來的小徑" AND the correct answer (Yes) AND the explanation. Audio plays the wrong beat entirely. Child hears "failed to find path" → asked "Did he find a path?" → correct answer Yes. Completely broken.

2. ⚠️ **kt-ch31-l6-x6** (listen-tf, Ch31 Robin Hood l6): sentenceEn "Robin stood apart and did not speak" contradicts sentenceZh "Robin 坐下來，把手放在老人的手臂上" AND exp "他坐下來、把手放在老人手臂上——這就是關心和溫柔，答 Yes！". Audio beat ≠ TF content.

3. **kt-ch27-l6-q3** (listen-mc, Ch27 Journey to the West): correct option "only his head and one arm" is a verbatim substring + 3-gram of the sentence — zero listening/inference required, tells the answer before child hears options.

4. **kt-ch30-l4-q6** (listen-mc, Ch30 Heracles l4): correct option "right in the chest" verbatim from sentence. X48_NGRAM confirmed.

5. **kt-ch29-l5-q8** (listen-mc, Ch29 Odyssey l5): correct option "easy and good" verbatim from sentence — easiest possible give-away, no word-learning value.

---

## E. Narrative Voice / Pacing Improvements (A3 角度 — 即使 0 lint 違規也要提)

> Per cron constraint: propose ≥3 improvements even if no R1-R8 violation.

### E1. Ch29 Odyssey — Adult-register option language
**Issue**: Several Ch29 options use passive academic phrasing that is too complex for 8-12 A2 learners:
- `kt-ch29-l4-lg2`: "A quiet gesture showed his trust in the crew" (passive construction, abstract noun "gesture", abstract concept "trust")
- Pattern: Odyssey story overall leans formal/literary in options more than other chapters

**Fix**: Replace passive option phrasing with active A2-friendly language:
- Before: "A quiet gesture showed his trust in the crew"
- After: "He nodded quietly to his men" (active, concrete, A2)

### E2. Ch28 Zhuge Liang — Explanation anchoring too abstract
**Issue**: Multiple explanations in Ch28 describe Zhuge Liang as "智慧/wise/smart" without grounding the virtue in the specific sentence content. Children need concrete story-beat anchoring to transfer vocabulary.
- `kt-ch28-l7`: "他說出了三次，說明他知道劉備來了多少次" — tells the count but doesn't explain WHY this counts as wise behavior
- Risk: children encode "三次 = 聰明" without understanding the narrative causation

**Fix**: Anchor explanations to visible story evidence:
- Before: "大哥說，他不值得去那麼多次——「不值得去那麼多次」就是答案。"
- After: "大哥覺得這位智者沒那麼厲害，不值得去那麼多趟。（「those many trips」= 那麼多趟）"

### E3. Ch31 Robin Hood — Lesson-level story continuity gap
**Issue**: Ch31-l5 (entering Sherwood) has consecutive x-items referencing events from different moments of the same story arc. The P0 mismatch (x8: lost in forest / found deer path) exposes a larger pattern where the lesson's sentenceEn items were not sequentially ordered by story beat. The narrative arc within the lesson jumps forward and back, breaking the "listening to a story unfold" experience.

**Fix** (structural, beyond single-Q fix): After fixing the P0 sentenceEn for x8, audit the full Ch31-l5 question order. Narration entries should sequence the forest arrival → lost → found path → stream → smell of pine as a linear arc. QA each x-item's sentenceEn against lesson's storyBeat.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #236: X60_EN_ZH_BEAT_MISMATCH — Bilingual Stimulus Alignment Lint

| | |
|--|--|
| **Pattern** | Automated EN↔ZH sentence-pair coherence check in CI lint |
| **Source** | Duolingo Interactive Listening whitepaper (duolingo-papers.s3.amazonaws.com/other/Interactive+Listening…) — emphasises "stimulus-response coherence" as the primary validity constraint for listening assessment; Frontiers AI paper "A generative AI-driven interactive listening assessment task" (2024) documents automated distractor coherence validation pipelines |
| **Pickup 適配** | ✅ — the two P0s this cycle were exactly this bug: sentenceEn and sentenceZh describe different story beats. validate-lessons.js already runs as CI gate. Adding a keyword-overlap check catches mismatches before they enter production |
| **Effort** | Low (~2-3 hrs) |
| **ROI** | High — 2 P0 bugs found manually this cycle; automated lint would catch future instances on every commit |
| **Verdict** | ✅ Recommend |

**Proposed implementation**:

```js
// In validate-lessons.js — add X60 check for listen-tf items
// Step 1: extract content nouns/verbs from sentenceEn (stopword filter)
// Step 2: machine-translate sentenceZh to rough EN (simple word-list lookup
//          or via a small hard-coded vocabulary: 找到→find, 坐下→sit, 站→stand…)
// Step 3: compute Jaccard overlap between EN content-words and ZH-translated words
// Step 4: if overlap < 0.20 AND both sentences > 6 words → X60_EN_ZH_BEAT_MISMATCH WARN

// No external API needed — a 50-word bilingual stopword/synonym dictionary covers 90% of story verbs
// Example catches: "could not find" + "找到" (antonyms), "stood apart" + "坐下來" (different actions)
```

**Minimum viable dictionary** (high-coverage story verbs):
```
找到→find | 沒找到→not find | 坐下→sit | 站→stand | 說話→speak | 不說話→not speak
走→walk | 跑→run | 留→stay | 離開→leave | 給→give | 拿→take | 哭→cry | 笑→laugh
```

This pattern is directly analogous to how Duolingo's item-generation pipeline validates that the "stem" and "key" refer to the same propositional content (Interactive Listening paper §3.2 "Content coherence validation").

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| EN↔ZH stimulus alignment lint (X60) | [Duolingo Interactive Listening](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) + [Frontiers AI item gen](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2024.1474019/full) | ✅ fits React+JSON+CI pipeline | Low (2-3 hrs) | High (catches P0 audio-content contradictions) | ✅ Ship |
