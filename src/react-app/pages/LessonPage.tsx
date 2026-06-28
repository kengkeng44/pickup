/**
 * v2.0.B.167 Phase 3a — LessonPage refactored to renderer registry.
 *
 * Dispatches via RENDERERS[q.type] from src/react-app/renderers.tsx.
 * Wires lesson completion: markLessonCompleted + PostHog events +
 * navigate back to map.
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isMuted, toggleMuted, subscribeMuteChange } from '../../data/muteSetting';
import { markLessonCompleted, readCompletedLessons } from '../../store/runStore';
import { isBackendLive, serverCompleteLesson } from '../../data/backend';
import { addXp, lessonXp } from '../../data/xp';
import { addCoins } from '../../data/coins';
import { updateStreak, type StreakUpdateResult } from '../../data/streak';
import { setRunComprehensionOverride } from '../../data/comprehensionMode';
import { isReviewableType, mistakeKey, addChapterMistake, readChapterMistakes, clearChapterMistakes, buildReviewRound, type ReviewQuestion } from '../../data/mistakes';
// v2.0.B.283 Mochi Bond: award +10 per lesson completion.
// Parent Corner: log learning history for parent-facing stats.
import { logLesson } from '../../data/learnLog';
// v2.0.B.286: shared resume key (was local resumeKey in B.272).
import { lessonResumeKey as resumeKey } from '../../data/lessonProgress';
import { applyContentOverlay, type Lesson as LessonData, type ChapterId } from '../../data/lessons';
import { getLang } from '../../data/lang';
import { translate } from '../i18n';

// v2.0.B.461 (per user「右上角要顯示題型, 各語言用自己的語言」): 題型 → 標題 i18n key。
// narration 不顯示標題 (它是故事旁白)。
const TYPE_TITLE: Record<string, string> = {
  'type-translate': 'q.title.translate',
  'tap-pairs': 'q.title.match', 'phrase-pairs': 'q.title.match', 'listen-pairs': 'q.title.match',
  'emoji-pick': 'q.title.picture', 'picture-mc': 'q.title.picture', 'listen-emoji': 'q.title.picture',
  'grammar-mc': 'q.title.grammar',
  'listen-tf': 'q.title.tf', 'listen-tf-zh': 'q.title.tf',
  'scroll-pick': 'q.title.fill',
  'type-what-you-hear': 'q.title.listenType',
  'listen-mc': 'q.title.choose', 'comprehension': 'q.title.choose', 'listen-comprehension': 'q.title.choose',
  'read-comprehension': 'q.title.choose', 'read-mc-with-audio': 'q.title.choose',
};
import { getHp, loseHp, refillHp, subscribeHp, MAX_HP } from '../../data/hp';
import { sfxCorrect } from '../../audio/sfx';
import { unlockCardsForLesson, type CardId } from '../../data/cards';
import { unlockOutfitsForLesson, getOutfitById, type OutfitId } from '../../data/mascotOutfits';
import { track, EVENT } from '../../analytics/posthog';
import { RENDERERS, FallbackRenderer, type RawQuestion } from '../renderers';
import { getLessonHook } from '../../data/lessonHooks';
import { getKeySentenceForLesson, type KeySentence } from '../../data/keySentences';
import MochiOutfitAvatar from '../components/MochiOutfitAvatar';
import ShareModal from '../components/ShareModal';
// v2.0.B.239: chapter-final "明晚聽 / 繼續聽" picker (NextStoryPicker).
import NextStoryPicker from '../components/NextStoryPicker';
// v2.0.B.283: Mochi Bond stage-up celebration overlay.

interface Lesson {
  id: string;
  chapter: number;
  lessonInChapter: number;
  intro?: { zh: string; en?: string };
  questions: RawQuestion[];
}

// v2.0.B.286: resume key extracted to src/data/lessonProgress.ts (shared with
// the map's in-progress node marking). Behaviour unchanged from B.272.

export default function LessonPage() {
  const { chapter, lessonId } = useParams<{ chapter: string; lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  // v2.0.B.234 wiring: track total lessons in chapter so CompletePanel can
  // know if this completion is the chapter-final one (drives cross-chapter-hook
  // trigger in evaluateTriggers).
  const [maxLessonInChapter, setMaxLessonInChapter] = useState(0);
  const [idx, setIdx] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [showExit, setShowExit] = useState(false); // v2.0.B.465: ✕ 離開確認框 (照圖2)
  const startedAt = useRef(Date.now());
  const answerLog = useRef<Array<{ q: RawQuestion; userIdx: number; isCorrect: boolean }>>([]);
  // v2.0.B.488 錯題統整: 收集本節答錯的「可複習題」(單字/文法/時態), 節末 (+章末) 重做一輪。
  const wrongRef = useRef<Map<string, RawQuestion>>(new Map());
  // 複習輪「跑完主題目時」一次性算好 (依當下累積的錯題), 之後 render 沿用。null = 尚未算。
  const reviewRef = useRef<RawQuestion[] | null>(null);
  // v2.0.B.303: ?preview=N — deep-link to a specific question index (used by the
  // UI/UX spec doc's live 1:1 iframes). Read-only: does NOT persist resume state.
  const isPreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('preview');
  // v2.0.B.433: 晉升傳奇模式 (?mode=legendary) — 更高 XP + 傳奇 framing。
  const legendary = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'legendary';

  // v2.0.B.424: 每進一個 lesson 把體力補滿 (每節重新開始, 不跨節懲罰)
  useEffect(() => { refillHp(); }, [chapter, lessonId]);

  // v2.0.B.484: 套用玩家在節點選的 閱讀/聽力 模式 (?comp=read|listen) — 覆寫全域開關,
  // 只在這個 run 生效, 離開關卡清掉。理解題 renderer 會讀這個 override。
  useEffect(() => {
    const comp = new URLSearchParams(window.location.search).get('comp');
    if (comp === 'read' || comp === 'listen') setRunComprehensionOverride(comp);
    return () => setRunComprehensionOverride(null);
  }, [chapter, lessonId]);

  // v2.0.B.488: 換關卡 → 清掉上一關的錯題收集 + 複習輪快取。
  useEffect(() => { wrongRef.current = new Map(); reviewRef.current = null; }, [chapter, lessonId]);

  useEffect(() => {
    fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.json())
      .then(async (arr: Lesson[]) => {
        // v2.0.B.457: 套用 ja/ko 內容 overlay (之前只在 Phaser path 套, React LessonPage 漏了 →
        // 日韓使用者課內看到的全是繁中)。現在 fetch 後套 overlay, sentenceZh/options/pairs 轉日韓。
        try { await applyContentOverlay(arr as unknown as LessonData[], Number(chapter) as ChapterId, getLang()); } catch {}
        const found = arr.find(l => l.id === lessonId);
        // v2.0.B.444: 傳奇難題 (tier:'legendary') 只在傳奇模式出現; 一般模式過濾掉。
        if (found && !legendary) {
          found.questions = found.questions.filter((q) => (q as { tier?: string }).tier !== 'legendary');
        }
        setLesson(found ?? null);
        const maxL = arr.reduce((m, l) => Math.max(m, l.lessonInChapter ?? 0), 0);
        setMaxLessonInChapter(maxL);
        // v2.0.B.272: resume mid-lesson position. 媽媽哄睡時關 app / 切走是 churn
        // 主源 — 回來不該從第一題重練。還原 saved idx + 已顯示旁白 + answerLog
        // (讓完成統計仍涵蓋整課)。只在 0 < idx < total 時還原,完成即清除。
        let resumeIdx = 0;
        let resumeHistory: string[] = [];
        let resumeLog: typeof answerLog.current = [];
        if (found) {
          try {
            const raw = localStorage.getItem(resumeKey(chapter, lessonId));
            if (raw) {
              const s = JSON.parse(raw) as { idx?: number; history?: string[]; log?: typeof answerLog.current };
              if (typeof s.idx === 'number' && s.idx > 0 && s.idx < found.questions.length) {
                resumeIdx = s.idx;
                resumeHistory = Array.isArray(s.history) ? s.history : [];
                resumeLog = Array.isArray(s.log) ? s.log : [];
              }
            }
          } catch {}
        }
        // preview deep-link overrides resume (spec-doc iframe), fresh history/log
        if (found && isPreview) {
          const p = parseInt(new URLSearchParams(window.location.search).get('preview') || '', 10);
          if (Number.isFinite(p) && p >= 0 && p < found.questions.length) {
            resumeIdx = p; resumeHistory = []; resumeLog = [];
          }
        }
        setIdx(resumeIdx);
        setHistory(resumeHistory);
        answerLog.current = resumeLog;
        startedAt.current = Date.now();
        if (found) {
          try { track(EVENT.LESSON_START, { lesson_id: found.id, chapter: found.chapter, question_count: found.questions.length }); } catch {}
        }
      });
  }, [chapter, lessonId]);

  // v2.0.B.272: persist mid-lesson progress on every advance; clear on finish.
  useEffect(() => {
    if (!lesson || isPreview) return;
    const key = resumeKey(chapter, lessonId);
    try {
      if (idx > 0 && idx < lesson.questions.length) {
        localStorage.setItem(key, JSON.stringify({ idx, history, log: answerLog.current }));
      } else if (idx >= lesson.questions.length) {
        localStorage.removeItem(key);
      }
    } catch {}
  }, [idx, history, lesson, chapter, lessonId]);

  if (!lesson) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--t-text-muted)' }}>載入中…</div>;
  }

  // v2.0.B.488 錯題統整: 主題目跑完 → 接「錯題複習」一輪 (本節錯題, 章末再含整章)。
  const isLastLessonOfChapter = maxLessonInChapter > 0 && lesson.lessonInChapter >= maxLessonInChapter;
  const baseLen = lesson.questions.length;
  // 跑到主題目尾端時, 一次性算出複習輪 (本節錯題; 最後一節 = 整章累積錯題, 去重)。
  // 都沒錯 → 空陣列 → 直接完成 (題數自然減少)。preview 模式不複習。
  if (!isPreview && idx >= baseLen && reviewRef.current === null) {
    const lessonWrongs = [...wrongRef.current.values()] as ReviewQuestion[];
    const pool = isLastLessonOfChapter
      ? (readChapterMistakes(lesson.chapter) as ReviewQuestion[])
      : lessonWrongs;
    reviewRef.current = buildReviewRound(pool) as unknown as RawQuestion[];
  }
  const reviewQueue = (!isPreview && idx >= baseLen && reviewRef.current) ? reviewRef.current : [];
  const allQs = reviewQueue.length ? [...lesson.questions, ...reviewQueue] : lesson.questions;
  const inReview = reviewQueue.length > 0 && idx >= baseLen;
  const done = idx >= allQs.length;
  if (done) {
    return <CompletePanel
      lesson={lesson}
      log={answerLog.current}
      elapsedMs={Date.now() - startedAt.current}
      isLastLessonOfChapter={isLastLessonOfChapter}
      isPreview={isPreview}
      legendary={legendary}
      onBack={() => navigate('/')}
    />;
  }

  const q = allQs[idx];
  const Renderer = RENDERERS[q.type] ?? FallbackRenderer;

  const onAdvance = (snapshot?: string) => {
    if (snapshot) setHistory(h => [...h, snapshot]);
    setIdx(i => i + 1);
  };

  const onAnswer = (userIdx: number, isCorrect: boolean) => {
    if (!isCorrect) loseHp(); // v2.0.B.424: 答錯扣體力 (愛心)
    answerLog.current.push({ q, userIdx, isCorrect });
    // v2.0.B.488 錯題統整: 答錯的「單字/文法/時態」題記下來 (節末 + 章末重做)。
    if (!isCorrect && !isPreview && isReviewableType(q.type)) {
      wrongRef.current.set(mistakeKey(q as ReviewQuestion), q);
      addChapterMistake(lesson.chapter, q as unknown as ReviewQuestion);
    }
    try {
      track(EVENT.ANSWER_SUBMIT, {
        lesson_id: lesson.id,
        question_id: q.id,
        question_type: q.type,
        question_idx: idx,
        user_answer_idx: userIdx,
        is_correct: isCorrect,
        attempt_number: 1,
      });
    } catch {}
  };

  return (
    <div style={{ padding: '14px 14px 14px', height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* v2.0.B.284 Duolingo-style lesson header: ✕ + progress bar (flex 1) + 🔇
          砍 q-counter "q1/11" pill — 進度條本身就 self-evident */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        {/* v2.0.B.463 fix: ✕ 改扁平鈕, glyph 靠左對齊內容左緣 (14px), 垂直置中 (修「左上角 ❌ 沒對齊」) */}
        <button onClick={() => { if (idx > 0 && idx < allQs.length) setShowExit(true); else navigate('/'); }} aria-label="Close" style={{
          flex: '0 0 auto', width: 40, height: 44, padding: 0, border: 'none', background: 'transparent',
          color: 'var(--t-text-muted)', fontSize: 24, fontWeight: 700, lineHeight: 1, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', fontFamily: 'inherit',
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}>✕</button>
        {/* Progress bar — fills proportional to (idx+1)/total. olive success bg + inset top highlight (Duolingo flat) */}
        <div
          role="progressbar"
          aria-label={`進度 ${idx + 1} / ${allQs.length}`}
          aria-valuenow={idx + 1}
          aria-valuemin={0}
          aria-valuemax={allQs.length}
          style={{ flex: 1, height: 14, background: '#ead8c4', borderRadius: 'var(--t-radius-pill)', overflow: 'hidden' }}
        >
          <div style={{
            // v2.0.B.424 (per user): 線性進度 idx/total — 不再 pow 前載 (會讓一進來就看起來半滿);
            // 第 1 題 (idx 0) = 空, 答一題 +1/total. 進度條不顯示任何文字/分鐘數。
            width: `${Math.round((idx / allQs.length) * 100)}%`,
            height: '100%',
            background: 'var(--t-success)',
            borderRadius: 'var(--t-radius-pill)',
            boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.28)',
            transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }} />
        </div>
        <Hearts />
        <ShareBtn en={q.sentence ?? q.answer ?? ''} zh={q.sentenceZh ?? ''} />
        <ReportBtn qid={q.id} />
        <MuteToggleBtn />
      </div>

      {/* v2.0.B.315 RULE (per user): lesson 完全符合手機大小, 不往下延伸.
          外層 100dvh + overflow hidden; 內容區 flex 撐滿剩餘高度, 內容過長才『內部』捲動,
          整頁永不外溢. 各題型上方自帶內容/圖片槽, 選項不再下沉到畫面外. */}
      {/* v2.0.B.431 (per user「上面原文應該要不見」): 拿掉歷史題堆疊 — 每題只顯示當前題,
          上方不再殘留前一題的句子 (配對/單字題尤其不需要)。 */}
      {/* v2.0.B.488: 錯題複習階段橫幅 — 來鞏固一下你最薄弱的單字/文法 (照 Duolingo) */}
      {inReview && (
        <div style={{
          flexShrink: 0, margin: '4px 0 8px', padding: '8px 12px', borderRadius: 'var(--t-radius-md)',
          background: 'var(--t-tint-warn)', color: '#78350f', fontSize: 13, fontWeight: 800,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>✏️ {isLastLessonOfChapter ? '章末錯題複習 · 單字 / 文法 / 時態' : '錯題複習 · 鞏固單字 / 文法 / 時態'}</div>
      )}
      {/* v2.0.B.462: 題型標題移出捲動區 (固定), 跟上面隔開有空間, 避免標題被捲走 / 撐出空白下滑 */}
      {TYPE_TITLE[q.type] && (
        <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: '8px 0 0', lineHeight: 1.2, flexShrink: 0 }}>
          {translate(TYPE_TITLE[q.type], getLang())}
        </h2>
      )}
      {/* 內容區: 內容短=置中不外溢; 內容長(有原文)才往上滑看, 永不往下滑到空白 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Renderer q={q} onAdvance={onAdvance} onAnswer={onAnswer} />
      </div>

      {/* v2.0.B.465 (per user 照圖2): ✕ 中途離開確認框 — 別走, 快完成了 */}
      {showExit && (
        <div role="dialog" aria-modal="true" onClick={() => setShowExit(false)} style={{
          position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          background: 'rgba(40,28,16,0.45)',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: 420, background: 'var(--t-surface)',
            borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '24px 20px calc(20px + env(safe-area-inset-bottom))', textAlign: 'center',
            boxShadow: '0 -8px 28px rgba(0,0,0,0.18)', animation: 'pickup-fade-up 200ms ease',
          }}>
            <img src="/mascots/calico-anchor.webp" width={84} height={84} alt="" style={{ display: 'block', margin: '0 auto 12px' }} />
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--t-text)', marginBottom: 18, lineHeight: 1.4 }}>
              {translate('q.exitTitle', getLang())}
            </div>
            <button type="button" onClick={() => setShowExit(false)} style={{
              width: '100%', minHeight: 50, border: 'none', borderRadius: 'var(--t-radius-card)', background: 'var(--t-success)',
              color: '#fff', fontSize: 16, fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer',
              borderBottom: '4px solid var(--t-brand-dark)',
            }}>{translate('q.exitStay', getLang())}</button>
            <button type="button" onClick={() => navigate('/')} style={{
              width: '100%', minHeight: 46, marginTop: 10, border: 'none', borderRadius: 'var(--t-radius-card)', background: 'transparent',
              color: 'var(--t-error)', fontSize: 15, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer',
            }}>{translate('q.exitLeave', getLang())}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// v2.0.B.251 P0 fix (Walkthrough cron audit 2026-06-07T1218 persona 佳蓉 媽媽哄睡):
// Mute toggle 給「auto-TTS 無靜音 gate, 深夜外放吵醒孩子」的核心場景。
// 點一下切 ON/OFF, localStorage 持久化, window event 讓所有 LessonPage instance 同步。
// auto-speak useEffect 透過 tts.ts 內 mute gate 沉默跳過; manual SpeakerBtn 帶 force: true 仍可播。
// v2.0.B.466 (per user 照圖3+圖5): 回報問題鈕 — 點旗子開問題清單, 記錄到 localStorage
// (無後端, 存 pickup.reports 供日後匯出/cron 讀)。選項各語言自帶。
const REPORT_OPTS: Record<string, { title: string; thanks: string; opts: Array<{ key: string; label: string }> }> = {
  zh: { title: '回報這題的問題', thanks: '謝謝回報！我們會看 🙏', opts: [
    { key: 'answer', label: '我的答案應該被接受' }, { key: 'translation', label: '中文翻譯有誤' },
    { key: 'hint', label: '提示 / 解釋有誤' }, { key: 'audio', label: '音檔有問題' },
    { key: 'image', label: '圖片有問題' }, { key: 'other', label: '其他問題' } ] },
  en: { title: 'Report a problem', thanks: 'Thanks for the report! 🙏', opts: [
    { key: 'answer', label: 'My answer should be accepted' }, { key: 'translation', label: 'The translation is wrong' },
    { key: 'hint', label: 'The hint / explanation is wrong' }, { key: 'audio', label: 'Audio problem' },
    { key: 'image', label: 'Image problem' }, { key: 'other', label: 'Something else' } ] },
  ja: { title: '問題を報告', thanks: '報告ありがとう！🙏', opts: [
    { key: 'answer', label: '私の答えも正解のはず' }, { key: 'translation', label: '日本語訳がおかしい' },
    { key: 'hint', label: 'ヒント / 解説が違う' }, { key: 'audio', label: '音声の問題' },
    { key: 'image', label: '画像の問題' }, { key: 'other', label: 'その他' } ] },
  ko: { title: '문제 신고', thanks: '신고 고마워요! 🙏', opts: [
    { key: 'answer', label: '제 답도 정답이어야 해요' }, { key: 'translation', label: '한국어 번역이 틀렸어요' },
    { key: 'hint', label: '힌트 / 설명이 틀렸어요' }, { key: 'audio', label: '오디오 문제' },
    { key: 'image', label: '이미지 문제' }, { key: 'other', label: '기타' } ] },
};
function ReportBtn({ qid }: { qid: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const lang = getLang();
  const cfg = REPORT_OPTS[lang] ?? REPORT_OPTS.zh;
  const submit = (key: string) => {
    try {
      const raw = localStorage.getItem('pickup.reports');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ qid, issue: key, ts: Date.now() });
      localStorage.setItem('pickup.reports', JSON.stringify(arr.slice(-200)));
    } catch {}
    setDone(true);
    window.setTimeout(() => setOpen(false), 1200);
  };
  return (
    <>
      <button onClick={() => { setOpen(true); setDone(false); }} aria-label={cfg.title} title={cfg.title} style={{
        flex: '0 0 auto', width: 40, height: 44, padding: 0, border: 'none', background: 'transparent',
        fontSize: 19, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.7, WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', fontFamily: 'inherit',
      }}>🚩</button>
      {open && (
        <div role="dialog" aria-modal="true" onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          background: 'rgba(40,28,16,0.45)',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: 420, background: 'var(--t-surface)', borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '18px 16px calc(16px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 28px rgba(0,0,0,0.18)',
            animation: 'pickup-fade-up 200ms ease',
          }}>
            {done ? (
              <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 900, color: 'var(--t-success)', padding: '20px 0' }}>{cfg.thanks}</div>
            ) : (
              <>
                <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)', margin: '2px 4px 12px' }}>{cfg.title}</div>
                {cfg.opts.map((o) => (
                  <button key={o.key} type="button" onClick={() => submit(o.key)} style={{
                    width: '100%', textAlign: 'left', padding: '13px 14px', marginBottom: 8, borderRadius: 'var(--t-radius-md)',
                    border: '2px solid var(--t-border-card)', background: '#fff', color: 'var(--t-text)',
                    fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                  }}>{o.label}</button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// v2.0.B.469 (per user 照圖4): 每題分享鈕 — 把句子畫成卡片 (canvas) → 系統分享 / 下載。
function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const tokens = (text || '').split(/(\s+)/);
  const lines: string[] = []; let cur = '';
  for (const w of tokens) {
    if (ctx.measureText(cur + w).width <= maxW) { cur += w; continue; }
    if (ctx.measureText(w).width > maxW) {
      if (cur.trim()) { lines.push(cur.trim()); cur = ''; }
      let chunk = '';
      for (const ch of w) {
        if (ctx.measureText(chunk + ch).width <= maxW) chunk += ch;
        else { if (chunk) lines.push(chunk); chunk = ch; }
      }
      cur = chunk;
    } else { if (cur.trim()) lines.push(cur.trim()); cur = w; }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}
async function buildShareCard(en: string, zh: string): Promise<Blob | null> {
  const W = 1080, H = 1080;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d'); if (!ctx) return null;
  ctx.fillStyle = '#fef8ed'; ctx.fillRect(0, 0, W, H);
  roundRectPath(ctx, 70, 130, W - 140, H - 380, 44); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.strokeStyle = '#ead8c4'; ctx.lineWidth = 5; ctx.stroke();
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#3a2c1a'; ctx.font = 'bold 62px sans-serif';
  let y = 230;
  for (const ln of wrapCanvasText(ctx, en, W - 280)) { ctx.fillText(ln, 130, y); y += 82; }
  y += 16;
  ctx.fillStyle = '#7a6a55'; ctx.font = '46px sans-serif';
  for (const ln of wrapCanvasText(ctx, zh, W - 280)) { ctx.fillText(ln, 130, y); y += 64; }
  try { const im = await loadImg('/mascots/calico-anchor.webp'); ctx.drawImage(im, W - 300, H - 360, 220, 220); } catch { /* ignore */ }
  ctx.fillStyle = '#e0892f'; ctx.font = 'bold 44px sans-serif'; ctx.fillText('拾光 Pickup', 80, H - 160);
  ctx.fillStyle = '#a89c80'; ctx.font = '32px sans-serif'; ctx.fillText('pickupwords.pages.dev', 80, H - 100);
  return await new Promise((res) => c.toBlob((b) => res(b), 'image/png'));
}
function ShareBtn({ en, zh }: { en: string; zh: string }) {
  const [busy, setBusy] = useState(false);
  const share = async () => {
    if (busy || !en) return;
    setBusy(true);
    try {
      const blob = await buildShareCard(en, zh);
      if (blob) {
        const file = new File([blob], 'pickup-sentence.png', { type: 'image/png' });
        const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean; share?: (d: unknown) => Promise<void> };
        if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
          await nav.share({ files: [file], title: '拾光 Pickup', text: en });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'pickup-sentence.png'; a.click();
          URL.revokeObjectURL(url);
        }
      }
    } catch { /* user cancelled / unsupported */ }
    setBusy(false);
  };
  return (
    <button onClick={share} aria-label="分享句子 · Share" title="分享" disabled={busy || !en} style={{
      flex: '0 0 auto', width: 38, height: 44, padding: 0, border: 'none', background: 'transparent',
      fontSize: 19, cursor: en ? 'pointer' : 'default', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      opacity: en ? 0.7 : 0.3, WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', fontFamily: 'inherit',
    }}>📤</button>
  );
}

function MuteToggleBtn() {
  const [muted, setMuted] = useState<boolean>(() => isMuted());
  useEffect(() => {
    const unsub = subscribeMuteChange(() => setMuted(isMuted()));
    return unsub;
  }, []);
  return (
    <button
      onClick={() => setMuted(toggleMuted())}
      aria-label={muted ? '取消靜音 / Unmute' : '靜音 / Mute (適合哄睡場景)'}
      title={muted ? 'Unmute' : 'Mute'}
      style={{
        // v2.0.B.286: 統一用 icon-speaker.webp (user-generated, 跟 KeySentencesSheet 同 icon)
        // mute 狀態: opacity 0.4 + 紅斜線 overlay 表示靜音, 而非 🔇 emoji
        background: muted ? '#f0e6d8' : 'transparent',
        border: muted ? '2px solid var(--t-text-muted)' : '2px solid transparent',
        cursor: 'pointer', width: 44, height: 44, padding: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--t-radius-md)', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        position: 'relative',
      }}
    >
      <img src="/mascots/icon-speaker.webp" width={26} height={26} alt="" style={{ display: 'block', opacity: muted ? 0.35 : 0.85 }} />
      {muted && (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, color: 'var(--t-danger)', fontWeight: 900, lineHeight: 1,
          transform: 'rotate(-20deg)', pointerEvents: 'none',
        }}>/</span>
      )}
    </button>
  );
}

