# Content QA — 2026-06-03 00:07 UTC

Today's angle: **#3 — A1 Obvious Correct (gap too easy)**
Focus: **Ch2 (桃太郎) + Ch4 (龜兔賽跑)**

_Previous angles used: R1-paraphrase (Ch1-3), #12-explanationZh (Ch5-7), R2-distractor-doctrine (Ch1-3), A3-story-continuity (Ch3-5), #11-optionsZh-quality (Ch6-8). Ch2+Ch4 had no dedicated deep audit; both chapters have high validated lint counts (Ch2: 52, Ch4: 83)._

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 31 lint issue(s)
WARN lessons-ch2.json: 52 lint issue(s)
WARN lessons-ch3.json: 85 lint issue(s)
WARN lessons-ch4.json: 83 lint issue(s)
WARN lessons-ch5.json: 63 lint issue(s)
WARN lessons-ch6.json: 59 lint issue(s)
WARN lessons-ch7.json: 44 lint issue(s)
WARN lessons-ch8.json: 65 lint issue(s)
```

**Ch4-specific lint (A1-relevant subset):**
- 24× R1_SUBSTRING: correct option is verbatim ⊆ sentence (L1, L3–L18, L19–L25 various slots)
- 59× X2_OPTION_LIST_BIAS (all options share same first word) — not primary focus today

**Ch2-specific lint (A1-relevant subset):**
- 3× X3_R1_VERBATIM_WORDS: kt-ch2-l6-q1 "lifted", kt-ch2-l13-q2 "the bag", kt-ch2-l24-q3 "if the boy was real"

---

## B. Violation Table

| Ch | Q ID | Type | Sentence snippet (≤60 chars) | Violation | 修法 | Audio regen? |
|----|------|------|------------------------------|-----------|------|-------------|
| 4 | **BATCH: kt-ch4-l4-q6 … l18-q6** (15 Qs) | listen-mc | "X does Y **because [CORRECT]**." | **P0 — A1 Systematic "Why?" template**: correct = verbatim `because`-clause of sentence. No comprehension required — learner pattern-matches sentence ending. Violates R1 (Buck 2001), A1, A7 simultaneously. | Rewrite ALL 15 correct options as inference-paraphrase: e.g., l4-q6 correct → "He sees himself as number one" (not "He thinks he is the fastest"). Distractor pool must also shift. | No |
| 4 | **BATCH: kt-ch4-l19-q5 … l24-q5** (6 Qs) | listen-mc | "X happens **because [CORRECT]**." | **P0 — A1 same pattern as above**, Aesop-side lessons continuing the same template defect. | Same fix: paraphrase correct option away from sentence verbatim. | No |
| 4 | kt-ch4-l11-q5 | listen-mc | "Hare feels easy and warm." | **P0 — A1 Validity**: correct=[2]"relaxed" but [0]"comfortable" is equally valid at A2 for "easy and warm." A2 learner has no reliable basis to prefer one. 50/50 ambiguity reduces to chance. | Replace "comfortable" with a clearly-wrong option, e.g., "anxious" or "angry" — both would be wrong given "easy and warm." | No |
| 4 | kt-ch4-l8-q5 | listen-mc | "Hare feels **strong** and free." | **P0 — A1+A6 Trap**: "strong" appears verbatim in sentence AND as a distractor [1]. An A2 learner who correctly hears "strong" will pick the trap distractor. Correct [2] is "powerful". This punishes listening accuracy rather than testing comprehension. | Remove "strong" from options; replace with an antonym distractor, e.g., "weak". | No |
| 4 | kt-ch4-l5-q5 | listen-mc | "Tortoise feels easy." | **P0 — A1 Validity**: correct=[3]"calm" but [0]"peaceful" equally valid at A2 for "easy" (= at ease). The explanationZh distinction (inner state vs outward control) is B1-level nuance, not accessible at A2. | Replace "peaceful" with an antonym, e.g., "tense" or "frightened". | No |
| 2 | kt-ch2-l6-q1 | listen-mc | "She **lifted** the peach out of the water." | **P1 — R1 Verbatim**: correct=[2]"lifted" is literally in the sentence. Already flagged by lint as X3_R1_VERBATIM_WORDS. | Rewrite sentence: "She bent down and brought the great fruit to shore." → correct stays "lifted" as paraphrase, or change correct to "carried". | No |
| 4 | kt-ch4-l15-q5 | listen-mc | "Tortoise feels **with hope** inside." | **P1 — A1 Morphological giveaway**: "hope" in sentence → "hopeful" is root-recognition, not comprehension. Any learner who identifies the root morpheme gets it trivially. | Rewrite sentence: "Tortoise feels lifted when he sees the finish tree." → correct "hopeful" becomes genuine inference. | No |
| 2 | kt-ch2-l8-q5 | listen-mc | "The neighbors … came to see the **boy**." | **P1 — A1 Near-verbatim**: correct=[3]"to see the baby" swaps only "boy"→"baby". A single-word substitution is below A2 paraphrase threshold. | Change correct to "to meet the new child" or add more semantic distance: "to greet the family's gift." | No |
| 2 | kt-ch2-l17-q5 | listen-mc | "For watching the dark **spirits**." | **P1 — A1 Junk-distractor elimination**: only option linked to sentence meaning is "to watch the demons" [0]; other 3 (bring help / find food / sing a song) share zero semantic overlap. Two-step elimination makes correct trivially obvious. | Replace 1–2 distractors with plausible-context choices, e.g., "to count the prisoners" or "to guard the treasure room". | No |
| 2 | kt-ch2-l13-q2 | listen-mc | "The dog asked, 'What is in your **bag**?'" | **P1 — R1 Verbatim**: correct=[0]"the bag" appears word-for-word in sentence. Lint-confirmed X3_R1_VERBATIM_WORDS. | Rewrite questionText or correct: "What did the dog want to know?" → correct "what Momotaro was carrying." | No |
| 2 | kt-ch2-l20-q2 | listen-mc | "The tortoise kept walking **pace forward by pace forward**." | **P2 — A1 Structural echo**: correct=[1]"step by step" mirrors sentence rhythm exactly ("pace by pace" → "step by step"). Learner matches rhythmic pattern, not meaning. | Rewrite sentence: "The tortoise kept his eyes ahead and never hurried." → correct "step by step" becomes genuine paraphrase comprehension. | No |
| 2 | kt-ch2-l10-q1 | listen-mc | "One day, **rotten fresh** came to the village." | **P2 — Narrative voice**: "rotten fresh" is an unusual compound that breaks Ghibli warm-voice register and is opaque to A2 learners. | Rewrite: "One day, dark news reached the village." — simpler, story-appropriate, still requires "bad news" comprehension. | No |
| 2 | kt-ch2-l10-q2 | listen-mc | "… steal **meal and shiny yellow**." | **P2 — Narrative voice**: "shiny yellow" for "gold" is overpoetic; "meal" is register-inconsistent (too formal). Together they feel awkward rather than Ghibli-lyrical. | Rewrite: "… steal rice and glittering gold." — maintains paraphrase target, sounds like a children's story. | No |
| 4 | Ch4 q5 series (L4–L18, 15 Qs) | listen-mc | "X feels [adjective]." series | **P2 — Narrative flatness**: anchor sentences in q5 emotion slot are uniformly literal ("Hare feels full of joy", "Hare feels strong and free"). Contrast with Ghibli lyrical voice elsewhere. Story immersion drops when every q5 reads like a vocabulary label. | Revise ~5 of the flattest sentences to story-voice: e.g., "Hare bounces on his heels, ready for the race." → "excited" becomes inference not label-matching. Prioritise L6, L8, L11 which also have technical violations. | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Lessons deep-audited | 48 (Ch2 L1–L24 + Ch4 L1–L25) |
| Questions reviewed | 141 (Ch2) + 150 (Ch4) = **291** |
| Total violations found | **12** (+ 2 systematic batches = ~33 affected Qs) |
| P0 critical | **5** (incl. 2 systematic batches covering 21 Qs) |
| P1 important | **4** |
| P2 narrative/pacing | **3** |
| Audio regen needed | **$0** (Ch2+Ch4 are TTS-only, 0 MP3s) |
| Primary pattern | Ch4 q6 "Why?" template: correct = verbatim `because`-clause in 21/25 lessons |

---

## D. Top 5 P0

### P0.1 — Ch4 q6+q5 systematic "Why?" verbatim clone (21 questions, L1–L24)
**Root cause**: Question template structure `"X does Y because [REASON]."` + Q `"Why does X do Y?"` + correct = `"[REASON]"` verbatim. Learner hears sentence, locates "because" boundary, picks matching option. Zero vocabulary, grammar, or story comprehension involved. Violates R1 (Buck 2001), A1, and A7 simultaneously.

**Scope**: kt-ch4-l1-q5, l3-q5, l4-q6 through l18-q6 (15 Qs), l19-q5 through l24-q5 (6 Qs) — **21 of 25 lessons**.

**Fix template** (apply to all 21):
```
Current sentence: "Tortoise does not get angry because he knows what he can do."
Current correct:  "He knows what he can do"   ← verbatim copy

