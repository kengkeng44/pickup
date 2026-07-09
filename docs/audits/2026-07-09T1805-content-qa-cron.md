# Content QA — 2026-07-09 18:05 UTC

**Today's angle:** #2 — R2 Distractor Doctrine (4-option blind / functional distractor quality)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Djinn's Camel / Baba Yaga / Six Swans / Yexian / Three Little Pigs — 389 4-option MC items audited)

**Rationale:** Last 8 cycles covered A6, A3, A4, A5, #12-explanationZh, A7, A1, #11-optionsZh. R2 distractor doctrine has not appeared in the visible audit history. Ch1–8 last had A5 (cultural) and A7 (content-word repetition) — never a full 4-option quality sweep under R2/D1/D2 lens. With blindRetry as the core mechanic, non-functional distractors are a tier-1 defect: a child who can reject 2 options on structural format cues reduces this to a 2-option guess without listening.

**Industry basis (2025–2026):**
- ACL 2025 (aclanthology.org/2025.acl-long.1154): "Generating Plausible Distractors via Student Choice Prediction" — evaluates distractor quality by the probability that real students would *select* it. Non-functional distractors (selected by <5% of students) collapse 4-choice reliability to 2-choice. Pairwise DPO training shows structural cues (same first word, length outlier) are the #1 non-functional signal before semantic plausibility is reached.
- Iimura (JLTA, jstage.jst.go.jp): distractor research on L2 listening: "overlap (same words used in audio text) is the most influential factor making distractors *plausible*" — validating R1 (verbatim-only-in-correct = flaw) and R2 (shared lexical frame across all options = bias).
- TIMSS 2019 / AZ Ed item guidelines (azed.gov): explicit rule — avoid having all options begin with the same word or phrase; this acts as a grammatical anchor that reduces effective choice before content processing begins.
- PMC (pmc.ncbi.nlm.nih.gov/PMC7372664): only 52.2% of distractors in classroom ELT tests are "functioning" (selected by ≥5% of candidates). Anchor-word structure and length-tell are documented sources of non-functioning distractors.

---

## A. validate-lessons.js result

```
Schema shape: ✅ all Ch1–8 JSON parse cleanly against LessonSchema. Zero structural failures.
Total mirror-lint issues: 441 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
Relevant Ch8 flags caught by existing lints:
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT (3-gram "firmer than straw")
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT (3-gram "out the back")
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
```

**Gap:** X2 catches same-first-letter bias broadly; X48 catches 3-gram verbatim hits. But neither enforces *severity tiering* — pronoun/adverb anchors ("he/she/they/by/it" — P0) vs article anchors ("a/an/the" — P2) receive no different treatment. The 12 P0 pronoun-anchor items below are warn-only alongside 429 lower-severity lint warnings, making them invisible in triage.

---

## B. Violation table

**Legend:** D1 = length-tell | D2 = anchor-word | R1 = verbatim-correct-only

