# Content QA — 2026-06-28 06:09 UTC

Today's angle: **#2 R2 Distractor Doctrine (4-option blind)** — audits whether the four answer choices in Ch1-8 listen-mc / comprehension / picture-mc questions are properly balanced in length (R2 length parity ≤1.25×), functionally diverse (R4 failure-mode coverage), and free of structural tells that allow test-wise A2 learners to pick the correct answer without listening.

Focus: **Ch1–8** (Momotaro / Ugly Duckling / Hare & Tortoise / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Little Pigs)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s): X2_OPTION_LIST_BIAS (a, she, the)
WARN lessons-ch2.json: 2 lint issue(s): X2_OPTION_LIST_BIAS (a, she)
WARN lessons-ch3.json: 2 lint issue(s): X2_OPTION_LIST_BIAS (a, he)
WARN lessons-ch4.json: 3 lint issue(s): X2_OPTION_LIST_BIAS (a, he, to)
WARN lessons-ch5.json: 3 lint issue(s): X2_OPTION_LIST_BIAS (a, a, bones)
WARN lessons-ch6.json: 2 lint issue(s): X2_OPTION_LIST_BIAS (a, she)
WARN lessons-ch7.json: 2 lint issue(s): X2_OPTION_LIST_BIAS (a, to)
WARN lessons-ch8.json: 2 lint issue(s): X2_OPTION_LIST_BIAS (a, he)

