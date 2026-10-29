"""By Charlotte Smith v2 renderer: textured noir/ivory/blush backgrounds, Charlotte's photos in a gold arch,
real client work in gold frames, animated stories and reels. Static and video share one layout system."""
import os, sys, math, json, re
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import render as R

HERE = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(HERE, "brand")
OUT = os.path.join(HERE, "out2")
os.makedirs(OUT, exist_ok=True)
GOLD = (201, 164, 95); GOLD_D = (160, 122, 58); IVORY = (246, 241, 232); NOIR = (17, 16, 15)

TH = {
    "noir": dict(tex="noir-marble.jpg", tint=(14, 13, 12), tint_a=0.55, fg=IVORY, sub=(205, 196, 182), acc=GOLD, line=GOLD, arch=(201, 164, 95)),
    "ivory": dict(tex="cream-satin.jpg", tint=(246, 241, 232), tint_a=0.50, fg=(22, 21, 20), sub=(84, 76, 66), acc=GOLD_D, line=(176, 141, 87), arch=(214, 188, 140)),
    "blush": dict(tex="blush-glow.jpg", tint=(244, 228, 222), tint_a=0.25, fg=(26, 22, 22), sub=(92, 76, 72), acc=GOLD_D, line=(176, 141, 87), arch=(226, 190, 178)),
}

_c = {}
def load(name):
    if name not in _c:
        _c[name] = Image.open(os.path.join(B, name)).convert("RGBA")
    return _c[name]

def cover(im, w, h):
    r = max(w / im.width, h / im.height)
    im = im.resize((math.ceil(im.width * r), math.ceil(im.height * r)), Image.LANCZOS)
    x = (im.width - w) // 2; y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))

def background(w, h, th, seed=0):
    T = TH[th]
    im = cover(load(T["tex"]), w, h).convert("RGB")
    a = np.asarray(im, np.float32)
    a = a * (1 - T["tint_a"]) + np.array(T["tint"], np.float32) * T["tint_a"]
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    if th == "noir":
        d = np.sqrt(((x - 0.8 * w) / w) ** 2 + ((y - 0.2 * h) / h) ** 2)
        g = np.clip(1 - d / 0.8, 0, 1) ** 2
        a = a + g[..., None] * np.array([40, 30, 14], np.float32)
        v = np.sqrt(((x - w / 2) / w) ** 2 + ((y - h / 2) / h) ** 2)
        a = a * (1 - 0.35 * np.clip(v - 0.3, 0, 1)[..., None])
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert("RGBA")

def fade(im, a):
    if a >= 1: return im
    arr = np.asarray(im).copy(); arr[..., 3] = (arr[..., 3] * max(a, 0)).astype(np.uint8)
    return Image.fromarray(arr)

def ease(t): return 1 - (1 - min(max(t, 0), 1)) ** 3
def back(t):
    t = min(max(t, 0), 1); c = 1.6
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2

# ---------------------------------------------------------------- elements
class El:
    def __init__(self, img, x, y, kind="fade", t0=0.0, dur=0.6, grp="main"):
        self.img, self.x, self.y, self.kind, self.t0, self.dur, self.grp = img, int(x), int(y), kind, t0, dur, grp

def text_el(text, f, fill, w=None, tracking=None):
    if tracking is not None:
        tw = int(R.spaced_len(text, f, tracking)) + 4
        L = Image.new("RGBA", (tw, int(f.size * 1.5)), (0, 0, 0, 0))
        R.spaced(ImageDraw.Draw(L), (0, 0), text, f, fill, tracking); return L
    tw = int(f.getlength(text)) + 6
    L = Image.new("RGBA", (tw, int(f.size * 1.35)), (0, 0, 0, 0))
    ImageDraw.Draw(L).text((0, 0), text, font=f, fill=fill); return L

