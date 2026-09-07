/* ------------------------------------------------------------------
   Data bersama untuk semua kegiatan.

   Dulu THEMES dan POOLS disalin utuh ke index.html dan tulis.html —
   dua salinan identik sepanjang 600 baris yang harus diubah berbarengan
   setiap kali daftar kata berubah. Sekarang satu berkas, dimuat sebagai
   skrip biasa (bukan modul) supaya tetap jalan waktu berkasnya dibuka
   langsung lewat file:// tanpa server.
   ------------------------------------------------------------------ */

/* Warna milik HURUF, bukan milik tema dan bukan milik kegiatan. Papan di
   "mengenal hewan", "mengenal benda", "membaca" dan "menulis" harus terlihat
   persis sama — peta warna yang sudah dia hafal tetap berlaku di mana pun. */
const COLOURS = {
  A:"pink",  B:"blue",  C:"yellow",D:"brown", E:"orange",F:"purple",
  G:"pink",  H:"blue",  I:"yellow",J:"brown", K:"orange",L:"purple",
  M:"pink",  N:"blue",  O:"yellow",P:"brown", Q:"orange",R:"purple",
  S:"yellow",T:"blue",  U:"yellow",V:"brown", W:"orange",X:"purple",
  Y:"pink",  Z:"blue",
};

/*WORDS_START*/
/* Tiap huruf membawa daftar katanya sendiri, dalam urutan tetap.
   Kata barunya dikurasi tangan lewat tools/kata_baru.json dan
   tools/cari_putaran3.py; fotonya dipilih satu per satu dari lembar
   kontak, bukan diambil dari hasil pencarian teratas begitu saja.
   Dibuat oleh tools/tulis_data.py — sunting di sana, bukan di sini. */
const THEMES = {
  benda: { label: "Benda", letters: [
    ["A", ["apel", "air", "api", "awan", "anggur", "alpukat", "atap"]],
    ["B", ["buku", "bola", "bunga", "baju"]],
    ["C", ["coklat", "cangkir", "celana", "cabai", "cincin"]],
    ["D", ["donat", "daun", "dasi", "dompet", "dadu", "durian", "danau", "drum"]],
    ["E", ["es krim", "ember", "emas", "embun", "es batu", "eskalator", "es teh"]],
    ["F", ["foto", "film", "figura", "fosil", "fajar", "feri"]],
    ["G", ["gunting", "garpu", "gitar", "gunung", "gelas", "gigi", "gula"]],
    ["H", ["hidung", "hujan", "hutan", "handuk", "helikopter", "hotel", "helm"]],
    ["I", ["ikan", "ilalang", "ikat pinggang", "intan"]],
    ["J", ["jam", "jeruk", "jagung", "jembatan", "jari", "jamur", "jalan"]],
    ["K", ["kacamata", "kunci", "kursi", "kompor"]],
    ["L", ["lampu", "lemari", "lilin", "lidah", "layang-layang", "lemon"]],
    ["M", ["madu", "mangga", "meja", "mobil", "matahari", "motor", "mawar", "mangkuk"]],
    ["N", ["nasi", "nanas", "nangka", "naga", "nampan", "nelayan", "nyiur", "nugget"]],
    ["O", ["obeng", "oven", "obat", "ombak", "oli", "onde-onde", "okra", "odol", "omelet"]],
    ["P", ["payung", "pisang", "pensil", "piring", "pintu", "pesawat", "pantai"]],
    ["Q", ["quran"]],
    ["R", ["roda", "rumah", "roti", "rok", "radio", "rantai", "rumput", "rambutan"]],
    ["S", ["susu", "sepatu", "sepeda", "sendok", "sisir", "salju", "semangka"]],
    ["T", ["tahu", "telur", "tomat", "topi", "tangga"]],
    ["U", ["uang", "ubi", "ukulele", "ulekan", "ubin"]],
    ["V", ["vas", "vespa", "violin", "voli"]],
    ["W", ["wajan", "wortel", "wafer", "wastafel", "waduk"]],
    ["X", ["xilofon"]],
    ["Y", ["yoyo", "yogurt"]],
    ["Z", ["zebra", "zaitun", "zamrud"]]
  ]},
  hewan: { label: "Hewan", letters: [
    ["A", ["ayam", "anjing", "angsa"]],
    ["B", ["bebek", "burung", "babi", "buaya", "beruang", "badak", "belalang", "bangau", "belut", "bunglon", "berang-berang"]],
    ["C", ["cicak", "capung", "cacing", "cumi-cumi", "cendrawasih"]],
    ["D", ["domba", "duyung"]],
    ["E", ["elang", "enggang", "entok"]],
    ["F", ["flamingo"]],
    ["G", ["gajah", "gurita", "gagak", "gorila"]],
    ["H", ["harimau", "hiu", "hamster"]],
    ["I", ["ikan", "iguana", "itik"]],
    ["J", ["jerapah", "jangkrik", "jalak"]],
    ["K", ["kucing", "kuda", "kelinci", "kambing", "kupu-kupu", "katak", "kura-kura", "kerbau", "kelelawar", "kanguru", "koala", "komodo"]],
    ["L", ["lebah", "lumba-lumba", "laba-laba", "lalat", "landak", "lipan"]],
    ["M", ["monyet", "merpati", "merak"]],
    ["N", ["nyamuk", "nuri"]],
    ["O", ["orangutan"]],
    ["P", ["panda", "penguin", "paus", "penyu"]],
    ["Q", ["quokka"]],
    ["R", ["rusa", "rubah"]],
    ["S", ["sapi", "singa", "semut", "siput"]],
    ["T", ["tikus", "tupai", "tokek", "tapir", "trenggiling", "tarsius"]],
    ["U", ["unta", "ular", "udang", "ubur-ubur", "ulat"]],
    ["V", ["viper"]],
    ["W", ["walrus", "walet"]],
    ["X", ["xerus"]],
    ["Y", ["yuyu"]],
    ["Z", ["zebra"]]
  ]},
};
/*WORDS_END*/

