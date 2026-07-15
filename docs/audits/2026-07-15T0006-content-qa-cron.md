# Content QA — 2026-07-15 00:06 UTC

**Today's angle**: R1 — Paraphrase Doctrine (Buck 2001 verbatim/near-verbatim echo ban)
**Focus**: Ch9-16 (MC-type questions: listen-mc, comprehension, listen-comprehension, grammar-mc)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Persistent structural violations remain (X2, X48, X49, X49B, X57 — tracked in earlier cycles). No new regressions introduced since 2026-07-14T1810 audit.

---

## B. Violation Table

### R1 Definition (Buck 2001, pickup-q-design-standard-v1 §R1)

The **TOP rule** in ELT item writing: the correct option MUST NOT be a verbatim substring of the stimulus sentence, NOR echo ≥75% of its content words. Options should paraphrase using synonym substitution, syntactic transformation (passive→active, noun→verb), nominalization, or pragmatic reformulation — *not* structural rearrangement of the same words.

Three sub-rules applied:
- **R1-strict**: `correct_option ⊆ sentence` (verbatim substring)
- **R1-near**: ≥75% content-word overlap between correct option and sentence
- **R1-struct**: shared 3-gram sequence between correct option and sentence (structural echo)

**Note on emoji-pick type**: P2 key-word echo in `emoji-pick` questions (e.g. "Which one shows a mirror?" → "🪞 mirror") is **intentional by design** — vocab-picture mapping tasks necessarily label the target word. Excluded from violation count.

### Scan results

| Type | Count |
|------|-------|
| Total MC questions scanned (Ch9-16) | 371 |
| P0 verbatim substring violations | 0 |
| P1 near-verbatim ≥75% overlap | 7 |
| P1+ structural 3-gram echo | 16 |
| P2 emoji-pick (design-intentional, excluded) | 10 |

### Violation Table (16 structural + 7 near-verbatim; top violations shown)

