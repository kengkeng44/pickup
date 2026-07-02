# 拾光 (Pickup) — Project Context for Claude

> **Brand: 拾光 (Pickup)** — 原名 WordWar，v0.9 完成 rebrand。資料夾仍保留 `Desktop\wordwar` 路徑（避免打斷工作目錄）。
> 這份文件是給「下次來接手拾光的 Claude session」看的 onboarding。讀完應該能無縫繼續開發、做出符合作者意圖的決定。

---

## 📑 Table of Contents

1. [Vision & 情感核心](#-vision--情感核心)
2. [Version History](#-version-history)
3. [Story Framework — 奶奶的 8 個說故事夜晚 (v2.0)](#-story-framework--奶奶的-8-個說故事夜晚-v20)
4. [Core Mechanics](#-core-mechanics)
5. [Visual Language](#-visual-language)
6. [Audio](#-audio)
7. [Tech Stack & Architecture](#-tech-stack--architecture)
8. [Code Structure](#-code-structure)
9. [Development Convention](#-development-convention)
10. [Decision Log](#-decision-log重要設計取捨)
11. [Open Questions](#-open-questionsv013--v014-待決定)
12. [Roadmap](#-roadmap)
13. [Don't Do（踩過的雷）](#-dont-do踩過的雷)
14. [Working Style With User](#-working-style-with-user作者-鄭成功-偏好)
15. [External Links](#-external-links)
16. [Onboarding Checklist](#-onboarding-checklist新-claude-session-接手時)

---

## 🎯 Vision & 情感核心

> **v2.0.B.231 (2026-06-05) 客群 pivot**: 從「下班族 + 下班逃逸」改為「8-12 兒童 + 親子家庭 + 海外華人 heritage」。
> 客觀分析:framework (7 個世界童話 + 奶奶 voice + Ghibli + A2 + 慢 TTS + blindRetry) 都是兒童 ELT 最佳實踐, 「下班逃逸」是 forced fit。
> 完整 pivot 分析: `docs/strategy/2026-06-05-target-audience-realignment.md`。
> 「下班逃逸」概念**預留給未來 sibling app** (Phase 3: 「神社小狐狸」/「烏龜夜班超商」), 不是放棄。

**拾光 (Pickup) = 奶奶睡前說英文童話的家庭 ELT 遊戲。**

- **Tagline**:「奶奶的睡前英文小故事」(v2.0.B.231 改自上版「學英文,撿回時間」)
- **目標客群** (primary):
  - 台灣 8-12 兒童 (家長付費, 小孩使用)
  - 親子家庭 (爸媽陪小孩讀, 雙語可解釋)
- **目標客群** (secondary):
  - 海外台灣 / 華人家庭子女 (heritage learners, 中英雙語需求)
  - 退休 / 銀髮 60+ (重新學英文, 不要 gamification 壓力)
- **核心情緒**:溫暖陪伴 (奶奶 + Mochi + Hana) — 不焦慮、不打擊、不催促
- **美學定位**:Studio Ghibli 暖色手繪風(不是日系扁平、不是像素藝術、不是 Material Design)
- **學習機制**:cloze(填空)為核心,4 選 1,搭配科學間隔複習(SRS lite)+ 難度系統 (easy/medium/hard)

### 🚫 Sunset 字眼 (不再用於 user-facing surface)

- 「下班逃逸」/「下班族」/「下班疲憊上班族」
- 「撿回時間」(舊 tagline)
- 「Cry later · try again」/「拭乾眼淚再前進」(成人情緒重 framing)
- 「我也累、我也想哭,但我還是要再試一次」(per Mochi 性格段落 — 改為兒童版「貓咪相信你」)

這些概念**預留** 給未來 sibling app, 但 Pickup 本身已 pivot, 新增 microcopy / 對外文案 / commit msg 都避用。

---

## 📅 Version History

> 只留里程碑。逐 commit 細節看 `git log --oneline`(~350 commits),不在此展開。

| 階段 | 版本 | 重點交付 |
|------|------|---------|
| 起步 | v0.8-0.13 | 5→8 章 + Ghibli 暖色美學 + 難度系統 + 極簡 splash + blindRetry + BGM mp3 streaming |
| Rebrand | v1.0-v1.7.5 | WordWar → Pickup;isometric chibi 主角(grandma + shiba);4-tab BottomNav;進站轉場;code-split Phaser;WebP |
| Duolingo parity | v1.7.6-v1.9.49 | 整段 Duo 改造:5 大題型(cloze/tap-tiles/tap-pairs/type-what-you-hear/listening)+ TTS + XP/Level/streak/achievements + HUD + `tokens.ts` 語意色票 + Ghibli warm palette(綠 olive #7d9a4f / 紅 terracotta #c84a3a)+ 多輪 audit pass + 全清 blur halo |
| grandma-v4 | v1.9.50-v1.9.56 | 「奶奶睡前故事」框架上線;Ch1 6→8 題;`catName.ts`/`dogName.ts`(Mochi/Hana 預設, 可自訂)|
| **v2.0 nested redesign** | v2.0.0 | Duolingo-nested 重做:LessonSchema discriminatedUnion(根治 kt-ch1-06)+ LessonScene 單 lesson scope + 24-button map + runStore per-lesson progress + Ch1 24 lessons / ~110 Q + `validate-lessons.js` CI guard |
| Autonomous loop | v2.0.B.118-B.220 | Ch2-8 batch JSON(1100+ Q)+ grandma OpenAI TTS ~200 MP3 + lazy-load Phaser(-1.2MB)+ PWA + 5-agent audit framework + cron audit(每 3hr 6 angle)|
| **客群 pivot** | v2.0.B.231 | 下班族 → 兒童/親子家庭;tagline「奶奶的睡前英文小故事」;Mochi 人設「害羞+好奇+勇敢」;sunset「下班逃逸/撿回時間/Cry later」字眼(預留 Phase 3 sibling app)|
| 內容擴張 | v2.0.B.221-B.257 | Ch2-9 + Ch22-26 歷史故事;STORY_REGISTRY 30→110;NextStoryPicker;cockpit Decision Board(pickup-cockpit.pages.dev, ROI ranked + 1-tap copy)+ CI auto-deploy |
| i18n + 理解題 | v2.0.B.342-B.350 | comprehension type 合併(read+listen)+ 全域聽/讀開關 + listen-pairs 聽選中文配對 + 介面 中/英切換 Phase 1-3 |

**當前版本:v2.0.B.350(見 `git log`)。** 客群 pivot 詳見 `docs/strategy/2026-06-05-target-audience-realignment.md`;v2.0 redesign source of truth `docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md`;master matrix `docs/product/pickup-master-matrix-2026-06.md`。

## 📋 待辦(user 2026-05-27 確認)

- **Drag-and-drop tap-tiles**(complexity 評估 ~3-4 hr,iOS Safari 多坑)— **暫緩**,等用戶主動 unblock
- **Listen + Image / Sentence Shuffle 新題型** — 需圖庫
- **角色站位規則 v4**(2026-05-27 確定):mean dx 偏右 → 角色貼 container 左 28px margin,垂直在節點群中段
- 更多 user-generated icons(目前 12 個已整合)

---

## 🐈‍⬛ 主角設定:Mochi 三花貓 (v2.0.B.231 pivot 後)

> **一句話**:**愛聽故事,有點害羞,但很勇敢。**

- v1.7.0「愛哭鬼但堅韌」是給「下班疲憊上班族」客群設計的成人情緒鏡像。
- B.231 客群 pivot 到 8-12 兒童 / 親子家庭後, 改為兒童版人設:害羞 + 好奇 + 勇敢。
- Mochi 是**奶奶院子裡每晚跳上矮牆的流浪貓**, 跟奶奶養的 Hana 一起當故事聽眾。

### 落地到產品的位置 (B.231 更新後)

| 位置 | 怎麼體現 |
|------|---------|
| 進站轉場 | 暖色貓臉 reveal 主畫面 (歷史 tear-cat 已 sunset, 不再哭流淚) |
| 答錯 microcopy | "再試一次" / "貓咪相信你" / "不急,慢慢來" (溫柔陪伴, 不情緒重) |
| 答對 microcopy | "好厲害!" / "貓咪相信你!" / "Brave!" (兒童式鼓勵) |
| Ch1 故事場景 | 桃太郎 — 奶奶說故事 Mochi 跟 Hana 趴在腳邊聽 |
| Ch2-7 童話 | 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六天鵝 / 葉限 |
| Ch8 童話 | 🐷 三隻小豬 (Three Little Pigs) — 公有領域 |

> **「下班逃逸」/「愛哭鬼但堅韌」概念預留給未來 sibling app (Phase 3)**, 不打掉, 但 Pickup 本身不再用。

---

## 🐈 Story Framework — 奶奶的 8 個說故事夜晚 (v2.0)

**Slice-of-life,Arabian Nights 結構**。每章 = 一個 storytelling evening。**v1.x 「小貓回家路 8 章 + false-ending」整段廢棄**(v2.0 重新設計,參考 `docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md`)。

> ⚠️ **章數現況**:下面是**核心設計弧(8 夜)**,但實際 shipped 內容已擴張到 **32 章**(`public/lessons-ch0..31.json`,ch9+ = 童話 + 歷史故事擴張)。章名/狀態 source of truth = `src/data/storyRegistry.ts`(110 registry)。完整對照見 `docs/architecture/2026-06-20-spec-vs-actual-state.md`。
> 💡 **規劃中支線**:奶奶「現實悄悄話」— 故事寓意接到 Mochi/Hana 日常,設計 spec `docs/superpowers/specs/2026-06-20-grandma-real-world-sidebranch.md`。

### Outer frame (8 章 recurring)

- Mochi(三花貓 / 流浪)每晚跳上奶奶矮牆
- Hana(柴犬 / 奶奶養)趴她腳邊
- 奶奶在椅子上,翻書,講故事
- Mochi 跟 Hana 是「聽眾」,inner stories 的主角不是他們

### 8 章 inner story map

| Ch | 主菜 | 體裁 | Aesop sides |
|----|------|------|-------------|
| 1 | 🌧️ 雨夜小貓(meta-anchor) | 直接體驗 1st-person | 螞蟻與蚱蜢 / 北風與太陽 |
| 2 | 🍑 桃太郎 | 累積連鎖體 | 龜兔賽跑 / 狼來了 |
| 3 | 🦢 醜小鴨 | 第一人稱內心獨白 | 獅子與老鼠 / 牧羊人與狼 |
| 4 | 🐢 龜兔賽跑(升 main) | 對話體 | 烏鴉與狐狸 / 城市鼠與鄉村鼠 |
| 5 | 🐪 駱駝為什麼有駝峰 | Kipling "O Best Beloved" 第二人稱 | 蘆葦與橡樹 / 老鼠開會 |
| 6 | 🏚️ Baba Yaga 雞腳屋 | 黑暗民俗 sparse | 漁夫與妻子 / 七張床 |
| 7 | 🦢 六隻天鵝(Grimm 冷門) | 無對話詩意 narration | 三個願望 / 老鼠新娘 |
| 8 | 🐷 三隻小豬 (Three Little Pigs) — 公有領域 (Joseph Jacobs 1890) | 對話體 + 三段式重複 (huff/puff/blow) | 田螺姑娘 / 嫦娥奔月 |

### 章內結構 (Duolingo-nested,每章 24 lessons,每 lesson 5-15 Q)

- 3 outer-prologue lessons(Mochi 跳牆 / Hana 搖尾 / 奶奶開書)
- 12 main-story lessons(主菜童話)
- 6 aesop-side lessons(2 短篇 × 3 lessons)
- 2 outer-outro lessons(Goodnight + Mochi 跳回街上)
- 1 review lesson(tap-pairs)

### Character names (v2.0.A.8)

- Cat: `{catName}` placeholder, default `'Mochi'` (was `'糰糰'`)
- Dog: `{dogName}` placeholder, default `'Hana'` (was `'花花'`)
- Per-player customizable via Profile tab + `src/data/catName.ts` + `src/data/dogName.ts`

**v2.0 出生在這次 brainstorm 對話**:`docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md` 是 source of truth。

---

## 🧠 Core Mechanics

### 1. 答題核心 + blindRetry
- 4 選 1 為主,答對推進、答錯 blindRetry — **只標紅錯誤鈕，不揭露正確答案**，玩家自己試到對為止（v0.13 強化）
- 答錯選項：保留原位（訓練位置記憶），不 shuffle
- 答對：簡短解答 + 自動推進 2-4 秒（也可按 Continue 加速）

> ⚠️ **題型現況**:`cloze` 是 v1.x 概念(`sentences.ts`/`ClozeUI.ts`),**v2.0 nested 內容沒用**。v2.0 lessons schema(`lessons.ts`)定義 **20 種 type**,content 實用 **9 種**,主力 `listen-mc`(524)。`narration`(旁白)佔全部 entry 的 48%,**不算題型/題數**。完整 roster + 計數規則見 `docs/architecture/2026-06-20-spec-vs-actual-state.md` §2-3。

### 2. SRS Lite（簡化間隔重複）
- 答錯的題進 localStorage 復習庫
- **下一章開頭前 3 題會復習你之前答錯的**
- 目前是「答對一次就移出」，**不是** 完整 SM-2（open question — 要不要升級成真 SRS）

### 3. 難度系統 (v0.12)
- 178 cloze 全標 `difficulty: easy | medium | hard`
- UI：BootScene splash 上的**折疊難度 pill**（v0.13 縮到啟動畫面）
- 持久化：`localStorage.pickup.difficulty`
- 出題：依當前 difficulty filter 池

### 4. 故事模式 vs 自由練習
- **故事模式**：force-correct + blindRetry、無 HP、不能死、跟著章節推進
- **自由練習**：130 題大池（80 cloze + 50 scenario 題），有 HP，傳統 cloze 體驗
- 還有 5 個情境模式（餐廳 / 機場 / 醫院 / 辦公室 / 飯店），每個 10 題

### 5. 解鎖機制（v2.0.B.475 更新）
- **章節層**：在 `ChaptersPage` 層 gate（前章完成才開下一章）。舊 `DEV_UNLOCK_ALL`（在已刪的 `storyKitten.ts`）一併移除。
- **章內 lesson 層**：`isLessonUnlocked()`（`runStore.ts`）循序解鎖 — 完成第 k 關才開第 k+1 關，未解鎖 = 灰色不可點（B.473）。

---

## 🎨 Visual Language

### UI/UX 設計原則 (v2.0.B.536 per user — 所有介面改動都遵守)

> 作者 2026-07-01 定調:「所有 UI/UX 都以極簡、好的設計理念去設計,人類直覺就可以使用」。**每個新畫面 / 彈窗 / 元件都照這走**,不用再問。

- **極簡優先**:少字、少鈕、少層級。能刪的標題 / 描述 / 說明就刪,畫面只留「使用者要做的選項」本身。
- **點旁邊就關閉**:所有彈窗 / modal / sheet 一律「點背景空白處即取消」(tap-outside dismiss)。**不要**放多餘的「取消 / 關閉 / ✕」鈕 —— 除非該畫面是不透明全螢幕(沒有可點的外部),才留單一關閉。
- **從來源彈出**:選項類彈窗(點人物 / 點按鈕 / 點節點跳出的)用**錨定式 popover**(`AnchoredPopover` in `MapPage.tsx`)—— 從被點的元素長出來、帶指向尾巴、從來源縮放浮現,**不要**一律從底部滑上的大 sheet。
- **人類直覺**:預設行為安全(點外 = 不破壞進度)、目標夠大、不需說明就會用;避免 metalinguistic / 成人 register 文案。
- **安全邊界**:popover 保留上方 HUD / 下方導覽的留白,內容再長也不被 chrome 切(超出就內部捲)。
- 已落地範例(B.528/535/536):地圖 node / 英檢 popover、ShareModal、角色卡、衣櫥、KeySentences 都已改成此模式,可當樣板。
- **配色呼應(v2.0.B.540 per user)**:章節旁的人物「視覺主色」要跟該章節點按鈕顏色相近才好看。人物不用只有一種色(三花貓照舊),但主色框 / 標籤 / 光暈用該章 `CHAPTER_META[ch].accent`(見 `SideCharButton`)。新增任何「靠在某章旁」的角色 / 徽章都照此:主色 = 該章 accent。
- **語言一致(v2.0.B.550 per user)**:玩家設什麼語言,**解釋 / 選項 / 例句 / 配對中文側**就用那個語言 —— 韓語就要韓語、日語就要日語,**不能 fallback 到中文**。機制 = `public/lessons-i18n/ch{N}-{ja,ko}.json` overlay(qid → `{s,e,q,o,p}`),loader `applyContentOverlay()` 換 `sentenceZh/explanationZh/questionZh/optionsZh/pairs.left`。**新增或改任何 lessons 題 → 同步補該題的 ja/ko overlay,缺翻譯視為 bug**(B.550 補完 ch0 49 題 + ch12/13/32 漏題,現達 100% 逐題覆蓋)。查漏:掃每個 base qid 是否都在 ja+ko overlay。**已知例外**:scroll-pick 的中文指令 stem(`question` 欄)全 app 都沒走 `q` overlay → ja/ko 仍中文,要修需 app-wide 加 `q` render 路徑(待作者決定)。

### Semantic Color Tokens (v0.11 Duolingo-tier overhaul)

```css
--pickup-success    /* 答對綠 */
--pickup-error      /* 答錯紅 */
--pickup-streak     /* 連勝橘 */
--pickup-xp         /* 經驗藍 */
--pickup-info       /* 通用資訊 */
--pickup-bg         /* 奶油 #fef8ed */
--pickup-accent     /* 琥珀 #e7a44a */
--pickup-text       /* warm dark */
```

❌ **避免**：v0.4 亮綠 `#58cc02` 已淘汰。

### Typography Tokens

```css
--font-display    /* 標題 */
--font-body       /* 內文 */
--font-button     /* CTA */
--font-stat       /* 數字 */
--font-microcopy  /* 微文案 */
```

### Animations (v0.11)
- `pickup-bounce` / `pickup-pulse` / `pickup-wobble` / `pickup-fade-up`
- `pickup-streak-pop` / `pickup-confetti-burst` / `pickup-glow`
- 250ms breathing pace
- **`prefers-reduced-motion` respected**

### Microcopy (中文，6-variant rotation)
- **答對**：太棒了！／厲害！／你抓到了！／一發入魂！／答對啦！／就是這個！
- **答錯**：再試試／差一點（blindRetry：不再揭露正確答案）
- **Continue**：「繼續 →」（含箭頭）
- **完成**：「完成一輪！」+ italic sub-tagline

### Mascot 美術 (v1.7.6 視覺方向重定)

**現行決策(2026-05-26):所有出場角色統一 isometric Duolingo chibi 風**(類 Lin / Junior / Lily)。

- **角色 art**(貓 / NPC / 人物)= **isometric chibi**,大頭小身、純色塊無黑邊、坐在白色 tile 平台上、軟陰影
- **POV 場景背景**(Ch1 q1-q6)= 保留 painterly Ghibli(painterly + atmospheric,因貓不在場景中)
- **小裝飾 / icons** = 可混用其他 style

**生圖管道**:
- 用戶手動 ChatGPT / Gemini(DALL-E 3 / GPT-4o / Imagen 對 Duolingo style 比 SDXL 準)
- Prompt doc:`Desktop\wordwar\Pickup-isometric-character-prompts.md`(anchor + 7 NPC + refine 指令)
- ❌ **SDXL via Stable Horde 對這個風格無效**(會生成 3D render / Sanrio 公仔,不是扁平向量)— POC `public/mascots/iso-calico-poc.png` 留作反例對比

**取代清單(等用戶交 PNG 後)**:
- 進站 tear-intro SVG 貓臉 → 新 isometric PNG
- 地圖 sitting cat SVG → 新 isometric PNG
- Loader 旋轉貓頭 SVG → 新 isometric PNG  
- 舊 `public/mascots/calico-anchor.png`(Suntera sticker)→ 廢棄

### 歷史 mascot 美術(歸檔)
- v0.8.3-0.8.4 RUMBO sticker 風(粗黑邊 + 平塗 + radial halo + drop shadow + 16 mascots)— 已淘汰
- v1.4 sticker 三花貓(user-generated via ChatGPT + rembg 去背)— v1.7.6 後也淘汰
- 動畫：CSS keyframe（不在 Phaser canvas 內）— idle bounce / 答對開心彈跳 / 答錯難過搖頭

### Layout
- **直立手機 app 風**（400×800 portrait）
- v0.13 splash：單 mascot + 拾光 title + 開始 CTA + 折疊難度 + 字置中
- 從上到下：Header（streak + progress + HP）→ Scenario chip → Mascot → Sentence card → 4 個垂直按鈕 → 反饋面板
- 用 `100dvh` + `safe-area-inset`（iPhone notch / home bar 正確留白）
- 短螢幕自動 scroll，Mascot 響應式縮小

---

## 🎵 Audio

### BGM (v0.13)
- **曲目**：Peace! by ryoish (Pixabay)
- **規格**：3:50 piano loop，`public/audio/peace.mp3`
- **實作**：`src/audio/bgm.ts` 從程序合成改寫為 mp3 streaming（150 行 → 63 行）
- **機制**：AudioBufferSourceNode loop、cached、race-safe stop
- 檔案 7.36 MB 在 `public/`（**不進 bundle**），CF Pages CDN 直送

### SFX
- 答對 / 答錯音效：4 諧波鐘聲 / 正弦下行（仍程序合成）

---

## 🛠️ Tech Stack & Architecture

| 層 | 選擇 | 理由 |
|----|------|------|
| UI 框架 | React 18 + react-router | **唯一 entry = `src/main.tsx`**。所有畫面 = React 元件 (`src/react-app/`) |
| 語言 / 打包 | TypeScript + Vite | strict mode、tsc + vite build |
| 狀態管理 | Zustand 4.5 | 目前僅 `vocabStore` (WordHint 用)；lesson 進度走純 localStorage helper |
| 資料驗證 | Zod 3.25 | lessons JSON 進來都過 schema |
| 部署 | Cloudflare Pages（Wrangler 4.94） | `pickupwords.pages.dev` |
| Repo | `github.com/kengkeng44/pickup`（public） | portfolio 可見；舊 `wordwar` 自動 redirect 1 年 |

### ⚠️ 架構：純 React DOM（v2.0.B.474 — Phaser 已整層刪除）

**歷史**：v0.6-v2.0 早期是 Phaser 當狀態機 + DOM 渲染的混合架構（理由：手機 DPR 模糊 / layout overlap / 觸控穩定性 → 全畫面搬 DOM，Phaser canvas `display:none`）。

**現況（B.474）**：React migration 完成後，整個 Phaser 層（`main.ts` / `bootGame.ts` / `scenes/×9` / 舊 `ui/*.ts` DOM renderers ×14）早已是死碼（從 `main.tsx` 完全到不了），於 B.474 全數刪除，並移除 `phaser` npm 依賴。**現在沒有 Phaser，也沒有 `src/scenes/`。** 三個審查 agent 獨立確認 + build gate（tsc/madge/vitest/vite）全綠驗證。

**B.475 後續**：舊 v1.x cloze 引擎（`useRunStore` Zustand 跑題狀態機 + `sentences`/`scenarios`/`storyKitten`/`achievements`/`catGender`）也一併刪除（live UI 早已不用）。`runStore.ts` 現在只剩 lesson-progress 三個 helper。詳見 `docs/audits/` 死碼審查 + B.474/475 commit。

---

## 📂 Code Structure

```
src/
├── main.tsx                 # 唯一 entry — React root + router + theme/backend init
├── react-app/               # ★ 所有 UI 都在這 (pages / components / renderers)
│   ├── App.tsx             # routes + BottomNav + onboarding gate
│   ├── pages/              # MapPage / LessonPage / ChaptersPage / ProfilePage / Settings…
│   ├── components/         # BottomNav / Onboarding…
│   ├── renderers.tsx       # 題型 renderers (MC / type-translate / tap-pairs…)
│   ├── i18n.ts             # zh/en/ja/ko dict + translate()/tq()/getLang()
│   └── ui/components/      # 共用 Button / Card / ProgressBar
├── store/
│   └── runStore.ts         # 只剩 lesson-progress 純 localStorage helper
│                           # (readCompletedLessons / markLessonCompleted / isLessonUnlocked)
├── ui/
│   └── WordHint.ts         # 點詞釋義 (App + renderers 用) — ui/ 其餘 v1.x DOM 層已刪
├── data/
│   ├── lessons.ts          # v2.0 — LessonSchema discriminatedUnion + loadChapterLessons() + applyContentOverlay()
│   ├── xp.ts / coins.ts / streak.ts / hp.ts   # 經濟 / 連續 / 體力 (各自 localStorage)
│   ├── players.ts          # 多帳號 snapshot/restore 進度保留
│   ├── catName.ts / dogName.ts                # {catName}=Mochi / {dogName}=Hana
│   ├── lang.ts / zhHans.ts / answerMatch.ts   # i18n / 簡中 / 打字判斷
│   └── …                   # onboarding / theme / backend / mascotOutfits…
├── audio/
│   ├── bgm.ts              # mp3 streaming
│   └── AudioManager.ts / sfx.ts / tts.ts
└── assets/                  # 共用 assets

public/
├── audio/
│   └── peace.mp3           # BGM, 7.36 MB, CDN-served not bundled
├── lessons-ch1.json        # v2.0 — Ch1 24 lessons, ~110 Q (Duolingo-nested model)
└── vocab.json              # 玩家可見的字庫（user-editable）

tests/                       # v2.0 — Vitest harness (22 pass)
├── data/
│   ├── lessons.test.ts                # LessonSchema unit
│   ├── loader.test.ts                 # loadChapterLessons() integration
│   ├── lessons-ch1-validate.test.ts   # ch1 JSON shape guard
│   └── sentences-schema.test.ts       # legacy v1.x schema regression
├── store/
│   └── lesson-progress.test.ts        # per-lesson progress slice
└── sanity.test.ts                     # smoke

tools/                       # 開發用 scripts
└── validate-lessons.js     # v2.0 — build-time CI guard, runs LessonsSchema parse on lessons-ch1.json
```

---

## 🚀 Development Convention

### Commit message 格式
```
vX.Y[.Z]: short description
```
範例：
- `v0.13: minimalist splash + blindRetry + BGM mp3 streaming`
- `v0.11: Duolingo-tier UI overhaul — semantic tokens + 7 animations + 6-variant microcopy`

語氣：**列重點不寫散文**，用 `+`、`—`、`fix` 分段。

### Deploy flow
每次改動完跑這 3 個：
```bash
git add . && git commit -m "vX.Y: ..."
git push origin master                          # 推 GitHub (pickup repo)
npx wrangler pages deploy dist \
  --project-name=pickupwords --branch=master \
  --commit-message="vX.Y deploy"                # ASCII commit msg override
```

⚠️ **build 要先過**：`npm run build`（tsc + vite build）。如果 tsc 失敗，**不要 deploy**。

⚠️ **Cloudflare project name**：`pickupwords`（`pickup` / `shiguang` 都被佔了，全球 namespace unique）。舊 `wordwar` project **已刪除，wordwar.pages.dev 是 404**。

### Build budget
- 目標：< 1 MB raw、< 400 KB gzip
- 現況 (v0.13)：**1407 KB raw / 371 KB gzip**（baseline 1324/354，+83/+17）
- 增幅來源：SVG mascots + difficulty JSON + animation CSS（peace.mp3 在 public/ 不算 bundle）
- 加東西時要量 raw 增幅，超 10KB 要思考

---

## 🤖 Model Routing（模型分工 — v2.0.B.278）

> 目標：對的活用對的模型，省 Opus 額度、保品質。主 session(orchestration)維持 Opus；粗活 dispatch 給對的 subagent 模型。
> ⚠️ 主 session 模型由 user 在 client 端切(`/model` / fast)，session 內無法自改；以下規範 dispatch subagent 用。

| 工作類型 | 模型 | 理由 |
|---------|------|------|
| 策略 / 架構設計 / 風險重構 / orchestration / 決策 / code review 抓 bug | **Opus 4.8** (`claude-opus-4-8`) | 判斷力、跨檔影響、正確性最關鍵 |
| 內容改寫(題目 / distractor / 旁白)、microcopy、角色語氣、創意 / 美感發想 | **Fable 5** (`claude-fable-5`) | 語言 + 美感最強、輸出快、適合大量並行 |
| 一般功能實作、元件 coding、寫測試 | **Sonnet 4.6** (`claude-sonnet-4-6`) | 性價比工作馬，省 Opus 額度 |
| 機械式 codemod、格式化、驗證腳本、大量瑣碎替換、查詢 | **Haiku 4.5** (`claude-haiku-4-5`) | 最快最省，不需判斷的活 |

**4 大長期工作流的模型指派**：
- 📄 策略文件 → Opus 設計撰寫
- 🧱 design system 地基 → Opus 定 token 結構 + 元件 API；Sonnet 實作 / 抽 inline style；純機械替換丟 Haiku
- 🌙 夜間模式 → Opus 定暗色 palette；Sonnet 套用
- 🐱 Mochi 變關係 → Opus 設計機制 + 情感；角色文案 / 語氣 Fable；實作 Sonnet

實證：v2.0.B.274-276 用 Fable 並行清 ~740 個 distractor length-tell、UI 掃描用 Fable、策略 / applier / 決策用 Opus。

---

## 📜 Decision Log（重要設計取捨）

| 決策 | 為什麼 |
|------|-------|
| Phaser canvas `display:none`，全 DOM 渲染 | 手機 DPR 模糊 + layout 衝突，徹底解 |
| 故事模式無 HP、force-correct + blindRetry | 兒童學習鐵律 — 不能讓玩家有「失敗焦慮」;blindRetry 強化「自己想出來」的成就感 (v2.0.B.231 改自原「下班逃逸」rationale, 同設計新 framing) |
| 答錯保留正確選項位置不 shuffle | 訓練位置記憶 + 減少作弊感 |
| Zustand 不用 Redux | 輕量、夠用、TypeScript 體驗好 |
| Cloudflare Pages 不用 Vercel | 免費額度大、CDN 快、邊緣計算 future-proof |
| Ghibli 暖色取代 Duolingo 亮綠（v0.8） | 配合小貓故事的治癒感，亮綠太「健身房」 |
| 暫不做完整 SM-2 SRS | MVP 先驗證玩家會不會回來，再投資複雜算法 |
| **BGM 程序合成 → mp3 streaming (v0.13)** | 程序合成 piano 不夠 Ghibli vibe；mp3 走 CDN 不進 bundle，零 perf 代價 |
| **Ch8 narrative：回家 → 留街頭 (v0.10)** | per user feedback「夠戲劇 + 勵志」— 跳出迪士尼套路 |
| **Bypass mode L3 + 6 deny guardrails** | settings.json defaultMode `bypassPermissions`，per user 授權（搭配 deny list 兜底） |
| **Claude Design 不能 invoke，只能瀏覽器手動** | workflow 限制 documented，mascot 重做必須手動操作 |

---

## 📋 Open Questions（v0.13 → v0.14 待決定）

1. **Mascot 重做進度**：外部 AI image gen 還在迭代，Claude Design 手動 + Pollinations fallback
2. **Ch6-8 視覺強化**：題目已就位，但對應 NPC art / 場景 art 還沒到 v0.11 視覺水準
3. **Step 7 housekeeping**：`wordwar-*` CSS classnames 還沒全部 refactor 成 `pickup-*`
4. **Hook encoding fix v4.1 (ASCII suffix)**：still untested on next 80% threshold
5. **SRS 升級**：「答對一次就移出」要不要改「連對 N 次才移出」真 SM-2？
6. **完成 8 章後解鎖什麼**：B1 等級題庫 / 續集故事 / 寵物收藏 cosmetic？
7. **Paywall gate 時機**：v1.0 ship 前加 paywall（章節解鎖已走 ChaptersPage gate，DEV_UNLOCK_ALL 已隨 storyKitten 刪除）

---

## 🗺️ Roadmap

### Phase 1 — v1.x (✅ 完成 2026-05-27 v1.9.56)
- 8 章 quest arc + Ghibli 美學 + Duolingo polish
- v1.9.50 grandma-v4 framework introduced (basis for v2.0)
- v1.9.55 hotfix kt-ch1-06 schema bug, v1.9.56 Mochi default

### Phase 2 — v2.0 Duolingo-nested redesign(in progress)
- ✅ **Plan 1 Phase A+B Ch1 prototype** (this ship):schema 重做 + LessonScene + 24-button map + Ch1 24 lessons / ~110 Q
- Plans 2-8: Ch2-Ch8 content (after Plan 1 ships + model validation)
- Plan 9: Phase D polish + paywall stub + v2.0 final ship

### Phase 2.5 — iOS App Store 上架（post v2.0 ship）

走 **Path B:Capacitor + Codemagic 雲端 build**（2026-05-26 用戶確認）:
- ❌ 不走 Expo/EAS Build(Pickup 不是 RN)
- ❌ 不走本機 Xcode(用戶 Windows 沒 Mac)
- ✅ Capacitor 把現有 web bundle 包進 WebView native shell
- ✅ Codemagic.io 雲端 build(500 min/mo 免費 tier)→ 直推 TestFlight
- ✅ Apple Developer Program $99/yr 是 hard cost
- 全程瀏覽器管 App Store Connect,不碰 Mac

**前置**:先做 PWA(manifest + service worker)讓 iPhone 可加桌面 — 是過渡方案不是衝突方案。

### Phase 3 — 延伸故事 / 多 IP（後傳）
- 候選續集 IP（同調動物治癒系）：
  - 🐶 招財狗的街角生意經
  - 🐢 烏龜的夜班超商
  - 🦊 神社小狐狸（玄幻向）
  - 🐲 靈獸修仙記（東方向）
- Cosmetic IAP：角色服裝 / 場景包

---

## 🚫 Don't Do（踩過的雷）

1. **不要在 Phaser canvas 畫文字** — 手機會糊。所有 text → DOM
2. **不要用 absolute position 排版** — 會 overlap。用 flex column flow
3. **不要做「真實成人壓力劇本」** — 兒童 / 親子客群不該碰留學壓力 / 考試焦慮 / 職場 / 創業 simulator. (v2.0.B.231 改自原「下班族劇本」, 同 rule 新 framing)
4. **不要把音量按鈕做 UI** — 用戶覺得「內設有音樂就好，要關用手機系統音量」
5. **不要顯示「X of 10」counter** — 用 progress bar 即可，數字會增加焦慮
6. **不要讓答錯扣 HP 結束 run（故事模式）** — force-correct + blindRetry 即可，HP 失敗破壞治癒感
7. **不要硬塞短螢幕** — Mascot 要響應式縮小，否則 iPhone SE 等小螢幕會擠
8. **不要省略 `safe-area-inset`** — iPhone notch / home bar 會吃內容
9. **不要 commit 之前先 push** — 確認 build 過，wrangler deploy 失敗會留 dirty state
10. **不要直接抓多益題** — ETS 版權嚴。學測 / 統測題公開可用，但 v0 自製就夠
11. **不要靠 LLM 寫複雜 SVG mascot art** — 物理上限，4 次 iteration 都翻車 (v0.8.2-0.8.4 教訓)。改外部 AI image gen
12. **不要用中文 commit message 跑 `wrangler pages deploy`** — 改用 `--commit-message="..."` ASCII override
13. **不要在 hook script 用 PowerShell `Write-Output` 寫中文** — Claude Code stdin reader mojibake，改 ASCII
14. **不要假設 Cloudflare Pages project name 沒被佔** — 全球 namespace unique，`pickup`/`shiguang` 都被搶，要用 `pickupwords` 這種 less common 組合

---

## 💬 Working Style With User（作者 鄭成功 偏好）

作者的溝通風格 — 請對齊：

### 研究優先（v2.0.B.546 per user — 所有指令都先做）

> 作者 2026-07-01 定調:「以後遇到指令,都先上網查有沒有人做過了、適不適合我的要求,適合就直接照抄」。

- **動手前先查**:每個功能 / 設計 / 演算法指令,先 WebSearch 有沒有現成的業界做法 / library / 公式 / pattern(這份 session 已多次這樣做:LTV 公式、blank-position lint、cloze 難度、onboarding、Claude Design)。
- **適合就照抄**:找到貼合需求的成熟做法就直接沿用它的結構 / 公式 / 參數,不要自己重造。研究結論寫進 commit / PR / 回覆(附來源連結)。
- **判斷「適不適合」**:對齊本專案客群(8-12 兒童 / 親子)、技術棧(React + Cloudflare Pages static + localStorage)、極簡設計原則;不合就說明為什麼、給替代。
- **界線**:照抄 = 抄「做法 / 結構 / 公式」,不是抄有版權的內容 / 素材(題目仍自製、圖仍外部生)。授權(license)要相容。

### 提問與回答
- **A/B/C 選擇題格式**作者最買單。每個選項加 emoji + 簡述
- 預設行為要明確：「沒回 X 分鐘預設跑 🅰️」— 不要讓 user 卡住
- 列表要短，行動要決斷
- **比喻 + 大白話**勝過 jargon
- **最重要 + 最簡單放第一個**，不要照建議流程順序

### 工作節奏
- 作者一次給多個指令，期待 subagent 並行處理
- 完成後 Telegram 推「v0.X 完成 + URL」單獨一條
- **每次 dispatch subagent 前先列「會碰哪些檔 + 跑哪些指令」**，避免瞎簽 permission
- Permission prompt 跳出來前先在 Telegram 解釋為什麼 + permit 什麼 + 拒絕的影響
- **拆小任務、避免巨型單輪輸出**（防 session 卡住/壓縮）：大工作切成可獨立 commit 的小步,或 dispatch subagent 並行,不要在主 session 一輪塞滿。長表/逐項掃描丟 subagent,主 session 只收結論。(2026-06-20 regression-after-fix 教訓:「已內化」但沒寫進這裡的習慣會跟著 session 死掉)

### 文體偏好
- 禁贅字（「🤖」「※」「簡言之」這些）
- 禁英譯腔（「保持開放」改「歡迎交流」）
- 預設精簡版
- 預測類用 bull / base / bear 三檔
- Telegram 回覆禁 `**markdown**`，強調用 emoji 開頭（🎯/⚠️/✅/⭐/💡）

### 不喜歡
- 「Permission 跳出來但沒解釋」— 一定要先講
- 「subagent 跑完才告訴我做了什麼」— 要事先預告
- 「Confirmation 跳出來但不知道拒絕會怎樣」— 一定要說明拒絕的影響
- 過度問問題 — 能自己判斷就動

### 喜歡
- 「我替你想到了 X，三個方向供你選」這種主動性
- 數字 + 證據 ≥ 純文字描述
- 「⭐ 推薦 🅰️」這種有立場的引導（但要說理由）

---

## 🔗 External Links

- **Live URL**: https://pickupwords.pages.dev/
- **Repo**: https://github.com/kengkeng44/pickup
- **Cloudflare Pages project**: `pickupwords`
- **Mascot workflow doc**: `Desktop\拾光-mascot-claude-design-steps.md`
- ⚠️ 舊 URL `wordwar.pages.dev` = 404（project 已刪除）
- ⚠️ 舊 repo `kengkeng44/wordwar` 自動 redirect 1 年

---

## 📝 Onboarding Checklist（新 Claude session 接手時）

1. ⬜ 讀完這份 CLAUDE.md
2. ⬜ `git log --oneline -10` 看最新 commit 軌跡
3. ⬜ 跑 `npm install && npm run dev` 在 localhost 玩過一輪
4. ⬜ 看 `src/data/lessons.ts` 理解 v2.0 LessonSchema + loadChapterLessons() + applyContentOverlay()
5. ⬜ 看 `src/react-app/pages/LessonPage.tsx` + `src/react-app/renderers.tsx` 理解答題核心 + 各題型 + blindRetry
6. ⬜ 看 `src/react-app/pages/MapPage.tsx` 理解地圖 / 節點解鎖 / HUD
7. ⬜ 看 `src/store/runStore.ts` 理解 lesson 進度 (循序解鎖) + `src/data/players.ts` 多帳號
8. ⬜ 對齊作者偏好（這份的 "Working Style" 一節）+ 讀 `docs/standards/2026-06-27-recurring-bug-prevention.md` R1-R7 自查
9. ⬜ 動工前列「會碰哪些檔 + permission 預告」

---

*Last updated: 2026-06-27 by Claude — synced to v2.0.B.475: Phaser + v1.x cloze 引擎刪除後的純 React 架構*
