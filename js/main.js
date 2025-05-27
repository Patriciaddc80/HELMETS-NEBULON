// Utility functions
const utils = {
  // Throttle function to limit execution rate
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },

  // Debounce function to delay execution
  debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }
  },

  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Handle image loading errors
  handleImageError() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'img/placeholder.jpg'; // Fallback image
        this.alt = 'Image not available';
      });
    });
  }
};

// DOM Elements
const header = document.getElementById('header');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Intersection Observer for header background
const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add('bg-gray-900/95', 'backdrop-blur-sm', 'shadow-lg');
      } else {
        header.classList.remove('bg-gray-900/95', 'backdrop-blur-sm', 'shadow-lg');
      }
    });
  },
  { threshold: 0.1 }
);

// Observe the hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
  headerObserver.observe(heroSection);
}

// Mobile menu functionality
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  });
}

// Smooth scroll for anchor links
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

// Form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    const errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    if (!data.message.trim()) errors.message = 'Message is required';
    
    if (Object.keys(errors).length > 0) {
      // Show errors
      Object.entries(errors).forEach(([field, message]) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (input) {
          input.classList.add('border-red-500');
          const errorElement = document.createElement('p');
          errorElement.className = 'text-red-500 text-sm mt-1';
          errorElement.textContent = message;
          input.parentNode.appendChild(errorElement);
        }
      });
      return;
    }
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mt-4';
      successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
}

// Image loading functionality
const initializeImages = () => {
  // Handle regular images
  document.querySelectorAll('img:not([data-src])').forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease-in-out';
      });
    }
  });

  // Handle lazy loaded images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Handle image errors
  utils.handleImageError();
};

// Add animation to stats in About page
const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50; // Adjust speed here
      
      const updateStat = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateStat);
        } else {
          stat.textContent = target;
        }
      };
      
      updateStat();
    });
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(document.querySelector('.stats-section'));
}

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('transform', 'scale-105', 'transition-transform', 'duration-300');
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.remove('transform', 'scale-105', 'transition-transform', 'duration-300');
  });
});

// Cookie consent banner
const showCookieConsent = () => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    const banner = document.createElement('div');
    banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50';
    banner.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p class="mb-4 md:mb-0">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <div class="flex space-x-4">
          <button id="accept-cookies" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">Accept</button>
          <a href="cookie-policy.html" class="text-blue-400 hover:text-blue-300">Learn More</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      banner.remove();
    });
  }
};

// Show cookie consent banner when page loads
showCookieConsent();

// Product Carousel
function initProductCarousel() {
  const carousel = document.getElementById('product-carousel');
  const cards = carousel.querySelectorAll('div[class*="min-w-"]');
  const dots = document.querySelectorAll('[data-index]');
  const prevBtn = document.getElementById('prev-product');
  const nextBtn = document.getElementById('next-product');
  let currentIndex = 0;
  let isAnimating = false;
  let autoScrollInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;
  const transitionDuration = 700; // Duración de la transición en ms

  // Función para actualizar el carrusel
  function updateCarousel(index, animate = true) {
    if (isAnimating) return;
    isAnimating = true;

    const cardWidth = cards[0].offsetWidth;
    const translateX = -index * cardWidth;
    
    carousel.style.transition = animate ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none';
    carousel.style.transform = `translateX(${translateX}px)`;

    // Actualizar dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-blue-400', i === index);
      dot.classList.toggle('bg-gray-600', i !== index);
    });

    // Actualizar botones
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;
    prevBtn.style.opacity = index === 0 ? '0.5' : '1';
    nextBtn.style.opacity = index === cards.length - 1 ? '0.5' : '1';

    // Añadir efecto de fade a las tarjetas
    cards.forEach((card, i) => {
      card.style.opacity = i === index ? '1' : '0.7';
      card.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
    });

    setTimeout(() => {
      isAnimating = false;
    }, transitionDuration);
  }

  // Función para iniciar el auto-scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!carousel.matches(':hover')) {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel(currentIndex);
      }
    }, 5000); // Cambiar cada 5 segundos
  }

  // Inicializar
  updateCarousel(currentIndex, false);
  startAutoScroll();

  // Event Listeners para los dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel(currentIndex);
      clearInterval(autoScrollInterval);
      startAutoScroll();
    });
  });

  // Event Listeners para los botones
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel(currentIndex);
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel(currentIndex);
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }
  });

  // Pausar en hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    startAutoScroll();
  });

  // Soporte para touch
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoScrollInterval);
  });

  carousel.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', () => {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe derecha
        currentIndex--;
      } else if (swipeDistance < 0 && currentIndex < cards.length - 1) {
        // Swipe izquierda
        currentIndex++;
      }
      updateCarousel(currentIndex);
    }
    
    startAutoScroll();
  });

  // Responsive
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    cards.forEach(card => {
      if (isMobile) {
        card.style.minWidth = '100%';
      } else if (isTablet) {
        card.style.minWidth = '50%';
      } else {
        card.style.minWidth = '33.333%';
      }
    });
    
    updateCarousel(currentIndex, false);
  }

  window.addEventListener('resize', handleResize);
  handleResize();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeImages();
  initProductCarousel();
}); 