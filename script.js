document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
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

    // Scroll-in animation for player cards
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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

    // Animated stat counters
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

    // Fade-in-up animation observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    // FAQ Accordion
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

    // Typewriter effect for hero subtitle
    let subtitleTexts = [];
    let currentSubtitleIndex = 0;
    
    function startTypewriter() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        if (subtitle.typingTimeout) {
            clearTimeout(subtitle.typingTimeout);
        }
        
        let fullText = subtitle.getAttribute('data-full-text');
        let currentRaw = subtitle.textContent.replace(/<span.*<\/span>/, '').trim();
        
        // If translation changed the text or first load
        if (!fullText || currentRaw.includes('|') || currentRaw !== fullText) {
            if (currentRaw.includes('|')) {
                 subtitleTexts = currentRaw.split('|');
                 subtitle.setAttribute('data-full-texts', JSON.stringify(subtitleTexts));
                 currentSubtitleIndex = 0;
            } else if (subtitle.hasAttribute('data-full-texts')) {
                 subtitleTexts = JSON.parse(subtitle.getAttribute('data-full-texts'));
            } else {
                 subtitleTexts = [currentRaw];
            }
        }
        
        if (subtitleTexts.length === 0) return;
        
        fullText = subtitleTexts[currentSubtitleIndex];
        subtitle.setAttribute('data-full-text', fullText);
        
        subtitle.innerHTML = '';
        let i = 0;
        let isDeleting = false;
        
        function typeWriter() {
            let currentStr = subtitleTexts[currentSubtitleIndex];
            
            if (isDeleting) {
                subtitle.innerHTML = currentStr.substring(0, i - 1) + '<span class="cursor" style="opacity: 1; font-weight: bold; animation: blink 1s step-end infinite;">|</span>';
                i--;
            } else {
                subtitle.innerHTML = currentStr.substring(0, i + 1) + '<span class="cursor" style="opacity: 1; font-weight: bold; animation: blink 1s step-end infinite;">|</span>';
                i++;
            }
            
            let typingSpeed = isDeleting ? 30 : 60;
            
            if (!isDeleting && i === currentStr.length) {
                typingSpeed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && i === 0) {
                isDeleting = false;
                currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitleTexts.length;
                subtitle.setAttribute('data-full-text', subtitleTexts[currentSubtitleIndex]);
                typingSpeed = 500; // Pause before typing next
            }
            
            subtitle.typingTimeout = setTimeout(typeWriter, typingSpeed);
        }
        typeWriter();
    }

    startTypewriter();
    window.startTypewriter = startTypewriter;

    // Dynamic Match Dates
    function updateDynamicDates() {
        const elements = document.querySelectorAll('.dynamic-date');
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Zero out for accurate day diff
        
        elements.forEach(el => {
            const matchDateStr = el.getAttribute('data-match-date');
            if (!matchDateStr) return;
            
            const matchDate = new Date(matchDateStr);
            const matchDateZero = new Date(matchDate);
            matchDateZero.setHours(0, 0, 0, 0);
            
            const diffMs = matchDateZero - now;
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            
            const lang = localStorage.getItem('gcz_lang') || 'en';

            if (diffDays < 0) {
                text = lang === 'cz' ? 'ODEHRÁNO' : 'PLAYED';
            } else if (diffDays === 0) {
                text = lang === 'cz' ? 'DNES' : 'TODAY';
            } else if (diffDays === 1) {
                text = lang === 'cz' ? 'ZÍTRA' : 'TOMORROW';
            } else if (diffDays < 7) {
                if (lang === 'cz') {
                    const daysCz = ['TUTO NEDĚLI', 'TOTO PONDĚLÍ', 'TUTO ÚTERÝ', 'TUTO STŘEDU', 'TENTO ČTVRTEK', 'TENTO PÁTEK', 'TUTO SOBOTU'];
                    text = daysCz[matchDate.getDay()];
                } else {
                    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
                    text = 'THIS ' + days[matchDate.getDay()];
                }
            } else {
                text = lang === 'cz' ? 'ZA ' + diffDays + ' DNÍ' : 'IN ' + diffDays + ' DAYS';
            }
            
            el.textContent = text;
        });
    }

    updateDynamicDates();
    window.updateDynamicDates = updateDynamicDates;
    setInterval(updateDynamicDates, 3600000); // Check every hour

    // Match Countdown System
    function updateMatchCountdowns() {
        const countdowns = document.querySelectorAll('.match-countdown');
        const now = new Date().getTime();
        const lang = localStorage.getItem('gcz_lang') || 'en';
        
        countdowns.forEach(el => {
            const targetStr = el.getAttribute('data-target');
            if (!targetStr) return;
            const targetDate = new Date(targetStr).getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                el.innerHTML = `<span style="color: var(--val-red); font-weight: bold; font-size: 1.5rem; letter-spacing: 2px;">${lang === 'cz' ? 'PRÁVĚ PROBÍHÁ' : 'LIVE NOW'}</span>`;
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysLabel = lang === 'cz' ? 'DNÍ' : 'DAYS';
            const hoursLabel = lang === 'cz' ? 'HOD' : 'HRS';
            const minLabel = lang === 'cz' ? 'MIN' : 'MIN';
            const secLabel = lang === 'cz' ? 'SEK' : 'SEC';

            el.innerHTML = `
                <div style="display: flex; gap: 1rem; justify-content: center; font-family: var(--font-heading); font-size: 2.5rem; color: var(--val-white); text-shadow: 2px 2px 0 rgba(0,0,0,0.5);">
                    <div style="display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; min-width: 80px; border: 1px solid rgba(255,255,255,0.05);">
                        <span>${days.toString().padStart(2, '0')}</span>
                        <span style="font-family: var(--font-body); font-size: 0.7rem; color: var(--val-grey); letter-spacing: 1px;">${daysLabel}</span>
                    </div>
                    <span style="color: var(--val-red); align-self: center; margin-top: -15px;">:</span>
                    <div style="display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; min-width: 80px; border: 1px solid rgba(255,255,255,0.05);">
                        <span>${hours.toString().padStart(2, '0')}</span>
                        <span style="font-family: var(--font-body); font-size: 0.7rem; color: var(--val-grey); letter-spacing: 1px;">${hoursLabel}</span>
                    </div>
                    <span style="color: var(--val-red); align-self: center; margin-top: -15px;">:</span>
                    <div style="display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; min-width: 80px; border: 1px solid rgba(255,255,255,0.05);">
                        <span>${minutes.toString().padStart(2, '0')}</span>
                        <span style="font-family: var(--font-body); font-size: 0.7rem; color: var(--val-grey); letter-spacing: 1px;">${minLabel}</span>
                    </div>
                    <span style="color: var(--val-red); align-self: center; margin-top: -15px;">:</span>
                    <div style="display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; min-width: 80px; border: 1px solid rgba(255,255,255,0.05);">
                        <span>${seconds.toString().padStart(2, '0')}</span>
                        <span style="font-family: var(--font-body); font-size: 0.7rem; color: var(--val-grey); letter-spacing: 1px;">${secLabel}</span>
                    </div>
                </div>
            `;
        });
    }
    
    updateMatchCountdowns();
    window.updateMatchCountdowns = updateMatchCountdowns;
    setInterval(updateMatchCountdowns, 1000);

    // Hero Particles System
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(255, 70, 85, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            let particleCount = Math.floor(window.innerWidth / 15);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    // Scrim Form Submission to Discord Webhook
    const scrimForm = document.getElementById('scrim-form');
    if (scrimForm) {
        scrimForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const teamInput = document.getElementById('scrim-team').value;
            const rankInput = document.getElementById('scrim-rank').value;
            const msgInput = document.getElementById('scrim-msg').value;
            const statusDiv = document.getElementById('scrim-status');
            const submitBtn = scrimForm.querySelector('button[type="submit"]');
            
            // NOTE: Replace this URL with your actual Discord Webhook URL
            const webhookUrl = "https://discord.com/api/webhooks/1512559018714071132/iG15uEITjL1ubuKrQ_nB6fh6HP5thv_mPKij7hcseAqzNKUqyF7TQp2-qtdPDR7MrT61"; 
            
            submitBtn.disabled = true;
            submitBtn.innerText = "SENDING...";
            statusDiv.style.display = "none";

            const payload = {
                content: "🔔 Nová žádost o Scrim!",
                embeds: [{
                    title: "⚔️ Scrim Request: " + teamInput,
                    color: 16729685, // Val Red #ff4655
                    fields: [
                        { name: "Tým / Tracker", value: teamInput, inline: true },
                        { name: "Průměrný Rank", value: rankInput, inline: true },
                        { name: "Zpráva / Dostupnost", value: msgInput }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            if (webhookUrl === "YOUR_DISCORD_WEBHOOK_URL_HERE") {
                statusDiv.innerText = "⚠️ Webhook URL není nastavena. Kontaktujte prosím na Discordu.";
                statusDiv.style.color = "orange";
                statusDiv.style.display = "block";
                submitBtn.innerText = "SEND REQUEST";
                submitBtn.disabled = false;
                return;
            }

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    statusDiv.innerText = "✅ Žádost úspěšně odeslána! Ozveme se na Discordu.";
                    statusDiv.style.color = "#53fc18";
                    statusDiv.style.display = "block";
                    scrimForm.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error("Webhook error:", error);
                statusDiv.innerText = "❌ Chyba při odesílání. Zkuste nám napsat přímo na Discord.";
                statusDiv.style.color = "var(--val-red)";
                statusDiv.style.display = "block";
            } finally {
                submitBtn.innerText = "SEND REQUEST";
                submitBtn.disabled = false;
            }
        });
    }

    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.player-card, .highlight-card, .philosophy-card, .trophy-card');
    tiltElements.forEach(el => {
        el.addEventListener('mouseenter', () => { el.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s'; });
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Fix Trophy hover for 3D
    const trophies = document.querySelectorAll('#trophies [onmouseover]');
    trophies.forEach(t => {
        t.classList.add('trophy-card');
    });

    // Custom cursor removed for performance

    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    if (preloader && preloaderBar) {
        let progress = 0;
        let interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            preloaderBar.style.width = progress + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }, 400);
            }
        }, 150);
    }
});

