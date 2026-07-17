# Content QA — 2026-07-17 18:06 UTC

**Today's angle:** A2 — Cloze Blank Position (start / mid / end recency bias)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Pigs)
**Chapters scanned:** Ch1–Ch8, 249 scored `listen-mc` + `comprehension` entries analysed for answer-word position in sentence

> **Angle choice rationale:** 3 crons today covered Ch25-32 (A4), Ch17-24 (A1), Ch9-16 (R2). Ch1-8 is the balanced slot not yet covered today. A2 (blank position) absent from all 8 recent tracked cycles. Ch1-8 core children ELT block — highest played chapters — making positional bias most impactful on perceived difficulty.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 10 lint issue(s)
  X48_NGRAM_VERBATIM_CORRECT ×2, X49_STIMULUS_REUSE ×4, X49B ×1, X57_ANTONYM_PAIR_MIRROR ×1, X2 ×2
WARN lessons-ch2.json: 12 lint issue(s)
  X48 ×1, X49 ×5, X49B ×2, X57 ×2, X2 ×2
WARN lessons-ch3.json: 11 lint issue(s)
  X48 ×2, X49 ×4, X49B ×2, X57 ×2, X2 ×1
WARN lessons-ch4.json: 14 lint issue(s)
  X48 ×1, X49 ×5, X49B ×3, X57 ×2, X2 ×3
WARN lessons-ch5.json: 11 lint issue(s)
  X48 ×1, X49 ×5, X49B ×2, X57 ×1, X2 ×2
WARN lessons-ch6.json: 9 lint issue(s)
  X49 ×4, X49B ×3, X57 ×1, X2 ×1
WARN lessons-ch7.json: 13 lint issue(s)
  X48 ×1, X49 ×7, X49B ×2, X57 ×1, X2 ×2
