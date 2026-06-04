# Six Swans — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `six-swans.md`.
> Generated 2026-06-04 for Pickup Ch6.

## Inputs

- **Story**: six-swans.md (7-beat arc, dialogue-free poetic voice)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (seven children)     val = +0.2 → -0.2  (calm → mother gone)            ⚡ peak
Beat 2 (new queen's spell)  val = -0.2 → -0.6  (foreboding, |Δv|=0.4)          ⚡ peak
Beat 3 (boys become swans)  val = -0.6 → -0.9  (transformation shock)          ⚡⚡ peak
Beat 4 (vow of silence)     val = -0.9 → -0.5  (path forward, but bitter cost) ⚡ peak
Beat 5 (king finds her)     val = -0.5 → +0.2  (rescue, |Δv|=0.7)              ⚡⚡ peak
Beat 6 (false charge)       val = +0.2 → -1.0  (bliss → death sentence)        ⚡⚡⚡ peak
Beat 7 (sky turns white)    val = -1.0 → +1.0  (fire → truth, |Δv|=2.0)        🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | The boys played by the river. The girl gathered flowers. **The mother of the children was gone. The king missed her with all his heart.** | **B6 預言種子** | 沒了母親,誰會來填這個位置? | ✓ peace→loss | ✓ open | ✓ inquiry |
| L2 | The king married a new woman from a far land. She did not love the seven children. **One night, she made six small white shirts.** | **B3 資訊缺口** | 為什麼是六件?六件白衣是給誰? | ✓ marriage→threat | ✓ open | ✓ inquiry |
| L3 | She slipped into the boys' room and threw them on. **Where the boys had stood, six swans now rose. White wings beat.** | **B1 物理懸念** | 男孩去哪了?還能變回來嗎? | ✓ children→swans | ✓ open | ✓ inquiry |
| L4 | They were swans by day, boys for one short hour at night. To free them, she had to sew six shirts from a thorn flower. **She could not speak or laugh for six long years.** | **B5 道德兩難** | 六年不能說話,她能撐下去嗎? | ✓ task→vow | ✓ open | ✓ inquiry |
| L5 | A young king rode through the wood. He brought her home and made her his bride. **She still did not speak. She sewed and sewed.** | **B6 預言種子** | 王子的母親會接受她嗎?六年沒到呢? | ✓ rescue→watched | ✓ open | ✓ inquiry |
| L6 | "She ate her own child," the mother told everyone. The bride could not speak to say it was a lie. **It happened three times. The fire was built for her.** | **B5 道德兩難** | 她要說話救自己嗎?還是繼續織? | ✓ home→pyre | ✓ open | ✓ inquiry |
| L7 | On the day of the fire, the six years ended at noon. Six swans came down. She threw the shirts on them. **Only the youngest still had one wing. She spoke at last.** | **B2 大翻轉** | (truth out + 開放後鉤:小弟那隻翅膀) | ✓ silenced→voice | ✓ ends | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | resolved + open hook (the wing) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

Assumed 11 Q × 4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s.

## Next step

Write `tools/_write-ch6-six-swans.cjs` with 7 lessons × 11 Q each. **No dialogue allowed** in narration lines (Grimm dialogue-free voice). Only L6 has a single quoted line because it's the lie itself — keep all other narration in 3rd-person past.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch6-l1': { type: 'B6', inquiry: '沒了母親,誰會來填這個位置?' },
'kt-ch6-l2': { type: 'B3', inquiry: '為什麼是六件?六件白衣是給誰?' },
'kt-ch6-l3': { type: 'B1', inquiry: '男孩去哪了?還能變回來嗎?' },
'kt-ch6-l4': { type: 'B5', inquiry: '六年不能說話,她能撐下去嗎?' },
'kt-ch6-l5': { type: 'B6', inquiry: '王子的母親會接受她嗎?六年沒到呢?' },
'kt-ch6-l6': { type: 'B5', inquiry: '她要說話救自己嗎?還是繼續織?' },
'kt-ch6-l7': { type: 'B2 big', inquiry: '(說出口的那刻 — 你忍著沒說的是什麼?)' },
```

---

*Skill validation: dialogue-free Grimm voice tilts hook mix to B5+B6 (moral dilemma + foreshadow) — when there's no spoken word, the suspense lives in either "what will she choose to do" or "what does this image foretell." L4 + L6 are mirror moral-dilemma beats (take the vow / break the vow). The lingering swan-wing at L7 is the only B6 ending hook in the canon — open enough to seed Ch7+ imagination.*
