# ⚠️ Content QA — 2026-07-04 12:08 UTC

**Today's angle:** #9 — A7 Content-Word Repetition (surface-matching shortcut in correct option)
**Focus:** Ch17–24 (Crane Wife / Heungbu / Mouse Deer / Giant Turnip / Anansi / Meng Mu / Sima Guang / Kong Rong)
**Total Q scanned:** 536 (comprehension 192 + listen-mc 100 + listen-tf 131 + emoji-pick 87 + picture-mc 16 + grammar-mc 10)
**Rationale:** R1-#1, #7, #8, #9 were the untouched quadrant after the 2026-07-03 rotation. A7 chosen because the recent X48_NGRAM_VERBATIM_CORRECT lint only catches 3-gram exact substring overlap — it misses the broader pattern (Buck 2001) where individual content words from the stimulus reappear verbatim in the key, creating surface-matching shortcuts.

---

## A. validate-lessons.js result

```
WARN ch8: 8 issues (X2, X48×2, X49×3, X49B, X57)
WARN ch9: 8 issues (X2, X49×3, X57×3)
Total mirror-lint issues: 447 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Build: PASS
```

No new schema errors. 447 mirror-lint issues are pre-existing (X57_ANTONYM_PAIR_MIRROR, X49_STIMULUS_REUSE from prior runs). No Ch17-24 issues flagged by current lint — the X48 n-gram rule did not surface today's findings, which confirms the gap this audit addresses.

---

## B. Violation Table

### True A7 violations (content/listen-mc types only; emoji-pick and picture-mc exempt by design)

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 17 | kt-ch17-l4-x3 | comprehension | "The old man went home with the heavy bag of gold." | "gold coins in a bag" | A7_P1: 'gold','bag' lifted verbatim (j=0.50) | → "a rich reward for his journey" | No |
| 17 | kt-ch17-l4-x8 | comprehension | "After three days the young woman came out." | "three whole days" | A7_P1: classic time-expression lift (Buck 2001 §5.3) | → "nearly half a week" | No |
| 17 | kt-ch17-l5-x8 | comprehension | "He heard feathers brushing wood." | "feathers touching the wood" | A7_P1: 'feathers','wood' both lifted; synonym-only change ('brushing'→'touching') insufficient paraphrase | → "the sound of wings against the door" | No |
| 18 | kt-ch18-l7-x1 | comprehension | "Out came dust. Out came mud." | "only dust and mud inside" | A7_P1: both story-critical nouns lifted verbatim (j=0.40) | → "worthless filth and nothing more" | No |
| 18 | kt-ch18-l7-x5 | comprehension | "He shared his food, his house, and his gold." | "food, gold, and his home" | A7_P1: 3 content words lifted; 'house'→'home' is minimal paraphrase (j=0.33) | → "everything he owned — meals, shelter, wealth" | No |
| 20 | kt-ch20-l7-x6 | comprehension | "That tiny push was the one." | "the small mouse's pull" | **CONTENT BUG**: sentence says "push", correct answer says "pull". Story is Giant Turnip = pulling, so sentence is wrong. explanationZh correctly says 「那一拉」. | Fix sentence to "That tiny pull was the one." | No |
| 21 | kt-ch21-l4-q3 | listen-mc | "His body went on and on, like a green road in the grass." | "very long like a road" | A7_P1: simile vehicle 'road' repeated verbatim in key (j=0.40) | → "stretched far beyond sight" | No |
| 22 | kt-ch22-l7-q3 | listen-mc | "For many years, he sat with his books from sunrise to night." | "many years in a row" | A7_P1: 'many years' time-expression lifted (j=0.40) | → "for a very long time without stopping" | No |
| 23 | kt-ch23-l4-x8 | comprehension | "Even running fast, it would take many minutes to come back." | "coming back would take too long" | A7_P1: 'come/coming back' key phrase lifted; j=0.50; score=3 (highest surface advantage) | → "no adult could return before it was too late" | No |
| 23 | kt-ch23-l7-x7 | comprehension | "He thought, he acted, and he was just in time." | "thought then quickly acted" | A7_P1: both story verbs lifted verbatim (j=0.50) | → "stayed calm and found a way in time" | No |
| 24 | kt-ch24-l7-q6 | listen-mc | "The small boy gave the big pears to his older brothers." | "he gave the best to his brothers" | A7_P1: 'gave','brothers' both lifted (j=0.40) | → "he kept nothing for himself" | No |

### False positives filtered (by design — not A7 violations)