async function loadNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    const lang = localStorage.getItem('gcz_lang') || 'en';

    const simulatedNews = [
        {
            date: "JUNE 5, 2026",
            title: {
                en: "14th PLACE IN PREMIER",
                cz: "14. MÍSTO V PREMIER"
            },
            content: {
                en: "We proudly secured the 14th spot in the Premier Contender Division! A huge thanks to the fans for their continued support as we climb our way to the top.",
                cz: "Hrdě jsme obsadili 14. místo v Premier Contender Divizi! Obrovské díky patří fanouškům za jejich neustálou podporu na naší cestě vzhůru."
            },
            important: true
        },
        {
            date: "JUNE 4, 2026",
            title: {
                en: "ROSTER UPDATE: WOODY JOINS, R1VVO LEAVES",
                cz: "ZTRÁTY A NÁLEZY: WOODY PŘICHÁZÍ, R1VVO ODCHÁZÍ"
            },
            content: {
                en: "We are parting ways with R1VVO and wish him the best in his future endeavors. At the same time, we welcome Woody to our active roster as Sentinel, with Luky moving to the sub position alongside Tezzy.",
                cz: "Loučíme se s R1VVO a přejeme mu to nejlepší. Zároveň vítáme Woodyho do naší aktivní sestavy na pozici Sentinel, přičemž Luky se přesouvá na pozici náhradníka k Tezzymu."
            },
            important: false
        },
        {
            date: "JUNE 4, 2026",
            title: {
                en: "WEBSITE REVAMPED",
                cz: "NOVÝ WEB SPUŠTĚN"
            },
            content: {
                en: "Goats CZ officially launched a brand new website complete with dynamic forms, improved SEO, and full bilingual support.",
                cz: "Goats CZ oficiálně spustili zbrusu nový web s dynamickými formuláři, lepším SEO a kompletní dvojjazyčnou podporou."
            },
            important: false
        },
        {
            date: "MAY 22, 2026",
            title: {
                en: "ROSTER LOCKED IN",
                cz: "SESTAVA UZAMČENA"
            },
            content: {
                en: "The new Goats CZ roster is officially locked in for the upcoming season. Weeks of tryouts and intense practice have forged a deadly core.",
                cz: "Nová sestava Goats CZ je oficiálně uzamčena pro nadcházející sezónu. Týdny zkoušek a intenzivního tréninku vykovaly smrtící jádro."
            },
            important: false
        }
    ];

    newsContainer.innerHTML = '';

    simulatedNews.forEach(news => {
        const tTitle = news.title[lang] || news.title.en;
        const tContent = news.content[lang] || news.content.en;

        if (news.important) {
            newsContainer.innerHTML += `
            <div style="flex: 1 1 400px; background-color: var(--val-dark); border: 1px solid var(--val-red); padding: 2rem; transition: transform 0.2s; box-shadow: 0 0 15px rgba(255, 70, 85, 0.2);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <span style="color: var(--val-red); font-weight: bold; font-size: 0.9rem; letter-spacing: 1px;">${news.date}</span>
                <h3 style="font-family: var(--font-heading); font-size: 2rem; margin: 1rem 0; color: var(--val-white); text-transform: uppercase;">${tTitle}</h3>
                <p style="color: var(--val-grey); line-height: 1.6;">${tContent}</p>
            </div>`;
        } else {
            newsContainer.innerHTML += `
            <div style="flex: 1 1 400px; background-color: var(--val-dark); border: 1px solid rgba(255, 70, 85, 0.2); padding: 2rem; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <span style="color: var(--val-red); font-weight: bold; font-size: 0.9rem; letter-spacing: 1px;">${news.date}</span>
                <h3 style="font-family: var(--font-heading); font-size: 2rem; margin: 1rem 0; color: var(--val-white); text-transform: uppercase;">${tTitle}</h3>
                <p style="color: var(--val-grey); line-height: 1.6;">${tContent}</p>
            </div>`;
        }
    });
}

