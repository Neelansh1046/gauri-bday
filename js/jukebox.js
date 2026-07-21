/* ================================================================
   Simulated play/pause + progress bar. If you paste a Spotify
   playlist URL into content.json's jukebox.spotifyEmbedUrl, it
   renders a real embedded player below the simulated one.
   ================================================================ */
(async function initJukebox(){
  const data = await window.SiteData;
  const jb = data.jukebox;

  document.getElementById('jukebox-title').textContent = jb.trackTitle;
  document.getElementById('jukebox-subtitle').textContent = jb.trackSubtitle;

  // Optional real Spotify embed
  if (jb.spotifyEmbedUrl) {
    const slot = document.getElementById('spotify-slot');
    slot.innerHTML = `<iframe style="border-radius:16px" src="${jb.spotifyEmbedUrl}"
      width="100%" height="352" frameborder="0" allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"></iframe>`;
  }

  const playBtn = document.getElementById('play-btn');
  const progressFill = document.getElementById('progress-fill');
  const progressCurrent = document.getElementById('progress-current');
  const progressTotal = document.getElementById('progress-total');
  const TOTAL_SECONDS = jb.durationSeconds || 210;

  function formatTime(s){
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m + ':' + String(sec).padStart(2, '0');
  }
  progressTotal.textContent = formatTime(TOTAL_SECONDS);

  let elapsed = 0, playing = false, timer = null;

  playBtn.addEventListener('click', () => {
    playing = !playing;
    playBtn.textContent = playing ? '❚❚' : '▶';
    if (playing) {
      timer = setInterval(() => {
        elapsed++;
        if (elapsed >= TOTAL_SECONDS) {
          elapsed = 0;
          playing = false;
          playBtn.textContent = '▶';
          clearInterval(timer);
        }
        progressFill.style.width = (elapsed / TOTAL_SECONDS * 100) + '%';
        progressCurrent.textContent = formatTime(elapsed);
      }, 1000);
    } else {
      clearInterval(timer);
    }
  });
})();
