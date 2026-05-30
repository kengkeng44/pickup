# Pickup 1200-Question Content Design Conventions

Master reference for all chapter spec agents. Lock conventions per user 2026-05-31 clarification.

## Hard rules (memory-locked)

1. **NO emoji** in any `question` or `options` string (memory: feedback-pickup-no-emoji-qa)
2. **NO Chinese in question prompt** — English only; Chinese surfaces via word-tap on rendered sentence (memory: feedback-pickup-listening-format)
3. **Trap distractor STRICT 1+1+1+1** every 4-option MC question:
   - 1 correct answer
   - 1 same-category trap (testing color → another color)
   - 1 partial-truth trap (mentioned in audio but wrong answer)
   - 1 obvious-miss (clearly off-topic)
4. **POV consistency**:
   - Outer-frame Q: Mochi 1st-person ("I jumped over the wall")
   - Inner-story Q: Story protagonist 1st-person (or per chapter framing — Ch3 ugly duckling = monologue, Ch5 Kipling = "you" address, Ch7 swans = poetic 3rd, Ch8 Ye Xian = code-switch)
   - `explanationZh` always Mochi-POV reflection bilingual ("今晚奶奶說的故事裡...")
5. **TOEIC parity**: listening = listen-mc 4-MC + inference (why/how/what kind) > literal retrieval
6. **No "Tap to listen"** UI — small speaker prefix + sentence-with-blanks pattern (memory: feedback-pickup-listening-format)
7. **2-strike reveal** for all question types (memory: feedback-pickup-retry-reveal)

## Architecture (per chapter, total 1200 Q across 8 chapters)

8 chapters × 25 lessons × 6 Q = **1200 Q**. Same lesson count regardless of story length — short stories get bonus 番外 lessons.

### Lesson breakdown per chapter

| Block | Lessons | Q/lesson | Total Q | Purpose |
|---|---|---|---|---|
| Outer prologue | 3 | 5 | 15 | Mochi tonight: jumps wall, sees grandma, hears "today's story is..." |
| Main story | 15 | 6 | 90 | Chapter's main fairy tale, beat-by-beat |
| Aesop side A | 2 | 5 | 10 | First Aesop fable per CLAUDE.md spec |
| Aesop side B | 2 | 5 | 10 | Second Aesop fable per CLAUDE.md spec |
| Outer outro | 2 | 5 | 10 | Mochi reacts, grandma closes book |
| 番外 lesson | 1 | 10 | 10 | Hana/Mochi asks grandma a question; grandma answers — short story chapter equalizer per user request |
| Review (tap-pairs) | 1 | 5 | 5 | Chapter vocab review |
| **Total** | **25** | **avg 6** | **150** | |

## Question type pacing (per lesson position)

Each lesson uses **2-3 question types** clustered consistently. Same lesson position across all chapters → same type-set (predictable user pacing).

| Lesson # | Types used | Difficulty bias |
|---|---|---|
| 1 (prologue) | listen-mc + listen-comprehension | easy |
| 2 (prologue) | listen-mc + read-mc-with-audio | easy |
| 3 (prologue) | listen-comprehension + tap-tiles | easy |
| 4-6 (main early) | listen-mc + listen-comprehension | easy-medium |
| 7-12 (main mid) | listen-comprehension + tap-tiles | medium |
| 13-18 (main late) | listen-mc + tap-tiles + listen-comprehension | medium-hard |
| 19-20 (aesop A) | listen-mc + read-mc-with-audio | easy |
| 21-22 (aesop B) | listen-mc + listen-comprehension | easy |
| 23 (outro) | listen-comprehension + read-mc-with-audio | medium |
| 24 (番外 Q&A) | listen-comprehension + listen-mc | easy-medium |
| 25 (review) | tap-pairs (vocab matching) | easy |

## Difficulty distribution

- **easy**: ~70% (105 Q per chapter)
- **medium**: ~25% (38 Q per chapter)
- **hard**: ~5% (7 Q per chapter — inference / wordplay)

User clarification: "難題不要太多 簡單題可以多一點類型". Hard Q are sprinkled in lessons 13-18 main-late beats. Most chapter mass is easy/medium for momentum.

## Vocabulary scaling

Each chapter introduces 25-30 new English words. By Ch8 user knows ~200 words. Reuse across chapters reinforces.

