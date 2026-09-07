# -*- coding: utf-8 -*-
"""Hewan tambahan. Rere lebih suka hewan, jadi huruf yang daftarnya masih
pendek dicoba ditambal dengan hewan dulu, bukan benda."""
import json, sys, io
from cari_foto import cari

TAMBAHAN = [
    ("E", "entok",  "hewan", ["muscovy duck", "duck farm"]),
    ("J", "jalak",  "hewan", ["myna bird", "starling bird perched"]),
    ("W", "walet",  "hewan", ["swallow bird perched", "swift bird flying"]),
    ("I", "impala", "hewan", ["impala antelope", "antelope savanna"]),
]

if __name__ == "__main__":
    hasil = {}
    for huruf, kata, tema, kueri in TAMBAHAN:
        calon = []
        for q in kueri:
            try:
                calon = cari(q, 4)
            except Exception:
                calon = []
            if calon:
                break
        print("%-8s -> %d" % (kata, len(calon)))
        hasil[kata] = {"huruf": huruf, "tema": tema, "q": kueri[0],
                       "calon": [{"url": x["url"], "judul": (x.get("title") or "")[:70],
                                  "sumber": x.get("source", ""), "lisensi": x.get("license", "")}
                                 for x in calon]}
    io.open(sys.argv[1], "w", encoding="utf-8").write(json.dumps(hasil, ensure_ascii=False, indent=1))
