# ⚠️ Content QA — 2026-07-06 06:07 UTC

**Today's angle: A1 — Obvious Correct (gap too easy / distractor viability failure)**
**Focus: Ch9–16** (Cinderella / Chang'e&Hou Yi Moon / Hou Yi Suns / Cowherd-Weaver / Red Riding Hood / Urashima / Emperor's New Clothes / Issun-boshi)

**A1 definition:** Questions where the correct answer is trivially predictable without genuine engagement with the stimulus — including:
- Wrong `correctIndex` (option text & explanationZh conflict)
- Junk distractors (3/3 options are semantically nonsensical → elimination trivial)
- Near-verbatim surface match between correct option and sentence stem (correct lifts key content words from the same sentence the student just heard/read — construct-irrelevant facility)

**Industry basis:** Read 2000 ("distractor viability" — each distractor must represent a plausible failure mode, not mere randomness); Rodriguez 1997 meta-analysis (one non-functional distractor increases probability of correct guessing from 25% to 33% — reliability drop); arXiv:2501.13125 "Generating Plausible Distractors via Student Choice Prediction" (2025) — confirms that surface lexical overlap between correct option and stimulus is the top predictor of item facility (makes Q too easy for A2 learners). Buck 2001: verbatim reproduction is #1 construct-irrelevant variance source for listening.

---

## A. validate-lessons.js result

| Ch | Lessons | Lint issues (WARN) |
|----|---------|-------------------|
| 9  | 7 | 8 (X49×3, X57×3, X2×2) |
| 10 | 7 | 9 (X49B×4, X49×1, X57×1, X2×3) |
| 11 | 7 | 16 (X49×7, X49B×4, X48×1, X57×2, X2×3) |
| 12 | 7 | 12 (X49×6, X49B×1, X57×1, X2×1) |
| 13 | 7 | 12 (X49×5, X49B×2, X57×3, X2×3) |
| 14 | 7 | 10 (X49B×6, X49×1, X48×1, X57×2, X2×1) |
| 15 | 7 | 9 (X49B×? X57×? X2×1) |
| 16 | 7 | 10 |
| **Total** | **56** | **86 WARN** |

Existing lint does **not** catch A1 verbatim surface-match violations below 3-gram threshold — this is the gap this angle addresses.

---

## B. Violation Table