A2 ceiling per word:
- Concrete nouns: cat, dog, peach, swan, fish (concrete + visible)
- Action verbs: jump, run, sleep, weave, fight (simple past tense)
- Feelings/adjectives: brave, scared, lonely, kind, lazy
- Time/location: tonight, yesterday, forest, river, home
- Connectors: but, because, then, before, after

Avoid: phrasal verbs, abstract nouns (concept/society/notion), idioms.

## File output convention

Per chapter spec agent:
- Write spec markdown to `docs/content-loop/ch{N}-spec.md`
- Include: story arc (250 words), 25-lesson outline table, **first 6 lessons FULL Q data** (sample for QA), vocab key list, TOEIC parity audit, bonus 番外 lesson Q

After human review of spec, translate to `public/lessons-ch{N}.json` with full 150 Q.

## QA agent checklist (per chapter)

1. ✅ Every 4-MC Q has exactly 4 options
2. ✅ Distractor doctrine met (correct + category + partial + obvious-miss)
3. ✅ `question` field: pure English, no emoji
4. ✅ `options[]`: no emoji
5. ✅ `sentence`: matches POV layer (outer = Mochi I; inner = story narrator)
6. ✅ `explanationZh`: Mochi-POV reflection + bilingual vocab inline
7. ✅ `correctIndex` points to actual correct option
8. ✅ Question types match lesson position template
9. ✅ Difficulty bias matches lesson position
10. ✅ No off-by-one in tap-tiles/correctOrder

QA agent reports issues per Q. Designer agent fixes + re-submit.

## Memory rules cross-reference

- `feedback_pickup_no_emoji_qa` — rule #1 + #4
- `feedback_pickup_listening_format` — rule #2 + #6
- `feedback_pickup_bilingual` — rule #4 explanation layer
- `feedback_pickup_retry_reveal` — rule #7
- `feedback_pickup_perf_budget` — content shouldn't bloat bundle past LCP 3s budget
- `feedback_pickup_explain_technical_simply` — explanationZh uses 比喻 + 大白話 + 少 jargon

## QA findings (2026-05-31 round 1) — addenda

QA agents audited Ch2-Ch7 specs first 6 lessons. Cross-chapter systemic issues:

### Critical fixes for ALL JSON gen
1. **correctIndex must be SHUFFLED** — every sample Q in agent specs has correctIndex:0 (predictable/gameable). JSON gen must randomize position 0/1/2/3 for each Q.
2. **1+1+1+1 doctrine ≠ 4 phonetic cousins**. The pattern is: correct + same-category + partial-truth + obvious-miss. Phonetic-confuser cluster (4 words starting with same letter) is OK for listen-mc only when distractors also vary by semantic category. Don't stack 4 phonetic peers.
3. **No near-synonym distractors in listen-emoji**: glad/happy/joyful/excited are unfair for A2 — they test L1 pedantry not L2 listening. Pick semantically distinct categories.
4. **Avoid `listen-emoji` type going forward** — type confusing; user clarified no-emoji rule. Use `listen-comprehension` with text-only emotion options instead.

### Type pacing — EXTEND (not enforce)
Original template restricted read-mc-with-audio to L19-23. Multiple agents used it pedagogically well in main-story. **Update**: read-mc-with-audio + tap-tiles + listen-mc + listen-comprehension all usable in main-story L4-L18. Pacing table is GUIDE not LAW.

### Per-spec follow-ups
- **Ch2** (桃太郎): minor relabel pass on [C/S/P/O] tags
- **Ch3** (醜小鴨): fix question stem misplaced in `sentence` field for L1q5/L3q5/L4q5/L6q5
- **Ch4** (龜兔賽跑): replace synonym distractors with semantic-category peers in 7 Qs
- **Ch5** (Kipling): L2-q3 duplicate "page" option — fix in JSON gen
- **Ch6** (Baba Yaga): NIT — diversify distractor pool beyond phonetic
- **Ch7** (Six Swans): bonus has 2 hard Q (20% local) vs 5% chapter budget — relabel medium

JSON translator agents currently in flight — fixes applied in post-validation pass.


Audio MP3 generation **deferred until user reviews questions** (user 2026-05-31 directive: "先不要生 明天給我題目後我再決定"). After content lock:
- Mochi-POV sentences → ElevenLabs Lulu Lolipop
- Grandma-POV sentences → OpenAI gpt-4o-mini-tts shimmer slow
- Aesop side stories: animal protagonist POV → choose voice per character
