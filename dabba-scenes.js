/* Scene drawing for the Maa hai na opener (round 3), shared by boards/storyboards.html and prototype/index.html.
   Every scene is SVG markup in a 360 x 640 box. Set window.DABBA_ASSETS (the PNG folder, ending in /) and
   window.TURN_MARK (the Rupyon mark, the ribbon R) before loading this file. Phone screens are the real Rupyon app screens
   in window.RUPYON_SCREENS (default assets/screens/), captured from the handoff build with the numbers set to this story. */
(function () {
  const IMG = window.DABBA_ASSETS || "assets/dabba/", TURN = window.TURN_MARK || "brand/rupyon-mark.png", SHOTS = window.RUPYON_SCREENS || "assets/screens/";
  const E = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const C = t => Math.min(1, Math.max(0, t));
  const L = (a, b, t) => a + (b - a) * t;
  const INK = "#1A1310", ORANGE = "#F97316", CREAM = "#FDF5E9", RED = "#B42318", SKIN = "#C68A5E", SKIN2 = "#B87B50";
  const DEFS = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDF5E9"/><stop offset="1" stop-color="#FBE6C8"/></linearGradient><linearGradient id="pgshade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1A1310" stop-opacity="0"/><stop offset="1" stop-color="#1A1310" stop-opacity=".25"/></linearGradient></defs>`;
  let CID = 0;

  /* words drawn inside the scenes, in each page language. The Hindi is a draft for native review */
  const STR = {
    en: { autopay: "AutoPay on · Daily", withdraw: "Withdraw", withdrawAmt: "Withdraw ₹1,500", onWay: "On its way to your bank", cardTitle: "Your money, when you need it", cardSub: "It goes back to your own bank account.",
      inName: "In your name", daily: "Daily", weekly: "Weekly", monthly: "Monthly",
      pills: [["Daily", "UPI AutoPay", "Weekly", "From ₹100"], ["In your name", "Monthly", "8 languages", "Mutual funds"], ["Auto-save", "Back to your bank", "Daily", "24/7 help"]] },
    hi: { autopay: "AutoPay चालू · रोज़", withdraw: "पैसे निकालें", withdrawAmt: "₹1,500 निकालें", onWay: "आपके बैंक में आ रहा है", cardTitle: "आपका पैसा, जब ज़रूरत हो", cardSub: "सीधे आपके अपने बैंक खाते में।",
      inName: "आपके नाम पर", daily: "रोज़", weekly: "हर हफ़्ते", monthly: "हर महीने",
      pills: [["रोज़", "UPI AutoPay", "हर हफ़्ते", "₹100 से"], ["आपके नाम पर", "हर महीने", "8 भाषाएँ", "म्यूचुअल फंड"], ["अपने आप बचत", "बैंक में वापस", "रोज़", "24/7 मदद"]] },
  };
  let LANG = "en";
  const tr = k => (STR[LANG] || STR.en)[k];

  const num = (x, y, size, fill, t, anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Anek Latin, Inter, sans-serif" font-weight="600" font-size="${size}" fill="${fill}" style="font-variant-numeric: tabular-nums">${t}</text>`;
  const ui = (x, y, size, fill, t, anchor = "middle", weight = 600) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter, Noto Sans Devanagari, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${t}</text>`;

  /* ---------- illustration, placed by each PNG's measured pixel bounds ---------- */
  const im = (n, x, y, w, h, extra = "") => `<image href="${IMG}${n}.png" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="none"${extra}/>`;
  const SHELF_S = 340 / 1409, SHELF_BASE = 434;
  /* the wall is sized so its tile band stays at y 462 and it also covers the area outside the 360 x 640 box */
  function wall(op = 1) { return op <= 0 ? "" : im("dabba-kitchen-wall", -280, -534, 920, 1380, op < 1 ? ` opacity="${op}"` : ""); }
  function jar(n, cx, h, top, bottom, mid) { const s = h / (bottom - top); return `<ellipse cx="${cx}" cy="${SHELF_BASE - 2}" rx="${h * 0.48}" ry="4" fill="${INK}" opacity=".12"/>` + im(n, cx - mid * s, SHELF_BASE - bottom * s, 1024 * s, 1024 * s); }
  function shelf(op = 1, jars = true) {
    if (op <= 0) return "";
    let s = `<g opacity="${op}">` + im("dabba-shelf", 10 - 63 * SHELF_S, 430 - 432 * SHELF_S, 1536 * SHELF_S, 1024 * SHELF_S);
    if (jars) s += jar("dabba-jar-left", 64, 80, 233, 935, 511) + jar("dabba-jar-right", 296, 90, 141, 937, 510);
    return s + `</g>`;
  }
  /* tin body 1024px: content x 154 to 869, rim top 134, rim front 230, base 938. Lid 1536x1024: centre x 767.5, its bottom (608) sits at the tin's y 236 */
  function tinImg(o) {
    const { cx = 180, base = SHELF_BASE, w = 124, lid = 0, lidX = 0, lidRot = 0, orange = 0, inside = "", shadow = true } = o;
    const s = w / 715, by = base - 938 * s, sz = 1024 * s;
    let g = shadow ? `<ellipse cx="${cx}" cy="${base - 2}" rx="${w * 0.54}" ry="${Math.max(3, w * 0.05)}" fill="${INK}" opacity=".14"/>` : "";
    g += im("dabba-tin-body", cx - 511.5 * s, by, sz, sz);
    if (inside) { const id = "rim" + (++CID); g += `<clipPath id="${id}"><rect x="${cx - w}" y="${by - 700}" width="${w * 2}" height="${700 + 218 * s}"/></clipPath><g clip-path="url(#${id})">${inside}</g>`; }
    const lx = cx - 767.5 * s, ly = by - 372 * s - lid, lw = 1536 * s, lh = 1024 * s;
    g += `<g transform="translate(${lidX} 0) rotate(${lidRot} ${cx} ${by + 236 * s - lid})">`;
    if (orange < 1) g += im("dabba-tin-lid-steel", lx, ly, lw, lh, orange > 0 ? ` opacity="${1 - orange}"` : "");
    if (orange > 0) g += im("dabba-tin-lid-orange", lx, ly, lw, lh, orange < 1 ? ` opacity="${orange}"` : "");
    return g + `</g>`;
  }
  function rnote(x, base, h, rot = 0) { const s = h / 865; return `<g transform="rotate(${rot} ${x} ${base})">` + im("dabba-note-rolled", x - 501 * s, base - 947 * s, 1024 * s, 1024 * s) + `</g>`; }
  function fnote(cx, cy, w, rot = 0) { const s = w / 1325; return `<g transform="rotate(${rot} ${cx} ${cy})">` + im("dabba-note-flat", cx - 764 * s, cy - 497 * s, 1536 * s, 1024 * s) + `</g>`; }
  /* her hand: copies of the round 3 hands with the white screen cut out, so the app UI sits behind the thumb.
     x, y, w, h is the screen hole in the 1024 x 1536 file; tip is the thumb tip */
  const HANDS = {
    hold: { n: "hand-phone-hold-woman-v2-screen", x: 251, y: 155, w: 420, h: 819 },
    thumb: { n: "hand-phone-thumb-woman-v2-screen", x: 251, y: 155, w: 420, h: 819, tip: [502, 863] },
  };
  function handPhone(kind, sx, sy, sw, screen, bg = CREAM) {
    const H = HANDS[kind], s = sw / H.w, sh = H.h * s, id = "scr" + (++CID);
    return `<clipPath id="${id}"><rect x="${sx - 2}" y="${sy - 2}" width="${sw + 4}" height="${sh + 4}" rx="${sw * 0.1}"/></clipPath>
      <rect x="${sx - 2}" y="${sy - 2}" width="${sw + 4}" height="${sh + 4}" rx="${sw * 0.1}" fill="${bg}"/><g clip-path="url(#${id})">${screen(sx, sy, sw, sh)}</g>`
      + im(H.n, sx - H.x * s, sy - H.y * s, 1024 * s, 1536 * s);
  }
  const handTip = (kind, sx, sy, sw) => { const H = HANDS[kind], s = sw / H.w; return [sx + (H.tip[0] - H.x) * s, sy + (H.tip[1] - H.y) * s]; };
  /* her daughter, with the fee printed onto the blank paper she holds. The paper is x 223 to 797, y 814 to 1181 in the file */
  function girl(amt) {
    const s = 0.4, x = 180 - 512 * s, y = 106, px = x + 223 * s, py = y + 814 * s, pw = 574 * s, ph = 367 * s;
    let g = im("dabba-daughter-slip", x, y, 1024 * s, 1536 * s);
    [[0.14, 0.6], [0.25, 0.42], [0.36, 0.52]].forEach(([fy, fw]) => { g += `<rect x="${px + pw * 0.14}" y="${py + ph * fy}" width="${pw * fw}" height="${ph * 0.05}" rx="${ph * 0.025}" fill="#EBDDCB"/>`; });
    return g + num(px + pw / 2, py + ph * 0.74, pw * 0.2, INK, amt) + `<line x1="${px + pw * 0.2}" y1="${py + ph * 0.83}" x2="${px + pw * 0.8}" y2="${py + ph * 0.83}" stroke="#EAD3B3" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  }

  /* ---------- drawn in code: phone UI, numbers, chips ---------- */
  function rays(cx, cy, r1, r2, op, n = 12, col = ORANGE, w = 4) {
    if (op <= 0) return "";
    let s = `<g opacity="${op}" stroke="${col}" stroke-width="${w}" stroke-linecap="round">`;
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; s += `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}"/>`; }
    return s + `</g>`;
  }
  function phone(cx, top, w, h, screen, bg = CREAM) {
    const x = cx - w / 2, rx = w * 0.15;
    const id = "ph" + (++CID);
    return `<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="${rx}" fill="${INK}"/><rect x="${x + 6}" y="${top + 6}" width="${w - 12}" height="${h - 12}" rx="${rx - 5}" fill="${bg}"/>
      <clipPath id="${id}"><rect x="${x + 6}" y="${top + 6}" width="${w - 12}" height="${h - 12}" rx="${rx - 5}"/></clipPath><g clip-path="url(#${id})">${screen(x + 6, top + 6, w - 12, h - 12)}</g>
      <rect x="${cx - w * 0.13}" y="${top + 12}" width="${w * 0.26}" height="${Math.max(5, w * 0.045)}" rx="4" fill="${INK}"/>`;
  }
  function header(sx, sy, sw, sh, label = "Rupyon") {
    const hh = sh * 0.26, r = sw * 0.12;
    return `<path d="M${sx} ${sy + r} Q ${sx} ${sy} ${sx + r} ${sy} L ${sx + sw - r} ${sy} Q ${sx + sw} ${sy} ${sx + sw} ${sy + r} L ${sx + sw} ${sy + hh} L ${sx} ${sy + hh} Z" fill="${ORANGE}"/>` + ui(sx + sw / 2, sy + hh * 0.36, Math.max(7, sw * 0.065), "#FFE8D4", label);
  }
  function home() {
    return (sx, sy, sw, sh) => { const cx = sx + sw / 2;
      return header(sx, sy, sw, sh) + num(cx, sy + sh * 0.2, sw * 0.14, "#fff", "₹100") + tinImg({ cx, base: sy + sh * 0.74, w: sw * 0.46, orange: 1, shadow: false })
        + `<rect x="${sx + sw * 0.12}" y="${sy + sh * 0.84}" width="${sw * 0.76}" height="${sh * 0.07}" rx="${sh * 0.035}" fill="#fff" stroke="#F3DFC4"/>` + ui(cx, sy + sh * 0.885, sw * 0.062, "#6B5545", tr("autopay")); };
  }
  /* a real app screen, filling the phone from the top */
  const shot = (name, op = 1) => (sx, sy, sw, sh) => op <= 0 ? "" : `<image href="${SHOTS}${name}.jpg" x="${sx}" y="${sy}" width="${sw}" height="${sh}" preserveAspectRatio="xMidYMin slice"${op < 1 ? ` opacity="${op}"` : ""}/>`;
  function rings(cx, cy, p, r0 = 120) { let s = ""; for (let i = 0; i < 3; i++) { const q = (p * 1.6 + i / 3) % 1; s += `<circle cx="${cx}" cy="${cy}" r="${r0 + q * 70}" fill="none" stroke="${ORANGE}" stroke-width="2" opacity="${(1 - q) * 0.45}"/>`; } return s; }
  function pills(p) {
    const rows = tr("pills");
    let s = "";
    rows.forEach((r, i) => { let x = -40 + (i % 2 ? -50 : 0) - p * 50 * (i % 2 ? -1 : 1);
      r.concat(r).forEach(t => { const w = t.length * 7.2 + 26, y = 168 + i * 62;
        s += `<rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="#fff" stroke="#F3DFC4"/><text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" font-family="Inter, Noto Sans Devanagari, sans-serif" font-size="12" font-weight="500" fill="#8A7666">${t}</text>`; x += w + 12; }); });
    return s;
  }
  function dayTile(n, op) { return op <= 0 ? "" : `<g opacity="${op}"><rect x="256" y="78" width="70" height="80" rx="12" fill="#fff" stroke="#F3DFC4"/><path d="M256 90 a12 12 0 0 1 12 -12 h46 a12 12 0 0 1 12 12 v10 h-70 z" fill="${ORANGE}"/>${num(291, 143, 32, INK, n)}</g>`; }
  /* the small fee slip in beat 6: lines stand for print, the number is the only thing to read */
  function slip(x, y, w, amt, paid = 0) {
    const h = w * 1.22;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.05}" fill="#fff" stroke="#EAD3B3" stroke-width="1.5"/><rect x="${x}" y="${y}" width="${w}" height="${h * 0.12}" rx="${w * 0.05}" fill="${ORANGE}"/><rect x="${x}" y="${y + h * 0.07}" width="${w}" height="${h * 0.05}" fill="${ORANGE}"/>`;
    [[0.2, 0.7], [0.27, 0.5], [0.34, 0.62]].forEach(([fy, fw]) => { s += `<rect x="${x + w * 0.1}" y="${y + h * fy}" width="${w * fw}" height="${h * 0.03}" rx="${h * 0.015}" fill="#EBDDCB"/>`; });
    s += num(x + w / 2, y + h * 0.66, w * 0.21, INK, amt) + `<line x1="${x + w * 0.14}" y1="${y + h * 0.72}" x2="${x + w * 0.86}" y2="${y + h * 0.72}" stroke="#EAD3B3" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    if (paid > 0) { const r = w * 0.17 * L(1.5, 1, E(paid)), px = x + w * 0.76, py = y + h * 0.86;
      s += `<g opacity="${C(paid * 3)}"><circle cx="${px}" cy="${py}" r="${r}" fill="${ORANGE}"/><path d="M${px - r * 0.42} ${py} l ${r * 0.28} ${r * 0.3} l ${r * 0.56} ${-r * 0.6}" stroke="#fff" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
    return s;
  }
  /* the Turn mark flares behind the tick. It is the file from public/brand, never redrawn */
  function flare(cx, cy, q) { if (q <= 0 || q >= 1) return ""; const s = L(16, 120, E(q)); return `<image href="${TURN}" x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" opacity="${(1 - q) * 0.9}"/>`; }
  function tokens(op) {
    const items = [["अ", 40, 170], ["ক", 320, 196], ["ગ", 38, 318], ["த", 322, 330], ["తె", 42, 456], ["ಕ", 320, 470], ["म", 322, 92]];
    let s = `<g opacity="${op}">`;
    items.forEach(([g, x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="24" fill="${i % 2 ? "#FED7AA" : "#FFEDD5"}" stroke="#F3DFC4"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-family="Noto Sans Devanagari, Noto Sans Bengali, Noto Sans Gujarati, Noto Sans Tamil, Noto Sans Telugu, Noto Sans Kannada, sans-serif" font-size="19" font-weight="600" fill="${INK}">${g}</text>`; });
    [[tr("daily"), 52, 248], [tr("weekly"), 316, 262], [tr("monthly"), 52, 388]].forEach(([t, x, y]) => { const w = t.length * 8 + 22; s += `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="30" rx="15" fill="${ORANGE}"/>` + ui(x, y + 5, 12, "#fff", t); });
    return s + `<rect x="250" y="404" width="104" height="30" rx="15" fill="${INK}"/>` + ui(302, 424, 12, "#fff", tr("inName")) + `</g>`;
  }
  function cta(op, label) {
    return `<g opacity="${op}"><rect x="90" y="560" width="180" height="44" rx="22" fill="${ORANGE}"/>` + ui(180, 588, 15, "#fff", label)
      + `<text x="180" y="620" text-anchor="middle" font-family="Inter, sans-serif" font-size="8.5" fill="#6B5545">Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</text></g>`;
  }
  /* Withdraw screen, laid out round the thumb: the button sits under the thumb tip, and the status line lands above it */
  function withdrawScreen(p) {
    const done = C((p - 0.26) / 0.1);
    return (sx, sy, sw, sh) => shot("redeem")(sx, sy, sw, sh) + shot("redeem-done", done)(sx, sy, sw, sh);
  }
  function drawnWithdrawScreen(p) {
    const press = C((p - 0.1) / 0.08) * (1 - C((p - 0.24) / 0.06)), done = C((p - 0.26) / 0.1), open = E(C((p - 0.26) / 0.12)) * (1 - E(C((p - 0.6) / 0.1)));
    return (sx, sy, sw, sh) => { const cx = sx + sw / 2, by = sy + sh * 0.83;
      let s = header(sx, sy, sw, sh * 0.92, tr("withdraw")) + num(cx, sy + sh * 0.18, sw * 0.15, "#fff", "₹1,500");
      s += tinImg({ cx, base: sy + sh * 0.6, w: sw * 0.36, orange: 1, shadow: false, lid: open * sw * 0.14, lidX: -open * sw * 0.07, lidRot: -10 * open });
      s += `<rect x="${sx + sw * 0.08}" y="${by}" width="${sw * 0.84}" height="${sh * 0.1}" rx="${sh * 0.05}" fill="${press > 0.5 ? "#EA580C" : ORANGE}" opacity="${1 - done}"/>` + `<g opacity="${1 - done}">` + ui(sx + sw * 0.15, by + sh * 0.064, sw * 0.062, "#fff", tr("withdrawAmt"), "start") + `</g>`;
      if (done > 0) s += `<g opacity="${done}"><circle cx="${sx + sw * 0.14}" cy="${sy + sh * 0.715}" r="${sw * 0.038}" fill="${ORANGE}"/><path d="M${sx + sw * 0.14 - sw * 0.017} ${sy + sh * 0.715} l ${sw * 0.013} ${sw * 0.013} l ${sw * 0.026} ${-sw * 0.026}" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
        + ui(sx + sw * 0.21, sy + sh * 0.715 + sw * 0.022, sw * 0.058, INK, tr("onWay"), "start") + `</g>`;
      return s; };
  }

  /* ---------- the one phone ----------
     Every beat that shows the app draws THIS device. Its screen is one app: pages push in and out (never two screens faded over each other), the status
     bar stays put, and both v2 hand PNGs hold this same phone: their 420 x 819 screen hole scales evenly onto this screen (sx 70, sy 146, 200 x 390), so the hand "takes" it.
     Page images are the real app screens; sip-setup-fit.jpg is sip-setup.jpg with blank rows taken out so it matches the screen's shape. */
  const PG = { sip: ["sip-setup-fit", "#FFFFFF", "top", 1521 / 780], sips: ["sips", "#F8FEFA", "top", 1516 / 780], red: ["redeem", "#FFFFFF", "bot", 1382 / 780], done: ["redeem-done", "#FFFFFF", "bot", 1382 / 780],
    welcome: ["welcome", "#FCF6E8", "top", 1740 / 780], lang: ["language", "#FCF6E8", "top", 1740 / 780] };
  const PRESS = { sip: [0.916, 0.064], red: [0.921, 0.059] }, TAPAT = { sip: [0.5, 0.95], red: [0.62, 0.91] }; // red: under the v2 thumb, whose tip is at 60% across, 86% down
  const P = (p, a, b) => C((p - a) / (b - a)), EI = t => t * t * t;
  function device(o) {
    const { sx = 70, sy = 146, w = 200, h = 390, off = 0, reveal = 1, pages = [], press = null, tap = null, hand = null, shadow = false } = o;
    const id = ++CID, R = w * 0.1, B = w * 0.055, cx = sx + w / 2, cy = sy + h / 2;
    let g = `<g transform="translate(0 ${off})">`;
    if (shadow) g += `<ellipse cx="${cx}" cy="${sy + h + B + 8}" rx="${w * 0.42}" ry="7" fill="${INK}" opacity=".12"/>`;
    g += `<rect x="${sx - B}" y="${sy - B}" width="${w + 2 * B}" height="${h + 2 * B}" rx="${R + B}" fill="#382E29"/>`
      + `<clipPath id="sc${id}"><rect x="${sx}" y="${sy}" width="${w}" height="${h}" rx="${R}"/></clipPath><clipPath id="rv${id}"><circle cx="${cx}" cy="${cy}" r="${Math.max(0, reveal) * h * 0.9}"/></clipPath>`
      + `<g clip-path="url(#sc${id})"><rect x="${sx}" y="${sy}" width="${w}" height="${h}" fill="${INK}"/>` + (reveal > 0 ? `<g${reveal < 1 ? ` clip-path="url(#rv${id})"` : ""}>` : "<g display=\"none\">");
    pages.forEach(([k, dx]) => {
      const [n, bg, an, r] = PG[k], ih = w * r, x = sx + dx * w, iy = an === "top" ? sy : sy + h - ih;
      g += `<rect x="${x}" y="${sy}" width="${w}" height="${h}" fill="${bg}"/>` + (dx > 0.001 && dx < 0.999 ? `<rect x="${x - 10}" y="${sy}" width="10" height="${h}" fill="url(#pgshade)"/>` : "")
        + `<image href="${SHOTS}${n}.jpg" x="${x}" y="${iy}" width="${w}" height="${ih}" preserveAspectRatio="none"/>`;
      if (press && press.k === k && press.op > 0) { const [t, ph] = PRESS[k]; g += `<rect x="${x + w * 0.031}" y="${sy + h * t}" width="${w * 0.938}" height="${h * ph}" rx="9" fill="#8A3208" opacity="${press.op}" style="mix-blend-mode:multiply"/>`; }
      if (tap && tap.k === k && tap.q > 0 && tap.q < 1) { const [fx, fy] = TAPAT[k]; g += `<circle cx="${x + w * fx}" cy="${sy + h * fy}" r="${L(6, 24, tap.q)}" fill="#fff" opacity="${0.8 * (1 - tap.q)}"/>`; }
    });
    /* status bar: it never moves while pages push under it */
    g += `<text x="${sx + 16}" y="${sy + 13}" font-family="Inter, sans-serif" font-weight="600" font-size="8.5" fill="${INK}">9:41</text>`
      + `<g fill="${INK}"><rect x="${sx + w - 46}" y="${sy + 10}" width="2" height="2"/><rect x="${sx + w - 42}" y="${sy + 8}" width="2" height="4"/><rect x="${sx + w - 38}" y="${sy + 6}" width="2" height="6"/><rect x="${sx + w - 34}" y="${sy + 4}" width="2" height="8"/>`
      + `<rect x="${sx + w - 20}" y="${sy + 5}" width="10" height="7" rx="2" fill="none" stroke="${INK}" stroke-width="1"/><rect x="${sx + w - 18.6}" y="${sy + 6.4}" width="6.4" height="4.2" rx="1"/></g></g></g>`;
    if (hand) {
      const Hd = HANDS[hand.kind], ax = w / Hd.w, ay = h / Hd.h, hid = "hw" + id;
      g += `<clipPath id="${hid}"><rect x="-200" y="${L(700, -100, hand.wipe == null ? 1 : hand.wipe)}" width="800" height="900"/></clipPath><g clip-path="url(#${hid})"${hand.op != null && hand.op < 1 ? ` opacity="${hand.op}"` : ""}>`
        + im(Hd.n, sx - Hd.x * ax, sy - Hd.y * ay, 1024 * ax, 1536 * ay) + `</g>`;
    }
    return g + `</g>`;
  }

  /* ---------- the seven beats, each a function of p, 0 to 1 through the beat. Every beat moves, then rests: nothing is mid-blend while it holds ---------- */
  const NOTE_X = [-22, -7, 8, 22], NOTE_R = [-10, -3, 4, 11];
  const SKY = `<rect x="-400" y="-400" width="1160" height="1440" fill="url(#sky)"`;
  const beats = [
    /* 1 Hero */
    p => pills(p) + device({ sx: 80, sy: 100, h: 446, shadow: true, pages: [["welcome", 0]] }),
    /* 2 Days add up. The hero phone leaves, the kitchen fades up, the tin comes in */
    p => { const up = E(C(p / 0.25)), lift = E(C((p - 0.18) / 0.15)); let ins = "";
      NOTE_X.forEach((dx, i) => { const f = E(C((p - 0.32 - i * 0.12) / 0.14)); if (f > 0) ins += rnote(180 + dx, L(40, 344, f), 72, NOTE_R[i] * f); });
      const day = p < 0.3 ? 1 : Math.round(L(1, 90, E(C((p - 0.3) / 0.6))));
      const leave = p < 0.2 ? device({ sx: 80, sy: 100, h: 446, off: L(0, 720, EI(P(p, 0, 0.2))), pages: [["welcome", 0]] }) : "";
      return wall(E(P(p, 0.02, 0.2))) + shelf(E(P(p, 0.02, 0.2))) + `<g opacity="${C((p - 0.1) * 4)}" transform="translate(0 ${L(70, 0, E(C((p - 0.1) / 0.25)))})">` + tinImg({ lid: 90 * lift, lidX: -64 * lift, lidRot: -14 * lift, inside: ins }) + `</g>` + dayTile(day, C((p - 0.22) * 6)) + leave; },
    /* 3 Into the phone. The lid closes, her phone rises dark, the tin lands on it and turns into the app; then it rests on Start SIP */
    p => { const drop = 1 - E(C(p / 0.12)), orange = P(p, 0.06, 0.18), fade = 1 - C(p * 2.2), sink = E(P(p, 0.26, 0.52)), gone = P(p, 0.56, 0.7);
      const tw = L(124, 55, sink) * L(1, 0.2, E(gone));
      return wall(fade) + shelf(fade) + device({ off: L(720, 0, E(P(p, 0.14, 0.44))), reveal: E(P(p, 0.58, 0.8)), pages: [["sip", 0]], shadow: true })
        + `<g opacity="${1 - gone}">` + tinImg({ cx: L(180, 170, sink), base: L(SHELF_BASE, 372, sink), w: tw, orange, shadow: sink < 0.5, lid: 90 * drop * (1 - sink), lidX: -64 * drop * (1 - sink), lidRot: -14 * drop * (1 - sink) }) + `</g>`; },
    /* 4 In her hand. The hand comes round the same phone, Set up AutoPay is pressed, the app pushes on to her SIPs, and it rests */
    p => { const push = E(P(p, 0.54, 0.72)), q = P(p, 0.4, 0.54);
      return rings(170, 341, p) + device({ hand: { kind: "hold", wipe: E(P(p, 0.04, 0.3)) }, pages: push > 0 ? [["sip", -0.28 * push], ["sips", 1 - push]] : [["sip", 0]],
        press: { k: "sip", op: 0.55 * P(p, 0.42, 0.47) * (1 - P(p, 0.5, 0.55)) }, tap: { k: "sip", q } }); },
    /* 5 The need. The phone drops away with the hand, her daughter and the fee arrive */
    p => { const up = E(C(p / 0.35)), pop = 1 + 0.04 * Math.sin(Math.PI * C((p - 0.35) / 0.2)), a = P(p, 0.12, 0.3), off = L(0, 720, EI(P(p, 0, 0.3)));
      return `<g opacity="${1 - E(P(p, 0, 0.3))}">${SKY}/></g>` + (off < 719 ? device({ off, hand: { kind: "hold" }, pages: [["sips", 0]] }) : "")
        + `<g opacity="${a}"><circle cx="180" cy="400" r="${L(130, 180, up)}" fill="${CREAM}"/><g transform="translate(0 ${L(70, 0, up)})"><g transform="translate(180 505) scale(${pop}) translate(-180 -505)">` + girl("₹1,500") + `</g></g></g>`; },
    /* 6 Maa hai na. The phone comes back in her thumb's pose on Withdraw; the thumb presses Continue, the app pushes to Money credited, the money goes to the fee slip, which is paid; it rests */
    p => { const push = E(P(p, 0.54, 0.7)), q = P(p, 0.4, 0.54), off = L(720, 0, E(P(p, 0.06, 0.3))), fq = P(p, 0.66, 0.84);
      const fly = E(P(p, 0.58, 0.76)), slipOp = P(p, 0.74, 0.82), tick = P(p, 0.84, 0.92), bq = P(p, 0.62, 0.86);
      const note = fly > 0 && fly < 1 ? fnote(L(170, 306, fly), L(330, 112, fly) - 50 * Math.sin(Math.PI * fly), L(46, 22, fly), L(0, 24, fly)) : "";
      return `<g opacity="${1 - E(P(p, 0, 0.2))}"><rect x="-400" y="-400" width="1160" height="1440" fill="#fff"/></g>` + rays(170, 340, L(80, 140, E(bq)), L(130, 200, E(bq)), bq > 0 && bq < 1 ? Math.sin(Math.PI * bq) * 0.9 : 0, 14)
        + device({ off, hand: { kind: "thumb", wipe: 1 }, pages: push > 0 ? [["red", -0.28 * push], ["done", 1 - push]] : [["red", 0]],
          press: { k: "red", op: 0.55 * P(p, 0.42, 0.47) * (1 - P(p, 0.5, 0.55)) }, tap: { k: "red", q } })
        + note + (slipOp > 0 ? `<g opacity="${slipOp}" transform="rotate(4 306 112)">` + flare(326, 132, P(p, 0.84, 0.98)) + slip(268, 70, 76, "₹1,500", tick) + `</g>` : ""); },
    /* 7 Everywhere. The phone and the slip leave, the language phone rises, every language round it */
    p => { const off = L(0, 720, EI(P(p, 0, 0.26))), leaving = off < 719 ? device({ off, hand: { kind: "thumb", wipe: 1 }, pages: [["done", 0]] }) + `<g opacity="${1 - P(p, 0, 0.2)}" transform="rotate(4 306 112)">` + slip(268, 70, 76, "₹1,500", 1) + `</g>` : "";
      return leaving + device({ sx: 80, sy: 90, h: 446, off: L(720, 0, E(P(p, 0.3, 0.58))), pages: [["lang", 0]], shadow: true }) + tokens(E(C((p - 0.45) * 2))); },
  ];

  const FILES = ["dabba-kitchen-wall", "dabba-shelf", "dabba-tin-body", "dabba-tin-lid-steel", "dabba-tin-lid-orange", "dabba-note-rolled", "dabba-note-flat", "dabba-jar-left", "dabba-jar-right",
    "hand-phone-hold-woman-v2-screen", "hand-phone-thumb-woman-v2-screen", "dabba-daughter-slip"];
  /* decode the illustrations once, so scrubbing doesn't flash */
  function preload() { FILES.forEach(n => { new Image().src = IMG + n + ".png"; }); ["sip-setup-fit", "sips", "redeem", "redeem-done", "welcome", "language"].forEach(n => { new Image().src = SHOTS + n + ".jpg"; }); const t = new Image(); t.src = TURN; }

  const setLang = l => { LANG = STR[l] ? l : "en"; };

  window.DabbaScenes = { setLang, E, C, L, INK, ORANGE, CREAM, RED, SKIN, SKIN2, DEFS, rays, phone, header, rings, pills, tokens, cta, beats, preload };
})();
