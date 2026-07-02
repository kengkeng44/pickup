import { useEffect, useRef, useState } from 'react';
import { loadQuestions, speak, type MCQuestion } from './lessons';
import { addGrowth } from './petState';
import { canPlay, recordWrong, DAILY_WRONG_CAP, wrongToday } from './gate';

// Phase 0 答題器: 沿用拾光 blindRetry (答錯只標紅該鈕、不揭正解、原地重試到對)。
// first-try 答對率驅動成長; first-try 答錯記入每日錯誤額度 (每題最多記 1 次)。
export default function Practice({ onExit, onSleep }: { onExit: () => void; onSleep: () => void }) {
  const [all, setAll] = useState<MCQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [wrongSet, setWrongSet] = useState<Set<number>>(new Set()); // 本題已標紅的錯誤選項
  const [solved, setSolved] = useState(false);                      // 本題已答對 (顯示解說)
  const gotWrongOnce = useRef(false);                               // 本題是否錯過 (影響 first-try bonus + 額度)
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    loadQuestions(32).then(setAll).catch(() => setAll([]));
    return () => { if (advanceTimer.current) window.clearTimeout(advanceTimer.current); };
  }, []);

  // 進來就沒額度 → 直接睡。
  useEffect(() => { if (!canPlay()) onSleep(); }, [onSleep]);

  const q = all?.[idx];

  // 每換一題唸出音檔文字 (listen-mc 才有 sentence)。
  useEffect(() => { if (q?.sentence) speak(q.sentence); }, [q]);

  const resetForNext = () => {
    setWrongSet(new Set());
    setSolved(false);
    gotWrongOnce.current = false;
  };

  const goNext = () => {
    if (!all) return;
    if (!canPlay()) { onSleep(); return; }
    if (idx + 1 >= all.length) { onExit(); return; }
    setIdx((i) => i + 1);
    resetForNext();
  };

  const pick = (i: number) => {
    if (!q || solved || wrongSet.has(i)) return;
    if (i === q.correctIndex) {
      setSolved(true);
      const bonus = gotWrongOnce.current ? 1 : 1.3; // first-try 對 → +30%
      addGrowth(10 * bonus);
      advanceTimer.current = window.setTimeout(goNext, 1600);
    } else {
      // 第一次答錯才記入每日額度 (first-try wrong)
      if (!gotWrongOnce.current) {
        gotWrongOnce.current = true;
        recordWrong();
      }
      setWrongSet((s) => new Set(s).add(i));
    }
  };

  if (all === null) return <div className="wrap"><p className="muted">載入中…</p></div>;
  if (!q) return <div className="wrap"><p className="muted">今天沒有題目了</p><button className="btn" onClick={onExit}>回家</button></div>;

  const left = DAILY_WRONG_CAP - wrongToday();

  return (
    <div className="wrap">
      <div className="topbar">
        <button className="link" onClick={onExit}>← 回家</button>
        <span className="muted">還可以錯 {Math.max(0, left)} 題</span>
      </div>

      {q.sentence && (
        <button className="speak" onClick={() => speak(q.sentence!)} aria-label="播放">🔊 {q.sentence}</button>
      )}
      <h2 className="q">{q.question}</h2>

      <div className="opts">
        {q.options.map((o, i) => {
          const state = solved && i === q.correctIndex ? 'correct' : wrongSet.has(i) ? 'wrong' : 'idle';
          return (
            <button key={i} className={`opt ${state}`} disabled={solved} onClick={() => pick(i)}>{o}</button>
          );
        })}
      </div>

      {solved && q.explanationZh && <p className="explain">{q.explanationZh}</p>}
    </div>
  );
}
