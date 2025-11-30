// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.getElementById('galleryGrid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const type = item.getAttribute('data-type');
                if (filter === 'all' || type === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease';
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Collect all viewable items (images and videos)
    const allMediaItems = Array.from(document.querySelectorAll('.view-btn'));
    let currentIndex = 0;

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalMedia = document.getElementById('modalMedia');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalCounter = document.getElementById('modalCounter');

    function openModal(index) {
        currentIndex = index;
        updateModalContent();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Pause all videos in gallery when modal opens
        galleryItems.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Pause modal video if playing
        const modalVideo = modalMedia.querySelector('video');
        if (modalVideo) {
            modalVideo.pause();
        }
    }

    function updateModalContent() {
        const currentItem = allMediaItems[currentIndex];
        const src = currentItem.getAttribute('data-src');
        const type = currentItem.getAttribute('data-type');

        modalMedia.innerHTML = '';

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Gallery Image';
            modalMedia.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalMedia.appendChild(video);
        }

        // Update counter
        modalCounter.textContent = `${currentIndex + 1} / ${allMediaItems.length}`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % allMediaItems.length;
        updateModalContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + allMediaItems.length) % allMediaItems.length;
        updateModalContent();
    }

    // Event listeners for opening modal
    allMediaItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Find the actual index in allMediaItems array
            const itemIndex = allMediaItems.indexOf(item);
            openModal(itemIndex);
        });
    });

    // Also allow clicking the gallery item itself
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                const viewBtn = this.querySelector('.view-btn');
                if (viewBtn) {
                    const itemIndex = allMediaItems.indexOf(viewBtn);
                    openModal(itemIndex);
                }
            }
        });
    });

    // Modal controls
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrev();
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNext();
        });
    }

    // Close modal on overlay click
    const modalOverlay = modal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });

    // Scroll reveal animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Play videos on hover (for gallery items)
    galleryItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            item.addEventListener('mouseenter', function() {
                video.play();
            });

            item.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});

