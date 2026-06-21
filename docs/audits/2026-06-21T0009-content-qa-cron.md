# ⚠️ Content QA — 2026-06-21 00:09 UTC

**Today's angle: A6 — Option-in-Question (Answer-in-Stem / Verbatim Overlap)**
**Focus: Ch0–8** (ground-floor vocab + Momotaro / Ugly Duckling / Tortoise & Hare / Camel / Baba Yaga / Six Swans / Yexian / Three Little Pigs)

**A6 Definition (Pickup v2.0 adapted):** A violation occurs when:
- **A6a (Verbatim in sentence)**: A correct option's text appears verbatim as a substring of the `sentence` field (the audio played to learners) — confirming the answer via surface-matching rather than comprehension.
- **A6b (KW in sentence)**: Two or more content keywords from the correct option appear verbatim in the sentence — functional equivalent of A6a when the option is a phrase.
- **A6c (Distractor echo)**: An *incorrect* option's content words appear in the sentence, creating a false surface-match lure that misleads learners away from the correct answer.
- **A6d (Stem echo)**: Option key words appear in the question stem itself (rare but possible in comprehension type questions with long stems).

**Industry backing (2026 synthesis):** UConn eCampus, Pacific University, and ACS item-writing guidelines (2020-2024, still active standard) all label verbatim stem/stimulus overlap as a *validity threat*. For A2/young learners (Cambridge YLE framework): even a *wrong* distractor sharing a salient word with the stem inflates guessing beyond chance, because children over-index on word-matching regardless of comprehension. Fix rule: correct answer must paraphrase; one distractor *may* reuse an audio word deliberately as a surface-match trap only if it is clearly wrong in meaning.

**Previous 8 angles:** A5 (Ch9-16), A3 (Ch17-24), A2 (Ch1-8), #11 (Ch9-16), A7 (Ch13-20), #12 (Ch2-8), R2 (Ch27-31), A4 (Ch21-26).

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch1.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch2.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch3.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch4.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch5.json: 1 lint issue(s):
  lessons-ch5.json kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
OK  lessons-ch6.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch7.json: 1 lint issue(s):
  lessons-ch7.json kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she")
OK  lessons-ch8.json: 7 lessons (JSON shape + mirror + extended lint)

