import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';
import { markLessonCompleted } from '../store/runStore';
import { ClozeUI } from '../ui/ClozeUI';
import { GameHUD } from '../ui/GameHUD';
import { Mascot } from '../ui/Mascot';
import { CHAPTER_META } from '../data/storyKitten';
import { speak, autoSpeak, stopSpeaking, preloadLessonAudio } from '../audio/tts';
import { track, EVENT } from '../analytics/posthog';
import { wireSentenceHints, preloadHints } from '../ui/WordHint';

// v2.0.B.161.8: token wrap helper — every English word becomes a tappable
// .word span so WordHint can show ZH gloss on tap. Per user feedback
// '打完題目後沒有可以點的底線, 不知道中文怎麼辦'. Mirrors GameHUD.ts:765
// pattern. Handles punctuation + preserves whitespace.
function wrapWordsForHint(text: string): string {
  const escape = (s: string) => s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  return String(text || '').split(/(\s+)/).map((tok) => {
    if (!tok) return '';
    if (/^\s+$/.test(tok)) return tok;
    const esc = escape(tok);
    return `<span class="word" data-word="${esc}">${esc}</span>`;
  }).join('');
}
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
// v2.0.B.161.12: 3500 → 3000ms unified. User '每一題完成後跳轉時間要一樣'.
// All Q types now scheduleAdvance(ADVANCE_CORRECT_MS): listen-tf,
// listen-tf-zh, listen-mc/comp (handleAnswer). Narration uses audio onEnd.
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
  // v2.0.B.159: track answer log for completion stat screen + future review
  private lessonAnswerLog: Array<{q: any; userIdx: number; correctIdx: number; isCorrect: boolean}> = [];
  private lessonStartTime = 0;
  // v2.0.B.161.1: cache end time on first stat show — fixes TIME stat
  // recomputing every time user opens review then returns (bug-check P1 #1)
  private lessonEndTime?: number;
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

    // v2.0.B.159: lesson stat tracking + dead-method TS6133 suppress
    this.lessonStartTime = Date.now();
    this.lessonEndTime = undefined;
    this.lessonAnswerLog = [];
    void this._snapshotTf; void this._snapshotTfZh; void this._snapshotAnsweredQ; void this._showCompletionArticle;
    // v2.0.B.161.9: preload WordHint dict ONCE per lesson (was per-narration = redundant)
    try { void preloadHints(); } catch {}
    // v2.0.B.161.23 REVERT B.161.22: preloadLessonAudio 14 MP3 parallel
    // decodeAudioData() = main-thread block, made lesson load 更卡.
    // 用 lazy on-demand: speak() 第一次 call 才 decode 該句, accept
    // 500ms delay on Q1 over freezing whole lesson load.
    // void preloadLessonAudio(...) — removed; keep export for future use.
    // v2.0.B.161.4: PostHog event
    try {
      track(EVENT.LESSON_START, {
        chapter: this.chapter,
        lesson_id: this.lesson.id,
        lesson_in_chapter: this.lesson.lessonInChapter,
        segment_type: this.lesson.segmentType,
        question_count: this.lesson.questions.length,
      });
    } catch {}

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

    // v2.0.B.146: removed B.143 _mountStoryOpener call per user '不能有兩個喇叭'.
    // Opener block was rendering ALONGSIDE Q1 chunk = 2 speakers visible.
    // New flow: narration entry questions[0] IS the opener — single speaker.
    this.renderQuestion(this.lesson.questions[0]);
  }

  /**
   * v2.0.B.143-B.146: _mountStoryOpener DELETED in B.153 (S4). Dead since
   * B.146 removed the call site. ~110 lines bundle waste removed.
   */

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
    // v2.0.B.159: Duolingo Stories character-bubble style per user '背景說明也
    // 要夾雜貓咪頭像說話'. Mascot avatar on LEFT + speech bubble with sentence.
    // No Continue button — 2s auto-advance per '答完兩秒就跳下一題'.
    // v2.0.B.161.8-9: WordHint tap-to-translate. Wrapper class
    // 'pickup-lesson-words' makes dashed underline visible on mobile.
    const wordHtml = wrapWordsForHint(text);
    sentEl.innerHTML = `
      <div class="pickup-lesson-words" style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;">
        <img src="/mascots/calico-anchor.webp" width="44" height="44" alt="" style="flex:0 0 auto;pointer-events:none;border-radius:50%;" />
        <div style="flex:1 1 auto;position:relative;background:#fff7e8;border:2px solid #e7a44a;border-radius:14px;padding:10px 14px;">
          <span style="position:absolute;left:-8px;top:14px;width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:10px solid #e7a44a;"></span>
          <span style="position:absolute;left:-5px;top:15px;width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:9px solid #fff7e8;"></span>
          <button type="button" aria-label="Replay narration" class="pickup-narration-speaker" style="
            float:left;margin-right:8px; width:28px; height:28px; padding:0;
            background:transparent; border:none; cursor:pointer;
            display:inline-flex; align-items:center; justify-content:center;
            touch-action:manipulation; -webkit-tap-highlight-color:transparent;
          ">
            <img src="/mascots/icon-speaker.webp" width="24" height="24" alt="" style="pointer-events:none;" />
          </button>
          <span style="font-size:15px;font-weight:700;color:#3c2a1c;line-height:1.6;">${wordHtml}</span>
        </div>
      </div>
    `;
    // v2.0.B.160: audio-driven advance per agent verdict. Word-count
    // estimation from earlier B.160 fix still left 6.9s MP3s under-timed.
    // Real solution: hook speak()'s onEnd → advance(). Fallback timer at
    // wordCount * 600ms + 2000ms (generous so it only fires if audio fails).
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length || 1;
    const fallbackMs = Math.max(5000, wordCount * 600 + 2000);
    slot.innerHTML = `
      <div style="display:flex;justify-content:flex-end;padding:4px 6px;">
        <button type="button" class="pickup-narration-skip" style="
          background:transparent;border:1px solid #c8a878;color:#8a6a3a;
          font-size:12px;font-weight:600;padding:4px 10px;border-radius:10px;
          cursor:pointer;opacity:0.7;touch-action:manipulation;
          -webkit-tap-highlight-color:transparent;">
          跳過 · Skip ↓
        </button>
      </div>
    `;
    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      try { this._snapshotNarration(q); } catch {}
      this.questionIdx += 1;
      if (this.questionIdx >= this.lesson.questions.length) {
        this.finish();
        return;
      }
      this.renderQuestion(this.lesson.questions[this.questionIdx]);
    };
    const skipBtn = slot.querySelector('.pickup-narration-skip') as HTMLButtonElement | null;
    skipBtn?.addEventListener('click', advance);
    // Hook replay button + auto-play with onEnd → advance
    const spk = sentEl.querySelector('.pickup-narration-speaker') as HTMLButtonElement | null;
    spk?.addEventListener('click', () => { try { speak(text); } catch {} });
    // v2.0.B.161.8: wire WordHint tap-to-translate after DOM mount
    try { wireSentenceHints(sentEl); } catch {}
    try { speak(text, 'en-US', { onEnd: advance }); } catch { advance(); }
    // Fallback in case audio fails / onEnd never fires
    window.setTimeout(advance, fallbackMs);
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

    // v2.0.B.146: English sentence shown IMMEDIATELY + audio auto-plays.
    const enTokens = en.split(/(\s+)/);
    const enWordHtml = enTokens.map(t => {
      if (!t || /^\s+$/.test(t)) return t;
      return `<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${t}</span>`;
    }).join('');
    sentEl.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;margin-bottom:10px;">
        <button type="button" aria-label="Replay sentence" class="pickup-tf-speaker" style="
          flex:0 0 auto; width:40px; height:40px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="36" height="36" alt="" style="pointer-events:none;" />
        </button>
        <div class="pickup-tf-en" style="flex:1 1 auto;font-size:15px;font-weight:700;color:#3c2a1c;line-height:1.6;display:flex;align-items:center;">
          <span>${enWordHtml}</span>
        </div>
      </div>
      <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.5;padding:6px 4px;text-align:center;">
        ${qZh}
      </div>
    `;
    const spk = sentEl.querySelector('.pickup-tf-speaker') as HTMLButtonElement | null;
    spk?.addEventListener('click', () => { try { speak(en); } catch {} });
    // Auto-play English sentence audio on mount
    try { speak(en); } catch {}

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
        // v2.0.B.159: log answer, don't snapshot to DOM (user '閱讀理解題問完就自己刪掉')
        this.lessonAnswerLog.push({ q, userIdx: idx, correctIdx, isCorrect: idx === correctIdx });
        this.scheduleAdvance(ADVANCE_CORRECT_MS);
      });
      slot.appendChild(btn);
    }
  }

  /**
   * v2.0.B.147: English-only true/false (replaces listen-tf-zh).
   * questionEn visible; options ["Yes","No"]; no Chinese.
   */
  private _renderListenTf(q: any): void {
    if (!this.hud) return;
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) return;
    const en = String(q.sentence ?? '');
    const qEn = String(q.questionEn ?? q.question ?? '');
    const opts = (q.options ?? ['Yes', 'No']) as string[];
    const correctIdx = q.correctIndex ?? 0;

    // v2.0.B.161.16: Duolingo Stories-style flow per user spec:
    // - sentence 用空白格子(___)接續故事流, 不顯示英文
    // - 不 auto-speak, user 點喇叭才播 (force engagement)
    // - 答完: questionEn + buttons 消失, sentence 變完整英文 + explanationZh 跳出
    // - 2s 推進 (listen-tf 限定快速)
    // v2.0.B.161.20 Duolingo Stories layout per user screenshot:
    //   '不要喇叭 題目直接播出來 / 題目直接放到文章裡 / 問題才特別顯示'
    //   - sentence 直接 push 進 history archive (跟 narration 同 chat flow)
    //   - 自動播放 combined audio (sentence + question)
    //   - sentEl 只顯示 question prompt 大字粗體 (不要大喇叭 button)
    try { this._snapshotNarration(q); } catch {}
    sentEl.innerHTML = `
      <div class="pickup-lesson-words" style="padding:18px 12px 6px;text-align:center;">
        <div style="font-size:18px;font-weight:900;color:#3c2a1c;line-height:1.5;letter-spacing:0.02em;">
          ${wrapWordsForHint(qEn)}
        </div>
      </div>
    `;
    try { wireSentenceHints(sentEl); } catch {}
    // v2.0.B.161.21: 分開 sentence + question audio chain.
    // B.161.20 用 combined string speak() → audioLookup miss (map keyed on
    // individual sentence/qEn) → fallback WebSpeech 念整段 → 失去 grandma
    // MP3 配音 → user 聽不出有念 sentence (體感「題目沒自動念」).
    // 拆兩段: speak(en) grandma MP3 → onEnd → 400ms gap → speak(qEn) WebSpeech.
    try {
      speak(en, 'en-US', {
        onEnd: () => {
          if (qEn) {
            window.setTimeout(() => { try { speak(qEn); } catch {} }, 400);
          }
        }
      });
    } catch {}

    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));
    for (let i = 0; i < 2; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opts[i] ?? '';
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
        btn.style.background = correct ? '#eaf6d5' : '#fde0d2';
        btn.style.borderColor = correct ? '#7ac74a' : '#c84a3a';
        btn.style.color = correct ? '#5d9a35' : '#a23829';
        this.locked = true;
        this.lessonAnswerLog.push({ q, userIdx: idx, correctIdx, isCorrect: idx === correctIdx });
        // v2.0.B.161.20: sentence 已在 mount 時 _snapshotNarration push 進
        // history archive (chat-flow). Click 時不需重複 push.
        // v2.0.B.161.10: PostHog ANSWER_SUBMIT for listen-tf
        try {
          track(EVENT.ANSWER_SUBMIT, {
            lesson_id: this.lesson.id,
            question_id: q.id,
            question_type: q.type,
            question_idx: this.questionIdx,
            user_answer_idx: idx,
            correct_idx: correctIdx,
            is_correct: idx === correctIdx,
            attempt_number: 1,
          });
        } catch {}
        // v2.0.B.161.20 post-reveal: sentence 已在 history archive (B.161.20
        // pre-mount push), sentEl 只顯示 explanationZh + tap-skip hint.
        // question + buttons 隱藏.
        const explZh = String(q.explanationZh ?? '');
        const escapeHtml = (s: string) => String(s)
          .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        sentEl.innerHTML = explZh ? `
          <div class="pickup-lesson-words" style="padding:14px 12px 6px;">
            <div style="font-size:14px;color:#5a4530;line-height:1.7;padding:12px 14px;background:#fef8ed;border-left:3px solid #c8a878;border-radius:0 10px 10px 0;">
              ${escapeHtml(explZh)}
            </div>
          </div>
        ` : '';
        try { wireSentenceHints(sentEl); } catch {}
        // v2.0.B.161.19 per Duolingo timing agent + user B.159 '按 next 刪掉':
        //   - 答對 2500ms / 答錯 4000ms (Duolingo pattern, 對快錯慢)
        //   - 移除 visible Continue button (對齊 user B.159 + Duolingo 不拖視覺)
        //   - sentEl tap-anywhere-to-skip + subtle hint text
        slot.innerHTML = '';
        // Append subtle skip hint
        const hint = document.createElement('div');
        hint.textContent = '⬇ 點任何地方跳到下一題 · Tap anywhere to skip';
        Object.assign(hint.style, {
          textAlign: 'center',
          fontSize: '11px',
          color: '#8b6f4a',
          padding: '8px 6px',
          opacity: '0.7',
          fontWeight: '600',
        });
        slot.appendChild(hint);
        // Tap-anywhere skip — bind on sentEl AND slot (whole reveal area)
        const tapSkip = () => {
          this.cancelAdvanceTimer();
          this.advance();
        };
        sentEl.style.cursor = 'pointer';
        sentEl.addEventListener('click', (e) => {
          // Don't intercept clicks on .word (WordHint) or speaker button
          const target = e.target as HTMLElement;
          if (target.closest('.word, .pickup-tf-speaker-post, button')) return;
          tapSkip();
        });
        hint.addEventListener('click', tapSkip);
        // v2.0.B.161.21: 對 2500→4000 / 錯 4000→6000ms per user
        // '跳下一題的時間再久一點'. 仍 tap-anywhere-skip 可快轉.
        this.scheduleAdvance(correct ? 4000 : 6000);
      });
      slot.appendChild(btn);
    }
  }

  private _snapshotTf(q: any, userIdx: number, correctIdx: number): void {
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
    // v2.0.B.150: drop green/red highlights per user '不要有綠色答對標註'.
    void userIdx; void correctIdx;
    const card = document.createElement('div');
    Object.assign(card.style, {
      padding: '4px 0',
      fontSize: '14px',
      color: '#5a4530',
      lineHeight: '1.55',
      fontWeight: '500',
    });
    card.textContent = String(q.questionEn ?? '');
    history.appendChild(card);
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
    // v2.0.B.150: plain text per user '不要有框框 嚴格規定跟第二張圖一樣'.
    // v2.0.B.161.11: WordHint tap-translate.
    // v2.0.B.161.20 Duolingo Stories chat-flow per user 5-point spec:
    //   '文章字太小了 / 文章每段旁邊都要有喇叭可以重聽 / 喇叭不要圈圈'
    //   - 字 15→17px / lineHeight 1.55→1.7
    //   - inline 20px 小喇叭 button (no border / no background / no 圈)
    //   - icon-speaker.webp 點 → speak this sentence
    const sentence = String(q.sentence ?? '');
    const card = document.createElement('div');
    card.className = 'pickup-lesson-words';
    Object.assign(card.style, {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '4px 0',
      fontSize: '17px',
      color: '#3c2a1c',
      lineHeight: '1.7',
      fontWeight: '600',
    });
    card.innerHTML = `
      <button type="button" class="pickup-history-speaker" aria-label="Replay this line" style="
        flex:0 0 auto;width:22px;height:22px;padding:0;
        background:transparent;border:none;cursor:pointer;
        display:inline-flex;align-items:center;justify-content:center;
        touch-action:manipulation;-webkit-tap-highlight-color:transparent;
        margin-top:3px;
      ">
        <img src="/mascots/icon-speaker.webp" width="20" height="20" alt="" style="pointer-events:none;opacity:0.7;" />
      </button>
      <span style="flex:1 1 auto;">${wrapWordsForHint(sentence)}</span>
    `;
    history.appendChild(card);
    const spk = card.querySelector('.pickup-history-speaker') as HTMLButtonElement | null;
    spk?.addEventListener('click', () => { try { speak(sentence); } catch {} });
    try { wireSentenceHints(card); } catch {}
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
    // v2.0.B.150: drop green/red highlights per user '不要有綠色答對標註'.
    // Plain text question only. User's correctness not visually re-asserted.
    void userIdx; void correctIdx;
    const card = document.createElement('div');
    Object.assign(card.style, {
      padding: '4px 0',
      fontSize: '14px',
      color: '#5a4530',
      lineHeight: '1.55',
      fontWeight: '500',
    });
    card.textContent = String(q.questionZh ?? '');
    history.appendChild(card);
  }

  // v2.0.B.143: _showVocabPopup DELETED in B.153 (S4). Only caller was
  // _mountStoryOpener which also got deleted. ~35 lines removed.
  // v2.0.B.133-B.142: _mountIntroOverlay DELETED in B.153 (S4). Dead since
  // B.142 removed the call site. ~100 lines bundle waste removed.

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
    if (qType2 === 'narration' || qType2 === 'listen-tf-zh' || qType2 === 'listen-tf') {
      this.renderHud();
      if (qType2 === 'narration') {
        this._renderNarration(q as any);
      } else if (qType2 === 'listen-tf') {
        this._renderListenTf(q as any);
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

    // v2.0.B.153 (S1): UX agent flagged 4/14 mixed UX — listen-mc frozen
    // cards still had green/red colored borders while narration/listen-tf
    // had plain text per B.150. Match B.150 — plain text, no frames,
    // no green ✓, no red ✕. Question only; correctness not visually
    // re-asserted. userIdx/correctIdx unused but kept on signature.
    void isCorrect; void userIdx; void correctIdx; void options; void optionsZh;
    const card = document.createElement('div');
    Object.assign(card.style, {
      padding: '4px 0',
      fontSize: '14px',
      color: '#5a4530',
      lineHeight: '1.55',
      fontWeight: '500',
    });
    // Show only the question text (sentence + question) — reading flow
    // like Duolingo Stories. explanationZh visible inline as note.
    const noteHtml = explanationZh
      ? `<span style="color:#8b6f4a;font-size:12px;margin-left:8px;">— ${explanationZh}</span>`
      : '';
    card.innerHTML = `<span style="color:#3c2a1c;">${sentence}</span> <span style="font-style:italic;">${question}</span>${noteHtml}`;
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
    // v2.0.B.159: log answer instead of DOM snapshot
    this.lessonAnswerLog.push({ q, userIdx: idx, correctIdx: correctIndex, isCorrect: correct });
    // v2.0.B.161.5: PostHog ANSWER_SUBMIT event — core funnel + completion analytics
    try {
      track(EVENT.ANSWER_SUBMIT, {
        lesson_id: this.lesson.id,
        question_id: (q as any).id,
        question_type: (q as any).type,
        question_idx: this.questionIdx,
        user_answer_idx: idx,
        correct_idx: correctIndex,
        is_correct: correct,
        attempt_number: 1,
      });
    } catch {}

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
        // v2.0.B.161.8-9: wrap words + visible-underline class for mobile tap
        sentEl.innerHTML = `<div class="pickup-lesson-words" style="font-size:16px;font-weight:800;color:#3c2a1c;line-height:1.6;padding:6px 4px;text-align:center;">${wrapWordsForHint(fullSentence)}</div>`;
        try { wireSentenceHints(sentEl); } catch {}
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
    // v2.0.B.147: show completion article per user '最後完成一按鈕 是一整片的
    // 文章 而不是夾雜題目跟答案'. Concatenate narration entries into a clean
    // paragraph + Continue button to StoryModeScene.
    try { this._showLessonStats(); } catch {
      // fallback: route immediately
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
    }
  }

  /**
   * v2.0.B.159: Duolingo-style lesson stat screen — replaces article view.
   * Per user '完成後有一個結算畫面 請嚴格參考多鄰國 加這個新功能'.
   * Shows XP earned + accuracy + time + Continue → StoryModeScene.
   * Article view kept as _showCompletionArticle dead method for future
   * lesson-review screen (deferred).
   */
  private _showLessonStats(): void {
    if (!this.hud || !this.lesson) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }

    document.getElementById('pickup-lesson-history')?.remove();
    const mascotSlot = this.hud.mascotSlot();
    if (mascotSlot) mascotSlot.style.display = 'none';

    const total = this.lessonAnswerLog.length;
    const correct = this.lessonAnswerLog.filter(a => a.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    const xpEarned = correct * 10;
    // v2.0.B.161.1: freeze elapsed at first stat-show so Back/review doesn't inflate it
    const firstTime = this.lessonEndTime == null;
    if (firstTime) this.lessonEndTime = Date.now();
    const elapsedMs = (this.lessonEndTime ?? Date.now()) - this.lessonStartTime;
    // v2.0.B.161.4: PostHog LESSON_COMPLETE event (first show only)
    if (firstTime) {
      try {
        track(EVENT.LESSON_COMPLETE, {
          lesson_id: this.lesson.id,
          chapter: this.chapter,
          question_count: total,
          correct_count: correct,
          accuracy,
          xp_earned: xpEarned,
          elapsed_ms: elapsedMs,
          review_opened: false,
        });
      } catch {}
      // v2.0.B.161.6: PostHog STREAK_UPDATE event — fires once on lesson finish
      try {
        const state = useRunStore.getState();
        track(EVENT.STREAK_UPDATE, {
          streak_days: (state as any).dailyStreak ?? (state as any).streak ?? 0,
          event: correct > 0 ? 'gained' : 'no_change',
        });
      } catch {}
    }
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    const timeStr = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;

    sentEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:18px;padding:30px 20px 20px;">
        <div style="font-size:48px;line-height:1;">🎉</div>
        <div style="font-size:22px;font-weight:900;color:#3c2a1c;text-align:center;">Lesson complete!</div>
        <div style="display:flex;gap:10px;width:100%;justify-content:space-between;margin-top:12px;">
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:#fef3c7;border:2px solid #e7a44a;border-bottom:4px solid #b07a2a;border-radius:14px;">
            <div style="font-size:12px;font-weight:800;color:#8b6f4a;letter-spacing:1px;">XP</div>
            <div style="font-size:24px;font-weight:900;color:#b07a2a;">${xpEarned}</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:#eaf6d5;border:2px solid #7ac74a;border-bottom:4px solid #5d9a35;border-radius:14px;">
            <div style="font-size:12px;font-weight:800;color:#5d9a35;letter-spacing:1px;">ACCURACY</div>
            <div style="font-size:24px;font-weight:900;color:#5d9a35;">${accuracy}%</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:#fef8ed;border:2px solid #c8a878;border-bottom:4px solid #8b6f4a;border-radius:14px;">
            <div style="font-size:12px;font-weight:800;color:#8b6f4a;letter-spacing:1px;">TIME</div>
            <div style="font-size:24px;font-weight:900;color:#8b6f4a;">${timeStr}</div>
          </div>
        </div>
      </div>
    `;

    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));

    // v2.0.B.161: Lesson Review screen affordance per user B.159 第 6 條 deferred 指令
    // '多加一個單元回顧 裡面才看得到完整的題目問題答案'. 資料層 lessonAnswerLog 已存。
    const reviewBtn = document.createElement('button');
    reviewBtn.type = 'button';
    reviewBtn.className = 'pickup-stats-review';
    reviewBtn.textContent = '📖 單元回顧 · Review';
    Object.assign(reviewBtn.style, {
      width: '100%',
      padding: '12px 0',
      background: '#fef8ed',
      color: '#8b6f4a',
      border: '2px solid #c8a878',
      borderBottom: '3px solid #8b6f4a',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '800',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      marginTop: '20px',
    });
    reviewBtn.addEventListener('click', () => {
      try { track(EVENT.LESSON_REVIEW_OPEN, { lesson_id: this.lesson.id, trigger: 'stat_screen_button' }); } catch {}
      try { this._showLessonReview(); } catch {
        this.cleanupOverlay();
        this.scene.start('StoryModeScene');
      }
    });
    slot.appendChild(reviewBtn);

    const cont = document.createElement('button');
    cont.type = 'button';
    cont.className = 'pickup-stats-continue';
    cont.textContent = '完成 · Continue →';
    Object.assign(cont.style, {
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
      marginTop: '10px',
    });
    cont.addEventListener('click', () => {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
    });
    slot.appendChild(cont);
  }

  /**
   * v2.0.B.161: Lesson Review screen — list every Q from this lesson with
   * your answer / correct answer / explanation. User B.159 #6 deferred.
   * Data already collected by snapshotTf / TfZh / AnsweredQ pushes into
   * lessonAnswerLog. Back button returns to stat screen.
   */
  private _showLessonReview(): void {
    if (!this.hud || !this.lesson) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }
    const escapeHtml = (s: string) => String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    // v2.0.B.161.1: Player Walkthrough agent P0-1 — Chinese type label
    // (A2 看不懂 raw `narration`/`listen-mc`/`tap-pairs`/`cloze` jargon)
    const typeLabel: Record<string, string> = {
      'narration': '旁白',
      'listen-tf': '聽力對錯',
      'listen-tf-zh': '聽力對錯',
      'listen-mc': '聽力選擇',
      'listen-emoji': '圖示聽力',
      'listen-comprehension': '聽力理解',
      'read-mc-with-audio': '閱讀理解',
      'type-what-you-hear': '聽寫',
      'tap-tiles': '排列句子',
      'tap-pairs': '配對',
    };
    const cards = this.lessonAnswerLog.map((entry, i) => {
      const q = entry.q;
      const tStr = String(q.type ?? '');
      const tCn = typeLabel[tStr] ?? tStr;
      // v2.0.B.161.1: cover schema variants (bug-check P1 #4)
      const sentence = String(q.sentence ?? q.sentenceEn ?? q.text ?? '');
      const question = String(q.questionEn ?? q.questionZh ?? q.question ?? q.prompt ?? '');
      const rawOptions = (q.options ?? q.optionsZh ?? []) as string[];
      const tilesEn = Array.isArray(q.tilesEn) ? q.tilesEn.join(' ') : '';
      const pairsEn = Array.isArray(q.pairsEn) ? q.pairsEn.map((p: unknown) => Array.isArray(p) ? p.join(' = ') : String(p)).join(' / ') : '';
      const isPairsOrTiles = tStr === 'tap-tiles' || tStr === 'tap-pairs' || tStr === 'type-what-you-hear';
      const options = rawOptions;
      const userIdx = entry.userIdx;
      const correctIdx = entry.correctIdx;
      // v2.0.B.161.1: bug-check P1 #2 — split userIdx < 0 case + Walkthrough P0-2
      // tap-pairs/tap-tiles 不適用 4 選 1 模型, 改顯示「✓ 已完成」或結構
      const userAns = isPairsOrTiles
        ? (entry.isCorrect ? '✓ 已完成' : '✕ 未完成')
        : (userIdx < 0
          ? '(已作答)'
          : (options[userIdx] ? escapeHtml(options[userIdx]) : '(已作答)'));
      const correctAns = isPairsOrTiles
        ? (tilesEn ? escapeHtml(tilesEn) : pairsEn ? escapeHtml(pairsEn) : '—')
        : (correctIdx >= 0 && options[correctIdx]
          ? escapeHtml(options[correctIdx])
          : '—');
      const explZh = String(q.explanationZh ?? '');
      const status = entry.isCorrect
        ? '<span style="color:#5d9a35;font-weight:900;">✓ 正確</span>'
        : '<span style="color:#c84a3a;font-weight:900;">✕ 錯了</span>';
      const userRow = entry.isCorrect
        ? ''
        : `<div style="font-size:13px;color:#666;margin-top:4px;">你選: <span style="color:#c84a3a;font-weight:700;">${userAns}</span></div>`;
      // v2.0.B.161.1: Walkthrough P0-3 — 答錯卡左紅條 + 淡紅底, 5 秒掃描可見錯題
      const cardStyle = entry.isCorrect
        ? 'background:#fff;border:1px solid #e0d0b8;'
        : 'background:#fef2f0;border:1px solid #e0d0b8;border-left:4px solid #c84a3a;';
      return `
        <div style="${cardStyle}border-radius:10px;padding:12px 14px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:11px;font-weight:800;color:#8b6f4a;letter-spacing:1px;">Q${i + 1} · ${tCn}</span>
            ${status}
          </div>
          ${sentence ? `<div style="font-size:14px;color:#3c2a1c;font-weight:700;margin-bottom:6px;">${wrapWordsForHint(sentence)}</div>` : ''}
          ${question ? `<div style="font-size:13px;color:#5a4a3a;margin-bottom:6px;">Q: ${wrapWordsForHint(question)}</div>` : ''}
          ${userRow}
          <div style="font-size:13px;color:#3c2a1c;margin-top:4px;">正解: <span style="color:#5d9a35;font-weight:800;">${correctAns}</span></div>
          ${explZh ? `<div style="font-size:13px;color:#8b6f4a;background:#fef8ed;border-left:3px solid #c8a878;padding:7px 10px;margin-top:8px;border-radius:0 6px 6px 0;line-height:1.6;">${escapeHtml(explZh)}</div>` : ''}
        </div>
      `;
    }).join('');
    // v2.0.B.161.1: Walkthrough P2-7 — 結尾提示「全部回顧完畢」
    const total = this.lessonAnswerLog.length;
    const endNote = total > 0
      ? `<div style="text-align:center;color:#8b6f4a;padding:12px;font-size:12px;letter-spacing:1px;">— 本單元 ${total} 題回顧完畢 —</div>`
      : '';

    sentEl.innerHTML = `
      <div class="pickup-lesson-words" style="padding:14px 6px 8px;">
        <div style="text-align:center;font-size:18px;font-weight:900;color:#3c2a1c;margin-bottom:14px;">
          📖 單元回顧 · Lesson Review
        </div>
        <div style="max-height:60vh;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:0 4px;">
          ${cards || '<div style="text-align:center;color:#8b6f4a;padding:20px;">本單元沒有作答記錄。</div>'}
          ${endNote}
        </div>
      </div>
    `;

    // v2.0.B.161.8-9: wire WordHint for all .word spans in review cards.
    // preloadHints removed (already triggered in _mountLessonUI once).
    try { wireSentenceHints(sentEl); } catch {}

    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'pickup-review-back';
    back.textContent = '← 回結算 · Back';
    Object.assign(back.style, {
      width: '100%',
      padding: '14px 0',
      background: '#7ac74a',
      color: '#ffffff',
      border: 'none',
      borderBottom: '4px solid #5d9a35',
      borderRadius: '14px',
      fontSize: '16px',
      fontWeight: '900',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      marginTop: '10px',
    });
    back.addEventListener('click', () => {
      try { this._showLessonStats(); } catch {
        this.cleanupOverlay();
        this.scene.start('StoryModeScene');
      }
    });
    slot.appendChild(back);
  }

  private _showCompletionArticle(): void {
    if (!this.hud || !this.lesson) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }
    const sentEl = this.hud.getSentenceElement();
    const slot = this.hud.buttonsSlot();
    if (!sentEl || !slot) {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
      return;
    }

    // Concatenate all narration sentences into a clean paragraph.
    const narrationSentences = this.lesson.questions
      .filter((q: any) => q.type === 'narration')
      .map((q: any) => String(q.sentence ?? ''))
      .filter(Boolean);
    const articleText = narrationSentences.join(' ');

    // Clear history (we don't want Q/A clutter on completion)
    document.getElementById('pickup-lesson-history')?.remove();

    // Hide HUD mascot slot for clean view
    const mascotSlot = this.hud.mascotSlot();
    if (mascotSlot) mascotSlot.style.display = 'none';

    // Render article in sentEl
    const tokens = articleText.split(/(\s+)/);
    const wordHtml = tokens.map(t => {
      if (!t || /^\s+$/.test(t)) return t;
      return `<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${t}</span>`;
    }).join('');
    sentEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px 12px;">
        <div style="font-size:13px;font-weight:800;color:#b07a2a;letter-spacing:1.5px;text-align:center;">THE STORY</div>
        <div style="font-size:16px;font-weight:600;color:#3c2a1c;line-height:1.8;text-align:left;">
          ${wordHtml}
        </div>
        <button type="button" aria-label="Replay story" class="pickup-article-speaker" style="
          align-self:center; width:48px; height:48px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="44" height="44" alt="" style="pointer-events:none;" />
        </button>
      </div>
    `;
    const spk = sentEl.querySelector('.pickup-article-speaker') as HTMLButtonElement | null;
    spk?.addEventListener('click', () => { try { speak(articleText); } catch {} });
    // Auto-play article on completion
    try { speak(articleText); } catch {}

    // Continue → StoryModeScene
    slot.innerHTML = '';
    Array.from(slot.children).forEach((c) => ((c as HTMLElement).style.display = 'none'));
    const cont = document.createElement('button');
    cont.type = 'button';
    cont.className = 'pickup-article-continue';
    cont.textContent = '完成 · Done';
    Object.assign(cont.style, {
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
      marginTop: '12px',
    });
    cont.addEventListener('click', () => {
      this.cleanupOverlay();
      this.scene.start('StoryModeScene');
    });
    slot.appendChild(cont);
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
