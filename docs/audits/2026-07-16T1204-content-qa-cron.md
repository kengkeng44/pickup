# Content QA — 2026-07-16 12:04 UTC

**Today's angle:** A7 — Content-Word Repetition (correct answer echoes stimulus content words verbatim rather than paraphrasing)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Pigs)
**Chapters scanned:** 8 chapters (Ch1–Ch8), ~56 lessons, ~280 MC-type questions

> **Angle choice rationale:** Recent 8-cycle rotation: A3 semantic-leak (Ch1-8) → R1 paraphrase (Ch9-16) → A4 mirror-patterns (Ch17-24) → A6 option-in-question (Ch25-32) → #10 audio-sync (Ch25-32) → #11 optionsZh quality (Ch17-24) → A5 cultural-reference (Ch9-16). **A7 content-word repetition** absent from all 8 cycles. Ch1–8 has the highest density of `comprehension` type questions (Momotaro arc + three classic fables) — prime territory for verbatim-echo answers where the correct option lifts 2–3 content words directly from the stimulus sentence, enabling "cut-and-paste" recall instead of genuine comprehension.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 5 lint issue(s)
  X48_NGRAM_VERBATIM_CORRECT: kt-ch1-l3-x1 (3-gram echo — 'tiny crying baby' ⊆ sentence)
  X49_STIMULUS_REUSE: kt-ch1-l3 / kt-ch1-l5 / kt-ch1-l6 (comprehension+listen-tf same sentence)
WARN lessons-ch7.json: 10 lint issue(s)
  X49_STIMULUS_REUSE ×7, X57_ANTONYM_PAIR_MIRROR ×1, X48_NGRAM_VERBATIM ×1, X49B ×1
