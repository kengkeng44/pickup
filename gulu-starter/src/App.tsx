import { useState } from 'react';
import PetRoom from './PetRoom';
import Practice from './Practice';

type View = 'room' | 'practice';

export default function App() {
  const [view, setView] = useState<View>('room');
  // key 用來在回房間時強制 PetRoom 重讀 localStorage (成長/孵化更新)。
  const [tick, setTick] = useState(0);

  const backToRoom = () => { setTick((t) => t + 1); setView('room'); };

  return view === 'room'
    ? <PetRoom key={tick} onPractice={() => setView('practice')} />
    : <Practice onExit={backToRoom} onSleep={backToRoom} />;
}
