# Content QA — 2026-07-25 06:06 UTC

**Today's angle:** A1 — obvious correct (gap too easy)
**Focus:** Ch9–16 (Cinderella, Issun-Boshi, Turtle & Hare, Three Little Pigs extensions, fairy-tale arc)
**Auditor:** cron-content-qa automated session

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)  [known carry-over, pre-existing]
  X2_OPTION_LIST_BIAS / X48_NGRAM_VERBATIM_CORRECT / X49_STIMULUS_REUSE / X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch9.json: 8 lint issue(s)  [known carry-over]
  X2_OPTION_LIST_BIAS / X49_STIMULUS_REUSE / X57_ANTONYM_PAIR_MIRROR

Total mirror-lint issues: 440  (warn-only, MIRROR_LINT_STRICT=1 to fail)
```

Build gate: PASS (no new schema errors).

---

## B. Violation table — A1 angle (obvious correct / gap too easy)

### Sub-angle taxonomy used this cycle

| Code | Description |
|------|-------------|
| A1a-VERBATIM-MULTI-WORD | Correct option's content words are ALL present verbatim in sentence |
| A1e-SINGLE-WORD-VERBATIM | Single key content-word in correct option appears unchanged in sentence |
| A1r-REFERENTIAL-EMOJI | emoji-pick where sentence = question (no story context; pure label drill) |
| A1pacing | Narrative voice / pacing issue (required 3 minimum per cycle) |

### P0 violations

| # | Ch | Q ID | type | Sentence snippet | Question | Correct option | Violation | 修法 | audio regen? |
|---|----|----|------|-----------------|---------|---------------|-----------|------|-------------|
| 1 | 9 | kt-ch9-l2-ep1 | emoji-pick | "The clock struck midnight and the magic ended." | Which emoji shows midnight? | 🕛 midnight | A1e: "midnight" verbatim in sentence — learner guesses without comprehension | Q stem: "Which emoji matches what ended the magic?" | No |
| 2 | 13 | kt-ch13-l2-ep1 | emoji-pick | "The wolf had long sharp teeth under his soft fur." | Which emoji shows teeth? | 🦷 teeth | A1e: "teeth" verbatim in sentence | Q stem: "Which part of the wolf was hidden under his fur?" | No |
| 3 | 14 | kt-ch14-l3-x2 | comprehension | "The walls shone like pearl and the gates were made of shell." | What were the walls made of? | "walls that shone like pearl" | A1a: 100% content-word overlap — copy-paste from sentence | Rephrase: "smooth white material that glows like the inside of a shell" | No |
| 4 | 14 | kt-ch14-l5-x4 | comprehension | "She gave him a small red box tied with a gold rope." | What was tied around the box? | "the gold rope" | A1a: 100% verbatim — "gold" + "rope" both in sentence | Rephrase: "a shiny yellow cord" or "a bright cord of woven gold" | No |
| 5 | 15 | kt-ch15-l2-ep1 | emoji-pick | "The weavers held up empty hands and pointed at nothing." | Which emoji shows empty hands? | 🤲 hands | A1e: "hands" verbatim in sentence | Q stem: "Which emoji shows what the weavers used to trick the emperor?" | No |
| 6 | 15 | kt-ch15-l4-x6 | comprehension | "All his men nodded fast. They all said it was lovely." | What did the men around the emperor all do? | "nodded and said it was lovely" | A1a: 100% verbatim — "nodded", "said", "lovely" all in sentence | Rephrase: "agreed loudly that the cloth was beautiful" | No |

### P1 violations

| # | Ch | Q ID | type | Sentence snippet | Correct option | Word overlap | 修法 | audio regen? |
|---|----|------|------|-----------------|---------------|-------------|------|-------------|
| 7 | 9 | kt-ch9-l3-x2 | comprehension | "…He wanted to find a wife. Every girl in the whole town was invited…" | "every girl in the whole town" | 75% | Rephrase: "all the young women of the kingdom" | No |
| 8 | 13 | kt-ch13-l7-x4 | comprehension | "Grandma sat up. The girl held her hand. Both could breathe again." | "both sat up and breathed again" | 75% | Rephrase: "grandma and the girl were safe and well again" | No |
| 9 | 16 | kt-ch16-l7-x4 | comprehension | "Soon he stood as tall as any young man." | "as tall as a normal young man" | 75% | Rephrase: "tall enough to stand beside any grown man in the village" | No |

### Structural design pattern (22 items) — A1r-REFERENTIAL-EMOJI

Across Ch9–16, **22 emoji-pick items** have `sentence === question` (no story sentence provided):
examples — "Which one is a shoe?", "Which one shows a bridge?", "Which one is a turtle?", "Which one shows a needle?", etc.

These are vocabulary recognition drills positioned at **lesson 1 warm-up slots** (l1-ep1, l1-ep2) for each chapter. Design intent appears intentional (lexical priming before story). However:

- They do NOT exercise listening comprehension — the learner reads the question, hears the question, and needs only to match the label.
- From a sub-skill balance perspective (R6 per standard), these items consume question slots without contributing gist/inference/detail sub-skills.
- For A2 children: acceptable as warm-up (Cambridge YLE Flyers uses the same vocabulary picture-matching pattern). BUT: should be clearly tagged `subSkill: "vocab-drill"` in schema so analytics can separate them from comprehension items.

Recommendation: keep the design, add `"subSkill": "vocab-drill"` field — no content rewrite required.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch9–16 (8 chapters) |
| Total Q entries (non-narration) | ~600 |
| Listen-mc checked | ~77 |
| Comprehension checked | ~104 |
| Emoji-pick checked | ~97 |
| P0 violations | **6** |
| P1 violations | **3** |
| Structural pattern items | 22 (A1r-REFERENTIAL-EMOJI) |

P0 breakdown: 3× emoji-pick story-linked (A1e), 3× comprehension (A1a 100% overlap)
P1 breakdown: 3× comprehension (A1a 75% overlap)

---

## D. Top 5 P0

| Rank | ID | Why it matters |
|------|----|---------------|
| ⭐ P0-1 | Ch15 kt-ch15-l4-x6 | "nodded and said it was lovely" — Emperor's New Clothes climax question; verbatim copy destroys the irony-inference moment the story is built around |
| ⭐ P0-2 | Ch14 kt-ch14-l3-x2 | "walls that shone like pearl" — world-building detail question with 100% verbatim answer; turns comprehension into scanning |
| ⭐ P0-3 | Ch14 kt-ch14-l5-x4 | "the gold rope" — concrete noun phrase lifted directly; even an A1 learner who didn't hear the sentence can match "gold rope" from memory |
| P0-4 | Ch9 kt-ch9-l2-ep1 | "midnight" in emoji-pick — target word verbatim in sentence; no comprehension needed |
| P0-5 | Ch13 kt-ch13-l2-ep1 | "teeth" in emoji-pick — "teeth" is the most prominent word in the sentence |

---

## E. Narrative voice / pacing improvements (3 minimum, 0-violation requirement)

Even where no hard rule fires, these pacing issues reduce engagement for the 8-12 age group:

### NV-1: Ch14 comprehension cluster — literal detail overload

Ch14 lessons l3–l5 have 4 back-to-back "What was X made of?" / "What was Y?" direct-recall questions. For 8-12 learners, reading comprehension research (Nation & Webb 2011) recommends alternating detail and inference questions to sustain engagement. **Insert one inference question** between literal recalls:

> "Why do you think the Sea King built walls that looked like pearls?" — possible options: "to show his great power", "to scare away fishermen", "because he liked the colour white", "to match the colour of the ocean"

### NV-2: Ch16 emotional flatness at the story climax

"As tall as a normal young man" (kt-ch16-l7-x4) uses "normal" — this word carries a subtle negative connotation (implying Issun was previously "abnormal") that's emotionally jarring at the triumphant growth moment. Story-voice revision:

> Correct option: **"tall enough to stand proudly beside any young man in the village"**

The phrasing matches the celebratory register of the transformation scene and avoids the deficit framing of "normal."

### NV-3: Ch15 irony not captured in questions

The Emperor's New Clothes is the only story in the corpus with explicit social satire (adults lie to protect their status). The current comprehension questions focus on literal action ("What did the men do?", "What did the weavers pretend?") without capturing why the story is funny/meaningful. **Add one gist inference question** to the end of lesson l4:

> Q: "Why did everyone keep saying the clothes were beautiful?"
> Options: "They could all see the lovely cloth", "They were scared to look stupid", "The emperor told them to say it", "The weavers paid them to agree"
> Correct: "They were scared to look stupid"

This also models A2→B1 progression (inference from motive, not just fact).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source research:**
- Wang & Meng (2026) "Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods" — *Language Testing* (DOI: 10.1177/02655322251400375). Key finding: verbatim options are the single largest source of CIV (construct-irrelevant variance) in L2 listening tests; AI+human hybrid review is now the gold-standard detection pipeline.
- Emoji facilitation research (PMC12605125, 2026): emoji-word matching tasks show significantly faster response times and higher accuracy vs text translation — but the **facilitation effect disappears in mismatch conditions** (when the question does not semantically align with the emoji label). Implication: emoji-pick items where sentence describes the word directly (A1e pattern) lose their cognitive load benefit.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-------------|--------|-----|---------|
| **X201 A1e EMOJI-STORY-QUESTION LINT** — Add lint rule: for `emoji-pick` where `sentence !== question`, assert that the single-word target in the correct option does NOT appear verbatim in `sentence`. Prevents CIV in story-linked emoji-picks (detected 3 P0 violations this cycle). Schema: `if (q.type==='emoji-pick' && q.sentence!==q.question) { assert targetWord not in sentence.toLowerCase() }` | Wang & Meng 2026 / PMC12605125 | ✅ Fits Pickup: lint-only, no content change. Tools/validate-lessons.js is already the home for this check. | Low (add ~20 lines to lint script) | High (blocks recurring A1e CIV per cycle; currently 3+ violations per chapter range) | ✅ SHIP — add to validate-lessons.js as X201_EMOJI_STORY_VERBATIM |
| **X201b VOCAB-DRILL subSkill TAG** — Add optional `"subSkill": "vocab-drill"` to emoji-pick items where sentence=question. Allows analytics to separate vocabulary recognition items from comprehension items in sub-skill balance reports (R6). No content rewrite. | Cambridge YLE Flyers design pattern (Flyers handbook 2025) | ✅ Additive schema field, backwards-compatible. Lets R6 sub-skill checks exclude vocab-drills from gist/detail/inference counts. | Very Low (add field to 22 items in Ch9-16, similarly in Ch0-8/17-32) | Medium (improves audit accuracy, prevents false R6 failures on vocab-warm-up lessons) | ✅ SHIP together with X201 |

### ARCH-REC #201 — `X201_EMOJI_STORY_VERBATIM_LINT`

**What**: Add lint rule X201 to `tools/validate-lessons.js`:
```js
// X201: emoji-pick story-linked A1e — target word must not appear verbatim in sentence
if (q.type === 'emoji-pick' && q.sentence && q.question && q.sentence.trim() !== q.question.trim()) {
  const correctOpt = String(options[correctIdx] || '').toLowerCase().replace(/[^a-z' ]/g, '').trim();
  const targetWord = correctOpt.split(' ').find(w => w.length > 2);
  if (targetWord && sentence.toLowerCase().includes(targetWord)) {
    warn(lessonId, q.id, 'X201_EMOJI_STORY_VERBATIM', `emoji-pick target word "${targetWord}" verbatim in sentence — no comprehension required`);
  }
}
```
**Effort**: Low (~25 lines). **ROI**: High (3 P0 violations blocked per 8-chapter run). **No src/ changes. No lessons-ch*.json rewrites.**
