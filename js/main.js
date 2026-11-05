(function () {
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('[data-burger]');
  var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__mobile a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var RATE = 655.957;
  var conv = document.querySelector('[data-converter]');
  if (conv) {
    var xof = conv.querySelector('[data-xof]');
    var eur = conv.querySelector('[data-eur]');
    var fmtXof = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
    var fmtEur = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var update = function () {
      var raw = parseFloat(xof.value.replace(/[^\d.,]/g, '').replace(/\s/g, '').replace(',', '.')) || 0;
      eur.textContent = fmtEur.format(raw / RATE);
    };
    xof.addEventListener('input', update);
    xof.addEventListener('blur', function () {
      var raw = parseFloat(xof.value.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      xof.value = fmtXof.format(raw);
      update();
    });
    update();
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !/\bstatic\b/.test(location.search)) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.style.transition = 'none'; el.classList.add('in'); });
  }
})();
