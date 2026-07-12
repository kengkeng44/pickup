# 01 — 遊戲機制規格

> 讀法見 `spec/README.md`:Baseline 只寫實測過、可重跑指令驗證的事實;Delta 寫下一步 + 可判斷完成的驗收條件。

實測日期:2026-07-12。實測方式:直接 grep/read `src/react-app/**`(活代碼)與 `src/data/lessons.ts`(schema),不採信 `CLAUDE.md` 未經驗證的敘述;有出入處在對應小節註記。

---

## Baseline(現狀,可驗)

### 0. 架構前提

機制活代碼在 `src/react-app/**`(`App.tsx` / `pages/LessonPage.tsx` / `pages/MapPage.tsx` / `renderers.tsx` / `components/GrandmaRecommendCarousel.tsx`)。`src/scenes/*.ts`、`src/ui/ClozeUI.ts`、`src/ui/TapInputUI.ts` 是 Phaser 死碼,含 `blindRetry`/`forceCorrect` 字樣但不在渲染路徑上 —— 驗證:

```
grep -rln "blindRetry\|forceCorrect\|force-correct\|strike" src/
# → renderers.tsx（活）+ scenes/LessonScene.ts, scenes/PlayScene.ts, ui/ClozeUI.ts, ui/TapInputUI.ts（死碼）
```

`LessonPage.tsx` 透過 `RENDERERS[q.type]`(定義於 `renderers.tsx`)分派各題型渲染器,確認為實際掛載路徑。

### 1. 題型清單(以 schema 實測為準,非 CLAUDE.md 的「5 種」)

`src/data/lessons.ts` 的 `QuestionUnion = z.discriminatedUnion('type', [...])` 實際列出 **15 種** `type` literal:

| type | 說明(依代碼註解 / 渲染器推斷) |
|---|---|
| `listen-mc` | 聽力 4 選 1 |
| `listen-emoji` | 聽力配 emoji |
| `listen-comprehension` | 聽力理解 |
| `read-mc-with-audio` | 閱讀 4 選 1(附音檔) |
| `type-what-you-hear` | 聽寫 |
| `emoji-pick` | 挑 emoji |
| `picture-mc` | 圖片 4 選 1 |
| `read-and-tap` | 閱讀點選 |
| `drag-blank` | 拖字填空(`sentenceTemplate` 含 `__` 空格 + `tiles` 候選字庫 + `correctTiles`) |
| `speak-back` | 跟讀錄音 |
| `narration` | 敘事題 |
| `listen-tf-zh`| 聽力是非(中文題幹,`correctIndex` 為 0/1 二選一) |
| `listen-tf` | 聽力是非(`correctIndex` 0/1) |
| `listen-build` | 聽力組句(`level` 固定 `'A2'`) |
| `tap-tiles` | 點字組句 |
| `tap-pairs` | 配對點選 |

「Cloze 填空 4 選 1」不是獨立 `type`,而是內部共通運行時形狀 `ClozeQuestion`(`src/data/sentences.ts`)—— 多數 4 選項題型(如 `listen-mc`、`read-mc-with-audio`、`picture-mc` 等)在資料/情境轉換層被視為此形狀的子集;`correctIndex` 欄位固定 `0|1|2|3`(4 選 1)。情境模式資料另有 `toClozeQuestion()`(`src/data/scenarios.ts`)把 `ScenarioQuestion` 轉為此形狀餵進同一套 UI/store。**CLAUDE.md 稱「5 種」與此次實測的 15 種 discriminated type 不符,以此份文件的 schema 實測為準。**

### 2. 難度系統

- `Difficulty` 型別為 `'easy' | 'medium' | 'hard'`(`src/store/runStore.ts`)。
- 持久化於 `localStorage['pickup.difficulty']`(常數 `LS_DIFFICULTY`),讀取 fallback 為 `'medium'`。
- 出題流程:`filterByDifficulty()` 在 shuffle / level filter **之前**先套用,對故事模式新題、自由練習池、情境模式池皆一致套用(`runStore.ts` 內三處呼叫點)。
- 驗證:`grep -n "difficulty" src/store/runStore.ts` 可見 `setDifficulty()`、`readDifficulty()`、`writeDifficulty()` 完整存取鏈。

