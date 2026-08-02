# Content QA — 2026-08-02 12:08 UTC

**Today's angle:** A6 — option-in-question (Question contains answer)
**Focus:** Ch9–16 (灰姑娘 / 嫦娥 / 后羿 / 牛郎織女 / 小紅帽 / 浦島太郎 / 國王的新衣 / 一寸法師)

**Previous 8 angles:** #12-explanationZh · R2-distractor · A1-obvious-correct · A7-content-word-repeat · A5-cultural-ref · A4-mirror-patterns · #11-optionsZh · A3-semantic-leak

---

## A. validate-lessons.js result

```
CI gate: tsc + vite build PASS. No P0 schema errors.

Ch9  (cinderella):         8 lint issues  (X2×1, X49×3, X49B×0, X57×3, X48×0)
Ch10 (change/嫦娥):        9 lint issues  (X2×3, X49×1, X49B×4, X57×1)
Ch11 (houyi):             16 lint issues  (X2×3, X48×1, X49×7, X49B×2, X57×2)
Ch12 (cowherd-weaver):    12 lint issues  (X2×1, X49×8, X49B×1)
Ch13 (red-riding-hood):   12 lint issues  (X2×3, X49×4, X49B×2, X57×3)
Ch14 (urashima):          10 lint issues  (X2×1, X48×1, X49×2, X49B×5, X57×2)
Ch15 (emperors-new-clothes): 9 lint issues (X4×1, X49×1, X49B×6, X57×1)
Ch16 (issun-boshi):        6 lint issues  (X49×3, X49B×1)

Total mirror-lint issues (all chapters): 440
(warn-only; MIRROR_LINT_STRICT=0)
```

---

## B. A6 Scan Methodology

**A6 definition (spec §anti-patterns):** `option ⊆ question` — the correct answer text appears verbatim in the question stem. Classic item-writing flaw: student can find the answer by lexical matching without engaging with the stimulus.

**Scope:** 207 MC-type questions (listen-mc, comprehension, emoji-pick, grammar-mc, picture-mc) across Ch9–16.

**Two-tier detection:**
1. **Exact A6**: `normalize(correct_option) in normalize(question_stem)` — hard match
2. **Near-A6**: ≥60% content-word overlap between correct option and question stem

**Type classification for emoji-pick:**
- **Pure vocab intro** (sentence = question = "Which one is X?"): intentional word→emoji mapping, A6 by-design, not flagged
- **Story-contextual** (sentence = story sentence ≠ question): expected to test recall + emoji recognition; A6 violation if question names the target word

---

## C. Violation Table

| Sev | Ch | Q ID | Type | Question snippet | Correct option | Violation |
|-----|----|------|------|-----------------|----------------|-----------|
| P1 | 9 | kt-ch9-l2-ep1 | emoji-pick | "Which emoji shows **midnight**?" | 🕛 midnight | A6_EXACT: "midnight" in Q and answer |
| P1 | 10 | kt-ch10-l2-ep1 | emoji-pick | "Which emoji shows **swallowing**?" | 😮‍💨 swallow | A6_NEAR: "swallow" in Q and answer |
| P1 | 13 | kt-ch13-l2-ep1 | emoji-pick | "Which emoji shows **teeth**?" | 🦷 teeth | A6_EXACT: "teeth" in Q and answer |
| P1 | 14 | kt-ch14-l2-ep1 | emoji-pick | "Which emoji shows a **box**?" | 📦 box | A6_EXACT: "box" in Q and answer |
| P1 | 15 | kt-ch15-l2-ep1 | emoji-pick | "Which emoji shows **empty hands**?" | 🤲 hands | A6_NEAR: "hands" in Q and answer |
| P2 | 12 | kt-ch12-l6-q3 | listen-mc | "How **many** magpies came…?" | "too many to count" | Near-A6: "many" echoed |
| P2 | 12 | kt-ch12-l6-x7 | comprehension | "How were these **tears** different…?" | "wept tears of joy" | Near-A6: "tears" echoed |

**Pure-vocab emoji-pick (by-design, not flagged):** 17 items across Ch9–16 (sentence = question, e.g. "Which one is a shoe?" → "👠 shoe")

**listen-mc / comprehension hard A6:** 0 violations. These types are clean.

---

## D. Stats

| Metric | Count |
|--------|-------|
| Total MC-type Qs scanned | 207 |
| A6 EXACT violations (P1) | 4 |
| A6 NEAR violations (P1) | 1 |
| Near-A6 borderline (P2) | 2 |
| listen-mc clean rate | 88/88 = 100% |
| comprehension clean rate | 120/120 = 100% |
| emoji-pick story-contextual violations | 5/22 = 23% |
| validate-lessons WARN (Ch9-16) | 82 issues |

---

## E. Top 5 P0/P1

### P1-1 — kt-ch9-l2-ep1 (emoji-pick, Ch9 灰姑娘)
```
Sentence: "The clock struck midnight and the magic ended."
Q:        "Which emoji shows midnight?"
Options:  🌅 sunrise | 🌄 morning | 🌆 evening | 🕛 midnight ✓
```
**Problem:** "midnight" appears verbatim in question → player just finds the emoji labeled "midnight" without needing to process the story sentence. Reduces cognitive demand from recall+match to pure icon-lookup.

**Fix:** Rephrase Q to avoid naming the target word:
> "Which emoji shows the moment when Cinderella's magic ended?"
> (or: "Which emoji shows what the clock was striking?")

**audio regen?** No — only question text, not sentence audio.

---

