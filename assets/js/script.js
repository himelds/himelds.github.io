'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* SIDEBAR */
const sidebar    = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
}

/* NAV */
const navLinks = $$('[data-nav-link]');
const pages    = $$('[data-page]');

function navigateTo(pageName) {
  const target = pageName.toLowerCase().trim();
  pages.forEach(p => p.classList.toggle('active', p.dataset.page === target));
  navLinks.forEach(l => l.classList.toggle('active', l.textContent.toLowerCase().trim() === target));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(l => l.addEventListener('click', () => navigateTo(l.textContent)));
$$('[data-goto]').forEach(b => b.addEventListener('click', () => navigateTo(b.dataset.goto)));

/* ══════════════════════════════
   PAGE LOADER
══════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('site-loader');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('hidden');
  }

  // Hide as soon as the DOM is interactive (fonts/images not required)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready — hide on next tick so the page paints first
    setTimeout(hideLoader, 80);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 80));
  }

  // Also hide on full load if it happens sooner somehow
  window.addEventListener('load', hideLoader);

  // Hard cap: never show loader for more than 800ms no matter what
  setTimeout(hideLoader, 800);
}

/* ══════════════════════════════
   SCROLL-REVEAL (IntersectionObserver)
   - Fades + slides up on enter
   - Resets when scrolled back out of view
══════════════════════════════ */

// ── Old .reveal / .reveal-left / .reveal-right / .reveal-scale ──
// These use .visible class (kept for compatibility)
function initLegacyReveal() {
  const els = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Reset so animation replays on re-entry
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── New .section-reveal — whole sections ──
function initSectionReveal() {
  const els = $$('.section-reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── New .card-reveal — individual cards with stagger ──
function initCardReveal() {
  const cards = $$('.card-reveal');
  if (!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Reset — allows replay when scrolling back up
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -10px 0px' });
  cards.forEach(el => obs.observe(el));
}

// ── Stat number pop (one-time, no reset) ──
function initStatPop() {
  const stats = $$('.stat-number[data-target]');
  if (!stats.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('popped')) {
        entry.target.classList.add('popped');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(el => obs.observe(el));
}

// ── Run all reveal systems ──
function initAllReveal() {
  initLegacyReveal();
  initSectionReveal();
  initCardReveal();
}

// Re-run when navigating pages (new content becomes active)
navLinks.forEach(l => l.addEventListener('click', () => {
  navigateTo(l.textContent);
  // Short delay so the newly active article is in the DOM
  setTimeout(initAllReveal, 80);
}));

// Initial run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAllReveal();
  initStatPop();
});

/* ══════════════════════════════
   PROJECT MODAL
══════════════════════════════ */
const projectModal        = $('#projectModal');
const projectModalOverlay = $('#projectModalOverlay');
const pmoImg       = $('#pmoImg');
const pmoImgCaption = $('#pmoImgCaption');
const pmoImgPrev   = $('#pmoImgPrev');
const pmoImgNext   = $('#pmoImgNext');
const pmoCategory  = $('#pmoCategory');
const pmoTitle     = $('#pmoTitle');
const pmoDomain    = $('#pmoDomain');
const pmoIntro     = $('#pmoIntro');
const pmoGithub    = $('#pmoGithub');
const pmoLinkedin  = $('#pmoLinkedin');
const pmoChecklist = $('#pmoChecklist');
const pmoYoutube   = $('#pmoYoutube');
const pmoVideoCol  = $('#pmoVideoCol');
const pmoLiveSection = $('#pmoLiveSection');
const pmoLiveFrame   = $('#pmoLiveFrame');

let sliderImages = [], sliderIndex = 0;

function setSliderImage(idx) {
  if (!sliderImages.length) return;
  sliderIndex = (idx + sliderImages.length) % sliderImages.length;
  pmoImg.style.opacity = '0';
  setTimeout(() => { pmoImg.src = sliderImages[sliderIndex]; pmoImg.style.opacity = '1'; }, 150);
  const show = sliderImages.length > 1;
  pmoImgPrev.style.display = show ? 'flex' : 'none';
  pmoImgNext.style.display = show ? 'flex' : 'none';
}

if (pmoImgPrev) pmoImgPrev.addEventListener('click', () => setSliderImage(sliderIndex - 1));
if (pmoImgNext) pmoImgNext.addEventListener('click', () => setSliderImage(sliderIndex + 1));

function openProjectModal(el) {
  const d = el.dataset;
  pmoCategory.textContent = d.modalCategory || '';
  pmoTitle.textContent    = d.modalTitle    || '';
  pmoDomain.textContent   = d.modalDomain   || d.modalTools || '';
  pmoIntro.textContent    = d.modalIntro    || '';
  pmoGithub.href    = d.modalGithub   || '#';
  // LinkedIn: show icon + label row only if URL exists
  const pmoLinkedinRow = pmoLinkedin ? pmoLinkedin.closest('.pmo-btn-row') : null;
  if (d.modalLinkedin) {
    pmoLinkedin.href = d.modalLinkedin;
    if (pmoLinkedinRow) pmoLinkedinRow.style.display = '';
  } else {
    pmoLinkedin.href = '#';
    if (pmoLinkedinRow) pmoLinkedinRow.style.display = 'none';
  }

  sliderImages = d.modalImgs ? d.modalImgs.split('|').filter(Boolean) : [d.modalImg || ''];
  pmoImg.src = sliderImages[0] || '';
  pmoImg.alt = d.modalTitle || '';
  pmoImgCaption.textContent = d.modalTitle ? `Preview — ${d.modalTitle}` : '';
  setSliderImage(0);

  pmoChecklist.innerHTML = '';
  (d.modalDetails || '').split('|').filter(s => s.trim()).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text.trim();
    pmoChecklist.appendChild(li);
  });

  const ytSrc = d.modalYoutube || '';
  if (ytSrc) { pmoYoutube.src = ytSrc + '?rel=0'; pmoVideoCol.style.display = 'block'; }
  else        { pmoYoutube.src = '';               pmoVideoCol.style.display = 'none'; }

  const liveSrc = d.modalLive || '';
  if (liveSrc) { pmoLiveFrame.src = liveSrc; pmoLiveSection.style.display = 'block'; }
  else         { pmoLiveFrame.src = '';      pmoLiveSection.style.display = 'none'; }

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
  pmoYoutube.src = ''; pmoLiveFrame.src = '';
}

$$('.project-card, .featured-card').forEach(el => {
  if (!el.dataset.modalTitle) return;
  const trigger = el.classList.contains('featured-card') ? el : el.querySelector('.proj-btn');
  if (trigger) trigger.addEventListener('click', () => openProjectModal(el));
});

$('#projectModalClose').addEventListener('click', closeProjectModal);
if (projectModalOverlay) projectModalOverlay.addEventListener('click', closeProjectModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
});

/* ══════════════════════════════
   CERTIFICATE MODAL
══════════════════════════════ */
const certModal         = $('#certModal');
const certModalOverlay  = $('#certModalOverlay');
const certModalImg      = $('#certModalImg');
const certModalPlatform = $('#certModalPlatform');
const certModalYear     = $('#certModalYear');
const certModalTitle    = $('#certModalTitle');
const certModalIssuer   = $('#certModalIssuer');
const certModalSkills   = $('#certModalSkills');
const certModalVerify   = $('#certModalVerify');

function openCertModal(el) {
  const d = el.dataset;
  certModalImg.src              = d.certImg    || '';
  certModalImg.alt              = d.certTitle  || '';
  certModalTitle.textContent    = d.certTitle  || '';
  certModalIssuer.textContent   = d.certIssuer || '';
  certModalYear.textContent     = d.certDate   || '';
  certModalVerify.href          = d.certVerify || '#';

  // Platform badge — derive colour class from issuer
  const issuer = (d.certIssuer || '').toLowerCase();
  let platformClass = 'codebasics';
  if (issuer.includes('google'))   platformClass = 'google';
  else if (issuer.includes('coursera') && !issuer.includes('codebasics')) platformClass = 'coursera';
  certModalPlatform.textContent = d.certIssuer || '';
  certModalPlatform.className   = `cert-modal-platform ${platformClass}`;

  // Skills tags
  certModalSkills.innerHTML = '';
  (d.certSkills || '').split('·').forEach(s => {
    const t = s.trim();
    if (!t) return;
    const span = document.createElement('span');
    span.className = 'cert-skill-tag';
    span.textContent = t;
    certModalSkills.appendChild(span);
  });

  certModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  $('#certModalClose').focus();
}

function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = '';
}

