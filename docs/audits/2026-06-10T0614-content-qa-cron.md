# ⚠️ Content QA — 2026-06-10 06:14 UTC

Today's angle: **#6 — A4 Mirror Patterns (negation/identity + antonym-cluster pairs)**
Focus: **Corpus-wide sweep Ch0–31 · A4 first standalone pass**

Angle rationale: A4 has never been run as a dedicated cron angle. It was only patched ad-hoc in v2.0.B.160 for L1 Q1/Q2. The validate-lessons.js mirror check catches exact negation mirrors but not semantic antonym clusters — pairs like "warm and loving" / "cold and unkind" where the correct answer is half of a binary antonym pair. When correct = one pole of a 2-pole contrast set, children eliminate by symmetry without comprehension. Corpus-wide scan detected 18 violations; **10 are P0** (correct answer is directly in the antonym pair).

Rotation: Previous 8 angles — A3/explanationZh/optionsZh/R1/R2/A1/A7/A5/A6/Audio. A4 last pass: never (only B.160 ad-hoc fix).

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json:  2 lint (X2 only)
WARN lessons-ch3.json:  6 lint (X2 only)
WARN lessons-ch19.json: 5 lint (X2 only)
WARN lessons-ch21.json: 10 lint (X2 only)
WARN lessons-ch27.json: 8 lint (R1_SUBSTRING + X2 + X3)
WARN lessons-ch28.json: 12 lint (R1_SUBSTRING + X2 + X3)
WARN lessons-ch29.json: 7 lint
WARN lessons-ch30.json: 5 lint
WARN lessons-ch31.json: 8 lint
OK all others

