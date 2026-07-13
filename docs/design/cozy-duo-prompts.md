# Cozy-Duo 美學 — 生圖 Prompt 與造型規範

> **風格代號:`Cozy-Duo`(暖色多鄰國)** — 三方融合的視覺語言,用來重塑故事燈 (Pickup) 的角色與介面美學。
> 由 threads/reddit 貼文分析衍生(leocoout 水豚 VibeJam 案例 + Duolingo 官方 shape-language 研究),per user 2026-07-12「想要小小兵 + 多鄰國風格,改既有美學」。
> **這份是「生任何角色圖 / 訂任何介面美感」前必開的錨點檔。** 風格 token 一律原封不動貼,只換場景。

---

## 🧬 風格 DNA(三方各出一塊)

| 來源 | 貢獻 | 具體規則 |
|------|------|---------|
| 🟡 **小小兵 (Minions)** | 魅力 + 表情 | 圓潤膠囊身形、**超大會反光的眼睛 + 大高光**、憨憨搞笑感、squash-and-stretch 彈性 |
| 🟢 **多鄰國 (Duolingo)** | 造型系統 + 清晰 | 全部用**基本形(圓形 / 圓角矩形 / 三角形)的整、半、四分之一**組合;**絕不尖角**;扁平粗形;誇張 + 節奏感(大小錯落);極簡有限配色;向量乾淨,任何尺寸都清楚 |
| 🧡 **故事燈品牌** | 溫度(不可丟) | **暖色卡繼續用**;**禁 Duolingo 亮綠 `#58cc02`**(已淘汰,太健身房);奶奶睡前童話的治癒調性 |

**一句話定義:** 小小兵的可愛憨勁 × 多鄰國的幾何扁平系統 × 故事燈的暖色治癒 = Cozy-Duo。

---

## 🎨 鎖定色卡(repo 實測色碼,禁自創)

| 用途 | 色碼 | 說明 |
|------|------|------|
| 背景 / 奶油 | `#fef8ed` | 主背景,暖白 |
| 主 accent / 琥珀 | `#e7a44a` | CTA、光暈、強調 |
| 綠(溫和橄欖) | `#7d9a4f` | **不是** Duo 亮綠;Ghibli 暖橄欖 |
| 紅 / 赤陶 | `#c84a3a` | 錯誤、重點對比 |

> ❌ 禁用:Duolingo 亮綠 `#58cc02`、霓虹色、冷色調高飽和。
> ✅ 原則(Duolingo 官方):配色要活潑但**有限**,別一次用太多色。

---

## 📐 造型語言規則(Duolingo 官方,照抄)

> 🔢 **形狀數量鐵律(官方風格書明載)**:一個角色用大約 **15 個形狀**。
> **< 6 個 → 太抽象(認不出);> 30 個 → 太雜亂;15 個 = 剛剛好。**
> 覺得醜,通常是形狀太多、太細。**用「剛好夠表達的最少形狀」。**

1. **一切從基本形長出**:圓形、圓角矩形、圓角三角形的整 / 半 / 四分之一拼出角色(3 種基本形),不徒手亂畫。
2. **全部圓角,沒有尖角。**
3. **誇張到接近漫畫**:抓一兩個關鍵特徵放大(貓 → 大眼、圓臉頰)。
4. **節奏感 (rhythm)**:形狀大小要錯落,不要一堆同樣大小的形硬排,那會呆。
5. **扁平 + 極簡 cel-shading**:最多一層柔和陰影,不要寫實光影、不要 3D 塑膠感。
6. **向量思維**:任何尺寸(手機小 icon → 大插畫)都要清楚。

---

## 📖 官方設計書逐頁分析(嚴格參考,不抄襲)

> 來源:`docs/design/refs/duolingo-shape-language.pdf`(官方 21 頁 brand guidelines,user 提供)。
> **原則:抄「構成方法 / 規則」,不抄「Duolingo 的角色造型與命名色卡」。** 我們的角色是 Mochi、色卡是自家暖色。

