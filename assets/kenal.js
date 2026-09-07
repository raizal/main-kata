/* ------------------------------------------------------------------
   "Mengenal hewan" dan "mengenal benda" adalah halaman yang sama dengan
   satu perbedaan: nilai TEMA yang halamannya tetapkan sebelum memuat
   berkas ini.

   Dulu keduanya satu halaman dengan dua tab tema di atas papan. Tab itu
   sekarang hilang: pilihannya sudah diambil di menu, jadi begitu masuk
   sini tidak ada lagi yang perlu diputuskan — hanya papan dan huruf.
   ------------------------------------------------------------------ */

const papan   = el("papan");
const lihat   = el("lihat");
const panggung= el("panggung");
const foto    = el("foto");
const kataEl  = el("kata");

let huruf = null, langkah = 0;

/* Satu kotak huruf mewakili satu barisan kata, jadi kumpulan foto milik
   kata, bukan milik huruf. */
function kataDari(letter){
  const baris = THEMES[TEMA].letters.find(([l]) => l === letter);
  return baris ? baris[1] : [];
}

function kumpulan(word){
  const p = POOLS[TEMA] && POOLS[TEMA][word];
  return (p && p.length) ? p : [];
}

/* Satu kata, satu foto. Dulu satu kata memakai seluruh kumpulan fotonya —
   empat ekor bebek berbeda sebelum pindah ke kata berikutnya — dengan maksud
   memperlihatkan bahwa keempatnya sama-sama bebek. Tapi di layar hasilnya
   ketukan yang berkali-kali tidak mengubah katanya, dan itu terbaca sebagai
   macet, bukan sebagai satu gagasan. Sekarang tiap ketukan pindah kata, dan
   kata tanpa foto tetap kebagian giliran sebagai kata saja. */
function barisan(letter){
  return kataDari(letter).map(word => [word, kumpulan(word)[0] || null]);
}

function tampilkan(letter){
  const urut = barisan(letter);
  foto.classList.remove("tampil");
  if (!urut.length) { foto.removeAttribute("src"); kataEl.textContent = ""; return; }

  /* Kata berganti bersama fotonya, tepat saat barisan menyeberang ke kata
     berikutnya — bukan sesudahnya, supaya yang terbaca dan yang terlihat
     tidak pernah berbeda walau sekejap. */
  const [word, url] = urut[langkah];
  kataEl.textContent = word;
  if (!url) { foto.removeAttribute("src"); return; }
  foto.src = url;

  const berikut = urut[(langkah + 1) % urut.length][1];
  if (berikut && berikut !== url) hangatkan(berikut);
}

function buka(letter){
  huruf = letter;
  langkah = 0;
  lihat.classList.add("on");
  jalan.titip();
  tampilkan(letter);
}

function tutup(){
  lihat.classList.remove("on");
  foto.classList.remove("tampil");
  huruf = null;
}

function susunPapan(){
  papan.textContent = "";
  for (const [letter, kata] of THEMES[TEMA].letters) {
    const b = document.createElement("button");
    b.className = "kotak " + COLOURS[letter];
    b.textContent = letter;
    /* Pembaca layar menyebut isi kotaknya, bukan hurufnya: yang sedang
       dipelajari adalah kaitan huruf ke bendanya. */
    b.setAttribute("aria-label", letter + ", " + kata[0]);
    if (letter === "Y") b.dataset.pos = "y";
    b.addEventListener("click", () => buka(letter));
    papan.appendChild(b);
  }
}

foto.addEventListener("load",  () => foto.classList.add("tampil"));
/* Jangan pernah menampilkan ikon gambar rusak — diam-diam mundur ke kata
   saja, karena tanda silang merah adalah hal terakhir yang perlu dia lihat. */
foto.addEventListener("error", () => {
  foto.classList.remove("tampil");
  foto.removeAttribute("src");
});

/* Satu langkah maju, tidak pernah melompat acak: urutan yang bisa ditebak
   itulah gunanya. */
panggung.addEventListener("click", () => {
  if (!huruf) return;
  const n = barisan(huruf).length;
  if (n) langkah = (langkah + 1) % n;
  tampilkan(huruf);
});

/* Tombol kembali ponsel menutup foto dulu, baru keluar ke menu — supaya
   satu gerakan usap tidak melompati dua tingkat sekaligus. */
const jalan = riwayat(tutup, () => huruf !== null);
el("pulang").addEventListener("click", e => { e.stopPropagation(); jalan.mundur(); });

/* Foto pertama tiap huruf dimuat lebih dulu, jadi ketukan pertama di kotak
   mana pun tidak pernah berujung layar kosong. */
function hangatkanSemua(){
  for (const [letter] of THEMES[TEMA].letters) {
    const awal = barisan(letter)[0];
    if (awal) hangatkan(awal[1]);
  }
}

susunPapan();
addEventListener("load", hangatkanSemua);
