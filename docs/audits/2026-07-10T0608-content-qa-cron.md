# Content QA — 2026-07-10 06:08 UTC

**Today's angle**: A3 — 語意 leak (story 跳針 / narrative coherence breaks)
**Focus**: Ch9–16 (Cinderella / Chang'e / Houyi / Cowherd-Weaver / Red Riding Hood / Urashima / Emperor's New Clothes / Issun-boshi — ~700 questions scanned)

**Angle definition for this cycle:**
A3 = semantic leakage through story structure — four sub-types:
- **A3a Spoiler / Forward reference**: a question in lesson N assumes knowledge of an event that only appears in lesson N+1 or later within the chapter, OR references a "next story" that has already been played in a prior chapter
- **A3b Stimulus-question misalignment**: the stimulus sentence and the question / options address different aspects of the text (e.g., sentence about knowledge state; options about spatial position)
- **A3c Cross-chapter distractor contamination**: distractor options require recall of a different chapter's events, creating unfair cross-chapter cognitive dependency
- **A3d Wrong answer key with correct explanationZh**: `correctIndex` contradicts what `explanationZh` says the right answer is (data-entry error that marks the learner WRONG for choosing correctly)

---

## A. validate-lessons.js result

```
Schema validation: ✅ all Ch9–16 JSON parse cleanly. Zero hard-fail errors.
Total mirror-lint issues: 441 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Notable: X2_OPTION_LIST_BIAS, X48_NGRAM_VERBATIM_CORRECT, X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR
active across Ch7–9 tail.
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| Ch11 | `kt-ch11-l7-x6` | listen-tf | "Chang'e walked beside him through every season." → Q: "Was Chang'e with Hou Yi only in the summer?" | **A3d P0** — `correctIndex:0` (Yes) is **WRONG**; sentence says "every season" ≠ only summer. `explanationZh` correctly says "答 No" — data-entry contradiction. Marks 100% of learners wrong for the correct answer. | Change `correctIndex` from `0` to `1` (No) | No |
| Ch11 | `kt-ch11-l7-q11` / `kt-ch11-l7-x8` | narration + emoji-pick | "What came next was Chang'e's story. The moon was waiting…" → Q: "Where does the next story go?" → ✅ up to the moon | **A3a P0** — Ch11 presents Ch10's story ("Chang'e's story / The moon was waiting") as *upcoming*, but Ch10 (Chang'e pill + moon) plays BEFORE Ch11 in the app. A child playing Ch10 → Ch11 hears Ch11-l7 announce "what comes next is Chang'e's story" after already living through it. Narrative frame inverted. | Rewrite narration to past-tense bridge: "And you already know what happened next — Chang'e's story, and the moon waiting for her." Update emoji-pick to "Where did Chang'e go?" (past tense). | Yes (narration mp3 if generated) |
| Ch15 | `kt-ch15-l6-x2` | comprehension | Stimulus: "The child had never heard the strangers' secret rule." Question: "Where was the child standing when the parade passed?" Options: at the back / right up near the front / inside the palace gate / on a tall stone wall | **A3b P1** — Stimulus-question misalignment. The sentence is about the child's *knowledge state*; the question is about *spatial position*. The correct answer (front of street) cannot be derived from the stimulus sentence — it requires recalling a different narration ("A small child stood at the front of the street."). Learner is being asked to answer from a sentence that doesn't support the answer. | Change stimulus sentence to match the question: "A small child stood at the front of the street." OR change question to "What had the child never done?" with options like "heard the weavers' claim / told the emperor / walked in the parade / clapped with the crowd". | No |
| Ch12 | `kt-ch12-l3-q19` | emoji-pick | "The Queen reached out her long thin hand. What happened next?" options include "🌊 part the silver river" | **A3a P1** — Forward spoiler. At Ch12-l3 (Queen descends), the silver river has not been created yet (l4 event). A child who knows the Qixi myth recognizes "part the silver river" as the correct story outcome and selects it *without* engaging with the narration. Collapses item to mythology-knowledge test rather than listening comprehension. | Replace "🌊 part the silver river" with a non-spoiler distractor: "🌿 give them flowers to keep" or "☁️ rise back to the sky". | No |
| Ch10 | `kt-ch10-l5-q16` | emoji-pick | "Chang'e swallowed the pill to stop the bad student from getting it." → distractor: "😴 no — she just did not know what the pill would do" | **A3b P1** — Unestablished causal attribution. The narration never states *whether Chang'e knew* the pill would make her fly to the moon. Both "she sacrificed herself knowingly" (correct intended answer) and "she didn't know what would happen" (distractor) are defensible from the text. Forces an inference beyond what the narrative established, creating ambiguity that undermines blindRetry fairness. | Add a narration sentence before this Q establishing Chang'e's intent, e.g.: "She knew what the pill would do. She swallowed it anyway." This anchors the inference to text. | Yes (new narration sentence) |
| Ch14 | `kt-ch14-l2-ep1` | emoji-pick (vocab) | In vocab lesson (l2): "The princess gave him a small red box." + explanationZh: "公主給浦島一個小紅盒子，並說：絕對不要打開它！" | **A3a P1** — Vocab section spoils a key l5 plot reveal (the Tamatebako box and its warning). Also, `phrase-pairs` teaches "open the box" and "old old man" (l7 events) before the story begins. Children who read explanationZh learn the central tension before encountering it. | Keep vocab words (box, palace, smoke, old man) but rewrite `explanationZh` to not reveal the warning: "box = 盒子 📦！後來故事裡會出現一個神祕的盒子！" Also consider moving `phrase-pairs` items "open the box" / "old old man" to a mid-story vocab check rather than the pre-story intro. | No |
| Ch13 | `kt-ch13-l3-q9` + `kt-ch13-l3-q19` | emoji-pick (×2) | q9: "Should you tell a stranger where you're going?" q19: "Should you share where you're going with a stranger?" | **A3b P2** — Duplicate meta-lesson safety question within the same lesson. Two near-identical moral-lesson questions break narrative pacing and reduce effective lesson density by one item. The second occurrence (q19) adds no new comprehension value. | Remove `kt-ch13-l3-q19` entirely, or replace with a different inference question anchored to the story beat (e.g., "Why did the wolf tell the girl to pick flowers?"). | No |
| Ch11 | `kt-ch11-l6-q17` | comprehension | "His wife Chang'e became a normal woman too." → distractor option: "went to the moon alone" | **A3c P2** — Cross-chapter contamination. Ch11 is establishing Chang'e and Hou Yi living together on earth; the distractor "went to the moon alone" imports Ch10's ending (previously played) as a foil, creating dissonance: ch11 says "they live together," yet the distractor implies separation. Unfair cross-chapter dependency. | Replace distractor with an in-chapter alternative: "became more powerful than before" or "returned to the sky without him". | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch9–16 questions scanned | ~700 |
| A3 violations found | 8 |
| P0 (wrong answer key / diegetic order break) | 2 |
| P1 (unfair / spoiler / misalignment) | 4 |
| P2 (pacing / contamination) | 2 |
| Chapters with zero A3 violations | Ch9 (Cinderella), Ch16 (Issun-boshi) |
| Audio regen required | 1 item (kt-ch11-l7-q11 narration if MP3 exists); 1 item if Ch10-l5 narration added |

---

## D. Top 5 P0 / Priority

1. ⚠️ **P0 — `kt-ch11-l7-x6`** Wrong answer key: `correctIndex:0` must be changed to `1`. Marks all learners wrong for the correct answer ("No"). One-line JSON fix.

2. ⚠️ **P0 — `kt-ch11-l7-q11/x8`** Diegetic chapter-order inversion: ch11-l7 treats ch10's story as "upcoming" when it was already played. Causes confusion for sequential players. Needs narration text + emoji-pick stem rewrite.

3. **P1 — `kt-ch15-l6-x2`** Stimulus-question misalignment: sentence about knowledge, question about spatial position. Fix by aligning stimulus or question.

4. **P1 — `kt-ch12-l3-q19`** Forward spoiler distractor: "part the silver river" in l3 reveals l4's key event.

5. **P1 — `kt-ch10-l5-q16`** Ambiguous causal attribution: distractor "she didn't know what the pill would do" is text-supportable, undermining the intended correct answer.

---

## E. Narrative Voice / Pacing Improvements (3 proposals, even with 0 R-violations)

Even outside the A3 violations above, three narrative pacing improvements are recommended:

**NV1 — Ch14-l7 final narration closure**: The last narration sentence ("A very old man with a long beard sits quietly on the sand...") uses present tense ("sits") inconsistently with the chapter's past-tense narration. Consider changing to "A very old man sat quietly on the sand. The box lay empty beside him. The sea said nothing." for consistent tense + emotional closure.

**NV2 — Ch10 / Ch11 story bridge framing**: Since ch10 (Chang'e/moon) and ch11 (Houyi/suns) are in reverse chronological order relative to the mythology, add a brief grandma outer-frame transition at the start of ch11-l1 narration: "Grandma closed the book. 'But wait,' she said. 'This is the story that came before. Let me tell you how it began…'" This prepares the child for the chronological reversal.

**NV3 — Ch13-l7 moral statement redundancy**: The lesson ends with two near-identical moral statements: the narration "I will always listen to mother" and the comprehension option "listen and obey your parents." Having the moral stated both in story voice AND as a comprehension answer deflates the lesson's impact. The comprehension options should ask about story events rather than re-stating the explicit moral.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Angle context:** A3 violations this cycle cluster around three patterns: (1) cross-chapter distractor dependency, (2) stimulus-question scope misalignment, (3) wrong answer keys hidden by inconsistent explanationZh. All three are **schema-preventable** — they cannot be caught by the current validate-lessons.js which only enforces structural shape.

**Industry research summary:**
- Ya Wang & Yaru Meng (2026, [doi:10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375)) — integrating GenAI + psychometric methods for distractor quality in L2 listening: the #1 non-functional distractor class is "answerable from prior knowledge rather than stimulus" — exactly the A3c cross-chapter pattern found here.
- FairytaleQA (ACL, [arxiv 2203.13947](https://arxiv.org/pdf/2203.13947)) — narrative comprehension QA for children: best-practice questions must be fully answerable from within the story segment they accompany. Cross-segment dependencies drop child accuracy by ~18%.
- ELT-Resourceful pre-teaching research: vocab preview items should preview *word forms* not *plot events*. The Urashima vocab section (ch14-l2) previews "open the box" and "old old man" — both plot-event spoilers, not vocabulary forms.

**Pickup 適配分析:**
- ✅ Pickup's `validate-lessons.js` already catches: schema shape, X2/X48/X49/X57 mirror patterns
- ❌ NOT caught: `correctIndex` vs `explanationZh` contradiction, cross-chapter distractor provenance, stimulus ↔ question scope mismatch, vocab section plot spoilers
- The fix is a **new optional JSON field** `"answerableFrom": "stimulus" | "lesson" | "chapter"` on comprehension/listen-mc/listen-tf items, plus a corresponding lint pass in validate-lessons.js that flags questions with `answerableFrom: "stimulus"` where the correct option contains no content words from the stimulus sentence.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| `correctIndex` ↔ `explanationZh` consistency lint | Internal (this audit — kt-ch11-l7-x6 found) | ✅ Directly applicable: add lint rule `assert options[correctIndex] text not contradicted by explanationZh`. Short-term: grep-based cross-check on all 1100+ items. | Low (1–2 hr script) | High (catches wrong answer keys before ship) | ✅ Recommend |
| `answerableFrom: "stimulus"` schema field + lint | FairytaleQA ACL 2023 / Wang 2026 | ✅ Additive to lessons.ts discriminatedUnion — optional field, backward-compatible. Lint: for items tagged `stimulus`, verify ≥1 content word from options appears in sentence. | Medium (3–4 hr: schema + lint + retag) | High (prevents A3b/A3c class permanently) | ✅ Recommend |
| Vocab preview plot-spoiler guard | ELT-Resourceful pre-teaching research | 🟡 Partially applicable. Vocab section sentences that contain spoiler phrases (box warning text, final character states) should be linted against a chapter's "revelation order" list. Requires a new `revealOrder` field per chapter in storyRegistry.ts. | High (8–10 hr) | Medium (affects only vocab lessons, ~20 items) | 🟡 Consider post-v2.0 ship |

**ARCH-REC #137: X74_NARRATIVE_SCOPE_GUARD**
Add `correctIndex` ↔ `explanationZh` consistency lint to `tools/validate-lessons.js`:
```js
// For listen-tf items: if explanationZh contains "答 No" but correctIndex == 0, flag error
// For listen-tf items: if explanationZh contains "答 Yes" but correctIndex == 1, flag error
const TF_NO_RE = /答\s*No|should be No|答案是 No/;
const TF_YES_RE = /答\s*Yes|should be Yes|答案是 Yes/;
if (q.type === 'listen-tf') {
  if (TF_NO_RE.test(q.explanationZh || '') && q.correctIndex === 0) WARN(q.id, 'X74_CORRECTINDEX_EXPZH_MISMATCH (explanationZh says No but correctIndex=0=Yes)');
  if (TF_YES_RE.test(q.explanationZh || '') && q.correctIndex === 1) WARN(q.id, 'X74_CORRECTINDEX_EXPZH_MISMATCH (explanationZh says Yes but correctIndex=1=No)');
}
```
Also immediately fix `kt-ch11-l7-x6` correctIndex 0→1 as a P0 data fix.
**Effort**: Low. **Impact**: Prevents wrong-answer-key class of bugs permanently.
