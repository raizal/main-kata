/* ------------------------------------------------------------------
   Belajar menulis: menelusuri huruf dengan jari.

   Yang berubah dari versi sebelumnya:

   - Layar pemilih tema di depan sudah tidak ada. Pilihan itu sekarang
     diambil di menu, dan menulis toh bukan soal golongan katanya, jadi
     halaman ini memakai daftar gabungan (SEMUA di data.js).
   - Kertas warna-warni yang meledak tiap huruf selesai sudah dibuang,
     begitu juga terompet sintetisnya. Keduanya diganti satu gerakan kecil:
     hurufnya berubah jadi sage dan membesar sedikit, lalu centang kecil
     muncul pelan di pojok. Itu saja.
   - Bunyi mati sejak awal, dan yang tersisa hanya pengucapan kata.
   - Papan hurufnya bukan lagi 26 kotak diam. Tiap kotak menggambar huruf
     dengan goresan yang nanti dia telusuri, menyimpan sudah sampai mana
     dia mengerjakan huruf itu, dan berhenti bisa ditekan begitu selesai.
   ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
   Bentuk huruf besar, satu entri per huruf, sebagai daftar goresan SVG
   berurutan di dalam kotak 100x100. Urutan dan arahnya adalah urutan
   menulis — atas ke bawah, kiri ke kanan — dan hanya satu goresan yang
   tampil pada satu waktu, jadi cara menulis yang benar dijaga oleh apa
   yang ada di layar, bukan dengan pernah memberitahu dia bahwa dia salah.

   Bentuknya mengikuti huruf tanpa kait yang ada di papan (I polos, J polos)
   dan bukan alfabet berkait, karena itulah huruf yang selama ini dia lihat.
   ------------------------------------------------------------------ */
const GORESAN = {
  A:["M50 8 L18 92","M50 8 L82 92","M29 66 L71 66"],
  B:["M26 8 L26 92",
     "M26 8 L56 8 C74 8 74 46 56 46 L26 46",
     "M26 46 L60 46 C80 46 80 92 60 92 L26 92"],
  C:["M78 26 C68 10 32 8 22 34 C14 56 20 84 44 90 C60 94 72 84 78 74"],
  D:["M26 8 L26 92","M26 8 L52 8 C84 8 84 92 52 92 L26 92"],
  E:["M27 8 L27 92","M27 8 L79 8","M27 50 L71 50","M27 92 L79 92"],
  F:["M27 8 L27 92","M27 8 L79 8","M27 50 L71 50"],
  G:["M78 26 C68 10 32 8 22 34 C14 56 20 84 44 90 C64 95 78 84 78 62 L54 62"],
  H:["M24 8 L24 92","M76 8 L76 92","M24 50 L76 50"],
  I:["M50 8 L50 92"],
  J:["M66 8 L66 70 C66 88 48 94 36 86 C30 82 28 76 28 70"],
  K:["M26 8 L26 92","M74 8 L28 50","M28 50 L76 92"],
  L:["M28 8 L28 92 L78 92"],
  M:["M20 8 L20 92","M20 8 L50 62 L80 8 L80 92"],
  N:["M22 8 L22 92","M22 8 L78 92 L78 8"],
  O:["M50 8 C26 8 16 28 16 50 C16 72 26 92 50 92 C74 92 84 72 84 50 C84 28 74 8 50 8"],
  P:["M26 8 L26 92","M26 8 L58 8 C78 8 78 52 58 52 L26 52"],
  Q:["M50 8 C26 8 16 28 16 50 C16 72 26 92 50 92 C74 92 84 72 84 50 C84 28 74 8 50 8",
     "M60 68 L86 96"],
  R:["M26 8 L26 92","M26 8 L58 8 C78 8 78 50 58 50 L26 50","M48 50 L78 92"],
  S:["M76 24 C70 10 30 6 26 28 C23 44 44 48 56 52 C72 57 82 66 76 82 C70 96 32 94 24 78"],
  T:["M50 8 L50 92","M18 8 L82 8"],
  U:["M22 8 L22 60 C22 84 38 92 50 92 C62 92 78 84 78 60 L78 8"],
  V:["M20 8 L50 92 L80 8"],
  W:["M14 8 L34 92 L50 38 L66 92 L86 8"],
  X:["M22 8 L78 92","M78 8 L22 92"],
  Y:["M24 8 L50 50","M76 8 L50 50 L50 92"],
  Z:["M22 8 L78 8 L22 92 L78 92"],
};