/*POOLS_START*/
/* Satu kata, satu foto. Dulu tiap kata membawa empat, sisa dari waktu
   satu huruf memutar beberapa foto berturut-turut; sejak tiap ketukan
   pindah kata, yang kedua sampai keempat tidak pernah terpakai lagi dan
   cuma bikin berkas ini panjang. */
const POOLS = {
 "benda": {
  "apel": [
    "assets/foto/benda-apel.jpg"
  ],
  "buku": [
    "assets/foto/benda-buku.jpg"
  ],
  "coklat": [
    "assets/foto/benda-coklat.jpg"
  ],
  "donat": [
    "assets/foto/benda-donat.jpg"
  ],
  "es krim": [
    "assets/foto/benda-es-krim.jpg"
  ],
  "foto": [
    "assets/foto/benda-foto.jpg"
  ],
  "gunting": [
    "assets/foto/benda-gunting.jpg"
  ],
  "hidung": [
    "assets/foto/benda-hidung.jpg"
  ],
  "ikan": [
    "assets/foto/benda-ikan.jpg"
  ],
  "jam": [
    "assets/foto/benda-jam.jpg"
  ],
  "kacamata": [
    "assets/foto/benda-kacamata.jpg"
  ],
  "lampu": [
    "assets/foto/benda-lampu.jpg"
  ],
  "madu": [
    "assets/foto/benda-madu.jpg"
  ],
  "nasi": [
    "assets/foto/benda-nasi.jpg"
  ],
  "obeng": [
    "assets/foto/benda-obeng.jpg"
  ],
  "payung": [
    "assets/foto/benda-payung.jpg"
  ],
  "quran": [
    "assets/foto/benda-quran.jpg"
  ],
  "roda": [
    "assets/foto/benda-roda.jpg"
  ],
  "susu": [
    "assets/foto/benda-susu.jpg"
  ],
  "tahu": [
    "assets/foto/benda-tahu.jpg"
  ],
  "uang": [
    "assets/foto/benda-uang.jpg"
  ],
  "vas": [
    "assets/foto/benda-vas.jpg"
  ],
  "wajan": [
    "assets/foto/benda-wajan.jpg"
  ],
  "xilofon": [
    "assets/foto/benda-xilofon.jpg"
  ],
  "yoyo": [
    "assets/foto/benda-yoyo.jpg"
  ],
  "zebra": [
    "assets/foto/benda-zebra.jpg"
  ],
  "air": [
    "assets/foto/benda-air.jpg"
  ],
  "api": [
    "assets/foto/benda-api.jpg"
  ],
  "awan": [
    "assets/foto/benda-awan.jpg"
  ],
  "anggur": [
    "assets/foto/benda-anggur.jpg"
  ],
  "alpukat": [
    "assets/foto/benda-alpukat.jpg"
  ],
  "atap": [
    "assets/foto/benda-atap.jpg"
  ],
  "bola": [
    "assets/foto/benda-bola.jpg"
  ],
  "bunga": [
    "assets/foto/benda-bunga.jpg"
  ],
  "baju": [
    "assets/foto/benda-baju.jpg"
  ],
  "cangkir": [
    "assets/foto/benda-cangkir.jpg"
  ],
  "celana": [
    "assets/foto/benda-celana.jpg"
  ],
  "cabai": [
    "assets/foto/benda-cabai.jpg"
  ],
  "daun": [
    "assets/foto/benda-daun.jpg"
  ],
  "dasi": [
    "assets/foto/benda-dasi.jpg"
  ],
  "dompet": [
    "assets/foto/benda-dompet.jpg"
  ],
  "dadu": [
    "assets/foto/benda-dadu.jpg"
  ],
  "durian": [
    "assets/foto/benda-durian.jpg"
  ],
  "danau": [
    "assets/foto/benda-danau.jpg"
  ],
  "drum": [
    "assets/foto/benda-drum.jpg"
  ],
  "ember": [
    "assets/foto/benda-ember.jpg"
  ],
  "emas": [
    "assets/foto/benda-emas.jpg"
  ],
  "embun": [
    "assets/foto/benda-embun.jpg"
  ],
  "es batu": [
    "assets/foto/benda-es-batu.jpg"
  ],
  "eskalator": [
    "assets/foto/benda-eskalator.jpg"
  ],
  "es teh": [
    "assets/foto/benda-es-teh.jpg"
  ],
  "film": [
    "assets/foto/benda-film.jpg"
  ],
  "figura": [
    "assets/foto/benda-figura.jpg"
  ],
  "fosil": [
    "assets/foto/benda-fosil.jpg"
  ],
  "fajar": [
    "assets/foto/benda-fajar.jpg"
  ],
  "feri": [
    "assets/foto/benda-feri.jpg"
  ],
  "garpu": [
    "assets/foto/benda-garpu.jpg"
  ],
  "gitar": [
    "assets/foto/benda-gitar.jpg"
  ],
  "gunung": [
    "assets/foto/benda-gunung.jpg"
  ],
  "gelas": [
    "assets/foto/benda-gelas.jpg"
  ],
  "gigi": [
    "assets/foto/benda-gigi.jpg"
  ],
  "gula": [
    "assets/foto/benda-gula.jpg"
  ],
  "hujan": [
    "assets/foto/benda-hujan.jpg"
  ],
  "hutan": [
    "assets/foto/benda-hutan.jpg"
  ],
  "handuk": [
    "assets/foto/benda-handuk.jpg"
  ],
  "helikopter": [
    "assets/foto/benda-helikopter.jpg"
  ],
  "hotel": [
    "assets/foto/benda-hotel.jpg"
  ],
  "ilalang": [
    "assets/foto/benda-ilalang.jpg"
  ],
  "ikat pinggang": [
    "assets/foto/benda-ikat-pinggang.jpg"
  ],
  "jeruk": [
    "assets/foto/benda-jeruk.jpg"
  ],
  "jagung": [
    "assets/foto/benda-jagung.jpg"
  ],
  "jembatan": [
    "assets/foto/benda-jembatan.jpg"
  ],
  "jari": [
    "assets/foto/benda-jari.jpg"
  ],
  "jamur": [
    "assets/foto/benda-jamur.jpg"
  ],
  "jalan": [
    "assets/foto/benda-jalan.jpg"
  ],
  "kunci": [
    "assets/foto/benda-kunci.jpg"
  ],
  "kursi": [
    "assets/foto/benda-kursi.jpg"
  ],
  "kompor": [
    "assets/foto/benda-kompor.jpg"
  ],
  "lemari": [
    "assets/foto/benda-lemari.jpg"
  ],
  "lilin": [
    "assets/foto/benda-lilin.jpg"
  ],
  "lidah": [
    "assets/foto/benda-lidah.jpg"
  ],
  "layang-layang": [
    "assets/foto/benda-layang-layang.jpg"
  ],
  "lemon": [
    "assets/foto/benda-lemon.jpg"
  ],
  "mangga": [
    "assets/foto/benda-mangga.jpg"
  ],
  "meja": [
    "assets/foto/benda-meja.jpg"
  ],
  "mobil": [
    "assets/foto/benda-mobil.jpg"
  ],
  "matahari": [
    "assets/foto/benda-matahari.jpg"
  ],
  "motor": [
    "assets/foto/benda-motor.jpg"
  ],
  "mawar": [
    "assets/foto/benda-mawar.jpg"
  ],
  "nanas": [
    "assets/foto/benda-nanas.jpg"
  ],
  "nangka": [
    "assets/foto/benda-nangka.jpg"
  ],
  "naga": [
    "assets/foto/benda-naga.jpg"
  ],
  "nampan": [
    "assets/foto/benda-nampan.jpg"
  ],
  "nelayan": [
    "assets/foto/benda-nelayan.jpg"
  ],
  "nyiur": [
    "assets/foto/benda-nyiur.jpg"
  ],
  "nugget": [
    "assets/foto/benda-nugget.jpg"
  ],
  "oven": [
    "assets/foto/benda-oven.jpg"
  ],
  "obat": [
    "assets/foto/benda-obat.jpg"
  ],
  "ombak": [
    "assets/foto/benda-ombak.jpg"
  ],
  "oli": [
    "assets/foto/benda-oli.jpg"
  ],
  "onde-onde": [
    "assets/foto/benda-onde-onde.jpg"
  ],
  "okra": [
    "assets/foto/benda-okra.jpg"
  ],
  "pisang": [
    "assets/foto/benda-pisang.jpg"
  ],
  "pensil": [
    "assets/foto/benda-pensil.jpg"
  ],
  "piring": [
    "assets/foto/benda-piring.jpg"
  ],
  "pintu": [
    "assets/foto/benda-pintu.jpg"
  ],
  "pesawat": [
    "assets/foto/benda-pesawat.jpg"
  ],
  "pantai": [
    "assets/foto/benda-pantai.jpg"
  ],
  "rumah": [
    "assets/foto/benda-rumah.jpg"
  ],
  "roti": [
    "assets/foto/benda-roti.jpg"
  ],
  "rok": [
    "assets/foto/benda-rok.jpg"
  ],
  "radio": [
    "assets/foto/benda-radio.jpg"
  ],
  "rantai": [
    "assets/foto/benda-rantai.jpg"
  ],
  "rumput": [
    "assets/foto/benda-rumput.jpg"
  ],
  "rambutan": [
    "assets/foto/benda-rambutan.jpg"
  ],
  "sepatu": [
    "assets/foto/benda-sepatu.jpg"
  ],
  "sepeda": [
    "assets/foto/benda-sepeda.jpg"
  ],
  "sendok": [
    "assets/foto/benda-sendok.jpg"
  ],
  "sisir": [
    "assets/foto/benda-sisir.jpg"
  ],
  "salju": [
    "assets/foto/benda-salju.jpg"
  ],
  "semangka": [
    "assets/foto/benda-semangka.jpg"
  ],
  "telur": [
    "assets/foto/benda-telur.jpg"
  ],
  "tomat": [
    "assets/foto/benda-tomat.jpg"
  ],
  "topi": [
    "assets/foto/benda-topi.jpg"
  ],
  "tangga": [
    "assets/foto/benda-tangga.jpg"
  ],
  "ubi": [
    "assets/foto/benda-ubi.jpg"
  ],
  "ukulele": [
    "assets/foto/benda-ukulele.jpg"
  ],
  "vespa": [
    "assets/foto/benda-vespa.jpg"
  ],
  "violin": [
    "assets/foto/benda-violin.jpg"
  ],
  "voli": [
    "assets/foto/benda-voli.jpg"
  ],
  "wortel": [
    "assets/foto/benda-wortel.jpg"
  ],
  "wafer": [
    "assets/foto/benda-wafer.jpg"
  ],
  "wastafel": [
    "assets/foto/benda-wastafel.jpg"
  ],
  "waduk": [
    "assets/foto/benda-waduk.jpg"
  ],
  "yogurt": [
    "assets/foto/benda-yogurt.jpg"
  ],
  "zaitun": [
    "assets/foto/benda-zaitun.jpg"
  ],
  "zamrud": [
    "assets/foto/benda-zamrud.jpg"
  ],
  "cincin": [
    "assets/foto/benda-cincin.jpg"
  ],
  "intan": [
    "assets/foto/benda-intan.jpg"
  ],
  "mangkuk": [
    "assets/foto/benda-mangkuk.jpg"
  ],
  "ulekan": [
    "assets/foto/benda-ulekan.jpg"
  ],
  "helm": [
    "assets/foto/benda-helm.jpg"
  ],
  "odol": [
    "assets/foto/benda-odol.jpg"
  ],
  "omelet": [
    "assets/foto/benda-omelet.jpg"
  ],
  "ubin": [
    "assets/foto/benda-ubin.jpg"
  ]
 },
 "hewan": {
  "ayam": [
    "assets/foto/hewan-ayam.jpg"
  ],
  "anjing": [
    "assets/foto/hewan-anjing.jpg"
  ],
  "angsa": [
    "assets/foto/hewan-angsa.jpg"
  ],
  "bebek": [
    "assets/foto/hewan-bebek.jpg"
  ],
  "burung": [
    "assets/foto/hewan-burung.jpg"
  ],
  "babi": [
    "assets/foto/hewan-babi.jpg"
  ],
  "buaya": [
    "assets/foto/hewan-buaya.jpg"
  ],
  "beruang": [
    "assets/foto/hewan-beruang.jpg"
  ],
  "badak": [
    "assets/foto/hewan-badak.jpg"
  ],
  "belalang": [
    "assets/foto/hewan-belalang.jpg"
  ],
  "bangau": [
    "assets/foto/hewan-bangau.jpg"
  ],
  "belut": [
    "assets/foto/hewan-belut.jpg"
  ],
  "bunglon": [
    "assets/foto/hewan-bunglon.jpg"
  ],
  "berang-berang": [
    "assets/foto/hewan-berang-berang.jpg"
  ],
  "cicak": [
    "assets/foto/hewan-cicak.jpg"
  ],
  "capung": [
    "assets/foto/hewan-capung.jpg"
  ],
  "cacing": [
    "assets/foto/hewan-cacing.jpg"
  ],
  "cumi-cumi": [
    "assets/foto/hewan-cumi-cumi.jpg"
  ],
  "cendrawasih": [
    "assets/foto/hewan-cendrawasih.jpg"
  ],
  "domba": [
    "assets/foto/hewan-domba.jpg"
  ],
  "duyung": [
    "assets/foto/hewan-duyung.jpg"
  ],
  "elang": [
    "assets/foto/hewan-elang.jpg"
  ],
  "enggang": [
    "assets/foto/hewan-enggang.jpg"
  ],
  "flamingo": [
    "assets/foto/hewan-flamingo.jpg"
  ],
  "gajah": [
    "assets/foto/hewan-gajah.jpg"
  ],
  "gurita": [
    "assets/foto/hewan-gurita.jpg"
  ],
  "gagak": [
    "assets/foto/hewan-gagak.jpg"
  ],
  "gorila": [
    "assets/foto/hewan-gorila.jpg"
  ],
  "harimau": [
    "assets/foto/hewan-harimau.jpg"
  ],
  "hiu": [
    "assets/foto/hewan-hiu.jpg"
  ],
  "hamster": [
    "assets/foto/hewan-hamster.jpg"
  ],
  "ikan": [
    "assets/foto/hewan-ikan.jpg"
  ],
  "jerapah": [
    "assets/foto/hewan-jerapah.jpg"
  ],
  "jangkrik": [
    "assets/foto/hewan-jangkrik.jpg"
  ],
  "kucing": [
    "assets/foto/hewan-kucing.jpg"
  ],
  "kuda": [
    "assets/foto/hewan-kuda.jpg"
  ],
  "kelinci": [
    "assets/foto/hewan-kelinci.jpg"
  ],
  "kambing": [
    "assets/foto/hewan-kambing.jpg"
  ],
  "kupu-kupu": [
    "assets/foto/hewan-kupu-kupu.jpg"
  ],
  "katak": [
    "assets/foto/hewan-katak.jpg"
  ],
  "kura-kura": [
    "assets/foto/hewan-kura-kura.jpg"
  ],
  "kerbau": [
    "assets/foto/hewan-kerbau.jpg"
  ],
  "kelelawar": [
    "assets/foto/hewan-kelelawar.jpg"
  ],
  "kanguru": [
    "assets/foto/hewan-kanguru.jpg"
  ],
  "koala": [
    "assets/foto/hewan-koala.jpg"
  ],
  "komodo": [
    "assets/foto/hewan-komodo.jpg"
  ],
  "lebah": [
    "assets/foto/hewan-lebah.jpg"
  ],
  "lumba-lumba": [
    "assets/foto/hewan-lumba-lumba.jpg"
  ],
  "laba-laba": [
    "assets/foto/hewan-laba-laba.jpg"
  ],
  "lalat": [
    "assets/foto/hewan-lalat.jpg"
  ],
  "landak": [
    "assets/foto/hewan-landak.jpg"
  ],
  "lipan": [
    "assets/foto/hewan-lipan.jpg"
  ],
  "monyet": [
    "assets/foto/hewan-monyet.jpg"
  ],
  "merpati": [
    "assets/foto/hewan-merpati.jpg"
  ],
  "merak": [
    "assets/foto/hewan-merak.jpg"
  ],
  "nyamuk": [
    "assets/foto/hewan-nyamuk.jpg"
  ],
  "nuri": [
    "assets/foto/hewan-nuri.jpg"
  ],
  "orangutan": [
    "assets/foto/hewan-orangutan.jpg"
  ],
  "panda": [
    "assets/foto/hewan-panda.jpg"
  ],
  "penguin": [
    "assets/foto/hewan-penguin.jpg"
  ],
  "paus": [
    "assets/foto/hewan-paus.jpg"
  ],
  "penyu": [
    "assets/foto/hewan-penyu.jpg"
  ],
  "quokka": [
    "assets/foto/hewan-quokka.jpg"
  ],
  "rusa": [
    "assets/foto/hewan-rusa.jpg"
  ],
  "rubah": [
    "assets/foto/hewan-rubah.jpg"
  ],
  "sapi": [
    "assets/foto/hewan-sapi.jpg"
  ],
  "singa": [
    "assets/foto/hewan-singa.jpg"
  ],
  "semut": [
    "assets/foto/hewan-semut.jpg"
  ],
  "siput": [
    "assets/foto/hewan-siput.jpg"
  ],
  "tikus": [
    "assets/foto/hewan-tikus.jpg"
  ],
  "tupai": [
    "assets/foto/hewan-tupai.jpg"
  ],
  "tokek": [
    "assets/foto/hewan-tokek.jpg"
  ],
  "tapir": [
    "assets/foto/hewan-tapir.jpg"
  ],
  "trenggiling": [
    "assets/foto/hewan-trenggiling.jpg"
  ],
  "tarsius": [
    "assets/foto/hewan-tarsius.jpg"
  ],
  "unta": [
    "assets/foto/hewan-unta.jpg"
  ],
  "ular": [
    "assets/foto/hewan-ular.jpg"
  ],
  "udang": [
    "assets/foto/hewan-udang.jpg"
  ],
  "ubur-ubur": [
    "assets/foto/hewan-ubur-ubur.jpg"
  ],
  "viper": [
    "assets/foto/hewan-viper.jpg"
  ],
  "walrus": [
    "assets/foto/hewan-walrus.jpg"
  ],
  "xerus": [
    "assets/foto/hewan-xerus.jpg"
  ],
  "yuyu": [
    "assets/foto/hewan-yuyu.jpg"
  ],
  "zebra": [
    "assets/foto/hewan-zebra.jpg"
  ],
  "iguana": [
    "assets/foto/hewan-iguana.jpg"
  ],
  "ulat": [
    "assets/foto/hewan-ulat.jpg"
  ],
  "itik": [
    "assets/foto/hewan-itik.jpg"
  ],
  "entok": [
    "assets/foto/hewan-entok.jpg"
  ],
  "jalak": [
    "assets/foto/hewan-jalak.jpg"
  ],
  "walet": [
    "assets/foto/hewan-walet.jpg"
  ]
 },
};
/*POOLS_END*/