### 3. SRS Lite(非完整 SM-2)

- 常數 `SRS_REVIEW_LIMIT = 3`(`runStore.ts`)。
- 故事模式每輪開頭:`srsReviewBatch(storyQuestions, SRS_REVIEW_LIMIT + 6)` 取回顧候選池,再 `.slice(0, SRS_REVIEW_LIMIT)` 截到最多 3 題,與新題 `newQs` 合併成 `ordered = [...srs, ...newQs]`。
- 追蹤規則(代碼註解原文,`runStore.ts` 425-427 行附近):
  - 答錯 → 加入 SRS 佇列
  - 答對 → 移出 SRS 佇列(**答對一次即移出**,無連續正確次數門檻,非 SM-2 的間隔遞增算法)

### 4. 故事模式機制

檔案:`src/react-app/renderers.tsx`(各題型渲染器)+ `src/store/runStore.ts`(HP / mode 邏輯)。

- **HP 在故事模式停用**:`runStore.ts` 446 行 `hp: isStory ? hp : correct ? hp : Math.max(0, hp - 1)` —— 故事模式下答錯不扣 HP,自由練習模式才扣。`STARTING_HP = 3`。
- **不 shuffle 選項位置**:4 選 1 型題目(`OptionBtn` 系列渲染器)未見對選項陣列做隨機排序;拖字/點字類題型(`drag-blank`、`tap-tiles`、`tap-pairs`)的候選字庫 `tiles` **會**做一次性 shuffle(`shuffleOrder.current = tiles.map((_, i) => i).sort(() => Math.random() - 0.5)`),但此排序在同一題生命週期內固定,不隨答錯重新洗牌 —— 符合「保留位置記憶」設計意圖,適用範圍是「候選字庫排序」而非嚴格限定於 4 選 1 選項。
- **2-strike reveal**(代碼實際用語,非字面 `blindRetry` 函式名):答錯不主動揭露正確答案,只標記錯誤選項;`wrongCount === 1` 時顯示提示文案,`wrongCount >= 2` 時亮出正確答案/候選字提示(`hintTileIdx` / `hintIdx` 高亮 + `revealed` 狀態轉真)。此邏輯在 `renderers.tsx` 內至少 5 處題型渲染器重複出現(drag-blank 系、tap-tiles 系、read-and-tap 等)。
- **答對後自動推進**:`revealed` 狀態觸發 `Explanation` 顯示,配合 timeout 自動前進(`narration` 型渲染器可見 `window.setTimeout(() => setPhase('reveal'), 800)` 一類的計時器模式)。

### 5. 狀態管理(`src/store/runStore.ts`, Zustand)

- Store 涵蓋:分數/HP(`hp`)、進度(`round`、`answered`、`history`)、SRS 佇列、難度(`difficulty`)、per-lesson progress(`storyQuestions` 相關統計:`v0.8` 新增「NEW(非 SRS)故事題數」與「本輪故事題總數」計數)。
- `mode` 區分故事模式(`isStory`)與自由練習/情境模式,兩者共用同一 store,靠 `mode` 分支決定 HP 是否啟用、出題池組成(`nextPool` 組裝邏輯依 mode 不同:故事模式 = SRS 復習 + 章節新題;自由練習 = 全池 filterByDifficulty;情境模式 = 固定順序 + 難度過濾)。

### 6. 題庫規模

- 32 章節,對應 `public/lessons-ch0.json` ~ `lessons-ch31.json`(實測 `ls public/lessons-ch*.json | wc -l` = 32)。
- 載入入口:`loadChapterLessons(ch: ChapterId)`(`src/data/lessons.ts` 404 行),透過 `fetch(`/lessons-ch${ch}.json`)` 讀取 `public/` 下對應章節檔,執行期以 `LessonsSchema`(`z.array(LessonSchema)`)驗證。
- 情境模式(餐廳/機場/醫院/辦公室/飯店 5 種,`src/data/scenarios.ts` 常數列表)仍存在於資料層,惟本次未逐一實測各情境題數,沿用 CLAUDE.md 描述(每情境 10 題)僅供參考,未列入本文件驗證聲明。

