const navLinks=[...document.querySelectorAll('.nav nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const ob=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}
}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>ob.observe(section));
const menu=document.querySelector('.hamb');
const nav=document.querySelector('.nav nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('mobile');
  menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('mobile');
  menu.setAttribute('aria-expanded','false');
}));

// From Data to Decisions: horizontal navigation + mouse/touch drag.
(() => {
  const viewport = document.getElementById('data-flow');
  const prev = document.querySelector('.flow-prev');
  const next = document.querySelector('.flow-next');
  if (!viewport || !prev || !next) return;

  const step = () => Math.max(180, Math.floor(viewport.clientWidth * 0.72));
  const updateButtons = () => {
    const max = viewport.scrollWidth - viewport.clientWidth - 2;
    prev.disabled = viewport.scrollLeft <= 2;
    next.disabled = viewport.scrollLeft >= max;
  };

  prev.addEventListener('click', () => viewport.scrollBy({left: -step(), behavior: 'smooth'}));
  next.addEventListener('click', () => viewport.scrollBy({left: step(), behavior: 'smooth'}));
  viewport.addEventListener('scroll', updateButtons, {passive:true});
  window.addEventListener('resize', updateButtons);

  let down = false, startX = 0, startScroll = 0;
  viewport.addEventListener('pointerdown', (e) => {
    down = true;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
    viewport.classList.add('dragging');
    viewport.setPointerCapture?.(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!down) return;
    viewport.scrollLeft = startScroll - (e.clientX - startX);
  });
  const release = () => { down = false; viewport.classList.remove('dragging'); updateButtons(); };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  viewport.addEventListener('mouseleave', () => { if (down) release(); });

  updateButtons();
})();
