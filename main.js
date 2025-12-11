 // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

      
    // Combine scroll handlers for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          
          // Navbar scroll effect
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            if (scrolled > 50) {
              navbar.classList.add('scrolled');
              navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
              navbar.classList.remove('scrolled');
              navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            }
          }
          
          // Parallax effect on hero section
          const hero = document.querySelector('.hero-section');
          if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });

    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('धन्यवाद! तुमचा संदेश आम्हाला मिळाला आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.');
      this.reset();
    });

    // Gallery item click handler
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function() {
        // Gallery modal functionality can be added here
        console.log('Gallery item clicked');
      });
    });

    // Console message
    console.log('🎓 गुरुकुल क्लासेस - जिथे प्रत्येक मुलाचे स्वप्न साकार होते! 🌟');
   
      $(document).ready(function(){
        var $carousel = $('#topStudentsCarousel');
        $carousel.owlCarousel({
          rtl: true,
          loop: true,
          margin: 10,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 2500,
          autoplayHoverPause: true,
          smartSpeed: 900,
          responsive: {
            0: {
              items: 1
            },
            576: {
              items: 1
            },
            768: {
              items: 2
            },
            992: {
              items: 3
            },
            1200: {
              items: 4
            }
          }
        });
        $carousel.find('.student-card').hover(
          function() {
            $carousel.trigger('stop.owl.autoplay');
          },
          function() {
            $carousel.trigger('play.owl.autoplay',[2500]);
          }
        );
      });
      
    // Add counter animation for hero stats
    function animateCounter(element, target) {
      const duration = 2000; // Fixed 2 second duration
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
        }
      }
      
      requestAnimationFrame(update);
    }
    
    // Trigger counter animation when stats become visible
    const observerOptions = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          const h3Element = entry.target.querySelector('h3');
          if (h3Element) {
            const statsText = h3Element.textContent;
            const number = parseInt(statsText.replace(/\D/g, ''));
            if (!isNaN(number) && number > 0) {
              h3Element.textContent = '0';
              animateCounter(h3Element, number);
            }
          }
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.hero-stat').forEach(stat => {
      observer.observe(stat);
    });
    
    // Add smooth reveal animation for cards
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card-modern, .subject-card, .testimonial-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(card);
    });
    