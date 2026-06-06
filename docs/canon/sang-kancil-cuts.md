# Sang Kancil — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `sang-kancil.md`.
> Generated 2026-06-07 for Pickup Ch19.
> Theme group with Ch3 龜兔賽跑 / Ch4 駱駝駝峰: animal wisdom fable cluster.

## Inputs

- **Story**: sang-kancil.md (Maritime SEA oral folk, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: oral folk plot beats ONLY (no specific picture book / textbook / animation derivative)

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (mouse deer sees fruit)        val =  0.0 → +0.2  (desire awakens, |Δv|=0.2)    ⚡ peak
Beat 2 (crocodiles in the river)      val = +0.2 → -0.4  (obstacle revealed, |Δv|=0.6) ⚡⚡ peak
Beat 3 (plan brewing)                 val = -0.4 → +0.2  (hope returns, |Δv|=0.6)      ⚡⚡ peak
Beat 4 (lie about the king)           val = +0.2 → +0.5  (lie lands, |Δv|=0.3)         ⚡ peak
Beat 5 (jumping across crocs)         val = +0.5 → +0.8  (escape in motion, |Δv|=0.3)  ⚡⚡ peak
Beat 6 (crocodiles realise trick)     val = +0.8 → +1.0  (victory + flip)              ⚡⚡⚡ peak
Beat 7 (two lessons)                  val = +1.0 → +1.0  (open reflection)             🌟 climax
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Sang Kancil was a small mouse deer in the green forest. He was not big. He was not strong. But he was very smart. One morning, he stood by the side of a wide river. **Across the water he saw a tall tree full of sweet ripe fruit.** | **B6 預言種子** | 鼠鹿想吃對岸的水果 → 怎麼過河? | ✓ desire→obstacle | ✓ open | ✓ inquiry |
| L2 | Sang Kancil wanted to eat that fruit so much. But the river was wide. He could not swim that far. Many crocodiles lived in the dark water of the river. **Their long mouths waited under the river all day.** | **B3 資訊缺口** | 河裡有很多鱷魚 → 該怎麼辦? | ✓ obstacle→fear | ✓ open | ✓ inquiry |
| L3 | Sang Kancil sat down. He thought hard for a long time. Then a big smile came on his face. He had a plan. He walked to the side of the river. He called out loud. **"Hello, crocodiles! I have a message from the king!"** | **B5 道德兩難** | 鼠鹿想到聰明的辦法 → 他會說什麼謊? | ✓ plan→lie | ✓ open | ✓ inquiry |
| L4 | The crocodiles came up from the water one by one. "What does the king want?" the big one asked. "The king wants to know how many crocodiles live here." **"Line up across the river so I can count you all," he said.** | **B4 期待加速** | 對鱷魚說「國王要點鱷魚數量」 → 鱷魚相信嗎? | ✓ lie→test | ✓ open | ✓ inquiry |
| L5 | The crocodiles lined up from this side to the other side. Sang Kancil jumped on the first crocodile back. "One!" He jumped to the next. "Two!" Then "Three!" "Four!" **One by one, he hopped on every long crocodile back.** | **B1 物理懸念** | 鱷魚排隊讓他點 → 他跳過鱷魚背 | ✓ count→jump | ✓ open | ✓ inquiry |
| L6 | Sang Kancil jumped off the last crocodile onto the other side. "Thank you, crocodiles! There is no message from the king!" The crocodiles opened their mouths in anger. They had no king. **But Sang Kancil was already eating sweet fruit under the tree.** | **B2 情緒翻轉** | 到對岸吃水果 → 鱷魚發現被騙 | ✓ trick→reveal | ✓ open | ✓ inquiry |
| L7 | Sang Kancil ate the fruit. He patted his small full belly. "A small body is fine. A smart head is better." The crocodiles slowly went back into the dark water. **"We must not believe every voice from the side of the river."** | **B6 open** | 鼠鹿學到什麼? 鱷魚學到什麼? | ✓ two-takeaway | resolves + open (will mouse deer trick them again?) | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | open hook (two-sided takeaway invites kid reflection) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Theme group with Ch3 龜兔賽跑 + Ch4 駱駝駝峰

| Story | Animal wisdom takeaway |
|---|---|
| Ch3 龜兔賽跑 | Slow + steady beats fast + lazy |
| Ch4 駱駝為什麼有駝峰 | Lazy attitude gets a permanent hump |
| **Ch19 Sang Kancil** | **Small body is fine — smart head is better** |

3 stories together cover the core "動物智慧寓言" cluster for 8-12 客群 ELT.

## Time budget per lesson

11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Next step

Write `tools/_write-ch19-sang-kancil.cjs` with 7 lessons × 11 Q each. Follow Ch3 龜兔賽跑 template (dialogue-leaning voice with "X said" inside narration — trickster needs to talk for the trick to land).

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch19-l1': { type: 'B6',       inquiry: '鼠鹿想吃對岸的水果 → 怎麼過河?' },
'kt-ch19-l2': { type: 'B3',       inquiry: '河裡有很多鱷魚 → 該怎麼辦?' },
'kt-ch19-l3': { type: 'B5',       inquiry: '鼠鹿想到聰明的辦法 → 他會說什麼謊?' },
'kt-ch19-l4': { type: 'B4',       inquiry: '對鱷魚說「國王要點鱷魚數量」 → 鱷魚相信嗎?' },
'kt-ch19-l5': { type: 'B1',       inquiry: '鱷魚排隊讓他點 → 他跳過鱷魚背' },
'kt-ch19-l6': { type: 'B2',       inquiry: '到對岸吃水果 → 鱷魚發現被騙' },
'kt-ch19-l7': { type: 'B6 open',  inquiry: '鼠鹿學到什麼? 鱷魚學到什麼?' },
```

---

*Skill validation: Sang Kancil (Ch19) 與 Ch3 龜兔賽跑 + Ch4 駱駝駝峰 並列「動物智慧寓言」教學群. Maritime Southeast Asia oral folk tradition, public domain worldwide. NO specific picture book / textbook / animation derivative. A2 兒童化: 'deceive' → 'trick'; 'cunning' → 'smart'; 鱷魚 'opened mouths in anger' 不 'attacked'.*
