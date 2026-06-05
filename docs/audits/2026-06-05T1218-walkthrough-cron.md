# Walkthrough — 2026-06-05 12:18 UTC

Today's persona: **阿英 (Ah-Ying), 38歲上班族媽媽, A2英語, Galaxy Fold 4 folded (347px), 4G 晚間**

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | 地圖頁 (MapPage). HUD 4 icon row. 24 個 paw 節點排蛇形 | 靜音 (剛打開 app) | 點節點 / 看 HUD | 容器 320px, 螢幕 347px, 兩邊各 13.5px margin — 節點緊貼邊框 |
| 4s | 第 1 個節點有淡棕色, 其餘較暗. 無文字標籤 | 靜音 | 點第一個節點 | 不確定要從哪裡開始; 沒有「開始在這裡」文字 |
| 6s | 點擊節點 → navigate `/lesson/1/kt-ch1-l1` | SFX cardPress (小聲) | — | OK |
| 7s | LessonPage 載入. 「載入中…」4G 約 600ms | BGM 繼續 | 等待 | 還好, 快 |
| 8s | q1/9 pill 顯示. **螢幕正中央只有一行字：「(本題型沒有 pairsEn data)」** | 無 | **什麼都做不了** | ⚠️ 我完全不知道發生什麼事. 沒有按鈕, 沒有出路. 我以為是載入失敗 |
| 15s | 等了 7 秒, 畫面沒動 | 無 | — | 我刷新了頁面 (回到地圖). 再點一次同一節點 → 同樣死畫面 |
| 20s | 再次「(本題型沒有 pairsEn data)」 | 無 | — | 我決定放棄. App 壞掉了 |
| — | *(假設 P0 暫時修好, 繼續後面流程)* | | | |
| 25s | q1 改成 narration 正確顯示. 圓形 calico 貓頭像 + 英文句子. 自動 TTS 朗讀 | TTS: "Long ago, an old man…" | 點 🔊 重播 (22px 按鈕) | 喇叭圖示好小, 我手指疲憊, 點到旁邊空白 |
| 30s | 旁白自動消失, 新句子出現 (fallback timer + dwell 2s) | 下一句 TTS 觸發 | 沒有暫停鍵 | **孩子叫我, 我分心 5 秒, 回來已跳到 q3** |
| 45s | listen-tf 題. 喇叭圖示 (48px, 清楚). blanks 顯示 `____`. 2 個選項 Yes/No | TTS 自動播句子 + 問題 | 點喇叭再聽 / 選答案 | OK — 比較容易操作 |
| 60s | 答對 → sfxCorrect, 解答出現 2.5s 後自動推進 | correct SFX + 說明 ZH | 等待 | 沒問題 |
| 75s | listen-mc 題. 4 個選項垂直排列. `pickup-answer-sticky` (fixed bottom?) | TTS 播 sentence + question | 選答案 | 選項字體 15px, 可讀. 在 347px 寬螢幕 padding 14px 還好 |
| 90s | type-what-you-hear 題. textarea + Submit 按鈕 | TTS 播句子 | 打字 | **軟鍵盤彈起遮住整個下半螢幕. 在 347px 折疊機 viewport~796px, 鍵盤佔約 380px → 剩 416px 顯示畫面. textarea + submit 勉強可見, 但很擠** |
| 105s | 打錯字 (疲勞). sfxWrong. 6 秒後自動推進 | sfxWrong + 等待 | 等待 | 不確定有沒有 blind-retry — 直接前進了. 有點奇怪 |
| 120s | q9/9. CompletePanel 出現. 🎉 + XP/ACCURACY/TIME 三格 | 靜音 (confetti emoji 動畫) | 點「完成 · Continue →」 | 按鈕全寬 OK, 容易點到 |
| 122s | navigate('/') 回到地圖. 第 1 個節點變 star (done) | 靜音 | 繼續第 2 個節點 | OK |
| 125s | **(假設 Galaxy Fold 展開, 712px landscape 模式)** BottomNav 4 icon 排滿 712px 全寬. 每個 tab 按鈕 flex:1 = ~178px 寬. 圖示 28px 懸浮在超寬空白中 | 靜音 | — | 視覺很奇怪 — 像把手機 UI 強拉成電視遙控器. map container 仍 320px 置中, 左右大片空白 |

---

## B. Give-away check (Jaccard / mirror / identity)

| Question | Correct | User choice | Give-away? |
|----------|---------|-------------|------------|
| kt-ch1-l1-q4 (listen-tf): "Did any children live with them?" | No | No | ⚠️ Only 2 options (Yes/No). Sentence says "stayed very quiet, year after year" — high inference but Y/N binary removes all distractor difficulty. If you guess 50%, pass rate ≈ 100 users / 2. Not Jaccard mirror issue, but trivially low difficulty |
| kt-ch1-l1-q6 (listen-mc): "What was his daily task?" | cutting wood | — | Options: fishing/cutting wood/cooking rice/feeding goats. Good 4 distractors, no mirror |
| kt-ch1-l1-q8 (listen-mc): "Why did she sit by the river?" | wash clothes | — | Options: fish/swim/wash clothes/rest. Sentence "dipped clothes" is near-literal give-away — 聽到 clothes 就選 wash clothes, 不用推理 |

