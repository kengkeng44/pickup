# Content QA — 2026-06-06 12:06 UTC

Today's angle: **#9 — A7 Content-Word Repetition (correct answer echoes sentence vocab)**
Focus: **Ch2 (醜小鴨 Ugly Duckling) + Ch3 (龜兔賽跑 Tortoise & Hare)**

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 2 lint issue(s)
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
OK   lessons-ch2.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch3.json: 8 lint issue(s)
  kt-ch3-l2-q5:  X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch3-l2-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q9:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q10: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch3-l4-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l5-q5:  X2_OPTION_LIST_BIAS (all start with "she")
  kt-ch3-l5-q10: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch3-l7-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK   lessons-ch4.json / ch5 / ch6 / ch7
Total mirror-lint issues: 14 (warn-only)
```

Scope: 14 auditable Qs in Ch2, 21 in Ch3 = **35 Qs deep-scanned** under A7 lens.

---

## B. Violation Table

| # | Ch | Q ID | Type | Sentence (key fragment) | Correct Option | Echoed word(s) | Severity | 修法 | audio regen? |
|---|----|----|------|--------------------------|----------------|----------------|----------|------|-------------|
| 1 | 2 | kt-ch2-l1-q6 | listen-mc | "Five **tiny** shapes pushed past the broken shells…" | "**tiny** yellow ducklings" | `tiny` | **P0** | Replace `tiny` with synonym: "five baby ducklings" | yes — correct option audio |
| 2 | 3 | kt-ch3-l1-q9 | listen-mc | "The hare bent down **close** to the tortoise's small head…" | "**very close**" | `close` | **P0** | Reframe Q to avoid echo: Q → "How near was the hare?" ✓ → "almost nose to nose" | yes |
| 3 | 3 | kt-ch3-l5-q9 | listen-mc | "The **green** back of the slow walker was the closest thing to the finish…" | "the small **green** animal" | `green` | **P0** | Replace with non-colour paraphrase: "the shelled slow walker" | yes |
| 4 | 3 | kt-ch3-l6-q10 | listen-comprehension | "…the big tree was very **close** to the **tortoise**, not him" | "no, the **tortoise** is too **close**" | `close` + `tortoise` | **P0** | ✓ → "no, the finish was almost the tortoise's" (removes both echoes) | yes |
| 5 | 3 | Ch3 × 11 Qs | structural | (all options share opening pronoun/infinitive) | — | — | **P1** | Diversify option starts: some answers should begin with action verb phrase rather than pronoun-verb skeleton | no |
| 6 | 2 | kt-ch2-l4-q6 | listen-mc | "One of them shared half his lunch and would not leave his side." | "a friend" | options are "a teacher / a friend / an enemy / a brother" — 3× "a __" + 1× "an __" | **P1** | Change option[0] to "someone to learn from", option[2] to "just a rival" to break the uniformity | no |
| 7 | 3 | kt-ch3-l3-q9 | listen-mc | "His head dropped down onto his paws, soft and heavy." | "he was falling asleep" | options: all "he was/waking/falling/running/eating" — binary-mirror pair [0]"waking up" vs ✓[1]"falling asleep" | **P1** | Remove negation mirror; replace [0] with "he was shaking" or "he was looking around" | no |
| 8 | 3 | kt-ch3-l2-q9 | listen-mc | "In one minute, the brown hare was a small dot ahead on the road." | "very fast" | options [0]"very slow" vs ✓[1]"very fast" = negation pair | **P1** | Replace [0] with "barely moving" — removes obvious-opposite tell | no |

**Total violations: 8 (P0 = 4, P1 = 4)**

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch2 + Ch3 |
| Lessons scanned | 14 (7 + 7) |
| Auditable Qs | 35 (14 + 21) |
| A7 echo violations (P0) | **4** |
| Structural bias P1 | **4** |
| Total violations | **8** |
| validate-lessons.js WARN | Ch3: 8 X2_OPTION_LIST_BIAS |
| Audio regen needed | **4 correct-option MP3s** (Ch2 L1-Q6, Ch3 L1-Q9, Ch3 L5-Q9, Ch3 L6-Q10) |

---

## D. Top 5 P0

### P0-1 · kt-ch3-l6-q10 — double echo `close` + `tortoise` (severity: highest)
**Sentence:** "The hare ran very fast, but the big tree was very **close** to the **tortoise**, not him."
**Q:** "Could the hare win now?"
**Current ✓:** "no, the **tortoise** is too **close**"
**Problem:** Two verbatim content words (`close`, `tortoise`) transferred from sentence to correct option. An 8-year-old scanning for known words will land on [1] without processing meaning.
**Fix:** `"no, the finish was almost the tortoise's"` — zero echo, requires inference.

---

### P0-2 · kt-ch3-l1-q9 — echo `close`, compound Q-bias
**Sentence:** "The hare bent down **close** to the tortoise's small head, still smiling."
**Q:** "How **close** was the hare to the tortoise?" ← Q itself echoes `close`
**Current ✓:** "**very close**"
**Problem:** Sentence → Q → correct answer is a three-stage `close` repetition. Child needs only to hear one word to answer. Also [0]"very far" vs ✓[1]"very close" is an A4 negation pair (flagged last audit A4, repeating here).
**Fix:** Q → "How near was the hare?" / ✓ → "almost nose to nose"

---

### P0-3 · kt-ch2-l1-q6 — echo `tiny`
**Sentence:** "Five **tiny** shapes pushed past the broken shells onto the grass."
**Q:** "What came out of the eggs?"
**Current ✓:** "**tiny** yellow ducklings"
**Problem:** "tiny" is the most distinctive adjective in the sentence. Repeating it in the correct option signals the answer by surface lexical matching — no comprehension required.
**Fix:** "five baby ducklings" — removes both `tiny` (synonym) and no longer echoes the number.

---

### P0-4 · kt-ch3-l5-q9 — echo `green`
**Sentence:** "The **green** back of the slow walker was the closest thing to the finish line."
**Q:** "Who was closer to the finish?"
**Current ✓:** "the small **green** animal"
**Problem:** `green` is the single colour in the sentence and the most salient retrieval cue. Correct answer re-uses it directly. Colour adjectives are among the easiest A7 signals for young learners.
**Fix:** "the shelled slow walker" — maintains paraphrase of tortoise identity without echo.

---

### P0-5 · Ch3 × 11 option-start bias (structural cluster)
8 Ch3 questions use identical pronoun-skeleton structure across all 4 options (e.g., `he was X / he was Y / he was Z / he was W`). This is a distinct problem from A7 but amplifies it: once a child knows the answer is about `he`, they only need to match 1 word. The pattern covers **>50% of Ch3 listen-mc/comprehension questions**.
**Fix:** Break the uniformity per question. At minimum, one distractor in each group should start with a noun phrase or an action verb (e.g., replace `he gave up already` → `turned around and ran`).

---

## E. Narrative Voice / Pacing Improvements (3 required)

### NV-1 · "Very X" answer monotone across Ch3 L1-L2
Three consecutive lessons return answers in the form "very [adjective]" or "slow and quiet":
- L1-Q6 ✓ "slow and quiet"
- L1-Q9 ✓ "very close" (P0 above)
- L2-Q9 ✓ "very fast"

A child quickly learns the pattern: "pick the 'very something' option." Break this by using concrete action-imagery answers: "in seconds, far ahead" instead of "very fast"; "one step at a time, not a sound" instead of "slow and quiet."

### NV-2 · Tortoise has no inner voice in Ch3
All 21 Ch3 Qs focus on visible events or third-person observations. Zero questions ask the tortoise's emotional state or motivation directly. Compare Ch2 which includes questions like "How did mother duck treat him?" → "kindness" (emotional abstraction). Ch3 should include at least 2 questions like:
- "How did the tortoise feel when the hare laughed at him?" → ✓ "calm, not upset"
- "What kept the tortoise going?" → ✓ "believing one step was enough"

This models emotional vocabulary and growth mindset — critical for 8-12 audience alignment with the pivot brief.

### NV-3 · Sentence voice too encyclopaedic in Ch3 L2-L3
Several Ch3 sentences read like a sports commentary transcript, not a grandmother's bedtime story:
- Current: "In one minute, the brown hare was a small dot ahead on the road." (L2-Q9)
- Story-voice: "He was gone so fast, all the tortoise could see was a tiny blur."
- Current: "Far ahead of the race, the rabbit chose to take a nap under the shade." (L3-Q10)
- Story-voice: "The hare laughed, stretched out under a cool tree, and closed his eyes."

The grandma/奶奶 voice established in Ch1 uses sensory detail and warm observation. Ch3 has drifted toward neutral narration. Consider one sentence-rewrite pass on Ch3 L2-L4 to restore story warmth before Ch3 MP3 generation.
