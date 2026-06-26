// ========================================
// Portfolio Website JavaScript
// Author: Zohaib Ali
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
    initNavbarScroll();
    initActiveNavLinks();
    initFormValidation();
    initScrollAnimations();
});

// ========================================
// Mobile Menu Toggle
// ========================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ========================================
// Theme Toggle (Dark/Light Mode)
// ========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ========================================
// Smooth Scrolling
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # links
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Active Navigation Links
// ========================================

function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load
}

// ========================================
// Form Validation & Submission
// ========================================

function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    // Form submission handled by Formspree (no custom JS).
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    // ============================
    // Section Header Animations
    // ============================
    const headerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-header').forEach(header => {
        headerObserver.observe(header);
    });

    // ============================
    // Card & Element Animations
    // ============================
    const animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    // Slide-up elements
    const slideUpElements = document.querySelectorAll(
        '.project-card, .feature-card, .tech-stack-item, .challenge-card, .project-overview-content, .contact-form-wrapper, .stat-item'
    );
    slideUpElements.forEach((el, i) => {
        el.classList.add('anim-slide-up');
        el.style.transitionDelay = `${(i % 6) * 0.1}s`;
        animObserver.observe(el);
    });

    // Slide-left elements
    const slideLeftElements = document.querySelectorAll(
        '.about-image, .contact-info'
    );
    slideLeftElements.forEach(el => {
        el.classList.add('anim-slide-left');
        animObserver.observe(el);
    });

    // Slide-right elements
    const slideRightElements = document.querySelectorAll(
        '.about-text, .project-hero-image'
    );
    slideRightElements.forEach(el => {
        el.classList.add('anim-slide-right');
        animObserver.observe(el);
    });

    // Scale-in elements
    const scaleInElements = document.querySelectorAll(
        '.skill-category, .service-card'
    );
    scaleInElements.forEach((el, i) => {
        el.classList.add('anim-scale-in');
        el.style.transitionDelay = `${(i % 6) * 0.1}s`;
        animObserver.observe(el);
    });

    // Blur-in elements
    const blurInElements = document.querySelectorAll(
        '.architecture-step'
    );
    blurInElements.forEach((el, i) => {
        el.classList.add('anim-blur-in');
        el.style.transitionDelay = `${i * 0.15}s`;
        animObserver.observe(el);
    });

    // ============================
    // Counter Animation for Stats
    // ============================
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 40));
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        el.textContent = current + suffix;
                    }, 30);
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        counterObserver.observe(el);
    });

    // ============================
    // Card Tilt Effect
    // ============================
    const tiltCards = document.querySelectorAll('.service-card, .skill-category');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(function () {
    // Any additional scroll-based logic can go here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// Load Animations on Page Load
// ========================================

window.addEventListener('load', function () {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Profile image fallback
    const profileImages = document.querySelectorAll('img[src="profile.jpg"]');
    profileImages.forEach(img => {
        img.addEventListener('error', function () {
            // Create a placeholder with initials if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = 'linear-gradient(135deg, #0066ff, #3385ff)';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '4rem';
            placeholder.style.fontWeight = '700';
            placeholder.style.color = 'white';
            placeholder.textContent = 'ZA';
            placeholder.style.borderRadius = 'inherit';

            img.style.display = 'none';
            img.parentElement.appendChild(placeholder);
        });
    });

    // Project image fallbacks
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach((img, index) => {
        img.addEventListener('error', function () {
            // Use a gradient placeholder for project images
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
            ];

            img.style.display = 'none';
            const parent = img.parentElement;
            parent.style.background = colors[index % colors.length];

            // Add project icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-laptop-code';
            icon.style.fontSize = '4rem';
            icon.style.color = 'white';
            icon.style.position = 'absolute';
            icon.style.top = '50%';
            icon.style.left = '50%';
            icon.style.transform = 'translate(-50%, -50%)';
            parent.style.position = 'relative';
            parent.appendChild(icon);
        });
    });
});

// ========================================
// Console Message
// ========================================

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cFeel free to reach out if you\'d like to work together!', 'font-size: 14px; color: #666;');
console.log('%c📧 Email: iamzohaibali@gmail.com', 'font-size: 12px; color: #0066ff;');
console.log('%c💬 WhatsApp: +923259938497', 'font-size: 12px; color: #0066ff;');