**逐頁重點(尤其看圖得到的):**

| 頁 | 規則 | 生圖要怎麼下 |
|----|------|-------------|
| p3 | 只用 **3 種基本形**:圓角矩形(最常用)、圓形、圓角三角形;**每個形都圓角,尖角 off-brand** | `built from rounded rectangles, circles, rounded triangles; all rounded corners` |
| p5 | **節奏**:形狀大小要錯落(像旋律長短音),同大小 = 呆 | `vary shape sizes for rhythm — large head, medium body, small limbs` |
| p6 ⭐ | **貓範例!** 6 形太抽象 / **15 形剛好** / 30 形太多。**「剛好」那隻:無描邊、扁平色塊、簡單半瞇眼、小粉鼻、白肚、捲尾 —— 比直覺更簡** | 見下方 v2 prompt |
| p6 | 30 形「太多」那隻 = 有**描邊 + 條紋 + 鬍鬚 + 細節內耳** → **這些全部不要** | `no outlines, no whiskers, no fur stripes, no detailed markings` |
| p8 | **扁平透視**,不畫 3D;深度只在同一視線高度 | `flat front perspective, no 3D depth` |
| p10 | 陰影是角色正下方的 **pill 藥丸形**,**絕不橢圓**(橢圓 = 透視);陰影色要比底色深 | `soft pill-shaped shadow directly beneath, never an oval` |
| p14 | 相鄰形塊給**不同顏色**比同色更好讀("this is better") | `distinct flat color per region so shapes read clearly` |
| p17 | 背景一律白 → **不能拿白當角色底色**;改用淺**粉彩**;**絕不用灰**(灰死氣沉沉) | 底色用暖粉彩,禁灰 |
| p18 | **少數幾色**;顏色太多縮小會糊 | `limited palette, only 3-4 colors` |
| p20-21 | 可有**浮動小元素**(靈感來自 Duo 飄動的腳),但只在有助畫面時才加 | 選配 |

**一句總結**:官方「剛好」的貓比你想像的**更扁、更少細節、無描邊**。你之前覺得醜,多半是加了描邊 / 鬍鬚 / 陰影 / 太多色。

---

## 🖼️ 生圖 Prompt 樣板

### 通用「風格 token」段(★ 每次原封不動貼,只換主體與場景;正負已合一塊)

```
Constructed from about 15 simple geometric shapes only (circles, rounded
rectangles, rounded triangles; wholes/halves/quarters), all rounded corners,
NO pointy edges, simplified to as few shapes as necessary, varied shape sizes
for rhythm. Bold flat 2D vector style, thick clean chunky forms.
Oversized glossy expressive eyes with big highlights, goofy playful charm,
exaggerated proportions. Minimal flat cel-shading. Cozy warm storybook palette:
cream #fef8ed, amber #e7a44a, soft olive #7d9a4f, terracotta #c84a3a.
Children's language-learning app mascot, friendly and huggable.
Avoid: 3D render, glossy plastic, photorealism, thin or pointy lines,
heavy black outlines, bright neon green #58cc02, cluttered background,
too many small details, extra limbs, distorted face, text, watermark.
```

> 📌 上面已把「負面」用 `Avoid:` 併進同一塊 —— **整段一次複製即可**,不用再分兩次貼。

---

## 🐈‍⬛ 角色 Prompt(逐角色,先生設定表)

> **鐵律:每個角色先生一張「reference sheet 設定表」當標準答案,之後所有圖都上傳這張當參考圖,變異降 90%。**

### Mochi(三花貓 / 主角)
```
Character reference sheet of a chubby calico cat mascot named Mochi.
[貼通用風格 token 段]
Calico patches (white + amber + dark brown), rosy cheeks.
4 views (front / side / back / 3-quarter) + 3 expressions
(happy, curious, brave). Plain off-white background, centered, 2048x2048.
```
(負面已含在通用風格 token 段的 `Avoid:` 裡,無需另貼)

