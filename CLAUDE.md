# WordWar — Project Context for Claude

> 這份文件是給「下次來接手 WordWar 的 Claude session」看的 onboarding。讀完應該能無縫繼續開發、做出符合作者意圖的決定。

---

## 🎯 Vision & 情感核心

**WordWar = 給上班族的「下班逃逸」式英文養成遊戲。**

- **目標客群**：台灣中文母語、A2-B1 程度、想學英文但下班已經夠累的上班族
- **核心情緒**：「下班逃逸」 — 不是「下班再體驗一次上班」。所以**避開**留學夢 / 跨國辦公 / 創業 simulator 那種真實人生劇本，**走向**動物、玄幻、治癒系故事
- **美學定位**：Studio Ghibli 暖色手繪風（不是日系扁平、不是像素藝術、不是 Material Design）
- **學習機制**：cloze（填空）為核心，4 選 1，搭配科學間隔複習（SRS lite）

---

## 🐈 主打故事：小貓回家路 (v0.8 上線)

8 章成長弧 — 從無助小貓到有故事的成熟貓。**每章視覺 + 情緒明顯升級**，玩家看到的不只是「另一張圖」，是「她長大了」。

| 章 | 標題 | 成長級 | 姿態 / 情緒 | 故事 turning point |
|---|------|--------|------------|-------------------|
| Ch1 | 🌧️ 雨夜的開始 | 0 — 純粹脆弱 | 縮成一團、半閉眼、耳朵下垂 | 被動接受陌生人善意 |
| Ch2 | 🛕 街頭智者 | 1 — 開始學習 | 坐姿端正、大眼觀察 | 從被動 → 主動找導師（導師死後獨自背負所學） |
| Ch3 | 🥐 麵包店的選擇 | 2 — 第一次說「不」 | 站立、抬頭、尾巴翹起 | 第一次主動拒絕安全選項 |
| Ch4 | 👧 小女孩的秘密 | 3 — 學會愛 + 學會放手 | 柔軟、會主動 purr | 第一次心碎、撐過 |
| Ch5 | 🐕 流浪夥伴 | 4 — 同行的力量 | 並肩走、不怕陌生環境 | 再次失去夥伴，這次自己撐住 |
| Ch6 | ❄️ 寒冬考驗 | 5 — 存在的選擇 | 雪中前行、眼神堅毅 | **最關鍵的轉折**：從被動小貓變主動存在；老黑（靈魂導師）以儀式性「成年式」重現 |
| Ch7 | ⛩️ 神社的相遇 | 6 — 命運的承接 | 沉穩、有靈氣、有故事的眼神 | 意識到一路上的人都不是偶然 — 命運網絡 |
| Ch8 | 🏠 永遠的家 | 7 — 抵達 / 圓滿 | 從容自信、像中年貓 | 不是「被救」，是「**選擇了這個家**」— 她回家是因為她值得 |

**現有實作（v0.8）**：5 章可玩（不是 8 章 — v0.7-0.8 落地了 5 章版本，8 章是後續設計）。每章 6 題 cloze，題目主題對應該章詞彙（天氣 / 食物 / 友誼 / 街頭生存 / 家），總計 30 題。

**接下來要做**：把 5 章擴成 8 章，補上 Ch6（寒冬）、Ch7（神社）、Ch8（永遠的家）+ 對應 18 題 + 對應視覺。

---

## 🧠 Core Mechanics

### 1. Cloze 答題（核心）
- 一個英文句子有空格 → 4 選 1
- 答錯時：正確選項彈跳發光，**必須點對才能繼續**（v0.8 force-correct mechanic）
- 答錯選項：保留原位（訓練位置記憶），不 shuffle
- 答對：簡短解答 + 自動推進 2-4 秒（也可按 Continue 加速）

### 2. SRS Lite（簡化間隔重複）
- 答錯的題進 localStorage 復習庫
- **下一章開頭前 3 題會復習你之前答錯的**
- 目前是「答對一次就移出」，**不是** 完整 SM-2（這是 open question — 要不要升級成真 SRS）

### 3. 故事模式 vs 自由練習
- **故事模式**：force-correct、無 HP、不能死、跟著章節推進
- **自由練習**：130 題大池（80 cloze + 50 scenario 題），有 HP，傳統 cloze 體驗
- 還有 5 個情境模式（餐廳 / 機場 / 醫院 / 辦公室 / 飯店），每個 10 題

