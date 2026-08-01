# Content QA — 2026-08-01 18:05 UTC

**Today's angle:** A1 — Obvious Correct (Gap Too Easy)

Correct option gives itself away because it echoes the sentence's own content words — words a learner need only surface-match rather than actually comprehend. Four sub-rules:
- **A1a** — correct overlaps sentence on ≥2 content words; NO distractor shares any sentence content word
- **A1b** — correct is the only option containing a high-value (≥5-char) sentence content word
- **A1c** — correct echoes BOTH sentence and question stem; no distractor echoes either (triple signal → effectively a dictation task)
- **A1d** — ≥2/3 distractors share zero content words with the sentence+question context (junk-distractor: options from an alien story universe)

**Distinct from X48_NGRAM_VERBATIM_CORRECT** (which catches 3-gram exact substrings): A1 targets 1-2 word echo that survives the 3-gram linter yet still collapses the task to surface scanning.

**Focus:** Ch1–8
Ch1 Momotaro / Ch2 Ugly Duckling / Ch3 Tortoise & Hare / Ch4 Camel's Hump / Ch5 Baba Yaga / Ch6 Six Swans / Ch7 Yexian / Ch8 Three Little Pigs

**Rotation context:** Previous 8 cycles: A7 / A5 / A4 / #11 / A3 / A6 / R1 / R2 — A1 not used in recent 8 cycles.

