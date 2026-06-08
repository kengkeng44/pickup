# Pickup Illustration Rules v1 (2026-06-07)

> 嚴格執行. 改設計前 review 本檔. 所有 illustrator / AI / Figma Make prompt 都套這套 rule.
> 衍生自 Duolingo Brand Guidelines (design.duolingo.com/illustration) 公開 design principles + Ghibli warm aesthetic + Pickup pivot (兒童客群).
> Sister doc: `docs/standards/pickup-story-standards.md` (內容 7 rule), `docs/research/chapter-ending-hook-design.md` (hook framework).

---

## 🎯 Pickup brand 視覺 DNA(3 句話)

1. **奶奶睡前**:溫暖,不焦慮,不催 streak
2. **Ghibli + Duolingo hybrid**:暖色 + 圓潤 + 彈跳互動
3. **兒童 + 親子 + 海外華人 heritage**:雙語並列,跨文化童話

---

## 📐 形狀規則 7 條(嚴格)

### Rule 1 — 3 基本形狀 + 禁尖角 + 1/1·1/2·1/4 切分(2026-06-07 補)

| ✅ 用 | ❌ 禁 |
|---|---|
| Rounded rectangle 圓角長方形 | 直角矩形 |
| Circle 圓 | 銳角三角(< 90°) |
| Rounded triangle 圓角三角 | 任何尖刺 |

- 最小 corner radius: **8px**
- 大形狀: **16-24px**
- 角色「三角耳」: 頂點必須圓化(非真三角)
- **🆕 切分以 1/1, 1/2, 1/4 為單位**(Duolingo 官方:「wholes, halves, quarters」)
  - 半月 = 圓 / 2
  - 葉子 = 圓 / 4
  - 拱門 = 圓 / 2 + 矩形
  - 不要 1/3, 0.6 等任意比例

---

### Rule 2 — Flat perspective(平面透視)

- 所有元素「**同一條視線高度**」
- ❌ 不要 3-point perspective / 消失點
- 深度靠「**前後遮擋 + 大小縮放**」,不靠透視縮短
- 角色腿腳跟身體**同一條地平線**

---

### Rule 3 — 影子 + 明暗(2026-06-07 修正)

**影子**:pill 形(膠囊),寬度為角色腳寬 80-90%,顏色 olive `#7d9a4f` 40% opacity

**明暗**(我之前 wrong,Duolingo 實際允許):

| ✅ 允許 | ❌ 禁止 |
|---|---|
| **多階色塊**:同一色相分 2-3 階純色(light/mid/dark side) | Gradient blend 連續漸層 |
| Pill 地面影 | Drop shadow blur 模糊投影 |
| 高光色塊(底色亮 1 階,純色) | Airbrush / soft highlight |

**多階色塊範例**:Mochi 橘色背 = amber 主 `#e7a44a` + 暗面 `#c87a3a` + 亮面 `#f5b86b` 3 階純色,**階與階之間是 hard edge,不過渡**

---

### Rule 4 — **無 lineart, 色塊互相相鄰形成 silhouette**(2026-06-07 修正)

> **舊版錯**:寫「4-5px 描邊」是我誤判,Duolingo Brand Guidelines「heavy stroke weights」原意是**色塊邊界**不是外加 lineart
> 真正的 Duolingo / Pickup 風 = **像剪紙拼貼**,silhouette 來自色塊相鄰的對比

| 項目 | 規格 |
|---|---|
| outline / lineart / stroke / contour | **完全沒有**(0 px) |
| silhouette 怎麼來 | **色塊邊界 + 跟背景對比**(cut paper collage 邏輯) |
| 例外 | 如果角色色與背景太接近,**可加極淺色塊邊界**(同色系深 1-2 階),非黑非暖深 |

**AI 生圖 prompt 必嵌**:
- Positive: `NO outlines, NO lineart, NO contour lines, pure flat color blocks only, silhouette defined by color contrast, color block construction, cut paper collage style`
- Negative: `outline, lineart, line art, stroke, contour, contour line, dark edge, dark silhouette line, outlined character, traced edge, drawn line, ink line`

---

### Rule 5 — 顏色 — Pickup 色票(2026-06-07 升級配色)

