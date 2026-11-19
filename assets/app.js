'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navlinks');
menu?.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opened));nav.classList.toggle('open',opened);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
const slides=[...document.querySelectorAll('.slide')];
if(slides.length){
 let current=0;let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let timer;
 const hero=document.querySelector('.hero'), dots=[...document.querySelectorAll('[data-slide]')],pause=document.querySelector('#pause');
 function show(n){current=(n+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('current',i===current);slide.setAttribute('aria-hidden',String(i!==current));slide.inert=i!==current;dots[i].setAttribute('aria-current',String(i===current));});}
 function restart(){clearInterval(timer);if(!paused&&!document.hidden)timer=setInterval(()=>show(current+1),6500);}
 function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');}
 document.querySelector('#prev').addEventListener('click',()=>{show(current-1);restart();});
 document.querySelector('#next').addEventListener('click',()=>{show(current+1);restart();});
 dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart();}));
 pause.addEventListener('click',()=>{paused=!paused;updatePause();restart();});
 hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',restart);
 hero.addEventListener('focusin',()=>clearInterval(timer));hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))restart();});
 document.addEventListener('visibilitychange',restart);
 let touchX=null;hero.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});hero.addEventListener('touchend',e=>{if(touchX!==null){const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>65){show(current+(d<0?1:-1));restart();}touchX=null;}},{passive:true});updatePause();restart();
}
const params=new URLSearchParams(location.search),form=document.querySelector('#brief-form');
if(form){
 if(params.has('service'))form.elements.service.value=params.get('service');
 if(params.has('package'))form.elements.package.value=params.get('package');
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const service=form.elements.service.selectedOptions[0].textContent;document.querySelector('#draft-output').value=`Concierge.pk — service enquiry\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nWhatsApp: ${d.get('phone')||'Not provided'}\nService: ${service}\nLocation: ${d.get('location')}\nPreferred date: ${d.get('date')||'Flexible'}\nPackage / budget: ${d.get('package')||'Please advise'}\n\nBrief:\n${d.get('brief')}\n\nPlease confirm availability, scope and an itemised quote. This is an enquiry, not a booking.`;document.querySelector('#brief-result').hidden=false;document.querySelector('#draft-output').focus();});
 document.querySelector('#copy-brief').addEventListener('click',async()=>{const output=document.querySelector('#draft-output');try{await navigator.clipboard.writeText(output.value);document.querySelector('#copy-status').textContent='Copied. Nothing has been sent to Concierge.pk.';}catch{output.focus();output.select();document.querySelector('#copy-status').textContent='Select and copy the draft above. Nothing has been sent.';}});
}
const conf=window.CONCIERGE_CONFIG||{};
function addGoogleLink(id,url,text){if(!url)return;try{const u=new URL(url);if(u.protocol!=='https:'||!['docs.google.com','forms.gle'].includes(u.hostname))return;const target=document.getElementById(id);if(!target)return;const a=document.createElement('a');a.href=u.href;a.className='btn';a.textContent=text;a.target='_blank';a.rel='noopener';target.append(a);}catch{}}
addGoogleLink('google-link',conf.enquiryFormUrl,'Open Google service form ↗');addGoogleLink('signup-link',conf.signupFormUrl,'Open Google signup form ↗');
const faqSearch=document.getElementById('faq-search');
if(faqSearch){const items=[...document.querySelectorAll('.faq-item')],groups=[...document.querySelectorAll('.faq-group')];function filterFaq(){const term=faqSearch.value.trim().toLowerCase();let found=0;items.forEach(x=>{const match=x.textContent.toLowerCase().includes(term);x.hidden=!match;if(match)found++;});groups.forEach(g=>g.hidden=![...g.querySelectorAll('.faq-item')].some(x=>!x.hidden));document.getElementById('faq-count').textContent=`${found} of ${items.length} questions shown`;document.getElementById('faq-empty').hidden=found>0;}faqSearch.addEventListener('input',filterFaq);filterFaq();}
const finder=document.getElementById('service-finder'),enquiryService=document.querySelector('#brief-form select[name="service"]');
if(finder||enquiryService){fetch('assets/service-guidance.json').then(r=>{if(!r.ok)throw new Error('Unavailable');return r.json();}).then(data=>{function showGuide(select,id,isFinder){const target=document.getElementById(id),item=data[select.value];if(!target)return;target.replaceChildren();target.hidden=!item;if(!item)return;const h=document.createElement('h3');h.textContent=isFinder?item.name:'What to tell us about this request';target.append(h);const p=document.createElement('p');p.textContent=isFinder?item.description:item.need;target.append(p);if(isFinder){const price=document.createElement('p');price.textContent='Starting point: '+item.entry+'. External costs are separate.';target.append(price);const a=document.createElement('a');a.className='btn';a.href=select.value+'.html';a.textContent='Compare these packages ↗';target.append(a);}}if(finder){finder.addEventListener('change',()=>showGuide(finder,'finder-result',true));}if(enquiryService){enquiryService.addEventListener('change',()=>showGuide(enquiryService,'service-enquiry-help',false));showGuide(enquiryService,'service-enquiry-help',false);}}).catch(()=>{ /* Standard service links remain available without JS/data. */ });}
