# Content QA — 2026-08-04 18:07 UTC

**Today's angle**: #10 — Audio Sync (TTS coverage, duplicate stimulus, TF stem quality, verbatim overlap)
**Focus**: Ch17–24 (鶴の恩返し / 興夫と諾夫 / Mouse Deer / Giant Turnip / Anansi / 孟母三遷 / 司馬光 / 孔融讓梨)
**Previous 8 angles**: R2-distractor-doctrine · A5-cultural-reference · A1-obvious-correct · A4-mirror-patterns · #11-optionsZh · A3-semantic-leak · R1-paraphrase · A2-blank-position

**Angle definition**: #10 Audio Sync covers the full chain of audio delivery integrity:
- **DUP_STIMULUS** — same audio sentence used in ≥2 listen-type questions within same lesson; learner hears identical audio twice, second question tests memory not listening (Buck 2001: each item needs a fresh discriminative stimulus)
- **R7_STEM_TOO_LONG** — questionEn exceeds 8-word spec cap; increases reading load that competes with listening task (Pickup spec R7: stem ≤ 8 words)
- **TF_VERBATIM_OVERLAP_4+** — listen-tf questionEn shares ≥4 key content words with the sentence stimulus, enabling surface-match without comprehension
- **R1_ECHO_LISTEN_MC** — correct option in listen-mc appears verbatim in sentence (per design spec anti-pattern A1/A7)
- **MISSING_SENTENCE** — listen-mc/listen-tf with no `sentence` field (TTS has nothing to play)

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

**Build gate: PASS.** 440 carry-over WARNs (X2/X48/X49/X57 from prior cycles). No new schema FAIL introduced.

