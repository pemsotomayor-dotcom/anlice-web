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
