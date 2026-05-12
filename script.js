// Splash
function closeSplash(){document.getElementById('splash').classList.add('hidden')}

// Electric particles in splash
(function(){
const bg=document.querySelector('.splash-bg');if(!bg)return;
for(let i=0;i<50;i++){
const p=document.createElement('div');p.className='electric-particle';
p.style.left=Math.random()*100+'%';p.style.top=Math.random()*100+'%';
p.style.setProperty('--tx',(Math.random()-.5)*400+'px');
p.style.setProperty('--ty',(Math.random()-.5)*400+'px');
p.style.animationDelay=Math.random()*5+'s';
p.style.animationDuration=(3+Math.random()*4)+'s';
p.style.background=Math.random()>.5?'var(--accent)':'var(--accent2)';
p.style.width=p.style.height=(1+Math.random()*4)+'px';
bg.appendChild(p)}
})();

// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

// Active link
const secs=document.querySelectorAll('section');
const links=document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll',()=>{
let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-200)c=s.id});
links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c))});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click',e=>{e.preventDefault();
const t=document.querySelector(a.getAttribute('href'));
if(t)window.scrollTo({top:t.offsetTop-80,behavior:'smooth'})})});

// Particles
const canvas=document.getElementById('bg-canvas'),ctx=canvas.getContext('2d');
let dots=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener('resize',resize);

class Dot{
constructor(){this.init()}
init(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;
this.r=Math.random()*2+.4;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;
this.a=Math.random()*.35+.05;this.c=Math.random()>.6?'0,240,255':'168,85,247'}
update(){this.x+=this.vx;this.y+=this.vy;
if(this.x<0||this.x>canvas.width)this.vx*=-1;
if(this.y<0||this.y>canvas.height)this.vy*=-1}
draw(){ctx.fillStyle=`rgba(${this.c},${this.a})`;ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill()}}

function initDots(){dots=[];const n=Math.min(Math.floor(canvas.width*canvas.height/12000),140);
for(let i=0;i<n;i++)dots.push(new Dot())}

function drawLines(){for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){
const dx=dots[i].x-dots[j].x,dy=dots[i].y-dots[j].y,d=Math.sqrt(dx*dx+dy*dy);
if(d<110){ctx.strokeStyle=`rgba(0,240,255,${.05*(1-d/110)})`;ctx.lineWidth=.5;
ctx.beginPath();ctx.moveTo(dots[i].x,dots[i].y);ctx.lineTo(dots[j].x,dots[j].y);ctx.stroke()}}}

function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);dots.forEach(d=>{d.update();d.draw()});drawLines();requestAnimationFrame(animate)}
initDots();animate();

// Card mouse glow
document.querySelectorAll('.item-card').forEach(card=>{
card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')})});

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},
{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Buy flow
let pending='';
function buyItem(n){pending=n;document.getElementById('dc-prompt').classList.add('open')}
function closeDC(){document.getElementById('dc-prompt').classList.remove('open')}
function openQR(){document.getElementById('m-product').textContent=pending;document.getElementById('qr-modal').classList.add('open')}
function closeQR(){document.getElementById('qr-modal').classList.remove('open')}
document.querySelectorAll('.modal-bg').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')})});
