# Content QA — 2026-06-14 00:12 UTC

Today's angle: **A5 — Cultural Reference (Schema Presupposition Bias)**
Focus: **Ch5 (Baba Yaga), Ch6 (Six Swans), Ch7 (Yexian), Ch9 (Cinderella), Ch10/11 (嫦娥/后羿), Ch14 (Urashima Tarō), Ch16 (Issun-Boshi)**

> **A5 rotation history**: First dedicated A5 pass.
>
> **Angle definition**: A question has an A5 Cultural Reference violation when:
> - **(A5a) Unfamiliar-culture give-away**: the correct option can be selected because a test-taker recalls a folk tale they already know — not because they comprehended the audio. The cultural schema substitutes for listening.
> - **(A5b) Unfamiliar-culture confusion**: a distractor uses an iconic cultural prop/role from the source folk tale in a way that causes plausible confusion for children who have partial prior knowledge, making the item **harder or easier** for the wrong reason.
> - **(A5c) Familiar-culture over-easy**: for Taiwanese children, certain Chinese mythology questions are trivially answerable from school curriculum (玉兔, 嫦娥, 玉皇大帝) — cultural knowledge partially short-circuits the listening task.
> - **(A5d) Cross-question dependency**: the sentence of a question does NOT contain enough information to derive the correct answer; the correct answer depends on forward-context from the next sentence, and the explanationZh reveals this with "(see Q4)" or similar. Related to A5 because culturally-informed children fill this gap with folk-tale knowledge.
>
> **Source authority**: "A fair assessment should avoid requiring knowledge that is construct-irrelevant to what is being measured" (Identifying Causes of Test Unfairness, arXiv 2601.13449). ETS item-writing doctrine: each item must be **self-contained** with respect to the audio stimulus. Duolingo cultural auditing process: "review AI outputs for dialectical appropriateness and cultural sensitivity" (Dr. Philippa Hardman 2025 substack analysis of Duolingo AI).

---

## A. validate-lessons.js result

```
OK  lessons-ch5.json:  7 lessons  (JSON shape + mirror + extended lint)
OK  lessons-ch6.json:  7 lessons  (JSON shape + mirror + extended lint)
WARN lessons-ch7.json:  1 lint issue(s):
  kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she") — pre-existing
OK  lessons-ch9.json:  7 lessons
OK  lessons-ch10.json: 7 lessons
OK  lessons-ch11.json: 7 lessons
OK  lessons-ch14.json: 7 lessons
OK  lessons-ch16.json: 7 lessons

Total new A5 violations detected: 8 (manual detection; 0 currently linted)
CI does NOT lint A5_CULTURAL_SCHEMA — 0 auto-flagged.
```

---

## B. Violation table

