const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const m=html.match(/<script>([\s\S]*?)<\/script>/);
const jsCode = m[1];
const dataStart = jsCode.indexOf('// ===== DATA =====');
const algoEnd = jsCode.indexOf('// ===== APP =====');
// Replace const/let with var so eval leaks to global scope (avoid breaking 'return')
const pureLogic = jsCode.substring(dataStart, algoEnd).replace(/\bconst /g,'var ').replace(/\blet /g,'var ');
eval(pureLogic);

const profiles = [
  {name:'创业狂人', desc:'高驱动+低关系+低安全+高探索+高反省+低利他',
   expect:['脑洞永动机','规则碎纸机','好奇心过载体','梦想过山车'],
   ans:{q1:3,q2:3,q3:3,q4:3, q5:1,q6:1,q7:1,q8:1, q9:1,q10:1,q11:1,q12:1, q13:3,q14:3,q15:3,q16:3, q17:3,q18:3,q19:3,q20:3, q21:1,q22:1,q23:1,q24:1}},
  
  {name:'暖心守护者', desc:'低驱动+高关系+高安全+低探索+中反省+高利他',
   expect:['人形安全气囊','人间创可贴','情绪收发室'],
   ans:{q1:1,q2:1,q3:1,q4:1, q5:3,q6:3,q7:3,q8:3, q9:3,q10:3,q11:3,q12:3, q13:1,q14:1,q15:1,q16:1, q17:2,q18:2,q19:2,q20:2, q21:3,q22:3,q23:3,q24:3}},
  
  {name:'独行侠', desc:'中驱动+低关系+低安全+高探索+高反省+低利他',
   expect:['社交绝缘体','好奇心过载体','自由散养人'],
   ans:{q1:2,q2:2,q3:2,q4:2, q5:1,q6:1,q7:1,q8:1, q9:1,q10:1,q11:1,q12:1, q13:3,q14:3,q15:3,q16:3, q17:3,q18:3,q19:3,q20:3, q21:1,q22:1,q23:1,q24:1}},
  
  {name:'哲学青年', desc:'低驱动+低关系+中安全+中探索+高反省+中利他',
   expect:['脑内TED主播','CPU满载中'],
   ans:{q1:1,q2:1,q3:1,q4:1, q5:1,q6:2,q7:1,q8:2, q9:2,q10:2,q11:2,q12:2, q13:2,q14:2,q15:2,q16:2, q17:3,q18:3,q19:3,q20:3, q21:2,q22:2,q23:2,q24:2}},
  
  {name:'社交达人', desc:'高驱动+高关系+中安全+中探索+中反省+高利他',
   expect:['社交路由器','全场最亮的','行走鸡汤机'],
   ans:{q1:3,q2:3,q3:3,q4:3, q5:3,q6:3,q7:3,q8:3, q9:2,q10:2,q11:2,q12:2, q13:2,q14:2,q15:2,q16:2, q17:2,q18:2,q19:2,q20:2, q21:3,q22:3,q23:3,q24:3}},
  
  {name:'佛系青年', desc:'全中间',
   expect:['人生自助餐'],
   ans:{q1:2,q2:2,q3:2,q4:2, q5:2,q6:2,q7:2,q8:2, q9:2,q10:2,q11:2,q12:2, q13:2,q14:2,q15:2,q16:2, q17:2,q18:2,q19:2,q20:2, q21:2,q22:2,q23:2,q24:2}},
  
  {name:'稳重匠人', desc:'高驱动+中关系+高安全+低探索+中反省+中利他',
   expect:['十年钉子户'],
   ans:{q1:3,q2:3,q3:3,q4:3, q5:2,q6:2,q7:2,q8:2, q9:3,q10:3,q11:3,q12:3, q13:1,q14:1,q15:1,q16:1, q17:2,q18:2,q19:2,q20:2, q21:2,q22:2,q23:2,q24:2}},
  
  {name:'自由浪子', desc:'中驱动+低关系+低安全+高探索+中反省+低利他',
   expect:['自由散养人','规则碎纸机','好奇心过载体'],
   ans:{q1:2,q2:2,q3:2,q4:2, q5:1,q6:1,q7:1,q8:1, q9:1,q10:1,q11:1,q12:1, q13:3,q14:3,q15:3,q16:3, q17:2,q18:2,q19:2,q20:2, q21:1,q22:1,q23:1,q24:1}},

  {name:'热血冒险家', desc:'高驱动+中关系+低安全+高探索+低反省+中利他',
   expect:['梦想过山车','规则碎纸机','脑洞永动机'],
   ans:{q1:3,q2:3,q3:3,q4:3, q5:2,q6:2,q7:2,q8:2, q9:1,q10:1,q11:1,q12:1, q13:3,q14:3,q15:3,q16:3, q17:1,q18:1,q19:1,q20:1, q21:2,q22:2,q23:2,q24:2}},

  {name:'情绪共鸣者', desc:'低驱动+高关系+中安全+低探索+高反省+高利他',
   expect:['情绪收发室','人间创可贴'],
   ans:{q1:1,q2:1,q3:1,q4:1, q5:3,q6:3,q7:3,q8:3, q9:2,q10:2,q11:2,q12:2, q13:1,q14:1,q15:1,q16:1, q17:3,q18:3,q19:3,q20:3, q21:3,q22:3,q23:3,q24:3}},

  // NEW: mixed/realistic profiles
  {name:'普通上班族', desc:'中驱动+中关系+中偏高安全+低探索+低反省+中利他',
   expect:['十年钉子户','人形安全气囊','人生自助餐','行走鸡汤机'],
   ans:{q1:2,q2:2,q3:2,q4:2, q5:2,q6:2,q7:2,q8:2, q9:3,q10:3,q11:2,q12:3, q13:1,q14:2,q15:1,q16:1, q17:1,q18:2,q19:1,q20:2, q21:2,q22:2,q23:2,q24:2}},

  {name:'文艺女青年', desc:'中驱动+中偏高关系+低安全+中探索+高反省+中利他',
   expect:['脑内TED主播','情绪收发室','人间创可贴'],
   ans:{q1:2,q2:3,q3:2,q4:2, q5:3,q6:2,q7:3,q8:3, q9:1,q10:1,q11:1,q12:1, q13:2,q14:2,q15:3,q16:2, q17:3,q18:3,q19:3,q20:3, q21:2,q22:3,q23:2,q24:2}},
];