const NS = "http://www.w3.org/2000/svg";
const papan   = el("papan");
const tulis   = el("tulis");
const foto    = el("foto");
const kataEl  = el("kata");
const panduan = el("panduan");
const coret   = el("coret");
const bidang  = el("bidang");
const centang = el("centang");
const bunyiBtn= el("bunyi");
const atur    = el("atur");

/* ---- Pengaturan, diingat antar kunjungan ---- */
/* Bunyi mati sejak awal. Sebagian anak terbantu mendengar katanya
   disebutkan, sebagian lagi justru terganggu, dan yang tahu bedanya adalah
   orang tuanya — bukan halaman ini. Jadi halaman ini diam sampai diminta. */
const CFG = {suara:"mati", mode:"huruf", bantu:"sedang"};

/* Seberapa dekat jarinya harus lewat dari titik pantau, dalam kotak 0-100.
   Sedang adalah bawaannya: cukup longgar supaya tidak pernah bikin jengkel,
   cukup ketat supaya yang dia gambar memang benar-benar hurufnya. */
const TOLERANSI = {mudah:26, sedang:17, sulit:11};

try { Object.assign(CFG, JSON.parse(localStorage.getItem("rere.tulis") || "{}")); }
catch (e) { /* mode penyamaran: bawaannya sudah cukup */ }

function simpanCfg(){
  try { localStorage.setItem("rere.tulis", JSON.stringify(CFG)); } catch (e) {}
}

/* ---- Huruf yang sudah dia tulis ---- */
/* Diingat antar kunjungan: babak itu miliknya untuk diselesaikan, dan
   menutup aplikasi tanpa sengaja tidak boleh mengambilnya kembali. */
let SELESAI = [];
const KUNCI_SELESAI = "rere.tulis.selesai";

try {
  const t = JSON.parse(localStorage.getItem(KUNCI_SELESAI) || "[]");
  if (Array.isArray(t)) SELESAI = t.filter(x => typeof x === "string");
} catch (e) {}

function sudahDitulis(letter){ return SELESAI.includes(letter); }

/* ---- Sudah sampai mana tiap huruf ---- */
/* Papan tidak lagi cuma tahu "sudah" dan "belum". Satu huruf memayungi
   beberapa kata, dan MAJU menyimpan berapa yang sudah dia tulis — itulah
   yang dipakai kotaknya untuk menggambar garis kemajuannya sendiri. Papan
   jadi peta pekerjaannya, bukan cuma daftar pilihan. */
let MAJU = {};
const KUNCI_MAJU = "rere.tulis.maju";

try {
  const m = JSON.parse(localStorage.getItem(KUNCI_MAJU) || "{}");
  if (m && typeof m === "object" && !Array.isArray(m)) MAJU = m;
} catch (e) {}

function simpanMaju(){
  try { localStorage.setItem(KUNCI_MAJU, JSON.stringify(MAJU)); } catch (e) {}
}

function catatMaju(letter, n){
  const total = kataDari(letter).length;
  /* Hanya boleh naik. Mengulang huruf yang sudah dia kerjakan tidak
     menurunkan garisnya kembali ke nol — itu akan terasa seperti hukuman
     karena ingin mencoba lagi. */
  const kini = Math.min(total, Math.max(MAJU[letter] || 0, n));
  if (kini === (MAJU[letter] || 0)) return;
  MAJU[letter] = kini;
  simpanMaju();
  catPapan();
}

function tandaiSelesai(letter){
  if (!sudahDitulis(letter)) SELESAI.push(letter);
  MAJU[letter] = kataDari(letter).length;
  /* Alfabet penuh mengulang dari kosong, jadi papan tidak pernah berakhir
     sebagai 26 kotak yang semuanya sudah tercentang. */
  if (SELESAI.length >= SEMUA.length) { SELESAI = []; MAJU = {}; }
  try { localStorage.setItem(KUNCI_SELESAI, JSON.stringify(SELESAI)); } catch (e) {}
  simpanMaju();
  catPapan();
}

