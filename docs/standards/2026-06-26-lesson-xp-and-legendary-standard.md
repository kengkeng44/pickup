# 完成 XP + 晉升傳奇 標準 (Lesson XP & Legendary Standard) — v1

> 2026-06-26 · 作者:「按鈕按下去應該要先跳出一個框框(跟多鄰國一樣)…幫我仔細查一下多鄰國怎麼設立標準的。」
> 本文是 XP 經濟 + 傳奇難度的 source of truth。實作:`src/data/xp.ts` (`LESSON_XP` / `lessonXp()`)、
> `src/react-app/pages/MapPage.tsx` (`NodeStartDialog`)、`src/react-app/pages/LessonPage.tsx` (`?mode=legendary`)。

---

## 0. Duolingo 怎麼設(查證)

| 機制 | Duolingo 實值 |
|------|------|
| 一般一課完成 | 約 **10–15 XP**(基礎 10,部分加 perfect/速度 bonus) |
| 已完成過的課「練習 Practice」 | **5 XP**(刻意比首過低,鼓勵推進新內容) |
| 傳奇 Legendary 模式 | **40 XP** 一輪(更難、無提示、錯題不揭答、扣紅心) |
| Combo / 連對 | 每題額外 +1~5 XP(非固定) |
| 每日任務 Daily Quests | +20~50 XP |
| XP boost(連勝/活動) | ×2 一段時間 |

**設計原則(我們抄的點)**:
1. **首過 > 複習**:第一次完成給高,重練給低 — 防刷獎、引導往前。
2. **傳奇 > 一般**:同一課傳奇難度給最高,作為「精通」誘因。
3. **點節點先跳框**:不直接進課,先讓玩家選「一般 / 傳奇」,XP 數字寫在按鈕上(預期可見)。

來源:[Duolingo Wiki — XP](https://duolingo.fandom.com/wiki/Experience_points)、[Legendary](https://duolingo.fandom.com/wiki/Legendary)、[Duolingo blog — gamification](https://blog.duolingo.com/)。

---

## 1. 拾光的 XP 數值(作者拍板)

> 數字比 Duolingo 大(30 vs 10),因為拾光一課題數較多 + 兒童客群要「給得大方」。

| 情境 | 按鈕文字 | XP |
|------|---------|---:|
| 第一次完成 · 一般 | 繼續 / Start | **+30** |
| 已完成過 · 一般 | 開始複習 / Review | **+5** |
| 第一次完成 · 傳奇 | 晉升傳奇 / Legendary | **+45** |
| 已完成過 · 傳奇 | 晉升傳奇 / Legendary | **+40** |

對應 `LESSON_XP = { firstClear: 30, review: 5, legendaryFirst: 45, legendaryReview: 40 }`。
`lessonXp({ legendary, alreadyDone })` 回傳上表值。**XP 改固定值,不再 `correct × 10`**(舊算法 B.192)。
金幣 (coins) 維持 `correct × 3`,與 XP 分離。

**領獎守則(沿用 B.306)**:只在「首次完成該課」寫入 XP/coins;重玩(含複習、傳奇複習)
顯示數字但**不重複入帳**(economy farming guard)。→ 即上表的「複習」XP 是「畫面顯示值」,
實際入帳仍受首過守則約束。
> ⚠️ 待辦:若要讓「傳奇複習」真的多給(因為更難),需放寬守則為「傳奇首過可再領一次」。
> 目前 v1 先維持「一課一生只入帳一次」最保守版,避免刷獎漏洞。先驗證 UX,再決定要不要開傳奇再領。

---

## 2. 點節點 → 跳框 (NodeStartDialog)

- 地圖點任一解鎖節點 → 不直接進課,**底部彈出 sheet**(`MapPage.tsx` `NodeStartDialog`)。
- 兩顆按鈕:
  - **一般**(綠 `--t-brand`):未完成顯示「繼續 +30 經驗」;完成過顯示「開始複習 +5 經驗」。
  - **晉升傳奇**(紫金漸層 👑):未完成「晉升傳奇 +45」;完成過「+40」。
- 點一般 → `/lesson/{ch}/{id}`;點傳奇 → `/lesson/{ch}/{id}?mode=legendary`。
- 點背景 / 取消 → 關閉。
- 雙語:`lang==='zh'|'zh-Hans'` 中文,其餘英文。

---

## 3. 晉升傳奇模式 (Legendary)

**v1 已落地**:
- `?mode=legendary` → CompletePanel 用 `legendaryFirst/legendaryReview` XP + 顯示「👑 傳奇通關 · LEGENDARY」徽章。

**待補(content + 機制,見 Ship 4)**:
- **更難題目**:每章塞一批傳奇專屬難題(`tier: 'legendary'` 或獨立 lesson),傳奇模式才出。
  難度 = A2+ / 干擾項更接近 / 加入外文打字產出題(見近似判斷標準)。
- **更嚴規則**(對齊 Duolingo legendary):傳奇模式不給提示、答錯紅心照扣、需高正確率才算過。
- 落地前先以本 v1(XP + framing)驗證 UX,內容批次再滾。

---

## 4. 驗收

- 點節點跳框、兩顆按鈕 XP 數字正確(30/5/45/40)。
- 一般進課無 `mode` param;傳奇帶 `?mode=legendary` 且完成頁有傳奇徽章。
- 重玩不重複入帳(`readXp()` 不因重練暴增)。
- `npm run build` 過(tsc strict — 無 unused)。
