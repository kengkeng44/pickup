# Content QA — 2026-08-02 06:05 UTC

**Today's angle:** #12 — explanationZh story-voice vs jargon
**Focus:** Ch25–34 (愚公移山 / 阿基米德 / 西遊記 / 諸葛亮 / 奧德修斯 / 海格力斯 / 羅賓漢 / 英檢練習 / 字彙入門 / 打字練習)

---

## A. validate-lessons.js result

```
WARN (all chapters, 25 files) — see individual WARN counts
Total mirror-lint issues: 440 (warn-only, unchanged from last cycle)

Ch25: 16 lint issues  Ch26: 17  Ch27: 17  Ch28: 22  Ch29: 19
Ch30: 22  Ch31: 25  Ch32–34: no schema WARN
```

**CI gate**: tsc + vite build passes. No P0 schema errors. 440 mirror-lint warnings remain warn-only (MIRROR_LINT_STRICT=0).

---

## B. Violation Table — #12 explanationZh story-voice vs jargon

**Scope**: 976 explanationZh entries scanned (Ch25–34).
**Angle rules**:
- GRAMMAR_JARGON — uses ELT metalanguage (動詞, 名詞, be 動詞, 時態, 過去分詞 etc.) in learner-facing text
- CLINICAL_PARSE — sentence anatomy style ("句子說 X——Y" pattern with em-dash dissection)
- DRILL_REGISTER — "問X要回答Y" pattern (test-prep register, not grandma)
- BARE_TRANSLATION_ONLY — "X = Y" with no voice, warmth, or context (≤10 chars, no 奶奶/感嘆/故事 marker)
- TOO_SHORT_NO_VOICE — ≤14 chars, no warm marker — plain story recap without pedagogical framing

| Sev | Ch | Q ID | Violation | Current text | Fix | audio regen? |
|-----|-----|------|-----------|-------------|-----|------|
| P1 | 27 | kt-ch27-l4-lg1 | GRAMMAR_JARGON | 『繼續向前走』英文是 kept walking on——kept + **動詞-ing** 表示『一直持續做某件事』，是很好用的句型！ | 改: 奶奶說：走了好久還是繼續走——kept walking on，表示一直沒有停下來！三藏真的很勇敢。（去掉「動詞-ing」metalanguage） | No |
| P1 | 32 | kt-ch32-l2-q2 | GRAMMAR_JARGON | many apples 是複數，**be 動詞**用 are。 | 改: 很多蘋果（many）要說「它們存在」，用 are 喔！ | No |
| P1 | 32 | kt-ch32-l2-q5 | GRAMMAR_JARGON | Yesterday（昨天）是已經過去的事，**動詞後面加 -ed**：rain→rained、stay→stayed。 | 改: 昨天的事已經過去了，所以 rain 要說成 rained、stay 說成 stayed——加上 -ed 就代表「以前」喔！ | No |
| P1 | 32 | kt-ch32-l9-gm2 | GRAMMAR_JARGON | **had + not + 過去分詞**（表示「在那之前沒有做過」），sleep 的**過去分詞**是 slept。 | 移除/簡化：這題太難了，暫時略過也沒關係！記住 had not slept = 那之前都沒睡到 就夠了。 | No |
| P1 | 32 | kt-ch32-l6-q1 | GRAMMAR_JARGON | 句尾 now（現在）配**現在進行式** is doing。 | 改: 句子說現在正在做的事，用 is doing——now 是提示喔！ | No |
| P2 | 32 | kt-ch32-l1-q1 | DRILL_REGISTER | 問 What time（幾點）**要回答時間**，At seven o'clock（七點）才對。 | 改: 奶奶說：有人問幾點？記得說 At + 幾點！At seven o'clock 就是七點。 | No |
| P2 | 32 | kt-ch32-l1-q2 | DRILL_REGISTER | 問 Where（哪裡）**要回答地點**，on the chair（在椅子上）。 | 改: 有人問「在哪裡？」，就說地點——on the chair（在椅子上）！ | No |
| P2 | 32 | kt-ch32-l1-q3 | DRILL_REGISTER | 問 How many（多少）**要回答數量**，just two（只要兩支）。 | 改: 問多少的時候，就說數字——just two，只有兩支！ | No |
| P2 | 32 | kt-ch32-l8-q1 | DRILL_REGISTER | 問 How old（幾歲）**要回答年齡**，She turned six last month（上個月滿六歲）才合適。 | 改: 有人問幾歲？就說年紀——She turned six last month，上個月才滿六歲！ | No |
| P2 | 33 | kt-ch33-l1-q2 | CLINICAL_PARSE | 句子說 It is black——牠是黑色的，聽到顏色就抓到重點了喔。 | 改: 奶奶說：It is black——牠是黑色的！聽到顏色，就知道答案了！ （去掉"句子說X——"解剖格式，保留暖色收尾） | No |
| P3 | 34 | kt-ch34-l1-q1 to q8 (×8) | BARE_GLOSS | 「狗」的英文是 dog。（全 l1–l7 共 56 條同格式） | 統一加奶奶前綴或感嘆：奶奶說：這隻是 dog，狗狗！或句末加「記住了嗎？」 | No |
| P3 | 32 | kt-ch32-l4-q1 to q5, l7-q1 to q4, l10-q1 to q4 (×13) | BARE_TRANSLATION_ONLY | 大樓 = building。（等號格式，無語境，無溫度） | 改: 大樓就是 building，很高很大的那種！ 或 奶奶說：building = 大樓 | No |
| P3 | 33 | kt-ch33-l1-q1, l2-q2, l3-q1 etc. (×12) | BARE_TRANSLATION_ONLY | 狗 = dog。 / 紅色 = red。 | 同 Ch34 fix pattern：加入「奶奶說：」或「你還記得嗎？」 | No |
| P3 | 25 | kt-ch25-l3-q7, l4-q2, l4-q5, l4-q9, l5-q5, l6-q5, l7-q7 (×7) | TOO_SHORT_NO_VOICE | 全家人拿起籃子，開始幹活。（中文直譯，無教學觸及） | 加句尾引導：「奶奶說：大家都來幫忙，你聽到幾個人了嗎？」或「一起加油的感覺！」 | No |

