# 設計標準 v2 — Typography Ramp(v2.0.B.567)

> 全 app 唯一字級標準。token 定義在 `src/ui/theme/tokens.css`(v2.0.B.567 區塊)。
> 研究出處:[design.duolingo.com/identity/typography](https://design.duolingo.com/identity/typography)
> — Duolingo 手感三要素照抄:圓體字(我們用 Nunito + Noto Sans TC,= Feather Bold / DIN Round 的免費近親)、
> 微字距(DIN Round 按鈕 letter-spacing 0.053em、按鈕 15px w700;我們取 latin 0.02em + 全域 0.01em)、
> 字重大膽(標題 900 / 內文 600 / 互動 800)。間距走 4pt grid。

## Ramp(7 級 + stat)

| Token | px / weight | 用途 |
|---|---|---|
| `--t-text-display` | 28 / 900 | splash、慶祝畫面大標(StreakPage 標題) |
| `--t-text-stat` | 24 / 900 | 統計數字(XP / 天數 / 收集數 tile) |
| `--t-text-title` | 22 / 900 | 頁面 h1、modal / sheet / cover 標題 |
| `--t-text-stem` | 18 / 800 | 題幹、重點句、空狀態標題、打字題輸入 |
| `--t-text-body` | 16 / 600 | 一般內文、清單主行、設定列標題 |
| `--t-text-option` | 16 / 800 | 選項、配對格、segmented control 等互動元件 |
| `--t-text-button` | 16 / 800 | CTA 按鈕(答題 CTA 沿用 900) |
| `--t-text-label` | 13 / 700 | 輔助說明、小節標、eyebrow、副標 |
| `--t-text-micro` | 11 / 700 | 徽章、計數、註記 |

## 行高 / 字距

- 標題 `--t-lh-title: 1.25` · 內文 `--t-lh-body: 1.6` · 互動元件 `--t-lh-ui: 1.3`
- latin 專用字距 `--t-ls-latin: 0.02em`;全域 `#app { letter-spacing: 0.01em }`(style.css)

## 頁首模式

- 單獨 h1:`fontSize: 'var(--t-text-title)', fontWeight: 900, margin: '0 0 14px'`
- h1 + 副標:h1 `margin: '0 0 2px'`,副標用 label token、`margin: '0 0 14px'`(合計節奏一致)
- header row(返回鈕 + h1):h1 `margin: 0`,由 row 的 marginBottom 給 14

## 頁面節奏(4pt grid)

頁面 root padding `'16px 14px 24px'` · 卡片間距 12-14 · 區塊間距 20-24。

## 使用鐵則

1. **新元件一律用 `var(--t-text-*)` token,不得寫死字級。**
2. 半像素 / 怪數字(9 / 10.5 / 12.5 / 13.5…)一律吸到最近的 ramp 級。
3. emoji / glyph 的 `fontSize` 是**圖示大小**,不在 ramp 管轄(維持數字)。
4. `style.css` 的 `--font-*` 舊 token 已 deprecated,只讀不新增,改用 `--t-text-*`。

## 允許例外(刻意保留,勿「修正」)

- StreakPage 大火焰數字 80、ChaptersPage 收集數 hero 38(display 級以上的英雄數字)
- Onboarding 品牌字 40(brand lockup)
- HUD 特殊小字:Map / Lesson HUD chip 15/900、HP「+」鈕、地圖節點數字 13/900(空間受限的遊戲 chrome)
- ParentPage PIN 顯示與數字鍵盤(數字輸入的特殊尺寸)
- canvas 分享卡 `ctx.font`(輸出圖,不是 UI)
- emoji / icon fontSize(見鐵則 3)
