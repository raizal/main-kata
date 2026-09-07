# -*- coding: utf-8 -*-
"""Percobaan kedua untuk kata yang pulang tanpa satu calon pun.

Saringan dilonggarkan: bentuk gambar tidak lagi dibatasi dan penandaan
"foto" dilepas, karena sebagian benda khas Indonesia — wayang, ondel-ondel —
hanya terarsip di Wikimedia tanpa penggolongan itu.
"""
import json, io, sys, time, urllib.parse, urllib.request
sys.path.insert(0, __file__.rsplit("\\", 1)[0].rsplit("/", 1)[0])
from cari_foto import ambil, rapikan, API, URUT
import re

GANTI = {
  "es teh": ["iced tea", "glass of tea"],
  "helm": ["helmet", "bicycle helmet"],
  "lemari": ["cupboard", "wooden cabinet furniture"],
  "nugget": ["chicken nugget", "fried nuggets food"],
  "oli": ["oil can", "engine oil bottle"],
  "ondel-ondel": ["ondel ondel", "betawi puppet jakarta"],
  "onde-onde": ["sesame ball", "jian dui sesame"],
  "rambutan": ["rambutan", "nephelium lappaceum"],
  "wayang": ["wayang", "shadow puppet indonesia"],
}

def cari(query, jumlah=4):
    p = urllib.parse.urlencode({"q": query, "page_size": 20, "license": "cc0,pdm", "mature": "false"})
    hasil = ambil(API + "?" + p)["results"]
    hasil.sort(key=lambda x: URUT.get(x.get("source"), 9))
    keluar = []
    for x in hasil:
        u = rapikan(x["url"])
        if not re.search(r"\.(jpe?g|png)($|\?)", u, re.I): continue
        keluar.append({"url": u, "judul": x.get("title", "")[:70],
                       "sumber": x.get("source"), "lisensi": x.get("license")})
        if len(keluar) >= jumlah: break
    return keluar

p = sys.argv[1]
d = json.load(open(p, encoding="utf-8"))
for k, qs in GANTI.items():
    if k not in d: continue
    for q in qs:
        c = cari(q)
        if c:
            d[k]["calon"] = c; d[k]["q"] = q
            print(k, "->", q, len(c), flush=True); break
        time.sleep(.3)
    else:
        print(k, "-> tetap kosong", flush=True)
io.open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
