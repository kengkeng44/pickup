import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';
import { markLessonCompleted } from '../store/runStore';
import { ClozeUI } from '../ui/ClozeUI';
import { GameHUD } from '../ui/GameHUD';
import { Mascot } from '../ui/Mascot';
import { CHAPTER_META } from '../data/storyKitten';
import { speak, autoSpeak } from '../audio/tts';
import {
  mountTapTiles,
  mountTapPairs,
  mountTypeWhatYouHear,
  type TapHandle,
} from '../ui/TapInputUI';
import {
  loadChapterLessons,
  findLesson,
  type Lesson,
  type Question,
  type ChapterId,
} from '../data/lessons';
import type { ClozeQuestion } from '../data/sentences';

export type LessonSceneData = {
  chapter: number;
  lessonId: string;
};

const ADVANCE_CORRECT_MS = 1_400; // Story-mode pacing (matches PlayScene STORY_ADVANCE_CORRECT_MS)

// v2.0.B.120: TOEIC native pace ~150 wpm. A2 Taiwanese learners need ~100-120 wpm.
// Web Speech API rate scale: 1.0 ≈ 150-180 wpm; 0.75 ≈ 115-135 wpm (A2 sweet spot).
// User reported B.119 still felt fast — dropped sentence/options from 0.85 → 0.75.
// Question prompt kept slightly faster (0.85) since it's directive not content-bearing.
// Source: academic TOEIC listening rate study tested 100/150/200 wpm; 100 wpm is the
// "learner-comprehensible" floor, but choppy on Web Speech engines, so 0.75 ≈ 115 wpm
// is the empirical sweet spot that's slow enough for A2 but still natural-sounding.
// v2.0.B.122: options dropped 0.75 → 0.65 — user reported B.120 still too fast
// for ABCD minimal-pair recognition. iOS Safari Web Speech non-linear: at 0.75
// the phoneme onset gap between "straw" / "stay" / "stray" / "story" is too tight.
// 0.65 ≈ 100 wpm gives ~150ms extra inter-word gap = user can pattern-match letter.
const SPEECH_RATE_SENTENCE = 0.75;
const SPEECH_RATE_QUESTION = 0.85;
const SPEECH_RATE_OPTIONS = 0.65;

/**
 * LessonScene — v2.0 single-lesson scope (forks PlayScene's question
 * sequencer pattern for the new Duolingo-nested model).
 *
 * Called from StoryMapView (Task 9 next iteration) via:
 *   this.scene.start('LessonScene', { chapter: 1, lessonId: 'kt-ch1-l5' })
 *
 * ClozeUI signature note (Task 8 adaptation):
 *   The plan assumed ClozeUI took (scene, question, {onCorrect, onWrong}).
 *   Actual signature is (handlers, opts) where handlers = {onAnswer,
 *   onContinue, onForceCorrect?} and opts requires {accent, buttonsSlot,
 *   revealSlot, forceCorrectMode?}. We adapted by mounting GameHUD first
 *   (which owns the DOM slots ClozeUI needs) and using the existing
 *   PlayScene handler signature.
 *
 *   ClozeUI auto-subscribes to useRunStore.round to render question text,
 *   so we drive Q→Q advancement by calling useRunStore.setState({ round })
 *   directly with each lesson question cast to ClozeQuestion (the
 *   structurally permissive shape — discriminated Question union would
 *   narrow on access and break v1.x consumer code). Tracked as v2 tech
 *   debt: refactor ClozeUI to consume discriminated types directly.
 */
export class LessonScene extends Phaser.Scene {
  static KEY = 'LessonScene';

  private lesson!: Lesson;
  private chapter!: number;
  private questionIdx = 0;
  private hud?: GameHUD;
  private clozeUI?: ClozeUI;
  private mascot?: Mascot;
  private advanceTimer?: Phaser.Time.TimerEvent;
  private locked = false;
  // v2.0.A.7: Duolingo alt-input UI handle for tap-tiles / tap-pairs /
  // type-what-you-hear (mirrors PlayScene.tapHandle).
  private tapHandle?: TapHandle;

  constructor() {
    super({ key: LessonScene.KEY });
  }

  private pendingLessonId = '';

  init(data: LessonSceneData) {
    // v2.0.B.117: sync init only — async load moved to create() with .then.
    // Phaser doesn't await async init() before create() (Phaser 3.90 quirk
    // — caught via Playwright smoke test). create() ran with lesson=undefined.
    this.chapter = data.chapter;
    this.pendingLessonId = data.lessonId;
    this.questionIdx = 0;
  }

