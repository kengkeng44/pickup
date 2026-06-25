# Content QA — 2026-06-25 00:09 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (Chinese translation accuracy, register consistency, child-friendliness for 8-12 target audience)
**Focus:** Ch9–16 (Cinderella, Weaver Girl/Niulang-Zhinü, Little Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-boshi, Three Billy Goats Gruff/Momotaro variants)

---

## A. validate-lessons.js result

```
OK lessons-ch9.json: 7 lessons (JSON shape + mirror + extended lint)
(ch10–ch16 all OK — no R1/X2/X3 violations)
Total mirror-lint issues: 70 (warn-only)
```

All Ch9–16 files pass the existing CI guard. The optionsZh angle exposes issues not yet covered by validate-lessons.js.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 14 | kt-ch14-l3-x4 | grammar-mc | "lead / led / leaded / leading" | **P0** ZH_PURE_GRAMMAR_LABEL — optionsZh = `["原形","過去式","錯誤形","進行式"]`; no EN word, pure meta-label; reveals grammar class without pointing to the word | Add EN word: `["lead（原型）","led ✓","leaded（錯誤）","leading（進行中）"]` → better: `["lead（基本型）","led（說過去！）","leaded（這個不對）","leading（正在做）"]` | No |
| 14 | kt-ch14-l7-x4 | grammar-mc | "untie / unties / untied / untying" | **P0** ZH_PURE_GRAMMAR_LABEL — optionsZh = `["原形","第三人稱現在式","過去式","進行式"]`; pure grammar taxonomy labels, no EN word | Add EN word: `["untie（基本型）","unties（說他/她）","untied ✓（說過去！）","untying（正在做）"]` | No |
| 15 | kt-ch15-l2-x4 | grammar-mc | "can / cans / could to / canning" | **P0-triple** (1) ZH_CORRECT_REVEALED — optionsZh[0] = "正確助動詞"; correct answer literally labelled 正確 → testwiseness instant giveaway (2) ZH_DUPLICATE — "錯誤形" appears at idx 1 AND idx 3; two options indistinguishable (3) ZH_PURE_GRAMMAR_LABEL — entire array is meta-labels | Full rewrite: `["can（可以！）","cans（can 沒有 s）","could to（搭配錯）","canning（不對）"]` | No |
| 15 | kt-ch15-l5-x3 | grammar-mc | "step / steps / stepped / stepping" | **P0** ZH_PURE_GRAMMAR_LABEL — `["原形","第三人稱現在式","過去式","進行式"]` | Add EN word: `["step（基本型）","steps（說他/她）","stepped ✓（說過去！）","stepping（正在做）"]` | No |
| 16 | kt-ch16-l5-x4 | grammar-mc | "shout / shouts / shouted / shouting" | **P0** ZH_PURE_GRAMMAR_LABEL — `["原形","第三人稱現在式","過去式","進行式"]` | Add EN word: `["shout（基本型）","shouts（說他/她）","shouted ✓（說過去！）","shouting（正在做）"]` | No |
| 9 | kt-ch9-l2-x5 | grammar-mc | "got / get / gets / getting" | **P1** ZH_META_ANNOTATION — `["got（過去式，變成）","get（現在原形）","gets（第三人稱現在）","getting（現在分詞）"]`; 原形/過去式/現在分詞 are adult grammar jargon; 8-12 child unfriendly | → `["got ✓（說過去！）","get（基本型）","gets（說他/她）","getting（正在做）"]` | No |
| 9 | kt-ch9-l4-x5 | grammar-mc | "held / hold / holds / holding" | **P1** ZH_META_ANNOTATION — 過去式/原形/第三人稱現在/進行式 jargon | → `["held ✓（說過去！）","hold（基本型）","holds（說他/她）","holding（正在做）"]` | No |
| 10 | kt-ch10-l2-x5 | grammar-mc | "gave / give / gives / giving" | **P1** ZH_META_ANNOTATION | → `["給（說過去！）","給（基本型）","給（說他/她）","給（正在給）"]` or `["gave ✓","give","gives","giving"]` with child story gloss | No |
| 10 | kt-ch10-l4-x5 | grammar-mc | "stood / stand / stands / standing" | **P1** ZH_META_ANNOTATION | → `["stood ✓（說過去！）","stand（基本型）","stands（說他/她）","standing（正在做）"]` | No |
| 11 | kt-ch11-l2-x8 | grammar-mc | "give / gave / gives / giving" | **P1** ZH_META_ANNOTATION — `["give（原形）","gave（過去式）","gives（第三人稱）","giving（進行式）"]` | → `["give（基本型）","gave ✓（說過去！）","gives（說他/她）","giving（正在做）"]` | No |
| 11 | kt-ch11-l3-x5 | grammar-mc | "takes / take / taking / took" | **P1** ZH_META_ANNOTATION | → `["takes（說他/她）","take（基本型）","taking（正在做）","took ✓（說過去！）"]` | No |
| 11 | kt-ch11-l5-x5 | grammar-mc | "laugh / laughs / laughed / laughing" | **P1** ZH_META_ANNOTATION | → `["laugh（基本型）","laughs（說他/她）","laughed ✓（說過去！）","laughing（正在做）"]` | No |
| 12 | kt-ch12-l1-x9 | grammar-mc | "comes / come / came / coming" | **P1** ZH_META_ANNOTATION | → `["comes（說他/她）","come（基本型）","came ✓（說過去！）","coming（正在來）"]` | No |
| 12 | kt-ch12-l2-x8 | grammar-mc | "feel / feels / felt / feeling" | **P1** ZH_META_ANNOTATION | → `["feel（基本型）","feels（說他/她）","felt ✓（說過去！）","feeling（正在感受）"]` | No |
| 12 | kt-ch12-l3-x8 | grammar-mc | "go / goes / went / going" | **P1** ZH_META_ANNOTATION | → `["go（基本型）","goes（說他/她）","went ✓（說過去！）","going（正在去）"]` | No |
| 12 | kt-ch12-l4-x8 | grammar-mc | "draw / draws / drawn / drew" | **P1** ZH_META_ANNOTATION | → `["draw（基本型）","draws（說他/她）","drawn（已完成）","drew ✓（說過去！）"]` — note: drew should be correct | No |
| 12 | kt-ch12-l5-x8 | grammar-mc | "leave / leaves / left / leaving" | **P1** ZH_META_ANNOTATION | → `["leave（基本型）","leaves（說他/她）","left ✓（說過去！）","leaving（正在離開）"]` | No |
| 12 | kt-ch12-l6-x8 | grammar-mc | "hold / holds / held / holding" | **P1** ZH_META_ANNOTATION | → `["hold（基本型）","holds（說他/她）","held ✓（說過去！）","holding（正在做）"]` | No |
| 12 | kt-ch12-l7-x8 | grammar-mc | "point / points / pointed / pointing" | **P1** ZH_META_ANNOTATION | → `["point（基本型）","points（說他/她）","pointed ✓（說過去！）","pointing（正在指）"]` | No |
| 13 | kt-ch13-l1-x8 | grammar-mc | "make / makes / made / making" | **P1** ZH_META_ANNOTATION | → `["make（基本型）","makes（說他/她）","made ✓（說過去！）","making（正在做）"]` | No |
| 13 | kt-ch13-l2-x8 | grammar-mc | "come / comes / came / coming" | **P1** ZH_META_ANNOTATION | → `["come（基本型）","comes（說他/她）","came ✓（說過去！）","coming（正在來）"]` | No |
| 13 | kt-ch13-l3-x8 | grammar-mc | "nod / nods / nodded / nodding" | **P1** ZH_META_ANNOTATION | → `["nod（基本型）","nods（說他/她）","nodded ✓（說過去！）","nodding（正在點頭）"]` | No |
| 13 | kt-ch13-l4-x8 | grammar-mc | "knock / knocks / knocked / knocking" | **P1** ZH_META_ANNOTATION | → `["knock（基本型）","knocks（說他/她）","knocked ✓（說過去！）","knocking（正在敲）"]` | No |
| 13 | kt-ch13-l5-x8 | grammar-mc | "put / puts / putting / puted" | **P1** ZH_META_ANNOTATION | → `["put ✓（說過去！put 不變）","puts（說他/她）","putting（正在放）","puted（拼法錯）"]` — note: put is irregular, past=put | No |
| 13 | kt-ch13-l6-x8 | grammar-mc | "hear / hears / heard / hearing" | **P1** ZH_META_ANNOTATION | → `["hear（基本型）","hears（說他/她）","heard ✓（說過去！）","hearing（正在聽）"]` | No |
| 13 | kt-ch13-l7-x8 | grammar-mc | "pull / pulls / pulled / pulling" | **P1** ZH_META_ANNOTATION | → `["pull（基本型）","pulls（說他/她）","pulled ✓（說過去！）","pulling（正在拉）"]` | No |
| 13 | kt-ch13-l3-q7 | listen-mc | `["只有她自己的名字","奶奶住哪","她最愛的顏色","時間"]` | **P2** ZH_LENGTH_DISPARITY — lens:[8,4,6,2] max/min=4.0x; "時間" (2 chars) vs "只有她自己的名字" (8 chars) | Expand: "時間" → "幾點鐘" or "現在幾點" | No |
| 15 | kt-ch15-l6-q3 | listen-mc | `["透過彩色玻璃","就是他真正的樣子","閉眼","小鏡子裡"]` | **P2** ZH_LENGTH_DISPARITY — lens:[6,8,2,4] max/min=4.0x; "閉眼" (2 chars) clipped | Expand: "閉眼" → "閉著眼睛" | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Total Q with optionsZh (Ch9–16) | 435 |
| P0 violations (critical) | **5 unique questions** (7 violation rows — kt-ch15-l2-x4 has 3) |
| P1 violations (child register) | **21 grammar-mc questions** across all 8 chapters |
| P2 violations (length disparity) | 2 |
| **Total flagged** | **28 rows / 28 unique questions** |
| Chapters with P0 | Ch14 (×2), Ch15 (×2), Ch16 (×1) |
| Chapters P1-clean | None — all 8 chapters have P1 jargon annotations |

