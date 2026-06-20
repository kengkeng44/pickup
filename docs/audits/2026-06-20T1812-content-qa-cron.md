# ⚠️ Content QA — 2026-06-20 18:12 UTC

**Today's angle: A5 — Cultural Reference (Cross-Cultural Knowledge Gate)**
**Focus: Ch9–16** (Cinderella / Chang'e / Hou Yi / Cowherd & Weaver / Red Riding Hood / Urashima Taro / Emperor's New Clothes / Issun-boshi)

**A5 Definition (Pickup v2.0 adapted):** A cultural reference violation occurs when:
- **A5a (Knowledge gate)**: The correct MC option can only be chosen by knowing a cultural convention that is NOT established within the current lesson's narrations — requiring prior external knowledge.
- **A5b (Zh-gloss missing)**: A mythological proper noun / cultural term appears in lesson text (sentence, option, or narration) but its zh equivalent is absent — creating comprehension friction for Taiwanese 8-12 children who know the zh version but not the English romanization.
- **A5c (Option role-bias)**: ≥ 3/4 options reference cultural roles (emperor/god/heavenly queen) such that answer selection becomes a cultural role-knowledge test rather than listening comprehension.
- **A5d (Cross-chapter narrative contradiction)**: The same characters appear across two chapters with mutually contradictory plot outcomes, or chapters belonging to the same narrative arc appear in wrong chronological order.
- **A5e (Cultural naming inconsistency)**: The same mythological figure is given different English names across chapters, fragmenting character continuity for children playing both.

**Angle not run this rotation window.** Previous 8 angles: A3 (Ch17-24), A2 (Ch1-8), #11 (Ch9-16), A7 (Ch13-20), #12 (Ch2-8), R2 (Ch27-31), A4 (Ch21-26), R1 (Ch5-8).

---

## A. validate-lessons.js result

```
OK  lessons-ch9.json:  7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch10.json: 1 lint issue(s):
  lessons-ch10.json kt-ch10-l7-q7: X2_OPTION_LIST_BIAS (all start with "to")
OK  lessons-ch11.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch12.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch13.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch14.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch15.json: 7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch16.json: 1 lint issue(s):
  lessons-ch16.json kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")

Total mirror-lint issues (corpus): 72 (warn-only)
```

No linter currently covers A5 violations — these are caught by manual audit only. ARCH-REC #58 proposes an `X11_STORY_ARC_ORDER_LINT` rule.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 10+11 | kt-ch11-l7-q11 (narration) | **A5d P0** | "What came next was Chang'e's story. The moon was waiting..." | **Ch10 (Chang'e) and Ch11 (Hou Yi) are reversed in chapter order.** Ch11 ends with a direct teaser pointing INTO Ch10's plot — confirming Ch11 was designed as the prequel. Children play Ch10 first (Chang'e flying to moon alone), then Ch11 where she lives happily on earth with Hou Yi. Narrative causality is destroyed; emotional payoff of both chapters is undercut. | **Option A** (recommended): Swap storyId mapping so Hou Yi prequel ships as Ch10, Chang'e pill story as Ch11. **Option B**: Add a story-arc banner in StoryModeScene flagging the recommended play order: "建議先玩 Ch11 再玩 Ch10。" | No |
| 10 vs 12 | kt-ch10-l2-q2 (narration) + kt-ch12-l3-q2 (narration) | **A5e P0** | Ch10: "the **Queen Mother** came down from her hill" / Ch12: "The **Heavenly Queen** watched from the high sky" | **Same mythological figure (西王母) given two different English names.** Children who play both chapters encounter "Queen Mother" and "Heavenly Queen" as if they are different characters. No cross-reference or explanation bridges the gap. | Standardize to one name across all chapters. Recommended: **"Queen Mother of the West"** (most accurate), abbreviated to "the Queen Mother" in subsequent mentions within a lesson. Update Ch12-l3 narrations to match Ch10's established "Queen Mother." | Yes (narration TTS affected) |
| 10 | kt-ch10-l7-q8 (narration) | **A5b P1** | "Once each year, in autumn, the moon is full and round. People look up. They miss the ones they love." | **中秋節 (Mid-Autumn Festival) is perfectly invoked but never named.** Taiwanese 8-12 children know 中秋節 intimately — this is the single strongest cultural bridge point in all of Ch10. The explanationZh says only "每年一次,在秋天,月亮又圓又滿" with no 中秋節 connection. Missed opportunity AND a mild comprehension gap (children may wonder "which festival is this?"). | Add to narration explanationZh: "🌕 這就是中秋節賞月故事的由來——每年秋天我們看月亮、想念遠方家人,都是在紀念嫦娥。" | No (narration audio unchanged; only explanationZh) |
| 12 | kt-ch12-l7-q8 (narration) | **A5b P1** | "And so every **Qixi**, Chinese families look up at the sky." | **"Qixi" appears as an English romanization of 七夕 with no zh gloss in the sentence text.** The explanationZh says "所以每年七夕" but the English sentence itself never shows "七夕." A Taiwanese 8-12 child hears "Qixi" in TTS audio and has no visual anchor to connect it to the familiar holiday name 七夕. | Change narration sentence to: `"And so every Qixi (七夕), Chinese families look up at the sky."` — inline gloss solves TTS mismatch and bridges the romanization gap. | Yes (TTS sentence changes) |
| 14 | kt-ch14-l5 (narration) | **A5b P2** | "This is called the Tamatebako," she said softly. | **"Tamatebako" (Japanese: 玉手箱) is named in the English text but its zh equivalent never appears in the lesson.** Function is contextually explained ("never open it") so this is not a blocking knowledge gate. But the cultural richness of the artifact is lost; children familiar with Japanese folklore get no zh anchor. | Add to narration explanationZh: "玉手箱 (Tamatebako)：傳說中的海底魔法盒,封印著浦島在龍宮的所有時光。" | No |
| 11 | kt-ch11-l6-q8 (narration) | **A5d P2** | "His wife Chang'e became a normal woman too." | **Symptom of P0 ordering issue.** In Ch11 (meant to be prequel), Chang'e is referred to as "his wife" before children playing in chapter order have seen the Queen Mother granting permission to marry in Ch10. Circular reference resolved if chapter order is corrected (P0 fix). | Fix via P0 chapter reorder. No independent fix needed. | No |
| 11 | kt-ch11 metadata | **A5d P2** | `storyId='houyi'` | **storyId 'houyi' vs. Ch10 'change' obscures that these are the same myth arc (same characters, continuous plot).** Filter/search by storyId will split the arc incorrectly. | Rename to `storyId='houyi-prequel'` + add `storyArc: 'houyi-change'` and `storyArcOrder: 1` (Ch11) / `storyArcOrder: 2` (Ch10). Enables future `X11_STORY_ARC_ORDER_LINT`. | No |

