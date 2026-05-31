const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  ['<a href="#schedule">SCHEDULE</a>', '<a href="#schedule" data-i18n="nav.schedule">SCHEDULE</a>'],
  ['<a href="#roster">ROSTER</a>', '<a href="#roster" data-i18n="nav.roster">ROSTER</a>'],
  ['<a href="#about">ABOUT</a>', '<a href="#about" data-i18n="nav.about">ABOUT</a>'],
  ['<a href="#legacy">LEGACY</a>', '<a href="#legacy" data-i18n="nav.legacy">LEGACY</a>'],
  ['<a href="#merch">MERCH</a>', '<a href="#merch" data-i18n="nav.merch">MERCH</a>'],
  ['MEET THE TEAM <span class="arrow">→</span>', '<span data-i18n="hero.meet">MEET THE TEAM</span> <span class="arrow">→</span>'],
  ['JOIN DISCORD <span class="arrow">→</span>', '<span data-i18n="hero.discord">JOIN DISCORD</span> <span class=\"arrow\">→</span>'],
  ['OFFICIAL TEAM SOCIALS', '<span data-i18n="hero.socials">OFFICIAL TEAM SOCIALS</span>'],
  ['MATCH SCHEDULE', '<span data-i18n="schedule.title">MATCH SCHEDULE</span>'],
  ['UPCOMING MATCH', '<span data-i18n="schedule.upcoming">UPCOMING MATCH</span>'],
  ['TO BE ANNOUNCED', '<span data-i18n="schedule.tba">TO BE ANNOUNCED</span>'],
  ['NEXT MATCH TBD', '<span data-i18n="schedule.nexttbd">NEXT MATCH TBD</span>'],
  ['STAY TUNED', '<span data-i18n="schedule.staytuned">STAY TUNED</span>'],
  ['WATCH LIVE ON KICK', '<span data-i18n="schedule.watch">WATCH LIVE ON KICK</span>'],
  ['OUR ROSTER', '<span data-i18n="roster.title">OUR ROSTER</span>'],
  ['IGL / SECOND DUELIST', '<span data-i18n="role.igl">IGL / SECOND DUELIST</span>'],
  ['DUELIST', '<span data-i18n="role.duelist">DUELIST</span>'],
  ['INITIATOR', '<span data-i18n="role.initiator">INITIATOR</span>'],
  ['SMOKER', '<span data-i18n="role.smoker">SMOKER</span>'],
  ['FLEX', '<span data-i18n="role.flex">FLEX</span>'],
  ['SUB / DUELIST', '<span data-i18n="role.sub_duelist">SUB / DUELIST</span>'],
  ['SUB / SMOKER', '<span data-i18n="role.sub_smoker">SUB / SMOKER</span>'],
  ['OUR PHILOSOPHY', '<span data-i18n="about.title">OUR PHILOSOPHY</span>'],
  ['ADAPTABILITY', '<span data-i18n="about.adapt">ADAPTABILITY</span>'],
  ['BROTHERHOOD', '<span data-i18n="about.brotherhood">BROTHERHOOD</span>'],
  ['Mid-round reads, map switches, counter-strategies. The Herd adapts faster than the enemy can respond. Winning is a mindset, not a plan.', '<span data-i18n="about.adapt_text">Mid-round reads, map switches, counter-strategies. The Herd adapts faster than the enemy can respond. Winning is a mindset, not a plan.</span>'],
  ['GCZ is not just a team. We are friends who compete at the highest level. The trust between us on the server translates directly into results every single match.', '<span data-i18n="about.brotherhood_text">GCZ is not just a team. We are friends who compete at the highest level. The trust between us on the server translates directly into results every single match.</span>'],
  ['OUR LEGACY', '<span data-i18n="legacy.title">OUR LEGACY</span>'],
  ['Last Matches', '<span data-i18n="legacy.last">Last Matches</span>'],
  ['Milestones & Goals', '<span data-i18n="legacy.milestones">Milestones & Goals</span>'],
  ['Main Focus:', '<span data-i18n="legacy.focus">Main Focus:</span>'],
  ['Goal:', '<span data-i18n="legacy.goal">Goal:</span>'],
  ['Ascend to VCT EMEA', '<span data-i18n="legacy.ascend">Ascend to VCT EMEA</span>'],
  ['OFFICIAL GEAR', '<span data-i18n="merch.gear">OFFICIAL GEAR</span>'],
  ['MERCH DROPPING SOON', '<span data-i18n="merch.dropping">MERCH DROPPING SOON</span>'],
  ['Rep the Herd. Premium jerseys, hoodies, and accessories are currently in production. Join the Discord to get notified first.', '<span data-i18n="merch.desc">Rep the Herd. Premium jerseys, hoodies, and accessories are currently in production. Join the Discord to get notified first.</span>'],
  ['JOIN DISCORD TO WAITLIST', '<span data-i18n="merch.waitlist">JOIN DISCORD TO WAITLIST</span>'],
  ['DEFY THE LIMITS • GOATS CZ • VALORANT PREMIER', '<span data-i18n="marquee.text">DEFY THE LIMITS • GOATS CZ • VALORANT PREMIER</span>']
];

for (const [search, replace] of replacements) {
  html = html.split(search).join(replace);
}
fs.writeFileSync('index.html', html);
console.log("Done replacing.");
