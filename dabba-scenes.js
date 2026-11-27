/* Scene drawing for the Maa hai na opener (round 3), shared by boards/storyboards.html and prototype/index.html.
   Every scene is SVG markup in a 360 x 640 box. Set window.DABBA_ASSETS (the PNG folder, ending in /) and
   window.TURN_MARK (a copy of public/brand/turn-mark.svg) before loading this file. */
(function () {
  const IMG = window.DABBA_ASSETS || "assets/dabba/", TURN = window.TURN_MARK || "brand/turn-mark.svg";
  const E = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const C = t => Math.min(1, Math.max(0, t));
  const L = (a, b, t) => a + (b - a) * t;
  const INK = "#1A1310", ORANGE = "#F97316", CREAM = "#FDF5E9", RED = "#B42318", SKIN = "#C68A5E", SKIN2 = "#B87B50";
  const DEFS = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDF5E9"/><stop offset="1" stop-color="#FBE6C8"/></linearGradient></defs>`;
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
    hold: { n: "hand-phone-hold-woman-screen", x: 251, y: 155, w: 420, h: 817 },
    thumb: { n: "hand-phone-thumb-woman-screen", x: 135, y: 107, w: 581, h: 1029, tip: [536, 1024] },
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
    return `<rect x="${x}" y="${top}" width="${w}" height="${h}" rx="${rx}" fill="${INK}"/><rect x="${x + 6}" y="${top + 6}" width="${w - 12}" height="${h - 12}" rx="${rx - 5}" fill="${bg}"/>
      <rect x="${cx - w * 0.13}" y="${top + 12}" width="${w * 0.26}" height="${Math.max(5, w * 0.045)}" rx="4" fill="${INK}"/>${screen(x + 6, top + 6, w - 12, h - 12)}`;
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
    const items = [["अ", 66, 196], ["ক", 294, 214], ["ગ", 52, 330], ["த", 308, 350], ["తె", 74, 452], ["ಕ", 292, 480], ["म", 178, 162]];
    let s = `<g opacity="${op}">`;
    items.forEach(([g, x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="24" fill="${i % 2 ? "#FED7AA" : "#FFEDD5"}" stroke="#F3DFC4"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-family="Noto Sans Devanagari, Noto Sans Bengali, Noto Sans Gujarati, Noto Sans Tamil, Noto Sans Telugu, Noto Sans Kannada, sans-serif" font-size="19" font-weight="600" fill="${INK}">${g}</text>`; });
    [[tr("daily"), 86, 262], [tr("weekly"), 282, 284], [tr("monthly"), 82, 398]].forEach(([t, x, y]) => { const w = t.length * 8 + 22; s += `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="30" rx="15" fill="${ORANGE}"/>` + ui(x, y + 5, 12, "#fff", t); });
    return s + `<rect x="250" y="404" width="104" height="30" rx="15" fill="${INK}"/>` + ui(302, 424, 12, "#fff", tr("inName")) + `</g>`;
  }
  function cta(op, label) {
    return `<g opacity="${op}"><rect x="90" y="560" width="180" height="44" rx="22" fill="${ORANGE}"/>` + ui(180, 588, 15, "#fff", label)
      + `<text x="180" y="620" text-anchor="middle" font-family="Inter, sans-serif" font-size="8.5" fill="#6B5545">Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</text></g>`;
  }
  /* Withdraw screen, laid out round the thumb: the button sits under the thumb tip, and the status line lands above it */
  function withdrawScreen(p) {
    const press = C((p - 0.1) / 0.08) * (1 - C((p - 0.24) / 0.06)), done = C((p - 0.26) / 0.1), open = E(C((p - 0.26) / 0.12)) * (1 - E(C((p - 0.6) / 0.1)));
    return (sx, sy, sw, sh) => { const cx = sx + sw / 2, by = sy + sh * 0.83;
      let s = header(sx, sy, sw, sh * 0.92, tr("withdraw")) + num(cx, sy + sh * 0.18, sw * 0.15, "#fff", "₹1,500");
      s += tinImg({ cx, base: sy + sh * 0.6, w: sw * 0.36, orange: 1, shadow: false, lid: open * sw * 0.14, lidX: -open * sw * 0.07, lidRot: -10 * open });
      s += `<rect x="${sx + sw * 0.08}" y="${by}" width="${sw * 0.84}" height="${sh * 0.1}" rx="${sh * 0.05}" fill="${press > 0.5 ? "#EA580C" : ORANGE}" opacity="${1 - done}"/>` + `<g opacity="${1 - done}">` + ui(sx + sw * 0.15, by + sh * 0.064, sw * 0.062, "#fff", tr("withdrawAmt"), "start") + `</g>`;
      if (done > 0) s += `<g opacity="${done}"><circle cx="${sx + sw * 0.14}" cy="${sy + sh * 0.715}" r="${sw * 0.038}" fill="${ORANGE}"/><path d="M${sx + sw * 0.14 - sw * 0.017} ${sy + sh * 0.715} l ${sw * 0.013} ${sw * 0.013} l ${sw * 0.026} ${-sw * 0.026}" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
        + ui(sx + sw * 0.21, sy + sh * 0.715 + sw * 0.022, sw * 0.058, INK, tr("onWay"), "start") + `</g>`;
      return s; };
  }

  /* ---------- the seven beats, each a function of p, 0 to 1 through the beat ---------- */
  const NOTE_X = [-22, -7, 8, 22], NOTE_R = [-10, -3, 4, 11];
  const beats = [
    /* 1 Hero */
    p => pills(p) + `<ellipse cx="180" cy="470" rx="80" ry="8" fill="${INK}" opacity=".1"/>` + phone(180, 140, 150, 320, home()),
    /* 2 Days add up */
    p => { const up = E(C(p / 0.25)), lift = E(C((p - 0.18) / 0.15)); let ins = "";
      NOTE_X.forEach((dx, i) => { const f = E(C((p - 0.32 - i * 0.12) / 0.14)); if (f > 0) ins += rnote(180 + dx, L(40, 344, f), 72, NOTE_R[i] * f); });
      const day = p < 0.3 ? 1 : Math.round(L(1, 90, E(C((p - 0.3) / 0.6))));
      return wall() + shelf() + `<g opacity="${C(p * 4)}" transform="translate(0 ${L(70, 0, up)})">` + tinImg({ lid: 90 * lift, lidX: -64 * lift, lidRot: -14 * lift, inside: ins }) + `</g>` + dayTile(day, C((p - 0.22) * 6)); },
    /* 3 Into the phone */
    p => { const drop = 1 - E(C(p / 0.18)), orange = C((p - 0.18) / 0.18), rise = E(p * 1.6), sink = E((p - 0.25) * 1.6), fade = 1 - C(p * 2.2), show = C((p - 0.6) * 3);
      return wall(fade) + shelf(fade) + phone(180, L(660, 150, rise), 150, 320, (sx, sy, sw, sh) => show > 0 ? `<g opacity="${show}">${header(sx, sy, sw, sh)}${num(sx + sw / 2, sy + sh * 0.2, sw * 0.14, "#fff", "₹100")}</g>` : "")
        + tinImg({ cx: 180, base: L(SHELF_BASE, 156 + 308 * 0.74, sink), w: L(124, 138 * 0.46, sink), orange, shadow: sink < 0.5, lid: 90 * drop, lidX: -64 * drop, lidRot: -14 * drop }); },
    /* 4 In her hand */
    p => { const z = L(1.12, 1, E(p));
      return `<g transform="translate(180 330) scale(${z}) translate(-180 -330)">` + wall() + shelf(1, false) + tinImg({ cx: 66, w: 64 }) + rings(225, 333, p) + handPhone("hold", 140, 168, 170, home()) + `</g>`; },
    /* 5 The need */
    p => { const up = E(C(p / 0.35)), pop = 1 + 0.04 * Math.sin(Math.PI * C((p - 0.35) / 0.2));
      return `<circle cx="180" cy="400" r="${L(130, 180, up)}" fill="${CREAM}"/><g transform="translate(0 ${L(70, 0, up)})"><g transform="translate(180 505) scale(${pop}) translate(-180 -505)">` + girl("₹1,500") + `</g></g>`; },
    /* 6 Maa hai na */
    p => { const shrink = E((p - 0.66) * 3), s = L(1, 0.62, shrink), fly = E(C((p - 0.32) / 0.26)), slipOp = C((p - 0.26) * 8) * (1 - C(shrink * 3)), tick = C((p - 0.56) / 0.12);
      const press = C((p - 0.1) / 0.08) * (1 - C((p - 0.24) / 0.06)), [tx, ty] = handTip("thumb", 65, 156, 230);
      const card = shrink > 0 ? `<g opacity="${shrink}"><rect x="34" y="84" width="292" height="490" rx="28" fill="#FED7AA"/>` + ui(56, 122, 16, INK, tr("cardTitle"), "start") + ui(56, 143, 11.5, "#8A7666", tr("cardSub"), "start", 500) + `</g>` : "";
      const note = fly > 0 && fly < 1 ? fnote(L(180, 290, fly), L(330, 166, fly) - 60 * Math.sin(Math.PI * fly), L(44, 24, fly), L(0, 28, fly)) : "";
      const ripple = press > 0 ? `<circle cx="${tx}" cy="${ty}" r="${L(4, 22, press)}" fill="#fff" opacity="${0.5 * press}"/>` : "";
      return card + `<g transform="translate(180 ${L(330, 450, shrink)}) scale(${s}) translate(-180 -330)">` + handPhone("thumb", 65, 156, 230, withdrawScreen(p), "#fff") + ripple + `</g>`
        + (slipOp > 0 ? `<g opacity="${slipOp}">` + flare(306, 176, C((p - 0.56) / 0.22)) + slip(250, 96, 74, "₹1,500", tick) + `</g>` : "") + note; },
    /* 7 Everywhere */
    p => tokens(E(p * 2)) + phone(180, 200, 120, 256, home()),
  ];

  const FILES = ["dabba-kitchen-wall", "dabba-shelf", "dabba-tin-body", "dabba-tin-lid-steel", "dabba-tin-lid-orange", "dabba-note-rolled", "dabba-note-flat", "dabba-jar-left", "dabba-jar-right",
    "hand-phone-hold-woman-screen", "hand-phone-thumb-woman-screen", "dabba-daughter-slip"];
  /* decode the illustrations once, so scrubbing doesn't flash */
  function preload() { FILES.forEach(n => { new Image().src = IMG + n + ".png"; }); const t = new Image(); t.src = TURN; }

  const setLang = l => { LANG = STR[l] ? l : "en"; };

  window.DabbaScenes = { setLang, E, C, L, INK, ORANGE, CREAM, RED, SKIN, SKIN2, DEFS, rays, phone, header, rings, pills, tokens, cta, beats, preload };
})();