/* Satu tempat yang menentukan rupa seluruh papan, dipanggil ulang tiap kali
   ada yang berubah. Kotaknya tidak pernah dibangun ulang — letaknya harus
   tetap sama persis di bawah jarinya, yang berubah cuma warnanya. */
function catPapan(){
  for (const b of papan.children) {
    const l = b.dataset.huruf;
    const total = Math.max(1, +b.dataset.total || 1);
    const usai = sudahDitulis(l);
    const n = usai ? total : Math.min(total, MAJU[l] || 0);

    /* Huruf yang sudah selesai tidak bisa ditekan lagi. Sebelumnya masih
       bisa, dengan alasan mengulang huruf yang sama itu caranya menenangkan
       diri — tapi yang terjadi di tangannya bukan itu: dia kembali ke huruf
       yang paling dikenalnya dan berhenti di situ, dan sisa alfabetnya
       tinggal. Centang saja ternyata tidak cukup untuk menahannya; kotak
       yang tidak menyahut ternyata cukup. Papan tidak pernah berakhir mati
       semua: alfabet yang penuh mengosongkan dirinya sendiri, dan 26 kotak
       itu kembali terbuka. */
    b.disabled = usai;
    b.classList.toggle("usai", usai);
    b.classList.toggle("jalan", !usai && n > 0);
    /* Huruf yang barusan dia kerjakan diberi tepi sage, jadi waktu kembali
       ke papan dia tidak perlu mencari lagi tadi sampai di mana. */
    b.classList.toggle("sedang", l === huruf);
    b.querySelector(".maju i").style.width = (n / total * 100) + "%";

    b.setAttribute("aria-label",
      l + ", " + (kataDari(l)[0] || "") +
      (usai ? ", sudah selesai" : n ? ", " + n + " dari " + total : ""));
  }
}

function susunPapan(){
  papan.textContent = "";
  for (const [letter] of SEMUA) {
    const b = document.createElement("button");
    b.className = "kotak " + COLOURS[letter];
    b.dataset.huruf = letter;
    b.dataset.total = kataDari(letter).length;
    if (letter === "Y") b.dataset.pos = "y";

    /* Hurufnya digambar dari goresan yang nanti ditelusuri, bukan diketik
       sebagai teks: yang dia lihat di kotak persis bentuk yang akan dia buat
       dengan jarinya, dan garis itu pula yang berubah jadi sage waktu
       hurufnya selesai. Kotaknya jadi contoh kecil dari pekerjaannya. */
    const bentuk = document.createElementNS(NS, "svg");
    bentuk.setAttribute("viewBox", "0 0 100 100");
    bentuk.setAttribute("class", "bentuk");
    bentuk.setAttribute("aria-hidden", "true");
    for (const d of (GORESAN[letter] || [])) bentuk.appendChild(jalur(d, ""));
    b.appendChild(bentuk);

    /* Garis tipis di kaki kotak: berapa kata di balik huruf ini yang sudah
       dia tulis. Baru muncul setelah dia mulai — 26 garis kosong hanya akan
       jadi 26 hal yang belum dikerjakan. */
    const bar = document.createElement("span");
    bar.className = "maju";
    bar.appendChild(document.createElement("i"));
    b.appendChild(bar);

    const tanda = document.createElementNS(NS, "svg");
    tanda.setAttribute("viewBox", "0 0 24 24");
    tanda.setAttribute("class", "tanda");
    tanda.setAttribute("aria-hidden", "true");
    tanda.appendChild(jalur("M4.5 12.5l5 5 10-11", ""));
    b.appendChild(tanda);

    /* Kotak yang sudah selesai dimatikan — lihat catatan di catPapan. */
    b.addEventListener("click", () => mulaiBabak(letter));
    papan.appendChild(b);
  }
  catPapan();
}

/* ---- Satu babak ---- */
let huruf = null, kataKini = "", antre = [], ai = 0, subjek = 0;

