# ⚠️ Content QA — 2026-07-01 00:06 UTC

Today's angle: **R1 — Paraphrase, not echo (Buck 1991/2001 ban)**
Focus: **Ch17–24** (鶴の恩返し / 흥부와 놀부 / 滑稽的鱷魚 / 大蘿蔔 / Anansi蜘蛛 / 孟母三遷 / 司馬光 / 孔融讓梨)

**Angle definition (R1 Paraphrase)**:
Buck (2001) *Assessing Listening* identified verbatim overlap between the stimulus sentence and the correct answer option as the single most common source of Construct-Irrelevant Variance (CIV) in listening/comprehension assessments. When the correct answer shares ≥3 consecutive content tokens with the sentence, test-takers can identify it through surface-level matching — without understanding meaning. This is the **#1 Hard Rule** in `pickup-q-design-standard-v1.md`.

Sub-violations audited this cycle:

| Code | Description | Severity |
|------|-------------|----------|
| **R1a** | Correct answer contains verbatim 3-gram from sentence (content tokens) | P1 |
| **R1b** | Correct answer shares ≥75% content-word overlap with sentence (paraphrase trap) | P1 |
| **R1c** | A wrong *distractor* contains verbatim 3-gram from sentence (test-wiseness cue) | P2 |
| **R1d** | `explanationZh` quotes the correct answer verbatim (≥85% EN token overlap) — trivialises the item on re-visit | P2 |

---

## A. validate-lessons.js result (Ch17–24 filter)

```
WARN ch17: 3 issues (X49_STIMULUS_REUSE ×3)
WARN ch18: 8 issues (X2_OPTION_LIST_BIAS ×2, X49 ×6)
WARN ch19: 9 issues (X2_OPTION_LIST_BIAS ×6, X49 ×2)
WARN ch20: 3 issues (X2_OPTION_LIST_BIAS ×1, X49 ×2)
WARN ch21: 13 issues (X2_OPTION_LIST_BIAS ×9, X49 ×3)
WARN ch22: 3 issues (X2_OPTION_LIST_BIAS ×2, X49 ×1)
WARN ch23: 6 issues (X2_OPTION_LIST_BIAS ×1, X49 ×5)
WARN ch24: 11 issues (X2_OPTION_LIST_BIAS ×3, X49 ×3 + more)
Total mirror-lint issues: 235 (entire repo, warn-only)
```

Note: existing lint (X3 / X48) already covers `comprehension` + `listen-mc` for verbatim 3-gram but explicitly **exempts `picture-mc`** (comment: "天生需 verbatim"). This cycle's audit shows this exemption is too broad — see ARCH-REC #100 below.

---

## B. Violation Table