---

## 🎨 Visual Language

### 配色 (v0.8 Ghibli 風)
- 主底：奶油 `#fef8ed`
- 強調：琥珀 `#e7a44a`
- 桌面 outer：暖 tan 色（模擬「手機放在木桌上」感）
- ❌ **避免**：v0.4 的亮綠 `#58cc02` 已**被 v0.8 取代**，但部分元件可能還留著（要清乾淨）

### Mascot 美術
- 10 個原創手繪 SVG inline（5 小貓狀態 + 5 NPC）
- 風格：簡單線條 + 純色塊 + Ghibli 暖色（不是扁平、不是 emoji）
- 動畫：CSS keyframe（不在 Phaser canvas 內）— idle bounce / 答對開心彈跳 / 答錯難過搖頭

### Layout
- **直立手機 app 風**（400×800 portrait）
- 從上到下：Header（streak + progress + HP）→ Scenario chip → Mascot → Sentence card → 4 個垂直按鈕 → 反饋面板
- 用 `100dvh` + `safe-area-inset`（iPhone notch / home bar 正確留白）
- 短螢幕自動 scroll，Mascot 響應式縮小（<720px 高 → 75%，<620px → 60%）

---

## 🛠️ Tech Stack & Architecture

| 層 | 選擇 | 理由 |
|----|------|------|
| 遊戲引擎 | Phaser 3.90 | 內建 Arcade 物理 / 場景管理；但**只當狀態機用**，不負責畫面 |
| 語言 / 打包 | TypeScript + Vite | strict mode、tsc + vite build |
| 狀態管理 | Zustand 4.5 | 比 Redux 輕，比 Context 結構化 |
| 資料驗證 | Zod 3.25 | scenarios / vocab JSON 進來都過 schema |
| 部署 | Cloudflare Pages（透過 Wrangler 4.94） | `wordwar.pages.dev` |
| Repo | `github.com/kengkeng44/wordwar`（public） | portfolio 可見 |

### ⚠️ Phaser 重大架構決策（v0.6）

**所有畫面渲染搬到 DOM，Phaser canvas 設 `display:none`。**

理由：
1. **題目模糊**（v0.4 之前）：Phaser canvas 是 bitmap，手機 DPR 2-3x 放大會糊。DOM 用瀏覽器原生抗鋸齒，絕對清晰
2. **layout overlap**（v0.5）：Phaser canvas + DOM 混用會 absolute position 打架。改成純 DOM flex column 就一勞永逸
3. **觸控穩定性**（v0.2）：Phaser tap event 在某些手機 browser 失靈，DOM `button` 元素絕對穩

Phaser 現在只負責：背景色 / 螢幕閃 / 鏡頭抖（CSS keyframe 也能做這些，未來可能完全移除 Phaser）。

---

## 📂 Code Structure

```
src/
├── scenes/                  # Phaser scenes (state machine layer)
│   ├── BootScene.ts        # 啟動 + 首次玩中文簡介
│   ├── MenuScene.ts        # 主選單（自由 / 情境 / 故事）
│   ├── PlayScene.ts        # 主答題場景（17KB 是最大檔）
│   ├── StoryModeScene.ts   # 小貓回家路章節網格
│   ├── ChapterIntroScene.ts # 每章 NPC 場景卡 + 旁白
│   ├── ChapterEndScene.ts  # 每章結束狀態變化
│   ├── StoryEndingScene.ts # 完成 5 章 cinematic
│   └── EndScene.ts         # 自由 / 情境模式結束（Duolingo 風完成頁）
├── store/
│   └── runStore.ts         # Zustand：分數 / HP / 章節進度 / SRS 庫
├── ui/                      # DOM rendering layer
│   ├── ClozeUI.ts          # 4 選 1 + 反饋面板
│   ├── GameHUD.ts          # Header：streak + progress + HP + timer
│   ├── Mascot.ts           # 動畫 wrapper
│   ├── mascots.ts          # 10 個 SVG inline 定義（38KB 最大檔）
│   ├── ModeMenu.ts         # 自由 / 情境 / 故事 模式切換
│   ├── EndOverlay.ts       # Duolingo 風完成 overlay
│   ├── Confetti.ts         # 破紀錄彩帶
│   └── domUtil.ts          # 共用 DOM helpers
├── data/
│   ├── vocab.ts            # 基礎詞彙
│   ├── sentences.ts        # 80 cloze A2 題目
│   ├── scenarios.ts        # 5 情境 × 10 題 = 50 情境題
│   ├── storyKitten.ts      # 小貓回家路專屬 30 題（Ch1-5）
│   └── roundGenerator.ts   # 出題邏輯：池洗牌、SRS 注入
├── audio/                   # 答對 / 答錯音效（4 諧波鐘聲 / 正弦下行）
└── assets/                  # 共用 assets

public/
└── vocab.json              # 玩家可見的字庫（user-editable）

tools/                       # 開發用 scripts（未 commit 內容詳查）
```