/* Dua kata per huruf, tidak lebih. Daftarnya sendiri bisa berisi dua belas
   kata untuk satu huruf, dan di mode huruf awal itu berarti menggambar K
   dua belas kali berturut-turut sebelum pindah — huruf yang sama, bentuk
   yang sama, dua belas kali. Yang datang setelah kali ketiga bukan lagi
   latihan, tapi kejenuhan, dan huruf yang dia lewati karena bosan tidak
   pernah dia kerjakan lagi. Dua kali cukup untuk mengulang, cukup pendek
   untuk selesai. Sisa katanya tidak hilang: masih dipakai di membaca dan
   di mengenal, di mana melihat banyak contoh memang gunanya. */
const BATAS_KATA = 2;

function kataDari(letter){
  const baris = SEMUA.find(([l]) => l === letter);
  return baris ? baris[1].slice(0, BATAS_KATA) : [];
}

/* Di sini fotonya cuma memberitahu benda apa yang sedang dia tulis, jadi
   satu kata memakai foto pertamanya dan bertahan di situ sepanjang babak. */
function pasangFoto(){
  const p = fotoDari(kataDari(huruf)[subjek] || "");
  foto.classList.remove("tampil");
  if (p.length) foto.src = p[0];
  else foto.removeAttribute("src");
}
foto.addEventListener("load",  () => foto.classList.add("tampil"));
foto.addEventListener("error", () => {
  foto.classList.remove("tampil");
  foto.removeAttribute("src");
});

/* Semua yang termasuk satu kata dalam barisan: katanya, huruf-huruf yang
   akan dia telusuri untuk kata itu, dan fotonya. */
function muatSubjek(){
  kataKini = (kataDari(huruf)[subjek] || "").toUpperCase();
  /* Huruf awal: cukup huruf di kotak yang dia tekan. Satu kata: setiap huruf
     dalam kata itu bergiliran, melewati spasi di "ES KRIM". */
  antre = CFG.mode === "kata"
    ? [...kataKini].map((c, i) => ({c, i})).filter(x => GORESAN[x.c])
    : [{c: huruf, i: 0}];
  ai = 0;
  /* Kalau tidak ada yang bisa ditelusuri dia akan terjebak di layar tanpa
     jalan keluar, dan langkahnya sekarang bisa sampai ke satu huruf sendiri
     tanpa dia menekannya — jadi mundur ke huruf di kotak. */
  if (!antre.length) antre = [{c: huruf, i: 0}];
  gambarKata();
  pasangFoto();
}

/* Urutan huruf yang diikuti langkah setelah satu barisan habis — urutan
   papan, Z kembali ke A, melewati huruf yang sudah dia tulis supaya
   langkahnya menawarkan huruf yang sama dengan yang ditawarkan papan. */
function hurufBerikut(letter){
  const i = SEMUA.findIndex(([l]) => l === letter);
  for (let k = 1; k <= SEMUA.length; k++) {
    const l = SEMUA[(i + k) % SEMUA.length][0];
    if (!sudahDitulis(l)) return l;
  }
  /* Tidak terjangkau selama satu-satunya pemanggil menandai hurufnya selesai
     lebih dulu, karena itu menyisakan satu yang belum atau mengosongkan
     daftarnya. Tetap ditulis supaya pemanggil baru dapat huruf, bukan
     undefined, yang akan membuat mulaiBabak tersedak. */
  return SEMUA[(i + 1) % SEMUA.length][0];
}

/* Babak berjalan sendiri: huruf berikutnya, lalu kata berikutnya, datang
   lewat pewaktu begitu dia menyelesaikan satu. Tidak ada yang menunggu dia
   menemukan tombol, karena membaca tombol dan memutuskan menekannya adalah
   keterampilan lain dari menulis yang sedang dilatih di sini. */
let pewaktu = null, pewaktuUcap = null;

/* Semua yang tertunda dari kata yang baru selesai, dibatalkan di satu tempat.
   Suaranya ikut di sini: kata yang disebutkan setengah detik setelah dia
   pergi mendarat di papan tanpa gambar untuk dikaitkan, dan itu lebih buruk
   daripada diam — penyebutan hanya mengajarkan sesuatu selama bendanya
   masih di layar. */
function batalkanLanjutan(){
  clearTimeout(pewaktu); pewaktu = null;
  clearTimeout(pewaktuUcap); pewaktuUcap = null;
  try { speechSynthesis.cancel(); } catch (e) {}
}

