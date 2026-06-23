# ⚠️ Content QA — 2026-06-23 06:11 UTC

**Today's angle:** #8 — A6 option-in-question (correct answer's key word appears only in correct option AND in question stem — testwiseness signal)
**Focus:** Ch9–16 (Cinderella, Weaver Girl, Little Red Riding Hood, Urashima Taro, The Emperor's New Clothes, Issun-boshi — core fairy tale expansion)

---

## A. validate-lessons.js result

```
OK lessons-ch9.json
WARN lessons-ch10.json: 1 lint issue(s):
  kt-ch10-l7-q7: X2_OPTION_LIST_BIAS (all start with "to")
OK lessons-ch11.json
OK lessons-ch12.json
OK lessons-ch13.json
OK lessons-ch14.json
OK lessons-ch15.json
WARN lessons-ch16.json: 1 lint issue(s):
  kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")
Total mirror-lint issues: 72 (warn-only)
```

---

## B. Violation Table

> **Angle A6 definition:** Question stem contains key noun/adjective X, AND only the correct answer option (not any distractor) also contains X. This creates a testwiseness shortcut: test-wise children can select the answer by matching word X between question and options, without comprehension. Source: Haladyna, Downing & Rodriguez (2002) taxonomy of item-writing flaws — "word repetition between stem and options."

| Ch | Q ID | type | sentence snippet | question | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------|---------------|-----------|------|-------------|
| 9 | kt-ch9-l1-q6 | listen-mc | They wore fine dresses and had soft hands. | What kind of **life** did the two sisters have? | [1] an easy and rich **life** ← correct | `A6_STEM_WORD_ECHO`: "life" appears only in correct option; distractors [0][2][3] use "they [verb]" clause format, making format inconsistency a second signal. P0. | Change correct to: "they lived without any work" — removes "life" echo + aligns clause format with distractors | no |
| 12 | kt-ch12-l4-q9 | listen-mc | They reached out. Their fingers could not meet. | How **far** apart were Niulang and Zhinu now? | [1] too **far** to reach ← correct | `A6_STEM_WORD_ECHO`: "far" appears only in correct option. Q asks "how far" → answer echoes "far" verbatim. P0. | Change correct to: "a whole river of stars between them" — paraphrase preserving meaning without echoing "far" | no |
| 16 | kt-ch16-l7-q3 | listen-mc | "This is a lucky mallet. It can grant a wish." | What kind of **mallet** was it? | [1] a magic wish **mallet** ← correct | `A6_STEM_WORD_ECHO`: "mallet" appears only in correct option; all 3 distractors use non-mallet nouns (toy / tool / stick). P0. | Change correct to: "a tool that grants wishes" — removes "mallet" echo while preserving semantic content | no |
| 15 | kt-ch15-l1-q3 | listen-mc | He had a clean coat for every hour of the day. | How many **coats** did the emperor have? | [1] a huge number of **coats** ← correct | `A6_FORMAT_ECHO_MILD`: "coats/coat" appears in ALL 4 options — no selective signal, but structural similarity between Q ("coats") and answer phrasing ("coats") still weakly scaffolds choice. P1. | Keep all options; BUT rewrite correct to "one for every hour of the day" — eliminates echo AND rewards comprehension of the sentence's specific detail | no |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch9–16 (8 chapters) |
| Total lessons | 56 |
| Total Qs (non-narration/tap-pairs) | 234 |
| A6-auditable Qs (with question text) | 178 |
| listen-mc type | 122 |
| **P0 A6_STEM_WORD_ECHO violations** | **3** |
| **P1 A6_FORMAT_ECHO_MILD violations** | **1** |
| Estimated total A6 exposure (all 32 chapters) | ~12–18 P0 (extrapolating 3/8ch rate) |

---

## D. Top 5 P0

1. ⚠️ `kt-ch9-l1-q6` — "life" echo: compound A6 (word echo + format mismatch between correct and distractors = double testwiseness signal)
2. ⚠️ `kt-ch12-l4-q9` — "far" echo: question explicitly asks degree using the word, answer restates it verbatim
3. ⚠️ `kt-ch16-l7-q3` — "mallet" echo: category noun is the question's only anchor, and only correct option contains it
4. ⚠️ `kt-ch10-l7-q7` — X2_OPTION_LIST_BIAS (all start "to"): pre-existing lint violation, persists unfixed
5. ⚠️ `kt-ch16-l1-q6` — X2_OPTION_LIST_BIAS (all start "a"): pre-existing lint violation, persists unfixed

---

## E. Narrative Voice / Pacing Improvements (3 required)

Even with only 4 structural violations, these pacing issues degrade the grandma-storytelling experience for 8-12 year olds:

### E1. listen-tf questions have empty `question` field
Ch9–16 contains many listen-tf entries where `question: ""`. The Yes/No response is triggered purely by the sentence — no question prompt. For young learners, this requires holding the sentence + inferring the implicit question simultaneously. **Proposed fix:** Add a brief 3-5 word prompt tied to story voice: e.g., `"Is this right?"` → `"Did that really happen?"` or `"Does that sound right to you?"` Brings the grandma's questioning tone back into every item.

### E2. Option grammatical format inconsistency in "what kind of" questions
In `kt-ch9-l1-q6`, options [0][2][3] use clause format ("they worked…", "they grew…", "they lived…") while the correct [1] uses noun phrase ("an easy and rich life"). Children learning English are sensitive to grammatical format cues — the lone noun phrase stands out visually. All 4 options should use the same grammatical category: either all clauses ("they had an easy, rich life") or all noun phrases ("a hard working life / a life of ease / a lonely life / a life growing food").

### E3. Story bridge narration before first question in new scene
Ch12 (Niulang/Zhinu) L4 opens directly with questions about the separation scene without a narration entry establishing the spatial context. For a fairy tale with abstract geography (the Milky Way as a river), 8-12 year olds benefit from a narration node first: *"Niulang stood on one side. Zhinu stood on the other. Between them lay the great Silver River."* Adding this 1-sentence narration before `kt-ch12-l4-q9` would scaffold the "far apart" comprehension question meaningfully.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #68: X21_A6_STEM_WORD_ECHO_LINT**

> Source: Haladyna, Downing & Rodriguez (2002) taxonomy — "word repetition between stem and options" is one of the **top-5 most common item-writing flaws** across educational tests. Also cited in BenchMarker (arXiv 2602.06221, 2026): automated MC benchmark flaw detection. The Frontiers/Education distractor position study (2021) confirms test-wise students exploit surface-form cues before content cues.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| A6 stem-word echo lint rule: flag when correct answer's key content noun/adj appears only in correct option AND in question stem | [Haladyna et al. via PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6788158/) + [BenchMarker arXiv](https://arxiv.org/pdf/2602.06221) + [Frontiers distractor position](https://www.frontiersin.org/articles/10.3389/feduc.2021.731763/full) | ✅ Fully fits. `validate-lessons.js` already has X2/X3 lint infrastructure. Adding X21 requires: (1) extract content words from `question` (len ≥ 4, not stopword), (2) for each word, check if it appears in correct option but NOT in any distractor → flag `X21_A6_STEM_ECHO`. Zero JSON schema change needed. | 1.5 hr | 🔴 HIGH — this run found 3 P0 manually that X21 would catch automatically. Extrapolated: ~12-18 P0 across 32 chapters that would be auto-caught in CI | ✅ Recommend implement |

**Concrete implementation for `tools/validate-lessons.js`:**
```js
// X21: A6 stem-word echo
if (q.question) {
  const STOPWORDS = new Set(['what','kind','many','much','how','did','was','were','the','are','does','have','had','who','why','when','where','which','this','that','from','into','they','their','with','about','been']);
  const stemWords = q.question.toLowerCase()
    .replace(/[^\w\s]/g,'').split(/\s+/)
    .filter(w => w.length >= 4 && !STOPWORDS.has(w));
  for (const sw of stemWords) {
    const inCorrect = opts[correctIdx].toLowerCase().includes(sw);
    const inOther = opts.filter((_,i)=>i!==correctIdx).some(o=>o.toLowerCase().includes(sw));
    if (inCorrect && !inOther) {
      issues.push(`${q.id}: X21_A6_STEM_ECHO (question word "${sw}" only in correct option)`);
    }
  }
}
```

**Pickup architecture note:** Lives entirely in `tools/validate-lessons.js` (CI guard). Does NOT touch `src/` or any lesson JSON. Zero deploy risk.