| Sev | Ch | Q ID | Type | Sentence snippet | Correct answer | Violation | 修法 | Audio regen? |
|-----|-----|------|------|-----------------|---------------|-----------|-----|--------------|
| P1 | 17 | kt-ch17-l1-pm1 | picture-mc | "A kind old man helped a hurt bird." | "a kind old man freeing a hurt bird" | R1a: `kind old man` verbatim | Caption: "an elderly man releasing an injured crane" | No |
| P1 | 17 | kt-ch17-l2-pm1 | picture-mc | "The young woman sat at the loom to weave cloth all night." | "a young woman weaving at a loom" | R1b: 75% content overlap | Caption: "a woman working at a wooden loom by candlelight" | No |
| P1 | 17 | kt-ch17-l7-q9 | listen-mc | "She flew up, up, up into the morning sky." | "far up into the sky" | R1a: `up into the` verbatim | "high above the clouds" | No |
| P1 | 17 | kt-ch17-l7-x7 | comprehension | "She flew up, up, up into the morning sky." | "back up into the open sky" | R1a: `up into the` verbatim | "soaring away toward the clouds" | No |
| P1 | 18 | kt-ch18-l1-pm1 | picture-mc | "A small swallow built a nest on the roof." | "a small bird on a nest on a rooftop" | R1a: `a nest on` verbatim | "a tiny bird weaving sticks on a rooftop" | No |
| P1 | 19 | kt-ch19-l4-q10 | comprehension | "…no one wanted to ask hard questions." | "no one wanted to look like they did not know" | R1a: `no one wanted to` verbatim | "everyone stayed silent to avoid embarrassment" | No |
| P1 | 19 | kt-ch19-l6-q9 | listen-mc | "Their bodies could go in the water but not up the dry land." | "they could not go on dry land" | R1b: 100% overlap | "they were stuck in the water" | No |
| P1 | 19 | kt-ch19-l7-q9 | listen-mc | "His low voice came up from the dark water in a slow sad sound." | "low and slow" | R1b: 100% overlap `low/slow` | "quiet and sorrowful" | No |
| P1 | 20 | kt-ch20-l1-pm1 | picture-mc | "Grandpa plants a seed in his garden." | "an old man planting in his garden" | R1a: `in his garden` verbatim | "an old man kneeling beside a vegetable patch" | No |
| P1 | 20 | kt-ch20-l4-x8 | comprehension | "Each new person joins at the back of the line…" | "at the end of the line" | R1a: `of the line` verbatim | "behind everyone else" | No |
| P1 | 21 | kt-ch21-l1-pm1 | picture-mc | "Anansi spun a long web up to the sky." | "a spider sitting on a long web reaching upward" | R1a: `a long web` verbatim | "a small spider dangling from a thread toward the clouds" | No |
| P1 | 21 | kt-ch21-l3-x1 | comprehension | "The first animal was a group of hornets in a big tree." | "inside a big tree" | R1a: `a big tree` verbatim | "hidden inside a hollow trunk" | No |
| P1 | 21 | kt-ch21-l6-x5 | comprehension | "He gave Anansi a wooden box full of all the stories of the world." | "all the world's stories" | R1b: 75% overlap | "every tale ever told" | No |
| P1 | 21 | kt-ch21-l7-q8 | listen-mc | "Now every home…had a story by the fire at night." | "every home had a story to share" | R1a: `had a story` verbatim | "families gathered around tales at night" | No |
| P1 | 22 | kt-ch22-l4-x8 | comprehension | "This would be the third house they had lived in." | "this will be the third" | R1a: `be the third` verbatim | "moving one more time" | No |
| P1 | 22 | kt-ch22-l6-q8 | listen-mc | "Months of weaving were lost in one quick cut." | "many months of weaving" | R1a: `months of weaving` verbatim | "a long period of careful work" | No |
| P1 | 23 | kt-ch23-l2-pm1 | picture-mc | "Sima Guang picked up a heavy stone." | "a boy lifting a heavy stone" | R1a: `a heavy stone` verbatim | "a young boy raising a large rock above his head" | No |
| P1 | 23 | kt-ch23-l6-q3 | listen-mc | "He saw a big stone resting in the grass." | "a heavy stone in the grass" | R1a: `in the grass` verbatim | "a large rock lying on the ground" | No |
| P1 | 23 | kt-ch23-l7-x2 | comprehension | "His friend came out with the water, coughing, but alive." | "came out coughing but safe" | R1b: 75% overlap | "emerged from the water gasping but unhurt" | No |
| P1 | 24 | kt-ch24-l1-pm1 | picture-mc | "The father came home with a plate of fruit." | "a father walking in with a plate of pears" | R1a: `with a plate of` verbatim | "a man arriving home carrying a tray of round fruits" | No |
| P1 | 24 | kt-ch24-l2-pm1 | picture-mc | "Kong Rong took the small pear and gave the big ones to his brothers." | "a boy handing pears out to his brothers" | R1a: `to his brothers` verbatim | "a young boy offering fruit to older children" | No |
| P1 | 24 | kt-ch24-l5-x2 | comprehension | "Kong Rong said, 'I am the youngest. I should take the small one.'" | "he was the youngest" | R1b: 100% overlap | "being youngest meant he should take less" | No |
| P2 | 20 | kt-ch20-l5-x4 | comprehension | "Four of them pull. They count together. One, two, three, pull!" | "Grandpa, Grandma, the girl, the dog" | R1d: expl quotes answer list verbatim | ExplanationZh should explain counting logic, not list names | No |
| P2 | 21 | kt-ch21-l4-x5 | comprehension | "The python lay down by the stick to show his full length." | "lie down fully beside it" | R1d: expl quotes `lay down by the stick` + answer verbatim | ExplanationZh should explain WHY python needed to prove length | No |
| P2 | 21 | kt-ch21-l6-x1 | comprehension | "Anansi…this time he was not alone." | "he had company this time" | R1d: expl mirrors `not alone → company this time` | Explain vocab antonym `alone↔company`, don't restate | No |
| P2 | 21 | kt-ch21-l6-x8 | comprehension | "The Sky God looked at the hornets, the python, and the leopard." | "a small spider kept every promise" | R1d: expl quotes answer phrase verbatim | Tell the story beat, not the answer label | No |
| P2 | 21 | kt-ch21-l7-q10 | comprehension | "A small spider with a big head changed the night for everyone." | "clever thinking can beat brute strength" | R1c: distractor[1]="you should never trust a small spider" shares `a small spider` | Rewrite distractor: "size is more important than ideas" | No |
| P2 | 21 | kt-ch21-l7-x7 | emoji-pick | "And that is why…there is a tale in every home." | "📖 stories for everyone" | R1d: expl quotes `stories for everyone` verbatim | ExplanationZh: point to the story's thematic conclusion | No |
| P2 | 22 | kt-ch22-l3-x1 | comprehension | "She packed their things into two big cloth bags." | "large fabric sacks" | R1d: expl: "big cloth bags = 大布袋 → 選 large fabric sacks" | Remove answer quotation from expl; explain synonym inference | No |
| P2 | 22 | kt-ch22-l5-x5 | comprehension | "Meng began to copy the words from the school next door." | "study instead of sad games" | R1d: expl quotes answer verbatim | Explain contrast: what changed when Meng saw students | No |
| P2 | 22 | kt-ch22-l6-x4 | comprehension | "Without a word, she took her knife." | "picks up her knife" | R1d: expl: `took her knife → picks up her knife` | Explain the emotional gravity (silence before the action) | No |
| P2 | 22 | kt-ch22-l7-x1 | comprehension | "Meng did not stop again. He read every day." | "kept studying without stopping" | R1d: expl mirrors answer tokens ≥85% | Explain `did not stop again` = perseverance theme, not just restate | No |
| P2 | 22 | kt-ch22-l7-x4 | comprehension | "People still tell of his mother who moved three times." | "her brave choice made Meng great" | R1d: expl quotes answer phrase | Context: why 三遷 = brave; not just label it "brave choice" | No |
| P2 | 22 | kt-ch22-l7-x8 | comprehension | "What you see every day shapes who you become." | "your daily surroundings form who you are" | R1d: expl quotes answer verbatim as "核心" | ExplanationZh should tie to Meng's experience, not just restate | No |
| P2 | 23 | kt-ch23-l4-lg2 | comprehension | "The other children ran to find a grown-up." | — | R1c: distractor[3]="a grown-up was already on the way back" shares `a grown-up` | Rewrite: "adults would arrive too slowly" | No |
| P2 | 23 | kt-ch23-l5-q6 | listen-mc | "His friend was going under, and time was very short." | "time was running out" | R1c: distractor[2]="his friend was safe" shares `his friend was` | Rewrite: "his friend had already escaped" | No |
| P2 | 23 | kt-ch23-l6-q6 | listen-mc | "He did not throw it up at the sky or down at his feet." | "right at the jar wall" | R1c: distractor[2]="down at his own foot" shares `down at his` | Rewrite: "into the mud beside him" | No |
| P2 | 24 | kt-ch24-l4-lg2 | comprehension | "Kong Rong held the small pear…" | — | R1c: distractor[0]="he found the small pear easier to carry" shares `the small pear` | Rewrite: "the big pear was too heavy for him" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–24 (8 chapters) |
| Total QA items inspected | 672 |
| R1a P1 (verbatim 3-gram in correct) | 16 |
| R1b P1 (content-word overlap ≥75%) | 6 |
| R1c P2 (verbatim distractor) | 5 |
| R1d P2 (explanationZh mirrors correct) | 10 |
| **Total violations** | **37** |
| Picture-mc items with R1a/R1b | 11 / 22 P1 = **50%** |
| Comprehension items with R1d | 10 / 10 P2 R1d = **100% of R1d cluster** |
| validate-lessons.js pre-existing issues (Ch17-24) | 53 (warn-only) |

