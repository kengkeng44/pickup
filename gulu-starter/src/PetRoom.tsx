import { readPet, levelProgress } from './petState';
import { creatureById } from './creatures';
import { canPlay, wrongToday, DAILY_WRONG_CAP } from './gate';

// 主畫面: 寵物房。蛋 / 咕嚕 + 等級 + 成長條 + 練習入口 + 睡覺閘。
export default function PetRoom({ onPractice }: { onPractice: () => void }) {
  const pet = readPet();
  const creature = creatureById(pet.creatureId);
  const asleep = !canPlay();
  const wrong = wrongToday();

  return (
    <div className="wrap room">
      <div className="stage" style={creature ? { background: creature.color + '22' } : undefined}>
        <div className={`hero ${asleep ? 'sleep' : ''}`}>
          {pet.hatched && creature ? creature.emoji : '🥚'}
        </div>
        <div className="name">
          {pet.hatched && creature ? creature.zh : '神秘的蛋'}
          {asleep && ' 😴'}
        </div>
      </div>

      {pet.hatched && (
        <>
          <div className="lvrow"><span>Lv {pet.level}</span><span className="muted">{pet.growth} 成長值</span></div>
          <div className="bar"><div className="fill" style={{ width: `${Math.round(levelProgress(pet) * 100)}%` }} /></div>
        </>
      )}
      {!pet.hatched && <p className="muted center">餵咕嚕吃單字,蛋就會孵化…</p>}

      {asleep ? (
        <div className="sleepbox">
          <p>咕嚕今天學累了,睡著了 😴</p>
          <p className="muted">明天再一起學!(今天答錯 {wrong}/{DAILY_WRONG_CAP})</p>
        </div>
      ) : (
        <button className="btn primary" onClick={onPractice}>
          {pet.hatched ? '餵單字 · 開始練習' : '孵蛋 · 開始練習'}
        </button>
      )}

      <p className="foot muted">今天還可以錯 {Math.max(0, DAILY_WRONG_CAP - wrong)} 題</p>
    </div>
  );
}
