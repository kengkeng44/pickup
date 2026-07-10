# Content QA — 2026-07-10 00:06 UTC

**Today's angle**: A6 — Option-in-Question (correct option text appears verbatim in sentence stem or question stem)
**Focus**: Ch25–32 (526 MC questions scanned)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 441
Ch8–9 top violators: X2_OPTION_LIST_BIAS, X48_NGRAM_VERBATIM_CORRECT, X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Schema validation: passed (no hard-fail errors in ch25–32).

---

## B. A6 Violation Table

### Angle Definition
**A6** (Anti-pattern #6 in `pickup-q-design-standard-v1.md`): The correct answer option appears **verbatim** as a substring of the question stem or sentence. The learner can pick the correct answer by text-matching without comprehending the audio.  
Source: Iimura 2018 (JLTA Journal) — "overlap" between option and stimulus text drives construct-irrelevant responses at A2 level. Buck 2001 — verbatim echo is #1 source of construct-irrelevant variance (CIV) in listening tests.

### Scan scope

| Category | Count | Status |
|----------|-------|--------|
| Total MC questions (ch25–32) | 526 | scanned |
| emoji-pick (structural by-design) | 90 | excluded from true A6; see §B2 |
| listen-tf Yes/No | 135 | excluded (script false-positive: "Yes" ⊂ "eyes") |
| listen-mc + grammar-mc scanned | 145 | deep A6 scan |
| **True A6 violations** | **4** | ⚠️ P0 |
| Grammar-mc borderline | 1 | ⚠️ P1 |

### B1. True A6 violations (listen-mc)

| Ch | Q ID | type | sentence snippet | question stem | correct option | 修法 | audio regen? |
|----|------|------|-----------------|---------------|----------------|------|--------------|
| 27 | kt-ch27-l6-q3 | listen-mc | "Only his **head and one arm** could move from the heavy stone." | "How much of the monkey could move?" | `only his head and one arm` | "just his head and a single arm" or "only his head and one limb" | No |
| 29 | kt-ch29-l5-q8 | listen-mc | "Day after day the trip felt **easy and good**." | "How were the first days at sea?" | `easy and good` | "smooth and pleasant" or "calm and simple" | No |
| 30 | kt-ch30-l4-q6 | listen-mc | "It hit the lion **right in the chest**." | "Where did the arrow hit the lion?" | `right in the chest` | "in the middle of its chest" or "square in its front" | No |
| 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper **on Robin's front door** for everyone to see." | "Where did they put the paper?" | `on Robin's front door` | "on his door, for all to see" or "at the front of his home" | No |

### B2. Grammar-mc borderline A6 (P1)

| Ch | Q ID | type | issue | 修法 |
|----|------|------|-------|------|
| 26 | kt-ch26-l6-x5 | grammar-mc | Sentence: "They ___ the crown in the bowl first, **then they put** in the pure gold." → correct: `put`. The word "put" appears in the second clause of the same sentence. Grammar-mc tests conjugation form, not word choice, so severity is lower; but a learner can copy "put" from the sentence without understanding tense. | Rewrite second clause to avoid "put": "…then in went the pure gold." or remove the second clause entirely |

### B3. Structural: emoji-pick (by-design, 90 instances, ch25–32)

All emoji-pick questions share the pattern: sentence = question = "Which one is a ___?" and correct option = "🎯 ___". The target word appears verbatim in both the question and the correct option label.

This is **not a content authoring error** — it is a design property of the emoji-pick type. However, it eliminates visual recognition from the test: any learner can answer correctly by matching text without knowing what the emoji looks like.

Example (kt-ch25-l1-ep1): Q: "Which one is a mountain?" → correct: "⛰️ mountain"

**Design-level fix options**:
1. Remove text labels from emoji options (show emoji only) — requires UI change in `renderers.tsx`
2. Rephrase question without target word: "Which one shows something you climb with a steep peak?" — content authoring only
3. Accept current design as a vocabulary warmup (recognize word → find emoji), not visual identification test

Preferred path: Option 3 (lowest effort); document that emoji-pick tests **word-recall**, not visual recognition. No change to lessons-ch*.json needed, but update `pickup-q-design-standard-v1.md` §Question type taxonomy to note this distinction.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch25–32 MC questions scanned | 526 |
| True A6 violations (listen-mc) | 4 (2.7% of 145 deep-scanned) |
| Grammar-mc borderline | 1 |
| Structural emoji-pick labels | 90 |
| False positives (listen-tf Yes/eyes) | ~7 |
| Average phrase overlap length (A6 true) | 4.0 words |
| Chapters with ≥1 true A6 | Ch27, 29, 30, 31 |
| Chapters clean (ch25, 26*, 28, 32) | 4 (* ch26 has borderline grammar-mc) |

---

## D. Top 5 P0

1. ⚠️ **kt-ch27-l6-q3** — 5-word verbatim echo "only his head and one arm" in listen-mc. Highest overlap severity; answer can be read directly from audio sentence without comprehension.
2. ⚠️ **kt-ch30-l4-q6** — 4-word phrase echo "right in the chest" in a detail-recall question. Especially problematic since location questions are expected to train spatial vocab.
3. ⚠️ **kt-ch31-l4-q3** — 4-word phrase echo "on Robin's front door" in a where-question. Renders the distractor set useless for A2 learners who simply scan for matching words.
4. ⚠️ **kt-ch29-l5-q8** — 3-word phrase echo "easy and good" in an adjective-recall question. Collocations should be paraphrased (e.g., smooth + pleasant) to test true retention.
5. ⚠️ **kt-ch26-l6-x5** (P1 borderline) — grammar-mc with "put" visible in the second clause of the same sentence. Lower impact (form testing), but measurable test-wiseness shortcut.

---

## E. Narrative Voice / Pacing Improvements (3 proposals — required even with low violation count)

### NV-1: Monotone chapter intro narrations across all ch25–32

**Pattern found**: Every chapter (ch25 through ch32) opens with the exact same two narration sentences:
- `"Tonight's story has a few new words. Let's learn them first!"`
- `"A few more words to learn — then the story begins!"`

These are verbatim repeats across 8 chapters. Grandma's voice loses personality; the storytelling frame becomes a template, not a living invitation.

**Fix**: Each chapter intro should reflect the specific story. Examples:
- Ch25 (Yu Gong / Move Mountains): *"Tonight's farmer has a very stubborn dream. Let's learn the words first!"*
- Ch26 (Archimedes): *"Our scientist tonight loved puzzles more than dinner. A few words, then we find out why!"*
- Ch27 (Journey to the West): *"A very long road, a very stubborn monkey — and a monk who never gave up. Let's learn some adventure words!"*
- Ch28 (Three Visits): *"Tonight's hero knocked on the same door three times. Let's learn why patience mattered!"*

### NV-2: Question stem register mismatch (clinical stem vs. warm story)

**Pattern found**: Several question stems in ch27–31 shift into a formal test-item register ("How much of the monkey could move?", "Where did the arrow hit the lion?") that breaks the grandma storytelling frame established by the narration.

**Fix**: Rephrase stems to match story register:
- "How much of the monkey could move?" → "When the stone trapped him, which part of him could still wiggle?"
- "Where did the arrow hit the lion?" → "When Heracles fired — where did his arrow land?"
- "How were the first days at sea?" → "When the ship first left the shore, how did the days feel?"

**Effort**: Content-only, no schema change. 3–5 stems across ch27–31.

### NV-3: Rhythm loss in paraphrase (narrative texture dropped)

**Pattern**: Ch28-l3 sentence "He knocked three times, soft and slow, with the back of his hand" → question correct option: "gently and quietly". The option captures manner but loses the *three times* detail that signals respect in Chinese cultural context.

More broadly: several listen-mc options in ch28–31 collapse nuanced narrative moments into plain adjectives, losing the pacing detail that makes grandma's voice distinctive.

**Fix** (spot fixes, not global): Preserve key narrative numbers/details in correct option when they carry meaning. "gently and quietly" → "three slow, gentle knocks" for this specific question. Apply same principle to ch29-l3-q5 and ch31 where counting details appear in the audio.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Source research for this cycle

| Source | Finding |
|--------|---------|
| Iimura 2018, JLTA Journal ([link](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_pdf)) | Overlap scored 0–2 ordinal (0=no shared words, 1=partial, 2=full verbatim). High-overlap options attract responses for construct-irrelevant reasons, especially at A2. |
| LEARN Journal 2023 ([link](https://so04.tci-thaijo.org/index.php/LEARN/article/view/259952)) | TOEIC distractor taxonomy names "overlap/verbatim" as a plausibility inflator that degrades item validity — not a legitimate distractor mechanism. |
| Buck 2001, Assessing Listening (Cambridge) | Verbatim echo between audio and correct option is #1 source of construct-irrelevant variance (CIV) in listening tests. A2 learners lean hardest on surface pattern recognition. |
| Burstein et al. 2024, arXiv 2409.07476 ([link](https://arxiv.org/pdf/2409.07476)) | Duolingo's generative AI item pipeline includes "naturalness checks" and "selectivity and refinement" targeting exactly this artifact class — but implemented as human QA, not an open lint rule. |
| arXiv 2024 ([link](https://arxiv.org/pdf/2403.02078)) | GPT-3.5 automated cloze validation pipeline lacks a published open-source lint for verbatim answer leak; detection is bespoke in-house. |

### ARCH-REC #136: X73_A6_PHRASE_OVERLAP_SCORE — Ordinal option–sentence overlap lint (Iimura 2018 framework)

**Pattern**: Replace ad-hoc X48_NGRAM_VERBATIM_CORRECT (3-gram match) with a principled **ordinal overlap score** (0/1/2) per Iimura 2018, applied to all MC question types except emoji-pick and listen-tf.

**Scoring**:
- Level 0 (OK): No content words from correct option appear in sentence
- Level 1 (WARN): 1–2 content words shared but in different order or separated
- Level 2 (ERROR): 3+ content words shared in same order (phrase match) → same as current X48 but extended to all types, not just 3-gram window

**Pickup 適配 analysis**:
- ✅ Fits Pickup React + Zod + JSON architecture: purely a validation script change in `tools/validate-lessons.js`, no app code touched
- ✅ Grounded in peer-reviewed empirical research (not opinion)
- ✅ Fixes all 4 true A6 violations found this cycle automatically
- ✅ Low implementation effort: ~30 lines added to validate-lessons.js
- ✅ Content authors get actionable lint output per question ID
- 🟡 Requires stop-word list (reuse existing from X48 or add GSL-2000 filter)
- ❌ Does NOT address structural emoji-pick issue (separate lint rule X74 needed)

**Implementation sketch** (validate-lessons.js):

```js
// X73: Ordinal A6 overlap score
function overlapScore(sentence, correctOption) {
  const stopwords = new Set(['the','a','an','is','was','it','he','she','they','in','on','at','to','of','and','or','for','with','his','her','its']);
  const words = s => s.toLowerCase().match(/\b[a-z]+\b/g)?.filter(w => !stopwords.has(w)) || [];
  const sw = words(sentence); const ow = words(correctOption);
  const shared = ow.filter(w => sw.includes(w));
  if (shared.length === 0) return 0;
  // Check phrase order match
  const phraseMatch = sentence.toLowerCase().includes(correctOption.toLowerCase().substring(0, Math.min(correctOption.length, 12)));
  return phraseMatch ? 2 : 1;
}
// level 2 → EMIT 'X73_A6_PHRASE_OVERLAP_ERROR'
// level 1 → EMIT 'X73_A6_PHRASE_OVERLAP_WARN'
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Ordinal A6 Overlap Score (Iimura 2018) | JLTA Journal | ✅ 適合 — validate-lessons.js only | Low (1 session) | High — catches all phrase-echo violations automatically | ✅ **實作** |
| Human QA step (Duolingo pipeline) | arXiv 2409.07476 | 🟡 部分適合 — already done by cron audit | N/A (process) | Already covered by 6-angle cron | No change needed |
| Emoji-pick label removal (visual recognition pure) | Design principle | 🟡 部分適合 — option 3 (document as vocab-recall type) accepted | None | Avoids UI overhaul | Document in spec only |
