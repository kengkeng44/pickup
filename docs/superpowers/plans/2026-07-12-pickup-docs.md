# Pickup 文件化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 為 pickup(Capacitor 版)產出 AGENT.md 代碼地圖 + spec/ 詳細規格(baseline+delta) + 可量化驗收標準,全部從**當前代碼實測**、非照過時 CLAUDE.md。

**Architecture:** 純文件任務。分工:AGENT.md=工程、CLAUDE.md=產品(保留)、spec/=目標規格、spec/acceptance/=驗收。每份文件寫完必須跑「驗證步驟」把文中每個數字/指令對著真實 repo 核對(這是本計畫的「測試」),對不上就修文件,不是修 code。

**Tech Stack:** Markdown。驗證用 `grep` / `node` / `npm run build` / `npx vitest run` / `node tools/validate-lessons.js`。

**設計文件來源:** `docs/superpowers/specs/2026-07-12-agent-md-and-spec-architecture-design.md`

**已實測 baseline（寫作時直接用,不要再猜）:**
- lesson 檔:`public/lessons-ch0.json` ~ `lessons-ch31.json`(32 檔)。總 lessons/questions 用驗證步驟的指令量測後填入。
- 測試:`tests/` 有 38 個 `*.test.ts`(CLAUDE.md 寫的 22 已過時)。
- 色票(`src/ui/tokens.ts`):`COLOR_GREEN='#7d9a4f'`(olive)、`COLOR_RED='#c84a3a'`(terracotta)、`COLOR_CREAM='#fef8ed'`、`COLOR_AMBER='#e7a44a'`、`COLOR_TEXT_DARK='#3d2817'`。
- `src/` 目錄:`scenes/ ui/ data/ store/ audio/ analytics/ notifications/ react-app/ assets/`。
- `docs/` 子夾:agents, architecture, audits(142), canon(51), content-loop(14), product, research, standards, strategy, superpowers, toeic-research(6)。
- 已知過時處:CLAUDE.md line 3 說資料夾叫 wordwar(已改 pickup);Roadmap 說「只有 Ch1」(實際 32 章);「22 tests」(實際 38)。

**規則(全任務適用):**
- 只寫文件,**不改任何遊戲 code / 資料**。
- 不碰 `pickup-rn`。
- 每個聲稱的數字都要有對應可跑指令當證據;跑不出來就不要寫死那個數字,改寫「量測方法」。
- Commit 訊息用 `docs: ...`。

---

## File Structure

| 檔案 | 責任 |
|---|---|
| `AGENT.md` | 工程地圖:結構/進入點/資料流/資源/docs 對應/約束規則/指令 |
| `spec/README.md` | 主規格:定位/客群/交付總覽/子規格索引 |
| `spec/01-game-mechanics.md` | 機制 baseline+delta |
| `spec/02-visual-style.md` | 視覺 baseline+delta |
| `spec/03-content-story.md` | 故事/內容 baseline+delta |
| `spec/04-deliverables.md` | 交付清單(ship/paywall/PWA/iOS) |
| `spec/acceptance/acceptance-criteria.md` | 逐條量化驗收 |

---

## Task 1: AGENT.md 代碼地圖

**Files:**
- Create: `AGENT.md`

- [ ] **Step 1: 蒐集真實結構**

Run 並保存輸出:
```bash
cd /c/Users/acer/Desktop/pickup
git ls-files | grep -E '^src/' | sed 's|/[^/]*$||' | sort -u   # src 目錄樹
ls public/*.json | wc -l                                        # 資源檔數
grep -rn "canvas" src/scenes/*.ts | head                        # Phaser 用法佐證
```

- [ ] **Step 2: 寫 AGENT.md**

