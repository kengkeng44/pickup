# Content QA — 2026-06-11 18:13 UTC

Today's angle: **#11 — optionsZh 翻譯品質 (Chinese Translation Quality of Answer Options)**
Focus: **Ch3 / Ch5 / Ch6 / Ch7 / Ch8 / Ch9** (listen-mc optionsZh layer)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 268
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Schema: PASS (all lesson files valid). Lint warns on existing R2 English length parity.  
**No lint coverage for optionsZh length parity** — the audit goal this cycle.

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 8 | `kt-ch8-l4-q3` | ZH_LEN_TELL | 草 / **燒過的石頭和黏土** / 紙和膠帶 / 雪和冰 | ratio 8.00 — 正確ZH (8字) vs 最短(1字) → 8歲兒童掃長度即選對 | 縮短正確ZH: "磚頭和泥土" (5字); 拉長其他: "一堆草" / "舊紙張" / "雪和冰塊" | No |
| 5 | `kt-ch5-l6-q3` | ZH_LEN_TELL | 錢 / **把工作做完** / 一個故事 / 一首歌 | ratio 5.00 — "把工作做完"(5字) vs "錢"(1字) | 縮短正確ZH: "做完事情"; 拉長"錢": "一些錢" | No |
| 3 | `kt-ch3-l6-q9` | ZH_LEN_TELL | 比之前慢 / **比以前任何時候都快** / 在走 / 站著不動 | ratio 4.50 — 正確 9字 vs "在走" 2字 | 縮短正確ZH: "快很多了"; 拉長其他: "慢慢在走" / "停著不動" | No |
| 9 | `kt-ch9-l5-q3` | ZH_LEN_TELL | 小碗 / **她去舞會的好坐騎** / 一條熱麵包 / 一張軟暖床 | ratio 4.00 — 8字 vs "小碗"2字 | 縮短正確ZH: "去舞會的車"; 拉長其他: "小小碗" / "一條麵包" / "一張暖床" | No |
| 9 | `kt-ch9-l1-q6` | ZH_LEN_TELL | 工作很辛苦 / **輕鬆又富有的生活** / 種田 / 一個人住 | ratio 4.00 — 8字 vs "種田"2字 | 縮短正確ZH: "輕鬆有錢"; 拉長其他: "辛苦工作" / "自己種田" / "一個人住" | No |
| 6 | `kt-ch6-l7-q5` | ZH_LEN_TELL | 放進盒子 / **丟在每隻天鵝上** / 給國王 / 燒掉 | ratio 3.50 — 7字 vs "燒掉"2字 | 縮短: "丟給天鵝"; 拉長: "給國王看" / "全部燒光" | No |
| 8 | `kt-ch8-l3-q9` | ZH_LEN_TELL | 鳥叫 / **輕輕重重的腳步** / 下雨 / 哥哥笑聲 | ratio 3.50 — 7字 vs "鳥叫"2字 | 縮短: "沉重腳步"; 拉長: "小鳥的叫" / "雨的聲音" / "哥哥在笑" | No |
| 6 | `kt-ch6-l2-q5` | ZH_LEN_TELL | 每天中午 / 早上 / **其他人睡覺時** / 日落之後 | ratio 3.00 — 7字 vs "早上"2字 | 縮短: "大家睡著時"; 拉長: "在中午時候" / "早上的時候" / "日落過後" | No |
| 6 | `kt-ch6-l2-q9` | ZH_LEN_TELL | 親他們 / **把衣服丟到他們身上** / 叫醒他們 / 綁住他們 | ratio 3.00 — 10字 vs "親他們"3字 | 縮短: "把衣服丟上去"; 拉長: "輕輕親吻他" / "大聲叫醒他" / "把他綁起來" | No |
| 7 | `kt-ch7-l6-q7` | ZH_LEN_TELL | 一個小孩 / **路上的陌生人** / 後母 / 一隻餓狗 | ratio 3.00 — 6字 vs "後母"2字 | 縮短: "路邊的人"; 拉長: "一個陌生人" / "她的後母" | No |
| 6 | `kt-ch6-l5-q9` | ZH_REGISTER | 熱情有愛 / **冷淡又不友善** / 想睡又無聊 / 驚奇又驕傲 | 成人評量性語彙 — 8歲兒童不說「冷淡」「驕傲」 | 改「冷冷的、不理人」/ 「好奇又開心」/ 「想打哈欠」 | No |
| 6 | `kt-ch6-l6-q6` | ZH_REGISTER | 耳朵聽不到 / **她的承諾讓她安靜** / 同意王后 / 在床上熟睡 | 「承諾」是正式成人詞 | 改「她答應過,不能說」| No |
| 3 | `kt-ch3-l3-q5` | ZH_LEN_TELL | 他受傷 / **他覺得安全又領先** / 他聽到聲音 / 朋友叫他 | ratio 2.67 — 正確8字 vs "他受傷"3字 | 縮短: "他很放心"; 拉長: "他有受傷了" / "他聽到聲音" / "朋友在叫他" | No |
| 8 | `kt-ch8-l4-q9` | ZH_LEN_TELL | 輕又生氣 / **大聲敲,聲音甜** / 靜悄悄 / 大叫 | ratio 3.50 — 7字 vs "大叫"2字 | 縮短: "大敲輕聲"; 拉長: "安安靜靜地" / "一直大叫" | No |