**Totals**: P0: 0 / P1: 5 / P2: 4 / P3: 32 (BARE_GLOSS+BARE_TRANSLATION+TOO_SHORT) = 41 flagged entries

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total explanationZh entries scanned | 976 |
| Chapters covered | Ch25–34 |
| P0 (grammar jargon entirely replacing warmth) | 0 |
| P1 (GRAMMAR_JARGON — explicit ELT metalanguage) | 5 |
| P2 (DRILL_REGISTER / CLINICAL_PARSE) | 5 |
| P3 (BARE_GLOSS / BARE_TRANSLATION_ONLY / TOO_SHORT_NO_VOICE) | 31 |
| Clean entries (no violation) | 935 (95.8%) |
| Worst offender chapter | Ch34 (31/70 = 44% bare glosses) |

---

## D. Top 5 P0/P1

1. ⚠️ **kt-ch32-l9-gm2** (Ch32) — "had + not + 過去分詞（表示『在那之前沒有做過』），sleep 的過去分詞是 slept" — Full grammar metalanguage (`過去分詞` × 2) with zero warmth; violates both GRAMMAR_JARGON and age-register (B1+ jargon in 8-12 child content). Priority: simplify or remove.

2. ⚠️ **kt-ch32-l2-q5** (Ch32) — "Yesterday（昨天）是已經過去的事，動詞後面加 -ed：rain→rained、stay→stayed" — `動詞` jargon + rule-first framing vs story-contextual. Fix: "昨天的事加上 -ed 就好！rained、stayed."

3. ⚠️ **kt-ch27-l4-lg1** (Ch27) — "kept + 動詞-ing 表示『一直持續做某件事』，是很好用的句型" — `動詞-ing` is grammar metalanguage; breaks grandma register mid-story. Ch27 is 西遊記 — feels like a textbook note. Fix: story-anchored paraphrase.

4. ⚠️ **kt-ch32-l2-q2** (Ch32) — "many apples 是複數，be 動詞用 are" — `be 動詞` label. Fix: implicit contextual "很多蘋果要說 are！"

5. ⚠️ **kt-ch32-l1-q1** (Ch32) — "問 What time（幾點）要回答時間，At seven o'clock（七點）才對" — drill-register "問X要回答Y" breaks the grandma storytelling frame entirely. Fix: 奶奶 voice pivot.

