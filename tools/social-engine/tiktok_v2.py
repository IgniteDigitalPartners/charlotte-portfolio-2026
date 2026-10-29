"""Branded, story-style TikTok renderer for By Charlotte Smith.
Personal caption-box feel + brand frame: story progress bars, gold monogram, Charlotte's photo or a work image,
animated end card."""
import os, sys, math, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import render as R

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "brand")
W, H, FPS = 1080, 1920, 30
GOLD = (201, 164, 95); IVORY = (246, 241, 232); NOIR = (17, 16, 15); BLUSH = (236, 214, 206)

_cache = {}
def asset(name):
    if name not in _cache:
        _cache[name] = Image.open(os.path.join(IMG, name)).convert("RGBA")
    return _cache[name]

def ease(t): return 1 - (1 - min(max(t, 0), 1)) ** 3
def back(t):
    t = min(max(t, 0), 1); c = 1.7
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2

def bg(theme, seed):
    if theme == "noir":
        return R.background(int(W * 1.15), int(H * 1.15), "noir", seed=seed, glow=(0.5, 0.62)).convert("RGB")
    y, x = np.mgrid[0:int(H * 1.15), 0:int(W * 1.15)].astype(np.float32)
    t = (y / (H * 1.15))[..., None]
    a = np.array(IVORY, np.float32); b = np.array(BLUSH, np.float32)
    img = a * (1 - t) + b * t + np.random.default_rng(seed).normal(0, 2.5, (int(H * 1.15), int(W * 1.15), 1))
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))

