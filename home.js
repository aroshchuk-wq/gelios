const homeSections = [
  ['company', 'О компании'], ['services', 'Услуги'], ['technology', 'Технологии'],
  ['projects', 'Проекты'], ['partners', 'Партнёры'], ['press', 'Пресс-центр'],
  ['contacts', 'Контакты'],
];
const homeAssets = 'assets/home';
const homePhoto = (file, alt = '') =>
  `<img class="gh-photo" src="${homeAssets}/photography/${file}" alt="${alt}" loading="lazy" decoding="async">`;
const homeIcon = name => `<span class="gh-icon" style="--gh-icon:url('${homeAssets}/icons/${name}.svg')" aria-hidden="true"></span>`;
const homeArrow = homeIcon('ui/arrow_right');
const homeLink = (href, title, cls = 'gh-pill') =>
  `<a class="${cls}" href="#/${href}">${title}${homeArrow}</a>`;
const homeCircle = (href, title) =>
  `<a class="gh-circle" href="#/${href}" aria-label="${safe(title)}">${homeArrow}</a>`;
const homeBrand = `<a class="gh-brand" href="#/home"><span>ГЕЛИОС</span><small>Геологоразведочная<br>научно-производственная компания</small></a>`;
const homeNav = () => homeSections.map(([id, title]) =>
  `<a href="#/home/${id}">${title}</a>`).join('');
const homeHeading = (number, title, action = '') =>
  `<div class="gh-heading"><span class="gh-index" aria-hidden="true">${number}</span><h2>${title}</h2>${action}</div>`;
const homeBlock = (id, cls, body) =>
  `<section id="${id}" class="gh-section ${cls}" tabindex="-1"><div class="gh-wrap">${body}</div></section>`;
const homeFilterIds = ['ore', 'engineering', 'marine', 'water', 'hydrocarbon'];
const homeFeaturedProjects = ['amur', 'ishin', 'baikal', 'ozerny'];
const homeProjectImages = {
  amur: 'project-vehicle.webp', ishin: 'project-valley.webp',
  baikal: 'project-vessel.webp', ozerny: 'project-valley.webp',
};
const homeServiceCards = [
  ['ore', 'fieldwork.webp', 'research'],
  ['engineering', 'terrain.webp', 'tasks'],
  ['lab', 'mineral.webp', 'consulting'],
  ['processing', 'drone.webp', 'office_drone'],
];
const homeTechnologyCards = [
  ['emz', 'geophysics'], ['mars', 'equipment'], ['software', 'software'], ['ip', 'ai_research'],
];
const homeArticles = [
  ['Как читать геофизическую модель', 'conference.webp'],
  ['ЭМЗ-ВП: возможности и ограничения', 'geologists.webp'],
  ['Морская электроразведка', 'survey-model.webp'],
];

const homeContact = {
  phone: '+7 914 898 04 04',
  email: 'info@gelios-geo.com',
  address: '664017, г. Иркутск, ул. Лермонтова, 341/4, оф. 19',
};
const homePhoneLink = 'tel:' + homeContact.phone.replaceAll(' ', '');
const homeEmailLink = 'mailto:' + homeContact.email;
const homeMapLink = 'https://yandex.ru/maps/?text=' + encodeURIComponent('Иркутск, улица Лермонтова, 341/4');

function homeContactDetails(withIcons = false) {
  return `<address class="gh-contact-details">
    <div>${withIcons ? homeIcon('contact/phone') : ''}<div><a href="${homePhoneLink}">${homeContact.phone}</a></div></div>
    <div>${withIcons ? homeIcon('contact/mail') : ''}<div><a href="${homeEmailLink}">${homeContact.email}</a></div></div>
    <div>${withIcons ? homeIcon('contact/map_pin') : ''}<div>${homeContact.address}<br>
      <a class="gh-contact-map" href="${homeMapLink}">Показать на карте ${homeArrow}</a></div></div>
  </address>`;
}

