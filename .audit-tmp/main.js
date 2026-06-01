import{n as e,r as t}from"./rolldown-runtime-QTnfLwEv.js";import{t as n}from"./phaser-By8L8qVY.js";import{t as r}from"./zustand-zArLrEpr.js";import{a as i,c as a,d as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./zod-Cohpjn9R.js";var h=t(n(),1),g=`pickup.streak.count`,_=`pickup.streak.lastDate`;function v(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function y(e,t){let n=new Date(e+`T00:00:00`),r=new Date(t+`T00:00:00`);return Math.round((r.getTime()-n.getTime())/(1440*60*1e3))}function b(){if(typeof localStorage>`u`)return 0;try{let e=localStorage.getItem(g),t=e==null?0:Number(e);return Number.isFinite(t)&&t>=0?Math.floor(t):0}catch{return 0}}function ee(){if(typeof localStorage>`u`)return null;try{return localStorage.getItem(_)}catch{return null}}function te(){if(typeof localStorage>`u`)return 0;let e=v(),t=ee(),n=b();if(!t)n=1;else if(t===e)return n;else y(t,e)===1?n+=1:n=1;try{localStorage.setItem(g,String(n)),localStorage.setItem(_,e)}catch{}return n}var ne=class extends h.default.Scene{constructor(){super({key:`BootScene`})}create(){this.cameras.main.setBackgroundColor(`#fef8ed`),te(),this.time.delayedCall(0,()=>this.scene.start(`StoryModeScene`))}},re=`wordwar.audioMuted`,ie=`wordwar.hapticsMuted`,ae=.18,oe=.5,se=class e{static _instance;ctx;masterGain;bgmGain;sfxGain;warnGain;bgmStop;warningStop;_audioMuted;_hapticsMuted;listeners=new Set;static get instance(){return e._instance||=new e,e._instance}constructor(){this._audioMuted=ce(re,!1);let e=!ue();this._hapticsMuted=ce(ie,e),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{this.ctx&&(document.hidden?this.ctx.suspend().catch(()=>{}):this._audioMuted||this.ctx.resume().catch(()=>{}))})}ensureContext(){if(typeof window>`u`)return;if(this.ctx)return this.ctx.state===`suspended`&&!this._audioMuted&&this.ctx.resume().catch(()=>{}),this.ctx;let e=window.AudioContext??window.webkitAudioContext;if(!e)return;let t=new e;return this.ctx=t,this.masterGain=t.createGain(),this.masterGain.gain.value=+!this._audioMuted,this.masterGain.connect(t.destination),this.bgmGain=t.createGain(),this.bgmGain.gain.value=ae,this.bgmGain.connect(this.masterGain),this.sfxGain=t.createGain(),this.sfxGain.gain.value=oe,this.sfxGain.connect(this.masterGain),this.warnGain=t.createGain(),this.warnGain.gain.value=0,this.warnGain.connect(this.masterGain),t}getWarnDestination(){return this.warnGain}playWarningLayer(){if(this.warningStop||this._audioMuted)return;let e=this.ensureContext();if(!e||!this.warnGain)return;let t=e.createOscillator(),n=e.createOscillator();t.type=`sine`,n.type=`sine`,t.frequency.value=110,n.frequency.value=116;let r=e.createGain();r.gain.value=0,t.connect(r),n.connect(r),r.connect(this.warnGain);let i=e.currentTime;this.warnGain.gain.cancelScheduledValues(i),this.warnGain.gain.setValueAtTime(0,i),this.warnGain.gain.linearRampToValueAtTime(.35,i+.2),t.start(i),n.start(i);for(let e=0;e<8;e++){let t=i+e*.8;r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.6,t+.05),r.gain.exponentialRampToValueAtTime(1e-4,t+.3)}this.warningStop=()=>{let r=e.currentTime;this.warnGain&&(this.warnGain.gain.cancelScheduledValues(r),this.warnGain.gain.setValueAtTime(this.warnGain.gain.value,r),this.warnGain.gain.linearRampToValueAtTime(0,r+.08));try{t.stop(r+.1),n.stop(r+.1)}catch{}}}stopWarningLayer(){this.warningStop?.(),this.warningStop=void 0}get audioMuted(){return this._audioMuted}setAudioMuted(e){this._audioMuted!==e&&(this._audioMuted=e,le(re,e),this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(+!e,this.ctx.currentTime),e&&(this.stopBgm(),this.stopWarningLayer()),this.emit())}toggleAudioMuted(){this.setAudioMuted(!this._audioMuted)}get hapticsMuted(){return this._hapticsMuted}setHapticsMuted(e){this._hapticsMuted!==e&&(this._hapticsMuted=e,le(ie,e),this.emit())}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(){for(let e of this.listeners)e()}getSfxDestination(){return this.sfxGain}getBgmDestination(){return this.bgmGain}duckCount=0;duckBgm(){if(this.duckCount+=1,!this.bgmGain||!this.ctx)return;let e=this.ctx.currentTime,t=this.bgmGain.gain;t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(ae*.1,e+.3)}unduckBgm(){if(this.duckCount=Math.max(0,this.duckCount-1),this.duckCount>0||!this.bgmGain||!this.ctx)return;let e=this.ctx.currentTime,t=this.bgmGain.gain;t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(ae,e+.3)}registerBgm(e){this.bgmStop?.(),this.bgmStop=e}get isBgmRunning(){return!!this.bgmStop}stopBgm(){this.bgmStop?.(),this.bgmStop=void 0}vibrate(e){if(this._hapticsMuted||typeof navigator>`u`)return!1;let t=navigator;if(typeof t.vibrate!=`function`)return!1;try{return t.vibrate(e)}catch{return!1}}};function ce(e,t){if(typeof localStorage>`u`)return t;try{let n=localStorage.getItem(e);return n===null?t:n===`1`||n===`true`}catch{return t}}function le(e,t){if(!(typeof localStorage>`u`))try{localStorage.setItem(e,t?`1`:`0`)}catch{}}function ue(){return typeof window>`u`?!1:`ontouchstart`in window||typeof navigator<`u`&&navigator.maxTouchPoints>0}var x=se.instance;function S(e,t=0){let n=x.ctx,r=x.getSfxDestination();if(!n||!r)return;let i=n.currentTime+t,a=n.createOscillator(),o=n.createGain();a.type=e.type??`sine`,a.frequency.setValueAtTime(e.freq,i),e.detune&&a.detune.setValueAtTime(e.detune,i);let s=e.attack??.005,c=e.duration,l=e.release??Math.max(.02,c-s),u=e.gain??.6;o.gain.setValueAtTime(0,i),o.gain.linearRampToValueAtTime(u,i+s),o.gain.exponentialRampToValueAtTime(Math.max(1e-4,u*.7),i+s+Math.min(.02,c*.2)),o.gain.exponentialRampToValueAtTime(1e-4,i+s+l),a.connect(o),o.connect(r),a.start(i),a.stop(i+s+l+.02)}function de(e){let t=x.ctx,n=x.getSfxDestination();if(!t||!n)return;let r=t.currentTime,i=e.duration,a=Math.max(1,Math.floor(t.sampleRate*i)),o=t.createBuffer(1,a,t.sampleRate),s=o.getChannelData(0);for(let e=0;e<a;e++)s[e]=Math.random()*2-1;let c=t.createBufferSource();c.buffer=o;let l=t.createBiquadFilter();l.type=e.type??`lowpass`,l.frequency.value=e.cutoff??1200;let u=t.createGain(),d=e.gain??.4;u.gain.setValueAtTime(0,r),u.gain.linearRampToValueAtTime(d,r+.005),u.gain.exponentialRampToValueAtTime(1e-4,r+i),c.connect(l),l.connect(u),u.connect(n),c.start(r),c.stop(r+i+.02)}function fe(){x.ensureContext(),S({freq:880,type:`triangle`,duration:.05,attack:.002,gain:.18})}function pe(e,t,n,r=0){let i=x.ctx,a=x.getSfxDestination();if(!i||!a)return;let o=i.currentTime+r,s=[{mult:1,amp:1},{mult:2,amp:.35},{mult:3,amp:.18},{mult:4.2,amp:.08}],c=.04,l=Math.max(.04,t*.25),u=o+t;for(let t of s){let r=i.createOscillator(),s=i.createGain();r.type=`sine`,r.frequency.setValueAtTime(e*t.mult,o);let d=n*t.amp;s.gain.setValueAtTime(0,o),s.gain.linearRampToValueAtTime(d,o+c),s.gain.exponentialRampToValueAtTime(Math.max(1e-4,d*.5),o+c+l),s.gain.exponentialRampToValueAtTime(1e-4,u),r.connect(s),s.connect(a),r.start(o),r.stop(u+.02)}}function me(){x.ensureContext(),pe(659.25,.5,.26,0),pe(987.77,.46,.22,.09),S({freq:523.25,type:`sine`,duration:.42,attack:.04,gain:.1},.02),S({freq:659.25,type:`sine`,duration:.42,attack:.04,gain:.08},.02),S({freq:783.99,type:`sine`,duration:.42,attack:.04,gain:.07},.02)}function he(){x.ensureContext();let e=x.ctx,t=x.getSfxDestination();if(!e||!t)return;let n=e.currentTime,r=(r,i,a,o)=>{let s=n+i,c=e.createOscillator(),l=e.createGain();c.type=`sine`,c.frequency.setValueAtTime(r,s),c.frequency.exponentialRampToValueAtTime(Math.max(20,r*.94),s+a),l.gain.setValueAtTime(0,s),l.gain.linearRampToValueAtTime(o,s+.025),l.gain.setValueAtTime(o,s+a*.35),l.gain.exponentialRampToValueAtTime(1e-4,s+a),c.connect(l),l.connect(t),c.start(s),c.stop(s+a+.02)};r(440,0,.16,.22),r(349.23,.11,.22,.24)}function ge(){x.ensureContext(),S({freq:1500,type:`square`,duration:.04,attack:.001,gain:.1})}function _e(){x.ensureContext();let e=x.ctx,t=x.getSfxDestination();if(!e||!t)return;let n=e.currentTime,r=e.createOscillator(),i=e.createGain();r.type=`sine`,r.frequency.setValueAtTime(220,n),r.frequency.exponentialRampToValueAtTime(880,n+.22),i.gain.setValueAtTime(0,n),i.gain.linearRampToValueAtTime(.18,n+.02),i.gain.exponentialRampToValueAtTime(1e-4,n+.22),r.connect(i),i.connect(t),r.start(n),r.stop(n+.25)}function ve(){x.ensureContext(),S({freq:1200,type:`triangle`,duration:.03,attack:.001,gain:.1})}function ye(){x.ensureContext(),S({freq:110,type:`sawtooth`,duration:.18,gain:.25}),de({duration:.15,cutoff:200,gain:.28})}function be(){x.ensureContext(),[523.25,659.25,783.99,1046.5,1318.51].forEach((e,t)=>{S({freq:e,type:`triangle`,duration:.25,attack:.01,gain:.3},t*.09)})}var xe=class extends h.default.Scene{constructor(){super({key:`MenuScene`})}create(){this.cameras.main.setBackgroundColor(`#fef8ed`),x.ensureContext(),this.scene.start(`StoryModeScene`)}},Se=`pickup.xp.total`;function Ce(){if(typeof localStorage>`u`)return 0;try{let e=localStorage.getItem(Se);if(!e)return 0;let t=Number(e);return Number.isFinite(t)&&t>=0?Math.floor(t):0}catch{return 0}}function we(e){let t=Ce(),n=Math.max(0,t+Math.round(e));try{localStorage.setItem(Se,String(n))}catch{}return n}function Te(e){return Math.floor(Math.sqrt(Math.max(0,e)/50))+1}function Ee(e){return 50*Math.max(0,e-1)**2}function De(e){let t=Te(e),n=Ee(t),r=Ee(t+1),i=r-n,a=e-n,o=i>0?Math.min(1,a/i):0;return{level:t,intoLevel:a,nextLevelAt:r-n,fraction:o}}var Oe=`pickup.coins.total`;function ke(){if(typeof localStorage>`u`)return 0;try{let e=localStorage.getItem(Oe),t=e==null?0:Number(e);return Number.isFinite(t)&&t>=0?Math.floor(t):0}catch{return 0}}function Ae(e){let t=ke(),n=Math.max(0,t+Math.round(e));try{localStorage.setItem(Oe,String(n))}catch{}return n}var je=d([`A1`,`A2`,`B1`,`B2`,`C1`,`C2`]),Me=d([`easy`,`medium`,`hard`]),C={id:a(),level:je,difficulty:Me.optional(),sentence:a(),question:a().optional(),explanationZh:a(),tags:p(a()).optional(),speaker:d([`grandma`,`mochi`,`hana`,`narrator`]).optional(),subSkill:d([`gist`,`detail`,`inference`,`vocab`,`function`]).optional()},w=u({...C,options:c([a(),a(),a(),a()]),optionsZh:c([a(),a(),a(),a()]).optional(),correctIndex:m([s(0),s(1),s(2),s(3)])}),Ne=w.extend({type:s(`listen-mc`)}),Pe=w.extend({type:s(`listen-emoji`)}),Fe=w.extend({type:s(`listen-comprehension`)}),Ie=w.extend({type:s(`read-mc-with-audio`)}),Le=w.extend({type:s(`type-what-you-hear`)}),Re=u({...C,type:s(`narration`)}),ze=u({...C,type:s(`listen-tf-zh`),questionZh:a(),options:c([a(),a()]),optionsZh:c([a(),a()]),correctIndex:m([s(0),s(1)])}),Be=u({...C,type:s(`listen-tf`),questionEn:a(),options:c([a(),a()]),correctIndex:m([s(0),s(1)])}),Ve=l(`type`,[Ne,Pe,Fe,Ie,Le,u({...C,type:s(`tap-tiles`),tiles:p(a()).min(3).max(12),correctOrder:p(i().int().nonnegative()).min(2)}),u({...C,type:s(`tap-pairs`),pairs:p(u({left:a(),right:a()})).length(4)}),Re,ze,Be]).superRefine((e,t)=>{e.type===`tap-tiles`&&(e.correctOrder.every(t=>t<e.tiles.length)||t.addIssue({code:o.custom,message:`correctOrder indices must be < tiles.length`,path:[`correctOrder`]}))}),He=d([`outer-prologue`,`main-story`,`aesop-side`,`outer-outro`,`review`]),Ue=m([s(1),s(2),s(3),s(4),s(5),s(6),s(7),s(8)]),We=u({en:a(),zh:a()}),Ge=p(u({id:a(),chapter:Ue,lessonInChapter:i().int().min(1).max(25),segmentType:He,storyId:a().optional(),storyBeat:a().optional(),intro:We.optional(),questions:p(Ve).min(3).max(15)})),Ke=new Map;async function qe(e){let t=Ke.get(e);if(t)return t;let n=await fetch(`/lessons-ch${e}.json`);if(!n.ok)throw Error(`Failed to fetch lessons-ch${e}.json: ${n.status}`);let r=await n.json(),i=Ge.parse(r);return Ke.set(e,i),i}function Je(e,t){return e.find(e=>e.id===t)}var Ye=f(e=>Array.isArray(e)?e.map(e=>e&&typeof e==`object`&&!(`type`in e)?{...e,type:`listen-mc`}:e):e,p(Ve));function Xe(e){return e.difficulty??`medium`}function Ze(e,t){let n=e.filter(e=>Xe(e)===t);if(n.length>0)return n;let r=t===`easy`?[`medium`,`hard`]:t===`hard`?[`medium`,`easy`]:[`easy`,`hard`];for(let t of r){let n=e.filter(e=>Xe(e)===t);if(n.length>0)return n}return e}var Qe=null;async function $e(){if(Qe)return Qe;let e=await fetch(`/sentences.json`);if(!e.ok)throw Error(`Failed to fetch sentences.json: ${e.status}`);let t=await e.json(),n=Ye.parse(t);return Qe=n,n}function et(e,t,n){let r=tt(e.filter(e=>e.level===t));return typeof n==`number`?r.slice(0,n):r}function tt(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var nt=d([`restaurant`,`airport`,`hospital`,`office`,`hotel`]),rt=p(w.extend({type:s(`listen-mc`).default(`listen-mc`),scenario:nt,scenarioOrder:i().int().min(0).max(9)})),it=null;async function at(){if(it)return it;let e=await fetch(`/scenarios.json`);if(!e.ok)throw Error(`Failed to fetch scenarios.json: ${e.status}`);let t=await e.json(),n=rt.parse(t);return it=n,n}function ot(e,t){return e.filter(e=>e.scenario===t).sort((e,t)=>e.scenarioOrder-t.scenarioOrder)}function st(e){return{id:e.id,level:e.level,sentence:e.sentence,options:e.options,correctIndex:e.correctIndex,explanationZh:e.explanationZh,tags:e.tags,type:`listen-mc`}}var ct={restaurant:{id:`restaurant`,emoji:``,labelZh:`餐廳`,labelEn:`Restaurant`,accent:`#f08a3e`,tint:`#fff1e0`,mascotId:`waiter`,achievement:`You handled the restaurant conversation`},airport:{id:`airport`,emoji:``,labelZh:`機場`,labelEn:`Airport`,accent:`#4aa8d8`,tint:`#e6f3fb`,mascotId:`flightAttendant`,achievement:`You navigated the airport`},hospital:{id:`hospital`,emoji:``,labelZh:`醫院`,labelEn:`Hospital`,accent:`#3aa89b`,tint:`#e1f3f1`,mascotId:`doctor`,achievement:`You handled the hospital visit`},office:{id:`office`,emoji:``,labelZh:`辦公室`,labelEn:`Office`,accent:`#6a6dd3`,tint:`#ebebfb`,mascotId:`coworker`,achievement:`You held your own at the office`},hotel:{id:`hotel`,emoji:``,labelZh:`飯店`,labelEn:`Hotel`,accent:`#cba24a`,tint:`#f8f0d8`,mascotId:`receptionist`,achievement:`You handled the hotel check-in`}},lt=[`restaurant`,`airport`,`hospital`,`office`,`hotel`],ut={accent:`#ff7a59`,tint:`#e0f5d0`,mascotId:`owl`,emoji:``,labelZh:`Free Practice`,labelEn:`Free Practice`},dt=`wordwar.scenarioBest.`,ft=`wordwar.scenarioCompleted.`;function pt(e){if(typeof localStorage>`u`)return 0;try{let t=localStorage.getItem(dt+e),n=t?parseInt(t,10):0;return Number.isFinite(n)?n:0}catch{return 0}}function mt(e,t){if(typeof localStorage>`u`||t<=pt(e))return!1;try{return localStorage.setItem(dt+e,String(t)),!0}catch{return!1}}function ht(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(ft+e,`1`)}catch{}}var gt=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),_t=function(e){return`/`+e},vt={},yt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=_t(t,n),t in vt)return;vt[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:gt,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},bt=m([s(1),s(2),s(3),s(4),s(5),s(6),s(7),s(8)]),xt=d([`listen-mc`,`listen-emoji`,`listen-comprehension`,`read-mc-with-audio`,`tap-tiles`,`tap-pairs`,`type-what-you-hear`]),St=p(u({id:a(),level:je,difficulty:Me.optional(),sentence:a(),options:c([a(),a(),a(),a()]).optional(),correctIndex:m([s(0),s(1),s(2),s(3)]).optional(),explanationZh:a(),tags:p(a()).optional(),type:xt.optional(),question:a().optional(),tiles:p(a()).optional(),correctOrder:p(i().int()).optional(),pairs:p(u({left:a(),right:a()})).optional(),chapter:bt,questionInChapter:i().int().min(1).max(8),storyBeat:a().optional()})),Ct=null;async function wt(){if(Ct)return Ct;let e=await fetch(`/story-kitten.json`);if(!e.ok)throw Error(`Failed to fetch story-kitten.json: ${e.status}`);let t=await e.json(),n=St.parse(t),{applyCatName:r}=await yt(async()=>{let{applyCatName:e}=await Promise.resolve().then(()=>ni);return{applyCatName:e}},void 0),{applyDogName:i}=await yt(async()=>{let{applyDogName:e}=await Promise.resolve().then(()=>li);return{applyDogName:e}},void 0),a=n.map(e=>({...e,sentence:i(r(e.sentence)),explanationZh:i(r(e.explanationZh)),storyBeat:e.storyBeat?i(r(e.storyBeat)):e.storyBeat}));return Ct=a,a}function Tt(e,t){return e.filter(e=>e.chapter===t).sort((e,t)=>e.questionInChapter-t.questionInChapter)}function Et(e){return{id:e.id,level:e.level,sentence:e.sentence,options:e.options,correctIndex:e.correctIndex,explanationZh:e.explanationZh,tags:e.tags,type:e.type??`listen-mc`,question:e.question,tiles:e.tiles,correctOrder:e.correctOrder,pairs:e.pairs}}var T={1:{id:1,emoji:``,titleZh:`院子裡的第一個故事`,titleEn:`A Story in the Yard`,narration:`I am {catName}. I am a stray cat.

Every night, I visit one yard. Grandma and her dog {dogName} are there.

Grandma tells stories. I listen with {dogName}.

Tonight, she tells one about me…`,outro:`The story ends. {dogName} is asleep on the floor.

I walk back to the street. Goodnight, Grandma. Goodnight, {dogName}.

See you tomorrow night.`,kittenMascotId:`kittenCh1`,npcMascotId:`npcGrandma`,tint:`#fce5d6`,accent:`#d68a52`},2:{id:2,emoji:``,titleZh:`街頭智者`,titleEn:`The Street Sage`,narration:`The kitten curls up behind a bakery. A warm, sweet smell drifts out the back door.

The door swings open. A baker in a white apron steps out, a piece of bread in his hand…`,outro:`The kitten eats her fill and rubs against his ankles. From today on, she's not just a stray.`,kittenMascotId:`kittenCh2`,npcMascotId:`npcBaker`,tint:`#fce8c2`,accent:`#e7a44a`},3:{id:3,emoji:``,titleZh:`麵包店的選擇`,titleEn:`The Baker's Choice`,narration:`By the park bench, a little girl with a ponytail watches the kitten from afar. A small bag of cat treats is cupped in her hands.

"Hi. I'm Meimei," she whispers…`,outro:`Meimei comes every day. Slowly, the kitten lets her hand close in. The world is gentler than she thought.`,kittenMascotId:`kittenCh3`,npcMascotId:`npcMeimei`,tint:`#fde2e8`,accent:`#e7659c`},4:{id:4,emoji:``,titleZh:`小女孩的秘密`,titleEn:`The Girl's Secret`,narration:`At a street corner, an old one-eyed dog named Brutus pads up. He looks rough, but he steps between the kitten and a snarling bigger dog and drives it off.

Low and steady, he says: "Come with me. I'll teach you…"`,outro:`Brutus and the kitten cross the streets together. So the streets can hold family too.`,kittenMascotId:`kittenCh4`,npcMascotId:`npcBrutus`,tint:`#d8dfd0`,accent:`#6e7d5a`},5:{id:5,emoji:``,titleZh:`永遠的家`,titleEn:`A Forever Home`,narration:`Meimei brings her parents to the park. Her mother kneels down, gently strokes the kitten's head.

"Will you come home with us?"`,outro:`Inside the house: warm lamps, warm food, and arms that hold her. Mom smiles. Meimei cries. Dad nudges the heater one notch higher.

That night, the kitten curls up by the window. Outside, snow begins to fall — slow, soft, one flake at a time.

"They chose me," she thinks, watching her blurred reflection. "But did I choose this home?"

The window isn't latched tight. She slips through it, soft paws sinking into snow.

"I need to know — if I come back one day, that it's because I want to. Not because I have nowhere else to go."`,kittenMascotId:`kittenCh5`,npcMascotId:`npcFamily`,tint:`#fef0d0`,accent:`#e7a44a`},6:{id:6,emoji:``,titleZh:`寒冬考驗`,titleEn:`Winter's Trial`,narration:`She slips through the unlatched window. Her pawprints, one by one, are slowly buried by fresh snow.

The wind bites. The world is quiet enough to hear her own breath. She walks and walks, and slips into a dream — and out of that dream walks a familiar shape: Old Black, the street's old mentor, a friend long gone.

"Kid," he says, looking at her, "you finally made a choice for yourself. The choosing itself — that's growing up."`,outro:`She stands up in the snow. Pawprint by pawprint, deep and sure, she keeps moving forward.

She's no longer just the kitten being taken care of. She chose to live. She chose to walk on. In this moment, she grew up.`,kittenMascotId:`kittenCh4`,npcMascotId:`npcBrutus`,tint:`#dfe7ee`,accent:`#6a7d8f`},7:{id:7,emoji:``,titleZh:`神社的相遇`,titleEn:`The Shrine Encounter`,narration:`The snow keeps falling, until she walks up the stone steps of a small mountain shrine.

Strangely, the moment her paw touches the stone, the snow stops. Moonlight slips through a crack in the clouds, falling soft on the vermilion gate.

Beside the incense bowl sits a presence she can't quite see — like mist, like light, like a very, very old cat.

"No one walks into your story by accident," it says, quietly. "Every person you meet is a stone on the path home."`,outro:`She sits at the shrine through the night. For the first time, she knows where she belongs —

not under one roof, but with a certain group of people.`,kittenMascotId:`kittenCh5`,npcMascotId:`npcGrandma`,tint:`#e8e0ee`,accent:`#8a6ea8`},8:{id:8,emoji:``,titleZh:`選擇了家人`,titleEn:`Choosing Family`,narration:`Just before dawn, Meimei finds her in the snow.

Meimei's eyes are red — from the night that unlatched window swung open in Chapter 5, she and her parents searched for days. She lifts the calico into her arms, no scolding, just holding her, holding her.

A warm bath. Soft towels. Tiny dried fish stewed until they fall apart. And then the small soft bed. She sleeps — really sleeps this time, safer than safe.`,outro:`She wakes in the middle of the night.

Far, far away, the wind carries a familiar bark — Brutus, still out there, tiredness in his voice.

She remembers what the shrine spirit said: "Every person you meet is a stone on the path home." Brutus, the umbrella grandma, the baker — they were her family too. Not only the people inside this window.

She sits a long time at the edge of Meimei's bed. Then softly drops to the floor, leaving a trail of prints across fresh snow that lead to Meimei's door.

Meimei doesn't wake. But in her sleep, she reaches out a hand — as if she already knew — and gently, lets go.

The calico slips through the unlatched window once more.

This time, not running away. Going to find her people.

She finds Brutus at the corner, limping, surrounded by a shivering kitten and two or three old friends of the street. Brutus lifts his head; light glints in his one good eye.

"I knew you'd come back."

She doesn't answer. She just walks into the middle of them and gently presses her head against the shivering kitten.

In that moment she understands —
She had a home. Now, she chose her family.

The snow starts again. But this time she's no longer the kitten the wind pushes around.
She is the one they circle around. The center.`,kittenMascotId:`kittenCh5`,npcMascotId:`npcBrutus`,tint:`#dfe7ee`,accent:`#6a7d8f`}},Dt=[1],Ot=`wordwar.story.chapterProgress`,kt=`wordwar.srs.kitten`;function E(){if(typeof localStorage>`u`)return{highestCompleted:0};try{let e=localStorage.getItem(Ot);if(!e)return{highestCompleted:0};let t=JSON.parse(e),n=Number(t.highestCompleted);if(Number.isFinite(n)&&n>=0&&n<=8)return{highestCompleted:Math.floor(n)}}catch{}return{highestCompleted:0}}function At(e){if(typeof localStorage>`u`)return;let t=E(),n={highestCompleted:Math.max(t.highestCompleted,e)};try{localStorage.setItem(Ot,JSON.stringify(n))}catch{}}function jt(){if(!(typeof localStorage>`u`))try{localStorage.removeItem(Ot),localStorage.removeItem(kt)}catch{}}function Mt(e){if(e===1)return!0;let{highestCompleted:t}=E();return t>=e-1}function Nt(e){let{highestCompleted:t}=E();return t>=e}function Pt(){if(typeof localStorage>`u`)return[];try{let e=localStorage.getItem(kt);if(!e)return[];let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return[]}function Ft(e){if(!(typeof localStorage>`u`))try{let t=new Set,n=[];for(let r of e)t.has(r)||(t.add(r),n.push(r));localStorage.setItem(kt,JSON.stringify(n))}catch{}}function It(e){let t=Pt();t.includes(e)||Ft([...t,e])}function Lt(e){Ft(Pt().filter(t=>t!==e))}function Rt(e,t=3){let n=Pt();if(n.length===0)return[];let r=new Map(e.map(e=>[e.id,e])),i=[];for(let e of n){let n=r.get(e);if(n&&i.push(n),i.length>=t)break}return i}var zt=3,Bt=10,Vt=2,Ht=10,Ut=10,Wt=8,Gt=3,Kt=`wordwar.level`,qt=`pickup.difficulty`;function Jt(){if(typeof localStorage>`u`)return`A2`;try{let e=localStorage.getItem(Kt);if(e===`A1`||e===`A2`||e===`B1`||e===`B2`||e===`C1`||e===`C2`)return e}catch{}return`A2`}function Yt(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(Kt,e)}catch{}}function Xt(){if(typeof localStorage>`u`)return`medium`;try{let e=localStorage.getItem(qt);if(e===`easy`||e===`medium`||e===`hard`)return e}catch{}return`medium`}function Zt(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(qt,e)}catch{}}var D=r((e,t)=>({questions:null,scenarioQuestions:null,storyQuestions:null,pool:[],round:null,score:0,hp:zt,streak:0,bestStreak:0,history:[],lastResult:null,answered:!1,awaitingRetry:!1,wrongAttempts:0,runStartedAt:0,mode:`free`,scenario:null,chapter:null,level:Jt(),difficulty:Xt(),storyNewQuestionCount:0,storyTotalQuestionCount:0,loading:!1,error:null,loadContent:async()=>{if(!t().loading&&!(t().questions&&t().scenarioQuestions&&t().storyQuestions)){e({loading:!0,error:null});try{let[n,r,i]=await Promise.all([t().questions?Promise.resolve(t().questions):$e(),t().scenarioQuestions?Promise.resolve(t().scenarioQuestions):at(),t().storyQuestions?Promise.resolve(t().storyQuestions):wt()]);e({questions:n,scenarioQuestions:r,storyQuestions:i,loading:!1})}catch(t){e({loading:!1,error:t instanceof Error?t.message:String(t)})}}},loadSentences:async()=>{await t().loadContent()},loadScenarios:async()=>{await t().loadContent()},setLevel:t=>{Yt(t),e({level:t})},setDifficulty:t=>{Zt(t),e({difficulty:t})},setMode:t=>{e({mode:t})},setScenario:t=>{e({scenario:t})},setChapter:t=>{e({chapter:t})},listeningMode:!1,setListeningMode:t=>{e({listeningMode:t})},startRound:()=>{let{questions:n,scenarioQuestions:r,storyQuestions:i,level:a,difficulty:o,pool:s,mode:c,scenario:l,chapter:u}=t(),d=s;if(d.length===0)if(c===`story`&&u&&i){let t=new Set(Tt(i,u).map(e=>e.id)),n=Rt(i,9).filter(e=>!t.has(e.id)).slice(0,Gt),r=Ze(Tt(i,u),o),a=[...n,...r];d=a.map(Et),e({storyNewQuestionCount:r.length,storyTotalQuestionCount:a.length})}else if(c===`scenario`&&l&&r)d=Ze(ot(r,l),o).map(st);else{let e=n??[],t=(r??[]).map(st);d=et(Ze(e.concat(t),o),a,Ut)}if(d.length===0){e({round:null});return}let[f,...p]=d;e({round:f,pool:p,lastResult:null,answered:!1,awaitingRetry:!1,wrongAttempts:0})},answer:n=>{let{round:r,score:i,hp:a,history:o,streak:s,bestStreak:c,answered:l,mode:u,wrongAttempts:d}=t();if(!r||l)return{correct:!1,pointsGained:0,streak:s,selectedIndex:n,correctIndex:r?.correctIndex??0,explanationZh:r?.explanationZh??``};let f=n===r.correctIndex,p=u===`story`,m=p&&f&&o.some(e=>e.question.id===r.id&&!e.correct),h=f&&!m?s+1:p&&f?s:0,g=f?Math.min(Ht,Math.max(0,s)*Vt):0,_=f?Bt+g:0,v={question:r,selectedIndex:n,correct:f},y={correct:f,pointsGained:_,streak:h,selectedIndex:n,correctIndex:r.correctIndex,explanationZh:r.explanationZh};if(p&&(f?Lt(r.id):It(r.id)),f){let e=t().listeningMode;we(3+ +!!e),Ae(1)}return e({history:[...o,v],score:i+_,hp:p||f?a:Math.max(0,a-1),streak:h,bestStreak:Math.max(c,h),answered:!0,awaitingRetry:p&&!f&&d<1,wrongAttempts:f?0:d+1,lastResult:y}),y},retryRound:()=>{e({answered:!1,awaitingRetry:!1,lastResult:null})},timeoutRound:()=>{let{round:n,hp:r,history:i,answered:a,mode:o}=t();if(!n||a)return{correct:!1,pointsGained:0,streak:0,selectedIndex:-1,correctIndex:n?.correctIndex??0,explanationZh:n?.explanationZh??``};let s={question:n,selectedIndex:null,correct:!1},c={correct:!1,pointsGained:0,streak:0,selectedIndex:-1,correctIndex:n.correctIndex,explanationZh:n.explanationZh},l=o===`story`;return l&&It(n.id),e({history:[...i,s],hp:l?r:Math.max(0,r-1),streak:0,answered:!0,awaitingRetry:l,lastResult:c}),c},completeChapter:()=>{let{chapter:e}=t();e&&At(e)},reset:()=>{e({round:null,pool:[],score:0,hp:zt,streak:0,bestStreak:0,history:[],lastResult:null,answered:!1,awaitingRetry:!1,runStartedAt:Date.now(),storyNewQuestionCount:0,storyTotalQuestionCount:0})}})),O={QUESTIONS_PER_RUN:Ut,STARTING_HP:zt,STORY_QUESTIONS_PER_CHAPTER:Wt,SRS_REVIEW_LIMIT:Gt},Qt=e=>`pickup.chapter.${e}.lessons.completed`;function $t(e){if(typeof localStorage>`u`)return new Set;try{let t=localStorage.getItem(Qt(e));if(!t)return new Set;let n=JSON.parse(t);return new Set(Array.isArray(n)?n:[])}catch{return new Set}}function en(e,t){if(!(typeof localStorage>`u`))try{let n=$t(e);n.add(t),localStorage.setItem(Qt(e),JSON.stringify([...n]))}catch{}}function tn(e,t,n){return t<=10?!0:n>=t-1}var nn=`/audio/peace.mp3`,rn=null,an=null;async function on(e){return rn||an||(an=(async()=>{try{let t=await fetch(nn);if(!t.ok)return console.warn(`[bgm] fetch failed`,t.status,nn),null;let n=await t.arrayBuffer(),r=await e.decodeAudioData(n);return rn=r,r}catch(e){return console.warn(`[bgm] decode failed`,e),null}finally{an=null}})(),an)}function sn(){x.ensureContext();let e=x.ctx,t=x.getBgmDestination();if(!e||!t)return;let n=!1,r=null;on(e).then(i=>{if(!(n||!i)){r=e.createBufferSource(),r.buffer=i,r.loop=!0,r.connect(t);try{r.start()}catch(e){console.warn(`[bgm] source.start failed`,e)}}});let i={stop:()=>{if(!n&&(n=!0,r)){try{r.stop()}catch{}try{r.disconnect()}catch{}r=null}}};return x.registerBgm(()=>i.stop()),i}var k=new Map,A=new Set,cn=null;function ln(e){return e.replace(/\{catName\}/g,`Mochi`).replace(/\{dogName\}/g,`Hana`)}function un(e){let t=5381;for(let n=0;n<e.length;n++)t=Math.imul(t,33)^e.charCodeAt(n)|0;return(t>>>0).toString(16).padStart(8,`0`)}function dn(e){return e.split(/(?<=[.!?])\s+/).map(e=>e.trim()).filter(Boolean)}async function fn(){for(let e of[1])try{let t=await fetch(`/lessons-ch${e}.json`);if(!t.ok)continue;let n=await t.json();for(let e of n)for(let t of e.questions)!t.sentence||!t.id||pn(t.sentence,t.id)}catch{}try{let e=await fetch(`/story-kitten.json`);if(e.ok){let t=await e.json();for(let e of t)e.sentence&&e.id&&pn(e.sentence,e.id)}}catch{}for(let e of[`I am {catName}. I am a stray cat.

Every night, I visit one yard. Grandma and her dog {dogName} are there.

Grandma tells stories. I listen with {dogName}.

Tonight, she tells one about me…`,`The story ends. {dogName} is asleep on the floor.

I walk back to the street. Goodnight, Grandma. Goodnight, {dogName}.

See you tomorrow night.`]){let t=ln(e);for(let e of t.split(/\n+/).map(e=>e.trim()).filter(Boolean)){pn(e,un(e)),A.add(e);for(let t of dn(e))A.add(t)}}for(let e of[`Every night I visit Grandma's yard.`,`{dogName} is Grandma's brown dog.`,`Goodnight, Grandma.`,`Four words I want to remember from tonight.`]){let t=ln(e);A.add(t);for(let e of dn(t))A.add(e)}}function pn(e,t){let n=ln(e);k.has(n)||k.set(n,t);let r=dn(n);if(r.length>1)for(let e of r)k.has(e)||k.set(e,un(e))}function mn(){return cn||=fn(),cn}typeof window<`u`&&mn();var hn=null,gn=null;function _n(){return gn||=new Audio,gn}var j=null,vn=new Map,M=null;function yn(){try{return x.ensureContext()??null}catch{return null}}async function bn(e){if(vn.has(e))return vn.get(e)??null;let t=yn();if(!t)return null;try{let n=await fetch(e);if(!n.ok)return null;let r=await n.arrayBuffer(),i=await new Promise((e,n)=>{t.decodeAudioData(r.slice(0),e,n)});return vn.set(e,i),i}catch(t){return N(`buffer load fail: ${e} ${t?.message?.slice(0,40)}`),null}}function xn(e,t){wn(e,t)}function Sn(e){let t=yn();if(!t)return!1;try{if(t.state===`suspended`&&t.resume(),M){try{M.stop()}catch{}M=null}let n=t.createBufferSource();n.buffer=e,n.connect(t.destination);try{x.duckBgm()}catch{}return n.onended=()=>{M===n&&(M=null);try{x.unduckBgm()}catch{}},n.start(0),M=n,!0}catch(e){return N(`webaudio play fail: ${e?.message?.slice(0,40)}`),!1}}function Cn(e){return e.replace(/_{2,}/g,` `).replace(/\s+/g,` `).trim()}function wn(e,t){if(!(typeof window>`u`||!window.speechSynthesis))try{window.speechSynthesis.cancel();let n=new SpeechSynthesisUtterance(e);n.lang=t,n.rate=.75,n.pitch=1,n.volume=1,window.speechSynthesis.speak(n)}catch{}}function N(e){typeof console<`u`&&console.log(`[TTS]`,e)}var Tn=null;function P(e,t=`en-US`){let n=Cn(e);if(!n){N(`speak: empty text`);return}F();let r=k.size,i=A.has(n),a=k.get(n);if(a){let e=i?`/audio/lessons/mochi-${un(n)}.mp3`:`/audio/lessons/${a}.mp3`;N(`${i?`🐱`:`👵`} speak: ${a} map=${r}`);let o=vn.get(e);if(o&&Sn(o)){N(`webaudio play OK: ${a}`);return}bn(e).then(e=>{e&&Sn(e)?N(`webaudio play (post-load) OK: ${a}`):xn(n,t)});return}else N(`no mp3id (map=${r}) txt=${n.slice(0,40)} → WebSpeech`);wn(n,t)}function F(){if(Tn){try{Tn.stop()}catch{}Tn=null}if(M){try{M.stop()}catch{}M=null}if(hn){try{hn.pause(),hn.currentTime=0,hn.src=``}catch{}hn=null}if(typeof window<`u`&&window.speechSynthesis)try{window.speechSynthesis.cancel()}catch{}}async function En(e){await mn();let t=yn();if(t&&t.state===`suspended`)try{await t.resume()}catch{}let n=new Set;for(let[e,t]of k.entries())A.has(e)?n.add(`/audio/lessons/mochi-${un(e)}.mp3`):n.add(`/audio/lessons/${t}.mp3`);await Promise.allSettled(Array.from(n).map(e=>bn(e))),N(`warmUp Ch${e}: ${vn.size} buffers cached`)}var Dn=typeof navigator<`u`&&/iPad|iPhone|iPod/.test(navigator.userAgent),On=!1;function kn(){if(!On){On=!0;try{j||(j=new Audio(`/silent.mp3`),j.loop=!0,j.volume=0,j.preload=`auto`),j.play().catch(()=>{})}catch{}try{let e=yn();if(e){e.state===`suspended`&&e.resume();let t=e.createBuffer(1,1,22050),n=e.createBufferSource();n.buffer=t,n.connect(e.destination),n.start(0)}}catch{}try{let e=_n();e.muted=!0,e.volume=0,e.src=`/silent.mp3`,e.load(),e.play().then(()=>{e.pause(),e.currentTime=0,e.muted=!1,e.volume=1,On=!0}).catch(()=>{})}catch{}mn().then(()=>{try{let e=Array.from(k.entries()).slice(0,32).map(([e,t])=>A.has(e)?`/audio/lessons/mochi-${un(e)}.mp3`:`/audio/lessons/${t}.mp3`);for(let t of e)bn(t)}catch{}})}}if(typeof window<`u`){let e=()=>kn();window.addEventListener(`touchstart`,e,{capture:!0,passive:!0}),window.addEventListener(`click`,e,{capture:!0}),window.addEventListener(`pointerdown`,e,{capture:!0})}function An(e,t=`en-US`,n=280){Dn&&!On||window.setTimeout(()=>P(e,t),n)}function I(e,t){let n=e.style;for(let e of Object.keys(t))n[e]=t[e]}function jn(e,t=2){let n=typeof t==`number`?{depth:t}:t,r=n.depth??2,i=n.borderBottom;e.addEventListener(`pointerdown`,()=>{e.style.transform=`translateY(${r}px)`,i&&(e.style.borderBottomWidth=`${i.to}px`)});let a=()=>{e.style.transform=``,i&&(e.style.borderBottomWidth=`${i.from}px`)};e.addEventListener(`pointerup`,a),e.addEventListener(`pointerleave`,a),e.addEventListener(`pointercancel`,a)}var Mn=`/mascots/icon-speaker.webp`,Nn={sm:{box:28,icon:26},md:{box:56,icon:52},lg:{box:96,icon:88}};function Pn(e){let t=e.size??`sm`;e.variant;let{box:n,icon:r}=Nn[t],i=document.createElement(`button`);return i.type=`button`,i.setAttribute(`aria-label`,e.ariaLabel??`Play audio`),i.innerHTML=`<img src="${Mn}" alt="" aria-hidden="true" style="width:${r}px;height:${r}px;display:block;pointer-events:none;" />`,I(i,{flex:`0 0 auto`,width:`${n}px`,height:`${n}px`,background:`transparent`,border:`none`,borderRadius:`50%`,cursor:`pointer`,padding:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 80ms ease`}),e.pulse&&i.classList.add(`pickup-speaker-pulse`),jn(i,1),i.addEventListener(`click`,t=>{t.preventDefault(),e.onClick?e.onClick():P(e.text)}),i}var L=`#e6dec9`,R=`#cbbf9c`,Fn=`#3c2a1c`,In=`#7a6850`,Ln=`#3d8aae`,Rn=`#2c6986`,zn=`#dfeff6`,z=`#7d9a4f`,B=`#5e7a36`,Bn=`#c84a3a`,Vn=`#dbd2bd`,Hn=`#b8ad94`;function Un(e){let{slot:t,tiles:n,correctOrder:r,prompt:i=`Tap what you hear`}=e,a=r.length,o=document.createElement(`div`);o.className=`pickup-tap-tiles`,Object.assign(o.style,{display:`flex`,flexDirection:`column`,gap:`14px`,padding:`4px`,fontFamily:`inherit`});let s=document.createElement(`div`);Object.assign(s.style,{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`6px`});let c=Pn({text:``,size:`lg`,variant:`primary`,pulse:!0,ariaLabel:`Replay audio`,onClick:e.onSpeak});s.appendChild(c);let l=document.createElement(`div`);l.textContent=i,Object.assign(l.style,{fontSize:`13px`,fontWeight:`800`,color:In,letterSpacing:`1.2px`,textTransform:`uppercase`}),s.appendChild(l),o.appendChild(s);let u=document.createElement(`div`);Object.assign(u.style,{minHeight:`52px`,padding:`8px 4px 12px`,display:`flex`,flexWrap:`wrap`,gap:`6px`,justifyContent:`center`,alignItems:`flex-end`,borderBottom:`2px dashed ${R}`}),o.appendChild(u);let d=document.createElement(`div`);Object.assign(d.style,{display:`flex`,flexWrap:`wrap`,gap:`8px`,justifyContent:`center`,paddingTop:`8px`,paddingBottom:`4px`,minHeight:`52px`}),o.appendChild(d);let f=document.createElement(`button`);f.type=`button`,f.textContent=`CHECK`,Object.assign(f.style,{marginTop:`6px`,padding:`14px 0`,background:Vn,color:`#fff`,border:`none`,borderBottom:`4px solid ${Hn}`,borderRadius:`14px`,fontSize:`15px`,fontWeight:`900`,letterSpacing:`1.5px`,cursor:`not-allowed`,fontFamily:`inherit`,width:`100%`,transition:`background 160ms ease, border-color 160ms ease, transform 80ms ease`}),o.appendChild(f);let p=[],m=[],h=()=>({padding:`11px 16px`,background:`#ffffff`,color:Fn,border:`2px solid ${L}`,borderBottom:`4px solid ${R}`,borderRadius:`12px`,fontSize:`15px`,fontWeight:`800`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,minHeight:`42px`,transition:`background 120ms ease, opacity 120ms ease`,opacity:`1`}),g=()=>({...h(),background:`#f3eddc`,color:`#bba892`,borderBottom:`2px solid ${L}`,cursor:`default`,opacity:`0.45`}),_=e=>{e?Object.assign(f.style,{background:z,borderBottom:`4px solid ${B}`,cursor:`pointer`}):Object.assign(f.style,{background:Vn,borderBottom:`4px solid ${Hn}`,cursor:`not-allowed`})},v=()=>{u.innerHTML=``,m.forEach((e,t)=>{let r=document.createElement(`button`);r.type=`button`,r.textContent=n[e],Object.assign(r.style,h(),{background:`#ffffff`,color:Fn}),r.addEventListener(`click`,n=>{n.preventDefault(),m.splice(t,1),Object.assign(p[e].style,h()),v()}),u.appendChild(r)}),_(m.length===a)};n.forEach((e,t)=>{let n=document.createElement(`button`);n.type=`button`,n.textContent=e,Object.assign(n.style,h()),n.addEventListener(`click`,e=>{e.preventDefault(),!m.includes(t)&&(m.length>=a||(m.push(t),Object.assign(n.style,g()),v()))}),p.push(n),d.appendChild(n)});let y=0;return f.addEventListener(`click`,t=>{t.preventDefault(),m.length===a&&(m.every((e,t)=>e===r[t])?(u.style.background=`rgba(125,154,79,0.14)`,Object.assign(f.style,{background:z,borderBottom:`4px solid ${B}`}),window.setTimeout(()=>e.onComplete(!0),480)):(y+=1,u.style.background=`rgba(200,74,58,0.14)`,Object.assign(f.style,{background:Bn,borderBottom:`4px solid #7a2a20`,cursor:`not-allowed`}),y>=2?(D.setState(e=>({wrongAttempts:Math.max(e.wrongAttempts,1)})),window.setTimeout(()=>e.onComplete(!1),750)):window.setTimeout(()=>{u.style.background=`transparent`,_(m.length===a)},750)))}),v(),t.appendChild(o),{destroy:()=>o.remove()}}function Wn(e){let{slot:t,correctAnswer:n,prompt:r=`Type what you hear`}=e,i=document.createElement(`div`);i.className=`pickup-type-what-you-hear`,Object.assign(i.style,{display:`flex`,flexDirection:`column`,gap:`14px`,padding:`4px`,fontFamily:`inherit`});let a=document.createElement(`input`);a.type=`text`,a.placeholder=`Type here…`,a.autocapitalize=`none`,a.autocomplete=`off`,a.spellcheck=!1,Object.assign(a.style,{width:`100%`,padding:`14px 16px`,background:`#ffffff`,color:Fn,border:`2px solid ${L}`,borderBottom:`4px solid ${R}`,borderRadius:`14px`,fontSize:`17px`,fontWeight:`700`,fontFamily:`inherit`,outline:`none`,textAlign:`center`,boxSizing:`border-box`}),a.addEventListener(`focus`,()=>{a.style.borderColor=Ln,a.style.borderBottomColor=Rn}),a.addEventListener(`blur`,()=>{a.style.borderColor=L,a.style.borderBottomColor=R}),i.appendChild(a);let o=document.createElement(`button`);o.type=`button`,o.textContent=`CHECK`,Object.assign(o.style,{marginTop:`6px`,padding:`14px 0`,background:Vn,color:`#fff`,border:`none`,borderBottom:`4px solid ${Hn}`,borderRadius:`14px`,fontSize:`15px`,fontWeight:`900`,letterSpacing:`1.5px`,cursor:`not-allowed`,fontFamily:`inherit`,width:`100%`,transition:`background 160ms ease, border-color 160ms ease`}),i.appendChild(o);let s=e=>{e?Object.assign(o.style,{background:z,borderBottom:`4px solid ${B}`,cursor:`pointer`}):Object.assign(o.style,{background:Vn,borderBottom:`4px solid ${Hn}`,cursor:`not-allowed`})};a.addEventListener(`input`,()=>s(a.value.trim().length>0));let c=0,l=()=>{let t=a.value.trim().toLowerCase();t&&(t===n.trim().toLowerCase()?(Object.assign(a.style,{borderColor:z,borderBottomColor:B,background:`rgba(125,154,79,0.10)`}),Object.assign(o.style,{background:z,borderBottom:`4px solid ${B}`}),window.setTimeout(()=>e.onComplete(!0),460)):(c+=1,Object.assign(a.style,{borderColor:Bn,borderBottomColor:`#7a2a20`,background:`rgba(200,74,58,0.10)`}),Object.assign(o.style,{background:Bn,borderBottom:`4px solid #7a2a20`}),c>=2?(D.setState(e=>({wrongAttempts:Math.max(e.wrongAttempts,1)})),window.setTimeout(()=>e.onComplete(!1),750)):window.setTimeout(()=>{Object.assign(a.style,{borderColor:L,borderBottomColor:R,background:`#ffffff`}),s(a.value.trim().length>0),a.focus()},750)))};return o.addEventListener(`click`,e=>{e.preventDefault(),l()}),a.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),l())}),t.appendChild(i),window.setTimeout(()=>a.focus(),100),{destroy:()=>i.remove()}}function Gn(e){let{slot:t,pairs:n,prompt:r=`Tap the pairs`}=e,i=document.createElement(`div`);i.className=`pickup-tap-pairs`,Object.assign(i.style,{display:`flex`,flexDirection:`column`,gap:`14px`,padding:`4px`,fontFamily:`inherit`});let a=document.createElement(`div`);a.textContent=r,Object.assign(a.style,{fontSize:`13px`,fontWeight:`800`,color:In,letterSpacing:`1.2px`,textAlign:`center`,textTransform:`uppercase`}),i.appendChild(a);let o=n.map((e,t)=>({pairIdx:t,side:`L`,text:e.left})).sort(()=>Math.random()-.5),s=n.map((e,t)=>({pairIdx:t,side:`R`,text:e.right})).sort(()=>Math.random()-.5),c=document.createElement(`div`);Object.assign(c.style,{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px 14px`}),i.appendChild(c);let l=null,u=0,d=0,f=()=>({padding:`14px 12px`,background:`#ffffff`,color:Fn,border:`2px solid ${L}`,borderBottom:`4px solid ${R}`,borderRadius:`14px`,fontSize:`15px`,fontWeight:`800`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,transition:`background 160ms ease, border-color 160ms ease, transform 120ms ease, opacity 200ms ease`,opacity:`1`}),p=()=>({...f(),background:zn,color:Rn,borderColor:Ln,borderBottomColor:Rn}),m=()=>({...f(),background:`rgba(125,154,79,0.18)`,color:B,borderColor:z,borderBottomColor:B,opacity:`0.5`,cursor:`default`}),h=()=>({...f(),background:`rgba(200,74,58,0.12)`,color:Bn,borderColor:Bn}),g=t=>{let r=document.createElement(`button`);return r.type=`button`,r.textContent=t.text,Object.assign(r.style,f()),r.addEventListener(`click`,i=>{if(i.preventDefault(),r.dataset.matched!==`1`){if(!l){l={el:r,data:t},Object.assign(r.style,p());return}if(l.el===r){Object.assign(r.style,f()),l=null;return}if(l.data.pairIdx===t.pairIdx&&l.data.side!==t.side)[l.el,r].forEach(e=>{e.dataset.matched=`1`,Object.assign(e.style,m())}),l=null,d++,d===n.length&&window.setTimeout(()=>e.onComplete(u<3),450);else{u++,Object.assign(l.el.style,h()),Object.assign(r.style,h());let e=l.el,t=r;l=null,window.setTimeout(()=>{e.dataset.matched!==`1`&&Object.assign(e.style,f()),t.dataset.matched!==`1`&&Object.assign(t.style,f())},600)}}}),r};for(let e=0;e<n.length;e++)c.appendChild(g(o[e])),c.appendChild(g(s[e]));return t.appendChild(i),{destroy:()=>i.remove()}}var V=`#7d9a4f`,H=`#5e7a36`,Kn=`#dde6c8`,U=`#c84a3a`,qn=`#7a2a20`,Jn=`#f5dad4`,Yn=`#ead9bb`,Xn=`#d4c098`,Zn=`#3d2817`,W=`#8b6f4a`,Qn=`#1cb0f6`,$n=`#ffc800`,er=`#e5b400`,tr=`#ff9600`,nr=[`A`,`B`,`C`,`D`],rr=[`棒 · Brilliant!`,`答對 · Nice!`,`好厲害 · You got it!`,`正確 · Perfect!`,`答對了 · Yes!`,`就是這個 · That's the one!`,`勇敢 · Brave!`,`拭乾眼淚再前進 · Tears off, paws on!`],ir=[`時間到 · take your time`,`再試一次 · no rush`],ar=[`再試一次 · Try again`,`差一點 · Almost`,`別停下 · Keep going`,`再一次 · One more try`,`哭完再繼續 · Cry later, try again`,`擦乾鼻涕繼續 · Sniffle, then keep going`];function or(e){return e[Math.floor(Math.random()*e.length)]}var sr=class{buttonsSlot;revealSlot;buttons=[];revealPanel;revealHeader;revealHeaderIcon;revealHeaderText;revealText;revealContinue;unsub;handlers;currentQuestion=null;locked=!1;forceCorrectMode=!1;currentCorrectIndex=-1;awaitingForceCorrect=!1;pendingExplanationZh=``;hideOptionText=!1;constructor(e,t){this.handlers=e,this.buttonsSlot=t.buttonsSlot,this.revealSlot=t.revealSlot,this.forceCorrectMode=!!t.forceCorrectMode;for(let e=0;e<4;e++){let t=document.createElement(`button`);t.type=`button`,t.setAttribute(`data-cloze-idx`,String(e)),I(t,{width:`100%`,minHeight:`60px`,padding:`14px 18px`,borderRadius:`14px`,border:`2px solid ${Yn}`,borderBottom:`4px solid ${Xn}`,background:`#ffffff`,color:Zn,fontSize:`17px`,fontWeight:`700`,fontFamily:`inherit`,cursor:`pointer`,transition:`transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1), background 200ms ease-out, border-color 200ms ease-out, color 200ms ease-out, box-shadow 200ms ease-out`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,userSelect:`none`,display:`flex`,alignItems:`center`,gap:`20px`,textAlign:`left`,boxSizing:`border-box`});let n=document.createElement(`span`);n.textContent=nr[e],I(n,{width:`32px`,height:`32px`,borderRadius:`50%`,border:`2px solid ${Yn}`,background:`#ffffff`,color:W,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`15px`,fontWeight:`800`,flex:`0 0 auto`,marginRight:`4px`}),t.appendChild(n);let r=document.createElement(`span`);I(r,{flex:`1 1 auto`,paddingLeft:`6px`}),t.appendChild(r),t.addEventListener(`click`,e=>{e.preventDefault();let n=Number(t.getAttribute(`data-cloze-idx`));if(this.awaitingForceCorrect&&this.forceCorrectMode){if(t.disabled)return;n===this.currentCorrectIndex?this.handlers.onForceCorrect?.(n):this.markWrongButton(n);return}this.locked||this.handlers.onAnswer(n)}),t.addEventListener(`pointerdown`,()=>{this.locked||(t.style.transform=`translateY(2px)`,t.style.borderBottomWidth=`2px`)});let i=()=>{t.style.transform=``,t.style.borderBottomWidth=`4px`};t.addEventListener(`pointerup`,i),t.addEventListener(`pointerleave`,i),t.addEventListener(`pointercancel`,i),this.buttons.push({el:t,label:r,letter:n}),this.buttonsSlot.appendChild(t)}this.revealPanel=document.createElement(`div`),this.revealPanel.setAttribute(`role`,`status`),this.revealPanel.setAttribute(`aria-live`,`polite`),this.revealPanel.setAttribute(`aria-atomic`,`true`),I(this.revealPanel,{width:`100%`,padding:`14px 16px`,borderRadius:`16px`,background:Kn,color:Zn,fontSize:`15px`,lineHeight:`1.55`,fontFamily:`inherit`,transform:`translateY(40px)`,opacity:`0`,transition:`transform 240ms ease-out, opacity 240ms ease-out`,display:`none`,boxSizing:`border-box`}),this.revealHeader=document.createElement(`div`),I(this.revealHeader,{display:`flex`,alignItems:`center`,gap:`10px`,marginBottom:`6px`,fontSize:`18px`,fontWeight:`800`}),this.revealHeaderIcon=document.createElement(`span`),I(this.revealHeaderIcon,{width:`28px`,height:`28px`,borderRadius:`50%`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,fontSize:`16px`,fontWeight:`900`,lineHeight:`1`}),this.revealHeader.appendChild(this.revealHeaderIcon),this.revealHeaderText=document.createElement(`span`),this.revealHeader.appendChild(this.revealHeaderText),this.revealPanel.appendChild(this.revealHeader),this.revealText=document.createElement(`div`),I(this.revealText,{fontSize:`14px`,fontWeight:`600`,lineHeight:`1.55`,color:Zn}),this.revealPanel.appendChild(this.revealText),this.revealContinue=document.createElement(`button`),this.revealContinue.type=`button`,this.revealContinue.textContent=`Continue →`,I(this.revealContinue,{marginTop:`12px`,padding:`13px 22px`,borderRadius:`14px`,border:`none`,borderBottom:`4px solid ${H}`,background:V,color:`#ffffff`,fontSize:`16px`,fontWeight:`800`,letterSpacing:`0.8px`,fontFamily:`inherit`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,width:`100%`,transition:`transform 80ms ease-out`}),this.revealContinue.addEventListener(`pointerdown`,()=>{this.revealContinue.style.transform=`translateY(2px)`,this.revealContinue.style.borderBottomWidth=`2px`});let n=()=>{this.revealContinue.style.transform=``,this.revealContinue.style.borderBottomWidth=`4px`};this.revealContinue.addEventListener(`pointerup`,n),this.revealContinue.addEventListener(`pointerleave`,n),this.revealContinue.addEventListener(`pointercancel`,n),this.revealContinue.addEventListener(`click`,e=>{e.preventDefault(),this.handlers.onContinue()}),this.revealPanel.appendChild(this.revealContinue),this.revealSlot.appendChild(this.revealPanel),this.unsub=D.subscribe(e=>{this.syncFromState(e.round)});let r=D.getState();this.syncFromState(r.round)}show(){for(let{el:e}of this.buttons)e.style.display=`flex`}hide(){for(let{el:e}of this.buttons)e.style.display=`none`;this.revealPanel.style.display=`none`}destroy(){this.unsub?.();for(let{el:e}of this.buttons)e.remove();this.revealPanel.remove()}resetForRound(){this.locked=!1,this.awaitingForceCorrect=!1,this.currentCorrectIndex=-1,this.pendingExplanationZh=``;for(let{el:e,letter:t}of this.buttons)e.disabled=!1,e.style.display=`flex`,e.style.background=`#ffffff`,e.style.borderColor=Yn,e.style.borderBottomColor=Xn,e.style.color=Zn,e.style.transform=``,e.style.borderBottomWidth=`4px`,e.style.cursor=`pointer`,e.style.opacity=`1`,e.style.animation=``,e.removeAttribute(`aria-label`),t.style.background=`#ffffff`,t.style.borderColor=Yn,t.style.color=W;this.revealPanel.style.display=`none`,this.revealPanel.style.opacity=`0`,this.revealPanel.style.transform=`translateY(40px)`}revealAnswer(e,t,n,r){this.currentCorrectIndex=t;let i=typeof r==`boolean`?r:e===t&&e>=0,a=this.forceCorrectMode&&!i,o=D.getState().awaitingRetry;if(this.forceCorrectMode&&!i&&e>=0&&e!==t&&o){this.locked=!0,this.awaitingForceCorrect=!0,this.pendingExplanationZh=n,this.markWrongButton(e),this.revealPanel.style.display=`none`,this.revealPanel.style.opacity=`0`,this.revealPanel.style.transform=`translateY(40px)`;return}if(this.locked=!0,this.awaitingForceCorrect=a,this.hideOptionText)for(let e=0;e<this.buttons.length;e++){let t=this.buttons[e].el.getAttribute(`data-text`)??``,n=this.buttons[e].el.getAttribute(`data-zh`)??``;this.buttons[e].label.innerHTML=n?`<span style="flex:1 1 auto;text-align:left;">${t}</span><span style="flex:0 0 auto;color:${W};font-weight:700;font-size:13px;margin-left:12px;">${n}</span>`:t,n&&Object.assign(this.buttons[e].label.style,{display:`flex`,alignItems:`baseline`,justifyContent:`space-between`,gap:`8px`})}for(let n=0;n<this.buttons.length;n++){let{el:r,letter:o,label:s}=this.buttons[n];r.disabled=!0,r.style.cursor=`default`,n===t?(r.style.background=V,r.style.borderColor=H,r.style.borderBottomColor=H,r.style.color=`#ffffff`,o.style.background=`#ffffff`,o.style.borderColor=`#ffffff`,o.style.color=H,r.setAttribute(`aria-label`,`Correct answer: ${s.textContent??``}`),i&&(r.classList.remove(`pickup-bounce`),r.offsetWidth,r.classList.add(`pickup-bounce`),window.setTimeout(()=>r.classList.remove(`pickup-bounce`),420)),a&&(r.disabled=!1,r.style.cursor=`pointer`,matchMedia(`(prefers-reduced-motion: reduce)`).matches||(r.style.animation=`mascot-happy-bounce 0.9s ease-in-out infinite`))):n===e&&e!==t?(r.style.background=Jn,r.style.borderColor=U,r.style.borderBottomColor=qn,r.style.color=qn,o.style.background=U,o.style.borderColor=U,o.style.color=`#ffffff`,r.setAttribute(`aria-label`,`Your wrong choice: ${s.textContent??``}`),r.classList.remove(`pickup-wobble`),r.offsetWidth,r.classList.add(`pickup-wobble`),window.setTimeout(()=>r.classList.remove(`pickup-wobble`),380)):r.style.opacity=`0.55`}i?(this.revealHeaderIcon.textContent=`✓`,this.revealHeaderIcon.style.background=V,this.revealHeaderIcon.style.color=`#ffffff`,this.revealHeaderText.textContent=or(rr),this.revealHeaderText.style.color=H,this.revealPanel.style.background=Kn,this.revealContinue.style.background=V,this.revealContinue.style.borderBottomColor=H,this.revealContinue.disabled=!1,this.revealContinue.style.opacity=`1`,this.revealContinue.style.cursor=`pointer`,this.revealContinue.textContent=`Continue →`):(this.revealHeaderIcon.textContent=`✕`,this.revealHeaderIcon.style.background=U,this.revealHeaderIcon.style.color=`#ffffff`,this.revealHeaderText.textContent=e<0?this.forceCorrectMode?or(ir):`Time up`:this.forceCorrectMode?`差一點 · Almost — see the answer below`:or(ar),this.revealHeaderText.style.color=qn,this.revealPanel.style.background=Jn,this.revealContinue.style.background=a?`#cccccc`:U,this.revealContinue.style.borderBottomColor=a?`#999999`:qn,this.revealContinue.disabled=a,this.revealContinue.style.opacity=a?`0.6`:`1`,this.revealContinue.style.cursor=a?`not-allowed`:`pointer`,this.revealContinue.textContent=a?`Answer first`:`Continue →`),this.revealText.style.whiteSpace=`pre-line`,this.revealText.textContent=n,this.revealPanel.style.display=`block`,this.revealPanel.offsetHeight,this.revealPanel.style.opacity=`1`,this.revealPanel.style.transform=`translateY(0)`;let s=matchMedia(`(prefers-reduced-motion: reduce)`).matches;window.setTimeout(()=>{try{this.revealPanel.scrollIntoView({behavior:s?`auto`:`smooth`,block:`end`})}catch{this.revealPanel.scrollIntoView(!1)}},120)}revealTimeout(e,t){this.revealAnswer(-1,e,t,!1)}acknowledgeForceCorrect(){this.awaitingForceCorrect=!1,this.locked=!0;for(let e=0;e<this.buttons.length;e++){let{el:t,letter:n,label:r}=this.buttons[e];t.disabled=!0,t.style.cursor=`default`,e===this.currentCorrectIndex&&(t.style.animation=``,t.style.background=V,t.style.borderColor=H,t.style.borderBottomColor=H,t.style.color=`#ffffff`,n.style.background=`#ffffff`,n.style.borderColor=`#ffffff`,n.style.color=H,t.setAttribute(`aria-label`,`Correct answer: ${r.textContent??``}`))}if(this.revealHeaderIcon.textContent=`✓`,this.revealHeaderIcon.style.background=V,this.revealHeaderIcon.style.color=`#ffffff`,this.revealHeaderText.textContent=or(rr),this.revealHeaderText.style.color=H,this.revealPanel.style.background=Kn,this.revealContinue.disabled=!1,this.revealContinue.style.background=V,this.revealContinue.style.borderBottomColor=H,this.revealContinue.style.opacity=`1`,this.revealContinue.style.cursor=`pointer`,this.revealContinue.textContent=`Continue →`,this.pendingExplanationZh&&=(this.revealText.textContent=this.pendingExplanationZh,``),this.revealPanel.style.display===`none`){this.revealPanel.style.display=`block`,this.revealPanel.offsetHeight,this.revealPanel.style.opacity=`1`,this.revealPanel.style.transform=`translateY(0)`;let e=matchMedia(`(prefers-reduced-motion: reduce)`).matches;window.setTimeout(()=>{try{this.revealPanel.scrollIntoView({behavior:e?`auto`:`smooth`,block:`end`})}catch{this.revealPanel.scrollIntoView(!1)}},120)}}markWrongButton(e){let t=this.buttons[e];if(!t)return;let{el:n,letter:r,label:i}=t;n.disabled=!0,n.style.cursor=`default`,n.style.background=Jn,n.style.borderColor=U,n.style.borderBottomColor=qn,n.style.color=qn,r.style.background=U,r.style.borderColor=U,r.style.color=`#ffffff`,n.setAttribute(`aria-label`,`Your wrong choice: ${i.textContent??``}`),n.classList.remove(`pickup-wobble`),n.offsetWidth,n.classList.add(`pickup-wobble`),window.setTimeout(()=>n.classList.remove(`pickup-wobble`),380)}syncFromState(e){if(e!==this.currentQuestion&&(this.currentQuestion=e,e)){let t=e.type;this.hideOptionText=t===`listen-mc`||t===`listen-comprehension`||t===`listen-emoji`;let n=e.optionsZh;for(let t=0;t<this.buttons.length;t++){let r=e.options[t],i=n?.[t]??``;this.buttons[t].el.setAttribute(`data-text`,r),this.buttons[t].el.setAttribute(`data-zh`,i),this.hideOptionText?(this.buttons[t].label.textContent=``,this.buttons[t].label.innerHTML=``):this.buttons[t].label.textContent=r,Object.assign(this.buttons[t].label.style,{display:``,alignItems:``,justifyContent:``,gap:``})}this.resetForRound()}}},cr={owl:{id:`owl`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="owl-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#c8e6c2"/>
      <stop offset="100%" stop-color="#86c780"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#owl-halo)" opacity="0.9"/>
  <!-- Sparkle context elements -->
  <g fill="#fef8ed" stroke="none">
    <path d="M14 30 L16 34 L20 36 L16 38 L14 42 L12 38 L8 36 L12 34 Z"/>
    <path d="M86 26 L87 29 L90 30 L87 31 L86 34 L85 31 L82 30 L85 29 Z"/>
    <path d="M88 92 L89 95 L92 96 L89 97 L88 100 L87 97 L84 96 L87 95 Z"/>
  </g>
  <!-- Ground shadow -->
  <ellipse cx="50" cy="133" rx="22" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body teardrop (cream) — slight tilt for shoulder twist -->
    <path d="M48 42 C24 44 16 68 18 90 C20 114 34 128 52 128 C70 128 84 112 82 88 C80 66 72 40 48 42 Z" fill="#fef8ed" stroke-width="5"/>
    <!-- Belly highlight (sub-shape) -->
    <ellipse cx="50" cy="100" rx="20" ry="22" fill="#f4e1c0" stroke="none"/>
    <!-- Left wing raised (waving!) -->
    <path d="M22 78 Q8 60 12 46 Q22 50 28 70 Z" fill="#fcd34d" stroke-width="4"/>
    <!-- Right wing tucked -->
    <path d="M78 84 Q88 96 80 114 Q70 110 70 96 Z" fill="#fcd34d" stroke-width="4"/>
    <!-- Headband (signature yellow) with "HI" text drawn as paths -->
    <path d="M22 56 Q50 44 78 56 L78 64 Q50 54 22 64 Z" fill="#fcd34d" stroke-width="4"/>
    <!-- "H" -->
    <path d="M44 56 L44 62 M44 59 L48 59 M48 56 L48 62" stroke-width="2" fill="none"/>
    <!-- "I" -->
    <path d="M54 56 L54 62" stroke-width="2" fill="none"/>
    <!-- Eye whites (bigger) -->
    <circle cx="38" cy="78" r="10" fill="#fef8ed" stroke-width="4"/>
    <circle cx="62" cy="78" r="10" fill="#fef8ed" stroke-width="4"/>
    <!-- Pupils -->
    <circle cx="38" cy="78" r="5" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="62" cy="78" r="5" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <!-- Eye highlights -->
    <circle cx="39.5" cy="76" r="1.6" fill="#fef8ed" stroke="none"/>
    <circle cx="63.5" cy="76" r="1.6" fill="#fef8ed" stroke="none"/>
    <!-- Beak -->
    <path d="M50 88 L44 96 L56 96 Z" fill="#f97316" stroke-width="3"/>
    <!-- Feet -->
    <path d="M40 126 L36 132 M40 126 L40 133 M40 126 L44 132" stroke-width="3" fill="none"/>
    <path d="M60 126 L56 132 M60 126 L60 133 M60 126 L64 132" stroke-width="3" fill="none"/>
  </g>
</svg>`},waiter:{id:`waiter`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="waiter-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fef8ed"/>
      <stop offset="100%" stop-color="#fcd34d"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#waiter-halo)" opacity="0.9"/>
  <!-- Steam wisps (context) -->
  <g fill="none" stroke="#fef8ed" stroke-width="2.5" stroke-linecap="round">
    <path d="M76 30 Q74 24 78 20 Q82 16 80 10"/>
    <path d="M82 32 Q84 26 82 22"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body / shirt -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#fef8ed" stroke-width="5"/>
    <!-- Apron (warm-dark) -->
    <path d="M34 86 L66 86 L70 132 L30 132 Z" fill="#1a1a1a" stroke-width="4"/>
    <!-- Star on apron (signature pride mark) -->
    <path d="M50 108 L52 112 L57 113 L53 117 L54 122 L50 119 L46 122 L47 117 L43 113 L48 112 Z" fill="#fcd34d" stroke-width="2"/>
    <!-- Apron tie at neck -->
    <path d="M40 86 Q50 78 60 86" fill="none" stroke-width="3"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8" stroke-width="5"/>
    <!-- Hair cap -->
    <path d="M26 38 Q26 18 50 16 Q74 18 74 38 Q70 28 50 28 Q30 28 26 38 Z" fill="#1a1a1a" stroke-width="4"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="58" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="43" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <circle cx="59" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <!-- Smile -->
    <path d="M44 52 Q50 57 56 52" fill="none" stroke-width="3"/>
    <!-- Red bowtie (signature) -->
    <path d="M42 68 L42 76 L50 72 L58 76 L58 68 L50 72 Z" fill="#dc2626" stroke-width="3"/>
    <circle cx="50" cy="72" r="1.8" fill="#1a1a1a" stroke="none"/>
    <!-- Raised right arm holding tray -->
    <path d="M78 84 Q90 70 86 56" fill="none" stroke-width="5"/>
    <!-- Tray (cream oval) -->
    <ellipse cx="86" cy="50" rx="14" ry="4" fill="#fef8ed" stroke-width="4"/>
    <!-- Dish on tray -->
    <ellipse cx="86" cy="46" rx="8" ry="3" fill="#dc2626" stroke-width="3"/>
  </g>
</svg>`},flightAttendant:{id:`flightAttendant`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="fa-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#dbeafe"/>
      <stop offset="100%" stop-color="#93c5fd"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#fa-halo)" opacity="0.9"/>
  <!-- Cloud puff context -->
  <g fill="#fef8ed" stroke="none" opacity="0.85">
    <ellipse cx="14" cy="24" rx="10" ry="5"/>
    <ellipse cx="8" cy="24" rx="6" ry="4"/>
    <ellipse cx="86" cy="100" rx="10" ry="5"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Uniform body (navy) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#1e3a8a" stroke-width="5"/>
    <!-- White lapel V -->
    <path d="M42 70 L50 88 L58 70 Z" fill="#fef8ed" stroke-width="3"/>
    <!-- Wings pin (amber plane shape) -->
    <path d="M40 94 L50 92 L60 94 L56 96 L50 95 L44 96 Z" fill="#fcd34d" stroke-width="2.5"/>
    <circle cx="50" cy="94" r="1.5" fill="#1a1a1a" stroke="none"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#f5e6d3" stroke-width="5"/>
    <!-- Hair bun -->
    <path d="M26 36 Q28 18 50 16 Q72 18 74 36 Q70 28 50 28 Q30 28 26 36 Z" fill="#3d2817" stroke-width="4"/>
    <circle cx="76" cy="22" r="7" fill="#3d2817" stroke-width="3"/>
    <!-- Hat (navy) -->
    <path d="M30 22 Q50 14 70 22 L67 32 L33 32 Z" fill="#1e3a8a" stroke-width="4"/>
    <!-- Hat insignia (gold dot) -->
    <circle cx="50" cy="24" r="2" fill="#fcd34d" stroke-width="1.5"/>
    <!-- Eyes (looking to side — directing) -->
    <circle cx="44" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="60" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="45" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <circle cx="61" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <!-- Smile -->
    <path d="M44 52 Q50 56 56 52" fill="none" stroke-width="3"/>
    <!-- Cheek blush -->
    <circle cx="34" cy="50" r="3.2" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <circle cx="66" cy="50" r="3.2" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <!-- Pointing arm (right, safety-briefing toward exit) -->
    <path d="M78 86 Q92 82 96 70" fill="none" stroke-width="5"/>
    <!-- Pointing hand -->
    <circle cx="96" cy="68" r="4" fill="#f5e6d3" stroke-width="3"/>
    <path d="M96 64 L96 56" stroke-width="3" fill="none"/>
  </g>
</svg>`},doctor:{id:`doctor`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="doc-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#d1fae5"/>
      <stop offset="100%" stop-color="#6ee7b7"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#doc-halo)" opacity="0.88"/>
  <!-- Pulse line context (top right) -->
  <path d="M70 24 L76 24 L80 16 L84 32 L88 24 L94 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Coat -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#fef8ed" stroke-width="5"/>
    <!-- Coat opening line -->
    <path d="M50 88 L50 132" fill="none" stroke-width="3"/>
    <!-- Green cross badge with "+" -->
    <rect x="60" y="92" width="14" height="14" fill="#10b981" stroke-width="3"/>
    <path d="M67 95 L67 103 M63 99 L71 99" stroke="#fef8ed" stroke-width="2.5" fill="none"/>
    <!-- Stethoscope (around neck + listening end at chest) -->
    <path d="M38 72 Q32 90 38 102 Q44 106 50 100" fill="none" stroke-width="3"/>
    <path d="M62 72 Q68 90 56 96" fill="none" stroke-width="3"/>
    <circle cx="50" cy="100" r="5" fill="#10b981" stroke-width="3"/>
    <circle cx="50" cy="100" r="2" fill="#1a1a1a" stroke="none"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8" stroke-width="5"/>
    <!-- Hair -->
    <path d="M26 36 Q28 16 50 14 Q72 16 74 36 Q68 26 50 26 Q32 26 26 36 Z" fill="#1a1a1a" stroke-width="4"/>
    <!-- Doctor headband / forehead reflector ring -->
    <path d="M34 30 Q50 24 66 30" fill="none" stroke-width="3"/>
    <circle cx="50" cy="28" r="3" fill="#fcd34d" stroke-width="2"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="58" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="43" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <circle cx="59" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <!-- Gentle smile -->
    <path d="M44 52 Q50 55 56 52" fill="none" stroke-width="3"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <circle cx="64" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
  </g>
</svg>`},coworker:{id:`coworker`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="cow-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#cow-halo)" opacity="0.85"/>
  <!-- Coffee cup with steam (context, top right) -->
  <g fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
    <path d="M78 30 L82 30 Q84 30 84 32 L84 38 Q84 42 82 42 L80 42 Q78 42 78 38 Z" fill="#fef8ed"/>
    <path d="M76 32 L80 18" stroke-width="2"/>
    <path d="M82 32 L86 18" stroke-width="2"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Shirt (orange) — leaning slightly forward -->
    <path d="M22 86 Q28 72 50 70 Q72 72 78 86 L80 132 L20 132 Z" fill="#f97316" stroke-width="5"/>
    <!-- T-shirt collar -->
    <path d="M42 72 Q50 80 58 72" fill="none" stroke-width="3"/>
    <!-- Head (tilted slightly forward) -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8" stroke-width="5"/>
    <!-- Hair side-part -->
    <path d="M26 36 Q30 16 54 16 Q72 18 74 36 Q66 26 50 26 Q34 28 26 36 Z" fill="#3d2817" stroke-width="4"/>
    <!-- Glasses frames -->
    <circle cx="40" cy="42" r="7" fill="#fef8ed" stroke-width="3.5"/>
    <circle cx="60" cy="42" r="7" fill="#fef8ed" stroke-width="3.5"/>
    <path d="M47 42 L53 42" stroke-width="3"/>
    <!-- Eyes (focused) -->
    <circle cx="40" cy="42" r="2.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="60" cy="42" r="2.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <!-- Mild smile -->
    <path d="M44 54 Q50 58 56 54" fill="none" stroke-width="3"/>
    <!-- Laptop -->
    <rect x="28" y="106" width="44" height="24" rx="2" fill="#1a1a1a" stroke-width="4"/>
    <rect x="32" y="110" width="36" height="16" fill="#fcd34d" stroke-width="2"/>
    <!-- WiFi bars on laptop screen -->
    <path d="M50 122 L50 122.5" stroke="#1a1a1a" stroke-width="2.5"/>
    <path d="M46 118 Q50 116 54 118" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <path d="M44 114 Q50 110 56 114" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  </g>
</svg>`},receptionist:{id:`receptionist`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="rec-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#fcd34d"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="70" r="52" fill="url(#rec-halo)" opacity="0.9"/>
  <!-- Motion "DING" lines around bell (context) -->
  <g fill="none" stroke="#fcd34d" stroke-width="2.5" stroke-linecap="round">
    <path d="M88 92 L94 88"/>
    <path d="M90 100 L96 100"/>
    <path d="M88 108 L94 112"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Jacket (burgundy) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#7f1d1d" stroke-width="5"/>
    <!-- White shirt -->
    <path d="M44 72 L56 72 L54 100 L46 100 Z" fill="#fef8ed" stroke-width="3"/>
    <!-- Gold tie -->
    <path d="M48 74 L52 74 L51 98 L49 98 Z" fill="#fcd34d" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8" stroke-width="5"/>
    <!-- Hair -->
    <path d="M26 36 Q28 16 50 14 Q72 16 74 36 Q66 26 50 26 Q34 26 26 36 Z" fill="#6b4a2a" stroke-width="4"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="58" cy="42" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="43" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <circle cx="59" cy="41" r="1.1" fill="#fef8ed" stroke="none"/>
    <!-- Welcoming smile -->
    <path d="M42 52 Q50 58 58 52" fill="none" stroke-width="3"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="50" r="3" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <circle cx="64" cy="50" r="3" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <!-- Raised right arm (ringing bell) -->
    <path d="M78 84 Q88 78 84 64" fill="none" stroke-width="5"/>
    <circle cx="84" cy="62" r="4" fill="#fde4c8" stroke-width="3"/>
    <!-- Service bell on counter (gold dome) -->
    <path d="M72 116 Q80 102 88 116 L88 122 L72 122 Z" fill="#fcd34d" stroke-width="3"/>
    <circle cx="80" cy="102" r="2.2" fill="#fcd34d" stroke-width="2"/>
    <rect x="70" y="122" width="20" height="4" fill="#1a1a1a" stroke="none"/>
  </g>
</svg>`},kittenCh1:{id:`kittenCh1`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
  <image href="/mascots/calico-anchor.webp" x="0" y="0" width="100" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>`},kittenCh2:{id:`kittenCh2`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="k2-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#k2-halo)" opacity="0.88"/>
  <!-- Floating bread crumb sparkles (context — what she's watching) -->
  <g fill="#fcd34d" stroke="#92400e" stroke-width="1.5">
    <circle cx="14" cy="40" r="2.5"/>
    <circle cx="86" cy="44" r="2"/>
    <circle cx="12" cy="60" r="1.8"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Sitting upright body (taller, narrower) -->
    <path d="M32 94 Q30 76 42 72 Q50 70 58 72 Q70 76 68 94 Q72 124 58 128 Q50 130 42 128 Q28 124 32 94 Z" fill="#fb923c" stroke-width="5"/>
    <!-- White belly -->
    <ellipse cx="50" cy="106" rx="12" ry="16" fill="#fef8ed" stroke="none"/>
    <!-- Front paws (sitting) -->
    <ellipse cx="42" cy="126" rx="4" ry="3" fill="#fb923c" stroke-width="3"/>
    <ellipse cx="58" cy="126" rx="4" ry="3" fill="#fb923c" stroke-width="3"/>
    <!-- Head (looking up, alert) -->
    <circle cx="50" cy="48" r="26" fill="#fb923c" stroke-width="5"/>
    <!-- Perky alert ears -->
    <path d="M30 34 L32 18 L42 36 Z" fill="#fb923c" stroke-width="4"/>
    <path d="M70 34 L68 18 L58 36 Z" fill="#fb923c" stroke-width="4"/>
    <!-- Inner ear pink -->
    <path d="M34 26 L36 34" stroke="#f4a8a8" stroke-width="2.5"/>
    <path d="M66 26 L64 34" stroke="#f4a8a8" stroke-width="2.5"/>
    <!-- Observant wide eyes (slightly upward gaze) -->
    <circle cx="40" cy="50" r="5.5" fill="#fef8ed" stroke-width="4"/>
    <circle cx="60" cy="50" r="5.5" fill="#fef8ed" stroke-width="4"/>
    <circle cx="40" cy="48" r="3.5" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="60" cy="48" r="3.5" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="41" cy="47" r="1.2" fill="#fef8ed" stroke="none"/>
    <circle cx="61" cy="47" r="1.2" fill="#fef8ed" stroke="none"/>
    <!-- Cheek blush -->
    <circle cx="34" cy="58" r="3.5" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <circle cx="66" cy="58" r="3.5" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <!-- Nose -->
    <path d="M47 60 L53 60 L50 64 Z" fill="#f4a8a8" stroke-width="2"/>
    <!-- Small inquisitive mouth -->
    <path d="M46 68 Q50 70 54 68" fill="none" stroke-width="2.5"/>
    <!-- Whiskers -->
    <path d="M22 60 L36 62" stroke-width="1.8"/>
    <path d="M22 66 L36 66" stroke-width="1.8"/>
    <path d="M78 60 L64 62" stroke-width="1.8"/>
    <path d="M78 66 L64 66" stroke-width="1.8"/>
    <!-- Tail wrapped around -->
    <path d="M68 122 Q86 116 80 100" fill="none" stroke-width="4"/>
  </g>
</svg>`},kittenCh3:{id:`kittenCh3`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="k3-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#bbf7d0"/>
      <stop offset="100%" stop-color="#4ade80"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#k3-halo)" opacity="0.88"/>
  <!-- Wind / determination lines context -->
  <g stroke="#fef8ed" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85">
    <path d="M10 80 L20 80"/>
    <path d="M6 90 L18 90"/>
    <path d="M10 100 L20 100"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Tail UP like exclamation mark (rendered first, behind body) -->
    <path d="M28 96 Q14 70 22 50" fill="none" stroke-width="6"/>
    <circle cx="22" cy="48" r="3" fill="#f97316" stroke-width="3"/>
    <!-- Body (standing on 4 legs) -->
    <path d="M28 96 Q30 80 42 76 Q50 74 58 76 Q70 80 72 96 Q72 116 58 118 Q50 120 42 118 Q28 116 28 96 Z" fill="#f97316" stroke-width="5"/>
    <!-- Legs -->
    <rect x="34" y="116" width="6" height="14" rx="2" fill="#f97316" stroke-width="4"/>
    <rect x="60" y="116" width="6" height="14" rx="2" fill="#f97316" stroke-width="4"/>
    <!-- White belly -->
    <ellipse cx="50" cy="102" rx="10" ry="10" fill="#fef8ed" stroke="none"/>
    <!-- Head held high (slight tilt up) -->
    <circle cx="50" cy="50" r="24" fill="#f97316" stroke-width="5"/>
    <!-- Pointy alert ears -->
    <path d="M30 38 L32 20 L42 40 Z" fill="#f97316" stroke-width="4"/>
    <path d="M70 38 L68 20 L58 40 Z" fill="#f97316" stroke-width="4"/>
    <path d="M34 26 L36 38" stroke="#f4a8a8" stroke-width="2.5"/>
    <path d="M66 26 L64 38" stroke="#f4a8a8" stroke-width="2.5"/>
    <!-- Determined narrow eyes -->
    <path d="M36 52 Q40 48 46 52" fill="none" stroke-width="3.5" class="mascot-eye"/>
    <path d="M54 52 Q60 48 64 52" fill="none" stroke-width="3.5" class="mascot-eye mascot-eye-right"/>
    <circle cx="41" cy="51" r="2" fill="#1a1a1a" class="mascot-pupil" stroke="none"/>
    <circle cx="59" cy="51" r="2" fill="#1a1a1a" class="mascot-pupil" stroke="none"/>
    <!-- Cheek blush -->
    <circle cx="32" cy="60" r="3.5" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <circle cx="68" cy="60" r="3.5" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <!-- Nose -->
    <path d="M47 62 L53 62 L50 66 Z" fill="#f4a8a8" stroke-width="2"/>
    <!-- Firm closed-line mouth (saying "no") -->
    <path d="M44 72 L56 72" fill="none" stroke-width="3"/>
    <!-- Whiskers -->
    <path d="M22 64 L36 66" stroke-width="1.8"/>
    <path d="M78 64 L64 66" stroke-width="1.8"/>
  </g>
</svg>`},kittenCh4:{id:`kittenCh4`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="k4-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#k4-halo)" opacity="0.85"/>
  <!-- Heart context (learning to love) -->
  <path d="M84 30 Q82 26 80 28 Q78 30 80 32 Q82 34 84 36 Q86 34 88 32 Q90 30 88 28 Q86 26 84 30 Z" fill="#ec4899" stroke="#1a1a1a" stroke-width="2"/>
  <!-- Footprint trail behind -->
  <g fill="#fef8ed" stroke="#1a1a1a" stroke-width="1.5" opacity="0.8">
    <ellipse cx="14" cy="120" rx="3" ry="2"/>
    <ellipse cx="20" cy="114" rx="2.5" ry="1.8"/>
  </g>
  <ellipse cx="50" cy="133" rx="24" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Walking body (slight forward lean) -->
    <path d="M30 100 Q28 82 40 76 Q50 72 60 76 Q72 82 70 100 Q74 122 60 126 Q50 128 40 126 Q26 122 30 100 Z" fill="#ea580c" stroke-width="5"/>
    <!-- White belly -->
    <ellipse cx="50" cy="108" rx="12" ry="14" fill="#fef8ed" stroke="none"/>
    <!-- Tabby stripes -->
    <path d="M36 90 Q38 86 36 82" fill="none" stroke="#9a3412" stroke-width="3"/>
    <path d="M64 90 Q62 86 64 82" fill="none" stroke="#9a3412" stroke-width="3"/>
    <path d="M38 102 Q40 100 38 96" fill="none" stroke="#9a3412" stroke-width="2.5"/>
    <path d="M62 102 Q60 100 62 96" fill="none" stroke="#9a3412" stroke-width="2.5"/>
    <!-- Back paw (planted) -->
    <ellipse cx="38" cy="128" rx="5" ry="3" fill="#ea580c" stroke-width="3"/>
    <!-- Front paw RAISED mid-step -->
    <ellipse cx="68" cy="116" rx="5" ry="4" fill="#ea580c" stroke-width="3"/>
    <path d="M68 112 L68 108" stroke-width="3" fill="none"/>
    <!-- Head -->
    <circle cx="50" cy="50" r="26" fill="#ea580c" stroke-width="5"/>
    <!-- Sharp pointy ears -->
    <path d="M28 36 L30 18 L42 38 Z" fill="#ea580c" stroke-width="4"/>
    <path d="M72 36 L70 18 L58 38 Z" fill="#ea580c" stroke-width="4"/>
    <path d="M33 24 L36 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <path d="M67 24 L64 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <!-- Forehead tabby M -->
    <path d="M44 36 L46 44" stroke="#9a3412" stroke-width="2.5"/>
    <path d="M50 34 L50 42" stroke="#9a3412" stroke-width="2.5"/>
    <path d="M56 36 L54 44" stroke="#9a3412" stroke-width="2.5"/>
    <!-- Soft confident eyes (slight curve) -->
    <ellipse cx="40" cy="54" rx="4.5" ry="3.5" fill="#fef8ed" stroke-width="3"/>
    <ellipse cx="60" cy="54" rx="4.5" ry="3.5" fill="#fef8ed" stroke-width="3"/>
    <circle cx="40" cy="54" r="2.5" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="60" cy="54" r="2.5" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="41" cy="53" r="1" fill="#fef8ed" stroke="none"/>
    <circle cx="61" cy="53" r="1" fill="#fef8ed" stroke="none"/>
    <!-- Small scar on cheek -->
    <path d="M66 60 L70 64" stroke-width="2"/>
    <!-- Nose -->
    <path d="M47 62 L53 62 L50 66 Z" fill="#f4a8a8" stroke-width="2"/>
    <!-- Soft small smile (learning love) -->
    <path d="M44 72 Q50 75 56 72" fill="none" stroke-width="3"/>
    <!-- Whiskers -->
    <path d="M22 66 L36 68" stroke-width="1.8"/>
    <path d="M78 66 L64 68" stroke-width="1.8"/>
    <!-- Tail held mid-height (confident not stiff) -->
    <path d="M70 110 Q86 96 84 84" fill="none" stroke-width="4"/>
  </g>
</svg>`},kittenCh5:{id:`kittenCh5`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="k5-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fce7f3"/>
      <stop offset="100%" stop-color="#f9a8d4"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#k5-halo)" opacity="0.9"/>
  <!-- Warm window glow lines (context — home warmth) -->
  <g stroke="#fcd34d" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7">
    <path d="M8 28 L20 18"/>
    <path d="M14 32 L24 22"/>
    <path d="M10 38 L22 28"/>
  </g>
  <!-- Heart floating (loved) -->
  <path d="M84 34 Q80 28 76 32 Q72 36 76 40 Q80 44 84 48 Q88 44 92 40 Q96 36 92 32 Q88 28 84 34 Z" fill="#ec4899" stroke="#1a1a1a" stroke-width="2.5"/>
  <ellipse cx="50" cy="133" rx="28" ry="2.5" fill="#1a1a1a" opacity="0.18"/>
  <!-- Pillow -->
  <g stroke="#1a1a1a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 118 Q30 110 50 114 Q70 110 90 118 Q90 130 70 132 Q50 134 30 132 Q10 130 10 118 Z" fill="#fde68a"/>
  </g>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Curled body (cream base) -->
    <ellipse cx="50" cy="98" rx="36" ry="22" fill="#fef8ed" stroke-width="5"/>
    <!-- Calico patches: orange left -->
    <path d="M20 96 Q22 80 38 82 Q42 92 32 102 Q22 102 20 96 Z" fill="#fb923c" stroke-width="3"/>
    <!-- Calico patches: brown right -->
    <path d="M68 100 Q82 96 82 110 Q72 116 64 110 Q62 104 68 100 Z" fill="#92400e" stroke-width="3"/>
    <!-- Curled tail wrapping around -->
    <path d="M16 102 Q4 90 18 80 Q34 80 34 92" fill="none" stroke-width="4"/>
    <!-- Head on pillow (tilted right, resting) -->
    <circle cx="58" cy="72" r="22" fill="#fef8ed" stroke-width="5"/>
    <!-- Calico patch on head (orange) -->
    <path d="M40 70 Q40 58 52 58 Q56 62 54 70 Q48 74 40 70 Z" fill="#fb923c" stroke-width="3"/>
    <!-- Calico patch on head (brown) -->
    <path d="M64 62 Q74 60 76 70 Q72 76 66 74 Q62 68 64 62 Z" fill="#92400e" stroke-width="3"/>
    <!-- Folded relaxed ears -->
    <path d="M44 58 Q44 48 50 50 Q54 54 52 60 Z" fill="#fb923c" stroke-width="3.5"/>
    <path d="M72 58 Q72 48 66 50 Q62 54 64 60 Z" fill="#92400e" stroke-width="3.5"/>
    <!-- Half-open content eyes (in-between sleeping/awake) -->
    <path d="M48 72 Q52 75 56 72" fill="none" stroke-width="3" class="mascot-eye"/>
    <path d="M62 72 Q66 75 70 72" fill="none" stroke-width="3" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush (strong — happy) -->
    <circle cx="46" cy="80" r="3.5" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <circle cx="72" cy="80" r="3.5" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <!-- Nose -->
    <path d="M56 82 L62 82 L59 86 Z" fill="#f4a8a8" stroke-width="2"/>
    <!-- Content smile -->
    <path d="M54 90 Q59 93 64 90" fill="none" stroke-width="3"/>
    <!-- Whiskers -->
    <path d="M40 80 L52 82" stroke-width="1.8"/>
    <path d="M66 86 L78 82" stroke-width="1.8"/>
  </g>
  <!-- Sleeping Zs -->
  <g fill="#1a1a1a" stroke="none" font-family="system-ui, sans-serif" font-weight="900">
    <text x="80" y="62" font-size="11">z</text>
    <text x="86" y="50" font-size="16">Z</text>
  </g>
</svg>`},npcGrandma:{id:`npcGrandma`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
  <image href="/mascots/iso-grandma.webp" x="0" y="0" width="100" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>`},npcBaker:{id:`npcBaker`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="bk-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="52" fill="url(#bk-halo)" opacity="0.88"/>
  <!-- Flour puff dots context -->
  <g fill="#fef8ed" stroke="#1a1a1a" stroke-width="1" opacity="0.85">
    <circle cx="14" cy="48" r="3"/>
    <circle cx="10" cy="56" r="2"/>
    <circle cx="86" cy="52" r="2.5"/>
    <circle cx="90" cy="62" r="1.8"/>
    <circle cx="88" cy="92" r="2"/>
  </g>
  <ellipse cx="50" cy="133" rx="26" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body / shirt -->
    <path d="M22 88 Q26 76 50 76 Q74 76 78 88 L80 132 L20 132 Z" fill="#fef8ed" stroke-width="5"/>
    <!-- Tan apron -->
    <path d="M32 92 L68 92 L70 132 L30 132 Z" fill="#d4a574" stroke-width="4"/>
    <!-- Apron tie -->
    <path d="M44 92 Q50 86 56 92" fill="none" stroke-width="3"/>
    <!-- Head -->
    <circle cx="50" cy="52" r="22" fill="#fde4c8" stroke-width="5"/>
    <!-- Chef hat (white mushroom, taller) -->
    <ellipse cx="50" cy="26" rx="22" ry="13" fill="#fef8ed" stroke-width="4"/>
    <rect x="34" y="34" width="32" height="10" fill="#fef8ed" stroke-width="3"/>
    <!-- Star on hat (signature mastery badge) -->
    <path d="M50 22 L51.5 25 L55 25.5 L52.5 28 L53 31.5 L50 30 L47 31.5 L47.5 28 L45 25.5 L48.5 25 Z" fill="#fcd34d" stroke-width="1.5"/>
    <!-- Bushy moustache -->
    <path d="M38 62 Q44 66 50 64 Q56 66 62 62 Q58 70 50 68 Q42 70 38 62 Z" fill="#1a1a1a" stroke-width="3"/>
    <!-- Crescent happy eyes -->
    <path d="M40 50 Q44 54 48 50" fill="none" stroke-width="3.5" class="mascot-eye"/>
    <path d="M52 50 Q56 54 60 50" fill="none" stroke-width="3.5" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush -->
    <circle cx="34" cy="58" r="3.2" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="66" cy="58" r="3.2" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <!-- HAND HOLDING bread roll up (offering pose) -->
    <path d="M68 96 Q78 88 76 78" fill="none" stroke-width="5"/>
    <!-- Bread roll (golden amber, presented) -->
    <ellipse cx="76" cy="74" rx="11" ry="7" fill="#fcd34d" stroke-width="4"/>
    <path d="M70 72 L72 76" fill="none" stroke-width="2"/>
    <path d="M76 70 L78 74" fill="none" stroke-width="2"/>
    <path d="M82 72 L84 76" fill="none" stroke-width="2"/>
  </g>
</svg>`},npcMeimei:{id:`npcMeimei`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="mm-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fce7f3"/>
      <stop offset="100%" stop-color="#f9a8d4"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="52" fill="url(#mm-halo)" opacity="0.92"/>
  <!-- Hearts context (loving child) -->
  <g fill="#ec4899" stroke="#1a1a1a" stroke-width="1.5">
    <path d="M14 30 Q12 26 10 28 Q8 30 10 32 Q12 34 14 36 Q16 34 18 32 Q20 30 18 28 Q16 26 14 30 Z"/>
    <path d="M86 30 Q84 26 82 28 Q80 30 82 32 Q84 34 86 36 Q88 34 90 32 Q92 30 90 28 Q88 26 86 30 Z"/>
  </g>
  <ellipse cx="50" cy="133" rx="26" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pink dress -->
    <path d="M28 88 Q36 82 50 82 Q64 82 72 88 L80 132 L20 132 Z" fill="#ec4899" stroke-width="5"/>
    <!-- Dress collar -->
    <path d="M42 86 Q50 92 58 86" fill="none" stroke-width="3"/>
    <!-- Outstretched arms (welcome hug pose) -->
    <path d="M28 90 Q14 96 8 86" fill="none" stroke-width="5"/>
    <path d="M72 90 Q86 96 92 86" fill="none" stroke-width="5"/>
    <circle cx="8" cy="86" r="4" fill="#fde4c8" stroke-width="3"/>
    <circle cx="92" cy="86" r="4" fill="#fde4c8" stroke-width="3"/>
    <!-- Head -->
    <circle cx="50" cy="54" r="22" fill="#fde4c8" stroke-width="5"/>
    <!-- Hair bangs -->
    <path d="M30 52 Q34 36 50 36 Q66 36 70 52 Q60 46 50 48 Q40 46 30 52 Z" fill="#3d2817" stroke-width="4"/>
    <!-- Side ponytail -->
    <path d="M68 54 Q84 56 86 70 Q82 74 76 70 Q70 64 68 58 Z" fill="#3d2817" stroke-width="4"/>
    <!-- Ponytail tie (yellow) -->
    <circle cx="74" cy="58" r="3.5" fill="#fcd34d" stroke-width="2"/>
    <!-- Big shy round eyes -->
    <circle cx="42" cy="54" r="5" fill="#fef8ed" stroke-width="3.5"/>
    <circle cx="58" cy="54" r="5" fill="#fef8ed" stroke-width="3.5"/>
    <circle cx="42" cy="55" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="58" cy="55" r="3.2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <circle cx="43" cy="54" r="1.2" fill="#fef8ed" stroke="none"/>
    <circle cx="59" cy="54" r="1.2" fill="#fef8ed" stroke="none"/>
    <!-- Strong cheek blush -->
    <circle cx="36" cy="64" r="3.8" fill="#f4a8a8" opacity="0.92" stroke="none"/>
    <circle cx="64" cy="64" r="3.8" fill="#f4a8a8" opacity="0.92" stroke="none"/>
    <!-- Big open-mouth happy smile -->
    <path d="M44 70 Q50 76 56 70" fill="#dc2626" stroke-width="2.5"/>
    <!-- Treat bag at feet (cream + amber treats) -->
    <rect x="38" y="108" width="24" height="20" rx="3" fill="#fef8ed" stroke-width="4"/>
    <!-- "Cat food" label -->
    <ellipse cx="50" cy="113" rx="6" ry="3" fill="#fb923c" stroke-width="2"/>
    <circle cx="44" cy="120" r="1.5" fill="#fb923c" stroke="none"/>
    <circle cx="50" cy="122" r="1.5" fill="#fb923c" stroke="none"/>
    <circle cx="56" cy="120" r="1.5" fill="#fb923c" stroke="none"/>
  </g>
</svg>`},npcBrutus:{id:`npcBrutus`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="br-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#bbf7d0"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#br-halo)" opacity="0.82"/>
  <!-- Bone context (alpha dog) -->
  <g fill="#fef8ed" stroke="#1a1a1a" stroke-width="2">
    <path d="M82 30 Q88 26 90 30 Q88 32 86 34 Q88 36 90 38 Q88 42 82 38 Q78 36 76 34 Q78 32 82 30 Z"/>
  </g>
  <!-- Paw print context -->
  <g fill="#1a1a1a" stroke="none" opacity="0.55">
    <circle cx="12" cy="36" r="2"/>
    <circle cx="9" cy="32" r="1"/>
    <circle cx="15" cy="32" r="1"/>
    <circle cx="9" cy="40" r="1"/>
    <circle cx="15" cy="40" r="1"/>
  </g>
  <ellipse cx="50" cy="133" rx="28" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (brown) -->
    <path d="M22 96 Q18 78 36 70 Q50 66 64 70 Q82 78 78 96 Q82 122 64 128 Q50 130 36 128 Q18 122 22 96 Z" fill="#92400e" stroke-width="5"/>
    <!-- Tan belly -->
    <ellipse cx="50" cy="106" rx="16" ry="16" fill="#d4a574" stroke="none"/>
    <!-- Head COCKED to side (transform rotate for tilt) -->
    <g transform="rotate(-12 50 52)">
      <circle cx="50" cy="52" r="26" fill="#92400e" stroke-width="5"/>
      <!-- Floppy ears -->
      <path d="M24 50 Q14 76 30 80 Q34 70 32 54 Z" fill="#6b4a2a" stroke-width="4"/>
      <path d="M76 50 Q86 76 70 80 Q66 70 68 54 Z" fill="#6b4a2a" stroke-width="4"/>
      <!-- Snout -->
      <ellipse cx="50" cy="64" rx="14" ry="12" fill="#d4a574" stroke-width="4"/>
      <!-- Nose -->
      <ellipse cx="50" cy="60" rx="4.5" ry="3.5" fill="#1a1a1a" stroke-width="3"/>
      <!-- Mouth -->
      <path d="M44 70 Q50 74 56 70" fill="none" stroke-width="3"/>
      <path d="M50 70 L50 74" fill="none" stroke-width="2.5"/>
      <!-- Good eye -->
      <circle cx="40" cy="48" r="4.5" fill="#fef8ed" stroke-width="3.5"/>
      <circle cx="40" cy="49" r="2.8" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
      <circle cx="41" cy="48" r="1" fill="#fef8ed" stroke="none"/>
      <!-- Scarred eye X -->
      <path d="M56 44 L64 52" stroke-width="3.5"/>
      <path d="M64 44 L56 52" stroke-width="3.5"/>
      <!-- Cheek scar -->
      <path d="M40 32 L46 38" stroke-width="2.5"/>
    </g>
    <!-- Scruffy fur tufts (outside rotation) -->
    <path d="M28 86 L24 92 L30 92 Z" fill="#6b4a2a" stroke-width="3"/>
    <path d="M72 86 L76 92 L70 92 Z" fill="#6b4a2a" stroke-width="3"/>
    <!-- Tail wagging up (attentive friendly) -->
    <path d="M74 110 Q92 96 86 80" fill="none" stroke-width="4"/>
  </g>
</svg>`},npcFamily:{id:`npcFamily`,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <radialGradient id="fm-halo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="76" r="54" fill="url(#fm-halo)" opacity="0.85"/>
  <!-- Sparkles context (warm family moment) -->
  <g fill="#fef8ed" stroke="none">
    <path d="M12 24 L13.5 27 L16.5 28 L13.5 29 L12 32 L10.5 29 L7.5 28 L10.5 27 Z"/>
    <path d="M90 28 L91 30 L93 30.5 L91 31 L90 33 L89 31 L87 30.5 L89 30 Z"/>
  </g>
  <ellipse cx="50" cy="134" rx="42" ry="2.5" fill="#1a1a1a" opacity="0.2"/>
  <!-- Shared blanket behind them (warm tan, ground line) -->
  <path d="M6 124 Q50 118 94 124 L94 132 L6 132 Z" fill="#d4a574" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- Heart above (signature unity) -->
    <path d="M50 22 Q46 14 40 18 Q34 22 38 28 Q44 34 50 40 Q56 34 62 28 Q66 22 60 18 Q54 14 50 22 Z" fill="#ec4899" stroke-width="4"/>

    <!-- Dad (left) — pulled closer to center -->
    <circle cx="26" cy="64" r="14" fill="#fde4c8" stroke-width="4"/>
    <path d="M14 60 Q16 50 26 50 Q36 50 38 60 Q34 56 26 56 Q18 56 14 60 Z" fill="#1a1a1a" stroke-width="3"/>
    <path d="M14 84 Q18 76 26 76 Q40 76 42 84 L42 124 L12 124 Z" fill="#fb923c" stroke-width="4"/>
    <circle cx="22" cy="64" r="1.8" fill="#1a1a1a" class="mascot-eye" stroke="none"/>
    <circle cx="30" cy="64" r="1.8" fill="#1a1a1a" class="mascot-eye mascot-eye-right" stroke="none"/>
    <path d="M22 70 Q26 72 30 70" fill="none" stroke-width="2.5"/>
    <circle cx="18" cy="68" r="2.2" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="34" cy="68" r="2.2" fill="#f4a8a8" opacity="0.8" stroke="none"/>

    <!-- Mom (right) — pulled closer -->
    <circle cx="74" cy="64" r="14" fill="#fde4c8" stroke-width="4"/>
    <path d="M60 60 Q62 48 74 48 Q86 50 86 62 Q84 70 80 74 Q78 68 74 68 Q70 68 68 74 Q62 70 60 60 Z" fill="#6b4a2a" stroke-width="3"/>
    <path d="M58 84 Q62 76 74 76 Q86 76 88 84 L88 124 L58 124 Z" fill="#ec4899" stroke-width="4"/>
    <path d="M68 64 Q70 66 72 64" fill="none" stroke-width="2.5" class="mascot-eye"/>
    <path d="M76 64 Q78 66 80 64" fill="none" stroke-width="2.5" class="mascot-eye mascot-eye-right"/>
    <path d="M70 70 Q74 72 78 70" fill="none" stroke-width="2.5"/>
    <circle cx="66" cy="68" r="2.2" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <circle cx="82" cy="68" r="2.2" fill="#f4a8a8" opacity="0.85" stroke="none"/>

    <!-- Mei-mei (center, between parents — huddle) -->
    <circle cx="50" cy="82" r="12" fill="#fde4c8" stroke-width="4"/>
    <path d="M40 80 Q42 70 50 70 Q58 70 60 80 Q54 76 50 78 Q46 76 40 80 Z" fill="#3d2817" stroke-width="3"/>
    <circle cx="60" cy="78" r="3" fill="#3d2817" stroke-width="2.5"/>
    <path d="M42 100 Q46 96 50 96 Q54 96 58 100 L58 124 L42 124 Z" fill="#ec4899" stroke-width="4"/>
    <circle cx="46" cy="82" r="1.5" fill="#1a1a1a" class="mascot-eye" stroke="none"/>
    <circle cx="54" cy="82" r="1.5" fill="#1a1a1a" class="mascot-eye mascot-eye-right" stroke="none"/>
    <path d="M46 86 Q50 88 54 86" fill="none" stroke-width="2.2"/>
    <circle cx="43" cy="85" r="1.8" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <circle cx="57" cy="85" r="1.8" fill="#f4a8a8" opacity="0.85" stroke="none"/>

    <!-- Connecting arms (huddle effect) -->
    <path d="M38 92 Q44 96 50 96" fill="none" stroke-width="4"/>
    <path d="M62 92 Q56 96 50 96" fill="none" stroke-width="4"/>
  </g>
</svg>`}};function lr(e){return(cr[e]??cr.owl).svg}var ur=700,dr=null,G=null,fr=new Set,pr=mr();function mr(){if(typeof window>`u`)return 1;let e=window.innerHeight;return e<620?.6:e<720?.75:1}function hr(){let e=mr();e!==pr&&(pr=e,fr.forEach(t=>t(e)))}function gr(e){return fr.add(e),e(pr),fr.size===1&&typeof window<`u`&&(typeof ResizeObserver<`u`&&(dr=new ResizeObserver(()=>hr()),dr.observe(document.documentElement)),G=()=>hr(),window.addEventListener(`resize`,G),window.addEventListener(`orientationchange`,G)),()=>{fr.delete(e),fr.size===0&&(dr&&=(dr.disconnect(),null),G&&typeof window<`u`&&(window.removeEventListener(`resize`,G),window.removeEventListener(`orientationchange`,G),G=null))}}var _r=class{root;inner;currentMascot=``;oneShotTimer;unsubScale;extraScale=1;viewportScale=pr;constructor(e={}){this.root=document.createElement(`div`),this.root.id=`pickup-mascot`,I(this.root,{width:`calc(120px * var(--mascot-scale, 1))`,height:`calc(135px * var(--mascot-scale, 1))`,margin:`0 auto`,pointerEvents:`none`,display:`flex`,alignItems:`center`,justifyContent:`center`,flex:`0 0 auto`,transition:`width 200ms ease-out, height 200ms ease-out`}),this.inner=document.createElement(`div`),this.inner.className=`mascot-wrap mascot-idle`,I(this.inner,{width:`100%`,height:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`}),this.root.appendChild(this.inner),(e.parent??document.body).appendChild(this.root),this.unsubScale=gr(e=>{this.viewportScale=e,this.applyScale()})}setScenarioStripVisible(e){}setMascot(e){e!==this.currentMascot&&(this.currentMascot=e,this.inner.innerHTML=lr(e))}setMascotImage(e){e!==this.currentMascot&&(this.currentMascot=e,this.inner.innerHTML=`
      <div style="position:relative;width:100%;height:100%;">
        <div style="
          position:absolute; left:18%; right:18%; bottom:4%;
          height:9%;
          background:rgba(60,42,28,0.28);
          border-radius:50%;
          z-index:0;
        "></div>
        <img src="${e}" alt="" aria-hidden="true" style="
          position:relative;
          width:100%;height:100%;object-fit:contain;pointer-events:none;
          z-index:1;
        " />
      </div>
    `)}setAnim(e){this.clearOneShot(),this.inner.classList.remove(`mascot-idle`,`mascot-happy`,`mascot-sad`),this.inner.classList.add(`mascot-${e}`),e!==`idle`&&(this.oneShotTimer=window.setTimeout(()=>{this.setAnim(`idle`)},ur))}setExtraScale(e){this.extraScale=e,this.applyScale()}destroy(){this.clearOneShot(),this.unsubScale?.(),this.unsubScale=void 0,this.root.remove()}show(){this.root.style.display=`flex`}hide(){this.root.style.display=`none`}applyScale(){let e=this.viewportScale*this.extraScale;this.root.style.setProperty(`--mascot-scale`,String(e))}clearOneShot(){this.oneShotTimer!==void 0&&(window.clearTimeout(this.oneShotTimer),this.oneShotTimer=void 0)}},K=null,vr=null;function yr(){return K?Promise.resolve(K):vr||(vr=fetch(`/word-hints.json`).then(e=>{if(!e.ok)throw Error(`word-hints.json ${e.status}`);return e.json()}).then(e=>{let t={};for(let n of Object.keys(e))t[n.toLowerCase()]=e[n];return K=t,t}).catch(e=>(console.warn(`[WordHint] preload failed:`,e),K={},K)),vr)}function br(e){if(!K)return null;let t=e.toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g,``);if(!t)return null;if(t in K)return K[t];let n=t.replace(/^'+|'+$/g,``);return n&&n in K?K[n]:null}var xr=null,Sr=3e3;function Cr(){if(xr)return xr;let e=document.createElement(`div`);return e.className=`pickup-word-tooltip`,e.setAttribute(`role`,`tooltip`),e.setAttribute(`aria-live`,`polite`),e.style.display=`none`,document.body.appendChild(e),xr={el:e,anchor:null,timer:null,outsideHandler:null,repositionHandler:null},xr}function wr(e){e.timer!==null&&(window.clearTimeout(e.timer),e.timer=null)}function Tr(e){e.outsideHandler&&=(document.removeEventListener(`pointerdown`,e.outsideHandler,!0),null),e.repositionHandler&&=(window.removeEventListener(`scroll`,e.repositionHandler,!0),window.removeEventListener(`resize`,e.repositionHandler),null)}function Er(e){if(!e.anchor)return;let t=e.anchor.getBoundingClientRect(),n=e.el.getBoundingClientRect(),r=t.left+t.width/2-n.width/2;r=Math.max(8,Math.min(window.innerWidth-n.width-8,r));let i=t.top-n.height-8,a,o=!1;i>=8?a=i:(a=t.bottom+8,o=!0),e.el.style.left=`${Math.round(r)}px`,e.el.style.top=`${Math.round(a)}px`,e.el.classList.toggle(`below`,o);let s=t.left+t.width/2-r;e.el.style.setProperty(`--pickup-tip-arrow`,`${Math.round(s)}px`)}function Dr(){if(!xr)return;let e=xr;wr(e),Tr(e),e.anchor&&=(e.anchor.classList.remove(`is-hinted`),null),e.el.style.display=`none`,e.el.textContent=``}function Or(e,t,n){let r=Cr();if(r.anchor===e&&r.el.style.display!==`none`){Dr();return}r.anchor&&r.anchor!==e&&r.anchor.classList.remove(`is-hinted`),r.anchor=e,e.classList.add(`is-hinted`),r.el.innerHTML=``;let i=document.createElement(`span`);i.className=`pickup-word-tooltip-en`,i.textContent=t;let a=document.createElement(`span`);a.className=`pickup-word-tooltip-zh`,a.textContent=n,r.el.appendChild(i),r.el.appendChild(a),r.el.style.display=`flex`,Er(r),r.el.classList.remove(`pickup-word-tooltip-show`),r.el.offsetWidth,r.el.classList.add(`pickup-word-tooltip-show`),wr(r),r.timer=window.setTimeout(()=>Dr(),Sr),Tr(r),r.outsideHandler=e=>{let t=e.target;t&&(t instanceof Element&&(t.closest(`.word`)||t.closest(`.pickup-word-tooltip`))||Dr())},document.addEventListener(`pointerdown`,r.outsideHandler,!0),r.repositionHandler=()=>Er(r),window.addEventListener(`scroll`,r.repositionHandler,!0),window.addEventListener(`resize`,r.repositionHandler)}function kr(e){e.dataset.pickupWordHints!==`1`&&(e.dataset.pickupWordHints=`1`,e.addEventListener(`pointerdown`,t=>{let n=t.target;if(!n)return;let r=n.closest(`.word`);if(!r||!e.contains(r))return;let i=r.dataset.word??r.textContent??``;if(!i)return;let a=br(i);a&&(t.stopPropagation(),Or(r,i,a))}))}function Ar(){Dr()}var jr=class{appRoot;root;header;streakEl;streakNum;chapterChip;chapterChipText;progressTrack;progressFill;hpEl;hpHearts=[];chipEl;chipText;mascotHalo;mascotMount;card;sentenceEl;getSentenceElement(){return this.sentenceEl}timerEl;timerNum;buttonsSlotEl;revealSlotEl;changeLink;flashEl;ambientEls=[];opts;constructor(e){this.opts=e;let t=document.getElementById(`app`);if(!t)throw Error(`GameHUD: #app element not found`);this.appRoot=t,this.root=document.createElement(`div`),this.root.id=`pickup-hud`,I(this.root,{display:`flex`,flexDirection:`column`,alignItems:`stretch`,gap:`10px`,width:`100%`,flex:`1 1 auto`,minHeight:`0`,fontFamily:`"Nunito", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,color:`#3c3c3c`}),this.buildHeader(),this.buildChip(),this.buildAmbient(),this.buildMascotSlot(),this.buildSentenceCard(),this.buildButtonsSlot(),this.buildRevealSlot(),this.buildChangeLink(),this.buildFlashOverlay(),this.appRoot.appendChild(this.root),yr(),kr(this.sentenceEl)}destroy(){Ar(),this.root.remove(),this.flashEl?.remove();for(let e of this.ambientEls)e.remove();this.ambientEls=[],this.appRoot.classList.remove(`pickup-shake`)}mascotSlot(){return this.mascotMount}buttonsSlot(){return this.buttonsSlotEl}revealSlot(){return this.revealSlotEl}shake(){this.appRoot.classList.remove(`pickup-shake`),this.appRoot.offsetWidth,this.appRoot.classList.add(`pickup-shake`),window.setTimeout(()=>{this.appRoot.classList.remove(`pickup-shake`)},220)}flash(e,t){this.flashEl.style.background=e,this.flashEl.style.setProperty(`--flash-peak`,String(t)),this.flashEl.classList.remove(`pickup-flash-on`),this.flashEl.offsetWidth,this.flashEl.classList.add(`pickup-flash-on`)}buildHeader(){this.header=document.createElement(`div`),I(this.header,{width:`100%`,padding:`6px 0 0 0`,display:`flex`,alignItems:`center`,gap:`12px`,flex:`0 0 auto`});let e=document.createElement(`button`);e.type=`button`,e.setAttribute(`aria-label`,`Quit lesson`),e.innerHTML=`×`,I(e,{width:`32px`,height:`32px`,borderRadius:`50%`,background:`rgba(180, 165, 140, 0.18)`,color:`#8b6f4a`,border:`none`,fontSize:`24px`,fontWeight:`900`,lineHeight:`1`,cursor:`pointer`,padding:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,flex:`0 0 auto`}),e.addEventListener(`click`,e=>{e.preventDefault(),!(typeof window<`u`&&window.confirm&&!window.confirm(`Leave the lesson? Progress in this round is lost.`))&&this.opts.onChange()}),this.header.appendChild(e),this.opts.hideStreak&&(this.chapterChip=document.createElement(`div`),I(this.chapterChip,{display:`inline-flex`,alignItems:`center`,padding:`6px 12px`,borderRadius:`999px`,background:`rgba(231, 164, 74, 0.18)`,color:`#8b6f4a`,fontSize:`13px`,fontWeight:`900`,letterSpacing:`0.6px`,fontFamily:`inherit`,flex:`0 0 auto`}),this.chapterChipText=document.createElement(`span`),this.chapterChipText.textContent=`q1`,this.chapterChip.appendChild(this.chapterChipText),this.header.appendChild(this.chapterChip)),this.streakEl=document.createElement(`div`),I(this.streakEl,{display:`flex`,alignItems:`baseline`,gap:`4px`,minWidth:`58px`,fontSize:`26px`,fontWeight:`900`,color:`var(--pickup-streak)`,textShadow:`0 1px 0 rgba(204, 120, 0, 0.25)`,letterSpacing:`-0.5px`,lineHeight:`1`});let t=document.createElement(`img`);t.src=`/mascots/icon-flame.webp`,t.setAttribute(`alt`,``),t.setAttribute(`aria-hidden`,`true`),I(t,{width:`22px`,height:`22px`,marginRight:`2px`,display:`block`}),this.streakEl.appendChild(t),this.streakNum=document.createElement(`span`),this.streakNum.textContent=`0`,I(this.streakNum,{fontSize:`26px`,fontWeight:`900`,lineHeight:`1`,transformOrigin:`center`}),this.streakEl.appendChild(this.streakNum),this.header.appendChild(this.streakEl),this.opts.hideStreak&&(this.streakEl.style.display=`none`),this.progressTrack=document.createElement(`div`),I(this.progressTrack,{flex:`1 1 auto`,height:`14px`,background:`rgba(234, 217, 187, 0.55)`,borderRadius:`7px`,overflow:`hidden`,position:`relative`}),this.progressFill=document.createElement(`div`),I(this.progressFill,{width:`0%`,height:`100%`,background:`var(--pickup-success)`,borderRadius:`7px`,transition:`width 360ms cubic-bezier(0.2, 0.8, 0.4, 1)`}),this.progressTrack.appendChild(this.progressFill),this.header.appendChild(this.progressTrack),this.hpEl=document.createElement(`div`),I(this.hpEl,{display:`flex`,alignItems:`center`,gap:`2px`,lineHeight:`1`,color:`var(--pickup-error)`,fontWeight:`800`,minWidth:`44px`,justifyContent:`flex-end`});let n=document.createElement(`span`);n.textContent=`♥`,I(n,{fontSize:`20px`,fontWeight:`900`,letterSpacing:`0px`,opacity:`0.95`,lineHeight:`1`});let r=document.createElement(`span`);r.textContent=`3`,I(r,{fontSize:`20px`,fontWeight:`900`,color:`var(--pickup-error)`,marginLeft:`4px`,lineHeight:`1`}),this.hpEl.appendChild(n),this.hpEl.appendChild(r),this.hpHearts=[n,r],this.header.appendChild(this.hpEl),this.opts.hideHp&&(this.hpEl.style.display=`none`),this.timerEl=document.createElement(`div`),I(this.timerEl,{minWidth:`44px`,height:`36px`,padding:`0 10px`,borderRadius:`10px`,background:`var(--pickup-surface)`,border:`2px solid var(--pickup-border)`,borderBottom:`3px solid var(--pickup-border-dark)`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`inherit`,fontWeight:`900`,fontSize:`17px`,color:`var(--pickup-text)`,pointerEvents:`none`,flex:`0 0 auto`,transition:`color 200ms ease, border-color 200ms ease, transform 200ms ease`}),this.timerNum=document.createElement(`span`),this.timerNum.textContent=`15`,this.timerEl.appendChild(this.timerNum),this.header.appendChild(this.timerEl),this.opts.hideTimer&&(this.timerEl.style.display=`none`),this.root.appendChild(this.header)}buildChip(){this.opts.scenarioLabel&&(this.chipEl=document.createElement(`div`),I(this.chipEl,{alignSelf:`center`,padding:`6px 14px`,borderRadius:`999px`,background:this.opts.accent,color:`#ffffff`,fontSize:`12px`,fontWeight:`900`,letterSpacing:`0.8px`,textTransform:`uppercase`,display:`inline-flex`,alignItems:`center`,gap:`6px`,flex:`0 0 auto`}),this.chipText=document.createElement(`span`),this.chipText.textContent=this.opts.scenarioLabel,this.chipEl.appendChild(this.chipText),this.root.appendChild(this.chipEl))}buildAmbient(){for(let e=1;e<=3;e++){let t=document.createElement(`div`);t.classList.add(`pickup-ambient`,`pickup-ambient-${e}`),this.appRoot.appendChild(t),this.ambientEls.push(t)}}buildMascotSlot(){this.mascotHalo=document.createElement(`div`),I(this.mascotHalo,{alignSelf:`center`,width:`calc(180px * var(--mascot-scale, 1))`,height:`calc(180px * var(--mascot-scale, 1))`,borderRadius:`50%`,background:this.opts.tint||`#e0f5d0`,flex:`0 0 auto`,display:`flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,transition:`width 200ms ease-out, height 200ms ease-out`}),this.mascotMount=document.createElement(`div`),I(this.mascotMount,{width:`100%`,height:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`}),this.mascotHalo.appendChild(this.mascotMount),this.root.appendChild(this.mascotHalo)}buildSentenceCard(){this.card=document.createElement(`div`),this.card.classList.add(`pickup-breathing`),I(this.card,{width:`100%`,background:`transparent`,borderRadius:`0`,border:`none`,padding:`12px 4px 8px 4px`,position:`relative`,display:`flex`,flexDirection:`column`,gap:`8px`,boxSizing:`border-box`,flex:`0 0 auto`}),this.sentenceEl=document.createElement(`div`),I(this.sentenceEl,{fontSize:`20px`,fontWeight:`700`,lineHeight:`1.6`,color:`var(--pickup-text)`,textAlign:`center`,display:`block`,minHeight:`64px`,transition:`opacity 260ms ease-out, transform 260ms ease-out`,letterSpacing:`0.2px`}),this.card.appendChild(this.sentenceEl),this.root.appendChild(this.card)}buildButtonsSlot(){this.buttonsSlotEl=document.createElement(`div`),I(this.buttonsSlotEl,{display:`flex`,flexDirection:`column`,gap:`10px`,width:`100%`,flex:`0 0 auto`}),this.root.appendChild(this.buttonsSlotEl)}buildRevealSlot(){this.revealSlotEl=document.createElement(`div`),I(this.revealSlotEl,{width:`100%`,flex:`0 0 auto`}),this.root.appendChild(this.revealSlotEl)}buildChangeLink(){this.changeLink=document.createElement(`button`),this.changeLink.type=`button`,this.changeLink.textContent=`← Change mode`,I(this.changeLink,{alignSelf:`center`,marginTop:`auto`,minHeight:`44px`,background:`transparent`,border:`none`,padding:`10px 16px`,color:`var(--pickup-text-muted)`,fontFamily:`inherit`,fontSize:`13px`,fontWeight:`700`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,flex:`0 0 auto`,borderRadius:`8px`,transition:`color 160ms ease-out, background 160ms ease-out`}),this.changeLink.addEventListener(`pointerover`,()=>{this.changeLink.style.color=`var(--pickup-text)`}),this.changeLink.addEventListener(`pointerout`,()=>{this.changeLink.style.color=`var(--pickup-text-muted)`}),this.changeLink.addEventListener(`click`,e=>{e.preventDefault(),this.opts.onChange()}),this.root.appendChild(this.changeLink)}buildFlashOverlay(){this.flashEl=document.createElement(`div`),this.flashEl.id=`pickup-flash`,document.body.appendChild(this.flashEl)}render(e){this.hpHearts[1].textContent=String(Math.max(0,e.hp)),e.streak>=2?(this.streakEl.style.opacity=`1`,this.streakNum.textContent=String(e.streak),this.streakEl.style.filter=``):(this.streakEl.style.opacity=`0.35`,this.streakEl.style.filter=``,this.streakNum.textContent=`0`);let t=Math.max(0,Math.min(1,(e.currentRound-1)/Math.max(1,e.totalRounds)));this.progressFill.style.width=`${Math.round(t*100)}%`,this.chapterChipText&&(this.chapterChipText.textContent=`q${e.currentRound}/${e.totalRounds}`),this.chipEl&&e.scenarioLabel?(this.chipText.textContent=e.scenarioLabel,this.chipEl.style.display=`inline-flex`):this.chipEl&&(this.chipEl.style.display=`none`),Ar(),this.sentenceEl.innerHTML=Mr(e.sentence),this.timerNum.textContent=String(e.timerSeconds);let n=e.timerLow;this.timerEl.style.color=n?`var(--pickup-error)`:`var(--pickup-text)`,this.timerEl.style.borderColor=n?`#ffb3b3`:`var(--pickup-border)`,this.timerEl.style.borderBottomColor=n?`var(--pickup-error)`:`var(--pickup-border-dark)`,this.timerEl.style.transform=n?`scale(1.06)`:``}updateTimer(e,t){this.timerNum.textContent=String(e),this.timerEl.style.color=t?`var(--pickup-error)`:`var(--pickup-text)`,this.timerEl.style.borderColor=t?`#ffb3b3`:`var(--pickup-border)`,this.timerEl.style.borderBottomColor=t?`var(--pickup-error)`:`var(--pickup-border-dark)`,this.timerEl.style.transform=t?`scale(1.06)`:``}hideTimer(){this.timerEl.style.display=`none`}setTotalRounds(e){e>0&&(this.opts.totalRounds=e)}animateSentenceIn(){this.sentenceEl.classList.remove(`pickup-fade-up`),this.sentenceEl.style.opacity=`0`,this.sentenceEl.style.transform=`translateY(8px)`,this.sentenceEl.offsetHeight,this.sentenceEl.classList.add(`pickup-fade-up`),this.sentenceEl.style.opacity=``,this.sentenceEl.style.transform=``}shakeHp(){matchMedia(`(prefers-reduced-motion: reduce)`).matches||this.hpEl.animate([{transform:`translateX(0)`},{transform:`translateX(-4px)`},{transform:`translateX(4px)`},{transform:`translateX(-3px)`},{transform:`translateX(3px)`},{transform:`translateX(0)`}],{duration:360,easing:`ease-in-out`})}pulseStreak(){matchMedia(`(prefers-reduced-motion: reduce)`).matches||(this.streakNum.classList.remove(`pickup-streak-pop`),this.streakNum.offsetWidth,this.streakNum.classList.add(`pickup-streak-pop`),window.setTimeout(()=>{this.streakNum.classList.remove(`pickup-streak-pop`)},520),this.streakEl.animate([{transform:`scale(1)`},{transform:`scale(1.2)`},{transform:`scale(0.96)`},{transform:`scale(1)`}],{duration:380,easing:`cubic-bezier(0.34, 1.56, 0.64, 1)`}))}setMascotHaloTint(e){this.mascotHalo.style.background=e}};function Mr(e){let t=/_{3,}/g,n=``,r=0,i;for(;(i=t.exec(e))!==null;)i.index>r&&(n+=Pr(e.slice(r,i.index))),n+=Nr,r=i.index+i[0].length;return r<e.length&&(n+=Pr(e.slice(r))),n}var Nr=`<span aria-label="blank" style="display:inline-block;min-width:60px;border-bottom:3px solid var(--pickup-accent);margin:0 4px;padding:0 4px;color:var(--pickup-accent);">&nbsp;</span>`;function Pr(e){let t=/[A-Za-z]+(?:'[A-Za-z]+)*(?:-[A-Za-z]+(?:'[A-Za-z]+)*)*/g,n=``,r=0,i;for(;(i=t.exec(e))!==null;){i.index>r&&(n+=Fr(e.slice(r,i.index)));let t=i[0],a=Fr(t);n+=`<span class="word" data-word="${a}">${a}</span>`,r=i.index+t.length}return r<e.length&&(n+=Fr(e.slice(r))),n}function Fr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var Ir=15e3,Lr=3,Rr=4e3,zr=8e3,Br=8e3,Vr=2400,Hr=250,Ur=5e3,Wr=class extends h.default.Scene{hud;clozeUI;mascot;roundEndsAt=0;timerEvent;timerExpired=!1;lastTickSecond=-1;warningPlaying=!1;advanceTimer;locked=!1;loadingEl;retryEl;povSceneEl;tapHandle;constructor(){super({key:`PlayScene`})}create(){this.cameras.main.setBackgroundColor(`#ffffff`),document.getElementById(`pickup-bottom-nav`)?.remove(),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{this.cleanupOverlay()}),this.showLoadingDom(),this.bootstrap()}activeMeta(){let{mode:e,scenario:t,chapter:n}=D.getState();if(e===`story`&&n){let e=T[n];return{accent:e.accent,tint:e.tint,mascotId:e.kittenMascotId,emoji:e.emoji,labelZh:e.titleZh,labelEn:e.titleEn}}return e===`scenario`&&t?ct[t]:ut}isStoryMode(){return D.getState().mode===`story`}async bootstrap(){let e=D.getState();try{await e.loadContent()}catch{}let t=D.getState(),n=(t.mode===`scenario`||!!t.questions)&&!!t.scenarioQuestions;if(t.error||!n){this.showLoadFailure(t.error??`unknown`);return}this.hideLoadingDom(),e.reset();let r=this.activeMeta(),i=D.getState(),a=i.mode===`story`,o=i.mode===`scenario`,s=a?``:o?r.labelEn:``,c=a?Math.max(i.storyTotalQuestionCount,O.STORY_QUESTIONS_PER_CHAPTER):O.QUESTIONS_PER_RUN;this.hud=new jr({accent:r.accent,tint:this.lightTintFor(r.tint),totalRounds:c,scenarioLabel:s,emoji:r.emoji,hideHp:a,hideStreak:a,hideTimer:a,onChange:()=>{this.cleanupOverlay(),this.stopTimer(),a?this.scene.start(`StoryModeScene`):this.scene.start(`MenuScene`)}}),this.clozeUI=new sr({onAnswer:e=>this.handleAnswer(e),onContinue:()=>this.handleContinue(),onForceCorrect:e=>this.handleForceCorrect(e)},{accent:r.accent,buttonsSlot:this.hud.buttonsSlot(),revealSlot:this.hud.revealSlot(),forceCorrectMode:a}),this.mascot=new _r({parent:this.hud.mascotSlot()}),a?this.mascot.setMascotImage(`/mascots/calico-anchor.webp`):this.mascot.setMascot(r.mascotId),this.nextRound()}lightTintFor(e){return e}showLoadingDom(){this.loadingEl||(this.loadingEl=document.createElement(`div`),this.loadingEl.id=`pickup-loading`,this.loadingEl.className=`pickup-cat-loader`,this.loadingEl.innerHTML=`
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M 110 195 L 145 100 L 180 195 Z" fill="#9d3e1c"/>
        <path d="M 290 195 L 255 100 L 220 195 Z" fill="#9d3e1c"/>
        <path d="M 134 188 L 154 138 L 174 188 Z" fill="#e89887"/>
        <path d="M 266 188 L 246 138 L 226 188 Z" fill="#e89887"/>
        <ellipse cx="200" cy="295" rx="138" ry="128" fill="#fdf0d6"/>
        <ellipse cx="158" cy="220" rx="38" ry="24" fill="#e89c5e" transform="rotate(-22 158 220)"/>
        <ellipse cx="270" cy="250" rx="32" ry="38" fill="#3a2a1f" transform="rotate(18 270 250)"/>
        <path d="M 80 330 L 130 335" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 80 352 L 130 350" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 270 335 L 320 330" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 270 350 L 320 352" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <ellipse cx="160" cy="295" rx="22" ry="36" fill="#1a1208"/>
        <ellipse cx="240" cy="295" rx="22" ry="36" fill="#1a1208"/>
        <circle cx="168" cy="282" r="6.5" fill="#ffffff"/>
        <circle cx="248" cy="282" r="6.5" fill="#ffffff"/>
        <path d="M 190 340 L 210 340 L 200 350 Z" fill="#d48474"/>
        <path d="M 178 372 Q 200 384 222 372" stroke="#1a1208" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      </svg>
      <div class="label">Loading…</div>
    `,document.body.appendChild(this.loadingEl))}hideLoadingDom(){this.loadingEl?.remove(),this.loadingEl=void 0,this.retryEl?.remove(),this.retryEl=void 0}showLoadFailure(e){if(this.loadingEl){let t=this.loadingEl.querySelector(`.label`);t&&(t.innerHTML=`Loading failed, try again?<br><span style="font-weight:600;color:var(--pickup-error);font-size:13px;">${Kr(e)}</span>`)}this.retryEl||(this.retryEl=document.createElement(`button`),this.retryEl.type=`button`,this.retryEl.textContent=`Retry`,Object.assign(this.retryEl.style,{position:`fixed`,top:`calc(50% + 60px)`,left:`50%`,transform:`translateX(-50%)`,minHeight:`52px`,padding:`14px 36px`,background:`var(--pickup-success)`,color:`#ffffff`,border:`none`,borderBottom:`4px solid var(--pickup-success-dark)`,borderRadius:`14px`,fontSize:`17px`,fontWeight:`900`,cursor:`pointer`,fontFamily:`"Noto Sans TC", "Nunito", system-ui, -apple-system, sans-serif`,letterSpacing:`0.5px`,pointerEvents:`auto`,zIndex:`12`,touchAction:`manipulation`}),this.retryEl.addEventListener(`click`,e=>{e.preventDefault(),this.retryEl?.remove(),this.retryEl=void 0;let t=this.loadingEl?.querySelector(`.label`);t&&(t.textContent=`Loading…`),this.bootstrap()}),document.body.appendChild(this.retryEl))}nextRound(){this.clearTimer(),this.cancelAdvanceTimer(),this.locked=!1,this.stopWarning();let e=D.getState(),t=this.isStoryMode(),n=e.history.length,r=t?Math.max(e.storyTotalQuestionCount,O.STORY_QUESTIONS_PER_CHAPTER):O.QUESTIONS_PER_RUN;if(n>=r&&r>0){this.toEnd();return}if(!t&&e.hp<=0){this.toEnd();return}e.startRound();let i=D.getState();if(!i.round){this.toEnd();return}t&&this.hud&&this.hud.setTotalRounds(i.storyTotalQuestionCount),this.clozeUI?.resetForRound(),this.mascot?.setAnim(`idle`),this.timerExpired=!1,this.lastTickSecond=-1,this.updatePovScene(),this.renderHud();let a=i.round,o=a?.type,s=a?o?o===`listen-mc`||o===`listen-emoji`||o===`listen-comprehension`:D.getState().listeningMode:!1;if(s&&a&&this.hud){let e=a.options[a.correctIndex]??``,t=a.sentence.replace(/_{2,}/g,e),n=this.hud.getSentenceElement(),r=a.sentence.split(/(\s+)/),i=e=>/\S/.test(e),o=e=>/_{2,}/.test(e),s=(e,t)=>`<span style="display:inline-block;border-bottom:${t?`3px`:`2px`} solid ${t?`#b07a2a`:`#c8a878`};min-width:${e}px;height:1.1em;vertical-align:-2px;margin:0 2px;border-radius:1px;"></span>`,c=r.map(e=>{if(!i(e))return e;let t=e.match(/^(.+?)([.,!?;:'"]+)?$/),n=t?.[1]??e,r=t?.[2]??``,a=o(n);return s((a?8:Math.min(Math.max(n.length,3),8))*8,a)+(r?`<span style="color:#8b6f4a;font-weight:800;">${r}</span>`:``)}).join(``),l=r.map(e=>{if(!i(e))return e;let t=e.match(/^(.+?)([.,!?;:'"]+)?$/),n=t?.[1]??e,r=t?.[2]??``;return o(n)?s(64,!0)+(r?`<span style="color:#8b6f4a;font-weight:800;">${r}</span>`:``):`<span class="word">${n}</span>${r}`}).join(``);if(n){let e=a.type,r=e===`listen-mc`||e===`listen-comprehension`;n.innerHTML=`
          <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 4px;">
            <button type="button" aria-label="Replay audio" class="pickup-listen-speaker pickup-speaker-pulse" style="
              flex:0 0 auto; width:40px; height:40px; padding:0;
              background:#e7a44a; border:none; border-bottom:3px solid #b07a2a;
              border-radius:50%; cursor:pointer;
              display:inline-flex; align-items:center; justify-content:center;
              touch-action:manipulation; -webkit-tap-highlight-color:transparent;
            ">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5zm4.5 7c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            </button>
            <div style="flex:1 1 auto;min-width:0;">
              <div class="pickup-listen-sentence" data-revealed="false" style="
                font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.8;
                cursor:pointer;user-select:none;
                max-height:140px;overflow:hidden;
              ">${c}</div>
              ${!r&&a.question?`<div style="font-size:17px;color:#3c2a1c;font-weight:800;line-height:1.8;">${a.question}</div>`:``}
            </div>
          </div>
        `,n.querySelector(`.pickup-listen-speaker`)?.addEventListener(`click`,e=>{if(e.preventDefault(),r&&typeof window<`u`&&window.speechSynthesis)try{window.speechSynthesis.cancel();let e=Array.isArray(a.options)?[`A`,`B`,`C`,`D`].map((e,t)=>`${e}. ${a.options[t]??``}.`).join(` `):``,n=new SpeechSynthesisUtterance(t);n.lang=`en-US`,n.rate=.7;let r=t=>{e&&(t.onend=()=>{window.setTimeout(()=>{try{let t=new SpeechSynthesisUtterance(e);t.lang=`en-US`,t.rate=.7,window.speechSynthesis.speak(t)}catch{}},600)})};a.question?n.onend=()=>{window.setTimeout(()=>{try{let e=new SpeechSynthesisUtterance(`Question. ${a.question}`);e.lang=`en-US`,e.rate=.7,r(e),window.speechSynthesis.speak(e)}catch{}},1e3)}:r(n),window.speechSynthesis.speak(n);return}catch{}P(t)});let i=n.querySelector(`.pickup-listen-sentence`);i?.addEventListener(`click`,()=>{i.getAttribute(`data-revealed`)!==`true`&&(i.setAttribute(`data-revealed`,`true`),i.innerHTML=l,i.style.cursor=`default`,kr(i))})}}if(!s&&a&&this.hud){let e=this.hud.getSentenceElement();if(e){if(a.question){let t=document.createElement(`div`);t.textContent=a.question,Object.assign(t.style,{fontSize:`13px`,color:`#7a6850`,fontWeight:`800`,marginBottom:`8px`,letterSpacing:`0.3px`}),e.insertBefore(t,e.firstChild)}let t=document.createElement(`button`);t.type=`button`,t.className=`pickup-mini-speaker`,t.setAttribute(`aria-label`,`Hear sentence`),t.innerHTML=`🔊`,Object.assign(t.style,{background:`#fffbf2`,border:`2px solid #e7a44a`,borderBottom:`3px solid #b07a2a`,borderRadius:`12px`,padding:`4px 10px`,fontSize:`16px`,cursor:`pointer`,marginRight:`8px`,verticalAlign:`middle`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),t.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation();let t=a.options[a.correctIndex]??``;P(a.sentence.replace(/_{2,}/g,t))}),e.insertBefore(t,e.firstChild)}}if(this.tapHandle?.destroy(),this.tapHandle=void 0,a&&(o===`tap-tiles`||o===`tap-pairs`||o===`type-what-you-hear`)&&this.hud){let e=this.hud.buttonsSlot();e.innerHTML=``;let t=a.options[a.correctIndex]??``,n=a.sentence.replace(/_{2,}/g,t);if(o===`tap-tiles`&&a.tiles&&a.correctOrder){this.tapHandle=Un({slot:e,tiles:a.tiles,correctOrder:a.correctOrder,prompt:a.question??`Tap what you hear`,onSpeak:()=>P(n),onComplete:e=>this.handleAnswer(e?a.correctIndex:(a.correctIndex+1)%4)}),An(n);let t=this.hud.getSentenceElement();t&&(t.innerHTML=``)}else if(o===`type-what-you-hear`){let t=a.options[a.correctIndex]??``;this.tapHandle=Wn({slot:e,correctAnswer:t,prompt:a.question??`Type what you hear`,onSpeak:()=>P(n),onComplete:e=>this.handleAnswer(e?a.correctIndex:(a.correctIndex+1)%4)}),An(n);let r=this.hud.getSentenceElement();if(r){let e=`<span style="display:inline-block;border-bottom:2.5px solid #b07a2a;min-width:${Math.max(t.length,4)*12}px;height:1.2em;vertical-align:-2px;margin:0 4px;"></span>`;r.innerHTML=`
            <div style="display:flex;align-items:center;gap:10px;justify-content:center;flex-wrap:wrap;padding:8px 4px;">
              <button type="button" aria-label="Replay sentence audio" class="pickup-sentence-speaker pickup-speaker-pulse" style="
                flex:0 0 auto; width:36px; height:36px; padding:0;
                background:#3d8aae; border:none; border-bottom:3px solid #2c6986;
                border-radius:50%; cursor:pointer;
                display:inline-flex; align-items:center; justify-content:center;
                touch-action:manipulation; -webkit-tap-highlight-color:transparent;
              ">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5zm4.5 7c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              </button>
              <span style="font-size:18px;line-height:1.7;font-weight:800;color:#3c2a1c;flex:1 1 auto;min-width:0;">${a.sentence.replace(/_{2,}/,e)}</span>
            </div>
          `,r.querySelector(`.pickup-sentence-speaker`)?.addEventListener(`click`,e=>{e.preventDefault(),P(n)})}}else if(o===`tap-pairs`&&a.pairs){this.tapHandle=Gn({slot:e,pairs:a.pairs,prompt:a.question??`Tap the pairs`,onComplete:e=>this.handleAnswer(e?a.correctIndex:(a.correctIndex+1)%4)});let t=this.hud.getSentenceElement();t&&(t.innerHTML=`<div style="font-size:13px;font-weight:700;color:#7a6850;text-align:center;">${a.sentence}</div>`)}}this.hud?.animateSentenceIn(),t?this.hud?.hideTimer():this.startTimer(),n>0&&_e()}toEnd(){let e=this.isStoryMode();this.cleanupOverlay(),e?this.scene.start(`ChapterEndScene`):this.scene.start(`EndScene`)}cleanupOverlay(){this.hideLoadingDom(),this.clozeUI?.destroy(),this.clozeUI=void 0,this.mascot?.destroy(),this.mascot=void 0,this.hud?.destroy(),this.hud=void 0,this.povSceneEl?.remove(),this.povSceneEl=void 0,this.tapHandle?.destroy(),this.tapHandle=void 0,this.stopWarning(),F()}updatePovScene(){let e=D.getState();if(e.mode!==`story`||!e.round||!e.chapter){this.povSceneEl?.remove(),this.povSceneEl=void 0;return}if(!this.povSceneEl){let e=document.createElement(`div`);e.className=`pickup-pov-scene`,e.setAttribute(`aria-hidden`,`true`),document.body.insertBefore(e,document.body.firstChild),this.povSceneEl=e}let t=/^kt-ch(\d+)-(\d+)/i.exec(e.round.id);if(t){let e=Number(t[1]),n=Number(t[2]);this.povSceneEl.setAttribute(`data-pov-scene`,`ch${e}-q${n}`),this.povSceneEl.setAttribute(`data-rain`,e===1?`true`:`false`)}}maybeStartBgm(){x.audioMuted||x.isBgmRunning||x.ensureContext()&&sn()}renderHud(){if(!this.hud)return;let e=D.getState(),t=e.round;if(!t)return;let n=this.activeMeta(),r=e.mode===`story`,i=e.mode===`scenario`,a=r?Math.max(e.storyTotalQuestionCount,O.STORY_QUESTIONS_PER_CHAPTER):O.QUESTIONS_PER_RUN,o=Math.min(e.history.length+1,a),s=Math.max(0,this.roundEndsAt-this.time.now),c=Math.ceil((s||Ir)/1e3),l=s>0&&s<=Ur,u=r?``:i?n.labelEn:``;this.hud.render({hp:e.hp,hpMax:Lr,streak:e.streak,currentRound:o,totalRounds:a,scenarioLabel:u,sentence:Gr(t.sentence),timerSeconds:c,timerRatio:s/Ir,timerLow:l,timerExpired:this.timerExpired})}handleAnswer(e){if(this.locked||this.timerExpired)return;this.locked=!0,this.stopTimer(),this.maybeStartBgm();let t=D.getState();if(!t.round)return;let n=this.isStoryMode(),r=t.streak,i=t.answer(e);if(this.clozeUI?.revealAnswer(e,i.correctIndex,i.explanationZh,i.correct),t.listeningMode&&this.hud&&t.round){let e=t.round.options[i.correctIndex]??``,n=t.round.sentence.replace(/_{2,}/,`<span style="color:#3d8aae;font-weight:900;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;">${e}</span>`),r=this.hud.getSentenceElement();r&&(r.innerHTML=`
          <div style="font-size:11px;color:#8b6f4a;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">
            You heard
          </div>
          <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.45;">
            ${n}
          </div>
        `)}i.correct?(this.mascot?.setAnim(`happy`),this.hud?.flash(`#58cc02`,.15),me(),x.vibrate(30),i.streak>r&&i.streak>=2&&this.hud?.pulseStreak(),this.scheduleAdvance(n?Vr:Rr)):(this.mascot?.setAnim(`sad`),this.hud?.flash(`#ff4b4b`,.13),this.hud?.shake(),he(),n?x.vibrate(30):(this.hud?.shakeHp(),ye(),x.vibrate([50,30,50]),this.scheduleAdvance(zr))),this.renderHud()}handleForceCorrect(e){let t=D.getState();t.awaitingRetry&&(t.retryRound(),this.clozeUI?.acknowledgeForceCorrect(),this.mascot?.setAnim(`happy`),this.hud?.flash(`#58cc02`,.15),me(),x.vibrate(30),this.scheduleAdvance(Vr))}handleContinue(){D.getState().awaitingRetry||!this.locked&&!this.timerExpired||(this.cancelAdvanceTimer(),this.advanceTimer=this.time.delayedCall(Hr,()=>this.nextRound()))}scheduleAdvance(e){this.cancelAdvanceTimer(),this.advanceTimer=this.time.delayedCall(e,()=>this.nextRound())}cancelAdvanceTimer(){this.advanceTimer&&=(this.advanceTimer.remove(!1),void 0)}startTimer(){this.roundEndsAt=this.time.now+Ir,this.timerEvent=this.time.addEvent({delay:100,loop:!0,callback:()=>this.tickTimer()}),this.tickTimer()}tickTimer(){let e=Math.max(0,this.roundEndsAt-this.time.now),t=Math.ceil(e/1e3),n=e<=Ur&&e>0;this.hud?.updateTimer(t,n),n&&!this.warningPlaying&&!this.locked&&(x.playWarningLayer(),this.warningPlaying=!0),n&&t!==this.lastTickSecond&&(this.lastTickSecond=t,ge(),x.vibrate(20)),n||(this.lastTickSecond=-1),e<=0&&!this.timerExpired&&!this.locked&&(this.timerExpired=!0,this.handleTimeout())}stopWarning(){this.warningPlaying&&=(x.stopWarningLayer(),!1)}handleTimeout(){if(this.isStoryMode())return;this.locked=!0,this.stopTimer();let e=D.getState().timeoutRound();this.clozeUI?.revealTimeout(e.correctIndex,e.explanationZh),this.mascot?.setAnim(`sad`),this.hud?.shakeHp(),this.hud?.flash(`#ff4b4b`,.13),this.hud?.shake(),ye(),x.vibrate([80,40,80]),this.renderHud(),this.scheduleAdvance(Br)}stopTimer(){this.timerEvent&&=(this.timerEvent.remove(!1),void 0),this.stopWarning()}clearTimer(){this.stopTimer(),this.hud?.updateTimer(15,!1)}};function Gr(e){return e.replace(/_{3,}/g,`_____`)}function Kr(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var qr=[`Picked up another moment`,`A little stronger today`,`Keep going like this`,`Nice · another round done`,`Your English is settling in`];function Jr(e){return e[Math.floor(Math.random()*e.length)]}var Yr=class{root;content;mascotSlotEl;scoreEl;opts;constructor(e){this.opts=e,this.root=document.createElement(`div`),this.root.id=`end-overlay`,I(this.root,{position:`fixed`,inset:`0`,background:`#fef8ed`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,paddingTop:`max(24px, env(safe-area-inset-top))`,paddingBottom:`max(20px, env(safe-area-inset-bottom))`,overflowY:`auto`,zIndex:`20`,fontFamily:`"Nunito", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,color:Zn}),this.content=document.createElement(`div`),I(this.content,{width:`min(420px, calc(100vw - 24px))`,display:`flex`,flexDirection:`column`,alignItems:`stretch`,gap:`14px`}),this.root.appendChild(this.content),this.build(),document.body.appendChild(this.root)}scoreElement(){return this.scoreEl}mascotSlot(){return this.mascotSlotEl}destroy(){this.root.remove()}build(){this.content.appendChild(this.makeBanner()),this.mascotSlotEl=document.createElement(`div`),I(this.mascotSlotEl,{width:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`,flex:`0 0 auto`}),this.content.appendChild(this.mascotSlotEl),this.opts.isScenario&&this.opts.scenarioId&&this.content.appendChild(this.makeScenarioCard()),this.content.appendChild(this.makeRank()),this.content.appendChild(this.makeStatsRow()),this.content.appendChild(this.makeCtas()),this.content.appendChild(this.makeFooter())}makeBanner(){let e=document.createElement(`div`);I(e,{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4px`,marginBottom:`4px`});let t=document.createElement(`div`);if(t.textContent=this.opts.dead?`So close · don't give up`:`Round Complete!`,I(t,{fontSize:`32px`,fontWeight:`900`,letterSpacing:`-0.3px`,textAlign:`center`,color:this.opts.dead?U:er,textShadow:this.opts.dead?`none`:`0 2px 0 ${$n}`,animation:`pickup-banner-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1)`,padding:`4px 8px`}),e.appendChild(t),!this.opts.dead){let t=document.createElement(`div`);t.textContent=Jr(qr),I(t,{fontSize:`14px`,fontWeight:`600`,fontStyle:`italic`,color:W,animation:`pickup-stat-in 480ms ease-out 280ms both`,opacity:`0`}),e.appendChild(t)}return e}makeRank(){let e=document.createElement(`div`);return e.textContent=this.opts.rankTitle,I(e,{fontSize:`16px`,fontWeight:`800`,textAlign:`center`,color:this.opts.rankColor,marginTop:`-4px`,marginBottom:`4px`}),e}makeScenarioCard(){let e=ct[this.opts.scenarioId],t=document.createElement(`div`);I(t,{padding:`12px 16px`,borderRadius:`16px`,background:e.tint,border:`2px solid ${e.accent}`,borderBottom:`4px solid ${e.accent}`,display:`flex`,flexDirection:`column`,gap:`4px`,alignItems:`center`,animation:`pickup-stat-in 360ms ease-out both`,animationDelay:`40ms`});let n=document.createElement(`div`);if(n.textContent=e.labelEn,I(n,{fontSize:`15px`,fontWeight:`800`,color:e.accent}),t.appendChild(n),this.opts.achievementText){let e=document.createElement(`div`);e.textContent=this.opts.achievementText,I(e,{fontSize:`14px`,fontWeight:`700`,color:Zn,textAlign:`center`}),t.appendChild(e)}let r=document.createElement(`div`);return r.textContent=this.opts.newBest?`New best · ${this.opts.bestScore}`:`Best ${this.opts.bestScore}`,I(r,{fontSize:`12px`,fontWeight:this.opts.newBest?`800`:`600`,color:this.opts.newBest?er:W,fontFamily:`ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace`}),t.appendChild(r),t}makeStatsRow(){let e=document.createElement(`div`);I(e,{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:`8px`,width:`100%`});let t=this.opts.totalAnswered>0?Math.round(this.opts.correct/this.opts.totalAnswered*100):0,n=Math.floor(this.opts.totalTimeSeconds/60),r=this.opts.totalTimeSeconds%60,i=n>0?`${n}:${String(r).padStart(2,`0`)}`:`${r}s`;return e.appendChild(this.makeStatTile({icon:``,label:`XP`,value:``,color:$n,countUpTo:this.opts.score,delayMs:200})),e.appendChild(this.makeStatTile({icon:``,label:`Accuracy`,value:`${t}%`,color:V,delayMs:320})),e.appendChild(this.makeStatTile({icon:``,label:`Time`,value:i,color:Qn,delayMs:440})),e.appendChild(this.makeStatTile({icon:``,label:`Streak`,value:String(this.opts.bestStreak),color:tr,delayMs:560})),e}makeStatTile(e){let t=document.createElement(`div`);if(I(t,{padding:`12px 6px`,borderRadius:`14px`,background:`#ffffff`,border:`2px solid ${e.color}`,borderBottom:`4px solid ${e.color}`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4px`,minWidth:`0`,animation:`pickup-stat-in 480ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,animationDelay:`${e.delayMs}ms`,opacity:`0`}),e.icon){let n=document.createElement(`div`);n.textContent=e.icon,I(n,{fontSize:`20px`,lineHeight:`1`}),t.appendChild(n)}let n=document.createElement(`div`);n.textContent=e.value,I(n,{fontSize:`22px`,fontWeight:`900`,color:e.color,lineHeight:`1.05`,letterSpacing:`-0.3px`}),t.appendChild(n),e.countUpTo!==void 0&&(this.scoreEl=n,n.textContent=`0`);let r=document.createElement(`div`);return r.textContent=e.label,I(r,{fontSize:`10px`,fontWeight:`800`,color:W,letterSpacing:`0.5px`,textTransform:`uppercase`}),t.appendChild(r),t}makeCtas(){let e=document.createElement(`div`);I(e,{display:`flex`,flexDirection:`column`,gap:`10px`,marginTop:`4px`});let t=this.makeCtaButton({text:`Play again →`,bg:V,bgDark:H,color:`#ffffff`,onClick:()=>this.opts.onPlayAgain(),pulse:!0});e.appendChild(t);let n=this.makeCtaButton({text:this.opts.isScenario?`Try another scenario`:`Change mode`,bg:`#ffffff`,bgDark:Xn,color:W,bordered:!0,onClick:()=>this.opts.onChangeMode()});return e.appendChild(n),e}makeCtaButton(e){let t=document.createElement(`button`);return t.type=`button`,t.textContent=e.text,I(t,{width:`100%`,minHeight:`52px`,padding:`15px 18px`,borderRadius:`14px`,border:e.bordered?`2px solid ${Yn}`:`none`,borderBottom:`4px solid ${e.bgDark}`,background:e.bg,color:e.color,fontSize:`17px`,fontWeight:`900`,letterSpacing:`0.4px`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 200ms ease-out`}),e.pulse&&t.classList.add(`pickup-pulse`),jn(t,{depth:2,borderBottom:{from:4,to:2}}),t.addEventListener(`click`,t=>{t.preventDefault(),e.onClick()}),t}makeFooter(){let e=document.createElement(`div`);return e.textContent=`v1.2.0`,I(e,{marginTop:`12px`,fontSize:`11px`,color:`#a8a2b3`,textAlign:`center`,fontFamily:`ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace`}),e}},Xr=[`#58cc02`,`#58cc02`,`#e7a44a`,`#e7a44a`,`#ffd900`,`#ff9600`,`#1cb0f6`,`#ffc800`],Zr=2500,Qr=100,$r=class{canvas;ctx;pieces=[];startedAt=0;rafId=0;finished=!1;constructor(){this.canvas=document.createElement(`canvas`),I(this.canvas,{position:`fixed`,inset:`0`,width:`100vw`,height:`100vh`,pointerEvents:`none`,zIndex:`30`}),this.ctx=this.canvas.getContext(`2d`),document.body.appendChild(this.canvas),this.resize(),window.addEventListener(`resize`,this.resize)}burst(){if(typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){this.cleanup();return}if(!this.ctx){this.cleanup();return}let e=this.canvas.width/(window.devicePixelRatio||1);for(let t=0;t<Qr;t++)this.pieces.push({x:Math.random()*e,y:-20-Math.random()*80,size:6+Math.random()*8,rot:Math.random()*Math.PI*2,rotSpeed:(Math.random()-.5)*.3,vx:(Math.random()-.5)*1.6,vy:2.2+Math.random()*2.4,color:Xr[Math.floor(Math.random()*Xr.length)],alpha:1});this.startedAt=performance.now(),this.tick()}destroy(){this.cleanup()}resize=()=>{let e=window.devicePixelRatio||1;this.canvas.width=window.innerWidth*e,this.canvas.height=window.innerHeight*e,this.ctx&&this.ctx.setTransform(e,0,0,e,0,0)};tick=()=>{if(this.finished||!this.ctx)return;let e=performance.now()-this.startedAt,t=e/Zr,n=this.canvas.width/(window.devicePixelRatio||1),r=this.canvas.height/(window.devicePixelRatio||1);this.ctx.clearRect(0,0,n,r);let i=.55;for(let e of this.pieces)e.x+=e.vx,e.y+=e.vy,e.rot+=e.rotSpeed,t>i&&(e.alpha=Math.max(0,1-(t-i)/(1-i))),this.ctx.save(),this.ctx.globalAlpha=e.alpha,this.ctx.translate(e.x,e.y),this.ctx.rotate(e.rot),this.ctx.fillStyle=e.color,this.ctx.fillRect(-e.size/2,-e.size/2,e.size,e.size),this.ctx.restore();if(e>=Zr){this.cleanup();return}this.rafId=requestAnimationFrame(this.tick)};cleanup(){this.finished||(this.finished=!0,this.rafId&&cancelAnimationFrame(this.rafId),window.removeEventListener(`resize`,this.resize),this.canvas.remove())}};function ei(e){return e>=90?{title:`Wordsmith Master`,color:`#58cc02`}:e>=60?{title:`Skilled Wordsmith`,color:`#1cb0f6`}:e>=30?{title:`Apprentice`,color:`#ffc800`}:{title:`Novice`,color:`#777777`}}var ti=class extends h.default.Scene{overlay;mascot;confetti;constructor(){super({key:`EndScene`})}create(){this.cameras.main.setBackgroundColor(`#ffffff`);let e=D.getState(),t=e.history.filter(e=>e.correct).length,n=e.history.length-t,r=e.hp<=0,i=e.history.length>=O.QUESTIONS_PER_RUN,a=ei(e.score),o=``,s=!1,c=0;e.mode===`scenario`&&e.scenario&&(i&&!r&&(ht(e.scenario),o=ct[e.scenario].achievement),s=mt(e.scenario,e.score),c=pt(e.scenario));let l=e.runStartedAt>0?Math.max(0,Math.round((Date.now()-e.runStartedAt)/1e3)):0,u=e.mode===`scenario`&&e.scenario?ct[e.scenario]:ut;this.overlay=new Yr({dead:r,score:e.score,rankTitle:a.title,rankColor:a.color,correct:t,wrong:n,totalAnswered:e.history.length,bestStreak:e.bestStreak,totalTimeSeconds:l,achievementText:o,newBest:s,bestScore:c,isScenario:e.mode===`scenario`,scenarioId:e.scenario,onPlayAgain:()=>{x.vibrate(15),D.getState().reset(),this.scene.start(`PlayScene`)},onChangeMode:()=>{D.getState().reset(),this.scene.start(`MenuScene`)}}),this.mascot=new _r({parent:this.overlay.mascotSlot()}),this.mascot.setMascot(u.mascotId),this.mascot.setAnim(`happy`),this.mascot.setExtraScale(1.8);let d=window.setInterval(()=>{this.mascot?.setAnim(`happy`)},2400);s&&!r&&e.score>0&&(this.confetti=new $r,this.confetti.burst()),r&&x.vibrate([120,80,120,80,200]);let f=this.overlay.scoreElement(),p={v:0},m=-1;this.tweens.add({targets:p,v:e.score,duration:900,delay:200,ease:`Quad.easeOut`,onUpdate:()=>{let e=Math.round(p.v);f.textContent=String(e),e!==m&&e%3==0&&e>0&&(m=e,ve())},onComplete:()=>{f.textContent=String(e.score),e.score>0&&!r&&be()}}),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{window.clearInterval(d),this.overlay?.destroy(),this.overlay=void 0,this.mascot?.destroy(),this.mascot=void 0,this.confetti?.destroy(),this.confetti=void 0})}},ni=e({DEFAULT_CAT_NAME:()=>ii,applyCatName:()=>ci,readCatName:()=>oi,writeCatName:()=>si}),ri=`pickup.cat-name`,ii=`Mochi`,ai=12;function oi(){if(typeof localStorage>`u`)return ii;try{let e=localStorage.getItem(ri);return e&&e.trim()?e.trim():ii}catch{return ii}}function si(e){let t=(e??``).trim().slice(0,ai)||`Mochi`;if(typeof localStorage>`u`)return t;try{localStorage.setItem(ri,t)}catch{}return t}function ci(e){return e&&e.replace(/\{catName\}/g,oi())}var li=e({DEFAULT_DOG_NAME:()=>di,applyDogName:()=>pi,readDogName:()=>fi}),ui=`pickup.dog-name`,di=`Hana`;function fi(){if(typeof localStorage>`u`)return di;try{let e=localStorage.getItem(ui);return e&&e.trim()?e.trim():di}catch{return di}}function pi(e){return e&&e.replace(/\{dogName\}/g,fi())}var mi=`#f1ebe1`,hi=`#a47148`,gi=`#7a5b3a`,_i=`#7d9a4f`,vi=`#5e7a36`,yi=`#c4b89c`,bi=`#a89c80`,xi=`#3c2a1c`,Si=`#7a6850`,Ci=82,wi=64,Ti=320,q=[{dx:10,top:16},{dx:30,top:116},{dx:38,top:214},{dx:16,top:312},{dx:-20,top:410},{dx:-38,top:506},{dx:-18,top:604},{dx:14,top:700},{dx:30,top:798},{dx:38,top:896}],Ei=[{dx:10,top:16},{dx:30,top:100},{dx:-20,top:184},{dx:18,top:268},{dx:38,top:352},{dx:24,top:436},{dx:-10,top:520},{dx:-34,top:604},{dx:-18,top:688},{dx:16,top:772},{dx:36,top:856},{dx:20,top:940},{dx:-12,top:1024},{dx:-32,top:1108},{dx:-16,top:1192},{dx:14,top:1276},{dx:34,top:1360},{dx:18,top:1444},{dx:-10,top:1528},{dx:-30,top:1612},{dx:-14,top:1696},{dx:16,top:1780},{dx:30,top:1864},{dx:0,top:1948},{dx:8,top:2032}],Di=`pickup.map.cat-node`;function Oi(e,t=.35){let n=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16);return`rgb(${Math.round(n*(1-t))}, ${Math.round(r*(1-t))}, ${Math.round(i*(1-t))})`}function ki(e,t=.22){let n=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16),a=e=>Math.round(e+(255-e)*t);return`rgb(${a(n)}, ${a(r)}, ${a(i)})`}var Ai=class{root;scrollArea;nodes=[];cat;handlers;constructor(e){this.handlers=e,this.root=document.createElement(`div`),this.root.id=`pickup-story-map`,I(this.root,{position:`fixed`,inset:`0`,background:mi,zIndex:`20`,display:`flex`,flexDirection:`column`,fontFamily:`"Nunito", "Noto Sans TC", system-ui, sans-serif`,color:xi});let t=this.buildHudBar();this.root.appendChild(t);let n=this.buildHeader();this.root.appendChild(n),this.scrollArea=document.createElement(`div`),I(this.scrollArea,{flex:`1 1 auto`,overflowY:`auto`,overflowX:`hidden`,paddingTop:`34px`,paddingBottom:`110px`,position:`relative`,WebkitOverflowScrolling:`touch`});let r=document.createElement(`div`);I(r,{width:`${Ti}px`,margin:`0 auto`,position:`relative`}),this.cat=this.buildCat(),r.appendChild(this.cat);let i=document.createElement(`div`);I(i,{position:`absolute`,left:`220px`,top:`480px`,width:`80px`,height:`90px`,pointerEvents:`none`,zIndex:`4`}),i.innerHTML=`
      <div style="
        position:absolute; left:8px; bottom:-2px;
        width:64px; height:9px;
        background:rgba(60,42,28,0.28);
        border-radius:50%;
        z-index:0;
      "></div>
      <img src="/mascots/iso-shiba.webp" alt="" style="
        position:absolute; left:0; bottom:0;
        width:80px; height:auto; display:block;
        z-index:1;
      " />
    `,r.appendChild(i);let a=E();Mt(1),Nt(1),this.deriveCurrentNodeIdx(a.highestCompleted);{let e=typeof window<`u`?new URLSearchParams(window.location.search):null,t=Math.min(Math.max(parseInt(e?.get(`ch`)??`1`,10)||1,1),8);(async()=>{try{let e=await qe(t),n=$t(t);e.forEach(e=>{let i=e.lessonInChapter-1;if(i<0||i>=Ei.length)return;let a=Ei[i],o=n.has(e.id),s=tn(1,e.lessonInChapter,n.size),c=pi(ci(e.storyBeat??`Lesson ${e.lessonInChapter}`)),l=this.buildNode({idx:i,label:c,unlocked:s,completed:o,chapter:t,positionOverride:a});l.el.addEventListener(`click`,n=>{n.preventDefault(),s&&(this.handlers.onPlayLesson?this.handlers.onPlayLesson(t,e.id):this.handlers.onPlayChapter(t))}),r.appendChild(l.el),this.nodes.push(l)})}catch(e){console.error(`Failed to load Ch1 lessons for V2 map:`,e)}})()}try{let e=`pickup.map.last-seen-completed`,t=parseInt(localStorage.getItem(e)??`0`,10),n=a.highestCompleted;if(n>t){for(let e of this.nodes)e.unlocked&&e.el.classList.add(`pickup-map-node-unlock-pop`);window.setTimeout(()=>{try{localStorage.setItem(e,String(n))}catch{}},1200)}else if(t===0&&n===0){let t=this.nodes[0];t?.unlocked&&t.el.classList.add(`pickup-map-node-unlock-pop`),window.setTimeout(()=>{try{localStorage.setItem(e,`0`)}catch{}},1200)}}catch{}this.scrollArea.appendChild(r),this.root.appendChild(this.scrollArea),document.body.appendChild(this.root);let o=this.deriveCurrentNodeIdx(a.highestCompleted);requestAnimationFrame(()=>this.positionCat(o,!1));let s=this.readLastCatIdx();s!==null&&s!==o&&requestAnimationFrame(()=>{this.positionCat(s,!1),requestAnimationFrame(()=>requestAnimationFrame(()=>this.positionCat(o,!0)))}),this.writeLastCatIdx(o),requestAnimationFrame(()=>{let e=this.nodes[o]?.el;if(e){let t=e.getBoundingClientRect();(t.top<80||t.bottom>window.innerHeight-130)&&e.scrollIntoView({behavior:`smooth`,block:`center`})}})}destroy(){this.closeKeySentences(),this.root.remove()}buildHudBar(){let e=document.createElement(`div`);I(e,{padding:`max(14px, env(safe-area-inset-top)) 14px 0`,flex:`0 0 auto`,display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`4px`,fontFamily:`inherit`,marginBottom:`8px`});let t=Ce(),n=Te(t),r=b(),i=ke(),a=(e=>e>=5?{stroke:`#3a9eaa`,label:`L${e}`,filter:`hue-rotate(155deg) saturate(0.75)`}:e>=3?{stroke:`#c79410`,label:`L${e}`,filter:`none`}:{stroke:`#7a8794`,label:`L${e}`,filter:`saturate(0.12) brightness(0.95)`})(n),o=(e,t=`none`)=>`<img src="/mascots/${e}" alt="" aria-hidden="true" width="24" height="24" style="display:block;filter:${t};" />`,s=o(`flag-en.webp`),c=o(`crown-gold.webp`,a.filter),l=o(`coin-gold.webp`),u=(e,t,n,r,i,a)=>{let o=document.createElement(`button`);o.type=`button`,o.setAttribute(`aria-label`,i);let s=typeof a==`number`?`<span style="display:block;width:38px;height:3px;background:rgba(122,104,80,0.18);border-radius:2px;margin-top:3px;overflow:hidden;">
             <span style="display:block;width:${Math.round(a*100)}%;height:100%;background:${r};border-radius:2px;transition:width 400ms cubic-bezier(0.2,0.8,0.4,1);"></span>
           </span>`:``;return o.innerHTML=`
        <span style="display:flex;flex-direction:column;align-items:center;gap:0;">
          <span style="display:flex;align-items:center;gap:4px;">
            ${e}
            ${t?`<span style="font-size:15px;font-weight:900;color:${r};line-height:1;">${t}</span>`:``}
          </span>
          ${s}
        </span>
      `,Object.assign(o.style,{background:`transparent`,border:`none`,cursor:`pointer`,padding:`8px 6px`,borderRadius:`10px`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,display:`flex`,alignItems:`center`,transition:`background 120ms ease, transform 80ms ease`}),jn(o,1),o.addEventListener(`click`,e=>{e.preventDefault(),n()}),o},d=t===0,f=De(t);return e.appendChild(u(s,``,()=>this.handlers.onSwitchTab?.(`profile`),`#3c2a1c`,`Language: English`)),e.appendChild(u(c,a.label,()=>this.handlers.onSwitchTab?.(`profile`),a.stroke,`Crown level ${n}, ${Math.round(f.fraction*100)}% to L${n+1}`,f.fraction)),e.appendChild(u(l,d?``:String(i),()=>this.handlers.onSwitchTab?.(`profile`),`#c79410`,`Coins ${i}`)),e.appendChild(u(`<img src="/mascots/icon-flame.webp" alt="" aria-hidden="true" width="26" height="26" style="display:block;" />`,d?``:String(r),()=>this.handlers.onSwitchTab?.(`tasks`),`#ff7a3a`,`Streak ${r} day${r===1?``:`s`}`)),e}buildHeader(){let e=T[1],t=document.createElement(`div`);I(t,{padding:`max(16px, env(safe-area-inset-top)) 14px 0 14px`,flex:`0 0 auto`});let n=document.createElement(`div`);I(n,{background:e.accent,borderRadius:`14px`,padding:`12px 16px`,color:`#ffffff`,boxShadow:`inset 0 8px 0 ${ki(e.accent,.18)}, 0 4px 0 ${Oi(e.accent,.32)}`,display:`flex`,alignItems:`center`,gap:`10px`}),n.innerHTML=`
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;opacity:0.85;">
          Section 1 · 第 1 章
        </div>
        <div style="font-size:17px;font-weight:900;line-height:1.2;margin-top:2px;">
          ${e.titleZh}
        </div>
        <div style="font-size:12px;font-weight:700;line-height:1.2;margin-top:2px;opacity:0.85;font-style:italic;">
          ${e.titleEn}
        </div>
      </div>
      <button type="button" aria-label="Chapter key sentences" class="pickup-banner-paw" style="
        width: 38px; height: 38px; border-radius: 11px;
        background: rgba(255,255,255,0.22);
        display: flex; align-items: center; justify-content: center;
        flex: 0 0 auto; border: none; cursor: pointer;
        padding: 0; font-family: inherit;
        touch-action: manipulation; -webkit-tap-highlight-color: transparent;
        transition: transform 80ms ease-out, background 160ms ease;
      ">
        <img src="/mascots/node-paw.webp" alt="" aria-hidden="true" width="24" height="24" style="display:block;filter:brightness(0) invert(1);" />
      </button>
    `;let r=n.querySelector(`.pickup-banner-paw`);return r&&(r.addEventListener(`mousedown`,()=>{r.style.transform=`translateY(2px)`}),r.addEventListener(`mouseup`,()=>{r.style.transform=``}),r.addEventListener(`mouseleave`,()=>{r.style.transform=``}),r.addEventListener(`touchstart`,()=>{r.style.transform=`translateY(2px)`},{passive:!0}),r.addEventListener(`touchend`,()=>{r.style.transform=``}),r.addEventListener(`click`,e=>{e.preventDefault(),this.openKeySentences(1)})),t.appendChild(n),t}keySheet;async openKeySentences(e){if(this.keySheet)return;let t=T[e],n=[];try{n=Tt(await wt(),e)}catch{}yr();let r=document.createElement(`div`);r.id=`pickup-key-sentences`,I(r,{position:`fixed`,inset:`0`,background:`#fef8ed`,zIndex:`80`,paddingTop:`max(28px, env(safe-area-inset-top))`,paddingBottom:`max(20px, env(safe-area-inset-bottom))`,overflowY:`auto`,fontFamily:`"Nunito", "Noto Sans TC", system-ui, sans-serif`,color:`#3c2a1c`,opacity:`0`,transition:`opacity 240ms ease-out`});let i=document.createElement(`div`);I(i,{width:`min(420px, calc(100vw - 32px))`,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:`14px`});let a=document.createElement(`div`);I(a,{display:`flex`,alignItems:`center`});let o=document.createElement(`button`);o.type=`button`,o.setAttribute(`aria-label`,`Close`),o.innerHTML=`×`,I(o,{width:`36px`,height:`36px`,borderRadius:`50%`,background:`#fffbf2`,border:`2px solid #ead9bb`,borderBottom:`3px solid #d4c098`,color:`#7a6850`,fontSize:`22px`,fontWeight:`900`,lineHeight:`1`,cursor:`pointer`,padding:`0`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),o.addEventListener(`click`,e=>{e.preventDefault(),this.closeKeySentences()}),a.appendChild(o),i.appendChild(a);let s=document.createElement(`div`);s.innerHTML=`
      <div style="font-size:12px;font-weight:800;letter-spacing:1.5px;color:#7a6850;text-transform:uppercase;text-align:center;">
        ${t.titleEn}
      </div>
      <div style="font-size:22px;font-weight:900;color:#3c2a1c;text-align:center;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:8px;">
        <img src="/mascots/icon-paw.webp" alt="" aria-hidden="true" width="28" height="28" style="display:inline-block;" />
        Key Sentences
      </div>
    `,i.appendChild(s);let c=document.createElement(`div`);c.textContent=`重點語句`,I(c,{fontSize:`14px`,fontWeight:`900`,color:`#3d8aae`,marginTop:`6px`}),i.appendChild(c);let l=document.createElement(`div`);I(l,{display:`flex`,flexDirection:`column`,gap:`12px`}),n.forEach(e=>{let t=document.createElement(`div`);I(t,{background:`#ffffff`,border:`2px solid #ead9bb`,borderRadius:`14px`,padding:`12px 14px`,display:`flex`,alignItems:`flex-start`,gap:`10px`});let n=e.options&&e.correctIndex!==void 0?e.options[e.correctIndex]??``:``,r=e.sentence.replace(/_{2,}/g,n),i=Pn({text:r,size:`sm`,ariaLabel:`Listen`});t.appendChild(i);let a=document.createElement(`div`);a.style.flex=`1 1 auto`;let o=document.createElement(`div`);if(o.className=`pickup-narration-line`,o.innerHTML=r.split(/(\s+)/).map(e=>/^\s+$/.test(e)||e===``?e:`<span class="word">${e}</span>`).join(``),I(o,{fontSize:`15px`,fontWeight:`700`,color:`#3c2a1c`,lineHeight:`1.5`}),a.appendChild(o),e.storyBeat){let t=document.createElement(`div`);t.textContent=e.storyBeat,I(t,{fontSize:`13px`,fontWeight:`600`,color:`#a8927a`,marginTop:`4px`,lineHeight:`1.45`}),a.appendChild(t)}t.appendChild(a),l.appendChild(t)}),i.appendChild(l),r.appendChild(i),document.body.appendChild(r),kr(r),requestAnimationFrame(()=>{r.style.opacity=`1`}),this.keySheet=r}closeKeySentences(){if(!this.keySheet)return;F();let e=this.keySheet;e.style.opacity=`0`,window.setTimeout(()=>e.remove(),220),this.keySheet=void 0}buildNode(e){let t=document.createElement(`button`);t.type=`button`,t.disabled=!e.unlocked,t.setAttribute(`aria-label`,`${e.label}${e.unlocked?``:` (locked)`}`),t.dataset.nodeIdx=String(e.idx);let n=e.positionOverride??q[e.idx]??q[q.length-1],r=Ti/2-Ci/2+n.dx,i=e.completed?_i:e.unlocked?hi:yi,a=e.completed?vi:e.unlocked?gi:bi;if(t.className=`pickup-map-node`,I(t,{left:`${r}px`,top:`${n.top}px`,background:i,boxShadow:`inset 0 8px 0 ${ki(i,.2)}, 0 10px 0 ${a}`,cursor:e.unlocked?`pointer`:`not-allowed`,opacity:e.unlocked?`1`:`0.7`}),e.completed?t.innerHTML=`<img src="/mascots/node-star.webp" alt="" aria-hidden="true" width="36" height="36" style="display:block;" />`:e.unlocked?t.innerHTML=`<img src="/mascots/node-paw.webp" alt="" aria-hidden="true" width="36" height="36" style="display:block;" />`:t.innerHTML=`<img class="pickup-node-icon" src="/mascots/node-paw.webp" alt="" aria-hidden="true" width="36" height="36" style="display:block;filter:grayscale(1);opacity:0.65;" />`,e.unlocked){let n=`inset 0 8px 0 ${ki(i,.2)}, 0 10px 0 ${a}`,r=`inset 0 8px 0 ${ki(i,.2)}, 0 3px 0 ${a}`,o=()=>{t.style.transform=`translateY(8px)`,t.style.boxShadow=r},s=()=>{t.style.transform=``,t.style.boxShadow=n};t.addEventListener(`mousedown`,o),t.addEventListener(`mouseup`,s),t.addEventListener(`mouseleave`,s),t.addEventListener(`touchstart`,o,{passive:!0}),t.addEventListener(`touchend`,s),t.addEventListener(`touchcancel`,s),e.positionOverride||t.addEventListener(`click`,t=>{t.preventDefault(),e.chapter!==null&&this.handlers.onPlayChapter(e.chapter)})}return{idx:e.idx,el:t,unlocked:e.unlocked,completed:e.completed,isCurrent:!1}}buildDivider(e){let t=document.createElement(`div`);return I(t,{position:`absolute`,left:`0`,right:`0`,top:`${q[7].top+wi+26}px`,textAlign:`center`,fontSize:`11px`,fontWeight:`800`,letterSpacing:`1.5px`,textTransform:`uppercase`,color:Si,padding:`14px 0`}),t.textContent=e,t}buildCat(){let e=document.createElement(`div`);return e.className=`pickup-map-cat`,I(e,{position:`absolute`,width:`122px`,height:`110px`,pointerEvents:`none`,zIndex:`5`,transition:`transform 700ms cubic-bezier(0.4, -0.3, 0.55, 1.5)`,transformOrigin:`50% 100%`,willChange:`transform`}),e.innerHTML=`
      <div style="
        position:absolute; left:6px; bottom:-2px;
        width:78px; height:10px;
        background:rgba(60,42,28,0.30);
        border-radius:50%;
        z-index:0;
      "></div>
      <img src="/mascots/iso-grandma.webp" alt="" style="
        position:absolute; left:0; bottom:0;
        width:88px; height:auto; display:block;
        z-index:2;
      " />
    `,e}deriveCurrentNodeIdx(e){return e>=1?-1:0}positionCat(e,t){if(!this.nodes[e])return;let n=q[e]??q[0];n.top,Ti/2-Ci/2+n.dx;let r=q.slice(0,8),i=r.reduce((e,t)=>e+t.dx,0)/r.length>=0?`L`:`R`,a=[60,100,130,180,220,380,440,500],o=130,s=1/0;for(let e of a){let t=e,n=e+110,a=0,c=1/0;for(let e of r){let r=e.top,o=e.top+wi;if(n<r||t>o)continue;a++;let s=Ti/2-Ci/2+e.dx,l=s+Ci,u=i===`L`?s-122:Ti-l;c=Math.min(c,u)}let l=a*100-c;l<s&&(s=l,o=e)}let c=i===`L`?14:Ti-122-14,l=o;t?this.cat.style.transform=`translate(${c}px, ${l}px)`:(this.cat.style.transition=`none`,this.cat.style.transform=`translate(${c}px, ${l}px)`,this.cat.offsetHeight,this.cat.style.transition=``)}readLastCatIdx(){try{let e=localStorage.getItem(Di);if(!e)return null;let t=Number(e);return Number.isFinite(t)?t:null}catch{return null}}writeLastCatIdx(e){try{localStorage.setItem(Di,String(e))}catch{}}},ji=e=>`<img src="/mascots/${e}" alt="" aria-hidden="true" width="32" height="32" style="display:block;" />`,Mi={home:ji(`nav-home.webp`),tasks:ji(`nav-tasks.webp`),profile:ji(`nav-profile.webp`),alerts:ji(`nav-alerts.webp`)},Ni={home:`Home`,tasks:`Tasks`,profile:`Profile`,alerts:`Alerts`},Pi=class{root;buttons=new Map;constructor(e,t){this.root=document.createElement(`nav`),this.root.id=`pickup-bottom-nav`,this.root.setAttribute(`aria-label`,`Primary`),I(this.root,{position:`fixed`,left:`0`,right:`0`,bottom:`0`,zIndex:`40`,display:`flex`,justifyContent:`space-around`,alignItems:`stretch`,padding:`max(8px, env(safe-area-inset-bottom)) 6px max(10px, env(safe-area-inset-bottom)) 6px`,background:`#3c2a1c`,borderTop:`3px solid #2a1d12`,fontFamily:`"Nunito", "Noto Sans TC", system-ui, sans-serif`});for(let n of[`home`,`tasks`,`profile`,`alerts`]){let r=document.createElement(`button`);r.type=`button`,r.setAttribute(`aria-label`,Ni[n]);let i=n===e;I(r,{flex:`1`,background:`transparent`,border:`none`,borderTop:i?`3px solid #f7c97d`:`3px solid transparent`,padding:`5px 4px 4px`,cursor:`pointer`,color:i?`#f7c97d`:`#a8927a`,opacity:i?`1`:`0.55`,transform:i?`translateY(-2px)`:`none`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`3px`,fontFamily:`inherit`,transition:`color 160ms ease, transform 160ms ease, border-top-color 160ms ease`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),r.innerHTML=`<span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;">${Mi[n]}</span>`,r.addEventListener(`click`,e=>{e.preventDefault(),t.onTab(n)}),this.buttons.set(n,r),this.root.appendChild(r)}document.body.appendChild(this.root)}setActive(e){for(let[t,n]of this.buttons){let r=t===e;n.style.color=r?`#f7c97d`:`#a8927a`,n.style.opacity=r?`1`:`0.55`,n.style.borderTop=r?`3px solid #f7c97d`:`3px solid transparent`,n.style.transform=r?`translateY(-2px)`:`none`}}destroy(){this.root.remove()}},Fi=`#3d8aae`,Ii=`#2c6986`,Li=`#e7a44a`,Ri=`#b07a2a`,zi=`#3c2a1c`,Bi=`#7a6850`,Vi=class{backdrop;sheet;handlers;constructor(e){this.handlers={onListening:e.onListening,onReading:e.onReading,onDismiss:e.onDismiss},this.backdrop=document.createElement(`div`),I(this.backdrop,{position:`fixed`,inset:`0`,background:`rgba(28, 18, 8, 0.45)`,zIndex:`60`,animation:`pickup-fade-in 180ms ease-out forwards`,opacity:`0`}),this.backdrop.addEventListener(`click`,e=>{e.target===this.backdrop&&this.dismiss()}),this.sheet=document.createElement(`div`),I(this.sheet,{position:`fixed`,left:`50%`,bottom:`max(90px, calc(env(safe-area-inset-bottom) + 80px))`,transform:`translateX(-50%)`,width:`min(380px, calc(100vw - 32px))`,background:`#ffffff`,borderRadius:`22px`,padding:`18px 18px 16px`,boxShadow:`0 8px 0 #d4c098`,display:`flex`,flexDirection:`column`,gap:`10px`,zIndex:`61`,fontFamily:`"Nunito", "Noto Sans TC", system-ui, sans-serif`,animation:`pickup-sheet-slide-up 260ms cubic-bezier(0.2, 0.8, 0.3, 1.1) forwards`,opacity:`0`});let t=document.createElement(`div`);t.innerHTML=`
      <div style="font-size:10px;font-weight:800;letter-spacing:1.4px;color:${Bi};text-transform:uppercase;">
        ${e.sectionLabel}
      </div>
      <div style="font-size:17px;font-weight:900;color:${zi};line-height:1.2;margin-top:2px;">
        ${e.questionLabel}
      </div>
    `,this.sheet.appendChild(t),this.sheet.appendChild(this.makeActivityButton({emoji:`🎧`,label:`Listening Practice`,sub:`+20 XP · hear the sentence and choose`,bg:Fi,bgDark:Ii,onClick:()=>{P(` `,`en-US`),this.dismiss(),this.handlers.onListening()}})),this.sheet.appendChild(this.makeActivityButton({emoji:`📖`,label:`Reading Practice`,sub:`+15 XP · read the sentence and choose`,bg:Li,bgDark:Ri,onClick:()=>{this.dismiss(),this.handlers.onReading()}})),document.body.appendChild(this.backdrop),document.body.appendChild(this.sheet),this.ensureKeyframes(),requestAnimationFrame(()=>{this.backdrop.style.opacity=`1`,this.sheet.style.opacity=`1`})}makeActivityButton(e){let t=document.createElement(`button`);t.type=`button`,I(t,{display:`flex`,alignItems:`center`,gap:`14px`,padding:`14px 16px`,borderRadius:`16px`,background:e.bg,color:`#ffffff`,border:`none`,borderBottom:`4px solid ${e.bgDark}`,cursor:`pointer`,textAlign:`left`,fontFamily:`inherit`,transition:`transform 80ms ease-out, border-bottom-width 80ms ease-out`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),t.innerHTML=`
      <div style="font-size:24px;line-height:1;">${e.emoji}</div>
      <div style="flex:1;">
        <div style="font-size:15px;font-weight:900;">${e.label}</div>
        <div style="font-size:11px;font-weight:700;opacity:0.85;margin-top:2px;">${e.sub}</div>
      </div>
      <div style="font-size:22px;font-weight:900;opacity:0.85;">→</div>
    `;let n=()=>{t.style.transform=`translateY(3px)`,t.style.borderBottomWidth=`1px`},r=()=>{t.style.transform=``,t.style.borderBottomWidth=`4px`};return t.addEventListener(`mousedown`,n),t.addEventListener(`mouseup`,r),t.addEventListener(`mouseleave`,r),t.addEventListener(`touchstart`,n,{passive:!0}),t.addEventListener(`touchend`,r),t.addEventListener(`touchcancel`,r),t.addEventListener(`click`,t=>{t.preventDefault(),e.onClick()}),t}ensureKeyframes(){if(document.getElementById(`pickup-sheet-kf`))return;let e=document.createElement(`style`);e.id=`pickup-sheet-kf`,e.textContent=`
      @keyframes pickup-fade-in { from { opacity: 0 } to { opacity: 1 } }
      @keyframes pickup-sheet-slide-up {
        from { opacity: 0; transform: translateX(-50%) translateY(40px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `,document.head.appendChild(e)}dismiss(){this.backdrop.remove(),this.sheet.remove(),this.handlers.onDismiss()}},Hi=[{id:`first-question`,emoji:`🐾`,iconSrc:`/mascots/icon-paw.webp`,title:`First Paw`,description:`Earn your first XP`,check:e=>({unlocked:e.xp>=1,progressLabel:e.xp>=1?void 0:`0 XP`})},{id:`ch1-complete`,emoji:`☂️`,title:`Rainy Night Survived`,description:`Complete Chapter 1`,check:e=>({unlocked:e.chaptersCompleted>=1,progressLabel:e.chaptersCompleted>=1?void 0:`Ch1 in progress`})},{id:`streak-3`,emoji:`🔥`,iconSrc:`/mascots/icon-flame.webp`,title:`Three-Day Spark`,description:`Hit a 3-day streak`,check:e=>({unlocked:e.streak>=3,progressLabel:e.streak>=3?void 0:`${e.streak}/3 days`})},{id:`streak-7`,emoji:`⚡`,iconSrc:`/mascots/icon-lightning.webp`,title:`Weekly Resilience`,description:`Hit a 7-day streak`,check:e=>({unlocked:e.streak>=7,progressLabel:e.streak>=7?void 0:`${e.streak}/7 days`})},{id:`streak-30`,emoji:`🌟`,iconSrc:`/mascots/icon-star.webp`,title:`Monthly Master`,description:`Hit a 30-day streak`,check:e=>({unlocked:e.streak>=30,progressLabel:e.streak>=30?void 0:`${e.streak}/30 days`})},{id:`xp-50`,emoji:`⭐`,iconSrc:`/mascots/node-star.webp`,title:`Level 2 Hatchling`,description:`Reach Level 2 (50 XP)`,check:e=>({unlocked:e.level>=2,progressLabel:e.level>=2?void 0:`${e.xp}/50 XP`})},{id:`xp-200`,emoji:`🎯`,title:`Level 3 Climb`,description:`Reach Level 3 (200 XP)`,check:e=>({unlocked:e.level>=3,progressLabel:e.level>=3?void 0:`${e.xp}/200 XP`})},{id:`all-chapters`,emoji:`🏆`,iconSrc:`/mascots/icon-trophy.webp`,title:`Way Home`,description:`Complete all 8 chapters`,check:e=>({unlocked:e.chaptersCompleted>=8,progressLabel:e.chaptersCompleted>=8?void 0:`${e.chaptersCompleted}/8 chapters`})}];function Ui(){let e=Ce(),t={xp:e,level:Te(e),streak:b(),chaptersCompleted:E().highestCompleted};return Hi.map(e=>{let{unlocked:n,progressLabel:r}=e.check(t);return{id:e.id,emoji:e.emoji,iconSrc:e.iconSrc,title:e.title,description:e.description,unlocked:n,progressLabel:r}})}function Wi(){let e=Ui();return{unlocked:e.filter(e=>e.unlocked).length,total:e.length}}var Gi=`#fef8ed`,J=`#e7a44a`,Y=`#b07a2a`,Ki=`#7a5b3a`,X=`#ead9bb`,Z=`#d4c098`,Q=`#3c2a1c`,$=`#7a6850`,qi=`#8b4530`,Ji={easy:`Easy`,medium:`Medium`,hard:`Hard`},Yi=class extends h.default.Scene{currentTab=`home`;mapView;panelEl;nav;constructor(){super({key:`StoryModeScene`})}create(){this.cameras.main.setBackgroundColor(Gi),this.nav=new Pi(`home`,{onTab:e=>this.switchTab(e)}),this.switchTab(`home`),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>this.cleanup())}cleanup(){this.mapView?.destroy(),this.mapView=void 0,this.panelEl?.remove(),this.panelEl=void 0,this.nav?.destroy(),this.nav=void 0,this.activitySheet?.dismiss(),this.activitySheet=void 0}activitySheet;openActivitySheet(e){this.activitySheet?.dismiss();let t=t=>{let n=D.getState();n.setMode(`story`),n.setChapter(e),n.setScenario(null),n.setLevel(`A2`),n.setListeningMode(t),this.cleanup(),this.scene.start(`ChapterIntroScene`)};this.activitySheet=new Vi({sectionLabel:`Section 1 · Chapter ${e}`,questionLabel:`Story practice — pick a mode`,onListening:()=>t(!0),onReading:()=>t(!1),onDismiss:()=>{this.activitySheet=void 0}})}switchTab(e){if(!(e===this.currentTab&&(this.mapView||this.panelEl)))switch(this.currentTab=e,this.nav?.setActive(e),this.mapView?.destroy(),this.mapView=void 0,this.panelEl?.remove(),this.panelEl=void 0,e){case`home`:this.mapView=new Ai({onPlayChapter:e=>{this.openActivitySheet(e)},onSwitchTab:e=>this.switchTab(e),onPlayLesson:(e,t)=>{this.cleanup(),this.scene.start(`LessonScene`,{chapter:e,lessonId:t})}});break;case`tasks`:this.panelEl=this.buildTasksPanel(),document.body.appendChild(this.panelEl);break;case`profile`:this.panelEl=this.buildProfilePanel(),document.body.appendChild(this.panelEl);break;case`alerts`:this.panelEl=this.buildAlertsPanel(),document.body.appendChild(this.panelEl);break}}makePanelShell(e,t){let n=document.createElement(`div`);I(n,{position:`fixed`,inset:`0`,background:Gi,zIndex:`20`,paddingTop:`max(28px, env(safe-area-inset-top))`,paddingBottom:`110px`,overflowY:`auto`,fontFamily:`"Nunito", "Noto Sans TC", system-ui, sans-serif`,color:Q});let r=document.createElement(`div`);r.dataset.panelContent=`1`,I(r,{width:`min(420px, calc(100vw - 32px))`,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:`14px`});let i=document.createElement(`h1`);if(i.textContent=e,I(i,{fontSize:`26px`,fontWeight:`900`,color:Y,margin:`0`,letterSpacing:`-0.4px`}),r.appendChild(i),t){let e=document.createElement(`div`);e.textContent=t,I(e,{fontSize:`13px`,fontWeight:`600`,color:$,marginTop:`-6px`}),r.appendChild(e)}return n.appendChild(r),n}getPanelContentRoot(e){return e.querySelector(`[data-panel-content]`)}makeSectionHeader(e){let t=document.createElement(`div`);return t.textContent=e,I(t,{fontSize:`11px`,fontWeight:`800`,letterSpacing:`1.5px`,textTransform:`uppercase`,color:$,marginTop:`8px`,marginBottom:`-6px`}),t}buildTasksPanel(){let e=this.makePanelShell(`Tasks`,`Bite-sized practice outside the story`),t=this.getPanelContentRoot(e),n=document.createElement(`div`),r=b();I(n,{background:J,borderRadius:`18px`,padding:`14px 16px`,color:`#ffffff`,boxShadow:`inset 0 8px 0 rgba(255, 226, 178, 0.42), 0 4px 0 ${Y}`,display:`flex`,alignItems:`center`,gap:`12px`}),n.innerHTML=`
      <img src="/mascots/icon-flame.webp" alt="" aria-hidden="true" width="36" height="36" style="display:block;" />
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;opacity:0.85;">
          Daily Streak
        </div>
        <div style="font-size:18px;font-weight:900;line-height:1.2;margin-top:2px;">
          ${r} day${r===1?``:`s`}
        </div>
        <div style="font-size:11px;font-weight:600;opacity:0.92;margin-top:2px;">
          Keep it alive — answer any question today
        </div>
      </div>
    `,t.appendChild(n),t.appendChild(this.makeSectionHeader(`Quick Practice`));let i=D.getState().difficulty,a=document.createElement(`button`);a.type=`button`,I(a,{background:`#ffffff`,border:`2px solid ${X}`,borderBottom:`4px solid ${Z}`,borderRadius:`18px`,padding:`16px 18px`,display:`flex`,alignItems:`center`,gap:`14px`,cursor:`pointer`,textAlign:`left`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,boxShadow:`inset 0 4px 0 rgba(231, 164, 74, 0.15)`}),a.innerHTML=`
      <div style="font-size:28px;line-height:1;">🎲</div>
      <div style="flex:1;">
        <div style="font-size:16px;font-weight:900;color:${Q};">
          Free Practice
        </div>
        <div style="font-size:12px;font-weight:700;color:${$};margin-top:3px;">
          10 random A2 questions · ${Ji[i]}
        </div>
      </div>
      <div style="font-size:22px;color:${J};font-weight:900;">→</div>
    `,a.addEventListener(`click`,e=>{e.preventDefault();let t=D.getState();t.setMode(`free`),t.setScenario(null),t.setChapter(null),t.setLevel(`A2`),this.cleanup(),this.scene.start(`PlayScene`)}),t.appendChild(a),t.appendChild(this.makeSectionHeader(`Scenarios`));for(let e of lt)t.appendChild(this.makeScenarioCard(e));return e}makeScenarioCard(e){let t=ct[e],n=pt(e),r=document.createElement(`button`);return r.type=`button`,I(r,{display:`flex`,alignItems:`center`,gap:`14px`,padding:`14px 16px`,borderRadius:`18px`,border:`2px solid ${X}`,borderBottom:`4px solid ${Z}`,background:`#ffffff`,color:Q,cursor:`pointer`,textAlign:`left`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 80ms ease-out`,boxShadow:`inset 0 4px 0 rgba(231, 164, 74, 0.15)`}),r.innerHTML=`
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.3px;color:${t.accent};text-transform:uppercase;">
          ${t.emoji} ${t.labelEn}
        </div>
        <div style="font-size:15px;font-weight:700;color:${Q};margin-top:3px;">
          ${t.labelZh}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;font-weight:700;color:${$};letter-spacing:0.5px;">BEST</div>
        <div style="font-size:18px;font-weight:900;color:${n>0?Y:`#cdbfa8`};">${n}/10</div>
      </div>
    `,r.addEventListener(`click`,t=>{t.preventDefault();let n=D.getState();n.setMode(`scenario`),n.setScenario(e),n.setChapter(null),n.setLevel(`A2`),this.cleanup(),this.scene.start(`PlayScene`)}),r}buildProfilePanel(){let e=this.makePanelShell(`Profile`,`愛哭鬼但堅韌 — your cozy progress`),t=this.getPanelContentRoot(e);t.appendChild(this.makeXpHeroCard()),t.appendChild(this.makeSectionHeader(`Your Stats`));let n=E(),r=this.readSrsCount(),i=this.readTotalAnswered(),a=b(),o=document.createElement(`div`);I(o,{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`12px`});let s=ke();o.appendChild(this.makeStatCard(`Chapters`,`${n.highestCompleted}/8`,`completed`)),o.appendChild(this.makeStatCard(`Questions`,`${i}`,`answered`)),o.appendChild(this.makeStatCard(`Streak`,`${a}`,`day(s)`)),o.appendChild(this.makeStatCard(`Coins`,`${s}`,`earned`)),o.appendChild(this.makeStatCard(`In review`,`${r}`,`still learning`)),t.appendChild(o),t.appendChild(this.makeSectionHeader(`貓咪名字 · Cat Name`)),t.appendChild(this.wrapSettingCard(this.buildCatNameControl())),t.appendChild(this.makeSectionHeader(`Difficulty`)),t.appendChild(this.wrapSettingCard(this.buildDifficultyControl())),t.appendChild(this.makeSectionHeader(`Audio`)),t.appendChild(this.wrapSettingCard(this.buildAudioControl())),t.appendChild(this.makeSectionHeader(`Danger Zone`));let c=document.createElement(`button`);c.type=`button`,c.textContent=`Restart story progress`,I(c,{padding:`12px 16px`,borderRadius:`14px`,background:`#ffffff`,color:qi,border:`2px solid ${qi}`,borderBottom:`4px solid #6e3625`,fontWeight:`800`,fontSize:`14px`,cursor:`pointer`,fontFamily:`inherit`,width:`100%`}),c.addEventListener(`click`,e=>{if(e.preventDefault(),window.confirm(`Restart story? All chapter progress will be cleared.`)){jt();try{localStorage.removeItem(`pickup.map.cat-node`)}catch{}this.switchTab(`home`)}}),t.appendChild(c),t.appendChild(this.makeSectionHeader(`About`));let l=document.createElement(`div`);return I(l,{background:`#ffffff`,border:`2px solid ${X}`,borderBottom:`4px solid ${Z}`,borderRadius:`18px`,padding:`14px 16px`}),l.innerHTML=`
      <div style="font-size:13px;color:${Q};font-weight:800;">Pickup · v1.7.5</div>
      <div style="font-size:12px;color:${$};margin-top:4px;line-height:1.5;">
        A cozy after-work English game. Pick up moments, learn English.
      </div>
      <a href="https://github.com/kengkeng44/pickup" target="_blank" rel="noopener" style="
        display:inline-block;margin-top:8px;font-size:12px;font-weight:800;
        color:${Y};text-decoration:underline;">
        GitHub →
      </a>
    `,t.appendChild(l),e}wrapSettingCard(e){let t=document.createElement(`div`);return I(t,{background:`#ffffff`,border:`2px solid ${X}`,borderBottom:`4px solid ${Z}`,borderRadius:`18px`,padding:`14px 16px`}),t.appendChild(e),t}buildCatNameControl(){let e=document.createElement(`div`);I(e,{display:`flex`,flexDirection:`column`,gap:`8px`});let t=document.createElement(`div`);t.textContent=`現在叫:${oi()}(預設 ${ii})`,I(t,{fontSize:`12px`,color:$,letterSpacing:`0.3px`}),e.appendChild(t);let n=document.createElement(`div`);I(n,{display:`flex`,gap:`8px`,alignItems:`center`});let r=document.createElement(`input`);r.type=`text`,r.value=oi(),r.maxLength=12,r.placeholder=ii,I(r,{flex:`1`,padding:`10px 12px`,border:`2px solid ${X}`,borderBottom:`3px solid ${Z}`,borderRadius:`12px`,fontSize:`15px`,fontWeight:`800`,color:Q,background:`#ffffff`,fontFamily:`inherit`,outline:`none`});let i=document.createElement(`button`);return i.type=`button`,i.textContent=`存`,I(i,{padding:`10px 16px`,background:J,color:`#ffffff`,border:`none`,borderBottom:`3px solid ${Y}`,borderRadius:`12px`,fontSize:`14px`,fontWeight:`900`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,flex:`0 0 auto`}),i.addEventListener(`click`,e=>{e.preventDefault(),t.textContent=`已存:${si(r.value)} · 重新整理頁面套用`,window.setTimeout(()=>{typeof window<`u`&&window.location.reload()},800)}),n.appendChild(r),n.appendChild(i),e.appendChild(n),e}buildDifficultyControl(){let e=document.createElement(`div`);I(e,{display:`flex`,gap:`8px`});let t=[`easy`,`medium`,`hard`],n=D.getState().difficulty,r=new Map,i=e=>{for(let[t,n]of r){let r=t===e;n.style.background=r?J:`#ffffff`,n.style.color=r?`#ffffff`:$,n.style.borderColor=r?Y:X}};for(let n of t){let t=document.createElement(`button`);t.type=`button`,t.textContent=Ji[n],I(t,{flex:`1`,padding:`10px 0`,fontSize:`13px`,fontWeight:`800`,background:`#ffffff`,color:$,border:`2px solid ${X}`,borderRadius:`10px`,cursor:`pointer`,fontFamily:`inherit`,transition:`background 160ms ease, color 160ms ease`}),t.addEventListener(`click`,e=>{e.preventDefault(),D.getState().setDifficulty(n),i(n)}),r.set(n,t),e.appendChild(t)}return i(n),e}buildAudioControl(){let e=document.createElement(`div`);I(e,{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`10px`});let t=document.createElement(`div`);t.textContent=x.audioMuted?`Muted`:`On`,I(t,{fontSize:`14px`,fontWeight:`700`,color:Q});let n=document.createElement(`button`);return n.type=`button`,n.textContent=x.audioMuted?`Unmute`:`Mute`,I(n,{padding:`8px 18px`,borderRadius:`12px`,background:x.audioMuted?J:`#ffffff`,color:x.audioMuted?`#ffffff`:Q,border:`2px solid ${X}`,borderBottom:`3px solid ${Z}`,fontWeight:`800`,fontSize:`13px`,cursor:`pointer`,fontFamily:`inherit`}),n.addEventListener(`click`,e=>{e.preventDefault(),x.toggleAudioMuted(),t.textContent=x.audioMuted?`Muted`:`On`,n.textContent=x.audioMuted?`Unmute`:`Mute`,n.style.background=x.audioMuted?J:`#ffffff`,n.style.color=x.audioMuted?`#ffffff`:Q}),e.appendChild(t),e.appendChild(n),e}makeXpHeroCard(){let e=Ce(),{level:t,intoLevel:n,nextLevelAt:r,fraction:i}=De(e),a=document.createElement(`div`);return I(a,{background:J,borderRadius:`20px`,padding:`18px 20px`,color:`#ffffff`,boxShadow:`inset 0 10px 0 rgba(255, 226, 178, 0.42), 0 6px 0 ${Y}`,display:`flex`,flexDirection:`column`,gap:`10px`}),a.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;opacity:0.88;text-transform:uppercase;">
            Level
          </div>
          <div style="font-size:38px;font-weight:900;line-height:1;margin-top:2px;">
            ${t}
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;opacity:0.88;text-transform:uppercase;">
            Total XP
          </div>
          <div style="font-size:24px;font-weight:900;line-height:1;margin-top:2px;">
            ${e}
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;font-size:11px;font-weight:700;opacity:0.92;">
        <div style="flex:1;height:10px;background:rgba(255,255,255,0.25);border-radius:5px;overflow:hidden;">
          <div style="width:${Math.round(i*100)}%;height:100%;background:#ffffff;border-radius:5px;transition:width 600ms ease-out;"></div>
        </div>
        <div>${n} / ${r} → L${t+1}</div>
      </div>
    `,a}makeStatCard(e,t,n){let r=document.createElement(`div`);return I(r,{background:`#ffffff`,border:`2px solid ${X}`,borderBottom:`4px solid ${Z}`,borderRadius:`16px`,padding:`16px 14px`,textAlign:`center`,boxShadow:`inset 0 4px 0 rgba(231, 164, 74, 0.15)`}),r.innerHTML=`
      <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:${$};text-transform:uppercase;">${e}</div>
      <div style="font-size:32px;font-weight:900;color:${Ki};margin:4px 0 2px;line-height:1.1;">${t}</div>
      <div style="font-size:10px;font-weight:700;color:${$};">${n}</div>
    `,r}readSrsCount(){try{let e=localStorage.getItem(`wordwar.srs.kitten`);if(!e)return 0;let t=JSON.parse(e);return Array.isArray(t)?t.length:0}catch{return 0}}readTotalAnswered(){return E().highestCompleted*6}buildAlertsPanel(){let e=Wi(),t=this.makePanelShell(`Achievements`,`${e.unlocked}/${e.total} unlocked`),n=this.getPanelContentRoot(t),r=document.createElement(`div`);I(r,{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`12px`});for(let e of Ui()){let t=document.createElement(`div`);I(t,{background:e.unlocked?`#ffffff`:`#f3eddc`,border:`2px solid ${e.unlocked?J:X}`,borderBottom:`4px solid ${e.unlocked?Y:Z}`,boxShadow:`inset 0 4px 0 rgba(231, 164, 74, 0.18)`,borderRadius:`16px`,padding:`14px 12px`,textAlign:`center`,opacity:e.unlocked?`1`:`0.6`,filter:e.unlocked?`none`:`grayscale(0.3)`}),t.innerHTML=`
        ${e.iconSrc?`<img src="${e.iconSrc}" alt="" aria-hidden="true" width="42" height="42" style="display:block;margin:0 auto 6px;" />`:`<div style="font-size:36px;line-height:1;margin-bottom:6px;">${e.emoji}</div>`}
        <div style="font-size:13px;font-weight:900;color:${Q};line-height:1.2;">${e.title}</div>
        <div style="font-size:11px;font-weight:600;color:${$};margin-top:4px;line-height:1.35;">
          ${e.description}
        </div>
        ${e.progressLabel?`<div style="font-size:10px;font-weight:800;letter-spacing:0.5px;color:${Y};margin-top:6px;">${e.progressLabel}</div>`:``}
      `,r.appendChild(t)}return n.appendChild(r),t}},Xi=`#e7a44a`,Zi=`#b07a2a`,Qi=`#fef8ed`,$i=`#58cc02`,ea=`#58a700`,ta=`#e8d8b8`,na=`#d4c098`,ra=`#3c2a1c`,ia=`#7a6850`,aa=class extends h.default.Scene{root;narrationAudio;constructor(){super({key:`ChapterIntroScene`})}create(){this.cameras.main.setBackgroundColor(Qi),document.getElementById(`pickup-bottom-nav`)?.remove();let{chapter:e}=D.getState();if(!e){this.scene.start(`StoryModeScene`);return}this.mountOverlay(e),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{if(this.root?.remove(),this.root=void 0,this.narrationAudio){try{this.narrationAudio.pause(),this.narrationAudio.currentTime=0,this.narrationAudio.src=``}catch{}this.narrationAudio=void 0}F()})}mountOverlay(e){let t=T[e],n=e>1?Math.min(3,Pt().length):0,r=document.createElement(`div`);r.id=`pickup-chapter-intro`,I(r,{position:`fixed`,inset:`0`,background:Qi,display:`flex`,flexDirection:`column`,alignItems:`center`,paddingTop:`max(28px, env(safe-area-inset-top))`,paddingBottom:`max(20px, env(safe-area-inset-bottom))`,overflowY:`auto`,zIndex:`20`,fontFamily:`"Nunito", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,color:ra}),this.root=r;let i=document.createElement(`div`);I(i,{width:`min(420px, calc(100vw - 32px))`,display:`flex`,flexDirection:`column`,alignItems:`stretch`,gap:`14px`});let a=document.createElement(`div`);I(a,{display:`flex`,alignItems:`center`,gap:`10px`,marginBottom:`4px`});let o=document.createElement(`button`);o.type=`button`,o.textContent=`←`,I(o,{background:`#ffffff`,border:`2px solid ${ta}`,borderBottom:`4px solid ${na}`,borderRadius:`12px`,padding:`8px 14px`,fontSize:`18px`,fontWeight:`800`,color:ia,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,lineHeight:`1`}),o.addEventListener(`click`,e=>{e.preventDefault(),this.scene.start(`StoryModeScene`)}),a.appendChild(o);let s=document.createElement(`div`);s.textContent=`Chapter ${e}`,I(s,{fontSize:`14px`,fontWeight:`800`,flex:`1 1 auto`,textAlign:`center`,marginRight:`52px`,color:Zi,letterSpacing:`2px`}),a.appendChild(s),i.appendChild(a);let c=document.createElement(`div`);c.textContent=t.titleEn,I(c,{fontSize:`28px`,fontWeight:`900`,textAlign:`center`,color:ra,letterSpacing:`-0.5px`}),i.appendChild(c);let l=document.createElement(`div`);if(I(l,{display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`8px 0 16px`,minHeight:`180px`}),!document.getElementById(`pickup-rock-keyframes`)){let e=document.createElement(`style`);e.id=`pickup-rock-keyframes`,e.textContent=`@keyframes pickup-rock-gentle { 0%,100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }`,document.head.appendChild(e)}let u=document.createElement(`img`);u.src=e===1?`/mascots/scene-mochi-talking.webp`:`/mascots/scene-grandma-storytime.webp`,u.alt=``,I(u,{width:`60%`,maxWidth:`220px`,height:`auto`,display:`block`,animation:`pickup-rock-gentle 4s ease-in-out infinite`,transformOrigin:`50% 92%`}),u.onerror=()=>{l.innerHTML=``,I(l,{gap:`10px`,alignItems:`flex-end`});let e=document.createElement(`div`);e.innerHTML=lr(t.kittenMascotId),l.appendChild(e);let n=document.createElement(`div`);n.innerHTML=lr(t.npcMascotId),l.appendChild(n)},l.appendChild(u),i.appendChild(l);let d=document.createElement(`div`);I(d,{display:`flex`,flexDirection:`column`,gap:`16px`,padding:`4px 0`});let f=[];if(pi(ci(t.narration)).split(/\n+/).forEach(e=>{let t=e.trim();if(!t)return;let n=t.match(/[^.!?…]+[.!?…]+|\S+/g);n?n.forEach(e=>{let t=e.trim();t&&f.push(t)}):f.push(t)}),f.forEach((e,t)=>{let n=document.createElement(`div`);I(n,{display:`flex`,alignItems:`center`,gap:`12px`,cursor:`pointer`,padding:`6px 4px`,borderRadius:`12px`,transition:`background 120ms ease`});let r=document.createElement(`button`);r.type=`button`,r.setAttribute(`aria-label`,`Mochi 唸第 ${t+1} 句 · Listen to sentence ${t+1}`),I(r,{flex:`0 0 auto`,width:`40px`,height:`40px`,background:`#fef8ed url(/mascots/scene-mochi-talking.webp) no-repeat center 22% / 130%`,border:`none`,borderRadius:`50%`,cursor:`pointer`,padding:`0`,display:`block`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 120ms ease`}),t===0&&r.classList.add(`pickup-speaker-pulse`);let i=document.createElement(`div`);i.className=`pickup-narration-line`,I(i,{flex:`1 1 auto`,fontSize:`15px`,lineHeight:`1.7`,color:ra,fontWeight:`700`,userSelect:`none`});let a=e.split(/(\s+)/),o=a.map(e=>/^\s+$/.test(e)||e===``?e:`<span class="word">${e}</span>`).join(``);i.innerHTML=a.map(e=>/^\s+$/.test(e)||e===``?e:`<span style="color:${na};letter-spacing:1px;">${`_`.repeat(Math.min(Math.max(e.length,2),6))}</span>`).join(``);let s=!1,c=()=>{s||(s=!0,i.innerHTML=o,kr(i))},l=()=>{c(),P(e)};r.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),l()}),n.addEventListener(`click`,l),n.appendChild(r),n.appendChild(i),d.appendChild(n)}),I(d,{display:`block`}),i.appendChild(d),yr(),kr(d),n>0){let e=document.createElement(`div`);e.textContent=`Quick review first: ${n} question${n>1?`s`:``} you missed before`,I(e,{background:`#fff4d4`,border:`2px solid ${Xi}`,borderRadius:`12px`,padding:`8px 12px`,fontSize:`12px`,fontWeight:`700`,color:Zi,textAlign:`center`}),i.appendChild(e)}let p=document.createElement(`button`);p.type=`button`,p.textContent=`下一步 · Next →`,I(p,{marginTop:`4px`,minHeight:`56px`,padding:`16px 28px`,background:$i,color:`#ffffff`,border:`none`,borderBottom:`5px solid ${ea}`,borderRadius:`16px`,fontFamily:`inherit`,fontSize:`18px`,fontWeight:`900`,letterSpacing:`1.2px`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 200ms ease-out`,boxShadow:`none`}),p.classList.add(`pickup-pulse`),jn(p,{depth:2,borderBottom:{from:5,to:3}}),p.addEventListener(`click`,t=>{t.preventDefault(),F();let n=p.textContent;p.textContent=`載入中… · Loading…`,p.disabled=!0;let r=new Promise(e=>setTimeout(e,1200));Promise.race([En(e),r]).finally(()=>{p.textContent=n,p.disabled=!1,this.root?.remove(),this.root=void 0,this.scene.start(`PlayScene`)})}),i.insertBefore(p,d),r.appendChild(i),document.body.appendChild(r)}},oa=`#e7a44a`,sa=`#b07a2a`,ca=`#fef8ed`,la=`#58cc02`,ua=`#58a700`,da=`#e8d8b8`,fa=`#d4c098`,pa=`#3c2a1c`,ma=`#7a6850`,ha=class extends h.default.Scene{root;constructor(){super({key:`ChapterEndScene`})}create(){this.cameras.main.setBackgroundColor(ca);let{chapter:e}=D.getState();if(!e){this.scene.start(`StoryModeScene`);return}if(D.getState().completeChapter(),e>=8){this.scene.start(`StoryEndingScene`);return}this.mountOverlay(e),be(),new $r().burst(),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{this.root?.remove(),this.root=void 0})}mountOverlay(e){let t=T[e],n=e+1,r=T[n],i=document.createElement(`div`);i.id=`pickup-chapter-end`,I(i,{position:`fixed`,inset:`0`,background:ca,display:`flex`,flexDirection:`column`,alignItems:`center`,paddingTop:`max(28px, env(safe-area-inset-top))`,paddingBottom:`max(20px, env(safe-area-inset-bottom))`,overflowY:`auto`,zIndex:`20`,fontFamily:`"Nunito", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,color:pa}),this.root=i;let a=document.createElement(`div`);I(a,{width:`min(420px, calc(100vw - 32px))`,display:`flex`,flexDirection:`column`,alignItems:`stretch`,gap:`16px`});let o=document.createElement(`div`);o.textContent=`Chapter ${e} · Complete!`,I(o,{textAlign:`center`,fontSize:`14px`,fontWeight:`900`,letterSpacing:`3px`,color:sa,textTransform:`uppercase`,animation:`pickup-banner-pop 480ms cubic-bezier(0.34, 1.56, 0.64, 1)`}),a.appendChild(o);let s=document.createElement(`div`);s.textContent=t.titleEn,I(s,{fontSize:`26px`,fontWeight:`900`,textAlign:`center`,color:pa}),a.appendChild(s);let c=document.createElement(`div`);I(c,{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`10px`,background:t.tint,borderRadius:`20px`,padding:`18px 12px`,minHeight:`180px`,position:`relative`,overflow:`hidden`});let l=document.createElement(`div`);I(l,{width:`120px`,height:`140px`,transition:`opacity 800ms ease-in-out, transform 800ms ease-in-out`}),l.innerHTML=lr(t.kittenMascotId);let u=l.querySelector(`svg`);u&&(u.setAttribute(`width`,`120`),u.setAttribute(`height`,`140`)),c.appendChild(l);let d=document.createElement(`div`);d.textContent=`→`,I(d,{fontSize:`36px`,fontWeight:`900`,color:oa,opacity:`0`,transition:`opacity 500ms ease-out 400ms`}),c.appendChild(d);let f=document.createElement(`div`);I(f,{width:`120px`,height:`140px`,opacity:`0`,transform:`scale(0.8)`,transition:`opacity 800ms ease-out 600ms, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 600ms`}),f.innerHTML=lr(r.kittenMascotId);let p=f.querySelector(`svg`);p&&(p.setAttribute(`width`,`120`),p.setAttribute(`height`,`140`)),c.appendChild(f),a.appendChild(c),window.requestAnimationFrame(()=>{window.setTimeout(()=>{l.style.opacity=`0.4`,l.style.transform=`translateX(-10px) scale(0.9)`,d.style.opacity=`1`,f.style.opacity=`1`,f.style.transform=`scale(1)`},200)});let m=document.createElement(`div`);I(m,{background:`#ffffff`,border:`2px solid ${da}`,borderBottom:`4px solid ${fa}`,borderRadius:`16px`,padding:`14px 16px`,fontSize:`14px`,lineHeight:`1.7`,color:pa,fontWeight:`600`,whiteSpace:`pre-wrap`}),m.textContent=pi(ci(t.outro)),a.appendChild(m);let h=D.getState(),g=h.history.filter(e=>e.correct).length,_=h.history.length,v=document.createElement(`div`);v.textContent=`Correct ${g}/${_} · +${h.score} XP`,I(v,{textAlign:`center`,fontSize:`13px`,fontWeight:`800`,color:ma}),a.appendChild(v);let y=document.createElement(`button`);y.type=`button`,y.textContent=`Next chapter → ${r.titleEn}`,I(y,{marginTop:`4px`,minHeight:`56px`,padding:`16px 24px`,background:la,color:`#ffffff`,border:`none`,borderBottom:`5px solid ${ua}`,borderRadius:`16px`,fontFamily:`inherit`,fontSize:`16px`,fontWeight:`900`,letterSpacing:`0.5px`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 200ms ease-out`,boxShadow:`none`}),y.classList.add(`pickup-pulse`),jn(y,{depth:2,borderBottom:{from:5,to:3}}),y.addEventListener(`click`,e=>{e.preventDefault();let t=D.getState();t.setChapter(n),t.reset(),this.root?.remove(),this.root=void 0,this.scene.start(`ChapterIntroScene`)}),a.appendChild(y);let b=document.createElement(`button`);b.type=`button`,b.textContent=`← Back to chapters`,I(b,{marginTop:`6px`,background:`transparent`,border:`none`,color:ma,fontFamily:`inherit`,fontSize:`13px`,fontWeight:`700`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,textAlign:`center`}),b.addEventListener(`click`,e=>{e.preventDefault(),this.root?.remove(),this.root=void 0,this.scene.start(`StoryModeScene`)}),a.appendChild(b),i.appendChild(a),document.body.appendChild(i)}},ga=`#e7a44a`,_a=`#b07a2a`,va=`#fef8ed`,ya=`#58cc02`,ba=`#58a700`,xa=`#e8d8b8`,Sa=`#d4c098`,Ca=`#3c2a1c`,wa=`#7a6850`,Ta=class extends h.default.Scene{root;confetti;constructor(){super({key:`StoryEndingScene`})}create(){this.cameras.main.setBackgroundColor(va),this.mountOverlay(),this.confetti=new $r,this.confetti.burst(),be(),this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{this.root?.remove(),this.root=void 0,this.confetti?.destroy(),this.confetti=void 0})}mountOverlay(){let e=document.createElement(`div`);e.id=`pickup-story-ending`,I(e,{position:`fixed`,inset:`0`,background:va,display:`flex`,flexDirection:`column`,alignItems:`center`,paddingTop:`max(28px, env(safe-area-inset-top))`,paddingBottom:`max(20px, env(safe-area-inset-bottom))`,overflowY:`auto`,zIndex:`20`,fontFamily:`"Nunito", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,color:Ca}),this.root=e;let t=document.createElement(`div`);I(t,{width:`min(440px, calc(100vw - 32px))`,display:`flex`,flexDirection:`column`,alignItems:`stretch`,gap:`14px`});let n=document.createElement(`div`);n.textContent=`Story · Complete`,I(n,{textAlign:`center`,fontSize:`14px`,fontWeight:`900`,letterSpacing:`6px`,color:_a,textTransform:`uppercase`,animation:`pickup-banner-pop 480ms cubic-bezier(0.34, 1.56, 0.64, 1)`}),t.appendChild(n);let r=document.createElement(`div`);r.textContent=`A Cat's Way Home`,I(r,{fontSize:`32px`,fontWeight:`900`,textAlign:`center`,color:Ca,letterSpacing:`-0.5px`}),t.appendChild(r);let i=document.createElement(`div`);I(i,{display:`flex`,alignItems:`flex-end`,justifyContent:`space-between`,gap:`2px`,background:`#fef0d0`,border:`2px solid ${ga}`,borderRadius:`16px`,padding:`12px 6px`});for(let e of Dt){let t=document.createElement(`div`);I(t,{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`2px`,flex:`1 1 0`,minWidth:`0`,opacity:`0`,transform:`translateY(8px)`,transition:`opacity 500ms ease-out ${e*160}ms, transform 500ms ease-out ${e*160}ms`});let n=T[e],r=document.createElement(`div`);I(r,{width:`100%`,maxWidth:`48px`,height:`56px`,display:`flex`,alignItems:`flex-end`,justifyContent:`center`}),r.innerHTML=lr(n.kittenMascotId);let a=r.querySelector(`svg`);a&&(a.setAttribute(`width`,`44`),a.setAttribute(`height`,`52`)),t.appendChild(r);let o=document.createElement(`div`);o.textContent=`Ch${n.id}`,I(o,{fontSize:`11px`,fontWeight:`800`,color:_a,fontFamily:`ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace`}),t.appendChild(o),i.appendChild(t),window.requestAnimationFrame(()=>{window.setTimeout(()=>{t.style.opacity=`1`,t.style.transform=`translateY(0)`},50)})}t.appendChild(i);let a=document.createElement(`div`);I(a,{background:`#ffffff`,border:`2px solid ${xa}`,borderBottom:`4px solid ${Sa}`,borderRadius:`16px`,padding:`16px 18px`,fontSize:`15px`,lineHeight:`1.75`,color:Ca,fontWeight:`600`,whiteSpace:`pre-wrap`}),a.textContent=`From a wet, cold alley to a grandmother with a blue umbrella;
from the warm smell of a bakery to a little girl in the park;
from a battered street elder to a family that held her tight —

until one snowy night she heard a familiar bark on the wind,
and at the shrine she understood:
no one walks into your story by accident.
Her family was never only the one behind that window.

She slipped through the unlatched window once more.
This time, not running. Going to find her people.

She had a home. Now, she chose her family.

Snow began to fall again, but she was no longer the kitten the wind pushed around —
she was the one they circled around. The center.

You walked this path with her. Thank you.`,t.appendChild(a);let o=D.getState(),s=document.createElement(`div`);s.textContent=`Total XP · ${o.score}`,I(s,{textAlign:`center`,fontSize:`13px`,fontWeight:`800`,color:_a}),t.appendChild(s);let c=document.createElement(`button`);c.type=`button`,c.textContent=`Play the story again`,I(c,{marginTop:`4px`,minHeight:`56px`,padding:`15px 24px`,background:ya,color:`#ffffff`,border:`none`,borderBottom:`5px solid ${ba}`,borderRadius:`16px`,fontFamily:`inherit`,fontSize:`17px`,fontWeight:`900`,letterSpacing:`0.5px`,cursor:`pointer`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,transition:`transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 200ms ease-out`,boxShadow:`none`}),c.classList.add(`pickup-pulse`),c.addEventListener(`click`,e=>{e.preventDefault(),!(typeof window<`u`&&window.confirm&&!window.confirm(`Restart the story? All chapter progress will be cleared.`))&&(jt(),this.root?.remove(),this.root=void 0,this.scene.start(`StoryModeScene`))}),t.appendChild(c);let l=document.createElement(`button`);l.type=`button`,l.textContent=`← Back to menu`,I(l,{marginTop:`6px`,background:`transparent`,border:`none`,color:wa,fontFamily:`inherit`,fontSize:`13px`,fontWeight:`700`,cursor:`pointer`,textAlign:`center`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),l.addEventListener(`click`,e=>{e.preventDefault(),this.root?.remove(),this.root=void 0,this.scene.start(`MenuScene`)}),t.appendChild(l),e.appendChild(t),document.body.appendChild(e)}},Ea=3e3,Da=class e extends h.default.Scene{static KEY=`LessonScene`;lesson;chapter;questionIdx=0;hud;clozeUI;mascot;advanceTimer;locked=!1;tapHandle;constructor(){super({key:e.KEY})}pendingLessonId=``;init(e){this.chapter=e.chapter,this.pendingLessonId=e.lessonId,this.questionIdx=0}create(){qe(this.chapter).then(e=>{let t=Je(e,this.pendingLessonId);if(!t){console.error(`[LessonScene] Lesson ${this.pendingLessonId} not found in ch${this.chapter}`),this.scene.start(`StoryModeScene`);return}this.lesson=t,this._mountLessonUI()}).catch(e=>{console.error(`[LessonScene] load failed:`,e),this.scene.start(`StoryModeScene`)})}_mountLessonUI(){if(!this.lesson)return;document.getElementById(`pickup-bottom-nav`)?.remove();try{sn()}catch{}this.events.once(h.default.Scenes.Events.SHUTDOWN,()=>{this.cleanupOverlay()});let e=T[this.chapter],t={accent:e.accent,tint:e.tint,mascotId:e.kittenMascotId,emoji:e.emoji,labelEn:e.titleEn},n=D.getState();n.setMode(`story`),n.setChapter(this.chapter),n.reset(),this.hud=new jr({accent:t.accent,tint:t.tint,totalRounds:this.lesson.questions.length,scenarioLabel:``,emoji:t.emoji,hideHp:!0,hideStreak:!0,hideTimer:!0,onChange:()=>{this.cleanupOverlay(),this.scene.start(`StoryModeScene`)}}),this.clozeUI=new sr({onAnswer:e=>this.handleAnswer(e),onContinue:()=>this.handleContinue(),onForceCorrect:()=>this.handleForceCorrect()},{accent:t.accent,buttonsSlot:this.hud.buttonsSlot(),revealSlot:this.hud.revealSlot(),forceCorrectMode:!0}),this.mascot=new _r({parent:this.hud.mascotSlot()}),this.mascot.setMascotImage(`/mascots/calico-anchor.webp`),this._mountIntroOverlay,this._mountStoryOpener,this.renderQuestion(this.lesson.questions[0])}_mountStoryOpener(e,t){if(!this.hud)return;let n=this.hud.getSentenceElement(),r=n?.parentElement?.parentElement;if(!r||!n)return;document.getElementById(`pickup-lesson-opener`)?.remove();let i=document.createElement(`div`);i.id=`pickup-lesson-opener`,Object.assign(i.style,{background:`rgba(231,164,74,0.08)`,borderRadius:`14px`,padding:`12px 14px`,margin:`0 0 12px 0`,display:`flex`,alignItems:`flex-start`,gap:`12px`,width:`100%`,boxSizing:`border-box`});let a=document.createElement(`button`);a.type=`button`,a.setAttribute(`aria-label`,`Replay opener`),Object.assign(a.style,{flex:`0 0 auto`,width:`36px`,height:`36px`,padding:`0`,background:`transparent`,border:`none`,cursor:`pointer`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),a.innerHTML=`<img src="/mascots/icon-speaker.webp" width="34" height="34" alt="" style="pointer-events:none;"/>`,a.addEventListener(`click`,()=>{try{P(e)}catch{}});let o=document.createElement(`div`);Object.assign(o.style,{flex:`1 1 auto`,fontSize:`15px`,fontWeight:`700`,color:`#3c2a1c`,lineHeight:`1.55`,letterSpacing:`0.2px`,minHeight:`40px`,display:`flex`,alignItems:`center`});let s=e.split(/\s+/).filter(Boolean).length;o.innerHTML=`<span style="color:#b07a2a;font-style:italic;opacity:0.5;">${`· `.repeat(Math.min(s*2,18)).trim()}</span>`;let c=!1,l=()=>{o.innerHTML=``,e.split(/(\s+)/).forEach(e=>{if(!e)return;if(/^\s+$/.test(e)){o.appendChild(document.createTextNode(e));return}let n=e.replace(/[.,!?;:'"()]/g,``),r=t?.[n]??t?.[n.toLowerCase()];if(r&&r.zh){let t=document.createElement(`span`);t.textContent=e,Object.assign(t.style,{borderBottom:`1px dashed #b07a2a`,cursor:`pointer`,padding:`0 1px`}),t.addEventListener(`click`,e=>{e.preventDefault(),this._showVocabPopup(r.zh,r.pos)}),o.appendChild(t)}else o.appendChild(document.createTextNode(e))})};a.addEventListener(`click`,()=>{c||=(l(),!0);try{P(e)}catch{}}),i.appendChild(a),i.appendChild(o),r.insertBefore(i,n.parentElement)}_renderNarration(e){if(!this.hud)return;let t=this.hud.getSentenceElement(),n=this.hud.buttonsSlot();if(!t||!n)return;let r=String(e.sentence??``);t.innerHTML=`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;">
        <button type="button" aria-label="Replay narration" class="pickup-narration-speaker" style="
          flex:0 0 auto; width:44px; height:44px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
          touch-action:manipulation; -webkit-tap-highlight-color:transparent;
        ">
          <img src="/mascots/icon-speaker.webp" width="40" height="40" alt="" style="pointer-events:none;" />
        </button>
        <div class="pickup-narration-text" style="flex:1 1 auto;font-size:16px;font-weight:700;color:#3c2a1c;line-height:1.7;letter-spacing:0.2px;display:flex;align-items:center;">
          <span>${r.split(/(\s+)/).map(e=>!e||/^\s+$/.test(e)?e:`<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${e}</span>`).join(``)}</span>
        </div>
      </div>
    `,t.querySelector(`.pickup-narration-speaker`)?.addEventListener(`click`,()=>{try{P(r)}catch{}});try{P(r)}catch{}n.innerHTML=``,Array.from(n.children).forEach(e=>e.style.display=`none`);let i=document.createElement(`button`);i.type=`button`,i.className=`pickup-narration-continue`,i.textContent=`繼續 ↓ Continue`,Object.assign(i.style,{width:`100%`,padding:`14px 0`,background:`#7ac74a`,color:`#ffffff`,border:`none`,borderBottom:`4px solid #5d9a35`,borderRadius:`14px`,fontSize:`16px`,fontWeight:`900`,letterSpacing:`1px`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),i.addEventListener(`click`,()=>{try{this._snapshotNarration(e)}catch{}if(i.remove(),this.questionIdx+=1,this.questionIdx>=this.lesson.questions.length){this.finish();return}this.renderQuestion(this.lesson.questions[this.questionIdx])}),n.appendChild(i)}_renderListenTfZh(e){if(!this.hud)return;let t=this.hud.getSentenceElement(),n=this.hud.buttonsSlot();if(!t||!n)return;let r=String(e.sentence??``),i=String(e.questionZh??``),a=e.optionsZh??[`對,是這樣的`,`不,不是這樣`],o=e.correctIndex??0;t.innerHTML=`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;margin-bottom:10px;">
        <button type="button" aria-label="Replay sentence" class="pickup-tf-speaker" style="
          flex:0 0 auto; width:40px; height:40px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="36" height="36" alt="" style="pointer-events:none;" />
        </button>
        <div class="pickup-tf-en" style="flex:1 1 auto;font-size:15px;font-weight:700;color:#3c2a1c;line-height:1.6;display:flex;align-items:center;">
          <span>${r.split(/(\s+)/).map(e=>!e||/^\s+$/.test(e)?e:`<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${e}</span>`).join(``)}</span>
        </div>
      </div>
      <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.5;padding:6px 4px;text-align:center;">
        ${i}
      </div>
    `,t.querySelector(`.pickup-tf-speaker`)?.addEventListener(`click`,()=>{try{P(r)}catch{}});try{P(r)}catch{}n.innerHTML=``,Array.from(n.children).forEach(e=>e.style.display=`none`);for(let t=0;t<2;t++){let r=document.createElement(`button`);r.type=`button`,r.textContent=a[t]??``,Object.assign(r.style,{width:`100%`,padding:`14px 16px`,background:`#ffffff`,color:`#3c2a1c`,border:`2px solid #c8a878`,borderBottom:`4px solid #b07a2a`,borderRadius:`14px`,fontSize:`16px`,fontWeight:`800`,cursor:`pointer`,fontFamily:`inherit`,marginBottom:`8px`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`});let i=t;r.addEventListener(`click`,()=>{if(this.locked)return;let t=i===o;try{(t?me:he)()}catch{}r.style.background=t?`#eaf6d5`:`#fde0d2`,r.style.borderColor=t?`#7ac74a`:`#c84a3a`,r.style.color=t?`#5d9a35`:`#a23829`,this.locked=!0;try{this._snapshotTfZh(e,i,o)}catch{}this.scheduleAdvance(2e3)}),n.appendChild(r)}}_renderListenTf(e){if(!this.hud)return;let t=this.hud.getSentenceElement(),n=this.hud.buttonsSlot();if(!t||!n)return;let r=String(e.sentence??``),i=String(e.questionEn??e.question??``),a=e.options??[`Yes`,`No`],o=e.correctIndex??0;t.innerHTML=`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 4px;margin-bottom:10px;">
        <button type="button" aria-label="Replay sentence" class="pickup-tf-speaker" style="
          flex:0 0 auto; width:40px; height:40px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="36" height="36" alt="" style="pointer-events:none;" />
        </button>
        <div style="flex:1 1 auto;font-size:15px;font-weight:700;color:#3c2a1c;line-height:1.6;display:flex;align-items:center;">
          <span>${r.split(/(\s+)/).map(e=>!e||/^\s+$/.test(e)?e:`<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${e}</span>`).join(``)}</span>
        </div>
      </div>
      <div style="font-size:16px;font-weight:800;color:#3c2a1c;line-height:1.5;padding:6px 4px;text-align:center;">
        ${i}
      </div>
    `,t.querySelector(`.pickup-tf-speaker`)?.addEventListener(`click`,()=>{try{P(r)}catch{}});try{P(r)}catch{}n.innerHTML=``,Array.from(n.children).forEach(e=>e.style.display=`none`);for(let t=0;t<2;t++){let r=document.createElement(`button`);r.type=`button`,r.textContent=a[t]??``,Object.assign(r.style,{width:`100%`,padding:`14px 16px`,background:`#ffffff`,color:`#3c2a1c`,border:`2px solid #c8a878`,borderBottom:`4px solid #b07a2a`,borderRadius:`14px`,fontSize:`16px`,fontWeight:`800`,cursor:`pointer`,fontFamily:`inherit`,marginBottom:`8px`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`});let i=t;r.addEventListener(`click`,()=>{if(this.locked)return;let t=i===o;try{(t?me:he)()}catch{}r.style.background=t?`#eaf6d5`:`#fde0d2`,r.style.borderColor=t?`#7ac74a`:`#c84a3a`,r.style.color=t?`#5d9a35`:`#a23829`,this.locked=!0;try{this._snapshotTf(e,i,o)}catch{}this.scheduleAdvance(2e3)}),n.appendChild(r)}}_snapshotTf(e,t,n){let r=this.hud?.getSentenceElement(),i=r?.parentElement?.parentElement;if(!i||!r)return;let a=document.getElementById(`pickup-lesson-history`);a||(a=document.createElement(`div`),a.id=`pickup-lesson-history`,Object.assign(a.style,{display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`12px`,width:`100%`}),i.insertBefore(a,r.parentElement));let o=document.createElement(`div`);Object.assign(o.style,{padding:`4px 0`,fontSize:`14px`,color:`#5a4530`,lineHeight:`1.55`,fontWeight:`500`}),o.textContent=String(e.questionEn??``),a.appendChild(o)}_snapshotNarration(e){let t=this.hud?.getSentenceElement(),n=t?.parentElement?.parentElement;if(!n||!t)return;let r=document.getElementById(`pickup-lesson-history`);r||(r=document.createElement(`div`),r.id=`pickup-lesson-history`,Object.assign(r.style,{display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`12px`,width:`100%`}),n.insertBefore(r,t.parentElement));let i=document.createElement(`div`);Object.assign(i.style,{padding:`4px 0`,fontSize:`15px`,color:`#3c2a1c`,lineHeight:`1.55`,fontWeight:`600`}),i.textContent=String(e.sentence??``),r.appendChild(i)}_snapshotTfZh(e,t,n){let r=this.hud?.getSentenceElement(),i=r?.parentElement?.parentElement;if(!i||!r)return;let a=document.getElementById(`pickup-lesson-history`);a||(a=document.createElement(`div`),a.id=`pickup-lesson-history`,Object.assign(a.style,{display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`12px`,width:`100%`}),i.insertBefore(a,r.parentElement));let o=document.createElement(`div`);Object.assign(o.style,{padding:`4px 0`,fontSize:`14px`,color:`#5a4530`,lineHeight:`1.55`,fontWeight:`500`}),o.textContent=String(e.questionZh??``),a.appendChild(o)}_showVocabPopup(e,t){let n=document.getElementById(`pickup-vocab-popup`);n||(n=document.createElement(`div`),n.id=`pickup-vocab-popup`,Object.assign(n.style,{position:`fixed`,bottom:`38%`,left:`50%`,transform:`translateX(-50%)`,background:`#3c2a1c`,color:`#ffffff`,padding:`12px 22px`,borderRadius:`14px`,fontSize:`16px`,fontWeight:`800`,zIndex:`9999`,boxShadow:`0 6px 24px rgba(0,0,0,0.3)`,opacity:`0`,transition:`opacity 180ms ease`,pointerEvents:`none`,maxWidth:`85vw`,textAlign:`center`}),document.body.appendChild(n)),n.innerHTML=`<span>${e}</span><span style="color:#e7a44a;font-size:13px;font-weight:700;margin-left:10px;">${t}</span>`,n.style.opacity=`1`,n.style.display=`block`;let r=n;window.clearTimeout(r._timer),r._timer=window.setTimeout(()=>{r.style.opacity=`0`},2400)}_mountIntroOverlay(e){let t=this.hud?.buttonsSlot(),n=this.hud?.getSentenceElement();if(!t||!n||!this.lesson){this.renderQuestion(this.lesson.questions[0]);return}let r=this.hud?.mascotSlot();r&&(r.style.display=`none`);let i=T[this.chapter];n.innerHTML=`
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 8px;">
        <div style="font-size:14px;font-weight:800;color:#b07a2a;letter-spacing:1.5px;">Lesson ${this.lesson.lessonInChapter}</div>
        <div style="font-size:24px;font-weight:900;color:#3c2a1c;line-height:1.25;text-align:center;">${i.titleEn}</div>
        <img src="/mascots/calico-anchor.webp" width="160" height="160" alt="" style="pointer-events:none;margin:6px 0 2px;" />
        <div style="width:100%;display:flex;flex-direction:column;gap:2px;margin-top:6px;">${this.lesson.questions.slice(0,4).map((e,t)=>{let n=String(e.sentence??``),r=n.split(/\s+/).filter(Boolean).length,i=Math.min(Math.max(r*18,60),240);return`<button type="button" class="pickup-intro-preview-row" data-idx="${t}" data-sentence="${n.replace(/"/g,`&quot;`)}" style="display:flex;align-items:center;gap:10px;padding:6px 4px;background:transparent;border:none;cursor:pointer;width:100%;text-align:left;touch-action:manipulation;-webkit-tap-highlight-color:transparent;">
        <img src="/mascots/calico-anchor.webp" width="32" height="32" alt="" style="pointer-events:none;flex:0 0 auto;" />
        <span class="pickup-intro-preview-text" style="flex:1 1 auto;font-size:14px;font-weight:700;color:#3c2a1c;">
          <span class="pickup-intro-dash" style="display:inline-block;width:${i}px;height:6px;border-bottom:3px dashed #c8a878;vertical-align:middle;"></span>
        </span>
      </button>`}).join(``)}</div>
      </div>
    `,n.querySelectorAll(`.pickup-intro-preview-row`).forEach(e=>{let t=e,n=t.getAttribute(`data-sentence`)??``;t.addEventListener(`click`,()=>{let e=t.querySelector(`.pickup-intro-preview-text`);e&&(e.innerHTML=n),P(n)})});let a=Array.from(t.children);a.forEach(e=>{e.style.display=`none`});let o=document.createElement(`button`);o.type=`button`,o.id=`pickup-intro-begin`,o.textContent=`下一步 · Next →`,Object.assign(o.style,{width:`100%`,padding:`16px 0`,background:`#7ac74a`,color:`#ffffff`,border:`none`,borderBottom:`4px solid #5d9a35`,borderRadius:`14px`,fontSize:`17px`,fontWeight:`900`,letterSpacing:`1px`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`}),o.addEventListener(`click`,()=>{o.remove(),a.forEach(e=>{e.style.display=``});let e=this.hud?.mascotSlot();e&&(e.style.display=``),this.renderQuestion(this.lesson.questions[0]);try{let e=this.lesson.questions[0],t=String(e.sentence??``);t&&P(t)}catch{}}),t.appendChild(o)}renderQuestion(e){this.locked=!1,this.cancelAdvanceTimer();try{F()}catch{}this.tapHandle?.destroy(),this.tapHandle=void 0;let t=e.type;if(t===`narration`||t===`listen-tf-zh`||t===`listen-tf`){this.renderHud(),t===`narration`?this._renderNarration(e):t===`listen-tf`?this._renderListenTf(e):this._renderListenTfZh(e);return}D.setState({round:e,answered:!1,awaitingRetry:!1,lastResult:null}),this.clozeUI?.resetForRound(),this.mascot?.setAnim(`idle`),this.renderHud();let n=e.type,r=e;if(this.hud&&(n===`listen-mc`||n===`listen-comprehension`||n===`type-what-you-hear`||n===`listen-emoji`)){let e=r.correctIndex??0,t=r.options?.[e]??``,n=String(r.sentence??``).replace(/_{2,}/g,t),i=String(r.sentence??``).split(/(\s+)/),a=e=>/\S/.test(e),o=e=>/_{2,}/.test(e),s=(e,t)=>`<span style="display:inline-block;border-bottom:${t?`3px`:`2px`} solid ${t?`#b07a2a`:`#c8a878`};min-width:${e}px;height:1.1em;vertical-align:-2px;margin:0 2px;border-radius:1px;"></span>`,c=i.map(e=>{if(!a(e))return e;let t=e.match(/^(.+?)([.,!?;:'"]+)?$/),n=t?.[1]??e,r=t?.[2]??``,i=o(n);return s((i?8:Math.min(Math.max(n.length,3),8))*8,i)+(r?`<span style="color:#8b6f4a;font-weight:800;">${r}</span>`:``)}).join(``),l=this.hud.getSentenceElement();if(l){l.innerHTML=`
          <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 4px;">
            <button type="button" aria-label="Replay audio" class="pickup-listen-speaker pickup-speaker-pulse" style="
              flex:0 0 auto; width:44px; height:44px; padding:0;
              background:transparent; border:none; cursor:pointer;
              display:inline-flex; align-items:center; justify-content:center;
              touch-action:manipulation; -webkit-tap-highlight-color:transparent;
            ">
              <img src="/mascots/icon-speaker.webp" width="40" height="40" alt="" style="pointer-events:none;" />
            </button>
            <div style="flex:1 1 auto;min-width:0;">
              <div style="font-size:17px;font-weight:800;color:#3c2a1c;line-height:1.8;max-height:140px;overflow:hidden;">${c}</div>
            </div>
          </div>
        `;let e=l.querySelector(`.pickup-listen-speaker`);Array.isArray(r.options)&&[`A`,`B`,`C`,`D`].map((e,t)=>`${e}. ${r.options[t]??``}.`).join(` `);let t=()=>{P(n)};e?.addEventListener(`click`,e=>{e.preventDefault(),t()})}}if(this.hud&&(n===`tap-tiles`||n===`tap-pairs`||n===`type-what-you-hear`)){let e=this.hud.buttonsSlot();e.innerHTML=``;let t=r.correctIndex??0,i=r.options?.[t]??``,a=String(r.sentence??``).replace(/_{2,}/g,i);if(n===`tap-tiles`&&r.tiles&&r.correctOrder){this.tapHandle=Un({slot:e,tiles:r.tiles,correctOrder:r.correctOrder,prompt:r.question??`Tap what you hear`,onSpeak:()=>P(a),onComplete:e=>this.handleAnswer(e?t:(t+1)%4)}),An(a);let n=this.hud.getSentenceElement();n&&(n.innerHTML=``)}else if(n===`type-what-you-hear`)this.tapHandle=Wn({slot:e,correctAnswer:i,prompt:r.question??`Type what you hear`,onSpeak:()=>P(a),onComplete:e=>this.handleAnswer(e?t:(t+1)%4)});else if(n===`tap-pairs`&&r.pairs){this.tapHandle=Gn({slot:e,pairs:r.pairs,prompt:r.question??`Tap the pairs`,onComplete:e=>this.handleAnswer(e?t:(t+1)%4)});let n=this.hud.getSentenceElement();n&&(n.innerHTML=`<div style="font-size:13px;font-weight:700;color:#7a6850;text-align:center;">${r.sentence}</div>`)}}}renderHud(){if(!this.hud)return;let e=this.lesson.questions.length,t=Math.min(this.questionIdx+1,e);this.hud.render({hp:0,hpMax:0,streak:0,currentRound:t,totalRounds:e,scenarioLabel:``,sentence:this.lesson.questions[this.questionIdx].sentence,timerSeconds:0,timerRatio:0,timerLow:!1,timerExpired:!1})}_snapshotAnsweredQ(e,t,n){if(!this.hud)return;let r=this.hud.getSentenceElement();if(!r)return;let i=r.parentElement?.parentElement;if(!i)return;let a=document.getElementById(`pickup-lesson-history`);a||(a=document.createElement(`div`),a.id=`pickup-lesson-history`,Object.assign(a.style,{display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`12px`,width:`100%`}),i.insertBefore(a,r.parentElement));let o=t===n,s=String(e.sentence??``),c=String(e.question??``),l=e.options??[],u=e.optionsZh,d=String(e.explanationZh??``),f=document.createElement(`div`);f.className=`pickup-frozen-q-card`,Object.assign(f.style,{background:o?`#eaf6d5`:`#fde0d2`,border:`2px solid ${o?`#7ac74a`:`#c84a3a`}`,borderRadius:`12px`,padding:`10px 12px`,fontSize:`13px`,lineHeight:`1.5`,opacity:`0.92`});let p=l.map((e,r)=>{let i=u?.[r]??``,a=r===n,o=r===t,s=a?`✓`:o?`✕`:``;return`<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;background:${a?`#7ac74a33`:o?`#c84a3a33`:`transparent`};padding:2px 6px;border-radius:4px;font-weight:${a||o?`800`:`500`};">
        <span style="color:#3c2a1c;"><span style="display:inline-block;width:16px;color:#8b6f4a;">${`ABCD`[r]}</span>${e}</span>
        <span style="color:#7a6850;font-size:12px;">${i} ${s}</span>
      </div>`}).join(``);f.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
        <span style="font-weight:800;color:${o?`#5d9a35`:`#a23829`};">Q${this.questionIdx+1} ${o?`✓`:`✕`}</span>
        <span style="color:#8b6f4a;font-size:11px;">${o?`Correct`:`See answer`}</span>
      </div>
      <div style="color:#3c2a1c;margin-bottom:4px;">${s}</div>
      <div style="color:#5a4530;font-style:italic;margin-bottom:6px;">${c}</div>
      <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:6px;">${p}</div>
      ${d?`<div style="color:#5a4530;font-size:12px;border-top:1px dashed #c8a878;padding-top:5px;">${d}</div>`:``}
    `,a.appendChild(f)}handleAnswer(e){if(this.locked)return;let t=this.lesson.questions[this.questionIdx],n=t.correctIndex??0,r=e===n;this.locked=!0;try{r?me():he()}catch{}this._snapshotAnsweredQ(t,e,n);let i=t.type,a=i===`listen-mc`||i===`listen-comprehension`;if(a&&this.hud){let e=this.hud.getSentenceElement(),r=t.options?.[n]??``,i=String(t.sentence??``).replace(/_{2,}/g,r);e&&(e.innerHTML=`<div style="font-size:16px;font-weight:800;color:#3c2a1c;line-height:1.6;padding:6px 4px;text-align:center;">${i}</div>`)}let o=a?`Q: ${t.question??``}\nA: ${t.options?.[n]??``}\n\n${t.explanationZh}`:t.explanationZh;this.clozeUI?.revealAnswer(e,n,o,r),r?(this.mascot?.setAnim(`happy`),this.scheduleAdvance(Ea)):this.mascot?.setAnim(`sad`)}handleForceCorrect(){this.clozeUI?.acknowledgeForceCorrect(),this.mascot?.setAnim(`happy`),this.scheduleAdvance(Ea)}handleContinue(){this.cancelAdvanceTimer(),this.advance()}scheduleAdvance(e){this.cancelAdvanceTimer(),this.advanceTimer=this.time.delayedCall(e,()=>this.advance())}cancelAdvanceTimer(){this.advanceTimer&&=(this.advanceTimer.remove(!1),void 0)}advance(){if(this.questionIdx+=1,this.questionIdx>=this.lesson.questions.length){this.finish();return}this.renderQuestion(this.lesson.questions[this.questionIdx])}finish(){en(this.chapter,this.lesson.id);try{this._showCompletionArticle()}catch{this.cleanupOverlay(),this.scene.start(`StoryModeScene`)}}_showCompletionArticle(){if(!this.hud||!this.lesson){this.cleanupOverlay(),this.scene.start(`StoryModeScene`);return}let e=this.hud.getSentenceElement(),t=this.hud.buttonsSlot();if(!e||!t){this.cleanupOverlay(),this.scene.start(`StoryModeScene`);return}let n=this.lesson.questions.filter(e=>e.type===`narration`).map(e=>String(e.sentence??``)).filter(Boolean).join(` `);document.getElementById(`pickup-lesson-history`)?.remove();let r=this.hud.mascotSlot();r&&(r.style.display=`none`),e.innerHTML=`
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px 12px;">
        <div style="font-size:13px;font-weight:800;color:#b07a2a;letter-spacing:1.5px;text-align:center;">THE STORY</div>
        <div style="font-size:16px;font-weight:600;color:#3c2a1c;line-height:1.8;text-align:left;">
          ${n.split(/(\s+)/).map(e=>!e||/^\s+$/.test(e)?e:`<span style="border-bottom:1px dashed #c8a878;padding:0 1px;">${e}</span>`).join(``)}
        </div>
        <button type="button" aria-label="Replay story" class="pickup-article-speaker" style="
          align-self:center; width:48px; height:48px; padding:0;
          background:transparent; border:none; cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
        ">
          <img src="/mascots/icon-speaker.webp" width="44" height="44" alt="" style="pointer-events:none;" />
        </button>
      </div>
    `,e.querySelector(`.pickup-article-speaker`)?.addEventListener(`click`,()=>{try{P(n)}catch{}});try{P(n)}catch{}t.innerHTML=``,Array.from(t.children).forEach(e=>e.style.display=`none`);let i=document.createElement(`button`);i.type=`button`,i.className=`pickup-article-continue`,i.textContent=`完成 · Done`,Object.assign(i.style,{width:`100%`,padding:`16px 0`,background:`#7ac74a`,color:`#ffffff`,border:`none`,borderBottom:`4px solid #5d9a35`,borderRadius:`14px`,fontSize:`17px`,fontWeight:`900`,letterSpacing:`1px`,cursor:`pointer`,fontFamily:`inherit`,touchAction:`manipulation`,WebkitTapHighlightColor:`transparent`,marginTop:`12px`}),i.addEventListener(`click`,()=>{this.cleanupOverlay(),this.scene.start(`StoryModeScene`)}),t.appendChild(i)}cleanupOverlay(){try{F()}catch{}this.cancelAdvanceTimer(),this.tapHandle?.destroy(),this.tapHandle=void 0,this.clozeUI?.destroy(),this.clozeUI=void 0,this.mascot?.destroy(),this.mascot=void 0,this.hud?.destroy(),this.hud=void 0,document.getElementById(`pickup-lesson-history`)?.remove()}};function Oa(){try{let e=`__pickup_storage_test__`;return localStorage.setItem(e,`1`),localStorage.removeItem(e),!1}catch{return!0}}if(typeof window<`u`&&Oa()){let e=document.createElement(`div`);e.id=`pickup-storage-warn`,e.style.cssText=`position:fixed;top:0;left:0;right:0;z-index:9999;background:#c84a3a;color:#fff;padding:10px 14px;text-align:center;font-size:12px;font-weight:800;line-height:1.4;font-family:"Noto Sans TC", "Nunito", system-ui, sans-serif;letter-spacing:0.3px;`,e.textContent=`⚠️ 進度無法儲存 — 請關閉私密瀏覽以保留 XP / 連勝紀錄`,document.body.appendChild(e)}var ka={type:h.default.HEADLESS,parent:`app`,width:400,height:800,backgroundColor:`#fef8ed`,scale:{mode:h.default.Scale.FIT,autoCenter:h.default.Scale.CENTER_BOTH},input:{activePointers:2,touch:{capture:!0}},scene:[ne,xe,Yi,aa,Wr,ha,Ta,ti,Da]},Aa=new h.default.Game(ka);window.pickupGame=Aa,document.addEventListener(`click`,e=>{let t=e.target;if(!t)return;let n=t.closest(`button`);n&&(n.hasAttribute(`data-no-click-sfx`)||x.audioMuted||(x.ensureContext(),fe()))},!0),window.setTimeout(()=>{document.getElementById(`pickup-tear-intro`)?.remove()},3200);