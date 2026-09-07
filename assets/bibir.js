/* ------------------------------------------------------------------
   Cara baca: bentuk bibir waktu satu huruf dibunyikan.

   Gambarnya digambar sendiri di sini sebagai SVG, bukan diambil dari
   kumpulan gambar stok. Dua alasan: gambar stok punya lisensi yang tidak
   ikut pindah bersama berkas ini, dan yang lebih penting, gambar yang
   digambar sendiri bisa memakai palet yang sama dengan seluruh aplikasi.
   Mulut merah menyala di tengah halaman krem adalah persis jenis kejutan
   yang halaman ini berusaha hindari.

   Bentuknya sengaja disederhanakan: bibir, rongga mulut, gigi, lidah. Tidak
   ada wajah, tidak ada hidung, tidak ada mata. Yang perlu dia tiru cuma
   mulutnya, dan wajah lengkap hanya menambah hal untuk dilihat.

   Tidak ada yang bergerak. Animasi mulut memang lebih menjelaskan, tapi
   gerak yang berulang tanpa henti adalah hal yang paling cepat membuat
   dia lelah — jadi ini pose diam, dan orang tuanya yang memperagakan.

   Yang menggantikan gerak itu adalah urutannya. Satu mulut untuk satu kata
   utuh tidak memberi tahu apa-apa soal cara mengucapkannya: "buku" bukan
   satu bentuk mulut, tapi empat yang datang berurutan — b, u, k, u. Jadi
   mulutnya digelar sebaris per suku kata, dalam urutan dia mengeluarkannya,
   supaya yang ditiru adalah perpindahannya dan bukan satu potret.
   ------------------------------------------------------------------ */

/* Sembilan pose, dipakai berulang oleh 26 huruf. Bunyi yang bibirnya
   memang sama tidak perlu gambar yang berbeda-beda: melihat gambar yang
   sama untuk B, P, dan M justru memberitahu bahwa ketiganya satu keluarga. */
const POSE = {
  /* Vokal terbuka: rahang turun, lidah rata di dasar mulut. */
  lebar:     {rx:38, ry:29, gigi:"atas", lidah:"bawah"},
  sedang:    {rx:33, ry:19, gigi:"atas", lidah:"bawah"},
  /* Bibir ditarik ke samping, celahnya tipis dan lebar. */
  tipis:     {rx:40, ry:9,  gigi:"dua"},
  /* Bibir dibulatkan. Besar untuk O, kecil dan maju untuk U. */
  bulatBesar:{rx:22, ry:23, lidah:"bawah"},
  bulatKecil:{rx:13, ry:15},
  /* Bibir tertutup rapat: tidak ada celah sama sekali. */
  rapat:     {rapat:true},
  /* Gigi atas bertumpu di bibir bawah. */
  gigiBibir: {rx:33, ry:9,  tumpu:true},
  /* Ujung lidah naik menyentuh langit-langit di belakang gigi atas. */
  lidahAtas: {rx:28, ry:15, gigi:"atas", lidah:"atas"},
  /* Gigi nyaris rapat, udara lewat di celahnya. */
  gigiRapat: {rx:33, ry:8,  gigi:"dua"},
};

/* Satu huruf, satu pose, satu kalimat pendek untuk dibacakan orang tuanya
   sambil memperagakan. Kalimatnya ditulis sebagai perintah ke mulut, bukan
   sebagai istilah — "rapatkan bibir", bukan "konsonan bilabial". */
