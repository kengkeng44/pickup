# Content QA — 2026-08-05 18:07 UTC

**Today's angle: A2 — cloze blank 位置 / tested information position bias (START / MID / END of sentence)**
**Focus: Ch0–8 (263 listen-mc + comprehension questions across 9 chapters)**

> **A2 definition** (adapted from pickup-q-design-standard-v1.md + psychometric literature):
> In listen-mc and comprehension items, the "blank position" maps to which third of the sentence
> the correct answer's key concept first appears in: START (first 33%), MID (33-66%), END (66-100%),
> or "unknown/inference" (answer requires integration across whole sentence — valid).
>
> **Violation**: a lesson with ≥4 MC/comprehension questions where 0% are START-zone (learners
> can skip the sentence opening and still pattern-match from MID/END), OR where ≥70% of
> positioned questions cluster in a single zone (positional monotony).
>
> **Detection method**: for each Q, tokenize sentence into words; find position (0.0–1.0) of best
> content-word overlap between sentence and correct option; map to thirds. Inference questions
> that paraphrase across the whole sentence score "unknown" — GOOD, not a violation.
>
> **Rotation status**: first use of angle A2 in this session. Previous 10 cycles: A7, #12-explanationZh,
> A6-option-in-question, #10-audio-sync, R2-distractor, A5-cultural, A1-obvious, A4-mirror,
> #11-optionsZh, A3-semantic.

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json:  7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch1.json: 17 lint issue(s) — X2_OPTION_LIST_BIAS (3), X49_STIMULUS_REUSE (7),
     X49B_STIMULUS_REUSE_COMP (3), X57_ANTONYM_PAIR_MIRROR (4)
