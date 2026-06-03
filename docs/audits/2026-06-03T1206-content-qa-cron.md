# Content QA — 2026-06-03 12:06 UTC

Today's angle: **#9 — A7 Content-word Repetition (stem leaks correct answer via shared key words)**
Focus: **Ch2 + Ch3** (A7 cross-chapter deep scan; Ch4 cross-validated as control)

---

## A. validate-lessons.js result

```
WARN lessons-ch0.json:  4 lint issue(s)
WARN lessons-ch1.json: 52 lint issue(s)
WARN lessons-ch2.json: 85 lint issue(s)
WARN lessons-ch3.json: 84 lint issue(s)
WARN lessons-ch4.json: 63 lint issue(s)
WARN lessons-ch5.json: 59 lint issue(s)
WARN lessons-ch6.json: 44 lint issue(s)
WARN lessons-ch7.json: 65 lint issue(s)
Total mirror-lint issues: 456 (warn-only)
```

All chapters pass schema shape. No byte-identical mirrors detected.

---

## B. Violation 清單

| # | Ch | Q ID | type | stem (truncated) | correct option | violation | severity | 修法 | audio regen? |
|---|----|----|------|-------------------|----------------|-----------|----------|------|--------------|
| 1 | Ch3 | kt-ch3-l3-q5 | listen-comprehension | "The slow tortoise might win **because he does not stop**." | "Because he does not stop" | **VERBATIM_SUBSTRING** — correct answer = verbatim reason clause lifted from sentence. Zero inference required. | P0 | Rewrite stem to question form without embedding answer: "Why might the slow tortoise still win?" Keep correct option identical; it now requires inferential recall. | No |
| 2 | Ch3 | kt-ch3-l8-q6 | listen-comprehension | "Hare runs fast at the start **because he wants to show off his speed**." | "He wants to show off his speed" | **VERBATIM_SUBSTRING** — same template: reason clause = correct option. | P0 | Stem → "Why does Hare sprint so hard at the very start?" Answer unchanged. | No |
| 3 | Ch3 | kt-ch3-l13-q6 | listen-comprehension | "Tortoise does not wake Hare **because winning fairly matters more than winning early**." | "Winning fairly matters more than winning early" | **VERBATIM_SUBSTRING** — 7-word verbatim lift. Most egregious single example; sentence IS the answer. | P0 | Stem → "Why does Tortoise pass the sleeping Hare without waking him?" | No |
| 4 | Ch3 | kt-ch3-l17-q6 | listen-comprehension | "Hare is too late **because speed cannot fix lost time**." | "Speed cannot fix lost time" | **VERBATIM_SUBSTRING** | P0 | Stem → "Why can Hare not catch up, even though he runs very fast now?" | No |
| 5 | Ch2 | kt-ch2-l18-q6 | listen-comprehension | "This story tells me that **sometimes others see you wrong**." | "Sometimes others see you wrong" | **VERBATIM_SUBSTRING** — thematic summary sentence; correct option is 100% verbatim. | P0 | Stem → "What does Mochi carry home from the Ugly Duckling story?" Then paraphrase answer: "People may judge you before they really know you." | No |
| 6 | Ch3 | kt-ch3-l12-q2 | listen-mc | "He walks **slowly** past the water." | "slowly" | **EXCLUSIVE_STEM_WORD** — word "slowly" appears ONLY in correct option among adverb set (quietly / quickly / loudly). Trivial word-match; no inference. | P1 | Swap stem to avoid embedding answer adverb: "He ___ past the water, not stopping to rest." | No |
| 7 | Ch3 | kt-ch3-l18-q3 | listen-mc | "Tortoise also says, 'Going slow is fine, if you keep on.'" | "slow is fine if you keep going" | **4 shared content-words** (slow / fine / keep / going) between stem and correct option. Option is near-paraphrase of stem; learner needs no comprehension beyond sound-matching. | P1 | Replace correct option with an equivalent but lexically divergent paraphrase: "pace matters less than persistence." Adjust explanationZh accordingly. | No |
| 8 | Ch3 | kt-ch3-l11-q2 | listen-mc | "He closes his eyes and **snores** softly." | "snores" | **EXCLUSIVE_STEM_WORD** — "snores" is verbatim; all distractors (sniffs/sings/speaks) are phonemic foils that begin with s-. Low inferential demand — learner only needs to match a single word they heard. | P1 | Acceptable as phonemic discrimination if intent is /snɔːrz/ vs /snɪfs/ contrast. Flag for intentional-design review. Add a note in explanationZh clarifying phonemic purpose to signal this is deliberate. | No |

### Systemic Finding (beyond individual Q violations)

**CRITICAL PATTERN — Ch2/Ch3 `listen-comprehension` verbatim-correct rate:**

| Chapter | Total listen-comprehension Qs | Verbatim correct answer | Rate |
|---------|------------------------------|------------------------|------|
| Ch1 | 66 | 0 | 0% ✅ |
| Ch2 | 31 | 15 | **48%** ⚠️ |
| Ch3 | 28 | 23 | **82%** 🚨 |
| Ch4 | 27 | 0 | 0% ✅ |
| Ch5 | 27 | 0 | 0% ✅ |
| Ch6 | 35 | 0 | 0% ✅ |
| Ch7 | 25 | 0 | 0% ✅ |