def arch_photo(cut, h, th, outline=True):
    """Charlotte cut-out standing in a gold arch. Returns RGBA."""
    T = TH[th]
    p = load(cut); p = p.resize((int(p.width * h / p.height), h), Image.LANCZOS)
    aw = int(p.width * 0.92); ah = int(h * 0.86)
    W_ = p.width + 60; H_ = h
    L = Image.new("RGBA", (W_, H_), (0, 0, 0, 0))
    ax = (W_ - aw) // 2; ay = H_ - ah
    grad = np.zeros((ah, aw, 4), np.uint8)
    c = np.array(T["arch"], np.float32)
    tt = np.linspace(0, 1, ah)[:, None]
    col = c * (1.0 - 0.18 * tt) if th == "noir" else c * (1.0 - 0.05 * tt)
    grad[..., :3] = np.clip(np.broadcast_to(col[:, None, :], (ah, aw, 3)), 0, 255).astype(np.uint8)
    grad[..., 3] = 235 if th == "noir" else 200
    G = Image.fromarray(grad)
    m = Image.new("L", (aw, ah), 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, aw - 1, ah + aw], radius=aw // 2, fill=255)
    G.putalpha(Image.fromarray((np.asarray(m, np.float32) * (grad[..., 3] / 255.0)).astype(np.uint8)))
    L.alpha_composite(G, (ax, ay))
    if outline:
        d = ImageDraw.Draw(L); o = 22
        d.rounded_rectangle([ax - o, ay - o, ax + aw + o, H_ + aw], radius=(aw + 2 * o) // 2, outline=GOLD + (200,), width=3)
    L.alpha_composite(p, ((W_ - p.width) // 2, 0))
    return L

def work_card(name, w, max_h, tilt=0.0):
    im = load(name).convert("RGB")
    im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    if im.height > max_h:
        y = (im.height - max_h) // 2; im = im.crop((0, y, w, y + max_h))
    b = 10
    card = Image.new("RGBA", (w + 2 * b, im.height + 2 * b), GOLD + (255,))
    card.paste(im, (b, b))
    m = Image.new("L", card.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, card.width - 1, card.height - 1], radius=28, fill=255)
    card.putalpha(m)
    sh = Image.new("RGBA", (card.width + 120, card.height + 120), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([60, 74, card.width + 60, card.height + 74], radius=28, fill=(0, 0, 0, 120))
    sh = sh.filter(ImageFilter.GaussianBlur(24)); sh.alpha_composite(card, (60, 60))
    if tilt: sh = sh.rotate(tilt, resample=Image.BICUBIC, expand=True)
    return sh

_av = None
def avatar(d):
    global _av
    if _av is None:
        src = Image.open(os.path.join(B, "cut_portrait.png")).convert("RGBA")
        s = int(src.width * 0.62); x = int(src.width * 0.20)
        _av = src.crop((x, 0, x + s, s))
    bgc = Image.new("RGBA", (d, d), (214, 188, 140, 255))
    bgc.alpha_composite(_av.resize((d, d), Image.LANCZOS))
    m = Image.new("L", (d, d), 0); ImageDraw.Draw(m).ellipse([0, 0, d - 1, d - 1], fill=255)
    bgc.putalpha(m)
    out = Image.new("RGBA", (d + 10, d + 10), (0, 0, 0, 0)); dd = ImageDraw.Draw(out)
    dd.ellipse([0, 0, d + 9, d + 9], fill=GOLD + (255,)); out.alpha_composite(bgc, (5, 5)); return out

def footer_els(w, h, th, pad, page=None, left_only=False, avatar_on=False):
    T = TH[th]; els = []
    if avatar_on:
        a = avatar(int(h * 0.055)); y = h - pad - a.height
        els.append(El(a, pad, y, "fade", 0.2))
        f1 = R.font(R.INTER_SB, int(h * 0.019)); f2 = R.font(R.INTER, int(h * 0.016))
        els.append(El(text_el("Charlotte Smith", f1, T["fg"]), pad + a.width + 18, y + a.height * 0.12, "fade", 0.2))
        els.append(El(text_el("@by.charlottesmith", f2, T["acc"]), pad + a.width + 18, y + a.height * 0.52, "fade", 0.2))
        base = y + a.height / 2
    else:
        m = R.mono(int(h * 0.05)); y = h - pad - m.height
        els.append(El(m, pad, y, "fade", 0.2))
        f = R.font(R.INTER_SB, int(h * 0.0125))
        els.append(El(text_el("BY CHARLOTTE SMITH", f, T["fg"], tracking=0.22), pad + m.width + 20, y + m.height / 2 - f.size * 0.6, "fade", 0.2))
        base = y + m.height / 2
    if not left_only:
        f2 = R.font(R.INTER, int(h * 0.0125)); r = page or "bycharlottesmith.com"
        t = text_el(r, f2, T["sub"]); els.append(El(t, w - pad - t.width, base - f2.size * 0.6, "fade", 0.2))
    return els

def frame_el(w, h, th, pad):
    L = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(L).rectangle([pad * 0.42, pad * 0.42, w - pad * 0.42, h - pad * 0.42], outline=TH[th]["line"] + (80,), width=2)
    return El(L, 0, 0, "fade", 0)

def head_els(head, w, pad, top, max_w, max_h, th, start, minimum, t0=0.5, align="left"):
    T = TH[th]
    fh, lines, s = R.fit(R.clean(head), R.LORA, max_w, max_h, start, minimum, wght=500, lh=1.12)
    els = []; y = top
    for i, l in enumerate(lines):
        e = text_el(l, fh, T["fg"])
        x = pad if align == "left" else (w - e.width) // 2
        els.append(El(e, x, y, "rise", t0 + i * 0.18, 0.7)); y += s * 1.12
    return els, y

def sub_els(sub, w, pad, top, max_w, th, size, t0, align="left", max_h=None):
    if not sub: return [], top
    T = TH[th]
    fs, sl, ss = R.fit(R.clean(sub), R.INTER, max_w, max_h or size * 6, size, int(size * 0.75), lh=1.42)
    els = []; y = top
    for l in sl:
        e = text_el(l, fs, T["sub"])
        x = pad if align == "left" else (w - e.width) // 2
        els.append(El(e, x, y, "fade", t0, 0.8)); y += ss * 1.42
    return els, y

def eyebrow_els(ey, w, pad, top, th, size, align="left"):
    T = TH[th]; ey = R.clean(ey)
    if not ey: return [], top
    f = R.font(R.INTER_SB, size)
    e = text_el(ey, f, T["acc"], tracking=0.2)
    x = pad if align == "left" else (w - e.width) // 2
    rule = Image.new("RGBA", (int(w * 0.12), 3), T["acc"] + (255,))
    rx = pad if align == "left" else (w - rule.width) // 2
    return [El(e, x, top, "fade", 0.15), El(rule, rx, top + size * 2.1, "wipe", 0.3, 0.8)], top + size * 3.6

def cta_el(cta, x, y, th, size, align_w=None):
    T = TH[th]; f = R.font(R.INTER_SB, size); c = R.clean(cta).upper()
    tw = R.spaced_len(c, f, 0.12); bh = int(size * 2.6); bw = int(tw + size * 2.6)
    L = Image.new("RGBA", (bw + 4, bh + 4), (0, 0, 0, 0)); d = ImageDraw.Draw(L)
    if th == "noir":
        d.rounded_rectangle([2, 2, bw, bh], radius=bh // 2, fill=GOLD + (255,)); col = NOIR
    else:
        d.rounded_rectangle([2, 2, bw, bh], radius=bh // 2, fill=NOIR + (255,)); col = IVORY
    R.spaced(d, (2 + size * 1.3, 2 + bh / 2 - size * 0.62), c, f, col, 0.12)
    if align_w: x = (align_w - L.width) // 2
    return El(L, x, y, "pop", 0, 0.5)

def watermark(w, h, frac=0.42, alpha=0.07):
    wm = R.mono(int(h * frac)); a = np.asarray(wm).copy(); a[..., 3] = (a[..., 3] * alpha).astype(np.uint8)
    return Image.fromarray(a)

# ---------------------------------------------------------------- layouts
def lay_photo(v, w, h, th, cut, cta=None, page=None, video=False):
    """Headline top, Charlotte in a gold arch bottom right, sub + CTA in the left column."""
    pad = int(w * 0.083); els = [frame_el(w, h, th, pad)] if not video else []
    top = int(h * (0.12 if not video else 0.15))
    e, y = eyebrow_els(v.get("eyebrow", ""), w, pad, top, th, int(w * 0.021)); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * (0.27 if h <= w * 1.3 else 0.24), th, int(w * 0.098), int(w * 0.055)); els += he
    ph_top = max(int(y + h * 0.02), int(h * 0.34))
    ph_h = h - ph_top
    P = arch_photo(cut, ph_h, th)
    while P.width > w * 0.6:
        ph_h = int(ph_h * 0.93); P = arch_photo(cut, ph_h, th)
    px = w - P.width + int(P.width * 0.06)
    els.insert(1 if not video else 0, El(P, px, h - P.height, "slideup", 0.3, 1.0))
    colw = max(px - pad - 30, int(w * 0.36))
    se, y2 = sub_els(v.get("sub", ""), w, pad, y + h * 0.035, colw, th, int(w * 0.034), 1.3); els += se
    if cta and R.clean(cta):
        c = cta_el(cta, pad, y2 + h * 0.035, th, int(w * 0.026)); c.t0 = 1.9; els.append(c)
    if video:
        m = R.mono(int(h * 0.045)); els.append(El(m, pad, int(h * 0.885) - m.height, "fade", 0.2))
    else:
        els += footer_els(w, h, th, pad, page, left_only=True)
    return els

def lay_work(v, w, h, th, work, cta=None, page=None, video=False):
    pad = int(w * 0.083); els = [frame_el(w, h, th, pad)] if not video else []
    top = int(h * (0.11 if not video else 0.14))
    e, y = eyebrow_els(v.get("eyebrow", ""), w, pad, top, th, int(w * 0.021)); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * 0.22, th, int(w * 0.09), int(w * 0.052)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.015, w - 2 * pad, th, int(w * 0.032), 1.2, max_h=h * 0.1); els += se
    if cta and R.clean(cta):
        c = cta_el(cta, pad, y + h * 0.02, th, int(w * 0.026)); c.t0 = 1.9; els.append(c); y += int(w * 0.026) * 2.6 + h * 0.03
    foot_h = h * 0.12
    avail = h - foot_h - (y + h * 0.03)
    C = work_card(work, w - 2 * pad + 20, int(avail - 130), tilt=-1.6)
    cy = int(y + h * 0.025 + (avail - C.height) / 2)
    els.append(El(C, (w - C.width) // 2, cy, "slideup", 0.4, 1.0))
    els += footer_els(w, h, th, pad, page, avatar_on=True)
    return els

def lay_type(v, w, h, th, cta=None, page=None, video=False):
    pad = int(w * 0.1); els = [frame_el(w, h, th, int(w * 0.083))] if not video else []
    top0 = 0.22 if video else 0.17
    wm = R.mono(int(h * 0.16)); els.append(El(wm, (w - wm.width) // 2, int(h * top0), "pop", 0.1, 0.8))
    y = int(h * top0 + wm.height + h * 0.05)
    e, y = eyebrow_els(v.get("eyebrow", ""), w, pad, y, th, int(w * 0.021), align="center"); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * 0.26, th, int(w * 0.088), int(w * 0.05), align="center"); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.02, w - 2 * pad, th, int(w * 0.034), 1.3, align="center"); els += se
    if cta and R.clean(cta):
        c = cta_el(cta, 0, y + h * 0.04, th, int(w * 0.026), align_w=w); c.t0 = 1.9; els.append(c)
    f = R.font(R.INTER_SB, int(h * 0.0125)); t = text_el("BY CHARLOTTE SMITH", f, TH[th]["fg"], tracking=0.22)
    els.append(El(t, (w - t.width) // 2, h - int(w * 0.083) - f.size * 2, "fade", 0.2))
    return els

def lay_step(v, w, h, th, page=None):
    pad = int(w * 0.083); els = [frame_el(w, h, th, pad)]
    T = TH[th]; ey = R.clean(v.get("eyebrow", ""))
    num = re.findall(r"\d+", ey)
    top = int(h * 0.11)
    if num:
        fN = R.font(R.LORA, int(w * 0.30), 400)
        N = text_el(num[-1].zfill(2), fN, T["acc"])
        els.append(El(fade(N, 0.9), pad - int(w * 0.01), top - int(w * 0.04), "fade", 0))
        lab = re.sub(r"\d+", "", ey).strip()
        y = top + int(w * 0.36)
        if lab:
            e, y = eyebrow_els(lab, w, pad, y, th, int(w * 0.021)); els += e
    else:
        e, y = eyebrow_els(ey, w, pad, top, th, int(w * 0.021)); els += e
        y += int(h * 0.04)
    he, y = head_els(v.get("head", ""), w, pad, y, w - 2 * pad, h * 0.3, th, int(w * 0.085), int(w * 0.05)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.02, w - 2 * pad, th, int(w * 0.036), 1.2, max_h=h * 0.22); els += se
    body = els[1:]; top_y = min(e.y for e in body); bot = y
    shift = int(((h * 0.86) - (bot - top_y)) / 2 - top_y + h * 0.02)
    for e in body: e.y += max(0, shift)
    els.insert(1, El(watermark(w, h, 0.36, 0.06), int(w - R.mono(int(h * 0.36)).width * 0.8), int(h * 0.5), "fade", 0))
    els += footer_els(w, h, th, pad, page, avatar_on=True)
    return els

def lay_gbp(v, w, h, img):
    th = "noir"; pad = int(w * 0.07); els = []
    split = int(w * 0.54)
    kind, name = img
    if kind == "photo":
        P = arch_photo(name, int(h * 0.86), th)
        els.append(El(P, split + (w - split - P.width) // 2, h - P.height, "fade", 0))
    elif kind == "work":
        C = work_card(name, w - split - 90, int(h * 0.62), tilt=-2)
        els.append(El(C, split - 30 + (w - split - C.width) // 2 + 30, (h - C.height) // 2, "fade", 0))
    top = int(h * 0.13)
    e, y = eyebrow_els(v.get("eyebrow", ""), w, pad, top, th, int(w * 0.017)); els += e
    he, y = head_els(v.get("head", ""), w, pad, y, split - 2 * pad + 20, h * 0.42, th, int(w * 0.06), int(w * 0.034)); els += he
    se, y = sub_els(v.get("sub", ""), w, pad, y + h * 0.03, split - 2 * pad, th, int(w * 0.024), 1, max_h=h * 0.2); els += se
    m = R.mono(int(h * 0.07)); yy = h - pad - m.height
    els.append(El(m, pad, yy, "fade", 0))
    f = R.font(R.INTER_SB, int(h * 0.017))
    els.append(El(text_el("BY CHARLOTTE SMITH", f, IVORY, tracking=0.22), pad + m.width + 20, yy + m.height / 2 - f.size * 0.6, "fade", 0))
    return els

# ---------------------------------------------------------------- compose
def composite(bg, els, t=None, zoom=1.0):
    fr = bg
    if zoom != 1.0:
        w, h = bg.size; zw, zh = int(w / zoom), int(h / zoom)
        fr = bg.crop(((w - zw) // 2, (h - zh) // 2, (w - zw) // 2 + zw, (h - zh) // 2 + zh)).resize((w, h), Image.BILINEAR)
    fr = fr.copy()
    for e in els:
        if t is None:
            paste_neg(fr, e.img, e.x, e.y); continue
        p = (t - e.t0) / e.dur
        if p <= 0: continue
        a = ease(p); im = e.img; x, y = e.x, e.y
        if e.kind == "rise": y += int((1 - a) * 46); im = fade(im, a)
        elif e.kind == "slideup": y += int((1 - a) * 260); im = fade(im, min(1, a * 1.4))
        elif e.kind == "pop":
            s = back(p)
            if s != 1: im2 = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.BILINEAR); x += (im.width - im2.width) // 2; y += (im.height - im2.height) // 2; im = im2
            im = fade(im, a)
            if e.kind == "pop" and p > 1.3:  # gentle pulse for CTAs
                pass
        elif e.kind == "wipe":
            cw = max(1, int(im.width * a)); im = im.crop((0, 0, cw, im.height))
        else: im = fade(im, a)
        paste_neg(fr, im, x, y)
    return fr

def paste_neg(fr, im, x, y):
    if x < 0 or y < 0:
        im = im.crop((max(0, -x), max(0, -y), im.width, im.height)); x, y = max(x, 0), max(y, 0)
    if x >= fr.width or y >= fr.height: return
    im = im.crop((0, 0, min(im.width, fr.width - x), min(im.height, fr.height - y)))
    fr.alpha_composite(im, (x, y))

def dust(n, w, h, seed):
    rng = np.random.default_rng(seed)
    return [(rng.uniform(0, w), rng.uniform(0, h), rng.uniform(2, 5), rng.uniform(0.2, 0.6), rng.uniform(0, 6.28)) for _ in range(n)]

def draw_dust(fr, pts, t, h):
    d = ImageDraw.Draw(fr)
    for (x0, y0, r, sp, ph) in pts:
        yy = (y0 - t * 40 * sp) % h; a = int(120 * (0.5 + 0.5 * math.sin(t * 2 + ph)))
        d.ellipse([x0 - r, yy - r, x0 + r, yy + r], fill=GOLD + (a,))

def still(els, w, h, th, out, seed=0):
    bg = background(w, h, th, seed)
    composite(bg, els).convert("RGB").save(out, quality=92); return out

def animate(els, w, h, th, out, dur=7.0, seed=0, fps=30):
    bg = background(w, h, th, seed); pts = dust(22, w, h, seed)
    n = int(dur * fps)
    def frames():
        for k in range(n):
            t = k / fps
            fr = composite(bg, els, t, zoom=1.0 + 0.05 * t / dur)
            draw_dust(fr, pts, t, h)
            yield np.asarray(fr.convert("RGB"))
    R.encode(frames(), w, h, fps, out); return out

# ---------------------------------------------------------------- reels
def reel(v, out, th, img, seed=0, fps=30):
    W, H = 1080, 1920; T = TH[th]; pad = 96
    lines = [l for l in v["lines"]]
    # header
    m = R.mono(74); hdr = [El(m, pad, 170, "fade", 0.1)]
    f = R.font(R.INTER_SB, 26)
    hdr.append(El(text_el("BY CHARLOTTE SMITH", f, T["fg"], tracking=0.24), pad + m.width + 20, 170 + m.height / 2 - 18, "fade", 0.1))
    # lines
    els = []; y = 330; per = 1.25
    for i, l in enumerate(lines):
        icon = l[:1] if l[:1] in "✓✗" else None
        txt = R.clean(l[1:] if icon else l)
        first = i == 0
        fl, wl, s = R.fit(txt, R.LORA, W - 2 * pad - (70 if icon else 0), 360, 88 if first else 72, 50, wght=600 if first else 500, lh=1.1)
        for j, wlx in enumerate(wl):
            e = text_el(wlx, fl, T["acc"] if first else T["fg"])
            if icon and j == 0:
                I = Image.new("RGBA", (70 + e.width, e.height), (0, 0, 0, 0)); R.check_icon(ImageDraw.Draw(I), 0, int(s * 0.2), int(s * 0.58), T["acc"], cross=(icon == "✗")); I.alpha_composite(e, (70, 0)); e = I
            els.append(El(e, pad + (70 if icon and j else 0), y, "rise", 0.6 + i * per, 0.6)); y += s * 1.1
        y += 30
    t_text = 0.6 + len(lines) * per + 0.6
    kind, name = img
    if kind == "work" and H - 380 - y < 520:
        kind, name = "photo", PHOTOS[seed % len(PHOTOS)]
    if kind == "photo":
        avail = H - y - 40
        P = arch_photo(name, int(min(avail, 1050)), th)
        els.insert(0, El(P, W - P.width + 40, H - P.height, "slideup", 0.2, 1.1))
    else:
        avail = H - 380 - y
        C = work_card(name, W - 2 * pad + 40, int(min(avail - 100, 900)), tilt=-1.5)
        els.insert(0, El(C, (W - C.width) // 2, int(y + (avail - C.height) / 2), "slideup", 0.3, 1.1))
    hold = 1.6; t_end0 = t_text + hold; t_end = 3.6; total = t_end0 + t_end
    # end card
    E = []
    P2 = arch_photo("cut_arms-folded.png", 760, th)
    E.append(El(P2, (W - P2.width) // 2, 300, "slideup", 0, 0.9))
    endl = [R.clean(x) for x in v["end"].split("\n")]
    f1 = R.font(R.LORA, 62, 500); f2 = R.font(R.INTER_SB, 32)
    yy = 1130
    ln = Image.new("RGBA", (W, 4), (0, 0, 0, 0)); ImageDraw.Draw(ln).line([W / 2 - 60, 2, W / 2 + 60, 2], fill=T["acc"], width=3)
    E.append(El(ln, 0, 1100, "wipe", 0.4))
    for i, l in enumerate(endl):
        if i == 0:
            fl, wl, s = R.fit(l, R.LORA, W - 2 * pad, 220, 62, 44, wght=500)
            for wlx in wl:
                e = text_el(wlx, fl, T["fg"]); E.append(El(e, (W - e.width) // 2, yy, "rise", 0.5)); yy += s * 1.15
            yy += 20
        else:
            e = text_el(l.upper(), f2, T["acc"], tracking=0.16); E.append(El(e, (W - e.width) // 2, yy, "fade", 0.9)); yy += 56
    m2 = R.mono(90); E.append(El(m2, (W - m2.width) // 2, yy + 40, "pop", 1.2))
    bg = background(W, H, th, seed); pts = dust(26, W, H, seed)
    n = int(total * fps)
    def frames():
        for k in range(n):
            t = k / fps
            z = 1.0 + 0.06 * t / total
            fr = bg
            if t < t_end0 + 0.5:
                a = 1 - ease((t - t_end0) / 0.5) if t > t_end0 else 1
                L = composite(Image.new("RGBA", (W, H), (0, 0, 0, 0)), hdr + els, t)
                fr = composite(bg, [], None, zoom=z); fr.alpha_composite(fade(L, a))
            else:
                fr = composite(bg, [], None, zoom=z)
                fr.alpha_composite(composite(Image.new("RGBA", (W, H), (0, 0, 0, 0)), E, t - t_end0 - 0.3))
            draw_dust(fr, pts, t, H)
            yield np.asarray(fr.convert("RGB"))
    R.encode(frames(), W, H, fps, out)
    cov = composite(background(W, H, th, seed), hdr + els)
    cov.convert("RGB").save(out.replace(".mp4", "_cover.jpg"), quality=90)
    return out

# ---------------------------------------------------------------- image choice
PHOTOS = ["cut_arms-folded.png", "cut_linen.png", "cut_black.png", "cut_portrait.png", "cut_linen-dress.png"]
WEB = ["work_wix.png", "work_maltamove.png", "work_help.png"]
SOCIAL = ["work_vertui.png", "work_rockon.png", "work_ignite.png"]
BRAND = ["dar-packaging.jpg", "work_ignite.png", "work_vertui.png"]
SOMBRE = ("MOVEMBER", "11 NOVEMBER", "DIWALI", "REMEMBER")

def text_of(p):
    v = p["visual"]
    parts = [v.get("eyebrow", ""), v.get("head", ""), v.get("sub", "")] + v.get("lines", []) + [s.get("eyebrow", "") + " " + s.get("head", "") for s in v.get("slides", [])]
    return " ".join(parts).upper()

def choose(p, i):
    t = text_of(p); v = p["visual"]
    head = (v.get("eyebrow", "") + " " + v.get("head", "") + " " + (v.get("slides") or [{}])[0].get("eyebrow", "")).upper()
    if any(k in head for k in SOMBRE): return ("type", None)
    if p["net"] == "gmb" or p["fmt"] in ("POST", "publication", "REEL"):
        if any(k in t for k in ("WEBSITE", "LANDING PAGE", "SEO", "HAUNTED", "2019")): return ("work", WEB[i % 3])
        if any(k in t for k in ("CANVA", "TEMPLATE", "SOCIAL", "CONSISTEN", "POSTS")): return ("work", SOCIAL[i % 3])
        if any(k in t for k in ("BRAND", "LOGO")): return ("work", BRAND[i % 3])
    return ("photo", PHOTOS[i % len(PHOTOS)])

# ---------------------------------------------------------------- build
def build(only=None):
    import content
    man = []
    for i, p in enumerate(content.P):
        key = f"{p['date']}_{p['net']}_{p['fmt'].lower()}_{i:02d}"
        if only and only not in key: continue
        v = p["visual"]; tpl = v["tpl"]; files = []
        if tpl == "tiktok":
            continue
        img = choose(p, i)
        th_cycle = ["noir", "ivory", "blush"]
        if tpl in ("post",):
            th = v.get("theme") or th_cycle[i % 2]
            th = "noir" if p["net"] == "linkedin" else (th if p["net"] != "facebook" else ["ivory", "noir"][i % 2])
            els = lay_type(v, 1080, 1350, th) if img[0] == "type" else lay_photo(v, 1080, 1350, th, img[1]) if img[0] == "photo" else lay_work(v, 1080, 1350, th, img[1])
            files.append(still(els, 1080, 1350, th, f"{OUT}/{key}.jpg", seed=i))
        elif tpl == "carousel":
            n = len(v["slides"])
            for j, s in enumerate(v["slides"]):
                th = ("noir" if j % 2 == 0 else "ivory") if p["net"] != "linkedin" else "noir"
                pg = f"{j + 1:02d} / {n:02d}"
                if j == 0:
                    els = lay_type(s, 1080, 1350, th, page=pg) if img[0] == "type" else lay_photo(s, 1080, 1350, th, img[1], page=pg) if img[0] == "photo" else lay_work(s, 1080, 1350, th, img[1], page=pg)
                elif j == n - 1 and not re.search(r"\d", s.get("eyebrow", "")):
                    els = lay_photo(s, 1080, 1350, th, PHOTOS[(i + 2) % len(PHOTOS)], page=pg)
                else:
                    els = lay_step(s, 1080, 1350, th, page=pg)
                files.append(still(els, 1080, 1350, th, f"{OUT}/{key}_{j + 1}.jpg", seed=i * 10 + j))
        elif tpl == "story":
            import datetime as _d
            th = ["noir", "blush", "ivory"][_d.date.fromisoformat(p["date"]).toordinal() % 3]
            if img[0] == "type": th = "noir"
            els = lay_type(v, 1080, 1920, th, cta=v.get("cta"), video=True) if img[0] == "type" else lay_photo(v, 1080, 1920, th, img[1], cta=v.get("cta"), video=True)
            files.append(animate(els, 1080, 1920, th, f"{OUT}/{key}.mp4", dur=8.0, seed=i))
        elif tpl == "gbp":
            files.append(still(lay_gbp(v, 1200, 900, img if img[0] != "type" else ("photo", PHOTOS[i % 5])), 1200, 900, "noir", f"{OUT}/{key}.jpg", seed=i))
        elif tpl == "reel":
            import datetime as _d
            th = ["noir", "ivory"][(_d.date.fromisoformat(p["date"]).toordinal() + (1 if p["net"] == "facebook" else 0)) % 2]
            files.append(reel(v, f"{OUT}/{key}.mp4", th, img if img[0] != "type" else ("photo", PHOTOS[i % 5]), seed=i))
        man.append(dict(idx=i, key=key, files=[os.path.basename(f) for f in files]))
        print(key, files, flush=True)
    if not only:
        json.dump(man, open(f"{OUT}/manifest.json", "w"), indent=1)

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else None)
