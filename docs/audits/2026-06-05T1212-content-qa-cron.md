# Content QA — 2026-06-05 12:12 UTC

Today's angle: **#4 — A2 Cloze Blank Position (answer-position / positional-anchor bias)**
Focus: **Ch6 (六隻天鵝 / Six Swans) + Ch7 (葉限 / Ye Xian)** — first dedicated A2 positional-anchor pass

_Angle rotation: previous 8 used A1-ObviousCorrect, A4-MirrorPatterns, A7-ContentWordRep, A6-OptionInQuestion, AudioSync, R1-Paraphrase, explanationZh-StoryVoice, R2-DistractorDoctrine._

---

## A. validate-lessons.js result

```
WARN lessons-ch0.json: 4 lint issue(s):
  kt-ch0-l2-q6: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch0-l2-q12: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch0-l3-q9: X2_OPTION_LIST_BIAS (all start with "her")
  kt-ch0-l3-q11: X2_OPTION_LIST_BIAS (all start with "the")
WARN lessons-ch1.json: 2 lint issue(s):
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
OK  lessons-ch2.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch3.json: 8 lint issue(s): [X2_OPTION_LIST_BIAS]
OK  lessons-ch4.json: 7 lessons
OK  lessons-ch5.json: 7 lessons
OK  lessons-ch6.json: 7 lessons
OK  lessons-ch7.json: 7 lessons

Total mirror-lint issues: 14 (warn-only)
```

Validator passes schema for Ch6/Ch7. All issues below discovered by manual deep-scan.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| Ch6 | kt-ch6-l2-q6 | R2 length-tell | opts `['black','red','pale like milk','gold']` correct=`pale like milk` | **R2 ratio=4.67** — longest option = correct answer; A2 learner can answer without comprehension | Replace 2 short options with equal-length alternates e.g. `['steel grey','soft cream','night black','leaf green']` all ~10 chars | No (Ch6 no TTS yet) |
| Ch6 | kt-ch6-l1-q9 | R2 length-tell | opts `['joyful','sleepless and sad','angry','busy']` correct=`sleepless and sad` | **R2 ratio=4.25** — 17 vs 4 chars; correct always longest | Pad short options: `['full of joy','sleepless and sad','cold and mad','always busy']` | No |
| Ch7 | kt-ch7-l4-q7 | R2 length-tell | opts `['sing','grant her wishes','fly away','cook food']` correct=`grant her wishes` | **R2 ratio=4.00** — 16 vs 4 chars; shortest 3 options are all verbs, longest is correct | Rewrite: `['sing her songs','grant her wishes','fly away fast','cook her food']` | No |
| Ch7 | kt-ch7-l5-q5 | R2 length-tell | opts `['food and water','fine clothing and shiny footwear','gold coins','a sharp sword']` correct=`fine clothing and shiny footwear` | **R2 ratio=3.20** — 31 vs 10 chars; phrasing register also mismatches | Shorten correct: `'a blue cloak and gold shoes'`; trim other options to ~16 chars | No |
| Ch6 | kt-ch6-l6-q9 | R2 + R8 vocab | opts `['one','two','a trio','four']` correct=`a trio` | **R2 ratio=2.00** + **R8 GSL-2000 fail**: `trio` is not basic A2 vocabulary; also requires counting three events | Replace `a trio` → `three` and keep cadence: `['once','twice','three times','many times']` | No |
| Ch7 | kt-ch7-l1-q9 | R2 length-tell | opts `['Yexian','her own daughter','the neighbours','no one']` correct=`her own daughter` | **R2 ratio=2.67** — 14 vs 5 chars | Pad: `['poor Yexian','her own dear girl','all neighbours','no one at all']` | No |
| Ch0–Ch7 | ALL listen-tf | A2-anchor | 56 questions across 8 chapters have empty `question` field | **Systemic A2 positional anchor gap**: learner hears sentence but has no stated question to anchor their Yes/No judgment against. Must infer unstated question from explanationZh context. Violates R7 (explicit stem required for A2). | Add `question` field to every listen-tf e.g. `kt-ch6-l1-q4 → "Did the castle feel lively and warm?"` | No |
| Ch4–Ch7 | listen-tf all | R3 response-bias | Ch4:1 Yes/6 No (86% No), Ch5:86% No, Ch6:86% No, Ch7:86% No | **R3 key-position balance failure for binary**: across 4 chapters the correct answer is "No" ≥86% of the time. Learner who guesses "No" every time achieves 86% without listening. | Rebalance to ≥40% Yes per chapter. Requires rewriting some listen-tf sentences to describe positive/true states | No |
| Ch6 | kt-ch6-l7-q3 | explanationZh leak | SENT: "For six long years she had not spoken one word." ANS: Yes. EXPL: "六年到正午 → 結束了 → 答 Yes" | EXPL leaks narrative context ("結束了 = ended") not present in the sentence; learner reading explanation without context cannot follow the chain. Also the implicit question is unclear — what is "Yes" confirming? | Clarify implicit question in explanationZh: e.g. "六年的沉默是很長的時間 → 是的，她等了非常久 → 答 Yes" | No |
| Ch6–Ch7 | kt-ch6-l5-q6 | A3 junk-distractor | SENT: "her hands worked the needle deep into the night." Q: "What did she still do?" opts: `['cry','dance','sew','read']` | `cry` and `dance` are obvious-miss distractors with zero story-schema plausibility; R4 requires 3 functional failure-mode distractors | Replace: `['rest and sleep','ask for help','sew all night','talk to the king']` — each covers a different failure mode | No |
| Ch6–Ch7 | kt-ch6-l4-q10 | A3 junk-distractor | listen-comprehension opts: `['quiet hard work to save her brothers','happy days in the forest','learning to dance with friends','fighting the angry queen']` | `learning to dance with friends` is completely implausible in Ch6 Six Swans context (no dancing, no friends); zero story schema | Replace: `['long and lonely winter wait','quiet hard work to save her brothers','hiding from the angry queen','running into the dark forest']` | No |
| Ch6–Ch7 | GIST q10 position lock | A2 structural | All 14 listen-comprehension across Ch6/Ch7 appear at fixed position q10/11 | **Positional gaming**: A2 learner who knows "q10 is always the gist question" can skip ahead to the hardest/most important question. This is the A2 blank-position bias adapted for MC — structural tell rather than sentence-level tell. | Vary listen-comprehension to positions q7, q8, q9 across different lessons (not all q10). Already varied correctly in kt-ch7-l2 (pos q9) — use that as model. | No |