  create(): void {
    // Async load lessons + then mount UI. Phaser allows create() to start
    // async work but UI mount happens inside the .then() block.
    void loadChapterLessons(this.chapter as ChapterId).then((lessons) => {
      const found = findLesson(lessons, this.pendingLessonId);
      if (!found) {
        console.error(`[LessonScene] Lesson ${this.pendingLessonId} not found in ch${this.chapter}`);
        this.scene.start('StoryModeScene');
        return;
      }
      this.lesson = found;
      this._mountLessonUI();
    }).catch((e) => {
      console.error('[LessonScene] load failed:', e);
      this.scene.start('StoryModeScene');
    });
  }

  private _mountLessonUI(): void {
    if (!this.lesson) return;

    // Defensively kill any leftover bottom nav (matches PlayScene v1.8.7).
    document.getElementById('pickup-bottom-nav')?.remove();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.cleanupOverlay();
    });

    // Story-mode meta from the chapter (LessonScene is only used for story).
    const ch = CHAPTER_META[this.chapter as ChapterId];
    const meta = {
      accent: ch.accent,
      tint: ch.tint,
      mascotId: ch.kittenMascotId,
      emoji: ch.emoji,
      labelEn: ch.titleEn,
    };

    // Seed runStore for ClozeUI's subscription (story mode, no HP/timer/streak).
    const store = useRunStore.getState();
    store.setMode('story');
    store.setChapter(this.chapter as ChapterId);
    store.reset();

    this.hud = new GameHUD({
      accent: meta.accent,
      tint: meta.tint,
      totalRounds: this.lesson.questions.length,
      scenarioLabel: '',
      emoji: meta.emoji,
      hideHp: true,
      hideStreak: true,
      hideTimer: true,
      onChange: () => {
        this.cleanupOverlay();
        this.scene.start('StoryModeScene');
      },
    });

    this.clozeUI = new ClozeUI(
      {
        onAnswer: (idx) => this.handleAnswer(idx),
        onContinue: () => this.handleContinue(),
        onForceCorrect: () => this.handleForceCorrect(),
      },
      {
        accent: meta.accent,
        buttonsSlot: this.hud.buttonsSlot(),
        revealSlot: this.hud.revealSlot(),
        forceCorrectMode: true,
      }
    );

    this.mascot = new Mascot({ parent: this.hud.mascotSlot() });
    this.mascot.setMascotImage('/mascots/calico-anchor.webp');

    this.renderQuestion(this.lesson.questions[0]);
  }

  private renderQuestion(q: Question): void {
    this.locked = false;
    this.cancelAdvanceTimer();

    // Tear down any prior tap UI from the previous question — symmetric
    // with PlayScene.ts:475-476.
    this.tapHandle?.destroy();
    this.tapHandle = undefined;

    // Push question into runStore so ClozeUI's subscription picks it up.
    // Cast to ClozeQuestion (permissive shape) — see header note re: types.
    useRunStore.setState({
      round: q as unknown as ClozeQuestion,
      answered: false,
      awaitingRetry: false,
      lastResult: null,
    });
    this.clozeUI?.resetForRound();
    this.mascot?.setAnim('idle');
    this.renderHud();

    // v2.0.B.30: removed auto-speak. iOS Safari rejects Audio.play() with
    // NotAllowedError when called from setTimeout (delayed gesture chain).
    // User now taps 🔊 manually — always works because that IS the gesture.

    // v2.0.A.7: dispatch by discriminated `q.type` — mirrors
    // PlayScene.ts:473-520 routing pattern. Without this, tap-tiles /
    // tap-pairs / type-what-you-hear fall through to ClozeUI's 4-option
    // MC buttons and break (Ch1 grandma-v4 ships a tap-pairs review @ Q8).
    //
    // Routing map (covers all 7 QuestionType variants):
    //   listen-mc            → ClozeUI 4-MC (default)
    //   listen-emoji         → ClozeUI 4-MC (default)
    //   listen-comprehension → ClozeUI 4-MC (default)
    //   read-mc-with-audio   → ClozeUI 4-MC (default)
    //   type-what-you-hear   → mountTypeWhatYouHear (text input)
    //   tap-tiles            → mountTapTiles
    //   tap-pairs            → mountTapPairs
    const qType = q.type;
    const round = q as any;

    // v2.0.B.118: blind-listening sentence card for listen-mc / listen-comprehension.
    // Mirrors PlayScene's useListeningUI block — sentence is replaced by N
    // underline word-blanks, speaker tap plays sentence + question via Web Speech.
    // Per user: 文字應該都是隱形的.
    if (
      this.hud &&
      (qType === 'listen-mc' || qType === 'listen-comprehension')
    ) {
      const correctIndex = round.correctIndex ?? 0;
      const correctWord = round.options?.[correctIndex] ?? '';
      const sentenceText = String(round.sentence ?? '').replace(/_{2,}/g, correctWord);
      const tokens = String(round.sentence ?? '').split(/(\s+)/);
      const isWord = (t: string) => /\S/.test(t);
      const isCloze = (t: string) => /_{2,}/.test(t);
      const blankSpan = (len: number, cloze: boolean) =>
        `<span style="display:inline-block;border-bottom:${cloze ? '3px' : '2px'} solid ${cloze ? '#b07a2a' : '#c8a878'};min-width:${len}px;height:1.1em;vertical-align:-2px;margin:0 2px;border-radius:1px;"></span>`;
      const blanksHtml = tokens.map(tok => {
        if (!isWord(tok)) return tok;
        const m = tok.match(/^(.+?)([.,!?;:'"]+)?$/);
        const word = m?.[1] ?? tok;
        const punct = m?.[2] ?? '';
        const cloze = isCloze(word);
        const wordLen = cloze ? 8 : Math.min(Math.max(word.length, 3), 8);
        return blankSpan(wordLen * 8, cloze) + (punct ? `<span style="color:#8b6f4a;font-weight:800;">${punct}</span>` : '');
      }).join('');
      const sentEl = this.hud.getSentenceElement();
      if (sentEl) {
        sentEl.innerHTML = `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 4px;">
            <button type="button" aria-label="Replay audio" class="pickup-listen-speaker pickup-speaker-pulse" style="
              flex:0 0 auto; width:40px; height:40px; padding:0;
              background:#e7a44a; border:none; border-bottom:3px solid #b07a2a;
              border-radius:50%; cursor:pointer;
              display:inline-flex; align-items:center; justify-content:center;
              touch-action:manipulation; -webkit-tap-highlight-color:transparent;
            ">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5zm4.5 7c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            </button>
            <div style="flex:1 1 auto;min-width:0;">
              <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.8;max-height:140px;overflow:hidden;">${blanksHtml}</div>
            </div>
          </div>
        `;
        const spk = sentEl.querySelector('.pickup-listen-speaker') as HTMLButtonElement | null;
        // v2.0.B.119: speaker queue extended — TOEIC Part 2/3-4 standard.
        // Without A-D being spoken, blind-listening user has NO cue which
        // letter button is which option. User reported: "問題跟答案對不上"
        // — root cause was missing options audio.
        //
        // Queue: sentence → 1s pause → "Question. <prompt>" → 0.6s pause →
        //        "A. <opt1>. B. <opt2>. C. <opt3>. D. <opt4>."
        const optionsText = Array.isArray(round.options)
          ? ['A', 'B', 'C', 'D']
              .map((letter, i) => `${letter}. ${round.options[i] ?? ''}.`)
              .join(' ')
          : '';
        const speakQueue = (): void => {
          if (!(typeof window !== 'undefined' && window.speechSynthesis)) {
            speak(sentenceText);
            return;
          }
          try {
            window.speechSynthesis.cancel();
            const u1 = new SpeechSynthesisUtterance(sentenceText);
            u1.lang = 'en-US';
            u1.rate = SPEECH_RATE_SENTENCE;
            const speakQuestionThenOptions = (): void => {
              window.setTimeout(() => {
                try {
                  const u2 = new SpeechSynthesisUtterance(`Question. ${round.question ?? ''}`);
                  u2.lang = 'en-US';
                  u2.rate = SPEECH_RATE_QUESTION;
                  if (optionsText) {
                    u2.onend = () => {
                      window.setTimeout(() => {
                        try {
                          const u3 = new SpeechSynthesisUtterance(optionsText);
                          u3.lang = 'en-US';
                          u3.rate = SPEECH_RATE_OPTIONS;
                          window.speechSynthesis.speak(u3);
                        } catch {}
                      }, 600);
                    };
                  }
                  window.speechSynthesis.speak(u2);
                } catch {}
              }, 1000);
            };
            if (round.question) {
              u1.onend = speakQuestionThenOptions;
            } else if (optionsText) {
              u1.onend = () => {
                window.setTimeout(() => {
                  try {
                    const u3 = new SpeechSynthesisUtterance(optionsText);
                    u3.lang = 'en-US';
                    u3.rate = SPEECH_RATE_OPTIONS;
                    window.speechSynthesis.speak(u3);
                  } catch {}
                }, 600);
              };
            }
            window.speechSynthesis.speak(u1);
          } catch {
            speak(sentenceText);
          }
        };
        spk?.addEventListener('click', (e) => {
          e.preventDefault();
          speakQueue();
        });
      }
    }

    if (
      this.hud &&
      (qType === 'tap-tiles' || qType === 'tap-pairs' || qType === 'type-what-you-hear')
    ) {
      const slot = this.hud.buttonsSlot();
      // Hide ClozeUI's standard 4-MC buttons for this round.
      slot.innerHTML = '';
      const correctIndex = round.correctIndex ?? 0;
      const correctWord = round.options?.[correctIndex] ?? '';
      const audioText = String(round.sentence ?? '').replace(/_{2,}/g, correctWord);

      if (qType === 'tap-tiles' && round.tiles && round.correctOrder) {
        this.tapHandle = mountTapTiles({
          slot,
          tiles: round.tiles,
          correctOrder: round.correctOrder,
          prompt: round.question ?? 'Tap what you hear',
          onSpeak: () => speak(audioText),
          onComplete: (correct) =>
            this.handleAnswer(correct ? correctIndex : (correctIndex + 1) % 4),
        });
        autoSpeak(audioText);
        const sentEl = this.hud.getSentenceElement();
        if (sentEl) sentEl.innerHTML = '';
      } else if (qType === 'type-what-you-hear') {
        this.tapHandle = mountTypeWhatYouHear({
          slot,
          correctAnswer: correctWord,
          prompt: round.question ?? 'Type what you hear',
          onSpeak: () => speak(audioText),
          onComplete: (correct) =>
            this.handleAnswer(correct ? correctIndex : (correctIndex + 1) % 4),
        });
        autoSpeak(audioText);
        const sentEl = this.hud.getSentenceElement();
        if (sentEl) sentEl.innerHTML = '';
      } else if (qType === 'tap-pairs' && round.pairs) {
        this.tapHandle = mountTapPairs({
          slot,
          pairs: round.pairs,
          prompt: round.question ?? 'Tap the pairs',
          onComplete: (correct) =>
            this.handleAnswer(correct ? correctIndex : (correctIndex + 1) % 4),
        });
        const sentEl = this.hud.getSentenceElement();
        if (sentEl) {
          sentEl.innerHTML = `<div style="font-size:13px;font-weight:700;color:#7a6850;text-align:center;">${round.sentence}</div>`;
        }
      }
    }
  }

  private renderHud(): void {
    if (!this.hud) return;
    const total = this.lesson.questions.length;
    const qNum = Math.min(this.questionIdx + 1, total);
    this.hud.render({
      hp: 0,
      hpMax: 0,
      streak: 0,
      currentRound: qNum,
      totalRounds: total,
      scenarioLabel: '',
      sentence: this.lesson.questions[this.questionIdx].sentence,
      timerSeconds: 0,
      timerRatio: 0,
      timerLow: false,
      timerExpired: false,
    });
  }

  private handleAnswer(idx: number): void {
    if (this.locked) return;
    const q = this.lesson.questions[this.questionIdx];
    // Only 4-option types have correctIndex; tap-tiles/tap-pairs go through
    // their own UI which routes to handleAnswer with synthesized indices.
    const correctIndex = (q as any).correctIndex ?? 0;
    const correct = idx === correctIndex;
    this.locked = true;

    this.clozeUI?.revealAnswer(idx, correctIndex, q.explanationZh, correct);

    if (correct) {
      this.mascot?.setAnim('happy');
      this.scheduleAdvance(ADVANCE_CORRECT_MS);
    } else {
      this.mascot?.setAnim('sad');
      // forceCorrectMode: ClozeUI handles blindRetry inline. Player must
      // eventually tap the correct option → fires onForceCorrect.
    }
  }

  private handleForceCorrect(): void {
    this.clozeUI?.acknowledgeForceCorrect();
    this.mascot?.setAnim('happy');
    this.scheduleAdvance(ADVANCE_CORRECT_MS);
  }

  private handleContinue(): void {
    this.cancelAdvanceTimer();
    this.advance();
  }

  private scheduleAdvance(ms: number): void {
    this.cancelAdvanceTimer();
    this.advanceTimer = this.time.delayedCall(ms, () => this.advance());
  }

  private cancelAdvanceTimer(): void {
    if (this.advanceTimer) {
      this.advanceTimer.remove(false);
      this.advanceTimer = undefined;
    }
  }

  private advance(): void {
    this.questionIdx += 1;
    if (this.questionIdx >= this.lesson.questions.length) {
      this.finish();
      return;
    }
    this.renderQuestion(this.lesson.questions[this.questionIdx]);
  }

  private finish(): void {
    markLessonCompleted(this.chapter, this.lesson.id);
    this.cleanupOverlay();
    this.scene.start('StoryModeScene');
  }

  private cleanupOverlay(): void {
    this.cancelAdvanceTimer();
    this.tapHandle?.destroy();
    this.tapHandle = undefined;
    this.clozeUI?.destroy();
    this.clozeUI = undefined;
    this.mascot?.destroy();
    this.mascot = undefined;
    this.hud?.destroy();
    this.hud = undefined;
  }
}
