# Content QA — 2026-06-10 12:15 UTC

Today's angle: **#3 — A1 Obvious Correct (gap too easy · question-stem echo)**
Focus: **Ch4–Ch12 deep pass · Corpus-wide A1_Q_ECHO scan (Ch0–31)**

Angle rationale: A1 has never been run as a primary dedicated cron angle. It covers cases where the correct answer is trivially deducible without actual story comprehension. Two sub-types dominate today's scan:
1. **A1_Q_ECHO_UNIQUE** — a content word from the question stem appears exclusively in the correct option and not in any distractor. Child learners pattern-match "fast" in Q → "very fast" in option A, bypassing comprehension entirely.
2. **A1_WORLD_KNOWLEDGE** — correct answer uses a world-knowledge association (tears → sad, snow → cold) that requires zero story reading.

Rotation: Previous 8 angles — A3/explanationZh×2/optionsZh/R1/R2/A4/AudioSync. A1 last pass: **never**.

Industry backing:
- NBME Item Writing Guide (2021/2024 revision) explicitly names "answer in stem" as IWF-class item-writing flaw: *"item writers should scan options and stem for word/phrase repetition"*
- Oxford Applied Linguistics (2025, DOI 10.1093/applin/amaf079): ML study confirms semantic similarity between stem and correct option measurably reduces item difficulty — valid difficulty should come from content discrimination, not pattern matching
- Frontiers in Computer Science (2026): AI-assisted MCQ creation "increases item-writing flaws through automation bias" — LLM-generated items frequently echo stem language in keys
- Nonfunctional distractor analysis (PMC, 2020): items where 1+ distractors is obviously wrong reduce reliability — analogously, when the correct answer is "obviously right" via echo, the item fails

---

## A. validate-lessons.js result

```
WARN lessons-ch3.json: 6 lint (X2 only)
WARN lessons-ch27.json: 8 lint (R1_SUBSTRING + X2 + X3)
WARN lessons-ch28.json: 12 lint (R1_SUBSTRING + X2 + X3)
WARN lessons-ch30.json: 5 lint (X2+X3+R1_SUBSTRING)
WARN lessons-ch31.json: 8 lint (R1_SUBSTRING + X2 + X3)
OK all others (Ch0-31)

Total mirror-lint issues: 65 (warn-only)
```

**A1_Q_ECHO violations are NOT caught by current validate-lessons.js** — none of the 19 violations below appear in the WARN output. This is the lint gap that ARCH-REC #18 addresses.

---

## B. Violation Table

Two passes: automated corpus-wide A1_Q_ECHO scanner + world-knowledge/length-outlier scanner. Ch4–Ch12 manually reviewed question-by-question.

### B1 — A1_Q_ECHO_UNIQUE (stem word exclusively in correct option)

