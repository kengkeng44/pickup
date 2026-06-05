# Walkthrough — 2026-06-05 00:19 UTC

Today's persona: **阿美 (Ah-Mei), 34歲辦公室行政，英語學習 trauma，iOS Safari 18 私密瀏覽模式**

情境: 朋友推薦 Pickup 說「跟 Duolingo 一樣好玩不要怕」。阿美國中時被嚴格老師公開糾正，大學英文一補再補，從此確信「英文不是我這種人學的」。今晚 11pm 睡前在床上用 iPhone 15 試試看。**私密瀏覽開著**，因為「萬一放棄也不留紀錄不尷尬」。無耳機，iOS 靜音開關朝左（靜音），但音量鍵打到最大。

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | Safari 私密模式網址列變黑，pickupwords.pages.dev 載入 | 靜音 — 沒聲音 | 等 | 焦慮：沒任何聲音，不知道壞了沒 |
| 4s | MapPage：暖米色背景，一排 paw 圖示（第 1 個棕色，其餘灰色）、HUD 上方 flag/crown/coin/flame 四個圖示（數值全空因 firstTime=true）、章節橫幅「院子裡的第一個故事」 | 沉默 | 看 / 猶豫 | **痛**：地圖沒任何文字告訴我「從哪裡點」。第 1 個 paw 比其他深色，但不確定那就是入口。焦慮的人會先猶豫 10-15 秒。 |
| 18s | 我鼓起勇氣點第 1 個棕色 paw | BGM 啟動（第一次點觸發 unlockOnce + startBgm）| 點下去 | 舒了口氣：有反應了 |
| 20s | LessonPage 載入中（lazy Suspense → 「載入中…」白底文字） | BGM 靜靜播 | 等 | 「怎麼要等？是我點錯了嗎？」(trauma 常誤解 loading 為 error) |
| 22s | Q1 / tap-pairs：左欄 river / look / float / something，右欄打亂中文，上方 "q1/11" pill，左上 ✕ 按鈕 | 沒有 TTS（tap-pairs 不自動播） | 配對 | **痛**：「我要做 11 題？」pill 裡寫著 11，瞬間焦慮升高。而且我不知道怎麼玩配對，沒有教學說明。 |
| 28s | 我點 "river" → 點 "看"（配對錯誤）；按鈕清除，重設 | sfxWrong 短促下行音（在安靜臥室很清楚）| 再試 | **痛**：答錯音效 = 學生時代老師說「錯了」的感覺。沒有任何微文案安撫，只是靜靜清除按鈕。手指停在螢幕上 3 秒沒動。 |
| 38s | 第二次嘗試配對成功，「✓ 全部配對完成」 | sfxCorrect 清脆上行音 | 等 2.5s | 小鬆一口氣，但因 Q1 的錯誤還在回甘 |
| 41s | Q2 narration 自動出現：「📖 背景」badge + calico 貓頭像 + "Long ago, an old man and woman lived in a small village." | 奶奶 MP3 聲音播出（grandma voice，溫暖）| 聽（被動） | 哇！聲音好好聽！而且我不用做什麼，只要聽。焦慮大降 |
| 46s | Q3 narration：「They were kind, but they had no children.」自動播 | 奶奶聲音 | 聽 | 輕鬆，故事有點感傷但不難 |
| 52s | Q4 listen-tf：大片 blanks `____ ____ ____ ____…`，🔊 喇叭（48px），下方「🎧 點喇叭聽完聲音再選答案」，Yes / No 兩個按鈕 | 奶奶聲音自動播「Their wooden house stayed very quiet, year after year.」 | 聽完再選 | 「什麼？我要聽完才能選？但那些 dash 看起來像填空...我是要輸入文字嗎？」(UI 語意模糊) |
| 58s | 聽完後螢幕沒變化，我等了一秒，然後看到 Yes/No | 沒聲音 | 選 Yes 或 No | 問題是「Did any children live with them?」我剛才聽到「very quiet」— 我猜 No？但我不確定，我怕猜錯 |
| 60s | 我點 No（正確）| sfxCorrect | 等 | 對了！但是是猜的... 這樣算真的學到了嗎 |
| 65s | Q5 narration 自動推進 | 奶奶聲音 | 聽 | 放鬆 |
| 70s | Q6 listen-mc：「He carried home heavy **wood** for the fire.」+ 喇叭；問題「What was his daily task?」；選項 'fishing' / '**cutting wood**' / 'cooking rice' / 'feeding goats' | 奶奶聲音 + 問題 TTS | 選 | 我不知道 "firewood" 是什麼意思，但我看到句子裡有 **wood**，選項裡有 **cutting wood**——一樣的字！我點「cutting wood」 |
| 74s | 正確！sfxCorrect + reveal（選項顯示中文，explanationZh 出現）| sfxCorrect | 看 3 秒後自動推進 | 又對了！但這次我是靠「一樣的字」偷渡過去的，完全不懂 task 的意思 |
| 80s | Q7 narration — 老婆婆去河邊洗衣服 | 奶奶聲音 | 聽 | 聽得懂，有圖像感 |
| 85s | Q8 listen-mc：「She dipped **clothes** in the cool water…」；選項含「to wash **clothes**」| 奶奶聲音 | 選 | 又看到一樣的字！「clothes」在句子和選項都有，秒選。這個 app 題目好像很簡單⋯ |
| 90s | 正確！| sfxCorrect | 等 | 假信心建立中。「英文好像沒那麼難？」（但其實完全沒學到） |
| 95s | Q9 narration：「But one **spring day**, something different happened.」（進入 history 卷軸，我看得到文字） | 奶奶聲音說「spring day」| 聽 | 聽到 spring |
| 100s | Q10 emoji-pick：「What season was it?」；選項 🌸 spring / ☀️ summer / 🍂 autumn / ❄️ winter | 無 TTS | 選 | 我往上滑一下看到 history 裡「one spring day」，下面問 "what season"，🌸 spring 是 index 0 → 我立刻點。 |
| 101s | 正確！calico 貓跳出來 bounce，「聽 Mochi 的故事 →」按鈕 | sfxCorrect | 點按鈕繼續 | 「太簡單啦！」但這道題純粹是短期記憶測試，不是語言學習 |
| 106s | Q11 narration — 大紅東西在河上漂 | 奶奶聲音，末尾有「...」懸念 | 聽（被動） | 好奇接下來會怎樣 |
| 112s | CompletePanel：🎉 confetti，XP / ACCURACY / TIME 三格統計，「完成 · Continue →」按鈕 | sfxCorrect 音群 + BGM | 點返回 | 看到「ACCURACY」——假如是 80%、90% 還是 100%？我害怕看到數字，但它顯示了。如果不是 100% 心情就往下掉 |
| 113s | **localStorage 寫入 (markLessonCompleted + addXp + addCoins)**：私密模式下成功寫入（iOS Safari 同一 tab 內 localStorage 有效），但關掉私密視窗後全清 | （系統內部） | 點「完成 · Continue →」 | 不知道資料正在被寫入，也不知道關掉視窗就消失 |
| 116s | 回到 MapPage：L1 node 變綠色+星號，L2 node 解鎖（paw），奶奶角色移動到新位置 | BGM | 看 | 「我完成了第一課！」✓ 感覺很好 |

