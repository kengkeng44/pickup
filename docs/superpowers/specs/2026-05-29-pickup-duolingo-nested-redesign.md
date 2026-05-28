# Pickup v2.0 — Duolingo-Nested Redesign

> **Status**: Design draft, awaiting user approval.
> **Author**: jenho.cheng (鄭仁和) + Claude Opus 4.7
> **Date**: 2026-05-29
> **Brainstorm session**: 2026-05-28 → 2026-05-29
> **Supersedes**: CLAUDE.md「主打故事:小貓回家路 8 章 + false-ending」整段 + `tools/draft-ch2-8/` 全部草稿

---

## 1. Vision

Pickup 從「**小貓回家路 8 章 quest arc**」reframe 成「**奶奶的 8 個說故事夜晚**」slice-of-life。

### Thesis 保留
- 三花貓 protagonist(Mochi,英文 default,玩家可改名)
- 「愛哭鬼但堅韌」性格底色
- 「下班逃逸 + Ghibli」tone
- A2 cloze + 7 題型 + SRS lite + 難度系統

### Genre 改變
| | 舊 quest arc | 新 slice-of-life evenings |
|--|------|------|
| Tension | 「貓會找到家嗎」 | 「今晚奶奶說什麼故事」 |
| Pacing | escalating(Ch5 false-ending → Ch8 climax) | flat(每章 mood 不同,無 climax) |
| Ending | 留街頭 narrative pivot | 無大結局,Ch8 也是「又一個夜晚」 |
| 玩家動機 | 看劇情 | 聽故事 + 學英文 |
| Re-play | 看完結局沒理由回來 | 內容可無限擴充(Ch9+ 新故事) |
| Vocab | 8 章 linear 累積 | 每章獨立 theme cluster |

### Outer Frame(8 章 recurring)

```
Mochi(三花貓 / 流浪)
   ↓ 每晚跳上奶奶矮牆
花花(柴犬 / 奶奶養)趴她腳邊
奶奶坐椅子 / 月光 / 翻舊書聲
   ↓
奶奶開始說故事 →
   [Inner stories — 每章不同的 PD 童話組合]
   ↓
Goodnight / 燭火吹熄 / Mochi 跳走
```

---

## 2. Architecture: Duolingo-Nested Model

### Hierarchy (重要 — 跟現行 Pickup 模型不同)

```
Chapter (1 of 8 evenings)
  ├─ 24 Lessons (Duolingo path 上的 buttons)
  │   ├─ Lesson 1 ("Mochi 跳牆")
  │   │   ├─ Q1 (listen-mc, ~10 字以下)
  │   │   ├─ Q2 (tap-tiles)
  │   │   ├─ Q3 (type-what-you-hear)
  │   │   ├─ Q4 (listen-emoji)
  │   │   └─ Q5 (listen-comprehension)
  │   ├─ Lesson 2 ("花花搖尾巴")
  │   │   ├─ Q1-Q5
  │   └─ ...
```

### Model 對比

| 舊(v1.9.54) | 新(v2.0 Duolingo-nested) |
|------------|--------------------------|
| Map: 8 paw nodes/章 | Map: 24 lesson buttons/章 |
| 點 node = 1 題全螢幕 | 點 button = lesson modal 5-15 Q 序列 |
| Q 答完 auto-advance 到下個 node | Q 答完內部 advance,完成 lesson 才回 map |
| schema: flat `StoryQuestion[]` | schema: `Lesson[]` with nested `questions[]` |
| 章總題數: 8 | 章總題數: ~120(24 × ~5) |

### 為什麼 nested?
1. **Cognitive flow** — Duolingo 9 年 A/B test 學到:連續 5-15 Q 進入 flow,中間切到地圖打斷 momentum
2. **Vocab repetition density** — 同 lesson 內 vocab 多次曝光 → 短期記憶 → 長期記憶 conversion
3. **內容彈性** — 1 個故事可以 1-9 lessons,長故事自然展開,短故事不被硬擠
4. **產品認知** — 玩家對 Duolingo path 已熟悉,降低學習成本

---

## 3. Chapter Template (24 buttons / 章)

