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
    "https://images.pexels.com/photos/7333124/pexels-photo-7333124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "buku": [
    "https://images.pexels.com/photos/10946433/pexels-photo-10946433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "coklat": [
    "https://images.pexels.com/photos/6167328/pexels-photo-6167328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "donat": [
    "https://images.pexels.com/photos/23203365/pexels-photo-23203365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "es krim": [
    "https://images.pexels.com/photos/5061019/pexels-photo-5061019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "foto": [
    "https://images.pexels.com/photos/15585620/pexels-photo-15585620.png?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "gunting": [
    "https://images.pexels.com/photos/8250803/pexels-photo-8250803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "hidung": [
    "https://images.pexels.com/photos/7298697/pexels-photo-7298697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "ikan": [
    "https://images.pexels.com/photos/4593110/pexels-photo-4593110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "jam": [
    "https://images.pexels.com/photos/15797564/pexels-photo-15797564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kacamata": [
    "https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "lampu": [
    "https://images.pexels.com/photos/17994856/pexels-photo-17994856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "madu": [
    "https://images.pexels.com/photos/5634212/pexels-photo-5634212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "nasi": [
    "https://images.pexels.com/photos/8956718/pexels-photo-8956718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "obeng": [
    "https://images.pexels.com/photos/5583097/pexels-photo-5583097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "payung": [
    "https://images.pexels.com/photos/7140708/pexels-photo-7140708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "quran": [
    "https://images.pexels.com/photos/14743719/pexels-photo-14743719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "roda": [
    "https://images.pexels.com/photos/34357287/pexels-photo-34357287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "susu": [
    "https://images.pexels.com/photos/4324359/pexels-photo-4324359.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tahu": [
    "https://images.pexels.com/photos/11663140/pexels-photo-11663140.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "uang": [
    "https://images.pexels.com/photos/6927371/pexels-photo-6927371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "vas": [
    "https://images.pexels.com/photos/30555647/pexels-photo-30555647.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "wajan": [
    "https://images.pexels.com/photos/10936545/pexels-photo-10936545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "xilofon": [
    "https://images.pexels.com/photos/6637619/pexels-photo-6637619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "yoyo": [
    "https://images.pexels.com/photos/5454342/pexels-photo-5454342.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "zebra": [
    "https://images.pexels.com/photos/35725386/pexels-photo-35725386.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "air": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMTkxNDg1LWltYWdlLWt3dnkxMG1xLmpwZw.jpg"
  ],
  "api": [
    "https://cdn.stocksnap.io/img-thumbs/960w/0G7N1L3G2F.jpg"
  ],
  "awan": [
    "https://cdn.stocksnap.io/img-thumbs/960w/ERWF7IMSRX.jpg"
  ],
  "anggur": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3Vwd2s2MjE4MDMwMS13aWtpbWVkaWEtaW1hZ2Uta293bmEwNzUuanBn.jpg"
  ],
  "alpukat": [
    "https://cdn.stocksnap.io/img-thumbs/960w/GM3FAABVJ8.jpg"
  ],
  "atap": [
    "https://cdn.stocksnap.io/img-thumbs/960w/JKPSQFD1JX.jpg"
  ],
  "bola": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2lzMTMxMDUtaW1hZ2Uta3d2d3NodXUuanBn.jpg"
  ],
  "bunga": [
    "https://cdn.stocksnap.io/img-thumbs/960w/YRHRKRPJMS.jpg"
  ],
  "baju": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvYnMzMzItaW1hZ2Uta3d2eW43eGkuanBn.jpg"
  ],
  "cangkir": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMxNzgzMS1pbWFnZS1rd3lzYTVvcy5qcGc.jpg"
  ],
  "celana": [
    "https://cdn.stocksnap.io/img-thumbs/960w/QBSVGRFT2Y.jpg"
  ],
  "cabai": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4MTA0ODY2Ni1pbWFnZS1rd3Z3Zjg1My5qcGc.jpg"
  ],
  "daun": [
    "https://live.staticflickr.com/65535/52416444062_39f6ee0e89_b.jpg"
  ],
  "dasi": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJidXNpbmVzc21hbl9wcm9mZXNzaW9uX3dvcmt3ZWFyXzY3NjM2My1pbWFnZS1reWJlM3gxdS5qcGc.jpg"
  ],
  "dompet": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg5MjczMzEtaW1hZ2Uta3d5bzFudWwuanBn.jpg"
  ],
  "dadu": [
    "https://cdn.stocksnap.io/img-thumbs/960w/IMUB39JBN1.jpg"
  ],
  "durian": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL2xyL3djczk0eGJtdnktaW1hZ2UuanBn.jpg"
  ],
  "danau": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvc2szMDQ2LWltYWdlLWt3eW5wcHp6LmpwZw.jpg"
  ],
  "drum": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxNTY2MDU1LWltYWdlLWt3dnh2anhtLmpwZw.jpg"
  ],
  "ember": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvYnMxNDI4LWltYWdlLWt3eXQ4YmRrLmpwZw.jpg"
  ],
  "emas": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL21ldDI0MzU0Ni1pbWFnZS5qcGc.jpg"
  ],
  "embun": [
    "https://cdn.stocksnap.io/img-thumbs/960w/YYLGRHEGST.jpg"
  ],
  "es batu": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMjU5MDA5LWltYWdlLWt3dnkwMXJnLmpwZw.jpg"
  ],
  "eskalator": [
    "https://live.staticflickr.com/65535/51971780456_a2d4c708cf_b.jpg"
  ],
  "es teh": [
    "https://live.staticflickr.com/43/79456295_3bc9d3dad5_b.jpg"
  ],
  "film": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL2ZyYWJnZXdpY2tlbHRfZW50d2lja2VsdC1pbWFnZS5qcGc.jpg"
  ],
  "figura": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4OTUwNjgwLWltYWdlLWt3dnVvbWZiLmpwZw.jpg"
  ],
  "fosil": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2xyL3drMjQ1NTcyNzQtaW1hZ2UuanBn.jpg"
  ],
  "fajar": [
    "https://cdn.stocksnap.io/img-thumbs/960w/IJWWZE99HS.jpg"
  ],
  "feri": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmwxNjExNzczMjQ3MC1pbWFnZS1rdHhwZDY1ai5qcGc.jpg"
  ],
  "garpu": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4OTE4OTI3LWltYWdlLWt3dnVyZHVoLmpwZw.jpg"
  ],
  "gitar": [
    "https://cdn.stocksnap.io/img-thumbs/960w/HP2GGWWPIN.jpg"
  ],
  "gunung": [
    "https://live.staticflickr.com/65535/51537246564_4d6e3ea0fd_b.jpg"
  ],
  "gelas": [
    "https://cdn.thingiverse.com/renders/6f/3b/d5/4f/d4/4ff4661ae505d6dd8fcebf4c1d2a20cf_display_large.jpg"
  ],
  "gigi": [
    "https://live.staticflickr.com/65535/48019458508_790687525b.jpg"
  ],
  "gula": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4OTIwMDkyLWltYWdlLWt3dnVza3ZuLmpwZw.jpg"
  ],
  "hujan": [
    "https://cdn.stocksnap.io/img-thumbs/960w/A3GM7T9ZDV.jpg"
  ],
  "hutan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4NjMyOTEwLWltYWdlLWt3dnY4OXFzLmpwZw.jpg"
  ],
  "handuk": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg2NTQ2ODUtaW1hZ2Uta3d2eGw4bzAuanBn.jpg"
  ],
  "helikopter": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA1L2ZsNTIzNTg4Mzk1MDUtaW1hZ2UuanBn.jpg"
  ],
  "hotel": [
    "https://cdn.stocksnap.io/img-thumbs/960w/RWAH1RGKQJ.jpg"
  ],
  "ilalang": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4Nzc1NDIwLWltYWdlLWt3dnYyMmVmLmpwZw.jpg"
  ],
  "ikat pinggang": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZyYmVsdHNfbGVhdGhlcl9idWNrbGVfbWV0YWwtaW1hZ2Uta3liZThkNTMuanBn.jpg"
  ],
  "jeruk": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvbnMyOTEtaW1hZ2Uta3d5cnd5NHAuanBn.jpg"
  ],
  "jagung": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg3MjQxNjktaW1hZ2Uta3d2eGlmMXEuanBn.jpg"
  ],
  "jembatan": [
    "https://live.staticflickr.com/65535/54896067535_9d12801a1d_b.jpg"
  ],
  "jari": [
    "https://cdn.stocksnap.io/img-thumbs/960w/Z8IUUHKPTA.jpg"
  ],
  "jamur": [
    "https://live.staticflickr.com/65535/52129861618_04552c5bd5_b.jpg"
  ],
  "jalan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3Nta2ttczcxMDUtaW1hZ2UuanBn.jpg"
  ],
  "kunci": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJrZXlfb2xkX2Nsb3NlX3J1c3RlZF8wLWltYWdlLWt5YmRjcDV4LmpwZw.jpg"
  ],
  "kursi": [
    "https://cdn.stocksnap.io/img-thumbs/960w/0DH6S6OU6Q.jpg"
  ],
  "kompor": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMTU5NTQzLWltYWdlLWt3dnk1NmsxLmpwZw.jpg"
  ],
  "lemari": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQxMDktcGRvYmowMTI3Mi1pbWFnZS5qcGc.jpg"
  ],
  "lilin": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJjYW5kbGVzX2NhbmRsZV93YXhfbGlnaHQtaW1hZ2Uta3liZTR4YWEuanBn.jpg"
  ],
  "lidah": [
    "https://live.staticflickr.com/65535/55231884897_4474e7ac40_b.jpg"
  ],
  "layang-layang": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3N2MjE3Mzk3LWltYWdlLWt3dnVibnVvLmpwZw.jpg"
  ],
  "lemon": [
    "https://cdn.stocksnap.io/img-thumbs/960w/W28QPZPAK6.jpg"
  ],
  "mangga": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJtYW5nb19mcnVpdF9mb29kXzg5NjE4MC1pbWFnZS1reWJkOHI5cC5qcGc.jpg"
  ],
  "meja": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL2xyL2dldHR5MTA3dmhwLWltYWdlLmpwZw.jpg"
  ],
  "mobil": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZyY2FyX3doaXRlX2NsYXNzaWNfaGRyLWltYWdlLWt5YmUyNjJqLmpwZw.jpg"
  ],
  "matahari": [
    "https://cdn.stocksnap.io/img-thumbs/960w/5IBGRKHDHQ.jpg"
  ],
  "motor": [
    "https://cdn.stocksnap.io/img-thumbs/960w/1ES1UBPHYX.jpg"
  ],
  "mawar": [
    "https://cdn.stocksnap.io/img-thumbs/960w/ZNN96DDKLT.jpg"
  ],
  "nanas": [
    "https://cdn.stocksnap.io/img-thumbs/960w/A7Z4GHXHSB.jpg"
  ],
  "nangka": [
    "https://inaturalist-open-data.s3.amazonaws.com/photos/263717858/original.jpeg"
  ],
  "naga": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4MTAxODA3MS1pbWFnZS1rd3Z3ZXR4NS5qcGc.jpg"
  ],
  "nampan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL2NsZTE5OTEtLTYyLWltYWdlLmpwZw.jpg"
  ],
  "nelayan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4OTk3MzY4LWltYWdlLWt3dnVwZmF6LmpwZw.jpg"
  ],
  "nyiur": [
    "https://live.staticflickr.com/65535/52188290516_31cafdf12e_b.jpg"
  ],
  "nugget": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMxMTY3Mi1pbWFnZS1rd3lzZnppaC5qcGc.jpg"
  ],
  "oven": [
    "https://cdn.stocksnap.io/img-thumbs/960w/BE0UGGW85Y.jpg"
  ],
  "obat": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMxNzE0OS1pbWFnZS1rd3lzY2hkbi5qcGc.jpg"
  ],
  "ombak": [
    "https://live.staticflickr.com/65535/52339337703_b0eb48b17c_b.jpg"
  ],
  "oli": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvc2syNzkwLWltYWdlLWt3dng5dGljLmpwZw.jpg"
  ],
  "onde-onde": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZycnVtX2JhbGxzX3B1bmNoX2JhbGwtaW1hZ2Uta3liYXJybzUuanBn.jpg"
  ],
  "okra": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Vwd2s2MTY2NTIyMC13aWtpbWVkaWEtaW1hZ2Uta293cmMweXIuanBn.jpg"
  ],
  "pisang": [
    "https://cdn.stocksnap.io/img-thumbs/960w/D0C5D92CD9.jpg"
  ],
  "pensil": [
    "https://cdn.stocksnap.io/img-thumbs/960w/UYKW8TJK1Z.jpg"
  ],
  "piring": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4MjYyNzQtaW1hZ2Uta3d5b2dlc2suanBn.jpg"
  ],
  "pintu": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3N2MTk3ODI5LWltYWdlLWt3dnVocjBoLmpwZw.jpg"
  ],
  "pesawat": [
    "https://cdn.stocksnap.io/img-thumbs/960w/5TOQESCBWY.jpg"
  ],
  "pantai": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg0OTQ3MTAtaW1hZ2Uta3d2dmU2dm8uanBn.jpg"
  ],
  "rumah": [
    "https://cdn.stocksnap.io/img-thumbs/960w/LJ515CPAKI.jpg"
  ],
  "roti": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZyYXNpYV90YWl3YW5fYnJlYWRfZ3JhaW5zLWltYWdlLWt5YmM3MzZsLmpwZw.jpg"
  ],
  "rok": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3L21pYTI4MTA0LWltYWdlLmpwZw.jpg"
  ],
  "radio": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJvbGRfcmFkaW9fb2xkX3ZhbHZlcy1pbWFnZS1reWJkNWJoYy5qcGc.jpg"
  ],
  "rantai": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL2xyL2dldHR5MTAzeGsyLWltYWdlLmpwZw.jpg"
  ],
  "rumput": [
    "https://live.staticflickr.com/65535/52748935722_52ef38114b_b.jpg"
  ],
  "rambutan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4MTMzNzc1My1pbWFnZS1rd3Z3MnVpdi5qcGc.jpg"
  ],
  "sepatu": [
    "https://cdn.stocksnap.io/img-thumbs/960w/U20YIXFQBC.jpg"
  ],
  "sepeda": [
    "https://live.staticflickr.com/65535/48019235328_40826dffdd_b.jpg"
  ],
  "sendok": [
    "https://cdn.stocksnap.io/img-thumbs/960w/CX92JSDG32.jpg"
  ],
  "sisir": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA5L21ldDE2ODA5LWltYWdlLmpwZw.jpg"
  ],
  "salju": [
    "https://live.staticflickr.com/65535/52598616516_3e16bb3fa5_b.jpg"
  ],
  "semangka": [
    "https://cdn.stocksnap.io/img-thumbs/960w/30C9EB71DC.jpg"
  ],
  "telur": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg2NDMzOTAtaW1hZ2Uta3d2djlxaGcuanBn.jpg"
  ],
  "tomat": [
    "https://cdn.stocksnap.io/img-thumbs/960w/GB9LU1L8RG.jpg"
  ],
  "topi": [
    "https://cdn.stocksnap.io/img-thumbs/960w/QIJ4BAZL2D.jpg"
  ],
  "tangga": [
    "https://live.staticflickr.com/65535/52335189432_bf1b3995c4_b.jpg"
  ],
  "ubi": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHUyMzMzNDc0LWltYWdlLWt3dndqd2RtLmpwZw.jpg"
  ],
  "ukulele": [
    "https://cdn.stocksnap.io/img-thumbs/960w/5ZPN66JSA4.jpg"
  ],
  "vespa": [
    "https://cdn.stocksnap.io/img-thumbs/960w/P2IIDP6UPD.jpg"
  ],
  "violin": [
    "https://cdn.stocksnap.io/img-thumbs/960w/ULXETLYBDM.jpg"
  ],
  "voli": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJiYWxsX2JlYWNoX3NreV9zZWEtaW1hZ2Uta3liZWFwNWIuanBn.jpg"
  ],
  "wortel": [
    "https://cdn.stocksnap.io/img-thumbs/960w/RKHZEX3629.jpg"
  ],
  "wafer": [
    "https://live.staticflickr.com/65535/55168894993_c7804d7d5e_b.jpg"
  ],
  "wastafel": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmw0MTI1ODM0NDE1Mi1pbWFnZS1reWJlaWo2Yi5qcGc.jpg"
  ],
  "waduk": [
    "https://live.staticflickr.com/65535/52958214839_0d13c8af9c_b.jpg"
  ],
  "yogurt": [
    "https://cdn.stocksnap.io/img-thumbs/960w/ELZKUZYJK0.jpg"
  ],
  "zaitun": [
    "https://cdn.stocksnap.io/img-thumbs/960w/VUAQNMLAPF.jpg"
  ],
  "zamrud": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL21ldDI1MzUzNi1pbWFnZS5qcGc.jpg"
  ],
  "cincin": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL21ldDI0MzU0Ni1pbWFnZS5qcGc.jpg"
  ],
  "intan": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL2xyL3JpamtzbmctYy0yMDAwLTMtaW1hZ2UuanBn.jpg"
  ],
  "mangkuk": [
    "https://cdn.stocksnap.io/img-thumbs/960w/GAMHRIGNDW.jpg"
  ],
  "ulekan": [
    "https://live.staticflickr.com/65535/54877133737_8062e67175_b.jpg"
  ],
  "helm": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvc3YxNTQwMjMtaW1hZ2Uta3d2dWg4bXUuanBn.jpg"
  ],
  "odol": [
    "https://cdn.stocksnap.io/img-thumbs/960w/UD9953XS1H.jpg"
  ],
  "omelet": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4Nzc4NDM2LWltYWdlLWt3dnYycmFrLmpwZw.jpg"
  ],
  "ubin": [
    "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9zdGF0aWMvZmlsZXMvd2Vic2l0ZS8yMDIzLTExL21ldDE4NzkzNi1pbWFnZS5qcGc.jpg"
  ]
 },
 "hewan": {
  "ayam": [
    "https://images.pexels.com/photos/38365059/pexels-photo-38365059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "anjing": [
    "https://images.pexels.com/photos/30074125/pexels-photo-30074125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "angsa": [
    "https://images.pexels.com/photos/29793056/pexels-photo-29793056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "bebek": [
    "https://images.pexels.com/photos/27565478/pexels-photo-27565478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "burung": [
    "https://images.pexels.com/photos/20124080/pexels-photo-20124080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "babi": [
    "https://images.pexels.com/photos/37073014/pexels-photo-37073014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "buaya": [
    "https://images.pexels.com/photos/6407978/pexels-photo-6407978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "beruang": [
    "https://images.pexels.com/photos/37533536/pexels-photo-37533536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "badak": [
    "https://images.pexels.com/photos/29156999/pexels-photo-29156999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "belalang": [
    "https://images.pexels.com/photos/7987527/pexels-photo-7987527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "bangau": [
    "https://images.pexels.com/photos/36156216/pexels-photo-36156216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "belut": [
    "https://images.pexels.com/photos/17088606/pexels-photo-17088606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "bunglon": [
    "https://images.pexels.com/photos/53971/chameleon-parduckameleon-furcifer-pardalis-reptile-53971.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "berang-berang": [
    "https://images.pexels.com/photos/12305419/pexels-photo-12305419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "cicak": [
    "https://images.pexels.com/photos/29979168/pexels-photo-29979168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "capung": [
    "https://images.pexels.com/photos/18151389/pexels-photo-18151389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "cacing": [
    "https://images.pexels.com/photos/4386491/pexels-photo-4386491.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "cumi-cumi": [
    "https://images.pexels.com/photos/10377019/pexels-photo-10377019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "cendrawasih": [
    "https://images.pexels.com/photos/29388658/pexels-photo-29388658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "domba": [
    "https://images.pexels.com/photos/32367317/pexels-photo-32367317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "duyung": [
    "https://images.pexels.com/photos/13277594/pexels-photo-13277594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "elang": [
    "https://images.pexels.com/photos/38204263/pexels-photo-38204263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "enggang": [
    "https://images.pexels.com/photos/37650991/pexels-photo-37650991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "flamingo": [
    "https://images.pexels.com/photos/30597934/pexels-photo-30597934.png?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "gajah": [
    "https://images.pexels.com/photos/17081254/pexels-photo-17081254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "gurita": [
    "https://images.pexels.com/photos/18573919/pexels-photo-18573919.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "gagak": [
    "https://images.pexels.com/photos/18051324/pexels-photo-18051324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "gorila": [
    "https://images.pexels.com/photos/36804633/pexels-photo-36804633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "harimau": [
    "https://images.pexels.com/photos/36530920/pexels-photo-36530920.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "hiu": [
    "https://images.pexels.com/photos/13476998/pexels-photo-13476998.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "hamster": [
    "https://images.pexels.com/photos/28749492/pexels-photo-28749492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "ikan": [
    "https://images.pexels.com/photos/886210/pexels-photo-886210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "jerapah": [
    "https://images.pexels.com/photos/31030732/pexels-photo-31030732.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "jangkrik": [
    "https://images.pexels.com/photos/26447247/pexels-photo-26447247.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kucing": [
    "https://images.pexels.com/photos/33819083/pexels-photo-33819083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kuda": [
    "https://images.pexels.com/photos/13340061/pexels-photo-13340061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kelinci": [
    "https://images.pexels.com/photos/35983095/pexels-photo-35983095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kambing": [
    "https://images.pexels.com/photos/32655845/pexels-photo-32655845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kupu-kupu": [
    "https://images.pexels.com/photos/18536541/pexels-photo-18536541.png?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "katak": [
    "https://images.pexels.com/photos/17506297/pexels-photo-17506297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kura-kura": [
    "https://images.pexels.com/photos/31219119/pexels-photo-31219119.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kerbau": [
    "https://images.pexels.com/photos/19848150/pexels-photo-19848150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kelelawar": [
    "https://images.pexels.com/photos/12453386/pexels-photo-12453386.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "kanguru": [
    "https://images.pexels.com/photos/27110776/pexels-photo-27110776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "koala": [
    "https://images.pexels.com/photos/14971555/pexels-photo-14971555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "komodo": [
    "https://images.pexels.com/photos/34189978/pexels-photo-34189978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "lebah": [
    "https://images.pexels.com/photos/27418555/pexels-photo-27418555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "lumba-lumba": [
    "https://images.pexels.com/photos/11342081/pexels-photo-11342081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "laba-laba": [
    "https://images.pexels.com/photos/10520634/pexels-photo-10520634.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "lalat": [
    "https://images.pexels.com/photos/19816317/pexels-photo-19816317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "landak": [
    "https://images.pexels.com/photos/13044549/pexels-photo-13044549.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "lipan": [
    "https://images.pexels.com/photos/32543475/pexels-photo-32543475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "monyet": [
    "https://images.pexels.com/photos/13272459/pexels-photo-13272459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "merpati": [
    "https://images.pexels.com/photos/6438048/pexels-photo-6438048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "merak": [
    "https://images.pexels.com/photos/23354936/pexels-photo-23354936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "nyamuk": [
    "https://images.pexels.com/photos/1685610/pexels-photo-1685610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "nuri": [
    "https://images.pexels.com/photos/17817260/pexels-photo-17817260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "orangutan": [
    "https://images.pexels.com/photos/10971036/pexels-photo-10971036.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "panda": [
    "https://images.pexels.com/photos/31047125/pexels-photo-31047125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "penguin": [
    "https://images.pexels.com/photos/31791288/pexels-photo-31791288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "paus": [
    "https://images.pexels.com/photos/4781925/pexels-photo-4781925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "penyu": [
    "https://images.pexels.com/photos/5967753/pexels-photo-5967753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "quokka": [
    "https://images.pexels.com/photos/30652256/pexels-photo-30652256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "rusa": [
    "https://images.pexels.com/photos/20489124/pexels-photo-20489124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "rubah": [
    "https://images.pexels.com/photos/23914490/pexels-photo-23914490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "sapi": [
    "https://images.pexels.com/photos/27896657/pexels-photo-27896657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "singa": [
    "https://images.pexels.com/photos/14855062/pexels-photo-14855062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "semut": [
    "https://images.pexels.com/photos/20724883/pexels-photo-20724883.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "siput": [
    "https://images.pexels.com/photos/36919759/pexels-photo-36919759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tikus": [
    "https://images.pexels.com/photos/9980949/pexels-photo-9980949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tupai": [
    "https://images.pexels.com/photos/32848285/pexels-photo-32848285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tokek": [
    "https://images.pexels.com/photos/38347001/pexels-photo-38347001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tapir": [
    "https://images.pexels.com/photos/15544997/pexels-photo-15544997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "trenggiling": [
    "https://images.pexels.com/photos/31391630/pexels-photo-31391630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "tarsius": [
    "https://images.pexels.com/photos/15289296/pexels-photo-15289296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "unta": [
    "https://images.pexels.com/photos/3788/animal-wilderness-zoo-camel.jpg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "ular": [
    "https://images.pexels.com/photos/28578838/pexels-photo-28578838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "udang": [
    "https://images.pexels.com/photos/16521533/pexels-photo-16521533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "ubur-ubur": [
    "https://images.pexels.com/photos/27555660/pexels-photo-27555660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "viper": [
    "https://images.pexels.com/photos/8807543/pexels-photo-8807543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "walrus": [
    "https://images.pexels.com/photos/12073523/pexels-photo-12073523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "xerus": [
    "https://images.pexels.com/photos/33144154/pexels-photo-33144154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "yuyu": [
    "https://images.pexels.com/photos/31764068/pexels-photo-31764068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "zebra": [
    "https://images.pexels.com/photos/26954301/pexels-photo-26954301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  ],
  "iguana": [
    "https://cdn.stocksnap.io/img-thumbs/960w/B98D652C09.jpg"
  ],
  "ulat": [
    "https://live.staticflickr.com/65535/51328606729_af2bc5c609_b.jpg"
  ],
  "itik": [
    "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJkdWNrX2xha2Vfd2F0ZXJfYmlyZF8xLWltYWdlLWt5YmRyNG1vLmpwZw.jpg"
  ],
  "entok": [
    "https://live.staticflickr.com/65535/51774810023_64734b4356_b.jpg"
  ],
  "jalak": [
    "https://cdn.stocksnap.io/img-thumbs/960w/SBWPAPFGLI.jpg"
  ],
  "walet": [
    "https://live.staticflickr.com/65535/53827703196_d325b1c043_b.jpg"
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