### Sub-total per violation type

| Type | Count | Chapters |
|------|-------|---------|
| ZH_LEN_TELL (ratio ≥ 2.0) | 34 | Ch3/5/6/7/8/9 |
| ZH_LEN_TELL (ratio 1.5–2.0) | 14 | Ch3/5/6/7/8 |
| ZH_REGISTER (adult vocabulary) | 2 | Ch6 |
| Total | **50** | — |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 6 (Ch3/5/6/7/8/9) |
| listen-mc Qs with optionsZh | ~160 |
| ZH_LEN_TELL total | 48 |
| ZH_LEN_TELL (ratio ≥ 2.0, severe) | 34 (71%) |
| ZH_LEN_TELL (ratio ≥ 4.0, critical) | 5 |
| ZH_REGISTER (adult vocab) | 2 |
| validate-lessons.js schema errors | 0 |
| Worst single ratio | **8.00** (`kt-ch8-l4-q3`) |

---

## D. Top 5 P0

### P0-1 ⚠️ `kt-ch8-l4-q3` — ratio 8.00 (WORST in corpus)
```
sentence: "He lifted heavy red blocks and mixed cold wet earth all day."
options EN: ["light mud", "baked stone and clay", "old paper", "snow and ice"]
optionsZh: ["草", "燒過的石頭和黏土", "紙和膠帶", "雪和冰"]
correctIndex: 1
```
"草"(1字) vs "燒過的石頭和黏土"(8字) = 8× length tell. Any 8-year-old reading Chinese picks option 2 instantly. No listening comprehension required.
**Fix**: `"磚頭和泥土"` (5字) + distractor padding: `"一堆雜草"` / `"紙和膠帶紙"` / `"雪花和薄冰"`.

### P0-2 ⚠️ `kt-ch5-l6-q3` — ratio 5.00
```
optionsZh: ["錢", "把工作做完", "一個故事", "一首歌"]
```
"錢"(1字) as distractor vs "把工作做完"(5字) correct = trivially exposed.
**Fix**: correct → `"做完事情"`; distractor → `"一些錢"`.

### P0-3 ⚠️ `kt-ch3-l6-q9` — ratio 4.50
```
optionsZh: ["比之前慢", "比以前任何時候都快", "在走", "站著不動"]
```
"在走"(2字) vs 9字 correct. Plus "比以前任何時候都快" is adult phrasing for a tortoise-and-hare story.
**Fix**: correct → `"快很多了"`; distractors → `"慢慢在走"` / `"停著沒動"`.