每章共 24 個 lesson buttons,Arabian Nights 結構:

```
┌────────────────────────────────────────┐
│ OUTER PROLOGUE (3 buttons)             │
│   L1  Mochi 跳上矮牆                    │
│   L2  花花迎接搖尾                       │
│   L3  奶奶打開故事書                     │
├────────────────────────────────────────┤
│ MAIN STORY (12-15 buttons)             │
│   主菜童話,專屬體裁                       │
│   e.g. 桃太郎 8 lessons = 桃→男孩→狗   │
│        →猴→雉→鬼島→打→歸                │
├────────────────────────────────────────┤
│ AESOP SIDES (6-9 buttons, 2-3 篇)      │
│   每篇 3-4 lessons                       │
│   e.g. 龜兔賽跑 + 風與太陽                │
├────────────────────────────────────────┤
│ OUTER OUTRO (1-2 buttons)              │
│   Goodnight / 月落 / Mochi 跳走         │
├────────────────────────────────────────┤
│ REVIEW (1 button)                      │
│   tap-pairs 今晚 key vocab × 4         │
└────────────────────────────────────────┘
合計 = 24 buttons,每 button 5 Q,總 ~120 Q / 章
```

### Lesson 內部 Q 流(Duolingo-clone)

每 lesson 5-15 Q,Q 短(Duolingo length 1 句 / 4 選 1):
- Q1-Q2: introduce 新詞(listen-mc, listen-emoji)
- Q3-Q4: reinforce(type-what-you-hear, tap-tiles)
- Q5: comprehension(listen-comprehension)

Lesson 完成判定:**force-correct + blindRetry**(沿用 v1.9.54 機制)。

---

## 4. 8 Chapter Starter Pack

| Ch | 主菜 | 主菜體裁 | Aesop sides (suggested) | Mood |
|----|------|---------|------------------------|------|
| 1 | 🌧️ 雨夜小貓(carry, expand) | 直接體驗 1st-person POV | 螞蟻與蚱蜢 / 北風與太陽 | 起始 / 認識角色 |
| 2 | 🍑 桃太郎(Momotaro) | 累積連鎖體(9 lessons:撿桃→切→男孩→狗→猴→雉→鬼島→打→歸) | 龜兔賽跑 / 狼來了 | 冒險 / 動物友誼 |
| 3 | 🦢 醜小鴨(Andersen) | 第一人稱內心獨白 | 獅子與老鼠 / 牧羊人與狼 | 自我認同 |
| 4 | 🐢 龜兔賽跑(Aesop, 升 main) | 對話體 alternating quote | 烏鴉與狐狸 / 城市鼠與鄉村鼠 | 競爭 / 智慧 |
| 5 | 🐪 駱駝為什麼有駝峰(Kipling Just So) | Kipling "O Best Beloved" 第二人稱 | 蘆葦與橡樹 / 老鼠開會 | 寓言 / 因果 |
| 6 | 🏚️ Baba Yaga 雞腳屋(Russian) | 黑暗民俗 sparse(短句、留白、不解釋) | 漁夫與妻子 / 七張床 | 黑暗 / 冬夜 |
| 7 | 🦢 六隻天鵝(Grimm 冷門) | 無對話 + 詩意 narration | 三個願望 / 老鼠新娘 | 沉默 / 救贖 |
| 8 | 🏺 葉限(唐代 灰姑娘原型,中華 PD) | bilingual code-switch 中英混雜 | 田螺姑娘 / 嫦娥奔月 | 文化收尾 / 月亮 |

### 故事 → lessons 估算

- **主菜 12-15 lessons**(中型故事 12,長故事 15)
- **每 Aesop 短篇 3-4 lessons**(超短 3,4-5 Q 各)
- 2-3 Aesops / 章 = 6-12 lessons
- **outer 3-5 lessons**(prologue 3 + outro 1-2)
- **review 1 lesson**(tap-pairs)

合計 24 lessons / 章。

### PD 故事池(可擴充)

