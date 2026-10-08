const menu = document.querySelector('.menu');
const nav = document.querySelector('#main-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Abrir menú');
}

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('header')) closeMenu();
});

window.matchMedia('(min-width: 1101px)').addEventListener('change', closeMenu);

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('formMsg').textContent = 'Formulario listo. Conectaremos el envío antes de publicar.';
});

/* ANLICE ACTIVA Express */
(() => {
  const openBtn=document.getElementById('startActiva'), modal=document.getElementById('activaQuiz'), closeBtn=document.getElementById('closeActiva');
  const form=document.getElementById('activaForm'), result=document.getElementById('quizResult'), scale=document.getElementById('quizScale');
  if(!openBtn||!modal) return;
  const qs=[...modal.querySelectorAll('.quiz-question')], answers=[], workshops={
    'Ejecución y productividad':['PRODUCTIVIDAD 360','Priorización, foco, organización del trabajo, accountability y ejecución.','Fortalecer claridad de objetivos, prioridades y disciplina de ejecución.'],
    'Liderazgo':['LIDERAZGO 360','Feedback, seguimiento, liderazgo situacional y movilización de equipos.','Fortalecer el acompañamiento del líder y la corrección oportuna de desviaciones.'],
    'Gestión comercial':['VENTAS 360','Prospección, venta consultiva, manejo de objeciones, seguimiento y cierre.','Ordenar el proceso comercial y fortalecer conversión y seguimiento de oportunidades.'],
    'Experiencia del cliente':['EXPERIENCIA 360','Momentos de verdad, clientes difíciles, manejo de reclamos y cultura de servicio.','Fortalecer criterios y habilidades para responder consistentemente al cliente.'],
    'Comunicación y colaboración':['COMUNICACIÓN QUE MOVILIZA','Comunicación efectiva, coordinación, conversaciones difíciles y acuerdos entre áreas.','Reducir fricciones, retrabajos y fallas de coordinación entre equipos.'],
    'Gestión y seguimiento':['GESTIÓN PARA RESULTADOS','Indicadores, seguimiento, reuniones efectivas y planes de acción.','Convertir información e indicadores en decisiones y acciones de mejora.']
  };
  let step=0;
  function show(){qs.forEach((q,i)=>q.classList.toggle('active',i===step));document.getElementById('quizProgress').style.width=((step+1)/qs.length*100)+'%';}
  function reset(){step=0;answers.length=0;form.hidden=false;result.hidden=true;scale.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));show();}
  openBtn.addEventListener('click',()=>{modal.hidden=false;document.body.classList.add('quiz-open');reset();modal.scrollIntoView({behavior:'smooth',block:'start'});});
  closeBtn?.addEventListener('click',()=>{modal.hidden=true;document.body.classList.remove('quiz-open');});
  scale?.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;answers[step]=+b.dataset.value;b.classList.add('selected');setTimeout(()=>{if(step<qs.length-1){step++;scale.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));show();}else finish();},180);});
  function finish(){
    form.hidden=true; result.hidden=false;
    const scores=answers.map(v=>v*20), total=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length), min=Math.min(...scores), idx=scores.indexOf(min), gap=qs[idx].dataset.dim, w=workshops[gap];
    document.getElementById('quizTotal').textContent=total;document.getElementById('quizLevel').textContent=total>=80?'Fortaleza consolidada':total>=60?'En desarrollo':total>=40?'Requiere atención':'Prioridad de intervención';
    document.getElementById('quizGap').textContent=gap;document.getElementById('quizInsight').textContent=w[2];document.getElementById('quizWorkshop').textContent=w[0];document.getElementById('quizWorkshopFocus').textContent=w[1];
    document.getElementById('quizChart').innerHTML=qs.map((q,i)=>'<div><span>'+q.dataset.dim+'</span><b>'+scores[i]+'%</b><i><em style="width:'+scores[i]+'%"></em></i></div>').join('');
    const contact=document.getElementById('quizContact');const msg='Hola ANLICE, realicé ACTIVA Express. Mi resultado general fue '+total+'/100 y mi principal oportunidad detectada fue '+gap+' ('+min+'%). Me recomendaron '+w[0]+'. Quisiera conversar sobre mi resultado.';contact.href='https://wa.me/51903220257?text='+encodeURIComponent(msg);contact.target='_blank';contact.rel='noopener noreferrer';contact.onclick=null;
  }
  document.getElementById('restartActiva')?.addEventListener('click',reset);
})();