/* Begitu kata terakhir di balik satu huruf selesai ditulis, langkahnya
   berlanjut ke huruf berikutnya dan tidak berputar kembali ke kata pertama —
   jadi dia selalu menuju sesuatu yang baru, dan alfabetnya terlewati dengan
   bermain, bukan karena dia harus kembali dan memilih. */
function subjekBerikut(){
  const daftar = kataDari(huruf);
  catatMaju(huruf, subjek + 1);
  if (subjek + 1 < daftar.length) {
    subjek++;
    muatSubjek();
    muatHuruf();
    return;
  }
  /* Ditandai sebelum huruf berikutnya dipilih: yang ini harus keluar dari
     daftar, atau huruf yang tinggal sendirian di akhir babak akan menyerahkan
     giliran kembali ke dirinya sendiri. */
  tandaiSelesai(huruf);
  mulaiBabak(hurufBerikut(huruf));
}

/* Hapus coretannya dan ulangi benda ini dari huruf pertamanya. Kata yang
   sedang ditulis dan foto di atasnya tetap di tempat — ini membatalkan
   gambarnya, bukan babaknya, karena "ulangi" yang ikut mengganti katanya
   akan menghukum dia justru karena ingin mencoba lagi. */
function ulangiSubjek(){
  batalkanLanjutan();
  titikAkhir = null;
  ai = 0;
  muatHuruf();
}

function mulaiBabak(letter){
  batalkanLanjutan();
  huruf = letter;
  subjek = 0;
  muatSubjek();
  const baru = !tulis.classList.contains("on");
  tulis.classList.add("on");
  /* Hanya sekali per kunjungan ke layar menulis. Babak berjalan sendiri dari
     satu huruf ke huruf berikutnya lewat mulaiBabak, dan menitipkan entri
     riwayat di tiap pergantian berarti tombol kembali harus ditekan sebanyak
     huruf yang sudah dia lewati. */
  if (baru) jalan.titip();
  pasTataLetak();
  ukurCoret();
  muatHuruf();
  catPapan();
}

function gambarKata(){
  kataEl.textContent = "";
  [...kataKini].forEach((c, i) => {
    const s = document.createElement("span");
    s.textContent = c === " " ? " " : c;
    s.dataset.i = i;
    kataEl.appendChild(s);
  });
}

function tandaiKata(){
  const posisi = new Map(antre.map((q, n) => [q.i, n]));
  for (const s of kataEl.children) {
    const n = posisi.get(+s.dataset.i);
    s.className = (n === undefined || n < ai) ? "sudah" : n === ai ? "kini" : "nanti";
  }
}

/* ---- Mesin telusur ---- */
let goresan = [], gi = 0, titik = [], ti = 0, majuEl = null, titikAkhir = null;

function jalur(d, cls){
  const p = document.createElementNS(NS, "path");
  p.setAttribute("d", d);
  p.setAttribute("class", cls);
  return p;
}

function muatHuruf(){
  tandaiKata();
  hapusCoret();
  panduan.classList.remove("mekar");
  centang.classList.remove("tampil");
  goresan = GORESAN[antre[ai].c] || [];
  gi = 0;
  susunGoresan();
}

function susunGoresan(){
  panduan.textContent = "";
  for (let k = 0; k < gi; k++) panduan.appendChild(jalur(goresan[k], "lewat"));
  if (gi >= goresan.length) return;

  panduan.appendChild(jalur(goresan[gi], "jalur"));
  majuEl = jalur(goresan[gi], "maju");
  panduan.appendChild(majuEl);

  /* Titik pantau diambil dari jalurnya sendiri dan bukan ditaruh satu-satu
     dengan tangan, jadi toleransinya tetap satu angka dan bukan 26 kumpulan
     koordinat. */
  const panjang = majuEl.getTotalLength();
  majuEl.style.strokeDasharray = panjang;
  majuEl.style.strokeDashoffset = panjang;
  titik = [];
  for (let d = 0; d < panjang; d += 5) titik.push(majuEl.getPointAtLength(d));
  titik.push(majuEl.getPointAtLength(panjang));
  ti = 0;

  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("cx", titik[0].x);
  dot.setAttribute("cy", titik[0].y);
  dot.setAttribute("r", 6);
  dot.setAttribute("class", "mulai");
  panduan.appendChild(dot);
  aturDiam();
}