---

## 🚀 Development Convention

### Commit message 格式
```
vX.Y[.Z]: short description
```
範例：
- `v0.8: 小貓回家路 story mode + Ghibli aesthetic + force-correct mechanic`
- `v0.6.1: hotfix — timer to header, sentence inline, remove mute UI`

語氣：**列重點不寫散文**，用 `+`、`—`、`fix` 分段。

### Deploy flow
每次改動完跑這 3 個：
```bash
git add . && git commit -m "vX.Y: ..."
git push origin master                    # 推 GitHub
npx wrangler pages deploy dist \
  --project-name=wordwar --branch=master  # 推 Cloudflare Pages
```

⚠️ **build 要先過**：`npm run build`（tsc + vite build）。如果 tsc 失敗，**不要 deploy**。

### Build budget
- 目標：< 1 MB raw、< 400KB gzip
- 現況：1324KB raw / 354KB gzip（剛好邊緣）
- 加東西時要量 raw 增幅，超 10KB 要思考

---

## 📜 Decision Log（重要設計取捨）

| 決策 | 為什麼 |
|------|-------|
| Phaser canvas `display:none`，全 DOM 渲染 | 手機 DPR 模糊 + layout 衝突，徹底解 |
| 故事模式無 HP、force-correct | 「下班逃逸」核心情緒 — 不能讓玩家有「失敗焦慮」 |
| 答錯保留正確選項位置不 shuffle | 訓練位置記憶 + 減少作弊感 |
| Zustand 不用 Redux | 輕量、夠用、TypeScript 體驗好 |
| Cloudflare Pages 不用 Vercel | 免費額度大、CDN 快、邊緣計算 future-proof |
| Ghibli 暖色取代 Duolingo 亮綠（v0.8） | 配合小貓故事的治癒感，亮綠太「健身房」 |
| 暫不做完整 SM-2 SRS | MVP 先驗證玩家會不會回來，再投資複雜算法 |
| Telegram bot 開發 + Claude Code subagent | 作者 dogfood — 自己也想驗證 telegram-bot-as-agent 工作流 |

---

## 📋 Open Questions（v0.8 → v0.9 待決定）

來自 v0.8 ship 時的未解：

1. **答錯後正確選項位置**：目前「保留原位」訓練位置記憶。要不要改 shuffle 防作弊？
2. **SRS 升級**：目前「答對一次就移出」。要不要改「連對 N 次才移出」真 SM-2？
3. **完成 5 章 → 8 章解鎖什麼**：B1 等級題庫 / 續集故事 / 寵物收藏 cosmetic？
4. **NPC 露臉時機**：目前只在 ChapterIntro / ChapterEnd。要不要在 PlayScene 答題時也露？
5. **Ch6-8 內容生產**：當前實作只到 Ch5，8 章設計已定，需要 18 題 + 視覺
6. **答錯選項 layout**：[? — 你之後補]

---

## 🗺️ Roadmap

### Phase 1 — MVP 驗證（**現在**, v0.8）
- ✅ 5 章 / 30 題小貓回家路上線
- ✅ Ghibli 美學 + force-correct + SRS lite
- ✅ 完全免費，目標：有人玩完 5 章 + 回流

### Phase 2 — 完整 8 章 + 商業化（下一步）
- Ch6-8 內容（18 題 + 3 章視覺）
- 完整 SM-2 SRS + 復習介面
- Paywall：Ch1 免費 / Ch2-8 $4.99 一次性買斷 OR Pro 訂閱