function homeFooterMarkup() {
  return `<div class="gh-wrap">
    <div class="gh-footer-inner">
      <div>${homeBrand}<p>Геофизические исследования, обработка данных и моделирование.</p></div>
      <div><h2>Навигация</h2><nav aria-label="Навигация в подвале">${homeNav()}</nav></div>
      <div><h2>Направления</h2><nav aria-label="Направления деятельности">
        ${['ore', 'water', 'engineering', 'marine', 'processing', 'lab'].map(id =>
          `<a href="#/service/${id}">${safe(find('services', id).title)}</a>`).join('')}
      </nav></div>
      <div><h2>Контакты</h2>${homeContactDetails()}</div>
    </div>
    <div class="gh-footer-bottom">
      <span>© ${new Date().getFullYear()} ООО «Гелиос»</span>
      <span>ИНН 3812139379 · КПП 381201001 · ОГРН 1123850010404</span>
      <div class="gh-footer-tools">
        <a href="#/map">Структура сайта</a>
        <button type="button" class="gh-notes" aria-pressed="false">Показать пометки</button>
      </div>
    </div>
  </div>`;
}

function homeContactForm() {
  return `<form class="gh-form" aria-describedby="gh-form-info">
    <h3>Заявка на обсуждение проекта</h3>
    <div class="gh-form-fields">
      <label><span>Имя <span aria-hidden="true">*</span></span><input name="name" autocomplete="name" required></label>
      <label><span>Организация</span><input name="company" autocomplete="organization"></label>
      <label><span>Телефон <span class="gh-phone-required" aria-hidden="true" hidden>*</span></span><input type="tel" name="phone" autocomplete="tel" pattern="[+0-9][0-9 .\\(\\)\\-]{6,19}" title="Введите телефон с кодом города или страны"></label>
      <label><span>Email <span class="gh-email-required" aria-hidden="true">*</span></span><input type="email" name="email" autocomplete="email" required></label>
      <label class="gh-form-wide"><span>Тема обращения</span><select name="topic">
        <option value="">Выберите направление</option>
        ${homeServiceCards.map(([id]) => `<option value="${id}">${safe(find('services', id).title)}</option>`).join('')}
        <option value="other">Другое</option>
      </select></label>
      <label class="gh-form-wide"><span>Задача и регион <span aria-hidden="true">*</span></span><textarea name="message" rows="4" required></textarea></label>
    </div>
    <fieldset class="gh-preference">
      <legend>Как с вами связаться?</legend>
      <label><input type="radio" name="reply" value="email" checked><span>По email</span></label>
      <label><input type="radio" name="reply" value="phone"><span>По телефону</span></label>
    </fieldset>
    <label class="gh-consent"><input type="checkbox" disabled aria-describedby="gh-policy-info">
      <span>Согласие на обработку персональных данных</span></label>
    <p id="gh-policy-info">Согласие станет доступно после добавления политики конфиденциальности.</p>
    <button class="gh-pill" type="submit">Отправить заявку${homeArrow}</button>
    <p id="gh-form-info">Отправка через форму пока недоступна. Свяжитесь с нами по телефону или email.</p>
    <p class="gh-form-result" hidden role="status"></p>
  </form>`;
}

function homeProjectCards(filter) {
  const projects = filter === 'all'
    ? homeFeaturedProjects.map(id => find('projects', id)).filter(Boolean)
    : catalog.projects.filter(project => project.serviceIds.includes(filter)).slice(0, 4);
  return projects.map(project => {
    const entry = P.find(([id]) => id === project.id);
    const image = homeProjectImages[project.id] || (project.technologyIds.includes('uav')
      ? 'project-drone.webp' : project.serviceIds.includes('marine')
        ? 'project-vessel.webp' : 'project-valley.webp');
    const route = 'project/' + project.id;
    return `<article class="gh-card gh-story">
      ${homePhoto(image)}
      <div class="gh-card-body">
        <h3><a href="#/${route}">${safe(entry?.[1] || project.title)}</a></h3>
        <div class="gh-card-foot"><span>${safe(entry?.[2] || '')}</span>${homeCircle(route, project.title)}</div>
      </div>
    </article>`;
  }).join('');
}

