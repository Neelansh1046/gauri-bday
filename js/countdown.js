/* ================================================================
   Live countdown to the birthday, shown on index.html. The moment
   it hits zero, unlocks the whole site + fires pastel confetti and
   a burst of stars/hearts.
   ================================================================ */
(async function initCountdown(){
  const data = await window.SiteData;
  const { month, day } = data.birthday;
  const target = new Date(new Date().getFullYear(), month, day, 0, 0, 0);
  let celebrated = (new Date() >= target); // don't re-celebrate on every reload after unlock

  function setDigits(d, h, m, s){
    document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
  }

  function tick(){
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      setDigits(0, 0, 0, 0);
      document.body.classList.remove('locked');
      if (!celebrated) {
        celebrated = true;
        launchConfetti();
        launchStarBurst();
      }
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);
    setDigits(days, hours, mins, secs);
  }

  tick();
  setInterval(tick, 1000);
})();

function launchConfetti(){
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Pastel sky palette: peach, blush, lavender, sky blue, sunshine gold
  const colors = ['#FFCBA4', '#FFD6E0', '#C9B6E4', '#AFD8E8', '#FFD873'];
  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: -1.5 + Math.random() * 3,
    rotation: Math.random() * 360,
    spin: -6 + Math.random() * 12
  }));

  let frame = 0;
  const maxFrames = 260;

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

function launchStarBurst(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  const symbols = ['⭐', '💫', '❤️', '✨'];
  for (let i = 0; i < 26; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.textContent = symbols[i % symbols.length];
      h.style.position = 'fixed';
      h.style.left = (40 + Math.random() * 20) + 'vw';
      h.style.top = '60vh';
      h.style.fontSize = (1.2 + Math.random() * 1.4) + 'rem';
      h.style.zIndex = 65;
      h.style.pointerEvents = 'none';
      h.style.transition = 'transform 1.8s ease-out, opacity 1.8s ease-out';
      document.body.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transform = `translate(${-100 + Math.random() * 200}px, -${300 + Math.random() * 260}px) scale(1.3)`;
        h.style.opacity = '0';
      });
      setTimeout(() => h.remove(), 2000);
    }, i * 60);
  }
}