---

## B. Give-away check（Jaccard / mirror / identity）

| Q | 類型 | 句子關鍵詞 | 選項關鍵詞 | 判定 |
|---|------|----------|----------|------|
| Q6 listen-mc | 聽理解 | "heavy **wood** for the fire" | "**cutting wood**" | 🟡 **P2 keyword echo** — "wood" 在句子和正確選項重複，低英文程度用關鍵字掃描就過關 |
| Q8 listen-mc | 聽理解 | "dipped **clothes** in the cool water" | "to wash **clothes**" | 🔴 **P1 direct echo** — "clothes" 原文與答案完全一致，零理解可答對 |
| Q10 emoji-pick | 情緒鉤 | Q9 narration「one **spring** day」（在 history 卷軸可見） | 🌸 **spring** (correctIdx=0) | 🔴 **P0 identity give-away** — 前一題旁白原文即答案，且 history 仍可見 |

---

## C. 這 persona 特有痛點

1. **Q1 tap-pairs sfxWrong = 學習 trauma 瞬間觸發**  
   第一個互動題答錯就有負面音效，且無任何 micro-copy 安撫（無「試試看」/ 無「沒關係」）。對有考試創傷的用戶，這是在說「你又失敗了」。Duolingo 的 tap-pairs 連 sfxWrong 都省了，只是輕輕清除。

2. **q{x}/11 counter pill = 測驗焦慮計時炸彈**  
   「我還要做 11 題」的倒數感讓 A-trait 高的用戶在第 1 題就開始估算時間壓力。Duolingo 用 progress bar 而非 count，刻意避免這種焦慮框架。

3. **Q10 identity give-away = 假信心 → 真崩潰循環**  
   阿美這類人短期內感覺「英文沒那麼難」，但下一次在真實情境（email、電視）看到 "spring" 沒有前導旁白，她空白，再次確認「果然英文不是我能學的」。App 提供了脆弱的成功感，長期反而加深 trauma。