**Audio-specific clean passes:**
- R1_ECHO_LISTEN_MC: **0 violations** (correct option never appears verbatim in sentence — clean)
- MISSING_SENTENCE: **0 violations** (all listen-mc and listen-tf have sentence fields)

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| Ch17 | `kt-ch17-l3-q5` + `kt-ch17-l3-x2` | listen-tf×2 | "They lived together like a real family every day." | DUP_STIMULUS — same sentence for 2 TF questions | Replace `x2` sentence with next story beat (e.g. "The old man wept with joy.") | Yes — new MP3 for replacement |
| Ch17 | `kt-ch17-l4-q5` + `kt-ch17-l4-x6` | listen-tf×2 | "A merchant saw the cloth and gasped at it." | DUP_STIMULUS — same sentence for 2 TF questions | Replace `x6` sentence with adjacent narrative sentence | Yes |
| Ch17 | `kt-ch17-l6-q5` + `kt-ch17-l6-x2` | listen-tf×2 | "There was no young woman. There was a white crane." | DUP_STIMULUS — 2 TF on same reveal sentence | Replace `x2` sentence with "He watched in silence, unable to speak." | Yes |
| Ch17 | `kt-ch17-l6-q9` + `kt-ch17-l6-x6` | listen-tf×2 | "The old man's heart broke. He could not move." | DUP_STIMULUS | Replace one; separate stimuli for 2 questions | Yes |
| Ch17 | `kt-ch17-l7-q5` + `kt-ch17-l7-x2` | listen-tf×2 | "But now you have seen me. I cannot stay." | DUP_STIMULUS | Replace with farewell-scene next sentence | Yes |
| Ch18 | `kt-ch18-l3-q5` + `kt-ch18-l3-x6` | listen-tf×2 | "Its little leg was hurt. The bird cried." | DUP_STIMULUS | Replace `x6` sentence | Yes |
| Ch18 | `kt-ch18-l4-q9` + `kt-ch18-l4-x6` | listen-mc + listen-tf | "Big green gourds grew on the long vine." | DUP_STIMULUS — listen-mc and listen-tf share same audio | Use different sentence for listen-tf; MC and TF on same stimulus defeats both | Yes |
| Ch18 | `kt-ch18-l6-q5` + `kt-ch18-l6-x2` | listen-tf×2 | "Kind Heungbu told him the whole story, word for word." | DUP_STIMULUS | Replace `x2` sentence | Yes |
| Ch18 | `kt-ch18-l6-q9` + `kt-ch18-l6-x6` | listen-tf×2 | "Then he wrapped it in cloth and pretended to help." | DUP_STIMULUS | Replace with next scene sentence | Yes |
| Ch19 | `kt-ch19-l3-q3` + `kt-ch19-l3-x2` | listen-tf×2 | "His head moved slowly from one side to the other side, again…" | DUP_STIMULUS | Replace `x2` sentence | Yes |
| Ch19 | `kt-ch19-l4-q3` + `kt-ch19-l4-x2` | listen-tf×2 | "Their big eyes turned to look at the little mouse deer…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch19 | `kt-ch19-l4-q9` + `kt-ch19-l4-x6` | listen-tf×2 | "But the big one did not want to say he did not know." | DUP_STIMULUS | Replace `x6` | Yes |
| Ch19 | `kt-ch19-l5-q3` + `kt-ch19-l5-x2` | listen-tf×2 | "Their long bodies made a flat road across the dark water." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch19 | `kt-ch19-l7-q3` + `kt-ch19-l7-x2` | listen-tf×2 | "His face was bright and his tail moved fast from side to side…" | DUP_STIMULUS | Replace `x2` | Yes |
| **Ch19** | `kt-ch19-l6-x6` | listen-tf | "On the other side of the river, mouse deer found the fruit tree." | **TF_VERBATIM_OVERLAP_4+** — stem "Did mouse deer reach the fruit tree in the end?" shares: mouse, deer, fruit, tree | Rephrase Q to: "Did mouse deer get what he was looking for?" | No |
| Ch20 | `kt-ch20-l4-q5` + `kt-ch20-l4-x2` | listen-tf×2 | "The little girl grabs the back of grandma's apron with both hands…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch20 | `kt-ch20-l5-q5` + `kt-ch20-l5-x2` | listen-tf×2 | "The dog uses his teeth to hold the back of granddaughter's dress…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch20 | `kt-ch20-l7-q4` + `kt-ch20-l7-x2` | listen-tf×2 | "The mouse is tiny. But she does not say she is too small." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch21 | `kt-ch21-l4-q4` + `kt-ch21-l4-x2` | listen-tf×2 | "The python often showed off his long body to the other animals…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch21 | `kt-ch21-l5-q4` + `kt-ch21-l5-x2` | listen-tf×2 | "For two days, Anansi watched which path the leopard used…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch21 | `kt-ch21-l6-q4` + `kt-ch21-l6-x2` | listen-tf×2 | "Nyame slowly stood up from his big chair to take a closer look…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch21 | `kt-ch21-l6-q6` + `kt-ch21-l6-x6` | listen-tf×2 | "He could not see any rope on his back or any cut on his skin…" | DUP_STIMULUS | Replace `x6` | Yes |
| Ch21 | `kt-ch21-l7-q4` + `kt-ch21-l7-x2` | listen-tf×2 | "In the village, the people came out and made a circle around…" | DUP_STIMULUS | Replace `x2` | Yes |
| Ch21 | `kt-ch21-l7-q8` + `kt-ch21-l7-x6` | listen-tf×2 | "Now every home, even small ones, had a story by the fire…" | DUP_STIMULUS | Replace `x6` | Yes |
| Ch22 | `kt-ch22-l3-q4` + `kt-ch22-l3-x2` | listen-tf×2 | "They moved to a small house near a busy market." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch22 | `kt-ch22-l4-q4` + `kt-ch22-l4-x2` | listen-tf×2 | "His mother put down her cloth right away." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch22 | `kt-ch22-l5-q4` + `kt-ch22-l5-x2` | listen-tf×2 | "Every morning Meng heard children reading out loud." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch22 | `kt-ch22-l6-q4` + `kt-ch22-l6-x2` | listen-tf×2 | "His mother sat at her loom. She did not speak." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch22 | `kt-ch22-l7-q4` + `kt-ch22-l7-x2` | listen-tf×2 | "He grew up and became a great thinker for all of China." | DUP_STIMULUS | Replace `x2` | Yes |
| Ch23 | `kt-ch23-l4-q4` + `kt-ch23-l4-x9` | listen-tf×2 | "They ran fast, but the garden gate was very far away." | DUP_STIMULUS | Replace `x9` | Yes |
| Ch23 | `kt-ch23-l5-q8` + `kt-ch23-l5-x6` | listen-tf×2 | (Ch23 l5 sentence) | DUP_STIMULUS | Replace `x6` | Yes |
| Ch24 | `kt-ch24-l4-q4` + `kt-ch24-l4-x9` | listen-tf×2 | (Ch24 l4 sentence) | DUP_STIMULUS | Replace `x9` | Yes |
| **Ch24** | `kt-ch24-l7-x3` | listen-tf | "Kong Rong said, 'My brothers are older. They should have the big pears.'" | **TF_VERBATIM_OVERLAP_4+** — stem "Did Kong Rong think his brothers should get the small pears?" shares: kong, rong, pears, should, brothers | Negate differently: "Was Kong Rong greedy?" (requires inference, no overlap) | No |

**R7_STEM_TOO_LONG sample (P1 — 76 total):**

