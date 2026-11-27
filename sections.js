/* Rupyon sections: the words, moments, calculator, protection carousel, reveals, nav state and smooth anchors shared by every version of the site.
   A page calls RupyonSections.init({ fan }) once, then RupyonSections.setLang(l) whenever it changes language, and RupyonSections.goTo(hash) for hash jumps. */
window.RupyonSections = (() => {
let lang = "en";
/* ---------- words, in English and Hindi. The Hindi is a draft for native review ---------- */
const RISK = { en: "Mutual fund investments are subject to market risks. Read all scheme related documents carefully.", hi: "म्यूचुअल फंड निवेश बाज़ार जोखिमों के अधीन हैं। योजना से जुड़े सभी दस्तावेज़ ध्यान से पढ़ें।" };
const STR = {
  en: { cta: "Start With ₹100", risk: RISK.en, support: "Support 24/7",
    mLabel: "Maa hai na", mTitle: "Money ready when it’s needed.", mSub: "Money she put aside days and months ago, there when the family needs it.",
    rLabel: "Your rhythm", rTitle: "Save the way you earn.", rSub: "Daily, weekly or monthly, from ₹100. See what it adds up to.", daily: "Daily", weekly: "Weekly", monthly: "Monthly", cHow: "How often", cAmt: "Amount each time", cDur: "For how long", cOut: "You’ll have put aside", cFine: "This counts only what you put in. The value of mutual funds can go up or down.", rNote: "Set it once with your UPI PIN. UPI AutoPay does the rest.",
    yLabel: "Your money stays yours", yTitle: "How are your funds protected?", pCard: "Card",
    p1: "SEBI regulated", p1b: "Every fund on Rupyon follows the rules SEBI sets for mutual funds in India.", p2: "We never hold your money", p2b: "A separate SEBI-registered custodian holds it. Not Rupyon, not the fund house.", p3: "The units are in your name", p3b: "Linked to your PAN and recorded with the registrar, not with us.", p4: "Take out your money whenever you want", p4b: "No lock-in. Pause, reduce or stop whenever you want.",
    lLabel: "Your language", lTitle: "In your own language.", lSub: "Hard words turn simple, in eight languages.",
    sTitle: "Start with ₹100.", sSub: "Set it once, and it saves on its own." },
  hi: { cta: "₹100 से शुरू करें", risk: RISK.hi, support: "सहायता 24/7",
    mLabel: "माँ है ना", mTitle: "जब ज़रूरत हो, पैसा तैयार।", mSub: "दिनों और महीनों पहले बचाया पैसा, परिवार की ज़रूरत पर हाज़िर।",
    rLabel: "आपकी रफ़्तार", rTitle: "जैसी कमाई, वैसी बचत।", rSub: "रोज़, हर हफ़्ते या हर महीने, ₹100 से। देखिए कितना जुड़ता है।", daily: "रोज़", weekly: "हर हफ़्ते", monthly: "हर महीने", cHow: "कितनी बार", cAmt: "हर बार कितना", cDur: "कितने समय तक", cOut: "आपकी कुल जमा", cFine: "यह सिर्फ़ आपकी जमा की गई रकम है। म्यूचुअल फंड की वैल्यू घट-बढ़ सकती है।", rNote: "एक बार UPI PIN से सेट करें। बाकी UPI AutoPay कर देगा।",
    yLabel: "पैसा आपका ही रहता है", yTitle: "आपके फंड कैसे सुरक्षित हैं?", pCard: "कार्ड",
    p1: "SEBI से नियंत्रित", p1b: "यहाँ हर फंड उन नियमों पर चलता है जो SEBI भारत में म्यूचुअल फंड के लिए तय करता है।", p2: "हम आपका पैसा कभी अपने पास नहीं रखते", p2b: "इसे SEBI में पंजीकृत एक अलग कस्टोडियन रखता है। न Rupyon, न फंड हाउस।", p3: "यूनिट आपके नाम पर हैं", p3b: "आपके PAN से जुड़ी हैं और रजिस्ट्रार के पास दर्ज हैं, हमारे पास नहीं।", p4: "जब चाहें अपना पैसा निकालें", p4b: "कोई लॉक-इन नहीं। जब चाहें रोकें, घटाएँ या बंद करें।",
    lLabel: "आपकी भाषा", lTitle: "अपनी भाषा में।", lSub: "मुश्किल शब्द आसान, आठ भाषाओं में।",
    sTitle: "₹100 से शुरू करें।", sSub: "एक बार सेट करें, बचत अपने आप होगी।" },
};
const MOMENTS = [
  { who: "maa", art: "need-school-bag", amt: 3000, per: 100, unit: "day", n: 30, title: { en: "School fees", hi: "स्कूल की फ़ीस" }, due: { en: "Due Friday", hi: "शुक्रवार तक" }, line: { en: "No borrowing and no asking anyone.", hi: "न उधार, न किसी से माँगना।" } },
  { who: "maa", art: "need-gas-cylinder", amt: 900, per: 300, unit: "week", n: 3, title: { en: "Gas cylinder", hi: "गैस सिलेंडर" }, due: { en: "Ran out today", hi: "आज ख़त्म हुआ" }, line: { en: "Empty cylinder, and no worry.", hi: "सिलेंडर ख़त्म, पर कोई फ़िक्र नहीं।" } },
  { who: "bahu", art: "need-medicine", amt: 1500, per: 500, unit: "month", n: 3, title: { en: "Papa ji’s medicines", hi: "पापा जी की दवाइयाँ" }, due: { en: "This week", hi: "इसी हफ़्ते" }, line: { en: "Bought without asking anyone.", hi: "बिना किसी से कहे ख़रीदीं।" } },
  { who: "maa", art: "need-festive-clothes", amt: 2400, per: 100, unit: "day", n: 24, title: { en: "Diwali clothes", hi: "दिवाली के कपड़े" }, due: { en: "Before Diwali", hi: "दिवाली से पहले" }, line: { en: "New clothes for the whole house.", hi: "पूरे घर के लिए नए कपड़े।" } },
  { who: "maa", art: "need-bicycle", amt: 4800, per: 800, unit: "month", n: 6, title: { en: "A cycle for school", hi: "स्कूल की साइकिल" }, due: { en: "New term", hi: "नया सत्र" }, line: { en: "No more long walk to school.", hi: "अब स्कूल तक पैदल नहीं।" } },
  { who: "self", art: "need-sewing-machine", amt: 6000, per: 1000, unit: "month", n: 6, title: { en: "A sewing machine", hi: "सिलाई मशीन" }, due: { en: "For herself", hi: "अपने लिए" }, line: { en: "Her own work on her own machine.", hi: "अपना काम, अपनी मशीन।" } },
];
const WHO = { en: { maa: "Maa", bahu: "Bahu", self: "Herself" }, hi: { maa: "माँ", bahu: "बहू", self: "अपने लिए" } };
const UNIT = { en: { day: ["a day", "days"], week: ["a week", "weeks"], month: ["a month", "months"] }, hi: { day: ["रोज़", "दिन"], week: ["हर हफ़्ते", "हफ़्ते"], month: ["हर महीने", "महीने"] } };
const MSTR = { en: { rdy: "ready", bank: "Goes to her own bank account" }, hi: { rdy: "तैयार", bank: "सीधे अपने बैंक खाते में" } };
const rupee = n => "₹" + n.toLocaleString("en-IN");
function buildText(m, l) { const u = UNIT[l][m.unit]; return l === "hi" ? `${u[0]} ${rupee(m.per)}, ${m.n} ${u[1]} तक` : `${rupee(m.per)} ${u[0]} for ${m.n} ${u[1]}`; }
const ART = "assets/dabba/";
const BANK_ICON = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 7l7-4 7 4M3.5 7.5v5M7 7.5v5M11 7.5v5M14.5 7.5v5M2 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
let fan = false, started = false;

/* ---------- reveals: one system. Heads, cards and the calculator enter with opacity 0 and 24px down, once, 12% inside the screen,
   staggered 60ms and capped at four items. Under reduced motion nothing is hidden at all. ---------- */
let momentsShown = false;
const rvIO = reduce.matches || !("IntersectionObserver" in window) ? null : new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, p = el.parentElement;
  /* a row you swipe (the moments, the protection cards) shows all its cards together, so none fades in mid-swipe */
  const grp = p && p.scrollWidth > p.clientWidth + 1 && !el.matches(".sec-head > *") ? [...p.children] : [el];
  grp.forEach(x => { x.classList.add("in"); rvIO.unobserve(x); });
  if (el.matches(".moment, .moments")) momentsShown = true;
}), { rootMargin: "0px 0px -12% 0px" });
function rv(els, done) {
  if (!rvIO) return;
  [...els].forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--i", Math.min(i, 3)); if (done) el.classList.add("in"); else rvIO.observe(el); });
}