| Ch | Q ID | Type | Sentence (excerpt) | Violation | 修法 | audio regen? |
|----|------|------|--------------------|-----------|------|--------------|
| 5 | kt-ch5-l4-q3 | listen-mc | "In front of her stood a fence, but it was not made of wood." Q: "What was the fence made of?" ✓: bones | **P0 A5d** — The sentence only states what the fence is NOT made of. The answer "bones" is supported by the *next* sentence (q4: "On each post sat a skull"). The explanationZh confirms cross-question dependency: "(see Q4)". Children who know Baba Yaga's iconic bone-fence immediately answer from cultural schema; children who don't are left without audio support. | Move question to q5's position, AFTER sentence "On each post sat a skull" has been narrated. New sentence anchor: "The fence was not wood. Each post had a skull on top." Rewrite Q: "What was the fence made of?" → same options, now self-contained. | No (text edit only) |
| 5 | kt-ch5-l5-q9 | listen-mc | "She turned her head left and right, breathing in the air." Q: "What was Baba Yaga doing?" distractor 0: "looking for her broom" | **P1 A5b** — "looking for her broom" is an iconic Baba Yaga cultural prop (her mortar-and-pestle / broom transportation is canonical in Russian folk lore). Taiwanese 8-12 children who have partial exposure to Baba Yaga stories (via other books or media) may treat this as a plausible "folk-tale correct" answer rather than eliminating it from audio evidence alone. This distractor tests folk-tale schema, not listening. | Replace "looking for her broom" → "standing very still" or "listening for a voice" — removes folk-tale icon, keeps semantic plausibility as an inference distractor. | No |
| 14 | kt-ch14-l7-q9 | listen-mc | "When the wind cleared, he was a very old man with a long beard." Q: "How did Urashima change?" distractor 0: "became a small turtle" | **P1 A5b** — "became a small turtle" reuses the central animal character of the story (the rescued sea turtle) as a transformation endpoint. Some East Asian versions of Urashima Tarō or related tales (浦島太郎 has Korean and Chinese cousins) include animal transformation. For children who've heard any version involving the turtle, this distractor conflates the turtle character with transformation possibility. Audio sentence is unambiguous ("very old man with a long beard"), but the distractor creates unnecessary cultural noise. | Replace "became a small turtle" → "turned into a young boy" — tests a plausible (but audio-refuted) time-reversal idea; removes the turtle-conflation. Retains inference challenge. | No |
| 16 | kt-ch16-l4-q9 | listen-mc | "Issun stood up on the princess and watched the road." Q: "Where did Issun stand?" ✓1: "next to her ear" distractor 0: "inside her sleeve" | **P1 A5b + A5d** — Two violations. (1) "Inside her sleeve" draws on Japanese kimono cultural schema (wide sleeves as carrying/hiding spaces for small objects — a common trope in Japanese folk tales). Children with any exposure to Japanese folk or anime may find this plausible for a thumb-sized character. (2) The correct answer "next to her ear" is NOT directly stated in the audio sentence — "stood up on the princess" does not specify WHERE on her body. The explanationZh asserts "耳朵旁邊 (paraphrase)" but this is an inference unsupported by the sentence itself. Dual gap: cultural noise + weak anchor. | Fix A5d: rewrite sentence to "Issun stood up on her shoulder, near her ear, and watched the road." — directly anchors "next to her ear." Fix A5b: replace "inside her sleeve" → "under her hat" (culturally neutral, plausible for a tiny person). | Yes (sentence change) |
| 16 | kt-ch16-l4-q9 | listen-mc | (same Q) distractor 2: "in his rice bowl" | **P2 A5b (A7 echo)** — "in his rice bowl" reuses Issun-Boshi's iconic rice-bowl boat prop from earlier in the story. It's not a current-scene location, but children who vividly remember the "rice bowl boat" from lesson 3 may over-anchor to it. This also qualifies as A7 content-word repetition across story segments. | Replace "in his rice bowl" → "on a low branch above her" — removes rice-bowl callback, stays plausible for a tiny person. | No |
| 10 | kt-ch10-l7-q3 | listen-mc | "A small white rabbit lived there. It came to her." Q: "Who did Chang'e meet on the moon?" ✓1: "tiny soft creature" | **P1 A5c (familiar-culture over-easy)** — 玉兔 (the Moon Rabbit) is a central fixture of Mid-Autumn Festival (中秋節) culture in Taiwan, taught in preschool and elementary school. Taiwanese children instantly know "the rabbit on the moon" — this question may be answerable from cultural knowledge alone without processing the English audio. The paraphrase "tiny soft creature" is still appropriate but the cultural over-familiarity reduces the listening demand for this audience. | Add a second audio-dependent inference question about the RABBIT'S BEHAVIOR ("What did the rabbit do when Chang'e arrived?") where cultural knowledge does NOT supply the answer. Keep this Q but be aware it scores at floor difficulty for Taiwanese children — mark as difficulty: easy. | No (schema change only) |
| 11 | kt-ch11-l6-q3 | listen-mc | "The nine fallen suns were his own children." Q: "Why was the Jade Emperor upset?" ✓1: "the suns were his family" | **P2 A5c** — Taiwanese primary-school curriculum (國語, 社會) teaches 嫦娥奔月 and 后羿射日, including that the suns are the Jade Emperor's sons (天帝的兒子). Students may answer from memorized knowledge. The sentence is explicit ("nine fallen suns were his own children"), so audio comprehension IS supported — but cultural familiarity removes the inference challenge entirely. | Mark as difficulty: easy (already medium). Consider adding a follow-up Q requiring audio-only evidence: "What did the Jade Emperor do to punish Hou Yi?" — cultural knowledge here is less deterministic. | No |
| 6 | kt-ch6-l4-q6 | listen-mc | "To set them free, she had to sew six shirts from a sharp white flower." Q: "What did she need to do to save them?" ✓2: "make clothes from petals" distractor 1: "find six golden rings" | **P2 A5b** — "find six golden rings" and "find a magic stone" (option 3) are generic European fairy-tale schema distractors (rings = folk-magic, stone = magic artifact). A Taiwanese child who has heard Western fairy tales may be MORE likely to treat "find golden rings" as plausible (folk-tale pattern matching) than children without such exposure. The sentence is clear, so this is low-severity, but the distractors rely on European fairy-tale schemas to seem plausible. | Moderate revision: replace "find six golden rings" → "say six magic words" and "find a magic stone" → "weave cloth from river water" — removes European schema, keeps inferential difficulty from audio. | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 8 (Ch5/6/7/9/10/11/14/16) |
| Lessons scanned | 56 |
| Questions with 4+ options | ~134 |
| A5 violations found | 8 |
| P0 (critical, question restructure needed) | 1 (Ch5 q4-q3) |
| P1 (high, fix options or sentence) | 4 (Ch5, Ch14, Ch16 ×2) |
| P2 (medium, note + minor improvement) | 3 (Ch10, Ch11, Ch6) |
| audio regen needed | 1 (kt-ch16-l4 sentence change) |
| CI coverage for A5 | 0% (not linted) |
| Most affected chapter | **Ch5 (Baba Yaga) — 2 violations; most culturally unfamiliar** |
| Inverse A5 risk | **Ch10/11 (嫦娥/后羿) — culturally over-familiar to Taiwanese children** |

