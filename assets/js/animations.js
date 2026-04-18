/**
 * Advanced Animations & Scroll Reveals
 * Project: AK Enterprise
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initial Header Morphing Sequence (Stabilized for Zero-Shift)
    const header = document.getElementById('header');
    const dynamicIsland = document.getElementById('dynamicIsland');

    if (header || dynamicIsland) {
        // Step A: Show the pill (ghosting phase)
        setTimeout(() => {
            if (header) header.classList.add('is-ready');
            if (dynamicIsland) dynamicIsland.classList.add('is-ready');
        }, 100);

        // Step B: Expand to full bar
        setTimeout(() => {
            if (header) {
                header.classList.remove('header-pill-state');
                header.classList.remove('is-ready'); // Clean up
            }
            if (dynamicIsland) {
                dynamicIsland.classList.remove('header-pill-state');
                dynamicIsland.classList.remove('is-ready');
                dynamicIsland.classList.add('animate-load');
            }
        }, 800); 
    }

    // 2. Intersection Observer with HYSTERESIS (Anti-Flicker Logic)
    const revealOptions = {
        threshold: [0, 0.1], // Trigger much earlier
        rootMargin: '0px 0px 50px 0px' // Start reveal BEFORE it hits the viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // HYSTERESIS: Snappy trigger for in vs out
            if (entry.isIntersecting && entry.intersectionRatio >= 0.05) {
                entry.target.classList.add('animate-in');
            } else if (!entry.isIntersecting) {
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