/* ---------- moments: a snap row on a phone and a grid on desktop; kiwi.html asks for the fan ---------- */
function momentCard(m, i, attrs) {
  const b = buildText(m, lang);
  return `<article class="moment"${attrs || ""} data-i="${i}"><div class="art"><span class="who ${m.who === "maa" ? "" : m.who}">${WHO[lang][m.who]}</span><span class="due">${m.due[lang]}</span><img src="${ART}${m.art}.png" alt="" loading="lazy" width="512" height="512"></div>
    <div class="mbody"><h3 class="mtitle">${m.title[lang]}</h3><p class="mline">${m.line[lang]}</p>
    <div class="mamt"><span class="amt">${rupee(m.amt)}</span><span class="rdy">${MSTR[lang].rdy}</span></div>
    <div class="bar" role="img" aria-label="${b}">${Array.from({ length: m.n }, (_, j) => `<i style="--j:${j}"></i>`).join("")}</div><p class="build">${b}</p></div>
    <p class="bank">${BANK_ICON}${MSTR[lang].bank}</p></article>`;
}
let active = 0, auto = 0, wired = false;
const cardsOf = () => [...$("moment-list").children];
function markDots() { [...$("mdots").children].forEach((b, i) => { if (i === active) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); }); }
function layoutFan() {
  const n = MOMENTS.length;
  cardsOf().forEach((c, i) => {
    let k = i - active; if (k > n / 2) k -= n; if (k < -n / 2) k += n;
    c.style.setProperty("--k", k); c.style.setProperty("--ak", Math.abs(k)); c.style.zIndex = 10 - Math.abs(k);
    c.setAttribute("aria-current", String(k === 0));
  });
  markDots();
}
function nearestCard() {
  const list = $("moment-list"), lr = list.getBoundingClientRect(), mid = lr.left + lr.width / 2; let best = 0, d = 1e9;
  cardsOf().forEach((c, i) => { const r = c.getBoundingClientRect(), x = Math.abs(r.left + r.width / 2 - mid); if (x < d) { d = x; best = i; } });
  return best;
}
function pick(i) {
  active = i;
  if (fan) { layoutFan(); restart(); return; }
  const list = $("moment-list"), c = cardsOf()[i], lr = list.getBoundingClientRect(), r = c.getBoundingClientRect();
  list.scrollTo({ left: list.scrollLeft + r.left - lr.left - (lr.width - r.width) / 2, behavior: reduce.matches ? "auto" : "smooth" });
}
function restart() { clearInterval(auto); if (fan && !reduce.matches && $("moment-list").classList.contains("open")) auto = setInterval(() => { active = (active + 1) % MOMENTS.length; layoutFan(); }, 3200); }
function renderMoments() {
  const list = $("moment-list"), dots = $("mdots"); if (!list) return;
  list.innerHTML = MOMENTS.map((m, i) => momentCard(m, i, fan ? ' tabindex="0"' : "")).join("");
  dots.innerHTML = MOMENTS.map((m, i) => `<button type="button" data-i="${i}" aria-label="${m.title[lang]}"${fan ? "" : ' tabindex="-1"'}><i></i></button>`).join("");
  dots.toggleAttribute("aria-hidden", !fan); if (!fan) dots.setAttribute("aria-hidden", "true");
  if (fan) layoutFan();
  else { active = nearestCard(); markDots(); }
  if (!fan) rv(list.children, momentsShown);
}
function wireMoments() {
  const list = $("moment-list"), dots = $("mdots"); if (!list || wired) return; wired = true;
  if (fan) {
    list.classList.add("moments--fan"); list.removeAttribute("tabindex"); list.removeAttribute("role");
    list.addEventListener("click", e => { const c = e.target.closest(".moment"); if (c) pick(+c.dataset.i); });
    list.addEventListener("keydown", e => { const c = e.target.closest(".moment"), n = MOMENTS.length; if (!c) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(+c.dataset.i); } else if (e.key === "ArrowRight") pick((active + 1) % n); else if (e.key === "ArrowLeft") pick((active + n - 1) % n); });
    list.addEventListener("pointerenter", () => clearInterval(auto)); list.addEventListener("pointerleave", restart);
    list.addEventListener("focusin", () => clearInterval(auto)); list.addEventListener("focusout", restart);
    let sx = null, moved = false;
    list.addEventListener("pointerdown", e => { sx = e.clientX; moved = false; });
    list.addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { moved = true; pick((active + (dx < 0 ? 1 : MOMENTS.length - 1)) % MOMENTS.length); } });
    list.addEventListener("click", e => { if (moved) { e.stopPropagation(); moved = false; } }, true);
    /* the fan opens when it arrives and shuffles every few seconds; it folds shut when you scroll back above it */
    if ("IntersectionObserver" in window && !reduce.matches) new IntersectionObserver(es => { const e = es[es.length - 1];
      if (e.isIntersecting) { list.classList.add("open"); restart(); } else if (e.boundingClientRect.top > 0) { list.classList.remove("open"); clearInterval(auto); } }, { rootMargin: "0px 0px -25% 0px" }).observe(list);
    else list.classList.add("open");
    if (rvIO) { rv([list]); }
  } else {
    let t = 0; list.addEventListener("scroll", () => { cancelAnimationFrame(t); t = requestAnimationFrame(() => { active = nearestCard(); markDots(); }); }, { passive: true });
  }
  dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) pick(+b.dataset.i); });
}

