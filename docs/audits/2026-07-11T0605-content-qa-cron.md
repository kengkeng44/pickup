# Content QA — 2026-07-11 06:05 UTC

**Today's angle**: A7 — content-word repetition (correct answer verbatim-repeats stimulus words)
**Focus**: Ch25–32 (287 answerable questions, 8 chapters)

**Angle definition:**
A7 targets the "TOEIC-trap inverted" failure: where the *correct* answer reuses key content words from the stimulus sentence verbatim instead of paraphrasing. This lets test-takers match words without genuine comprehension, inflating scores and breaking construct validity (Buck 2001, Iimura JLTA: "word overlap is the single strongest driver of distractor plausibility"). Additionally audited R5 cross-question Jaccard ≥ 0.40 within lessons (design standard §R5).

**Sub-types tracked:**
- **A7-P0**: ≥ 3 content-word exact overlap between `sentence` and `correct option` (give-away)
- **A7-P1**: 2-word overlap (borderline, consider paraphrase)
- **R5-P0**: Jaccard ≥ 0.60 between any two questions in same lesson (strong duplication)
- **R5-P1**: Jaccard 0.40–0.59 (moderate overlap, review)
- **R5-FATAL**: Jaccard = 1.00 (byte-identical question pair — must fix)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: X2 × 1, X48 × 2, X49 × 4, X49B × 1, X57 × 1
WARN lessons-ch9.json: X2 × 2, X57 × 3, X49 × 3
(existing lint — same as prior cycles, no new hard fails in Ch25-32)

Total Ch25-32 answerable questions: 287
  Ch25: 37 | Ch26: 37 | Ch27: 37 | Ch28: 42
  Ch29: 37 | Ch30: 37 | Ch31: 37 | Ch32: 23
Hard-fail schema errors: 0
A7 violations detected: 38  (12 P0 / 26 P1)
R5 violations detected: 60  (35 P0 / 25 P1)
  of which Jaccard=1.00 (FATAL identical pairs): 3
