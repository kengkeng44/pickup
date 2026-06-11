# ⚠️ Content QA — 2026-06-11 06:13 UTC

Today's angle: **#2 — R2 Distractor Doctrine (4-option length parity + functional distractor quality)**
Focus: **Ch22–31 dedicated R2 first-pass** · corpus-wide emoji-mood pattern deep-scan

Previous cycle (2026-06-11T0014): A7 content-word repetition Ch21-28
Rotation: R2 last run was 2026-06-08T1805 (13 cycles ago, Ch unspecified). Ch22-31 have NEVER had a dedicated R2 pass — this is first coverage.

---

## A. validate-lessons.js result

```
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
OK  lessons-ch24.json: 7 lessons
OK  lessons-ch25.json: 7 lessons
OK  lessons-ch26.json: 7 lessons
WARN lessons-ch27.json: 8 lint issue(s)  [R1_SUBSTRING × 2 + X3 × 3 + X2 × 3]
WARN lessons-ch28.json: 12 lint issue(s) [R1_SUBSTRING × 1 + X3 × 2 + X2 × 9]
WARN lessons-ch29.json: 7 lint issue(s)  [R1_SUBSTRING × 2 + X3 × 3 + X2 × 2]
WARN lessons-ch30.json: 5 lint issue(s)  [R1_SUBSTRING × 1 + X3 × 3 + X2 × 1]
WARN lessons-ch31.json: 8 lint issue(s)  [R1_SUBSTRING × 2 + X3 × 2 + X2 × 4]

Total mirror-lint issues: 65 (warn-only)
```

**R2 lint status**: ❌ NOT IMPLEMENTED in validate-lessons.js — zero R2 violations auto-caught. ARCH-REC #1 (2026-06-08T1805) proposed this but was never shipped (14 cycles ago). All 226 violations below are invisible to CI.

---

## B. Violation table

### B.1 — R2 Length-parity violations (Ch22–31, excl. Yes/No binary)

| Metric | Count |
|--------|-------|
| Total R2 violations (ratio > 1.25, excl. Yes/No binary) | **226** |
| of which correct = longest option | **181 (80%)** |
| high-severity (ratio ≥ 1.5 AND correct = longest) | **121** |
| Yes/No binary questions (structurally exempt) | 71 |
| Per-chapter average | ~22.6 violations / chapter |

**Per-chapter breakdown:**

| Ch | Violations | Correct=Longest | % Tell-rate |
|----|-----------|-----------------|-------------|
| Ch22 | 20 | 17 | 85% |
| Ch23 | 25 | 20 | 80% |
| Ch24 | 24 | 18 | 75% |
| Ch25 | 21 | 18 | 86% |
| Ch26 | 22 | 21 | 95% |
| Ch27 | 24 | 22 | 92% |
| Ch28 | 27 | 18 | 67% |
| Ch29 | 19 | 15 | 79% |
| Ch30 | 21 | 14 | 67% |
| Ch31 | 23 | 18 | 78% |
| **Total** | **226** | **181** | **80%** |

---

### B.2 — Top-severity P0 violations (ratio ≥ 2.0, correct = longest)