**主菜候選(每章 12+ lessons 能撐)**
- 西方:Snow White / Hansel & Gretel / Cinderella(Perrault 原版)/ Rapunzel / Jack and the Beanstalk / Three Little Pigs(Jacobs)/ Wizard of Oz / Alice in Wonderland
- 日本:桃太郎 / 浦島太郎 / 鶴の恩返し / 笠地藏
- 俄羅斯:Baba Yaga / Firebird / Vasilisa
- 中華:葉限 / 田螺姑娘 / 白蛇傳 / 嫦娥奔月
- Kipling Just So:駱駝 / 大象 / 犀牛 / 鯨 / 豹 / 字母怎麼來

**Aesop 短篇池(100+ 可用)**
- 龜兔賽跑、狼來了、狐狸與葡萄、螞蟻與蚱蜢、北風與太陽、獅子與老鼠、烏鴉與狐狸、牧羊人與狼、漁夫與妻子、老鼠開會、城市鼠與鄉村鼠 ...

### 8 章後的擴充路徑
Ch9-12 可以加:Snow White / Aladdin / 浦島太郎 / Alice in Wonderland。Slice-of-life genre 沒結局壓力,內容可永續產出。

---

## 5. Schema Changes

### 新 Schema(`src/data/lessons.ts`新檔)

```typescript
import { z } from 'zod';

// Story segment within a chapter — main / side / outer / review
export const SegmentTypeSchema = z.enum([
  'outer-prologue',   // Mochi 跳牆 / 奶奶開書 etc
  'main-story',       // 主菜童話 lessons
  'aesop-side',       // 甜點短篇
  'outer-outro',      // Goodnight
  'review',           // tap-pairs 章末
]);

export const ChapterIdSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4),
  z.literal(5), z.literal(6), z.literal(7), z.literal(8),
]);

// Lesson = a Duolingo path button
export const LessonSchema = z.object({
  id: z.string(),                        // e.g. "kt-ch2-momotaro-l3"
  chapter: ChapterIdSchema,
  lessonInChapter: z.number().int().min(1).max(24),
  segmentType: SegmentTypeSchema,
  storyId: z.string().optional(),        // group lessons by story (e.g. "momotaro" / "tortoise-and-hare")
  storyBeat: z.string().optional(),      // 中文 ≤25 字描述本 lesson 在故事中的位置
  questions: z.array(QuestionSchema).min(3).max(15),
});

export const LessonsSchema = z.array(LessonSchema);

// Each Question is a discriminated union by `type` —
// fixes the v1.8.3 tap-tiles options.tuple(4) bug from kt-ch1-06
export const QuestionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('listen-mc'),
    id: z.string(),
    level: ClozeLevelSchema,
    difficulty: DifficultySchema.optional(),
    sentence: z.string(),
    question: z.string().optional(),
    options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
    correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
    explanationZh: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  // listen-emoji, listen-comprehension, read-mc-with-audio, type-what-you-hear
  // share the same shape as listen-mc — 4 options
  // ...
  z.object({
    type: z.literal('tap-tiles'),
    id: z.string(),
    level: ClozeLevelSchema,
    difficulty: DifficultySchema.optional(),
    sentence: z.string(),
    question: z.string().optional(),
    tiles: z.array(z.string()).min(3).max(12),       // variable length, no more max(4) lie
    correctOrder: z.array(z.number().int()).min(2),  // indices into tiles
    explanationZh: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  z.object({
    type: z.literal('tap-pairs'),
    id: z.string(),
    level: ClozeLevelSchema,
    difficulty: DifficultySchema.optional(),
    sentence: z.string(),
    question: z.string().optional(),
    pairs: z.array(z.object({
      left: z.string(),
      right: z.string(),
    })).length(4),
    explanationZh: z.string(),
    tags: z.array(z.string()).optional(),
  }),
]);
```

### Data file 重組

```
public/
├── lessons-ch1.json    # 24 lessons, ~120 Q (Ch1 v2.0)
├── lessons-ch2.json    # Ch2 桃太郎 chapter
├── lessons-ch3.json    # Ch3 醜小鴨 chapter
├── ...
└── lessons-ch8.json    # Ch8 葉限 chapter
```

(舊 `public/story-kitten.json` → archive to `public/legacy/story-kitten-v1.9.json` 或刪除)

