# Content QA — 2026-06-16 06:11 UTC

**Today's angle: #12 — explanationZh story-voice vs jargon**
**Focus: Ch21–26** (Anansi the Spider / Mulan / Sima Guang / Book of Songs / Yugong / Archimedes)

> **Rotation context**: Previous crons covered #11 optionsZh (Ch13-20), A4 mirror (Ch5-12), A3 semantic (Ch10-17), A1 keyword-pull (Ch9-18), R1 paraphrase (Ch1-8), A6 option-in-Q (Ch19-26), R2 distractor (Ch12-18), A2 answer-echo. Angle **#12 (explanationZh story-voice vs jargon)** not visited in any prior window.
>
> **Angle #12 Definition**: Examines the Chinese explanation text shown to child learners after answering, checking for:
> - **EZ-JARGON-推理**: `推理:` prefix — educational metalanguage the child never asked for
> - **EZ-JARGON-paraphrase**: `(paraphrase)` label — English ELT jargon visible to 8-12 zh-TW kids
> - **EZ-INTERNAL-CODE**: `X3-safe` / `urgency` / `friendly f` — internal audit codes leaking into user-facing content
> - **EZ-COLD**: Flat dictionary definition format instead of warm story anchor
> - **EZ-UI-LEAK**: `左中右英` — describes UI grid layout, not meaningful to child
> - **EZ-LONG**: >60 chars — child won't read; rule of thumb ≤40 chars for child ELT
>
> **Method**: Python regex scan across Ch21–26 JSON (462 questions). Cross-checked against previous chapters for systemic scope.

---

## A. validate-lessons.js result

```
WARN lessons-ch21.json: 10 lint issue(s)
  kt-ch21-l2-q3: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l2-q4: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l3-q5: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch21-l3-q9: X2_OPTION_LIST_BIAS (all start with "it")
  kt-ch21-l4-q3: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch21-l4-q4: R1_SUBSTRING / X3_R1_VERBATIM_WORDS
  kt-ch21-l4-q10: X2_OPTION_LIST_BIAS
  kt-ch21-l6-q3: X2_OPTION_LIST_BIAS
  kt-ch21-l6-q4: X2_OPTION_LIST_BIAS
  kt-ch21-l7-q4: R1_SUBSTRING / X3_R1_VERBATIM_WORDS
OK  lessons-ch22.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch23.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch24.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch25.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch26.json: 1 lint issue(s)
  kt-ch26-l7-q5: X2_OPTION_LIST_BIAS (all start with "it")

Total mirror-lint issues: 70 (existing; none introduced this audit)
#12-EZ-JARGON P0 (推理 / paraphrase): 178   ← SYSTEMIC NEW FINDING, Ch21-26 scope
#12-EZ-INTERNAL-CODE P0 (X3-safe): 5         ← NEW FINDING
#12-EZ-INTERNAL-CODE P1 (urgency/friendly): 3 ← NEW FINDING
#12-EZ-UI-LEAK P1 (左中右英): 42             ← STRUCTURAL TEMPLATE ISSUE
```