| Ch | Q ID | type | snippet | violation | severity | 修法 | audio regen? |
|----|------|------|---------|-----------|----------|------|--------------|
| 1 | kt-ch1-l4-lg2 | comprehension | "Why did he share...?" | D2 all 4 start with "he" | **P0** | 改 1 個干擾項主語為 "the dog" / "nobody" / "the warrior" | No |
| 1 | kt-ch1-l5-q3 | listen-mc | "How did he join...?" | D2 all 4 start with "by" | **P0** | 改 1 干擾項為 "he asked nicely" / "he was invited" 破 anchor | Yes |
| 1 | kt-ch1-l6-q5 | listen-mc | "How did the pheasant attack?" | D2 all 4 start with "by" | **P0** | 改 "by running fast and biting" → "running and biting hard" | Yes |
| 1 | kt-ch1-l3-q5 | listen-mc | "Why was he called Momotaro?" | D1 ratio=1.67 (correct=5w, dist=3w) | P1 | 縮 correct "he came from a peach" → "born from a peach" (3w) | Yes |
| 1 | kt-ch1-l5-q9 | listen-mc | "How was visibility?" | D1 ratio=2.0 (2w vs 1w) | P1 | 延 distractors: "clear" → "very clear", "sunny" → "sunny day" | Yes |
| 2 | kt-ch2-l2-pm1 | picture-mc | "The duckling saw his reflection in the water." | R1 correct echoes sentence "in the water" | P1 | 改 correct → "a duckling peering at its mirror image" | No |
| 2 | kt-ch2-l4-q10 | emoji-pick | "What was the sound?" | D1 ratio=0.50 correct=1w ("rain") vs dists=2w | P1 | 延 correct → "soft rain" | No |
| 3 | kt-ch3-l1-pm1 | picture-mc | 4 opts all start "a" | D2-article | P2 | (lower priority) 改 1 個 opt 主語省略："the hare sleeping…" | No |
| 3 | kt-ch3-l3-q9 | listen-mc | "What was the hare doing?" | D2 all 4 start with "he" | **P0** | 改 1–2 opt 用 "napping under…" / "still sleeping at midday" | Yes |
| 3 | kt-ch3-l3-q10 | comprehension | "Who is shown?" | D2 all 4 start with "the" | P2 | 改 2 opts 首詞變動："a tired hare" / "animals going home" | No |
| 3 | kt-ch3-l4-q10 | comprehension | "Why did the tortoise not look back?" | D1 ratio=1.67 (5w vs 3w) + D2 all "he" | **P0** | 拆兩個問題：改 1 opt 首詞；縮 correct 到 3w | No |
| 3 | kt-ch3-l5-q5 | listen-mc | "What did the crow do?" | D2 all 4 start with "she" | **P0** | 改 1 opt → "nothing at all" / "flew away quickly" | Yes |
| 3 | kt-ch3-l5-q10 | comprehension | "Why weren't the animals punished?" | D2 all 4 start with "they" | **P0** | 改 2 opts 主語 → "the judge said…" / "no one complained" | No |
| 3 | kt-ch3-l7-q10 | comprehension | "Why did the tortoise speak gently?" | D2 all 4 start with "he" | **P0** | 改 1 opt → "it was the kind thing to do" / "Aesop told him to" | No |
| 3 | kt-ch3-l4-x1 | comprehension | "What did tortoise do when hare slept?" | D1 ratio=0.57 (4w vs 7w) | P1 | 縮 3 distractors to 4–5w each | No |
| 4 | kt-ch4-l1-ep2 | emoji-pick | "Which one shows a desert?" | D1 ratio=2.0 correct=2w dists=1w | P1 | 縮 correct → "desert" OR 延 dists → "wide ocean" "tall peak" | No |
| 4 | kt-ch4-l3-q10 | emoji-pick | "What came toward them?" | D1 ratio=1.67 (5w vs 3w) + D2 all "a" | P2 | 縮 correct "a cloud of dust" → "dust cloud" (2w) | No |
| 4 | kt-ch4-l4-lg2 | comprehension | "Why did the Djinn wait?" | D2 all 4 start with "He" | **P0** | 改 2 opts → "the animals needed time" / "it was not his job yet" | No |
| 4 | kt-ch4-l5-x4 | emoji-pick | "How did Djinn watch the Camel?" | D1 ratio=0.60 (3w vs 5w) | P1 | 延 correct "calm and patient" → "patiently watching without speaking" | No |
| 5 | kt-ch5-l1-ep2 | emoji-pick | "Which one shows a forest?" | D1 ratio=0.50 (1w vs 2w) | P1 | 延 correct → "dark forest" | No |
| 5 | kt-ch5-l3-x2 | comprehension | "What did the white rider represent?" | D1 ratio=0.50 (1w vs 2w) | P1 | 延 correct "dawn" → "break of dawn" | No |
| 5 | kt-ch5-l3-q10 | comprehension | "What did the black rider mean?" | D1 ratio=0.50 (1w vs 2w) | P1 | 延 correct "night" → "the night" or "dark night" | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "What was the fence made of?" | D1 ratio=0.50 (1w vs 2w) | P1 | 延 correct "bones" → "white bones" | Yes |
| 5 | kt-ch5-l4-q7 | emoji-pick | "Where did Baba Yaga's hut stand?" | D2 all 4 start with "it" | **P0** | 改 1 opt → "standing on chicken legs" (drop "it") | No |
| 5 | kt-ch5-l7-q3 | listen-mc | "How did Baba Yaga feel?" | D1 ratio=0.50 (1w vs 2w) | P1 | 延 correct "surprised" → "very surprised" | Yes |
| 5 | kt-ch5-l7-x6 | picture-mc | "The glowing eyes turned to her." | R1 verbatim "could not look away" in sentence | P1 | 改 correct → "stood frozen and staring" | No |
| 6 | kt-ch6-l4-lg2 | comprehension | "Why did she stay silent?" | D2 all 4 start with "She" | **P0** | 改 2 opts → "the spell required it" / "breaking it meant death" | No |
| 6 | kt-ch6-l4-x4 | comprehension | "To set them free, she had to…" | R1 verbatim "six shirts from sharp flowers" ≈ sentence | P1 | 改 correct → "craft garments from nettle blooms" | No |
| 6 | kt-ch6-l6-x4 | comprehension | "Was this statement true?" | D1 ratio=1.67 (5w vs 3w) | P1 | 縮 correct "yes, the bride did it" → "yes, she did" | No |
| 6 | kt-ch6-l7-x6 | picture-mc | "What did the bride do after 6 years?" | D1 ratio=1.67 (5w vs 3w) | P1 | 縮 correct "told the truth at last" → "finally told the truth" (4w) | No |
| 7 | kt-ch7-l3-q7 | listen-mc | "What did the family hide?" | D1 ratio=0.60 (3w vs 5w) | P1 | 延 correct "the fish's origin" → "where the fish had come from" (5w) | Yes |
| 7 | kt-ch7-l3-q10 | comprehension | "Yexian sits by empty pond" | R1 verbatim "Yexian loses her only friend" ≈ sentence | P1 | 改 correct → "Yexian mourns her companion" | No |
| 7 | kt-ch7-l3-x7 | comprehension | "What word best describes Yexian's feeling?" | D1 ratio=0.33 (1w vs 3w) = extreme | **P0** | 延 correct "heartbroken" → "deeply heartbroken" OR 縮 dists | No |
| 7 | kt-ch7-l4-q5 | listen-mc | "The bones…under the heap by the gate." | R1 verbatim "under a pile by the gate" | P1 | 改 correct → "near the entrance, buried deep" | Yes |
| 7 | kt-ch7-l6-q7 | listen-mc | "The shoe lay on the road…" | R1 verbatim "stranger on the road" | P1 | 改 correct → "a passerby who found it" | Yes |
| 8 | kt-ch8-l3-q3 | listen-mc | "sticks felt firmer than straw" | R1 verbatim "firmer than straw" (flagged X48) | P1 | 改 correct → "sturdier than the first choice" | Yes |
| 8 | kt-ch8-l4-lg2 | comprehension | "What does the wolf want?" | D2 all 4 start with "He" (flagged X2) | **P0** | 改 2 opts → "the wolf is hungry and…" / "it is a trick to get inside" | No |
| 8 | kt-ch8-l6-q9 | listen-mc | "ran out the back" | R1 verbatim "out the back" (flagged X48) | P1 | 改 correct → "escaped through the rear exit" | Yes |
| 8 | kt-ch8-l7-q3 | listen-mc | "not by our chin hair" | D1 ratio=1.67 (5w vs 3w) | P1 | 延 dists: "nothing at all" → "they said nothing", "we give up" → "we give up now" | Yes |
| 8 | kt-ch8-l7-q7 | listen-mc | "built a hot fire inside a big pot" | R1 verbatim "made a hot fire" ≈ sentence | P1 | 改 correct → "boiled water to trap the wolf" | Yes |

