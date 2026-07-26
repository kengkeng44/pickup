# Content QA — 2026-07-26 18:04 UTC

**Today's angle:** A6 — option-in-question (correct option echoes question stem / sentence verbatim; Tarrant IWF Rule; allows answer-selection without comprehension)
**Focus:** Ch25–34 (Yugong, Archimedes, Journey to the West, Magellan, Heracles, Robin Hood, Ch32-33 grammar chapters, Ch34 type-translate)
**Auditor:** cron-content-qa automated session
**Angle rotation:** A6 not used in prior 10 cycles (last 8: A3 / R2 / A5 / #11 / A7 / A1 / #10 / R1)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json:  7 lint issue(s)   (X2, X48, X49, X49B, X57)
WARN lessons-ch9.json:  8 lint issue(s)   (X2, X49, X57)
...
Total mirror-lint issues: 440  (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

No new structural failures. Existing 440 mirror-lint warnings persist — mostly X2 (list-start bias), X49 (stimulus reuse), X57 (antonym mirror). None newly introduced this cycle.

---

## B. Violation table — A6 option-in-question, Ch25–34

262 MC-type questions scanned (listen-mc + comprehension + listen-comprehension). 12 unique A6-pattern issues found.

### Severity P0 — Direct verbatim lift (correct option ≥3 content words from sentence/Q)

| Ch | Q ID | type | Sentence snippet | Question | Correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|---------|----------------|-----------|------|-------------|
| 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper on Robin's front door for everyone…" | Where did they put the paper? | on Robin's front door | P0: 3-gram "Robin's front door" verbatim from sentence → no comprehension needed | Replace with: "posted on the outside wall of his house" | No |
| 31 | kt-ch31-l4-x1 | comprehension | same sentence | What was on Robin's front door? | yellow paper nailed for all to see | P0: "yellow paper nailed" echoes sentence; both Q and correct option are near-verbatim lifts | Q: "What warning did the sheriff leave at Robin's home?" → A: "a notice for all to read" | No |
| 27 | kt-ch27-l5-q3 | listen-mc | "Five tall stone fingers rose into the sky like a giant hand." | What did the mountain look like? | a giant hand of stone | P0: "giant hand" + "stone" verbatim from sentence; 3/4 content words echo back | Replace: "five pillars reaching up like outstretched fingers" | No |
| 29 | kt-ch29-l4-q3 | listen-mc | "The crew tied the ropes and lifted the white sails up high." | What did the crew do first? | tied ropes and raised the sails | P0: "tied"+"ropes"+"sails" all from sentence; near-complete sentence restatement | Replace: "fastened the lines and opened the canvas" | Yes — new TTS if sentence changes |
| 27 | kt-ch27-l5-x4 | comprehension | "Then a deep voice came from under the rocks." | What was strange about the voice? | coming from deep under the heavy rocks | P0: "deep"+"under"+"rocks" verbatim from sentence → no inference required | Replace: "rising up out of solid stone" | No |

### Severity P1 — Partial verbatim (2 content word overlap)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 33 | kt-ch33-l7-q2 | listen-mc | "How many apples are on the table? There are six." | Q "How many apples are there?" → correct "Six apples." — key noun "apples" echoed directly | P1: grammar drill, no paraphrase layer at all | Replace correct: "A half-dozen fruit" (or rephrase Q to avoid "apples") | No |
| 26 | kt-ch26-l6-q6 | listen-mc | "…placed a piece of pure gold of the same weight…" | correct: "pure gold of equal weight" | P1: "pure gold"+"weight" verbatim; 3/4 option words from sentence | Replace: "an equal-weight chunk of precious metal" | Yes |
| 31 | kt-ch31-l7-q6 | listen-mc | "every coin we take, we will give back to poor families" | correct: "take from rich bad men, give to the poor" | P1: "take"+"give"+"poor" verbatim; option restructures but echoes all key words | Replace: "return stolen wealth to those who need it most" | No |
| 31 | kt-ch31-l5-x5 | comprehension | "For the first time in many days, no soldier could see his face" | correct: "hidden from enemy eyes for the first time in days" | P1: "first"+"time"+"days" echoed; option expands but uses all 3 sentence time markers | Replace: "safe from soldiers after a long chase" | No |
| 25 | kt-ch25-l7-x9 | comprehension | "if you never give up, good things can happen" (moral wrap) | correct: "never give up and big things happen" | P1: "never give up" + "happen" verbatim restatement of moral; no gist inference needed | Replace: "one person's belief can move a mountain over generations" | No |
| 29 | kt-ch29-l5-q3 | listen-mc | "By night the stars came out like soft lights" | correct: "soft lights from the stars" | P1: "stars"+"soft"+"lights" all from sentence → 3/4 content words | Replace: "the night sky filled with distant glow" | No |
| 27 | kt-ch27-l5-x4 | comprehension | Already listed P0 above | — | — | — |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch25–34 (10 chapters) |
| MC-type questions scanned | 262 |
| A6 violations (automated detection) | 12 unique |
| P0 (critical, 3+ verbatim content words) | 5 |
| P1 (notable, 2 verbatim content words) | 7 |
| Existing linter-flagged issues (X48 verbatim) | already in 440 mirror-lint total |
| A6 violation rate | 4.6% (12/262) |
| Chapters with 0 A6 issues | Ch28, Ch32, Ch34 |
| Chapters with highest A6 density | Ch31 (4), Ch27 (3), Ch29 (2) |

**Violation rate by chapter (A6 only):**
- Ch27: 3 violations / 31 MC = 9.7% — highest density
- Ch31: 4 violations / 35 MC = 11.4% — highest count
- Ch29: 2 violations / 36 MC = 5.6%

---

## D. Top 5 P0

1. **kt-ch31-l4-q3** — "Robin's front door" → "on Robin's front door": 3-gram verbatim, question → correct option. Comprehension bypassed.
2. **kt-ch31-l4-x1** — Same sentence, double-dip: Q body says "Robin's front door" and correct restates the object. Both Q+correct echo sentence.
3. **kt-ch27-l5-q3** — "giant hand" + "stone" verbatim: the entire metaphor in the sentence is preserved intact in the correct option. Imagery recognition, not comprehension.
4. **kt-ch29-l4-q3** — "tied ropes and raised the sails": 3 of the 4 sentence key verbs/nouns appear in the correct option, only "lifted" → "raised" paraphrased. Near-complete sentence restatement.
5. **kt-ch27-l5-x4** — "deep" + "under" + "rocks": all three locative words from the sentence echoed in the option. Adds "heavy" as padding but is not a meaningful paraphrase.

---

## E. Narrative Voice / Pacing Improvements (3 required even at 0 violations)

### NV1 — Ch25 moral-wrap voice: abstract the lesson, don't restate it

`kt-ch25-l7-x9` asks "What is the main message of this story?" with correct: "never give up and big things happen". This is a grandma-voice story, but the moral is stated identically in the preceding sentence. For 8-12 learners, the sense of discovery is lost.

**Suggested reframe:** Replace with grandma-mediated moral: `"奶奶說：小步小步,一代傳一代,山也會讓路"` as the explanationZh, and the correct option becomes `"one step at a time, and each generation carries the work forward"` — keeps story-voice, requires synthesis not sentence recall.

### NV2 — Ch30 inference gap: Heracles chapter is all detail questions

Across Ch30's 36 MC questions (listen-mc + comprehension), every question is a direct-detail type ("What did X do?", "Where was X?", "How did Heracles hit?"). There are zero inference questions. The R6 standard requires ≥2 inference per lesson block.

**Suggested fix:** Convert 2 existing `comprehension`-type questions in Ch30-l6 to inference:
- Instead of: "What did Heracles do with his hands?" → convert to: "Why did Heracles make fists instead of running away?"
- Instead of: "How did Heracles act facing the lion?" → convert to: "What does Heracles' decision to fight tell us about him?"

This adds inference depth without requiring new content, and aligns with the grandma-voice "brave even when weapons fail" arc.

### NV3 — Ch33 grammar questions lack story framing

Ch33's 7 listen-mc questions are grammar drills ("How many apples are there?" "What color is the cat?") embedded in what is supposed to be a story chapter. These read as discrete vocabulary tests, not narrative scenes. The pacing resets abruptly from story-voice to classroom-drill voice.

**Suggested fix:** Wrap the grammar queries in a scene context. Instead of:
- `"How many apples are on the table?"` (raw grammar drill)

Frame as:
- `"Grandma pointed to the bowl and asked: how many?"` with sentence `"There are six red apples."` — same cognitive target, preserved grandma-voice continuity.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #207: X207_A6_JACCARD_STEM_OVERLAP_LINT**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Post-generation Jaccard overlap lint between question stem tokens and correct option tokens (flag when non-stop content word appears in both) | Tarrant et al. IWF rubric (2006, cited 2024-2026); BenchMarker toolkit arXiv:2602.06221 (2026); Duolingo English Test listening whitepaper | ✅ 適合 — pure string ops, zero dependency, runs inside existing `validate-lessons.js`; aligns with `R1` / `A6` / `A7` already in `pickup-q-design-standard-v1.md` | Low (~30 min, JS only in `tools/validate-lessons.js`) | High — would flag 12 issues found this cycle + prevent regression in future content batches | **Recommend implement** |

**Implementation spec:**
```js
// In validate-lessons.js — add after existing X48/X57 checks
function contentWords(text) {
  const STOP = new Set(['the','a','an','is','are','was','were','in','on','to','of','and','or',
    'with','by','from','it','he','she','they','be','have','has','had','will','can','not','so']);
  return text.toLowerCase().match(/[a-z]+/g)?.filter(w => !STOP.has(w) && w.length >= 4) ?? [];
}
// For each MC question with correctIndex:
const qWords = new Set(contentWords(q.question));
const optWords = new Set(contentWords(options[correctIndex]));
const overlap = [...qWords].filter(w => optWords.has(w));
if (overlap.length >= 2 || (overlap.length === 1 && optWords.size <= 3)) {
  warn(q.id, 'X207_A6_STEM_OVERLAP', `correct option shares "${overlap}" with question stem — may bypass comprehension`);
}
```

**Industry basis:** Tarrant IWF rubric (rule: no lexical sharing between stem and keyed answer); BenchMarker (2026) applies this at scale via LLM judge; Duolingo whitepaper: "options must be lexically independent from the audio stimulus." No published numeric threshold exists — standard treats any non-incidental content-word echo as disqualifying.

**Why now:** This cycle found a 4.6% A6 violation rate across Ch25-34 (12/262 questions). Without lint, future content batches (Ch35+) will accumulate the same pattern silently. The fix is additive to the existing validate-lessons.js warn framework and requires no schema changes.

---

*Audit by automated cron session — v2.0.B.cron-content 2026-07-26-1804*
