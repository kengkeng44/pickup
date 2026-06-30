# Claude Design 工作流 — 怎麼納入 Pickup 開發

> 2026-06-29 · per user「研究怎麼流程化 Claude Design, 接入這邊還是儀表板, 上網查大家怎麼用」。

---

## 0. 一句話結論

**Claude Design = UI / 設計系統的 AI 設計工具(畫版面、元件、tokens、互動原型),不是畫吉祥物/單字插圖的工具。**
插圖(Mochi/奶奶/實物圖)維持 ChatGPT/Gemini/DALL-E 手動管道(見 `Pickup-isometric-character-prompts.md` + `Pickup-map-fusion-prompts.md`)。
Claude Design 用來:重做地圖/課程/連勝/英檢入口/儀表板這種**畫面與元件**,然後一鍵 handoff 給 Claude Code 實作。

---

## 1. 它是什麼(2026 現況)

- Anthropic Labs 出的設計工具,網址 **claude.ai/design**,Opus 驅動,左聊天右畫布(canvas)。
- 從 prompt / 檔案 / 品牌context 生**原型、簡報、一頁式、初版設計系統**。
- 跟 **Claude Code 雙向同步**:`/design-sync`(Claude Code v2.1.181+)。
- 需要 **Pro / Max / Team / Enterprise** 訂閱。
- 本 session 已掛 **DesignSync 工具**(走 claude.ai 登入;第一次呼叫會要求加 design 權限,或用 `/design-login`)。

> ⚠️ 不適用:Ghibli 吉祥物 / 實物單字圖 = 插畫資產,Claude Design 不生這個。別把它跟生圖管道搞混。

---

## 2. 四步工作流(pull → design → handoff → push)

| 步驟 | 在哪做 | 做什麼 |
|------|--------|--------|
| 1️⃣ **Pull 設計系統** | Claude Code 裡跑 `/design-sync` | 把 Pickup 本地的設計系統(`src/ui/theme/tokens.css` 語意色票 + `src/ui/components/` Button/Card/ProgressBar + renderers 題型)匯入一個 Claude Design 專案。之後 canvas 生的畫面都用**你真正的元件 + tokens**。 |
| 2️⃣ **Design 畫面** | claude.ai/design canvas | 用 prompt + 直接拖拉 + inline 註解,設計新 surface(例:英檢入口、連勝畫面改版、地圖 v2)。用真元件 → 不是憑空畫。 |
| 3️⃣ **Handoff** | canvas → Export →「Send to Claude Code」 | 打包 handoff bundle:元件結構 spec + 用到的 tokens + 版面層級 + RWD 斷點 + 互動狀態。Claude Code 讀**結構化 spec**(不是截圖猜像素)→ 對著你真元件庫寫 code。 |
| 4️⃣ **Push 回去** | Claude Code 裡 `/design-sync`(push 方向) | 程式實作完,把現況推回 canvas,保持設計與 code 同步(雙向)。 |

關鍵差異:傳統「設計稿截圖 → 工程師重刻」會丟資訊;Claude Design → Claude Code 是**同家族模型傳結構化 spec**,直接對你的 component library 落地,少很多走鐘。

---

## 3. 接入哪裡?「這邊(app)還是儀表板?」

| 選項 | 適合度 | 說明 |
|------|--------|------|
| 🅰️ **App UI(建議先做)** | ⭐⭐⭐⭐ | Pickup 已有 `src/ui/components/` + `tokens.css` + 20 種題型 renderer = 現成設計系統種子。`/design-sync` pull 進去後,新畫面(英檢入口、連勝、地圖改版、新題型)先在 canvas 迭代再 handoff。ROI 最高。 |
| 🅱️ **儀表板 cockpit** | ⭐⭐ | cockpit 是純手寫 HTML(`cockpit-deploy/index.html`),可單獨開一個 Claude Design 專案重做版面,但它是內部工具、優先度低。 |
| 🅲️ **插畫資產** | ❌ | 不走 Claude Design,維持外部生圖管道。 |

**推薦路徑**:先 🅰️ —— 拿一個小而真的目標試跑全流程(例:用 Claude Design 重做「英檢入口卡」或「連勝畫面」),走通 pull→design→handoff→push 一輪,確認對 Pickup inline-style React 的 handoff 品質,再決定要不要更大範圍用。

---

## 4. 前置 / 注意

- **訂閱**:作者帳號要 Pro/Max 以上才有 claude.ai/design。
- **Claude Code 版本**:`/design-sync` 需 v2.1.181+。
- **登入**:DesignSync 走 claude.ai 互動登入 → headless/cron session 可能沒有(設計這步本來就該在有人 session 做)。
- **元件庫結構**:Pickup 是 inline-style React(`renderers.tsx` 巨檔 + `ui/components/`)。/design-sync 對「有清楚元件邊界」的庫效果最好 → 之後若認真用,值得把常用 UI 再抽成更明確的 component(Button/Card/Sheet/Node…)。
- **一次一元件**:`/design-sync` 設計同步是**增量**(一個元件一個元件),不是整包覆蓋。

---

## 5. 下一步(要不要做)

- 🅰️ 我可以幫你**把 Pickup 設計系統整理成 /design-sync 友善的清單**(列出 tokens + 現有元件 + 建議抽出的元件),當 pull 的起點。
- 🅱️ 挑一個 surface(英檢入口 / 連勝 / 地圖 v2)當**第一個 Claude Design 試跑目標**,我先寫好「設計 brief」你貼進 canvas。
- 🅲️ cockpit 加一個「Claude Design 工作流」卡片連到本 doc(已做)。

> 這份是 onboarding;真正 pull/push 要在作者有 claude.ai/design 訂閱的 session 操作。

---

## 來源(2026-06 查)

- Anthropic 官方:Introducing Claude Design by Anthropic Labs — https://www.anthropic.com/news/claude-design-anthropic-labs
- Help Center:Get started with Claude Design — https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- Help Center:Set up your design system in Claude Design — https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
- 雙向 /design-sync(beta, Pro+)— https://blog.vibecoder.me/claude-design-system-sync-code-handoff
- Handoff 機制(bundle 內容)— https://claudefa.st/blog/guide/mechanics/claude-design-handoff
- 完整 setup/workflow guide 2026 — https://www.designsystemscollective.com/claude-design-the-complete-setup-workflow-guide-2026-5de41e62fd4c

---
*v2.0.B.509+ · Claude*
