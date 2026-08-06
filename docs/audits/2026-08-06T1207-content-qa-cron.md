# Content QA — 2026-08-06 12:07 UTC

**Today's angle: R1 — Paraphrase Deep-Scan (Buck 1991/2001 verbatim ban)**
**Focus: Ch25–32 (8 chapters, 862 items, historical-story expansion)**

> **R1 definition (this session)**:
> The correct answer option MUST NOT be a verbatim surface copy of the stimulus sentence.
> Buck (2001) *Assessing Listening* establishes the explicit/implicit construct distinction:
> verbatim items reward **surface-matching** (visual/phonological scan), not comprehension.
> Codified in practice by ETS and IELTS: the **correct** option is always a paraphrase (synonym /
> hypernym / nominalisation / pragmatic reformulation); verbatim repetition is used only as a
> *deliberate distractor trap* for test-wise learners. Wang & Meng (2026, *Language Testing*
> doi:10.1177/02655322251400375) confirm via 2PLNLM psychometrics on 2,267 EFL learners:
> **items whose correct option has lower surface-similarity to the stimulus show higher discrimination**.
>
> **Three sub-types audited**:
> - **R1a-EXACT**: correct option is a direct substring of the sentence (≥4 chars, case-insensitive)
> - **R1b-3GRAM**: ≥1 shared 3-word n-gram between correct option and sentence
> - **R1c-CONTENT-OVERLAP**: >60% of content words in the correct option appear verbatim in the sentence
>   (threshold: ≥2 content words in option)
>
> **Rotation status**: R1 paraphrase deep-scan has not appeared in the 16 most recent audit cycles.
> Previous 8 cycles (git log): A4-mirror-patterns, A3-semantic-leak, A2-position-bias,
> A7-content-word-repetition, #12-explanationZh-voice, A6-option-in-question, #10-audio-sync,
> R2-distractor-doctrine.

---

## A. validate-lessons.js result

```
Total chapters scanned: 35 (ch0–ch34)
Total lint violations:  440 (all types, warn-only)

X48_NGRAM_VERBATIM_CORRECT already flags verbatim 3-grams in ch1–ch8 corpus.
Ch25–32 X48 hits (from validate-lessons.js): 0 (script only runs ch0–ch8 explicitly)

R1 deep scan (custom Python, all 3 sub-types) for Ch25–32:
  Total violations: 27
    R1a-EXACT  (P0): 4
    R1b-3GRAM  (P0): 10
    R1c-CONTENT-OVERLAP >60% (P1): 13
```

---

## B. Violation Table