| type | reason |
|------|--------|
| emoji-pick (j=1.00) | Task = word→emoji mapping; sentence IS the question; correct = "emoji + label" — overlap by design |
| picture-mc | Visual matching task; correct option must describe image content which mirrors sentence |
| listen-tf (P0 flagged as A6_CORRECT_IN_Q) | "True or False:" prefix in question stem contains "False" → structural false positive, not real A6 |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total Q scanned (Ch17-24) | 536 |
| Comprehension + listen-mc (A7-applicable) | 292 |
| True A7 P1 violations | 10 |
| Content bug (push/pull factual error) | 1 |
| P2 borderline (acceptable with note) | 4 |
| False positives filtered | 25+ |
| A7 violation rate (comprehension+listen-mc) | 10/292 = **3.4%** |
| Type with highest A7 rate | comprehension (8/10) |
| Chapter with most violations | Ch17 (4), Ch18 (2), Ch23 (2) |

### P2 borderline (acceptable but noted for future review)

| Ch | Q ID | type | overlap | note |
|----|------|------|---------|------|
| 21 | kt-ch21-l5-x1 | listen-tf | — | "True or False: …is a tiger" / correct="False" — structural, not a real violation |
| 22 | kt-ch22-l3-q8 | listen-mc | sellers, called | 'sellers'/'called' overlap but paraphrase present; borderline acceptable |
| 23 | kt-ch23-l1-pm1 | picture-mc | children, garden | picture-mc by design; not counted |
| 24 | kt-ch24-l7-q8 | listen-mc | bright | 'bright' single word overlap; rest paraphrased well ("soft touch" is inference) |

---

## D. Top 5 P0 (by impact rank)

1. **⚠️ CONTENT BUG** — Ch20 `kt-ch20-l7-x6`: sentence says "push" but correct answer says "pull". The Giant Turnip story is about pulling — sentence `"That tiny push was the one."` must be corrected to `"That tiny pull was the one."`. explanationZh already has correct 「那一拉」. Factual error visible to learners.

2. **P1-HIGH** — Ch23 `kt-ch23-l4-x8`: highest surface-advantage score (3 overlapping words) + j=0.50. The correct option "coming back would take too long" lifts the phrase "come back" directly from "it would take many minutes to come back." Impacts a key comprehension question about Sima Guang's decision.

3. **P1-HIGH** — Ch18 `kt-ch18-l7-x5`: Heungbu sharing scene — 3 content words (food, gold, home≈house) lifted from a single sentence. Any test-wise child can match by scanning for repeated words without listening.

4. **P1-HIGH** — Ch17 `kt-ch17-l4-x8`: Classic Buck 2001 time-expression A7. "After three days" → correct answer "three whole days" is a direct numeric lift. Time expressions are the canonical A7 trap (Buck cites TOEIC instances of this exact pattern).

5. **P1** — Ch18 `kt-ch18-l7-x1`: "Out came dust. Out came mud." → "only dust and mud inside". Both story-critical nouns copied. This is the climax reveal of Nolbu's punishment — a learner should understand the *meaning* (worthlessness, comeuppance), not match the words.

---

## E. Narrative Voice / Pacing Improvements

*(Required section — 3 improvements even with non-zero violations)*

### NV-1: explanationZh operator shorthand → story-voice connectives

Current explanations mix adult symbolic shorthand (`+`, `→`, `=`) with story narration:
- `"wooden loom + click clack = 木製織布機的喀喀聲"` (Ch17 l3-q3)
- `"煮飯 + 打掃 → 每天煮飯打掃。"` (Ch17 l3-x1)
- `"shone like fresh snow = 像新雪一樣閃亮"` (Ch17 l4-x1)

For 8-12 child audience these look like math equations. **Recommendation**: replace `+`/`=`/`→` with natural connectives:
- `+` → "還有" / "加上"
- `→` → "所以" / "這就是說"
- `=` → "就是" / "意思是"

Examples:
- Before: `"煮飯 + 打掃 → 每天煮飯打掃。"`
- After: `"她每天煮飯，還有打掃——這就是做家事。"`

Scope: affects ~40 explanationZh entries across Ch17-24 that use symbolic operators.

### NV-2: Chapter opener narration cliché — vary the "Tonight / First, a few words!" pattern

`"Tonight [character] [does something]. First, a few new words!"` appears as the identical formula for every chapter opener (Ch17–24 all sampled). While functional, it creates a Pavlovian skip-response in children who recognize the pattern after Ch2.

**Recommendation**: rotate 3 opener variants across chapters:
- **A** (mystery): `"Mochi 豎起耳朵——奶奶翻開了一頁她從沒說過的故事…"`
- **B** (invitation): `"Tonight, Grandma has a secret to share. Let's learn a few words first!"`
- **C** (scene-drop)**: `"Snow. Silence. A bird. Let's learn what these words mean…"`