// v2.0.B.424 (per user): 體力愛心 — 右上角顯示 🧡, 答錯扣一顆 (空心 🤍).
// v2.0.B.463 (per user 參考圖「星星+數字+綠加號」, 但簡化 + 用拾光設計標準):
// 砍木紋/反光/黑邊 → 扁平暖色膠囊 + 琥珀星 + 數字 + 小橄欖綠加號 (裝飾, 非按鈕)。
function Hearts() {
  const [hp, setHp] = useState(() => getHp());
  useEffect(() => subscribeHp(() => setHp(getHp())), []);
  const low = hp <= 1;
  const accent = low ? 'var(--t-error)' : 'var(--t-accent)';
  return (
    <span aria-label={`體力 ${hp}/${MAX_HP}`} title={`體力 ${hp}/${MAX_HP}`}
      style={{
        flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 4,
        height: 28, padding: '0 4px 0 8px', borderRadius: 'var(--t-radius-pill)',
        background: 'var(--t-tint-warn)', border: `1.5px solid ${accent}`,
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>
      <span aria-hidden="true" style={{ fontSize: 15, color: accent }}>★</span>
      <span style={{ fontSize: 14, fontWeight: 900, color: low ? 'var(--t-error)' : 'var(--t-text)' }}>{hp}</span>
      {/* v2.0.B.464 (per user「加功能」): 點加號補滿體力 (友善 top-up, 非懲罰式; 滿了則 pulse 一下) */}
      <button
        type="button"
        aria-label="補滿體力 · Refill energy"
        title="補滿體力"
        onClick={() => { if (hp < MAX_HP) { try { sfxCorrect(); } catch {} refillHp(); } }}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, padding: 0, border: 'none', borderRadius: '50%',
          background: hp < MAX_HP ? 'var(--t-success)' : '#cdbfa8',
          color: '#fff', fontSize: 15, fontWeight: 900, lineHeight: 1,
          cursor: hp < MAX_HP ? 'pointer' : 'default', fontFamily: 'inherit',
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}
      >+</button>
    </span>
  );
}

function CompletePanel({ lesson, log, elapsedMs, isLastLessonOfChapter, isPreview, legendary, onBack }: {
  lesson: Lesson;
  log: Array<{ q: RawQuestion; userIdx: number; isCorrect: boolean }>;
  elapsedMs: number;
  isLastLessonOfChapter: boolean;
  isPreview?: boolean;
  legendary?: boolean;
  onBack: () => void;
}) {
  // v2.0.B.192 (UI/UX P1 #35 + cron P0 latent): wire addXp + addCoins on
  // lesson complete. React 從 v2.0.A onwards 沒呼叫過 addXp/addCoins,
  // 導致 HUD readXp 永遠 0。連 audit P1 #35 寫的「公式不一致」其實是
  // 因為根本沒寫入。修法:correct×10 XP + correct×3 Coins,formula
  // consistent across CompletePanel display + persisted state。
  const correct = log.filter(a => a.isCorrect).length;
  const total = log.length;
  const coinDelta = correct * 3;
  const accuracy = total > 0 ? Math.round(correct / total * 100) : 100;
  // v2.0.B.306: 擋重複領獎 — freeze 完成前狀態. 已完成過 → 重玩不再發 XP/coins
  // (金幣可花後, 重玩刷獎是 economy 漏洞); preview 模式完全不寫.
  const [alreadyDone] = useState(() => {
    try { return readCompletedLessons(Number(lesson.chapter)).has(lesson.id); } catch { return false; }
  });
  // v2.0.B.433: XP 改用 lesson 完成標準 (固定值, 不再 correct×10):
  // 一般首過 30 / 複習 5 / 傳奇首過 45 / 傳奇複習 40。
  const xp = lessonXp({ legendary: !!legendary, alreadyDone });

  // v2.0.B.230 (was B.221, mis-landed in dead LessonScene.ts): hook framework
  // metadata for inquiry microcopy + PostHog tag. Per docs/research/chapter-
  // ending-hook-design.md framework B1-B6.
  const hook = getLessonHook(lesson.id);

  // v2.0.B.232 招 1 streak + freeze: capture updateStreak() result so the
  // panel can render Mochi-saved-your-streak microcopy (warm not punishing).
  const [streakResult, setStreakResult] = useState<StreakUpdateResult | null>(null);
  // v2.0.B.232 招 2 collectible cards: capture cards newly unlocked by
  // completing this lesson so the panel can show "你解鎖了 X 張新卡片".
  const [newCards, setNewCards] = useState<CardId[]>([]);
  // v2.0.B.234 招 3 mascot outfits: capture outfits newly unlocked by this
  // lesson completion (chapter-complete + lesson-id + streak milestones).
  const [newOutfits, setNewOutfits] = useState<OutfitId[]>([]);
  // v2.0.B.235 招 4: 分享金句 modal visibility — only opens when user taps
  // the share button. KeySentence resolved lazily from chapter + lessonId.
  const [showShare, setShowShare] = useState(false);
  const keySentence: KeySentence | null = getKeySentenceForLesson(lesson.chapter, lesson.id);
  // v2.0.B.239: NextStoryPicker visibility — opens on chapter-final lesson
  // complete (replaces the Continue button on the final lesson).
  const [showNextStoryPicker, setShowNextStoryPicker] = useState(false);
  // v2.0.B.322 (per user): 大單元 (章節) 完成獎勵 — 統計本章新單字 (tap-pairs) + 新片語 (phrase-pairs).
  const [chapterReward, setChapterReward] = useState<{ words: number; phrases: number } | null>(null);
  useEffect(() => {
    if (!isLastLessonOfChapter) return;
    let alive = true;
    fetch(`/lessons-ch${lesson.chapter}.json`).then((r) => r.json()).then((arr: Lesson[]) => {
      if (!alive) return;
      const words = new Set<string>(); const phrases = new Set<string>();
      for (const l of arr) for (const q of (l.questions ?? [])) {
        if (q.type === 'tap-pairs' || q.type === 'phrase-pairs') {
          for (const p of ((q as { pairs?: Array<{ left: string; right: string }> }).pairs ?? [])) {
            const en = /[a-zA-Z]/.test(p.right ?? '') ? p.right : p.left;
            if (!en) continue;
            (q.type === 'phrase-pairs' ? phrases : words).add(String(en).toLowerCase().trim());
          }
        }
      }
      setChapterReward({ words: words.size, phrases: phrases.size });
    }).catch(() => {});
    return () => { alive = false; };
  }, [isLastLessonOfChapter, lesson.chapter]);

  useEffect(() => {
    // v2.0.B.306: preview (spec-doc iframe) = read-only, 完全不寫任何狀態.
    if (isPreview) return;
    try { markLessonCompleted(lesson.chapter, lesson.id); } catch {}
    // v2.0.B.488: 章末複習做完 → 清掉整章錯題庫 (下次重玩重新累積)。
    if (isLastLessonOfChapter) { try { clearChapterMistakes(lesson.chapter); } catch {} }
    // 只在「首次完成」發 XP/coins, 重玩不再發 (economy farming guard)
    if (!alreadyDone) {
      try { addXp(xp); } catch {}
      try { addCoins(coinDelta); } catch {}
    }
    // v2.0.B.308 (P2): 鏡像給 server (idempotent; 開機 pull 時 server 值為準, 防竄改)
    try { if (isBackendLive()) void serverCompleteLesson(Number(lesson.chapter), lesson.id, correct, total); } catch {}
    try { setStreakResult(updateStreak()); } catch {}
    // Parent Corner: persist learning record for parent-facing stats.
    try { logLesson({ ts: Date.now(), chapter: lesson.chapter, lessonId: lesson.id, total, correct, ms: elapsedMs }); } catch {}
    try { setNewCards(unlockCardsForLesson(lesson.id)); } catch {}
    // v2.0.B.234 招 3: mascot outfit unlock check (chapterComplete / lessonComplete
    // / milestoneStreak). Runs AFTER updateStreak() so streak count is current.
    try { setNewOutfits(unlockOutfitsForLesson(lesson.id)); } catch {}
    try {
      track(EVENT.LESSON_COMPLETE, {
        lesson_id: lesson.id,
        chapter: lesson.chapter,
        question_count: total,
        correct_count: correct,
        accuracy,
        xp_earned: xp,
        elapsed_ms: elapsedMs,
        review_opened: false,
        // B.230 hook framework A/B analytics
        hook_type: hook?.type ?? 'none',
        has_inquiry: hook != null,
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const min = Math.floor(elapsedMs / 60000);
  const sec = Math.floor((elapsedMs % 60000) / 1000);
  const timeStr = min > 0 ? `${min}:${sec.toString().padStart(2, '0')}` : `${sec}s`;

  return (
    <div className="pickup-fade-up" style={{ padding: '30px 20px', textAlign: 'center', position: 'relative' }}>
      {/* Confetti shower */}
      {Array.from({ length: 12 }).map((_, i) => {
        const emojis = ['🎉', '⭐', '✨', '🌟', '🎊'];
        return (
          <span key={i} className="pickup-confetti" style={{
            left: `${5 + (i * 8)}%`,
            animationDelay: `${(i % 6) * 0.15}s`,
          }}>{emojis[i % emojis.length]}</span>
        );
      })}
      {/* v2.0.B.234 招 3: celebrate with Mochi in her current outfit (replaces
          bare 🎉). Falls back to default cat if no outfit picked. */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <MochiOutfitAvatar size={96} className="pickup-bounce" ariaLabel="Mochi celebrating" />
      </div>
      {legendary && (
        <div style={{ display: 'inline-block', marginTop: 10, padding: '4px 14px', borderRadius: 'var(--t-radius-pill)', fontSize: 13, fontWeight: 900, color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', letterSpacing: 1 }}>👑 傳奇通關 · LEGENDARY</div>
      )}
      <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', marginTop: 12, marginBottom: 18 }}>{isLastLessonOfChapter ? '章節完成! · Chapter complete!' : 'Lesson complete!'}</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <Stat label="XP" value={xp} color="var(--t-brand-dark)" bg="var(--t-tint-warn)" />
        <Stat label="ACCURACY" value={`${accuracy}%`} color="var(--t-success)" bg="var(--t-success-tint)" />
        <Stat label="TIME" value={timeStr} color="var(--t-text-muted)" bg="var(--t-bg)" />
      </div>
      {/* v2.0.B.322 (per user): 大單元完成獎勵 — 本章新單字 + 新片語統整 */}
      {isLastLessonOfChapter && chapterReward && (chapterReward.words > 0 || chapterReward.phrases > 0) && (
        <div style={{
          background: 'var(--t-surface-alt)', border: '2px solid var(--t-brand)',
          borderBottom: '4px solid var(--t-brand-dark)', borderRadius: 'var(--t-radius-card)',
          padding: '14px 16px', marginBottom: 24,
        }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--t-text)', marginBottom: 10 }}>🏆 這個單元你學會了</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Stat label="新單字 Words" value={chapterReward.words} color="var(--t-brand-dark)" bg="var(--t-tint-warn)" />
            <Stat label="新片語 Phrases" value={chapterReward.phrases} color="var(--t-success)" bg="var(--t-success-tint)" />
          </div>
        </div>
      )}
      {/* v2.0.B.232 招 1: streak / freeze 結果 banner.
          - 累積 / 新增 → 🔥 N 天
          - 漏一天但用 freeze 保住 → 🧊 Mochi 幫你保住 streak
          - 漏一天且沒 freeze → 「Mochi 等你回來,我們再走一次」(不打擊式 framing) */}
      {streakResult && (
        <StreakBanner result={streakResult} />
      )}
      {/* v2.0.B.232 招 2: 新解鎖卡片提示 (溫和招呼,不打斷) */}
      {newCards.length > 0 && (
        <NewCardsBanner count={newCards.length} />
      )}
      {/* v2.0.B.234 招 3: 新解鎖裝扮提示 (warm framing, 引導去衣櫥試穿) */}
      {newOutfits.length > 0 && (
        <NewOutfitsBanner outfitIds={newOutfits} />
      )}
      {/* v2.0.B.230: hook inquiry microcopy above Continue button. Bell HIP
          Prompt 外顯 — drives Zeigarnik 效應點下一個 button 衝動. */}
      {hook?.inquiry && (
        <div style={{
          marginBottom: 14,
          padding: '10px 14px',
          background: 'transparent',
          border: '1.5px dashed var(--t-border-card)',
          borderRadius: 10,
          color: 'var(--t-text-muted)',
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.3px',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>想知道:{hook.inquiry}</div>
      )}
      {/* v2.0.B.235 招 4: 分享金句 button. Surfaces ABOVE Continue per design
          (Duolingo's "share result" pattern). Hidden if chapter has no
          KeySentence (defensive — currently Ch1-8 all have ≥1 entry). */}
      {keySentence && (
        <button
          onClick={() => {
            setShowShare(true);
            try { track(EVENT.LESSON_COMPLETE, { share_modal_opened: true, lesson_id: lesson.id, chapter: lesson.chapter }); } catch {}
          }}
          aria-label="Share key sentence"
          style={{
            padding: '14px 20px', background: 'var(--t-surface-alt)', color: '#7a5e25',
            border: '2px solid var(--t-brand)', borderBottom: '4px solid var(--t-brand-dark)',
            borderRadius: 'var(--t-radius-card)', fontSize: 15, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit',
            width: '100%', maxWidth: 420, marginBottom: 10,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <span aria-hidden="true">📤</span>
          <span>分享金句 · Share</span>
        </button>
      )}
      {/* v2.0.B.239: chapter-final lesson → swap Continue with NextStoryPicker
          CTA so 「明晚聽 / 繼續聽」picker takes over the end-of-chapter slot.
          Middle lessons keep the classic Continue button (no flow change). */}
      {isLastLessonOfChapter ? (
        <button onClick={() => setShowNextStoryPicker(true)} style={{
          padding: '16px 24px', background: 'var(--t-success)', color: 'var(--t-surface)', border: 'none',
          borderBottom: '4px solid var(--t-success)', borderRadius: 'var(--t-radius-card)', fontSize: 17, fontWeight: 900,
          cursor: 'pointer', fontFamily: 'inherit', width: '100%', maxWidth: 420,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }} aria-label="章節完成 明晚聽什麼 Pick next story">→</button>
      ) : (
        <button onClick={onBack} style={{
          padding: '16px 24px', background: 'var(--t-success)', color: 'var(--t-surface)', border: 'none',
          borderBottom: '4px solid var(--t-success)', borderRadius: 'var(--t-radius-card)', fontSize: 17, fontWeight: 900,
          cursor: 'pointer', fontFamily: 'inherit', width: '100%', maxWidth: 420,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }} aria-label="完成 Continue">→</button>
      )}

      {/* v2.0.B.235 招 4: 分享金句 modal — only mounts when explicitly opened. */}
      {showShare && keySentence && (
        <ShareModal
          sentence={keySentence}
          chapter={lesson.chapter}
          onClose={() => setShowShare(false)}
        />
      )}

      {/* v2.0.B.239: NextStoryPicker — chapter-final picker. Mounts on demand
          (button tap) so middle lessons never pay the carousel/registry cost. */}
      {showNextStoryPicker && (
        <NextStoryPicker
          completedChapter={lesson.chapter}
          onClose={() => setShowNextStoryPicker(false)}
        />
      )}

    </div>
  );
}

// v2.0.B.232 招 1: streak result banner. Three states, all warm framing.
function StreakBanner({ result }: { result: StreakUpdateResult }) {
  let icon: string;
  let zh: string;
  let en: string;
  let accent: string;
  if (result.freezeUsed) {
    icon = '🧊';
    zh = `Mochi 用 1 個 freeze 幫你保住 streak (還剩 ${result.freezesRemaining})`;
    en = `Mochi used 1 freeze to keep your streak (${result.freezesRemaining} left)`;
    accent = '#5a8cc4';
  } else if (result.resetOccurred) {
    icon = '🐾';
    zh = 'Mochi 等你回來 — 我們再走一次';
    en = `Welcome back. Let's start again.`;
    accent = 'var(--t-border-card)';
  } else {
    icon = '🔥';
    zh = `連續學習 ${result.count} 天!`;
    en = `${result.count}-day streak!`;
    accent = '#ff7a3a';
  }
  return (
    <div className="pickup-fade-up" style={{
      marginBottom: 12,
      padding: '12px 14px',
      background: 'var(--t-surface-alt)',
      border: `2px solid ${accent}`,
      borderBottom: `4px solid ${accent}`,
      borderRadius: 'var(--t-radius-md)',
      display: 'flex', alignItems: 'center', gap: 12,
      maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
    }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.3 }}>{zh}</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t-text-muted)', marginTop: 2 }}>{en}</div>
      </div>
    </div>
  );
}

// v2.0.B.232 招 2: 新解鎖卡片 banner. 鼓勵點圖鑑 tab.
function NewCardsBanner({ count }: { count: number }) {
  return (
    <div className="pickup-fade-up" style={{
      marginBottom: 12,
      padding: '12px 14px',
      background: 'var(--t-tint-warn)',
      border: '2px solid var(--t-brand)',
      borderBottom: '4px solid var(--t-brand-dark)',
      borderRadius: 'var(--t-radius-md)',
      display: 'flex', alignItems: 'center', gap: 12,
      maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
    }}>
      <span style={{ fontSize: 28 }}>📒</span>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.3 }}>
          你解鎖了 {count} 張新卡片!
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t-text-muted)', marginTop: 2 }}>
          You unlocked {count} new card{count > 1 ? 's' : ''}. Check 圖鑑 tab.
        </div>
      </div>
    </div>
  );
}

// v2.0.B.234 招 3: 新解鎖裝扮 banner. 列出名稱 + 一個 emoji badge,引導去
// Profile tab → 衣櫥 試穿。Warm framing, 不打擾完成爽感。
function NewOutfitsBanner({ outfitIds }: { outfitIds: OutfitId[] }) {
  const outfits = outfitIds
    .map(id => getOutfitById(id))
    .filter((o): o is NonNullable<typeof o> => o != null);
  if (outfits.length === 0) return null;
  const firstBadge = outfits[0].emojiBadge || '👕';
  const namesZh = outfits.map(o => o.name.zh).join(' / ');
  const namesEn = outfits.map(o => o.name.en).join(' / ');
  return (
    <div className="pickup-fade-up" style={{
      marginBottom: 12,
      padding: '12px 14px',
      background: 'var(--t-surface-alt)',
      border: '2px solid var(--t-border-card)',
      borderBottom: '4px solid var(--t-text-muted)',
      borderRadius: 'var(--t-radius-md)',
      display: 'flex', alignItems: 'center', gap: 12,
      maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
    }}>
      <span style={{ fontSize: 28 }} aria-hidden="true">{firstBadge}</span>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.3 }}>
          {outfits.length === 1
            ? `新裝扮:${namesZh}`
            : `${outfits.length} 套新裝扮:${namesZh}`}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t-text-muted)', marginTop: 2 }}>
          New outfit{outfits.length > 1 ? 's' : ''}: {namesEn} · 我的 → 衣櫥 試穿
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, bg }: { label: string; value: number | string; color: string; bg: string }) {
  return (
    <div style={{ flex: 1, padding: '12px 8px', background: bg, border: `2px solid ${color}`, borderBottom: `4px solid ${color}`, borderRadius: 'var(--t-radius-card)', opacity: 0.95 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--t-text-muted)', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
