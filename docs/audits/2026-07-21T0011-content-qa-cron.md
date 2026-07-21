# Content QA — 2026-07-21 00:11 UTC

**Today's angle:** A5 — Cultural Reference (accuracy, cross-cultural teaching moments, vocabulary coverage, origin attribution)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Ye Xian / Three Little Pigs)
**Scored questions analysed:** 685 non-narration entries across Ch1–8 (87/84/94/89/83/89/84/75 per chapter)

---

## A. validate-lessons.js result

```
Ch1: 17 lint issues (X2 ×3, X49/X49B ×10, X57 ×4)
Ch2: 10 lint issues (X2 ×2, X49/X49B ×5, X57 ×3)
Ch3: 19 lint issues (X2 ×8, X49/X49B ×8, X57 ×3)
Ch4: 10 lint issues (X2 ×1, X49/X49B ×9)
Ch5: 10 lint issues (X2 ×2, X3 ×1, X49/X49B ×5, X57 ×2)
Ch6: 13 lint issues (X2 ×2, X48 ×1, X49/X49B ×8, X57 — via X48 note)
Ch7: 13 lint issues (X2 ×2, X48 ×1, X49/X49B ×10)
Ch8:  9 lint issues (X2 ×2, X48 ×2, X49/X49B ×4, X57 ×1)
Total mirror-lint (all chapters): 440 (warn-only)
```

Build: PASS (tsc + vite — no new regressions from this angle)

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 4 | kt-ch4-l5-q6 | listen-mc | "He spoke about a friend who would not lift his share." | **C5b-P0** — 干擾項 "the Djinn himself" 出現，但此題 explanationZh 未重述 Djinn = 精靈。距離 Djinn 第一次被介紹（L4）已隔一課，孩子可能忘記 | explanationZh 末尾補：「（Djinn 就是故事裡那位有魔法的精靈 ✨）」 | No |
| 4 | kt-ch4-l7-x1 | comprehension | "He said, 'That hump is what you brought upon yourself.'" | **C5b-P0** — 干擾項 "Man asked the Djinn to add it"，解釋 ZH 完全沒提 Djinn，兩課後無重錨。孩子無法評估此選項是否合理 | explanationZh 補：「（Djinn 是那位用魔法給駱駝加上駝峰的精靈——但故事說是駱駝自找的，不是 Man 叫精靈加的喔）」 | No |
| 4 | kt-ch4-l7-x6 | comprehension | "He still has that hump today, my dear, so he will never forget." | **C5b-P0** — 干擾項 "the Djinn could not remove it"，explanationZh 只說駝峰是提醒，未解釋為何 Djinn 無法移除選項是錯的 | explanationZh 補：「（不是精靈移不掉——故事說駱駝帶著它是為了永遠記得教訓）」 | No |
| 7 | kt-ch7 全章 | (所有題型) | 葉限故事共 84 題 | **C11-P0 — 缺葉限 vs 灰姑娘跨文化教學點**：全章 0 題 / 0 條 explanationZh 提到「葉限比西方灰姑娘早 700 年」或「金鞋 vs 玻璃鞋」。台灣 8–12 歲幾乎都知道西方 Cinderella，這是全書最高密度的跨文化 aha 時刻，完全缺席 | 在 kt-ch7-l6（金鞋落地課）或 kt-ch7-l7（複習課）任一 comprehension 的 explanationZh 末尾補：「（葉限的故事寫於西元 9 世紀，比法國灰姑娘早了整整 700 年！而且她的鞋是金的，不是玻璃的 👠）」 | No |
| 6 | kt-ch6-l4-q6 | listen-mc | "To set them free, she had to sew six shirts from a sharp white flower." | **C11b-P1 — "sharp white flower" = 蕁麻（stinging nettle）未命名**：explanationZh 只說「用花縫衣服」，沒說那是碰了手會刺痛的蕁麻。缺此細節，孩子不理解「六年沉默 + 雙手刺痛」的雙重犧牲 | explanationZh 補：「那種尖白花叫做蕁麻（nettle）——碰了手會刺痛！王后用手直接縫，一縫就是六年，這才是最難的考驗。」 | No |
| 6 | kt-ch6 全章 | 所有題型 | 六隻天鵝故事共 89 題 | **C8b-P1 — 缺格林兄弟 / 德國出處**：全章無一題或 explanationZh 提及 Brothers Grimm 或德國民間故事起源。相較 Ch5（俄羅斯 Baba Yaga 多次文化說明）、Ch7（中國 9 世紀）對照明顯空白 | 在 kt-ch6-l1（第一課）任一 explanationZh 補：「六隻天鵝是德國格林兄弟（Brothers Grimm）收集的故事——跟白雪公主、睡美人是同一本書裡的！」 | No |
| 1 | kt-ch1-l7-x2 | comprehension | "Side by side, they pushed the demons back into the corners." | **C11c-P1 — 干擾項 "powerful magic from the peach" 文化誤導**：桃子在桃太郎故事裡是誕生容器（vessel of birth），不是魔法力量的來源（力量來源是黍米糰子 + 夥伴聯盟）。選項暗示「桃子有魔法」是文化誤解，但 explanationZh 只說靠團隊合作，未澄清為何「桃子魔法」是錯誤理解 | explanationZh 補：「（桃子是桃太郎誕生的容器，不是魔法武器——真正的力量來自他和夥伴們一起並肩作戰！）」 | No |
| 5 | kt-ch5-l4-x1 | phrase-pairs | "Match the words from tonight's story." | **C9-P2 — 詞彙配對 explanationZh 使用「詞彙」教科書語氣**：「今晚出現的特別詞彙，配對記一記！」— 缺奶奶敘事聲音 | 改為：「奶奶說：這些字今晚很重要，先配對記住，故事更好聽！」 | No |
| 5 | kt-ch5-l6-x1 | phrase-pairs | "Match the words from tonight's story." | **C9-P2 — 同上**：「今晚的詞彙，配對看看！」 | 改為：「奶奶的詞彙配對——試試看！」 | No |
| 6 | kt-ch6-l3-x1 | phrase-pairs | "Match the words from tonight's story." | **C9-P2 — 同上**：「今晚最特別的詞彙就是這些！配對記一記！」 | 改為：「奶奶說：這些字很特別，來配對看看！」 | No |

