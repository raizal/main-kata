/* ------------------------------------------------------------------
   Batas main, berlaku di semua halaman.

   Aplikasi ini sengaja dibuat tanpa ujung: tidak ada nilai, tidak ada
   nyawa, tidak ada layar "tamat". Itu bagus untuk belajar dan buruk untuk
   berhenti — tanpa satu pun penanda, sepuluh menit dan satu jam terasa
   sama saja dari dalam. Jadi berhentinya datang dari luar permainan.

   Sepuluh menit main, lalu satu soal hitungan kecil. Benar, lanjut sepuluh
   menit lagi. Salah, mainnya sudah untuk sekarang.

   Soal itu memang di luar jangkauannya hari ini, dan itu bukan kelalaian:
   pintunya untuk orang tua. Yang penting, yang menghentikan adalah
   halamannya sendiri — bukan tangan yang tiba-tiba mengambil ponsel dari
   genggamannya di tengah huruf yang belum selesai.

   Berhentinya sendiri punya dua aturan, dan keduanya lebih penting daripada
   ketepatan menitnya:

   - Selalu ada aba-aba satu menit sebelumnya, diucapkan dan bukan cuma
     ditulis, karena yang harus berhenti belum tentu bisa membaca. Peralihan
     yang datang tanpa peringatan adalah pemicu yang paling bisa dihindari.
   - Tidak pernah memotong pekerjaan yang sedang jalan. Halaman yang sedang
     sibuk memasang window.batasTunda, dan batasnya menunggu sampai satu
     huruf tuntas — paling lama satu setengah menit, supaya menunggu tidak
     berubah jadi tidak pernah berhenti.

   Hitungannya disimpan di localStorage dan bukan di memori halaman: pindah
   dari menulis ke hewan berarti halaman baru, dan hitungan yang hidup di
   satu halaman akan kembali ke nol tiap kali dia berpindah kegiatan.
   ------------------------------------------------------------------ */
(function(){

/* Sepuluh menit main, aba-aba di menit kesembilan. Istirahatnya lima belas:
   itu juga yang memutus satu sesi dari sesi berikutnya — ponsel yang ditaruh
   seperempat jam berarti dia sudah berhenti, dan waktunya dihitung dari nol
   lagi. */
const BATAS      = 10 * 60 * 1000;
const ABA        = 60 * 1000;
const ISTIRAHAT  = 15 * 60 * 1000;
const TUNDA_MAKS = 90 * 1000;
const DETAK      = 1000;
const NAMA       = "rere.waktu";

const sesi = {aktif: 0, nadi: 0, kunci: 0, aba: 0};
try { Object.assign(sesi, JSON.parse(localStorage.getItem(NAMA) || "{}")); }
catch (e) { /* mode penyamaran: mulai dari nol, batasnya tetap berlaku */ }

function simpan(){
  try { localStorage.setItem(NAMA, JSON.stringify(sesi)); } catch (e) {}
}

/* ---- Layarnya dibuat dari sini ---- */
/* Bukan ditulis di kelima berkas HTML: satu potongan yang sama di lima
   tempat adalah lima tempat yang harus diubah berbarengan, dan yang
   ketinggalan satu jadi halaman tanpa batas. */
const lapis = document.createElement("div");
lapis.id = "batas";
lapis.setAttribute("role", "dialog");
lapis.setAttribute("aria-modal", "true");
lapis.innerHTML =
  '<div class="isi">' +
    '<p class="pesan"></p>' +
    '<p class="soal"></p>' +
    '<div class="angka"></div>' +
  '</div>' +
  '<button class="pintu" type="button"' +
  ' aria-label="Pintu orang tua, tahan untuk membuka"></button>';

const pesanEl = lapis.querySelector(".pesan");
const soalEl  = lapis.querySelector(".soal");
const angkaEl = lapis.querySelector(".angka");
const pintuEl = lapis.querySelector(".pintu");

/* Aba-aba satu menit sebelum berhenti. Sebaris di kaki layar, tidak
   menghalangi apa pun dan tidak bisa dipencet — dia bukan sesuatu yang
   harus dia jawab, cuma sesuatu yang harus dia dengar dan lihat. */
const abaEl = document.createElement("div");
abaEl.id = "aba";
abaEl.setAttribute("aria-live", "polite");
abaEl.textContent = "Sebentar lagi mainnya selesai ya";

/* Papan angka bergaya tombol telepon, 1-9 lalu 0 di tengah bawah. Tiga
   kolom, bukan lima: di layar 360px lima kolom memaksa tombolnya turun ke
   50px, dan tombol di bawah 64px adalah tombol yang meleset. */
for (const n of [1,2,3,4,5,6,7,8,9,0]) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = String(n);
  b.dataset.n = String(n);
  if (n === 0) b.className = "nol";
  angkaEl.appendChild(b);
}

let jawaban = 0, terjawab = false, tundaSejak = 0;

function pasang(){
  if (!lapis.parentNode) document.body.appendChild(lapis);
}

/* ---- Aba-aba ---- */
function pasangAba(bicara){
  if (!abaEl.parentNode) document.body.appendChild(abaEl);
  if (bicara) ucapID("Sebentar lagi ya, mainnya mau selesai.", .85);
}

function lepasAba(){
  abaEl.remove();
}

/* ---- Soalnya ---- */
/* Jawabannya selalu satu angka, jadi satu ketukan sudah menjawab: dua
   ketukan berarti ada yang harus dihapus, dan tombol hapus adalah satu
   tombol lagi yang bisa salah dipencet. */
function soalBaru(){
  const tambah = Math.random() < .5;
  let a, b;
  if (tambah) {
    a = 1 + Math.floor(Math.random() * 8);
    b = 1 + Math.floor(Math.random() * (9 - a));
    jawaban = a + b;
    return a + " + " + b;
  }
  a = 2 + Math.floor(Math.random() * 8);
  b = 1 + Math.floor(Math.random() * (a - 1));
  jawaban = a - b;
  return a + " − " + b;
}

function tanya(){
  terjawab = false;
  lepasAba();
  pesanEl.textContent = "Sudah sepuluh menit mainnya.";
  soalEl.textContent = soalBaru() + " = ?";
  lapis.className = "tanya";
  pasang();
}

/* ---- Berhenti ---- */
/* Diucapkan, bukan cuma ditulis: yang harus berhenti belum tentu bisa
   membaca kalimatnya, tapi suara namanya sendiri selalu sampai. Ini
   satu-satunya suara di seluruh aplikasi yang tidak menunggu diminta —
   karena kalimat inilah yang justru harus terdengar. Kalau ponselnya tidak
   punya suara Indonesia, ucapID memilih diam; tulisannya tetap ada. */
function berhenti(){
  lepasAba();
  pesanEl.textContent = "Rere,\nmain hape nya sudah ya.\nNanti lagi :)";
  soalEl.textContent = "";
  lapis.className = "usai";
  pasang();
  ucapID("Rere, main hape nya sudah ya. Nanti lagi.", .8);
}

function kunciSekarang(){
  sesi.kunci = Date.now();
  sesi.aktif = 0;
  sesi.aba = 0;
  simpan();
  berhenti();
}

function lanjut(){
  /* Sepuluh menit berikutnya dimulai dari sini, bukan dari saat soalnya
     muncul: waktu yang habis untuk menjawab bukan waktu main. */
  sesi.aktif = 0;
  sesi.aba = 0;
  sesi.kunci = 0;
  sesi.nadi = Date.now();
  tundaSejak = 0;
  simpan();
  lapis.className = "";
  lapis.remove();
}

angkaEl.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b || terjawab || lapis.className !== "tanya") return;
  terjawab = true;
  if (+b.dataset.n === jawaban) lanjut();
  else kunciSekarang();
});

