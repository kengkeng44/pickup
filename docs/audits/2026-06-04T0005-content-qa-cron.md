# Content QA — 2026-06-04 00:05 UTC

Today's angle: **#8 — A6 option-in-question (+ full R1/A5/R2 extended scan)**
Focus: **Ch3 + Ch4** (first deep A6/R1/A5 pass for these chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch0.json: 4 lint issue(s)
WARN lessons-ch1.json: 52 lint issue(s)
WARN lessons-ch2.json: 85 lint issue(s)
WARN lessons-ch3.json: 84 lint issue(s)
WARN lessons-ch4.json: 63 lint issue(s)
WARN lessons-ch5.json: 59 lint issue(s)
WARN lessons-ch6.json: 44 lint issue(s)
WARN lessons-ch7.json: 65 lint issue(s)
Total mirror-lint issues: 456 (warn-only)
```

A6-STRICT (option verbatim in question stem): **0** — no pure A6 violations found.
Extended scan revealed 258 total issues across Ch3+Ch4 spanning R1, A5, R2, and a new structural class SENT-IS-Q unique to Ch4.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence (snippet) | Violation | 修法 | Audio regen? |
|----|------|------|-------------------|-----------|------|--------------|
| 3 | kt-ch3-l13-q6 | listen-mc | "Tortoise does not wake Hare because winning fairly matters..." | **R1-VERBATIM-EXACT**: correct = "Winning fairly matters more than winning early" = sentence clause | Rewrite correct: "Fair play is more important than being first" | yes |
| 3 | kt-ch3-l16-q6 | listen-mc | "Tortoise touches the tree gently because finishing is sacred to him." | **R1-VERBATIM-EXACT**: correct = "Finishing is sacred to him" — lifted directly | Rewrite correct: "Completing his promise means everything" | yes |
| 3 | kt-ch3-l18-q6 | listen-mc | "The main lesson is that steady effort beats raw speed." | **R1-VERBATIM-EXACT**: correct = "Steady effort beats raw speed" — sentence minus preamble | Rewrite sentence: "He who keeps going, arrives." Correct: "Steady effort wins" | yes |
| 3 | kt-ch3-l22-q5 | listen-mc | "The lesson is simple. A safe quiet life beats a fancy scary one." | **R1-VERBATIM-EXACT**: correct = "A simple safe life beats a fancy scary one" — minor reorder | Rewrite correct: "Peace at home outweighs thrills outside" | yes |
| 3 | kt-ch3-l25-q9 | listen-mc | "Grandma tells this story tonight to remind us that slow can still win." | **R1-VERBATIM-EXACT**: correct = "To remind us that slow can still win" | Rewrite correct: "Patience wins over hurry" | yes |
| 3 | kt-ch3-l25-q10 | listen-mc | "After the story, Mochi thinks she can keep going too, one step at a time." | **R1-VERBATIM-EXACT**: correct = "I can keep going too, one step at a time" — sentence 1:1 echo in 1st person | Rewrite correct: "One small step always leads somewhere" | yes |
| 3 | kt-ch3-l3-q5 | listen-mc | "The slow tortoise might win because he does not stop." | **R1-VERBATIM**: correct = "Because he does not stop" | Rewrite correct: "He never quits the path" | yes |
| 3 | kt-ch3-l6-q6 | listen-mc | "Tortoise accepts the race because he believes slow can still finish." | **R1-VERBATIM**: correct = "He believes slow can still finish" — causal clause lifted | Rewrite correct: "He trusts his own steady pace" | yes |
| 3 | kt-ch3-l8-q6 | listen-mc | "Hare runs fast at the start because he wants to show off his speed." | **R1-VERBATIM**: correct = "He wants to show off his speed" | Rewrite correct: "He needs everyone to see how fast he is" | yes |
| 3 | kt-ch3-l9-q6 | listen-mc | "Tortoise does not run faster because he knows his pace is his strength." | **R1-VERBATIM**: correct = "He knows his pace is his strength" | Rewrite correct: "Going slow on purpose is his plan" | yes |
| 3 | kt-ch3-l11-q6 | listen-mc | "The shady bush makes him sleepy because shade and quiet feel safe." | **R1-VERBATIM**: correct = "Shade and quiet feel safe" | Rewrite correct: "Comfort tricks the body into rest" | yes |
| 3 | kt-ch3-l12-q6 | listen-mc | "Tortoise does not stop at the river because stopping makes finishing harder." | **R1-VERBATIM**: correct = "Stopping makes finishing harder" | Rewrite correct: "Every pause costs more than it saves" | yes |
| 3 | kt-ch3-l15-q6 | listen-mc | "Seeing the tree gives him strength because a clear goal makes tired legs move." | **R1-VERBATIM**: correct = "A clear goal makes tired legs move" | Rewrite correct: "Knowing where you're going fuels the body" | yes |
| 3 | kt-ch3-l17-q6 | listen-mc | "Hare is too late because speed cannot fix lost time." | **R1-VERBATIM**: correct = "Speed cannot fix lost time" | Rewrite correct: "Running fast cannot undo wasted hours" | no (minor) |
| 4 | kt-ch4-l1-q5 | listen-mc | "Where is the warm sandy wind from?" | **SENT-IS-Q + R1**: sentence field IS a question. Correct: "from a desert" verbatim from implied answer | Rewrite sentence to statement: "The warm sandy wind drifts in from a faraway desert." | yes |
| 4 | kt-ch4-l2-q5 | listen-mc | "What paper sheet does Grandma open?" | **SENT-IS-Q**: sentence field is a question. TTS reads a question; listen-mc format broken | Rewrite: "Grandma opens a page covered in golden sand and footprints." | yes |
| 4 | kt-ch4-l3-q5 | listen-mc | "Why does the book say 'O Best Beloved'?" | **SENT-IS-Q**: sentence is a question | Rewrite: "The book speaks to you as if you are the most important person in the world." | yes |
| 4 | kt-ch4-l4-q6 | listen-mc | "What do the Horse and Dog already do?" | **SENT-IS-Q**: sentence is a question | Rewrite: "The Horse pulls heavy loads; the Dog guards the house at night." | yes |
| 4 | kt-ch4-l5-q6 | listen-mc | "Why does the Camel stay in the desert?" | **SENT-IS-Q**: sentence is a question | Rewrite: "The Camel lives far away in the desert and will not come out." | yes |
| 4 | kt-ch4-l6-q5 | listen-mc | "The Camel only said, 'Humph!'" | **R1-VERBATIM-EXACT**: correct = "Humph" lifted directly | Rewrite sentence: "The great animal turned his face away and gave one sound." Correct: "Humph" (phonological Q — OK to keep word, fix sentence) | yes |
| 4 | kt-ch4-l6-q6 | listen-mc | "What does 'Humph!' mean from the Camel?" | **SENT-IS-Q**: sentence is a question | Rewrite: "His one word carried all his refusal." | yes |
| 4 | kt-ch4-l7-q5 | listen-mc | "Why does the Camel only say 'Humph!'?" | **SENT-IS-Q**: sentence is a question | Rewrite: "Words were too much effort for a Camel who did no work." | yes |
| 4 | kt-ch4-l11-q1 | listen-mc | "How many times has the Camel said 'Humph!'?" | **SENT-IS-Q**: sentence is a question | Rewrite: "By now the Camel has refused three times — once for each animal." | yes |
| 4 | kt-ch4-l15-q3 | listen-mc | "What is this I hear of your doing no put in effort?" | **SENT-IS-Q**: sentence is a question (also grammatically broken: "doing no put in effort") | Rewrite: "I hear you have been doing nothing at all since the beginning of Monday morning." | yes |
| 4 | kt-ch4-l25-q5 | tap-pairs | "Why didn't the Camel want to work?" | **SENT-IS-Q in review**: tap-pairs sentence field is a question; entire L25 review lesson has 8 SENT-IS-Q | Review lesson structure: sentence should be a Chinese prompt, not an English question; or use tap-pairs type which does not use TTS audio | no |
| 4 | kt-ch4-l4-q2 | listen-mc | "The animals began to work for Man." | **R1-VERBATIM**: correct = "Man" — single proper noun verbatim | Change question: "Who do the animals serve?" → correct: "the master" or "a human farmer" | yes |
| 4 | kt-ch4-l4-q4 | listen-mc | "The Dog had his collar." | **R1-VERBATIM**: correct = "collar" — single noun verbatim extraction | Rewrite sentence: "The Dog wore something around his neck that marked him as owned." Correct: "collar" (phonological OK — but sentence must not contain it) | yes |
| 4 | kt-ch4-l18-q3 | listen-mc | "You will work three days without eating." | **R1-VERBATIM**: correct = "eating" | Rewrite sentence: "Your back will carry the load your laziness left behind." Correct: "going hungry" | yes |
| 3 | kt-ch3-l2-q3 | listen-mc | "She holds a story book." | **R1-SINGLE-WORD**: correct = "book" | Rewrite sentence: "She cradles an old thing held together by cracked leather." Correct: "book" (borderline — keep if phonological distractor set is functional) | no |
| 3 | kt-ch3-l10-q3 | listen-mc | "I have plenty of time." | **R1-SINGLE-WORD**: correct = "time" | Rewrite sentence: "He felt sure nothing could hurry him." Correct: "time" | yes |
| 3 | (multiple) | listen-mc | (various) | **A5-LENGTH-TELL (41 in Ch3, 44 in Ch4)**: correct option is the longest in its set — systematic across both chapters | See §C for scale; fix: pad distractors to match correct length OR trim correct | no |
| 3+4 | (multiple) | listen-mc | (various) | **R2-LEN-RATIO (38 Ch3, 34 Ch4)**: ratio > 1.5× in 72 question sets | Fix distractor set to ≤1.25× range | no |

---

## C. Stats

| Metric | Ch3 | Ch4 | Total |
|--------|-----|-----|-------|
| Lessons scanned | 25 | 25 | 50 |
| Questions scanned | ~175 | ~175 | ~350 |
| A6-STRICT (option verbatim in question) | 0 | 0 | 0 |
| R1-OPT-IN-SENTENCE (verbatim lift from sentence) | 50 | 26 | **76** |
| — of which multi-word clause exact match | 14 | 6 | **20** P0 |
| — of which single content word | 36 | 20 | 56 P1 |
| SENT-IS-Q (sentence field is a question) | 0 | **25** | **25** P0 |
| A5-LENGTH-TELL (correct = longest option) | 41 | 44 | **85** P1 |
| R2-LEN-RATIO (>1.5× length spread) | 38 | 34 | **72** P1 |
| validate-lessons lint issues | 84 | 63 | 147 |

**A6 finding**: Zero pure A6 violations. The extended scan revealed the primary pathology in Ch3+Ch4 is **R1 (option lifted from sentence)** not A6 (option in question stem). The two are related — both short-circuit recall by making the target too visible — but Ch3/Ch4 AI generation consistently paraphrased within the sentence rather than across question↔answer.

---

## D. Top 5 P0

### P0-1: Ch4 SENT-IS-Q — 25 structural failures (CRITICAL)

**Pattern**: Ch4's `sentence` field contains English questions ("Where is the warm sandy wind from?", "Why does the Camel stay in the desert?") instead of declarative audio statements. For a `listen-mc` question, the sentence IS the TTS audio. When learners hear a question, then see a follow-up question, the format collapses: the audio answers itself.

**Worst example** — `kt-ch4-l15-q3`:
- sentence: `"What is this I hear of your doing no put in effort?"` (also grammatically broken)
- question: `"What does the Djinn say to the Camel?"`
- This means the TTS reads a broken interrogative, then learners answer a question about what they just heard. Zero comprehension required — they just repeat the question.

**Fix template**: Convert each question-sentence to a declarative statement expressing the same information.
- Before: `"Where is the warm sandy wind from?"`
- After: `"The warm sandy wind drifts in from a faraway desert."`

Audio regen required for all 25.

---

### P0-2: Ch3 multi-word clause R1 verbatim (14 exact lifts)

**Pattern**: The longest Q6-position questions across Ch3's main-story arc (L3–L18) all follow the same generation pattern:
1. Sentence states: `"X because Y."`
2. Question asks: `"Why X?"`
3. Correct option: `"Y"` — exact clause from sentence

Examples of **exact** or near-exact copies:
- L13-q6: "winning fairly matters more than winning early" → correct: "Winning fairly matters more than winning early" (IDENTICAL)
- L16-q6: "finishing is sacred to him" → correct: "Finishing is sacred to him" (IDENTICAL, only capitalization differs)
- L18-q6: "steady effort beats raw speed" → correct: "Steady effort beats raw speed" (IDENTICAL)
- L22-q5: "A safe quiet life beats a fancy scary one" → correct: "A simple safe life beats a fancy scary one" (one synonym swap — "simple" for "quiet")

A learner who processes English at A2 level can identify the answer by matching words, not by comprehending the story. Defeats the inference and comprehension goals entirely.

**Fix**: Paraphrase correct options using synonym / hypernym / pragmatic reformulation per Buck 1991:
- "Winning fairly matters more than winning early" → "Playing honestly matters more than finishing first"
- "Finishing is sacred to him" → "Completing his promise means everything"
- "Steady effort beats raw speed" → "Small steps beat one big sprint"
- "A safe quiet life beats a fancy scary one" → "Peace at home outweighs thrills outside"

---

### P0-3: Ch4 "Humph!" R1 repetition cluster (3 questions, same word, same lesson chain)

**Questions**: `kt-ch4-l6-q5`, `kt-ch4-l7-q1`, `kt-ch4-l16-q1`

All three have:
- sentence: `"The Camel only said, 'Humph!'"` (or near-identical variant)
- question: `"What does the Camel say?"`
- correct: `"Humph"`

This is simultaneously:
- **R1 violation**: "Humph" is verbatim in the sentence
- **A7 cross-question repetition**: same phonological test three times across three lessons
- **No depth progression**: if the goal is to teach "Humph = refusal", one question suffices; the second and third are redundant and trivially easy

**Fix**: Keep one R1-clean version (rewrite sentence to not contain "Humph"), use L7 and L16 slots for inference questions about the Camel's attitude or the Djinn's reaction.

---

### P0-4: A5-LENGTH-TELL systematic (85 questions, both chapters)

**Pattern**: The correct option is the longest option in its set in 85/350 questions (24%). This is a well-documented psychometric tell — test-savvy learners default to the longest option under time pressure. At A2 level, this coaching cue is especially harmful because learners may learn "longest = correct" rather than language.

**Worst ratio cases**:
- `kt-ch3-l4-q5`: options `confident | shy | proud | thirsty` — correct "confident" (9 chars) vs min "shy" (3 chars) → **3.0×**
- `kt-ch3-l2-q4`: correct "peaceful" vs "noisy"/"calm"/"spicy" → **2.0×**

**Fix**: Trim correct options or lengthen two distractors so the set stays within 1.25× per R2.

---

### P0-5: Ch3 "lesson announcement" pacing collapse (L18–L22 arc)

Not a hard rule violation — a narrative voice / design quality issue that surfaces across 5 consecutive lessons.

**Pattern**: Every final question (Q6) in L18–L22 follows this template:
- sentence: `"The main lesson is that [moral]."`
- question: `"What is the lesson?"`
- correct: the moral restated (near-verbatim)

This pattern appears **5 times in a row** (L18 tortoise/hare, L19 crow/cheese, L20 crow/cheese part 2, L21 city/country mouse, L22 city/country mouse part 2). After the second instance, a learner could scan for "The main lesson is..." and select the matching option without listening at all.

**Better design**: Mix the lesson-extraction question with:
- Inference: "What would the hare do differently if the race happened again?" (requires story comprehension, no scanning)
- Character emotion: "How does Tortoise feel as he crosses the finish line?" (requires emotional inference)
- Application: "Which of these is most like Tortoise's plan?" (transfer)

Interspersing these question types would restore the comprehension gate.

---

## E. Narrative Voice / Pacing Improvements (non-R1-R8)

### NV-1: Ch4 Kipling POV inconsistency

Ch4 uses three different narrator voices within the same story:
1. Kipling 2nd-person address: "O Best Beloved" (L3)
2. Outer-frame 1st-person Mochi: "My long and bubbling friend" (L15 — misattributed; this is Kipling's Djinn talking)
3. 3rd-person narration: "The animals began to work for Man" (L4)

A consistent narrator identity (either Kipling 2nd-person OR Mochi-as-listener 1st-person) would help A2 learners follow who is speaking. Recommend: L3–L22 main story = 3rd-person narration; outer-frame L1-L2 and L23-L25 = Mochi 1st-person. Do not mix within the main story.

### NV-2: Ch3 Hana emotional-reaction questions underused

Ch3's outer-outro (L23) includes `"Hana sighs and closes his eyes."` — the only moment where Hana reacts to the Aesop content. But there is no question about Hana's feeling or what the story means to a dog who runs and chases all day.

Adding one question: "Why does Hana sigh?" with options like:
- "He is bored by the story"
- "The tortoise's patience touched him"
- "He wants to race too"
- "He does not understand the ending"

…would create an emotional echo between the Aesop content and the outer frame, reinforcing the Ghibli-warmth intent.

### NV-3: Ch3 + Ch4 review lesson (L25) sentence-field architecture

Both Ch3-L25 and Ch4-L25 are review lessons (tap-pairs / summary). In Ch4-L25, the `sentence` fields contain English questions (`"Why didn't the Camel want to work?"`, `"Did the hump hurt the Camel?"`, `"What did Mochi learn tonight?"`) that appear to be Hana's verbal questions to Grandma — a cute framing device, but structurally broken for `listen-mc` type because the TTS reads a question and then the Q asks another question about what was heard.

Three options:
- A) Convert L25 to `tap-pairs` type throughout (no audio sentence needed)
- B) Reframe as comprehension: sentence = Grandma's answer, question = test of that answer
- C) Keep sentence-as-Hana-question but mark as `conversation-mc` type with a different UI that frames it as a dialogue exchange

Recommend: Option A for L25 review lessons — tap-pairs sidesteps the sentence-field issue cleanly.
