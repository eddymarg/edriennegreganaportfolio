// ── Nav: pill buttons after scrolling past hero ──
const navbar   = document.querySelector('.navbar');
const hero     = document.querySelector('.hero');

function updateNav() {
    if (window.scrollY > hero.offsetHeight - 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


// ── Project images: jello parallax ──
const jelloEls = document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap');

let lastScrollY  = window.scrollY;
let velocity     = 0;
let rafPending   = false;

function applyJello() {
    velocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    jelloEls.forEach(el => {
        const rect      = el.getBoundingClientRect();
        const elCenter  = rect.top + rect.height / 2;
        const vpCenter  = window.innerHeight / 2;

        // Subtle parallax: gentle drift only, no rotation
        const drift = (elCenter - vpCenter) * 0.015;

        el.style.transform = `translateY(${drift}px)`;
    });

    rafPending = false;
}

window.addEventListener('scroll', () => {
    if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(applyJello);
    }
}, { passive: true });
