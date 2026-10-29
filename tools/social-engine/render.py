import os, re, sys, math, subprocess, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)
ATT = os.path.join(os.path.dirname(__file__), "brand") + "/"
MONO = Image.open(ATT + "monogram-metal-gold.png").convert("RGBA")
MONO = MONO.crop(MONO.getbbox())

LORA = "/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"
LORA_I = "/usr/share/fonts/truetype/google-fonts/Lora-Italic-Variable.ttf"
INTER = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"
INTER_SB = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
INTER_M = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"
POP_M = "/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"
POP_B = "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"

THEMES = {
    "noir": dict(bg=(17, 16, 15), bg2=(34, 29, 22), fg=(246, 241, 232), sub=(196, 188, 176), gold=(201, 164, 95), line=(201, 164, 95)),
    "ivory": dict(bg=(245, 240, 231), bg2=(234, 223, 204), fg=(22, 21, 20), sub=(88, 82, 74), gold=(160, 122, 58), line=(176, 141, 87)),
}

EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿️‍]")

def clean(t):
    return EMOJI.sub("", t).replace("  ", " ").strip()

_fc = {}
def font(path, size, wght=None):
    k = (path, size, wght)
    if k not in _fc:
        f = ImageFont.truetype(path, size)
        if wght:
            try: f.set_variation_by_axes([wght])
            except Exception: pass
        _fc[k] = f
    return _fc[k]

def wrap(text, f, max_w):
    out = []
    for para in text.split("\n"):
        words, line = para.split(), ""
        for w in words:
            t = (line + " " + w).strip()
            if f.getlength(t) <= max_w: line = t
            else:
                if line: out.append(line)
                line = w
        out.append(line)
    return out

def fit(text, path, max_w, max_h, start, minimum, wght=None, lh=1.15, max_lines=6):
    s = start
    while s >= minimum:
        f = font(path, s, wght)
        lines = wrap(text, f, max_w)
        h = len(lines) * s * lh
        if h <= max_h and len(lines) <= max_lines and all(f.getlength(l) <= max_w for l in lines):
            return f, lines, s
        s -= 4
    f = font(path, minimum, wght)
    return f, wrap(text, f, max_w), minimum

def background(w, h, th, seed=0, glow=(0.78, 0.18)):
    T = THEMES[th]
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    gx, gy = glow
    d = np.sqrt(((x - gx * w) / w) ** 2 + ((y - gy * h) / h) ** 2)
    t = np.clip(1 - d / 0.9, 0, 1) ** 2
    bg = np.array(T["bg"], np.float32); bg2 = np.array(T["bg2"], np.float32)
    img = bg[None, None, :] * (1 - t[..., None]) + bg2[None, None, :] * t[..., None]
    rng = np.random.default_rng(seed)
    img += rng.normal(0, 3.0, (h, w, 1))
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).convert("RGBA")

def spaced(draw, xy, text, f, fill, tracking=0.18):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch) + f.size * tracking
    return x

def spaced_len(text, f, tracking=0.18):
    return sum(f.getlength(c) + f.size * tracking for c in text)

def mono(h):
    r = h / MONO.height
    return MONO.resize((max(1, int(MONO.width * r)), int(h)), Image.LANCZOS)

def footer(img, th, pad, w, h, page=None):
    T = THEMES[th]; d = ImageDraw.Draw(img)
    m = mono(int(h * 0.05)); y = h - pad - m.height
    img.alpha_composite(m, (pad, y))
    f = font(INTER_SB, int(h * 0.0125))
    spaced(d, (pad + m.width + 22, y + m.height / 2 - f.size * 0.6), "BY CHARLOTTE SMITH", f, T["fg"], 0.22)
    f2 = font(INTER, int(h * 0.0125))
    right = page if page else "bycharlottesmith.com"
    d.text((w - pad - f2.getlength(right), y + m.height / 2 - f.size * 0.6), right, font=f2, fill=T["sub"])

