/* ================================================================
   Ambient sky layer: twinkling stars scattered across the page,
   plus a few soft clouds drifting slowly across the hero. Purely
   decorative — respects prefers-reduced-motion.
   ================================================================ */
(function initSky(){
  const layer = document.getElementById('particle-layer');
  if (!layer) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Twinkling stars, scattered across the whole page height
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 2 + Math.random() * 3;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.animationDelay = (Math.random() * 4) + 's';
    layer.appendChild(star);
  }

  // Drifting cloud puffs across the top of the viewport
  const cloudEmojis = ['☁️'];
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud-puff';
    cloud.textContent = cloudEmojis[0];
    cloud.style.top = (5 + Math.random() * 30) + 'vh';
    cloud.style.fontSize = (1.6 + Math.random() * 2) + 'rem';
    cloud.style.animationDuration = (40 + Math.random() * 30) + 's';
    cloud.style.animationDelay = (-Math.random() * 40) + 's';
    layer.appendChild(cloud);
  }
})();