function keSvg(e){
  const r = bidang.getBoundingClientRect();
  return {x: (e.clientX - r.left) / r.width * 100,
          y: (e.clientY - r.top) / r.height * 100};
}

/* Jarak titik pantau ke ruas yang baru disapu jarinya, bukan ke tempat
   jarinya kebetulan berhenti — jadi goresan cepat yang mantap terhitung
   sama dengan goresan pelan yang hati-hati. */
function jarakRuas(p, a, b){
  const dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
  let t = l2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function maju(a, b){
  const tol = TOLERANSI[CFG.bantu] || TOLERANSI.sedang;
  let bergerak = false;
  while (ti < titik.length && jarakRuas(titik[ti], a, b) <= tol) { ti++; bergerak = true; }
  if (!bergerak) return;
  const panjang = majuEl.getTotalLength();
  majuEl.style.strokeDashoffset = panjang * (1 - ti / titik.length);
  if (ti >= titik.length) goresanSelesai();
}

function goresanSelesai(){
  gi++;
  if (gi < goresan.length) { susunGoresan(); return; }
  hurufSelesai();
}

function hurufSelesai(){
  hapusDiam();
  /* Garis wobbly-nya digantikan bentuk huruf yang bersih di bawahnya.
     Hadiahnya adalah melihat huruf yang baru saja dia buat, bukan bekas
     coretan waktu membuatnya. */
  hapusCoret();
  panduan.textContent = "";
  for (const d of goresan) panduan.appendChild(jalur(d, "jadi"));
  panduan.classList.add("mekar");
  centang.classList.add("tampil");
  ai++;
  tandaiKata();
  const terakhir = ai >= antre.length;
  batalkanLanjutan();
  rayakan(terakhir);
  /* Kata yang selesai bertahan cukup lama untuk penyebutannya mendarat — dia
     harus sempat mendengar "B, badak" selesai sebelum layarnya berganti di
     bawah tangannya — lalu kata berikutnya di balik huruf itu datang sendiri,
     dalam urutan yang sama dengan yang dijalani papan. Huruf yang selesai di
     tengah kata cukup menunggu mekarnya. */
  pewaktu = setTimeout(terakhir ? subjekBerikut : muatHuruf, terakhir ? 2200 : 900);
}

/* Mengangkat jari tidak pernah mengulang apa pun — dia lanjut dari titik
   pantau terjauh yang sudah dia capai. Tidak ada cara untuk gagal di sini. */
bidang.addEventListener("pointerdown", e => {
  if (!goresan.length || gi >= goresan.length) return;
  /* Penangkapan penunjuk membuat garisnya tetap jalan waktu jarinya
     melenceng keluar kotak. */
  try { bidang.setPointerCapture(e.pointerId); } catch (err) {}
  titikAkhir = keSvg(e);
  coretTurun(e);
  maju(titikAkhir, titikAkhir);
  aturDiam();
});
bidang.addEventListener("pointermove", e => {
  if (!titikAkhir) return;
  const p = keSvg(e);
  coretKe(e);
  maju(titikAkhir, p);
  titikAkhir = p;
  aturDiam();
});
for (const ev of ["pointerup", "pointercancel", "pointerleave"])
  bidang.addEventListener(ev, () => { titikAkhir = null; coretSebelum = null; });

/* ---- Garisnya sendiri, di kanvas di atas panduan ---- */
let coretSebelum = null;

/* Bidang telusur harus benar-benar persegi — viewBox SVG-nya 100x100 dan
   hurufnya akan miring kalau tidak — dan di layar pendek dia tidak boleh
   jadi yang dikorbankan. Jadi persegi itu mengambil jatahnya dari ruang
   kosong lebih dulu dan foto mengambil sisanya, bukan sebaliknya. Diukur,
   bukan diserahkan ke CSS: max-height persen dihitung terhadap tinggi flex
   yang dianggap peramban belum pasti, dan diam-diam tidak melakukan apa-apa. */
const JATAH_PERSEGI = .62;

function pasTataLetak(){
  const box = tulis.getBoundingClientRect();
  if (!box.height) return;
  const cs = getComputedStyle(tulis);
  const px = p => parseFloat(cs[p]) || 0;
  const dalam = box.width - px("paddingLeft") - px("paddingRight");
  const sisa = box.height - px("paddingTop") - px("paddingBottom")
    - px("rowGap") * (tulis.children.length - 1)
    - el("atas").offsetHeight - kataEl.offsetHeight;

  const s = Math.max(0, Math.floor(Math.min(dalam, sisa * JATAH_PERSEGI)));
  foto.style.height = Math.max(0, Math.floor(sisa - s)) + "px";
  bidang.style.width = s + "px";
  bidang.style.height = s + "px";
}

function ctxCoret(){ return coret.getContext("2d"); }

function ukurCoret(){
  const r = bidang.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  if (!r.width) return;
  coret.width = r.width * dpr;
  coret.height = r.height * dpr;
  const c = ctxCoret();
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.lineCap = "round"; c.lineJoin = "round";
  /* Warnanya diambil dari stylesheet dan bukan ditulis ulang di sini, supaya
     palet tetap tinggal di satu tempat. */
  const warna = getComputedStyle(document.documentElement)
    .getPropertyValue("--biru").trim() || "#89a7bb";
  c.strokeStyle = warna; c.fillStyle = warna;
  c.lineWidth = r.width * 0.07;
}

function hapusCoret(){
  const c = ctxCoret();
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, coret.width, coret.height);
  c.restore();
  coretSebelum = null;
}

