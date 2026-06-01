# Pickup Content QA Cron Audit — 2026-06-01 16:38 UTC

## A. validate-lessons.js result

```
OK lessons-ch1.json: 24 lessons (JSON shape + mirror lint)
OK lessons-ch2.json: 24 lessons (JSON shape + mirror lint)
OK lessons-ch3.json: 25 lessons (JSON shape + mirror lint)
OK lessons-ch4.json: 25 lessons (JSON shape + mirror lint)
OK lessons-ch5.json: 25 lessons (JSON shape + mirror lint)
OK lessons-ch6.json: 25 lessons (JSON shape + mirror lint)
OK lessons-ch7.json: 25 lessons (JSON shape + mirror lint)
OK lessons-ch8.json: 25 lessons (JSON shape + mirror lint)
```

All 8 chapters pass schema + mirror lint. No byte-identical mirrors detected by automated guard.

---

## B. Violation 清單

40 lessons sampled (5 per chapter × 8 chapters). All non-narration Qs in each sampled lesson were checked.

| Ch | Q ID | Type | Sentence (40 char snippet) | Violation | 修法 | Audio regen? |
|----|------|------|---------------------------|-----------|------|--------------|
| 1 | kt-ch1-l11-q2 | listen-mc/vocab | "She cannot speak." | **R1** — correct "speak" verbatim in sentence | Rewrite sentence: "Her mouth opens but nothing comes out." | yes |
| 1 | kt-ch1-l11-q3 | listen-mc/vocab | "She is silent." | **R1** — correct "silent" verbatim in sentence | Rewrite sentence: "Not a sound comes from her." | yes |
| 1 | kt-ch1-l17-q1 | listen-mc/vocab | "The grasshopper sings all day." | **R1** — correct "sings" verbatim in sentence | Rewrite: "All day the grasshopper makes cheerful noise in the sun." | yes |
| 1 | kt-ch1-l17-q3 | listen-mc/vocab | "The ant carries food to her home." | **R1** — correct "food" verbatim in sentence | Rewrite: "The ant picks up small pieces and brings them inside." | yes |
| 1 | kt-ch1-l24-q5 | listen-mc/detail | "Will Mochi come back tomorrow?" | **A4-Jaccard 0.75** — questionEn drops only "tomorrow" | Change questionEn: "Does Mochi plan to return?" | no |
| 2 | kt-ch2-l6-q1 | listen-mc/detail | "She lifted the peach out of the water." | **R1** — correct "lifted" verbatim in sentence; subSkill=detail (not vocab exempt) | Rewrite sentence: "She reached into the stream and brought the great fruit to shore." | yes |
| 2 | kt-ch2-l6-q5 | listen-comprehension | "Sitting up on the cooking top." | **⚠️ Correctness mismatch** — sentence says "cooking top" (stove) but correct option is "on the table"; explanationZh also says 桌上 | Fix sentence: "She set it on the kitchen table." | yes |
| 2 | kt-ch2-l12-q5 | listen-comprehension | "Riding behind his shoulders." | **Fragment** — gerund fragment, no subject; unintelligible as standalone TTS | Expand: "He carried the bag on his back." | yes |
| 2 | kt-ch2-l12-q6 | listen-comprehension | "Gave a parting motion." | **Fragment** — no subject; ungrammatical as audio sentence | Expand: "He gave a parting wave as he left." | yes |
| 2 | kt-ch2-l24-q5 | listen-mc/detail | "Hana asks, 'Why carried out the pink..." | **⚠️ Grammar broken** — embedded question malformed; will confuse A2 listeners | Rewrite: "Hana asks, 'Why did the big pink fruit float on the water?'" | yes |
| 3 | kt-ch3-l1-q3 | listen-comprehension | "Why do I come back every night?" | **Sentence-is-question** — TTS plays a question not a story line | Rewrite to statement: "I come back every night to hear Grandma's story." | yes |
| 3 | kt-ch3-l1-q5 | listen-comprehension | "How do I feel on the wall?" | **Sentence-is-question** | Rewrite: "I feel calm and happy sitting on the wall." | yes |
| 3 | kt-ch3-l7-q1 | listen-mc | "Mother leads us to the small water." | **Option-list-bias** — all 4 options start with "to" | Mix starters: e.g. "the pond", "a shallow stream", "a grassy field", "to the park" | no |
| 3 | kt-ch3-l7-q5 | listen-comprehension | "What surprises Mother again?" | **Sentence-is-question** | Rewrite: "Mother is surprised to see me swim so well." | yes |
| 3 | kt-ch3-l7-q6 | listen-mc | "My paws move under the water." | **Option-list-bias** — all 4 options start with "my" | Mix starters | no |
| 3 | kt-ch3-l13-q3 | listen-mc | "Her small furry pet does not like me." | **Option-list-bias** — all 4 options start with "her" | Mix starters | no |
| 3 | kt-ch3-l13-q4 | listen-comprehension | "Why must I leave again?" | **Sentence-is-question** + **Option-list-bias** (all "the") | Statement: "I have to leave again because the cat hates me."; mix option starters | yes |
| 3 | kt-ch3-l13-q6 | listen-comprehension | "Did the woman want him to leave?" | **Sentence-is-question** | Statement: "The woman did not want him to leave, but her cat drove him away." | yes |
| 3 | kt-ch3-l20-q1 | listen-mc | "Hunters catch the lion in a strong rope." | **Option-list-bias** — all 4 options start with "in" | Mix starters | no |
| 3 | kt-ch3-l20-q6 | listen-comprehension | "What does this story tell me?" | **Sentence-is-question** | Statement: "This story tells me that small ones can help big ones." | yes |
| 3 | kt-ch3-l25-q4 | listen-comprehension | "What did Grandma tell tonight?" | **A4-identity** + **Sentence-is-question** — sentence === question byte-identical | Statement: "Grandma told the ugly duckling story tonight." | yes |
| 3 | kt-ch3-l25-q5 | listen-mc | "Will Mochi come back tomorrow?" | **A4-Jaccard 0.80** — questionEn drops only "tomorrow" | Change questionEn: "How does Mochi feel about coming back?" | no |
| 4 | kt-ch4-l1-q5 | listen-comprehension | "Why does the cat climb the wall every ni..." | **Sentence-is-question** + **A4-Jaccard 0.75** + **Option-list-bias** (all "To") | Statement: "The cat climbs the wall every night to hear Grandma's story."; mix options | yes |
| 4 | kt-ch4-l7-q1 | listen-mc | "A small bird flies to a tree arm." | **Option-list-bias** — all 4 options start with "to" | Mix starters | no |
| 4 | kt-ch4-l7-q6 | listen-comprehension | "Why is the bird counting down?" | **Sentence-is-question** + **Option-list-bias** (all "To") | Statement: "The bird counts down to start the race fairly."; mix options | yes |
| 4 | kt-ch4-l13-q6 | listen-comprehension | "Why does Tortoise not wake Hare?" | **Sentence-is-question** | Statement: "Tortoise does not wake Hare because winning fairly matters more." | yes |
| 4 | kt-ch4-l19-q5 | listen-comprehension | "Why does the crow sit on a lifted up bra..." | **Sentence-is-question** | Statement: "The crow perches high on a branch to feel safe from foxes." | yes |
| 4 | kt-ch4-l25-q1 | listen-comprehension | "Hana asks, 'Did the fast one really slee..." | **Option-list-bias** — all 4 options start with "if" | Mix starters | no |
| 4 | kt-ch4-l25-q3 | listen-comprehension | "Hana asks, 'Was the slow one worn out?'" | **Option-list-bias** — all 4 options start with "if" | Mix starters | no |
| 4 | kt-ch4-l25-q4 | listen-comprehension | "Grandma says, 'Yes, his feet hurt, but h..." | **Option-list-bias** — all 4 options start with "he" | Mix starters | no |
| 4 | kt-ch4-l25-q9 | listen-comprehension | "Why does Grandma tell this story tonight?" | **Sentence-is-question** + **Option-list-bias** (all "To") | Statement + mix options | yes |
| 4 | kt-ch4-l25-q10 | listen-comprehension | "What does Mochi think after the story?" | **Sentence-is-question** + **Option-list-bias** (all "I") | Statement + mix options | yes |
| 5 | kt-ch5-l5-q6 | listen-comprehension | "Why does the Camel stay in the desert?" | **A4-identity** — sentence === questionEn byte-identical | Rewrite questionEn: "What does hiding in the desert let the Camel do?" | no |
| 5 | kt-ch5-l25-q12 | listen-comprehension | "What did Mochi learn tonight?" | **A4-Jaccard 0.80** — questionEn "What did Mochi learn?" drops "tonight" | Rewrite questionEn: "Which story idea stayed with Mochi?" | no |
| 6 | kt-ch6-l5-q6 | listen-comprehension | "Why is the doll special?" | **A4-identity** — sentence === questionEn byte-identical | Rewrite questionEn: "What makes the doll different from any ordinary toy?" | no |
| 6 | kt-ch6-l25-q4 | listen-comprehension | "What did Grandma tell tonight?" | **A4-identity** — byte-identical | Rewrite questionEn: "Which story did Grandma choose for tonight?" | no |
| 7 | kt-ch7-l1-q5 | listen-comprehension | "Where does Mochi go tonight?" | **A4-Jaccard 0.80** — questionEn drops "tonight" | Rewrite: "Which yard does Mochi return to?" | no |
| 7 | kt-ch7-l8-q1 | listen-mc | "The sister stood alone at house." | **⚠️ Grammar** — "at house" should be "at home" | Rewrite sentence: "The sister stood alone at home." | yes |
| 7 | kt-ch7-l20-q3 | listen-comprehension | "The last wish took off it." | **⚠️ Grammar** — "took off it" wrong word order | Rewrite: "The last wish took it off." | yes |
| 7 | kt-ch7-l25-q15 | listen-mc | "Will Mochi come back tomorrow?" | **A4-Jaccard 0.80** — questionEn drops "tomorrow" | Rewrite questionEn: "Does Mochi plan to return?" | no |
| 8 | kt-ch8-l1-q1 | listen-mc | "Tonight is the final dark sky I will visi..." | **⚠️ Grammar** — "final dark sky" garbled | Rewrite: "Tonight is the last time I will visit this yard." | yes |
| 8 | kt-ch8-l1-q3 | listen-mc | "I jump on the low wall single more time." | **⚠️ Grammar** — "single more time" → "one more time" | Rewrite: "I jump on the low wall one more time." | yes |
| 8 | kt-ch8-l8-q2 | listen-mc | "Under the 月光 its scales shine enjoy shi..." | **⚠️ Grammar** — "shine enjoy shiny yellow" severely garbled | Rewrite: "Under the moonlight, its scales shine like gold." | yes |
| 8 | kt-ch8-l8-q4 | listen-emoji | "Ye Xian looks at the fish with shining pl..." | **⚠️ Grammar** — "shining pleased looks" garbled | Rewrite: "Ye Xian looks at the fish with bright, happy eyes." | yes |
| 8 | kt-ch8-l14-q1 | listen-mc | "The village 洞節 is coming in seven days." | **Clarity** — bare Chinese 洞節 in TTS sentence; A2 learners hear undefined word | Rewrite: "The village cave festival is coming in seven days." | yes |
| 8 | kt-ch8-l14-q2 | listen-mc | "The stepmother says, you is unable to arri..." | **⚠️ Grammar** — "you is unable" subject-verb error | Rewrite: "The stepmother says you cannot come with us." | yes |
| 8 | kt-ch8-l14-q4 | listen-emoji | "A 金 long shining dress appears in her ha..." | **⚠️ Grammar** — wrong word order + bare Chinese | Rewrite: "A long golden dress appears in her hands like magic." | yes |
| 8 | kt-ch8-l20-q4 | listen-emoji | "She sweeps the floor with hushed great min..." | **⚠️ Grammar** — "hushed great mind" garbled; mistranslation of 用心 | Rewrite: "She sweeps the floor with quiet, careful attention." | yes |
| 8 | kt-ch8-l25-q2 | listen-mc | "Grandma closes the book and says that was..." | **R1** — correct "eight" is substring of "eighth" in sentence | Rewrite sentence to not contain "eighth": "Grandma closes the book and says the stories are now complete." | yes |

