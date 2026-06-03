# Content QA — 2026-06-03 06:06 UTC

Today's angle: **#6 — A4 Mirror Patterns (negation/identity distractors)**
Focus: **Ch6 (六隻天鵝 / Six Swans), Ch7 (葉限 / Ye Xian)** — cross-validated against Ch0–Ch5 for pattern scope

---

## A. validate-lessons.js result

```
All 8 chapters pass schema check.
Total mirror-lint issues: 456 (warn-only)
  Breakdown: X1_SENTENCE_IS_QUESTION + X2_OPTION_LIST_BIAS + X3_R1_VERBATIM_WORDS
  Ch6: 32 lint issues  |  Ch7: 65 lint issues
```

---

## B. Violation Table

| Ch | Q ID | Type | Sentence (snippet) | Violation | 修法 | Audio regen? |
|----|------|------|-------------------|-----------|------|--------------|
| 7 | kt-ch7-l14-q2 | listen-mc | "The stepmother says, you is unable to arrive with us." | **A4-STRUCT-ALL4** — all 4 opts follow "you [modal] come" frame; zero comprehension tested, pure modal substitution | Replace 2 distractors with content-different options: "she went alone" / "she left early" | no |
| 7 | kt-ch7-l7-q2 | listen-mc | "She shares softly her secrets to the fish." | **A4-STRUCT-ALL4** — all 4 opts "she [verb] them" (shouts/sings/writes/whispers); verb-only substitution, "softly" in sentence telegraphs "whispers" | Replace 2 opts: "she kept them hidden" / "she wrote in the sand" | no |
| 7 | kt-ch7-l8-q1 | listen-mc | "The fish grows larger and larger every passing seven days." | **A4-STRUCT-ANTONYM** — opts[2] "smaller each week" / opts[3] "bigger each week" are structural antonyms; one can be eliminated without listening | Change opt[2]: "lighter each month" | no |
| 6 | kt-ch6-l6-q5 | listen-comp | "Did they speak before they flew?" | **A4-YES/NO-MIRROR + X1** — sentence IS a question; opts[1]="no, they did not" vs opts[3]="yes, they did"; sentence polarity ("Did they") already signals "no" | Rewrite sentence to declarative: "The brothers flew away without a word." Then remove yes/no pair | yes |
| 6 | kt-ch6-l12-q1 | listen-mc | "Half of twelve." | **R5-DUPE + expl-MISMATCH** — identical sentence to kt-ch6-l4-q1; explanationZh "sew = 縫。她要縫六件…" belongs to a sewing Q, not a number Q | Remove duplicate sentence or give different context; fix explanationZh to "six = 六。半個十二就是六。" | no |
| 6 | kt-ch6-l8-q2 | listen-mc | "She would not stay there." | **A4-YES/NO-MIRROR** — opts[1]="no" vs opts[3]="yes"; sentence's "would not" immediately resolves the pair | Replace with action-options: "she turned around" / "she sat down and cried" | no |
| 6 | kt-ch6-l14-q4 | listen-comp | "She would not say a word." | **A4-YES/NO-MIRROR** — opts[1]="no, she did not" vs opts[2]="yes, she did"; negation in sentence ("would not") telegraphs answer | Replace yes-option: "she hummed a tune" | no |
| 6 | kt-ch6-l16-q4 | listen-comp | "At final the king believed her." | **A4-YES/NO-MIRROR** — opts[2]="yes, at last" vs opts[3]="no, never"; polar pair within 4 options reduces real choice to 3 | Replace no-option: "he sent her away" | no |
| 7 | kt-ch7-l24-q1 | listen-mc | "Hana…asks: was Ye Xian afraid?" | **A4-STRUCT-ALL4** — ALL 4 opts "was she [adj]" (pretty/rich/scared/sleeping); sentence already contains "afraid" → "scared" is R1-transparent | Replace 2 opts: "did she cry" / "was she alone" | no |
| 6 | kt-ch6-l7-q5 | listen-comp | "Could they come back as boys?" (X1) | **A4-YES/NO-MIRROR + X1** — opts[1]="yes, right away" vs opts[3]="no, never again" | Rewrite sentence to declarative: "Not yet — they were still birds." Remove yes/no | yes |
| 6 | kt-ch6-l5-q3 | listen-comp | "He did not tell his new wife." | **A4-YES/NO-MIRROR** — opts[0]="no, he did not" vs opts[2]="yes, he did"; "did not" in sentence resolves immediately | Replace "yes, he did" → "only the cook knew" | no |
| 6 | kt-ch6-l9-q4 | listen-comp | "She did not turn back." | **A4-YES/NO-MIRROR** — opts[0]="yes, she ran home" vs opts[1]="no, she went on" | Replace "yes" option: "she stopped to rest first" | no |
| 6 | kt-ch6-l13-q3 | listen-comp | "She made no shouts." | **A4-YES/NO-MIRROR** — opts[0]="no, she stayed silent" vs opts[1]="yes, very loud" | Replace "yes" option: "she whistled once" | no |
| 6 | kt-ch6-l25-q15 | listen-mc | "Will Mochi come back tomorrow?" (X1) | **A4-YES/NO-MIRROR + X1** — opts [No/Yes/Never/Maybe]; 3-of-4 are yes/no variants | Rewrite as: "Mochi jumps down and walks toward the dark street." + detail question | yes |
| 7 | kt-ch7-l18-q2 | listen-mc | "She says yes, but only past in time she thinks for one hushed instant." | **A4-YES/NO-MIRROR + grammar-error** — opts[1]="no right away" vs opts[3]="yes after a quiet moment"; sentence also grammatically malformed ("only past in time") | Fix sentence: "She says yes, but she pauses for one quiet moment." Replace no-option: "she shook her head and left" | yes |
| 7 | kt-ch7-l24-q2 | listen-mc | "I think for a moment and answer: yes, she was full of dread." | **A4-YES/NO-MIRROR** — opts[1]="yes she was scared" vs opts[3]="no she was happy"; sentence states "yes" + "dread" explicitly | Replace no-option: "she was calm and ready" | no |
| 7 | kt-ch7-l8-q4 | listen-emoji | "Ye Xian looks at the fish with shining pleased looks." | **A4-STRUCT-x4** — ALL 4 opts "with [adj] eyes" (sleepy/empty/angry/proud); "pleased" in sentence narrows to "proud" trivially | Replace 2 opts: "like a mother watching her child" / "like someone seeing snow for the first time" | no |
| 6 | kt-ch6-l5-q2 | listen-mc | "The king hid the boys in a forest matter." | **A4-STRUCT-ALL4** — ALL 4 opts "in a [location]" (wood/tower/barn/cave); location substitution only | Replace 2 opts: "with a trusted farmer" / "far from the castle" | no |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Qs inspected (Ch6+Ch7, 8 lessons × 2 ch) | ~96 |
| A4-YES/NO-MIRROR | 11 |
| A4-STRUCT-MIRROR (all-same-frame) | 5 |
| A4-STRUCT-ANTONYM pair | 2 |
| R5-DUPE (cross-lesson identical sentence) | 4 (Ch6) |
| X1-Sentence-Is-Question (Ch6+Ch7) | 37 combined |
| explanationZh content mismatch | 1 (kt-ch6-l12-q1) |
| Grammar error in sentence | 1 (kt-ch7-l18-q2) |
| **Total distinct violations** | **18** |
| Audio regen needed | 4 |

