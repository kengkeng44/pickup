# Cowherd & Weaver — Lesson Cut Analysis

> Output of `narrative-cut-analyst` skill applied to `cowherd-weaver.md`.
> Generated 2026-06-07 for Pickup Ch12.
> Child-friendly pivot per CLAUDE.md v2.0.B.231 — no romance / no death framing.
> Cultural anchor: 七夕 (Qixi) festival origin myth — family separation + once-a-year reunion.

## Inputs

- **Story**: cowherd-weaver.md (Chinese folk oral tradition, public domain)
- **Target lesson count**: 7
- **Avg lesson time**: 5 min (300s budget)
- **Tolerance**: 25%
- **Constraints**: 兒童 ELT — no `wife/husband` / `fall in love` / `die/kill` / `fairy`

## Step 1-3: Emotional arc + peak detection

```
Beat 1 (cowherd meets magic lady)   val =  0.0 → +0.4  (wonder, |Δv|=0.4)         ⚡ peak
Beat 2 (sew clothes together)       val = +0.4 → +0.7  (close family forms)        ⚡ peak
Beat 3 (Heavenly Queen comes down)  val = +0.7 → -0.3  (threat enters, |Δv|=1.0)   ⚡⚡⚡ peak
Beat 4 (silver river splits them)   val = -0.3 → -0.8  (separation, |Δv|=0.5)      ⚡⚡ peak
Beat 5 (cow lifts him to sky)       val = -0.8 → +0.3  (helper, |Δv|=1.1)          ⚡⚡⚡ peak
Beat 6 (magpie bridge built)        val = +0.3 → +0.9  (reunion, |Δv|=0.6)         ⚡⚡ peak
Beat 7 (once a year on Qixi)        val = +0.9 → +0.7  (open resolution)            🌟 climax
```

## Step 4-6: Hook classification + cut selection (7 cuts × 3-question rule)

| L# | Cut location (sentence ends here) | Hook | Inquiry-terminating Question | McKee | Stein | Brewer |
|----|-----------------------------------|------|------------------------------|-------|-------|--------|
| L1 | Long ago in China, a kind boy lived alone with one old cow. His name was Niulang. **One bright day, a magic lady came down from the sky to bathe. Her name was Zhinu.** | **B3 資訊缺口** | 仙女為什麼下凡? | ✓ alone→encounter | ✓ open | ✓ inquiry |
| L2 | Niulang and Zhinu sat by the river and talked all day. She showed him how to weave with bright silver thread. He showed her how to feed the old cow grass. **They sewed warm clothes together for the long cold winter.** | **B4 期待加速** | 他們會成為家人嗎? | ✓ meet→bond | ✓ open | ✓ inquiry |
| L3 | The Heavenly Queen watched from the high sky. Her face went hard. "Zhinu must come home and weave." **One day she came down on a long white cloud.** | **B5 道德兩難** | 仙女會被帶走嗎? | ✓ peace→threat | ✓ open | ✓ inquiry |
| L4 | The Queen pulled a silver pin from her hair. She drew a line across the sky from east to west. **A great silver river flowed where she drew. Niulang stood on one side. Zhinu stood far on the other.** | **B1 物理懸念** | 還能再見嗎? | ✓ together→apart | ✓ open | ✓ inquiry |
| L5 | Niulang sat by the river and cried for many days. **The old cow walked up slowly. "Take my soft skin," she said. "Wear it like a cloak. It will lift you up to the sky."** | **B3 資訊缺口** | 牛說了什麼? | ✓ stuck→helper | ✓ open | ✓ inquiry |
| L6 | All the magpies in the world flew up to the silver river. **They held wing to wing. They made a long black bridge across.** | **B6 預言種子** | 鵲橋是什麼? | ✓ split→bridge | ✓ open | ✓ inquiry |
| L7 | The Queen saw them meet. Her heart became a little soft. "Once each year," she said, "on the seventh night of the seventh moon." "The magpies will come. You may meet on the bridge for one night." **And so every Qixi, Chinese families look at the sky and remember.** | **B6 open** | 為什麼這天看星星? | ✓ reunion→ritual | resolves + open hook (cultural ritual continues) | ✓ resolved |

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
| L7 | ✓ | resolves (intended) | open hook (七夕 ritual lives on) | 3/3 |

**All 7 cuts PASS** 3-question rule.

## Child-friendly pivot — language audit

| Adult original concept | Child-safe pivot |
|---|---|
| 'fall in love' | 'sat by river and talked' / 'sewed warm clothes together' |
| 'wife' / 'husband' | 'family' / 'close friends' |
| 'marriage' / 'wed' | 'become family' |
| 'die' / 'kill' | NOT present in this story |
| 'fairy' | 'magic lady' (avoid Western mix-up) |
| 'lovers separated' | 'family separated' |
| 'one-night-only romance' | 'one-night-only family reunion' |
| 'banished' | 'taken back to her sky-work' |

## Time budget per lesson

Assumed 11 Q × 4 narration (60s) + 6 tests (~180s) + vocab (30s) + hook (~20s) ≈ 230-260s = 3.8-4.3 min ✓ all under 300s.

## Cross-chapter pairing (cultural mirror)

| Ch | Story | Reunion mechanism | Cost |
|---|---|---|---|
| Ch7 | 葉限 (Tang Cinderella) | 媽媽以魚靈 / 骨頭形式回來 | 後母被天罰 |
| Ch9 | Cinderella (Perrault) | 善良內化 → 仙女教母「消失」(任務完成) | 原諒姊姊 |
| Ch12 | 牛郎織女 | 喜鵲鵲橋 → 一年一見 | 銀河永遠分隔 |

Ch12 是「失去 → 一年回來一次」變奏,跟 Ch7/Ch9 形成三角教學對 — 同 theme「珍貴的東西不會永遠不見」,不同 cost / mechanism。

## Next step

Write `tools/_write-ch12-cowherd-weaver.cjs` with 7 lessons × 11 Q each. Mirror Ch7/Ch9 hook pattern where culturally parallel (L3-L4 separation, L6-L7 magical reunion), divergent where story-specific (L5 牛 helper unique to this myth).

## Future hook map entries (sync to src/data/lessonHooks.ts + tools/_content-db.cjs)

```ts
'kt-ch12-l1': { type: 'B3',        inquiry: '仙女為什麼下凡?' },
'kt-ch12-l2': { type: 'B4',        inquiry: '他們會成為家人嗎?' },
'kt-ch12-l3': { type: 'B5',        inquiry: '仙女會被帶走嗎?' },
'kt-ch12-l4': { type: 'B1',        inquiry: '還能再見嗎?' },
'kt-ch12-l5': { type: 'B3',        inquiry: '牛說了什麼?' },
'kt-ch12-l6': { type: 'B6',        inquiry: '鵲橋是什麼?' },
'kt-ch12-l7': { type: 'B6 open',   inquiry: '為什麼這天看星星?' },
```

---

*Skill validation: 牛郎織女 (Ch12) 用「家人分離 + 一年一見」框架取代成人版「相愛分離」, 完全符合 8-12 兒童 ELT pivot。中華民間口傳, 公有領域。對 Pickup 主客群 (台灣兒童 + 海外華人 heritage) 是「七夕由來」文化教育的最佳載體。*