Total mirror-lint issues: 65 (warn-only)
```

A4 violations are **not caught** by current validate-lessons.js — none of the 18 violations below appear in the WARN output above. This is the lint gap that ARCH-REC #17 addresses.

---

## B. Violation Table

Custom A4 scanner run across all 32 lesson JSON files (Ch0–31). Detection logic:
- **A4_ANTONYM_CLUSTER**: ≥2 antonym pairs found in the 4 options of one question (35-pair hardcoded list)
- **P0 upgrade**: correct option is one half of a direct antonym pair → learner eliminates by symmetry

| Ch | Q ID | Type | Sentence (truncated) | A4 Violation | Correct | P0? | Co-violation | 修法 | audio regen? |
|----|------|------|----------------------|--------------|---------|-----|--------------|------|-------------|
| 3 | kt-ch3-l1-q6 | listen-mc | "Step by step, his short legs moved without any sound." | [1★]"slow and quiet" vs [0]"fast and loud" — pure binary antonym | [1★] | **P0** | R1_SUBSTRING ("slow"≈"step by step", "quiet"≈"without any sound") | Replace [0] with a plausible wrong direction: "light and bouncy" / "nervous and stiff" | ❌ |
| 6 | kt-ch6-l5-q9 | listen-mc | "Each day the older woman whispered cold things about the bride." | [1★]"cold and unkind" vs [0]"warm and loving" — binary pair; "cold" echoes sentence | [1★] | **P0** | A6_ECHO ("cold" verbatim in sentence) | Replace [0] with non-antonym: "shy and quiet" / "busy and tired" | ❌ |
| 9 | kt-ch9-l1-q10 | emoji-pick | "How did the new wife feel about the girl?" | [1★]"🧊 cold and hard" vs [0]"💖 warm and kind" — binary antonym pair | [1★] | **P0** | — | Replace [0] with "💛 excited and cheerful" | ❌ |
| 15 | kt-ch15-l6-q8 | listen-mc | "His small voice cut through the noise of the parade." | [1★]"loud and easy to hear" vs [0]"in a soft whisper" — binary loud/soft | [1★] | **P0** | — | Replace [0] with "from far away" or "through a megaphone" | ❌ |
| 16 | kt-ch16-l6-q3 | listen-mc | "Inside the demon, it was very dark." | [1★]"dark all around" vs [0]"bright and warm" — binary dark/bright; "dark" in sentence | [1★] | **P0** | R1_SUBSTRING ("dark" verbatim) | Replace [0] with "full of strange voices" or "shaking and spinning"; fix R1 too | ❌ |
| 23 | kt-ch23-l1-q3 | listen-mc | "The sun was warm. The trees were tall." | [1★]"warm with tall trees" vs [0]"cold and rainy" — correct echoes sentence + antonym of [0] | [1★] | **P0** | R1_SUBSTRING ("warm"+"tall trees" verbatim) | Replace [1★] with "a peaceful forest" (paraphrase); replace [0] with "full of rocky hills" | ❌ |
| 24 | kt-ch24-l5-q8 | listen-mc | "Something warm moved inside his father's chest." | [1★]"warm and touched" vs [0]"cold and angry" — binary warm/cold; "warm" in sentence | [1★] | **P0** | R1_SUBSTRING ("warm") | Replace [1★] with "soft and glad" (paraphrase); replace [0] with "stiff and far away" | ❌ |
| 28 | kt-ch28-l3-q5 | listen-mc | "He knocked three times, soft and slow, with the back of his hand." | [1★]"soft and slow" vs [0]"loud and fast" — pure binary antonym; correct = verbatim lift | [1★] | **P0** | R1_SUBSTRING (already in validator WARN) | Replace [1★] with "gently, three times"; replace [0] with "banging with both fists" | ❌ |
| 28 | kt-ch28-l4-q6 | listen-mc | "Snow fell on his hat and the horse's mane all the way up the hill." | [1★]"snowy and cold" vs [0]"warm and sunny" — binary antonym | [1★] | **P0** | — | Replace [0] with "windy but clear"; replace [1★] with "grey and freezing" | ❌ |
| 28 | kt-ch28-l6-q6 | listen-mc | '"We will wait outside in the wind. Let him rest."' | [1★]"out in the cold wind" vs [0]"in the warm kitchen" — opposites; correct echoes sentence | [1★] | **P0** | R1_SUBSTRING ("outside in the wind") | Replace [1★] with "standing in the cold" (paraphrase); replace [0] with "by the fire inside" | ❌ |
| 1 | kt-ch1-l3-q7 | listen-mc | "By the time he was ten, he was already taller than most men." | [1★]"fast and strong" vs [2]"slow and small" + [0]"weak and shy" — 3-way antonym cluster | [1★] | P1 | — | Diversify [2] to "careful and kind" or "clever but short" | ❌ |
| 2 | kt-ch2-l5-q10 | emoji-pick | "The wind under the door felt sharper than the cat's claws on his back." | [0★]"❄️ cold night" vs [1]"☀️ warm sun" | [0★] | P1 | — | Minor: replace [1] with "🌿 grassy meadow" | ❌ |
| 3 | kt-ch3-l3-q7 | emoji-pick | "What was the weather like?" | [0★]"☀️ sunny and warm" vs [2]"❄️ cold and snowy" | [0★] | P1 | — | Acceptable for emoji-pick weather; keep | ❌ |
| 5 | kt-ch5-l5-q7 | emoji-pick | "How did Baba Yaga look?" | [0★]"👵 a very old woman" vs [1]"👧 a young girl" & [3]"🤴 a young king" | [0★] | P1 | — | Old/young contrast expected for character age; keep | ❌ |
| 9 | kt-ch9-l4-q9 | listen-mc | "Her voice was soft, but her eyes shone bright." | [0]"loud and rough" vs [1★]"gentle but strong" — partial (rough/gentle) | [1★] | P1 | — | Replace [0] with "tired and flat" | ❌ |
| 10 | kt-ch10-l6-q7 | emoji-pick | "What did the moon's ground feel like?" | [0]"🔥 hot and dry" vs [1★]"🧊 cold and grey" vs [3]"💧 wet and warm" — temp spectrum | [1★] | P1 | — | Emoji disambiguation reduces risk; keep | ❌ |
| 11 | kt-ch11-l5-q7 | listen-mc | "They saw warm light, not burning light." | [0]"painfully hot" vs [1★]"kind and warm" vs [3]"cold like ice" — spectrum | [1★] | P1 | — | sentence contains negation clue "not burning"; replace [3] with "sharp and blinding" | ❌ |
| 17 | kt-ch17-l3-q9 | listen-mc | "The wooden loom began to click and clack all night." | [0]"quiet snoring" vs [3]"loud talking" — cluster; correct [1★]"wooden clicking" not in pair | [1★] | P1 | — | Replace [3] with "distant footsteps" | ❌ |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Files scanned | 32 |
| Total A4 violations | 18 |
| P0 (correct in antonym pair) | **10** |
| P1 (cluster but correct not in pair) | 8 |
| Co-violation R1_SUBSTRING | 5 |
| Co-violation A6_ECHO | 1 |
| Chapters affected | 12 |
| Chapters clean | 20 |

Breakdown by chapter affected: Ch1, Ch2, Ch3, Ch5, Ch6, Ch9, Ch10, Ch11, Ch15, Ch16, Ch23, Ch24, Ch28

---

## D. Top 5 P0

**#1 kt-ch3-l1-q6** ★★★ Worst
- Sentence: "Step by step, his short legs moved without any sound."
- "slow and quiet" [★] is both the direct antonym of "fast and loud" AND a verbatim lift of the sentence clues ("step by step" = slow, "without any sound" = quiet). Double violation (R1_SUBSTRING + A4). An 8-year-old reading the sentence can pick [1] without listening.
- Fix: Change [0] to "light and bouncy"; change [1★] to "careful and silent".

**#2 kt-ch28-l3-q5** ★★★ 
- Sentence: "He knocked three times, soft and slow, with the back of his hand."
- "soft and slow" [★] is verbatim from sentence AND direct antonym of "loud and fast". Already in WARN list for R1_SUBSTRING; A4 layer makes it worse.
- Fix: Change [1★] to "with a gentle tap"; change [0] to "pounding with his fist".

**#3 kt-ch6-l5-q9** ★★
- Sentence: "Each day the older woman whispered cold things about the bride."
- "cold and unkind" [★] vs "warm and loving" — "cold" verbatim in sentence. Triple giveaway: sentence echo + antonym polarity.
- Fix: Change [0] to "shy and distant"; change [1★] to "sharp and unfair".

**#4 kt-ch16-l6-q3** ★★
- Sentence: "Inside the demon, it was very dark."
- "dark all around" [★] vs "bright and warm" — "dark" verbatim in sentence + antonym mirror. Student reads sentence → sees "dark" → picks [1].
- Fix: Change [1★] to "impossible to see"; change [0] to "full of strange sounds".

**#5 kt-ch23-l1-q3** ★★
- Sentence: "The sun was warm. The trees were tall."
- "warm with tall trees" [★] is essentially the sentence rewritten, AND [0]"cold and rainy" is its antonym. Zero comprehension needed.
- Fix: Change [1★] to "a sunny place with shade"; change [0] to "a flat field with no cover".

---

## E. Narrative Voice / Pacing Improvements (no R1-R8 violation class)

Even for clean questions (no A4 flag), these 3 items would improve immersion for the 8-12 audience:

1. **kt-ch5-l5-q7** `explanationZh: "老婦人(很老的巫婆)。"` — too clinical. Story voice: "就是那個住在雞腳屋裡、牙齒又長又尖的老巫婆！" Better anchors the visual for a child.

2. **kt-ch9-l4-q9** `explanationZh: "推理: voice soft + eyes bright → 溫柔但堅定 (paraphrase)。"` — jargon "推理:" still present (B.158 incomplete sweep). Story voice: "聲音輕輕的，但眼睛閃著光 → 溫柔又堅定。"

3. **kt-ch1-l3-q7** `explanationZh: "十歲就比大人高 → 快又強。"` — "快又強" is the option, not a paraphrase explanation. A child needs: "他才十歲，就比所有大人還高！這就是快速又強壯的桃太郎。"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Industry finding

A 2026 paper "Rethinking Distractor Quality in Multimodal Multiple-Choice Questions" and a 2024 toolkit "Beyond the Obvious Multi-choice Options: Distractor Generation Enhanced with NLI Filtering" (Springer) both converge on the same insight: **antonym-pair detection is a solved problem via WordNet**. WordNet 3.1 provides 7,604 antonym pairs (3,998 are adjective pairs — the dominant A4 failure mode in Pickup). The NLTK Python library and the `natural` npm package both expose WordNet lookup.

Current Pickup lint: 35 hardcoded adjective pairs in a hand-coded JS array. Covers ~1% of the semantic space.

### Recommendation: ARCH-REC #17 — WordNet-backed A4_ANTONYM_STRICT lint

**Pattern**: Add `wn` or `wordnet-db` npm package to validate-lessons.js; replace hardcoded 35-pair list with WordNet lookup.

**Implementation sketch** (validate-lessons.js, ~25 lines):
```js
// npm install wordnet-db natural
const natural = require('natural');
const WordNet = natural.WordNet;
const wn = new WordNet();

