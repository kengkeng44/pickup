# Content QA — 2026-07-22 00:06 UTC

**Today's angle:** A4 — Mirror Patterns (antonym/negation/identity options collapse 4→2)
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Cowherd+Weaver / LRRH / Urashima Taro / Emperor's New Clothes / Issun Boshi)
**Scored questions analysed:** ~580 non-narration entries across Ch9–16

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:   8 lint issue(s) — 3 X57, 2 X2, 2 X49, 1 X49B
WARN lessons-ch10.json:  9 lint issue(s) — 1 X57, 3 X2, 5 X49B
WARN lessons-ch11.json: 16 lint issue(s) — 2 X57, 3 X2, 8 X49, 3 X49B
WARN lessons-ch12.json: 12 lint issue(s) — 1 X57, 1 X2, 10 X49
WARN lessons-ch13.json: 12 lint issue(s) — 3 X57, 3 X2, 6 X49
WARN lessons-ch14.json: 10 lint issue(s) — 2 X57, 1 X2, 5 X49B, 1 X48
WARN lessons-ch15.json:  9 lint issue(s) — 1 X57, 1 X2, 7 X49B
WARN lessons-ch16.json: 10 lint issue(s) — 5 X57, 0 X2, 5 X49

Total mirror-lint issues: 440 (global, warn-only; set MIRROR_LINT_STRICT=1 to fail build)
X57 in Ch9-16: 18 violations across all 8 chapters
```

---

## B. Violation Table

| Ch | Q ID | type | Snippet (sentence / question) | Violation | Antonym Pair | 修法 | audio regen? |
|----|------|------|-------------------------------|-----------|-------------|------|-------------|
| 9 | kt-ch9-l2-pm1 | listen-pic | "The prince held the glass shoe…" → options: "small shiny shoe" / "big key" | X57 small↔big | small/big | Replace "a big key" with "a wooden comb on a table" (functional distractor) | No |
| 9 | kt-ch9-l3-q10 | listen-mc | "How did Cinderella feel after sisters left?" → happy↔sad | X57 happy↔sad | happy/sad | Replace "sad and alone" with "confused and quiet" — retains negative affect without being the direct antonym | No |
| 9 | kt-ch9-l4-q3 | listen-mc | "Her tears fell… soft and slow" → options: "with a loud shout" ↔ "quiet and gentle" | X57 loud↔quiet + sentence already says "soft" so "loud" is instantly eliminated | loud/quiet | Replace "with a loud shout" with "with a sudden stop" (partial-parse distractor) | No |
| 10 | kt-ch10-l5-q9 | listen-mc | "How did Chang'e's body feel?" → heavy↔light (both as emoji options) | X57 heavy↔light | heavy/light | 4 options all use emoji+adjective — replace one pole with "numb and still" | No |
| 11 | kt-ch11-l5-q7 | listen-mc | "They saw warm light, NOT burning light" → options: "painfully hot" ↔ "cold like ice" | X57 hot↔cold **+ negation in stimulus eliminates "hot" pole pre-answer** → 3→1 collapse | hot/cold | Sentence itself says "warm, not burning", so correct is obvious. Rewrite stimulus to remove the negation OR replace "cold like ice" with "bright and sharp" | No |
| 11 | kt-ch11-l6-x8 | listen-comprehension | "The sky was no longer their home. How did this ending feel?" → bittersweet↔furious/loud | X57 quiet↔loud | quiet/loud | Replace "furious and loud" with "proud and relieved" (schema-inference distractor) | No |
| 12 | kt-ch12-l7-q9 | listen-mc | "What do Chinese families do on Qixi night?" → "share old tale" ↔ "plant new flowers" | X57 old↔new | old/new | Replace "plant new flowers" with "hang red lanterns" (culturally plausible distractor) | No |
| 13 | kt-ch13-l3-q10 | listen-mc | "Should you tell a stranger where you're going?" → never↔always | X57 never↔always **+ SAME LESSON has identical topic at x9** | never/always | **P0 DOUBLE VIOLATION**: q10+x9 in same lesson both ask stranger-safety with never/always poles. Merge into 1 question OR change x9 to ask "What should you do FIRST if lost?" | No |
| 13 | kt-ch13-l3-x9 | listen-comprehension | "Should you share where you're going with a stranger?" → always↔never | X57 never↔always (2nd instance, same lesson, same topic) | always/never | See above — merge or rewrite to different sub-skill | No |
| 13 | kt-ch13-l4-q10 | listen-mc | "How did grandma feel?" → "strong and fine" ↔ "sick and weak" | X57 strong/fine↔sick/weak compound antonym | strong↔sick | Replace "strong and fine" with "tired but calm" (partial-parse) | No |
| 14 | kt-ch14-l5-q7 | listen-mc | "What did the box look like?" → "small and red" ↔ "big and black" | X57 small↔big (both include size adjective as anchor) | small↔big | Replace "big and black" with "round and golden" (local-detail distractor) | No |
| 14 | kt-ch14-l7-x5 | listen-comprehension | "When wind cleared, he was a very old man" → "became very young" ↔ "turned very old fast" | X57 young↔old **+ correct option is near-paraphrase of stimulus (X48 risk)** | young↔old | Replace "became very young" with "lost all his memories" (schema-inference); correct remains "turned very old fast" | No |
| 15 | kt-ch15-l7-x6 | listen-comprehension | "He kept walking with the slow steps of a king" → "slow and steady" ↔ "as fast as he could go" | X57 slow↔fast | slow↔fast | Replace "as fast as he could go" with "stumbling and unsure" (behavioural contrast without being antonym) | No |
| 16 | kt-ch16-l1-pm1 | listen-pic | "A tiny boy floated down the river in a bowl" → "small boy in bowl" ↔ "big man rowing boat" | X57 small↔big | small↔big | Replace "a big man rowing a boat on the sea" with "a dog swimming across the river" | No |
| 16 | kt-ch16-l2-pm1 | listen-pic | "A brave boy stood up to a big red demon" → "young boy standing tall" ↔ "old woman resting" | X57 young↔old | young↔old | Replace "an old woman resting under a tree" with "a man carrying a heavy load" | No |
| 16 | kt-ch16-l3-x5 | listen-comprehension | "How did Issun feel floating?" → "brave and full of hope" ↔ "scared of the big water" | X57 brave↔scared | brave↔scared | Replace "scared of the big water" with "curious about the big bridge" (phonological: bridge/big keeps alliteration, schema-plausible) | No |
| 16 | kt-ch16-l4-q3 | listen-mc | "Houses were tall. Streets were full of people" → "big and busy" ↔ "small like a farm" | X57 big↔small | big↔small | Replace "small like a farm" with "noisy but familiar" | No |
| 16 | kt-ch16-l7-x6 | listen-comprehension | "He looked at own hands and smiled wide" → "happy and amazed at his size" ↔ "sad about what he lost" | X57 happy↔sad | happy↔sad | Replace "sad about what he lost" with "unsure what to do next" | No |

**Unlinted A4 patterns found in manual scan:**

| Ch | Q ID | Pattern | Detail | 修法 |
|----|------|---------|--------|------|
| 11 | kt-ch11-l5-q7 | A4-NEG-STIMULUS | Sentence reads "warm light, NOT burning light" → "painfully hot" distractor is pre-eliminated by the negation before the child even hears the question. Effective option count = 2 | Remove negation from stimulus or from options (see above) |
| 15 | kt-ch15-l4-lg2 | A4-NEG-META | Q: "Why did emperor praise cloth he could NOT see?" + Opt 2: "He feared being thought NOT clever" — double negation creates metalinguistic load inappropriate for 8-12 | Rewrite opt 2: "He was afraid people would laugh at him" |
| 13 | kt-ch13-l3 | R5-JACCARD | q10 AND x9 both ask about telling strangers your location, in the same lesson. Cross-Q Jaccard overlap >> 0.4. Two near-identical safety-rule questions in one lesson doubles negation fatigue | Merge into one question; convert the second to a different sub-skill |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | 9–16 (8 chapters) |
| X57 antonym-pair violations | 18 (across all 8 chapters; **100% chapter coverage** — every chapter has ≥1) |
| Ch16 X57 count | 5 — highest single-chapter density |
| A4-unlinted (NEG-STIMULUS, NEG-META, R5-JACCARD) | 3 additional |
| Total A4 violations | 21 |
| Chapters with ≥2 X57 | Ch9(3), Ch11(2), Ch13(3), Ch16(5) |
| Questions where negation in stimulus pre-eliminates one pole | 1 confirmed (Ch11-l5-q7) |
| Same-lesson double antonym-pair same topic | 1 pair (Ch13-l3-q10 + x9) |

---

## D. Top 5 P0

### ⚠️ P0-1: Ch13-l3 — Double X57 + R5 Jaccard (CRITICAL)

`kt-ch13-l3-q10` and `kt-ch13-l3-x9` are in the **same lesson**, both asking whether to tell a stranger your location, both with **never↔always** antonym poles. This is simultaneously:
- X57 (antonym-pair) on **both** questions
- R5 Jaccard violation (near-identical content-word overlap)
- Pedagogically redundant: a child who answers q10 gets x9 for free

**Fix**: Merge into one question. Convert second slot to "What should you do if you feel unsafe?" with functional options (run, shout, hide, ask adult).

---

### ⚠️ P0-2: Ch11-l5-q7 — Negation-in-Stimulus Pre-Eliminates Antonym Pole

Stimulus: "They saw warm light, **not** burning light." Options include "painfully hot" and "cold like ice". The word "not burning" in the sentence linguistically bars the "hot" option before the question is even asked. Effective choice count: **1** (only "kind and warm" survives). This is the most degenerate case in the entire dataset.

**Fix**: Remove the negation clause from the stimulus and let the question carry the discriminative load. New stimulus: "They saw warm light instead." Or replace "painfully hot" with "dim and fading" to break the antonym pair.

---

### ⚠️ P0-3: Ch16 — Systemic X57 (5 violations in one chapter)

Ch16 (Issun Boshi) has the highest X57 density of any chapter in the dataset (5/~80 non-narration entries). Pattern: `big↔small`, `young↔old`, `brave↔scared`, `happy↔sad`, `big↔small` appear in 5 separate questions. This suggests the chapter's distractor bank was generated with a polar-opposite heuristic. All 5 need distractor replacements (see table above).

---

### P0-4: Ch14-l7-x5 — Correct Option Near-Paraphrase of Stimulus + Antonym Distractor

Stimulus: "he was a very old man with a long beard."  
Options: "became very young" ↔ "**turned very old fast**" (correct).  
The correct option echoes the stimulus near-verbatim ("very old" appears in both). This is **X48 ngram risk** + **X57 antonym** stacked. The "very young" distractor is trivially rejected by anyone who heard the audio.

**Fix**: Correct option → "aged by many decades in one breath" (paraphrase). Replace "became very young" with "found his mother waiting for him" (story-schema distractor).

---

### P0-5: Ch15-l4-lg2 — Double Negation Creates Metalinguistic Load

Q: "Why did the emperor praise cloth he could **not** see?"  
Option: "He feared being thought **not** clever."  
A 8-10 year old processing double negation (not see → not clever) under audio load is at the ceiling of A2 cognitive load. This option demands parsing "thought not clever" = "thought foolish" — a mental reversal step.

**Fix**: Rewrite option 2: "He was afraid people would think he was stupid." (plain positive form, same meaning, A2-safe register.)

---

## E. Narrative Voice / Pacing Improvements (non-violation)

Even if all X57 violations were fixed, these pacing issues remain:

1. **Ch12 (Cowherd+Weaver)**: The 7-lesson sequence has heavy X49 stimulus reuse (10 instances). Paired with the X57 at l7-q9, the lesson feels like a memory test rather than comprehension. Consider splitting the longest stimulus sentences across two narration entries to break the reuse pattern.

2. **Ch11 (Hou Yi)**: The "he did not rush" question (l3-x4) is a valid inference question, but it follows 3 consecutive listen-tf entries reusing the same stimulus. By the time a child reaches this inference question, they have seen the same sentence 3 times — the inference is no longer an inference. Reorder so inference questions come before repetition.

3. **Ch13 (LRRH)**: The stranger-safety lesson (l3) has the highest Q-density on a single moral rule. Consider splitting the safety lesson into two: "what not to do" and "what to do instead." This would also naturally resolve the q10+x9 Jaccard violation (P0-1 above) by giving each question its own lesson context.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Sources consulted:**
- Haladyna, Downing & Rodriguez 2002 (31 evidence-based item-writing rules) — antonyms explicitly banned as distractors
- Ludewig, Schwerter & McElvany 2023 (J. Psychoeducational Assessment) — empirically confirmed antonym distractors reduce item discrimination for 4th-grade vocabulary (N=924)
- ACL/BEA 2025 Workshop — automated distractor quality filters flag semantic-opposite options as primary failure mode
- PMC 2024 — non-functioning distractors (chosen by <5% of examinees) lower discrimination indices significantly

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **X57 Expansion: flag ALL polar pairs in a single Q (not just one antonym)** — e.g., if Q has both heavy/light AND hot/cold, current X57 only flags the first pair | ACL/BEA 2025, Haladyna 2002 | ✅ Pure lint expansion in `validate-lessons.js` — no src/ or JSON changes | Low (0.5 hr) | High — catches Ch10-l5-q9 (4 emoji options with two polar pairs) | **Recommend** |
| **X58 NEW: Negation-In-Stimulus Eliminates Distractor Pole** — when `sentence` contains `NOT <adj>` and one option contains `<adj>`, flag as A4-NEG-STIMULUS (distractor pre-killed by stimulus) | Haladyna 2002 R1 extension | ✅ Regex match on `(not\|never) (\w+)` in sentence vs options — JSON-only audit | Low (1 hr) | High — catches the P0-2 case (Ch11-l5-q7) and likely 5-10 others across corpus | **Strongly recommend** |
| **Distractor auto-generation with semantic-plausibility filter (LLM+wordnet)** — replace polar-opposite distractors with phonological/local-detail alternatives at generation time | ACL/BEA 2025 — Generating Plausible Distractors via Student Choice Prediction (arxiv 2501.13125) | 🟡 Partially fits: the model routing table (CLAUDE.md) already uses Fable 5 for distractor rewrite; adding a post-generation semantic-similarity gate (wordnet antonym check before accepting distractor) would prevent recurrence. Requires a small Node.js util to call WordNet API. | Medium (3-4 hr) | Very High — prevents structural recurrence of X57 across all future content batches | **Recommend post current-fix sprint** |
| **R5 Jaccard Cross-Q lint for same lesson** — current X57 flags per-Q; R5 flag cross-Q content overlap (q10+x9 same lesson same topic) | Haladyna 2004 Ch.4 (inter-item independence) | ✅ Already spec'd in `pickup-q-design-standard-v1.md` §R5 but NOT implemented in `validate-lessons.js`. Add Jaccard cross-Q pass per lesson. | Medium (2 hr) | High — catches P0-1 (Ch13-l3 double same-topic question) | **Recommend** |

**Pickup 架構 verdict**: All 4 patterns are JSON/lint-layer changes only — zero src/ modification needed. The highest-ROI immediate action is adding X58 (negation-in-stimulus) lint and expanding X57 to cover multiple polar pairs per question. ARCH-REC #188 covers items 1+2 (the lint expansions); ARCH-REC #189 covers item 3 (LLM distractor gate); ARCH-REC #190 covers item 4 (R5 Jaccard lint implementation).

> **ARCH-REC #188: X188_NEG_STIMULUS_ANTONYM_LINT** — Add X58 lint (negation-in-stimulus eliminates distractor pole) + expand X57 to flag all antonym polar pairs per question (not just first). Implementation: `validate-lessons.js` regex + option-set scan. Est. 1.5 hr.
