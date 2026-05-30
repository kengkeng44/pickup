# Pickup Ch2-Ch4 Spec QA Report

> Audit pass: 2026-05-31
> Auditor: Claude (Opus 4.7)
> Scope: First 6 lessons FULL Q data + bonus 番外 (when sampled) per spec
> Checklist source: `docs/content-loop/design-conventions.md` §QA agent checklist

Legend:
- C = correct / S = same-category / P = partial-truth / O = obvious-miss
- Pos-template mismatch = lesson type-set does not match design-conventions.md §"Question type pacing"

---

## Ch2 — 桃太郎 (Momotaro)

### Issues found

| Q | Issue |
|---|---|
| Ch2-L1 to L6 | **Type-template mismatch (systemic).** Conventions §Question type pacing says L2 = `listen-mc + read-mc-with-audio`, L3 = `listen-comprehension + tap-tiles`, L4-L6 main = `listen-mc + listen-comprehension`. Spec uses `tap-tiles` in L2/L3 and adds extra `tap-tiles` in L5/L6. Recommend either (a) fix conventions doc to allow tap-tiles in early lessons, or (b) swap L5-q4 and L6-q3/q4 tap-tiles back to listen-mc / read-mc-with-audio. **Designer call.** |
| Ch2-L2-q4 | Distractor labels drift in comment vs actual options. Options are `[happy / cold / hears a car / wants food]`; comment tags `[C happy / P wants food / S hears a car / O is cold]`. "hears a car" is obvious-miss not same-category; "is cold" is the same-category trap (also a feeling). Fix labels OR re-write distractor "is cold" -> another emotion like "is sleepy" to match S tag. |
| Ch2-L3-q1 | Distractor `Tomato` is fine as partial-truth (sound-alike), but `Tomorrow` tagged O is also a sound-alike — that makes two phonetic confusers and zero true obvious-miss. Replace `Tomorrow` with off-topic noun like `forest` or `dragon`. |
| Ch2-L4-q4 | Comment vs options mismatch. Options `[a child / more grass / a new house / a horse]`; comment says `[C a child / S a new house / P more grass / O a horse]`. Acceptable but "more grass" as P needs the audio to actually mention grass — sentence is "They had no child. They worked hard every day." No grass mentioned, so P fails. Replace `more grass` with `more rice` (a wish) or accept that all three are O. |
| Ch2-L5-q2 | Distractors include `round` (P, tagged correctly — adjective said in audio) and `small` (O, but it's the antonym of `big` from prior sentence — feels like S). Acceptable but borderline; ideal would be `red` as S (another color) and `tall` as O. |
| Ch2-L5-q6 | Distractor `throw away` is reasonable but `plant a tree` is partial-truth-ish (peaches grow on trees). Acceptable. |
| Ch2-L6-q2 | Distractor `wet` tagged P — the peach was floating in the river so "wet" is plausible. Distractor `soft` tagged O is fine. Distractor pattern holds. ✅ |
| Ch2-L6-q4 | tap-tiles `correctOrder` has 7 entries `[0..6]` for 7 tiles needed; `tiles.length = 9` with `lunch/young` distractors — correct count, no off-by-one. ✅ |

### Clean Qs

L1-q1, L1-q2, L1-q3, L1-q5, L2-q1, L2-q2, L2-q3 (tap-tiles 7/9 correct), L2-q5, L3-q2, L3-q3, L3-q4, L3-q5, L4-q1, L4-q2, L4-q3, L4-q5, L4-q6, L5-q1, L5-q3, L5-q4, L5-q5, L6-q1, L6-q3, L6-q5, L6-q6. POV consistent (outer = Mochi "I"; inner = grandma narration 3rd-person). explanationZh bilingual Mochi-voice throughout. correctIndex always 0, options ordering matches; no emoji in question/options.

### Verdict

Ch2 is **content-clean, structure-borderline**. The 1+1+1+1 doctrine is held in spirit but the in-line `[C/S/P/O]` comment labels are drift-prone (L2-q4, L4-q4) and should be cleaned before JSON gen. The biggest issue is type-template drift: spec injects tap-tiles into L2/L3/L5/L6 where conventions specify listen-mc/read-mc-with-audio. Either lock conventions to match spec or revert tap-tiles to listening MC. Difficulty bias OK (L1-L5 mostly easy; L4-q6/L5-q4/L5-q6/L6-q4/L6-q6 tagged medium — matches "easy-medium" for L4-L6). No emoji violations, no Chinese in question stems, all correctIndex point to slot 0 with the named correct option. Ship-ready after distractor relabeling pass.

---

## Ch3 — 醜小鴨 (Ugly Duckling)

### Issues found

| Q | Issue |
|---|---|
| Ch3-L1 to L6 (systemic) | **Type-template mismatch.** Spec introduces `type-what-you-hear` (L2-q2, L4-q3) and `listen-emoji` (L4-q4, L5-q4, L5-q5, L6-q6) which are **not in the design-conventions.md type pacing table**. Conventions says L2 = listen-mc + read-mc-with-audio, L3 = listen-comprehension + tap-tiles, L4-L6 = listen-mc + listen-comprehension. type-what-you-hear and listen-emoji exist in v1.x codebase but were not authorized for the v2.0 Ch2-8 type pacing. **Designer decision needed**: extend conventions to permit these types or rewrite Ch3 to standard set. |
| Ch3-L1-q5 | Question prompt is `"How does {catName} feel?"` (Chinese-free, good) but `sentence` field reads `"How do I feel on the wall?"` — sentence is a question stem, not a declarative narrative. listen-comprehension should have a declarative `sentence` then a separate `question`. Rewrite sentence to `"I sit on the wall, calm and happy."` then question = "How does {catName} feel?". Same pattern at L3-q5, L4-q5, L6-q5 — all four use a question-as-sentence. |
| Ch3-L2-q2 | type-what-you-hear with `options[]` field — that's the wrong schema. type-what-you-hear is dictation (user types), not MC. If keeping the type, drop options OR convert to listen-mc. Same issue L4-q3. |
| Ch3-L3-q3 | tap-tiles `correctOrder = [0..7]` (8 tiles needed), `tiles.length = 10` with 2 distractors. ✅ no off-by-one. |
| Ch3-L4-q2 | Distractor `in the nest` tagged P with reasoning "蛋本來就在巢裡的容器, 部分相關" — but the audio sentence "I am still inside my egg" does not mention nest. P trap requires the word to be in the audio. Either change distractor to a word actually in the prior sentences, or relabel as S (both are "inside something" locations). |
| Ch3-L4-q4 | listen-emoji with `options[]` of feelings is fine if listen-emoji = "tap the matching emoji/feeling". But sentence "My mother sits over me." doesn't directly convey "safe" — it's an inference. This is more of a listen-comprehension. Either commit to listen-emoji's UI semantic or reclassify. |
| Ch3-L5-q2 | Distractor `gray` tagged P — gray is the duckling's own color introduced later. Acceptable as partial-truth (will-appear-later) but feels meta-spoilery. Fine. |
| Ch3-L6-q1 | tap-tiles `correctOrder = [0..6]` (7 tiles), `tiles.length = 9`. ✅ |
| Ch3-L6-q5 | Question stem is also stored as the `sentence` field: `"Why does Mother look surprised?"` repeated. Same defect as L1-q5. |

### Clean Qs

L1-q1, L1-q2, L1-q3 (modulo sentence-vs-question shape), L1-q4, L2-q1, L2-q3, L2-q4, L2-q5, L3-q1, L3-q2, L3-q4, L3-q5, L4-q1, L4-q5, L4-q6, L5-q1, L5-q3, L5-q5, L5-q6, L6-q2, L6-q3, L6-q4. POV consistent (inner-story = ugly duckling 1st-person "I am still inside my egg" — matches conventions §POV rule "Ch3 ugly duckling = monologue"). explanationZh bilingual Mochi-reflection voice. correctIndex always 0; no emoji in question/options.

### Verdict

Ch3 has **two structural defects** the designer must resolve before JSON gen: (1) introduction of unauthorized question types (type-what-you-hear, listen-emoji) not in the v2.0 pacing template, and (2) sentence-vs-question collision where listen-comprehension stores the question stem in the `sentence` field instead of a declarative audio line (L1-q5, L3-q5, L4-q5, L6-q5). Distractor doctrine is otherwise solid — the inner-story 1st-person duckling POV is the cleanest of the three chapters, and Mochi-voice explanationZh consistently ties inner story back to stray-cat reflection (e.g. L24-q7 "I am a stray, too"). Difficulty bias correct: L1-L3 easy, L4-L6 mostly easy with medium spikes at L4-q6/L5-q6/L6-q6. After fixing the type-set + sentence-shape issues, content quality is highest of the three.

---

## Ch4 — 龜兔賽跑 (Tortoise & Hare)

### Issues found

| Q | Issue |
|---|---|
| Ch4-L1 to L6 (systemic) | **Type-template mismatch.** Spec introduces `cloze` (L4-q3, L5-q3, L6-q3), `listen-emoji` (L1-q4, L2-q4, L3-q4, L4-q5, L5-q5, L6-q5), and `type-what-you-hear` (L1-q3, L2-q3) — none in conventions §Question type pacing for L1-L6. Spec acknowledges this in §5 TOEIC parity audit (different mix). Same designer call as Ch3: extend conventions or trim types. |
| Ch4-L1-q4 | listen-emoji options `[happy / calm / glad / hungry]`. `glad` is tagged S (same-category emotion) and `calm` is tagged P. But `happy` and `glad` are near-synonyms — that's a borderline-unfair distractor pair (user could legit pick `glad` and be wrong). Replace `glad` with a clearer same-category trap like `proud` or `excited`. |
| Ch4-L2-q3 | type-what-you-hear has `options[]` — same schema confusion as Ch3-L2-q2. Either drop options (true dictation) or convert to listen-mc. |
| Ch4-L2-q4 | listen-emoji options `[peaceful / noisy / calm / spicy]`. `calm` tagged P is a near-synonym of `peaceful` (correct). Same unfair-distractor issue as L1-q4. Replace `calm` with `crowded` or `tense`. |
| Ch4-L3-q2 | Distractor `turtle and rabbit` tagged S "同義詞口語" — these are dictionary synonyms of tortoise/hare. This is the wrong kind of distractor: it makes the question test pedantic vocab (tortoise vs turtle) rather than story comprehension. Replace with another animal pair like `tortoise and dog` or `frog and hare`. |
| Ch4-L3-q3 | tap-tiles `correctOrder = [0..6]` (7 tiles), `tiles.length = 9`. ✅ |
| Ch4-L3-q4 | listen-emoji options `[curious / tired / interested / thirsty]`. `interested` is a near-synonym of `curious`. Same unfair-pair pattern. Replace `interested` with `bored` (clear S antonym). |
| Ch4-L4-q1 | Distractor `his fast legs` tagged P — but the audio is "Look at my long legs" which does not say "fast". The partial-truth rule requires P to be a word IN the audio. P fails. Either rewrite sentence to include "fast" or replace `his fast legs` with `his long arms`. |
| Ch4-L4-q4 | tap-tiles `correctOrder = [0..5]` (6 tiles), `tiles.length = 8`. ✅ |
| Ch4-L4-q5 | listen-emoji `[proud / shy / confident / thirsty]`. `confident` is near-synonym of `proud` (spec even admits "相鄰情緒但 Hare 已經跨過自信到自滿"). Same unfair-pair issue — A2 learner cannot reliably distinguish proud vs confident from audio. Replace `confident` with `arrogant` (still S) or `humble` (clear antonym). |
| Ch4-L5-q4 | tap-tiles `correctOrder = [0..6]` (7 tiles), `tiles.length = 9`. ✅ |
| Ch4-L5-q5 | listen-emoji `[calm / angry / peaceful / hungry]`. `peaceful` is near-synonym of `calm`. Same recurring fault — Ch4 listen-emoji distractor sets repeatedly include English synonyms as traps. **Pattern-level fix needed**: when authoring listen-emoji, use distinct feelings only (one same-tier opposite, one different-tier, one off-topic), never synonyms of the correct word. |
| Ch4-L6-q2 | Distractor `agree` tagged S "同義詞但聲音不同" — agree is a near-synonym of accept. Same synonym-as-trap problem repeating in listen-mc Q. Replace `agree` with `apply` or `attack`. |
| Ch4-L6-q4 | tap-tiles `correctOrder = [0..6]` (7 tiles), `tiles.length = 9`. ✅ |
| Ch4-L6-q5 | listen-emoji `[excited / bored / thrilled / sleepy]`. `thrilled` near-synonym of `excited` (spec acknowledges "更強烈一階"). Same pattern. Replace `thrilled` with `nervous`. |

### Clean Qs

L1-q1, L1-q2, L1-q5, L2-q1, L2-q2, L2-q5, L3-q1, L3-q5, L4-q2, L4-q3, L4-q6, L5-q1, L5-q2, L5-q3, L5-q6, L6-q1, L6-q3, L6-q6. POV mostly clean (outer = Mochi 1st-person "I climb the wall again"; main = 3rd-person Hare/Tortoise — note conventions originally framed inner story as protagonist 1st-person but Ch4 spec §5 self-audits as "Main story uses 3rd-person + alternating dialogue lines" — designer accepted this drift for dialogue chapter). explanationZh bilingual Mochi-reflection voice OK. correctIndex always 0; no emoji in question/options. Difficulty bias OK: L1-L3 easy, L4-L6 medium spikes at q6 of each.

### Verdict

Ch4 is the **most problematic of the three** due to a systematic synonym-as-distractor pattern in listen-emoji Qs (L1-q4 glad vs happy, L2-q4 calm vs peaceful, L3-q4 interested vs curious, L4-q5 confident vs proud, L5-q5 peaceful vs calm, L6-q5 thrilled vs excited) and one listen-mc Q with the same issue (L6-q2 agree vs accept). For A2 learners, near-synonym distractors are unfair — they test L1 lexicographic pedantry rather than L2 listening comprehension. The 1+1+1+1 doctrine requires the same-category trap to be distinguishable; synonyms violate that. Recommend a content pass to swap all near-synonym S-slot distractors for true sibling categories (other emotions / other actions). Secondary issue: spec introduces `cloze` and `listen-emoji` as new types not in v2.0 pacing template — designer must decide whether to extend conventions or trim. Tap-tiles counts all clean; POV / explanationZh bilingual / no-emoji / correctIndex all clean. Once distractor pass + type-template decision are done, ship-ready.

---

## Cross-chapter summary

| Check | Ch2 | Ch3 | Ch4 |
|---|---|---|---|
| 4 options per Q | ✅ | ✅ | ✅ |
| 1+1+1+1 doctrine | borderline (label drift) | ✅ | ❌ synonym S-slot recurring |
| Pure-English question | ✅ | ✅ | ✅ |
| No emoji in options | ✅ | ✅ | ✅ |
| POV consistent | ✅ outer-Mochi + inner-grandma | ✅ inner-duckling 1st | ✅ outer-Mochi + 3rd-dialogue (accepted drift) |
| explanationZh Mochi bilingual | ✅ | ✅ (strongest) | ✅ |
| correctIndex correct | ✅ all slot 0 | ✅ all slot 0 | ✅ all slot 0 |
| Type-template match | ❌ tap-tiles drift | ❌ type/listen-emoji new | ❌ cloze/listen-emoji new |
| Difficulty bias correct | ✅ | ✅ | ✅ |
| tap-tiles no off-by-one | ✅ | ✅ | ✅ |

### Top three designer decisions before JSON gen

1. **Extend or enforce type pacing table.** All three chapters drift from conventions §Question type pacing. Either update `design-conventions.md` to permit tap-tiles/cloze/type-what-you-hear/listen-emoji across L1-L6 (which seems intended given v1.x codebase already supports them), or rewrite specs to the strict listen-mc + listen-comprehension + read-mc-with-audio set. Recommend updating conventions — these question types ship and add learning value.
2. **Ban near-synonym distractors in listen-emoji (Ch4-wide pass).** Add an authoring rule: same-category trap must be a sibling, not a synonym. Re-author Ch4 L1-q4 / L2-q4 / L3-q4 / L4-q5 / L5-q5 / L6-q5 / L6-q2.
3. **Fix listen-comprehension sentence-vs-question shape (Ch3).** L1-q5, L3-q5, L4-q5, L6-q5 store the question in the `sentence` field. Sentence must be the audio narrative line, question must be the prompt. Same fix likely needed in remaining 19 Ch3 lessons.

### Ship-readiness

- **Ch2**: ship-ready after 5-Q distractor relabel pass (~30 min)
- **Ch3**: ship-blocked on type-template decision + sentence-shape fix across listen-comprehension Qs (~2 hr)
- **Ch4**: ship-blocked on synonym-distractor pass across listen-emoji Qs (~1-2 hr) + type-template decision

---

*End of QA report. Designer agents fix issues then re-submit per chapter for re-audit.*
