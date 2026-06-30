# Pickup 故事製作完整標準 v1 (2026-06-07)

> 唯一 source-of-truth for: 選什麼故事 / 怎麼寫 / 怎麼切 / 怎麼出題 / 文化分佈 / 版權安全.
> 跟以下檔案串聯:
> - `docs/research/chapter-ending-hook-design.md` (B.219 hook framework theory)
> - `docs/research/a2-reading-comprehension-patterns.md` (A2 ELT 教科書研究)
> - `docs/strategy/2026-06-07-market-research-cc-licensing.md` (B.241 市場+CC研究)
> - `~/.claude/skills/narrative-cut-analyst/SKILL.md` (切章 skill)
> - `~/.claude/skills/pickup-item-writer/SKILL.md` (寫題 skill)
> - `src/data/storyRegistry.ts` (30 entries metadata DB)
> - `src/data/storyTags.ts` (tag taxonomy)
> - `src/data/lessonHooks.ts` (per-lesson hook entry)

---

## 🎯 目標客群 (B.231 pivot 後鎖定)

| 層級 | 客群 | LTV | TAM | ROI |
|---|---|---|---|---|
| Primary | 海外華人北美 8-12 兒童 | $280 | 470K | ⭐⭐⭐⭐⭐ |
| Primary | 台灣本土 8-12 兒童 | $140 | 450K | ⭐⭐⭐⭐⭐ |
| Secondary | 海外華人 SEA 兒童 | $180 | 840K | ⭐⭐⭐⭐ |
| Secondary | 日韓兒童(英文學習) | TBD | 3M | ⭐⭐⭐ (Y2) |
| Tertiary | 美國非華兒童學中文 | TBD | 200K | ⭐⭐⭐ (Y2) |
| ⛔ Y3+ | 中國本土 | TBD | 80M | 三大門檻 |

---

## 📚 選故事 6 條 picking 標準

### 1. 版權 — 鐵律

- ✅ 公有領域 (PD): Andersen pre-1875 / Grimm 1812-1815 / Aesop / Perrault 1697 / 1001 Nights pre-1929 / Kipling 1902 Just So / Pushkin 1833 / 民間口傳所有
- ✅ Creative Commons 可商用 (StoryWeaver CC-BY 4.0 / CC0 / CC-BY-SA)
- ❌ Disney / Pixar / Sanrio / Universal / WB
- ❌ 現代繪本(post-1929)未授權
- ❌ 任何特定譯本延伸段落 — 必 Pickup 自創 A2 句式

### 2. 知名度 + 獎項 → S/A/B/C 四等級

| 等 | 判準 | 範例 |
|---|---|---|
| **S** ⭐⭐⭐⭐⭐ | 全球家喻戶曉 + 跨文化共鳴 | 灰姑娘 / 白雪公主 / 三隻小豬 / 龜兔賽跑 / 桃太郎 / 紅帽 / 醜小鴨 / 國王的新衣 / 北風與太陽 / Aladdin |
| **A** ⭐⭐⭐⭐ | 區域強 + 教科書收錄 | 不來梅樂隊 / Rapunzel / 牛郎織女 / 嫦娥奔月 / Sleeping Beauty / 浦島太郎 / Stone Soup |
| **B** ⭐⭐⭐ | 文化內熟 + 跨文化稍弱 | 葉限 / 一寸法師 / 田螺姑娘 / Anansi / Sang Kancil / 后羿射日 |
| **C** ⭐⭐ | 學者圈 / 特定地區 | Coyote tales / Slavic deep folklore / 印度 epics 兒童版 |

**Ship 順序**: S 先 → A → 部分 B (heritage 用戶要) → C 留高 ability 用戶.

### 3. 長度 — 無限制

- 短故事 (1001 Nights 短篇) = 3-5 lessons OK
- 長故事 (Grimm 完整版) = 7-10 lessons OK
- 史詩 (Hanuman) = 多 chapter 分連載

### 4. 角色數量 — 無限制 + AI 推薦適配

- 簡單故事 (1-3 角色) → 推 A1/A2 用戶
- 複雜故事 (10+ 角色) → 推 A2+ + 高 ability level
- 推薦引擎自動 filter (B.236 ability-adaptive)

### 5. 衝突 — 安全鐵律

- ✅ 有衝突 (對抗 / 道德難 / 失去 / 找回)
- ❌ 死亡 explicit (改 'gave up' / 'never came back' / 'turned to ash')
- ❌ 血腥 (改 paraphrase)
- ❌ 性 (兒童 friendly)
- ❌ 種族 / 性別 stereotype

### 6. 主題 — 無限制 (隨故事)

不預設特定主題清單. 故事自然帶什麼主題就是什麼.