> **Scope expansion**: Cross-chapter scan confirms this is not local to Ch21-26 —
> **661 questions across ALL 31 chapters** carry `推理:` or `paraphrase` jargon.
> Ch21-26 subset (178) is audited in detail below; systemic fix required at content-generation template level.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence excerpt | explanationZh (truncated) | Violation | 修法 | audio regen? |
|----|------|------|-----------------|--------------------------|-----------|------|-------------|
| Ch21 | `kt-ch21-l1-q8` | listen-mc | "long thin thread that went all the way up" | 推理: long thin thread → 高高的絲繩 **(paraphrase, X3-safe)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE X3-safe** (triple hit — worst) | 蜘蛛用長長的絲線，一路爬上天！ | No |
| Ch21 | `kt-ch21-l2-q6` | listen-mc | "Nyame looked down and laughed at the small spider" | 推理: looked down + laughed → 取笑這個小訪客 **(paraphrase, X3-safe)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE X3-safe** | 天神從上往下看，還笑了 — 根本沒把小蜘蛛當回事！ | No |
| Ch26 | `kt-ch26-l2-q3` | listen-mc | "no tool he knew could cut / melt the crown" | 推理: cannot cut + cannot melt → 不能破壞王冠 **(paraphrase, X3-safe)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE X3-safe** | 切也切不開，熔也熔不掉 — 王冠完好無缺！ | No |
| Ch26 | `kt-ch26-l6-q8` | listen-mc | "water rose to lower mark on the side" | 推理: rose to lower mark → 停在比較低的位置 **(paraphrase, X3-safe)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE X3-safe** | 水升到比較低的刻度 — 代表他身體較輕！ | No |
| Ch26 | `kt-ch26-l7-q3` | listen-mc | "rule from that bath became part of science forever" | 推理: became part of science forever → 今天還在用 **(paraphrase, X3-safe)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE X3-safe** | 從那次洗澡發現的道理，現在全世界還在用！ | No |
| Ch23 | `kt-ch23-l3-q6` | listen-mc | "water closed over his head. He could not breathe" | 推理: water closed over head + could not breathe → 正在下沉 **(paraphrase, 兒童 friendly f…)** | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + **EZ-INTERNAL-CODE friendly** | 水淹過頭頂，根本沒辦法呼吸 — 他在下沉！ | No |
| Ch23 | `kt-ch23-l4-q10` | listen-mc | "(urgency context — child in water)" | 小孩在水裡 + 大人遠 → 時間快沒了 **(urgency)**。 | **P0** EZ-INTERNAL-CODE urgency (no 推理 prefix but still internal label) | 大人都在遠處，根本來不及！時間快沒了 | No |
| Ch23 | `kt-ch23-l5-q6` | listen-mc | "friend going under, time very short" | 推理: friend going under + time very short → 時間快沒了 **(paraphrase, urgency)**。 | **P0** EZ-JARGON-推理 + EZ-JARGON-paraphrase + EZ-INTERNAL-CODE urgency | 朋友沉下去了，時間快沒了 — 快！ | No |
| Ch21 | `kt-ch21-l1-q3` | listen-mc | "no one had a tale to tell" | 推理: no tale to tell → 很安靜很空 (paraphrase)。 | P0 EZ-JARGON-推理 + EZ-JARGON-paraphrase | 沒有故事可說 — 大家只能靜靜坐著，空空的！ | No |
| Ch21 | `kt-ch21-l2-q8` | listen-mc | "list was hornets, python, and leopard" | 推理: hornets + python + leopard → 三個強的動物 (paraphrase)。 | P0 EZ-JARGON-推理 + EZ-JARGON-paraphrase | 黃蜂、大蛇、豹 — 都是嚇人的強敵！ | No |
| All Ch21-26 | _all l*-q1_ | vocab | "Here are 4 words you will meet tonight" | 本節新單字 **(左中右英)**:\n🔑 sky god = 天神\n…\n背熟這 4 個字,故事就會輕鬆聽懂 | P1 EZ-UI-LEAK (左中右英 = UI grid desc) + EZ-LONG (79-95 chars) | Remove `(左中右英)` → `今晚故事的 4 個新朋友：` as opening; trim to ≤55 chars | No |
| Ch25 | `kt-ch25-l1-q6` | listen-mc | "had to take long path" | 推理: could not go straight + had to take long path → 山擋住短路線 (paraphrase)。 | P0 EZ-JARGON-推理 + EZ-JARGON-paraphrase + EZ-LONG 72 chars | 直路被山擋住了，只能繞長路走 | No |
| Ch26 | `kt-ch26-l3-q3` | listen-mc | "did not eat much. slept very little" | 推理: did not eat much + slept very little → 吃得少又睡得少 (paraphrase)。 | P0 EZ-JARGON-推理 + EZ-JARGON-paraphrase | 又不吃又不睡 — 阿基米德滿腦子都在想這件事！ | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Questions scanned (Ch21-26) | 462 |
| EZ-JARGON P0 (推理 + paraphrase, Ch21-26) | 178 (38.5%) |
| EZ-INTERNAL-CODE P0 (X3-safe) | 5 — in Ch21 & Ch26 |
| EZ-INTERNAL-CODE P0 (urgency/friendly) | 3 — in Ch23 |
| EZ-UI-LEAK P1 (左中右英, Ch21-26) | 42 vocab-preview q1s |
| **SYSTEMIC scope (ALL chapters)** | **661 / ~1400 questions** carry 推理/paraphrase jargon |
| Chapters affected (systemic) | 31 / 31 |