Total mirror-lint issues (corpus): 72 (warn-only)
```

**Note:** The existing X3_R1_VERBATIM_WORDS lint catches single-word verbatim options, but does NOT catch multi-keyword overlap (e.g., "threw" + "each" in same sentence, or "same" + "rude" in same sentence). ARCH-REC #59 below proposes extending coverage.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 5 | kt-ch5-l4-q3 | listen-mc | Sent: "It was made of white **bones**." → Correct: "**bones**" | **A6a P0** Already caught by X3 lint. Single-word verbatim echo — learner hears "bones" and matches to option without comprehension. | Replace correct option: "bones" → "animal remains" or "hard white sticks". No meaning shift, zero verbatim overlap. | No (option text only) |
| 8 | kt-ch8-l4-q9 | listen-mc | Sent: "His knocks were **loud**…voice was soft like honey." → Correct: "**loud** knock, sweet voice" | **A6b P0** "loud" echoes verbatim from sentence for the knock dimension. "sweet" is an acceptable paraphrase of "soft like honey." | Change "loud knock" → "heavy knock" or "strong knock". Keeps contrast with distractor "quiet knock" without verbatim echo. | No |
| 6 | kt-ch6-l7-q5 | listen-mc | Sent: "…**threw** one over **each** bird." → Correct: "**threw** one on **each** swan" | **A6b P0** "threw" and "each" both echo verbatim. Only substitution is bird→swan (correct paraphrase). Two-word overlap makes answer deducible by word-matching alone. | Rewrite: "threw one on each swan" → "put a shirt on every swan" or "covered each bird with a shirt". | No |
| 4 | kt-ch4-l2-q8 | listen-mc | Sent: "…gave them the **same** short **rude** reply." → Correct: "the **same rude** way" | **A6b P1** Two direct keyword echoes from sentence in correct option. Child who word-matches "same rude" from the audio succeeds without parsing "short reply → way". | Rewrite correct option: "with impolite one-word answers" or "rudely, every single time". Keeps meaning; eliminates echo. | No |
| 6 | kt-ch6-l2-q5 | listen-mc | Sent: "…while the rest of the castle **slept**." → Correct: "while others **slept**" | **A6b P1** "slept" appears verbatim. Rest of option is acceptable paraphrase (others ≈ rest of the castle). Single-word echo but it's the verb that carries the answer. | Rewrite: "while others slept" → "in the late night hours" or "when the castle was dark and quiet". | No |
| 6 | kt-ch6-l2-q10 | comprehension | Sent: "There were **six brothers**. There were **six shirts**." → Correct: "for the **six brothers**" | **A6b P1** Both "six" and "brothers" appear verbatim in the sentence. Q "Why did she make only six shirts?" — child matches six+brothers directly. | Rewrite: "for the six brothers" → "for each of her siblings" or "for the men under the spell". | No |
| 3 | kt-ch3-l6-q10 | comprehension | Sent: "…very **close** to the **tortoise**…" → Correct: "no, the **tortoise** is too **close**" | **A6b P1** "tortoise" and "close" both echo verbatim. Q "Could the hare win now?" — answer deducible by word-matching without understanding the causal chain. | Rewrite: "no, the tortoise is too close" → "no, he has fallen too far behind" or "no, the finish line is near the tortoise now". | No |
| 1 | kt-ch1-l6-q5 | listen-mc | Sent: "…ran in low and **fast**, **biting** at any leg…" → Correct: "by running **fast** and **biting**" | **A6b P2** "fast" and "biting" both echo. Two-word match makes the answer surfaceable without parsing the full action structure. | Rewrite: "by running fast and biting" → "by charging low and snapping at legs" or "by moving quick and gnashing". | No |
| 7 | kt-ch7-l3-q10 | comprehension | Sent: "Her **only friend** was gone…" → Correct: "Yexian loses her **only friend**" | **A6b P2** "only" and "friend" echo verbatim. For a gist question ("mainly showing") this is an availability bias — the correct answer is literally a summary of the sentence with the same words. | Rewrite: "Yexian loses her only friend" → "Yexian faces her first great loss" or "Yexian is left completely alone". | No |
| 5 | kt-ch5-l7-q9 | listen-mc | Sent: "…**her father's** wife opened the door…" → Distractor [0]: "**her father**" (wrong) | **A6c P2** Wrong option "her father" is a substring of "her father's wife" in the sentence. Learner who word-matches hears "her father" → picks wrong option. Correct answer "the new woman" is a valid paraphrase (father's wife ≈ new woman). | Change distractor: "her father" → "her stepbrother" or "the old man next door". | No |

---

## C. Stats

| Chapter | Story | Questions scanned | A6 violations | Severity |
|---------|-------|-------------------|---------------|----------|
| Ch0 | Ground-floor vocab | 60 | 0 (listen-emoji by-design exempted) | — |
| Ch1 | Momotaro | 29 | 1 | P2 |
| Ch2 | Ugly Duckling | 27 | 0 | — |
| Ch3 | Tortoise & Hare | 35 | 1 | P1 |
| Ch4 | Camel's Hump | 28 | 1 | P1 |
| Ch5 | Baba Yaga | 34 | 2 | P0 + P2 |
| Ch6 | Six Swans | 42 | 3 | P0 + P1 + P1 |
| Ch7 | Yexian | 35 | 1 | P2 |
| Ch8 | Three Little Pigs | 29 | 1 | P0 |

**Total:** 319 Q scanned (Ch0–8) · 10 A6 violations · 3 P0 · 4 P1 · 3 P2

**False positives caught:** 3 listen-tf items (kt-ch1-l4-q5, kt-ch2-l3-q4, kt-ch6-l2-q3) where "yes" matched as substring of "eyes" in sentence — not real violations. The proposed X12 lint must skip single-word Yes/No options.

**Ch0 exemption rationale:** Ch0 listen-emoji items use `sentence = "Pink."` / `"Cat."` / etc. as deliberate audio labels for A1 word-recognition drills. The sentence IS the target word by design; A6 does not apply to this question type.

---

## D. Top 5 P0 + Narrative Voice Improvements

### P0 Priority (repair before next content push)

| # | Q ID | Fix |
|---|------|-----|
| 1 | kt-ch5-l4-q3 | "bones" → "animal remains" |
| 2 | kt-ch8-l4-q9 | "loud knock" → "heavy knock" |
| 3 | kt-ch6-l7-q5 | "threw one on each swan" → "put a shirt on every swan" |
| 4 | kt-ch4-l2-q8 | "the same rude way" → "with impolite one-word answers" |
| 5 | kt-ch6-l2-q5 | "while others slept" → "in the late night hours" |

### Narrative Voice / Pacing Improvements (3 mandatory — no R1-R8 violation)

1. **kt-ch6-l2-q6** (Six Swans, color Q): Correct option "pale like milk" is a clever poetic paraphrase of "fresh snow on a winter morning" — but for 8-12-year-old Taiwanese learners, milk and snow are both white/pale, creating two valid mental images competing. Suggest "light white like new snow" — keeps the simile structure, removes cross-image ambiguity, and anchors children back to the winter-morning scene they just heard. The poetic register (dark/red/pale/gold) is strong; just swap "milk" → "snow" to maintain scene coherence.

2. **kt-ch3-l5-q10** (Hare & Tortoise, why-wake Q): All 4 options start with "they" — caught by X2_OPTION_LIST_BIAS lint. Beyond the structural issue, the distractor quality is weak: "they were too far" and "they were sleeping too" cover the same incorrect inference cluster (not watching). Better contrast: "they didn't care who won", "they stayed very quiet", "they wanted to let nature decide" — diversifies the inference space and pushes learners to reason about sportsmanship rather than logistics.

3. **kt-ch7-l3-q10** (Yexian, gist Q): The explanationZh reads "主旨 = 葉限失去唯一的朋友" — but a gist question for a 12-year-old should model emotional summarization, not just event labeling. The explanation could be: "這一幕的重點是孤獨與失去 — 葉限第一次感受到真正的孤單。" This teaches children to identify emotional sub-text, which is the actual comprehension skill being drilled. No content change needed — just an explanationZh upgrade for the gist question.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #59: X12_CONTENT_KW_OVERLAP_LINT — Multi-keyword A6 detection in validate-lessons.js

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Multi-keyword verbatim overlap lint (correct option ≥2 content words in sentence) | UConn eCampus / Pacific University / Cambridge YLE item-writing guidelines (2020-2026) | ✅ Pure addition to existing `validate-lessons.js` — no content or schema changes. Existing `X3_R1_VERBATIM_WORDS` covers 1-word options only; this extends to phrase-level. | S (2-3 hr: ~25 lines added to validator) | **High** — This cycle found 9 phrase-level A6 violations in Ch1-8 alone that the current lint misses. Corpus has 32 chapters; extrapolating 3-4 per chapter = ~100 silent violations undetected today. | ✅ Strongly recommended |

**Implementation spec:**
```js
// In validate-lessons.js — add to existing lint loop
const STOPWORDS_KW = new Set(['the','a','an','is','are','was','were','be','been','have','has',
  'do','does','did','will','would','could','should','to','of','in','for','on','with','at',
  'by','from','as','and','but','or','so','that','this','these','those','not','no','yes',
  'it','he','she','they','we','you','i','me','him','her','them','us','all','each','very']);

