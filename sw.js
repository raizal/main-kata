/* ------------------------------------------------------------------
   Pekerja layanan: simpanan luring.

   Halaman yang dibuka dari alamat web butuh jaringan untuk mengambil
   berkasnya sekali. Sesudah itu tidak lagi — dan itu bedanya antara
   aplikasi yang bisa dipakai di mobil dan yang cuma bisa dipakai di rumah.

   Dua langkah. Kerangkanya (halaman, gaya, skrip) disimpan waktu dipasang,
   karena tanpa itu tidak ada apa-apa yang bisa dibuka. Fotonya menyusul
   sesudah dia aktif, tanpa menahan pemasangan: 235 foto tidak boleh membuat
   pembukaan pertamanya menggantung di layar kosong.

   Kerangkanya diambil dari jaringan dulu kalau ada, supaya versi baru
   aplikasinya tidak kalah oleh salinan lama. Fotonya sebaliknya — foto yang
   sama selamanya, jadi salinan yang ada selalu dipakai lebih dulu.
   ------------------------------------------------------------------ */
const VERSI = "rere-v1";

const KERANGKA = [
  "index.html", "tulis.html", "baca.html", "hewan.html", "benda.html",
  "assets/base.css", "assets/tulis.css", "assets/baca.css", "assets/kenal.css",
  "assets/app.js", "assets/data.js", "assets/waktu.js",
  "assets/tulis.js", "assets/baca.js", "assets/kenal.js", "assets/bibir.js",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSI)
      .then(c => c.addAll(KERANGKA))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

/* Simpanan versi lama dibuang, lalu fotonya diturunkan diam-diam di
   belakang. Sengaja tidak lewat waitUntil: kalau ini menahan pengaktifan,
   halaman pertamanya menunggu 14 MB selesai sebelum menyahut. */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== VERSI).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
  simpanFoto();
});

function simpanFoto(){
  fetch("assets/foto/daftar.json")
    .then(r => r.json())
    .then(async daftar => {
      const c = await caches.open(VERSI);
      /* Satu per satu, bukan addAll: satu foto yang gagal tidak boleh
         membatalkan dua ratus lainnya. */
      for (const nama of daftar) {
        const url = "assets/foto/" + nama;
        if (await c.match(url)) continue;
        try { await c.add(url); } catch (err) {}
      }
    })
    .catch(() => {});
}

self.addEventListener("fetch", e => {
  const permintaan = e.request;
  if (permintaan.method !== "GET") return;
  const url = new URL(permintaan.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.indexOf("/assets/foto/") !== -1) {
    e.respondWith(
      caches.match(permintaan).then(ada => ada || ambilDanSimpan(permintaan))
    );
    return;
  }

  e.respondWith(
    ambilDanSimpan(permintaan)
      .catch(() => caches.match(permintaan).then(ada => ada || Response.error()))
  );
});

function ambilDanSimpan(permintaan){
  return fetch(permintaan).then(jawab => {
    if (jawab && jawab.ok) {
      const salinan = jawab.clone();
      caches.open(VERSI).then(c => c.put(permintaan, salinan)).catch(() => {});
    }
    return jawab;
  });
}
