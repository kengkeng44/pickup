# Content QA — 2026-07-17 06:08 UTC

**Today's angle:** A1 — Obvious Correct (gap too easy): length-tell + keyword-echo + emoji verbatim
**Focus:** Ch17–24 (Crane Gratitude / Swallow Brothers / Mouse Deer / Giant Turnip / Anansi / Mencius Mother / Ali Baba / Kong Rong)
**Chapters scanned:** Ch17–Ch24, 536 scored entries (excl. narration + listen-tf)

> **Angle choice rationale:** 8-cycle July 15–16 rotation covered A4, A6, #10, #11, A5, A7, #12, R2. Remaining fresh angles: R1, A1, A2, A3. A1 (obvious correct) not applied to Ch17–24 in any prior recorded cycle. This is the highest-ROI gap: these chapters contain the densest comprehension + picture-mc + emoji-pick stock (536 scored entries) where A1 bias is most testable.

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s)
WARN lessons-ch18.json: 13 lint issue(s)
WARN lessons-ch19.json: 18 lint issue(s)
WARN lessons-ch20.json: 12 lint issue(s)
WARN lessons-ch21.json: 22 lint issue(s)
WARN lessons-ch22.json: 8 lint issue(s)
WARN lessons-ch23.json: 14 lint issue(s)
WARN lessons-ch24.json: 15 lint issue(s)
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT not set)
```

No new schema-break errors. 440 cumulative mirror-lint warns unchanged.

---

## B. Violation Table

**Total violations: 146** across 135 unique questions

| Angle | Count | Severity |
|-------|-------|----------|
| A1-ECHO-ONLY | 76 | P1 |
| A1-LEN-LONG | 41 | P1 |
| A1-EMOJI-VERBATIM | 23 | P2 (contextual — see note) |
| A1-LEN-SHORT | 6 | P1 |
| **Double (ECHO+LEN-LONG same Q)** | **10** | **P0** |

### Per-chapter breakdown

| Ch | Story | Scored Q | Violating Q | Rate | Breakdown |
|----|-------|---------|-------------|------|-----------|
| 17 | Crane Gratitude | 62 | 23 | 37% | ECHO×16, LEN-LONG×5, EP-VERB×3 |
| 18 | Swallow Brothers | 62 | 14 | 22% | ECHO×9, LEN-LONG×4, EP-VERB×2 |
| 19 | Mouse Deer | 67 | 22 | 32% | LEN-LONG×9, ECHO×9, LEN-SHORT×3, EP-VERB×3 |
| 20 | Giant Turnip | 67 | 13 | 19% | ECHO×5, LEN-LONG×4, LEN-SHORT×3, EP-VERB×3 |
| 21 | Anansi | 67 | 19 | 28% | ECHO×12, LEN-LONG×5, EP-VERB×3 |
| 22 | Mencius Mother | 67 | 19 | 28% | ECHO×11, LEN-LONG×7, EP-VERB×3 |
| 23 | Ali Baba | 72 | 11 | 15% | ECHO×6, LEN-LONG×3, EP-VERB×3 |
| 24 | Kong Rong | 72 | 14 | 19% | ECHO×8, LEN-LONG×4, EP-VERB×3 |

> **Ch17 highest rate (37%)** — Crane Gratitude has the most stimulus-sentence reuse across comprehension questions, and picture-mc descriptions closely mirror the stimulus wording.

### P0 Double Violations (ECHO-ONLY + LEN-LONG on same question)

| Ch | Q ID | Type | Stem (truncated) | Correct | Note |
|----|------|------|-----------------|---------|------|
| 17 | kt-ch17-l2-pm1 | picture-mc | The young woman sat at the loom to weave cloth all night. | "a woman at a wooden loom by candlelight" | echoes "woman"+"loom"; longest by +4ch |
| 18 | kt-ch18-l4-x1 | comprehension | Heungbu wrapped the bird's leg in soft cloth. | "cloth tied around its leg" | echoes "cloth"; shortest by −5ch wait — also longest? LEN-LONG confirmed |
| 19 | kt-ch19-l6-x1 | comprehension | Sang Kancil jumped off the last crocodile onto the other side | "jumped onto dry land across the river" | echoes "jumped"; longest opt |
| 19 | kt-ch19-l7-q10 | comprehension | The crocodiles learned to ask "is this true?" before saying | "check if a story is true" | echoes "true"; longest opt |
| 20 | kt-ch20-l6-q5 | listen-mc | The cat holds the dog's tail gently between her front paws. | "holding it with her front feet" | echoes "front"; longest opt |
| 21 | kt-ch21-l3-x8 | comprehension | The hornets thought a sudden rain had come too soon. | "turning their fear of rain against them" | echoes "rain"; longest by +9ch |
| 22 | kt-ch22-l3-q8 | listen-mc | He held up sticks and called out, just like the sellers. | "the way sellers called out prices" | echoes "sellers"+"called"; longest opt |
| 22 | kt-ch22-l7-q8 | listen-mc | What you see every day shapes who you become. | "your place around you shapes you" | echoes "shapes"; longest by +7ch |
| 23 | kt-ch23-l1-pm1 | picture-mc | The children played in the garden. | "children running in an open garden" | echoes "children"+"garden"; longest opt |
| 24 | kt-ch24-l7-q8 | listen-mc | His eyes were bright. He put a hand on Kong Rong's head. | "with bright eyes and a soft touch" | echoes "bright"; longest by +7ch |

### Selected P1: A1-LEN-LONG (worst margin)

| Ch | Q ID | Type | Margin | Correct (len) | Second longest |
|----|------|------|--------|---------------|---------------|
| 17 | kt-ch17-l1-pm1 | picture-mc | +10ch | "an elderly man releasing an injured crane" (41) | 31 |
| 19 | kt-ch19-l4-q10 | comprehension | +10ch | "everyone stayed silent to avoid embarrassment" (45) | 35 |
| 20 | kt-ch20-l5-x4 | comprehension | +10ch | "Grandpa, Grandma, the girl, the dog" (35) | 25 |
| 21 | kt-ch21-l4-x4 | comprehension | +9ch | "getting the python to prove his length" (38) | 29 |
| 19 | kt-ch19-l2-pm1 | picture-mc | +8ch | "a small deer standing at a wide river it cannot cross" (53) | 45 |
| 21 | kt-ch21-l2-pm1 | picture-mc | +8ch | "a powerful figure sitting high above the clouds" (47) | 39 |
| 17 | kt-ch17-l7-x7 | comprehension | +7ch | "because the old man had seen who she really was" (47) | 40 |
| 22 | kt-ch22-l7-q6 | listen-mc | +7ch | "gave up much for his learning" (29) | 22 |
| 22 | kt-ch22-l7-q8 | listen-mc | +7ch | "your place around you shapes you" (32) | 25 |

### Selected P1: A1-ECHO-ONLY (keyword spotting shortcut)

| Ch | Q ID | Type | Stem keyword | Correct echoes | Distractors (all off-topic) |
|----|------|------|-------------|----------------|----------------------------|
| 17 | kt-ch17-l3-q9 | listen-mc | "wooden loom … all night" | "wooden clicking" | quiet snoring / soft singing / loud talking |
| 17 | kt-ch17-l3-x5 | comprehension | "click … all night" | "all through the night" | under the bright sun / early in the morning / during every meal |
| 17 | kt-ch17-l4-x8 | comprehension | "three days" | "three whole days" | just one short night / a full long week / half a single day |
| 17 | kt-ch17-l5-x8 | comprehension | "feathers brushing wood" | "feathers touching the wood" | a bell ringing / rice boiling / snow falling |
| 21 | kt-ch21-l4-q3 | listen-mc | "Anansi asked for a branch" | "asking for a piece of branch" | n/a — all distractors clearly off-topic |
| 22 | kt-ch22-l6-q8 | listen-mc | "she walked out early" | "leaving early in the day" | distractors about staying / cooking / sleeping |

### P2 Note: A1-EMOJI-VERBATIM (23 items — contextually acceptable)

All 23 are intro vocab items tagged `subSkill: 'vocab'` with pattern "Which one is a [WORD]?" / correct = "🔤 [WORD]". This is **intentional vocab-anchoring design** (not a true A1 violation) — the item teaches the word, not inference. Flagged for awareness but **not recommended for remediation** unless pedagogical intent changes.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch17–24 total scored entries | 536 |
| Questions with ≥1 A1 violation | 135 (25%) |
| P0 double violations | 10 |
| P1 LEN-LONG | 41 |
| P1 ECHO-ONLY | 76 |
| P1 LEN-SHORT | 6 |
| P2 EMOJI-VERBATIM (contextual) | 23 |
| listen-mc affected | ~28 of 100 |
| comprehension affected | ~55 of 192 |
| picture-mc affected | ~10 of 16 (62%) |

> **picture-mc structural note:** picture-mc type has the highest violation rate (62%) because describing an image accurately requires including the matching nouns — making keyword-echo and length-long nearly unavoidable by content. This is a **systemic design constraint**, not author error. Recommendation: for picture-mc, add 1–2 distractors that also mention the topic object in a wrong context (e.g., "a woman at a loom but weaving wool, not cloth") to break the keyword-spotting shortcut.

---

## D. Top 5 P0

1. **⚠️ Ch21 kt-ch21-l3-x8 (comprehension)** — "The hornets thought a sudden rain had come too soon." → correct "turning their fear of rain against them" is uniquely longest (+9ch) AND only option echoing "rain". Student needs zero comprehension — keyword "rain" + length mark correct immediately. Fix: shorten correct to "tricking the hornets with water", add "using rain to block their path" as plausible distractor.

2. **⚠️ Ch19 kt-ch19-l4-q10 (comprehension)** — "The crocodiles believed the lie because no one wanted to ask hard questions." → correct "everyone stayed silent to avoid embarrassment" is uniquely longest (+10ch) AND only option referencing the theme. The story nuance (shame culture) is entirely inaccessible via the distractors. Fix: trim to "no one dared question the lie" (31ch), add one distractor touching "silence": "they stayed quiet out of respect".

3. **⚠️ Ch17 kt-ch17-l3-q9 (listen-mc)** — "The wooden loom began to click and clack all night." → correct "wooden clicking" vs distractors "quiet snoring / soft singing / loud talking" — all distractors describe sounds but none relates to the wooden loom. Any child matching "wooden" to the stimulus gets this right without comprehension. Fix: Replace 2 distractors with sound-sources closer to the scene (e.g., "soft cloth tearing" / "pages turning slowly").

4. **⚠️ Ch22 kt-ch22-l7-q8 (listen-mc)** — "What you see every day shapes who you become." → correct "your place around you shapes you" is uniquely longest (+7ch) AND only option echoing "shapes". Correct paraphrases the stem directly; distractors are ideological contrasts ("rich families always win") that a child can reject without processing the specific sentence. Fix: Replace at least 2 distractors with partial paraphrases that also echo the stem.

5. **⚠️ Ch22 kt-ch22-l3-q8 (listen-mc)** — "He held up sticks and called out, just like the sellers." → correct "the way sellers called out prices" echoes both "sellers" and "called out". Distractors ("how children played", "how birds flew", "the slow songs") are entirely off-topic. Fix: Add one distractor that plausibly relates to market sounds (e.g., "the sellers counting coins").

---

## E. Narrative Voice / Pacing Improvements (0 R1-R8 structural violations found)

Even with no R1-R8 violations, these 3 voice/pacing improvements surface:

1. **Comprehension questions read like a test, not a story.** Many comprehension stems are verbatim lifted from the sentence (X49 reuse pattern). Grandma would paraphrase: instead of repeating "The wooden loom began to click and clack all night", ask "What sound filled the house after she went inside?" — this tests recall without spoon-feeding the answer.

2. **Distractor emotional register is flat across Ch17–24.** Distractors consistently use neutral/declarative forms ("a boy reading books at a desk", "an old man cooking inside a house"). For 8–12 children, emotionally-anchored distractors ("a sad girl crying by a river") are more engaging and harder to dismiss by POS alone. Per Buck (2001), distractor plausibility requires topic-proximity, not just grammatical form.

3. **Picture-mc descriptions lack specificity contrast.** Currently, 3 distractors describe plausible but unrelated scenes. Better design: at least 1 distractor should describe the *correct object in the wrong situation* (e.g., for "woman weaving cloth by candlelight" → distractor "a woman weaving grass into a basket outdoors") — forces the student to check the specific matching attribute.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Industry research findings

**Source 1 — NC State Teaching Resources (2021, evergreen):** "Keep the length of all alternatives approximately equal." Longer correct options are a well-documented test-design flaw that gives systematic advantage to test-taking strategies over language comprehension. ([link](https://teaching-resources.delta.ncsu.edu/multiplechoice/))

**Source 2 — ACL 2025, "Generating Plausible Distractors via Student Choice Prediction"** (Lee, Kim, Jo): Models trained to predict *which distractor students actually choose* show that the highest-quality distractors share semantic content with the stimulus. Distractors with zero overlap to the passage are systematically chosen less — confirming that A1-ECHO-ONLY distractors (off-topic) inflate apparent correct-answer-rate artificially. ([link](https://aclanthology.org/2025.acl-long.1154/))

**Source 3 — Duolingo DET listening whitepaper (2024):** Distractor generation included a filter rejecting items where "the key is extremely short or extremely long relative to distractors" — confirming Duolingo uses length-parity as a QA gate. ([link](https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf))

**Source 4 — Macquarie TECHE (2021):** "Arrange options logically and keep them parallel in structure and length." Systematic length variation creates guessability bias. ([link](https://teche.mq.edu.au/2021/04/writing-effective-multiple-choice-items/))

### ARCH-REC #167 — X167_A1_LENGTH_PARITY + X168_A1_KEYWORD_ISOLATION lint gates

**Pattern:** Add two new lint rules to `tools/validate-lessons.js`:

**X167_A1_LENGTH_PARITY**: For every question with `correctIndex` and `options`, compute `correct_len / max_distractor_len`. Flag if ratio > 1.30 (correct 30%+ longer than longest distractor). Also flag if ratio < 0.70 (correct 30%+ shorter). This codifies the Duolingo/Macquarie/NC State standard.

**X168_A1_KEYWORD_ISOLATION**: For every `listen-mc` or `comprehension` question, extract content words from `sentence` (>3 chars, non-function). Count how many options share ≥1 content word. Flag if count == 1 AND that one option is the correct answer — keyword-spotting shortcut confirmed.

**Implementation note** (pure JS, no new deps):
```js
// X167 in validate-lessons.js
function checkLengthParity(q) {
  const opts = q.options || [];
  const ci = q.correctIndex;
  if (opts.length < 2 || ci == null) return null;
  const correctLen = opts[ci].length;
  const distractorLens = opts.filter((_, i) => i !== ci).map(o => o.length);
  const maxDist = Math.max(...distractorLens);
  const ratio = correctLen / maxDist;
  if (ratio > 1.30) return `X167_A1_LENGTH_PARITY (correct ${Math.round(ratio*100)}% of longest distractor — too long)`;
  if (ratio < 0.70) return `X167_A1_LENGTH_PARITY (correct only ${Math.round(ratio*100)}% of longest distractor — too short)`;
  return null;
}
```

**Why it fits Pickup architecture:**
- Pickup is static JSON + React 18 + Cloudflare Pages — no server-side generation. `tools/validate-lessons.js` is already the control point for all content quality gates; adding two rules here is the right layer.
- Zero runtime cost; runs only at CI/commit time.
- These gates don't require changing any existing content — they **guide future authoring** and catch regressions in new chapters.
- Threshold 1.30/0.70 matches Duolingo's "extremely short or long" filter intent while being lenient enough not to block picture-mc (which structurally tends longer).

**Pickup fit verdict:** ✅ Strongly fits. Current 41 LEN-LONG + 76 ECHO-ONLY violations show the gate would catch real content problems. Effort: ~1hr to add both rules to `validate-lessons.js`. ROI: high — prevents systematic A1 bias in all future chapter authoring (Ch32–40 in roadmap).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X167_A1_LENGTH_PARITY lint gate (ratio >1.30 flag) | NC State + Duolingo DET whitepaper 2024 | ✅直接加 validate-lessons.js，零 runtime cost | ~30min | High: gates all future authoring | ✅ 實作 |
| X168_A1_KEYWORD_ISOLATION lint gate (0 distractors share content-word) | ACL 2025 distractor plausibility research | ✅ 同上, 純 JS content-word set diff | ~30min | High: catches keyword-echo shortcuts | ✅ 實作 |
| Distractor plausibility scoring (ML-based, ACL 2025 model) | Lee, Kim, Jo ACL 2025 | 🟡 部分適合: 有 LLM 可在 batch-gen 階段呼叫 GPT-4o 評分 distractors, 但需 API cost + pipeline 改動 | ~8hr | Medium: improves quality but expensive | 🟡 未來考慮 |
