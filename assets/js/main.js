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

    // Scroll To Top with Progress Circular Ring
    const scrollTopBtn = document.getElementById('scrollToTop');
    const progressCircle = document.querySelector('.progress-ring__circle');
    
    if (scrollTopBtn && progressCircle) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;
        
        function setProgress(percent) {
            const offset = circumference - percent / 100 * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        window.addEventListener('scroll', () => {
            const servicesSection = document.querySelector('.services-section');
            const servicesOffset = servicesSection ? servicesSection.offsetTop : 100;
            const whatsappBtn = document.querySelector('.whatsapp-float');
            
            if (window.scrollY > servicesOffset) {
                scrollTopBtn.classList.add('visible');
                if (whatsappBtn) whatsappBtn.classList.add('shifted');
            } else {
                scrollTopBtn.classList.remove('visible');
                if (whatsappBtn) whatsappBtn.classList.remove('shifted');
            }

            // Calculate Scroll Progress
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight * 100;
            setProgress(scrollPercent);
        });

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
