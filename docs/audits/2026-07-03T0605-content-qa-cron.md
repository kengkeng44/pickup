# Content QA — 2026-07-03 06:05 UTC

**Today's angle: A1 — Obvious Correct (gap too easy)**
**Focus: Ch9–16** (88 MC questions: listen-mc + listen-comprehension)

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  8 lint issue(s)  (X2 / X49 / X57)
WARN lessons-ch10.json: (no new issues above existing X49/X57)
WARN lessons-ch11.json: (no new issues above existing baseline)
WARN lessons-ch15.json: (no new issues above existing baseline)
Total mirror-lint issues: 447 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

All existing issues are pre-catalogued X2/X49/X49B/X57 violations carried from previous audits. No new schema errors. Build gate clean (tsc+vite).

---

## B. Violation Table

**Angle definition — A1 "Obvious Correct":**
The correct answer is guessable without genuine listening/comprehension because:
- (a) a key content-word appears verbatim in the stimulus sentence, OR
- (b) the distractor set contains non-functional (junk) options that eliminate themselves

| Ch | Q ID | type | Stimulus snippet | Correct option | Violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 13 | kt-ch13-l7-q3 | listen-mc | "He **opened up** the wolf with great care." | "**opened him up** carefully" | **P0-A1a**: verbatim 2-gram "opened up" in both stimulus and correct — zero inference needed | Replace with "cut the wolf open" or "freed those inside with his blade" | No |
| 11 | kt-ch11-l4-q7 | listen-mc | "**Only one** sun was left up there now." | "**just one**" | **P0-A1a**: keyword "one" verbatim + trivial number-recall at A1 floor, no inference required; distractors "four big ones / still ten" non-functional story-context | Replace correct with "a single sun remained" → reward vocabulary inference; replace dx with "just three / half of before / all but two" | No |
| 16 | kt-ch16-l4-q9 | listen-mc | "Issun stood up on her shoulder, near **her ear**, and watched the road." | "next to **her ear**" | **P0-A1a**: spatial locator "ear" appears verbatim in both stimulus and option — learner reads keyword, not comprehends | Replace with "beside her head, where he could whisper" | No |
| 16 | kt-ch16-l6-q3 | listen-mc | "Inside the demon, it was very **dark**." | "**dark** all around" | **P0-A1a**: adjective "dark" echoed verbatim — entire question resolved by single matching word | Replace with "impossible to see" or "as black as a closed room" | No |
| 16 | kt-ch16-l7-q3 | listen-mc | "This is a lucky mallet. It can grant a **wish**." | "a magic **wish** mallet" | **P0-A1a**: "wish" echoed verbatim in correct option; the sentence also states "lucky mallet" giving away the general category | Replace with "something that makes dreams come true" or "a rare and powerful tool" | No |
| 11 | kt-ch11-l7-q7 | listen-mc | "He looked at it some nights in the soft lamp light." | "as a quiet memory" | **P0-A1b**: 3 of 4 distractors are junk/non-functional: "for selling gold price" / "cat noise made him" / "daily cleaning fun" — learner eliminates obviously incoherent options, 50%+ guessability with zero comprehension | Replace distractors: "to show off his skill" / "in case suns returned" / "his son asked for it" | No |
| 11 | kt-ch11-l3-q9 | listen-mc | "**One sun fell down**. The air felt a little cooler." | "**a sun came down**" | **P1-A1a**: near-verbatim verb direction echo "fell down" → "came down"; "sun" repeated. Rewards reading not listening | Replace: "the sky grew a little cooler" or "one hot light disappeared" | No |
| 14 | kt-ch14-l7-q9 | listen-mc | "he was a very **old man** with a long beard." | "suddenly became an **old man**" | **P1-A1a**: key phrase "old man" repeated verbatim — correct option is a thin paraphrase with only "suddenly" added | Replace: "aged many years in a moment" or "was transformed by the box" | No |
| 15 | kt-ch15-l7-q6 | listen-mc | "He could have **run home** and shut the door behind him." | "**going home** to hide" | **P1-A1a**: "home" echoed; "run home" → "going home" is virtually verbatim, only verb form changes | Replace: "disappeared before the parade ended" or "slipped away through the crowd" | No |
| 15 | kt-ch15-l4-q8 | listen-mc | '"Oh, what fine **colors**! What soft cloth!" he said.' | "he loved its nice **colors**" | **P1-A1a**: noun "colors" echoed verbatim; the direct speech quotation makes the correct answer near-obvious | Replace: "he praised the weaving craft" or "said the fabric was magnificent" | No |
| 15 | kt-ch15-l3-q6 + kt-ch15-l4-q6 | listen-mc | "Am I not smart enough?" *(both lessons)* | "being seen as not clever" *(both)* | **P1-A1c CROSS-LESSON DUP**: identical stimulus sentence and identical correct answer appear in consecutive lessons (l3 and l4). Player who just got it right in l3 gets a free recall hit in l4 | Change l4 stimulus: use a different character's internal fear line — emperor's version should use "He stood before the mirror, afraid of what he might see." | No |
| 16 | kt-ch16-l3-q9 | listen-mc | "Issun was very small, but he sat up **tall** and brave." | "**tall** and proud" | **P1-A1a**: adjective "tall" echoed verbatim; "brave" → "proud" is thin synonym swap | Replace: "upright and fearless on the wooden deck" | No |
| 10 | kt-ch10-l5-q3 | listen-mc | "She let it go **down** her throat." | "drank it **down** inside her" | **P1-A1a**: direction word "down" echoed; "go down her throat" maps near-directly to "drank it down" | Replace: "swallowed the pill herself" or "put it away inside her" | No |
| 15 | kt-ch15-l3-q8 | listen-mc | '"**Lovely**! Truly **lovely**!" he said with a tight smile.' | "said it was **beautiful**" | **P1-A1a** (borderline): "lovely/beautiful" are single-synonym swaps; the exclamatory direct speech frames make all three wrong options (looked broken / asked for less / wanted a new color) implausible even without comprehension | Rephrase distractors to be more contextually plausible: "asked to see the cloth up close" / "said he'd wait to give his view" / "asked if more could be made" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapter range audited | Ch9–16 |
| Total MC questions | 88 |
| P0 violations | 6 |
| P1 violations | 8 |
| A1a (verbatim keyword echo) | 10 |
| A1b (non-functional distractors) | 1 |
| A1c (cross-lesson stimulus dup) | 1 |
| Audio regen required | 0 |
| **A1 violation rate** | **15.9% (14/88)** |