---

## Delta(目標,含驗收條件)

### D1. SRS 是否升級為真 SM-2

- **狀態**:待決(CLAUDE.md Decision Log 明示「暫不做完整 SM-2 SRS,MVP 先驗證玩家會不會回來」)。
- **選項 A(維持現狀)**:答對一次即移出佇列,不做連續正確次數門檻、不做間隔遞增。
- **選項 B(升級)**:改為「連對 N 次(建議 N=2 或 3)才移出」+ 依錯誤次數動態調整下次出現間隔。
- **驗收條件(若選 B)**:
  - `runStore.ts` 的 SRS 移出邏輯改為追蹤每題連續正確次數計數器,計數器歸零於答錯。
  - 單元測試覆蓋「答對 1 次不移出、連對 N 次才移出」的行為。
  - 不影響 `SRS_REVIEW_LIMIT = 3` 的每輪回顧上限(維持故事節奏,不因 SRS 複雜化拖長單輪時長)。

### D2. 內容品質 —— mirror-lint warning 清零

- **現況實測**(`node tools/validate-lessons.js` 尾行):

  ```
  Total mirror-lint issues: 65
  (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
  ```

- **Warning 類型分布**(實測自完整輸出,`grep -oE ": [A-Z][0-9]_[A-Z_]+"`):

  | 類型 | 數量 | 說明 |
  |---|---|---|
  | `X2_OPTION_LIST_BIAS` | 46 | 選項清單偏差(例如同一題所有選項共用相同起始詞,如實測樣本 `lessons-ch31.json kt-ch31-l6-q8`:「all start with "in"」,讓學生用格式而非語意猜答案) |
  | `X3_R...`(`X3_R1_VERBATIM_WORDS` 系列) | 12 | 正確答案與原文逐字重複,未經改寫(anti-verbatim 規則,見 `pickup-item-writer` skill 的 X3 規則) |
  | `R1_SUBSTRING` | 7 | 正確答案是題幹句子的子字串,可用字面比對作弊而非理解 |

  三類加總 46+12+7 = 65,與 validator 尾行總數一致。

- **目標**:65 → 0。
- **驗收條件**:
  - 逐章跑 `node tools/validate-lessons.js`,尾行 `Total mirror-lint issues:` 為 0。
  - 修正過程優先處理 `X2_OPTION_LIST_BIAS`(佔比最大,46/65 ≈ 71%),其次 `X3_R1_VERBATIM_WORDS`,最後 `R1_SUBSTRING`。
  - 修正不可破壞既有 `LessonsSchema` 驗證(修完仍需整體跑 `node tools/validate-lessons.js` 全數 `OK` 章節無新增 FAIL)。
  - 可選:修完後設 `MIRROR_LINT_STRICT=1` 跑一次確認 0 warning 下 exit code 為 0,之後考慮把此 flag 收進 CI 常態檢查(是否收入為獨立待決項,不在本次驗收範圍內)。

---

## 附錄:實測指令記錄

```bash
cd /c/Users/acer/Desktop/pickup

# 活代碼路徑確認
grep -rln "blindRetry|forceCorrect|force-correct|strike" src/

# 題型 schema 實測(15 種 discriminated type)
grep -n "type: z.literal(" src/data/lessons.ts

# lint warning 現況(65 筆)
node tools/validate-lessons.js 2>&1 | tail -3
node tools/validate-lessons.js 2>&1 | grep -oE ": [A-Z][0-9]_[A-Z_]+" | sed 's/: //' | sort | uniq -c | sort -rn

# 題庫規模(32 章)
ls public/lessons-ch*.json | wc -l

# HP / story mode 分支確認
grep -n "isStory ? hp" src/store/runStore.ts

# SRS 佇列邏輯確認
grep -n "SRS_REVIEW_LIMIT|srsReviewBatch" src/store/runStore.ts

# DEV_UNLOCK_ALL 生產狀態確認
grep -n "DEV_UNLOCK_ALL" src/data/storyKitten.ts
```
