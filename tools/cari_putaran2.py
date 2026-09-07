# -*- coding: utf-8 -*-
"""Putaran kedua: kata yang calonnya tidak satu pun cocok.

Yang diubah cuma kata kuncinya. Putaran pertama memakai kata yang wajar
buat mesin ("keys", "roof tiles"), dan mesin menjawab dengan foto yang
memang ada kata itu di judulnya — gereja beratap genting, kucing bernama
Keys. Putaran ini menyebut bendanya seperti orang memotretnya untuk katalog:
satu benda, latar polos, tanpa cerita di sekelilingnya.
"""
import json, io, re, sys, time, urllib.parse, urllib.request
from cari_foto import ambil, rapikan, API, URUT

Q2 = {
 "api": ["bonfire flames night", "fire flame"],
 "atap": ["roof tiles texture", "terracotta roof tile"],
 "cermin": ["hand mirror", "round mirror wall"],
 "dompet": ["leather wallet money", "wallet purse"],
 "durian": ["durian", "durian fruit market"],
 "ember": ["plastic bucket", "metal bucket pail"],
 "es batu": ["ice cubes glass water", "ice cube"],
 "fosil": ["ammonite fossil", "dinosaur skeleton museum"],
 "feri": ["ferry ship harbour", "passenger ferry sea"],
 "gelas": ["empty drinking glass water", "glass of water"],
 "handuk": ["rolled towels", "white towel folded"],
 "helm": ["bicycle helmet", "construction safety helmet"],
 "helikopter": ["helicopter flying sky", "helicopter"],
 "ibu": ["mother and child", "mother baby portrait"],
 "istana": ["palace building facade", "royal palace"],
 "jendela": ["open window", "window house wall"],
 "jembatan": ["bridge over river", "suspension bridge"],
 "jaket": ["winter jacket", "denim jacket clothing"],
 "jari": ["hand fingers", "human hand palm"],
 "kunci": ["house keys keyring", "old key"],
 "kursi": ["wooden chair", "empty chair"],
 "lemari": ["wooden wardrobe", "kitchen cabinet furniture"],
 "lilin": ["burning candle", "white candle flame"],
 "mobil": ["car parked", "red car"],
 "matahari": ["sun bright sky", "sun rays"],
 "mata": ["human eye macro", "blue eye closeup"],
 "nanas": ["pineapple fruit", "pineapple whole"],
 "oven": ["kitchen oven appliance", "baking oven"],
 "obor": ["burning torch hand", "flame torch"],
 "piring": ["empty white plate", "ceramic plate"],
 "pohon": ["big tree field", "oak tree"],
 "pesawat": ["airplane flying", "commercial airplane sky"],
 "rumah": ["house exterior home", "small house"],
 "rambut": ["long hair woman", "curly hair"],
 "rok": ["skirt clothing", "pleated skirt"],
 "sepatu": ["pair of sneakers", "leather shoes"],
 "sisir": ["hair comb", "comb brush"],
 "telur": ["chicken eggs", "eggs in bowl"],
 "tas": ["backpack", "handbag bag"],
 "vitamin": ["vitamin pills bottle", "supplement capsules"],
 "voli": ["volleyball ball", "beach volleyball"],
 "wayang": ["wayang kulit", "javanese shadow puppet"],
 "zaitun": ["olives bowl", "green olives"],
}

def cari(query, jumlah=4, foto=True):
    d = {"q": query, "page_size": 20, "license": "cc0,pdm", "mature": "false"}
    if foto: d["category"] = "photograph"
    hasil = ambil(API + "?" + urllib.parse.urlencode(d))["results"]
    hasil.sort(key=lambda x: URUT.get(x.get("source"), 9))
    keluar = []
    for x in hasil:
        u = rapikan(x["url"])
        if not re.search(r"\.(jpe?g|png)($|\?)", u, re.I): continue
        keluar.append({"url": u, "judul": (x.get("title") or "")[:70],
                       "sumber": x.get("source"), "lisensi": x.get("license")})
        if len(keluar) >= jumlah: break
    return keluar

p = sys.argv[1]
d = json.load(open(p, encoding="utf-8"))
for k, qs in Q2.items():
    calon = []
    for q in qs:
        for foto in (True, False):
            c = cari(q, 4, foto)
            for x in c:
                if x["url"] not in {y["url"] for y in calon}: calon.append(x)
            if len(calon) >= 4: break
            time.sleep(.2)
        if len(calon) >= 4: break
    d[k]["calon"] = calon[:4]; d[k]["q"] = qs[0]
    print("%-14s %d" % (k, len(calon)), flush=True)
io.open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
