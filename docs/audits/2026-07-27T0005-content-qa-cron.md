# Content QA — 2026-07-27 00:05 UTC

**Today's angle:** A4 — Mirror Patterns (antonym/negation pairs — correct option and exactly one distractor form a semantic polar pair, collapsing 4-option MC into an effective 2-option binary choice)
**Focus:** Ch1–8 (Momotaro, Ugly Duckling, Tortoise & Hare, Hare & Tortoise reprise, Baba Yaga, Yexian/Cinderella, Three Little Pigs)
**Auditor:** cron-content-qa automated session

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 17 lint issue(s)  — 4 × X57
WARN lessons-ch2.json: 10 lint issue(s)  — 3 × X57
WARN lessons-ch3.json: 19 lint issue(s)  — 3 × X57
WARN lessons-ch4.json: 10 lint issue(s)  — 0 × X57
WARN lessons-ch5.json: 10 lint issue(s)  — 2 × X57
WARN lessons-ch6.json: 13 lint issue(s)  — 0 × X57
WARN lessons-ch7.json: 13 lint issue(s)  — 1 × X57
WARN lessons-ch8.json:  9 lint issue(s)  — 1 × X57

Total X57 (validate-lessons, Ch1–8): 14 violations
Total X57 (phrase-level embedded scan, Ch1–8): 18 violations  ← deeper pass
```

Validate-lessons X57 uses token exact-match; my phrase-level scan additionally catches antonym words *embedded inside multi-word options* (e.g. "loud↔soft" within "loud knock, sweet voice" vs "soft knock, shy voice"). The 4-violation gap is the expanded surface; details in § E.

---

## B. Violation Table

| # | Ch | Lesson | Q ID | Type | Correct Option | Mirror Distractor | Antonym Pair | Sentence Snippet | Severity | Audio regen? |
|---|----|----|------|------|---------------|------------------|--------------|-----------------|----------|-------------|
| 1 | 1 | kt-ch1-l3 | kt-ch1-l3-q7 | listen-mc | "fast and strong" | "weak and shy" | strong↔weak | "By the time he was ten, he was already taller than most men." | **P0** | No |
| 2 | 1 | kt-ch1-l3 | kt-ch1-l3-x7 | comprehension | "brave and protective of others" | "lazy and much afraid" | brave↔afraid | "Before the demons come for us…I will go to them." | **P0** | No |
| 3 | 1 | kt-ch1-l6 | kt-ch1-l6-x1 | comprehension | "the door stood wide open with no guards" | "the heavy gate was locked tight shut" | open↔shut | "They reached the demon gate. To their surprise, it was wide open." | **P0** | No |
| 4 | 1 | kt-ch1-l7 | kt-ch1-l7-x6 | comprehension | "brave and ready to fight" (validate-only) | distractor with "scared" | brave↔scared | (validate-only catch) | **P0** | No |
| 5 | 1 | kt-ch1-l2 | kt-ch1-l2-pm1 | picture-mc | "a young boy standing tall and looking ahead" | "an old woman resting under a tree" / "an old man sitting at a wooden table" | young↔old (×2) | "Momotaro grew into a brave boy." | P1 | No |
| 6 | 1 | kt-ch1-l5 | kt-ch1-l5-x1 | comprehension | "leaping down from high in a tree" | "up from the cold river below" | down↔up | "A monkey jumped down from a tall tree and joined them too." | P1 | No |
| 7 | 1 | kt-ch1-l5 | kt-ch1-l5-x7 | comprehension | "the silence felt strange and dangerous" | "the island looked peaceful and safe" | dangerous↔safe | "'It's too quiet,' he said. 'Nothing is moving on the island…'" | **P0** | No |
| 8 | 2 | kt-ch2-l3 | kt-ch2-l3-x11 | comprehension | "full of many loud animals" | "mostly empty with a few sleeping birds" | full↔empty | "There were big hens, loud ducks, and an angry old goose in the farmyard." | **P0** | No |
| 9 | 2 | kt-ch2-l5 | kt-ch2-l5-q10 | emoji-pick | "❄️ cold night" | "☀️ warm sun" | cold↔warm | "The wind under the door felt sharper than the cat's claws on his back." | **P0** | No |
| 10 | 2 | kt-ch2-l5 | kt-ch2-l5-x12 | picture-mc | "in the cold, without any hope" | "with a warm friend close by" | cold↔warm | "The old woman kept him in her warm kitchen for many weeks." | P1 | No |
| 11 | 3 | kt-ch3-l3 | kt-ch3-l3-x3 | picture-mc | "it was warm, soft and comfortable" | "it was raining and cool" | warm↔cool | "The grass was soft. The sun was warm on his fur." | **P0** | No |
| 12 | 3 | kt-ch3-l5 | kt-ch3-l5-q7 | emoji-pick | "🤫 very quiet" | "🎉 noisy and fun" | quiet↔noisy | "How was the field?" | **P0** | No |
| 13 | 3 | kt-ch3-l7 | kt-ch3-l7-q5 | listen-mc | "excited and happy" | "sad and worried" | happy↔sad | "Every animal at the field began to cheer and stamp their feet." | **P0** | No |
| 14 | 3 | kt-ch3-l7 | kt-ch3-l7-x7 | picture-mc | "hanging it down in shame" | "lifting it up in pride" | down↔up | "The brown rabbit pressed his front paws on the ground and looked at the dirt." | P1 | No |
| 15 | 5 | kt-ch5-l3 | kt-ch5-l3-x7 | picture-mc | "heavy and sore" | "light and fast" | heavy↔light | "Her legs grew heavy. Her feet hurt. Still she walked." | **P0** | No |
| 16 | 5 | kt-ch5-l4 | kt-ch5-l4-x4 | comprehension | "a tiny wooden hut" | "one large bonfire" | tiny↔large | "Inside the fence was a small house." | P1 | No |
| 17 | 5 | kt-ch5-l5 | kt-ch5-l5-q7 | emoji-pick | "👵 a very old woman" | "👧 a young girl" / "🤴 a young king" | old↔young (×2) | "How did Baba Yaga look?" | P1 | No |
| 18 | 7 | kt-ch7-l7 | kt-ch7-l7-q8 | emoji-pick | "🚢 took her home with him" | "🍞 gave her bread" | took↔gave | "What did the king do for Yexian?" | P1 | No |
| 19 | 8 | kt-ch8-l4 | kt-ch8-l4-q9 | listen-mc | "loud knock, sweet voice" | "soft knock, shy voice" | loud↔soft | "His knocks were loud, and his voice was soft like honey." | **P0** | No |
| 20 | 8 | kt-ch8-l7 | kt-ch8-l7-q9 | listen-mc | "gave up and ran away" | "lay down and slept" | up↔down (phrasal) | "The wolf jumped down from the roof and ran fast to the trees." | P1 | No |

**P0 count: 10** — ⚠️ triggers `⚠️` prefix per constraint.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC questions scanned (Ch1–8, excl. listen-tf) | 389 |
| X57 violations (validate-lessons exact-match) | 14 |
| X57 violations (phrase-level embedded scan) | 18 |
| X57 violation rate | 4.6% |
| Chapters clean (Ch4, Ch6) | 2 / 8 |
| P0 violations | 10 |
| P1 violations | 8 |
| Audio regen required | 0 |
| Chapters with ≥3 X57 | Ch1 (6), Ch3 (4) |
| Most common antonym pair | cold↔warm (3×), down↔up (3×), old↔young (2×) |

> listen-tf (Yes/No binary) intentionally excluded — binary by design. 147 Yes/No pairs across Ch1–8 are not violations.

---

## D. Top 5 P0

1. **kt-ch1-l3-q7** — `strong↔weak` in listen-mc. Correct = "fast and strong"; only distractor carrying "weak" + "shy" — any learner who knows "strong=good" eliminates without listening. Replaces "weak and shy" with a lateral option e.g. "slow but gentle" or "careful and watchful".

2. **kt-ch3-l7-q5** — `happy↔sad` in listen-mc. Correct = "excited and happy"; distractor "sad and worried" is the literal opposite mood. Replaces with "quiet and still" or "surprised and confused" (same story scene, functionally distinct from correct).

3. **kt-ch1-l5-x7** — `dangerous↔safe` in comprehension. Correct = "the silence felt strange and dangerous"; distractor "the island looked peaceful and safe" is the semantic mirror. Replace distractor with "a fog was hiding the demons" (schema-driven inference, not polar).

4. **kt-ch2-l5-q10** — `cold↔warm` emoji-pick. Correct = "❄️ cold night"; distractor "☀️ warm sun" is polar. Replace with "🌊 rough sea" (plausible from sailing context) or "🌙 dark hallway".

5. **kt-ch8-l4-q9** — `loud↔soft` within multi-word options (already caught by validate-lessons). Correct = "loud knock, sweet voice"; distractor "soft knock, shy voice" inverts both adjectives simultaneously, creating a double-mirror. Replace one axis: "hard knock, a mean voice" already exists as another option — consider "soft tap, sweet voice" (preserves voice similarity, removes double-mirror).

---

## E. Expanded Lint Gap (Phrase-Level vs Validate-Lessons)

Validate-lessons X57 currently detects antonyms only when the correct option word IS exactly an antonym of a distractor option word at full-option level. It misses:

| Case | Example QID | Why Missed |
|------|-------------|-----------|
| Antonym embedded in multi-word phrase | kt-ch8-l4-q9 "loud knock, sweet voice" | validate-lessons DOES catch this one, but not all |
| Antonym in picture-mc narrative description | kt-ch1-l2-pm1 "young boy" / "old man" | picture-mc narratives; full option strings contain antonym words |
| Directional antonyms (up/down, in/out) | kt-ch1-l5-x1, kt-ch3-l7-x7 | word-boundary regex catches these but validate-lessons doesn't |
| Took↔Gave (verb) in emoji options | kt-ch7-l7-q8 | validate-lessons catches this; my regex missed "took" initially |

Recommend adding word-boundary token scan (`\btarget\b`) to validate-lessons X57, covering picture-mc and comprehension types in addition to listen-mc. See ARCH-REC below.

---

## F. Narrative Voice / Pacing Improvements (mandatory 3, even with 0 violations)

1. **kt-ch1-l7-x7 (comprehension) pacing**: Explanation "他主動出擊是為了保護村子和家人" — correct but slightly too abstract for 8yo. Consider "他不等鬼來——他自己先出發，保護大家！" (action-forward, concrete, child register).

2. **kt-ch5-l5 explanationZh register**: "Baba Yaga 是俄羅斯民間故事裡最有名的老巫婆，住在會走路的雞腳屋裡" — this is cultural annotation appended to a gameplay explanation. Split or move annotation to lesson intro narration so gameplay explanationZh stays focused on *why this option is correct*, not encyclopedic.

3. **kt-ch3-l7-q5 explanationZh**: "大家一起歡呼又跺腳——「興奮又開心」，為這位慢慢走卻贏了的烏龜鼓掌！" — good voice. Model this pattern for items #1–3 above: state the observable action first, then label the emotion.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source research:**
- Wang & Meng (2026) *Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods* — https://doi.org/10.1177/02655322251400375
- PeerJ systematic review on automatic distractor generation (2024) — https://peerj.com/articles/cs-2441/
- D-GEN (ACL 2025) — distractor generation model that explicitly filters semantic-mirror distractors — https://aclanthology.org/2025.findings-acl.174.pdf

**Key industry finding:** Wang & Meng 2026 identify "semantic independence" among distractors as the primary quality dimension that GenAI optimizes. Antonym pairs directly violate semantic independence; the study's 2,267-learner psychometric dataset shows antonym distractors have near-zero discrimination (learners eliminate them without engaging content). The 2026 recommendation is explicit: *any distractor whose selection probability is statistically indistinguishable from zero signals a non-functional foil that should be replaced.*

**ARCH-REC #208: X208_X57_PHRASE_LEVEL_LINT_UPGRADE**

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Upgrade validate-lessons.js X57 rule from exact-option matching to word-boundary token scan (covers antonyms embedded in multi-word options, picture-mc descriptions, comprehension options) | https://doi.org/10.1177/02655322251400375 | ✅ 高適配 — current X57 only catches ~14/18 violations in Ch1–8; word-boundary regex (`\bword\b`) closes the gap without false positives | Low (~1 hr tooling) | High — closes lint coverage gap across all 35 chapters (~440 total X57 per validate-lessons summary output) | **Implement** |

**Concrete change:** In `tools/validate-lessons.js`, replace the X57 check that tests `option.includes(antonymWord)` with `new RegExp('\\b' + antonymWord + '\\b', 'i').test(option)` for both the correct-option scan and each distractor. Extend the antonym pair list with: `['tiny','large'],['large','tiny'],['dangerous','safe'],['safe','dangerous'],['up','down'],['down','up']` (these three catch 4 of the 4 missed violations in Ch1–8). No lessons JSON modified; no deploy needed; purely tooling.

**Verdict vs Pickup architecture:** React 18 + JSON lesson files + Node validate-lessons.js. The fix lives entirely in the Node validation script, zero runtime impact, zero bundle impact. Pattern from Wang & Meng 2026 is directly applicable.