/* ---------- protection cards: a snap carousel under 900px (autoplay every 4s, paused on touch, hover, focus and off-screen), a grid above ---------- */
function initProt() {
  const root = $("prot"), track = $("prot-track"); if (!root || !track) return;
  const cards = [...track.children], dots = [...root.querySelectorAll(".prot-dots button")];
  const wide = matchMedia("(min-width: 900px)"), calm = reduce;
  let idx = 0, timer = 0, lock = 0, held = false, shown = false;
  const running = () => !wide.matches && !calm.matches && !held && shown && !document.hidden;
  const mark = () => dots.forEach((d, i) => { d.classList.toggle("cur", i === idx); d.classList.toggle("done", i < idx); d.classList.toggle("run", i === idx && running()); if (i === idx) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
  const plan = () => { clearTimeout(timer); mark(); if (running()) timer = setTimeout(() => go((idx + 1) % cards.length), 4000); };
  const go = i => { idx = i; lock = Date.now() + 800; track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: calm.matches ? "auto" : "smooth" }); plan(); };
  const nearest = () => { let best = 0, d = 1e9; cards.forEach((c, i) => { const x = Math.abs(c.offsetLeft - cards[0].offsetLeft - track.scrollLeft); if (x < d) { d = x; best = i; } }); return best; };
  track.addEventListener("scroll", () => { if (Date.now() < lock) return; const n = nearest(); if (n !== idx) { idx = n; plan(); } }, { passive: true });
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  track.addEventListener("keydown", e => { const k = { ArrowRight: idx + 1, ArrowLeft: idx - 1, Home: 0, End: cards.length - 1 }[e.key]; if (k === undefined || wide.matches) return; e.preventDefault(); go(Math.max(0, Math.min(cards.length - 1, k))); });
  const hold = v => () => { held = v; plan(); };
  root.addEventListener("touchstart", hold(true), { passive: true }); root.addEventListener("touchend", hold(false)); root.addEventListener("touchcancel", hold(false));
  root.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hold(true)(); }); root.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") hold(false)(); });
  root.addEventListener("focusin", e => { if (e.target.matches(":focus-visible")) hold(true)(); }); root.addEventListener("focusout", e => { if (!root.contains(e.relatedTarget)) hold(false)(); });
  new IntersectionObserver(es => { shown = es[es.length - 1].isIntersecting; plan(); }, { threshold: .4 }).observe(root);
  document.addEventListener("visibilitychange", plan);
  const fit = () => { track.tabIndex = wide.matches ? -1 : 0; plan(); }; wide.addEventListener("change", fit); calm.addEventListener("change", plan); fit();
  rv(cards);
}

