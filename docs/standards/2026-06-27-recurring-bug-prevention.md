# 拾光 Pickup — 規則性錯誤預防 playbook + 自查清單

> 2026-06-27 · per user「你很常出現這種規則性錯誤 你有辦法以後預防嗎 也要同時加進 cron 檢查清單」
> 目的: 把「同一類反覆犯的 bug」變成 **commit 前的固定自查 + cron 掃描角度**, 不再靠記性。

---

## 為什麼會有「規則性錯誤」

不是隨機手滑, 而是**同一種思考缺口**反覆觸發。最常見的根因只有三種:

1. **改 A 沒同步改相依的 B/C** — 砍了 HUD 的金幣顯示, 卻留下 `const coins =`(TS6133);改了節點顏色狀態, 卻沒同步「進行中橘點」的顯示邏輯。
2. **單一值拿去渲染「會隨情境變」的 UI** — 書封關卡數用一個全域變數, scroll 到別章沒重算 → **每章都顯示第 2 關**。這類 = 「scroll/事件驅動的 DOM」與「React state」不同步。
3. **局部修但沒掃同模式的其它處** — 修了 ch9 的 anchor, ch12/ch16 同樣缺的沒一起修;關了一個 TEST flag, 另一個忘了關。

---

## ✅ Commit 前自查清單(每次改 code 都過一遍)

> 主 session 改完 `src/**` 後、`git commit` 前, 逐條確認。任何一條中 → 回去補。

- [ ] **R1 相依掃描**: 我刪/改的這個變數·prop·import, 用 grep 確認**所有引用處**都跟著處理了?(刪 feature → 連帶的 `const x =` / import / 型別欄位 / 測試)
- [ ] **R2 per-情境正確**: 這個會顯示給「多章 / 多題 / 多帳號」的值, 是**每個情境各自重算**, 還是不小心共用了同一個?(scroll 換章 / 換題 / 換玩家時會不會殘留上一個的值?)
- [ ] **R3 事件 vs state 同步**: 用了 IntersectionObserver / scroll / setTimeout / DOM ref 直接寫值的地方, React state 與 DOM 兩邊是不是同一個來源?(避免 scroll 改了 DOM 但 state 沒變, 或反之)
- [ ] **R4 同模式全掃**: 我修的這個 pattern, 同檔/同層還有沒有「長一樣的」沒修?(一處錯通常是一類錯)
- [ ] **R5 TEST/DEV 旗標**: `TEST_*` / `DEV_UNLOCK_ALL` / 暫時 hardcode 是不是 ship 前該關的?(grep `TEST_` `DEV_` `TODO` `FIXME`)
- [ ] **R6 build gate**: `npm run build` 全綠(tsc 含 noUnusedLocals → TS6133 會抓 R1;madge 抓循環)。JSX 屬性位置**不能塞 `{/* 註解 */}`**(TS1005)。
- [ ] **R7 視覺三態**: 節點/按鈕/狀態類 UI, locked / reached(到了未完成)/ done 三態是否都有對的顏色?(別只處理 done 與 locked)

---

## 🤖 加進 cron 檢查清單(walkthrough / ui-ux cron 角度)

> 內容 cron(`auto-fix-tiers.md`)只動 lessons JSON, **不含這類 code bug**。
> 下列角度給 **walkthrough-cron / ui-ux-cron**(會讀 `src/**`、只寫 audit, 不自動改 code = Tier C)。

新增掃描角度(每輪跑, finding 寫進 `docs/audits/*-ui-ux-cron.md` 或 `*-walkthrough-cron.md`):

1. **per-章/題/帳號 殘留掃描**: 找「scroll/事件驅動的顯示值」是否每情境重算。重點檔: `MapPage.tsx`(書封關卡數、章標題)、`LessonPage.tsx`(題型標題、進度)。判準: 一個 ref/變數被多個情境共用卻只在單一 handler 寫一次 → flag。
2. **死碼/相依殘留**: `npm run build` 的 TS6133 / madge 警告(理論上 build 已擋, 但 cron 仍列出, 防 `// @ts-ignore` 繞過)。
3. **TEST/DEV 旗標掃描**: grep `TEST_NODES_CLICKABLE` / `TEST_ALL_NODES_GREY` / `DEV_UNLOCK_ALL` 等, 列出目前值, 提醒 ship 前該關的。
4. **視覺三態完整性**: 地圖節點 / 狀態 UI 是否 locked·reached·done 三態齊全。

> cron 對這類**只報告**(Tier C / APPROVE_FIRST), 不自動改 code(code 改動風險高於 lessons 文字)。

---

## 已發生案例(這份 playbook 的證據基礎)

| 案例 | 根因 | 對應自查 |
|------|------|---------|
| 書封每章都顯示「第 2 關」 | 單一全域值未隨 scroll 重算 (B.471 修, 改用 `coverGuanRef` 在 IntersectionObserver 內 per-章重算) | R2 / R3 |
| 砍金幣 HUD 後 `const coins` 未刪 (TS6133) | 改 A 沒掃相依 | R1 / R6 |
| `inProgress={false}{/* 註解 */}` (TS1005) | JSX 屬性塞註解 | R6 |
| 節點「到了未完成」沒上色 | 只處理 done/locked 兩態 | R7 |
| TEST flag 留 true | 暫時旗標沒關 | R5 |

---

*Last updated: 2026-06-27 by Claude — B.471 配套*
