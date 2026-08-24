document.addEventListener('DOMContentLoaded', async () => {
  const titleEl = document.getElementById('jukebox-title');
  const subtitleEl = document.getElementById('jukebox-subtitle');
  const playBtn = document.getElementById('play-btn');
  const progressFill = document.getElementById('progress-fill');
  const currentEl = document.getElementById('progress-current');
  const totalEl = document.getElementById('progress-total');
  const spotifySlot = document.getElementById('spotify-slot');

  let audio = null;
  let isPlaying = false;

  // Load jukebox config from content.json or fallback window.SITE_DATA
  let jukeboxData = {};
  try {
    const res = await fetch('data/content.json');
    if (res.ok) {
      const json = await fetchJson('data/content.json');
      jukeboxData = json.jukebox || {};
    }
  } catch (e) {
    if (window.SITE_DATA && window.SITE_DATA.jukebox) {
      jukeboxData = window.SITE_DATA.jukebox;
    }
  }

  // Set titles
  if (titleEl && jukeboxData.trackTitle) {
    titleEl.textContent = jukeboxData.trackTitle;
  }
  if (subtitleEl && jukeboxData.trackSubtitle) {
    subtitleEl.textContent = jukeboxData.trackSubtitle;
  }

  // Spotify embed fallback if configured
  if (jukeboxData.spotifyEmbedUrl && spotifySlot) {
    spotifySlot.innerHTML = `<iframe src="${jukeboxData.spotifyEmbedUrl}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  }

  // Format seconds to mm:ss
  function formatTime(secs) {
    const m = Math.floor(secs / 60) || 0;
    const s = Math.floor(secs % 60) || 0;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Set up real audio if audioUrl exists
  const audioPath = jukeboxData.audioUrl || 'song.mp3';
  audio = new Audio(audioPath);

  // Update total duration once loaded or from JSON config
  audio.addEventListener('loadedmetadata', () => {
    if (totalEl) totalEl.textContent = formatTime(audio.duration);
  });
  if (jukeboxData.durationSeconds && totalEl) {
    totalEl.textContent = formatTime(jukeboxData.durationSeconds);
  }

  // Time update progress bar
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
  });

  // Reset when song ends
  audio.addEventListener('ended', () => {
    isPlaying = false;
    if (playBtn) playBtn.textContent = '▶';
    if (progressFill) progressFill.style.width = '0%';
    if (currentEl) currentEl.textContent = '0:00';
  });

  // Play/Pause button click
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
      } else {
        audio.play().then(() => {
          isPlaying = true;
          playBtn.textContent = '❚❚';
        }).catch(err => {
          console.error("Audio playback error:", err);
          alert("Click again to play audio, or check if silent mode is turned off.");
        });
      }
    });
  }
});
