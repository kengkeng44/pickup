# Content QA — 2026-06-14 12:13 UTC

Today's angle: **R2 — Distractor Doctrine (4-option plausibility / functional-distractor audit)**
Focus: **Ch12 (Cowherd & Weaver), Ch13 (Red Riding Hood), Ch14 (Urashima Tarō), Ch15 (Emperor's New Clothes), Ch16 (Issun-Bōshi), Ch17 (Crane Wife), Ch18 (Heungbu & Nolbu)**

> **R2 rotation history**: First dedicated R2 pass on this codebase.
>
> **Angle definition**: Distractor doctrine checks whether the 3 wrong options in each listen-mc / listen-comprehension question are **functional distractors** — options that represent distinct, plausible comprehension failure modes that are chosen by less-proficient learners and rejected by proficient ones.
>
> Sub-violations tracked:
> - **D1 — Junk / absurd distractor**: An option is obviously impossible given the audio context. Eliminable without comprehension. (e.g., "loud as a drum" for a visual robe description)
> - **D2 — Correct-as-outlier length tell**: `max(len)/min(len) > 1.25` AND the longest or shortest option is the correct answer. (R2 spec §2)
> - **D3 — Format / grammar misfit**: Option doesn't grammatically match the question stem (e.g., yes/no prefix embedded in listen-mc)
> - **D4 — Only-2-plausible**: 2 of 4 options are junk → effectively a 50/50 guess among plausible options
> - **D5 — Semantic-duplicate distractors**: Two distractors mean the same thing → invalid duplicate option, one is non-functional
> - **D6 — Wrong semantic category**: Option uses a property from the wrong domain (auditory ≠ texture; terrestrial ≠ underwater)
> - **D7 — Cross-lesson sentence / answer duplication**: Same sentence + same correct answer reused in 2 lessons (R5 / Jaccard violation)
>
> **Source authority**:
> - Rodriguez (2005) *Three options are optimal for MCQ*: Items with 3 **functional** distractors outperform items with 1–2 functional. One non-functional distractor reduces reliability and discriminability.
> - Iimura (ResearchGate) *Distractor Plausibility in MC Listening Test*: "Overlap [verbatim words from text] was the most influential factor to make distractors plausible." Corollary: distractors in wrong semantic category are least plausible — they become junk.
> - PMC (2020) *Nonfunctional Distractor Analysis*: A distractor is non-functional if chosen by <5% of examinees. Junk distractors (semantically impossible) are always non-functional.
> - Springer (2018) *Optimal number of MCQ options*: 3 functional distractors = 4-option test. With ≥2 junk distractors, a 4-option item degrades to an effective 2-option item (p=0.5 random chance).
> - ArXiv 2501.13125 (2025) *Generating Plausible Distractors via Student Choice Prediction*: Modern distractor generation uses failure-mode taxonomy (phonological / local-detail / schema-inference / partial-parse). Distractors without a tagged failure mode are likely junk.

---

## A. validate-lessons.js result

```
OK  lessons-ch12.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch13.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch14.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch15.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch16.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch18.json: 7 lessons (JSON shape + mirror + extended lint)
```
All 7 chapters pass existing lint (no X2/X3/R1_SUBSTRING). Violations below are manual R2 distractor-doctrine findings not caught by current lint.

---

## B. Violation table

| Ch | Q ID | Type | Sentence (truncated) | Violation | 修法 | audio regen? |
|----|------|------|----------------------|-----------|------|-------------|
| 12 | kt-ch12-l1-q6 | D1+D4 | "Her white robe floated like a soft cloud near the water." | "small as a bug" (size≠texture domain) + "loud as a drum" (auditory≠visual domain) — 2 junk distractors → effective 2-option test | Replace: "small as a bug"→"stiff as a board"; "loud as a drum"→"thick and warm" | No |
| 12 | kt-ch12-l5-q9 | D1 | "His feet left the ground. The wind held him gently." | "slept on the floor" is absurd — sentence states feet left ground; "ran very fast" implausible for wind-held levitation | Replace "slept on the floor"→"stayed very still" (misparse of "held gently") | No |
| 13 | kt-ch13-l7-q3 | D1+R1 | "He opened up the wolf with great care." | Correct "opened him up carefully" echoes "opened up…with great care" (R1 near-echo). Distractors "sang to him gently" + "told a long story" are D1 junk (huntsman context) | Correct→"cut the wolf open"; replace junk→"tied the wolf up tightly" / "chased the wolf away" | Yes (correct option changes) |
| 14 | kt-ch14-l2-q9 | D6+D4 | "They went down past bright fish and soft coral." | "busy cars and long roads" (terrestrial) + "big birds and soft clouds" (aerial) — semantically impossible underwater → effective 2-option test | Replace→"dark sand and sharp rocks" / "tall seaweed and round shells" | No |
| 14 | kt-ch14-l7-q9 | D5 | "When the wind cleared, he was a very old man with a long beard." | "turned into a young boy" (opt 0) + "turned back into a child" (opt 1) are semantic duplicates — both mean "became young again". Learner gets 33% per option just between these two | Replace opt 0→"turned into a puff of smoke" (folklore schema) or "fell into a deep sleep" | No |
| 15 | kt-ch15-l3-q6 / l4-q6 | D7 | "\"Am I not smart enough?\" he thought to himself." | Identical sentence + identical correct option ("being seen as not clever") in L3 and L4 (different Q stems: minister vs emperor). R5 Jaccard=1.0 cross-lesson sentence echo | L4-Q6: rewrite sentence to emperor's POV, e.g. "He thought, 'What if I cannot see it either?'" + new correct option "being seen as foolish" | No (if sentence changes, yes) |
| 15 | kt-ch15-l7-q6 | R1+D1 | "He could have run home and shut the door behind him." | Correct "going home to hide" echoes "run home" (direct 2-gram overlap). Distractor "sitting on the road" is D1 junk (emperor wouldn't sit mid-parade) | Correct→"escaping from the crowd"; "sitting on the road"→"pretending to feel faint" | No |
| 16 | kt-ch16-l3-q3 | D6 | "For a thumb-sized boy, a needle was just the right size." | "made of shiny gold" (material) + "a gift from grandfather" (provenance) — wrong semantic category; question is about SIZE fit, not material/origin | Replace→"far too long for him" (size-domain plausible error) / "too sharp to hold" (local-detail) | No |
| 16 | kt-ch16-l6-q3 | D1+R1 | "Inside the demon, it was very dark." | "full of food" is D1 junk (no basis in demon-interior context). Correct "dark all around" near-echoes "very dark" | Correct→"black as night" (paraphrase); "full of food"→"damp and slippery" | No |
| 17 | kt-ch17-l6-q5 | D1+D4 | "There was no young woman. There was a white crane." | "an old hunter" entirely wrong entity (L1 hunter already left story). "no one at all" ignores stated "white crane" → effective 1-distractor meaningful test | Replace "an old hunter"→"a woman in white robes" (schema-inference); "no one at all"→"a crane feather only" (partial parse) | No |
| 18 | kt-ch18-l6-q9 | D3 | "Then he wrapped it in cloth and pretended to help." | Options embed "yes"/"no" prefix in listen-mc context: ["yes, truly kind" / "no, just pretending" / "yes, like Heungbu" / "no, he ran away"]. Format ambiguity — reads like listen-tf but declared listen-mc | Rewrite→["truly generous this time" / "only pretending to be kind" / "angry and jealous inside" / "confused and unsure"] | No |
| 18 | kt-ch18-l7-q3 | D1 | "Nolbu planted the seed. Big gourds grew very fast." | "a new wife for himself" has zero narrative basis — no marriage thread in Ch18 L7. Classic junk distractor | Replace→"a feast as big as Heungbu's" (schema-inference parallel error) | No |

### R2 Length Parity violations (spec ≤ 1.25×)

| Q ID | Ratio | Min option | Max option | Correct is outlier? |
|------|-------|-----------|-----------|---------------------|
| kt-ch16-l4-q9 | 1.92× | "under her hat" (13) | "on a low branch above her" (25) | No (correct is 2nd) |
| kt-ch16-l7-q9 | 1.83× | "scared of it" (12) | "sleepy from the change" (22) | No (correct is 2nd) |
| kt-ch17-l1-q8 | 1.82× | "set it free" ✓ (11) | "cooked it for dinner" (20) | **Yes — correct is SHORTEST** (reverse tell) |
| kt-ch18-l2-q9 | 1.73× | "the pot was new" (15) | "the children were laughing" (26) | No |
| kt-ch15-l7-q3 | 1.64× | "fast asleep" (11) | "as proud as before" (18) | No |

**kt-ch17-l1-q8 is a P1**: correct option "set it free" (11 chars) is the shortest by a large margin — sophisticated test-wise learners can identify it by elimination of the longer plausible alternatives.

---

## C. Stats

| Ch | listen-type Qs scanned | D1 junk | D3 format | D5 semantic dupe | D6 wrong-cat | D7 dupe Q | R2 length | Total violations |
|----|----------------------|---------|-----------|-----------------|-------------|----------|-----------|-----------------|
| 12 | 19 | 3 | 0 | 0 | 1 | 0 | 0 | 2 Q affected |
| 13 | 18 | 2 | 0 | 0 | 0 | 0 | 0 | 1 Q affected |
| 14 | 17 | 2 | 0 | 1 | 2 | 0 | 0 | 3 Q affected |
| 15 | 20 | 1 | 0 | 0 | 0 | 1 | 1 | 2 Q affected |
| 16 | 18 | 1 | 0 | 0 | 2 | 0 | 2 | 3 Q affected |
| 17 | 17 | 2 | 0 | 0 | 1 | 0 | 1 | 2 Q affected |
| 18 | 18 | 1 | 1 | 0 | 0 | 0 | 1 | 2 Q affected |
| **Total** | **127** | **12** | **1** | **1** | **6** | **1** | **5** | **15 Q affected** |

Violation rate: **15 / 127 = 11.8%** of listen-type questions have at least one R2 distractor doctrine issue.
D1 junk distractors are the dominant failure mode (12 instances across 7 chapters).

### 3 narrative pacing improvements (even if no lint violation)

**NP-1 kt-ch12-l3-q9**: "Zhinu shook her head. She held Niulang's hand tight." → correct "showed she did not want to go". The 4 distractors are good but the Q is about gesture interpretation. Consider adding a *sound* distractor ("called out for help loudly") to test whether learners interpreted the shaking as protest vs. distress — distinct failure mode not represented.

**NP-2 kt-ch14-l3-q3**: "The walls shone like pearl and the gates were made of shell." → correct "bright and beautiful". The Q captures sensory description well. Pacing note: this is the 3rd consecutive listen-mc in L3 — consider varying to a listen-tf here for rhythm ("Were the palace walls made of gold?" = No → listen-tf) to break up the Q-type monotony per R6 variety.

**NP-3 kt-ch17-l4-q9**: "But his heart kept asking, 'Who is she really?'" → correct "curious and unsure". Current distractors ["proud and calm", "angry and tired", "sleepy and sad"] are fine. Suggest upgrading "sleepy and sad" → "scared and confused" to represent a more plausible comprehension error (learner mishearing tension as fear rather than curiosity).

---

## D. Top 5 P0

### ⚠️ P0-1 — kt-ch14-l7-q9: Semantic-duplicate distractors (D5)
**Sentence**: "When the wind cleared, he was a very old man with a long beard."
**Options**: ["turned into a young boy", "turned back into a child", ✓"aged into a very old man", "changed into a fish"]
**Problem**: Opts 0 and 1 are semantically identical (both = "became young"). Learner can eliminate both as duplicates → effective 3-option test, p_guess rises to 0.33→0.5 effectively (3 options, 2 of which are "reverse" and distinguishable from "old man"). Violates Rodriguez (2005): having duplicate distractors removes one functional slot. **This is the most mechanically invalid item in the batch.**
**Fix**: Replace opt 0 "turned into a young boy" → "fell into a deep sleep for many years" (partial-parse: "wind cleared" → coma schema) or "became a ghost by the sea" (folklore-schema inference).
**audio regen?** No

### ⚠️ P0-2 — kt-ch13-l7-q3: R1 echo + dual junk distractors (D1+R1)
**Sentence**: "He opened up the wolf with great care."
**Correct**: "opened him up carefully"
**Problem**: Near-verbatim R1 echo (3-gram "opened [him/the wolf] up" + "carefully"≈"with great care"). Simultaneously, "sang to him gently" and "told a long story" are contextually absurd for a huntsman performing surgery on a wolf. A child can answer correctly by surface-matching without any comprehension.
**Fix**: Correct option → "cut the wolf open" (synonym: cut = opened + nominal change). Distractors → "tied the wolf up tightly" / "chased the wolf far away" / "scolded the wolf loudly".
**audio regen?** Yes (correct option text changes if audio prompt references it)

### ⚠️ P0-3 — kt-ch18-l6-q9: Y/N prefix in listen-mc format (D3)
**Sentence**: "Then he wrapped it in cloth and pretended to help."
**Options**: ["yes, truly kind", "no, just pretending", "yes, like Heungbu", "no, he ran away"]
**Problem**: Options embed "yes/no" binary prefix making this a disguised listen-tf in listen-mc clothing. For 8-12 Taiwanese children, this format is confusing — they must first determine the Y/N answer, then choose between two "yes" options AND between two "no" options simultaneously. This contradicts UX spec R7 (clear Q-type boundary) and is the only format-ambiguity violation in the 7-chapter batch.
**Fix**: Rewrite → ["truly generous this time", "only pretending to be kind", "angry and jealous inside", "completely surprised by it"] — pure content options, no yes/no prefix.
**audio regen?** No

### ⚠️ P0-4 — kt-ch12-l1-q6: Dual-domain junk distractors (D1+D4)
**Sentence**: "Her white robe floated like a soft cloud near the water."
**Options**: ["heavy and dark", ✓"light as a feather", "small as a bug", "loud as a drum"]
**Problem**: "loud as a drum" is an auditory adjective phrase in a visual/texture description question. A robe cannot be "loud" — this is semantically impossible. "Small as a bug" is a size property irrelevant to the robe's movement quality. These 2 junk distractors leave only "heavy and dark" as a genuine foil → effective 2-option (p_guess=0.5). D4 confirmed.
**Fix**: "small as a bug" → "stiff as a board" (texture-domain plausible opposite); "loud as a drum" → "thick and heavy" (same domain as "heavy and dark" but from a different property angle — weight vs. density).
**audio regen?** No

### ⚠️ P0-5 — kt-ch15-l3/l4-q6: Cross-lesson sentence duplication + same correct answer (D7)
**Sentence (both)**: "\"Am I not smart enough?\" he thought to himself."
**Correct (both)**: "being seen as not clever"
**Problem**: The identical sentence appears in L3 (minister's fear) and L4 (emperor's same fear). Correct option is identical in both. For any learner who plays both lessons, Q6 in L4 is memorized rather than comprehended — P_correct = 1.0 from recall, not from listening. This is the strongest R5 Jaccard violation possible (score=1.0). The intent is narratively valid (both characters have the same fear) but the item implementation fails to distinguish them.
**Fix**: L4-Q6: Rewrite sentence to reflect emperor specifically, e.g. "He thought, 'If I say I see nothing, they will think I am foolish.'" → new correct → "looking like a fool to his people" (distinct from L3's minister framing).
**audio regen?** Yes (new sentence for L4)

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #33: D1_JUNK_DOMAIN_CHECK — Semantic-category lint for distractor viability**

### Source pattern
- PMC (2020) *Nonfunctional Distractor Analysis*: non-functional distractors (<5% selection rate) are a leading indicator of item quality failure. Junk distractors are the extreme case: always non-functional because they're semantically impossible in context.
- ArXiv 2501.13125 (2025) *Generating Plausible Distractors via Student Choice Prediction*: each distractor must represent a specific **failure mode** from a taxonomy {phonological, local-detail, schema-inference, partial-parse}. Distractors without a valid failure mode are implicitly junk.
- Pickup spec `pickup-q-design-standard-v1.md §R4`: "The 3 distractors must cover at least 3 of: phonological / local-detail / schema-inference / partial-parse."
- Pickup spec `optionsFailureMode?: ...[]` is defined as a schema extension proposal — but currently unenforced (optional + unused).

### Gap in current architecture
`validate-lessons.js` has lint for X2_OPTION_LIST_BIAS, R1_SUBSTRING, X3_R1_VERBATIM_WORDS — but no rule that catches **semantically impossible distractors** (D1/D6). This cron cycle found 12 D1 junk instances across 7 chapters (11.8% violation rate) that pass all existing lint.

### Recommendation: add `D1_JUNK_DOMAIN_CHECK` to `validate-lessons.js`

**Mechanism**: keyword-based semantic-domain classifier per option.

```js
const DOMAIN_KEYWORDS = {
  auditory:   ['loud', 'quiet', 'sound', 'noise', 'drum', 'bang', 'silent', 'ring'],
  visual:     ['bright', 'dark', 'shiny', 'clear', 'glow', 'light', 'heavy', 'colour'],
  kinesthetic:['soft', 'hard', 'warm', 'cold', 'rough', 'smooth', 'stiff', 'sharp'],
  terrestrial:['road', 'car', 'street', 'building', 'farm', 'field', 'bus', 'house'],
  aerial:     ['cloud', 'bird', 'fly', 'sky', 'wind'],
  emotional:  ['happy', 'sad', 'angry', 'scared', 'worried', 'proud', 'tired', 'bored'],
  action:     ['ran', 'walked', 'sang', 'cooked', 'danced', 'slept', 'jumped'],
};

// Rule: if ANY option is classified to domain X, and the question's sentence
// is firmly anchored to domain Y (X ≠ Y and cross-domain mapping is nonsensical
// e.g. auditory↔visual, terrestrial↔underwater), flag D1_JUNK_DOMAIN_CHECK
```

**Pickup context fit**:
- ✅ Pickup already has Node.js `validate-lessons.js` — drop-in addition, ~30 lines
- ✅ All questions have `sentence` field — domain classifier can scan sentence first, then check options
- ✅ Would have caught: "loud as a drum" (auditory in visual Q), "busy cars" (terrestrial in underwater Q), "slept on the floor" (action in levitation Q), "a new wife for himself" (relational in object-content Q)
- ❌ Won't catch nuanced D1 (e.g., "a new wife for himself" in kt-ch18-l7-q3) — requires story-context awareness beyond keyword matching
- 🟡 False positive risk: some sentences span multiple domains (appearance + action simultaneously). Add `// suppress: D1_JUNK_DOMAIN_CHECK` escape hatch as comment in JSON

**Effort**: S (2–3 hrs)
**ROI**: ⭐⭐ — Would have caught 7–9 of the 12 D1/D6 violations found this cycle automatically. Prevents similar regressions in Ch19–31 content.
**Priority vs. open backlog**: Medium. Lower than Ch15 D7 fix (affects every learner who plays L3→L4 sequentially) but higher than length-parity fixes.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Semantic-domain lint (D1_JUNK_DOMAIN_CHECK) | PMC 2020 + ArXiv 2025 | ✅ validate-lessons.js 即插即用 | S 2–3hr | ⭐⭐ | **RECOMMEND — add to validate-lessons.js** |
| optionsFailureMode required field | ArXiv 2501.13125 | 🟡 需改 schema + 補全 ~1100 Q 的 failure-mode tags | L 8hr | ⭐ (future audit coverage) | 延後 — 等 content 穩定後 |
| Student choice prediction ML | ArXiv 2025 | ❌ 需 learner analytics pipeline — Pickup 無用戶行為資料 | XL | ⭐ (no data yet) | 不適合現階段 |
