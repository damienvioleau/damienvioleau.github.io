// Mobile menu
const tog=document.querySelector('.nav-toggle'), links=document.querySelector('.nav-links');
if(tog){tog.addEventListener('click',()=>{const o=links.classList.toggle('open');tog.setAttribute('aria-expanded',o)});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));}

// Highlight current section in the menu
const navA=[...document.querySelectorAll('.nav-links a')];
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>obs.observe(s));

// Publication tabs + filter
const tabs=[...document.querySelectorAll('.tabs button')], panels=[...document.querySelectorAll('.pubpanel')];
const q=document.getElementById('pubsearch'), empty=document.querySelector('#publications .empty');
let current='journal';
function show(){
  const term=(q.value||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  let shown=0;
  panels.forEach(p=>{
    // while filtering, search every category at once
    const on = term ? true : p.dataset.panel===current;
    p.hidden=!on;
    p.querySelectorAll('li').forEach(li=>{
      const t=li.textContent.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
      const ok=!term||term.split(/\s+/).every(w=>t.includes(w));
      li.hidden=!ok; if(on&&ok) shown++;
    });
    if(term) p.hidden = ![...p.querySelectorAll('li')].some(li=>!li.hidden);
  });
  empty.hidden=shown>0;
}
tabs.forEach(b=>b.addEventListener('click',()=>{current=b.dataset.tab;q.value='';tabs.forEach(x=>x.setAttribute('aria-selected',x===b));show()}));
if(q){q.addEventListener('input',show);show();}

// Links such as href="#books" open the matching Publications tab
function openTab(name){
  const b=tabs.find(t=>t.dataset.tab===name); if(!b) return false;
  b.click(); document.getElementById('publications').scrollIntoView({behavior:'smooth'}); return true;
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  if(openTab(a.getAttribute('href').slice(1))){e.preventDefault(); history.replaceState(null,'',a.getAttribute('href'));}
}));
if(location.hash) openTab(location.hash.slice(1));
