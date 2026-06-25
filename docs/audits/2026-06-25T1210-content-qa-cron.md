# ⚠️ Content QA — 2026-06-25 12:10 UTC

**Today's angle:** #12 — explanationZh story-voice vs jargon
**Focus:** Ch9–16 (灰姑娘 / 嫦娥奔月 / 后羿射日 / 牛郎織女 / 小紅帽 / 浦島太郎 / 皇帝的新衣 / 一寸法師)

---

## A. validate-lessons.js result

```
OK  lessons-ch9.json   : 7 lessons
OK  lessons-ch10.json  : 7 lessons
OK  lessons-ch11.json  : 7 lessons
OK  lessons-ch12.json  : 7 lessons
OK  lessons-ch13.json  : 7 lessons
OK  lessons-ch14.json  : 7 lessons
OK  lessons-ch15.json  : 7 lessons
WARN lessons-ch16.json : 1 lint issue
  kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")
```

CI guard passes on existing rules. The #12 angle exposes a systemic explanationZh voice regression not covered by validate-lessons.js.

---

## B. Violation Table

### V1 — Formulaic verdict tail (listen-tf 答案是 Yes/No) ← PRIMARY FINDING

Ch9–13: 90–100% of listen-tf `explanationZh` end with the cold formula `"所以答案是 No。"` / `"答案是 Yes。"`.  
Ch14–16: 0–5% (Ch14 has 1 instance; Ch15–16 zero). Two-tier quality gap.

| Ch | Q ID | type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch12 | kt-ch12-l4-x3 | listen-tf | `「從東到西」——不是從北到南，答案是 No。` | 純方向核對，無故事情感錨點 | `「從東到西」——銀河就這樣橫跨了整片天，他怎麼可能從北到南找到她呢。答 No。` | No |
| ch12 | kt-ch12-l3-x6 | listen-tf | `搖頭、緊握牛郎的手——她不願意走，答案是 No。` | 結論乾，無織女情感溫度 | `她搖頭，緊緊握住他的手——那雙手什麼都說了，她不願意走。答 No。` | No |
| ch9 | kt-ch9-l7-q5 | listen-tf | `擠不進腳趾——這雙鞋根本不是姊姊的！答案是 No。` | 感嘆號後接冷收尾 | `腳趾擠不進去——這雙鞋從來就不是她們的。答 No。` | No |
| ch12 | kt-ch12-l5-x3 | listen-tf | `不吃不睡——他根本沒有好好照顧自己，答案是 No。` | 邏輯鏈但無情感共鳴 | `不吃不睡——他只想飛過去，什麼都顧不了了。答 No。` | No |
| ch9 | kt-ch9-l6-x7 | listen-tf | `叮嚀從腦中溜走——她根本沒有記住，所以答案是 No。` | `所以答案是`＝最冷公式 | `叮嚀就這樣從腦中飄走了——舞步太美，她什麼都忘了。答 No。` | No |
| ch9 | kt-ch9-l7-x3 | listen-tf | `推啊拉啊，腳趾擠不進去——根本不容易，答案是 No。` | 重複上一題邏輯，語氣更乾 | `推啊拉啊，還是進不去——這鞋子認得出誰的腳。答 No。` | No |
| ch11 | kt-ch11-l7-x3 | listen-tf | `「天上再也沒有人告訴他們怎麼做」——他不再聽天上的命令，答案是 No。` | 翻譯式複述，無故事情感 | `天上的命令再也傳不到他們了——他們有了自己的天地。答 No。` | No |
| ch10 | kt-ch10-l7-x7 | listen-tf | `「once each year（每年一次）」——不是每天都這樣，只有一年一次，所以答案是 No。` | 括號英文標注洩漏，語氣像翻譯 | `每年只有這一夜——剩下的每一個夜晚，他只能在地上望著月亮。答 No。` | No |

**Rate summary:**

