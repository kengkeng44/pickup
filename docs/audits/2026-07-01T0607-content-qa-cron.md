# ⚠️ Content QA — 2026-07-01 06:07 UTC

Today's angle: **A4 — Mirror Patterns (negation / antonym pair / structural clone)**
Focus: **Ch1–8** (桃太郎 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六天鵝 / 葉限 / 三隻小豬)

**Angle definition (A4 Mirror Patterns)**:
A "mirror pattern" is any structural relationship between two options that allows a test-wise learner to narrow from 4 choices to ≤2 without actual comprehension. Four sub-types:

| Code | Definition | Severity |
|------|-----------|----------|
| **A4a** | Negation mirror: one option is the logical negation of another (e.g. "He ran fast" / "He did not run fast") | P1 |
| **A4b** | Synonym/identity mirror: two distractors are near-synonyms (content-word Jaccard ≥ 0.70), reducing effective choices | P2 |
| **A4c** | Antonym-pair mirror: correct answer + exactly one distractor are antonyms (happy/sad, fast/slow, warm/cold…), while the other two are unrelated — learner picks by opposition | P1 |
| **A4d** | Structural clone: all options share the same deep template with only a single slot substitution, OR the correct answer is structurally "the odd one out" among 3 similar distractors | P2 |

**Research basis**: Tarrant et al. (2009), Rodriguez (2005), and Buck (2001) all identify antonym-pair and negation-mirror distractors as sources of Construct-Irrelevant Variance (CIV) — they reduce effective option count and allow test-wise bypass of comprehension. ETS Part 3-4 item writing guidelines explicitly forbid "mirror-inverse" distractors.

**Bonus bug found**: `kt-ch3-l5-x4` has wrong `correctIndex` (P0 answer-key error, not an A4 issue, flagged separately).

---

## A. validate-lessons.js result (Ch1–8 filter)

```
WARN lessons-ch1.json: 13 lint issue(s) (X2_OPTION_LIST_BIAS ×3, X49_STIMULUS_REUSE ×7, X49B ×3)
WARN lessons-ch2.json:  7 lint issue(s) (X2_OPTION_LIST_BIAS ×1, X49_STIMULUS_REUSE ×4, X49B ×2)
WARN lessons-ch3.json: 16 lint issue(s) (X2_OPTION_LIST_BIAS ×1, X48_NGRAM_VERBATIM ×1, X49 ×6, X49B ×5, other ×3)
WARN lessons-ch4.json: 10 lint issue(s) (X2_OPTION_LIST_BIAS ×2, X49 ×4, X49B ×2, other ×2)
WARN lessons-ch5.json:  8 lint issue(s) (X2_OPTION_LIST_BIAS ×2, X49 ×3, X49B ×2, other ×1)
WARN lessons-ch6.json: 13 lint issue(s) (X2_OPTION_LIST_BIAS ×2, X49 ×5, X49B ×4, other ×2)
WARN lessons-ch7.json: 12 lint issue(s) (X2_OPTION_LIST_BIAS ×3, X49 ×4, X49B ×2, other ×3)
WARN lessons-ch8.json:  8 lint issue(s) (X2_OPTION_LIST_BIAS ×1, X49 ×3, X49B ×2, other ×2)
```

**Note**: Existing lint rules do NOT detect A4 mirror patterns — all violations below are new findings not caught by current tooling.

---