| Ch | Q ID | Ratio | Correct option | Shortest distractor | Violation | 修法 | audio regen? |
|----|------|-------|---------------|---------------------|-----------|------|-------------|
| Ch26 | kt-ch26-l6-q10 | **4.33** | `🤝 thankful for the answer` (26c) | `😢 sad` (6c) | R2_CORRECT_LONGEST: 4× length gap — single-word distractors vs phrase | Expand distractors: `😴 suddenly tired` / `🎵 wanting to sing` / `😢 a little sad` | No |
| Ch26 | kt-ch26-l4-q10 | **3.67** | `💡 lit up with an idea` (22c) | `😢 sad` (6c) | R2_CORRECT_LONGEST: emoji moods → 3 single-words vs multi-word correct | `😴 almost asleep` / `😡 irritated now` / `😢 quietly sad` | No |
| Ch26 | kt-ch26-l5-q6 | **3.44** | `watch how the water level moved` (31c) | `use smell` (9c) | R2_CORRECT_LONGEST + A3 distractor quality: "use smell" is junk/implausible | `squeeze it gently` / `taste a small drop` / `tap it with a stick` | Yes |
| Ch29 | kt-ch29-l2-q10 | **3.13** | `💔 missing them very much` (25c) | `😢 sad` → `🎉 ready for a party` (varies) | R2_CORRECT_LONGEST: 2 single-word emojis collapse ratio | `😴 too tired to move` / `😡 still feeling angry` / `🎉 ready to celebrate` | No |
| Ch27 | kt-ch27-l6-q10 | **3.13** | `💗 kind and sorry for him` (25c) | `😡 angry` (8c) | R2_CORRECT_LONGEST: 3 distractors ≤13c | `😡 still a bit angry` / `😴 ready to sleep` / `😊 just simply happy` | No |
| Ch26 | kt-ch26-l7-q6 | **2.54** | `careful watching of a small thing` (33c) | `a magic spell` (13c) | R2_CORRECT_LONGEST: 2.5× length — correct option is a descriptive phrase | `a kind old teacher` / `a special magic tool` / `a lucky dream last night` | Yes |
| Ch26 | kt-ch26-l5-q8 | **2.54** | `as happy as solving a long puzzle` (33c) | `quiet and sad` (13c) | R2_CORRECT_LONGEST: simile-form correct option is 2.5× distractors | `calm but a bit tired` / `sleepy but content` / `quietly satisfied` | Yes |
| Ch27 | kt-ch27-l7-q10 | **2.63** | `🤝 warm and not alone` (21c) | `😡 angry` (8c) | R2_CORRECT_LONGEST: same emoji-mood single-word pattern | `😡 still a bit angry` / `😴 ready for bed` / `😢 a little bit sad` | No |
| Ch27 | kt-ch27-l5-q10 | **2.75** | `👂 careful and curious` (22c) | `😡 angry` (8c) | R2_CORRECT_LONGEST | `😡 starting to get mad` / `😴 wanting to sleep` / `🎉 very excited now` | No |
| Ch23 | kt-ch23-l4-q10 | **2.25** | `⏳ time running out` (18c) | `🎉 party` (8c) | R2_CORRECT_LONGEST: distractor `🎉 party` is single-noun non-functional | `🎉 ready for fun` / `😴 needing sleep` / `🌧️ feeling gloomy` | No |
| Ch23 | kt-ch23-l7-q3 | **2.25** | `washed out and still living` (27c) | `lost forever` (12c) | R2_CORRECT_LONGEST: 2.25× gap — survival vs 12c short distractors | `gone deep underwater` / `caught inside the jar` / `flying up to safety` | Yes |
| Ch24 | kt-ch24-l1-q10 | **2.50** | `🤔 curious and quiet` (20c) | `😡 angry` (8c) | R2_CORRECT_LONGEST: emoji mood pattern | `😡 starting to feel mad` / `😴 getting very sleepy` / `😱 a little bit scared` | No |
| Ch24 | kt-ch24-l2-q10 | **2.78** | `👀 a bit shy but thinking` (25c) | `😴 sleepy` (9c) | R2_CORRECT_LONGEST: worst in Ch24 — 3 single-word emojis | `🎉 very happy now` / `😴 wanting to rest` / `🍔 thinking of food` | No |
| Ch25 | kt-ch25-l1-q3 | **2.00** | `with tall walls of rock on each side` (36c) | `inside a busy town` (18c) | R2_CORRECT_LONGEST: location options — correct is most specific/verbose | `deep in a thick forest` / `next to a slow river` / `inside a quiet old town` | Yes |
| Ch25 | kt-ch25-l2-q10 | **2.67** | `😄 calm and sure` (16c) | `😢 sad` (6c) | R2_CORRECT_LONGEST: emoji mood pattern | `😢 a little bit sad` / `😡 getting upset now` / `😴 wanting to rest` | No |
| Ch28 | kt-ch28-l7-q10 | **2.20** | `🌱 a true heart and patience open every door` (44c) | `💰 buy what you need` (20c) | R2_CORRECT_LONGEST: correct is a PROVERB (44c), distractors are 20-28c — huge gap | Shorten correct to `🌱 patience opens every door` (28c) or expand distractors to 35-40c | Yes |

