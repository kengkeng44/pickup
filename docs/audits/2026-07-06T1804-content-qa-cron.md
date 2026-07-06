# Content QA — 2026-07-06 18:04 UTC

**Today's angle:** #9 — A7 Content-Word Repetition (sentence/question content word surfaces exclusively in correct option)
**Focus:** Ch25–Ch32 (113 listen-mc questions audited)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 4 X59_EXPLAINZH_VOICE issues (答案宣判「答案是」)
WARN lessons-ch9.json: 12 issues (X2_OPTION_LIST_BIAS × 2, X49_STIMULUS_REUSE × 3,
     X57_ANTONYM_PAIR_MIRROR × 3, X59_EXPLAINZH_VOICE × 4)
Total mirror-lint issues: 611 (warn-only; MIRROR_LINT_STRICT=1 to fail)
Build passes — no schema errors.
```

---

## B. Violation Table

**A7 Definition:** A content word (noun / verb / adjective, len ≥ 3, non-stopword) from `sentence` or `questionEn` appears verbatim in the **correct option only** — none of the three distractors contain it — enabling surface-match shortcut over true listening comprehension.

**Scoring:**
- **P0** = word length ≥ 5, or ≥ 2 telling words in the same question (students need only hear one key word to select correct answer without understanding the full sentence)
- **P1** = single telling word, length 4 or less

**Total: 68 violations — P0: 55 / P1: 13**
**Hit rate: 55 / 113 = 48.7% P0 across Ch25-32**

### P0 Violations — Selected Representative Cases

| Ch | Q ID | type | Telling Words | Sentence snippet | Correct option | Violation | 修法 | audio regen? |
|----|------|------|--------------|-----------------|----------------|-----------|------|-------------|
| 25 | kt-ch25-l4-q8 | listen-mc | `basket` | "He kept his basket up and kept his eyes on the path." | "keep walking with his basket" | basket appears nowhere in 3 distractors | "keep going without looking back" | No |
| 26 | kt-ch26-l3-q6 | listen-mc | `face`, `thin` | "They saw his face go thin and his eyes grow dark." | "his face was thin and tired" | both face+thin exclusive to correct opt | "he looked pale and hollow" | No |
| 26 | kt-ch26-l4-q6 | listen-mc | `cloth`, `wipe` | "Most people would have called for a cloth to wipe it up." | "ask for a cloth to wipe it" | both cloth+wipe exclusive | "reach for something to dry it" | No |
| 26 | kt-ch26-l5-q8 | listen-mc | `happy`, `long` | "He felt the kind of happy you feel when a long question finally opens." | "as happy as solving a long puzzle" | both exclusive | "like a cloud suddenly lifted away" | No |
| 26 | kt-ch26-l6-q6 | listen-mc | `pure`, `gold`, `weight` | "Beside the crown they placed a piece of pure gold of the same weight." | "pure gold of equal weight" | all 3 exclusive (triple tell) | "a matching lump of solid metal" | No |
| 26 | kt-ch26-l6-q8 | listen-mc | `lower` | "Then they put in the pure gold. The water rose to a lower mark." | "stopped lower than before" | lower exclusive | "settled at a shallower point" | No |
| 26 | kt-ch26-l7-q6 | listen-mc | `small`, `thing`, `care` | "The big idea came from a small thing he saw with care." | "careful watching of a small thing" | 3-word triple tell | "close attention to the ordinary" | No |
| 26 | kt-ch26-l7-q8 | listen-mc | `anywhere` | "A bath, a bowl, a puddle — anywhere can be a tiny science lab." | "anywhere, even at the kitchen sink" | anywhere exclusive | "even an ordinary household item" | No |
| 27 | kt-ch27-l3-q6 | listen-mc | `remember` | "\"Drink this. Remember the dust of your home,\" he said softly." | "so he would remember his country" | remember exclusive | "to keep his homeland in his heart" | No |
| 27 | kt-ch27-l5-q3 | listen-mc | `stone`, `giant`, `hand` | "Five tall stone fingers rose into the sky like a giant hand." | "a giant hand of stone" | triple tell | "enormous rock pillars reaching up" | No |
| 27 | kt-ch27-l6-q3 | listen-mc | `head`, `arm` | "Only his head and one arm could move from the heavy stone." | "only his head and one arm" | head+arm exclusive | "just the top of his body" | No |
| 27 | kt-ch27-l7-q3 | listen-mc | `yellow` | "On the very top was a yellow paper with old gold writing." | "a yellow note with ancient words" | yellow exclusive | "a pale parchment with old script" | No |
| 28 | kt-ch28-l4-q3 | listen-mc | `visit` | "Liu Bei said, \"Today we will visit the small house again.\"" | "visit that cottage again" | visit exclusive | "return to that same place" | No |
| 28 | kt-ch28-l4-q8 | listen-mc | `same`, `boy` | "The same young boy opened the door and gave a small bow." | "the same boy as before" | same+boy exclusive | "the familiar servant from last time" | No |
| 28 | kt-ch28-l5-q6 | listen-mc | `worth`, `visits` | "The brother said the wise man was not worth two visits, much less three." | "he was not worth so many visits" | worth+visits exclusive | "he did not deserve such repeated effort" | No |
| 29 | kt-ch29-l4-q3 | listen-mc | `tied`, `ropes`, `sails` | "The crew tied the ropes and lifted the white sails up high." | "tied ropes and raised the sails" | triple tell — near-verbatim echo | "prepared the ship and set off" | No |
| 29 | kt-ch29-l5-q3 | listen-mc | `stars`, `soft`, `lights` | "By day the sun was warm. By night the stars came out like soft lights." | "soft lights from the stars" | triple tell | "gentle glimmers in the night sky" | No |
| 29 | kt-ch29-l5-q8 | listen-mc | `easy`, `good` | "Day after day the trip felt easy and good." | "easy and good" | near-verbatim — full phrase echo | "smooth and without trouble" | No |
| 29 | kt-ch29-l6-q6 | listen-mc | `scared`, `hands` | "Some of the men were scared and their hands shook on the wet wood." | "scared, with shaking hands" | scared+hands exclusive | "trembling with fear at the sight" | No |
| 30 | kt-ch30-l3-q3 | listen-mc | `sharp`, `sword` | "He also tied a sharp sword to his side with a thick leather belt." | "a bow and a sharp sword" | sharp+sword exclusive | "weapons and armour for battle" | No |
| 30 | kt-ch30-l3-q6 | listen-mc | `quiet` | "The forest was very quiet. No bird sang and no small animal moved." | "utterly quiet, nothing to hear" | quiet exclusive | "completely silent, not a sound" | No |
| 30 | kt-ch30-l4-q3 | listen-mc | `cave`, `rocks` | "There, in front of a deep cave, the giant lion lay on warm rocks." | "resting on rocks near a cave" | cave+rocks exclusive | "sunbathing by a dark hollow in the cliff" | No |
| 30 | kt-ch30-l4-q6 | listen-mc | `right`, `chest` | "He let the arrow fly. It hit the lion right in the chest." | "right in the chest" | right+chest exclusive — near-verbatim | "directly in the middle of its body" | No |
| 30 | kt-ch30-l4-q8 | listen-mc | `bounced` | "Heracles shot two more arrows. Both of them bounced off too." | "all of them bounced away" | bounced exclusive | "every arrow glanced off its hide" | No |
| 30 | kt-ch30-l6-q6 | listen-mc | `fists` | "He took a deep breath in and made both of his hands into fists." | "closed them tight into fists" | fists exclusive | "curled them into tight balls" | No |
| 30 | kt-ch30-l7-q3 | listen-mc | `around`, `neck` | "He wrapped his arms around the lion's thick, warm neck and held tight." | "around the neck" | around+neck exclusive | "seized its throat from behind" | No |
| 30 | kt-ch30-l7-q6 | listen-mc | `stopped` | "Slowly, the lion grew weak in his arms. At last it stopped moving." | "it lost its strength and stopped" | stopped exclusive | "it went limp and still" | No |
| 30 | kt-ch30-l7-q8 | listen-mc | `thick`, `coat` | "He took the lion's thick skin and made it into a warm coat for himself." | "wore it as a thick coat" | thick+coat exclusive | "wrapped the pelt around his shoulders" | No |
| 31 | kt-ch31-l3-q8 | listen-mc | `robin` | "His finger stopped on one short word: Robin." | "the young man robin" | robin exclusive (proper noun tell) | "a young local man whose name stood out" | No |
| 31 | kt-ch31-l4-q3 | listen-mc | `robin's`, `front`, `door` | "They nailed a yellow paper on Robin's front door for everyone to see." | "on robin's front door" | triple tell — verbatim | "posted on his house for all to read" | No |
| 31 | kt-ch31-l4-q8 | listen-mc | `forest` | "Robin smiled softly. \"I will go to the forest. The trees will hide me.\"" | "into the deep forest" | forest exclusive | "among the trees where he could hide" | No |
| 31 | kt-ch31-l5-q6 | listen-mc | `sweet`, `clean` | "Robin took a slow breath. The forest air smelled sweet, like clean rain." | "sweet and clean" | sweet+clean exclusive | "fresh and full of life" | No |
| 31 | kt-ch31-l6-q3 | listen-mc | `thin`, `man`, `torn` | "Behind the oak tree was a thin man with a torn brown coat." | "a thin man in torn clothes" | triple tell | "a gaunt figure in ragged dress" | No |
| 31 | kt-ch31-l6-q6 | listen-mc | `sheriff` | "\"The Sheriff took our farm,\" one old man said." | "they lost their homes to the sheriff" | sheriff exclusive | "an authority figure seized everything" | No |
| 31 | kt-ch31-l7-q6 | listen-mc | `take`, `give`, `poor` | "\"And every coin we take, we will give back to poor families.\"" | "take from rich bad men, give to the poor" | triple tell + near-verbatim | "redistribute wealth from the powerful to those in need" | No |
| 31 | kt-ch31-l7-q8 | listen-mc | `every` | "One by one, every man and woman around the fire said the same thing." | "every person there" | every exclusive | "all of them joined in agreement" | No |
| 32 | kt-ch32-l5-q1 | listen-mc | `lunch` | "A: Are you hungry? B: Yes, let's eat lunch." | "have lunch." | lunch exclusive — direct echo | "grab a meal together" | No |
| 32 | kt-ch32-l5-q2 | listen-mc | `library` | "A: Where are you going? B: To the library." | "visit the library." | library exclusive — direct echo | "go to a place to borrow books" | No |
| 32 | kt-ch32-l8-q5 | listen-mc | `eraser` | "A: Can I borrow your eraser? B: Sure, here you go." | "an eraser." | eraser exclusive — direct echo | "a rubber for correcting mistakes" | No |

