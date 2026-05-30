# Pickup Autonomous Loop — Session Status (2026-05-31)

User authorized infinite loop mode: design + check > generate raw. Reports here.

## ✅ Done this session

### Audio fix attempts (B.79+)
- B.79: dropped Howler.js + sync-set isAudioUnlocked + Web Audio playBuffer primary
- Web Audio AudioContext singleton resumed in gesture
- silentLoopAudio for ringer-channel bypass per WebKit Bug 237322
- Status: **unverified by user**, likely still problematic — needs further root-cause work

### Content design (8 chapter specs)
All 8 chapter specs delivered as canonical markdown at `docs/content-loop/ch{1-8}-spec.md`:

| Ch | Title | Author | Status |
|---|---|---|---|
| 1 | A Story in the Yard (雨夜小貓) | me (canonical reference) | ✅ committed |
| 2 | 桃太郎 (Momotaro) | agent | ✅ committed |
| 3 | 醜小鴨 (Ugly Duckling) | agent | ✅ committed |
| 4 | 龜兔賽跑 (Tortoise & Hare) | agent | ✅ committed |
| 5 | 駱駝駝峰 (Kipling Camel) | agent | ✅ committed |
| 6 | Baba Yaga | agent | ✅ committed |
| 7 | 六隻天鵝 (Six Swans) | agent | ✅ committed |
| 8 | 葉限 finale (Tang-dynasty Cinderella) | agent | ✅ committed |

Each spec ~600-1000 lines markdown with: story arc, 25-lesson outline, first 6 lessons FULL Q data, vocab key, TOEIC parity audit, bonus 番外 lesson.

### QA audit results
- `docs/content-loop/qa-report-ch2-4.md` (Ch2 ship-ready, Ch3 ship-blocked 2hr, Ch4 ship-blocked 1-2hr)
- `docs/content-loop/qa-report-ch5-7.md` (Ch5 1 blocker, Ch6/Ch7 NIT only)

### Cross-chapter systemic issues (locked into conventions addenda)
1. **correctIndex shuffled**: post-process script auto-shuffles 0..3 to avoid gameable position bias (Ch1 was 96% pos:0 pre-fix)
2. **1+1+1+1 distractor doctrine**: clarified — pattern is correct+category+partial+obvious-miss, NOT 4 phonetic cousins
3. **No near-synonym distractors** in listen-emoji (Ch4 had glad/happy unfair)
4. **Type pacing extended** — read-mc-with-audio + tap-tiles + listen-mc + listen-comprehension all usable in main-story
5. **Ban listen-emoji going forward** — confuses with emoji-rule; use listen-comprehension with text-only emotion options

### Infrastructure
- `tools/post-process-lessons.js` — auto-shuffle correctIndex + emoji/Chinese audit + stats report
- NODE_PATH_V2 extended 24 → 25 nodes
- LessonSchema lessonInChapter already max(25) ✓
- Ch1 lessons-ch1.json correctIndex distribution rebalanced via shuffle

## 🔄 In flight

7 JSON translator agents running:
- Ch2 → lessons-ch2.json
- Ch3 → lessons-ch3.json
- Ch4 → lessons-ch4.json
- Ch5 → lessons-ch5.json
- Ch6 → lessons-ch6.json
- Ch7 → lessons-ch7.json
- Ch8 → lessons-ch8.json

Each writes 150 Q (~118 new Qs beyond first 6 lessons in spec). ETA ~5-10min more per agent.

After return: run `node tools/post-process-lessons.js public/lessons-ch{N}.json` to shuffle correctIndex + audit.

## 🚧 Pending

- Wait for 7 JSON translator agents → post-process each
- Re-QA the JSON files (vs spec markdown) to catch translation drift
- Audio auto-play **not solved** despite 11 attempts (B.68-B.79). Likely needs different approach — possibly Service Worker + cache, OR force-tap-to-start UI.
- /refresh-dashboard per memory rule

## Memory rules locked this session

- `feedback_pickup_no_emoji_qa` (no emoji in question/options)
- `feedback_pickup_listening_format` (small speaker prefix, no Tap to listen)
- `feedback_pickup_bilingual` (UI chrome bilingual, content English+word-tap-translate)
- `feedback_pickup_retry_reveal` (2-strike reveal)
- `feedback_perf_budget` (3s/1s LCP)

## Quota / metadata

- Commits this session: B.41 → B.87 (~47 commits)
- Agent dispatches: 8 chapter spec + 2 QA + 7 JSON translator + 1 audio debug = 18 agents
- Block usage: ~60% (~30 min left this 5-hr block)
- Total cost approx: $0.66 OpenAI gpt-image-1 + $0.05 ElevenAPI + Claude session ~$20

## Next actions when JSON agents return

```bash
# Per chapter:
node tools/post-process-lessons.js public/lessons-ch{N}.json
cd /c/Users/acer/Desktop/wordwar
git add public/lessons-ch{N}.json
git commit -m "v2.0.B.XX: Ch{N} lessons-ch{N}.json (150 Q post-processed)"

# Final:
npm run build  # vitest + tsc + validate-lessons must pass
git push
infisical run --env=dev -- npx wrangler pages deploy dist --project-name=pickupwords --branch=master
```

## Open questions for user (when they return)

1. **Audio auto-play unresolved** — should we (A) keep trying Web Audio, (B) use external lib like Tone.js, (C) accept manual-tap UI with prominent pulse on Q mount?
2. **Ch1 lesson 25** — current Ch1 v2.0 has 24 lessons; canonical spec calls for 25 (L24=番外, L25=review). Should we restructure or accept Ch1 = 24?
3. **Audio MP3 generation** — deferred per "明天給我題目後再決定". When you review tomorrow, confirm ElevenLabs voice per character (Grandma shimmer / Mochi Lulu Lolipop / Ch5 Kipling djinn voice / Ch6 Baba Yaga voice / Ch7 swans no-dialogue voice / Ch8 Ye Xian voice)
