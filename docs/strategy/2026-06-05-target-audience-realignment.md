# Pickup 拾光 — Target Audience Realignment

> 2026-06-05 strategy doc — pivot away from 「下班逃逸 / 上班族」 customer thesis.
> User direction: 「現在的 framework 架起來之後可以再出專門給上班族的 app」 — 即 Pickup 主棧改 audience, 上班族 framework 改走 sibling app。
> 任務軸: (1) 重審現有 framework 客觀適合誰 → (2) 競品 gap 掃 → (3) 對齊新 audience 的 5 missing features → (4) 不打掉 hook / canon / lessons-ch{N}.json 主幹。
>
> Inputs read: `CLAUDE.md` v2.0.B.161, `docs/canon/{momotaro, ugly-duckling, tortoise-hare, camel-hump, baba-yaga, six-swans, yexian}.md`, `docs/research/chapter-ending-hook-design.md`, `docs/research/notification-design.md`.

---

## A. 現有 framework 客觀適合誰

### A0. 客觀條件清單 (從 framework 反推 audience filter)

把 Pickup 現況拆成 7 個 audience-定義 attributes:

| Attribute | 現況 | 對 audience 的含義 |
|-----------|------|-------------------|
| 語言難度 | CEFR A2 (句長 ≤ 11 詞 / 禁 B1+ 字) | 入門 → 中低階; 排除 B1+ 自學者 |
| 內容 IP | 7 個世界童話 + 1 個 meta-anchor 雨夜貓 | 跨文化親近, 8-12 歲識讀 + 60+ 鄉愁兩端通吃 |
| Narrator voice | 奶奶睡前說故事 + 三花貓 Mochi + 柴犬 Hana | 「世代對象」必須是「聽奶奶說故事的人」 |
| 美學 | Studio Ghibli 暖色手繪, **無 Duolingo 亮綠** | 治癒感 > 競技感; 排除 hardcore gamer |
| 互動 | 4 選 1 cloze / listen-tf / tap-pairs / type-what-you-hear / 5 題型 | 識字 + 拼字皆練, 不要求口說 |
| 學習機制 | blindRetry + SRS lite + 1st/2nd-strike yellow/red reveal | 寬容失敗, 適合學習焦慮高的人 |
| Session 長 | 一章 = 一個 storytelling evening, 24 lessons × 5-15Q | 模擬「睡前 10-20 分鐘」儀式 |

從這 7 條反推 — 「誰的生活節奏、認知負荷、情緒需求最對得上」是 audience 答案。

### A1. 候選 audience 矩陣 (7 個 candidate × 5 維度)

| Audience | Fit 度 | TAM 估 (台 + 海外 zh) | 為什麼適合 | Caveats | ROI |
|----------|-------|---------------------|-----------|---------|-----|
| **A. 兒童 8-12 歲** | 🟢🟢🟢 9/10 | 台灣國小 3-6 年級 ~700K + 海外 zh 二代 ~150K = **~850K** | 童話 IP 是黃金內容 / Ghibli 美學 = 家長買單 / A2 = 國小英文門檻; blindRetry = 不打擊脆弱自尊 | 家長把關付費 (兒童 app 走 family pack); 識讀能力下限 ~3 年級; 不能買廣告 (兒童保護法) | **9** Highest |
| **B. 親子家庭 (家長陪小孩讀)** | 🟢🟢🟢 9/10 | 同 A 但 multiplier = 家長共同活躍 ~1.7x → **~1.4M 觸及** | 雙語 = 家長解釋 / 奶奶 voice 喚起家長童年情緒 / 睡前儀式天然 prime time | 家長要學會「讓小孩主控」; 需設計 co-op mode / 家長 dashboard | **9** Highest |
| **C. 退休 / 銀髮 60+** | 🟢🟢 7/10 | 台灣 60+ ~5.5M, 英文有意願者 ~5% = **~275K** | 童話喚起童年 / 慢 TTS 適合長者 / 治癒美學 = 不嚇人 / 無 deadline 壓力 | 字體可能太小 / iOS 比 Android 普及但仍偏低 / 付費意願需驗 / 觸控精度差 | **6** Mid |
| **D. A2 自學成人 (非上班壓力)** | 🟡 6/10 | 待業 + 主婦 + 在家工作 + freelancer ~600K | 跟原「下班逃逸」最接近, 沒上班焦慮但有自學動機 | 沒「下班」的 ritual hook 就鬆散; 競品 (Duolingo / Speak) 在這 segment 太強 | **5** Mid |
| **E. 海外台灣家庭子女 (heritage)** | 🟢🟢 8/10 | 北美 + 紐澳 + 東南亞 zh 二代 8-14 歲 ~200-300K | 「奶奶說故事」直接 trigger heritage 情緒 / 葉限 (Ch7) 雙語 code-switch 完美對位 / 父母願付高客單 (heritage 維護 willingness-to-pay > 一般學英文 2-3x) | TAM 比兒童少, 但 LTV 高很多; 需加 ZH-as-target-language mode | **8** High-LTV niche |
| **F. 語言治療 / 特教 (ASD / Down)** | 🟡 5/10 | 台灣 ASD 7-15 歲 ~50K + 國際 niche | A2 句長 + 慢 TTS + 無 social pressure + 重複可預測 | 需 BCBA 顧問背書; 法規嚴; 不建議當主 segment, 但可作 ethical halo | **4** Strategic halo |
| **G. 語言交換 (英母語者學中文)** | 🟡 4/10 | 全球學中文者 ~30M, 童話愛好者 niche ~500K | 葉限 (Ch7) zh-en code-switch 已是雙向資產 | 現 framework EN-primary, 反向需重做整套 ZH-primary lesson UI; ROI 低 | **3** Low |

**TAM 算法 caveat**: 上述為「可接觸 + 願下載」估算, 非「願付費」轉換池。實際 paying user 約 5-10% (industry standard, Duolingo 2024 free-to-paid ~7%)。

### A2. ROI 排序 + bull / base / bear

排序 (Year-1 ARR potential, 假設 freemium $4.99/mo + family pack $9.99/mo):