## B. Violation Table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|---|----|----|------|---------|-----------|------|--------------|
| 1 | 3 | kt-ch3-l5-x4 | comprehension | "Look! The tortoise has passed him!" → opts[0]="tortoise was now ahead" **opts[1]="hare was still in lead"** correctIndex=1 | **⚠️ P0 ANSWER KEY BUG**: sentence + explanationZh both confirm opts[0] is correct, but correctIndex=1 (wrong answer rewarded) | Fix: `correctIndex: 0` | No |
| 2 | 8 | kt-ch8-l4-q9 | listen-mc | "knocks were loud, voice was soft like honey" → opts: ["quiet knock, angry voice","hard knock, mean voice","soft knock, shy voice","loud knock, sweet voice"] correctIndex=3 | **A4c + A4d** (P1): "loud knock, sweet voice" antonym-pairs with "quiet knock, angry voice" (loud/quiet, sweet/angry). All 4 options also share identical "ADJ knock, ADJ voice" structural template — learner guesses by finding the inversion | Replace opts[0] "quiet knock, angry voice" → "a light tap and then silence" to break both A4c+A4d | Yes (listen-mc) |
| 3 | 3 | kt-ch3-l4-x7 | picture-mc | "feet moved one after the other, slow and sure" → opts: ["slow and steady","fast and excited","tired and clumsy","bouncy and playful"] correctIndex=0 | **A4c** (P1): correct "slow and steady" directly antonym-pairs with "fast and excited" (slow/fast); the tortoise story's central theme IS slow vs fast, making this egregiously guessable | Replace "fast and excited" → "heavy and noisy" | No |
| 4 | 6 | kt-ch6-l5 (listen-mc) | listen-mc | "the older woman whispered cold things about the bride" → opts: ["warm and loving","cold and unkind","sleepy and bored","amazed and proud"] correctIndex=1 | **A4c** (P1): "cold and unkind" antonym-pairs with "warm and loving". Compound with R1: sentence uses "cold" metaphorically, so "warm and loving" also echoes the stimulus word | Replace "warm and loving" → "nervous and unsure" | Yes (listen-mc) |
| 5 | 4 | kt-ch4-l3 (listen-mc) | listen-mc | "had to do Camel's work too" → opts: ["shorter than usual","much longer and harder","lighter and easier","full of free time"] correctIndex=1 | **A4c** (P1): "much longer and harder" antonym-pairs with "lighter and easier" (longer/shorter, harder/easier). Other two opts also lean "lighter" direction, isolating the heavy-work key | Replace "lighter and easier" → "busier but shorter" | Yes (listen-mc) |
| 6 | 5 | kt-ch5-l5-x2 | comprehension | "The house was warm. The fire was high." → opts: ["cold and dark inside","full of people","wet and muddy","warm, fire blazing"] correctIndex=3 | **A4c** (P1): "warm, fire blazing" antonym-pairs with "cold and dark inside" (warm/cold) | Replace "cold and dark inside" → "dusty and smoky" | No |
| 7 | 5 | kt-ch5-l5-x4 | comprehension | "Her nose was long like a piece of iron. Her teeth were long too." → opts: ["young and beautiful","small and very quiet","old with a long nose","dressed all in white"] correctIndex=2 | **A4c** (P1): "old with a long nose" antonym-pairs with "young and beautiful" (old/young). The sentence also describes "long nose" → "young and beautiful" removes both features simultaneously | Replace "young and beautiful" → "small and clean" | No |
| 8 | 8 | kt-ch8-l5-x2 | comprehension | "He huffed…blew with all his might. The straw house flew apart" → opts: ["too big for wolf to blow","strong enough to hold","wolf needed many days","too weak to protect pig"] correctIndex=3 | **A4c** (P1): "too weak to protect pig" antonym-pairs with "strong enough to hold" (weak/strong) | Replace "strong enough to hold" → "made of old dry grass, not treated wood" | No |
| 9 | 3 | kt-ch3-l3-q7 | emoji-pick | "What was the weather like?" → opts: ["☀️ sunny and warm","🌧️ rainy and wet","❄️ cold and snowy","🌪️ windy storm"] correctIndex=0 | **A4c** (P1): "sunny and warm" antonym-pairs with "cold and snowy" (warm/cold). Also: question is verbatim copy of sentence (stimulus reuse). | Replace "❄️ cold and snowy" → "🌫️ foggy and grey" | No |
| 10 | 2 | kt-ch2-l3-x11 | comprehension | "big hens, loud ducks, angry old goose" → opts: ["quiet and empty","peaceful pond with flowers","covered in snow and ice","full of many loud animals"] correctIndex=3 | **A4c** (P1): "full of many loud animals" antonym-pairs with "quiet and empty" (loud/quiet, full/empty) | Replace "quiet and empty" → "mostly empty with a few sleeping birds" | No |
| 11 | 1 | kt-ch1-l3 (listen-mc) | listen-mc | "By ten, he was taller than most men" → opts: ["weak and shy","slow and small","fast and strong","sick and tired"] correctIndex=2 | **A4c** (P1): "fast and strong" antonym-pairs with "slow and small" (fast/slow, strong/small-weak); 3 distractors cluster as negative states, isolating the one positive key | Replace "slow and small" → "quiet and gentle" | Yes (listen-mc) |
| 12 | 5 | kt-ch5-l3 (listen-mc) | listen-mc | "Her legs grew heavy. Her feet hurt. Still she walked." → opts: ["fresh and fast","happy and singing","tired but pushing on","asleep on her feet"] correctIndex=2 | **A4c** (P1): "tired but pushing on" antonym-pairs with "fresh and fast" (tired/fresh). Sentence makes tiredness explicit, so binary pick | Replace "fresh and fast" → "scared and lost" | Yes (listen-mc) |
| 13 | 4 | kt-ch4-l3-ep2 | emoji-pick | "grew very tired and very, very angry" → opts: ["😂🎉 laughing and celebrating","😫😡 tired and furious","😴😌 sleepy and calm","🤔😊 thinking and happy"] correctIndex=1 | **A4c** (P1): "tired and furious" (negative) is surrounded by 3 positive/neutral opts; "laughing and celebrating" is its polar opposite, making it the obvious mirror key | Replace "😂🎉 laughing and celebrating" → "😢😟 sad and worried" — keep distractors mixed valence | No |
| 14 | 7 | kt-ch7-l3 (comprehension) | comprehension | "Yexian sat by the empty pond. Her only friend was gone" → opts: ["heartbroken","cheerful","angry at the new wife","thankful"] correctIndex=0 | **A4c** (P1): "heartbroken" antonym-pairs with "cheerful" (grief/joy). Other two are unrelated | Replace "cheerful" → "confused and unsure" | No |
| 15 | 7 | kt-ch7-l5-q8 | emoji-pick | "How did Yexian feel walking through the festival?" → opts: ["😬 small and shy","✨ proud and free","😡 angry and loud","😴 sleepy and slow"] correctIndex=1 | **A4c** (P1): "proud and free" antonym-pairs with "small and shy" (proud/shy, free/timid). The correct answer is the lone bright/positive item | Replace "😬 small and shy" → "😮 curious and a little nervous" | No |
| 16 | 4 | kt-ch4-l6 (emoji-pick) | emoji-pick | "puffed up and puffed up some more" → opts: ["📉 getting smaller","📈 growing bigger","💧 melting slowly","💨 disappearing"] correctIndex=1 | **A4c** (P1): "growing bigger and bigger" antonym-pairs with "getting smaller and smaller" (grow/shrink). Other two are also shrink-cluster | Replace "📉 getting smaller" → "🔵 turning round and blue" | No |
| 17 | 8 | kt-ch8-l7 (emoji-pick) | emoji-pick | "wolf jumped down from roof and ran fast to trees" → opts: ["😏 proud","😨 scared","😂 silly","😴 tired"] correctIndex=1 | **A4c** (P1): "scared" antonym-pairs with "proud" (fear/pride). Running away scared is the opposite of prideful victory | Replace "😏 proud" → "😠 angry" — the wolf being angry is plausible and not a mirror | No |
| 18 | 2 | kt-ch2-l4-x13 | comprehension | "For one bright day, he did not feel so alone anymore" → opts: ["one single sunny day","three long dark weeks","all through the cold winter","just a few short hours"] correctIndex=1 | **A4c** (P2): "three long dark weeks" antonym-pairs with "just a few short hours" (long/short, weeks/hours temporal axis). Less severe because opts[0] is already close to the stimulus | Replace "just a few short hours" → "two or three pleasant afternoons" | No |
| 19 | 3 | kt-ch3-l6 (listen-mc) | listen-mc | "wind pushed his long ears flat behind his head" → opts: ["slower than before","standing still","walking","faster than ever"] correctIndex=3 | **A4c** (P1): "faster than ever" antonym-pairs with "slower than before" (fast/slow); "standing still" and "walking" cluster as slow-group fillers | Replace "slower than before" → "steady and careful" | Yes (listen-mc) |
| 20 | 2 | kt-ch2-l3 (listen-mc) | listen-mc | "sharp beaks came toward him fast" → opts: ["played with him","gave him food","attacked him","sang to him"] correctIndex=2 | **A4c (mild)** (P2): 3 friendly verbs vs 1 hostile verb — "attacked" is the lone negative action surrounded by friendly mirrors. Learner picks the odd one out without comprehension | Replace one friendly opt ("sang to him") → "ignored him" to balance valence | Yes (listen-mc) |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch1–8 questions scanned (approx.) | ~340 |
| A4 violations found | 20 |
| A4a (negation mirror) | 0 |
| A4b (synonym mirror) | 0 |
| A4c (antonym-pair mirror) | 18 |
| A4d (structural clone) | 1 (+ 1 overlap with A4c on q9) |
| Grammar-mc morpho-clones (intentional, NOT violations) | 9 (correct by design) |
| **Bonus P0 answer-key bug** | **1** (kt-ch3-l5-x4, correctIndex wrong) |
| P1 violations | 17 |
| P2 violations | 3 |
| listen-mc items needing audio regen | 6 (if opts changed) |

