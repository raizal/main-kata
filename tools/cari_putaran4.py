# -*- coding: utf-8 -*-
"""Percobaan terakhir untuk huruf yang tinggal kurang satu-dua kata."""
import json, sys, io
from cari_foto import cari

TAMBAHAN = [
    ("E", "emping",  "benda", ["melinjo crackers", "indonesian crackers snack"]),
    ("H", "helm",    "benda", ["helmet white background", "safety helmet yellow"]),
    ("H", "hadiah",  "benda", ["gift box white background", "present box ribbon isolated"]),
    ("I", "istana",  "benda", ["palace facade", "castle palace europe"]),
    ("I", "ibu",     "benda", ["mother holding baby", "mother and child portrait"]),
    ("J", "jendela", "benda", ["window shutters wall", "single window building"]),
    ("J", "jaket",   "benda", ["denim jacket white background", "jacket hanging isolated"]),
    ("O", "obor",    "benda", ["burning torch hand", "torch fire night"]),
    ("O", "odol",    "benda", ["toothpaste tube", "toothbrush toothpaste"]),
    ("O", "omelet",  "benda", ["omelette breakfast plate", "scrambled egg omelette"]),
    ("U", "ubin",    "benda", ["floor tiles pattern", "ceramic tile floor"]),
    ("V", "vitamin", "benda", ["pills capsules white", "medicine tablets"]),
    ("W", "wayang",  "benda", ["javanese puppet", "wayang golek puppet"]),
    ("W", "wijen",   "benda", ["sesame seeds", "sesame seed pile"]),
]

if __name__ == "__main__":
    keluar = sys.argv[1]
    hasil = {}
    for i, (huruf, kata, tema, kueri) in enumerate(TAMBAHAN, 1):
        calon = []
        for q in kueri:
            try:
                calon = cari(q, 4)
            except Exception as e:
                calon = []
            if calon:
                break
        print("%2d/%d %-10s -> %d" % (i, len(TAMBAHAN), kata, len(calon)))
        hasil[kata] = {"huruf": huruf, "tema": tema, "q": kueri[0],
                       "calon": [{"url": x["url"], "judul": (x.get("title") or "")[:70],
                                  "sumber": x.get("source", ""), "lisensi": x.get("license", "")}
                                 for x in calon]}
    io.open(keluar, "w", encoding="utf-8").write(json.dumps(hasil, ensure_ascii=False, indent=1))
