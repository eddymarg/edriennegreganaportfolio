// Nav scroll — green tint once past hero
const navbar = document.querySelector('.arb-nav');
const hero   = document.querySelector('.arb-hero');

function updateNav() {
    if (window.scrollY > hero.offsetHeight - 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