**Distribution by chapter:**
Ch1: 2 | Ch2: 3 | Ch3: 4 | Ch4: 3 | Ch5: 3 | Ch6: 1 | Ch7: 3 | Ch8: 3

**Pattern**: A4c is the dominant failure mode (18/20 violations). A4a (negation) is absent. A4b (synonym) is absent. The antonym-pair mirror is systemic — appears in emotion items (happy/sad, proud/shy), physical description items (old/young, fast/slow), and condition items (warm/cold, strong/weak).

---

## D. Top 5 P0

### ⚠️ P0-1 — kt-ch3-l5-x4: WRONG ANSWER KEY (Critical Bug)
**Ch3 龜兔賽跑** — correctIndex=1 rewards the WRONG answer.
- Sentence: `"Look! The tortoise has passed him!" a small fox whispered.`
- opts[0]: `"the tortoise was now ahead of the hare"` ← correct meaning
- opts[1]: `"the hare was still in the lead"` ← correctIndex=1 (WRONG — this contradicts sentence)
- explanationZh confirms: "烏龜已經超過兔子了"
- **Fix**: `correctIndex: 0`

### ⚠️ P0-2 — kt-ch8-l4-q9: A4c + A4d Compound (strongest mirror)
**Ch8 三隻小豬** — wolf's knock + voice question.
- All 4 options are "ADJ knock, ADJ voice" template clones.
- opts[0]="quiet knock, angry voice" is both the structural inverse AND the antonym pair of correct opts[3]="loud knock, sweet voice"
- Test-wise learner solves in 0.5s: pick the option that isn't the mirror of anything.
- **Fix**: Replace opts[0] → "a light tap and then silence"; break the two-attribute ADJ+ADJ template in at least 2 options.