### Hana(柴犬 / 奶奶養的)
```
Character reference sheet of a plump shiba inu dog mascot named Hana.
[貼通用風格 token 段]
Warm cream-tan fur, curled tail, gentle sleepy eyes.
4 views + 3 expressions (calm, happy, wagging). Plain off-white bg, 2048x2048.
```
(負面已含在通用風格 token 段的 `Avoid:` 裡,無需另貼)

### 奶奶(說故事的人)
```
Character reference sheet of a warm kind elderly grandma storyteller.
[貼通用風格 token 段]
Round glasses, silver bun hair, cozy cardigan, holding a storybook.
4 views + 3 expressions (smiling, reading aloud, tender). Plain off-white bg, 2048x2048.
```
(負面已含在通用風格 token 段的 `Avoid:` 裡,無需另貼)

### 場景圖(角色設定表定稿後才做)
上傳該角色設定表當參考圖 → 只寫變化:
```
same character, same Cozy-Duo style, now [場景:sitting on grandma's garden
wall at night with a warm hanging lamp / listening to a bedtime story].
```

---

## 🍌 Gemini (Nano Banana) 即用完整 Prompt — Mochi v2(嚴格照官方構成規則)

> Gemini 吃**自然語言**,不用 `--` 參數。**整段複製**。此版依 PDF 逐頁分析寫成:15 形、無描邊、pill 陰影、扁平透視、少色、禁灰。

```
Create a flat 2D vector mascot illustration of a chubby calico cat named
Mochi, for a children's English-learning app.

CONSTRUCTION (follow strictly):
- Build the entire cat from about 15 simple geometric shapes only: rounded
  rectangles, circles, and rounded triangles. Every shape has fully rounded
  corners — no pointy edges anywhere.
- Vary the shape sizes for rhythm: a large rounded head, a medium body, small
  short limbs, a curled tail. Use as few shapes as possible; each shape matters.
- Absolutely NO outlines or stroke lines — the character is made of solid flat
  color shapes only. No gradients, no shading, no highlights sculpting, no
  texture. Flat solid fills only.
- Flat front-facing perspective, no 3D depth.

FACE (keep it minimal, like the official "just right" example):
- Two simple calm eyes (small ovals or gentle half-lidded), a tiny triangular
  pink nose, a small mouth. Optional soft rosy cheek dots.
- Do NOT add whiskers, fur stripes, detailed inner-ear lines, or extra markings.

CAT DESIGN:
- Calico patches: warm cream white body, soft amber patches, a few gentle
  brown patches, and one white belly patch. Friendly, huggable, gently happy.

COLOR (limited, warm — do not copy Duolingo's palette):
- Use only 3-4 colors from: cream #fef8ed, amber #e7a44a, soft olive #7d9a4f,
  terracotta #c84a3a. Give adjacent shapes distinct fills so they read clearly.
- Background: solid light cream #fef8ed. Never use gray. Never bright neon green.

SHADOW:
- A soft flat pill-shaped shadow directly beneath the cat (a horizontal rounded
  bar), slightly darker than the background. Never an oval.

OUTPUT: square 1:1, centered, high resolution, clean and simple.

Avoid: outlines, black lines, 3D render, plastic look, realism, shading,
gradients, whiskers, fur stripes, busy details, many colors, gray, oval shadow,
cluttered background, extra limbs, text, watermark.
```

- **要設定表**:結尾加 `Show 4 views in one image: front, side, back, and 3-quarter, plus 3 simple expressions (calm, curious, happy). Keep every view in the exact same flat 15-shape style.`
- **生更多動作**:上傳滿意的那張 + `same cat, same flat no-outline 15-shape vector style, now [場景]`

---

## 🎨 「有設計感」的減法秘訣(mascot logo 公式)

> 「線條簡單但很有設計感」= 業界叫 **mascot logo / flat vector mascot**。搜參考圖用**這個詞**,不是 "cute character"。

**核心一句:有設計感不是加東西,是減東西。** 把陰影 / 材質 / 細節砍光,只留幾個乾淨粗形塊,自然高級。

