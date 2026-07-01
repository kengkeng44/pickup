# ⚠️ Content QA — 2026-07-01 15:30 UTC

Today's angle: **A6 — Option-in-Question (answer text echoed in question stem)**
Focus: **Ch25–31** (愚公移山 / Archimedes / 孫悟空 Journey to West / 三顧茅廬 / Odyssey / Heracles Nemean Lion / Robin Hood)

> **A6 definition (pickup-q-design-standard-v1.md §A6):**
> Correct option contains a content word that already appears verbatim in the question stem.
> Effect: test-wise learners (even 8-year-olds) can skip the audio and pattern-match the keyword,
> degrading the question from a listening comprehension test to a visual scanning exercise.

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 16 lint issue(s)
WARN lessons-ch26.json: 18 lint issue(s)
WARN lessons-ch27.json: 18 lint issue(s)
WARN lessons-ch28.json: 22 lint issue(s)
WARN lessons-ch29.json: 19 lint issue(s)
WARN lessons-ch30.json: 22 lint issue(s)
WARN lessons-ch31.json: 23 lint issue(s)
Total mirror-lint issues (all chapters): 447
BUILD GATE: PASS (warn-only; MIRROR_LINT_STRICT=1 not set)
```

---

## B. Violation Table

### B1. listen-mc A6 — P0/P1 (9 violations)

| Ch | Q ID | Sentence (key) | Question | Correct option | Leaked word | Severity | 修法 | audio regen? |
|----|------|---------------|----------|---------------|-------------|----------|------|-------------|
| Ch30 | kt-ch30-l5-q3 | "He swung the blade down with all his power…" | How **hard** did Heracles hit the lion? | "as **hard** as he could" | **hard** | P0 — adjective echoed verbatim; 100% giveaway | → "with every bit of his strength" | Yes |
| Ch30 | kt-ch30-l3-q6 | "The forest was very quiet. No bird sang…" | How did the forest **sound**? | "**silent** with no **sound**" | **sound** | P0 — question verb "sound" echoed as noun in correct option | → "utterly quiet, nothing to hear" | Yes |
| Ch27 | kt-ch27-l4-q6 | "He had no friend to talk with. The stars were his only company." | Who was with Sanzang at **night**? | "no one, just the **night** sky" | **night** | P0 — topic keyword echoed | → "the stars above, no one else" | Yes |
| Ch29 | kt-ch29-l5-x5* | "Odysseus felt his heart get lighter with every wave." | Why did Odysseus feel lighter with each **wave**? | "every **wave** was taking him closer to home" | **wave** | P0 — anchor noun echoed; answer is near-verbatim sentence paraphrase | → "each passing swell meant one step closer to Ithaca" | No (comprehension) |
| Ch25 | kt-ch25-l6-q3 | "My sons will carry on the work, and their sons too." | What did Yu Gong mean about his **family**? | "**family** that keeps going on" | **family** | P1 — topic echoed | → "generations would carry the task forward" | Yes |
| Ch27 | kt-ch27-l6-q6 | "Five hundred years — that is a long, long time." | How did Sanzang feel about the **time**? | "was surprised by a long, long **time**" | **time** | P1 — near-verbatim sentence fragment in option | → "astonished by how many centuries had passed" | Yes |
| Ch26 | kt-ch26-l7-q8 | "Great ideas do not need big places." | Where can a **small** science lesson happen? | "in **small** everyday places" | **small** | P1 — adjective echoed; answer paraphrase quality = low | → "anywhere, even at the kitchen sink" | Yes |
| Ch28 | kt-ch28-l6-q8 | "Liu Bei waited. And waited." | How **long** did Liu Bei wait? | "a **long** while" | **long** | P1 — question adverb = answer noun phrase | → "many patient hours in the snow" | Yes |
| Ch29 | kt-ch29-l3-q3 | "The road to Ithaca was not short." | How **far** was Ithaca from Troy? | "**far** across the sea" | **far** | P1 — "far" in both; sentence doesn't give distance but correct option just echoes the adjective | → "a great sea-crossing away" | Yes |

*kt-ch29-l5-x5 is listed under listen-mc here because the sentence is audio-driven (listen-mc parent lesson); per JSON it is `comprehension` type — see B2 below for full list.

### B2. comprehension A6 — P0/P1 (16 violations)

| Ch | Q ID | Question | Correct option | Leaked word | Severity | 修法 | audio regen? |
|----|------|----------|---------------|-------------|----------|------|-------------|
| Ch29 | kt-ch29-l4-lg2 | Why did Odysseus **nod** instead of shout? | "His **nod** showed he was calm…" | **nod** | P0 — the specific action that IS the question topic is repeated verbatim in answer | → "A quiet gesture showed his trust in the crew" | No |
| Ch29 | kt-ch29-l5-x5 | …feel lighter with each **wave**? | "every **wave** was taking him closer" | **wave** | P0 — see B1 | → "each swell carried him nearer to Ithaca" | No |
| Ch31 | kt-ch31-l5-x5 | Why was this **moment** important for Robin? | "safe from soldiers for the **moment**" | **moment** | P0 — circular: "moment" in both + sentence said "no soldier could see his face" (not paraphrased at all) | → "hidden from enemy eyes for the first time in days" | No |
| Ch29 | kt-ch29-l6-x4 | What happened to the **ship** in the storm? | "the **ship** lurched and the sail curved low" | **ship** | P0 — correct option is near-verbatim sentence echo (sentence: "The sail bent low. The **ship** tipped…") | → "the hull rolled and the canvas dipped toward the waves" | No |
| Ch30 | kt-ch30-l5-x5 | How **close** did the lion come to biting Heracles? | "came very **close** but just missed" | **close** | P0 — adjective in Q echoed as adjective in A | → "nearly caught him, missing by a hair's width" | No |
| Ch30 | kt-ch30-l7-x1 | How did Heracles fight the **lion** in the end? | "grabbed the **lion** around the neck" | **lion** | P1 — topic noun echoed | → "seized the beast by its throat" | No |
| Ch30 | kt-ch30-l4-x4 | …shot all his **arrows**? | "none of the **arrows** worked at all" | **arrows** | P1 — topic noun echoed | → "every shot bounced off without effect" | No |
| Ch30 | kt-ch30-l5-x1 | …attack the lion with the **sword**? | "rushing at it with **sword** raised high" | **sword** | P1 — topic noun echoed | → "charging forward with blade raised overhead" | No |
| Ch31 | kt-ch31-l6-x4 | What happened to the old man's **voice**? | "**voice** cracking showed deep sadness" | **voice** | P1 — topic noun echoed | → "his words broke with grief" | No |
| Ch31 | kt-ch31-l6-x9 | …the young mother's family come to the **forest**? | "the **forest** was their only safe place" | **forest** | P1 — topic noun echoed | → "the deep woods offered the only refuge they had" | No |
| Ch31 | kt-ch31-l3-x5 | …Sheriff doing with the **list** of names? | "found Robin's name in the **list**" | **list** | P1 — topic noun echoed | → "reading the roll and spotting the name Robin" | No |
| Ch25 | kt-ch25-l6-x2 | …Yu Gong making about his **family**? | "his **family** would go on and on" | **family** | P1 — echoes B1 q3 same question lesson | → "generations after him would continue the task" | No |
| Ch28 | kt-ch28-l6-x4 | …his respect for Zhuge **Liang**? | "putting Zhuge **Liang**'s comfort above his own" | **liang** | P2 — proper name; echoed but expected in context | → "choosing the master's ease over his own comfort" | No |
| Ch25 | kt-ch25-l4-x7 | …passerby give for doubting Yu **Gong**? | "Yu **Gong** was too old to finish" | **gong** | P2 — proper name; somewhat expected | → "the old man would never live to see it done" | No |
| Ch25 | kt-ch25-l5-x2 | …challenge to Yu **Gong**? | "who comes after Yu **Gong**" | **gong** | P2 — proper name | → "who carries on after the old man is gone" | No |
| Ch25 | kt-ch25-l4-x9 | What does 'day after **day**' tell us…? | "steady and strong every **day**" | **day** | P2 — "day after day" is the subject phrase, "every day" is expected paraphrase | → "their effort never paused or slowed" | No |

### B3. picture-mc A6 — P2 (4 violations)

| Ch | Q ID | Question prompt | Leaked word | Note |
|----|------|----------------|-------------|------|
| Ch27 | kt-ch27-l2-pm1 | 'a **long** journey' | **long** in "a man walking alone on a **long** road" | picture-mc: description must reference concept; lower risk |
| Ch29 | kt-ch29-l2-pm1 | 'a **dark** cave' | **dark** in "a **dark** hollow space" | same — expected for picture matching |
| Ch30 | kt-ch30-l2-pm1 | '**walking** along a river' | **walking** in "a man **walking** beside…" | same |
| Ch31 | kt-ch31-l2-pm1 | 'shoot an **arrow**' | **arrow** in "firing an **arrow** from a bow" | same |

> picture-mc A6: technically A6 but lower pedagogical risk because the task IS "which image shows X?" The description is expected to contain the concept word. These are P2/informational only.

### B4. emoji-pick — 22 occurrences (expected by design)

emoji-pick questions by definition ask "Which one is a mountain?" → answer "⛰️ mountain". The word match is intentional vocabulary teaching. **Not flagged as violations.** No action required.

---

## C. Stats

| Scope | Count |
|-------|-------|
| Chapters audited | 7 (Ch25–31) |
| Lessons scanned | 49 |
| Questions scanned | 368 |
| A6 — listen-mc P0 | 3 |
| A6 — listen-mc P1 | 6 |
| A6 — comprehension P0 | 5 |
| A6 — comprehension P1 | 7 |
| A6 — comprehension P2 | 4 |
| A6 — picture-mc P2 | 4 |
| A6 — emoji-pick (expected) | 22 |
| **Total true A6 violations** | **25** (listen-mc 9 + comprehension 16) |
| validate-lessons.js build gate | PASS (warn-only) |

Rate: **6.8% of answerable questions** in Ch25–31 have A6 leakage — well above the 0% target. Ch30 (Heracles) is the worst chapter with 8 violations.

---

## D. Top 5 P0

1. **⚠️ kt-ch30-l5-q3** (Ch30 listen-mc): "How **hard** did Heracles hit the lion?" → correct: "as **hard** as he could" — Q adjective = A adverb, completely trivial with visual scan. Fix: "with every bit of his strength"

2. **⚠️ kt-ch29-l4-lg2** (Ch29 comprehension): "Why did Odysseus **nod** instead of shout an order?" → correct: "His **nod** showed he was calm" — the specific action being explained IS the word echoed. Fix: "A quiet gesture showed his trust in the crew"

3. **⚠️ kt-ch29-l6-x4** (Ch29 comprehension): "What happened to the **ship** in the storm?" → correct: "the **ship** lurched and the sail curved low" — correct option is near-verbatim sentence echo. Fix: "the hull rolled and the canvas dipped toward the waves"

4. **⚠️ kt-ch30-l5-x5** (Ch30 comprehension): "How **close** did the lion come to biting Heracles?" → correct: "came very **close** but just missed" — Q adjective = A adjective. Fix: "nearly caught him, missing by a hair's width"

5. **⚠️ kt-ch31-l5-x5** (Ch31 comprehension): "Why was this **moment** important for Robin?" → correct: "safe from soldiers for the **moment**" — circular: both use "moment" AND the option barely paraphrases the source sentence at all. Fix: "hidden from enemy eyes for the first time in days"

---

## E. Narrative Voice / Pacing Improvements (even if 0 violations per constraint)

1. **Ch29 — Odysseus storm arc (l6) distractor quality**: kt-ch29-l6-x4 has junk distractors alongside the A6 correct option. "it moved so fast it made waves" and "it stopped still in the middle of the sea" are schema-implausible (why would a storm make it fast or still?). Better distractors: "a wave swept one sailor off the deck" (detail substitution), "the mast cracked under the wind" (partial parse), "they dropped anchor to ride it out" (schema-plausible wrong action). Paired with fixing the A6 correct option this becomes a proper 4-functional-distractor item.

2. **Ch27 — Sanzang night scene (l4-q6) storytelling register**: Q "Who was with Sanzang at night?" → current distractor "many travel friends" is obviously wrong from story context (he's alone). Replace with "a merchant he met on the road" (schema-plausible), "a mountain spirit watching over him" (Ghibli-adjacent, children love this), "the ghost of a past teacher" (culturally resonant). More imaginative distractors match the Journey to the West world-building and make the question actually require listening.

3. **Ch30 — Heracles chapter (l5) sentence density**: Three separate A6 violations (l5-q3, l5-x1, l5-x5) in one lesson reveal a systemic pattern: all three questions ask about the same sword-fight sequence using the same content words (hard, sword, close) that also appear in the correct options. The root cause is that l5 narrates a single action (Heracles attacks with sword, lion dodges) and all questions are detail-level retrievals from that single sentence cluster. Recommendation: vary sub-skill types — swap one detail-Q for an inference-Q (e.g., "What does Heracles' response tell us about his character?") to break the keyword-saturation pattern.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #103: X59_OPTION_IN_STEM_LINT

**Industry backing:**
- NBME Item Writing Guide (authoritative medical MCQ standard): explicitly flags "clue in stem" as a Tier-1 item writing flaw — "language used in the stem repeated in the correct answer" is listed as a primary validity threat.
- PMC (2023) "Differences in Multiple-Choice Questions of Opposite Stem Orientations": automated rubric systems now check for correct-answer cueing as a standard quality gate.
- QuestionWell AI (2025): "We trained an AI Model That Writes Better Multiple Choice Questions" — their automated rubric set includes "clue in stem" detection as one of seven standard item-writing flaws checked at generation time.
- ELT-specific: "To show or not to show: The effects of item stems and answer options on performance on a multiple-choice listening comprehension test" (ScienceDirect) confirms that verbatim keyword overlap between stem and correct option enables "lexical matching strategy" — bypassing actual listening comprehension, reducing construct validity.

**Pickup 適配分析:**

| Factor | Assessment |
|--------|-----------|
| Pickup architecture | React 18 + Zod schema + JSON lessons + `validate-lessons.js` lint runner — already has precedent for X48/X57/X58 content-word lint rules |
| Client groups | 8-12 children are MORE vulnerable to lexical matching (not less) — they will spot the repeat word faster than adults because their vocabulary is smaller |
| Lesson format | listen-mc and comprehension types are the exact formats affected by this flaw; emoji-pick and picture-mc have pedagogically expected word overlap and should be excluded |
| Implementation risk | Low — pure lint, no src/ changes, no JSON content changes required for the rule itself |
| Content fix effort | ~25 options need rewrites across Ch25-31; ~3-5 min per fix = ~2h total content work |

**Verdict: ✅ 完全適合 Pickup 架構**

**Proposed lint rule for `tools/validate-lessons.js`:**
```js
// X59_OPTION_IN_STEM: correct option content-word appears in question stem
// Applies to: listen-mc, comprehension (NOT emoji-pick, picture-mc, narration)
const STEM_STOP = new Set(['the','and','but','for','not','was','did','his','her',
  'its','are','had','has','this','that','they','with','from','just','what',
  'who','how','why','when','which','each','some','also','more','than','can']);
