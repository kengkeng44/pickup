# Content QA — 2026-06-07 06:07 UTC

Today's angle: **#5 — A3 語意 leak (story 跳針)**
Focus: **Ch2 (Ugly Duckling) · Ch3 (Tortoise & Hare) · Ch4 (Camel's Hump)**

Lens: narrative coherence within and across lessons — scene jumps, POV instability, cross-sentence reasoning leaks in explanationZh, implicit question opacity in listen-tf, outer-frame structural absence, tonal breaks for target age group (8-12).

---

## A. validate-lessons.js result

```
WARN lessons-ch3.json: 8 lint issues (X2_OPTION_LIST_BIAS — all options start with same token)
  kt-ch3-l2-q5  all start "to"
  kt-ch3-l2-q10 all start "he"
  kt-ch3-l3-q9  all start "he"
  kt-ch3-l3-q10 all start "the"
  kt-ch3-l4-q10 all start "he"
  kt-ch3-l5-q5  all start "she"
  kt-ch3-l5-q10 all start "they"
  kt-ch3-l7-q10 all start "he"
OK lessons-ch4.json: 7 lessons (JSON shape + mirror + extended lint)
Total mirror-lint issues: 25 (warn-only)
```

No hard-fail errors. 8 X2 bias warnings in Ch3 (previously known). Ch2 and Ch4 pass all lint checks.

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 2 | kt-ch2-l3-q4 | A3 narrative leap (P0) | sentence: "All the animals turned their eyes to the large grey baby." correct[1]=No, explanationZh: "所有人都盯著看 → 不是歡迎 → 答 No" | Sentence is a FACTUAL TRUE statement (animals did turn eyes = Yes). Correct[1]=No only makes sense if implicit question = "Were they welcoming him?" — but that jump from staring→rejection is a 2-step story-level inference not derivable from the sentence. A2 learners have no way to recover the implicit question from the sentence text. This is the clearest A3 violation in the dataset. | Add explicit implicit-question tag in explanationZh: "推理:所有人都用眼睛盯著他,盯著看≠歡迎他 → (本題問:他們是否友善歡迎他?) → 答 No。" Or restructure as listen-comprehension with stated question field: "Were the animals happy to see him?" | No |
| 2 | kt-ch2-l1-q4 | A3 explanationZh incoherence (P0) | sentence: "The reeds stood very still in the soft sun." correct[1]=No, explanationZh: "蘆葦靜靜站著 → 安靜的地方 → 答 No" | Reasoning chain: "reeds still → quiet place → No" — the conclusion "No" has no logical connection to "quiet place." The implicit question is unknowable from sentence or explanationZh. For a teacher or parent reading the card, the reasoning is incoherent. "Quiet place" intuitively maps to "Yes" (was it calm?), not "No." | Clarify implicit question in explanationZh: "推理:蘆葦靜靜、陽光柔和 → 周圍很平靜 → (本題問:此時有沒有危險或威脅?) → 答 No,一切都很安靜。" Or restructure question to have an explicit `question` field. | No |
| Str | Ch2/Ch3/Ch4 all | A3 structural frame absent (P0) | All 21 lessons (7 × 3 chapters) have segmentType="main-story" and 0 references to grandma/Mochi/Hana/奶奶 | The app's brand identity is "奶奶睡前故事" — the grandma outer frame (Mochi jumps wall, Hana wags, grandma opens book, goodnight) is fully missing from Ch2-4. Every chapter opens cold into the inner story. A child completing Ch1 and starting Ch2 hears only "In the warm reeds by the pond, mother duck sat on her nest" — no grandma transition, no Mochi/Hana presence. This breaks the Arabian Nights wrapper that defines the product. | Add at minimum: (a) a 1-sentence outer-prologue narration per chapter ("Mochi jumped onto the wall. Grandma smiled and opened her book. 'Tonight,' she said, 'I will tell you about a little duckling.'") + (b) a 1-sentence outer-outro per chapter ("Grandma closed her book. 'Sweet dreams,' she said softly."). Does not require full 5-segment restructure — even 2 frame sentences per chapter restores the brand arc. | Potentially (new grandma TTS lines) |
| 3 | kt-ch3-l6-q3 | A3 cross-Q explanationZh leak (P1) | sentence: "Long shadows from the trees stretched across the whole road." correct[1]=No, explanationZh: "推理:**太陽變低** + 長影子 → 睡很久 → 答 No" | "太陽變低" is from q2's sentence ("The hare opened his eyes. The sun was low in the sky") — NOT present in q3's sentence. The explanationZh borrows context from a different question, making it non-self-contained. A learner arriving at q3 without q2 context cannot follow the reasoning. | Self-contain: "推理:樹的影子很長 → 代表太陽已經偏斜、時間很晚 → 兔子睡很久了 → (本題問:他只睡了一下嗎?) → 答 No。" Removes the cross-Q dependency. | No |
| 2 | kt-ch2-l4-q11 | A3 tonal break for children (P1) | narration: "His friend dropped to the ground. He ran with his heart pounding..." explanationZh: "他的朋友倒在地上。他跑啊跑,心臟砰砰跳……" | A duck friend is shot (implicitly killed) with no narrative cushioning. For 8-12 children in a bedtime story app, this scene is the most disturbing in Ch2. The explanationZh simply echoes the action without any parent-facing softening. Story arc: friend makes him feel less alone → friend dies from gunshot → he runs alone again. This emotional whiplash has no landing pad. | Add softening to explanationZh: "故事轉折:槍聲嚇到他們,他和野鴨分開了。他繼續一個人跑,心裡很害怕。" Avoids the word "死" / "dropped to the ground" as a stark death moment; focuses on separation and fear rather than mortality. Does not change story — just provides parent-guidance framing. | No |
| 2 | kt-ch2-l1-q6 | A3 schema-not-story answer (P1) | sentence: "Five tiny shapes pushed past the broken shells onto the grass." correct[1]="tiny yellow ducklings", explanationZh: "故事體裁 + **暖色童話** → 黃色" | The story text never establishes that the 5 regular ducklings are yellow. The explanationZh explicitly cites "暖色童話" (warm fairy tale genre) as the source for the "yellow" detail — not story text. This is world-knowledge leakage masquerading as story inference. A2 learners who rely on text-only comprehension are misgauged. Additionally, the distractor "grey chicks" introduces the story's key color (grey = the ugly duckling) as a wrong answer, creating narrative interference — learners who remember the grey duckling may be confused why "grey chicks" is wrong when grey IS the special one. | Two fixes: (1) Add a yellow-duck narration sentence before q6 (e.g., "They were small and yellow and soft.") so the answer is story-grounded. (2) Replace distractor "grey chicks" → "small brown sparrows" to remove the grey-character interference. | No |
| 2 | kt-ch2-l5-q6 | A3 tonal tension (P2) | sentence: "The cat sat heavy on his back and dug into his soft feathers." correct[2]="pressed claws on him" | "Dug into his soft feathers" + "pressed claws on him" is a visceral physical aggression image. For a 8-12 bedtime story, this is unambiguously violent physical cruelty (a cat digging claws into a baby). The explanationZh does not contextualise or soften. | In explanationZh, add: "注意:這裡描述貓不友善的行為;這是故事裡這隻貓的性格,不代表你家的貓喔。" This is a light parent-guidance marker. Alternatively, soften the sentence itself: "The cat climbed onto his back and would not leave." (removes "dug into feathers") — but that requires audio regen. | No (unless sentence changed) |
| 3 | kt-ch3 (8 Qs) | X2 option-list bias (P2) | kt-ch3-l2-q5, l2-q10, l3-q9, l3-q10, l4-q10, l5-q5, l5-q10, l7-q10 | All 4 options start with same word ("to", "he", "the", "she", "they"). Detected by validate-lessons.js. Creates a visual pattern that experienced test-takers can exploit — the common prefix reduces effective choice to the suffix only. Particularly problematic for "he" options where learner sees "he ___" × 4 and only differentiation is the predicate. | Vary option starts: if all start with "he", restructure at least 2 options to not begin with "he" (use pronoun substitution: "he was" → "still asleep" / "fully awake"). | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch2, Ch3, Ch4 |
| Total lessons scanned | 21 |
| Total questions reviewed | ~231 (11 per lesson × 21) |
| Violations found | 8 |
| P0 | 3 |
| P1 | 3 |
| P2 | 2 |
| validate-lessons.js hard fail | 0 |
| Audio regen required | 0 (unless Ch2-l5-q6 sentence softened) |

---

## D. Top 5 P0 (ordered by impact)

### ⚠️ P0-1 — Ch2-4: Grandma outer-frame absent (structural)
**Impact**: Every chapter after Ch1 loses the product's core brand identity. "奶奶睡前故事" has no grandma, no Mochi, no Hana. The Arabian Nights wrapper that emotionally connects all 8 chapters is nonexistent for 87.5% of the content.
**Fix**: Add 2 frame sentences per chapter opening + closing in lessons-ch{2-8}.json. Estimated content: 16 new narration entries (2 × 8 chapters). Grandma TTS lines needed if audio is on (medium effort).
**Audio regen**: Yes (new frame lines), but chapter body unchanged.

### ⚠️ P0-2 — kt-ch2-l3-q4: Factual-Yes sentence answered No (narrative leap)
**Impact**: A learner hears "All the animals turned their eyes to the large grey baby" and is told the answer is "No" — without any visible question. The explanationZh jumps straight to a story-level judgment. This is the hardest A3 violation to defend pedagogically — it violates the "answer follows from sentence" principle and trains learners to distrust the text.
**Fix**: Add explicit `question` field: "Were the animals happy to see him?" then the "No" is immediately logical. Alternatively: recast as listen-comprehension with "What did the animals do when they saw him? → They stared without welcome" and change correct answer accordingly.
**Audio regen**: No.

### ⚠️ P0-3 — kt-ch2-l1-q4: Incoherent explanationZh reasoning chain
**Impact**: "Reeds stood still → quiet place → No" — the "No" has no anchor in the reasoning. Teachers / parents reading the explanationZh with children cannot explain the logic. This undermines confidence in the app's pedagogical transparency.
**Fix**: Add the implicit question in parentheses: "(本題問:這裡有沒有危險?) → 答 No,這裡很平靜。" No content change needed, only explanationZh text edit.
**Audio regen**: No.

---

## E. Narrative voice / pacing improvements (non-violation)

Even absent formal violations, 3 improvements raise story quality:

1. **Ch2 L7 q10 explanationZh** ("長白脖子 + 大翅膀 + 在池塘 → 天鵝"): The moment of revelation — the ugly duckling sees he is a swan — deserves a more emotionally resonant explanation: "他一直都是天鵝。從來不是醜小鴨。只是沒有人告訴他。" This is the emotional climax of Ch2; the clinical "長白脖子 + 大翅膀 → 天鵝" misses the moment. [Pacing improvement: ★★★★]

2. **Ch4 direct address consistency**: The Kipling "my dear" / "O dear listener" address is used in 6 of 7 L opening narration sentences but disappears mid-lesson (e.g., L4-q8: "He wanted to find out where this lazy friend was hiding" — omniscient, no address). Recommend injecting "you see" or "my dear" at 1-2 mid-lesson narration points per lesson to maintain the Kipling oral-story feel. [Pacing improvement: ★★★]

3. **Ch3 L7 final narration** ("Slow and steady wins the race," the tortoise said softly. The hare did not look up…"): The chapter ends on the hare's shame — not the tortoise's triumph. For a children's 8-12 audience, a closing narration beat that acknowledges BOTH could land better: "'You ran well,' the tortoise added. The hare looked up at last." — turns a shame-ending into a shared grace moment, better aligned with the warm-companion brand. [Pacing improvement: ★★★★]

---

*Auditor: Claude (claude-sonnet-4-6) · Angle rotation #5 of 12 · Next unused: A1 (obvious correct / gap-too-easy)*
