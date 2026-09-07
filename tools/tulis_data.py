# -*- coding: utf-8 -*-
"""Menuliskan kata-kata baru ke assets/data.js.

Yang disentuh cuma dua blok bertanda: THEMES di antara WORDS_START/WORDS_END
dan POOLS di antara POOLS_START/POOLS_END. Sisanya berkas itu tidak dibaca,
apalagi ditulis ulang.

Urutan kata dijaga: yang lama tetap di depan sesuai urutan aslinya, yang baru
menyusul di belakang menurut urutan daftar kurasi. Urutan itu yang dia lihat
tiap kali membuka satu huruf, jadi tidak boleh berubah-ubah tiap kali berkas
ini dijalankan lagi.
"""
import io, json, re, sys

AKAR = "D:/projects/rere/"
DATA = AKAR + "assets/data.js"
HURUF = [chr(c) for c in range(65, 91)]

def blok(teks, awal, akhir):
    a = teks.index("/*" + awal + "*/") + len(awal) + 4
    b = teks.index("/*" + akhir + "*/")
    return a, b

def baca_themes(potongan):
    """{tema: {huruf: [kata, ...]}} dari sumber JS yang bentuknya tetap."""
    hasil = {}
    tema = None
    for baris in potongan.splitlines():
        m = re.match(r'\s*(benda|hewan):\s*\{', baris)
        if m:
            tema = m.group(1); hasil[tema] = {}
            continue
        m = re.match(r'\s*\["([A-Z])",\s*\[(.*)\]\],?\s*$', baris)
        if m and tema:
            isi = re.findall(r'"([^"]+)"', m.group(2))
            hasil[tema][m.group(1)] = isi
    return hasil

def tulis_themes(pohon):
    b = ['/* Tiap huruf membawa daftar katanya sendiri, dalam urutan tetap.',
         '   Kata barunya dikurasi tangan lewat tools/kata_baru.json dan',
         '   tools/cari_putaran3.py; fotonya dipilih satu per satu dari lembar',
         '   kontak, bukan diambil dari hasil pencarian teratas begitu saja.',
         '   Dibuat oleh tools/tulis_data.py — sunting di sana, bukan di sini. */',
         'const THEMES = {']
    for tema, label in (("benda", "Benda"), ("hewan", "Hewan")):
        b.append('  %s: { label: "%s", letters: [' % (tema, label))
        baris = []
        for h in HURUF:
            kata = pohon[tema].get(h, [])
            if not kata:
                continue
            baris.append('    ["%s", [%s]]' % (h, ", ".join('"%s"' % k for k in kata)))
        b.append(",\n".join(baris))
        b.append('  ]},')
    b.append('};')
    return "\n" + "\n".join(b) + "\n"

def tulis_pools(pools):
    b = ["const POOLS = {"]
    for tema in ("benda", "hewan"):
        b.append(' "%s": {' % tema)
        isi = []
        for kata, urls in pools[tema].items():
            isi.append('  "%s": [\n%s\n  ]' % (
                kata, ",\n".join('    "%s"' % u for u in urls)))
        b.append(",\n".join(isi))
        b.append(" },")
    b.append("};")
    return "\n" + "\n".join(b) + "\n"

if __name__ == "__main__":
    baru = json.load(io.open(sys.argv[1], encoding="utf-8"))
    urutan = json.load(io.open(AKAR + "tools/urutan_baru.json", encoding="utf-8"))

    teks = io.open(DATA, encoding="utf-8").read()
    a1, b1 = blok(teks, "WORDS_START", "WORDS_END")
    a2, b2 = blok(teks, "POOLS_START", "POOLS_END")
    pohon = baca_themes(teks[a1:b1])
    mentah = re.search(r"const POOLS = (\{.*\});", teks[a2:b2], re.S).group(1)
    # Koma penutup boleh di JavaScript tapi tidak di JSON.
    pools = json.loads(re.sub(r",(\s*[}\]])", lambda m: m.group(1), mentah))

    ditambah = 0
    for kata in urutan:
        if kata not in baru:
            continue
        e = baru[kata]
        daftar = pohon[e["tema"]].setdefault(e["huruf"], [])
        if kata in daftar:
            continue
        daftar.append(kata)
        pools[e["tema"]][kata] = [e["url"]]
        ditambah += 1

    teks = (teks[:a1] + tulis_themes(pohon) + teks[b1:a2] +
            tulis_pools(pools) + teks[b2:])
    io.open(DATA, "w", encoding="utf-8", newline="\n").write(teks)

    print("kata baru ditulis:", ditambah)
    for h in HURUF:
        n = len(set(pohon["benda"].get(h, [])) | set(pohon["hewan"].get(h, [])))
        print("  %s %2d%s" % (h, n, "" if n >= 10 else "   <- kurang dari 10"))