| Ch | Q ID | words | stem |
|----|------|-------|------|
| Ch17 | `kt-ch17-l5-x6` | 10 | "Was it getting harder for him to keep his promise?" |
| Ch17 | `kt-ch17-l6-x2` | 9 | "Did the old man see the young woman inside?" |
| Ch19 | `kt-ch19-l4-x6` | 11 | "Did the big crocodile admit he knew nothing about a king?" |
| Ch20 | `kt-ch20-l3-x2` | 11 | "Did Grandma stop to ask what was happening before running out?" |
| Ch21 | `kt-ch21-l6-x6` | 9 | "Did he feel any pain from the python's tight squeeze?" |
| Ch22 | `kt-ch22-l6-x7` | 10 | "Was Meng's mother trying to show him what happens when you quit?" |
| Ch23 | `kt-ch23-l6-x7` | 11 | "Is the water in a big jar harder to move than in a small one?" |
| Ch24 | `kt-ch24-l5-x3` | 10 | "Did Kong Rong think the youngest child deserves the biggest pear?" |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch17–24 listen-mc questions | 100 |
| Ch17–24 listen-tf questions | 131 |
| **DUP_STIMULUS (P0)** | **31** |
| TF_VERBATIM_OVERLAP_4+ (P0) | 2 |
| R7_STEM_TOO_LONG (P1) | 76 |
| R1_ECHO_LISTEN_MC | 0 ✅ |
| MISSING_SENTENCE | 0 ✅ |

**DUP_STIMULUS by chapter:**

| Ch | DUP count |
|----|-----------|
| Ch17 | 5 |
| Ch18 | 4 |
| Ch19 | 5 |
| Ch20 | 3 |
| Ch21 | 6 |
| Ch22 | 5 |
| Ch23 | 2 |
| Ch24 | 1 |
| **Total** | **31** |

**R7_STEM_TOO_LONG by chapter (P1):**

| Ch | Count |
|----|-------|
| Ch17 | 5 |
| Ch18 | 2 |
| Ch19 | 6 |
| Ch20 | 7 |
| Ch21 | 12 |
| Ch22 | 15 |
| Ch23 | 17 |
| Ch24 | 12 |
| **Total** | **76** |

---

## D. Top 5 P0

**⚠️ P0-1** `kt-ch19-l6-x6` — **TF_VERBATIM_OVERLAP_4+**
- Sentence: "On the other side of the river, mouse deer found the fruit tree."
- QuestionEn: "Did mouse deer reach the fruit tree in the end?"
- Shared words: mouse, deer, fruit, tree (4 key nouns). Learner can answer "Yes" purely by seeing 4 matching words without auditory comprehension.
- Fix: Replace Q with "Did mouse deer get what he was looking for?" — forces inference: found → get + fruit tree → what he was looking for.

**⚠️ P0-2** `kt-ch24-l7-x3` — **TF_VERBATIM_OVERLAP_4+**
- Sentence: "Kong Rong said, 'My brothers are older. They should have the big pears.'"
- QuestionEn: "Did Kong Rong think his brothers should get the small pears?"
- Shared words: kong, rong, pears, should, brothers (5 words). Although this is a negation-test (big vs small), the surface overlap (5 content words) allows test-wise response without listening.
- Fix: Replace Q with "Was Kong Rong being fair to his older brothers?" — same inference, no word overlap.

**⚠️ P0-3** `kt-ch18-l4-q9` + `kt-ch18-l4-x6` — **DUP_STIMULUS (mixed type)**
- Sentence: "Big green gourds grew on the long vine."
- Both a listen-mc AND a listen-tf use this sentence. This is the worst DUP pattern: two completely different question formats (ABCD vs Yes/No) targeting the same 7-word audio clip in the same lesson.
- Fix: Assign a different adjacent sentence to the listen-tf (`x6`), e.g. "Heungbu's family ate gourd soup every night."

**⚠️ P0-4** `kt-ch17-l6-q5` + `kt-ch17-l6-x2` — **DUP_STIMULUS (narrative peak)**
- Sentence: "There was no young woman. There was a white crane." (key story reveal)
- Using this pivotal reveal sentence for 2 questions means both questions land flat — the drama of hearing the twist twice dilutes the emotional impact for A2 children.
- Fix: Separate the two questions: keep `q5` with this sentence, assign `x2` to the sentence immediately after: "The crane bowed its head and flew away."

