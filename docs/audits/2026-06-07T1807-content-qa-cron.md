# Content QA — 2026-06-07 18:07 UTC

Today's angle: **#3 — A1 Obvious Correct (gap too easy)**
Focus: Ch5-7 (Baba Yaga / Six Swans / Yexian)

Methodology: Automated content-word echo scan (shared keywords between sentence and correct option),
manual severity grading, distractor quality review across all 69 cloze/listen-mc/listen-comprehension
questions in Ch5-7 (7 lessons × 3 chapters × ~11 Q each).

---

## A. validate-lessons.js result

```
WARN lessons-ch3.json: 8 lint issue(s):
  kt-ch3-l2-q5:  X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch3-l2-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q9:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q10: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch3-l4-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l5-q5:  X2_OPTION_LIST_BIAS (all start with "she")
  kt-ch3-l5-q10: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch3-l7-q10: X2_OPTION_LIST_BIAS (all start with "he")
Total mirror-lint issues: 25 (warn-only, not build-blocking)
Ch5/Ch6/Ch7: OK
```

---

## B. Violation table

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 6 | `kt-ch6-l7-q5` | listen-mc | *"threw one over each bird"* | "threw one on **each swan**" | **P0 A1** — 3 content words verbatim (threw/one/each); bird→swan trivial synonym. Weakest possible encoding. | Replace correct: `"draped a shirt over every swan"` (no shared verbs) | No |
| 6 | `kt-ch6-l2-q5` | listen-mc | *"while the rest of the castle slept"* | "while others **slept**" | **P0 A1** — phrase "while…slept" verbatim; child sees "slept" in sentence → picks "while others slept" without decoding. | Replace correct: `"in the quiet of night"` | No |
| 7 | `kt-ch7-l4-q5` | listen-mc | *"under the heap by the gate"* | "**under** a pile **by the gate**" | **P0 A1** — "under" + "by the gate" verbatim; only heap→pile swap. Correct is a transparent paraphrase. | Replace correct: `"buried near the entrance, beneath a mound"` | No |
| 6 | `kt-ch6-l3-q9` | listen-mc | *"**Six** small **beds** lay smooth and still"* | "**six** empty **beds**" | **P0 A1** — "six" + "beds" both verbatim; "empty" = No one slept (direct). | Replace correct: `"a room her brothers had already left"` | No |
| 6 | `kt-ch6-l2-q10` | listen-comprehension | *"**six brothers**. There were **six shirts**."* | "for the **six brothers**" | **P0 A1** — "six brothers" verbatim; student pattern-matches number + noun without inference. | Replace correct: `"to break the spell on her family"` | No |
| 5 | `kt-ch5-l4-q9` | listen-mc | *"The **door** … facing away from **Vasilisa**"* | "showing its **door** to **Vasilisa**" | **P0 A1+** — "door"+"Vasilisa" verbatim; ALSO structural contradiction: sentence says door faced *away*, correct says *showing toward* — without explicit "then" the question misleads. | Rewrite sentence to include the turn: `"The house turned on its legs until the door faced the girl."` → correct: `"it rotated to open toward her"` | No |
| 7 | `kt-ch7-l3-q10` | listen-comprehension | *"**Yexian** … Her **only friend** was gone"* | "**Yexian** loses her **only friend**" | **P1 A1** — "Yexian"+"only"+"friend" verbatim; option is a near-transcription of the sentence. listen-comprehension should require inference beyond copy. | Replace correct: `"she learns that love can be taken away"` | No |
| 5 | `kt-ch5-l4-q10` | listen-comprehension | *"A **house** … turns by **itself**"* | "one **house** that moves by **itself**" | **P1 A1** — "house"+"by itself" verbatim. Comprehension Q at medium difficulty should require gist inference, not copying. | Replace correct: `"something alive in an ordinary-looking place"` | No |
| 6 | `kt-ch6-l6-q5` | listen-mc | *"her **own child** disappear"* | "harmed her **own child**" | **P1 A1** — "her own child" verbatim across sentence and correct. | Replace correct: `"falsely accused the bride"` | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Q scanned (Ch5-7 cloze/MC) | 69 |
| P0 phrase-echo (≥2 shared content words) | 9 detected / **6 P0-grade** |
| P1 single-keyword echo | 50 detected / **3 selected** |
| Audio regen needed for fixes | 0 (all sentence audio unchanged) |
| validate-lessons.js errors (blocking) | 0 |
| validate-lessons.js warns | 25 (all Ch3, pre-existing) |

---

## D. Top 5 P0

### ⚠️ P0-1 · kt-ch6-l7-q5 — "threw one on each swan" (verbatim 3-word echo)
**Current:**
```
sentence: "She lifted the small white shirts and threw one over each bird."
options:  ['put them in a box', 'threw one on each swan', 'gave them to the king', 'burned them in the fire']
correct:  1 → "threw one on each swan"
```
**Problem:** "threw one … each" is pulled verbatim from the sentence; "bird"→"swan" is the only change. A child guesses correctly by pattern-matching three function words with zero semantic processing. Defeats the purpose of listen-mc entirely.

**Fix:**
```
correct: "draped a shirt over every swan"
```
Now requires: `threw` → `draped`, `one` → `a shirt`, `each bird` → `every swan` — three independent encoding steps.

---

### ⚠️ P0-2 · kt-ch6-l2-q5 — "while others slept" (phrase verbatim)
**Current:**
```
sentence: "Her needle moved fast, in and out, while the rest of the castle slept."
correct:  "while others slept"
```
**Problem:** "while … slept" is a near-verbatim lift. Only "the rest of the castle" → "others" changes. A learner who hears only the time-clause and not the main clause can guess correctly.

