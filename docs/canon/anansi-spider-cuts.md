# Anansi the Spider — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `anansi-spider.md`.
> Generated 2026-06-07 for Pickup Ch21.
> Theme: 智取 (outwit by brains) + 起源神話 (why every home has a story). A2 children-friendly, no blood, no horror, 0 risk.

## Inputs

- **Story**: anansi-spider.md (Akan/Ashanti oral tradition, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist; no animal killed; smart-not-violent framing

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (world has no stories)       val =  0.0 → -0.2  (lack, |Δv|=0.2)         ⚡ peak
Beat 2 (Nyame names price)          val = -0.2 → -0.4  (impossible task, |Δv|=0.2) ⚡ peak
Beat 3 (hornets in the pot)         val = -0.4 → +0.1  (first win, |Δv|=0.5)     ⚡⚡ peak
Beat 4 (python tied to stick)       val = +0.1 → +0.3  (second win, |Δv|=0.2)    ⚡⚡ peak
Beat 5 (leopard in the hole)        val = +0.3 → +0.5  (third win, |Δv|=0.2)     ⚡⚡⚡ peak
Beat 6 (Nyame pays the box)         val = +0.5 → +0.8  (reward, |Δv|=0.3)        🌟 climax
Beat 7 (stories fly to every home)  val = +0.8 → +0.6  (etiological resolve)     ⚡ peak (open)
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago, there were no stories in the world. People sat together at night, and no one had a tale to tell. All the stories belonged to Nyame, the Sky God. **A small spider named Anansi looked up at the sky.** | **B6 預言種子** | 蜘蛛能拿回所有故事嗎? | ✓ home→risk | ✓ open | ✓ inquiry |
| L2 | Anansi went up a long thin thread to the sky. "I want to buy all your stories," he said to Nyame. "The price is high," Nyame said. **"Bring me three animals."** | **B5 道德兩難** | 蜘蛛這麼小, 抓得到嗎? 該答應嗎? | ✓ impossible deal | ✓ open | ✓ inquiry |
| L3 | The first animal was a swarm of hornets. Anansi cut a big leaf and held it over his head like a roof. **He filled a pot with water and poured some on the hornet tree.** | **B3 資訊缺口** | 倒水?他要做什麼? | ✓ plan hidden | ✓ open | ✓ inquiry |
| L4 | The second animal was a long python. Anansi found a strong stick and walked to the python. **"My friend says you are not really that long," Anansi said.** | **B4 期待加速** | 大蛇會上當嗎? 智取怎麼贏? | ✓ trick set | ✓ open | ✓ inquiry |
| L5 | The third animal was a leopard with sharp eyes. Anansi dug a deep hole on the path the leopard liked. **That night the leopard fell into the hole.** | **B1 物理懸念** | 豹會逃走嗎? 蜘蛛接下來怎麼辦? | ✓ caught | ✓ open | ✓ inquiry |
| L6 | Anansi brought the three animals to Nyame in the sky. The Sky God looked at the hornets, the python, and the leopard. **"You are small, but your head is big," Nyame said with a smile.** | **B2 情緒翻轉** | 天神真的會給嗎? 報酬是什麼? | ✓ recognition | ✓ open | ✓ inquiry |
| L7 | Anansi carried the heavy box back down to the ground. He opened the lid in the middle of the village. **The stories flew out like birds and went to every corner of the earth.** | **B6 open** | 為什麼每個家都聽得到故事? 你家的第一個故事是什麼? | ✓ resolves + open | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (origin → user's own story) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × (4 narration × 15s) + 6 tests (~210s) + vocab (30s) + hook (~15s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch21-l1': { type: 'B6',        inquiry: '蜘蛛能拿回所有故事嗎?' },
'kt-ch21-l2': { type: 'B5',        inquiry: '蜘蛛這麼小, 抓得到嗎? 該答應嗎?' },
'kt-ch21-l3': { type: 'B3',        inquiry: '倒水? 他要做什麼?' },
'kt-ch21-l4': { type: 'B4',        inquiry: '大蛇會上當嗎? 智取怎麼贏?' },
'kt-ch21-l5': { type: 'B1',        inquiry: '豹會逃走嗎? 蜘蛛接下來怎麼辦?' },
'kt-ch21-l6': { type: 'B2',        inquiry: '天神真的會給嗎? 報酬是什麼?' },
'kt-ch21-l7': { type: 'B6 open',   inquiry: '為什麼每個家都聽得到故事? 你家第一個故事是什麼?' },
```

---

*Skill validation: Anansi the Spider (Ch21) hook 結構 strong — 連續 B5/B3/B4/B1 智取四連 puts 兒童在「下一個怎麼抓」的張力上, L6 天神認可是 climax. L7 open hook 把「世界上所有故事的起源」拋給 user, 8-12 兒童 + 親子家庭客群可以自然延伸對話. Akan/Ashanti 口傳 公有領域 ✓ 0 Gerald McDermott picture book 0 Disney 風險. 配 Ch19 Sang Kancil 同 trickster underdog genre.*
