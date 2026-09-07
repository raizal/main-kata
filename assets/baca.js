/* ------------------------------------------------------------------
   Belajar membaca.

   Tiga tingkat, satu keputusan di tiap tingkat:

     1. Papan  — pilih huruf.
     2. Daftar — semua benda dan hewan yang berawalan huruf itu, digelar
                 sebagai kartu bergambar. Dari sini dia melihat sekaligus
                 bahwa "A" bukan satu benda, tapi satu keluarga bunyi.
     3. Rinci  — satu benda: fotonya, katanya dipecah jadi suku kata yang
                 diketuk satu per satu, dan di bawahnya tangga bunyi —
                 satu baris per suku kata, satu bentuk bibir per bunyi,
                 dalam urutan mulutnya bergerak waktu kata itu diucapkan.

   Tidak ada jawaban salah di sini karena tidak ada yang perlu ditebak:
   yang dilatih adalah menghubungkan bentuk tertulis ke bunyinya.

   Halaman ini tidak menanyakan tema. Membaca bukan soal golongan katanya,
   jadi daftarnya gabungan benda dan hewan — lihat SEMUA di data.js.
   ------------------------------------------------------------------ */

const papan      = el("papan");
const daftar     = el("daftar");
const rinci      = el("rinci");
const kartuEl    = el("kartu");
const judulHuruf = el("judulHuruf");
const judulKata  = el("judulKata");
const foto       = el("foto");
const sukuEl     = el("suku");
const tanggaEl   = el("tangga");
const petunjuk   = el("petunjuk");
const suaraBtn   = el("suara");
const zoom       = el("zoom");
const judulBunyi = el("judulBunyi");
const mulutBesar = el("mulutBesar");
const petunjukBesar = el("petunjukBesar");

let huruf = null, kata = "", potong = [], sampai = 0;

/* Bunyi yang sedang disorot di tangga, sebagai [baris, kolom]. Selalu ada
   satu yang tersorot, jadi barisan petunjuk di bawah tangga tidak pernah
   kosong dan tidak pernah berpindah tempat. */
let sorot = [0, 0];

/* ---- Suara, mati sejak awal ---- */
/* Bunyi tidak pernah menyala sendiri. Sebagian anak terbantu mendengar
   suku katanya diucapkan, sebagian lagi justru terganggu, dan yang tahu
   bedanya adalah orang tuanya — bukan halaman ini. Jadi pilihannya ada di
   tangan mereka dan diingat antar kunjungan. */
let bunyi = false;
try { bunyi = localStorage.getItem("rere.baca.suara") === "on"; } catch (e) {}

const IKON_SUARA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
  ' stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z"/>';

/* Tombolnya ikut hilang kalau ponselnya tidak punya suara Indonesia:
   tombol yang bisa dinyalakan tapi tidak pernah bersuara cuma bikin orang
   tuanya mengira ada yang rusak. */
function catSuara(){
  const bisa = bolehUcap();
  const on = bunyi && bisa;
  suaraBtn.disabled = !bisa;
  suaraBtn.classList.toggle("mati", !on);
  suaraBtn.setAttribute("aria-label",
    !bisa ? "Suara Indonesia belum terpasang di ponsel ini"
          : on ? "Matikan suara" : "Nyalakan suara");
  suaraBtn.setAttribute("aria-pressed", String(on));
  suaraBtn.innerHTML = IKON_SUARA +
    (on ? '<path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>'
        : '<path d="M16 9.5l5 5M21 9.5l-5 5"/>') + '</svg>';
}

/* Daftar suara ponsel kadang baru datang beberapa saat setelah halaman
   terbuka, jadi tombolnya dicat ulang begitu jawabannya pasti. */
addEventListener("suaraberubah", catSuara);

/* Pengucapannya sendiri ada di ucapID (assets/app.js), bersama penjaga
   bahasanya: kalau ponselnya tidak punya suara Indonesia, halaman ini
   memilih diam daripada mengajarkan bunyi Inggris. */