---

## C. Stats

| 維度 | 數量 |
|------|------|
| 掃描章節 | Ch1–8（共 8 章） |
| 掃描題目 | 685 非旁白題 |
| C5b Djinn 無重錨 | 3 題（P0） |
| C11 跨文化教學點缺失 | 2 個章級缺口（P0/P1） |
| C11b/c 細節文化誤導 | 2 題（P1） |
| C8b 文化出處缺失 | 1 章（P1） |
| C9 教科書語氣 | 3 題（P2） |
| validate-lessons 新增問題 | 0（本角度無新 X-code） |
| 誤判率（C3 magic 跨故事）| 19 條 → 全部確認為誤判（magic 是通用詞非 Ch4 專屬標記） |

**文化覆蓋亮點（整體品質好的地方，供參考）：**
- Ch5 Baba Yaga: 4 條 explanationZh 有詳細俄羅斯民俗背景注釋 ✅（L4-lg2 雞腳屋、L5-q7 俄羅斯最有名老巫婆、L6-x2 叫「奶奶」的策略、L7-q7 骷髏護身符）
- Ch7 Ye Xian: 2 條 explanationZh 有中國傳統文化注釋 ✅（L4-lg2 靈界存在腳不碰地、L7-x7 天降飛石天道好還）
- Ch1 Momotaro: 桃子 birth origin、名字語源（Momo = 桃，taro = 男孩）有交代 ✅

---

## D. Top 5 P0

