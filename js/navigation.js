// Shared Navigation Functionality

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }

    // Set active link based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Floating WhatsApp button (global on all pages)
    const existingWhatsapp = document.querySelector('.whatsapp-float');
    if (!existingWhatsapp) {
        const whatsappLink = document.createElement('a');
        whatsappLink.href = 'https://wa.me/919082663527';
        whatsappLink.className = 'whatsapp-float';
        whatsappLink.target = '_blank';
        whatsappLink.rel = 'noopener noreferrer';
        whatsappLink.setAttribute('aria-label', 'Chat on WhatsApp: +91 9082663527');
        whatsappLink.innerHTML = `
            <img src="assets/whatsapp.png" alt="WhatsApp" class="whatsapp-icon" />
            <span class="whatsapp-text">+91 9082663527</span>
        `;
        document.body.appendChild(whatsappLink);
    }

    // Global Scroll Reveal Animation System
    // Check if we're on services page (skip animations for services page)
    const isServicesPage = window.location.pathname.includes('services.html');
    
    const initScrollReveal = () => {
        // Configuration for Intersection Observer
        const revealOptions = {
            threshold: 0.15, // Trigger when 15% of element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        };

        // Create observer for scroll reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: stop observing after reveal for performance
                    // revealObserver.unobserve(entry.target);
                } else {
                    // Optional: remove class when out of view for repeat animations
                    // entry.target.classList.remove('revealed');
                }
            });
        }, revealOptions);

        // Auto-apply scroll reveal to common elements
        // Skip if on services page
        
        if (!isServicesPage) {
            const selectors = [
                '.section',
                '.section-title',
                '.service-title',
                '.faq-title',
                '.service-card',
                '.client-logo-card',
                '.gallery-item',
                '.review-card',
                '.feature-card',
                '.solution-card',
                '.service-text',
                '.service-gallery-wrapper',
                '.scroll-reveal',
                '.fade-in-up',
                '.fade-in-left',
                '.fade-in-right',
                '.scale-in',
                '.content-wrapper',
                '.info-card',
                '.method-item',
                '.application-item',
                '.faq-item',
                '.process-list li',
                '.benefits-list li'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    // Add stagger delay for grid items
                    if (selector.includes('card') || selector.includes('item')) {
                        const delay = (index % 4) * 0.1;
                        element.style.transitionDelay = `${delay}s`;
                    }
                    revealObserver.observe(element);
                });
            });
        }

        // Also observe any element with data-animate attribute (skip on services page)
        if (!isServicesPage) {
            const customAnimateElements = document.querySelectorAll('[data-animate]');
            customAnimateElements.forEach(element => {
                const animationType = element.getAttribute('data-animate');
                if (animationType) {
                    element.classList.add(animationType);
                }
                revealObserver.observe(element);
            });
        }
    };

    // Initialize scroll reveal animations
    initScrollReveal();

    // Reveal elements that are already in viewport on page load (skip on services page)
    if (!isServicesPage) {
        const revealVisibleOnLoad = () => {
            const elements = document.querySelectorAll('.section, .section-title, .scroll-reveal, .fade-in-up');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                    element.classList.add('revealed');
                }
            });
        };

        // Reveal visible elements after a short delay
        setTimeout(revealVisibleOnLoad, 100);
    }

    // Re-initialize on dynamic content load (if needed)
    const observer = new MutationObserver(() => {
        // Re-run if new content is added dynamically
        const newElements = document.querySelectorAll('.section:not(.revealed)');
        if (newElements.length > 0) {
            initScrollReveal();
        }
    });

    // Observe body for new elements (with debounce)
    let timeout;
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