### loadLessons 函式

```typescript
export async function loadChapterLessons(ch: ChapterId): Promise<Lesson[]> {
  const res = await fetch(`/lessons-ch${ch}.json`);
  if (!res.ok) throw new Error(`...`);
  const raw = await res.json();
  const parsed = LessonsSchema.parse(raw);
  // applyCatName injection same as v1.9.52
  return parsed.map((l) => ({
    ...l,
    questions: l.questions.map((q) => ({
      ...q,
      sentence: applyCatName(q.sentence),
      explanationZh: applyCatName(q.explanationZh),
    })),
  }));
}
```

---

## 6. UI / Map / Code Changes

### `src/scenes/PlayScene.ts` → split into LessonScene + map
- 點 map button → push LessonScene with `lessonId`
- LessonScene 內部 run 5-15 Q sequence(類似現 PlayScene 但限定在 lesson scope)
- Last Q 答完 → return to map,mark lesson complete,unlock next

### `src/ui/StoryMapView.ts` 重大改動
- `NODE_PATH` 從 8 positions → **24 positions / 章**
- 路徑 winding (Duolingo curvy snake path,不是直線)
- 每 chapter map 變長很多 — needs vertical scroll or paginated zones
- `CH1_BEAT_LABELS` 廢棄 (24 個 label hard-coded 太重複) → 改 lesson.storyBeat 動態
- Lock / unlock visual:同 v1.9.54(灰色 paw locked、unlocked pop animation)

### `src/store/runStore.ts`
- 新增 `currentLessonId`(map → lesson 之間的 navigation state)
- 進度 track:`pickup.chapter.X.lessonsCompleted` localStorage(Set<lessonId>)
- 每 lesson 完成 += XP(維持 XP / level / streak 機制)

### Phaser scenes 修整
- `BootScene` 不變
- `MenuScene` 不變
- `PlayScene` → `LessonScene`(rename + scope 縮到 1 lesson)
- `StoryMapView` 重做 24-node path
- `ChapterIntroScene` / `ChapterEndScene` / `StoryEndingScene` 廢棄或重命名
  - ChapterIntro 改成 outer-prologue lessons 第一個 lesson 內 narration
  - StoryEnding 廢棄(沒結局)

### Audio
- TTS narrator 不變(用 web speech API)
- 奶奶說故事的 voice "feel" 透過慢速 rate (0.85, v1.9.38 set) 達成
- BGM `peace.mp3` 維持

---

## 7. Migration Plan(實作順序)

### Phase A — Schema + UI scaffolding(無 content)
1. 新建 `src/data/lessons.ts` (Lesson schema + loader)
2. Refactor `ClozeQuestionSchema` → discriminatedUnion (順手修 kt-ch1-06 tech debt)
3. `LessonScene` 從 `PlayScene` fork,scope 縮到 1 lesson
4. `StoryMapView` 加 `viewMode: 'legacy-8-nodes' | 'v2-24-buttons'` toggle
5. 1 個 dummy chapter (3 lessons × 3 Q) 驗證 plumbing

### Phase B — Ch1 v2.0 migration(prototype the model)
1. Convert `public/story-kitten.json` Ch1 8 Q → 24 lessons (~120 Q)
2. 重寫 Ch1 主菜「雨夜小貓」展開成 12 lessons
3. 加 2-3 Aesop sides (螞蟻與蚱蜢、北風與太陽)
4. Outer prologue + outro lessons
5. Ship Ch1 v2.0 to production,YOU 玩過確認 model 體感對

### Phase C — Ch2-8 batch(可走 autonomous loop)
- 每章 ~120 Q,1 autonomous session 可能寫 1-2 章
- 主菜照體裁 mapping (Section 4 表) 各章不同
- 每章寫完先 deploy preview,YOU 試玩給 thumbs / 重寫意見
- 8 章全完 = v2.0 全 ship

### Phase D — Polish + ship v2.0
- Map UX 校正(24 nodes 視覺密度)
- Vocab cumulative SRS 跨章 pool 接好
- Audio narrator vibe 校(可能引入「翻書聲」「燭火劈啪」SFX)
- DEV_UNLOCK_ALL flip = false
- Paywall gate (僅 Ch3+ 收費 / Ch1-2 免費試吃)— 另開 sibling spec

