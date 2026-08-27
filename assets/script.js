// HAR Resource Index — small, dependency-free interactions.
// 1) Renders the six-stage evolution filmstrip from data (kept here so the
//    stage labels/years live in one place instead of duplicated in HTML).
// 2) Per-table live filtering.
// 3) Copy-to-clipboard for the citation block.

(function () {
  "use strict";

  // ---- 1. Evolution filmstrip ------------------------------------------
  var STAGES = [
    { year: "1999–2008", name: "Handcrafted Descriptors" },
    { year: "2007–2015", name: "CNN / RNN" },
    { year: "2013–2018", name: "3D CNN + Two-Stream" },
    { year: "2018–2021", name: "Video Transformers" },
    { year: "2020–Present", name: "Self-Supervised Pretraining" },
    { year: "2023–Present", name: "Foundation / VLMs" }
  ];

  function renderFilmstrip() {
    var mount = document.getElementById("filmstrip");
    if (!mount) return;

    var frag = document.createDocumentFragment();
    STAGES.forEach(function (stage) {
      var frame = document.createElement("div");
      frame.className = "frame";

      var year = document.createElement("span");
      year.className = "frame-year";
      year.textContent = stage.year;

      var name = document.createElement("span");
      name.className = "frame-name";
      name.textContent = stage.name;

      frame.appendChild(year);
      frame.appendChild(name);
      frag.appendChild(frame);
    });

    // Replace the <noscript> fallback content with the real frames.
    mount.innerHTML = "";
    mount.appendChild(frag);
  }

  // ---- 2. Table filtering -------------------------------------------
  function initFilters() {
    var inputs = document.querySelectorAll(".filter-input");
    inputs.forEach(function (input) {
      var tableId = input.getAttribute("data-target");
      var table = document.getElementById(tableId);
      if (!table) return;
      var rows = table.querySelectorAll("tbody tr");

      input.addEventListener("input", function () {
        var q = input.value.trim().toLowerCase();
        rows.forEach(function (row) {
          var text = row.textContent.toLowerCase();
          var match = q === "" || text.indexOf(q) !== -1;
          row.classList.toggle("row-hidden", !match);
        });
      });
    });
  }

  // ---- 3. Copy citation -------------------------------------------------
  function initCopyButtons() {
    var buttons = document.querySelectorAll(".copy-btn[data-copy-target]");
    buttons.forEach(function (btn) {
      var sourceId = btn.getAttribute("data-copy-target");
      var source = document.getElementById(sourceId);
      if (!source) return;

      btn.addEventListener("click", function () {
        var text = source.textContent;
        var done = function () {
          var original = btn.textContent;
          btn.textContent = "Copied";
          btn.setAttribute("data-copied", "true");
          setTimeout(function () {
            btn.textContent = original === "Copied" ? "Copy citation" : original;
            btn.removeAttribute("data-copied");
          }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            fallbackCopy(text, done);
          });
        } else {
          fallbackCopy(text, done);
        }
      });
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
    done();
  }

  // ---- boot ---------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    renderFilmstrip();
    initFilters();
    initCopyButtons();
  });
})();