```
✅ 用:
   Olive       #7d9a4f  (成功 / 主色 / accent / pill shadow)
   Amber       #e7a44a  (HUD / 焦點 / streak / 主角色塊)
   Cream       #fef8ed  (角色內部色塊: 臉 + 肚 + 腳尖)
   Dusty sage  #dde4cc  ★新★ (角色 illustration 背景 — 替 cream 當背景, 跟 amber 互補)
   Soft sage   #e8efd9  (亮 1 階替代)
   Terra       #c84a3a  (錯誤 — 用克制)
   Warm dark   #3c2a1c  (文字 + 鼻 + 眼)
   Skin cream  #f4e3d0  (奶奶皮膚)
   Hair grey   #e8e3d8  (奶奶頭髮)
   Brown amber #c0844a  (Hana 柴犬主色)
   Clothes amber #c87a3a (奶奶傳統台灣衣)
   Warm taupe  #a08a6c  (microcopy / 副文字 — 取代 muted gray 因為 Duolingo 官方禁灰)
   ⚠️ 棄用:Muted gray #8b6f4a — Duolingo 官方原話「never use gray, it appears lifeless and cold」

❌ 禁:
   Duolingo bright green #58CC02
   Duolingo red #FF4B4B
   霓虹螢光色 (S > 95%)
   純黑 #000000
   純白 #FFFFFF (改 cream)
```

- 飽和度 HSL S: **60-85%**(範圍外 reject)
- 不用 < S 40%(灰悶)
- 不用 > S 95%(刺眼)

---

### Rule 6 — Rhythm(節奏)

- 同一張圖必含**大 + 中 + 小** 3 size
- 黃金比例: **大 : 中 : 小 ≈ 3 : 2 : 1**
- 禁全部一樣大(平淡)
- 禁全部不同到無結構(噪音)

---

### Rule 7 — Simplicity(用最少形狀)

- 每元素自問: "拿掉這 shape 故事還說得通嗎?" 是 → 拿掉
- 背景**≤ 5 個形狀**
- 角色細節**≤ 7 個 detail**(三花貓 = 3 色塊 + 眼 + 鼻 + 嘴 + 鬍鬚 = 7)
- 小 icon **≤ 2 色**(避免 scale 下去糊)
- 主角 **≤ 5 色**(身上同時出現的顏色數)

---

### 🆕 Rule 8 — Floating Accents 飄浮裝飾(2026-06-07 新增)

Duolingo 場景常見「角色周圍飄小東西」增加趣味,Pickup 沿用:

| 項目 | 規格 |
|---|---|
| 每 frame 數量 | **0-3 個**(超過 = 視覺噪音) |
| 種類 | 星星 ⭐ / 愛心 ♥ / 泡泡 ○ / 葉子 🍃 / 小花 / 音符 ♪ / 閃光 ✨ |
| 大小 | 角色高度的 **1/8 - 1/4** |
| 位置 | 角色頭上方 / 旁邊空白,**不擋角色** |
| 顏色 | **副色**(olive / amber 系),**不用主角主色塊色**(避免融進) |
| 形狀 | 同 Rule 1 三基本形狀(星星 = 圓 + 圓角三角組合) |

**用途**:
- 角色 happy → 飄小星星
- 角色 thinking → 飄問號泡泡
- 角色 sleeping → 飄音符 zzz
- 角色 surprised → 飄驚嘆號 + 閃光

**禁**:
- 同 frame 超過 3 個
- 跟角色色相同色
- 蓋住臉
- 寫實風格(光暈/亮粉/煙霧)

---

### 🆕 Rule 9 — Stadium Silhouette 身形側邊幾何(2026-06-08 新增)

Duolingo 官方 brand guideline 原則:「**head and body composed of 1-2 basic shapes each**」。所有角色身形側邊剪影一律是「**直線 → 圓弧 → 直線**」(stadium shape / rounded rectangle 側面),**絕不**用橢圓或自由曲線。這條跟 Rule 1「禁尖角」並列為形狀規則最高優先級。

| 部位 | 對的剪影 ✅ | 錯的剪影 ❌ |
|---|---|---|
| 身體側邊 | 直線(側) + 圓弧(上下) + 直線(側) | 純橢圓 / S 型自由曲線 |
| 頭部 | 圓 (Rule 1) | 橢圓變形 |
| 耳 | 圓角三角(頂點圓化) | 純三角 / 尖角 |
| 尾巴 | Pill 形(膠囊) | 自由曲線蛇形 |
| 腿 | rounded rect(短矮) | 細長橢圓 |

**為什麼**:Duolingo 角色(Duo / Lily / Junior / Bea)幾何感強的關鍵在「直線段給予結構,圓弧段給予 softness」— 純有機曲線(Ghibli 純度)會讓角色看起來「畫家畫的」而非「設計師設計的」,失去 Duolingo 的可動畫性 + scale 一致性。