---

## D. Top 5 P0

### P0-1 ⚠️ X3-safe / urgency / friendly — internal code labels in user-facing content (CRITICAL)

**IDs**: `kt-ch21-l1-q8`, `kt-ch21-l2-q6`, `kt-ch26-l2-q3`, `kt-ch26-l6-q8`, `kt-ch26-l7-q3`, `kt-ch23-l3-q6`, `kt-ch23-l4-q10`, `kt-ch23-l5-q6`

Internal audit codes `X3-safe`, `urgency`, `friendly f` are visible to child users in the reveal panel. A child (or parent) seeing "(paraphrase, X3-safe)" or "(urgency)" gets meaningless garbage text. Severity: **critical** — brand trust / product quality.

**Fix**: Strip all internal code labels from `explanationZh`. Add lint rule in `validate-lessons.js`:
```js
if (/\(X3-safe\)|\(urgency\)|\(paraphrase\)|\bfriendly f/.test(ez)) flag(qid, 'EZ_INTERNAL_CODE')
```

### P0-2 ⚠️ Systemic `推理:` prefix (661 questions, 31 chapters)

ALL inference/reasoning questions use the template `推理: [A] + [B] → [C] (paraphrase)。`. For 8-12 zh-TW children:
- `推理` = academic metalanguage (CSAT-level word, not CEFR A2)
- `→` = logic arrow from formal reasoning notation
- `+ [B]` = enumeration format used in lecture slides, not storybooks

**ELT research consensus** (TEFL Academy / de Gruyter 2024 / Oxford TEFL): metalanguage should be avoided with young A2 learners; warm story-anchored feedback outperforms formal labels.

**Fix**: Replace template. See ARCH-REC #40 below.

### P0-3 ⚠️ (paraphrase) English jargon visible to zh-TW child users

`(paraphrase)` is English ELT terminology leaked from the content-generation prompt into production content. An 8-12 Taiwanese child reading this after answering a question has no idea what "paraphrase" means.

**Fix**: Purge `(paraphrase)` labels. Add lint guard. Part of ARCH-REC #40.

### P0-4 ⚠️ EZ-LONG: 推理 blocks run 62-95 chars (child won't read)

Child ELT best practice (Toptal 2025 / Mia dialogic-reading 2025): feedback must be scannable in ≤2 seconds. Current `推理: [A] + [B] → [C] (paraphrase)。` blocks average ~68 chars and use structure-heavy notation. Target: ≤40 chars, warm single sentence.

### P0-5 ⚠️ `左中右英` UI description in vocab explanationZh (42 vocab q1s, all Ch21-26)

`本節新單字 (左中右英):` means "this section's new vocabulary (left=Chinese right=English layout)". A child never needs to know the grid layout description. This is UI scaffolding language leaked into copy.

**Fix**: Change opener to `今晚故事的 4 個新朋友：` — warm, child-friendly, story-connected.

---

## E. Narrative Voice / Pacing Improvement (3 proposals, even if 0 R1-R8 violations found)

### NV-1: Story-anchor opener
Replace `推理: [premise]` with character-name opener. Instead of `推理: small spider + clever idea → 很聰明`, use `蜘蛛 Anansi 雖然小，但腦袋轉得快！`. Grounds explanation in the character the child just heard.

### NV-2: Exclamation energy for correct answers
Children expect celebration at the explanation stage. Add `！` or `呢！` to correct explanations. Duolingo "Explain My Answer" (2026) notes that immediacy + positive framing improves retention for beginners. Example: `蜘蛛用長長的絲線，一路爬上天！` > `推理: long thin thread → 高高的絲繩 (paraphrase)。`

