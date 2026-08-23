/* ================================================================
   PIN keypad gate: she taps digits on the keypad. Once 4 digits
   are entered, it checks against the code set in content.json.
   Correct -> shows a love-note screen, then (on tapping Continue)
   reveals the rest of the page.
   ================================================================ */
(async function initPasswordGate(){
  const gate = document.getElementById('password-gate');
  if (!gate) return; // not on this page

  const data = await window.SiteData;
  const cfg = data.passwordGate || {};
  const correctPin = String(cfg.password || '1234').trim();

  const success        = document.getElementById('password-success');
  const mainContent      = document.getElementById('main-content');
  const pinDisplay          = document.getElementById('pin-display');
  const dots                  = pinDisplay.querySelectorAll('.pin-dot');
  const keys                     = document.querySelectorAll('.pin-key');
  const error                       = document.getElementById('password-error');
  const hint                          = document.getElementById('password-hint');
  const successTitle                     = document.getElementById('success-title');
  const successSubtitle                     = document.getElementById('success-subtitle');
  const continueBtn                            = document.getElementById('continue-btn');

  if (cfg.hint) hint.textContent = cfg.hint;
  if (cfg.successTitle) successTitle.textContent = cfg.successTitle;
  if (cfg.successSubtitle) successSubtitle.textContent = cfg.successSubtitle;

  let entered = '';

  function renderDots(){
    dots.forEach((dot, i) => {
      dot.classList.toggle('filled', i < entered.length);
    });
  }

  function wrongPin(){
    pinDisplay.classList.add('shake');
    error.classList.add('show');
    setTimeout(() => {
      pinDisplay.classList.remove('shake');
      error.classList.remove('show');
      entered = '';
      renderDots();
    }, 550);
  }

  function checkPin(){
    if (entered === correctPin) {
      gate.style.display = 'none';
      success.classList.add('show');
    } else {
      wrongPin();
    }
  }

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const val = key.dataset.key;
      if (val === 'clear') {
        entered = '';
        renderDots();
        return;
      }
      if (val === 'back') {
        entered = entered.slice(0, -1);
        renderDots();
        return;
      }
      if (entered.length >= 4) return;
      entered += val;
      renderDots();
      if (entered.length === 4) {
        setTimeout(checkPin, 150);
      }
    });
  });

  continueBtn.addEventListener('click', () => {
    success.classList.remove('show');
    success.style.display = 'none';
    mainContent.classList.add('show');
  });
})();
