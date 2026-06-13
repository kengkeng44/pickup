/**
 * v2.0.B.283 — Mochi Bond copy.
 * Baked from /tmp/mochi_bond_copy.json (source of truth).
 * Warm, bilingual, zero-guilt. Drafted Opus; polish with Fable later.
 *
 * DO NOT read from /tmp at runtime — all copy is inlined here.
 */

export type StageKey = 'shy' | 'curious' | 'warming' | 'trusting' | 'family';
export type GreetingBucket = 'sameDay' | 'nextDay' | 'fewDays';

export interface BondStage {
  id: 1 | 2 | 3 | 4 | 5;
  key: StageKey;
  /** Point threshold to ENTER this stage (inclusive). */
  threshold: number;
  name_zh: string;
  name_en: string;
  desc_zh: string;
  desc_en: string;
}

export interface BilingualLine {
  zh: string;
  en: string;
}

export interface BondCopy {
  points: {
    perLesson: number;
    perNewDay: number;
  };
  stages: readonly BondStage[];
  greetings: Record<GreetingBucket, Record<StageKey, BilingualLine>>;
  stageUp: Record<2 | 3 | 4 | 5, BilingualLine>;
  memory: Record<2 | 3 | 4 | 5, BilingualLine>;
}

export const BOND_COPY: BondCopy = {
  points: { perLesson: 10, perNewDay: 20 },
  stages: [
    { id: 1, key: 'shy',      threshold: 0,   name_zh: '怕生',   name_en: 'Shy',      desc_zh: '糰糰在牆角偷偷看你', desc_en: 'Mochi peeks from the wall' },
    { id: 2, key: 'curious',  threshold: 50,  name_zh: '好奇',   name_en: 'Curious',  desc_zh: '糰糰坐在牆上看你聽故事', desc_en: 'Mochi watches from the wall' },
    { id: 3, key: 'warming',  threshold: 150, name_zh: '親近',   name_en: 'Warming',  desc_zh: '糰糰跳下牆,坐在你旁邊', desc_en: 'Mochi sits beside you' },
    { id: 4, key: 'trusting', threshold: 350, name_zh: '信任',   name_en: 'Trusting', desc_zh: '糰糰蜷在你腳邊輕輕呼嚕', desc_en: 'Mochi purrs at your feet' },
    { id: 5, key: 'family',   threshold: 700, name_zh: '家人',   name_en: 'Family',   desc_zh: '糰糰睡在你身邊,還帶小禮物', desc_en: 'Mochi sleeps by you, brings gifts' },
  ] as const,
  greetings: {
    sameDay: {
      shy:      { zh: '糰糰在牆角偷偷看你',           en: 'Mochi peeks at you from the wall' },
      curious:  { zh: '糰糰在牆上等你回來',           en: 'Mochi waited on the wall for you' },
      warming:  { zh: '糰糰跑過來蹭蹭你',             en: 'Mochi runs over for a nuzzle' },
      trusting: { zh: '糰糰窩在你腳邊了',             en: 'Mochi curls up by your feet' },
      family:   { zh: '糰糰打個哈欠,靠著你',          en: 'Mochi yawns and leans on you' },
    },
    nextDay: {
      shy:      { zh: '糰糰聞到你的味道,豎起耳朵',   en: 'Mochi catches your scent, ears up' },
      curious:  { zh: '糰糰看到你,尾巴翹起來',       en: 'Mochi sees you, tail goes up' },
      warming:  { zh: '糰糰一溜煙跳下牆',             en: 'Mochi hops down in a flash' },
      trusting: { zh: '糰糰開心地繞著你轉',           en: 'Mochi circles you, so happy' },
      family:   { zh: '糰糰把頭靠進你手心',           en: 'Mochi nudges into your hand' },
    },
    fewDays: {
      shy:      { zh: '糰糰還記得你,慢慢走近',       en: 'Mochi remembers you, comes closer' },
      curious:  { zh: '糰糰眼睛一亮 — 是你!',        en: "Mochi's eyes light up — it's you!" },
      warming:  { zh: '糰糰飛奔過來迎接你',           en: 'Mochi dashes over to greet you' },
      trusting: { zh: '糰糰今晚呼嚕得好大聲',         en: 'Mochi purrs extra loud tonight' },
      family:   { zh: '糰糰像家人回來一樣黏你',       en: 'Mochi clings like family come home' },
    },
  },
  stageUp: {
    2: { zh: '糰糰願意坐到牆上看你了', en: 'Mochi now sits on the wall for you' },
    3: { zh: '糰糰跳下牆,坐到你身邊', en: 'Mochi hopped down to sit with you' },
    4: { zh: '糰糰在你腳邊呼嚕了',     en: 'Mochi purrs at your feet now' },
    5: { zh: '糰糰把你當成家人了',     en: 'Mochi sees you as family now' },
  },
  memory: {
    2: { zh: '那一晚,牆上多了一雙發亮的眼睛。', en: 'That night, two bright eyes joined the wall.' },
    3: { zh: '那一晚,糰糰第一次坐在你身邊。',   en: 'That night, Mochi first sat by your side.' },
    4: { zh: '那一晚,呼嚕聲陪你聽完了故事。',   en: 'That night, a purr stayed through the story.' },
    5: { zh: '那一晚,糰糰留下來,沒有再離開。', en: 'That night, Mochi stayed and never left.' },
  },
} as const;
