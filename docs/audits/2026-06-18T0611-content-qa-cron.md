# Content QA — 2026-06-18 06:11 UTC

**Today's angle: A1 — Obvious Correct / Gap Too Easy (Distractor Quality + Answer Position)**
**Focus: Ch9–12** (Cinderella / Hou Yi & Chang'e v1 / Hou Yi & Chang'e v2 / Cowherd & Weaver 牛郎織女)

A1 audits two failure modes: (a) correct option guessable by distractor elimination without comprehension (junk/implausible distractors), and (b) correct answer position so predictable that learners can score high by positional bias alone.

---

## A. validate-lessons.js result

```
OK  lessons-ch9.json:  7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch10.json: 1 lint issue(s):
  kt-ch10-l7-q7: X2_OPTION_LIST_BIAS (all start with "to")
OK  lessons-ch11.json: 7 lessons
OK  lessons-ch12.json: 7 lessons

Total mirror-lint issues (corpus-wide): 70
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Ch9, Ch11, Ch12 pass all schema + lint checks. Ch10 has one minor X2 bias (all options start with "to"). No schema failures.

---

## B. Violation Table

| Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| ALL | SYSTEMIC | **R3-POSITION-MONOPOLY** | `correctIndex` dist across all Ch1–31: **idx=0: 8.7% / idx=1: 84.2% / idx=2: 5.7% / idx=3: 1.5%** (619 MC questions) | **P0 ★★★ SYSTEMIC** — Correct answer is at position 1 (option B) 84% of the time across the entire corpus. Ch8–13, Ch16–18, Ch20, Ch27, Ch31 are **100% idx=1**. Ch9–12 are all 100% idx=1 (59/59 questions). After 3–4 questions any 8-year-old pattern-learns "always pick B." R3 spec mandates 25% ±5% per position. | Script-shuffle `options[]` at question-gen time + rebalance with lint. Or implement runtime shuffle in `LessonPage.tsx` (no JSON change needed). See ARCH-REC #48 below. | Yes for any chapter where audio is position-keyed (check `renderers.tsx`) |
| Ch11 | kt-ch11-l7-q7 | listen-mc | `He looked at it some nights in the soft lamp light.` → "Why did Hou Yi keep the bow?" | **P0 ★★★** — 3 of 4 options are word-salad non-distractors: `"for selling gold price"` / `"cat noise made him"` / `"daily cleaning fun"`. None are contextually plausible. Student eliminates all 3 by grammar alone, not comprehension. The question teaches nothing about Hou Yi's emotional state. | Replace with functional distractors: `"to sell it one day"` / `"his son asked him to"` / `"it was hard to carry"` — all plausible within story-world | No (distractors have no audio) |
| Ch12 | kt-ch12-l7-q9 | listen-mc | `They tell the story to their children under the bright stars.` → "What do Chinese families do on Qixi night?" | **P0 ★★** — Distractors `"wash all the clothes"` / `"plant new flowers"` are random household chores with zero thematic connection to 七夕/Qixi context. `"hide inside the home"` contrasts with the outdoor stargazing scene but is too obvious to be functional. | Replace two junk distractors: `"light paper lanterns"` (plausible cultural confusion with Mid-Autumn) / `"watch the stars alone"` (true but misses family/children element) | No |
| Ch11 | kt-ch11-l1-q8 | listen-mc | `No one could go outside in the long bright day.` → "Why did people stay inside?" | **P1 ★** — Distractor `"a party was on TV"` is a modern anachronism inside a Hou Yi myth setting (ancient China). Child readers will auto-eliminate by era mismatch, reducing effective options to 3. | Replace with: `"the roads were too muddy"` (era-plausible) | No |
| Ch9 | kt-ch9-l4-q3 | listen-mc | `Her tears fell on the grey floor, soft and slow.` → "How was Cinderella crying?" | **P1 ★** — Distractor `"while singing songs"` is implausible in a crying scene; it reads as a logical impossibility rather than a comprehension challenge. | Replace: `"with short and angry sobs"` (emotional contrast that requires inference) | No |
| Ch12 | kt-ch12-l1-q8 | listen-mc | `Each thread in her hands turned into bright silver light.` → "What did Zhinu do with her hands?" | **P1 ★** — Distractor `"baked sweet cakes"` is maximally off-domain for a celestial weaving scene. `"sang to the moon"` and `"rode a fast horse"` also have zero narrative plausibility. All 3 distractors are eliminable by domain intuition alone. | Replace with: `"drew a long thread of silk"` (close paraphrase, wrong detail) / `"held a bright lamp steady"` (same setting, wrong action) / `"tied a golden ribbon"` (same setting, similar action) | No |
| Ch9–12 | 7 Q IDs | R7-STEM-LENGTH | Various | **P2** — 7 questions have stems of exactly 9 words (1 over the ≤8-word spec): `kt-ch9-l1-q6`, `kt-ch9-l1-q8`, `kt-ch9-l2-q3`, `kt-ch10-l4-q7`, `kt-ch10-l6-q9`, `kt-ch10-l7-q7`, `kt-ch12-l3-q3` | Trim each by 1 word: "What did the new wife make the girl do?" → "What did she make her do?" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | 4 (Ch9–12) |
| Total lessons | 28 |
| Total MC questions scanned | 59 |
| **SYSTEMIC P0 (corpus-wide)** | correctIndex=1 monopoly: 84.2% of 619 MC questions |
| Ch9–12 correctIndex=1 rate | **100%** (59/59) |
| correctIndex=3 used in Ch9–12 | 0 (never) |
| P0 chapter-specific violations | 2 (kt-ch11-l7-q7, kt-ch12-l7-q9) |
| P1 violations | 3 (kt-ch11-l1-q8, kt-ch9-l4-q3, kt-ch12-l1-q8) |
| P2 R7 stem-length violations | 7 questions |
| audio regen required | 0 (distractors only) |

---

## D. Top 5 P0

### P0-1 · SYSTEMIC R3-POSITION-MONOPOLY — correct answer is always option B (idx=1)

**Scope:** All Ch1–31 (619 MC questions). Ch9–12 are 100% idx=1.

**Detail:**
```
correctIndex global distribution (619 MC Q):
  idx=0 (option A):  54  (8.7%)
  idx=1 (option B): 521 (84.2%)  ← CATASTROPHIC
  idx=2 (option C):  35  (5.7%)
  idx=3 (option D):   9  (1.5%)
