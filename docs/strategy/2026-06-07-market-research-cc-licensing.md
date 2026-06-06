# Pickup 拾光 — 6 市場深度研究 + CC 故事資源 / 公有領域 IP 盤點

> 2026-06-07 strategy doc — 「Bear 分佈鎖定 (中華 35% / 歐美 40% / 日韓東南亞 15% / 其他 10%) + 公有領域優先 + 自由授權上網查」 雙軸研究.
>
> Inputs read: `CLAUDE.md` v2.0.B.161, `docs/strategy/2026-06-05-target-audience-realignment.md` (audience pivot B.231), `src/data/storyRegistry.ts` v2.0.B.238 (30-entry registry, 9 shipped + 21 candidate).
>
> 上下文: Pickup 已 pivot 為「8-12 兒童 + 親子家庭 + 海外華人 heritage」, 童話 IP 30 章 (9 shipped + 21 candidate) 全 public-domain. 本 doc 解決兩條前置決策:
> 1. 文化分佈 (中華 35 / 歐美 40 / 日韓東南亞 15 / 其他 10) 對哪些市場做最大化, 哪些市場是 stretch?
> 2. 公有領域為主的故事池能撐到 Y2 60+ 章嗎? 哪些 IP 是「免錢但又是金牌資產」, 哪些要排到後期?

---

## A. 6 市場深度分析

每市場列 TAM (8-12 兒童, 英文 / heritage 學習需求) / ARPU / LTV / CAC / LTV:CAC / 分發障礙 / 競品 + 市佔 / ROI 排名.

### A1. 海外華人北美 (US + Canada, 1.5G + 2G heritage)

| 維度 | 數據 | Source |
|------|------|--------|
| 華人總人口 | US ~5.5M + Canada ~1.7M = **~7.2M** | US Census 2024, StatCan |
| 8-12 兒童占比 | 約 6.5% (immigrant family 較高 fertility) | 推估 |
| **TAM 8-12 兒童** | US ~360K + Canada ~110K = **~470K** | derived |
| 海外華人 heritage WTP | $120-180/yr (中文補習 hot trend, parent willing-to-pay 比一般語言學習 +200-300%) | Mama Baby Mandarin / SF Standard 2024 |
| **ARPU 推估** | **$120/yr** (mid-point) | derived |
| LTV (3-yr horizon) | **$280** (assuming 7% annual churn — Duolingo bench) | Duolingo investor deck |
| CAC | **$25-40** (Meta ads "parents of young children": CPM +15-25% vs general, education CPA $7.85 base × 3-5x for high-intent heritage) | Facebook Ads Cost 2026 + Get-Ryze |
| **LTV:CAC** | **~7-9:1** (頂尖) | derived |
| 監管 / 分發 | COPPA + Kids Category 嚴: 禁 3rd-party analytics & ads; iOS Declared Age Range API by Jan 2026 | Apple Dev / iubenda |
| 主要競品 | Nihao Story (cozy bedtime, direct), MakeMake (Spanish-EN, indirect ref), Du Chinese (B1+), Khan Kids (廣度 + 免費) | search results |
| 市佔 | Heritage segment 沒明顯 winner — Nihao Story 是 niche 直接競品, Khan Kids 是 generic incumbent (5M+ MAU US) | |
| **ROI 排名** | **#1** (LTV / CAC ratio 最高, niche 但 WTP 頂) | derived |

**關鍵洞察**:
- 私立 Mandarin immersion 學費 $25-45K/yr (SF Bay Area), 顯示 heritage 維護 WTP 上限極高.
- Chinese American 家長「願花薪水大塊在教育」是 stylized fact (Stanford / Quora threads consistent).
- 「奶奶說故事」voice 完美對位 1.5G / 2G heritage 情緒.
- ❗ 「英文學習 → 中文學習」需 ZH primary mode, Pinyin overlay (registry.ts 已有 yexian ↔ cinderella pair = 雙語切換種子).

### A2. 台灣 (本土 8-12 兒童, 英文學習)

| 維度 | 數據 | Source |
|------|------|--------|
| 國小 3-6 年級總人口 | 約 **700K** (台灣教育部 2024 統計 / 少子化 baseline) | educated estimate |
| 英文補習普及率 | 國小 60-70% 有額外英文補習 / 安親 | trade.gov Taiwan 2025 |
| **TAM 8-12 兒童** | **~450-500K** (有英文需求池) | derived |
| 台灣 Asia-Pacific 英文學習 app 市佔 | **3.16%** of APAC English Learning App market = ~$25M (2025 APAC $786M × 3.16%) | Global Growth Insights 2026 |
| ARPU 推估 | **$50-80/yr** (家長付費抗性 vs heritage; 台灣 Duolingo Super 年費 ~$60) | Duolingo Pricing 2026 |
| LTV (3-yr) | **~$140** (~5% premium churn) | derived |
| CAC | **$10-18** (Meta ads 台灣 CPM 低 + Line 親子社團 organic 有用) | benchmark 推估 |
| **LTV:CAC** | **~9-12:1** (台灣本土最佳) | derived |
| 監管 / 分發 | 個資法 + 兒童及少年福利法 (App Store / Play Store 自動覆蓋); Apple Kids Category 跟全球同 | |
| 主要競品 | Duolingo (incumbent, 但 generic), Lingumi (台灣積極投放), Lingokids (Spain, 台灣翻譯版), AmazingTalker / engoo (1-on-1 tutoring, B2C 真人) | search results |
| 市佔 | Duolingo dominate generic, 兒童 ELT niche 尚無 dominant local player → Pickup gap | |
| **ROI 排名** | **#2** (TAM 不及 #1 大但 CAC 低 + 文化 fit 高 + 起步市場最直接) | derived |

**關鍵洞察**:
- 「e-learning subscription for English among urban Taiwan households +32% YoY」(globalgrowthinsights 2026) — 強需求.
- 台灣家長付費抗性比北美高, 但 CAC 比北美低 1.5-2x → 經濟學上仍是值得的市場.
- 國語日報 / 親子天下 / Facebook 媽媽社團 acquisition channel 清楚.

### A3. 海外華人東南亞 (新 / 馬 / 印, heritage + ELT 混合)

| 維度 | 數據 | Source |
|------|------|--------|
| 新加坡華人 ~75% × 人口 5.6M = ~4.2M, 馬來西亞華人 ~22% × 33M = ~7.3M, 印尼華人 ~1% × 270M = ~2.7M | 三國華人合計 **~14M** | World Bank / official |
| 8-12 占比 ~6% (整體 fertility 稍低) | **TAM ~840K** | derived |
| 學習場景 | 新加坡「華英雙語」官方政策, 馬印「中文 heritage 受壓」, 印尼華人 30-50% 已 dialect-lose | wisacad 2024 |
| ARPU 推估 | **$60-100/yr** (新加坡 PPP 高 $100, 馬印 $40-50) | derived |
| LTV (3-yr) | **~$180** (混合 blend) | derived |
| CAC | **$15-25** (Meta ads SG/MY 效率好) | benchmark 推估 |
| **LTV:CAC** | **~7-9:1** (頂級) | derived |
| 監管 / 分發 | 新加坡 PDPA + Kids App, 馬來西亞 PDPA, 印尼 UU PDP — 不嚴於 COPPA; Play Store 在印尼占 90%+ vs App Store | |
| 主要競品 | I Can Read (Singapore, B&M chain), Berries (Singapore Chinese enrichment), HelloChinese (CN-EN crossover), LingoAce (1-on-1, fastest-growing 新加坡商) | search results |
| 市佔 | LingoAce 已 Forbes 2025 列名, B2C 1-on-1 model 跟 Pickup self-learning 不直接競爭 | |
| **ROI 排名** | **#3** (TAM 大 + WTP 中 + 監管寬, 但需在地化 — Bahasa / Malay 介面門檻) | derived |

