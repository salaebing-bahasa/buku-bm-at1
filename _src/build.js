// สร้างเว็บไซต์หนังสือเรียนภาษามลายู อต.1 จากไฟล์ข้อมูลเดียวกับหนังสือ Word
// วิธีใช้:  node _src/build.js   (รันที่โฟลเดอร์หลักของ repo)
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const GOATCOUNTER = "buku-bm-at1"; // รหัสเว็บไซต์ใน GoatCounter (สถิติผู้เข้าชม)
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
// ป้ายสองภาษา: มลายูก่อน ไทยตามหลัง
const bi = (ms, th) => `<span class="bi"><span lang="ms">${ms}</span><span class="tr">${th}</span></span>`;
// หัวข้อในข้อมูลที่เขียนแบบ "มลายู  ไทย" (เว้นสองช่อง) แยกเป็นสองบรรทัด
const split2 = (t, f) => { const m = String(t).split(/\s{2,}/); return m.length === 2 ? f(md(m[0]), md(m[1])) : md(t); };
const hBi = (ms, th) => `<span lang="ms">${ms}</span><span class="h-th">${th}</span>`;
const pBi = (ms, th, cls = "") => `<div class="dw${cls ? " " + cls : ""}"><p lang="ms">${ms}</p><p class="tr">${th}</p></div>`;

const SPEAK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const speakBtn = (text, label) => `<button type="button" class="say" data-say="${esc(plain(text))}" aria-label="ฟังเสียง ${esc(label || plain(text))}" title="ฟังเสียง">${SPEAK_ICON}</button>`;

// ---------------------------------------------------------------- บล็อกเนื้อหา
function renderBlock(b) {
  switch (b.type) {
    case "h": return `<h4>${md(b.text)}</h4>`;
    case "p": return `<p>${md(b.text)}</p>`;
    case "bullets": return `<ul class="bul">${b.items.map((i) => `<li>${md(i)}</li>`).join("")}</ul>`;
    case "vocab": {
      const head = b.noJawi ? `<th>#</th><th>Bahasa Melayu</th><th>${bi("Maksud", "ความหมาย")}</th>` : `<th>#</th><th>Rumi</th><th>Jawi</th><th>${bi("Maksud", "ความหมาย")}</th>`;
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
      return `<p class="hint">${bi("Sentuh huruf untuk mendengar sebutan", "แตะที่ตัวอักษรเพื่อฟังเสียง")}</p><ul class="letters${b.items.some((i) => hasAr(i[0])) ? " rtl" : ""}" style="--cols:${b.cols || 6}">${tiles}</ul>`;
    }
    case "dialog": return `<figure class="dialog">${b.title ? `<figcaption>${md(b.title)}</figcaption>` : ""}${b.lines.map(([who, t]) => `<div class="turn"><span class="who">${esc(who)}</span><span class="said">${md(t)} ${speakBtn(t.replace(/\(.*?\)/g, ""), who)}</span></div>`).join("")}</figure>`;
    case "reading": {
      const all = b.paras.map(plain).join(" ");
      return `<article class="reading">${b.title ? `<h4>${md(b.title)}</h4>` : ""}${b.paras.map((p) => `<p>${md(p)}</p>`).join("")}<button type="button" class="btn-ghost say-long" data-say="${esc(all)}">${SPEAK_ICON}<span>${bi("Dengar semua", "ฟังทั้งเรื่อง")}</span></button></article>`;
    }
    case "pantun": return `<blockquote class="pantun">${b.lines.map((l, i) => `${md(l)}${(i + 1) % 4 === 0 && i < b.lines.length - 1 ? "</blockquote><blockquote class=\"pantun\">" : "<br>"}`).join("")}</blockquote>`;
    case "note": return `<aside class="box note"><p class="box-t">${(b.title ? split2(b.title, bi) : bi("Catatan", "หมายเหตุ"))}</p>${b.lines.map((l) => `<p>${md(l)}</p>`).join("")}</aside>`;
    case "pattern": return `<aside class="box pattern"><p class="box-t">${split2(b.title || "Pola ayat  รูปประโยค", bi)}</p>${b.lines.map((l) => `<p>${md(l)}</p>`).join("")}</aside>`;
    default: throw new Error("บล็อกไม่รู้จัก: " + b.type);
  }
}