$$('.cert-card').forEach(card => {
  const btn = card.querySelector('.cert-card-btn');
  if (btn) btn.addEventListener('click', () => openCertModal(card));
});

[$('#certModalClose'), $('#certModalCloseBtn')].forEach(b => {
  if (b) b.addEventListener('click', closeCertModal);
});
if (certModalOverlay) certModalOverlay.addEventListener('click', closeCertModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) closeCertModal();
});

/* ══════════════════════════════
   CONTACT FORM (Formspree)
══════════════════════════════ */
const cfName    = $('#cf-name');
const cfEmail   = $('#cf-email');
const cfSubject = $('#cf-subject');
const cfMessage = $('#cf-message');
const cfSubmit  = $('#cfSubmit');
const cfReset   = $('#cfReset');
const formSuccess  = $('#formSuccess');
const formWrap     = $('#contactFormWrap');
const successEmail = $('#successEmail');

function setError(inputEl, errorId, msg) {
  const err = $('#' + errorId);
  if (!inputEl || !err) return;
  if (msg) { inputEl.classList.add('error'); err.textContent = msg; }
  else     { inputEl.classList.remove('error'); err.textContent = ''; }
}

function validateForm() {
  let valid = true;
  const name    = cfName    ? cfName.value.trim()    : '';
  const email   = cfEmail   ? cfEmail.value.trim()   : '';
  const subject = cfSubject ? cfSubject.value.trim() : '';
  const message = cfMessage ? cfMessage.value.trim() : '';

  if (!name)    { setError(cfName,    'err-name',    'Please enter your name.');                valid = false; } else setError(cfName,    'err-name',    '');
  if (!email)   { setError(cfEmail,   'err-email',   'Please enter your email.');               valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(cfEmail, 'err-email', 'Please enter a valid email.'); valid = false; }
  else            setError(cfEmail,   'err-email',   '');
  if (!subject) { setError(cfSubject, 'err-subject', 'Please enter a subject.');                valid = false; } else setError(cfSubject, 'err-subject', '');
  if (!message || message.length < 10) { setError(cfMessage, 'err-message', 'Message must be at least 10 characters.'); valid = false; } else setError(cfMessage, 'err-message', '');
  return valid;
}

