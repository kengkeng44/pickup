# Pickup 文件化 Phase 2 — 設計文件

> Brainstorming 產出。定義要交付的文件集合、結構、內容來源與驗收哲學。
> 核准日期：2026-07-12。下一步：writing-plans 產出實作計畫。

## 目標

為 `pickup`（原 wordwar 資料夾，repo `kengkeng44/pickup`，Capacitor 版）建立一套結構化文件：

1. **AGENT.md**（工程視角代碼地圖）
2. **spec/**（詳細規格，現狀 baseline + 目標 delta）
3. **spec/acceptance/**（可量化、可對照、要證據的驗收標準）

## 已定案決策（brainstorming）

- **分工**：`AGENT.md` = 代碼地圖（結構／進入點／約束／規則）；`CLAUDE.md` **保留**當產品/設計/故事 source（不刪、不取代）。
- **spec 目的**：現狀 baseline + 目標 delta 並存；驗收兩者都驗。
- **spec 位置**：repo 根的 `spec/`（覆蓋 superpowers 預設 `docs/superpowers/specs/`；後者只放本 design doc）。

## 交付檔案樹

```
pickup/
├── AGENT.md
├── CLAUDE.md                       # 現有,保留
└── spec/
    ├── README.md                   # 主規格:定位+客群+交付總覽+子規格索引
    ├── 01-game-mechanics.md        # cloze核心/5題型/難度/SRS/blindRetry/force-correct
    ├── 02-visual-style.md          # Ghibli暖色/色票/isometric chibi/flat-no-halo/響應式
    ├── 03-content-story.md         # 8章框架/奶奶8夜/7童話/Ch1完成→Ch2-8待做
    ├── 04-deliverables.md          # v2.0 ship/paywall stub/DEV_UNLOCK flip/PWA/iOS TestFlight
    └── acceptance/
        └── acceptance-criteria.md  # 逐條:量化數字 + 判斷方法 + 測試證據
```

## 內容來源（distill 自現有 CLAUDE.md，附行號）

- Tech Stack & Architecture（344-365，含 Phaser-as-statemachine / 全-DOM 渲染關鍵決策）→ AGENT.md
- Code Structure（368-426，src/ 完整樹）→ AGENT.md 倉庫結構
- Development Convention（430-460，commit 格式 / deploy flow / build budget）→ AGENT.md 約束
- Decision Log（464-478）→ AGENT.md 約束背景 + spec rationale
- Don't Do（531-546，14 條踩雷）→ AGENT.md 規則
- Vision（29-56）/ Story Framework（186）/ Core Mechanics（228）/ Visual Language（258）/ Audio（330）→ spec/ baseline
- Open Questions（482-490）+ Roadmap（494-527）→ spec/ 目標 delta

## AGENT.md 內容大綱

一句話定位 + 版本狀態 ｜ 倉庫結構（top-level + `src/` 標註樹）｜ 代碼進入點與資料流（`main.tsx` → Phaser scenes 狀態機 → `ui/` DOM 渲染 → `data/` + `store/`）｜ 資源文件（`public/lessons-ch*.json`、`vocab.json`、`peace.mp3`）｜ docs/ 各子夾對應表 ｜ 實現約束＋規則（全-DOM、禁 absolute、build budget、deploy flow、commit 格式、14 Don't-Do、bypass mode）｜ 建置/部署/測試指令

## 驗收哲學（防蒙混）

每條驗收都要：**可量化的數字** + **具體判斷方法**（可對照，不靠感覺）+ **必附測試通過證據**。範例：

| 項目 | 量化 | 判斷方法 | 證據 |
|---|---|---|---|
| Build 大小 | < 1MB raw / < 400KB gzip | `npm run build` 讀 size | build 輸出 |
| 無 blur 光暈 | = 0 處 | `grep -rE 'box-shadow.*blur\|drop-shadow' src` | grep 空結果 |
| 色票統一 | olive/terracotta 單一來源 | 只在 `src/ui/tokens.ts` 定義 | grep 無散落 hex |
| 測試 | 22 vitest pass | `npx vitest run` | vitest 輸出 |
| Ch1 內容 | 24 lessons / ~110 Q | `tools/validate-lessons.js` | validate pass |
| 部署 | 可載入 | curl deployed URL + grep dist | smoke 輸出 |

## 待決 / 需在文件中標記的 open flags

1. **RN vs Capacitor**：CLAUDE.md 寫「不走 RN」，但 memory + `pickup-rn` repo 顯示曾 pivot RN；本 pickup(Capacitor) commit 較新。文件以 Capacitor 現狀為準，將 RN 狀態列 open question。
2. **CLAUDE.md 過時處**：line 3 說資料夾仍叫 wordwar（已改名 pickup）；Roadmap 幾處 wordwar 殘留。AGENT.md 註明正名，CLAUDE.md 順手校正。
3. **頂層雜物**：`C:UsersacerDesktop...`、`Users...index.html` 等路徑當檔名的殘骸 + `COMMIT_MSG.tmp` / `_lint_*.py` 等——列清理候選，不在本階段刪。

## 範圍界線（YAGNI）

- 只做 `pickup`（Capacitor）；**不碰** `pickup-rn`。
- 只寫文件，**不改遊戲代碼、不實作功能**。
- 不做無關重構；stale 字樣校正僅限文件。
