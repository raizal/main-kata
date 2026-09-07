# -*- coding: utf-8 -*-
"""Cari calon foto untuk tiap kata baru lewat Openverse.

Hanya lisensi cc0 dan pdm (domain publik) yang diambil: keduanya tidak
menuntut baris atribusi, jadi fotonya boleh menempel di halaman anak tanpa
menambah tulisan apa pun ke layar. Sumber diurutkan — stok bersih dulu,
Flickr paling belakang — karena yang dicari foto satu benda di latar polos,
bukan potret liburan orang.
"""
import json, io, re, sys, time, urllib.parse, urllib.request

API = "https://api.openverse.org/v1/images/"
URUT = {"stocksnap": 0, "rawpixel": 1, "wikimedia": 2, "nappy": 3, "flickr": 4}

def ambil(url, ulang=3):
    for i in range(ulang):
        try:
            r = urllib.request.Request(url, headers={"User-Agent": "rere-belajar/1.0"})
            return json.load(urllib.request.urlopen(r, timeout=40))
        except Exception as e:
            if i == ulang - 1: raise
            time.sleep(2 + i * 3)

def rapikan(u):
    """Berkas asli Wikimedia bisa 8000 piksel. Ubah ke URL thumbnail."""
    m = re.match(r"(https://upload\.wikimedia\.org/wikipedia/commons)/([0-9a-f])/([0-9a-f]{2})/(.+)$", u)
    if m and not m.group(4).lower().endswith(".svg"):
        return "%s/thumb/%s/%s/%s/940px-%s" % (m.group(1), m.group(2), m.group(3), m.group(4), m.group(4))
    return u

def cari(query, jumlah=4):
    p = urllib.parse.urlencode({"q": query, "page_size": 20, "license": "cc0,pdm",
                                "category": "photograph", "mature": "false",
                                "aspect_ratio": "wide,square"})
    hasil = ambil(API + "?" + p)["results"]
    hasil.sort(key=lambda x: URUT.get(x.get("source"), 9))
    keluar, dipakai = [], set()
    for x in hasil:
        u = rapikan(x["url"])
        if not re.search(r"\.(jpe?g|png)($|\?)", u, re.I): continue
        if x.get("source") in dipakai and len(dipakai) < 2: continue
        dipakai.add(x.get("source"))
        keluar.append({"url": u, "judul": x.get("title", "")[:70],
                       "sumber": x.get("source"), "lisensi": x.get("license")})
        if len(keluar) >= jumlah: break
    return keluar

if __name__ == "__main__":
    kata = json.load(open(sys.argv[1], encoding="utf-8"))
    out = {}
    for i, (huruf, k, tema, q) in enumerate(kata):
        try:
            out[k] = {"huruf": huruf, "tema": tema, "q": q, "calon": cari(q)}
            print("%3d/%d %-14s %s -> %d" % (i+1, len(kata), k, q, len(out[k]["calon"])), flush=True)
        except Exception as e:
            out[k] = {"huruf": huruf, "tema": tema, "q": q, "calon": [], "salah": str(e)}
            print("%3d/%d %-14s GAGAL %s" % (i+1, len(kata), k, e), flush=True)
        time.sleep(.3)
    io.open(sys.argv[2], "w", encoding="utf-8").write(json.dumps(out, ensure_ascii=False, indent=1))
