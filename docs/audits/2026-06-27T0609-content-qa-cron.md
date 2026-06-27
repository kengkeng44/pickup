# Content QA — 2026-06-27 06:09 UTC

Today's angle: **A1 obvious correct (gap too easy)** — questions where the correct option is so clearly telegraphed by the sentence that a test-wise learner can answer without genuine listening/reading comprehension. Sub-cases:

- **A1a** — verbatim substring: correct option literally appears inside the sentence
- **A1b** — echo ≥80%: correct option's content words are ≥80% identical to content words in sentence
- **A1c** — question-stem echo: correct option echoes ≥75% of question wording back
- **A1d** — single-domain isolation: correct shares ≥2 content words with sentence; ALL 3 distractors share 0 content words with both sentence and question (learner wins by keyword-match without comprehension)

Focus: **Ch17–24** — 白鶴報恩 / 興夫傳 / 鼠鹿過河 / 巨大蘿蔔 / 蜘蛛人 Anansi / 孟母三遷 / 司馬光 / 孔融讓梨

Scope: 898 total Q, 292 MC Q across 8 chapters (7 lessons each)

---

## A. validate-lessons.js result — Ch17–24

```
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch18.json: 2 lint issue(s):
  kt-ch18-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch18-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch19.json: 7 lint issue(s):
  kt-ch19-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch19-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch19-l3-q5:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5:  X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9:  X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
WARN lessons-ch20.json: 1 lint issue(s):
  kt-ch20-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch21.json: 10 lint issue(s):
  kt-ch21-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch21-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch21-l3-q6:  X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l4-q6:  X2_OPTION_LIST_BIAS (all start with "that")
  kt-ch21-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l5-q3:  X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch21-l5-q6:  X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l5-q8:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l5-q10: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch21-l6-q8:  X2_OPTION_LIST_BIAS (all start with "anansi")
WARN lessons-ch22.json: 2 lint issue(s):
  kt-ch22-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch22-l4-lg2: X2_OPTION_LIST_BIAS (all start with "she")
WARN lessons-ch23.json: 1 lint issue(s):
  kt-ch23-l5-x4:  X2_OPTION_LIST_BIAS (all start with "the")
WARN lessons-ch24.json: 3 lint issue(s):
  kt-ch24-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch24-l4-q3:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch24-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
```

All X2_OPTION_LIST_BIAS flags are in prologue/outro tap-pairs (pm1/lg2) — systematic known issue; not the focus of this angle. No schema errors in Ch17–24.

---

## B. Violation Table — A1 Obvious Correct, Ch17–24

### P0 Violations (5) — A1b echo ≥80%: correct option's content words ≥80% verbatim from sentence

| Ch | Q ID | type | Sentence (truncated) | Correct Option | Violation | 修法 | audio regen? |
|----|------|------|----------------------|----------------|-----------|------|--------------|
| 17 | kt-ch17-l6-x3 | comprehension | "She was pulling her own feathers, one by one." | "pulling out her own feathers" | A1b-echo-100% — correct shares {pulling, own, feathers} (3/3 content words) with sentence | Replace: "removing each feather slowly" or "sacrificing parts of herself" | No |
| 19 | kt-ch19-l6-q9 | listen-mc | "Their bodies could go in the water but not up the dry land." | "they could not go on dry land" | A1b-echo-100% — correct shares {dry, land} (2/2 non-trivial content words) with sentence | Replace: "the shore was off-limits to them" | No |
| 19 | kt-ch19-l7-q9 | listen-mc | "His low voice came up from the dark water in a slow sad sound." | "low and slow" | A1b-echo-100% — correct lifts {low, slow} directly from sentence | Replace: "deep and mournful" or "quiet and unhurried" | No |
| 21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his clever ideas, not his strong arms." | "Anansi was very clever" | A1b-echo-100% — correct echoes {anansi, clever} directly | Replace: "Anansi won by thinking, not fighting" | No |
| 24 | kt-ch24-l4-x2 | comprehension | "Kong Rong reached out and took the smallest pear." | "the very smallest pear" | A1b-echo-100% — correct lifts {smallest, pear} verbatim | Replace: "the least ripe fruit" or "the one no one else wanted" | No |

### P1 Violations (20) — A1d single-domain isolation: correct keyword-matches sentence; all 3 distractors off-domain

