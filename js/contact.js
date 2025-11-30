// Contact Page JavaScript - Form Validation

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            message: 'Please select a subject'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Please enter a message with at least 10 characters'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');

        // Remove previous error class
        field.classList.remove('error');
        errorElement.textContent = '';

        // Check required
        if (rules.required && !value.trim()) {
            field.classList.add('error');
            errorElement.textContent = 'This field is required';
            return false;
        }

        // Skip further validation if field is empty and not required
        if (!rules.required && !value.trim()) {
            return true;
        }

        // Check min length
        if (rules.minLength && value.length < rules.minLength) {
            field.classList.add('error');
            errorElement.textContent = rules.message || `Minimum ${rules.minLength} characters required`;
            return false;
        }

        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            field.classList.add('error');
            errorElement.textContent = rules.message || 'Invalid format';
            return false;
        }

        return true;
    }

    // Validate entire form
    function validateForm(formData) {
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName) || '';
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(fieldName, this.value);
            });

            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(fieldName, this.value);
                }
            });
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Remove previous messages
            formMessage.classList.remove('success', 'error');
            formMessage.style.display = 'none';

            // Get form data
            const formData = new FormData(form);

            // Validate form
            if (!validateForm(formData)) {
                formMessage.classList.add('error');
                formMessage.textContent = 'Please correct the errors in the form before submitting.';
                formMessage.style.display = 'block';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
            }

            // Disable submit button
            const submitBtn = form.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate form submission (since no backend)
            setTimeout(() => {
                // Show success message
                formMessage.classList.add('success');
                formMessage.textContent = 'Thank you! Your message has been received. We will get back to you soon.';
                formMessage.style.display = 'block';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Reset form
                form.reset();

                // Reset submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }

                // In a real application, you would send the data to a server here
                console.log('Form data:', Object.fromEntries(formData));

                // Scroll to message
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }, 1000);
        });
    }

    // Scroll reveal animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
});

