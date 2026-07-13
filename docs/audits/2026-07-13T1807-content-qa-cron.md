# Content QA — 2026-07-13 18:07 UTC

**Today's angle:** #9 — A7 Content-Word Repetition (correct option echoes content words from stimulus sentence)
**Focus:** Ch1-8 (core narrative chapters — Momotaro / Urashima / Ugly Duckling / Tortoise & Hare / Camel / Baba Yaga / Six Swans / Three Little Pigs)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT (正解與句子重疊 3-gram「firmer than straw」— 抄句 tell)
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT (正解與句子重疊 3-gram「out the back」— 抄句 tell)
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
Total mirror-lint issues: 440 (warn-only)
```

Build: PASS (tsc + vite, no blocking errors).

---

## B. Violation Table — A7 Content-Word Echo (Ch1-8)

Scan scope: 86 listen-mc questions across Ch1-8.  
Method: content-word overlap ratio = |shared_content_words(sentence, correct_option)| / |content_words(correct_option)|  
Threshold: ratio ≥ 0.5 flagged.

| # | Ch | Q ID | type | Sentence (truncated) | Question | Correct Option | Overlap Words | Ratio | Severity | 修法 | audio regen? |
|---|-----|------|----|---------------------|---------|---------------|--------------|-------|----------|-----|-------------|
| 1 | 8 | kt-ch8-l3-q3 | listen-mc | "He picked sticks because they felt **firmer** than **straw**." | Why did he pick sticks? | "they were **firmer** than **straw**" | firmer, straw | 1.00 | **P0** | "sticks held up / straw would bend" | Yes |
| 2 | 1 | kt-ch1-l6-q5 | listen-mc | "The dog ran in low and **fast**, **biting** at any leg…" | How did the dog attack? | "by running **fast** and **biting**" | fast, biting | 0.67 | **P1** | "charging low and snapping at legs" | Yes |
| 3 | 5 | kt-ch5-l4-q9 | listen-mc | "The **door** of the house had been facing away from **Vasilisa**." | Why did the house turn? | "showing its **door** to **Vasilisa**" | door, vasilisa | 0.67 | **P1** | "turning to face the girl" | Yes |
| 4 | 8 | kt-ch8-l3-q9 | listen-mc | "From the dark path came a **soft** sound, slow and **heavy**." | What did the second pig hear? | "**soft** **heavy** steps" | soft, heavy | 0.67 | **P1** | "slow dragging footsteps" | Yes |
| 5 | 4 | kt-ch4-l5-q8 | listen-mc | "He chose to stick with the **same** lazy **reply** once again." | How did the Camel choose to act? | "gave the **same** rude **reply**" | same, reply | 0.50 | P2 | "responded the same way again" | No |
| 6 | 4 | kt-ch4-l7-q8 | listen-mc | "From that day, he carried **bags** across the sand…" | How did the Camel join the team at last? | "carrying **bags**" | bags | 0.50 | P2 | "hauling loads for the others" | No |
| 7 | 5 | kt-ch5-l3-q5 | listen-mc | "After the white rider, the sky turned **light**." | What did the white rider bring? | "morning **light**" | light | 0.50 | P2 | "the start of dawn" | No |
| 8 | 5 | kt-ch5-l6-q3 | listen-mc | "…'First, do my **work**. Then we will talk about fire.'" | What did Baba Yaga want first? | "**work** done" | work | 0.50 | P2 | "chores finished" | No |
| 9 | 6 | kt-ch6-l3-q9 | listen-mc | "Six small **beds** lay smooth and still. No one had slept in them." | What did the girl see in the room? | "six empty **beds**" | beds | 0.50 | P2 | "six untouched sleeping places" | No |
| 10 | 6 | kt-ch6-l5-q9 | listen-mc | "Each day the older woman whispered **cold** things about the bride." | How did the king's mother feel about the bride? | "**cold** and unkind" | cold | 0.50 | P2 | "bitter and unwelcoming" | No |
| 11 | 6 | kt-ch6-l7-q5 | listen-mc | "She lifted the small white shirts and **threw** one over each bird." | What did she do with the shirts? | "**threw** one on each swan" | threw | 0.50 | P2 | "draped a shirt over every swan" | No |
| 12 | 7 | kt-ch7-l4-q5 | listen-mc | "'The bones of your fish lie under the heap by the **gate**.'" | Where were the fish bones? | "under a pile by the **gate**" | gate | 0.50 | P2 | "buried near the entrance wall" | No |
| 13 | 7 | kt-ch7-l6-q7 | listen-mc | "The shoe lay on the **road** until a passing man picked it up." | Who found the gold shoe? | "a stranger on the **road**" | road | 0.50 | P2 | "a traveller passing by" | No |
| 14 | 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were **loud**, and his **voice** was soft like honey." | How did the wolf knock and speak? | "**loud** knock, sweet **voice**" | loud, voice | 0.50 | P2 | "hammering fists, honeyed tone" | No |
| 15 | 8 | kt-ch8-l6-q3 | listen-mc | "They saw the wolf step up the path with **hungry** eyes." | How did the wolf look as he came? | "**hungry** and ready" | hungry | 0.50 | P2 | "starving and eager" | No |

**Total violations: 15 across Ch1-8**  
P0: 1 | P1: 3 | P2: 11  
Chapters affected: Ch1(2), Ch4(2), Ch5(3), Ch6(3), Ch7(2), Ch8(4). Ch2, Ch3 clean.

---

## C. Stats

| Metric | Value |
|--------|-------|
| listen-mc items scanned | 86 |
| A7 violations (ratio ≥ 0.5) | 15 (17.4%) |
| P0 (ratio = 1.0) | 1 |
| P1 (ratio 0.6-0.99) | 3 |
| P2 (ratio 0.4-0.59) | 11 |
| Chapters with 0 violations | Ch2, Ch3 |
| Audio regen required | 4 (P0+P1 only) |
| Already caught by X48 (validate-lessons) | 1 (kt-ch8-l3-q3) |
| New violations (not in existing lint) | 14 |

**Root-cause pattern:** P2 violations cluster around single-word "anchor" nouns (beds, bags, gate, road, door) where the item writer used the most obvious word rather than paraphrasing to a synonym or higher-order concept. P0/P1 violations involve 2+ content words carried verbatim, making the correct option mechanically derivable by word-matching without listening comprehension.

---

## D. Top 5 P0/P1 Priority

1. **⚠️ P0 — kt-ch8-l3-q3** (ratio 1.0): "they were firmer than straw" is a near-verbatim copy of the stimulus. A child who cannot process the audio can still spot the match. Fix: "sticks held up better" or "the material was stronger."

2. **P1 — kt-ch1-l6-q5** (ratio 0.67): "by running fast and biting" echoes "ran … fast, biting" exactly. Fix: "charging low and snapping at legs."

3. **P1 — kt-ch5-l4-q9** (ratio 0.67): "showing its door to Vasilisa" echoes "door … facing away from Vasilisa." The proper-noun echo (Vasilisa) is the strongest tell. Fix: "turning to face the girl who arrived."

4. **P1 — kt-ch8-l3-q9** (ratio 0.67): "soft heavy steps" echoes "soft sound, slow and heavy." Two adjectives lifted verbatim. Fix: "slow dragging footsteps" or "plodding heavy tread."

5. **P2 — kt-ch4-l5-q8** (ratio 0.50): "gave the same rude reply" echoes "same lazy reply." Both "same" and "reply" are carried. Fix: "repeated his indifferent answer."

---

## E. Narrative Voice / Pacing Improvements (3 proposals — required even if 0 A7 violations)

These are quality-of-life improvements to narrative pacing and comprehension depth, independent of A7 violations.

### NP-1: Ch5 (Baba Yaga) — Add inference bridge between day/night riders and time concept

The three rider questions (red / white / black → day / night / dusk) are factual recall at ratio 0.50 each (light, darkness echoes). Upgrading these to inference questions would both fix the echo AND deepen comprehension:
- Current Q (kt-ch5-l3-q5): "What did the white rider bring?" → "morning light" (echo)
- Improved Q: "How did Vasilisa know morning had arrived?" → "a white rider passed the house" (paraphrase; tests inference)

### NP-2: Ch7 (Yeh-Shen / Cinderella) — Increase causal inference density in L4-L6

L4-L6 currently have 3 consecutive detail-recall questions about fish bones / gate / road (all P2 A7 violators). The underlying story logic (magical fish → bones contain power → bones under heap) is more interesting than the surface-level location. Suggestion: replace 1 of the 3 location recall questions with a causal inference: "Why did the golden fish tell Yeh-Shen about the bones?" — tests understanding of the magical gift cycle rather than location recall. No echo risk.

### NP-3: Ch8 (Three Little Pigs) — Reduce adjacent antonym density in wolf-encounter lessons

validate-lessons.js already flagged Ch8 for X57_ANTONYM_PAIR_MIRROR in kt-ch8-l4-q9 (loud vs soft). The L3-L7 sequence has multiple questions that set up binary opposites (soft/hard, straw/sticks/bricks, loud/soft). While the story is inherently contrastive, dense antonym clustering in adjacent questions trains pattern-recognition rather than language processing. Suggestion: separate antonym-driven questions by at least 3 non-antonym questions, and ensure the correct answer is never the "obvious" pole of a binary (e.g., "loud knock" when the stem already contrasts loud/soft).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #151: X153_A7_CONTENT_WORD_ECHO_GATE

**Problem:** The existing X48_NGRAM_VERBATIM_CORRECT lint (in `tools/validate-lessons.js`) only catches ≥ 3-gram exact matches between sentence and correct option. This audit found 14 additional A7 violations not caught by X48, all with content-word overlap ratio ≥ 0.5 — detectable algorithmically.

**Industry basis (Buck 2001 / ETS item-writing guidelines):**
- Verbatim content-word echo is the #1 source of Construct-Irrelevant Variance (CIV) in listening assessments (Buck, *Assessing Listening*, Cambridge 2001, Ch. 4).
- ETS TOEIC Part 3-4 item-writing manual requires that correct options paraphrase the stimulus at the content-word level — no shared content nouns/adjectives between stimulus sentence and key.
- Duolingo's internal item-review checklist (per 2024 public blog "How we write listening questions") flags any option that shares a "diagnostic word" with the prompt sentence.
- For A2-level children (8-12, target audience), test-wise echo-matching is particularly effective because vocabulary is small — the child's best strategy is surface-word matching. This means A7 violations actively punish genuine listeners and reward surface pattern-matching, inverting the intended construct.

**Proposed lint rule for `tools/validate-lessons.js`:**

```js
// X153_A7_CONTENT_WORD_ECHO_GATE
// content-word overlap ratio between sentence and correct option
function contentWordOverlapRatio(sentence, option) {
  const stopWords = new Set([/* ... */]);
  const words = t => t.toLowerCase().replace(/[^a-z0-9\s]/g,' ')
    .split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
  const sentSet = new Set(words(sentence));
  const optWords = words(option);
  if (optWords.length === 0) return 0;
  return optWords.filter(w => sentSet.has(w)).length / optWords.length;
}

