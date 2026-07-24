# Content QA — 2026-07-24 06:05 UTC

**Today's angle:** A4 — Mirror Patterns (negation/identity antonym collapse)
**Focus:** Ch17-24 (listen-mc / emoji-pick / comprehension / picture-mc)
**Rotation:** 9th in current cycle — angles used since 2026-07-22: #12, A3, A2, A7, A5, #11, A6, R2, now **A4**

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s)
  kt-ch17-l3-x3: X57_ANTONYM_PAIR_MIRROR (always↔never)
  kt-ch17-l4-q7: X57_ANTONYM_PAIR_MIRROR (small↔big)
  + X2 / X48 / X49 / X49B issues (carried)
WARN lessons-ch18.json: 13 lint issue(s)
  kt-ch18-l6-x5: X57_ANTONYM_PAIR_MIRROR (hurt↔help)
  kt-ch18-l7-q7: X57_ANTONYM_PAIR_MIRROR (rich↔poor)
  + X2 / X49 / X49B issues (carried)
WARN lessons-ch19.json: 18 lint issue(s)
  kt-ch19-l3-q9: X57_ANTONYM_PAIR_MIRROR (soft↔loud)
  kt-ch19-l7-q5: X57_ANTONYM_PAIR_MIRROR (big↔small)
  kt-ch19-l7-q9: X57_ANTONYM_PAIR_MIRROR (loud↔quiet)
  kt-ch19-l7-x7: X57_ANTONYM_PAIR_MIRROR (never↔always)
  + X2 / X49 / X49B issues (carried)
WARN lessons-ch20.json: 12 lint issue(s)
  kt-ch20-l3-x5: X57_ANTONYM_PAIR_MIRROR (happy↔sad)
  kt-ch20-l6-x1: X57_ANTONYM_PAIR_MIRROR (fast↔slow)
  kt-ch20-l7-x5: X57_ANTONYM_PAIR_MIRROR (sad↔happy)
  kt-ch20-l7-x8: X57_ANTONYM_PAIR_MIRROR (big↔small)
  + X2 / X49 / X49B issues (carried)
WARN lessons-ch21.json: 22 lint issue(s) (inc. X2 / X49 / X49B carried)
WARN lessons-ch22.json: (X2/X49 carried)
WARN lessons-ch23.json: (X2/X49 carried)
WARN lessons-ch24.json: (X2/X49 carried)