### 7. Hook 框架適配 (內部 framework, 用戶不感知)

7 lesson 切點能切出 ≥ 4 種 hook type (B1-B6) → 留得住人.

---

## 🎬 6 種 Hook Framework (B1-B6)

per `docs/research/chapter-ending-hook-design.md`:

| Code | 名稱 | 特徵 | 範例 |
|---|---|---|---|
| **B1** 物理懸念 | 動作中途斷 | 鞋掉了 (灰姑娘 L6) / 草屋倒了 (三隻小豬 L5) |
| **B2** 情緒翻轉 | 內心 state 倒反 | 鬼王:我等你很久了 (桃太郎 L6) / 國王被小孩戳破 (新衣 L6) |
| **B3** 資訊缺口 | 給線索不給內容 | 桃子裡有聲音 (桃太郎 L2) / 那條魚不只是魚 (葉限 L2) |
| **B4** 期待加速 | 門剛開鏡頭就切 | 狗眼睛亮了 (桃太郎 L4) / 大野狼跑去奶奶家 (紅帽 L4) |
| **B5** 道德兩難 | 選 A 還 B 當下 | 鬼來之前我要去 (桃太郎 L3) / 沒人叫醒兔子 (龜兔 L5) |
| **B6** 預言種子 | 環境/象徵暗示風暴 | 島上太安靜 (桃太郎 L5) / 仙藥只夠一人 (嫦娥 L3) |

**章節結尾 3 問驗證** (per skill):
1. McKee 翻轉 — value 翻轉了嗎?
2. Stein open — 打開新衝突還是 resolve?
3. Brewer inquiry — 留下「我想知道 ___」嗎?

3 題若有 1 否 → 切點挪 1-2 句.

---

## 📝 寫題 7 條鐵律 (per pickup-item-writer skill)

### R1. Stem ≤ 11 words
A2 真實考試 median 6 字 / > 11 字 = 脫離 A2 範圍.

### R2. Correct option 必 paraphrase, never verbatim
X3_R1_VERBATIM lint rule 強制.

### R3. A2 vocab whitelist
B1+ ban list: soared / scaled / bobbed / drifted / knelt / forgiveness / blessed / cherished / forbade / pleaded / banished / lamented / dwelt / vowed / forsaken / yearned / majestic / gleaming / stately / proclaimed / whispered / boasted / mocked / abandoned / enchanted / lavish

### R4. listen-tf 必 inference, never lookup
4 策略 rotation:
- A. Atmosphere (氛圍推狀態)
- B. Action implication (動作推目的)
- C. Time accumulation (時間推狀態)
- D. Contrast (對比推結果)

### R5. explanationZh 寫推理路徑
格式: 「推理:[情境] → [連結] → [結論] → 答 [Y/N/option]」

### R6. Speaker field 每 Q 必填
`narrator` / `mochi` / `hana` / `grandma`

### R7. 不出現 negative-scope question
A2 不出現 'all EXCEPT' / 'NOT mentioned' / 'LEAST likely'.

---

## 🌍 文化分佈 (Bear 鎖定, per B.241 研究)

| 來源 | Bear (鎖定) | 為什麼 |
|---|---|---|
| 中華 | **35%** | Heritage hook + 台灣 organic + 比全球自然分佈放大 7-8x |
| 歐美 (Grimm/Andersen/Aesop/Perrault) | **40%** | 全球 mainstream + Heritage 家長要「歐美雙文化」 |
| 日韓東南亞 | **15%** | 亞洲鄰近文化 + 桃太郎已是 anchor |
| 其他 (俄/印/非/中東) | **10%** | 多元文化 marketing 故事 / 海外華人正向 signal |

### Y2 art 預算

~$3K Fiverr commercial illustration (vs 商用 license 數百萬美金). PD 路徑是創業期唯一可行解.

---

## 📊 故事大小衡量 (per lesson + per chapter)

- 每 lesson: 11 Q × 4-5 min (5 min budget)
- 每 chapter: 7 lessons × 11 Q = 77 Q (現有), 但可彈性 5-10 lessons
- 每 Q time estimate per type — ⚠️ **已被 `src/data/lessons.ts` `estimateLessonSeconds()` 的 `Q_SECONDS` 表取代 (B.522 重估)**,以 code 為單一真實來源;下表為舊估,僅留參考:
  - tap-pairs: 30s
  - narration: 15s
  - listen-tf: 20s
  - listen-mc: 35s
  - listen-comprehension: 45s
  - emoji-pick: 25s
  - tap-tiles / drag-blank / listen-build: 35s
  - listen-emoji: 30s
  - picture-mc: 30s
  - read-and-tap: 30s
  - speak-back: 60s

---

