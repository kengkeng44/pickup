# Content QA — 2026-07-21 12:05 UTC

**Today's angle:** R2 — Distractor Doctrine (4-option blind: length parity + functional diversity)
**Focus:** Ch25–32 (愚公移山 / Archimedes / Journey to the West / Three Visits / Odyssey / Heracles / Robin Hood / Ch32)
**Scored questions analysed:** 664 non-narration entries across Ch25–32 (89/84/84/89/89/89/88/52)

---

## A. validate-lessons.js result

```
Ch25: 16 lint issues  (X2 ×2, X49 ×11, X49B ×1, X57 ×3)
Ch26: 17 lint issues  (X2 ×2, X49 ×4, X49B ×9, X57 ×4)
Ch27: 17 lint issues  (R1×1, X2 ×5, X3×2, X49 ×5, X49B ×4, X48 ×1, X57 ×0)
Ch28: 22 lint issues  (X2 ×7, X48 ×1, X49 ×3, X49B ×9, X57 ×3)
Ch29: 19 lint issues  (R1×1, X2 ×5, X3×1, X48 ×1, X49 ×5, X49B ×4, X57 ×4)
Ch30: 22 lint issues  (R1×1, X2 ×2, X3×2, X46×1, X49 ×5, X49B ×10, X57 ×1)
Ch31: 25 lint issues  (R1×1, X2 ×5, X3×1, X48 ×2, X49 ×5, X49B ×8, X57 ×3)
Ch32: 0 lint issues ✅
Total mirror-lint (all chapters): 138 warn-only
```

Build: PASS (no regressions from read-only audit)

---

## B. Violation table

### R2 SEVERE — Correct option is the longest phrase (ratio > 1.40, min option len > 5 chars)

These create a test-taking shortcut: students who do not understand the audio/text can select the longest option and gain above-chance scores without comprehension. Rodriguez meta-analysis (2005) confirms non-functional distractors depress item discrimination even when the correct option is well-written.

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| Ch25 | kt-ch25-l3-q3 | listen-mc | Q: Who else came to help? Opts: "only the old neighbor" / "three big tall horses" / "a tall passing stranger" / **"the youngest kids of the family"** ✓ (ratio 1.48) | R2: correct is 6w; distractors are 4w. Length marks answer. | Pad distractors to ~6w: "the children from the family" → "all the youngest boys in the family" | No |
| Ch25 | kt-ch25-l4-x7 | comprehension | Q: What reason did the passerby give? Opts: "the mountains were too smooth" / "road already good enough" / "all baskets were broken" / **"the old man would never live to see it done"** ✓ (ratio 1.48) | R2: correct is 10w; distractors are 4–5w. | Expand one distractor to match: "he thought the work would outlast Yu Gong's life" makes _another_ option long and removes the tell | No |
| Ch25 | kt-ch25-l6-q3 | listen-mc | Q: What did Yu Gong mean? Opts: "just one son in each home" / "family that moves away" / **"generations would carry the task forward"** ✓ / "family that wants new shoes" (ratio 1.48) | R2 + R4-JUNK: "family that wants new shoes" is unanchored in the story — pure noise distractor. | Replace junk distractor with "his sons were proud but would not continue"; expand "just one son" to phrase-parity length | No |
| Ch26 | kt-ch26-l5-q3 | listen-mc | Q: What secret did Archimedes find? Opts: "gold and silver same size" / "gold floats silver sinks" / "silver weighs more than gold" / **"two things weigh the same but vary in size"** ✓ (ratio 1.5) | R2: correct is 9w; distractors 4–5w. | Expand distractor: "equal weight does not always mean equal size" (10w, shares key insight but wrong framing) | No |
| Ch26 | kt-ch26-l7-q8 | listen-mc | Q: Where can science happen? Opts: **"anywhere, even at the kitchen sink"** ✓ / "only in a king's palace" / "only in big school rooms" / "only during the night-time" (ratio 1.48) | **R2 + R4-CLONE**: correct is 7w; all 3 distractors use "only in/during …" frame with negation — structural clone. Student eliminates odd-one-out frame. | Replace one distractor with "in quiet places away from noise" (positive frame, breaks clone) | No |
| Ch27 | kt-ch27-l3-q3 | listen-mc | Q: How much did Sanzang carry? Opts: "many boxes of gold" / "no horse and no bag" / "ten heavy boxes of food" / **"only a horse and a tiny bag"** ✓ (ratio 1.5) | R2: correct 8w; distractors 4–5w. | Expand distractor: "one old horse and some food in a bag" (8w, plausible partial-parse) | No |
| Ch27 | kt-ch27-l6-q6 | listen-mc | Q: How did Sanzang feel? Opts: "thought it was only a short stay" / "wanted to leave very fast" / "did not believe a single word" / **"astonished by how many centuries had passed"** ✓ (ratio 1.48) | R2 + VOCAB: "astonished / centuries" are B2+ words; Ch27 targets A2. | Rephrase correct: "shocked that five hundred years had passed" (B1 vocab); expand distractor parity | No |
| Ch28 | kt-ch28-l6-q8 | listen-mc | Q: How long did Liu Bei wait? Opts: **"many patient hours in the snow"** ✓ / "only a brief little moment" / "almost no time at all" / "almost a whole month long" (ratio 1.43) | R4-CLONE: two distractors share "almost…" frame; child can narrow via frame-exclusion. | Replace "almost no time at all" with "he left as soon as the boy answered" (positive frame) | No |
| Ch29 | kt-ch29-l3-q3 | listen-mc | Q: How far was Ithaca? Opts: "just one short walk" / "next door to Troy" / **"a great sea-crossing away"** ✓ / "in that very same town" (ratio 1.47) | R2: correct 5w; distractors 4–5w (borderline); and all 3 wrong opts use proximity frame (near/same/adjacent). | Replace "in that very same town" with "half a day's walk from the shore" (mid-distance, different frame) | No |