function renderLatihan(lat) {
  return `<ol class="latihan">${lat.map((x) => {
    let body = "";
    if (x.items) body += `<ol class="items">${x.items.map((i) => `<li>${md(i)}</li>`).join("")}</ol>`;
    if (x.table) body += renderBlock({ type: "table", head: x.table.head, rows: x.table.rows });
    if (x.lines) body += `<div class="write" style="--n:${x.lines}" aria-hidden="true"></div>`;
    if (x.answers) body += `<details class="ans"><summary>${bi("Lihat jawapan", "ดูเฉลย")}</summary><p>${md(x.answers)}</p></details>`;
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
  const nav = [["index.html", "Laman Utama", "หน้าแรก", "utama"], ["index.html#pelajaran", "Pelajaran", "บทเรียน", "pelajaran"], ["glosari.html", "Glosari", "อภิธานศัพท์", "glosari"], ["index.html#guru", "Untuk Guru", "สำหรับครู", "guru"]]
    .map(([h, m, t, k]) => `<a href="${base}${h}"${current === k ? ' aria-current="page"' : ""}><span lang="ms">${m}</span><small>${t}</small></a>`).join("");
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
<a class="skip" href="#isi">${bi("Langkau ke kandungan", "ข้ามไปยังเนื้อหา")}</a>
<header class="site-head">
  <a class="brand" href="${base}index.html"><span class="mark" aria-hidden="true"></span><span>Bahasa Melayu อต.1<small lang="ms">Pendidikan Islam Peringkat Awal</small><small>หลักสูตรอิสลามศึกษาตอนต้น</small></span></a>
  <nav aria-label="Menu utama · เมนูหลัก">${nav}</nav>
</header>
<main id="isi">
${body}
</main>
<footer class="site-foot">
  <p lang="ms">Buku Teks Bahasa Melayu Tahun 1 (อต.1) Kurikulum Pendidikan Islam Peringkat Awal</p>
  <p lang="ms">Disusun oleh Pen. Prof. Muhammad Salaebing · Program Bahasa Melayu, Fakulti Kemanusiaan dan Sains Sosial, Universiti Thaksin</p>
  <p class="foot-th">หนังสือเรียนภาษามลายู ชั้นปีที่ 1 (อต.1) หลักสูตรอิสลามศึกษาตอนต้น</p>
  <p>เรียบเรียงโดย ผศ.มูหำหมัด สาแลบิง · สาขาวิชาภาษามลายู คณะมนุษยศาสตร์และสังคมศาสตร์ มหาวิทยาลัยทักษิณ</p>
</footer>
<script src="${base}assets/app.js"></script>
<script data-goatcounter="https://${GOATCOUNTER}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
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
  const chips = u.indicators.map((k) => `<li title="${esc(book.indicators_ms[k - 1] + " · " + book.indicators[k - 1])}">อต.${thNum(book.grade)}/${thNum(k)}</li>`).join("");
  const sections = u.sections.map((s) => `<section class="sec"><h3>${split2(s.title, hBi)}</h3>${s.blocks.map(renderBlock).join("\n")}</section>`).join("\n");
  const quiz = vocab.length >= 4 ? `
<section class="sec kuiz" id="kuiz">
  <h3>${hBi("Kuiz Kendiri", "ทดสอบตนเอง")}</h3>
  <p class="hint">${bi("Pilih maksud yang betul. Kuiz boleh diulang; soalan dipilih secara rawak setiap kali.", "เลือกความหมายที่ถูกต้อง ทำซ้ำได้หลายรอบ ข้อจะสุ่มใหม่ทุกครั้ง")}</p>
  <div class="quiz" data-vocab="${esc(JSON.stringify(vocab))}"></div>
</section>
<section class="sec" id="kad">
  <h3>${hBi("Kad Imbas", "บัตรคำ")}</h3>
  <p class="hint">${bi("Sentuh kad untuk melihat maksud", "แตะบัตรเพื่อพลิกดูความหมาย")}</p>
  <div class="cards" data-vocab="${esc(JSON.stringify(vocab))}"></div>
</section>` : "";
  const body = `
<nav class="crumb" aria-label="Lokasi · ตำแหน่ง"><p lang="ms"><a href="../index.html">Laman Utama</a> / <a href="../index.html#pelajaran">Pelajaran</a> / <span>Pelajaran ${n}</span></p><p class="tr"><a href="../index.html">หน้าแรก</a> / <a href="../index.html#pelajaran">บทเรียน</a> / <span>บทที่ ${thNum(n)}</span></p></nav>
<header class="unit-head">
  <p class="kicker">${bi(`Pelajaran ${n}`, `บทที่ ${thNum(n)}`)}</p>
  <h1>${md(u.title)}</h1>
  <p class="th-title">${md(u.th)}</p>
  <ul class="chips" aria-label="Petunjuk · ตัวชี้วัด">${chips}</ul>
</header>
<aside class="box obj"><p class="box-t">${bi("Objektif Pembelajaran", "จุดประสงค์การเรียนรู้")}</p><ul>${u.objectives.map((o) => `<li>${md(o)}</li>`).join("")}</ul></aside>
${sections}
<section class="sec" id="latihan"><h3>${hBi("Latihan", "แบบฝึกหัด")}</h3>${renderLatihan(u.latihan)}</section>
${quiz}
<aside class="box nilai"><p class="box-t">${bi("Nilai Murni", "ข้อคิด")}</p><p>${md(u.nilai)}</p></aside>
<nav class="pager" aria-label="Pelajaran sebelum dan seterusnya · บทก่อนหน้าและถัดไป">
  ${prev ? `<a class="prev" href="${pad(n - 1)}.html"><small>${bi("Pelajaran sebelum", "บทก่อนหน้า")}</small>${esc(prev.title)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${pad(n + 1)}.html"><small>${bi("Pelajaran seterusnya", "บทถัดไป")}</small>${esc(next.title)}</a>` : `<a class="next" href="../glosari.html"><small>${bi("Akhir buku", "ท้ายเล่ม")}</small>${bi("Glosari", "อภิธานศัพท์")}</a>`}
</nav>`;
  return page({ title: `บทที่ ${thNum(n)} ${plain(u.title)} — Bahasa Melayu อต.1`, desc: `${plain(u.title)} (${u.th}) บทเรียนภาษามลายู ชั้น อต.1`, base: "../", body, current: "pelajaran" });
}

// ---------------------------------------------------------------- หน้าแรก
function indexPage(words) {
  const cards = book.units.map((u, i) => `<li><a href="pelajaran/${pad(i + 1)}.html"><span class="c-num">${thNum(i + 1)}</span><span class="c-title">${md(u.title)}</span><span class="c-th">${md(u.th)}</span></a></li>`).join("");
  const map = book.indicators.map((ind, k) => {
    const us = book.units.map((u, i) => (u.indicators.includes(k + 1) ? i + 1 : 0)).filter(Boolean);
    return `<tr><td class="code">อต.${thNum(book.grade)}/${thNum(k + 1)}</td><td><span lang="ms">${md(book.indicators_ms[k])}</span><span class="td-th">${md(ind)}</span></td><td>${us.map((x) => `<a href="pelajaran/${pad(x)}.html">${thNum(x)}</a>`).join(" ")}</td></tr>`;
  }).join("");
  const body = `
<section class="hero">
  <div class="hero-text">
    <p class="kicker"><span lang="ms">Pendidikan Islam Peringkat Awal · Tahun 1</span><br>หลักสูตรอิสลามศึกษาตอนต้น · ชั้นปีที่ 1</p>
    <h1>หนังสือเรียนภาษามลายู<span class="ms-title">Buku Teks Bahasa Melayu</span></h1>
    <p class="jw jw-title" lang="ms-Arab" dir="rtl">بوکو تيکس بهاس ملايو</p>
    ${pBi("Belajar huruf Rumi dan huruf Jawi, huruf vokal, suku kata dan perkataan di sekeliling kita dalam 9 pelajaran. Setiap pelajaran disertakan sebutan perkataan yang boleh didengar, latihan beserta jawapan, dan kuiz kendiri. Seluruh buku menggunakan bahasa Melayu standard.", "เรียนอักษรรูมีและอักษรยาวี สระ พยางค์ และคำศัพท์ใกล้ตัว 9 บท ทุกบทฟังเสียงคำศัพท์ได้ มีแบบฝึกหัดพร้อมเฉลย และแบบทดสอบตนเอง ใช้ภาษามลายูมาตรฐานทั้งเล่ม", "lede")}
    <div class="actions"><a class="btn" href="pelajaran/01.html">${bi("Mula Pelajaran 1", "เริ่มบทที่ 1")}</a><a class="btn-ghost" href="#pelajaran">${bi("Semua Pelajaran", "ดูบทเรียนทั้งหมด")}</a></div>
  </div>
  <figure class="word" aria-live="polite">
    <p class="word-label">${bi("Perkataan hari ini", "คำศัพท์วันนี้")}</p>
    <p class="w-ms" id="w-ms">—</p>
    <p class="w-jw jw" id="w-jw" lang="ms-Arab" dir="rtl"></p>
    <p class="w-th" id="w-th"></p>
    <div class="word-foot"><button type="button" class="btn-ghost" id="w-say">${SPEAK_ICON}<span>${bi("Dengar", "ฟังเสียง")}</span></button><button type="button" class="btn-ghost" id="w-next">${bi("Perkataan lain", "คำอื่น")}</button></div>
  </figure>
  <script type="application/json" id="words">${JSON.stringify(words).replace(/</g, "\\u003c")}</script>
</section>

<section class="block" id="pelajaran">
  <h2>${hBi("9 Pelajaran", "บทเรียน 9 บท")}</h2>
  <ol class="unit-cards">${cards}</ol>
</section>

<section class="block" id="pengenalan">
  <h2>${hBi("Kata Pengantar", "คำนำ")}</h2>
  ${book.preface.map((p, i) => pBi(md(book.preface_ms[i]), md(p), "prose")).join("")}
</section>

<section class="block" id="standard">
  <h2>${hBi("Standard dan Petunjuk", "มาตรฐานและตัวชี้วัด")}</h2>
  <aside class="box"><p class="box-t">${bi("Standard มย", "มาตรฐาน มย")}</p><p lang="ms">Menggunakan proses mendengar, bertutur, membaca dan menulis serta memahami prinsip penggunaan bahasa Melayu untuk berkomunikasi, belajar, meningkatkan nilai kehidupan seharian dan mencari ilmu daripada sumber pembelajaran secara kreatif, serta mempunyai tabiat suka membaca.</p><p class="tr">ใช้กระบวนการฟัง พูด อ่าน เขียน เข้าใจหลักการในการใช้ภาษามลายูเพื่อการสื่อสาร การเรียนรู้ เพิ่มคุณค่าในการดำรงชีวิตประจำวันและศึกษาค้นคว้าความรู้จากแหล่งเรียนรู้อย่างสร้างสรรค์ และมีนิสัยรักการอ่าน</p></aside>
  <div class="tbl"><table class="map"><thead><tr><th>${bi("Kod", "รหัส")}</th><th>${bi("Petunjuk Tahun 1", "ตัวชี้วัดชั้นปีที่ 1")}</th><th>${bi("Pelajaran", "บทที่")}</th></tr></thead><tbody>${map}</tbody></table></div>
</section>

<section class="block" id="guru">
  <h2>${hBi("Untuk Guru", "สำหรับครู")}</h2>
  <ul class="bul prose guru">
    ${[
      ["Butang pembesar suara menggunakan suara bahasa Melayu pada peranti (sistem baca teks telefon atau komputer). Jika peranti tiada suara bahasa Melayu, sistem akan menggunakan suara bahasa Indonesia. Guru digalakkan menyebut perkataan untuk murid, dan menggunakan butang ini untuk ulang kaji.",
       "ปุ่มลำโพงใช้เสียงอ่านภาษามลายูของเครื่อง (ระบบอ่านออกเสียงของโทรศัพท์หรือคอมพิวเตอร์) ถ้าเครื่องไม่มีเสียงภาษามลายู ระบบจะใช้เสียงภาษาอินโดนีเซียแทน ครูควรออกเสียงให้นักเรียนฟังเป็นหลัก และใช้ปุ่มนี้เพื่อทบทวน"],
      ["Setiap latihan dalam laman web ini sama dengan buku (fail Word). Butang “Lihat jawapan” di bawah setiap soalan digunakan untuk menyemak jawapan selepas selesai menjawab.",
       "แบบฝึกหัดในเว็บไซต์ตรงกับหนังสือเล่ม (ไฟล์ Word) ทุกข้อ ปุ่ม “ดูเฉลย” ใต้แต่ละข้อใช้ตรวจคำตอบหลังทำเสร็จแล้ว"],
      ["“Kuiz Kendiri” dan “Kad Imbas” di akhir pelajaran dipilih secara rawak daripada perkataan pelajaran itu, sesuai untuk ulang kaji di rumah.",
       "“ทดสอบตนเอง” และ “บัตรคำ” ท้ายบทสุ่มจากคำศัพท์ของบทนั้น เหมาะสำหรับทบทวนที่บ้าน"],
      ["Laman web ini boleh dipaparkan melalui projektor. Huruf dalam jadual huruf Rumi dan Jawi bersaiz besar dan boleh disentuh untuk mendengar sebutan.",
       "เปิดบนโปรเจกเตอร์ได้ ตัวอักษรในตารางอักษรรูมีและยาวีมีขนาดใหญ่ แตะเพื่อฟังเสียงได้"],
    ].map(([m, t]) => `<li><p lang="ms">${m}</p><p class="tr">${t}</p></li>`).join("\n    ")}
  </ul>
</section>`;
  return page({ title: "หนังสือเรียนภาษามลายู อต.1 — Buku Teks Bahasa Melayu Tahun 1", desc: "หนังสือเรียนภาษามลายู ชั้นปีที่ 1 หลักสูตรอิสลามศึกษาตอนต้น พร้อมเสียงคำศัพท์ แบบฝึกหัด และแบบทดสอบตนเอง", base: "", body, current: "utama" });
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
<header class="unit-head"><h1>Glosari</h1><p class="th-title">อภิธานศัพท์</p><p class="hint">${bi(`Semua perkataan: ${all.length}, disusun mengikut abjad`, `คำศัพท์ทั้งหมด ${thNum(all.length)} คำ เรียงตามตัวอักษร`)}</p></header>
<label class="search"><span>${bi("Cari perkataan (bahasa Melayu atau bahasa Thai)", "ค้นหาคำ (ภาษามลายูหรือภาษาไทย)")}</span><input type="search" id="g-q" placeholder="cth. mata · เช่น ครู" autocomplete="off"></label>
<p class="hint" id="g-count" aria-live="polite"></p>
<div class="tbl"><table class="vocab" id="g-table"><thead><tr><th>Rumi</th><th>Jawi</th><th>${bi("Maksud", "ความหมาย")}</th><th>${bi("Pelajaran", "บทที่")}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  return { html: page({ title: "อภิธานศัพท์ — Bahasa Melayu อต.1", desc: "อภิธานศัพท์ภาษามลายู–ไทย ชั้น อต.1", base: "", body, current: "glosari" }), all };
}

// ---------------------------------------------------------------- เขียนไฟล์
fs.mkdirSync(path.join(ROOT, "pelajaran"), { recursive: true });
book.units.forEach((u, i) => fs.writeFileSync(path.join(ROOT, "pelajaran", `${pad(i + 1)}.html`), unitPage(u, i)));
const g = glosariPage();
fs.writeFileSync(path.join(ROOT, "glosari.html"), g.html);
fs.writeFileSync(path.join(ROOT, "index.html"), indexPage(g.all));
console.log(`สร้างเว็บไซต์แล้ว: ${book.units.length} บท, คำศัพท์ ${g.all.length} คำ`);
