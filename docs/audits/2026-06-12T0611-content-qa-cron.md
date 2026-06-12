# Content QA — 2026-06-12 06:11 UTC

Today's angle: **#12 — explanationZh story-voice vs jargon**
Focus: Ch1–5 (fairy-tale core) + Ch10–14 (mythology batch), spot-check Ch0 as positive benchmark

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 268  (warn-only; X8_R2_LENGTH_WARN)
No schema errors. All 32 files parse cleanly.
```

**Angle #12 is NOT currently linted.** 0/1169 jargon violations auto-detected by CI.

---

## B. Violation table

### Overview — jargon rate by chapter

| Scope | Jargon entries | Total ZH | Rate |
|-------|---------------|----------|------|
| Ch0 (benchmark — story voice ✅) | 3 | 78 | 4% |
| Ch1–7 (fairy-tale core) | 332 | 539 | 62% |
| Ch8–14 | 262 | 539 | 49% |
| Ch15–31 | 576 | 1324 | 43% |
| **All chapters** | **1169** | **2472** | **47%** |

Five distinct jargon patterns detected:

---

### Pattern J1 — `本節新單字 (左中右英):` vocab-header (217 instances, every chapter)

Every lesson's first Q uses an academic section-header format with the authoring instruction `(左中右英)` visible to the child.

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|--------------|
| ch1 | kt-ch1-l1-q1 | `本節新單字 (左中右英): 🔑 river = 河 🔑 look = 看…` | Author layout instruction leaked; academic header | `奶奶今晚說了幾個新詞，先記下來：🔑 river = 河 …` | No |
| ch3 | kt-ch3-l1-q1 | `本節新單字 (左中右英): 🔑 fast = 快 🔑 slow = 慢…` | Same pattern | Same fix | No |
| ch10 | kt-ch10-l1-q1 | `本節新單字 (左中右英): 🔑 sun = 太陽 🔑 sky = 天空…` | Same pattern | Same fix | No |

**Scale: affects ALL 217 lesson-q1 vocab intro entries across 32 chapters.**

---

### Pattern J2 — `推理: X → Y → 答 No/Yes` inference-chain (652 instances)

"推理" (inference/reasoning) is TOEIC exam-prep terminology. Arrow chains are teacher logic-diagram format. "答 No/Yes" is test instruction language. All three are anti-patterns for 8–12 child learners per Cambridge ELT assessment guidelines (2020).

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| ch1 | kt-ch1-l1-q4 | listen-tf | `推理:安靜的家 → 沒小孩聲 → 答 No` | Exam jargon; test-instruction format | `家裡好安靜——沒有小孩的聲音呢。` | No |
| ch1 | kt-ch1-l3-q3 | listen-tf | `推理:雙手顫抖抱出來 → 真的有嬰兒 → 答 Yes` | Same | `奶奶和老公公抱出了一個小嬰兒！真的！` | No |
| ch3 | kt-ch3-l1-q4 | listen-tf | `推理:沒人回話 + 低頭 → 不喜歡聽 → 答 No` | Same | `烏龜低著頭走，沒有人說話——他不開心。` | No |
| ch4 | kt-ch4-l1-q4 | listen-tf | `推理:獨自 + 沙漠中間 → 附近沒別人 → 答 No` | Same | `沙漠好大，駱駝一個人站在那裡，沒有別人。` | No |
| ch10 | kt-ch10-l1-q4 | listen-tf | `推理: 沒雨沒綠草 → 生活很苦 → 答 No` | Same | `沒有雨，草都枯了——大家的日子很苦。` | No |
| ch15 | kt-ch15-l2-q3 | listen-tf | *(pattern continues across Ch15–31)* | Same | Same conversion formula | No |

---

### Pattern J3 — `(paraphrase)` metadata annotation leak (347 instances, Ch8–31)

The author-facing quality note "(paraphrase)" — written to confirm the explanationZh is a semantic paraphrase not a verbatim echo — was embedded directly in the child-facing `explanationZh` field. Children see the English word "paraphrase."

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|--------------|
| ch8 | kt-ch8-l1-q6 | `推理: own home → separate house (paraphrase)。` | English authoring note visible to child | Strip `(paraphrase)` from all 347 entries | No |
| ch8 | kt-ch8-l1-q8 | `推理: chase → go after, animals → creatures (paraphrase)。` | Same + full English in ZH field | Same | No |
| ch9 | kt-ch9-l1-q6 | `推理: 漂亮衣服 + 手很軟 → 輕鬆又富有的生活 (paraphrase)。` | "(paraphrase)" note leaks | Strip suffix | No |
| ch9 | kt-ch9-l2-q3 | `推理: sweep + cook + carry water → 一堆家事 (paraphrase)。` | English in ZH + authoring note | Rewrite: `灰姑娘每天掃地、煮飯、提水——家事做不完。` | No |

---

### Pattern J4 — `主旨 = X` main-idea label (30 instances, Ch1–3, Ch7, Ch28)

"主旨" is TOEIC/reading-comprehension exam vocabulary. It signals test-prep mode, not bedtime story mode.

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|--------------|
| ch1 | kt-ch1-l2-q10 | `主旨 = 桃子自行裂開。` | Exam-style main-idea header | `桃子自己裂開了！連奶奶說到這裡也嚇了一跳！` | No |
| ch3 | kt-ch3-l1-q10 | `主旨 = 兔子在大家面前笑烏龜。` | Same | `兔子在大家面前嘲笑烏龜——多沒禮貌！` | No |
| ch3 | kt-ch3-l3-q10 | `主旨 = 兔子決定睡覺。` | Same | `兔子覺得自己一定贏，就躺下來睡覺了。` | No |
| ch7 | kt-ch7-l2-q7 | *(主旨 × 7 in Ch7)* | Same | Narrative echo | No |
| ch28 | kt-ch28-l5-q8 | *(主旨 × 7 in Ch28)* | Same | Narrative echo | No |

---

### Pattern J5 — bare `→` arrow chains (270 instances)

Even without "推理:" prefix, flowchart-style chains like `帶柴回家 → 砍柴。` or `兔子笑著問 → 笑他。` are teacher logic-diagram language, not storytelling voice.

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|--------------|
| ch1 | kt-ch1-l1-q6 | `帶柴回家 → 砍柴。` | Arrow-chain deduction | `老公公每天去山上，把柴帶回家。` | No |
| ch1 | kt-ch1-l2-q5 | `盯著看 = 驚奇。` | Equation-style definition | `他們盯著那顆桃子看，眼睛都不敢眨。` | No |
| ch3 | kt-ch3-l1-q8 | `兔子笑著問 → 笑他。` | Same | `兔子笑著問，是在嘲笑烏龜喔。` | No |
| ch3 | kt-ch3-l2-q5 | `站終點線喊贏家 → 當裁判。` | Same | `老狐狸站在終點線，負責宣布誰是贏家。` | No |
| ch6 | *(24 instances)* | Multiple | Ch6 worst: 58% arrow-chain rate | Narrative rewrites | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total explanationZh entries audited | 2,472 |
| Pattern J1 vocab-header | 217 (9%) |
| Pattern J2 inference-chain | 652 (26%) |
| Pattern J3 (paraphrase) leak | 347 (14%) |
| Pattern J4 main-idea | 30 (1%) |
| Pattern J5 bare arrow | 270 (11%) |
| **Total jargon entries** | **1,169 (47%)** |
| Story voice (clean) | 1,303 (53%) |
| Ch0 jargon rate (positive benchmark) | 4% |
| Ch1–31 average jargon rate | 47%+ |
| Highest-jargon chapters | Ch6 (58%), Ch28 (58%), Ch7 (49%) |

**Industry verdict (Cambridge ELT 2020 + Duolingo 2026):** Arrow-chain inference notation is an anti-pattern for 8–12 child learners. Ch0 (written with Mochi/奶奶 character voice) is the internal gold standard.

---

## D. Top 5 P0

| # | Q ID | type | violation summary | 修法 | ROI |
|---|------|------|------------------|------|-----|
| **P0★★** | ALL l*-q1 (217 entries) | vocab-header J1 | `本節新單字 (左中右英):` — authoring layout instruction visible to child; affects every chapter's lesson q1 | Replace header with `奶奶說了幾個新詞：` | ★★★ (bulk fix, all chapters) |
| **P0★★** | kt-ch8-l1-q6, q8 + 347 total | infer-para J3 | `(paraphrase)` authoring note leaked into child-facing explanationZh in all Ch8–31 entries | Regex strip ` (paraphrase)` from all 347 entries | ★★★ (scripted 1-pass fix) |
| **P0★** | kt-ch1-l1-q4 + 652 total | inference-chain J2 | `推理: X → Y → 答 No` — exam-prep jargon dominates 26% of all explanationZh | Batch rewrite: `記得嗎？奶奶說…` warm narrative; remove `→` and `推理` | ★★★ (story pivot alignment) |
| **P0★** | kt-ch1-l2-q10, kt-ch3-l1-q10 + 30 total | main-idea J4 | `主旨 = X` TOEIC exam term visible to 8-12 children | Replace with story-beat echo: `這個部分說的是：X` | ★★ |
| **P1** | kt-ch1-l1-q6, kt-ch3-l2-q5 + 270 total | arrow-bare J5 | Bare `→` chains: flowchart teacher language, not grandma voice | Full sentence story re-narration | ★★ |

---

## E. Narrative voice / pacing improvements (3 items, angle-12 bonus)

1. **Ch0 → Ch1 voice continuity break**: Ch0 uses `我是 Mochi。別擔心，我們慢慢來。` (character voice). Ch1-l1-q1 opens with `本節新單字 (左中右英):` (academic). The transition is jarring for a child playing back-to-back lessons. Ch1 should open: `奶奶翻開書，開始說第一個故事了…` or similar warm bridge.

2. **Answer-correct feedback voice gap**: explanationZh entries triggered after a correct answer should feel like a mini-reward, not a textbook gloss. Pattern: `帶柴回家 → 砍柴。` (5 chars, zero warmth). Target: `對了！老公公每天去山上砍柴，帶回家用。` (adds story context + affirmation trigger).

3. **Listen-TF explanation pacing**: For `listen-tf` questions, explanationZh is shown post-reveal after the child answers Yes/No. Currently `推理: X → Y → 答 No` — this renders the inference the child just made explicit *as an exam chain*. Better pacing: show the story moment, not the logic. `沒有小孩的笑聲，家裡很安靜——答案是「No」。` (story beat → answer confirmation, not exam formula).

---

## 🔬 Architecture Recommendation #25 (對齊業界 2026)

**ARCH-REC #25: `EXPLAIN_ZH_VOICE_LINT` — Story-Voice Gate for explanationZh**

### Industry basis

| Source | Finding | URL |
|--------|---------|-----|
| Duolingo "Explain My Answer" 2026 | Uses conversational AI (GPT-4 generated) — personalized dialogue, never rigid exam notation | lingoly.io/duolingo-stories/ |
| Cambridge ELT Assessment for Young Learners 2020 | Recommends qualitative, safe-environment feedback; explicit inference notation is harmful for child confidence | cambridge.org (CambridgePapersInELT_AssessmentForYLs) |
| Lingokids (ages 2-8) | Celebratory animations + gentle retry, zero academic language | testprepinsight.com/memrise |
| Memrise 2026 | Implicit difficulty adaptation, no reasoning chains shown to learner | testprepinsight.com/memrise |

### Pickup 適配分析

| Pattern | Pickup 適配 | Verdict |
|---------|-----------|---------|
| Conversational post-answer explanation (Duolingo model) | ✅ Direct fit — explanationZh is already the right surface; only voice needs to change | ✅ 完全適合 |
| No explicit inference notation for children | ✅ Pickup is 8–12 children; `推理: A→B` is adult exam-prep anti-pattern | ✅ 完全適合 |
| Strip authoring metadata from user-facing fields | ✅ `(paraphrase)` and `(左中右英)` are already marked as author notes by their phrasing | ✅ 完全適合 |
| Dynamic/AI-generated explanations per child | 🟡 Partially applicable — Pickup uses pre-authored JSON, AI generation would add cost and latency | 🟡 Future: consider at Ch9+ content refresh |

### Recommended lint addition to `validate-lessons.js`

```js
// EXPLAIN_ZH_VOICE_LINT — detect jargon in explanationZh
const JARGON_TOKENS = ['推理', '主旨', '本節新單字', '(paraphrase)', '(左中右英)'];
for (const q of lesson.questions) {
  if (!q.explanationZh) continue;
  for (const tok of JARGON_TOKENS) {
    if (q.explanationZh.includes(tok)) {
      issues.push(`${q.id}: EXPLAIN_ZH_VOICE_WARN — jargon token "${tok}" in explanationZh`);
    }
  }
}
```

- **Initial mode**: warn-only (same as X8_R2_LENGTH_WARN)
- **Flip to error**: after first batch-fix pass clears the 1169 violations
- **File**: `tools/validate-lessons.js` — add ~15 lines after existing mirror-lint section

### Effort / ROI

| Item | Effort | ROI |
|------|--------|-----|
| Add lint rule to validate-lessons.js | S (30 min) | ★★★ (catches 1169 existing + all future regressions) |
| Scripted fix: strip `(paraphrase)` from all 347 entries | S (1 hr scripted sed/Python) | ★★★ |
| Template fix: replace `本節新單字 (左中右英):` header (217 entries) | M (1 hr batch) | ★★★ |
| Batch rewrite `推理: X → Y → 答 No` (652 entries) | L (LLM batch rewrite, 2-3 hr) | ★★★ |

**Recommendation**: Ship lint rule first (S, no content risk), then batch-fix `(paraphrase)` strip (S, scripted, zero narrative change), then template-fix vocab header, then batch-rewrite inference chains with LLM.

---

*5-agent audit verdict: story-voice regression is systemic (47%), not isolated. Root cause is content generation template created for adult exam-prep audience pre-B.231 pivot. Ch0 (4% jargon) is the internal gold standard. Batch fix is safe — no audio regen needed, only explanationZh text changes.*