| Ch | listen-tf Q 數 | 有「答案是 Yes/No」 | 比率 |
|----|---------------|-------------------|------|
| ch9 | 19 | 19 | **100%** |
| ch10 | 20 | 18 | **90%** |
| ch11 | 25 | 24 | **96%** |
| ch12 | 22 | 21 | **95%** |
| ch13 | 21 | 20 | **95%** |
| ch14 | 21 | 1 | 5% ✅ |
| ch15 | 20 | 0 | 0% ✅ |
| ch16 | 21 | 0 | 0% ✅ |
| **Total** | **169** | **103** | **61%** |

### V2 — Vocab gloss without story framing (phrase-pairs)

10 phrase-pairs entries in Ch10 use bare `🔑 X = Y` lists without story-context preamble.  
Note: some Ch9–11 tap-pairs have framing ("奇蹟快要來了！" / "魔法要開始了！") and are acceptable.  
The bare cases below feel like a flashcard app, not a grandma's storytelling night.

| Ch | Q ID | type | Snippet | Violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch10 | kt-ch10-l1-x7 | phrase-pairs | `再複習一次：\n🔑 hero = 英雄\n🔑 marry = 結婚…` | 無任何故事鉤 | 加前句：`后羿射日——這幾個字記住，英雄的故事才完整：` | No |
| ch10 | kt-ch10-l3-x1 | phrase-pairs | `今天的詞組：\n🔑 bad heart = 壞心腸…` | 光詞表，無故事情感 | `這節的壞人出場了，記住這幾個詞：` | No |
| ch10 | kt-ch10-l5-x1 | phrase-pairs | `重點詞：\n🔑 swallow = 吞…` | 最乾：連「今天」都省了 | `她吞下去的那一刻——這節最重要的 4 個詞：` | No |

### V3 — Ch14–16 bare-minimum explanations (secondary)

Ch14–16 用了較好的 `答 X` 模式，但部分 explanationZh 仍過於簡短，缺乏故事情感：

| Ch | Q ID | Snippet | 問題 | 修法 |
|----|------|---------|------|------|
| ch14 | kt-ch14-l3-x3 | `great sea palace = 大大的宮殿——不是小的，答 No。` | 定義式翻譯 | `這座宮殿大得他從來沒見過——不是小地方，答 No。` |
| ch14 | kt-ch14-l2-x7 | `he climbed on = 他爬上去了——他決定去，答 Yes。` | 動作翻譯，無情感 | `他爬上去——不再猶豫了，答 Yes。` |

---

## C. Stats

| 指標 | 數值 |
|------|------|
| Ch9–16 總 Q 數 | 1,050 |
| 有 explanationZh | 1,050 (100%) |
| listen-tf 總計 | 169 |
| V1 verdict-tail (Ch9–13) | 103 (61% of listen-tf) |
| V2 bare vocab gloss | 11 |
| V3 bare Ch14–16 | ~15 |
| P4 語法術語 / jargon | **0** ✅ |
| CI WARN (X2_OPTION_LIST_BIAS) | ch16 × 1 |

**重要發現**: Ch9–13 和 Ch14–16 是兩個不同的 explanationZh voice 品質代（Ch14–16 明顯更好），說明有一次未記錄的 voice standard 升級發生在 Ch14 前。

---

## D. Top 5 P0

1. **⚠️ P0-1** `kt-ch12-l4-x3`: `「從東到西」——不是從北到南，答案是 No。` — 純方向判斷，無牛郎織女情感
2. **⚠️ P0-2** `kt-ch9-l6-x7`: `叮嚀從腦中溜走——…所以答案是 No。` — `所以答案是` 是全系列最冷公式，灰姑娘舞會章最不需要這個語氣
3. **⚠️ P0-3** `kt-ch11-l7-x3`: `「天上再也沒有人告訴他們怎麼做」——…答案是 No。` — 后羿故事結局，應最有溫度
4. **⚠️ P0-4** `kt-ch10-l5-x1`: `重點詞：\n🔑 swallow = 吞…` — 嫦娥奔月最戲劇性的一節，vocab gloss 完全沒有故事氛圍
5. **⚠️ P0-5** `kt-ch10-l7-x7`: `「once each year（每年一次）」——不是每天都這樣，只有一年一次，所以答案是 No。` — 括號英文注解打破故事沉浸