**kt-ch1-l1-q8 近乎 give-away**: sentence 包含 "clothes" → option "wash clothes" 是文字鏡像, 無推理需要.

---

## C. 這 persona 特有痛點

1. **Galaxy Fold 折疊 (347px) map 邊距只剩 13.5px** — 最右側 dx=+38 節點右邊緣距螢幕右邊 94px, OK; 但 catPos (122px wide) 在 R side = 13.5+184=197.5px 起算右緣 319.5px, 距螢幕邊 27.5px — 邊緣截斷風險。貓咪 overflow 可能觸到 scrollbar 或切掉一角.
2. **晚上 10pm + 孩子打擾 → narration auto-advance 無暫停** — 分心 5 秒回來已跳到下一題, history 欄顯示已看完的句子, 但沒有「回頭重新做這題」. 挫折感大.
3. **TypeWhatYouHear + 折疊機軟鍵盤** — 347px 寬, 軟鍵盤高約 380px, 剩下 416px 裡要塞 SpeakerBtn + instruction + textarea + Submit. textarea 可能被遮住.
4. **NarrationRenderer SpeakerBtn 22px** — 疲勞的手指, 目標遠低於 HIG 44px. 其他 renderer 已用 44-48px, narration 漏改.
5. **Galaxy Fold 展開 landscape (712px) BottomNav 超寬** — tab 按鈕 flex:1 撐成 ~178px 各自, 圖示孤島在寬條中, 視覺破碎; content 320px 置中兩側各 196px 空白, 整體像平板 app 的 bug.

---

## D. P0 / P1 / P2

### P0 — 30s 關 app 等級
| # | 問題 | 影響 | 根因 |
|---|------|------|------|
| P0-A | **tap-pairs 永久死鎖**: `TapPairsRenderer` 讀 `q.pairsEn ?? []`, 但 lessons-ch1.json 全 7 題用 `pairs` 欄位 (`{left, right}` 物件). `pairsEn` 不存在 → `pairs=[]` → 顯示「(本題型沒有 pairsEn data)」→ 無按鈕, 無 timeout, 無任何出路. **Lesson 1 第一題就死, 100% 使用者卡關** | 所有 Ch1 玩家 | `renderers.tsx:448` 欄位名錯; `RawQuestion` interface 也沒有宣告 `pairs`. 舊 Phaser 用 `round.pairs`, React port 改成 `pairsEn` 但沒同步 JSON |

### P1 — 明顯 UX 損傷
| # | 問題 | 根因 / 位置 |
|---|------|------------|
| P1-A | `NarrationRenderer` `SpeakerBtn` 預設 22px — 遠低於 HIG 44px. 唯一一個沒傳 `size` 的 callsite | `renderers.tsx:176` |
| P1-B | narration auto-advance 無暫停機制 — 中斷後無法重做當前題目 | `NarrationRenderer` `advancedRef` 一旦觸發無法撤回; 無 pause/rewind API |
| P1-C | Galaxy Fold unfolded landscape (712px): BottomNav `flex:1` 讓 4 tab 各 ~178px 寬, 視覺破碎; map content 仍 320px 置中產生大片空白 | `BottomNav.tsx` 無 max-width 限制; `MapPage` 無 responsive breakpoint |

### P2 — 小痛但累積
| # | 問題 |
|---|------|
| P2-A | `kt-ch1-l1-q8` options 中 "wash clothes" 是 sentence "dipped clothes" 的文字鏡像, 無推理需要 |
| P2-B | TypeWhatYouHear 在折疊機軟鍵盤彈起時, instruction + textarea + Submit 可能部分超出可見區 (需實機驗) |
| P2-C | Close ✕ 直接導回 `/` 不問確認 — 晚上疲勞誤觸 = 失去 lesson 進度 (已完成的 Q 不儲存) |

---

## E. Top 3 actionable (S effort)

**1. 修 tap-pairs 欄位名 + 資料格式 [P0, ~30 min]**
- `renderers.tsx:448` 改: `const pairs = (q as any).pairsEn ?? (q as any).pairs ?? [];`
- 同步 `RawQuestion` interface 加 `pairs?: Array<{left: string; right: string}>`;
- Renderer `p[0]` → `p.left`, `p[1]` → `p.right` (JSON 格式是物件非 tuple);
- 或者整批 JSON 轉成 `pairsEn: [[left, right]]` tuple 格式 — 擇一.

**2. NarrationRenderer SpeakerBtn 補 size=44 [P1-A, 5 min]**
- `renderers.tsx:176` 改: `<SpeakerBtn onClick={() => speak(text)} size={44} />`
- 與其他 renderer callsite 對齊.

**3. BottomNav max-width guard [P1-C, 15 min]**
- `BottomNav.tsx` nav style 加 `maxWidth: 480, margin: '0 auto', left: 'max(0px, calc(50% - 240px))', right: 'max(0px, calc(50% - 240px))'`
- 或用 `width: min(100%, 480px); left: 50%; transform: translateX(-50%)` 讓 BottomNav 跟內容同寬, 避免折疊機展開超寬.