console.log('========== STARL 准确度自测 (30题版) ==========\n');

let hitCount = 0;
profiles.forEach((p,i)=>{
  const r = computeResult(p.ans);
  const raw = DIM_ORDER.map(d => d+':'+r.raw[d]+'('+r.levels[d]+')').join(' ');
  const top3 = r.ranked.slice(0,3).map(t => t.code+'('+t.sim+'%)').join(' / ');
  const hit = p.expect.includes(r.best.code);
  if(hit) hitCount++;
  
  console.log(`[${i+1}] ${p.name} — ${p.desc}`);
  console.log(`    得分: ${raw}`);
  console.log(`    结果: ${r.best.code}（${r.best.meaning}）${r.badge}`);
  console.log(`    Top3: ${top3}`);
  console.log(`    期望: ${p.expect.join('/')} => ${hit ? '✅ 命中' : '❌ 未命中'}`);
  console.log('');
});

console.log(`========== 总计: ${hitCount}/${profiles.length} 命中 (${Math.round(hitCount/profiles.length*100)}%) ==========`);

// Also check: how many unique types can be reached?
console.log('\n--- 可达性检查 ---');
const allTypes = new Set();
// Brute force a sample of patterns
const vals = [1,2,3];
let combos = 0;
for(let f=1;f<=3;f++) for(let t=1;t<=3;t++) for(let a=1;a<=3;a++)
  for(let q=1;q<=3;q++) for(let m2=1;m2<=3;m2++) for(let l=1;l<=3;l++){
    combos++;
    const levels = {};
    const rawScores = {F:f*4, T:t*4, A:a*4, Q:q*4, M:m2*4, L:l*4};
    DIM_ORDER.forEach(d => { levels[d] = sumToLevel(rawScores[d]); });
    const uv = DIM_ORDER.map(d => levelNum(levels[d]));
    let bestDist = Infinity, bestCode = '';
    TYPES.forEach(tp => {
      const tv = parsePattern(tp.pattern).map(levelNum);
      let dist = 0;
      for(let i=0;i<tv.length;i++) dist += Math.abs(uv[i]-tv[i]);
      if(dist < bestDist) { bestDist = dist; bestCode = tp.code; }
    });
    allTypes.add(bestCode);
  }
console.log(`729种维度组合 => 可达 ${allTypes.size}/16 种类型`);
console.log('可达类型:', [...allTypes].join(', '));
const unreachable = TYPES.map(t=>t.code).filter(c=>!allTypes.has(c));
if(unreachable.length) console.log('⚠️ 不可达类型:', unreachable.join(', '));
else console.log('✅ 全部16种类型均可达');