const BIBIR = {
  A:{pose:"lebar",      cara:"Buka mulut lebar"},
  B:{pose:"rapat",      cara:"Rapatkan bibir, lalu lepaskan"},
  C:{pose:"gigiRapat",  cara:"Gigi hampir rapat, ujung lidah di depan"},
  D:{pose:"lidahAtas",  cara:"Ujung lidah di belakang gigi atas"},
  E:{pose:"sedang",     cara:"Buka sedikit, bibir agak melebar"},
  F:{pose:"gigiBibir",  cara:"Gigi atas menyentuh bibir bawah"},
  G:{pose:"sedang",     cara:"Bunyinya dari pangkal lidah"},
  H:{pose:"sedang",     cara:"Buka mulut, embuskan napas"},
  I:{pose:"tipis",      cara:"Tarik bibir ke samping"},
  J:{pose:"gigiRapat",  cara:"Lidah menempel di langit-langit"},
  K:{pose:"sedang",     cara:"Pangkal lidah naik, lalu lepas"},
  L:{pose:"lidahAtas",  cara:"Ujung lidah menempel di langit-langit"},
  M:{pose:"rapat",      cara:"Bibir rapat, bunyinya lewat hidung"},
  N:{pose:"lidahAtas",  cara:"Lidah di gigi atas, bunyinya lewat hidung"},
  O:{pose:"bulatBesar", cara:"Bulatkan bibir"},
  P:{pose:"rapat",      cara:"Rapatkan bibir, lalu embuskan"},
  Q:{pose:"sedang",     cara:"Pangkal lidah naik, seperti K"},
  R:{pose:"lidahAtas",  cara:"Ujung lidah bergetar di langit-langit"},
  S:{pose:"gigiRapat",  cara:"Gigi hampir rapat, udara mendesis"},
  T:{pose:"lidahAtas",  cara:"Ujung lidah di gigi atas, lalu lepas"},
  U:{pose:"bulatKecil", cara:"Bulatkan bibir, majukan ke depan"},
  V:{pose:"gigiBibir",  cara:"Gigi atas di bibir bawah, bergetar"},
  W:{pose:"bulatKecil", cara:"Bibir bulat, lalu melebar"},
  X:{pose:"gigiRapat",  cara:"Bunyinya seperti ks"},
  Y:{pose:"tipis",      cara:"Bibir melebar, lidah naik"},
  Z:{pose:"gigiRapat",  cara:"Gigi hampir rapat, bergetar"},

  /* Ditulis dua huruf, dibunyikan sekali. Kalau "ng" pada "mangga" dipecah
     jadi n lalu g, yang dia tiru bukan bunyi yang ada di kata itu. */
  NG:{pose:"sedang",     cara:"Pangkal lidah naik, bunyinya lewat hidung"},
  NY:{pose:"lidahAtas",  cara:"Tengah lidah menempel di langit-langit"},
  KH:{pose:"sedang",     cara:"Pangkal lidah naik, udara mendesah"},
  SY:{pose:"gigiRapat",  cara:"Bibir sedikit maju, udara mendesis"},
};

/* Memecah satu suku kata jadi bunyi-bunyi yang dia keluarkan berurutan.
   "kop" jadi k, o, p. "ngu" jadi ng, u — bukan n, g, u. */
const RANGKAP = ["ng", "ny", "kh", "sy"];

function fonem(sukuKata){
  const s = String(sukuKata).toLowerCase();
  const out = [];
  for (let i = 0; i < s.length; ) {
    const dua = s.slice(i, i + 2);
    if (RANGKAP.indexOf(dua) >= 0) { out.push(dua); i += 2; }
    else { out.push(s[i]); i += 1; }
  }
  return out;
}

/* Warnanya diambil dari peubah CSS, jadi paletnya tetap tinggal di satu
   berkas. SVG sebaris ikut mewarisi peubah dari halamannya. */
let nomorMulut = 0;