WARN lessons-ch8.json: 9 lint issue(s)
  X48_NGRAM_VERBATIM_CORRECT ×2, X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×4, X57 ×1
Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
No new schema-break issues detected this cycle.
```

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 1 | kt-ch1-l3-x1 | comprehension | "Inside the peach was a **tiny baby** boy, **crying** softly." | **P0 A7** correct `'one tiny crying baby'` — 3 content words (tiny/baby/crying) verbatim echoed | → `'a small child in a peach'` | No |
| 1 | kt-ch1-l5-x5 | comprehension | "…a **thick mist** rolled in around the **boat**." | **P0 A7** correct `'thick mist surrounded the boat'` — 3 words (thick/mist/boat) echoed | → `'a grey fog wrapped the vessel'` | No |
| 1 | kt-ch1-l6-x1 | comprehension | "…it was **wide open**." | P1 A7 correct `'the door stood wide open with no guards'` — 2 words | → `'the entrance was unguarded and ajar'` | No |
| 1 | kt-ch1-l5-x1 | comprehension | "A monkey jumped down from a tall **tree**" | P1 A7 correct `'leaping down from high in a tree'` — 2 words (down/tree) | → `'dropping from the branches above'` | No |
| 1 | kt-ch1-l6-q5 | listen-mc | "…**biting** at any leg that came close" & "ran … **fast**" | P1 A7 correct `'by running fast and biting'` — 2 words (biting/fast) | → `'by moving quickly and snapping at legs'` | Yes (q5 TTS) |
| 2 | kt-ch2-l5-x1 | comprehension | "…**old woman** kept him in her **warm kitchen**" | **P0 A7** correct `'in an old woman's warm kitchen'` — 4 words (old/woman/warm/kitchen) echoed | → `'in a stranger's cosy home'` | No |
| 2 | kt-ch2-l7-x1 | comprehension | "…green **leaves** opened, and **warm sun** shone… **ice** melted" | **P0 A7** correct `'leaves grow and ice melts under warm sun'` — 4 words | → `'plants returned and the frost gave way to sunshine'` | No |
| 2 | kt-ch2-l3-x4 | comprehension | "**mother duck** stood between him…" | P1 A7 correct `'mother duck began to step back'` — 2 words (duck/mother) | → `'his protector turned away from him'` | No |
| 3 | kt-ch3-l4-x8 | comprehension | "The **tortoise** came to the sleeping **hare**" | P1 A7 correct `'the tortoise stayed focused while the hare slept'` — 2 words | → `'the slower animal pressed on while the other rested'` | No |
| 3 | kt-ch3-l6-q10 | comprehension | "…big tree was very close to the **tortoise**" | P1 A7 correct `'no, the tortoise is too close'` — 2 words (close/tortoise) | → `'the slow runner is nearly at the finish'` | No |
| 4 | kt-ch4-l5-x10 | comprehension | "…the **Djinn** began to make a great **Magic**… **slowly**" | **P0 A7** correct `'the Djinn begins making magic slowly'` — 3 words (djinn/magic/slowly) | → `'the powerful being started weaving a spell with care'` | No |
| 4 | kt-ch4-l5-q8 | listen-mc | "…stick with the **same** lazy **reply**…" | P1 A7 correct `'gave the same rude reply'` — 2 words (same/reply) | → `'repeated his lazy excuse once more'` | Yes (q8 TTS) |
| 5 | kt-ch5-l3-x8 | comprehension | "White for **morning**… black for **night**" | P1 A7 correct `'morning, noon and night'` — 2 words (morning/night) | → `'dawn, midday, and darkness'` | No |
| 5 | kt-ch5-l4-x2 | comprehension | "…made of **white bones**." | P1 A7 correct `'built from white bones'` — 2 words | → `'constructed of pale skeletal pieces'` | No |
| 5 | kt-ch5-l4-q9 | listen-mc | "…**door** of the house had been facing away from **Vasilisa**" | P1 A7 correct `'showing its door to Vasilisa'` — 2 words (door/vasilisa) | → `'turning its entrance toward the girl'` | Yes (q9 TTS) |
| 5 | kt-ch5-l5-x2 | comprehension | "…house was **warm**. The **fire** was high." | P1 A7 correct `'warm, fire blazing'` — 2 words | → `'heated and bright inside'` | No |
| 5 | kt-ch5-l5-x4 | comprehension | "Her **nose** was **long** like a piece of iron." | P1 A7 correct `'old with a long nose'` — 2 words | → `'a bent iron-like beak on her face'` | No |
| 5 | kt-ch5-l6-x4 | comprehension | "…**rice** mixed with black **sand**." | P1 A7 correct `'sort rice from sand'` — 2 words | → `'separate the grains from grit'` | No |
| 5 | kt-ch5-l7-x4 | comprehension | "…a skull with **glowing eyes**…" | P1 A7 correct `'had glowing eyes'` — 2 words | → `'lit up with strange inner light'` | No |
| 6 | kt-ch6-l4-x4 | comprehension | "…sew six **shirts** from a **sharp** white flower." | P1 A7 correct `'make six shirts from sharp flowers'` — 2 words (shirts/sharp) | → `'weave garments from stinging blossoms'` | No |
| 6 | kt-ch6-l6-x2 | comprehension | "The **bride** had a small **baby**…" | P1 A7 correct `'a baby was born to the bride'` — 2 words | → `'a child arrived for the new wife'` | No |
| 7 | kt-ch7-l3-q10 | comprehension | "**Yexian** sat… her **only friend** was gone" | **P0 A7** correct `'Yexian loses her only friend'` — 3 words (yexian/only/friend) | → `'the girl is left completely alone'` | No |
| 7 | kt-ch7-l3-x5 | comprehension | "the family **ate** fish soup. **Yexian** had no idea." | P1 A7 correct `'Yexian ate her friend without knowing'` — 2 words (ate/yexian) | → `'she unknowingly shared in the meal'` | No |
| 8 | kt-ch8-l3-q3 | listen-mc | "…felt **firmer** than **straw**." | P1 A7 correct `'they were firmer than straw'` — 2 words (X48 already flagged, A7 compound) | → `'they held together better than loose grass'` | Yes |
| 8 | kt-ch8-l3-q9 | listen-mc | "…a **soft** sound, slow and **heavy**." | P1 A7 correct `'soft heavy steps'` — 2 words | → `'a gentle but weighty tread'` | Yes |
| 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were **loud**, and his **voice** was soft…" | P1 A7 correct `'loud knock, sweet voice'` — 2 words (loud/voice) | → `'a thundering rap but honeyed words'` | Yes |
| 8 | kt-ch8-l6-x5 | comprehension | "They raced to the **brick house**." | P1 A7 correct `'the third pig's brick house'` — 2 words | → `'the solid shelter of the last sibling'` | No |
| 8 | kt-ch8-l7-q7 | listen-mc | "…built a **hot fire**…" | P1 A7 correct `'made a hot fire'` — 2 words | → `'set a blazing trap inside'` | Yes |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Questions scanned (MC types) | ~280 |
| P0 violations (3+ overlap words) | 6 |
| P1 violations (2 overlap words) | 27 |
| A7b option-internal repeat | 48 |
| R5 cross-Q Jaccard ≥ 0.4 | 35 |
| Chapters with ≥1 P0 violation | Ch1, Ch2, Ch4, Ch7 (4 / 8) |
| Audio regen required (P1+) | 7 listen-mc items |

