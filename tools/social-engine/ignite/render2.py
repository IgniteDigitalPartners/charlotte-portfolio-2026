"""Ignite Digital Partners v2 renderer: the website's fire/network hero imagery as full-bleed backgrounds,
founder photo with orange glow, Ignition Loop diagram, Poppins Bold headlines, animated stories and reels with rising embers."""
import os, sys, math, json, re, datetime
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import render as R

HERE = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(HERE, "brand")
OUT = os.path.join(HERE, "out2")
os.makedirs(OUT, exist_ok=True)
ORANGE = (247, 147, 30); BLACK = (8, 8, 8); WHITE = (245, 242, 236)
TH = {
    "dark": dict(fg=WHITE, sub=(206, 200, 192), acc=ORANGE, line=ORANGE),
    "orange": dict(fg=(10, 10, 10), sub=(44, 24, 8), acc=(10, 10, 10), line=(10, 10, 10)),
}
def T_of(spec): return TH["orange"] if spec == "orange" else TH["dark"]

_c = {}
def load(name):
    if name not in _c: _c[name] = Image.open(os.path.join(B, name)).convert("RGBA")
    return _c[name]

def cover(im, w, h, ax=0.5, ay=0.5):
    r = max(w / im.width, h / im.height)
    im = im.resize((math.ceil(im.width * r), math.ceil(im.height * r)), Image.LANCZOS)
    x = int((im.width - w) * ax); y = int((im.height - h) * ay)
    return im.crop((x, y, x + w, y + h))