---

## E. Narrative Voice / Pacing Improvements (always-3, per spec)

Even with no P0 found, the following improvements apply across the clean 95.8%:

1. **Ch32 l2 "grammar = playful secret"**: The grammar lessons in Ch32 l2/l6/l9 have warmth markers (奶奶說：文法就像拼圖…) but the per-Q explanations switch to dry rule-stacking. Suggestion: Each Q explanation in grammar lessons should extend the "puzzle" metaphor — e.g., "這一塊拼圖是 are，放進去就完整了！" instead of listing the rule.

2. **Ch34 "圖卡記憶 hook" missing**: Ch34 is a typing/image chapter. The intro says "看著圖記單字最牢". But 56 bare-gloss Qs say "「X」的英文是 Y." — missing the image-hook connection. Suggestion: Every 3–4 Qs add a warmth bridge: "奶奶說：你記住這張圖了嗎？dog = 狗，下次見到狗就說 dog！"

3. **Ch25–31 story chapters: recap explanationZh too plain**: 7 entries in Ch25 are plain Chinese paraphrases of the English sentence — no teaching moment, no Mochi/奶奶reference. Suggestion: even a short "奶奶點點頭：大家一起動手，這就是 work together！" ties it back to the vocabulary target without adding quiz pressure.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #232: X232_IMPLICIT_FEEDBACK_STORY_ANCHOR — Implicit-first explanationZh with story-grounded anchoring**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Implicit-first feedback** (contextual gloss > grammar rule) | [Duolingo research via OpenAI 2025](https://openai.com/index/duolingo/) — "implicit learning through repeated context > memorizing rules"; [ERIC EJ1473941 Duolingo Stories](https://files.eric.ed.gov/fulltext/EJ1473941.pdf) — "mainly effective in enhancing receptive implicit knowledge" | ✅ 適合 — Pickup 客群 8-12 兒童，grandma frame 要求 contextual tone; 現有 5× P1 GRAMMAR_JARGON 直接受益 | Low (content-only fix, no code) | High | **✅ 立即適用** |
| **Age-appropriate metalanguage gating** (no jargon <10; minimal 10+) | [British Council Teaching English — Reading and Young Learners](https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/reading-and-young-learners) — "some simple metalanguage from age 10 upwards can be helpful"; quasi-experimental study 9-12 yr: contextual > explicit metalinguistic for children | ✅ 適合 — 允許 "加 -ed", "加 s" 但禁 "動詞", "過去分詞", "be 動詞", "複數" 等 declarative labels | Low | High | **✅ 建議加進 validate-lessons lint rule** |
| **Story-anchor pattern**: tie explanation to story character or scene | Duolingo Stories UX (role-play / character-first reveal) — feedback tied to character action, not abstract rule | ✅ 適合 — Pickup 有 奶奶/Mochi/Hana 角色; 現有 35+ BARE_GLOSS 直接受益; samle: "奶奶說：三藏一直走，kept walking on——一直做某件事就這樣說！" | Low | High | **✅ 立即適用** |

### 實作建議

1. **Lint rule 新增** (`validate-lessons.js`): 掃 `explanationZh` 命中 `/動詞|名詞|形容詞|副詞|過去分詞|現在進行式|be 動詞|複數形/` → WARN `X232_GRAMMAR_METALANG`
2. **Content fix 優先順序**: P1 × 5 (Ch27 l4-lg1 + Ch32 l2-q2/l2-q5/l9-gm2/l6-q1) → P2 × 4 (DRILL_REGISTER) → P3 × 31 (BARE_GLOSS/TOO_SHORT)
3. **Template 建議** (for bare glosses):
   - 短字彙 (Ch33/34): "奶奶說：{ZH} 就是 {EN}，記住了嗎？" (≤18 chars +)
   - 文法 (Ch32): "{story-anchor}——{EN pattern}！" (故事比喻接規則)
   - 旁白中文 recap (Ch25): "奶奶說：{故事行動}，{key word} 就是這個意思！"

---

*Audit completed: 2026-08-02 06:05 UTC — angle #12 (explanationZh story-voice vs jargon) — 976 entries scanned — 41 violations — 0 P0, 5 P1, 5 P2, 31 P3 — ARCH-REC #232*