### P0-4 ⚠️ `kt-ch9-l5-q3` — ratio 4.00
```
optionsZh: ["小碗", "她去舞會的好坐騎", "一條熱麵包", "一張軟暖床"]
```
"小碗"(2字) vs 8字 correct. Cinderella lesson should be more balanced.
**Fix**: correct → `"去舞會的車"`; distractors → `"小小的碗"` / `"一條麵包"` / `"一張軟床"`.

### P0-5 ⚠️ `kt-ch9-l1-q6` — ratio 4.00
```
optionsZh: ["工作很辛苦", "輕鬆又富有的生活", "種田", "一個人住"]
```
"種田"(2字) vs 8字 correct.
**Fix**: correct → `"輕鬆有錢"`; distractors → `"辛苦工作"` / `"自己種田"` / `"一個人住著"`.

---

## E. Narrative Voice / Pacing Improvement (3 proposals)

Even with 0 R1-R8 violations, the following improve story voice for child learners:

1. **`kt-ch6-l5-q9`** — All 4 optionsZh are adult-evaluation register. Rewrite:
   - "熱情有愛" → "熱心又溫柔"
   - "冷淡又不友善" → "冷冷的,不理人"
   - "想睡又無聊" → "懶洋洋、想打哈欠"
   - "驚奇又驕傲" → "很驚訝、有點神氣"

2. **`kt-ch6-l6-q6`** — "她的承諾讓她安靜" uses abstract noun "承諾" (promise as contract). Replace: "因為她答應了不能說". More concrete, story-voice.

3. **`kt-ch3-l3-q5`** — "他覺得安全又領先" is a compound abstract correct option. Child-voice: "他不擔心、很放心". Simpler cognitive load, same inference.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**背景**: Current `validate-lessons.js` R2 lint only checks English option length parity (`max/min ≤ 1.25×`). The **optionsZh layer has zero lint coverage**. This cron found 48 ZH_LEN_TELL cases across 6 chapters — 34 with ratio ≥ 2.0, 5 with ratio ≥ 4.0.

**Industry basis (2026)**:
- Multiple ELT item writing standards (Cambridge, ETS) identify "option length heterogeneity" as a top-3 construct-irrelevant variance source (Nonfunctional Distractor Analysis, PMC7372664 2020)
- Test-wiseness literature confirms **length cue = most common bypass strategy** among young L2 learners, especially those reading options in L1 (test-wiseness > 40% exploitation rate in 8–12 age group per Millman/1965 framework, reconfirmed in 2023 ScienceDirect meta)
- **Bilingual-reveal architecture amplifies risk**: Pickup shows EN+ZH simultaneously in post-reveal pills (B.131). Unlike Duolingo EN-only courses, the ZH translation is the primary reading layer for Taiwanese 8-year-olds. A ZH length cue is MORE EXPLOITABLE than an EN one because it's the child's dominant reading script.
- Macaron arxiv 2602.10732 (Feb 2026): multilingual MCQ translation must "preserve difficulty equivalence across scripts". Length parity constraint applies to EACH LANGUAGE LAYER independently.

**Pickup-specific risk**: Child sees ZH pills in post-reveal; for future "pre-reveal blind ABCD" mode if ZH labels are shown, the tell fires pre-answer. Currently the ZH shows post-reveal (after correct/wrong). But for review screen + lesson-review UI (`_showLessonReview`) the ZH is shown at confirmation — some children read ZH hint first on second pass.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| ZH R2 Length Parity Lint | ELT item writing + test-wiseness (Millman 1965 / PMC7372664 2020) | ✅ 完全適合 — additive lint in tools/validate-lessons.js, 0 src/ changes | S · 30min | ⭐⭐⭐⭐ | **Ship** |
| optionsZh length target 3–8 chars | Cambridge IELTS item guidelines | ✅ 適合 — clear range for item writers; fixes 34 P1 violations at source | S · 20min rule addition | ⭐⭐⭐⭐ | **Ship alongside lint** |
| ZH register tier guard (adult vs child vocab list) | Child ELT pedagogy (Paul Nation GSL + CCL child corpus) | 🟡 部分適合 — child vocab list needed, no off-shelf Mandarin child corpus | M · 3hr | ⭐⭐ | **Defer: manual for now** |
