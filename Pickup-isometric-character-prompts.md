# Pickup Isometric Character Prompts — Duolingo-style

> v1.7.6 視覺方向(2026-05-26 用戶確認):**所有出場角色**(主角貓、NPC、人類、動物)統一 isometric chibi 風,類似 Duolingo Lin/Junior/Lily。小裝飾/icon 可混用,但凡是有「人格」的東西都這個 style。

---

## 🎯 工作流(務必照順序)

| Step | 做什麼 | 時間 |
|------|--------|------|
| 1 | 開 ChatGPT 或 Gemini(**全程同一 chat**) | - |
| 2 | 貼 **Step A Anchor Prompt**(三花貓)→ 生 5-10 次直到滿意 | 10-20 min |
| 3 | (可選)上傳一張 Duolingo 截圖當 style reference,告訴它「same style as this」 | 1 min |
| 4 | 同 chat 貼 Step C 的 NPC prompts,一個一個生 | 30-45 min |
| 5 | 每張下載 → catbox.moe 上傳 → URL 貼回 Claude Code | 10 min |
| 6 | 我用 rembg 去背 → 自動整合 deploy | 我 15 min |

**⚠️ 關鍵**:全程**同一 chat session**,後面的角色靠 chat memory 維持風格一致。anchor 沒磨好就接 NPC 會風格漂走。

---

## 🐈 Step A — Anchor Prompt(三花貓主角)

把這整段複製貼進 ChatGPT 或 Gemini:

```
Generate an isometric chibi character sticker in Duolingo's character design system style.

Subject: A calico (三花) cat sitting upright on a small white square tile platform with a soft drop shadow below the tile.

Style requirements (must follow exactly):
- Isometric 2.5D perspective, viewed from above-right at ~30-degree angle
- Big round chibi head (about 60% of total figure), small chubby body
- Sitting upright pose, front paws tucked, looking forward gently
- Calico three-color pattern: white face/chest with asymmetric orange patches and dark brown/black patches
- Triangle pointy ears on top, soft pink inside
- Tiny pink triangle nose, small simple curve smile
- Bold black solid oval pupil eyes — NO whites visible, NO eyelashes, NO catchlights (simple Duolingo-style dots)
- Solid flat vector colors, NO outline or extremely thin outline only
- Subtle gradient on body for depth (light from upper-left)
- Small white square tile platform under the cat, soft circular grey drop shadow beneath the tile
- Soft cream pastel background #fef8ed, no scene elements
- Square 1:1 composition, character centered
- NO text, NO ui, NO frame, NO logo

Reference: Duolingo's "Lin", "Junior", "Lily" character art system. Kawaii chibi vector illustration, flat shading, clean edges.

This anchor cat's exact style will be reused for 6 more characters in this chat — keep colors, proportions, eye style identical going forward.
```

### 生不滿意時的調整指令(複製貼)

| 想要的方向 | 指令 |
|----------|------|
| 太多黑邊 | "Remove the outline entirely, use only solid color blocks like Duolingo" |
| 頭太小 | "Bigger head, ~60% of total figure height, smaller body" |
| 眼睛太細 | "Bigger, bolder black oval eyes, no whites, like Duolingo Lin's eyes" |
| 不夠 isometric | "Stronger isometric perspective, viewed from above-right, the tile platform should look like a cube" |
| 太擬人 | "Smaller body, chubbier, more chibi, less realistic anatomy" |
| 顏色太鮮豔 | "Softer pastel tones, warm cream and amber palette, not saturated" |
| 三花不明顯 | "Make the calico pattern clearer — asymmetric orange + dark brown patches on a white base" |
| 沒有平台 | "Add the small white square tile platform under the cat, with a soft circular shadow beneath" |

滿意後:右鍵儲存 → 命名 `iso-cat-anchor.png` → catbox.moe 上傳 → URL 給我。

---

## 🎨 Step B — Style Lock(每個 NPC 前面貼這段)

每生新角色前,在 chat 裡先重複這段確認風格不漂:

```
Use the EXACT same isometric chibi style as the calico cat anchor above.
- Same big-head-small-body proportions
- Same flat vector colors, no outline
- Same bold pupil-only eyes (no whites)
- Same white tile platform with soft shadow
- Same cream pastel background
- Same Duolingo character design system reference

The only thing that changes is the subject.
```

---

## 🐾 Step C — Per-NPC Prompts

對應 Ch1 + 故事後續會用到的 NPCs。把 `{SUBJECT}` 換成下方對應內容,連同 Style Lock 一起貼。

### NPC 1 — 阿嬤(Ch1 q5-q6 核心,撐傘給三花貓)

```
{SUBJECT} = An elderly grandmother chibi character sitting on a white square tile platform. Wearing a dusty rose shawl over her shoulders. Holding a small light blue umbrella in her right hand (slightly tilted). Grey-white hair tied in a soft bun, round glasses perched on her nose. Kind warm smile, gentle eyes. Same Duolingo isometric style as the cat anchor.
```

### NPC 2 — 老黑貓 mentor(Ch2 街頭智者,Ch6 ghost mentor)

