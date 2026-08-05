# Content QA — 2026-08-05 06:05 UTC

**Today's angle: #12 — explanationZh story-voice vs jargon**
**Focus: Ch0–8 (971 explanationZh entries across 9 chapters)**

> Angle #12 definition: `explanationZh` is the post-answer explanation shown to the learner in Chinese. For a children's ELT story app voiced by grandma, this text must stay in warm story-narrator register ("奶奶說…", "那個晚上…", "就是這個字…"). It must NOT slip into quiz-grader register ("所以答 No", "選項A/B/C/D", "本題考的是") or academic/school jargon ("動詞", "單字", "語法"). This audit scans for register failure: academic jargon, answer-reveal phrasing, option labels, and dead-template exhaustion.
>
> Rotation status: first use of angle #12. Previous 8 cycles: A6-option-in-question, audio-sync, R2-distractor, A5-cultural, A1-obvious, A4-mirror, optionsZh, A3-semantic.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 17 lint issue(s)
  X2_OPTION_LIST_BIAS (3), X49_STIMULUS_REUSE (7), X49B_STIMULUS_REUSE_COMP (3), X57_ANTONYM_PAIR_MIRROR (4)
WARN lessons-ch10.json: 9 lint issue(s)
WARN lessons-ch11.json: 16 lint issue(s)
(full output truncated — all pre-existing, no new schema errors)
Build: PASS
```

explanationZh coverage: **971/971 (100%)** across Ch0–8 — all items have explanations.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | severity | 修法 | audio regen? |
|----|------|------|---------|-----------|----------|------|--------------|
| 7 | kt-ch7-l4-lg2 | comprehension | "腳不碰地是超自然特徵，古代故事常用這個細節暗示「靈界來的存在」。**選項A、C、D**都只是表面原因，只有**B**觸及這個細節的深層含義。" | **#12-OPTION-LABEL**: 明確列出「選項A/B/C/D」— 試卷語言，破壞沉浸感 | P0 | 改「這個細節最特別——腳不碰地暗示著她來自另一個世界。其他三個理由都是表面的，只有這個觸到了故事的深處。」不提選項字母 | No |
| 1–6 | kt-ch{1-6}-l{3-7}-q{X} (listen-tf, 31 instances) | listen-tf | e.g. "媽媽眼中滿是淚水，她捨不得，**所以答 No**。" / "妖怪顫抖著手，指向密室，**所以答 Yes**。" | **#12-ANSWER-REVEAL**: "所以答 Yes/No" = 批改老師語氣，不是奶奶故事語氣。一共 31 個 listen-tf 都有這個模式 | P0 | 把 "所以答 No" 改成情境結尾短句。例："她捨不得放手。" / "桃太郎贏了，妖怪只能投降。" 讓玩家從故事畫面推論，不要直接說答案 | No |
| 8 | kt-ch8-l5-x1 | listen-mc | "chin=下巴、blow=吹、fall=倒、run=跑——這節的**動詞**都超重要！" | **#12-POS-JARGON**: "動詞" = 學校語法術語，不在故事語言裡 | P1 | "chin=下巴、blow=吹、fall=倒、run=跑——三隻小豬的緊張時刻就靠這幾個字！" 不標詞性，情境化 | No |
| 1–3 | kt-ch{1-3}-l{3-7}-q1 (vocab-intro, 15 instances) | tap-pairs / narration | "這節先來認識 4 個**單字**，記住了故事更好聽" / "今晚故事的新**單字**，左邊中文、右邊英文" | **#12-VOCAB-JARGON**: "單字" 是學校教室詞，不是奶奶睡前語氣 | P1 | 改 "先來認識 4 個字，記住了故事更好聽" / "今晚故事要用到的字" — 去掉「單」字即可，其他 template 無需改 | No |
| 2–3 | kt-ch{2-3}-l{3-7}-q1 (9 instances) | tap-pairs | 結尾固定 "**今晚故事的新單字，左邊中文、右邊英文：**" × 9 + "**這 4 個字記住了，故事一開口就聽得懂！**" × 10 | **#12-TEMPLATE-FATIGUE**: 相同句子原文重複 9–10 次，孩子看第三次就知道是固定公式，narrative warmth 歸零 | P1 | 至少 3 種 variant 輪換。建議：① "今晚的字：" ② "奶奶說先把這幾個字記住：" ③ "故事開始前，這幾個字要認識：" 按 lesson 奇偶切 | No |

**narration / listen-tf 型 3 個純 story-voice 改進建議（非 rule-break，屬 pacing 建議）**

| Ch | Q ID | type | 現狀 | 建議加強 |
|----|------|------|------|---------|
| 1 | kt-ch1-l3-q10 | narration | "桃太郎緩緩放下筷子，靜靜望著前方。" | 加情緒內心：「桃太郎放下筷子，心裡已經決定了什麼。」讓玩家感受到他的決心，不只看動作 |
| 2 | kt-ch2-l3-x11 | comprehension | "大母雞、嘎嘎叫的鴨、兇老鵝——農場裡「擠滿了很多吵鬧的動物」，熱鬧得很。" | 站在醜小鴨角度：「這麼多動物對著他叫——對一隻剛來的小鴨來說，太嚇人了。」讓孩子代入感受 |
| 3 | kt-ch3-l6-x9 | comprehension | "嘴巴「啊」地大張——那是震驚的反應，不是「冷靜」，所以答 No。" | 移除"所以答 No" + 改：「嘴巴大大張開——兔子沒想到烏龜真的到了！那一刻，誰也說不出話。」 |

---

## C. Stats

| 維度 | 數值 |
|------|------|
| Ch0–8 items with explanationZh | 971 / 971 (100%) |
| Jargon violations detected | 17 raw → **48 effective** (31 answer-reveal + 15 vocab-jargon + 1 option-label + 1 pos-jargon) |
| 影響章節 | Ch1–8 (Ch0 全通過) |
| listen-tf 中含 "所以答" 比例 | 31 / ~60 listen-tf ≈ 52% |
| Template fatigue (相同文字) | "今晚故事的新單字" × 9, "這 4 個字記住了" × 10 |
| P0 violations | 2 types (option-label × 1, answer-reveal × 31) |

---

## D. Top 5 P0

1. ⚠️ **[P0] kt-ch7-l4-lg2 — 選項A/C/D字眼** — 唯一出現「選項A、C、D」的 explanationZh。TOEIC試卷語氣直接破壞奶奶故事包裝。立即修。
2. ⚠️ **[P0 systemic] listen-tf "所以答 Yes/No" × 31** — 31 個 listen-tf explanationZh 用批改老師語氣結尾。孩子看到「所以答 No」會感覺像做習題不像聽故事。需批次修法（情境化結尾，不說答案）。
3. **[P1] 單字 (vocab-jargon) × 15** — Ch1-3 vocab-intro explanationZh 用「單字」。改「字」即修。
4. **[P1] Template fatigue × 10** — Ch2-3 vocab-intro 10個 lesson 結尾完全相同句子。需3 variant 輪換。
5. **[P2] Ch8 動詞 (POS-jargon) × 1** — 單一 POS label 漏網，情境化替換 30 秒可修。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### 業界掃描摘要

- **Duolingo Stories research** (ERIC EJ1473941, 2026): story-based features outperform drill-based on implicit knowledge gain, but only when feedback stays IN the story register — metalinguistic (grammar-explicit) feedback disrupts narrative immersion and reduces retention in children (age 8–12).
- **AI storytelling app design** (Trigma case study 2026 / LoveToRead 2026): best-in-class children's story apps use consistent "soft narrator voice" throughout — **including post-answer explanations**. Explanations that sound like a teacher grading feel like a register break and hurt engagement.
- **Duolingo feedback research** (ResearchGate 325449071): Duolingo's own feedback was rated "not handled appropriately" when it exposed "expected form" without story context — confirmed the value of story-embedded feedback over bare metalinguistic information.
- **Pickup architecture fit**: `explanationZh` is a free-text field in each lesson JSON, validated by Zod schema but with no voice/register lint. `validate-lessons.js` already has extensible lint rule structure (X48, X49, X57, X244, etc.). Adding `explanationZh` voice lint is a zero-schema-change addition — just new regex rules in the existing lint engine.

### ARCH-REC #244: `X245_EXPZH_VOICE_JARGON_LINT`

**Pattern detected this cycle**: `explanationZh` fields contain quiz-grader language ("所以答 Yes/No", "選項A/B/C/D", "動詞/單字/語法") that breaks the warm grandma story-narrator register. Currently **no lint guard** exists for `explanationZh` voice quality — only for option field structure (X2, X48, X57 etc.).

**Recommendation**: Add `X245_EXPZH_VOICE_JARGON_LINT` rules to `tools/validate-lessons.js`:

```js
// X245 — explanationZh voice jargon lint
const EXPZH_BANNED = [
  { re: /所以答\s*(Yes|No|是|否)/i, code: 'X245a', label: 'answer-reveal (所以答 Yes/No)' },
  { re: /選項\s*[A-Da-d]/, code: 'X245b', label: 'option-label (選項A/B/C/D)' },
  { re: /動詞|形容詞|副詞|名詞|介詞/, code: 'X245c', label: 'POS-jargon (動詞/形容詞…)' },
  { re: /單字/, code: 'X245d', label: 'vocab-jargon (單字)' },
  { re: /語法|文法/, code: 'X245e', label: 'grammar-jargon (語法/文法)' },
  { re: /正確答案是|答案是/, code: 'X245f', label: 'answer-reveal (正確答案是)' },
];
// In per-item lint loop:
if (item.explanationZh) {
  EXPZH_BANNED.forEach(({ re, code, label }) => {
    if (re.test(item.explanationZh)) warn(lessonFile, item.id, `${code}_EXPZH_VOICE_JARGON (${label})`);
  });
}
```

**Pickup 適配**: ✅ 完全適合
- Zero schema change (explanationZh 已是 string field)
- Plugs into existing validate-lessons.js lint loop with same WARN pattern
- X245a (所以答) alone catches 31 P0 instances — immediate ROI
- Effort: ~30 min to add lint + batch-fix Ch1-6 listen-tf explanations

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X245_EXPZH_VOICE_JARGON_LINT — lint gate on explanationZh register | Duolingo Stories research / AI storytelling app design 2026 | ✅ 完全適合 — zero schema change, plugs into existing validate-lessons.js | 30 min lint + 2 hr batch fix | 高 — catches 48 existing violations + prevents regression | ✅ 推薦實作 |
