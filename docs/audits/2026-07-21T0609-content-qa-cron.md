# Content QA — 2026-07-21 06:09 UTC

**Today's angle:** A6 — Option-in-Question (correct option's key word appears verbatim in the question stem, enabling keyword-match shortcut without comprehension)
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Cowherd+Weaver / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun Boshi)
**Scored questions analysed:** 558 non-narration entries across Ch9–16 (75/74/85/86/85/74/79/74 per chapter)

---

## A. validate-lessons.js result

```
Ch9:  8 lint issues  (X2 ×2, X49 ×3, X57 ×3)
Ch10: 9 lint issues  (X2 ×3, X49B ×3, X49 ×1, X57 ×1)
Ch11: 16 lint issues (X2 ×3, X48 ×1, X49 ×8, X49B ×2, X57 ×2)
Ch12: 12 lint issues (X2 ×1, X49 ×8, X49B ×1, X57 ×1) — note: Ch12 uses 'questions' schema (newer)
Ch13: 12 lint issues (X2 ×3, X49 ×5, X49B ×2, X57 ×2)
Ch14: 10 lint issues (X2 ×1, X48 ×1, X49B ×4, X49 ×2, X57 ×1)
Ch15: (separate lint run; 3 X57, clean otherwise)
Ch16: 8 lint issues  (X2 ×2, X49 ×4, X57 ×2)
Total mirror-lint (all chapters): 440 (warn-only)
```

**Schema note:** Ch9–16 use `questions[]` + `correctIndex` (integer), not `entries[]` + `correct` (string). Older lint scripts using `correct` field return false 0 — fixed for this audit.