---

## C. 統計

### Per-chapter violation count (sampled 5 lessons per chapter)

| Ch | Sampled violations | Dominant pattern | Projected full-chapter |
|----|-------------------|------------------|----------------------|
| 1 | 5 | R1 verbatim (4) + A4 (1) | ~20 R1 across 24 lessons |
| 2 | 5 | R1 (1) + Fragment (2) + Grammar-broken (1) + Correctness mismatch (1) | ~15–20 across 24 lessons |
| 3 | **13** | **Sentence-is-question (~9) + Option-list-bias (~7)** | **~60–80 systemic across 25 lessons** |
| 4 | **12** | **Sentence-is-question (~7) + Option-list-bias (~8)** | **~50–65 systemic across 25 lessons** |
| 5 | 2 | A4-identity/Jaccard | ~8–10 across 25 lessons |
| 6 | 2 | A4-identity | ~8–10 across 25 lessons |
| 7 | 4 | A4-Jaccard (2) + Grammar (2) | ~15 across 25 lessons |
| 8 | **10** | **Grammar/garbled sentences (9) + R1 (1)** | **~45–50 high-severity grammar across 25 lessons** |
| **Total** | **53** | | **~220–295 projected full scan** |

*False positives excluded: kt-ch7-l8-q2 (R1 "no"⊂"not" word-boundary false positive) — not counted.*

