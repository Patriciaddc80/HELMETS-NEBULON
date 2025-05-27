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
  }
};

// Mobile menu functionality
const mobileMenu = {
  init() {
    const header = document.getElementById('header');
    if (!header) return;

    header.addEventListener('click', utils.throttle(function(e) {
      if (e.target.id === 'hamburger' || e.target.closest('#hamburger')) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.toggle('hidden');
        }
      }
    }, 250));
  }
};

// Form handling
const forms = {
  init() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', utils.debounce(function(e) {
        e.preventDefault();
        // Add your form submission logic here
      }, 300));
    });
  }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  mobileMenu.init();
  forms.init();
  utils.lazyLoadImages();
}); 