內容區塊(依 design doc 大綱),用實測資料:
1. **一句話定位 + 狀態**:「拾光/Pickup — 奶奶睡前英文童話家庭 ELT 遊戲。Capacitor web 遊戲,repo `kengkeng44/pickup`,current v2.0.B.267。」
2. **倉庫結構**:top-level + `src/` 標註樹(scenes=Phaser 狀態機 / ui=DOM 渲染 / data=題庫詞庫 / store=Zustand / audio / analytics / notifications / react-app)。
3. **進入點與資料流**:`index.html` → `src/main.tsx` / `bootGame.ts` → Phaser scenes(狀態機) → `ui/*` 用 **DOM 渲染(Phaser canvas `display:none`)** → `data/roundGenerator.ts` 出題 + `store/runStore.ts`。標明「**畫面全 DOM、Phaser 只當狀態機**」這條關鍵架構(來源 CLAUDE.md 355-364)。
4. **資源文件**:`public/lessons-ch0..31.json`(題庫)、`public/vocab.json`(可編輯字庫)、`public/audio/peace.mp3`(BGM,CDN 不進 bundle)。
5. **docs/ 對應表**:列 11 個子夾各放什麼(audits=歷次審查、canon=世界觀/故事正典、content-loop=出題流程、strategy=商業/客群、standards=規範、toeic-research=題型研究、product=產品、superpowers=spec/plan)。
6. **實現約束 + 規則**:全-DOM 不在 canvas 畫字、禁 absolute 排版、build budget `<1MB raw / <400KB gzip`、deploy flow(build 先過才 push+wrangler)、commit 格式 `vX.Y: ...`、bypass mode、14 條 Don't-Do 摘要(來源 CLAUDE.md 531-546)。
7. **指令**:`npm run build` / `npx vitest run` / `node tools/validate-lessons.js` / wrangler deploy(project `pickupwords`)。

- [ ] **Step 3: 驗證文中每個事實對得上 repo**

Run,逐一確認 AGENT.md 寫的與輸出一致:
```bash
node -e "const fs=require('fs');const g=fs.readdirSync('public').filter(f=>/lessons-ch\d+\.json/.test(f));console.log('lesson檔:',g.length)"   # 應=32,與文中一致
grep -c "display:none\|display: none" src/bootGame.ts src/main.ts 2>/dev/null   # 佐證 canvas 隱藏架構
test -f public/vocab.json && echo "vocab.json 存在"
```
Expected:lesson 檔=32;vocab.json 存在。若文中寫的數字與此不符,改文件。

- [ ] **Step 4: Commit**

```bash
git add AGENT.md
git commit -m "docs: AGENT.md 代碼地圖(工程視角,實測現狀)"
```

---

## Task 2: spec/README.md 主規格

**Files:**
- Create: `spec/README.md`

- [ ] **Step 1: 寫主規格**

區塊:
- **產品定位**:一段(來源 CLAUDE.md 29-47)。
- **目標客群**:primary=台灣 8-12 兒童+親子;secondary=海外華人 heritage、銀髮 60+(來源 39-44)。
- **交付總覽**:一句話說「baseline=已做到 v2.0.B.267 的 32 章題庫+Duolingo-nested;delta=Ch 品質 lint 清零/視覺補齊/v2.0 ship/iOS」。
- **子規格索引**:連結 01-04 + acceptance,一行說明各檔。
- **spec 使用約定**:每份 spec 分「Baseline(現狀,可驗)」與「Delta(目標,含驗收條件)」兩段。

- [ ] **Step 2: 驗證連結有效**

Run:
```bash
cd spec && for f in 01-game-mechanics 02-visual-style 03-content-story 04-deliverables acceptance/acceptance-criteria; do test -f $f.md && echo "OK $f" || echo "MISSING $f (Task 稍後建,先確保 README 連結路徑正確)"; done
```
Expected:路徑字串與後續任務建立的檔名一致(即使此刻尚未建立)。

- [ ] **Step 3: Commit**

```bash
git add spec/README.md
git commit -m "docs: spec 主規格 README(定位+客群+索引)"
```

---

