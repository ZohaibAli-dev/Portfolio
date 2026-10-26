(() => {
    'use strict';

    const root = document.documentElement;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(pointer: fine)').matches;
    const themeButton = document.getElementById('themeToggle');

    function syncTheme() {
        const mode = root.dataset.theme || 'dark';
        themeButton.dataset.mode = mode;
        themeButton.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        document.querySelector('meta[name="theme-color"]').content = mode === 'dark' ? '#0C0B0A' : '#FFFFFF';
    }
    syncTheme();
    themeButton.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (_) { /* Theme still works without storage. */ }
        syncTheme();
    });

    const nav = document.getElementById('nav');
    const progress = document.getElementById('progress');
    function updateScroll() {
        const distance = root.scrollHeight - innerHeight;
        nav.classList.toggle('scrolled', scrollY > 8);
        progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
    }
    addEventListener('scroll', updateScroll, { passive: true });
    addEventListener('resize', updateScroll, { passive: true });
    updateScroll();

    const menuButton = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    function setMenu(open) {
        menu.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    menuButton.addEventListener('click', () => {
        const opening = menu.hidden;
        setMenu(opening);
        if (opening) menu.querySelector('a')?.focus();
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); }
    });
    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !menu.hidden) setMenu(false);
    });
    matchMedia('(min-width: 1061px)').addEventListener('change', event => {
        if (event.matches) setMenu(false);
    });
    // Restore a closed menu when returning through the browser's back/forward cache.
    addEventListener('pageshow', () => { setMenu(false); updateScroll(); });

    // Content stays visible without JavaScript or an observer. Motion begins only
    // when an element enters the viewport, and never hides off-screen content.
    const motionTargets = [...document.querySelectorAll([
        '.reveal', '.reveal-line', '.page-hero-breadcrumb', '.page-hero h1',
        '.page-hero .container > p', '.project-hero-breadcrumb',
        '.project-hero-info h1', '.project-hero-tagline', '.project-hero-meta',
        '.project-hero-tags', '.project-hero-image', '.section-header',
        '.about-image', '.about-text', '.stat-item', '.skill-category',
        '.feature-card', '.tech-stack-item', '.architecture-step',
        '.challenge-card', '.contact-info', '.contact-form-wrapper',
        '.project-nav-btn', '.journey-link', '.footer-top', '.foot'
    ].join(','))];

    function animateNumbers(element) {
        element.querySelectorAll('.stat-number, .num').forEach(number => {
            const original = number.textContent.trim();
            const match = original.match(/^(\d+)([+%])$/);
            if (!match || number.dataset.counted) return;
            number.dataset.counted = 'true';
            const total = Number(match[1]);
            const start = performance.now();
            function count(now) {
                const fraction = Math.min(1, (now - start) / 1100);
                number.textContent = Math.round(total * (1 - Math.pow(1 - fraction, 3))) + match[2];
                if (fraction < 1) requestAnimationFrame(count);
                else number.textContent = original;
            }
            requestAnimationFrame(count);
        });
    }

    if (!reducedMotion && 'IntersectionObserver' in window) {
        const groupSizes = new Map();
        const delays = new WeakMap();
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const element = entry.target;
                revealObserver.unobserve(element);
                element.dataset.motion = 'revealed';
                element.classList.add('in');
                element.animate?.([
                    { opacity: 0, translate: '0 24px' },
                    { opacity: 1, translate: '0 0' }
                ], {
                    duration: 650,
                    delay: delays.get(element) || 0,
                    easing: 'cubic-bezier(.2,.75,.2,1)',
                    fill: 'backwards'
                });
                animateNumbers(element);
            });
        }, { threshold: 0.08 });
        motionTargets.forEach(element => {
            const index = groupSizes.get(element.parentElement) || 0;
            groupSizes.set(element.parentElement, index + 1);
            delays.set(element, Math.min(index, 3) * 75);
            element.dataset.motion = 'pending';
            revealObserver.observe(element);
        });
    }

    const typed = document.getElementById('typed');
    if (typed && !reducedMotion) {
        const words = ['web & mobile apps', 'clean REST APIs', 'real-time dashboards', 'e-commerce stores'];
        const colors = ['var(--orange)', 'var(--green)', 'var(--pink)'];
        let word = 0;
        let length = words[0].length;
        let deleting = true;
        function typeNext() {
            if (deleting) {
                typed.textContent = words[word].slice(0, Math.max(0, --length));
                if (length > 0) return setTimeout(typeNext, 35);
                deleting = false;
                word = (word + 1) % words.length;
                typed.style.color = colors[word % colors.length];
                return setTimeout(typeNext, 300);
            }
            typed.textContent = words[word].slice(0, ++length);
            if (length < words[word].length) return setTimeout(typeNext, 65);
            deleting = true;
            setTimeout(typeNext, 2200);
        }
        setTimeout(typeNext, 2600);
    }

    const cards = [...document.querySelectorAll('#workGrid .card')];
    const filterButtons = document.querySelectorAll('.filter button');
    filterButtons.forEach(button => button.addEventListener('click', () => {
        filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        let position = 0;
        cards.forEach(card => {
            card.hidden = button.dataset.f !== 'all' && card.dataset.cat !== button.dataset.f;
            if (!card.hidden && !reducedMotion) {
                card.animate?.([
                    { opacity: 0, translate: '0 12px' },
                    { opacity: 1, translate: '0 0' }
                ], { duration: 320, delay: position++ * 50, easing: 'ease-out', fill: 'backwards' });
            }
        });
        updateScroll();
    }));

    const copyButton = document.getElementById('copyBtn');
    const email = document.getElementById('contactEmail');
    if (copyButton && email) {
        copyButton.setAttribute('aria-live', 'polite');
        copyButton.addEventListener('click', async () => {
            let label = 'Copied ✓';
            try {
                await navigator.clipboard.writeText(email.textContent.trim());
            } catch (_) {
                const range = document.createRange();
                range.selectNodeContents(email);
                const selection = getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                label = 'Selected — press Ctrl+C';
            }
            copyButton.textContent = label;
            copyButton.classList.add('done');
            setTimeout(() => { copyButton.textContent = 'Copy email'; copyButton.classList.remove('done'); }, 2400);
        });
    }

    if (reducedMotion || !finePointer) return;
    const cursor = document.getElementById('cursor');
    cursor.setAttribute('aria-hidden', 'true');
    document.addEventListener('pointermove', event => {
        cursor.hidden = false;
        cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
    }, { passive: true });
    document.addEventListener('pointerover', event => {
        cursor.classList.toggle('big', Boolean(event.target.closest('a, button, .card, .skill')));
    });
    document.addEventListener('pointerleave', () => { cursor.hidden = true; });

    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('#portrait [data-depth]');
    if (hero) {
        hero.addEventListener('pointermove', event => {
            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            layers.forEach(layer => {
                const depth = Number(layer.dataset.depth);
                layer.style.translate = `${x * depth}px ${y * depth}px`;
            });
        });
        hero.addEventListener('pointerleave', () => layers.forEach(layer => { layer.style.translate = ''; }));
    }
})();
