/* ================================================================
   Runs on every page. Checks today's date against the birthday in
   content.json and adds/removes the "locked" class on <body>,
   which is what actually blurs .reveal-content (see css/style.css).
   The countdown + unlock celebration live separately in
   countdown.js (index.html only).
   ================================================================ */
(async function initLock(){
  const data = await window.SiteData;
  const { month, day } = data.birthday;
  const target = new Date(new Date().getFullYear(), month, day, 0, 0, 0);
  const now = new Date();

  if (now >= target) {
    document.body.classList.remove('locked');
  } else {
    document.body.classList.add('locked');
  }
})();
