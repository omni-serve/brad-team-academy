// Language Toggle Functionality
let currentLanguage = "en";

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  updateLanguage();
  updateDirection();
  updatePlaceholders();
}

function updateLanguage() {
  const elements = document.querySelectorAll("[data-en][data-ar]");
  const langToggle = document.querySelector(".lang-text");

  elements.forEach((element) => {
    if (currentLanguage === "ar") {
      element.textContent = element.getAttribute("data-ar");
    } else {
      element.textContent = element.getAttribute("data-en");
    }
  });

  if (langToggle) {
    langToggle.textContent = currentLanguage === "en" ? "العربية" : "English";
  }
}

function updateDirection() {
  const html = document.documentElement;
  if (currentLanguage === "ar") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
  }
}

function updatePlaceholders() {
  const inputs = document.querySelectorAll("input[data-placeholder-en][data-placeholder-ar]");
  inputs.forEach((input) => {
    if (currentLanguage === "ar") {
      input.placeholder = input.getAttribute("data-placeholder-ar");
    } else {
      input.placeholder = input.getAttribute("data-placeholder-en");
    }
  });
}

// Enhanced Cinematic Splash Screen
document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  
  // Prevent scrolling during splash
  document.body.style.overflow = "hidden";

  // Create additional particles
  createSplashParticles();

  setTimeout(() => {
    splashScreen.classList.add("hidden");
    document.body.style.overflow = "auto";
    
    // Trigger entrance animations
    triggerEntranceAnimations();
    
    // Initialize parallax
    initParallax();
    
    // Remove splash screen from DOM
    setTimeout(() => {
      if (splashScreen) {
        splashScreen.remove();
      }
    }, 1000);
  }, 3000);
});

// Create dynamic particles for splash screen
function createSplashParticles() {
  const particlesContainer = document.querySelector('.splash-particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Parallax Scrolling Effect
function initParallax() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  const floatingElements = document.querySelectorAll('.floating-element');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxLayers.forEach((layer, index) => {
      const speed = parseFloat(layer.dataset.speed) || 0.5;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    floatingElements.forEach((element, index) => {
      const speed = parseFloat(element.dataset.speed) || 0.3;
      const yPos = -(scrolled * speed);
      const xPos = Math.sin(scrolled * 0.001 + index) * 20;
      element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    });

    // Parallax for section backgrounds
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const speed = 0.1;
      const yPos = rect.top * speed;
      
      if (section.querySelector('::before')) {
        section.style.setProperty('--parallax-y', `${yPos}px`);
      }
    });
  }

  // Throttled scroll event
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  }

  window.addEventListener('scroll', requestTick);
  updateParallax(); // Initial call
}

// Entrance Animations
function triggerEntranceAnimations() {
  const heroElements = document.querySelectorAll(".hero-content > *");
  const heroVisual = document.querySelector(".hero-visual");

  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });

  if (heroVisual) {
    setTimeout(() => {
      heroVisual.style.opacity = "1";
      heroVisual.style.transform = "translateX(0)";
    }, 800);
  }
}

// Enhanced Navigation with Cinematic Effects
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Enhanced navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  // Mobile menu toggle with animation
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    // Animate menu items
    if (navMenu.classList.contains("active")) {
      navLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";
        }, index * 100);
      });
    }
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Enhanced active link highlighting
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// Enhanced Smooth Scrolling
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        smoothScrollTo(offsetTop, 1200);
      }
    });
  });
});

// Enhanced smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Enhanced Intersection Observer for Cinematic Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Animate progress bars
      const progressBars = entry.target.querySelectorAll(".progress-fill");
      progressBars.forEach(bar => {
        const width = bar.style.width || "0%";
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });

      // Stagger animations for grid items
      if (entry.target.classList.contains('articles-grid') || 
          entry.target.classList.contains('cases-grid') || 
          entry.target.classList.contains('courses-grid') ||
          entry.target.classList.contains('team-grid')) {
        const items = entry.target.children;
        Array.from(items).forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".article-card, .case-card, .team-card, .course-card, .hero-card, .section-header, .articles-grid, .cases-grid, .courses-grid, .team-grid"
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

// Enhanced Button Interactions with Ripple Effect
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    button.addEventListener("click", function (e) {
      // Create enhanced ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
        z-index: 1;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });
});

