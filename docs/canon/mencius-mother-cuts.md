# 孟母三遷 — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `mencius-mother.md`.
> Generated 2026-06-07 for Pickup Ch22.
> Theme: 教養 + 環境塑人 + 為孩子的選擇. A2 children-friendly. 0 死亡 explicit. 海外華人家長 heritage anchor.

## Inputs

- **Story**: mencius-mother.md (中華歷史 + 民間傳說, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist, no 'graveyard' / 'funeral' / 'philosopher', child-friendly tone, 0 死亡 explicit

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (mother + son)            val =  0.0 → +0.2  (warm setup, |Δv|=0.2)         ⚡ peak
Beat 2 (burial games)            val = +0.2 → -0.3  (mother's worry, |Δv|=0.5)     ⚡⚡ peak
Beat 3 (market move)             val = -0.3 → +0.0  (try again, |Δv|=0.3)          ⚡ peak
Beat 4 (calling prices)          val = +0.0 → -0.3  (worry again, |Δv|=0.3)        ⚡ peak
Beat 5 (next to school)          val = -0.3 → +0.4  (it works, |Δv|=0.7)           ⚡⚡ peak
Beat 6 (cut cloth)               val = +0.4 → -0.2 → +0.5  (knife shock then lesson, |Δv|=0.9)  🌟 climax
Beat 7 (great thinker)           val = +0.5 → +0.7  (warm payoff + open, |Δv|=0.2) ⚡ peak
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | A mother lived with her small son near a place where people remembered family. Every day Meng watched people walk past slowly. **He started to copy what he saw.** | **B6 預言種子** | 孟子小時候住墓地附近 → 他學了什麼? | ✓ home→risk | ✓ open | ✓ inquiry |
| L2 | Soon Meng played the same games at home with sticks. His mother watched. **Her heart felt heavy.** | **B3 資訊缺口** | 媽媽看見他玩埋葬遊戲 → 怎麼辦? | ✓ value at risk | ✓ open | ✓ inquiry |
| L3 | "This is not the place for my son to learn," she said. They moved near a busy market. **Meng watched people buy and sell all day long.** | **B5 道德兩難** | 搬到市場附近 → 孟子又學了什麼? | ✓ try again | ✓ open | ✓ inquiry |
| L4 | "Two for one coin! Fresh today!" Meng shouted in their yard. His mother heard him. She put down her cloth. **She knew it was time to move again.** | **B4 期待加速** | 媽媽看到他學叫賣 → 該再搬嗎? | ✓ second fail | ✓ open | ✓ inquiry |
| L5 | The third house stood right next to a small school. Every morning Meng heard children reading out loud. **Meng began to copy the words.** | **B6 預言種子** | 搬到學校旁 → 孟子開始讀書 | ✓ change starts | ✓ open | ✓ inquiry |
| L6 | One day Meng came home early. He did not want to study. His mother sat at her loom. **Without a word, she took her knife. She cut the cloth in two.** | **B2 情緒翻轉** | 媽媽剪斷織布 → 為什麼? | ✓ shock turn | ✓ open | ✓ inquiry |
| L7 | Meng did not stop again. He read every day for many years. **He grew up and became a great thinker for all of China.** | **B6 open** | 孟子成為大思想家 → 媽媽的選擇 | ✓ resolves + open hook | ✓ open question | ✓ inquiry |

## Step 7: Validation

**3-question checklist** per cut:

| Cut | McKee turning? | Stein open-not-resolve? | Brewer inquiry? | Score |
|----|----|----|----|----|
| L1 | ✓ | ✓ | ✓ | 3/3 |
| L2 | ✓ | ✓ | ✓ | 3/3 |
| L3 | ✓ | ✓ | ✓ | 3/3 |
| L4 | ✓ | ✓ | ✓ | 3/3 |
| L5 | ✓ | ✓ | ✓ | 3/3 |
| L6 | ✓ | ✓ | ✓ | 3/3 |
| L7 | resolves intentionally | open question (環境/媽媽選擇) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch22-l1': { type: 'B6',        inquiry: '孟子小時候住墓地附近 → 他學了什麼?' },
'kt-ch22-l2': { type: 'B3',        inquiry: '媽媽看見他玩埋葬遊戲 → 怎麼辦?' },
'kt-ch22-l3': { type: 'B5',        inquiry: '搬到市場附近 → 孟子又學了什麼?' },
'kt-ch22-l4': { type: 'B4',        inquiry: '媽媽看到他學叫賣 → 該再搬嗎?' },
'kt-ch22-l5': { type: 'B6',        inquiry: '搬到學校旁 → 孟子開始讀書' },
'kt-ch22-l6': { type: 'B2',        inquiry: '媽媽剪斷織布 → 為什麼?' },
'kt-ch22-l7': { type: 'B6 open',   inquiry: '孟子成為大思想家 → 媽媽的選擇' },
```

---

*Skill validation: 孟母三遷 (Ch22) hook 結構 strong — B6→B3→B5→B4→B6→B2→B6open 是教養 arc 經典 (warning → worry → try → fail → progress → shock-turn → payoff). L6 剪布是 climax (媽媽用行動教,不罵不打). L7 open hook 拋給家長 user 自己「為孩子搬過家?」 海外華人家長 #1 共鳴 (換學區/heritage). 中華歷史 + 民間傳說 ✓ 0 譯本 / 0 教科書 / 0 動畫風險. 0 死亡 explicit (墓地 → 'place where people remembered family').*
