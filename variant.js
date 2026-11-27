/* The switch between the two variations, Original (site.html) and Kiwi beats (kiwi.html), on both pages.
   It shows when the page is on its own, or when the presenting page (index.html) has stepped aside on a phone;
   on a wider screen index.html has the same switch in its bar. The choice is remembered on this device. */
(function () {
  const PAGES = [["site.html", { en: "Original", hi: "मूल" }], ["kiwi.html", { en: "Kiwi beats", hi: "Kiwi बीट्स" }]];
  const here = PAGES.findIndex(([f]) => location.pathname.endsWith(f)) === 1 ? 1 : 0;
  const framed = window.parent !== window;
  const css = `
  .variant { position: fixed; z-index: 30; left: 0; right: 0; width: max-content; margin-inline: auto; bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
    display: inline-grid; grid-template-columns: 1fr 1fr; padding: 3px; border-radius: 999px; background: rgba(26, 19, 16, .88);
    box-shadow: 0 8px 24px -10px rgba(26, 19, 16, .5); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    transition: opacity .3s cubic-bezier(0.23, 1, 0.32, 1), transform .3s cubic-bezier(0.23, 1, 0.32, 1); }
  .variant[hidden] { display: inline-grid; opacity: 0; transform: translateY(8px); pointer-events: none; }
  .variant .vt { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc(50% - 3px); border-radius: 999px; background: #F97316;
    transform: translateX(calc(var(--at) * 100%)); transition: transform .24s cubic-bezier(0.23, 1, 0.32, 1); }
  .variant button { position: relative; height: 32px; padding: 0 14px; border: 0; border-radius: 999px; background: transparent; color: #FDF5E9;
    font: 600 13px Inter, "Noto Sans Devanagari", system-ui, sans-serif; white-space: nowrap; cursor: pointer; }
  .variant button:focus-visible { outline: 2px solid #F97316; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { .variant, .variant .vt { transition: none; } }`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const el = document.createElement("div");
  el.className = "variant"; el.setAttribute("role", "group"); el.setAttribute("aria-label", "Version"); el.style.setProperty("--at", here);
  const show = on => { el.hidden = !on; el.inert = !on; };
  show(!framed);
  document.body.appendChild(el);
  const label = () => { const l = document.documentElement.lang === "hi" ? "hi" : "en";
    el.innerHTML = `<span class="vt" aria-hidden="true"></span>` + PAGES.map(([f, n], i) => `<button type="button" data-page="${f}" aria-pressed="${i === here}">${n[l]}</button>`).join(""); };
  label();
  new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  try { localStorage.setItem("rupyon-site", PAGES[here][0]); } catch (e) {}

  el.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.dataset.page === PAGES[here][0]) return;
    try { localStorage.setItem("rupyon-site", b.dataset.page); } catch (err) {}
    if (framed) window.parent.postMessage({ rupyonSite: b.dataset.page }, "*"); // the presenting page swaps the frame
    else location.href = b.dataset.page + location.hash;
  });
  /* the presenting page says when it has stepped aside (a phone) and this page should show its own switch */
  addEventListener("message", e => { const m = e.data && e.data.rupyon; if (m && "showSwitch" in m) show(m.showSwitch); });
})();
