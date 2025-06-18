function createParticles() {
    const particlesContainer = document.getElementById('particles');

    let particleCount;
    if (window.innerWidth < 480) {
        particleCount = 15; // Mobile phones
    } else if (window.innerWidth < 768) {
        particleCount = 25; // Tablets
    } else if (window.innerWidth < 1200) {
        particleCount = 40; // Desktop
    } else {
        particleCount = 50; // Large screens
    }


    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';


        if (particlesContainer) {
            particlesContainer.appendChild(particle);
        } else {
            document.body.appendChild(particle);
        }
    }
}

function handleScrollAnimations() {
    const sections = document.querySelectorAll('.policy-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: window.innerWidth < 768 ? 0.05 : 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}


function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initParallaxEffect() {

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.policy-section');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            cards.forEach((card, index) => {
                const speed = (index + 1) * 0.3;
                const rotateX = (y - 0.5) * speed;
                const rotateY = (x - 0.5) * speed;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        document.addEventListener('mouseleave', () => {
            const cards = document.querySelectorAll('.policy-section');
            cards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
}


function handleResize() {

    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {

        createParticles();


        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            initParallaxEffect();
        }
    }, 250);
}

function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


document.addEventListener('DOMContentLoaded', function () {

    if (!respectsReducedMotion()) {
        createParticles();
        initParallaxEffect();
    }

    handleScrollAnimations();
    initSmoothScrolling();

    window.addEventListener('resize', handleResize);

    // --- START: Chinese Policy Modal Logic ---

    // Get the required elements from the DOM
    const chineseLink = document.querySelector('a[lang="zh"]');
    const modal = document.getElementById('chinese-policy-modal');
    const closeButton = document.getElementById('close-chinese-policy');

    // Function to open the modal
    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            // Prevent body from scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }

    // Function to close the modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            // Restore body scrolling
            document.body.style.overflow = '';
        }
    }

    // Event listener for the "View Chinese Version" link
    if (chineseLink) {
        chineseLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the link from navigating
            openModal();
        });
    }

    // Event listener for the close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Event listener to close the modal if the user clicks on the overlay (outside the content)
    if (modal) {
        modal.addEventListener('click', function(event) {
            // If the clicked element is the overlay itself, not its children
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Event listener to close the modal with the 'Escape' key for accessibility
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // --- END: Chinese Policy Modal Logic ---
});

let ticking = false;
let lastScrollY = 0;

function updateParallax() {

    if (lastScrollY !== window.scrollY) {
        lastScrollY = window.scrollY;

    }
    ticking = false;
}


document.addEventListener('scroll', function () {
    if (!ticking && !respectsReducedMotion()) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});


document.addEventListener('focusin', function () {
    if (respectsReducedMotion()) {
        document.body.style.setProperty('--animation-play-state', 'paused');
    }
});

document.addEventListener('focusout', function () {
    document.body.style.setProperty('--animation-play-state', 'running');
});


if ('ontouchstart' in window) {

    document.body.classList.add('touch-device');


    const originalCreateParticles = createParticles;
    createParticles = function () {
        const particlesContainer = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 8 : 15;

        if (particlesContainer) {
            particlesContainer.innerHTML = '';
        }

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

            if (particlesContainer) {
                particlesContainer.appendChild(particle);
            } else {
                document.body.appendChild(particle);
            }
        }
    };
}
