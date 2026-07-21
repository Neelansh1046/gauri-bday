/* ================================================================
   The final gift reveal modal — content comes from content.json's
   finalSurprise object.
   ================================================================ */
(async function initModal(){
  const data = await window.SiteData;
  const fs = data.finalSurprise;

  document.getElementById('jewelry-btn').textContent = fs.buttonText;
  document.getElementById('jewelry-message').textContent = fs.message;

  if (fs.jewelryImage) {
    document.getElementById('jewelry-box').innerHTML =
      `<img src="${fs.jewelryImage}" alt="Your gift" />`;
  }

  const btn = document.getElementById('jewelry-btn');
  const modal = document.getElementById('jewelry-modal');
  const closeBtn = document.getElementById('modal-close');

  btn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
})();
