/* Complete workshop catalogue, using the existing workshop dialogs. */
(()=>{
 const track=document.querySelector('.b2b-needs-grid');if(!track)return;
 const templates=[...track.children];
 const workshops=[
 ['LIDERAZGO 360','Líderes que movilizan.','Feedback, delegación y conversaciones que ayudan a actuar.','openLeadershipWorkshop','de Liderazgo 360',0],
 ['VENTAS 360','Conversaciones que venden.','Conecta con el cliente, responde objeciones y acompaña el cierre.','sales','de Ventas 360',1],
 ['VENTAS EDUCATIVAS','Detrás de cada matrícula, un futuro.','Conecta con las metas del postulante y acompaña su siguiente paso.','openEducationWorkshop','de Ventas educativas',1],
 ['VENTAS HIPOTECARIAS','De la consulta a la casa propia.','Fortalece la asesoría, el seguimiento y la coordinación para avanzar.','mortgage','de Ventas hipotecarias',1],
 ['VENTA CONSULTIVA','Haz visible el valor.','Descubre necesidades y convierte servicios en soluciones relevantes.','openServicesWorkshop','de Venta consultiva de servicios',1],
 ['LIDERAZGO PARA JEFES','Activa el potencial de tu equipo.','Entrenamiento para jefes y supervisores que buscan movilizar resultados.','openLeadersResultsWorkshop','de Liderazgo para jefes y supervisores',0],
 ['TEAM BUILDING','Equipos que conectan.','Fortalece la confianza y la coordinación para resolver retos juntos.','openTeamBuildingWorkshop','de Team Building',2],
 ['EXPERIENCIA 360','Cada contacto cuenta.','Escucha, resuelve y recupera la confianza de tus clientes.','openExperienceWorkshop','de Experiencia del cliente',3]
 ];
 track.replaceChildren(...workshops.map(([category,title,description,target,name,icon])=>{const card=templates[icon].cloneNode(true);const label=document.createElement('span');label.className='b2b-category';label.textContent=category;card.querySelector('h3').before(label);const svg=card.querySelector('.b2b-icon svg');
 if(category==='VENTAS EDUCATIVAS')svg.innerHTML='<path d="m2 8 10-5 10 5-10 5L2 8ZM6 10v6c3 3 9 3 12 0v-6M22 8v8"/>';
 if(category==='VENTAS 360')svg.innerHTML='<path d="M20 4H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4l4 4v-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/><path d="M6 9h12M6 13h7"/>';
 card.querySelector('h3').textContent=title;card.querySelector('p').textContent=description;const button=card.querySelector('button');button.dataset.b2bTarget=target;button.querySelector('.sr-only').textContent=' '+name;return card;}));
 const all=document.createElement('a');all.className='b2b-link';all.href='#programas';all.textContent='Ver todos los talleres';const row=document.createElement('p');row.style.textAlign='center';row.append(all);track.after(row);
 const source=document.getElementById('estateWorkshop');
 if(source){const dialog=source.cloneNode(true);dialog.id='mortgageWorkshop';dialog.setAttribute('aria-labelledby','mortgageTitle');dialog.setAttribute('aria-describedby','mortgageIntro');dialog.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));const title=dialog.querySelector('h2');title.id='mortgageTitle';title.innerHTML='Cada crédito empieza con <span>un proyecto de vida.</span>';dialog.querySelector('.estate-kicker').textContent='VENTAS 360 · TALLER DE VENTAS HIPOTECARIAS';const intro=dialog.querySelector('.estate-hero-copy > p:last-child');intro.id='mortgageIntro';intro.textContent='Entrenamiento práctico para asesores y equipos comerciales de créditos hipotecarios.';
 const topics=[['Comprende al cliente','Identifica su proyecto, necesidades y dudas para orientar la conversación.'],['Asesora con claridad','Explica el proceso y trabaja objeciones de cuota, plazos y financiamiento.'],['Acompaña cada etapa','Ordena el seguimiento y coordina con clientes, inmobiliarias y áreas internas.']];dialog.querySelectorAll('.estate-topics > div').forEach((el,i)=>{el.querySelector('h3').textContent=topics[i][0];el.querySelector('p').textContent=topics[i][1];});dialog.querySelector('.estate-close').setAttribute('aria-label','Cerrar taller de Ventas hipotecarias');dialog.querySelector('.estate-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.estate-proposal').href='https://wa.me/51915147263?text='+encodeURIComponent('Hola, anlice. Quisiera una propuesta del taller de Ventas hipotecarias para mi equipo.');document.body.append(dialog);}
})();
/* Route the new need cards into the existing workshop controls. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-b2b-target]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.b2bTarget;
  if(id==='mortgage'){document.getElementById('mortgageWorkshop')?.showModal();return;}
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
