/* ================================================================
   Renders the memory grid from content.json. To add/remove/reorder
   photos, edit the "memories" array in data/content.json — no need
   to touch this file or the HTML.
   ================================================================ */
(async function initGallery(){
  const data = await window.SiteData;
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  grid.innerHTML = data.memories.map(m => `
    <figure class="memory-tile" tabindex="0">
      <img src="${m.src}" alt="${m.alt}" loading="lazy" />
      <figcaption class="memory-caption">${m.caption}</figcaption>
    </figure>
  `).join('');
})();