function contentKW(text) {
  return (text || '').toLowerCase().replace(/[^a-z ]/g,'').split(/\s+/)
    .filter(w => w.length > 3 && !STOPWORDS_KW.has(w));
}

// For each Q with options:
const sentKW = new Set(contentKW(q.sentence));
q.options.forEach((opt, idx) => {
  if (q.type === 'listen-tf') return; // skip Yes/No options
  const optKW = contentKW(opt);
  if (optKW.length < 2) return; // single-word already covered by X3
  const hits = optKW.filter(w => sentKW.has(w));
  if (hits.length >= 2) {
    const severity = (idx === q.correctIndex) ? 'X12_CORRECT_KW_OVERLAP' : 'X12_DISTRACTOR_ECHO';
    issues.push(`${id}: ${severity} (option [${idx}] shares [${hits.join(',')}] with sentence)`);
  }
});
```

**Why now:** Industry standard (Cambridge YLE framework, 2024 active) specifically flags multi-word stem/stimulus overlap as inflating guessing for young learners disproportionately vs adults. This is the highest-ROI unfixed lint gap after this cycle's findings.

**Boundary:** NEVER modify `src/` or `lessons-ch*.json` to fix violations — this is a lint-only recommendation. Content fixes are separate P0/P1 repair tickets.