/* ---------- savings calculator: only what she puts in, never returns ---------- */
const RANGE = { daily: [100, 1000, 50], weekly: [100, 5000, 100], monthly: [100, 20000, 100] };
let freq = "daily";
const inr = n => "₹" + n.toLocaleString("en-IN");
function durText(m) {
  const y = Math.floor(m / 12), r = m % 12, out = [];
  if (lang === "hi") { if (y) out.push(`${y} साल`); if (r) out.push(`${r} ${r === 1 ? "महीना" : "महीने"}`); }
  else { if (y) out.push(`${y} ${y === 1 ? "year" : "years"}`); if (r) out.push(`${r} ${r === 1 ? "month" : "months"}`); }
  return out.join(" ");
}
function updateCalc() {
  const amt = $("c-amt"), dur = $("c-dur"); if (!amt) return;
  const [mn, mx, st] = RANGE[freq]; amt.min = mn; amt.max = mx; amt.step = st;
  const a = +amt.value, m = +dur.value;
  const n = freq === "daily" ? Math.round(m * 365 / 12) : freq === "weekly" ? Math.round(m * 52 / 12) : m;
  $("c-amt-v").textContent = inr(a);
  $("c-dur-v").textContent = durText(m);
  $("c-total").textContent = inr(n * a);
  $("c-sub").textContent = lang === "hi" ? `${inr(a)} की ${n.toLocaleString("en-IN")} ${n === 1 ? "किस्त" : "किस्तें"}` : `${n.toLocaleString("en-IN")} ${n === 1 ? "payment" : "payments"} of ${inr(a)}`;
}
function initCalc() {
  const segs = document.querySelectorAll(".seg button");
  segs.forEach(b => b.addEventListener("click", () => { freq = b.dataset.f; segs.forEach(x => x.setAttribute("aria-pressed", String(x === b))); updateCalc(); }));
  $("c-amt").addEventListener("input", updateCalc); $("c-dur").addEventListener("input", updateCalc);
  rv([$("calc")]);
}

