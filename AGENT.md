# AGENT.md — 拾光 (Pickup) 工程代碼地圖

> 本檔案 = **工程視角**(結構 / 進入點 / 資料流 / 約束)。產品故事、世界觀、版本史、視覺語言、作者溝通偏好 → 見 `CLAUDE.md`。
> 兩份文件分工:改 code 架構 → 讀這份;改故事 / 文案 / 設計決策 → 讀 `CLAUDE.md`。
> 本檔所有數字/路徑寫作時已用實跑指令核對(見文末「驗證指令」)。若之後對不上,改文件不要改 code。

---

## 1. 一句話定位

**拾光 (Pickup)** — Capacitor web 遊戲,CEFR A2 英語學習 app(奶奶說童話故事框架)。
Repo:`github.com/kengkeng44/pickup`(public)。部署:Cloudflare Pages `pickupwords.pages.dev`。
當前開發線 HEAD 為文件化工作(`docs: ...` commits),上一個功能版本號 `v2.0.B.267`。

**⚠️ 架構已從 CLAUDE.md 描述的「Phaser canvas display:none + DOM 疊加」演進到「純 React,Phaser 已死碼」** —— 這是本檔要更正的最大一處過時內容,細節見第 3 節。

---

## 2. 倉庫結構(top-level)

```
pickup/
├── src/                  # 應用程式碼(見第 2.1 節)
├── public/               # 靜態資源 + 題庫 JSON(見第 4 節)
├── tests/                # Vitest 測試(38 個 *.test.ts)
├── tools/                # 建置期 / 內容期腳本(validate-lessons.js 等,見第 6 節)
├── docs/                 # 文件庫,11 個子夾(見第 5 節)
├── ios/                  # Capacitor iOS shell
├── cockpit-deploy/       # 獨立靜態頁,CI 另外部署到 pickup-cockpit.pages.dev
├── .husky/               # git hooks(pre-commit,見第 6 節)
├── .github/workflows/    # CI(build/test/deploy)
├── index.html            # 唯一 HTML 進入點,載入 src/main.tsx
├── vite.config.ts / tsconfig.json / capacitor.config.json / codemagic.yaml
├── package.json           # npm scripts(見第 7 節)
└── CLAUDE.md              # 產品/設計/故事文件(不動)
```

不屬於此 repo 範圍:`pickup-rn` 資料夾(不存在於本 repo top-level,任何 RN 相關工作不在此文件涵蓋範圍)。

### 2.1 `src/` 標註樹

```
src/
├── main.tsx          # ★ 唯一實際進入點 — createRoot + BrowserRouter + <App/>
├── main.ts            # 舊 vanilla/Phaser 進入點,index.html 未引用,非 live path
├── bootGame.ts         # Phaser 啟動邏輯,同樣不在 live 進入鏈上(見第 3 節)
├── style.css
├── react-app/          # ★ 實際 UI 層(React 18 + react-router)
│   ├── App.tsx          # 路由表(/,/map,/chapters,/chapter/:ch/intro,/lesson/:ch/:id,/profile,/tasks,/alerts,/cards)
│   ├── renderers.tsx     # 6 種題型 renderer + SFX/TTS/WordHint 掛接
│   ├── components/       # BottomNav, MapNode, NextStoryPicker, OnboardingPicker 等
│   ├── pages/            # MapPage, LessonPage, ChapterIntroPage, ChaptersPage, ProfilePage, TasksPage, AlertsPage, CardsPage, InfiniteMapPage, WardrobeView
│   └── views/            # LessonView, MapView, SplashView(舊/輔助 view,部分未掛路由)
├── scenes/             # Phaser 場景(狀態機式寫法)— ⚠️ 死碼,未被 React 進入鏈引用,見第 3 節
├── ui/                 # DOM 渲染 helper(部分被 scenes/ 用,部分仍被 react-app 引用,如 tokens.ts / domUtil.ts)
├── data/               # 題庫載入 + schema + 遊戲資料邏輯(lessons.ts / storyKitten.ts / catName.ts / dogName.ts / xp.ts / streak.ts / coins.ts 等)
├── store/              # Zustand — 只有 runStore.ts(進度 / 已完成 lesson / SRS)
├── audio/              # AudioManager.ts / bgm.ts / sfx.ts / tts.ts
├── analytics/          # posthog.ts
├── notifications/      # consent.tsx / scheduler.ts / triggers.ts / copy.ts / types.ts / index.ts
└── assets/             # 共用靜態 asset(圖檔等)
```

