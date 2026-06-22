# Pickup TODO Backlog (B.232+ Roadmap)

> Generated 2026-06-06. Updated as scope shifts.
> 主要 TODO 跟著 client/strategic ROI sequence 排,5 補洞 + 內容擴張 + 自動化 + skill 安裝.

---

## 🏗️ 5 個補洞 (per docs/strategy + competitor 架構研究)

詳細成果 + 成本 → 上次對話完整 table 已給。

| 排序 | 補洞 | 時間 | 金錢/yr |
|------|------|------|---------|
| #1 Quick | **R2 audio infra** | 4-8 hr | < $10 |
| #2 Quick | **PostHog Experiments** | 6-10 hr | $0 (Free) |
| #3 核心 | **Supabase 後端 + Auth + Multi-Profile** | 30 hr | $0-300 |
| #4 核心 | **Expo + React Native rewrite** | 40-60 hr | $124 (Apple+Google+EAS Free) |
| #5 Defer | **Server-Driven UI (SDUI)** | 40-80 hr | $20-60 |

**真實推薦順序**: #1 + #2 並行 (12 hr 一個 sprint) → #3 (30 hr) → #4 (50 hr) → #5 (Year 2 MAU > 10K 才動)

---

## 🛠️ 5 個補洞 — 開始前必先

- [ ] **Deploy 56+ commits 累積** — 你跑 `infisical login`
- [ ] (補完 R2 前需) — Ch2-7 grandma TTS gen (~2 hr OpenAI API ~$X cost)

---

## 🎨 Skills / Plugins 安裝 TODO

- [ ] **Frontend Design plugin** — 安裝命令:
  ```bash
  git clone https://github.com/anthropic/skill-frontend-design.git "C:/Users/acer/.claude/skills/frontend-design"
  ```
  (若 URL 不對, 改 davidkrohn/claude-frontend-design)

- [x] Superpowers — 已裝
- [x] Expo plugins — 已裝
- [x] Context7 MCP — B.232 剛裝
- [x] Figma MCP — 已裝
- [x] NotebookLM — 已裝
- [x] narrative-cut-analyst — 自建
- [x] pickup-item-writer — 自建

---

## 📚 Content 擴張 TODO (B.232+)

- [ ] 新增 5-10 個故事 (Aesop / Grimm / 兒童經典 / 中華民間)
- [ ] 兒童經典 IP: 三隻小豬 / 小紅帽 / 傑克與豌豆 / 灰姑娘正版 / 白雪公主
- [ ] 中華民間: 嫦娥 / 后羿 / 田螺姑娘 / 牛郎織女 / 孟姜女
- [ ] 動物寓言: 螞蟻與蚱蜢 / 狐狸與葡萄 / 龜兔 prequel
- [ ] 新題型補:
  - listen-emoji (聽聲音選圖)
  - drag-blank (拖字到空格)
  - speak-back (錄音對齊)
  - read-and-tap (讀句點關鍵字)
  - picture-mc (圖選句)

---

## 🤖 Automation 完善 TODO (詳見對話 + B.232 設計)

詳細請看 `docs/automation-roadmap.md` (待產生).

主要分桶:
- A. Content pipeline (story → app, fully auto)
- B. Personalization (per-kid)
- C. Quality / lint
- D. Dev / Deploy CI/CD
- E. Audio / illustration
- F. Notification engagement
- G. Multi-language translation
- H. Recommendation engine

---

## 🚀 Phase 3 Sibling app (上班族) — 預留

- [ ] Fork pickup-office repo
- [ ] 換 IP: 神社小狐狸 / 烏龜夜班超商
- [ ] Reuse: hook framework / schema / Phaser arch / notification scheduler / paywall

---

*Updated: 2026-06-06 / Last commit: B.231 (ecf66a2)*

---

## 📌 2026-06-22 Session 待辦 (user 要求:沒完全做一樣的都記這)

> 規則 (per user): 每一條提過但「沒完全照做 / 只做局部 / 還沒做」的需求都登記在此。

### 內容大型 rollout (各需 Fable 批次, 逐章過 build + check-answer-index gate)
- [ ] **翻譯全部重檢 (整句意譯, 原文不動)** — sentenceZh / optionsZh / explanationZh 全 32 章重翻, 用整句整段意思 (非機翻/逐字). 單字個別解釋走 word-hints. ❗未開始.
- [ ] **句子中文 sentenceZh 全章** — 只做 ch1 (15 題). 其餘 31 章未補 → 聽力/理解題點第二下沒中文.
- [ ] **三難度「句子」(sentenceHard 原文 / sentence 適中 / sentenceEasy 簡單) 全章** — 只做 ch1 + 4 文法題, 全庫覆蓋率 ~0%.
- [ ] **三難度「答案選項」(原文/適中/簡單)** — ❗未開始. 要: schema 加 optionsEasy/optionsHard + renderer 依 pickup.difficulty 選 options + 全章內容. (user: 玩家選哪個難度, 題目+答案都用那個)
- [ ] **文法題多元化 + 加量** — 目前只 4 題 (時態/第三人稱-s/介系詞). 要鋪 A1/A2 roster: be動詞 am-is-are / 現在進行 / 冠詞 a-an-the / 單複數 / 介系詞 in-on-at / 指示詞 this-that-these-those / 所有格 my-your-'s / 代名詞 he-she-it-they / can-can't / 比較級 -er-more / should-must-have to. 每章 2-3 題、分散.
- [ ] **listen-mc 比例壓到 ≤35%** (依 docs/standards/2026-06-22-question-distribution-standard.md) — 未做.

### 新題型 / 功能
- [ ] **滑動選答案題型 (Duolingo「填空 + 上下滑動選詞」)** — 像 screenshot「Quiero __ sombrero」下面滑動選 una/unos/unas. 上面題目可變、下面滑動選, 可能 3 題. 需: 研究多鄰國此題型 + 新 schema type + renderer (vertical picker/wheel) + 內容. ❗未做.
- [ ] **單字卡 premium 接真正金流** — 目前 setPremium() 是 stub. 之後接 IAP/後端授權.
- [ ] **真人 grandma TTS** — 只 ch1 有 MP3. ch0(改版後)+ ch2-31 走 WebSpeech. 新增的 sentenceZh 句子也沒語音. 需設 OPENAI_API_KEY 跑 tools/batch-tts.cjs + tts.ts CHAPTERS_WITH_MP3 加章.

### 架構 (要授權跳出「只動 lessons」)
- [ ] **arch P0-2: CI 循環依賴 gate** — package.json 加 check:circular (madge) + ci.yml 一步. (docs/audits/2026-06-09T1214-arch-cron.md)

### 已完成 (本 session, 供對照)
- [x] ch0 改起源故事 + 刪名詞速查 / cockpit modal 防重複 + 白話化 / QA 總覽題型分佈 + 小章節快速跳
- [x] grammar-mc 題型 + ch0/ch1 範例 / 句子 3 段揭示 (空白→英→中) + 旁白去框自動推進
- [x] 單字卡功能 + vocabStore 資料層 (100 張免費上限 + paywall stub)
- [x] 答對彈兩下 + 喇叭按壓動畫 (pop + 聲波環)
