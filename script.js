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
    function startTypewriter() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        if (subtitle.typingTimeout) {
            clearTimeout(subtitle.typingTimeout);
        }
        
        let fullText = subtitle.getAttribute('data-full-text');
        
        // If translation changed the text or first load
        if (!fullText || subtitle.textContent.replace('|', '').trim() !== fullText) {
            fullText = subtitle.textContent.replace('|', '').trim();
            subtitle.setAttribute('data-full-text', fullText);
        }
        
        subtitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < fullText.length) {
                subtitle.innerHTML = fullText.substring(0, i + 1) + '<span class="cursor" style="opacity: 1; font-weight: bold; animation: blink 1s step-end infinite;">|</span>';
                i++;
                subtitle.typingTimeout = setTimeout(typeWriter, 60);
            }
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
            const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL_HERE"; 
            
            submitBtn.disabled = true;
            submitBtn.innerText = "SENDING...";
            statusDiv.style.display = "none";

            const payload = {
                content: "<@&YOUR_ROLE_ID> Nová žádost o Scrim!",
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

    // Dynamic News (RSS feed or fallback JSON logic)
    // We will attempt to fetch a generic RSS feed endpoint if they have one,
    // otherwise we just render some dummy structured data as an example of "dynamic" news.
    async function loadNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;

        // In a real app with RSS, you'd fetch an RSS to JSON proxy or directly parse XML
        // Example: const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://goatscz.com/feed');
        
        // For now, we simulate fetched data:
        const simulatedNews = [
            {
                date: "JUNE 4, 2026",
                title: "WEBSITE REVAMPED",
                content: "Goats CZ officially launched a brand new website complete with dynamic forms, improved SEO, and full bilingual support.",
                important: false
            },
            {
                date: "MAY 23, 2026",
                title: "TEZZY & R1VVO JOIN AS SUBS",
                content: "We are thrilled to welcome Tezzy and R1VVO to the herd as our official substitutes. Their flexibility and firepower will be a massive asset.",
                important: false
            },
            {
                date: "MAY 22, 2026",
                title: "ROSTER LOCKED IN",
                content: "The new Goats CZ roster is officially locked in for the upcoming season. Weeks of tryouts and intense practice have forged a deadly core.",
                important: true // To trigger the special styling
            }
        ];

        newsContainer.innerHTML = ''; // Clear loading text

        simulatedNews.forEach(news => {
            if (news.important) {
                // Special "Recaps" or Important style card
                newsContainer.innerHTML += `
                <div style="flex: 1 1 400px; background-color: var(--val-dark); border: 1px dashed rgba(255, 255, 255, 0.2); padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5;">
                    <span style="font-size: 3rem; margin-bottom: 1rem;">📊</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; margin: 1rem 0; color: var(--val-white); text-transform: uppercase;">${news.title}</h3>
                    <span style="color: var(--val-red); font-weight: bold; font-size: 1.2rem; letter-spacing: 2px;">COMING SOON</span>
                </div>
                `;
            } else {
                newsContainer.innerHTML += `
                <div style="flex: 1 1 400px; background-color: var(--val-dark); border: 1px solid rgba(255, 70, 85, 0.2); padding: 2rem; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <span style="color: var(--val-red); font-weight: bold; font-size: 0.9rem; letter-spacing: 1px;">${news.date}</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; margin: 1rem 0; color: var(--val-white); text-transform: uppercase;">${news.title}</h3>
                    <p style="color: var(--val-grey); line-height: 1.6;">${news.content}</p>
                </div>
                `;
            }
        });
    }

    loadNews();

});
