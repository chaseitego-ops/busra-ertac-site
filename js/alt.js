// Alt sayfalar: menü harf animasyonu, görünürken beliren öğeler, başvuru konusunu ana sayfadaki forma taşıma
(function(){
  document.querySelectorAll('.roll').forEach(function(el){var t=el.textContent;el.textContent='';el.setAttribute('aria-label',t);t.split('').forEach(function(ch,i){var s=document.createElement('span');s.className='lt';s.textContent=ch;s.setAttribute('data-c',ch);s.setAttribute('aria-hidden','true');s.style.setProperty('--n',i);el.appendChild(s)})});
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')})}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}
  document.querySelectorAll('[data-topic]').forEach(function(a){a.addEventListener('click',function(){try{sessionStorage.setItem('konu',a.getAttribute('data-topic'))}catch(e){}})});
  // kapanış kavisi: düz başlar, yükselir, yeniden düzleşir (ana sayfadakiyle aynı)
  var end=document.querySelector('.end'), curve=end&&end.querySelector('.curve');
  if(curve&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var cur=0, tgt=0, run=false, ease=function(t){return .5-.5*Math.cos(Math.PI*t)};
    var calc=function(){ var p=(innerHeight-end.getBoundingClientRect().top)/Math.min(innerHeight*.88,end.offsetHeight-2); p=Math.max(0,Math.min(1,p)); tgt=p<.5?ease(p*2):ease((1-p)*2); if(!run){run=true;requestAnimationFrame(step)} };
    var step=function(){ cur+=(tgt-cur)*.14; if(Math.abs(tgt-cur)<.002) cur=tgt; curve.style.transform='scaleY('+cur.toFixed(4)+')'; if(cur!==tgt) requestAnimationFrame(step); else run=false; };
    curve.style.transform='scaleY(0)'; addEventListener('scroll',calc,{passive:true}); addEventListener('resize',calc); calc();
  }
})();