```
{SUBJECT} = An older wise BLACK cat sitting on a white square tile platform. Same chibi proportions as the calico anchor but slightly larger / more mature posture. Solid black fur, ONE scar across the right eye, slightly weathered look. Half-closed wise eyes, gentle knowing smile. Long white whiskers prominent. Same Duolingo isometric style.
```

### NPC 3 — 麵包師(Ch3 麵包店)

```
{SUBJECT} = A plump baker chibi character sitting on a white square tile platform. Wearing a white chef hat with a small gold star pin and a warm tan apron with flour dust. Round cheerful face, rosy cheeks, big warm smile. Holding a small piece of bread in his hand. Floury fingers. Same Duolingo isometric style as the cat anchor.
```

### NPC 4 — Meimei 小女孩(Ch4 秘密之友)

```
{SUBJECT} = A little girl chibi character (about 7 years old) sitting on a white square tile platform. Twin braids tied with bright pink ribbons. Bright pink dress with a small white collar. Big shining eyes, joyful open smile showing one tooth. Holding a tiny soft toy or biscuit in her hands. Same Duolingo isometric style as the cat anchor.
```

### NPC 5 — Brutus 老黑狗(Ch4+ 街頭家人核心)

```
{SUBJECT} = An older street dog chibi character sitting on a white square tile platform. Brown fur with tan muzzle, ONE scar over the right eye. Slightly droopy ears, head tilted with a wise weathered expression. Solid friendly posture, not aggressive. Same chibi proportions and Duolingo isometric style as the cat anchor.
```

### NPC 6 — Family huddle(Ch8 圓滿,Meimei + 爸媽)

```
{SUBJECT} = Three chibi characters huddled together on one shared white square tile platform: a mom, a dad, and the little girl Meimei (with pink ribbons) in the center. Warm group hug pose, all smiling softly. Mom in soft amber sweater, dad in muted brown shirt. Same Duolingo isometric style as the cat anchor.
```

### NPC 7 — 神社靈(Ch7 supernatural)

```
{SUBJECT} = A mystical translucent shrine spirit chibi cat character sitting on a white square tile platform. Pearlescent shimmer outline, semi-transparent body, soft glowing aura. Cat shape but ethereal, with subtle moon-pale color palette mixed with the warm cream base. Same Duolingo isometric proportions. Mystical but still chibi-cute, not scary.
```

---

## 🛠️ 通用 refine 指令(任何一張不對)

| 想要 | 指令 |
|------|------|
| 不夠像 anchor | "EXACT same style as the calico cat anchor above. Same outline weight, same eye style, same tile platform." |
| 配色失控 | "Stay in warm Ghibli-Duolingo palette: cream, amber, dusty rose, warm dark brown, soft pink, muted blue." |
| 太成熟 | "More chibi, smaller body, bigger head, cuter overall — like Duolingo Lin proportions." |
| 風格漂走 | "You drifted from the calico cat anchor style. Re-anchor: solid flat colors, no outline, bold pupil eyes, white tile platform, cream background. Try again." |

---

## 📤 完成後 catbox.moe

每張滿意 → 儲存 → 取名照下面 → catbox.moe 上傳:

```
iso-cat-anchor.png       ← 三花貓主角
iso-grandma.png          ← 阿嬤
iso-mentor-cat.png       ← 老黑貓 mentor
iso-baker.png            ← 麵包師
iso-meimei.png           ← Meimei
iso-brutus.png           ← Brutus 老黑狗
iso-family.png           ← Family huddle
iso-shrine-spirit.png    ← 神社靈
```

URL 一個一個照順序貼回 Claude Code(或一次貼多個都行)。

我會:
1. `curl` 全部下載
2. 跑 `tools/remove_bg.py`(rembg AI 去背)
3. 替換現有 SVG 貓臉(進站 / 地圖 / loader 全用新圖)
4. Build + commit + deploy v1.8.0

---

## ⚠️ 重點提醒

- **全 8 隻必須同 chat session 生**(風格錨在 chat memory)
- Anchor 沒磨好不要接 NPC,後面會跟著垮
- **強調 NO outline**(很多 AI 預設加粗黑邊,Duolingo 是無邊純色塊)
- **強調 isometric tile platform**(沒平台會變成單純的 portrait,失去 Duolingo 感)
- 同 chat 一天有 free 額度限制 → 用完隔天繼續(chat memory 還在)

---

## 🔄 跟既有「sticker 平面三花貓」的關係

- **這個 isometric 系列 = 新主視覺**,進站 / 地圖 / loader / NPC cards 全換
- **既有 sticker 版本三花貓**(在 `public/mascots/calico-anchor.png`)= 廢棄,不再用
- **POV 場景(painterly Ghibli)**= 保留,那是貓「看出去」的視角不顯示貓本人,跟 character art 是不同層

---

**v1.7.6 用戶**:Claude Code
**對應 Stable Horde POC**:`tools/generate_isometric_cat.py`(同 prompt 已在 queue,大概 30-40 min 出來,你可以 manual 同時跑互相比較)
**對應 repo**:github.com/kengkeng44/pickup