function homeMarkup() {
  const serviceCards = homeServiceCards.map(([id, image, icon]) => {
    const [, title, description] = S.find(row => row[0] === id);
    return `<article class="gh-card gh-service">
      ${homePhoto(image)}
      <div class="gh-card-body">
        ${homeIcon('services/' + icon)}<h3>${safe(title)}</h3><p>${safe(description)}</p>
        ${homeCircle('service/' + id, title)}
      </div>
    </article>`;
  }).join('');
  const technologyCards = homeTechnologyCards.map(([id, icon]) => {
    const [, title, description] = T.find(row => row[0] === id);
    return `<article class="gh-card gh-glass"><div class="gh-card-body">
      ${homeIcon('technology/' + icon + '-detail')}<h3>${safe(title)}</h3><p>${safe(description)}</p>
      ${homeCircle('tech/' + id, title)}
    </div></article>`;
  }).join('');
  const filters = [['all', 'Все'], ...homeFilterIds
    .map(id => find('services', id))
    .filter(service => service && catalog.projects.some(project => project.serviceIds.includes(service.id)))
    .map(service => [service.id, service.title])];
  const articles = homeArticles.map(([title, image], index) => `<article class="gh-card gh-story">
    ${homePhoto(image)}<div class="gh-card-body"><h3><a href="#/article/${index}">${title}</a></h3>
    <div class="gh-card-foot"><span>Разбор метода</span>${homeCircle('article/' + index, title)}</div></div>
  </article>`).join('');

  return `<section class="gh-hero" aria-labelledby="gh-title">
    <header class="gh-header gh-wrap">
      ${homeBrand}
      <button type="button" class="gh-menu" aria-label="Меню" aria-controls="gh-nav" aria-expanded="false">${homeIcon('ui/menu')}</button>
      <nav id="gh-nav" aria-label="Основное меню">${homeNav()}</nav>
    </header>
    <div class="gh-wrap gh-hero-inner">
      <div>
        <h1 id="gh-title">Изучаем недра.<br>Помогаем обосновать<br>следующий шаг.</h1>
        <p>Геофизические исследования, обработка данных и моделирование — для геологоразведочных и инженерных задач.</p>
        ${homeLink('home/company', 'О компании')}
        <a class="gh-hero-projects" href="#/projects">Посмотреть проекты</a>
      </div>
      <ul class="gh-strengths">
        <li>Полевые исследования</li><li>Разработка аппаратуры</li><li>Обработка и моделирование</li>
      </ul>
    </div>
    <div class="gh-wrap gh-hero-bottom">
      <span class="gh-hero-index" aria-hidden="true">01</span>
      ${homeLink('home/company', 'Прокрутите вниз', 'gh-scroll')}
    </div>
  </section>
  ${homeBlock('company', 'gh-about', `<div class="gh-about-grid">
    <div>
      ${homeHeading('02', 'О компании')}
      <p>«Гелиос» объединяет полевые исследования, разработку аппаратуры и работу с геофизическими данными.</p>
      <p>Подбираем методы под геологическую задачу, сопоставляем результаты с исходными материалами и формируем рекомендации для дальнейших работ.</p>
      ${homeLink('about', 'Подробнее о компании')}
      <ul class="gh-capabilities"><li><strong>2012</strong><span>Год основания</span></li><li><strong>Поле</strong><span>Полевые исследования</span></li><li><strong>Обработка</strong><span>Данные и моделирование</span></li></ul>
    </div>
    <figure>${homePhoto('team.jpg', 'Два специалиста с оборудованием в горах')}
      <figcaption>Иллюстрация полевых работ</figcaption>
    </figure>
  </div>`)}
  ${homeBlock('services', 'gh-services', `
    ${homeHeading('03', 'Наши услуги', homeLink('services', 'Все услуги', 'gh-more'))}
    <div class="gh-grid gh-four">${serviceCards}</div>`)}
  ${homeBlock('technology', 'gh-tech gh-dark', `
    ${homeHeading('04', 'Технологии, ПО и разработки', homeLink('technologies', 'Все технологии', 'gh-more'))}
    <p>Методики съёмки, аппаратура, обработка и интерпретация данных.</p>
    <div class="gh-grid gh-four">${technologyCards}</div>`)}
  ${homeBlock('projects', 'gh-projects', `
    ${homeHeading('05', 'Проекты и кейсы', homeLink('projects', 'Все проекты', 'gh-more'))}
    <p>Производственные работы, опытно-методические исследования и разработка технологий.</p>
    <div class="gh-filters" role="group" aria-label="Фильтр проектов">${filters.map(([id, title], index) =>
      `<button type="button" data-filter="${id}" aria-pressed="${index === 0}">${safe(title)}</button>`).join('')}</div>
    <div class="gh-grid gh-four" id="gh-project-results" aria-live="polite">${homeProjectCards('all')}</div>`)}
  ${homeBlock('partners', 'gh-partners gh-dark', `
    ${homeHeading('06', 'Партнёры и сотрудничество', homeLink('about/partners', 'О сотрудничестве', 'gh-more'))}
    <p>Для комплексных задач объединяем необходимые методы, оборудование и компетенции. В каждом проекте отдельно показываем вклад участников.</p>
    <ul class="gh-partner-types">
      <li><strong>ИРНИТУ</strong><span>Совместные исследования</span></li>
      <li><strong>ИЗК СО РАН</strong><span>Совместные публикации</span></li>
      <li><strong>Фонд «Сколково»</strong><span>Грантовая поддержка</span></li>
    </ul>`)}
  ${homeBlock('press', 'gh-press', `
    ${homeHeading('07', 'Пресс-центр', homeLink('materials', 'Все материалы', 'gh-more'))}
    <p>Понятно о геофизике, технологиях и результатах исследований.</p>
    <div class="gh-grid gh-three">${articles}</div>`)}
  ${homeBlock('safety', 'gh-safety gh-dark', `
    ${homeHeading('08', 'Безопасность и ответственность')}
    <p>Условия участка, влияние работ на окружающую среду и ограничения методов учитываются при подготовке программы исследований.</p>
    ${homeLink('about/safety', 'Подробнее')}`)}
  ${homeBlock('contacts', 'gh-contacts', `<div class="gh-contact-grid">
    <div>
      <div class="gh-contact-label"><span class="gh-index" aria-hidden="true">09</span> Контакты</div>
      <h2>Обсудим ваш проект</h2>
      <p>Расскажите об участке, имеющихся данных и ожидаемом результате. Определим, какая программа исследований подходит для следующего этапа.</p>
      ${homeContactDetails(true)}
    </div>
    ${homeContactForm()}
  </div>`)}`;
}

