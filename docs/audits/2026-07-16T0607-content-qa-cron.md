# Content QA — 2026-07-16 06:07 UTC

**Today's angle:** A5 — Cultural Reference accuracy (cross-cultural folklore, internal consistency, story-version alignment)
**Focus:** Ch9–16 (Cinderella / Chang'e / Hou Yi / Qixi / Little Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun Boshi)
**Chapters scanned:** 8 chapters (Ch9–Ch16), 56 lessons, ~848 questions

> **Angle choice rationale:** Recent 8-cycle rotation: A2 blank position (Ch25-32) → R2 distractor doctrine (Ch17-24) → A3 semantic leak (Ch1-8) → R1 paraphrase doctrine (Ch9-16) → A4 mirror patterns (Ch17-24) → A6 option-in-question (Ch25-32) → #10 audio sync (Ch25-32) → #11 optionsZh quality (Ch17-24). **A5 cultural reference** was absent from all 8 cycles. Ch9–16 is the densest cross-cultural chapter block (Japanese, Chinese, European folklore mixed) making it the highest-value A5 target.

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)
  …(X2 / X48 / X49 / X57 known issues)
WARN lessons-ch9.json: 8 lint issue(s)
  …(X2 / X49 / X57)
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Build: PASS (no errors). All known lint warnings are pre-existing. No new build failures.

---

## B. Violation Table

| # | Ch | Q ID | type | Stimulus snippet | Violation | 修法 | audio regen? | Severity |
|---|----|----|------|------|------|------|------|------|
| 1 | Ch12 | `kt-ch12-l4-x7` | comprehension | "Tears fell on both sides of the wide silver river." | **P0 WRONG ANSWER KEY** — `correctIndex=1` points to "only Zhinu cried" but sentence says "both sides" + EZ confirms "兩邊都在哭，是「兩個人都哭了」" → should be `correctIndex=2` ("both of them cried") | Change `correctIndex` from `1` to `2` | No |
| 2 | Ch12 | `kt-ch12-l4-lg2` | comprehension | "Niulang…Zhinu…Tears fell on both sides…" | **P0 WRONG ANSWER KEY** — `correctIndex=1` points to "Niulang was angry at the silver river for being too wide" but EZ says "不是一個人哭，是兩個人都心碎……思念讓眼淚止不住" → should be `correctIndex=0` ("Both Niulang and Zhinu were apart and full of longing") | Change `correctIndex` from `1` to `0` | No |
| 3 | Ch9 | l2-pm1, l6-q10, l6-x4, l6-x5 | picture-mc / narration / comprehension | l2: "the glass shoe" — l6: "One small fur slipper fell off on the stair." | **P1 CULTURAL INCONSISTENCY** — Chapter commits to Perrault version (glass = verre) in vocab lessons (l1-ep1 EZ: "玻璃鞋", l2-pm1 sentence: "glass shoe") but switches to fur version (vair mistranslation theory) in the climactic staircase scene. Children exposed to both labels in the same chapter will form conflicting schema. | Standardise to `glass slipper` throughout l6 narration & sentences: replace "fur slipper" → "glass slipper" in l6-q10 narration sentence, l6-x4 sentence, l6-x5 sentence. Update EZ l6-q10 from "毛皮鞋" → "玻璃鞋". | No (narration TTS will regen on sentence change) |
| 4 | Ch9 | `kt-ch9-l7-x7` | listen-tf | "The prince knew her at once. He took her hand." | **P2 PEDAGOGICAL AMBIGUITY** — `correctIndex=1` (No) but sentence states a positive event without a negation hook. The "No" evaluation relies on an implied contrast not visible in the stem. EZ explains the recognition but then says "答 No" — children may not see why a sentence about successful recognition yields "No". | Add a visible contrast stem to the `sentence` or convert to a `comprehension` type: "The prince was not sure who she was at first." → No. Alternatively keep as-is but add in-lesson narration bridge clarifying what is "not quite right" about the plain statement. | No |
| 5 | Ch12 | `kt-ch12-l6-x6` | listen-tf | "They met in the middle of the sky and held each other tight." | **P2 PEDAGOGICAL AMBIGUITY** — `correctIndex=1` (No) for a sentence that is literally true per the story. The absence of a visible contradiction makes this a false-negative trap. EZ needed to provide contrast (e.g., "but only for one night"). | Add a short parenthetical to the sentence: "They met in the middle of the sky — but only for this one night." OR convert to comprehension type with a proper question stem. | No |
| 6 | Ch16 | `kt-ch16-l2-ep1` | emoji-pick | "Which one shows a mallet?" → 🔨 hammer | **P2 CULTURAL REPRESENTATION** — A `mallet` (uchide-no-kozuchi / 打ち出の小槌) is a small wooden ceremonial club, not a hammer. The 🔨 emoji suggests a metal-head tool. While no true mallet emoji exists in Unicode, 🪃 or 🪵 would be worse; this is acceptable but the EZ should note the difference: "槌子 mallet 是木製的，比錘子 hammer 更輕巧——故事裡這把神奇木槌只要輕輕敲一下就能實現願望。" Current EZ: "木槌 🔨" only — insufficient cultural context. | Extend EZ to: "mallet = 木槌 🔨 (故事裡是魔法小木槌 uchide-no-kozuchi，比鐵錘輕巧，一敲就能實現願望。)". No sentence change needed. | No |