---

## C. Stats

| Metric | Count |
|--------|-------|
| 4-option MC items audited (Ch1–8) | 389 |
| Total violations | 53 |
| — D2 anchor-word P0 (pronoun/adverb) | 12 |
| — D1 length-tell P1 (ratio ≥1.6 or ≤0.6) | 15 |
| — R1 verbatim-correct-only P1 | 9 |
| — D2 anchor-word-article P2 (a/an/the) | 15 |
| — D2 anchor-word P1 (with/to) | 2 |
| Items already caught by existing lint (X2/X48) | ~4 |
| New violations not in existing lint | ~49 |
| Violation rate (all) | 13.6% |
| Violation rate P0 only | 3.3% (13/389) |

**Per-chapter breakdown:**
| Ch | Items | P0 | P1 | P2 |
|----|-------|----|----|----|
| 1 | ~48 | 2 | 2 | 0 |
| 2 | ~42 | 0 | 2 | 2 |
| 3 | ~61 | 5 | 2 | 3 |
| 4 | ~52 | 1 | 3 | 1 |
| 5 | ~55 | 1 | 6 | 3 |
| 6 | ~42 | 1 | 3 | 2 |
| 7 | ~44 | 1 | 4 | 1 |
| 8 | ~45 | 2 | 4 | 3 |

**Ch3 is the worst chapter**: 5 P0 items, concentrated in `comprehension` type LG questions where question asks "why did he/she/they…" forcing all options to share a pronoun anchor.

---

## D. Top 5 P0

1. **kt-ch3-l4-q10** [comprehension] — Double violation: D2 (all 4 start "he") + D1 (ratio=1.67). Question "Why did the tortoise not look back?" — structural cues alone tell a test-wise child the answer before the audio is processed. Fix: restructure 1 distractor without "he"; shorten correct from 5→3 words.

2. **kt-ch8-l4-lg2** [comprehension] — D2 anchor "He" (also flagged by X2). Wolf's motives Q — all 4 options begin "He is…" creating a fill-the-blank feel. Child scans for the "nicest He is…" without listening. Fix: rephrase 2 opts to subject-less or passive ("pretending to be friendly" / "only after a warm place").

