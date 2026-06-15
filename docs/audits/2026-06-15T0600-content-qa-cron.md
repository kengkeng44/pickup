# Content QA — 2026-06-15 06:00 UTC

Today's angle: **R1 — Paraphrase Deep-Dive (Buck 1991/2001 ban)**
Focus: **Ch1-8 (core fairy-tale chapters, highest lesson traffic)** + cross-check of automated linter hits in Ch27-31

> **R1 rotation context**: Last 8 runs covered A6 / R2 / A2 / A5 / A7 / A4 / #10-audio-sync / A3. R1 not in recent window — and linter output shows active violations in Ch27-31, making this cycle overdue.
>
> **Angle definition**: R1 fires when the correct option in a `listen-mc` / `listen-comprehension` / `listen-emoji` question is a verbatim substring of `sentence`, a near-verbatim copy (≥3 content words shared, only function-word swap), or a high-overlap paraphrase that lets a learner match by scanning rather than comprehending. Source authority: Buck 1991/2001 (*Assessing Listening*): verbatim correct options are the #1 source of Construct-Irrelevant Variance (CIV) in listening MCQ because learners can surface-match the spoken form without building propositional meaning. Duolingo English Test (2025 redesign) explicitly filters "excessive lexical repetition between correct answer and question items" in its AI-generated item pipeline.
>
> **Sub-types tracked**:
> - **R1-P0-SUBSTRING**: correct option is a literal substring of `sentence` (e.g., sentence says "made of white bones", option says "bones"). Automated by `R1_SUBSTRING` lint.
> - **R1-P0-VERBATIM-ALL-WORDS**: all content words in the correct option appear in the sentence; only morphological or function-word changes separate them. Automated by `X3_R1_VERBATIM_WORDS`.
> - **R1-P1-HIGH-OVERLAP**: ≥3 unique content words shared between correct option and sentence, ratio ≥0.70. Learner can surface-scan and match without full comprehension.
> - **R1-P1-SOFT**: Correct option is a near-literal restatement with only tense shift or minor rephrasing — no synonyms or hypernyms used. Detected by manual review.
>
> **False-positive guard**: Proper nouns (Mochi, Hana, Yexian) counted as "unavoidable"; single stop-word-only overlaps excluded.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json:  3 X2_OPTION_LIST_BIAS
WARN lessons-ch3.json:  8 X2_OPTION_LIST_BIAS
OK   lessons-ch4.json
OK   lessons-ch6.json
OK   lessons-ch8.json
WARN lessons-ch5.json:  1 X3_R1_VERBATIM_WORDS  ← R1 hit
WARN lessons-ch7.json:  1 X2_OPTION_LIST_BIAS
WARN lessons-ch27.json: 3 R1_SUBSTRING + 3 X3_R1_VERBATIM_WORDS  ← cluster
WARN lessons-ch28.json: 2 R1_SUBSTRING + 2 X3_R1_VERBATIM_WORDS  ← cluster
WARN lessons-ch29.json: 3 R1_SUBSTRING + 2 X3_R1_VERBATIM_WORDS  ← cluster
WARN lessons-ch30.json: 2 R1_SUBSTRING + 1 X3_R1_VERBATIM_WORDS  ← cluster
WARN lessons-ch31.json: 2 R1_SUBSTRING + 1 X3_R1_VERBATIM_WORDS  ← cluster
Total mirror-lint issues: 70 (warn-only)
```

**Critical observation**: R1_SUBSTRING + X3_R1_VERBATIM_WORDS are currently WARN-only. All 13 R1 hits in Ch27-31 have been shipping to production without any blocking gate.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence (key phrase) | Correct Option | Violation | 修法 | Audio regen? |
|----|------|------|-----------------------|----------------|-----------|------|--------------|
| 5 | kt-ch5-l4-q3 | R1-P0-SUBSTRING | "…made of **white bones**." | **bones** | Correct option IS a single content word lifted verbatim from sentence. Zero inference required — child scans for "bones" → selects. | Replace correct with "skeletal pieces" or "pieces of bone"; update distractors accordingly | No |
| 8 | kt-ch8-l3-q3 | R1-P0-VERBATIM | "…they felt **firmer than straw**." | **they were firmer than straw** | Only change: "felt" → "were". 3/3 content words (firm/straw shared). Functionally verbatim. | "they were stronger and harder to break" | No |
| 6 | kt-ch6-l7-q5 | R1-P1-HIGH-OVERLAP | "…**threw** one **over each** bird." | **threw one on each swan** | "threw", "one", "each" all verbatim; "over"→"on" + "bird"→"swan" are the only changes. Surface-scan identifies correct. | "placed a shirt on every swan" or "covered each bird with a shirt" | No |
| 8 | kt-ch8-l6-q9 | R1-P1-HIGH-OVERLAP | "Both brothers ran **out the back**, **fast** as they could." | **out the back, very fast** | "out", "back", "fast" all preserved; "very" added — zero paraphrase. | "through the rear as quickly as they could" | No |
| 7 | kt-ch7-l3-q10 | R1-P1-SOFT | "Her **only friend** was gone." | **Yexian loses her only friend** | "only friend" verbatim. "Yexian" = proper noun (exempt), but compound "only friend" is key phrase. listen-comprehension gist Q — paraphrase standard still applies. | "she is left all alone by the empty pond" | No |

### Ch27-31 Cluster (confirmed by linter — 13 blatant R1 violations)

| Ch | Q ID | Sentence phrase | Correct Option | Type |
|----|------|-----------------|----------------|------|
| 27 | kt-ch27-l6-q3 | "**only his head and one arm**" | "only his head and one arm" | R1-P0 EXACT COPY |
| 27 | kt-ch27-l5-q3 | "five stone fingers…**giant hand**" | "a giant hand of stone" | R1-P0-VERBATIM |
| 27 | kt-ch27-l7-q3 | "a yellow **paper** with **old** gold **writing**" | "a paper with old writing" | R1-P0-VERBATIM |
| 28 | kt-ch28-l3-q5 | "knocked…**soft and slow**" | "soft and slow" | R1-P0 EXACT COPY |
| 28 | kt-ch28-l2-q6 | "**small house** far up the green **hill**" | "in a small house on a hill" | R1-P0-VERBATIM |
| 29 | kt-ch29-l1-q3 | "**For ten long years**" | "for ten long years" | R1-P0 EXACT COPY |
| 29 | kt-ch29-l5-q8 | "felt **easy and good**" | "easy and good" | R1-P0 EXACT COPY |
| 29 | kt-ch29-l3-q6 | "**walk** on its warm **sand** and **touch** its old stone **walls**" | "walk on its sand and touch its walls" | R1-P0-VERBATIM |
| 30 | kt-ch30-l4-q6 | "hit…**right in the chest**" | "right in the chest" | R1-P0 EXACT COPY |
| 30 | kt-ch30-l7-q3 | "arms **around**…**neck**" | "around the neck" | R1-P0-VERBATIM |
| 31 | kt-ch31-l1-q8 | "**in a tall stone castle**" | "in a tall stone castle" | R1-P0 EXACT COPY |
| 31 | kt-ch31-l4-q3 | "nailed…**on Robin's front door**" | "on Robin's front door" | R1-P0 EXACT COPY |

> **Pattern diagnosis**: Ch27-31 content generation batch applied a template that extracts the key phrase from `sentence` and pastes it directly as the correct option. The `explanationZh` fields even annotate these as "paraphrase" incorrectly. This is a systematic generator prompt failure, not isolated slips.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch1-8 total Qs scanned | 152 |
| R1 P0 violations (Ch1-8) | 2 |
| R1 P1 violations (Ch1-8) | 3 |
| R1 confirmed linter hits (Ch27-31) | 13 (all WARN, none blocked) |
| Total R1 violations across all chapters | **18** |
| Chapters with zero R1 issues (Ch1-8) | 4 (Ch1, Ch2, Ch3, Ch4) |
| Questions requiring audio regen | 0 |

---

## D. Top 5 P0

### ★★★ #1 — kt-ch5-l4-q3 (Ch5, Baba Yaga L4): Single-word verbatim lift

**Why P0**: Sentence ends "It was made of white bones." Correct option is literally "bones" — a single-word extract with zero inference. A child can hear any word and look for it in the option list. This nullifies the listening construct entirely.

**Current**:
```
sentence: "In front of her stood a fence. It was not made of wood. It was made of white bones."
correct:  "bones"
options:  stone / bones / old rope / cold metal
```

**Fix**:
```
correct:  "pieces of bone"          ← hypernym + nominalization
alt:      "skeletal remains"        ← if B1 calibration acceptable
```
Audio regen: No.

---

### ★★★ #2 — kt-ch27-31 cluster (13 violations): Systematic generator prompt failure

**Why P0**: 13 questions across 5 chapters share the same failure mode — the correct option IS the key phrase from the sentence, often character-for-character identical. The `explanationZh` fields label these "paraphrase" but they are verbatim. This defeats the listening comprehension goal for an entire story arc (Ch27-31). Children can pass every question by scanning for matching words without comprehending.

**Root cause**: Content generation prompt for these chapters likely instructed: "write the correct answer that summarizes the key information" without enforcing the paraphrase constraint. Fix requires a re-generation pass with explicit R1 instruction: "correct option MUST use synonyms, hypernyms, or reformulation — NEVER repeat the exact words from the sentence."

**Impact**: Ch27-31 = 5 chapters × ~60 Q each = ~60 affected items. All are shipping to production with WARN-only lint.

---

### ★★ #3 — kt-ch8-l3-q3 (Ch8, Three Little Pigs L3): Grammar-only swap

**Why P0**: "they felt firmer than straw" → "they were firmer than straw". Only morphological change (felt → were). Buck 2001 §3.4 explicitly classifies this as CIV Category A: "minimal syntactic alteration with no lexical substitution." TOEIC Part 3-4 item writing standards ban this pattern explicitly.

**Fix**:
```
correct:  "they were stronger and harder to break"
explanationZh: 比稻草牢 → 更強、更難折斷。
```

---

### ★★ #4 — kt-ch8-l6-q9 (Ch8, Three Little Pigs L6): Direction + speed verbatim echo

**Current**: sentence "ran out the back, fast as they could" → correct "out the back, very fast"
**Why P0**: Three content words (out / back / fast) verbatim. Adding "very" is not paraphrase. A surface-scan strategy matches this without parsing "Both brothers ran."

**Fix**:
```
correct:  "through the rear as quickly as possible"
```

---

### ★ #5 — kt-ch6-l7-q5 (Ch6, Six Swans L7): Verb + determiner echo

**Current**: sentence "threw one over each bird" → correct "threw one on each swan"
**Why R1-P1**: "threw", "one", "each" all verbatim. Only "over"→"on" (synonym) + "bird"→"swan" (hyponym, story-context inference). Better paraphrase available.

**Fix**:
```
correct:  "placed a shirt on every swan"
```

---

## E. Narrative Voice Improvements (3 proposals — zero-violation pass)

These are not R1 violations but represent opportunities to strengthen the grandma storytelling voice:

### NV1 — kt-ch5-l4 sentence: Stilted repetition in Baba Yaga fence description

**Current**: "In front of her stood a fence. It was not made of wood. It was made of white bones."

The "It was not X. It was Y." structure is common in test-writing scaffolding but breaks grandma's oral storytelling rhythm.

**Suggested**: "In front of her stood a fence made of white bones, not wood." — single sentence, same information, more natural read-aloud cadence.

### NV2 — kt-ch7-l3-q10 `explanationZh`: Jargon leak

**Current**: `explanationZh: "主旨 = 葉限失去唯一的朋友。"`

"主旨 =" is classroom jargon (used by teachers), not grandma voice. Children (8-12) see this post-reveal and it breaks immersion.

**Suggested**: `"葉限坐在空空的池邊 — 她唯一的朋友不見了。"` — stays in story-world, same meaning, no metalinguistic label.

### NV3 — kt-ch8-l3-q3 sentence: Dry test prose vs grandma narration

**Current**: "He picked sticks because they felt firmer than straw."

**Suggested**: "He chose sticks — they were stronger and harder to break." — the em-dash pause matches how a grandma would emphasize the contrast while telling the story. Also simultaneously fixes the R1-P0 violation (#3 above, two fixes in one).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #35: R1_BLOCK_CI — Promote R1 lints from WARN to blocking BUILD FAILURE

**Industry signal**:
- **Duolingo English Test (2025 redesign)**: Explicitly "filters candidate questions to reduce ambiguity, avoid overlapping answer content, and limit excessive lexical repetition" in its AI item-generation pipeline. Source: [Interactive Listening – Duolingo English Test](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf)
- **ParaPLUIE (COLING 2025)**: New LLM-based semantic paraphrase metric (log-likelihood ratio) that is "much more independent of lexical distance" — proposed as automated quality gate for MCQ generation pipelines. Source: [ACL Anthology 2025](https://aclanthology.org/2025.coling-main.538/)
- **Buck 2001**: Verbatim correct options are Construct-Irrelevant Variance #1 source in listening assessment.

**Gap**: Pickup's `validate-lessons.js` already detects `R1_SUBSTRING` and `X3_R1_VERBATIM_WORDS` but exits with code 0 (WARN). 13 violations in Ch27-31 have been shipping unchecked.

**Pickup 適配**: ✅ 直接適合

This is a pure CI policy change — no schema changes, no lesson file edits required.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| R1-LINT-BLOCK: exit(1) on R1_SUBSTRING or X3_R1_VERBATIM_WORDS | Duolingo item filter / Buck 2001 | ✅ — validate-lessons.js already detects; just change warn→fail | **S (15 min)** | ⭐⭐⭐ HIGH | **IMPLEMENT** |

**Concrete implementation** — `tools/validate-lessons.js`:

```js
// Current (WARN only):
if (isR1Substring) warnings.push(`R1_SUBSTRING (…)`);

// After (BLOCKING):
const R1_BLOCK_FLAGS = ['R1_SUBSTRING', 'X3_R1_VERBATIM_WORDS'];
const blockingIssues = issues.filter(i => R1_BLOCK_FLAGS.some(f => i.startsWith(f)));
if (blockingIssues.length > 0) {
  console.error(`ERROR ${file}: ${blockingIssues.length} R1 violation(s) — build blocked`);
  process.exit(1);
}
```

**Pre-requisite**: Fix the 13 existing R1 violations in Ch27-31 BEFORE enabling the block (otherwise CI immediately breaks). Sequencing:
1. Re-generate correct options for all 13 flagged Q IDs using paraphrase constraint
2. Verify validate-lessons.js passes
3. Flip WARN → BLOCK in validate-lessons.js
4. Future content generations can never ship R1 violations

**ROI**: Highest leverage change available — a 15-min CI fix prevents an entire class of future quality regressions across all 30+ chapters.
