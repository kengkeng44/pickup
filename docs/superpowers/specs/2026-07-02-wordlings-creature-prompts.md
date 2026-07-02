# 咕嚕 Gulu — 首發怪物生圖 prompt (v1)

> 配合 `2026-07-02-wordlings-exam-pet-app.md`。**作者手動生圖**(比照拾光 mascot 流程:ChatGPT DALL-E 3 / GPT-4o image / Gemini Imagen 對這種風格比 SDXL 準)。
> 目標:5 隻史萊姆基底小怪 + 1 顆蛋 + 每隻 1 個進化型。風格一致、透明背景 PNG、正面、可愛/醜萌。
> ⚠️ 拾光教訓:**不要叫 LLM 直接吐 SVG**(物理上限會翻車);一律外部 image gen 出 PNG,rembg 去背。

---

## 0. 共用風格錨(每個 prompt 前面都貼這段)

```
A cute chibi slime creature mascot, Studio Ghibli warm hand-painted style,
soft rounded gel-like translucent body, big expressive glossy eyes, tiny stubby
limbs, gentle soft shading, warm cream-and-earth color palette, NOT neon, NOT
Duolingo-green, NOT 3D render, NOT pixel art. Flat-ish storybook illustration
with soft gradients. Front-facing, centered, full body, friendly happy
expression. Plain white background, clear silhouette (easy to cut out).
Single character only, no text, no logo, no border.
```

生圖後:白底 → rembg 去背 → 存 PNG(建議 512×512,透明背景)。

---

## 1. 起始蛋 (Starter Egg)

```
[共用風格錨]
Subject: a small mystery egg, warm speckled cream shell with faint glowing
runes, sitting in a cozy nest of soft moss and a folded knitted blanket. Slightly
wobbling, alive, expectant. Adorable, warm bedtime mood.
```
狀態變體(可加):`about to hatch, tiny crack with warm light leaking out`。

---

## 2. 首發 5 隻(史萊姆基底 + 一神話特徵)

> 全部沿用同一史萊姆基底(同體型/同眼睛畫法),只換「特徵 + 主色」→ 造型一致、生圖成本低。

### 2-1. 豆芽咕嚕 Sprout Gulu(預設第一隻)
```
[共用風格錨]
Subject: soft moss-green translucent slime with a single tiny green sprout
(two little leaves) growing from the top of its head. The simplest, most
innocent one. Curious wide eyes. Symbol of growth and beginnings.
```

### 2-2. 狐火咕嚕 Kitsune Gulu
```
[共用風格錨]
Subject: warm amber-orange translucent slime with two fluffy fox ears and one
small floating blue-white flame (Japanese kitsune-bi / fox-fire) hovering beside
it. Slightly mischievous but sweet expression.
```

### 2-3. 龍鱗咕嚕 Dragon Gulu
```
[共用風格錨]
Subject: teal-jade translucent slime with two tiny golden dragon horns, a small
patch of shiny scales on its back, and two long thin dragon whiskers on its face
(East Asian dragon). Proud but cute.
```

### 2-4. 獨眼咕嚕 Cyclops Gulu(醜萌代表)
```
[共用風格錨]
Subject: greyish-terracotta translucent slime with ONE single big round eye in
the center, holding a tiny stone club (Greek cyclops). Ugly-cute, derpy, lovable
and a little clumsy. Endearing goofy expression.
```

### 2-5. 羽蛇咕嚕 Quetzal Gulu
```
[共用風格錨]
Subject: emerald-and-gold translucent slime with a collar of bright feathers
around its neck and two tiny feathered wings (Mesoamerican feathered serpent /
Quetzalcoatl). Elegant, exotic, warm.
```

---

## 3. 進化型(每隻 1 個,v1)

進化 = 同一隻長大 + 特徵更明顯。共用指令:
```
[共用風格錨 + 該隻 2-x 的 Subject]
...evolved form: slightly larger and taller, the signature feature is bigger and
more detailed (e.g. sprout → small flowering plant / fox-fire → twin flames /
horns → longer / single eye → glowing / wings → fuller feathers). Keep the SAME
face and body identity so it clearly reads as the grown-up version of the same
character.
```

---

## 4. 一致性 / 交付指令(給生圖 AI 的收尾)

- 生**同一隻的多表情**(開心 / 睡覺 / 吃單字 mogumogu / 委屈吃路邊飼料)時,務必附一句:
  `keep the exact same character design, only change the pose/expression`。
- 一次一隻、白底、單角色、無文字。
- 交付檔名建議:`gulu-sprout.png` / `gulu-sprout-evo.png` / `egg.png` …,方便直接接進 app。

---

## 5. 待作者確認

- 5 隻的神話搭配 OK 嗎?要不要換/加(例:北歐 / 埃及 / 斯拉夫)?
- 醜萌程度:獨眼咕嚕當「醜萌代表」可以嗎,還是全部都要偏可愛?
- 進化型 v1 先每隻 1 階段(共 5 張),之後再擴 2-3 階段?

*建立 2026-07-02,配合 Gulu spec v1。作者生圖前先看 §5 確認搭配。*