def card(v, w, h, out, th=None, page=None, cta=None):
    th = th or v.get("theme", "noir")
    T = THEMES[th]
    img = background(w, h, th, seed=hash(out) % 1000)
    d = ImageDraw.Draw(img)
    pad = int(w * 0.085)
    # thin frame
    d.rectangle([pad * 0.45, pad * 0.45, w - pad * 0.45, h - pad * 0.45], outline=T["line"] + (70,), width=2)
    ey = clean(v.get("eyebrow", ""))
    top = int(h * 0.13)
    fe = font(INTER_SB, int(w * 0.022))
    spaced(d, (pad, top), ey, fe, T["gold"], 0.2)
    d.line([pad, top + fe.size * 2.2, pad + int(w * 0.12), top + fe.size * 2.2], fill=T["gold"], width=3)
    head = clean(v.get("head", ""))
    area_top = top + fe.size * 4
    max_h = h * (0.40 if h > w * 1.4 else 0.42)
    fh, lines, s = fit(head, LORA, w - 2 * pad, max_h, int(w * 0.105), int(w * 0.05), wght=500, lh=1.12)
    y = area_top
    for l in lines:
        d.text((pad, y), l, font=fh, fill=T["fg"]); y += s * 1.12
    sub = clean(v.get("sub", ""))
    if sub:
        y += s * 0.45
        fs, sl, ss = fit(sub, INTER, w - 2 * pad, h * 0.2, int(w * 0.038), int(w * 0.026), lh=1.4)
        for l in sl:
            d.text((pad, y), l, font=fs, fill=T["sub"]); y += ss * 1.4
    if cta:
        fc = font(INTER_SB, int(w * 0.034)); c = clean(cta)
        tw = spaced_len(c.upper(), fc, 0.12); bh = fc.size * 2.6
        by = h * 0.74
        d.rounded_rectangle([pad, by, pad + tw + fc.size * 2.4, by + bh], radius=bh / 2, outline=T["gold"], width=3)
        spaced(d, (pad + fc.size * 1.2, by + bh / 2 - fc.size * 0.62), c.upper(), fc, T["gold"], 0.12)
    # faint monogram watermark
    wm = mono(int(h * 0.42)); a = np.asarray(wm).copy(); a[..., 3] = (a[..., 3] * 0.07).astype(np.uint8)
    wm = Image.fromarray(a)
    if not cta: img.alpha_composite(wm, (int(w - wm.width * 0.78), int(h - wm.height - pad * 1.6)))
    footer(img, th, pad, w, h, page)
    img.convert("RGB").save(out, quality=92)
    return out

# ------------------------------------------------------------------ video
def encode(frames_iter, w, h, fps, out):
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w}x{h}", "-r", str(fps), "-i", "-",
           "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
           "-c:a", "aac", "-b:a", "64k", out]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for fr in frames_iter:
        p.stdin.write(fr.tobytes())
    p.stdin.close(); p.wait()
    assert p.returncode == 0, out

def ease(t): return 1 - (1 - min(max(t, 0), 1)) ** 3

def layer_text(text, f, fill, w, h, xy):
    L = Image.new("RGBA", (w, h), (0, 0, 0, 0)); ImageDraw.Draw(L).text(xy, text, font=f, fill=fill); return L