### By Chapter

| Ch | Auditable Qs | P0 | P1 | P0 Rate |
|----|-------------|----|----|---------|
| 25 | ~14 | 1 | 1 | 7% |
| 26 | ~14 | 9 | 0 | 64% |
| 27 | ~14 | 8 | 1 | 57% |
| 28 | ~14 | 5 | 5 | 36% |
| 29 | ~14 | 10 | 3 | 71% |
| 30 | ~14 | 11 | 2 | 79% |
| 31 | ~14 | 8 | 1 | 57% |
| 32 | ~15 | 3 | 0 | 20% |
| **Total** | **113** | **55** | **13** | **49%** |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch25–Ch32 |
| Question types checked | listen-mc only |
| Total Qs checked | 113 |
| A7 P0 violations | **55** (48.7%) |
| A7 P1 violations | 13 (11.5%) |
| Triple-tell (3+ words) | 13 questions |
| Near-verbatim echo (correct ≅ sentence) | 6 questions |
| Audio regen required | 0 |
| Worst chapter | Ch30 (P0=11, 79%) |

**Root cause pattern:** Content authors wrote `correct_option` by lifting key nouns/adjectives directly from the sentence, then wrote distractors from a completely different semantic domain (soup, flutes, pillows vs. swords). Students can identify the correct option purely by hearing a content word and matching it — no full-sentence comprehension required. This most severely degrades listen-mc, which is the dominant type (100% of Ch25-32 questions).