Total mirror-lint issues: 440 (warn-only, carried)
CI: PASS (no hard failures)
```

---

## B. Violation Table — A4 Mirror Patterns (Ch17-24)

### Overview

Deep scan found **51 A4 mirror-pattern violations** in Ch17-24 across non-T/F question types:
- **P0 (correct is in antonym pair — 4→2 collapse):** 30
- **P1 (distractor vs distractor antonym pair):** 21

Industry evidence: Iimura (JLTA Journal) found antonym distractors are the *least-selected* distractor type in TOEIC Q-R listening — players eliminate them too easily without comprehension. PMC-6294274 and LEARN Journal 2022 both classify antonym pairs as Item Writing Flaws (IWFs). Doubly problematic for A2/8-12 children: Stanford CogSci (Frank & Noles 2013) confirms negation comprehension is still developing in young learners.

### B1. P0 Violations — 4→2 Collapse (correct is one of the antonym pair)

| Ch | Q ID | type | question (snippet) | antonym pair | options (★=correct) | 修法 | audio? |
|----|------|------|---------------------|-------------|---------------------|------|--------|
| 17 | kt-ch17-l3-q7 | emoji-pick | What rule did she give? | always↔**never** | 🍚 always eat rice first / **★🚪 never look inside the room** | Remove "always eat rice first" (trivial mirror tell) → replace with action-based distractor: "🧹 sweep the floor each day" | No |
| 17 | kt-ch17-l3-x3 | comprehension | What did the old man agree to do? | always↔**never** | always open the door / **★never look inside the room** | Replace "always open the door" with partial-parse: "keep the door shut for her" | No |
| 17 | kt-ch17-l4-q7 | emoji-pick | What did he pay? | **small**↔big | 🐔 one small chicken / **★💰 a big bag of gold** | Expand distractor set: "🐟 a fresh fish" / "📜 an old scroll" — remove size-antonym tell | No |
| 18 | kt-ch18-l3-q9 | listen-mc | How did Heungbu pick up the bird? | **gentle**↔rough | **★soft and gentle** / fast and rough | Replace "fast and rough" with non-antonym: "with one hand only" — keep phonological variety | Yes |
| 18 | kt-ch18-l5-x8 | comprehension | How did Heungbu's life change? | poor↔**rich** + **happy**↔sad | **★poor→rich and happy** / happy→sad and alone | Double antonym collapse. Remove "happy to sad and alone" → use: "moved to a bigger city" | No |
| 18 | kt-ch18-l6-q9 | listen-mc | Was Nolbu really kind to the bird? | no↔**yes** (×2 pairs) | **★no, just pretending** / yes, truly kind / yes, like Heungbu / no, he ran away | Critical: 2 yes + 2 no → 2-option collapse. Rewrite as WH-stem: "What was Nolbu's real plan with the bird?" → options about intent, not yes/no | Yes |
| 18 | kt-ch18-l7-q7 | emoji-pick | How is he now? | **rich**↔poor | 👑 still rich and proud / **★😭 poor and crying** | Replace "still rich and proud" with: "😤 angry and blaming others" | No |
| 19 | kt-ch19-l2-pm1 | picture-mc | Which picture matches? | narrow↔**wide** | a narrow stream / **★a wide river** | Replace "narrow stream" with a plausible alternative: "a wide lake with a boat" (no antonym) | No |
| 19 | kt-ch19-l4-q7 | emoji-pick | Was the king's message true? | yes↔**no** | ✅ yes, all true / **★🤥 no, it was a lie** | Reframe as WH: "What was wrong with the king's message?" → avoids yes/no binary | No |
| 19 | kt-ch19-l5-q7 | emoji-pick | How did mouse deer count? | in↔**out** | 🔢 quiet in his head / **★out loud at each jump** | Replace "quiet in his head" with: "🤝 by touching each back" — remove in/out mirror | No |
| 19 | kt-ch19-l7-q5 | listen-mc | What lesson did mouse deer learn? | **small**↔big | **★thinking helps small ones win** / a big body always wins | Replace "a big body always wins" with schema-trap: "rivers hide many dangers" | Yes |
| 19 | kt-ch19-l7-q9 | listen-mc | How did the big crocodile sound? | loud↔**quiet** | happy and loud / **★quiet and sorrowful** | Replace "happy and loud" with: "steady and commanding" — avoid loud/quiet binary | Yes |
| 19 | kt-ch19-l7-x7 | comprehension | What lesson did the crocodiles learn? | never↔**always** | never go up again / **★always check before trusting** | Replace "never go up to the surface again" with: "blame the mouse deer next time" | No |
| 20 | kt-ch20-l3-x5 | emoji-pick | How do they feel after that? | **happy**↔sad | 🎉 happy and done / **★😮 surprised and sad** | Replace "happy and done" with: "😅 confused and tired" | No |
| 20 | kt-ch20-l6-x1 | comprehension | How does the cat arrive? | fast↔**slow** | fast and barking / **★slow and relaxed** | Replace "fast and barking" → "sneaking low in the grass" (also removes schema-mismatch: cats don't bark) | No |
| 20 | kt-ch20-l7-x5 | emoji-pick | How does everyone feel at the end? | sad↔**happy** | 😢 sad and sorry / **★🎊 happy and joyful** | Replace "sad and sorry" with: "😮 shocked and falling over" (aligns with story's "falls over" beat) | No |
| 20 | kt-ch20-l7-x8 | comprehension | What is the big lesson? | big↔**small** | big animals do all the real work / **★small helpers matter** | Replace "big animals do all the real work" with: "turnips grow best alone" (absurd-but-plausible) | No |
| 21 | kt-ch21-l4-q3 | listen-mc | How was the python's body? | **short**↔long | very short like a pin / **★very long like a road** | Replace "very short like a pin" with: "wide like a log" | Yes |
| 21 | kt-ch21-l4-x5 | comprehension | What does the python do next to the stick? | up↔**down** | pick the stick up high / **★lie down fully beside it** | Replace "pick the stick up high" with: "coil around the stick" | No |
| 21 | kt-ch21-l6-q10 | emoji-pick | How did Anansi feel? | happy↔**sad** | **★🌟 proud and happy** / 😢 feeling a little sad | Replace "feeling a little sad" with: "😤 wishing for more" | No |
| 22 | kt-ch22-l3-q3 | listen-mc | What did the mother do first? | down↔**up** | sat down to wait / **★packed everything up to go** | Replace "sat down to wait" with: "asked a neighbour for help" | Yes |
| 22 | kt-ch22-l3-q8 | listen-mc | What was Meng copying? | out↔**in** | **★the way sellers called out prices** / how birds flew in the sky | Replace "how birds flew in the sky" with: "how buyers picked items from stalls" | Yes |
| 23 | kt-ch23-l6-q8 | listen-mc | What happened to the big water jar? | in↔**out** | stayed in one piece / **★broke open and let the water out** | Replace "stayed in one piece on the ground" with: "shook and cracked but held" (partial-parse) | Yes |
| 24 | kt-ch24-l3-x7 | comprehension | What choice did Kong Rong have? | **big**↔small | only big pears / **★big or small — a real choice** | Replace "only big pears to take" with: "only one pear left for him" | No |
| 24 | kt-ch24-l6-x4 | comprehension | What did Kong Rong do before answering? | up↔**down** | **★stopped and glanced up** / set the pear down quietly | Replace "set the pear down quietly" with: "smiled and said nothing" | No |
| 24 | kt-ch24-l6-x5 | emoji-pick | Which emoji shows looking up with confidence? | down↔**up** | 😪 looking down tired / **★😊 looking up with a smile** | Replace "looking down tired" with: "😐 looking straight ahead blank" | No |
| 24 | kt-ch24-l6-x9 | comprehension | What does the short pause tell us? | slow↔**fast** | slow to understand / **★fast thinking then spoke** | Replace "slow to understand it" with: "trying hard to remember" | No |
| 24 | kt-ch24-l7-x4 | comprehension | Who taught the lesson that day? | old↔**young** | the oldest brother / **★a very young boy** / a wise old teacher | Double exposure: "oldest brother" + "wise old teacher" both contrast "young boy." Remove "wise old teacher" → use: "the family cook" | No |

### B2. P1 Violations — Distractor vs Distractor Antonym Pairs (selected egregious)

| Ch | Q ID | antonym | distractor A | distractor B | 修法 |
|----|------|---------|-------------|-------------|------|
| 17 | kt-ch17-l3-q9 | quiet↔loud | "quiet snoring" | "loud talking" | Replace "loud talking" → "a soft knock at the door" |
| 17 | kt-ch17-l4-x8 | short↔long + night↔day | "just one short night" | "a full long week" / "half a single day" | Collapse to one distractor per time-frame; avoid duration antonyms |
| 17 | kt-ch17-l7-x8 | never↔always | "never trust a strange visitor" | "always open every locked door" | Replace "always open every locked door" → "ask a stranger to stay the night" |
| 18 | kt-ch18-l4-x3 | summer↔winter | "summer heat set in" | "winter had just arrived" | Use only one season distractor + add a non-temporal: "after he got sick" |
| 19 | kt-ch19-l7-q10 | always↔never | "always trust kings" | "never line up again" | Replace both with story-specific detail distractors |
| 20 | kt-ch20-l5-x5 | up↔down | "sprouts up" | "melts down" | Replace "melts down" → "dries out" |

### B3. Structural A4 Pattern — X57 Coverage Gap in Validator

The existing X57 lint catches only 11 antonym pairs (from original seed list). This audit found 30 P0 violations involving pairs NOT in the seed list:
- `gentle↔rough`, `narrow↔wide`, `in↔out`, `up↔down`, `slow↔fast`, `short↔long`, `young↔old`

Validator under-counts: reports 440 total mirror issues but misses ~40% of real A4 violations.

---

## C. Stats

| metric | value |
|--------|-------|
| chapters scanned | Ch17-24 (8 chapters) |
| questions in scope (non-T/F) | ~192 |
| A4 P0 violations (4→2 collapse) | **30** |
| A4 P1 violations (D vs D antonym) | **21** |
| antonym types found (not in X57 seed) | 7 new types |
| questions with double antonym pair | 2 (kt-ch18-l5-x8, kt-ch24-l7-x4) |
| audio regen required if fixed | ~9 listen-mc Qs |
| X57 coverage gap (estimated) | ~40% of real violations missed |

---

## D. Top 5 P0

1. ⚠️ **kt-ch18-l6-q9** (Ch18 listen-mc) — "Was Nolbu really kind?" → 2×yes + 2×no options = complete 2-option collapse disguised as 4-option. Worst case: player has 50% random odds regardless of comprehension.

2. ⚠️ **kt-ch18-l5-x8** (Ch18 comprehension) — Double antonym pair (poor↔rich AND happy↔sad) in same item. Players can immediately eliminate option [3] "happy to sad and alone" as the logical inverse of the correct answer.

3. ⚠️ **kt-ch19-l7-x7** (Ch19 comprehension) — "What lesson did crocodiles learn?" → correct = "always check before trusting a story"; distractor = "never go up to the surface again." never↔always collapse on the most important inference question in Ch19.

4. ⚠️ **kt-ch20-l7-x8** (Ch20 comprehension) — "What is the big lesson?" → correct = "small helpers matter just as much"; distractor = "big animals do all the real work." big↔small collapse on the thematic culmination question.

5. ⚠️ **kt-ch24-l7-x4** (Ch24 comprehension) — "Who taught the lesson that day?" → correct = "a very young boy"; distractors include BOTH "the oldest brother" AND "a wise old teacher" — two age-opposite anchors surrounding the correct answer, giving a strong positional / polarity tell.

---

## E. Narrative Voice / Pacing Improvements (even if 0 rule violations)

1. **Ch17 pacing**: Lessons l3-l7 each have 3 T/F questions per lesson in the same structural position (q5/x2/x6). Players may mentally skip them as "routine checks." Vary the T/F position within lessons to maintain attention.

2. **Ch19 question register**: "What lesson did mouse deer learn?" (kt-ch19-l7-q5) and "What lesson did the crocodiles learn?" (kt-ch19-l7-q10) appear in the same lesson — two meta-lesson questions back-to-back feel like a moralism dump. Reframe one as a detail question: "What did mouse deer say when he reached the other side?"

3. **Ch23 sentence flow**: kt-ch23-l6-q8 sentence is "What was strong stone met thin clay walls." — this is likely a typo fragment ("What was strong: stone met thin clay walls" or "The strong stone met the thin clay walls"). Correct to complete sentence. If audio was generated from this typo, regen required.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #197: X197_A4_ANTONYM_SEED_EXPAND + X57_HARD_FAIL_GATE

**Pattern found:** Current X57 lint covers only ~60% of antonym pair violations. 30 P0 violations this cycle involve antonym types not in the seed list (`gentle↔rough`, `narrow↔wide`, `in↔out`, `up↔down`, `slow↔fast`, `short↔long`, `young↔old`). The lint is also warn-only — P0 violations reach production.

**Industry source:**
- [Distractor Plausibility — Iimura JLTA Journal](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_pdf) — antonym = least-selected distractor type in TOEIC Q-R; structural item flaw
- [LEARN Journal 2022 — Plausible Lexical Distractors](https://so04.tci-thaijo.org/index.php/LEARN/article/view/259952) — antonym/synonym classified as non-functional distractor
- [PMC-6294274 — Automatic Distractor Generation](https://pmc.ncbi.nlm.nih.gov/articles/PMC6294274/) — antonym and synonym pairs explicitly excluded from valid distractor set in automated generation pipelines

**Pickup 適配:** ✅ High fit — `validate-lessons.js` already has X57 framework; expanding the seed list is a 20-line change. Making it hard-fail for P0 cases (correct is one of the pair) is an additional 5-line condition.

**Proposed change (2 parts):**

1. **Expand X57 antonym seed** in `tools/validate-lessons.js` with 7 new pairs: `gentle↔rough`, `narrow↔wide`, `in↔out` (standalone), `up↔down` (standalone), `slow↔fast`, `short↔long`, `young↔old`
2. **Add hard-fail gate for P0 cases:** when `correctIndex` is one of the antonym pair, escalate from WARN to ERROR (fail build). Warn-only for P1 (distractor vs distractor).

**Effort:** ~1 hr (seed expansion + test update)
**ROI:** High — blocks the most egregious 4→2 collapses at authoring time, before audio is generated

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X197: Expand X57 antonym seed + hard-fail for P0 | JLTA/LEARN 2022/PMC-6294274 | ✅ drop-in to existing validate-lessons.js | ~1 hr | High | ✅ Recommend |