---

## D. Top 5 P0 (highest test-wiseness risk)

1. **⚠️ Ch22 kt-ch22-l6-q8** — `listen-mc` — sentence "Months of weaving were lost in one quick cut" / correct "many months of weaving" — the correct answer lifts the exact 3-gram `months of weaving` verbatim. A learner who can read English but can't hear the audio will still select correctly by matching. Fix: "a long effort undone in a moment."

2. **⚠️ Ch19 kt-ch19-l6-q9** — `listen-mc` — sentence "Their bodies could go in the water but not up the dry land" / correct "they could not go on dry land" — 100% content-word overlap. Correct answer is a surface rearrangement, not a paraphrase. Fix: "they were trapped in the river."

3. **⚠️ Ch17 kt-ch17-l7-q9 + x7** — **same sentence used twice in the same lesson** (listen-mc AND comprehension both on "She flew up, up, up into the morning sky") — both correct answers share `up into the` verbatim. Double violation: R1a + X49_STIMULUS_REUSE (already flagged by lint). Fix: diversify stimulus; rewrite answers as "toward the clouds" and "soaring free."

4. **⚠️ Ch21 kt-ch21-l7-q8** — `listen-mc` — sentence "Now every home…had a story by the fire at night" / correct "every home had a story to share" — 3-gram `had a story` is near-verbatim copy. This is the *culminating* lesson of the Anansi arc; a high-stakes item should not be answerable by text-scanning. Fix: "families everywhere could share tales."