**P1 pattern is systemic** — every chapter in Ch9–16 has grammar-mc questions using 原形/過去式/進行式 jargon in optionsZh. This is a content-generation-level pattern, not isolated typos.

---

## D. Top 5 P0

1. **⚠️ kt-ch15-l2-x4** — Triple P0: (a) optionsZh[0] = "正確助動詞" → correct answer visually labelled "correct"; (b) "錯誤形" duplicated at idx 1 & 3 → two options indistinguishable in Chinese; (c) pure meta-label set with no EN word. A Chinese-reading child sees "正確助動詞" and immediately knows answer = A without processing any English. Hardest violation in this batch.

2. **⚠️ kt-ch14-l3-x4** — Pure grammar taxonomy labels `["原形","過去式","錯誤形","進行式"]` with no EN word at all. The optionsZh are not translations — they're grammar category names. A child looking at the ZH column gets zero help mapping to the English options; simultaneously, if they know 過去式 = past tense and the explanation says "過去式", they get the answer from Chinese alone.

3. **⚠️ kt-ch14-l7-x4** — Same pure-label pattern `["原形","第三人稱現在式","過去式","進行式"]`; grammatically sophisticated labels inappropriate for 8-12 audience; "第三人稱現在式" is 7 characters of adult grammar jargon.