---

## C. Stats

| Chapter | Story | Violations | Severity |
|---------|-------|-----------|----------|
| Ch9 | Cinderella | 0 | — |
| Ch10 | Chang'e | 3 | P0 (shared) + P1 |
| Ch11 | Hou Yi (prequel) | 3 | P0 (shared) + P2×2 |
| Ch12 | Cowherd & Weaver | 2 | P0 (shared) + P1 |
| Ch13 | Red Riding Hood | 0 | — |
| Ch14 | Urashima Taro | 1 | P2 |
| Ch15 | Emperor's New Clothes | 0 | — |
| Ch16 | Issun-boshi | 0 | — |

**Totals: 2 P0 · 2 P1 · 3 P2**

Ch9 / Ch13 / Ch15 / Ch16 (Western tales) are fully self-contained with no cultural knowledge gates — zero violations. All violations are concentrated in the Chinese and Japanese mythology chapters (Ch10-12, Ch14).

**Bright spots:**
- Ch9 (Cinderella) correctly zh-glosses "仙女教母", "舞會", "馬車" in narration explanationZh before any MC question references them. Model example.
- Ch16 (Issun-boshi) uses generic "demon" rather than the Japanese "oni" — correct choice for A2 ELT level.
- Ch14 (Urashima Taro) uses "sea palace" throughout rather than "Ryugu-jo" — culturally correct simplification.

---

## D. Top 5 P0

1. **⚠️ P0 — Ch10×Ch11 reversed story order** [`A5d`]
   Ch11 is the explicit prequel to Ch10 (confirmed by Ch11-l7-q11: "What came next was Chang'e's story. The moon was waiting..."). Chapter numbering puts Ch10 BEFORE Ch11. A child playing sequentially:
   - Ch10 (first): Chang'e takes immortality pill, flies to moon alone — Hou Yi can never reach her.
   - Ch11 (second): Hou Yi and Chang'e live happily as mortals on earth — "Chang'e walked beside him through every season" — which directly contradicts what they just saw.
   Root cause: Ch11 `storyId='houyi'` was assigned after Ch10 `storyId='change'`, inadvertently reversing the intended arc.
   **Fix priority: HIGH before v2.1 ship.** Either swap chapter numbers or add hard play-order guidance in StoryModeScene UI.

2. **⚠️ P0 — 西王母 name split across Ch10/Ch12** [`A5e`]
   "Queen Mother" (Ch10) ≠ "Heavenly Queen" (Ch12) for the same mythological character. Children playing the full Chinese mythology arc (Ch10→Ch11→Ch12) will believe these are two different divine characters. At minimum this creates confusion; at worst it undermines the coherent Chinese mythology thread that runs Ch10→Ch12.
   **Fix priority: HIGH.** Choose one name and standardize across all JSON files. Requires TTS regen for affected Ch12 narrations.

