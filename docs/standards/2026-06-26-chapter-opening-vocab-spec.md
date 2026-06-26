# 章節開場「預習新單字」規格 (Chapter-Opening Vocab Spec) — v1

> 2026-06-26 · 作者決定:「每章把重要的、沒學過的單字,在最前面兩個小節練習完;
> 再來是看圖選字 / 中英配對 / 重要常用文法題。」
> 本文是 content authoring 的 source of truth(新章節 / cron 出題 / 重排舊章 都依此)。
> 搭配 `docs/standards/2026-06-22-question-distribution-standard.md`(整章題型比例)。

---

## 0. 為什麼(學習弧線)

舊問題:玩家一進章節就直接撞故事 + 生字,沒先「認得」就要「聽懂/判斷」→ 挫折。
新弧線(對齊 Duolingo unit + TBLT Pre-task):**先預習關鍵新字 → 再進故事**。

```
L1  預習① 新單字 (中英配對 + 看圖選字)        ← recognition 先行
L2  預習② 新單字 (中英配對 + 看圖選字 + 1 文法) ← 補完 + 第一個文法點
L3..  故事推進 (旁白 + 聽/讀理解 + 穿插文法)
末   章末複習 (配對混錯題)
```

鐵律:**每章開頭 2 個小節 = 純預習,只用「會的字」的低壓題型,不放盲聽理解**。

---

## 1. 哪些字算「重要的沒學過的單字」

- 取本章故事**第一次出現、且 A1/A2 範圍、且劇情關鍵**的字(名詞/動詞/形容詞優先)。
- 每章選 **8–12 個**核心字,分兩節練完(每節 4–6 個)。
- 排除:專名(Momotaro)、太簡單已反覆出現的(the/is)、超綱字(>A2)。
- 來源:該章 `sentenceHard`(原文)裡的關鍵字 + 對應 `optionsZh`。

---

## 2. 題型規格

### 2a. 中英配對 (tap-pairs / phrase-pairs)

- **單字** → `tap-pairs`:4 對,左中文、右英文,點兩邊配對。
- **片語(2 字)** → `phrase-pairs`:同上,值為片語(`wide sleeve = 寬袖子`)。
- 每節 1–2 題配對,每題 4 對。
- 答對單對:短「叮」音效 + 綠勾;答錯:短「噗」+ 抖一下(B.427)。
- 欄位:`pairs: [{left:中文, right:英文}]`(left 中文側,日韓 overlay 翻 `p[]`)。

### 2b. 看圖選字 (picture-mc / emoji-pick)  ← 本次新增規格

- **目的**:用圖像錨定具體字(看得到的東西/動作),不靠中文翻譯。
- **兩種方向**(交錯用):
  1. **看圖→選英文**:題幹一張圖(emoji 或插圖)+ 4 個英文選項,選對應的字。
  2. **聽/讀英文→選圖**:題幹一個英文字 + 4 張圖(emoji),選對應的。
- **格式**:
  - `emoji-pick`:`options` 內含 emoji+英文(`"🐱 cat"`),`correctIndex` 指正解。
  - `picture-mc`:`options` 英文字 + `optionsZh` 中文 gloss + 一張題目圖(`imageEmoji` 或插圖)。
- **適用字**:具體名詞(cat/yard/rain)、可畫的動作(run/jump/cry)、形容詞對比(wet/dry, big/small)。抽象字不用看圖選字,改配對。
- **干擾項**:同類別、不同義(cat 的干擾 = dog/bird/fish,不是 happy/run)。長度相近、不暗示答案(過 validate-lessons X8)。
- **數量**:每節 2–4 題,跟配對交錯(不連 3 題同型,見分佈標準)。
- **答案位置**:依 `balance-answer-positions.cjs` 四位置平均(B.413)。

### 2c. 文法題 (grammar-mc)  ← 作者問「怎麼沒看到」

- **澄清**:文法題**早就有了**,全題庫目前 **79 題**(ch1–31 多數章各 2–3 題,ch12/13/26/27/28 各 7)。
  之所以「在題型分佈裡沒看到」,是 `2026-06-22-question-distribution-standard.md` §0 那張**診斷表是 2026-06-22 的舊快照**(當時還沒加文法,顯示 0),不是現況。現況見
  `docs/content/question-bank-index.md`(自動產生,含 grammar-mc 計數)。
- **本次調整(提高存在感)**:預習第二節(L2)起,**每章至少放 1 題 grammar-mc 在開頭預習段**,
  讓玩家早點碰到文法;其餘 grammar-mc 仍依分佈標準散在故事課(每章共 2–3,熱門章可多)。
- 規格不變(沿用分佈標準 §4):貼原文句子、distractor 是同字文法變體(go/goes/went/going)、
  A1/A2、`subSkill:'function'`、tag 加 `grammar`。

---

## 3. 一章開場 2 節的排法範例(以 ch3 龜兔賽跑為例)

```
L1 (預習①):
  tap-pairs   兔/龜/跑/睡 ↔ hare/tortoise/run/sleep
  emoji-pick  🐢 → tortoise / hare / fox / duck
  picture-mc  "run" → 🏃/😴/🍵/📖
  tap-pairs   快/慢/贏/輸 ↔ fast/slow/win/lose

L2 (預習②):
  phrase-pairs  打瞌睡/終點線 ↔ take a nap / finish line
  emoji-pick    😴 → sleep / win / jump / eat
  grammar-mc    "The tortoise ___ slowly." → walks / walk / walking / walked  (第三人稱 -s)
  picture-mc    "slow" → 🐢/🐇/🔥/⚡
```

---

## 4. 落地 / 驗收

- 新章節照本規格寫;舊 32 章「重排開場 2 節」是一個**分批 content 工作**(可 dispatch),不在本 commit 範圍。
- 驗收:`qa-static` 索引看每章 L1/L2 是否為預習型;`validate-lessons` 擋 option-bias/答案外洩;
  `balance-answer-positions.cjs` 顧答案位置;日韓內容走 overlay pipeline。
- 估時仍依「一節 ≈ 5 分」(分佈標準 §6)。

---

## 5. 待作者確認 / 後續

- 本規格定義「**怎麼寫**」。要不要 Claude **實際重排現有 32 章的開場 2 節**(大批 content 工程,逐章 dispatch)?
  建議先重排 ch0–3 驗證手感,對了再滾完。
