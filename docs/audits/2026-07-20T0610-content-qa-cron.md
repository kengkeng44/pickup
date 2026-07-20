# Content QA — 2026-07-20 06:10 UTC

**Today's angle:** A3 — 語意 leak (story 跳針) / listen-tf stimulus integrity
**Focus:** Ch25–32 (Yu Gong / Archimedes / Journey to the West / Three Kingdoms / Odyssey / Heracles / Robin Hood / Merlin+Ch32)
**Scored questions analysed:** 664 total scored Qs across Ch25–31; Ch32 scanned separately (52 Qs, 10 narrations)
**Academic backing:**
- itemwriting.co "True-False Item Writing" (2025): *"Avoid quoting verbatim from source material — it rewards recognition, not comprehension, and creates false-item paradox when the answer key is inverted."*
- Hawaii.edu TF Item Guide: A FALSE item must introduce a **specific modified false detail**; copying the verbatim true sentence and marking it "No" is a construction error, not a pedagogical strategy.
- Buck 2001 §6 / Alderson 2000: In listening T/F, the false stimulus must paraphrase or modify the audio content to test actual listening comprehension, not passive memory of exact wording heard seconds before.
- PMC 2025 (Roediger/Karpicke replication): True/False practice tests lose retention benefit when items are internally inconsistent — a child who encounters the same sentence marked True in one question and False in another builds *competing memory traces* that cancel each other out.

---

## A. validate-lessons.js result

```
WARN Ch25–Ch32: known mirror-lint issues (X2/X49/X57 patterns)
Total mirror-lint issues: 440 (warn-only)
Build gate: PASS (tsc + vite)
No schema errors.
```

---

## B. Violation Table

> Legend: **SAME-SENT** = identical sentence, opposite correct answers in same lesson | **VERB-NO** = verbatim narration sentence marked No (False) | **FALSE-YES** = false statement (contradicted by narration) marked Yes (True)

| Ch | Q ID | type | Sentence (snippet) | Violation | 修法 | audio regen? |
|----|------|------|-------------------|-----------|------|--------------|
| 25 | kt-ch25-l5-q4 vs x6/x8 | listen-tf | "Yu Gong put down his basket and stood up tall." | **SAME-SENT** q4=Yes, x6=No, x8=No (3 instances of same sentence — two wrong) | x6 and x8: change sentence to a false variant OR fix correctIndex to Yes | No |
| 25 | kt-ch25-l6-x6 vs x8 | listen-tf | "The mountains cannot grow bigger. But my family goes on forever." | **SAME-SENT** x6=No, x8=Yes (identical sentence, opposite answers) | Delete duplicate; keep x8=Yes; rewrite x6 as modified false statement | No |
| 25 | kt-ch25-l6-x3 | listen-tf | "Yu Gong said, 'I have sons. My sons have sons.'" | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 26 | kt-ch26-l4-x2 | listen-tf | "The bath was full to the top with warm water." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 27 | kt-ch27-l3-q4 vs x2 | listen-tf | "Many people waved goodbye, but he did not bring even one friend." | **SAME-SENT** q4=Yes, x2=No | x2 needs a modified false sentence; restore correctIndex=0 if sentence kept | No |
| 27 | kt-ch27-l5-x2 | listen-tf | "His horse stopped and would not move. Its ears went flat." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 27 | kt-ch27-l6-x2 | listen-tf | "\"I have been locked here for five hundred years,\" the monkey said." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 28 | kt-ch28-l4-x6 | listen-tf | "\"My teacher is still away. He went out before the snow began.\"" | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 28 | kt-ch28-l5-x2 | listen-tf | "\"Why try again? He is just a farmer who reads books.\"" | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 28 | kt-ch28-l5-x6 | listen-tf | "Liu Bei put a soft hand on his brother's shoulder." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 28 | kt-ch28-l6-x6 | listen-tf | "The brothers shook in the cold, but Liu Bei stood still and quiet." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 29 | kt-ch29-l3-q4 vs x2 | listen-tf | "On the island, white houses sat between green hills and a quiet shore." | **SAME-SENT** q4=Yes, x2=No | x2 needs modified false sentence | No |
| 29 | kt-ch29-l6-x6 | listen-tf | "The sea was loud, but his eyes did not leave the front of the ship." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 29 | kt-ch29-l7-x9 | listen-tf | "Slowly, very slowly, the wind began to soften." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 30 | kt-ch30-l3-q4 vs x2 | listen-tf | "He started up the hill alone, with no friend at his side." | **SAME-SENT** q4=No, x2=Yes (inverted) | Keep one; rewrite the other as a distinct false/true statement | No |
| 30 | kt-ch30-l3-x8 | listen-tf | "Heracles followed the prints with a steady hand on his bow..." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 30 | kt-ch30-l4-x6 | listen-tf | "Heracles dropped his bow and reached for the sword at his side..." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 30 | kt-ch30-l4-x8 | listen-tf | "He let the arrow fly. It hit the lion right in the chest." | **FALSE-YES** (story says arrows bounced off; marked Yes=True) | change correctIndex to 1 (No) | No |
| 30 | kt-ch30-l5-q4 vs x2 | listen-tf | "The sharp blade hit the thick skin and snapped into two pieces." | **SAME-SENT** q4=No, x2=Yes | Keep one; rewrite other | No |
| 30 | kt-ch30-l6-q4 vs x2 | listen-tf | "But his arms were still strong, and his courage was still big." | **SAME-SENT** q4=No, x2=Yes | Keep one; rewrite other | No |
| 30 | kt-ch30-l7-q4 vs x2 | listen-tf | "The lion shook and pulled, but Heracles did not let go." | **SAME-SENT** q4=No, x2=Yes | Keep one; rewrite other | No |
| 30 | kt-ch30-l7-x8 | listen-tf | "As the lion jumped, Heracles met it with his strong arms wide open." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 31 | kt-ch31-l4-x6 | listen-tf | "He packed a small bag, his bow, and a brown coat for cold nights." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |
| 31 | kt-ch31-l5-q4 vs x6 | listen-tf | "Only thin light came down through the leaves to the soft brown ground." | **SAME-SENT** q4=Yes, x6=No | x6 needs modified false sentence | No |
| 31 | kt-ch31-l6-q4 vs x2 | listen-tf | "Two more people came out from behind the bushes, then three, then six." | **SAME-SENT** q4=No, x2=Yes | Keep one; rewrite other | No |
| 31 | kt-ch31-l7-x8 | listen-tf | "Far away, in his cold castle, the Sheriff did not yet know what was coming..." | **VERB-NO** (verbatim narration, correct=No) | change correctIndex to 0 (Yes) | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| SAME-SENT (intra-lesson contradiction) | 10 unique collision pairs |
| VERB-NO (verbatim narration, answer=No) | 14 |
| FALSE-YES (false claim, answer=Yes) | 1 |
| **Total P0 violations** | **25** |
| Chapters affected | Ch25, Ch26, Ch27, Ch28, Ch29, Ch30, Ch31 (7 of 8 scanned) |
| Ch32 | clean (listen-tf count=0) |
| audio regen needed | 0 (all listen-tf — the fix is correctIndex only, not audio) |

