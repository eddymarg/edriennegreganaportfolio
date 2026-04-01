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
let jelloEls = [...document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap')];

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


// ── View More / View Less ──
const viewMoreBtn  = document.getElementById('view-more-btn');
const viewLessBtn  = document.getElementById('view-less-btn');
const moreProjects = document.getElementById('more-projects');

viewMoreBtn.addEventListener('click', () => {
    moreProjects.classList.add('visible');
    viewMoreBtn.style.display = 'none';
    viewLessBtn.style.display = 'inline-block';

    // Re-collect jello targets to include newly visible images
    jelloEls = [...document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap')];
});

viewLessBtn.addEventListener('click', () => {
    moreProjects.classList.remove('visible');
    viewLessBtn.style.display = 'none';
    viewMoreBtn.style.display = 'inline-block';

    // Scroll back up to the projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });

    // Trim jello targets back to only visible images
    jelloEls = [...document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap')];
});