**Pattern**: Two distinct risk directions exist in the Pickup story corpus:
- *Unfamiliar-culture chapters* (Baba Yaga, Six Swans, Urashima Tarō, Issun-Boshi): risk of culturally-loaded distractors creating unfair difficulty/confusion
- *Familiar-culture chapters* (嫦娥, 后羿, 牛郎織女): risk of questions being too easy for Taiwanese children because cultural schema fully substitutes for audio comprehension

---

## D. Top 5 P0

1. **⚠️ P0 kt-ch5-l4-q3** `baba-yaga` — Question's correct answer ("bones") unsupported by its own sentence; requires forward reference to q4. Children with Baba Yaga knowledge answer from cultural schema; children without it have no audio support. Restructure: anchor question to the skull sentence instead.

2. **P1 kt-ch16-l4-q9** `issun-boshi` — Double violation: distractor "inside her sleeve" exploits Japanese kimono cultural schema; correct answer "next to her ear" not directly stated in audio. Sentence needs rewrite for audio anchor + distractor swap.

3. **P1 kt-ch5-l5-q9** `baba-yaga` — Distractor "looking for her broom" is Baba Yaga's canonical prop; creates cultural-schema noise for children with any prior exposure to Russian folk tales.

4. **P1 kt-ch14-l7-q9** `urashima` — Distractor "became a small turtle" conflates the central turtle character with possible transformation endpoint. Fix: replace with time-reversal distractor "turned into a young boy."

5. **P1 kt-ch10-l7-q3** `change` — Inverse A5: 玉兔 (Moon Rabbit) is so deeply embedded in Taiwan Mid-Autumn culture that Taiwanese children answer without processing English audio. Difficulty annotation fix (easy) + follow-up Q on rabbit behavior needed.

---

## E. Narrative Voice / Pacing Improvements (required even if 0 R1-R8 violations)

1. **kt-ch5-l4 explanationZh "(see Q4)"** — Cross-question jargon break. The explanationZh for kt-ch5-l4-q3 currently reads "不是木頭 → 骨頭(see Q4)。" This is internal production-note language leaking into learner-facing content. Rewrite to: "不是木頭 → 骨頭!Baba Yaga 的院子用骨頭圍著 — 聽故事時注意每根柱子上的東西。" This adds cultural narrative context rather than a cross-reference pointer.

2. **kt-ch14-l1 narration: Urashima Taro name introduction** — The narration sentence "His name was Urashima Taro." (kt-ch14-l1-q3, type=narration) has a blank explanationZh. For a Japanese name unfamiliar to Taiwanese children, the explanationZh should provide a cultural bridge: "浦島太郎 — 日本著名的民間故事主角,就像台灣的『田螺姑娘』一樣,是被人記了很久很久的故事。" This builds cultural schema before the story begins, rather than leaving "Urashima Taro" as an opaque foreign name.

3. **Ch16 pacing gap: L4→L5 story arc** — Lessons 4 (Issun arrives in the big city, finds work at a noble house) and 5 (Issun fights the demon) transition without an intermediate beat establishing HOW and WHY Issun encounters the demon. The first sentence of L5 introduces "He had two horns and sharp teeth" (the demon) cold. Add a transitional narration sentence at L5-q2: "One afternoon, a demon came to the noble house where Issun worked." This gives children a scene-setting anchor before the conflict begins — currently the demon appears without spatial/temporal context, breaking narrative flow for young listeners.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #31: `culturalLoad` schema field + A5_CULTURAL_SCHEMA lint gate

