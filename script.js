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

  // Contact form -> opens email client (no backend needed)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var body = 'Name: ' + g('cf-name') + '\nEmail: ' + g('cf-email') + '\nPhone: ' + g('cf-phone') + '\n\n' + g('cf-msg');
      // EDIT: change the email address below to your own
      window.location.href = 'mailto:se.mudassarw@gmail.com?subject=' + encodeURIComponent(g('cf-subject') || 'Project Inquiry') + '&body=' + encodeURIComponent(body);
    });
  }
});