**Root cause pattern:** listen-tf "x-variant" questions (x2, x6, x8, x9 suffixed IDs) were generated with the same sentence as the primary (q4) or with verbatim narration text, but the answer key was not adjusted. The false items should have modified key details (changed number, changed character, changed action) before setting `correctIndex: 1`. Instead, they received the true sentence but `correctIndex: 1`.

**Impact on children:** A 9-year-old hears the grandma's narration — e.g., *"Slowly, very slowly, the wind began to soften"* — then immediately hears it again as a listen-tf stimulus and answers "No" (False). The sentence they just heard as the story is presented as false. This creates contradictory learning signals and erodes trust in the game.

---

## D. Top 5 P0

1. ⚠️ **kt-ch30-l4-x8** (Ch30 FALSE-YES) — "He let the arrow fly. It hit the lion right in the chest." marked TRUE, but narration explicitly says *"the arrow did not go in. It bounced off"* and *"Arrows could not hurt it at all."* Directly teaches wrong story fact.

2. ⚠️ **kt-ch27-l6-x2** (Ch27 VERB-NO) — Monkey's 500-year imprisonment quote, verbatim from narration, marked FALSE. Key plot point (Sun Wukong's backstory) taught as incorrect.

3. ⚠️ **kt-ch28-l5-x2 + x6** (Ch28 dual VERB-NO in same lesson) — Two verbatim narration sentences in lesson 5 both marked No. The teacher's doubt and Liu Bei's response — the emotional core of the Three Visits — taught as false.

4. ⚠️ **kt-ch25-l5 (q4 vs x6 vs x8)** (Ch25 SAME-SENT triple) — Same sentence appears THREE times in one lesson with answers Yes/No/No. A child taking this lesson gets contradictory signals for the same sentence twice.

5. ⚠️ **kt-ch30-l3-q4 vs x2** (Ch30 SAME-SENT inversion) — "He started up the hill alone" — q4 says False, x2 says True. Directly contradictory within the same lesson.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Finding:** itemwriting.co (2025), Hawaii.edu TF Guide, and Buck (2001) §6 all agree: a TRUE/FALSE item whose stimulus is verbatim from the source text tests *recognition*, not comprehension. More critically, a verbatim TRUE statement labelled "False" in the answer key is a *construction error* with no pedagogical justification — it actively mis-teaches.

