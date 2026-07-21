/* ================================================================
   Picks a random sweet thought from content.json each time the
   button is clicked, never repeating the same one twice in a row.
   ================================================================ */
(async function initThoughts(){
  const data = await window.SiteData;
  const thoughts = data.sweetThoughts;

  const btn = document.getElementById('thought-btn');
  const textEl = document.getElementById('thought-text');
  let lastIndex = -1;

  btn.addEventListener('click', () => {
    let idx;
    do { idx = Math.floor(Math.random() * thoughts.length); }
    while (idx === lastIndex && thoughts.length > 1);
    lastIndex = idx;

    textEl.classList.remove('show');
    setTimeout(() => {
      textEl.textContent = thoughts[idx];
      textEl.classList.add('show');
    }, 250);
  });
})();