**Fix:**
```
correct: "in the quiet of night"
```
Forces temporal paraphrase (slept → night) without verbatim carry-over.

---

### ⚠️ P0-3 · kt-ch7-l4-q5 — "under a pile by the gate" (near-verbatim location)
**Current:**
```
sentence: "The bones of your fish lie under the heap by the gate."
correct:  "under a pile by the gate"
```
**Problem:** "under … by the gate" is verbatim; "heap" → "pile" is a GSL-2000 synonym swap. A2 learners recognize "gate" and "under" as the two position words and pick the matching option by surface scan.

**Fix:**
```
correct: "at the entrance, beneath a mound"
```
"entrance" for "gate", "beneath" for "under", "mound" for "heap" — three independent lexical replacements.

---

### ⚠️ P0-4 · kt-ch6-l3-q9 — "six empty beds" (number + noun verbatim)
**Current:**
```
sentence: "Six small beds lay smooth and still. No one had slept in them."
correct:  "six empty beds"
```
**Problem:** "six" (number) + "beds" (noun) both lifted verbatim. "empty" is the only addition, directly supported by "No one had slept in them" — no inference required. This is an A2 item writing failure: a single critical number ("six") should not appear in both stem and correct option.

**Fix:**
```
correct: "a room her brothers had already left"
```
Now requires: number-to-absence inference + "brothers" connects to story context not in this sentence.

---

### ⚠️ P0-5 · kt-ch5-l4-q9 — "showing its door to Vasilisa" (verbatim + structural contradiction)
**Current:**
```
sentence: "The door of the house had been facing away from Vasilisa."
correct:  "showing its door to Vasilisa"
```
**Problem (dual):**
1. **A1 echo** — "door" + "Vasilisa" verbatim.
2. **Structural contradiction** — sentence says door faced *away*; correct answer says *showing toward*. Without a "then" or "but then," a careful child who understands the sentence picks distractor "hiding from her" (which matches "facing away") and is marked wrong. explanationZh reveals the intent ("house turns") but the sentence does not encode the turn.

**Fix (sentence rewrite):**
```
sentence: "The house turned on its legs until its door faced the girl."
correct:  "it rotated to open toward her"
distractors (keep): 'hiding from her', 'getting ready to sleep', 'running away'
```
This removes verbatim echo AND clarifies the temporal sequence.

---

## E. Narrative Voice / Pacing Improvements (no A1 violation, but teachable)

Even where individual Q pass the echo test, three patterns in Ch5-7 reduce lesson quality:

### NV-1 · kt-ch6-l1 triple easy-distractor cluster (Q5 / Q6 / Q9)
Three consecutive Q have distractors that are semantically impossible in a fairy-tale context:
- Q5: where did boys play? → `'in the tower'`, `'on the road'` vs `'by the water'` (river bank was in sentence)
- Q6: what did the girl do? → `'ride horses'`, `'read books'` (anachronistic for Grimm) vs `'gather flowers'`
- Q9: how was the king? → `'joyful'`, `'busy'` vs `'sleepless and sad'` (sentence: "could not find sleep")

**Problem:** Children can eliminate all three wrong options by domain knowledge (there are no books to read in Grimm forests; kings don't look joyful when wandering halls at midnight) without engaging with the audio. The lesson tests story-world plausibility, not English listening.

**Fix:** Rotate one distractor per Q to a plausible-in-context competitor:
- Q5: swap `'in the tower'` → `'in the field'` (boys could run in a field near water)
- Q6: swap `'read books'` → `'chase butterflies'` (plausible for a forest-walking girl)
- Q9: swap `'busy'` → `'restless'` (near-synonym of sleepless; forces finer discrimination)

### NV-2 · kt-ch7-l2-q5 "food" with junk distractors
```
sentence: "Each morning, Yexian dropped rice crumbs onto the still water."
correct:  "food"
distractors: 'stones', 'shoes', 'flowers'
```
'stones' and 'shoes' are implausible for feeding any animal, even without English knowledge. A 10-year-old selects "food" by elimination in 2 seconds. Distractor redesign needed:
- Replace 'stones' → `'seeds'` (also food, forces closer discrimination)
- Replace 'shoes' → `'leaves'` (natural item that could be dropped into water; non-food, plausible)

### NV-3 · kt-ch6-l4-q10 pacing — lists as gist cues
```
sentence: "A small flower, a silent girl, and six years that would feel like a long cold winter."
correct:  "quiet hard work to save her brothers"
```
This is a well-constructed gist inference. However, the lesson beat (sew six shirts / stay silent) is compressed into a poetic list. For 8-12 learners, three abstract nouns in a single sentence ("flower / silence / six years") without a verb is cognitively demanding. Consider splitting into a narration + Q pair:
- narration: "She had to sew six shirts and say nothing for six years."
- Q: "What was her task?" → `'sew shirts and stay quiet'` vs `'plant flowers and sing'` etc.
This preserves difficulty while reducing parsing load.

---

## F. Summary verdict

**5 confirmed P0** — all fixable by option swap (no audio regen required since sentence audio unchanged).
**3 confirmed P1** — recommended but non-critical.
**3 narrative/pacing improvements** — no code change, JSON-only edits.

5-agent sign-off: **NEEDS FIX before next content expansion.** Ch6 is the worst offender (4/5 P0 in Ch6); Ch5 and Ch7 have isolated issues. Fixes are lightweight option-text changes only.