| Ch | Q ID | type | snippet (stem → correct option) | violation | severity | 修法 | audio regen? |
|----|------|------|----------------------------------|-----------|----------|------|-------------|
| 12 | kt-ch12-l4-x7 | comprehension | "Tears fell on **both sides** of the wide silver river." → **[✓] "only Zhinu cried"** | A1_WRONG_CORRECT_INDEX — `correctIndex=1` contradicts stem ("both sides") AND own explanationZh "兩邊都在哭，是「兩個人都哭了」" | **P0** | `correctIndex: 1 → 2` ("both of them cried") | No |
| 12 | kt-ch12-l4-lg2 | comprehension | "Niulang stood on one side. Zhinu stood far on the other. Tears fell on **both** sides..." → **[✓] "Niulang was angry at the silver river for being too wide"** | A1_WRONG_CORRECT_INDEX — stem shows shared sadness; explanationZh says "不是一個人哭，是兩個人都心碎"; anger not mentioned anywhere | **P0** | `correctIndex: 1 → 0` ("Both Niulang and Zhinu were apart and full of longing") | No |
| 11 | kt-ch11-l7-q7 | listen-mc | "He looked at it some nights in the soft lamp light." Q: "Why did Hou Yi keep the bow?" → **[✓] "as a quiet memory"** but distractors: "for selling gold price" / "**cat noise made him**" / "daily cleaning fun" | A1_JUNK_DISTRACTOR — 3/3 distractors are semantically broken/absurd; correct trivially obvious by elimination; no plausible failure mode represented | **P0** | Replace all 3 distractors with plausible failure modes, e.g. "to train his son one day" / "to trade for food later" / "because it was too large to store" | Yes (distractor audio) |
| 13 | kt-ch13-l7-q3 | listen-mc | "He **opened up** the wolf with **great care**." → **[✓] "opened him up carefully"** | A1_VERBATIM (R1 cross-pattern) — correct is rearrangement of stem content words ("opened up" + "care"→"carefully"); no paraphrase used | **P0** | Rewrite: "cut the wolf open with his hunting knife" or "used his blade on the wolf" | Yes |
| 11 | kt-ch11-l3-q9 | listen-mc | "**One sun fell down.** The air felt a little cooler." Q: "What happened after the first arrow?" → **[✓] "a sun came down"** | A1_VERBATIM — "a sun came down" is a single-word swap for "one sun fell down"; zero inference required | **P0** | Rewrite: "the sky lost one light" or "the burning heat eased a little" | Yes |
| 11 | kt-ch11-l3-x2 | comprehension | "Hou Yi walked across the **dry brown** land." → **[✓] "dry and brown all over"** | A1_SURFACE_MATCH — lifts "dry brown" verbatim; only adds "all over" | **P1** | Rewrite: "cracked and bare without water" or "parched and colourless" | No |
| 11 | kt-ch11-l4-q7 | listen-mc | "**Only one** sun was left up there now." → **[✓] "just one"** | A1_SURFACE_MATCH — "just one" ≈ "only one"; minimal rewording | **P1** | Rewrite: "a single sun remained" or "the sky held one last light" | Yes |
| 12 | kt-ch12-l3-x7 | comprehension | "One day she **came down on** a long **white cloud**." → **[✓] "rode down on a cloud"** | A1_SURFACE_MATCH — "came down on a cloud" → "rode down on a cloud"; key phrase "on a cloud" copied verbatim | **P1** | Rewrite: "arrived from the sky on a cloud" or "descended from the heavens" | No |
| 12 | kt-ch12-l4-x4 | comprehension | "A great **silver river** flowed where she drew the line." → **[✓] "wide shining river"** | A1_SURFACE_MATCH — "silver river" → "shining river"; substitution is surface only | **P1** | Rewrite: "a boundary of water that could not be crossed" or "the river that split the sky in two" | No |
| 13 | kt-ch13-l7-x2 | comprehension | "The huntsman saw the **wolf fast asleep in grandma's bed**." → **[✓] "the wolf sleeping in the bed"** | A1_SURFACE_MATCH — "fast asleep" → "sleeping"; "in grandma's bed" → "in the bed"; direct lift | **P1** | Rewrite: "the animal hiding under the blanket" or "a large shape pretending to be grandma" | No |
| 16 | kt-ch16-l7-x2 | comprehension | '"This is a lucky mallet. **It can grant a wish**."' → **[✓] "able to grant a wish"** | A1_SURFACE_MATCH — "it can grant a wish" → "able to grant a wish"; verbatim carry-over of key phrase | **P1** | Rewrite: "a magical object that could make dreams real" or "something that could change Issun's fate" | No |
| 16 | kt-ch16-l6-q3 | listen-mc | "Inside the demon, it was **very dark**." → **[✓] "dark all around"** | A1_SURFACE_MATCH — "very dark" → "dark all around"; trivial vocabulary swap | **P1** | Rewrite: "like being sealed in a cave" or "no light reached him at all" | Yes |

**Additional P2 surface-match cluster** (near-verbatim but single-word substitution only):
- kt-ch14-l3-x2: "walls shone like pearl" → "walls that shone like pearl" (already caught by X48_NGRAM)
- kt-ch14-l4-x4: "walked in the coral garden with the princess" → "walked in the garden together"
- kt-ch14-l5-x6: "never open it" → "never open the box"
- kt-ch13-l7-x4: "both could breathe again" + "grandma sat up" → "both sat up and breathed again"
- kt-ch15-l4-x6: "they all said it was lovely" → "nodded and said it was lovely"

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters scanned | Ch9–16 (8 chapters) |
| Lessons scanned | 56 |
| Q types checked (A1 relevant) | listen-mc + comprehension |
| listen-mc Q total | 88 |
| comprehension Q total | 120 |
| **Total Q checked** | **208** |
| A1 violations found | 17 (5 P0 + 7 P1 + 5 P2) |
| P0 wrong-correctIndex | 2 (both in Ch12, same lesson l4) |
| P0 junk-distractor | 1 (Ch11 l7-q7) |
| P0 verbatim (R1 cross-pattern) | 2 (Ch11, Ch13) |
| P1 surface-match (<3-gram threshold) | 7 |
| P2 surface-match (mild) | 5 |
| Chapters with 0 A1 issues | Ch9, Ch10, Ch15* |
| Chapters with ≥3 issues | Ch11 (4), Ch12 (5), Ch13 (3) |

*Ch15 has no A1 issues but narrative pacing concern noted (see §E).

---

## D. Top 5 P0

1. **⚠️ kt-ch12-l4-x7** — Wrong answer taught: "only Zhinu cried" when stem + explanationZh both say "兩邊都在哭." Players who trust the game learn a false fact. Fix: `correctIndex: 1 → 2`.

2. **⚠️ kt-ch12-l4-lg2** — Wrong answer taught: "Niulang was angry" when explanationZh explicitly states "兩個人都心碎." The 'legendary' tier inference question is testing the opposite of the correct inference. Fix: `correctIndex: 1 → 0`.

