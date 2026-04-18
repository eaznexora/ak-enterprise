/**
 * Advanced Animations & Scroll Reveals
 * Project: AK Enterprise
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initial Header Morphing Sequence
    const header = document.getElementById('header');
    const dynamicIsland = document.getElementById('dynamicIsland');

    if (header || dynamicIsland) {
        // Since we now preload 'header-pill-state' in HTML to prevent flicker,
        // we just need to remove it to trigger expansion
        setTimeout(() => {
            if (header) {
                header.classList.remove('header-pill-state');
            }
            if (dynamicIsland) {
                dynamicIsland.classList.remove('header-pill-state');
                dynamicIsland.classList.add('animate-load');
            }
        }, 500); // 500ms delay for a more professional paced entrance
    }

    // 2. Intersection Observer for REVERSIBLE Scroll Reveals
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                // REVERSIBLE: Remove the class when leaving viewport
                // BUT skip this for items we want to keep once revealed (optional)
                // For now, making it fully reversible as requested
                entry.target.classList.remove('animate-in');
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Staggered reveal for grid items, service cards, and STATS BAR
    const staggerContainers = ['.services-row', '.precision-blocks', '.testimonial-cards', '.mobile-bento', '.desktop-bento', '.stats-bar'];
    
    staggerContainers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.classList.add('reveal-on-scroll');
                // Add progressive delay
                const delay = Math.min((index + 1) * 0.15, 0.8); // Slightly adjusted for cinematic feel
                child.style.transitionDelay = `${delay}s`;
                revealObserver.observe(child);
            });
        }
    });

    // 4. Parallax Effect for Hero Image (Subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroOverlay = document.querySelector('.hero-overlay');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
        
        if (heroOverlay) {
            heroOverlay.style.background = `rgba(0, 0, 0, ${0.4 + (scrolled / 1000)})`;
        }
    });
});
