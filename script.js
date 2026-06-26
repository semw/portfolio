// Mudassar Waheed — portfolio interactions
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  var navLinks = document.getElementById('navLinks');
  var burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        if (burger) burger.classList.remove('open');
      });
    });
  }

  // Profile dropdown
  var chip = document.getElementById('profileChip');
  var panel = document.getElementById('profilePanel');
  if (chip && panel) {
    chip.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.profilewrap')) panel.classList.remove('open');
    });
  }

  // Scroll reveal animations
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

// Contact form -> sends via Formspree (no email app opens)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = 'Sending...'; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          if (btn) { btn.innerHTML = 'Message Sent ✓'; }
          setTimeout(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = original; }
          }, 4000);
        } else {
          if (btn) { btn.disabled = false; btn.innerHTML = original; }
          alert('Something went wrong. Please email se.mudassarw@gmail.com directly.');
        }
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
        alert('Network error. Please email se.mudassarw@gmail.com directly.');
      });
    });
  }
});