| Ch | Q ID | Sentence (truncated) | Question | Correct option | Echo word | P? | 修法 | audio regen? |
|----|------|----------------------|----------|----------------|-----------|-----|------|-------------|
| 3 | kt-ch3-l2-q9 | "In one minute, the brown hare was a small dot ahead on the road." | "How **fast** did the hare go?" | "very **fast**" | fast | **P0** | Change Q to "What happened in one minute?" or change correct to "a quick blur" | ❌ |
| 3 | kt-ch3-l4-q9 | "The brown ears stayed flat on the soft grass beside the tree." | "Was the hare still **asleep**?" | "yes, deeply **asleep**" | asleep | **P0** | Change correct to "yes, not yet moving" and add distractor "yes, deeply asleep" as trap | ❌ |
| 8 | kt-ch8-l2-q5 | "He was done before lunch time." | "How **fast** did the first pig build?" | "very **fast**" | fast | **P0** | Same fix as Ch3-l2-q9 — change Q to "When did the first pig finish?" or change correct to "before the sun was high" | ❌ |
| 30 | kt-ch30-l1-q3 | "His arms were like tree trunks, and he could lift a full-grown bull." | "How **strong** was Heracles?" | "**strong** enough to lift a big bull" | strong | **P0** | Change correct to "powerful beyond any man" or change Q to "What could Heracles do with a full-grown bull?" | ❌ |
| 30 | kt-ch30-l3-q6 | "The forest was very quiet. No bird sang and no small animal moved." | "How did the forest **sound**?" | "silent with no **sound**" | sound | **P0** | Change correct to "as if the whole wood held its breath" or change Q to "What was strange about the forest?" | ❌ |
| 8 | kt-ch8-l4-q9 | "His knocks were loud, and his voice was soft like honey." | "How did the wolf **knock** and speak?" | "loud **knock**, sweet voice" | knock | P1 | Add "knock" to 1+ distractors (e.g. "two soft knocks, angry roar") or rephrase correct to "pounding fists, honeyed words" | ❌ |
| 17 | kt-ch17-l7-q3 | "**Tears** shone quietly in her soft, dark eyes." | "How did she feel?" | "**sad** with **tears**" | tears | P1 | A6+A1 co-violation. Change correct to "quietly heartbroken" | ❌ |
| 19 | kt-ch19-l3-q9 | "His small voice rang out over the dark water of the river." | "How **loud** did mouse deer call?" | "very **loud**" | loud | P1 | Change Q to "What surprised the crocodiles?" or change correct to "clear above the river noise" | ❌ |
| 20 | kt-ch20-l4-q10 | "They pull and pull. The turnip will not move." | "Why does the turnip **still** not move?" | "three is **still** not enough" | still | P1 | Change correct to "not enough hands yet" (drops "still") | ❌ |
| 26 | kt-ch26-l2-q3 | "He could not cut it open. He could not melt it down." | "What two things could Archimedes not do to the **crown**?" | "damage the **crown** in any way" | crown | P1 | Change correct to "harm it in any way" (omit "crown" since Q names it) | ❌ |
| 27 | kt-ch27-l4-q6 | "He had no friend to talk with. The stars were his only company." | "Who was with Sanzang at **night**?" | "no one, just the **night** sky" | night | P1 | Change correct to "only the silent stars" | ❌ |
| 27 | kt-ch27-l6-q6 | "Sanzang's eyes grew wide. Five hundred years was so very long." | "How did Sanzang feel about the **time**?" | "was surprised by a long, long **time**" | time | P1 | Change correct to "shocked by how much had passed" | ❌ |
| 5 | kt-ch5-l5-q10 | "Baba Yaga came in and looked straight at Vasilisa." | "How did Baba Yaga know a **person** was inside?" | "she smelled a **person**" | person | P1 | Change correct to "she smelled a visitor" | ❌ |
| 9 | kt-ch9-l1-q6 | "They wore fine dresses and had soft hands." | "What kind of **life** did the two sisters have?" | "an easy and rich **life**" | life | P1 | Change correct to "easy and pampered" | ❌ |
| 28 | kt-ch28-l6-q8 | "Time passed slowly, and the sun moved across the cold sky." | "How **long** did Liu Bei wait?" | "a **long** while" | long | P1 | Change correct to "through the whole cold afternoon" | ❌ |

### B2 — A1_WORLD_KNOWLEDGE (correct answer deducible from general knowledge)

| Ch | Q ID | Sentence (truncated) | Correct option | WK bypass | P? | 修法 | audio regen? |
|----|------|----------------------|----------------|-----------|-----|------|-------------|
| 17 | kt-ch17-l7-q3 | "Tears shone quietly in her soft, dark eyes." | "sad with tears" | tears→sad universal | P1 | Listed in B1; same fix | ❌ |
| 6 | kt-ch6-l4-q5 | "For one short hour each night, they were boys again." | "briefly after dark" | night→dark | P2 | Minor; acceptable story paraphrase | ❌ |
| 28 | kt-ch28-l4-q6 | "Snow fell on his hat and the horse's mane all the way up the hill." | "snowy and cold" | snow→cold | P2 | Co-violation with A4 (prev audit). "snowy" = R1 near-verbatim. Fix: "grey and biting" | ❌ |
| 21 | kt-ch21-l1-q3 | "People sat together at night, and no one had a tale to tell." | "very quiet and empty" | night→quiet | P2 | Acceptable; "quiet" is contextual not pure WK here | ❌ |

