(async function initGallery(){
  const data = await window.SiteData;
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  grid.innerHTML = data.memories.map(m => `
    <figure class="memory-tile" tabindex="0">
      <div class="memory-photo">
        <img src="${m.src}" alt="${m.alt}" loading="lazy" />
      </div>
      <figcaption class="memory-caption">${m.caption}</figcaption>
    </figure>
  `).join('');
})();
