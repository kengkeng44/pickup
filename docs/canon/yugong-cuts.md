# Yu Gong Moves the Mountains — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `yugong.md`.
> Generated 2026-06-07 for Pickup Ch25.
> Theme: 堅持 + 家庭. A2 children-friendly, no blood, no horror, 0 death, 0 risk.

## Inputs

- **Story**: yugong.md (列子《湯問》, 春秋戰國 classical parable, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist, no 'die' / 'foolish' / 'sky gods', child-friendly tone

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (mountains block home)        val =  0.0 → -0.2  (problem framed, |Δv|=0.2)    ⚡ peak
Beat 2 (plan to move + laugh)        val = -0.2 → -0.4  (doubt seeded, |Δv|=0.2)      ⚡ peak
Beat 3 (sons + grandsons help)       val = -0.4 → +0.0  (family rallies, |Δv|=0.4)    ⚡⚡ peak
Beat 4 (one basket + laughter)       val = +0.0 → -0.3  (slow + mocked, |Δv|=0.3)     ⚡⚡ peak
Beat 5 (who continues after you?)    val = -0.3 → -0.5  (deepest doubt, |Δv|=0.2)     ⚡⚡⚡ peak
Beat 6 (forever and ever answer)     val = -0.5 → +0.6  (heart reframes, |Δv|=1.1)    🌟 climax
Beat 7 (kind giants help)            val = +0.6 → +0.4  (reward + open lesson)         ⚡ peak
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago, there lived an old man called Yu Gong. His home stood between two very big mountains. **Every day Yu Gong had to walk around them to get to town.** | **B6 預言種子** | 兩座大山每天擋路 → 他會做什麼? | ✓ home→risk | ✓ open | ✓ inquiry |
| L2 | One evening, Yu Gong sat with his family by the door. "I want to move the mountains away from our home," he said. A neighbor heard him. **The neighbor laughed and asked, "Is that even possible?"** | **B3 資訊缺口** | 鄰居笑 → 真的可能嗎? 他會怎麼說服家人? | ✓ doubt set | ✓ open | ✓ inquiry |
| L3 | The next morning, his sons came out with baskets. His grandsons came too, with smaller baskets in small hands. **They asked, "How should we carry all this stone?"** | **B5 道德兩難** | 大家來幫忙 → 該怎麼運? 一筐能搬多少? | ✓ help vs scale | ✓ open | ✓ inquiry |
| L4 | Every day they took one basket of stone and dirt away. The walk to the river was very long. A man passing by stopped to watch them. **He laughed and said, "You are old. You cannot finish this."** | **B4 期待加速** | 路人嘲笑 → 愚公會放棄? 還是繼續? | ✓ mocked + slow | ✓ open | ✓ inquiry |
| L5 | The man asked, "After you are gone, who will keep going?" Yu Gong put down his basket and stood up tall. **He looked at his sons and his small grandsons.** | **B1 物理懸念** | 他抬頭看小孩 → 他要怎麼回答? | ✓ rebuttal pending | ✓ open | ✓ inquiry |
| L6 | "I have sons. My sons have sons. My grandsons will have sons too." **"Our family will go on forever and ever."** | **B2 情緒翻轉** | 子子孫孫無窮匱 → 大家會繼續嗎? 天上有人看嗎? | ✓ doubt → faith | ✓ open | ✓ inquiry |
| L7 | Far above, kind giants from the sky were watching. They saw how the family worked together with strong hearts. **They came down softly and carried the two mountains away.** | **B6 open** | 為什麼天神幫忙? 堅持的人會被看見嗎? | ✓ resolves + open hook | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (堅持 question) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch25-l1': { type: 'B6',        inquiry: '兩座大山每天擋路 → 他會做什麼?' },
'kt-ch25-l2': { type: 'B3',        inquiry: '鄰居笑 → 真的可能嗎? 他會怎麼說服家人?' },
'kt-ch25-l3': { type: 'B5',        inquiry: '大家來幫忙 → 該怎麼運? 一筐能搬多少?' },
'kt-ch25-l4': { type: 'B4',        inquiry: '路人嘲笑 → 愚公會放棄? 還是繼續?' },
'kt-ch25-l5': { type: 'B1',        inquiry: '他抬頭看小孩 → 他要怎麼回答?' },
'kt-ch25-l6': { type: 'B2',        inquiry: '子子孫孫無窮匱 → 大家會繼續嗎? 天上有人看嗎?' },
'kt-ch25-l7': { type: 'B6 open',   inquiry: '為什麼天神幫忙? 堅持的人會被看見嗎?' },
```

---

*Skill validation: Yu Gong (Ch25) hook 結構 strong — L2 鄰居懷疑 → L4 路人嘲笑 → L5 「你死後誰繼續」遞進式 doubt, L6 「子子孫孫無窮匱」是 emotional climax, L7 天神助 = open reward 把「堅持會被看見嗎?」拋給 user, 8-12 兒童 + 親子家庭可以自然延伸對話 (爺爺奶奶 / 三代同心)。列子《湯問》>2000 年公有領域 ✓ 0 modern adaptation 風險.*
