# -*- coding: utf-8 -*-
"""Susun calon foto jadi satu lembar per huruf supaya bisa dilihat sekaligus.

Tiap baris satu kata, tiap kolom satu calon, dengan nomornya dicetak di
sudut. Fotonya harus dilihat mata sebelum masuk ke aplikasi: mesin pencari
tahu kata "air", tapi tidak tahu bahwa gunung es bukan yang dimaksud anak.
"""
import io, json, os, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw

CAL = json.load(open(sys.argv[1], encoding="utf-8"))
KELUAR = sys.argv[2]
CACHE = os.path.join(KELUAR, "_unduh")
os.makedirs(CACHE, exist_ok=True)
UK = 210          # sisi satu petak
KOL = 4

def unduh(u):
    nama = os.path.join(CACHE, str(abs(hash(u))) + ".img")
    if os.path.exists(nama) and os.path.getsize(nama) > 500: return nama
    try:
        r = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(r, timeout=45) as s, open(nama, "wb") as f:
            f.write(s.read())
        return nama
    except Exception:
        return None

semua = [c["url"] for k in CAL.values() for c in k["calon"]]
with ThreadPoolExecutor(12) as ex: list(ex.map(unduh, semua))

huruf = sorted({v["huruf"] for v in CAL.values()})
for h in huruf:
    kata = [k for k, v in CAL.items() if v["huruf"] == h]
    if not kata: continue
    lembar = Image.new("RGB", (UK * KOL + 150, UK * len(kata)), (245, 245, 245))
    d = ImageDraw.Draw(lembar)
    for r, k in enumerate(kata):
        d.text((8, r * UK + UK // 2), k, fill=(0, 0, 0))
        for c, cal in enumerate(CAL[k]["calon"][:KOL]):
            n = unduh(cal["url"])
            x, y = 150 + c * UK, r * UK
            if n:
                try:
                    im = Image.open(n).convert("RGB")
                    im.thumbnail((UK - 6, UK - 6))
                    lembar.paste(im, (x + 3, y + 3))
                except Exception:
                    d.text((x + 20, y + 20), "rusak", fill=(200, 0, 0))
            d.rectangle([x, y, x + UK - 1, y + UK - 1], outline=(180, 180, 180))
            d.text((x + 6, y + 6), str(c + 1), fill=(255, 0, 0))
    lembar.save(os.path.join(KELUAR, "sheet_%s.png" % h))
    print("sheet_%s.png  %d kata" % (h, len(kata)))
