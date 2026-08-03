# Content QA — 2026-08-03 18:05 UTC

**Today's angle**: A4 Mirror Patterns (negation / identity antonym pairs)
**Focus**: Ch1–8 (Momotaro, Ugly Duckling, Tortoise & Hare, Camel, Baba Yaga, Six Swans, Yexian, Three Little Pigs)
**Angle definition**: When the correct answer and exactly one distractor form an antonym pair, the 4-option MC degrades to a de-facto 2-option choice. Ludewig et al. (2023) found >50% of high-proficiency learners reject antonym distractors outright — making them non-functional for the population a test must discriminate. For A2 children (our primary target), the effect may be stronger due to binary/black-white thinking at that age.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
X57_ANTONYM_PAIR_MIRROR violations Ch0-8: 14
X57 violations across all 34 chapters: 73
(warn-only; MIRROR_LINT_STRICT=1 would fail build)
```

Build otherwise clean. No schema failures. Previous X2/X48/X49 patterns carry over from prior audits.

---

## B. Violation Table — Ch1–8 (A4 Mirror Patterns)

| Ch | Q ID | Type | Sentence (truncated) | Question stem | Correct answer | Antonym distractor | Mirror pair | Severity | Fix | Audio regen? |
|----|------|------|----------------------|---------------|----------------|---------------------|-------------|----------|-----|--------------|
| 1 | kt-ch1-l3-q7 | listen-mc | "By the time he was ten, he was already taller than most men." | How did Momotaro grow? | fast and strong | weak and shy | strong↔weak | P1 | Replace "weak and shy" → "clumsy and slow" (same semantic field, not antonym) | No |
| 1 | kt-ch1-l3-x7 | comprehension | "Before the demons come for us, I will go to them." | What does Momotaro's plan show about his character? | brave and protective of others | lazy and much afraid | brave↔afraid | P1 | Replace "lazy and much afraid" → "careful and unsure" | No |
| 1 | kt-ch1-l6-x1 | comprehension | "They reached the demon gate. To their surprise, it was wide open." | What surprised them at the demon gate? | the door stood wide open with no guards | the heavy gate was locked tight shut | open↔shut **+ R1 verbatim tell** | **P0** | Replace "locked tight shut" → "guarded by many warriors"; also revise correct option from verbatim "wide open" → "unguarded and empty" | No |
| 1 | kt-ch1-l7-x6 | comprehension | "Every neighbor stepped outside to cheer as the boat arrived." | How did the village feel when Momotaro returned? | joyful and proud | worried and scared for him | joyful↔scared | P1 | Replace "worried and scared" → "curious and surprised" | No |
| 2 | kt-ch2-l3-x11 | comprehension | "There were big hens, loud ducks, and an angry old goose in the farmyard." | What was the farmyard like when they arrived? | full of many loud animals | mostly empty with a few sleeping birds | full↔empty | **P0** | Replace "mostly empty with a few sleeping birds" → "quiet, with only one small hen" (retains bird theme, removes antonym) | No |
| 2 | kt-ch2-l5-q10 | emoji-pick | "The wind under the door felt sharper than the cat's claws on his back." | What is waiting outside? | ❄️ cold night | ☀️ warm sun | cold↔warm | **P0** | Replace "☀️ warm sun" → "🌊 river" (unrelated, not antonym) | No |
| 2 | kt-ch2-l5-x12 | picture-mc | "The old woman kept him in her warm kitchen for many weeks." | Where did the grey duckling stay in the cottage? | in the cold, without any hope | with a warm friend close by | cold↔warm + hopeless↔friendly | P1 | ⚠️ Also A3 story leak: sentence says "warm kitchen" but correct answer is "in the cold" — sentence needs to be changed to a pre-cottage context sentence OR correct answer revised to "in the warm kitchen but lonely and ignored" | No |
| 3 | kt-ch3-l3-x3 | picture-mc | "The grass was soft. The sun was warm on his fur." | Why was it easy for the hare to fall asleep? | it was warm, soft and comfortable | it was raining and cool | warm↔cool | P1 | Replace "raining and cool" → "dark and after a long meal" | No |
| 3 | kt-ch3-l5-q7 | emoji-pick | "How was the field?" *(sentence IS the question — circular stem)* | How was the field? | 🤫 very quiet | 🎉 noisy and fun | quiet↔noisy **+ circular stem** | **P0** | Fix stem: "What was the atmosphere at the finish line?" and replace "noisy and fun" → "🌧️ rainy" or "😴 boring and empty" | No |
| 3 | kt-ch3-l7-q5 | listen-mc | "Every animal at the field began to cheer and stamp their feet." | How did the animals feel? | excited and happy | sad and worried | happy↔sad | P1 | Replace "sad and worried" → "confused and uncertain" | No |
| 5 | kt-ch5-l3-x7 | picture-mc | "Her legs grew heavy. Her feet hurt. Still she walked." | How did Vasilisa's body feel? | heavy and sore | light and fast | heavy↔light | P1 | Replace "light and fast" → "numb and cold" | No |
| 5 | kt-ch5-l4-x6 | picture-mc | "At last she came to a wide open place in the trees." | How did Vasilisa feel when she arrived? | tired and scared | proud and strong | tired↔proud (weak pair) | P2 | Weaker mirror — keep as P2; replace "proud and strong" → "calm and ready" | No |
| 7 | kt-ch7-l7-q8 | emoji-pick | "What did the king do for Yexian?" | What did the king do? | 🚢 took her home with him | 🍞 gave her bread | took↔gave (directional antonym) | **P0** | Replace "🍞 gave her bread" → "👑 made her wait for his answer" | No |
| 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were loud, and his voice was soft like honey." | How did the wolf knock and speak? | loud knock, sweet voice | soft knock, shy voice | loud↔soft | P1 | Replace "soft knock, shy voice" → "slow knock, angry voice" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch1–8 X57 violations | 14 |
| P0 violations | 5 |
| P1 violations | 8 |
| P2 violations | 1 |
| Combined A4 + R1 double violations | 1 (kt-ch1-l6-x1) |
| Combined A4 + A3 story-context leak | 1 (kt-ch2-l5-x12) |
| Chapters with 0 violations | Ch4, Ch6 |
| Total X57 across all 34 chapters | 73 |
| Estimated audio regen needed | 0 (all JSON-only fixes) |
| Item types affected | listen-mc ×3, comprehension ×4, emoji-pick ×4, picture-mc ×3 |

---

## D. Top 5 P0

### P0-1: kt-ch1-l6-x1 — Double violation (A4 mirror + R1 verbatim)
**Sentence**: "They reached the demon gate. To their surprise, it was wide open."
**Question**: "What surprised them at the demon gate?"
**Correct**: "the door stood wide open with no guards" — contains verbatim "wide open" from sentence (R1 violaton)
**Antonym distractor**: "the heavy gate was locked tight shut" — open↔shut is maximal antonym pair
**Fix**: Correct → "no guards and the gate stood unlatched"; Distractor → "the gate was guarded by ten warriors"

### P0-2: kt-ch3-l5-q7 — Circular stem + quiet↔noisy antonym
**Sentence**: "How was the field?" *(the sentence IS the question)*
**Correct**: "🤫 very quiet" | **Antonym distractor**: "🎉 noisy and fun"
**Why it matters**: The stimulus IS the question — no narrative sentence to process. The emoji antonym pair makes it a coin-flip. This is the weakest item in Ch3.
**Fix**: Provide real narrative sentence ("A hush fell over the field as all eyes watched.") and replace emoji-pick distractor "noisy and fun" → "🌧️ rainy and cold"

### P0-3: kt-ch2-l5-q10 — emoji-pick warm↔cold with heavy context clue
**Sentence**: "The wind under the door felt sharper than the cat's claws on his back."
**Correct**: "❄️ cold night" | **Antonym distractor**: "☀️ warm sun"
**Why**: "Wind sharper than claws" already tells learners it's cold. A warm sun option is immediately eliminated — leaving 3 options not 4.
**Fix**: Replace "☀️ warm sun" → "🌊 a river" or "🌙 a warm evening" (keep temperature theme but not direct antonym)

### P0-4: kt-ch2-l3-x11 — full↔empty with sentence listing animals
**Sentence**: "There were big hens, loud ducks, and an angry old goose in the farmyard."
**Correct**: "full of many loud animals" | **Antonym distractor**: "mostly empty with a few sleeping birds"
**Why**: Sentence explicitly names 3 animals (hens, ducks, goose) → "full" is obvious → "empty" is trivially eliminated
**Fix**: Replace "mostly empty with a few sleeping birds" → "only one quiet bird, sleeping" (same wrong scale but not antonym) or "peaceful with many sleeping birds"

### P0-5: kt-ch7-l7-q8 — gave↔took directional antonym
**Sentence**: "What did the king do for Yexian?" *(sentence is also question — another circular stem)*
**Correct**: "🚢 took her home with him" | **Antonym distractor**: "🍞 gave her bread"
**Why**: "Gave" and "took" are directional antonyms. For the story context (king meets Yexian), "gave bread" is also thematically wrong (wrong action category entirely) — doubly easy to eliminate.
**Fix**: Replace "🍞 gave her bread" → "💌 sent her a message" (same category of royal action, not antonym of "took")

---

## E. Narrative Voice / Pacing Improvements (3 proposals — required regardless of violation count)

### NV-1: kt-ch2-l5-x12 — Sentence-answer semantic contradiction
**Issue**: Sentence says "The old woman kept him in her warm kitchen for many weeks" but the correct answer is "in the cold, without any hope." This is a story-context mismatch — the sentence describes the duckling's temporary shelter but the correct answer describes a state of inner hopelessness (not cold temperature). A child learner sees "warm kitchen" and then answers "in the cold" — the logic breaks.
**Fix**: Change stimulus sentence to "Even with a roof over his head, he hid in the corner and hoped for nothing." This preserves the post-farmyard story beat while making "without any hope" sensible. Correct option → "sheltered but lonely and hopeless."

### NV-2: kt-ch1-l7-x6 — Inference too shallow for a comprehension-type question
**Issue**: "How did the village feel when Momotaro returned?" with the sentence "Every neighbor stepped outside to cheer as the boat arrived." The sentence SHOWS the action (stepped outside, cheer) and the correct answer NAMES it (joyful and proud). This is direct label-matching, not inference. A comprehension-type question should test one level deeper.
**Improved question**: "What does 'every neighbor stepped outside' tell us about Momotaro?" → Options: (A) He was worried about the neighbors / (B) The whole village cared about his return / (C) He came back with many gifts / (D) Only a few people were happy. This requires inferring social meaning, not just synonym matching.

### NV-3: kt-ch3-l5-q7 — Question lacks story grounding
**Issue**: The emoji-pick item for Ch3-l5 has sentence="How was the field?" which is a meta-prompt, not a story sentence. Emoji-picks should use a real narrative sentence that sets a scene. Without a narrative anchor, learners are just guessing the story mood.
**Fix**: Use the companion narration sentence from the lesson (e.g., "Not a sound came from the field as the two runners waited for the signal.") as the stimulus sentence, then ask "What was the field like?" — this makes the emoji "🤫 very quiet" a genuine listening comprehension task, not free recall.

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #238: X238_A4_ANTONYM_DISTRACTOR_BATCH_FIX

**Research base**: Ludewig, Schwerter & McElvany (2023), "The Features of Plausible but Incorrect Options" (JEPT/Sage) — >50% of higher-proficiency learners reject antonym distractors outright, making them non-functional for the population we want to discriminate. ACL 2025 (arxiv 2501.13125) on plausible distractor generation confirms antonym-type options are "low-utility because they are too easily rejected." SpringerOpen 2018 automatic distractor generation study explicitly lists antonyms as a distractor category that "is not distracting."

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **X238: Promote X57 from WARN→ERROR** after one-time clean-up pass (set `MIRROR_LINT_STRICT=1` in CI after batch fix) | Ludewig 2023; FACS item-writing guidelines ("distractors must be mutually exclusive") | ✅ Perfect fit — no code change; only `MIRROR_LINT_STRICT=1` in build and a one-time fix of 73 items | Low (build flag toggle) after Medium clean-up batch | High — prevents new antonym mirrors from ever entering the content pipeline going forward | **RECOMMEND** — pilot with Ch1-8 (14 items) then flip flag |
| **X238b: Fable-batch antonym-distractor replacement** — dispatch Fable 5 to rewrite only the flagged antonym distractor in each of the 73 X57 items, replacing with a same-semantic-field plausible alternative | Ludewig 2023; ACL 2025 distractor generation | ✅ Pure JSON content fix, no schema change, no audio regen; Fable is ideal (language/aesthetics strongest) | Medium (Fable batch ~73 items × 1 distractor rewrite) | Very High — fixes all 73 violations in one pass, makes X57 promotable to ERROR | **RECOMMEND as Phase 1** before X238 flag promotion |
| Embedding-based distractor independence checker (cosine similarity of option embeddings < 0.85) | ACL 2025 student-choice prediction model | 🟡 Partial — would catch semantic similarities beyond antonyms, but requires embedding model inference at build time; overkill for our JSON pipeline | High | Medium (marginal over current X57 lint) | DEFER — revisit post-v2.1 when content pipeline stabilizes |

**Immediate recommendation**: Run `X238b` Fable batch first (Ch1-8 pilot, 14 items), verify build passes with `MIRROR_LINT_STRICT=1`, then roll the flag permanently. Total cost: one Fable agent batch session.

**Cockpit action item added below.**
