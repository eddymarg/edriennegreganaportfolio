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