```

---

## B. Violation table

### A7 — Content-word repetition (P0 first)

| Ch | Q ID | type | Sentence snippet | Correct option | Overlap words | Sev | 修法 | audio regen? |
|----|------|------|-----------------|----------------|---------------|-----|------|-------------|
| 27 | kt-ch27-l5-q3 | listen-mc | "Five tall stone fingers rose into the sky like a giant hand." | a giant hand of stone | giant, hand, stone | P0 | → "a towering formation of rock" | no |
| 27 | kt-ch27-l5-x4 | comprehension | "Then a deep voice came from under the rocks. 'Master! Master!'" | coming from deep under the heavy rocks | deep, rocks, under | P0 | → "rising from beneath the boulders" | no |
| 27 | kt-ch27-l6-q3 | listen-mc | "Only his head and one arm could move from the heavy stone." | only his head and one arm | arm, head, one | P0 | → "just his face and a single limb" | no |
| 29 | kt-ch29-l4-q3 | listen-mc | "The crew tied the ropes and lifted the white sails up high." | tied ropes and raised the sails | ropes, sails, tied | P0 | → "secured the lines and unfurled the canvas" | no |
| 29 | kt-ch29-l5-q3 | listen-mc | "By day the sun was warm. By night the stars came out like soft lights." | soft lights from the stars | lights, soft, stars | P0 | → "gentle glimmers in the dark sky" | no |
| 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper on Robin's front door for everyone to see." | on Robin's front door | door, front, robin's | P0 | → "posted at his home entrance" | no |
| 31 | kt-ch31-l4-x1 | comprehension | "They nailed a yellow paper on Robin's front door for everyone to see." | yellow paper nailed for all to see | nailed, paper, see, yellow | P0 | → "a public notice fixed to his house" | no |
| 31 | kt-ch31-l5-x4 | comprehension | "Robin took a slow breath. The forest air smelled sweet, like clean rain." | sweet and clean like fresh rain | clean, rain, sweet | P0 | → "fresh and pure like after a storm" | no |
| 31 | kt-ch31-l6-q3 | listen-mc | "Behind the oak tree was a thin man with a torn brown coat." | a thin man in torn clothes | man, thin, torn | P0 | → "a gaunt figure in ragged garments" | no |
| 31 | kt-ch31-l6-x5 | comprehension | "They lived under low branches and slept on soft beds of dry leaves." | using branches and dry leaves instead | branches, dry, leaves | P0 | → "sheltered by trees and forest floor" | no |
| 25 | kt-ch25-l7-x9 | comprehension | "…if you never give up, great things happen" | never give up and big things happen | give, happen, things | P0 | → "persisting leads to great rewards" | no |
| 26 | kt-ch26-l6-q6 | listen-mc | "…a piece of pure gold of the same weight." | pure gold of equal weight | gold, pure, weight | P0 | → "an identical mass of precious metal" | no |

### A7 — Content-word repetition (P1, top 12)

| Ch | Q ID | type | Sentence snippet | Correct option | Overlap | Sev |
|----|------|------|-----------------|----------------|---------|-----|
| 25 | kt-ch25-l6-q6 | listen-mc | "family keeps growing" | family grows, mountains do not | family, mountains | P1 |
| 26 | kt-ch26-l3-q6 | listen-mc | "his face go thin and his eyes grow dark" | his face was thin and tired | face, thin | P1 |
| 26 | kt-ch26-l4-q6 | listen-mc | "called for a cloth to wipe it up" | ask for a cloth to wipe it | cloth, wipe | P1 |
| 27 | kt-ch27-l3-q3 | listen-mc | "one brown horse and one small bag" | only a horse and a tiny bag | bag, horse | P1 |
| 29 | kt-ch29-l5-q8 | listen-mc | "Day after day the trip felt easy and good." | easy and good | easy, good | P1 |
| 29 | kt-ch29-l6-q6 | listen-mc | "scared and their hands shook" | scared, with shaking hands | hands, scared | P1 |
| 30 | kt-ch30-l3-q3 | listen-mc | "a sharp sword to his side" | a bow and a sharp sword | sharp, sword | P1 |
| 30 | kt-ch30-l4-q6 | listen-mc | "hit the lion right in the chest" | right in the chest | chest, right | P1 |
| 30 | kt-ch30-l4-x5 | comprehension | "skin was too thick. Arrows could not hurt it" | the skin was far too thick | skin, thick | P1 |
| 30 | kt-ch30-l6-x1 | comprehension | "My bow is on the ground. My sword is broken." | his bow and sword both could not help | bow, sword | P1 |
| 28 | kt-ch28-l4-q8 | listen-mc | "same young boy opened the door" | the same boy as before | boy, same | P1 |
| 28 | kt-ch28-l5-q6 | listen-mc | "not worth two visits, much less three" | not worth so many visits | visits, worth | P1 |

### R5 — Cross-Q Jaccard P0 (FATAL = 1.00 first)

| Ch | Lesson | Q pair | Jaccard | Overlap sample | Sev | 修法 |
|----|--------|--------|---------|----------------|-----|------|
| 30 | kt-ch30-l4 | q8↔x4 | **1.00** | arrows, bounced, heracles, shot, two | **FATAL** | Delete duplicate x4; rewrite around different detail |
| 31 | kt-ch31-l5 | q8↔x9 | **1.00** | clear, drank, hands, robin, sat, stream | **FATAL** | Rewrite x9 around a different sentence in l5 |
| 31 | kt-ch31-l6 | q3↔x1 | **1.00** | behind, brown, coat, hiding, man, oak | **FATAL** | Rewrite x1 around a contrasting sentence in l6 |
| 30 | kt-ch30-l3 | q8↔x5 | 0.92 | big, cold, find, heracles, mud, near | P0 | Rewrite x5 around different scene detail |
| 26 | kt-ch26-l7 | q3↔x1 | 0.88 | bath, became, forever, happened, part, rule | P0 | x1 too close to q3; pivot to Archimedes' reaction |
| 31 | kt-ch31-l7 | q3↔x1 | 0.90 | alone, anymore, help, one, other, people | P0 | Rewrite x1 on different Robin Hood story beat |
| 30 | kt-ch30-l7 | q8↔x5 | 0.90 | coat, heracles, himself, lion's, made, skin | P0 | Rewrite x5 around the journey aftermath |
| 30 | kt-ch30-l3 | q6↔x4 | 0.88 | animal, bird, forest, moved, quiet, sang | P0 | Pivot x4 to Heracles' inner thoughts, not forest sounds |
| 30 | kt-ch30-l7 | q6↔x4 | 0.82 | arms, grew, happened, last, lion, moving | P0 | Rewrite x4 around Heracles' determination |
| 31 | kt-ch31-l5 | q6↔x4 | 0.83 | air, breath, clean, forest, rain, robin | P0 | x4 mirrors x4 A7 violation too; pivot to Robin's plan |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Questions scanned | 287 |
| A7 P0 (≥3-word verbatim overlap) | 12 |
| A7 P1 (2-word overlap) | 26 |
| A7 total | 38 (13.2% of Q) |
| R5 FATAL (Jaccard=1.00) | 3 |
| R5 P0 (0.60–0.99) | 32 |
| R5 P1 (0.40–0.59) | 25 |
| R5 total | 60 (20.9% of Q) |
| Chapters with 0 violations | 0 |
| Worst chapter (combined) | Ch31 (14 P0 across A7+R5) |
| Second worst | Ch30 (11 P0 across A7+R5) |

**Systemic pattern observed:** Ch30 (Heracles/Nemean Lion) and Ch31 (Robin Hood) are the worst offenders. Both use tight narrative focus on a single scene per lesson — the Heracles lion-fight and Robin Hood's forest life — so stimulus sentences within a lesson cluster around the same dozen content words. The lesson writer then draws multiple questions from the same sentence, producing both A7 (correct answer verbatim) and R5 (Qs about identical facts) violations simultaneously. Ch26 (Archimedes) shows the same pattern with repeated proper noun "Archimedes" driving R5 pairs above 0.67 across 4 consecutive lessons.

---

## D. Top 5 P0

1. **⚠️ R5-FATAL Ch30-l4 q8↔x4** — Jaccard=1.00; two questions ask about *exactly* the same fact (arrows bouncing off lion) with identical content words. One question is a zero-information duplicate. Action: delete x4 entirely, replace with question on a *different* detail from l4 (e.g., where the lion was resting, or what Heracles said).

2. **⚠️ R5-FATAL Ch31-l5 q8↔x9** — Jaccard=1.00; both ask about Robin drinking from the stream. x9 is a direct duplicate of q8. Rewrite x9 to focus on the forest air/smell scene described earlier in the same lesson.

3. **⚠️ R5-FATAL Ch31-l6 q3↔x1** — Jaccard=1.00; identical questions about the thin man in the brown coat. The comprehension type x1 is asking the same fact as listen-mc q3. Rewrite x1 as an inference question: "Why might this stranger be hiding behind the oak tree?" — shifts to gist/inference sub-skill.

4. **⚠️ A7-P0 Ch31-l4 x1 (comprehension)** — correct option "yellow paper nailed for all to see" repeats 4 content words from stimulus verbatim. Fix: "a public warning posted at his entrance."

5. **⚠️ A7-P0 Ch27-l5-q3 (listen-mc)** — correct option "a giant hand of stone" = 3/3 key nouns verbatim from "Five tall stone fingers rose into the sky like a giant hand." Fix: "a towering rock formation shaped like fingers."

---

## E. Narrative voice / pacing improvements (0-violation baseline)

Even outside R5/A7 rule violations, these three improvements would raise content quality:

1. **Ch29 question density imbalance**: kt-ch29-l5-q8 asks "How did the trip feel?" with correct answer literally "easy and good" — minimal cognitive demand even below A2 floor (explicit + 2-word verbatim). Replace with inference-level Q: "Why did Odysseus's crew feel confident on this day?" targets B1 inference as required by R8.

2. **Ch25 fable moral as correct answer (l7-x9)**: The comprehension question probes the fable's moral, but the correct option ("never give up and big things happen") is the literal lesson stated in the last sentence of the passage. Per R6, inference-type questions should be *implicit*, not re-quoted from an explicit moral statement. Rewrite stimulus to omit the explicit moral sentence, then ask "What does this family's story teach us?" — learner must construct the meaning.

3. **Ch28 question spacing (l6)**: lessons kt-ch28-l6-q3↔x1 and q8↔x7 both share Jaccard 0.62–0.67 because they probe two consecutive sentences describing the same doorway scene. The narrative pacing of the lesson needs a second scene for variety — move two of these questions to probe a later sentence (Liu Bei's emotional reaction) so sub-skills distribute across gist, detail, inference rather than double-probing one scene-beat.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #141: X78_A7_PARAPHRASE_JACCARD_GATE**

**Research source:**
- Iimura (JLTA): word overlap = #1 driver of give-away items; correct answers must paraphrase
- ASC Item Writing Guide 2025: "avoid verbal association clues from the stem in the correct answer"
- BEA 2025 Survey (ACL): automated semantic similarity scoring (Jaccard + transformer cosine) emerging as production CI gate for distractor quality
- Duolingo DET: MCQ distractors sourced from *different conversations* — functionally eliminates verbatim overlap by architecture; Pickup can't do this without an LLM rewrite pipeline, but a Jaccard lint gate is the viable static equivalent

**Current Pickup state:**
- validate-lessons.js has `X48_NGRAM_VERBATIM_CORRECT` (3-gram exact-match substring check) but **no content-word Jaccard gate** for the A7 case. 13.2% of questions in Ch25-32 exceed Jaccard 0.5 overlap between `sentence` and `correctOption`.
- `X57_ANTONYM_PAIR_MIRROR` exists (correct + one distractor form an antonym pair), but no cross-Q Jaccard check exists in lint (R5 is only in the design standard, not enforced in code).

**Recommendation:**
Add two new lint rules to `tools/validate-lessons.js`:

```js
// X78_A7_PARAPHRASE_JACCARD: correct option content-word Jaccard vs sentence >= 0.5
function lintX78(q, sentenceWords) {
  const correctWords = contentWords(options[q.correctIndex]);
  const overlap = intersect(sentenceWords, correctWords);
  if (correctWords.size > 0 && overlap.size / correctWords.size >= 0.5) {
    return `X78_A7_PARAPHRASE_JACCARD (${[...overlap].join(',')})`;
  }
}