**Root cause**: The AI generation template for Ch2 and Ch3 used a "complex sentence → question about reason" pattern:
> Sentence: "X does Y **because Z**." → Question: "Why does X do Y?" → Correct: **Z** (verbatim)

This means the correct answer is always embedded in the sentence the learner just heard. A learner with 0% comprehension who only needs to pattern-match a phrase they heard can score 82% on Ch3 comprehension questions. This completely defeats the purpose of listen-comprehension as a question type.

**Ch4-Ch7 do NOT have this problem** — they use question-form stems ("Why does the Camel stay in the desert?") that do NOT embed the answer, forcing inferential recall.

**Recommended fix for Ch2+Ch3**: Convert all "because [Z]" stems to pure question-form stems. Correct options should remain the same semantic content but may need slight paraphrasing if the answer is a verbatim reason clause. Estimated effort: ~38 Q rewrites across Ch2 (15) + Ch3 (23). No audio regeneration needed (stems are read by TTS but options are not spoken).

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch3 listen-comprehension Qs audited | 28 |
| Ch3 verbatim-correct violations | 23 (82%) |
| Ch2 listen-comprehension Qs audited | 31 |
| Ch2 verbatim-correct violations | 15 (48%) |
| Ch4 (control) verbatim-correct | 0 (0%) |
| P0 violations | 5 |
| P1 violations | 3 |
| Audio regen needed | 0 |
| Total violations | 8 + systemic pattern |

---

## D. Top 5 P0

1. **kt-ch3-l13-q6** — 7-word verbatim lift "Winning fairly matters more than winning early" is exact sentence fragment. Worst single instance. Fix: stem → "Why does Tortoise pass the sleeping Hare without waking him?"

2. **kt-ch3-l3-q5** — "Because he does not stop" verbatim. Appears in lesson 3 so it sets the broken template for the entire chapter. Fixing L3 stem is high-leverage.

3. **kt-ch3-l17-q6** — "Speed cannot fix lost time" — thematic maxim verbatim. Learner gets the deepest lesson of the story for free without needing to understand it. Stem fix: "Why can't Hare make up the gap even sprinting at the end?"

4. **kt-ch3-l8-q6** — "He wants to show off his speed" verbatim. Early story lesson, high exposure. Stem fix: "Why does Hare not pace himself at the start?"

5. **kt-ch2-l18-q6** — "Sometimes others see you wrong" — Ugly Duckling takeaway literally spoken then picked. Cross-chapter spread of same template defect confirms this is a batch-AI authoring problem, not isolated errors.

---

## E. Narrative Voice / Pacing Improvements (3 proposals — no R1-R8 violation needed)

### NV-1: Ch3 explanationZh — grammar jargon → story voice

**Problem**: 16 of the Ch3 explanations (L1–L12 alone) use grammar meta-commentary: "三單動詞", "br- 開頭動詞", "同音節短名詞". This contradicts the Ghibli story-voice mandate (spec R12: explanationZh must read as Grandma's voice, not a classroom).

**Examples to fix**:
- `kt-ch3-l4-q2`: "brag = 自誇、吹牛。(brings 同 br- 開頭動詞…)" → should be: "brag = 吹牛。Hare 一見面開口就是在炫耀。barks 是汪汪叫；begs 是求人；brings 是拿過來，都和這場面不搭。"
- `kt-ch3-l3-q1`: "(rest 同樣音節短的名詞;meal 是故事場景之外的事)" → "(rest 是休息；meal 是吃飯；song 是唱歌 — 這三個都不是 Tortoise 出來做的事。)"

**Fix pattern**: Remove all "XX 開頭", "同音節", "n. v. adj." grammar tags. Replace with story context + why-the-distractors-are-wrong reasoning in natural Chinese.

### NV-2: Ch3 listen-comprehension sentence rhythm — break the "X because Y" monotony

**Problem**: 23 of 28 comprehension stems use the same compound sentence template ("X does Y because Z"). Even after the verbatim-answer fix, this creates monotonous TTS rhythm where every comprehension moment sounds structurally identical.

**Proposed variation set** (3 patterns to rotate):
1. **Why-question stem**: "Why does Tortoise keep going when his feet hurt?" (already used correctly in Ch4—copy that pattern)
2. **What-happens-next stem**: "Tortoise sees the finish tree. What keeps his tired legs moving?"
3. **Mochi inner-voice stem**: "I watch Tortoise from the wall. What does his pace tell me about strength?"

Pattern 3 reactivates Mochi as narrator (the outer frame), bridging to the established Ch1 POV voice.

### NV-3: Ch3 tap-tiles sentence length — 6-word minimum not met

**Problem**: Several Ch3 tap-tiles sentences are too short for meaningful word-order practice. Examples from a scan: "He runs." (2 words), "Slow is fine." (3 words). These don't develop syntactic awareness — learners rearrange 2-3 tiles trivially.

**Benchmark**: Ch1 tap-tiles average 7.4 words/sentence (measured from spec). Ch3 tap-tiles should meet the same floor.

**Fix**: Expand sentences to 6-8 words by adding adverbial or prepositional phrases: "He runs very fast at first." / "Slow and steady wins the race." This also provides richer TTS audio with natural prosodic grouping.

---

*Audit completed 2026-06-03 12:06 UTC. Auditor: Content QA cron agent (angle #9 A7). Next session: angle #1 R1-paraphrase or #4 A2 cloze-blank position.*