function di(e){
  const r = bidang.getBoundingClientRect();
  return {x: e.clientX - r.left, y: e.clientY - r.top};
}

function coretTurun(e){
  const p = di(e), c = ctxCoret();
  c.beginPath();
  c.arc(p.x, p.y, c.lineWidth / 2, 0, Math.PI * 2);
  c.fill();
  coretSebelum = p;
}

function coretKe(e){
  if (!coretSebelum) return;
  const p = di(e), c = ctxCoret();
  c.beginPath();
  c.moveTo(coretSebelum.x, coretSebelum.y);
  c.lineTo(p.x, p.y);
  c.stroke();
  coretSebelum = p;
}

/* ---- Setelah lama diam, tunjukkan jalannya. Tidak pernah menghalangi. ---- */
/* Ini satu-satunya gerakan di halaman ini yang tidak dia mulai, dan itu
   disengaja: titik yang berjalan menyusuri jalurnya mengajarkan arah, yang
   tidak bisa dilakukan titik diam. Tapi dia baru datang setelah dua belas
   detik tidak ada apa-apa — jadi hanya muncul waktu dia memang tersangkut —
   berjalan pelan, samar, dan hilang begitu jarinya menyentuh layar. Kalau
   sistemnya minta gerak dikurangi, dia tidak muncul sama sekali. */
let jamDiam = 0, raf = 0, bisikEl = null;

const KURANGI_GERAK =
  matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

function hapusDiam(){
  clearTimeout(jamDiam);
  cancelAnimationFrame(raf);
  raf = 0;
  if (bisikEl) { bisikEl.remove(); bisikEl = null; }
}

function aturDiam(){
  hapusDiam();
  if (KURANGI_GERAK) return;
  jamDiam = setTimeout(bisik, 12000);
}

function bisik(){
  if (!majuEl || ti >= titik.length) return;
  bisikEl = document.createElementNS(NS, "circle");
  bisikEl.setAttribute("r", 7);
  bisikEl.setAttribute("class", "bisik");
  panduan.appendChild(bisikEl);
  const panjang = majuEl.getTotalLength(), dari = panjang * ti / titik.length;
  let t0 = null;
  const langkah = ts => {
    if (t0 === null) t0 = ts;
    const k = ((ts - t0) / 2600) % 1;
    const p = majuEl.getPointAtLength(dari + (panjang - dari) * k);
    bisikEl.setAttribute("cx", p.x);
    bisikEl.setAttribute("cy", p.y);
    raf = requestAnimationFrame(langkah);
  };
  raf = requestAnimationFrame(langkah);
}