---

## D. Top 5 P0

| # | Q ID | Telling Words | Why Critical |
|---|------|--------------|-------------|
| ⚠️ 1 | kt-ch29-l4-q3 | `tied`, `ropes`, `sails` | Triple tell + near-verbatim: "tied ropes and raised the sails" echoes sentence almost word-for-word. Student needs zero comprehension. |
| ⚠️ 2 | kt-ch31-l7-q6 | `take`, `give`, `poor` | Triple tell of key plot words in a climactic Robin Hood moment — biggest comprehension payoff wasted by word matching. |
| ⚠️ 3 | kt-ch26-l6-q6 | `pure`, `gold`, `weight` | Triple tell at the core Archimedes physics moment — the pedagogical peak of Ch26. |
| ⚠️ 4 | kt-ch31-l4-q3 | `robin's`, `front`, `door` | Correct option is almost verbatim sentence fragment — zero paraphrase. |
| ⚠️ 5 | kt-ch30-l4-q6 | `right`, `chest` | "right in the chest" = direct sentence echo. Ch30 is worst chapter overall (79% P0). |

---

## E. Narrative Voice / Pacing Improvement Proposals (no violations required)

Even for questions that pass A7, three structural pacing improvements would raise Ch25-32 quality:

1. **Question stem fatigue (Ch30):** 11 of 14 Ch30 questions use "What did Heracles do/feel/notice?" stem formula. Rotate to "Why did..." / "How did...feel...?" / "Which words best describe..." to vary cognitive demand and prevent learner pattern-matching to the question type rather than the content.

