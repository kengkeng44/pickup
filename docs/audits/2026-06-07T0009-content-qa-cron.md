# Content QA — 2026-06-07 00:09 UTC

Today's angle: **#7 — A5 Cultural Reference (cross-cultural scaffolding consistency)**
Focus: Ch4 (Kipling Camel's Hump), Ch5 (Vasilisa / Baba Yaga), Ch7 (葉限 Yexian), Ch10-12 (Chinese mythology), Ch14 (Urashima Taro)

---

## A. validate-lessons.js result

```
OK   lessons-ch0.json: 7 lessons
WARN lessons-ch1.json: 2 lint issue(s)
       kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
       kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
OK   lessons-ch2.json → ch9.json: (pass)
WARN lessons-ch3.json: 8 lint issue(s) — all X2_OPTION_LIST_BIAS
WARN lessons-ch19.json: 5 lint issue(s) — all X2_OPTION_LIST_BIAS
WARN lessons-ch21.json: 10 lint issue(s) — all X2_OPTION_LIST_BIAS
...
Total mirror-lint issues: 25 (warn-only)
```

Schema: all chapters pass. No hard failures.

---

## B. Violation Table

| # | Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|---|----|---------|----|---------|-----------|------|-------------|
| 1 | Ch14 | `kt-ch14-l5` narration | **A5 P1** cultural gloss gap | `"This is called the Tamatebako," she said softly.` | Japanese proper noun **"Tamatebako"** appears without inline Chinese gloss `(玉手箱)` and is not in the L5 tap-pairs (only 回家/禮物/紅/答應). Ch7 consistently glosses every cultural term: `葉限 (Yexian)`, `洞節 (cave festival)`, `青衣 (blue cloak)`, `飛石 (flying stones)`. Ch14 omits this for `Tamatebako`, `Otohime`, `Urashima Taro` — opaque to A2 Taiwanese learners. | (a) Change L5 tap-pairs: replace `紅/red` (not culturally key here) → `玉手箱/Tamatebako`. (b) In L5 narration: `"This is called the Tamatebako (玉手箱),"`. (c) In L3 narration: `"Her name was Otohime (乙姬),"`. | Yes — 2 narration sentences re-record |
| 2 | Ch14 | `kt-ch14-l1` narration | **A5 P1** naming inconsistency | `"His name was Urashima Taro."` | Name introduced as plain English; no Japanese character annotation `(浦島太郎)`. Compare Ch7: `"a girl named 葉限 (Yexian)"` sets the character's full identity in both scripts on first mention. Ch14 treats all three Japanese proper nouns (Urashima Taro, Otohime, Tamatebako) as English-readable — they are not phonologically transparent to Taiwanese learners unfamiliar with Japanese romanisation. | Add `(浦島太郎)` to first mention in L1 narration: `"His name was Urashima Taro (浦島太郎)."` | Yes — 1 narration sentence |
| 3 | Ch5 | `kt-ch5-l4-q3` | **A5 P1** explanationZh cross-reference error | `"不是木頭 → 骨頭(see Q4)."` | `(see Q4)` references a non-existent question. Lesson kt-ch5-l4 contains questions at positions q3, q5, q9, q10 — no q4 exists. The skull narration (`"On each post sat a skull. The eyes glowed in the dark."`) appears between q3 and q5 as a narration entry, not a question. The annotation was likely drafted during a previous numbering scheme and never updated. Learners reading the explanation see a broken reference. | Replace `expZh` with: `"不是木頭 → 骨頭。後面旁白說:柱子上有骷髏頭,發出光 → 確認是骨頭圍籬。"` | No |
| 4 | Ch10 | `kt-ch10-l1-q6` | **A5/A3 P1** anti-violence paraphrase weakens distractors | `"He shot the suns one by one."` → correct: `"made them go away"` | `expZh` explicitly notes `(paraphrase, anti-violence)`. The paraphrase is so broad that the distractor set collapses: `"painted them gold"` is a junk distractor with zero plausibility (A3 anti-pattern); `"sent them rain"` has weak plausibility. R4 requires ≥3 functional failure modes — only `"sent them rain"` (schema-inference: drought → rain solution) and `"put them in a box"` (partial-parse) are functional. `"painted them gold"` contributes nothing. Meanwhile `"made them go away"` loses Hou Yi's heroic archery agency, which is culturally central to this Chinese mythology. | Replace correct option: `"drove each sun from the sky"` (preserves agency, still child-safe). Replace junk distractor `"painted them gold"` → `"hid them behind clouds"` (schema-inference, plausible misdirection). | No |
| 5 | Ch7 | `kt-ch7-l7` final narration → `kt-ch7-l7-q10` | **A5 P1** supernatural justice unframed | `"飛石 (flying stones) fell from the sky and buried the new wife and her daughter."` | The supernatural punishment (天譴 — divine retribution via flying stones) appears in the final narration without any explanatory framing. `kt-ch7-l7-q10` asks a gist question about Yexian's happy ending but its `expZh` only says `"主旨 = 葉限找到一個安全的新家"` — it silently skips over the violent fate of the step-mother and daughter. For heritage learners abroad unfamiliar with the 天譴 convention, this appears as unexplained violence. For mainland/Taiwanese children the convention is familiar, but a brief cultural frame adds educational value. | Extend `expZh` for `kt-ch7-l7-q10`: `"主旨 = 葉限找到安全的新家。「飛石」是傳統故事中的天譴 — 善有善報,惡有惡報。葉限是世界最古老的灰姑娘故事(約西元850年),比法國版早900年。"` | No |

---

## C. Stats

| metric | value |
|--------|-------|
| Chapters examined | Ch4, Ch5, Ch7, Ch10, Ch11, Ch12, Ch14 |
| Lessons deep-read | 49 (7 per chapter × 7 chapters) |
| Questions reviewed (listen-mc/tf/comprehension) | ~196 |
| Tap-pairs vocab pairs reviewed | 182 total (all chapters) |
| Violations found | 5 |
| P0 | 0 |
| P1 | 5 |
| P2 | 0 |
| Audio regen needed | $3 (2× Ch14 narration sentences, 1× Ch14 L1 name sentence) |
| validate-lessons hard failures | 0 |
| validate-lessons lint warnings (existing) | 25 (all X2_OPTION_LIST_BIAS, not A5-related) |

**Tap-pairs systemic note (not a violation — correct behavior):** All 182 tap-pairs across ch1-ch26 store vocabulary in the `pairs` field (left: Chinese / right: English), not in `options`/`optionsZh`. The validator's empty-options observation for tap-pairs is an artifact of checking the wrong field. The tap-pairs content IS properly populated (e.g., Ch4-l4: 精靈/djinn correctly introduced before the Djinn scene; Ch5-l4: 骨頭/bone + 頭骨/skull introduced before the fence scene; Ch5-l3: 白/white + 紅/red + 黑/black introduced before the three-riders scene). Cultural vocabulary scaffolding is mostly working. The Ch14 Japanese-term gap is the exception.

---

## D. Top 5 P0

No violations reach P0 threshold (no hard R1-R8 rule breaks, no byte-identical mirrors found). Ranking the P1s by learner-impact severity:

**P1.1 — Tamatebako unglossed (Ch14-l5)** — most impactful  
A Taiwanese 8-12 learner hears grandma's TTS read "the Tamatebako" and encounters an opaque Japanese word with no gloss, no tap-pairs preview. The word appears in the climactic gift scene. Every other chapter with a foreign cultural proper noun either uses the tap-pairs to introduce it (Ch4: 精靈/djinn) or uses inline glossing (Ch7: full Chinese character annotation). Ch14 does neither for its three Japanese terms.

**P1.2 — Urashima Taro / Otohime unglossed (Ch14-l1/l3)**  
Systemic extension of P1.1. First mention of the hero's name and the princess's name both lack the `(漢字)` gloss that Ch7 uses from its opening sentence.

**P1.3 — explanationZh "see Q4" dead reference (Ch5-l4-q3)**  
Minor but creates a broken-UX moment: the learner checks the explanation and sees a pointer to a question that does not exist in the lesson.

**P1.4 — "made them go away" + "painted them gold" (Ch10-l1-q6)**  
The only question about Hou Yi's iconic archery feat uses a vague paraphrase as the correct answer and a zero-plausibility junk distractor. Both degrade the R4 distractor quality and undercut the cultural heroism of the scene.

**P1.5 — 飛石 天譴 unframed (Ch7-l7)**  
Low risk for Taiwanese children (culturally familiar), higher risk for heritage learners abroad. A two-sentence explanationZh addition fully resolves it — and the opportunity to state "oldest Cinderella story in the world" is a powerful cultural-pride moment that the current content misses.

---

## E. Narrative Voice / Pacing Improvements (3 required)

### E1 — Ch4 Kipling closing hook needs to echo back into the final Q
`kt-ch4-l7-q10` is the last lesson question. The immediately preceding narration says:
> "And you, my dear — what hump might you be carrying tonight?"

This is the most powerful Kipling line — a direct address to the child listener. The current `expZh` for q10 reads:
> `"推理:逃的工作 → 變成背上的駝峰 → 逃 = 包袱。"`

This is a clean inference explanation, but it reads like a textbook annotation. The Kipling register is completely absent. Proposed upgrade:
> `"推理:逃的工作 → 變成背上的駝峰 → 逃 = 包袱。就像奶奶說的:『你的駝峰是什麼?』"`

This single added sentence:
- Closes the Kipling "O Best Beloved / my dear" loop back to grandma's storytelling frame
- Invites the child listener into self-reflection (the story's true pedagogical goal)
- Connects the Aesop-style moral to the product's outer-frame (grandma → Mochi/Hana listening)

### E2 — Ch5 doll magic moment needs emotional weight in the post-reveal explanation
`kt-ch5-l7-q3` asks: when Baba Yaga woke and saw the rice sorted, how did she feel? Answer: surprised. `expZh`: `"不可能完成 → 完成了 → 驚訝。"`

The doll's overnight magic is the emotional climax of the Vasilisa arc — it represents the mother's posthumous love helping her daughter through an impossible task. The current explanation treats it as a pure inference chain. Proposed upgrade:
> `"不可能完成 → 完成了 → 驚訝。(娃娃一夜分米:媽媽留下的愛,讓不可能變可能。)"`

This:
- Names the emotional significance without spoiling future chapters
- Reinforces the doll's role for learners who may not have internalized it yet
- Stays in story-voice (no ELT jargon)

### E3 — Ch7 葉限 cultural pride anchor missing from any question
The Yexian story is the world's oldest Cinderella analogue (~850 CE, compiled in 酉陽雜俎 by Duan Chengshi), predating Charles Perrault's French version by ~900 years. Not one question in the 7-lesson chapter mentions this fact.

For Taiwanese and Chinese heritage learners, knowing that their culture originated one of the world's most beloved story archetypes is a potential high-impact identity and pride moment — exactly the kind of emotional hook that drives long-term engagement (aligned with the grandma storytelling framework).

Suggested addition to `kt-ch7-l7-q10` `expZh` (already proposed in violation #5 above):
> `"葉限是世界最古老的灰姑娘故事(約西元850年),比法國版早900年。"`

One sentence. No audio required. High cultural ROI.

---

*Audit by Claude (cron-content, angle A5) — 2026-06-07 00:09 UTC*