| Ch | Q ID | type | Sentence snippet | Correct option | 3-gram echo | Severity | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-------------|----------|------|--------------|
| 14 | kt-ch14-l3-x2 | comprehension | "The walls shone like pearl and the gates were made of shell." | "walls that shone like pearl" | `shone like pearl` (ratio=1.0) | **P0** | Replace with: "made of a pearl-like material" | No |
| 15 | kt-ch15-l4-x6 | comprehension | "All his men nodded fast. They all said it was lovely." | "nodded and said it was lovely" | `said it was lovely` (ratio=1.0) | **P0** | Replace with: "agreed the cloth looked beautiful" | No |
| 14 | kt-ch14-l5-x4 | comprehension | "She gave him a small red box tied with a gold rope." | "the gold rope" | ratio=1.0 | **P0** | Replace with: "a gilded cord" or "a yellow string tied around it" | No |
| 16 | kt-ch16-l7-x2 | comprehension | "This is a lucky mallet. It can grant a wish." | "able to grant a wish" | `grant a wish` | **P0** | Replace with: "it could make any wish come true" | No |
| 15 | kt-ch15-l6-x4 | comprehension | "But he has no clothes on! the child said in a clear voice." | "the emperor had no clothes on" | `no clothes on` | **P0** | Replace with: "the emperor was wearing nothing" | No |
| 9 | kt-ch9-l3-x2 | comprehension | "The king's son was going to have a big ball… Every girl in town was asked." | "every girl in the whole town" | `every girl in` (ratio=0.75) | P1 | Replace with: "all the young women nearby" | No |
| 9 | kt-ch9-l4-x2 | comprehension | "A kind old woman in a soft blue cloak stepped from the dark. No door opened. No window moved." | "no door or window had opened when she appeared" | `door`, `opened`, `window` (ratio=0.75) | P1 | Replace with: "she appeared through solid walls without entering" | No |
| 13 | kt-ch13-l7-x4 | comprehension | "Grandma sat up. The girl held her hand. Both could breathe again." | "both sat up and breathed again" | `sat`, `again`, `both` (ratio=0.75) | P1 | Replace with: "they were both safe and unharmed" | No |
| 14 | kt-ch14-l4-x4 | comprehension | "He walked in the coral garden with the princess." | "walked in the garden together" | `walked in the` | P1 | Replace with: "strolled through the palace grounds with her" | No |
| 14 | kt-ch14-l4-x6 | comprehension | "But in the quiet hours, he thought of his old mother." | "in the quiet moments" | `in the quiet` | P1 | Replace with: "during peaceful times" or "when everything was still" | No |
| 14 | kt-ch14-l6-q9 | listen-mc | "That name is in old stories. A long, long time ago." | "lives in old stories now" | `in old stories` | P1 | Replace with: "has become a legend of the past" | No |
| 15 | kt-ch15-l5-x6 | comprehension | "No one wanted to be the first to say something else." | "no one dared be the first to speak up" | `be the first` + `the first to` | P1 | Replace with: "everyone was too afraid to disagree" | No |
| 13 | kt-ch13-l4-x4 | comprehension | "He knocked on the wooden door. Knock, knock, knock." | "knocked on the front door" | `knocked on the` | P1 | Replace with: "rapped at her entrance" or "banged on her door" | No |
| 11 | kt-ch11-l6-q3 | listen-mc | "The nine fallen suns were his own children." | "the suns were his family" | `suns were his` | P1 | Replace with: "they were part of the royal household" | No |
| 16 | kt-ch16-l7-x4 | comprehension | "Soon he stood as tall as any young man." | "as tall as a normal young man" | `as tall as` (ratio=0.75) | P1 | Replace with: "full grown like any adult" | No |
| 12 | kt-ch12-l3-x7 | comprehension | "One day she came down on a long white cloud." | "rode down on a cloud" | `down on a` | P1 | Replace with: "descended from the sky on her cloud" | No |
| 13 | kt-ch13-l4-x7 | comprehension | "Back in the woods, the girl picked many bright flowers." | "picking flowers in the woods" | `in the woods` | P1 | Replace with: "gathering blossoms in the forest" | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total MC questions audited | 371 |
| R1 violations total | 23 (7 P1 content-word + 16 3-gram struct) |
| R1 violation rate | 6.2% |
| Chapters with 0 violations | Ch10 (clean), Ch11 (1 listen-mc P1) |
| Chapters with highest density | Ch14 (5 violations), Ch15 (3), Ch13 (3) |
| P0 (verbatim-equivalent) | 5 — all in Ch14-16 comprehension |
| audio regen required | 0 — all comprehension/listen-mc text-only fix |

**Pattern summary**: violations cluster in `comprehension` type (16/23). `listen-mc` contributes 2/23. Ch14 (Urashima Taro) has highest density — its distinctive phrasing ("shone like pearl", "gold rope", "quiet hours") appears to have been recycled into option text with minimal transformation.

---

## D. Top 5 P0

1. **kt-ch14-l3-x2** — "walls that shone like pearl" is a structural rearrangement of the sentence, not a paraphrase. 100% content-word ratio, 3-gram exact match. Fix: "made of a pearl-like material".

2. **kt-ch15-l4-x6** — "nodded and said it was lovely" assembles two verbatim fragments from consecutive sentences. Fix: "agreed the cloth looked beautiful".

3. **kt-ch14-l5-x4** — "the gold rope" is a direct 2-word excerpt. Fix: "a gilded cord".

4. **kt-ch16-l7-x2** — "able to grant a wish" echoes the sentence's "grant a wish" 3-gram with only auxiliary change. Fix: "it could make any wish come true".

5. **kt-ch15-l6-x4** — "the emperor had no clothes on" is the sentence with only pronoun-swap. Fix: "the emperor was wearing nothing at all".

---

## E. Narrative-voice & pacing improvements (even when no hard violation)

