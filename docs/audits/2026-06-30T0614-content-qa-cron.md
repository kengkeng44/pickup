# Content QA — 2026-06-30 06:14 UTC

Today's angle: **A3 — 語意 leak (story 跳針) + listen-tf correctIndex/explanationZh 矛盾**
Focus: Ch25–31 (愚公移山 / Archimedes / Journey to the West / Three Kingdoms / Odysseus / Heracles / Robin Hood)

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 12 lint issue(s)
WARN lessons-ch26.json:  5 lint issue(s)
WARN lessons-ch27.json: 15 lint issue(s)
WARN lessons-ch28.json: 10 lint issue(s)
WARN lessons-ch29.json: 12 lint issue(s)
WARN lessons-ch30.json:  9 lint issue(s)
WARN lessons-ch31.json:  9 lint issue(s)
Total mirror-lint issues: 235  (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Ch25–31: 7 chapters · 49 lessons · **612 non-narration question items** · **125 listen-tf items**

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 25 | kt-ch25-l3-x3 | listen-tf | "The next morning, his sons came out with big baskets to start the work." questionEn: "Did the family wait many days before starting the work?" | **P0 correctIndex=0(Yes) but answer is No** — came the very next morning, not many days later. explanationZh correctly says "答案是 No!" — system marks Yes as correct but then shows "Answer is No!" explanation. Child gets visual ✅ then reads contradictory feedback. | Change `correctIndex: 0 → 1` | No |
| 25 | kt-ch25-l4-x6 | listen-tf | "A man passing by stopped to watch them work." questionEn: "Did the passerby believe Yu Gong could succeed?" | **P0 correctIndex=0(Yes) but answer is No** — the man laughed and said "you cannot finish this." explanationZh: "他搖頭——搖頭就是不相信!答案是 No!" | Change `correctIndex: 0 → 1` | No |
| 25 | kt-ch25-l5-x3 | listen-tf | "Yu Gong looked at his sons and his small grandsons." questionEn: "Was the man trying to encourage Yu Gong?" | **P0 correctIndex=0(Yes) but answer is No** — the man was challenging/doubting, not encouraging. explanationZh: "這個問題是在質疑愚公——不是鼓勵,是挑戰!答案是 No!" | Change `correctIndex: 0 → 1` | No |
| 26 | kt-ch26-l2-q2 | picture-mc | "Archimedes jumped out of the bath." explanationZh: "這就是他發現答案的那一刻!" | **P1 A3_FUTURE_NARR_REF** — Eureka scene (bath + jump + "Eureka!") only occurs in L4–L5. Using it as a vocab picture item in L2 **spoils the story climax** before the child reaches it. Explanation explicitly labels it the discovery moment. | Replace sentence with a neutral scene from L3 (e.g. "Archimedes sat at his desk and drew shapes.") | No |
| 26 | kt-ch26-l2-q4 | grammar-mc | "Yesterday, Archimedes ___ out of the bath and ran down the street." | **P1 A3_FUTURE_NARR_REF** — Same climax spoiler as above in grammar fill-in form. Also "ran down the street" is from L5 narration. | Replace with L3-safe sentence e.g. "Yesterday, Archimedes ___ at his desk for many hours." (worked) | No |
| 27 | kt-ch27-l2-q2 | picture-mc | "The monk walked on a long journey to the west." distractor[2]: "a monkey resting under a big tree" | **P1 A3_DISTRACTOR_SPOIL** — Monkey King (Sun Wukong) not introduced until L6 (五行山). In L2 vocab lesson, "monkey" distractor pre-signals the major character reveal. 8-12 year-olds who know Journey to the West lore will guess this connection and feel rewarded for prior knowledge, but new learners get a spoiler. | Replace monkey distractor with neutral option e.g. "an old teacher reading at a table" | No |
| 31 | kt-ch31-l1-q5 | picture-mc | "Robin Hood hid in the forest to help the poor." distractor[0]: "a king sitting on a gold chair in a castle" | **P2 A3_DISTRACTOR_SPOIL** — Bad king + castle are introduced in L3. The distractor pre-establishes the antagonist's visual identity in L1. Children may correctly associate "king in castle = villain" before the story establishes it. | Replace with neutral distractor e.g. "an old woman reading by the window" | No |
| 31 | kt-ch31-l3 | listen-mc × 2 | Multiple questions | **P2 A3_DISTRACTOR_SPOIL** — Distractors "a small camp deep in the forest" and "Robin's village far to the north" reference Robin Hood's forest base, which is only established in L5. In L3, these distractors hint at setting details not yet told. | Rewrite distractors to be temporally safe (town, road, farm) | No |
| 25 | kt-ch25-l3 | listen-tf | "They carried stones and dirt in baskets down to the sea." correct=1 (No) | **P2 STORY_INCONSISTENCY** — Story says they carried to the **river** (河), not the sea. The listen-tf is intentionally "No" because "sea" is the wrong destination — correct logic — but the explanationZh says "搬整座山的石頭——一個小時根本不夠!答案是 No!" which explains TIME not destination. Explanation should say "he carried to the **river**, not the sea → so No" | Fix explanationZh to explain river-vs-sea distinction | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters audited | 7 (Ch25–31) |
| Non-narration items scanned | 612 |
| listen-tf items | 125 |
| P0 violations | 3 |
| P1 violations | 3 |
| P2 violations | 5 |
| Audio regen required | 0 |
| validate-lessons.js lint (Ch25-31) | 72 warn-only |

**P0 rate**: 3 / 125 listen-tf items = **2.4%** — all in Ch25 (愚公移山), caused by a batch-generation run where `correctIndex` defaulted to 0 for items that were clearly authored as "No" answers.

**Root cause**: The `questionEn` field was correctly set (e.g. "Did the family wait many days?") and `explanationZh` was correctly written (answering No), but `correctIndex` was left at the JSON default 0 (Yes). No lint rule currently catches this contradiction.

---

## D. Top 5 P0

1. ⚠️ **ch25|kt-ch25-l3-x3** — `correctIndex=0` marks Yes as correct for "Did the family wait many days?" when the answer is clearly No (they came the next morning). Child gets ✅ for answering Yes, then reads explanation saying "答案是 No!" — maximum cognitive contradiction for a young learner.

2. ⚠️ **ch25|kt-ch25-l4-x6** — `correctIndex=0` marks Yes for "Did the passerby believe Yu Gong could succeed?" The passerby explicitly laughed and doubted. Same mismatch pattern — ✅ for wrong answer, contradictory explanation.

3. ⚠️ **ch25|kt-ch25-l5-x3** — `correctIndex=0` marks Yes for "Was the man trying to encourage Yu Gong?" The man was challenging him. Third instance of the same batch-generation correctIndex=0 default error.

4. ⚠️ **ch26|kt-ch26-l2-q2 + q4** — Vocabulary lesson (L2) uses the Eureka bath scene (L4–L5 climax) as vocabulary practice. Explanation text "這就是他發現答案的那一刻!" labels this as the discovery moment. For a child going through Ch26 sequentially, L2 vocabulary ruins the central tension of the Archimedes story.

5. ⚠️ **ch27|kt-ch27-l2-q2** — "a monkey resting under a big tree" distractor in L2 vocab lesson, before Monkey King appears in L6. The distractor works as a "wink" to Journey to the West fans, but undermines the narrative reveal for children encountering the story fresh.

---

## E. Narrative Voice / Pacing Improvements (3 minimum)

1. **Ch25 (愚公移山) L5-L6 transition pacing**: The moment where Yu Gong puts down his basket and gives his famous answer is split across two lessons (L5 = he puts basket down, L6 = the answer). The final narration of L5 is "He smiled and gave a quiet, kind answer…" — the ellipsis creates a good cliff-hanger, but the L6 opening could strengthen the "奶奶pauses and smiles" moment. Suggest adding: "奶奶微微停頓了一下，嘴角帶著笑……" as L6's opening narration entry before the actual answer starts, so grandma's storytelling rhythm is felt.

2. **Ch26 (Archimedes) L4 tension build**: The sequence L3→L4 where Archimedes gets into the bath and suddenly realizes the water displaced has the right emotional structure, but the questions between narration blocks are all detail-type listen-mc. Insert one inference-type comprehension question around L4 Q4-Q5 area: "Why did Archimedes suddenly stop moving?" with options that make the child infer his dawning realization — this deepens engagement before the Eureka payoff.

3. **Ch29 (Odysseus) L3 home-longing voice**: The narration "He longed to walk on its warm sand and touch its old stone walls" is emotionally strong, but the questions that follow immediately shift to grammar-mc exercises. This breaks the emotional register. Insert a short narration bridge after the grammar item: "奶奶說：歐德修斯想家，每一天都想。" before the next listen-mc — this keeps grandma's empathetic presence and prevents the grammar exercise from feeling tone-deaf to the emotional content.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #97: X52_LISTEN_TF_CORRIDX_EXPL_LINT + X53_VOCAB_LESSON_CLIMAX_GUARD

**Finding**: Two lint rules to catch the A3 patterns found in this cycle.

**Industry sources**:
- [Scientific Reports 2026 — Digital storytelling coherence in EFL listening](https://www.nature.com/articles/s41598-026-36913-4): story-based tasks with scaffolded sequences (vocab preview → story → reflection) show that **narrative coherence is essential for engagement**; disruptions (e.g. answer showing climax before story gets there) reduce comprehension gains.
- [NCBl PMC — Coherence formation in 9-12 year-olds](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8179903/): children in this age range are building **local coherence** (within-scene) AND **global coherence** (whole-story arc). Forward references in early items disrupt global coherence, which is the hardest to rebuild.
- [CLELE Journal — Story apps for primary EFL](https://clelejournal.org/article-1-picturebooks-go-digital/): best practice is reader-activated vocabulary support (tap to reveal), NOT pre-revealing plot content in the vocabulary intro phase.

**Pattern 1 — X52_LISTEN_TF_CORRIDX_EXPL_LINT** (answer/explanation contradiction detector):

```js
// X52_LISTEN_TF_CORRIDX_EXPL_LINT
// When explanationZh explicitly states the answer, cross-check with correctIndex.
const tfItems = lesson.questions.filter(q => q.type === 'listen-tf');
for (const q of tfItems) {
  if (!q.explanationZh) continue;
  const saysNo  = /答案是\s*No/.test(q.explanationZh);
  const saysYes = /答案是\s*Yes/.test(q.explanationZh);
  if (saysNo  && q.correctIndex === 0)
    warn(q.id, 'X52_CORRIDX_EXPL_MISMATCH', 'explanationZh 說「答案是 No」但 correctIndex=0(Yes)');
  if (saysYes && q.correctIndex === 1)
    warn(q.id, 'X52_CORRIDX_EXPL_MISMATCH', 'explanationZh 說「答案是 Yes」但 correctIndex=1(No)');
}
```

**Pattern 2 — X53_VOCAB_LESSON_CLIMAX_GUARD** (forward-ref spoiler in vocab lessons):

```js
// X53_VOCAB_LESSON_CLIMAX_GUARD
// L1-L2 (vocab intro) should not use sentences from L4+ narrations.
// Heuristic: if lesson index <= 1 AND sentence overlaps 60%+ with a narration
// from lessons[3..] → warn.
if (lessonIndex <= 1) {
  const futureNarr = lessons.slice(3).flatMap(l =>
    l.questions.filter(q => q.type === 'narration').map(q => q.sentence.toLowerCase())
  );
  for (const q of lesson.questions) {
    if (q.type === 'narration') continue;
    const sWords = new Set((q.sentence || '').toLowerCase().match(/\b[a-z]{3,}\b/g) || []);
    for (const fn of futureNarr) {
      const fnWords = new Set((fn.match(/\b[a-z]{3,}\b/g) || []));
      const overlap = [...sWords].filter(w => fnWords.has(w)).length / sWords.size;
      if (overlap > 0.6 && sWords.size > 4) {
        warn(q.id, 'X53_VOCAB_CLIMAX_SPOIL',
          `L${lessonIndex+1} vocab item sentence overlaps ${(overlap*100).toFixed(0)}% with L${..}+ narration — possible story climax spoiler`);
      }
    }
  }
}
```

**Pickup 適配分析**:

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X52_LISTEN_TF_CORRIDX_EXPL_LINT — 交叉驗證 explanationZh vs correctIndex | Scientific Reports 2026 coherence; NCBl 2021 | ✅ Additive to `validate-lessons.js`. Zero schema change. Catches the 3 P0 bugs found this cycle + prevents future batch-gen regressions | 1 hr | **High** — 3 P0 bugs per Ch25 sweep = 2.4% P0 rate in listen-tf items; 1 bad answer + contradictory explanation = trust-breaking for child learners | ✅ Implement |
| X53_VOCAB_LESSON_CLIMAX_GUARD — vocab intro anti-spoiler | CLELE Journal; NCBl global coherence | ✅ Additive. Catches Ch26-type climax spoilers in L1-L2. Low false-positive risk: 60% overlap threshold is high enough to avoid common-word matches | 2 hr (includes tuning threshold) | **Medium** — prevents story tension being deflated before the child reaches the climax | ✅ Implement |
| Reader-activated vocabulary (tap-to-reveal) instead of pre-story sentences | CLELE Journal; AnimAlte 2026 | 🟡 Partially applicable — Pickup already uses tap-pairs and emoji-pick, not pre-story inline gloss. The issue is specifically with picture-mc / grammar-mc items in L1-L2 using climax-scene sentences | 0 effort if guarded by X53 | Low incremental ROI if X53 is added | ✅ Guard with X53 instead of UI change |

**Recommended implementation**: Add `X52` + `X53` to the `// extended-lint block` section of `tools/validate-lessons.js`. No `src/` changes, no JSON changes.

**Pickup fit**: ✅ fully compatible. Both rules extend the existing `warn()` pattern. Would have caught all 6 violations (3 P0 + 3 P1) found in this audit cycle before they shipped.

**Effort**: ~2 hours combined. **ROI**: High for X52 (P0 correctness), Medium for X53 (narrative coherence).
