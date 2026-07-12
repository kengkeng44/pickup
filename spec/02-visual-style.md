# 02 — 視覺風格規格

> 讀法見 `spec/README.md`：Baseline 只寫實測過、可重跑指令驗證的事實；Delta 寫下一步 + 可判斷完成的驗收條件。

實測日期：2026-07-12。實測方式：直接 grep `src/ui/tokens.ts`（色票單一來源）與 `src/**`（blur/glow、`wordwar-` classname 殘留），交叉核對 `CLAUDE.md` 258-329 行（Visual Language）與 464-478 行（Decision Log，Ghibli 決策）；有出入處在對應小節註記。

---

## Baseline（現狀，可驗）

### 0. 風格路線：Ghibli 暖色 + isometric chibi 角色（雙軌，非單一風格）

`CLAUDE.md` 記錄的實際決策比「純 Ghibli」更細，是**雙軌並行**：

| 範疇 | 風格 | 依據 |
|---|---|---|
| 角色美術（貓 / NPC / 人物） | **isometric Duolingo chibi**（大頭小身、純色塊無黑邊、坐白色 tile 平台、軟陰影） | `CLAUDE.md:299-303`，v1.7.6 視覺方向重定 |
| POV 場景背景（Ch1 q1-q6，貓不在場景中時） | **painterly Ghibli**（painterly + atmospheric） | `CLAUDE.md:302` |
| 整體色調基調 | Ghibli 暖色（取代 v0.4 Duolingo 亮綠） | `CLAUDE.md:473` 決策日誌：「Ghibli 暖色取代 Duolingo 亮綠（v0.8）—— 配合小貓故事的治癒感，亮綠太『健身房』」 |
| 小裝飾 / icons | 可混用其他 style | `CLAUDE.md:303` |

即：**「日系手繪治癒感」是色調 + 場景背景的基調，角色本體走的是 Duolingo 式扁平 isometric chibi，不是 Ghibli 手繪人物**。這與任務指令原稿「isometric chibi 角色…非日系扁平」的措辭有出入 —— 實測結果是 isometric chibi **本身就是**這個專案定義的扁平化角色風格（非日系手繪人物），與 Ghibli 手繪感的分工在「角色 vs 場景背景」，而非互斥。以 `CLAUDE.md` 原文為準。

角色陣容：grandma + shiba + Mochi 三花貓（`storyKitten.ts` / `Mascot.ts` 對應素材）。

### 1. 色票（單一來源 `src/ui/tokens.ts`）

實測 `grep -E "COLOR_(GREEN|RED|CREAM|AMBER|TEXT_DARK)" src/ui/tokens.ts`：

```
COLOR_GREEN       = '#7d9a4f'   // olive（答對；取代 Duo 亮綠 #58cc02）
COLOR_RED         = '#c84a3a'   // terracotta（答錯；取代 Duo 熱紅 #ff4b4b）
COLOR_CREAM       = '#fef8ed'   // 背景
COLOR_AMBER       = '#e7a44a'   // accent
COLOR_TEXT_DARK   = '#3d2817'   // 主文字
```

`tokens.ts` 內每個色票旁都以註解標註「was Duo bright / was Duo hot」，明確記錄棄用亮色系、改採低飽和暖色的路線。衍生色（`_DARK` / `_TINT` 變體，如 `COLOR_GREEN_DARK`/`COLOR_GREEN_TINT`）同檔案內可查，此文件只列 Step 1 指定的 5 個核心 token。

`CLAUDE.md:262-271` 另記錄一組 CSS custom property 命名（`--pickup-success` / `--pickup-error` / `--pickup-streak` / `--pickup-xp` / `--pickup-bg` / `--pickup-accent` / `--pickup-text`），是 `tokens.ts` 數值在 CSS 層的語意化別名，兩者非各自獨立來源 —— `tokens.ts` 是唯一色值真相來源。

### 2. 無 blur 光暈（v1.9.44 決策，已清除，殘留僅剩合法用途）

實測：
```
grep -rnE "box-shadow:[^;]*blur|drop-shadow" src --include=*.ts --include=*.tsx --include=*.css
→ 5 處命中
```

逐一檢視命中內容，**全部是「移除 blur 光暈」的歷史紀錄或合法替代用法，無一是仍在用的 box-shadow 光暈**：

| 檔案:行 | 內容性質 |
|---|---|
| `src/style.css:642` | 註解說明改用 `filter: drop-shadow`（保 border-radius）取代舊做法 |
| `src/style.css:648` | 註解：「v1.9.44 Duo flat：was a drop-shadow halo, now a transform scale pulse」— 記錄光暈已改 pulse |
| `src/style.css:986` | 註解：「v1.9.44 Duo flat：removed amber drop-shadow halo」— 記錄已移除 |
| `src/ui/Mascot.ts:161` | 註解：說明用陰影手法讓 mascot 貼地，**不用** drop-shadow |
| `src/ui/StoryMapView.ts:931` | 註解：「re-ground the mascots after v1.9.44 stripped the drop-shadow halos」— 記錄光暈已被拔除 |