function ucap(teks){
  if (!bunyi) return;
  ucapID(teks);
}

suaraBtn.addEventListener("click", () => {
  bunyi = !bunyi;
  try { localStorage.setItem("rere.baca.suara", bunyi ? "on" : "off"); } catch (e) {}
  if (!bunyi) { try { speechSynthesis.cancel(); } catch (e) {} }
  catSuara();
});

/* ------------------------------------------------------------------
   Berpindah tingkat.

   Tingkat disimpan sebagai satu angka dan seluruh tampilan diturunkan
   darinya, jadi tidak mungkin ada keadaan di mana daftar terbuka tapi
   papan ikut terlihat.

   Tombol kembali bawaan ponsel harus turun satu tingkat tiap ditekan,
   bukan langsung keluar dari halaman — jadi tiap kali naik tingkat, satu
   entri riwayat dititipkan. Kalau pushState ditolak (halaman dibuka lewat
   file:// di sebagian peramban), hitungannya tidak pernah naik dan tombol
   Kembali di layar menutup tingkatnya langsung.
   ------------------------------------------------------------------ */
let tingkat = 0, ditumpuk = 0;

function keTingkat(n){
  tingkat = n < 0 ? 0 : n > 3 ? 3 : n;
  daftar.classList.toggle("on", tingkat >= 1);
  rinci.classList.toggle("on", tingkat >= 2);
  zoom.classList.toggle("on", tingkat >= 3);
  if (tingkat < 2) {
    try { speechSynthesis.cancel(); } catch (e) {}
    foto.classList.remove("tampil");
  }
}

function titip(){
  try { history.pushState({tingkat}, ""); ditumpuk++; } catch (e) {}
}

function mundur(){
  if (ditumpuk) history.back();
  else keTingkat(tingkat - 1);
}

addEventListener("popstate", () => {
  if (ditumpuk) ditumpuk--;
  if (tingkat > 0) keTingkat(tingkat - 1);
});

/* ---- Tingkat 1: papan huruf ---- */
function daftarKata(letter){
  const baris = SEMUA.find(([l]) => l === letter);
  return baris ? baris[1] : [];
}

function susunPapan(){
  papan.textContent = "";
  for (const [letter, kataKata] of SEMUA) {
    const b = document.createElement("button");
    b.className = "kotak " + COLOURS[letter];
    b.textContent = letter;
    b.setAttribute("aria-label", letter + ", " + kataKata.length + " kata");
    if (letter === "Y") b.dataset.pos = "y";
    b.addEventListener("click", () => bukaDaftar(letter));
    papan.appendChild(b);
  }
}

/* ---- Tingkat 2: kartu benda dan hewan berawalan huruf itu ---- */
/* Bukan <button>. Isi tombol di Chrome selalu dibungkus kotak tak bernama
   yang menengahkan anaknya dan mengabaikan display kartunya, jadi bingkai
   foto dan namanya tidak pernah tersusun jadi dua baris rapi. Div dengan
   peran tombol menata seperti blok biasa, dan perannya dikembalikan lewat
   role, tabindex, dan tombol Enter/Spasi. */
function buatKartu(word){
  const b = document.createElement("div");
  b.className = "kartu";
  b.setAttribute("role", "button");
  b.setAttribute("tabindex", "0");
  b.setAttribute("aria-label", word);
  b.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    bukaRinci(word);
  });

  const bingkai = document.createElement("span");
  bingkai.className = "bingkai";
  const p = fotoDari(word);
  if (p.length) {
    const img = document.createElement("img");
    /* Dimuat malas: satu huruf bisa punya tiga belas kartu, dan menarik
       tiga belas foto sekaligus membuat yang pertama pun datang terlambat.
       Yang di layar duluan yang dimuat duluan. */
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = "";
    img.addEventListener("load", () => img.classList.add("tampil"));
    /* Jangan pernah menampilkan ikon gambar rusak — kartunya diam-diam
       mundur jadi bidang krem dengan namanya saja, karena tanda silang
       merah adalah hal terakhir yang perlu dia lihat. */
    img.addEventListener("error", () => img.remove());
    img.src = p[0];
    bingkai.appendChild(img);
  }

  const nama = document.createElement("span");
  nama.className = "nama";
  nama.textContent = word;

  b.appendChild(bingkai);
  b.appendChild(nama);
  b.addEventListener("click", () => bukaRinci(word));
  return b;
}

