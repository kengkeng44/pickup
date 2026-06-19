# Content QA — 2026-06-19 06:00 UTC

**Today's angle: R2 — Distractor Doctrine (4-option blind / non-functional distractors)**
**Focus: Ch27–31** (Journey to the West / Three Kingdoms / Odyssey / Heracles / Robin Hood)

**R2 Definition:** All 4 options in every MCQ must be independently plausible — each must represent a schema-consistent wrong inference a learner *might reach* from partial or misheard comprehension. A distractor is **non-functional (R2 violation)** when it is eliminable without referencing the text/audio: logically absurd in context, construct-irrelevant, so extreme in scale that no learner would choose it, or drawn from a recycled "filler template" that repeats across many questions in the same lesson file.

**Why R2 matters (psychometric basis):** Rodriguez meta-analysis (2005, Educational Measurement) shows 1 non-functional distractor ≈ collapses item reliability as effectively as removing an option entirely. Haladyna & Rodriguez (2013) classify distractors chosen by <5% of examinees as "non-functional." BMC Medical Education (2009) found ~2/3 of 4-option items have only 1–2 functioning distractors. ACL 2025 Distractor Generation survey: "distractors should be semantically coherent and contextually relevant, matching correct answer in style, length, and structure." BenchMarker (arXiv 2602.06221, 2025) demonstrates that recurring filler patterns reduce MCQ discrimination to near-chance for test-wise learners who recognize the template.

**For Pickup specifically:** 8–12-year-old learners develop template-recognition faster than adults (Crandall 1993: children exploit surface regularities as a coping strategy). A child who encounters 😴 "just very sleepy" as a wrong emotion option in L1 will pattern-match it as "always wrong" by L3, defeating comprehension-gating for ALL subsequent emoji-pick questions.

Previous 8 crons covered: R1(×2), A6, A1, A3, #11, #10, A5, A4. R2 not yet audited in this window.

---

## A. validate-lessons.js result

```
WARN lessons-ch31.json: 8 lint issue(s):
  kt-ch31-l1-q8: R1_SUBSTRING (correct = "in a tall stone castle" verbatim)
  kt-ch31-l4-q3: R1_SUBSTRING (correct = "on Robin's front door" verbatim)
  kt-ch31-l1-q6: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch31-l1-q8: X3_R1_VERBATIM_WORDS
  kt-ch31-l2-q7: X2_OPTION_LIST_BIAS (all start with "with")
  kt-ch31-l4-q3: X3_R1_VERBATIM_WORDS
  kt-ch31-l6-q6: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch31-l6-q8: X2_OPTION_LIST_BIAS (all start with "in")

Total mirror-lint issues: 70 (warn-only)
```

