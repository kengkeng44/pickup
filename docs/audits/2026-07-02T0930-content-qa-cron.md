# ⚠️ Content QA — 2026-07-02 09:30 UTC

Today's angle: **#10 Audio Sync (pre-generated MP3 vs Web Speech fallback coverage)**
Focus: **Ch1–8** (Momotaro / 醜小鴨 / 龜兔賽跑 / 駱駝 / Baba Yaga / 六天鵝 / 三隻小豬)

> **Angle #10 definition:**
> Verify that every `listen-mc`, `listen-tf`, and `comprehension` question has a reachable
> pre-generated grandma MP3 via the `audioLookup` map in `tts.ts`. Questions without an MP3 
> silently fall back to Web Speech API (robotic voice), which degrades listening comprehension 
> UX for 8-12 yr old children — especially on iOS where Web Speech is unreliable.
> Also checks for orphaned MP3 files (disk/CDN waste) and sentence-text drift (audio says X, JSON shows Y).

---

## A. validate-lessons.js result

```
WARN lessons-ch0.json:  1 lint issue(s)
WARN lessons-ch1.json: 17 lint issue(s)   ← X2/X49/X49B/X57 (pre-existing)
WARN lessons-ch2.json: 10 lint issue(s)
WARN lessons-ch3.json: 19 lint issue(s)
WARN lessons-ch4.json: 10 lint issue(s)
WARN lessons-ch5.json: 10 lint issue(s)
WARN lessons-ch6.json: 13 lint issue(s)
WARN lessons-ch7.json: 13 lint issue(s)
WARN lessons-ch8.json:  9 lint issue(s)
OK  lessons-ch32/33/34.json (no lint issues)
```

No schema-level failures. All Ch1-8 pass Zod shape validation.

---

## B. Violation Table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | audio regen? |
|---|----|----|------|---------|-----------|------|--------------|
| 1 | 1 | `kt-ch1-l3-*` (全 9 題) | listen-mc/listen-tf/comprehension | entire lesson l3 | **MISSING_MP3_LESSON**: lesson l3 (首個故事課) 9 道聽力/理解題全用 Web Speech。l3 是新玩家看到「真實桃太郎故事」的第一關，voice consistency break 影響首印象 | 補跑 `generate-grandma-audio.js` for l3 IDs；或將 l3 IDs 加入 `CHAPTERS_WITH_MP3` 涵蓋範圍 | ✅ 需要 |
| 2 | 1 | `kt-ch1-l4-x1..x9` `kt-ch1-l5-x1..x7` `kt-ch1-l6-x1..x8` `kt-ch1-l7-x1..x8` (共 29 題) | listen-tf/comprehension | `-x` variant IDs | **MISSING_MP3_X_VARIANTS**: v2.0 nested redesign 新增的 `-x` interleaved 問題 ID 從未被 `generate-grandma-audio.js` 涵蓋。76%（38/50）的 Ch1 聽力題走 Web Speech fallback | 同上；需 re-index 新 ID | ✅ 需要 |
| 3 | 1 | `kt-ch1-l4-q12`, `kt-ch1-l4-x1`..等 142 個 | — | orphaned files | **ORPHANED_MP3**: 142 個 MP3 存在 `public/audio/lessons/` 但無對應 JSON question ID（包含舊結構 l8-l24、`kt-ch1-01..08`、13 個 hash 檔）。CDN 無謂送出死檔 | 清除孤兒 MP3；或在 CI 加 orphan-detection script 阻止累積 | ❌ |
| 4 | 1 | `mochi-*.mp3` (22 個) | — | all orphaned | **ORPHANED_MOCHI_MP3**: 22 個 `mochi-{hash}.mp3` 存在但 hash 不對應任何目前 question ID。Mochi voice lookup 失效 | 同上，清除孤兒；Mochi voice 需按新 ID 重新生成 | ✅ 部分需要 |
| 5 | 2-8 | 全部 (342 題) | listen-mc/listen-tf/comprehension | — | **CH2-8_NO_MP3_BY_DESIGN**: `CHAPTERS_WITH_MP3 = Set([1])`，Ch2-8 的 342 道聽力/理解題全用 Web Speech fallback。業界研究指出：兒童對 voice quality 變化比成人敏感，Ch1 grandma voice → Ch2 robot voice 的落差足以造成流失 | 按 ROI 排序逐章擴展 OpenAI TTS；推薦先做 Ch2（醜小鴨，劇情連貫）| ✅ 逐章擴 |
| 6 | 1 | `kt-ch1-l1-*`, `kt-ch1-l2-*` (各 6 題) | narration/tap-pairs/emoji-pick/picture-mc | vocab intro lessons | **MISSING_MP3_VOCAB_INTRO**: l1、l2 的字彙介紹課（玩家最先遇到）無 MP3，奶奶聲音只在 l4+ 出現；開場學字 = robot voice 打破溫暖氛圍設定 | l1/l2 narration IDs 優先補 MP3 | ✅ 需要 |

