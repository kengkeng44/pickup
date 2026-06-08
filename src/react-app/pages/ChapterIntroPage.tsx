import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { speak } from '../../audio/tts';
// v2.0.B.234 招 3: Mochi outfit avatar so intro composition reflects player's pick.
import MochiOutfitAvatar from '../components/MochiOutfitAvatar';

interface Lesson {
  id: string;
  chapter: number;
  lessonInChapter: number;
  intro?: { zh: string; en?: string };
}

const CHAPTER_META: Record<number, { zh: string; en: string; emoji: string }> = {
  1: { zh: '院子裡的第一個故事', en: 'A Story in the Yard', emoji: '🌧️' },
  2: { zh: '桃太郎', en: 'Momotaro', emoji: '🍑' },
  3: { zh: '醜小鴨', en: 'The Ugly Duckling', emoji: '🦢' },
  4: { zh: '龜兔賽跑', en: 'Tortoise and Hare', emoji: '🐢' },
  5: { zh: '駱駝為什麼有駝峰', en: 'How the Camel Got Its Hump', emoji: '🐪' },
  6: { zh: 'Baba Yaga 雞腳屋', en: 'Baba Yaga', emoji: '🏚️' },
  7: { zh: '六隻天鵝', en: 'The Six Swans', emoji: '🦢' },
  8: { zh: '葉限', en: 'Ye Xian', emoji: '🏺' },
};

export default function ChapterIntroPage() {
  const { chapter } = useParams<{ chapter: string }>();
  const navigate = useNavigate();
  const ch = Math.min(8, Math.max(1, Number(chapter || 1)));
  const [introZh, setIntroZh] = useState('');
  const meta = CHAPTER_META[ch];

  useEffect(() => {
    fetch(`/lessons-ch${ch}.json`)
      .then(r => r.json())
      .then((arr: Lesson[]) => {
        const first = arr[0];
        setIntroZh(first?.intro?.zh ?? '');
      });
  }, [ch]);

  const start = () => {
    try { localStorage.setItem(`pickup.chapter.${ch}.intro.seen`, '1'); } catch {}
    navigate(`/map?ch=${ch}`);
  };

  return (
    <div style={{ padding: '20px 18px 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <button onClick={() => navigate('/chapters')} aria-label="返回" style={{ background: 'transparent', border: 'none', fontSize: 24, color: '#8b6f4a', cursor: 'pointer' }}>‹</button>
        <span style={{ marginLeft: 8, fontSize: 13, color: '#8b6f4a', fontWeight: 700 }}>SECTION {ch}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 12 }}>{meta?.emoji ?? '📖'}</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: '#3c2a1c', marginBottom: 4 }}>{meta?.zh}</div>
        <div style={{ fontSize: 14, color: '#8b6f4a', fontWeight: 600, marginBottom: 28 }}>{meta?.en}</div>

        {introZh && (
          <div style={{
            background: '#fff7e8', border: '2px solid #c8a878',
            borderRadius: 14, padding: '16px 18px',
            fontSize: 15, color: '#3c2a1c', lineHeight: 1.7, fontWeight: 600,
            marginBottom: 28, textAlign: 'left',
          }}>
            {introZh}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 14, marginBottom: 24 }}>
          {/* v2.0.B.192 P2 fix: explicit height prevents CLS shift when slow-loading webp arrives */}
          <img src="/mascots/iso-grandma.webp" alt="" width={100} height={110} />
          <img src="/mascots/iso-shiba.webp" alt="" width={70} height={80} />
          {/* v2.0.B.234 招 3: Mochi cat with current outfit badge — completes
              the trio (grandma + shiba + cat) per CLAUDE.md framework. */}
          <MochiOutfitAvatar size={62} ariaLabel="Mochi" />
        </div>
      </div>

      <button
        onClick={start}
        style={{
          width: '100%', padding: '16px 0',
          background: '#7ac74a', color: '#fff',
          border: 'none', borderBottom: '4px solid #5d9a35', borderRadius: 14,
          fontSize: 17, fontWeight: 900, letterSpacing: 1,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
        aria-label="開始章節 Begin"
      >→</button>

      <button
        onClick={() => speak(introZh, 'zh-TW')}
        disabled={!introZh}
        aria-label="Replay intro"
        style={{
          marginTop: 8, width: '100%', padding: '8px 0',
          background: 'transparent', color: '#8b6f4a',
          border: 'none', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}
      >
        {/* v2.0.B.286: 統一用 icon-speaker.webp + 砍中文 "重聽介紹" 文字 */}
        <img src="/mascots/icon-speaker.webp" width={22} height={22} alt="" style={{ opacity: 0.7 }} />
      </button>
    </div>
  );
}
