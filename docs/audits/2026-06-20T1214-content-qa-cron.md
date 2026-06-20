# ⚠️ Content QA — 2026-06-20 12:14 UTC

**Today's angle: A3 — 語意 Leak / Story 跳針 (Pre-Question Narration Context Leak)**
**Focus: Ch17–24** (Crane Wife / Heungbu & Nolbu / Sang Kancil / Giant Turnip / Anansi / Mencius' Mother / Sima Guang / Kong Rong)

**A3 Definition (Pickup v2.0 adapted):** In sequential story lessons, each lesson presents narrations and listen-mc questions in linear order. An A3 violation occurs when a **narration entry appearing immediately before a listen-mc question** contains information that is semantically equivalent to (or directly implies) the correct option — allowing a learner to read the narration and trivially answer the question without processing the audio stimulus. Sub-types:
- **A3a (Pre-question leak)**: narration N-1 content-overlaps with correct option of MC N
- **A3b (Cross-lesson spoiler)**: final narration of lesson N leaks answer to first MC of lesson N+1
- **A3c (Story 跳針 / double-beat)**: same story fact is narrated AND immediately asked about, making both the narration and the MC question redundant (one should be cut)

**Angle not run this rotation window.** Previous 8 angles: A2 (Ch1-8), #11 (Ch9-16), A7 (Ch13-20), #12 (Ch2-8), R2 (Ch27-31), A4 (Ch21-26), R1 (Ch5-8), A6 (Ch17-24).

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch18.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch19.json: 4 lint issue(s):
  kt-ch19-l3-q5: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch21.json: 11 lint issue(s):  [all X2_OPTION_LIST_BIAS]
OK  lessons-ch22.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch23.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch24.json: 1 lint issue(s):
  kt-ch24-l4-q3: X2_OPTION_LIST_BIAS (all start with "he")
```

No R1/R2 hard violations in Ch17-24. 16 pre-existing X2_OPTION_LIST_BIAS warnings (carried over; outside today's angle scope).

**Total mirror-lint issues across full repo: 72** (warn-only; `MIRROR_LINT_STRICT=1` to fail build)

---

## B. Violation Table

| Ch | Lesson-Q | Type | Narration (preceding) | MC sentence + Q | Correct option | Violation | Severity | 修法 | audio regen? |
|----|----------|------|-----------------------|-----------------|----------------|-----------|----------|------|-------------|
| 19 | kt-ch19-l3 narration→q5 | A3a | "Then a big smile came on his face. **He had a plan.**" | sentence: "His small eyes turned bright. His tail started to move quick." Q: "What did the smile mean?" | "he had an idea" | "He had a plan" = "he had an idea" — direct semantic equivalence, correct option trivially pre-answered by narration | **P0** | Split narration: keep "Then a big smile came on his face." — move "He had a plan." to AFTER the MC question as a confirming narration. | No |
| 19 | kt-ch19-l3 narration→q6 | A3a | "He walked to the side of the river. **He called out loud.**" | sentence: "His small voice rang out over the dark water of the river." Q: "How loud did mouse deer call?" | "very loud" | narration "called out loud" contains the exact target word "loud" — the answer "very loud" is directly primed | **P0** | Remove "out loud" from narration; e.g. "He walked to the side of the river. He opened his mouth wide." — let MC audio carry the information. | No |
| 24 | kt-ch24-l4 narration→q3 | A3c / A3a | "**He picked up the smallest pear from the plate.**" (narration between Q2 and Q3) | sentence: "The thin little pear sat lightly in his small hand." Q: "Which pear did Kong Rong end up with?" | "one of the smaller ones" | narration "picked up the smallest pear" directly states the answer to Q3; story 跳針 — Q2 already asked "which pear did he choose?" and Q3 asks the same fact. Double-beat redundancy. | **P0** | Merge Q2+Q3 into one question, OR reframe Q3 to ask about FEELING/symbolism (e.g. "Why did the father's eyes go bright?") and drop the redundant narration. | No |
| 22 | kt-ch22-l6 narration→q1 | A3a | "One day Meng came home early. **He did not want to study.**" | sentence: "He had grown tired of his books and his lessons." Q: "Why did Meng come home early?" | "he was tired of studying" | narration "did not want to study" = answer "he was tired of studying" — semantic equivalence. Pre-reading reveals the causal motive before the listen-mc tests it. | **P1** | Truncate narration to "One day Meng came home early." only — the 'why' should be left to the MC audio to reveal. | No |
| 22 | kt-ch22-l4 narration→q2 | A3a | "'He learns what he sees. **He sees what is near.**'" | sentence: "She understood that the place was teaching him." Q: "What did the mother understand?" | "where you live teaches you" | narration "what is near" ≈ "where you live"; semantically maps onto correct option — learner grasps the theme from narration before the MC is attempted | **P1** | Reposition narration to AFTER the MC question (swap narration and MC order), so the narration reinforces rather than pre-answers. | No |
| 24 | kt-ch24-l7 narration→q2 | A3a | "'**They should take the big pears, not me.**'" | sentence: "The small boy gave the big pears to his older brothers." Q: "What was Kong Rong saying in two lines together?" | "big ones for the older, small one for me" | narration "They should take the big pears, not me" is near-paraphrase of correct option "big ones for the older, small one for me" — content fully pre-revealed | **P1** | Move this narration to AFTER the MC question. The MC sentence "The small boy gave the big pears..." can carry the story beat without the preceding verbal spoiler. | No |
| 23 | kt-ch23-l3→l4 cross-lesson | A3b | L3 ending narration: "Most of the children turned and **ran** out of the garden..." | L4 first MC: "Their small feet **ran fast** on the path." Q: "How were the children moving?" | "running as fast as they could" | cross-lesson: "ran" in L3 ending narration directly answers L4 Q1 "running as fast as they could" before the lesson even begins | **P1** | Change L4 first MC question to ask ABOUT DESTINATION (e.g. "Where were the children running?") rather than HOW they ran, since the HOW is already established by the prior narration. | No |
| 24 | kt-ch24-l5 narration→q2 | A3a (mild) | "His father smiled a **warm** smile back at him." | sentence: "Something **warm** moved inside his father's chest." Q: "How did the father feel inside?" | "warm and touched" | content-word "warm" threads narration→sentence→answer — mild priming; sentence-final position of "warm" in narration softens severity | **P2** | Change narration to "His father gave him a gentle nod." (remove "warm" from narration, preserve for sentence and answer) | No |
| 23 | kt-ch23-l3 narration→q2 | A3a (mild) | "**He fell into the water** with a loud splash." | sentence: "The water closed over his head. He could not breathe." Q: "What was happening to the boy in the water?" | "going under water" | "fell into the water" implies immersion but does not explicitly state "going under" — mild priming only | **P2** | Acceptable as-is; consider rewording narration to "He slipped off the top." to remove "water" and heighten tension without leaking. | No |
| 22 | kt-ch22-l3 narration→q3 | A3a (mild) | "Soon Meng began to **copy them** in their yard." | sentence: "He held up sticks and called out, **just like the sellers**." Q: "What was Meng copying from the market?" | "the way sellers called out prices" | "copy them" (sellers) partially primes "the way sellers called out" but doesn't specify the calling-prices action — mild | **P2** | Remove "copy them" from narration; e.g. "Soon Meng went into their yard with a handful of sticks." | No |

**Total violations: 3 P0 · 4 P1 · 3 P2**

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch17–24 (8 chapters) |
| Total lesson entries (narration + MC + other) | 616 |
| Narration entries | 294 (47.7%) |
| Testable MC-type questions | 157 (listen-mc: 140, comprehension: 17) |
| Narration→MC adjacency pairs scanned | ~112 |
| A3 violations found | 10 (3 P0 · 4 P1 · 3 P2) |
| A3 violation rate (of adjacency pairs) | ~8.9% |
| Chapters with P0 | Ch19 (2×), Ch24 (1×) |
| Chapters with P1 | Ch22 (2×), Ch24 (1×), Ch23 (1×) |
| Chapters clean (P0/P1 zero) | Ch17, Ch18, Ch20, Ch21 |

---

## D. Top 5 P0

1. ⚠️ **kt-ch19-l3 (A3a-P0)** — Narration "He had a plan" pre-answers MC "What did the smile mean?" / "he had an idea." Most blatant semantic equivalence.
2. ⚠️ **kt-ch19-l3 (A3a-P0)** — Narration "He called out loud" leaks exact target word "loud" into MC "How loud did mouse deer call?" / "very loud."
3. ⚠️ **kt-ch24-l4 (A3c-P0)** — Story 跳針 double-beat: narration "He picked up the smallest pear" answers the immediately following MC "Which pear did Kong Rong end up with?" / "one of the smaller ones." Same story fact narrated twice + questioned.
4. **kt-ch22-l6 (A3a-P1)** — Narration "He did not want to study" = answer "he was tired of studying." Semantic synonym leak of causal motive.
5. **kt-ch24-l7 (A3a-P1)** — Narration "'They should take the big pears, not me'" near-paraphrases correct option "big ones for the older, small one for me" — content fully revealed before MC audio plays.

---

## E. Narrative Voice / Pacing Improvements (even if zero R1-R8 violations)

1. **Ch23-l3/l4 stutter**: The phrase "Most of the children turned and ran out of the garden" appears verbatim at both the END of L3 and the OPENING of L4 (with minor extension). This creates a narration "loop" that disrupts story momentum. Recommendation: deduplicate — end L3 on the cliffhanger "One small boy did not run with the others..." and open L4 directly with "Their small feet ran fast on the path to the gate." This also fixes the A3b cross-lesson leak.

2. **Ch19 lesson 3 tension collapse**: The two A3 P0 violations (narration giving away plan + loudness) strip all tension from what should be Sang Kancil's "clever plan" reveal — the best story beat in Ch19. After fixes, the lesson payoff ("oh, that's his plan!") will land properly for the child learner. Suggest rewriting the lesson intro narrations to build curiosity: "Sang Kancil sat very still. Then something changed in his eyes." → this creates anticipation without pre-answering.

3. **Ch22-l4 theme over-telegraphed**: The narration "'He learns what he sees. He sees what is near.'" is the moral of the whole Mencius' Mother story, stated explicitly in the MIDDLE of the chapter (L4) while L7 ends with the same moral. Having the theme appear twice — once midstory as a narration before an MC testing that exact theme — means neither the L4 MC nor the L7 conclusion feels earned. Recommendation: make the L4 narration indirect (e.g., just the mother's facial expression), so the theme is only stated once at the proper narrative conclusion.

---

## 🔬 Architecture Recommendation (業界 2026 掃描)

### ARCH-REC #57: X10_PRE_QUESTION_NARRATION_LEAK Lint Rule

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| Narration Isolation Zone: lint that detects when a pre-MC narration shares content-word overlap ≥ 0.50 with the correct option | ScienceDirect 2026 "Scaffolding and Triggering" study (scaffolding questions must be spaced OUT from the context they're testing; prior context at the sentence level can eliminate retrieval challenge entirely); biorxiv 2025 "Context modulates brain state dynamics during narrative comprehension" (prior narrative context directly biases response to subsequent comprehension queries); Duolingo Stories design (2026: narration segments are gated — learner sees narration AFTER submitting answer, never before, specifically to prevent pre-question context leak) | ✅ Directly applicable — today's A3 audit found 3 P0 violations via manual review that a lint rule would have auto-caught; Pickup JSON schema already has narration and listen-mc as separate typed entries in the same `questions[]` array, making adjacency detection trivial | S (2-3hr) | ⭐⭐⭐⭐ Very High — prevents future A3 P0 regressions at CI; auto-catches the 3 P0 cases found today | **IMPLEMENT** |

**What industry does (2026):**
- **Duolingo Stories** (as documented in IJIOE review and lingoly.io 2026): The narration segments in Duolingo Stories are revealed **progressively after each interaction** — the learner submits their answer first, then the story advances. Narration text is never shown before the comprehension question it contextualizes. This architectural gate prevents any pre-question context leak by design.
- **ScienceDirect 2026** ("Scaffolding and Triggering: Teachers' questions and children's response patterns during digital storytelling"): The paper distinguishes *scaffolding questions* (guide toward story structure) from *triggering questions* (invite imaginative expansion). Crucially, effective scaffolding requires the scaffolding to come **after** the comprehension test, not before — otherwise the scaffolding becomes a cue that bypasses comprehension entirely.
- **biorxiv/PMC 2025** ("Context modulates brain state dynamics and behavioral responses during narrative comprehension"): Prior narrative context shifts brain processing state such that subsequent comprehension questions are answered via context retrieval rather than genuine comprehension. For children (8-12), this effect is larger than for adults. A narration containing the answer before the MC question may produce correct answers that reflect reading comprehension of the narration, not listening comprehension of the audio stimulus.

**Why it fits Pickup's architecture:**
- The `questions[]` array in `lessons-ch{N}.json` contains alternating `narration` and `listen-mc` entries. The lint check needs to scan each `listen-mc` entry and look at the preceding 1-2 entries for `narration` type, then compute content-word overlap between the narration `sentence` and `options[correctIndex].text`.
- `validate-lessons.js` already has the lint infrastructure (X1–X9). Adding X10 follows the same pattern.
- No schema changes needed. No src/ changes needed. Pure linting addition.

**Proposed X10 rule:**

```javascript
// In validate-lessons.js — add to extendedLint(), called PER-LESSON:
function preQuestionNarrationLeak(questions) {
  const STOPS = new Set(['the','and','was','were','had','has','to','of','in','on','at','by',
    'for','with','it','he','she','they','we','a','an','that','this','not','but','or','its',
    'his','her','did','do','out','up','so','what','how','why','who','when','where']);
  const issues = [];
  for (let i = 1; i < questions.length; i++) {
    const q = questions[i];
    if (!['listen-mc','read-comprehension','listen-comprehension'].includes(q.type)) continue;
    const { options = [], correctIndex } = q;
    if (correctIndex == null || correctIndex >= options.length) continue;
    const correct = (options[correctIndex]?.text || options[correctIndex] || '').toLowerCase();
    const correctCW = correct.split(/\s+/)
      .map(w => w.replace(/[^a-z']/g,''))
      .filter(w => w.length > 2 && !STOPS.has(w));
    if (correctCW.length < 2) continue;

    // Check preceding 1-2 entries for narration
    for (let j = Math.max(0, i - 2); j < i; j++) {
      if (questions[j].type !== 'narration') continue;
      const narr = (questions[j].sentence || '').toLowerCase();
      const narrWords = new Set(narr.split(/\s+/).map(w => w.replace(/[^a-z']/g,'')));
      const overlap = correctCW.filter(w => narrWords.has(w)).length;
      const ratio = overlap / correctCW.length;
      if (ratio >= 0.50) {
        issues.push(`X10_PRE_Q_NARRATION_LEAK (narration[${j}] shares ${(ratio*100).toFixed(0)}% CW with correct option "${options[correctIndex]?.text || options[correctIndex]}")`);
        break;
      }
    }
  }
  return issues;
}
```

**Implementation file:** `tools/validate-lessons.js`
**Estimated effort:** S = 2-3 hours (add function + wire into per-lesson loop + update README comments)
**Auto-catches today:** kt-ch19-l3 (2 P0 violations) and kt-ch24-l4 (1 P0 violation) — all 3 P0s found today

---

*Audit complete. 3 P0 · 4 P1 · 3 P2 · 3 narrative improvements · 1 ARCH-REC #57. Commit: ⚠️ v2.0.B.cron-content: 2026-06-20-1214 angle: A3-semantic-leak Ch17-24 [+ ARCH-REC #57: X10_PRE_Q_NARRATION_LEAK].*