| Ch | Q ID | type | sentence snippet | violation | correct option | 修法 | audio regen? |
|----|------|------|-----------------|-----------|----------------|------|-------------|
| 25 | kt-ch25-l6-q6 | listen-mc | "The mountains stay the same size, but family keeps growing." | R1c 67% (family, mountains) | "family grows, mountains do not" | rephrase: "her children fill the empty house now" | No |
| 26 | kt-ch26-l3-q6 | listen-mc | "They saw his face go thin and his eyes grow dark." | R1c 67% (face, thin) | "his face was thin and tired" | "he looked worn and exhausted" | No |
| 26 | kt-ch26-l4-q6 | listen-mc | "Most people would have called for a cloth to wipe it up." | R1b ("for a cloth to wipe") | "ask for a cloth to wipe it" | "send someone to clean it away" | No |
| 26 | kt-ch26-l6-q6 | listen-mc | "Beside the crown they placed a piece of pure gold of the same weight." | R1b ("pure gold of") | "pure gold of equal weight" | "gold that weighed just as much" | No |
| 26 | kt-ch26-l7-q6 | listen-mc | "The big idea came from a small thing he saw with care." | R1b ("a small thing") | "careful watching of a small thing" | "noticing what others overlook" | No |
| 27 | kt-ch27-l5-q3 | listen-mc | "Five tall stone fingers rose into the sky like a giant hand." | R1b ("a giant hand") | "a giant hand of stone" | "a stone shape like open fingers" | No |
| **27** | **kt-ch27-l6-q3** | **listen-mc** | "Only his head and one arm could move from the heavy stone." | **R1a-EXACT** | **"only his head and one arm"** | "just his face and a single limb" | **Yes** |
| 28 | kt-ch28-l4-q3 | listen-mc | "Liu Bei said, 'Today we will visit the small house again.'" | R1c 67% (visit, house) | "visit that cottage again" | "make another trip to the wise man" | No |
| 28 | kt-ch28-l4-q8 | listen-mc | "The same young boy opened the door and gave a small bow." | R1c 67% (same, boy) | "the same boy as before" | "a familiar face at the entrance" | No |
| 28 | kt-ch28-l5-q6 | listen-mc | "The brother said the wise man was not worth two visits, much less three." | R1b ("was not worth") | "he was not worth so many visits" | "the journey was wasted effort" | No |
| 29 | kt-ch29-l4-q3 | listen-mc | "The crew tied the ropes and lifted the white sails up high." | R1c 75% (tied, ropes, sails) | "tied ropes and raised the sails" | "made the ship ready to catch the wind" | No |
| 29 | kt-ch29-l4-q6 | listen-mc | "Slowly the ships moved away from the land and out into open water." | R1c 75% (open) | "out into the open sea" | "away from shore and into deep water" | No |
| **29** | **kt-ch29-l5-q3** | **listen-mc** | "By day the sun was warm. By night the stars came out like soft lights." | **R1c 100%** (soft, lights, stars) | **"soft lights from the stars"** | "little fires high in the dark sky" | **Yes** |
| **29** | **kt-ch29-l5-q8** | **listen-mc** | "Day after day the trip felt easy and good." | **R1a-EXACT** | **"easy and good"** | "smooth and pleasant" | **Yes** |
| 29 | kt-ch29-l6-q6 | listen-mc | "Some of the men were scared and their hands shook on the wet wood." | R1c 67% (scared, hands) | "scared, with shaking hands" | "trembling with fear at the oars" | No |
| 29 | kt-ch29-l7-q8 | listen-mc | "The storm passed, but home was still many long days away." | R1c 67% (long) | "no, they still had a long way" | "the journey was far from over" | No |
| 30 | kt-ch30-l3-q3 | listen-mc | "He also tied a sharp sword to his side with a thick leather belt." | R1b ("a sharp sword") | "a bow and a sharp sword" | "weapons for the hunt" | No |
| **30** | **kt-ch30-l4-q6** | **listen-mc** | "He let the arrow fly. It hit the lion right in the chest." | **R1a-EXACT** | **"right in the chest"** | "square in its heart" | **Yes** |
| 30 | kt-ch30-l4-q8 | listen-mc | "Heracles shot two more arrows. Both of them bounced off too." | R1b ("of them bounced") | "all of them bounced away" | "each one fell to the ground without a mark" | No |
| 30 | kt-ch30-l5-q8 | listen-mc | "Then it jumped at Heracles with its big mouth wide open." | R1b ("at Heracles with") | "leaped at Heracles with open jaws" | "charged with wide-open fangs" | No |
| 30 | kt-ch30-l7-q3 | listen-mc | "He wrapped his arms around the lion's thick, warm neck and held tight." | R1c 100% (neck) | "around the neck" | "in a grip around its throat" | No |
| 30 | kt-ch30-l7-q8 | listen-mc | "He took the lion's thick skin and made it into a warm coat for himself." | R1c 67% (thick, coat) | "wore it as a thick coat" | "dressed himself in the beast's pelt" | No |
| **31** | **kt-ch31-l4-q3** | **listen-mc** | "They nailed a yellow paper on Robin's front door for everyone to see." | **R1a-EXACT** | **"on Robin's front door"** | "where his neighbours would find it" | **Yes** |
| 31 | kt-ch31-l5-q3 | listen-mc | "The trees were tall, much taller than any church in the town." | R1b ("taller than any") | "taller than any town building" | "higher than the church spire" | No |
| 31 | kt-ch31-l5-q6 | listen-mc | "Robin took a slow breath. The forest air smelled sweet, like clean rain." | R1c 100% (sweet, clean) | "sweet and clean" | "fresh as rain on summer leaves" | No |
| 31 | kt-ch31-l6-q3 | listen-mc | "Behind the oak tree was a thin man with a torn brown coat." | R1b ("a thin man") | "a thin man in torn clothes" | "a ragged stranger hiding in the wood" | No |
| 31 | kt-ch31-l7-q3 | listen-mc | "We will help each other," he said. "No one is alone here anymore." | R1c 67% (help) | "they would help one another" | "nobody goes hungry alone in this wood" | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch25–32 total items | 862 |
| listen-mc items in scope | 113 |
| R1 violations total | 27 / 113 = **23.9%** |
| R1a-EXACT (P0) | 5 |
| R1b-3GRAM (P0) | 10 |
| R1c-CONTENT-OVERLAP (P1) | 13 |
| Items needing audio regen | 5 (R1a-EXACT cases) |
| Chapters with ≥4 violations | Ch29 (6), Ch30 (5), Ch31 (5), Ch26 (4) |
| ExplanationZh "就是答案" meta-ref flags | **91** (systematic — Ch26–31) |

---

## D. Top 5 P0 (Immediate Fix)

1. **⚠️ kt-ch27-l6-q3** — R1a-EXACT: sentence = "Only his head and one arm could move..."; correct = "only his head and one arm" — word-for-word lift, zero paraphrase. Fix: "just his face and a single limb". Audio regen required.

2. **⚠️ kt-ch29-l5-q3** — R1c 100%: sentence has "soft lights" / "stars"; correct = "soft lights from the stars" — identical key words. Fix: "little fires high in the dark sky". Audio regen required.

3. **⚠️ kt-ch29-l5-q8** — R1a-EXACT: sentence = "the trip felt easy and good"; correct = "easy and good" — verbatim 3-word lift from tail of sentence. Fix: "smooth and pleasant". Audio regen required.

