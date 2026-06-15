# Content QA — 2026-06-15 18:00 UTC

**Today's angle: A3 — Semantic Leak / Story 跳針 (Narrative Continuity)**
**Focus: Ch10–17** (Chang'e, Hou Yi, Niulang & Zhinu, Little Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-Boshi, Crane Wife)

> **Rotation context**: Recent crons covered A1 (Ch9-18), R1 (Ch1-8), A6 (Ch19-26), R2, A2, A5, A7, A4.
> A3 not visited in this window. Target: Ch10–17 — 8 chapters × 7 lessons × ~11 Q = ~616 Q reviewed.
>
> **A3 Definition**: Fires when a question or explanationZh **references an entity, event, or story-concept not yet established in the lesson's narration flow up to that point**. Sub-types:
> - **A3-ENTITY-JUMP**: Question names a character or object that hasn't been introduced in prior narrations of this lesson
> - **A3-MAGIC-NOSCAFFOLD**: Supernatural element appears in a question without any prior foreshadowing in L1-L(n-1)
> - **A3-TF-DOUBLE-NEG**: listen-tf sentence makes an affirmative claim but correct = No, requiring the learner to infer a *negative implicit question* (e.g., "sentence: he helped → No → [implicit: was he useless?] → No"). Creates 3-hop inference chain that exceeds A2 child processing capacity.
> - **A3-CONTEXT-SHIFT**: Question pivots from story-comprehension to real-world moral/application without narrative marker
>
> **Method**: Full narration-sequence read for each lesson (not just interactive Qs); verified referents of pronouns + possessives; checked implicit TF question against sentence polarity.
>
> **Full narration access**: python3 script extracted all `[narration]` + `[listen-*]` + `[emoji-pick]` entries in order for 56 lessons.

---

## A. validate-lessons.js result

```
WARN lessons-ch10.json: 1 lint issue(s):
  kt-ch10-l7-q7: X2_OPTION_LIST_BIAS (all start with "to")
OK  lessons-ch11.json
OK  lessons-ch12.json
OK  lessons-ch13.json
OK  lessons-ch14.json
OK  lessons-ch15.json
WARN lessons-ch16.json: 1 lint issue(s):
  kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")
OK  lessons-ch17.json

Total mirror-lint issues in focus range: 2 (both X2_OPTION_LIST_BIAS only)
No R1_SUBSTRING / X3_R1_VERBATIM_WORDS in Ch10–17.
```

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| Ch12 | kt-ch12-l5-q5 | listen-tf | "The old cow opened her mouth. Words came out clear." → **No** | **A3-P1★ MAGIC-NOSCAFFOLD**: The cow's speech ability appears without any magical foreshadowing in Ch12-L1–L4. Learner has only seen the cow as a farm animal. TF correct=No implies "this is not a normal cow" — but the learner has no contextual anchor for that inference. | Add 1 foreshadowing narration at the end of Ch12-L1: *"The old cow had soft wise eyes. Almost like she understood what he said."* | No |
| Ch16 | kt-ch16-l2-q5 | listen-tf | "He helped at home. He made his mother laugh." → **No** (he IS useful) | **A3-P1★ TF-DOUBLE-NEG**: Sentence makes two affirmative positive claims. Correct=No requires inferring the hidden negative question "Was he useless despite being tiny?" — then negating it. 3-hop chain: affirmative sentence → infer negative Q → negate → No. An 8-12 child at A2 will answer "Yes" (he helped!) and be wrong. | Option A (quick): Flip to `correctIndex: 0` (Yes) and rewrite ExplZh "幫忙+逗媽媽笑 → 有用 → 答 Yes". Option B (better): Add `stem` field: *"Was Issun too small to help his family?"* → learner answers No → direct 1-hop inference. | No |
| Ch17 | kt-ch17-l3-q5 | listen-tf | "They lived together like a real family every day." → **No** (he is not lonely) | **A3-P1★ TF-DOUBLE-NEG**: Affirmative sentence ("like a real family") → No. ExplZh "一家人 → 不孤單 → 答 No" = 3-hop: affirm sentence → infer "Was he lonely?" → negate → No. Same pattern as Ch16-l2-q5. | Option A: Flip sentence to explicitly mark the contrast: *"He had been alone. Now someone was here."* → Yes. Option B: Add `stem`: *"Was the old man still lonely?"* → No. | No |
| Ch14 | kt-ch14-l6-q3 | listen-tf | "The sun was bright. The sand looked just the same." → **No** (things have changed) | **A3-P1 TF-DOUBLE-NEG**: Surface appearance (sand same) → No (everything NOT the same). Sentence describes similarity but correct=No says the opposite. ExplZh "just the same → 沒變 → 答 No" is internally inconsistent: "looked the same → answer 'No, not the same.'" | Add explicit contrast in sentence: *"The sand looked the same. But something felt very wrong."* → No. Or add `stem`: *"Was everything really the same as before?"* | No |
| Ch13 | kt-ch13-l3-q10 | emoji-pick | "Should you tell a stranger where you are going?" → ❌ no never | **A3-P1 CONTEXT-SHIFT**: Pivots from story-comprehension to real-world safety lesson without narrative marker. Prior q9 tests story inference; q10 suddenly asks learner to apply a moral. Breaks story immersion mid-lesson for a child reader. | Move safety message to a dedicated **outro narration beat** after the lesson (e.g., "奶奶說:記得,不要告訴陌生人你要去哪裡。") and replace q10 with a story-inference emoji-pick (e.g., "How did the girl feel when she talked to the wolf?" → 😊 friendly / 😰 scared / 😕 unsure / 🙃 silly). | No |
| Ch12 | kt-ch12-l5-q10 | emoji-pick | "What does the old cow do for Niulang?" → 🐄 helps him fly | **A3-P1 (RESOLVED, see note)**: ExplZh "皮讓他飛上天" is **fully scaffolded** — q1 tap-pairs pre-teaches 皮/skin; q6 narration says "Take my soft skin, wear it like a cloak"; q8 narration says "Niulang put on the soft skin." Content is fine. **No fix needed.** | N/A — no action | No |

> **Note on Ch11-L6 (previously flagged)**: After reading full narration, kt-ch11-l6-q3 ("The nine fallen suns were his own children") and kt-ch11-l6-q5 ("Hou Yi saved the land. The Emperor still took his place away.") are **NOT violations**. q2 narration "The Jade Emperor was not happy with Hou Yi" + q4 narration "You cannot be a god any more" properly scaffold both questions. The Jade Emperor referent and Hou Yi's divine status are established *before* the interactive questions test them.

> **Note on kt-ch12-l3-q7** ("How did the Heavenly Queen come down?"): Scaffolded by q6 narration "One day she came down on a long white cloud." — no A3 issue. (Does have A7 content-word-repetition tell: cloud → cloud, but that's out of scope for this angle.)

> **Note on kt-ch11-l7-q7** ("He looked at it some nights in the soft lamp light."): q6 narration "Hou Yi kept his big red bow on the wall" establishes the referent. "It" = the bow. Fully scaffolded.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters reviewed | 8 (Ch10–17) |
| Lessons reviewed | 56 (7 × 8) |
| Questions reviewed | ~616 (56 × ~11) |
| P0 violations | **0** |
| P1★ violations (high-priority) | **3** |
| P1 violations | **2** |
| P1 RESOLVED (initial false positives) | 3 (Ch11-L6-q3, Ch11-L6-q5, Ch11-L7-q7, Ch12-L5-q10) |
| **Systemic finding** | listen-tf implicit-question pattern (no stated stem) — affects ~200 TF Qs across 31 chapters |

---

## D. Top 5 P0 / P1★

| # | ID | severity | description |
|---|-----|----------|-------------|
| 1 | kt-ch16-l2-q5 | P1★ | Double-negative TF in Issun-Boshi ch.2 — highest UX impact for 8-12 children; likely to produce systematic wrong answers |
| 2 | kt-ch17-l3-q5 | P1★ | Same double-negative TF pattern in Crane Wife — child says "Yes they're a family!" correct is No |
| 3 | kt-ch14-l6-q3 | P1★ | Surface/deep ambiguity TF in Urashima ch.6 — "looked the same → No" is internally contradictory without stem |
| 4 | kt-ch12-l5-q5 | P1★ | Magical talking cow with no prior foreshadow — learner has no anchor for "No, not a normal cow" |
| 5 | kt-ch13-l3-q10 | P1 | Story→safety-lesson context shift without narrative marker mid-lesson |

---

## E. Narrative Voice / Pacing Improvements (0-violation minimum: 3 proposals)

Even with no P0 violations, the following pacing improvements would strengthen the Ghibli-warm storytelling register for 8-12 children:

1. **Ch12-L5 — Cow sacrifice exit beat**: q11 narration ends "The cow watched him rise. She did not speak again. Why…" — a beautiful ellipsis. BUT the lesson immediately ends without emotional closure on the cow's sacrifice. Consider extending: *"She closed her soft brown eyes. Niulang rose higher. He did not look back. He could not."* — gives the child a moment to feel the loss before the next lesson.

2. **Ch11-L6 — God-to-mortal emotional landing**: The lesson ends with "The sky was no longer home. The earth was new…" — good but cool. The pivot from divine to mortal is one of the most emotionally weighty beats in the corpus. A Ghibli-warm addition: *"He looked at his hands. They were just hands now. He looked at Chang'e. She was still there."* — anchors the loss in a relational warmth.

3. **Ch17-L7 — Final departure narration**: "The sky is empty. But what did we learn from her?" — the meta-question ("what did we learn?") breaks story-voice immersion. Replace with story-voice close: *"The old man held the cloth to his chest. It was still warm. Outside, the snow had stopped. The world was very quiet."* — lets the child sit in the feeling without being told how to interpret it.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #37: `stem` field in `listen-tf` schema (Explicit TF Question Stem)

**Problem**: The `listen-tf` question type across all 31 chapters uses an **implicit question** that learners must infer from context. The `sentence` field contains the audio stimulus, and `options: ["Yes", "No"]` are the choices — but the actual question being asked is **never shown**. It lives only in `explanationZh` as a reverse-engineered hint AFTER the learner has already answered.

This creates:
- **A3 violations** (this audit): 3 confirmed TF double-negative failures (kt-ch16-l2-q5, kt-ch17-l3-q5, kt-ch14-l6-q3)
- **Corpus-wide risk**: ~200 TF questions across 31 chapters — unknown count of additional double-negatives
- **A2 child processing overload**: Young EFL learners rely on surface-level cues (Joo 2025, *IJAL* — task complexity effects on young EFL learners' listening metacognition). Adding an implicit-question inference step on top of L2 comprehension exceeds working-memory capacity for 8-12 target audience.
- **Duolingo Stories divergence**: Duolingo Stories (direct competitor) uses **explicit comprehension check questions** — "Which of these did [character] say?" / "Why did she leave?" — never implicit frames. (Source: ResearchGate review of Duolingo Stories feature, confirmed design pattern.)

**Proposed change**: Add `stem?: string` to `listen-tf` union in LessonSchema:

```ts
// src/data/lessons.ts — LessonSchema discriminated union, listen-tf branch
z.object({
  type: z.literal('listen-tf'),
  id: z.string(),
  sentence: z.string(),
  stem: z.string().optional(),       // ← ADD: the explicit Yes/No question
  options: z.tuple([z.string(), z.string()]),   // always ["Yes","No"]
  correctIndex: z.union([z.literal(0), z.literal(1)]),
  explanationZh: z.string().optional(),
  // ... rest unchanged
})
```

**Renderer change** (`LessonPage.tsx` or `renderers.tsx`):
```tsx
// In ListenTfRenderer: show stem above Yes/No buttons when present
{question.stem && (
  <p className="tf-stem">{question.stem}</p>
)}
```

**Content backfill**: New lesson writes should include `stem`. Existing TF questions can be backfilled gradually — the field is optional so existing JSON continues to validate.

**Examples (backfill targets)**:

| Q ID | stem (suggested) |
|------|-----------------|
| kt-ch16-l2-q5 | "Was Issun too small to help his family?" |
| kt-ch17-l3-q5 | "Was the old man still lonely now?" |
| kt-ch14-l6-q3 | "Was everything really the same as before?" |
| kt-ch12-l5-q5 | "Was the cow a normal farm animal?" |

**Pickup architecture compatibility**: ✅ Fully compatible.
- Zod schema: additive optional field, backward-compatible
- LessonSchema discriminated union: already well-typed
- Renderer: 3-line conditional display
- validate-lessons.js: no changes needed (optional field)
- JSON lesson files: gradual backfill, no bulk rewrite required

**Effort**: S (30 min for schema + renderer) + M (3-4 hr to backfill ~200 TF Qs with stems — can be done chapter-by-chapter)

**ROI**: ⭐⭐⭐ HIGH
- Eliminates A3-TF-DOUBLE-NEG violation class entirely
- Reduces wrong-answer rates for 8-12 child audience (Joo 2025: task complexity directly predicts errors in young EFL listeners)
- Aligns with Duolingo Stories industry standard
- Surfaces the ExplZh inference logic BEFORE the answer instead of after
- One implementation → fixes ~200 TF Qs gradually

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Explicit `stem` field in listen-tf | Duolingo Stories design; Joo 2025 IJAL; Buck 2001 | ✅ fully compatible, backward-safe, additive | S schema+renderer; M content backfill | ⭐⭐⭐ HIGH | **SHIP** — eliminates A3-TF-DOUBLE-NEG class; critical for 8-12 child audience |

**Implementation path**:
1. Add `stem: z.string().optional()` to listen-tf union in `src/data/lessons.ts`
2. Update renderer to display stem when present (3 lines in `renderers.tsx` / `LessonPage.tsx`)
3. `npm run build` — verify no TS errors
4. Backfill the 3 confirmed P1★ TFs first (Ch16/17/14) as a batch
5. Progressive rollout to remaining ~200 TF Qs

No `src/` changes for content JSON. No deploy needed for schema-only + renderer patch.