WARN lessons-ch8.json: 9 lint issue(s)
  X48 ×2, X49 ×4, X49B ×1, X57 ×2, X2 ×2
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT not set)
```

**No new schema-break issues. Lint baseline unchanged.**

---

## B. A2 Blank Position — angle-specific methodology

For each `listen-mc` / `comprehension` question: locate the keyword(s) from the correct answer in the sentence and record the fractional position `idx/n` where `n` = word count.

| Zone | Fraction | Cognitive load |
|------|----------|----------------|
| START | 0.00–0.33 | High — no left-context yet when blank encountered |
| MID | 0.34–0.66 | Ideal — balanced left+right context supports inference |
| END | 0.67–1.00 | Low — recency effect (STM still holds last words heard) |
| paraphrase | n/a | Best — answer not verbatim in sentence; forces true comprehension |

**Serial Position Effect (Glanzer & Cunitz 1966):** items at the END of a heard sequence are retained in STM without deep processing. Measuring END-position content therefore inflates scores without assessing real listening comprehension — a core validity threat.

---

## C. Global position distribution (Ch1–8, n=249)

| Zone | Count | % | Target |
|------|------:|---|--------|
| paraphrase | 155 | 62.2% | ≥ 60% ✅ |
| MID | 50 | 20.1% | 15–30% ✅ |
| START | 25 | 10.0% | 8–15% ✅ |
| END | 19 | 7.6% | ≤ 10% ✅ |

**Global distribution is healthy.** Concerns are concentrated at the chapter and lesson level (see §D).

---

## D. Violation table

| # | Ch | Lesson | Type | Snippet | Violation | 修法 | audio regen? |
|---|----|----|---------|---------|---------|------|------|
| 1 | 5 | kt-ch5-l4 | comprehension | "…It was not made of wood. It was made of bones." → **bones** | VERY-END [18/19] + CLIFF-HANGER — two Qs test the same sentence-final word; combines X49B (stimulus reuse) with END-position recency bias | Q1 keep as-is (first encounter OK); Q2 reframe: "What does the fence tell Vasilisa about Baba Yaga?" → correct: "that she uses bones to mark her territory" | No |
| 2 | 8 | kt-ch8-l7 | listen-mc + comprehension | 4 consecutive MID-zone questions in the same lesson | ALL-SAME-ZONE [MID] — 4/4 non-paraphrase Qs land in sentence middle; no START or END variation → learner builds zone-targeting meta-strategy | Reframe 1 Q to test sentence-initial subject ("Who built the fire?") → START zone; reframe 1 Q to test sentence-final result ("What did the wolf do after the pot?") → END zone | No |
| 3 | 2 | kt-ch2-l3 | comprehension | 3 consecutive START-zone Qs (subject/protagonist of each sentence) | ALL-SAME-ZONE [START] — all 3 non-para Qs test the grammatical subject of the sentence; learner learns "always the first thing mentioned = answer" | Rotate 1 Q to MID: "What adjective describes the farmyard?" → "full of many loud animals" maps to MID (adj comes mid-sentence) | No |
| 4 | 2 | kt-ch2-l4 | comprehension | 3 consecutive START-zone Qs | ALL-SAME-ZONE [START] — same pattern as kt-ch2-l3 in the preceding lesson; two consecutive START-only lessons compounds the strategy signal | Reframe 1 Q: "What happened at the end of that night?" → "he climbed the fence and escaped" — END zone | No |
| 5 | 8 | kt-ch8-l3 | listen-mc | "He picked sticks because they felt firmer than straw." → **firmer than straw** | CLIFF-HANGER [MID→end] — correct answer overlaps last 3 words exactly; also ALL-SAME-ZONE [MID] lesson. X48_NGRAM_VERBATIM_CORRECT already flagged by lint | Paraphrase: correct → "stronger material than the first house" (removes verbatim tail overlap) | No |
| 6 | 5 | kt-ch5-l3 | listen-mc | "After the white rider, the sky turned light." → **morning light** | VERY-END [7/8] — tested word "light" is penultimate word; minimal comprehension required | Reframe to MID test: "What does each rider represent?" → "morning, noon and night" already exists in next Q; swap targets | No |
| 7 | 1 | kt-ch1-l4 | comprehension | "Momotaro reached into the bag and pulled out one dumpling." → **a single millet dumpling** | VERY-END [9/10] — "dumpling" is last word; answer paraphrases but keyword echoes sentence end | Acceptable — "a single millet dumpling" is inference-level (adds "single" + "millet" not in Q itself); monitor only | No |
| 8 | 6 | kt-ch6-l5 | comprehension | 3 Qs all MID-zone (king/ring/woman) | ALL-SAME-ZONE [MID] — 3/3 non-para Qs target sentence middle; single-zone pattern in Six Swans courtship sub-arc | Reframe 1 Q to END: "What did the older woman do each day?" → "cold and unkind" is already END (idx 10/11) — move that one to the front of the set | No |

---

## E. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch1–8 (8 chapters) |
| Scored Qs analysed (listen-mc + comprehension) | 249 |
| All-same-zone lessons (≥3 non-para Qs, one zone) | 5 |
| VERY-END Qs (idx ≥ n−2) | 15 |
| CLIFF-HANGER Qs (≥2 answer words match sentence tail) | 6 |
| Ch8 paraphrase rate (lowest) | 32% |
| Ch5 paraphrase rate | 43% |
| Global paraphrase rate | 62.2% |
| Lint regressions vs. prior cycle | 0 |

---

## F. Top 5 P0

1. **⚠️ P0** `kt-ch5-l4` — DOUBLE CLIFF-HANGER: two comprehension Qs both test "bones" at sentence END (VERY-END + X49B double-dip). Combines 3 violations in one entry: position bias + stimulus reuse + verbatim overlap.
2. **⚠️ P0** `kt-ch8-l7` — ALL-SAME-ZONE [MID] across 4 consecutive Qs. The Three Pigs climax lesson teaches "brick is safest" through pure MID-zone testing with zero positional variety.
3. **P1** `kt-ch2-l3` + `kt-ch2-l4` — Two consecutive Ugly Duckling lessons both ALL-SAME-ZONE [START]. Learner playing Ch2 for 6 straight scored Qs gets the same meta-signal: "test the subject of each sentence."
4. **P1** `kt-ch8-l3` — ALL-SAME-ZONE [MID] + CLIFF-HANGER on the straw-vs-sticks transition scene. X48_NGRAM_VERBATIM lint already flags the verbatim tail; positional analysis confirms it's the VERY-END tell.
5. **P1** `kt-ch6-l5` — ALL-SAME-ZONE [MID] in the Six Swans courtship arc. Lower impact (single lesson, MID is the safest zone) but monotony persists.

---

## G. Narrative voice / pacing improvements (even if 0 R1-R8 violations)

1. **Ch5 `kt-ch5-l4` arc pacing:** The fence-made-of-bones revelation is a strong story beat but is double-tested (X49B). The second question could be reframed as an *inference* ("What kind of person builds a fence like that?") — shifting from a pure recall END-position test to a schema-inference MID-engagement question. Adds story-appropriate dread to the voice.
2. **Ch2 `kt-ch2-l3` narrative continuity:** Three START-zone questions in a row all ask "what did the farmyard animals do / who reacted." Rotating one to "what mood does this create in the duckling?" pulls the comprehension arc toward emotional inference — matching the Ugly Duckling's internal journey instead of just cataloguing external events.
3. **Ch8 `kt-ch8-l7` climax pacing:** Four MID-zone questions in the Three Pigs climax lean into cause-effect grammar ("the wolf tried → the walls stood → he gave up"). At least one question should test the *moral* at END zone ("what does the pig's choice teach you?") — landing the lesson's theme rather than only its mechanics.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #170: X170_A2_BLANK_POSITION_LINT_GATE

**Pattern:** Add `blankPosition` lint gate to `validate-lessons.js` flagging VERY-END position (answer keyword at sentence position > 0.85) and ALL-SAME-ZONE lessons (≥3 non-para Qs, single zone).

**Industry source:** Serial Position Effect (Glanzer & Cunitz 1966; confirmed in language-test context by Buck 2001 Ch.4 "recency vulnerability in blind-listening MC"). ETS TOEIC item-writing spec (public 2024) explicitly advises item writers to vary the position of key content across questions in a listening set.

**Pickup fit:** Pickup's `listen-mc` / `comprehension` entries already store `sentence`, `options`, `correctIndex` — no schema change needed. The lint can run the position heuristic used in this audit at build time. Flag severity: WARN (not ERR) since 15 VERY-END Qs exist currently.

**Implementation sketch:**
```js
// In validate-lessons.js, per-lesson pass:
const nonParaPositions = scoredQs.map(q => answerPosition(q.sentence, q.options[q.correctIndex]));
const zones = nonParaPositions.filter(p => p !== 'paraphrase');
if (zones.length >= 3 && new Set(zones).size === 1) {
  warn(lessonId, 'X70_ALL_SAME_ZONE', `all ${zones.length} non-para Qs in ${zones[0]} zone`);
}
nonParaPositions.forEach((pos, i) => {
  if (pos.ratio > 0.85) warn(qId, 'X71_VERY_END_RECENCY', `answer at tail pos ${pos.idx}/${pos.n}`);
});
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X70_ALL_SAME_ZONE — WARN when ≥3 non-para Qs all in same position zone | Glanzer & Cunitz 1966; Buck 2001 | ✅ direct drop-in to validate-lessons.js | Low (1 hr) | High — prevents future Ch8-style monotony | ⭐ 推薦 |
| X71_VERY_END_RECENCY — WARN when answer keyword in last 15% of sentence | ETS TOEIC item writing (2024 public spec) | ✅ same heuristic as this audit | Low (30 min) | Medium — 15 current hits, prevents regression | ⭐ 推薦 |
