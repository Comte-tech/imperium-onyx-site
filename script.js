document.getElementById('year').textContent = new Date().getFullYear();

  // spotlight follows cursor (hero signature element)
  const hero = document.querySelector('.hero');
  const spot = document.getElementById('spotlight');
  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  // mobile menu
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.navlinks a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('.navlinks a[href="#' + id + '"]');
      if (!link) return;
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // reel carousel navigation
  const reelTrack = document.getElementById('reelTrack');
  if (reelTrack) {
    const prevBtn = document.querySelector('.reel-prev');
    const nextBtn = document.querySelector('.reel-next');
    const scrollAmount = () => reelTrack.querySelector('.reel-card').offsetWidth + 20;
    prevBtn.addEventListener('click', () => reelTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => reelTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

    // pause other videos when one plays
    const videos = reelTrack.querySelectorAll('video');
    videos.forEach(v => {
      v.addEventListener('play', () => {
        videos.forEach(other => { if (other !== v) other.pause(); });
      });
    });
  }
