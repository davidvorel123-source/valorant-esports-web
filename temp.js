const fs = require('fs');

// 1. UPDATE i18n.js
let i18n = fs.readFileSync('i18n.js', 'utf8');

const enNew = `        "hero.defy": "DEFY THE LIMITS",
        "faq.title": "FREQUENTLY ASKED QUESTIONS",
        "faq.q1": "Do you have a dedicated coach?",
        "faq.a1": "Currently, our IGL and the core team handle VOD reviews and strategy crafting. However, we are open to working with an experienced coach in the future.",
        "faq.q2": "How long have you been playing together?",
        "faq.a2": "The core of the team has been grinding together since this year (2026), building deep synergy and absolute trust in each other's plays.",
        "faq.q3": "What are the ultimate goals of the team?",
        "faq.a3": "Our primary objective is to dominate the Premier Contender division and fight our way into the Challengers league through Ascension.",
        "faq.q4": "Where can I watch your official matches?",
        "faq.a4": "We stream most of our official Premier matches and tournaments directly on our player POVs via Twitch and Kick. Follow our Discord to get notified when we go live!",
        "faq.q5": "How can I support Goats CZ?",
        "faq.a5": "The best way is to follow our players on socials, jump into our streams, and cheer us on during match days! Official merch is also dropping soon.",
        "footer.join": "JOIN THE HERD.",
        "footer.contact": "Contact:",
        "footer.rights": "All rights reserved.",
        "stats.matches": "Matches Played",
        "stats.winrate": "Win Rate",
        "stats.tourneys": "Tournaments Won",
        "roster.mains": "Mains:",
        "schedule.vstbd": "GCZ vs. TBD",
        "schedule.premier": "VALORANT PREMIER"`;

const czNew = `        "hero.defy": "PŘEKONEJ HRANICE",
        "faq.title": "ČASTO KLADENÉ DOTAZY",
        "faq.q1": "Máte dedikovaného kouče?",
        "faq.a1": "Momentálně řeší VOD reviews a strategie náš IGL a jádro týmu. Do budoucna jsme ale otevřeni spolupráci se zkušeným koučem.",
        "faq.q2": "Jak dlouho hrajete spolu?",
        "faq.a2": "Jádro týmu spolu dře od začátku tohoto roku (2026). Budujeme hlubokou synergii a absolutní důvěru.",
        "faq.q3": "Jaké jsou ultimátní cíle týmu?",
        "faq.a3": "Naším hlavním cílem je dominovat v Premier Contender divizi a probojovat se do ligy Challengers skrz Ascension.",
        "faq.q4": "Kde můžu sledovat vaše oficiální zápasy?",
        "faq.a4": "Většinu Premier zápasů a turnajů streamujeme přímo z pohledů hráčů na Twitchi a Kicku. Sleduj náš Discord pro info o tom, kdy jsme live!",
        "faq.q5": "Jak můžu Goats CZ podpořit?",
        "faq.a5": "Nejlepší způsob je sledovat naše hráče na sítích, dorazit na streamy a fandit během zápasů! Brzy navíc vyjde i oficiální merch.",
        "footer.join": "PŘIDEJ SE KE STÁDU.",
        "footer.contact": "Kontakt:",
        "footer.rights": "Všechna práva vyhrazena.",
        "stats.matches": "Odehraných zápasů",
        "stats.winrate": "Win Rate",
        "stats.tourneys": "Vyhraných turnajů",
        "roster.mains": "Mains:",
        "schedule.vstbd": "GCZ vs. TBD",
        "schedule.premier": "VALORANT PREMIER"`;

i18n = i18n.replace('"marquee.text": "DEFY THE LIMITS • GOATS CZ • VALORANT PREMIER"', '"marquee.text": "DEFY THE LIMITS • GOATS CZ • VALORANT PREMIER",\n' + enNew);
i18n = i18n.replace('"marquee.text": "PŘEKONEJ HRANICE • GOATS CZ • VALORANT PREMIER"', '"marquee.text": "PŘEKONEJ HRANICE • GOATS CZ • VALORANT PREMIER",\n' + czNew);

