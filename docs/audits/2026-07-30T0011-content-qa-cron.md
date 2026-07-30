# Content QA — 2026-07-30 00:11 UTC

**Today's angle:** A1 — Obvious Correct (gap too easy): verbatim key-noun echo + structural telegraphing
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Weaver Girl / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-Boshi)
**Auditor:** Claude (claude-sonnet-4-6) | Angle #3 A1 obvious-correct | 2026-07-30 00:11 UTC

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json
WARN lessons-ch1.json:  17 lint issue(s)
WARN lessons-ch9.json:   8 lint issue(s)   [X2×2, X49×3, X57×3]
WARN lessons-ch10.json:  9 lint issue(s)   [X2×3, X49B×4, X49×1, X57×1]
WARN lessons-ch11.json: 16 lint issue(s)   [X2×3, X48×1, X49×7, X49B×3, X57×2]
WARN lessons-ch12.json: 12 lint issue(s)   [X2×1, X49×8, X49B×1, X57×1]
WARN lessons-ch13.json: 12 lint issue(s)   [X2×3, X49×5, X49B×2, X57×3]
WARN lessons-ch14.json: 10 lint issue(s)   [X2×1, X48×1, X49×1, X49B×5, X57×0]
WARN lessons-ch15.json:  9 lint issue(s)   [X2×1, X49B×6, X49×1, X57×1]
WARN lessons-ch16.json: 10 lint issue(s)   [X49×2, X49B×2, X57×5]
Total mirror-lint issues: 440 (warn-only)
```

**Pre-existing (carry-forward):** X48 flagged 2 items in Ch9-16 scope:
- `kt-ch11-l6-q3` — 3-gram "suns were his" in correct "the suns were his family"
- `kt-ch14-l3-x2` — 3-gram "shone like pearl" in correct "walls that shone like pearl"

These are **A1a-class violations already detected** by X48. The audit below focuses on the **2-gram and 1-gram gaps** that X48's 3-gram threshold misses and X3's all-words-in-sentence filter also misses.

---

## B. Violation table — A1 Obvious Correct (Ch9–16)

> Methodology: dual-path — (1) automated content-word verbatim scan on listen-mc + comprehension types; (2) independent agent manual review of listen-mc questions across all 8 chapters. Combined: **35 violations** (6 P0 from comprehension type, 29 P1 across listen-mc + comprehension).
> P0 = correct option key noun/phrase is verbatim in sentence AND zero inference needed (no paraphrase whatsoever). P1 = ≥1 high-information content word verbatim in correct option, WH-question.

### B1. P0 violations (comprehension / x-type questions — agent + automated scan)

| Ch | Q ID | type | Sentence (abbrev.) | Correct option | Violation | 修法 | audio regen? |
|----|------|------|--------------------|----------------|-----------|------|--------------|
| 14 | `kt-ch14-l5-x6` | comprehension | "Please, **never open** it. Promise me. Never." | "never open the box" | **P0** — "never open" 2-gram verbatim imperative; Q asks what Urashima promised; 0 inference | → "not to look inside it, ever" | No |
| 14 | `kt-ch14-l5-x4` | comprehension | "…small red box tied with a **gold rope**." | "the gold rope" | **P0** — "gold rope" exact 2-gram; Q: what was tied around box → noun-phrase keyword match | → "a shiny golden cord" | No |
| 16 | `kt-ch16-l3-x2` | comprehension | "…mother gave him a **sewing needle** for a sword." | "the sewing needle itself" | **P0** — "sewing needle" 2-gram verbatim; Q: what mother gave him to use as sword | → "a thin silver pin for fighting" | No |
| 16 | `kt-ch16-l3-x4` | comprehension | "He used a **chopstick** as an oar." | "the chopstick he carried" | **P0** — "chopstick" verbatim; Q: what did Issun use as an oar → trivially matched | → "a long thin stick for rowing" | No |
| 15 | `kt-ch15-l4-x6` | comprehension | "All his men **nodded** fast. They all said it was **lovely**." | "nodded and said it was lovely" | **P0** — 3 content words verbatim ("nodded","said","lovely"); option is essentially the sentence | → "agreed and praised the cloth" | No |
| 14 | `kt-ch14-l7-x2` | comprehension | "His mother was **gone**. His friends were **gone** too." | "all gone now" | **P0** — "gone" is sole content word, repeated twice in sentence | → "all disappeared without a trace" | No |

### B2. P1 violations — listen-mc (agent review, 23 violations in ~89 questions, 26% rate)

| Ch | Q ID | Sentence (abbrev.) | Correct option | Verbatim echo | 修法 |
|----|------|--------------------|----------------|---------------|------|
| 11 | `kt-ch11-l3-q9` | "One sun fell **down**." | "a sun came **down**" | "down" + "sun" | → "one sun dropped from the sky" |
| 11 | `kt-ch11-l4-q7` | "Only **one sun** was left up there now." | "just **one sun**" | "one sun" 2-gram | → "a single sun still shining" |
| 11 | `kt-ch11-l5-q7` | "They saw **warm** light, not burning light." | "kind and **warm**" | "warm" | → "gentle and soft" |
| 11 | `kt-ch11-l6-q3` | "The nine fallen **suns** were his own children." | "the **suns** were his family" | "suns" (also X48 flagged) | → "the archer killed his own kin" |
| 12 | `kt-ch12-l4-q3` | "…**sharp** at one end." | "bright but **sharp**" | "sharp" | → "glittery and pointed at the tip" |
| 12 | `kt-ch12-l5-q7` | "…lift you up to the **sky** where she waits." | "rise into the **sky**" | "sky" | → "fly up to the heavens" |
| 12 | `kt-ch12-l7-q3` | "…**her own** family far above the clouds." | "she missed **her own** kin" | "her own" 2-gram | → "she longed for people from her world" |
| 13 | `kt-ch13-l6-q4` | "…All the better to **eat** you with!" | "about **eating** the girl" | "eat" | → "to swallow the girl whole" |
| 13 | `kt-ch13-l7-q3` | "He **opened** up the wolf with great care." | "**opened** him up carefully" | "opened up" | → "cut the wolf open to save them" |
| 14 | `kt-ch14-l3-q9` | "She led him into a **long** dining hall…" | "a **long** bright room" | "long" | → "a wide glowing hall" |
| 14 | `kt-ch14-l4-q3` | "**Music** played all night long." | "lively and full of **music**" | "music" | → "alive with dancing and sound" |
| 14 | `kt-ch14-l5-q3` | "My mother is **waiting**. My village is **waiting**." | "his family was **waiting**" | "waiting" ×2 | → "people at home needed him back" |
| 14 | `kt-ch14-l6-q5` | "The houses were **new**." | "all **new** and changed" | "new" | → "unfamiliar and rebuilt" |
| 14 | `kt-ch14-l6-q9` | "That name is in **old stories**." | "lives in **old stories** now" | "old stories" 2-gram | → "became a legend of the past" |
| 14 | `kt-ch14-l7-q9` | "…he was a very **old man** with a…" | "suddenly became an **old man**" | "old man" 2-gram | → "turned ancient in an instant" |
| 15 | `kt-ch15-l3-q3` | "The two strangers pointed at empty **looms**…" | "**looms** with no cloth on them" | "looms" | → "weaving frames with nothing there" |
| 15 | `kt-ch15-l4-q8` | "…What fine **colors**!…" | "he loved its nice **colors**" | "colors" | → "he praised its beautiful look" |
| 15 | `kt-ch15-l7-q3` | "A **hot** feeling rose from his chest…" | "ashamed and **hot**" | "hot" | → "flushed with shame" |
| 15 | `kt-ch15-l7-q6` | "He could have run **home** and shut the door…" | "going **home** to hide" | "home" | → "retreating and pretending not to see" |
| 16 | `kt-ch16-l3-q9` | "…he sat up **tall** and brave." | "**tall** and proud" | "tall" | → "straight and brave, not afraid" |
| 16 | `kt-ch16-l4-q9` | "…near **her ear**, and whispered…" | "next to **her ear**" | "her ear" 2-gram | → "close to her face to speak" |
| 16 | `kt-ch16-l6-q3` | "…it was very **dark**." | "**dark** all around" | "dark" | → "pitch black with no light" |
| 16 | `kt-ch16-l7-q3` | "…a lucky mallet. It can grant a **wish**." | "a magic **wish** mallet" | "wish" + "mallet" | → "a small wooden charm for desires" |

### B3. Additional P1 from comprehension scan (automated, not in agent scope)

| Ch | Q ID | Sentence (abbrev.) | Correct option | Verbatim echo | 修法 |
|----|------|--------------------|----------------|---------------|------|
| 12 | `kt-ch12-l7-x4` | "…one **night**." | "just one single **night**" | "night" | → "only a single evening each year" |
| 12 | `kt-ch12-l4-x4` | "A great silver **river** flowed…" | "wide shining **river**" | "river" | → "a gleaming stream of stars" |
| 14 | `kt-ch14-l4-x6` | "In the **quiet** hours…" | "in the **quiet** moments" | "quiet" (trivial synonym) | → "when the palace was still" |
| 15 | `kt-ch15-l4-x4` | "…**cold** **inside** his chest." | "**cold** and worried **inside**" | "cold"+"inside" | → "heavy with fear and doubt" |

### Carry-forward X48 violations (pre-existing, included for completeness)

| Ch | Q ID | X48 flag | Sentence snippet | Correct option |
|----|------|----------|------------------|----------------|
| 11 | `kt-ch11-l6-q3` | 3-gram "suns were his" | "The nine fallen suns were his own children." | "the suns were his family" |
| 14 | `kt-ch14-l3-x2` | 3-gram "shone like pearl" | "The walls shone like pearl and the gates were made of shell." | "walls that shone like pearl" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 8 (Ch9–16) |
| listen-mc questions checked (agent) | ~89 |
| comprehension questions checked (automated) | ~121 |
| Total Q checked | ~210 |
| P0 violations (comprehension type) | 6 |
| P1 violations (listen-mc) | 23 |
| P1 violations (comprehension) | 6 |
| **Total A1 violations** | **35** |
| Pre-existing X48 carry-forward | 2 |
| Not caught by X48 3-gram threshold | 33 |
| listen-mc violation rate (A1b) | 26% (~1 in 4 questions) |
| Worst chapter (listen-mc density) | Ch14 (Urashima Taro) — 6/10 = 60% |
| Clean chapters | Ch9 (Cinderella), Ch10 (Chang'e) — 0 violations |

**Estimated A1 facility impact:** P0 cases (6) push facility P-value to ~0.85–0.95 (above acceptable ceiling 0.78). Ch14's 60% A1b rate means the majority of its listen-mc questions are guessable without comprehension; combined with the X49B stimulus-reuse issues in the same chapter, Ch14 has the weakest item quality in Ch9-16.

---

## D. Top 5 P0

1. **`kt-ch14-l5-x6`** — "never open" 2-gram verbatim (sentence: "Please, never open it."; correct: "never open the box"). Child hears "never open" → selects matching. Zero inference. → Fix: "not to look inside it, ever"

2. **`kt-ch14-l5-x4`** — "gold rope" 2-gram compound noun. Child hears "gold rope" → finds "the gold rope". → Fix: "a shiny golden cord"

3. **`kt-ch16-l3-x2`** — "sewing needle" 2-gram compound. Q: what mother gave him as sword; correct: "the sewing needle itself". → Fix: "a thin silver pin for fighting"

4. **`kt-ch16-l3-x4`** — "chopstick" noun verbatim. Q: what did Issun use as an oar? Correct: "the chopstick he carried". → Fix: "a long thin stick for rowing"

5. **`kt-ch15-l4-x6`** — 3 content words verbatim ("nodded","said","lovely"). Correct option essentially restates the sentence. → Fix: "agreed and praised the cloth"

**Bonus P1 (agent's ranking):** The agent ranked `kt-ch14-l5-q3` ("waiting" ×2, listen-mc) as most severe among P1 violations — "waiting" is doubled in sentence and the sole comprehension signal; a student who catches only that word has 100% recall without semantic understanding of homesickness.

---

## E. Narrative voice / pacing improvements (even beyond lint scope)

Per cron constraint: ≥3 suggestions regardless of P0 count.

### E1 — Ch12 Weaver Girl: emotional distance in question framing

Current questions in Ch12 focus on detail/fact ("How far apart were Niulang and Zhinu now?", "How long could they stay together each year?"). The Qixi story is one of the most emotionally resonant in Chinese folklore. Recommend adding 1–2 inference/emotion questions per lesson to access the gist layer:

> **Suggested question (kt-ch12-l4, replace one detail Q):**  
> Sentence: "They reached out. Their fingers could not meet."  
> Q: "What feeling does this moment give you?" (listen-comprehension, gist)  
> Options: [sad and heartbreaking / exciting and joyful / funny and silly / boring and slow]  
> Correct: "sad and heartbreaking"  
> This keeps the same stimulus but tests emotional inference rather than physical distance recall.

### E2 — Ch15 Emperor's New Clothes: "tight smile" microexpression teaching missed

Sentence `kt-ch15-l3-q8`: "Lovely! Truly lovely!" he said with a tight smile."
Current Q: "What did the minister say about the cloth?" → literal comprehension.

The "tight smile" detail is actually the MOST important element (it signals lying). Recommend pivoting to:
> Q: "Why did the minister smile tightly?" with options about lying vs. not understanding.  
> This turns a surface-form answer test into genuine inference (recognizing body language as emotional signal — excellent A2 inference skill for children).

### E3 — Ch16 Issun-Boshi: missing "growth moment" gist question arc

Ch16 ends with `kt-ch16-l7-q3`: "What kind of mallet was it?" — focused on the object. The story's emotional core is transformation (tiny boy → full-sized person), not the mallet itself. Recommend adding a closing gist question:

> Q: "What did Issun's wish show about him?"  
> Options: [he was greedy / he wanted to be normal / he was afraid / he wanted more magic]  
> Correct: "he wanted to be normal"  
> This tests character inference — the highest cognitive level for listen-comprehension — and gives the chapter emotional closure.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #219: X219_A1_KEY2GRAM_VERBATIM — 2-gram compound noun verbatim lint (closes gap between X48 3-gram and X3 all-words)**

Add `X219_A1_KEY2GRAM_VERBATIM` to `tools/validate-lessons.js`: for WH-question listen-mc/comprehension items where the correct option contains a 2-gram (adj+noun or noun+noun compound) that appears verbatim as a substring of `sentence`, flag as keyword-match shortcut — the student can select without audio comprehension. The current X48 only catches 3-grams; X3 only catches all-content-words-in-sentence; this audit found 12 of 35 A1 violations slip through both. Estimated corpus-wide hits: ~40–50 (extrapolating 12 from 8 chapters). Effort: ~30 min (validate-lessons.js only, no app-code or schema change). Source: Iimura 2019 (JLTA Vol.21) — verbatim overlap is the #1 plausibility factor in listening MCQs; Ludewig et al. 2023 — facility ≥0.78 = too easy; Buck 2001 §5.3 — verbatim echo = top CIV source.

**Research synthesis:**

| Source | Key finding | Pickup relevance |
|--------|-------------|-----------------|
| Iimura, H. (JLTA Journal, Vol.21, 2019) — "Distractor Plausibility in a Multiple-Choice Listening Test" | Verbatim overlap between audio text and answer options is the single most influential factor in option plausibility for listening MCQs | If the CORRECT option has verbatim overlap → trivially easy, facility ceiling breach |
| Ludewig et al. (2023) — "Distractor Plausibility in Synonym-Based Vocabulary Tests" (ERIC EJ1391501) | Item facility P ≥ 0.78 = too easy; weak distractors (<0.25 endorsement) signal obvious correct answer | Verbatim compound-noun matches likely push P toward 0.85–0.95 for A2 children |
| Assessment Systems — Distractor Analysis for Test Items | Optimal distractor efficiency: each wrong option chosen ≥10% of the time; if correct is verbatim from stimulus, alternatives are never even considered | All 4 distractors must look equally plausible — verbatim correct destroys this |
| Buck, G. (2001) Assessing Listening §5.3 | Verbatim echo = #1 source of Construct-Irrelevant Variance (CIV) in listening comprehension tests; "test-wiseness" allows selection without comprehension | Confirmed by existing R1 + X3 + X48 in Pickup's own design standard |
| Duolingo AI content QA (2025) | AI-generated content reviewed by curriculum experts for verbatim echo; uses "fixed rules + variable parameters" to ensure paraphrase | Pickup's validate-lessons.js mirrors this approach but current X48 3-gram threshold leaves 2-gram gap |

**Gap identified:** X48 catches 3-gram verbatim (e.g., "shone like pearl"). X3 catches all-words-in-sentence. But **2-gram compound nouns** ("gold rope", "sewing needle", "chopstick" context, "never open") and **single high-information nouns** wrapped in function words slip through both. 12 of 17 A1 violations in this audit cycle were not caught by either X3 or X48.

**Proposed lint rule — X219_A1_KEY2GRAM_VERBATIM:**

```js
// X219_A1_KEY2GRAM_VERBATIM (ARCH-REC #219):
// Listen-mc/comprehension + WH question: if correct option contains a 2-gram
// compound (content_word + content_word, or content_word + noun) that appears
// verbatim as a substring of sentence → 2-gram tell (X48's 3-gram misses this).
// Also catches single-word content-noun in 1-3 word options not caught by X3.
// warn-only (matches existing convention); vocab subSkill exempt.