*(Required: ≥3 per cycle, even with zero violations)*

1. **kt-ch12-l5-x2** — "sat weeping by the river" is grammatically fine but PASSIVE-feeling for A2 children. Reframe as active: "cried at the river's edge for many days" — more Ghibli-pacing.

2. **kt-ch10-l3-x6** — "Chang'e was alone with the pill and no one to protect her" — adult-register phrasing ("no one to protect her") for an 8-12 audience. Better: "Chang'e was at home all by herself, with the magic pill nearby".

3. **kt-ch11-l6-q3** — "the suns were his family" — slightly abstract for A2. More concrete and child-friendly: "the fallen suns were his own sons" (makes the emotional stakes clearer for young readers).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #158: FairytaleQA-inspired `evidenceSpan` + `questionCategory` metadata fields

**Source research**: FairytaleQA (Xu et al., ACL 2022 — IBM Research) is the authoritative children's narrative comprehension QA dataset for K-8 learners. Its core annotation schema adds two fields to every question: (1) `evidenceSpan` — the exact sentence fragment(s) from the text that contain the answer; (2) `questionCategory` — one of 7 narrative element types (character, setting, feeling/attitude, causal-relationship, outcome-resolution, prediction, action). This schema has been extended to multilingual (ECTEL 2024) and is directly applicable to Pickup's story-driven architecture.

**Why this matters for Pickup today**: The R1 audit found 23 violations in Ch9-16, but 10 emoji-pick cases were confirmed false positives because we lacked a way to distinguish "the tested span is the word itself" (emoji-pick vocabulary task) from "the tested span is a sentence extract" (comprehension echo). Adding `evidenceSpan` to each comprehension question would let the lint tool check paraphrase against only the relevant portion of the sentence — eliminating false positives and surfacing more precise violations.

**Additionally**: `questionCategory` would enable automated R6 sub-skill auditing — currently R6 compliance (≥3 gist, ≥5 detail, ≥2 inference) is estimated by type; with narrative categories we can verify it precisely per chapter.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| FairytaleQA `evidenceSpan` + `questionCategory` fields | https://arxiv.org/abs/2203.13947 (ACL 2022) | ✅ Full — JSON-additive (Zod schema `z.string().optional()`), no src/ changes, no audio regen | Medium: ~2h Zod schema + lint rule; ~1h/chapter to annotate | ⭐⭐⭐ Precision R1 lint + R6 analytics + aligns with K-8 best practice | ✅ Implement for new chapters; backfill existing on content sprint |

**Concrete implementation for lessons JSON**:
```json
{
  "id": "kt-ch14-l3-x2",
  "type": "comprehension",
  "sentence": "The walls shone like pearl and the gates were made of shell.",
  "question": "What were the walls made of?",
  "evidenceSpan": "The walls shone like pearl",
  "questionCategory": "setting",
  "options": ["made of a pearl-like material", ...],
  "correctIndex": 0
}
```

**Lint rule addition** (tools/validate-lessons.js):
```js
// R1-precision: if evidenceSpan present, check correct option against span (not full sentence)
if (q.evidenceSpan) {
  const span = q.evidenceSpan.toLowerCase();
  const correct = options[q.correctIndex].toLowerCase();
  if (correct.includes(span) || span.includes(correct)) {
    warn(lid, qid, 'X58_EVIDENCE_SPAN_VERBATIM', `correct option verbatim from evidenceSpan`);
  }
}
```

**Sources**:
- FairytaleQA (ACL 2022): https://arxiv.org/abs/2203.13947
- FairytaleQA Translated / ECTEL 2024: https://arxiv.org/html/2406.04233
- Buck, G. (2001). *Assessing Listening*. Cambridge University Press: https://www.cambridge.org/core/books/assessing-listening/3F31B7309BFB98DE76B276E9C2E43CB9
- Duolingo English Test Listening Whitepaper (2026): https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf
