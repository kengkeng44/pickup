# 故事燈 遊戲設計標準(Game Design Standards)

> v2.0.B.579 · per user「查大家開發遊戲的標準,缺的補上」。
> 研究出處:[Game Design Pillars](https://www.gamedeveloper.com/design/design-pillars-the-core-of-your-game) · [gamedesignskills.com](https://gamedesignskills.com/game-design/design-pillars/) · [FTUE 指南](https://www.blog.udonis.co/mobile-marketing/mobile-games/first-time-user-experience) · [Appcues onboarding patterns](https://www.appcues.com/blog/choosing-the-right-onboarding-ux-pattern)
> 配套標準:字級/色卡 → `2026-07-06-design-standard.md` + `src/ui/theme/tokens.css`;UI 原則 → CLAUDE.md「UI/UX 設計原則」。

## 1. 設計支柱(Design Pillars)— 每個功能決策先過這三關

1. **🏮 燈下的陪伴**:一切體驗像奶奶在燈下說故事 — 溫暖、不催促、不威脅。任何製造焦慮的機制(倒數、懲罰、恐嚇文案)直接否決。
2. **🧠 自己想出來**:學習的成就感來自自己想通(blindRetry 不揭露答案、解說不宣判、提示漸進)。任何「直接給答案」的捷徑設計否決。
3. **🌙 睡前儀式感**:一晚一夜的節奏 — 短 session、明確收尾、夜色美學。任何鼓勵無限刷的設計(無底 feed、FOMO)否決。

**用法**:新功能 PR 描述要能回答「支持哪個支柱?」;三個都不沾 = 不做。

## 2. FTUE / 一次性教學(per user 2026-07-09 定調)

- **一次性教學 = 首次進頁彈窗**(`FirstVisitTip` 元件),**不在頁面上常駐加字**。
- 規則(業界 coach-mark 慣例):一次只出一則、點背景即關、關了永不再出(`pickup.tip.<id>`)、每畫面最多 1 個、內容 ≤ 2 行。
- 能靠圖示/情境自解釋的,連彈窗都不要。
- 首 60 秒讓玩家「做中學」(kinesthetic):不擋操作、不放長流程 walkthrough。

## 3. Game Feel 檢查表(每個互動元件出貨前)

- [ ] 按壓回饋:`.pickup-press`(下沉 2px + 底邊收窄)
- [ ] 音效:答對/答錯/點擊(可靜音)
- [ ] 動效 ≤ 250ms、`prefers-reduced-motion` 全關
- [ ] 成功時刻有慶祝(pop/confetti/讚語輪替),失敗時刻溫柔(不紅屏、不音效懲罰)
- [ ] 進度可見(進度條,不用數字 counter)

## 4. 內容規範(已散落各處,此處彙整索引)

- 題目品質:`auto-fix-tiers.md` + validate-lessons.js X 系列 lint(X59/X68 = 語氣防線)
- 對外文案:voice-and-tone(台灣用語、禁贅字、兒童不焦慮)
- 版權:單字可參考公開字表;句子/題目/釋義全自製
- 語言一致:改內容必同步 ja/ko overlay(B.550)

## 5. 無障礙 / 兒童適配底線

- 觸控目標 ≥ 44px;文字對比過 WCAG AA(夜色下已驗)
- 全部互動有 aria-label;焦點框可見
- 不放廣告進 FTUE;家長區用算術門檻
- 8-12 歲語域:無 metalinguistic 術語、無成人 register

## 6. 工作流(per user 2026-07-09)

- 上網研究、回讀標準:**effort 最高**,讀完整再動手
- 改頁面/介面:**Fable 優先**,不可用才退 Sonnet
- 新視覺元素:先過色卡(palette.html)+ 字級 ramp,禁散裝 hex/字級
