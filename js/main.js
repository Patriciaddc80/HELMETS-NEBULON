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
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Handle image loading errors
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
});

// Email form handling
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('#email');
  const errorSpan = form.querySelector('#emailError');
  
  // Reset previous error
  errorSpan.className = 'hidden block mt-2 text-yellow-400 text-sm';
  
  // Check if empty
  if (!emailInput.value.trim()) {
    errorSpan.textContent = 'Please fill in your email address';
    errorSpan.classList.remove('hidden');
    return false;
  }

  // Validate email
  const email = emailInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    errorSpan.textContent = 'Please enter a valid email address and try again';
    errorSpan.classList.remove('hidden');
    return false;
  }

  // Simulate form submission
  errorSpan.textContent = 'Submitting...';
  errorSpan.classList.remove('hidden');
  
  // Simulate API call
  setTimeout(() => {
    errorSpan.textContent = 'Thank you for subscribing!';
    errorSpan.className = 'block mt-2 text-green-500 text-sm';
    form.reset();
  }, 1000);

  return false;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  utils.lazyLoadImages();
}); 