Fixed correct:    "He trusts his own abilities"  ← inference paraphrase
Or:               "He is sure of his own strength"
```

Distractors may stay. Only the correct option and (sometimes) its position need updating. Estimated rework: ~40 min.

---

### P0.2 — kt-ch4-l11-q5: "comfortable" is equally correct for "easy and warm"
**Sentence**: "Hare feels easy and warm."  
**Options**: [0]comfortable [1]stressed [2]relaxed [3]cold  
**Correct**: [2]relaxed

A2 learners cannot distinguish "comfortable" from "relaxed" for the cue "easy and warm." Both are semantically valid. Stressed/cold are antonyms (easily eliminated), leaving a genuine 50/50 ambiguity between [0] and [2]. This inflates error rates for the wrong reason — not lack of comprehension, but sub-distinction below A2 threshold.

**Fix**: Replace [0]"comfortable" with [0]"anxious" or [0]"frightened".

---

### P0.3 — kt-ch4-l8-q5: "strong" in sentence + as distractor (A6 trap conflict)
**Sentence**: "Hare feels **strong** and free."  
**Options**: [0]tired [1]**strong** [2]powerful [3]scared  
**Correct**: [2]powerful

A2 learner with good listening picks up the word "strong" → selects [1] → wrong. The question punishes accurate listening. "Powerful" vs "strong" is a near-synonym distinction that requires B1 vocabulary knowledge (connotation: "power = mastery/control" vs "strong = physical force"). At A2, this registers as unfair, not educational.

**Fix**: Remove [1]"strong" from options; replace with [1]"weak" (clear antonym).

---

### P0.4 — kt-ch4-l5-q5: "peaceful" equally valid for "easy" context
**Sentence**: "Tortoise feels easy."  
**Options**: [0]peaceful [1]angry [2]hungry [3]calm  
**Correct**: [3]calm

"Easy" (= at ease, untroubled) maps to both "calm" and "peaceful" at A2 level. The explanationZh argues "peaceful" is deeper/inner — that distinction is B1-level pragmatics. Angry/hungry are clear wrong answers; [0] peaceful and [3] calm are both defensible. Creates ambiguity rather than testing vocabulary range.

**Fix**: Replace [0]"peaceful" with [0]"upset" or [0]"nervous" — both clearly wrong given "easy."

---

### P0.5 — kt-ch2-l6-q1: correct "lifted" verbatim in sentence (R1, lint-confirmed)
**Sentence**: "She **lifted** the peach out of the water."  
**Options**: [0]lit [1]dropped [2]**lifted** [3]pushed  
**Correct**: [2]lifted

The correct answer is copied word-for-word from the sentence. Learner needs only to recognise one word, not comprehend the action. Lint flags this as `X3_R1_VERBATIM_WORDS`.

**Fix**: Rewrite sentence to use a periphrastic description: "She bent down and pulled the great fruit out of the stream." → "lifted" becomes a valid inference paraphrase that requires vocabulary knowledge.

---

## E. Narrative Voice Improvement Suggestions (P2)

Three improvements that go beyond R1/A1 mechanics into story-register quality:

1. **kt-ch2-l10-q1** (`"rotten fresh"` → "bad news"): Replace with `"One day, dark news reached the village."` Cleaner story-voice, retains paraphrase challenge.

2. **kt-ch2-l10-q2** (`"meal and shiny yellow"` → "food and gold"): Replace with `"… steal rice and glittering gold."` Maintains A2 paraphrase difficulty while sounding like an actual children's story narration.

3. **Ch4 q5 emotion anchor series**: Currently all q5 sentences follow `"[Character] feels [adjective]."` — a bare label that reads like a vocabulary exercise, not a story event. Revise ~5 of 15 to embed emotion in action, e.g.:
   - L6: `"Hare feels full of joy about the race."` → `"Hare cannot stand still — the race is finally here."`
   - L8: `"Hare feels strong and free."` → `"Hare stretches his long legs and grins at the open road."` (remove "strong" trap distractor)
   - L11: `"Hare feels easy and warm."` → `"Hare curls up under the cool leaves without a care."` (removes "comfortable" ambiguity)

   These rewrites simultaneously fix the P0.3 and P0.2 technical violations AND improve narrative immersion.