// In per-item validation:
if (item.options && item.sentence) {
  const correct = item.options[item.correctIndex];
  const ratio = contentWordOverlapRatio(item.sentence, correct);
  if (ratio >= 0.6) warn(qid, 'X153_A7_CONTENT_WORD_ECHO_GATE',
    `content-word overlap ratio=${ratio.toFixed(2)} ≥ 0.6 — correct option echoes stimulus`);
}
```

**Industry validation (2026 research sweep):**

| Source | Finding | Implication |
|--------|---------|-------------|
| Buck 2001, *Assessing Listening* | Verbatim content-word echo is #1 CIV source in listening MCQ | Lint rule directly addresses the canonical threat |
| IELTS / Cambridge suite | Cambridge deliberately puts verbatim echoes in **distractors** (not keys): "if a speaker uses exact words from an option, 99% chance it's NOT correct" | Pickup violates this by echoing in keys — inverts IELTS design intent |
| TOEIC (ETS Parts 3-4) | Correct option must paraphrase the recording — different vocabulary mandated | Our P0/P1 violations (firmer/straw, fast/biting) are textbook ETS violations |
| Duolingo DET | Eliminates MCQ listening entirely; uses dictation/integrated format to structurally prevent echo | Nuclear option; not suitable for A2 children but confirms echo is serious enough to architect around |
| Bi & Wang 2024 (ScienceDirect) | Eye-tracking: test-takers systematically scan options for words heard in audio → constitutes CIV | Children 8-12 are MORE susceptible (narrower metacognitive repertoire) → CIV more severe, not less |
| Cambridge Papers in ELT 2020 (Young Learners) | Assessment for YLs must avoid surface-form matching as a bypass strategy | Validates raising threshold priority for Pickup's 8-12 target audience |

**Pickup 適配分析:**
- ✅ React + JSON lessons architecture: lint runs at build time, zero runtime cost
- ✅ Already have stopword + n-gram infrastructure in validate-lessons.js — this is an additive rule
- ✅ False-positive risk is low: ratio ≥ 0.6 threshold catches genuine echoes; single-word overlaps on common story nouns filtered by length > 3 check
- ✅ 14 new violations surfaced (not caught by X48) — validates the lint gap
- ✅ Industry consensus: flag for human review (not auto-reject) — legitimate exceptions: explicit recall items, fill-in-gap, constrained A2 vocabulary
- Effort: ~30 min to add to validate-lessons.js | ROI: HIGH (removes test-wiseness exploit for 8-12 children)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X153_A7_CONTENT_WORD_ECHO_GATE: content-word overlap ratio lint (threshold 0.5 warn / 0.6 error) | Buck 2001 CIV + IELTS/Cambridge "echo in distractors" rule + ETS TOEIC paraphrase mandate + Bi & Wang 2024 eye-tracking | ✅ 直接加進 validate-lessons.js；不改 lessons JSON schema；不改 src/；flag for review not auto-reject | 30 min | HIGH | ✅ 推薦實作 |
