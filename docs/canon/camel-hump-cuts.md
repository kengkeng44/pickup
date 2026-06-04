# Camel's Hump — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `camel-hump.md`.
> Generated 2026-06-04 for Pickup Ch4.

## Inputs

- **Story**: camel-hump.md (7-beat arc, Kipling 2nd-person voice)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (lazy camel)         val =  0.0 → -0.2  (calm → puzzled)              ⚡ mild
Beat 2 (three helpers)      val = -0.2 → -0.5  (asks ignored, |Δv|=0.3)      ⚡ peak
Beat 3 (Man's rule)         val = -0.5 → -0.7  (anger rises)                 ⚡ peak
Beat 4 (Djinn arrives)      val = -0.7 → +0.3  (hope of help, |Δv|=1.0)      ⚡⚡ peak
Beat 5 (Djinn warns)        val = +0.3 → -0.2  (warning ignored, suspense)   ⚡ peak
Beat 6 (hump appears)       val = -0.2 → -0.6  (magic shock, |Δv|=0.4)       ⚡⚡ peak
Beat 7 (lesson, joins work) val = -0.6 → +0.4  (humbled → integrated)        🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | O Best Beloved, the world was new and shining. The Camel lived in the middle of the desert. He did no work. **He only said one thing: "Humph!"** | **B3 資訊缺口** | "Humph" 是什麼意思?他在躲什麼? | ✓ neutral→odd | ✓ open | ✓ inquiry |
| L2 | The Horse came. "Humph!" The Dog came. "Humph!" The Ox came. "Humph!" **The three looked at each other. Then they went to find Man.** | **B6 預言種子** | 他們要告狀嗎?Man 會怎麼處理? | ✓ ignored→action | ✓ open | ✓ inquiry |
| L3 | Man said, "Then you three must work double." The three were very tired and very angry. **A cloud of dust came rolling toward them across the sand.** | **B4 期待加速** | 沙塵裡是什麼?是誰來了? | ✓ punished→arrival | ✓ open | ✓ inquiry |
| L4 | The Djinn of All Deserts heard their story. He looked at the three tired animals. **"Where is this Camel?" he asked.** | **B5 道德兩難** | Djinn 會幫誰?會罰駱駝嗎? | ✓ told→deciding | ✓ open | ✓ inquiry |
| L5 | The Djinn sat down by the Camel. "What is this I hear about no work?" "Humph!" said the Camel. **The Djinn put his chin on his hand. He began to make a Magic.** | **B6 預言種子** | 是什麼魔法?駱駝會變什麼? | ✓ warned→spell | ✓ open | ✓ inquiry |
| L6 | The Camel said "Humph!" one more time. **As he said it, his flat back began to puff up.** | **B1 物理懸念** | 背要變成什麼?還會停嗎? | ✓ defiant→changing | ✓ open | ✓ inquiry |
| L7 | "That is your very own Humph that you have brought on your very own self." Now he works for three days without eating. **He still has his Humph, O Best Beloved, so he will never forget.** | **B2 大翻轉** | (reveal + 開放後鉤) | ✓ shame→meaning | ✓ ends | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

Assumed 11 Q × 4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s.

## Next step

Write `tools/_write-ch4-camel-hump.cjs` with 7 lessons × 11 Q each. Preserve "O Best Beloved" narrator address in at least 1 narration line per lesson.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch4-l1': { type: 'B3', inquiry: '"Humph" 是什麼意思?他在躲什麼?' },
'kt-ch4-l2': { type: 'B6', inquiry: '他們要告狀嗎?Man 會怎麼處理?' },
'kt-ch4-l3': { type: 'B4', inquiry: '沙塵裡是什麼?是誰來了?' },
'kt-ch4-l4': { type: 'B5', inquiry: 'Djinn 會幫誰?會罰駱駝嗎?' },
'kt-ch4-l5': { type: 'B6', inquiry: '是什麼魔法?駱駝會變什麼?' },
'kt-ch4-l6': { type: 'B1', inquiry: '背要變成什麼?還會停嗎?' },
'kt-ch4-l7': { type: 'B2 big', inquiry: '(自己背的包袱 — user 在背什麼?)' },
```

---

*Skill validation: Kipling 2nd-person voice survives the cut framework. Hook mix tilts B6+B4 (foreshadow + anticipation) because the narrator constantly hints to "you" about what comes next — that's literally Kipling's signature. L6 is the rare B1 (literal cliffhanger) inside an otherwise verbal story — the back puffing up is the only physical-irreversible moment.*