三招通用公式(任何工具):
```
mascot logo of [角色], flat vector, simple bold shapes, minimal,
limited color palette, no shading detail
```
⭐ `no shading detail` 是關鍵字 —— 少了它就會醜。

**Midjourney 專業級參數**(若改用 MJ):`--cref [圖]` 鎖臉、`--sref [圖]` 鎖畫風、`--niji` 可愛日系、`--no shading,details,texture`、`--ar 1:1`。

**手把手教學來源**:
- [Aituts — 50+ Midjourney Logo/Mascot Prompts](https://aituts.com/how-to-create-actual-ai-generated-logos/)
- [ebaqdesign — Midjourney Logo Design 2026(職業設計師)](https://www.ebaqdesign.com/blog/midjourney-logo-design)
- [Midjourney 官方 — Character Reference (--cref)](https://docs.midjourney.com/hc/en-us/articles/32162917505293-Character-Reference)
- Reddit:r/midjourney、r/StableDiffusion 搜 `mascot logo` / `flat vector`

---

## 🔁 工作流(照抄研究結論)

1. **先設定表,後場景** — 沒有設定表就生場景 = 每張都不一樣。
2. **上傳參考圖** — 每次把設定表當「ground truth」丟進去。
3. **鎖 seed**(工具支援時)— 同 seed 微調 prompt,結果相近。
4. **固定 token 段永不改** — 只換主體 / 場景那幾個字。
5. **批次篩選** — 一次生 8-20 張,留最一致的 3 張,再拿去當下一批參考。
6. **人工微調視為標配** — 每張生成圖都該過一次人眼修。
7. **首選工具** — Nano Banana Pro(2026 角色一致性最強);GPT Images 亦可,但必餵設定表。

---

## 🚀 落地順序(改既有美學 = 分階段,別一次全翻)

1. **Proof:只重生 Mochi 一隻** → 驗證風格對不對味(不對只改一張,零風險)。
2. **定稿 → 寫進 `guidelines.md` + `colors.md`**,Cozy-Duo 成為專案標準。
3. **角色群補齊**:Hana、奶奶同套 prompt。
4. **UI 元件跟上**(用 Fable):按鈕 / 卡片 / 節點改 Duo 式粗圓角、大而友善。

---

## 🚫 Don't

- 別對圖像模型直接打「Minions / 小小兵」— 侵權 + 常被拒 / 畫歪。**只描述風格 DNA。**
- 別抄小小兵具體造型(黃膠囊 + 護目鏡 + 吊帶褲)= 註冊角色。
- 別用 Duo 亮綠 `#58cc02`。
- 別加寫實光影 / 3D 塑膠感 / 黑粗邊 / 尖角。

---

## 📚 研究來源(官方設計書,可自己讀)

- ⭐ Duolingo 官方設計系統 — [Shape Language](https://design.duolingo.com/illustration/shape-language)(造型語言那頁,15 形狀規則出處)
- Duolingo 官方設計系統 — [Brand Guidelines: Characters](https://design.duolingo.com/illustration/characters)
- Duolingo 官方部落格 — [Shape language: Duolingo's art style](https://blog.duolingo.com/shape-language-duolingos-art-style/)(圖解)
- [Duolingo Illustration Style Guide 完整 PDF](https://www.scribd.com/document/583545694/Duolingo-Illustration-Guidelines)(可下載,6 太抽象 / 30 太多 / 15 剛好)
- 角色一致性 — [Creating Consistent Characters in AI Art (2026)](https://prompting.systems/blog/creating-consistent-characters-in-ai-art)
- 資產一致管線 — [Consistent AI Game Assets Workflow](https://www.seeles.ai/resources/blogs/consistent-ai-game-assets-workflow)

---

*建立於 2026-07-12 — 由貼文分析(leocoout VibeJam + Duolingo shape-language)衍生;source of truth = 本檔,風格定稿後同步進 guidelines.md / colors.md。*
