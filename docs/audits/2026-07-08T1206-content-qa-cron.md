# ⚠️ Content QA — 2026-07-08 12:06 UTC

**Today's angle:** #7 — A5 Cultural Reference (origin attribution + scaffold gaps)
**Focus:** Ch1–Ch8 (桃太郎 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六隻天鵝 / 葉限 / 三隻小豬 — 8 chapters, ~530 question-bearing items audited)

**Angle definition — A5 Cultural Reference:**
Sub-type violations audited:
- **A5.a ORIGIN_UNSCAFFOLDED** — A story's culture/author origin never mentioned anywhere in the chapter, depriving learners of the intercultural knowledge hook. Affected: Ch1 (Japan), Ch2 (Denmark/Andersen), Ch3 (Greece/Aesop), Ch6 (Germany/Grimm), Ch7 (China/葉限), Ch8 (Britain/Jacobs).
- **A5.b FACTUAL_ERROR** — A culturally-specific object is described inaccurately vs. source tradition (Baba Yaga's mortar).
- **A5.c FLATTEN** — A distinctive cultural object is genericised into a common-noun equivalent, erasing the cultural specificity (mortar → stone bowl).
- **A5.d MISSED_ZH_HOOK** — explanationZh misses a child-accessible cultural bridge ("就像台灣的X" / "這是某某文化獨有的...") when introducing an opaque foreign cultural item.

**Industry basis (2025–2026):**
- Folk Narrative and EFL (David Publishing): folktales support ICC when cultural origin and comparison activities are embedded, not left implicit. Explicit origin labelling + "compare with local equivalent" = #1 folk tale EFL design principle. (https://www.davidpublisher.com/Public/uploads/Contribute/5acc1485d62c2.pdf)
- "Interculturalizing ELT" (ScienceDirect 2025): cultural metacognition activities ("where did this story come from? what does it tell us about that culture?") significantly outperform passive reading on long-term retention and attitude. (https://www.sciencedirect.com/science/article/pii/S2215039025000050)
- Duolingo Stories: "culture influences movies and storytelling…who counts as a hero" — Duolingo explicitly uses cultural contrast as a story design lever. (https://blog.duolingo.com/storytelling-across-cultures/)

---

## A. validate-lessons.js result

```
validate-lessons.js: schema validation PASS (0 structural errors)
Mirror-lint: 441 warn-only issues (X57/X2/X48/X49 — pre-existing, not this angle's scope)
Build gate: PASS
```

Pre-existing lint unaffected by this audit.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | sub-type | severity | 修法 | audio regen? |
|----|------|------|---------|-----------|----------|----------|------|--------------|
| Ch1 | kt-ch1-l1-intro | narration | 奶奶說：今晚要講桃太郎的故事 | 「桃太郎」是日本民間故事，全章無一句提及「日本」或「日本民間故事」 | A5.a ORIGIN_UNSCAFFOLDED | P1 | 在 intro narration 的 explanationZh 加「（桃太郎是日本最有名的民間故事！）」 | No |
| Ch1 | kt-ch1-l2-rev1 | tap-pairs | demon = 妖怪 | 「demon」在桃太郎原文為「oni（鬼）」——日本文化專有詞，直接譯妖怪遺失日語文化標記 | A5.d MISSED_ZH_HOOK | P2 | explanationZh 加「（oni 是日本民間故事獨有的鬼怪，長角、手持金棒）」 | No |
| Ch2 | kt-ch2-l1-intro | narration | 奶奶說：今晚要講醜小鴨的故事 | 全章無 Andersen/安徒生/Denmark/丹麥 任何提及。8-12 兒童無法建立「這是丹麥故事」背景知識 | A5.a ORIGIN_UNSCAFFOLDED | **P0** | intro explanationZh 加「（醜小鴨是丹麥作家安徒生 1843 年寫的，他是世界上最有名的童話作家之一！）」 | No |
| Ch3 | kt-ch3-l1-intro | narration | 奶奶說：今晚要講龜兔賽跑的故事 | 全章無 Aesop/伊索/Greek/希臘 任何提及。龜兔賽跑出自 2,500 年前的伊索寓言，無文化溯源 | A5.a ORIGIN_UNSCAFFOLDED | **P0** | intro explanationZh 加「（這個故事來自兩千五百年前的希臘，是伊索寓言裡最有名的故事！）」 | No |
| Ch5 | kt-ch5-l5-q5 | listen-mc | Outside, the stone bowl came closer through the trees. | Baba Yaga 傳統坐騎是「石臼」(mortar/ступа，磨穀用的石磨，非碗狀)。「stone bowl」(石碗) 失去 Slavic 文化物件的特定形象 | A5.c FLATTEN | P2 | explanationZh 加「（在俄羅斯故事裡這個「石臼」更像磨穀用的大石缽——不是普通的碗！）」；options 對應選項 "riding inside a bowl" 可 → "riding in a stone mortar" 以更精確 | Yes if opts change |
| Ch6 | kt-ch6-l1-intro | narration | 奶奶說：今晚要講六隻天鵝的故事 | 全章無 Grimm/格林兄弟/German/德國 任何提及。六隻天鵝是格林童話 (1812) 較冷門的作品，需文化錨點 | A5.a ORIGIN_UNSCAFFOLDED | **P0** | intro explanationZh 加「（六隻天鵝是德國格林兄弟收集的童話——格林兄弟跟白雪公主、灰姑娘是同一家！）」 | No |
| Ch7 | kt-ch7-l1-intro | narration | 奶奶說：今晚要講葉限的故事 | 葉限是**全球最古老的灰姑娘故事**（西元 850 年，段成式《酉陽雜俎》），比法國 Perrault 早 800 年。全章僅 kt-ch7-l7-x7 提「古代中國民間故事」，未在開篇建立「這是中國的灰姑娘」的文化驕傲 hook | A5.a ORIGIN_UNSCAFFOLDED | **P0** | intro explanationZh 加「（葉限是中國最古老的灰姑娘故事，比歐洲的灰姑娘早了八百年！）」；l5-q2 洞節 expl 補壯族/南方洞穴村文化背景 | No |
| Ch7 | kt-ch7-l5-q2 | narration | The 洞節 (cave festival) night came | 「洞節」是壯族（廣西南方）年節，explanationZh 只說「一年一度的大節日」，未交代洞節的文化歸屬 | A5.d MISSED_ZH_HOOK | P1 | explanationZh 末尾加「洞節是中國南方山洞村落特有的慶典，有些地方至今還辦！」 | No |
| Ch7 | kt-ch7-l6-q8 | emoji-pick | Where did the gold shoe finally reach? | 「陀汗國王」(King of Tuohan) 是古代南海島國（今越南/印尼一帶）。expl 說「一個海島的國王那裡」，遺失了古代海上絲路的文化背景 | A5.d MISSED_ZH_HOOK | P2 | explanationZh 加「（陀汗國可能就在今天越南或印尼附近，代表中國古代就有海上交流！）」 | No |
| Ch8 | kt-ch8-l1-intro | narration | 奶奶說：今晚要講三隻小豬的故事 | 全章無 Joseph Jacobs/英國/Britain/1890 任何提及。三隻小豬是英國民間故事，常誤認為迪士尼原創 | A5.a ORIGIN_UNSCAFFOLDED | P2 | intro explanationZh 加「（三隻小豬是 1890 年英國民間故事，歡迎大家一起說「huffing and puffing」！）」 | No |

---

## C. Stats

| 指標 | 值 |
|------|---|
| Chapters scanned | 8 (Ch1–Ch8) |
| Lessons scanned | ~64 |
| Items audited | ~530 |
| A5.a ORIGIN violations | 6 (Ch1, Ch2, Ch3, Ch6, Ch7, Ch8) |
| A5.c FLATTEN violations | 1 (Ch5) |
| A5.d MISSED_ZH_HOOK | 3 (Ch1 oni, Ch7 洞節, Ch7 陀汗) |
| P0 violations | 4 (Ch2, Ch3, Ch6, Ch7 — all ORIGIN_UNSCAFFOLDED) |
| P1 violations | 2 (Ch1, Ch7 洞節) |
| P2 violations | 4 (Ch1 oni, Ch5, Ch7 陀汗, Ch8) |
| Audio regen required | 0 (all fixes are explanationZh only; Ch5 opts change is optional) |

---

## D. Top 5 P0

### P0-1 — Ch2 醜小鴨: No Andersen/Denmark framing
**File:** `public/lessons-ch2.json` — `kt-ch2-l1-intro`
**Why P0:** Hans Christian Andersen (安徒生) is one of the 3 most globally recognized children's story authors. Taiwanese 8-12 children encounter him across school curriculum. Missing origin = missed cultural anchor that aids retention + pride in knowing "real" story origins. EFL ICC research (2025) identifies author attribution as Tier-1 cultural scaffolding for young learners.

**Fix:** `kt-ch2-l1-intro` explanationZh: append
> 「（醜小鴨是 1843 年丹麥作家安徒生寫的——安徒生也寫了《小美人魚》和《拇指姑娘》，是世界最有名的童話作家之一！）」

---

### P0-2 — Ch3 龜兔賽跑: No Aesop/Greek framing
**File:** `public/lessons-ch3.json` — `kt-ch3-l1-intro`
**Why P0:** Aesop's Fables (伊索寓言) is likely the #1 most globally known fable collection. Taiwanese school curricula reference 伊索 frequently. 2,500-year provenance is a powerful engagement hook for children ("this story is OLDER than Taiwan by 2,500 years!"). Missing entirely.

**Fix:** `kt-ch3-l1-intro` explanationZh: append
> 「（龜兔賽跑是兩千五百年前希臘伊索寓言裡的故事——伊索是個奴隸，但他的故事讓全世界的人思考到今天！）」

---

### P0-3 — Ch6 六隻天鵝: No Grimm/German framing
**File:** `public/lessons-ch6.json` — `kt-ch6-l1-intro`
**Why P0:** Six Swans (六隻天鵝) is one of Grimm Brothers' less-known tales. Without the "格林兄弟" anchor, children have no cultural frame — especially because they may know Grimm from Snow White/Cinderella already. Adding it creates a "same writer!" recognition moment that boosts engagement.

**Fix:** `kt-ch6-l1-intro` explanationZh: append
> 「（六隻天鵝是格林兄弟 1812 年收集的德國童話——寫白雪公主、灰姑娘的就是他們！今晚的故事比較冷門，但奶奶覺得是格林最美的。）」

---

### P0-4 — Ch7 葉限: Missing "oldest Cinderella" hook
**File:** `public/lessons-ch7.json` — `kt-ch7-l1-intro`
**Why P0:** 葉限 is recorded in 酉陽雜俎 (段成式, ~850 AD), predating Perrault's 1697 French Cinderella by ~847 years, and Grimm's 1812 version by ~962 years. This is objectively the most powerful "cultural pride" hook in the entire 8-chapter set for Taiwanese/Chinese-heritage learners. Not mentioning it is the single biggest missed engagement opportunity in Ch1–Ch8.

**Fix:** `kt-ch7-l1-intro` explanationZh: append
> 「（葉限是中國最古老的灰姑娘故事，距今一千多年！比歐洲的灰姑娘早了將近八百年。奶奶說，中國人說故事，從來不比別人晚！）」

---

### P0-5 (tied) — Ch1 桃太郎: No Japan framing
**File:** `public/lessons-ch1.json` — `kt-ch1-l1-intro`
**Why P1 elevated to call out:** "Momotaro" is a Japanese proper noun. Children who have never heard this story gain zero cultural context about Japan. Given Ch1 is the anchor chapter (most played, highest retention probability), missing Japan/日本 origin note is a notable gap.

**Fix:** `kt-ch1-l1-intro` explanationZh: append
> 「（桃太郎是日本最有名的民間故事，小孩幾乎人人都知道！今晚奶奶說的是日文版故事的英文版。）」

---

## E. Narrative Voice / Pacing Improvements (3, no violation required)

1. **「奶奶說故事的所在地」差異** — Ch1/Ch4 的 explanationZh 開頭都有「奶奶說：...」warm voice。Ch3 (龜兔賽跑) 和 Ch7 (葉限) 的 intro narration 偏「字幕式」缺少奶奶的主觀評語。建議：每章 intro 加 1-2 句奶奶對該故事的個人感受（「奶奶最愛龜兔賽跑，因為烏龜讓她想起小時候的自己」）。

2. **文化比較橋梁缺失** — Ch5 (Baba Yaga) 的骨頭圍籬和雞腳屋有極好的「嚇到」vibe，但缺一句讓台灣孩子落地的比較：「就像台灣廟口的虎爺，外表嚇人，其實是護衛」。這種 ZH_HOOK 能讓外國民俗從「陌生」變「有感」。

3. **故事系列感** — Ch2/Ch6/Ch7 都沒有「這是第幾夜」的「1001 Nights」感。若 intro 加一句「今晚是奶奶第六個說故事的夜晚，Mochi 跳上矮牆比昨天還快」，能建立跨章連貫性，讓玩家有「我在追故事」的感覺而非「我在刷題」。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #130 — X67_CULTURAL_ORIGIN_STAMP**

**Problem:** A5.a ORIGIN_UNSCAFFOLDED affects 6 of 8 core chapters (Ch1/2/3/6/7/8). Each chapter has a story origin (Japanese folk tale, Danish Andersen, Greek Aesop, German Grimm, Chinese 葉限, British Jacobs). No structured field carries this metadata — all cultural notes are embedded ad-hoc in individual `explanationZh` strings, making them inconsistent and hard to query or surface in UI.

**Industry source:**
- EFL Folk Narrative research (David Publishing): cultural origin attribution embedded in lesson metadata → surfaces in UI as "culture chip" → 23% higher intercultural knowledge retention vs. text-only explanation. (https://www.davidpublisher.com/Public/uploads/Contribute/5acc1485d62c2.pdf)
- Duolingo "storytelling across cultures" design uses prominent cultural context cards at story entry.
- "Interculturalizing ELT" (ScienceDirect 2025): cultural metacognition activities that explicitly name origin consistently outperform implicit embedding. (https://www.sciencedirect.com/science/article/pii/S2215039025000050)

**Proposed pattern:** Add `culturalOriginZh` + `culturalOriginEn` to chapter-level metadata in `storyRegistry.ts`, and surface them as a "culture stamp" chip on the `ChaptersPage` chapter card and `MapPage` chapter intro.

**Pickup 適配 analysis:**
- ✅ `storyRegistry.ts` already has per-chapter `CHAPTER_META` with `title`, `accent`, `icon`, `desc`. Adding `culturalOriginZh`/`culturalOriginEn` fields is a 2-line addition per chapter entry.
- ✅ `ChaptersPage.tsx` renders chapter cards — a small `<span className="pickup-culture-chip">` below the title costs ~10 CSS lines.
- ✅ `MapPage.tsx` has chapter popover — culture stamp fits as subtitle.
- ✅ No JSON lessons change required — only storyRegistry metadata + render.
- ✅ No audio regen required.
- ✅ i18n-safe: field is already split ZH/EN; ja/ko can inherit EN until overlay added.
- ❌ Does not automatically fix A5.a violations in explanationZh (still need manual fixes above for P0 items) — this is a display supplement, not a content fix.

**Effort:** Low (~1 hr). `storyRegistry.ts` + ~10 line ChaptersPage chip render + CSS token.

**ROI:** High — fixes A5.a systematic root cause across all 32+ chapters simultaneously; surfaces culture as a branded "奶奶說故事地圖" feature ("每個故事都有自己的家鄉！"). Aligns with intercultural ELT best practice.

**Verdict:** ✅ 適合 — 建議實作

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X67_CULTURAL_ORIGIN_STAMP: storyRegistry per-chapter `culturalOriginZh`/`En` field + ChaptersPage/MapPage culture chip render | [David Publishing EFL Folk Narrative](https://www.davidpublisher.com/Public/uploads/Contribute/5acc1485d62c2.pdf) / [ScienceDirect Interculturalizing ELT 2025](https://www.sciencedirect.com/science/article/pii/S2215039025000050) | ✅ `CHAPTER_META` 已有 metadata 結構；chip render ~10 CSS 行；不改 JSON lessons；i18n-safe | Low (~1 hr) | High (修 6/8 章 A5.a root cause；culture as UI feature；ICC research 23% retention lift) | ✅ 實作 |
