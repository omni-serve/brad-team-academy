// Language Toggle Functionality
let currentLanguage = "en"

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en"
  updateLanguage()
  updateDirection()
  updatePlaceholders()
}

function updateLanguage() {
  const elements = document.querySelectorAll("[data-en][data-ar]")
  const langToggle = document.querySelector(".lang-text")

  elements.forEach((element) => {
    if (currentLanguage === "ar") {
      element.textContent = element.getAttribute("data-ar")
    } else {
      element.textContent = element.getAttribute("data-en")
    }
  })

  // Update language toggle button text
  if (langToggle) {
    langToggle.textContent = currentLanguage === "en" ? "العربية" : "English"
  }
}

function updateDirection() {
  const html = document.documentElement
  if (currentLanguage === "ar") {
    html.setAttribute("dir", "rtl")
    html.setAttribute("lang", "ar")
  } else {
    html.setAttribute("dir", "ltr")
    html.setAttribute("lang", "en")
  }
}

function updatePlaceholders() {
  const inputs = document.querySelectorAll("input[data-placeholder-en][data-placeholder-ar]")
  inputs.forEach((input) => {
    if (currentLanguage === "ar") {
      input.placeholder = input.getAttribute("data-placeholder-ar")
    } else {
      input.placeholder = input.getAttribute("data-placeholder-en")
    }
  })
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(43, 90, 135, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(43, 90, 135, 0.1)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".article-card, .case-card, .achievement-card, .team-member, .textbook-card, .course-card",
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
})

// Newsletter form submission
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    const button = newsletterForm.querySelector("button")
    const input = newsletterForm.querySelector("input")

    button.addEventListener("click", (e) => {
      e.preventDefault()
      const email = input.value.trim()

      if (email && isValidEmail(email)) {
        // Simulate form submission
        button.textContent = currentLanguage === "ar" ? "تم الاشتراك!" : "Subscribed!"
        button.style.background = "#28a745"
        input.value = ""

        setTimeout(() => {
          button.textContent = currentLanguage === "ar" ? "اشترك" : "Subscribe"
          button.style.background = ""
        }, 3000)
      } else {
        // Show error
        input.style.borderColor = "#dc3545"
        setTimeout(() => {
          input.style.borderColor = ""
        }, 3000)
      }
    })
  }
})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Course enrollment buttons
document.addEventListener("DOMContentLoaded", () => {
  const enrollButtons = document.querySelectorAll(".course-cta")

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Simulate enrollment process
      const originalText = this.textContent
      this.textContent = currentLanguage === "ar" ? "جاري التسجيل..." : "Enrolling..."
      this.disabled = true

      setTimeout(() => {
        this.textContent = currentLanguage === "ar" ? "تم التسجيل!" : "Enrolled!"
        this.style.background = "#28a745"

        setTimeout(() => {
          this.textContent = originalText
          this.style.background = ""
          this.disabled = false
        }, 2000)
      }, 1500)
    })
  })
})

// Book download buttons
document.addEventListener("DOMContentLoaded", () => {
  const downloadButtons = document.querySelectorAll(".book-cta")

  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Simulate download process
      const originalText = this.textContent
      this.textContent = currentLanguage === "ar" ? "جاري التحميل..." : "Downloading..."
      this.disabled = true

      setTimeout(() => {
        this.textContent = currentLanguage === "ar" ? "تم التحميل!" : "Downloaded!"
        this.style.background = "#28a745"

        setTimeout(() => {
          this.textContent = originalText
          this.style.background = ""
          this.disabled = false
        }, 2000)
      }, 2000)
    })
  })
})

// Hero CTA buttons
document.addEventListener("DOMContentLoaded", () => {
  const ctaButtons = document.querySelectorAll(".hero-cta .cta-button")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.classList.contains("primary")) {
        // Scroll to courses section
        const coursesSection = document.querySelector("#courses")
        if (coursesSection) {
          const offsetTop = coursesSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      } else if (this.classList.contains("secondary")) {
        // Scroll to contact section
        const contactSection = document.querySelector("#contact")
        if (contactSection) {
          const offsetTop = contactSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  const placeholders = document.querySelectorAll(".image-placeholder, .article-placeholder, .book-placeholder")

  placeholders.forEach((placeholder) => {
    // Add a subtle loading animation
    placeholder.style.background = `
            linear-gradient(135deg, var(--light-blue), var(--primary-blue)),
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)
        `
    placeholder.style.backgroundSize = "100% 100%, 200% 100%"
    placeholder.style.animation = "shimmer 2s infinite"
  })
})

// Add shimmer animation to CSS dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes shimmer {
        0% {
            background-position: 0% 0%, -200% 0%;
        }
        100% {
            background-position: 0% 0%, 200% 0%;
        }
    }
`
document.head.appendChild(style)

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  updateLanguage()
  updateDirection()
  updatePlaceholders()
})

// Add scroll-to-top functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll-to-top button
  const scrollTopButton = document.createElement("button")
  scrollTopButton.innerHTML = "↑"
  scrollTopButton.className = "scroll-top-btn"
  scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px var(--shadow);
    `

  document.body.appendChild(scrollTopButton)

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopButton.style.opacity = "1"
      scrollTopButton.style.visibility = "visible"
    } else {
      scrollTopButton.style.opacity = "0"
      scrollTopButton.style.visibility = "hidden"
    }
  })

  // Scroll to top functionality
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Hover effect
  scrollTopButton.addEventListener("mouseenter", function () {
    this.style.background = "var(--dark-blue)"
    this.style.transform = "translateY(-3px)"
  })

  scrollTopButton.addEventListener("mouseleave", function () {
    this.style.background = "var(--primary-blue)"
    this.style.transform = "translateY(0)"
  })
})