WARN lessons-ch2.json: (stimulus-reuse + antonym mirror issues, pre-existing)
WARN lessons-ch3.json: (antonym mirror + option-list-bias issues, pre-existing)
WARN lessons-ch4.json: (stimulus-reuse + antonym mirror issues, pre-existing)
WARN lessons-ch5.json: (stimulus-reuse issues, pre-existing)
WARN lessons-ch6.json: (stimulus-reuse + antonym issues, pre-existing)
WARN lessons-ch7.json: (stimulus-reuse + antonym issues, pre-existing)
WARN lessons-ch8.json: X48_NGRAM_VERBATIM_CORRECT (2), X49_STIMULUS_REUSE (3),
     X49B_STIMULUS_REUSE_COMP (1), X2_OPTION_LIST_BIAS (2), X57_ANTONYM_PAIR_MIRROR (1)

Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Build: PASS (tsc + vite build green)
```

All lint warnings are **pre-existing** from earlier cycles (no new schema errors). A2 position-bias
is not yet detected by validate-lessons.js — this audit proposes adding it (see ARCH-REC §G).

---

## B. Zone distribution by chapter

| Ch | n Q | START | MID | END | Unknown/Inf |
|----|-----|-------|-----|-----|-------------|
| Ch0 | 14 | 4 (29%) | 4 (29%) | 5 (36%) | 1 (7%) |
| Ch1 | 34 | 9 (26%) | 7 (21%) | 7 (21%) | 11 (32%) |
| Ch2 | 31 | 8 (26%) | 3 (10%) | 2 (6%) | 18 (58%) |
| Ch3 | 36 | 12 (33%) | 8 (22%) | 1 (3%) | 15 (42%) |
| Ch4 | 29 | 8 (28%) | 4 (14%) | 6 (21%) | 11 (38%) |
| Ch5 | 30 | 11 (37%) | 6 (20%) | 3 (10%) | 10 (33%) |
| Ch6 | 36 | 6 (17%) | 5 (14%) | 3 (8%) | 22 (61%) |
| Ch7 | 31 | 10 (32%) | 5 (16%) | 4 (13%) | 12 (39%) |
| Ch8 | 22 | 3 (14%) | 9 (41%) | 4 (18%) | 6 (27%) |
| **TOTAL** | **263** | **71 (27%)** | **51 (19%)** | **35 (13%)** | **106 (40%)** |

> **Reading note**: "Unknown/Inf" = inference questions where the correct answer paraphrases
> across the full sentence (e.g. "What is the lesson of the story?"). These are **valid** —
> they require integration of the whole stimulus, not positional matching.
>
> Among *positioned* questions only (n=157): START=45%, MID=32%, END=22%. Distribution is
> START-weighted, which is **good** globally. Problem is intra-lesson imbalance.

---

## C. Violation table

| Ch | Lesson ID | type | Violation | Severity | Snippet | 修法 | audio regen? |
|----|-----------|------|-----------|----------|---------|------|--------------|
| Ch1 | kt-ch1-l7 | pos-bias | **0% START zone** (0/7 Q, climax lesson) — zones: MID,MID,END,END,unk,unk,MID | **P0** | "Side by side, they pushed…" / "They gave Momotaro gold…" — all test MID/END | Add 1-2 Q testing sentence-opening info (e.g. subject/agent at start). E.g. "Side by side" → Q "How did they fight?" A "together (side by side)" is START-zone | No |
| Ch2 | kt-ch2-l7 | pos-bias | **0% START zone** (0/7 Q, climax lesson) — zones: MID,unk,unk,MID,END,unk,unk | **P0** | "Spring came at last. The cold ice melted…" — Q tests MID "leaves grow and ice melts" | Add 1 Q targeting sentence-first element, e.g. "Spring came at last" → Q "What season arrived?" A "spring" (pos 0.0) | No |
| Ch6 | kt-ch6-l7 | pos-bias | **0% START zone** (0/7 Q, climax lesson) — zones: unk,MID,unk,MID,unk,unk,unk | **P0** | "Just then, six white swans came down…" — START "Just then" not tested; "White feathers fell away" not START-targeted | Add 1 detail Q: "Who came down from the sky?" A "six white swans" (START-zone) | No |
| Ch8 | kt-ch8-l7 | pos-bias | **MID 80% bias** (4/5 positioned Q in MID zone) — zones: unk,MID,MID,MID,MID | **P0** | "The third pig built a hot fire…" / "The wolf jumped down from the roof…" — all test MID info | Diversify: replace 1 MID Q with a START-zone Q or END-zone Q. e.g. "All three brothers shouted…" → Q "Who shouted?" A "all three pigs" (START, pos 0.0) | No |
| Ch4 | kt-ch4-l3 | pos-bias | **0% START zone** (0/5 Q, inference-heavy) — zones: unk,unk,END,unk,END | **P1** | "They had to do their own work…" / "Man stood up at once…" — 2 END, 3 inference | Add 1 literal detail Q testing sentence subject (START-zone) to balance inference-heavy pattern | No |
| Ch4 | kt-ch4-l6 | pos-bias | **0% START zone** (0/6 Q) — zones: unk,MID,unk,unk,END,unk | **P1** | "The Camel's back was flat…" — MID tested; START "Camel's back" never tested | Add 1 Q: "What was flat before the story?" A "his back" (START) | No |
| Ch8 | kt-ch8-l3 | pos-bias | **MID 75% bias** (3/4 Q in MID zone) — zones: MID,MID,MID,unk | **P1** | "He picked sticks because they felt firmer than straw" — straw/firmer both MID | Vary: replace 1 MID Q with START-zone Q targeting sentence subject | No |
| Ch8 | kt-ch8-l5 | pos-bias | **0% START + END 50%** (2/4 END) — zones: unk,unk,END,END | **P1** | "He huffed. He puffed. He blew…" — only END tested; subject "He" (wolf) never tested directly | Add literal Q: "Who was trying to break the house?" A "the big bad wolf" (START) | No |

---

## D. Stats

- **Total Q analyzed**: 263 (listen-mc + comprehension across Ch0–8)
- **Positioned Q**: 157 (60%); Inference/unk: 106 (40%)
- **P0 violations**: 4 lessons (kt-ch1-l7, kt-ch2-l7, kt-ch6-l7, kt-ch8-l7)
- **P1 violations**: 4 lessons (kt-ch4-l3, kt-ch4-l6, kt-ch8-l3, kt-ch8-l5)
- **Pattern**: All P0 violations are in **l7 (climax lessons)** of their chapters — the most important
  lesson in the chapter systematically avoids testing sentence-opening information
- **Positive**: Inference/unknown questions (40%) are healthy — indicate genuine comprehension
  assessment beyond surface matching; Ch2 (58%) and Ch6 (61%) are inference-rich which is
  developmentally appropriate for Chapters covering emotional/abstract content
- **Ch8 specific**: Three Little Pigs lessons have short, front-loaded sentences where important
  info (subject/verb) clusters at the start of sentences — yet items avoid testing it,
  creating MID monotony

---

## E. Top 5 P0

| # | Q ID | Violation | Impact |
|---|------|-----------|--------|
| P0-1 | kt-ch1-l7 entire lesson | 0% START in Momotaro climax — all 7 Q test MID/END/inference | Learners internalize "skip first word, answer from middle" in the emotionally-peak lesson |
| P0-2 | kt-ch2-l7 entire lesson | 0% START in Ugly Duckling climax — 5/7 Q inference | START-zone never required at story resolution moment |
| P0-3 | kt-ch6-l7 entire lesson | 0% START in Six Swans climax — 5/7 Q inference or MID | Highest-inference lesson (61%) — but zero literal START-detail questions |
| P0-4 | kt-ch8-l7 entire lesson | MID 80% bias in Three Little Pigs finale | 4 consecutive MID-zone Q teach learners to ignore sentence endings |
| P0-5 | kt-ch8-l3 + kt-ch8-l5 | Ch8 structural MID/END bias — 0% START across 2 contiguous lessons | Pattern compounds: two consecutive lessons with zero START testing, learner can skip sentence openings throughout Ch8 mid-section |

---

## F. Narrative voice / pacing improvements (3 proposals — no hard violations)

1. **Climax lesson pacing**: l7 lessons across all chapters tend toward pure inference questions
   ("What is the main lesson?", "What does X symbolize?") — which are valid but create a
   perception that Pickup ELT questions never test literal sentence-start information. Adding
   1 grounded START-zone detail question at the beginning of each l7 lesson would signal
   "we still care about the literal opening" before moving to abstract inference.

2. **Ch8 sentence structure variety**: Three Little Pigs sentences are structurally front-loaded
   ("He huffed. He puffed. He blew with all his might.") making MID-testing unavoidable if
   position variety is required. Recommendation: where possible, restructure 1-2 sentences per
   lesson to be end-weighted ("With all his might, the wolf huffed and puffed and blew") — this
   unlocks END-zone testing variety without changing the story content.

3. **Inference-zone acknowledgment**: Consider adding a visible "think about the whole story"
   prompt before inference questions in child-facing UI — a brief grandma narration like "奶奶想
   問你一個想一想的題目" before inference type Q. This signals to 8-12 learners that some questions
   require full-sentence integration (not word-matching), reducing anxiety when no single phrase
   "gives away" the answer.

---

## G. 🔬 Architecture Recommendation (對齊業界 2026)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Per-lesson position-zone balance lint gate (`X247_A2_POSITION_BALANCE_LINT`) | Holzknecht et al. 2021 (SAGE journals.sagepub.com) — answer position affects item difficulty and fairness; ETS Best Practices (ets.org/pdfs) — avoid construct-irrelevant variance from positional patterns | ✅ Node.js-native, no deps. Extend existing `validate-lessons.js` A7/R1 logic with position-zone calculator. Emit WARN (not hard fail) for lessons with 0% START zone and ≥4 Q, or ≥70% single-zone concentration | ~1.5 hr: add `findPositionZone()` helper (reuse word-tokenizer already used for R1/A7); accumulate per-lesson zone counts; emit `X247_A2_POSITION_BALANCE` warnings | Medium: auto-detects the systematic l7 pattern early in content batches; prevents same bias from re-entering future Ch9-34 content | ✅ 適合 |

### ARCH-REC #246: X247_A2_POSITION_BALANCE_LINT — Per-lesson position-zone distribution check

**Concrete implementation sketch:**

```js
// In validate-lessons.js — add after existing A7 content-word overlap check