---

## 3. 進入點與資料流(★ 實測後與 CLAUDE.md 不同之處)

### 3.1 實際進入鏈

```
index.html
  → <script type="module" src="/src/main.tsx">
  → src/main.tsx: createRoot(#app).render(<BrowserRouter><App/></BrowserRouter>)
  → src/react-app/App.tsx: <Routes> 路由表,MapPage 為預設首頁('/')
  → 各 Page(MapPage / LessonPage / ChaptersPage / ...)直接是 React 元件,自己 fetch JSON + 呼叫 store
  → src/data/lessons.ts: loadChapterLessons() 讀 public/lessons-ch{N}.json,Zod schema 驗證
  → src/store/runStore.ts: markLessonCompleted() / readCompletedLessons() / isLessonUnlocked() 等,寫 localStorage
```

`LessonPage.tsx` / `MapPage.tsx` / `ChapterIntroPage.tsx` 是 lazy-loaded(`React.lazy`),其餘頁面隨主 bundle 載入。

### 3.2 Phaser 現狀:已是死碼,不在 live 進入鏈上

CLAUDE.md 「Tech Stack & Architecture」一節(約 344-364 行)描述的「Phaser canvas `display:none`,Phaser 只當狀態機,畫面全走 DOM」是 **v0.6 ~ v2.0.B.163 之前的架構**,已被 v2.0.B.164 的 React cutover 取代:

- `src/main.tsx` 的開頭註解明講:「Cutover from main.ts (Phaser vanilla). Phaser still lazy-loaded from LessonRoute as interop bridge until Phase 3 ports all 8 renderers.」
- 實測:`index.html` 只載入 `src/main.tsx`;`src/main.ts`(舊 Phaser 進入點)未被任何地方 import。
- 實測:`src/react-app/**` 內搜尋 `Phaser` 字樣只出現在**註解**裡(`LessonPage.tsx:225` 提到「mis-landed in dead LessonScene.ts」、`MapPage.tsx` 註解稱自己是「strict 1:1 port of Phaser StoryMapView」)—— 代表 `src/scenes/LessonScene.ts` 等 Phaser 場景已被 React 版面（MapPage/LessonPage）取代,不再是實際跑的程式碼。
- `src/scenes/` 目錄仍存在(8 個 scene 檔),但不在任何 import chain 上 — 修 bug / 加功能請認清目前"真的在跑"的是 `src/react-app/`,不要誤改 `src/scenes/`。

**結論**:若要形容目前架構,正確講法是「React 18 SPA(react-router 分頁),遊戲邏輯與畫面均在 React 元件 + DOM 內,Phaser 依賴仍在 package.json 但已無 live 引用路徑」,而非 CLAUDE.md 舊文字「Phaser 狀態機 + DOM 疊加」。

### 3.3 出題與資料層

任務簡報提到的 `src/data/roundGenerator.ts` **實測不存在**(`src/data/` 內無此檔,repo 全域搜尋也無引用)。實際出題/資料流程是:

- `src/data/lessons.ts` — `LessonSchema`(discriminated union,Zod)+ `loadChapterLessons()`,是 v2.0 新架構的題目載入入口
- `src/data/storyKitten.ts` — v1.x 舊 chapter pack,保留 backwards-compat
- 其餘 `src/data/*.ts`(xp.ts / streak.ts / coins.ts / achievements.ts / catName.ts / dogName.ts / mascotOutfits.ts / muteSetting.ts / storyRegistry.ts / storyRecommend.ts / storyTags.ts / tomorrowQueue.ts / userProfile.ts / visitStreak.ts / keySentences.ts / lessonHooks.ts / cards.ts / shareCard.ts)各自是獨立資料模組,非單一 generator 模式

### 3.4 狀態管理

`src/store/runStore.ts` 是唯一的 Zustand store 檔案,管進度 / HP / 章節解鎖 / per-lesson 完成紀錄 / SRS 復習庫 / 難度設定,寫入 `localStorage`。

---

## 4. 資源文件(`public/`)

