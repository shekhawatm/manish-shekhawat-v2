// Generates every page from shared parts. Edit the data below, then run: node scripts/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..");
const EMAIL = "shekhawatm57@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/manishshekhawatradar/";
const GITHUB = "https://github.com/shekhawatm";

const ic = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  home: ic('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  compass: ic('<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6z"/>'),
  hammer: ic('<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="M17.6 15 22 10.6 13.4 2 9 6.4z"/>'),
  heart: ic('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>'),
  moon: ic('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>'),
  sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  arrow: ic('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  mail: ic('<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-10 6L2 7"/>'),
  copy: ic('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  trend: ic('<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'),
  star: ic('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'),
  zap: ic('<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'),
  users: ic('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
  globe: ic('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>'),
  bot: ic('<rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4M8 4h8M9 14h.01M15 14h.01"/>'),
};

const NAV = [["/", "Home", "home"], ["/journey", "Journey", "compass"], ["/built", "Built", "hammer"], ["/approach", "Approach", "heart"]];
const cur = (h, path) => (h === path ? ' aria-current="page"' : "");

const head = (title, desc, path) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="/assets/avatar-full.jpg">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#fff8ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14121f" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/avatar-face.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<div class="blobs" aria-hidden="true"><span></span><span></span><span></span></div>
<header class="nav">
  <a class="brand" href="/" aria-label="Manish Shekhawat, home"><img src="/assets/avatar-face.jpg" alt=""><b>Manish<i>.</i></b></a>
  <nav class="nav-links" aria-label="Main">${NAV.map(([h, n]) => `<a href="${h}"${cur(h, path)}>${n}</a>`).join("")}</nav>
  <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch light or dark theme"><span class="theme-moon">${I.moon}</span><span class="theme-sun">${I.sun}</span></button>
</header>
<nav class="tabbar" aria-label="Pages">${NAV.map(([h, n, i]) => `<a href="${h}"${cur(h, path)}>${I[i]}${n}</a>`).join("")}</nav>
<main id="main" class="wrap">
`;

const foot = () => `
<section class="cta reveal" id="contact" aria-labelledby="cta-h">
  <span class="eyebrow" style="color:var(--sun)">Say hello</span>
  <h2 id="cta-h" class="display" style="margin-top:12px">Let's build a team <span class="serif">people love.</span></h2>
  <p>Always happy to talk about remote hiring, people ops or building with AI. Email is the best way to reach me.</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="mailto:${EMAIL}">${I.mail} Email me</a>
    <button class="btn btn-ghost" type="button" data-copy-email>${I.copy} Copy email</button>
  </div>
</section>
<footer class="foot">
  <span>© Manish Shekhawat · <span data-clock>India</span></span>
  <span class="socials">
    <a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a> ·
    <a href="${GITHUB}" target="_blank" rel="noopener">GitHub ↗</a> ·
    <a href="mailto:${EMAIL}">Email</a>
  </span>
</footer>
</main>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;

const page = (name, title, desc, path, body) => writeFileSync(join(OUT, name), head(title, desc, path) + body + foot());

// ───────────── Content (same words as the original site) ─────────────
const STATS = [
  [94, "offer acceptance in 2026, up from 66% in 2021", "coral", "trend"],
  [98, "of candidates rated their experience 4.5 or higher", "violet", "star"],
  [33, "faster time-to-hire after rebuilding the process", "mint", "zap"],
];
const JOBS = [
  ["Fireflies.ai", "Head of Recruiting &amp; Culture", "2020 – now", "F", "#7c5cff", true],
  ["Pesto Tech", "Talent Acquisition Specialist", "2019 – 20", "P", "#ff6b4a"],
  ["OYO", "Senior HR, Tech Hiring", "2018 – 19", "O", "#e5484d"],
  ["EdTech (stealth)", "Co-founder", "2018", "E", "#12b886"],
  ["Anzy Careers", "Senior Recruitment Specialist", "2017 – 18", "A", "#2f9bff"],
  ["Astra HR Services", "Technical Recruiter", "2016 – 17", "A", "#e09400"],
];
const TOOLS = [
  ["Hiring pipeline", "Every role and next step, one view", "Recruiting", "🧭", "coral"],
  ["Candidate board", "Live status, so managers stop asking", "Hiring", "📋", "violet"],
  ["Search-string builder", "A job description in, search strings out", "AI agent", "🔎", "mint"],
  ["Payroll tracker", "Flags issues before payday", "People ops", "💸", "sun"],
  ["Screening report", "A daily summary posted every morning", "Automation", "☀️", "sky"],
  ["Playbook generator", "Role kits and hiring guides in minutes", "Claude", "📚", "coral"],
  ["Comp calculator", "Pay bands anyone can use", "Self-serve", "🧮", "violet"],
  ["Outreach agent", "Personal notes at scale, with reminders", "AI agent", "✉️", "mint"],
  ["Org chart sync", "Synced from one master sheet", "People ops", "🌳", "sun"],
  ["Onboarding kit", "Welcome before day one, check-ins after", "Culture", "🎁", "sky"],
];
const PRINCIPLES = [
  ["Source, don't outsource.", "Direct outreach over agencies.", "#ff6b4a"],
  ["Close without the founders.", "Leadership stays on product.", "#7c5cff"],
  ["Automate before adding headcount.", "", "#12b886"],
  ["Feedback to every candidate,", "even the no.", "#e09400"],
  ["The process flexes. The bar doesn't.", "", "#2f9bff"],
];
const QUOTES = [
  ["A matured head on young shoulders: exactly what senior leadership hiring needs.", "Nagendra Prasad K S", "VP of Engineering, American Express", "NP", "#7c5cff"],
  ["If your profile is being handled by Manish, you know you're in good hands.", "Rakshit Garg", "Analytics Leader, Blinkit", "RG", "#ff6b4a"],
];
const AWARDS = [
  ["No Chill", "Fireflies.ai annual awards, Mauritius", "2025", "🏝️", "coral"],
  ["Hustle Hero", "Fireflies.ai global meetup, Vietnam", "2024", "🔥", "violet"],
  ["Hustle Hero", "Fireflies.ai", "2023", "⚡", "sun"],
  ["Onwards", "Fireflies.ai", "2022", "🚀", "mint"],
  ["Energy", "Fireflies.ai", "2021", "✨", "sky"],
];
const MARQUEE = ["Amazon", "Flipkart", "Uber", "OYO", "Pesto Tech", "Fireflies.ai", "26 countries", "Fully remote", "No external recruiters"];

const statCards = () => STATS.map(([n, t, c, i], k) => `
    <div class="card stat reveal" style="transition-delay:${k * 0.08}s">
      <span class="ico t-${c}">${I[i]}</span>
      <div class="num" data-count="${n}">${n}<small>%</small></div>
      <p>${t}</p>
      <div class="bar"><i style="--w:${n}%;background:var(--${c})"></i></div>
    </div>`).join("");

const toolCards = (items) => items.map(([n, d, cat, e, c], k) => `
    <article class="card tool reveal" data-cat="${cat}" style="transition-delay:${(k % 3) * 0.06}s">
      <div class="tool-top"><span class="ico t-${c}" aria-hidden="true">${e}</span><span class="tag t-${c}">${cat}</span></div>
      <h3>${n}</h3><p>${d}</p>
    </article>`).join("");

const quoteCards = () => QUOTES.map(([q, n, r, ini, col], k) => `
    <blockquote class="card quote reveal" style="transition-delay:${k * 0.08}s">
      <p>${q}</p>
      <footer><span class="ini" style="background:${col}" aria-hidden="true">${ini}</span><span><b>${n}</b>${r}</span></footer>
    </blockquote>`).join("");

const sectionHead = (eyebrow, id, a, b, link = "") => `
  <div class="head-row reveal">
    <div><span class="eyebrow">${eyebrow}</span><h2 id="${id}" class="display h2">${a} <span class="serif">${b}</span></h2></div>${link}
  </div>`;

// ───────────── Home ─────────────
page("index.html", "Manish Shekhawat · Head of Recruiting & Culture at Fireflies.ai",
  "Head of Recruiting & Culture at Fireflies.ai. Ten years of building hiring teams, people ops and the tools behind them.", "/", `
<section class="hero">
  <div>
    <span class="pill"><span class="dot"></span> Head of Recruiting &amp; Culture · Fireflies.ai</span>
    <h1 class="display">Hi, I'm Manish <span class="wave">👋</span><br>I build <span class="serif">hiring engines.</span></h1>
    <p class="lede">From <b>“we need someone”</b> to a signed offer. Ten years of hiring <span class="rotator" data-words="engineers|leaders|operators|great teams">engineers</span></p>
    <div class="chat" aria-label="A quick hello">
      <div class="msg me"><div class="bubble">So… what's your story? 👀</div></div>
      <div class="msg"><img src="/assets/avatar-face.jpg" alt=""><div class="bubble">First at agencies for Amazon, Flipkart and Uber, then in-house at OYO and Pesto Tech.</div></div>
      <div class="msg"><img src="/assets/avatar-face.jpg" alt=""><div class="bubble">In 2020 I joined Fireflies.ai as its <b>first people hire</b>. Now: recruiting, people ops &amp; culture across 26 countries 🌍</div></div>
    </div>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#contact">${I.mail} Say hello</a>
      <a class="btn btn-ghost" href="/journey">See my journey ${I.arrow}</a>
    </div>
  </div>
  <div class="hero-art">
    <div class="avatar-stage">
      <div class="avatar-ring" aria-hidden="true"></div>
      <button class="avatar-img" type="button" data-avatar aria-label="Say hi to Manish"><img src="/assets/avatar-face.jpg" alt="Illustrated portrait of Manish, smiling"></button>
      <div class="badge b1"><span class="em t-coral">🎯</span>94% offer accept</div>
      <div class="badge b2"><span class="em t-mint">🌍</span>26 countries</div>
      <div class="badge b3"><span class="em t-violet">🤖</span>Builds with AI</div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...MARQUEE, ...MARQUEE].map((c) => `<span>${c}</span>`).join("")}</div></div>

<section class="block" aria-labelledby="num-h">${sectionHead("In numbers", "num-h", "Results that", "speak.")}
  <div class="grid g3">${statCards()}</div>
</section>

<section class="block" aria-labelledby="do-h">${sectionHead("What I do", "do-h", "Three hats,", "one team.")}
  <div class="grid g3">
    <div class="card feature reveal"><div class="ico t-coral">${I.users}</div><h3>Recruiting</h3><p>Engineers, leaders and operators, hired directly. No external recruiters.</p></div>
    <div class="card feature reveal" style="transition-delay:.08s"><div class="ico t-violet">${I.globe}</div><h3>People ops &amp; culture</h3><p>Running people and culture for a fully remote team across 26 countries.</p></div>
    <div class="card feature reveal" style="transition-delay:.16s"><div class="ico t-mint">${I.bot}</div><h3>Building with AI</h3><p>Spare hours go into the tools my team runs on, built with Claude and AI agents.</p></div>
  </div>
</section>

<section class="block" aria-labelledby="built-h">${sectionHead("Things I've built", "built-h", "Tools my team", "runs on.", `<a class="link-arrow" href="/built">All 10 tools ${I.arrow}</a>`)}
  <div class="grid g3">${toolCards(TOOLS.slice(0, 3))}</div>
</section>

<section class="block" aria-labelledby="kind-h">${sectionHead("Kind words", "kind-h", "What people", "say.", `<a class="link-arrow" href="/approach">How I work ${I.arrow}</a>`)}
  <div class="grid g2">${quoteCards()}</div>
</section>
`);

// ───────────── Journey ─────────────
page("journey.html", "Journey · Manish Shekhawat", "Ten years of recruiting, from agencies to the first people hire at Fireflies.ai.", "/journey", `
<section class="page-head">
  <span class="pill"><span class="dot"></span> 2016 → now</span>
  <h1 class="display">Ten years, <span class="serif">one craft.</span></h1>
  <p class="sub">From agencies hiring for Amazon, Flipkart and Uber, to in-house at OYO and Pesto Tech, to the first people hire at Fireflies.ai.</p>
</section>
<section class="block" style="padding-top:48px" aria-labelledby="exp-h">${sectionHead("Experience", "exp-h", "Where I've", "worked.")}
  <ol class="timeline" style="list-style:none">${JOBS.map(([n, r, y, m, col, now]) => `
    <li class="tl-item reveal${now ? " now" : ""}">
      <div class="card"><span class="logo" style="background:${col}" aria-hidden="true">${m}</span>
        <div><h3>${n}</h3><p>${r}</p></div><span class="tag ${now ? "t-coral" : "t-violet"}">${y}</span></div>
    </li>`).join("")}
  </ol>
</section>
<section class="block" aria-labelledby="rec-h">${sectionHead("Recognition", "rec-h", "Awards at", "Fireflies.ai.")}
  <div class="grid g5">${AWARDS.map(([n, d, y, e, c], k) => `
    <div class="card award reveal" style="transition-delay:${k * 0.06}s"><div class="medal t-${c}" aria-hidden="true">${e}</div>
      <h3>${n}</h3><p>${d}</p><span class="tag t-${c}" style="margin-top:10px">${y}</span></div>`).join("")}
  </div>
</section>
`);

// ───────────── Built ─────────────
const cats = [...new Set(TOOLS.map((t) => t[2]))].sort();
page("built.html", "Built · Manish Shekhawat", "Ten tools for hiring and people ops, built with Claude and AI agents.", "/built", `
<section class="page-head">
  <span class="pill"><span class="dot"></span> Built with Claude &amp; AI agents</span>
  <h1 class="display">Things I've <span class="serif">built.</span></h1>
  <p class="sub">Lately I spend my spare hours building the tools my team runs on. Automate before adding headcount.</p>
</section>
<section class="block" style="padding-top:40px" aria-label="Tools">
  <div class="filters" role="group" aria-label="Filter tools">
    <button type="button" data-filter="all" aria-pressed="true">All</button>
    ${cats.map((c) => `<button type="button" data-filter="${c}" aria-pressed="false">${c}</button>`).join("")}
  </div>
  <div class="grid g3">${toolCards(TOOLS)}</div>
</section>
`);

// ───────────── Approach ─────────────
page("approach.html", "Approach · Manish Shekhawat", "How Manish hires: five principles, kind words and life outside work.", "/approach", `
<section class="page-head">
  <span class="pill"><span class="dot"></span> How I work</span>
  <h1 class="display">The process flexes. <span class="serif">The bar doesn't.</span></h1>
  <p class="sub">Five rules behind a hiring engine that runs across 26 countries with no external recruiters.</p>
</section>
<section class="block" style="padding-top:40px" aria-label="Principles">
  <div class="grid g2">${PRINCIPLES.map(([t, s, col], k) => `
    <div class="card principle reveal" style="transition-delay:${(k % 2) * 0.08}s"><span class="n" style="background:${col}">${String(k + 1).padStart(2, "0")}</span>
      <div><h3>${t}</h3>${s ? `<p>${s}</p>` : ""}</div></div>`).join("")}
  </div>
</section>
<section class="block" aria-labelledby="kw-h">${sectionHead("Kind words", "kw-h", "What people", "say.")}
  <div class="grid g2">${quoteCards()}</div>
</section>
<section class="block" aria-labelledby="off-h">${sectionHead("Off the clock", "off-h", "Outside", "work.")}
  <div class="grid g3">
    <div class="card feature reveal"><div class="ico t-coral">🏃</div><h3>Run</h3><p>Miles that clear the head.</p></div>
    <div class="card feature reveal" style="transition-delay:.08s"><div class="ico t-sun">🍳</div><h3>Cook</h3><p>The other kind of recipe.</p></div>
    <div class="card feature reveal" style="transition-delay:.16s"><div class="ico t-violet">📖</div><h3>Read</h3><p>Always one book on the go.</p></div>
  </div>
</section>
`);

// ───────────── 404 ─────────────
page("404.html", "Not found · Manish Shekhawat", "Page not found.", "", `
<section class="page-head" style="text-align:center;padding:100px 0 40px">
  <div style="font-size:72px" aria-hidden="true">🧭</div>
  <h1 class="display">This page is <span class="serif">still hiring.</span></h1>
  <p class="sub" style="margin:0 auto 24px">Nothing here yet. Let's get you back to the good stuff.</p>
  <a class="btn btn-primary" href="/">${I.home} Back home</a>
</section>
`);

writeFileSync(join(OUT, "assets", "icon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b4a"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs>
<rect width="64" height="64" rx="18" fill="url(#g)"/>
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="38" fill="#fff">M</text>
<circle cx="49" cy="47" r="4" fill="#ffb020"/></svg>
`);
writeFileSync(join(OUT, "vercel.json"), '{\n  "cleanUrls": true,\n  "trailingSlash": false\n}\n');
console.log("Built index, journey, built, approach, 404");