**SVG path 寫法**:
```
M x1 y1                          // 起點
L x1 y2                          // 左側直線下
A r r 0 0 0 x2 y2                // 底部圓弧
L x2 y1                          // 右側直線上
A r r 0 0 0 x1 y1 Z              // 頂部圓弧 + 閉合
```
兩段 L (直線) + 兩段 A (圓弧)。同樣邏輯套到頭(圓)、耳(圓角三角)、尾(pill)。

**AI prompt 必嵌**(positive prompt 加):
```
rounded rectangle body, stadium shape silhouette,
straight side panels with arc top and bottom,
NO ellipse body, NO organic curves, NO S-curve outline
```

**SVG / Vector tool (Recraft V4.1) 額外提示**:
- prompt 嵌 `vector illustration, flat design, geometric construction`
- 出來後在 Figma 開檔,如有「身側 bezier 彎曲」手動拉直成直線段
- export SVG path 後 grep 確認 `A` (arc) command 只出現在頭部 / 身體上下 / 耳尖 / 尾,**側邊不應該有 A**

---

## 🎭 Pickup 三人組角色 spec

### Mochi 三花貓(主角)— 2026-06-07 修正眼+嘴+鼻

```
基本形狀:
  - 圓頭 (circle, ~65% body 高 — 2026-06-07 從 60% 升)
  - 圓角長方身 (rounded rect, body)
  - 三角耳 2 (圓化頂點)
  - Pill 尾巴 (curved)

顏色塊 (三花,標準) — multi-tone:
  - amber 主 #e7a44a + 深 #c87a3a + 亮 #f5b86b (頭頂 + 背 + 尾,3 階純色塊)
  - cream #fef8ed (臉左 + 肚 + 腳尖)
  - 暖深 #3c2a1c (耳尖 + 一邊臉頰 + 尾尖)

描邊: 無 (Rule 4 修正)

眼睛 — Duolingo 風格 spec (2026-06-07 新增):
  - 「拱形眯眼」風 = 上半部一個 warm dark #3c2a1c 拱形(像反 U / 厚弦月)
  - 下方一條細弧線表示眼底
  - 不要圓黑點 / 白高光 / sparkle
  - 兩眼間距約 1.5 倍眼寬
  - 每眼寬約頭寬 12%
  - 跟 Duolingo 官方角色 (Duo / Lily / Bea) 同款 "sleepy bedroom eyes"

嘴巴 — Duolingo 風格 spec (2026-06-07 新增):
  - 1 個小珊瑚粉色橢圓 #ff7878 (像小舌尖)
  - 大小約頭寬 8%
  - 位置:鼻子原位 (取代鼻子)
  - 不要笑線 / 黑點 / 張嘴 / 牙齒 / 露舌

鼻子: 無 (嘴巴位於原鼻子位置,Duolingo 簡化哲學)

姿勢 sheet (6 poses):
  P1 idle 站
  P2 happy 雙手舉起
  P3 thinking 摸下巴
  P4 sleeping 蜷縮
  P5 reading 在書前
  P6 walking 走路
```

### Hana 柴犬(配角)

```
基本形狀:
  - 圓頭 (circle)
  - 圓角長方身
  - 圓角三角耳 (柴犬豎耳)
  - Pill 捲尾巴

顏色塊:
  - 棕橘 #c0844a   (身)
  - 白 #fef8ed     (臉 + 肚)
  - 暖深 #3c2a1c   (鼻 + 眼)

描邊: 4-5px #3c2a1c

姿勢 sheet (4 poses):
  P1 sitting 坐著聽
  P2 wagging 搖尾巴
  P3 sleeping 趴下
  P4 walking 走路
```

### Grandma Mei 奶奶(敘事者)

```
基本形狀:
  - 圓頭 + 白髮包包頭 (circle on top)
  - 圓角長方身
  - 圓角眼鏡 (2 circles)
  - 圓手 (circles)

顏色塊:
  - 灰白髮 #e8e3d8
  - 暖橘衣 #c87a3a (傳統台灣老人風)
  - 暖深 #3c2a1c (眼鏡框 + 描邊)
  - Cream skin #f4e3d0

描邊: 4-5px #3c2a1c

姿勢 sheet (3 poses):
  P1 holding-book 拿翻開的繪本
  P2 sitting-armchair 坐扶手椅
  P3 waving-goodnight 揮手晚安
```

---

## 🌳 Background 規則(per Pickup 自己 + 業界 mobile-first 兒童 app 最佳實踐)

