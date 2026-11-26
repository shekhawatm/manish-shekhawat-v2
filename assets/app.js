/* Manish Shekhawat, v2: small, dependency-free interactions. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EMAIL = "shekhawatm57@gmail.com";

  /* theme */
  $$("[data-theme-toggle]").forEach((b) =>
    b.addEventListener("click", () => {
      const root = document.documentElement;
      const cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    }),
  );

  /* India clock */
  const clocks = $$("[data-clock]");
  const tick = () => {
    const t = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
    clocks.forEach((c) => (c.textContent = `India, ${t}`));
  };
  if (clocks.length) { tick(); setInterval(tick, 30000); }

  /* scroll progress */
  const bar = $(".progress");
  if (bar) {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* count-up numbers */
  const countUp = (el) => {
    const end = +el.dataset.count;
    if (reduce) { el.firstChild.textContent = end; return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.firstChild.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* reveal on scroll */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(countUp);
        io.unobserve(e.target);
      }),
    { threshold: 0.15 },
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* rotating word */
  const rot = $(".rotator");
  if (rot && !reduce) {
    const words = rot.dataset.words.split("|");
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      rot.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-8px)" }], { duration: 180, fill: "forwards" }).onfinish = () => {
        rot.textContent = words[i];
        rot.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 240, fill: "forwards" });
      };
    }, 2200);
  }

  /* confetti */
  const COLORS = ["#ff6b4a", "#7c5cff", "#12b886", "#ffb020", "#2f9bff"];
  const confetti = (x = innerWidth / 2, y = innerHeight / 2, n = 40) => {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      p.className = "confetti";
      p.style.background = COLORS[i % COLORS.length];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      document.body.appendChild(p);
      const a = Math.random() * Math.PI * 2;
      const v = 80 + Math.random() * 180;
      p.animate(
        [
          { transform: "translate(0,0) rotate(0)", opacity: 1 },
          { transform: `translate(${Math.cos(a) * v}px, ${Math.sin(a) * v + 160}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
        ],
        { duration: 1000 + Math.random() * 600, easing: "cubic-bezier(.2,.8,.3,1)" },
      ).onfinish = () => p.remove();
    }
  };
  window.confetti = confetti;

  /* toast */
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  let tt;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  /* copy email */
  $$("[data-copy-email]").forEach((b) =>
    b.addEventListener("click", async (e) => {
      try { await navigator.clipboard.writeText(EMAIL); say("Email copied. Talk soon! ✉️"); }
      catch { say(EMAIL); }
      confetti(e.clientX, e.clientY, 36);
    }),
  );

  /* avatar: confetti + a random hello */
  const hellos = ["Namaste! 🙏", "Hi there! 👋", "Let's hire great people 🚀", "Remote, across 26 countries 🌍"];
  $$("[data-avatar]").forEach((a) =>
    a.addEventListener("click", (e) => {
      confetti(e.clientX, e.clientY, 30);
      say(hellos[Math.floor(Math.random() * hellos.length)]);
    }),
  );

  /* hero chat: messages appear one by one, with a typing indicator */
  const chat = $(".chat");
  if (chat) {
    const msgs = $$(".msg", chat);
    if (reduce) msgs.forEach((m) => m.classList.add("show"));
    else {
      let d = 500;
      msgs.forEach((m) => {
        const bubble = $(".bubble", m);
        const html = bubble.innerHTML;
        setTimeout(() => {
          if (!m.classList.contains("me")) bubble.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
          m.classList.add("show");
          setTimeout(() => (bubble.innerHTML = html), m.classList.contains("me") ? 0 : 700);
        }, d);
        d += m.classList.contains("me") ? 900 : 1500;
      });
    }
  }

  /* tool filters */
  const filters = $(".filters");
  if (filters) {
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      $$("button", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const f = b.dataset.filter;
      $$(".tool").forEach((t) => t.classList.toggle("hide", f !== "all" && t.dataset.cat !== f));
    });
  }

  /* "Mini Manish" chat widget: canned answers, all taken from the site's own words */
  const QA = [
    ["👋 What do you do?", "I run recruiting, people ops and culture at Fireflies.ai, for a fully remote team hiring across 26 countries with no external recruiters."],
    ["📈 Proudest number?", "Offer acceptance went from 66% in 2021 to 94% in 2026. And 98% of candidates rated their experience 4.5 or higher."],
    ["🛠️ What have you built?", 'Hiring pipelines, a candidate board, an AI search-string builder, an outreach agent and more, built with Claude and AI agents. <a href="/built" style="text-decoration:underline">See them all →</a>'],
    ["💡 Best hiring rule?", "Source, don't outsource. And: the process flexes, the bar doesn't."],
    ["🏃 Outside work?", "I run, cook and read."],
    ["✉️ How do I reach you?", `Email is the best way: <a href="mailto:${EMAIL}" style="text-decoration:underline">${EMAIL}</a>. Happy to talk remote hiring, people ops or building with AI.`],
  ];
  const fab = document.createElement("button");
  fab.className = "cw-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Open chat with Mini Manish");
  fab.setAttribute("aria-expanded", "false");
  fab.innerHTML = '<img src="/assets/avatar-face.jpg" alt=""><span class="ping"></span><span class="lbl">Ask me anything</span>';
  const cw = document.createElement("div");
  cw.className = "cw";
  cw.setAttribute("role", "dialog");
  cw.setAttribute("aria-label", "Chat with Mini Manish");
  cw.innerHTML = `
    <div class="cw-head"><img src="/assets/avatar-face.jpg" alt=""><div><b>Mini Manish</b><small>Usually replies instantly ⚡</small></div>
      <button type="button" aria-label="Close chat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
    <div class="cw-body" aria-live="polite"></div>
    <div class="cw-chips"></div>`;
  document.body.append(fab, cw);
  const body = $(".cw-body", cw);
  const chips = $(".cw-chips", cw);
  const add = (html, me = false) => {
    const m = document.createElement("div");
    m.className = `msg${me ? " me" : ""}`;
    m.innerHTML = `${me ? "" : '<img src="/assets/avatar-face.jpg" alt="">'}<div class="bubble">${html}</div>`;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  };
  let greeted = false;
  const open = (v) => {
    cw.classList.toggle("open", v);
    fab.setAttribute("aria-expanded", String(v));
    if (v && !greeted) {
      greeted = true;
      add("Hey! I'm Mini Manish 🤖 Pick a question below and I'll answer for the real one.");
    }
  };
  fab.addEventListener("click", () => open(!cw.classList.contains("open")));
  $(".cw-head button", cw).addEventListener("click", () => open(false));
  addEventListener("keydown", (e) => e.key === "Escape" && open(false));
  QA.forEach(([q, a]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = q;
    b.addEventListener("click", () => {
      add(q, true);
      const t = add('<span class="typing"><i></i><i></i><i></i></span>');
      setTimeout(() => {
        $(".bubble", t).innerHTML = a;
        body.scrollTop = body.scrollHeight;
      }, reduce ? 0 : 650);
    });
    chips.appendChild(b);
  });
})();