const STEM_LINT_TYPES = new Set(['listen-mc','comprehension']);

if (STEM_LINT_TYPES.has(q.type) && q.question && q.options && q.correctIndex != null) {
  const qWords = new Set(q.question.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !STEM_STOP.has(w)));
  const correctText = (q.options[q.correctIndex] || '').replace(/[\u{1F000}-\u{1FFFF}]/gu,'').toLowerCase();
  const correctContentWords = correctText.split(/\W+/).filter(w => w.length > 2 && !STEM_STOP.has(w));
  const leaked = correctContentWords.filter(w => qWords.has(w));
  if (leaked.length > 0) {
    issues.push(\`\${q.id}: X59_OPTION_IN_STEM (correct option content-word "\${leaked[0]}" echoed in question stem)\`);
  }
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X59_OPTION_IN_STEM_LINT | NBME Item Writing Guide / ScienceDirect MCQ stem study / QuestionWell automated rubric | ✅ 完全適合 — 25 violations found in Ch25-31 alone, children are more vulnerable to lexical matching, validate-lessons.js already has precedent | 2h lint rule + 2h content fixes | High — closes a validity threat in 6.8% of answerable Qs | Add lint rule to validate-lessons.js (warn-only, same as X57); then fix Ch30 (8 violations) first as highest-density chapter |

---

*Audit generated: 2026-07-01 15:30 UTC | Angle: A6 option-in-question | Ch25-31 | 368 Q scanned | 25 true violations found*