---

## C. Stats

| metric | value |
|--------|-------|
| Total questions audited (Ch6+Ch7 listen-mc/tf/comprehension) | 49 |
| R2 ratio >4.0 violations | 3 |
| R2 ratio 2.0–4.0 violations | 3 |
| R2 ratio 1.25–2.0 violations (background noise) | 34 |
| listen-tf missing question stem (global, all chapters) | 56 |
| listen-tf No-bias ≥86% (Ch4-Ch7) | 4 chapters, 28 Qs |
| listen-comprehension at fixed position q10 | 13/14 (93%) |
| Junk-distractor (obvious-miss) flagged | 4 Qs |
| R8 GSL-2000 vocab fail | 1 (trio) |
| END-position answer recency bias | 1 (kt-ch6-l1-q6 @88%) — low severity |
| explanationZh narrative-context leak | 1 (kt-ch6-l7-q3) |
| Audio regen required | **0** (Ch6/Ch7 have no TTS audio yet) |

---

## D. Top 5 P0

**P0-1 — Systemic: listen-tf missing question stems (ALL 56 Qs, Ch0–Ch7)**
Every `listen-tf` question across all 8 chapters has an empty `question` field. A2 learners hear a sentence and must answer Yes/No without knowing WHAT they're evaluating. The implicit question is only visible in `explanationZh` — after they've already answered. This is the most severe A2 positional-anchor failure in the entire corpus: the "blank" is invisible.
- Example: `kt-ch6-l1-q4` — SENT "The halls of the castle felt cold and still, day after day." ANS=No. What question is being answered? "Were the halls warm and happy?" — unstated.
- Fix: Add `question` field to every listen-tf. Suggested pattern: reframe as a negative/positive yes-no statement. e.g. `"Was the castle a happy place?"` → No.