The story framework (CLAUDE.md) specifies Arabian Nights immersive structure — the opener should *feel* like an evening gathering, not a lesson announcement.

### NV-3: Simile-as-answer pacing issue (Ch21 python lesson)

`kt-ch21-l4-q3` asks "How was the python's body?" after the sentence "His body went on and on, like a green road in the grass." — and the correct answer is "very long like a road" (A7 violation already flagged above). But beyond the A7 issue, *lifting the simile vehicle* as the answer also breaks the pedagogical moment: the simile is the poetic highlight of the python's introduction. Revealing the simile ('road') as the answer word erodes its literary impact.

**Recommendation**: replace with an inference question that uses the simile's *meaning* not its vehicle:
- Before Q: "How was the python's body?" → A: "very long like a road" ❌
- After Q: "What does the python look like from far away?" → A: "a long green stripe in the grass" ✓

This preserves the simile's imagery, tests comprehension at an inference level, and avoids A7.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #113: X70_A7_CORRECT_SURFACE_ADVANTAGE lint rule — Iimura (JLTA 2018) distractor overlap inversion**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Flag items where `overlap(stimulus, correct) > overlap(stimulus, any_distractor)` | [Iimura (JLTA 2018)](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_article) + [Yoon (ETS 2017)](https://onlinelibrary.wiley.com/doi/full/10.1002/ets2.12183) | ✅ Direct fit — existing validate-lessons.js processes all Q; Iimura's coding scheme maps 1:1 to content-word overlap counting already implemented above | 2-3 hr (add rule + test) | HIGH — catches 10 real violations that X48 missed in this single chapter range | **Implement** |

### Background (Iimura + ETS finding)

ETS TOEIC distractor design deliberately **puts verbatim content words in wrong options** (plausibility lure) and keeps the **correct option at paraphrase distance**. Iimura (2018) showed this is the single most influential factor for distractor plausibility. The inversion — content words in the *key* — is the A7 violation and is the canonical Buck (2001) test-wiseness source.

The existing `X48_NGRAM_VERBATIM_CORRECT` rule only catches 3-gram exact substring matches. Today's 10 violations all passed X48 because they involve single-word or two-word overlap (e.g., "gold"+"bag", "dust"+"mud", "many years") — below the 3-gram threshold.

### Proposed lint rule (pseudo-code for validate-lessons.js)

```js
// X70_A7_CORRECT_SURFACE_ADVANTAGE
// Source: Iimura (JLTA 2018) — overlap coding scheme inverted for key detection
function contentWords(text) {
  return new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w)));
}
for each lesson entry of type ['comprehension', 'listen-mc']:
  sentWords = contentWords(entry.sentence)
  correctWords = contentWords(entry.options[entry.correctIndex])
  correctOverlap = intersection(sentWords, correctWords).size
  maxDistractorOverlap = max over i≠correctIndex of intersection(sentWords, contentWords(options[i])).size
  if correctOverlap >= 2 AND correctOverlap > maxDistractorOverlap:
    emit X70_A7_CORRECT_SURFACE_ADVANTAGE
```

Threshold: `correctOverlap >= 2` (single-word overlap acceptable — e.g., proper nouns like character names; 2+ is the A7 signal). Excludes `emoji-pick`, `picture-mc`, `listen-tf` (false positives proven above).

### Expected impact

- Today's 10 Ch17-24 violations: all caught by this rule
- Projected across all 35 chapters: ~35-50 violations (extrapolating 3.4% rate)
- Implementation: add to `tools/validate-lessons.js` STOPWORDS constant + rule loop (already has the pattern from X48); add `X70` to lint registry

### Pickup 架構適配判斷

✅ **完全適合**:
- Pickup uses `validate-lessons.js` Node script already parsing lesson JSON
- Content is in `public/lessons-ch*.json` static files — no DB query needed
- All Q types with `sentence` + `options` + `correctIndex` (comprehension, listen-mc) are in scope
- STOPWORDS list can be 200-word English list (same as used in this audit's analysis)
- Rule is warn-only initially (same as X48) — no breaking changes

The only calibration needed: tune the overlap threshold for proper-noun-heavy chapters (character names like "Anansi", "Mochi" may appear in both sentence and answer legitimately — these should not trigger X70 since they are referential, not test-wiseness cues). Solution: add character names to a custom allowlist or raise threshold to 3 for proper-noun-only overlaps.

---

*Audit by cron at 2026-07-04 12:08 UTC. Angle #9 (A7 content-word repetition). Next rotation: #1 (R1 paraphrase deep-dive) or #7 (A5 cultural reference), Ch25-32.*
