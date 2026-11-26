/* 大吉學習站｜數學小站的出題資料與出題規則
   網頁版（index.html）和紙本版（print.html）共用這個檔案。
   商品、價格都是練習用的模擬資料。 */

/* ---------- 亂數：同一天打開，題目一樣 ---------- */
function seeded(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
let R=Math.random;
const ri=(a,b)=>a+Math.floor(R()*(b-a+1));
const pick=a=>a[Math.floor(R()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
/* 選項順序每次都不一樣（不跟著日期固定） */
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ---------- 層級名稱 ---------- */
const A_LV={0:'A0 讀數與位值',1:'A1 大數量點數',2:'A2 十個一數',3:'A3 五個一數',4:'A4 兩個一數',5:'A5 混合數錢'};
const B_LV={1:'B1 不用算／比大小',2:'B2 加：買不同的東西',3:'B3 減：剩下、找回',4:'B4 加減混合',5:'B5 乘：同樣的東西買好幾個',6:'B6 加減乘混合'};
const C_TOP={len:'長度',cap:'容量',wt:'重量'};
const OPNAME={'+':'加','-':'減','×':'乘','none':'不用算'};
const OPSYM={'+':'＋','-':'－','×':'×'};

/* ---------- 數字的唸法 ---------- */
const CN='零一二三四五六七八九';
function cnRead(n){n=+n;const h=Math.floor(n/100),t=Math.floor(n/10)%10,o=n%10;let s='';
 if(h)s+=(h===2?'兩':CN[h])+'百';
 if(t)s+=(!h&&t===1?'':CN[t])+'十';else if(h&&o)s+='零';
 if(o)s+=CN[o];return s||'零'}
const digitRead=n=>String(n).split('').map(d=>CN[+d]).join('');

/* ---------- 素材 ---------- */
const COUNT_ITEMS=[['🍎','蘋果','顆'],['✏️','鉛筆','枝'],['🥚','雞蛋','顆'],['⭐','星星','個'],['🍬','糖果','顆']];
/* [名稱, 價錢, 圖, 量詞] */
const GOODS=[['吐司',45,'🍞','條'],['牛奶',30,'🥛','瓶'],['飯糰',35,'🍙','個'],['麵包',28,'🥐','個'],['綠茶',25,'🍵','瓶'],['香蕉',20,'🍌','串'],['餅乾',18,'🍪','包'],['優格',32,'🥣','盒'],['布丁',22,'🍮','個'],['豆漿',26,'🥤','瓶'],['原子筆',12,'🖊️','枝'],['筆記本',45,'📒','本'],['尺',28,'📏','把'],['色鉛筆',45,'🖍️','盒']];
const UNITS={
 len:{opts:['毫米','公分','公尺'],items:[['✏️','一枝鉛筆','有多長','公分'],['🥢','一雙筷子','有多長','公分'],['🧽','一塊海綿','有多長','公分'],['🐜','一隻螞蟻','有多長','毫米'],['🍚','一粒米','有多長','毫米'],['🪙','一枚硬幣','有多厚','毫米'],['🏃','操場的跑道','有多長','公尺'],['🏊','游泳池','有多長','公尺'],['🚌','一輛公車','有多長','公尺']],
  bench:['1 毫米：差不多一張卡片那麼厚','1 公分：差不多指甲那麼寬','1 公尺：差不多張開手臂那麼長']},
 cap:{opts:['毫升','公升'],items:[['🥛','一杯水','有多少','毫升'],['🧃','一小罐養樂多','有多少','毫升'],['🥄','一湯匙醬油','有多少','毫升'],['🪣','一大桶水','有多少','公升'],['🛁','一缸洗澡水','有多少','公升']],
  bench:['1 毫升：差不多一小滴','1 公升：差不多一大瓶礦泉水再多一點']},
 wt:{opts:['公克','公斤'],items:[['🥚','一顆雞蛋','有多重','公克'],['🍪','一片餅乾','有多重','公克'],['✏️','一枝鉛筆','有多重','公克'],['🍚','一袋米','有多重','公斤'],['🍉','一顆西瓜','有多重','公斤'],['🧍','一個人的體重','是多少','公斤']],
  bench:['1 公克：差不多一個迴紋針那麼輕','1 公斤：差不多一大瓶礦泉水再重一點']}};

function scatter(n){const pts=[];let guard=0;while(pts.length<n&&guard<5000){guard++;const x=6+R()*88,y=8+R()*84;if(pts.every(p=>Math.hypot((p[0]-x)*1.33,p[1]-y)>11))pts.push([x,y])}while(pts.length<n)pts.push([6+R()*88,8+R()*84]);return pts}

/* ---------- A0 讀數與位值 ---------- */
function num3(){const k=ri(0,3);const h=ri(1,9);if(k===0)return h*100;if(k===1)return h*100+ri(1,9);if(k===2)return h*100+ri(1,9)*10;return h*100+ri(1,9)*10+ri(1,9)}
function genA0(){const sub=pick(['read','write','cash']);
 if(sub==='read'){const n=num3();const right=cnRead(n);const cand=[digitRead(n)];
  const sw=Math.floor(n/100)*100+(n%10)*10+Math.floor(n/10)%10;if(sw!==n)cand.push(cnRead(sw));
  if(n%100>=10)cand.push(cnRead(n%100));const rv=+String(n).split('').reverse().join('');if(rv>=100&&rv!==n)cand.push(cnRead(rv));
  cand.push(cnRead(n+100>999?n-100:n+100));
  const opts=[right].concat([...new Set(cand.filter(c=>c!==right))].slice(0,3));
  return {strand:'A',level:0,type:'read',n,ans:right,opts,text:'這個數字要怎麼唸？'}}
 if(sub==='write'){const n=num3();return {strand:'A',level:0,type:'write',n,ans:n,reading:cnRead(n),text:'按「再聽一次題目」聽數字，把聽到的數字寫進百、十、個的格子裡。'}}
 const h=ri(1,3),t=ri(0,6),o=ri(0,6);return {strand:'A',level:0,type:'cash',h,t,o,ans:h*100+t*10+o,text:'錢包裡有這些錢。總共多少元？寫進百、十、個的格子裡。'}}

/* ---------- A 線：數感 ---------- */
function genA(lv){
 if(lv===0)return genA0();
 if(lv===1){const [e,n,u]=pick(COUNT_ITEMS);const N=ri(23,44);return {strand:'A',level:1,type:'count',emoji:e,name:n,unit:u,N,pts:scatter(N),ans:N,text:`數一數，${n}總共有幾${u}？`,how:'數過的點一下做記號。十個一組，比較不會數錯。'}}
 if(lv===2||lv===3){const v=lv===2?10:5,n=ri(4,9);return {strand:'A',level:lv,type:'skip',coin:v,n,step:v,unit:'元',ans:v*n,text:`一個 ${v} 元。${v===10?'十':'五'}元${v===10?'十':'五'}元往上數，總共多少元？`}}
 if(lv===4){const n=ri(4,9);return {strand:'A',level:4,type:'skip',pair:true,n,step:2,unit:'隻',ans:2*n,text:'一雙鞋子有 2 隻。兩隻兩隻往上數，總共有幾隻鞋子？'}}
 const coins=[];if(R()<.7)coins.push(50);for(let i=ri(1,3);i>0;i--)coins.push(10);if(R()<.6)coins.push(5);for(let i=ri(0,3);i>0;i--)coins.push(1);
 if(coins.length<3)coins.push(10);
 return {strand:'A',level:5,type:'mixed',coins:shuffle(coins),unit:'元',ans:coins.reduce((a,b)=>a+b,0),text:'錢包裡有這些錢。先從大的開始數，總共多少元？'}}

/* ---------- B 線：運算判斷 ----------
   購物題（type:'shop'）照老師的步驟：要買幾個東西→畫圈圈寫價錢→題目問一共還是剩下→價錢一樣嗎→用加、減還是乘 */
const W_ADD=['一共要付多少錢？','總共要付多少錢？','全部要付多少錢？'];
function goods(n){return shuffle(GOODS).slice(0,n).map(g=>[g[0],g[1],g[2],g[3]])}
function genB(lv){
 if(lv===4)lv=pick([1,2,2,3,3]);
 if(lv===6)lv=pick([2,3,5,5]);
 if(lv===1){
  const two=goods(2);
  if(R()<.6){const [a,pa,ea]=two[0];const enough=R()<.5;const W=enough?pa+ri(3,30):Math.max(5,pa-ri(3,15));
   return {strand:'B',level:1,type:'op',op:'none',goods:[two[0]],text:`錢包裡有 ${W} 元。${a}要 ${pa} 元。錢夠不夠？`,seg:['錢包裡有 ',{n:W,need:1},' 元。',a,'要 ',{n:pa,need:1},' 元。錢夠不夠？'],ans:W>=pa?'夠':'不夠',ansOpts:['夠','不夠'],why:`${W} 元和 ${pa} 元比一比。`}}
  const [[a,pa],[b,pb]]=two;if(pa===pb)return genB(1);
  return {strand:'B',level:1,type:'op',op:'none',goods:two,text:`${a} ${pa} 元，${b} ${pb} 元。哪一個比較貴？`,seg:[a,' ',{n:pa,need:1},' 元，',b,' ',{n:pb,need:1},' 元。哪一個比較貴？'],ans:pa>pb?a:b,ansOpts:[a,b],why:`${pa} 元和 ${pb} 元比一比。`}}
 if(lv===2){let two=goods(2);if(two[0][1]===two[1][1])two=goods(2);const [[a,pa,,ua],[b,pb,,ub]]=two;
  const t=R()<.5?`NAME要買 1 ${ua}${a}和 1 ${ub}${b}，${pick(W_ADD)}`:`NAME要買${a}和${b}，各買一${ua===ub?ua:'個'}。${pick(W_ADD)}`;
  return {strand:'B',level:2,type:'shop',op:'+',goods:two,text:t,count:2,circles:[pa,pb],ask:'total',same:false,nums:[pa,pb],ans:pa+pb,unit:'元',
   check:{q:`一共的錢，會比 ${Math.max(pa,pb)} 元多，還是比 ${Math.max(pa,pb)} 元少？`,ans:'比較多',opts:['比較多','比較少']}}}
 if(lv===5){const g=goods(1)[0];const [a,pa,,ua]=g;const k=ri(2,4);
  return {strand:'B',level:5,type:'shop',op:'×',goods:[g],text:`一${ua}${a} ${pa} 元，NAME要買 ${k} ${ua}。一共要付多少錢？`,count:k,circles:Array(k).fill(pa),ask:'total',same:true,nums:[pa,k],ans:pa*k,unit:'元',
   check:{q:`一共的錢，會比 ${pa} 元多，還是比 ${pa} 元少？`,ans:'比較多',opts:['比較多','比較少']}}}
 const g=goods(1)[0];const [a,pa,,ua]=g;
 if(R()<.5){const m=pick([100,150,200]);return {strand:'B',level:3,type:'shop',op:'-',goods:[g],money:m,text:`NAME有 ${m} 元，買了 1 ${ua}${a}。還剩多少錢？`,count:1,circles:[pa],ask:'left',same:true,nums:[m,pa],ans:m-pa,unit:'元',
  check:{q:`剩下的錢，會比 ${m} 元多，還是比 ${m} 元少？`,ans:'比較少',opts:['比較多','比較少']}}}
 return {strand:'B',level:3,type:'shop',op:'-',goods:[g],money:100,text:`NAME付了 100 元，買了 1 ${ua}${a}。店員要找回多少錢？`,count:1,circles:[pa],ask:'left',same:true,nums:[100,pa],ans:100-pa,unit:'元',
  check:{q:'找回的錢，會比 100 元多，還是比 100 元少？',ans:'比較少',opts:['比較多','比較少']}}}

/* ---------- C 線：量（選單位，不用算） ---------- */
function genC(topic){const U=UNITS[topic];const [e,n,ask,ans]=pick(U.items);return {strand:'C',topic,type:'unit',emoji:e,name:n,ask,ans,opts:U.opts,bench:U.bench,text:`要知道${n}${ask}，要用哪一個單位？`}}

/* ---------- 依層級出題（cfg：{A,B,C}） ---------- */
function makeQ(strand,idx,cfg){
 if(strand==='A'){let lv=cfg.A;if(lv>1&&R()<.35)lv=ri(1,lv-1);return genA(lv)}
 if(strand==='B'){let lv=cfg.B;if(lv>1&&lv!==4&&lv!==6&&R()<.3)lv=ri(1,lv-1);return genB(lv)}
 const tops=cfg.C.length?cfg.C:['len'];return genC(tops[idx%tops.length])}

function qLabel(q){return q.strand==='C'?`C ${C_TOP[q.topic]}`:`${q.strand}${q.level}`}
function qText(q){return q.text}
function qAnswer(q){
 if(q.type==='shop')return `圈圈 ${q.count} 個；${q.ask==='total'?'問一共':'問剩下／找回'}；${OPNAME[q.op]}：${q.nums[0]} ${OPSYM[q.op]} ${q.nums[1]} ＝ ${q.ans} ${q.unit}`;
 if(q.type==='op')return `不用算；答案：${q.ans}`;
 if(q.type==='unit')return q.ans;
 if(q.type==='read')return `${q.n} 唸「${q.ans}」`;
 if(q.type==='write')return `老師唸「${q.reading}」，寫 ${q.n}`;
 if(q.type==='cash')return `${q.ans} 元（百元 ${q.h} 張、十元 ${q.t} 個、一元 ${q.o} 個）`;
 return `${q.ans} ${q.unit}`}
