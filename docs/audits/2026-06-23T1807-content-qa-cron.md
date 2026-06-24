# Content QA — 2026-06-23 18:07 UTC

Today's angle: **#5 — A3 語意 leak (story 跳針) / Narrative Coherence & Continuity**
Focus: **Ch0–Ch8** (core 8-night story arc)

Rotation basis: A3 last run 2026-06-12T1811 (11 days gap — oldest unrun angle).

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json: 7 lessons
WARN lessons-ch1.json: 3 lint issue(s)
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
OK  lessons-ch2.json: 7 lessons
OK  lessons-ch3.json: 7 lessons
OK  lessons-ch4.json: 7 lessons
WARN lessons-ch5.json: 1 lint issue(s)
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
OK  lessons-ch6.json: 7 lessons
OK  lessons-ch7.json: 7 lessons
OK  lessons-ch8.json: 7 lessons
Total mirror-lint issues: 70 (warn-only)
```

All Ch0–Ch8 JSON files pass shape validation. Lint warnings flagged above are pre-existing X2/X3 issues; no new schema breaks.

---

## B. A3 Violation Table

### A3 Sub-type legend
- **A3-1** Chronological leak (event referenced before its narrative position)
- **A3-2** Character confusion (wrong character attributed action/state)
- **A3-3** Object/setting anachronism (object not yet introduced in story arc)
- **A3-4** Tone break (register mismatch — adult jargon / jaded affect in 奶奶睡前 voice)
- **A3-5** Internal inconsistency (two Qs in same lesson contradict each other)
- **A3-6** Pacing skip (critical narrative beat absent; story jumps)

| Ch | Q-ID | type | snippet | sub-type | violation | 修法 | audio regen? |
|----|------|------|---------|----------|-----------|------|-------------|
| 4 | kt-ch4-l1-q10 | listen-mc | "A man in white arrived on a white camel" | **A3-1** P0 | Djinn / magical intervention referenced before causal setup (camel's laziness arc) is complete — spoils cause-effect chain; child listener has no context for white rider | Add 1 bridging narration beat introducing "a strange traveller" before this Q; delay djinn reveal | ✅ narration line |
| 6 | kt-ch6-l2-q11 | listen-mc | "Shirts not warm but something would change at dawn" | **A3-5** P0 | Same lesson states shirts are magical (curse-transformation device) yet Q implies they're merely "not warm" — contradictory framing of the shirts' function | Replace "not warm" framing with "not finished yet" — preserves urgency without contradicting magic | ✅ rephrase Q |
| 8 | kt-ch8-l1-q9 | listen-mc | "Mother said build strong house / brothers mock third pig" | **A3-4** P0 | Mother's safety wisdom is immediately undercut by sibling ridicule in same lesson — premature reversal erodes trust in 奶奶's moral voice; mixed message for 8-12 audience | Split: lesson L1 ends with Mother's wisdom; sibling mockery moves to L2 as narrative tension | ❌ structural |
| 2 | kt-ch2-l2-q7 | listen-mc | "Duck learns to fly from farmyard" | **A3-3** P1 | Wild ducks (the flying teachers) not introduced until later; referencing flight ability presupposes knowledge of who teaches duck | Add "野鴨來了" narration to L2 before this Q, or move Q to L3 | ✅ narration line |
| 5 | kt-ch5-l1-q11 | listen-mc | "Go get fire from Baba Yaga" | **A3-3** P1 | Baba Yaga's identity and danger level not yet established; stepmother's command lands without the witch-hazard context a first-time child listener needs | Precede with 1 narration: "奶奶說:有個住在雞腳屋的女巫叫 Baba Yaga…" | ✅ narration line |
| 6 | kt-ch6-l2-q4 | listen-mc | "Six white shirts for six brothers" | **A3-5** P1 | Number and purpose given explicitly in same lesson beat; removes the discovery arc (count builds mystery) — reduces narrative tension | Reveal count in two steps: "some shirts" in L2 Q4, "six shirts — one for each" in L3 | ✅ rephrase |
| 7 | kt-ch7-l2-q11 | listen-mc | "Mother watching behind rocks… something cold turned inside her" | **A3-6** P1 | Mother's decision to kill the fish is metaphorised ("something cold") without explicit narration — child listeners miss cause-effect for fish's disappearance | Add plain-language narration: "奶奶說:她媽媽看到了大魚,她很嫉妒…" before metaphor | ✅ narration line |
| 8 | kt-ch8-l2-q7 | listen-mc | "First pig happy and lazy — smiled and ate" | **A3-4** P1 | Narrative celebrates avoidance behaviour with "smile and ate" tone before consequences shown — sends mixed message (lazy = pleasant); foreshadowing absent | Change "smiled and ate" to "smiled... but the wind was growing stronger" | ✅ rephrase sentence |
| 0 | kt-ch0-l2-q3 | listen-mc | "Mochi found in rain / grandma knew him before" | **A3-5** P2 | Prologue hints at prior relationship yet framing positions Mochi as fresh discovery — minor inconsistency in foundling-vs-acquaintance setup | Standardise: either "first meeting" OR "old friends" — pick one across L1-L3 | ❌ |
| 1 | kt-ch1-l2-q6 | listen-mc | "Baby Momotaro grows fast" | **A3-6** P2 | Time jump from peach discovery to "growing up" collapses 3-4 narrative beats (naming, first steps, village wonder) into one Q — pacing too compressed | Split growth arc across 2 Qs: L2-q6 = naming, L2-q7 = first steps/wonder | ❌ minor |
| 3 | kt-ch3-l3-q9 | listen-mc | "Hare proud and sleeping but overconfidence not solidified" | **A3-5** P2 | Early lesson frames hare's boasting; sleeping scene treats nap as inevitable rather than character choice — weakens motivation chain | Add 1 narration: "Hare thought: 'I'm so fast, I have time for a rest.'" | ✅ narration line |
| 5 | kt-ch5-l2-q11 | listen-mc | "Nobody who found her came back" | **A3-1** P2 | Spoils Vasilisa's outcome (she survives) in preamble before her quest begins — removes narrative tension | Change to "Many people feared Baba Yaga" (non-specific, tension intact) | ✅ rephrase |
| 7 | kt-ch7-l1-q8 | listen-mc | "Year after year no kind word" | **A3-4** P2 | Slightly jaded existential weight in "奶奶睡前故事" voice — "year after year" + "no kind word" carries adult-sadness register | Soften: "Day after day, nobody played with Yexian" (same meaning, child register) | ✅ rephrase |

---

## C. Stats

| Severity | Count |
|----------|-------|
| P0 | 3 |
| P1 | 5 |
| P2 | 5 |
| **Total A3** | **13** |

Audio regen needed: 8 items (narration additions or sentence rephrase)
Structural (lesson split): 2 items (Ch8-l1-q9, Ch1-l2-q6 minor)

---

## D. Top 5 P0

1. **⚠️ Ch4 kt-ch4-l1-q10 — A3-1 Chronological Leak**: Djinn white-rider appears before causal setup complete; 8yo listener has zero context for "man in white" — spoils magical arc reveal. Fix: 1 bridging narration beat.

2. **⚠️ Ch6 kt-ch6-l2-q11 — A3-5 Internal Inconsistency**: "Shirts not warm" contradicts shirts' role as the magical transformation device in same lesson. Directly confuses the central object of the Six Swans plot. Fix: rephrase to "not finished yet."

3. **⚠️ Ch8 kt-ch8-l1-q9 — A3-4 Tone Break**: Mother's core safety wisdom is negated within the same lesson by brotherly mockery — moral authority of "奶奶's voice" broken before it can resonate. Fix: structural split across L1/L2.

4. **Ch5 kt-ch5-l1-q11 — A3-3 Object Anachronism** (P1 elevated): First mention of Baba Yaga as a mission target with no introduction; witch-hazard context entirely absent for child listener encountering this story for the first time.

5. **Ch7 kt-ch7-l2-q11 — A3-6 Pacing Skip** (P1): Fish's death is one of the most emotionally important beats in Yexian (葉限); metaphorising the cause without plain narration means 8yo children miss the "why" — comprehension monitoring gap confirmed by PMC 2021 research on children's temporal/causal tracking.

---

## E. Narrative Voice / Pacing Improvements (even beyond violations)

1. **Ch0 outer-prologue pacing**: L1-q1 (Mochi jumps wall) → L1-q2 (Hana wags tail) → L1-q3 (grandma opens book) are currently 3 independent micro-scenes with no connective tissue. Adding one "bridge" narration between each — "奶奶微笑,翻開書的第一頁" — would create the "settling in" feeling of an actual bedtime story ritual, reinforcing the 奶奶-framing before the inner story starts.

2. **Lesson recap narration beat** (Ch2, Ch3, Ch5): After the story's climax lesson, a one-sentence grandma "reflection" narration ("奶奶合上書說:『你覺得呢?』") would model the parent-child debrief moment that research on dialogic reading (Bus et al. 2023; PMC dialogic reading 2025) shows significantly boosts comprehension retention in 8-12 EFL learners.

3. **Temporal marker density** (Ch4 Kipling, Ch6 Grimm): PMC research (Children's comprehension monitoring of multiple situational dimensions, 2021) found children struggle more with *temporal* than *causal* coherence tracking. Ch4 and Ch6 have the fewest temporal markers in options ("one day" / "at dawn" / "that night" types). Enriching options in 2-3 Qs per lesson with explicit time anchors would both improve comprehension and reduce A3-1 risk in future content.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis

- **PMC 2021 — Children's comprehension monitoring of multiple situational dimensions**: Children aged 8-10 validate *emotional* and *causal* information while it's in working memory, but fail to monitor *temporal* and *spatial* dimension breaks (Rapp et al. 2021 replication). This directly explains why Ch4 A3-1 and Ch6 A3-5 violations went unnoticed in content authoring — no field forces temporal tracking.
- **FairytaleQA (arxiv 2203.13947)**: Fairy-tale narrative comprehension questions categorised by 7 narrative dimensions (character, setting, feeling, causal-relationship, outcome, prediction, etc.) — apps using explicit dimension tagging show higher coverage across comprehension sub-skills.
- **Tinker Tales / SparkTales (arxiv 2602.04109 / 2603.04806 2026)**: Multi-dimensional scaffolding tags in collaborative storytelling apps ensure no dimension cluster — same pattern applicable to lesson authoring.

### Proposed pattern: `narrativeDimension` field on question entries

Add optional `narrativeDimension` field to `listen-mc` / `listen-comprehension` entries in `lessons-ch*.json`:

```json
{
  "type": "listen-mc",
  "narrativeDimension": "causal",   // WHO | WHERE | WHEN | WHY | HOW | FEELING | OUTCOME
  ...
}
```

`validate-lessons.js` then checks per-lesson dimension distribution:
- `WHEN` (temporal) ≥ 1 per 8-Q lesson  
- `WHO` + `WHERE` ≥ 2 combined  
- No dimension > 60% of Qs (prevents causal-only clustering)

This directly:
- **Prevents A3-1** (chronological leak) — `WHEN` questions force explicit temporal anchor in sentence
- **Prevents A3-3** (object anachronism) — `WHERE` questions force setting establishment before Q
- **Catches A3-6** (pacing skip) — `OUTCOME` dimension forces climax lesson to include result beat

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| `narrativeDimension` field + per-lesson distribution lint | FairytaleQA (2022) / PMC dimensional comprehension monitoring (2021) / Tinker Tales (2026) | ✅ Additive JSON field, backward-compatible (`.optional()` in Zod), lint rule in validate-lessons.js — fixes structural root cause of A3-1/A3-3/A3-6 class | Medium (field additions to 32 ch JSON × avg 8 Qs + 1 lint rule ~80 lines) | High — prevents entire A3 class at authoring time, aligns with FairytaleQA best practice, differentiates from Duolingo's dimension-untagged story items | **X23 — ARCH-REC #70: A3_NARRATIVE_DIMENSION_TAG** |

---

### Cockpit row (auto-parsed by cockpit JS):

```
ARCH-REC #70: X23_A3_NARRATIVE_DIMENSION_TAG
Pattern: narrativeDimension field (WHO/WHERE/WHEN/WHY/HOW/FEELING/OUTCOME) on listen-mc/comprehension entries + per-lesson distribution lint in validate-lessons.js
Source: FairytaleQA arxiv 2203.13947 / PMC Children's Comprehension Monitoring 2021 / Tinker Tales arxiv 2602.04109
Pickup fit: ✅ additive JSON field + 1 Zod optional() + ~80-line lint rule; backward-compatible; prevents A3-1/A3-3/A3-6 class at authoring time
Effort: Medium | ROI: High
Fixes root cause of: Ch4-l1-q10 (A3-1), Ch8-l1-q9 structural, Ch7-l2-q11 (A3-6), Ch5-l1-q11 (A3-3)
Audit file: docs/audits/2026-06-23T1807-content-qa-cron.md
```
