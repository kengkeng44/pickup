# 驗收標準 — 拾光 (Pickup)

> 對應 `spec/README.md` 索引第 5 行。這份文件定義「怎麼判斷一個交付項目真的做到了」，是整套 spec 裡防蒙混防線最後一關。

## 防蒙混原則

1. **不能靠「看起來對」**。每條驗收都附一支判斷指令；宣稱某項通過前，必須先在本機實跑一次那支指令，把「實際輸出」貼出來當證據，不能用記憶、用猜測、用「應該沒問題」代替。
2. **當前實測基線 ≠ 通過門檻**。下表「當前實測基線」欄是 2026-07-12 本次任務實跑的當下數值，用來標記起點，不代表已達標；「量化門檻」欄才是通過線。兩者不同就是還沒過。
3. **證據格式固定**：每條的「通過證據形式」欄寫明驗收時要貼什麼(例如「build size 輸出」)，不接受截圖代替文字輸出、不接受「我看過了」這種無指令佐證的口頭陳述。
4. **warn-only 不等於 pass**。像 mirror-lint、schema WARN 這類設計上「不擋 build」的檢查，門檻要另外寫清楚數字，不能拿「build 沒紅字」當作已經達標。
5. **指令跑不動就先修到能跑，再拿數字說話**。本文件內所有判斷指令都已於 2026-07-12 實跑過一次，可直接複製執行。

---

## 驗收表

| 項目 | 量化門檻 | 判斷指令 | 當前實測基線(2026-07-12) | 通過證據形式 |
|---|---|---|---|---|
| Build 大小 | `dist/assets/*.js` + `*.css` raw **< 1MB**、gzip **< 400KB**(見下方「量測範圍說明」) | `npm run build` | raw **494,611 bytes(~483KB)**；gzip 加總 **144,659 bytes(~141KB)**(逐檔:index.html 1.80KB / css 5.97KB / rolldown-runtime 0.42KB / zustand 1.03KB / ChapterIntroPage 1.52KB / WardrobeView 1.98KB / react-router 7.51KB / zod 12.93KB / LessonPage 17.61KB / react 45.36KB / index 52.12KB) | `npm run build` 終端機列出的 per-file raw+gzip 表格 |
| tsc / 建置 | **0 error** | `npm run build`(內含 `tsc` 步驟)或單獨 `npx tsc --noEmit` | 0 error(`npx tsc --noEmit` 無任何輸出、exit 0；`npm run build` 全綠跑完到 `✓ built in 2.29s`) | tsc 無錯誤輸出 + build 綠燈 exit code 0 |
| 單元測試 | 全 pass，**0 fail** | `npx vitest run` | **380/380 pass**(38 test files 全 pass，Duration 5.61s) | vitest summary 區塊(`Test Files` / `Tests` 行) |
| 題庫 schema | 32 檔全 valid(`OK` 或 `WARN` 前綴，皆非 schema fail) | `node tools/validate-lessons.js` | **32/32 valid**(23 個 `OK`、9 個 `WARN`；exit code 0) | 逐檔前綴 `OK`/`WARN` 清單 + exit code |
| 內容品質 lint(mirror-lint) | warning 總數 **→ 0**(現況追蹤中，非阻塞) | `node tools/validate-lessons.js` 尾行 | **65**(46 件 X2_OPTION_LIST_BIAS + 12 件 X3_R1_VERBATIM_WORDS + 7 件 R1_SUBSTRING，來自 ch1/ch19/ch21/ch27/ch28 等 9 檔 WARN) | 尾行 `Total mirror-lint issues: N` 數字 |
| 無 blur 光暈 | grep 命中數不限，但每一條需人工判讀為「合法用途」(註解說明移除 / 貼地陰影，非實際套用 blur 光暈樣式) | `grep -rnE "box-shadow:[^;]*blur\|drop-shadow" src --include=*.ts --include=*.tsx --include=*.css` | **5 處命中，5 處皆合法**(`src/style.css:642,648,986` 為說明「已移除 drop-shadow halo」的註解;`src/ui/Mascot.ts:161`、`src/ui/StoryMapView.ts:931` 為「說明不使用 drop-shadow、改貼地色塊陰影」的註解。**0 處是實際生效的 blur/drop-shadow CSS 規則**) | grep 逐行輸出 + 每條標註「註解」或「生效樣式」判讀結果 |
| 色票單一來源 | `src/` 內散落的 hex 硬編碼(排除 `tokens.ts`)**→ 0** | `grep -rn "#7d9a4f\|#c84a3a" src --include=*.ts --include=*.tsx \| grep -v "tokens.ts" \| wc -l` | **35**(尚未達標;分布於 16 檔，前三大來源:`src/react-app/renderers.tsx` 6 處、`src/scenes/LessonScene.ts` 5 處、`src/react-app/pages/MapPage.tsx` 4 處) | grep count 輸出 + 依檔案分組的 `uniq -c` 清單 |
| classname 正名 | `wordwar-` 字首 CSS classname **= 0** | `grep -rn "wordwar-" src --include=*.ts --include=*.tsx --include=*.css \| wc -l` | **0(已達標)** | grep 空結果(exit 但 count = 0) |
| 品牌正名 | `codemagic.yaml` / `capacitor.config.json` 內 **無 "Fabu" 殘留** | `grep -rn "Fabu" codemagic.yaml capacitor.config.json` | **尚未達標，5 處命中**(`codemagic.yaml` 4 處:L1 標題註解、L14 說明、L20/L87 workflow name;`capacitor.config.json` L3 `"appName": "Fabu"`) | grep 逐行輸出(通過門檻 = 空結果) |
| 部署可載入 | `curl -sI` 回應 **HTTP 200** | `curl -sI https://pickupwords.pages.dev` | **HTTP/1.1 200 OK**(2026-07-12T15:18:22Z 實測，`Content-Type: text/html; charset=utf-8`) | curl response header 首行 + Date 行 |

---

## 量測範圍說明(Build 大小)

`dist/` 整個資料夾含大量非 bundle 資產(`mascots/` 42MB 美術圖、`audio/` 24MB 音檔、`qa-static-*.html` 除錯用靜態頁、`lessons-ch*.json` 題庫資料等)，這些由 CDN 直送不進 JS bundle，用 `du -sh dist` 量測會失真(實測 `dist` 總大小 75,515,852 bytes ≈ 72MB，跟 build 效能門檻無關)。

Build 大小門檻**只針對 `npm run build` 報表列出的 `dist/assets/*.js` + `*.css` + `dist/index.html`**，也就是實際會被瀏覽器當 app bundle 下載執行的部分。驗收時直接讀 `npm run build` 終端機輸出的逐檔 raw/gzip 表格即可，不需要另外重新計算。

## 補充：`npm run build` 內含的檢查鏈

`package.json` 定義 `build` script 為 `npm run validate && npm test && tsc && vite build && node tools/bump-sw-version.cjs`，也就是單跑一次 `npm run build` 就同時涵蓋「題庫 schema」「單元測試」「tsc」「build 大小」四條驗收的判斷指令。驗收時可以只跑一次 `npm run build`，從同一份輸出裡分段擷取四條的證據，不必分開跑四次。