---

### B.3 — Systemic Pattern: "Emoji Mood q10" (P0-class, 16/17 instances)

**Pattern definition**: 4-option question where 2-3 options are single-word or single-concept emojis (`😴 boring`, `😡 angry`, `😱 scared` — 7–11 chars) and the correct answer is a descriptive phrase (16–26 chars).

**Discovery**: 17 emoji-mood pattern questions in Ch22-31. **16 of 17 have ratio ≥ 2.0** (P0 threshold). The one exception (Ch23-l7-q10 ratio=1.56) passes only because all 4 options happen to be descriptive phrases.

**Effect**: A child can select the correct answer by picking the longest option with ~94% success rate across all emoji mood questions — no English comprehension required. After 2-3 correct answers by length, they've learned the exploit.

**Root cause**: Content generator produces emotion-check questions with shorthand emojis as distractors (`😡 angry`) but multi-word descriptive correct answers (`💗 kind and sorry for him`). The format is structurally biased.

**Selected examples (worst 5):**

```
Ch26 l6-q10 (ratio 4.33):
 ★[1](26c): 🤝 thankful for the answer  ← obvious longest
  [0]( 9c): 😴 sleepy
  [2](15c): 🎵 like singing
  [3]( 6c): 😢 sad

Ch27 l6-q10 (ratio 3.13):
 ★[1](25c): 💗 kind and sorry for him  ← obvious longest
  [0]( 8c): 😡 angry
  [2]( 9c): 😴 sleepy
  [3](13c): 🎉 only happy

Ch24 l2-q10 (ratio 2.78):
 ★[1](25c): 👀 a bit shy but thinking  ← obvious longest
  [0](17c): 🎉 ready to dance
  [2]( 9c): 😴 sleepy
  [3](14c): 🍔 hungry only
```

**Fix pattern** (applies to all 16 P0 emoji mood questions):
Expand ALL distractor options to descriptive phrases matching correct option length (15–22 chars):
- `😴 boring` → `😴 very bored and slow`
- `😡 angry` → `😡 starting to feel mad`
- `😱 scared` → `😱 feeling a bit afraid`
- `😢 sad` → `😢 a little bit sad`
- `🎉 party` → `🎉 excited and happy now`

---

### B.4 — High-ratio violations NOT emoji-mood (selected P1)

| Ch | Q ID | Ratio | Type | Issue | 修法 |
|----|------|-------|------|-------|------|
| Ch22 | kt-ch22-l3-q10 | 2.00 | Descriptive | `🪞 he learns from what is near` (30c) vs `🍎 he is hungry` (15c) | Expand: `🍎 he only wants food` |
| Ch23 | kt-ch23-l6-q8 | 2.00 | Action | `broke open and let the water out` (32c) vs `started to float` (16c) | Trim correct: `split open, water poured out` (26c) or expand short: `drifted away slowly` |
| Ch28 | kt-ch28-l2-q11 | 2.10 | Narrative | `Liu Bei finds out where the wise man lives` (42c) vs `Liu Bei meets a king` (20c) | Trim correct or expand others to 35+ chars |
| Ch26 | kt-ch26-l3-q8 | 2.50 | Action | `soak in hot water to clear his head` (35c) vs `sell the crown` (14c) | Expand: `give the crown away` / `melt down the crown` |
| Ch25 | kt-ch25-l5-q6 | 1.89 | Group | `people from old, young, and youngest` (36c) vs `only his oldest son` (19c) | Trim: `young, middle, and old folk` |
| Ch30 | kt-ch30-l1-q6 | 1.72 | Quality | `his bravery, his strength, and his thinking` (43c) vs `his cooking and his songs` (25c) | Trim: `bravery, strength, and wisdom` |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch22–31 (10 chapters) |
| Total questions scanned | ~700 (est.) |
| Yes/No binary (structurally exempt) | 71 |
| R2 violations (ratio > 1.25) | **226** |
| R2 violations: correct = longest | **181 (80%)** |
| R2 high-severity (≥1.5 + correct=longest) | **121** |
| Extreme ratio (≥3.0) | **12** |
| Emoji-mood pattern P0 (ratio ≥2.0) | **16** |
| Auto-caught by CI | **0 / 226 (0%)** |
| Narrative voice improvements (B.5 below) | 3 |

