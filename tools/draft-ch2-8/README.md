# Pickup Ch2-8 Story Draft

Drafted while user was AFK (v1.9.49 era). No schema/map/runStore touched — these are pure content files in a sibling folder.

## Files

- `outline.md` — full 8-chapter narrative arc (warm intro → adventure → struggle → false-ending)
- `ch{2..8}.json` — 6 questions per chapter, matches existing `story-kitten.json` schema (`StoryQuestionSchema` in `src/data/storyKitten.ts`)
- `word-hints-additions.json` — new word-hint entries to merge into `public/word-hints.json`

## When user PC ready, integration steps

1. **Review draft**: read `outline.md` + skim each `ch{N}.json`
2. **Extend NODE_PATH** in `src/ui/StoryMapView.ts:68-77` from 8 positions → 50 (7 chapters × 6 nodes + 8 lock buffer). Or refactor to per-chapter path arrays.
3. **Extend `CHAPTERS_IN_ORDER`** in `src/data/storyKitten.ts:261` from `[1]` → `[1,2,3,4,5,6,7,8]`
4. **Append** ch2-8 question objects to `public/story-kitten.json` (currently only ch1 6 questions).
5. **Merge** `word-hints-additions.json` into `public/word-hints.json`.
6. **Extend** `CHAPTER_META` in `src/data/storyKitten.ts` with accent/emoji per chapter (Ch1 has it, copy pattern).
7. **Update map** `StoryMapView.ts:210` loop and `isChapterUnlocked` predicate to gate Ch{N} on Ch{N-1} completion.
8. Test build + deploy.

Estimated integration time: 1-2 hr on PC.

## Style guide

- A2 English target (NotionA2 = ~1500 words, simple SVO sentences).
- One sentence per question (no compound) — easier TTS.
- 6 questions per chapter, mix all 5 types (listen-mc / listen-emoji / listen-comprehension / type-what-you-hear / tap-tiles / tap-pairs).
- Each chapter ends with a tap-pairs review of 4 new vocabulary.
- Reuse Ch1 pool words (rain/cold/hungry/kind/...) in early chapters for SRS grip.
- explanationZh: story-voice, no jargon. Bilingual hint pattern.
- storyBeat: 中文 ≤ 25 字, what's happening in this moment.

## Brand voice anchor

- Protagonist: 三花貓 — 愛哭鬼但堅韌 (crybaby but resilient).
- Tone: 下班逃逸 + Ghibli warm. Soft, slow, hopeful.
- AVOID: hyper-cute, sarcastic, jokey, anxious, rushed.