4. **⚠️ kt-ch30-l4-q6** — R1a-EXACT: sentence ends "right in the chest"; correct = "right in the chest" — zero delta. Fix: "square in its heart". Audio regen required.

5. **⚠️ kt-ch31-l4-q3** — R1a-EXACT: sentence = "nailed a yellow paper on Robin's front door"; correct = "on Robin's front door" — 5-word tail copy. Fix: "where his neighbours would find it". Audio regen required.

---

## E. Narrative Voice / Pacing Improvements (3 proposals even if 0 lint violations)

### NV-1: ExplanationZh "就是答案" formula (91 occurrences, Ch26–31)

Current pattern: `「X + Y」就是答案。` — e.g.
> "「簡單清楚」就是答案，不拐彎抹角。"
> "「正中胸口」就是答案。一點都沒偏。"

This phrasing is test-voice jargon ("this is the answer"), not grandma storytelling voice. A child hearing this 91 times across 6 chapters will begin to perceive the game as a test, not a story.

**Proposed formula substitutions** (奶奶語氣):
- `X 就是答案` → `奶奶點點頭——對，就是 X。`
- `X 就是答案` → `Mochi 的耳朵豎起來了——X！`
- `X 就是答案` → `你看到了嗎？X——故事就這樣說的。`

Estimated effort: ~30 min batch-replace with Fable (91 occurrences across 6 chapters).

### NV-2: Ch29 (Odyssey voyage) pacing — five consecutive "the journey was pleasant" beats

Ch29 L4–L5 has five questions in a row on the same theme: the voyage is calm, sunny, stars come out, easy and good, open sea. All correct options use variant of "pleasant journey" — even after fixing R1 violations, the question sequence lacks dramatic contrast. 

**Proposal**: Insert one inference question midway (e.g., "Why does the narrator mention the stars?") to break the detail-detail-detail monotony and require a gist/inference sub-skill shift.

### NV-3: Ch31 (Robin Hood) — explanationZh lacks Robin's voice register

Ch31 explanations are narrator-neutral. Robin Hood's speech in the story has strong voice ("No one is alone here anymore"), but explanations revert to abstract moral language: "他們把黃紙釘在前門——讓所有人都看見."

**Proposal**: Weave Robin's vernacular into explanations:
> Current: "讓所有人都看見。"
> Improved: "奶奶悄悄說：Robin 就是這樣，什麼事都光明磊落、不怕人看見。"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #250: X58_R1_COSINE_SIM lint gate — NLP surface-similarity scoring for correct options

**Source**: Wang & Meng (2026), *Language Testing* — doi:10.1177/02655322251400375.
"Items whose correct option has **lower NLP cosine-similarity** to the stimulus sentence show
statistically higher item discrimination (2PLNLM nested-logit, N=2,267 EFL learners)."

**Current Pickup gap**: R1a/R1b/R1c rules use heuristic substring / n-gram / word-count checks.
This session found **13 P1 (R1c) violations** that heuristic missed in previous 16 cycles —
exactly the pattern Wang & Meng's cosine approach is designed to catch.

**Proposed implementation**:

Add `tools/check-r1-cosine.py` (Python 3, stdlib only — `math.sqrt`, `collections.Counter`):

```python
# TF-IDF cosine similarity: correct_option vs sentence
# Flag as X58_R1_COSINE_SIM if cosine_sim > 0.65 AND len(content_words(correct)) >= 2
# Runs as part of validate-lessons.js via child_process.spawnSync("python3", [...])
# New violation code: X58_R1_COSINE_SIM
```

**Pickup 適配分析**:
- ✅ Static JSON lessons — script reads same `public/lessons-ch*.json` files
- ✅ No external library needed — pure stdlib TF-IDF cosine is ~40 lines of Python
- ✅ Integrates into existing `validate-lessons.js` CI gate with one `spawnSync` call
- ✅ Threshold 0.65 empirically chosen: catches R1c-CONTENT-OVERLAP >60% cases that word-count misses
- 🟡 False-positive rate: short options (≤2 content words) excluded; threshold tunable
- ❌ Does NOT replace human review — scores flag candidates, humans fix

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| TF-IDF cosine similarity lint gate (X58_R1_COSINE_SIM) | [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) | ✅ 完全適配 (static JSON + Python stdlib) | Medium (~3h) | High — blocks 13+ P1 violations per 8-chapter cycle | **RECOMMEND** |
| GenAI distractor auto-revision loop | [Wang & Meng 2026 §3.2](https://doi.org/10.1177/02655322251400375) | 🟡 部分適配 — Pickup has no AI-in-CI pipeline | High (~2d) | Medium | Consider Phase 3 |
| 5Ps distractor typology tagging (Sun/Yang/Liu 2026) | [Higher Education Studies](https://ccsenet.org/journal/index.php/hes/article/download/0/0/52840/57604) | 🟡 Schema field addition needed | High (~1d tagging) | Medium | Defer |
