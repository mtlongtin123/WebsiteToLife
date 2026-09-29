/**
 * WebsiteToLife — 20 Universal Site Enhancements
 * Drop this script at the end of <body> on any page.
 * Each feature is self-contained and activates automatically.
 */
(function () {
  'use strict';

  /* ── 1. DARK MODE TOGGLE ──────────────────────────────────────── */
  function initDarkMode() {
    const btn = document.createElement('button');
    btn.id = 'wtl-dark-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = '☀️';
    btn.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:9000;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .2s';
    const saved = localStorage.getItem('wtl-dark');
    if (saved === 'true') { document.documentElement.setAttribute('data-theme','dark'); btn.innerHTML = '☀️'; }
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('wtl-dark', String(!isDark));
      btn.innerHTML = isDark ? '🌙' : '☀️';
    });
    document.body.appendChild(btn);
  }

  /* ── 2. COOKIE BANNER ─────────────────────────────────────────── */
  function initCookieBanner() {
    if (localStorage.getItem('wtl-cookies')) return;
    const banner = document.createElement('div');
    banner.id = 'wtl-cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#1a2438;border-top:1px solid rgba(255,255,255,.1);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:sans-serif;font-size:13px;color:#8591a6';
    banner.innerHTML = `<span>🍪 We use cookies to improve your experience. <a href="#" style="color:#f05a28">Learn more</a></span><button onclick="document.getElementById('wtl-cookie-banner').remove();localStorage.setItem('wtl-cookies','1')" style="background:#f05a28;color:#fff;border:none;border-radius:8px;padding:8px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap">Got it</button>`;
    document.body.appendChild(banner);
  }

  /* ── 3. SITE SEARCH ───────────────────────────────────────────── */
  function initSiteSearch() {
    const trigger = document.createElement('button');
    trigger.setAttribute('aria-label', 'Search');
    trigger.style.cssText = 'position:fixed;top:14px;right:70px;z-index:9100;background:none;border:none;cursor:pointer;color:#8591a6;font-size:18px;padding:4px';
    trigger.innerHTML = '🔍';
    const overlay = document.createElement('div');
    overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:9200;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);align-items:flex-start;justify-content:center;padding-top:80px';
    overlay.innerHTML = `<div style="background:#131c2e;border:1px solid #1e2d44;border-radius:16px;width:min(600px,90vw);padding:24px"><input id="wtl-search-input" placeholder="Search this page…" style="width:100%;background:#0f1623;border:1px solid #1e2d44;border-radius:10px;padding:12px 16px;color:#fff;font-size:15px;outline:none" /><div id="wtl-search-results" style="margin-top:12px;max-height:300px;overflow-y:auto"></div></div>`;
    trigger.onclick = () => { overlay.style.display = 'flex'; overlay.querySelector('input').focus(); };
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.style.display = 'none'; });
    overlay.querySelector('input').addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      const res = document.getElementById('wtl-search-results');
      if (!q) { res.innerHTML = ''; return; }
      const texts = Array.from(document.querySelectorAll('h1,h2,h3,p,li,label')).filter(el => !el.closest('#wtl-search-results') && el.textContent.toLowerCase().includes(q));
      res.innerHTML = texts.slice(0,8).map(el => `<div style="padding:10px 12px;border-radius:8px;cursor:pointer;color:#fff;font-size:13px;border:1px solid transparent" onmouseover="this.style.background='#1a2438'" onmouseout="this.style.background=''" onclick="el.scrollIntoView({behavior:'smooth'});overlay.style.display='none'">${el.textContent.slice(0,120)}</div>`).join('') || '<p style="color:#8591a6;font-size:13px;padding:8px">No results found.</p>';
    });
    document.body.appendChild(trigger);
    document.body.appendChild(overlay);
  }

  /* ── 4. BACK TO TOP BUTTON ────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:130px;right:20px;z-index:9000;background:#f05a28;color:#fff;border:none;border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:18px;font-weight:700;opacity:0;transition:opacity .3s;display:flex;align-items:center;justify-content:center';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', () => { btn.style.opacity = window.scrollY > 300 ? '1' : '0'; });
    document.body.appendChild(btn);
  }

  /* ── 5. MOBILE MENU ───────────────────────────────────────────── */
  function initMobileMenu() {
    const nav = document.querySelector('nav, header nav, [role="navigation"]');
    if (!nav) return;
    const burger = document.createElement('button');
    burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '☰';
    burger.style.cssText = 'display:none;background:none;border:none;color:inherit;font-size:22px;cursor:pointer;padding:4px';
    const style = document.createElement('style');
    style.textContent = '@media(max-width:768px){.wtl-nav-links{display:none!important}.wtl-nav-links.open{display:flex!important;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:#131c2e;padding:16px;border-bottom:1px solid #1e2d44;z-index:999}#wtl-burger{display:block!important}}';
    nav.querySelectorAll('ul, .nav-links, [class*="links"]').forEach(el => el.classList.add('wtl-nav-links'));
    burger.id = 'wtl-burger';
    burger.onclick = () => document.querySelectorAll('.wtl-nav-links').forEach(el => el.classList.toggle('open'));
    nav.appendChild(burger);
    document.head.appendChild(style);
  }

  /* ── 6. LOADING ANIMATION ─────────────────────────────────────── */
  function initLoadingAnimation() {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#f05a28,#7c3aed);z-index:99999;width:0;transition:width .3s,opacity .4s';
    document.body.appendChild(bar);
    let w = 0;
    const interval = setInterval(() => { w = Math.min(w + Math.random() * 15, 85); bar.style.width = w + '%'; }, 200);
    window.addEventListener('load', () => { clearInterval(interval); bar.style.width = '100%'; setTimeout(() => { bar.style.opacity = '0'; }, 400); });
  }

  /* ── 7. HOVER STATES ──────────────────────────────────────────── */
  function initHoverStates() {
    const style = document.createElement('style');
    style.textContent = 'a:not([class]):hover{opacity:.8;text-decoration:underline} button:not([id^="wtl"]):hover{filter:brightness(1.1)} img:hover{transform:scale(1.02);transition:transform .2s}';
    document.head.appendChild(style);
  }

  /* ── 8. SCROLL PROGRESS BAR ───────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:#7c3aed;z-index:9999;width:0;transition:width .1s';
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    });
    document.body.appendChild(bar);
  }

  /* ── 9. COPY BUTTON (on code/pre blocks) ─────────────────────── */
  function initCopyButtons() {
    document.querySelectorAll('pre, code').forEach(el => {
      if (el.tagName === 'CODE' && el.closest('pre')) return;
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;display:inline-block;width:100%';
      el.parentNode.insertBefore(wrap, el);
      wrap.appendChild(el);
      const btn = document.createElement('button');
      btn.textContent = 'Copy';
      btn.style.cssText = 'position:absolute;top:8px;right:8px;background:#f05a28;color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600';
      btn.onclick = () => { navigator.clipboard.writeText(el.textContent); btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); };
      wrap.appendChild(btn);
    });
  }

  /* ── 10. PRINT STYLESHEET ─────────────────────────────────────── */
  function initPrintStyle() {
    const style = document.createElement('style');
    style.textContent = '@media print{#wtl-dark-toggle,#wtl-cookie-banner,.wtl-float-contact,button[id^="wtl"]{display:none!important}body{color:#000!important;background:#fff!important}a{color:#000!important}@page{margin:1in}}';
    document.head.appendChild(style);
  }

  /* ── 11. STICKY HEADER ────────────────────────────────────────── */
  function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '1000';
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.4)' : 'none';
    });
  }

  /* ── 12. SKIP TO CONTENT ──────────────────────────────────────── */
  function initSkipLink() {
    const main = document.querySelector('main, #main, .main, [role="main"]');
    if (!main) { main && (main.id = 'wtl-main'); }
    const skip = document.createElement('a');
    skip.href = '#wtl-main';
    skip.textContent = 'Skip to content';
    skip.style.cssText = 'position:absolute;top:-40px;left:0;background:#f05a28;color:#fff;padding:8px 16px;font-size:13px;font-weight:600;z-index:99999;border-radius:0 0 8px 0;text-decoration:none;transition:top .2s';
    skip.addEventListener('focus', () => { skip.style.top = '0'; });
    skip.addEventListener('blur', () => { skip.style.top = '-40px'; });
    if (document.querySelector('main, #main')) skip.href = '#' + (document.querySelector('main, #main').id || (document.querySelector('main').id = 'wtl-main'));
    document.body.prepend(skip);
  }

  /* ── 13. PASSWORD VISIBILITY TOGGLE ──────────────────────────── */
  function initPwToggle() {
    document.querySelectorAll('input[type="password"]').forEach(input => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = '👁';
      btn.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:15px;color:#8591a6';
      const wrap = input.parentElement;
      const wrapStyle = getComputedStyle(wrap).position;
      if (wrapStyle === 'static') wrap.style.position = 'relative';
      btn.onclick = () => { input.type = input.type === 'password' ? 'text' : 'password'; btn.innerHTML = input.type === 'password' ? '👁' : '🙈'; };
      wrap.appendChild(btn);
    });
  }

  /* ── 14. UTM TRACKING ─────────────────────────────────────────── */
  function initUTM() {
    const params = new URLSearchParams(location.search);
    const utm = {};
    ['source','medium','campaign','term','content'].forEach(k => { const v = params.get('utm_'+k); if (v) utm[k] = v; });
    if (Object.keys(utm).length) {
      try { localStorage.setItem('wtl-utm', JSON.stringify({ ...utm, ts: Date.now() })); } catch(e){}
      document.querySelectorAll('form').forEach(form => {
        Object.entries(utm).forEach(([k,v]) => {
          const hidden = document.createElement('input');
          hidden.type = 'hidden'; hidden.name = 'utm_'+k; hidden.value = v;
          form.appendChild(hidden);
        });
      });
    }
  }

  /* ── 15. FORM SUCCESS STATE ───────────────────────────────────── */
  function initFormSuccess() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', e => {
        if (form.dataset.wtlHandled) return;
        setTimeout(() => {
          if (!document.getElementById('wtl-success-'+form.id)) {
            const msg = document.createElement('div');
            msg.id = 'wtl-success-'+(form.id||Math.random());
            msg.style.cssText = 'background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:10px;padding:14px 18px;margin-top:12px;color:#22c55e;font-size:14px;font-weight:500';
            msg.textContent = '✓ Got it! We\'ll be in touch shortly.';
            form.parentNode.insertBefore(msg, form.nextSibling);
          }
        }, 100);
      });
    });
  }

  /* ── 16. FORM ERROR STATE ─────────────────────────────────────── */
  function initFormErrors() {
    const style = document.createElement('style');
    style.textContent = 'input.wtl-error,textarea.wtl-error,select.wtl-error{border-color:#ef4444!important;background:rgba(239,68,68,.06)!important}.wtl-error-msg{color:#ef4444;font-size:12px;margin-top:4px}';
    document.head.appendChild(style);
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('wtl-error');
            let msg = field.parentNode.querySelector('.wtl-error-msg');
            if (!msg) { msg = document.createElement('div'); msg.className = 'wtl-error-msg'; field.parentNode.appendChild(msg); }
            msg.textContent = 'This field is required.';
            field.addEventListener('input', () => { field.classList.remove('wtl-error'); msg.remove(); }, { once: true });
          }
        });
      });
    });
  }

  /* ── 17. CONFIRMATION MODALS ──────────────────────────────────── */
  function initConfirmModals() {
    document.querySelectorAll('[data-confirm]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const msg = el.dataset.confirm || 'Are you sure?';
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center';
        modal.innerHTML = `<div style="background:#131c2e;border:1px solid #1e2d44;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center"><p style="color:#fff;font-size:16px;margin-bottom:24px">${msg}</p><div style="display:flex;gap:12px;justify-content:center"><button id="wtl-confirm-yes" style="background:#f05a28;color:#fff;border:none;border-radius:10px;padding:10px 24px;cursor:pointer;font-weight:600">Confirm</button><button id="wtl-confirm-no" style="background:#1a2438;color:#8591a6;border:1px solid #1e2d44;border-radius:10px;padding:10px 24px;cursor:pointer">Cancel</button></div></div>`;
        document.body.appendChild(modal);
        modal.querySelector('#wtl-confirm-yes').onclick = () => { modal.remove(); el.dataset.confirmedAction && eval(el.dataset.confirmedAction); };
        modal.querySelector('#wtl-confirm-no').onclick = () => modal.remove();
      });
    });
  }

  /* ── 18. LAST UPDATED DATE ────────────────────────────────────── */
  function initLastUpdated() {
    const el = document.querySelector('[data-last-updated], .last-updated, #last-updated');
    if (el) {
      el.textContent = 'Last updated: ' + new Date(document.lastModified).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
    }
  }

  /* ── 19. EXPANDABLE FAQ ───────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item, [data-faq]').forEach(item => {
      const q = item.querySelector('.faq-question, [data-faq-question], h3, h4');
      const a = item.querySelector('.faq-answer, [data-faq-answer], p');
      if (!q || !a) return;
      a.style.cssText = 'max-height:0;overflow:hidden;transition:max-height .3s ease';
      q.style.cursor = 'pointer';
      q.addEventListener('click', () => {
        const open = a.style.maxHeight !== '0px' && a.style.maxHeight !== '';
        a.style.maxHeight = open ? '0' : a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ── 20. FLOATING CONTACT BUTTON ──────────────────────────────── */
  function initFloatingContact() {
    const phone = document.querySelector('[href^="tel:"]')?.getAttribute('href');
    const email = document.querySelector('[href^="mailto:"]')?.getAttribute('href');
    if (!phone && !email) return;
    const btn = document.createElement('div');
    btn.className = 'wtl-float-contact';
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9000;display:flex;flex-direction:column;gap:8px;align-items:flex-end';
    if (phone) btn.innerHTML += `<a href="${phone}" style="display:flex;align-items:center;gap:8px;background:#22c55e;color:#fff;text-decoration:none;padding:10px 16px;border-radius:100px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(34,197,94,.4)">📞 Call Us</a>`;
    if (email) btn.innerHTML += `<a href="${email}" style="display:flex;align-items:center;gap:8px;background:#f05a28;color:#fff;text-decoration:none;padding:10px 16px;border-radius:100px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(240,90,40,.4)">✉️ Email Us</a>`;
    document.body.appendChild(btn);
  }

  /* ── INIT ALL ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initSkipLink();
    initStickyHeader();
    initDarkMode();
    initCookieBanner();
    initSiteSearch();
    initBackToTop();
    initMobileMenu();
    initHoverStates();
    initScrollProgress();
    initCopyButtons();
    initPrintStyle();
    initPwToggle();
    initUTM();
    initFormSuccess();
    initFormErrors();
    initConfirmModals();
    initLastUpdated();
    initFAQ();
    initFloatingContact();
  });

})();
