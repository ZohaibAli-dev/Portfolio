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
    menuButton.addEventListener('click', () => setMenu(menu.hidden));
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

    if ('IntersectionObserver' in window) {
        const navigationObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const link = document.querySelector(`.links a[href="#${entry.target.id}"]`);
                if (!link) return;
                document.querySelectorAll('.links a').forEach(item => {
                    item.removeAttribute('aria-current');
                    item.classList.toggle('active', item === link);
                });
                link.setAttribute('aria-current', 'location');
            });
        }, { rootMargin: '-20% 0px -55% 0px' });
        document.querySelectorAll('.home-page section[id]').forEach(section => navigationObserver.observe(section));

        if (!reducedMotion) {
            const revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('in');
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.06 });
            document.querySelectorAll('.reveal, .reveal-line').forEach(element => {
                if (element.getBoundingClientRect().top > innerHeight) {
                    element.classList.add('armed');
                    revealObserver.observe(element);
                }
            });
        }
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
        cards.forEach(card => { card.hidden = button.dataset.f !== 'all' && card.dataset.cat !== button.dataset.f; });
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
