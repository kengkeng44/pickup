# Content QA — 2026-07-13 00:11 UTC

**Today's angle**: A5 — Cultural Reference: questions/options that assume prior cultural knowledge **not established in the story narration**; items where correct answer is only accessible via cultural background familiarity; cultural mislabeling or conflation; adult-register distractors targeting children  
**Focus**: Ch17–24 (433 answerable questions: crane-gratitude, heungbu-nolbu, sang-kancil, enormous-turnip, anansi-spider, mencius-mother, sima-guang, kong-rong)

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s) (X2, X49, X57 — see prior A4 audit)
WARN lessons-ch18.json: 13 lint issue(s) (X2, X49, X57)
WARN lessons-ch19.json: 18 lint issue(s) (X2, X49, X57)
WARN lessons-ch20.json: 12 lint issue(s) (X49, X57)
WARN lessons-ch21.json: 22 lint issue(s) (X2, X49, X57)
WARN lessons-ch22.json:  0 lint issue(s)
WARN lessons-ch23.json:  0 lint issue(s)
WARN lessons-ch24.json:  0 lint issue(s)

All lint issues are warn-only (X-series, build not gated). No schema errors. Build clean.
A5 violations found: 8 across Ch17–21 / Ch22–24 confirmed clean.
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 17 | kt-ch17-l4-lg2 | comprehension | "Every night the old man heard feathers brushing against wood. After three days the young woman came out, pale and thin…" | **P0 — Pre-reveal cultural assumption**: correct answer "She used her own body to make something precious" requires knowing crane-feather mythology (Tsuru no Ongaeshi). Story reveal is at l6 — **2 lessons later**. At l4, only "feathers brushing wood" is established; correct option is indistinguishable from "She forgot to eat" without prior folklore knowledge. explanationZh explicitly labels this "鶴的秘密" confirming cultural prerequisite. | Move question to l6 (post-reveal) or add narration hint at l4 start: "Grandma whispered: listen for the sound of feathers…" → changes it from cultural-prior-knowledge to inference. | No |
| 17 | kt-ch17-l7-q7 + l1-ep1 | emoji-pick | "What happened when she stepped outside?" opts: 🕊️ she became a white crane | **P1 — Emoji cultural mislabeling**: 🕊️ is a white dove (peace symbol), not a crane (鶴). Crane and dove are distinct cultural icons in both Japanese and Taiwanese tradition — crane = longevity/auspice; dove = peace. An 8–12 child familiar with New Year cards or calligraphy would notice immediately. Used **twice** in Ch17 as crane stand-in. | Replace with 🦢 (closest available) or 🐦 with text "a white crane". Add note: cranes have long legs/neck unlike doves. | Yes (visual only) |
| 17 | kt-ch17-l5-q7 | emoji-pick | "What strange sound did he hear?" opts: 🎻 violin music playing | **P2 — Culturally dissonant distractor**: violin is a European instrument with no presence in the Japanese mountain village setting. Breaks immersion for a child who registers story settings. Minor but avoidable. | Replace 🎻 with 🥁 drum or 🪗 concertina (equally wrong but less culturally jarring). | No |
| 18 | kt-ch18-l4-q7 | emoji-pick | "What kind of seed did the bird bring?" opts: 🌱 a gourd seed (correct) | **P1 — Pre-establishment cultural assumption**: Question appears after "It dropped one small seed on Heungbu's hand" but the gourd type is only revealed 2 narrations later in the same lesson. Correct answer requires knowing the Korean Heungbu-Nolbu folklore in advance; no in-story basis at the question's position. | Reorder: place this question AFTER the narration "Big green gourds grew on the long vine" (kt-ch18-l4-q9 sentence), or change to "What did the bird drop?" with options: a seed / a coin / a flower / a leaf (safe literal recall). | No |
| 18 | kt-ch18-l5-q3 | listen-mc | "They cut it open with a small saw." opts correct: "using a sharp little blade" | **P2 — Tool mislabeling**: A saw (鋸子) has teeth and cuts by friction; a "sharp little blade" (利刃) is an edge cutter. Sentence says "saw" but correct answer says "blade." An 8–12 child who can distinguish tools would flag this. | Change correct answer to "using a small toothed saw" / 用小鋸子. | No |
| 18 | kt-ch18-l7-q3 | listen-mc | "Nolbu planted the seed. Big gourds grew very fast." opts D: "a new wife for himself" | **P2 — Adult-register distractor**: The option "a new wife for himself" (給自己娶個新妻子) has no story basis and introduces marriage acquisition framing inappropriate for 8–12 audience. Distractors should stay within the story's world. | Replace with "a tall stone tower" or "a horse to ride" — equally implausible but age-appropriate. | No |
| 18 | kt-ch18-l6–l7 | multiple | Nolbu name in explanationZh | **P2 — Character name inconsistency**: explanationZh in l6 uses "孬夫" while sentenceZh in l6–l7 uses "那夫". Two different Chinese renderings of the same character within same lessons. | Standardise to "孬夫" throughout Ch18 (consistent with l1–l5). | No |
| 21 | kt-ch21-l3-x1 | comprehension | "The first animal was a group of hornets in a big tree." q: "Where do the hornets live?" correct: "in a hollow trunk" | **P0 — Unsupported answer + wrong prop in explanation**: (1) No narration in l1–l3 states the tree is hollow — story says only "in a big tree." Correct answer "in a hollow trunk" is not derivable from text. (2) explanationZh says "Anansi 拿著葫蘆靠近空心的樹幹" — references **gourd** (葫蘆) but every story narration and vocab pair uses **pot/jar** (鍋). Gourd belongs to traditional Akan/Courlander Anansi variants, not this story's text. Double bug: unsupported answer + wrong prop referencing source folklore. | **(a)** Add l3 narration: "The hornets lived inside the hollow trunk of an old tree" BEFORE this question, OR **(b)** change answer to "in a big tree" (matches narration) and rewrite explanation to say "pot" not "gourd". | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch range scanned | Ch17–24 (8 chapters) |
| Answerable questions scanned | ~433 MC/comprehension/emoji-pick |
| A5 violations found | 8 |
| P0 (blocks correct answer without cultural knowledge) | 2 (kt-ch17-l4-lg2, kt-ch21-l3-x1) |
| P1 (significant cultural loading) | 2 (crane emoji, gourd-seed timing) |
| P2 (moderate / audience mismatch) | 4 (violin, saw/blade, adult distractor, name inconsistency) |
| Ch22–24 clean | ✅ all Chinese historical stories self-contained |
| Ch19–20 clean | ✅ Kancil + Giant Turnip fully self-contained |