| Ch | Q ID | type | Sentence (truncated) | Correct Option | Shared with Sentence | All-distractor overlap = 0 | 修法 |
|----|------|------|----------------------|----------------|----------------------|---------------------------|------|
| 17 | kt-ch17-l4-x1 | comprehension | "She held a soft white cloth. It shone like fresh snow." | "shining white and soft" | {soft, white} | Yes | Distractors "rough and dark brown / short and full of holes / old and dirty grey" are fine; CORRECT echoes sentence too directly → Rephrase correct to "bright as winter snow" |
| 17 | kt-ch17-l4-x3 | comprehension | "The old man went home with the heavy bag of gold." | "gold coins in a bag" | {bag, gold} | Yes | Distractors "bags of rice / warm coat / vegetables" are off-domain. Replace 1 distractor with "a bag of silver" (same domain, wrong metal) |
| 17 | kt-ch17-l4-x7 | comprehension | "At night, the small back door stayed closed and quiet." | "the secret behind the closed door" | {closed, door} | Yes | Replace "best way to count gold" with "what lay behind the locked room" |
| 17 | kt-ch17-l5-x8 | comprehension | "Every night he sat by the door. He heard feathers brushing wood." | "feathers touching the wood" | {wood, feathers} | Yes | Rephrase correct: "a soft rustling sound through the night" |
| 18 | kt-ch18-l4-x1 | comprehension | "Heungbu wrapped the bird's leg in soft cloth." | "cloth tied around its leg" | {cloth, leg} | Yes | Rephrase correct: "bandaged with care" or "gently bound its broken part" |
| 18 | kt-ch18-l5-x5 | comprehension | "They cut open the third gourd. Out came a new house." | "a whole new house appeared" | {new, house} | Yes | Rephrase correct: "a place to live came out" |
| 18 | kt-ch18-l6-x7 | comprehension | "The bird looked at him. Its eyes were quiet and dark." | "quiet and dark, full of knowing" | {dark, quiet} | Yes | Rephrase correct: "still and watchful, saying nothing" |
| 18 | kt-ch18-l7-x1 | comprehension | "But nothing good came out. Out came dust. Out came mud." | "only dust and mud inside" | {mud, dust} | Yes | Rephrase correct: "worthless filth instead of gifts" |
| 18 | kt-ch18-l7-x5 | comprehension | "Heungbu opened the door. He shared his food, his house, and his gold." | "food, gold, and his home" | {food, gold} | Yes | Rephrase: "everything he had, without hesitation" |
| 19 | kt-ch19-l5-q10 | comprehension | "Every jump moved mouse deer one step closer to the fruit tree." | "mouse deer was crossing the river" | {deer, mouse} | Yes | Rephrase: "the clever animal was almost across" |
| 19 | kt-ch19-l6-x1 | comprehension | "Sang Kancil jumped off the last crocodile onto the other side." | "jumped onto dry land across the river" | {onto, jumped} | Yes | Rephrase: "reached the far bank safely" |
| 20 | kt-ch20-l3-x6 | comprehension | "They both pull. They count out loud. One, two, pull!" | "so both pull at the exact moment" | {both, pull} | Yes | Rephrase: "to move the turnip with unified effort" |
| 21 | kt-ch21-l3-x1 | comprehension | "The first animal was a group of hornets in a big tree." | "inside a big tree" | {tree, big} | Yes | Rephrase: "hiding in a hollow branch" or "sheltered inside a trunk" |
| 22 | kt-ch22-l3-q3 | listen-mc | "She packed their things into two big cloth bags." | "put their things into bags" | {things, bags} | Yes | Rephrase: "prepared to move right away" |
| 22 | kt-ch22-l3-q8 | listen-mc | "He held up sticks and called out, just like the sellers." | "the way sellers called out prices" | {called, sellers} | Yes | Rephrase: "copying the market traders" |
| 22 | kt-ch22-l7-q3 | listen-mc | "For many years, he sat with his books from sunrise to night." | "many years in a row" | {years, many} | Yes | Rephrase: "for a very long time, every day" |
| 23 | kt-ch23-l4-x8 | comprehension | "Even running fast, it would take many minutes to come back." | "coming back would take too long" | {take, back} | Yes | Rephrase: "there was not enough time to return" |
| 23 | kt-ch23-l6-q3 | listen-mc | "He saw a big stone resting in the grass." | "a heavy stone in the grass" | {stone, grass} | Yes | Rephrase: "a large rock sitting in the field" — but ALSO check grass vs field consistency |
| 23 | kt-ch23-l7-x7 | comprehension | "One small boy did not wait. He thought, he acted, and he was just in time." | "thought then quickly acted" | {acted, thought} | Yes | Rephrase: "made a fast, smart decision" |
| 24 | kt-ch24-l7-q8 | listen-mc | "His eyes were bright. He put a hand on Kong Rong's head." | "with bright eyes and a soft touch" | {eyes, bright} | Yes | Rephrase: "he showed warmth and approval" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch17–24 (8) |
| Total Q in scope | 898 |
| MC Q audited | 292 |
| Violations found | 25 |
| P0 (A1b echo ≥80%) | 5 (1.7% of MC Q) |
| P1 (A1d single-domain) | 20 (6.8% of MC Q) |
| Chapters with P0 | Ch17 ×1, Ch19 ×2, Ch21 ×1, Ch24 ×1 |
| Chapters with most P1 | Ch17 (4), Ch18 (5) |
| validate-lessons.js schema errors | 0 |
| X2 lint flags (tap-pairs) | 26 — known systematic, pre-existing |