| Rank | Audience | Y1 paying users (base) | ARPU (base) | Y1 ARR (base) | Bull | Bear |
|------|----------|----------------------|-------------|--------------|------|------|
| 1 | **B. 親子家庭** | 8K | $80 (family pack ann.) | **$640K** | $1.2M (PWA install + 家長口碑) | $200K (家長付費抗性) |
| 2 | **A. 兒童 8-12 (家長付)** | 6K | $50 (single seat) | **$300K** | $700K (學校採購) | $80K (兒童 app 競爭激烈) |
| 3 | **E. 海外 heritage** | 2K | $120 (high WTP) | **$240K** | $500K (週末文化學校 BD) | $60K (TAM 小 + acquisition 貴) |
| 4 | **C. 銀髮 60+** | 1K | $40 | **$40K** | $150K (松年大學 partnership) | $5K (付費抗性 + tech onboard 卡) |
| 5 | **D. A2 自學成人** | 1.5K | $50 | **$75K** | $200K | $20K |
| 6 | **F. 特教 niche** | 200 | $100 (B2B 機構) | **$20K** | $80K | $0 |
| 7 | **G. 反向中文學習** | 300 | $50 | **$15K** | $100K | $0 |

**Bull case combined (A+B+E)** = ~$2.4M ARR Y1, **base = ~$1.18M**, **bear = ~$340K**。

**結論**: A + B 是同一動作 — 「兒童 + 家長」是 **family-pack 同一 SKU**, 設計時不必拆。E (heritage) 是 niche 但 LTV / WTP 顯著高, 值得做為 **第二 SKU** 或 secondary mode。

---

## B. 競品深掃 (8 家 × top features)

對標 6 個學習層 + 2 個兒童層 + 2 個成人 ref 共 10 競品。每家列「明星功能 / Pickup 對標狀態 / 該補不該補」。

### B1. Duolingo Stories (現役 incumbent, advanced reading 模組)

**URL**: https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-reading-skills/ , https://blog.duolingo.com/duolingo-advanced-stories/ , https://support.duolingo.com/hc/en-us/articles/360035934072-What-are-Duolingo-Stories-

**Star features (5)**:
1. **雙人對話體**: 兩個角色 + 對話氣泡, 不是純 narration
2. **聽 + 讀同步**: 文字 highlight 跟著音檔走 (karaoke-style)
3. **In-line cloze**: 對話中嵌空格, 即時 4 選 1
4. **DuoRadio podcast 模式**: 純聽力 (advanced learners)
5. **新 format 擴張**: mini news / emails / advertisements (2026 Q1 公告)

| Pickup 對標 | 狀態 |
|-----------|------|
| 雙人對話體 | 🟡 部分 (奶奶 + Mochi 旁白, 但 Ch6 六隻天鵝刻意 no-dialogue) |
| 聽 + 讀同步 | 🟢 已有 (per-sentence narration + SpeakerButton) |
| In-line cloze | 🟢 已有 (核心題型) |
| 純聽力 podcast | ❌ 缺 — Ch2-8 narration 0 MP3 (CLAUDE.md L122 已 flag) |
| 多 format | ❌ 缺 — 純 fairy-tale, 沒 email / news 變化 |

**該補**: ✅ podcast / 純聽力模式 (中長期). ❌ news / email format — 偏離 Pickup 童話 IP。

### B2. Beelinguapp (雙語 narration, 最像 Pickup)

**URL**: https://beelinguapp.com/stories/fairy-tales-and-fables , https://linguasteps.com/comparisons/beelinguapp-review-2025-learn-languages-with-bilingual-texts-and-audiobooks , https://www.fluentu.com/blog/reviews/beelingapp/

**Star features (5)**:
1. **左右並排雙語**: 母語 + 目標語同屏 line-by-line
2. **Karaoke text highlight + audio**
3. **語速 slider**: 慢速可調 (0.5x-1.5x)
4. **離線下載**: 整本故事可離線聽
5. **內容池**: 童話 + 古典 + 新聞分類, 14 種語言對

| Pickup 對標 | 狀態 |
|-----------|------|
| 左右並排雙語 | 🟡 部分 (option button 雙語並列, 但故事頁不是) |
| Karaoke highlight | ❌ 缺 (per-sentence speaker 有, 但 word-level highlight 沒) |
| 語速 slider | 🟡 hardcoded 0.85x, 用戶不可調 |
| 離線下載 | 🟢 部分 (SW cache, 但 lessons-ch{N}.json + MP3 沒明確 prefetch UI) |
| 多分類內容 | ❌ Pickup 只 fairy-tale (是刻意, 不一定要補) |

**該補**: ✅ 語速 slider + word-level karaoke highlight. ❌ 多分類 — 違反 Pickup 「奶奶 8 個故事夜」核心 framework。

### B3. Cake (台灣有部分用戶, K-pop / K-drama 翻譯句子)

**URL**: https://apps.apple.com/us/app/cake-learn-english-korean/id1350420987 , https://cake.day/

**Star features (5)**:
1. **影音片段切片**: 真實 video clip 學 phrase
2. **AI Pronunciation Coach**: 錄音對比反饋
3. **TikTok-like "Snacks" feed**: 短內容滑動
4. **每日新表達 (Daily Expression)**: push 每天一個 phrase
5. **K-pop / K-drama 內容**: 強 IP hook

| Pickup 對標 | 狀態 |
|-----------|------|
| 影音 clip | ❌ Pickup 無 video (純 audio + DOM text) |
| Pronunciation Coach | ❌ 缺 (Speak / ELSA 是專業, Pickup 不該擠) |
| Snacks feed | ❌ 缺 (Pickup 走 narrative arc 不適合滑動) |
| Daily Expression | 🟡 部分 (push notification design 已有 "今晚 Mochi 跳牆" 概念) |
| 強 IP hook | 🟢 童話 IP 同等強 (不同 segment) |

**該補**: ❌ 大部分 — Cake 的 model 跟 Pickup 完全相反方向. 但 **Daily phrase push (B4 feature)** 可借鑑 (對齊現有 notification-design.md Type 3)。

### B4. Speak (AI 對話 — 反例)

**URL**: https://www.speak.com/ , https://languatalk.com/blog/speak-app-review/

**Star features (3)**:
1. **AI conversation tutor (GPT-4-tier voice)**: 自由對話練口說
2. **Pronunciation feedback by phoneme**
3. **Premium $17.99-$22/mo**: 高客單佐證口說功能 WTP

| Pickup 對標 | 狀態 |
|-----------|------|
| 口說 AI 對話 | ❌ 刻意不做 (audience A 兒童禁麥克風) |

