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

    // ==============================
    // SCROLL PROGRESS BAR
    // ==============================
    const scrollProgressFill = document.getElementById('scrollProgressFill');
    window.addEventListener('scroll', () => {
        if (scrollProgressFill) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressFill.style.width = scrollPercent + '%';
        }
    });

    // ==============================
    // BACK TO TOP BUTTON
    // ==============================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==============================
    // SCROLL REVEAL ANIMATIONS
    // ==============================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // ==============================
    // MAGNETIC BUTTONS
    // ==============================
    const magneticButtons = document.querySelectorAll('.cta-button');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==============================
    // EASTER EGG (TYPE "GOAT")
    // ==============================
    let secretCode = ['g', 'o', 'a', 't'];
    let secretCodeIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === secretCode[secretCodeIndex]) {
            secretCodeIndex++;
            if (secretCodeIndex === secretCode.length) {
                triggerGoatRain();
                secretCodeIndex = 0;
            }
        } else {
            secretCodeIndex = 0;
        }
    });

    function triggerGoatRain() {
        document.body.classList.add('shake-active');
        const sfxGlitch = document.getElementById('sfx-glitch');
        if (sfxGlitch) { sfxGlitch.currentTime = 0; sfxGlitch.play().catch(()=>{}); }
        setTimeout(() => document.body.classList.remove('shake-active'), 3000);

        const fragment = document.createDocumentFragment();
        const goats = [];
        
        // Vytvoříme elementy najednou (250 koz je pro výkon bezpečnější, s GPU to poletí hladce)
        for (let i = 0; i < 250; i++) {
            const goat = document.createElement('div');
            goat.textContent = '🐐';
            goat.style.position = 'fixed';
            goat.style.left = Math.random() * 100 + 'vw';
            goat.style.top = '-100px';
            goat.style.fontSize = (Math.random() * 3 + 1) + 'rem';
            goat.style.zIndex = '10000';
            goat.style.pointerEvents = 'none';
            // GPU akcelerace
            goat.style.willChange = 'transform';
            
            fragment.appendChild(goat);
            
            goats.push({
                element: goat,
                delay: Math.random() * 1500, // náhodné zpoždění startu
                duration: Math.random() * 3 + 2, // náhodná délka pádu
                rotation: Math.random() * 720 - 360 // rotace
            });
        }
        
        // Přidáme všechny kozy do DOMu jedním reflow
        document.body.appendChild(fragment);
        
        // Spustíme animace pomocí hardwarově akcelerovaného transform (translate3d)
        goats.forEach(g => {
            setTimeout(() => {
                g.element.style.transition = `transform ${g.duration}s linear`;
                // Plynulý pohyb po Y ose s využitím GPU
                g.element.style.transform = `translate3d(0, 150vh, 0) rotate(${g.rotation}deg)`;
                
                // Úklid po dokončení animace
                setTimeout(() => {
                    g.element.remove();
                }, g.duration * 1000 + 100);
            }, g.delay);
        });
    }

    // ==============================
    // EXTREME BRUTAL UPGRADE LOGIC
    // ==============================

    // 1. Custom Cursor & Parallax Background
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    if (cursor && follower) {
        document.body.classList.add('cursor-active');
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = window.innerWidth / 2;
        let followerY = window.innerHeight / 2;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate cursor position
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            
            // Parallax body background
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (centerX - mouseX) / 30;
            const moveY = (centerY - mouseY) / 30;
            document.body.style.backgroundPosition = `${moveX}px ${moveY}px, ${moveX + 20}px ${moveY + 20}px`;
        });
        
        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .cta-button, .player-card, .philosophy-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // 2. SFX Audio
    const sfxHover = document.getElementById('sfx-hover');
    if (sfxHover) {
        sfxHover.volume = 0.2;
        const sfxElements = document.querySelectorAll('.cta-button, .nav-links a, .player-card');
        sfxElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                sfxHover.currentTime = 0;
                sfxHover.play().catch(() => {}); // Catch error if interaction blocked
            });
        });
    }

    // 3. Holographic Glare for Player Cards
    document.querySelectorAll('.player-card').forEach(card => {
        // Create glare element
        const glare = document.createElement('div');
        glare.classList.add('card-glare');
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate angle
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            
            // Calculate translation for the glare sweep
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            glare.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${percentX - 50}%, ${percentY - 50}%)`;
        });
    });

});