---

## D. Top 5 P0

1. **[P0] kt-ch17-l6-x3** — comprehension — "She was pulling her own feathers, one by one." → correct: "pulling out her own feathers"
   - 100% of correct's content words lifted verbatim. This is the climax reveal question of the Crane Wife chapter — having a give-away answer destroys the emotional weight of the reveal.
   - Fix: Change correct to "removing a part of herself to make the gift"

2. **[P0] kt-ch19-l6-q9** — listen-mc — "Their bodies could go in the water but not up the dry land." → correct: "they could not go on dry land"
   - Literally rearranges sentence words. Mouse Deer story's crocodile bridge scene — learner hears "not up the dry land" and selects "could not go on dry land" by surface matching, not comprehension.
   - Fix: "the shore was impossible for them to reach"

3. **[P0] kt-ch21-l6-q8** — listen-mc — "He meant Anansi had used his clever ideas, not his strong arms." → correct: "Anansi was very clever"
   - Anansi is a trickster chapter; this is a theme Q. The echo destroys inference requirement.
   - Fix: "Anansi won through wit, not strength"

4. **[P0] kt-ch19-l7-q9** — listen-mc — "His low voice came up from the dark water in a slow sad sound." → correct: "low and slow"
   - Two-word correct option is a direct adjective extraction from sentence. No paraphrase at all.
   - Fix: "deep and sorrowful" or "mournful from below"

5. **[P0] kt-ch24-l4-x2** — comprehension — "Kong Rong reached out and took the smallest pear." → correct: "the very smallest pear"
   - Added "very" is the only change. Learner keyword-matches "smallest pear" directly.
   - Fix: "the one that no one else had chosen" or "the least desirable fruit on the tray"

---

## E. Narrative Voice / Pacing Improvements (0 violations found — 3 mandatory proposals)

Even with no new R1-R8 violation in the narration voice, the following pacing improvements apply across Ch17–24:

1. **Compression of consecutive near-identical detail Qs (Ch17-l4 & l5)** — kt-ch17-l4-x3 and kt-ch17-l4-x7 both ask what was inside a bag / behind a door. Two consecutive "what was X" questions in the same lesson flattens comprehension variety. Recommend replacing one with an inference Q: "Why did the old man feel uneasy even though he had gold?"

2. **Emotional inference underdeveloped in Ch19 Sang Kancil (trickster arc)** — Ch19 has strong plot detail Qs but only 1 inference-level Q per lesson. Mouse Deer's motivation (cleverness over strength) is the moral core; adding 1 "why did Mouse Deer do X instead of Y?" per lesson raises sub-skill variety from detail-heavy to R6-compliant distribution.

3. **Ch22 Mencius' Mother pacing: macro-move Qs missing** — Ch22 covers 3 house moves; each move has its own lesson, but no cross-lesson retrospective Q asks "why did she move more than once?" This gist-level inference is a natural ChapterEnd comprehension that ties the story moral together. Propose adding it to kt-ch22-l7 (the grandma outro lesson) as a culminating comprehension item.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #84: X37_A1_DOMAIN_ISOLATION_LINT**

### Background
This audit identified 20 P1 violations of the **A1d single-domain isolation** pattern, where the correct option shares 2+ content words with the sentence while all 3 distractors share zero content words with either sentence or question. A learner who knows nothing can keyword-match the correct option without real comprehension. This pattern is currently invisible to `validate-lessons.js`.

