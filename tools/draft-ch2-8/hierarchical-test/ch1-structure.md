# Ch1 Hierarchical Restructure Test

> 把現有 Ch1 6 題拆成 **3 個 Unit** 試試 hierarchical 結構是否合你的味。一章不再 6 題壓縮,改成 3 段小故事,各自獨立節奏。

## 結構

```
Ch1 ─ "The Rainy Night"(章標題,跨 3 Unit 的大背景)
   ├─ Unit 1.1 ─ "Cold Awakening"     [主線] 4 題  ← 從現有 Q1-Q3 重編
   ├─ Unit 1.2 ─ "The Empty Street"   [支線] 4 題  ← 全新,純氛圍支線
   └─ Unit 1.3 ─ "Kind Face"          [主線] 5 題  ← 從現有 Q4-Q5-Q6 重編+延伸
```

**總計 13 題**(舊版 6 題 × 2.2x)。

## 主 / 支 設計理由

| Unit | 類型 | 推進什麼? | 為什麼這樣分 |
|------|------|----------|------------|
| 1.1 | 主線 | 設定狀態(冷/濕/餓/孤獨) | 不能省 — Ch1 thesis 的起點 |
| **1.2** | **支線(氛圍)** | **不推進。純粹看雨夜的世界** | **建立 brand sensory:Ghibli 慢 + 細節 + 不焦慮**;A2 學沒情節壓力的描述句;喘息空間讓 Unit 1.3 的相遇有重量 |
| 1.3 | 主線 | 進入相遇(big shadow + kind face + 跟隨) | 推進到 Ch2 的「門開著」 |

## Unit 1.2(支線)做了什麼新事

純 sensory atmospheric — 講貓在巷子裡的觀察。**不推主線**,但有 4 件事各自小:
1. 看一片葉子慢慢落下
2. 街是空的
3. 聽到很遠的車聲
4. 聞到濕路面的味道

學的詞:`leaf` / `fall` / `slow` / `empty` / `street` / `quiet` / `far` / `car` / `smell` / `wet` / `road`(11 個 sensory 詞)

→ Unit 1.2 是「下班逃逸」的縮影:user 跟貓一起靜靜觀察一個雨夜,沒主角沒任務沒壓力。

## Pace 比較

| 結構 | 第一次玩 Ch1 體驗 |
|------|---------------|
| **舊版**(6 題壓縮) | 5-7 分鐘:醒來→冷→餓→驚→相遇→複習。**fly through**,沒記憶點。 |
| **新版**(3 Unit) | 12-15 分鐘 分 3 個小段落,每段間可暫停。Unit 1.2 純氛圍,user 反而會「想留在這裡多看一下」。 |

## 視覺上 map 怎麼長?

```
Section 1 — The Rainy Night
   ●─── Unit 1.1 (主線, 4 lessons)
        │
        ●─── Unit 1.2 (支線, 4 lessons, 較小圓圈或不同顏色標記)
              │
              ●─── Unit 1.3 (主線, 5 lessons)
                   │
                   ▼ next: Section 2 "The Open Door"
```

支線 unit 可用不同 visual cue(較淡的 node 色 / 不同 icon)— 玩家看得出來「這段是探索不是進度」。

## 已上線 Ch1 6 題如何重分配

| 原題 | 新位置 |
|------|--------|
| kt-ch1-01 (rain falls hard) | Unit 1.1 Q1 |
| kt-ch1-02 (fur wet, cold) | Unit 1.1 Q2 |
| kt-ch1-03 (haven't eaten, hungry) | Unit 1.1 Q3 |
| kt-ch1-04 (big shadow, scared) | Unit 1.3 Q1 |
| kt-ch1-05 (She has a kind face) | Unit 1.3 Q4 |
| kt-ch1-06 (review pairs) | Unit 1.3 Q5 review |

→ 0 題浪費,既有內容全部復用。新增 4 題支線 + 3 題主線過渡。

## 新題型分佈(per Unit 5-type spread)

| Unit | listen-mc | listen-emoji | listen-comp | type | tap-tiles | tap-pairs |
|------|-----------|--------------|-------------|------|-----------|-----------|
| 1.1 | ✓ (Q1) | ✓ (Q2) | ✓ (Q3) | ✓ (Q4) | — | — |
| **1.2** | ✓ | ✓ | — | ✓ | ✓ | — *(支線不需 review pair)* |
| 1.3 | ✓ | — | ✓ | ✓ | ✓ | ✓ *(Ch1 review)* |

5-6 種題型分散 3 個 unit,每個 unit 內部也是混搭(不會 1.2 全部是 listen-mc)。

## Files in this folder

- `ch1-unit1.json` — Unit 1.1 主線 4 題(從現有 Q1-Q3 加 1 新主線 transition)
- `ch1-unit2.json` — Unit 1.2 **支線** 4 題(全新,純氛圍)
- `ch1-unit3.json` — Unit 1.3 主線 5 題(從現有 Q4-Q6 加 2 新主線 transition)

## Schema 加什麼欄位?

新欄位(draft 用,正式整合時要加進 Zod):
```ts
unit: z.number().int().min(1).max(8)     // 1-8 per chapter
questionInUnit: z.number().int().min(1).max(8)  // 1-8 per unit
unitType: z.enum(['main', 'subplot']).optional() // 主線 vs 支線
```

Map UI 邏輯改:不直接 6 nodes / chapter,改成 N nodes / Unit × M Units / Chapter。

## 給用戶看的判斷標準

讀完 outline + 3 個 JSON 後,問自己:
1. Unit 1.2 純氛圍支線**有趣**還是**浪費 user 時間**?(這決定整 8 章支線比例)
2. Ch1 從 6 → 13 題,**節奏剛好**還是**太長**?
3. **主/支 6/4 比例**對嗎?還是想要更高支線(5/5)、或主線優先(7/3)?

→ 確認後我才動 Ch2-Ch8 全套展開。