function svgBibir(pose){
  const p = POSE[pose] || POSE.sedang;
  const cx = 80, cy = 58;
  const bagian = [];

  /* Bibir luar digambar sebagai dua lengkung: lengkung atas dengan cekung
     kecil di tengah (busur bibir), lengkung bawah yang lebih penuh. Bentuk
     ini yang membedakan "mulut" dari "lonjong" begitu dilihat sekilas. */
  function bibirLuar(RX, RY){
    return "M" + (cx - RX) + " " + cy +
      " C" + (cx - RX * .62) + " " + (cy - RY * 1.32) + " " +
             (cx - RX * .2)  + " " + (cy - RY * .78)  + " " + cx + " " + (cy - RY * .92) +
      " C" + (cx + RX * .2)  + " " + (cy - RY * .78)  + " " +
             (cx + RX * .62) + " " + (cy - RY * 1.32) + " " + (cx + RX) + " " + cy +
      " C" + (cx + RX * .62) + " " + (cy + RY * 1.42) + " " +
             (cx - RX * .62) + " " + (cy + RY * 1.42) + " " + (cx - RX) + " " + cy + "Z";
  }

  if (p.rapat) {
    const d = bibirLuar(46, 20);
    bagian.push('<path d="' + d + '" fill="var(--bibir)"/>');
    /* Garis tempat kedua bibir bertemu. Itulah seluruh isi pose ini:
       tidak ada rongga, tidak ada gigi, tidak ada yang terlihat. */
    bagian.push('<path d="M' + (cx - 40) + ' ' + cy + ' Q' + cx + ' ' + (cy - 5) +
                ' ' + (cx + 40) + ' ' + cy + '" fill="none" stroke="var(--bibir-garis)"' +
                ' stroke-width="3.4" stroke-linecap="round"/>');
    bagian.push('<path d="' + d + '" fill="none" stroke="var(--bibir-garis)" stroke-width="3"/>');
    return bagian.join("");
  }

  const RX = p.rx + 16, RY = p.ry + 13;
  const luar = bibirLuar(RX, RY);
  /* Satu kata memunculkan satu mulut per bunyi, dan pose yang sama sering
     datang dua kali dalam satu kata ("buku" punya dua u). clipPath dicari
     peramban lewat id, dan id kembar diam-diam membuat mulut kedua memakai
     potongan milik yang pertama — jadi tiap mulut diberi nomor sendiri. */
  const id = "mulut" + pose + "-" + (++nomorMulut);

  bagian.push('<path d="' + luar + '" fill="var(--bibir)"/>');
  bagian.push('<clipPath id="' + id + '"><ellipse cx="' + cx + '" cy="' + cy +
              '" rx="' + p.rx + '" ry="' + p.ry + '"/></clipPath>');
  bagian.push('<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + p.rx +
              '" ry="' + p.ry + '" fill="var(--mulut)"/>');

  const dalam = [];
  const tebalGigi = Math.max(6, p.ry * .44);
  if (p.gigi === "atas" || p.gigi === "dua")
    dalam.push('<rect x="' + (cx - p.rx) + '" y="' + (cy - p.ry) + '" width="' + (p.rx * 2) +
               '" height="' + tebalGigi + '" rx="3" fill="var(--gigi)"/>');
  if (p.gigi === "dua")
    dalam.push('<rect x="' + (cx - p.rx) + '" y="' + (cy + p.ry - tebalGigi) + '" width="' +
               (p.rx * 2) + '" height="' + tebalGigi + '" rx="3" fill="var(--gigi)"/>');
  if (p.lidah === "bawah")
    dalam.push('<ellipse cx="' + cx + '" cy="' + (cy + p.ry * .78) + '" rx="' + (p.rx * .64) +
               '" ry="' + (p.ry * .58) + '" fill="var(--lidah)"/>');
  if (p.lidah === "atas")
    dalam.push('<ellipse cx="' + cx + '" cy="' + (cy - p.ry * .12) + '" rx="' + (p.rx * .52) +
               '" ry="' + (p.ry * .62) + '" fill="var(--lidah)"/>');
  bagian.push('<g clip-path="url(#' + id + ')">' + dalam.join("") + '</g>');

  /* Gigi yang menumpu di bibir bawah sengaja digambar di luar potongan:
     yang mau diperlihatkan justru giginya keluar dari rongga mulut. */
  if (p.tumpu)
    bagian.push('<rect x="' + (cx - 24) + '" y="' + (cy - 3) +
                '" width="48" height="11" rx="3.5" fill="var(--gigi)"' +
                ' stroke="var(--bibir-garis)" stroke-width="1.5"/>');

  bagian.push('<path d="' + luar + '" fill="none" stroke="var(--bibir-garis)" stroke-width="3"/>');
  return bagian.join("");
}

/* Kotak gambar yang dirapatkan ke mulutnya.

   Kotak seragam 160x116 tetap dipakai di tangga bunyi, supaya tiap barisnya
   sama tinggi dan mulutnya berjajar rapi. Tapi di layar zoom kotak seragam
   itu merugikan: mulut "u" cuma mengisi sepertiganya, jadi yang ikut
   membesar sebagian besar ruang kosong, bukan bibirnya.

   Lebar dan tingginya diberi lantai, tidak dirapatkan sampai mepet. Kalau
   tiap pose dipaksa memenuhi kotaknya sendiri-sendiri, "u" dan "a" berakhir
   sama besar di layar — padahal bedanya bibir dibulatkan kecil dan mulut
   dibuka lebar justru salah satu hal yang harus dia tiru. */
function kotakBibir(pose){
  const p = POSE[pose] || POSE.sedang;
  const cx = 80, cy = 58;
  const RX = p.rapat ? 46 : p.rx + 16;
  const RY = p.rapat ? 20 : p.ry + 13;
  const atas = cy - RY * 1.32, bawah = cy + RY * 1.42;
  const w = Math.max(RX * 2 + 18, 104);
  const h = Math.max(bawah - atas + 18, 104);
  return (cx - w / 2) + " " + ((atas + bawah) / 2 - h / 2) + " " + w + " " + h;
}

function gambarBibir(letter, penuh){
  const kunci = String(letter).toUpperCase();
  const b = BIBIR[kunci];
  if (!b) return "";
  const kotak = penuh ? kotakBibir(b.pose) : "0 0 160 116";
  return '<svg viewBox="' + kotak + '" role="img" aria-label="Bentuk bibir untuk bunyi ' +
         kunci + '">' + svgBibir(b.pose) + '</svg>';
}

function caraBaca(letter){
  return (BIBIR[String(letter).toUpperCase()] || {}).cara || "";
}