**Root cause:** The `comprehension` question type (which dominates Ch1-8 story chapters) was authored with a focus on correct factual recall rather than paraphrase discipline. The `listen-mc` questions that overlap are mostly in Ch4/Ch5/Ch8 where the correct option was authored before the R1 lint gate was established.

---

## D. Top 5 P0 (ranked by severity + chapter density)

1. **P0 — kt-ch2-l5-x1 / kt-ch2-l7-x1** (Ch2 Ugly Duckling): Two consecutive P0 violations in the resolution arc. Correct answers lift 4 content words each directly from the stimulus. Ch2 is played by a large fraction of active players — high exposure.

2. **P0 — kt-ch1-l3-x1** (Ch1 Momotaro birth): First `comprehension` question in the game. Players calibrate their answer strategy here. A verbatim-echo P0 on Q1 teaches the wrong habit: "scan for matching words."

3. **P0 — kt-ch1-l5-x5** (Ch1 Demon Island approach): Atmospheric scene pivot. "thick mist surrounded the boat" copies 3 of 3 distinguishing words from sentence. No paraphrase challenge at all.

4. **P0 — kt-ch4-l5-x10** (Ch4 Camel / Djinn): `'the Djinn begins making magic slowly'` is a near-verbatim restatement. The comprehension value of this Q collapses to zero.

5. **P0 — kt-ch7-l3-q10** (Ch7 Yexian): Emotionally pivotal moment (loss of fish-friend). Correct answer `'Yexian loses her only friend'` echoes `yexian`, `only`, `friend` — all three character-level words from a 2-sentence stimulus. Should require inference-level language.

---

## E. Narrative Voice / Pacing improvements (zero-violation baseline, always-3 rule)

Even ignoring A7 flag count, three pacing/voice improvements for Ch1-8:

1. **kt-ch1-l4 (dumplings arc):** 4 consecutive detail questions about the dumpling bag (q1-q4). R6 sub-skill variety violated — no inference Q among the first 4. Recommend inserting 1 inference Q: *"What does sharing dumplings with new friends tell us about Momotaro?"*

2. **kt-ch5-l5 (Baba Yaga house interior):** Three straight `comprehension` Qs all ask "what is X like?" (warm/fire/nose). Monotone question shape. Vary to include one function/gist Q: *"Why does the narrator describe the house before showing Baba Yaga?"*

3. **kt-ch8-l7 (Three Pigs ending):** The final pot-trap scene has two adjacent listen-mc questions (q7, q8) where the correct answer uses the exact verb from the stimulus (`fire`, `climb`). Good opportunity to upgrade Q8 to an inference type: *"What does the wolf's plan to use the chimney tell us about him?"*

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #164 — X164_A7_CW_ECHO_GATE: content-word echo lint gate for `comprehension` + `listen-mc` correct answers

