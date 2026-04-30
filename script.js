
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      const group = item.parentElement;
      group.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        const btn = el.querySelector('.accordion-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const stepTabs = document.querySelectorAll('.step-tab');
  const stepPanels = document.querySelectorAll('.step-panel');
  if (stepTabs.length && stepPanels.length) {
    stepTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const step = tab.dataset.step;
        stepTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        stepPanels.forEach(panel => panel.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const target = document.querySelector(`[data-step-panel="${step}"]`);
        if (target) target.classList.add('active');
      });
    });
  }

  const lockerCards = document.querySelectorAll('.locker-card');
  const lockerPanels = document.querySelectorAll('.locker-panel');
  if (lockerCards.length && lockerPanels.length) {
    lockerCards.forEach(card => {
      card.addEventListener('mouseenter', () => activateLocker(card.dataset.locker));
      card.addEventListener('focus', () => activateLocker(card.dataset.locker));
      card.addEventListener('click', () => activateLocker(card.dataset.locker));
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateLocker(card.dataset.locker);
        }
      });
    });

    function activateLocker(name) {
      lockerCards.forEach(c => c.classList.toggle('active', c.dataset.locker === name));
      lockerPanels.forEach(p => p.classList.toggle('active', p.dataset.lockerPanel === name));
    }
  }

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const button = form.querySelector('button');
      if (button) {
        const original = button.textContent;
        button.textContent = 'Thanks';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = original;
          button.disabled = false;
        }, 1800);
      }
    });
  });
});
