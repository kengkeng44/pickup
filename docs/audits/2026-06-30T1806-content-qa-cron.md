# Content QA — 2026-06-30 18:06 UTC

Today's angle: **A2 — Cloze Blank Position (start / mid / end)**
Focus: **Ch9–16** (灰姑娘 / 嫦娥奔月 / 后羿射日 / 牛郎織女 / 小紅帽 / 美女與野獸 / 國王的新衣 / 拇指湯姆)

**Angle definition (A2 Cloze Blank Position)**:
In a grammar-mc item, the position of the blank (`___`) within the sentence determines how much contextual support a learner receives:

| Position | Blank ratio | Left context | Right context | Expected difficulty |
|----------|------------|-------------|--------------|---------------------|
| **START** | < 0.25 | None | Full | Lower: right-context leaks tense/grammar |
| **MID** | 0.25–0.75 | Partial | Partial | Optimal for A2 |
| **END** | > 0.75 | Full | None | Higher: no right-context fallback |

**Context availability theory** (Schwanenflugel & Shoben 1991; Nassaji 2003; Read 2000) establishes that learners rely on both left- and right-context to infer missing words. START-position blanks allow test-wise learners to use the full right-context to resolve tense, person, and morphology without actually understanding the target verb. END-position blanks force full commitment from prior text — the highest diagnostic fidelity. A balanced lesson should distribute blanks across all three zones.

**Additional sub-violation A2-TENSE-LEAK**: When a START-position blank appears and the right-context contains an explicit tense marker (e.g. "while X V-ed", "before he V-past"), the tense of the blank is inferrable from the surrounding clause without knowing the verb's past form — the item measures tense recognition, not verb knowledge.

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  5 lint issue(s)  (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3)
WARN lessons-ch10.json: 4 lint issue(s)  (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×1, X48_NGRAM_VERBATIM ×1)
WARN lessons-ch11.json: 11 lint issue(s) (X2_OPTION_LIST_BIAS ×2, X48_NGRAM_VERBATIM ×1, X49_STIMULUS_REUSE ×5, other ×3)
WARN lessons-ch12.json: 10 lint issue(s) (X2_OPTION_LIST_BIAS ×1, X49_STIMULUS_REUSE ×9)
WARN lessons-ch13.json: 7 lint issue(s)  (X2_OPTION_LIST_BIAS ×3, X49_STIMULUS_REUSE ×3)
WARN lessons-ch14.json: 3 lint issue(s)  (X2_OPTION_LIST_BIAS ×1, X48_NGRAM_VERBATIM ×2)
WARN lessons-ch15.json: (see master log)
WARN lessons-ch16.json: (see master log)
Total mirror-lint issues: 235 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Ch9–16 scope: **8 chapters · ~630 non-narration items · 26 grammar-mc items with blanks**

---

## B. Violation Table

### A2-P0-END-POSITION-ABSENCE (structural, all chapters)

> **Critical structural gap**: Across all 26 grammar-mc items in Ch9–16, **zero items have a blank at the END position** (ratio > 0.75). Every blank is at START (42%, 11/26) or MID (58%, 15/26). This means:
> - Learners always have right-context available — items never reach B1-ceiling diagnostic fidelity
> - Test-wise learners can often resolve tense from right-side clause structure alone
> - After 8 full chapters, no item trains "infer the verb from what came before"

| Ch | Q ID | type | sentence | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| ALL | ch9–16 (0/26) | grammar-mc | — | **A2-END-ZERO**: 0 end-position blanks across all 8 chapters — cap on difficulty ceiling | Add ≥1 end-position item per chapter: rewrite one sentence so blank falls at final verb/adjective position | No |

**Chapter-by-chapter blank position distribution:**

