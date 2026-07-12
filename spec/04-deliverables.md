# 04 — 交付清單

> 讀法見 `spec/README.md`:Baseline 只寫實測過、可重跑指令驗證的事實;Delta 寫下一步 + 可判斷完成的驗收條件。

實測日期:2026-07-12。實測方式:讀 `.github/workflows/ci.yml` 全文、`grep DEV_UNLOCK_ALL src`、確認 `capacitor.config.json` / `public/manifest.webmanifest` / `public/sw.js` 是否存在並讀取內容、`git log --follow` 查 PWA 相關檔案首次進 repo 的 commit。`CLAUDE.md` 482-527 行(Open Questions + Roadmap)當設計來源比對,有出入處在對應小節註記。

---

## Baseline(現狀,可驗)

### 1. Phase 1 v1.x(CLAUDE.md 496-499,設計來源,非本次實測範圍)

- CLAUDE.md 記載「完成 2026-05-27 v1.9.56」:8 章 quest arc + Ghibli 美學 + Duolingo polish。
- 依 `spec/03-content-story.md` 實測結果,現狀已擴大到 **32 章(ch0-ch31)/ 224 lessons / 2472 questions**,超出 v1.x 8 章原始範圍。

### 2. Phase 2 v2.0 Duolingo-nested redesign(CLAUDE.md 501-504 + 本次實測)

- Schema 重做:`LessonSchema` discriminated union(見 `spec/01-game-mechanics.md` / `spec/03-content-story.md` 已驗證的部分)。
- 32 章題庫已落地(`public/lessons-ch0.json` ~ `lessons-ch31.json`)。
- 架構已完成 Phaser → React cutover:`index.html` 只載 React entry,Phaser 相關程式碼為死碼(見 Task 1 實測,`spec/03` 或前次 session 記錄)。

### 3. CI 自動部署(本次實測,`.github/workflows/ci.yml` 全文讀取)

- `.github/workflows/` 內僅一份 `ci.yml`。
- 觸發:`push` / `pull_request` 到 `master` 分支。
- `build-and-validate` job:`npm ci` → `tsc --noEmit` → `vitest run` → `validate-lessons.js` → content DB regen → hooks idempotent check → `npm run build`。
- `deploy` job(僅 `master` push 觸發):`wrangler pages deploy dist --project-name=pickupwords --branch=master`,用 `cloudflare/wrangler-action@v3` + repo secrets(`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`)。
- `deploy-cockpit` job(同觸發條件,並行 `needs: build-and-validate`):`wrangler pages deploy cockpit-deploy --project-name=pickup-cockpit --branch=master`。
- 結論:**push master 即自動部署兩個 Cloudflare Pages project(`pickupwords` 玩家 app + `pickup-cockpit` 決策面板),非手動 `wrangler` 指令**。CLAUDE.md「Deploy flow」段落(手動 3 步驟)已是過時文件,實際流程已被 CI 取代。

### 4. DEV_UNLOCK_ALL(本次實測)

- `src/data/storyKitten.ts:11`:`const DEV_UNLOCK_ALL = false;`
- `src/data/storyKitten.ts:349`:`if (DEV_UNLOCK_ALL) return true;`
- **現狀已是生產狀態(false)**,CLAUDE.md Open Question #7「v1.0 ship 前要切回 false」這個條件已滿足。

### 5. Capacitor 殼(本次實測)

- `capacitor.config.json` 存在(repo 根)。
- 內容:`appId: "com.kengkeng44.pickup"`、`appName: "Fabu"`(⚠️ 舊命名殘留,與現行品牌「拾光/Pickup」不一致,未同步更新)、`webDir: "dist"`、iOS/Android scheme 設定、SplashScreen / StatusBar / Haptics plugin 設定已就位。
- 結論:Capacitor 殼已設定,但 `appName` 欄位需更新對齊品牌(小修,見 Delta)。

### 6. PWA(本次實測 — 修正 CLAUDE.md 519 行「前置」描述為過時)

- `public/manifest.webmanifest` **存在**且內容完整:`name: "Pickup · 拾光"`、`short_name: "Pickup"`、`display: standalone`、`theme_color: #ed5a2e`、`background_color: #fef8ed`、icons(webp + svg)。
- `index.html:14` 有 `<link rel="manifest" href="/manifest.webmanifest" />`,並含 iOS home-screen meta 註解(`v2.0.B.155 PWA`)。
- `public/sw.js` **存在**,124 行,非空殼:實作 stale-while-revalidate app shell + cache-first lessons JSON/audio + network-first HTML,現行版本 `CACHE_VERSION = 'pickup-v2.0.B.278'`,並有多輪 cache-bust 修正記錄(檔內註解記載 B.178→B.277 99 commits 沒 bump 導致用戶端卡舊快取的教訓)。
- `git log --follow` 顯示 manifest + sw.js 首次進 repo 於 commit `7d57d5f`(`v2.0.B.155: L6 PWA — manifest + service worker + iOS home-screen meta`),之後歷經 4 次修正 commit(最新到 `3b054cc`)。
- **結論:PWA 已完整實作並持續維護,不是待交付項目。** CLAUDE.md 519 行「前置:先做 PWA…是過渡方案」為 v1.x 時期尚未動工時寫的文字,現已過時,本 spec 以實測為準覆寫之。

---

## Delta(目標,含驗收條件)

### D1 — v2.0 final ship:paywall + gate(CLAUDE.md 504 行 Plan 9)

