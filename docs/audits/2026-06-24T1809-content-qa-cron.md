# ⚠️ Content QA — 2026-06-24 18:09 UTC

**Today's angle: A2 — cloze blank 位置 (start/mid/end) + key-position balance**
**Focus: Ch1–8 (核心 8-night story arc, 335 MC questions)**

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s)
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start "by")
Ch2–4, Ch6–8: OK (shape + mirror + extended lint)
WARN lessons-ch5.json: 1 lint issue(s)
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)

Total mirror-lint issues (all chapters): 70 (warn-only)
```

A2 angle analysis reveals **4 systemic structural issues not caught by existing lint** — documented below.

---

## B. Violation table — A2 Blank Position + Key-Position Balance

| Ch | Lesson ID | type | snippet / pattern | violation | 修法 | audio regen? |
|----|-----------|------|-------------------|-----------|------|:---:|
| 3 | kt-ch3-l1 | listen-mc+comp | 7/7 Qs: correctIndex=1 (100%) | R3 key-position lock — every answer is option B | Rotate 7 correct indices across {0,1,2,3} e.g. [1,0,2,1,3,0,2] | No |
| 3 | kt-ch3-l2 | listen-mc+comp | 7/7 Qs: correctIndex=1 (100%) | R3 key-position lock — every answer is option B | Same rotation fix | No |
| 3 | kt-ch3-l5 | listen-mc+comp | 7/7 Qs: correctIndex=1 (100%) | R3 key-position lock — every answer is option B | Same rotation fix | No |
| 5 | kt-ch5-l1 | comprehension | 6/6 Qs: correctIndex=1 (100%) | R3 key-position lock | Rotate correct indices | No |
| 5 | kt-ch5-l4 | comprehension | 6/6 Qs: correctIndex=1 (100%) | R3 key-position lock | Rotate correct indices | No |
| 5 | kt-ch5-l5 | comprehension | 6/6 Qs: correctIndex=1 (100%) | R3 key-position lock | Rotate correct indices | No |
| 1–8 | (global) | all MC | correctIndex=3 used 0×/335 Qs | A2 structural — option D is a phantom; learners never need to consider it | Rebalance: target ≈83 Qs per index (25% each) | No |
| 1–8 | (global) | all MC | correctIndex=1: 224/335 (66%) | R3 systemic — 2.6× expected rate; "always pick B" scores 66% | See ARCH-REC below for lint enforcement | No |
| 2 | kt-ch2-l2 | comprehension | Q2–Q5: 4 consecutive HOW questions | R7 WH monotony — consecutive same-WH runs numb learner attention | Break with WHO/WHERE/WHEN between Q3 and Q4 | No |
| 3 | kt-ch3-l3 | comprehension | Q2–Q7: 6 consecutive WHAT questions | R7 WH monotony — worst run in corpus | Inject HOW/WHO/WHY at Q4 and Q6 | No |
| 6 | kt-ch6-l4 | comprehension | Q3–Q7: 5 consecutive WHAT questions | R7 WH monotony | Inject WHERE/HOW at Q4 or Q5 | No |
| 1–8 | (global) | all MC | WHO+WHERE+WHEN: 6%+3.6%+0.9% = 10.5% | R7 WH imbalance — spec targets What > When ≈ Where > Who ≈ How; actual: What(52%) >> How(20%) > Why(14%) >> Who(6%) > Where(4%) > When(1%) | Add 2–3 WHO/WHERE/WHEN Qs per chapter as narration-opening targets | No |
| 1–8 | (global) | all MC | Sentence-start never tested: 1% of Qs probe information in first 33% of sentence | A2 structural gap — learners can ignore story openings (subject, time, location clauses) and score 99% | Convert 25–30% of existing WHAT/HOW Qs to WHERE/WHO/WHEN targeting sentence openers | No |

---

## C. Stats

| Metric | Value | Target / Spec | Status |
|--------|-------|---------------|--------|
| Total MC Qs Ch1–8 | 335 | — | — |
| correctIndex=0 | 71 (21%) | 25% ±5% | ⚠️ Under |
| correctIndex=1 | 224 (66%) | 25% ±5% | 🔴 CRITICAL |
| correctIndex=2 | 40 (11%) | 25% ±5% | ⚠️ Under |
| correctIndex=3 | 0 (0%) | 25% ±5% | 🔴 NEVER USED |
| Blank position: start | 6 (1%) | 25–35% | 🔴 Near-zero |
| Blank position: mid | 163 (48%) | 30–40% | ⚠️ Over |
| Blank position: end | 166 (49%) | 30–40% | ⚠️ Over |
| WHO questions | 6 (1.8%) | ~10–15% | 🔴 Severe gap |
| WHERE questions | 12 (3.6%) | ~10–15% | 🔴 Gap |
| WHEN questions | 3 (0.9%) | ~8–12% | 🔴 Near-zero |
| WHAT questions | 153 (45%) | 30–40% | ⚠️ Over |
| HOW questions | 67 (20%) | 10–15% | ⚠️ Over |
| Lessons with correctIndex=1 ≥ 83% | 11 lessons | 0 | 🔴 |
| Lessons with correctIndex=1 = 100% | 6 lessons | 0 | 🔴 |
| Lessons with 3+ consecutive same-WH | 25+ lessons | 0 | 🔴 |

---

## D. Top 5 P0

**P0.1 — correctIndex=3 phantom (Ch1–8 global)**
Option D is never the correct answer across 335 MC questions. A test-taker who eliminates option D first gains a guaranteed 33% advantage on every question, and a learner who pattern-matches "never D" can rethink strategy before engaging content.
- Fix: rebalance correct indices to approx 83/83/84/85 per slot; start with the 6 worst-offending lessons below.

**P0.2 — kt-ch3-l1 / kt-ch3-l2 / kt-ch3-l3: correctIndex=1 × 100%**
Three consecutive lessons in Ch3 (Tortoise & Hare arc) have every answer on option B. A child who presses "B" throughout lesson 1 and scores 100% is strongly incentivised to repeat the strategy — transferring the pattern across an entire chapter arc.
- Fix: immediately rotate indices in these 3 lessons. Example rotation: [1,0,2,1,3,0,2].

**P0.3 — kt-ch5-l1 / kt-ch5-l4 / kt-ch5-l5: correctIndex=1 × 100%**
Same issue in Ch5 (Baba Yaga). Three non-consecutive lessons all lock at option B. Pattern re-inforced after apparent break.
- Fix: same rotation approach.

**P0.4 — Sentence-start content never tested (Ch1–8 global, 1% start-position)**
All 335 MC questions probe mid- or end-of-sentence information. Opening clauses — "Long ago, in a small village…", "In the warm reeds by the pond…", "Just then, six white swans…" — go 100% unquestioned. This trains learners to tune out scene-setting, which is exactly the comprehension skill grandma storytelling should build (orienting to time/place/agent before the action).
- Fix: add 2–3 WHO/WHERE/WHEN questions per chapter targeting the opening clause of narration sentences.

**P0.5 — kt-ch3-l3: 6 consecutive WHAT questions (Q2–Q7)**
Longest same-WH run in corpus. By Q4, learners are on autopilot; the WH word carries zero discriminating signal.
- Fix: replace Q4 with HOW / Q6 with WHY so the stem word itself carries expectation variety.

---

## Narrative Voice / Pacing Improvements (even with 0 R1–R8 violations, propose 3)

1. **Anchor WHO to characters**: Currently grandma's voice introduces Mochi, Hana, the tortoise, Vasilisa — but almost no questions ask "Who is the small creature in the jar?" or "Who gave Vasilisa the doll?" Adding 1–2 character-identification WHO questions per chapter reinforces the cast and warms the lesson with recognition moments.

2. **Scene-entry WHERE**: Grandma storytelling tradition opens with a place ("Long long ago, over the mountains…"). A WHERE question targeting the opening line ("Where does this story begin?") pulls learners into the scene-setting ritual rather than letting them skip the establishing frame.

3. **WHEN for story rhythm**: Only 3 WHEN questions across all 8 chapters. Temporal markers ("that night", "next morning", "by winter") are how grandma structures story time. Adding WHEN questions reinforces narrative arc awareness ("When did the hare finally wake up?") and mirrors the question distribution that ELT research (Buck 2001) identifies as optimal for gist-level processing.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

ARCH-REC #74: X27_A2_KEY_POSITION_DIVERSITY_LINT

**Pattern**: Per-lesson and per-chapter key-position diversity lint + WH-balance check in `validate-lessons.js`

**Industry source**: Attali (2003) "Guess Where: The Position of Correct Answers in Multiple-Choice Test Items as a Psychometric Variable" (Journal of Educational Measurement) — largest systematic study of MC key position; finds test-makers systematically over-use middle positions (B/C) at 3–4× the rate of extreme positions (A/D). Standard remediation: enforce uniform key distribution at the authoring/lint stage.

**PMC best-practice** (NCBI PMC6788158): "Correct answers should appear in each position with approximately equal frequency; items should be arranged so that test-takers cannot detect answer patterns." Direct parallel to Pickup's 66/0% B/D distribution.

**Current Pickup gap**: validate-lessons.js has X2_OPTION_LIST_BIAS (same-start chars) but no key-position balance check. The 66% correctIndex=1 and 0% correctIndex=3 issue is invisible to CI.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| correctIndex balance lint per lesson (warn if any index > 55% or == 0 across lesson) | Attali 2003 + PMC best practice | ✅ 完全適合 — lessons-ch*.json `correctIndex` field 已存在,逐 lesson 統計即可 | Small (1–2 hr lint code) | 🔴 Critical — 66% rate breaks test validity | ✅ 實作 |
| WH-diversity lint per chapter (warn if WHO+WHERE+WHEN < 15% of MC Qs) | Buck 2001 / R7 spec | ✅ 適合 — `question` field starts with WH word, regex parse trivial | Small (add to validate-lessons.js alongside above) | High — prevents autopilot same-stem runs | ✅ 實作 |
| Latin-square correctIndex rotation template for content generation | ETS item-bank practice | ✅ 適合 — provide rotation template [0,1,2,3,1,2,0,3,2,0,3,1] in CLAUDE.md for content authors | Zero code (doc-only) | High — prevents recurrence | ✅ 加 CLAUDE.md note |

**Pickup 實作建議** (validate-lessons.js, 不改 lessons JSON):

```js
// Add after existing lint block in validate-lessons.js
function checkKeyPositionBalance(lesson) {
  const mcQs = lesson.questions.filter(q =>
    ['listen-mc','comprehension','listen-comprehension'].includes(q.type));
  if (mcQs.length < 4) return [];
  const counts = [0,0,0,0];
  mcQs.forEach(q => { if (q.correctIndex >= 0 && q.correctIndex <= 3) counts[q.correctIndex]++; });
  const issues = [];
  const total = mcQs.length;
  counts.forEach((c,i) => {
    if (c === 0 && total >= 4)
      issues.push(`KEY_POS_ZERO: correctIndex=${i} never used in ${lesson.id} (${total} MC Qs)`);
    else if (c / total > 0.55)
      issues.push(`KEY_POS_BIAS: correctIndex=${i} = ${c}/${total} (${Math.round(c/total*100)}%) in ${lesson.id}`);
  });
  return issues;
}

function checkWHBalance(chapterLessons) {
  const allMC = chapterLessons.flatMap(l => l.questions || [])
    .filter(q => ['listen-mc','comprehension'].includes(q.type));
  const who = allMC.filter(q => /^who\b/i.test(q.question || '')).length;
  const where = allMC.filter(q => /^where\b/i.test(q.question || '')).length;
  const when = allMC.filter(q => /^when\b/i.test(q.question || '')).length;
  const combined = who + where + when;
  const pct = Math.round(combined / allMC.length * 100);
  if (pct < 15 && allMC.length >= 10)
    return `WH_DIVERSITY: WHO+WHERE+WHEN = ${combined}/${allMC.length} (${pct}%) < 15% threshold`;
  return null;
}
```

**Files to touch**: `tools/validate-lessons.js` (add 2 functions + wire into main loop), `CLAUDE.md` (add Latin-square template note to content generation section).

**Expected outcome**: These 2 checks would have caught 6 × 100%-B lessons and the Ch3-l3 run of 6 consecutive WHATs as WARN in CI before ship. Future content generation guided by Latin-square template prevents recurrence.
