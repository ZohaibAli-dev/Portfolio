// ========================================
// Portfolio Website JavaScript
// Author: Zohaib Ali
// ========================================

document.addEventListener('DOMContentLoaded', function() {
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
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
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

    themeToggle.addEventListener('click', function() {
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
        link.addEventListener('click', function(e) {
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
    
    window.addEventListener('scroll', function() {
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
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Please enter your name';
            nameInput.style.borderColor = '#dc3545';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#dc3545';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#28a745';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Please enter your email';
            emailInput.style.borderColor = '#dc3545';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#28a745';
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'Please enter your message';
            messageInput.style.borderColor = '#dc3545';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#dc3545';
            return false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = '#28a745';
            return true;
        }
    }

    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            validateName();
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            validateEmail();
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            validateMessage();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            formSuccess.classList.add('show');
            
            // Log form data (in production, send to server)
            console.log('Form submitted successfully!');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Message:', messageInput.value);
            
            // Reset form
            form.reset();
            nameInput.style.borderColor = '';
            emailInput.style.borderColor = '';
            messageInput.style.borderColor = '';
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.classList.remove('show');
            }, 5000);
            
            // In production, you would send the data to a server here
            // Example using fetch API:
            /*
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            };
            
            fetch('your-server-endpoint.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                formSuccess.classList.add('show');
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            });
            */
        } else {
            // Scroll to first error
            const firstError = form.querySelector('input[style*="border-color: rgb(220, 53, 69)"], textarea[style*="border-color: rgb(220, 53, 69)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .service-card, .about-text, .about-image, .contact-info, .contact-form-wrapper'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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
const optimizedScroll = debounce(function() {
    // Any additional scroll-based logic can go here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// Load Animations on Page Load
// ========================================

window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Profile image fallback
    const profileImages = document.querySelectorAll('img[src="profile.jpg"]');
    profileImages.forEach(img => {
        img.addEventListener('error', function() {
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
        img.addEventListener('error', function() {
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