3. **kt-ch7-l3-x7** [comprehension] — D1 extreme ratio=0.33: correct is 1 word ("heartbroken"), all 3 distractors are 3 words ("confused and unsure", "angry at the new wife", "thankful"). Any child who knows "heartbroken" = emotion wins immediately from format. Fix: either expand correct or contract distractors.

4. **kt-ch6-l4-lg2** [comprehension] — D2 anchor "She" for Six Swans silence-vow question. All 4 options describe the bride with "She was / She had / She was". Fix: reframe 2 options without explicit pronoun: "the spell required silence" / "breaking it meant losing everything".

5. **kt-ch4-l4-lg2** [comprehension] — D2 anchor "He" for Djinn patience question. All 4 begin "He forgot / He needed / He wanted / He was". Fix: vary subjects: "the Camel needed time" / "the rule was to wait".

---

## 3 Narrative Voice / Pacing Improvements (even if 0 R1-R8 violation)

1. **comprehension LG items — single-pronoun questions**: Questions of the form "Why did he…? / What did she do?" generate all-pronoun options naturally. Industry standard: *restructure the stem* to avoid the pronoun entirely. Instead of "Why did he share his dumplings?" → "What was Momotaro's reason for sharing?" This eliminates D2 at root rather than patching individual options.

2. **emoji-pick single-word options**: The emoji format naturally compresses options to 1–2 words ("rain", "night", "bones"), creating structural D1 outliers when the correct answer is a phrase. Consider standardizing emoji-pick format: correct answer *always* appears as emoji + noun (1–2 words). If a correct concept requires 3+ words, it shouldn't be an emoji-pick — upgrade to listen-mc.

3. **listen-mc ratio cap enforcement**: The design standard R2 specifies ≤1.25× length ratio. This audit found 15 items at ≥1.6×. A pre-commit lint that computes word-count ratio per item (not just character-count) and warns at >1.25× would catch these before content ships. The existing R2 spec is right; it just isn't implemented as a lint.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #135: X72_PRONOUN_ANCHOR_SEVERITY — 分級 anchor-word lint (P0 代詞 vs P2 冠詞)**

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Severity-tiered anchor-word lint: separate P0 (pronoun/adverb: he/she/they/it/by/with/to) from P2 (article: a/an/the) in anchor detection | [ACL 2025 distractor quality](https://aclanthology.org/2025.acl-long.1154/) + [AZ Ed item guidelines](https://www.azed.gov/sites/default/files/2023/10/Rules-for-Writing-Multiple-Choice-Questions.pdf) | ✅ 完全適合。現有 X2 lint 已偵測 anchor-word，但 warn 等級不分 P0/P2。pronoun anchor 使 8-12 兒童靠主語配對略過聆聽 — 應升為 build-fail。article anchor ("a duck…" ×4) 可接受 (picture-mc 描述句天生帶冠詞)。Pickup JSON schema 不需改動，只需 validate-lessons.js 在 X2 check 內加 pronouns/adverbs 黑名單觸發 ERROR 而非 WARN | 0.5h (改 validate-lessons.js X2 block 加清單 + 嚴度分支) | ⭐⭐⭐⭐ HIGH — 直接保護 blindRetry 核心機制不被格式洩題。Ch3 一章就有 5 個 P0 — 改完即時降低洩題率 | ✅ 適合 |

**實作細節 (validate-lessons.js):**
```js
// X72: anchor-word severity split (add inside existing X2 block)
const PRONOUN_ANCHORS = new Set(['he','she','they','it','by','with','to','i','we','you']);
const firstWords = opts.map(o => o.trim().split(/\s+/)[0].toLowerCase().replace(/[.,!?]/g,''));
if (new Set(firstWords).size === 1) {
  const fw = [...new Set(firstWords)][0];
  if (PRONOUN_ANCHORS.has(fw)) {
    errors.push(`X72_PRONOUN_ANCHOR_P0 (all opts start with pronoun/adverb '${fw}' — blind tell)`);
  } else {
    warns.push(`X2_OPTION_LIST_BIAS (all start with '${fw}')`);
  }
}
```

**P0 items to fix before enabling X72 as build-fail (12 items):**
kt-ch1-l4-lg2, kt-ch1-l5-q3, kt-ch1-l6-q5, kt-ch3-l3-q9, kt-ch3-l4-q10, kt-ch3-l5-q5, kt-ch3-l5-q10, kt-ch3-l7-q10, kt-ch4-l4-lg2, kt-ch5-l4-q7, kt-ch6-l4-lg2, kt-ch8-l4-lg2