---

## D. Top 5 P0

1. **⚠️ kt-ch17-l4-lg2** — Pre-reveal crane-sacrifice mythology question (MOVE to l6 post-reveal)
2. **⚠️ kt-ch21-l3-x1** — "Hollow trunk" + gourd/pot double bug in explanationZh  
3. **kt-ch18-l4-q7** — Gourd-seed identity asked before story establishes it (reorder)
4. **kt-ch17-l7-q7** — Dove emoji used twice for crane (replace visual)
5. **kt-ch18-l5-q3** — Saw described as "sharp blade" in correct answer (fix label)

---

## E. Narrative Voice / Pacing Improvements (no structural violation, still propose 3)

1. **Ch17 cultural origin framing**: The crane-gratitude story is never attributed to Japan. The grandma intro says only "Tonight a kind old man saves a bird in the snow." A single added grandma line — "This is an old Japanese story…" — would scaffold the setting (snowfields, sliding doors, loom, bowing farewell) and reduce the implicit cultural expectation gap for non-Japanese learners.

2. **Ch21 Anansi opening stakes**: The intro establishes "a small spider wants all the stories in the world" but never explains *why* Anansi wants them or what stories mean to the world. A l2 or l3 narration beat — "Long ago, all the stories belonged to the Sky God. No family had stories by their fire at night. Anansi wanted to change that." — would give 8–12 children a clearer emotional stake before the three-animal quest begins.

3. **Ch18 gourd-magic pacing**: Between l4 (seed planted) and l5 (gourds yield rice/gold/house), there is no wonder-beat narration — gourds grow and then immediately treasure falls out. Adding one narration in l5 before the first opening: "Heungbu's wife put her ear to the biggest gourd. Something moved inside." would create anticipation and signal to children that what's coming is extraordinary, not just a flat sequence.

---

## 🔬 Architecture Recommendation — ARCH-REC #148 (對齊業界 2026)

### Research basis

| Source | Finding |
|--------|---------|
| Bachman & Palmer (1996/2010) via ERIC EJ1291152 | **Topical/cultural knowledge = construct-irrelevant variance** in language tests. Items that reward cultural familiarity measure the wrong construct. |
| ETS Fair Tests Guidelines (2022) | "Items must be self-contained. No item should require cultural knowledge to eliminate a distractor." |
| Smarter Balanced Bias & Sensitivity (2024) | Cultural references unfamiliar to the test population require sufficient in-item context to explain them, or must be avoided. |
| Duolingo design principle (2024 DET Technical Manual) | "Everyone can Duolingo" — cultural touchstones are **additive enrichment**, not required prerequisites for answering correctly. |
| Biased Tales (ACL/EMNLP 2025) | Story framing does NOT neutralise item-level cultural loading — a Japanese story can still have a biased question if the answer requires a Japanese custom not explained in the text. |

### Pattern: Pre-Story Cultural Scaffold Narrations (業界 2026 standard)

**What it is**: 1–2 `narration` entries at lesson start that pre-teach the culturally-specific element a comprehension question will test — before the question appears. This is standard in Duolingo "Tips" screens and ETS item pre-reading. It converts "requires background knowledge" items into "contextually scaffolded inference" items, satisfying Bachman & Palmer's self-containment rule without removing the question.

**Pickup 適配**:  
- ✅ Schema: `type: "narration"` already exists; add entries to the `questions` array of the relevant lesson, positioned before the flagged question  
- ✅ Effort: < 1 hr per chapter; no schema changes, no new fields  
- ✅ Precedent: lesson l1 and l2 already do this for vocabulary — same pattern extends to cultural context  
- ✅ ROI: fixes P0 violations (kt-ch17-l4-lg2, kt-ch21-l3-x1) without removing rich content  

**Specific application** (2 instances this cycle):

| Lesson | Add before | Scaffold narration (suggested) |
|--------|-----------|-------------------------------|
| kt-ch17-l4 (before lg2) | kt-ch17-l4-lg2 | "Grandma leaned close and whispered: 'Do you hear feathers brushing wood? The crane weaves with what she has most — her own white feathers. Each cloth costs her a little of herself.'" |
| kt-ch21-l3 (before x1) | kt-ch21-l3-x1 | "The hornets lived deep inside a hollow old trunk. The tree buzzed day and night." |
| kt-ch18-l4 (before q7) | kt-ch18-l4-q7 | (alternatively: reorder question to after q9 reveal — simpler fix) |

**Verdict**:

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Pre-story cultural scaffold narration | ETS / Bachman & Palmer / Duolingo | ✅ existing narration type, pre-question placement | Low (1–2 narration entries per chapter) | High (fixes P0; improves ALL future cultural-story chapters) | **✅ RECOMMEND — implement on next content sprint** |

**Cockpit entry**: See row added to 🔬 Architecture Recommendations section (ARCH-REC #148: X95_CULTURAL_SCAFFOLD_NARRATION).