## Task 3: spec/01-game-mechanics.md

**Files:**
- Create: `spec/01-game-mechanics.md`

- [ ] **Step 1: 寫機制規格(Baseline + Delta)**

**Baseline(來源 CLAUDE.md 228-256 Core Mechanics + Decision Log 469-470):**
- cloze 填空 4 選 1 為核心;5 種題型(cloze / tap-tiles / tap-pairs / listening / type-what-you-hear)。
- 難度系統 easy/medium/hard;SRS lite(答對一次移出,非完整 SM-2)。
- 故事模式:**無 HP、force-correct + blindRetry**(答錯保留正確選項位置不 shuffle;2-strike 後 reveal — 對照 memory feedback-pickup-retry-reveal)。
- Zustand `runStore.ts` 管分數/進度/SRS/難度/per-lesson progress。

**Delta(來源 Open Questions 488、Roadmap):**
- SRS 是否升級真 SM-2(連對 N 次才移出)— 待決。
- 內容品質:pre-commit lint 目前有警告(X2 選項偏差 / R1 子字串 / X3 verbatim),目標清零。

- [ ] **Step 2: 驗證機制聲稱**

Run:
```bash
node tools/validate-lessons.js 2>&1 | tail -3     # 看目前 lint 總 warning 數,填進 Delta 當基線
grep -rn "blindRetry\|force" src/ui/ClozeUI.ts | head   # 佐證 blindRetry 存在
```
Expected:validate 跑得動並回報 warning 數;ClozeUI 有 blindRetry 相關字樣。把實際 warning 數寫進 Delta。

- [ ] **Step 3: Commit**

```bash
git add spec/01-game-mechanics.md
git commit -m "docs: spec 01 遊戲機制(baseline+delta)"
```

---

## Task 4: spec/02-visual-style.md

**Files:**
- Create: `spec/02-visual-style.md`

- [ ] **Step 1: 寫視覺規格**

**Baseline(來源 CLAUDE.md 258-329 Visual Language + Decision Log 473):**
- Studio Ghibli 暖色手繪(非日系扁平/非像素/非 Material)。
- 色票(**單一來源 `src/ui/tokens.ts`**):olive `#7d9a4f`(答對)、terracotta `#c84a3a`(答錯)、cream `#fef8ed`、amber `#e7a44a`、text-dark `#3d2817`。
- isometric chibi 角色(grandma + shiba + Mochi 三花貓);flat 圖示(非 glossy)。
- **無 blur 光暈**(v1.9.44「色塊打光 ≠ 光暈」— 用 transform scale 做 pulse,不用 box-shadow 環擴)。
- 響應式:Mascot 要縮小;`safe-area-inset` 顧 iPhone notch。

**Delta(來源 Open Questions 485):** Ch6-8 NPC art / 場景 art 尚未到 v0.11 視覺水準;`wordwar-*` CSS classname 尚未全 refactor 成 `pickup-*`(Open Q 486)。

- [ ] **Step 2: 驗證視覺聲稱**

Run:
```bash
grep -c "COLOR_GREEN\|COLOR_RED" src/ui/tokens.ts        # 色票確在 tokens.ts
grep -rnE "box-shadow:[^;]*blur|drop-shadow" src --include=*.ts --include=*.css | wc -l   # 無光暈:期望接近 0
grep -rn "wordwar-" src --include=*.ts --include=*.css | wc -l   # 殘留 wordwar- classname 數 → 寫進 Delta
```
Expected:tokens.ts 有色票;把 blur 數與 wordwar- 殘留數如實寫進 Delta(這些就是驗收目標)。

- [ ] **Step 3: Commit**

```bash
git add spec/02-visual-style.md
git commit -m "docs: spec 02 視覺風格(baseline+delta)"
```

---

## Task 5: spec/03-content-story.md

**Files:**
- Create: `spec/03-content-story.md`

- [ ] **Step 1: 寫內容/故事規格**

