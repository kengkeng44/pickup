import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRunStore } from '../../store/runStore';

interface Lesson {
  id: string;
  chapter: number;
  lessonInChapter: number;
  segmentType: string;
  storyBeat?: string;
  intro?: { zh: string };
  questions: unknown[];
}

const CHAPTER_TITLES: Record<number, { zh: string; en: string }> = {
  1: { zh: '院子裡的第一個故事', en: 'A Story in the Yard' },
  2: { zh: '桃太郎', en: 'Momotaro' },
  3: { zh: '醜小鴨', en: 'The Ugly Duckling' },
  4: { zh: '龜兔賽跑', en: 'Tortoise and Hare' },
  5: { zh: '駱駝為什麼有駝峰', en: 'How the Camel Got Its Hump' },
  6: { zh: 'Baba Yaga 雞腳屋', en: 'Baba Yaga' },
  7: { zh: '六隻天鵝', en: 'The Six Swans' },
  8: { zh: '葉限', en: 'Ye Xian' },
};

export default function MapPage() {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(1);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const streak = useRunStore(s => s.streak);

  useEffect(() => {
    setLoading(true);
    fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.json())
      .then(data => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [chapter]);

  return (
    <div style={{ padding: '14px 14px 24px' }}>
      {/* Top HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#3c2a1c' }}>章節地圖</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fef3c7', padding: '4px 10px', borderRadius: 14, border: '2px solid #e7a44a' }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#b07a2a' }}>{streak}</span>
        </div>
      </div>

      {/* Chapter switcher */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
          <button
            key={c}
            onClick={() => setChapter(c)}
            style={{
              flex: '0 0 auto',
              padding: '6px 14px',
              background: chapter === c ? '#e7a44a' : 'transparent',
              color: chapter === c ? '#fff' : '#8b6f4a',
              border: '2px solid #c8a878',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Ch{c}
          </button>
        ))}
      </div>

      {/* Chapter title card */}
      <div style={{ background: '#c8835f', color: '#fff', padding: '14px 18px', borderRadius: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>SECTION {chapter} · 第 {chapter} 章</div>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 2 }}>{CHAPTER_TITLES[chapter]?.zh ?? `Ch${chapter}`}</div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>{CHAPTER_TITLES[chapter]?.en ?? ''}</div>
      </div>

      {/* Lesson nodes */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#8b6f4a' }}>載入中…</div>
      ) : lessons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#8b6f4a' }}>本章內容未上線</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '8px 0' }}>
          {lessons.map((l, i) => {
            const offset = (i % 4) - 1.5;
            return (
              <button
                key={l.id}
                onClick={() => navigate(`/lesson/${chapter}/${l.id}`)}
                aria-label={`Lesson ${l.lessonInChapter}`}
                style={{
                  position: 'relative',
                  width: 96, height: 88,
                  marginLeft: offset * 60,
                  background: '#c8835f',
                  border: 'none',
                  borderBottom: '6px solid #8b5a3c',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <img src="/mascots/icon-paw.webp" width={44} height={44} alt="" style={{ opacity: 0.85 }} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