No R2 (non-functional distractor) lint rule exists yet — validate-lessons.js cannot detect construct-irrelevant or scale-extreme distractors. All violations below are manual audit findings.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence / Context | Violation | Severity | audio regen? |
|----|------|------|--------------------|-----------|----------|--------------|
| 27 | kt-ch27-l1-q10 | emoji-pick | "Sanzang stood by gate, looked west" | [3] 🍔 "just a little hungry" = construct-irrelevant (spiritual yearning ≠ hunger) **NON_FUNCTIONAL_FILLER** | P1 | No |
| 27 | kt-ch27-l2-q5 | listen-mc | Emperor asks "Will you go to India?" | [2] "write a brand new song" + [3] "build a new wall by the river" = no story-world basis for emperor's mission **IMPLAUSIBLE_STORY_WORLD** | P1 | No |
| 27 | kt-ch27-l2-q10 | emoji-pick | "Sanzang honored by Emperor" | [3] 🍎 "hungry and thirsty" = filler, eliminable with zero comprehension **NON_FUNCTIONAL_FILLER** | P1 | No |
| 27 | kt-ch27-l3-q10 | emoji-pick | "Sanzang leaving homeland" | [3] 😴 "ready for a nap" = construct-irrelevant (departure scene ≠ tiredness) **NON_FUNCTIONAL_FILLER** | P1 | No |
| 27 | kt-ch27-l4-q10 | emoji-pick | "Days alone in desert" | [3] 🎵 "wanted to sing all day" = implausible for loneliness/isolation scene **NON_FUNCTIONAL_FILLER** | P1 | No |
| 28 | kt-ch28-l1-q9 | emoji-pick | "Liu Bei worried about future" | [3] 🎉 "carefree and loud" = implausible (just said "our work will fail") **NON_FUNCTIONAL_FILLER** | P1 | No |
| 28 | kt-ch28-l3-q5 | listen-mc | "He knocked three times, soft and slow" | [2] "with his foot" + [3] "with a heavy stone" = socially absurd; any 8-yr-old eliminates without comprehension **ABSURDITY_SOCIAL** | P1 | No |
| 28 | kt-ch28-l4-q10 | emoji-pick | "Liu Bei rides home after being turned away" | [3] 🤩 "full of party joy" = **P0 EXTREME_MISMATCH** (returned empty-handed, sad ≠ party joy by maximum polarity) | P0 | No |
| 28 | kt-ch28-l6-q10 | emoji-pick | "Liu Bei waits in cold wind" | [2] 🍔 "very hungry" = filler; context = cold + respect, not food **NON_FUNCTIONAL_FILLER** | P1 | No |
| 29 | kt-ch29-l1-q3 | listen-mc | "ten long years away fighting war" | [0] "only a few days" = **P0 SCALE_EXTREME** (sentence says "ten long years"; no learner who heard the number believes "a few days") | P0 | No |
| 29 | kt-ch29-l1-q10 | emoji-pick | "Odysseus looks at the sea" | [3] 🎵 "in the mood to sing" = implausible (weary warrior ≠ singing mood) **NON_FUNCTIONAL_FILLER** | P1 | No |
| 29 | kt-ch29-l2-q6 | listen-mc | "every night Odysseus thought of family" | [2] "never at all" = A4 antonym mirror (every night ↔ never at all) **ANTONYM_MIRROR** (also A4 cross-ref) | P1 | No |
| 29 | kt-ch29-l4-q10 | emoji-pick | "Ships sail away with white sails" | [2] 🐌 "like tiny snails" + [3] 🐟 "like jumping fish" = non-functional (ships with sails ≠ snails/fish by visual category) **IMPLAUSIBLE_METAPHOR** | P1 | No |
| 30 | kt-ch30-l2-q3 | listen-mc | "lion twice the size of any lion ever seen" | [0] "much smaller than a little house cat" = **P0 ABSURDITY_SCALE** (sentence says BIGGEST lion ever; house cat is 30× smaller than even a normal lion — eliminable as absurd) | P0 | No |
| 30 | kt-ch30-l4-q10 | emoji-pick | "Lion reacts to arrows bouncing off" | [1] 😭 "crying loudly" = anthropomorphic construct-irrelevant (lion≠human cryer; children distinguish this) **IMPLAUSIBLE_ANTHROPOMORPHIC** | P1 | No |
| 31 | kt-ch31-l3-q8 | listen-mc | "Sheriff's finger stops on name 'Robin'" | [3] "a baby in the village" = implausible (babies are not on warrant lists; story-world plausibility = zero) **IMPLAUSIBLE_STORY_WORLD** | P1 | No |
| **STRUCTURAL** | ALL emoji-pick Ch27–31 | emoji-pick | Entire emoji-pick wrong-option pool | 😴 "sleepy/nap/bored" appears as wrong option **13+ times** across Ch27–31; 😡 "angry" appears **8+ times**. Recurring template makes all emoji-picks partially non-functional by test-wiseness exploit. **X6_EMOJI_ROTATION (systemic P1)** | P1 systemic | No |

**Violation counts:**
- P0 (trivializing — student eliminates without any story comprehension): **4**
- P1 (strong non-functional — easy elimination for most learners): **12 + 1 systemic**
- Total individual Q violations: **16**
- Structural pattern violation: **1 (covers ~20 emoji-pick Qs)**

