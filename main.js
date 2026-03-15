// ============================================================
// GURUKUL CLASSES – Modern Vanilla JS (No jQuery)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Progress Bar ----
  const scrollProgress = document.getElementById('scrollProgress');
  
  // ---- Scroll Top Button ----
  const scrollTopBtn = document.getElementById('scrollTop');

  // ---- Navbar ----
  const navbar = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Combined scroll handler (throttled with rAF)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgress && docHeight > 0) {
          scrollProgress.style.width = (scrollY / docHeight * 100) + '%';
        }

        // Navbar scrolled state
        if (navbar) {
          navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Scroll-to-top visibility
        if (scrollTopBtn) {
          scrollTopBtn.classList.toggle('visible', scrollY > 400);
        }

        // Active nav link
        updateActiveNav();

        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile nav toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.pageYOffset >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Reveal on Scroll (Intersection Observer) ----
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.target, 10);
          animateCounter(entry.target, target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  // ---- Swiper Carousel for Students ----
  if (typeof Swiper !== 'undefined') {
    new Swiper('.students-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('धन्यवाद! तुमचा संदेश आम्हाला मिळाला आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.');
      contactForm.reset();
    });
  }

  // ---- Gallery Lightbox (simple) ----
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn 0.3s ease';
      
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      bigImg.style.cssText = 'max-width:90%;max-height:90vh;border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,0.4)';
      
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      
      overlay.addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
      });
    });
  });

  // Console message
  console.log('🎓 गुरुकुल क्लासेस – जिथे प्रत्येक मुलाचे स्वप्न साकार होते! 🌟');
});