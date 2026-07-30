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

  /* ---------- Фоновое видео на весь сайт ---------- */
  var heroVideo = document.querySelector('[data-bg-video]');
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

  /* ---------- Лайтбокс галереи проекта ---------- */
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var lbTitle = lb.querySelector('[data-lb-title]');
    var lbCounter = lb.querySelector('[data-lb-counter]');
    var lbViewport = lb.querySelector('[data-lb-viewport]');
    var lbTrack = lb.querySelector('[data-lb-track]');
    var slidePrev = lb.querySelector('[data-lb-slide="prev"]');
    var slideCur = lb.querySelector('[data-lb-slide="cur"]');
    var slideNext = lb.querySelector('[data-lb-slide="next"]');
    var lbImages = [];
    var lbIndex = 0;
    var lastFocused = null;
    var lbAnimating = false;

    function mod(i) { var n = lbImages.length; return (i % n + n) % n; }
    function setTrack(px, animate) {
      lbTrack.classList.toggle('is-animating', !!animate);
      lbTrack.style.transform = 'translate3d(' + px + 'px,0,0)';
    }
    // Текущий кадр — по центру (дорожка сдвинута на одну ширину влево),
    // слева и справа стоят соседние фото, готовые к перелистыванию.
    function lbRender() {
      if (!lbImages.length) { return; }
      var t = lb.getAttribute('data-current-title') || 'Проект';
      slideCur.src = lbImages[lbIndex];
      slideCur.alt = t + ' — фото ' + (lbIndex + 1);
      slidePrev.src = lbImages[mod(lbIndex - 1)];
      slideNext.src = lbImages[mod(lbIndex + 1)];
      lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
      setTrack(-lbViewport.clientWidth, false);
    }
    // Долистывание с анимацией: dir=1 вперёд, dir=-1 назад
    function lbGo(dir) {
      if (lbAnimating || lbImages.length < 2) { return; }
      var vw = lbViewport.clientWidth;
      lbAnimating = true;
      setTrack(dir > 0 ? -2 * vw : 0, true);
      window.setTimeout(function () {
        lbIndex = mod(lbIndex + dir);
        lbRender();
        lbAnimating = false;
      }, 330);
    }
    function lbOpen(images, title, startIndex) {
      lbImages = images;
      lbIndex = startIndex || 0;
      lb.setAttribute('data-current-title', title || '');
      lbTitle.textContent = title || '';
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      lbRender();   // после показа — чтобы ширина вьюпорта была известна
      var closeBtn = lb.querySelector('[data-lb-close]');
      if (closeBtn) { closeBtn.focus(); }
    }
    function lbClose() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      // Если открыта сетка миниатюр — возвращаемся к ней, иначе полностью закрываем
      if (gm && gm.classList.contains('is-open')) {
        var gmc = gm.querySelector('[data-gm-close]');
        if (gmc) { gmc.focus(); }
      } else {
        document.body.classList.remove('lightbox-open');
        if (lastFocused && typeof lastFocused.focus === 'function') { lastFocused.focus(); }
      }
    }

    /* ---------- Сетка миниатюр проекта ---------- */
    var gm = document.querySelector('[data-gallery-modal]');
    var gmGrid = gm ? gm.querySelector('[data-gm-grid]') : null;
    var gmTitle = gm ? gm.querySelector('[data-gm-title]') : null;
    var gmCount = gm ? gm.querySelector('[data-gm-count]') : null;

    function openGrid(images, title) {
      if (!gm) { lbOpen(images, title, 0); return; }
      lastFocused = document.activeElement;
      gmTitle.textContent = title || '';
      gmCount.textContent = images.length + ' фото';
      gmGrid.innerHTML = '';
      gmGrid.scrollTop = 0;
      images.forEach(function (src, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gm-thumb';
        btn.setAttribute('aria-label', (title || 'Проект') + ' — фото ' + (i + 1));
        var im = document.createElement('img');
        im.src = src; im.loading = 'lazy'; im.alt = '';
        btn.appendChild(im);
        btn.addEventListener('click', function () { lbOpen(images, title, i); });
        gmGrid.appendChild(btn);
      });
      gm.classList.add('is-open');
      gm.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      var gmc = gm.querySelector('[data-gm-close]');
      if (gmc) { gmc.focus(); }
    }
    function gridClose() {
      if (!gm) { return; }
      gm.classList.remove('is-open');
      gm.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      if (lastFocused && typeof lastFocused.focus === 'function') { lastFocused.focus(); }
    }
    if (gm) {
      gm.querySelector('[data-gm-close]').addEventListener('click', gridClose);
      gm.addEventListener('click', function (e) { if (e.target === gm) { gridClose(); } });
    }

    // Открытие сетки миниатюр по клику/клавише на карточке проекта
    var galleryCards = document.querySelectorAll('[data-project-gallery]');
    galleryCards.forEach(function (card) {
      var imgs = (card.getAttribute('data-images') || '').split('|').filter(Boolean);
      var title = card.getAttribute('data-title') || '';
      if (!imgs.length) { return; }
      card.addEventListener('click', function () { openGrid(imgs, title); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGrid(imgs, title); }
      });
    });

    // Управление лайтбоксом
    lb.querySelector('[data-lb-close]').addEventListener('click', lbClose);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { lbGo(-1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { lbGo(1); });

    document.addEventListener('keydown', function (e) {
      if (lb.classList.contains('is-open')) {
        if (e.key === 'Escape') { lbClose(); }
        else if (e.key === 'ArrowRight') { lbGo(1); }
        else if (e.key === 'ArrowLeft') { lbGo(-1); }
      } else if (gm && gm.classList.contains('is-open')) {
        if (e.key === 'Escape') { gridClose(); }
      }
    });

    // Перелистывание пальцем/мышью, как в галерее телефона
    var dragActive = false, dragStartX = 0, dragStartY = 0, dragDX = 0, dragLock = null, dragVW = 0;
    function onDown(e) {
      if (lbAnimating) { return; }
      dragActive = true; dragLock = null; dragDX = 0;
      dragVW = lbViewport.clientWidth;
      dragStartX = e.clientX; dragStartY = e.clientY;
      lbViewport.classList.add('is-dragging');
      lbTrack.classList.remove('is-animating');
      if (lbViewport.setPointerCapture && e.pointerId != null) {
        try { lbViewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }
    function onMove(e) {
      if (!dragActive) { return; }
      var dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
      if (dragLock === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) { return; }
        dragLock = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      }
      if (dragLock !== 'x') { return; }
      if (e.cancelable) { e.preventDefault(); }
      dragDX = (lbImages.length < 2) ? dx * 0.3 : dx;   // одиночное фото — упругий отклик
      setTrack(-dragVW + dragDX, false);
    }
    function onUp() {
      if (!dragActive) { return; }
      dragActive = false;
      lbViewport.classList.remove('is-dragging');
      var moved = Math.abs(dragDX);
      var threshold = Math.min(dragVW * 0.18, 90);
      if (dragLock === 'x' && moved > threshold && lbImages.length > 1) {
        lbGo(dragDX < 0 ? 1 : -1);
      } else if (dragLock === 'x') {
        lbAnimating = true;                 // не долистнули — возвращаем кадр на место
        setTrack(-dragVW, true);
        window.setTimeout(function () { lbAnimating = false; }, 330);
      } else if (dragLock === null && moved < 6) {
        lbClose();                          // тап без движения — закрыть
      }
      dragDX = 0; dragLock = null;
    }
    if (window.PointerEvent) {
      lbViewport.addEventListener('pointerdown', onDown);
      lbViewport.addEventListener('pointermove', onMove);
      lbViewport.addEventListener('pointerup', onUp);
      lbViewport.addEventListener('pointercancel', onUp);
    } else {
      lbViewport.addEventListener('touchstart', function (e) { onDown(e.changedTouches[0]); }, { passive: true });
      lbViewport.addEventListener('touchmove', function (e) { onMove(e.changedTouches[0]); if (dragLock === 'x' && e.cancelable) { e.preventDefault(); } }, { passive: false });
      lbViewport.addEventListener('touchend', function () { onUp(); });
    }

    // Пересчёт позиции при изменении размеров окна
    window.addEventListener('resize', function () {
      if (lb.classList.contains('is-open') && !dragActive && !lbAnimating) {
        setTrack(-lbViewport.clientWidth, false);
      }
    });
  }

})();
