# -*- coding: utf-8 -*-
"""Putaran ketiga: kata tambahan untuk huruf yang daftarnya masih pendek.

Tujuannya satu, menaikkan tiap huruf ke sepuluh kata. Beberapa huruf memang
tidak akan sampai — bahasa Indonesia tidak punya sepuluh kata sehari-hari
yang berawalan Q, X, Y, atau Z — dan itu dilaporkan apa adanya, bukan
ditambal dengan kata yang tidak pernah dia dengar di rumah.
"""
import json, sys, io
from cari_foto import cari

# huruf, kata, tema, daftar kueri (dicoba berurutan sampai dapat calon)
TAMBAHAN = [
    ("C", "cincin",   "benda", ["gold ring jewelry", "wedding ring white background"]),
    ("E", "es batu",  "benda", ["ice cubes", "ice cube macro"]),
    ("F", "futsal",   "benda", ["indoor football court", "futsal ball"]),
    ("F", "flamboyan","benda", ["flame tree flowers", "delonix regia tree"]),
    ("H", "handuk",   "benda", ["bath towel folded", "stack of towels"]),
    ("H", "helm",     "benda", ["motorcycle helmet", "bicycle helmet white background"]),
    ("H", "hadiah",   "benda", ["gift box present", "wrapped present ribbon"]),
    ("I", "itik",     "hewan", ["duck swimming", "ducks pond"]),
    ("I", "intan",    "benda", ["diamond gemstone", "cut diamond white background"]),
    ("I", "istana",   "benda", ["palace building facade", "royal palace"]),
    ("J", "jendela",  "benda", ["open window house", "wooden window frame"]),
    ("J", "jangkar",  "benda", ["ship anchor", "anchor on dock"]),
    ("M", "mobil",    "benda", ["car white background", "car side view studio"]),
    ("M", "mangkuk",  "benda", ["ceramic bowl white background", "empty bowl"]),
    ("N", "nugget",   "benda", ["chicken nuggets plate", "fried nuggets"]),
    ("O", "oven",     "benda", ["kitchen oven", "oven baking bread"]),
    ("O", "obor",     "benda", ["hand torch flame", "olympic torch"]),
    ("O", "omelet",   "benda", ["omelette on plate", "fried egg omelette"]),
    ("R", "rak buku", "benda", ["bookshelf full of books", "wooden bookshelf"]),
    ("R", "rok",      "benda", ["skirt clothing white background", "pleated skirt"]),
    ("U", "ukiran",   "benda", ["wood carving relief", "carved wooden panel"]),
    ("U", "ulekan",   "benda", ["mortar and pestle stone", "stone mortar"]),
    ("V", "vitamin",  "benda", ["vitamin pills bottle", "supplement capsules"]),
    ("W", "wayang",   "benda", ["wayang kulit", "shadow puppet indonesia"]),
    ("W", "wijen",    "benda", ["sesame seeds bowl", "white sesame seeds"]),
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
                print("%2d/%d %-12s GAGAL %s" % (i, len(TAMBAHAN), kata, e))
                calon = []
            if calon:
                break
        print("%2d/%d %-12s %-34s -> %d" % (i, len(TAMBAHAN), kata, kueri[0], len(calon)))
        hasil[kata] = {
            "huruf": huruf, "tema": tema, "q": kueri[0],
            "calon": [{"url": x["url"], "judul": (x.get("title") or "")[:70],
                       "sumber": x.get("source", ""), "lisensi": x.get("license", "")}
                      for x in calon],
        }
    io.open(keluar, "w", encoding="utf-8").write(json.dumps(hasil, ensure_ascii=False, indent=1))
    print("ditulis", keluar)