| 檔案 | 內容 | 備註 |
|---|---|---|
| `public/lessons-ch0.json` ~ `lessons-ch31.json` | 32 個章節題庫檔(實測 = 32) | Duolingo-nested schema,`node tools/validate-lessons.js` 逐檔驗證 |
| `public/word-hints.json` | 可點詞翻譯字庫(20KB) | ⚠️ **不是** `vocab.json` — repo 內全域搜尋 `vocab*.json` 無結果,舊文件/任務簡報提到的檔名已過時 |
| `public/scenarios.json` / `public/sentences.json` | v1.x 自由練習題庫(cloze + 情境題) | legacy,仍被部分 schema 測試覆蓋 |
| `public/story-kitten.json` | v1.x chapter pack 資料(對應 `storyKitten.ts`) | legacy |
| `public/lessons-demo-new-types.json` | 新題型 demo/測試資料 | 非正式章節內容 |
| `public/audio/peace.mp3` | BGM,7.36 MB | 不進 JS bundle,CDN 直送(Cloudflare Pages) |
| `public/mascots/*.webp` | 角色/圖示美術 | 多張在 `index.html` 內 `<link rel="preload">` 供 LCP |

---

## 5. `docs/` 對應表

11 個子夾(檔案數為實測):

| 子夾 | 檔案數 | 放什麼 |
|---|---|---|
| `docs/audits` | 142 | 歷次自動 / 人工審查報告(code-health、UX、內容 lint 等) |
| `docs/canon` | 51 | 世界觀正典(角色設定、故事框架、名稱、hook 規則等 source of truth) |
| `docs/content-loop` | 14 | 出題 / 內容生產流程文件(章節撰寫 pipeline、TOEIC 標準套用紀錄) |
| `docs/superpowers` | 6 | spec / plan(brainstorm 產出的架構規格與實作計畫,如本次 AGENT.md 任務的 plan 檔) |
| `docs/toeic-research` | 6 | 題型 / 難度研究(TOEIC 風格參照) |
| `docs/strategy` | 4 | 商業策略 / 客群定位(如 2026-06-05 客群 pivot 分析) |
| `docs/product` | 4 | 產品文件(master matrix 等) |
| `docs/research` | 3 | 市場 / 素材研究 |
| `docs/standards` | 3 | 規範文件 |
| `docs/agents` | 2 | agent 調度文件(dispatch-matrix、player-walkthrough 5th agent prompt) |
| `docs/architecture` | 1 | 架構文件 |

`docs/` 根目錄下另有少量獨立檔案(如 `TODO.md`、`content-db.md`、`content-db-summary.md`、`agents-thinking-process.html`、`ch2-8-stories.html`),不屬於任一子夾分類。

---

## 6. 實現約束 + 規則

### 6.1 全域規則(摘自 CLAUDE.md「Don't Do」,約 531-546 行,14 條全文照抄供快速查閱)

1. 不要在 Phaser canvas 畫文字 — 手機會糊。所有 text → DOM(注意:此規則歷史脈絡是舊 Phaser 架構,現況已幾乎全 React DOM,規則精神仍適用)
2. 不要用 absolute position 排版 — 會 overlap。用 flex column flow
3. 不要做「真實成人壓力劇本」— 兒童 / 親子客群不該碰留學壓力 / 考試焦慮 / 職場 / 創業 simulator
4. 不要把音量按鈕做 UI — 用系統音量,不做站內開關
5. 不要顯示「X of 10」counter — 用 progress bar,數字會增加焦慮
6. 不要讓答錯扣 HP 結束 run(故事模式)— force-correct + blindRetry,無 HP 失敗機制
7. 不要硬塞短螢幕 — Mascot 要響應式縮小
8. 不要省略 `safe-area-inset` — iPhone notch / home bar 要留白
9. 不要 commit 之前先 push — 確認 build 過,wrangler deploy 失敗會留 dirty state
10. 不要直接抓多益題 — ETS 版權嚴,用學測/統測公開題或自製
11. 不要靠 LLM 寫複雜 SVG mascot art — 改用外部 AI image gen
12. 不要用中文 commit message 跑 `wrangler pages deploy` — 用 `--commit-message="..."` ASCII override
13. 不要在 hook script 用 PowerShell `Write-Output` 寫中文 — 改 ASCII,避免 stdin mojibake
14. 不要假設 Cloudflare Pages project name 沒被佔 — 全球 namespace unique(`pickup`/`shiguang` 已被搶,現用 `pickupwords`)

### 6.2 Build budget

CLAUDE.md 設定目標:**< 1 MB raw、< 400 KB gzip**(JS bundle,不含 `public/` 內的 mp3/圖檔)。加東西時要量 raw 增幅,超 10KB 要思考是否必要。

### 6.3 Deploy flow(★ 實測與 CLAUDE.md 手動流程不同 — 已改 CI 自動化)