**Duolingo 背景哲學**(公開):
1. **以角色為主, 背景退**(背景 desaturation 70% 或淺色)
2. **層次** 3 層: 前景(物件)/ 中景(角色)/ 背景(色塊)
3. **不寫實**: stylized abstract shapes

**Pickup adapt**:

### Background Rule 1 — Cream 主色基底

- 預設背景 `#fef8ed` cream
- ❌ 純白
- ❌ 漸層 gradient(2024 後已 sunset per v1.9.43)
- ✅ 加 1-2 個大色塊 olive #7d9a4f 或 amber #e7a44a 點綴

### Background Rule 2 — 3 層深度

```
前景 (前 z): props (書 / 杯子 / 桃子) 完整 saturation
中景 (中 z): 角色 (Mochi/Hana/奶奶) 完整 saturation
背景 (後 z): 大色塊 (山 / 天 / 牆) 70% saturation
```

- 不超過 3 層
- 每層之間用「**stroke** 不同粗細」區分(前景 5px,角色 4px,背景 3px)

### Background Rule 3 — 元素 ≤ 5 個 + ≤ 3 種顏色

- 一個 frame 背景**不超過 5 個 shape**(避兒童 attention 分散)
- **不超過 3 種顏色**(palette 凍住)
- 細節留給角色

### Background Rule 4 — 風格範本(per 章節主題)

| 章節 culture | 背景元素建議 |
|---|---|
| 中華 | 圓窗 / 燈籠 / 月 / 山水(stylized) / 竹 |
| 日本民間 | 紙門 / 櫻 / 富士山 simplified |
| 歐洲童話 | 城堡 simplified / 森林大樹 / 月亮 |
| 動物寓言 | 草地 / 樹幹 / 河 |
| 黑暗民俗 (Baba Yaga / 六天鵝) | 月夜 / 鬼火 / 暖光(避恐怖) |

### Background Rule 5 — 室內 frame 哲學(奶奶說故事)

奶奶說故事 frame(在 ChapterIntro):
- 暖光燈圓 (amber 漸亮)
- 扶手椅(rounded rect)
- 書本(rounded rect 開頁)
- 窗外夜空(背景大色塊 olive 70% sat)
- Mochi 跳上矮牆 / Hana 趴腳邊

---

## 🚨 嚴禁清單(5 條)

1. ❌ 抄 **Duolingo Owl** 任何 pose / outline / 顏色
2. ❌ 用 **Duolingo bright green #58CC02** 為主色
3. ❌ 抄 **Hearts / streak flame vector**(emoji 🔥 OK)
4. ❌ 抄 **任何 Duolingo 角色名**(Lily / Lin / Junior / Zari)
5. ❌ Frame layout 像素級復刻 Duolingo screen

---

## 🛠 強制 enforcement checklist

每張 illustration ship 前跑這 checklist:

```
□ 角 ≥ 8px radius (無尖)
□ 角色腳下有 pill 形影 (非橢圓)
□ 0 描邊 (Rule 4 修正,silhouette 來自色塊對比)
□ 色票 100% Pickup palette (無 Duolingo 亮綠)
□ 飽和 60-85% (無霓虹)
□ 大中小 3 size 都有 (節奏)
□ ≤ 5 個背景形狀 (簡潔)
□ Flat perspective (無消失點)
□ 0 Duolingo 角色 / 名稱 / 色 / icon vector 抄襲
□ 3 層深度 (前景 / 角色 / 背景)
□ Stadium silhouette:身形側邊 = 直線 + 圓弧 + 直線(Rule 9, 無純橢圓 / 無 S 曲線)
```

11/11 才 ship.

---

## 🎬 Figma Make AI prompt template(嵌這套 rule)

每次叫 Figma Make 生新 mockup,**prompt 開頭嵌**:

```
DESIGN RULES (strict):
- Shapes: rounded rectangles, circles, rounded triangles only. No sharp corners.
- Minimum corner radius 8px, large shapes 16-24px.
- Body silhouette: stadium shape (straight side panels with arc top and bottom). NO ellipse body, NO S-curve, NO organic free curves. (Rule 9)
- Flat perspective (NOT 3D perspective).
- Shadows: PILL shape only (NOT ovals).
- NO outlines, NO lineart, NO contour lines. Silhouette from color block adjacency only. (Rule 4)
- Color palette: olive #7d9a4f, amber #e7a44a, cream #fef8ed, terracotta #c84a3a, warm dark #3c2a1c.
- DO NOT use Duolingo bright green #58CC02.
- HSL saturation 60-85% (no neon).
- Rhythm: include large + medium + small shapes (3:2:1 ratio).
- Simplicity: ≤ 5 background shapes per frame.

CHARACTERS:
Mochi = chibi isometric calico cat (orange #e7a44a / white / warm dark patches), 4 limbs, big head, no whiskers needed.
Hana = chibi isometric Shiba dog (warm brown #c0844a / white).
Grandma Mei = elderly Taiwanese grandmother with white hair bun, gentle smile, round glasses, warm orange traditional clothing.

THIS IS NOT A DUOLINGO COPY. Pickup has its own identity (Ghibli-warm + bedtime story atmosphere).
```