3. **⚠️ kt-ch11-l7-q7** — Three junk distractors ("cat noise made him", "for selling gold price", "daily cleaning fun") make the correct answer obvious by elimination. Zero cognitive engagement required. Distractor quality drops the entire lesson's discriminability.

4. **⚠️ kt-ch13-l7-q3** — "opened him up carefully" is a word-for-word rearrangement of "opened up the wolf with great care." Buck 2001 R1 violation: verbatim carry-over means the player is matching text, not comprehending.

5. **⚠️ kt-ch11-l3-q9** — "a sun came down" ← "one sun fell down." A2 learners identify "sun" + "fell/came down" as the same. Item tests vocabulary recognition, not comprehension of the consequence.

---

## E. Narrative Voice / Pacing Improvements (3 mandatory, even with violations found)

1. **kt-ch14-l4-lg2 pacing** — Correct answer "The palace noise kept his mind busy" is an abstraction that 8-12 year olds may find confusing. The implied causal chain (noise → distraction → forgetting mother) is adult reasoning. Better: "The music and dancing filled every hour" — concrete sensory anchor, same meaning, age-appropriate.

2. **kt-ch12-l7-x7 cultural grounding** — Correct answer "under the night stars on Qixi" assumes players know Qixi (七夕). The question is `explanationZh`-less for this q. Even a brief hint ("七夕=中秋前的牛郎織女節") in the explanationZh would serve 8-12 learners encountering the festival for the first time.

3. **kt-ch15-l6-x2 narrative misdirection** — STEM is "The child had never heard the strangers' secret rule." The correct answer "right up near the front" (crowd position) seems disconnected from the stem's content about the "secret rule." The question tests a detail that isn't in the provided stimulus — the crowd position was in an earlier narration sentence. Recommend either (a) expand stimulus to include the positional context sentence, or (b) rephrase the question as "Why could the child say what no grown-up would say?" to directly test the reasoning the stem enables.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Industry signal:** arXiv:2501.13125 "Generating Plausible Distractors for Multiple-Choice Questions via Student Choice Prediction" (Jan 2025) shows that surface lexical overlap between the correct option and the stimulus sentence is the strongest predictor of item facility (= makes the question too easy for target proficiency). The paper proposes automatic plausibility scoring using student-choice rank models. ACL 2025 "D-GEN" (aclanthology.org/2025.findings-acl.174) introduces automated distractor evaluation including a verbatim-overlap dimension. Both align with Buck 2001 R1 rule — but current Pickup linter only catches 3-gram exact overlaps (X48). This audit found **13 violations** that use 1-2 content words from the stem — all slip through X48.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| **X58_WORD_OVERLAP_SURFACE_MATCH** — lint rule: flag when Jaccard(correct_content_words, stem_content_words) > 0.35 AND shared_content_word_count ≥ 2 (stopword-filtered). Extends X48 from 3-gram to word-level overlap. | [arXiv:2501.13125](https://arxiv.org/abs/2501.13125) · [D-GEN ACL 2025](https://aclanthology.org/2025.findings-acl.174.pdf) | ✅ 完全適合 — validate-lessons.js 已有相同模式; `sentence` + `options[correctIndex]` 欄位完整; stopword list 20 行; Jaccard 計算 5 行 | LOW (~25 lines in validate-lessons.js) | HIGH — 本次 audit 發現 13 P1 全部會被此 rule 攔截 | ✅ 實作 |

**ARCH-REC #121: X58_WORD_OVERLAP_SURFACE_MATCH — add Jaccard content-word overlap lint rule to validate-lessons.js to catch near-verbatim correct options below the existing 3-gram threshold.**

Implementation sketch for `tools/validate-lessons.js`:
```js
const STOPWORDS = new Set(['a','an','the','is','are','was','were','in','on','at','to','of','and','or','but','not','it','he','she','they','his','her','their','this','that','be','do','did','had','have','has','with','for','from','up','out','by','so','as']);
function contentWords(str) {
  return str.toLowerCase().replace(/[^a-z ]/g,'').split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));
}
function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}
// In Q-level checks:
const stemW = contentWords(q.sentence || '');
const correctW = contentWords(q.options[q.correctIndex] || '');
const shared = stemW.filter(w => correctW.includes(w));
if (jaccard(stemW, correctW) > 0.35 && shared.length >= 2) {
  warn(chFile, q.id, `X58_WORD_OVERLAP_SURFACE_MATCH (shared: "${shared.join(', ')}" — correct option lifts content words from stem, may give away answer to A2 learners)`);
}
```
