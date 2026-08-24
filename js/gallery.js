/* ================================================================
   Renders the memory grid from content.json, and wires up a tap
   to open each photo big in a polaroid-style popup. To add/remove
   /reorder photos, edit the "memories" array in data/content.json.
   ================================================================ */
(async function initGallery(){
  const data = await window.SiteData;
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  grid.innerHTML = data.memories.map((m, i) => `
    <figure class="memory-tile" tabindex="0" data-index="${i}">
      <div class="memory-photo">
        <img src="${m.src}" alt="${m.alt}" loading="lazy" />
      </div>
      <figcaption class="memory-caption">${m.caption}</figcaption>
    </figure>
  `).join('');

  // ---------- Polaroid lightbox ----------
  const lightbox   = document.getElementById('memory-lightbox');
  const lightImg    = document.getElementById('lightbox-img');
  const lightCaption  = document.getElementById('lightbox-caption');
  const closeBtn         = document.getElementById('lightbox-close');

  function openLightbox(memory){
    lightImg.src = memory.src;
    lightImg.alt = memory.alt;
    lightCaption.textContent = memory.caption;
    lightbox.classList.add('open');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
  }

  grid.querySelectorAll('.memory-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const idx = Number(tile.dataset.index);
      openLightbox(data.memories[idx]);
    });
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = Number(tile.dataset.index);
        openLightbox(data.memories[idx]);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
})();
