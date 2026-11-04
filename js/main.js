/* ==========================================================================
   Kauã Cavalcanti: renderização e interações (v3)
   Lê o conteúdo público de window.SITE (js/content.js).
   Em ?edit=1, carrega também os rascunhos de js/drafts.js.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SITE;
  if (!S) return;
  document.documentElement.classList.add('js');

  var EDIT = /[?&]edit=1\b/.test(location.search);
  var D = null;
  if (EDIT) document.body.classList.add('edit-mode');

  var STATUS = { concluido: 'Projeto concluído', andamento: 'Em andamento', conceito: 'Estudo conceitual' };

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function get(path, root) { return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, root || S); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function wa(msg) { return 'https://wa.me/' + S.contact.whatsappNumber + '?text=' + encodeURIComponent(msg || S.contact.whatsappMessage); }
  function pending(items) {
    if (!items || !items.length) return '';
    return '<p class="pending-note"><strong>Pendente:</strong> ' + items.map(esc).join(' · ') + '</p>';
  }
  function img(a, eager) {
    return '<img src="' + esc(a.src) + '" alt="' + esc(a.alt || '') + '"' +
      (a.w ? ' width="' + a.w + '" height="' + a.h + '"' : '') +
      (a.position ? ' style="object-position:' + esc(a.position) + '"' : '') +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }

  /* ---------- Fotos via data-asset="grupo.chave" ---------- */
  function initAssets() {
    $$('[data-asset]').forEach(function (el) {
      var a = get(el.getAttribute('data-asset'), S.assets);
      if (!a || !a.src) { el.hidden = true; return; }
      el.classList.add('photo');
      el.innerHTML = img(a, el.hasAttribute('data-eager'));
    });
    trackLoaded(document);
  }
  /* marca .is-loaded quando a imagem termina de carregar (fade-in suave) */
  function trackLoaded(root) {
    $$('.photo img, .frame__shot img', root).forEach(function (im) {
      var box = im.parentNode;
      function done() { box.classList.add('is-loaded'); }
      if (im.complete && im.naturalWidth) done();
      else { im.addEventListener('load', done); im.addEventListener('error', done); }
    });
  }

  /* ---------- Bindings ---------- */
  function initBindings() {
    $$('[data-bind]').forEach(function (el) {
      var v = get(el.getAttribute('data-bind'));
      if (v != null) el.textContent = v;
    });
    $$('[data-bind-html]').forEach(function (el) {
      var v = get(el.getAttribute('data-bind-html'));
      if (v != null) el.innerHTML = v;
    });
    $$('[data-href]').forEach(function (el) {
      var v = get(el.getAttribute('data-href'));
      if (!v) { el.closest('li') ? el.closest('li').remove() : el.remove(); return; }
      el.href = el.hasAttribute('data-mail') ? 'mailto:' + v : v;
    });
    $$('[data-wa]').forEach(function (el) { el.href = wa(); });
    $('#year').textContent = new Date().getFullYear();
  }

  function renderCred() {
    var ul = $('#cred-strip');
    if (!S.credibility || !S.credibility.length) { ul.remove(); return; }
    ul.innerHTML = S.credibility.map(function (c) {
      return '<li><span class="label">' + esc(c.label) + '</span><strong>' + esc(c.value) + '</strong></li>';
    }).join('');
  }

  /* ---------- Projetos ---------- */
  function media(p) {
    if (p.cover && p.cover.src) {
      return '<div class="frame"><div class="frame__bar" aria-hidden="true"><i></i><i></i><i></i>' +
        (p.domain ? '<span>' + esc(p.domain) + '</span>' : '') + '</div>' +
        '<div class="frame__shot">' + img(p.cover) + '</div></div>';
    }
    // Sem imagem confirmada: marcador neutro (nunca uma imagem genérica)
    return '<div class="project__placeholder" aria-hidden="true"><span>' + esc(p.coverWord || p.title.charAt(0)) + '</span><small>Sem foto real ainda</small></div>';
  }
  function badge(p) { return STATUS[p.status] ? '<span class="badge badge--' + p.status + '">' + STATUS[p.status] + '</span>' : ''; }

  function renderProjects() {
    var grid = $('#projects-grid');
    var list = S.projects.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    if (!list.length) { grid.innerHTML = '<p class="section__lead">Novos projetos serão publicados em breve.</p>'; return; }
    grid.innerHTML = list.map(function (p) {
      return '<article class="project reveal' + (p.featured ? ' project--featured' : '') + (p.draft ? ' project--draft' : '') + '">' +
        '<div class="project__media">' + media(p) + '</div>' +
        '<div class="project__body">' +
          '<div class="project__top"><span class="project__cat">' + esc(p.category) + '</span>' + badge(p) + '</div>' +
          '<h3 class="project__title">' + esc(p.title) + '<small>' + esc(p.subtitle) + '</small></h3>' +
          '<p class="project__summary">' + esc(p.summary) + '</p>' +
          pending(p.pending) +
          '<div class="project__foot"><span class="project__tech">' + esc((p.tech || []).slice(0, 4).join(' · ')) + '</span>' +
          '<button type="button" class="project__open" data-project="' + esc(p.id) + '" aria-haspopup="dialog">Ver detalhes<span class="sr-only"> de ' + esc(p.title) + '</span> <span class="project__arrow" aria-hidden="true">→</span></button></div>' +
        '</div></article>';
    }).join('');
    trackLoaded(grid);
    initProjectsCarousel(grid);
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-project]');
      if (b) { openProject(b.getAttribute('data-project'), b); return; }
      var card = e.target.closest('.project');
      if (card && !e.target.closest('a')) { var inner = $('[data-project]', card); if (inner) openProject(inner.getAttribute('data-project'), inner); }
    });
  }

  /* Carrossel: basta acrescentar um projeto em js/content.js */
  function initProjectsCarousel(grid) {
    grid.setAttribute('tabindex', '0');
    grid.setAttribute('role', 'region');
    grid.setAttribute('aria-label', 'Carrossel de projetos');
    var nav = document.createElement('div');
    nav.className = 'projects__nav';
    nav.innerHTML = '<button type="button" class="projects__btn" data-dir="-1" aria-label="Projeto anterior">←</button>' +
      '<span class="projects__count" aria-live="polite"></span>' +
      '<button type="button" class="projects__btn" data-dir="1" aria-label="Próximo projeto">→</button>';
    grid.parentNode.insertBefore(nav, grid.nextSibling);
    var cards = grid.querySelectorAll('.project'), prev = nav.querySelector('[data-dir="-1"]'), next = nav.querySelector('[data-dir="1"]'), count = nav.querySelector('.projects__count');
    function current() {
      var i = 0, best = Infinity;
      cards.forEach(function (c, n) { var d = Math.abs(c.offsetLeft - grid.offsetLeft - grid.scrollLeft); if (d < best) { best = d; i = n; } });
      return i;
    }
    function update() {
      var end = grid.scrollWidth - grid.clientWidth, i = current();
      nav.hidden = end <= 2;
      prev.disabled = grid.scrollLeft <= 2;
      next.disabled = grid.scrollLeft >= end - 2;
      count.textContent = (next.disabled ? cards.length : i + 1) + ' de ' + cards.length;
    }
    nav.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dir]');
      if (!b) return;
      var t = cards[Math.max(0, Math.min(cards.length - 1, current() + Number(b.getAttribute('data-dir'))))];
      var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      grid.scrollTo({ left: t.offsetLeft - grid.offsetLeft, behavior: calm ? 'auto' : 'smooth' });
    });
    grid.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Modal ---------- */
  var modal = $('#project-modal'), lastFocus = null;
  function openProject(id, trigger) {
    var p = S.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    lastFocus = trigger;
    var blocks = [['Necessidade', p.problem], ['Solução desenvolvida', p.solution], ['Tecnologias', (p.tech || []).join(' · ')], ['Resultado', p.result]]
      .filter(function (b) { return b[1]; });
    var links = (p.links || []).map(function (l) {
      return '<a class="btn btn--line" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>';
    }).join('');
    $('#modal-content').innerHTML =
      '<header class="m-head"><span class="eyebrow">' + esc(p.category) + '</span>' +
      '<h2 class="m-title" id="modal-title">' + esc(p.title) + '</h2>' +
      '<p class="m-sub">' + esc(p.subtitle) + '</p>' + badge(p) + '</header>' +
      (p.cover ? '<div class="m-media">' + media(p) + '</div>' : '') +
      pending(p.pending) +
      '<div class="m-grid">' + blocks.map(function (b, i) {
        return '<div class="m-block' + (i < 2 ? ' m-block--wide' : '') + '"><h3>' + b[0] + '</h3><p>' + esc(b[1]) + '</p></div>';
      }).join('') + '</div>' +
      (links ? '<div class="m-links">' + links + '</div>' : '') +
      '<div class="m-cta"><p>Precisa de algo parecido para o seu negócio?</p>' +
      '<a class="btn btn--primary" href="' + wa('Olá, Kauã! Vi o projeto ' + p.title + ' no seu portfólio e gostaria de conversar sobre algo parecido.') + '" target="_blank" rel="noopener">Conversar sobre um projeto assim ↗</a></div>';
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    trackLoaded(modal);
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    $('.modal__close', modal).focus();
  }
  function closeModal() { if (modal.close) modal.close(); else modal.removeAttribute('open'); }
  modal.addEventListener('close', function () { document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); });
  $('.modal__close', modal).addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  /* ---------- Soluções + processo ---------- */
  function renderServices() {
    $('#services-list').innerHTML = S.services.map(function (s, i) {
      return '<article class="service reveal">' +
        '<div class="service__head"><span class="service__num">0' + (i + 1) + '</span><h3 class="service__title">' + esc(s.title) + '</h3></div>' +
        '<p class="service__text">' + esc(s.text) + '</p>' +
        (s.fit && s.fit.length ? '<ul class="service__fit" aria-label="Indicado para">' + s.fit.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') +
        '<a class="service__cta" href="' + wa(s.message) + '" target="_blank" rel="noopener">' + esc(s.cta) + ' <span aria-hidden="true">↗</span></a>' +
        '</article>';
    }).join('');
    $('#process-steps').innerHTML = S.process.map(function (p) {
      return '<li><strong>' + esc(p.title) + '</strong><span>' + esc(p.text) + '</span></li>';
    }).join('');
  }

  /* ---------- Sobre ---------- */
  function renderAbout() {
    var a = S.about;
    $('#about-text').innerHTML = a.paragraphs.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      (D ? pending(D.pending.about) : '');
    var list = a.metrics.concat(D ? D.metrics : []);
    if (list.length) {
      $('#metrics-wrap').hidden = false;
      $('#about-metrics').innerHTML = list.map(function (m) {
        var v = esc(m.value).replace(/\+$/, '<sup>+</sup>');
        return '<div class="metric reveal"><dt>' + v + '</dt><dd><strong>' + esc(m.label) + '</strong><span>' + esc(m.caption) + '</span></dd></div>';
      }).join('');
      if (D) $('#metrics-wrap').insertAdjacentHTML('beforeend', pending(['Nenhum destes indicadores aparece para o público até ser validado']));
    }
    $('#about-toolkit').innerHTML = a.toolkit.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
  }

  /* ---------- NFC ---------- */
  function renderNfc() {
    var n = S.nfc, sec = $('#nfc');
    if (!n || !n.enabled) { sec.remove(); $$('a[href="#nfc"]').forEach(function (a) { a.remove(); }); return; }
    $('#nfc-steps').innerHTML = n.steps.map(function (s) { return '<li><strong>' + esc(s.title) + '</strong><span>' + esc(s.text) + '</span></li>'; }).join('');
    $('#nfc-cta').href = wa(n.message);
    $('#nfc-pending').innerHTML = D ? pending(D.pending.nfc) : '';
    var pr = S.assets.products, photos = [pr.nfcProduct, pr.nfcInPlace, pr.nfcTap].filter(function (p) { return p && p.src; });
    var stage = $('#nfc-stage');
    if (photos.length) {
      stage.innerHTML = '<div class="nfc__photos">' + photos.map(function (p) { return '<div class="photo">' + img(p) + '</div>'; }).join('') + '</div>';
      trackLoaded(stage);
    } else {
      // Diagrama esquemático do funcionamento — não representa o produto real
      stage.innerHTML = '<div class="nfc-diagram reveal" role="img" aria-label="Diagrama esquemático: celular aproximando-se de uma placa NFC para abrir um link">' +
        '<div class="nfc-diagram__tag">Placa<br>NFC</div>' +
        '<div class="nfc-diagram__waves" aria-hidden="true"><i></i><i></i><i></i></div>' +
        '<div class="nfc-diagram__phone"><span>Abre o link configurado</span></div>' +
        '<p class="nfc-diagram__label">Esquema ilustrativo do funcionamento</p></div>';
    }
  }

  /* ---------- Navegação ---------- */
  function initNav() {
    var nav = $('.nav'), fab = $('.fab'), toggle = $('.nav__toggle'), menu = $('#menu');
    function onScroll() {
      var y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 20);
      var contact = $('#contato').getBoundingClientRect().top;
      fab.classList.toggle('is-visible', y > window.innerHeight * .7 && contact > window.innerHeight * .8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
    if ('IntersectionObserver' in window) {
      var links = $$('.nav__links a');
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['projetos', 'solucoes', 'nfc', 'sobre', 'contato'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initEditBar() {
    if (!EDIT) return;
    var n = $$('.pending-note').reduce(function (t, el) { return t + el.textContent.split(' · ').length; }, 0);
    var bar = document.createElement('div');
    bar.className = 'edit-bar';
    bar.textContent = D ? 'Modo edição · ' + n + ' pendências · rascunhos não vão para o ar (js/drafts.js)' : 'Modo edição · js/drafts.js não encontrado';
    document.body.appendChild(bar);
  }

  /* ---------- init ---------- */
  function start() {
    if (window.SITE_DRAFTS) {
      D = window.SITE_DRAFTS;
      S.projects = S.projects.concat(D.projects.map(function (p) { p.draft = true; return p; }));
    }
    initBindings();
    initAssets();
    renderCred();
    renderProjects();
    renderServices();
    renderAbout();
    renderNfc();
    initNav();
    initReveal();
    initEditBar();
    requestAnimationFrame(function () { $('.hero').classList.add('is-ready'); });
  }
  if (EDIT) {
    var s = document.createElement('script');
    s.src = 'js/drafts.js';
    s.onload = start;
    s.onerror = start;
    document.head.appendChild(s);
  } else {
    start();
  }
})();
