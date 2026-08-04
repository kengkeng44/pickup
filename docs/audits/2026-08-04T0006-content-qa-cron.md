# Content QA — 2026-08-04 00:06 UTC

**Today's angle**: A1 — Obvious Correct (Gap Too Easy / Verbatim Stem Cue)
**Focus**: Ch9–16 (Cinderella, Chang'e, Houyi, Niulang & Zhinu, Little Red Riding Hood, Urashima Taro, The Emperor's New Clothes, Issun-Boshi)
**Angle definition**: A1 violation occurs when the correct answer can be identified without comprehending the story — either because (a) the correct option text appears verbatim or near-verbatim inside the question stem / sentence, or (b) the question stem names the exact word that labels the correct option. Test-wiseness research (Holton/EdTechDev; UCONN CETL MCQ Standards; Citizendium IWF-19) confirms that "words from the stem should not be reused in options to avoid cueing the test-wise student." For 8-12 children who can read English letters, simple word-matching bypasses all vocabulary comprehension.

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440
(warn-only; MIRROR_LINT_STRICT=1 would fail build)
No schema failures. Build clean.
Prior X2/X48/X49/X57 patterns carry over from previous cycles.
```

---

## B. Violation Table

### B1. emoji-pick — Systemic A1 (22 P0 instances across Ch9–16)

Every `emoji-pick` question in Ch9–16 follows the pattern:
- Question stem: **"Which one is a [WORD]?"** or **"Which emoji shows a [WORD]?"**
- Correct option: **[emoji] [WORD]** (the target word appears in both stem and correct option text)

Result: An English-literate learner can solve the question by visual word-matching alone — no vocabulary comprehension required.

| Ch | Q ID | Type | Question Stem | Correct Option | Verbatim Match | Severity | Fix | Audio regen? |
|----|------|------|---------------|---------------|----------------|----------|-----|--------------|
| 9 | kt-ch9-l1-ep1 | emoji-pick | "Which one is a shoe?" | "👠 shoe" | "shoe"↔"shoe" | **P0** | Change stem → "哪一個是鞋子？" (Chinese stem, forces EN-ZH mapping) | No |
| 9 | kt-ch9-l1-ep2 | emoji-pick | "Which one shows a mirror?" | "🪞 mirror" | "mirror"↔"mirror" | **P0** | Change stem → "哪一個是鏡子？" | No |
| 9 | kt-ch9-l2-ep1 | emoji-pick | "Which emoji shows midnight?" | "🕛 midnight" | "midnight"↔"midnight" | **P0** | Change stem → "午夜是哪一個？" or concept: "When the magic ends at 12:00, it is ___" | No |
| 10 | kt-ch10-l1-ep1 | emoji-pick | "Which one is a pill?" | "💊 pill" | "pill"↔"pill" | **P0** | Change stem → "哪一個是藥丸？" | No |
| 10 | kt-ch10-l1-ep2 | emoji-pick | "Which one shows a box?" | "📦 box" | "box"↔"box" | **P0** | Change stem → "哪一個是盒子？" | No |
| 10 | kt-ch10-l2-ep1 | emoji-pick | "Which emoji shows swallowing?" | "😮‍💨 swallow" | "swallow"↔"swallow" | **P0** | Change stem → "哪一個表示吞下去？" | No |
| 11 | kt-ch11-l1-ep1 | emoji-pick | "Which one is the sun?" | "☀️ sun" | "sun"↔"sun" | **P0** | Change stem → "哪一個是太陽？" | No |
| 11 | kt-ch11-l2-ep1 | emoji-pick | "Which emoji shows a bow and arrow?" | "🏹 bow" | "bow"↔"bow" | **P0** | Change stem → "哪一個是弓箭？" | No |
| 12 | kt-ch12-l1-ep1 | emoji-pick | "Which one is a cow?" | "🐮 cow" | "cow"↔"cow" | **P0** | Change stem → "哪一個是牛？" | No |
| 12 | kt-ch12-l1-ep2 | emoji-pick | "Which one shows a star?" | "⭐ star" | "star"↔"star" | **P0** | Change stem → "哪一個是星星？" | No |
| 12 | kt-ch12-l2-ep1 | emoji-pick | "Which one shows a bridge?" | "🌉 bridge" | "bridge"↔"bridge" | **P0** | Change stem → "哪一個是橋？" | No |
| 13 | kt-ch13-l1-ep1 | emoji-pick | "Which one is a wolf?" | "🐺 wolf" | "wolf"↔"wolf" | **P0** | Change stem → "哪一個是狼？" | No |
| 13 | kt-ch13-l1-ep2 | emoji-pick | "Which one shows a forest?" | "🌲 forest" | "forest"↔"forest" | **P0** | Change stem → "哪一個是森林？" | No |
| 13 | kt-ch13-l2-ep1 | emoji-pick | "Which emoji shows teeth?" | "🦷 teeth" | "teeth"↔"teeth" | **P0** | Change stem → "哪一個是牙齒？" | No |
| 14 | kt-ch14-l1-ep1 | emoji-pick | "Which one is a turtle?" | "🐢 turtle" | "turtle"↔"turtle" | **P0** | Change stem → "哪一個是烏龜？" | No |
| 14 | kt-ch14-l1-ep2 | emoji-pick | "Which one shows a beach?" | "🏖️ beach" | "beach"↔"beach" | **P0** | Change stem → "哪一個是海灘？" | No |
| 14 | kt-ch14-l2-ep1 | emoji-pick | "Which emoji shows a box?" | "📦 box" | "box"↔"box" | **P0** | Change stem → "哪一個是盒子？" | No |
| 15 | kt-ch15-l1-ep1 | emoji-pick | "Which one is a crown?" | "👑 crown" | "crown"↔"crown" | **P0** | Change stem → "哪一個是皇冠？" | No |
| 15 | kt-ch15-l1-ep2 | emoji-pick | "Which one shows gold?" | "💰 gold" | "gold"↔"gold" | **P0** | Change stem → "哪一個是黃金？" | No |
| 15 | kt-ch15-l2-ep1 | emoji-pick | "Which emoji shows empty hands?" | "🤲 hands" | "hands"↔"hands" | **P0** | Change stem → "哪一個表示空手？" | No |
| 16 | kt-ch16-l1-ep1 | emoji-pick | "Which one is a needle?" | "🪡 needle" | "needle"↔"needle" | **P0** | Change stem → "哪一個是針？" | No |
| 16 | kt-ch16-l1-ep2 | emoji-pick | "Which one shows a bowl?" | "🍜 bowl" | "bowl"↔"bowl" | **P0** | Change stem → "哪一個是碗？" | No |

**NOTE — Correct exceptions (NOT A1)**:
- `kt-ch16-l2-ep1` "Which one shows a mallet?" → correct "🔨 hammer" — "mallet" ≠ "hammer"; learner must know the semantic relationship. ✅ Good design.
- `kt-ch13-l2-ep1` would be borderline — sentence uses "teeth" AND option says "teeth" — but the sentence anchor provides comprehension context before the Q. Still P0 by strict rule because `question` stem contains "teeth."

### B2. picture-mc — Near-Verbatim Correct Option Description (2 P1)

| Ch | Q ID | Type | Sentence | Correct Option | Overlap | Severity | Fix | Audio regen? |
|----|------|------|----------|---------------|---------|----------|-----|--------------|
| 9 | kt-ch9-l1-pm1 | picture-mc | "The two sisters danced in front of the mirror." | "two girls dancing in front of a mirror" | 60% content-word | **P1** | Replace "in front of a mirror" → "at the royal ball" (adds story context, removes mirror echo); "sisters"→"girls" is already thin paraphrase but acceptable | No |
| 16 | kt-ch16-l1-pm1 | picture-mc | "A tiny boy floated down the river in a bowl." | "a small boy sitting in a bowl on the river" | 60% content-word | **P1** | Replace "sitting in a bowl on the river" → "sailing downstream inside a round vessel" (paraphrase bowl→vessel, floated→sailing) | No |

### B3. Narrative Voice & Pacing Improvements (Even with 0 R1-R8 violation — per prompt constraint)

Even though `listen-mc` items in Ch9-16 are well-constructed (0 R1 verbatim violations detected), three narrative pacing improvements are proposed:

1. **Ch13 l3-q4**: Sentence "The girl did not know that wolves were bad inside" is slightly adult-register ("bad inside"). For 8-12 children: revise to "The girl did not know that wolves could be dangerous" — more concrete, less abstract "bad inside" moral framing.

2. **Ch14 l3-q3**: Sentence "The walls shone like pearl and the gates were made of shell" — this is a beautiful Ghibli-register narration ✅. However, the correct option "bright and beautiful" is too generic (doesn't reward attention to the specific "pearl/shell" imagery). Proposed: "shining like the deep sea" — keeps the aquatic imagery, still a valid paraphrase.

3. **Ch15 l3-q4** listen-tf: Sentence "The old minister opened his eyes very wide." Q: "Was the minister trying hard to see something?" / Ans: Yes. This is a good inference question ✅, but the Q phrasing "trying hard to see something" telegraphs the answer too directly for B1-level learners. Alternative: "Did the minister look confused?" (Answer: No, he was trying, not confused) — this forces a distinction between physical strain and emotional confusion, raising cognitive demand appropriately.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total emoji-pick A1 verbatim (P0) | **22** |
| picture-mc near-verbatim (P1) | **2** |
| listen-mc R1 violations | **0** ✅ |
| grammar-mc violations | **0** ✅ |
| listen-tf violations | **0** ✅ |
| Total Q-items scanned (Ch9-16, excl. narration/pairs) | ~120 |
| Chapters clean (listen-mc + listen-tf) | 8/8 ✅ |

---

## D. Top 5 P0

1. **⚠️ kt-ch9-l1-ep1** `emoji-pick` — "shoe"↔"shoe" verbatim; earliest chapter in this range sets the pattern
2. **⚠️ kt-ch13-l1-ep1** `emoji-pick` — "wolf"↔"wolf" verbatim; LRRH antagonist vocab — critical story-word should require real comprehension
3. **⚠️ kt-ch12-l2-ep1** `emoji-pick` — "bridge"↔"bridge" verbatim; Qixi festival bridge is the emotional climax concept — must be earned by comprehension
4. **⚠️ kt-ch15-l2-ep1** `emoji-pick` — "hands"↔"hands" verbatim in context of "empty hands" — the entire thematic point of Emperor's New Clothes is invisible cloth; trivializing it to a word-match is particularly disappointing
5. **⚠️ kt-ch9-l1-pm1** `picture-mc` — 60% verbatim overlap; question about Cinderella's mirror scene should not echo "in front of a mirror" verbatim from sentence

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #239: X239_EMOJI_PICK_CHINESE_STEM_BATCH

**Research base**:
- **Test-Wiseness / IWF-19** (EdTechDev / Citizendium): "Words from the stem should not be reused in options to avoid cueing the test-wise student." This is Item Writing Flaw #19 in the standard psychometric IWF taxonomy — one of the most common and most penalized flaws in standardized assessment.
- **UCONN CETL MCQ Standards**: "Students can guess the correct answer or narrow down options based on wording (secondary cues) rather than knowledge of the topic being assessed."
- **VRT (Vocabulary Recognition Task) literature** (Readingrockets.org / ASHA 2025 vocabulary study): The pedagogically useful distinction is **recognition** (identifying a form you have seen) vs. **recall** (retrieving meaning from context). Word-matching in emoji-pick tests only form-level recognition — not the semantic mapping from meaning → form that vocabulary acquisition requires.
- **Wordwall / interactive ELT tool research** (ResearchGate 2023): Effective vocabulary activities require "contextualization and active engagement" — passive word-matching provides neither.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **X239a: Chinese stem for all emoji-pick questions** — Change "Which one is a [WORD]?" to "哪一個是[詞]？" across all chapters. Target word appears ONLY in English option text; learner must map Chinese concept → English label → correct emoji. Zero code change, pure JSON content update. | Test-wiseness IWF-19; VRT literature; Pickup B.550 bilingual design (Chinese L1 users) | ✅ Perfect fit — aligns with B.550 i18n philosophy, matches target audience (Chinese-speaking children), eliminates all 22+ verbatim cues with ~1 Haiku batch pass across Ch9-16 (est. ~50 emoji-pick questions total across all 34 chapters) | Low–Medium (Haiku batch, ~50 questions) | **Very High** — eliminates entire A1 class for emoji-pick type permanently; turns vocab-matching into cross-linguistic word retrieval (ZH→EN), which is exactly what the target audience needs | **RECOMMEND as P0 fix** |
| **X239b: Concept-based stem (monolingual)** — Change "Which one is a shoe?" → "Which one do you wear on your feet?" — tests concept understanding in English only. Better for en-US / en-GB / ja / ko interface modes. | Test-wiseness IWF-19; concept-driven vocabulary design | 🟡 Partial fit — good for monolingual EN mode but requires manual creative rewrite per question (harder to batch); misses non-Chinese i18n users who may not understand Chinese stem | Medium (manual rewrite, 50 Qs) | Medium | DEFER — pursue after X239a ships; apply to l2-ep (story-anchored) questions where concept stem fits naturally |
| **X239c: Lint rule — emoji-pick stem ∩ option text = ∅** — Add a CI lint check: for every emoji-pick entry, assert that no word appearing in `sentence`/`question` also appears in any option's text label. Promotes X239 from one-time-fix to permanent guard. | Pickup existing lint framework (validate-lessons.js X-series) | ✅ Direct extension of validate-lessons.js pattern. ~10 lines of JS. | Low | High (prevents regression) | **RECOMMEND as companion to X239a** |

**Immediate recommendation**: 
1. Dispatch Haiku batch to rewrite all emoji-pick `question` stems Ch9-16 (22 items) → Chinese stems. Verify `node tools/validate-lessons.js` still passes. Commit.
2. Extend validate-lessons.js with X239c lint rule to prevent future regressions.
3. Eventually roll X239a to all chapters (estimate ~50 emoji-pick questions total).

**Implementation note**: `question` field in emoji-pick is the displayed stem (rendered by `renderers.tsx`). The `sentence` field is the story-context anchor sentence (shown above). Only `question` needs updating — no schema change, no audio regen, no i18n overlay update (emoji-pick questions are not in the ja/ko overlay system per B.550).

**Cockpit action item added.**

---

*Audit generated: 2026-08-04 00:06 UTC | Angle: A1-obvious-correct | Focus: Ch9–16 | Violations: 22 P0 + 2 P1*
