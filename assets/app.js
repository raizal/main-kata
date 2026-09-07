/* ------------------------------------------------------------------
   Hal-hal kecil yang berlaku di semua halaman.
   ------------------------------------------------------------------ */

const el = id => document.getElementById(id);

/* Menutup cara-cara anak lima tahun keluar dari aplikasi tanpa sengaja:
   menu tahan-lama, cubit untuk memperbesar, dan ketuk dua kali. */
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("dblclick", e => e.preventDefault());

/* Manifest ditempel dari sini, bukan sebagai berkas terpisah, supaya
   "Tambahkan ke Layar Utama" tetap membuka layar penuh dan terkunci tegak
   tanpa perlu satu berkas .webmanifest per halaman. */
(function manifest(){
  const ikon = document.querySelector('link[rel="apple-touch-icon"]');
  const m = {
    name:"Main Kata", short_name:"Main Kata",
    start_url:"index.html", display:"standalone", orientation:"portrait",
    background_color:"#faf8f5", theme_color:"#faf8f5",
    icons: ikon ? [{src:ikon.href, sizes:"180x180", type:"image/svg+xml", purpose:"any"}] : [],
  };
  const l = document.createElement("link");
  l.rel = "manifest";
  l.href = URL.createObjectURL(new Blob([JSON.stringify(m)], {type:"application/manifest+json"}));
  document.head.appendChild(l);
})();

/* Panah kembali, digambar dan bukan emoji: rupa emoji berbeda-beda antar
   Android dan sebagiannya tidak punya glif ini sama sekali, yang menyisakan
   tombol kosong. */
const PANAH =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"' +
  ' stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>';

/* ------------------------------------------------------------------
   Tombol kembali bawaan ponsel.

   Setiap kegiatan punya satu layar penuh di atas papan. Tanpa apa-apa,
   gerakan usap-kembali di Android akan melompati layar itu dan langsung
   keluar dari halaman — satu gerakan, dua tingkat hilang. Jadi membuka
   layar penuh menitipkan satu entri riwayat, dan tombol kembali ponsel
   hanya menutup layar itu.

   Kalau pushState ditolak — halaman dibuka lewat file:// di sebagian
   peramban — bendera riwayat tidak pernah menyala dan tombol Kembali di
   layar menutupnya langsung, tanpa menyentuh riwayat sama sekali.
   ------------------------------------------------------------------ */
function riwayat(tutup, sedangTerbuka){
  let dititipkan = false;

  addEventListener("popstate", () => {
    dititipkan = false;
    if (sedangTerbuka()) tutup();
  });

  return {
    /* Dipanggil saat layar penuh dibuka. */
    titip(){
      dititipkan = false;
      try { history.pushState({buka:1}, ""); dititipkan = true; } catch (e) {}
    },
    /* Dipanggil oleh tombol Kembali di layar. Lewat riwayat kalau bisa,
       supaya dua jalan keluar itu berakhir di tempat yang sama dan tidak
       meninggalkan entri riwayat yang menggantung. */
    mundur(){
      if (dititipkan) history.back();
      else tutup();
    },
  };
}

/* Muat foto berikutnya diam-diam supaya ketukan sesudah ini langsung jadi,
   bukan layar kosong sambil menunggu jaringan. */
function hangatkan(url){
  if (url) new Image().src = url;
}
