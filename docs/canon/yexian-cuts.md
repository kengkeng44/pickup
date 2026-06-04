# Yexian — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `yexian.md`.
> Generated 2026-06-04 for Pickup Ch7.

## Inputs

- **Story**: yexian.md (7-beat arc, bilingual zh-en code-switch voice)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (orphan in cave)      val = -0.4 → -0.5  (sad baseline)              ⚡ peak
Beat 2 (the fish friend)     val = -0.5 → +0.4  (light enters, |Δv|=0.9)    ⚡⚡ peak
Beat 3 (fish killed)         val = +0.4 → -0.9  (grief, |Δv|=1.3)           ⚡⚡⚡ peak
Beat 4 (bones + old man)     val = -0.9 → -0.3  (hint of magic, |Δv|=0.6)   ⚡ peak
Beat 5 (festival night)      val = -0.3 → +0.7  (transformation)            ⚡⚡ peak
Beat 6 (shoe lost)           val = +0.7 → -0.3  (close call, |Δv|=1.0)      ⚡⚡ peak
Beat 7 (king finds her)      val = -0.3 → +1.0  (rescue + justice)          🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Her mother died. Her father died too. The new wife, 後母, took her in. **She gave Yexian all the hard work.** | **B6 預言種子** | 後母會一直這樣對她嗎? | ✓ orphan→trapped | ✓ open | ✓ inquiry |
| L2 | Yexian's only friend was a fish in the pond. **It had red fins (紅鰭) and golden eyes. It grew big and tame.** | **B3 資訊缺口** | 這條魚不只是魚?它是誰? | ✓ alone→bond | ✓ open | ✓ inquiry |
| L3 | The step-mother put on Yexian's torn dress. She walked to the pond. **The fish came up — and she stabbed it with a knife.** | **B1 物理懸念** | 葉限會知道嗎?她怎麼承受? | ✓ tame→killed | ✓ open | ✓ inquiry |
| L4 | An old man (老人) in a sky-colored robe came down to her. **"The bones are under the dung heap. Hide them. Speak to them. They will give you anything."** | **B3 資訊缺口** | 骨頭能給她什麼?她要問什麼? | ✓ loss→power | ✓ open | ✓ inquiry |
| L5 | Yexian whispered to the bones: "I want to go." A blue cloak (青衣) and small gold shoes (金履) appeared. **She slipped out. The whole village stared as she passed.** | **B2 情緒翻轉** | 她會被認出嗎?誰已經盯著她? | ✓ hidden→seen | ✓ open | ✓ inquiry |
| L6 | The step-mother's daughter pointed. "She looks like Yexian." Yexian ran. **As she ran, one gold shoe fell off.** | **B1 物理懸念** | 鞋掉了會落到誰手上? | ✓ glory→exposed | ✓ open | ✓ inquiry |
| L7 | The king tried the shoe on every woman. None fit. He came to the cave village. **鞋 (the shoe) slipped onto her foot like water.** | **B2 大翻轉** | (reveal + 開放後鉤:後母結局) | ✓ search→found | ✓ ends | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | resolved + open hook (step-mother fate) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson

Assumed 11 Q × 4 narration + 6 tests + vocab + hook ≈ 235-265s = 3.9-4.4 min ✓ all under 300s.

## Next step

Write `tools/_write-ch7-yexian.cjs` with 7 lessons × 11 Q each. **Code-switch rule**: each lesson narration includes 1-2 inline Hanzi (after EN noun). Hanzi never appears in option text or cloze blank — only in narration as cultural anchor.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch7-l1': { type: 'B6', inquiry: '後母會一直這樣對她嗎?' },
'kt-ch7-l2': { type: 'B3', inquiry: '這條魚不只是魚?它是誰?' },
'kt-ch7-l3': { type: 'B1', inquiry: '葉限會知道嗎?她怎麼承受?' },
'kt-ch7-l4': { type: 'B3', inquiry: '骨頭能給她什麼?她要問什麼?' },
'kt-ch7-l5': { type: 'B2', inquiry: '她會被認出嗎?誰已經盯著她?' },
'kt-ch7-l6': { type: 'B1', inquiry: '鞋掉了會落到誰手上?' },
'kt-ch7-l7': { type: 'B2 big', inquiry: '(失去的支持回來了 — 你的呢?)' },
```

---

*Skill validation: bilingual code-switch story carries heavy B3 mix (information gap) — the fish's true identity (mother's spirit) and the bones' power both sit on hidden-info reveals. L3 (fish killed) is the strongest emotional peak in the entire 5-story canon (|Δv|=1.3, equal to Ch6 Beat 6). The Hanzi-inline rule is preserved without becoming a lexical test load — cultural anchor only.*