### NV-3: Connect explanation to upcoming story beat
For mid-story questions, end explanation with a curiosity hook: `那後來蜘蛛成功了嗎？繼續聽！` — this bridges answer feedback into continued engagement, mimicking Duolingo Stories' "keep listening" momentum pattern.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #40: EZ-STORY-VOICE — Lint + story-voice template for explanationZh

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Duolingo "Explain My Answer" (2026)**: personalized, contextual, error-specific — zero jargon prefix, conversational tone | [blog.duolingo.com/explain-my-answer-now-free](https://blog.duolingo.com/explain-my-answer-now-free) | ✅ Direct parallel: replace `推理:` template with character-anchored warm sentence | S+M (lint S, rewrite 661 Qs M-batch via Fable subagent) | ⭐⭐⭐ | **ADOPT** |
| **Metalanguage avoidance for young A2** (Oxford TEFL / de Gruyter 2024): children learning EFL perform better with no grammatical metalanguage; story-contextualized feedback preferred | [theteflacademy.com](https://www.theteflacademy.com/blog/metalanguage-in-the-efl-classroom/) | ✅ Confirms `推理` / `paraphrase` labels are anti-pattern for target age (8-12) | — | ⭐⭐⭐ | **CONFIRMS ADOPT** |
| **Mia dialogic-reading AI (2025 RCT)**: AI character gives story-related scaffolding, not metalanguage; warm tone matches character in story | [bera-journals 2025](https://bera-journals.onlinelibrary.wiley.com/doi/10.1111/bjet.13615) | ✅ Pickup already has Mochi/Hana/奶奶 — use character names in explanationZh to anchor to story | S (content rewrite prompt change) | ⭐⭐ | **ADOPT** |
| **Children's interactive feedback = ≤2s scan** (Toptal Interactive Design Guide 2025): visual response to every interaction; text feedback must be short and celebratory | [toptal.com/designers](https://www.toptal.com/designers/interactive/guide-to-apps-for-children) | ✅ Confirms ≤40 char target for EZ; current 68-char average fails | S (lint LONG threshold) | ⭐⭐ | **ADOPT** |

**Concrete implementation for Pickup**:

**Step 1 — lint guard (S, ~30 min)**
Add to `tools/validate-lessons.js`:
```js
// ARCH-REC #40: EZ story-voice lint
if (q.explanationZh) {
  if (/^推理:/.test(q.explanationZh))
    issues.push(`${q.id}: EZ_JARGON_TUILI (starts with 推理:)`);
  if (/\(paraphrase\)/.test(q.explanationZh))
    issues.push(`${q.id}: EZ_JARGON_PARAPHRASE`);
  if (/X3-safe|urgency|friendly f/.test(q.explanationZh))
    issues.push(`${q.id}: EZ_INTERNAL_CODE (internal label in user text)`);
  if (q.explanationZh.length > 60)
    issues.push(`${q.id}: EZ_LONG (${q.explanationZh.length} chars > 60)`);
}
```

**Step 2 — content rewrite (M, Fable batch)**
Target format for inference questions:
```
[Character/story anchor] + [what happened] — [child-friendly zh conclusion]！
```
Examples:
- Before: `推理: long thin thread → 高高的絲繩 (paraphrase, X3-safe)。`
- After:  `蜘蛛 Anansi 用絲線一路爬上天 — 好厲害的辦法！`

- Before: `推理: water closed over head + could not breathe → 正在下沉 (paraphrase, 兒童 friendly f…)`
- After:  `水淹過頭頂，他喘不過氣 — 正在往下沉！`

**Step 3 — vocab preview opener (S)**
Change `本節新單字 (左中右英):` → `今晚故事的 4 個新朋友：` across all 42 q1s.

**Files**: `tools/validate-lessons.js` (lint) + `public/lessons-ch{1-31}.json` (content, 661 Qs + 42 vocab openers)
**Scope**: 703 explanationZh fields across 31 files
**Batch approach**: Fable 5 subagent per chapter (parallelizable, 31 × small batch)