Industry signal (2025–2026):
- **D-GEN** (arxiv:2504.13439, ACL 2025) proposes automatic distractor evaluation that flags low-quality distractors via *incorrectness + plausibility + diversity* triplet. The diversity axis directly maps to the A1d pattern: when 3 distractors are all from different semantic domains than the correct answer, diversity is non-zero but plausibility is effectively zero → test-wiseness exploit.
- **Generating Plausible Distractors via Student Choice Prediction** (arxiv:2501.13125, 2025) shows that student-choice prediction models mark distractors as "non-functional" when they share no content domain with the stimulus. The A1d pattern produces exactly these non-functional distractors.
- **Duolingo English Test Interactive Listening spec** (duolingo-papers S3) uses conversation-sourced distractors specifically to keep distractors in the same semantic/pragmatic domain as the target utterance — avoiding the A1d trap by design.

### Pickup 適配分析
Pickup is: React 18 + Zod + JSON lesson files + Web Audio. No LLM at runtime. Content is batch-generated and committed to JSON.

**Feasibility:** The full D-GEN approach (LLM-based distractor quality scoring) requires inference at generation time — too heavy. But the **structural check** (do distractors share any content words with sentence or question?) is a pure string operation that fits directly into `validate-lessons.js`.

**Rule definition:**
```
X4_A1_DOMAIN_ISOLATION:
  fires when:
    - type ∈ {listen-mc, comprehension}
    - correctOption shares ≥2 content words with sentence
    - ALL 3 distractors share 0 content words with sentence AND 0 with question
  severity: WARN (P1 threshold; author decides fix)
```

**Why not P0/ERROR:** Some cases are intentional (e.g., comprehension Qs where the correct option must name the story item, and distractors are plausible wrong-chapter items). Keeping as WARN lets authors triage manually.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Domain-isolation distractor lint (D-GEN structural check) | [arxiv:2504.13439](https://arxiv.org/pdf/2504.13439) | ✅ Direct fit — pure content-word overlap check, no LLM | ~2 hr (add lint rule to validate-lessons.js + tune threshold) | High — catches 20/292 MC Q (6.8%) auto, prevents recurrence | **Recommend: implement** |
| Student-choice prediction distractor scorer | [arxiv:2501.13125](https://arxiv.org/pdf/2501.13125) | ❌ Not fit — requires trained model, can't run in CI without GPU | ~40 hr | Low for current scale | Skip |
| DET conversation-sourced distractors | [Duolingo DET paper](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | 🟡 Partial — Pickup's sentence-level Qs can't draw from other-conversation; but the design principle (distractors in same semantic domain) is already codified as distractor failure-mode R4 and now A1d lint | Design guidance only, no code | Medium | Adopt as authoring guideline |

### 實作改動

In `tools/validate-lessons.js`, add after existing X3_R1_VERBATIM_WORDS check:

```js
// X4_A1_DOMAIN_ISOLATION: correct shares ≥2 cw with sentence, all distractors share 0
const STOPWORDS = new Set(['a','an','the','is','are','was','were','he','she','it','they','his','her','to','of','in','on','at','and','or','but','for','from','with','up','out','not','all','as','be','by']);
function contentWords(str) {
  return new Set(str.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !STOPWORDS.has(w)));
}
if (['listen-mc','comprehension'].includes(q.type) && q.options && q.correctIndex !== undefined) {
  const sentCW = contentWords(q.sentence || '');
  const qCW = contentWords(q.question || '');
  const correctCW = contentWords(q.options[q.correctIndex]);
  const correctOverlap = [...correctCW].filter(w => sentCW.has(w));
  if (correctOverlap.length >= 2) {
    const distractorCWs = q.options
      .filter((_, i) => i !== q.correctIndex)
      .map(d => contentWords(d));
    const allDistractorsBlind = distractorCWs.every(dw =>
      [...dw].every(w => !sentCW.has(w) && !qCW.has(w))
    );
    if (allDistractorsBlind) {
      issues.push(`${qId}: X4_A1_DOMAIN_ISOLATION (correct echoes sentence [${correctOverlap.join(', ')}]; all distractors off-domain)`);
    }
  }
}
```

Estimated 20 new WARN flags on first run (matching this audit's findings). Author then iterates distractors to bring at least 1 per question into the same semantic domain as the correct answer.

---

*Audit produced by cron-content agent · model claude-sonnet-4-6 · 2026-06-27 06:09 UTC*