---

## 8. Content Roadmap(規模)

| Ch | Lessons | Q (avg 5/lesson) | Stories included |
|----|---------|-----------------|------------------|
| 1 | 24 | 120 | 雨夜小貓 + 2 Aesop |
| 2 | 24 | 120 | 桃太郎 + 2 Aesop |
| 3 | 24 | 120 | 醜小鴨 + 2 Aesop |
| 4 | 24 | 120 | 龜兔賽跑 + 2 Aesop |
| 5 | 24 | 120 | 駱駝駝峰 + 2 Aesop |
| 6 | 24 | 120 | Baba Yaga + 2 Aesop |
| 7 | 24 | 120 | 六隻天鵝 + 2 Aesop |
| 8 | 24 | 120 | 葉限 + 2 Aesop |
| **總** | **192** | **~960** | **8 主菜 + ~16 短篇 = 24 stories** |

### 工程量估算
- Phase A: ~8 hr(schema + UI scaffolding)
- Phase B: ~12 hr(Ch1 v2.0 重寫 + ship)
- Phase C: ~60 hr(7 × 8-9 hr/章,可 autonomous batch)
- Phase D: ~10 hr(polish + paywall stub)
- **總 ~90 hr** 純工程,~3-4 週鬆做

### 內容 vs 工程比例
~960 Q content writing 占主要時間,工程 plumbing 一週搞定。Pickup v2.0 的真正 bottleneck 是「奶奶說了哪些故事」(content),不是「app 怎麼跑」(code)。

---

## 9. Tech Debt Cleanup(隨設計順手做)

### 9.1 ClozeQuestionSchema → discriminatedUnion
**Why now**:kt-ch1-06 production bug 的 root cause 是 `options: z.tuple([4])` 對 tap-tiles 失效。新 schema 自然走 discriminatedUnion by `type`,順手解掉。**這次重寫 schema 是唯一機會,以後再做要 migrate 全部內容。**

### 9.2 CH1_BEAT_LABELS 廢棄
**Why now**:24 個 label hard-coded 太重複,且新 lesson 自帶 storyBeat,直接渲染 storyBeat 即可。

### 9.3 DEV_UNLOCK_ALL flag 確認 false before ship
**Why**: v1.0 ship 前 hardcoded 要 flip 回 false + production sanity check。

### 9.4 CLAUDE.md 整段「8 章 quest arc」廢棄,改寫成「8 個 storytelling evenings」
**Why**:CLAUDE.md 是給下個 Claude session 的 onboarding,描述跟實作衝突會誤導所有後續開發。

---

## 10. Vocab + SRS Strategy

### 每章 vocab pool
- ~150 unique A2 words / 章(120 Q × 1.2 word/Q 約)
- 主菜貢獻 ~80 words(該童話 theme cluster)
- Aesop sides 貢獻 ~40 words(短故事 keyword)
- Outer scene 貢獻 ~20 words(夜晚 / 月亮 / 翻書 等)
- Review 1 button 抓 4 個 key words tap-pairs

### Cumulative
- A2 全部 ~1500 words(CEFR-J A2 estimate)
- 8 章 × 150 = 1200 words exposure(含 review)
- Unique: ~700 words 跨 8 章 cumulative
- v2.0 完整覆蓋 A2 主要 vocab,適合 TOEIC 500-700 / IELTS 4-5 學生

### SRS 跨章
- 維持 v1.9.x SRS lite:答錯進 review 池
- 跨章 review:Ch{N+1} 開頭 outer-prologue lessons 抽 Ch{1..N} 答錯題 1-2 個

---

## 11. Open Questions(進 plan phase 再決)

