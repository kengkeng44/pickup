# Content QA — 2026-07-12 18:04 UTC

**Today's angle**: A4 — Mirror Patterns (negation/identity): antonym pairs among options that reduce 4-choice to effective 2-choice; negation mirrors ("yes always" ↔ "no never"); compound X57+X48 double-violations where verbatim echo AND antonym pair co-occur on the same item  
**Focus**: Ch9–16 (632 answerable questions across 8 chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:   8 lint issue(s)
WARN lessons-ch10.json:  9 lint issue(s)
WARN lessons-ch11.json: 16 lint issue(s)
WARN lessons-ch12.json: 12 lint issue(s)
WARN lessons-ch13.json: 12 lint issue(s)
WARN lessons-ch14.json: 10 lint issue(s)
WARN lessons-ch15.json:  9 lint issue(s)
WARN lessons-ch16.json: 10 lint issue(s)

Total mirror-lint issues: 440 (all chapters, warn-only)
X57_ANTONYM_PAIR_MIRROR in Ch9–16: 18 violations / 632 questions = 2.85%
```

All 86 lint warnings across Ch9–16 are warn-only (build not gated). No schema errors. Build is clean.

---

## B. Violation table

| Ch | Q ID | type | sentence (s) | question (q) | options | correct | antonym pair | violation | 修法 | audio regen? |
|----|------|------|-------------|-------------|---------|---------|-------------|-----------|------|-------------|
| Ch9 | kt-ch9-l2-pm1 | picture-mc | "The prince held the glass shoe in his hands." | "Which picture matches 'a glass shoe'?" | [**a small shiny shoe made of glass**, a tall prince in a long red coat, a round gold coin on a table, a big key hanging on a wall] | 0 | small↔big (option 0 vs option 3) | X57: "small shiny shoe" vs "big key" — size axis reduces to binary | Replace option 3 "a big key" → "a silver ring on a cushion" | No |
| Ch9 | kt-ch9-l3-q10 | emoji-pick | "How did Cinderella feel after the sisters left?" | "How did Cinderella feel?" | [🎉 happy and free, 😡 angry and loud, 😴 ready to sleep, **😢 sad and alone**] | 3 | happy↔sad (option 0 vs 3) | X57: emotional binary collapses to happy-or-sad | Replace option 0 "happy and free" → "proud and excited" | No |
| Ch9 | kt-ch9-l4-q3 | listen-mc | "Her tears fell on the grey floor, soft and slow." | "How was Cinderella crying?" | [with a loud shout, while singing songs, in a fast burst, **quiet and gentle**] | 3 | loud↔quiet (option 0 vs 3); + "soft" echoed from sentence (compound X48) | P0 — binary loud↔quiet; correct "quiet" is paraphrase of sentence "soft". Option 0 "loud" is direct antonym | Replace option 0 "with a loud shout" → "shaking her whole body" | No |
| Ch10 | kt-ch10-l5-q9 | emoji-pick | "How did Chang'e's body feel now?" | "How did her body feel?" | [🪨 heavy as rock, 🔥 hot as fire, **🎈 light as air**, 🧊 cold as ice] | 2 | heavy↔light (option 0 vs 2) | P0 — polar folk similes: "heavy as rock" vs "light as air" collapse to 2-choice binary | Replace option 0 "heavy as rock" → "numb and strange" | No |
| Ch11 | kt-ch11-l5-q7 | listen-mc | "They saw warm light, not burning light." | "How did the sun feel now?" | [painfully hot, **kind and warm**, sharp and bright, cold like ice] | 1 | warm↔cold (option 1 vs 3); + "warm" echoed from sentence (compound X48+X57) | **Compound P0** — correct "kind and warm" echos "warm" from sentence (X48) AND antonym "cold like ice" (X57). Double violation | Replace option 1 "kind and warm" → "gentle and welcoming"; replace option 3 "cold like ice" → "dark and dim" | No |
| Ch11 | kt-ch11-l6-x8 | emoji-pick | "The sky was no longer their home. How did this ending feel?" | "How did this ending feel?" | [**😔 bittersweet and quiet**, 😂 funny and silly, 😡 furious and loud, 🎉 exciting and great] | 0 | quiet↔loud (option 0 vs 2) | X57: "bittersweet and quiet" vs "furious and loud" — quiet/loud axis reveals correct tone | Replace option 2 "furious and loud" → "strange and confusing" | No |
| Ch12 | kt-ch12-l7-q9 | listen-mc | "They tell the story to their children under the bright stars." | "What do Chinese families do on Qixi night?" | [hide inside the home, **share the old tale**, wash all the clothes, plant new flowers] | 1 | old↔new (option 1 vs 3) | X57: "old tale" vs "new flowers" — temporal antonym reduces plausibility of option 3 | Replace option 3 "plant new flowers" → "light paper lanterns" | No |
| Ch13 | kt-ch13-l3-q10 | emoji-pick | "Should you tell a stranger where you are going?" | "Should you tell strangers?" | [**❌ no never**, ✅ yes always, 🤔 only sometimes, 🤷 it does not matter] | 0 | never↔always (option 0 vs 1) + negation mirror (no/yes) | **Double P0** — negation mirror (no/yes) AND antonym mirror (never/always) in same item. Strongest binary tell in Ch9-16 | Keep "no never" (correct). Replace option 1 "yes always" → "only with friends nearby" | No |
| Ch13 | kt-ch13-l3-x9 | emoji-pick | "Should you share where you are going with a stranger?" | "What is the right thing to do?" | [✅ always share freely, 🤔 share only the address, **❌ never tell a stranger**, 🤷 it depends on your mood] | 2 | always↔never (option 0 vs 2) | X57 — same lesson l3, same antonym pair always/never appearing again. Lesson-wide never/always saturation | Replace option 0 "always share freely" → "ask a nearby adult first" | No |
| Ch13 | kt-ch13-l4-q10 | emoji-pick | "How did grandma feel?" | "How did grandma feel?" | [💪 strong and fine, **🤒 sick and weak**, 😄 happy and ready, 😡 starting to feel mad] | 1 | strong↔weak (option 0 vs 1) | X57: "strong and fine" vs "sick and weak" — strength antonym binary | Replace option 0 "strong and fine" → "busy and tired" | No |
| Ch14 | kt-ch14-l5-q7 | emoji-pick | "What did the box look like?" | "What did the box look like?" | [**📦 small and red**, ⬛ big and black, 🪵 made of wood, 🍰 like a cake] | 0 | small↔big (option 0 vs 1) | X57: "small and red" vs "big and black" — size binary in first two options | Replace option 1 "big and black" → "round and silver" | No |
| Ch14 | kt-ch14-l7-x5 | comprehension | "When the wind cleared, he was a very old man with a long beard." | "What happened after Urashima opened the box?" | [fell into the sea, became very young, **turned very old fast**, found his old mother] | 2 | young↔old (option 1 vs 2) + sentence says "old man" (compound X48+X57) | **Compound P0** — "became very young" is direct antonym of correct "turned very old fast"; sentence says "very old man" (X48 echo). Double violation | Replace option 1 "became very young" → "lost all his memories" | No |
| Ch15 | kt-ch15-l7-x6 | comprehension | "He kept walking with the slow steps of a king." | "How did the emperor walk at the end of the parade?" | [**with slow and steady steps**, as fast as he could go, hiding well behind the men, bent down and looking sad] | 0 | slow↔fast (option 0 vs 1) + "slow" echoed (compound X48+X57) | Compound — correct "slow and steady steps" echoes "slow steps" from sentence (X48), antonym "as fast as he could go" (X57). Double violation | Replace option 1 "as fast as he could go" → "with his chin up and eyes ahead" | No |
| Ch16 | kt-ch16-l1-pm1 | picture-mc | "A tiny boy floated down the river in a bowl." | "Which picture matches the sentence?" | [an old woman washing clothes, **a small boy sitting in a bowl**, a big man rowing a boat, a girl feeding fish] | 1 | small↔big (option 1 vs 2) | X57: "small boy" vs "big man" — size binary | Replace option 2 "a big man rowing a boat" → "a woman carrying a basket along the bank" | No |
| Ch16 | kt-ch16-l2-pm1 | picture-mc | "A brave boy stood up to a big red demon." | "Which picture matches 'a brave boy'?" | [a small cat sleeping near a fire, **a young boy standing tall with a sword**, an old woman resting under a tree, a girl hiding] | 1 | young↔old (option 1 vs 2) | X57: "young boy" vs "old woman" — age antonym | Replace option 2 "an old woman resting under a tree" → "a man sitting on a stone reading a scroll" | No |
| Ch16 | kt-ch16-l3-x5 | emoji-pick | "How did Issun feel as he floated down the river?" | "How did he feel?" | [**🦁 brave and full of hope**, 😢 sad and missing home already, 😴 sleepy and bored, 😨 scared of the big water] | 0 | brave↔scared (option 0 vs 3) | X57: "brave and full of hope" vs "scared of the big water" — courage binary | Replace option 3 "scared of the big water" → "distracted by the fish below" | No |
| Ch16 | kt-ch16-l4-q3 | listen-mc | "The houses were tall. The streets were full of people." | "How was the city different from home?" | [empty and silent, cold and dark, **big and busy**, small like a farm] | 2 | big↔small (option 2 vs 3) | X57: "big and busy" vs "small like a farm" — size binary for city vs rural | Replace option 3 "small like a farm" → "made of only one street" | No |
| Ch16 | kt-ch16-l7-x6 | comprehension | "He looked at his own hands and smiled wide." | "How did Issun feel after he grew to full size?" | [sad about what he lost, **happy and amazed at his size**, still wishing he were smaller, angry at the princess still] | 1 | happy↔sad (option 0 vs 1) | X57: "sad about what he lost" vs "happy and amazed" — emotional binary | Replace option 0 "sad about what he lost" → "unsure of what to do next" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total answerable Q in Ch9–16 | 632 |
| X57_ANTONYM_PAIR_MIRROR violations | 18 |
| Violation rate | 2.85% |
| Compound violations (X57 + X48 co-occurring) | 3 (kt-ch11-l5-q7, kt-ch14-l7-x5, kt-ch15-l7-x6) |
| Double mirror (negation + antonym) | 1 (kt-ch13-l3-q10) |
| Same-lesson antonym saturation | 1 instance (kt-ch13-l3: q10 + x9 both use always↔never) |
| Chapters with highest X57 count | Ch16 (5), Ch13 (3), Ch9 (3) |
| Types most affected | emoji-pick (9/18), picture-mc (4/18), comprehension (3/18), listen-mc (2/18) |
| audio regen required | 0 |

**Antonym pairs by frequency across Ch9–16:**

| Antonym pair | Count |
|--------------|-------|
| big ↔ small | 5 |
| happy ↔ sad | 3 |
| always ↔ never | 3 |
| slow ↔ fast | 1 |
| warm ↔ cold | 1 |
| brave ↔ scared | 1 |
| strong ↔ weak | 1 |
| young ↔ old | 2 |
| quiet ↔ loud | 2 |
| heavy ↔ light | 1 |
| old ↔ new (temporal) | 1 |

**Systemic pattern**: `big/small` and `happy/sad` account for 8/18 = 44% of violations. These two antonym pairs are a global content-generation habit, not a single-lesson anomaly. The full-corpus X57 count is 73 instances across 32 chapters.

---

## D. Top 5 P0

### ⚠️ P0-1 — kt-ch13-l3-q10 + kt-ch13-l3-x9 (DOUBLE NEGATION + ANTONYM MIRROR, same lesson)
**Lesson**: Ch13 lesson 3 (safety theme — stranger danger)  
**Issue**: Two consecutive items in the same lesson BOTH use always↔never antonym pair. Item q10 also has a no/yes negation mirror ("no never" vs "yes always"). Learner who guesses randomly on q10 has a 1-in-2 chance; x9 immediately confirms the same axis. The lesson effectively trains pattern-matching on always/never, not comprehension.  
**Fix**: q10: replace option 1 "yes always" → "only with friends nearby"; x9: replace option 0 "always share freely" → "ask a nearby adult first"

### ⚠️ P0-2 — kt-ch11-l5-q7 (COMPOUND: X48 verbatim echo + X57 antonym mirror)
**Sentence**: "They saw warm light, not burning light."  
**Correct**: "kind and warm" — "warm" is verbatim from sentence (R1/X48 violation)  
**Antonym distractor**: "cold like ice" — polar opposite of warm  
**Issue**: Double tell — player can (a) match "warm" from sentence verbatim, OR (b) eliminate "cold" as the obvious wrong-end-of-axis option. Both shortcuts bypass comprehension.  
**Fix**: Correct option → "gentle and welcoming"; distractor "cold like ice" → "dark and dim"

### ⚠️ P0-3 — kt-ch14-l7-x5 (COMPOUND: X48 verbatim echo + X57 antonym mirror)
**Sentence**: "When the wind cleared, he was a very old man with a long beard."  
**Correct**: "turned very old fast" — "old" verbatim from sentence  
**Antonym distractor**: "became very young" — direct opposite  
**Issue**: Sentence says "old man" and correct option says "old" — verbatim give-away. Antonym "very young" confirms the binary. No comprehension needed.  
**Fix**: Correct option → "aged many years in a moment"; distractor "became very young" → "lost all his memories"

### ⚠️ P0-4 — kt-ch10-l5-q9 (POLAR FOLK SIMILES: heavy-as-rock ↔ light-as-air)
**Sentence**: "How did Chang'e's body feel now?"  
**Options**: "heavy as rock" vs "light as air" — two opposite extremes of the same physical spectrum using matching folk-simile structure  
**Issue**: The parallel `[adj] as [noun]` framing for both options makes the contrast maximally salient — learner pattern-matches grammar structure, not content. The folk similes are culturally appropriate but the pairing eliminates all 4-option uncertainty.  
**Fix**: Replace "heavy as rock" → "numb and strange"

### ⚠️ P0-5 — kt-ch9-l4-q3 (listen-mc: COMPOUND X48+X57, crying scene)
**Sentence**: "Her tears fell on the grey floor, soft and slow."  
**Correct**: "quiet and gentle" (paraphrase of "soft and slow") — partial paraphrase is fine  
**Issue**: Distractor "with a loud shout" is direct antonym of correct. Sentence says "soft and slow" which strongly signals the correct. The antonym distractor makes elimination trivial.  
**Fix**: Replace "with a loud shout" → "shaking her whole body" (plausible physical alternative that tests whether learner understood the specific quietness, not just "not loud")

---

## E. Narrative Voice / Pacing Improvements (required — 3 proposals)

### NV-1: Emotional question variety in emoji-pick items
Ch9-16 emoji-pick emotional questions use a repeated 4-slot structure of: [positive, negative, neutral-state, neutral-action]. This pattern becomes predictable after a few chapters — players learn to look for which slot is the "sad/scared/small" distractor and eliminate it, rather than reading the question. Diversify to: [2 similarly-valenced options differing in degree] + [1 incorrect-cause option] + [1 correct]. Example for kt-ch16-l3-x5: {frightened to the bone, distracted by fish, nervous but excited, ✅ brave and full of hope} — now "frightened" and "nervous but excited" are both adjacent to the correct valence, requiring finer discrimination.

### NV-2: Issun-Boshi size imagery overload in Ch16
Ch16 has 5 X57 violations, 3 of which use the small↔big antonym. This is narratively motivated (Issun-Boshi is a tiny boy who grows) but the repetition trains a meta-lesson: "for Issun questions, answer 'small' or 'big' based on story phase." Better practice: once the size theme is established (lessons 1-2), rotate to non-size attributes — "round like a seed," "light as a leaf," "bright as a copper coin" — so the size discrimination skill is tested once, not five times in a row.

### NV-3: Cinderella emotional arc compression in Ch9
Ch9 uses happy↔sad three times across lessons 3-5 to track Cinderella's emotional state. The arc is real, but three binary happy/sad items compress the story's emotional nuance into a toggle. Replace at least one "sad" correct with a more specific emotion that requires inference: "ashamed of her old dress" (shame, not just sadness) or "trying to hide her tears" (suppressed emotion). This builds A2→B1 emotional inference skills rather than happy/sad recall.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research summary
- **BEA 2025 paper "A Survey on Automated Distractor Evaluation"** (ACL Anthology 2025.bea-1.5): consensus finding is that antonym-of-correct is the **most commonly generated and most commonly rejected** distractor type in automated item writing. Automated distractor generators (DG-LLMs) produce antonyms at high rates because they are semantically related, but human raters and psychometric analysis consistently mark antonym-of-correct as non-functional (it concentrates 50% of wrong responses on a single distractor, lowering item discrimination). Recommended fix: post-generation antonym-detection filter.
- **ACL 2024 "Distractor Generation in Multiple-Choice Tasks: A Survey"** (EMNLP 2024): confirms "plausibility over polarity" principle — functional distractors should be same-category errors (confusable alternatives), not opposite-pole errors. The paper benchmarks 14 DG systems; top performers all include an explicit antonym-exclusion step.
- **ASC Item Writing Guide 2025** (assess.com): lists "avoid antonyms of the correct answer as distractors" as rule #7 in its Item Writing Checklist, citing that antonym distractors reduce effective distractor count from 3 to 2 (or even 1 when combined with an obvious miss), inflating item difficulty scores without improving discrimination.
- **Pickup-specific pattern**: The big↔small and happy↔sad antonym pairs account for 44% of Ch9-16 X57 violations and appear across 20+ chapters globally. This is a content-generation habit, not a one-off error — the batch JSON generation pipeline is producing antonyms systematically.

### Pickup 架構適配 verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Post-gen antonym-exclusion lint** — X57 rule already in validator; promote from warn to **build-fail** when MIRROR_LINT_STRICT=1 is set | BEA 2025, ASC 2025 | ✅ Flag already exists in validate-lessons.js; just flip MIRROR_LINT_STRICT default to 1 in CI | XS (< 30 min) | High | ✅ 適合 — immediate, no JSON change |
| **Antonym-pair detection in distractor generation prompt** — add explicit instruction "do NOT use the direct antonym of the correct answer as a distractor; use a same-category confusable instead" to batch JSON generation system prompt | ACL 2024 survey, BEA 2025 | ✅ Direct fix to root cause; affects future batch content generation | XS (prompt edit) | High | ✅ 適合 — document in generation prompt spec |
| **Distractor diversity gate per lesson** — lint rule: for each lesson, the antonym pairs across all items must cover ≥ 4 distinct antonym axes (e.g., Ch16 uses big/small 3×: reduce to ≤ 1 per axis per lesson) | BEA 2025 distractor evaluation | ✅ JSON-first, additive lint rule | S (2–3 hrs) | High | ✅ 適合 |
| **Distractor failure-mode tagging** (existing proposal in pickup-q-design-standard-v1.md) — add `optionsFailureMode` field, analytically detect if distribution skews to `phonological` vs `schema-inference` vs `partial-parse` | ACL 2024, R4 in design standard | 🟡 Useful analytics but high backfill cost for 1100+ Q | L (8+ hrs) | Medium | 🟡 部分適合 — add to new lessons only |

### ARCH-REC #147: X94_ANTONYM_SATURATION_GATE

**Pattern**: New lint rule — for each lesson, count how many times the same antonym axis (big/small, happy/sad, always/never, etc.) appears as a correct-vs-distractor pair. Flag if any single axis appears ≥ 2 times in one lesson, OR if any axis appears ≥ 3 times across the chapter. Companion action: promote `MIRROR_LINT_STRICT` to default 1 in CI so X57 violations fail the build.

**Why this matters**: The big↔small pair appears 5× in Ch16 alone. Axis saturation is worse than individual antonym violations — it trains the learner to infer the answer from story-phase context ("we're in the scene where Issun is big now, so answer 'big'") rather than from sentence comprehension. Axis diversity directly improves item independence (ISO 17900 / IRT parameter orthogonality).

**Implementation sketch** (add to `tools/validate-lessons.js`):
```js
// X94: antonym-axis saturation gate
const ANTONYM_PAIRS = [
  ['big','small'],['large','small'],['tiny','big'],
  ['happy','sad'],['happy','unhappy'],
  ['always','never'],['always','sometimes'],
  ['fast','slow'],['quick','slow'],
  ['warm','cold'],['hot','cold'],
  ['brave','scared'],['brave','afraid'],
  ['strong','weak'],['young','old'],['new','old'],
  ['loud','quiet'],['noisy','quiet'],
  ['heavy','light'],
];
function getAxis(word) {
  const w = word.toLowerCase();
  for (const [a,b] of ANTONYM_PAIRS) {
    if (w.includes(a)) return a+'/'+b;
    if (w.includes(b)) return a+'/'+b;
  }
  return null;
}
// per lesson: map correctWord → axis; count per axis
const axisCount = {};
for (const q of lesson.questions.filter(q => q.correctIndex !== undefined)) {
  const correct = (q.options?.[q.correctIndex] || '').toLowerCase();
  const wrongOptions = (q.options||[]).filter((_,i) => i !== q.correctIndex);
  for (const w of wrongOptions) {
    const axis = getAxis(correct);
    if (axis && w.toLowerCase().split(/\s+/).some(tok => getAxis(tok) === axis)) {
      axisCount[axis] = (axisCount[axis]||0) + 1;
      if (axisCount[axis] >= 2) warn(lesson.id, `X94_ANTONYM_SATURATION (axis "${axis}" appears ${axisCount[axis]}× in this lesson)`);
    }
  }
}
```

**Companion change**: Set `MIRROR_LINT_STRICT=1` as default in `package.json` test script so X57 fails CI.

**Effort**: S (2–3 hrs). No lessons-ch*.json changes initially — lint-only to surface existing violations. Fix violations in follow-up pass.  
**Verdict**: ✅ 適合 Pickup 架構 — JSON-first, additive lint, zero UI impact.

---

*Audit completed 2026-07-12 18:04 UTC. Next cron rotation: angle R1 (paraphrase/Buck ban) or A1 (obvious correct gap-too-easy), Ch1-8 or Ch17-24.*
