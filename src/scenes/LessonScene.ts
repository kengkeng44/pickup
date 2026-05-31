import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';
import { markLessonCompleted } from '../store/runStore';
import { ClozeUI } from '../ui/ClozeUI';
import { GameHUD } from '../ui/GameHUD';
import { Mascot } from '../ui/Mascot';
import { CHAPTER_META } from '../data/storyKitten';
import { speak, autoSpeak, stopSpeaking } from '../audio/tts';
import { startBgm } from '../audio/bgm';
import { sfxCorrect, sfxWrong } from '../audio/sfx';
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

// v2.0.B.126: 1400ms → 3000ms. User: '打對後跳出下一題的時間可以再長一點'.
// Reveal panel now shows Q + correct A + Zh explanation (B.125), needs more time
// to read. A2 learner average Chinese-reading speed ~3-4 chars/sec; explanationZh
// is typically 12-20 chars + Q line + A line = ~25-40 chars total → ~3s comfort.
const ADVANCE_CORRECT_MS = 3_000;

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
// v2.0.B.139: SPEECH_RATE_SENTENCE removed — speak() in tts.ts owns the rate
// internally (MP3 plays at recorded speed, WebSpeech fallback uses tts.ts default).
// LessonScene no longer constructs raw SpeechSynthesisUtterance anywhere.

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

    // v2.0.B.128: BGM not wired into v2.0 LessonScene previously (PlayScene
    // had it at line 703 but new scene path missed it). User: '沒有背景音樂'.
    // startBgm is idempotent + race-safe; safe to call every lesson mount.
    // On iOS first call may no-op until first user gesture unlocks the
    // AudioContext, but subsequent mounts (post-unlock) will play.
    try { startBgm(); } catch {}

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

    // v2.0.B.143: story opener (Duolingo-radio-mode) per user '先一兩句話馬上
    // 帶玩家進入情緒跟狀況 然後在情節裡面穿插問題 參考多鄰國的電台模式'.
    // Render 1-2 short English sentences above Q1; each content word tappable
    // → popup ZH + POS from openerVocab. Audio auto-plays on mount.
    // _mountIntroOverlay kept for back-compat (deprecated).
    void this._mountIntroOverlay; // suppress TS6133
    const lessonOpener = (this.lesson as any).intro?.en as string | undefined;
    const openerVocab = (this.lesson as any).openerVocab as Record<string, {zh: string; pos: string}> | undefined;
    if (lessonOpener) {
      this._mountStoryOpener(lessonOpener, openerVocab);
    }
    this.renderQuestion(this.lesson.questions[0]);
  }

  /**
   * v2.0.B.143: story opener block — 1-2 English sentences with tappable words.
   * Inserts ABOVE the sentence card. Speaker icon + auto-play on first mount.
   * Word taps show vocab popup with ZH + POS from lesson.openerVocab map.
   */
  private _mountStoryOpener(text: string, vocab?: Record<string, {zh: string; pos: string}>): void {
    if (!this.hud) return;
    const sentEl = this.hud.getSentenceElement();
    const rootEl = sentEl?.parentElement?.parentElement;
    if (!rootEl || !sentEl) return;

    // Tear down any prior opener block (re-mount safe)
    document.getElementById('pickup-lesson-opener')?.remove();

    const opener = document.createElement('div');
    opener.id = 'pickup-lesson-opener';
    Object.assign(opener.style, {
      background: 'rgba(231,164,74,0.08)',
      borderRadius: '14px',
      padding: '12px 14px',
      margin: '0 0 12px 0',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      width: '100%',
      boxSizing: 'border-box',
    });

    const speaker = document.createElement('button');
    speaker.type = 'button';
    speaker.setAttribute('aria-label', 'Replay opener');
    Object.assign(speaker.style, {
      flex: '0 0 auto',
      width: '36px',
      height: '36px',
      padding: '0',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    });
    speaker.innerHTML = '<img src="/mascots/icon-speaker.webp" width="34" height="34" alt="" style="pointer-events:none;"/>';
    speaker.addEventListener('click', () => { try { speak(text); } catch {} });

    const textBox = document.createElement('div');
    Object.assign(textBox.style, {
      flex: '1 1 auto',
      fontSize: '15px',
      fontWeight: '700',
      color: '#3c2a1c',
      lineHeight: '1.55',
      letterSpacing: '0.2px',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
    });

    // v2.0.B.144: Duolingo radio mode — text HIDDEN on mount, revealed on
    // speaker tap. User: '一進去不會有任何字 就算是劇情也要點了才顯現出來'.
    // Initially show muted dashed shape only (word-count hint without revealing).
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    textBox.innerHTML = `<span style="color:#b07a2a;font-style:italic;opacity:0.5;">${'· '.repeat(Math.min(wordCount * 2, 18)).trim()}</span>`;
    let revealed = false;

    const renderTokens = (): void => {
      textBox.innerHTML = '';
      const tokens = text.split(/(\s+)/);
      tokens.forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) {
          textBox.appendChild(document.createTextNode(tok));
          return;
        }
        const clean = tok.replace(/[.,!?;:'"()]/g, '');
        const lookup = vocab?.[clean] ?? vocab?.[clean.toLowerCase()];
        if (lookup && lookup.zh) {
          const span = document.createElement('span');
          span.textContent = tok;
          Object.assign(span.style, {
            borderBottom: '1px dashed #b07a2a',
            cursor: 'pointer',
            padding: '0 1px',
          });
          span.addEventListener('click', (e) => {
            e.preventDefault();
            this._showVocabPopup(lookup.zh, lookup.pos);
          });
          textBox.appendChild(span);
        } else {
          textBox.appendChild(document.createTextNode(tok));
        }
      });
    };

    speaker.addEventListener('click', () => {
      if (!revealed) {
        renderTokens();
        revealed = true;
      }
      try { speak(text); } catch {}
    });

    opener.appendChild(speaker);
    opener.appendChild(textBox);
    rootEl.insertBefore(opener, sentEl.parentElement!);
    // v2.0.B.144: NO auto-play — text-and-audio gated by user tap per spec.
  }

  /**
   * v2.0.B.145: narration chunk — story sentence rendering. No answer.
   * Speaker + tap-to-reveal English text (same UX as B.144 opener).
   * "繼續 ↓ Continue" button advances to next entry.
   */
  private _renderNarration(q: any): void {
    if (!this.hud) return;
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) return;
    const text = String(q.sentence ?? '');
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    sentEl.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;background:rgba(231,164,74,0.06);border-radius:12px;">
        <button type="button" aria-label="Play narration" class="pickup-narration-speaker" style="
          flex:0 0 auto; width:44px; height:44px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
          touch-action:manipulation; -webkit-tap-highlight-color:transparent;
        ">
          <img src="/mascots/icon-speaker.webp" width="40" height="40" alt="" style="pointer-events:none;" />
        </button>
        <div class="pickup-narration-text" style="flex:1 1 auto;font-size:16px;font-weight:700;color:#3c2a1c;line-height:1.55;letter-spacing:0.2px;min-height:40px;display:flex;align-items:center;">
          <span style="color:#b07a2a;font-style:italic;opacity:0.5;">${'· '.repeat(Math.min(wordCount * 2, 22)).trim()}</span>
        </div>
      </div>
    `;
    let revealed = false;
    const spk = sentEl.querySelector('.pickup-narration-speaker') as HTMLButtonElement | null;
    const txtEl = sentEl.querySelector('.pickup-narration-text') as HTMLElement | null;
    spk?.addEventListener('click', () => {
      if (!revealed && txtEl) {
        txtEl.textContent = text;
        revealed = true;
      }
      try { speak(text); } catch {}
    });

    // "Continue" button advances to next entry — no answer required.
    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));
    const cont = document.createElement('button');
    cont.type = 'button';
    cont.className = 'pickup-narration-continue';
    cont.textContent = '繼續 ↓ Continue';
    Object.assign(cont.style, {
      width: '100%',
      padding: '14px 0',
      background: '#7ac74a',
      color: '#ffffff',
      border: 'none',
      borderBottom: '4px solid #5d9a35',
      borderRadius: '14px',
      fontSize: '16px',
      fontWeight: '900',
      letterSpacing: '1px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    });
    cont.addEventListener('click', () => {
      // Snapshot narration to history then advance (no correct/wrong)
      try { this._snapshotNarration(q); } catch {}
      cont.remove();
      this.questionIdx += 1;
      if (this.questionIdx >= this.lesson.questions.length) {
        this.finish();
        return;
      }
      this.renderQuestion(this.lesson.questions[this.questionIdx]);
    });
    slot.appendChild(cont);
  }

  /**
   * v2.0.B.145: 中文 對/錯 comprehension Q. questionZh + 2 Chinese buttons.
   * No blind ABCD pill — Chinese visible per Duolingo Stories carve-out.
   */
  private _renderListenTfZh(q: any): void {
    if (!this.hud) return;
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) return;
    const en = String(q.sentence ?? '');
    const qZh = String(q.questionZh ?? '');
    const optsZh = (q.optionsZh ?? ['對,是這樣的', '不,不是這樣']) as string[];
    const correctIdx = q.correctIndex ?? 0;

    sentEl.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;background:rgba(231,164,74,0.06);border-radius:12px;margin-bottom:10px;">
        <button type="button" aria-label="Replay sentence" class="pickup-tf-speaker" style="
          flex:0 0 auto; width:40px; height:40px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="36" height="36" alt="" style="pointer-events:none;" />
        </button>
        <div class="pickup-tf-en" style="flex:1 1 auto;font-size:14px;font-weight:700;color:#b07a2a;font-style:italic;opacity:0.5;display:flex;align-items:center;">
          <span>${'· '.repeat(12).trim()}</span>
        </div>
      </div>
      <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.5;padding:6px 4px;text-align:center;">
        ${qZh}
      </div>
    `;
    let revealed = false;
    const spk = sentEl.querySelector('.pickup-tf-speaker') as HTMLButtonElement | null;
    const enEl = sentEl.querySelector('.pickup-tf-en') as HTMLElement | null;
    spk?.addEventListener('click', () => {
      if (!revealed && enEl) {
        enEl.innerHTML = `<span style="color:#3c2a1c;font-style:normal;opacity:1;">${en}</span>`;
        revealed = true;
      }
      try { speak(en); } catch {}
    });

    // 2 Chinese buttons 對 / 不對
    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));
    for (let i = 0; i < 2; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = optsZh[i] ?? '';
      Object.assign(btn.style, {
        width: '100%',
        padding: '14px 16px',
        background: '#ffffff',
        color: '#3c2a1c',
        border: '2px solid #c8a878',
        borderBottom: '4px solid #b07a2a',
        borderRadius: '14px',
        fontSize: '16px',
        fontWeight: '800',
        cursor: 'pointer',
        fontFamily: 'inherit',
        marginBottom: '8px',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      });
      const idx = i;
      btn.addEventListener('click', () => {
        if (this.locked) return;
        const correct = idx === correctIdx;
        try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
        // Mark + reveal
        btn.style.background = correct ? '#eaf6d5' : '#fde0d2';
        btn.style.borderColor = correct ? '#7ac74a' : '#c84a3a';
        btn.style.color = correct ? '#5d9a35' : '#a23829';
        this.locked = true;
        try { this._snapshotTfZh(q, idx, correctIdx); } catch {}
        this.scheduleAdvance(2000);
      });
      slot.appendChild(btn);
    }
  }

  private _snapshotNarration(q: any): void {
    const sentEl = this.hud?.getSentenceElement();
    const rootEl = sentEl?.parentElement?.parentElement;
    if (!rootEl || !sentEl) return;
    let history = document.getElementById('pickup-lesson-history');
    if (!history) {
      history = document.createElement('div');
      history.id = 'pickup-lesson-history';
      Object.assign(history.style, { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', width: '100%' });
      rootEl.insertBefore(history, sentEl.parentElement!);
    }
    const card = document.createElement('div');
    Object.assign(card.style, {
      background: 'rgba(231,164,74,0.08)',
      border: '1px solid rgba(231,164,74,0.25)',
      borderRadius: '12px',
      padding: '8px 12px',
      fontSize: '13px',
      color: '#5a4530',
      opacity: '0.88',
    });
    card.textContent = String(q.sentence ?? '');
    history.appendChild(card);
  }

  private _snapshotTfZh(q: any, userIdx: number, correctIdx: number): void {
    const sentEl = this.hud?.getSentenceElement();
    const rootEl = sentEl?.parentElement?.parentElement;
    if (!rootEl || !sentEl) return;
    let history = document.getElementById('pickup-lesson-history');
    if (!history) {
      history = document.createElement('div');
      history.id = 'pickup-lesson-history';
      Object.assign(history.style, { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', width: '100%' });
      rootEl.insertBefore(history, sentEl.parentElement!);
    }
    const isCorrect = userIdx === correctIdx;
    const card = document.createElement('div');
    Object.assign(card.style, {
      background: isCorrect ? '#eaf6d5' : '#fde0d2',
      border: `2px solid ${isCorrect ? '#7ac74a' : '#c84a3a'}`,
      borderRadius: '12px',
      padding: '8px 12px',
      fontSize: '13px',
      opacity: '0.92',
    });
    card.innerHTML = `<div style="color:${isCorrect ? '#5d9a35' : '#a23829'};font-weight:800;">${isCorrect ? '✓' : '✕'} ${String(q.questionZh ?? '')}</div>`;
    history.appendChild(card);
  }

  private _showVocabPopup(zh: string, pos: string): void {
    let pop = document.getElementById('pickup-vocab-popup') as HTMLDivElement | null;
    if (!pop) {
      pop = document.createElement('div');
      pop.id = 'pickup-vocab-popup';
      Object.assign(pop.style, {
        position: 'fixed',
        bottom: '38%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#3c2a1c',
        color: '#ffffff',
        padding: '12px 22px',
        borderRadius: '14px',
        fontSize: '16px',
        fontWeight: '800',
        zIndex: '9999',
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        opacity: '0',
        transition: 'opacity 180ms ease',
        pointerEvents: 'none',
        maxWidth: '85vw',
        textAlign: 'center',
      });
      document.body.appendChild(pop);
    }
    pop.innerHTML = `<span>${zh}</span><span style="color:#e7a44a;font-size:13px;font-weight:700;margin-left:10px;">${pos}</span>`;
    pop.style.opacity = '1';
    pop.style.display = 'block';
    const popRef = pop;
    window.clearTimeout((popRef as any)._timer);
    (popRef as any)._timer = window.setTimeout(() => {
      popRef.style.opacity = '0';
    }, 2400);
  }

  private _mountIntroOverlay(_intro: { en: string; zh: string }): void {
    // v2.0.B.135: per user — kill duplicate HUD mascot (top), use English-only
    // title (storyBeat 是中文 = 違反「中文永不顯示 pre-reveal」rule), make
    // preview rows tappable (audio + reveal sentence text inline).
    void _intro;

    const slot = this.hud?.buttonsSlot();
    const sentEl = this.hud?.getSentenceElement();
    if (!slot || !sentEl || !this.lesson) {
      this.renderQuestion(this.lesson!.questions[0]);
      return;
    }

    // Hide HUD mascot during intro (duplicate visual with overlay mascot).
    const hudMascotSlot = this.hud?.mascotSlot();
    if (hudMascotSlot) hudMascotSlot.style.display = 'none';

    const ch = CHAPTER_META[this.chapter as ChapterId];
    const lessonNum = this.lesson.lessonInChapter;
    // English-only title per pre-reveal Chinese ban (no storyBeat — that's Chinese).
    const lessonTitle = ch.titleEn;

    // Sentence preview rows (first 4 Qs) — tappable: speak audio + reveal text.
    const previewRows = this.lesson.questions.slice(0, 4).map((q, idx) => {
      const sentence = String((q as any).sentence ?? '');
      const wordCount = sentence.split(/\s+/).filter(Boolean).length;
      const dashLen = Math.min(Math.max(wordCount * 18, 60), 240);
      return `<button type="button" class="pickup-intro-preview-row" data-idx="${idx}" data-sentence="${sentence.replace(/"/g, '&quot;')}" style="display:flex;align-items:center;gap:10px;padding:6px 4px;background:transparent;border:none;cursor:pointer;width:100%;text-align:left;touch-action:manipulation;-webkit-tap-highlight-color:transparent;">
        <img src="/mascots/calico-anchor.webp" width="32" height="32" alt="" style="pointer-events:none;flex:0 0 auto;" />
        <span class="pickup-intro-preview-text" style="flex:1 1 auto;font-size:14px;font-weight:700;color:#3c2a1c;">
          <span class="pickup-intro-dash" style="display:inline-block;width:${dashLen}px;height:6px;border-bottom:3px dashed #c8a878;vertical-align:middle;"></span>
        </span>
      </button>`;
    }).join('');

    sentEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 8px;">
        <div style="font-size:14px;font-weight:800;color:#b07a2a;letter-spacing:1.5px;">Lesson ${lessonNum}</div>
        <div style="font-size:24px;font-weight:900;color:#3c2a1c;line-height:1.25;text-align:center;">${lessonTitle}</div>
        <img src="/mascots/calico-anchor.webp" width="160" height="160" alt="" style="pointer-events:none;margin:6px 0 2px;" />
        <div style="width:100%;display:flex;flex-direction:column;gap:2px;margin-top:6px;">${previewRows}</div>
      </div>
    `;

    // v2.0.B.135: wire preview-row taps — speak sentence + reveal text in row.
    sentEl.querySelectorAll('.pickup-intro-preview-row').forEach((rowEl) => {
      const btn = rowEl as HTMLButtonElement;
      const sentence = btn.getAttribute('data-sentence') ?? '';
      btn.addEventListener('click', () => {
        // Reveal text (replace dashed underline with real sentence).
        const textSpan = btn.querySelector('.pickup-intro-preview-text') as HTMLElement | null;
        if (textSpan) {
          textSpan.innerHTML = sentence;
        }
        // v2.0.B.137 bug-check #3: route via tts.ts speak() instead of bypassing
        // pipeline — stopSpeaking + cancel + cache discipline lives in speak().
        speak(sentence);
      });
    });

    // Hide ClozeUI's 4 buttons; show Next button.
    const existingChildren = Array.from(slot.children) as HTMLElement[];
    existingChildren.forEach((c) => { c.style.display = 'none'; });
    const next = document.createElement('button');
    next.type = 'button';
    next.id = 'pickup-intro-begin';
    next.textContent = '下一步 · Next →';
    Object.assign(next.style, {
      width: '100%',
      padding: '16px 0',
      background: '#7ac74a',
      color: '#ffffff',
      border: 'none',
      borderBottom: '4px solid #5d9a35',
      borderRadius: '14px',
      fontSize: '17px',
      fontWeight: '900',
      letterSpacing: '1px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    });
    next.addEventListener('click', () => {
      next.remove();
      existingChildren.forEach((c) => { c.style.display = ''; });
      // v2.0.B.135: restore HUD mascot after intro dismissed
      const hudMascot = this.hud?.mascotSlot();
      if (hudMascot) hudMascot.style.display = '';
      this.renderQuestion(this.lesson!.questions[0]);
      // v2.0.B.140: auto-play Q1 sentence — synchronous inside Next click
      // handler so iOS Safari gesture token is still valid for Web Audio.
      // Per WebSearch + audio-debug agent: gesture chain survives sync calls.
      // User: '沒辦法自動播放' — this restores auto-speak the safe way.
      try {
        const firstQ = this.lesson!.questions[0] as any;
        const firstSentence = String(firstQ.sentence ?? '');
        if (firstSentence) speak(firstSentence);
      } catch {}
    });
    slot.appendChild(next);
  }

  private renderQuestion(q: Question): void {
    this.locked = false;
    this.cancelAdvanceTimer();

    // v2.0.B.130 + B.139.1: kill in-flight audio from prior Q (BOTH WebSpeech
    // AND Web Audio MP3 path). B.139 routes Q1 via speak() → MP3; if we only
    // cancel WebSpeech, the grandma MP3 bleeds into Qn+1. Bug-check agent
    // caught this gap. Use stopSpeaking() from tts.ts which handles both layers.
    try { stopSpeaking(); } catch {}

    // Tear down any prior tap UI from the previous question — symmetric
    // with PlayScene.ts:475-476.
    this.tapHandle?.destroy();
    this.tapHandle = undefined;

    // v2.0.B.145: dispatch new Duolingo Stories types FIRST — they bypass
    // ClozeUI entirely (narration has no answer; listen-tf-zh has 2 options
    // not 4, which would crash ClozeUI.syncFromState).
    const qType2 = (q as any).type;
    if (qType2 === 'narration' || qType2 === 'listen-tf-zh') {
      this.renderHud();
      if (qType2 === 'narration') {
        this._renderNarration(q as any);
      } else {
        this._renderListenTfZh(q as any);
      }
      return;
    }

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
    // v2.0.B.127: extended to type-what-you-hear — same blind rule, prompt heard not seen.
    // Mirrors PlayScene's useListeningUI block — sentence is replaced by N
    // underline word-blanks, speaker tap plays sentence + question via Web Speech.
    // Per user: 文字應該都是隱形的.
    if (
      this.hud &&
      (qType === 'listen-mc' || qType === 'listen-comprehension' || qType === 'type-what-you-hear' || qType === 'listen-emoji')
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
        // v2.0.B.142: REVERT B.141 visible question prompt per user '答案應該
        // 是空白的 要用講的 跟之前模式一樣'. Pre-reveal sentence card = speaker
        // icon + word-blank shapes only. Question prompt heard via audio queue.
        sentEl.innerHTML = `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 4px;">
            <button type="button" aria-label="Replay audio" class="pickup-listen-speaker pickup-speaker-pulse" style="
              flex:0 0 auto; width:44px; height:44px; padding:0;
              background:transparent; border:none; cursor:pointer;
              display:inline-flex; align-items:center; justify-content:center;
              touch-action:manipulation; -webkit-tap-highlight-color:transparent;
            ">
              <img src="/mascots/icon-speaker.webp" width="40" height="40" alt="" style="pointer-events:none;" />
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
        // v2.0.B.139: root cause from audio-text agent — Q1 speakerQueue bypassed
        // tts.ts speak() MP3 lookup, going straight to raw SpeechSynthesisUtterance.
        // Result: intro preview plays MP3 grandma voice; Q1 plays robot WebSpeech +
        // possibly truncates mid-stream at first period (iOS WebKit bugs 230106/209294).
        // User: '第一句就不一樣了'.
        //
        // Fix: route through speak() → MP3 path → grandma voice (same as preview).
        // Q + ABCD WebSpeech readout (B.119) temporarily removed to ensure
        // audio-text consistency. Re-add later via tts.ts onended hook OR second-tap.
        // Tracked: docs/superpowers/_next-plans.md or B.140 follow-up.
        void optionsText;
        const speakQueue = (): void => {
          speak(sentenceText);
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
        // v2.0.B.127: do NOT clear sentEl — B.118 blind-listening block above
        // already rendered word-blanks + speaker queue. Wiping it here breaks that.
        // No autoSpeak — user must tap the speaker (B.30: iOS rejects auto-play).
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

  private _snapshotAnsweredQ(q: Question, userIdx: number, correctIdx: number): void {
    if (!this.hud) return;
    const sentEl = this.hud.getSentenceElement();
    if (!sentEl) return;
    const rootEl = sentEl.parentElement?.parentElement;
    if (!rootEl) return;

    let history = document.getElementById('pickup-lesson-history');
    if (!history) {
      history = document.createElement('div');
      history.id = 'pickup-lesson-history';
      Object.assign(history.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '12px',
        width: '100%',
      });
      rootEl.insertBefore(history, sentEl.parentElement!);
    }

    const isCorrect = userIdx === correctIdx;
    const sentence = String((q as any).sentence ?? '');
    const question = String((q as any).question ?? '');
    const options = ((q as any).options as string[]) ?? [];
    const optionsZh = (q as any).optionsZh as string[] | undefined;
    const explanationZh = String((q as any).explanationZh ?? '');

    const card = document.createElement('div');
    card.className = 'pickup-frozen-q-card';
    Object.assign(card.style, {
      background: isCorrect ? '#eaf6d5' : '#fde0d2',
      border: `2px solid ${isCorrect ? '#7ac74a' : '#c84a3a'}`,
      borderRadius: '12px',
      padding: '10px 12px',
      fontSize: '13px',
      lineHeight: '1.5',
      opacity: '0.92',
    });
    const optionRows = options.map((o, i) => {
      const zh = optionsZh?.[i] ?? '';
      const isC = i === correctIdx;
      const isU = i === userIdx;
      const mark = isC ? '✓' : isU ? '✕' : '';
      const bg = isC ? '#7ac74a33' : isU ? '#c84a3a33' : 'transparent';
      const fontW = isC || isU ? '800' : '500';
      return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;background:${bg};padding:2px 6px;border-radius:4px;font-weight:${fontW};">
        <span style="color:#3c2a1c;"><span style="display:inline-block;width:16px;color:#8b6f4a;">${'ABCD'[i]}</span>${o}</span>
        <span style="color:#7a6850;font-size:12px;">${zh} ${mark}</span>
      </div>`;
    }).join('');
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
        <span style="font-weight:800;color:${isCorrect ? '#5d9a35' : '#a23829'};">Q${this.questionIdx + 1} ${isCorrect ? '✓' : '✕'}</span>
        <span style="color:#8b6f4a;font-size:11px;">${isCorrect ? 'Correct' : 'See answer'}</span>
      </div>
      <div style="color:#3c2a1c;margin-bottom:4px;">${sentence}</div>
      <div style="color:#5a4530;font-style:italic;margin-bottom:6px;">${question}</div>
      <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:6px;">${optionRows}</div>
      ${explanationZh ? `<div style="color:#5a4530;font-size:12px;border-top:1px dashed #c8a878;padding-top:5px;">${explanationZh}</div>` : ''}
    `;
    history.appendChild(card);
  }

  private handleAnswer(idx: number): void {
    if (this.locked) return;
    const q = this.lesson.questions[this.questionIdx];
    // Only 4-option types have correctIndex; tap-tiles/tap-pairs go through
    // their own UI which routes to handleAnswer with synthesized indices.
    const correctIndex = (q as any).correctIndex ?? 0;
    const correct = idx === correctIndex;
    this.locked = true;

    // v2.0.B.128: SFX on commit (user reported missing correct/wrong audio cues)
    try {
      if (correct) sfxCorrect();
      else sfxWrong();
    } catch {}

    // v2.0.B.144: RESTORE B.136 frozen Q snapshot per user latest direction
    // '是要往下! 請嚴格參考多鄰國電台模式'. Duolingo Podcasts scroll log: past
    // chunks stay above, new chunks append below. _snapshotAnsweredQ appends
    // the answered card to #pickup-lesson-history container.
    this._snapshotAnsweredQ(q, idx, correctIndex);

    // v2.0.B.125: also reveal the sentence + question prompt for blind-listen Qs.
    // Sentence card was showing underline blanks; replace with real text so user
    // can read what they just heard. Prepend question + sentence to explanationZh
    // so the reveal panel surfaces all 3 (question / sentence / Zh explanation).
    const qType = (q as any).type;
    const isBlindListen = qType === 'listen-mc' || qType === 'listen-comprehension';
    if (isBlindListen && this.hud) {
      const sentEl = this.hud.getSentenceElement();
      const correctWord = (q as any).options?.[correctIndex] ?? '';
      const fullSentence = String((q as any).sentence ?? '').replace(/_{2,}/g, correctWord);
      if (sentEl) {
        sentEl.innerHTML = `<div style="font-size:16px;font-weight:800;color:#3c2a1c;line-height:1.6;padding:6px 4px;text-align:center;">${fullSentence}</div>`;
      }
    }
    const revealText = isBlindListen
      ? `Q: ${(q as any).question ?? ''}\nA: ${(q as any).options?.[correctIndex] ?? ''}\n\n${q.explanationZh}`
      : q.explanationZh;

    this.clozeUI?.revealAnswer(idx, correctIndex, revealText, correct);

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
    // v2.0.B.137 + B.139.1 bug-check: stop ALL audio paths on scene exit.
    // B.137 only canceled WebSpeech; B.139 added MP3 path so stopSpeaking()
    // (from tts.ts) is the correct one-call cleanup that handles both.
    try { stopSpeaking(); } catch {}
    this.cancelAdvanceTimer();
    this.tapHandle?.destroy();
    this.tapHandle = undefined;
    this.clozeUI?.destroy();
    this.clozeUI = undefined;
    this.mascot?.destroy();
    this.mascot = undefined;
    this.hud?.destroy();
    this.hud = undefined;
    // Clean up lesson history container too
    document.getElementById('pickup-lesson-history')?.remove();
  }
}