**Systemic scope of X1 (sentence-is-question) across all chapters:**

| Ch | X1 count |
|----|---------|
| Ch0 | 1 |
| Ch1 | 0 |
| Ch2 | 1 |
| Ch3 | 0 |
| Ch4 | 25 |
| Ch5 | 32 |
| Ch6 | 10 |
| Ch7 | 27 |

Ch4–Ch7 carry 94 sentence-is-question instances. These are structural spec violations (R7 / UX canonical spec): `sentence` is the audio stimulus; when it is itself a question, learners hear "Why does Ye Xian whisper…?" then are asked "Why does Ye Xian whisper…?" again — zero new audio information.

---

## D. Top 5 P0

### P0-1 — kt-ch7-l14-q2: ALL-MODAL distractor frame (zero-comprehension Q)
```
sentence: "The stepmother says, you is unable to arrive with us."
opts:  ✓ you cannot come  |  ✗ you must come  |  ✗ you may come  |  ✗ you should come
```
Every option uses identical frame "you [modal] come." A2 learner only needs to match "unable" → "cannot" — no inference, no comprehension. Three functional distractors (cannot/must/may) differ only in modal polarity. Scores as modal-grammar fill-in, not listening comprehension.

**Fix:** Replace opts[1] and opts[2] with content-different distractors:
- `"she told her to clean first"` (partial-parse failure mode)
- `"she forgot about the festival"` (schema-inference failure mode)

---

