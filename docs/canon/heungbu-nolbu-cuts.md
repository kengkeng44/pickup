# Heungbu & Nolbu — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `heungbu-nolbu.md`.
> Generated 2026-06-07 as Ch18 URL pipeline ship.
> Theme line: 「善有善報, 惡有惡報 — 兄弟之間的選擇」(A2 ELT 韓國民間 + 道德 hook).

## Inputs

- **Story**: heungbu-nolbu.md (7-beat arc)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (kicked out)              val = +0.0 → -0.5  (peace → cold injustice)               ⚡ peak
Beat 2 (poor home)               val = -0.5 → -0.6  (poverty → quiet endurance)             ⚡ minor
Beat 3 (bird falls)              val = -0.6 → -0.3  (worry → small hope of saving)          ⚡ peak
Beat 4 (bird returns, seed)      val = -0.3 → +0.2  (waiting → surprise gift)               ⚡ peak
Beat 5 (gourd treasures)         val = +0.2 → +0.8  (anticipation → joy of rescue)          ⚡ peak
Beat 6 (Nolbu copies, hurts)     val = +0.8 → -0.4  (warning → moral fall)                  ⚡⚡ peak
Beat 7 (Nolbu ruined, Heungbu shares) val = -0.4 → +0.6  (despair → forgiveness)            🌟 climax
```

## Step 4-6: Hook classification + cut selection

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Nolbu kicks Heungbu out of the family home. **Heungbu walks away with only one small bag...** | **B6 預言種子** | 興夫一個人怎麼活下去? | ✓ peace→injustice | ✓ open | ✓ inquiry |
| L2 | The children were always hungry. **Heungbu looks at the empty rice pot. What can he do?** | **B3 資訊缺口** | 他怎麼養家? | ✓ struggle→? | ✓ open | ✓ inquiry |
| L3 | The bird cried. A snake came near. **Heungbu jumps up. Can he save the little bird?** | **B5 道德兩難** | 興夫會救嗎? | ✓ danger→? | ✓ open | ✓ inquiry |
| L4 | The swallow came back. It dropped one small seed on his hand. **A gourd seed. What will grow from it?** | **B4 期待加速** | 給興夫什麼禮物? | ✓ hope→? | ✓ open | ✓ inquiry |
| L5 | Out came warm clothes. Out came toys for the children. **Heungbu is rich now — but is the story over?** | **B6 預言種子** | 哥哥孬夫聽到會怎樣? | ✓ joy→? | ✓ open | ✓ inquiry |
| L6 | Nolbu broke its leg on purpose. Then he pretended to help. **The swallow looks at him with silent eyes...** | **B2 情緒翻轉** | 報應會來嗎? | ✓ greed→? | ✓ open | ✓ inquiry |
| L7 | Heungbu shared his food, his house, his gold. "We are family," he said. **What did Nolbu learn at last?** | **B6 open 開放後鉤** | 你會學興夫還是孬夫? | ✓ ruin→peace | ✓ open hook | ✓ resolved + open |

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
| L7 | ✓ | resolves (sharing) + opens (moral question to user) | resolved + open hook | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Time budget per lesson (preliminary)

Assumed 11 Q × ~4 narration + 6 tests + vocab ≈ 230-260s = 3.8-4.3 min ✓ all under 300s budget.

## Story-specific design notes

- **No death**: Per user rule, parents 'were gone', NOT 'died'. Nolbu's punishment = 'all his treasures turned to dust', NOT 'killed' / 'burned'.
- **Snake encounter (Beat 3)**: snake 'came near' but Heungbu chases away — danger is suggested, not graphic. Bird's hurt leg shown safely.
- **Nolbu cruelty (Beat 6)**: 'broke its leg on purpose' — sufficient + age-safe. No graphic detail.
- **Forgiveness ending**: Heungbu shares EVERYTHING with Nolbu. This is the canonical moral close ('we are family'). Stronger ending than purely punitive folk versions.
- **Korean names retained**: Heungbu + Nolbu (公有領域人名, A2 拼寫). First intro L1, reused throughout.
- **Cultural pair with Ch1 桃太郎 + Ch14 浦島太郎**: forms East Asian folk trio. Ch1 = bravery; Ch14 = bittersweet wisdom; Ch18 = moral choice + family.

## Next step

Apply `pickup-item-writer` skill → write `tools/_write-ch18-heungbu-nolbu.cjs` with 7 lessons × 11 Q each, ending each on the hook narration above.

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch18-l1': { type: 'B6',      inquiry: '興夫一個人怎麼活下去?' },
'kt-ch18-l2': { type: 'B3',      inquiry: '他怎麼養家?' },
'kt-ch18-l3': { type: 'B5',      inquiry: '興夫會救嗎?' },
'kt-ch18-l4': { type: 'B4',      inquiry: '給興夫什麼禮物?' },
'kt-ch18-l5': { type: 'B6',      inquiry: '哥哥孬夫聽到會怎樣?' },
'kt-ch18-l6': { type: 'B2',      inquiry: '報應會來嗎?' },
'kt-ch18-l7': { type: 'B6 open', inquiry: '你會學興夫還是孬夫?' },
```

---

*Skill validation: narrative-cut-analyst pipeline 5th full apply (1st = 桃太郎 B.220, 2nd = ugly-duckling B.222, 3rd = three-pigs Ch8 B.234, 4th = urashima Ch14 B.260, 5th = heungbu-nolbu Ch18 2026-06-07). Pattern: B6 opening (foreshadow injustice) → B3/B5/B4 mid (poverty + rescue + gift) → B6/B2 reveal (greed punishment) → B6 open close (moral question to user). Consistent with universal 3-question rule.*