/* ------------------------------------------------------------------
   Pemenggalan suku kata, ditulis satu per satu dan bukan dihitung.

   Aturan suku kata bahasa Indonesia memang teratur, tapi kata di sini
   jumlahnya tetap dan sedikit, jadi daftar yang bisa diperiksa dengan mata
   lebih aman daripada algoritma yang sesekali memenggal "ng" atau "ny"
   di tengah. Kata yang tidak terdaftar tampil utuh sebagai satu kepingan —
   tidak pernah salah penggal, paling banter kurang membantu.
   ------------------------------------------------------------------ */
const SUKU = {
  /* benda */
  "apel":["a","pel"], "buku":["bu","ku"], "coklat":["cok","lat"],
  "donat":["do","nat"], "es krim":["es","krim"], "foto":["fo","to"],
  "gunting":["gun","ting"], "hidung":["hi","dung"], "ikan":["i","kan"],
  "jam":["jam"], "kacamata":["ka","ca","ma","ta"], "lampu":["lam","pu"],
  "madu":["ma","du"], "nasi":["na","si"], "obeng":["o","beng"],
  "payung":["pa","yung"], "quran":["qu","ran"], "roda":["ro","da"],
  "susu":["su","su"], "tahu":["ta","hu"], "uang":["u","ang"],
  "vas":["vas"], "wajan":["wa","jan"], "xilofon":["xi","lo","fon"],
  "yoyo":["yo","yo"], "zebra":["ze","bra"],

  /* hewan */
  "ayam":["a","yam"], "anjing":["an","jing"], "angsa":["ang","sa"],
  "bebek":["be","bek"], "burung":["bu","rung"], "babi":["ba","bi"],
  "buaya":["bu","a","ya"], "beruang":["be","ru","ang"], "badak":["ba","dak"],
  "belalang":["be","la","lang"], "bangau":["ba","ngau"], "belut":["be","lut"],
  "bunglon":["bung","lon"], "berang-berang":["be","rang","be","rang"],
  "cicak":["ci","cak"], "capung":["ca","pung"], "cacing":["ca","cing"],
  "cumi-cumi":["cu","mi","cu","mi"], "cendrawasih":["cen","dra","wa","sih"],
  "domba":["dom","ba"], "duyung":["du","yung"], "elang":["e","lang"],
  "enggang":["eng","gang"], "flamingo":["fla","mi","ngo"], "gajah":["ga","jah"],
  "gurita":["gu","ri","ta"], "gagak":["ga","gak"], "gorila":["go","ri","la"],
  "harimau":["ha","ri","mau"], "hiu":["hi","u"], "hamster":["ham","ster"],
  "jerapah":["je","ra","pah"], "jangkrik":["jang","krik"],
  "kucing":["ku","cing"], "kuda":["ku","da"], "kelinci":["ke","lin","ci"],
  "kambing":["kam","bing"], "kupu-kupu":["ku","pu","ku","pu"],
  "katak":["ka","tak"], "kura-kura":["ku","ra","ku","ra"], "kerbau":["ker","bau"],
  "kelelawar":["ke","le","la","war"], "kanguru":["ka","ngu","ru"],
  "koala":["ko","a","la"], "komodo":["ko","mo","do"], "lebah":["le","bah"],
  "lumba-lumba":["lum","ba","lum","ba"], "laba-laba":["la","ba","la","ba"],
  "lalat":["la","lat"], "landak":["lan","dak"], "lipan":["li","pan"],
  "monyet":["mo","nyet"], "merpati":["mer","pa","ti"], "merak":["me","rak"],
  "nyamuk":["nya","muk"], "nuri":["nu","ri"], "orangutan":["o","rang","u","tan"],
  "panda":["pan","da"], "penguin":["pe","ngu","in"], "paus":["pa","us"],
  "penyu":["pe","nyu"], "quokka":["quok","ka"], "rusa":["ru","sa"],
  "rubah":["ru","bah"], "sapi":["sa","pi"], "singa":["si","nga"],
  "semut":["se","mut"], "siput":["si","put"], "tikus":["ti","kus"],
  "tupai":["tu","pai"], "tokek":["to","kek"], "tapir":["ta","pir"],
  "trenggiling":["treng","gi","ling"], "tarsius":["tar","si","us"],
  "unta":["un","ta"], "ular":["u","lar"], "udang":["u","dang"],
  "ubur-ubur":["u","bur","u","bur"], "viper":["vi","per"],
  "walrus":["wal","rus"], "xerus":["xe","rus"], "yuyu":["yu","yu"],

  /* Kata tambahan, hasil satu putaran kurasi per huruf. Kata majemuk
     seperti "es batu" dan "ikat pinggang" ikut dipenggal utuh: yang dia
     eja bunyinya, bukan spasinya. */
  "air":["a","ir"], "api":["a","pi"], "awan":["a","wan"],
  "anggur":["ang","gur"], "alpukat":["al","pu","kat"], "atap":["a","tap"],
  "bola":["bo","la"], "bunga":["bu","nga"], "baju":["ba","ju"],
  "cangkir":["cang","kir"], "celana":["ce","la","na"], "cabai":["ca","bai"],
  "cincin":["cin","cin"], "daun":["da","un"], "dasi":["da","si"],
  "dompet":["dom","pet"], "dadu":["da","du"], "durian":["du","ri","an"],
  "danau":["da","nau"], "drum":["drum"], "ember":["em","ber"],
  "emas":["e","mas"], "embun":["em","bun"], "es batu":["es","ba","tu"],
  "eskalator":["es","ka","la","tor"], "es teh":["es","teh"], "film":["film"],
  "figura":["fi","gu","ra"], "fosil":["fo","sil"], "fajar":["fa","jar"],
  "feri":["fe","ri"], "garpu":["gar","pu"], "gitar":["gi","tar"],
  "gunung":["gu","nung"], "gelas":["ge","las"], "gigi":["gi","gi"],
  "gula":["gu","la"], "hujan":["hu","jan"], "hutan":["hu","tan"],
  "handuk":["han","duk"], "helm":["helm"],
  "helikopter":["he","li","kop","ter"], "hotel":["ho","tel"],
  "iguana":["i","gu","a","na"], "ilalang":["i","la","lang"],
  "ikat pinggang":["i","kat","ping","gang"], "itik":["i","tik"],
  "intan":["in","tan"], "jeruk":["je","ruk"], "jagung":["ja","gung"],
  "jembatan":["jem","ba","tan"], "jari":["ja","ri"], "jamur":["ja","mur"],
  "jalan":["ja","lan"], "kunci":["kun","ci"], "kursi":["kur","si"],
  "kompor":["kom","por"], "lemari":["le","ma","ri"], "lilin":["li","lin"],
  "lidah":["li","dah"], "layang-layang":["la","yang","la","yang"],
  "lemon":["le","mon"], "mangga":["mang","ga"], "mangkuk":["mang","kuk"],
  "meja":["me","ja"], "mobil":["mo","bil"], "matahari":["ma","ta","ha","ri"],
  "motor":["mo","tor"], "mawar":["ma","war"], "nanas":["na","nas"],
  "nangka":["nang","ka"], "naga":["na","ga"], "nampan":["nam","pan"],
  "nelayan":["ne","la","yan"], "nyiur":["nyi","ur"], "nugget":["nug","get"],
  "oven":["o","ven"], "obat":["o","bat"], "ombak":["om","bak"],
  "oli":["o","li"], "onde-onde":["on","de","on","de"], "okra":["ok","ra"],
  "odol":["o","dol"], "omelet":["o","me","let"], "pisang":["pi","sang"],
  "pensil":["pen","sil"], "piring":["pi","ring"], "pintu":["pin","tu"],
  "pesawat":["pe","sa","wat"], "pantai":["pan","tai"], "rumah":["ru","mah"],
  "roti":["ro","ti"], "rok":["rok"], "radio":["ra","di","o"],
  "rantai":["ran","tai"], "rumput":["rum","put"],
  "rambutan":["ram","bu","tan"], "sepatu":["se","pa","tu"],
  "sepeda":["se","pe","da"], "sendok":["sen","dok"], "sisir":["si","sir"],
  "salju":["sal","ju"], "semangka":["se","mang","ka"], "telur":["te","lur"],
  "tomat":["to","mat"], "topi":["to","pi"], "tangga":["tang","ga"],
  "ubi":["u","bi"], "ubin":["u","bin"], "ulat":["u","lat"],
  "ukulele":["u","ku","le","le"], "ulekan":["u","le","kan"],
  "vespa":["ves","pa"], "violin":["vi","o","lin"], "voli":["vo","li"],
  "wortel":["wor","tel"], "wafer":["wa","fer"],
  "wastafel":["was","ta","fel"], "waduk":["wa","duk"],
  "yogurt":["yo","gurt"], "zaitun":["zai","tun"], "zamrud":["zam","rud"],
  "entok":["en","tok"], "jalak":["ja","lak"], "walet":["wa","let"]
};

