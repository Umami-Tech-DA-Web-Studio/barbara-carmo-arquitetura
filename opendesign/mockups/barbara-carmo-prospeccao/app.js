(() => {
  'use strict';

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('#site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      siteNav.classList.toggle('is-open', !isOpen);
    });
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });
  }

  const cards = [...document.querySelectorAll('[data-category]')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const emptyState = document.querySelector('[data-empty-state]');
  const resetFilter = document.querySelector('[data-reset-filter]');

  function applyFilter(filter) {
    let visible = 0;
    cards.forEach((card) => {
      const matches = filter === 'todos' || card.dataset.category === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  }

  filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  if (resetFilter) resetFilter.addEventListener('click', () => applyFilter('todos'));

  const projectData = {
    'patio-norte': { title: 'Pátio Norte', description: 'Estudo fictício de uma casa térrea organizada em torno de um vazio central. A descrição serve apenas para testar hierarquia, legenda e abertura de detalhe.', factOne: 'Residencial', factTwo: 'Cena de exercício' },
    'silencio-comum': { title: 'Silêncio Comum', description: 'Estudo fictício de interiores que investiga continuidade entre estar e jantar. Nenhuma imagem ou obra real está representada aqui.', factOne: 'Interiores', factTwo: 'Cena de exercício' },
    'linha-dagua': { title: 'Linha d’Água', description: 'Estudo fictício sobre transições entre dentro e fora, com foco em sombra e percurso. Não é um projeto executado ou atribuído.', factOne: 'Residencial', factTwo: 'Cena de exercício' },
    entremeios: { title: 'Entremeios', description: 'Estudo fictício de um apartamento compacto, usado para validar como a direção visual recebe conteúdo curto e uma narrativa de projeto.', factOne: 'Interiores', factTwo: 'Cena de exercício' }
  };
  const dialog = document.querySelector('[data-project-dialog]');
  const dialogTitle = document.querySelector('[data-dialog-title]');
  const dialogDescription = document.querySelector('[data-dialog-description]');
  const dialogFactOne = document.querySelector('[data-dialog-fact-one]');
  const dialogFactTwo = document.querySelector('[data-dialog-fact-two]');
  const dialogClose = document.querySelector('[data-dialog-close]');
  let lastDialogTrigger = null;

  function openProject(projectId, trigger) {
    const data = projectData[projectId];
    if (!data || !dialog) return;
    lastDialogTrigger = trigger;
    dialogTitle.textContent = data.title;
    dialogDescription.textContent = data.description;
    dialogFactOne.textContent = data.factOne;
    dialogFactTwo.textContent = data.factTwo;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    if (dialogClose) dialogClose.focus();
  }
  function closeProject() {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    if (lastDialogTrigger) lastDialogTrigger.focus();
  }
  cards.forEach((card) => {
    const trigger = card.querySelector('.project-visual');
    if (trigger) trigger.addEventListener('click', () => openProject(card.dataset.project, trigger));
  });
  if (dialogClose) dialogClose.addEventListener('click', closeProject);
  if (dialog) {
    dialog.addEventListener('click', (event) => { if (event.target === dialog) closeProject(); });
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeProject(); });
  }

  const form = document.querySelector('[data-briefing-form]');
  const formStatus = document.querySelector('[data-form-status]');
  const errorFor = (name) => document.querySelector(`[data-error-for="${name}"]`);
  const rules = {
    nome: (value) => value.trim().length >= 2 ? '' : 'Digite ao menos 2 caracteres.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Use um e-mail válido para o exercício.',
    mensagem: (value) => value.trim().length >= 12 ? '' : 'Escreva uma pista com pelo menos 12 caracteres.'
  };
  if (form) {
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      field.addEventListener('input', () => {
        const message = rules[name](field.value);
        const error = errorFor(name);
        if (error) error.textContent = message;
        field.setAttribute('aria-invalid', String(Boolean(message)));
      });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      Object.keys(rules).forEach((name) => {
        const field = form.elements[name];
        const message = rules[name](field.value);
        const error = errorFor(name);
        if (error) error.textContent = message;
        field.setAttribute('aria-invalid', String(Boolean(message)));
        if (message) valid = false;
      });
      const consent = form.elements.consentimento;
      if (!consent.checked) valid = false;
      if (!valid) {
        formStatus.textContent = 'Revise os campos destacados antes de validar.';
        formStatus.className = 'form-status is-error';
        const firstInvalid = form.querySelector('[aria-invalid="true"]') || (!consent.checked ? consent : null);
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      formStatus.textContent = 'Demonstração concluída — nenhum dado foi enviado ou armazenado.';
      formStatus.className = 'form-status is-success';
    });
  }
})();