4. **⚠️ kt-ch15-l5-x3** — `["原形","第三人稱現在式","過去式","進行式"]` with no EN word; same structural problem as #3.

5. **⚠️ kt-ch16-l5-x4** — `["原形","第三人稱現在式","過去式","進行式"]`; pattern repeats across Ch14–16 suggesting batch-generation failure where the template dropped the EN word prefix.

---

## E. Narrative Voice / Pacing Improvement (3 items — mandatory even with violations)

Even without R1–R8 structural violations, these story-voice improvements apply:

1. **kt-ch12-l3-q9 opt[1]** — ZH "表示不想走" for EN "showed she did not want to go". "表示" is an academic reporting verb (used in essays: "此句表示…"). Warmer grandma voice: "用行動說不想離開" or "緊抓著牛郎的手" (mirrors the story detail in explanationZh).

2. **kt-ch13-l3-q7 opt[3]** — ZH "時間" (bare noun) for EN "the time of day". In the Little Red Riding Hood context, the wolf is asking what time it is. "時間" reads as abstract; warmer/clearer for children: "幾點鐘" (specific, conversational, the way a grandma would say it).

3. **kt-ch15-l3-q3 opt[1]** — ZH "空的織布機" for EN "looms with no cloth on them". EN explicitly emphasises the ABSENCE ("no cloth") — the dramatic irony of the Emperor's New Clothes story is that everyone pretends to see cloth on empty looms. ZH "空的" captures "empty" but drops the contrast. Warmer: "什麼布都沒有的機器" — preserves the dramatic "nothing there" emphasis that drives the story lesson.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background: Industry Scan

