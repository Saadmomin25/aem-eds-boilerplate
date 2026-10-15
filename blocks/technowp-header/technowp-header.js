(function(){
  const btn = document.getElementById('technowp-hamburger');
  const mobile = document.getElementById('mobile-nav');
  if (!btn || !mobile) return;
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      mobile.hidden = true;
    } else {
      mobile.hidden = false;
    }
  });
})();