### P0-2 — kt-ch6-l12-q1: Duplicate sentence + wrong explanationZh
```
sentence: "Half of twelve."  (identical to kt-ch6-l4-q1)
correct answer: six  ✓
explanationZh: "sew = 縫。她要縫六件,每件用星花做。"  ← belongs to a different question
```
The explanation talks about sewing shirts when the Q is about a number. Learner who got it wrong reads the explanation and gets zero useful feedback. Also violates R5 (cross-lesson identical sentence).

**Fix:** Give kt-ch6-l12-q1 a new sentence with the same content word in context ("She must sew **six** shirts, one for each brother.") and fix explanationZh: "six = 六。六個哥哥,六件襯衫。"

---

### P0-3 — kt-ch7-l7-q2: ALL-VERB distractor frame + R1 leak
```
sentence: "She shares softly her secrets to the fish."
opts: ✗ she shouts them | ✗ she sings them | ✗ she writes them | ✓ she whispers them
```
"Softly" in the sentence is a near-direct paraphrase cue for "whispers." All 4 options share "she [verb] them" — the only cognitive task is pick-the-right-verb, which "softly" resolves without comprehension of the full sentence.

**Fix:** Change 2 distractors to break the uniform frame:
- `"she hides them in her heart"` (plausible, tests inference)
- `"the fish already knows"` (schema-driven distractor)

---

### P0-4 — kt-ch6-l6-q5: X1 + A4-YES/NO double violation
```
sentence: "Did they speak before they flew?"   ← IS a question (X1)
opts: ✗ they laughed | ✓ no, they did not | ✗ they cried | ✗ yes, they did
```
Two violations stack: (1) the sentence field is itself a question, so the audio stimulus is "Did they speak before they flew?" followed by the same implicit question — confusing. (2) opts 2 and 4 are a yes/no mirror; the sentence's interrogative polarity points to "no" before even processing options [they laughed / they cried].

**Fix:** Rewrite sentence to declarative audio: `"The brothers flew away without a single word."` Remove yes/no options, replace with: `"they looked at her once"` / `"they waited for her to speak first."`

---

### P0-5 — kt-ch7-l8-q1: Structural antonym mirror reduces effective options to 3
```
sentence: "The fish grows larger and larger every passing seven days."
opts: ✗ thinner each day | ✗ louder each night | ✗ smaller each week | ✓ bigger each week
```
opts[2] "smaller each week" and opts[3] "bigger each week" are structural antonym mirrors — identical frame, opposite adjective. "Larger and larger" in sentence instantly eliminates opts[2] by direction alone, narrowing the real competition to 3 options. This is the textbook A4-NEGATE mirror case (Buck 2001: paired yes/no or big/small options inflate guessing probability).

**Fix:** Replace opts[2]: `"the same size every week"` → forces learners to confirm the change direction, not just eliminate the antonym.

---

## E. Narrative Voice Improvements (no R-rule violation, but pacing/register)

1. **kt-ch7-l24 Epilogue options feel list-y:** Q "If I had a wish, what would I want most?" opts [a tall tower / a gold crown / a warm yard every night / a long red robe]. The correct answer "a warm yard every night" is emotionally rich — but the distractors are cardboard-royal props. Emotionally resonant wrong answers deepen the scene: replace with `"my father back again"` / `"one friend who never leaves"` — these are plausible Mochi-voice wishes that make the Q feel like introspection, not a costume catalogue.

2. **kt-ch7-l12-q4 "good wish in her chest" — underplayed moment:** sentence "She listens with good wish in her chest." opts [hope / anger / fear / pain]. "Good wish" is beautiful writing but opts[2] "fear" and opts[3] "pain" don't belong in this scene — the old man just appeared with comfort. Replace with `"wonder"` and `"quiet surprise"` to keep the emotional register consistent and make wrong answers plausible within the scene.

3. **kt-ch6 yes/no answer density (9 of 25 lessons contain yes/no mirrors):** The entire Six Swans chapter over-relies on yes/no confirmation questions ("Did she speak? No. Could they return? Not yet. Would she stay? No."). This turns the chapter into a compliance-quiz ("did X happen?") rather than a comprehension challenge. Recommendation: for every declarative negative sentence (e.g. "She would not stay."), replace the yes/no pair with **why** or **what next** alternatives — pushes learners from recognition into inference.

---

*Audit produced by Content-QA cron agent — angle #6 A4 Mirror Patterns — 2026-06-03 06:06 UTC*
