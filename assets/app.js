// Bahasa Melayu อต.1 — เสียงอ่าน แบบทดสอบตนเอง บัตรคำ คำศัพท์วันนี้ และค้นหาอภิธานศัพท์
(function () {
  "use strict";

  // ---------- เสียงอ่าน (ใช้ระบบอ่านออกเสียงของเครื่อง) ----------
  var synth = window.speechSynthesis;
  var voice = null;
  function pickVoice() {
    if (!synth) return;
    var vs = synth.getVoices();
    voice = vs.find(function (v) { return /^ms/i.test(v.lang); }) ||
            vs.find(function (v) { return /^id/i.test(v.lang); }) || null;
  }
  if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
    document.documentElement.classList.add("no-voice");
  } else {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  }
  function say(text, el) {
    if (!synth || !text) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : "ms-MY";
    if (voice) u.voice = voice;
    u.rate = 0.85;
    if (el) {
      el.classList.add("on");
      u.onend = u.onerror = function () { el.classList.remove("on"); };
    }
    synth.speak(u);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (b) say(b.getAttribute("data-say"), b);
  });

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function thNum(n) { return String(n); } // ใช้เลขอารบิก
  function bi(ms, th) { return '<span lang="ms">' + ms + '</span> <span class="tr">· ' + th + "</span>"; }
  function jw(s) { return s ? '<span class="jw" lang="ms-Arab" dir="rtl">' + esc(s) + "</span>" : ""; }

  // ---------- แบบทดสอบตนเอง ----------
  document.querySelectorAll(".quiz").forEach(function (box) {
    var words = JSON.parse(box.getAttribute("data-vocab"));
    var N = Math.min(8, words.length);
    var qs, idx, score;
    function start() {
      qs = shuffle(words).slice(0, N); idx = 0; score = 0; ask();
    }
    function ask() {
      if (idx >= qs.length) return finish();
      var w = qs[idx];
      var opts = shuffle([w].concat(shuffle(words.filter(function (x) { return x.th !== w.th; })).slice(0, 3)));
      box.innerHTML = "";
      box.appendChild(h("p", { "class": "qz-prog" }, bi("Soalan " + (idx + 1) + " / " + qs.length + " · Apakah maksud perkataan ini?", "ข้อ " + thNum(idx + 1) + " / " + thNum(qs.length) + " คำนี้แปลว่าอะไร")));
      var word = h("p", { "class": "qz-word" }, "<span>" + esc(w.ms) + "</span>" + jw(w.jw));
      if (!document.documentElement.classList.contains("no-voice")) {
        var sb = h("button", { type: "button", "class": "say", "data-say": w.ms, "aria-label": "ฟังเสียง " + w.ms },
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>');
        word.appendChild(sb);
      }
      box.appendChild(word);
      var grid = h("div", { "class": "qz-opts" });
      var fb = h("p", { "class": "qz-fb", "aria-live": "polite" });
      opts.forEach(function (o) {
        var b = h("button", { type: "button" }, esc(o.th));
        b.addEventListener("click", function () {
          var ok = o === w;
          if (ok) score++;
          grid.querySelectorAll("button").forEach(function (x, i) {
            x.disabled = true;
            if (opts[i] === w) x.classList.add("right");
          });
          if (!ok) b.classList.add("wrong");
          fb.innerHTML = ok ? bi("Betul! Bagus!", "ถูกต้อง!") : bi("Belum betul. Jawapannya “" + esc(w.th) + "”", "ยังไม่ถูก คำตอบคือ “" + esc(w.th) + "”");
          fb.style.color = ok ? "var(--ok)" : "var(--no)";
          var nx = h("button", { type: "button", "class": "btn" }, idx + 1 < qs.length ? bi("Soalan seterusnya", "ข้อต่อไป") : bi("Lihat markah", "ดูคะแนน"));
          nx.addEventListener("click", function () { idx++; ask(); });
          box.appendChild(nx);
          nx.focus();
        });
        grid.appendChild(b);
      });
      box.appendChild(grid);
      box.appendChild(fb);
    }
    function finish() {
      box.innerHTML = "";
      box.appendChild(h("p", { "class": "qz-prog" }, bi("Selesai", "ทำครบแล้ว")));
      box.appendChild(h("p", { "class": "qz-score" }, '<span lang="ms">Markah: ' + score + " / " + qs.length + '</span><span class="sc-th">ได้ ' + thNum(score) + " จาก " + thNum(qs.length) + " คะแนน</span>"));
      box.appendChild(h("p", null, score === qs.length ? bi("Syabas! Cemerlang!", "ยอดเยี่ยม!") : bi("Cuba lagi untuk mengulang kaji perkataan yang belum diingati.", "ลองอีกครั้งเพื่อทบทวนคำที่ยังจำไม่ได้")));
      var again = h("button", { type: "button", "class": "btn" }, bi("Cuba lagi", "ทำอีกครั้ง"));
      again.addEventListener("click", start);
      box.appendChild(again);
    }
    start();
  });

  // ---------- บัตรคำ ----------
  document.querySelectorAll(".cards").forEach(function (box) {
    JSON.parse(box.getAttribute("data-vocab")).forEach(function (w) {
      var c = h("button", { type: "button", "class": "card", "aria-label": "บัตรคำ " + w.ms + " แตะเพื่อดูความหมาย" },
        '<span class="card-in"><span class="face front">' + esc(w.ms) + jw(w.jw) + '</span><span class="face back">' + esc(w.th) + "</span></span>");
      c.addEventListener("click", function () {
        c.classList.toggle("flip");
        if (c.classList.contains("flip")) say(w.ms);
      });
      box.appendChild(c);
    });
  });

  // ---------- คำศัพท์วันนี้ (หน้าแรก) ----------
  var wMs = document.getElementById("w-ms");
  if (wMs) {
    var list = JSON.parse(document.getElementById("words").textContent);
    var day = Math.floor(Date.now() / 864e5);
    var k = day % list.length;
    var show = function () {
      var w = list[k];
      wMs.textContent = w.ms;
      document.getElementById("w-jw").textContent = w.jw || "";
      document.getElementById("w-th").textContent = w.th;
    };
    show();
    document.getElementById("w-next").addEventListener("click", function () { k = (k + 1 + Math.floor(Math.random() * (list.length - 1))) % list.length; show(); });
    document.getElementById("w-say").addEventListener("click", function () { say(list[k].ms, this); });
  }

  // ---------- ค้นหาอภิธานศัพท์ ----------
  var q = document.getElementById("g-q");
  if (q) {
    var rows = Array.prototype.slice.call(document.querySelectorAll("#g-table tbody tr"));
    var cnt = document.getElementById("g-count");
    var run = function () {
      var t = q.value.trim().toLowerCase(), n = 0;
      rows.forEach(function (r) { var hit = !t || r.getAttribute("data-q").indexOf(t) > -1; r.hidden = !hit; if (hit) n++; });
      cnt.innerHTML = t ? bi("Dijumpai " + n + " perkataan", "พบ " + thNum(n) + " คำ") : "";
    };
    q.addEventListener("input", run);
  }
})();
