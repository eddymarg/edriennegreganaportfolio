// Nav scroll — coral tint once past hero
const navbar = document.querySelector('.sb-nav');
const hero   = document.querySelector('.sb-hero');

function updateNav() {
    if (window.scrollY > hero.offsetHeight - 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
