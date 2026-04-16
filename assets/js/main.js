document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation & Dynamic Island Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
    const dynamicIsland = document.getElementById('dynamicIsland');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
            
            if (mobileNav.classList.contains('is-open')) {
                dynamicIsland.style.background = 'transparent';
                dynamicIsland.style.boxShadow = 'none';
            } else {
                dynamicIsland.style.background = '';
                dynamicIsland.style.boxShadow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
                dynamicIsland.style.background = '';
                dynamicIsland.style.boxShadow = '';
            });
        });
    }

    // Scroll Logic for Navigation
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if(header) header.classList.add('scrolled');
            if(dynamicIsland) dynamicIsland.classList.add('scrolled');
        } else {
            if(header) header.classList.remove('scrolled');
            if(dynamicIsland) dynamicIsland.classList.remove('scrolled');
        }
    });

    // Dynamic Island Observers
    const sections = document.querySelectorAll('.section-observer');
    const currentSectionName = document.getElementById('currentSectionName');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', 
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('data-section-name');
                if (sectionName && currentSectionName) {
                    currentSectionName.textContent = sectionName;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Scroll Top Button
    const scrollTopBtn = document.querySelector('.floating-vector');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