def background(w, h, spec, seed=0, text_top=True):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    if spec == "orange":
        t = (y / h * 0.6 + x / w * 0.4)[..., None]
        a = np.array(ORANGE, np.float32) * (1 - t) + np.array((214, 104, 14), np.float32) * t
        a += np.random.default_rng(seed).normal(0, 3, (h, w, 1))
        return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert("RGBA")
    name = spec[4:] if spec.startswith("img:") else "bg_system-grid.jpg"
    ax = [0.5, 0.3, 0.7][seed % 3]
    a = np.asarray(cover(load(name).convert("RGB"), w, h, ax=ax), np.float32)
    if spec == "noir":
        a *= 0.35
    else:
        a *= 0.8
        yy = y / h
        dark = np.clip(1.0 - yy / 0.62, 0, 1) ** 1.3 * 0.78 + np.clip((yy - 0.84) / 0.16, 0, 1) * 0.7
        a *= (1 - dark)[..., None]
    v = np.sqrt(((x - w / 2) / w) ** 2 + ((y - h / 2) / h) ** 2)
    a *= (1 - 0.35 * np.clip(v - 0.35, 0, 1))[..., None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert("RGBA")

def fade(im, a):
    if a >= 1: return im
    arr = np.asarray(im).copy(); arr[..., 3] = (arr[..., 3] * max(a, 0)).astype(np.uint8)
    return Image.fromarray(arr)
def ease(t): return 1 - (1 - min(max(t, 0), 1)) ** 3
def back(t):
    t = min(max(t, 0), 1); c = 1.6
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2

class El:
    def __init__(self, img, x, y, kind="fade", t0=0.0, dur=0.6):
        self.img, self.x, self.y, self.kind, self.t0, self.dur = img, int(x), int(y), kind, t0, dur

def text_el(text, f, fill, tracking=None):
    if tracking is not None:
        L = Image.new("RGBA", (int(R.spaced_len(text, f, tracking)) + 4, int(f.size * 1.5)), (0, 0, 0, 0))
        R.spaced(ImageDraw.Draw(L), (0, 0), text, f, fill, tracking); return L
    L = Image.new("RGBA", (int(f.getlength(text)) + 6, int(f.size * 1.4)), (0, 0, 0, 0))
    ImageDraw.Draw(L).text((0, 0), text, font=f, fill=fill); return L

def glow_photo(h):
    p = load("founder_cut.png"); p = p.resize((int(p.width * h / p.height), h), Image.LANCZOS)
    W_ = p.width + 240; L = Image.new("RGBA", (W_, h), (0, 0, 0, 0))
    g = Image.new("RGBA", (W_, h), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
    d.ellipse([40, int(h * 0.12), W_ - 40, int(h * 0.12) + W_ - 80], fill=ORANGE + (150,))
    L.alpha_composite(g.filter(ImageFilter.GaussianBlur(70)))
    ring = Image.new("RGBA", (W_, h), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse([70, int(h * 0.1), W_ - 70, int(h * 0.1) + W_ - 140], outline=ORANGE + (230,), width=4)
    L.alpha_composite(ring)
    L.alpha_composite(p, ((W_ - p.width) // 2, 0))
    return L

def loop_img(w):
    im = load("loop.png").convert("RGB"); im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32); al = np.clip(a.max(axis=2) * 1.6, 0, 255).astype(np.uint8)
    out = np.dstack([a.astype(np.uint8), al]); return Image.fromarray(out, "RGBA")

def flame(h): return R.mono(h)

def footer_els(w, h, spec, pad, page=None):
    T = T_of(spec); els = []
    m = flame(int(h * 0.05)); y = h - pad - m.height
    els.append(El(m, pad, y, "fade", 0.2))
    f = R.font(R.INTER_SB, int(h * 0.0125))
    els.append(El(text_el("IGNITE DIGITAL PARTNERS", f, T["fg"], tracking=0.22), pad + m.width + 18, y + m.height / 2 - f.size * 0.6, "fade", 0.2))
    f2 = R.font(R.INTER, int(h * 0.0125)); t = text_el(page or "ignitedigitalpartners.com", f2, T["sub"])
    els.append(El(t, w - pad - t.width, y + m.height / 2 - f2.size * 0.6, "fade", 0.2))
    return els

def eyebrow_els(ey, pad, top, spec, size, center_w=None):
    T = T_of(spec); ey = R.clean(ey)
    if not ey: return [], top
    f = R.font(R.INTER_SB, size); e = text_el(ey.upper(), f, T["acc"], tracking=0.2)
    bar = Image.new("RGBA", (int(size * 0.35), int(size * 1.25)), T["acc"] + (255,))
    if center_w:
        x = (center_w - e.width) // 2; return [El(e, x, top, "fade", 0.15)], top + size * 2.6
    return [El(bar, pad, top - size * 0.1, "wipe", 0.1, 0.4), El(e, pad + bar.width + size * 0.7, top, "fade", 0.15)], top + size * 2.6

def head_els(head, w, pad, top, max_w, max_h, spec, start, minimum, center=False, t0=0.45):
    T = T_of(spec)
    fh, lines, s = R.fit(R.clean(head), R.POP_B, max_w, max_h, start, minimum, lh=1.08)
    els = []; y = top
    for i, l in enumerate(lines):
        col = T["acc"] if (len(lines) > 1 and i == len(lines) - 1 and spec != "orange") else T["fg"]
        e = text_el(l, fh, col); x = (w - e.width) // 2 if center else pad
        els.append(El(e, x, y, "rise", t0 + i * 0.16, 0.6)); y += s * 1.08
    return els, y

def sub_els(sub, w, pad, top, max_w, spec, size, t0, center=False, max_h=None):
    if not sub: return [], top
    T = T_of(spec)
    fs, sl, ss = R.fit(R.clean(sub), R.INTER, max_w, max_h or size * 6, size, int(size * 0.75), lh=1.42)
    els = []; y = top
    for l in sl:
        e = text_el(l, fs, T["sub"]); x = (w - e.width) // 2 if center else pad
        els.append(El(e, x, y, "fade", t0, 0.8)); y += ss * 1.42
    return els, y

def cta_el(cta, x, y, spec, size, center_w=None):
    f = R.font(R.INTER_SB, size); c = R.clean(cta).upper()
    tw = R.spaced_len(c, f, 0.12); bh = int(size * 2.6); bw = int(tw + size * 2.6)
    L = Image.new("RGBA", (bw + 4, bh + 4), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
    fill, col = (ORANGE, BLACK) if spec != "orange" else (BLACK, WHITE)
    d.rounded_rectangle([2, 2, bw, bh], radius=8, fill=fill + (255,))
    R.spaced(d, (2 + size * 1.3, 2 + bh / 2 - size * 0.62), c, f, col, 0.12)
    if center_w: x = (center_w - L.width) // 2
    return El(L, x, y, "pop", 1.9, 0.5)

def wmark(h, frac, alpha):
    m = flame(int(h * frac)); a = np.asarray(m).copy(); a[..., 3] = (a[..., 3] * alpha).astype(np.uint8); return Image.fromarray(a)

# ---------------------------------------------------------------- layouts
def lay_hero(v, w, h, spec, cta=None, page=None, video=False):
    pad = int(w * 0.083); top = int(h * (0.11 if not video else 0.15))
    els, y = eyebrow_els(v.get("eyebrow", ""), pad, top, spec, int(w * 0.022))
    he, y = head_els(v.get("head", ""), w, pad, y + h * 0.01, w - 2 * pad, h * (0.30 if h <= w * 1.3 else 0.25), spec, int(w * 0.095), int(w * 0.052)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.02, w - 2 * pad, spec, int(w * 0.034), 1.2, max_h=h * 0.12); els += se
    if cta and R.clean(cta): els.append(cta_el(cta, pad, y + h * 0.03, spec, int(w * 0.026)))
    if video:
        m = flame(int(h * 0.045)); els.append(El(m, pad, int(h * 0.885) - m.height, "fade", 0.2))
    else: els += footer_els(w, h, spec, pad, page)
    return els

def lay_founder(v, w, h, cta=None, page=None, video=False):
    spec = "noir"; pad = int(w * 0.083); top = int(h * (0.11 if not video else 0.15))
    els, y = eyebrow_els(v.get("eyebrow", ""), pad, top, spec, int(w * 0.022))
    he, y = head_els(v.get("head", ""), w, pad, y + h * 0.01, w - 2 * pad, h * 0.25, spec, int(w * 0.09), int(w * 0.05)); els += he
    ph_top = max(int(y + h * 0.02), int(h * 0.36)); ph_h = h - ph_top
    P = glow_photo(ph_h)
    while P.width > w * 0.66: ph_h = int(ph_h * 0.93); P = glow_photo(ph_h)
    px = w - P.width + int(P.width * 0.1)
    els.insert(0, El(P, px, h - P.height, "slideup", 0.3, 1.0))
    colw = max(px - pad + 40, int(w * 0.38))
    se, y2 = sub_els(v.get("sub", ""), w, pad, y + h * 0.03, colw, spec, int(w * 0.033), 1.3); els += se
    if cta and R.clean(cta): els.append(cta_el(cta, pad, y2 + h * 0.03, spec, int(w * 0.025)))
    f = R.font(R.INTER_SB, int(w * 0.019)); t = text_el("CHARLOTTE SMITH, FOUNDER", f, ORANGE, tracking=0.16)
    ly = int(h * (0.80 if not video else 0.80))
    els.append(El(t, pad, ly, "fade", 1.5))
    if video:
        m = flame(int(h * 0.045)); els.append(El(m, pad, int(h * 0.885) - m.height, "fade", 0.2))
    else:
        m = flame(int(h * 0.05)); els.append(El(m, pad, h - pad - m.height, "fade", 0.2))
        fw = R.font(R.INTER_SB, int(h * 0.0125))
        els.append(El(text_el("IGNITE DIGITAL PARTNERS", fw, WHITE, tracking=0.22), pad + m.width + 18, h - pad - m.height / 2 - fw.size * 0.6, "fade", 0.2))
    return els

def lay_loop(v, w, h, cta=None, page=None, video=False):
    spec = "noir"; pad = int(w * 0.083); top = int(h * (0.11 if not video else 0.15))
    els, y = eyebrow_els(v.get("eyebrow", ""), pad, top, spec, int(w * 0.022))
    he, y = head_els(v.get("head", ""), w, pad, y + h * 0.01, w - 2 * pad, h * 0.2, spec, int(w * 0.085), int(w * 0.05)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.015, w - 2 * pad, spec, int(w * 0.032), 1.2, max_h=h * 0.1); els += se
    if cta and R.clean(cta): els.append(cta_el(cta, pad, y + h * 0.02, spec, int(w * 0.025))); y += w * 0.025 * 2.6 + h * 0.03
    L = loop_img(int(w * 1.05)); avail = h * 0.88 - y
    if L.height > avail: L = L.resize((int(L.width * avail / L.height), int(avail)), Image.LANCZOS)
    els.append(El(L, (w - L.width) // 2, int(y + (avail - L.height) / 2 + h * 0.01), "pop", 0.6, 1.0))
    if video:
        m = flame(int(h * 0.045)); els.append(El(m, pad, int(h * 0.885) - m.height, "fade", 0.2))
    else: els += footer_els(w, h, spec, pad, page)
    return els

def lay_type(v, w, h, cta=None, page=None, video=False):
    spec = "noir"; pad = int(w * 0.1)
    top0 = 0.22 if video else 0.16
    m = flame(int(h * 0.15)); els = [El(m, (w - m.width) // 2, int(h * top0), "pop", 0.1, 0.8)]
    y = int(h * top0 + m.height + h * 0.05)
    e, y = eyebrow_els(v.get("eyebrow", ""), pad, y, spec, int(w * 0.022), center_w=w); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * 0.26, spec, int(w * 0.08), int(w * 0.048), center=True); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.02, w - 2 * pad, spec, int(w * 0.034), 1.3, center=True); els += se
    if cta and R.clean(cta): els.append(cta_el(cta, 0, y + h * 0.04, spec, int(w * 0.026), center_w=w))
    f = R.font(R.INTER_SB, int(h * 0.0125)); t = text_el("IGNITE DIGITAL PARTNERS", f, WHITE, tracking=0.22)
    els.append(El(t, (w - t.width) // 2, h - int(w * 0.083) - f.size * 2, "fade", 0.2))
    return els

def lay_step(v, w, h, spec, page=None):
    T = T_of(spec); pad = int(w * 0.083); ey = R.clean(v.get("eyebrow", ""))
    num = re.findall(r"\d+", ey); body = []; top = int(h * 0.12)
    if num:
        fN = R.font(R.POP_B, int(w * 0.30)); N = text_el(num[-1].zfill(2), fN, T["acc"])
        body.append(El(N, pad - int(w * 0.01), top, "fade", 0)); y = top + int(w * 0.36)
        lab = re.sub(r"\d+", "", ey).strip()
        if lab: e, y = eyebrow_els(lab, pad, y, spec, int(w * 0.022)); body += e
    else:
        e, y = eyebrow_els(ey, pad, top, spec, int(w * 0.022)); body += e; y += int(h * 0.03)
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * 0.3, spec, int(w * 0.082), int(w * 0.05)); body += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.02, w - 2 * pad, spec, int(w * 0.036), 1.2, max_h=h * 0.22); body += se
    top_y = min(e.y for e in body); shift = int(((h * 0.86) - (y - top_y)) / 2 - top_y + h * 0.02)
    for e in body: e.y += max(0, shift)
    wm = wmark(h, 0.42, 0.10 if spec != "orange" else 0.14)
    return [El(wm, int(w - wm.width * 0.8), int(h * 0.48), "fade", 0)] + body + footer_els(w, h, spec, pad, page)

def lay_gbp(v, w, h, img):
    spec = "noir"; pad = int(w * 0.07); els = []; split = int(w * 0.55)
    kind, name = img
    if kind == "founder":
        P = glow_photo(int(h * 0.92)); els.append(El(P, split + (w - split - P.width) // 2 + 40, h - P.height, "fade", 0))
    else:
        im = cover(load(name), w - split, h); els.append(El(im, split, 0, "fade", 0))
        els.append(El(Image.new("RGBA", (8, h), ORANGE + (255,)), split - 4, 0, "fade", 0))
    e, y = eyebrow_els(v.get("eyebrow", ""), pad, int(h * 0.13), spec, int(w * 0.016)); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, split - 2 * pad + 20, h * 0.44, spec, int(w * 0.055), int(w * 0.032)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.03, split - 2 * pad, spec, int(w * 0.022), 1, max_h=h * 0.2); els += se
    m = flame(int(h * 0.07)); yy = h - pad - m.height; els.append(El(m, pad, yy, "fade", 0))
    f = R.font(R.INTER_SB, int(h * 0.017))
    els.append(El(text_el("IGNITE DIGITAL PARTNERS", f, WHITE, tracking=0.22), pad + m.width + 18, yy + m.height / 2 - f.size * 0.6, "fade", 0))
    return els

# ---------------------------------------------------------------- compose
def paste_neg(fr, im, x, y):
    if x < 0 or y < 0:
        im = im.crop((max(0, -x), max(0, -y), im.width, im.height)); x, y = max(x, 0), max(y, 0)
    if x >= fr.width or y >= fr.height: return
    fr.alpha_composite(im.crop((0, 0, min(im.width, fr.width - x), min(im.height, fr.height - y))), (x, y))

def composite(bg, els, t=None, zoom=1.0):
    fr = bg
    if zoom != 1.0:
        w, h = bg.size; zw, zh = int(w / zoom), int(h / zoom)
        fr = bg.crop(((w - zw) // 2, (h - zh) // 2, (w - zw) // 2 + zw, (h - zh) // 2 + zh)).resize((w, h), Image.BILINEAR)
    fr = fr.copy()
    for e in els:
        if t is None: paste_neg(fr, e.img, e.x, e.y); continue
        p = (t - e.t0) / e.dur
        if p <= 0: continue
        a = ease(p); im = e.img; x, y = e.x, e.y
        if e.kind == "rise": y += int((1 - a) * 46); im = fade(im, a)
        elif e.kind == "slideup": y += int((1 - a) * 260); im = fade(im, min(1, a * 1.4))
        elif e.kind == "pop":
            s = back(p)
            if s != 1:
                im2 = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.BILINEAR)
                x += (im.width - im2.width) // 2; y += (im.height - im2.height) // 2; im = im2
            im = fade(im, a)
        elif e.kind == "wipe": im = im.crop((0, 0, max(1, int(im.width * a)), im.height))
        else: im = fade(im, a)
        paste_neg(fr, im, x, y)
    return fr

def embers(n, w, h, seed):
    rng = np.random.default_rng(seed)
    return [(rng.uniform(0, w), rng.uniform(0, h), rng.uniform(2, 5), rng.uniform(0.3, 0.9), rng.uniform(0, 6.28)) for _ in range(n)]
def draw_embers(fr, pts, t, h):
    d = ImageDraw.Draw(fr)
    for (x0, y0, r, sp, ph) in pts:
        yy = (y0 - t * 70 * sp) % h; xx = x0 + 12 * math.sin(t * 1.3 + ph); a = int(170 * (0.5 + 0.5 * math.sin(t * 3 + ph)))
        d.ellipse([xx - r, yy - r, xx + r, yy + r], fill=ORANGE + (a,))

def still(els, w, h, spec, out, seed=0):
    composite(background(w, h, spec, seed), els).convert("RGB").save(out, quality=92); return out

def animate(els, w, h, spec, out, dur=8.0, seed=0, fps=30):
    bg = background(w, h, spec, seed); pts = embers(26, w, h, seed); n = int(dur * fps)
    def frames():
        for k in range(n):
            t = k / fps; fr = composite(bg, els, t, zoom=1.0 + 0.06 * t / dur); draw_embers(fr, pts, t, h)
            yield np.asarray(fr.convert("RGB"))
    R.encode(frames(), w, h, fps, out); return out

def reel(v, out, spec, kind, seed=0, fps=30):
    W, H = 1080, 1920; pad = 96; T = T_of(spec)
    m = flame(74); hdr = [El(m, pad, 170, "fade", 0.1)]
    f = R.font(R.INTER_SB, 26)
    hdr.append(El(text_el("IGNITE DIGITAL PARTNERS", f, WHITE, tracking=0.24), pad + m.width + 18, 170 + m.height / 2 - 18, "fade", 0.1))
    els = []; y = 340; per = 1.25
    for i, l in enumerate(v["lines"]):
        icon = l[:1] if l[:1] in "✓✗" else None
        txt = R.clean(l[1:] if icon else l); first = i == 0
        fl, wl, s = R.fit(txt, R.POP_B, W - 2 * pad - (70 if icon else 0), 360, 90 if first else 70, 48, lh=1.08)
        for j, wlx in enumerate(wl):
            e = text_el(wlx, fl, ORANGE if first else WHITE)
            if icon and j == 0:
                I = Image.new("RGBA", (70 + e.width, e.height), (0, 0, 0, 0)); R.check_icon(ImageDraw.Draw(I), 0, int(s * 0.2), int(s * 0.58), ORANGE, cross=(icon == "✗")); I.alpha_composite(e, (70, 0)); e = I
            els.append(El(e, pad + (70 if icon and j else 0), y, "rise", 0.6 + i * per, 0.6)); y += s * 1.08
        y += 28
    if kind == "founder" and H - y > 700:
        P = glow_photo(int(min(H - y - 40, 1000))); els.insert(0, El(P, W - P.width + 60, H - P.height, "slideup", 0.2, 1.1))
    elif kind == "loop" and H - 380 - y > 450:
        L = loop_img(W); els.insert(0, El(L, 0, int(y + (H - 380 - y - L.height) / 2), "pop", 0.6, 1.0))
    t_text = 0.6 + len(v["lines"]) * per + 0.6; t_end0 = t_text + 1.6; total = t_end0 + 3.6
    E = []; mm = flame(300); E.append(El(mm, (W - mm.width) // 2, 520, "pop", 0, 0.8))
    endl = [R.clean(x) for x in v["end"].split("\n")]; yy = 920
    for i, l in enumerate(endl):
        if i == 0:
            fl, wl, s = R.fit(l, R.POP_B, W - 2 * pad, 260, 66, 44)
            for wlx in wl:
                e = text_el(wlx, fl, WHITE); E.append(El(e, (W - e.width) // 2, yy, "rise", 0.4)); yy += s * 1.12
            yy += 24
        else:
            e = text_el(l.upper(), R.font(R.INTER_SB, 32), ORANGE, tracking=0.14); E.append(El(e, (W - e.width) // 2, yy, "fade", 0.8)); yy += 56
    wm = R.WORD; wm = wm.resize((520, int(wm.height * 520 / wm.width)), Image.LANCZOS); E.append(El(wm, (W - wm.width) // 2, int(yy + 40), "fade", 1.1))
    bg = background(W, H, spec, seed); bg_end = background(W, H, "noir", seed); pts = embers(30, W, H, seed)
    n = int(total * fps)
    def frames():
        for k in range(n):
            t = k / fps; z = 1.0 + 0.07 * t / total
            if t < t_end0 + 0.5:
                a = 1 - ease((t - t_end0) / 0.5) if t > t_end0 else 1
                fr = composite(bg, [], None, zoom=z)
                fr.alpha_composite(fade(composite(Image.new("RGBA", (W, H), (0, 0, 0, 0)), hdr + els, t), a))
                if t > t_end0: fr = Image.blend(fr, bg_end, ease((t - t_end0) / 0.5))
            else:
                fr = bg_end.copy(); fr.alpha_composite(composite(Image.new("RGBA", (W, H), (0, 0, 0, 0)), E, t - t_end0 - 0.3))
            draw_embers(fr, pts, t, H); yield np.asarray(fr.convert("RGB"))
    R.encode(frames(), W, H, fps, out)
    composite(background(W, H, spec, seed), hdr + els).convert("RGB").save(out.replace(".mp4", "_cover.jpg"), quality=90)
    return out

# ---------------------------------------------------------------- image choice
SOMBRE = ("MOVEMBER", "11 NOVEMBER", "REMEMBER", "DIWALI")
BG = dict(web=["bg_blueprint-hero.jpg", "bg_system-grid.jpg"], data=["bg_data-flow-hero.jpg", "bg_growth-momentum-hero.jpg"],
          brand=["bg_hero-liquid-metal.jpg", "bg_fire-particles.jpg"], investor=["bg_network-nodes-hero.jpg", "bg_growth-momentum-hero.jpg"],
          content=["bg_fire-particles.jpg", "bg_network-nodes-hero.jpg"], loop=["bg_ignition-loop-hero.jpg"],
          any=["bg_fire-particles.jpg", "bg_network-nodes-hero.jpg", "bg_hero-liquid-metal.jpg", "bg_growth-momentum-hero.jpg", "bg_blueprint-hero.jpg", "bg_data-flow-hero.jpg", "bg_ignition-loop-hero.jpg"])

def choose(p, i):
    v = p["visual"]; s0 = (v.get("slides") or [{}])[0]
    head = " ".join([v.get("eyebrow", ""), v.get("head", ""), s0.get("eyebrow", ""), s0.get("head", "")] + v.get("lines", [])[:1]).upper()
    t = (head + " " + v.get("sub", "") + " " + " ".join(v.get("lines", []))).upper()
    if any(k in head for k in SOMBRE): return ("type", None)
    if "IGNITION LOOP" in head or "CLARITY. ACTIVATION" in head or head.strip().startswith("CLARITY"): return ("loop", None)
    if any(k in head for k in ("HOW WE WORK", "SOUND FAMILIAR", "STRESS", "PLAN 2027", "HONEST QUESTION", "FIRE DRILL")): return ("founder", None)
    for key, kws in (("web", ("WEBSITE", "SITE")), ("data", ("SEARCH", "ADS", "SEO", "GOOGLE", "CRM", "REPORT", "MEASURE", "ENQUIR", "TRACK")),
                     ("investor", ("INVESTOR", "NEWS RELEASE", "PDAC", "DISCLOSURE", "EMPLOYER", "RECRUIT", "CANDIDATE")),
                     ("brand", ("BRAND", "MESSAGING", "STORY", "QUALITY", "ISO")), ("content", ("CONTENT", "SOCIAL", "VISIBLE"))):
        if any(k in t for k in kws): return ("img", BG[key][i % len(BG[key])])
    return ("img", BG["any"][i % len(BG["any"])])

def build(only=None):
    import content
    man = []
    for i, p in enumerate(content.P):
        key = f"{p['date']}_{p['net']}_{p['fmt'].lower()}_{i:02d}"
        if only and only not in key: continue
        v = p["visual"]; tpl = v["tpl"]; files = []; kind, name = choose(p, i)
        spec = "img:" + name if kind == "img" else "noir"
        if kind == "founder": spec = "img:bg_fire-particles.jpg"
        def L(vv, w, h, cta=None, page=None, video=False):
            if kind == "type": return lay_type(vv, w, h, cta, page, video)
            if kind == "loop": return lay_loop(vv, w, h, cta, page, video)
            if kind == "founder": return lay_founder(vv, w, h, cta, page, video)
            return lay_hero(vv, w, h, spec, cta, page, video)
        bgspec = "noir" if kind in ("type", "loop") else ("noir" if kind == "founder" else spec)
        if tpl == "post":
            files.append(still(L(v, 1080, 1350), 1080, 1350, bgspec, f"{OUT}/{key}.jpg", seed=i))
        elif tpl == "carousel":
            n = len(v["slides"])
            for j, s in enumerate(v["slides"]):
                pg = f"{j + 1:02d} / {n:02d}"
                if j == 0: els, sp = L(s, 1080, 1350, page=pg), bgspec
                elif j == n - 1 and not re.search(r"\d", s.get("eyebrow", "")):
                    if i % 2 == 0: els, sp = lay_founder(s, 1080, 1350, page=pg), "noir"
                    else:
                        sp = "img:" + BG["any"][(i + 3) % 7]; els = lay_hero(s, 1080, 1350, sp, page=pg)
                else:
                    sp = "orange" if j % 2 == 0 else "noir"; els = lay_step(s, 1080, 1350, sp, page=pg)
                files.append(still(els, 1080, 1350, sp, f"{OUT}/{key}_{j + 1}.jpg", seed=i * 10 + j))
        elif tpl == "story":
            files.append(animate(L(v, 1080, 1920, cta=v.get("cta"), video=True), 1080, 1920, bgspec, f"{OUT}/{key}.mp4", seed=i))
        elif tpl == "gbp":
            img = ("founder", None) if kind in ("founder", "type", "loop") else ("img", name)
            files.append(still(lay_gbp(v, 1200, 900, img), 1200, 900, "noir", f"{OUT}/{key}.jpg", seed=i))
        elif tpl == "reel":
            rspec = spec if kind == "img" else "img:" + BG["any"][i % 7]
            files.append(reel(v, f"{OUT}/{key}.mp4", rspec, kind, seed=i))
        man.append(dict(idx=i, key=key, files=[os.path.basename(f) for f in files]))
        print(key, len(files), flush=True)
    if not only: json.dump(man, open(f"{OUT}/manifest.json", "w"), indent=1)

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else None)