1. ⚠️ **kt-ch4-l5-q6** — C5b: Djinn 干擾項無重錨 | Ch4 L5 listen-mc | 孩子 3 課後可能已忘 Djinn = 精靈，干擾項成為不可評估選項
2. ⚠️ **kt-ch4-l7-x1** — C5b: Djinn 干擾項無重錨（最後課）| Ch4 L7 comprehension | 距 Djinn 初次介紹最遠（3 課），且選項邏輯需文化知識才能否決
3. ⚠️ **kt-ch4-l7-x6** — C5b: Djinn 干擾項無重錨（最後課）| Ch4 L7 comprehension | 同上
4. ⚠️ **kt-ch7 全章 — 缺葉限 vs 灰姑娘跨文化對比** | 84 題 0 條跨文化說明 | 台灣兒童最熟悉西方灰姑娘，兩者對比是本書最高密度文化 aha 時刻，完全缺席
5. ⚠️ **kt-ch6-l4-q6 — "sharp white flower" 未說明為蕁麻** | 六隻天鵝核心犧牲場景 | 缺此細節孩子不理解雙重犧牲（沉默 + 刺痛）的深度

---

## 🎯 Narrative voice / pacing improvement proposals (無違規亦提出，per cron 規範)

1. **Ch4 L4 Djinn 登場旁白後加文化錨點**：kt-ch4-l4-x1 ("the dust opened and a Djinn stepped out") explanationZh 目前說精靈聽完委屈、準備找駱駝。可補：「（Djinn 是阿拉伯古代故事裡的精靈——像《一千零一夜》裡從燈裡出來的那種，但這位是住在沙漠裡的！）」— 讓孩子把 Djinn 跟已有的文化圖像掛上鉤。

2. **Ch2 Ugly Duckling L1 旁白缺出處**：Ch2 全章無一處說明這是「安徒生」（Hans Christian Andersen）的故事，或它是丹麥的。相較 Ch5 Baba Yaga 的俄羅斯注釋，醜小鴨的文化根基對孩子完全不透明。建議在 L1 新單字課的 intro narration 後 explanationZh 補一句。

3. **Ch3 Tortoise & Hare — 缺「Aesop 寓言」框架說明**：龜兔賽跑是最著名的 Aesop 寓言，但全章無一條 explanationZh 提 Aesop 或「希臘故事」。Ch4 Kipling、Ch5 Russian folklore 都有出處說明，Ch3 是明顯缺口。建議在 L7 複習課的 wrap-up 問題 explanationZh 加：「龜兔賽跑是 2,500 年前古希臘說書人伊索（Aesop）傳下來的故事——全世界都在說這個故事！」

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### 研究來源

| Source | URL | Relevance |
|--------|-----|-----------|
| FairytaleQA (Xu et al. 2022, ACL) | https://aclanthology.org/2022.acl-long.34/ | 7-element 兒童故事問題分類框架 |
| Frontiers Education: Multimedia + Cultural EFL (2026) | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1847943/full | 本地文化素材顯著提升 EFL 兒童理解與投入 |
| Schema Theory + EFL Reading (Lin 2025, Journal of Computer Assisted Learning) | https://onlinelibrary.wiley.com/doi/10.1111/jcal.70150 | 文化 schema 預啟動顯著提升 A2 兒童理解分數 |
| FairytaleQA GitHub dataset | https://github.com/uci-soe/FairytaleQAData | 7 narrative elements: Setting / Action / Feeling / Causal / Outcome / Prediction / Character |

### 分析

**FairytaleQA** 定義 7 種敘事元素問題類型，其中 **Setting（場景/文化背景）** 涵蓋故事發生的時間、地點、文化背景。FairytaleQA 資料集的 10,580 題中，約 12% 屬 Setting 類型。

