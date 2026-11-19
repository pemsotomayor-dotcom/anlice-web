/* Route the new need cards into the existing workshop controls. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-b2b-target]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.b2bTarget;
  if(id==='sales'){
   const card=document.querySelector('#programas>article');
   const details=card?.querySelector('details');
   if(details){details.open=true;card.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'center'});details.querySelector('summary')?.focus({preventScroll:true});}
   return;
  }
  document.getElementById(id)?.click();
 }));
})();

/* One slow advance every 7 seconds. Selection stays paused until resumed. */
(()=>{
 const track=document.querySelector('.b2b-needs-grid');if(!track)return;
 const cards=[...track.children],reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const controls=document.createElement('div');controls.className='b2b-carousel-controls';
 controls.innerHTML='<button type="button" aria-label="Taller anterior">‹</button><span class="b2b-carousel-count" aria-live="off"></span><button type="button" aria-label="Taller siguiente">›</button><button type="button" class="b2b-carousel-toggle">Pausar movimiento</button>';
 track.after(controls);track.setAttribute('aria-label','Talleres según las necesidades de tu equipo');track.setAttribute('aria-roledescription','carrusel');
 const [prev,next,toggle]=controls.querySelectorAll('button'),count=controls.querySelector('span');
 let paused=reduce.matches,hover=false,focused=false,visible=false,dir=1,timer=0,frame=0,animating=false;
 const max=()=>Math.max(0,track.scrollWidth-track.clientWidth);
 function update(){toggle.textContent=paused?'Reanudar movimiento':'Pausar movimiento';toggle.setAttribute('aria-pressed',String(paused));prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft>max()-3;const step=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0);count.textContent=Math.min(cards.length,Math.round(track.scrollLeft/step)+1)+' / '+cards.length;}
 function stop(){clearTimeout(timer);cancelAnimationFrame(frame);animating=false;track.style.scrollSnapType='';}
 function schedule(){clearTimeout(timer);if(!paused&&!hover&&!focused&&visible&&!document.hidden&&max()>3)timer=setTimeout(()=>advance(dir,false),7000);}
 function move(to){cancelAnimationFrame(frame);const from=track.scrollLeft,start=performance.now();if(reduce.matches){track.scrollLeft=to;update();schedule();return;}animating=true;track.style.scrollSnapType='none';function tick(now){const p=Math.min(1,(now-start)/1800),ease=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;track.scrollLeft=from+(to-from)*ease;if(p<1)frame=requestAnimationFrame(tick);else{animating=false;track.style.scrollSnapType='';update();schedule();}}frame=requestAnimationFrame(tick);}
 function advance(direction,manual){clearTimeout(timer);if(manual){paused=true;dir=direction;}else if(track.scrollLeft>=max()-3){dir=-1;}else if(track.scrollLeft<=3){dir=1;}const step=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0);move(Math.max(0,Math.min(max(),track.scrollLeft+step*(manual?direction:dir))));update();}
 function select(card){paused=true;stop();cards.forEach(c=>c.classList.toggle('b2b-selected',c===card));update();}
 cards.forEach(card=>{card.tabIndex=0;card.addEventListener('click',()=>select(card));card.addEventListener('keydown',e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(card);card.querySelector('button')?.focus({preventScroll:true});}});});
 prev.addEventListener('click',()=>advance(-1,true));next.addEventListener('click',()=>advance(1,true));toggle.addEventListener('click',()=>{paused=!paused;stop();update();schedule();});
 track.addEventListener('mouseenter',()=>{hover=true;stop();update();});track.addEventListener('mouseleave',()=>{hover=false;schedule();});
 track.addEventListener('focusin',()=>{focused=true;stop();update();});track.addEventListener('focusout',()=>{focused=false;schedule();});
 track.addEventListener('pointerdown',()=>{paused=true;stop();update();});track.addEventListener('scroll',()=>{if(!animating)update();},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else schedule();});
 reduce.addEventListener('change',()=>{if(reduce.matches){paused=true;stop();update();}});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)schedule();else stop();},{threshold:.25}).observe(track);else{visible=true;schedule();}
 window.addEventListener('resize',()=>{stop();update();schedule();});update();
})();