function bukaDaftar(letter){
  huruf = letter;
  judulHuruf.textContent = "";
  const em = document.createElement("em");
  em.textContent = letter;
  judulHuruf.appendChild(document.createTextNode("Huruf "));
  judulHuruf.appendChild(em);

  kartuEl.textContent = "";
  for (const word of daftarKata(letter)) kartuEl.appendChild(buatKartu(word));
  kartuEl.scrollTop = 0;

  keTingkat(1);
  titip();
}

/* ------------------------------------------------------------------
   Tangga bunyi.

   Tiap suku kata dapat satu baris, tiap bunyi dalam suku kata itu dapat
   satu mulut, digelar kiri ke kanan persis seperti urutan dia
   mengucapkannya: b - u, lalu k - u.

   Barisnya tidak diredupkan seperti kepingan suku kata di atasnya. Kepingan
   itu memang berjenjang — ada yang belum boleh disentuh. Tangga ini bukan
   latihan, tapi acuan: dia dan orang tuanya boleh menyentuh bunyi mana pun,
   kapan pun, sebanyak yang dia mau. Yang ditandai cuma baris yang sedang
   dieja, supaya matanya tahu harus melihat ke mana.
   ------------------------------------------------------------------ */
function catTangga(){
  const barisAktif = Math.min(sampai, potong.length - 1);
  [...tanggaEl.children].forEach((baris, i) => {
    baris.classList.toggle("kini", i === barisAktif);
    [...baris.querySelectorAll(".bunyi")].forEach((b, j) => {
      b.classList.toggle("dipilih", i === sorot[0] && j === sorot[1]);
    });
  });
}

/* ------------------------------------------------------------------
   Satu bunyi diperbesar.

   Di tangga, mulutnya sebesar ibu jari — cukup untuk melihat urutannya,
   belum cukup untuk ditiru. Bedanya bibir bulat dan bibir maju cuma
   beberapa piksel di ukuran itu, dan yang harus dia tiru justru bedanya.
   Jadi satu ketukan membesarkan satu mulut sampai selebar layar.

   Menutupnya: ketuk di mana saja. Tidak ada tombol silang kecil yang harus
   dicari — seluruh layar adalah jalan keluarnya, sama seperti seluruh layar
   tadi adalah jalan masuknya.
   ------------------------------------------------------------------ */
function bukaZoom(bunyi){
  judulBunyi.textContent = "";
  const em = document.createElement("em");
  em.textContent = String(bunyi).toUpperCase();
  judulBunyi.appendChild(document.createTextNode("Bunyi "));
  judulBunyi.appendChild(em);

  mulutBesar.innerHTML = gambarBibir(bunyi, true);
  petunjukBesar.textContent = caraBaca(bunyi);
  keTingkat(3);
  titip();
}

function pilihBunyi(i, j, bunyi){
  sorot = [i, j];
  petunjuk.textContent = caraBaca(bunyi);
  catTangga();
  ucap(bunyi);
  bukaZoom(bunyi);
}

function susunTangga(){
  tanggaEl.textContent = "";
  potong.forEach((sukuKata, i) => {
    const baris = document.createElement("div");
    baris.className = "anak";

    const label = document.createElement("span");
    label.className = "labelSuku";
    label.textContent = sukuKata;
    baris.appendChild(label);

    const deret = document.createElement("div");
    deret.className = "deret";
    fonem(sukuKata).forEach((bunyi, j) => {
      const b = document.createElement("button");
      b.className = "bunyi";
      b.setAttribute("aria-label", "Bunyi " + bunyi + ", " + caraBaca(bunyi));
      b.innerHTML = gambarBibir(bunyi);
      const nama = document.createElement("span");
      nama.className = "namaBunyi";
      nama.textContent = bunyi;
      b.appendChild(nama);
      b.addEventListener("click", () => pilihBunyi(i, j, bunyi));
      deret.appendChild(b);
    });
    baris.appendChild(deret);
    tanggaEl.appendChild(baris);
  });
}