**Industry source:** Onestopenglish item writing guidelines (onestopenglish.com): *"Questions shouldn't contain the exact words used in the text. If the question repeats part of a sentence from the text, students will be able to answer it in 'cut-and-paste' style without needing to understand the text."* IELTS Advanced Distractor Analysis (ieltsmumbai.com) confirms same principle for MC listening: distractors must test inference, not verbatim scan.

**Problem found this cycle:** 6 P0 + 27 P1 questions in Ch1-8 where the correct answer echoes 2–4 content words from the stimulus sentence. A2-level children (8-12 target audience) who do not understand the sentence can still select the correct answer by pattern-matching shared words. This defeats the comprehension objective and inflates measured accuracy.

**Pickup architecture fit:**
- ✅ All `comprehension` + `listen-mc` questions already have `sentence` (or `s`) + `options` (or `o`) + `correctIndex` (or `c`) in the lesson JSON — all fields needed for the lint are present
- ✅ `validate-lessons.js` already runs per-file and has X48 (3-gram verbatim) — X164 is a complementary single-word-level check
- ✅ No src/ changes required — lint only

**Proposed lint rule (add to `tools/validate-lessons.js`):**

```js
// X164: A7 content-word echo — correct answer echoes ≥2 content words from stimulus
const STOP_X164 = new Set([/* same stop-list as X48 */]);
function contentWords(str) {
  return (str.toLowerCase().match(/[a-z]+/g) || [])
    .filter(w => !STOP_X164.has(w) && w.length > 2);
}
for (const q of mcQuestions) {
  const sentCW = new Set(contentWords(q.sentence || q.s || ''));
  const correctCW = new Set(contentWords((q.options || q.o || [])[q.correctIndex ?? q.c ?? 0] || ''));
  const overlap = [...sentCW].filter(w => correctCW.has(w));
  if (overlap.length >= 2) {
    warn(lessonId, qid, `X164_A7_CW_ECHO (${overlap.join('/')}) — correct answer repeats ${overlap.length} content words from stimulus`);
  }
}
```

**Threshold:** `>= 2` content-word overlap triggers warning; `>= 3` triggers error (P0). Set `CW_ECHO_STRICT=1` to fail build.

**Rollout:** warn-only first (same pattern as X49/X57). After Ch1-8 P0 fixes are applied, escalate P0 threshold to error gate.

**Effort:** ~1 hr (add lint function + integrate into validate-lessons.js + run on all chapters).
**ROI:** Closes the "cut-and-paste" comprehension loophole for the 8-12 children audience. Directly aligns with Onestopenglish + IELTS item writing standards. Prevents regression as Ch9-32 content expands.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X164: A7 Content-Word Echo lint gate | Onestopenglish item-writing guidelines; IELTS distractor analysis | ✅ JSON fields already present; validate-lessons.js already has sibling X48 rule | 1 hr | High — closes "cut-and-paste" loophole for 8-12 children audience, prevents accuracy inflation | ✅ 實作 |
| IELTS-style mid-sentence distractor self-correction | IELTS Mumbai distractor analysis 2026 | 🟡 Audio-only pattern — requires TTS re-generation of audio with embedded self-correction; not feasible for static MP3 batch | 20+ hr | Low for static app | ❌ 不適合 |
| Duolingo DET adaptive item selection (IRT-based) | Duolingo English Test Handbook 2025 | 🟡 Need server-side IRT model; Pickup is localStorage-only static app | 40+ hr | Future phase when backend added | 📌 Phase 3 |

---

*Sources:*
- [How to write reading and listening activities — Onestopenglish](https://www.onestopenglish.com/how-to-write-reading-and-listening-activities/552504.article)
- [IELTS Listening: Advanced Distractor Analysis — IELTSMumbai](https://ieltsmumbai.com/blog/ielts-listening-advanced-distractor-analysis-in-multi-choice-listening-tasks)
- [Duolingo English Test Handbook (2025 PDF)](https://englishtest-static.duolingo.com/media/resources/GPN%20The%20DET%20Handbook.pdf)