function suku(word){
  return SUKU[word] || [word];
}

/* ------------------------------------------------------------------
   Membaca dan menulis tidak menanyakan tema.

   "Mengenal hewan" dan "mengenal benda" sudah jadi dua pintu terpisah di
   menu, jadi di dalamnya tema sudah pasti. Tapi membaca dan menulis bukan
   tentang golongan katanya — yang dilatih huruf dan bunyinya. Kalau di sana
   masih ada tombol tema, itu satu keputusan tambahan yang harus dia ambil
   sebelum boleh mulai. Jadi keduanya memakai satu daftar gabungan, tanpa
   kata kembar.

   Hewan disebut duluan, baru benda. Bukan karena hewan lebih mudah dibaca,
   tapi karena hewan yang paling dia cari sendiri — dan kartu pertama yang
   dia lihat waktu satu huruf dibuka menentukan dia betah atau tidak. */
const URUT_TEMA = ["hewan", "benda"];

const SEMUA = (function(){
  const out = [];
  for (const [letter] of THEMES.benda.letters) {
    const seen = new Set(), words = [];
    for (const nama of URUT_TEMA) {
      const baris = THEMES[nama].letters.find(([l]) => l === letter);
      if (!baris) continue;
      for (const w of baris[1]) if (!seen.has(w)) { seen.add(w); words.push(w); }
    }
    out.push([letter, words]);
  }
  return out;
})();

/* Satu kata bisa datang dari tema mana pun, jadi fotonya dicari di keduanya
   dengan urutan yang sama seperti daftarnya. "ikan" dan "zebra" ada di
   dua-duanya dengan foto yang berbeda — yang ketemu duluan yang dipakai,
   supaya satu kata selalu satu rupa di seluruh aplikasi. */
function fotoDari(word){
  for (const nama of URUT_TEMA) {
    const p = POOLS[nama] && POOLS[nama][word];
    if (p && p.length) return p;
  }
  return [];
}