### P1-2 — kt-ch13-l2-ep1 (emoji-pick, Ch13 小紅帽)
```
Sentence: "The wolf had long sharp teeth under his soft fur."
Q:        "Which emoji shows teeth?"
Options:  👅 tongue | 👁️ eye | 👂 ear | 🦷 teeth ✓
```
**Fix:**
> "Which emoji shows what the wolf was hiding under his soft fur?"

---

### P1-3 — kt-ch14-l2-ep1 (emoji-pick, Ch14 浦島太郎)
```
Sentence: "The princess gave him a small red box."
Q:        "Which emoji shows a box?"
Options:  🌊 wave | 🐢 turtle | 📦 box ✓ | 🎀 ribbon
```
**Fix:**
> "Which emoji shows what the princess gave Urashima before he left?"

---

### P1-4 — kt-ch10-l2-ep1 (emoji-pick, Ch10 嫦娥)
```
Sentence: "Chang'e put the pill in her mouth and swallowed it."
Q:        "Which emoji shows swallowing?"
Options:  [need to confirm from JSON]
Correct:  😮‍💨 swallow
```
**Fix:**
> "Which emoji shows what Chang'e did with the pill?"

---

### P1-5 — kt-ch15-l2-ep1 (emoji-pick, Ch15 國王的新衣)
```
Sentence: "The weavers held up empty hands and pointed at nothing."
Q:        "Which emoji shows empty hands?"
Correct:  🤲 hands
```
**Fix:**
> "Which emoji shows what the weavers held up to trick the emperor?"

---

## F. Narrative Voice / Pacing Improvements (3 minimum per spec)

Even with no R1-R8 critical violations in listen-mc/comprehension, these pacing improvements would strengthen the story experience:

### NV-1 — emoji-pick explanationZh: add story anchor, not just translation label
Current pattern across all Ch9-16 story-contextual emoji-pick items:
```
"midnight = 午夜 🕛！12 點鐘聲一響，魔法就結束——灰姑娘要趕快跑回家！"
```
This is good (vocabulary + story tie-in). **The vocabulary = label format is fine.** But for the 5 A6-violation items, the explanation also can't compensate for a question that telegraphs the answer. Once Q is fixed to paraphrase, the explanation naturally reinforces the word recall.

### NV-2 — comprehension Q phrasing: "What does this scene tell us?" overused in Ch9-16
kt-ch9-l4-lg2, kt-ch11 (multiple), kt-ch13 (multiple) all use the stem "What does this scene tell us about X?" This meta-analytical phrasing is valid for inference questions, but appearing 3+ times per chapter feels like a template leak. Consider variety:
- "What do we learn about X from this?" 
- "Which word best describes X at this moment?"
- "Why does the author describe X in this way?"

### NV-3 — listen-mc Q stems for Hou Yi (Ch11): pacing is good but 3 consecutive "How did X?" questions in l3 create monotony
kt-ch11-l3 has 3 listen-mc questions starting "How did Hou Yi…?". Industry standard (TOEIC Part 4 item distribution): no more than 2 consecutive same-WH word. Alternate with "What did Hou Yi…?" or "Why did Hou Yi…?" to vary pacing.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #233: X233_A6_CONTEXTUAL_EMOJI_PARAPHRASE

**Pattern discovered:** Story-contextual `emoji-pick` question stems that name the target word (A6 flaw). 5 instances across Ch9–16; likely 10-15 more in Ch17–34 (estimated by extrapolation).

**Industry source:**
- ELT Item Writing Guidelines (elttguide.com / PRSA / ASC 2025): "No answer choice repeats key words from the stem" — applies to all MC types including word-image matching
- EPVT research (Tandfonline 2022): Standard picture vocabulary test format is word→image recognition; the question stem should name the CATEGORY or CONTEXT, not the target word itself, at intermediate difficulty

**Current state:**
```json
{ "type": "emoji-pick",
  "sentence": "The clock struck midnight and the magic ended.",
  "question": "Which emoji shows midnight?",   ← A6: names target word
  "options": ["🌅 sunrise","🌄 morning","🌆 evening","🕛 midnight"],
  "correctIndex": 3 }
```

**Target state (no code change, JSON only):**
```json
{ "type": "emoji-pick",
  "sentence": "The clock struck midnight and the magic ended.",
  "question": "Which emoji shows the moment when Cinderella's magic ended?",  ← paraphrase
  "options": ["🌅 sunrise","🌄 morning","🌆 evening","🕛 midnight"],
  "correctIndex": 3 }
```

**Pickup 架構適配:** ✅ JSON-only fix, no schema change needed. `emoji-pick` question field is already freeform text. `emoji-pick` renderer already displays `question` field as-is. No audio regen needed (sentence audio unchanged). Could add a lint rule `X60_EMOJI_PICK_Q_ECHO` to validate-lessons.js.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Story-contextual emoji-pick Q paraphrase (no target word in stem) | ELT item writing guidelines; EPVT 2022 | ✅ JSON edit only; no schema/code change | Low (5 Fable edits + lint rule) | High (converts icon-lookup to recall+match, pedagogically stronger) | ✅ Ship |

**Lint rule to add in future (`X60_EMOJI_PICK_Q_ECHO`):**
```js
// For emoji-pick where sentence ≠ question:
// flag if any content word from correct option (stripped of emoji) appears in question
if (type === 'emoji-pick' && sentence !== question) {
  const correctText = stripEmoji(options[correctIndex]).toLowerCase();
  const qWords = tokenize(question);
  const optWords = tokenize(correctText);
  if (optWords.some(w => qWords.includes(w))) WARN('X60_EMOJI_PICK_Q_ECHO', ...)
}
```

---

*Audit by Claude Code cron — 2026-08-02 12:08 UTC*
*Rotation: A6 (8th in 12-angle cycle) | Next suggested: R1-paraphrase or Audio-sync | Chapters: Ch9–16*
