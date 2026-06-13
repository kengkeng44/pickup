# 拾光 (Pickup) — 產品痛點 × UI/UX 長期方向 (2026-06-13)

> 作者: Claude (Opus 4.8) session 2026-06-12/13。承接 design-system 三連 (B.279-282) 與 Mochi 羈絆設計 (B.283)。
> 目的: 把「還沒被發現的痛點」+「Duolingo 級可維護 UI 的決策」+「Mochi 變關係的設計」收成單一 source of truth。

---

## 1. 潛伏痛點 (依「潛伏 × 槓桿」排序)

| # | 痛點 | 證據 / 現況 | 槓桿 |
|---|------|------------|------|
| 1 | **睡前 app 卻沒夜間模式** | 全 app 亮奶油 `#fef8ed`;掃 `src` 零 dark-mode (B.282 前) | 已修 B.282 (token 雙主題 + Profile 切換);暗色 palette v1 待實機微調 |
| 2 | **付錢的家長在產品裡隱形** | 有 LevelTest/Share/mute,但無「今晚學了什麼/週報/成效」家長面 | 高 — 續訂 + 口碑 + heritage 家長要看到成效 |
| 3 | **heritage 子女讀不懂中文鷹架** | `optionsZh`/explanationZh 全繁中;掃 `src`+`public` 零注音/拼音 | 高 — 海外華人子女英文 > 中文, 看不懂繁中解釋 |
| 4 | **Mochi 是裝飾不是關係** | MochiOutfitAvatar 換裝仍 emoji 佔位;貓只是聽眾 | 最高 — 睡前最強留存核心。B.283 起做「羈絆」 |
| 5 | **留存抄 Duolingo, 但睡前=儀式不是競爭** | streak/achievements/leaderboard 念頭 | 策略 — 機制應刻意分岔: 溫暖儀式 > 焦慮迴圈 |
| 6 | **沒有「學習有效」的證據** | SRS lite, 但無保留率/診斷/「本週學會 N 字」 | 中高 — efficacy 是賣點也是護城河 |

下一個該動: **#2 家長面** 與 **#3 注音/中文發音**(目前最大空白)。

---

## 2. Design System 決策 (B.279-282)

### 為什麼
react-app 有 **454 處 inline style**,色票 **三套並存且 drift**:
- `style.css` `--pickup-*` (success `#4f6b30`、accent `#b88660`)
- `src/ui/tokens.ts` `COLOR_*` (olive `#7d9a4f`、amber `#e7a44a`)
- inline 硬寫 (text `#3c2a1c`、**亮綠 `#7ac74a` 16 處**…)

同一個「答對綠」在 app 裡有三個值 = 不統一、難維護的根因。

### 已建立 (single source of truth)
- **`src/ui/theme/tokens.css`** — 唯一 token 層: color / space(4pt) / radius / type / elevation(flat 零 blur) / motion / z,**light + dark 雙主題**。namespace `--t-*`,語意命名 (success/danger/brand)。
- **`src/ui/theme/index.ts`** — `t.color.text` → `var(--t-text)`,讓 inline style 也 theme-aware;`raw` 給 canvas/SVG。
- **6 primitives** `src/ui/components/`: Button / Card / OptionTile / ProgressBar / Sheet / MascotSlot,全 class-based、token 驅動、flat 零 blur。
- **codemod**: 376 處 react-app inline hex → token;亮綠 drift 殺光;白底 background → `--t-surface`。

### 規範 (給未來 session)
- 新 UI 一律用 `t.*` token + primitive,**禁止硬寫 hex / magic px**。
- flat 深度 (solid offset),**零 blur halo / radial gradient**(品牌鐵律)。
- 改色只改 `tokens.css` 一處 → 全 app + 夜間模式同步。

### 待還的債 (migration backlog)
- 舊兩套色票 (`style.css --pickup-*`、`src/ui/tokens.ts COLOR_*`) 尚未退役,Phaser/舊 UI 仍用 → 之後 migrate 到 `--t-*`。
- 殘留非 background 的 `color:'#fff'`(按鈕白字,正確保留)、ShareModal SVG(序列化成 PNG,var() 失效,刻意排除)。
- 剩 4 個 feature 元件尚未改用 primitive(逐頁替換中)。
- 暗色 palette v1,實機微調對比後再考慮設為 system 預設。

---

## 3. Mochi 羈絆 (Bond) 設計 — B.283 起

### 核心洞察
Mochi 是**選擇每晚回來**的流浪貓 — 這個「她選擇你」才是睡前最強情感鉤。羈絆**刻意跟 streak 分岔**: streak=連續天數(會斷會焦慮),bond=累積溫度(**不衰減、不懲罰中斷**)。

### 機制 v1
- **羈絆值**: 每完成一課 +10;每天首次造訪 +20。無衰減。
- **5 階段**(threshold): 怕生 0 → 好奇 50 → 親近 150 → 信任 350 → 家人 700。Mochi 的位置/姿態隨階段靠近(牆角偷看 → 牆上 → 跳下坐旁 → 腳邊呼嚕 → 睡你身邊)。
- **回家問候**: 開 app 時依「階段 × 距上次多久(同天/隔天/3天+)」給溫暖台詞,**3 天+ 是開心重逢,絕不愧疚**。
- **升階**: 慶祝 + 解鎖「一個晚上的回憶」(繪本式旁白)。
- 文案: `/tmp/mochi_bond_copy.json` (Opus 草擬,Fable 回來再潤)。

### 落地節奏
1. **B.283 (本次)**: `bond.ts` 資料層 + 完成課程加值 + 首頁問候卡 + 升階慶祝。姿態先用 MascotSlot + 階段標,完整姿態藝術後補。
2. 後續: 回憶簿 (memory book) 收集、Mochi 帶小禮物、姿態 art、與 cards/wardrobe 整合。

---

## 4. 模型分工 (見 CLAUDE.md Model Routing B.278)
Opus=策略/架構/決策;Fable=角色文案/美感/大量並行;Sonnet=實作/元件/測試;Haiku=機械 codemod。
本方向文件由 Opus 撰寫;Mochi 文案原訂 Fable(本次暫不可用,Opus 代擬);實作派 Sonnet。