3. **P1 — Ch10 Mid-Autumn Festival connection unmade** [`A5b`]
   The strongest cultural enrichment point in all 8 focus chapters is missed. Taiwanese 8-12 children already love 中秋節 — connecting Chang'e's story explicitly to the festival would be the most memorable "ah-ha!" learning moment in the entire Chinese mythology arc.

4. **P1 — Ch12 "Qixi" not zh-glossed inline** [`A5b`]
   Taiwanese children know 七夕 but not its English romanization "Qixi." A one-word inline gloss `(七夕)` resolves this with zero architecture change and minimal TTS regen.

5. **P2 — Ch14 "Tamatebako" cultural richness lost** [`A5b`]
   Low blocking risk but significant cultural enrichment gap for the Japanese mythology arc. A one-line zh explanationZh addition restores the artifact's cultural depth.

---

## E. Narrative Voice / Pacing Improvements (3 required)

1. **Ch10 closing grandma voice missing**: The final narrations shift to detached cultural commentary ("People look up. They see the moon. They miss the ones they love.") but lose the grandma's warm storytelling voice. Suggested replacement of kt-ch10-l7-q11:
   > "And every year, when the moon grows big and round, grandma thinks of Chang'e up there... alone, but watching over us all."
   This maintains story-mode feel while linking to 中秋節 sentiment.

2. **Ch12 emotional resolution for 8-12 children**: The chapter ends "One star on each side. Waiting. Until next year. Until next Qixi..." — elegantly melancholic but may leave younger children without closure. Suggest a Mochi/Hana beat in the outro lesson:
   > "Mochi pressed her paw gently on Grandma's knee. One year is not so long, she thought, when you know the one you love is still up there, waiting."
   This emotional landing via the mascots is a core design pattern (outer frame) and is missing from the Ch12 outro.

3. **Ch14 transformation pacing**: The box-opening climax (kt-ch14-l7) jumps from "He opened the lid" directly to "he was a very old man." For 8-12 children, the missing suspense build-up reduces the emotional impact. Suggest inserting a narration between l7-q6 and l7-q9:
   > "First his hands. They shook. His skin turned thin and pale, like old paper in the wind."
   The gradual reveal makes the transformation visceral and memorable — critical for the story's lasting lesson about time.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #58: X11_STORY_ARC_ORDER_LINT

**Industry basis:**
- Wiley Online Library (2026), *"Global Tales: Exploring Cultural Variances in Parent–Child Interactions Within Narrative Settings"* — documents that narrative ordering is a primary determinant of children's story comprehension, especially in cross-cultural contexts.
- SAGE Journals (2026), *"Starting small: Engaging young learners with literacy through multilingual storytelling"* — advocates for explicit L1-cultural scaffolding in sequence-dependent ELT story content.
- arxiv 2604.00282 (2026), *"Not Just Duolingo: Supporting Immigrant Language Preservation Through Family-Based Play"* — shows heritage learner children (Pickup's secondary audience) are particularly sensitive to narrative coherence across sessions; scrambled story arcs break engagement more severely than for non-heritage learners.

**Current gap:** Pickup has no mechanism to detect when two chapters belonging to the same narrative arc (e.g., Hou Yi prequel + Chang'e pill story) are sequenced in wrong chronological order in the chapter numbering scheme. The Ch10/Ch11 P0 violation was undetected in all previous cron cycles.

**Proposed implementation:**

1. Add two optional fields to each lesson JSON (or to `storyRegistry.ts`):
   ```json
   "storyArc": "houyi-change",
   "storyArcOrder": 1
   ```

2. Add lint rule `X11_STORY_ARC_ORDER_LINT` to `tools/validate-lessons.js`:
   ```js
   // Group lessons by storyArc, check storyArcOrder matches chapter number order
   // WARN if chapter N has storyArcOrder > chapter N+1's storyArcOrder for same arc
   ```

3. On first run, flag the Ch10/Ch11 reversal automatically.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| `storyArc` + `storyArcOrder` metadata fields in lesson JSON | Wiley 2026, SAGE 2026 (narrative sequencing research) | ✅ Direct fit — Pickup already uses JSON lesson files with extensible schema. Adding 2 fields + 1 lint rule. | ~2hr (field add + lint rule + validate run) | High — prevents future arc-ordering errors as Ch22-31 history arcs expand | ✅ Implement |

**Constraints respected:** No src/ changes, no lessons-ch*.json content changes in this cycle. Only recommendation.

---

*Audit complete. 2 P0 · 2 P1 · 3 P2 · 3 narrative improvements · 1 ARCH-REC #58. Commit: ⚠️ v2.0.B.cron-content: 2026-06-20-1812 angle: A5-cultural-reference Ch9-16 [+ ARCH-REC #58: X11_STORY_ARC_ORDER_LINT].*
