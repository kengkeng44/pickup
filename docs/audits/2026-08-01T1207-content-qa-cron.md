# Content QA — 2026-08-01 12:07 UTC

**Today's angle:** A7 — Content-Word Repetition in Correct Options  
The correct answer option contains ≥1 content word that appears verbatim (or via simple stem) in the audio `sentence`. This collapses the "listening + inferring" task into a surface-matching task: learners need only scan the options for words they just heard rather than construct meaning. Distinct from R1 (full substring match caught by X48_NGRAM_VERBATIM_CORRECT) — A7 targets single- and two-word echo that survives the 3-gram linter.

**P0 definition (this cycle):** The repeated content word also appears in the `question` stem → triple signal (sentence audio + question text + correct answer) → question reduced to near-dictation.

**Focus:** Ch17–24  
Ch17 Tsuru no Ongaeshi (Crane's Gift) / Ch18 Heungbu & Nolbu / Ch19 Sang Kancil / Ch20 Giant Turnip / Ch21 Anansi & the Sky God / Ch22 Mencius's Mother / Ch23 Sima Guang / Ch24 Kong Rong Pears

**Rotation context:** Previous 8 cycles: A5 / A4 / #11 / A3 / A6 / R1 / R2 / #12 — A7 not used in recent 8 cycles.

**Scope:** 318 MC-type Qs across Ch17–24 (`listen-mc`, `comprehension`, `listen-comprehension`, `picture-mc`, `grammar-mc`). Narration and `listen-tf` excluded.

**Detection method:** Python tokenizer — content words ≥3 chars, excluding 80-word stop list + simple suffix stemmer (removes -ing/-ed/-er/-ness/-tion/-ly/-s/-es). Match: any correct-option token that maps to a sentence token (exact or stem). P0 = matched token also present in question.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-08-01 12:07 UTC

---

## A. validate-lessons.js Result

```
WARN lessons-ch17.json: 13 lint issue(s) [pre-existing X2/X48/X49/X57]
WARN lessons-ch18.json: 13 lint issue(s) [pre-existing X2/X49/X57]
WARN lessons-ch19.json: 18 lint issue(s) [pre-existing X2/X49]
WARN lessons-ch20.json: pre-existing issues only
WARN lessons-ch21.json: pre-existing issues only
WARN lessons-ch22.json: pre-existing issues only
WARN lessons-ch23.json: pre-existing issues only
WARN lessons-ch24.json: pre-existing issues only
Total mirror-lint issues: 440 (pre-existing, warn-only)
```

No new schema errors. All pre-existing.

---

## B. Violation Table

**Summary:** 129 / 318 Qs (40.6%) exhibit A7 content-word echo in the correct option.  
- P0 (word in sentence + question): **10**  
- P1 (word in sentence only): **119** — of which **27** have ≥2 repeated content words

| Ch | Q ID | type | Sentence snippet | Correct option | Repeated word(s) | Sev | audio regen? |
|----|------|------|-----------------|----------------|-----------------|-----|--------------|
| 17 | kt-ch17-l3-q9 | listen-mc | "The wooden loom began to click and clack…" | wooden clicking | wooden, clicking | P1 | No |
| 17 | kt-ch17-l3-x1 | comprehension | "She cooked the meals. She cleaned the house." | cooking and cleaning daily | cooking, cleaning | P1 | No |
| 17 | kt-ch17-l4-x1 | comprehension | "She held a soft white cloth. It shone like fresh snow." | shining white and soft | white, soft | P1 | No |
| 17 | kt-ch17-l4-x3 | comprehension | "The old man went home with the heavy bag of gold." | gold coins in a bag | gold, bag | P1 | No |
| 17 | kt-ch17-l4-x7 | comprehension | "At night, the small back door stayed closed and quiet." | the secret behind the closed door | closed, door | P1 | No |
| 17 | kt-ch17-l3-x5 | comprehension | "The wooden loom began to click and clack all night." | all through the night | night | P1 | No |
| 17 | kt-ch17-l3-x7 | comprehension | "She gave the old man one rule: never look inside the room while she weaves." | keep her weaving secret | weaving | P1 | No |
| 18 | kt-ch18-l3-x7 | comprehension | "A snake came near the bird, slow and quiet." | hurt birds cannot escape a snake | birds(+Q), snake(+Q) | **P0** | No |
| 18 | kt-ch18-l4-x1 | comprehension | "Heungbu wrapped the bird's leg in soft cloth." | cloth tied around its leg | cloth, leg(+Q) | **P0** | No |
| 18 | kt-ch18-l3-q9 | listen-mc | "He picked up the small bird with very soft hands." | soft and gentle | soft | P1 | No |
| 18 | kt-ch18-l3-x1 | comprehension | "A small swallow had built a nest on the roof." | on top of the house roof | roof | P1 | No |
| 18 | kt-ch18-l5-x5 | comprehension | "They cut open the third gourd. Out came a new house." | a whole new house appeared | new, house | P1 | No |
| 18 | kt-ch18-l6-q5 | listen-mc | "Kind Heungbu told him the whole story, word for word." | answered with kind words | kind, words | P1 | No |
| 19 | kt-ch19-l3-x7 | comprehension | "Mouse deer was about to tell the crocodiles something not true." | trick the crocodiles with a lie | crocodiles | P1 | No |
| 19 | kt-ch19-l5-q9 | listen-mc | "They kept very still so the small mouse deer could count them well." | they wanted to be counted right | counted | P1 | No |
| 19 | kt-ch19-l6-q9 | listen-mc | "Their bodies could go in the water but not up the dry land." | they were trapped in the water | water | P1 | No |
| 19 | kt-ch19-l6-x1 | comprehension | "Sang Kancil jumped off the last crocodile onto the other side." | jumped onto dry land across the river | jumped, onto | P1 | No |
| 20 | kt-ch20-l6-q5 | listen-mc | "The cat holds the dog's tail gently between her front paws." | holding it with her front feet | holding(+Q), front | **P0** | No |
| 20 | kt-ch20-l7-q9 | listen-mc | "Out comes the turnip! Everyone falls over backward in a happy pile." | the turnip pops out | turnip | P1 | No |
| 20 | kt-ch20-l7-q10 | comprehension | "The smallest mouse was the last help. That tiny push was the one." | even the smallest helper matters | smallest, helper | P1 | No |
| 21 | kt-ch21-l3-q6 | listen-mc | "Now he had a small green roof on top of his head." | to keep something off his head | head(+Q) | **P0** | No |
| 21 | kt-ch21-l3-q8 | listen-mc | "The hornets thought a sudden rain had come too soon." | the rain was here | rain | P1 | No |
| 21 | kt-ch21-l3-x5 | comprehension | "He filled a pot with water and poured some on the hornet tree." | plain water | water | P1 | No |
| 21 | kt-ch21-l3-x8 | comprehension | "The hornets thought a sudden rain had come too soon." | turning their fear of rain against them | rain | P1 | No |
| 21 | kt-ch21-l4-q6 | listen-mc | "'My friend says you are not really that long,' Anansi said." | that some friend doubted his length | friend | P1 | No |
| 21 | kt-ch21-l5-q6 | listen-mc | "He covered the hole with leaves so no one could see it." | to hide the hole from view | hole | P1 | No |
| 22 | kt-ch22-l2-pm1 | picture-mc | "Meng wanted to learn and study near a school." | a boy reading books beside a school | school(+Q) | **P0** | No |
| 22 | kt-ch22-l3-q3 | listen-mc | "She packed their things into two big cloth bags." | packed everything up to go | packed | P1 | No |
| 22 | kt-ch22-l3-q8 | listen-mc | "He held up sticks and called out, just like the sellers." | the way sellers called out prices | sellers, called | P1 | No |
| 22 | kt-ch22-l5-q3 | listen-mc | "They could see the school yard from their own door." | right next to their door | door | P1 | No |
| 23 | kt-ch23-l3-q6 | listen-mc | "The water closed over his head. He could not breathe." | going under water | water(+Q) | **P0** | No |
| 23 | kt-ch23-l5-x9 | comprehension | "His friend was going under. The time was very short." | he knew time was short | time(+Q), short | **P0** | No |
| 23 | kt-ch23-l4-q3 | listen-mc | "Their small feet ran fast on the path." | running as fast as they could | fast | P1 | No |
| 23 | kt-ch23-l6-x2 | comprehension | "He saw a big stone in the grass." | a large heavy stone | stone | P1 | No |
| 24 | kt-ch24-l4-q3 | listen-mc | "He did not take the biggest pear." | he chose a smaller pear instead | pear(+Q) | **P0** | No |
| 24 | kt-ch24-l4-x2 | comprehension | "Kong Rong reached out and took the smallest pear." | the very smallest pear | smallest, pear(+Q) | **P0** | No |
| 24 | kt-ch24-l5-q8 | listen-mc | "Something warm moved inside his father's chest." | warm and touched | warm | P1 | No |
| 24 | kt-ch24-l5-x4 | comprehension | "Father was surprised and pleased. He smiled." | happy and surprised | surprised | P1 | No |
| 24 | kt-ch24-l3-x2 | comprehension | "Kong Rong looked at the big pears and the small pears." | pears of two sizes | pears | P1 | No |

*(Table shows representative sample; 129 total violations logged by audit script.)*

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–24 (8 chapters) |
| Total MC-type Qs scanned | 318 |
| A7 violations total | 129 (40.6%) |
| P0 (word in sentence + question) | 10 (3.1%) |
| P1 (word in sentence only) | 119 (37.4%) |
| P1 with ≥2 repeated content words | 27 (8.5%) |
| Chapters with P0 | Ch17(1), Ch18(2), Ch20(1), Ch21(1), Ch22(1), Ch23(2), Ch24(2) |
| audio regen needed | 0 |

**Rate context:** The 40.6% A7 rate across Ch17–24 is high. The existing X48_NGRAM_VERBATIM_CORRECT lint catches 3-gram verbatim (a strict subset). A7 extends coverage to single/double content-word echo, which the 3-gram linter misses by design. The high rate reflects that many correct options correctly paraphrase the *meaning* but retain 1-2 key nouns/verbs from the sentence — a subtle but systematic pattern.

**Severity calibration:**
- P0 (10): Fix in next content sprint — near-dictation questions
- P1 with ≥2 words (27): Fix in next content sprint
- P1 with 1 word: Review case-by-case; some single-word overlaps (e.g. "turnip" in a Turnip chapter) are unavoidable without awkward circumlocution

---

## D. Top 5 P0

### P0-1: ⚠️ kt-ch18-l3-x7 — snake/bird double echo

- **Sentence:** "A snake came near the bird, slow and quiet."
- **Question:** "Why was the snake dangerous for the little bird?"
- **Correct:** "hurt birds cannot escape a snake"
- **Problem:** "snake" and "bird(s)" appear in the question AND the sentence. The correct option is reconstructed from Q + sentence surface words. A learner can select this without understanding the concept of danger.
- **Fix:** "a creature in danger cannot move away in time" — removes both echo words, tests actual comprehension of "danger + escape."

### P0-2: ⚠️ kt-ch18-l4-x1 — cloth/leg double echo

- **Sentence:** "Heungbu wrapped the bird's leg in soft cloth."
- **Question:** "What did Heungbu use to help the bird's leg?"
- **Correct:** "cloth tied around its leg"
- **Problem:** "cloth" from sentence + "leg" from both question and sentence. Test reduced to: "pick the option that has both nouns from the question."
- **Fix:** "soft material wrapped gently around the hurt part" — paraphrases both "cloth" (→ soft material) and "leg" (→ the hurt part).

### P0-3: ⚠️ kt-ch23-l5-x9 — time/short phrase lift

- **Sentence:** "His friend was going under. The time was very short."
- **Question:** "How did Sima Guang feel about the time he had?"
- **Correct:** "he knew time was short"
- **Problem:** "time was short" is a near-verbatim 3-word phrase from the sentence, slipping past X48_NGRAM_VERBATIM because word order differs ("The time was very short" → "time was short"). "time" also appears in the question → triple tell.
- **Fix:** "he understood there was almost no time left" OR "he felt the urgency pressing on him."

### P0-4: ⚠️ kt-ch24-l4-x2 — smallest/pear verbatim

- **Sentence:** "Kong Rong reached out and took the smallest pear."
- **Question:** "Which pear did Kong Rong choose?"
- **Correct:** "the very smallest pear"
- **Problem:** "smallest" verbatim from sentence; "pear" from question. Correct option = sentence adjective + question noun. Zero inference required.
- **Fix:** "the one no one else wanted" OR "the littlest piece of the fruit."

### P0-5: ⚠️ kt-ch20-l6-q5 — holding/front echo

- **Sentence:** "The cat holds the dog's tail gently between her front paws."
- **Question:** "How does the cat hold on?"
- **Correct:** "holding it with her front feet"
- **Problem:** "hold" (stem of "holds") in question; "front" in sentence. "holding" from question + "front" from sentence = correct option assembled from Q+S surface.
- **Fix:** "gripping the one in front of her with both paws" → wait, that still has "front." Better: "using both paws to grip tightly around the tail."

---

## E. Narrative Voice / Pacing Improvements

*(Required even with no new R1-R8 violations — 3 proposals)*

**E1 — Ch17 "wooden clicking" undermines story mystery**

`kt-ch17-l3-q9`: sentence "The wooden loom began to click and clack all night." → correct "wooden clicking." Beyond the A7 issue, this answer reveals too early that the back-room sound is a loom, spoiling the Crane's Gift revelation. The correct answer "wooden clicking" names the instrument the learner should still be *wondering* about.

Suggestion: Reframe as inference: Q "What might be making that sound in the back room?" → options like "something tapping lightly on wood" / "a bird calling in the night" / "a door swinging back and forth" / "someone knocking to come in." This preserves mystery, rewards engagement over surface-match, and avoids the A7 echo.

**E2 — Ch21 "rain" overexposure across 3 questions in one lesson**

Three questions in Ch21-l3 use "rain" in the correct or distractor options (q8, x5, x8). In a ~12-question lesson, the same content word in 3 consecutive question slots creates a vocabulary rut — A2 learners start associating "this lesson = rain" and pattern-match on the word rather than comprehending the Anansi trick.

Suggestion: For x5 ("What liquid did Anansi use?"), shift from material-focus to action-focus: Q "What did Anansi do to trick the hornets?" instead. Options: "poured water on the tree" / "shouted at them" / "covered the nest with leaves" / "asked the Sky God to help." This breaks the rain-word cluster and adds variety without losing the comprehension goal.

**E3 — Ch24 "pear" monotony across 7+ correct options**

"Pear/pears" appears in the correct option of at least 7 questions across Ch24. Since the story IS about pears, some repetition is unavoidable — but by lesson 5, all correct options sound like a vocabulary drill loop: "a smaller pear," "the very smallest pear," "pears of two sizes," "big or small — a real choice."

Suggestion: In Ch24-l5 (resolution/values lesson), shift framing from object to behaviour: instead of "which pear" questions, use "why did Kong Rong" (inference) and "what did the father think" (perspective). Options can use "the fruit" / "the smaller one" / "his share" to vary the vocabulary surface while keeping the comprehension goal.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #229: X65_A7_CONTENT_WORD_ECHO lint rule for validate-lessons.js

**Pattern:** Add a new lint check `X65_A7_CONTENT_WORD_ECHO` to `tools/validate-lessons.js` that flags when the correct-answer option (`options[correctIndex]`) shares ≥1 content word with `sentence` (content word = ≥3 chars, not in stop-word list, matched after simple suffix stemming). P0 variant additionally flags when the shared word also appears in the `question` field.

**Source:**  
- [Wang & Meng 2026 — "Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods" (SAGE Language and Education, 2026)](https://doi.org/10.1177/02655322251400375): "overlap (a distractor including the same words or phrases used in the text) would be the most influential factor to make distractors plausible." Inverse implication for *correct* options: word overlap between sentence and correct answer makes the correct answer identifiable by surface-match rather than comprehension — the A7 construct threat.
- [ResearchGate — "Distractor Plausibility in a Multiple-Choice Listening Test"](https://www.researchgate.net/publication/334003786_Distractor_Plausibility_in_a_Multiple-Choice_Listening_Test): Surface-form overlap is the dominant distractor selection driver in L2 listening tests — for both wrong-answer plausibility AND correct-answer give-away.
- [ASC Item Writing Guide 2025](https://assess.com/docs/ASC_Item-Writing-Guide_2025.pdf): Content-word avoidance in correct options is listed as a standard item-writing principle.

**This cycle finding:** 129/318 Qs (40.6%) in Ch17–24 have A7 violations. X48_NGRAM_VERBATIM_CORRECT catches 3-gram verbatim only. X65 would catch single-word and 2-word cases that currently pass the linter.

**Pickup 架構適配 (Verdict: ✅ 適合)**

`tools/validate-lessons.js` already runs as a build-time lint guard with structured warning output. Adding X65 is additive (new function + call, no schema changes). Recommend warn-only initially (like X57), escalate to error after Ch17–24 content sprint fixes P0 cases.

**Concrete implementation sketch (in validate-lessons.js):**
```js
function x65ContentWordEcho(lessonId, q) {
  const STOP = new Set(['a','an','the','and','or','but','in','on','at','to',
    'for','of','with','is','was','are','were','have','has','had','not','by',
    'as','if','it','he','she','they','we','you','me','my','up','out',/* ... */]);
  function toks(text) {
    return (text||'').toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/)
      .filter(w => w.length >= 3 && !STOP.has(w));
  }
  function stem(w) {
    for (const s of ['ing','tion','ness','ed','er','est','ly','es','s']) {
      if (w.endsWith(s) && w.length-s.length >= 3) return w.slice(0,-s.length);
    }
    return w;
  }
  const ci = q.correctIndex;
  if (typeof ci !== 'number' || !q.options?.[ci]) return;
  const sentStems = new Set(toks(q.sentence).map(stem));
  const qStems = new Set(toks(q.question||q.questionEn||'').map(stem));
  for (const w of toks(q.options[ci]).map(stem)) {
    if (sentStems.has(w)) {
      const p0 = qStems.has(w);
      warn(lessonId, q.id, `X65_A7_CONTENT_WORD_ECHO (${p0?'P0':'P1'}: "${w}" in correct option echoes ${p0?'sentence+question':'sentence'})`);
      break;
    }
  }
}
```

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X65_A7_CONTENT_WORD_ECHO lint in validate-lessons.js | [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375); [ASC 2025 Item Writing Guide](https://assess.com/docs/ASC_Item-Writing-Guide_2025.pdf) | ✅ Perfect fit — linter already exists, additive check, no schema changes | Low (~30 min to add + test) | High — catches 40.6% of MC Qs with surface-match give-away in correct option | ✅ Implement in next content sprint |

---

*Sources: [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) · [Distractor plausibility in MC listening tests](https://www.researchgate.net/publication/334003786_Distractor_Plausibility_in_a_Multiple-Choice_Listening_Test) · [ASC Item Writing Guide 2025](https://assess.com/docs/ASC_Item-Writing-Guide_2025.pdf) · [NCBi nonfunctional distractor analysis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/)*