2. **Distractor domain monotony (Ch29 sea voyage):** Most distractors in Ch29 use a fixed 3-domain pattern: *(a) fire/cooking, (b) rest/sleep, (c) city/market*. Learners quickly learn "the answer is never the cooking one" — reduce this by distributing distractor themes more randomly.

3. **Ch32 conversational questions:** The 3 A7 violations in Ch32 (lunch/library/eraser) are structurally different — they're dialogue comprehension where the answer IS the word spoken. For young learners, paraphrasing "library" to "a place to borrow books" may actually increase difficulty appropriately (mapping concept → category). Recommend upgrading these 3 to use conceptual paraphrase as part of a Ch32 comprehension scaffolding pass.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #123: X60_A7_CONTENT_WORD_REPEAT_LINT — Automated A7 surface-match detection in validate-lessons.js

**Industry source:** NBME Item Writing Guide (2021, updated 2024 by PNCB) explicitly bans "**clang associations**" — defined as: *"a word or phrase that appears in the item's stem will also appear in the list of choices and the word or phrase will be the correct answer."* ([NBME Item Writing Guide PDF](https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf), [PNCB 2024 update](https://www.pncb.org/sites/default/files/resources/PNCB_Item_Writing_Manual.pdf))

This is industry-standard item-writing flaw detection used by NBME, PNCB, ACS, ABPS. All four cite it as a reliability threat. Research confirms: *"items become more difficult when distractors are redesigned to be equivalent in content but more similar on a surface level"* (Distractor Similarity and Item-Stem Structure, ResearchGate).

**Pickup 適配分析:**
- ✅ 適合 — Algorithm is simple content-word intersection check, trivially implementable in the existing `validate-lessons.js` Node script
- ✅ JSON lesson files expose `sentence`, `questionEn`, `options`, `correctIndex` — all fields needed
- ✅ Pickup uses listen-mc as dominant type (100% of Ch25-32) — this lint directly targets the highest-volume type
- ✅ Matches existing lint style: X57, X59, X49 all run in same validate-lessons.js pass
- ❌ Cannot auto-fix — requires human rewrite of correct option (paraphrase); lint flags only

**Implementation spec:**
```js
// Add to validate-lessons.js after X57 check
// X60: A7 Content-Word Repeat — 2+ telling content words surface exclusively in correct option
const STOP = new Set(['a','an','the','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','could','should',
  'may','might','must','can','not','no','to','of','in','on','at','by',
  'for','with','from','this','that','what','how','who','when','where','why',
  'they','them','their','we','us','our','you','your','he','she','it','his',
  'her','its','i','me','my','all','some','any','one','two','up','down',
  'very','just','now','and','or','but','so','too','also','even','each']);

function contentWords(text) {
  return text.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/)
    .filter(w => w.length >= 3 && !STOP.has(w));
}

if (['listen-mc','listen-comprehension'].includes(q.type) && q.options?.length >= 4) {
  const src = new Set([...contentWords(q.sentence||''), ...contentWords(q.questionEn||'')]);
  const correctTxt = (q.options[q.correctIndex]||'').toLowerCase();
  const distractors = q.options.filter((_,i)=>i!==q.correctIndex).map(o=>o.toLowerCase());
  const telling = [...src].filter(w =>
    correctTxt.includes(w) && w.length >= 5 &&
    !distractors.some(d=>d.includes(w))
  );
  if (telling.length >= 2) {
    warn(qid, `X60_A7_CONTENT_WORD_REPEAT (telling words: [${telling.join(', ')}] appear only in correct option — surface-match shortcut)`);
  }
}
```

**Effort:** ~30 min (add function + loop to validate-lessons.js, test on Ch25-32)
**ROI:** High — 48.7% P0 rate on Ch25-32 means nearly half of listen-mc questions are compromised. Lint gates future content authoring from repeating this pattern.
**Verdict:** ✅ 建議加進 validate-lessons.js X60 lint rule (warn-only, same as X57/X59)

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X60 A7 Content-Word Repeat Lint (clang-association guard) | [NBME Item Writing Guide](https://www.nbme.org/sites/default/files/2021-02/NBME_Item%20Writing%20Guide_R_6.pdf) · [PNCB 2024](https://www.pncb.org/sites/default/files/resources/PNCB_Item_Writing_Manual.pdf) | ✅ 直接加進 validate-lessons.js X60 rule; 同格式 X57/X59 | 30 min | 高 (49% P0 hit rate Ch25-32) | ✅ 推薦 |
