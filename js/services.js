// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animations disabled for services page
    // Force all elements to be visible immediately
    const allElements = document.querySelectorAll('.section, .section-title, .service-title, .service-header, .service-gallery-wrapper, .service-text, .scroll-reveal, .fade-in-up, .cta-content');
    allElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.visibility = 'visible';
        element.classList.add('revealed');
    });

    // Smooth scroll to service section if anchor link is present
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Image Gallery Lightbox Modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Open modal when gallery image is clicked
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.getAttribute('data-full');
            modalCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

