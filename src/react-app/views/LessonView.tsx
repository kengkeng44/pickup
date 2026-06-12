import { useState, useEffect } from 'react';

interface Props { onComplete: () => void; }

const SAMPLE_Q = {
  sentence: 'Mochi sleeps under the old porch.',
  questionEn: 'Does Mochi sleep outside?',
  options: ['Yes', 'No'],
  correctIndex: 0,
  explanationZh: 'Mochi 睡在老屋簷下,屋簷下算外面 outside,不是溫暖的家裡,所以答 Yes。',
};

export default function LessonView({ onComplete }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    // Auto-speak sentence + question via Web Speech (no MP3 in sandbox)
    if (typeof window !== 'undefined' && window.speechSynthesis && !revealed) {
      const u = new SpeechSynthesisUtterance(`${SAMPLE_Q.sentence}. Question: ${SAMPLE_Q.questionEn}`);
      u.lang = 'en-US';
      u.rate = 0.75;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  }, [revealed]);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setRevealed(true);
    const correct = idx === SAMPLE_Q.correctIndex;
    setTimeout(() => onComplete(), correct ? 4000 : 6000);
  };

  const replay = () => {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(SAMPLE_Q.sentence);
      u.lang = 'en-US';
      u.rate = 0.75;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div style={{ padding: '14px 14px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <button onClick={onComplete} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--t-text-muted)' }}>✕</button>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--t-text-muted)', background: '#fef3c7', padding: '4px 9px', borderRadius: 8 }}>q3/14</span>
      </div>

      {/* Narrative chat flow (history archive) */}
      <div style={{ marginBottom: 16 }}>
        <NarrationLine text="It is dark and cold tonight." />
        <NarrationLine text="Mochi is a stray cat." />
        {revealed && <NarrationLine text={SAMPLE_Q.sentence} />}
      </div>

      {/* Question prompt (only pre-reveal; replaced by explanationZh post-reveal) */}
      {!revealed ? (
        <div style={{ padding: '18px 12px 6px', textAlign: 'center' }}>
          <button onClick={replay} aria-label="Replay" style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: 8 }}>
            <img src="/mascots/icon-speaker.webp" width={20} height={20} alt="" style={{ opacity: 0.7 }} />
          </button>
          <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--t-text)', lineHeight: 1.5 }}>
            {SAMPLE_Q.questionEn}
          </div>
        </div>
      ) : (
        <div style={{ padding: '14px 12px 6px' }}>
          <div style={{ fontSize: 14, color: '#5a4530', lineHeight: 1.7, padding: '12px 14px', background: 'var(--t-bg)', borderLeft: '3px solid #c8a878', borderRadius: '0 10px 10px 0' }}>
            {SAMPLE_Q.explanationZh}
          </div>
        </div>
      )}

      {/* Answer buttons */}
      {!revealed ? (
        <div style={{ marginTop: 18 }}>
          {SAMPLE_Q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: 8,
                background: '#fff',
                color: 'var(--t-text)',
                border: '2px solid #c8a878',
                borderBottom: '4px solid var(--t-brand-dark)',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '14px 6px', fontSize: 11, color: 'var(--t-text-muted)', opacity: 0.7, fontWeight: 600 }}>
          ⬇ {selected === SAMPLE_Q.correctIndex ? `4 秒後跳下一題` : `6 秒後跳下一題`} · Tap anywhere to skip
        </div>
      )}
    </div>
  );
}

function NarrationLine({ text }: { text: string }) {
  const replay = () => {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.75;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '4px 0', fontSize: 17, color: 'var(--t-text)', lineHeight: 1.7, fontWeight: 600 }}>
      <button onClick={replay} aria-label="Replay this line" style={{ flex: '0 0 auto', width: 22, height: 22, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 3 }}>
        <img src="/mascots/icon-speaker.webp" width={20} height={20} alt="" style={{ opacity: 0.7 }} />
      </button>
      <span style={{ flex: '1 1 auto' }}>{text}</span>
    </div>
  );
}
