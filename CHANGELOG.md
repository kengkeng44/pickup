# 拾光 (Pickup) — Version History / Changelog

> 從 `CLAUDE.md` 拆出(v2.0.B.347 後)。這份是完整版本軌跡 archive,**onboarding 不需通讀**。
> 需要查某版改了什麼時再來看;最新狀態一律以 `git log --oneline` 為準。

| 版本 | 重點交付 |
|-----|---------|
| v0.8-0.13 | 5→8 章 + Ghibli 美學 + 難度 + 極簡 splash(歸檔,不再展開) |
| v1.0-v1.7.5 | rebrand → Pickup, isometric chibi 風格主角(grandma + shiba), 4-tab BottomNav(Home/Tasks/Profile/Alerts), 進站轉場 PawDoro-style cat + zoom in/out + 中心 cream disc, code-split Phaser, vite WebP 轉檔 |
| **v1.7.6-v1.9.7(2026-05-27 autonomous loop)** | **整段 Duolingo parity 改造** |
| v1.7.6 | 全 6 POV scene PNG(rembg)|
| v1.7.10 | code-split Phaser + banner shadow 同色系 |
| v1.7.11 | Listening TTS + node activity sheet + XP/Level + press feedback |
| v1.7.13 | iOS TTS unlock warmup + listening UI replace sentence with 🔊 |
| v1.7.15 | grandma+shiba duo on map + listening reveal full sentence |
| v1.8.0 | TOEIC 風 Ch1 重寫(4 題型 + 1st-person POV) + warm banner peach |
| v1.8.3 | tap-tiles + tap-pairs UI(Duolingo 經典題型) |
| v1.8.6 | CHECK 答錯 auto-reset + Story per-sentence narration with 🔊 |
| v1.8.7 | 砍 PlayScene 底部 nav(immersive)+ char back to beside-current-node |
| v1.8.8 | smaller story 🔊 SVG icon + map character idle bob loop |
| v1.8.9 | Type What You Hear(text input)— 第 5 題型 |
| v1.9.0 | Dashed-underline 點詞翻譯 via WordHint(章節介紹頁)|
| v1.9.1 | Map top HUD bar(Chapters/XP/Level icons + values)|
| v1.9.2 | Duolingo X close button(lesson 頂左,有 confirm)|
| v1.9.3 | npcGrandma 換 isometric PNG(替代舊 Suntera SVG)|
| v1.9.4 | Persistent daily streak(localStorage)+ HUD 加 🔥 |
| v1.9.5 | Profile streak 用 persistent + Begin CTA 文字依模式 |
| v1.9.6 | Tasks tab 加 Daily Streak hero card |
| v1.9.7 | Achievements 8 badges in Alerts tab(streak/XP/chapter milestones)|
| v1.9.8 | CLAUDE.md autonomous-loop sync |
| v1.9.9 | Confetti burst on chapter complete |
| v1.9.10 | Listen / Replay speaker buttons subtle pulse(tap-me cue)|
| v1.9.11 | Key Sentences overlay(paw icon → bubbles with audio + dashed underline + ZH)|
| v1.9.12 | Global click SFX(sfxCardPress on any button tap)|
| v1.9.13 | Agent-audited WordHint dictionary coverage(填 7 個 Ch1 漏字)|
| v1.9.14 | CLAUDE.md sync |
| v1.9.15 | Duolingo HUD(Flag/Crown tier/Gem/Energy SVG)+ nav 去字 |
| v1.9.16 | HUD crown 依 difficulty 不是 level + 獨立金幣計數器 |
| v1.9.17 | 12 user-generated icon PNGs 整合(HUD/Nav/Map nodes) |
| v1.9.18-19 | 角色位置 v3 / v4 iteration |
| v1.9.20 | 角色位置 v5 — 候選 Y scoring 避開節點密集區 |
| v1.9.21-22 | 節點 icon 多樣化 + filter 調校 |
| v1.9.23 | Profile Stats 加 Coins 卡 |
| v1.9.24 | Map char vertical-Y scoring + node icon 多樣化 + lock SVG padlock |
| **v1.9.25 (audit pass 1)** | **Crown 解耦 difficulty 改 level-mapped(audit #3)+ Lesson HUD 砍 streak/timer(audit #1+#4)+ 抽 SpeakerButton 共用組件(audit #5)** |
| v1.9.26 (audit #2) | HUD streak icon 從閃電 webp 改成內嵌火焰 SVG;色票對齊火橙 #ff7a3a;routing 改 → tasks tab |
| v1.9.27 (audit #6) | tap-tiles + type-what-you-hear 答錯流程改 blind-retry parity:flash 後保留 user 輸入/排列,只解鎖 CHECK,不再從零開始 |
| v1.9.28 (audit #7 pass 1) | 新檔 src/ui/tokens.ts 集中 COLOR_*;ClozeUI / EndOverlay / ModeMenu 改 import,3 套同值常數歸 1。TapInputUI/GameHUD 暖色系另一組未動 |
| v1.9.29 (audit #8) | domUtil.ts 加 attachPressFeedback(el, opts) helper;7 個 callsite(SpeakerButton/StoryMapView/EndOverlay/ModeMenu×2/ChapterEnd/ChapterIntro)從複製貼上變一行;ClozeUI 有 lock gate 跳過 |
| v1.9.30 (audit #9) | 11 個 raw PNG(~6.5MB)從 public/mascots/ 移到 tools/raw-mascots/,不再上 CDN |
| v1.9.31 (audit #11) | BottomNav 4 icon 下加 10px label;HUD button 加 aria-label 含 value(Crown level 2 / Streak 5 days etc),screen reader 可讀 |
| v1.9.32 (audit #10 部分) | index.html reduce-motion `svg.tear-cat` → `img.tear-cat` 修死 selector;mascots.ts 經 audit 並非死碼(5 處使用),保留 |
| **v1.9.33 (audit #12 → 12/12 完工)** | StoryMapView node static styles 抽 `.pickup-map-node` CSS class;每 node inline style 18→6,8 node mount 省 96 次 DOM write |
| v1.9.34 (audit-2 F1+F2) | TapInputUI tap-tiles + type-what-you-hear 兩處 72px emoji 🔊 換 SpeakerButton lg primary pulse;PlayScene listen pill 把 emoji 換 SVG;Lesson HUD 加 chapter chip "qN/total" 錨 story mode 左邊 |
| v1.9.35 (audit-2 F5+F6) | GameHUD streak 從 ×N 改 🔥N(去 close-button × 衝突);xp=0 首訪 user HUD coin/streak 不顯示「0」,改加 "🐾 Tap any node to begin" dashed amber 微文案 banner |
| v1.9.36 (audit-2 F4) | tokens.ts 從 Duo bright 全面換 Ghibli warm:green #58cc02→olive #7d9a4f,red #ff4b4b→terracotta #c84a3a。ClozeUI / EndOverlay / ModeMenu 透過 import 同步,整個 app 答對 / 答錯色終於統一 |
| v1.9.37 (audit-2 F3) | Crown HUD slot 下加 4px mini progress bar 顯示 levelProgress(xp).fraction;aria-label 含進度百分比;L1 user 看見 XP 累積朝下一階段 |
| v1.9.38 (audit-2 F10) | PRAISE 池全面雙語化(中文 · English 格式);TTS rate 從 0.92 → 0.85,A2 Taiwanese learners 聽得清 |
| v1.9.39 (audit-2 F9) | deriveCurrentNodeIdx Ch1 完成時改回傳 -1(原本回 5)— pulse class 不再貼錯在 completed node 上 |
| **v1.9.40 (audit-2 F8 → 10/10 收工)** | Mascot.ts 加 setMascotImage(src) 方法;PlayScene story mode 改用 calico-anchor.webp 代替 SVG mascot,map 上看到的三花貓也出現在 lesson screen,brand 連結成立 |
| **v1.9.41 (Duo-flat icon batch 1+2+3 = 12 icons)** | 用戶生 3 張 1024×1024 grid PNG,Python 切+rembg+WebP 出 12 個無線 flat-shape icon。Code swap:SpeakerButton SVG→PNG;StoryMapView welcome 🐾 / HUD streak / locked node / Key Sentences banner;GameHUD streak label;StoryModeScene Daily Streak hero。flag-en/crown-gold/coin-gold/node-paw/node-headphones/node-book 覆寫成 flat 版 |
| v1.9.42 (achievements PNG 接入) | Achievement interface 加 iconSrc?;6/8 badge 接 PNG(paw/flame/lightning/icon-star/node-star/trophy);剩 ☂️/🎯 沒對應 PNG 留 emoji。Alerts tab 八格從 emoji 排版升 flat-icon 排版 |
| **v1.9.43 (Duo flat-light pass)** | 砍違反 Duo 風的「光」:GameHUD progress fill inset glossy / timer pill inset darken / StoryModeScene 2 卡 linear-gradient 全拆;加 Duo 招牌「flat top highlight 帶」(StoryMapView banner + StoryModeScene daily card + XP hero card);新 helper lighten();Chapter Intro/End/StoryEnding CTA box-shadow 從 v1.9.36 殘留 bright green leak 改 olive |
| **v1.9.44 (色塊打光 ≠ 光暈,全清 blur halo)** | 用戶澄清「不要光暈,要色塊打光」。砍所有 blur box-shadow + drop-shadow halo(14 TS callsite + 5 CSS 動畫)。Pulse 從 box-shadow 0→10px 環擴 → 改 transform scale 1→1.03 / 1.05 / 1.04。Map node 平壓 3D depth(remove cast shadow blur);grandma+shiba mascot 移除 drop-shadow;BottomNav blur top halo 改 solid 3px border-top |
| v1.9.45 (mascot solid ellipse floor) | v1.9.44 後 mascot 脫地補回 solid 橢圓地影色塊(zero blur,rgba(60,42,28,0.28-0.30)):StoryMapView grandma+shiba 雙橢圓;Mascot.ts setMascotImage 加 wrapper ellipse 給 calico-anchor lesson 內也接地 |
| **v1.9.46 (audit-3 critical 3 + 動畫加強)** | #1 EndOverlay radial-gradient bg → flat cream + yellow textShadow blur halo 砍;#2 map node radial-gradient gloss → composite inset top stripe + 3D depth(對齊 banner);#3 GameHUD streak ≥5 dynamic drop-shadow halo 砍;#6 pickup-pulse scale 1.03 → 1.05 補回 halo 拿掉後的注意力 |
| **v1.9.47 (audit-3 收尾 8/8)** | #4 3D depth 3-tier scale lock(card 4 / hero 6 / interactive 10 + 3 press);#5 白卡片 4 處(Free Practice / scenario / stat / achievement)補 amber top stripe `inset 0 4px 0 rgba(231,164,74,0.15-0.18)`;#7 BottomNav active tab 加 3px amber `borderTop` 色塊指示條 + `translateY(-2px)` 浮起,inactive = transparent;#8 POV scene linear-gradient carve-out 註解豁免 |
| v1.9.48 (audit-4 #3+#4+#5 安全 ship) | #3 kt-ch1-06 sentence 從 meta "Match the Ch1 words..." → flow "These are the words I will remember.";#4 boot 偵測 localStorage 寫入失敗 → 紅 banner 提醒 "進度無法儲存 — 請關閉私密瀏覽";#5 iOS TTS race fallback:auto-speak 後 1s 檢測,如未起動則 reveal sentence + "🔇 Audio unavailable" 微文案。#1 Ch1 擴充 + #2 sessionStorage resume 因 AFK 風險過大延後 |
| v1.9.49 (audit-5 全 8 AFK-safe polish) | F1 砍 orphaned energy-bolt.webp;F2-F4 Ch1 explanationZh 從 jargon → story voice(去 "Comprehension 題" / "干擾 tile" / UX 細節 leak);F5 welcome banner 雙語 "從第一顆節點開始 · Tap to begin";F6 PRAISE_TIMEOUT 拿掉「green button」字眼(palette olive 後不準了 + 也回避 blindRetry 違反);F7 Ch1-q1 sentence 兩句合一 "I wake up and the rain is falling hard."(TTS intonation 順);F8 explanationZh 標點正規化 |
| **v1.9.50 (Ch1 grandma-v4 上線)** | 市場 pivot:adult Ghibli → 兒童童話。Ch1 重寫成「奶奶睡前故事」框架(糰糰=三花貓敘事者,花花=柴犬,奶奶因女兒住遠每晚對牠們說故事)。Ch1 從 6 題擴成 8 題(3 prologue 設定世界 + 3 奶奶說的雨夜故事 + 1 Goodnight + 1 tap-pairs review)。Schema max(6)→max(8),`STORY_QUESTIONS_PER_CHAPTER` 6→8,`NODE_PATH` 8→10 位置(8 Ch1 + 2 Ch2 lock),`CH1_BEAT_LABELS` 重寫 |
| v1.9.51 (Ch1 narration + title 同步 grandma-v4) | 漏改的 ChapterIntroScene narration + outro 更新成 cat POV / 糰糰+花花;titleZh 「流落街頭」→「我們的第一天」;titleEn 「A Rainy Night」→「The First Story」。**deploy lesson**:wrangler 不加 `--branch=main` 才上 production root,加 flag = 卡 Preview |
| **v1.9.52 (stray cat + custom name + mascot ground)** | 故事 reframe:貓不再被收養,是**流浪貓** 每晚去奶奶院子聽故事(花花是奶奶養的)。Ch1 narration / outro / Q1-Q2-Q6-Q8 全更新。新檔 `src/data/catName.ts` + `applyCatName()` 注入 `{catName}` 預設糰糰。`loadStoryQuestions()` load-time 注入到 sentence + explanationZh。Profile tab 加「貓咪名字」input 改完 reload 套用。ChapterIntroScene 兩隻 mascot 加 solid 橢圓地影色塊(fix floating bug)|
| v1.9.53 (nav去字 + mascot floor band + map bg -5%) | BottomNav 去 EN labels(aria-label 留)icon-only。ChapterIntroScene sceneCard 改 inset 50px floor band(`rgba(60,42,28,0.10)`)— mascot 直接 align-flex-end 站在 floor 上,不再 floating(舊橢圓 hack 移除)。Map bg `#fef8ed` → `#f1ebe1`(數學上 5% 較深的暖米) |
| **v2.0.0 (2026-05-29 Plan 1 ships)** | **Duolingo-nested redesign full Phase A+B**:LessonSchema discriminatedUnion (fixes kt-ch1-06 root cause)、LessonScene 單 lesson scope、StoryMapView 24-button V2 path、runStore per-lesson progress、validate-lessons.js CI guard、Ch1 v2.0 24 lessons / ~110 Q across 5 segments (outer-prologue/main-story/aesop-side/outer-outro/review)、Hana dog name default. Spec: `docs/superpowers/specs/2026-05-29-*.md`. Plan: `docs/superpowers/plans/2026-05-29-*.md`. Plans 2-9 stub in `_next-plans.md` for Ch2-8 content + iOS + polish. |
| **v1.9.54 (paw-only + grey locked + unlock pop)** | 全 node 改用 paw icon(去 book/headphones cycle);locked = greyed paw(`filter:grayscale(1) opacity:0.65`)無 lock icon;新 CSS `@keyframes pickup-map-node-unlock-pop`(scale 0.82→1.12→1)+ `pickup-map-node-unlock-color`(grayscale 1→0 reveal);StoryMapView 加 localStorage `pickup.map.last-seen-completed` 追蹤,跨章 unlock 時自動播 700ms pop 動畫,first-ever 訪客也 pop 第一節點;**bug fix**:Ch2 teaser idx 6+i → 8+i(v1.9.50 Ch1 擴到 8 後沒同步) |
| v2.0.B.118-B.135 | 18-iter autonomous: validate-lessons.js / Ch2-8 batch JSON (lessons-ch{2-8}.json, 1100+ Q) / Q prompt re-tighten ≤8 words / Lesson intro overlay scrapped / L1-L10 expand 12 Qs / TOEIC standard apply / `{catName}` placeholder loader full coverage / Audio-text consistency agent first run / iOS TTS unlock chain repair |
| v2.0.B.136-B.148 | grandma OpenAI TTS Ch1 全章 ~200 MP3 / B.137 audio idempotent skip / B.138 5 correctIndex desync fixed / B.139 listen-mc speaker queue single-call / B.140 BGM ducking + unduck on speech end / B.141 UX Compliance agent first run / B.142 intro overlay deprecated (R1 spec) / B.143-B.146 Duolingo Stories narration entries 加入 Ch1 / B.147 completion article ship / B.148 retire `{catName}/{dogName}` placeholder (Mochi/Hana hardcoded) |
| v2.0.B.149-B.158 | B.149-B.152 lazy-load Phaser via dynamic import 1.2 MB save / B.153 砍 245 lines dead code / B.154 canonical spec v1→v2 rewrite / B.155 PWA service worker + manifest / B.156 1st-strike yellow + 2nd-strike red+reveal color coding / B.157 SW cache poisoning + Phaser/intro race fix / B.158 4-agent audit backlog cleanup (3 grammar + 2 semantic + R8 spec drift) |
| **v2.0.B.159 (audio MP3 gen + cat bubble + Duolingo stats)** | 6 user directives: 補齊 74 缺失 MP3 (L1 narration n1-n6 + Ch1 q6-q8 + 多章 q6-q12) / narration 加 calico-anchor 頭像 + 米色泡泡 + 自動推進 (替代 Continue) / Q snapshot DOM 刪除改 push lessonAnswerLog memory / Duolingo-style _showLessonStats (XP/Accuracy/Time triptych) / lesson review screen 資料層 ready UI deferred |
| **v2.0.B.160 (audio onEnd callback + L1 Q1/Q2 anti-mirror)** | Player Walkthrough agent (5th audit agent) 首次 dispatch 抓 5 個 P0 漏抓: tts.ts `speak()` 加 `onEnd` callback registry (Web Audio src.onended + WebSpeech u.onend route to fireSpeechEnd) / `_renderNarration` 改 audio-driven advance (fallback 5s timer) / ADVANCE_CORRECT_MS 3→5 秒 / L1 Q1 (kt-ch1-l1-q1) 從 negation mirror 改 inference (sleeps under porch vs warm bed) / L1 Q2 同樣 anti-identity (finds shelter wherever vs same place) / L1 n3 重複語意改新場景 (cold rain on her fur) / 3 個 MP3 重 gen |
| **v2.0.B.161 (Lesson Review screen + 5-agent framework ship)** | **R11 4→5 agent audit** (Player Walkthrough 寫進 spec v2 + memory rule) / `docs/agents/dispatch-matrix.md` 16 agent decision tree + parallel/sequential 規則 + audit-5 pipeline / `docs/agents/player-walkthrough.md` 5th agent prompt template / `docs/product/pickup-master-matrix-2026-06.md` 全面盤點 + 競品 gap matrix + ROI 排序 + top 5 next action / `_showLessonReview` method 列所有 Q + 你選 + 正解 + explanationZh (scrollable card list) / '📖 單元回顧' button 在 stat screen / 滿足 B.159 user 第 6 條 deferred 指令 |
| v2.0.B.162-B.220 | 59 iter 大段:Ch1 桃太郎多輪 vocab swap A2 + paraphrase + canon + hook ending v6 / Ch0 ground floor 升 / streak + collectible + sentence builder / pickup-item-writer skill / DB v2 + 5 min/lesson budget / content-db v3 hook 欄 / autonomous cron audit framework 雛形(6 angle UI/UX/walk/code/arch/content)/ 4-agent → cron 自動每 3 小時跑 |
| **v2.0.B.231 (audience pivot 下班族 → 兒童/親子)** | tagline 改「奶奶的睡前英文小故事」/ Mochi 人設改「害羞 + 好奇 + 勇敢」/ sunset「下班逃逸 / 撿回時間 / Cry later · try again」字眼 / 「下班族劇本」改「兒童/親子家庭」/ CLAUDE.md positioning 全面對齊 / 「下班逃逸」概念預留 Phase 3 sibling app |
| v2.0.B.221-B.249 | 29 iter:Ch2-7 lessons-ch{N}.json full rewrite × 6 / Ch8-9 灰姑娘 ship / 6 chapter parallel ship 日韓東南亞 + 俄 + 非 補 Bear cultural gap / Ch22-26 歷史故事 ship / STORY_REGISTRY 30→110 entries / NextStoryPicker 兩按鈕系統(明晚聽 / 繼續聽)/ market research + CC licensing 戰略 / hook framework B1-B6 / Onboarding Picker UI / autonomous cron audit production-ready / B.246 CI auto-deploy / B.249 fix tap-pairs `pairsEn` 27 章全炸 P0 |
| **v2.0.B.250 (cron content P0 — Ch7 q7 A6 verbatim)** | sha 4ca89ee 2026-06-07T1206 content cron 抓 `kt-ch7-l3-q7` P1★ near-verbatim clause echo / correct option 從「where the fish came from」→「the fish's origin」/ 3 distractor 全換 plausible Ch7 entities / explanationZh 升級 point-by-point / 5-agent verdict PASS-WITH-NOTES |
| **v2.0.B.251 (cron walk P0-1 — mute toggle 媽媽哄睡)** | sha 3fc9350 2026-06-07T1218 walk cron persona 佳蓉 34yo Android 媽媽哄睡 / **新檔** `src/data/muteSetting.ts` localStorage + window event / tts.ts `speak()` 加 `force` option, mute 時 silent + onEnd 仍 fire(advance 邏輯不卡)+ 先 stopSpeaking() 防 race / renderers.tsx 14 manual SpeakerBtn 加 `{ force: true }` / LessonPage 加 MuteToggleBtn(44px HIG / warm taupe palette / 中英 aria-label / emoji 字型 fallback chain)/ 5-agent verdict PW SMOOTH P0-1 ✅ |
| v2.0.B.252 (CI auto-deploy cockpit) | ci.yml 加 `deploy-cockpit` job(同 `cloudflare/wrangler-action@v3` + 同 CF token),master push 自動 ship `cockpit-deploy/` 到 pickup-cockpit Pages,不再需手動 wrangler |
| **v2.0.B.253 (Top 3 P0 batch — 3 audit cross-check)** | 接 5 cron audit + 統合 P0 表 + Top 3 ROI 排序: **#1** `renderers.tsx:175-200` NarrationRenderer useEffect cleanup 加 `stopSpeaking()` 解 race(1236 code-health #1)/ **#2** `LessonPage.tsx:459` SRS localStorage key `pickup.story.srs` → `wordwar.srs.kitten` 對齊 storyKitten.ts:302 寫入 / **#3** MapView CHAPTER_META + render-time `readCompletedLessons(ch.id).size` derive 真實進度條(替代硬編 8/24)/ 5-agent post-ship verdict 抓 follow-up: ListenTf race + Ch1 0/24 demotivate |
| v2.0.B.254 (B.253 follow-up — ListenTf cleanup + Ch1 invitation banner) | ListenTfRenderer useEffect 拉 `innerTimer` 到 outer scope + cleanup `stopSpeaking() + clearTimeout` 解 chained setTimeout(speak qEn, 400) leak / MapView `progress === 0` 時改 invitation banner「👇 24 題等你開始 · Tap to start 24 lessons」雙語 / 順手 bar color `#7ac74a` Duo bright green → `#7d9a4f` olive(v1.9.36 token migration backlog)|
| **v2.0.B.255 (cockpit Decision Board)** | cockpit-deploy/index.html 加「⚡ 決策面板」section: Top 3 ROI ranked recommendation cards(S/M/L + 高/中/低 + ROI ⭐)+ 為什麼接 + 📁 file:line + 來源 audit / Open P0 backlog details(5)/ Closed 24h list(6 sha)/ db-stats 4 數字總覽(shipped / open / closure rate 55% / 推薦)/ 統一 distill 5-7 audit 成「接什麼」面板 |
| v2.0.B.256 (CI cockpit deploy branch fix) | `--branch=main` → `--branch=master` 對齊 CF Pages pickup-cockpit project production branch / 之前 B.252-255 全 deploy 到 `main.pickup-cockpit.pages.dev` preview alias 沒 promote production root / 改完 deploy 直接覆寫 production root 顯示新版 |
| **v2.0.B.257 (cockpit 全域 1-tap copy + ✓ feedback 統一)** | Decision Board 3 卡各加大 `.db-copy` button + hardcoded data-prompt(完整 Claude session prompt 嵌)/ cron card primary button 升大 13px + ✓ feedback / next-action banner button + quick-actions 4 個 1-click button 改 `cp(kind, this)` wrapper 統一 1.8s 綠色「✓ 已複製 — 貼到新 Claude session」回饋 / Footer v2.0.B.255 → v2.0.B.257 |
| v1.9.24 | Locked nodes SVG padlock 取代 🔒 emoji |

> **B.257 之後(~B.258-B.347,2026-06-08 → 06-20)**:cron content/walk/code audit 閉環持續每 3 小時自動跑;Ch2-31 內容多輪 P0 修(distractor doctrine / 反鏡像 / explanationZh story-voice / optionsZh 翻譯品質 / A2 KIP end-bias 等);題型擴充(listen-pairs 聽中文配對、comprehension auto 模式跟難度鷹架切聽/讀);**B.347** 介面語言中/英切換 Phase 1 + 難度命名對齊。逐筆軌跡見 `git log --oneline`。