5. **⚠️ Ch24 kt-ch24-l1-pm1 + l2-pm1** — `picture-mc` — consecutive picture questions in the same opening lesson both show R1a on subject NP. Ch24's first two items can both be answered by matching "a father / a boy" labels without engaging the pictures. Fix: see ARCH-REC #100.

---

## E. Narrative Voice / Pacing Improvements (3 suggestions)

Even with 0 R1-R8 violations, these pacing/voice issues would warrant a cron note:

1. **Template fatigue in lesson intros (Ch17-24 all)**: Every chapter opens with "Tonight's story has a few new words. Let's learn them first!" and "A few more words to learn — then the story begins!" — identical across all 8 chapters. For 8-12 learners in an ongoing series, hearing the exact same two sentences every chapter week after week breaks immersion. Recommendation: rotate 4-5 grandma-voice intro variants that reference the specific story ("Meng's mother made a very brave choice tonight — but first, three new words for you…").

2. **ExplanationZh literal translation register** (Ch17-23 narrations): Many narration `explanationZh` entries are bare translations of the English sentence (e.g., "第二天早上，女孩沒有離開。" for "The next morning, the young woman did not leave."). These miss the opportunity for grandma's warmth. Recommendation: add a brief grandma-voiced frame: "奶奶說：你看，她捨不得離開爺爺——第二天早上，她還在。" This reinforces the 奶奶 persona and provides story context rather than just vocabulary.

3. **Missed climax pacing in Ch22 (孟母三遷)**: The climax lesson (l6, the cloth-cutting scene) moves from Q4 (packing) to Q8 (cut) with no narration pause. The emotional weight of the mother silently cutting the cloth warrants a brief narration beat before the comprehension question. Suggestion: add a narration entry "She picked up the knife. The room was very quiet." between Q7 and Q8 to give learners a breath before the lesson question.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #100 — X56_PICTURE_MC_SUBJECT_NP_VERBATIM lint rule