4. **私密瀏覽 × 無 localStorage 消失警告 = 「進度消失 = 我失敗了」**  
   阿美關掉私密視窗後，隔天打開 app，L1 又是待解鎖狀態。對一般用戶這是 bug；對 trauma persona 這等同系統說「你的努力不算數」，直接斷鏈回流。

5. **地圖無 first-time onboarding callout**  
   「從哪裡點」的 ambiguity 讓焦慮型用戶凍結 10-15 秒甚至離開。v1.9.35 加的「Tap any node to begin」banner 在 React MapPage 沒有移植。

---

## D. 嚴重度

### P0（危及留存）
- ⚠️ **Q10 emoji-pick identity give-away**：Q9 "one spring day" narration → Q10 "what season?" = 上一句原文即答案，且 history 仍可視。  
  Root: `lessons-ch1.json` Q10 correctIndex=0, Q9 sentence 剛 render 到 history，wrapWords() 顯示在卷軸內可見。  
  Fix: 在 Q10 前加一道其他 narration 拉開距離，或改問法讓用戶推斷（"In which season do cherry blossoms bloom?" — general knowledge, not echo）。

- ⚠️ **React app 沒有 localStorage 失敗 / 私密瀏覽偵測警告**：v1.9.48 的紅 banner 只在 BootScene.ts（Phaser），React App.tsx 無對應。iOS 私密視窗關閉後進度全清，用戶無預警。  
  Fix: App.tsx `useEffect` 加 `try { localStorage.setItem('__test','1'); localStorage.removeItem('__test'); } catch { showPrivateBrowsingBanner(); }` — 複製 v1.9.48 邏輯到 React shell。

### P1（影響轉換）
- **Q8 listen-mc "clothes" 直接 keyword echo**：sentence 與 correctOption 同詞，詞形匹配即答對，無須聽懂語意。  
  Fix: 改選項 "to wash laundry" 或 "to clean fabrics" — 去同詞。

- **tap-pairs Q1 sfxWrong 無 micro-copy 安撫**：trauma persona 第一題答錯即觸發焦慮，但 TapPairsRenderer 答錯只有 `sfxWrong()` + `setSelected(null)`，無任何文字。  
  Fix: 在 tap-pairs 答錯後顯示 WRONG_POOL 等級的安撫文字（"Try another one ✨"），或 mute sfxWrong 改成輕柔視覺 feedback（tile 微搖）。

- **q{x}/total counter 顯示全長**：`q{idx+1}/{lesson.questions.length}` 讓測驗焦慮型用戶從 q1/11 就開始計算「還剩幾道」。  
  Fix: 改為 progress bar（width = idx/total * 100%），移除 total 數字。

- **React MapPage 缺 first-time onboarding callout**：firstTime=true 時只有 HUD 靜音處理，沒有指引文字。v1.9.35 的 amber dashed banner「從第一顆節點開始 · Tap to begin」沒有移植。  
  Fix: MapPage 在 `firstTime && !loading` 時在第一個 node 上方 render `<FirstTimeBanner />` dashed amber 帶。

### P2（UX 摩擦）
- **Q6 listen-mc "wood" keyword echo**：partial echo，比 Q8 輕微，A2 learner 仍可能藉此不聽懂就答對。  
  Fix: 改選項為 "gathering firewood" vs 其他動詞，語意層更高。

- **iOS Safari narration 可能 fallback 到 WebSpeech robotic voice**：lazy-load renderers.tsx 後 `loadAudioLookup()` async 跑，Q2 narration 若在 lookup 完成前被呼叫，走 WebSpeech。在 iOS private mode fetch 速度正常時機率低但存在。  
  Fix: MapPage 也做 preloadAudioLookup（移到更早）或 App.tsx mount 時觸發。

---

## E. Top 3 actionable（S effort，可獨立 ship）

1. **P0 Q10 give-away fix**（30 min）  
   `public/lessons-ch1.json` → L1 Q10 sentence 改為「The river was still cold after many months.」+ 保留選項，但去掉 Q9 "spring day" 的直接前導，讓用戶從 "cold" + "many months" 推斷 spring。或直接改 Q10 問法跳脫上一句。

2. **P0 React private browsing banner**（45 min）  
   `src/react-app/App.tsx` 在 `useEffect` 裡加 localStorage 寫入測試，失敗時頂部 render 紅色 banner：「進度無法儲存 — 私密瀏覽模式不保留學習紀錄」。對齊 v1.9.48 行為。

3. **P1 q-counter → progress bar**（20 min）  
   `src/react-app/pages/LessonPage.tsx:95` 把 `q{idx + 1}/{lesson.questions.length}` pill 換成 `<ProgressBar fraction={idx/lesson.questions.length} />` 或類似實作，移除 total 數字。
