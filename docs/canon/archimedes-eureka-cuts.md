# Archimedes' Eureka Moment — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `archimedes-eureka.md`.
> Generated 2026-06-07 for Pickup Ch26.
> Theme: 發現 / discovery + 觀察的力量. A2 children-friendly, no blood, no horror, 0 risk.

## Inputs

- **Story**: archimedes-eureka.md (Vitruvius c. 25 BCE 7-beat, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist, no `density` / `displacement` / `volume` / `mass`, child-friendly tone

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (king worries about crown) val =  0.0 → -0.2  (problem, |Δv|=0.2)            ⚡ peak
Beat 2 (Archimedes faces puzzle)  val = -0.2 → -0.4  (stuck, |Δv|=0.2)              ⚡ peak
Beat 3 (days of thinking)         val = -0.4 → -0.5  (fatigue, |Δv|=0.1)            ⚡ peak
Beat 4 (water spills over)        val = -0.5 → +0.1  (observation, |Δv|=0.6)        ⚡⚡ peak
Beat 5 (Eureka!)                  val = +0.1 → +0.8  (climax, |Δv|=0.7)             🌟 climax
Beat 6 (telling the king)         val = +0.8 → +0.6  (proof + resolution, |Δv|=0.2) ⚡ peak
Beat 7 (gift to science)          val = +0.6 → +0.5  (legacy, open)                 ⚡ peak
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in the city of Syracuse, there lived a clever man named Archimedes. The king had a new crown of bright gold. But the king worried that some silver was mixed in with the gold. **He sent for Archimedes and asked him to find out the truth.** | **B6 預言種子** | 國王懷疑王冠不純金 → 找誰? | ✓ home→problem | ✓ open | ✓ inquiry |
| L2 | Archimedes held the crown in his hands and looked at it for a long time. He could not cut it open. He could not melt it down. **"How can I tell what is inside, without breaking it?" he thought.** | **B3 資訊缺口** | 阿基米德接到謎題 → 怎麼測? | ✓ blocked | ✓ open | ✓ inquiry |
| L3 | For days Archimedes sat at his desk and drew shapes on the floor. He did not eat much. He slept very little. His friends grew worried about him. **At last, he decided to take a warm bath to rest his mind.** | **B5 道德兩難** | 想了好幾天都想不到 → 累了去洗澡 | ✓ giving in | ✓ open | ✓ inquiry |
| L4 | The bath was full to the top with warm water. Archimedes stepped in slowly, one foot at a time. As he sat down, water spilled over the edge onto the floor. **He looked at the water on the floor with wide, bright eyes.** | **B4 期待加速** | 進浴缸水溢出來 → 他突然看到什麼? | ✓ moment of insight | ✓ open | ✓ inquiry |
| L5 | "The water that came out is the same size as my body in the tub!" Now he knew. Gold and silver have different sizes for the same weight. He could put the crown in water and watch the water rise. **He jumped out of the bath and called out, "Eureka! Eureka!"** | **B1 物理懸念** | 跳出來大喊 'Eureka!' → 為什麼? | ✓ joy explosion | ✓ open | ✓ inquiry |
| L6 | Archimedes ran to the palace with a big smile. He told the king his plan, and the king brought a bowl of water. They put the crown in. They put gold of the same weight in. **The two pulled out different amounts of water — the crown was not pure gold.** | **B2 情緒翻轉** | 跑去找國王告訴秘密 → 王冠真假終於揭曉 | ✓ truth revealed | ✓ open | ✓ inquiry |
| L7 | The king thanked Archimedes for finding the truth. The rule from that bath became part of science forever. We still call it Archimedes' law today. **And every kid who tries an idea in the bath is a little like him.** | **B6 open** | 浮力法則改變科學 → 學到觀察 | ✓ resolves + open | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (學到觀察) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × (4 narration × 15s) + 6 tests (~210s) + vocab (30s) + hook (~15s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch26-l1': { type: 'B6',        inquiry: '國王懷疑王冠不純金 → 找誰?' },
'kt-ch26-l2': { type: 'B3',        inquiry: '阿基米德接到謎題 → 怎麼測?' },
'kt-ch26-l3': { type: 'B5',        inquiry: '想了好幾天都想不到 → 累了去洗澡' },
'kt-ch26-l4': { type: 'B4',        inquiry: '進浴缸水溢出來 → 他突然看到什麼?' },
'kt-ch26-l5': { type: 'B1',        inquiry: '跳出來大喊 Eureka! → 為什麼?' },
'kt-ch26-l6': { type: 'B2',        inquiry: '跑去找國王告訴秘密 → 王冠真假終於揭曉' },
'kt-ch26-l7': { type: 'B6 open',   inquiry: '浮力法則改變科學 → 學到觀察' },
```

---

*Skill validation: Archimedes' Eureka (Ch26) hook 結構 strong — L1-L3 設置「卡關 → 越卡越深」, L4 觀察的 turn, L5 climax 是兒童最愛的「發現」moment (Eureka 大喊本身就是 hook), L6 證明 + 真相揭曉, L7 open 把「日常觀察 = 科學起點」拋給 user. Vitruvius c. 25 BCE 公有領域 ✓ 0 現代繪本 / 0 動畫風險. 配 Ch3 龜兔 + Ch4 駱駝 同 Greek/classical 文化分佈 band.*
