// สร้างเว็บไซต์หนังสือเรียนภาษามลายู อต.1 จากไฟล์ข้อมูลเดียวกับหนังสือ Word
// วิธีใช้:  node _src/build.js   (รันที่โฟลเดอร์หลักของ repo)
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const book = require("./data/at1.js");

const thNum = (n) => String(n); // ใช้เลขอารบิก
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const AR = "\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
const AR_RUN = new RegExp(`[${AR}]+(?:\\s+[${AR}]+)*`, "g");
const AR_ONLY = new RegExp(`^[${AR}\\s/]+$`);
const hasAr = (s) => new RegExp(`[${AR}]`).test(s);

// **ตัวหนา**  *ตัวเอียง*  และห่ออักษรยาวีด้วย span ที่อ่านจากขวาไปซ้าย
function md(s) {
  let h = esc(s);
  h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  h = h.replace(AR_RUN, (m) => `<span class="jw" lang="ms-Arab" dir="rtl">${m}</span>`);
  h = h.replace(/_{3,}/g, '<span class="blank" aria-label="ช่องว่าง"></span>');
  return h;
}
const plain = (s) => String(s).replace(/\*\*?/g, "");

const SPEAK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const speakBtn = (text, label) => `<button type="button" class="say" data-say="${esc(plain(text))}" aria-label="ฟังเสียง ${esc(label || plain(text))}" title="ฟังเสียง">${SPEAK_ICON}</button>`;

