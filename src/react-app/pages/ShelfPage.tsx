/**
 * v2.0.B.560 — 奶奶的書櫃 (ShelfPage)。
 *
 * 支線故事集中地 (per user 書櫃式拍板): 主線固定順序走, 較不經典的故事收進書櫃,
 * 隨主線進度分批「上架」— 完成 MAINLINE[k] 那一夜, SHELF_BATCHES[k] 這批書就能讀。
 * 卡片點下去 → 該章單章地圖 (/map?ch=N), 跟 ChaptersPage 同路徑。
 * 入口: 地圖右側 📚 浮動鈕。
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';
import { MAINLINE, SHELF_BATCHES } from '../../data/mainline';
import { CHAPTER_META } from './MapPage';
import { getLang } from '../../data/lang';
import { useT } from '../i18n';

// 跟 ChaptersPage 同一套完成標準: 每章 7 關。
const chapterTotal = (chId: number): number => (chId === 32 ? 10 : 7);
const isChapterComplete = (chId: number): boolean => readCompletedLessons(chId).size >= chapterTotal(chId);

export default function ShelfPage() {
  const navigate = useNavigate();
  const { t } = useT();
  const zh = getLang().startsWith('zh');

  const batches = useMemo(() => (
    Object.keys(SHELF_BATCHES).map(Number).sort((a, b) => a - b).map((k) => ({
      afterNight: k + 1,
      unlocked: isChapterComplete(MAINLINE[k]),
      chapters: SHELF_BATCHES[k],
    }))
  ), []);

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', margin: '0 0 2px' }}>
        📚 {t('shelf.title')}
      </h1>
      <div style={{ fontSize: 'var(--t-text-label)', fontWeight: 700, color: 'var(--t-text-muted)', marginBottom: 14 }}>
        {t('shelf.sub')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {batches.flatMap(({ afterNight, unlocked, chapters }) => chapters.map((ch) => {
          const meta = CHAPTER_META[ch];
          if (!meta) return null;
          const done = isChapterComplete(ch);
          return (
            <button
              key={ch}
              type="button"
              onClick={() => { if (unlocked) navigate(`/map?ch=${ch}`); }}
              aria-disabled={!unlocked}
              aria-label={`${zh ? meta.titleZh : meta.titleEn}${unlocked ? '' : ' (locked)'}`}
              className={unlocked ? 'pickup-press' : undefined}
              style={{
                position: 'relative', minHeight: 108, padding: '14px 12px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'var(--t-surface)', textAlign: 'center',
                border: `2px solid ${unlocked ? meta.accent : 'var(--t-border-soft)'}`,
                borderBottom: `4px solid ${unlocked ? meta.accent : 'var(--t-border-soft)'}`,
                borderRadius: 'var(--t-radius-card)',
                cursor: unlocked ? 'pointer' : 'default', fontFamily: 'inherit',
                opacity: unlocked ? 1 : 0.55,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
            >
              <span style={{ fontSize: 34, lineHeight: 1, filter: unlocked ? 'none' : 'grayscale(1)' }} aria-hidden="true">
                {unlocked ? meta.emoji : '🔒'}
              </span>
              <span style={{ fontSize: 'var(--t-text-label)', fontWeight: 900, color: unlocked ? 'var(--t-text)' : 'var(--t-text-muted)', lineHeight: 1.3 }}>
                {zh ? meta.titleZh : meta.titleEn}
              </span>
              {!unlocked && (
                <span style={{ fontSize: 'var(--t-text-micro)', fontWeight: 700, color: 'var(--t-text-muted)' }}>
                  {t('shelf.lockHint').replace('{n}', String(afterNight))}
                </span>
              )}
              {done && (
                <span aria-hidden="true" style={{
                  position: 'absolute', top: 6, right: 8, fontSize: 15,
                }}>⭐</span>
              )}
            </button>
          );
        }))}
      </div>
    </div>
  );
}