**Sources**:
- "A fair assessment should avoid requiring knowledge that is construct-irrelevant to what is being measured" — Identifying Causes of Test Unfairness (arXiv:2601.13449, 2026)
- "Addressing Cultural Bias in ELT Materials" — ResearchGate 2022; pre-development cultural self-check recommended as best practice
- Duolingo's AI-driven process includes "cultural auditing to review AI outputs for dialectical appropriateness and cultural sensitivity" (Dr. Philippa Hardman 2025 substack)
- BenchMarker toolkit (arXiv:2602.06221, 2026): automated MCQ quality pipelines now tag "construct-irrelevant cuing" including cultural schema leakage as a measurable item flaw category

**Gap in current schema**: The `LessonSchema` (src/data/lessons.ts) and lesson JSON files have no field to track whether a question presupposes cultural knowledge that is:
- **unfamiliar** to the target audience (8-12 Taiwanese children) — risks A5b confusion
- **highly familiar** — risks A5c over-easy floor effect

**Current workaround**: Manual audit only. This audit is the FIRST A5 pass across ~134 questions in 8 chapters, finding 8 violations. Without schema support, the next item writer has no guardrails.

**Proposed schema addition** (additive, no breaking change):

```typescript
// In LessonSchema question union
culturalLoad?: 'high_unfamiliar' | 'high_familiar' | 'low';
// high_unfamiliar: non-Taiwanese folk tale prop/role — must be audio-only supported
// high_familiar: Taiwanese curriculum known concept — difficulty floor risk
// low (default): no cultural presupposition
```

**Proposed lint rule** (add to `tools/validate-lessons.js`):

```js
// A5_CULTURAL_SCHEMA: if culturalLoad === 'high_unfamiliar', correct answer MUST be
// substring-supported or paraphrase of the sentence (R1 + looser Jaccard < 0.2 to sentence)
// If culturalLoad === 'high_familiar', mark Q as difficulty: easy and warn if medium/hard
if (q.culturalLoad === 'high_unfamiliar') {
  const corrWords = contentWords(correct);
  const sentWords = contentWords(q.sentence);
  const overlap = corrWords.filter(w => sentWords.includes(w)).length / corrWords.length;
  if (overlap < 0.25 && !sentWords.some(w => correct.toLowerCase().includes(w))) {
    warn(qId, 'A5_CULTURAL_SCHEMA', 'high_unfamiliar Q: correct option not audio-anchored');
  }
}
if (q.culturalLoad === 'high_familiar' && q.difficulty !== 'easy') {
  warn(qId, 'A5_HIGH_FAMILIAR_DIFF', 'high_familiar Q should be marked difficulty: easy');
}
```

**Pickup fit**:

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| `culturalLoad` schema field + A5 lint | arXiv 2601.13449 / Duolingo cultural audit / BenchMarker 2026 | ✅ Additive field on existing Zod schema, ~30 lines lint; already has culturally-diverse 31-chapter corpus with clear high/low load chapters | M (2–3 hr: schema field + populate Ch5/10/11/14/16 + lint) | ⭐⭐⭐ — prevents future Baba Yaga / 玉兔 class of violations; scales as Ch22-31 historical stories are added | ✅ Recommend |

**Would have caught**: kt-ch5-l4-q3 (P0★), kt-ch16-l4-q9 (P1), kt-ch10-l7-q3 (P1 inverse) — 3 of the 5 top violations in this audit.

**Implementation sequence**:
1. Add `culturalLoad?: 'high_unfamiliar' | 'high_familiar' | 'low'` to question union in `src/data/lessons.ts` Zod schema
2. Populate `high_unfamiliar` on Ch5 (baba-yaga), Ch6 (six-swans), Ch14 (urashima), Ch16 (issun-boshi) questions involving named cultural props
3. Populate `high_familiar` on Ch10/11 questions involving 玉兔, 玉皇大帝 by name
4. Add lint gate in `tools/validate-lessons.js`
5. Apply fixes to the 8 violations found in this audit

---

*Audit generated: 2026-06-14T00:12 UTC | Angle: A5 Cultural Reference | Chapters: Ch5/6/7/9/10/11/14/16 | 56 lessons, ~134 4-option Qs scanned*