| Ch | Start (ratio<0.25) | Mid (0.25-0.75) | End (ratio>0.75) | Total grammar-mc |
|----|-------------------|-----------------|-----------------|-----------------|
| 9 | 0 | 2 | 0 | 2 |
| 10 | 2 | 2 | 0 | 4 |
| 11 | 1 | 3 | 0 | 4 |
| 12 | 4 | 2 | 0 | 6 |
| 13 | 2 | 1 | 0 | 3 |
| 14 | 2 | 1 | 0 | 3 |
| 15 | 2 | 0 | 0 | 2 |
| 16 | 0 | 2 | 0 | 2 |
| **Total** | **13 (50%)** | **13 (50%)** | **0 (0%)** | **26** |

---

### A2-P1-TENSE-LEAK (2 items — after-context exposes tense)

| Ch | Q ID | type | sentence | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 11 | kt-ch11-l3-x5 | grammar-mc | "He ___ a deep breath **before he let** the arrow fly." | START-LEAKY: "before he let" contains past "let" → right-context leaks past tense; correct=took; learner can infer past tense without knowing "took" | Move blank to mid: "He took a deep breath ___ he let the arrow fly." (target word: **before**) OR rewrite sentence without past-tense after-clause | Possibly (if sentence rewritten) |
| 10 | kt-ch10-l4-x5 | grammar-mc | "Chang'e _____ very still **while the student demanded** the pill." | START-LEAKY: "while...demanded" = explicit past clause after blank → tense of blank (stood) inferrable from "demanded"; correct=stood | Restructure: put subordinate clause before blank: "While the student demanded the pill, Chang'e _____ very still." (now MID, tense not leaked by right alone) | Possibly |

---

### A2-P2-START-BLIND (9 items — high frequency, systematic pattern)

> All items have blank at sentence-first position (subject + ___), giving learners **zero left-context**. The full semantic and grammatical frame comes entirely from the right. These items function primarily as **right-context recognition** tasks, not verb-form production tasks.

| Ch | Q ID | type | sentence | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 10 | kt-ch10-l2-gm1 | grammar-mc | "She _____ the pill in a small box." | START-BLIND ratio=0.14; no left-context; correct=hid | Add context before: "Afraid of the student, she _____ the pill in a small box." (now MID) | No |
| 12 | kt-ch12-l2-gm1 | grammar-mc | "Zhinu ___ cloth for the sky every day." | START-BLIND ratio=0.14; "every day" makes this present-simple giveaway too | Reframe: "By hand, Zhinu ___ cloth for the whole sky." (removes habitual tell, adds left-context) | No |
| 12 | kt-ch12-l4-x8 | grammar-mc | "The Queen ___ a line across the sky with her silver pin." | START-BLIND ratio=0.18 | "With her silver pin, the Queen ___ a line across the sky." (now MID with purpose left-context) | No |
| 12 | kt-ch12-l5-x8 | grammar-mc | "His feet ___ the ground as the wind gently held him." | START-BLIND ratio=0.20 | "Lifted by the wind, his feet ___ the ground." (now MID, causal left-context) | No |
| 12 | kt-ch12-l7-x8 | grammar-mc | "Children ___ at two bright stars across the silver river." | START-BLIND ratio=0.11 | "Every night, children ___ at two bright stars across the silver river." (MID, temporal left-context) | No |
| 13 | kt-ch13-l3-x8 | grammar-mc | "The wolf ___ his head and smiled at the girl." | START-BLIND ratio=0.22; "and smiled" leaks present/past agreement | "Friendly and calm, the wolf ___ his head and smiled at the girl." (MID, manner left-context) | No |
| 13 | kt-ch13-l6-x8 | grammar-mc | "He ___ the snoring and knew something was wrong." | START-BLIND ratio=0.12; "and knew" leaks past tense | "Coming closer to the bed, he ___ the snoring and knew something was wrong." (MID, circumstance left-context) | No |
| 14 | kt-ch14-l3-x4 | grammar-mc | "She _____ him into a long dining hall full of light." | START-BLIND ratio=0.10 | "Gently, she _____ him into a long dining hall full of light." (MID, manner left-context) | No |
| 14 | kt-ch14-l7-x4 | grammar-mc | "Slowly, he _____ the gold rope and opened the lid." | ratio=0.22; "Slowly," is a sentence-initial adverb before subject+blank; still start-blind for subject | Prepend causal: "His hands trembling, he slowly _____ the gold rope and opened the lid." (now MID ~0.35) | No |