fs.writeFileSync('i18n.js', i18n);

// 2. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  ['<h1 class="hero-title" data-text="DEFY THE LIMITS">DEFY THE LIMITS</h1>', '<h1 class="hero-title" data-text="DEFY THE LIMITS" data-i18n="hero.defy">DEFY THE LIMITS</h1>'],
  ['<h2 class="section-title">FREQUENTLY ASKED QUESTIONS</h2>', '<h2 class="section-title" data-i18n="faq.title">FREQUENTLY ASKED QUESTIONS</h2>'],
  ['Do you have a dedicated coach?', '<span data-i18n="faq.q1">Do you have a dedicated coach?</span>'],
  ['Currently, our IGL and the core team handle VOD reviews and strategy crafting. However, we are open to working with an experienced coach in the future.', '<span data-i18n="faq.a1">Currently, our IGL and the core team handle VOD reviews and strategy crafting. However, we are open to working with an experienced coach in the future.</span>'],
  ['How long have you been playing together?', '<span data-i18n="faq.q2">How long have you been playing together?</span>'],
  ['The core of the team has been grinding together since this year (2026), building deep synergy and absolute trust in each other\'s plays.', '<span data-i18n="faq.a2">The core of the team has been grinding together since this year (2026), building deep synergy and absolute trust in each other\'s plays.</span>'],
  ['What are the ultimate goals of the team?', '<span data-i18n="faq.q3">What are the ultimate goals of the team?</span>'],
  ['Our primary objective is to dominate the Premier Contender division and fight our way into the Challengers league through Ascension.', '<span data-i18n="faq.a3">Our primary objective is to dominate the Premier Contender division and fight our way into the Challengers league through Ascension.</span>'],
  ['Where can I watch your official matches?', '<span data-i18n="faq.q4">Where can I watch your official matches?</span>'],
  ['We stream most of our official Premier matches and tournaments directly on our player POVs via Twitch and Kick. Follow our Discord to get notified when we go live!', '<span data-i18n="faq.a4">We stream most of our official Premier matches and tournaments directly on our player POVs via Twitch and Kick. Follow our Discord to get notified when we go live!</span>'],
  ['How can I support Goats CZ?', '<span data-i18n="faq.q5">How can I support Goats CZ?</span>'],
  ['The best way is to follow our players on socials, jump into our streams, and cheer us on during match days! Official merch is also dropping soon.', '<span data-i18n="faq.a5">The best way is to follow our players on socials, jump into our streams, and cheer us on during match days! Official merch is also dropping soon.</span>'],
  ['JOIN THE HERD.', '<span data-i18n="footer.join">JOIN THE HERD.</span>'],
  ['Contact: ', '<span data-i18n="footer.contact">Contact: </span>'],
  [' All rights reserved.', ' <span data-i18n="footer.rights">All rights reserved.</span>'],
  ['<span class="stat-label">Matches Played</span>', '<span class="stat-label" data-i18n="stats.matches">Matches Played</span>'],
  ['<span class="stat-label">Win Rate</span>', '<span class="stat-label" data-i18n="stats.winrate">Win Rate</span>'],
  ['<span class="stat-label">Tournaments Won</span>', '<span class="stat-label" data-i18n="stats.tourneys">Tournaments Won</span>'],
  ['Mains:', '<span data-i18n="roster.mains">Mains:</span>'],
  ['GCZ vs. TBD', '<span data-i18n="schedule.vstbd">GCZ vs. TBD</span>'],
  ['VALORANT PREMIER', '<span data-i18n="schedule.premier">VALORANT PREMIER</span>']
];

for (const [s, r] of replacements) {
    html = html.split(s).join(r);
}

fs.writeFileSync('index.html', html);
console.log("Files updated successfully.");