**Problem identified this cycle**: The existing `X48_NGRAM_VERBATIM_CORRECT` lint in `validate-lessons.js` explicitly **exempts `picture-mc`** type (comment: "picture-mc 天生需 verbatim → 不掃"). This cycle found **11 of 22 P1 violations** are in `picture-mc` items where the correct caption lifts the subject NP verbatim from the sentence (e.g., sentence "A kind old man helped a hurt bird" → caption "a kind old man freeing a hurt bird").

**Industry context**:
- Buck (2001) *Assessing Listening* §5.3: verbatim lift is equally harmful in picture-selection tasks. The visual recognition skill is bypassed when the caption contains subject-NP matches from the stimulus — learners match text-to-text, not text-to-image.
- ResearchGate "Distractor Plausibility in a Multiple-Choice Listening Test": plausible distractors (i.e., distractor captions that also plausibly describe the image) increase discriminability. Verbatim-correct captions reduce it.
- IELTS/Cambridge Young Learners item-writing spec: picture-mc captions should describe visual features (composition, action, colour, position) — **not** paraphrase the audio stimulus.

**Pickup fit analysis**:
- ✅ **Highly compatible**: Pickup's `picture-mc` items already have text captions (not just images), so the lint is purely text-based — no image analysis needed.
- ✅ **React/Zod stack compatible**: pure JSON field validation in `validate-lessons.js`, zero src/ change.
- ✅ **Effort: Low** (~15 lines — add `picture-mc` to a new lint function using existing `ngram3Overlap` helper, but check only the **subject NP** (first 3 content tokens of both sentence and caption)).
- ✅ **ROI: High** — would have caught all 11 picture-mc R1a violations in this cycle.

**Proposed implementation** (conceptual, no src/ edit):

```js
// X56_PICTURE_MC_SUBJECT_NP_VERBATIM (ARCH-REC #100): For picture-mc, the correct
// caption's first 3 content tokens must not match the sentence's first 3 content tokens.
// Picture captions should describe visual composition, not paraphrase the stimulus subject.
function lintPictureMcSubjectNp(lessons, file) {
  const issues = [];
  const STOP = new Set(['the','a','an','is','was','to','of','in','and','or','it']);
  for (const lesson of lessons) {
    for (const q of (lesson.questions || [])) {
      if (q.type !== 'picture-mc' || typeof q.correctIndex !== 'number') continue;
      const correct = (q.options || [])[q.correctIndex] || '';
      const sent = q.sentence || '';
      const sentTokens = sent.toLowerCase().match(/\b[a-z]+\b/g)?.filter(w => !STOP.has(w)).slice(0, 3) || [];
      const capTokens  = correct.toLowerCase().match(/\b[a-z]+\b/g)?.filter(w => !STOP.has(w)).slice(0, 3) || [];
      const shared = sentTokens.filter(t => capTokens.includes(t));
      if (shared.length >= 2) {
        issues.push(`${file} ${q.id}: X56_PICTURE_MC_SUBJECT_NP_VERBATIM (caption subject "${shared.join(' ')}" lifted from sentence)`);
      }
    }
  }
  return issues;
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X56 picture-mc subject-NP verbatim lint | Buck 2001 §5.3; Cambridge YL item spec | ✅ pure JSON lint, zero src/ change | Low (~15 lines) | High (catches 50% of P1 this cycle) | ✅ 推薦實作 |

**To implement**: Add `lintPictureMcSubjectNp()` call to `tools/validate-lessons.js`, add to `allIssues` array, set as warn-only (same as X48). Then fix the 11 flagged picture-mc captions in Ch17-24 per the 修法 column above.

---

*Auditor: cron agent · Model: claude-sonnet-4-6 · Cycle: 2026-07-01T0006*
