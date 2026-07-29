# Content QA — 2026-07-29 18:07 UTC

**Today's angle:** A4 — Mirror Patterns: Antonym Pairs + Identity Echo
**Focus:** Ch1–8 (Momotaro, Ugly Duckling, Tortoise & Hare, Camel's Hump, Baba Yaga, Six Swans, Yexian, Three Little Pigs)
**Scope:** All MC-type Qs in 8 chapters — listen-mc / comprehension / picture-mc / emoji-pick
**Auditor:** cron-content-qa automated session
**Previous 8-cycle angles (not repeated this run):** #11-optionsZh, A5-cultural, A6-option-in-question, A3-narrative-leak, R2-distractor, A2-blank-position, R1-paraphrase, A7-content-word

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
X57_ANTONYM_PAIR_MIRROR total: 73 items across 28 chapters
  Ch1-8 subset: 14 items
```

No schema failures. Build gate: PASS.

**New angle-specific finding (unlinted):** Identity-mirror sub-pattern — correct option content-word overlap ≥ 0.70 with sentence — detected 11 violations in Ch1–8 alone. Not currently caught by any lint rule (X48 catches ≥3-gram verbatim; this catches paraphrase-level echo). Estimated 80–100 corpus-wide.

---

## B. Violation Table

### B1. Antonym-Mirror (X57) — 14 violations Ch1–8

| # | Ch | Q ID | type | sentence (first 80 chars) | options | antonym pair | P-level | 修法 | audio? |
|---|----|----|------|--------------------------|---------|-------------|---------|------|--------|
| 1 | 2 | kt-ch2-l5-q10 | emoji-pick | "The wind under the door felt sharper than the cat's claws on his back." | ☀️warm sun / ❄️cold night (others: beach, spring garden) | **warm ↔ cold** | **P0** — 2 options clearly off-topic (beach, spring); child picks between warm/cold only | Remove ☀️warm sun; replace: "🌬️ windy tunnel" | No |
| 2 | 3 | kt-ch3-l5-q7 | emoji-pick | "How was the field?" | 🤫very quiet / 🎉noisy and fun / 🌧️rainy / 🔥on fire | **quiet ↔ noisy** | **P0** — rainy/fire clearly wrong; pure 2-choice binary | Replace 🎉noisy: use "🦋 colourful and bright" | No |
| 3 | 5 | kt-ch5-l3-x7 | picture-mc | "Her legs grew heavy. Her feet hurt. Still she walked." | light and fast / **heavy and sore** / warm and rested / cold and numb | **light ↔ heavy** | **P0** — sentence echoes "heavy" + "feet hurt"; correct = "heavy and sore" trivially inferred | Replace "light and fast": use "rested and ready" | No |
| 4 | 1 | kt-ch1-l6-x1 | comprehension | "They reached the demon gate. To their surprise, it was wide open." | "locked tight shut" / "the door stood wide open with no guards" | **shut ↔ open** | **P0+R1** — sentence says "wide open"; correct says "wide open" (verbatim echo) AND antonym distractor present; double defect | Rewrite correct: "the entrance had no guards at all" | No |
| 5 | 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were loud, and his voice was soft like honey." | "soft knock, shy voice" / "loud knock, sweet voice" | **soft ↔ loud** | **P0+R1** — "loud" in sentence echoes correct; "soft knock" is direct antonym. correct also has semi-echo "sweet" from "honey" | Replace "soft knock, shy voice": "a gentle tap and a harsh yell" | No |
| 6 | 3 | kt-ch3-l3-x3 | picture-mc | "The grass was soft. The sun was warm on his fur." | "warm, soft and comfortable" / "raining and cool" | **warm ↔ cool** | **P1+R1** — sentence says "warm on his fur"; correct echoes "warm, soft" verbatim; "raining and cool" is antonym | Rewrite correct: "sunny and pleasant" | No |
| 7 | 2 | kt-ch2-l5-x12 | picture-mc | "The old woman kept him in her warm kitchen for many weeks." | "with a warm friend close by" / "in the cold, without any hope" | **warm ↔ cold** | **P1+R1** — sentence says "warm kitchen"; distractor 0 echoes "warm"; correct = "in the cold, without any hope" (this is pre-shelter framing but warm/cold still an antonym tell) | Replace option 0: "with the hens pecking at his feet" | No |
| 8 | 1 | kt-ch1-l3-q7 | listen-mc | "By the time he was ten, he was already taller than most men." | "weak and shy" / "fast and strong" | **weak ↔ strong** | **P1** — "taller than most men" → strong is inferrable; weak is obvious antonym | Replace "weak and shy": "short and gentle" | No |
| 9 | 3 | kt-ch3-l7-q5 | listen-mc | "Every animal at the field began to cheer and stamp their feet." | "sad and worried" / "excited and happy" | **sad ↔ happy** | **P1** — "cheer" → happy is near-verbatim; sad is antonym complement | Replace "sad and worried": "nervous and uncertain" | No |
| 10 | 2 | kt-ch2-l3-x11 | comprehension | "There were big hens, loud ducks, and an angry old goose in the farmyard." | "mostly empty with a few sleeping birds" / "full of many loud animals" | **empty ↔ full** | **P1** — sentence explicitly describes "big hens, loud ducks, angry goose" → "full of many" is direct echo + "empty" is antonym | Replace "mostly empty...": "a calm morning with one sleeping bird" | No |
| 11 | 1 | kt-ch1-l3-x7 | comprehension | "\"Before the demons come for us,\" he said quietly, \"I will go to them.\"" | "brave and protective" / "lazy and much afraid" | **brave ↔ afraid** | **P2** — longer descriptive options provide some cover; "brave" still clear emotional antonym of "afraid" | Replace "lazy and much afraid": "calm and very careful" | No |
| 12 | 1 | kt-ch1-l7-x6 | comprehension | "Every neighbor stepped outside to cheer as the boat arrived." | "worried and scared" / "joyful and proud" | **scared ↔ joyful** | **P2** — "confused and uncertain" and "tired and uninterested" provide decent cover; emotional axis still narrows | Replace "worried and scared": "curious and watchful" | No |
| 13 | 5 | kt-ch5-l4-x6 | picture-mc | "At last she came to a wide open place in the trees." | "tired and scared" / "proud and strong" | **scared ↔ proud** | **P2** — indirect emotional antonym (lint flags "proud"; options cover multiple axes) | Replace "proud and strong": "surprised and hopeful" | No |
| 14 | 7 | kt-ch7-l7-q8 | emoji-pick | "What did the king do for Yexian?" | 🍞 gave her bread / 🚢 took her home | **gave ↔ took** | **P2** — directional near-antonym (give/take transfer axis); emoji options otherwise well-spread | Replace 🍞: "🎁 gave her a new dress" | No |

### B2. Identity-Mirror (Unlinted, new A4 sub-pattern) — 11 violations Ch1–8

| # | Ch | Q ID | type | sentence | correct option | overlap | P-level | 修法 |
|---|----|----|------|----------|---------------|---------|---------|------|
| 1 | 2 | kt-ch2-l4-x12 | picture-mc | "two wild ducks let him rest beside them in the tall grass" | "in tall grass beside wild ducks" | **1.00** | **P0** — verbatim paraphrase; correct is not a comprehension test, it is a copy | Rewrite: "sheltered among friendly birds outdoors" |
| 2 | 5 | kt-ch5-l7-x6 | picture-mc | "she could not look away" (sentence ends here) | "could not look away" | **1.00** | **P0** — correct is word-for-word the second clause of the sentence | Rewrite: "was held there, frozen by fear" |
| 3 | 8 | kt-ch8-l3-q3 | listen-mc | "he picked sticks because they felt firmer than straw" | "they were firmer than straw" | **1.00** | **P0** — also flagged by X48_NGRAM ("firmer than straw"). Exact 3-gram overlap | Rewrite: "straw bent but sticks held steady" |
| 4 | 7 | kt-ch7-l4-q5 | listen-mc | "the bones of your fish lie under the heap by the gate" | "under a pile by the gate" | **0.75** | **P1** — "pile" = "heap" paraphrase, location identical | Rewrite: "buried close to where you entered" |
| 5 | 8 | kt-ch8-l6-q9 | listen-mc | "both brothers ran out the back, fast as they could" | "out the back, very fast" | **0.75** | **P1** — also flagged X48_NGRAM ("out the back"). Near-verbatim | Rewrite: "escaped through the rear of the house" |
| 6 | 1 | kt-ch1-l5-x5 | comprehension | "a thick mist rolled in around the boat" | "thick mist surrounded the boat" | **0.75** | **P1** — content words almost identical; "surrounded" ≈ "rolled in around" | Rewrite: "they lost all sight of land and sky" |
| 7 | 2 | kt-ch2-l5-x1 | picture-mc | "he found a small cottage in the woods. an old woman kept him..." | "in an old woman's warm kitchen" | **0.80** | **P1** — sentence says "old woman" and "warm" (kitchen context); 80% overlap | Rewrite: "given shelter by a stranger who lived alone" |
| 8 | 6 | kt-ch6-l7-q5 | listen-mc | "she lifted the small white shirts and threw one over each bird" | "threw one on each swan" | **0.75** | **P2** — "swan" = paraphrase of "bird" from prior context; "threw one" is near-verbatim | Rewrite: "covered her brothers with the woven cloth" |
| 9 | 7 | kt-ch7-l3-q10 | listen-mc | "her only friend was gone, and she did not know why" | "Yexian loses her only friend" | **0.75** | **P2** — core content identical; adds name but reduces complexity | Rewrite: "Yexian is left alone and heartbroken" (inference) |
| 10 | 7 | kt-ch7-l7-x4 | picture-mc | "quiet, with one bare foot, yexian stepped out from behind the new wife" | "Yexian, one foot bare, stepping out" | **0.83** | **P2** — heavily echoes sentence structure; correct is a caption not a comprehension probe | Rewrite: "Yexian revealed herself at last" |
| 11 | 1 | kt-ch1-l3-x1 | comprehension | "inside the peach was a tiny baby boy, crying softly" | "one tiny crying baby" | **0.75** | **P2** — content words identical; just restructured. No comprehension challenge | Rewrite: "a child who had not yet seen the world" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| **Antonym-mirror (X57) — corpus total** | 73 items, 28 chapters |
| **Antonym-mirror (X57) — Ch1–8** | 14 items |
| Ch with most X57 (corpus) | Ch16 (5), Ch29/28/26/23/20/19/Ch1 (4 each) |
| P0 antonym-mirror violations | 5 |
| P1 antonym-mirror violations | 5 |
| P2 antonym-mirror violations | 4 |
| **Identity-mirror (unlinted) — Ch1–8** | 11 items |
| Identity-mirror 100% overlap (P0) | 3 |
| Identity-mirror 0.75–0.83 overlap (P1/P2) | 8 |
| Estimated identity-mirror corpus-wide | ~85–100 |
| X57 + X48 double-flagged items | 2 (kt-ch8-l3-q3, kt-ch8-l6-q9) |
| New unlinted pattern surfaced | X58_IDENTITY_MIRROR (proposed rule) |

---

## D. Top 5 P0

1. **⚠️ P0 double-defect** `kt-ch1-l6-x1` (Ch1, comprehension) — sentence says "wide open"; correct says "wide open" (R1 verbatim echo) AND antonym distractor "locked tight shut" present. Child fails zero reading comprehension steps to reach correct. Both defects independently make this a give-away, together it's unambiguous. Fix: rewrite correct as "the entrance had no guards at all".

2. **⚠️ P0** `kt-ch2-l4-x12` (Ch2, picture-mc) — correct option is 100% content-word identical to sentence. "two wild ducks let him rest beside them in the tall grass" → correct = "in tall grass beside wild ducks". No comprehension involved — this is transcription detection. Fix: "sheltered among friendly birds outdoors".

3. **⚠️ P0** `kt-ch5-l7-x6` (Ch5, picture-mc) — correct is literally the verbatim second clause of the sentence ("could not look away"). 100% overlap, zero paraphrase. Fix: "was held there, frozen by fear".

4. **⚠️ P0** `kt-ch2-l5-q10` (Ch2, emoji-pick) — warm/cold antonym in a cold-wind sentence with other two options (beach, spring garden) clearly contextually wrong. 4-choice collapses to 2-choice, then trivially to 1-choice via sentence inference. Fix: replace ☀️ warm sun with "🌬️ windy tunnel".

5. **⚠️ P0** `kt-ch3-l5-q7` (Ch3, emoji-pick) — quiet/noisy antonym pair where 🌧️rainy and 🔥on fire are obviously wrong for any field scene. Pure binary. Fix: replace 🎉 noisy with "🦋 colourful and bright".

---

## E. Narrative Voice / Pacing Improvements (3 proposals — no violation required)

Even where no A4 defect exists, these pacing improvements would strengthen the Ch1–8 narrative experience:

1. **Ch8 "huff and puff" saturation (lessons l3–l5):** Three consecutive lessons (Three Little Pigs ch8-l3, l4, l5) all probe the wolf's knocking/voice/puffing sequence. Uniform stimulus creates predictive priming — children learn the pattern and stop attending to audio. Insert one contrast lesson probing a pig's internal state ("How did the third pig feel watching his brothers run to him?") to break the mechanical repetition cycle.

2. **Ch1 question sub-skill distribution skew:** Momotaro questions cluster heavily on action-detail ("what did X do"), with few inference or gist questions. Ch1 lesson 3 alone has 4 detail Qs in a row. Per R6, inference sub-skill should appear ≥2 per lesson. Adding 1 inference Q per lesson ("Why did Momotaro choose to leave home before the demons arrived?") develops story comprehension over mere recall.

3. **Ch3 adjective-pair parallelism rut (lessons l5–l7):** Multiple consecutive questions use the "adjective + and + adjective" option structure: "scared and quiet / sleepy and slow / sad and worried / excited and happy" (kt-ch3-l7-q5), "warm, soft and comfortable / raining and cool" (kt-ch3-l3-x3). Parallel grammatical structure across all 4 options lets children respond by word-shape rather than meaning. Vary structure: mix noun-phrase options ("a feeling of joy", "a long silence") with adjective pairs.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research context
ACL 2025: "A Survey on Automated Distractor Evaluation in Multiple-Choice Tasks" ([aclanthology.org/2025.bea-1.5.pdf](https://aclanthology.org/2025.bea-1.5.pdf)) introduces the **Distractor Assessment Framework (DAF)** — three automated scores:
- **Incorrectness** (is the distractor actually wrong vs. the correct answer?)
- **Plausibility** (would a student who didn't know the answer select it?)
- **Diversity** (does the distractor test a distinct failure mode from other distractors?)

Duolingo patents (US10147336, US9875669) also use an automated distractor pipeline: extract keywords → phonological/semantic proximity → curator review via UI. Their key invariant: **distractors must not be antonyms or verbatim copies of the correct answer** — both reduce plausibility by signaling binary contrast rather than 4-choice uncertainty.

### Gap analysis: Pickup vs. DAF/Duolingo standard

| DAF check | Pickup current | Gap |
|-----------|---------------|-----|
| Incorrectness (distractor is wrong) | X48_NGRAM catches verbatim-correct | ✅ partial |
| Plausibility (distractor is attractive) | No automated plausibility score | ❌ missing |
| Diversity / antonym ban | X57_ANTONYM_PAIR_MIRROR (warn-only) | 🟡 warn-only, not enforced |
| **Identity-mirror ban** (correct ≈ sentence) | **No lint rule** | **❌ missing** |

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **X58_IDENTITY_MIRROR lint** — flag correct option with content-word overlap ≥ 0.70 vs. sentence | ACL 2025 DAF "incorrectness" check; Duolingo distractor pipeline | ✅ 完全適合 — pure JSON + script change, zero app-code impact; 11 Ch1-8 violations confirmed, ~85–100 corpus-wide | Low (~2hr: add check to `tools/validate-lessons.js`, update lint docs) | Very high — closes blind spot not caught by X48 | **推薦立刻加** |
| X57 upgrade to STRICT_FAIL | ETS item writing standard: antonym distractor = item invalidation | ✅ 適合 — build already has MIRROR_LINT_STRICT=1 hook; just change default | Very low (~30min) | High — 73 items currently pass silently; making it fail-build forces fix before next content push | **推薦升級** |
| DAF plausibility scoring (LLM-as-judge per distractor) | ACL 2025 DAF, Duolingo curator UI | 🟡 部分適合 — technique is right; but requires LLM API call in CI = cost + latency. Better as nightly cron audit than build gate | Medium (~4hr: write scoring script) | Medium — useful for backlog audit, overkill for build gate | 待決定 |
| Phonological distractor tagging (phonetic confusion tracking) | Duolingo patents US10147336/9875669 | 🟡 部分適合 — relevant for listen-mc; Pickup uses TTS not human speech so phonological confusion is low-salience for A2 children | High (requires phoneme transcription) | Low for current A2 target | ❌ 暫不推薦 |

### Recommended action

**ARCH-REC #218: X218_IDENTITY_MIRROR_LINT — correct option content-word overlap lint (≥0.65 warn / ≥0.85 fail)**

Add `X58_IDENTITY_MIRROR` to `tools/validate-lessons.js`: for each MC item, compute content-word overlap between `correct_option` and `sentenceEn`; warn if ≥ 0.65, fail-build if ≥ 0.85. Threshold tuned to catch verbatim paraphrase (100% = definite fail) while allowing correct semantic inference (0.65–0.84 = warn-only for human review). Source: ACL 2025 DAF framework "incorrectness" check. Estimated 11 Ch1-8 violations confirmed, ~85–100 corpus-wide. Effort: ~2hr (validate-lessons.js only, no app-code change).

Also: upgrade X57 `ANTONYM_PAIR_MIRROR` from warn-only to fail-build (`MIRROR_LINT_STRICT=1` default-on). 73 items confirmed antonym-pair; 14 in Ch1-8 have been audited with specific fixes above.