**關鍵洞察**:
- 「Passive bilingualism」是 SEA 華人 2G+ 標誌, 跟北美 heritage 同一個 frame.
- 新加坡 PPP 高, 是 SEA 市場 LTV 主力; 馬印走「鋪量 + 低 ARPU」.
- Pickup 葉限 (Ch8) / Pinyin / 桃太郎 / 民間故事池對 SEA 華人 cultural fit 高.

### A4. 日本 + 韓國 (英文學習為主, 非華人 heritage)

| 維度 | 數據 | Source |
|------|------|--------|
| 日本 6-15 歲 ~9M, 韓國 6-15 歲 ~4.5M | **~13.5M** | gov data |
| 日本 18.60% / 韓國 4.36% of APAC English Learning App market = **~$184M (JP) + $43M (KR) = $227M** | Global Growth Insights 2026 |
| 8-12 TAM (有英文需求) | 日本 ~3.5M + 韓國 ~1.8M = **~5.3M** | derived (60% 補習普及) |
| ARPU 推估 | JP **$70-100/yr**, KR **$80-120/yr** (Eikaiwa / Hagwon 高 WTP 文化) | derived |
| LTV (3-yr) | **~$180-280** | derived |
| CAC | **$30-50** (日韓 Meta CPM 較高 + 在地化品牌信任門檻) | benchmark 推估 |
| **LTV:CAC** | **~4-6:1** (中等) | derived |
| 監管 / 分發 | 日本 APPI + 韓國 PIPA — 兒童條款比 COPPA 更嚴 (韓國 14 歲以下 explicit parental consent); App Store / Play Store + Naver / LINE 本土 channel | |
| 主要競品 | Berlitz Kids (incumbent JP), Lingokids (translation present), Duolingo (大量投放韓國), Novakid (1-on-1, KR), QQ English (Filipino 1-on-1) | search results |
| 市佔 | 日本 ELT app 較碎, 韓國 Duolingo + 1-on-1 並列 | |
| **ROI 排名** | **#4** (TAM 巨大但本地化成本 + 競品壁壘高, 中華童話 IP 對日韓家長 cultural fit 微妙 — 桃太郎本身對日本兒童是 native 不是學英文 hook) | derived |

**關鍵洞察**:
- 日本 / 韓國 是「英文苦學文化」, 跟 Pickup 「治癒系睡前」氣質衝突 — 主流市場喜歡 "Eiken / TOEIC drill" 比 storytelling 多.
- ❗ 桃太郎是日本 native culture, 對日本兒童不是「異國童話」是「自己的故事」 → 學英文吸引力降 (但 reverse: 日本兒童看英文版日本童話練英文反而 cultural pride trigger, 待 user 驗證).
- 本地化成本 (假名 / 韓文 UI / 本地 voice) 是高門檻.

### A5. 中國大陸 (TAM 巨大 + 監管難)

| 維度 | 數據 | Source |
|------|------|--------|
| 6-15 歲 ~150M, 英文學習接觸 90%+ | **TAM 上限 ~135M** | gov |
| 中國 English Language Training market 2026-2030 CAGR 29.2%, 但被「雙減」政策嚴重壓縮 | Technavio 2026 |
| 2021 雙減後 K-12 學科類 tutoring 砍 — VIPKid 中國業務 50% 裁員, Dali / ByteDance GoGoKid 關閉 | ICEF 2021 / JMD Edu 2025 |
| ARPU 推估 | 「非學科類」<$30/yr (政策壓低 20% 價格) | Baiguan / Cambridge Network 2025 |
| LTV (3-yr) | **~$70** (高 churn + 競爭) | derived |
| CAC | **$8-15** (CN ad market 已成熟; 但海外 dev 進場 = 高品牌建構成本) | benchmark 推估 |
| **LTV:CAC** | ~5-7:1 (paper-good) **but**: 海外 dev 實際無法直接觸及 — App Store China region + ICP filing + 教育認證三重門檻 | derived |
| 監管 / 分發 | **❌ 對海外 dev 幾乎不可行**: 1) iOS App Store 中國區 ICP 備案, 2) Android (HMS / Xiaomi / OPPO 分散市場), 3) 教育類需特批, 4) 雙減後外籍教師元素禁, 5) 個資跨境傳輸禁 | gov + ICEF |
| 主要競品 | 字節跳動「瓜瓜龍英文」(雙減後也轉型), 學而思英語 (轉型素質教育), 51Talk (轉 phonics 非學科) | search results |
| 市佔 | 中國本土玩家盤踞, 海外 app 進場几乎 0 | |
| **ROI 排名** | **#6 (不主推)** — TAM 巨大但海外 dev access 接近 0, 列為「Y3+ 看政策」option | derived |

**關鍵洞察**:
- 「雙減」是定義性事件 — Pickup Y1-Y2 不該 target 中國本土用戶, 但**中國海外移民 1.5G (在北美 / SEA / 紐澳的中國家庭) 是 Pickup A1+A3 的核心子池**, 不必經中國 store.
- 中國本土未來 Y3+ 可考慮「素質教育」品類重新嘗試 (非學科類 audio storytelling 比較不踩雷), 但不是 Y1-Y2 動作.

### A6. 美國英文母語兒童學中文 (反向: 中華故事為賣點)

| 維度 | 數據 | Source |
|------|------|--------|
| 美國 Mandarin immersion school 396 所 (從 2000 年 10 所成長), 入讀 ~75K 學生 | Chairman's Bao / MI Parents Council |
| Mandarin learner US 6-12 ~250K (含 heritage + 非 heritage) | educated estimate |
| **TAM (非 heritage 學中文)** | **~150-180K** (排除已含於 A1 的 heritage) | derived |
| Immersion 私校學費上限 $45K/yr (Chinese American International School, SF) | SF Standard 2024 |
| ARPU 推估 | **$100-150/yr** (家長 cosmopolitan WTP) | derived |
| LTV (3-yr) | **~$250** | derived |
| CAC | **$30-50** (niche, 但 organic word-of-mouth 在 immersion 家長社群強) | benchmark 推估 |
| **LTV:CAC** | **~5-7:1** | derived |
| 監管 | COPPA + Kids Category 同 A1 | |
| 主要競品 | Du Chinese (B1+ 偏成人), HelloChinese (general), Maomi Stars (兒童, 直接競品), Studycat | search results |
| 市佔 | Maomi Stars 是直接競品但內容偏 phonics; Pickup 童話敘事是差異化 | |
| **ROI 排名** | **#5** (TAM 較窄但 LTV 高, 葉限 / 嫦娥 / 木蘭 / 牛郎織女已在 registry — Y2 解鎖無 dev 成本) | derived |

**關鍵洞察**:
- Pickup registry 21 candidate 內**中華 5 個** (嫦娥 / 后羿 / 牛郎 / 孟姜女 / 白蛇) + Ch8 葉限 shipped, IP 已備齊不必新 source.
- 需 EN-as-primary, ZH-as-target 模式切換 (跟 A1 同套).
- 「跟北美兒子說台灣奶奶的睡前故事」對 immersion 家長 = strong purchase trigger.

