# 題庫維護手冊 (Content Maintenance) — 給接手的 Claude / 作者

> 一句話:**題庫 = `public/lessons-ch{0..31}.json`,一章一檔。改題只動這些 JSON,然後跑 gate + regen,push 上 master 就自動部署。**

本手冊是「怎麼安全地改題庫」的 SOP。題型分佈規則見 `docs/standards/2026-06-22-question-distribution-standard.md`;
全題庫地圖見 `docs/content/question-bank-index.md`(自動產生)。

---

## 1. 題庫在哪 / 長怎樣

- **實體**:`public/lessons-ch0.json` … `lessons-ch31.json`(32 章,一章一檔)。
- **格式**:pretty-print JSON(2 空格縮排),可直接手改、git diff 乾淨。
- **schema**:`src/data/lessons.ts` 的 `LessonSchema`(discriminatedUnion,每種題型一個 sub-schema)。**改題型欄位前先看這裡**。
- **runtime 載入**:`loadChapterLessons()`(同檔)→ React renderer `src/react-app/renderers.tsx` 的 `RENDERERS` map。

### 一個 lesson 的骨架

```jsonc
{
  "id": "kt-ch0-l1",          // kt-ch{章}-l{節}, 不可重複
  "chapter": 0,
  "lessonInChapter": 1,
  "segmentType": "outer-prologue",  // outer-prologue / main-story / aesop-side / outer-outro / review
  "storyId": "ground-floor",
  "storyBeat": "雨夜,門外傳來小小的聲音",
  "questions": [ /* entry 陣列, 含旁白 + 題目 */ ]
}
```

### 一個 entry(題 / 旁白)共同欄位

| 欄位 | 說明 |
|------|------|
| `type` | 題型(見 §2)。`narration` = 旁白,不算題 |
| `id` | `kt-ch{章}-l{節}-{流水}`,全題庫唯一 |
| `level` | `A1` / `A2`(兒童 ELT,不上 B1) |
| `difficulty` | `easy` / `medium` / `hard` |
| `speaker` | `grandma` / `mochi` / `hana` / 角色名 → 決定頭像 + TTS 聲線 |
| `sentence` | 英文句(題幹 / 旁白)。填空題用 `___` 當空格 |
| `sentenceZh` | 整句**意譯**中文(溫暖說書奶奶口吻,非機翻 — 見 `docs/standards/translation-tone.md`) |
| `explanationZh` | 答對後的中文解說 |
| `tags` | `["story","ch0",...]` |

---

## 2. 題型速查 (實際在用的)

| type | 用途 | 關鍵欄位 |
|------|------|---------|
| `narration` | 旁白推劇情(**非題**) | sentence / sentenceZh |
| `listen-mc` | 聽句子 4 選 1 | sentence / question / options / optionsZh / correctIndex |
| `listen-tf` | 聽句子判斷對錯 | sentence / question / correctIndex(0/1) |
| `comprehension` | 讀/聽段落理解 4 選 1 | sentence(段落) / question / options / correctIndex |
| `grammar-mc` | 文法選擇(貼原文,distractor 是同字文法變體) | sentence(含 `___`) / options / correctIndex |
| `scroll-pick` | 填空 + 直列滑動選字 | sentence(含 `___`) / options / optionsZh / correctIndex |
| `tap-pairs` / `phrase-pairs` / `listen-pairs` | 配對(字↔中 / 詞↔中 / 聽↔中) | pairs / pairsZh |
| `emoji-pick` / `picture-mc` / `listen-emoji` | 視覺選(低齡友善) | options / correctIndex (+ emoji/圖) |

> 完整欄位以 `src/data/lessons.ts` 的 Zod schema 為準。**加新題型** = 先在 lessons.ts 加 sub-schema + 進 discriminatedUnion,再在 renderers.tsx 的 RENDERERS map 註冊 renderer。

---

## 3. 改題 SOP(增 / 改 / 刪一題)

1. **定位**:看 `docs/content/question-bank-index.md` 找到章 → 開對應 `public/lessons-chN.json`。
2. **編輯**:照 §1/§2 欄位改。`correctIndex` 對齊 options;填空題 sentence 要有 `___`;中文要過 §`translation-tone.md` 口吻。
3. **遵守分佈標準**:不要再加 `listen-mc`(已過量);補題優先 `comprehension` / `grammar-mc`(每章 2–3)/ 視覺題。同題型一節最多連 2、每節 ≥3 種題型。
4. **過 gate**(全綠才能 push):

   ```bash
   npm run build                      # validate-lessons + vitest(Zod) + tsc + vite, 全包
   node tools/check-answer-index.cjs  # 確認沒誤動既有題 correctIndex
   ```

5. **regen 衍生檔**(改了題庫就要重跑,CI 也會驗一致):

   ```bash
   node tools/gen-bank-index.cjs      # 更新題庫地圖
   node tools/_content-db.cjs         # 更新 content-db 稽核表
   node tools/_render-qa-static.cjs   # 更新儀表板 QA 對照頁
   ```

6. **commit + push**:`vX.Y.Z: ...` 格式,push branch → fast-forward master → push master。GitHub Actions 自動部署 app(pickupwords)+ cockpit。

> ⚠️ **build 沒過不要 push**(Don't Do #9)。tsc 掛 / validate 掛就先修。

---

## 4. validate-lessons 會擋什麼(常見紅燈)

`tools/validate-lessons.js` 在 build 第一關跑,違規直接 FAIL:

- `X2_OPTION_LIST_BIAS` — 選項都用同一個字開頭(玩家用刪去法作弊)。
- `R1_SUBSTRING` / `X3_R1_VERBATIM` — 答案直接出現在題幹/句子裡(答案外洩)。
- `X8_R2_LENGTH` — 正解選項長度 > distractor 1.5×(長度暗示答案)。**修法:選項長度盡量等長,正解 ≤1.3× distractor**。
- **A2 詞彙白名單** — 超綱字(per-chapter banned words)。

---

## 5. 工具箱(`tools/` top level 常用的)

| 工具 | 何時用 |
|------|--------|
| `validate-lessons.js` | build 第一關(自動) |
| `gen-bank-index.cjs` | 改題後更新題庫地圖 |
| `check-answer-index.cjs` | 確認沒誤動答案 |
| `_content-db.cjs` / `_sync-hooks.cjs` / `_render-qa-static.cjs` | CI 衍生檔(改題後重跑) |
| `batch-tts.cjs` / `generate-grandma-audio.js` | 產 grandma TTS MP3 |
| `lint-cultural.cjs` / `lint-readability.cjs` / `lint-vocab.cjs` | 內容品質掃描 |
| `bump-sw-version.cjs` | build 尾段(自動) |
| `build_vocab.py` | 重建 `public/vocab.json`(見 `tools/README.md`) |

> **一次性腳本**(寫某章、修某次 bug、某次翻譯批次)全部歸檔在 `tools/archive/`,top level 只留會重複用的。要找歷史腳本去 archive 撈。

---

*Last updated: 2026-06-24 — 題庫格式維持「一章一 JSON + Zod + CI」, 不改格式(改格式會牽連 loader/schema/test/線上 app)。*