結論：**當前無任何 box-shadow blur 環擴光暈在用**，5 筆命中均為程式碼註解（記錄棄用過程）或合法的 `filter: drop-shadow` 貼地陰影替代方案。「pulse 用 transform scale 非 box-shadow 環擴」的規則已落地，符合 `CLAUDE.md` 隱含的 v1.9.44 決策精神（「色塊打光 ≠ 光暈」）。此為 Baseline 事實，非待清 delta。

### 3. 動畫

`CLAUDE.md:286-289`：`pickup-bounce` / `pickup-pulse` / `pickup-wobble` / `pickup-fade-up` / `pickup-streak-pop` / `pickup-confetti-burst` / `pickup-glow`，250ms 呼吸節奏，`prefers-reduced-motion` 有遵守（未在本次實測重新驗證此 media query 用法，沿用 CLAUDE.md 既有記錄）。

### 4. 響應式

`CLAUDE.md:321-326`：直立手機 app 風（400×800 portrait），`100dvh` + `safe-area-inset`（iPhone notch / home bar），短螢幕自動 scroll，Mascot 響應式縮小。此份文件未重新 grep 驗證 `safe-area-inset` 實際使用位置，沿用既有記錄，若需重驗可另跑：`grep -rn "safe-area-inset" src`。

---

## Delta（目標 + 驗收條件）

### D1. Ch6-8 NPC / 場景 art 未到 v0.11 視覺水準

來源：`CLAUDE.md:485`（Open Questions #2）：「Ch6-8 視覺強化：題目已就位，但對應 NPC art / 場景 art 還沒到 v0.11 視覺水準」。

- **現狀**：文字題目內容已完成，對應美術資產（NPC isometric chibi + 場景 painterly 背景）落後。
- **驗收條件**：Ch6、Ch7、Ch8 每章至少主要 NPC 有對應 isometric chibi PNG（非佔位圖 / 非文字替代），場景背景達到與 Ch1-5 同等 painterly 完成度。判斷方式：人工比對 `public/mascots/` 與 `public/scenes/`（或對應資產目錄）内 Ch6-8 資產是否存在且非 placeholder。

### D2. `wordwar` 命名殘留 —— 實測結果與任務假設不同，需澄清範疇

原指令假設殘留型態是 **CSS classname**（`wordwar-*` → `pickup-*`）。實測：

```
grep -rn "wordwar-" src --include=*.ts --include=*.tsx --include=*.css
→ 0 處命中
```

**CSS classname 層級已無 `wordwar-` 殘留，這部分已完成，驗收目標（0）已達成，無需再列為 delta。**

但放寬 pattern 為不含連字號的 `wordwar`（`grep -rn "wordwar" src`）另找到 **7 個檔案**命中，經逐一核對，性質是 **localStorage key 命名空間殘留**，非 CSS classname：

| 檔案 | 命中內容 |
|---|---|
| `src/ui/ModeMenu.ts:38` | `const LS_INTRO_DISMISSED = 'wordwar.introDismissed'` |
| `src/store/runStore.ts:154` | `const LS_LEVEL = 'wordwar.level'` |
| `src/scenes/StoryModeScene.ts:711` | `localStorage.getItem('wordwar.srs.kitten')` |
| `src/audio/AudioManager.ts` / `src/data/scenarios.ts` / `src/data/storyKitten.ts` / `src/react-app/pages/LessonPage.tsx` | 同類 `wordwar.*` key 或引用（未逐行列出，見下方驗證指令） |

這對應 `CLAUDE.md:486`（Open Questions #3）：「Step 7 housekeeping：`wordwar-*` CSS classnames 還沒全部 refactor 成 `pickup-*`」—— **CLAUDE.md 原文措辭聚焦 CSS classname，但實測顯示真正殘留的是 localStorage key 前綴，CSS 側已乾淨**。CLAUDE.md 這條 Open Question 應視為過時或範疇需更新，而非本文件的視覺風格 delta（localStorage key 命名不影響視覺呈現，是資料/儲存層命名一致性問題，不屬 `spec/02-visual-style.md` 範疇，建議另立 issue 追蹤，不在此文件內設驗收條件）。

- **本文件驗收條件（視覺風格範疇內，CSS classname）**：目標 0，**已達成**（`grep -rn "wordwar-" src --include=*.ts --include=*.tsx --include=*.css` → 0）。維持 0 即通過，未來新增元件需延續 `pickup-*` 命名慣例。

---

## 驗證指令彙總

```bash
cd /c/Users/acer/Desktop/pickup
grep -E "COLOR_(GREEN|RED|CREAM|AMBER|TEXT_DARK)" src/ui/tokens.ts
grep -rnE "box-shadow:[^;]*blur|drop-shadow" src --include=*.ts --include=*.tsx --include=*.css   # 5（皆為棄用註解 / 合法 filter:drop-shadow，非在用光暈）
grep -rn "wordwar-" src --include=*.ts --include=*.tsx --include=*.css                              # 0（CSS classname 已乾淨）
grep -rn "wordwar" src                                                                               # 7 檔（localStorage key 殘留，非本文件範疇）
```
