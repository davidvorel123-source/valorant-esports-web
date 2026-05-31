const translations = {
    en: {
        "nav.home": "Home",
        "nav.schedule": "Schedule",
        "nav.roster": "Roster",
        "nav.stream": "Stream",
        "nav.merch": "Merch",
        "nav.tryouts": "Tryouts",
        "nav.trophies": "Trophies",
        "nav.faq": "FAQ",
        "nav.about": "About",
        "nav.legacy": "Legacy",
        "hero.meet": "MEET THE TEAM",
        "hero.discord": "JOIN DISCORD",
        "hero.socials": "OFFICIAL TEAM SOCIALS",
        "schedule.title": "MATCH SCHEDULE",
        "schedule.upcoming": "UPCOMING MATCH",
        "schedule.tba": "TO BE ANNOUNCED",
        "schedule.nexttbd": "NEXT MATCH TBD",
        "schedule.staytuned": "STAY TUNED",
        "schedule.watch": "WATCH LIVE ON KICK",
        "roster.title": "OUR ROSTER",
        "role.igl": "IGL / SECOND DUELIST",
        "role.duelist": "DUELIST",
        "role.initiator": "INITIATOR",
        "role.smoker": "SMOKER",
        "role.flex": "FLEX",
        "role.sub_duelist": "SUB / DUELIST",
        "role.sub_smoker": "SUB / SMOKER",
        "about.title": "OUR PHILOSOPHY",
        "about.adapt": "ADAPTABILITY",
        "about.brotherhood": "BROTHERHOOD",
        "about.adapt_text": "Mid-round reads, map switches, counter-strategies. The Herd adapts faster than the enemy can respond. Winning is a mindset, not a plan.",
        "about.brotherhood_text": "GCZ is not just a team. We are friends who compete at the highest level. The trust between us on the server translates directly into results every single match.",
        "legacy.title": "OUR LEGACY",
        "legacy.last": "Last Matches",
        "legacy.milestones": "Milestones & Goals",
        "legacy.focus": "Main Focus:",
        "legacy.goal": "Goal:",
        "legacy.ascend": "Ascend to VCT EMEA",
        "merch.gear": "OFFICIAL GEAR",
        "merch.dropping": "MERCH DROPPING SOON",
        "merch.desc": "Rep the Herd. Premium jerseys, hoodies, and accessories are currently in production. Join the Discord to get notified first.",
        "merch.waitlist": "JOIN DISCORD TO WAITLIST",
        "marquee.text": "DEFY THE LIMITS • GOATS CZ • VALORANT PREMIER"
    },
    cz: {
        "nav.home": "Domů",
        "nav.schedule": "Zápasy",
        "nav.roster": "Tým",
        "nav.stream": "Stream",
        "nav.merch": "Merch",
        "nav.tryouts": "Nábor",
        "nav.trophies": "Trofeje",
        "nav.faq": "FAQ",
        "nav.about": "O nás",
        "nav.legacy": "Historie",
        "hero.meet": "POZNEJ TÝM",
        "hero.discord": "PŘIPOJ SE NA DISCORD",
        "hero.socials": "OFICIÁLNÍ SÍTĚ",
        "schedule.title": "ROZPIS ZÁPASŮ",
        "schedule.upcoming": "DALŠÍ ZÁPAS",
        "schedule.tba": "BUDE OZNÁMENO",
        "schedule.nexttbd": "DALŠÍ ZÁPAS TBD",
        "schedule.staytuned": "ZŮSTAŇTE S NÁMI",
        "schedule.watch": "SLEDUJ ŽIVĚ NA KICKU",
        "roster.title": "NÁŠ TÝM",
        "role.igl": "IGL / DRUHÝ DUELIST",
        "role.duelist": "DUELIST",
        "role.initiator": "INITIATOR",
        "role.smoker": "SMOKER",
        "role.flex": "FLEX",
        "role.sub_duelist": "NÁHRADNÍK / DUELIST",
        "role.sub_smoker": "NÁHRADNÍK / SMOKER",
        "about.title": "NAŠE FILOSOFIE",
        "about.adapt": "ADAPTABILITA",
        "about.brotherhood": "BRATRSTVÍ",
        "about.adapt_text": "Čtení hry, rychlé změny mapy, counter-stratování. Naše stádo se přizpůsobí rychleji, než nepřítel zareaguje. Výhra není plán, ale nastavení mysli.",
        "about.brotherhood_text": "GCZ není jen tým. Jsme přátelé, co hrají na nejvyšší úrovni. Důvěra mezi námi na serveru se odráží ve výsledku každého jednoho zápasu.",
        "legacy.title": "NAŠE HISTORIE",
        "legacy.last": "Poslední zápasy",
        "legacy.milestones": "Milníky a Cíle",
        "legacy.focus": "Hlavní zaměření:",
        "legacy.goal": "Cíl:",
        "legacy.ascend": "Postoupit do VCT EMEA",
        "merch.gear": "OFICIÁLNÍ MERCH",
        "merch.dropping": "MERCH JIŽ BRZY",
        "merch.desc": "Reprezentuj stádo. Prémiové dresy, mikiny a doplňky jsou právě ve výrobě. Připoj se na náš Discord a získej info jako první.",
        "merch.waitlist": "PŘIPOJ SE A ZÍSKEJ PŘEDNOST",
        "marquee.text": "PŘEKONEJ HRANICE • GOATS CZ • VALORANT PREMIER"
    }
};

let currentLang = localStorage.getItem('gcz_lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gcz_lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Handle marquee special case
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        const t = translations[lang]["marquee.text"];
        marquee.innerText = t + " • " + t + " • " + t + " • " + t + " • ";
    }

    // Update toggles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active-lang');
        } else {
            btn.classList.remove('active-lang');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup toggle listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Apply initial language
    setLanguage(currentLang);
});