`.github/workflows/` 內有 CI job 在 push to `master` 時自動:
1. `deploy` job:`wrangler pages deploy dist --project-name=pickupwords --branch=master`
2. `deploy-cockpit` job:`wrangler pages deploy cockpit-deploy --project-name=pickup-cockpit --branch=master`(獨立小站,決策面板)

CLAUDE.md 描述的「手動 3 步驟(commit → push → wrangler deploy)」流程仍可用(本機也能手動跑同樣指令),但目前 master push 後 CI 會自動重複部署一次 —— 不需要再手動跑 wrangler,push 到 master 即完成部署。

### 6.4 Pre-commit hook(`.husky/pre-commit`)

兩層 gate,**皆非單純 warning**:
1. `node tools/validate-lessons.js` — schema 驗證失敗會 `exit 1` **擋 commit**(hook script 內明寫 `|| { ...; exit 1; }`)。腳本內另外跑的「mirror-lint」子檢查(標點/用詞風格問題,如 `X3_R1_VERBATIM_WORDS`、`X2_OPTION_LIST_BIAS`)才是純 warning,不影響 exit code(除非設環境變數 `MIRROR_LINT_STRICT=1`)。
2. `node tools/_sync-hooks.cjs` 之後檢查 `tools/_content-db.cjs` 是否有未同步的 diff,若有也會 `exit 1` 擋 commit。
3. 逃生門:`git commit --no-verify`(hook 自己註明,但官方標語是「不建議」)。

### 6.5 Commit message 格式

功能性改動:`vX.Y[.Z]: 短描述`(如 `v2.0.B.267: ...`)。純文件改動(如本次 AGENT.md):`docs: 短描述`。

---

## 7. 常用指令

```bash
npm run dev              # vite dev server
npm run build             # validate-lessons → vitest run → tsc → vite build → bump-sw-version
npm run test               # npx vitest run(一次性)
npm run test:watch         # vitest watch mode
npm run validate           # node tools/validate-lessons.js(單獨跑 lesson schema 驗證)
npx wrangler pages deploy dist --project-name=pickupwords --branch=master   # 手動部署(通常不需要,CI 會自動跑)
```

---

## 8. 驗證指令(寫作時實跑輸出摘要)

```bash
$ git ls-files | grep -E '^src/' | sed 's|/[^/]*$||' | sort -u
# → src src/analytics src/assets src/audio src/data src/notifications
#   src/react-app src/react-app/components src/react-app/pages src/react-app/views
#   src/scenes src/store src/ui

$ ls public/*.json | wc -l
# → 37 (32 lessons-ch* + word-hints + scenarios + sentences + story-kitten + lessons-demo-new-types)

$ node -e "const fs=require('fs');console.log(fs.readdirSync('public').filter(f=>/lessons-ch\d+\.json/.test(f)).length)"
# → 32

$ test -f public/vocab.json  # exit 1 — 不存在
$ find . -iname "vocab*.json" -not -path "./node_modules/*"  # 無結果，確認 word-hints.json 才是實際字庫檔

$ find tests -name "*.test.ts" | wc -l
# → 38

$ grep -n "COLOR_GREEN\|COLOR_RED\|COLOR_CREAM\|COLOR_AMBER\|COLOR_TEXT_DARK" src/ui/tokens.ts
# → COLOR_GREEN='#7d9a4f', COLOR_RED='#c84a3a', COLOR_CREAM='#fef8ed',
#   COLOR_AMBER='#e7a44a', COLOR_TEXT_DARK='#3d2817'

$ for d in agents architecture audits canon content-loop product research standards strategy superpowers toeic-research; do
    echo "$d: $(find docs/$d -type f | wc -l) files"; done
# → agents 2 / architecture 1 / audits 142 / canon 51 / content-loop 14 / product 4
#   research 3 / standards 3 / strategy 4 / superpowers 6 / toeic-research 6

$ grep -rn "Phaser" src/react-app/**/*.tsx
# → 只在註解出現(LessonPage.tsx / MapPage.tsx / SplashView.tsx)，證實 Phaser 已死碼

$ cat index.html | grep "script.*src="
# → <script type="module" src="/src/main.tsx"></script>  （唯一進入點）
```

---

*本檔案由 Claude 於 2026-07-12 依實測建立,對應 commit(建立時)HEAD = `271aa6c`。若之後 repo 結構變動,重新跑第 8 節指令核對再更新本檔。*