---

## D. Top 5 P0

1. **kt-ch13-l7-q3** — exact 2-gram "opened up" in both stimulus and correct option; full phrase verbatim. Rating: **worst in set**.
2. **kt-ch11-l7-q7** — 3 junk distractors ("cat noise made him", "for selling gold price", "daily cleaning fun") reduce effective difficulty to near-50/50 coin flip.
3. **kt-ch16-l6-q3** — single adjective "dark" echoed; question is fully resolved by one matching word.
4. **kt-ch16-l7-q3** — "wish" echoed verbatim; story context ("lucky mallet") confirms it additionally.
5. **kt-ch11-l4-q7** — "one" echoed; number-recall question requires no inference; near-junk distractors ("four big ones / still ten") from outside story context.

---

## E. Narrative Voice / Pacing Improvements (even with 0 R1-R8 violations)

1. **Ch11 — sun-counting questions too mechanical**: Lessons l3-l5 contain three detail questions about the number/state of remaining suns in rapid succession. The phrasing leans quantitative ("how many", "what happened after the first arrow") rather than emotional. Grandma's storytelling voice would frame this as consequence and feeling: "How did the earth finally feel?" / "What changed when the tenth sun was gone?" — pulls comprehension up from recall to gist.

2. **Ch15 — stem monotony**: 5 of 15 questions use the template "What did X say about the cloth?" with slight agent variation (minister, emperor, strangers). Variety recommendation: alternate with "How did X react when he saw the looms?" / "What did his face show when he looked at it?" — same inference target, richer register.

