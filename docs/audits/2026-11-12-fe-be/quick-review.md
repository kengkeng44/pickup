# 前後端快速體檢 — 2026-11-12

- 工具：前端 = `review-frontend-production` 0.3.0-beta（quick 模式）；後端 = `backend-security-coder`
- 基線：master `d54ecf4`，分支 `review/2026-11-12-fe-be-audit`
- 能力：有源碼、有本機 `vite preview` + Playwright（本機 Chrome、Pixel 7 模擬）。**沒有**真機 iPhone、**沒有**啟用中的後端（線上 `/api/*` 回 503）
- 這是**部分審查**：只走核心旅程「進課 → 作答 → 離開」，13 個路由只實跑 LessonPage，其餘只做源碼掃描

## 主要發現與處理

| # | 級別 | 位置 | 問題 | 證據 | 處理 |
|---|---|---|---|---|---|
| B1 | P0（潛在） | `functions/api/migrate.ts` | client 自報金幣無上限、可重複呼叫 → 可灌 99,999,999 付費貨幣 | 測試重現 | ✅ 上限 + 一次性鎖 |
| B2 | P1（潛在） | `functions/api/lesson/complete.ts` | 任意 lessonId 都發獎、題數由 client 決定 → 無限刷 | 測試重現 | ✅ 讀 `env.ASSETS` 課程檔驗證 |
| B3 | P1（潛在） | `functions/api/chest/open.ts` | 任意 chestId 都算新寶箱 | 測試重現 | ✅ 只收數字索引 |
| B4 | P2 | lesson / chest / consume | 先查再寫的競態 | 測試重現（consume） | ✅ 原子寫入 |
| B5 | P2 | `functions/api/auth/link.ts` | 無限流，可轟炸寄信額度 | 測試重現 | ✅ 同 email 10 分 3 封 |
| B6 | P2 | `functions/api/iap/verify.ts` | Stripe 簽章無時間窗；Apple 收據沒驗 bundle id | 測試重現（Stripe） | ✅ 照 Stripe 官方做法 |
| F1 | P1 | `src/audio/tts.ts` | Ch1 有 75/118 句查表命中但 mp3 不存在，Pages 回 index.html → 白跑請求 + 解碼失敗 + 延遲後才退回 WebSpeech | Playwright：每課 20+ 個 `200 text/html` 的 .mp3 | ✅ 建置時產生 `manifest.json`，不在清單直接 WebSpeech |
| F2 | P1 | `public/sw.js` | SW 把上面那些 HTML 當 mp3 存進 60 格 LRU，擠掉真的課程 / 圖片快取 | 源碼推理 | ✅ 拒存 `text/html` |
| F3 | P2 | `src/audio/tts.ts` | 載入中換題，舊句載完會回頭補念，蓋到新題 | 源碼推理 | ✅ speak 序號，過期丟棄 |
| F4 | P2 | `src/audio/tts.ts` | `decodeAudioData` 同時用 callback 又不接 Promise → 未處理錯誤 | Playwright `pageerror: Unable to decode audio data` | ✅ 已接住；修後實跑 0 個 |
| F5 | P3 | `LessonPage.tsx` `<Renderer>` | 沒 key，同題型連續出現時第一格畫面沿用上一題「已揭曉」狀態（閃一下正解高亮） | 源碼推理 | ✅ `key={idx}` |

## 沒修、建議下一步

1. ✅（使用者確認後）`public/mascots/preview/` 40MB、28 個檔、源碼 0 引用 → 搬到 `tools/archive/mascot-preview/`，不再隨部署上傳。
2. ✅（使用者確認後）`public/todo-永久token設定.md`：git 早在 `10d1b40` 移除，但檔案還留在本機 `public/`，本機部署時會被打包上線 → 移到被忽略的 `ops.local/`。
3. 缺的 75 句 Ch1 語音：要嘛重跑 `tools/generate-grandma-audio.js` 補檔，要嘛接受 WebSpeech。
4. renderers.tsx 有 10 處點擊後直接 `setTimeout(onAdvance)` 沒清除；目前有 `if (revealed) return` 擋重複，不會跳兩題，但離開課程時計時器仍會跑。可統一改用既有的 `useRevealAdvance`。
5. Apple `verifyReceipt` 已被 Apple 標為棄用，正式上 IAP 前要改 App Store Server API。

## 未查 / 阻塞

- 真機 iOS 的 WebSpeech 手勢限制、音訊解鎖：沒有 iPhone，未驗證
- 後端實際部署（D1 / JWT_SECRET 未設定）：只用 node:sqlite 跑同一份 SQL 測試
- 其他 12 個路由（地圖、章節、個人、家長、設定…）：未實跑

## 驗證

- `npm run build` 全關卡通過：validate / madge 無循環 / vitest 46 檔 451 測試 / tsc / vite build
- 新增 `tests/functions/api.test.ts` 10 個後端測試（先紅 8 個再全綠）
- Playwright 實跑 Ch1-L1、Ch1-L3、Ch4-L1：修後 0 個非音訊 mp3 回應、0 個 pageerror（只剩本機預覽沒有 `/api` 的預期 404）
