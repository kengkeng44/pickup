# Content QA — 2026-06-05 00:04 UTC

Today's angle: **#12 — explanationZh story-voice vs jargon**
Focus: **Ch2 (醜小鴨) + Ch3 (龜兔賽跑)**

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 2 lint issue(s)
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
OK  lessons-ch2.json: 7 lessons
WARN lessons-ch3.json: 8 lint issue(s)
  kt-ch3-l2-q5:  X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch3-l2-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q9:  X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l3-q10: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch3-l4-q10: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch3-l5-q5:  X2_OPTION_LIST_BIAS (all start with "she")
  kt-ch3-l5-q10: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch3-l7-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch4.json through ch7.json
Total mirror-lint issues: 14 (warn-only)
```

---

## B. Violation table

### Cluster 1 — 答Yes/No answer-label leak (P0 × 14)

The `explanationZh` for every Yes/No inference question across Ch2 and Ch3 ends with a literal `答 Yes` or `答 No` token. This is test-prep metalanguage: it references the test answer format inside the explanation field. The correct answer is already highlighted in the game UI — repeating it as a label in the explanation adds nothing pedagogically and actively breaks the 奶奶故事 voice contract.

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|-------------|
| Ch2 | kt-ch2-l1-q4 | `蘆葦靜靜地站著 → 安靜的地方 → 答 No` | `答 No` test-label in story explanation | Remove suffix; end on story inference: `"蘆葦靜靜地站著 → 這是個非常安靜的地方。"` | No |
| Ch2 | kt-ch2-l2-q4 | `停下來轉頭 → 注意到他 → 答 Yes` | same | `"停下來轉頭 → 所有人都注意到他了。"` | No |
| Ch2 | kt-ch2-l3-q4 | `所有人都盯著看 → 不是歡迎 → 答 No` | same | `"所有人都盯著看 → 根本沒有人歡迎他。"` | No |
| Ch2 | kt-ch2-l4-q4 | `腳痛 + 很多小時 → 不短也不簡單 → 答 No` | same | `"腳痛 + 好幾個鐘頭 → 那條路一點都不輕鬆。"` | No |
| Ch2 | kt-ch2-l5-q4 | `輕推就開 → 沒有鎖緊 → 答 No` | same | `"輕推就開 → 門根本沒鎖。"` | No |
| Ch2 | kt-ch2-l6-q4 | `脖子看到痠 → 看很久 → 答 Yes` | same | `"脖子看到痠 → 他看了非常非常久。"` | No |
| Ch2 | kt-ch2-l7-q4 | `新花長出 + 暖陽 → 不是冬天了 → 答 No` | same | `"新花長出 + 暖陽 → 寒冬已經過去了。"` | No |
| Ch3 | kt-ch3-l1-q4 | `沒人回話 + 低頭 → 不喜歡聽 → 答 No` | same | `"沒有人回話 + 都低下頭 → 沒有人喜歡聽他這樣說。"` | No |
| Ch3 | kt-ch3-l2-q3 | `大笑到耳朵搖 → 完全不相信 → 答 No` | same | `"大笑到耳朵搖 → 他完全不相信烏龜能跟他比。"` | No |
| Ch3 | kt-ch3-l3-q3 | `看不到殼 → 距離非常大 → 答 No` | same | `"看不到殼 → 烏龜已經遠遠落在後面了。"` | No |
| Ch3 | kt-ch3-l4-q3 | `走到殼變熱 → 走很久很遠 → 答 Yes` | same | `"走到殼都變熱了 → 他已經走了很長一段路。"` | No |
| Ch3 | kt-ch3-l5-q3 | `小鳥把頭轉向他 → 在看他 → 答 Yes` | same | `"小鳥把頭轉向他 → 所有人都在看他。"` | No |
| Ch3 | kt-ch3-l6-q3 | `太陽變低 + 長影子 → 睡很久 → 答 No` | same | `"太陽變低 + 影子拉長 → 他睡了很久很久。"` | No |
| Ch3 | kt-ch3-l7-q3 | `腳落在樹根邊 → 到終點 → 答 Yes` | same | `"腳落在大樹根邊 → 他到了！"` | No |

### Cluster 2 — "主旨 =" TOEIC test-prep jargon (P0 × 2)

`主旨` is a standard TOEIC/GEPT reading-comprehension label ("main idea question"). Seeing it in a 奶奶故事 app is jarring — it signals "you are taking a test," exactly the feeling Pickup's brand promise opposes.

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|-------------|
| Ch3 | kt-ch3-l1-q10 | `主旨 = 兔子在大家面前笑烏龜。` | "主旨 =" TOEIC label | `"奶奶說的就是這個：兔子當著所有動物的面，嘲笑走路慢的烏龜。"` | No |
| Ch3 | kt-ch3-l3-q10 | `主旨 = 兔子決定睡覺。` | same | `"這一段說的是：兔子決定在大樹下先睡一覺，等烏龜慢慢追上來。"` | No |

### Cluster 3 — "背熟這 4 個字" prescriptive teacher directive (P1 × 14)

Every lesson's first question (q1) in both Ch2 and Ch3 ends with `"背熟這 4 個字，故事就會輕鬆聽懂。"` The verb **背熟** (memorize/drill to mastery) carries a homework-enforcement register. It clashes with Pickup's brand voice ("學英文，撿回時間"；不是回家作業).

| Ch | Q ID | snippet | violation | 修法 | audio regen? |
|----|------|---------|-----------|------|-------------|
| Ch2 | kt-ch2-l1-q1 | `背熟這 4 個字，故事就會輕鬆聽懂。` | prescriptive "drill" directive | `"認識了這幾個字，就能跟著奶奶一起聽故事囉。"` | No |
| Ch2 | kt-ch2-l2-q1 | same | same | same fix | No |
| Ch2 | kt-ch2-l3-q1 | same | same | same fix | No |
| Ch2 | kt-ch2-l4-q1 | same | same | same fix | No |
| Ch2 | kt-ch2-l5-q1 | same | same | same fix | No |
| Ch2 | kt-ch2-l6-q1 | same | same | same fix | No |
| Ch2 | kt-ch2-l7-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l1-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l2-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l3-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l4-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l5-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l6-q1 | same | same | same fix | No |
| Ch3 | kt-ch3-l7-q1 | same | same | same fix | No |

### Cluster 4 — X2_OPTION_LIST_BIAS in Ch3 (lint warn × 8, P2)

All 4 options in these Qs begin with the same word (pronoun or "to"). This creates a list-shape tell: learners can pattern-match the correct option by structural features (length, second word) rather than content. Most severe cases where correctIndex is always 1 compound this with an R3-adjacent positional bias risk.

| Ch | Q ID | all-same-start | correct option | note |
|----|------|---------------|----------------|------|
| Ch3 | kt-ch3-l2-q5  | "to" | `to be the judge` (idx 1) | infinitive phrasing natural here; less severe |
| Ch3 | kt-ch3-l2-q10 | "he" | `he had a steady plan` (idx 1) | pronoun bias; restructure 1-2 distractors |
| Ch3 | kt-ch3-l3-q9  | "he" | `he was falling asleep` (idx 1) | same |
| Ch3 | kt-ch3-l3-q10 | "the" | `the hare deciding to sleep` (idx 1) | article lead; less structural, but idx 1 again |
| Ch3 | kt-ch3-l4-q10 | "he" | `he wanted to keep his focus` (idx 1) | pronoun bias; correctIndex 1 for 4th time in lesson |
| Ch3 | kt-ch3-l5-q5  | "she" | `she did not want to wake him` (idx 1) | pronoun bias |
| Ch3 | kt-ch3-l5-q10 | "they" | `they wanted a fair race` (idx 1) | same |
| Ch3 | kt-ch3-l7-q10 | "he" | `he wanted to share a lesson kindly` (idx 1) | same; note also idx 1 all |

**Pattern alert**: in the 8 biased Qs, `correctIndex = 1` in all 8 cases. This is a compound bias: same-start + positional = "second option, second word is the giveaway." This warrants a lint rule upgrade from warn-only to fail for Ch3 specifically.

---

## C. Stats

| category | count |
|----------|-------|
| Ch2 Q scanned | 77 |
| Ch3 Q scanned | 77 |
| Total Q scanned | 154 |
| P0 violations (答Yes/No leak) | 14 |
| P0 violations (主旨 = jargon) | 2 |
| P1 violations (背熟 directive) | 14 |
| P2 lint warns (X2_OPTION_LIST_BIAS) | 8 |
| Narrative voice improvements | 3 |
| **Total issues** | **41** |
| Audio regen required | 0 |

---

## D. Top 5 P0

1. **⚠️ Systemic "答 Yes/No" test-label in explanationZh** — 14 Q across Ch2+Ch3 (every lesson's Yes/No inference Q). This is the highest-frequency single-pattern jargon failure. It signals "test taking" to learners reading the explanation. Fix: strip `答 Yes` / `答 No` suffix from all 14 instances; end explanation on the story-grounded inference conclusion.

2. **⚠️ "主旨 =" TOEIC framing** — Ch3-l1-q10 and Ch3-l3-q10. The word "主旨" (main idea) is TOEIC standard vocab for gist question labels. In a 奶奶讀故事 app it is completely register-wrong. Two lines; easy fix; high brand impact.

3. **⚠️ X2_OPTION_LIST_BIAS + correctIndex=1 compound** — 8 Ch3 questions where all options begin with same word AND correct answer is always index 1. This is a mechanically exploitable tell. A learner who guesses "second option" scores 8/8 on these. Upgrade from lint-warn to lint-fail for this combination.

4. **⚠️ "背熟" prescriptive register** — 14 instances of `背熟這 4 個字`. While each instance is small (one line), the cumulative effect is 14 reminders that this is a vocabulary drill, not a story. One-line fix template: `"認識了這幾個字，就能跟著奶奶一起聽故事囉。"`

5. **⚠️ Ultra-terse explanationZh with no story grounding** — examples: `"一直等 → 擔心。"` (Ch2-l1-q10, 8 chars), `"不再孤單 + 暖陽 → 好一點。"` (Ch2-l4-q8). These arrow chains provide a correct inference but give learners no story context to anchor the emotion. Fix: expand to at least one subject-verb sentence: `"鴨媽媽等啊等，心裡越來越擔心。"` / `"小鴨不再孤單了，暖暖的太陽也讓他好過一點。"`

---

## E. Narrative voice improvement proposals (even zero R-violation baseline)

1. **Vary "推理:" framing across a lesson** — Every inference question in Ch2 and Ch3 uses the identical pattern `推理:X + Y → Z`. After seeing this 3-4 times per lesson, learners recognize it as a formula and stop reading. Proposal: rotate 3 framings:
   - `推理：` (current — keep for explicit inference cue)
   - `從故事裡推：` (story-anchored variant)
   - Subject-verb narrative: `"奶奶沒說，但你看到 X → 那一定是 Z。"` (immersive)
   
2. **奶奶 framing for gist explanations** — Where the explanationZh describes the main point of a passage, root it in the storytelling frame: `"這一夜，奶奶說的是：..."` rather than a bare declarative. Reinforces the Arabian Nights outer-frame. Applies to all `主旨`-type explanations and any bare one-liners.

3. **Emotional beat markers for Ch2's hardest scenes** — Ch2 has genuinely dark moments (hunting scene l4-q9 to q11; farmer's children scene l6). Several explanationZh for these Qs are clinically brief: `"響亮爆裂聲 + 樹叢 → 槍聲。"` A learner who just heard a gunshot scene deserves a line that acknowledges the emotional register: `"樹叢裡突然響亮爆裂 — 那是槍聲。小鴨嚇壞了，拼命跑。"` This is Pickup's core brand differentiator vs Duolingo: emotional resonance in feedback text.