def check_icon(d, x, y, s, col, cross=False):
    if cross:
        d.line([x, y, x + s, y + s], fill=col, width=max(3, s // 7)); d.line([x, y + s, x + s, y], fill=col, width=max(3, s // 7))
    else:
        d.line([x, y + s * 0.55, x + s * 0.38, y + s * 0.92, x + s, y + s * 0.08], fill=col, width=max(3, s // 7), joint="curve")

def reel(v, out, fps=30):
    W, H = 1080, 1920; T = THEMES["noir"]
    bgbig = background(int(W * 1.25), int(H * 1.25), "noir", seed=7, glow=(0.7, 0.25)).convert("RGB")
    lines = [(l[0] + " " + clean(l[1:])) if l[:1] in "✓✗" else clean(l) for l in v["lines"]]
    pad = 96
    # build layers with positions
    layers = []; y = 600
    fe = font(INTER_SB, 30)
    for i, l in enumerate(lines):
        first = i == 0
        icon = None
        if l.startswith("✓") or l.startswith("✗"):
            icon = l[0]; l = l[1:].strip()
        fl, wl, s = fit(l, LORA, W - 2 * pad - (70 if icon else 0), 400, 92 if first else 78, 54, wght=600 if first else 500, lh=1.12)
        L = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
        x0 = pad + (70 if icon else 0); yy = y
        col = T["gold"] if first else T["fg"]
        if icon: check_icon(d, pad, yy + s * 0.18, int(s * 0.6), T["gold"], cross=(icon == "✗"))
        for wlx in wl:
            d.text((x0, yy), wlx, font=fl, fill=col); yy += s * 1.12
        layers.append(L); y = yy + 46
    per = 1.35; t_lines = len(lines) * per + 1.6; t_end = 3.4; total = t_lines + t_end
    # end card
    E = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(E)
    m = mono(360); E.alpha_composite(m, ((W - m.width) // 2, 560))
    endl = [clean(x) for x in v["end"].split("\n")]
    f1 = font(LORA, 64, 500); f2 = font(INTER_SB, 34)
    yy = 1010
    for i, l in enumerate(endl):
        f = f1 if i == 0 else f2; col = T["fg"] if i == 0 else T["gold"]
        txt = l if i == 0 else l.upper()
        if i == 0:
            d.text(((W - f.getlength(txt)) / 2, yy), txt, font=f, fill=col); yy += 100
        else:
            spaced(d, ((W - spaced_len(txt, f, 0.16)) / 2, yy), txt, f, col, 0.16); yy += 60
    head = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dh = ImageDraw.Draw(head)
    spaced(dh, (pad, 330), "BY CHARLOTTE SMITH", fe, T["gold"], 0.24)
    dh.line([pad, 384, pad + 120, 384], fill=T["gold"], width=3)
    n = int(total * fps)
    def frames():
        for k in range(n):
            t = k / fps
            ox = int((W * 0.25) * (0.5 + 0.5 * math.sin(t * 0.25)) * 0.6)
            oy = int((H * 0.25) * (0.5 + 0.5 * math.cos(t * 0.2)) * 0.6)
            fr = bgbig.crop((ox, oy, ox + W, oy + H)).convert("RGBA")
            if t < t_lines + 0.4:
                fade_all = 1 - ease((t - t_lines) / 0.4) if t > t_lines else 1
                hdr = ease(t / 0.6) * fade_all
                fr = Image.blend(fr, Image.alpha_composite(fr, head), hdr) if hdr > 0 else fr
                for i, L in enumerate(layers):
                    a = ease((t - 0.3 - i * per) / 0.55) * fade_all
                    if a <= 0: continue
                    dy = int((1 - a) * 40) if fade_all == 1 else 0
                    Ls = L if dy == 0 else L.transform(L.size, Image.AFFINE, (1, 0, 0, 0, 1, -dy))
                    fr = Image.blend(fr, Image.alpha_composite(fr, Ls), a)
            else:
                a = ease((t - t_lines - 0.3) / 0.8)
                fr = Image.blend(fr, Image.alpha_composite(fr, E), a)
            yield np.asarray(fr.convert("RGB"))
    encode(frames(), W, H, fps, out)
    # cover
    cov = background(W, H, "noir", seed=3).copy(); cov.alpha_composite(head)
    for L in layers: cov.alpha_composite(L)
    cov.convert("RGB").save(out.replace(".mp4", "_cover.jpg"), quality=90)
    return out

def tiktok(v, out, fps=30, seed=0):
    W, H = 1080, 1920
    rng = np.random.default_rng(seed)
    palettes = [((233, 214, 196), (205, 176, 150)), ((222, 214, 204), (186, 168, 150)), ((236, 222, 214), (206, 178, 170)), ((214, 205, 190), (172, 156, 134))]
    c1, c2 = palettes[seed % len(palettes)]
    y_, x_ = np.mgrid[0:H, 0:W].astype(np.float32)
    t_ = (y_ / H * 0.7 + x_ / W * 0.3)[..., None]
    base = np.array(c1, np.float32) * (1 - t_) + np.array(c2, np.float32) * t_
    BASE = Image.fromarray(np.clip(base + rng.normal(0, 3, (H, W, 1)), 0, 255).astype(np.uint8)).convert("RGBA")
    lines = [clean(l) for l in v["lines"]]
    f = font(POP_M, 60)
    boxes = []; y = 560
    for l in lines:
        wl = wrap(l, f, W - 260)
        for wlx in wl:
            tw = f.getlength(wlx); bw = tw + 56; bh = 92
            x = (W - bw) / 2
            L = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
            d.rounded_rectangle([x, y, x + bw, y + bh], radius=22, fill=(255, 255, 255, 245))
            d.text((x + 28, y + 12), wlx, font=f, fill=(20, 20, 20))
            boxes.append((L, len(boxes))); y += bh + 14
        y += 22
    per = 1.25; total = len(boxes) * per + 2.8
    n = int(total * fps)
    def frames():
        for k in range(n):
            t = k / fps
            fr = BASE.copy()
            for L, i in boxes:
                a = ease((t - 0.2 - i * per) / 0.35)
                if a > 0: fr = Image.blend(fr, Image.alpha_composite(fr, L), a)
            yield np.asarray(fr.convert("RGB"))
    encode(frames(), W, H, fps, out)
    return out

def build(only=None):
    import content
    manifest = []
    for i, p in enumerate(content.P):
        key = f"{p['date']}_{p['net']}_{p['fmt'].lower()}_{i:02d}"
        if only and only not in key: continue
        v = p["visual"]; files = []
        tpl = v["tpl"]
        if tpl == "post":
            files.append(card(v, 1080, 1350, f"{OUT}/{key}.jpg"))
        elif tpl == "carousel":
            n = len(v["slides"])
            for j, s in enumerate(v["slides"]):
                s = dict(s, theme=("noir" if j % 2 == 0 else "ivory") if p["net"] != "linkedin" else "noir")
                files.append(card(s, 1080, 1350, f"{OUT}/{key}_{j+1}.jpg", page=f"{j+1:02d} / {n:02d}"))
        elif tpl == "story":
            files.append(card(v, 1080, 1920, f"{OUT}/{key}.jpg", th=v.get("theme", "noir" if i % 2 else "ivory"), cta=v.get("cta")))
        elif tpl == "gbp":
            files.append(card(dict(v, theme="noir"), 1200, 900, f"{OUT}/{key}.jpg"))
        elif tpl == "reel":
            files.append(reel(v, f"{OUT}/{key}.mp4"))
        elif tpl == "tiktok":
            files.append(tiktok(v, f"{OUT}/{key}.mp4", seed=i))
        manifest.append(dict(idx=i, key=key, files=[os.path.basename(f) for f in files]))
        print(key, len(files), flush=True)
    if not only:
        json.dump(manifest, open(f"{OUT}/manifest.json", "w"), indent=1)

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else None)