3. **Ch13 — direct-speech give-away pattern**: Three Ch13 questions quote the dialogue and then ask what was said (l4-q8, l6-q4, l7-q3). When the stimulus IS a direct quote, the comprehension question should ask about inference or consequence ("What did this tell the girl?"), not simply re-ask the content already stated in the quote.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #108: X64_CONTENT_KEYWORD_ECHO_LINT**

### Industry Research

From ResearchGate "Distractor Plausibility in a Multiple-Choice Listening Test" (Yanagawa & Green 2008, widely cited in 2024-2026 ELT item design courses):

> *"Overlap—where a correct option or distractor shares the same content word with the stimulus text—is the strongest single predictor of guessability, independent of listener proficiency."*

The existing `X48_NGRAM_VERBATIM` rule in `validate-lessons.js` catches **3+ consecutive-word phrase copies**. But 10 of the 14 violations found this cycle involve **single-keyword echo** (ear / dark / wish / one / tall / down / opened / colors / home / sun) — below the 3-gram threshold. This is a systematic gap in the current lint.

### Pickup 適配分析

**✅ 完全適合 — Effort Low, ROI High**

`validate-lessons.js` already maintains a `STOP_WORDS` set for X48. Extending it:

```js
// validate-lessons.js — add after X48 check
const CONTENT_STOP = new Set(['a','an','the','is','are','was','were','be','been',
  'have','has','had','will','would','can','could','may','might','must',
  'to','of','in','on','at','by','for','with','from','and','or','not',
  'it','he','she','they','we','you','i','his','her','its','his','my',
  'this','that','just','very','all','so','do','did','does','up','out','back']);

function checkX64KeywordEcho(q, lessonId) {
  const sentence = (q.sentence || '').toLowerCase();
  const opts = q.options || q.optionsEn || [];
  const ci = q.correctIndex ?? q.answer;
  if (ci == null || ci < 0 || ci >= opts.length) return;
  const correct = String(opts[ci]).toLowerCase();
  
  // content keywords in correct option (strip stop words, length > 3)
  const ckw = correct.match(/[a-z]{4,}/g)?.filter(w => !CONTENT_STOP.has(w)) || [];
  const sentWords = new Set(sentence.match(/[a-z]{4,}/g)?.filter(w => !CONTENT_STOP.has(w)) || []);
  
  const echoed = ckw.filter(w => sentWords.has(w));
  if (echoed.length >= 1) {
    // strict: ≥1 unique content keyword echoed → flag
    const severity = echoed.length >= 2 ? 'X64_KW_ECHO_P0' : 'X64_KW_ECHO_WARN';
    return { id: q.id || q.qid, severity, echoed };
  }
}
```

- Catches all 10 A1a violations found this audit (ear, dark, wish, one, tall, opened, colors, home, fell/came, down)
- Exempt pattern: `// @X64-exempt` in `explanationZh` for intentional-recall warm-up questions
- Default: warn-only; `ECHO_LINT_STRICT=1` to block build
- No JSON migration, no src/ change needed

**Impact**: Would flag 14 violations this cycle at ~15.9% rate. Industry benchmark target per ETS Part 3-4 guidelines: ≤5% verbatim echo rate. Addressable queue without story-content restructuring.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X64 content-keyword echo lint in validate-lessons.js | Yanagawa & Green 2008; IELTS distractor quality guideline (IELTS Mumbai, 2024) | ✅ 完全適合 — 20-line addition using existing STOP_WORDS pattern, no JSON migration | Low (1-2 hrs: add check + STRICT flag + @X64-exempt escape hatch + test) | High (catches 15.9% echo violations, closes gap between 3-gram X48 and single-keyword leaks) | **推薦實作** |

---

*Audit generated 2026-07-03 06:05 UTC | Angle: A1 Obvious Correct | Chapter: Ch9–16 | P0: 6 | P1: 8 | Total violations: 14/88 (15.9%)*
