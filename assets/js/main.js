// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navDropdowns = document.querySelectorAll('.nav-dropdown');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        });
    });
}

navDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
});

document.addEventListener('click', event => {
    navDropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) return;
        dropdown.classList.remove('open');
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
});

// Work menu: hover opens on desktop, click or tap toggles, outside click and Esc close
document.querySelectorAll('.nav-menu').forEach(menu => {
    const toggle = menu.querySelector('.seg');
    const setOpen = open => {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
    };

    const canHover = window.matchMedia('(hover: hover)').matches;

    // A mouse click after hover-open keeps it open; keyboard and touch toggle
    toggle.addEventListener('click', event => {
        setOpen(canHover && event.detail > 0 ? true : !menu.classList.contains('open'));
    });

    if (canHover) {
        menu.addEventListener('mouseenter', () => setOpen(true));
        menu.addEventListener('mouseleave', () => setOpen(false));
    }

    document.addEventListener('click', event => {
        if (!menu.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .hero-content').forEach(el => {
    observer.observe(el);
});
