# Content QA — 2026-07-10 18:06 UTC

**Today's angle**: A5 — Cultural Reference (background knowledge assumptions)
**Focus**: Ch9–16 (~480 MC/comprehension questions scanned across 8 chapters)

**Angle definition:**
A5 = questions where answering correctly (or avoiding wrong answers) requires **cultural background knowledge not established in the lesson's own stimulus or narration texts**. Four sub-types:
- **A5a Cultural deity/figure in option**: Distractor or correct answer names a cultural figure (Queen Mother, Jade Emperor, fairy godmother) that has not been introduced within the lesson narrations — heritage learner who knows the full myth may be misled or may correctly reject the "wrong" distractor for wrong reasons.
- **A5b Moral/theme inference via cultural value frame**: Question asks "what is the true magic / lesson / meaning" where the correct answer requires accepting a literary-moral framework (Western fairy-tale virtue = inner kindness; Confucian honesty = civic power) not stated explicitly in stimulus.
- **A5c Named entity assumption** (false positive — excluded after verification): Character names (Cinderella, Hou Yi) used in question stems are fine **if already introduced** in lesson narrations. Bulk of automated A5c flags were false positives — dismissed.
- **A5d Spoiler option / pre-reveal**: Option references a story event (e.g., moon ascent) before the lesson narration has reached that event. Not found in Ch9-16 this cycle.

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  4 lint issues (X57 × 2, X49B × 1, X2 × 1)
WARN lessons-ch10.json: 9 lint issues (X57 × 1, X49B × 4, X49 × 2, X2 × 2)
WARN lessons-ch11.json: 16 lint issues (X57 × 2, X48 × 1, X49 × 8, X49B × 4, X2 × 1)
WARN lessons-ch12.json: 12 lint issues (X57 × 1, X49 × 8, X49B × 2, X2 × 1)
WARN lessons-ch13.json: 12 lint issues (X57 × 3, X49 × 3, X49B × 2, X2 × 3)
WARN lessons-ch14.json: 10 lint issues (X48 × 1, X49 × 1, X49B × 4, X2 × 1)
WARN lessons-ch15.json: (no lint violations in range)
WARN lessons-ch16.json: (no lint violations in range)