---

## 🎯 終版 Mochi 生圖 prompt(官方)

> 鎖死. 不再 iterate. 工具 = Civitai on-site generator + Flat Duolingo Style (Pony) LoRA
> [civitai.com/models/427205/flat-duolingo-style-pony](https://civitai.com/models/427205/flat-duolingo-style-pony)
> 為什麼是這套:Civitai 社群 624 review Overwhelmingly Positive,trigger 詞直接吃 Duolingo 視覺
> 訓練資料,手機 browser 可跑,免費,且 Pickup 嚴禁清單 5 條都覆蓋。

### Positive prompt

```
calico cat mascot named Mochi, chibi bipedal cartoon mascot standing upright,
character reference sheet, 8 poses in 4x2 grid, identical character across all poses,

fur pattern locked: amber back and head-right and tail, cream face-left and belly,
warm dark patch covering left ear and left cheek, warm dark tail tip,
two small simple black oval dot eyes, tiny triangular pink nose, small closed smile,

minimalistic vector art, lean lines, graphic design, vector graphics, flat color,
bold bouncy bright, clearly silhouetted, rounded rectangle and circle shapes only,
no pointy edges, bold 5px warm dark outline, pill capsule shape shadow under feet,
transparent background,

color palette only amber #e7a44a cream #fef8ed warm dark #3c2a1c olive #7d9a4f,

poses labeled clearly:
P1 idle standing arms at sides neutral smile,
P2 jumping happy both paws raised eyes closed in joy,
P3 thinking right paw at chin head tilted,
P4 lying on side curled up sleeping eyes closed,
P5 sitting on floor holding open book in both paws,
P6 walking bipedal side view one paw forward like Mickey Mouse,
P7 standing waving right paw raised,
P8 standing both paws covering cheeks eyes wide open in surprise
```

### Negative prompt

```
realistic, photorealistic, 3d render, soft shading, gradient, ambient occlusion,
anime sparkle eyes, big shiny anime eyes, glittery highlights, kawaii sticker style,
fluffy fur texture, hyperdetailed, busy background,
4 legged cat, quadruped, real cat anatomy, sharp pointy shapes,
gray background, generic mascot, fursuit, photoreal animal,
duo the owl, owl character, any duolingo named character,
bright neon green #58CC02, oversaturated neon, pure black outline #000000,
multiple characters, watermark, text overlay, logo
```

### 生圖設定建議

| 參數 | 值 | 為什麼 |
|---|---|---|
| Sampler | DPM++ 2M Karras | Civitai 社群 flat illustration 標準 |
| Steps | 28-32 | 太低糊,太高過擬合 |
| CFG | 6-7 | flat 風格 CFG 高會出黑邊 artifact |
| LoRA strength | 0.7-0.8 | 1.0 會太硬 Duolingo,留 Pickup 自我風格 |
| Aspect | 16:9 | 4×2 grid 需要橫構圖 |
| Seed | 隨機,合格 1 張後鎖 seed | 後續 Hana/Grandma 用同 seed 保持 style |

### 失敗也不換 prompt 的處理

如果生出來某張 pose 偏掉(P6 變 4 腳 / P3 變動漫眼),**不要重 prompt**,Civitai 介面點 "img2img" → 上傳那張 → denoising 0.3-0.5 → 跑「fix the pose to match the rest of the sheet, keep all other poses unchanged」

---

## 📁 引用

- Duolingo Brand Guidelines (公開, design principles only, no asset copy):
  - https://design.duolingo.com/illustration/shape-language
  - https://design.duolingo.com/illustration/characters
- `docs/standards/pickup-story-standards.md`
- `docs/research/chapter-ending-hook-design.md`
- `CLAUDE.md` (兒童 pivot)

---

*Established 2026-06-07 (v2.0.B.250). Strict execution from this point. New illustration / mockup / agent / Figma Make prompt 必嵌 enforcement checklist.*