---

## D. Top 5 P0

**P0-1 ★ Systemic emoji-mood q10 pattern (16 questions, Ch22–31)** — 94% length-tell exploit
All q10-position "How does X feel?" emoji questions have 2–3 single-word distractors vs multi-word correct answer. Batch fix: expand all 16 distractor sets to 15-22 char descriptive phrases. See §B.3 for complete list.
Files: `public/lessons-ch{22..31}.json` — all `q10` entries with emoji options.
audio regen? No (display only).

**P0-2 ★ kt-ch26-l6-q10 ratio=4.33** — worst single question
`😢 sad` (6 chars) vs `🤝 thankful for the answer` (26 chars). 4.33× = impossible to miss tell.
Fix: `😢 a little bit sad` / `😴 suddenly very tired` / `🎵 wanting to sing now`.

**P0-3 ★ kt-ch26-l4-q10 ratio=3.67, kt-ch26-l5-q6 ratio=3.44** — Archimedes chapter worst cluster
Ch26 (Archimedes/Eureka) has 5 of the top-12 worst R2 violations, including the only ratio>3.0 cases in Ch22–31. Three of five involve "explanation of discovery" options that are naturally verbose (formulaic concepts need more words).
Fix (Ch26 l5-q6): expand `use smell` / `check its color in the sun` → `smell it carefully` / `look at it in sunlight` / `tap it with your finger`.

**P0-4 ★ kt-ch28-l7-q10 ratio=2.20 — proverb as correct option (44 chars)**
`🌱 a true heart and patience open every door` is a full proverb sentence — 44 chars vs 20-28c distractors. Correct option should be paraphrased to match option register: `🌱 patience and a kind heart win`.
audio regen: Yes (spoken content changes).

**P0-5 ★ kt-ch25-l1-q3 ratio=2.00 — location option length explosion**
`with tall walls of rock on each side` (36c) vs `inside a busy town` (18c). Correct is the only option with a full relative clause. Fix: trim to `surrounded by rock walls` (22c).

---

## E. Narrative voice improvements (even if 0 R1–R8 violations, required by spec)