### Summary Counts (Ch1 只)

| Metric | Count | % |
|--------|-------|---|
| Total Ch1 questions | 118 | — |
| With grandma MP3 | 43 | 36% |
| Web Speech fallback | 75 | 64% |
| Listen-type questions | 50 | — |
| Listen-type WITH MP3 | 12 | **24%** |
| Listen-type NO MP3 | 38 | **76%** |
| Orphaned MP3 files | 142 | — |
| Orphaned mochi-* files | 22 | — |

---

## C. Stats

- **Chapters scanned**: 1–8 (primary), 0 (ref)
- **Listen/comp questions Ch1-8**: 392 total (50 Ch1 + 342 Ch2-8)
- **Ch1 listen/comp with MP3**: 12 (24%)
- **Ch2-8 listen/comp with MP3**: 0 (0%, by design)
- **Orphaned MP3 files on disk**: 142 regular + 22 mochi = **164 orphaned files**
- **Narrative pacing issues** (see §F): 3 identified

---

## D. Top 5 P0

1. **⚠️ P0-1 — Lesson l3 (首個故事課) 全 9 道聽力題 = Web Speech**: `kt-ch1-l3-q3/q5/q7/x1/x2/x3/x5/x6/x7`。玩家跳過 l1/l2 vocab intro 直接進故事，第一個「聽奶奶說故事」= robot。最影響 first-run conversion。

2. **⚠️ P0-2 — 76% Ch1 listen-type 走 Web Speech**: v2.0 nested redesign 新增 29 個 `-x` variant question ID（comprehension + listen-tf interleaved），從未觸發 grandma MP3 生成。JSON-to-audio contract 靜默斷裂。

3. **⚠️ P0-3 — 164 個孤兒 MP3 佔用 CDN**: 舊結構 `l8-l24`（106 檔）、`kt-ch1-01..08`（8 檔）、13 個 hash 檔、22 個 mochi hash 檔。每次 CDN 冷啟動 `loadAudioLookup()` 都在 lookup map 裡 register 這些已死的 key，浪費 lookup 空間。

4. **⚠️ P0-4 — Ch2 醜小鴨 10 listen-mc = Web Speech**: 故事情緒最強（醜小鴨被排擠、自我懷疑）的場景配上 robot voice，情感共鳴歸零。Ch2 是用戶最可能退訂的轉折點。

5. **⚠️ P0-5 — Mochi voice 22 個孤兒 hash**: `mochiTexts` 集合 (tts.ts L32-L59) 把特定句子標為 Mochi voice，但對應 `mochi-{hash}.mp3` 的 hash 是基於舊句子文字算出的。任何 sentence 更新都會讓 Mochi 語音 silently fallback to grandma 或 Web Speech。

---

## F. Narrative Voice / Pacing (even 0 R1-R8 violations → still propose 3)

1. **`kt-ch1-l5-q7` [listen-tf]** sentence: *"Salt waves hit the boat. They hit for many hours."*
   - "They hit" is clumsy subject-pronoun repetition for a two-sentence utterance.
   - 修法: `"Salt waves hit the boat for many hours. The whole team stayed wet and cold."` — single thought at A2 level, better pacing for a listening question where the child needs to parse ONE claim.
   - `audio regen: ✅`

2. **`kt-ch1-l3-q3` [listen-tf]** questionEn: *"Was there really a baby in the peach?"*
   - Rhetorical/sarcastic tone mismatch — in a blindRetry listen-tf setup with grandma voice, "Was there REALLY" implies disbelief, contradicting the warm storytelling register.
   - 修法: `"Did the couple find a baby boy inside the peach?"` — neutral, A2-direct, grandma-register.

