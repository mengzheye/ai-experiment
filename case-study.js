// Behaviour shared by the standalone case-study pages.

// Slide-in for split-layout left columns
const splitObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.2 });
document.querySelectorAll('.cs-split-left').forEach(el => splitObserver.observe(el));

// Tab switching
document.querySelectorAll('[data-tab-group]').forEach(group => {
  const tabs = group.querySelectorAll('.cs-tab');
  const panels = group.querySelectorAll('.cs-tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const i = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === i));
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === i));
    });
  });
});

// Update topnav right label to match the section currently in view
(function() {
  const navRight = document.querySelector('.cs-topnav-right');
  if (!navRight) return;
  const defaultLabel = 'Context';
  const sections = [...document.querySelectorAll('.case-study .cs-impact-sub')]
    .map(el => el.closest('section'))
    .filter(Boolean);
  if (!sections.length) return;
  const visibility = new Map();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => visibility.set(e.target, e.intersectionRatio));
    let best = null, bestRatio = 0;
    visibility.forEach((r, sec) => { if (r > bestRatio) { bestRatio = r; best = sec; } });
    if (best && bestRatio > 0) {
      const sub = best.querySelector('.cs-impact-sub');
      navRight.textContent = sub ? sub.textContent : defaultLabel;
    } else {
      navRight.textContent = defaultLabel;
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  sections.forEach(s => obs.observe(s));
})();

// Escape returns to the index
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.location.href = '../';
});