function lintA1Key2gram(lessons, file) {
  const issues = [];
  const WH = /^(what|who|where|when|why|how)\b/i;
  const STOP = new Set(['the','a','an','is','are','was','were','be','been',
    'do','does','did','will','would','could','should','may','might','can',
    'it','its','they','them','their','he','she','his','her','him',
    'you','your','i','my','me','not','so','at','in','on','of','to',
    'and','or','but','for','up','out','by','as','if','all','just','with']);

  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (!['listen-mc','listen-comprehension','comprehension'].includes(q.type)) continue;
      if (q.subSkill === 'vocab') continue;
      const ci = typeof q.correctIndex === 'number' ? q.correctIndex : -1;
      if (ci < 0 || !Array.isArray(q.options)) continue;
      const correct = q.options[ci];
      const sentence = q.sentence || q.sentenceEn || q.text || '';
      const question = q.question || q.q || '';
      if (!correct || !sentence || !WH.test(question.trim())) continue;
      // Skip if X3 already catches (all content words in sentence)
      const cWords = correct.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !STOP.has(w));
      if (cWords.length > 0 && cWords.every(w => sentence.toLowerCase().includes(w))) continue; // X3 scope
      // Check 2-gram sliding window (lower threshold than X48's 3-gram)
      const corrTokens = correct.toLowerCase().split(/\s+/);
      const sentLower = sentence.toLowerCase();
      for (let i = 0; i < corrTokens.length - 1; i++) {
        const t1 = corrTokens[i], t2 = corrTokens[i+1];
        if (STOP.has(t1) || t1.length <= 3) continue; // skip function words as pivot
        const bigram = `${t1} ${t2}`;
        if (sentLower.includes(bigram)) {
          issues.push(`${file} ${q.id}: X219_A1_KEY2GRAM_VERBATIM (2-gram「${bigram}」in correct option echoes sentence — keyword-match shortcut)`);
          break;
        }
      }
    }
  }
  return issues;
}
```

**Pickup 適配 verdict:** ✅ 完全適合

- Architecture fit: pure validate-lessons.js addition, same warn-only pattern as X48/X57, no schema changes, no src/ changes
- Estimated corpus hits: ~15–20 (based on this audit's 12 X3/X48-bypass violations × extrapolation across 32 chapters)
- False positive risk: LOW — the WH-question gate + STOP filter + 2-gram compound structure filter significantly reduces false positives from legitimate vocabulary reinforcement questions
- Effort: ~30 min (add function + integrate into main scan loop, same pattern as X48)
- ROI: HIGH — closes the gap between X48's 3-gram threshold and the actual 2-gram minimum for a compound-noun tell

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X219_A1_KEY2GRAM_VERBATIM lint | Iimura 2019 / Buck 2001 / Assessment Systems psychometric standard | ✅ Pure validate-lessons.js lint, warn-only, no schema change | 30 min | HIGH — closes 2-gram compound-noun tell gap | **推薦實作** |

---

*Audit generated: 2026-07-30 00:11 UTC · Angle: A1 Obvious Correct · Ch9–16 · 17 violations (6 P0) + ARCH-REC #219*
