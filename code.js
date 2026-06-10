/* =============================================
   PARTICLES ENGINE (Refined SaaS Aesthetic)
   ============================================= */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    let particleCount = window.innerWidth < 768 ? 15 : 30;
    if ('ontouchstart' in window) particleCount = Math.floor(particleCount / 2);

    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 2 + 1; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: Math.random() * 0.3 },
            { transform: `translateY(-${Math.random() * 100 + 50}px) scale(${Math.random() + 0.5})`, opacity: 0 }
        ], {
            duration: Math.random() * 10000 + 10000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });
        
        particlesContainer.appendChild(particle);
    }
}

/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section-fade');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* =============================================
   CHINESE POLICY MODAL LOGIC (Preserved)
   ============================================= */
function initModalLogic() {
    const chineseLink = document.querySelector('a[lang="zh"]');
    const modal = document.getElementById('chinese-policy-modal');
    const closeButton = document.getElementById('close-chinese-policy');

    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (chineseLink) {
        chineseLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            openModal();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

/* =============================================
   INITIALIZATION
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle initial state and animations
    if (prefersReducedMotion) {
        document.querySelectorAll('.section-fade').forEach(el => el.classList.add('visible'));
    } else {
        createParticles();
        handleScrollAnimations();
    }
    
    // Initialize specific logic
    initModalLogic();

    // Re-init particles on resize to prevent clustering
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!prefersReducedMotion) createParticles();
        }, 250);
    });
});