| Source | Key Finding |
|--------|-------------|
| WebSearch: Duolingo children approach | "allows learners to discover patterns on their own **without needing to focus on language rules**" — implicit grammar, no metalanguage in child UI |
| WebSearch: Linguistics/metalanguage research | "concepts like 'noun' and grammar terminology would be **incomprehensible to young children** (e.g., 5-year-olds can form regular plurals without knowing the word 'noun')" |
| IJLTER paper: "Impact of Metalanguage on EFL Grammar Recognition" | Metalanguage aids older/adult EFL learners; **detrimental or neutral for young children** without explicit grammar instruction background |
| Lingokids vs Duolingo comparison | Lingokids: "holistic, integrating language learning with life skills" — no grammar labels in child-facing UI |

**Finding**: Pickup's grammar-mc optionsZh currently uses adult grammar metalanguage (原形/過去式/第三人稱現在式/進行式/助動詞) in child-facing UI. This contradicts both (a) the 8-12 child target audience and (b) the "warm grandma story voice" brand standard. Industry leaders (Duolingo, Lingokids) do not expose grammar taxonomy labels to child learners.

**Pickup architecture impact**: The `optionsZh` field in grammar-mc questions is rendered directly to the child. Currently there is no separation between "child-facing hint" vs "teacher/parent grammar note". The fix is a content rewrite — no schema change needed.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Child-friendly grammar hint system** — replace metalanguage (原形/過去式/進行式) with story-voice annotations (基本型/說過去的事/正在做/說他她) in optionsZh | Duolingo implicit-grammar model; IJLTER metalanguage research | ✅ 完全適合 — no schema change; pure optionsZh JSON rewrite; 26 questions in Ch9-16; establishes pattern for Ch17-31 | Medium (batch JSON rewrite via Fable 5, ~26 questions × 8 Ch) | High — fixes P0/P1 register for all grammar-mc; aligns brand voice | ✅ 推薦實作 |
| **`optionsZhMode` field** — add optional field `"optionsZhMode": "grammar-label"` to grammar-mc questions so UI can render differently for parent/teacher mode vs child mode | Duolingo "Explain My Answer" mode (2026, now free for all) | 🟡 部分適合 — useful if parent mode is planned; overkill for current v2.0 scope; child mode is primary | High (schema + UI change) | Medium — future-proofing only | 🟡 記錄，Phase 3 評估 |

**ARCH-REC #75: X28_ZH_GRAMMAR_LABEL_CHILD_REWRITE**

Systematically rewrite grammar-mc `optionsZh` in Ch9-16 (26 questions, P0×5 + P1×21) from adult grammar taxonomy labels to child-friendly story-voice annotations:

```
原形        → {EN word}（基本型）
過去式      → {EN word} ✓（說過去的事！）  [on correct] or {EN word}（說過去的事）
進行式      → {EN word}（正在做）
第三人稱現在式 → {EN word}（說他/她）
正確助動詞  → {EN word}（可以！）
錯誤形      → {EN word}（不對唷）
錯誤搭配    → {EN word}（搭配錯）
```

**Files to touch**: `public/lessons-ch9.json` through `public/lessons-ch16.json` (optionsZh fields only, grammar-mc type questions at x4/x5/x8 positions).

**Batch dispatch recommendation**: Fable 5 (`claude-fable-5`) — language/register rewrite, large volume, parallel per chapter.

**Expected outcome**: All 26 flagged grammar-mc optionsZh shift from adult grammar taxonomy to warm, child-appropriate story-voice annotations. P0 testwiseness eliminated. P1 register mismatch resolved. Pattern documented for Ch17-31 batch.