**P0-2 — Systemic: listen-tf 86% No-answer bias (Ch4, Ch5, Ch6, Ch7)**
In 4 consecutive chapters, 6 of 7 listen-tf answers are "No" (86%). A learner who defaults to "No" every time scores 86% without processing the audio. Combined with P0-1 (no stated question), this creates a pattern where guessing beats listening. Violates R3 (key-position balance).
- Fix: Rewrite at least 3 listen-tf sentences per chapter to describe a *true* state (making "Yes" the correct answer). Ideal: 3–4 Yes, 3–4 No per chapter.

**P0-3 — kt-ch6-l2-q6: R2 ratio=4.67 (worst in corpus)**
Options `['black', 'red', 'pale like milk', 'gold']`, correct=`pale like milk`. Ratio of longest to shortest = 14÷3 = 4.67. The correct answer is the only multi-word option — trivial length tell. A learner who has learned "pick the longest option" would always choose it.
- Fix: Normalize lengths → `['dark as ink', 'pale like milk', 'red as blood', 'bright as gold']` all ~12 chars.

**P0-4 — kt-ch7-l4-q7: R2 ratio=4.00 (grant her wishes)**
Options `['sing', 'grant her wishes', 'fly away', 'cook food']`, correct=`grant her wishes`. Min option length = 4 (`sing`), max = 16. Three distractors are single verbs; correct is a VP phrase. Structural tell independent of story comprehension.
- Fix: Expand distractors → `['sing her songs', 'grant her wishes', 'fly far away', 'cook her food']`.

**P0-5 — kt-ch6-l1-q9: R2 ratio=4.25**
Options `['joyful', 'sleepless and sad', 'angry', 'busy']`, correct=`sleepless and sad`. Min = 4 chars (`busy`), max = 17. Same pattern as P0-3/P0-4: single-word distractors vs multi-word correct answer.
- Fix: Pad distractors → `['full of joy', 'sleepless and sad', 'cold with rage', 'always too busy']`.

---

## E. Narrative Voice / Pacing Improvements (3 required per spec)

**NV-1 — listen-tf explanationZh uses "推理" jargon throughout**
Every listen-tf explanation follows the template "推理: X → Y → 答 Z" (e.g., "推理:廳堂冷靜 → 沒有笑聲 → 答 No"). "推理" (inference) is test-design terminology that breaks the story-immersive voice Pickup targets. It signals "you are taking a test" not "you are listening to grandma's story."
- Improvement: Replace "推理:" with story-voice framing: "因為廳堂很安靜冷清，我們知道城堡裡沒有歡笑，所以答 No。"

**NV-2 — listen-comprehension GIST questions are repetitively phrased (Ch7)**
All 7 Ch7 gist questions use the exact same stem: "What is this scene mainly showing?" (kt-ch7-l1 through kt-ch7-l7 all identical). Ch6 varies slightly ("What is this scene mainly about?" / "What is this scene mainly showing?") but Ch7 shows zero variation. Learners recognize the GIST question by its stem before even reading it — the question becomes a template, not a prompt.
- Improvement: Rotate stems: "What can you tell about Yexian here?" / "What feeling does this scene carry?" / "What is happening in this part of the story?" / "If you had to name this moment, what would you call it?"

**NV-3 — listen-tf sentences are story-neutral rather than story-forward**
Several listen-tf sentences (especially Ch7) describe plot-neutral states that don't advance emotional engagement. e.g., `kt-ch7-l3-q3` SENT: "She hid a small bright knife inside her wide sleeve." This is plot-relevant but told in flat exposition. Compare to listen-mc sentences which use vivid sensory language ("white feathers fell softly," "the pale light of the night"). The listen-tf sentences could carry more Ghibli atmosphere to make True/False reasoning feel like story participation, not grammar drill.
- Improvement: Rewrite listen-tf sentences with one sensory detail: "She folded a small bright knife inside the deep shadow of her sleeve." — same grammar complexity, higher story immersion.
