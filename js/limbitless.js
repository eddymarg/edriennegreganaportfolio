// Nav scroll — blue tint once past hero
const navbar = document.querySelector('.lb-nav');
const hero   = document.querySelector('.lb-hero');

function updateNav() {
    if (window.scrollY > hero.offsetHeight - 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Hamburger toggle ──
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