Total mirror-lint issues (corpus-wide): 106  (warn-only; MIRROR_LINT_STRICT=1 to fail build)
Ch1-8 automated: 19 X2_OPTION_LIST_BIAS (all pre-existing, warn-only)
Build: PASS
```

---

## B. Violation table

### SYSTEMIC P0 — R2 Length parity violated in 65.4% of questions (corpus-wide structural flaw)

**Scope**: 255 of 390 auditable 4-option Qs in Ch1-8 exceed the R2 ratio threshold of 1.25× (max_len / min_len). Of all 300 listen-mc/comprehension/picture-mc questions, **57 (19.0%)** have the correct option as the uniquely longest choice — a direct length-tell that lets test-wise A2 learners skip listening and guess by option length.

**Industry confirmation** (ABPS Guide to Item Writing 2024; Nursing Summit Item Analysis 2024): "Tests should be reviewed to determine if the correct answer is significantly longer than the distractors — this represents a test-wiseness cue that can bias results." Non-homogeneous distractor length is flagged as an item-writing flaw in distractor-efficiency literature (Rodriguez meta-analysis).

### P0 — Critical individual violations

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 7 | kt-ch7-l4-x2 | grammar-mc | "___ old man appeared." | **R2-GRAMMAR-SINGLE-LETTER**: Options are "A" (1) / "An" (2) / "The" (3) / "One" (3) — ratio=3.0. The single-letter "A" is a structural outlier; any test-wise child knows articles are 1-3 letters so "An" (2 chars, correct) is not the length-longest, but the disparity destroys the 1.25× rule and "A" becomes a magnet for elimination by length feel. | Replace "A" with a 2-3 char decoy: "My" (not valid for articles → easy A-level catch) or restructure sentence to use noun-initial blank where options are equally inflected forms. | No |
| 4 | kt-ch4-l6-x9 | picture-mc | "Which shows the Camel BEFORE the magic?" | **R2-CORRECT-LONGEST ratio=1.5**: Correct "a camel with a flat smooth back and no hump" (43 chars) vs others 29-33 chars. Learner can pick longest. | Trim correct to ≤35 chars: "a camel with no hump at all" (27 chars). Pad one distractor: "wearing a big dusty bag on its back" (35 chars). | No |
| 1 | kt-ch1-l5-q9 | listen-mc | "How was visibility?" | **R2-RANGE-3.2×**: "very poor" (9 correct) vs "clear and bright" (16) / "sunny" (5) / "sparkling" (9) — min=5, max=16. Correct is mid-length but the 3.2× range itself signals that one option is anomalously long/short, eroding blind equal probability. | Normalize: "very poor" / "quite dark" / "perfectly clear" / "still and bright" (all 9-15 chars). | Yes (new MC options affect audio order) |
| 3 | kt-ch3-l4-x10 | comprehension | "What is the main idea?" | **R2-CORRECT-LONGEST ratio=1.4**: "steady effort beats sleeping and being overconfident" (52 chars) vs others 37-44 chars. Correct is visually dominant. | Shorten correct to ≤40 chars: "slow and steady effort wins the race" (36). Pad shortest option: "the fox changed the rules to be fair" (36). | No |
| 7 | kt-ch7-l6-x5 | comprehension | "What does this journey of the shoe show?" | **R2-CORRECT-LONGEST ratio=1.5**: "the shoe was meant to reach someone important" (45) vs others 30-38 chars. | Trim: "the shoe was guided to its rightful owner" (41). Extend shortest to match. | No |

### P1 — Significant: Correct-is-uniquely-longest tells (representative sample, 57 total)

| Ch | Q ID | type | question | correct option (len) | next-longest | ratio | 修法 |
|----|------|------|---------|---------------------|-------------|-------|-----|
| 1 | kt-ch1-l3-x7 | comprehension | Momotaro's plan shows...? | "brave and protective of others" (30) | "reckless and not thinking" (25) | 1.5× | Trim correct: "brave, protecting others" (23). Add 1 word to each distractor. |
| 1 | kt-ch1-l4-x8 | comprehension | Dog's bright eyes tell us...? | "the dog was excited and wanted the dumpling" (43) | "the dog was bored and fast asleep" (33) | 1.4× | Trim: "the dog was excited and hungry" (30). |
| 1 | kt-ch1-l7-x7 | comprehension | Main message of Momotaro? | "courage and friendship can overcome anything" (44) | "treasure is the most important thing" (36) | 1.3× | Trim: "courage and friendship win everything" (37). |
| 2 | kt-ch2-l6-q6 | listen-mc | What happened in pond? | "got trapped in ice" (18) | "flew away safely" (16) | 1.5× | Trim: "trapped in ice" (14). Extend others: "flew safely away" / "found warm shelter". |
| 4 | kt-ch4-l4-x10 | comprehension | Why is Djinn good for this? | "he listened carefully and has the power to help" (47) | "his harsh words scared away the animals" (39) | 1.4× | Trim: "he has the power and will listen" (31). |
| 4 | kt-ch4-l7-x10 | comprehension | Main lesson of story? | "avoiding your duty leads to a heavier burden" (44) | "magic is the only way to fix laziness" (37) | 1.5× | Trim: "laziness earns a heavier load" (29) — punchier AND within parity. |
| 5 | kt-ch5-l6-q10 | comprehension | Scene mainly shows...? | "one girl finding her only source of help" (40) | "crying and giving up at last" (28) | 1.5× | Trim: "a girl finding her last hope" (28). |
| 6 | kt-ch6-l4-q10 | comprehension | Scene mainly shows...? | "quiet hard work to save her brothers" (36) | "learning to dance with friends" (29) | 1.5× | Trim: "hard silent work to save her brothers" (37 → needs minor trim: "silent work to save her brothers" (31)). |
| 7 | kt-ch7-l5-q10 | comprehension | Scene mainly shows...? | "Yexian's transformation at the festival" (39) | "a fish soup dinner with the family" (34) | 1.4× | Trim: "Yexian's change at the festival" (31). |
| 7 | kt-ch7-l6-x5 | comprehension | Shoe's journey shows...? | "the shoe was meant to reach someone important" (45) | "the new wife sent the shoe to the king" (38) | 1.5× | (see P0 row above) |
| 8 | kt-ch8-l4-q3 | listen-mc | What did 3rd pig use? | "baked stone and clay" (20) | "cold snow and ice" (17) | 1.4× | Swap: "fired brick and clay" (19) vs "snow and ice" (12 → extend: "soft snow and ice" (17)). |
| 8 | kt-ch8-l7-q3 | listen-mc | What did pigs say? | "not by our chin hair" (20) | "we all give up now" (18) | 1.4× | Trim: "not by our hair" (15). Pad others to 14-16 chars. |

### P1 — R4 Phonological Decoy Coverage near-absent (systemic)

**Finding**: Only **9.6% of Ch1-8 Qs** (24/249) have any phonological decoy distractor — a distractor whose first word is phonetically close to the correct option's first word (≥75% letter overlap, matched length). R4 target is ≥25%.

**Impact**: Without phonological traps, A2 children can use reading-comprehension strategy (read options, match meaning to sentence context) instead of listening. Buck 2001 identifies this as Construct-Irrelevant Variance (CIV) — the test measures reading, not listening. For children who see the written sentence revealed post-answer, the entire interaction becomes a reading exercise.

**Root cause**: Options are written as meaning-based paraphrases (schema-inference failure mode only). Missing: phonological ("cold" vs "bold"), near-homophone ("bear" vs "bare"), and sound-alike first syllable pairs.

**Examples of missing phonological distractors**:
- Ch8 kt-ch8-l4-q3: pigs build with brick/stone — "brick and clay" → should have "thick and grey" (phonological decoy on "brick/thick") as one distractor
- Ch3 kt-ch3-l6-q9: "faster than ever" → distractor "faster than before" (local-detail ✓) but missing "past the river bend" (phonological: "faster/past" rhythm decoy) or "last one there" (rhyme)
- Ch1 kt-ch1-l5-q3: "by taking a dumpling" → should include "by making a dumpling" (minimal-pair "taking/making")

**Suggested fix**: Per lesson, designate ≥1 distractor in every 4-option set as a **phonological decoy**: pick a distractor whose first content word shares ≥2 phonemes with the correct option's first content word in the same syllable position.

### P1 — R4 All-emotion-options monotony (12 Qs, representative 6 shown)

All 4 options are emotion adjectives — zero phonological or semantic-category variation. When every choice is "feeling X/Y/Z/W", the correct answer cannot be distinguished by sound-shape, only meaning, reducing construct validity.

| Ch | Q ID | question | options (all emotion) | correction |
|----|------|---------|----------------------|------------|
| 1 | kt-ch1-l3-x5 | How did the village feel when news arrived? | excited and joyful / calm and peaceful / tired and hungry / **worried and afraid** ✓ | Replace "tired and hungry" with a behavioural distractor: "gathered at the gate" (action, not emotion) — adds category diversity |
| 1 | kt-ch1-l6-q9 | How did the demon king look? | **smiling and calm** ✓ / afraid and shaking / angry and shouting / sleepy and bored | Replace "sleepy and bored" with physical action: "pacing the room quickly" — phonologically distinct AND category shift |
| 3 | kt-ch3-l7-q5 | How did the animals feel? | scared and quiet / sleepy and slow / sad and worried / **excited and happy** ✓ | Replace "sleepy and slow" with visual observation: "moving toward the track" — different category |
| 6 | kt-ch6-l3-q10 | How did the girl feel? | sleepy and warm / tired and bored / angry and proud / **surprised and afraid** ✓ | Replace "angry and proud" (contradictory with context) with "reaching for the door" (action distractor) |
| 7 | kt-ch7-l7-q7 | How did the king feel? | **surprised and sure** ✓ / bored and tired / angry and loud / shy and quiet | Replace "shy and quiet" with: "calling for his guards" (action) |
| 8 | kt-ch8-l6-q3 | How did the wolf look as he came? | shy and quiet / tired and sleepy / **hungry and ready** ✓ / happy and singing | Replace "shy and quiet" with: "banging on the door" — the wolf's canonical action = phonologically richer scene |

### P1 — R4 Same-distractor-start (all 3 distractors share first word)

| Ch | Q ID | shared start | options | issue | 修法 |
|----|------|-------------|---------|-------|-----|
| 1 | kt-ch1-l5-q3 | "by" | by taking a dumpling ✓ / **by force / by following silently / by stealing food** | 3 distractors begin "by ___" — structural parallelism makes "by taking" blend in visually, eliminating any distinctive shape cue | Vary starts: "stealthily" / "he offered a trade" / "he waited for permission" |
| 1 | kt-ch1-l6-q5 | "by" | by jumping down from above / **by running fast and biting** ✓ / by waiting quietly nearby / by hiding behind the rocks | Same "by ___" parallelism | Vary: "leaped from above" / "a sudden bite" / "waited behind a rock" |
| 5 | kt-ch5-l3-x8 | "three" | three seasons of the year / three different kings / **morning, noon and night** ✓ / three kinds of weather | 3 distractors are "three ___" → correct stands out as only non-"three" option | Vary distractors: "dawn, midday and dusk" / "cold, warm and hot" / "spring's three moods" |
| 7 | kt-ch7-l4-lg2 | "to show" | to show he wore light sandals / **to show he came from the spirit world** ✓ / to show the grass was slippery / to show he arrived in a hurry | All 4 options "to show ___" — correct blends in but phrasing monotony removes form-level diversity | Replace 2 distractors with cause-form: "because his sandals were enchanted" / "since the ground was wet" |

### P2 — A3 Word-count disparity (5 Qs — minor structural tell)

| Ch | Q ID | type | word counts | issue | 修法 |
|----|------|------|-----------|-------|-----|
| 7 | kt-ch7-l3-x7 | comprehension | [1, 1, 5, 1] | **heartbroken** ✓ (1 word) vs "angry at the new wife" (5 words) — extreme outlier in set of single-word emotion options | Expand correct: "deeply heartbroken" / expand all to 2-3 words for parity |
| 3 | kt-ch3-l7-q9 | listen-mc | [3, 1, 1, 1] | "proud and strong" (3w) vs single-words — correct "embarrassed" is 1w | Expand to 2w each: "very proud" / "quite sleepy" / "quite hungry" |
| 1 | kt-ch1-l5-q9 | listen-mc | [2, 3, 1, 1] | "very poor" ✓ (2w) vs "clear and bright" (3w) vs singles — range is visually uneven | Normalize to 2 words: "very clear" / "quite sunny" / "very bright" |
| 3 | kt-ch3-l6-q9 | listen-mc | [3, 2, 1, 3] | "walking" (1w) isolated amid 2-3 word options | Expand: "walking slowly" (2w) |
| 6 | kt-ch6-l7-x6 | picture-mc | [6, 3, 5, 2] | "left alone" (2w) vs "ran far away into the woods" (6w) — correct "told the truth at last" (5w) blends in | Trim correct: "told the truth" (3w); trim longest: "fled into the woods" (4w) |

---

## C. Stats

| Metric | Value | Target / Threshold |
|--------|-------|-------------------|
| Total 4-option Qs audited (Ch1-8) | 390 | — |
| R2 length-parity violations (ratio > 1.25×) | 255 (65.4%) | 0% |
| Correct-is-uniquely-longest | 57 (19.0%) | 0% |
| Phonological decoy presence | 9.6% (24/249) | ≥25% |
| All-emotion-option monotony | 12 Qs (4.8%) | 0 |
| R4 same-distractor-start | 4 Qs | 0 |
| A3 word-count disparity (≥3× ratio) | 5 Qs | 0 |
| grammar-mc single-letter option | 1 Qs | 0 |

---

## D. Top 5 P0

1. **SYSTEMIC — R2 length-tell across 65.4% of corpus** (`ALL Ch1-8`): The entire distractor set was authored without enforcing ≤1.25× length parity. 57 questions have the correct option as uniquely longest — a test-wiseness cue confirmed harmful by 2024 item-writing literature. Priority: add R2 hard-lint to `validate-lessons.js`.

2. **kt-ch7-l4-x2** (`grammar-mc`): "A" (1 char) in a 4-option grammar set creates a 3.0× ratio. Single-letter option is a near-impossible length match. Immediate fix: replace "A" with "My" or restructure to tense-form options.

3. **kt-ch4-l6-x9** (`picture-mc`, Ch4 Camel): Correct option "a camel with a flat smooth back and no hump" (43 chars) is 1.5× longer than all distractors. Length-tell + meaning-tell combined. Fix: trim to ≤30 chars.

4. **R4 Phonological coverage at 9.6%** (systemic): No chapter in Ch1-8 has ≥25% phonological distractor coverage. The entire listening corpus is construct-invalid as a listening test for children who can read — it measures reading comprehension. Fix: mandate ≥1 phonological decoy per 4-option set.

5. **kt-ch3-l4-x10** (`comprehension`): Correct "steady effort beats sleeping and being overconfident" (52 chars) is the longest option at 1.4× — AND is the thematic main-idea answer, so it will also be schema-inferred as correct without listening. Double-exposure: length-tell + schema-tell. Fix: trim to ≤40 chars.

---

## E. Narrative voice / pacing improvements (even with 0 rule violations, 3 required)

1. **Ch5 kt-ch5-l3-x8** — "What do the three riders represent together?" / correct: "morning, noon and night". The explanation (if any) should name all three riders' colours before revealing the answer — the way Baba Yaga legends unfold (white / red / black). Current distractor set ("three seasons", "three kings") loses the mythic register. Suggestion: add an `explanationZh` that names 白 / 紅 / 黑 horsemen explicitly.

2. **Ch7 (Yexian / Ch'in) lesson arc** — The comprehension questions consistently ask "What is this scene mainly showing?" across 3 consecutive lessons (kt-ch7-l4-x3, l5-x2, l5-q10, l6-q8). Four questions with identical stem formula create a formulaic narrative voice. Vary: "What did Yexian want most?" / "How did this moment change things?" / "Why does the story pause here?" — different cognitive angles with no repetitive meta-commentary.

3. **Ch8 Three Little Pigs — option "not by our chin hair"** (kt-ch8-l7-q3, correct) is the traditional refrain and should be the most memorable option. But distractors "nothing at all" / "come in please" / "we all give up now" are all resignation/surrender variants — three different versions of defeat vs one correct act-of-defiance. This creates a schema pattern: "only one of these is brave/defiant → that's the answer." Fix: make ≥1 distractor an equally defiant-sounding wrong line: "not while we have walls!" — forces learner to actually recall the specific folk phrase.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #89: X42_R2_LENGTH_PARITY_HARD_LINT

**Source pattern**: ABPS Guide to Item Writing 2024 (https://www.abpsus.org/wp-content/uploads/2024/01/Guide-to-Item-Writing-Revised-2024.pdf); Nursing Summit Item Analysis 2024 (https://www.nursingsummit.com/wp-content/uploads/2024/07/Item-Analysis-and-Test-Revision_NEE-2024.pdf); Rodriguez et al. nonfunctional distractor meta-analysis (PMC7372664)

**Industry finding**: Standardized-test item-writing guidelines from ABPS, ETS, and nursing-exam boards all mandate that **correct options must not be systematically longer than distractors** — this is a test-wiseness cue that inflates scores independent of content knowledge. 2024 publications flag non-homogeneous option length as a P0 item flaw. The Rodriguez meta-analysis confirms even 1 non-functional (obvious or length-signalled) distractor in a 4-option set reduces reliability.

**Current Pickup state**: 65.4% of Ch1-8 4-option Qs exceed 1.25× length ratio; 19% have correct-as-uniquely-longest. `validate-lessons.js` has no R2 check; there is no lint signal at all.

**Pickup 適配**: ✅ Fully applicable. `validate-lessons.js` already parses every question's `options` array via Zod schema. Adding R2 length-parity check is a 10-line addition to the existing `lintIssues` accumulator.

**Proposed implementation** (no `src/` changes, only `tools/validate-lessons.js`):

```js
// After existing X2_OPTION_LIST_BIAS check:
if (q.options && q.options.length === 4) {
  const lens = q.options.map(o => String(o).length);
  const ratio = Math.max(...lens) / Math.min(...lens);
  if (ratio > 1.25) lintIssues.push(`X42_R2_LENGTH_PARITY (ratio=${ratio.toFixed(2)})`);
  // Flag correct-is-longest specifically:
  const ci = q.correctIndex ?? q.correct;
  if (typeof ci === 'number' && lens[ci] === Math.max(...lens)) {
    const sorted = [...lens].sort((a,b)=>b-a);
    if (lens[ci] > sorted[1] * 1.10) lintIssues.push(`X42_R2_CORRECT_LONGEST (${lens[ci]}ch)`);
  }
}
```

**Effort**: 30 min (lint addition + test). **ROI**: High — surfaces 255 existing violations as actionable WARN; can escalate to FAIL for new content commits. No `lessons-ch*.json` edits required to ship the lint; fixes can follow per-chapter.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| R2 length-parity hard lint in CI | ABPS 2024 / Rodriguez PMC7372664 | ✅ `validate-lessons.js` += 10 lines | 30 min | High — blocks all future length-tells on commit | Ship as WARN first; escalate to FAIL for new chapters |
| Phonological decoy mandate (≥1 per 4-opt set) | Buck 2001 / ETS Part 3-4 standard | 🟡 Partial — requires content edits to ~240 Qs; no schema change needed | 2-4 hr batch (Fable agent) | Very High — converts reading test → listening test | Batch-fix Ch1-4 first (foundational chapters) |
| Action-distractor injection for emotion Qs | Duolingo Stories patterns (2024 blog) | ✅ Content-only edit; no schema change | 1 hr (12 Qs) | Medium — increases R4 diversity, reduces schema-inference shortcuts | Fix this cron cycle if author approves |