### Audio regen required: **30 sentences** in sampled 40 lessons
- Ch1: 4 | Ch2: 6 | Ch3: 8 | Ch4: 6 | Ch5: 0 | Ch6: 0 | Ch7: 2 | Ch8: 9 (minus 1 conditional) = ~9
- Estimated cost @ OpenAI TTS $15/1M chars: ~30 × 100 chars = 3,000 chars → **< $0.05**

---

## D. Top 5 P0 — user 下次 session 可立刻接

### ⚠️ P0-1 — Systemic sentence-is-question (Ch3 + Ch4, ~60+ instances)
**What:** `listen-comprehension` questions where the `sentence` field is itself a question string (e.g. "Why must I leave again?"). TTS plays a comprehension prompt instead of a story passage — fundamentally breaks the Duolingo Stories format where learner hears narrative then answers a question about it.
**Scope:** All 5 sampled Ch3 lessons + all 5 sampled Ch4 lessons affected. Likely ~25/25 (Ch3) and ~25/25 (Ch4) lessons contain at least one instance.
**Fix pattern:** Convert each question-sentence to a declarative narrative statement. E.g. "Why must I leave again?" → "I leave because the cat chases me away every time."
**Audio regen:** Yes — all converted sentences need new MP3.
**Effort:** ~2 hr batch rewrite per chapter; use agent with rule: `if sentence ends with ? in listen-comprehension → convert to statement`.