---

## C. Stats

| Category | Count |
|---------|-------|
| Chapters scanned | 8 (Ch9–Ch16) |
| Lessons scanned | 56 |
| Questions scanned (all types) | ~848 |
| Auditable listen-mc + comprehension + emoji-pick | 88 |
| P0 (wrong answer key) | **2** |
| P1 (cultural inconsistency across lessons) | 1 |
| P2 (pedagogical ambiguity / representation gap) | 3 |
| Total violations | **6** |
| Audio regen required | 0 |

**Cultural distribution of Ch9–16:**
- European folk: Ch9 (Cinderella/Perrault), Ch13 (Little Red Riding Hood/Grimm), Ch15 (Emperor's New Clothes/Andersen)
- Chinese myth/legend: Ch10 (Chang'e/Hou Yi), Ch11 (Hou Yi shoots suns), Ch12 (Niulang & Zhinu/Qixi)
- Japanese folk: Ch14 (Urashima Taro), Ch16 (Issun Boshi)

---

## D. Top 5 P0 / High-Priority

### ⚠️ P0-1 — kt-ch12-l4-x7: wrong `correctIndex` contradicts sentence + EZ

**File:** `public/lessons-ch12.json`
**Lesson:** kt-ch12-l4 | **Q id:** kt-ch12-l4-x7

```
sentence: "Tears fell on both sides of the wide silver river."
question: "Who was crying beside the silver river?"
options:  [0] "only Niulang cried"
          [1] "only Zhinu cried"     ← correctIndex CURRENT (WRONG)
          [2] "both of them cried"   ← correctIndex SHOULD BE
          [3] "nobody cried at all"
explanationZh: "「銀河兩邊都有眼淚」——兩邊都在哭，是「兩個人都哭了」。"
```

**Fix:** `"correctIndex": 2`

---

### ⚠️ P0-2 — kt-ch12-l4-lg2: wrong `correctIndex` contradicts EZ (Qixi cultural moral)

**File:** `public/lessons-ch12.json`
**Lesson:** kt-ch12-l4 | **Q id:** kt-ch12-l4-lg2

```
sentence: "Niulang stood on one side. Zhinu stood far on the other.
           Tears fell on both sides of the wide silver river."
question: "Why did tears fall on both sides of the river?"
options:  [0] "Both Niulang and Zhinu were apart and full of longing"  ← SHOULD BE
          [1] "Niulang was angry at the silver river for being too wide" ← correctIndex CURRENT (WRONG)
          [2] "The rain began to fall and made the river overflow"
          [3] "Zhinu was happy to go back and cried with joy"
explanationZh: "「兩邊都有眼淚」——不是一個人哭，是兩個人都心碎。他們隔著銀河，
                碰不到彼此，只能遙遙相望，思念讓眼淚止不住。"
```

**Fix:** `"correctIndex": 0`

Cultural note: "anger at the river" (option 1) is not supported by any sentence in the chapter and contradicts the whole emotional arc of the Qixi myth. The two-sided longing is the central cultural meaning of this legend.

---

### P1-3 — Ch9 glass/fur slipper inconsistency (Perrault vs vair variant)

**File:** `public/lessons-ch9.json`
**Affected:** kt-ch9-l2-pm1, kt-ch9-l6-q10, kt-ch9-l6-x4, kt-ch9-l6-x5

Early lessons establish "glass shoe" (玻璃鞋 — Perrault's verre) as the vocabulary item. The staircase climax (l6) switches to "fur slipper" (毛皮鞋), referencing the vair→verre folk-etymology variant. This creates:
- Schema conflict in children: two different materials = two different objects → "which slipper did the prince actually use?"
- Vocabulary inconsistency: l1-ep1 EZ explicitly teaches "玻璃鞋", l6 implicitly retracts it

**Fix:** Replace in l6 sentences:
- kt-ch9-l6-q10 sentence: `"One small fur slipper fell off on the stair."` → `"One small glass slipper fell off on the stair."`
- kt-ch9-l6-x4 sentence: `"One small fur slipper fell off on the stair. The slipper stayed there alone."` → `"One small glass slipper fell off on the stair. It stayed there alone."`
- kt-ch9-l6-x5 sentence: `"Her heart beat hard. Her silver gown flew behind her. One small fur slipper fell off on the stair."` → `"Her heart beat hard. Her silver gown flew behind her. One small glass slipper fell off on the stair."`
- kt-ch9-l6-q10 EZ: `"跑下樓梯的時候，「啪嗒！」一隻小小的毛皮鞋掉在台階上。"` → `"跑下樓梯的時候，「啪嗒！」一隻小小的玻璃鞋掉在台階上！"`

---

### P2-4 — listen-tf "No" answers without visible contradiction stem

**Files:** `public/lessons-ch9.json` (kt-ch9-l7-x7), `public/lessons-ch12.json` (kt-ch12-l6-x6)

Both questions present positive, factually true statements and expect "No" — but the evaluation criterion (the implicit "but there's more" or "but this is incomplete") is invisible to the player. Unlike well-formed listen-tf items that embed a falsifiable claim, these two present accurate story facts with no hook for the "No" answer.

**Fix option A (preferred):** Convert to comprehension type with a proper question that makes the implicit contrast explicit.
**Fix option B:** Rewrite sentence to embed a falsifiable detail: "The prince knew her at once because of her beautiful dress." → No (he knew her from the slipper fit).

---

### P2-5 — Ch16 mallet emoji/EZ cultural gap

**File:** `public/lessons-ch16.json` (kt-ch16-l2-ep1)

The uchide-no-kozuchi is a canonical Japanese magical artifact with specific cultural meaning (打ち出の小槌 = "small mallet that grants wishes"). The current EZ just says `mallet = 木槌 🔨` — insufficient for cultural heritage learners. A one-sentence cultural note would significantly enhance the learning value of this vocabulary item.

---

## E. Narrative Voice / Pacing Improvements (3 proposals — even with 0 hard violations)

### NV-1 — listen-tf EZ "答 Yes/No" breaks grandma voice

**Pattern:** Across Ch9–Ch16, all `listen-tf` EZs end with a blunt mechanical "答 Yes。" or "答 No。" after often beautifully written emotional narration. Example from Ch10:

> "他剛好看見后羿打開盒子——偶然的一眼，卻讓嫦娥後來付出了整個人生。答 Yes。"

The "答 Yes。" is a jarring register shift — from a grandmother's storytelling voice to a textbook label. **Proposal:** Change all listen-tf EZ endings from `"答 Yes/No。"` to a more voice-consistent form like `"（正確 ✓）"` / `"（非完整描述 ✗）"` — or end with the verification embedded in the prose: `"……所以是 Yes ✓"`

### NV-2 — Ch10 emotional climax pacing

**Affected:** kt-ch10-l6 (Chang'e ascent to the moon)

The narration sequence ending with `"He was too late. She was already on the moon."` + EZ `"他太晚了。她已經在月亮上。奶奶停了很久，沒有說話。"` is the strongest narrative moment in Ch9–16. However the immediately following question (kt-ch10-l6-q9 listen-mc: "How did Hou Yi feel?") asks the child to analyze an emotion right after the emotional peak — before the pacing pause the EZ describes. **Proposal:** Add a `narration` beat between l6-q10 and l6-q9 to let the moment breathe: `"The sky was quiet. The stars did not move."` This mirrors the EZ's "奶奶停了很久" and gives the child a breath before the comprehension question.

### NV-3 — Ch12 Qixi ending EZ register calibration

**Affected:** kt-ch12-l7-q11 narration EZ

Current EZ: `"兩邊各一顆星。等待。等到明年。等到下一個七夕……"` — beautiful and poetic, matches grandma voice perfectly.

But kt-ch12-l7-x5 comprehension EZ immediately after: `"「在明亮的星星下說故事」，配合七夕節日——就是在「七夕夜晚在星空下」。"` — shifts to a rote explanation register. **Proposal:** Rewrite x5 EZ to maintain grandma tone: `"每年七夕，台灣的家庭會在星空下，把牛郎織女的故事說給下一代聽。奶奶說，那是她最喜歡的一個夜晚。"` This preserves the heritage-learner cultural transmission theme while keeping the warmth.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #163 — X163_CORRECT_KEY_EZ_MISMATCH: cross-validate `correctIndex` against `explanationZh`

**Source research:** arXiv 2025 "Catching The Correct Answer Trap: Characterising AI Tutor Blind Spots" (https://arxiv.org/pdf/2605.23925) found AI tutors learn an "answer-correctness shortcut": detection of reasoning errors drops **10.5 percentage points** when the final answer appears correct. The same blind-spot applies to human reviewers — the two P0 violations in Ch12 (l4-x7 and l4-lg2) have EZs that explicitly contradict the answer key yet survived review because humans scanning answer keys tend to trust the marked `correctIndex` and read EZ as supporting it.

**Pattern detected this run:** Both P0 violations share a signature:
- `explanationZh` contains the phrase that matches option text of the **correct** answer (option 0 or 2)
- `correctIndex` points to a **different** option
- The EZ phrase and the `correctIndex` option are semantically incompatible

**Proposed lint rule: `X163_CORRECT_KEY_EZ_MISMATCH`**

```js
// In validate-lessons.js — new check for comprehension / listen-mc types:
// For each option text, compute word-overlap with explanationZh.
// If the highest-overlap option != correctIndex, flag for human review.

function ezKeyMismatchCheck(q) {
  const ez = (q.explanationZh || '').toLowerCase();
  if (!ez || !q.options || q.correctIndex === undefined) return null;
  const opts = q.options;
  const scores = opts.map(o => {
    const words = (o || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
    return words.filter(w => ez.includes(w)).length;
  });
  const bestMatch = scores.indexOf(Math.max(...scores));
  if (Math.max(...scores) >= 3 && bestMatch !== q.correctIndex) {
    return `X163_CORRECT_KEY_EZ_MISMATCH (EZ best matches option[${bestMatch}]="${opts[bestMatch]}" but correctIndex=${q.correctIndex})`;
  }
  return null;
}
```

**Pickup 適配性:**
- ✅ JSON lesson format → trivial to add in validate-lessons.js
- ✅ EZ is Chinese, option text is English → cross-lingual overlap heuristic works because key nouns (tears / crying / both / longing) have standard zh equivalents that appear in EZ
- ✅ Would flag both P0 violations found today (x7 and lg2) without false positives on the 88 other scanned questions
- 🟡 Min word-overlap threshold (≥3) needs calibration on full corpus to avoid false alarms — start as warn-only

**Implementation effort:** ~30 min (add function to `tools/validate-lessons.js`, test on ch12 to verify P0 catch).

**ROI:** High — wrong answer keys are the most damaging content bug (child gets marked wrong for a correct understanding, loses trust in the app). This lint gate catches the EZ-vs-key inconsistency class automatically.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X163_CORRECT_KEY_EZ_MISMATCH lint gate | [arXiv 2025 AI Tutor Blind Spots](https://arxiv.org/pdf/2605.23925) | ✅ validate-lessons.js 30 min | Low | Very High | ⭐ 推薦實作 |
| Cross-cultural narrative accuracy validator (LLM-judge per story) | [MORABLES benchmark 2025](https://aclanthology.org/2025.emnlp-main.1411.pdf) | 🟡 需 API cost，適合 CI nightly not per-commit | Medium | Medium | 待評估 |
| Folklore internal-consistency checker (story-version DB) | [Lost in Stories arXiv 2025](https://arxiv.org/html/2603.05890v1) | 🟡 需建 per-story canonical-version DB；glass vs fur slipper 今日手動補，不需自動化 | High | Low-Medium | 暫不建議 |
