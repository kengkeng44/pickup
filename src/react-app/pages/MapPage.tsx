import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRunStore, readCompletedLessons, isLessonUnlocked } from '../../store/runStore';

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
  const [searchParams] = useSearchParams();
  const chapter = Math.min(8, Math.max(1, Number(searchParams.get('ch') || 1)));
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const streak = useRunStore(s => s.streak);
  const completed = readCompletedLessons(chapter);

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
      {/* Top HUD: 4 icon (Flag / Crown / Gem / Streak) — 對齊 Phaser v1.9.15 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <HudIcon icon="/mascots/flag-en.webp" value="EN" />
        <HudIcon icon="/mascots/crown-gold.webp" value={Math.max(1, Math.floor(streak / 5)).toString()} />
        <HudIcon icon="/mascots/coin-gold.webp" value="0" />
        <HudIcon icon="/mascots/flame.webp" value={streak.toString()} accent />
      </div>

      {/* Chapter title card with switcher button RIGHT (per user 圈位置) */}
      <button
        onClick={() => navigate('/chapters')}
        style={{
          width: '100%', textAlign: 'left',
          background: '#c8835f', color: '#fff',
          padding: '14px 14px 14px 18px', borderRadius: 14,
          marginBottom: 14, border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', fontFamily: 'inherit',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="切換章節"
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>
            SECTION {chapter} · 第 {chapter} 章
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 2 }}>{CHAPTER_TITLES[chapter]?.zh ?? `Ch${chapter}`}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>{CHAPTER_TITLES[chapter]?.en ?? ''}</div>
        </div>
        <div style={{
          width: 44, height: 44, flex: '0 0 auto',
          background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: '#fff', fontWeight: 700,
        }}>≡</div>
      </button>

      {/* Lessons + grandma + shiba layout */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <img src="/mascots/calico-anchor.webp" width={80} height={80} alt="" className="pickup-mascot-bob" style={{ opacity: 0.7 }} />
          <div style={{ marginTop: 12, fontSize: 13, color: '#8b6f4a', fontWeight: 600 }}>載入中…</div>
        </div>
      ) : lessons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#8b6f4a' }}>本章內容未上線</div>
      ) : (
        <div style={{ position: 'relative', paddingTop: 20 }}>
          {/* First-visit hint (only show when 0 completed) */}
          {completed.size === 0 && (
            <div style={{
              position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
              background: '#fef3c7', color: '#8b6f4a',
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
              padding: '4px 10px', borderRadius: 10,
              border: '1px dashed #c8a878', zIndex: 5,
              whiteSpace: 'nowrap',
            }}>🐾 點任何節點開始 · Tap to begin</div>
          )}

          {/* Grandma + Shiba mascot duo (idle bob) */}
          <div style={{ position: 'absolute', left: 14, top: 30, zIndex: 1, pointerEvents: 'none' }}>
            <img src="/mascots/iso-grandma.webp" alt="" width={100} className="pickup-mascot-bob" />
            <div style={{ width: 80, height: 8, background: 'rgba(60,42,28,0.18)', borderRadius: '50%', marginTop: -4, marginLeft: 8 }} />
          </div>
          <div style={{ position: 'absolute', left: 115, top: 80, zIndex: 1, pointerEvents: 'none' }}>
            <img src="/mascots/iso-shiba.webp" alt="" width={64} className="pickup-mascot-bob" style={{ animationDelay: '0.4s' }} />
            <div style={{ width: 54, height: 6, background: 'rgba(60,42,28,0.18)', borderRadius: '50%', marginTop: -2, marginLeft: 4 }} />
          </div>

          {/* Find first non-completed unlocked node for pulse */}
          {(() => {
            // Compute "next to do" index inline for renderless lookup
            return null;
          })()}

          {/* Zigzag paw nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            {lessons.map((l, i) => {
              const cyclePos = i % 4;
              const offsets = [50, 90, 50, 10];
              const left = offsets[cyclePos];
              const done = completed.has(l.id);
              const unlocked = isLessonUnlocked(chapter, l.lessonInChapter, completed.size);
              const isNextToDo = unlocked && !done && lessons.slice(0, i).every(prev => completed.has(prev.id));
              return (
                <button
                  key={l.id}
                  onClick={() => unlocked && navigate(`/lesson/${chapter}/${l.id}`)}
                  disabled={!unlocked}
                  aria-label={`Lesson ${l.lessonInChapter}${unlocked ? '' : ' (locked)'}`}
                  className={isNextToDo ? 'pickup-paw-next' : undefined}
                  style={{
                    width: 96, height: 88,
                    marginLeft: left,
                    background: !unlocked ? '#c8a878' : done ? '#7d9a4f' : '#c8835f',
                    border: 'none',
                    borderBottom: `6px solid ${!unlocked ? '#8b6f4a' : done ? '#5a7330' : '#8b5a3c'}`,
                    borderRadius: '50%',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    opacity: unlocked ? 1 : 0.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    zIndex: 2,
                    filter: unlocked ? 'none' : 'grayscale(1)',
                  }}
                >
                  <img src="/mascots/icon-paw.webp" width={44} height={44} alt="" style={{ opacity: 0.9 }} />
                  {done && (
                    <span style={{ position: 'absolute', top: -6, right: -6, fontSize: 18, background: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #5a7330' }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function HudIcon({ icon, value, accent }: { icon: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: accent ? '#fef3c7' : '#fff7e8', padding: '4px 10px', borderRadius: 14, border: `2px solid ${accent ? '#e7a44a' : '#c8a878'}` }}>
      <img src={icon} alt="" width={20} height={20} style={{ display: 'block' }} />
      <span style={{ fontSize: 13, fontWeight: 900, color: accent ? '#b07a2a' : '#8b6f4a' }}>{value}</span>
    </div>
  );
}