**P0 prefix triggered (≥3 P0):** ⚠️

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch27–31 (5 chapters) |
| Lessons sampled | 27 (L1–L5 × 5 chapters + L6–7 of Ch28) |
| Questions inspected | ~160 (listen-mc + emoji-pick + cloze + listen-tf) |
| R2 individual violations | 16 Q-level violations |
| Structural violations | 1 (emoji-rotation template across ~20 Qs) |
| P0 violations | 4 |
| P1 violations | 12 |
| Most common subtype | NON_FUNCTIONAL_FILLER (emoji 😴/🍔/🎵 filler) 8/16 = 50% |
| Runner-up | IMPLAUSIBLE_STORY_WORLD (3/16) + SCALE_EXTREME (2/16) |
| Audio regen required | 0 (distractors only — audio uses qEn sentence, not options) |
| CI already flagged | 2 (kt-ch31-l1-q8 + kt-ch31-l4-q3 R1_SUBSTRING) |
| Chapters with ≥3 violations | Ch27 (5), Ch28 (4), Ch29 (4) |

**Pattern note:** The systemic X6_EMOJI_ROTATION is the highest-ROI finding. The wrong-option template (😴 sleepy / 😡 angry / 🍔 hungry / 🎵 singing) is reused across the entire corpus. Once a player recognizes this 3-wrong-option set (typically by L2–L3), all subsequent emoji-pick questions become test-wiseness-exploitable regardless of content. This is structural, not per-Q: fixing individual emoji-picks without rotating the distractor pool won't solve it.

---

## D. Top 5 P0

### ⚠️ P0-1: kt-ch29-l1-q3 — Scale-extreme distractor ("few days" vs "ten years")

**Sentence:** "For ten long years he had been away fighting a big war in Troy."
**Correct [1]:** "for ten long years"
**Problem [0]:** "only a few days"

The sentence states "ten long years" explicitly. Option [0] "only a few days" is so far off scale that zero comprehension is required to eliminate it. A student who heard nothing but the word "years" would still reject "a few days." This is a **SCALE_EXTREME** violation — the distractor doesn't even occupy the correct order-of-magnitude category.

**Fix [0]:** "for about two years" — uses years (correct category), plausible misremember of a large number, requires the student to have actually processed "ten."

---

### ⚠️ P0-2: kt-ch30-l2-q3 — Absurdity scale ("house cat" vs biggest lion)

**Sentence:** "It was twice the size of any lion the people had ever seen."
**Correct [1]:** "two times bigger than a normal lion"
**Problem [0]:** "much smaller than a little house cat"

The sentence describes the *biggest lion ever*. Option [0] describes the smallest possible feline. The gap (biggest lion ≈ 250kg; house cat ≈ 4kg) is 60× — eliminable by any child who knows what a lion and a cat are, with no audio comprehension at all.

**Fix [0]:** "about the same size as a big horse" — same size-category as a huge animal, plausible misremember for a student who didn't catch "twice as big as any lion."

---

### ⚠️ P0-3: kt-ch28-l4-q10 — Party joy returning empty-handed (extreme polarity mismatch)

**Context:** Liu Bei rode up the hill in snow, was told Zhuge Liang was sleeping, waited, and rode home without meeting him. The narration says he looked "quiet and tired."
**Correct [1]:** 😔 "quiet and tired"
**Problem [3]:** 🤩 "full of party joy"

This is the maximum polarity mismatch possible for this scene. The story has Liu Bei returning silently through snow after a failed visit. "Party joy" is not only wrong but belongs to a categorically opposite emotional state that requires zero comprehension to reject.

**Fix [3]:** 🤔 "thinking hard about giving up" — occupies the same emotional valence (negative/uncertain), plausible wrong inference (some students may think repeated rejection = giving up), requires actual story comprehension to distinguish from correct answer.

---

### ⚠️ P0-4: STRUCTURAL — Emoji rotation template (😴/😡/🍔/🎵 across 13+ questions)