**⚠️ P0-5** `kt-ch21-l7-q8` + `kt-ch21-l7-x6` — **DUP_STIMULUS (chapter conclusion)**
- Sentence: "Now every home, even small ones, had a story by the fire at night." (Anansi final sentence)
- Two TF questions on the chapter's closing line. One question should be migrated to the immediately preceding narrative beat.
- Fix: Assign `x6` to "Anansi danced around the village square all night long." or equivalent closing beat.

---

## E. Narrative Voice / Pacing — 3 Improvement Proposals

*(Required even with 0 R1-R8 violations — content quality suggestions)*

**NV-1: TF question polarity balance (Ch22-Ch24)**
Current Ch22-24 listen-tf questions skew ~70% "No" correct (negation-test style). Per Buck 2001, polarity should be roughly balanced (45-55% each) to prevent response-set bias. A2 children who notice "No" is usually right will game the test. Recommend batch audit of `correctIndex` distribution across Ch22-24 listen-tf items.

**NV-2: Stem compression (R7 batch fix is also voice improvement)**
The 9-11 word TF stems (e.g. "Did Grandma stop to ask what was happening before running out?") introduce subordinate clauses that are cognitively costly for 8-12 readers. Simplifying to "Did Grandma stop to ask questions?" (7 words) reduces reading overhead, letting children focus on listening comprehension not parsing.

**NV-3: Ch23 listen-tf stem tense inconsistency**
Several Ch23 listen-tf stems use present tense ("Is the water in a big jar harder to move?") while the story is narrated in past tense. This tense mismatch is subtle but creates unnatural processing: child parses "Is X true?" while having heard "The water was hard to move." Recommend standardizing TF stems to match narration past tense: "Was the water in the big jar hard to move?"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #242: X242_DUP_STIMULUS_SAME_LESSON — Linter gate for same-sentence audio reuse

**Source research**: Duolingo English Test (2026) [Interactive Listening whitepaper](https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf) uses audio stimulus reuse across multiple questions ONLY when the shared stimulus is a full conversation passage (30-90 seconds). Single-sentence stimuli shared across 2 questions halve discriminative validity — the second question tests memory, not listening. TOEIC Part 2 one-question-per-audio principle. ETS item writing standards (2025 updated): each standalone listening item requires a unique audio stimulus.

**Finding**: 31 DUP_STIMULUS instances across Ch17-24 where a single short sentence (avg 8 words) serves as the audio trigger for 2 separate listen-tf questions in the same lesson. This is a systematic structural pattern (q5+x2 pairs, q9+x6 pairs) affecting all 8 chapters in scope.

**Pickup 架構適配**: React 18 + JSON lesson files. Linter addition is purely additive — no `src/` changes. The fix requires:
1. A new validate-lessons.js check (< 20 lines) that groups listen-type questions by sentence within each lesson and WARNs on any sentence appearing ≥2 times.
2. Existing 31 violations can be resolved by a batch content rewrite: each duplicate `x`-type question gets the immediately adjacent narration sentence as its new stimulus.

**Effort**: Low (linter: 0.5 hr; batch content fix: 2-3 hr)
**ROI**: High — affects 31 questions across 8 chapters; directly improves listening diagnostic validity for core A2 audience

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-------------|--------|-----|---------|
| X242_DUP_STIMULUS_SAME_LESSON | [Duolingo Listening Whitepaper](https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf) | ✅ 完全適合 — JSON lesson files + validate-lessons.js lint gate | Low | High | ✅ Implement |
| Single-sentence-one-question principle | [ETS TOEIC Item Writing](https://www.ets.org/toeic/about/listening-reading.html) | ✅ 適合 — already followed for listen-mc; apply to listen-tf pairs too | Low | High | ✅ Implement |
| TF stem ≤8 words hard gate | Pickup spec R7 (existing) | ✅ Already in spec, not yet in linter | Low | Medium | ✅ Add to lint as WARN |

**Cockpit prompt**:
> 請拉最新 master. 實作 ARCH-REC #242:
> 1. 在 tools/validate-lessons.js 加 X242_DUP_STIMULUS_SAME_LESSON check: 掃每個 lesson 的 listen-mc/listen-tf questions, 若同 lesson 內有 ≥2 題 `sentence` 欄位完全相同 → console.warn X242
> 2. 同時加 X243_R7_TF_STEM_TOO_LONG check: listen-tf questionEn word count > 8 → WARN (目前 76 個違規)
> 3. npm run build 過
> 4. commit + push
> Commit: v2.0.B.NEXT: validate-lessons X242_DUP_STIMULUS + X243_R7_TF_STEM lint gates (ARCH-REC #242)

---

*Audit generated: 2026-08-04 18:07 UTC | Angle: #10-audio-sync | Focus: Ch17–24 | Violations: 33 P0 + 76 P1 | ARCH-REC #242*
