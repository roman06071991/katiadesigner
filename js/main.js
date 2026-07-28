/* ============================================================
   Kateryna Hnida — интерактив
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Текущий год в подвале ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Фоновое видео hero ---------- */
  var heroVideo = document.querySelector('[data-hero-video]');
  if (heroVideo) {
    if (reduceMotion) {
      // Уважаем настройку «уменьшить движение» — оставляем статичный постер
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else {
      // Некоторые браузеры блокируют автозапуск — пробуем стартовать вручную
      var playAttempt = heroVideo.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(function () {});
      }
    }
  }

  /* ---------- Шапка: затемнение при скролле ---------- */
  var header = document.querySelector('[data-header]');
  function onScrollHeader() {
    if (!header) { return; }
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Бургер-меню ---------- */
  var burger = document.querySelector('[data-burger]');
  var nav = document.querySelector('[data-nav]');
  function closeMenu() {
    if (!burger || !nav) { return; }
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Плавный скролл по якорям ---------- */
  document.querySelectorAll('[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id.charAt(0) !== '#') { return; }
      var target = document.querySelector(id);
      if (!target) { return; }
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- Появление секций при скролле ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Параллакс первого экрана ---------- */
  var parallax = document.querySelector('[data-parallax]');
  if (parallax && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          parallax.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Фильтр портфолио ---------- */
  var filterBox = document.querySelector('[data-filters]');
  var cards = document.querySelectorAll('[data-gallery] .card');
  if (filterBox) {
    filterBox.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) { return; }
      filterBox.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  /* ---------- Валидация формы ---------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var success = form.querySelector('[data-success]');
    var required = form.querySelectorAll('[required]');

    function validateField(field) {
      var wrap = field.closest('.field');
      var errEl = wrap ? wrap.querySelector('[data-error]') : null;
      var valid = field.value.trim().length > 0;
      if (wrap) { wrap.classList.toggle('has-error', !valid); }
      if (errEl) { errEl.textContent = valid ? '' : 'Пожалуйста, заполните это поле'; }
      return valid;
    }

    required.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap && wrap.classList.contains('has-error')) { validateField(field); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      required.forEach(function (field) { if (!validateField(field)) { ok = false; } });
      if (!ok) {
        var firstErr = form.querySelector('.has-error input, .has-error select');
        if (firstErr) { firstErr.focus(); }
        return;
      }
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ---------- Кастомный курсор ---------- */
  if (canHover && !reduceMotion) {
    var ring = document.querySelector('[data-cursor]');
    var dot = document.querySelector('[data-cursor-dot]');
    if (ring && dot) {
      document.body.classList.add('has-cursor');
      var mx = 0, my = 0, rx = 0, ry = 0;
      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      });
      (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
      var hoverSel = 'a, button, .card, .filter, input, select, textarea, [data-scroll]';
      document.querySelectorAll(hoverSel).forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('is-hover'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('is-hover'); });
      });
      document.addEventListener('mouseleave', function () { ring.style.opacity = '0'; dot.style.opacity = '0'; });
      document.addEventListener('mouseenter', function () { ring.style.opacity = '1'; dot.style.opacity = '1'; });
    }
  }

  /* ---------- Глобальная подсветка за курсором (весь сайт) ---------- */
  var pageSpot = document.querySelector('[data-page-spotlight]');
  if (pageSpot && canHover && !reduceMotion) {
    window.addEventListener('mousemove', function (e) {
      pageSpot.style.setProperty('--px', e.clientX + 'px');
      pageSpot.style.setProperty('--py', e.clientY + 'px');
      if (!pageSpot.classList.contains('is-active')) { pageSpot.classList.add('is-active'); }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { pageSpot.classList.remove('is-active'); });
    window.addEventListener('blur', function () { pageSpot.classList.remove('is-active'); });
  }

  /* ---------- Локальная подсветка внутри панелей ---------- */
  document.querySelectorAll('[data-spotlight]').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      el.style.setProperty('--spot-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
      el.style.setProperty('--spot-opacity', '1');
    });
    el.addEventListener('mouseleave', function () {
      el.style.setProperty('--spot-opacity', '0');
    });
  });

  /* ---------- Прайсинг: переключатель периода + анимация цены ---------- */
  var pricingSwitch = document.querySelector('[data-billing-switch]');
  var priceCards = document.querySelectorAll('.price-card');
  if (pricingSwitch && priceCards.length) {
    var isAnnual = false;

    function formatPrice(v) { return '$' + Math.round(v).toLocaleString('en-US'); }

    function animateAmount(el, from, to) {
      if (reduceMotion) { el.textContent = formatPrice(to); return; }
      var start = null, dur = 500;
      function step(ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = formatPrice(from + (to - from) * eased);
        if (p < 1) { requestAnimationFrame(step); }
      }
      requestAnimationFrame(step);
    }

    function updatePrices() {
      priceCards.forEach(function (card) {
        var amountEl = card.querySelector('[data-amount]');
        var billingEl = card.querySelector('[data-billing]');
        if (!amountEl) { return; }
        var once = Number(card.getAttribute('data-price'));
        var annual = Number(card.getAttribute('data-price-annual'));
        var from = Number(String(amountEl.textContent).replace(/[^0-9.]/g, '')) || once;
        animateAmount(amountEl, from, isAnnual ? annual : once);
        if (billingEl) {
          billingEl.textContent = isAnnual
            ? 'цена за проект при годовом сотрудничестве'
            : 'разовая оплата';
        }
      });
    }

    function toggleBilling() {
      isAnnual = !isAnnual;
      pricingSwitch.setAttribute('aria-checked', String(isAnnual));
      updatePrices();
      if (isAnnual) { fireConfetti(pricingSwitch); }
    }

    pricingSwitch.addEventListener('click', toggleBilling);
    pricingSwitch.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleBilling(); }
    });
  }

  /* ---------- Минималистичное конфетти (без зависимостей) ---------- */
  function fireConfetti(originEl) {
    if (reduceMotion) { return; }
    var rect = originEl.getBoundingClientRect();
    var ox = rect.left + rect.width / 2;
    var oy = rect.top + rect.height / 2;

    var canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var colors = ['#c0a175', '#d8bc94', '#e9e3d9', '#8a857c'];
    var particles = [];
    for (var i = 0; i < 60; i++) {
      var angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5);
      var speed = 4 + Math.random() * 6;
      particles.push({
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        r: 2 + Math.random() * 3,
        color: colors[i % colors.length],
        life: 1
      });
    }

    function removeCanvas() { if (canvas.parentNode) { canvas.parentNode.removeChild(canvas); } }
    // Страховка: убрать слой даже если rAF приостановлен (вкладка неактивна).
    var safety = setTimeout(removeCanvas, 3000);

    var gravity = 0.18, decay = 0.015;
    (function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      var alive = false;
      particles.forEach(function (p) {
        if (p.life <= 0) { return; }
        alive = true;
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= decay;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (alive) { requestAnimationFrame(draw); }
      else { clearTimeout(safety); removeCanvas(); }
    })();
  }

})();