---

### A2-P3-HABITUAL-TENSE-AMBIGUITY (2 items)

> Items where a time marker ("every day", "every single day") makes the correct tense (present simple) obvious from context alone, eliminating the grammar challenge.

| Ch | Q ID | type | sentence | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 12 | kt-ch12-l2-gm1 | grammar-mc | "Zhinu ___ cloth for the sky every day." correct=weaves | "every day" is a categorical habitual marker → correct tense trivially inferrable even without knowing verb form; only gist = "which present form" (weave/weaves) which is person agreement, not tense | Remove "every day" OR add a tense distractor that includes "weaved" (past) as plausible | No |
| 15 | kt-ch15-l2-gm1 | grammar-mc | "The emperor ___ new clothes every single day." correct=wears | Same pattern as above: "every single day" = habitual present; learner recognizes present without comprehending | Replace with "The emperor ___ new clothes that morning." (past context forced, no habitual marker) | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch9–16 grammar-mc total | 26 |
| Start-position (ratio < 0.25) | 13 (50%) |
| Mid-position (0.25–0.75) | 13 (50%) |
| End-position (> 0.75) | **0 (0%)** |
| A2-P1 TENSE-LEAK | 2 |
| A2-P2 START-BLIND | 9 |
| A2-P3 HABITUAL-TELL | 2 |
| Chapters with 0 end-position items | **8/8 (100%)** |
| Chapters with >50% start-position | 4/8 (Ch12, Ch13, Ch14, Ch15) |

---

## D. Top 5 P0

1. **⚠️ [P0] END-POSITION ABSENCE (Ch9–16, structural)** — 0/26 grammar-mc items have end-position blanks. Every item gives learners right-context to lean on; no item trains "full left-context commitment." This is the single biggest diagnostic ceiling issue in Ch9–16 grammar-mc. Fix: add ≥1 end-position item per chapter (e.g. rewrite one sentence so the key verb falls at the end: "The wolf smiled and ___." → correct=nodded).

2. **⚠️ [P1] TENSE-LEAK kt-ch11-l3-x5** — "He ___ a deep breath before he let the arrow fly." The after-clause "before he let" gives away past tense. Correct=took. Restructure to put the subordinate clause before the blank.

3. **⚠️ [P1] TENSE-LEAK kt-ch10-l4-x5** — "Chang'e _____ very still while the student demanded the pill." "demanded" in after-clause leaks past tense of blank (stood). Fix: put "While the student demanded the pill" before the blank.

4. **[P2] START-BLIND CLUSTER Ch12 (4/6 items)** — Ch12 has the highest concentration of start-position blanks (67%). Items kt-ch12-l2-gm1, l4-x8, l5-x8, l7-x8 all begin with Subject+blank. This uniformity means learners develop a right-scan reflex rather than left-integration skill.

5. **[P2] HABITUAL-TELL Ch12+Ch15** — kt-ch12-l2-gm1 "every day" and kt-ch15-l2-gm1 "every single day" make present-simple tense trivially obvious. The grammar-mc reduces to a person-agreement task (weave vs. weaves) rather than a tense task, understating the diagnostic value.

---

## E. Narrative Voice / Pacing Improvements (3 items, no violation)

Even where no R1-R8 rule is broken, the following items have room for voice or pacing improvement:

1. **Bland sentence reuse pattern in grammar-mc stems**: Most start-position grammar-mc sentences follow `SUBJECT ___ OBJECT prepphrase.` (8/13 start items). Varying to adverb-initial or subordinate-clause-initial would add linguistic variety and naturally shift blank position to mid. Example fix: "Frightened but still, Chang'e _____ very still." This also models adverb placement for learners.

2. **"Which word fits the blank?" vs. "Which word is correct?" inconsistency**: Ch10 and Ch11 alternate between these two question stems for identical item types. Standardize to one formulation per age group (suggestion: "Which word fits the blank?" — more child-friendly and directly addresses the visual blank marker).

3. **Grammar-mc explanationZh over-explains**: Several items explain the grammatical rule in full metalinguistic terms (e.g. "是過去式 simple past"). For 8-12 learners this is adult register. Prefer story-integrated explanation: instead of "hid 是 hide 的過去式", use "她把藥丸 hid（藏好）在盒子裡——就是 hide 的過去式！" — the story context comes first, grammar label second.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source research**: Context availability theory (Schwanenflugel & Shoben 1991 Psych Rev); "Difficulty-Controllable Cloze Question Distractor Generation" (arXiv 2511.01526, 2025); Duolingo English Test Fill-in-the-Blanks design (goarno.io 2026) — "Position the blank at mid-sentence for optimal balance; avoid start-of-sentence blanks that allow test-wise learners to exploit right-context grammar cues."

**Finding**: Current Pickup grammar-mc items distribute 50% start / 50% mid / 0% end. Duolingo's own DET fill-in-the-blank design guide (2026) recommends blank placement that prevents test-wise elimination from right-context. arXiv 2511.01526 proposes "difficulty-controllable" distractor generation keyed to blank position — end-position items are consistently harder and more diagnostic, especially for verb form (past vs. present) since no right-context clause exposes tense.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **X55_BLANK_POS_BALANCE lint** — Flag chapters where all grammar-mc blanks are start/mid with 0 end-position items | arXiv 2511.01526; Duolingo DET 2026 design guide | ✅ — validate-lessons.js scan: `sentence.indexOf('___') / sentence.length > 0.75` per grammar-mc item; warn if chapter has ≥5 grammar-mc and 0 end-position | 0.5 hr | High — surfaces structural ceiling issue that no current lint catches; actionable for content team with simple sentence rewrites | **ARCH-REC #99: X55_BLANK_POS_BALANCE lint** |

### ARCH-REC #99: X55_BLANK_POS_BALANCE

**What**: Add lint rule to `tools/validate-lessons.js` that scans grammar-mc items and warns when a chapter has ≥5 grammar-mc blanks with 0 end-position items.

**Detection logic**:
```js
// For each chapter in the corpus:
const grammarMC = questions.filter(q => q.type === 'grammar-mc' && q.sentence?.includes('___'));
if (grammarMC.length >= 5) {
  const endPos = grammarMC.filter(q => {
    const words = q.sentence.split(' ');
    const idx = words.findIndex(w => w.includes('___'));
    return idx / Math.max(words.length - 1, 1) > 0.75;
  });
  if (endPos.length === 0) warn(`${chapterId}: X55_BLANK_POS_BALANCE — 0 end-position grammar-mc (${grammarMC.length} items, all start/mid)`);
}
```

**Pickup 架構 fit**: ✅ 完全 compatible — `lessons-ch*.json` 的 grammar-mc `sentence` 欄位有 `___` 作為 blank marker，可直接掃 word index ratio。不需改 schema，純 lint。warn-only 不影響 build。

**Content fix**: For each chapter flagged, rewrite one grammar-mc sentence so the blank falls at sentence end. Example:
- Ch12 add: "The two stars shone bright every year as the magpies ___." (target: gathered / flew / came)
- Ch13 add: "When the hunter burst in, the wolf turned and ___." (target: ran / fled / jumped)

**ROI**: High — closes a structural gap across 8 consecutive chapters. 0.5 hr lint implementation; 8 sentences to add in content JSON files.
