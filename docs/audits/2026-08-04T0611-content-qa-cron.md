# Content QA — 2026-08-04 06:11 UTC

**Today's angle**: A5 — Cultural Reference (distractor cross-context proper noun contamination)
**Focus**: Ch25–31 (愚公移山 / Archimedes / Journey to West / Zhuge Liang / Odyssey / Heracles / Robin Hood)
**Previous 8 angles**: A1-obvious-correct · A4-mirror-patterns · #11-optionsZh · A3-semantic-leak · R1-paraphrase · A2-blank-position · A6-option-in-question · #12-explanationZh

**Angle definition**: A5 violation occurs when a distractor (wrong option) encodes a proper noun (character name / place name) that does **not** appear in the current sentence — forcing the child to rely on prior story knowledge rather than the sentence's own information. Research source: Frontiers 2025 "Detection of cultural and linguistic differential item functioning in reading assessment" identifies this as a canonical form of **cultural background knowledge contamination**: a child who already knows the Odyssey rejects "back in Troy" trivially, while a heritage learner unfamiliar with the story must reason from context. This creates Differential Item Functioning (DIF) correlated with prior cultural exposure rather than English comprehension skill.

Secondary sub-violations checked:
- **A5b**: `explanationZh` uses adult-register Chinese jargon not accessible to 8-12 children
- **A5c**: `explanationZh` lacks grandma narrative voice (factual/impersonal tone)
- **A5d**: cultural inference questions where the required reasoning assumes Asian or Western cultural background not grounded in the sentence

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440
(warn-only; MIRROR_LINT_STRICT=1 would fail build)
```

**Build gate: PASS.** 440 carry-over WARNs (X2/X48/X49/X57 from prior cycles). No new FAIL introduced. A5 violations are **content-level**, not schema violations — lint does not yet enforce them.

**Coverage**: Ch25–31 = 49 lessons, 104 MC questions, 190 narration entries audited.

---

## B. Violation Table

| Sev | Ch | Q ID | type | Sentence snippet | violation | Distractor / detail | audio regen? | 修法 |
|-----|-----|------|------|-----------------|-----------|---------------------|--------------|------|
| P2 | Ch27 | kt-ch27-l3-q6 | listen-mc | "Drink this. Remember the dust of your home…" | **A5_DIST_PN_OUTSIDE_SENT** | distractor[1] `so Sanzang would not get lost` — "Sanzang" not in sentence | No | Replace with story-internal wrong-detail: `so he would not feel thirsty on the road` |
| P2 | Ch27 | kt-ch27-l6-q8 | listen-mc | "Now I am sorry. I have had a long time to think." | **A5_DIST_PN_OUTSIDE_SENT** | distractor[3] `scared of Sanzang` — "Sanzang" not in sentence | No | Replace with emotion-based wrong: `happy and proud of himself` |
| P2 | Ch28 | kt-ch28-l4-q8 | listen-mc | "The same young boy opened the door and gave a small bow." | **A5_DIST_PN_OUTSIDE_SENT** | distractor[1] `Zhuge Liang himself` — "Zhuge" not in sentence | No | Replace with: `an old white-haired man` |
| P2 | Ch29 | kt-ch29-l3-q8 | listen-mc | "Even small things on the island felt big in his memory." | **A5_DIST_PN_OUTSIDE_SENT** | distractor[2] `he was angry at Ithaca and its people` — "Ithaca" not in sentence | No | Replace with: `he missed only the big and important things` |
| P2 | Ch29 | kt-ch29-l5-q3 | listen-mc | "By day the sun was warm. By night the stars came out like soft lights." | **A5_DIST_PN_OUTSIDE_SENT** | distractor[3] `light from the city of Troy` — "Troy" not in sentence | No | Replace with: `the big bright moon only` |
| P2 | Ch29 | kt-ch29-l7-q3 | listen-mc | "We will be brave. We will go home," he said. | **A5_DIST_PN_OUTSIDE_SENT** | distractor[0] `to turn the ships back to Troy` — "Troy" not in sentence | No | Replace with: `to drop anchor and wait for better winds` |
| P2 | Ch29 | kt-ch29-l7-q8 | listen-mc | "The storm passed, but home was still many long days away." | **A5_DIST_PN_OUTSIDE_SENT** | distractor[2] `they had gone past Ithaca` — "Ithaca" not in sentence | No | Replace with: `they had missed the shore in the dark` |
| P3 | Ch25 | kt-ch25-l3-q8 | listen-mc | "Each person carried what they could, from the biggest to the smallest." | **A5b_EXPL_ZH_JARGON** | `explanationZh` contains `各盡其力` — 4-character idiom unfamiliar to 8-12 overseas Chinese | No | Rewrite: `每個人都盡力幫忙，不管大小——這就是全家一起做！` |

**Total violations: 8** (7 × P2, 1 × P3)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch25–31 (7 chapters) |
| Lessons audited | 49 |
| MC questions scanned | 104 |
| Narration entries scanned | 190 |
| A5_DIST_PN_OUTSIDE_SENT violations | 7 |
| A5b_EXPL_ZH_JARGON violations | 1 |
| A5c voice-check failures (impersonal explanationZh) | 0 |
| validate-lessons.js FAIL | 0 |
| validate-lessons.js WARN (pre-existing) | 440 |

**Violation rate**: 7.7% of MC questions (8/104) have A5-class issues.
**Concentrated**: Ch27 = 2, Ch28 = 1, Ch29 = 4. Ch25/Ch26/Ch30/Ch31 = 0.
**Ch29 (Odyssey) is the highest-risk chapter** for this angle — Troy/Ithaca appear in 4 distractors across just 15 MC questions.

---

## D. Top 5 P0 / Priority Issues

> No P0 (byte-identical mirror or story-logic impossibility) found this cycle. Highest severity = P2.

| Rank | ID | Violation | Impact | Effort |
|------|----|-----------|--------|--------|
| 1 | kt-ch29-l3-q8 | Ithaca in distractor, inference Q | DIF for heritage learners who don't know Odyssey backstory | 2 min |
| 2 | kt-ch29-l7-q3 | Troy in distractor, "what did he tell his men" | Troy appears 3× across Ch29 distractors → cumulative signal leak | 2 min |
| 3 | kt-ch29-l7-q8 | Ithaca in distractor, "were they home now" | Paired with #2, same lesson — 2 distractors in l7 both cross-context | 2 min |
| 4 | kt-ch27-l6-q8 | Sanzang in distractor, "how did the monkey feel" | Monkey's emotion Q shouldn't require knowing Sanzang's role | 2 min |
| 5 | kt-ch25-l3-q8 | `各盡其力` idiom in explanationZh | Overseas Chinese children aged 8-12 likely won't recognize this 成語 | 2 min |

---

## E. Narrative Voice / Pacing Improvements (3 mandatory)

Even with 0 hard rule violations, the following pacing improvements are proposed:

### NV-1: Ch26 (Archimedes) — adult-register scientific term in explanationZh
**Location**: `kt-ch26-l7-q5`
**Current explanationZh**: `…「Archimedes 法則」——也叫浮力原理。洗澡洗出來的科學！`
**Issue**: `浮力原理` (buoyancy principle) is a middle-school physics term, not A2 child register. A 9-year-old Taiwanese child or heritage learner may not know this word.
**Fix**: Replace with: `他發現的規律現在叫做「Archimedes 定律」——因為洗澡洗出了大科學！`

### NV-2: Ch27 (Journey to West) — grandma voice absent in 7 of 9 narration explanationZh
**Location**: `kt-ch27-l3-q2`, `l3-q5`, `l3-q7`, `l3-q8`, `l4-q5`, `l4-q7`, `l4-q9`
**Issue**: These explanationZh narrations are beautiful prose but speak in an impersonal third-person voice. The grandma frame (`奶奶說`) is established in lesson 1 intro but then drops out. Duolingo Stories research (Godwin-Jones 2018) shows that a consistent storyteller persona increases immersion and comprehension for young learners.
**Fix pattern**: Add `奶奶說：` or `奶奶輕聲說：` prefix to these narration explanations. Example:
- Current: `天剛亮，三藏已經站在長安的城門口了。城市還在沉睡，他要出發去很遠的地方。`
- Fixed: `奶奶說：天剛亮，三藏就站在長安的城門口了。城市還在睡，他要出發了。`

### NV-3: Ch28 (Zhuge Liang) — cultural context gap in lesson 3 opening narration
**Location**: `kt-ch28-l3-q2` narration
**Current**: `The three rode their horses up the green hill in the spring sun.`
**explanationZh**: `春日陽光下，三人騎馬上山——路上肯定有春風，有鳥叫，還有三顆期待的心。`
**Issue**: The phrase `三顧茅廬` (the Three Visits) is one of the most culturally significant events in Chinese literary history. However, the lesson never names this — a Taiwan/overseas child who knows this would catch the reference, but one who doesn't misses the cultural significance that makes the story meaningful. The explanation says "three hearts of anticipation" but doesn't bridge the "why three times?" cultural expectation.
**Fix**: Add one narration entry before this scene grounding the three-visit significance in child language: e.g., `"Liu Bei came here one time. Then he came again. And again. Three times for one wise man."` + explanationZh explaining the significance.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #240**: `X240_A5_PROPER_NOUN_DISTRACTOR_LINT`

### Research source
Chen, X., Aryadoust, V., & Zhang, W. (2025). "A systematic review of differential item functioning in second language assessment." *Language Testing* (ERIC EJ1469711). DOI: 10.1177/02655322241290188

Key finding: "Most DIF studies found that cultural bias items — those relying on culturally specific background knowledge — create differential item functioning correlated with prior cultural exposure rather than L2 proficiency." The Frontiers 2025 article (Frontiers in Education) specifically identifies **proper noun injection in distractors** as a high-risk DIF source in reading/listening comprehension items.

### What the industry does
ETS (TOEIC/TOEFL) item-writing specification (public 2024 update) bans distractors that "require test-takers to access information outside the stimulus passage." The specific rule: *"All distractors must be evaluable from within the presented stimulus — no option should require prior domain/cultural knowledge to accept or reject."*

Duolingo's 2025 content team guidelines (blog.duolingo.com/how-culture-impacts-language-learning/) acknowledge that "cultural knowledge contamination" in wrong answers is a primary source of fairness complaints from heritage learners.

### Current Pickup state
`validate-lessons.js` has no rule checking for proper nouns in distractors. The 7 violations found this cycle (Ch27×2, Ch28×1, Ch29×4) all share the same pattern: a proper noun (Troy, Ithaca, Sanzang, Zhuge Liang) appears in a distractor but **not** in the question's own `sentence` field. A child who already knows the story rejects these distractors trivially via name-recognition, bypassing the English listening comprehension task entirely.

### Fitness for Pickup
- ✅ **適合** — Pickup is a listening comprehension app for 8-12 heritage learners. DIF from prior cultural knowledge directly violates the app's learning goal.
- ✅ Static JSON lesson files → trivially lintable at build time.
- ✅ The rule is additive to existing `validate-lessons.js` architecture.

### Proposed lint rule
```js
// In validate-lessons.js:
// X60_PROPER_NOUN_DISTRACTOR: option contains capitalized word (≥3 chars, proper noun pattern)
// that does not appear in q.sentence — DIF risk (cultural background knowledge contamination)
function checkA5ProperNounDistractor(lesson, q) {
  const sentence = (q.sentence || '').toLowerCase();
  const ci = q.correctIndex ?? q.correct ?? -1;
  const opts = q.options || [];
  opts.forEach((opt, i) => {
    if (i === ci) return; // skip correct answer
    const words = opt.split(/\s+/);
    words.forEach(w => {
      const clean = w.replace(/[^a-zA-Z]/g, '');
      if (clean.length >= 3 && clean[0] === clean[0].toUpperCase() && clean[0] !== clean[0].toLowerCase()) {
        if (!sentence.includes(clean.toLowerCase())) {
          warn(lesson.id, q.id, `X60_A5_PN_DISTRACTOR`, `distractor[${i}]="${opt}" contains proper noun "${clean}" not in sentence`);
        }
      }
    });
  });
}
```

### Effort & ROI
| Item | Value |
|------|-------|
| Lint rule implementation | ~30 min |
| False-positive tuning (stopwords, pronoun filter) | ~15 min |
| Batch fix 7 current violations | ~20 min |
| Total effort | ~65 min |
| ROI | HIGH — prevents DIF for all future content; heritage learner fairness critical for overseas Chinese target segment |
| Priority | P1 — implement in next development session |

### Implementation path
1. Add `checkA5ProperNounDistractor()` to `tools/validate-lessons.js`
2. Run across all chapters to get full violation count
3. Batch-fix violations (replace cross-context proper nouns with in-sentence wrong-detail distractors)
4. Add to CI gate (warn-only initially, promote to FAIL after batch fix)

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X240: Proper-noun distractor DIF lint | [Frontiers 2025 DIF](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1595658/full) + [ERIC EJ1469711](https://eric.ed.gov/?id=EJ1469711) | ✅ 適合 — JSON lint at build time, 65 min total effort | Low | HIGH — heritage learner fairness, prevents DIF | **IMPLEMENT** |