/* Pintu orang tua di pojok layar berhenti: ditahan dua detik, lalu soal yang
   sama. Ada supaya orang tua bisa mengembalikan ponselnya lebih awal — di
   perjalanan panjang, di ruang tunggu — tanpa harus menunggu lima belas
   menit. Ditahan dan bukan diketuk, dan tanpa rupa sama sekali, supaya bukan
   dia yang menemukannya. */
let jamPintu = 0;
pintuEl.addEventListener("pointerdown", () => {
  clearTimeout(jamPintu);
  jamPintu = setTimeout(tanya, 2000);
});
for (const ev of ["pointerup", "pointerleave", "pointercancel"])
  pintuEl.addEventListener(ev, () => clearTimeout(jamPintu));

/* ---- Menunggu pekerjaan yang sedang jalan ---- */
/* Halaman yang punya sesuatu yang tidak boleh dipotong memasang
   window.batasTunda; yang tidak, tidak perlu tahu berkas ini ada. */
function tundaDulu(){
  try { return typeof batasTunda === "function" && !!batasTunda(); }
  catch (e) { return false; }
}

/* ---- Detaknya ---- */
/* Selisih waktu yang dihitung, bukan jumlah detak: peramban memperlambat
   pewaktu di halaman yang tidak terlihat, dan sepuluh menit yang dihitung
   dari detak akan jadi dua puluh menit di layar. Selisih yang lebih panjang
   dari satu istirahat berarti ponselnya ditaruh — sesinya habis, hitungannya
   mulai lagi dari nol. */
function detak(){
  const kini = Date.now();
  const lalu = sesi.nadi || kini;
  const selang = kini - lalu;
  sesi.nadi = kini;

  if (selang > ISTIRAHAT) { sesi.aktif = 0; sesi.kunci = 0; sesi.aba = 0; }
  else if (!document.hidden && lapis.className === "")
    sesi.aktif += Math.min(selang, DETAK * 2);

  simpan();

  if (sesi.kunci) { if (lapis.className === "") berhenti(); return; }
  if (lapis.className !== "") return;

  if (sesi.aktif >= BATAS - ABA && !sesi.aba) {
    sesi.aba = 1;
    simpan();
    pasangAba(true);
  }

  if (sesi.aktif < BATAS) return;

  /* Menunggu huruf yang sedang dia buat sampai tuntas — tapi hanya sampai
     batas: halaman yang lupa melepas tundanya tidak boleh berarti tidak ada
     batas sama sekali. */
  if (tundaDulu()) {
    if (!tundaSejak) tundaSejak = kini;
    if (kini - tundaSejak < TUNDA_MAKS) return;
  }
  tundaSejak = 0;
  tanya();
}

/* Saat halaman dibuka: kunci yang belum lewat istirahatnya tetap berlaku,
   supaya memuat ulang halaman bukan jalan keluar. Aba-abanya ikut pindah
   halaman tanpa diucapkan ulang — dia sudah mendengarnya sekali, dan
   mendengarnya lagi tiap kali berpindah kegiatan cuma jadi omelan. */
(function awal(){
  const kini = Date.now();
  if (sesi.kunci && kini - sesi.kunci >= ISTIRAHAT) { sesi.kunci = 0; sesi.aktif = 0; }
  if (sesi.nadi && kini - sesi.nadi > ISTIRAHAT) { sesi.aktif = 0; sesi.kunci = 0; sesi.aba = 0; }
  sesi.nadi = kini;
  simpan();
  if (sesi.kunci) berhenti();
  else if (sesi.aktif >= BATAS) tanya();
  else if (sesi.aba) pasangAba(false);
})();

setInterval(detak, DETAK);

})();