function renderHomeRoute() {
  const app = document.getElementById('app');
  const footer = document.getElementById('home-footer');
  const [page, anchor] = (location.hash.slice(2) || 'home').split('/');
  const wasHome = document.body.classList.contains('home-page');
  document.body.classList.toggle('home-page', page === 'home');
  footer.hidden = page !== 'home';
  if (page !== 'home') return false;

  if (!wasHome) {
    app.innerHTML = homeMarkup();
    footer.innerHTML = homeFooterMarkup();
    const menu = app.querySelector('.gh-menu');
    menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') === 'false')));
    app.querySelector('#gh-nav').addEventListener('click', event => {
      const link = event.target.closest('a');
      if (link?.hash === location.hash) renderHomeRoute();
    });
    app.addEventListener('keydown', closeHomeMenuOnEscape);
    const form = app.querySelector('.gh-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const result = form.querySelector('.gh-form-result');
      result.hidden = false;
      result.textContent = 'Поля заполнены. Отправка данных недоступна.';
    });
    form.addEventListener('input', () => {
      const replyByPhone = form.elements.reply.value === 'phone';
      form.elements.phone.required = replyByPhone;
      form.elements.email.required = !replyByPhone;
      form.querySelector('.gh-phone-required').hidden = !replyByPhone;
      form.querySelector('.gh-email-required').hidden = replyByPhone;
      form.querySelector('.gh-form-result').hidden = true;
    });
    app.querySelector('.gh-filters').addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      for (const item of event.currentTarget.children) item.setAttribute('aria-pressed', String(item === button));
      app.querySelector('#gh-project-results').innerHTML = homeProjectCards(button.dataset.filter);
    });
    const notes = document.getElementById('notes');
    const homeNotes = footer.querySelector('.gh-notes');
    const syncNotes = () => {
      homeNotes.textContent = notes.textContent;
      homeNotes.setAttribute('aria-pressed', notes.getAttribute('aria-pressed'));
    };
    homeNotes.addEventListener('click', () => { notes.click(); syncNotes(); });
    syncNotes();
  }

  document.title = 'Гелиос — геофизические исследования';
  app.querySelector('.gh-menu').setAttribute('aria-expanded', 'false');
  const section = anchor && document.getElementById(anchor);
  if (section && app.contains(section)) {
    section.focus({preventScroll: true});
    section.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
  return true;
}

function closeHomeMenuOnEscape(event) {
  if (event.key !== 'Escape') return;
  const menu = event.currentTarget.querySelector('.gh-menu[aria-expanded="true"]');
  if (menu) {
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
}