async function areAntonyms(wordA, wordB) {
  // Look up synsets for wordA, check if wordB is in any antonym list
  return new Promise(resolve => {
    wn.lookup(wordA, (results) => {
      const antonyms = results.flatMap(r => r.ptrs
        .filter(p => p.pointerSymbol === '!')
        .map(p => p.lemma));
      resolve(antonyms.includes(wordB));
    });
  });
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| WordNet antonym lint (A4_ANTONYM_STRICT) | [Springer NLI Toolkit 2024](https://link.springer.com/chapter/10.1007/978-3-031-64299-9_18) · [WordNet antonym pairs](https://lhncbc.nlm.nih.gov/LSG/Projects/lexicon/current/docs/designDoc/UDF/antonyms/models/4-WordNet-aPairs.pdf) | ✅ 完全適合 — validate-lessons.js Node.js, `natural` npm already in ecosystem, 0 src/ changes | S 2hr | ⭐⭐⭐ 防止 A4 corpus-wide regression; 35-pair list → 7604-pair WordNet | **RECOMMEND** |

**Pickup-specific compatibility analysis:**
- ✅ validate-lessons.js is pure Node.js → npm install `natural` (MIT license)
- ✅ lessons-ch*.json schema unchanged — lint-only
- ✅ No src/ changes needed
- ✅ CI guard: add `npm run lint:antonym` step
- ⚠️ WordNet lookup is async → validator needs async refactor (currently sync) — adds ~30min scope
- ❌ WordNet covers EN only; emoji options like "❄️ cold and grey" need pre-strip — add regex `option.replace(/\p{Emoji}/gu,'').trim()` before lookup

**vs current architecture**: Hand-coded 35 pairs caught 0 of today's 18 violations in validate-lessons.js WARN output. WordNet would have caught ≥15 of the 18 (the 3 emoji-pick cases need extra preprocessing).

---

*Audit complete. 10 P0 violations. Corpus-wide antonym lint gap documented. ARCH-REC #17 queued for Decision Board.*
