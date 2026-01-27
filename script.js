document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Simple Scroll Animation (Fade In) ---
    // Will apply to elements with 'data-animate' attribute later
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('#stats');
    const counters = document.querySelectorAll('.stat-number');
    let started = false; // Function started ? No

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps approx

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            started = true;
        }
    }, { threshold: 0.5 }); // Trigger when 50% of stats section is visible

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Testimonial Slider ---
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        let currentSlideIndex = 0;

        const updateSlidePosition = () => {
            track.style.transform = `translateX(calc(-${currentSlideIndex * 100}% - ${currentSlideIndex * 20}px))`;
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                updateSlidePosition();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                updateSlidePosition();
            });
        }

        // Auto-play
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlidePosition();
        }, 5000);
    }
});