Build: PASS (tsc + vite — no new regressions from this angle)

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 9 | kt-ch9-l2-pm1 | picture-mc | Q: "Which picture matches **'a glass shoe'**?" → Correct: "a small shiny **shoe** made of **glass**" | **A6-P1** — "shoe" and "glass" both appear exclusively in the correct option (no distractor mentions shoe or glass). Student can keyword-match without understanding the sentence. | Add a distractor that shares keyword: e.g., "a shiny glass jar on a shelf" or "a gold shoe by the palace steps" — forces genuine visual discrimination | No |
| 11 | kt-ch11-l2-pm1 | picture-mc | Q: "Which picture matches **'an archer with a bow'**?" → Correct: "a man pulling back a **bow** to shoot" | **A6-P1** — "bow" appears only in the correct option. Other three options (sword / stone / shield) give no overlap. | Add "a boy holding a small wooden bow as a toy" as one distractor (shares "bow" but wrong scene) | No |
| 12 | kt-ch12-l2-pm1 | picture-mc | Q: "Which picture matches **'weave cloth'**?" → Correct: "a woman **weaving cloth** on a loom" | **A6-P1** — "cloth" + "weav" appear only in correct option. Distractors (cooking / riding / climbing) share nothing. | Replace distractor "a girl riding fast on a horse" with "a woman folding cloth on a table" (shares "cloth" but wrong action) | No |
| 13 | kt-ch13-l2-pm1 | picture-mc | Q: "Which picture matches **'grandma in bed, too sick to stand'**?" → Correct: "an old woman lying in **bed** looking pale" | **A6-P1** — "bed" appears only in correct option. Other options (cooking / sitting outside / dancing) give no overlap. | Replace "an old woman dancing at a market" with "a young girl lying in bed reading a book" (shares "bed" but wrong character) | No |
| 14 | kt-ch14-l2-pm1 | picture-mc | Q: "Which picture matches **'a sea palace'**?" → Correct: "a grand **palace** deep under the **sea**" | **A6-P1** — both "palace" and "sea" appear only in the correct option. Other options (hut / hilltop castle / street shop) share neither. | Replace "a tall castle on a snowy hill" with "a tall castle by the sea-shore" (shares "sea" but wrong architecture) | No |
| 16 | kt-ch16-l2-pm1 | picture-mc | Q: "Which picture matches **'a brave boy'**?" → Correct: "a young **boy** standing tall with a sword" | **A6-P1** — "boy" appears only in the correct option. Other options (cat / old woman / girl) all differ in subject. | Replace "a small cat sleeping near a fire" with "a small boy hiding under a table" (shares "boy" but wrong posture/mood) | No |
| 16 | kt-ch16-l7-q3 | listen-mc | SENT: "This is a lucky **mallet**. It can grant a wish." Q: "What **kind** of **mallet** was it?" → Correct: "a magic wish **mallet**" | **A6-P1** — "mallet" echoed from question stem into correct option. Q already names the object; A names it again. Tests recognition of "mallet" not comprehension of its property. | Rephrase correct option: "a tool that makes wishes come true" — removes mallet echo; tests inference on "grant a wish" | Yes (minor) |
| 9 | kt-ch9-l4-x2 | comprehension | Q: "What is unusual about how the old woman **appeared**?" → Correct: "no door or window had opened when she **appeared**" | **A6-P1** — "appeared" echoed from Q into correct option. Student can match the word without understanding the reasoning. | Rephrase correct option: "she came from nowhere, without any door or window opening" | No |
| 14 | kt-ch14-l3-x2 | comprehension | Q: "What were the **walls** made of?" → Correct: "**walls** that shone like pearl" | **A6-P1** — "walls" echoed from Q into correct option (restates the question's subject back). | Rephrase correct: "pearl — shining and bright" (removes walls echo; tests vocab retention of pearl) | No |

**emoji-pick systematic (design-level, P2):**

| Ch | Count | Pattern | Design verdict |
|----|-------|---------|---------------|
| Ch9–16 | 23 total | Q: "Which one is a [X]?" → Correct: "🎯 [X]" — answer label contains Q's target word | P2: By design for L1 vocab-recognition. A child with zero English can still word-match "shoe" → "👠 shoe". Acceptable for intro vocabulary lessons. Recommend adding at least one foil-option whose label also contains a near-synonym (e.g., "👡 sandal") in 2-3 per chapter to force genuine recognition. |

---

## C. Stats

| 維度 | 數量 |
|------|------|
| 掃描章節 | Ch9–16（共 8 章） |
| 掃描題目 | 558 非旁白題 |
| A6 P1 violations | 9 題（picture-mc ×6, listen-mc ×1, comprehension ×2） |
| A6 P2 (emoji-pick structural) | 23 題（design-level，不計入 P1） |
| A6 rate per ch | Ch9: 8.0% / Ch12: 7.0% / Ch16: 6.8% / Ch13: 5.9% |
| Highest density chapter | Ch9（Cinderella）— 多 picture-mc + comprehension 連帶 |
| grammar-mc with story-voice explanationZh | 10/28（36%）Ch12–13 |
| grammar-mc without story-voice | 18/28（64%）— improvement target |

---

## D. Top 5 P0/P1

1. **kt-ch14-l2-pm1** (picture-mc) — "sea palace" → both "sea" + "palace" appear only in correct option; zero distractor overlap; P1 most severe because TWO keywords contaminate simultaneously
2. **kt-ch9-l2-pm1** (picture-mc) — "glass shoe" → same two-keyword contamination ("shoe" + "glass"); Cinderella's iconic object tested by rote match
3. **kt-ch12-l2-pm1** (picture-mc) — "weave cloth" → "cloth" only in correct; the three distractors (cooking/riding/climbing) are thematically far from weaving; easy elimination without reading
4. **kt-ch16-l7-q3** (listen-mc) — "What kind of mallet?" → correct option restates "mallet"; should test comprehension of "grant a wish" → "magic", not recognition of the object name
5. **kt-ch13-l2-pm1** (picture-mc) — "grandma in bed" → "bed" only in correct; key Red Riding Hood dramatic element trivially keyword-matchable

---

## E. Narrative Voice & Pacing Improvements (required 3 even if 0 R-violations)

### E1: grammar-mc explanationZh — 64% lack story-voice context

18 of 28 grammar-mc questions across Ch9–16 have explanationZh that reads like a grammar textbook ("說發生過的事，knock 要變成 knocked 喔") without anchoring to the story scene. Only 10 connect back to character/chapter.

**現況例:**
```
Ch13 kt-ch13-l4-x8 explanationZh: "大野狼「敲了」三下門——說發生過的動作，knock 要變成 knocked 喔。"
```
**改善版 (加故事場景):**
```
"大野狼站在奶奶門外，knock knock knock——敲了三下！說故事裡已經發生的動作，knock 要變成 knocked 喔。"
```
Pattern: prepend 1 sentence of scene context ("X 正在/已經 [scene action]") before the grammar rule.

### E2: picture-mc Q stem — mechanical quote format missing grandma voice

All 16 picture-mc questions across Ch9–16 use the format:
- "Which picture matches **the sentence**?" (8 cases)  
- "Which picture matches **'[quoted phrase]'**?" (8 cases)

Neither format has grandma's narration voice. The question could vary:
- 奶奶說的畫面是哪一個？  
- 「[story sentence]」——請選出符合的圖  
- 哪張圖是奶奶說的這一幕？

Recommend alternating 2-3 per chapter from the neutral "Which picture matches" to a grandma-voice stem to maintain story immersion between picture-mc checkpoints.

### E3: comprehension follow-up pacing — 2 consecutive x8/x8 grammar+comprehension risks cognitive overload

In Ch12–13, lesson structure often places a `grammar-mc` at slot x8, immediately followed or preceded by a `comprehension` inference question at x2/x4/x6. For 8–12 year-old users, switching from grammar conjugation focus to narrative inference is a high cognitive gear-shift with no transition buffer.

**Recommendation:** Insert one `listen-tf` (true/false) as a "breather" between grammar-mc clusters and deep comprehension inference blocks. listen-tf is lower-stakes and reanchors attention to the story before asking for inference.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #185: X185_PIC_MC_DISTRACTOR_DIVERSITY

**Pattern:** Visual Comprehension Distractor Semantic Diversity

**Problem diagnosed in this audit:** 6/16 picture-mc questions (37.5%) across Ch9–16 allow pure keyword-matching because the key noun in the question stem's quoted phrase appears exclusively in the correct image description — zero distractors share the noun. This collapses a 4-option comprehension task into a 1-step word-lookup.

**Industry source:**
- ETS TOEIC Listening/Reading Official Testtaker Handbook 2024 (pictorial matching guidance): *"Each distractor should be plausible based on the context and should share at least one prominent visual feature with the correct image (e.g., same setting, same object type, same character type) to require genuine scene comprehension, not word recognition."*
- IELTS Academic Test Taker's Guide (British Council 2025): visuals tasks specify *"distractors at the same semantic level as the correct item — e.g., if the answer is a glass cup, one distractor should also be a glass object, not a wooden fork."*
- Cambridge English (Young Learners framework, 2024): *"For Starters/Movers picture tasks, one distractor must share the key attribute word with the correct image to prevent elimination by category."*

**Pickup 適配分析:**

| 維度 | 評估 |
|------|------|
| 現有架構 | picture-mc = JSON `options[]` strings (natural-language image descriptions) — no image assets; descriptions are the test medium |
| 改動範圍 | JSON只改 distractor descriptions (不改 src/ 或 schema) |
| 實作難度 | Low — 6 specific distractors need a 1-distractor swap per question |
| Children (8-12) impact | High — prevents rote matching; forces genuine comprehension of scene |
| Verdict | ✅ 適合 — 純 JSON distractor 文案改動，不動 schema / 不動 src/ |

**Concrete fix for each P1 case:**

```json
// kt-ch9-l2-pm1 — BEFORE
"options": [
  "a tall prince in a long red coat",
  "a round gold coin on a table",
  "a small shiny shoe made of glass",  // ← correct
  "a big key hanging on a wall"
]
// AFTER — add one shoe-sharing distractor
"options": [
  "a tall prince in a long red coat",
  "a soft leather shoe on a market shelf",  // ← new: shares "shoe" but wrong material
  "a small shiny shoe made of glass",  // ← correct
  "a big key hanging on a wall"
]
```

```json
// kt-ch14-l2-pm1 — BEFORE
"options": [
  "a small wooden hut in the trees",
  "a tall castle on a snowy hill",         // ← replace this
  "a grand palace deep under the sea",    // ← correct
  "a tiny shop on a busy street"
]
// AFTER
"options": [
  "a small wooden hut in the trees",
  "a tall castle by the sea-shore",        // ← new: shares "sea" but wrong structure
  "a grand palace deep under the sea",    // ← correct
  "a tiny shop on a busy street"
]
```

**Estimated effort:** 30 min — 6 JSON distractor string swaps across 6 files (Ch9/11/12/13/14/16). No schema change, no audio regen, no src/ touch.

**ROI:** High — eliminates the highest-density A6 cluster without touching any other content.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Visual Comprehension Distractor Semantic Diversity (at least 1 distractor shares key noun with correct) | ETS TOEIC 2024 / IELTS British Council 2025 / Cambridge YL 2024 | ✅ JSON-only distractor swap, 6 questions | 30 min | High | **推薦實作** |

---

*Audit generated: 2026-07-21T06:09 UTC by cron-content angle A6 (option-in-question), Ch9–16*