/* ---- Perayaan ---- */
/* Dulu di sini ada seratus sepuluh kertas warna beterbangan dan terompet
   empat nada dari osilator. Sekarang tidak ada keduanya. Yang tersisa: garis
   huruf berubah jadi sage, membesar sedikit sekali, centang kecil muncul
   pelan di pojok — semuanya sudah dikerjakan hurufSelesai — dan, hanya kalau
   bunyinya dinyalakan, katanya disebutkan. */

/* Huruf yang dia tulis lalu kata pemiliknya — "B, badak" — karena pasangan
   itulah yang sedang diajarkan, dan pasangan itu pula yang harus bisa dia
   ucapkan. Pelan, dan dengan hurufnya dipisah koma, supaya keduanya keluar
   sebagai dua bunyi yang bisa ditiru, bukan satu bunyi yang berdempetan. */
function ucapKata(){
  if (CFG.suara !== "nyala") return;
  if (!("speechSynthesis" in window)) return;
  const kata = (kataKini || "").toLowerCase();
  if (!kata || !huruf) return;
  try {
    const u = new SpeechSynthesisUtterance(huruf + ", " + kata);
    u.lang = "id-ID";
    u.rate = .75;
    /* Nada biasa, bukan cempreng. Suara tinggi yang ceria justru lebih sulit
       ditiru dan buat sebagian telinga terasa menusuk. */
    u.pitch = 1;
    speechSynthesis.speak(u);
  } catch (e) {}
}

function rayakan(terakhir){
  if (terakhir) pewaktuUcap = setTimeout(ucapKata, 350);
}

/* ---- Tombol ---- */
el("ulangi").addEventListener("click", ulangiSubjek);

function tutupTulis(){
  hapusDiam();
  /* Tanpa ini, babak yang dia tinggalkan di tengah perayaan akan memuat kata
     berikutnya ke layar yang sudah tidak dia lihat, dan papan akan
     menampilkan satu huruf sementara layar menulis memegang huruf lain. */
  batalkanLanjutan();
  tulis.classList.remove("on");
  foto.classList.remove("tampil");
  catPapan();
}

const jalan = riwayat(tutupTulis, () => tulis.classList.contains("on"));
el("pulang").addEventListener("click", () => jalan.mundur());

const IKON_SUARA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
  ' stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z"/>';

/* Digambar dan bukan emoji: rupa emoji berbeda-beda antar Android dan glif
   pengeras suara tidak ada sama sekali di sebagian, yang menyisakan tombol
   kosong. */
function catBunyi(){
  const on = CFG.suara === "nyala";
  bunyiBtn.classList.toggle("mati", !on);
  bunyiBtn.setAttribute("aria-label", on ? "Matikan suara" : "Nyalakan suara");
  bunyiBtn.setAttribute("aria-pressed", String(on));
  bunyiBtn.innerHTML = IKON_SUARA +
    (on ? '<path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>'
        : '<path d="M16 9.5l5 5M21 9.5l-5 5"/>') + '</svg>';
}

bunyiBtn.addEventListener("click", () => {
  CFG.suara = CFG.suara === "nyala" ? "mati" : "nyala";
  if (CFG.suara === "mati") { try { speechSynthesis.cancel(); } catch (e) {} }
  simpanCfg();
  catCfg();
});

function catCfg(){
  for (const pilih of atur.querySelectorAll(".pilih"))
    for (const b of pilih.children)
      b.classList.toggle("on", CFG[pilih.dataset.kunci] === b.dataset.v);
  catBunyi();
}

for (const pilih of atur.querySelectorAll(".pilih"))
  pilih.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    CFG[pilih.dataset.kunci] = b.dataset.v;
    simpanCfg();
    catCfg();
  });

el("gir").addEventListener("click", () => { catCfg(); atur.classList.add("on"); });
el("tutupatur").addEventListener("click", () => atur.classList.remove("on"));

addEventListener("resize", () => {
  if (!tulis.classList.contains("on")) return;
  /* Mengubah ukuran kanvas menghapus isinya, jadi memutar layar menghilangkan
     coretan yang sudah dia buat — tapi bukan kemajuannya, yang tersimpan di
     ti, bukan di pikselnya. */
  pasTataLetak();
  ukurCoret();
});

susunPapan();
catBunyi();