- **現況**:`DEV_UNLOCK_ALL = false` 已滿足(見 Baseline #4),但 paywall stub 本身(Plan 9 提到的「加 paywall gate」)未見於本次實測範圍內的程式碼(`storyKitten.ts` 只找到 unlock flag,無 payment/gate UI 蹤跡)。
- **驗收條件**:
  - 有明確的「免費章節數 vs 付費章節數」邊界定義(目前 32 章全解鎖或全鎖是二元的,未見分層)。
  - Paywall UI 在鎖定章節被點擊時觸發,且有可關閉的 stub(不必真的接金流,但要有阻擋 + 引導畫面)。
  - 手動跑一次:清空 localStorage → 進 app → 點超過免費額度的章節 → 應看到 paywall 畫面而非直接進入 lesson。

### D2 — 舊命名「Fabu」品牌同步(本次實測發現的小修)

- **現況**:`capacitor.config.json` 的 `appName` 是 `"Fabu"`;`codemagic.yaml` 的 2 個 workflow 也命名「Fabu iOS TestFlight」/「Fabu iOS App Store Release」。均與現行品牌「拾光/Pickup」不一致,推測是更早期(改名 Pickup 前)殘留未同步。
- **驗收條件**:`capacitor.config.json` appName 與 `codemagic.yaml` workflow 名稱改成 `"Pickup"` 或 `"拾光"`(擇一,建議與 App Store Connect 顯示名稱一致後再定案),`grep -rn "Fabu" capacitor.config.json codemagic.yaml` 應為空。

### D3 — iOS App Store 上架(CLAUDE.md 506-519 行,Path B 已確認)

- **路線(user 2026-05-26 確認,不重新討論)**:Capacitor + Codemagic 雲端 build → 直推 TestFlight。
  - 不走 Expo/EAS Build(Pickup 不是 RN — 但見 D5 open flag)。
  - 不走本機 Xcode(用戶 Windows 沒 Mac)。
  - 全程瀏覽器管 App Store Connect。
- **Hard cost**:Apple Developer Program $99/yr(尚未確認是否已購買,需 user 確認)。
- **本次實測(修正)**:`codemagic.yaml` **已存在**於 repo 根目錄(140 行),定義 2 個 workflow:「Fabu iOS TestFlight」與「Fabu iOS App Store Release」,流程含 Node 安裝 → vite build web bundle → Capacitor sync iOS → provisioning → build number increment → build `.ipa`。⚠️ workflow 名稱同樣殘留舊命名「Fabu」,與 `capacitor.config.json` 的 `appName` 問題(見 D2)同源,應一併改名對齊「拾光/Pickup」品牌。
- **驗收條件**:
  - `codemagic.yaml` 的 workflow 名稱與 appName 改對齊品牌後(見 D2),Codemagic 專案已連接本 repo,雲端 build 至少跑過一次成功(產出 `.ipa`)。
  - TestFlight 收到 build,user 手機能安裝測試版。
  - Apple Developer Program 已購買($99/yr 已付款確認)。

### D4 — PWA 現況校正(非新工作,文件層待辦)

- **現況**:PWA 已完整實作(見 Baseline #6)。
- **待辦僅為文件同步**:`CLAUDE.md` 519 行「前置:先做 PWA…」字句需改寫成「已完成」語氣,避免下次接手 session 誤判為待辦。此為 CLAUDE.md 維護動作,不在本次 spec 建立範圍內(鐵則:本 session 只 create `spec/04-deliverables.md`,不改其他文件),留待下次維護 CLAUDE.md 時一併修正。

---

## ⚠️ Open Flag:RN pivot 與 Capacitor web 路線並存風險

- **證據來源**:使用者 memory(`feedback_re_enable_crons_when_rn_ready.md`,約 32 天前記錄)顯示曾規劃 Pickup 的 React Native(RN)版本(`pickup-rn` repo),並暫停 4 個 Pickup-web-only cron,等待「RN ready」等關鍵詞觸發恢復。
- **本 repo(`Desktop\pickup`,Capacitor web)現況**:
  - `CLAUDE.md` 全文未提及 RN、Expo、`pickup-rn` 字樣;iOS 上架路線明確寫「不走 Expo/EAS Build(Pickup 不是 RN)」(CLAUDE.md 512 行)。
  - 本 repo 最新 commit 為 `4c6fd1a`(2026-07-12),晚於 memory 記錄的 RN pivot 討論時間點(約 2026-06-10 前後)。
  - 架構已完成 Phaser → React web cutover,CI 自動部署持續在跑。
- **矛盾**:memory 顯示「曾規劃/暫停等待 RN」,但本 repo 的最新事實顯示開發主力持續投入 Capacitor web 路線,未見 RN 相關程式碼或設定進入本 repo。無法在本次任務範圍內確認 `pickup-rn` repo 現狀(鐵則:不碰 pickup-rn,未實地查驗)。
- **本 spec 立場**:以 Capacitor web(本 repo)為準記錄 Baseline/Delta。RN 去留是**待決 open question**,不在本次任務範圍內解決。
- **建議(給下次決策者參考,非本 spec 定案)**:兩條路線(Capacitor web iOS 上架 vs RN 重建)不應同時投入資源推進 — 先確認 `pickup-rn` repo 實際進度與 memory 記錄是否仍然對應現況,再決定收斂到單一路線,避免重複造輪子或兩邊都做一半。
