# Walkthrough — 2026-06-09 12:21 UTC

Today's persona: **雅婷 (Yǎ-tíng), 38歲台灣女性, 學英文有 trauma**, 情境: **4G 慢網 (~3 Mbps) / iPhone SE 3rd gen (375pt) iOS Safari 18**

背景:
- 高中被英文老師公開笑話，「你念的是哪裡的英文？」
- 大學英文修了兩遍，考前硬背但考完全忘
- 職場寫英文 email 要請同事「幫我看一下」，怕說錯被笑
- 上次嘗試學英文 app：Duolingo，三天後因為答錯被扣心被刷了就再也不開
- 今天驅動：朋友 IG 貼文說「這個 app 有奶奶說故事，不像在考試」
- 最深恐懼：**「我打開 app 又發現自己英文很爛，然後永遠放棄。」**

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | 朋友 IG 點連結，Safari 打開 pickupwords.pages.dev | 無 | 等待 | 「朋友說好玩，也許跟以前不一樣。我試試。」 |
| 1-4s | **白屏**（React bundle 載入中，~370KB gzip，4G 3Mbps 約 2-3s） | 完全無聲 | 無法操作 | ⚠️ 「壞掉了？還是我的網路太慢？」恐懼升起 — trauma 者的自我歸咎機制：「是不是我手機太舊？」3 秒白屏是關鍵流失點 |
| 4s | loading 爪印 (`node-paw.webp` pulse 動畫)，無文字 | 無聲 | 等待 | 「還在載入，爪印可愛。OK，還在。」稍微放心 |
| 6s | MapPage 渲染完成：奶油底、書封「A Story in the Yard」、奶奶+柴犬+Mochi mascot、24 顆爪印節點蜿蜒、空 HUD（firstTime=true，無 coin/streak 數字） | 無聲（iOS audio lock 未觸發） | 上下滑動，看節點 | 「哇，很可愛！但...我要從哪裡開始？沒有說明。」找那顆有動畫的節點 |
| 9s | 找到第 1 顆脈動爪印（`pickup-map-node-current` scale pulse）。其他 23 顆是灰色 | 無聲 | 點第 1 顆節點 | 「好，就點這個。」輕輕點，375pt 寬手機 82×64 節點算好點到 |
| 10s | LessonPage lazy-import 開始。`載入中…` 文字 | 無 | 等 | 「好，在載入。」4G 環境 lazy chunk 多 1-2s |
| 12s | LessonPage 載入完成：進度條（1/5 已填）、✕ 左上、🔇 右上 | 無（tap-pairs 無 auto-TTS） | 看畫面 | 看到「Here are 4 words you will meet in tonight's story.」— 左右兩欄：河/看/漂/東西 ↔ river/look/float/something（打亂） |
| 14s | 我停在畫面前 3 秒。沒有「怎麼玩」說明 | 無聲 | ??? | **⚠️ P1: 規則焦慮**。「這要我幹嘛？點左邊再點右邊嗎？會不會點錯一直扣分？」學校配對題有老師說規則，這沒有。我試探性點「河」 |
| 17s | 「河」變黃色。我理解了：點左再點右配對 | 無 | 點「river」 | 「哦，是這樣玩的！」relief |
| 22s | 配「看」→「look」✓ 。配「東西」→「something」✓ 。剩「漂」←→「float」 | sfx 配對音 | 繼續 | 「float 是漂？我猜是...應該是？」稍微猶豫 |
| 24s | 「漂」→「float」✓ 全部配完。爪印動畫。進度條跳到 2/5 | sfx 成功音 | 等待 | 「好耶，全對！」小開心 |
| 25s | narration q2 渲染：貓圖 44px + amber bubble + "Long ago, an old man and woman lived in a small village." | **🔊 TTS 突然自動播放「Long ago, an old man...」** iOS audio unlock 第一次點就解鎖，所以 BGM 也同時起播 | 無法阻止 | **⚠️ P1: 突然有聲音**。我沒預期，手機音量是外放（手機掛在沙發扶手），突然傳出英文 — 不緊張但有點嚇到。Mute 按鈕在右上角，44px，還好找到但我需要看一眼才找到 |
| 30s | narration 播完 + 2s dwell → auto-advance。q3 narration 自動起播 "They were kind, but they had no children." | TTS 繼續自動播 | 看 history 積累文字 | 「唉，老夫婦沒有孩子...感覺是個故事。挺溫柔的。」開始進入狀況 |
| 40s | q4 listen-tf：先播「Their wooden house stayed very quiet, year after year.」然後自動播「Did any children live with them?」。顯示 Yes / No 按鈕 | TTS 鏈式播放 | 等聲音播完再選 | 「No！」→ 點 No → 答對，綠色，sfx 正確聲 → auto-advance 2.5s 後 |
| 52s | q5 listen-mc (cloze type)：先播英文句子，4 個選項 | TTS 播句子 | 等 TTS，再選 | **⚠️ P0 前奏**：我知道要選了，但手指停在選項上猶豫了 5 秒。「如果選錯了...不要緊吧？不是有血條吧？」trauma 過去的 Duolingo HP 陰影 |
| 60s | 我選了錯誤選項 | sfxWrong 播出 | — | **🚨 P0 TRAUMA TRIGGER**: 按鈕邊框變紅 (#c84a3a) + 錯誤音效 + 正確答案的按鈕變綠色。我胸口一緊。腦子裡：「果然，又答錯了。就跟老師指著我說『這個字不是這樣念的』一樣。」手抖了一下 |
| 63s | explanationZh 出現：「...的意思是...」red border 持續顯示 3 秒才 auto-advance | TTS 不播（已 revealed） | 看紅色按鈕 + 解釋 | 「我強迫自己讀那段解釋。OK，我記起來了。但那個紅色讓我不舒服。」 |
| 66s | auto-advance 到 q6 | — | — | 「繼續。不要放棄。」自我打氣。但損傷已發生 |
| 80s | Lesson 完成！CompletePanel 出現：Mochi 跳動、"Lesson complete!"、三格統計 | sfxCorrect | 看統計 | 看到 **ACCURACY 73%** 綠底白字。「七...三...分？這是考試嗎？」腦子裡浮現大學考卷上的紅筆 |
| 82s | 想繼續但猶豫 | — | 看「→」按鈕 | **⚠️ P1: ACCURACY % 像成績單**。73% 對她來說是「不及格」（70分以上才算過），雖然完全答對了 narration 的聽力題，只有1題選錯。但這個數字讓她感覺被評定。 |
| 90s | 她點「→」繼續 | — | 回到 MapPage | 「好，第 2 顆亮了。我可以繼續。」但心裡仍然帶著那個 73%。 |
| 95s | MapPage，第 2 顆節點解鎖，脈動。第 1 顆變橄欖色（已完成） | 無聲 | 是否繼續？ | 「我先等等。其實蠻有趣的，但答錯那一下很難受。再想想要不要繼續。」→ **關掉 Safari** |

---

## B. Give-away check

- **答題前正確答案是否提前洩露**：否。narration 不涉及答題；listen-mc 的 blanks() 函數顯示 `____`，不洩露。✅
- **blindRetry parity**：tap-pairs 有 shake 動畫但不 reveal 答案 ✅；listen-mc **立刻 reveal 正確答案** ⚠️（對 trauma persona 是「老師指正」的刺激，業界 blindRetry 設計上屬未完整）
- **TTS 音頻在 iframe / 私密模式是否卡**：4G 真實環境下 MP3 先到先播，WebSpeech fallback 存在，第一題 narration 播出順利 ✅

---

## C. 這 persona 特有痛點 (trauma + 4G)

1. **白屏 2-4s 無 loading indicator → 自我歸咎（「我手機太舊/網路太差」）**
   - 4G 慢網讓 React bundle 解析+載入達 3-4s。此時頁面全白無任何 feedback。
   - 白屏不只是體驗問題：trauma 者會把「等不到東西」解讀為「這個 app 不適合我」。
   
2. **⚠️ P0 答錯紅色邊框 (#c84a3a) = 課室糾正的 somatosensory 記憶**
   - listen-mc 答錯 → 紅 border + sfxWrong + 正確答案立即亮綠 = 完整的「被糾正」體驗流程
   - Affective Filter Hypothesis (Krashen 1985)：情緒壓力直接阻礙 L2 語言習得
   - 現有 blindRetry 對 tap-tiles 有效，但 listen-mc 仍是即時答案揭露 + 紅色

3. **OnboardingPicker 存在但未接線 → 沒有「你的英文故事」問題**
   - 現有 `src/react-app/components/OnboardingPicker.tsx` 已有 4 軸喜好選擇器，但 **未在任何 page 渲染**
   - 沒有問過「為什麼想學英文？以前有過不好的學習經驗嗎？」
   - Duolingo 2025 onboarding 的核心模式：先問 motivation → 讓用戶感覺被理解 → 焦慮下降再開始學習
   - 對 trauma persona：一個「我們知道有些人以前學得不開心，這裡不一樣」的設定畫面可以大幅降低放棄率

4. **ACCURACY % 完課面板 → 考試成績 PTSD**
   - CompletePanel 顯示 `ACCURACY 73%` 綠底白字，標籤用「ACCURACY」英文
   - 對非英文學習者，「accuracy」本身是個評量用語，帶強烈的 academic context
   - 75% = 不及格（台灣學制 70 以上才及格）的心理暗示，即使 app 沒有說不及格

5. **tap-pairs 零規則說明 → 初始規則焦慮**
   - 第一題 Q1 是 tap-pairs，沒有「點左再點右配對」的說明文字
   - 這對「害怕犯錯」的 trauma 用戶尤其嚴重：「我不知道怎麼玩，如果我操作錯了然後扣分怎麼辦？」

---

## D. P0 / P1 / P2

| 等級 | ID | 描述 | 位置 |
|------|----|----|------|
| **P0⚠️** | TRAUMA-01 | listen-mc 答錯即顯示紅邊 + sfxWrong + 正確選項立即亮綠 = 完整「被糾正」flow；3s 紅色停留直接觸發 trauma response | `src/react-app/renderers.tsx:112-114` (OptionBtn red border) + `renderers.tsx:307-308` (sfxWrong trigger) |
| **P0⚠️** | TRAUMA-02 | 4G 慢網首訪：React bundle 白屏 3-4s，無 loading indicator，無骨架屏；trauma 者將空白歸咎於「自己不配」→ 高流失率 | `src/react-app/App.tsx` (Suspense fallback `<LoadingShell>` 只在 lazy route 觸發，非全局 bundle 載入) |
| P1 | TRAUMA-03 | CompletePanel `ACCURACY 73%` 數字標籤 → 考試成績 framing，即使準確率 70%+ 在台灣學制也是「差一點不及格」 | `src/react-app/pages/LessonPage.tsx:326` (`Stat label="ACCURACY"`) |
| P1 | TRAUMA-04 | OnboardingPicker 已寫完但未接線 → 新用戶從未被問「為什麼想學英文？」，沒有 motivation anchoring 就開始答題 | `src/react-app/components/OnboardingPicker.tsx` (存在) vs `src/react-app/pages/MapPage.tsx` (未渲染) |
| P1 | TRAUMA-05 | tap-pairs Q1 無操作說明 → 初始規則焦慮；trauma 用戶怕「不知道規則時犯錯被扣分」 | `src/react-app/renderers.tsx` (TapPairsRenderer — 無 instruction text) |
| P2 | TRAUMA-06 | 白屏後首次看到 MapPage 無「歡迎/這裡不考試」warm welcome copy，firstTime 用戶直接看到 24 顆節點沒有引導 | `src/react-app/pages/MapPage.tsx:352` (`const firstTime = xp === 0`) — 已判斷 firstTime 但沒有 onboarding gate |

---

## E. Top 3 actionable (S effort — ≤1hr each)

### 🥇 E1: ACCURACY → `答對了 N 題` (S, 20min)
**位置**: `src/react-app/pages/LessonPage.tsx:326`
**改法**:
```tsx
// Before
<Stat label="ACCURACY" value={`${accuracy}%`} color="#5d9a35" bg="#eaf6d5" />

// After
<Stat label="答對" value={`${correct}/${total} 題`} color="#5d9a35" bg="#eaf6d5" />
```
或在 L1-3 完全隱藏 accuracy stat（只顯示 XP + TIME），L4+ 才出現。
去掉 "%" 就去掉了成績單語境。

### 🥈 E2: 首訪 trauma-safe 一句話加在 welcome banner (S, 30min)
**位置**: `src/react-app/pages/MapPage.tsx` (firstTime banner section，約 line 540)
當前：dashed amber `從第一顆節點開始 · Tap to begin`
**改法**: 加一行 subtext
```tsx
{firstTime && (
  <>
    <div style={{ fontSize: 15, fontWeight: 800, color: '#7d9a4f' }}>
      從第一顆節點開始 · Tap to begin
    </div>
    <div style={{ fontSize: 12, color: '#8b6f4a', marginTop: 4 }}>
      🐾 答錯不扣分,慢慢聽就好
    </div>
  </>
)}
```
一句話消除「會不會扣分」最大初始焦慮。

### 🥉 E3: listen-mc 答錯顯示 `再試一次` 而非立即 reveal (S, 45min)
**位置**: `src/react-app/renderers.tsx:338-341` (ClozeRenderer / ListenMcRenderer option state)
**描述**: listen-mc 目前答錯 → 正確選項立即亮綠。改為 blindRetry 模式：
- 答錯 → 該選項閃紅 300ms → 回 idle（不 reveal 正確答案）
- 顯示「🐾 再試一次」microcopy
- 第二次答錯 → 才 reveal
這樣 trauma 用戶有機會「自己想出來」，避免「被指正」的刺激。
注意：此改動要確認 onAnswer log 仍在第一次答錯時記錄（保持 analytics parity）。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### 調查摘要
- **Duolingo 2025/26 onboarding**: 問 motivation reason → 提供 level placement test → 直入第一課（無 HP 懲罰模式）
- **Cambridge Core / Frontiers Psychology 2025 研究**: Foreign Language Anxiety (FLA) 直接影響 L2 習得。Krashen Affective Filter: 情緒壓力 → input 無法進入語言習得裝置。Tech-based interventions 可降低 FLA，但需主動設計「心理安全感」。
- **Fabulous App 2025 UX pattern**: onboarding = story opening（「告訴我你現在的故事」）→ 讓用戶感覺被理解 → 降低 blank page anxiety → 提高 D30 retention 22%

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **Motivation + History Onboarding Screen** (「為什麼想學？以前有不好的經驗嗎？」one-time screen, localStorage gate) | Duolingo 2025 onboarding; Fabulous App 「story opening」; [Juno School breakdown](https://www.junoschool.org/article/duolingo-onboarding-experience/) | ✅ **完全適合** — `OnboardingPicker` 元件已存在，只需加一個「previous experience」問題 + 接線 (firstTime gate in MapPage). 台灣家長+兒童均受益。trauma user 最受益。 | M (2hr) | ⭐⭐⭐⭐ | **強烈推薦** |
| **Error Reframing: "data point" microcopy** (答錯 → 「你的腦子正在記住這個字！」) | [LearningExplorer 2026](https://www.learningexplorer.org/how-to-overcome-language-learning-anxiety-a-guide-to-confident-speaking-in-2026/); Krashen FLA research | ✅ **適合** — 已有 PRAISE_TIMEOUT / WRONG_POOL 機制。改 WRONG_POOL 文字成「data point」framing + 拿掉 sfxWrong (改 neutral sfx) for first wrong attempt。文字改動不改架構。 | S (30min) | ⭐⭐⭐ | 推薦，搭配 E3 |
| **Placement / Adaptive Difficulty** (根據答題自動調 difficulty) | Duolingo placement test; [AI adaptive content 2025](https://www.learningexplorer.org/how-to-overcome-language-learning-anxiety-a-guide-to-confident-speaking-in-2026/) | 🟡 **部分適合** — Pickup 已有 easy/medium/hard difficulty flag，但無 adaptive logic。自動調難度需 backend ML → 不符合 Cloudflare Pages static 架構。替代：rule-based adaptive（連錯 3 題 → 自動降為 easy mode） | L (3hr) | ⭐⭐ | 可研究，不急 |
| **No Accuracy / No Score screen for L1-3** (入門保護期) | Duolingo 2025 "hearts removed" for paid users; Babbel「無成績顯示」early lesson | ✅ **適合** — 靜態判斷 `lesson.lessonInChapter <= 3 ? hideAccuracy : showAccuracy`。Cloudflare Pages 靜態友好，零後端需求 | S (20min) | ⭐⭐⭐ | 推薦 (= E1 的加強版) |

### 🏆 本次 ARCH-REC: 接線 OnboardingPicker — Motivation + History 問題
- **根因**: trauma persona 最大阻力是「開始前就假設自己會失敗」→ 沒有被問「你的故事」就直接答題 → 自我保護 = 逃跑
- **現有資產**: `src/react-app/components/OnboardingPicker.tsx` 已有 4 軸喜好選擇器，只缺「previous experience」問題一組 + MapPage firstTime gate 接線
- **架構改動**: MapPage 加 `pickup.onboarding.done` localStorage guard → 首訪渲染 OnboardingPicker + 一個新 "previous experience" 問題 chip group → onComplete 設 flag → 進地圖
- **Pickup tech stack 適配**: React 18 + localStorage → 零後端，零新依賴，零 CDN 成本，完全符合 Cloudflare Pages static 架構

---

*5-agent dispatch: 本 audit 由 Player Walkthrough (PW) agent 完成。下一步: Code-Health agent 確認 listen-mc blindRetry 改動不破壞 onAnswer log parity。*

---

**Sources:**
- [Duolingo onboarding UX breakdown — UserGuiding](https://userguiding.com/blog/duolingo-onboarding-ux)
- [The Duolingo Onboarding Experience — Juno School](https://www.junoschool.org/article/duolingo-onboarding-experience/)
- [Language Learning Anxiety Guide 2026 — LearningExplorer](https://www.learningexplorer.org/how-to-overcome-language-learning-anxiety-a-guide-to-confident-speaking-in-2026/)
- [Learner emotions in AI-assisted ESL/EFL — Frontiers Psychology 2025](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1652806/full)
- [Integrating IT to reduce anxiety in FL learning — Sage Journals 2025](https://journals.sagepub.com/doi/10.1177/02666669251325520)
- [Duolingo user onboarding — GoodUX/Appcues](https://goodux.appcues.com/blog/duolingo-user-onboarding)
- [Building Effective Onboarding — Medium/Lopatina](https://medium.com/@kotarina832/building-effective-onboarding-experiences-lessons-from-duolingo-7aa2af536020)