### A7. 6 市場 ROI 排名 (整合)

| Rank | 市場 | TAM 8-12 兒童 | ARPU/yr | LTV (3y) | CAC | LTV:CAC | 監管門檻 | Y1 可進入? | 文化分佈 fit |
|------|------|--------------|---------|----------|-----|---------|---------|-----------|-------------|
| **1** | **海外華人北美 (US+CA)** | ~470K | $120 | $280 | $25-40 | 7-9:1 | 中 (COPPA) | ✅ 主推 | 中華 ✅ |
| **2** | **台灣本土** | ~450K | $70 | $140 | $10-18 | 9-12:1 | 低 | ✅ 主推 | 中華 ✅ |
| **3** | **海外華人 SEA (SG+MY+ID)** | ~840K | $80 | $180 | $15-25 | 7-9:1 | 低 | 🟡 Q2 加 | 中華 + 全球 ✅ |
| **4** | **日本 + 韓國** | ~5.3M | $90 | $230 | $30-50 | 4-6:1 | 高 (本地化) | 🟡 Y2 stretch | 歐美 ✅ |
| **5** | **美國非華 學中文** | ~165K | $125 | $250 | $30-50 | 5-7:1 | 中 | 🟡 Y2 加 | 中華 ✅ |
| **6** | **中國大陸** | ~135M | <$30 | $70 | $10-15 | (paper) 5-7:1 | **極高 (海外 dev access 0)** | ❌ Y3+ | 中華 (不可達) |

**4 市場池 (Y1-Y2 可進入)**: TAM 合計 ~7.2M 兒童, 假設 5% reach × 5% paid = ~18K paying users × $100 ARPU = **~$1.8M Y1-Y2 ARR 上限** (跟 audience pivot doc 的 Bull case $2.4M 同 order of magnitude).

---

## B. Bear 分佈鎖定 (中華 35 / 歐美 40 / 日韓東南亞 15 / 其他 10) — 確認 / 微調

### B1. 用戶選定的 Bear 分佈

| 文化軸 | Bear 比例 | 對應市場 |
|--------|----------|---------|
| 中華 (china / 民間 / 中華童話) | **35%** | A1 北美 heritage + A2 台灣 + A3 SEA heritage + A5 美國學中文 |
| 歐美 (europe / global-folk Aesop + Andersen + Grimm + Perrault + Norse) | **40%** | A2 台灣 (本土主要學歐美童話) + A4 日韓 |
| 日韓 / 東南亞 (japan / korea + SEA) | **15%** | A1 SEA 文化親近 + A4 日韓 (桃太郎已 ship Ch2) |
| 其他 (middle-east / russia / india / 印第安 / africa / latin-america) | **10%** | strategic spice — Baba Yaga (Ch6) + Aladdin / Ali Baba + 葉限 paired |

### B2. ROI 對照: Bear 分佈是否合理?

**對齊度檢查**:

| ROI Rank | 市場 | 適配文化 | Bear 分佈分配 | 對齊判斷 |
|----------|------|----------|--------------|---------|
| #1 | 海外華人北美 | 中華 + 歐美 (heritage 家長要孩子認識歐美 mainstream) | 35% + 40% = 75% 都餵到 | ✅ 大部分 OK |
| #2 | 台灣本土 | 歐美 (主) + 中華 (次, 本土文化) + 日韓 (近) | 40% + 35% + 15% = 90% 都餵到 | ✅ 完全 OK |
| #3 | SEA heritage | 中華 + 歐美 + SEA 在地 | 35% + 40% + 15% = 90% 都餵到 | ✅ 完全 OK |
| #4 | 日韓 | 歐美 (主) + 日本童話 (次) | 40% + 15% (含日韓 share) | ✅ OK |
| #5 | 美國學中文 | 中華 (主) + 歐美 (cross-cultural pair like 葉限 ↔ Cinderella) | 35% + 40% pair = 75% 對位 | ✅ OK |

### B3. 微調建議: ❓ 「為何中華不到 50%?」

如果 ROI #1 是海外華人北美 heritage, 邏輯上「中華 IP 應該最強化」, 為何 Bear 35% 而非 50%?

**答案: Bear 35% 已經是「中華刻意 over-index」, 不是不足**

理由:

1. **全球教育 mainstream 是歐美童話**: 台灣 / 北美 (含 heritage 家庭) / SEA / 日韓 — 兒童「該認識的世界童話」list 70-80% 是歐美 IP (Grimm / Andersen / Perrault / Aesop / Norse). Pickup 走 40% 歐美**已經比全球期待低**, 不能再砍.

2. **中華 35% 已是 over-index 證據**:
   - 全球兒童文學市場中華 IP 比例 < 5%
   - Pickup 給中華 35% = **比全球比例放大 7-8x**
   - 北美 heritage 家庭真實使用模式: 「歐美 mainstream IP 學英文 + 中華 IP 補 heritage 認同」是 30/70 OR 50/50, 不是 70/30

3. **Heritage 家長心理**: 他們**不要 Pickup 變「中華童話博物館」**. 他們要的是「孩子能跟學校同學討論 Cinderella + 回家還能聽奶奶版葉限」. 「雙文化兼具」是 heritage 育兒 holy grail, 不是中華 dominant.

4. **如果中華拉到 50%**: 排擠到的不是日韓 (15%) 就是其他 (10%) — 反而把 Baba Yaga / Aladdin / Aesop multi-cultural spice 砍掉, 失去 Pickup 的 "global-folk" 教育品牌.

**結論: Bear 35/40/15/10 已經是策略上中華 over-index 配比, 不需要往上加. 若要微調, 建議微幅減 5% 其他 (10→5%) + 加到中華 (35→40%), 但這是 nuance, 不是必要動作.**

### B4. 進階微調: shipped 9 + candidate 21 vs Bear 分佈

對照 `storyRegistry.ts` 現況:

| 文化 | Shipped 9 章 | Candidate 21 章 | 30 章合計 | 30 章佔比 | Bear 分佈 | 差距 |
|------|-------------|----------------|---------|----------|----------|------|
| 中華 (china + Tang) | 1 (葉限 Ch8) | 5 + Mulan (china tag) | **7** | 23% | 35% | **缺 4 章** ⚠️ |
| 歐美 (europe + global-folk Aesop + Norse) | 6 (醜小鴨 / 龜兔 / 駱駝 / Baba Yaga 部分 / 六天鵝 / 三隻小豬 / Cinderella) | 11 (Grimm / Andersen + Aesop + Beanstalk + Gingerbread + 山羊 + 城鄉鼠) | **17** | 57% | 40% | over +17% ⚠️ |
| 日韓 / 東南亞 | 1 (桃太郎 Ch2) | 0 | **1** | 3% | 15% | **缺 4 章** ⚠️ |
| 其他 (russia / middle-east / multi) | 1 (Baba Yaga) | 3 (Ali Baba / Aladdin + others) | **4** | 13% | 10% | OK |

**讀法**: registry 目前歐美 over-indexed, 中華 + 日韓東南亞 under-indexed.

**建議 candidate pool 補強** (Y2 ship 順序):

