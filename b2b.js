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

/* Continuous slow motion; only a deliberate selection or pause stops it. */
(()=>{
 const track=document.querySelector('.b2b-needs-grid');if(!track)return;
 const cards=[...track.children],reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const copy=[['LIDERAZGO 360','Líderes que movilizan.','Feedback, delegación y conversaciones que ayudan a actuar.'],['VENTAS 360','Conversaciones que venden.','Conecta con el cliente, responde objeciones y acompaña el cierre.'],['TEAM BUILDING','Equipos que conectan.','Fortalece la confianza y la coordinación para resolver retos juntos.'],['EXPERIENCIA 360','Cada contacto cuenta.','Escucha, resuelve y recupera la confianza de tus clientes.']];
 cards.forEach((card,i)=>{const label=document.createElement('span');label.className='b2b-category';label.textContent=copy[i][0];card.querySelector('h3').before(label);card.querySelector('h3').textContent=copy[i][1];card.querySelector('p').textContent=copy[i][2];});
 const controls=document.createElement('div');controls.className='b2b-carousel-controls';
 controls.innerHTML='<button type="button" aria-label="Taller anterior">‹</button><span class="b2b-carousel-count" aria-live="off"></span><button type="button" aria-label="Taller siguiente">›</button><button type="button" class="b2b-carousel-toggle">Pausar movimiento</button>';
 track.after(controls);track.setAttribute('aria-label','Talleres según las necesidades de tu equipo');track.setAttribute('aria-roledescription','carrusel');
 const [prev,next,toggle]=controls.querySelectorAll('button'),count=controls.querySelector('span');
 let paused=reduce.matches,visible=false,dir=1,frame=0,last=0,position=track.scrollLeft;
 const max=()=>Math.max(0,track.scrollWidth-track.clientWidth);
 function update(){toggle.textContent=paused?'Reanudar movimiento':'Pausar movimiento';toggle.setAttribute('aria-pressed',String(paused));prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft>max()-2;const step=cards[0].offsetWidth+parseFloat(getComputedStyle(track).gap||0);const first=Math.min(cards.length,Math.floor((track.scrollLeft+2)/step)+1);const shown=Math.max(1,Math.floor((track.clientWidth+22)/step));count.textContent=first+'–'+Math.min(cards.length,first+shown-1)+' / '+cards.length;}
 function stop(){cancelAnimationFrame(frame);frame=0;last=0;position=track.scrollLeft;}
 function tick(now){if(paused||!visible||document.hidden){stop();return;}const elapsed=last?Math.min(50,now-last):0;last=now;position+=dir*elapsed*.028;const edge=max();if(position>=edge){position=edge;dir=-1;}if(position<=0){position=0;dir=1;}track.scrollLeft=position;update();frame=requestAnimationFrame(tick);}
 function start(){if(!frame&&!paused&&visible&&!document.hidden&&max()>2){position=track.scrollLeft;last=0;frame=requestAnimationFrame(tick);}}
 function pause(){paused=true;stop();update();}
 function select(card){pause();cards.forEach(c=>c.classList.toggle('b2b-selected',c===card));}
 cards.forEach(card=>{card.tabIndex=0;card.addEventListener('click',()=>select(card));card.addEventListener('keydown',e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(card);card.querySelector('button')?.focus({preventScroll:true});}});});
 function manual(direction){pause();const step=cards[0].offsetWidth+parseFloat(getComputedStyle(track).gap||0);track.scrollTo({left:Math.max(0,Math.min(max(),track.scrollLeft+direction*step)),behavior:reduce.matches?'auto':'smooth'});}
 prev.addEventListener('click',()=>manual(-1));next.addEventListener('click',()=>manual(1));
 toggle.addEventListener('click',()=>{if(paused){paused=false;cards.forEach(c=>c.classList.remove('b2b-selected'));update();start();}else pause();});
 track.addEventListener('pointerdown',pause);track.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>2)pause();},{passive:true});
 track.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))pause();});
 track.addEventListener('scroll',()=>{if(paused)update();},{passive:true});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 reduce.addEventListener('change',()=>{if(reduce.matches)pause();});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else stop();},{threshold:.1}).observe(track);else{visible=true;start();}
 window.addEventListener('resize',()=>{stop();update();start();});update();
})();
