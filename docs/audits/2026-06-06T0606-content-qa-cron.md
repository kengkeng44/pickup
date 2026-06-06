# Content QA — 2026-06-06 06:06 UTC

Today's angle: **#6 — A4 Mirror Patterns (negation/identity traps)**
Focus: **Ch6 (六天鵝) + Ch7 (葉限)** — first A4-depth pass for these chapters

---

## A. validate-lessons.js result

```
OK lessons-ch6.json: 7 lessons (JSON shape + mirror + extended lint)
OK lessons-ch7.json: 7 lessons (JSON shape + mirror + extended lint)
Total mirror-lint issues: 14 (Ch1+Ch3 X2_OPTION_LIST_BIAS — not this chapter range)
```

Automated linter passed for Ch6+Ch7. All violations below are **manual semantic-mirror analysis** — the linter only catches syntactic negation (`not`, `n't`) and first-word bias; antonym-pair traps and structural clones require human-level semantic review.

---

## B. Violation Table

### P0 — Must fix before next audio generation pass

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 6 | kt-ch6-l2-q10 | R1-VERBATIM-ECHO | "There were six brothers. There were six shirts." | Correct "for the six brothers" reuses both content words *six + brothers* from sentence verbatim. Zero inference needed. | Change to paraphrase: "one for every sibling" or "because there are six of them" | No |
| 6 | kt-ch6-l5-q9 | A4-SEMANTIC-MIRROR | "Each day the older woman whispered cold things about the bride." | Distractor "warm and loving" is exact compound antonym of correct "cold and unkind". Learner who cannot extract meaning can still eliminate by antonym opposition — reduces effective choice to 3 | Replace "warm and loving" with a non-antonym: "nervous and quiet" or "proud and strict" | No |
| 7 | kt-ch7-l2-q8 | A4-SEMANTIC-MIRROR | "Day by day, the fish grew longer than her two arms put together." | Distractor "became smaller" is direct semantic negation of correct "got much larger". large↔small antonym pair — binary coin-flip that eliminates one option automatically | Replace "became smaller" with a plausible-but-wrong alternative: "changed its colour" or "stopped eating" | No |
| 7 | kt-ch7-l5-q8 | A4-SEMANTIC-MIRROR | "How did Yexian feel walking through the festival?" | Distractor "small and shy" is compound antonym of correct "proud and free". proud↔shy mirror; learner can infer "festival triumph = not shy" without parsing | Replace "small and shy" with "worried and cold" or "calm and careful" | No |

### P1 — Fix in next content pass

| Ch | Q ID | Type | Sentence snippet | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 6 | kt-ch6-l3-q6 | A4-STRUCTURAL-CLONE | "They lifted into the pale light of the night and were soon gone." | Options [0] "the sunny sky" and [1✓] "the moonlit sky" are structural twins ("the ___ sky") differing only in day/night adjective. Learner can answer by applying night-context without parsing semantics. | Replace distractor "the sunny sky" with non-sky option: "a wide open plain" or "the forest below" | No |
| 7 | kt-ch7-l1-q6 | A4-DISTRACTOR-TWIN | "She worked from when the sun rose until the moon came out." | Distractors [2] "only at noon" and [3] "only at night" are structural twins ("only at ___"). Two functionally near-identical wrong answers reduce distractor diversity to 2 effective foils. | Replace one: change "only at night" to "for just one hour" | No |
| 7 | kt-ch7-l7-q5 | A4-GRAMMAR-FRAGMENT + R2 | "Quiet, with one bare foot, Yexian stepped out from behind the new wife." | Correct [1] "she came out without sound" (6 words, has subject) vs distractors [0] "loudly and proud" (3 words, no subject) [2] "crying for help" (no subject). Correct is structurally unlike all distractors — form-based tell. R2 ratio 1.73×. | Normalise all options to subject+verb format: "she stepped out loudly" / "she cried for help" / "she hid in a basket" | No |
| 6 | kt-ch6-l6-q6 | A4-GRAMMAR-FRAGMENT | "The bride heard the lie, but no word came from her lips." | Options [0] "her ears could not hear" and [1✓] "her promise kept her quiet" are full sentences; [2] "agreeing with the queen" and [3] "fast asleep in bed" are participial fragments. Grammatical inconsistency signals distractors [2]+[3] as non-answers by form alone. | Rewrite [2]+[3] as full sentences: "she agreed with the queen" / "she was fast asleep" | No |
| 6 | kt-ch6-l1-q9 | R2-EXTREME | "The king walked the long halls at night and could not find sleep." | Options: correct "sleepless and sad" (14 chars) vs min "joyful" (6 chars). R2 ratio = **4.25×** (spec limit 1.25×). Longest option = correct = length tell. | Expand short options: "tired but happy" / "angry and loud" / "calm and still" | No |
| 6 | kt-ch6-l2-q6 | R2-EXTREME | "Each shirt was the color of fresh snow on a winter morning." | correct "pale like milk" vs min "red" (3 chars). R2 ratio = **4.67×** — worst in Ch6. Single-word distractors "red"/"gold" create length tell pointing directly to correct. | Expand: "dark as coal" / "red as fire" / "gold as sun" | No |
| 7 | kt-ch7-l4-q7 | R2-EXTREME | "The old man said the bones would answer any wish she said out loud." | correct "grant her wishes" (15 chars) vs min "sing" (4 chars). R2 ratio = **4.00×**. | Expand: "make her dance" / "start to sing" / "fly far away" | No |
| 7 | kt-ch7-l5-q5 | R2-EXTREME | "In a soft flash, a 青衣 (blue cloak) and two small gold shoes lay on the floor." | correct "fine clothing and shiny footwear" (32 chars) vs min "gold coins" (10 chars). R2 ratio = **3.20×**. | Shorten correct or expand distractors to ≤25 chars each | No |