/* ANLICE IMPULSA profile */
(() => {
 const open=document.getElementById('startImpulsa'), modal=document.getElementById('impulsaQuiz'), close=document.getElementById('closeImpulsa'), form=document.getElementById('impulsaForm'), result=document.getElementById('impulsaResult'), scale=document.getElementById('impulsaScale');
 if(!open||!modal) return;
 const qs=[...modal.querySelectorAll('.impulsa-question')], answers=[];
 const advice={
 'Comunicación':['Practica presentar tus ideas en 60 segundos con una estructura clara: idea, razón y ejemplo.','Comunicación que conecta'],
 'Inteligencia emocional':['Entrena cómo reconocer la emoción, hacer una pausa y elegir tu respuesta ante presión o frustración.','Gestión emocional'],
 'Iniciativa':['Empieza a convertir problemas pequeños en propuestas: identifica, plantea una solución y toma acción.','Iniciativa y liderazgo personal'],
 'Trabajo en equipo':['Practica escuchar perspectivas diferentes, acordar responsabilidades y construir soluciones con otros.','Colaboración efectiva'],
 'Empleabilidad':['Prepara una presentación breve de quién eres, qué sabes hacer y qué valor puedes aportar.','CV, LinkedIn y entrevistas'],
 'Competencias digitales':['Fortalece herramientas digitales para organizarte, crear, comunicar y resolver problemas con mayor autonomía.','Empleabilidad digital']
 };
 let step=0;
 function show(){qs.forEach((q,i)=>q.classList.toggle('active',i===step));document.getElementById('impulsaProgress').style.width=((step+1)/qs.length*100)+'%';}
 function reset(){step=0;answers.length=0;form.hidden=false;result.hidden=true;scale.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));show();}
 open.addEventListener('click',()=>{modal.hidden=false;document.body.classList.add('quiz-open');reset();});
 close.addEventListener('click',()=>{modal.hidden=true;document.body.classList.remove('quiz-open');});
 scale.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;answers[step]=+b.dataset.value;b.classList.add('selected');setTimeout(()=>{if(step<qs.length-1){step++;scale.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));show();}else finish();},180);});
 function finish(){form.hidden=true;result.hidden=false;const scores=answers.map(v=>v*20),total=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length),min=Math.min(...scores),idx=scores.indexOf(min),gap=qs[idx].dataset.dim,a=advice[gap];
 document.getElementById('impulsaTotal').textContent=total;document.getElementById('impulsaLevel').textContent=total>=85?'IMPULSA Ready':total>=70?'IMPULSA Avanzado':total>=50?'IMPULSA en Desarrollo':'IMPULSA Inicial';
 document.getElementById('impulsaGap').textContent=gap;document.getElementById('impulsaInsight').textContent=a[0];document.getElementById('impulsaNext').textContent=a[1];
 document.getElementById('impulsaChart').innerHTML=qs.map((q,i)=>'<div><span>'+q.dataset.dim+'</span><b>'+scores[i]+'%</b><i><em style="width:'+scores[i]+'%"></em></i></div>').join('');
 const contact=document.getElementById('impulsaContact');const msg='Hola ANLICE, hice mi Perfil IMPULSA. Obtuve '+total+'/100 y quiero reforzar '+gap+'. Mi siguiente paso recomendado es '+a[1]+'. Quisiera orientación para mejorar mi perfil.';contact.href='https://wa.me/51903220257?text='+encodeURIComponent(msg);contact.target='_blank';contact.rel='noopener noreferrer';}
 document.getElementById('restartImpulsa').addEventListener('click',reset);
})();


/* Persistent selection motion for ACTIVA + IMPULSA visual cards */
(()=>{
 const cards=[...document.querySelectorAll('.activa-dims span, .impulsa-skills span')];
 cards.forEach(card=>{
   card.setAttribute('tabindex','0');
   const select=()=>{
     const group=card.parentElement;
     group.querySelectorAll('span.is-selected').forEach(x=>{if(x!==card)x.classList.remove('is-selected')});
     card.classList.toggle('is-selected');
   };
   card.addEventListener('click',select);
   card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
 });
})();


/* v12 force click animation + persistent selection */
document.addEventListener('click',function(e){
 const card=e.target.closest('.activa-dims span, .impulsa-skills span');
 if(!card)return;
 const group=card.parentElement;
 group.querySelectorAll(':scope > span').forEach(x=>{if(x!==card)x.classList.remove('card-picked')});
 card.classList.toggle('card-picked');
 card.classList.remove('card-pop');
 void card.offsetWidth;
 card.classList.add('card-pop');
 setTimeout(()=>card.classList.remove('card-pop'),520);
});

/* Privacy consent for voluntary diagnostic sharing through WhatsApp. */
(()=>{
 ['quizContact','impulsaContact'].forEach(id=>{
  const link=document.getElementById(id), consent=document.querySelector('[data-consent-for="'+id+'"]');
  if(!link||!consent)return;
  link.addEventListener('click',event=>{
   if(!consent.checked){event.preventDefault();consent.focus();consent.closest('label')?.classList.add('privacy-attention');return;}
   const href=link.getAttribute('href');
   if(href?.startsWith('https://wa.me/')){
    const url=new URL(href), msg=url.searchParams.get('text')||'';
    if(!msg.includes('Aviso de Privacidad')){
     url.searchParams.set('text',msg+' He leído el Aviso de Privacidad de ANLICE y autorizo el tratamiento de mis datos para atender esta consulta.');
     link.href=url.toString();
    }
   }
  });
  consent.addEventListener('change',()=>consent.closest('label')?.classList.remove('privacy-attention'));
 });
})();