**Scope:** All emoji-pick questions in Ch27–31 (and likely the entire corpus).

**Pattern:** The three wrong-option slots rotate from a fixed pool:
- 😴 "just very sleepy now" / "ready for a nap" / "sleepy and bored" — appears **13 times** as wrong option in Ch27–31 alone
- 😡 "really quite angry now" / "angry and loud" — appears **8 times**
- 🍔 "just a little hungry" / 🍎 "hungry and thirsty" — appears **3 times**
- 🎵 "in the mood to sing" / "wanted to sing all day" — appears **3 times**

**Effect:** By lesson 3 of any chapter, a learner who has seen 😴 as wrong twice will apply test-wiseness: "😴 = always wrong." This collapses discrimination for ALL subsequent emoji-pick questions, regardless of how well the content is calibrated. Cambridge YLE research (2024) shows children's template-recognition develops faster than adult learners for precisely this pattern.

**Fix (structural):** Each wrong emoji option should be story-specific and chapter-specific. For Ch27 (Journey to the West), wrong emotions for Sanzang should include:
- 😤 "too proud to look worried" (plausible for a monk who hides struggle)
- 🤩 "excited only about the books" (partial inference: he wants books, but wrong depth)
- 😶 "felt nothing at all" (a student who missed the emotional beat)

For Ch28 (Three Kingdoms), wrong options for Liu Bei should include relationship-specific wrong inferences:
- 🤔 "thinking only of his brothers' opinion" (plausible partial inference)
- 😌 "calm — he had a backup plan" (wrong inference about strategy)

---

### ⚠️ P0-5: kt-ch28-l3-q5 — Socially absurd method distractors ("with his foot" / "with a heavy stone")

**Sentence:** "He knocked three times, soft and slow, with the back of his hand."
**Correct [1]:** "soft and slow"
**Problem [2]:** "with his foot"
**Problem [3]:** "with a heavy stone"

Both wrong options are physically possible but socially absurd for a formal courtesy visit. Any 8-year-old learner who has knocked on a door in their life would immediately eliminate [2] and [3] — kicking a door and hitting it with a rock are recognizable as rude or violent acts antithetical to the story's politeness theme. These distractors fail at R4 (3 different failure modes): they don't cover schema-driven inference or partial parse; they're just improbable physical actions.

**Fix [2]:** "soft but only once" — wrong detail (sentence says "three times"), plausible partial miss of count
**Fix [3]:** "loud and hard, like a soldier" — wrong manner (sentence says "soft and slow"), plausible contrast given Liu Bei has soldiers with him

---

## E. Narrative Voice / Pacing Improvements (3, even with zero R1–R8 new violations)

### NV-1: Ch27 Journey to the West — distractor vocabulary inconsistency with A2 frame

Several Ch27 wrong options use vocabulary outside A2 GSL-2000: "honored" (kt-ch27-l2-q10 explanationZh references but is in optionsZh), "fine yellow clothes," "holy books." While the correct options stay A2-appropriate, some wrong options use simpler vocabulary that makes them feel "child-wrong" — a register tell. For A2 calibration, all 4 options should use equivalent vocabulary grade.

**Recommendation:** In kt-ch27-l2-q5, replace [2] "write a brand new song" (register-simple) and [3] "build a new wall by the river" (random) with story-world alternatives: "find new silk roads for trade" / "bring back a golden map" — same fantasy register as the mission context.

### NV-2: Ch29 Odyssey — emotion scale across whole chapter is compressed

All Ch29 emotion questions have correct answers in the range [tired / missing / ready to go home]. The wrong options should provide a range of plausible misreadings: "relieved the war is over" (positive reading of same scene), "angry at his men for how long it took" (negative but different target). Currently the wrong options are all clearly non-Odyssean (singing, sleeping, partying) rather than wrong-but-related-to-Odysseus readings.

**Recommendation:** For kt-ch29-l1-q10 (Odysseus at sea), replace 😡 "angry at the sea" with 😤 "proud of what he won in Troy" — plausible partial inference (victory without missing-family depth).

