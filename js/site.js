/* C&M Innovations — site JS (no dependencies) */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
  }

  /* ---- Mark current nav link ---- */
  var path = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").replace(/\.html$/, "");
    if (href === "/" && (path === "/" || /\/index$/.test(path))) a.setAttribute("aria-current", "page");
    else if (href !== "/" && path.indexOf(href) !== -1) a.setAttribute("aria-current", "page");
    else if (href === "services" && /custom-homes|new-construction|framing|remodels-additions/.test(path)) a.setAttribute("aria-current", "page");
    else if (href === "blog" && /^\/blog-/.test(path)) a.setAttribute("aria-current", "page");
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Gallery filters (projects page) ---- */
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".gallery figure").forEach(function (fig) {
        var cats = (fig.getAttribute("data-cat") || "").split(" ");
        fig.classList.toggle("is-hidden", f !== "all" && cats.indexOf(f) === -1);
      });
    });
  }

  /* ---- Lightbox (any figure with data-full) ---- */
  var figs = Array.prototype.slice.call(document.querySelectorAll("figure[data-full]"));
  if (figs.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="" />' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>' +
      '<div class="lightbox__cap"></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lightbox__cap");
    var idx = 0;

    function visible() { return figs.filter(function (f) { return !f.classList.contains("is-hidden"); }); }
    function show(i) {
      var list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      var f = list[idx];
      lbImg.src = f.getAttribute("data-full");
      lbImg.alt = (f.querySelector("img") || {}).alt || "";
      var cap = f.querySelector("figcaption");
      lbCap.textContent = cap ? cap.textContent : "";
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() { lb.classList.remove("is-open"); document.body.style.overflow = ""; }

    figs.forEach(function (f) {
      f.addEventListener("click", function () { show(visible().indexOf(f)); });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---- Contact / quote forms (Web3Forms via fetch) ----
     Posts in the background, then sends the visitor to /thank-you so the
     submission can be tracked later. The access key lives in the form's
     hidden "access_key" field — see README. */
  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

      var action = form.getAttribute("action") || "";
      var key = (form.querySelector('input[name="access_key"]') || {}).value || "";
      var btn = form.querySelector("button[type=submit]");
      var done = function () { window.location.href = "/thank-you"; };

      // Not wired yet (placeholder key) → still show the thank-you page so the
      // flow can be reviewed, but nothing is sent.
      if (action.indexOf("api.web3forms.com") === -1 || /YOUR_WEB3FORMS/.test(key)) {
        console.warn("Lead form is not connected yet — add the Web3Forms access key.");
        done();
        return;
      }

      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
      fetch(action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.success) done();
          else throw new Error("send failed");
        })
        .catch(function () {
          alert("Sorry — something went wrong sending your request. Please call or text 479-970-4343 and we'll take care of you.");
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; }
        });
    });
  });
})();