### Phase 3 — 延伸故事 / 多 IP
- 候選續集（同調動物治癒系）：
  - 🐶 招財狗的街角生意經
  - 🐢 烏龜的夜班超商
  - 🦊 神社小狐狸（玄幻向）
  - 🐲 靈獸修仙記（東方向）
- Cosmetic IAP：角色服裝 / 場景包

---

## 🚫 Don't Do（踩過的雷）

1. **不要在 Phaser canvas 畫文字** — 手機會糊。所有 text → DOM
2. **不要用 absolute position 排版** — 會 overlap。用 flex column flow
3. **不要做「真實上班族劇本」** — 用戶反饋「下班已經夠累」，會反向打擊使用意願
4. **不要把音量按鈕做 UI** — 用戶覺得「內設有音樂就好，要關用手機系統音量」
5. **不要顯示「X of 10」counter** — 用 progress bar 即可，數字會增加焦慮
6. **不要讓答錯扣 HP 結束 run（故事模式）** — force-correct 即可，HP 失敗破壞治癒感
7. **不要硬塞短螢幕** — Mascot 要響應式縮小，否則 iPhone SE 等小螢幕會擠
8. **不要省略 `safe-area-inset`** — iPhone notch / home bar 會吃內容
9. **不要 commit 之前先 push** — 確認 build 過，wrangler deploy 失敗會留 dirty state
10. **不要直接抓多益題** — ETS 版權嚴。學測 / 統測題公開可用，但 v0 自製就夠

---

## 💬 Working Style With User（作者 鄭成功 偏好）

作者的溝通風格 — 請對齊：

### 提問與回答
- **A/B/C 選擇題格式**作者最買單。每個選項加 emoji + 簡述
- 預設行為要明確：「沒回 X 分鐘預設跑 🅰️」— 不要讓 user 卡住
- 列表要短，行動要決斷
- **比喻 + 大白話**勝過 jargon

### 工作節奏
- 作者一次給多個指令，期待 subagent 並行處理
- 完成後 Telegram 推「v0.X 完成 + URL」單獨一條
- **每次 dispatch subagent 前先列「會碰哪些檔 + 跑哪些指令」**，避免瞎簽 permission
- Permission prompt 跳出來前先在 Telegram 解釋為什麼 + permit 什麼 + 拒絕的影響

### 文體偏好
- 禁贅字（「🤖」「※」「簡言之」這些）
- 禁英譯腔（「保持開放」改「歡迎交流」）
- 預設精簡版
- 預測類用 bull / base / bear 三檔

### 不喜歡
- 「Permission 跳出來但沒解釋」— 一定要先講
- 「subagent 跑完才告訴我做了什麼」— 要事先預告
- 「Confirmation 跳出來但不知道拒絕會怎樣」— 一定要說明 拒絕的影響
- 過度問問題 — 能自己判斷就動

### 喜歡
- 「我替你想到了 X，三個方向供你選」這種主動性
- 數字 + 證據 ≥ 純文字描述
- 「⭐ 推薦 🅰️」這種有立場的引導（但要說理由）

---

## 🔗 External Links

- **Live URL**: https://wordwar.pages.dev/
- **Repo**: https://github.com/kengkeng44/wordwar
- **Cloudflare Pages project**: `wordwar`

---

## 📝 Onboarding Checklist（新 Claude session 接手時）

1. ⬜ 讀完這份 CLAUDE.md
2. ⬜ `git log --oneline -10` 看最新 commit 軌跡
3. ⬜ 跑 `npm install && npm run dev` 在 localhost 玩過一輪小貓回家路
4. ⬜ 看 `src/data/storyKitten.ts` 理解故事題目結構
5. ⬜ 看 `src/scenes/PlayScene.ts` 理解答題核心邏輯
6. ⬜ 看 `src/ui/ClozeUI.ts` + `src/ui/GameHUD.ts` 理解 DOM 渲染層
7. ⬜ 對齊作者偏好（這份的 "Working Style" 一節）
8. ⬜ 動工前列「會碰哪些檔 + permission 預告」

---

*Last updated: 2026-05-25 by Claude (Opus 4.7) based on Telegram dev log + git history + code structure*