// Enhanced ripple animation
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Enhanced Newsletter Form
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const input = newsletterForm.querySelector("input");
    const button = newsletterForm.querySelector("button");

    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (email && isValidEmail(email)) {
        // Enhanced success animation
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = "#10b981";
        button.style.transform = "scale(1.1)";
        input.value = "";
        input.style.borderColor = "#10b981";
        
        // Create success particles
        createSuccessParticles(button);
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-paper-plane"></i>';
          button.style.background = "";
          button.style.transform = "";
          input.style.borderColor = "";
        }, 3000);
      } else {
        // Enhanced error animation
        input.style.borderColor = "#ef4444";
        input.style.background = "rgba(239, 68, 68, 0.1)";
        input.style.animation = "shake 0.5s ease-in-out";
        
        setTimeout(() => {
          input.style.borderColor = "";
          input.style.background = "";
          input.style.animation = "";
        }, 2000);
      }
    });
  }
});

// Create success particles
function createSuccessParticles(element) {
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #10b981;
      border-radius: 50%;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      pointer-events: none;
      z-index: 10000;
      animation: successParticle 1s ease-out forwards;
      animation-delay: ${i * 0.1}s;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
}

// Add success particle animation
const successStyle = document.createElement("style");
successStyle.textContent = `
  @keyframes successParticle {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(successStyle);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced Back to Top Button
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    // Add click animation
    backToTopButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      backToTopButton.style.transform = "";
    }, 150);
    
    smoothScrollTo(0, 1200);
  });
});

// Enhanced Course Enrollment
document.addEventListener("DOMContentLoaded", () => {
  const enrollButtons = document.querySelectorAll(".course-card .btn");

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const originalText = this.querySelector("span").textContent;
      const buttonText = this.querySelector("span");
      const card = this.closest(".course-card");

      // Enhanced enrollment animation
      buttonText.textContent = "Enrolling...";
      this.disabled = true;
      this.style.opacity = "0.7";
      this.style.transform = "scale(0.95)";

      // Add loading spinner
      const spinner = document.createElement("div");
      spinner.style.cssText = `
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 8px;
      `;
      this.appendChild(spinner);

      setTimeout(() => {
        spinner.remove();
        buttonText.textContent = "Enrolled!";
        this.style.background = "#10b981";
        this.style.opacity = "1";
        this.style.transform = "scale(1.05)";
        
        // Create celebration effect
        createCelebrationEffect(card);

        setTimeout(() => {
          buttonText.textContent = originalText;
          this.style.background = "";
          this.style.transform = "";
          this.disabled = false;
        }, 3000);
      }, 2000);
    });
  });
});

// Create celebration effect
function createCelebrationEffect(element) {
  const rect = element.getBoundingClientRect();
  const colors = ['#10b981', '#dfa953', '#22538b'];
  
  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      pointer-events: none;
      z-index: 10000;
      animation: confetti 2s ease-out forwards;
      animation-delay: ${i * 0.1}s;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 2000);
  }
}

// Add confetti animation
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confetti {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 + 200}px) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// Initialize language and animations on page load
document.addEventListener("DOMContentLoaded", () => {
  updateLanguage();
  updateDirection();
  updatePlaceholders();

  // Enhanced placeholder image interactions
  const placeholders = document.querySelectorAll(".image-placeholder");
  placeholders.forEach((placeholder) => {
    placeholder.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });

    placeholder.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
});

// Performance optimization with debounce
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Enhanced Accessibility
document.addEventListener("DOMContentLoaded", () => {
  // Improve focus visibility for keyboard navigation
  const focusableElements = document.querySelectorAll('a[href], button, input, textarea, select');
  focusableElements.forEach((element) => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #10b981';
    });
    element.addEventListener('blur', () => {
      element.style.outline = '';
    });
  });
});
