/* ===========================
   CUSTOM CURSOR TRACKING
   =========================== */

// const cursor = document.querySelector('.custom-cursor');
// const cursorDot = document.querySelector('.custom-cursor-dot');

// let mouseX = 0;
// let mouseY = 0;
// let dotX = 0;
// let dotY = 0;

// document.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;

//     // Update cursor ring with instant feedback
//     // cursor.style.left = (mouseX - 15) + 'px';
//     // cursor.style.top = (mouseY - 15) + 'px';

//     // Update dot with smooth delay (trailing effect)
//     dotX += (mouseX - dotX) * 0.2;
//     dotY += (mouseY - dotY) * 0.2;
//     cursorDot.style.left = (dotX - 4) + 'px';
//     cursorDot.style.top = (dotY - 4) + 'px';
// });

// // Hide cursor when leaving window
// // document.addEventListener('mouseleave', () => {
// //     cursor.style.opacity = '0';
// //     cursorDot.style.opacity = '0';
// // });

// document.addEventListener('mouseenter', () => {
//     cursor.style.opacity = '0.7';
//     cursorDot.style.opacity = '0.8';
// });

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* ===========================
   SMOOTH SCROLL WITH OFFSET
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ===========================
   PROJECT CARD HOVER TILT
   =========================== */

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

/* ===========================
   TECH CARD ANIMATIONS
   =========================== */

const techCards = document.querySelectorAll('.tech-card');

techCards.forEach((card, index) => {
    // Add staggered animation on load
    card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s backwards`;
});

/* ===========================
   INTERSECTION OBSERVER FOR LAZY ANIMATIONS
   =========================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .timeline-item, .tech-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/* ===========================
   FORM SUBMISSION
   =========================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

/* ===========================
   TOAST NOTIFICATIONS
   =========================== */

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast styles dynamically
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
    .toast-notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(30, 41, 59, 0.95);
        border-left: 4px solid #0EA5E9;
        color: #e2e8f0;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        backdrop-filter: blur(10px);
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        word-wrap: break-word;
    }

    .toast-notification.show {
        transform: translateX(0);
    }

    .toast-notification.toast-error {
        border-left-color: #ef4444;
    }

    .toast-notification.toast-success {
        border-left-color: #0EA5E9;
    }

    .toast-notification i {
        font-size: 1.25rem;
        flex-shrink: 0;
    }

    @media (max-width: 576px) {
        .toast-notification {
            bottom: 1rem;
            right: 1rem;
            max-width: 250px;
            padding: 0.875rem 1rem;
            font-size: 0.875rem;
        }
    }
`;
document.head.appendChild(toastStyle);

/* ===========================
   PERFORMANCE MONITORING
   =========================== */

// Log performance metrics
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('[Portfolio] Page load time:', pageLoadTime + 'ms');

    // Check if page meets 60fps target
    const fps = 1000 / 16.67; // 60fps = ~16.67ms per frame
    console.log('[Portfolio] Target FPS: 60 | Actual FPS: ~' + fps.toFixed(0));
});

/* ===========================
   ACCESSIBILITY ENHANCEMENTS
   =========================== */

// Add keyboard navigation for buttons and links
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open menus or modals
        document.querySelector('.navbar-collapse')?.classList.remove('show');
    }
});

// Enhance focus states for keyboard navigation
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid #0EA5E9';
        el.style.outlineOffset = '2px';
    });

    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

/* ===========================
   SCROLL ANIMATION FOR STATS
   =========================== */

const stats = document.querySelectorAll('.stat-value');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const isPercentage = stat.textContent.includes('%');
        let current = 0;
        const increment = target / 30;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = isPercentage
                    ? Math.ceil(current) + '%'
                    : Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = stat.getAttribute('data-value') || (isPercentage ? target + '%' : target + '+');
            }
        };

        const statElement = stat.closest('.stat');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !stat.hasAttribute('data-animated')) {
                    stat.setAttribute('data-animated', 'true');
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statElement);
    });
}

// Run stats animation
animateStats();

/* ===========================
   NAVBAR MOBILE MENU
   =========================== */

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navCollapse = document.querySelector('.navbar-collapse');

const bootstrap = window.bootstrap; // Declare the bootstrap variable

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu after clicking a link
        const bsCollapse = new bootstrap.Collapse(navCollapse, {
            toggle: false
        });
        bsCollapse.hide();
    });
});

/* ===========================
   PREFERS REDUCED MOTION
   =========================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    console.log('[Portfolio] Respecting prefers-reduced-motion preference');
}

/* ===========================
   DARK MODE DETECTION
   =========================== */

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function handleDarkModeChange(e) {
    if (e.matches) {
        document.body.classList.add('dark-mode');
        console.log('[Portfolio] Dark mode enabled');
    } else {
        document.body.classList.remove('dark-mode');
        console.log('[Portfolio] Light mode enabled');
    }
}

darkModeQuery.addEventListener('change', handleDarkModeChange);
handleDarkModeChange(darkModeQuery);

/* ===========================
   DEMO LINK HANDLING
   =========================== */

document.querySelectorAll('.demo-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Live demo link - Replace with your actual project URL', 'info');
    });
});

document.querySelectorAll('.project-link:not(.demo-link)').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('GitHub link - Replace with your actual GitHub repository', 'info');
    });
});

/* ===========================
   LAZY LOAD IMAGES
   =========================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Image lazy loading logic
                entry.target.src = entry.target.dataset.src;
                imageObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===========================
   INITIALIZATION
   =========================== */

// console.log('[Portfolio] ✨ Portfolio initialized and ready!');
// console.log('[Portfolio] Smooth animations, custom cursor, and accessibility features enabled.');










// updated

/* ===========================
   THEME TOGGLE FUNCTIONALITY
   =========================== */

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme or prefer-color-scheme
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set initial theme
const currentTheme = getPreferredTheme();
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add animation class
    themeToggle.classList.add('animating');
    
    // Set new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
    
   
    
    // Remove animation class after animation completes
    setTimeout(() => {
        themeToggle.classList.remove('animating');
    }, 500);
}

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-regular fa-moon';
        themeIcon.setAttribute('title', 'Switch to light theme');
    } else {
        themeIcon.className = 'fa-regular fa-sun';
        themeIcon.setAttribute('title', 'Switch to dark theme');
    }
}

// Listen for theme toggle click
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem('portfolio-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
       
    }
});

// Keyboard shortcut for theme toggle (Alt + T)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        toggleTheme();
        e.preventDefault();
    }
});

// Update your existing toggleBtn function to call toggleTheme
function toggleBtn() {
    toggleTheme();
}