**Baseline(來源 CLAUDE.md 186-227 Story Framework + 實測):**
- 8 章 quest arc「奶奶的 8 個說故事夜晚」,7 個世界童話;A2 難度。
- 內容模型 v2.0 Duolingo-nested:每章多 lessons、每 lesson 多題。
- **實測現狀**:`public/lessons-ch0.json`~`ch31.json` 共 32 檔(遠超 CLAUDE.md 寫的「只 Ch1」)。用 Step 2 指令量出總 lessons/questions 填入。

**Delta(來源 Roadmap 501-504 + Open Q 489):**
- Ch2-8 內容品質對齊 Ch1 standard;lint 警告清零。
- 完成 8 章後解鎖什麼(B1 題庫 / 續集 / cosmetic)— 待決。

- [ ] **Step 2: 量測內容規模**

Run:
```bash
node -e "const fs=require('fs');let L=0,Q=0,C=0;fs.readdirSync('public').filter(f=>/lessons-ch\d+\.json/.test(f)).forEach(f=>{const d=JSON.parse(fs.readFileSync('public/'+f));const ls=Array.isArray(d)?d:(d.lessons||[]);C++;L+=ls.length;ls.forEach(l=>Q+=(l.questions||[]).length)});console.log('章='+C,'lessons='+L,'questions='+Q)"
```
Expected:印出 章/lessons/questions 三個數;把這三個數寫進 Baseline。

- [ ] **Step 3: Commit**

```bash
git add spec/03-content-story.md
git commit -m "docs: spec 03 內容故事(baseline+delta,實測規模)"
```

---

## Task 6: spec/04-deliverables.md

**Files:**
- Create: `spec/04-deliverables.md`

- [ ] **Step 1: 寫交付清單**

**已交付(Baseline,來源 Roadmap 496-504):**
- Phase 1 v1.x 完成(8 章 + Ghibli + Duolingo polish)。
- Phase 2 v2.0 Duolingo-nested:schema 重做 + LessonScene + 24-button map + 32 章題庫。

**待交付(Delta,來源 Roadmap 504-519 + Open Q 490-491):**
- v2.0 final ship:paywall stub + `DEV_UNLOCK_ALL` 切回 false + gate。
- PWA(manifest + service worker)過渡方案。
- iOS App Store:**Capacitor + Codemagic 雲端 build → TestFlight**(不走 Expo/EAS、不走本機 Xcode);Apple Dev $99/yr。
- ⚠️ **RN pivot open flag**:memory + `pickup-rn` repo 顯示曾 pivot RN,但本 Capacitor repo commit 較新。此 spec 以 Capacitor 為準;RN 去留列為待老闆決定的 open question,寫明兩條路不要並行推。

- [ ] **Step 2: 驗證部署事實**

Run:
```bash
grep -n "pickupwords\|project-name" codemagic.yaml package.json 2>/dev/null | head   # 佐證 Cloudflare project + codemagic
grep -rn "DEV_UNLOCK_ALL" src | head    # 佐證 flag 存在(待切 false)
test -f capacitor.config.json && echo "Capacitor 確在"
```
Expected:codemagic.yaml 存在、DEV_UNLOCK_ALL flag 找得到、capacitor.config.json 在。

- [ ] **Step 3: Commit**

```bash
git add spec/04-deliverables.md
git commit -m "docs: spec 04 交付清單(含 RN/Capacitor open flag)"
```

---

## Task 7: spec/acceptance/acceptance-criteria.md

**Files:**
- Create: `spec/acceptance/acceptance-criteria.md`

- [ ] **Step 1: 寫驗收標準（每條 = 量化門檻 + 判斷指令 + 證據）**

用表格,每列:項目 | 量化門檻 | 判斷指令 | 通過證據。至少涵蓋:

| 項目 | 量化門檻 | 判斷指令 | 證據 |
|---|---|---|---|
| Build 大小 | `<1MB raw / <400KB gzip` | `npm run build` 讀 dist 報告 | build size 輸出貼上 |
| 型別/建置 | tsc 0 error | `npm run build`(tsc+vite) | 綠燈輸出 |
| 單元測試 | 全 pass(現 38 檔) | `npx vitest run` | vitest summary |
| 題庫 schema | 全 32 檔 valid | `node tools/validate-lessons.js` | validate OK 行 |
| 內容品質 lint | warning → 0(現況數見 spec 01) | `node tools/validate-lessons.js` 尾行 total | warning 數輸出 |
| 無 blur 光暈 | = 0 處 | `grep -rnE 'box-shadow:[^;]*blur\|drop-shadow' src` | 空結果 |
| 色票單一來源 | 只 tokens.ts 定義 olive/terracotta | `grep -rn '#7d9a4f\|#c84a3a' src --include=*.ts` 僅 tokens.ts | grep 結果 |
| classname 正名 | `wordwar-` = 0 | `grep -rn 'wordwar-' src` | 空結果 |
| 部署可載入 | HTTP 200 + 有 app root | `curl -sI https://pickupwords.pages.dev` + grep dist | 輸出 |

**防蒙混原則(寫在文件開頭):** 每條驗收都不能靠「看起來對」;必須貼上判斷指令的實際輸出當證據。改完宣稱通過前先自己跑一次。

- [ ] **Step 2: 驗證每條判斷指令真的跑得動**

逐條 Run 一次(此刻數字當現況基線,不要求已達標),確認指令不報錯:
```bash
grep -rnE 'box-shadow:[^;]*blur|drop-shadow' src --include=*.ts --include=*.css | wc -l
grep -rn 'wordwar-' src --include=*.ts --include=*.css | wc -l
npx vitest run 2>&1 | tail -3
```
Expected:三條都跑得出數字/結果。任何一條跑不動 → 改該條的判斷指令直到可跑。

- [ ] **Step 3: Commit**

```bash
git add spec/acceptance/acceptance-criteria.md
git commit -m "docs: 驗收標準(量化+判斷指令+證據,防蒙混)"
```

---

## Task 8: 校正過時引用 + 整體收尾驗證

**Files:**
- Modify: `CLAUDE.md`(僅校正過時字樣,不重寫)

- [ ] **Step 1: 校正 CLAUDE.md 過時處**

- line 3:「資料夾仍保留 `Desktop\wordwar`」→ 改「資料夾已正名 `Desktop\pickup`(2026-07-12)」。
- Version History / Roadmap 若寫「只 Ch1」「22 tests」→ 加註「(已擴至 32 章 / 38 tests,詳見 `spec/03` 與實測)」。不重寫整段,只加校正註記。

- [ ] **Step 2: 收尾驗證(全部產出對得上)**

Run:
```bash
ls AGENT.md spec/README.md spec/0*.md spec/acceptance/acceptance-criteria.md   # 7 檔齊
grep -rl "wordwar" AGENT.md spec/ 2>/dev/null && echo "⚠ spec 內仍有 wordwar 字樣,檢查是否該改 pickup" || echo "spec 內無殘留 wordwar ✓"
```
Expected:7 個檔案都在;spec 內不應有 wordwar(除非是刻意講歷史)。

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: 校正 CLAUDE.md 過時字樣(wordwar→pickup / 章數 / 測試數)"
```

---

## Self-Review 結果

- **Spec coverage**:design doc 的 AGENT.md(Task 1)、spec/README+01-04(Task 2-6)、acceptance(Task 7)、過時校正+open flags(Task 8)全覆蓋。✓
- **無 placeholder**:每個數字都附可跑量測指令;未實測的(總 questions 數、lint warning 數)明確標為「Step 2 量測後填入」而非留空。✓
- **一致性**:檔名在 README 索引(Task 2)、File Structure、各 Task 標題一致。✓