### B3 — A1_LENGTH_OUTLIER (correct answer word-count outlier vs distractors)

| Ch | Q ID | Correct | Correct len | Avg distractor len | P? | 修法 |
|----|------|---------|-------------|--------------------|----|------|
| 26 | kt-ch26-l4-q10 | "💡 lit up with an idea" | 6w | 2.0w | P1 | Trim to "💡 sparked with an idea" (5w) or pad distractors to 4-5w each |
| 27 | kt-ch27-l6-q10 | "💗 kind and sorry for him" | 6w | 2.3w | P1 | Trim to "💗 soft and sorry" (4w) or pad distractors |

### B4 — Manual Ch4–Ch12 review: notable CLEAN items

Ch4, Ch6, Ch7, Ch8 (except kt-ch8-l2-q5 and kt-ch8-l4-q9 above) are well-crafted. Notable good paraphrasing:
- `kt-ch4-l2-q8`: Correct "the same rude way" — sentence says "gave them the same short rude reply" — good synonym paraphrase (way≠reply)
- `kt-ch6-l2-q6`: Q "What color were the shirts?" / Correct "pale like milk" — sentence says "color of fresh snow" — excellent dual-metaphor paraphrase
- `kt-ch7-l3-q7`: Q "What did the family hide?" / Correct "the fish's origin" — sentence "no one said where the fish had come from" — exemplary R1-compliant paraphrase

---

## C. Stats

| Category | Count |
|----------|-------|
| Total Qs scanned | ~3,100+ across Ch0-31 |
| A1_Q_ECHO_UNIQUE P0 | **5** |
| A1_Q_ECHO_UNIQUE P1 | 10 |
| A1_WORLD_KNOWLEDGE P1 | 1 (kt-ch17-l7-q3) |
| A1_WORLD_KNOWLEDGE P2 | 3 |
| A1_LENGTH_OUTLIER P1 | 2 |
| Currently caught by lint | **0** (A1_Q_ECHO not in validator) |
| Ch4–Ch12 deep pass result | Ch4/5/6/7/9/10/11/12 CLEAN (P0); Ch8 2 P0 |
| Echo pattern "How fast → very fast" | **2 identical questions** (Ch3+Ch8 — systematic) |

**Systematic pattern flagged:** The question formula `"How [adj] did X [verb]?" → correct: "very [same adj]"` appears in both Ch3 and Ch8. This is a template-level flaw from the batch content generation process.

---

## D. Top 5 P0

| Rank | Q ID | Root cause | Fix effort | Why now |
|------|------|------------|------------|---------|
| 1 | kt-ch3-l2-q9 | "How fast" → "very fast" echo | S · 2min | 8-yr-old matches word, skips story |
| 2 | kt-ch8-l2-q5 | Same "How fast" → "very fast" pattern | S · 2min | Systematic — same flaw in 2 chapters |
| 3 | kt-ch30-l1-q3 | "How strong" → "strong enough" echo | S · 3min | Q and correct share unique stem word |
| 4 | kt-ch30-l3-q6 | "How did the forest sound" → "no sound" echo | S · 3min | "sound" appears in Q and correct only |
| 5 | kt-ch3-l4-q9 | "still asleep?" → "deeply asleep" echo | S · 3min | Yes/No stem feeds the "asleep" match |

