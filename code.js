// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.policy-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Mouse parallax effect
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.policy-section');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            const rotateX = (y - 0.5) * speed;
            const rotateY = (x - 0.5) * speed;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    handleScrollAnimations();
    initSmoothScrolling();
    initParallaxEffect();
});

// Performance optimization
let ticking = false;
function updateParallax() {
    // Parallax updates
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});