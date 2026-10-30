// หนังสือเรียนภาษามลายู ชั้น อต.1
module.exports = {
  grade: 1,
  preface: [
    "หนังสือเรียนภาษามลายูเล่มนี้จัดทำขึ้นสำหรับผู้เรียนชั้นปีที่ 1 หลักสูตรอิสลามศึกษาตอนต้น (อต.1) ตามมาตรฐาน มย และตัวชี้วัดของหลักสูตร โดยมุ่งให้ผู้เรียนรู้จักพยัญชนะและสระภาษามลายูทั้งอักษรรูมีและอักษรยาวี อ่านและเขียนพยางค์และคำศัพท์พื้นฐาน และนำคำศัพท์ไปใช้ในชีวิตประจำวัน",
    "เนื้อหาแบ่งเป็น 9 บท เริ่มจากอักษรรูมี อักษรยาวี สระ การอ่านเขียนคำ พยางค์เปิดและพยางค์ปิด ต่อด้วยคำศัพท์หมวดอวัยวะของร่างกาย ครอบครัว โรงเรียน และหลักการอิสลาม 5 ประการ ทุกบทมีจุดประสงค์การเรียนรู้ เนื้อหา แบบฝึกหัด และข้อคิด เพื่อให้ผู้เรียนเห็นคุณค่าของการใช้ภาษามลายู ท้ายเล่มมีอภิธานศัพท์และเฉลยแบบฝึกหัด",
    "ภาษาที่ใช้ในหนังสือเล่มนี้เป็นภาษามลายูมาตรฐาน (Bahasa Melayu Standard) ทั้งหมด ผู้เรียบเรียงหวังว่าหนังสือเล่มนี้จะเป็นประโยชน์แก่ครูและผู้เรียนในการจัดการเรียนการสอนภาษามลายู",
  ],
  preface_ms: [
    "Buku teks Bahasa Melayu ini disediakan untuk murid Tahun 1 Kurikulum Pendidikan Islam Peringkat Awal berdasarkan standard dan petunjuk kurikulum. Buku ini bertujuan supaya murid mengenal huruf konsonan dan huruf vokal bahasa Melayu dalam tulisan Rumi dan tulisan Jawi, dapat membaca dan menulis suku kata serta perkataan asas, dan menggunakan perkataan tersebut dalam kehidupan seharian.",
    "Kandungan buku ini dibahagikan kepada 9 pelajaran, bermula dengan huruf Rumi, huruf Jawi, huruf vokal, membaca dan menulis perkataan, suku kata terbuka dan tertutup, diikuti perkataan tentang anggota badan, ahli keluarga, sekolah dan Rukun Islam. Setiap pelajaran mengandungi objektif pembelajaran, isi pelajaran, latihan dan nilai murni supaya murid menghargai penggunaan bahasa Melayu. Di bahagian akhir buku terdapat glosari dan jawapan latihan.",
    "Bahasa yang digunakan dalam buku ini ialah bahasa Melayu standard sepenuhnya. Penyusun berharap buku ini dapat memberi manfaat kepada guru dan murid dalam pengajaran dan pembelajaran bahasa Melayu.",
  ],
  indicators: [
    "ฟังการออกเสียง พยัญชนะและสระภาษามลายู",
    "บอกพยัญชนะ สระภาษามลายูจากการฟัง",
    "อ่านและเขียน พยัญชนะ สระ พยางค์ และคำศัพท์ภาษามลายูที่กำหนด",
    "จับคู่ตัวพยัญชนะมลายูพิมพ์ใหญ่และพิมพ์เล็กที่กำหนด",
    "พูดโต้ตอบพยัญชนะ พยางค์ และคำศัพท์ภาษามลายูที่กำหนด",
    "เห็นคุณค่าการใช้ภาษามลายูที่กำหนด",
  ],
  indicators_ms: [
    "Mendengar sebutan huruf konsonan dan huruf vokal bahasa Melayu",
    "Menyebut huruf konsonan dan huruf vokal bahasa Melayu yang didengar",
    "Membaca dan menulis huruf konsonan, huruf vokal, suku kata dan perkataan bahasa Melayu yang ditetapkan",
    "Memadankan huruf besar dan huruf kecil bahasa Melayu yang ditetapkan",
    "Bertutur secara bersoal jawab menggunakan huruf, suku kata dan perkataan bahasa Melayu yang ditetapkan",
    "Menghargai penggunaan bahasa Melayu yang ditetapkan",
  ],
  units: [
    // ---------------------------------------------------------------- 1
    {
      title: "Huruf Rumi",
      th: "อักษรรูมี",
      indicators: [1, 2, 4, 6],
      objectives: [
        "Mendengar dan menyebut huruf Rumi A – Z dengan betul||ฟังและออกเสียงอักษรรูมี A – Z ได้ถูกต้อง",
        "Menyebut nama huruf Rumi yang didengar||บอกชื่ออักษรรูมีจากการฟังได้",
        "Memadankan huruf besar dengan huruf kecil||จับคู่อักษรพิมพ์ใหญ่ (huruf besar) กับพิมพ์เล็ก (huruf kecil) ได้",
      ],
      sections: [
        {
          title: "Huruf besar  อักษรพิมพ์ใหญ่",
          blocks: [
            { type: "p", text: "Bahasa Melayu ditulis dengan 26 huruf Rumi. Dengar guru membaca, kemudian baca semula satu demi satu.||ภาษามลายูเขียนด้วยอักษรรูมี (อักษรโรมัน) 26 ตัว ฟังครูอ่าน แล้วอ่านตามทีละตัว" },
            { type: "letters", cols: 7, size: 48, items: [["A","a"],["B","bi"],["C","si"],["D","di"],["E","i"],["F","ef"],["G","ji"],["H","eic"],["I","ai"],["J","je"],["K","ke"],["L","el"],["M","em"],["N","en"],["O","o"],["P","pi"],["Q","kiu"],["R","ar"],["S","es"],["T","ti"],["U","yu"],["V","vi"],["W","dabel yu"],["X","eks"],["Y","wai"],["Z","zed"]] },
            { type: "note", title: "Untuk perhatian guru||ครูควรรู้", lines: ["Tulisan kecil di bawah huruf ialah **nama huruf** seperti yang digunakan di sekolah di Malaysia. Semasa mengeja, gunakan **bunyi** huruf, contohnya B dibunyikan /b/, M dibunyikan /m/.||บรรทัดเล็กใต้ตัวอักษรคือ **ชื่อตัวอักษร** ตามที่ใช้ในโรงเรียนประเทศมาเลเซีย เวลาสะกดคำให้ใช้ **เสียง** ของตัวอักษร เช่น B ออกเสียง /บ/, M ออกเสียง /ม/"] },
          ],
        },
        {
          title: "Huruf besar dan huruf kecil  พิมพ์ใหญ่และพิมพ์เล็ก",
          blocks: [
            { type: "p", text: "Setiap huruf Rumi mempunyai 2 bentuk, iaitu **huruf besar** dan **huruf kecil**. Huruf besar digunakan pada awal ayat dan awal nama, contohnya **A**li, **M**asjid, **I**slam.||อักษรรูมีทุกตัวมี 2 แบบ คือ **huruf besar** (พิมพ์ใหญ่) และ **huruf kecil** (พิมพ์เล็ก) เราใช้พิมพ์ใหญ่ขึ้นต้นประโยคและขึ้นต้นชื่อ เช่น **A**li, **M**asjid, **I**slam" },
            { type: "letters", cols: 7, size: 44, items: [["A a"],["B b"],["C c"],["D d"],["E e"],["F f"],["G g"],["H h"],["I i"],["J j"],["K k"],["L l"],["M m"],["N n"],["O o"],["P p"],["Q q"],["R r"],["S s"],["T t"],["U u"],["V v"],["W w"],["X x"],["Y y"],["Z z"]] },
          ],
        },
      ],
      latihan: [
        { q: "Dengar guru membaca, kemudian bulatkan huruf yang didengar.||ฟังครูอ่าน แล้ววงกลมอักษรที่ได้ยิน", items: ["B  –  D  –  P", "M  –  N  –  W", "S  –  C  –  Z", "G  –  J  –  K", "F  –  V  –  P"] },
        { q: "Padankan huruf besar dengan huruf kecil yang betul (tulis huruf di tempat kosong).||จับคู่อักษรพิมพ์ใหญ่กับพิมพ์เล็กให้ถูกต้อง (เขียนตัวอักษรลงในช่องว่าง)", items: ["A  —  ____", "M  —  ____", "R  —  ____", "G  —  ____", "Q  —  ____", "Y  —  ____"], answers: "a, m, r, g, q, y" },
        { q: "Tulis huruf besar yang tertinggal.||เขียนอักษรพิมพ์ใหญ่ที่หายไป", items: ["A  B  ___  D  E", "J  K  ___  M  N", "R  S  T  ___  V", "W  ___  Y  Z"], answers: "C, L, U, X" },
        { q: "Tulis huruf kecil yang tertinggal.||เขียนอักษรพิมพ์เล็กที่หายไป", items: ["a  b  c  ___  e", "f  ___  h  i  j", "o  p  ___  r  s"], answers: "d, g, q" },
      ],
      nilai: "อักษรรูมีเป็นกุญแจดอกแรกของการอ่านภาษามลายู ฝึกอ่านทุกวันวันละนิด แล้วจะอ่านหนังสือได้คล่องขึ้น",
      nilai_ms: "Huruf Rumi ialah kunci pertama untuk membaca dalam bahasa Melayu. Berlatihlah membaca sedikit setiap hari, nescaya kamu dapat membaca buku dengan lebih lancar.",
    },
    // ---------------------------------------------------------------- 2
    {
      title: "Huruf Jawi",
      th: "อักษรยาวี",
      indicators: [1, 2, 3, 6],
      objectives: [
        "Mendengar dan menyebut nama huruf Jawi dari ا hingga ي dengan betul||ฟังและออกเสียงชื่ออักษรยาวีตั้งแต่ ا ถึง ي ได้ถูกต้อง",
        "Menyebut nama huruf Jawi yang didengar||บอกชื่ออักษรยาวีจากการฟังได้",
        "Mengetahui bahawa tulisan Jawi ditulis dan dibaca dari kanan ke kiri||รู้ว่าอักษรยาวีเขียนและอ่านจากขวาไปซ้าย",
      ],
      sections: [
        {
          title: "Mengenal huruf Jawi  รู้จักอักษรยาวี",
          blocks: [
            { type: "p", text: "Tulisan Jawi berasal daripada tulisan Arab, kemudian ditambah huruf untuk bunyi dalam bahasa Melayu, seperti چ (ca), ڠ (nga), ڤ (pa), ݢ (ga), ڽ (nya) dan ۏ (va). Tulisan Jawi ditulis dan dibaca **dari kanan ke kiri**.||อักษรยาวีพัฒนามาจากอักษรอาหรับ แล้วเพิ่มตัวอักษรสำหรับเสียงในภาษามลายู เช่น چ (ca), ڠ (nga), ڤ (pa), ݢ (ga), ڽ (nya) และ ۏ (va) อักษรยาวีเขียนและอ่าน **จากขวาไปซ้าย**" },
            { type: "letters", cols: 6, size: 56, items: [["ا","alif"],["ب","ba"],["ت","ta"],["ث","sa"],["ج","jim"],["چ","ca"],["ح","ha"],["خ","kha"],["د","dal"],["ذ","zal"],["ر","ra"],["ز","zai"],["س","sin"],["ش","syin"],["ص","sad"],["ض","dad"],["ط","ta"],["ظ","za"],["ع","ain"],["غ","ghain"],["ڠ","nga"],["ف","fa"],["ڤ","pa"],["ق","qaf"],["ک","kaf"],["ݢ","ga"],["ل","lam"],["م","mim"],["ن","nun"],["و","wau"],["ۏ","va"],["ه","ha"],["ء","hamzah"],["ي","ya"],["ڽ","nya"],["ى","ye"]] },
          ],
        },
        {
          title: "Huruf Jawi tambahan  อักษรที่เพิ่มสำหรับภาษามลายู",
          blocks: [
            { type: "table", head: ["Huruf Jawi||อักษรยาวี", "Nama||ชื่อ", "Bunyi||เสียง", "Contoh perkataan||ตัวอย่างคำ"], widths: [1600, 1800, 1700, 4260], align: ["center", null, null, null].map((a) => a && "center"), sizes: [48], rows: [
              ["چ", "ca", "/จ/", "**cawan**  چاون  ถ้วย"],
              ["ڠ", "nga", "/ง/", "**bunga**  بوڠا  ดอกไม้"],
              ["ڤ", "pa", "/ป/", "**padi**  ڤادي  ข้าว (ต้นข้าว)"],
              ["ݢ", "ga", "/ก/", "**gigi**  ݢيݢي  ฟัน"],
              ["ڽ", "nya", "/ญ/", "**nyamuk**  ڽاموق  ยุง"],
              ["ۏ", "va", "/ว/ (ฟันบนแตะริมฝีปากล่าง)", "**video**  ۏيديو  วีดิทัศน์"],
            ] },
          ],
        },
      ],
      latihan: [
        { q: "Dengar guru menyebut nama huruf, kemudian tunjuk huruf Jawi yang betul dalam jadual.||ฟังครูอ่านชื่ออักษร แล้วชี้อักษรยาวีในตารางให้ถูกต้อง", items: ["alif  •  ba  •  jim  •  sin  •  mim", "nga  •  pa  •  ga  •  nya  •  ca"] },
        { q: "Tulis nama huruf Jawi yang berikut.||เขียนชื่อของอักษรยาวีต่อไปนี้", items: ["ب  =  ________", "م  =  ________", "ڠ  =  ________", "ڤ  =  ________", "ي  =  ________"], answers: "ba, mim, nga, pa, ya" },
        { q: "Jawab soalan.||ตอบคำถาม", items: ["Tulisan Jawi ditulis dari arah mana ke arah mana?  ________________||อักษรยาวีเขียนจากด้านใดไปด้านใด  ________________", "Huruf Jawi yang pertama ialah  ________  dan huruf yang terakhir dalam jadual ialah  ________||อักษรยาวีตัวแรกคือ  ________  ตัวสุดท้ายในตารางคือ  ________"], answers: "Dari kanan ke kiri; alif (ا) dan ye (ى)||จากขวาไปซ้าย; alif (ا) และ ye (ى)" },
      ],
      nilai: "อักษรยาวีเป็นมรดกของชาวมลายูและใช้เขียนตำราศาสนามาช้านาน การรู้อักษรยาวีช่วยให้เราอ่านหนังสือศาสนาและเข้าใจวัฒนธรรมของเราเอง",
      nilai_ms: "Tulisan Jawi ialah warisan orang Melayu dan telah lama digunakan untuk menulis kitab agama. Dengan mengenal tulisan Jawi, kita dapat membaca kitab agama dan memahami budaya kita sendiri.",
    },
    // ---------------------------------------------------------------- 3
    {
      title: "Huruf Vokal",
      th: "สระ",
      indicators: [1, 2, 3, 5],
      objectives: [
        "Menyebut huruf vokal Rumi a, e, i, o, u dengan betul||ออกเสียงสระรูมี a, e, i, o, u ได้ถูกต้อง",
        "Mengenal huruf Jawi yang mewakili bunyi vokal, iaitu ا و ي||รู้จักอักษรยาวีที่ใช้แทนเสียงสระ คือ ا و ي",
        "Mengenal pasti huruf vokal dalam perkataan yang didengar||บอกสระจากการฟังคำได้",
      ],
      sections: [
        {
          title: "Vokal Rumi  สระอักษรรูมี",
          blocks: [
            { type: "p", text: "Tulisan Rumi bahasa Melayu mempunyai 5 huruf vokal, iaitu **a  e  i  o  u**||ภาษามลายูอักษรรูมีมีสระ 5 ตัว คือ **a  e  i  o  u**" },
            { type: "table", head: ["Vokal||สระ", "Bunyi||เสียง", "Contoh perkataan||ตัวอย่างคำ", "Maksud||ความหมาย"], widths: [1300, 2000, 2800, 3260], sizes: [48], align: ["center"], rows: [
              ["A a", "/อา/", "**api**", "ไฟ"],
              ["E e", "/เออ/ หรือ /เอ/", "**emak**", "แม่"],
              ["I i", "/อี/", "**ikan**", "ปลา"],
              ["O o", "/โอ/", "**oren**", "ส้ม"],
              ["U u", "/อู/", "**ular**", "งู"],
            ] },
          ],
        },
        {
          title: "Vokal Jawi  สระอักษรยาวี",
          blocks: [
            { type: "p", text: "Tulisan Jawi menggunakan 3 huruf ini untuk mewakili bunyi vokal.||อักษรยาวีใช้ 3 ตัวนี้แทนเสียงสระ" },
            { type: "table", head: ["Huruf Jawi||อักษรยาวี", "Nama||ชื่อ", "Mewakili bunyi||แทนเสียง", "Contoh||ตัวอย่าง"], widths: [1600, 1600, 2200, 3960], sizes: [56], align: ["center"], rows: [
              ["ا", "alif", "a", "**api**  اڤي"],
              ["و", "wau", "o, u", "**ular**  اولر"],
              ["ي", "ya", "e (เอ), i", "**ibu**  ايبو"],
            ] },
          ],
        },
      ],
      latihan: [
        { q: "Dengar guru membaca perkataan, kemudian tulis huruf vokal pertama dalam perkataan itu.||ฟังครูอ่านคำ แล้วเขียนสระตัวแรกของคำ", items: ["api  →  ____", "ikan  →  ____", "ular  →  ____", "emak  →  ____", "oren  →  ____"], answers: "a, i, u, e, o" },
        { q: "Isikan huruf vokal a, e, i, o, u supaya menjadi perkataan yang betul.||เติมสระ a, e, i, o, u ให้เป็นคำที่ถูกต้อง", items: ["b__ku  (หนังสือ)", "k__ki  (เท้า)", "__bu  (แม่)", "m__ta  (ตา)", "__ren  (ส้ม)"], answers: "buku, kaki, ibu, mata, oren" },
        { q: "Bekerja secara berpasangan. Baca perkataan kepada rakan, kemudian bertukar giliran.||จับคู่กับคู่ อ่านคำให้เพื่อนฟัง แล้วสลับกัน", items: ["api  •  ayam  •  ikan  •  ibu  •  ular  •  ubi"] },
      ],
      nilai: "การออกเสียงสระให้ชัดเจนทำให้ผู้ฟังเข้าใจเราได้ถูกต้อง ทั้งเวลาพูดภาษามลายูและเวลาอ่านอัลกุรอาน",
      nilai_ms: "Menyebut huruf vokal dengan jelas membolehkan pendengar memahami kita dengan betul, sama ada semasa bertutur dalam bahasa Melayu atau semasa membaca al-Quran.",
    },
    // ---------------------------------------------------------------- 4
    {
      title: "Membaca dan Menulis Huruf",
      th: "การอ่านและเขียนพยัญชนะ",
      indicators: [3, 5, 6],
      objectives: [
        "Membaca dan menulis perkataan yang bermula dengan huruf konsonan yang ditetapkan dalam tulisan Rumi dan Jawi||อ่านและเขียนคำที่ขึ้นต้นด้วยพยัญชนะที่กำหนดได้ทั้งอักษรรูมีและยาวี",
        "Menyebut perkataan agama yang bermula dengan huruf-huruf tertentu||บอกคำศัพท์ศาสนาที่ขึ้นต้นด้วยตัวอักษรต่าง ๆ ได้",
      ],
      sections: [
        {
          title: "Huruf dan perkataan  ตัวอักษรกับคำ",
          blocks: [
            { type: "p", text: "Baca huruf, perkataan Rumi dan perkataan Jawi, kemudian salin dalam buku latihan.||อ่านตัวอักษร คำอักษรรูมี และคำอักษรยาวี แล้วเขียนตามในสมุด" },
            { type: "table", head: ["Huruf||อักษร", "Rumi", "Jawi", "Maksud||ความหมาย"], widths: [1300, 2600, 2400, 3060], sizes: [44, 34], bolds: [true, true], align: ["center"], rows: [
              ["A", "azan", "اذان", "การอะซาน (เรียกละหมาด)"],
              ["B", "buku", "بوکو", "หนังสือ"],
              ["D", "doa", "دعا", "ดุอาอ์ คำขอพร"],
              ["I", "Islam", "اسلام", "ศาสนาอิสลาม"],
              ["K", "Kaabah", "کعبه", "กะอ์บะฮ์"],
              ["M", "masjid", "مسجد", "มัสยิด"],
              ["N", "nabi", "نبي", "นบี ศาสนทูต"],
              ["Q", "Quran", "قرءان", "อัลกุรอาน"],
              ["S", "solat", "صلاة", "การละหมาด"],
              ["W", "wuduk", "وضوء", "การอาบน้ำละหมาด"],
              ["Z", "zakat", "زکاة", "ซะกาต"],
            ] },
          ],
        },
        {
          title: "Mari bertutur  มาพูดกันเถอะ",
          blocks: [
            { type: "dialog", title: "Guru menunjuk huruf, murid menjawab dengan perkataan||ครูชี้ตัวอักษร นักเรียนตอบเป็นคำ", lines: [
              ["Cikgu", "Huruf apa ini?"],
              ["Murid", "Ini huruf **S**."],
              ["Cikgu", "Perkataan apa bermula dengan huruf **S**?"],
              ["Murid", "**Solat**, cikgu."],
              ["Cikgu", "Bagus!"],
            ] },
            { type: "vocab", noJawi: true, rows: [["Huruf apa ini?", "นี่คือตัวอักษรอะไร"], ["Ini huruf ...", "นี่คือตัวอักษร ..."], ["bermula dengan", "ขึ้นต้นด้วย"], ["Bagus!", "เก่งมาก ดีมาก"]] },
          ],
        },
      ],
      latihan: [
        { q: "Tulis huruf pertama bagi setiap perkataan.||เขียนตัวอักษรตัวแรกของคำ", items: ["____ olat", "____ asjid", "____ akat", "____ uduk", "____ uran"], answers: "s, m, z, w, Q" },
        { q: "Padankan perkataan Rumi dengan perkataan Jawi.||จับคู่คำอักษรรูมีกับอักษรยาวี", table: { head: ["Rumi", "Jawi"], widths: [4680, 4680], rows: [["1) Islam", "ก.  مسجد"], ["2) masjid", "ข.  صلاة"], ["3) solat", "ค.  اسلام"], ["4) buku", "ง.  بوکو"]] }, answers: "1–ค, 2–ก, 3–ข, 4–ง" },
        { q: "Salin perkataan berikut dalam tulisan Rumi dan Jawi, 3 kali bagi setiap perkataan.||คัดคำต่อไปนี้ด้วยอักษรรูมีและยาวี คำละ 3 ครั้ง", items: ["Islam  /  اسلام", "doa  /  دعا"], lines: 3 },
      ],
      nilai: "คำศัพท์ศาสนาหลายคำ เช่น solat, doa, wuduk เราใช้ทุกวัน เมื่ออ่านและเขียนได้ถูกต้อง เราก็จดจำคำสอนของศาสนาได้ดีขึ้น",
      nilai_ms: "Banyak perkataan agama seperti solat, doa dan wuduk kita gunakan setiap hari. Apabila kita dapat membaca dan menulisnya dengan betul, kita lebih mudah mengingati ajaran agama.",
    },
    // ---------------------------------------------------------------- 5
    {
      title: "Suku Kata Terbuka dan Tertutup",
      th: "พยางค์เปิดและพยางค์ปิด",
      indicators: [1, 3, 5],
      objectives: [
        "Menyatakan perbezaan antara suku kata terbuka dan suku kata tertutup||บอกความแตกต่างของพยางค์เปิดและพยางค์ปิดได้",
        "Membaca perkataan yang terdiri daripada suku kata terbuka dan suku kata tertutup||อ่านคำที่ประกอบด้วยพยางค์เปิดและพยางค์ปิดได้",
        "Mencerakinkan perkataan kepada suku kata||แยกคำออกเป็นพยางค์ได้",
      ],
      sections: [
        {
          title: "Suku kata terbuka  พยางค์เปิด",
          blocks: [
            { type: "p", text: "Suku kata terbuka ialah suku kata yang **berakhir dengan huruf vokal**, contohnya ma, ta, da, hi, bu, ku.||พยางค์เปิด คือพยางค์ที่ **ลงท้ายด้วยสระ** เช่น ma, ta, da, hi, bu, ku" },
            { type: "table", head: ["Perkataan||คำ", "Suku kata||แยกพยางค์", "Jawi", "Maksud||ความหมาย"], widths: [2200, 2400, 2200, 2560], bolds: [true], rows: [
              ["mata", "ma – ta", "مات", "ตา"],
              ["dahi", "da – hi", "داهي", "หน้าผาก"],
              ["kaki", "ka – ki", "کاکي", "เท้า ขา"],
              ["buku", "bu – ku", "بوکو", "หนังสือ"],
              ["gigi", "gi – gi", "ݢيݢي", "ฟัน"],
            ] },
          ],
        },
        {
          title: "Suku kata tertutup  พยางค์ปิด",
          blocks: [
            { type: "p", text: "Suku kata tertutup ialah suku kata yang **berakhir dengan huruf konsonan**, contohnya ram, but, lut, ngan.||พยางค์ปิด คือพยางค์ที่ **ลงท้ายด้วยพยัญชนะ** เช่น ram, but, lut, ngan" },
            { type: "table", head: ["Perkataan||คำ", "Suku kata||แยกพยางค์", "Jawi", "Maksud||ความหมาย"], widths: [2200, 2400, 2200, 2560], bolds: [true], rows: [
              ["rambut", "ram – but", "رمبوت", "ผม"],
              ["mulut", "mu – lut", "مولوت", "ปาก"],
              ["tangan", "ta – ngan", "تاڠن", "มือ"],
              ["perut", "pe – rut", "ڤروت", "ท้อง"],
              ["hidung", "hi – dung", "هيدوڠ", "จมูก"],
            ] },
            { type: "note", title: "Mudah diingat||จำง่าย ๆ", lines: ["Berakhir dengan **vokal** (a e i o u) = suku kata **terbuka**||ลงท้ายด้วย **สระ** (a e i o u) = พยางค์ **เปิด**", "Berakhir dengan **konsonan** (b d k l m n ng r s t ...) = suku kata **tertutup**||ลงท้ายด้วย **พยัญชนะ** (b d k l m n ng r s t ...) = พยางค์ **ปิด**"] },
          ],
        },
      ],
      latihan: [
        { q: "Ceraikan perkataan berikut kepada suku kata.||แยกคำต่อไปนี้ออกเป็นพยางค์", items: ["mata  =  ____ – ____", "rambut  =  ____ – ____", "kaki  =  ____ – ____", "mulut  =  ____ – ____"], answers: "ma–ta, ram–but, ka–ki, mu–lut" },
        { q: "Adakah suku kata yang bergaris itu suku kata terbuka (T) atau suku kata tertutup (Tt)?||พยางค์ที่ขีดเส้นใต้เป็นพยางค์เปิด (ป) หรือพยางค์ปิด (ด)", items: ["ma-**ta**  ( ____ )", "ram-**but**  ( ____ )", "**bu**-ku  ( ____ )", "ta-**ngan**  ( ____ )"], answers: "T, Tt, T, Tt||ป, ด, ป, ด" },
        { q: "Cantumkan suku kata menjadi perkataan, kemudian tulis maksudnya.||นำพยางค์มาต่อกันให้เป็นคำ แล้วเขียนความหมาย", items: ["da + hi  =  ________  (________)", "pe + rut  =  ________  (________)", "gi + gi  =  ________  (________)"], answers: "dahi (หน้าผาก), perut (ท้อง), gigi (ฟัน)" },
      ],
      nilai: "การอ่านทีละพยางค์ช่วยให้เราอ่านคำยาว ๆ ได้ อย่าท้อเมื่ออ่านยังไม่คล่อง ค่อย ๆ อ่านทีละพยางค์",
      nilai_ms: "Membaca suku kata demi suku kata membantu kita membaca perkataan yang panjang. Jangan berputus asa jika belum lancar membaca; bacalah perlahan-lahan suku kata demi suku kata.",
    },
    // ---------------------------------------------------------------- 6
    {
      title: "Anggota Badan",
      th: "อวัยวะของร่างกาย",
      indicators: [3, 5, 6],
      objectives: [
        "Membaca dan menulis perkataan tentang anggota badan||อ่านและเขียนคำศัพท์อวัยวะของร่างกายได้",
        "Menunjuk anggota badan dan menyebut namanya dalam bahasa Melayu||ชี้อวัยวะและพูดชื่อเป็นภาษามลายูได้",
      ],
      sections: [
        {
          title: "Kosa kata  คำศัพท์",
          blocks: [
            { type: "vocab", rows: [
              ["kepala", "کڤالا", "ศีรษะ หัว"], ["rambut", "رمبوت", "ผม"], ["dahi", "داهي", "หน้าผาก"],
              ["mata", "مات", "ตา"], ["hidung", "هيدوڠ", "จมูก"], ["telinga", "تليڠا", "หู"],
              ["mulut", "مولوت", "ปาก"], ["gigi", "ݢيݢي", "ฟัน"], ["tangan", "تاڠن", "มือ แขน"],
              ["jari", "جاري", "นิ้ว"], ["perut", "ڤروت", "ท้อง"], ["kaki", "کاکي", "เท้า ขา"],
            ] },
          ],
        },
        {
          title: "Mari bertutur  มาพูดกันเถอะ",
          blocks: [
            { type: "dialog", lines: [
              ["Cikgu", "Ini apa?  (Guru menunjuk mata)||Ini apa?  (ครูชี้ที่ตา)"],
              ["Murid", "Ini **mata**."],
              ["Cikgu", "Berapa mata kamu?"],
              ["Murid", "Mata saya **dua**."],
              ["Cikgu", "Sebelum solat, kita membasuh **muka**, **tangan** dan **kaki**."],
            ] },
            { type: "pattern", title: "Pola ayat  รูปประโยค", lines: ["**Ini** + anggota badan  →  Ini **hidung**.||**Ini** + อวัยวะ  →  Ini **hidung**.  (นี่คือจมูก)", "anggota badan + **saya**  →  **Tangan saya** bersih.||อวัยวะ + **saya**  →  **Tangan saya** bersih.  (มือของฉันสะอาด)"] },
          ],
        },
      ],
      latihan: [
        { q: "Tulis perkataan bahasa Melayu bagi anggota badan berikut.||เขียนคำภาษามลายูของอวัยวะต่อไปนี้", items: ["ตา  ________", "หู  ________", "จมูก  ________", "ปาก  ________", "มือ  ________", "เท้า  ________"], answers: "mata, telinga, hidung, mulut, tangan, kaki" },
        { q: "Padankan perkataan Rumi dengan perkataan Jawi.||จับคู่คำอักษรรูมีกับอักษรยาวี", table: { head: ["Rumi", "Jawi"], widths: [4680, 4680], rows: [["1) kepala", "ก.  هيدوڠ"], ["2) hidung", "ข.  کڤالا"], ["3) gigi", "ค.  ݢيݢي"]] }, answers: "1–ข, 2–ก, 3–ค" },
        { q: "Permainan \"Saya kata\" (guru menyebut nama anggota badan, murid menunjuk dengan betul).||เกม \"Saya kata\" (ครูพูดชื่ออวัยวะ นักเรียนชี้ให้ถูก)", items: ["Pegang kepala!  •  Pegang hidung!  •  Pegang telinga!  •  Angkat tangan!"] },
      ],
      nilai: "ร่างกายเป็นอะมานะฮ์ (สิ่งที่อัลลอฮ์ทรงฝากไว้) เราต้องดูแลให้สะอาดและใช้ทำแต่สิ่งดี",
      nilai_ms: "Tubuh badan ialah amanah (sesuatu yang diamanahkan oleh Allah kepada kita). Kita mesti menjaga kebersihannya dan menggunakannya untuk melakukan perkara yang baik sahaja.",
    },
    // ---------------------------------------------------------------- 7
    {
      title: "Ahli Keluarga",
      th: "ครอบครัว",
      indicators: [3, 5, 6],
      objectives: [
        "Membaca dan menulis perkataan tentang ahli keluarga||อ่านและเขียนคำศัพท์สมาชิกในครอบครัวได้",
        "Memperkenalkan ahli keluarga dengan ayat yang mudah||แนะนำสมาชิกในครอบครัวด้วยประโยคง่าย ๆ ได้",
      ],
      sections: [
        {
          title: "Kosa kata  คำศัพท์",
          blocks: [
            { type: "vocab", rows: [
              ["keluarga", "کلوارݢ", "ครอบครัว"], ["ayah", "ايه", "พ่อ"], ["ibu", "ايبو", "แม่"],
              ["abang", "ابڠ", "พี่ชาย"], ["kakak", "کاکق", "พี่สาว"], ["adik", "اديق", "น้อง"],
              ["datuk", "داتوق", "ปู่ ตา"], ["nenek", "نينيق", "ย่า ยาย"], ["saya", "ساي", "ฉัน ผม หนู"],
            ] },
          ],
        },
        {
          title: "Mari membaca  มาอ่านกันเถอะ",
          blocks: [
            { type: "reading", title: "Keluarga Saya", paras: [
              "Ini keluarga saya. Ini ayah saya. Ini ibu saya.",
              "Ini abang saya. Ini kakak saya. Ini adik saya.",
              "Saya sayang keluarga saya.",
            ] },
            { type: "pattern", lines: ["**Ini** + ahli keluarga + **saya**  →  Ini **ibu** saya.||**Ini** + สมาชิก + **saya**  →  Ini **ibu** saya.  (นี่คือแม่ของฉัน)"] },
          ],
        },
      ],
      latihan: [
        { q: "Tulis perkataan bahasa Melayu.||เขียนคำภาษามลายู", items: ["พ่อ  ________", "แม่  ________", "พี่ชาย  ________", "พี่สาว  ________", "น้อง  ________"], answers: "ayah, ibu, abang, kakak, adik" },
        { q: "Susun perkataan menjadi ayat.||เรียงคำให้เป็นประโยค", items: ["saya / ini / ayah  →  ____________________", "ibu / saya / ini  →  ____________________"], answers: "Ini ayah saya. / Ini ibu saya." },
        { q: "Lukis gambar keluarga kamu, kemudian perkenalkan kepada rakan dengan ayat \"Ini ... saya.\"||วาดภาพครอบครัวของตนเอง แล้วแนะนำให้เพื่อนฟังด้วยประโยค \"Ini ... saya.\"", lines: 2 },
      ],
      nilai: "อิสลามสอนให้เราเชื่อฟังและทำดีต่อพ่อแม่ (birrul walidain) และรักพี่น้องในครอบครัว",
      nilai_ms: "Islam mengajar kita supaya taat dan berbuat baik kepada ibu bapa (birrul walidain) serta menyayangi adik-beradik dalam keluarga.",
    },
    // ---------------------------------------------------------------- 8
    {
      title: "Sekolah Saya",
      th: "โรงเรียนของฉัน",
      indicators: [3, 5, 6],
      objectives: [
        "Membaca dan menulis perkataan tentang sekolah||อ่านและเขียนคำศัพท์เกี่ยวกับโรงเรียนได้",
        "Menyebut nama benda di dalam bilik darjah dalam bahasa Melayu||บอกชื่อสิ่งของในห้องเรียนเป็นภาษามลายูได้",
      ],
      sections: [
        {
          title: "Kosa kata  คำศัพท์",
          blocks: [
            { type: "vocab", rows: [
              ["sekolah", "سکوله", "โรงเรียน"], ["kelas", "کلس", "ห้องเรียน ชั้นเรียน"], ["guru / cikgu", "ݢورو / چيقݢو", "ครู"],
              ["murid", "موريد", "นักเรียน"], ["buku", "بوکو", "หนังสือ"], ["pensel", "ڤينسيل", "ดินสอ"],
              ["meja", "ميجا", "โต๊ะ"], ["kerusi", "کروسي", "เก้าอี้"], ["beg", "بيݢ", "กระเป๋า"],
            ] },
          ],
        },
        {
          title: "Mari bertutur  มาพูดกันเถอะ",
          blocks: [
            { type: "dialog", lines: [
              ["Cikgu", "Assalamualaikum, murid-murid."],
              ["Murid", "Waalaikumussalam, cikgu."],
              ["Cikgu", "Ini apa?"],
              ["Murid", "Ini **buku**."],
              ["Cikgu", "Itu apa?"],
              ["Murid", "Itu **meja**."],
            ] },
            { type: "pattern", lines: ["**Ini** = benda yang dekat  →  Ini **pensel**.||**Ini** = สิ่งที่อยู่ใกล้  →  Ini **pensel**.", "**Itu** = benda yang jauh  →  Itu **kerusi**.||**Itu** = สิ่งที่อยู่ไกล  →  Itu **kerusi**."] },
          ],
        },
      ],
      latihan: [
        { q: "Tulis maksudnya dalam bahasa Thai.||เขียนความหมายภาษาไทย", items: ["buku  ________", "meja  ________", "kerusi  ________", "pensel  ________", "murid  ________"], answers: "หนังสือ, โต๊ะ, เก้าอี้, ดินสอ, นักเรียน" },
        { q: "Isikan ini atau itu.||เติม ini หรือ itu", items: ["(memegang pensel di tangan)  ______ pensel.||(ถือดินสออยู่ในมือ)  ______ pensel.", "(menunjuk papan putih yang jauh)  ______ papan putih.||(ชี้กระดานที่อยู่ไกล)  ______ papan putih."], answers: "Ini, Itu" },
        { q: "Tinjau bilik darjah, kemudian tulis nama 5 benda yang kamu lihat dalam bahasa Melayu.||สำรวจห้องเรียน เขียนชื่อสิ่งของที่เห็น 5 อย่างเป็นภาษามลายู", lines: 2 },
      ],
      nilai: "โรงเรียนเป็นสถานที่แสวงหาความรู้ เราควรให้เกียรติครู รักษาความสะอาดห้องเรียน และดูแลสิ่งของส่วนรวม",
      nilai_ms: "Sekolah ialah tempat menuntut ilmu. Kita hendaklah menghormati guru, menjaga kebersihan bilik darjah dan memelihara harta benda bersama.",
    },
    // ---------------------------------------------------------------- 9
    {
      title: "Rukun Islam",
      th: "หลักการอิสลาม 5 ประการ",
      indicators: [3, 5, 6],
      objectives: [
        "Membaca dan menulis perkataan tentang Rukun Islam yang lima||อ่านและเขียนคำศัพท์หลักการอิสลาม 5 ประการได้",
        "Menyebut Rukun Islam yang lima dalam bahasa Melayu mengikut urutan||บอกหลักการอิสลาม 5 ประการเป็นภาษามลายูได้ตามลำดับ",
      ],
      sections: [
        {
          title: "Rukun Islam ada lima  หลักการอิสลามมี 5 ประการ",
          blocks: [
            { type: "table", head: ["Bil.||ลำดับ", "Rukun Islam", "Maksud||ความหมาย"], widths: [1100, 4300, 3960], align: ["center"], rows: [
              ["1", "Mengucap dua kalimah syahadah", "การกล่าวปฏิญาณตน (ชะฮาดะฮ์)"],
              ["2", "Mendirikan solat lima waktu", "การดำรงละหมาดวันละ 5 เวลา"],
              ["3", "Berpuasa pada bulan Ramadan", "การถือศีลอดในเดือนเราะมะฎอน"],
              ["4", "Menunaikan zakat", "การจ่ายซะกาต"],
              ["5", "Menunaikan haji bagi yang mampu", "การประกอบพิธีฮัจญ์สำหรับผู้มีความสามารถ"],
            ] },
          ],
        },
        {
          title: "Kosa kata  คำศัพท์",
          blocks: [
            { type: "vocab", rows: [
              ["rukun", "رکون", "หลักการ"], ["syahadah", "شهادة", "การปฏิญาณตน"], ["solat", "صلاة", "การละหมาด"],
              ["puasa", "ڤواس", "การถือศีลอด"], ["zakat", "زکاة", "ซะกาต"], ["haji", "حاجي", "ฮัจญ์"],
              ["lima", "ليما", "ห้า"],
            ] },
          ],
        },
      ],
      latihan: [
        { q: "Susun Rukun Islam mengikut urutan yang betul (tulis nombor 1–5).||เรียงหลักการอิสลามให้ถูกลำดับ (ใส่ตัวเลข 1–5)", items: ["( ___ ) Menunaikan zakat", "( ___ ) Mengucap dua kalimah syahadah", "( ___ ) Menunaikan haji", "( ___ ) Mendirikan solat", "( ___ ) Berpuasa pada bulan Ramadan"], answers: "4, 1, 5, 2, 3" },
        { q: "Padankan perkataan Rumi dengan perkataan Jawi.||จับคู่คำอักษรรูมีกับอักษรยาวี", table: { head: ["Rumi", "Jawi"], widths: [4680, 4680], rows: [["1) solat", "ก.  زکاة"], ["2) zakat", "ข.  ڤواس"], ["3) puasa", "ค.  صلاة"]] }, answers: "1–ค, 2–ก, 3–ข" },
        { q: "Sebut Rukun Islam kepada guru dan rakan: \"Rukun Islam ada lima. Pertama ...\"||ท่อง Rukun Islam ให้ครูและเพื่อนฟัง: \"Rukun Islam ada lima. Pertama ...\"" },
      ],
      nilai: "หลักการอิสลาม 5 ประการเป็นรากฐานของมุสลิม เมื่อเรารู้ความหมายเป็นภาษามลายู เราก็เข้าใจและปฏิบัติได้ดียิ่งขึ้น",
      nilai_ms: "Rukun Islam yang lima ialah asas bagi setiap Muslim. Apabila kita mengetahui maksudnya dalam bahasa Melayu, kita lebih memahami dan dapat mengamalkannya dengan lebih baik.",
    },
  ],
};
