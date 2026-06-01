const fs=require('fs');
let r1=0,total=0;
const leaks=[];
const ESC=/[.*+?^${}()|[\]\\]/g;
for(let c=1;c<=8;c++){
  const j=JSON.parse(fs.readFileSync('C:/Users/acer/Desktop/wordwar/public/lessons-ch'+c+'.json','utf8'));
  function walk(o){
    if(Array.isArray(o))o.forEach(walk);
    else if(o&&typeof o=='object'){
      if(o.type&&['listen-mc','listen-emoji','listen-comprehension'].includes(o.type)&&o.subSkill!=='vocab'){
        total++;
        const s=(o.sentence||'').toLowerCase();
        const co=(o.options[o.correctIndex]||'').toLowerCase();
        const coStrip=co.replace(/^(the|a|an) /,'');
        if(coStrip.length>=4){
          const esc=coStrip.replace(ESC,'\\$&');
          const re=new RegExp('\\b'+esc+'\\b');
          if(re.test(s)){r1++; if(leaks.length<10) leaks.push('ch'+c+' '+o.id+' | S: '+o.sentence+' | C: '+o.options[o.correctIndex]);}
        }
      }
      for(const k in o)walk(o[k]);
    }
  }
  walk(j);
}
console.log('R1 leaks across all',total,':',r1);
leaks.forEach(l=>console.log(l));
