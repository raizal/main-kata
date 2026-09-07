# -*- coding: utf-8 -*-
"""Menurunkan semua foto ke assets/foto/ dan mengarahkan POOLS ke sana.

Sebelumnya 235 foto dipanggil langsung dari enam server luar. Artinya dua
hal: tanpa sinyal aplikasinya jadi huruf tanpa gambar — di mobil, di ruang
tunggu — dan satu foto yang dihapus di sana jadi kotak kosong di sini tanpa
ada yang tahu. Sekarang fotonya ikut di dalam berkas aplikasi.

Dikecilkan ke 800px sisi panjang: layar terlebar yang dipakai memasangnya di
bawah 430px, jadi 800 sudah dua kali lipat titik piksel layar rapat dan
sisanya cuma menambah berat.

Aman dijalankan ulang: yang sudah berupa berkas lokal dilewati, dan URL asal
tiap foto disimpan di tools/foto.json supaya sumbernya tidak hilang.
"""
import io, json, os, re, unicodedata, urllib.request

from PIL import Image

AKAR  = "D:/projects/rere/"
DATA  = AKAR + "assets/data.js"
FOTO  = AKAR + "assets/foto/"
PETA  = AKAR + "tools/foto.json"
LEBAR = 800
MUTU  = 80
KERTAS = (250, 248, 245)
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def slug(teks):
    t = unicodedata.normalize("NFKD", teks).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def unduh(url):
    permintaan = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(permintaan, timeout=60) as r:
        return r.read()


def simpan(mentah, tujuan):
    im = Image.open(io.BytesIO(mentah))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        alas = Image.new("RGB", im.size, KERTAS)
        alas.paste(im, mask=im.split()[-1])
        im = alas
    else:
        im = im.convert("RGB")
    im.thumbnail((LEBAR, LEBAR), Image.LANCZOS)
    im.save(tujuan, "JPEG", quality=MUTU, optimize=True, progressive=True)


def main():
    if not os.path.isdir(FOTO):
        os.makedirs(FOTO)
    peta = {}
    if os.path.exists(PETA):
        peta = json.load(io.open(PETA, encoding="utf-8"))

    teks = io.open(DATA, encoding="utf-8").read()
    a = teks.index("/*POOLS_START*/")
    b = teks.index("/*POOLS_END*/")
    baris = teks[a:b].split("\n")

    tema, kata, urut = None, None, 0
    gagal = []
    for i, b1 in enumerate(baris):
        m = re.match(r'\s"(benda|hewan)": \{', b1)
        if m:
            tema = m.group(1)
            continue
        m = re.match(r'\s\s"([^"]+)": \[', b1)
        if m:
            kata, urut = m.group(1), 0
            continue
        m = re.match(r'(\s*)"(https?://[^"]+)"(,?)\s*$', b1)
        if not m or not tema or not kata:
            continue
        urut += 1
        nama = "%s-%s%s.jpg" % (tema, slug(kata), "" if urut == 1 else "-%d" % urut)
        tujuan = FOTO + nama
        if not os.path.exists(tujuan):
            try:
                simpan(unduh(m.group(2)), tujuan)
            except Exception as e:
                gagal.append((kata, str(e)[:60]))
                continue
        peta[nama] = m.group(2)
        baris[i] = '%s"assets/foto/%s"%s' % (m.group(1), nama, m.group(3))
        print(nama, flush=True)

    io.open(DATA, "w", encoding="utf-8", newline="").write(
        teks[:a] + "\n".join(baris) + teks[b:])
    json.dump(peta, io.open(PETA, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1, sort_keys=True)
    print("selesai:", len(peta), "foto; gagal:", len(gagal))
    for g in gagal:
        print("  GAGAL", g[0], g[1])


main()
