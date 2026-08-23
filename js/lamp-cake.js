/* ================================================================
   The lamp-and-cake surprise:
   1. She taps/clicks the pink knob to "pull" the lamp string.
   2. The bulb glows, and the cake bounces into view.
   3. She swipes across the cake to "cut" it — it splits open,
      sparkles burst out, and a bouncy birthday message pops in.
   ================================================================ */
(function initLampCake(){
  const pull       = document.getElementById('lamp-pull');
  const bulb       = document.getElementById('lamp-bulb');
  const lampHint   = document.getElementById('lamp-hint');
  const cakeStage  = document.getElementById('cake-stage');
  const cakeSvg    = document.getElementById('cake-svg');
  const cakeLeft   = document.getElementById('cake-left');
  const cakeRight  = document.getElementById('cake-right');
  const cakeHeart  = document.getElementById('cake-heart');
  const cakeHint   = document.getElementById('cake-hint');
  const message    = document.getElementById('bday-message');
  if (!pull) return; // this page isn't loaded

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pulled = false;
  let cut = false;

  /* ---------- Step 1: pull the string ---------- */
  function pullLamp(){
    if (pulled) return;
    pulled = true;
    pull.classList.add('pulled');
    setTimeout(() => {
      bulb.classList.add('lit');
      lampHint.style.opacity = '0';
      cakeStage.classList.add('visible');
    }, 250);
  }

  pull.addEventListener('click', pullLamp);
  pull.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pullLamp(); }
  });

  /* ---------- Step 2: swipe the cake to cut it ---------- */
  let startX = null;

  function onStart(e){
    if (cut) return;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }
  function onEnd(e){
    if (cut || startX === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - startX;
    startX = null;
    if (Math.abs(delta) > 45) cutCake();
  }

  cakeSvg.addEventListener('pointerdown', onStart);
  cakeSvg.addEventListener('pointerup', onEnd);
  cakeSvg.addEventListener('touchstart', onStart, { passive: true });
  cakeSvg.addEventListener('touchend', onEnd);
  // Fallback: a plain click/tap also cuts it, in case swipe detection
  // doesn't register on a particular device.
  cakeSvg.addEventListener('click', () => { if (!cut) cutCake(); });

  function cutCake(){
    if (cut) return;
    cut = true;
    cakeLeft.classList.add('cut');
    cakeRight.classList.add('cut');
    cakeHeart.style.opacity = '1';
    cakeHint.style.opacity = '0';

    const rect = cakeSvg.getBoundingClientRect();
    sparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    setTimeout(() => message.classList.add('show'), 400);
  }

  /* ---------- Step 3: sparkle burst ---------- */
  function sparkleBurst(cx, cy){
    if (reducedMotion) return;
    const symbols = ['✨', '💖', '🎉', '⭐', '🌸'];
    for (let i = 0; i < 26; i++) {
      setTimeout(() => {
        const s = document.createElement('div');
        s.textContent = symbols[i % symbols.length];
        s.style.position = 'fixed';
        s.style.left = cx + 'px';
        s.style.top = cy + 'px';
        s.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
        s.style.zIndex = 65;
        s.style.pointerEvents = 'none';
        s.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';
        document.body.appendChild(s);
        requestAnimationFrame(() => {
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 120;
          s.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 40}px) scale(1.3)`;
          s.style.opacity = '0';
        });
        setTimeout(() => s.remove(), 1500);
      }, i * 40);
    }
  }
})();
