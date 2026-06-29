# Content QA — 2026-06-29 12:11 UTC

Today's angle: **#3 A1 — Obvious Correct (gap too easy)**
Focus: **Ch17–24** (鶴の恩返し Crane's Return / Heungbu & Nolbu / Sang Kancil / Giant Turnip / Anansi / 孟母三遷 / 司馬光 / 孔融讓梨)

**A1 definition (this audit's composite lens)**:
The correct answer is trivially guessable WITHOUT full listening/reading comprehension because of one or more structural tells:

| Sub-violation | Trigger |
|---|---|
| **A1-3GRAM** | Correct option shares a 3-gram directly with the sentence (near-verbatim R1 violation) |
| **A1-LENGTH-TELL** | Max/min option length ratio > 2× (R2 violation; longest = correct) |
| **A1-PROMPT-SINGLETON** | Prompt keyword appears in exactly one option, which is the correct one (test-wise keyword match without comprehension) |
| **A3-JUNK** | One or more distractors are obviously off-domain, eliminating by exclusion rather than selecting by comprehension |

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch18.json: 2 lint issue(s):
  kt-ch18-l1-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch18-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch19.json: 7 lint issue(s):
  kt-ch19-l1-pm1 / l2-pm1 / l3-q5 / l4-lg2 / l5-q5 / l6-q9 / l6-q10: X2_OPTION_LIST_BIAS
WARN lessons-ch20.json: 1 lint issue(s):
  kt-ch20-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
WARN lessons-ch21.json: 10 lint issue(s):
  kt-ch21-l1-pm1 / l2-pm1 / l3-q6 / l4-q6 / l4-lg2 / l5-q3 / l5-q6 / l5-q8 / l5-q10 / l6-q8: X2_OPTION_LIST_BIAS
WARN lessons-ch22.json: 2 lint issue(s):
  kt-ch22-l2-pm1 / l4-lg2: X2_OPTION_LIST_BIAS
WARN lessons-ch23.json: 1 lint issue(s):
  kt-ch23-l5-x4: X2_OPTION_LIST_BIAS
WARN lessons-ch24.json: 3 lint issue(s):
  kt-ch24-l1-pm1 / l4-q3 / l4-lg2: X2_OPTION_LIST_BIAS

Total mirror-lint issues: 111 (warn-only, pre-existing)
Build: PASS (tsc + vite build clean)
```

No new FAIL-level schema errors across Ch17–24.

---

## B. Violation table

### B1. A1-3GRAM — Verbatim 3-gram overlap (correct echoes sentence)

| Ch | Q ID | type | Sentence (snippet) | Correct option | Overlapping 3-gram | Severity | audio regen? |
|---|---|---|---|---|---|---|---|
| 17 | kt-ch17-l7-q9 | listen-mc | "She flew **up, up, up into the** morning sky." | "**far up into the sky**" | `up into the` | P0 | No |
| 17 | kt-ch17-l7-x7 | comprehension | "She flew up, up, up **into the** morning sky." | "back **up into the** open sky" | `up into the` | P1 | No |
| 17 | kt-ch17-l1-pm1 | picture-mc | "**A kind old man** helped **a hurt bird**." | "a kind old man freeing a hurt bird" | `a kind old`, `kind old man` | P1 | N/A |
| 18 | kt-ch18-l1-pm1 | picture-mc | "A small swallow built **a nest on** the roof." | "a small bird on **a nest on** a rooftop" | `a nest on` | P1 | N/A |
| 19 | kt-ch19-l4-q10 | comprehension | "…because **no one wanted to** ask hard questions." | "**no one wanted to** look like they did not know" | `no one wanted`, `one wanted to` | P0 | No |
| 20 | kt-ch20-l4-x8 | comprehension | "…at the back **of the line** and holds the one in front." | "at the end **of the line**" | `of the line` | P1 | No |
| 21 | kt-ch21-l1-pm1 | picture-mc | "Anansi spun **a long web** up to the sky." | "a spider sitting on **a long web** reaching upward" | `a long web` | P1 | N/A |
| 21 | kt-ch21-l7-q8 | listen-mc | "Now **every home**, even small ones, **had a story** by the fire." | "**every home had a story** to share" | `had a story`, `every home` | **P0** | No |
| 22 | kt-ch22-l4-x8 | comprehension | "This would **be the third** house they had lived in." | "this will **be the third**" | `be the third` | P1 | No |
| 22 | kt-ch22-l6-q8 | listen-mc | "**Months of weaving** were lost in one quick cut." | "many **months of weaving**" | `months of weaving` | P0 | No |
| 24 | kt-ch24-l1-pm1 | picture-mc | "The father came home **with a plate of** fruit." | "a father walking in **with a plate of** pears" | `with a plate`, `a plate of` | P1 | N/A |

### B2. A1-LENGTH-TELL — Option length ratio > 2× (longest = correct)

| Ch | Q ID | type | Sentence (snippet) | Options (lengths) | Correct | Ratio | Severity | 修法 |
|---|---|---|---|---|---|---|---|---|
| 17 | kt-ch17-l4-x3 | comprehension | "The old man went home with the heavy bag of **gold**." | `bags full of rice` (4w) / `a new warm coat` (4w) / `gold coins in a bag` (5w) / `fresh vegetables` (2w) | gold coins in a bag | **2.5×** | P0 | Expand "fresh vegetables" → "two big fresh carrots" (4w) |
| 19 | kt-ch19-l7-q9 | listen-mc | "His **low** voice came up from the dark water in a **slow** sad sound." | `happy and loud` (3w) / `fast and high` (3w) / `low and slow` (3w) / `shouting` (1w) | low and slow | **3.0×** | P0 | Replace "shouting" → "sharp and loud" (3w) |
| 19 | kt-ch19-l7-x1 | comprehension | "He patted his small **full** belly." | `full and satisfied` (3w) / `still very hungry` (3w) / `scared of the crocodiles still` (5w) / `ready to go back and say sorry` (7w) | full and satisfied | **2.3×** | P1 | Compress distractor 4 → "sorry and scared" (3w) |

### B3. A1-PROMPT-SINGLETON — Keyword in prompt appears only in correct option

| Ch | Q ID | type | Prompt keyword | Only in correct? | Severity | 修法 |
|---|---|---|---|---|---|---|
| 20 | kt-ch20-l4-q10 | comprehension | `still` | Yes — only "three is still not enough" contains "still" | P1 | Rewrite option to "the turnip won't move at all" (remove "still") |
| 20 | kt-ch20-l4-x4 | comprehension | `people` | Yes — only "three people" contains "people" | P1 | Rewrite correct to "three helpers now" (drop "people") OR add "people" to a distractor |
| 20 | kt-ch20-l6-x5 | emoji-pick | `close` | Yes — only "🎯 very close now" contains "close" | P2 | Rewrite "🎯 almost there now" (synonym) |
| 22 | kt-ch22-l2-pm1 | picture-mc | `school` | Yes — only correct option "a boy reading books beside a school" contains "school" | P1 | Add "school" to one distractor context, e.g. "a man walking past a school gate" |
| 23 | kt-ch23-l2-pm1 | picture-mc | `stone` | Yes — only "a boy lifting a heavy stone" contains "stone" | P1 | Change a distractor to "a boy throwing a smooth stone" (adds "stone" as false-pick) |

### B4. Systemic: emoji-pick keyword echo (design pattern, 17 instances Ch17–24)

All `emoji-pick` questions follow the pattern:
- Prompt: "Which one is a **crane**?"
- Options: `['🕊️ crane', '🦆 duck', '🐦 sparrow', '🦅 eagle']`

The correct option's text label **is the literal answer word from the prompt**. A reader can answer by simple string match without any semantic/visual processing. This makes all 17 emoji-pick questions in Ch17–24 effectively reading-matching exercises rather than vocabulary recognition tasks.

Affected IDs (representative): kt-ch17-l1-ep1, kt-ch17-l2-ep1, kt-ch19-l1-ep1/ep2, kt-ch19-l2-ep1, kt-ch20-l1-ep1/ep2, kt-ch20-l2-ep1, kt-ch21-l1-ep1, kt-ch21-l2-ep1, kt-ch22-l1-ep1/ep2, kt-ch22-l2-ep1, kt-ch23-l1-ep2, kt-ch24-l1-ep1.

Severity: **P2 systemic** — not individual fix candidates; requires a format redesign decision. See ARCH-REC #94.

---

## C. Stats

| Metric | Count |
|---|---|
| Chapters scanned | 8 (Ch17–24) |
| Total non-narration questions | 672 |
| Listen-type questions (listen-mc / comprehension) | 292 |
| A1-3GRAM violations | 11 |
| A1-LENGTH-TELL violations | 3 |
| A1-PROMPT-SINGLETON (non-emoji-pick) | 5 |
| emoji-pick keyword-echo (systemic) | 17 |
| **Total distinct violations** | **36** |
| P0 items | 5 |
| P1 items | 9 |
| P2 (systemic emoji-pick design) | 17 |
| validate-lessons FAIL | 0 |
| validate-lessons WARN (pre-existing X2) | 26 (within Ch17–24) |

---

## D. Top 5 P0 Violations

### P0-1: kt-ch19-l7-q9 — Length ratio 3.0× + double-echo
```
Sentence: "His low voice came up from the dark water in a slow sad sound."
Prompt:   "How did the big crocodile sound?"
Options:  ['happy and loud', 'fast and high', 'low and slow', 'shouting']
Correct:  'low and slow'
```
**Two violations stacked**: (1) "shouting" is 1 word vs 3-word peers (3.0× ratio) — shortest = obvious reject; (2) "low" and "slow" both appear verbatim in sentence "**low** voice... **slow** sad sound" — trivial echo pick.
**Fix**: Replace "shouting" → "sharp and clear" (3 words). Rewrite correct to "sad and quiet" (synonyms, no verbatim echo).

---

### P0-2: kt-ch21-l7-q8 — Near-verbatim 4-gram echo
```
Sentence: "Now every home, even small ones, had a story by the fire at night."
Prompt:   "What changed for the people at night?"
Options:  ['no one could sleep anymore', 'every home had a story to share', 'they all moved away to a new town', 'the fire went out in every home']
Correct:  'every home had a story to share'
```
**The correct option opens with "every home had a story"** — this is a near-verbatim lift of the sentence's opening clause. A learner copying any part of the sentence finds the answer immediately.
**Fix**: Rewrite correct → "all families could listen to stories" (same meaning, paraphrased). Option 4 ("the fire went out in every home") also uses "every home" — creates secondary confusion; change to "families began sleeping earlier."

---

### P0-3: kt-ch22-l6-q8 — Verbatim 3-gram in listen-mc
```
Sentence: "Months of weaving were lost in one quick cut."
Prompt:   "What was lost when the cloth was cut?"
Options:  ['a small bit of work', 'a soft new shirt', 'one quick stitch', 'many months of weaving']
Correct:  'many months of weaving'
```
**"months of weaving"** is an exact 3-gram from the sentence. The question tests whether learners can identify what was lost — but the correct answer is a near-copy of the sentence's subject. A learner who catches any three consecutive words wins without inference.
**Fix**: Rewrite correct → "weeks and weeks of careful work" (paraphrase: same concept, no verbatim overlap).

---

### P0-4: kt-ch17-l4-x3 — Length tell 2.5× (gold coins)
```
Sentence: "The old man went home with the heavy bag of gold."
Prompt:   "What did the old man earn from the cloth?"
Options:  ['bags full of rice', 'a new warm coat', 'gold coins in a bag', 'fresh vegetables']
Correct:  'gold coins in a bag'
```
**"fresh vegetables"** (2 words) is dramatically shorter than all other options (4–5 words). Shortest option is always an easy reject. Combined with the length outlier, test-wise students eliminate it immediately.
**Fix**: Expand "fresh vegetables" → "a basket of fresh food" (5 words, matches length parity).

---

### P0-5: kt-ch19-l4-q10 — Phrase-copy + distractor quality gap
```
Sentence: "The crocodiles believed the lie because no one wanted to ask hard questions."
Prompt:   "Why did the crocodiles believe the lie?"
Options:  ['no one wanted to look like they did not know', 'mouse deer was very tall and strong', 'the king was their very good friend', 'they all loved counting very much']
Correct:  'no one wanted to look like they did not know'
```
**The correct option begins "no one wanted to"** — exact 3-gram from sentence. Distractors 2–4 are schema-obvious rejects (the story never mentions a king; "very tall and strong" contradicts mouse deer's characterization; "loved counting" is a meta-joke distractor). A learner who merely hears "no one wanted" can match without full parsing.
**Fix**: Rewrite correct → "they were afraid to seem foolish" (paraphrase of the same concept). Strengthen distractor 4 → "the mouse deer had counted correctly" (within-domain, plausible wrong inference).

---

## E. Narrative Voice / Pacing Improvements (3 proposals)

Even with 0 additional A1 violations, the following pacing improvements would elevate Ch17–24:

### E1 — Ch19 (Sang Kancil): Crocodile dialogue missing contrast lesson
The story currently questions Kancil's cleverness 6× in Ch19 L4–L6 but never scaffolds what makes a good question vs a bad one. After kt-ch19-l4-q10 (why crocodiles didn't ask questions), add a brief narration beat: "A good question can change everything. Kancil knew that." This hooks the comprehension lesson to Mochi/Hana's learning frame without adding a question.

### E2 — Ch21 (Anansi): Story resolution pacing (L7 rushes ending)
kt-ch21-l7 introduces "stories spread to every home" in 3 questions with no emotional cooldown. Ghibli pacing rule: let the warm moment breathe. Between q7 and q8 (the "every home had a story" beat), add a narration entry: "奶奶輕輕闔上書，貓咪跟小狗都安靜了，像在想著那個蜘蛛。" — this mirrors the outer frame (Mochi + Hana listening) and creates the "sleepy warmth" that the 8-12 child audience needs before the final question.

### E3 — Ch22 (孟母三遷): Mother's motivation underscored only once
Meng's mother moves the family three times, but questions focus exclusively on the *destination* (school/market/cemetery). The underlying motivation — "love drives action even when it's hard" — appears only in one explanationZh. Add one comprehension question mid-chapter: "Why did Meng's mother keep moving?" with distractors exploring practical vs. emotional reasons. This shifts the chapter from factual recall to inference, aligning with R6's ≥2 inference-type requirement (current Ch22 inference count is below target).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

ARCH-REC #94: X49_EMOJI_LABEL_ECHO_LINT

### Finding

17 of 17 `emoji-pick` questions in Ch17–24 are trivially answerable by string-matching the prompt keyword against option text labels. Example:

```
Prompt:  "Which one is a crane?"
Options: ['🕊️ crane', '🦆 duck', '🐦 sparrow', '🦅 eagle']
Correct: '🕊️ crane'
```

The correct option label **is the answer**. No listening, no visual processing required — a literate test-taker word-matches and wins every time. This is a systemic A1 violation native to the emoji-pick question format.

### Industry Source

**2025 Frontiers in Psychology study** (PMC12605125 — "Disentangling the facilitation effect of emoji in vocabulary recognition: experimental evidence from semantic matching tasks"):
- Emoji + text label → faster correct response than text-only (emoji-Chinese > English-Chinese for L2 learners)
- **Key finding for Pickup**: The facilitative effect disappears in *mismatch* conditions — meaning **the text label, not the emoji, is doing the cognitive work** in current emoji-pick format. Emojis add speed but the text is the cue. The format is functioning as a reading exercise, not a vocabulary recognition task.

**ETS distractor design principle (ResearchGate distractor-plausibility study)**: "Distractors must be plausible from the same semantic domain; options that are eliminable by surface features (length, label echo) undermine construct validity even when learners answer correctly."

### Pickup Fit Assessment ✅ Partially fits

| Aspect | Assessment |
|---|---|
| Current emoji-pick format | ❌ Keyword-echo defeats vocabulary acquisition goal |
| Emoji as vocabulary scaffold | ✅ Sound pedagogy — emoji with no text label forces visual-semantic mapping |
| Option label redesign | ✅ Feasible in JSON schema (change option strings, no schema change needed) |
| Affect on children 8-12 | ✅ Visual recognition is appropriate at A2; pure emoji challenge is cognitively appropriate |

### Recommended Implementation

**Option A (Low-effort): Remove the target word from the *correct* option label**
```json
// BEFORE
"options": ["🕊️ crane", "🦆 duck", "🐦 sparrow", "🦅 eagle"]
// AFTER
"options": ["🕊️", "🦆 duck", "🐦 sparrow", "🦅 eagle"]
```
Correct option shows only the emoji; distractors keep text labels. Forces visual recognition for the target word.

**Option B (Medium-effort, pedagogically stronger): Chinese labels on ALL options**
```json
"options": ["🕊️ 鶴", "🦆 鴨子", "🐦 麻雀", "🦅 老鷹"]
```
Children must match English audio/prompt to visual emoji AND understand Chinese context. Removes English keyword echo entirely. Best for heritage learner / zh-TW audience.

**Option C (No-effort quick-fix): Lint guard only**
Add X49_EMOJI_LABEL_ECHO_LINT to validate-lessons.js:
```js
// In each emoji-pick question:
const promptWord = extractKeyword(q.prompt); // "Which one is a crane?" → "crane"
const correctLabel = options[correctIndex].replace(/^\S+\s/, ''); // strip emoji
if (correctLabel.toLowerCase().includes(promptWord.toLowerCase())) {
  WARN(qId, 'X49_EMOJI_LABEL_ECHO_LINT', `correct label "${correctLabel}" echoes prompt keyword "${promptWord}"`);
}
```

### Cockpit Recommendation

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---|---|---|---|---|---|
| X49_EMOJI_LABEL_ECHO_LINT: Remove target-word from correct emoji-pick label (Option A above) | PMC12605125 (2025 Frontiers Psych) | ✅ Fits — no schema change, just string edit in JSON | Low (regex replacement in 17 items) | High — eliminates systemic A1 tell in all emoji-pick | ✅ **Recommend Option A** |

---

*Audit complete. Next rotation: R1 paraphrase deep (Ch17–24) or optionsZh translation quality (Ch9–16).*
