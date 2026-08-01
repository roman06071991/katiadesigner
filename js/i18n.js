/* ============================================================
   Kateryna Hnida — мультиязычность (RU / UK / EN)
   Язык определяется автоматически по языку браузера/телефона,
   с возможностью ручного переключения (сохраняется в браузере).
   ============================================================ */
(function () {
  'use strict';

  var LANGS = ['ru', 'uk', 'en'];

  var DICT = {
    meta_title: {
      ru: "Kateryna Hnida — Фотореалистичная 3D-визуализация интерьеров",
      uk: "Kateryna Hnida — Фотореалістична 3D-візуалізація інтер'єрів",
      en: "Kateryna Hnida — Photorealistic 3D Interior Visualization"
    },
    meta_desc: {
      ru: "Фотореалистичная 3D-визуализация жилых и коммерческих интерьеров. 3ds Max · Corona Renderer. Помогаю увидеть пространство до его реализации.",
      uk: "Фотореалістична 3D-візуалізація житлових і комерційних інтер'єрів. 3ds Max · Corona Renderer. Допомагаю побачити простір до його втілення.",
      en: "Photorealistic 3D visualization of residential and commercial interiors. 3ds Max · Corona Renderer. See your space before it is built."
    },

    brand_sub: { ru: "3D-визуализация интерьеров", uk: "3D-візуалізація інтер'єрів", en: "3D Interior Visualization" },
    nav_projects: { ru: "Проекты", uk: "Проєкти", en: "Projects" },
    nav_about: { ru: "Обо мне", uk: "Про мене", en: "About" },
    nav_services: { ru: "Услуги", uk: "Послуги", en: "Services" },
    nav_pricing: { ru: "Цены", uk: "Ціни", en: "Pricing" },
    nav_contact: { ru: "Контакты", uk: "Контакти", en: "Contact" },
    menu_aria: { ru: "Меню", uk: "Меню", en: "Menu" },

    hero_title: {
      ru: "Фотореалистичная<br />3D-визуализация интерьеров",
      uk: "Фотореалістична<br />3D-візуалізація інтер'єрів",
      en: "Photorealistic<br />3D interior visualization"
    },
    hero_subtitle: {
      ru: "Создаю атмосферные и детализированные изображения, которые помогают увидеть пространство до его реализации.",
      uk: "Створюю атмосферні та деталізовані зображення, які допомагають побачити простір до його втілення.",
      en: "I create atmospheric, detailed images that let you see a space before it is built."
    },
    hero_btn_projects: { ru: "Посмотреть проекты", uk: "Переглянути проєкти", en: "View projects" },
    hero_btn_discuss: { ru: "Обсудить проект", uk: "Обговорити проєкт", en: "Discuss a project" },
    hero_caption1: {
      ru: "Интерьеры жилых и коммерческих пространств",
      uk: "Інтер'єри житлових і комерційних просторів",
      en: "Residential and commercial interiors"
    },

    about_eyebrow: { ru: "Обо мне", uk: "Про мене", en: "About me" },
    about_lead: {
      ru: "Здравствуйте! Меня зовут Катя, я — профессиональный 3D-визуализатор и дизайнер интерьера.",
      uk: "Вітаю! Мене звати Катя, я — професійний 3D-візуалізатор і дизайнер інтер'єру.",
      en: "Hello! My name is Kate — a professional 3D visualizer and interior designer."
    },
    about_body1: {
      ru: "Моя задача — создавать фотореалистичные изображения Ваших проектов, которые точно передадут атмосферу и стиль Вашего интерьера.",
      uk: "Моє завдання — створювати фотореалістичні зображення Ваших проєктів, які точно передадуть атмосферу та стиль Вашого інтер'єру.",
      en: "My goal is to create photorealistic images of your projects that precisely convey the atmosphere and style of your interior."
    },
    about_body2: {
      ru: "Индивидуальный подход, высокое качество визуализаций, внимание к каждой детали и соблюдение сроков исполнения заказа — вот мои приоритеты.",
      uk: "Індивідуальний підхід, висока якість візуалізацій, увага до кожної деталі та дотримання термінів виконання замовлення — ось мої пріоритети.",
      en: "A personal approach, high-quality visualizations, attention to every detail, and meeting deadlines — these are my priorities."
    },
    about_sign_role: { ru: "3D-визуализатор и дизайнер интерьеров", uk: "3D-візуалізатор і дизайнер інтер'єрів", en: "3D visualizer & interior designer" },

    portfolio_eyebrow: { ru: "Портфолио", uk: "Портфоліо", en: "Portfolio" },
    portfolio_title: { ru: "Проекты", uk: "Проєкти", en: "Projects" },
    portfolio_note: {
      ru: "Нажмите на проект, чтобы открыть галерею с фотографиями.",
      uk: "Натисніть на проєкт, щоб відкрити галерею з фотографіями.",
      en: "Click a project to open its photo gallery."
    },
    word_project: { ru: "Проект", uk: "Проєкт", en: "Project" },
    word_gallery: { ru: "Галерея", uk: "Галерея", en: "Gallery" },
    word_open_gallery: { ru: "открыть галерею", uk: "відкрити галерею", en: "open gallery" },

    services_eyebrow: { ru: "Услуги", uk: "Послуги", en: "Services" },
    services_title: { ru: "Что я делаю", uk: "Що я роблю", en: "What I do" },
    service_1: { ru: "Подбор материалов, мебели и освещения", uk: "Підбір матеріалів, меблів та освітлення", en: "Selection of materials, furniture and lighting" },
    service_2: { ru: "Визуализация по чертежам и техническому заданию", uk: "Візуалізація за кресленнями та технічним завданням", en: "Visualization from drawings and a brief" },
    service_3: { ru: "3D-визуализация интерьера", uk: "3D-візуалізація інтер'єру", en: "3D interior visualization" },
    service_4: { ru: "Создание нескольких ракурсов помещения", uk: "Створення кількох ракурсів приміщення", en: "Multiple views of a room" },
    service_5: { ru: "Внесение корректировок", uk: "Внесення коригувань", en: "Revisions and adjustments" },
    service_6: { ru: "Визуализация отдельных предметов мебели", uk: "Візуалізація окремих предметів меблів", en: "Visualization of individual furniture pieces" },

    pricing_eyebrow: { ru: "Пакеты и стоимость", uk: "Пакети та вартість", en: "Packages & pricing" },
    pricing_title: { ru: "Форматы работы", uk: "Формати роботи", en: "Ways to work" },
    billing_switch_aria: { ru: "Переключить формат оплаты", uk: "Перемкнути формат оплати", en: "Toggle billing period" },
    billing_once_label: { ru: "Разовый проект", uk: "Разовий проєкт", en: "One-time project" },
    billing_annual_label: {
      ru: "Годовое сотрудничество <span class=\"billing-toggle__save\">−20%</span>",
      uk: "Річна співпраця <span class=\"billing-toggle__save\">−20%</span>",
      en: "Yearly collaboration <span class=\"billing-toggle__save\">−20%</span>"
    },
    billing_once: { ru: "разовая оплата", uk: "разова оплата", en: "one-time payment" },
    billing_annual: {
      ru: "цена за проект при годовом сотрудничестве",
      uk: "ціна за проєкт при річній співпраці",
      en: "price per project with yearly collaboration"
    },
    period_per_project: { ru: "/ проект", uk: "/ проєкт", en: "/ project" },
    badge_popular: { ru: "Популярный", uk: "Популярний", en: "Popular" },
    btn_choose: { ru: "Выбрать пакет", uk: "Обрати пакет", en: "Choose package" },

    pc_basic_name: { ru: "Базовый", uk: "Базовий", en: "Basic" },
    pc_b1: { ru: "Визуализация одного помещения", uk: "Візуалізація одного приміщення", en: "Visualization of one room" },
    pc_b2: { ru: "До двух ракурсов", uk: "До двох ракурсів", en: "Up to two views" },
    pc_b3: { ru: "Работа по готовым чертежам и референсам", uk: "Робота за готовими кресленнями та референсами", en: "Work from ready drawings and references" },
    pc_b4: { ru: "Базовая настройка материалов и освещения", uk: "Базове налаштування матеріалів та освітлення", en: "Basic materials and lighting setup" },
    pc_b5: { ru: "Один этап корректировок", uk: "Один етап коригувань", en: "One round of revisions" },
    pc_b6: { ru: "Готовые изображения в высоком разрешении", uk: "Готові зображення у високій роздільній здатності", en: "Final images in high resolution" },
    pc_basic_desc: { ru: "Для одного небольшого помещения", uk: "Для одного невеликого приміщення", en: "For a single small room" },

    pc_std_name: { ru: "Стандарт", uk: "Стандарт", en: "Standard" },
    pc_s1: { ru: "Визуализация до трёх помещений", uk: "Візуалізація до трьох приміщень", en: "Visualization of up to three rooms" },
    pc_s2: { ru: "Несколько ракурсов каждого помещения", uk: "Кілька ракурсів кожного приміщення", en: "Several views of each room" },
    pc_s3: { ru: "Детальная проработка материалов, мебели и декора", uk: "Детальне опрацювання матеріалів, меблів та декору", en: "Detailed materials, furniture and decor" },
    pc_s4: { ru: "Реалистичное дневное или вечернее освещение", uk: "Реалістичне денне або вечірнє освітлення", en: "Realistic daytime or evening lighting" },
    pc_s5: { ru: "Помощь с подбором визуального направления", uk: "Допомога з вибором візуального напряму", en: "Help choosing a visual direction" },
    pc_s6: { ru: "До двух этапов корректировок", uk: "До двох етапів коригувань", en: "Up to two rounds of revisions" },
    pc_s7: { ru: "Изображения для презентации проекта и портфолио", uk: "Зображення для презентації проєкту та портфоліо", en: "Images for project presentation and portfolio" },
    pc_std_desc: { ru: "Комплексная визуализация нескольких помещений", uk: "Комплексна візуалізація кількох приміщень", en: "Comprehensive visualization of several rooms" },

    pc_prem_name: { ru: "Premium", uk: "Premium", en: "Premium" },
    pc_p1: { ru: "Комплексная визуализация всего объекта", uk: "Комплексна візуалізація всього об'єкта", en: "Full visualization of the entire property" },
    pc_p2: { ru: "Разработка единого визуального стиля", uk: "Розробка єдиного візуального стилю", en: "A single, cohesive visual style" },
    pc_p3: { ru: "Большое количество интерьерных ракурсов", uk: "Велика кількість інтер'єрних ракурсів", en: "A large number of interior views" },
    pc_p4: { ru: "Детальная проработка мебели, материалов, декора и освещения", uk: "Детальне опрацювання меблів, матеріалів, декору та освітлення", en: "Detailed furniture, materials, decor and lighting" },
    pc_p5: { ru: "Дневные и вечерние варианты визуализации", uk: "Денні та вечірні варіанти візуалізації", en: "Daytime and evening render variants" },
    pc_p6: { ru: "Отдельные декоративные сцены и крупные планы", uk: "Окремі декоративні сцени та великі плани", en: "Separate decorative scenes and close-ups" },
    pc_p7: { ru: "Приоритетная работа над проектом", uk: "Пріоритетна робота над проєктом", en: "Priority work on your project" },
    pc_p8: { ru: "До трёх этапов корректировок", uk: "До трьох етапів коригувань", en: "Up to three rounds of revisions" },
    pc_p9: { ru: "Изображения для сайта, рекламы, Behance и печати", uk: "Зображення для сайту, реклами, Behance і друку", en: "Images for web, ads, Behance and print" },
    pc_prem_desc: { ru: "Полная визуализация квартиры, дома или коммерческого пространства", uk: "Повна візуалізація квартири, будинку чи комерційного простору", en: "Full visualization of an apartment, house or commercial space" },

    pricing_note: {
      ru: "При годовом сотрудничестве — цена за проект со скидкой 20%. Финальная стоимость рассчитывается индивидуально и зависит от площади, сложности проекта, количества помещений и ракурсов.",
      uk: "При річній співпраці — ціна за проєкт зі знижкою 20%. Фінальна вартість розраховується індивідуально та залежить від площі, складності проєкту, кількості приміщень і ракурсів.",
      en: "With yearly collaboration, the price per project is 20% lower. The final cost is calculated individually and depends on the area, project complexity, number of rooms and views."
    },

    process_eyebrow: { ru: "Как я работаю", uk: "Як я працюю", en: "How I work" },
    process_title: { ru: "Этапы работы", uk: "Етапи роботи", en: "Process" },
    step1_t: { ru: "Обсуждение проекта", uk: "Обговорення проєкту", en: "Project discussion" },
    step1_d: { ru: "Клиент отправляет планы, чертежи, фотографии, референсы и описание пожеланий.", uk: "Клієнт надсилає плани, креслення, фотографії, референси та опис побажань.", en: "You send plans, drawings, photos, references and a description of your wishes." },
    step2_t: { ru: "Подготовка сцены", uk: "Підготовка сцени", en: "Scene setup" },
    step2_d: { ru: "Создаётся геометрия помещения, расставляется мебель и настраиваются основные материалы.", uk: "Створюється геометрія приміщення, розставляються меблі та налаштовуються основні матеріали.", en: "The room geometry is built, furniture is placed and base materials are set up." },
    step3_t: { ru: "Предварительные изображения", uk: "Попередні зображення", en: "Preview images" },
    step3_d: { ru: "Клиент получает первые ракурсы и проверяет композицию, наполнение и основные решения.", uk: "Клієнт отримує перші ракурси та перевіряє композицію, наповнення й основні рішення.", en: "You receive the first views and check composition, contents and key decisions." },
    step4_t: { ru: "Материалы и освещение", uk: "Матеріали та освітлення", en: "Materials & lighting" },
    step4_d: { ru: "Прорабатываются текстуры, свет, декор и атмосфера пространства.", uk: "Опрацьовуються текстури, світло, декор та атмосфера простору.", en: "Textures, light, decor and the atmosphere of the space are refined." },
    step5_t: { ru: "Корректировки", uk: "Коригування", en: "Revisions" },
    step5_d: { ru: "Вносятся согласованные изменения.", uk: "Вносяться погоджені зміни.", en: "Agreed changes are applied." },
    step6_t: { ru: "Финальный результат", uk: "Фінальний результат", en: "Final result" },
    step6_d: { ru: "Клиент получает готовые фотореалистичные изображения в высоком разрешении.", uk: "Клієнт отримує готові фотореалістичні зображення у високій роздільній здатності.", en: "You receive the final photorealistic images in high resolution." },

    adv_eyebrow: { ru: "Почему я", uk: "Чому я", en: "Why me" },
    adv_title: { ru: "Преимущества", uk: "Переваги", en: "Advantages" },
    adv_1: { ru: "Фотореалистичное качество", uk: "Фотореалістична якість", en: "Photorealistic quality" },
    adv_2: { ru: "Внимание к деталям", uk: "Увага до деталей", en: "Attention to detail" },
    adv_3: { ru: "Реалистичные материалы и освещение", uk: "Реалістичні матеріали та освітлення", en: "Realistic materials and lighting" },
    adv_4: { ru: "Понятный процесс работы", uk: "Зрозумілий процес роботи", en: "A clear working process" },
    adv_5: { ru: "Соблюдение сроков", uk: "Дотримання термінів", en: "On-time delivery" },
    adv_6: { ru: "Возможность внесения корректировок", uk: "Можливість внесення коригувань", en: "Room for revisions" },
    adv_7: { ru: "Изображения, готовые для презентаций и публикаций", uk: "Зображення, готові для презентацій та публікацій", en: "Images ready for presentations and publishing" },

    collab_eyebrow: { ru: "Дизайнерам и архитекторам", uk: "Дизайнерам та архітекторам", en: "For designers & architects" },
    collab_title: { ru: "Помогаю профессионально представить проект клиенту", uk: "Допомагаю професійно презентувати проєкт клієнту", en: "Helping you present your project professionally" },
    collab_text: { ru: "Качественная визуализация позволяет быстрее согласовать концепцию, материалы, мебель и цветовые решения.", uk: "Якісна візуалізація дозволяє швидше погодити концепцію, матеріали, меблі та колірні рішення.", en: "Great visualization helps you approve the concept, materials, furniture and colours faster." },
    collab_btn: { ru: "Предложить сотрудничество", uk: "Запропонувати співпрацю", en: "Propose a collaboration" },

    contact_eyebrow: { ru: "Заявка", uk: "Заявка", en: "Get in touch" },
    contact_title: { ru: "Расскажите о вашем проекте", uk: "Розкажіть про ваш проєкт", en: "Tell me about your project" },
    contact_lead: { ru: "Отправьте планы, референсы и краткое описание задачи — я изучу материалы и предложу подходящий формат работы.", uk: "Надішліть плани, референси та короткий опис завдання — я вивчу матеріали й запропоную відповідний формат роботи.", en: "Send plans, references and a short brief — I'll review everything and suggest the right way to work." },
    form_name: { ru: "Имя", uk: "Ім'я", en: "Name" },
    form_contact: { ru: "Email или мессенджер", uk: "Email або месенджер", en: "Email or messenger" },
    form_room: { ru: "Тип помещения", uk: "Тип приміщення", en: "Type of space" },
    opt_none: { ru: "Не выбрано", uk: "Не вибрано", en: "Not selected" },
    opt_living: { ru: "Гостиная", uk: "Вітальня", en: "Living room" },
    opt_kitchen: { ru: "Кухня", uk: "Кухня", en: "Kitchen" },
    opt_bedroom: { ru: "Спальня", uk: "Спальня", en: "Bedroom" },
    opt_bath: { ru: "Ванная комната", uk: "Ванна кімната", en: "Bathroom" },
    opt_commercial: { ru: "Коммерческое пространство", uk: "Комерційний простір", en: "Commercial space" },
    opt_whole: { ru: "Квартира / дом целиком", uk: "Квартира / будинок цілком", en: "Whole apartment / house" },
    form_area: { ru: "Площадь объекта", uk: "Площа об'єкта", en: "Area" },
    form_area_ph: { ru: "напр. 65 м²", uk: "напр. 65 м²", en: "e.g. 65 m²" },
    form_views: { ru: "Количество ракурсов", uk: "Кількість ракурсів", en: "Number of views" },
    form_views_ph: { ru: "напр. 4", uk: "напр. 4", en: "e.g. 4" },
    form_deadline: { ru: "Желаемые сроки", uk: "Бажані терміни", en: "Preferred timeline" },
    form_deadline_ph: { ru: "напр. до 2 недель", uk: "напр. до 2 тижнів", en: "e.g. within 2 weeks" },
    form_desc: { ru: "Описание проекта", uk: "Опис проєкту", en: "Project description" },
    form_files: { ru: "Загрузка чертежей и референсов", uk: "Завантаження креслень і референсів", en: "Upload drawings and references" },
    form_submit: { ru: "Обсудить проект", uk: "Обговорити проєкт", en: "Discuss a project" },
    form_success: { ru: "Спасибо! Ваша заявка получена — я свяжусь с вами в ближайшее время.", uk: "Дякую! Вашу заявку отримано — я зв'яжуся з вами найближчим часом.", en: "Thank you! Your request has been received — I'll get in touch soon." },
    form_required: { ru: "Пожалуйста, заполните это поле", uk: "Будь ласка, заповніть це поле", en: "Please fill in this field" },

    cta_title: {
      ru: "Готовы увидеть ваш<br />будущий интерьер?",
      uk: "Готові побачити ваш<br />майбутній інтер'єр?",
      en: "Ready to see your<br />future interior?"
    },
    cta_text: { ru: "Давайте создадим визуализацию, которая передаст атмосферу пространства и поможет воплотить проект в жизнь.", uk: "Давайте створимо візуалізацію, яка передасть атмосферу простору й допоможе втілити проєкт у життя.", en: "Let's create a visualization that captures the atmosphere of the space and helps bring your project to life." },
    cta_btn: { ru: "Начать проект", uk: "Почати проєкт", en: "Start a project" },

    footer_sub: { ru: "3D-визуализация интерьеров · 3ds Max · Corona Renderer", uk: "3D-візуалізація інтер'єрів · 3ds Max · Corona Renderer", en: "3D interior visualization · 3ds Max · Corona Renderer" },
    footer_rights: { ru: "Все права защищены.", uk: "Усі права захищені.", en: "All rights reserved." },

    close_gallery: { ru: "Закрыть галерею", uk: "Закрити галерею", en: "Close gallery" },
    prev_photo: { ru: "Предыдущее фото", uk: "Попереднє фото", en: "Previous photo" },
    next_photo: { ru: "Следующее фото", uk: "Наступне фото", en: "Next photo" },
    zoom_in: { ru: "Увеличить", uk: "Збільшити", en: "Zoom in" },
    zoom_out: { ru: "Уменьшить", uk: "Зменшити", en: "Zoom out" }
  };

  function detect() {
    try {
      var saved = localStorage.getItem('katia_lang');
      if (saved && LANGS.indexOf(saved) >= 0) { return saved; }
    } catch (e) {}
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i] || '').toLowerCase();
      if (l.indexOf('uk') === 0) { return 'uk'; }
      if (l.indexOf('ru') === 0) { return 'ru'; }
      if (l.indexOf('en') === 0) { return 'en'; }
    }
    return 'en';
  }

  var lang = detect();

  function t(key) {
    var e = DICT[key];
    if (!e) { return ''; }
    return e[lang] != null ? e[lang] : e.ru;
  }
  function photosWord(n) {
    if (lang === 'en') { return n === 1 ? 'photo' : 'photos'; }
    return 'фото';
  }

  function applyProjects() {
    var proj = t('word_project'), gal = t('word_gallery'), openG = t('word_open_gallery');
    var cards = document.querySelectorAll('[data-project-gallery]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var num = i + 1;
      var imgs = (card.getAttribute('data-images') || '').split('|').filter(Boolean);
      var count = imgs.length;
      var title = proj + ' ' + num;
      card.setAttribute('data-title', title);
      var tEl = card.querySelector('.card__title'); if (tEl) { tEl.textContent = title; }
      var mEl = card.querySelector('.card__meta'); if (mEl) { mEl.textContent = gal + ' · ' + count + ' ' + photosWord(count); }
      card.setAttribute('aria-label', title + ' — ' + openG + ', ' + count + ' ' + photosWord(count));
      var im = card.querySelector('.card__media img'); if (im) { im.alt = title; }
    }
  }

  function apply() {
    document.documentElement.lang = lang;
    document.title = t('meta_title');
    var md = document.querySelector('meta[name="description"]');
    if (md) { md.setAttribute('content', t('meta_desc')); }

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) { var v = t(els[i].getAttribute('data-i18n')); if (v) { els[i].textContent = v; } }

    var elsH = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < elsH.length; j++) { var vh = t(elsH[j].getAttribute('data-i18n-html')); if (vh) { elsH[j].innerHTML = vh; } }

    var elsP = document.querySelectorAll('[data-i18n-ph]');
    for (var k = 0; k < elsP.length; k++) { var vp = t(elsP[k].getAttribute('data-i18n-ph')); if (vp) { elsP[k].setAttribute('placeholder', vp); } }

    var elsA = document.querySelectorAll('[data-i18n-aria]');
    for (var m = 0; m < elsA.length; m++) { var va = t(elsA[m].getAttribute('data-i18n-aria')); if (va) { elsA[m].setAttribute('aria-label', va); } }

    applyProjects();

    var btns = document.querySelectorAll('[data-lang-switch] .lang__btn');
    for (var b = 0; b < btns.length; b++) { btns[b].classList.toggle('is-active', btns[b].getAttribute('data-lang') === lang); }
  }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) {
      if (l === lang) {
        var btns = document.querySelectorAll('[data-lang-switch] .lang__btn');
        for (var b = 0; b < btns.length; b++) { btns[b].classList.toggle('is-active', btns[b].getAttribute('data-lang') === lang); }
      }
      return;
    }
    lang = l;
    try { localStorage.setItem('katia_lang', l); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: lang } }));
  }

  window.I18N = {
    get lang() { return lang; },
    t: t,
    photosWord: photosWord,
    setLang: setLang,
    apply: apply
  };

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-lang-switch] .lang__btn') : null;
    if (btn) { setLang(btn.getAttribute('data-lang')); }
  });

  apply();
})();