| 補哪個文化 | 候選 IP (PD 確認) | 補幾章 |
|-----------|------------------|--------|
| **中華 +4** | 牛郎織女 (registry done) / 嫦娥 (done) / 后羿 (done) / 木蘭 (done) — 全部已在 registry, ship 順位往前提即可 | 4 章 |
| **日韓 / 東南亞 +4** | 一寸法師 (日本) / 浦島太郎 (日本) / 鶴の恩返し (日本) / 興夫与孬夫 (韓國) / 花神 (越南) / Sang Kancil (馬來 trickster) | **新加 registry candidate** |
| **歐美** | 不必再加, 已 over-index 17% | 0 |

→ **建議 Y2 加 4 個日韓 / 東南亞 candidate 進 registry**, 然後 Y2 ship 順序: 中華 4 章先 → 日韓 / SEA 4 章次 → 歐美 stretch 章, 把分佈往 35/40/15/10 拉回.

---

## C. 文化分佈 ROI matrix — bull / base / bear

### C1. 三檔分佈對照

| 文化 | Bull (進攻) | Base (持平) | **Bear (鎖定 — 用戶選)** |
|------|------------|------------|-------------------------|
| 中華 | 25% | 30% | **35%** |
| 歐美 (含 Aesop + Norse) | 50% | 45% | **40%** |
| 日韓 / 東南亞 | 15% | 15% | **15%** |
| 其他 (russia / middle-east / latin / india) | 10% | 10% | **10%** |

### C2. 三檔背後假設

| Case | 假設 | 主要 ARR 來源 | Y1 ARR |
|------|------|-------------|--------|
| **Bull** (歐美 50%) | 北美 mainstream (non-heritage) 兒童採用 / 教育機構採購 / 台灣英文補習班 B2B | 北美 mainstream + 台灣 B2B | $2.4M+ |
| **Base** (歐美 45%) | 北美 heritage + 台灣本土均勢, 日韓 + SEA 為次 | 多市場均沾 | $1.18M |
| **Bear** (歐美 40% / 中華 35%) | 北美 heritage 為核心, 台灣為第二腿, 中華 IP 是差異化 moat | 北美 heritage + 台灣 + SEA heritage | $340K (Bear 全市場 trough) |

### C3. 切換 trigger — Bull / Base / Bear 之間什麼條件下變動

| 情境 | Trigger | 切到哪 |
|------|---------|-------|
| Q3 北美 non-heritage 顯著 conversion (>30% 新用戶 ZH = 0) | mainstream 接受度高 → 加碼歐美 | Bear → Base → Bull |
| Q3 北美 heritage retention > 60% but mainstream conversion < 5% | heritage moat 是真的, mainstream 進攻空轉 | 保持 Bear |
| Q4 台灣 ARR > 北美 | 台灣本土 ROI 證據 → 加碼歐美 (台灣本土主流是歐美童話, 中華是 nice-to-have) | Bear → Base |
| Q4 中國本土需求漏出 (SEA HK 用戶 surge) | 中華 IP 是 unmet demand | 中華 35 → 40 微調 |
| Y2 日韓 / SEA 在地化測試 ROI < 3:1 | 日韓不值得 | 15% → 10% + 補回中華 |

**結論: Bear 鎖定是合理的「保守 + 不依賴未驗證假設」 baseline. 沒有任何即將 trigger 切換的訊號, 不需要動.**

---

## D. Creative Commons / 自由授權兒童故事資源 (5-10 個)

### D1. 主要 CC / PD 兒童故事庫對照表