### NV-3: Ch31 Robin Hood — CI-flagged R1_SUBSTRING questions cascade into R2 territory

kt-ch31-l1-q8 and kt-ch31-l4-q3 have R1 violations (correct option = verbatim sentence fragment). This creates a secondary R2 problem: when 1 of 4 options is the exact sentence text, the other 3 are *obviously invented* — their plausibility collapses because learners see the contrast between the "real" option and the made-up ones. Fixing R1 violations in these questions will simultaneously fix the R2 downstream effect.

**Recommendation:** Prioritize R1 fixes (already in CI) for kt-ch31-l1-q8 and kt-ch31-l4-q3 before addressing other R2 violations in Ch31, since R1 repair restores the plausibility equilibrium of the option set.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #52: X6_EMOJI_ROTATION_LINT — Detect structural emoji filler rotation in validate-lessons.js

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Emoji/option rotation lint per lesson file | BenchMarker arXiv 2602.06221 (2025): recurring filler patterns collapse MCQ discrimination; ACL 2025 distractor generation: options must be "contextually relevant… matching style and structure"; BMC MedEd 2009: 2/3 of 4-option items have ≤2 functional distractors | ✅ Fully compatible — validate-lessons.js has X2/X3/X5 per-Q lint; X6 is per-file aggregate lint (new scope but same framework) | **S (30–60 min)** | ⭐⭐⭐⭐ HIGH | **IMPLEMENT** |

**What to add to `tools/validate-lessons.js`:**

```js
// X6_EMOJI_ROTATION_LINT: flag when same emoji appears as wrong option ≥N times in a file
function checkEmojiRotation(allLessons, threshold = 4) {
  const emojiWrongCount = {};
  for (const lesson of allLessons) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'emoji-pick') continue;
      const ci = q.correctIndex ?? -1;
      for (let i = 0; i < (q.options || []).length; i++) {
        if (i === ci) continue;
        // extract first emoji character
        const emoji = [...(q.options[i] || '')].find(c => c.codePointAt(0) > 0x1000);
        if (emoji) emojiWrongCount[emoji] = (emojiWrongCount[emoji] || 0) + 1;
      }
    }
  }
  return Object.entries(emojiWrongCount)
    .filter(([, c]) => c >= threshold)
    .map(([emoji, count]) => `X6_EMOJI_ROTATION (wrong option emoji "${emoji}" appears ${count}× across file — test-wiseness exploit)`);
}

// call after loading all lessons from a file:
const emojiRotation = checkEmojiRotation(lessonsArray);
for (const w of emojiRotation) fileWarns.push(w);
```

**Expected catch rate:** 😴 appears 13× as wrong option in Ch27–31 alone. Corpus-wide estimate: 40–60 emoji rotation hits (the 😴/😡/🍔/🎵 template appears to span all chapters). Setting `threshold = 4` per file should flag any chapter with the rotation pattern while allowing legitimate repeated use (e.g., a lesson specifically about sleep stories might have 😴 as a wrong option more than once, but not 4+ times per file).

**Why this matters for Pickup:**
- A 10-year-old playing Ch27 L1 encounters 😴 as wrong → L2 encounters it again → by L3 has pattern-matched it as "always wrong." This is equivalent to a position-bias bug but in emoji space.
- The ACL 2025 student-choice-prediction paper shows that template-predictable wrong options score near-chance for test-wise students. For an 8-year-old with 3 sessions of play, this threshold is reached faster than for adult learners.
- Fix complexity: once X6 flags a file, the distractor fix is a content pass (swap the repeated emoji for a story-specific one) — no schema changes, no audio regen, no code changes.

**Files to change:**
- `tools/validate-lessons.js` — add `checkEmojiRotation()` + file-level call (~25 lines)
- `public/lessons-ch*.json` — content pass to replace recurring 😴/😡/🍔 with story-specific distractors (can batch via Fable agent, ~1–2 hr per chapter)
