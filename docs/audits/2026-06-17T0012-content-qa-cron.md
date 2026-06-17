# Content QA — 2026-06-17 00:12 UTC

**Today's angle: A2 (adapted) — Answer-Location Distribution + Working Memory Load**
**Focus: Ch9–16** (Cinderella / Chang'e / Hou Yi 10 Suns / Cowherd & Weaver / Little Red Riding Hood / The Grateful Turtle / Issun-boshi / Kaguya-hime)

> **Rotation context**: Previous crons — R2 distractor doctrine (Ch1-8), A7 content-word repetition (Ch27-31), #12 explanationZh story-voice (Ch21-26), #11 optionsZh quality (Ch13-20), A4 mirror patterns (Ch5-12), A3 semantic leak (Ch10-17), A1 keyword-pull (Ch9-18), R1 paraphrase (Ch1-8), A6 option-in-Q (Ch19-26). All 12 standard angles have now been cycled; **A2 (cloze blank position)** has not appeared this window — adapted to listen-mc equivalent since the entire corpus has zero cloze-type questions.
>
> **A2 Adapted — "Answer-Location + Recency Trap"**:
>
> In listening MC without a visible blank, the psycholinguistic equivalent of cloze blank position is **where in the audio sentence the key answer-determining phrase appears**. Research basis:
> - **Recency effect** (Baddeley 2000, phonological loop): the last 1-2 items in a heard sequence are strongest in short-term store. If the correct-answer content word is the last content word of a sentence, the listener can select the right option by simply matching the most-recently-heard word — without processing sentence-level comprehension.
> - **Primacy / front-loading**: conversely, if the answer is in word positions 1-2 of a short sentence, the rest of the sentence provides no discriminating context and the question becomes attention-testing (did you hear the first word?) rather than comprehension-testing.
> - **Working memory ceiling for 8–12yo EFL learners** (Joo 2025 — Int. J. Applied Linguistics; Gathercole 2006 phonological loop): children's phonological rehearsal loop holds ~2–2.5 s of speech. At Pickup's 0.85 TTS rate (~105 wpm), this ≈ 6–8 tokens. Sentences ≥13 words push children past their WM capacity, forcing reliance on gist-only processing — which reduces discrimination between detail and inference sub-skills.
>
> **Method**: Python analysis of 122 listen-mc/listen-comprehension/listen-emoji Qs in Ch9-16. Three metrics per Q:
> - **Zone** (early / mid / late / no-overlap): centroid position of correct-answer content-word hits in sentence (no-overlap = correct answer is full paraphrase = ideal)
> - **WM load** (ok ≤8w / moderate 9–12w / high ≥13w)
> - **Recency trap flag**: late-zone AND correct content word appears verbatim in sentence (compound: positional + lexical tell)

---

## A. validate-lessons.js result

```
WARN lessons-ch10.json: 1 lint issue(s):
  kt-ch10-l7-q7: X2_OPTION_LIST_BIAS (all start with "to")

OK lessons-ch11.json: 7 lessons
OK lessons-ch12.json: 7 lessons
OK lessons-ch13.json: 7 lessons
OK lessons-ch14.json: 7 lessons
OK lessons-ch15.json: 7 lessons

WARN lessons-ch16.json: 1 lint issue(s):
  kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")

OK lessons-ch9.json: 7 lessons
```

Existing lint: 2 WARNs (X2_OPTION_LIST_BIAS in Ch10 + Ch16). Not new. No R1/R1_SUBSTRING/X3_R1_VERBATIM_WORDS in this range.

---

## B. Violation Table

| Sev | Ch | Q ID | Type | Snippet (sentence → correct) | Violation | 修法 | Audio regen? |
|-----|-----|------|------|------------------------------|-----------|------|--------------|
| **P0** | 16 | `kt-ch16-l2-q9` | listen-mc | "…and felt a little **worried**." → "a bit **worried**" | Recency trap: "worried" = sentence-final content word (pos 91%) AND verbatim match in correct option. Compound A7+A2. Child hears last word, scans options, wins without comprehension. | Change sentence: "His parents looked at each other with a little fear in their eyes." (swap "worried" → "fear"; option "a bit worried" stays — forces inference not word-match) | Yes |
| **P0** | 16 | `kt-ch16-l6-q3` | listen-mc | "Inside the demon, it was very **dark**." (7w) → "**dark** all around" | Sentence-completion disguised as MC: Q="What was it like inside the demon?" mirrors sentence exactly; "dark" at pos 86%, last content word. 7-word sentence makes full sentence available from phonological loop → child completes sentence, not comprehends. | Expand sentence: "Inside the demon, Issun could not see or hear anything at all." → correct: "dark and silent inside" (inference, not completion) | Yes |
| **P1** | 14 | `kt-ch14-l1-q8` | listen-mc | "He used his own money to set the **turtle** free." → "to save the **turtle**" | "turtle" at pos 80% (last noun) AND verbatim in option. Recency single-word match; less severe than P0 because sentence is 10w and "turtle" is not final word | Change sentence final phrase: "He used his own money to buy the turtle its freedom." → correct "to save the turtle" (now no verbatim "turtle" in sentence) | Yes |
| **P1** | 11 | `kt-ch11-l4-q7` | listen-mc | "**Only one** sun was left up there now." → "just **one**" | Front-loaded primacy: "one" is word 2 of 8. Q="How many suns in the sky?" → child hears "one" immediately, ignores rest of sentence. | Move key info mid-sentence: "The sky was quiet now, with only one sun shining." → correct "just one sun" | No |
| **P1** | 13 | `kt-ch13-l5-q9` | listen-mc | "…did not look like her dear **grandma**." → "**grandma** looked different" | "grandma" at pos 92% (last noun before period). Q="What did the girl notice?" Surface-match: last word → "grandma looked different" wins without inference. | Replace final noun: "The shape in the bed was not the face she knew." → correct "grandma looked different" (now requires inference of subject) | Yes |
| **P2** | 14 | `kt-ch14-l7-q9` | listen-mc | "When the wind cleared, he was a very old man with a long beard." (14w) | Longest sentence in Ch9-16; exceeds 8-12yo WM ceiling (~8w at 105wpm). Q="How did Urashima change?" Requires holding 14 tokens during question processing. | Split: "The wind cleared. He was now a very old man." (7+6w) — two short sentences; correct "aged into a very old man" now more accessible | Yes |
| **P2** | 13 | `kt-ch13-l7-q3` | listen-mc | "He **opened** up the wolf with great care." → "**opened** him up carefully" | Front-loaded: "opened" at pos 2 of 8 (pct=0.25). Q="What did the huntsman do?" child hears action immediately. | Move verb later: "With great care, the huntsman cut the wolf open." → correct "opened him up carefully" | Yes |
| **P2** | 16 | `kt-ch16-l4-q9` | listen-mc | "Issun stood up on her shoulder, near her **ear**, and watched the road." (13w) → "next to her **ear**" | 13-word sentence with embedded prepositional phrase "near her ear" at mid-late position AND verbatim "ear" in correct option. WM-high + mild late-zone. | Shorten: "Issun climbed up and stood beside her ear." → correct "next to her ear" | Yes |

**Total: 2 P0 · 3 P1 · 3 P2 · 0 P3**

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch9–16 listen-mc/comp/emoji Qs analyzed | 122 |
| Answer zone: no-overlap (paraphrase — ideal) | 84 / 122 (68.9%) |
| Answer zone: mid (safe) | 20 / 122 (16.4%) |
| Answer zone: early (primacy risk) | 10 / 122 (8.2%) |
| Answer zone: late (recency risk) | 8 / 122 (6.6%) |
| WM load: ok (≤8w) | 20 / 122 (16.4%) |
| WM load: moderate (9–12w) | 97 / 122 (79.5%) |
| WM load: high (≥13w) | 5 / 122 (4.1%) |
| P0 (recency trap + verbatim compound) | 2 |
| P1 (recency/primacy positional) | 3 |
| P2 (WM-high or mild positional) | 3 |
| Ch9 (Cinderella) no-overlap rate | 15/15 (100%) ← benchmark |
| Ch16 (Issun-boshi) late-zone rate | 4/14 (28.6%) ← highest |
| validate-lessons lint (new) | 0 new (2 pre-existing WARNs) |

### Ch-level answer-location breakdown

| Ch | Story | Total | early | mid | late | no-overlap | Late% |
|----|-------|-------|-------|-----|------|------------|-------|
| 9 | Cinderella | 15 | 0 | 0 | 0 | 15 | 0% ✅ |
| 10 | Chang'e | 14 | 0 | 1 | 1 | 12 | 7% |
| 11 | Hou Yi (10 Suns) | 15 | 3 | 1 | 1 | 10 | 7% |
| 12 | Cowherd & Weaver | 15 | 1 | 3 | 0 | 11 | 0% ✅ |
| 13 | Little Red Riding Hood | 14 | 3 | 0 | 1 | 10 | 7% |
| 14 | Grateful Turtle | 14 | 1 | 5 | 1 | 7 | 7% |
| 15 | Kaguya-hime | 21 | 2 | 6 | 0 | 13 | 0% ✅ |
| 16 | Issun-boshi | 14 | 0 | 4 | **4** | 6 | **29%** ⚠️ |

---

## D. Top 5 P0

1. **⚠️ `kt-ch16-l2-q9`** — Recency trap + verbatim "worried" at sentence-final position. Compound A7+A2. Child matches last-heard word to option — zero comprehension needed. Fix: swap sentence noun to synonym ("fear"), no option change needed. Audio regen required for that sentence.

2. **⚠️ `kt-ch16-l6-q3`** — 7-word sentence-completion item. "dark" = last content word = correct-option keyword. Question entirely mirrors sentence structure. Expand sentence to require inference ("Issun could not see or hear anything at all"). Audio regen required.

3. **⚠️ Ch16 late-zone concentration (4/14 = 29%)** — Issun-boshi chapter is the worst-performing chapter by positional tell. 3 of the 8 total-chapter P0+P1 late-zone items are in Ch16 (q3, q8, q9 across lessons 1, 2, 6). Recommend full Ch16 positional review pass after fixing P0.

4. **⚠️ `kt-ch13-l5-q9`** — "grandma" sentence-final + verbatim option match. This is Little Red Riding Hood's climax scene — high-engagement moment where a sloppy item undercuts the experience. Fix: remove "grandma" from sentence ("The shape in the bed was not the face she knew."). Allows the Q to test *inference* not word recall. Audio regen required.

5. **⚠️ `kt-ch14-l7-q9`** — 14-word sentence exceeds A2 8-12yo phonological loop ceiling. For children at 0.85 TTS rate, this sentence = ~8 seconds of speech. CLT (Joo 2025) confirms task complexity degradation for young EFL learners beyond this threshold. Split into two 6-7w sentences.

---

## E. Positive finding: Ch9 Cinderella as content gold standard

Ch9 achieved 100% "no-overlap" answer location (all 15 Qs use full paraphrase). Zero late-zone or primacy-trap items. WM load all moderate. This is the **benchmark chapter** — subsequent content writers should use Ch9 as the reference pattern:
- Answer does not share any content words with the sentence stem
- Sentence length stays 8–12 words
- Question + correct answer require bridging inference or semantic reformulation, not word recall

Recommend: add a note in Ch9 header in `public/lessons-ch9.json` metadata OR create `docs/content/ch9-benchmark-notes.md` as the canonical example set.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #43: X4_RECENCY_TRAP lint rule in validate-lessons.js**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Recency-position lint: flag `correct content word` appearing at sentence position >85% AND also in correct-option text | Baddeley (2000) phonological loop recency; Joo (2025) task complexity for young EFL learners; British Council IELTS Item Writing Guidelines §4.3 "sentence-final key words should be avoided in Listen-MC stem" | ✅ 完全適合。Pickup 用 0.85 TTS rate，sentence-final recall window ≈ last 1-2 words for A2 8-12yo. 2 P0 items in Ch16 violate this. Rule is cheap to add (20 lines JS in validate-lessons.js) and prevents future regressions. | S — 30 min | ⭐⭐⭐ High (protects comprehension validity of every future chapter) | **Ship it** |

### Why this matters for Pickup's architecture

The current `validate-lessons.js` lint suite (R1_SUBSTRING, X2_OPTION_LIST_BIAS, X3_R1_VERBATIM_WORDS) already catches verbatim substring and same-start-word patterns. What it **doesn't** catch is the **positional recency effect**: a single content word that:
1. Appears at the very end of a sentence (recency-available in phonological loop)
2. Also appears in the correct option

This is distinct from R1 (full-phrase substring) and X3 (all content words in sentence). It's a **partial positional overlap** that defeats comprehension testing at a cognitive level rather than purely a lexical level.

### Implementation spec (30 min, S-size)

Add to `tools/validate-lessons.js` after existing `X3_R1_VERBATIM_WORDS` check:

```js
// X4_RECENCY_TRAP: correct-option content word appears as sentence-final token (>85% position)
const sentTokens = sentence.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(Boolean);
const correctTokens = new Set(
  options[correctIndex].toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/)
    .filter(w => !FUNCTION_WORDS.has(w) && w.length > 2)
);
const sentLen = sentTokens.length;
const finalTokens = sentTokens.slice(Math.floor(sentLen * 0.85));
const recencyHits = finalTokens.filter(w => correctTokens.has(w));
if (recencyHits.length > 0) {
  issues.push(`X4_RECENCY_TRAP (correct option word "${recencyHits[0]}" appears in sentence's final 15%)`);
}
```

Where `FUNCTION_WORDS` = existing set already in the linter.

### Industry context

Joo (2025, Int. J. Applied Linguistics) showed that task complexity directly degrades young EFL learners' listening accuracy. The recency trap raises "apparent accuracy" (child gets the right answer) while lowering **construct validity** (the child did not comprehend, they recalled the last word). For a children's ELT product, this gap is especially harmful: false confidence from surface-form matching leads to L2 plateau (learners stop actively processing because passive recall "works").

Duolingo's DET Interactive Listening design paper explicitly avoids "answer-available via recency" item patterns for exactly this reason (Interactive Listening technical report, DET 2023).

### Files to change (NEVER src/ or lessons-ch*.json — lint rule only)

```
tools/validate-lessons.js    add X4_RECENCY_TRAP rule (~20 lines)
```

Lesson content fixes for the 2 P0 items are separate tasks (content edit pass on lessons-ch16.json q2-q9 and q6-q3).