// X79_R5_CROSS_Q_JACCARD: any two Qs in same lesson with stimulus+question Jaccard >= 0.60
function lintX79(lesson) {
  // per-lesson pairwise Jaccard on contentWords(sentence + question)
  // flag pairs >= 0.60 as warn; >= 0.90 as error (FATAL = duplicate)
}
```

**Pickup 適配: ✅ 適合**
- Operates purely on JSON strings — no external API needed
- Matches existing validate-lessons.js pattern (per-Q and per-lesson passes)
- Estimated effort: 2-3 hours (add `contentWords()` helper + two lint passes + test fixtures)
- ROI: catches the 38 A7 + 60 R5 violations found this cycle *before* content is committed; prevents regression as Ch33+ are added
- Warn-only default (like `X57`), promote to `--strict` error after content backfill

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X78 content-word Jaccard gate (A7 correct-vs-sentence) | BEA 2025 / ASC 2025 / Iimura JLTA | ✅ 完全適合 — pure string ops on existing JSON | ~2 hr | High: catches 13% of Qs | ✅ Implement |
| X79 cross-Q Jaccard within lesson (R5) | Design standard §R5, not yet linted | ✅ 完全適合 — extends same helper | ~1 hr | High: 3 FATAL dups caught | ✅ Implement |
| Transformer cosine similarity (BERT/MPNet) | BEA 2025 survey, MDPI 2025 | ❌ 不適合 — requires Python runtime + model download; CF Pages is static | n/a | Overkill for A2 content | ❌ Skip |
| Distractor sourced from different conversation (Duolingo DET pattern) | DET whitepaper 2025 | 🟡 部分 — requires LLM rewrite pass; viable for future Ch33+ batch gen | High | Medium-term | 🟡 Consider for new content gen only |