**Pickup Ch1–8 現況**：685 道非旁白題，Setting 類型（文化起源、故事地域背景）= **0 題**（0%）。所有題目集中在 Action / Feeling / Causal / Outcome，完全沒有測試文化場景知識。

**Schema theory 2025 研究**發現：EFL 兒童在閱讀陌生文化故事前若能啟動文化 schema（例如「這是俄羅斯故事，有巫婆」），理解測試分數提升 18–24%（Lin, 2025）。Pickup 的 explanationZh 文化注釋（如 Ch5 Baba Yaga 的 4 條俄羅斯民俗說明）正是非正式 schema 啟動，但分布不均。

**Pickup 適配分析**：

| Pattern | 適配度 | 理由 |
|---------|--------|------|
| FairytaleQA Setting 題型 | ✅ 高 | React + JSON schema 可直接加 `"tags": ["cultural-setting"]`；不需新題型；只需在 listen-mc / comprehension 中增加 1 題/章，目標: Ch1–8 各至少 1 題 |
| Schema 預啟動 explanationZh 文化錨點 | ✅ 高 | 已有 5 個成功範例（Ch5/Ch7）；只需補齊 Ch1–4、Ch6、Ch8；無架構改動，純 JSON 增量 |
| FairytaleQA Prediction 題型 | 🟡 部分 | 8–12 歲兒童適合；但需新 question stem 格式；中期再做 |

### ARCH-REC #184: X184_CULTURAL_SETTING_ANCHOR

**Pattern**: FairytaleQA-style Cultural Setting Question（每章 1 題文化起源定錨）

**做法**:
1. 在 Ch1–8 各章 L1（新單字課）的 intro 或 L7（複習課）的 comprehension 加 1 道 `listen-mc` / `comprehension` 題
2. 題目測試故事的文化起源 / 地域，答對獲得文化 aha 時刻
3. JSON 加 `"tags": ["cultural-setting"]` 以利未來統計覆蓋率
4. explanationZh 用奶奶聲音交付文化知識（參考 Ch5-l5-q7 格式）

**各章缺口優先順序**:
```
Ch7 葉限 → 700 年 vs 灰姑娘 (P0 — 最高 aha 密度)
Ch6 六隻天鵝 → 格林兄弟 / 德國 (P1)
Ch2 醜小鴨 → 安徒生 / 丹麥 (P1)
Ch3 龜兔賽跑 → Aesop / 古希臘 (P1)
Ch4 駱駝駝峰 → Kipling / Just So Stories / 英國殖民時代印度 (P2)
Ch8 三隻小豬 → Joseph Jacobs 1890 / 英國 (P2)
Ch1 桃太郎 → 日本民間傳說 / 江戶時代普及 (P2)
Ch5 Baba Yaga → 已有充分文化注釋 ✅ (低優先) 
```

**Effort**: Low — 純 JSON 增量，每章 1 題 ≈ 8 個新 Q，不改 src/，不改 schema
**ROI**: High — 直接回應 FairytaleQA Setting 覆蓋缺口；對台灣 8–12 兒童 / 海外華人 heritage learner 來說，「原來葉限比灰姑娘早 700 年」是最強留存鉤子（retention hook）；免費差異化 vs 其他 EFL app

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| FairytaleQA Cultural-Setting Question (每章 1 題文化起源定錨) | https://aclanthology.org/2022.acl-long.34/ | ✅ 高：JSON 增量，不改 src | Low | High | ⭐ 推薦實作 — ARCH-REC #184 |
| Schema 預啟動 explanationZh 文化錨點補全 | https://onlinelibrary.wiley.com/doi/10.1111/jcal.70150 | ✅ 高：已有 5 成功範例，補齊 Ch2/3/6/8 | Very Low | High | ✅ 立即做（配合本次 P0 修法） |
| FairytaleQA Prediction 題型 | https://arxiv.org/abs/2203.13947 | 🟡 中：需新 stem 格式，8–12 適合 | Medium | Medium | 🗓️ 中期規劃 |
