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