### ⚠️ P0-3 — kt-ch3-l4-x7: A4c in the theme sentence of the whole story
**Ch3 龜兔賽跑** — the tortoise-walks-slow item uses "slow/fast" antonym pair, which is the ENTIRE lesson's vocabulary contrast.
- A child who has just done the vocab lesson (where 快=fast / 慢=slow were explicitly taught) can answer without hearing the question — just pick "slow" rather than "fast".
- **Fix**: Replace "fast and excited" → "heavy and noisy".

### ⚠️ P0-4 — kt-ch6-l5 listen-mc: A4c + R1 compound
**Ch6 六天鵝** — "cold and unkind" vs "warm and loving" in a sentence that uses "cold" metaphorically.
- Violates both A4c (antonym pair) AND R1 (sentence uses "cold" → distractor "warm" echoes the contrast word from stimulus).
- **Fix**: Replace "warm and loving" → "nervous and unsure".

### ⚠️ P0-5 — kt-ch4-l3 listen-mc: A4c + 3-option valence cluster
**Ch4 駱駝駝峰** — "much longer and harder" isolated against three "easier/lighter" options.
- Options[0]="shorter than usual", opts[2]="lighter and easier", opts[3]="full of free time" all cluster as "less work" — making the heavy key trivially identifiable.
- **Fix**: Replace "lighter and easier" → "busier but shorter" (reframes without antonym).

---

## E. Narrative Voice / Pacing Improvements (3 mandatory proposals)

These are content-quality suggestions not captured by mirror-pattern lint:

### NV-1 — Ch3 kt-ch3-l5-q10 (comprehension): Cluster of 3 "they"-starting options
**Issue**: All 4 comprehension options start with "they" (flagged as X2_OPTION_LIST_BIAS). But deeper issue: all describe WHY the hare was failing, while only one describes what the fox actually noticed. The explanatory framing bleeds into the question, spoiling the observation-vs-inference distinction.
**Proposal**: Reframe 2 distractors as non-explanatory observations to preserve the comprehension sub-skill ("the hare stood up and stretched", "the fox ran onto the race path").

### NV-2 — Ch5 kt-ch5-l5-x4 (comprehension): Baba Yaga description question misses emotional register
**Issue**: "How did Baba Yaga look?" with options "young and beautiful / small and very quiet / old with a long nose / dressed all in white" feels clinical. The story voice (奶奶說故事) should carry the scariness into the comprehension options — at least one distractor should resonate with the Ghibli aesthetic.
**Proposal**: Replace "dressed all in white" (semantically neutral + not story-grounded) → "scary and dressed all in black" to embed story atmosphere into the wrong answers.