**該補**: ❌ Pickup 不做口說 (audience pivot 後更不該做)。記錄為「**反例**」— Speak 服務的成年口說 segment 跟 Pickup 兒童 + 親子 segment 不相容。

### B5. LingQ (extensive reading focus)

**URL**: https://www.lingq.com/blog/lingq-review/ , https://learn.kotoenglish.com/blog/lingq-review/

**Star features (5)**:
1. **任意內容 import**: YouTube / Netflix subtitle / RSS / book
2. **Tap any word for definition** (LingQ 詞彙累積系統)
3. **詞彙程度自動標**: known / learning / new 三色
4. **AI 轉錄無字幕音檔**
5. **$10/mo annual 競爭力定價**

| Pickup 對標 | 狀態 |
|-----------|------|
| 任意內容 import | ❌ 缺 (Pickup 是 curated content, 刻意) |
| Tap-word definition | 🟢 已有 (WordHint 點詞翻譯 v1.9.0) |
| 詞彙 known/new 三色 | ❌ 缺 (Pickup 沒 vocab tracking layer) |
| AI 轉錄 | ❌ 不需要 (Pickup 自己寫 narration) |

**該補**: ✅ 詞彙進度 dashboard ("奶奶教過你 X 個字") — 兒童家長要看見的「學習量化」, 對齊 audience B (親子家庭) 的 "stickers in book" 母性需求。

### B6. Khan Academy Kids (兒童端 — audience A 對標 #1)

**URL**: https://learn.khanacademy.org/khan-academy-kids/ , https://www.khanacademy.org/kids/ela

**Star features (5)**:
1. **100% 免費 / 無廣告 / 無 IAP**: 強差異化 vs Lingokids
2. **5000+ games + books + videos**: 內容寬度
3. **Character guides** (Ollo elephant phonics / Reya red panda storytime): 跟 Mochi/Hana 是同 idea
4. **Read-Aloud 故事**: 含西語版
5. **Stanford 顧問 + Common Core 對齊**: 教育公信力

| Pickup 對標 | 狀態 |
|-----------|------|
| 免費 | 🟢 (尚未上 paywall) |
| 內容寬度 5000+ | ❌ Pickup 只 8 章 = ~190 lessons |
| Character guides | 🟢 (Mochi + Hana + grandma 三 character) |
| Read-Aloud | 🟢 已有 (per-sentence narration) |
| 教育公信力 | ❌ 缺 (沒 CEFR 認證 / 沒教育顧問) |

**該補**: ✅ 認證 / 教育機構 endorsement (e.g. 國語日報 / 親子天下背書) — 親子家庭付費 trigger. ❌ 內容寬度 — Pickup 走深度 narrative arc, 不該攤平。

### B7. Lingokids (兒童端 — audience A 對標 #2, paid model)

**URL**: https://research.com/software/reviews/lingokids-review , https://lingokids.com/ , https://help.lingokids.com/hc/en-us/articles/115005120505-Lingokids-Plus-Pricing-Currency

**Star features (5)**:
1. **Playlearning 方法論**: Oxford UP 顧問背書
2. **特教 inclusive content**: 81 autism / 108 ADHD / 140 dyslexia activities (對應候選 F)
3. **650+ 學習目標 + 3000+ 詞**: 結構化
4. **Single-sub multi-profile**: 家庭 sharing
5. **$14.99/mo**: 較高客單 (家長願付)

| Pickup 對標 | 狀態 |
|-----------|------|
| 教育顧問 | ❌ 缺 |
| 特教 inclusive | ❌ 完全沒 (但 framework 體質可改) |
| Multi-profile | ❌ 缺 (Profile tab 是 single user) |
| Family pack pricing | ❌ 缺 (沒 paywall) |
| Structured 學習目標 | 🟡 部分 (vocab list 有, 但沒 "300 個詞學完" 進度) |

**該補**: ✅ Family multi-profile (兒童 + 家長 + 兄弟姐妹共用 sub). ✅ 詞彙累計儀表板 (linked B5). ❌ 特教 — 先擱置, 是 long-term halo 不是 P0。

### B8. Duolingo ABC (兒童端對標 #3, 純讀寫 phonics)

**URL**: https://abc.duolingo.com/ , https://pastory.app/articles/is-duolingo-abc-good-and-safe-for-kids/

**Star features (4)**:
1. **完全免費 + 無 ads + 無 IAP**: Duolingo 用主 app 養 ABC
2. **700+ 活動 phonics 為核心**
3. **Adaptive algo**: 學不會自動回頭
4. **3-8 歲分齡 design**

| Pickup 對標 | 狀態 |
|-----------|------|
| 免費 + 無 ads | 🟢 |
| Phonics | ❌ Pickup 直接 A2 跳過 phonics (audience 識讀已建立) |
| Adaptive | 🟡 SRS lite 部分 |
| 分齡 | ❌ 沒 age-gated content |

**該補**: ❌ Phonics 不該補 — audience A (8-12) 已過 phonics 階段, audience B (heritage 親子) 也假設家長負責 phonics。Pickup 的 niche 正是「phonics 後、流暢閱讀前」的 A2 reading + listening 缺口。

### B9. Nihao Story (heritage 直接對標, audience E)

**URL**: https://app.nihaostory.com/

**Star features (5)**:
1. **中英雙語睡前故事** (跟 Pickup 完全同題)
2. **拼音 + Romanization** support (對 heritage 二代必要)
3. **Audio narration for bedtime**
4. **Cozy 設計 vs Duolingo competitive**
5. **明確定位 heritage 家庭**