**Narrative voice improvements (even if 0 hard violations):**
1. `kt-ch8-l2-q5` correct "very fast" → "before the dew dried" — richer story image, same comprehension check
2. `kt-ch3-l2-q9` correct "very fast" → "quick as a blink" — A2-appropriate idiom, no echo
3. `kt-ch30-l1-q3` correct "strong enough to lift a big bull" → "stronger than any man alive" — narrative grandiosity, no word match

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #18 — A1_Q_ECHO lint in validate-lessons.js

**Source:** NBME Item Writing Guide (2021) + Oxford Applied Linguistics ML study (2025, amaf079) + Frontiers CS AI-MCQ study (2026, 1831250)

All three sources independently confirm "answer-in-stem" / "stem echo" as a **first-class item-writing flaw** that bypasses L2 comprehension.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Detect Q-stem word echo in correct option only | NBME IWF guide + Oxford Applied Linguistics amaf079 | ✅ 完全適配 — validate-lessons.js 已有 per-Q lint hook | S · 30min | ⭐⭐⭐⭐ | **IMPLEMENT** |
| LLM distractor diversity audit (automated MCQ re-gen) | Frontiers 2026 + D-GEN arxiv 2504.13439 | 🟡 部分適配 — Pickup content is static JSON, but re-gen of P0 items is feasible | M · 2hr | ⭐⭐ | Hold |
| Item-difficulty ML scoring (semantic stem-option similarity) | Oxford Applied Linguistics 2025 amaf079 | ❌ 不適配現在 — needs embeddings infra; overkill for 8-yr-old ELT | XL | ⭐ | Skip |

**Implementation spec (S · 30min):**

Add to `tools/validate-lessons.js` inside `lintQuestion()`, after the existing X3 check:

```js
// A1_Q_ECHO: question stem word appears exclusively in correct option
if (q.question) {
  const STOPWORDS = new Set(['what','when','where','which','whom','who','how','why',
    'did','does','was','were','is','are','have','had','the','and','for',
    'that','this','with','from','his','her','its','they','you','can','not',
    'does','about','into','very','said','much','many','some','any','just']);
  const qWords = new Set(
    q.question.toLowerCase().replace(/[^a-z ]/g,'').split(' ')
      .filter(w => w.length >= 4 && !STOPWORDS.has(w))
  );
  if (qWords.size > 0) {
    const correctEn = typeof correctOption === 'string'
      ? correctOption.toLowerCase()
      : (correctOption.en || '').toLowerCase();
    const distractorText = options
      .filter((_,i) => i !== correctIdx)
      .map(o => typeof o === 'string' ? o.toLowerCase() : (o.en||'').toLowerCase())
      .join(' ');
    const echoWords = [...qWords].filter(w =>
      correctEn.includes(w) && !distractorText.includes(w)
    );
    if (echoWords.length > 0) {
      warns.push(`${q.id}: A1_Q_ECHO (Q word "${echoWords[0]}" only in correct, not distractors)`);
    }
  }
}
```

Expected first-run output: **~24 WARN** (19 confirmed + ~5 false positives from common adjectives like "small", "old"). Set warn-only with `A1_LINT_STRICT=1` to harden.

**Pilot fix for P0 items (manual, 5 items, ~15min total):**

| Q ID | Before | After |
|------|--------|-------|
| kt-ch3-l2-q9 | correct: "very fast" | → "quick as a blink" |
| kt-ch8-l2-q5 | correct: "very fast" | → "before the dew dried" |
| kt-ch30-l1-q3 | correct: "strong enough to lift a big bull" | → "stronger than any man alive" |
| kt-ch30-l3-q6 | correct: "silent with no sound" | → "as if the whole wood held its breath" |
| kt-ch3-l4-q9 | correct: "yes, deeply asleep" | → "yes, still not moving" |

---

*Sources consulted:*
- [NBME Item Writing Guide](https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf) — "answer in stem" IWF
- [Oxford Applied Linguistics 2025 — ML item difficulty](https://doi.org/10.1093/applin/amaf079)
- [Frontiers CS 2026 — AI-MCQ flaws](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1831250/full)
- [Nonfunctional distractor analysis PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/)
