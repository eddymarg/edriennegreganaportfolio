// ── Nav: pill buttons after scrolling past hero ──
const navbar   = document.querySelector('.navbar');
const hero     = document.querySelector('.hero');

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

function expandProjects() {
    moreProjects.classList.add('visible');
    viewMoreBtn.style.display = 'none';
    viewLessBtn.style.display = 'inline-block';
    jelloEls = [...document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap')];
}

function collapseProjects() {
    moreProjects.classList.remove('visible');
    viewLessBtn.style.display = 'none';
    viewMoreBtn.style.display = 'inline-block';
    sessionStorage.removeItem('projectsExpanded');
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    jelloEls = [...document.querySelectorAll('.project-img:not(.mockup), .mockup-wrap')];
}

// Mark that user is leaving for a project page
document.querySelectorAll('.projects-section .btn-outline').forEach(link => {
    link.addEventListener('click', () => {
        sessionStorage.setItem('returnToProjects', 'true');
    });
});

// Restore expanded state and scroll to projects if returning from a project page
if (sessionStorage.getItem('projectsExpanded') === 'true') {
    expandProjects();
}

if (sessionStorage.getItem('returnToProjects') === 'true') {
    sessionStorage.removeItem('returnToProjects');
    document.getElementById('projects').scrollIntoView({ behavior: 'instant' });
}

viewMoreBtn.addEventListener('click', () => {
    sessionStorage.setItem('projectsExpanded', 'true');
    expandProjects();
});

viewLessBtn.addEventListener('click', collapseProjects);