/* ---------- the nav: transparent over the hero, a frosted cream bar once #moments reaches it ---------- */
let navIO = null;
function watchNav() {
  const nav = document.querySelector(".nav, .masthead"), moments = $("moments"); if (!nav || !moments || !("IntersectionObserver" in window)) return;
  if (navIO) navIO.disconnect();
  const h = Math.round(nav.getBoundingClientRect().height);
  /* the viewport shrunk to a 1px band just under the nav: #moments is "in" while its top has reached the nav, and "past" once it has left above */
  navIO = new IntersectionObserver(es => { const e = es[es.length - 1]; nav.classList.toggle("is-solid", e.isIntersecting || e.boundingClientRect.top < 0); },
    { rootMargin: `-${h}px 0px -${Math.max(0, innerHeight - h - 1)}px 0px` });
  navIO.observe(moments);
}

/* ---------- anchors: every a[href^="#"] glides to its section (900 to 1200ms, longer for longer trips), instant under reduced motion ---------- */
const bezier = (x1, y1, x2, y2) => t => { let lo = 0, hi = 1, s = t; for (let i = 0; i < 28; i++) { const x = 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s; if (x < t) lo = s; else hi = s; s = (lo + hi) / 2; } return 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s; };
const glide = bezier(.77, 0, .175, 1);
let tween = 0;
function stopGlide() { cancelAnimationFrame(tween); tween = 0; }
function scrollToY(y, instant) {
  stopGlide();
  const from = scrollY, max = document.documentElement.scrollHeight - innerHeight; y = Math.max(0, Math.min(y, max));
  const dist = Math.abs(y - from); if (!dist) return;
  if (instant || reduce.matches) { scrollTo(0, y); return; }
  const ms = 900 + 300 * Math.min(1, dist / (8 * innerHeight)), t0 = performance.now();
  const step = now => { const p = Math.min(1, (now - t0) / ms); scrollTo(0, from + (y - from) * glide(p)); tween = p < 1 ? requestAnimationFrame(step) : 0; };
  tween = requestAnimationFrame(step);
}
const navHeight = () => { const n = document.querySelector(".nav, .masthead"); return n ? Math.round(n.getBoundingClientRect().height) : 0; };
/* has(hash): is it a place on this page that is not one of the hero's own jumps (#beat-N, a moodboard chapter)? */
function has(hash) { const id = String(hash || "").replace(/^#/, ""); return id === "top" || !!($(id) && $(id).closest("main > .sec, footer")); }
function goTo(hash, o = {}) {
  const id = String(hash || "").replace(/^#/, ""); if (!has(hash)) return false;
  const el = id === "top" ? null : $(id);
  scrollToY(el ? el.getBoundingClientRect().top + scrollY - navHeight() : 0, o.instant);
  if (o.push !== false && location.hash !== "#" + id) { try { history.pushState(null, "", "#" + id); } catch (e) {} }
  if (el) { if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); }
  return true;
}
function initAnchors() {
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || a.target || a.hasAttribute("data-chapter") || a.closest(".controls")) return;
    if (goTo(a.getAttribute("href"))) e.preventDefault();
  });
  for (const t of ["wheel", "touchstart", "keydown", "mousedown"]) addEventListener(t, stopGlide, { passive: true });
}

/* ---------- the API each page calls ---------- */
function setLang(l) {
  lang = l === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-t]").forEach(el => { const t = STR[lang][el.dataset.t]; if (t != null) el.textContent = t; });
  renderMoments(); updateCalc();
}
function init(opts = {}) {
  if (started) return; started = true;
  fan = !!opts.fan;
  try { if (localStorage.getItem("rupyon-lang") === "hi") lang = "hi"; } catch (e) {}
  if (opts.lang === "en" || opts.lang === "hi") lang = opts.lang;
  document.querySelectorAll(".sec-head").forEach(h => rv(h.children));
  rv(document.querySelectorAll("#language .lang"));
  rv(document.querySelectorAll("#start .sec-in > *:not(.sec-head)"));
  wireMoments(); initProt(); initCalc(); initAnchors();
  setLang(lang);
  watchNav(); addEventListener("resize", watchNav);
}
return { init, setLang, goTo, has, get lang() { return lang; } };
})();