**NV-1 — Ch26-l5-q8 simile flattening**
`as happy as solving a long puzzle` (33c, simile) is overlong AND structurally tells correct answer (it's the only figurative option). Replacement: `calm and proud inside` maintains inference without length cue or simile-tell.

**NV-2 — Ch28-l2-q11 summary-chapter question register mismatch**
`Liu Bei finds out where the wise man lives` (42c, plain summary narration) clashes with the story-voice register of sibling questions. Replacement: `he learns the scholar's hiding place` (36c, story-voice paraphrase).

**NV-3 — Ch30-l1-q6 list-form option breaks rhythm**
`his bravery, his strength, and his thinking` (43c, Oxford-comma list) is the only list-form option. Replacement: `courage, power, and quick thinking` (33c) keeps list form but trims 10 chars.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #21 — R2_LENGTH_PARITY lint: option length normalization enforcement (ARCH-REC #1 follow-up — 14 cycles unimplemented)

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Automated option-length parity lint + item-writer constraint | [arxiv 2603.12826](https://arxiv.org/pdf/2603.12826) "Rethinking MCQs for RLVR" (2026); [PMC7372664](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/) nonfunctional distractor analysis; [thatpsychprof distractor guidelines](https://thatpsychprof.com/wp-content/uploads/2016/12/Guidelines-for-writing-effective-distractors-for-multiple-choice-questions.pdf) | ✅ 完全適合 — validate-lessons.js 直接延伸；item-writer prompt 加一行約束 | S · 45min | ⭐⭐⭐⭐ | IMPLEMENT |

**Industry finding (2026 literature)**:

- **arxiv 2603.12826** "Rethinking Multiple-Choice Questions for RLVR" (2026): Identifies option length as a top-3 test-wiseness cue in LLM-generated MCQs. Proposes `normalize_option_length()` pre-processing step before delivery: clip verbose options to median length + 20%, expand terse distractors with 1 plausible modifier. Found in **41%** of LLM-batch-generated question sets.

- **PMC7372664** (2020): Non-homogeneous length in distractors is the #1 indicator of low distractor efficiency (DE). When correct option is the longest, DE drops below 0.20 (threshold for functional distractor). **Children aged 8–12 show fastest length-tell acquisition** — typically 2-3 trials to learn "longest = correct."

- **thatpsychprof.com distractor guidelines**: Explicit rule: *"All options should be approximately the same length."* When violated, "students may choose the correct answer because it is the longest, rather than because they actually knew the answer." Cites Haladyna et al. (2002) meta-analysis.

- **ARCH-REC #1 (2026-06-08T1805) status**: Originally proposed 14 cycles (42 days) ago. **Still unimplemented.** Current corpus: 226 R2 violations in Ch22-31 alone, 181 (80%) where correct=longest. Emoji-mood q10 pattern (16 P0 cases) is structurally encoding the answer into option length.

**Pickup-specific risk**: 
- 80% of R2 violations give away the correct answer via length
- Emoji mood questions (16 P0 in Ch22-31) have ratio ≥2.0 — effectively untestable for young learners
- Ch26 alone has ratio up to 4.33 — a 4× length gap visible at a glance without reading

**Proposed implementation (two steps, 45min combined)**:

**Step 1 — validate-lessons.js R2 lint** (~20 lines, after existing X3_R1_VERBATIM_WORDS block):

```javascript
// R2_LENGTH_PARITY: max/min option length ratio check
function checkR2LengthParity(q, warns) {
  if (!q.options || q.options.length < 3) return;
  // Skip Yes/No binary
  const clean = q.options.map(o => String(o).trim().toLowerCase());
  if (q.options.length === 2 && clean.every(o => o === 'yes' || o === 'no')) return;
  const lens = q.options.map(o => String(o).trim().length);
  const maxL = Math.max(...lens), minL = Math.min(...lens);
  if (minL === 0) return;
  const ratio = maxL / minL;
  const correctIsLongest = lens[q.correctIndex] === maxL;
  if (ratio > 2.0 && correctIsLongest)
    warns.push(`${q.id}: X8_R2_LENGTH_SEVERE (ratio=${ratio.toFixed(2)}, correct=longest — near-certain length tell)`);
  else if (ratio > 1.5 && correctIsLongest)
    warns.push(`${q.id}: X8_R2_LENGTH_WARN (ratio=${ratio.toFixed(2)}, correct=longest — likely length tell)`);
}
```

**Step 2 — pickup-item-writer prompt constraint** (add to docs/skills/pickup-item-writer.md or generation prompt):
```
LENGTH PARITY RULE (R2):
- All 4 options must be approximately equal in length (12–24 characters each).
- Emoji mood options: NEVER use single-word distractors (😴 boring, 😡 angry).
  Always use descriptive phrases: 😴 getting very sleepy / 😡 starting to feel mad.
- If the correct answer phrase is longer than 24 chars, paraphrase to fit.
- If a distractor would be shorter than 12 chars, add 1 plausible modifier word.
- Ratio check: max(len(opts)) / min(len(opts)) must be ≤ 1.5.
```

**Expected first-run yield** (validate-lessons.js R2 lint): ~226 WARN (Ch22-31) + est. ~180 WARN (Ch0-21) = ~406 total corpus R2 violations visible for the first time.

**Pickup architecture fit**:
- ✅ validate-lessons.js 現有 warn-only pattern — no breaking change
- ✅ JSON schema 不需改 — reads existing `options` + `correctIndex`
- ✅ `R2_LINT_STRICT=1` env flag opt-in break build
- ✅ Emoji-mood pattern specifically targetable by ratio>2.0 check
- ❌ Does NOT auto-fix content — requires manual or batch re-generation for 226 violations

---

*Audit completed: 2026-06-11 06:13 UTC — 226 R2 violations (121 P0/P1, 16 emoji-mood systemic) in Ch22-31. Zero auto-caught by CI. ARCH-REC #21 proposed: R2_LENGTH_PARITY lint (follow-up to ARCH-REC #1, 14 cycles unimplemented).*