**Scope:** 319 MC-type Qs across Ch1–8 (`listen-mc`, `comprehension`, `picture-mc`, `grammar-mc`). Narration, `listen-tf`, `tap-pairs`, `scroll-pick`, `type-translate` excluded.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-08-01 18:05 UTC

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 17 lint issue(s): X2×3, X49×7 (stimulus reuse), X57×4 (antonym mirror)
WARN lessons-ch2.json: 10 lint issue(s): X2×2, X49×5, X57×3
WARN lessons-ch3.json: 19 lint issue(s): X2×8, X49×7, X57×3, X48×1
WARN lessons-ch4.json: 10 lint issue(s): X2×1, X49×9
WARN lessons-ch5.json: 10 lint issue(s): X2×2, X49×5, X3×1, X57×2
WARN lessons-ch6.json: 13 lint issue(s): X2×2, X48×1 (six shirts from), X49×10
WARN lessons-ch7.json: 13 lint issue(s): X2×2, X48×1 (her only friend), X49×9, X57×1
WARN lessons-ch8.json:  9 lint issue(s): X2×2, X48×2 (firmer than straw / out the back), X49×4, X57×1
Total mirror-lint issues (all chapters): 440 (warn-only)
```

Notable carry-over: `kt-ch6-l4-x4` and `kt-ch8-l3-q3` / `kt-ch8-l6-q9` are **already flagged by X48_NGRAM_VERBATIM_CORRECT** AND appear again as A1a P0 — double-violation, highest priority to fix.

---

## B. Violation Table

**Summary:** 288 violations total — **P0: 42 | P1: 246**

By sub-rule:

| Sub-rule | Count | Severity |
|----------|-------|----------|
| A1a — exclusive 2-word sentence echo | 33 | P0 |
| A1c — triple signal (sentence + question) | 9 | P0 |
| A1b — single high-value word exclusive echo | 19 | P1 |
| A1d — junk distractors (≥2/3 have 0 context words) | 227 | P1 |

P0 by chapter:

| Ch | P0 count | Story |
|----|----------|-------|
| Ch5 | 11 | Baba Yaga |
| Ch4 | 8  | Camel's Hump |
| Ch6 | 5  | Six Swans |
| Ch1 | 6  | Momotaro |
| Ch2 | 4  | Ugly Duckling |
| Ch8 | 4  | Three Little Pigs |
| Ch3 | 2  | Tortoise & Hare |
| Ch7 | 2  | Yexian |

### Selected violation rows (P0, top 15)

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| Ch5 | kt-ch5-l4-x2 | comprehension | "fence made of white bones" | "built from white bones" | A1a: 3-word echo (fence/bones/white); 0 distractors share any | Paraphrase → "constructed from the remains of dead things" | No |
| Ch8 | kt-ch8-l3-q3 | listen-mc | "firmer than straw" | "they were firmer than straw" | A1a + X48 double-hit | → "more solid than the first pig's material" | Yes (new correct) |
| Ch8 | kt-ch8-l6-q9 | listen-mc | "ran out the back, fast as they could" | "out the back, very fast" | A1a + X48 double-hit | → "through the nearest exit as quickly as possible" | Yes |
| Ch1 | kt-ch1-l5-x5 | comprehension | "thick mist rolled in around the boat" | "thick mist surrounded the boat" | A1a: 3-word echo (thick/mist/boat) | → "a wall of grey fog closed in on them" | No |
| Ch5 | kt-ch5-l5-x2 | comprehension | "house was warm. fire was high" | "warm, fire blazing" | A1a: 2-word echo (warm/fire) | → "cosy with heat from the hearth" | No |
| Ch5 | kt-ch5-l7-x6 | picture-mc | "glowing eyes turned to her. She could not look away" | "could not look away" | A1a: 2-word echo (look/away) | → "frozen in place, held by the skull's gaze" | No |
| Ch6 | kt-ch6-l4-x4 | comprehension | "sew six shirts from a sharp white flower" | "make six shirts from sharp flowers" | A1a + X48: 3-word echo (six/shirts/sharp) | → "craft garments from nettle blossoms" | No |
| Ch6 | kt-ch6-l7-q5 | listen-mc | "lifted small white shirts and threw one over each bird" | "threw one on each swan" | A1a: 3-word echo (threw/each/one) | → "draped a garment over every brother" | Yes |
| Ch6 | kt-ch6-l3-q9 | listen-mc | "Six small beds lay smooth and still" | "six empty beds" | A1a: 2-word echo (six/beds) | → "a row of unused sleeping places" | Yes |
| Ch4 | kt-ch4-l5-x10 | comprehension | "Djinn began to make a great Magic" | "the Djinn begins making magic slowly" | A1a: 3-word echo (djinn/slowly/magic) | → "the stranger started something no one had ever seen" | No |
| Ch4 | kt-ch4-l5-x9 | picture-mc | "Djinn sat down, placed his chin upon his hand" | "sitting, chin resting on hand" | A1a: 2-word echo (chin/hand) | → "a figure in deep thought, one arm supporting his face" | No |
| Ch4 | kt-ch4-l6-x6 | comprehension | "The Camel said 'Humph!' just to be rude" | "he was rude on purpose, not by accident" | A1c: echoes 'rude' in both sentence and question | → "he chose to act that way, not by mistake" | No |
| Ch5 | kt-ch5-l6-x4 | comprehension | "pile of rice mixed with black sand" | "sort rice from sand" | A1a: 2-word echo (rice/sand) | → "separate the two mixed things" | No |
| Ch7 | kt-ch7-l4-q5 | listen-mc | "bones lie under the heap by the gate" | "under a pile by the gate" | A1a: 2-word echo (gate/under) | → "buried near the entrance, beneath a mound" | Yes |
| Ch8 | kt-ch8-l7-q7 | listen-mc | "third pig built a hot fire inside a big pot" | "made a hot fire" | A1a: 2-word echo (fire/hot) | → "set a trap using heat" | Yes |

### picture-mc structural note
`picture-mc` questions (e.g., `kt-ch3-l2-pm1`, `kt-ch5-l2-pm1`) are semi-exempt: the correct option must describe the matching image and WILL echo the sentence's main noun. However A1c fires when the question ALSO quotes the key word ("Which picture matches 'a brave boy'?" → correct = "a young boy..."), which is avoidable. Fix: rephrase question to not quote the matching word directly.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC-type questions Ch1-8 | 319 |
| Total A1 violations | 288 (90% of all Qs affected at some level) |
| P0 violations | 42 (13.2%) |
| P1 violations (A1d junk distractors) | 227 (71%) |
| Double-hit (A1a + X48_NGRAM) | 3 (kt-ch6-l4-x4, kt-ch8-l3-q3, kt-ch8-l6-q9) |
| Ch5 Baba Yaga — worst P0 density | 11/40 Qs = 27.5% |
| Ch3 Tortoise & Hare — best P0 count | 2 P0 |
| Chapters already flagged by validate-lessons.js | All 8 WARNing |

**Root cause of A1d dominance (71%):** Ch1-8 distractors were written as narrative-world plausible scenes ("a barn by a river", "under a big rock by the road") but these reference setting/place details NOT present in the sentence. This creates *thematically* plausible but *contextually* disconnected options. Learners who remember even a few content words from the audio can immediately scan-and-match the one option that "sounds like what I just heard."

---

## D. Top 5 P0

1. **⚠️ Ch5 kt-ch5-l4-x2** — comprehension — correct="built from white bones" — 3 content words from sentence; 0 distractors match any → learner need only hear "bones" or "white" and scan. Already also triggers A3/R1 proximity (fence/white/bones appear verbatim together). **Highest priority: Ch5 is heaviest P0 chapter (11).**

2. **⚠️ Ch8 kt-ch8-l3-q3** — listen-mc — correct="they were firmer than straw" — triple violation: A1a + X48_NGRAM + X49 stimulus reuse on same sentence. Fix all three in one pass.

3. **⚠️ Ch8 kt-ch8-l6-q9** — listen-mc — correct="out the back, very fast" — same triple-violation pattern as above (A1a + X48 + X49).

4. **⚠️ Ch4 kt-ch4-l5-x10** — comprehension — correct="the Djinn begins making magic slowly" — echoes 3 words (djinn, magic, slowly). Ch4 has 8 P0 total — second-worst chapter.

5. **⚠️ Ch6 kt-ch6-l4-x4** — comprehension — correct="make six shirts from sharp flowers" — echoes 3 words (six, shirts, sharp) + X48 already flags "six shirts from" as 3-gram verbatim. Has been in validate-lessons.js for multiple cycles with no fix.

---

## E. Narrative Voice / Pacing Improvements

(Required even when P0 count > 0 — these are craft-layer improvements separate from item validity.)

**1. question stem variety for picture-mc**
Current: Nearly all picture-mc questions use "Which picture matches the sentence?" or "Which picture matches '<key noun>'?" — appears ≥12 times across Ch1-8.
Improvement: Rotate with:
- "Which picture fits this moment in the story?"
- "Which one shows what grandma just described?"
- "Can you find the right image below?"
This prevents the meta-pattern where learners learn "if it says 'matches the sentence', look for the most literal description."

**2. explanationZh grandma-voice warmth**
Several explanationZh read as neutral factual recap:
- `kt-ch1-l3-q5`: "他是從桃子裡出生的，所以取名「桃太郎」——就是「桃子男孩」的意思。"
- Better: "奶奶說：沒錯！從桃子裡蹦出來的孩子，叫桃太郎再合適不過了 🍑 你記住了嗎？"
Aim: explanationZh should sound like grandma confirming a child's answer, not a dictionary entry.

**3. "What is this scene mainly showing?" overuse**
`comprehension` questions with type=picture/scene overview use "What is this scene mainly showing?" or "What does this moment mainly show?" ≥8 times across Ch1-8.
Improvement: Vary with:
- "What is happening in this part of the story?"
- "Why is this a key moment?"
- "How does this image connect to what you just heard?"
This distributes cognitive load across gist / inference sub-skills rather than clustering on gist-recognition.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #230: X230_A1_GENAI_DISTRACTOR_SEMANTIC_INDEPENDENCE

**Source:** Wang, Y. & Meng, Y. (2026). *Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods.* Language Testing. DOI: [10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375)

**Research finding:** GenAI + principle-based prompts + human expert supervision can systematically improve distractor quality in L2 listening MCQs. Key principle: every distractor must satisfy **semantic independence** — it cannot share ≥2 content words with the correct option or the sentence stimulus, and it must map to a real learner miscomprehension pattern (phonological, local-detail, schema-driven, partial-parse).

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| GenAI distractor refresh (semantic independence principle) | [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) | ✅ 非常適合 — 42 P0 questions across Ch1-8 all have distractors failing semantic independence. Fable 5 with principle-based prompt (4 failure modes) → regenerate 3 distractors per flagged Q; apply A1a lint gate post-gen | Medium (Fable 5 parallel batch, ~42 API calls, no app code change — just JSON update + re-validate) | Very High — directly eliminates the #1 remaining content validity gap in Ch1-8 | ✅ 推薦實作 |

**Concrete implementation for Pickup:**

1. Collect all 42 P0 Q ids (from this audit's A1a + A1c violation list)
2. Dispatch Fable 5 subagent per Q with prompt:
   ```
   Rewrite the 3 WRONG options for this A2 children's listening question.
   Sentence (audio): "<sentence>"
   Correct answer: "<correct>"
   Rules:
   - Each wrong option must NOT share 2+ content words with the correct answer
   - Each wrong option must NOT share 2+ content words with the sentence
   - Assign each to a failure mode: phonological/local-detail/schema-inference/partial-parse
   - Keep A2 vocabulary (GSL-2000)
   - Keep roughly same length as correct (R2 ≤1.25× ratio)
   Output: JSON array of 3 strings
   ```
3. Re-run validate-lessons.js → confirm X48 + A1a count drops to 0 for patched Qs
4. Commit updated lessons-ch{1..8}.json + push (no TTS regen unless correct answer changed)

**Pickup 架構適配說明:**
- React 18 + JSON lesson files → JSON-only change, zero app code
- No new schema fields needed
- Fable 5 handles A2-level narrative vocabulary well (validated in B.274-276 distractor cleanup)
- Risk: 壞 distractor 生出 obvious-miss — mitigated by A1a lint gate + human spot-check on Ch5 (highest P0)

**No-action scenario:** 42 P0 questions remain where a child who hears even 2 words of the audio can guess correctly without understanding the sentence. This undermines the listening training objective across the 8 core fairy tale chapters.
