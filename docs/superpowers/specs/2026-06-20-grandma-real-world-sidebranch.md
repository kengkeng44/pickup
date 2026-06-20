# 設計 spec — 奶奶的「現實悄悄話」支線

> Status: **設計提案(spec only,未碰 content JSON)**
> 由 regression-after-fix session 設計。內容量產(各章 voice)建議 dispatch Fable。
> 核心:每個故事講完,奶奶用 Mochi / Hana / 院子日常的**真實小事**,把寓意落到小孩自己的生活。

---

## 1. 為什麼做

現有三層敘事:
- **Outer frame**:Mochi(抹茶/三花貓)跳牆、Hana(柴犬)趴腳邊、奶奶翻書說故事。
- **Main story**:童話本體(桃太郎…)。
- **Aesop side**:每章 2 則伊索短篇。

缺一塊:故事的**寓意停在故事裡**,沒接回小孩的現實。8-12 兒童學寓意,最有效的是「這跟你昨天那件事一樣」的具體連結,不是抽象道理。

奶奶是現成的橋:她本來就在現場,身邊就有 Mochi 跟 Hana 兩個活教材。讓她講完故事,順口補一句「這個啊,就像花花上次……」,寓意就從故事跳進客廳。

---

## 2. 機制

### 2.1 載體:narration,不是新題型

支線用既有 `narration` type 承載(`src/data/lessons.ts` 已有),**不新增題型、不算題數**(對齊「旁白不算題型」計數規則,見 `docs/architecture/2026-06-20-spec-vs-actual-state.md` §3)。

- 1-3 個 narration beat,grandma voice / `speaker: "narrator"`。
- 接在每章 **outer-outro segment**(奶奶 Goodnight 前),或獨立 `segmentType: "real-life"`(若要可單獨追蹤/收集)。
- **支線 = optional**:不擋進度、答錯不存在(沒互動)。可做成「奶奶的悄悄話」收集冊(cosmetic,接 `cards.ts` / collectible)。

### 2.2 三段式結構(每章一則)

1. **鉤**(1 beat):奶奶把書闔上,看向 Mochi 或 Hana。
   > 「你知道嗎,這個故事啊,就發生在我們院子裡。」
2. **對照**(1 beat):一件 Mochi/Hana/奶奶日常的**具體小事**,結構對映故事寓意。
3. **落地**(1 beat):輕輕轉向小孩,**邀請不說教**,結尾開放。
   > 「你今天有沒有,也慢慢做完一件事呢?」

### 2.3 語氣鐵律(對齊 CLAUDE.md microcopy 原則)

- 具體 > 抽象:講「花花追蝴蝶摔倒」,不講「不要急躁」。
- 不說教、不下命令:用「你有沒有……呢?」邀請,不用「你要……」。
- 溫暖陪伴,不焦慮:沒有對錯、沒有評分。
- 雙語:中文主 + 關鍵英文字回扣本章 vocab(承接 story 的字)。

---

## 3. 寓意 → 現實 對照範例(5 則)

| 章 | 故事 | 寓意 | 奶奶的現實悄悄話(草稿) |
|----|------|------|----------------------|
| Ch3 | 龜兔賽跑 | 慢而穩 | 「Hana 上次追蝴蝶,跑得超快,結果『砰』撞到花盆。慢慢走的 Mochi 反而先到牆頭上。你刷牙也是,**slow** 一點,刷得比較乾淨喔。」 |
| Ch2 | 醜小鴨 | 你會長成你自己 | 「Mochi 剛來院子的時候,瘦瘦髒髒,沒人理她。現在呢?毛亮亮的,一跳就上牆。你現在還不會的字,也會慢慢變亮,**grow** 起來。」 |
| Ch4 | 駱駝駝峰 | 偷懶有代價 | 「花花今天不想散步,賴在門口。可是晚上肚子餓,還是得自己走去找飯碗呀。該做的 **work**,躲不掉的。」 |
| Ch8 | 三隻小豬 | 紮實的努力 | 「奶奶煮湯,如果偷懶開大火,湯就不甜。要慢慢熬。Mochi 都知道,所以她乖乖等。好東西要 **strong**、要扎實。」 |
| Ch1 | 北風與太陽 | 溫柔勝過用力 | 「你越追 Mochi,她越跑。可是你坐著不動,她自己就過來蹭你了。有時候 **gentle** 比用力更有用呢。」 |

> 範例為設計草稿,正式 voice 由 Fable 依各章 vocab + 奶奶人設潤稿。

---

## 4. 落地步驟(本 spec 之後,分批)

1. **Schema**(若走獨立 segment):`segmentType` 加 `"real-life"`(`lessons.ts` + `validate-lessons.js`)。走 outer-outro 內嵌則免改。
2. **Pilot 1 章**:挑 Ch3 龜兔賽跑寫完整 3-beat,驗收手感(對應 AskUserQuestion 的 B 選項)。
3. **量產**:Fable 依本表 × 32 章 batch 生成,Opus review 寓意對映正確性。
4. **(選配)收集冊**:「奶奶的悄悄話」收集 UI,接 `cards.ts`。

---

## 5. 待決(等 user)

- 載體:**內嵌 outer-outro**(零 schema 改動,推薦)vs **獨立 `real-life` segment**(可單獨收集/追蹤)?
- 要不要做「悄悄話收集冊」cosmetic,還是純敘事 beat 就好?
- pilot 章:Ch3 龜兔賽跑 ok 嗎?