| # | 平台 | URL | 內容量 | 授權 | 商用可否 | Pickup 可用性 | 建議使用 |
|---|------|-----|--------|------|---------|--------------|----------|
| 1 | **StoryWeaver (Pratham Books)** | https://storyweaver.org.in | **10K+** 故事 / 125 語言 | **CC-BY 4.0** | ✅ 商用 OK (需 attribution) | ⭐⭐⭐ **金牌資產**. 印度童話 + 多語 + CC-BY 是 Pickup 「其他 10%」最大來源 (印度章 5-6 章潛力) | Y2 印度章 (Panchatantra 等) 的視覺 / 文字 reference + 直接改編 |
| 2 | **Book Dash + FKB (Free Kids Books)** | https://freekidsbooks.org , https://bookdash.org | ~500 Book Dash + 1000+ FKB aggregated | **CC-BY / CC-BY-SA** | ✅ 商用 OK (需 attribution) | ⭐⭐ 非洲 / 多元文化兒童故事池, Pickup 「其他 10%」候選 (非洲故事章) | 看 Anansi 蜘蛛故事 / 非洲動物寓言 |
| 3 | **African Storybook** | https://africanstorybook.org | 多語兒童故事 (11+ 南非官方語) | **CC-BY** | ✅ 商用 OK | ⭐⭐ Pickup 「其他」分項候選 — Anansi 等 trickster animal fable 跟 Aesop 同 grain | Y2-3 非洲動物寓言章 |
| 4 | **Project Gutenberg Children's Bookshelf** | https://www.gutenberg.org/ebooks/bookshelf/216 | **78K+** PD ebooks 含童話子集 | **Public Domain** | ✅ 完全自由 (但去除 Gutenberg 標記要求) | ⭐⭐⭐ **金牌資產**. Grimm 全集 (30K downloads) / Andersen / Aesop / Mother Goose 全套. Pickup 主要 IP 池 | Pickup 7/9 shipped chapter 已用此 PD 池, 21 candidate 主幹來源 |
| 5 | **Internet Archive PD Books** | https://archive.org/details/public-domain | 數百萬 PD scanned books 含童書 | **Mixed PD + CC**, 查 record `NOT_IN_COPYRIGHT` | ✅ 商用 (需查 per-item) | ⭐⭐ 老 illustrations 視覺 reference 寶庫 (1900-1929 PD 插畫) | Pickup 視覺風格 reference (Beatrix Potter pre-1929 / Arthur Rackham fairy tale illustrations) |
| 6 | **Wikisource (Children's Lit portal)** | https://en.wikisource.org/wiki/Portal:Children's_literature | Perrault / Kipling / E. Nesbit / Frank Baum 等 | **Public Domain** | ✅ 商用 OK | ⭐⭐ Pickup 引文 / quote 核對 source-of-truth, Kipling Just So Stories 全文 | Ch5 駱駝駝峰 (Kipling 1902) 原文核對 + 「O Best Beloved」voice reference |
| 7 | **LibriVox (audio public domain)** | https://librivox.org | 1500+ PD 有聲書 | **Public Domain** (audio 也 PD) | ✅ 商用 OK 完全免授權 | ⭐ Pickup 用 OpenAI TTS 已 ship, 不需 LibriVox 音檔; 但 narration voice / pacing reference 用得上 | 不直接 ship 但作 voice direction reference |
| 8 | **Smithsonian Open Access** | https://www.si.edu/openaccess | 2.8M CC0 images + data | **CC0** (完全公有) | ✅ 商用零負擔零 attribution | ⭐⭐ 視覺輔助 (動物 illustration / 文化器物 / 自然圖) — Pickup Ch4 龜兔 / Ch5 駱駝 / Ch3 醜小鴨 場景 reference | Y2 場景 art reference + Mochi 宇宙 background detail |
| 9 | **ManyBooks** | https://manybooks.net | ~33K PD ebooks (鏡像 Gutenberg + Internet Archive) | **Public Domain** | ✅ 商用 | ⭐ Gutenberg substitute, 沒新增資產 | 備援 |
| 10 | **Storyberries (caveat)** | https://www.storyberries.com | Mostly proprietary, only Book Dash + StoryWeaver subset is CC | **Mixed** — original stories 是 copyrighted, only re-host Book Dash + SW = CC | ❌ Original story 禁商用; 只能用 hosted Book Dash / SW 子集 | ❌ 直接跳過, 上 Book Dash + StoryWeaver 本店即可 | 不建議使用 |

### D2. 建議使用順序 (Pickup Y1-Y2)

1. **Y1 主幹**: Project Gutenberg + Wikisource (已用) — 9 shipped + 21 candidate 全部 PD source
2. **Y2 中華擴張**: registry 中華 5 候選 (嫦娥 / 后羿 / 牛郎 / 孟姜女 / 白蛇 / 木蘭) 全 PD (民間故事 + 段成式 + 北朝民歌), 用 Wikisource 中文版 + 教育部數位典藏 (見 F2) 引文
3. **Y2 日韓擴張**: 日韓童話 (一寸法師 / 浦島太郎 等) 全 PD, 用 Aozora Bunko (青空文庫, 日本 Wikisource 對應) + 韓國 Wikisource
4. **Y2-3 「其他 10%」擴張**: **StoryWeaver CC-BY** 是金牌 — 印度 Panchatantra / 中亞 / 非洲動物寓言均可直接改編商用
5. **視覺 reference**: Smithsonian CC0 (動物 / 文化器物) + Internet Archive pre-1929 PD illustrations (Beatrix Potter / Rackham 風)
6. **Audio reference (not direct use)**: LibriVox 跟 OpenAI TTS 比已落後, 不 ship 直接用

---

## E. Public Domain Confirm Checklist (Pickup 可用 IP)

### E1. 核心 PD 規則 (2026 適用)

| 規則 | 適用 |
|------|------|
| **美國 PD 規則**: 1929 年 1 月 1 日前出版的作品 = PD (Public Domain Day 2025 起) | 所有 pre-1929 出版 |
| **歐盟 PD 規則**: 作者死後 70 年 = PD | 多數歐洲作家 |
| **作者死後 100 年 = global PD 普遍適用** | Andersen / Grimm / Perrault / Pushkin / Kipling 全過關 |
| **民間故事 / 神話**: 永遠 PD (no single author) | 中華神話 / 日本民間 / 韓國民間 / 中東 1001 Nights 等 |
| **Translation copyright**: 譯本可能仍受保護! 必須用「Pre-1929 published English translation」 OR「Project Gutenberg / Wikisource hosted PD translation」 | ⚠️ 重要 |

### E2. Pickup 30 章 IP 公有領域逐條 checklist

| 故事 | Author | Origin Year | US PD 狀態 | Pickup 章 | Notes |
|------|--------|------------|-----------|----------|-------|
| **桃太郎** | Japanese folktale | Edo (1603-1868) | ✅ PD always (民間) | Ch2 shipped | 用 Project Gutenberg 1908 Yei Theodora Ozaki 英譯 = PD |
| **醜小鴨** | Andersen | 1843 | ✅ PD | Ch3 shipped | 用 pre-1929 English translation (e.g. 1872 H.W. Dulcken) |
| **龜兔賽跑** | Aesop | ~600 BCE | ✅ PD always | Ch4 shipped | 任何 PD 譯本 |
| **駱駝駝峰** | Kipling | 1902 (Just So Stories) | ✅ PD US (pre-1929) | Ch5 shipped | Wikisource hosted Just So Stories 全文 |
| **Baba Yaga** | Russian folklore | pre-19c, written by Afanasyev 1855-1863 | ✅ PD (民間 + author 死 >100 年) | Ch6 shipped | |
| **六隻天鵝** | Grimm KHM 49 | 1812 | ✅ PD | Ch7 shipped | Grimm 1857 7th edition Wikisource |
| **葉限** | Tang 段成式 酉陽雜俎 | ~860 AD | ✅ PD always (1100+ 年) | Ch8 shipped | 中文文言文 PD; 英譯 1947 Arthur Waley 已 PD (作者 1966 死, but 1947 pre-1929 doesn't apply — 用 Pickup 自己譯) |
| **三隻小豬** | Joseph Jacobs | 1890 | ✅ PD US (pre-1929) | Ch9 shipped | |
| **Cinderella** | Perrault | 1697 | ✅ PD (Perrault 1703 死) | Ch10 shipped | ⚠️ **Disney 1950 NOT PD**. Pickup 必用 Perrault 1697 OR Grimm 1812 版本, 不寫南瓜馬車神仙教母 Disney 特徵元素 |
| 嫦娥奔月 | 中華 民間 (漢) | ~ pre-1c BCE | ✅ PD always | candidate | |
| 后羿射日 | 中華 民間 | pre-1c BCE | ✅ PD always | candidate | |
| 牛郎織女 | 中華 民間 (七夕) | Han origin | ✅ PD always | candidate | |
| 孟姜女 | 中華 民間 (秦) | pre-Han | ✅ PD always | candidate | |
| 白蛇傳 | 中華 民間 (Ming/Qing 寫定) | 1700s | ✅ PD (350+ 年) | candidate | |
| 小紅帽 | Grimm KHM 26 | 1812 | ✅ PD | candidate | |
| 白雪公主 | Grimm KHM 53 | 1812 (pre-Disney) | ✅ PD (Grimm 版本) | candidate | ⚠️ Disney 1937 NOT PD; 必用 Grimm 原版 |
| Hansel & Gretel | Grimm KHM 15 | 1812 | ✅ PD | candidate | |
| 豌豆公主 | Andersen | 1835 | ✅ PD | candidate | |
| 小美人魚 | Andersen | 1837 (pre-Disney) | ✅ PD (Andersen 版本) | candidate | ⚠️ Disney 1989 NOT PD; 必用 Andersen 原版「化為泡沫」結局, 不寫紅髮 Ariel |
| 螞蟻與蚱蜢 | Aesop | ~600 BCE | ✅ PD always | candidate | |
| 狐狸與葡萄 | Aesop | ~600 BCE | ✅ PD always | candidate | |
| 烏鴉與狐狸 | Aesop | ~600 BCE | ✅ PD always | candidate | |
| 狼來了 | Aesop | ~600 BCE | ✅ PD always | candidate | |
| 花木蘭 | 中華 北朝民歌 木蘭辭 | ~4-6c AD | ✅ PD always (1500+ 年) | candidate | ⚠️ Disney 1998 + 2020 NOT PD; 必用「木蘭辭」原版, 不用 Mushu / Cri-Kee Disney 元素 |
| Ali Baba | 1001 Nights, Antoine Galland 1717 法譯 | 1717 | ✅ PD (300+ 年) | candidate | |
| Aladdin | 1001 Nights, Galland 1710s | 1710s | ✅ PD (300+ 年) | candidate | ⚠️ Disney 1992 NOT PD; 必用 Galland 版本, 神燈是中國風 (Galland 版本如此!), 不用 Disney 阿拉伯沙漠 |
| Jack & the Beanstalk | Joseph Jacobs | 1890 | ✅ PD US | candidate | |
| 三隻山羊 (Three Billy Goats Gruff) | Asbjornsen & Moe (Norwegian) | 1841 | ✅ PD | candidate | |
| Gingerbread Man | St. Nicholas Magazine | 1875 | ✅ PD | candidate | |
| 城市鼠與鄉村鼠 | Aesop | ~600 BCE | ✅ PD always | candidate | |

### E3. ⚠️ 公有領域陷阱 (Pickup 必避)

| IP | Pre-modern PD? | 為何陷阱? | Pickup 規則 |
|----|--------------|----------|------------|
| Cinderella | ✅ Perrault 1697 PD | Disney 1950 仍 copyright | 寫 Perrault 版本: 南瓜→金馬車元素 OK (Perrault 原版有), 神仙教母 OK; **不能用 Disney 老鼠角色 / 特定造型** |
| Snow White | ✅ Grimm 1812 PD | Disney 1937 仍 copyright; 7 dwarfs 名字 (Doc / Grumpy / 等) 是 Disney 原創 NOT in Grimm | 用 Grimm 原版: 7 dwarfs 無名 / 後媽逼公主吃毒蘋果 OK; 禁用 Disney dwarfs 名字 |
| Little Mermaid | ✅ Andersen 1837 PD | Disney 1989 仍 copyright; Ariel 紅髮 + Sebastian 螃蟹 = Disney | 用 Andersen 原版 (公主化為海泡沫的悲劇結局), 禁紅髮 / 螃蟹角色 |
| Aladdin | ✅ Galland 1710s PD | Disney 1992 + 2019 仍 copyright | 用原版「中國風」造型 (Galland 原版設定在中國!), 禁阿拉伯 / Genie 藍色造型 |
| Mulan | ✅ 木蘭辭 PD | Disney 1998 + 2020 仍 copyright | 用木蘭辭原版 (戰場代父從軍), 禁 Mushu 小龍 / Cri-Kee 蟋蟀 / 「I'll Make a Man Out of You」歌 |
| Peter Rabbit | ✅ 1902 PD US, 但 ⚠️ **post-1928 Potter works (e.g. Little Pig Robinson 1930) NOT PD US 仍受保護** | 後期作品 + 「Peter Rabbit」trademark 仍存在 | Pickup 若用 Peter Rabbit, 只用 1902 The Tale of Peter Rabbit, **避免「Peter Rabbit」trademark 衝突** — 改名「Mr. Bunny」或自創角色 |
| Pushkin | ✅ Pushkin 1837 死 PD | 譯本可能仍 copyright | 用 pre-1929 PD English translation |
| Anderson + Grimm + Perrault 譯本 | ✅ Author PD | ⚠️ 譯本 copyright! | 必用 Project Gutenberg / Wikisource hosted PD translation 或 Pickup 自譯 |

### E4. ⚠️ Pickup 絕不使用的 IP (太貴 / 太風險)

- Disney 全 catalog (Cinderella / Snow White / Little Mermaid / Aladdin / Mulan / 小美人魚 — 用其底層 PD source 是 OK 的, 但**不可用 Disney 特有角色 / 名字 / 造型 / 歌**)
- Pixar (Toy Story / Finding Nemo / Inside Out 全 copyright)
- Sanrio (Hello Kitty / 三麗鷗 全 trademark)
- Studio Ghibli (Totoro / 千尋 全 copyright — 注意美學風格 reference 是 OK, 但角色 100% 禁)
- Universal / Warner / Nickelodeon (Dora / SpongeBob / Paw Patrol 等全 copyright)
- 現代作家 (Eric Carle 「The Very Hungry Caterpillar」 / Beatrix Potter post-1928 作品 / Maurice Sendak 等)

---

## F. 便宜 IP 授權路徑 + Cost Estimate

### F1. Independent Illustrators (Etsy / DeviantArt / Fiverr 視覺)

| 路徑 | 平台 | 單張 cost | Commercial license | Pickup 適用 |
|------|------|-----------|-------------------|-----------|
| **Fiverr 兒童書插畫** | Fiverr | Basic $76 / Premium $185 / Commercial +25-100% | 需明確購買 "Commercial Use" gig | ⭐⭐⭐ 主推 — 補 Mochi 宇宙場景 / candidate 章節 cover art |
| **單 character design** | Fiverr | $50-150 | 需議定 | ⭐⭐ 主角額外姿勢補 (Mochi 跳牆 / Hana 搖尾 multi-pose) |
| **Spot illustrations 小插圖** | Fiverr | $25-75 | 多含 | ⭐⭐ UI 小裝飾 (chapter node icon, badge etc) |
| **Etsy clipart 包** | Etsy clipart shops | $5-15 全包 commercial OK | varies — 必看 license | ⭐ background pattern / 小裝飾, 不適主角 |
| **Creative Market 插畫包** | https://creativemarket.com | $20-80 包 | 通常 standard commercial OK | ⭐⭐ 風格 reference + 補 UI icon |
| **DeviantArt 個別 commission** | DeviantArt | $30-200 看 artist | 必議 | ⭐ 找特定風格 artist, 但 ROI 較碎 |

**Pickup 建議**:
- **Y1 主要視覺已 ship**: grandma + Hana + Mochi 主 PNG + POV scene PNG + 12 flat icons 已生 (CLAUDE.md v1.7.6-v1.9.41)
- **Y2 候補章節需求**: 每章 ~1 character + 1 cover scene = 2 art pieces × 12 章 = 24 pieces × $100 平均 = **~$2,400 art budget**
- **Multi-pose Mochi**: $50-100/pose × 6 expressions = $300-600
- **Etsy + Creative Market icon 包**: $50-100 全 covered

### F2. Self-published Authors via Amazon KDP — Pickup 不必走

User prompt 提「self-published authors 開放 $500-2K PA license」: 評估後 **不建議走**.

理由:
- Pickup 30 章 IP 已全 PD, 不需要付費 license
- KDP 作者多為現代 IP, 跟 Pickup 童話 anchor 風格不合
- $500-2K × 30 章 = $15K-60K, 跟「PD source 免費」相比是純損失
- **跳過**

### F3. 台灣本土繪本社 (信誼 / 親子天下 / 巴巴文化) 教育用授權

| 出版社 | 性質 | Pickup 授權路徑 | 估算 |
|--------|------|---------------|------|
| **信誼 (Hsin Yi)** | 早期教育主導 (1-6 歲, audio CDs) | 不發 license, 自家 app | ❌ 不可行 |
| **親子天下** | 「親子天下有聲故事書 APP」自家 | 不發 license, 直接競爭 | ❌ 不可行 |
| **巴巴文化** | 繪本出版 + 浙江少兒社合作 | 看個案, 可能可談 | 🟡 可能 $1-5K/title, ROI 不確定 |

**結論**: 跳過 — Pickup 走 PD path 更便宜更有 control. 若 Y3+ 需要本土合作, 走「親子天下推薦」品牌背書比授權內容好.

### F4. 中華傳統故事數位典藏 (台灣)

| 平台 | 內容 | 授權 | Pickup 用途 |
|------|------|------|-----------|
| **典藏台灣 (中研院)** | https://digitalarchives.tw/ | 圖像多 CC-BY-NC (非商用), 文字部分 PD (古籍類) | ⭐ 圖像 reference 用 (歷史器物 / 服飾), 但 NC 不可商用 |
| **TELDAP (數位典藏與數位學習)** | https://teldap.tw/ | 多元 license, 文字古籍類多 PD | ⭐ 中華神話 / 民間故事 textual reference |
| **教育學習資源** | https://digitalarchives.tw/learning.jsp | 部分教育用授權 | 🟡 看個案 |

**建議**: 用作 reference (查證古籍出處), 不直接 copy 圖像 (NC 限制). 已 cover 在 D table 中.

### F5. BBC Sounds / NHK 兒童節目 audio rights

- BBC: 嚴格保護 IP, 海外授權 minimum ~$5K-20K/episode, **過貴**, ❌ 跳過
- NHK: 日本 IP 保護同等嚴, 海外 dev 接不到, ❌ 跳過

→ Pickup audio 用 OpenAI TTS 已 ship 不需外購

### F6. Y2 總 art / IP 投資預算

| 項目 | Cost (USD) |
|------|-----------|
| 12 candidate 章節 art (cover + character) | ~$2,400 |
| Mochi multi-pose | ~$500 |
| Etsy / Creative Market icon | ~$100 |
| **Total Y2 art budget** | **~$3,000** |
| IP licensing | **$0** (全 PD path) |

**對比 vs 商用 license path**: 若 Pickup 走「跟 Disney / Pixar / Sanrio 授權」route, 30 章 × $50K-500K/title = 數百萬美金, 創業期不可行. PD 路徑是創業期唯一可行解.

---

## G. 結論 — Y1 ship 30 章 + Y2 ship 30+ 章, 怎麼分批?

### G1. 現況

- **Y1 (2026 H1)**: 9 shipped (Ch1-10 含 Cinderella) + Ch1 ~110 Q + Ch2-8 ~1100 Q 已 ship (CLAUDE.md v2.0.B.118-159)
- **Y1 (2026 H2 即將)**: 21 candidate 在 registry, 但 narration / MP3 / canon 0

### G2. 30 章 → 60 章 分批策略

對齊 Bear 分佈 35/40/15/10 + ROI #1-3 市場 (北美 heritage / 台灣 / SEA):

#### Y1 H2 (2026-08 to 2026-12) — Ship 12 章達 22 章累計, 補中華 + 日韓 / SEA 缺口

| Quarter | 章節 | 文化 | 對位市場 | Rationale |
|---------|------|------|---------|-----------|
| Q3 (2026-Q3) | 牛郎織女 (七夕對位) + 嫦娥奔月 (中秋對位) | 中華 +2 | A1 heritage + A2 台灣 + A3 SEA | **節氣對位 → 推播 trigger 絕佳** |
| Q3 | 小紅帽 + Hansel & Gretel | 歐美 +2 (Grimm 兩篇) | A2 台灣 + A4 日韓 | Grimm mainstream, 必補 |
| Q4 (2026-Q4) | 木蘭 + 后羿射日 | 中華 +2 | A1 + A2 + A5 (美國學中文) | 木蘭對 immersion school 家長強訴求 |
| Q4 | 一寸法師 (日本) + 鶴の恩返し (日本) | 日韓 +2 (新加 registry) | A4 日本 | **解日韓 under-index 缺口** |
| 2027-Q1 | Aladdin + 小美人魚 | 其他 / 歐美 +2 | A1 + A2 | 1001 Nights + Andersen 各補一篇 |
| 2027-Q1 | 螞蟻蚱蜢 + 狐狸葡萄 (Aesop 短篇 each 章 5-8 lessons) | 歐美 +2 | 全 | Aesop quick win, 工時最低 |

**Y1 H2 累計 = 21 章 ship**, 文化分佈接近 35/40/15/10 (中華 ~28%, 歐美 ~50%, 日韓 ~10%, 其他 ~12%).

#### Y2 (2027) — Ship 30+ 章, 達 50+ 章累計

| Quarter | 章節 | 文化 | 對位市場 |
|---------|------|------|---------|
| Y2 Q1 | 孟姜女 + 白蛇 (中華擴) | 中華 +2 | A1 + A2 |
| Y2 Q1 | 浦島太郎 + 興夫与孬夫 (韓國) | 日韓 +2 (新加 registry) | A4 |
| Y2 Q2 | 白雪公主 + 豌豆公主 | 歐美 +2 | 全 |
| Y2 Q2 | 牧羊人與狼 + 烏鴉狐狸 + 城市鼠 | 歐美 (Aesop) +3 | quick win |
| Y2 Q3 | Sang Kancil (馬來) + 花神 (越南) + 蜘蛛 Anansi (非洲) | 其他 +3 | A3 SEA + 「其他」充值 |
| Y2 Q3 | Panchatantra (印度 4 篇, **StoryWeaver CC-BY 改編**) | 其他 +4 | A3 SEA Indian diaspora |
| Y2 Q4 | Pushkin 漁夫與妻 + 金雞冠 | 其他 (russia) +2 | A1 + A4 |
| Y2 Q4 | Three Billy Goats + Jack & Beanstalk + Gingerbread Man + Boy Cried Wolf | 歐美 +4 | quick win |

**Y2 累計 = 22+ 新章 → ship 總 43-50 章**. Bear 分佈最終接近 35/40/15/10 目標.

### G3. Ship 順序設計原則 (內化到 registry suggestNextToShip 演算法)

1. **節氣對位優先** (七夕 / 中秋 / 端午 / 復活節 / 萬聖節) → 推播 trigger 自然
2. **Cross-cultural pair 優先** (葉限 ↔ Cinderella 已對位; 木蘭 ↔ 白雪公主 / 嫦娥 ↔ 小美人魚 already in `pairedWith`)
3. **缺口優先** (日韓 / SEA / 其他 under-index 補)
4. **Aesop 短篇** 是 Q-end quick win (8 lessons 1 章, 1-2 週可 ship)
5. **CC-BY 改編 (StoryWeaver / Book Dash) Y2 後期才碰** — 因為 attribution overhead + Pickup canon voice 已熟

### G4. Year-3+ stretch (不在本 doc 範圍)

- 日本 / 韓國正式本地化 (UI + voice)
- 中國本土 (素質教育類, 雙減後新窗口)
- B2B 教育機構採購 (台灣補習班 / 北美 immersion school)

---

## H. Sources (30+ URLs)

### Market research (Section A + B)

1. Global English Learning Apps for Kids Market — Verified Market Reports — https://www.verifiedmarketreports.com/product/english-learning-apps-for-kids-market/
2. English Language Learning Market 2026 — Global Growth Insights — https://www.globalgrowthinsights.com/market-reports/english-language-learning-market-102194
3. Language Learning App Market — Market.us (CAGR 14.40%) — https://market.us/report/language-learning-app-market/
4. English Learning Apps for Kids Market Booming — EIN Presswire — https://www.einpresswire.com/article/695319546/english-learning-apps-for-kids-market-is-booming-worldwide
5. Taiwan Education and Training Services Snapshot — US Trade.gov — https://www.trade.gov/country-commercial-guides/taiwan-education-and-training-services-industry-snapshot
6. HoloniQ — Chinese Language Learning ($7.4B market) — https://www.holoniq.com/notes/chinese-language-learning-a-7-4b-market-powered-by-over-6-million-learners-set-to-double-in-the-next-five-years
7. Xuelin Learning Hub — Singapore Chinese apps for kids — https://xuelinlearninghub.com.sg/blogs/10-must-have-chinese-learning-apps-for-kids-in-singapore/
8. Language Ecology and Application — SEA Chinese heritage (passive bilingualism) — https://system.wisacad-pub.com/index.php/lea/article/download/164/61
9. Technavio — China English Language Training Market 2026-2030 — https://www.technavio.com/report/english-language-training-market-in-china-industry-analysis
10. ICEF Monitor — VIPKid gives up China stake 2021 — https://monitor.icef.com/2021/11/edtech-giant-vipkid-gives-up-its-massive-stake-in-china/
11. Sage Journals — Double Reduction Policy 2026 — https://journals.sagepub.com/doi/10.1177/20965311241265123
12. Baiguan — China after-school tutoring investment opportunities — https://www.baiguan.news/p/investment-opportunities-china-after-school-tutoring-edu-tal-new-era
13. Chairman's Bao — US Mandarin Immersion Schools list — https://www.thechairmansbao.com/blog/chinese-immersion-schools-us/
14. Mandarin Immersion Parents Council — US schools list — https://miparentscouncil.org/full-mandarin-immersion-school-list/
15. SF Standard — Private Chinese bilingual education thrives 2024 — https://sfstandard.com/2024/09/09/private-chinese-mandarin-schools-san-francisco/

### ARPU / Pricing (Section A2-A4)

16. Duolingo Family Plan 2026 Cost — Daily Excelsior — https://www.dailyexcelsior.com/duolingo-family-plan-2026-what-it-really-costs-features-and-smarter-deals/
17. Duolingo Pricing 2026 — LanguageAppGuide — https://languageappguide.com/pricing/duolingo-cost/
18. Khan Academy revenue & business model 2026 — FourWeekMBA — https://fourweekmba.com/how-does-khan-academy-make-money/
19. Khan Academy statistics — ElectroIQ — https://electroiq.com/stats/khan-academy-statistics/
20. Lingokids Plus pricing $14.99 — Help.lingokids — https://help.lingokids.com/hc/en-us/articles/115005120505-Lingokids-Plus-Pricing-Currency

### CAC / LTV (Section A)

21. Facebook Ads Cost 2026 Guide — Stackmatix — https://www.stackmatix.com/blog/facebook-ads-cost-complete-guide
22. Meta Ads Benchmarks 2026 by industry — Get-Ryze — https://www.get-ryze.ai/blog/meta-ads-cost-benchmarks-by-industry-2026
23. Customer Acquisition Cost Benchmarks 2026 — Userpilot — https://userpilot.com/blog/average-customer-acquisition-cost/
24. CAC by Channel 2026 — First Page Sage — https://firstpagesage.com/marketing/cac-by-channel-fc/
25. App User Acquisition Costs 2025 — Business of Apps — https://www.businessofapps.com/marketplace/user-acquisition/research/user-acquisition-costs/

### COPPA / App Store kids (Section A1 + A5)

26. Apple App Review Guidelines (Kids) — Apple Developer — https://developer.apple.com/app-store/review/guidelines/
27. iubenda — Apple Privacy + COPPA — https://www.iubenda.com/en/blog/coppa-privacy-policy-apps-ios/
28. MetaRouter — Children's app regulations 2026 — https://www.metarouter.io/post/navigating-new-regulations-for-childrens-apps

### Heritage research (Section A1)

29. PMC — Heritage Language Socialization Chinese American Families — https://pmc.ncbi.nlm.nih.gov/articles/PMC7597852/
30. Tandfonline — Chinese heritage language Bilingual Education — https://www.tandfonline.com/doi/abs/10.1080/13670050.2018.1547680
31. Mama Baby Mandarin — Best Chinese learning app — https://www.mamababymandarin.com/best-app-to-learn-chinese/
32. Chalk Academy — Chinese apps for kids — https://chalkacademy.com/chinese-apps-kids/

### CC / PD resources (Section D + E)

33. StoryWeaver Pratham Books — Open Content CC-BY 4.0 — https://storyweaver.org.in/en/open-content
34. Pratham Books — Creative Commons — https://prathambooks.org/cc/
35. Free Kids Books — License (CC + PD) — https://freekidsbooks.org/license/
36. Book Dash — Volunteer-created CC-BY children's books — https://bookdash.org/
37. Storyberries — Permissions FAQ (caveat: mostly proprietary) — https://www.storyberries.com/permissions-faqs/
38. Project Gutenberg — Children's Myths Fairy Tales Bookshelf — https://www.gutenberg.org/ebooks/bookshelf/216
39. Project Gutenberg — Grimms' Fairy Tales (30K downloads) — https://www.gutenberg.org/ebooks/2591
40. LibriVox — Copyright and Public Domain — https://wiki.librivox.org/index.php/Copyright_and_Public_Domain
41. LibriVox — Public Domain — https://librivox.org/pages/public-domain/
42. Smithsonian — Open Access FAQ (CC0) — https://www.si.edu/openaccess/faq
43. Creative Commons — Smithsonian Releases 2.8M Images CC0 — https://creativecommons.org/2020/02/27/smithsonian-releases-2-8-million-images-data-into-the-public-domain-using-cc0/
44. Wikisource — Children's Literature portal — https://en.wikisource.org/wiki/Portal:Children's_literature
45. Wikisource — Just So Stories (Kipling 1902) — https://en.wikisource.org/wiki/Just_So_Stories
46. Internet Archive — Public Domain collection — https://archive.org/details/public-domain
47. NYIT LibGuide — Books Public Domain & Creative Commons — https://libguides.nyit.edu/c.php?g=61923&p=398880

### PD copyright rules (Section E)

48. Duke Center for Public Domain — Public Domain Day 2025 (1929 works) — https://web.law.duke.edu/cspd/publicdomainday/2025/
49. Library of Congress — Lifecycle of Copyright 1929 PD — https://blogs.loc.gov/copyright/2025/01/lifecycle-of-copyright-1929-works-in-the-public-domain/
50. Wikipedia — Public Domain in the United States — https://en.wikipedia.org/wiki/Public_domain_in_the_United_States
51. KLM Inc — Peter Rabbit Loses Copyright (1902 PD US) — https://klminc.com/intellectual-property/peter-rabbit-loses-copyright-protection
52. The Public Domain Review — Tale of Beatrix Potter — https://publicdomainreview.org/essay/the-tale-of-beatrix-potter
53. Marketing Artfully — Public Domain Stories list — https://marketingartfully.com/huge-list-of-public-domain-stories/
54. Aesopfables.com — Copyright notice (Aesop PD) — https://aesopfables.com/acopyrt.html
55. Nixie und Mina — Brothers Grimm PD commercial use OK — https://nixieundmina.com/brothers-grimm-fairy-tales-public-domain/
56. Cambridge Network — Rethinking China's education market — https://www.cambridgenetwork.co.uk/news/rethinking-chinas-education-market

### Licensing path (Section F)

57. Fiverr — Children's Book Illustrator Rates — https://www.fiverr.com/resources/guides/costs/childrens-book-illustrator
58. Fiverr — Commercial Use license details — https://help.fiverr.com/hc/en-us/articles/360011569298--For-Commercial-Use-license-details
59. 信誼小太陽 Hsin Yi (Taiwan publisher) — https://www.hsinyishop.com/
60. 親子天下 Common Wealth Education — https://tw.linkedin.com/company/親子天下股份有限公司
61. 巴巴文化 Baba Culture — https://booksfrompapa.com/
62. 典藏台灣 Taiwan Digital Archives — https://digitalarchives.tw/
63. TELDAP (Taiwan e-Learning + Digital Archives) — https://teldap.tw/

---

*Authored 2026-06-07 by Pickup market research session (Opus 4.7). 約 720 lines. Cross-references: `CLAUDE.md` v2.0.B.161 / `docs/strategy/2026-06-05-target-audience-realignment.md` / `src/data/storyRegistry.ts` v2.0.B.238 (30 entries).*