**Industry pattern:** Cambridge YLE / Flyers (the A2 children's standard closest to Pickup's audience) uses T/F items where:
- TRUE items = paraphrased but semantically equivalent to the audio
- FALSE items = verbatim sentence with ONE modified key detail (name, number, action word, location)
- NEVER: verbatim TRUE sentence with answer=False

**ARCH-REC #181: listen-tf Stimulus Integrity Lint Gate**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Verbatim-sentence = correctIndex mismatch lint | itemwriting.co / Buck 2001 / Cambridge YLE spec | ✅ 完全適配: JSON lesson files easy to parse; narration sentences accessible in same lesson object | Small (add to validate-lessons.js — ~30 lines) | Very High (catches 25 confirmed P0s) | ✅ Implement immediately |
| Same-sentence opposite-answer lint | Internal pattern discovered this run | ✅ 完全適配: intra-lesson scan, no external dependency | Small (another ~20 lines in validate-lessons.js) | Very High (10 confirmed contradictions) | ✅ Implement immediately |
| False-item modified-detail checker (NLP) | Cambridge ELT item writing guide | 🟡 Partial: requires semantic comparison; can start with Jaccard(stmt, narration) > 0.9 → flag for human review | Medium | High | 🟡 Phase 2 |

**Recommended implementation (X181):**

```js
// In validate-lessons.js — add to per-lesson scan
function lintListenTfIntegrity(lesson) {
  const narrationSet = new Set(
    lesson.questions.filter(q => q.type === 'narration').map(q => q.sentence?.trim())
  );
  const sentenceAnswerMap = {};
  
  lesson.questions.filter(q => q.type === 'listen-tf').forEach(q => {
    const s = q.sentence?.trim();
    const ans = q.options?.[q.correctIndex];
    
    // Rule 1: verbatim narration sentence marked No → construction error
    if (narrationSet.has(s) && ans === 'No') {
      warn(`${lesson.id}: X181_VERB_NO — verbatim narration "${s.substring(0,60)}..." marked No`);
    }
    
    // Rule 2: same sentence in lesson, contradictory answers
    if (!sentenceAnswerMap[s]) sentenceAnswerMap[s] = [];
    sentenceAnswerMap[s].push({ id: q.id, ans });
  });
  
  Object.entries(sentenceAnswerMap).forEach(([s, items]) => {
    const answers = items.map(i => i.ans);
    if (new Set(answers).size > 1) {
      warn(`${lesson.id}: X181_SAME_SENT — "${s.substring(0,60)}..." has contradictory answers: ${JSON.stringify(items)}`);
    }
  });
}
```

**Effort:** ~50 lines added to `tools/validate-lessons.js`. Zero src/ changes. Zero deploy. Zero breaking changes.

Sources consulted:
- https://itemwriting.co/true-false/ — "True-False Item Writing" (2025)
- https://www2.hawaii.edu/~sandrak/test/true_false.htm — "True-False Test Items" guidelines
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12696125/ — PMC 2025 "Supporting comprehension: advantages of MC over T/F practice tests"
- Buck, G. (2001) *Assessing Listening*, Cambridge University Press §6

---

## E. Narrative Voice / Pacing Improvements (even if 0 R1-R8 violation)

1. **Ch28 lesson 4–6 question density**: Three consecutive lessons all focus on Liu Bei's visits to Zhuge Liang's cottage. Comprehension questions in lessons 4, 5, and 6 all ask variants of "why did Liu Bei go again?" — the question battery repeats the same sub-skill (inference of motivation) across three lessons without rotating to gist or vocabulary. Recommend: lesson 5 should introduce 2 vocab questions on the new words introduced ("riding boots", "folded arms") to break the inference monotony.

2. **Ch29 lesson 6 pacing**: The storm sequence (l6) has 13 questions, the post-storm resolution (l7) has 12 questions, but l7's narration is the most emotionally resonant (team pulling together, home within reach). The question distribution should weight l7 more on inference/gist ("What do you think gave the men courage?") rather than pure detail recall. Currently l7 has 4 detail and 2 gist; recommend 3 detail / 4 gist for the emotional climax.

3. **Ch25 grandma voice drift**: Lessons 3–6 are narrated in third-person story mode, but lesson 7 ("every child who heard the story walked home holding hands with grown-ups") shifts to an inner-story framing addressing the listener directly. This frame-break works beautifully for the outer Mochi/Hana structure but the listen-mc questions (l7-q6, l7-q8) treat it as standard story narration rather than leaning into the grandma-addressing-Mochi register. Recommend: l7 comprehension questions explicitly say "奶奶在說什麼?" (What is grandma saying?) to signal the frame shift for children.
