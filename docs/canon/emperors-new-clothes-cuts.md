# The Emperor's New Clothes — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `emperors-new-clothes.md`.
> Generated 2026-06-07 for Pickup Ch15.
> Theme: 智取 + 誠實 + 同儕壓力. A2 children-friendly, no blood, no horror, 0 risk.

## Inputs

- **Story**: emperors-new-clothes.md (Andersen 1837 7-beat, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraint**: A2 vocab whitelist, no 'naked' / 'stupid' / 'vain', child-friendly tone

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (emperor loves clothes)   val =  0.0 → +0.2  (setup, warning |Δv|=0.2)     ⚡ peak
Beat 2 (tricksters claim magic)  val = +0.2 → -0.1  (planted trick, |Δv|=0.3)     ⚡ peak
Beat 3 (minister lies)           val = -0.1 → -0.4  (first lie cascade)            ⚡⚡ peak
Beat 4 (emperor lies)            val = -0.4 → -0.6  (cascade hits top, |Δv|=0.2)   ⚡⚡ peak
Beat 5 (parade begins)           val = -0.6 → -0.8  (mass denial, |Δv|=0.2)       ⚡⚡⚡ peak
Beat 6 (child speaks truth)      val = -0.8 → +0.5  (breaks spell, |Δv|=1.3)      🌟 climax
Beat 7 (emperor walks on)        val = +0.5 → +0.3  (bittersweet open)             ⚡ peak
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago, there lived an emperor who loved new clothes more than anything. He had a clean coat for every hour of the day. **One day, two strangers came to the city.** | **B6 預言種子** | 騙子能成功嗎? 國王會中招? | ✓ home→risk | ✓ open | ✓ inquiry |
| L2 | The two strangers said they could weave the finest cloth in the world. "This cloth has a secret rule," they said. "Only smart people can see it." **"Anyone who is not smart enough will see only empty air."** | **B3 資訊缺口** | 大臣去看會說什麼? 會說真話? | ✓ trap set | ✓ open | ✓ inquiry |
| L3 | The emperor sent his oldest minister to watch the work. The strangers pointed at empty looms with proud hands. The old minister opened his eyes wide. **He saw nothing at all. But he was afraid to say so.** | **B5 道德兩難** | 他敢說沒看到嗎? 該不該說? | ✓ truth vs face | ✓ open | ✓ inquiry |
| L4 | At last the emperor himself came to see the cloth. He looked at the looms. He saw nothing. His heart went cold. **"Am I not smart enough?" he thought.** | **B4 期待加速** | 國王敢說沒看到嗎? 連他也撐不住? | ✓ ruler exposed | ✓ open | ✓ inquiry |
| L5 | The strangers said the new clothes were ready for a big parade. They mimed putting the coat on the emperor. The emperor stepped out wearing nothing at all. **All the people came to watch. They all clapped and called out.** | **B6 預言種子** | 人民會說真話嗎? 還是跟著拍手? | ✓ mass denial | ✓ open | ✓ inquiry |
| L6 | A small child stood at the front of the street. He looked at the emperor. He did not understand. **"But he has no clothes on!" the child said in a clear voice.** | **B2 情緒翻轉** | 大家會怎樣? 還會繼續假裝嗎? | ✓ spell broken | ✓ open | ✓ inquiry |
| L7 | The emperor heard the child. His face turned red. He knew the truth now. Everyone knew. But he held his head high. **He walked to the end of the parade.** | **B6 open** | 為什麼他不停下來? 自尊比真相更難放下? | ✓ resolves + open hook | ✓ open question | ✓ inquiry |

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
| L7 | resolves intentionally | open hook (自尊 question) | ✓ inquiry | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Future hook map entries

```ts
'kt-ch15-l1': { type: 'B6',        inquiry: '騙子能成功嗎? 國王會中招?' },
'kt-ch15-l2': { type: 'B3',        inquiry: '大臣去看會說什麼? 會說真話?' },
'kt-ch15-l3': { type: 'B5',        inquiry: '他敢說沒看到嗎? 該不該說?' },
'kt-ch15-l4': { type: 'B4',        inquiry: '國王敢說沒看到嗎? 連他也撐不住?' },
'kt-ch15-l5': { type: 'B6',        inquiry: '人民會說真話嗎? 還是跟著拍手?' },
'kt-ch15-l6': { type: 'B2',        inquiry: '大家會怎樣? 還會繼續假裝嗎?' },
'kt-ch15-l7': { type: 'B6 open',   inquiry: '為什麼他不停下來? 自尊比真相更難放下?' },
```

---

*Skill validation: Emperor's New Clothes (Ch15) hook 結構 strong — 連續 B5/B4 道德兩難 + 期待加速 puts 兒童在「誰會先說出口」的張力上, L6 小孩開口是 climax. L7 open hook 把「自尊 vs 真相」拋給 user, 8-12 兒童 + 親子家庭客群可以自然延伸對話. Andersen 1837 公有領域 ✓ 0 Disney 0 modern adaptation 風險.*