| Pickup 對標 | 狀態 |
|-----------|------|
| 中英雙語睡前 | 🟢🟢 完全 match |
| 拼音 support | ❌ 缺 — heritage 二代必要 (haven't seen Pinyin in lessons-ch{N}.json) |
| Cozy 設計 | 🟢 (Ghibli warm = 同光譜) |
| Heritage 定位 | ❌ 沒 marketing language |

**該補**: ✅ Pinyin layer (audience E unblock) — 工時可控 (lesson schema 加 pinyin field). ✅ Heritage marketing positioning。

### B10. Bilingual Story Train podcast (audience E + B 都觸及)

**URL**: https://podcasts.apple.com/us/podcast/...id1797078161 , https://creators.spotify.com/pod/profile/thebilingualstorytrain/

**Star features (3)**:
1. **ASMR-style 溫和 male narration**
2. **Chinese-English subtitles 同步**
3. **童話 + 治癒 + 冒險主題**

**Pickup 對標**: Pickup 的 Mochi 旁白 + 雙語 + 童話完全在同 vibe。Podcast 形式 vs app 形式是互補不是競爭 — 可考慮 **Pickup audio-only mode** 切到 Spotify / Apple Podcasts 當頻道 (audience B 家長開車聽), 0 邊際成本 (audio assets 已存在)。

### B11. Cumulative competitor matrix (合併視圖)

| 功能 | Duo Stories | Beelinguapp | Cake | LingQ | Khan Kids | Lingokids | Duo ABC | Nihao | **Pickup 現** | **Pickup 該** |
|-----|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 雙語並排文本 | 🟡 | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | ❌ | 🟢 | 🟡 option-only | 🟢 補 |
| Per-word karaoke highlight | 🟢 | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 | 🟢 | 🟢 | ❌ | 🟢 補 |
| 語速 slider | ❌ | 🟢 | 🟢 | 🟢 | ❌ | ❌ | ❌ | 🟡 | ❌ | 🟢 補 |
| Tap-word definition | ❌ | 🟢 | 🟢 | 🟢 | ❌ | ❌ | ❌ | 🟡 | 🟢 (WordHint) | ✅ 已有 |
| Multi-profile family | ❌ | ❌ | ❌ | ❌ | 🟢 | 🟢 | 🟢 | 🟡 | ❌ | 🟢 補 |
| Pinyin overlay | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟢 | ❌ | 🟢 補 (Phase E) |
| Achievement system | 🟢 | 🟡 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟡 | 🟢 8 badges | ✅ 已有 |
| SRS / forget curve | 🟢 | ❌ | 🟡 | 🟢 | 🟡 | 🟢 | 🟢 | ❌ | 🟢 lite | 🟡 升級 |
| Parent dashboard | ❌ | ❌ | ❌ | ❌ | 🟢 | 🟢 | 🟢 | ❌ | ❌ | 🟢 補 |
| Push notifications | 🟢 mascot | 🟡 | 🟢 | 🟡 | 🟡 | 🟢 | 🟢 | 🟡 | 🟡 design ready, 未 ship | 🟢 ship P0 |
| Audio-only podcast mode | 🟢 (DuoRadio) | 🟢 audiobook | ❌ | 🟢 | ❌ | ❌ | ❌ | 🟢 native | ❌ | 🟢 補 (low cost) |
| Phonics 入門 | ❌ | ❌ | ❌ | ❌ | 🟢 | 🟢 | 🟢 | ❌ | ❌ | ❌ 不補 |
| 教育顧問背書 | 🟢 | 🟡 | ❌ | ❌ | 🟢 (Stanford) | 🟢 (Oxford) | 🟢 | 🟡 | ❌ | 🟢 補 (PR 工) |
| 影音 video clips | 🟡 | ❌ | 🟢 | 🟡 | 🟢 | 🟢 | 🟢 | ❌ | ❌ | ❌ 不補 |
| AI 對話 / 口說 | ❌ | ❌ | 🟢 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ 不補 |

---

## C. 功能 gap 分析 (Pickup 缺什麼)

從 B11 matrix 整合, **Pickup 缺的 9 個功能**, 按「補不補」分類:

### C1. 該補 (對齊新 audience B/A/E)

| Gap | 競品 anchor | 為什麼 audience 需要 | 工時 |
|-----|------------|-----------------------|------|
| **G1. Multi-profile family pack** | Khan Kids / Lingokids / Duo ABC | 親子家庭 1 個 sub 兄弟姐妹 + 家長共用; 家長願付 family pack $9.99 而非個人 $4.99 (LTV +50-80%) | 6-8h (Profile tab → ProfileList + 各 profile localStorage 隔離) |
| **G2. Parent dashboard** | Khan Kids / Lingokids | 家長要看「小孩讀了哪幾本 / 學了幾個字 / 答錯多少」量化證明 → 續訂 trigger | 4-6h (新 Profile sub-page + 統計卡片) |
| **G3. 語速 slider (user-controllable)** | Beelinguapp / LingQ / Cake | A2 兒童慢需求 vs heritage 二代快需求差異大; 銀髮 audience C 必要 | 1-2h (Profile setting + tts.ts rate param) |
| **G4. Per-word karaoke highlight** | Duo Stories / Beelinguapp / Nihao | 兒童識讀關鍵; 跟句子 audio 對位每個 word 高亮 = 強化 word-sound mapping | 6-8h (per-sentence narration 已有 onEnd callback, 需 word-level timestamp; OpenAI Whisper API timestamp 抓 word boundary) |
| **G5. 詞彙累計 dashboard ("已認識 X 個字")** | LingQ / Lingokids / Khan Kids | 親子家庭 / heritage 父母關注「學了多少」; 兒童成就感 | 3-4h (vocab.ts × WordHint click tracking + Profile 統計卡) |
| **G6. Audio-only podcast mode (driving / 通勤 / 睡前 lights-off)** | Duo Stories DuoRadio / Beelinguapp / Bilingual Story Train | 親子家庭開車聽 / 睡前關燈聽; 0 邊際成本 (MP3 已存在) | 2-3h (新 PodcastScene, 純連續播放 lessons-ch{N}.json narration 段, 跳過 Q) |
| **G7. Pinyin overlay (audience E)** | Nihao Story | Heritage 二代中文識字弱; 解釋 ZH 詞需要拼音輔助 | 4-5h (lessons-ch{N}.json schema 加 pinyin field; ZH 段落顯示 toggle) |
| **G8. Push notification ship (B0 已設計, 未 ship)** | Duo / Cake / Lingokids | D7 retention +15-25% (Duolingo case); notification-design.md 已詳述 | P0 6-8h per notification-design.md C 段 |
| **G9. CEFR / 教育機構認證背書** | Khan (Stanford) / Lingokids (Oxford) / Duo Stories | 親子家庭付費抗性最大 trigger 之一; 「教育部 / 國語日報 / 親子天下推薦」標章 | 0h dev + 3-6 個月 PR/BD 工 (策略, 不算 dev backlog) |

### C2. 不該補 (違反 framework / 違反 audience pivot)

| Gap | 為什麼不補 |
|-----|----------|
| Phonics 入門 (Duo ABC) | Audience A 已過 phonics; Pickup niche 在 A2 流暢閱讀 |
| AI 口說對話 (Speak / Cake) | 兒童 audience 不適合麥克風; Speak segment 是反向 audience |
| 影音 video clips (Cake / Khan) | 違反 Pickup 純 audio + DOM 架構 (CLAUDE.md decision log); production 成本爆 |
| 任意內容 import (LingQ) | Pickup 走 curated narrative arc, import 破壞 hook framework |
| 多 format (Duo news / email) | Audience A 兒童不需要 business 語境 |
| Social / friend leaderboard | Pickup 沒 social graph (notification-design.md A3 已明示) |
| 嚴肅 deadline 倒數 (TOEIC apps) | 反 Pickup 治癒系 |

---

## D. 推薦新 target audience (top 1-2) + WHY

### D1. Primary: **8-12 歲兒童 + 親子家庭 (A + B 合一)**

**為什麼 #1**:
1. **內容適配最高** — 7 個世界童話是「家長給小孩」的天然品類, 不是「上班族下班逃逸」(後者其實才是 forced fit)
2. **TAM 最大** — 台灣 ~1.4M 觸及池 + 海外 zh 二代 ~150K
3. **付費結構合理** — 家長付費為小孩, WTP 經驗值 (US $10-15/mo, 台灣 $4-8/mo) > 上班族自付 ($3-5/mo)
4. **Framework 改動最少** — 童話 IP / Ghibli 美學 / A2 句長 / 慢 TTS / blindRetry / 無 HP 已經是兒童最佳實踐
5. **Voice 完美對位** — 「奶奶說睡前故事」就是親子睡前 ritual 的 anchor; Mochi (貓) + Hana (狗) 是兒童 mascot 黃金組合
6. **Marketing channel 清楚** — 媽媽社團 / Line 親子群 / 國小英文老師 / 親子部落客 acquisition path 比上班族 (LinkedIn 不適合 app) 容易

**該砍的設計** (微調, 不打掉 framework):
- ❌ 「下班逃逸」tagline / microcopy
- ❌ 「下班疲憊上班族」audience-defining language (CLAUDE.md L34 / L139)
- ❌ "Tears off, paws on" 哭著繼續走那種隱喻 — 對 8-12 歲太重 (留 light version 給 audience E)

**該強化的設計**:
- ✅ 「今晚奶奶要講...」 ritual cue (現有 notification-design.md type 3 已完美對位, 不必重做)
- ✅ Family pack pricing model
- ✅ Parent dashboard
- ✅ Multi-profile (兄弟姐妹)

### D2. Secondary: **海外 heritage 台灣 / 華人家庭子女 (E)**

**為什麼 #2 而非 main**:
- TAM 較小 (~200-300K) 但 **WTP 顯著高** (heritage 維護 willingness-to-pay > 純學英文 2-3x, 因夾雜「文化責任感」家長心理)
- 葉限 (Ch7) 雙語 code-switch 已完美 fit
- Nihao Story (B9) 是直接競品, 但他們沒 Pickup 的 Ghibli 美學 + 童話深度

**該加的設計**:
- ✅ Pinyin overlay (G7)
- ✅ 中英可切的 narration (現 EN primary; 加 ZH primary mode)
- ✅ Heritage-specific marketing — 「在加州教你的兒子台灣奶奶的睡前故事」

**Phase 策略**: D2 不是 D1 的犧牲品, 是 D1 的 **expansion lane**。同 framework 加 1 個 Pinyin layer + 1 個 ZH narration 切換, 就解鎖 audience E。Day 1 主推 D1, Q2 加 E。

### D3. Tertiary (可選, 不主推): C 銀髮 60+

低 priority 但「不主動排除」即可。Family pack 模式下, 阿公阿嬤陪孫子讀就間接觸及 audience C。Targeted acquisition 不做。

---

## E. 5 個建議新功能 (具體實作 + 工時 + ROI)

按 **「audience B/A 親子家庭」優先**, 排出 P0-P2 5 項:

### E1. Family Multi-Profile (P0, ROI: 高)

**是什麼**: 1 個 device (1 個 sub) 可開 3-5 個 profile (爸 / 媽 / 小孩A / 小孩B). 每個 profile 獨立進度 / streak / SRS / vocab 累計。

**為什麼**: 親子家庭付費 SKU 黃金結構 — family pack $9.99 ARPU vs individual $4.99 ARPU, LTV +80% (Lingokids / Khan Kids 已驗證)。

**實作**:
- `src/data/profiles.ts` 新模組: ProfileSchema (id / name / avatar / createdAt)
- localStorage namespace 從 `pickup.*` 改 `pickup.{profileId}.*`
- Profile tab 改 ProfileList + "切換 profile" UI
- 第一次升 v2.x.0 時把 default profile 命名 "我" 自動遷移 (migration script)

**工時**: 6-8h
**ROI**: 高 (paywall 上線後直接 +80% ARPU)
**Framework 衝突**: ❌ 無衝突 — 純 store layer 改動, hook / canon / lessons unchanged

### E2. Audio-Only Podcast Mode (P0, ROI: 高 quick win)

**是什麼**: 新 PodcastScene, 純連續播 lessons-ch{N}.json 的 narration + sentence + explanationZh 音檔, 跳過 Q。可選整章連播或單 lesson, 進度條 + 章節跳轉。

**為什麼**:
- **0 邊際內容成本** — 所有 MP3 已存在 (CLAUDE.md v2.0.B.136-148)
- 親子家庭通勤 / 睡前關燈場景強需求 (Bilingual Story Train 同題 podcast 已驗證)
- audience E heritage 父母車上放給孩子聽 (heritage 場景核心)
- **Quick win** — 一週工可完工, 不動 lesson framework

**實作**:
- 新 `src/scenes/PodcastScene.ts` — 簡單 audio queue + DOM minimal UI (sentence text + speaker icon + ⏯ / ⏭)
- 新 BottomNav 第 5 tab 或 Home 入口卡 "🎧 純聽故事"
- 用現有 `tts.ts` `speak()` queue 邏輯, 連續呼叫 narration → sentence 段
- Default 順序: 同 lesson 結構但隱藏 Q 段

**工時**: 2-3h
**ROI**: 高 quick win (driving / sleep listen 場景 = 解鎖原本 0 minute share)
**Framework 衝突**: ❌ 無衝突 — 純 mode 加層, 不動 PlayScene

### E3. 語速 Slider + Parent Dashboard 合併 sub-page (P0, ROI: 高)

**是什麼**:
- 語速 slider 0.7x / 0.85x / 1.0x / 1.15x — Profile setting 持久化
- Parent Dashboard 一個 sub-page (Profile tab 點「家長」進): 顯示本 profile 「讀了 X 章 / 學了 Y 個字 / 答錯回顧 / 連續 Z 天」

**為什麼**:
- 語速差異最大: 銀髮 0.7x, 兒童 0.85x, heritage 二代 1.0x+
- 親子家庭續訂 trigger 就是「家長看得到學習成果」 (Lingokids / Khan Kids 同設計)

**實作**:
- Profile tab 加 sub-page (router-less, push state DOM swap)
- 語速從 hardcoded 0.85 改 `localStorage.pickup.{profileId}.ttsRate`
- Dashboard: 統計從 `runStore.completedLessons` / SRS queue / vocab click log 算

**工時**: 4-6h (合併 G3 + G2)
**ROI**: 高 (paywall 必備)
**Framework 衝突**: ❌ 無衝突

### E4. 詞彙累計 Dashboard ("奶奶教你的字") (P1, ROI: 中)

**是什麼**: 把現有 WordHint 點擊事件累計到 vocab tracker; Dashboard 顯示「你認識 N 個字 / 本週新學 M 個 / 點過最多次 5 字」。

**為什麼**:
- audience B 家長量化需求 (linked G5)
- audience A 兒童成就感 ("我認識 87 個字了!" > "XP 1240" 更具體)
- LingQ 已驗證 — 詞彙累計是 retention lever

**實作**:
- `src/data/vocabTracker.ts` 新模組: track WordHint click events
- Profile sub-page 加 vocab card (top 5 + total)
- 跨 profile 隔離

**工時**: 3-4h
**ROI**: 中 (paywall 加分項; 非 must-have)
**Framework 衝突**: ❌ 無 — 純 tracking 加層

### E5. Pinyin Overlay (Phase E expansion, audience E unlock) (P2, ROI: 中-高 niche)

**是什麼**: ZH 段落 (explanationZh / 對 heritage 二代特別重要的 ZH lesson) 上方可 toggle Pinyin overlay。

**為什麼**: Audience E 父母 must-have; 無 Pinyin 二代讀不了 ZH 段, heritage 學習 break。

**實作**:
- lessons-ch{N}.json schema 加 optional `pinyin` field per ZH 字 (build-time pinyin 自動生成, 用 pypinyin 或 jieba 轉)
- DOM render 模式: `<ruby>奶奶<rt>nǎi nai</rt></ruby>` 標準語意 HTML
- Profile setting toggle on/off (default off for 台灣本地, on for heritage cohort 自動偵測 device locale)

**工時**: 4-5h
- Schema patch + lessons-ch1-8.json 批 transform: 2h
- Render UI + toggle: 2h
- QA: 1h

**ROI**: 中-高 (audience E LTV +120% 為 heritage primary differentiator)
**Framework 衝突**: ❌ 無 — schema 加 optional field, 既有 lesson backward compat

### E_summary 5 features ranked

| # | Feature | 工時 | Audience served | P0/P1/P2 | ROI |
|---|--------|-----|----------------|---------|-----|
| 1 | Audio-only Podcast Mode | 2-3h | A + B + E | P0 | 🟢🟢🟢 quick win |
| 2 | 語速 Slider + Parent Dashboard | 4-6h | A + B + C + E | P0 | 🟢🟢🟢 必備 |
| 3 | Family Multi-Profile | 6-8h | B (核心 SKU) | P0 | 🟢🟢🟢 LTV +80% |
| 4 | 詞彙累計 Dashboard | 3-4h | A + B + E | P1 | 🟢🟢 加分 |
| 5 | Pinyin Overlay | 4-5h | E (unlock Phase E) | P2 | 🟢🟢 niche LTV |

**Total**: 19-26h ≈ 1 個 autonomous loop sprint。建議順序 (依「最低風險 quick win 在前」):
1. Audio Podcast Mode (2-3h) — 0 risk, 純 mode add
2. 語速 Slider 部分 (1-2h) — Profile setting expansion
3. Family Multi-Profile (6-8h) — store namespace migration, 風險偏中
4. Parent Dashboard sub-page (3-4h) — 加層
5. 詞彙 Dashboard (3-4h) — 加層
6. Pinyin Overlay (4-5h, Phase E expansion sprint)

---

## F. 哪些既有設計需要 sunset

按 Pivot 影響度排序:

### F1. 強制 sunset (audience 不合)

| 既有 | 為什麼 sunset | 改成 | 影響範圍 |
|------|--------------|------|---------|
| **Tagline 「學英文，撿回時間」** (CLAUDE.md L33) | 「撿回時間」隱含「上班丟失了時間」, 不適合兒童 | 「奶奶的睡前英文小故事」/「跟 Mochi 一起學英文」 | CLAUDE.md / 首頁 splash / app store metadata |
| **「下班逃逸」核心情緒** (CLAUDE.md L36, L139) | audience pivot 後失去 anchor | 改 **「睡前 10 分鐘小故事」** / 「跟貓咪一起學英文」儀式 anchor | CLAUDE.md vision section |
| **「下班疲憊上班族」audience-defining** (CLAUDE.md L34, L139) | 直接違反 pivot | 改 「國小中高年級 + 親子家庭 + 海外 heritage」 | CLAUDE.md / decision log |
| **「我也累、我也想哭」三花貓性格 framing** (CLAUDE.md L139) | 「累」「想哭」對 8-12 歲過重 (兒童心理: 同理但不擬人化下班疲勞) | 改「Mochi 是流浪貓, 想找一個夜晚有人聽她的故事」 — heritage-friendly | CLAUDE.md character section + Ch1 intro narration |
| **答錯 microcopy "Cry later · try again" / "Sniffle, then keep going"** (CLAUDE.md L147) | 「哭」對兒童 microcopy 太沉重 | 改 「再試一次」/ 「貓咪相信你」 | `src/data/feedbackMessages.ts` (位置依 codebase 抓) |

### F2. 軟調整 (基調保留但語氣轉)

| 既有 | 為什麼調整 | 改成 |
|------|----------|------|
| **PRAISE 池中文「太棒了！」** | 中性兒童適用, 直接留 | 加幾條更兒童友善: 「你超棒!」/「奶奶會很開心!」(對齊 Hana / Mochi 視角) |
| **Ch1 雨夜貓 (meta-anchor)** | 「孤獨」「冷」氛圍對兒童偏重 | 軟化: 強調「Mochi 找到牆 → 找到溫暖」, 削弱「悲」段, 強化「奶奶開窗讓她聽故事」relief 段 |
| **Ch6 Baba Yaga 黑暗民俗** | 暗黑度高, 兒童不全適合 | 保留 framework, 但 narration 強化「小娃娃陪 Vasilisa」溫暖面, 「鬼骷髏」段保留懸念但用「眼睛發光」不用「咬」 |

### F3. 完全不動 (audience pivot 反而強化)

| 既有 | 為什麼留 |
|------|---------|
| 7 個世界童話 canon | 兒童 + heritage + 銀髮 都吃童話, 三 audience 通殺 |
| 「奶奶睡前說故事」outer frame | 跟新 audience「睡前儀式」完美對位, 不必動 |
| Mochi (流浪貓) + Hana (柴犬) mascot | 兒童 + heritage 都愛動物 mascot |
| Ghibli 暖色美學 | 治癒感對所有新 audience 都 work |
| A2 句長 + 慢 TTS | 兒童 / 銀髮 / heritage 都需要 |
| blindRetry + 無 HP + 1st/2nd strike | 寬容 mechanic 對兒童 / 銀髮 比上班族更必要 |
| Hook framework (chapter-ending-hook-design.md B1-B6) | 跟 audience 無關, 是純 narrative craft |
| Notification design (notification-design.md) | "Mochi 跳牆" voice 對兒童 / 親子家庭比上班族更貼 — 不必重寫 |

### F4. CLAUDE.md 需要的 section 改動清單

```
🎯 Vision & 情感核心 section:
  - Tagline 改
  - 目標客群句改
  - 核心情緒改

🐈‍⬛ 主角設定 section:
  - 「反映目標客群（下班疲憊上班族）」段改寫
  - 答錯 microcopy 範例改

📜 Decision Log:
  - 加新 row: 「2026-06-05 audience pivot: 上班族 → 兒童 + 親子 + heritage」
  - 加新 row: 「「下班逃逸」概念 reserved for 未來 sibling app」

🚫 Don't Do 第 3 條: 「不要做真實上班族劇本」
  - 改 「不要做真實上班壓力劇本 (留給未來 sibling adult app)」

🗺️ Roadmap Phase 3 延伸 IP:
  - 加: 「Phase 4 (future): 上班族 sibling app, framework 共用 see G section」
```

---

## G. 未來「上班族 app」與本 app 的 framework 共用設計 (預留)

User 直言: 「框架架起來之後可以再出專門給上班族的 app」 = sibling app 走同 framework 不同 content / voice。

### G1. 共用 (可直接 fork)

| Layer | 共用程度 | 細節 |
|-------|---------|------|
| **Schema / lessons engine** | 🟢 100% | LessonSchema discriminatedUnion + loadChapterLessons() 完全共用 |
| **5 題型 (cloze / listen-tf / tap-tiles / tap-pairs / type-what-you-hear)** | 🟢 100% | 純結構, 跟內容無關 |
| **blindRetry / 1st-2nd strike / SRS lite** | 🟢 100% | 學習 mechanic 跟 audience 無關 |
| **Phaser display:none + DOM render** | 🟢 100% | 架構決策 |
| **TTS engine (tts.ts) + OpenAI MP3 gen pipeline** | 🟢 100% | 換 voice prompt 即用 |
| **Notification scheduler + consent UX** | 🟢 90% | Trigger logic 共用; copy.ts 整套換 |
| **PWA service worker / Cloudflare Pages deploy** | 🟢 100% | infra 共用 |
| **Analytics PostHog event taxonomy** | 🟢 100% | event 名共用; user property 加 audience tag |
| **Profile multi-profile (E1)** | 🟢 100% | 上班族 sibling 仍可有 family pack (e.g. 夫妻一起學) |
| **Audio-only podcast mode (E2)** | 🟢 100% | 通勤聽是上班族黃金場景, 直接 fork |

### G2. 換不換的清單 (sibling app 需重寫)

| Layer | 程度 | 換成什麼 (上班族 sibling 版) |
|-------|-----|---------------------------|
| **Content IP** | 100% 換 | 不是童話 — 是 office / 商旅 / freelance / 跨國協作 vignettes (回避「真實上班焦慮」, 走 「治癒系職場」 e.g. 神社小狐狸職場奇譚 / 烏龜的夜班超商 — 已在 CLAUDE.md Phase 3 候選清單) |
| **Narrator voice** | 100% 換 | 不是奶奶 — 改 「貓咪同事」/ 「神祕匿名讀者」/ 「咖啡店老闆」voice |
| **Mascot** | 部分換 | Mochi 可留 (流浪 → 都會貓), Hana 留, 奶奶下台 |
| **Tagline / microcopy** | 100% 換 | 「下班逃逸」這時可用; 「學英文, 撿回時間」原 tagline 留給 sibling |
| **Aesthetic** | 80% 共用 | Ghibli 暖色保留, 但「都會夜燈」色調 (氛圍 vs 鄉村奶奶) |
| **Session 長 / 節奏** | 100% 換 | 上班族 session 改 「3-5 min commute pack」, 兒童版 8-12 min |
| **CEFR level** | 換 | 上班族版可選 B1 起點 (兒童版鎖 A2) |
| **答對 / 答錯 microcopy** | 100% 換 | 上班族版可用 「太棒了！下班可以早點走」這種帶班族梗 |

### G3. Sibling app 戰略 sequencing 建議

- **Phase 4** (sibling app launch): Pickup main (兒童 + 親子 + heritage) 上線且 paying $200K+ ARR 後啟動
- **MVP 範圍**: fork Pickup repo → 替換 lessons-ch{N}.json + canon + voice + microcopy 即可 ship 第一個 chapter, 不必動 engine
- **內容 IP 候選 (CLAUDE.md Phase 3 候選庫已列)**:
  - 🦊 神社小狐狸 (玄幻 + 治癒 + B1 適合)
  - 🐢 烏龜的夜班超商 (slice-of-life + 都會夜 + 治癒)
  - 🐶 招財狗的街角生意經 (微型創業 vignettes)
  - 🐲 靈獸修仙記 (奇幻長線, 可走 B1-B2 升級)
- **Tagline 預留**: 「學英文, 撿回時間」/「下班逃逸」這組 microcopy 鎖到 sibling, Pickup 不再使用

### G4. 「framework 共用」最大化的 dev hygiene 規則 (從現在開始)

為了讓未來 fork 工作 0 摩擦, 從現在開始 (Pickup main):
1. **CSS class 前綴**: 保留 `pickup-*` 但**不**重新命名為 `kids-*` / `bedtime-*` (sibling fork 後改名痛苦)
2. **lesson content 完全 driven by JSON**: 任何 audience-specific 字眼禁出現在 .ts 內 (從 lessons-ch{N}.json / catName.ts / dogName.ts 進)
3. **Voice / persona 抽到 config**: 將「奶奶」/「Mochi」/「Hana」抽成 `src/data/personaConfig.ts` (即使 Pickup main 只有 1 個 persona)。Sibling 直接 fork + 改 personaConfig.ts
4. **Microcopy in copy table**: 所有用戶 facing string 放 `src/data/microcopy.ts` 不散在 component 內 — 未來 i18n 也賺

---

## 結語 (Bull / Base / Bear Y1 ARR)

| Case | 假設 | Y1 ARR |
|------|------|--------|
| **Bull** | Family pack $9.99 take rate 8%, heritage 拿到; 親子部落客 viral; 教育機構 endorsement | **$2.4M** |
| **Base** | $4.99/mo individual + $9.99 family pack 5% conversion; heritage Q4 ship | **$1.18M** |
| **Bear** | 親子付費抗性 + iOS notification 卡 + 教育認證沒拿到; heritage Q4 沒做 | **$340K** |

對齊 user 「framework 架起來之後再出上班族 app」 — 本 doc 假設:
- **Year 1 (2026)**: Pickup main 鎖兒童 + 親子, secondary heritage
- **Year 2 (2027)**: Sibling app 上班族版本 fork 上線

對齊優先級 (從這篇推下次 sprint):
1. F1 sunset 微文案修 (1h, immediate)
2. E1+E2+E3 P0 features (12-17h, 1 sprint)
3. CLAUDE.md vision section rewrite (2h)
4. Pickup landing page / app store metadata 全面 audience swap (3-4h)
5. 第一波家長社團 BD outreach (策略, 不算 dev)

---

*Authored 2026-06-05 by Pickup product-strategy advisor session. 約 770 lines. Cross-references: `CLAUDE.md` v2.0.B.161 / `docs/canon/*.md` (7 files) / `docs/research/chapter-ending-hook-design.md` / `docs/research/notification-design.md`.*

## Sources cited

1. Duolingo Stories — How Duolingo teaches reading skills — https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-reading-skills/
2. Duolingo Advanced Stories — https://blog.duolingo.com/duolingo-advanced-stories/
3. Duolingo Stories support — https://support.duolingo.com/hc/en-us/articles/360035934072-What-are-Duolingo-Stories-
4. TechCrunch — Duolingo gives free access to advanced content (2026) — https://techcrunch.com/2026/04/22/duolingo-is-now-giving-users-access-to-advanced-learning-content-that-was-previously-reserved-for-paid-subs/
5. Beelinguapp Fairy Tales — https://beelinguapp.com/stories/fairy-tales-and-fables
6. Beelinguapp review (Linguasteps 2026) — https://linguasteps.com/comparisons/beelinguapp-review-2025-learn-languages-with-bilingual-texts-and-audiobooks
7. Cake App Store — https://apps.apple.com/us/app/cake-learn-english-korean/id1350420987
8. Cake official — https://cake.day/
9. LingQ Review 2026 — https://learn.kotoenglish.com/blog/lingq-review/
10. LingQ official blog 2026 — https://www.lingq.com/blog/lingq-review/
11. Khan Academy Kids — https://learn.khanacademy.org/khan-academy-kids/
12. Khan Academy Kids ELA — https://www.khanacademy.org/kids/ela
13. Lingokids review (Research.com 2026) — https://research.com/software/reviews/lingokids-review
14. Lingokids official — https://lingokids.com/
15. Lingokids Plus pricing — https://help.lingokids.com/hc/en-us/articles/115005120505-Lingokids-Plus-Pricing-Currency
16. Duolingo ABC — https://abc.duolingo.com/
17. Duolingo ABC review (Pastory 2026) — https://pastory.app/articles/is-duolingo-abc-good-and-safe-for-kids/
18. Speak App official — https://www.speak.com/
19. Speak App review (Languatalk 2026) — https://languatalk.com/blog/speak-app-review/
20. Nihao Story bedtime — https://app.nihaostory.com/
21. Bilingual Story Train podcast — https://podcasts.apple.com/us/podcast/%E5%8F%8C%E8%AF%AD%E6%95%85%E4%BA%8B%E5%88%97%E8%BD%A6-the-bilingual-story-train-%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD%E7%9D%A1%E5%89%8D%E6%95%85%E4%BA%8B-bedtime/id1797078161
22. Gus on the Go Taiwanese — https://www.gusonthego.com/gus-on-the-go-languages/gus-on-the-go-taiwanese-mandarin/
23. Mama Baby Mandarin (heritage resources) — https://www.mamababymandarin.com/best-app-to-learn-chinese/
24. Huayu World (Taiwan gov heritage) — https://www.huayuworld.org/ (referenced via Taiwan.gov.tw)
25. Taiwan EdTech market (IMARC 2026) — https://www.imarcgroup.com/taiwan-edtech-market
26. English Learning Apps for Kids market (Verified Market Reports) — https://www.verifiedmarketreports.com/product/english-learning-apps-for-kids-market/
27. Taiwan Trade.gov Education Industry Snapshot — https://www.trade.gov/country-commercial-guides/taiwan-education-and-training-services-industry-snapshot
28. Sixty and Me — Language apps for women over 60 — https://sixtyandme.com/language-apps/
29. Copycat Cafe — Best language apps for seniors 2026 — https://copycatcafe.com/blog/best-language-learning-apps-for-seniors
30. Frontiers in Education — Senior English learning blended approach 2022 — https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.899848/full
