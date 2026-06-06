# 孔融讓梨 — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `kong-rong.md`.
> Generated 2026-06-07 for Pickup Ch24.
> Theme: 分享 + 長幼有序 + 家庭體貼. A2 children-friendly, no conflict, 0 risk.

## Inputs

- **Story**: kong-rong.md (中華歷史民間 7-beat, public domain, >1800 years)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist, no 'humble' / 'virtue' / 'sibling', child-friendly tone, 0 conflict

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (big family + pear plate)     val =  0.0 → +0.3  (warm setup, |Δv|=0.3)     ⚡ peak
Beat 2 (father asks Kong Rong first) val = +0.3 → +0.2  (gentle anticipation)       ⚡ peak
Beat 3 (pears side by side)          val = +0.2 → +0.1  (quiet decision moment)     ⚡ peak
Beat 4 (picks the small one)         val = +0.1 → +0.4  (surprise reveal, |Δv|=0.3) ⚡⚡ peak
Beat 5 (I am the youngest)           val = +0.4 → +0.7  (emotional payoff)          ⚡⚡ peak
Beat 6 (what about brothers?)        val = +0.7 → +0.6  (one more layer)            ⚡ peak
Beat 7 (they are bigger - lesson)    val = +0.6 → +0.9  (warm climax, |Δv|=0.3)     🌟 climax
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in China, there lived a boy named Kong Rong. He was four years old and the youngest of seven brothers. **One evening, their father came home with a plate of pears.** | **B6 預言種子** | 七個兄弟一盤梨 — 怎麼分? 誰會先選? | ✓ home→choice | ✓ open | ✓ inquiry |
| L2 | The father put the plate down on the family table. He looked at little Kong Rong and gave a kind smile. "You are the youngest. You may pick first," he said. **All six brothers turned their heads to watch.** | **B3 資訊缺口** | 大家都看著他 — 他會選哪個? | ✓ spotlight | ✓ open | ✓ inquiry |
| L3 | Big pears and small pears sat side by side. One pear was the biggest of all. It looked very sweet. One pear was the smallest. It looked a bit thin. **Kong Rong looked at the pears for a long moment.** | **B5 道德兩難** | 大的 vs 小的 — 該選哪個? | ✓ choice frame | ✓ open | ✓ inquiry |
| L4 | Kong Rong reached out with his small hand. He did not take the biggest pear. He picked up the smallest pear from the plate. **His father looked at him and asked, "Why this one?"** | **B4 期待加速** | 為什麼選小的? 父親想聽什麼答案? | ✓ unexpected | ✓ open | ✓ inquiry |
| L5 | Kong Rong held the small pear in his hands. "I am the youngest in our family," he said. "I should take the small one, not the big one." **His father smiled a warm smile back at him.** | **B1 情緒** | 父親為什麼笑? 他在想什麼? | ✓ heart moment | ✓ open | ✓ inquiry |
| L6 | The father asked again with a soft voice. "And what about your six older brothers?" Kong Rong thought for a moment and looked up. **He gave a simple and clear answer.** | **B2 情緒翻轉** | 還有什麼答案? 比剛剛更深嗎? | ✓ second turn | ✓ open | ✓ inquiry |
| L7 | "My brothers are bigger than me," Kong Rong said. "They should take the big pears, not me." The father was so happy he could not speak. **That night the family learned a small but big lesson.** | **B6 open** | 你會學到什麼? 你家的小弟弟妹妹呢? | ✓ resolves + open | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (你家?) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch24-l1': { type: 'B6',        inquiry: '七個兄弟一盤梨 — 怎麼分? 誰會先選?' },
'kt-ch24-l2': { type: 'B3',        inquiry: '大家都看著他 — 他會選哪個?' },
'kt-ch24-l3': { type: 'B5',        inquiry: '大的 vs 小的 — 該選哪個?' },
'kt-ch24-l4': { type: 'B4',        inquiry: '為什麼選小的? 父親想聽什麼答案?' },
'kt-ch24-l5': { type: 'B1',        inquiry: '父親為什麼笑? 他在想什麼?' },
'kt-ch24-l6': { type: 'B2',        inquiry: '還有什麼答案? 比剛剛更深嗎?' },
'kt-ch24-l7': { type: 'B6 open',   inquiry: '你會學到什麼? 你家的小弟弟妹妹呢?' },
```

---

*Skill validation: 孔融讓梨 (Ch24) hook 結構 strong — 連續 B5/B4 道德兩難 + 期待加速 puts 兒童在「他到底要選哪個 + 為什麼」的張力上. L5 + L6 雙轉折 (理由 1 + 理由 2) 讓「分享」概念兩層展開, L7 open hook 把「家裡誰最小」拋給 user, 8-12 兒童 + 親子家庭客群可以自然延伸對話. 中華歷史民間 (>1800 年) 公有領域 ✓ 0 modern adaptation 風險 ✓ 0 衝突 ✓ 100% 溫馨家庭.*