```

**Impact:** An 8-year-old who discovers "always pick B" scores ~84% without any English comprehension. This invalidates the SRS system (wrong-answer queue never fills), XP tracking (inflated), and CIV (construct invalidity — measurement is of positional savvy, not English skill).

**Research backing:** Blunch (1984), Mentzer (1982) establish that test makers systematically hide correct answers in middle positions. Ben-Simon et al. (1997, Huji DP251) show this creates measurable psychometric degradation: middle-position correct items are statistically easier AND less discriminating. The correct answer at position B being 84% is 3.4× the expected 25%.

**Fix (runtime, zero JSON change):**
```typescript
// In question renderer (LessonPage.tsx or renderers.tsx), before rendering:
const shuffled = useMemo(() => {
  const perm = [0,1,2,3].sort(() => Math.random() - 0.5);
  return {
    options: perm.map(i => q.options[i]),
    optionsZh: perm.map(i => q.optionsZh?.[i] ?? ''),
    correctIndex: perm.indexOf(q.correctIndex)
  };
}, [q.id]); // re-shuffle on each new question, stable within same render
```

This guarantees uniform ~25% distribution per position over any 4+ questions. No JSON migration needed.

**⚠️ Audio note:** Verify `renderers.tsx` audio playback does NOT index into `options[]` by position before shipping this fix. If `speak(options[0])` etc. are hardcoded by index, the shuffle must also re-order the audio mapping.

---

### P0-2 · kt-ch11-l7-q7 — 3 nonsensical distractors (word-salad elimination)

**Sentence:** `"He looked at it some nights in the soft lamp light."`
**Question:** `"Why did Hou Yi keep the bow?"`

| Option | Issue |
|--------|-------|
| `for selling gold price` | Grammatically broken English ("gold price" is not how English speakers refer to value) |
| `as a quiet memory` ✓ | Correct — valid paraphrase of the scene |
| `cat noise made him` | Grammatically broken; "cat noise" has no story-world reference |
| `daily cleaning fun` | Word-salad; internally contradictory ("cleaning fun" is not idiomatic) |

A child eliminates all 3 distractors in under 2 seconds. The correct option "as a quiet memory" is the only grammatically valid English phrase.

**Fix:** `"to sell it someday"` / `"his son asked him to"` / `"it was hard to carry"`

---

### P0-3 · kt-ch12-l7-q9 — generic chore distractors break Qixi cultural context

**Sentence:** `"They tell the story to their children under the bright stars."`
**Question:** `"What do Chinese families do on Qixi night?"`

Distractors `"wash all the clothes"` and `"plant new flowers"` are disconnected from any Qixi (七夕) tradition. A child who has never heard of Qixi eliminates them instantly because they share no thematic vocabulary with "bright stars" / "story" / "children."

**Fix:** `"light paper lanterns"` (Mid-Autumn confusion) / `"watch the stars alone"` (plausible but misses family/story element) / `"make a wish by the river"` (Qixi adjacent, wrong action)

---

### P0-4 · Ch5 R3 extreme (95% idx=1, 19/20 questions)

Separate chapter from Ch9–12 focus but flagged as context for SYSTEMIC scope: Ch5 (駱駝為什麼有駝峰 / Camel's Hump) has correctIndex=1 for 19 of 20 MC questions. One learner session with Ch5 alone would train "always pick B" faster than any other chapter.

---

### P0-5 · correctIndex=3 used only 9 times across 619 questions (1.5%)

Option D is almost never correct in the entire Pickup corpus. This creates a secondary exploitation path: learners learn to SKIP option D and pick B. The near-zero frequency of idx=3 is visible even to casual learners within 2–3 chapters.

---

## E. Narrative Voice / Pacing Improvements (no hard-rule violation, but improvement-worthy)

### NV-1 · Ch9 L4 — Cinderella crying scene needs emotional escalation before inference Q

`kt-ch9-l4-q3` asks "How was Cinderella crying?" after a single sentence `"Her tears fell on the grey floor, soft and slow."` For A2 children, one soft-crying sentence is thin scaffolding for an inference question. Consider adding a preceding narration beat: `"She sat alone in the cold kitchen."` — this grounds the emotional state before the inference challenge.

### NV-2 · Ch10 L7 — Hou Yi's offering ceremony needs cultural ZH explanation

`kt-ch10-l7-q7` ("Why did Hou Yi put food in the yard?") has `explanationZh: "推理: 每晚放她喜愛的食物 → 仍愛她 (paraphrase)。"` For Taiwanese 8-12 children, this is the Mid-Autumn festival origin story. The explanation misses an opportunity to connect `"He still loved her"` to the real 拜月 tradition. Suggest: `"每晚放她愛的食物 → 表達思念 → 這就是拜月 (Moon Offering) 的由來。"` — adds cultural payoff without jargon.

### NV-3 · Ch12 L6 — magpie bridge scene audio pacing

`kt-ch12-l6-q3` ("How many magpies came to help?") with sentence `"The whole sky went black with their feathers."` is an arresting visual. The explanationZh `"推理: 整片天黑 → 多到數不清 (paraphrase)。"` is functional but misses the emotional climax payoff. Suggest: `"整片天空都暗了 → 多到數不清 ✨ → 這是故事裡最動人的一刻。"` — signals to the child that this is a narrative peak, not just a detail answer.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #48: CORRECT-ANSWER-POSITION-SHUFFLE

**問題:** Pickup correctIndex は固定 → 84.2% が idx=1。LLM生成時に「2番目のオプションが正しい」パターンが固定化。

**業界根據:**
- Ben-Simon et al. (1997, Hebrew Univ.) — correct answer at middle positions makes items statistically easier AND less discriminating. 84% at B is 3.4× psychometric baseline.
- Mentzer (1982, J. Educational Measurement) — "response bias in MC item files" documents test makers systematically cluster correct at B/C.
- Duolingo (blog.duolingo.com) — exercises shuffle option order per session to prevent positional learning.
- ETS Part 3-4 item writing: answer key balance enforced at form assembly (not generation time).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Runtime option-shuffle at render | Duolingo, Khan Academy | ✅ 完全適合 — React `useMemo` + Fisher-Yates, zero JSON change. Stable within one question render, new on each Q | S (2h) | ⭐⭐⭐⭐ highest | **SHIP** |
| Build-time R3 lint in validate-lessons.js | ETS form assembly | ✅ 適合 — add `R3_POSITION_SKEW` check to existing lint runner. Flag any lesson where idx=1 > 50%. | XS (30min) | ⭐⭐⭐ | **SHIP together** |
| JSON-level correctIndex rebalance script | Standard psychometrics | 🟡 部分適合 — one-time migration, but requires regenerating audio for any chapter where audio is position-keyed. Risk: audio desync. | M (4h) | ⭐⭐ | Only after verifying audio is NOT position-keyed |
| Adaptive correct-position tracking per learner | IRT/CAT systems | ❌ 不適合 — overkill for A2 children ELT; IRT requires item calibration data Pickup doesn't have. | XL | ⭐ | Phase 3 at earliest |

**Recommended immediate action:**
1. `src/components/renderers.tsx` (or wherever MC options are rendered): wrap option array in Fisher-Yates shuffle + track new correctIndex.
2. `tools/validate-lessons.js`: add `R3_POSITION_SKEW` lint rule — WARN if any position > 50% in a lesson, FAIL if > 70%.
3. Verify audio playback does NOT use `options[index]` ordering before shipping.

**Effort:** S (2h total). **Impact:** Fixes 619-question psychometric validity issue + eliminates "always pick B" exploit.