Total existing mirror-lint issues (all chapters): 441 (warn-only)
No hard-fail schema errors in Ch9–16
```

---

## B. Violation Table

### Sub-type tally

| Sub-type | Found | Note |
|----------|-------|------|
| A5a Cultural deity/figure in distractor | **3** | Queen Mother in 2 Ch10 items; Jade Emperor in 1 Ch11 item — all as distractors |
| A5b Moral/theme inference question | **4** | Ch9 l7-x5, Ch13 l7-q10, Ch15 l7-x5, Ch16 l7-x5 |
| A5c Named entity in stem (false positives) | 0 confirmed | All checked — characters already introduced in narrations |
| A5d Spoiler pre-reveal | 0 | None found in Ch9–16 |

### Confirmed violations (P0 first)

| # | Ch | Q ID | Type | Snippet | Violation | Severity | 修法 | Audio regen? |
|---|----|----|------|---------|-----------|----------|------|-------------|
| 1 | 10 | kt-ch10-l4-x6 | comprehension | "If she gave him the pill, he would hurt many people." | **A5a**: Distractor A = "the Queen Mother would punish Hou Yi if she found out" — 西王母 not introduced in this lesson. In full 嫦娥 myth the pill came FROM 西王母, so a heritage learner correctly knowing mythology sees this as potentially true → contaminates item for most-knowledgeable cohort | **P0** | Replace distractor A → "a person who lives forever could never be stopped from doing harm" (culturally neutral; parallels correct option C but loses specificity; forces real inference) | No |
| 2 | 9 | kt-ch9-l7-x5 | comprehension | "She was kind, even to her two sisters. And the fairy godmother? Gone with the wind." | **A5b**: "What is the true magic?" with correct = "Cinderella's own kindness was her greatest power" — stimulus never asserts this; requires accepting Western fairy-tale literary moral. A child reading literally will pick "the slipper that fit only Cinderella's foot" (actual magical pivot). Hidden value assumption embedded as factual recall. | **P0** | Add narration sentence before this question: "In the end, what she kept was not the gown, not the coach — it was her kind heart." Then rewrite Q as: "After the magic was gone, what did Cinderella still have?" Options: "her golden coach / her silver gown / her kind heart / her fairy godmother" | No |
| 3 | 10 | kt-ch10-l7-x2 | comprehension | "A small white rabbit lived there. It came to her." | **A5a**: Distractor D = "the rabbit was sent by the Queen Mother to watch her" — In Chinese mythology the jade rabbit IS associated with the Queen Mother's palace. Heritage learner may consider D plausible. If D is "wrong" only because the lesson didn't establish it, then the item discriminates against the most culturally-aware learners. | **P1** | Replace distractor D → "the rabbit was lonely too, with no one else on the moon" (schema-plausible from context; not culturally loaded) | No |
| 4 | 15 | kt-ch15-l7-x5 | emoji-pick | "What is the main lesson of the emperor's story?" | **A5b**: Correct = 🗣️ "one honest voice can break a big lie" — Western Enlightenment civic-truth frame. Distractor B = 👗 "clothes make you look important" — in a face-saving / 面子 culture, this is **not obviously wrong**; it's a plausible reading of the story's events (everyone pretended to see the cloth to save face / look important). Creates systematic bias against children from high-context cultures. | **P1** | Replace distractor B → 👗 "always buy the most expensive cloth available" (wrong intent; not culturally ambiguous) | No |
| 5 | 11 | kt-ch11-l6-x2 | comprehension | "The Jade Emperor was not happy with Hou Yi." | **A5a mild**: Jade Emperor IS introduced in stimulus ("The Jade Emperor was not happy") but without cultural context. Non-heritage overseas learners (海外華人 target cohort) may not recognize 玉皇大帝 as the chief heaven-ruler → options "Hou Yi shot too slowly" or "the bow was now broken" become guesses rather than inference. | **P1** | Add to explanationZh: "玉皇大帝是天上所有神的最高統治者——有點像天上的皇帝。他的九個兒子就是那九個太陽，現在都被射下來了。" | No |
| 6 | 16 | kt-ch16-l7-x5 | emoji-pick | "What is the main lesson of Issun-boshi's story?" | **A5b mild**: Correct = "a brave heart matters most" — solid universal moral, fine. BUT distractor D "always follow the turtle" is **absurd** (no turtle in Issun-boshi / 一寸法師 story). Reduces to effective 3-choice. 8-year-olds might find nonsense distractors confusing rather than clarifying. | **P2** | Replace distractor D → "small people should stay at home where it is safe" (wrong but story-logical: Issun was told he was too tiny to leave) | No |
| 7 | 13 | kt-ch13-l7-q10 | emoji-pick | "What did the girl learn from the day?" | **A5b mild**: Correct = 👂 "to listen to mother" — fine universal moral. But stem "What did the girl learn?" is a classic moral-inference form tested as factual recall. The story (Red Riding Hood) supports multiple lessons: also "don't talk to strangers", "be careful in forests". Option 👂 is the standard Western didactic answer but not exclusively inferrable from stimulus. | **P2** | Rephrase Q: "Why did Mother's warning matter in the end?" — grounds answer in story event rather than free-floating moral inference | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Lessons scanned (Ch9–16) | ~64 lessons |
| Questions scanned (non-narration) | ~480 |
| A5a violations confirmed | 3 (2 P0/P1, 1 P1) |
| A5b violations confirmed | 4 (1 P0, 1 P1, 2 P2) |
| A5c false positives dismissed | ~40 (all named-entity-in-stem checks; characters introduced in narrations) |
| A5d spoiler pre-reveal | 0 |
| Items requiring audio regen | 0 |

---

## D. Top 5 P0

1. ⚠️ **kt-ch10-l4-x6** (Ch10) — Distractor A references 西王母 (Queen Mother); in the fuller 嫦娥 myth she IS the source of the pill → heritage learner trap; worst-case inverts item discrimination for culturally-knowledgeable cohort.

2. ⚠️ **kt-ch9-l7-x5** (Ch9) — "What is the true magic?" with correct = kindness. Stimulus does not assert this; Western fairy-tale literary moral embedded as factual recall; child reading literally picks "the slipper" which was the actual plot-turning magic.

3. **kt-ch10-l7-x2** (Ch10) — Distractor "sent by the Queen Mother to watch her" — jade rabbit IS associated with 西王母 in mythology; makes item ambiguous for culturally-aware learners.

4. **kt-ch15-l7-x5** (Ch15) — "One honest voice breaks a big lie" moral. Distractor "clothes make you look important" is plausible from a 面子 reading → cross-cultural bias in moral-inference item.

5. **kt-ch11-l6-x2** (Ch11) — "Jade Emperor" term used without cultural context in explanationZh; overseas heritage learners who don't recognize 玉皇大帝 cannot leverage explanation.

---

## E. Narrative Voice / Pacing Improvements (3 observations)

1. **Ch12 Zhinu-Niulang L6** has three adjacent "magpie bridge" questions (x5, x8, x9) all referencing the same stimulus sentence. The grammar question (x8) is fine, but x9's feeling-response option "😊 totally relaxed" is eliminable in 0.1 seconds (lovers being separated cannot feel relaxed). Replace with "🥳 happy but also worried they'll be apart again soon" — forces the child to hold two emotions simultaneously, which is what the story is teaching.

2. **Ch11 Hou Yi L7 (kt-ch11-l7-q7)**: "Why did Hou Yi keep the bow?" has distractor "cat noise made him" — this is completely incoherent in the story context (no cats in Hou Yi's story). Replace with "to sell it at the market for gold" (wrong but story-plausible — a poor retired hero might need money). Creates genuine inference pressure.

3. **Ch10 moral arc (L4-L7)**: Four consecutive lessons focus on Chang'e's fear/decision/flight/loneliness. The correct answers form a single emotional arc (scared → determined → lonely → comforted by rabbit). Consider adding one narration bridge sentence at the L6→L7 transition to explicitly name this arc for younger readers: "The moon was cold. But she was not alone." This would also make L7-q3 ("Who did Chang'e meet?") answerable from closer context rather than requiring memory of L7's first narration sentence.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis

| Source | Key finding |
|--------|-------------|
| Biased Tales: Cultural and Topic Bias in Generating Children's Stories, EMNLP 2025 ([ACL Anthology](https://aclanthology.org/2025.emnlp-main.3/)) | AI-generated children's stories featuring non-Western protagonists disproportionately embed **cultural heritage assumptions** — characters from East Asian stories tend to have morals framed around tradition/family while Western stories get universal-virtue framing. Pickup's Ch9-16 shows exactly this: Chang'e and Hou Yi questions carry Chinese-mythology-specific distractors (Queen Mother) while Cinderella questions carry Western-literary-value assumptions (kindness = true magic). Both are A5 violations but from opposite directions. |
| TESOL: The Power of Background Knowledge in the ELT Classroom ([TESOL blog](https://www.tesol.org/blog/posts/the-power-of-background-knowledge-in-the-elt-classroom/)) | Culturally responsive teaching requires that assessment items do NOT penalise learners for having MORE cultural background knowledge (if the fuller cultural context makes a distractor seem plausible). Item writers must audit each distractor for "schema contamination" — does knowing MORE about this story/culture make a wrong option seem right? |
| Duolingo: cultural auditing as human-in-the-loop ([Duolingo AI Revolution](https://drphilippahardman.substack.com/p/duolingos-ai-revolution)) | Duolingo's human instructional designers now specifically audit AI-generated content for "dialectical appropriateness and cultural sensitivity." This is the direct workflow analog to adding A5 lint to Pickup's validate-lessons.js. |

### Pattern name: ARCH-REC #139 — X76_A5_CULTURAL_LOADING_LINT

**What**: Add two lint rules to `tools/validate-lessons.js` that flag A5 cultural-loading violations automatically:

**X76a CULTURAL_DEITY_DISTRACTOR**: Scan all options in `listen-mc` / `comprehension` / `emoji-pick` questions for a blocklist of cultural figures not introduced in the same lesson's `narration` entries. Initial blocklist:
```js
const CULTURAL_DEITIES = [
  'Queen Mother', 'Jade Emperor', '西王母', '玉皇大帝',
  'jade rabbit', 'moon rabbit', 'Fairy Godmother',
  'Tanabata', 'Qixi', 'magpie bridge', '鵲橋',
];
// Flag if option contains deity AND deity not in lesson narrations
```

**X76b MORAL_INFERENCE_QUESTION**: Flag questions whose `question` field matches `/true magic|main lesson|what.*story.*teach|what.*true.*meaning|what.*lesson/i`. These require manual cultural-value audit before each release. Output: `WARN: X76b_MORAL_INFERENCE — manual cultural audit required for ${qid}`.

**Pickup 適配**:
- ✅ Pure `validate-lessons.js` addition — no `src/` or lesson JSON modification
- ✅ Zero runtime impact — build-time lint only
- ✅ Effort: Low (~40 lines added to existing lint loop)
- ✅ ROI: High — catches both P0 violations found this cycle (Queen Mother distractor + thematic moral question); prevents regression in new content batches
- ✅ Consistent with existing X-series rule naming convention

**Verdict: ✅ 適合 Pickup — 建議 implement**

### Implementation steps (when user approves)

```
1. tools/validate-lessons.js: add after existing X57 check (~line 180):

   // X76a: Cultural deity/figure in option not in lesson narrations
   const CULTURAL_DEITIES = [
     'Queen Mother', 'Jade Emperor', '西王母', '玉皇大帝',
     'jade rabbit', 'Fairy Godmother', 'magpie bridge', '鵲橋',
   ];
   const lessonNarrationText = questions
     .filter(q => q.type === 'narration')
     .map(q => q.sentence || '').join(' ').toLowerCase();
   for (const q of questions) {
     if (!['listen-mc','comprehension','emoji-pick'].includes(q.type)) continue;
     for (const opt of (q.options || [])) {
       for (const deity of CULTURAL_DEITIES) {
         if (opt.toLowerCase().includes(deity.toLowerCase()) &&
             !lessonNarrationText.includes(deity.toLowerCase())) {
           lintWarn(chFile, q.id, 'X76a_CULTURAL_DEITY_DISTRACTOR',
             `Option references cultural figure "${deity}" not introduced in lesson narrations`);
         }
       }
     }
   }

   // X76b: Moral inference questions — require manual cultural audit
   for (const q of questions) {
     if (/true magic|main lesson|what.*story.*teach|what.*true.*meaning|what.*lesson/i.test(q.question || '')) {
       lintWarn(chFile, q.id, 'X76b_MORAL_INFERENCE_QUESTION',
         `Moral/theme inference question — requires manual cultural-value audit`);
     }
   }

2. Run: node tools/validate-lessons.js
   Expected new warnings: ~6 (kt-ch10-l4-x6, kt-ch10-l7-x2 for X76a;
   kt-ch9-l7-x5, kt-ch13-l7-q10, kt-ch15-l7-x5, kt-ch16-l7-x5 for X76b)

3. Commit + push (no lesson JSON modifications needed at this step)
```

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-------------|--------|-----|---------|
| X76_A5_CULTURAL_LOADING_LINT (validate-lessons.js) | EMNLP 2025 Biased Tales ([link](https://aclanthology.org/2025.emnlp-main.3/)); TESOL background knowledge ([link](https://www.tesol.org/blog/posts/the-power-of-background-knowledge-in-the-elt-classroom/)) | ✅ additive lint only; no src/ or JSON change | Low (~40 lines) | High — catches P0 Queen Mother distractor; prevents regression in AI-batched content | ✅ Recommend |
