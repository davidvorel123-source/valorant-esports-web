document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // LOADING SCREEN
    // ==============================
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => loadingScreen.remove(), 600);
        }, 1500);
    }

    // ==============================
    // CUSTOM CURSOR
    // ==============================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursor && cursorDot) {
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        function animateCursor() {
            dotX += (cursorX - dotX) * 0.15;
            dotY += (cursorY - dotY) * 0.15;
            cursor.style.left = dotX + 'px';
            cursor.style.top = dotY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow cursor on interactive elements
        document.querySelectorAll('a, button, .faq-question, .player-card, .cta-button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            });
        });
    }

    // ==============================
    // MOBILE MENU TOGGLE
    // ==============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(15, 25, 35, 0.98)';
            navLinks.style.padding = '1rem 0';
            navLinks.style.borderBottom = '2px solid var(--val-red)';
        });
    }

    // ==============================
    // NAVBAR SCROLL EFFECT
    // ==============================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        lastScrollY = currentScrollY;
    });

    // ==============================
    // PARALLAX HERO ELEMENTS
    // ==============================
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
        }
    });

    // ==============================
    // SCROLL-IN ANIMATION FOR PLAYER CARDS
    // ==============================
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.player-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // ==============================
    // 3D TILT EFFECT ON PLAYER CARDS
    // ==============================
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==============================
    // ANIMATED STAT COUNTERS
    // ==============================
    const counters = document.querySelectorAll('.stat-counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 1500;
                const steps = duration / 16;
                const step = target / steps;
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 16);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ==============================
    // FADE-IN-UP ANIMATION OBSERVER
    // ==============================
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    // ==============================
    // FAQ ACCORDION
    // ==============================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            const isOpen = answer.style.maxHeight;
            
            // Close all others
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = null;
            });
            document.querySelectorAll('.faq-icon').forEach(ic => {
                ic.style.transform = 'rotate(0deg)';
            });
            
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // ==============================
    // DYNAMIC MATCH DATES
    // ==============================
    function updateDynamicDates() {
        const elements = document.querySelectorAll('.dynamic-date');
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        
        elements.forEach(el => {
            const matchDateStr = el.getAttribute('data-match-date');
            if (!matchDateStr) return;
            
            const matchDate = new Date(matchDateStr);
            const matchDateZero = new Date(matchDate);
            matchDateZero.setHours(0, 0, 0, 0);
            
            const diffMs = matchDateZero - now;
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            
            let text = '';
            if (diffDays < 0) {
                text = 'PLAYED';
            } else if (diffDays === 0) {
                text = 'TODAY';
            } else if (diffDays === 1) {
                text = 'TOMORROW';
            } else if (diffDays < 7) {
                const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
                text = 'THIS ' + days[matchDate.getDay()];
            } else {
                text = 'IN ' + diffDays + ' DAYS';
            }
            
            el.textContent = text;
        });
    }

    updateDynamicDates();
    setInterval(updateDynamicDates, 3600000);

    // ==============================
    // LIVE MATCH COUNTDOWN TIMER
    // ==============================
    function updateCountdowns() {
        const countdownEls = document.querySelectorAll('.match-countdown');
        countdownEls.forEach(el => {
            const targetDate = new Date(el.dataset.target);
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                el.innerHTML = '<span class="countdown-live">🔴 LIVE NOW</span>';
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            el.innerHTML = `
                <div class="countdown-unit">
                    <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
                    <span class="countdown-label">HRS</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
                    <span class="countdown-label">MIN</span>
                </div>
                <span class="countdown-separator">:</span>
                <div class="countdown-unit">
                    <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
                    <span class="countdown-label">SEC</span>
                </div>
            `;
        });
    }

    updateCountdowns();
    setInterval(updateCountdowns, 1000);

    // ==============================
    // TYPED TEXT EFFECT FOR HERO SUBTITLE
    // ==============================
    const typedEl = document.querySelector('.typed-text');
    if (typedEl) {
        const phrases = [
            'SILENCE THE NOISE. DOMINATE THE SERVER.',
            'WE ARE THE HERD.',
            'FEAR THE GOATS.',
            'CZECH FIREPOWER.',
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        setTimeout(typeEffect, 1000);
    }

    // ==============================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ==============================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-link');
            }
        });
    });

});
