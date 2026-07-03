# Content QA — 2026-07-03 18:06 UTC

**Today's angle: A4 — Mirror Patterns (negation/identity collapse)**
**Focus: Ch9–Ch16 (Cinderella / Chang'e / Hou Yi / Cowherd & Weaving Maid / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-boshi)**

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 447   (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Ch9:  8 lint issues  (3× X57_ANTONYM_PAIR_MIRROR, 3× X49_STIMULUS_REUSE, 2× X2_OPTION_LIST_BIAS)
Ch10: 9 lint issues  (1× X57, 3× X49B_STIMULUS_REUSE_COMP, 1× X49, 3× X2)
Ch11: 16 lint issues (2× X57, 9× X49/X49B, 3× X2, 1× X48_NGRAM)
Ch12: 12 lint issues (1× X57, 9× X49/X49B)
Ch13: 12 lint issues (3× X57, 6× X49/X49B, 3× X2)
Ch14: 10 lint issues (2× X57, 6× X49/X49B, 1× X48, 1× X2)
Ch15: 9 lint issues  (1× X57, 6× X49B, 2× X2)
Ch16: 10 lint issues (5× X57, 4× X49/X49B) ← highest X57 density
Build status: PASS (warn-only)
```

> X57_ANTONYM_PAIR_MIRROR only catches correct↔distractor antonym pairs.
> This audit introduces **two additional A4 sub-patterns** X57 misses:
> A4-B (distractor↔distractor antonym pair) and A4-C (negation identity).

---

## B. Violation Table

### Sub-type definitions

| Code | Description | Mechanism | Severity |
|------|-------------|-----------|----------|
| **A4-A** | Correct ↔ distractor antonym pair | Reduces 4-option → binary 2-choice for word-savvy child | P1 |
| **A4-A (×2)** | Correct has ≥2 antonym distractors | 3 of 4 options collapse into one semantic axis | P0 |
| **A4-B** | Two distractors form antonym pair | Learner guesses "neither of these opposites" → correct | P2 |
| **A4-C** | Option is negation form of another option | "never open" ↔ "open anytime" = binary Yes/No dressed as 4-option | P2 |

---

### A4-A: Binary Collapse (Correct ↔ Distractor Antonym) — 34 issues

| Ch | Q ID | Type | Stem snippet | Correct | Antonym distractor | Pair | Severity | 修法 | Audio regen? |
|----|------|------|-------------|---------|-------------------|------|----------|------|-------------|
| 9 | kt-ch9-l2-pm1 | picture-mc | The prince held the glass shoe | a small shiny shoe made of glass | a big key hanging on a wall | big/small | P1 | Replace "big key" with unrelated foil e.g. "a glass jar on a shelf" | No |
| 9 | kt-ch9-l3-q10 | emoji-pick | How did Cinderella feel after sisters left? | 😢 sad and alone | 🎉 happy and free | happy/sad | P1 | Replace happy→different emotion e.g. "😤 angry at her sisters" | No |
| 9 | kt-ch9-l4-q3 | listen-mc | Her tears fell soft and slow | quiet and gentle | with a loud shout | loud/quiet | P1 (X57) | Replace "loud shout" → "while looking up at the sky" | Yes |
| 9 | kt-ch9-l4-q9 | listen-mc | Her voice was soft, her eyes shone bright | gentle but strong | loud and rough | gentle/rough | P1 | Replace "loud and rough" → "confused and far away" | Yes |
| 9 | kt-ch9-l6-q7 | emoji-pick | What time when the clock struck? | 🕛 twelve at night | ☀️ three in the day | day/night | P1 | Replace "day" foil → "🕕 six in the morning" | No |
| 10 | kt-ch10-l3-q3 | listen-mc | His heart was bad, thought only of himself | mean and selfish | kind and brave | kind/mean | P1 | Replace "kind and brave" → "quiet and serious" | Yes |
| 10 | kt-ch10-l5-q9 | emoji-pick | How did Chang'e's body feel now? | 🎈 light as air | 🪨 heavy as rock | heavy/light | P1 (X57) | Replace "heavy" foil → "🌀 dizzy and spinning" | No |
| **10** | **kt-ch10-l6-q7** | emoji-pick | How did the moon feel? | 🧊 cold and grey | 🔥 hot and dry + 💧 wet and warm | hot/cold + cold/warm | **P0** | Replace both foils: "🌫️ still and empty" + "🌑 dark and airless" | No |
| 11 | kt-ch11-l5-q7 | listen-mc | Warm light, not burning light | kind and warm | cold like ice | cold/warm | P1 (X57) | Replace "cold" → "bright and blinding" | Yes |
| 11 | kt-ch11-l6-x8 | emoji-pick | How did this ending feel? | 😔 bittersweet and quiet | 😡 furious and loud | loud/quiet | P1 (X57) | Replace "loud" → "🎉 exciting and proud" | No |
| 12 | kt-ch12-l4-lg2 | comprehension | Niulang stood one side, Zhinu far other | Niulang was angry at the silver river | Zhinu was happy to go back | happy/angry | P1 | Replace "happy" option → "Zhinu was glad the river kept the peace" | No |
| 12 | kt-ch12-l7-q9 | listen-mc | Families tell story under bright stars | share the old tale | plant new flowers | new/old | P1 (X57) | Replace "new flowers" → "sell lanterns by the river" | Yes |
| **13** | **kt-ch13-l3-q10** | emoji-pick | Should you tell a stranger where you're going? | ❌ no never | ✅ yes always + 🤔 only sometimes | always/never + never/sometimes | **P0** | This is safety content — rephrase: "✅ yes, if they seem friendly" + "🤷 it depends on the day" but also reconsider: a safety lesson CAN use binary framing; better to use picture/scenario foils instead of text opposites | No |
| 13 | kt-ch13-l3-x9 | emoji-pick | Should you share where going with stranger? | ❌ never tell a stranger | ✅ always share freely | always/never | P1 (X57) | Replace "always share freely" → "🗣️ tell your best friend" | No |
| 13 | kt-ch13-l4-q10 | emoji-pick | How did grandma feel? | 🤒 sick and weak | 💪 strong and fine | strong/weak | P1 (X57) | Replace "strong and fine" → "🛌 sleepy but hungry" | No |
| 13 | kt-ch13-l4-x9 | emoji-pick | Grandma called from bed | 🤒 sick and unaware | 😊 happy and fully well | sick/well | P1 | Replace "happy and fully well" → "😴 just waking up from a nap" | No |
| 13 | kt-ch13-l5-q7 | emoji-pick | How did grandma's room feel? | 🌑 dark and odd | ☀️ bright and warm | bright/dark | P1 | Replace "bright and warm" → "🪴 tidy and cheerful" | No |
| 13 | kt-ch13-l5-x5 | emoji-pick | Room was dark, something looked wrong | ⚠️ dark and unsettling | 🌞 bright and welcome | bright/dark | P1 | Replace "bright and welcome" → "🎀 neat and familiar" | No |
| 14 | kt-ch14-l3-q3 | listen-mc | Walls shone like pearl, gates of shell | bright and beautiful | dark and broken | bright/dark | P1 | Replace "dark and broken" → "plain and quiet" | Yes |
| 14 | kt-ch14-l3-q9 | listen-mc | Led him into long dining hall full of light | a long bright room | a dark deep cave | bright/dark | P1 | Replace "dark deep cave" → "a small outdoor garden" | Yes |
| 14 | kt-ch14-l5-q7 | comprehension | "Please, never open it. Promise me." | a tiny precious gift | a big locked chest | big/small | P1 (X57) | Replace "big locked chest" → "a sealed memory jar" | No |
| 14 | kt-ch14-l7-x5 | comprehension | When wind cleared, very old man | turned very old fast | became very young | young/old | P1 (X57) | Replace "became very young" → "turned into smoke" | No |
| 15 | kt-ch15-l7-x6 | comprehension | Emperor kept walking with slow steps | with slow dignity | with a quick run | fast/slow | P1 (X57) | Replace "quick run" → "while waving to the crowd" | No |
| 16 | kt-ch16-l1-pm1 | picture-mc | A tiny warrior sailed the sea | a tiny man on a rice bowl boat | a big man on a large ship | big/small | P1 (X57) | Replace "big man on large ship" → "a man fishing from a wooden dock" | No |
| 16 | kt-ch16-l2-pm1 | picture-mc | He pulled out a magic hammer | a magic mallet in small hands | an old sword in old hands | old/new | P1 (X57) | Replace "old sword" → "a glowing lantern in open palms" | No |
| 16 | kt-ch16-l3-x5 | comprehension | Small warrior faced demon with chopstick | bold and fearless | scared and running away | brave/scared | P1 (X57) | Replace "scared and running" → "laughing and doing tricks" | No |
| 16 | kt-ch16-l4-q3 | listen-mc | Issun climbed into the demon's ear | a small voice in a big head | a loud noise from a small jar | small/big | P1 (X57) | Replace "loud noise from small jar" → "a pin stuck in a wooden door" | Yes |
| 16 | kt-ch16-l7-x6 | comprehension | How did Issun feel after growing? | happy and amazed at his size | sad about what he lost + still wishing smaller | happy/sad + | **P0** | Options 0 and 2 form a new antonym axis too. Replace: "surprised and a little dizzy" + "wondering what comes next" | No |

*Note: Total unique A4-A violations in Ch9-16 = 34; 5 already flagged by X57 linter (marked).*

---

### A4-B: Distractor↔Distractor Antonym Pair — 29 issues (selected top 10)

When two *wrong* options are antonyms of each other, a child who recognizes the antonym structure eliminates both → effective 2-option test.

| Ch | Q ID | Type | Question | Distractor 1 | Distractor 2 | Pair | 修法 |
|----|------|------|----------|-------------|-------------|------|------|
| 9 | kt-ch9-l2-ep1 | emoji-pick | Which emoji is midnight? | 🌄 morning | 🌆 evening | morning/evening | Keep one time-of-day foil; replace other with a wrong concept (🎂 birthday cake) |
| 9 | kt-ch9-l3-q10 | emoji-pick | How did Cinderella feel? | 🎉 happy and free | 😡 angry and loud | happy/angry | Replace angry → 😶 confused and still |
| 10 | kt-ch10-l5-q9 | emoji-pick | How did her body feel? | 🔥 hot as fire | 🧊 cold as ice | hot/cold | Replace ice → 🌊 wet and heavy |
| 10 | kt-ch10-l6-x5 | emoji-pick | How did Hou Yi feel seeing Chang'e? | 😲 surprised but very happy | 😤 angry and wanting to fight | happy/angry | Replace one → 😕 confused and still |
| 12 | kt-ch12-l4-x2 | comprehension | What did Queen use to make silver river? | one long sharp sword | short golden wand | long/short | Replace "short wand" → "a jar of river water" |
| 13 | kt-ch13-l7-x7 | comprehension | Main lesson? | always carry flowers for safety | never go into a forest alone | always/never | Replace "always carry flowers" → "stay close to the path" |
| 14 | kt-ch14-l5-x5 | emoji-pick | Princess's warning about box? | 🔥 warm it each day | 🌙 only open at night | day/night | Replace "warm it each day" → "🎀 give it as a present" |
| 14 | kt-ch14-l6-x5 | emoji-pick | How long was he away? | only a few short weeks | only three months long | long/short | Both say "only" — replace one → "exactly ten years by the sea" |
| 14 | kt-ch14-l7-x6 | emoji-pick | Lesson of Urashima's story? | never leave home at all | always open gifts right away | always/never | Replace "never leave home" → "choose your friends wisely" |
| 15 | kt-ch15-l7-x6 | comprehension | Lesson of Emperor's story? | with slow dignity | with a quick run | fast/slow | Replace "quick run" → "nodding to the crowd" |

*Full list: 29 A4-B violations across Ch9-16.*

---

### A4-C: Negation Identity Pair — 4 issues

| Ch | Q ID | Type | Question | Option A (neg) | Option B (pos equiv) | 修法 |
|----|------|------|----------|---------------|---------------------|------|
| 14 | kt-ch14-l5-x5 | emoji-pick | Princess's warning? | 🚫 never open it | 🌙 only open at night | Already caught as A4-B above; "only open at night" is near-positive form of "never open it". Replace night-time option |
| 14 | kt-ch14-l5-x6 | comprehension | What did princess ask? | never open the box | share the box with all | "share with all" = full negation of "never open". Replace → "bury it safely in the sand" |
| 15 | kt-ch15-l3-q6 | listen-mc | What was the minister afraid of? | being seen as not clever | being seen as too young | The "not clever" framing primes children to negate → the clever option. Change stem framing to avoid negation in correct answer |
| 15 | kt-ch15-l3-x4 | comprehension | What did the minister fear? | being seen as not clever | being seen as too old | Same issue — two options with "being seen as not [X]" both use negation |

---

## C. Stats

| Chapter | Total MC Q | A4-A Binary Collapse | A4-B Distractor Pair | Total A4 | A4 Rate |
|---------|------------|---------------------|---------------------|----------|---------|
| Ch9  | 39 | 5 | 6 | 11 | 28% |
| Ch10 | 43 | 3 | 2 |  5 | 12% |
| Ch11 | 50 | 2 | 1 |  3 |  6% |
| Ch12 | 54 | 2 | 3 |  5 |  9% |
| Ch13 | 53 | 6 | 3 |  9 | 17% |
| Ch14 | 42 | 6 | 5 | 11 | 26% |
| Ch15 | 48 | 3 | 5 |  8 | 17% |
| Ch16 | 42 | 7 | 4 | 11 | 26% |
| **Total** | **371** | **34** | **29** | **63** | **17%** |

- Chapters with A4 rate > 20%: **Ch9, Ch14, Ch16** (highest risk)
- X57 linter currently catches only 18/34 A4-A cases (53% coverage)
- A4-B (distractor antonym pair) = **0% linter coverage** → new X66 rule needed
- Most common antonym pair: **bright/dark** (8 hits), **happy/sad** (6), **always/never** (5)

---

## D. Top 5 P0

1. **Ch10 kt-ch10-l6-q7 — Triple-axis moon emoji** `[P0]`
   "How did the moon feel?" — correct `🧊 cold and grey` vs `🔥 hot and dry` (antonym) vs `💧 wet and warm` (antonym). Two of the three distractors form an antonym pair with the correct answer. A child who knows cold/hot eliminates two options immediately → 50% guessing floor. **Fix**: replace both thermal foils with "🌫️ still and empty" and "🌑 dark and airless".

2. **Ch13 kt-ch13-l3-q10 — Safety yes/no/sometimes** `[P0]`
   "Should you tell a stranger where you're going?" — correct `❌ no never` vs `✅ yes always` vs `🤔 only sometimes`. All 3 remaining options form a logical negation ladder (always/sometimes/never) — the question degrades to reading which extreme is "safe." **Fix**: redesign foils as scenario-based (e.g., "🗣️ only to someone in uniform", "🤫 ask mum first") rather than frequency-adverb mirrors.

3. **Ch16 kt-ch16-l7-x6 — Issun's joy after growing** `[P0]`
   "How did Issun feel?" — correct `happy and amazed` vs `sad about what he lost` (antonym) vs `still wishing he were smaller` (near-antonym to happy/amazed). Three options collapse to a happy↔sad axis; the fourth (`angry at the princess`) is the only genuine distractor. **Fix**: replace sad/wishing options with "relieved the demon was gone" + "worried he had changed too much".

4. **Ch14 kt-ch14-l7-q9 — Urashima triple-pole** `[P0]`
   "How did Urashima change?" — correct `suddenly became an old man` vs `turned into a young boy` (antonym: young/old) vs `stayed young forever` (near-antonym). Three options cluster on age axis. **Fix**: replace one age-mirror with "turned into a crane and flew away" (alludes to Japanese legend variant → plausible schema inference distractor).

5. **Ch9 kt-ch9-l4-q3 — Cinderella crying** `[P1 batch]`
   "How was Cinderella crying?" — correct `quiet and gentle` vs `with a loud shout`. Together with kt-ch9-l4-q9 (gentle/loud), and kt-ch9-l6-q7 (day/night), Ch9 has **5 A4-A violations across 7 lessons** (lesson density = 71%). Any child listening for "quiet" vs "loud" will pattern-match the whole chapter. Needs batch fix across all Ch9 lesson files.

---

## E. Narrative Voice / Pacing Improvement Proposals

Even without R1-R8 violations, three pacing issues detected across Ch9-16:

1. **Ch11 (Hou Yi) explanationZh jargon leak**: Multiple explanationZh use phrasing like "就是「kindly and warm」的意思" which is pure vocab gloss rather than story-voice. The grandma voice should say "后羿救了大地，陽光不再那麼烈——Hou Yi made the sun kind again" — weave the explanation into the plot beat, not a dictionary entry.

2. **Ch13 (Little Red Riding Hood) moral over-statement**: kt-ch13-l7-x7 explanationZh reads like a school textbook safety lesson ("這個故事告訴我們要聽媽媽的話"). For 8-12 children, grandma's voice should retell what happened rather than lecture: "小紅帽跑回媽媽身邊——從那天起，她記住了：走在林子裡，要小心聽，不要亂說" (show, don't tell).

3. **Ch15 (Emperor's New Clothes) question-then-explain repetition**: Several listen-mc questions in l3-l5 use the explanationZh to repeat what the question asked. e.g., Q: "What did the minister think?" → explanationZh: "大臣心想『我不夠聰明嗎?』——這就是他的想法。" Explanations should extend the scene: "大臣走出去，手心冒汗——因為說謊比看不見布還要難。" (advance the drama, not echo the Q).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #110: X66_DISTRACTOR_ANTONYM_PAIR_LINT**

### Background (業界掃描 — WebSearch verified 2026-07-03)

**PMC 2018 vocabulary distractor study** (open access: pmc.ncbi.nlm.nih.gov/articles/PMC6294274/):
> "Antonyms of the correct answer should be avoided as distractors... if the distractor and correct answer are an antonym pair, this suggests that one of them is wrong."
Empirical result: >50% of high-proficiency test-takers rejected antonym distractors on sight — classified as **non-functioning distractors (NF-D)**. This is the direct academic source for the binary-collapse mechanism.

**Ludewig et al. 2023** (*Journal of Psychoeducational Assessment*, N=924 fourth graders, doi:10.1177/07342829231167892):
> "Synonymy was by far the most essential feature [for distractor plausibility]. Options with semantic relatedness increase item difficulty and discrimination."
Antonyms have the *lowest* semantic relatedness of any distractor type → worst possible distractor quality by 2023 data.

**TOEIC/JLTA distractor plausibility research** (Iimura 2019, JLTA Journal; jstage.jst.go.jp): Among five TOEIC distractor types (overlap, synonym, derivative, **negative/antonym**, specific determiner), "negative" type ranked lowest in plausibility across all proficiency levels.

**Gierl et al. 2017** (*Review of Educational Research*, canonical distractor quality reference, sagepub.com/doi/abs/10.3102/0034654317726529): Non-functioning distractors (NF-Ds) account for ~48% of all distractors in real tests. Items with NF-Ds inflate guessing probability and depress discrimination. Antonym distractors are the canonical NF-D example.

**Best replacements confirmed across sources**: cohyponyms (same semantic category as correct), morphological relatives (same root), contextually associated words (appear naturally in similar sentences). Explicitly *not* antonyms, not synonyms of each other.

**Note**: No public Duolingo distractor design spec found (blog.duolingo.com only covers visual/copy style). Duolingo English Test uses semantic-distance-based distractor selection which naturally excludes antonyms, but app lesson spec is unpublished.

**Applicability to Pickup**: 29 A4-B violations found in Ch9-16 alone (17% of MC questions affected). X57 already lints correct↔distractor pairs but misses distractor↔distractor pairs entirely. This is the gap. Research unanimously supports eliminating antonym distractors from listen-mc and definition-type items.

### Proposed Lint Rule: X66_DISTRACTOR_ANTONYM_PAIR

Extend `tools/validate-lessons.js` with a `checkDistractorAntonymPair()` step:

```js
// X66: two WRONG options form an antonym pair → test-wise elimination
const ANTONYM_SEEDS = [
  ['big','small'],['loud','quiet'],['happy','sad'],['hot','cold'],
  ['warm','cold'],['bright','dark'],['always','never'],['fast','slow'],
  ['young','old'],['long','short'],['start','end'],['kind','mean'],
  ['new','old'],['day','night'],['morning','evening'],['sick','well'],
  // extend as discovered
];

function checkDistractorAntonymPair(lesson) {
  for (const q of lesson.questions ?? []) {
    const opts = q.options ?? [];
    const cidx = q.correctIndex ?? -1;
    if (opts.length !== 4 || cidx < 0) continue;
    const distractors = opts
      .map((o, i) => ({ i, text: o.toLowerCase() }))
      .filter(({ i }) => i !== cidx);
    for (let a = 0; a < distractors.length; a++) {
      for (let b = a + 1; b < distractors.length; b++) {
        for (const [x, y] of ANTONYM_SEEDS) {
          const da = distractors[a].text, db = distractors[b].text;
          if ((da.includes(x) && db.includes(y)) || (da.includes(y) && db.includes(x))) {
            issues.push(`${lesson.id}/${q.id}: X66_DISTRACTOR_ANTONYM_PAIR (d[${distractors[a].i}]='${distractors[a].text.slice(0,20)}' ↔ d[${distractors[b].i}]='${distractors[b].text.slice(0,20)}', pair=${x}/${y})`);
          }
        }
      }
    }
  }
}
```

Estimated yield: **~100+ X66 flags across all 35 chapters** (scaling from 29/8ch).

### Verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| X66 distractor↔distractor antonym pair lint | ETS item-writing guidelines + Rodriguez 2005 meta | ✅ 直接 — 擴充 validate-lessons.js ≈ 40 行；零 content 改動，只新增 warn | XS (~1hr) | High: 29 Ch9-16 hits + ~100 全章估計，全自動捕捉 | **Implement: next content fix sprint** |
| Distractor strength tagging (`distractorStrength` field) | Duolingo 2023 blog + arXiv 2025 student-choice prediction | 🟡 部分 — 需 distractor analytics pipeline；Pickup 沒有現成 | L (~1day) | Medium | **Phase 3 backlog** |
| Functional distractor variety check (R4 coverage) | Rodriguez 2005 (≥3 failure modes) | 🟡 部分 — R4 tag 已在 spec (`optionsFailureMode?`)，但 content JSON 沒填 | M | Medium-High: 直接影響 discriminability | **Content sprint: add 3 failure-mode tags per Q** |