def caption_boxes(lines, theme):
    f = R.font(R.POP_M, 56)
    out = []; y = 380
    for i, l in enumerate(lines):
        l = R.clean(l)
        for wl in R.wrap(l, f, W - 260):
            tw = f.getlength(wl); bw = int(tw + 64); bh = 96
            L = Image.new("RGBA", (bw + 20, bh + 20), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
            fill = (255, 255, 255, 248) if theme == "noir" else (20, 19, 18, 240)
            txt = (20, 20, 20) if theme == "noir" else IVORY
            d.rounded_rectangle([10, 10, 10 + bw, 10 + bh], radius=26, fill=fill)
            d.rounded_rectangle([10, 10, 22, 10 + bh], radius=6, fill=GOLD + (255,))
            d.text((10 + 38, 10 + 14), wl, font=f, fill=txt)
            out.append(dict(img=L, x=(W - bw) // 2 - 10, y=y - 10, line=i))
            y += bh + 14
        y += 18
    return out, y

def end_card(theme):
    E = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(E)
    m = R.mono(300); E.alpha_composite(m, ((W - m.width) // 2, 640))
    fg = IVORY if theme == "noir" else NOIR
    f1 = R.font(R.LORA, 70, 500); t = "Charlotte Smith"
    d.text(((W - f1.getlength(t)) / 2, 1000), t, font=f1, fill=fg)
    f2 = R.font(R.INTER_SB, 30); s = "BRAND & DIGITAL MARKETING"
    R.spaced(d, ((W - R.spaced_len(s, f2, 0.2)) / 2, 1100), s, f2, GOLD, 0.2)
    f3 = R.font(R.INTER, 34); u = "bycharlottesmith.com"
    d.text(((W - f3.getlength(u)) / 2, 1160), u, font=f3, fill=fg)
    return E

def photo_layer(name, theme):
    im = asset(name)
    if name == "charlotte_cut.png":
        im = im.crop(im.getbbox()); h = 900
        im = im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
        glow = Image.new("RGBA", (im.width + 200, im.height + 200), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow); gd.ellipse([60, 120, glow.width - 60, glow.height + 200], fill=GOLD + (90,))
        glow = glow.filter(ImageFilter.GaussianBlur(60))
        glow.alpha_composite(im, (100, 200)); return glow, "bottom"
    # work image as a framed card
    w = 900; im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    card = Image.new("RGBA", (w + 24, im.height + 24), GOLD + (255,))
    card.alpha_composite(im, (12, 12))
    mask = Image.new("L", card.size, 0); ImageDraw.Draw(mask).rounded_rectangle([0, 0, card.width, card.height], radius=34, fill=255)
    card.putalpha(mask)
    sh = Image.new("RGBA", (card.width + 80, card.height + 80), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([40, 50, card.width + 40, card.height + 50], radius=34, fill=(0, 0, 0, 110))
    sh = sh.filter(ImageFilter.GaussianBlur(22)); sh.alpha_composite(card, (40, 40))
    return sh, "card"

def render(v, out, theme, image, seed=0):
    B = bg(theme, seed)
    boxes, text_bottom = caption_boxes(v["lines"], theme)
    P, kind = photo_layer(image, theme)
    E = end_card(theme)
    nlines = len(v["lines"]); per = 1.25
    t_text = 0.9 + nlines * per; t_hold = 1.4; t_end = 2.6
    total = t_text + t_hold + t_end; n = int(total * FPS)
    segs = 3
    mono_small = R.mono(70)
    rng = np.random.default_rng(seed)
    dots = [(rng.uniform(0, W), rng.uniform(0, H), rng.uniform(2, 5), rng.uniform(0.2, 0.6), rng.uniform(0, 6.28)) for _ in range(26)]
    hand = R.font(R.INTER_SB, 30)
    fg = IVORY if theme == "noir" else NOIR
    py_base = (H - P.height - 40) if kind == "bottom" else max(text_bottom + 40, 1060)
    def frames():
        for k in range(n):
            t = k / FPS
            ox = int(40 + 40 * math.sin(t * 0.3)); oy = int(60 + 50 * math.cos(t * 0.25))
            fr = B.crop((ox, oy, ox + W, oy + H)).convert("RGBA")
            d = ImageDraw.Draw(fr)
            # drifting gold dust
            for (x0, y0, r, sp, ph) in dots:
                yy = (y0 - t * 40 * sp) % H; a = int(110 * (0.5 + 0.5 * math.sin(t * 2 + ph)))
                d.ellipse([x0 - r, yy - r, x0 + r, yy + r], fill=GOLD + (a,))
            end_a = ease((t - t_text - t_hold) / 0.6)
            main_a = 1 - end_a
            if main_a > 0:
                L = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dl = ImageDraw.Draw(L)
                # story progress bars
                prog = min(t / (t_text + t_hold), 1) * segs
                bw = (W - 80 - (segs - 1) * 10) / segs
                for s in range(segs):
                    x = 40 + s * (bw + 10)
                    dl.rounded_rectangle([x, 150, x + bw, 156], radius=3, fill=fg + (70,))
                    fill = min(max(prog - s, 0), 1)
                    if fill > 0: dl.rounded_rectangle([x, 150, x + bw * fill, 156], radius=3, fill=GOLD + (255,))
                # header: monogram + name
                L.alpha_composite(mono_small, (40, 186))
                dl.text((40 + mono_small.width + 16, 202), "charlotte", font=hand, fill=fg)
                dl.text((40 + mono_small.width + 16 + hand.getlength("charlotte") + 14, 204), "by charlotte smith", font=R.font(R.INTER, 26), fill=GOLD)
                # photo / work card
                pa = ease((t - 0.3) / 0.9)
                if pa > 0:
                    float_y = int(10 * math.sin(t * 1.2))
                    sc = 0.94 + 0.06 * pa + 0.01 * math.sin(t * 0.8)
                    Pi = P.resize((int(P.width * sc), int(P.height * sc)), Image.BILINEAR)
                    px = (W - Pi.width) // 2; py = int(py_base + (1 - pa) * 180 + float_y)
                    if pa < 1: Pi = Image.blend(Image.new("RGBA", Pi.size, (0, 0, 0, 0)), Pi, pa)
                    L.alpha_composite(Pi, (px, min(py, H - 40)) if kind == "card" else (px, py))
                # caption boxes pop in
                for b in boxes:
                    a = (t - 0.9 - b["line"] * per) / 0.35
                    if a <= 0: continue
                    s = back(a); al = ease(a)
                    im = b["img"]
                    if s != 1:
                        im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.BILINEAR)
                    if al < 1: im = Image.blend(Image.new("RGBA", im.size, (0, 0, 0, 0)), im, al)
                    L.alpha_composite(im, (int(b["x"] + (b["img"].width - im.width) / 2), int(b["y"] + (b["img"].height - im.height) / 2)))
                if main_a < 1: L = Image.blend(Image.new("RGBA", L.size, (0, 0, 0, 0)), L, main_a)
                fr.alpha_composite(L)
            if end_a > 0:
                sc = 0.9 + 0.1 * ease((t - t_text - t_hold) / 0.9)
                Ei = E.resize((int(W * sc), int(H * sc)), Image.BILINEAR)
                Ei = Image.blend(Image.new("RGBA", Ei.size, (0, 0, 0, 0)), Ei, end_a)
                fr.alpha_composite(Ei, ((W - Ei.width) // 2, (H - Ei.height) // 2))
            yield np.asarray(fr.convert("RGB"))
    R.encode(frames(), W, H, FPS, out)
    return out

PLAN = {  # date: (theme, image)
    "2026-10-30": ("noir", "charlotte_cut.png"), "2026-10-31": ("noir", "work_vertui.png"),
    "2026-11-01": ("noir", "work_vertui.png"), "2026-11-02": ("ivory", "work_maltamove.png"),
    "2026-11-03": ("noir", "charlotte_cut.png"), "2026-11-04": ("ivory", "charlotte_cut.png"),
    "2026-11-05": ("noir", "work_rockon.png"), "2026-11-06": ("ivory", "charlotte_cut.png"),
    "2026-11-07": ("noir", "charlotte_cut.png"), "2026-11-08": ("ivory", "work_vertui.png"),
    "2026-11-09": ("noir", "work_ignite.png"), "2026-11-10": ("ivory", "work_wix.png"),
    "2026-11-11": ("noir", "charlotte_cut.png"), "2026-11-12": ("ivory", "work_help.png"),
}

if __name__ == "__main__":
    import content
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for i, p in enumerate(content.P):
        if p["net"] != "tiktok": continue
        if only and only != p["date"]: continue
        th, img = PLAN.get(p["date"], ("noir", "charlotte_cut.png"))
        out = os.path.join(HERE, "out_tt", f"{p['date']}_tiktok_v2_{i:02d}.mp4")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        render(p["visual"], out, th, img, seed=i)
        print(out, flush=True)