1. **Map UX**:24 buttons 是垂直 scroll 還是水平 winding zones?
2. **Audio**:奶奶 narrator 要不要錄人聲(非 TTS)?成本 / 品質 trade-off。
3. **Mascot art**:24 lessons × 8 章 = 192 個 storyBeat,每個要不要單獨 mascot scene?還是只主菜配 mascot,Aesop sides 用通用 illustration?
4. **Paywall split**:Ch3-8 收費 or Ch5+?或 freemium "free 1 章 / day"?
5. **Cross-chapter persistence**:玩家中途換章節重玩(non-linear)allowed 嗎?
6. **Question type weighting**:每 lesson 5 Q 中題型 distribution(2 listen-mc + 1 tap-tiles + 1 type-what-you-hear + 1 listen-comprehension?或彈性)?
7. **Bilingual integration**:Ch8 葉限 雙語 code-switch 體裁 — 其他章節要不要也適度引入中文(降低 cognitive load)?
8. **Streak 跨章**:現 streak 是 daily,跨章節玩會中斷嗎?

---

## 12. Out of Scope(v2.0 不做)

- ❌ iOS native app(Capacitor + Codemagic 是 Phase 2.5,獨立 spec)
- ❌ Auth / 用戶帳號(Phase 3 backend 獨立 spec)
- ❌ Cloud sync 跨裝置進度(Phase 3 獨立 spec)
- ❌ User-generated content / story editor(post-MVP)
- ❌ B1 / B2 級內容(v2.x 後)
- ❌ Multiplayer / 對戰功能(原 WordWar 概念,已 sunset)
- ❌ Cosmetic IAP / 寵物服裝(post-MVP)

---

## 13. Success Criteria(v2.0 ship 條件)

1. ✅ 8 章 × 24 lessons × ~5 Q 全 content 完成,Zod schema validate 全過
2. ✅ Build < 1.6 MB raw / 500 KB gzip(允許 +20% over v1.9 baseline 因應內容增加)
3. ✅ Production deploy URL Ch1-8 全章可載入無 schema error
4. ✅ DEV_UNLOCK_ALL = false,Ch1 free,Ch2-8 follow unlock progression
5. ✅ 玩家完整玩過 8 章 estimated 8-12 hours play(120 Q/章 × 5 sec/Q + lesson transitions)
6. ✅ TTS / blindRetry / SRS / streak / XP / coins 全機制相容 v2.0
7. ✅ Mobile portrait 400×800 layout 完整 — iPhone SE / iPhone 15 Pro Max 都試過

---

## 14. Decision Log(本次 brainstorm 的決議)

| 決策 | Why | Where decided |
|-----|-----|---------------|
| L3 scope(只重寫 arc,brand / thesis / mechanics 保留) | v1.7-v1.9 投入巨大,brand 資產不該扔 | 2026-05-28 Q1 |
| Slice-of-life genre(no climactic arc) | 「下班逃逸 + Ghibli」與 quest arc 違和;slice 是治癒 genre 正統 | 2026-05-28 Q2 |
| 奶奶說 PD 童話 framework | v1.9.50 dual-layer 邏輯放大 across 8 章;PD 童話無版權風險 | 2026-05-28 Q3 |
| 8 chapter starter pack(雨夜+桃太郎+醜小鴨+龜兔+駱駝+Baba Yaga+六天鵝+葉限) | 多元文化 + 不同體裁 + A2 / 稀奇度平衡 | 2026-05-29 Q4 |
| 每章 24 lessons(Duolingo-nested) | 模型對齊 Duolingo,認知 flow + 內容彈性 | 2026-05-29 Q5 |
| 每 lesson 5-15 Q(平均 ~5) | Duolingo Q 長度 reference,short bursts in flow | 2026-05-29 Q5 |
| Ch1 也 expand 到 24 lessons(不留 8 Q asymmetric) | UX 一致,避免「Ch1 是輕量版」誤導 | 2026-05-29 Q6 |
| ClozeQuestionSchema → discriminatedUnion(順手 tech debt) | kt-ch1-06 bug root cause,新 schema 唯一機會 | 隨設計順手 |
| CLAUDE.md「小貓回家路 8 章」整段廢 | 跟 v2.0 衝突,onboarding 會誤導後續 session | 整理時順手 |

---

## End of design.

*下一步*:user 看完 → 若 GO → invoke `superpowers:writing-plans` skill 拆 implementation plan(細到 commit-level milestones)。