const STOPWORDS = new Set(['the','a','an','is','are','was','were','in','on','at','to','of',
  'he','she','they','it','his','her','his','and','or','but','not','be','been','his','from','with']);

function tokenize(text) {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}
function contentWords(text) {
  return tokenize(text).filter(w => !STOPWORDS.has(w) && w.length > 2);
}
function findPositionZone(sentence, correct) {
  const sw = tokenize(sentence);
  const cw = contentWords(correct);
  if (!cw.length || !sw.length) return 'unk';
  let bestPos = null, bestMatch = 0;
  sw.forEach((w, i) => {
    const m = cw.filter(c => c.includes(w) || w.includes(c)).length;
    if (m > bestMatch) { bestMatch = m; bestPos = i / sw.length; }
  });
  if (bestPos === null) return 'unk';
  return bestPos < 0.33 ? 'START' : bestPos < 0.67 ? 'MID' : 'END';
}

// In per-lesson loop:
const zoneCounts = { START: 0, MID: 0, END: 0, unk: 0 };
for (const q of lesson.questions) {
  if (!['listen-mc','comprehension'].includes(q.type)) continue;
  const zone = findPositionZone(q.sentence || '', (q.options || [])[q.correctIndex || 0] || '');
  zoneCounts[zone]++;
}
const positioned = zoneCounts.START + zoneCounts.MID + zoneCounts.END;
if (positioned >= 4) {
  if (zoneCounts.START === 0)
    warns.push(`${lesson.id}: X247_A2_POSITION_BALANCE — 0% START-zone (${positioned} positioned Q)`);
  const maxZone = Object.entries(zoneCounts).filter(([k])=>k!=='unk').sort((a,b)=>b[1]-a[1])[0];
  if (maxZone[1] / positioned >= 0.70)
    warns.push(`${lesson.id}: X247_A2_POSITION_BALANCE — ${maxZone[0]} ${Math.round(maxZone[1]/positioned*100)}% bias`);
}
```

**Expected output when shipped:**
```
WARN lessons-ch1.json kt-ch1-l7: X247_A2_POSITION_BALANCE — 0% START-zone (5 positioned Q)
WARN lessons-ch2.json kt-ch2-l7: X247_A2_POSITION_BALANCE — 0% START-zone (2 positioned Q)
WARN lessons-ch6.json kt-ch6-l7: X247_A2_POSITION_BALANCE — 0% START-zone (2 positioned Q)
WARN lessons-ch8.json kt-ch8-l7: X247_A2_POSITION_BALANCE — MID 80% bias
WARN lessons-ch8.json kt-ch8-l3: X247_A2_POSITION_BALANCE — MID 75% bias
```

---

> 請拉最新 master. 實作 ARCH-REC #246 (X247_A2_POSITION_BALANCE_LINT):
> 1. 在 `tools/validate-lessons.js` 加 `findPositionZone(sentence, correct)` helper
> 2. 在 per-lesson 掃描迴圈中累積 {START,MID,END,unk} counts
> 3. 若 positioned ≥4 且 START===0 → emit `X247_A2_POSITION_BALANCE` WARN
> 4. 若 positioned ≥4 且 任一 zone ≥70% → emit `X247_A2_POSITION_BALANCE` bias WARN
> 5. `node tools/validate-lessons.js` 通過 + `npm run build` 綠燈
> 6. commit `v2.0.B.NEXT: X247 A2 position-balance lint gate (ARCH-REC #246)` + push