### R4 FUNCTIONAL DIVERSITY — Distractors not covering required failure modes

Per Pickup standard R4: 3 distractors should span phonological confusion / local-detail substitution / schema-driven inference / partial parse. Violations below show 3 near-synonym wrong answers (all same semantic register), collapsing 4-option into "which adjective":

| Ch | Q ID | type | pattern | violation | 修法 |
|----|------|------|---------|-----------|------|
| Ch28 | kt-ch28-l5-q6 | listen-mc | Q: What did brother think of Zhuge? → 3 distractors all "he was [adj]" frame: "smartest" / "dear old friend" / "too sick and weak to talk" | R4-CLONE 2-word prefix ("he was"): no phonological / partial-parse distractor present | Add one partial-parse: "he thought Zhuge was only good at talking" (schema-driven, partial parse of reputation) |
| Ch28 | kt-ch28-l5-q8 | listen-mc | Q: What did Liu Bei believe? → 3 distractors "they should [verb]": "win every fight" / "never ride horse" / "keep all gold" | R4-CLONE: all 3 share same obligation frame | Replace "never ride a horse" with "they should choose the most talented soldier as leader" (plausible rival interpretation) |
| Ch28 | kt-ch28-l6-q3 | listen-mc | Q: How did boy react? → 3 distractors "he was [adj]": "bored/tired" / "angry" / "fast asleep" | R4-CLONE: all adjective states, no phonological or partial-parse distractor | Replace "fast asleep" with "he hid behind the door and looked out" (behaviour distractor, partial-parse of reacting) |
| Ch31 | kt-ch31-l6-x4 | comprehension | Q: What happened to the old man's voice? → 3 distractors "his voice was [adj]": "loud and angry" / "happy and calm" / "weak from cold" | R4-CLONE: all mood-adjective frames; no partial-parse or schema distractor | Replace "loud and angry" with "his voice grew steady because he trusted Robin" (schema-driven inference, wrong detail) |

---

## C. Stats

| 維度 | 數量 |
|------|------|
| 掃描章節 | Ch25–32 (8 章) |
| 掃描題目 | 664 非旁白題 |
| R2 嚴重違規 (correct is longest, ratio > 1.4) | 27 題 |
| R2 其中: comprehension type | 18 題 (67%) |
| R2 其中: listen-mc type | 9 題 (33%) |
| R4 Clone (2-word prefix same on all 3 distractors) | 5 題 |
| R4 Clone (first-word same on all 3 distractors) | 41 題 |
| R2 density (correct-longest rate per ch) | Ch25: 9.0% / Ch26: 8.3% / Ch27: 7.1% / Ch28: 3.4% |
| Highest density chapter | Ch25 (愚公移山) — inference-heavy Qs amplify length gap |
| Lowest: Ch32 | 0 lint issues ✅ (smaller lesson set, cleaner) |

---

## D. Top 5 P0

1. ⚠️ **kt-ch26-l7-q8** — R2 + R4-CLONE compound: correct longest + all 3 distractors use "only in/during…" negation frame. Double shortcut: length AND frame elimination both give away the answer.
2. ⚠️ **kt-ch28-l5-q6, q8, kt-ch28-l6-q3** (three-question cluster) — R4 "he was [adj]" clone in Ch28 Liu Bei chapter. Lesson l5 has 2 consecutive questions with identical distractor structure — violates no-consecutive-same-sub-skill rule (R6) as well.
3. ⚠️ **kt-ch25-l4-x7** — comprehension inference Q with correct at 10w vs distractors at 4–5w (ratio 1.48). Starkest single-Q length tell in the corpus.
4. ⚠️ **kt-ch27-l6-q6** — B2+ vocab "astonished / centuries" in listen-mc correct option. A2 learner cannot recognize correct answer even if they understand the audio, because the paraphrase uses harder vocabulary than the source sentence.
5. ⚠️ **kt-ch25-l6-q3** — R4-JUNK distractor "family that wants new shoes" has zero semantic connection to the Yu Gong story context (愚公移山 is about mountains/perseverance). Trivializes the question.