window.loadNews = loadNews;
loadNews();

// Performant Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    if (cursor && follower && window.innerWidth > 768) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let followerX = mouseX;
        let followerY = mouseY;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animate() {
            cursorX += (mouseX - cursorX) * 1;
            cursorY += (mouseY - cursorY) * 1;
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animate);
        }
        animate();

        const hoverElements = document.querySelectorAll('a, button, input, textarea, .player-card, .highlight-card, .nav-links li, .cta-button, .social-link');
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

    const toggleBtn = document.getElementById('toggle-timeline-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.querySelector('.timeline-container');
            const isShowingAll = container.classList.toggle('show-all');
            const lang = localStorage.getItem('gcz_lang') || 'en';
            
            let textEn = isShowingAll ? 'SHOW LESS' : 'SHOW MORE MATCHES';
            let textCs = isShowingAll ? 'ZOBRAZIT MÉNĚ' : 'ZOBRAZIT DALŠÍ ZÁPASY';
            let key = isShowingAll ? 'legacy.showLess' : 'legacy.showAll';
            
            toggleBtn.innerHTML = `<span data-i18n="${key}">${lang === 'cs' ? textCs : textEn}</span> <i class="fa-solid fa-chevron-${isShowingAll ? 'up' : 'down'}"></i>`;
        });
    }
});