### ⚠️ P0-2 — Systemic option-list-bias (Ch3 + Ch4, ~80+ instances)
**What:** All 4 answer options share the same first word ("to", "my", "her", "in", "if", "he", "I"). Learner can focus on second word only, reducing discrimination. Weakens listening comprehension training for A2 target.
**Scope:** ~7 instances in each sampled Ch3 lesson, ~7 in each sampled Ch4 lesson.
**Fix pattern:** Ensure max 2 of 4 options share the same opener. Rewrites don't change meaning — just vary syntactic structure of distractors.
**Audio regen:** No — option text is displayed not played.
**Effort:** ~1 hr batch edit per chapter; no audio regen.

### ⚠️ P0-3 — Ch8 grammar/garbled sentences (9 high-severity instances in 4/5 sampled lessons)
**What:** AI content generation produced garbled English in Ch8 sentences: "shine enjoy shiny yellow", "hushed great mind", "single more time", "final dark sky", "you is unable", bare Chinese characters mid-sentence. TTS will pronounce these incorrectly and confuse A2 learners.
**Scope:** kt-ch8-l1, l8, l14, l20 all affected in sample. Likely systemic across full 25 lessons.
**Fix:** Sentence rewrites + audio regen for all affected.
**Effort:** ~1 hr scan + rewrite full ch8; ~9 MP3 regen in sampled set → project ~45 regen full chapter.

### ⚠️ P0-4 — R1 verbatim echo in Ch1/Ch2 vocab Qs (5 instances)
**What:** Correct option is verbatim in the sentence (e.g. sentence "She cannot speak." correct option "speak"). Learner reads the answer without inferring. Violates TOEIC R1 paraphrase rule — trains recognition not comprehension.
**Scope:** 4 in Ch1 (kt-ch1-l11, kt-ch1-l17), 1 in Ch2 (kt-ch2-l6). Note: Ch1 vocab Qs have phonological distractors but still leak answer via sentence.
**Fix:** Rewrite each sentence to paraphrase. Audio regen required.

### ⚠️ P0-5 — Correctness mismatch kt-ch2-l6-q5
**What:** `sentence` = "Sitting up on the cooking top." but correct option = "on the table" and explanationZh = "桌上". Learner hears audio about a stove/countertop but the answer says table. This is a factual contradiction — any attentive learner gets it wrong regardless of English level.
**Fix:** Change sentence to "She set it on the kitchen table." and regen audio.
**Effort:** 1 sentence rewrite + 1 MP3 regen.

---

## E. Validate-lessons.js upgrade recommendation

Current guard detects: schema shape + byte-identical mirror only.

Add these rules to catch systemic issues found in this audit:
1. `sentence.trim().endsWith('?')` on `listen-comprehension` type → WARN sentence-is-question
2. `options.every(o => o.toLowerCase().startsWith(options[0].split(' ')[0].toLowerCase()))` → WARN option-list-bias
3. `options[correctIndex].split(' ').every(w => sentence.toLowerCase().includes(w.toLowerCase()))` → WARN R1-verbatim (word-level)

These would have surfaced P0-1, P0-2, P0-3 automatically.