### NV-3 — Ch8 kt-ch8-l7 (emoji-pick): explanationZh too functional
**Issue**: The explanationZh for the wolf-runs-away question says "因為被燙到，他嚇壞了逃跑了" (functional plot recap). For an 8-12 child audience, the explanation misses the story-voice warmth of Grandma finishing the tale.
**Proposal**: Add a Grandma closing hook: "被燙到屁股就跑啦——以後再也不回來了！（奶奶邊說邊笑）" to maintain the storytelling voice through the lesson's final items.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Industry Research Summary

| Source | Finding | Pickup 適配 |
|--------|---------|-----------|
| Tarrant et al. (2009) *Assessment & Evaluation in Higher Education* | Antonym-pair distractors are the #2 most common non-functional distractor type (after "obvious miss"); they inflate item apparent difficulty while inflating guessing rate | ✅ 完全符合 — Ch1-8 掃描出 18 個 A4c，說明是系統性問題 |
| Rodriguez (2005) *Applied Measurement in Education* | 3 functional distractors ≈ 4 functional distractors for reliability, BUT 1 non-functional distractor (incl. antonym mirror) actively hurts discrimination by reducing effective choice count | ✅ Pickup 需要保持 3 fully functional distractors |
| ETS Part 3-4 Item Writing Guidelines (2024) | Explicitly ban "mirror-inverse options" — an option that reverses the correct answer's polarity on the same semantic axis. ETS calls this "contrast tell" | ✅ 業界 hard rule → Pickup 應在 validate-lessons.js 自動 enforce |
| Duolingo content team (2025 CALICO paper) | Uses "semantic gradient distractors" — wrong answers on the same semantic axis as correct answer but offset by degree (e.g. "a little tired" vs "very tired" vs correct "exhausted") rather than at the polar opposite | 🟡 部分適合 — good inspiration for Ch ELT content but requires content rework, not just lint |

### ARCH-REC #101 — X57_ANTONYM_PAIR_MIRROR_LINT

**Pattern**: Add antonym-pair mirror detection to `tools/validate-lessons.js`

**What it detects**: For any question with `options` + `correctIndex`, if (a) content words in the correct answer have an antonym in the curated `ANTONYM_MAP`, AND (b) that antonym appears in content words of exactly one distractor, AND (c) the other two distractors do NOT contain antonyms of the correct answer — flag as `X57_ANTONYM_PAIR_MIRROR`.

**Implementation sketch**:
```js
// In validate-lessons.js — add to existing lint pass
const ANTONYM_MAP = {
  happy: ['sad','unhappy'], fast: ['slow'], big: ['small','tiny'],
  warm: ['cold'], strong: ['weak'], old: ['young'], loud: ['quiet','silent'],
  full: ['empty'], found: ['lost'], gave: ['took'], won: ['lost'],
  brave: ['afraid','scared'], kind: ['cruel','unkind'], easy: ['hard','difficult'],
  always: ['never'], first: ['last'], best: ['worst'],
  alive: ['dead'], opened: ['closed'], helped: ['hurt'],
  // ... expand from audit findings above
};

function checkAntonymMirror(q) {
  if (!q.options || q.correctIndex == null) return [];
  const correct = contentWords(q.options[q.correctIndex]);
  const antonymMatches = q.options.filter((_, i) => i !== q.correctIndex).filter(distractor => {
    const dWords = contentWords(distractor);
    return correct.some(cw => ANTONYM_MAP[cw]?.some(ant => dWords.includes(ant)));
  });
  if (antonymMatches.length === 1) {
    return [`X57_ANTONYM_PAIR_MIRROR (correct "${q.options[q.correctIndex]}" antonym-pairs with "${antonymMatches[0]}" — binary-choice tell)`];
  }
  return [];
}
```

**Effort**: ~2 hours (add ANTONYM_MAP + checkAntonymMirror to validate-lessons.js, add to per-question lint loop)
**ROI**: HIGH — 18 violations in Ch1-8 alone (~5% of questions), systemic across all 8 chapters; automates what otherwise requires manual review

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X57_ANTONYM_PAIR_MIRROR_LINT — detect antonym-pair between correct + exactly 1 distractor | ETS 2024 guidelines + Tarrant 2009 + this cycle's 18 findings | ✅ 完全適合 — validate-lessons.js 已有同構 lint 架構，加 ANTONYM_MAP + 1 check function 即可 | Low (2h) | High (covers systemic ~5% error rate) | ✅ Recommend |
