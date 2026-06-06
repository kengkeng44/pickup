# Sima Guang Breaks the Jar — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `sima-guang.md`.
> Generated 2026-06-07 for Pickup Ch23.
> Theme: 急時用聰明救人 (when time is short, smart thinking beats help-seeking). A2 children-friendly, no blood, no death, 0 risk.

## Inputs

- **Story**: sima-guang.md (Chinese folk legend, Song Shi 1345 CE + earlier oral, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist; no death; `drown` → `could not breathe` / `going under water`; smart-not-strong framing

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (children play in garden)       val =  0.0 → +0.2  (warm setup, |Δv|=0.2)       ⚡ peak
Beat 2 (boy climbs big jar)            val = +0.2 → +0.1  (curiosity + risk, |Δv|=0.1) ⚡ peak
Beat 3 (boy falls in)                  val = +0.1 → -0.6  (crisis, |Δv|=0.7)           ⚡⚡⚡ peak
Beat 4 (others run for adults)         val = -0.6 → -0.7  (help too far, |Δv|=0.1)     ⚡⚡ peak
Beat 5 (Sima Guang stays)              val = -0.7 → -0.4  (different choice, |Δv|=0.3) ⚡⚡ peak
Beat 6 (picks stone, breaks jar)       val = -0.4 → +0.3  (decisive action, |Δv|=0.7)  ⚡⚡⚡ peak
Beat 7 (friend saved + moral)          val = +0.3 → +0.7  (rescue + legacy, |Δv|=0.4)  🌟 climax + open
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in old China, a group of children played in a big garden. The sun was warm. The trees were tall. The children ran and laughed. Among them was a small boy named Sima Guang. **He was quiet but he watched everything with bright eyes.** | **B6 預言種子** | 一群小孩在花園玩 — 危險將至? | ✓ warm→tension | ✓ open | ✓ inquiry |
| L2 | In one corner of the garden stood a very big water jar. It was taller than the children and full of water to the top. One boy looked up at the jar and wanted to see inside. **He began to climb the side of the big water jar.** | **B3 資訊缺口** | 一個小孩爬大水缸 — 結果如何? | ✓ risk rising | ✓ open | ✓ inquiry |
| L3 | The boy reached the top edge of the jar. For a moment he sat on the rim and smiled down at his friends. Then his foot slipped, and he fell into the water with a loud splash. **The water closed over his head. He could not breathe.** | **B5 道德兩難** | 小孩掉進水缸 — 大家會怎樣? | ✓ crisis | ✓ open | ✓ inquiry |
| L4 | The other children stopped playing and stared with wide eyes. "Help! Help!" they cried, but no grown-up was close by. Most of them turned and ran out of the garden to find an adult. **Their small feet ran fast on the path, but the gate was far away.** | **B4 期待加速** | 其他孩子都跑走找大人 — 來得及嗎? | ✓ time pressure | ✓ open | ✓ inquiry |
| L5 | One small boy did not run with the others. Sima Guang stayed by the big jar, looking at the water. His friend was going under, and time was very short. **"An adult will not come fast enough," he thought to himself.** | **B1 物理懸念** | 司馬光留下沒跑 — 他想做什麼? | ✓ different path | ✓ open | ✓ inquiry |
| L6 | Sima Guang looked around the garden for something hard. He picked up a heavy stone from the grass with both small hands. With all his strength, he threw the stone at the side of the jar. **The jar cracked, then broke, and water poured out fast onto the ground.** | **B2 情緒翻轉** | 撿石頭砸破水缸 — 水流出來 | ✓ action breakthrough | ✓ open | ✓ inquiry |
| L7 | The water flowed out of the broken jar in a great rush. His friend came out with the water, coughing but alive. The other children came back with an adult, who saw what had happened. **And people still tell this story today: in a hard moment, smart thinking can save a life.** | **B6 open** | 救出小孩 — 急時用聰明 | ✓ resolves + open | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (legacy → user) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × (4 narration × 15s) + 6 tests (~210s) + vocab (30s) + hook (~15s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch23-l1': { type: 'B6',        inquiry: '一群小孩在花園玩 — 危險將至?' },
'kt-ch23-l2': { type: 'B3',        inquiry: '一個小孩爬大水缸 — 結果如何?' },
'kt-ch23-l3': { type: 'B5',        inquiry: '小孩掉進水缸 — 大家會怎樣?' },
'kt-ch23-l4': { type: 'B4',        inquiry: '其他孩子都跑走找大人 — 來得及嗎?' },
'kt-ch23-l5': { type: 'B1',        inquiry: '司馬光留下沒跑 — 他想做什麼?' },
'kt-ch23-l6': { type: 'B2',        inquiry: '撿石頭砸破水缸 — 水流出來' },
'kt-ch23-l7': { type: 'B6 open',   inquiry: '救出小孩 — 急時用聰明' },
```

---

*Skill validation: Sima Guang Breaks the Jar (Ch23) hook 結構 strong — B3/B5/B4/B1/B2 五連跳 puts 兒童在「他會做什麼?來得及嗎?」的張力上, L6 砸缸是 climax. L7 open hook 把「急時用聰明 vs 找大人」的人生 lesson 拋給 user, 8-12 兒童 + 親子家庭客群可以自然延伸對話. 中華歷史民間 公有領域 ✓ 0 modern textbook / 動畫 / 繪本 風險. 智取 trio with Ch15 國王的新衣 (truth-by-child) + Ch19 Sang Kancil (smart-not-strong).*
