# Pickup POV Scene Prompts — Ch1 v1.6.0

> 目的：每一題的「第一視角動圖」背景。共 6 張，對應 Ch1 q1-q6。
> 工作流：同一個 ChatGPT / Gemini chat 全程開著，先生 anchor scene，後面 5 張靠 chat memory 保風格。

---

## 🎯 流程

| Step | 做什麼 | 時間 |
|------|--------|------|
| 1 | 開 ChatGPT 或 Gemini（**全程同一 chat**） | - |
| 2 | 貼 **Step A Anchor Prompt**(雨夜街景)→ 生 5-8 次到滿意 | 15 min |
| 3 | 同 chat 繼續貼 q2-q6 五個 prompt | 25 min |
| 4 | 每張下載 → 命名 `ch1-q1.png` ... `ch1-q6.png` | 5 min |
| 5 | 一次 6 張上傳 catbox.moe → URL 貼給我 | 5 min |
| 6 | 我自動下載 → 放 `public/pov/` → deploy v1.6.1 | 我 5 min |

**最終尺寸**：建議 1280×800 或 1600×900（橫向，CSS `background-size: cover` 會自動裁切）。
**重要**：**這是「貓的眼睛看出去」的視角**，不要畫貓本身。

---

## Step A — Anchor Prompt (q1：雨夜的開始)

```
Generate a first-person POV background scene from the eyes of a small stray kitten,
crouched on a cold wet street at night.

Subject: What the kitten sees — NOT the kitten itself.
- Looking down a dark rainy alley from low cat height (~20cm from ground)
- Wet asphalt reflecting yellow streetlight glow ahead
- Cardboard box edge visible in lower-left corner (we're hiding behind it)
- Soft rain falling diagonally, slight motion blur on droplets
- Warm orange streetlamp casts pool of light 4 meters ahead
- Distant blurred building silhouette, soft bokeh
- No human or animal characters in frame
- Atmosphere: lonely, cold, but a sliver of hope from the lamplight

Style:
- Studio Ghibli warm-cool palette: dark teal shadows, amber highlights, rain blue
- Painterly with visible brushwork, soft edges, slight grain
- Cinematic 16:9 horizontal composition
- Depth of field — foreground sharp, distance soft
- Moody atmosphere, NOT cute sticker style (this is the scene the cat lives in)
- Inspired by Spirited Away night street scenes
- No text, no UI, no character

This anchor scene's color palette + composition + mood will guide 5 more scenes
in this chat. Same painterly style throughout.
```

**不滿意的調整指令**：

| 想要的方向 | 指令 |
|-----------|------|
| 太亮 | "Darker, the only light is the single streetlamp ahead" |
| 太工整 | "More painterly brushwork, less photorealistic" |
| 沒下雨感 | "Stronger diagonal rain streaks, visible droplet motion" |
| 太遠 | "Lower POV, closer to ground — we are a cat" |
| 太多東西 | "Simpler composition, focus on the streetlamp pool of light" |
| 色調太冷 | "Warmer amber glow in the lamplight, more contrast with cold blue rain" |

---

## Step B — Per-question prompts (q2-q6, 同 chat 接續)

每個用這段，把 `{SUBJECT}` 換成下方對應內容：

```
Generate the next POV scene in the EXACT SAME STYLE as the rainy alley above.
Same painterly Ghibli mood, low cat-height perspective.

Subject: {SUBJECT}

Same style requirements:
- First-person POV from kitten's eyes — NO kitten in frame
- Painterly Ghibli, warm-cool palette
- Cinematic 16:9 horizontal
- Depth of field
- Cohesive with the rainy alley anchor
```

### q2 — 「My fur is wet. I feel very ___」(冷)

**`{SUBJECT}`** = Looking down into a puddle on the wet ground. Tiny ripples from raindrops hitting the surface. Reflection shows fragmented streetlamp light + dark sky. Cold blue-grey dominates. Edges of cardboard visible blurred in the corners. Mood: shivering, isolated.

### q3 — 「I have not eaten since yesterday. I am so ___」(餓)

**`{SUBJECT}`** = Looking up at a closed shop window in the rain. Through the glass we can faintly see a warm-lit interior with bread or dim food shapes, but the glass is wet and our breath fogs it. Yellow window glow vs cold blue rain outside. Mood: longing, separated by glass.

### q4 — 「A big shadow comes close. The kitten is ___」(怕)

**`{SUBJECT}`** = A large dark silhouette of legs and an umbrella approaches in the rain, blurred and ominous, walking toward us. Low POV emphasizes how huge the figure is. Streetlamp behind throws long shadow. Mood: tense, unsure if threat or savior.

### q5 — 「It is a grandma with a blue umbrella. She has a ___ face」(慈)

**`{SUBJECT}`** = Looking up at an elderly woman's gentle face from below — she has bent down, soft eyes meeting ours, holding a blue umbrella that catches the streetlamp glow. Her face is the focus, slightly soft in painterly style, kind crinkles around eyes. Mood: relief, warmth breaking through.

### q6 — 「The grandma ___ her umbrella over me」(撐)

**`{SUBJECT}`** = Looking up at the underside of a blue umbrella, raindrops splashing on its surface. Grandma's silhouette holding the handle visible at top, her dim warm face peeking down. Rain has STOPPED hitting us — we are sheltered. Mood: protected, the turning point.

---

## 📤 完成後

上傳順序固定：
```
ch1-q1.png  ← 雨夜街景
ch1-q2.png  ← 水窪倒影
ch1-q3.png  ← 食物櫥窗
ch1-q4.png  ← 大影子靠近
ch1-q5.png  ← 阿嬤的臉
ch1-q6.png  ← 傘下視角
```

把 6 個 catbox URL **照順序**貼給 Claude Code，我會：
1. `curl` 全部下載到 `public/pov/`
2. （可選）用 rembg 銳化或裁切
3. Build + commit + deploy v1.6.1

---

## ⚠️ 重點提醒

- **全 6 張必須同 chat session 生**（後面 5 張靠 chat memory 維持風格一致）
- Anchor 沒磨好不要接 q2-q6，後面會跟著垮
- **這不是 sticker，這是場景** — 不要 kawaii / 卡通邊；要 painterly + atmospheric
- **絕對不要畫到貓本身** — 第一視角是「貓看出去」不是「看貓」
- 中文母語的你看了 q2-q6 的中文題目，自己判斷 prompt 的場景對不對；不對就請 AI 重畫

---

**v1.6.0 scope**：Ch1 6 張 POV scene。Ch2-8 變體之後（v1.7+）再做。
