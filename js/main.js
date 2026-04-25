/* =========================================================
   FFDY Site — Main JS
   ========================================================= */

// ----- Nav scroll shadow --------------------------------
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ----- Dropdown click-to-open ---------------------------
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  dropdown.querySelector('span').addEventListener('click', e => {
    const isOpen = dropdown.classList.toggle('open');
    e.stopPropagation();
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
});

// ----- Hamburger / mobile nav ---------------------------
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ----- Language toggle ----------------------------------
function initLangToggle() {
  const currentPath = window.location.pathname;
  const isZh = currentPath.startsWith('/zh') || currentPath.includes('/zh/');

  // Desktop toggle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const lang = btn.dataset.lang;
    if ((lang === 'zh' && isZh) || (lang === 'en' && !isZh)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      if (lang === 'zh' && !isZh) {
        // Go to Chinese equivalent
        const zhPath = getZhPath(currentPath);
        window.location.href = zhPath;
      } else if (lang === 'en' && isZh) {
        // Go to English equivalent
        const enPath = getEnPath(currentPath);
        window.location.href = enPath;
      }
    });
  });
}

function getZhPath(path) {
  // Strip leading slash, strip .html
  const clean = path.replace(/^\//, '').replace(/\.html$/, '') || 'index';
  const page = clean === '' ? 'index' : clean;
  return `/zh/${page}.html`;
}

function getEnPath(path) {
  // /zh/about.html -> /about.html
  return path.replace(/\/zh\//, '/').replace(/^zh\//, '/');
}

initLangToggle();

// ----- Active nav link ----------------------------------
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href.replace(/^\.\.\//, '').replace(/^\//, ''))) {
      a.classList.add('active');
    }
  });
})();

// ----- Fade-up on scroll --------------------------------
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ----- Year tabs (photos page) --------------------------
(function () {
  const tabs = document.querySelectorAll('.year-tab');
  const years = document.querySelectorAll('.gallery-year');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      years.forEach(y => y.classList.remove('active'));
      tab.classList.add('active');
      const year = tab.dataset.year;
      const target = document.querySelector(`.gallery-year[data-year="${year}"]`);
      if (target) target.classList.add('active');
    });
  });
})();

// ----- Contact form submit --------------------------------
(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.disabled = true;
    btn.style.background = '#059669';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
})();

// ----- Donate amount selection --------------------------
(function () {
  const cards = document.querySelectorAll('.donate-option-card');
  const customInput = document.querySelector('#custom-amount');
  if (!cards.length) return;
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (customInput) customInput.value = '';
    });
  });
  if (customInput) {
    customInput.addEventListener('input', () => {
      cards.forEach(c => c.classList.remove('selected'));
    });
  }
})();