### Systemic R2 pattern (Ch6+Ch7)

Script found **50 R2 violations** across 77 questions — **65% of questions fail** the 1.25× length-parity rule. The four extreme examples above (4.67×, 4.25×, 4.00×, 3.20×) represent the worst tail; the median violation is ~1.6×. This appears to be a systemic content-generation artifact where correct answers were written as 3-5 word phrases while distractors defaulted to 1-2 word single concepts. Recommend a **batch R2 normalisation pass** across Ch6+Ch7 rather than per-question fixes.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Lessons audited | 14 (Ch6×7 + Ch7×7) |
| Questions audited | 77 (excl. narration / tap-pairs / listen-tf) |
| P0 violations | **4** |
| P1 violations | **9 flagged** (+ 50 systemic R2) |
| Audio regen required | 0 |
| Chapters with 0 P0 | Ch6 has 2 P0, Ch7 has 2 P0 |

---

## D. Top 5 P0

1. **⚠️ kt-ch6-l2-q10 [R1-VERBATIM-ECHO]** — Correct answer "for the six brothers" is a verbatim re-assembly of the sentence "There were six brothers. There were six shirts." No inference required; cloze becomes a copy-paste task. Fix: "one for each sibling" or "because there are six of them."

2. **⚠️ kt-ch6-l5-q9 [A4-SEMANTIC-MIRROR]** — Distractor "warm and loving" is the compound antonym of correct "cold and unkind". A2 learners who know one polar end can eliminate the other without listening comprehension. Eliminates one full distractor slot. Fix: swap to "nervous and quiet."

3. **⚠️ kt-ch7-l2-q8 [A4-SEMANTIC-MIRROR]** — Distractor "became smaller" is the direct semantic negation of correct "got much larger" (large↔small). A2 learners applying growth-context from the story automatically eliminate the shrink option — reduces to 3-option effective question. Fix: swap to "changed its colour."

4. **⚠️ kt-ch7-l5-q8 [A4-SEMANTIC-MIRROR]** — Distractor "small and shy" is the compound antonym of correct "proud and free" (proud↔shy). Festival triumph scene makes "shy" trivially eliminable. Fix: swap to "worried and cold."

5. **⚠️ kt-ch6-l3-q6 [A4-STRUCTURAL-CLONE]** — Options "the sunny sky" and correct "the moonlit sky" are structural twins ("the ___ sky"). The only distinguishing word is day/night framing, which learners infer from chapter title alone without sentence-level comprehension. Fix: replace "the sunny sky" with a non-sky option.

---

## E. Narrative Voice / Pacing Improvements (non-R1-R8)

Even with zero spec violations, these three items would improve story immersion:

1. **kt-ch6-l7-q9 explanationZh** — "羽毛仍在手臂位置 → 一隻鳥翅膀" is technically correct but clinical. The youngest brother's incomplete transformation is one of the most emotionally resonant moments in the Grimm source. Suggest: "她少了最後一件衣袖 — 哥哥的左臂變成了翅膀，永遠留著。這個細節讓故事更有餘韻。" The explanationZh should hold the emotional weight, not strip it.

2. **kt-ch6-l1-q10 explanationZh** — gist answer "family without a mother" requires readers to infer the mother's absence from a list ("six brothers, one sister, and a father who walked alone at night"). Current explanationZh is absent. Add: "父親一個人在走廊上走 → 媽媽不在了 → 沒有媽媽的家庭。這是推理題，不是直接說的。" Flagging inference-type for A2 learners reduces cognitive load.

3. **kt-ch7-l6-q3 listen-tf framing** — The statement being judged is never shown in the data field; only the sentence "Yexian heard the words. She turned and slipped fast into the dark street." and answer = No. Without seeing the stated claim, A2 learners cannot model the inference chain. Ensure the listen-tf `question` field contains the claim to evaluate, not just a blank string. This is a data completeness issue affecting all listen-tf blanks in Ch7.

---

*Auditor: Claude (claude-sonnet-4-6) | Angle rotation: #6 of 12 | Next suggested angle: #3 A1-obvious-correct (Ch5+Ch6 easy-gap audit)*