---

## E. 3 Narrative Voice / Pacing Improvements (even if 0 rule violations)

1. **Listen-tf warm closing formula**: Ch14–16 已內化「答 X」取代「所以答案是 X」，應制定為 **全域 voice style guide** 明文規範，避免未來章節回退。
2. **Emotional-register matching**: explanationZh 應配合當章故事基調。Ch9（灰姑娘）→ 溫柔惆悵；Ch10（嫦娥）→ 淡淡哀愁；Ch11（后羿）→ 壯烈沉靜。目前跨章語氣無差異。
3. **Vocab gloss storytelling hook**: phrase-pairs 的 `🔑` 列表在有故事鉤（「奇蹟快要來了！」）時效果顯著優於純列表。所有 phrase-pairs 應統一加一句故事錨定前文。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### 研究背景

- **Duolingo "Explain My Answer"** (Jan 2026 全面上線): AI-powered contextual feedback，設計重點是「情感式推理解釋」，明確避開二元判決語氣。Duolingo Stories 2025 擴展至 100+ courses 時同步升級「expressive voices + richer reactions」，說明 post-answer explanation voice 與 audio expressiveness 必須一致。
- **研究支持**: Tinker Tales (2026) + AnimAlte (2025) 證明 narrative-anchored feedback 對兒童語言學習的 engagement 顯著優於規則式/答案公告式反饋。
- **Duolingo brand voice guideline**: 明確規範 character voices 建立情感連結，說明解釋文字也應服從角色/場景語氣。

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Emotional-anchor explanation (先情感鉤、後答 X) | Duolingo Stories 2025 voice upgrade | ✅ Ch14–16 已驗證，需 backfill Ch9–13 | Medium (96 items content edit, no code) | High — 103 items × 每章 8-12 兒童受眾 | **推薦 backfill** |
| Register-per-chapter tagging | Duolingo character voice per-story design | ✅ 適合 — Pickup 已有每章主題，只需 voice style note | Low (doc only) | Medium — 防止未來回退 | **推薦制定 style guide** |
| AI-generated contextual explanation (GPT-4 live) | Duolingo "Explain My Answer" Jan 2026 | 🟡 未來適合 — 現在 MP3 pre-recorded 架構成本高 | High (backend + API cost) | High for B1+ 但 A2 兒童可能 overkill | 暫緩，觀察 B1 roadmap |

### ARCH-REC #77: X30_EXPL_VERDICTIFY_LISTEN_TF

**Pattern**: `X30_EXPL_VERDICTIFY_LISTEN_TF`

**問題**: `listen-tf` 的 `explanationZh` 在 Ch9–13 以 90–100% 比率使用 `"所以答案是 No/Yes。"` 結尾公式，打破奶奶說故事語氣，與 Ch14–16 改版後的 `答 X` 輕量結尾有系統性落差。

**建議實作** (2 步):

1. **Step A — validate-lessons.js 新增 lint rule**:
```js
// X30: listen-tf explanationZh must not end with '答案是 (Yes|No)。'
if (q.type === 'listen-tf' && q.explanationZh) {
  if (/答案是\s*(Yes|No)[。.]?\s*$/.test(q.explanationZh)) {
    issues.push(`${id}: X30_EXPL_VERDICTIFY (listen-tf explanationZh ends with '答案是 Yes/No' formula — use '答 Yes/No' or story-anchored ending)`);
  }
}
```

2. **Step B — Backfill Ch9–13** (103 items): 用 Fable agent 批次改寫，規則：
   - 刪除 `所以答案是 X。` / `答案是 X。` 結尾
   - 加入一句故事情感詞（人物 / 場景）
   - 結尾改為 `答 Yes/No。`（輕量、不公式化）
   - 保留原邏輯推理，只升級語氣

**不改動**: `src/` 或 lesson JSON 架構，純 content 編輯。

**Effort**: Medium (lint rule 30 min；content backfill 2–3 hr Fable parallel)
**ROI**: High — 103 items × 8-12 兒童受眾，每場 lesson 1–3 題 listen-tf；語氣對齊讓奶奶說故事框架更完整
