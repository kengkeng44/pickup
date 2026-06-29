# Pickup Map–Character Fusion Prompts — 角色與地圖融合

> companion to `Pickup-isometric-character-prompts.md`。
> **問題**:現行地圖是平塗暖底 (`#f1ebe1`),角色各自站在**白色 tile 平台 + 一顆通用灰橢圓陰影**上 → 看起來像貼紙浮在上面。
> **這份**:產「去 tile 的角色 + 步道 + 前景遮擋物」,讓角色**種進場景**而不是貼在上面。
> 一樣**手動**貼進 ChatGPT / DALL-E 3 / Gemini 生圖(SDXL 對這風格無效)。全程**同一 chat**保持風格一致。

---

## 🎯 5 根融合桿子(設計原則 — 每張圖都吃這 5 條)

1. **統一光源** — 全場光從**左上**來,所有陰影一致落右下。(沿用 anchor 的 "light from upper-left")
2. **接地陰影** — 不是通用灰橢圓、不是白 tile。改成**貼腳、糊邊、暖棕色**的接觸陰影(warm brown,blurred,hug the feet)。離地越高 → 越大越淡。
3. **共用色溫 + 殺白 tile** — **拿掉白色 tile**,任何落地面染成地圖奶油色 `#f1ebe1`,別用純白純灰。
4. **大氣層次** — 背景往後退(降對比 / 降飽和),角色滿對比 + 一道**暖色 rim light**(描邊光)→ 角色跳出來但不割裂。
5. **邊緣咬合** — 前景小物(草叢 / 石頭 / 落葉 / 燈籠)**蓋住角色底部一點點** → 角色「咬」進場景。

---

## 🎨 Step 0 — Style Lock(每張前先貼,防漂)

```
Use the EXACT same isometric chibi style as the Pickup calico cat:
- Isometric 2.5D, viewed from above-right at ~30-degree angle
- Big round chibi head (~60% of figure), small chubby body
- Solid flat vector colors, NO outline (or extremely thin only)
- Bold solid black pupil-only eyes, no whites, no catchlights
- Light comes from the UPPER-LEFT, soft shadow falls lower-right
- Warm Ghibli-Duolingo palette: cream #f1ebe1, amber #e7a44a, olive #7d9a4f, terracotta #c84a3a, dusty rose, warm dark brown, muted blue
- Transparent background, PNG with alpha

The ONLY change from the original anchor: NO white tile platform. Instead, the character stands/sits directly on the ground with ONLY a soft warm-brown contact shadow hugging its feet (blurred, semi-transparent warm brown — NOT grey, NOT a hard oval, NOT a tile).
```

---

## 🐈 Step A — De-tiled 主角貓 Mochi(新融合 anchor)

> 這張磨好 = 之後所有融合角色的錨。沒磨好不要接下面。

```
Generate an isometric chibi calico cat character in Duolingo's character design system style, designed to sit naturally ON a game map (no platform).

Subject: A calico (三花) cat sitting upright, looking forward gently.

Style requirements (must follow exactly):
- Isometric 2.5D perspective, viewed from above-right at ~30-degree angle
- Big round chibi head (~60% of total figure), small chubby body, front paws tucked
- Calico three-color: white face/chest with asymmetric orange + dark-brown patches
- Triangle pointy ears, soft pink inside; tiny pink nose; small simple curve smile
- Bold solid black oval pupil eyes — NO whites, NO eyelashes, NO catchlights
- Solid flat vector colors, NO outline; subtle body gradient for depth
- LIGHT FROM UPPER-LEFT; a thin warm amber rim-light on the upper-left edge of the cat
- NO tile platform. The cat sits directly on the ground.
- Ground contact: ONLY a soft, blurred, semi-transparent WARM BROWN contact shadow hugging the paws (think rgba warm brown ~30% opacity, feathered edges) — not a grey oval, not a white tile
- Fully transparent background (PNG alpha), character centered, 1:1
- NO text, NO ui, NO frame, NO scene elements, NO background color

Reference: Duolingo "Lin / Junior / Lily" kawaii chibi vector art. Flat shading, clean edges.

This is the fusion anchor — its exact style + the no-tile + warm contact shadow will be reused for grandma, the shiba dog, the path, and props in this chat. Keep proportions, eye style, light direction identical.
```

### 不滿意時(複製貼)

| 想要 | 指令 |
|------|------|
| 白 tile 又跑回來 | "Remove the tile/platform entirely. The cat stands on bare ground, only a soft warm-brown contact shadow under the paws." |
| 陰影太硬 / 太灰 | "Make the contact shadow softer, blurred edges, and WARM BROWN (not grey). It should hug the feet, not be a hard oval." |
| 光向不對 | "Light must come from the upper-left; shadow falls lower-right; add a thin warm rim-light on the upper-left edge." |
| 邊緣像貼紙 | "Soften the silhouette edge slightly and add a faint warm rim-light so it reads as lit by the scene, not pasted on." |

---

## 👵🐕 Step B — De-tiled 奶奶 + Hana(同錨變體)

先貼 **Step 0 Style Lock**,再貼下面其一。

### 奶奶 Grandma
```
{SUBJECT} = An elderly grandmother chibi sitting, dusty-rose shawl over her shoulders, grey-white hair in a soft bun, round glasses, kind warm smile. NO tile platform — she sits directly on the ground with only a soft warm-brown contact shadow hugging her. Light from upper-left, thin warm rim-light on her upper-left edge. Transparent background.
```