3. **`kt-ch1-l4-x1` [comprehension]** speaker: `"narrator"`, but content is grandma first-person storytelling.
   - The `speaker` badge shows "Narrator" avatar but the sentence is grandma-voiced in the MP3 (whenever generated). Visual-audio mismatch.
   - 修法: change `"speaker": "narrator"` → `"speaker": "grandma"` for all l4-l7 comprehension entries where the sentence is part of grandma's storytelling (check: sentences with "Momotaro", "the boy", "his mother" = grandma's narration, not a neutral narrator).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research sources:** Duolingo DuoRadio TTS pipeline (ZenML LLMOps Database, AWS Amazon Polly blog),
Apple Developer Forums iOS Web Speech API bugs thread, talkrapp.com speech synthesis lessons learned.

### Problem diagnosed

`generate-grandma-audio.js` is **idempotent-by-filename** (skips if `{qid}.mp3` exists) but has no mechanism to:
1. Detect JSON question IDs that were ADDED after the last run (→ silent no-MP3 fallback)
2. Detect MP3 files whose JSON counterpart was DELETED (→ orphan accumulation)
3. Detect sentence text that changed (→ audio says old text, subtitles show new text)

### Industry pattern (Duolingo model, 適合 Pickup)

Duolingo's DuoRadio pipeline uses **content-hash keying + manifest-diff CI**:
- MP3 filename = `sha256(sentence_text)[:8].mp3` (content-addressed)
- CI step reads all lesson JSON, builds `expected_manifest = { qid → hash }`, diffs against disk → missing hashes = generate, orphan hashes = delete
- Sentence text change → hash changes → old orphan auto-identified, new file auto-generated

### ARCH-REC #105: X61_AUDIO_MANIFEST_ORPHAN_LINT

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Audio manifest JSON + orphan-detection CI script** | Duolingo DuoRadio pipeline / ZenML LLMOps DB | ✅ 高：static Cloudflare Pages + JSON lessons + Node.js script = 零外部基建；`generate-grandma-audio.js` 直接加 `--lint` flag 輸出 `public/audio-manifest.json` | ~2 hr | P0 fix — 永久防止 JSON/MP3 drift | **推薦** |
| Audio microservice with async TTS queue | Memrise / mid-size app | ❌ 不適合：Cloudflare Pages static site，無 server runtime | N/A | — | 不適用 |
| Web Speech API as primary (no MP3) | Small/budget ELT apps | ❌ iOS 靜音開關下 silent fail；iOS PWA voice quality 不穩定；兒童對 voice 一致性敏感 | 0 | 負 ROI | 不採 |

**具體實作改動：**

1. **`tools/generate-grandma-audio.js` 新增 `--lint` flag**:
   - 讀取所有 `public/lessons-ch{N}.json` (N in CHAPTERS_WITH_MP3)
   - 建 `expected = { qid → sentence_text }` map
   - 比對 `public/audio/lessons/` 目錄
   - 輸出 `public/audio-manifest.json`: `{ "generated": [...], "missing": [...], "orphaned": [...] }`

2. **`validate-lessons.js` 加 audio-manifest check**:
   - 若 `public/audio-manifest.json` 存在，且 `missing.length > 0`，emit WARN `X61_MISSING_GRANDMA_MP3`
   - 若 `orphaned.length > 0`，emit WARN `X61_ORPHANED_MP3`

3. **GitHub Actions / pre-commit hook**:
   - `node tools/generate-grandma-audio.js --lint` → exit 1 if missing > 0

4. **短期修法** (不等架構完成):
   - 跑 `node tools/generate-grandma-audio.js` 補生 Ch1 所有缺少的 MP3 (主要是 `-x`, `l3`, `l1`, `l2` IDs)
   - 刪除 164 個孤兒 MP3 (估 CDN cost savings: 164 × ~40KB ≈ 6.5MB)

**Why ROI is high**: Ch1 is the ONLY chapter with grandma voice. It's the user's first and deepest experience. Having 76% of its listening questions use robot voice is a core product quality issue, not a polish item.