## 🚀 13-step ship pipeline (per pickup-new-story.cjs)

1. fetch (URL 或 knowledge)
2. parse plot 主結構
3. canon: `docs/canon/{slug}.md` (7-beat + key vocab + voice + A2 constraints)
4. cuts: `docs/canon/{slug}-cuts.md` (B1-B6 7 hook + 3-question validation)
5. lesson script: `tools/_write-ch{N}-{slug}.cjs`
6. JSON: `public/lessons-ch{N}.json` (7 × 11 = 77 Q)
7. validate: `node tools/validate-lessons.js` (X3 + mirror)
8. qa-static: `node tools/_render-qa-static.cjs`
9. sync hooks: `node tools/_sync-hooks.cjs`
10. update `src/data/lessonHooks.ts` (+7 hook entries)
11. update `tools/_content-db.cjs` HOOK_MAP + CHAPTER_TITLES
12. update `src/data/lessons.ts` ChapterIdSchema (+1)
13. git stage (不 commit, user review 後手動)

---

## ✅ Verification checklist (ship 前必跑)

```bash
node tools/validate-lessons.js               # 0 X3
node tools/lint-vocab.cjs --ch=N             # 0 B1+ hit
node tools/lint-cultural.cjs --ch=N          # 0 stereotype/violence
node tools/lint-readability.cjs --ch=N       # grade ≤ 4
node tools/_sync-hooks.cjs                   # idempotent
node tools/_content-db.cjs                   # variance 0%
npx tsc --noEmit                             # TS clean
npx vitest run                               # 全 tests pass
npm run build                                # vite build clean
```

---

## 🎨 Voice 多樣化 (per chapter)

- Ch1 桃太郎: 直白
- Ch2 醜小鴨: Andersen emotion-driven
- Ch3 龜兔: 對話 heavy
- Ch4 駱駝: Kipling "my dear" + triplet rhythm
- Ch5 Baba Yaga: Sparse 黑暗
- Ch6 六天鵝: 詩意無對話
- Ch7 葉限: 雙語 code-switch
- Ch8 三隻小豬: 對話 + 三段重複 (huff/puff/blow)
- Ch9 灰姑娘: Perrault 童話風 + fur slipper
- Ch10 嫦娥: 中華神話 reverent

每 chapter voice 應自然 ≠ 機械統一.

---

## 📋 Cheat sheet — 1 行做 1 件

| 我要... | 跑 |
|---|---|
| Ship 新故事 | `node tools/pickup-new-story.cjs <URL_or_slug>` |
| 補 MP3 | `node tools/batch-tts.cjs --ch=N` (需 OPENAI_API_KEY) |
| 生 podcast RSS | `node tools/podcast-rss.cjs` |
| 生 OG image | `node tools/og-image.cjs` |
| 查 vocab 違規 | `node tools/lint-vocab.cjs --ch=N` |
| 查文化敏感 | `node tools/lint-cultural.cjs --ch=N` |
| 查 readability | `node tools/lint-readability.cjs --ch=N` |
| 同步 hook map | `node tools/_sync-hooks.cjs` |
| Audit 全章節 | `node tools/_content-db.cjs` |
| QA editor | open `public/qa-static-ch{N}.html` |

---

## 📁 引用檔案

主幹文件:
- `CLAUDE.md` (產品 vision)
- `docs/strategy/2026-06-05-target-audience-realignment.md` (B.231 客群 pivot)
- `docs/strategy/2026-06-06-children-content-and-attention-competitors.md` (B.232 兒童研究)
- `docs/strategy/2026-06-07-market-research-cc-licensing.md` (B.241 市場+CC研究)
- `docs/research/chapter-ending-hook-design.md` (Hook framework theory)
- `docs/research/a2-reading-comprehension-patterns.md` (A2 ELT 研究)
- `docs/research/notification-design.md` (B.221 notification framework)

Skill stack:
- `~/.claude/skills/narrative-cut-analyst/SKILL.md`
- `~/.claude/skills/pickup-item-writer/SKILL.md`

Data layer:
- `src/data/storyRegistry.ts` (30 entries metadata DB)
- `src/data/storyTags.ts` (tag taxonomy + ability difficulty)
- `src/data/lessonHooks.ts` (per-lesson hook inquiry)
- `src/data/userProfile.ts` (ability level + preferences)
- `src/data/storyRecommend.ts` (推薦引擎)
- `src/data/keySentences.ts` (16 公有領域金句 for Share)
- `src/data/cards.ts` (15 角色卡)
- `src/data/mascotOutfits.ts` (13 套裝扮)

---

*Established 2026-06-07 (v2.0.B.242). 修改前先 review 影響 5+ 文件交叉 reference.*
