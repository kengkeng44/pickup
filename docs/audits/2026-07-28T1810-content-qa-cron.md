# Content QA — 2026-07-28 18:10 UTC

**Today's angle**: A3 — 語意 leak (story 跳針): Questions or distractors that reference narrative elements (characters, objects, motivations, resolutions) before they are established at that lesson's story position, or whose correct answers contradict the explicit story text.
**Focus**: Ch25–31 (Yugong, Archimedes, Journey to the West, Zhuge Liang, Odyssey, Heracles, Robin Hood)
**Scope**: 356 listen-mc + comprehension Qs across 49 lessons (7 chapters × 7 lessons)
**Auditor**: cron-content-qa automated session

---

## A. validate-lessons.js result

Build passes. Existing lint categories (X2/X48/X49/X49B/X57) report 440 mirror-lint issues across the full corpus (warn-only). No new schema failures. Relevant excerpt for focus chapters:

- Ch25–31 pass JSON shape validation ✓
- Existing X57 ANTONYM_PAIR_MIRROR and X49 STIMULUS_REUSE flags are pre-existing — not introduced by today's analysis

---

## B. Violation table

| Ch | Q ID | type | snippet (Q) | violation | 修法 | audio regen? |
|----|------|------|-------------|-----------|------|-------------|
| Ch31 | `kt-ch31-l3-x9` | comprehension | "Why did the Sheriff read the list?" | **P0 A3-CONTENT_MISMATCH**: CORRECT = "he was looking for people who owed money" — but the lesson narration explicitly says '"This boy helps the poor too much"' (political resistance, not debt). Children are taught a factually wrong motivation. | Change correct answer to "he was looking for people who helped the poor" (correctIndex → 0 if options restructured) | No |
| Ch26 | L2 narration + all L2-L3 Qs | narration + comprehension | `kt-ch26-l3-x7` etc. | **P1 A3-UNINTRODUCED_OBJECT**: "The crown" appears in L2 with definite article ("He left the crown on the table") before any narration establishes what the crown is, who gave it, or why Archimedes is studying it. Context (King Hiero → goldsmith fraud → Archimedes' task) only emerges in L4-L5. Children in L2-L3 hear "the crown" and "the puzzle" with no prior referent. | Add one opening narration at L2 start: "King Hiero had a new crown. He asked Archimedes: 'Is it really pure gold, or did the goldsmith cheat me?'" | No |
| Ch28 | `kt-ch28-l4-lg2` | comprehension | "Why did Liu Bei go alone through the snow, even when his brothers refused?" | **P1 A3-ANTICIPATORY_INFERENCE**: Stimulus sentence says "Liu Bei put on his coat and rode up the hill alone." The brothers' explicit refusal is only narrated in L4 (哥哥說放棄). In L3 the narration uses "we" ("Today we will visit") without showing the brothers declining. The lg2 question borrows L4 narrative context for a L3 question. | Change lg2 stimulus to a sentence from the L3 narration that is self-contained; or move this question to L4 where the brothers' refusal is explicit. | No |

### Verified non-violations (false-positive investigation)

| Ch | Suspected | Resolution |
|----|-----------|-----------|
| Ch29 L2-L3 | "home/Ithaca" in early Qs flagged as resolution spoiler | NOT a violation: the entire Odyssey premise is Odysseus longing for Ithaca. L2 narration opens "Odysseus's home was a small island called Ithaca." Mentions of home/Ithaca in early lessons establish the premise, not the resolution. ✓ |
| Ch27 L3 q6 | "his two close brothers" distractor anachronistic | NOT a violation: the distractor doesn't name specific future characters (Zhu Bajie, Sha Wujing). It's a generic wrong answer for "who was Sanzang with at night." No narrative spoiler. ✓ |

---

## C. Stats

| Category | Count |
|----------|-------|
| Chapters audited | Ch25–31 (7) |
| Lessons audited | 49 |
| Total MC/comprehension Qs | 356 |
| P0 violations | 1 |
| P1 violations | 2 |
| P2 violations | 0 |
| Cross-story contamination | 0 |
| Resolution spoilers in options | 0 |
| Confirmed false positives | 2 |

---

## D. Top 5 P0

1. **[P0] Ch31 `kt-ch31-l3-x9`** — `A3-CONTENT_MISMATCH`: Correct answer assigns financial-debt motivation ("owed money") to the Sheriff's list-reading; story explicitly shows political motivation ("helps the poor too much"). Children learn a wrong story fact.

> No further P0-tier violations found in Ch25–31. 3 narrative voice / pacing improvements follow (required even when P0 count < 3).

---

## E. Narrative Voice / Pacing Improvements (required — 3 proposals)

### NV-1: Ch26 L2 — Missing story setup (crown context gap)
**Problem**: L2 (苦思不得解) opens in medias res — Archimedes is already struggling with a mystery "puzzle" and "the crown." The background (King Hiero commissioned a crown and suspects silver was mixed in) is never narrated. Children hear "the crown" (definite, presupposed) without a referent.
**Evidence**: L2 first narration: "For days Archimedes sat at his desk and drew shapes on the floor." — *What* is he trying to solve? L3 narration only mentions "He left the crown on the table." The crown's context is revealed only in L4 comprehension question text ("If pure gold of the same weight pushed up less water, the crown was not pure").
**Fix**: Prepend one narration sentence at the start of L2:
> "The king had a new gold crown. 'Find out if it is real gold,' he told Archimedes. 'The goldsmith might have cheated me.'"
This establishes the referent for "the crown" and "the puzzle" before Archimedes starts struggling. No audio regen needed (narration-only fix).

### NV-2: Ch29 L5 — Missed inference opportunity at cliffhanger
**Problem**: L5 (海天遼闊) ends with a cliffhanger: "But far away on the line of the sea, a dark cloud began to grow..." This is excellent setup for L6's storm. However, all 8 comprehension questions in L5 ask only about the peaceful sailing — none ask children to predict or infer what the dark cloud signals. A prediction question here would build narrative anticipation and strengthen the L5→L6 transition.
**Fix**: Add one `comprehension` lg2-style inference question to L5:
- S: "But far away on the line of the sea, a dark cloud began to grow..."
- Q: "What might this dark cloud be warning the sailors about?"
- Correct: "trouble ahead on the sea" / Distractors: land nearby / more fish / sunset colours

### NV-3: Ch30 L4 `kt-ch30-l4-x4` — Sequence misrepresentation
**Problem**: Q: "What happened after Heracles shot all his arrows?" — but the story doesn't say Heracles exhausted his arrows before switching to the sword. The narration says "Heracles shot two more arrows. Both of them bounced off too." then "Heracles dropped his bow and reached for the sword." The framing "all his arrows" is inaccurate — he switched to the sword while still having arrows in his bag.
**Fix**: Change question to "What happened each time Heracles shot an arrow at the lion?" — same correct answer ("every shot bounced off without effect"), but matches the actual story sequence and doesn't misrepresent that his quiver was empty.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #215: X215_A3_NARRATIVE_POSITION_LINT — FairytaleQA `narrativeElement` field + CI position-guard

### Research Findings

**Source 1**: FairytaleQA (ACL 2022 + follow-ups through 2025) — 10,580 Q-A pairs from educational experts on 278 children's stories. Every question is tagged with a **narrative element type**: character | setting | action | feeling | causal | outcome-resolution | prediction. Questions are also tagged as **explicit** (answer directly in current passage) or **implicit** (inference required).

**Key design rule from FairytaleQA**: `outcome-resolution` questions are only created for the *final section* of a story. `prediction` questions appear at section transitions. Early sections only receive `character`, `setting`, `action`, `feeling`, `causal` questions. This directly prevents A3-type narrative leakage.

**Source 2**: "Advancing Question Generation with Joint Narrative and Difficulty Control" (arXiv 2506.06812, 2026) — proposes co-constraining narrative element type + difficulty level. Finding: `outcome-resolution` questions at A2 level are systematically harder than `detail` questions at the same surface difficulty, because they require integrating across the full story arc rather than the current sentence.

**Source 3**: 2026 NAEP Reading Framework — emphasizes that comprehension questions must be "grounded in the current text context" and not presuppose knowledge outside the passage under examination.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| Narrative Element Type tag per question (`narrativeElement: character \| setting \| action \| feeling \| causal \| outcome \| prediction`) | FairytaleQA ACL 2022 | ✅ 高 — Pickup lessons JSON already has `subSkill` + `tags` fields; adding `narrativeElement` is one more field per question. CI lint can validate that `outcome` + `resolution` questions appear only in final lesson (L6) per chapter. | Medium — tagging ~1500 Qs + CI rule | High — directly catches A3 class of violations automatically; also enables sub-skill balance reporting | Recommend |
| Explicit/Implicit tag (`explicitness: explicit \| implicit`) | FairytaleQA ACL 2022 | ✅ 中 — maps onto Pickup's existing `subSkill: detail \| inference`. Could use existing field instead of new one. Adds lint: ensure ≥30% implicit per lesson | Low — rename / remap `subSkill` inference → implicit | Medium | Optional (existing `subSkill` covers it) |
| Joint difficulty × narrative-element constraint | arXiv 2506.06812 | 🟡 部分適合 — useful for future content generation guidelines, but Pickup difficulty is set per Q by author. Framework says: `outcome` Qs should be `medium` or `hard`, never `easy`. Currently some outcome Qs may be tagged `easy`. | Low — add lint rule only | Medium | Add as lint warning |

**Proposed CI guard (ARCH-REC #215)**:

```javascript
// In validate-lessons.js — add after existing checks
// X215_A3_NARRATIVE_POSITION_LINT
for (const lesson of chapter) {
  const isLastLesson = lesson.lessonInChapter === maxLesson;
  for (const q of lesson.questions) {
    const ne = q.narrativeElement; // new field
    if (ne && ['outcome', 'resolution'].includes(ne) && !isLastLesson) {
      warn(lesson.id, q.id, 'X215_OUTCOME_IN_EARLY_LESSON', 
        'outcome/resolution question in non-final lesson — A3 risk');
    }
    if (ne === 'prediction' && lesson.lessonInChapter < 3) {
      warn(lesson.id, q.id, 'X215_PREDICTION_IN_VOCAB_LESSON',
        'prediction question in vocabulary-intro lesson — narrative mismatch');
    }
  }
}
```

**Pickup 架構適配 verdict**: ✅ Recommend adding `narrativeElement` field to `LessonQuestion` schema in `src/data/lessons.ts` (Zod schema extension, non-breaking — field is optional). New field: `narrativeElement: z.enum(['character','setting','action','feeling','causal','outcome','prediction']).optional()`. CI lint rule X215 catches A3-class violations automatically.

**CONSTRAINTS met**: No `src/` or `lessons-ch*.json` modifications in this cron — recommendation only.

---

## Sources

- [FairytaleQA Dataset (ACL 2022)](https://arxiv.org/pdf/2203.13947)
- [Advancing Question Generation with Joint Narrative and Difficulty Control (arXiv 2506.06812)](https://arxiv.org/pdf/2506.06812)
- [2026 NAEP Reading Framework](https://www.nagb.gov/content/dam/nagb/en/documents/publications/frameworks/reading/2026-reading-framework/NAEP-Reading-Framework-for-Board-Action.pdf)
- [Diversity Enhanced Narrative Question Generation for Storybooks](https://arxiv.org/pdf/2310.16446)