/* Bunyi pertama dari suku kata yang sedang gilirannya. Sorotnya pindah
   sendiri mengikuti ketukan, jadi tanpa menyentuh tangga pun dia sudah
   dituntun bunyi demi bunyi. */
function sorotAwalBaris(i){
  const bunyi = fonem(potong[i] || "")[0];
  if (!bunyi) return;
  sorot = [i, 0];
  petunjuk.textContent = caraBaca(bunyi);
  catTangga();
}

/* ---- Tingkat 3: satu benda ---- */
function catKeping(){
  [...sukuEl.children].forEach((c, i) => {
    c.className = "keping " + (i < sampai ? "sudah" : i === sampai ? "giliran" : "nanti");
  });
}

function ketukKeping(i){
  /* Hanya kepingan berikutnya yang menanggapi. Menyentuh yang lain tidak
     menghasilkan apa-apa — tanpa getar, tanpa warna merah, tanpa bunyi.
     Diam adalah tanggapan yang paling tenang untuk "belum sekarang". */
  if (i !== sampai) return;
  sampai++;
  catKeping();
  /* Sorotnya maju ke suku kata berikutnya. Kalau kata itu sudah habis,
     sorotnya tinggal di bunyi terakhir — tidak melompat balik ke awal,
     karena lompatan yang tidak dia minta terbaca sebagai halaman mengulang
     sendiri. */
  sorotAwalBaris(Math.min(sampai, potong.length - 1));
  /* Kepingan terakhir menyerahkan giliran bicara ke kata utuhnya: dua bunyi
     berurutan untuk satu ketukan justru menutupi yang penting. */
  ucap(sampai >= potong.length ? kata : potong[i]);
}

function bukaRinci(word){
  kata = word;
  potong = suku(word);
  sampai = 0;

  judulKata.textContent = "";
  const em = document.createElement("em");
  em.textContent = word.slice(0, 1).toUpperCase();
  judulKata.appendChild(em);
  judulKata.appendChild(document.createTextNode(word.slice(1)));

  /* Satu kata, satu foto. Fotonya di sini penanda kata mana yang sedang
     dieja, dan berganti rupa di tengah pengejaan malah memecah perhatian. */
  const p = fotoDari(word);
  foto.classList.remove("tampil");
  if (p.length) foto.src = p[0];
  else foto.removeAttribute("src");

  sukuEl.textContent = "";
  potong.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "keping nanti";
    b.textContent = s;
    b.setAttribute("aria-label", "Suku kata " + s);
    b.addEventListener("click", () => ketukKeping(i));
    sukuEl.appendChild(b);
  });
  catKeping();

  susunTangga();
  sorotAwalBaris(0);

  keTingkat(2);
  titip();
}

foto.addEventListener("load",  () => foto.classList.add("tampil"));
foto.addEventListener("error", () => {
  foto.classList.remove("tampil");
  foto.removeAttribute("src");
});

for (const id of ["kembali1", "kembali2", "kembali3"])
  el(id).addEventListener("click", e => { e.stopPropagation(); mundur(); });

/* Seluruh layar zoom menutup dirinya sendiri. Tombol kembali di pojok tetap
   ada untuk yang mencarinya, tapi tidak wajib ditemukan dulu. */
zoom.addEventListener("click", mundur);

susunPapan();
catSuara();

/* Foto pertama tiap huruf dimuat lebih dulu, jadi kartu pertama di daftar
   mana pun tidak pernah berujung bidang kosong sambil menunggu jaringan. */
addEventListener("load", () => {
  for (const [, kataKata] of SEMUA) hangatkan(fotoDari(kataKata[0])[0]);
});