### 柴犬 Hana
```
{SUBJECT} = A shiba inu dog chibi sitting, cream-and-tan fur, curled tail, perky triangle ears, gentle happy smile, small black pupil eyes. NO tile platform — sits directly on the ground with only a soft warm-brown contact shadow. Light from upper-left, warm rim-light upper-left edge. Transparent background.
```

---

## 🛤️ Step C — 地圖步道 PATH(節點坐上去)

paw 節點不要漂在平底上 → 給一條手繪步道讓它們串起來。

```
Generate a hand-painted Studio-Ghibli style winding PATH segment for a children's game map, top-down-ish to sit on an isometric ground plane.

- A soft warm dirt-and-stone path, gently curving (S-curve), like a cozy village trail
- Painterly but clean, warm palette tied to cream #f1ebe1 + amber #e7a44a, soft olive #7d9a4f grass edges
- Light from upper-left; subtle soft shadow on the lower-right side of the path edge
- The path should be TILEABLE / seamless vertically (top edge flows into bottom edge) so segments stack into a long trail
- Gentle hand-painted texture (small pebbles, faint grass tufts at the edges), NOT flat vector, NOT photorealistic
- Transparent background outside the path + grass border (PNG alpha)
- NO text, NO nodes, NO characters, NO ui
```

### 每章換色(refine)
```
Recolor this same path segment with a subtle {ACCENT} tint in the grass and stones, keeping the warm cream base. Same shape, same tileable edges, same light direction.
```
章 accent 參考:Ch0 olive `#8a9a6a` · Ch1 peach `#e98a52` · Ch2 blue `#5b91a5` · Ch5 purple `#7a6a9a` · Ch7 red `#c0473a`(其餘見 `MapPage.tsx` CHAPTER_META)。

---

## 🌿 Step D — 前景遮擋物 FOREGROUND(咬住角色底部)

各自獨立透明 PNG,**疊在角色前面**蓋住腳邊一點(`z-index` 高於角色)→ 角色種進去。

```
Generate a set of small Studio-Ghibli style FOREGROUND props on transparent background, each as a separate cutout, to layer IN FRONT of chibi characters' lower edge on a game map:
1. A small grass tuft (soft olive #7d9a4f, hand-painted blades)
2. A cluster of 2-3 smooth pebbles (warm brown + cream)
3. A few fallen leaves (amber #e7a44a + terracotta #c84a3a)
4. A small warm paper lantern on a short stick (soft glow, muted)

Requirements: painterly but clean, warm palette, LIGHT FROM UPPER-LEFT with soft lower-right shadow, transparent background each, NO text/ui. Each prop sized to overlap roughly the bottom 15-20% of a chibi character so the character looks planted in the ground.
```

---

## 🌅 Step E(選做)— painterly 地景帶(未來 🅱️ 升級)

> 平塗底想升沉浸版才做。先不急。

```
Generate a soft painterly Studio-Ghibli vertical background band for a children's map: a gentle gradient from warm pale sky at the top, to a soft meadow in the middle, to a slightly warmer foreground at the bottom. Muted, low-contrast (it must sit BEHIND characters and recede). Warm palette: cream #f1ebe1, soft amber, muted olive, hazy. NO hard details, NO text, NO characters. Slight atmospheric haze toward the top. Seamless left-right tiling.
```

---

## 🛠️ 通用 refine（任何一張漂掉）

| 症狀 | 指令 |
|------|------|
| 白 tile 復活 | "No tile, no platform. Ground-contact = soft warm-brown shadow only." |
| 陰影太灰太硬 | "Contact shadow: warm brown, blurred, hugging feet — not grey, not a hard oval." |
| 光向不一致 | "Re-anchor light: upper-left source, lower-right shadow, warm rim-light upper-left edge." |
| 步道接不起來 | "Make the path seamlessly tileable top-to-bottom so segments stack without a visible seam." |
| 太飽和 / 太鮮 | "Softer, muted, warm Ghibli pastel — cream/amber/olive, low saturation." |
| 前景沒法疊 | "Each prop as its own transparent cutout, sized to cover only the bottom 15-20% of a character." |

---

## 📤 catbox.moe 命名(滿意 → 儲存 → 上傳 → URL 貼回)

```
iso-mochi-notile.png       ← 去 tile 主角貓(新融合錨)
iso-grandma-notile.png     ← 去 tile 奶奶
iso-hana-notile.png        ← 去 tile 柴犬 Hana
map-path-segment.png       ← 步道(tileable)
map-path-ch{N}.png         ← 各章換色步道(選)
fg-grass-tuft.png          ← 前景草叢
fg-pebbles.png             ← 前景石頭
fg-leaves.png              ← 前景落葉
fg-lantern.png             ← 前景燈籠
map-band-painterly.png     ← painterly 地景帶(選做)
```

URL 貼回後我會:`curl` 下載 → `rembg` 補去背(若還有殘底)→ 接進 `MapPage`:步道墊在節點層下、角色用 no-tile 版 + 暖棕接地陰影、前景物 `z-index` 疊角色前。Build + deploy。

---

## ⚠️ 重點

- **全部同一 chat session 生**(風格錨在 chat memory),先磨好 `iso-mochi-notile` 再接其他。
- **死命強調**:NO white tile / NO outline / light upper-left / warm-brown contact shadow。這四條一鬆就破功。
- 既有 `Pickup-isometric-character-prompts.md` 的白 tile 版 = 給「卡片 / NPC 肖像」用;**地圖上一律用這份的 no-tile 版**。
- POV painterly 場景(Ch1 看出去那層)不變,跟這層不同用途。

---

**v2.0.B.505+ · Claude** · companion to `Pickup-isometric-character-prompts.md`