[cfName, cfEmail, cfSubject, cfMessage].forEach((el, i) => {
  if (!el) return;
  const ids = ['err-name','err-email','err-subject','err-message'];
  el.addEventListener('input', () => setError(el, ids[i], ''));
});

if (cfSubmit) {
  cfSubmit.addEventListener('click', async () => {
    if (!validateForm()) return;
    const btnText = $('#cfBtnText');
    cfSubmit.disabled = true;
    if (btnText) btnText.textContent = 'Sending…';
    const formData = { name: cfName.value.trim(), email: cfEmail.value.trim(), subject: cfSubject.value.trim(), message: cfMessage.value.trim() };
    try {
      const FORMSPREE_ID = 'xdawkpnr';
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok || FORMSPREE_ID === 'YOUR_FORM_ID') {
        if (successEmail) successEmail.textContent = formData.email;
        if (formWrap)    formWrap.style.display    = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      } else {
        const data = await res.json();
        alert(data.error || 'Something went wrong. Please try emailing directly.');
        cfSubmit.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
      }
    } catch {
      if (successEmail) successEmail.textContent = formData.email;
      if (formWrap)    formWrap.style.display    = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    }
  });
}

if (cfReset) {
  cfReset.addEventListener('click', () => {
    [cfName, cfEmail, cfSubject, cfMessage].forEach(el => { if (el) el.value = ''; });
    if (formWrap)    formWrap.style.display    = 'block';
    if (formSuccess) formSuccess.style.display = 'none';
    if (cfSubmit)  { cfSubmit.disabled = false; }
    const btnText = $('#cfBtnText');
    if (btnText) btnText.textContent = 'Send Message';
  });
}
