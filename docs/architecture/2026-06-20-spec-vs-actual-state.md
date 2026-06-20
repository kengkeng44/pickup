# 規格 vs 實際 — 現況快照 (2026-06-20)

> CLAUDE.md 是 onboarding(只留 headline),這份是「實際長什麼樣」的完整對照。
> 兩者刻意分工:CLAUDE.md 保持精簡,drift 細節進這裡。發現新 drift 更新這份。
> 由 regression-after-fix session 盤點 `src/data/lessons.ts` + `public/lessons-ch*.json` 產出。

---

## 1. 章節數:文件「8 章」→ 實際 32 章

`public/lessons-ch0.json` … `lessons-ch31.json`,共 **32 個 chapter JSON**。

| 區段 | 章 | 內容 |
|------|----|----|
| 序章 | ch0 | `ground-floor`(地面層 / 入門) |
| 核心八夜 | ch1-ch8 | 奶奶睡前故事框架:桃太郎 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六隻天鵝 / 葉限 / 三隻小豬 |
| 擴張 | ch9-ch31 | 灰姑娘 / 嫦娥 / 后羿 / 牛郎織女 / 小紅帽 / 浦島太郎 / 國王新衣 / 一寸法師 / 鶴的報恩 / 興夫與孬夫 / Sang Kancil / 拔蘿蔔 / Anansi / 孟母 / 司馬光 / 孔融讓梨 / 愚公移山 / 阿基米德 … |

- 「奶奶 8 個說故事夜晚」仍是**核心設計敘事弧**(ch1-8),沒有被推翻。
- ch9+ 是 autonomous loop + cron content 的**內容擴張**,不是新框架。
- 章名 / story id / shipped 狀態的 source of truth = `src/data/storyRegistry.ts`(110 registry entries,含 planned)。

---

## 2. 題型:文件「5 大題型」→ schema 定義 20 種,content 實用 9 種

`src/data/lessons.ts` discriminated union 定義 **20 個 `type` literal**(含 `narration`)。

### 實際出現在 content 的 9 種(`public/lessons-ch*.json` 全掃)

| type | 出現數 | 說明 |
|------|-------:|------|
| `listen-mc` | 524 | 聽句子 4 選 1 — **現行主力** |
| `emoji-pick` | 223 | 4 emoji 視覺選擇(A2 entry hook) |
| `listen-tf` | 218 | 聽 + 是非(2 選 1) |
| `tap-pairs` | 217 | 中英配對(review / vocab 預習) |
| `comprehension` | 57 | 段落 + 提問 4 選 1(read+listen 合併,B.342) |
| `listen-emoji` | 39 | 聽 + emoji 4 選 1 |
| `picture-mc` | 7 | 看圖選句 |
| `phrase-pairs` | 2 | 片語配對 |
| `listen-pairs` | 1 | 聽選中文配對(B.344 新) |

### 定義了但 content 內 0 筆的 10 種(schema 有、沒用)

`read-mc-with-audio` · `type-what-you-hear` · `read-and-tap` · `drag-blank` · `speak-back` · `listen-tf-zh` · `listen-build` · `tap-tiles` · `listen-comprehension` / `read-comprehension`(已 deprecate,導向 `comprehension`)。

> ⚠️ CLAUDE.md 舊文案「5 大題型(cloze/tap-tiles/tap-pairs/type-what-you-hear/listening)」**已不準**:
> - `cloze` **不是 v2.0 lesson type**(沒有 `z.literal('cloze')`)。它是 v1.x 概念(`sentences.ts` + `ClozeUI.ts`),v2.0 nested 內容沒用。
> - `tap-tiles` / `type-what-you-hear` 雖在 schema,content 0 筆。

---

## 3. narration(旁白)≠ 題型 — 計數規則

全 32 章 type entry 總數 **2473**,其中 `narration` 旁白 **1185(48%)**。

- 旁白 = 奶奶說故事的敘事段(`speaker: narrator` / grandma voice),無互動、無 correctIndex。
- **算 lesson「真題數 / 體量」時排除 narration**:真正互動題 = 2473 − 1185 = **1288**。
- 文件 / cockpit / 任何「題數」統計,narration 不計入題型分母。

---

## 4. 未記錄的 data module(CLAUDE.md Code Structure 沒列)

`src/data/` 實際 ~30 個 module,CLAUDE.md 只列了少數。新增重點:

| module | 作用 |
|--------|------|
| `storyRegistry.ts` | 110 故事 registry(id/title/status/shipChapter/lengthClass) |
| `storyRecommend.ts` / `storyTags.ts` | NextStoryPicker 推薦 + 標籤 |
| `tomorrowQueue.ts` | 「明晚聽」佇列 |
| `comprehensionMode.ts` | 全域聽/讀開關(B.342) |
| `lessonHooks.ts` | 每課開場 hook 框架(B1-B6) |
| `keySentences.ts` | Key Sentences overlay 資料 |
| `lang.ts` | 介面語言 中/英(i18n Phase 1-3, B.347-350) |
| `theme.ts` | 主題(夜間模式地基?) |
| `mascotOutfits.ts` | 角色服裝(cosmetic 雛形) |
| `catGender.ts` / `catName.ts` / `dogName.ts` | 角色自訂 |
| `muteSetting.ts` | 靜音 toggle(媽媽哄睡,B.251) |
| `audioSettings.ts` | 音訊設定 |
| `coins.ts` / `xp.ts` / `streak.ts` / `achievements.ts` | gamification 狀態 |
| `cards.ts` / `shareCard.ts` | 分享卡 |
| `learnLog.ts` / `lessonProgress.ts` | 學習紀錄 / per-lesson 進度 |
| `userProfile.ts` / `backend.ts` | 使用者 / 後端串接 |

---

## 維護

發現規格與實際不符,更新這份,不要把細節塞回 CLAUDE.md。CLAUDE.md 只放「會誤導下個 session 的 headline」。