// ---------------------------------------------------------------- บล็อกเนื้อหา
function renderBlock(b) {
  switch (b.type) {
    case "h": return `<h4>${md(b.text)}</h4>`;
    case "p": return `<p>${md(b.text)}</p>`;
    case "bullets": return `<ul class="bul">${b.items.map((i) => `<li>${md(i)}</li>`).join("")}</ul>`;
    case "vocab": {
      const head = b.noJawi ? "<th>#</th><th>Bahasa Melayu</th><th>ความหมาย</th>" : "<th>#</th><th>Rumi</th><th>Jawi</th><th>ความหมาย</th>";
      const rows = b.rows.map((r, i) => {
        const [ms, a, c] = r;
        const jw = b.noJawi ? "" : `<td class="jw-cell">${md(a)}</td>`;
        const th = b.noJawi ? a : c;
        return `<tr><td class="n">${thNum(i + 1)}</td><td class="ms"><span>${md(ms)}</span>${speakBtn(ms)}</td>${jw}<td>${md(th)}</td></tr>`;
      }).join("");
      return `<div class="tbl"><table class="vocab"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "table": {
      const big = (ci) => b.sizes && b.sizes[ci] && b.sizes[ci] >= 40;
      const rows = b.rows.map((r) => `<tr>${r.map((c, ci) => {
        const cls = [];
        if (AR_ONLY.test(c)) cls.push("jw-cell");
        if (big(ci)) cls.push("big");
        if (b.bolds && b.bolds[ci]) cls.push("b");
        return `<td${cls.length ? ` class="${cls.join(" ")}"` : ""}>${md(c)}</td>`;
      }).join("")}</tr>`).join("");
      return `<div class="tbl"><table><thead><tr>${b.head.map((h) => `<th>${md(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "letters": {
      const tiles = b.items.map(([l, name]) => {
        const jawi = hasAr(l);
        const say = jawi ? name : l.split(" ")[0].toLowerCase();
        return `<li><button type="button" class="tile${jawi ? " is-jw" : ""}" data-say="${esc(say)}" aria-label="${esc(jawi ? `อักษร ${name}` : `อักษร ${l}`)}"><span class="glyph"${jawi ? ' lang="ms-Arab" dir="rtl"' : ""}>${esc(l)}</span>${name ? `<span class="nm">${esc(name)}</span>` : ""}</button></li>`;
      }).join("");
      return `<p class="hint">แตะที่ตัวอักษรเพื่อฟังเสียง</p><ul class="letters${b.items.some((i) => hasAr(i[0])) ? " rtl" : ""}" style="--cols:${b.cols || 6}">${tiles}</ul>`;
    }
    case "dialog": return `<figure class="dialog">${b.title ? `<figcaption>${md(b.title)}</figcaption>` : ""}${b.lines.map(([who, t]) => `<div class="turn"><span class="who">${esc(who)}</span><span class="said">${md(t)} ${speakBtn(t.replace(/\(.*?\)/g, ""), who)}</span></div>`).join("")}</figure>`;
    case "reading": {
      const all = b.paras.map(plain).join(" ");
      return `<article class="reading">${b.title ? `<h4>${md(b.title)}</h4>` : ""}${b.paras.map((p) => `<p>${md(p)}</p>`).join("")}<button type="button" class="btn-ghost say-long" data-say="${esc(all)}">${SPEAK_ICON}<span>ฟังทั้งเรื่อง</span></button></article>`;
    }
    case "pantun": return `<blockquote class="pantun">${b.lines.map((l, i) => `${md(l)}${(i + 1) % 4 === 0 && i < b.lines.length - 1 ? "</blockquote><blockquote class=\"pantun\">" : "<br>"}`).join("")}</blockquote>`;
    case "note": return `<aside class="box note"><p class="box-t">${md(b.title || "หมายเหตุ")}</p>${b.lines.map((l) => `<p>${md(l)}</p>`).join("")}</aside>`;
    case "pattern": return `<aside class="box pattern"><p class="box-t">${md(b.title || "Pola ayat  รูปประโยค")}</p>${b.lines.map((l) => `<p>${md(l)}</p>`).join("")}</aside>`;
    default: throw new Error("บล็อกไม่รู้จัก: " + b.type);
  }
}

function renderLatihan(lat) {
  return `<ol class="latihan">${lat.map((x) => {
    let body = "";
    if (x.items) body += `<ol class="items">${x.items.map((i) => `<li>${md(i)}</li>`).join("")}</ol>`;
    if (x.table) body += renderBlock({ type: "table", head: x.table.head, rows: x.table.rows });
    if (x.lines) body += `<div class="write" style="--n:${x.lines}" aria-hidden="true"></div>`;
    if (x.answers) body += `<details class="ans"><summary>ดูเฉลย</summary><p>${md(x.answers)}</p></details>`;
    return `<li><p class="q">${md(x.q)}</p>${body}</li>`;
  }).join("")}</ol>`;
}

// คำศัพท์ทั้งหมดของบท (ใช้ทำแบบทดสอบตนเองและอภิธานศัพท์)
function unitVocab(u) {
  const out = [];
  u.sections.forEach((s) => s.blocks.forEach((b) => {
    // ตารางที่มีคอลัมน์ Rumi/คำ + Jawi + ความหมาย ก็นับเป็นคำศัพท์ด้วย
    if (b.type === "table") {
      const H = b.head.map(plain);
      const m = H.findIndex((x) => x === "Rumi" || x === "คำ"), j = H.indexOf("Jawi"), t = H.indexOf("ความหมาย");
      if (m < 0 || j < 0 || t < 0) return;
      b.rows.forEach((r) => out.push({ ms: plain(r[m]), jw: r[j], th: r[t] }));
      return;
    }
    if (b.type !== "vocab") return;
    b.rows.forEach((r) => {
      const ms = plain(r[0]);
      if (/[?!…]|\.\.\./.test(ms)) return;
      out.push(b.noJawi ? { ms, th: r[1] } : { ms, jw: r[1], th: r[2] });
    });
  }));
  return out;
}

// ---------------------------------------------------------------- โครงหน้า
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;600;700&family=Noto+Naskh+Arabic:wght@400;600&family=Sarabun:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">';

function page({ title, desc, base, body, current }) {
  const nav = [["index.html#pelajaran", "บทเรียน", "pelajaran"], ["glosari.html", "อภิธานศัพท์", "glosari"], ["index.html#guru", "สำหรับครู", "guru"]]
    .map(([h, t, k]) => `<a href="${base}${h}"${current === k ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${FONTS}
<link rel="stylesheet" href="${base}assets/style.css">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
</head>
<body>
<a class="skip" href="#isi">ข้ามไปยังเนื้อหา</a>
<header class="site-head">
  <a class="brand" href="${base}index.html"><span class="mark" aria-hidden="true"></span><span>Bahasa Melayu อต.1<small>หลักสูตรอิสลามศึกษาตอนต้น</small></span></a>
  <nav aria-label="เมนูหลัก">${nav}</nav>
</header>
<main id="isi">
${body}
</main>
<footer class="site-foot">
  <p>หนังสือเรียนภาษามลายู ชั้นปีที่ 1 (อต.1) หลักสูตรอิสลามศึกษาตอนต้น</p>
  <p>เรียบเรียงโดย ผศ.มูหำหมัด สาแลบิง · สาขาวิชาภาษามลายู คณะมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยทักษิณ</p>
</footer>
<script src="${base}assets/app.js"></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- หน้าบทเรียน
function unitPage(u, i) {
  const n = i + 1;
  const prev = i > 0 ? book.units[i - 1] : null;
  const next = book.units[i + 1] || null;
  const vocab = unitVocab(u);
  const chips = u.indicators.map((k) => `<li title="${esc(book.indicators[k - 1])}">อต.${thNum(book.grade)}/${thNum(k)}</li>`).join("");
  const sections = u.sections.map((s) => `<section class="sec"><h3>${md(s.title)}</h3>${s.blocks.map(renderBlock).join("\n")}</section>`).join("\n");
  const quiz = vocab.length >= 4 ? `
<section class="sec kuiz" id="kuiz">
  <h3>Kuiz kendiri  ทดสอบตนเอง</h3>
  <p class="hint">เลือกความหมายที่ถูกต้อง ทำซ้ำได้หลายรอบ ข้อจะสุ่มใหม่ทุกครั้ง</p>
  <div class="quiz" data-vocab="${esc(JSON.stringify(vocab))}"></div>
</section>
<section class="sec" id="kad">
  <h3>Kad imbas  บัตรคำ</h3>
  <p class="hint">แตะบัตรเพื่อพลิกดูความหมาย</p>
  <div class="cards" data-vocab="${esc(JSON.stringify(vocab))}"></div>
</section>` : "";
  const body = `
<nav class="crumb" aria-label="ตำแหน่ง"><a href="../index.html">หน้าแรก</a> / <a href="../index.html#pelajaran">บทเรียน</a> / <span>บทที่ ${thNum(n)}</span></nav>
<header class="unit-head">
  <p class="kicker">Pelajaran ${n} · บทที่ ${thNum(n)}</p>
  <h1>${md(u.title)}</h1>
  <p class="th-title">${md(u.th)}</p>
  <ul class="chips" aria-label="ตัวชี้วัด">${chips}</ul>
</header>
<aside class="box obj"><p class="box-t">จุดประสงค์การเรียนรู้</p><ul>${u.objectives.map((o) => `<li>${md(o)}</li>`).join("")}</ul></aside>
${sections}
<section class="sec" id="latihan"><h3>Latihan  แบบฝึกหัด</h3>${renderLatihan(u.latihan)}</section>
${quiz}
<aside class="box nilai"><p class="box-t">Nilai murni · ข้อคิด</p><p>${md(u.nilai)}</p></aside>
<nav class="pager" aria-label="บทก่อนหน้าและถัดไป">
  ${prev ? `<a class="prev" href="${pad(n - 1)}.html"><small>บทก่อนหน้า</small>${esc(prev.title)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${pad(n + 1)}.html"><small>บทถัดไป</small>${esc(next.title)}</a>` : `<a class="next" href="../glosari.html"><small>ท้ายเล่ม</small>อภิธานศัพท์</a>`}
</nav>`;
  return page({ title: `บทที่ ${thNum(n)} ${plain(u.title)} — Bahasa Melayu อต.1`, desc: `${plain(u.title)} (${u.th}) บทเรียนภาษามลายู ชั้น อต.1`, base: "../", body, current: "pelajaran" });
}

// ---------------------------------------------------------------- หน้าแรก
function indexPage(words) {
  const cards = book.units.map((u, i) => `<li><a href="pelajaran/${pad(i + 1)}.html"><span class="c-num">${thNum(i + 1)}</span><span class="c-title">${md(u.title)}</span><span class="c-th">${md(u.th)}</span></a></li>`).join("");
  const map = book.indicators.map((ind, k) => {
    const us = book.units.map((u, i) => (u.indicators.includes(k + 1) ? i + 1 : 0)).filter(Boolean);
    return `<tr><td class="code">อต.${thNum(book.grade)}/${thNum(k + 1)}</td><td>${md(ind)}</td><td>${us.map((x) => `<a href="pelajaran/${pad(x)}.html">${thNum(x)}</a>`).join(" ")}</td></tr>`;
  }).join("");
  const body = `
<section class="hero">
  <div class="hero-text">
    <p class="kicker">หลักสูตรอิสลามศึกษาตอนต้น · ชั้นปีที่ 1</p>
    <h1>หนังสือเรียนภาษามลายู<span class="ms-title">Buku Teks Bahasa Melayu</span></h1>
    <p class="jw jw-title" lang="ms-Arab" dir="rtl">بوکو تيکس بهاس ملايو</p>
    <p class="lede">เรียนอักษรรูมีและอักษรยาวี สระ พยางค์ และคำศัพท์ใกล้ตัว 9 บท ทุกบทฟังเสียงคำศัพท์ได้ มีแบบฝึกหัดพร้อมเฉลย และแบบทดสอบตนเอง ใช้ภาษามลายูมาตรฐานทั้งเล่ม</p>
    <div class="actions"><a class="btn" href="pelajaran/01.html">เริ่มบทที่ 1</a><a class="btn-ghost" href="#pelajaran">ดูบทเรียนทั้งหมด</a></div>
  </div>
  <figure class="word" aria-live="polite">
    <p class="word-label">Kata hari ini · คำศัพท์วันนี้</p>
    <p class="w-ms" id="w-ms">—</p>
    <p class="w-jw jw" id="w-jw" lang="ms-Arab" dir="rtl"></p>
    <p class="w-th" id="w-th"></p>
    <div class="word-foot"><button type="button" class="btn-ghost" id="w-say">${SPEAK_ICON}<span>ฟังเสียง</span></button><button type="button" class="btn-ghost" id="w-next">คำอื่น</button></div>
  </figure>
  <script type="application/json" id="words">${JSON.stringify(words).replace(/</g, "\\u003c")}</script>
</section>

<section class="block" id="pelajaran">
  <h2>บทเรียน 9 บท</h2>
  <ol class="unit-cards">${cards}</ol>
</section>

<section class="block" id="pengenalan">
  <h2>คำนำ</h2>
  ${book.preface.map((p) => `<p class="prose">${md(p)}</p>`).join("")}
</section>

<section class="block" id="standard">
  <h2>มาตรฐานและตัวชี้วัด</h2>
  <aside class="box"><p class="box-t">มาตรฐาน มย</p><p>ใช้กระบวนการฟัง พูด อ่าน เขียน เข้าใจหลักการในการใช้ภาษามลายูเพื่อการสื่อสาร การเรียนรู้ เพิ่มคุณค่าในการดำรงชีวิตประจำวันและศึกษาค้นคว้าความรู้จากแหล่งเรียนรู้อย่างสร้างสรรค์ และมีนิสัยรักการอ่าน</p></aside>
  <div class="tbl"><table class="map"><thead><tr><th>รหัส</th><th>ตัวชี้วัดชั้นปีที่ 1</th><th>บทที่</th></tr></thead><tbody>${map}</tbody></table></div>
</section>

<section class="block" id="guru">
  <h2>สำหรับครู</h2>
  <ul class="bul prose">
    <li>ปุ่มลำโพงใช้เสียงอ่านภาษามลายูของเครื่อง (ระบบอ่านออกเสียงของโทรศัพท์หรือคอมพิวเตอร์) ถ้าเครื่องไม่มีเสียงภาษามลายู ระบบจะใช้เสียงภาษาอินโดนีเซียแทน ครูควรออกเสียงให้นักเรียนฟังเป็นหลัก และใช้ปุ่มนี้เพื่อทบทวน</li>
    <li>แบบฝึกหัดในเว็บไซต์ตรงกับหนังสือเล่ม (ไฟล์ Word) ทุกข้อ ปุ่ม “ดูเฉลย” ใต้แต่ละข้อใช้ตรวจคำตอบหลังทำเสร็จแล้ว</li>
    <li>“ทดสอบตนเอง” และ “บัตรคำ” ท้ายบทสุ่มจากคำศัพท์ของบทนั้น เหมาะสำหรับทบทวนที่บ้าน</li>
    <li>เปิดบนโปรเจกเตอร์ได้ ตัวอักษรในตารางอักษรรูมีและยาวีมีขนาดใหญ่ แตะเพื่อฟังเสียงได้</li>
  </ul>
</section>`;
  return page({ title: "หนังสือเรียนภาษามลายู อต.1 — Buku Teks Bahasa Melayu Tahun 1", desc: "หนังสือเรียนภาษามลายู ชั้นปีที่ 1 หลักสูตรอิสลามศึกษาตอนต้น พร้อมเสียงคำศัพท์ แบบฝึกหัด และแบบทดสอบตนเอง", base: "", body, current: "" });
}

// ---------------------------------------------------------------- อภิธานศัพท์
function glosariPage() {
  const map = new Map();
  book.units.forEach((u, i) => unitVocab(u).forEach((v) => {
    const k = v.ms.toLowerCase();
    if (!map.has(k)) map.set(k, { ...v, unit: i + 1 });
  }));
  const all = [...map.values()].sort((a, b) => a.ms.localeCompare(b.ms, "ms"));
  const rows = all.map((v) => `<tr data-q="${esc((v.ms + " " + v.th).toLowerCase())}"><td class="ms"><span>${esc(v.ms)}</span>${speakBtn(v.ms)}</td><td class="jw-cell">${v.jw ? md(v.jw) : ""}</td><td>${esc(v.th)}</td><td class="n"><a href="pelajaran/${pad(v.unit)}.html">${thNum(v.unit)}</a></td></tr>`).join("");
  const body = `
<header class="unit-head"><p class="kicker">Glosari</p><h1>อภิธานศัพท์</h1><p class="th-title">คำศัพท์ทั้งหมด ${thNum(all.length)} คำ เรียงตามตัวอักษร</p></header>
<label class="search"><span>ค้นหาคำ (ภาษามลายูหรือภาษาไทย)</span><input type="search" id="g-q" placeholder="เช่น mata หรือ ครู" autocomplete="off"></label>
<p class="hint" id="g-count" aria-live="polite"></p>
<div class="tbl"><table class="vocab" id="g-table"><thead><tr><th>Rumi</th><th>Jawi</th><th>ความหมาย</th><th>บทที่</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  return { html: page({ title: "อภิธานศัพท์ — Bahasa Melayu อต.1", desc: "อภิธานศัพท์ภาษามลายู–ไทย ชั้น อต.1", base: "", body, current: "glosari" }), all };
}

// ---------------------------------------------------------------- เขียนไฟล์
fs.mkdirSync(path.join(ROOT, "pelajaran"), { recursive: true });
book.units.forEach((u, i) => fs.writeFileSync(path.join(ROOT, "pelajaran", `${pad(i + 1)}.html`), unitPage(u, i)));
const g = glosariPage();
fs.writeFileSync(path.join(ROOT, "glosari.html"), g.html);
fs.writeFileSync(path.join(ROOT, "index.html"), indexPage(g.all));
console.log(`สร้างเว็บไซต์แล้ว: ${book.units.length} บท, คำศัพท์ ${g.all.length} คำ`);