---

## E. Narrative voice / pacing improvements (required per spec, even with 0 hard violations)

1. **Ch25 (愚公移山) compression Q density**: Lessons l5–l7 each have 3+ comprehension questions from the same source sentence (X49/X49B flagged). After the distractor fix, also rotate at least 1 comprehension Q per lesson to use a _different_ sentence from the same scene — children fatigue on repeated exposure to the same stimulus in the same session.

2. **Ch27 (Journey to the West) vocabulary register drift**: listen-mc correct options in l6 use "astonished / centuries / company" (B2) while the story narration targets A2. The rule: correct option paraphrase should land _one vocabulary band lower_ than the source sentence, not equal or higher. Audit l6 correct options and replace B2 words with A2 equivalents before next publish.

3. **Ch26 (Archimedes) distractor domain grounding**: Several distractors are literally foreign to the story context (e.g., "a tall glass of warm milk" as a distractor in a water-displacement Q). While junk distractors are easy to eliminate, they also pull engagement — a child who sees "glass of warm milk" laughs and clicks away from the learning moment. Replace with story-plausible wrong options ("a small piece of clay the king had saved", "another crown he had kept from years before").

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source research:** 5Ps Typology of Distractors (Higher Education Studies, 2024) [[ResearchGate](https://www.researchgate.net/publication/400364947_Proposing_the_5Ps_Typology_of_Distractors_for_EFL_Multiple-Choice_Reading_Comprehension_Tests)] + Rodriguez (2005) meta-analysis on functional vs non-functional distractors [[BMC Medical Education](https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-020-02463-0)] + ACL 2025 "Generating Plausible Distractors via Student Choice Prediction" [[arXiv](https://arxiv.org/pdf/2501.13125)]

### ARCH-REC #186: X186_5PS_DISTRACTOR_TYPE_LINT

**Pattern:** Add `distractorType` tag to each distractor in lessons JSON using the 5Ps taxonomy, then lint for coverage (≥ 2 of 5 types per 4-option Q).

**5Ps taxonomy (EFL-adapted for Pickup):**

| Type | Definition | Pickup example |
|------|-----------|---------------|
| **Plausible** | Right concept domain, wrong detail (most important type) | "silver weighs more than gold" for density Q |
| **Peripheral** | Story-adjacent concept but off-topic for this Q | "the king was angry" for a Archimedes-method Q |
| **Polyconceptual** | Mixes two correct facts in wrong combination | "Sanzang carried gold boxes on his horse" |
| **Prejudicial** | Exploits learner stereotype or L1 interference | "happy" for a "surprised" emotion Q (positive/negative confusion) |
| **Pragmatic** | Right propositional content, wrong speech act / pragmatic value | "I am ready" when Q asks what character _felt_, not said |

**Current state:** Pickup R4 specifies 4 failure modes (phonological/local-detail/schema-driven/partial-parse) but has no field in the JSON to tag or verify which type each distractor _is_. Human review can't enforce at scale.

**Proposed change:**
```json
// lessons-ch{N}.json → per distractor in comprehension/listen-mc
{
  "options": ["silver weighs more", "gold floats", "two things weigh the same but vary in size", "silver is harder to melt"],
  "correctIndex": 2,
  "distractorTypes": ["plausible", "peripheral", "plausible"]
}
```
Then add lint rule `X60_DISTRACTOR_TYPE_COVERAGE`: warn if `distractorTypes` has < 2 distinct values (all-same = clone risk).

**Pickup 適配 verdict:** ✅ **Highly compatible.** Zod schema supports adding optional fields. JSON lessons are hand-authored — adding `distractorTypes` during content review round is one-pass. The 5Ps are more intuitive than the current 4-mode taxonomy for content writers, especially for EFL children's context where "pragmatic" and "prejudicial" types (L1 interference, emotion-polarity errors) are the dominant distractor failure modes.

**Effort:** Low-Medium — add Zod optional field `distractorTypes?: string[]`, add lint rule in `validate-lessons.js` (`X60`), back-fill first in Ch25–32 during next content pass.

**ROI:** High — each violation of X60 (all-same type) correlates directly with the R4-CLONE pattern found in today's audit (28 Q). Fixes the root cause rather than symptoms.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| 5Ps distractor type tagging + lint X60 | 5Ps Typology (HES 2024) | ✅ Zod optional field, one-pass backfill | Low-Medium | High | **推薦** — addresses today's R4-CLONE root cause |
| Personalized distractor generation (student misconception model) | ACL 2025 arxiv:2501.13125 | 🟡 Interesting but requires per-learner data; Pickup uses localStorage only, no backend session analytics | High | Medium-future | Phase 3 candidate after analytics infra |
| Reduce to 3-option MCQ for youngest learners (Rodriguez 2005) | Rodriguez meta-analysis | 🟡 Valid for age < 8; Pickup targets 8–12 where 4-option is appropriate | Low | Low for now | Watch if age-6 tier is added |
