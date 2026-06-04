# Baba Yaga — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `baba-yaga.md`.
> Generated 2026-06-04 for Pickup Ch5.

## Inputs

- **Story**: baba-yaga.md (7-beat arc, sparse dark folk voice)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (orphan setup)        val = -0.3 → -0.5  (sad, loaded)               ⚡ peak
Beat 2 (errand at night)     val = -0.5 → -0.8  (dread, |Δv|=0.3)           ⚡⚡ peak
Beat 3 (three riders)        val = -0.8 → -0.7  (eerie passing)             ⚡ peak
Beat 4 (chicken-leg house)   val = -0.7 → -1.0  (terror peak)               ⚡⚡ peak
Beat 5 (witch returns)       val = -1.0 → -0.9  (face-to-face)              ⚡ peak
Beat 6 (impossible task)     val = -0.9 → -0.7  (work or die, doll appears) ⚡ peak
Beat 7 (light home + ash)    val = -0.7 → +0.3  (release + dark justice)    🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | The new woman gave her hard work every day. Vasilisa did not cry. **One night the fire in the house went out.** | **B6 預言種子** | 沒火會怎樣?誰要去拿火? | ✓ quiet→omen | ✓ open | ✓ inquiry |
| L2 | "Go into the deep woods. Get fire from Baba Yaga." Vasilisa knew the name. **Everyone knew the name.** | **B3 資訊缺口** | Baba Yaga 是誰?為什麼大家都知道? | ✓ task→threat | ✓ open | ✓ inquiry |
| L3 | A white rider passed her. Day came. A red rider passed her. The sun stood high. **A black rider on a black horse passed her. Night fell.** | **B6 預言種子** | 三個騎士是誰?夜裡會出什麼事? | ✓ light→dark | ✓ open | ✓ inquiry |
| L4 | She saw a fence of bones. Skulls sat on the posts. Their eyes glowed. **The house stood on two huge chicken legs. The legs turned. The door faced her.** | **B1 物理懸念** | 屋子會動?她要走進去嗎? | ✓ static→alive | ✓ open | ✓ inquiry |
| L5 | Baba Yaga came home in a stone bowl. Her nose was iron. Her teeth were long. **"I smell a Russian girl," she said.** | **B2 情緒翻轉** | 巫婆會吃她?還會放她走? | ✓ alone→cornered | ✓ open | ✓ inquiry |
| L6 | "Do my work. Or I will eat you." Baba Yaga went to sleep. The skulls glowed in the dark. **Vasilisa took out her little doll. "Help me," she whispered.** | **B3 資訊缺口** | 娃娃能做什麼?它會動嗎? | ✓ hopeless→tool | ✓ open | ✓ inquiry |
| L7 | Baba Yaga gave her a skull with glowing eyes on a stick. She carried it home. **The new woman saw the light. She turned to ash.** | **B2 大翻轉** | (dark justice + 開放後鉤) | ✓ survive→avenged | ✓ ends | ✓ resolved |

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

Write `tools/_write-ch5-baba-yaga.cjs` with 7 lessons × 11 Q each. Keep sentences short — Russian folk-tale voice is sparse, no adjectives stacking, no internal monologue.

## Future hook map entries (sync to src/data/lessonHooks.ts)

```ts
'kt-ch5-l1': { type: 'B6', inquiry: '沒火會怎樣?誰要去拿火?' },
'kt-ch5-l2': { type: 'B3', inquiry: 'Baba Yaga 是誰?為什麼大家都知道?' },
'kt-ch5-l3': { type: 'B6', inquiry: '三個騎士是誰?夜裡會出什麼事?' },
'kt-ch5-l4': { type: 'B1', inquiry: '屋子會動?她要走進去嗎?' },
'kt-ch5-l5': { type: 'B2', inquiry: '巫婆會吃她?還會放她走?' },
'kt-ch5-l6': { type: 'B3', inquiry: '娃娃能做什麼?它會動嗎?' },
'kt-ch5-l7': { type: 'B2 big', inquiry: '(口袋裡的小東西 — user 自己的是什麼?)' },
```

---

*Skill validation: dark folk voice yields heavy B1+B6 mix (literal threat + foreshadow) — sparse text leaves more "what's behind the door" gaps than psychological inner-state gaps. L4 chicken-leg moment is the rare B1 physical-cliff in this skill's portfolio. The doll reveal at L6 is deliberately B3 (information gap) — reader has been told only "small doll mother left her" since L2, payoff withheld 5 lessons.*
