"""
Case-study summary videos — motion-graphics edition.

Design system: eggshell canvas, ink type, Inter Light display, Geist Mono labels, taupe cards,
the brand gradient sphere as the one colour moment (see DESIGN.md).

Motion language:
  - Edit on a beat grid (80 BPM, 0.75s beats); every scene cut lands on a beat and a chord change.
  - Masked kinetic type: lines rise from behind their own baseline edge, staggered.
  - Numbers count to their values; hairlines draw left→right; the signature writes on.
  - No dead holds: a slow upward drift on every scene; staggered exits upward.
  - The product screenshot rises in on its card, then scrolls through.
  - Score is composed from the same timeline: chords on cuts, chimes on key entrances, soft swells into cuts.

Usage: python render.py <slug> <out.mp4> <poster.jpg>
"""
import json, os, re, subprocess, sys, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/Users/aishwaryapatil/Documents/pratikjoglekar/repo"
FFMPEG = open(os.path.join(HERE, "..", "ffpath")).read().strip()

W, H, FPS, DUR = 1920, 1080, 30, 30.0
N = int(FPS * DUR)
BEAT = 0.75  # 80 BPM

# ---- design tokens ----
EGGSHELL = (253, 252, 252); TAUPE = (245, 243, 241); STONE = (235, 232, 228)
INK = (0, 0, 0); GRAPHITE = (68, 64, 59); SMOKE = (119, 113, 105); ASH = (165, 159, 151)
EMBER = (255, 71, 4)
# Brand sphere gradient (matches public/lottie/sphere.json): saffron → cream midpoint → cobalt
SPHERE_STOPS = [(0.0, (255, 153, 51)), (0.28, (255, 153, 51)), (0.41, (255, 184, 116)), (0.5, (248, 223, 203)), (0.59, (157, 179, 222)), (0.74, (0, 71, 171)), (1.0, (0, 71, 171))]
MARGIN = 160

INTER = os.path.join(HERE, "fonts", "Inter.ttf")
MONO = os.path.join(HERE, "fonts", "GeistMono.ttf")
FALLBACK = "/System/Library/Fonts/SFNS.ttf"  # "→" only

# Scenes on the beat grid: (name, start, end)
SCENES = [("title", 0.0, 4.5), ("problem", 4.5, 9.75), ("decisions", 9.75, 17.25),
          ("work", 17.25, 22.5), ("outcome", 22.5, 27.75), ("sign", 27.75, 30.0)]
SCENE = {n: (a, b) for n, a, b in SCENES}


# ---------------------------------------------------------------- easing
def bezier(p1x, p1y, p2x, p2y):
    def s(t, a, b): return 3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3
    def ease(x):
        if x <= 0: return 0.0
        if x >= 1: return 1.0
        t = x
        for _ in range(10):
            d = 3 * p1x * (1 - t) ** 2 + 6 * (p2x - p1x) * (1 - t) * t + 3 * (1 - p2x) * t ** 2
            if abs(d) < 1e-7: break
            t = min(max(t - (s(t, p1x, p2x) - x) / d, 0), 1)
        return s(t, p1y, p2y)
    return ease

OUT = bezier(0.22, 1, 0.36, 1)      # the site's ease-out
IN = bezier(0.55, 0, 1, 0.45)       # exits
INOUT = bezier(0.65, 0, 0.35, 1)    # camera moves, scrolls, wipes

def clamp01(x): return 0.0 if x < 0 else 1.0 if x > 1 else x
def back_out(x, s=1.6):
    x = clamp01(x) - 1
    return x * x * ((s + 1) * x + s) + 1


# ---------------------------------------------------------------- type
_fonts = {}
def font(path, size, weight=None):
    k = (path, size, weight)
    if k not in _fonts:
        f = ImageFont.truetype(path, size)
        if weight is not None:
            try: f.set_variation_by_axes([weight])
            except Exception: pass
        _fonts[k] = f
    return _fonts[k]

_cmap = {p: TTFont(p).getBestCmap() for p in (INTER, MONO)}
def pick(path, size, weight, ch):
    if ch in " \n" or ord(ch) in _cmap[path]: return font(path, size, weight)
    return font(FALLBACK, size, 300 if (weight or 400) <= 400 else 500)

def lines_of(text, path, size, weight=None, tracking=0.0, max_width=None, upper=False):
    """Returns a list of RGBA images, one per wrapped line (box height = 1.25 × size)."""
    if upper: text = text.upper()
    track = tracking * size
    def adv(a, b):
        fa = pick(path, size, weight, a)
        if b is None or pick(path, size, weight, b) is not fa: return fa.getlength(a) + track
        return fa.getlength(a + b) - fa.getlength(b) + track
    def measure(s): return sum(adv(s[i], s[i + 1] if i + 1 < len(s) else None) for i in range(len(s))) - (track if s else 0)
    rows, cur = [], ""
    for w in text.split(" "):
        trial = (cur + " " + w).strip()
        if max_width and measure(trial) > max_width and cur: rows.append(cur); cur = w
        else: cur = trial
    rows.append(cur)
    out = []
    for row in rows:
        img = Image.new("RGBA", (int(measure(row)) + 6, int(size * 1.25)), (0, 0, 0, 0))
        d = ImageDraw.Draw(img); x = 0.0
        for i, ch in enumerate(row):
            d.text((x, 0), ch, font=pick(path, size, weight, ch), fill=(0, 0, 0, 255))
            x += adv(ch, row[i + 1] if i + 1 < len(row) else None)
        out.append(img)
    return out

def tint(img, color):
    a = np.asarray(img, dtype=np.float32) / 255.0
    rgb = np.empty_like(a[..., :3]); rgb[:] = np.array(color, dtype=np.float32) / 255.0
    return np.concatenate([rgb, a[..., 3:4]], axis=2)

def to_arr(img): return np.asarray(img.convert("RGBA"), dtype=np.float32) / 255.0


# ---------------------------------------------------------------- compositing
def composite(frame, arr, x, y, opacity=1.0, clip=None, xclip=None):
    """Alpha-composite arr at (x, y). clip=(y0, y1) and xclip=(x0, x1) limit the visible window."""
    if opacity <= 0.002: return
    h, w = arr.shape[:2]; x, y = int(round(x)), int(round(y))
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if clip: y0, y1 = max(y0, int(clip[0])), min(y1, int(clip[1]))
    if xclip: x0, x1 = max(x0, int(xclip[0])), min(x1, int(xclip[1]))
    if x0 >= x1 or y0 >= y1: return
    src = arr[y0 - y:y1 - y, x0 - x:x1 - x]
    a = src[..., 3:4] * opacity
    frame[y0:y1, x0:x1] = frame[y0:y1, x0:x1] * (1 - a) + src[..., :3] * a


# ---------------------------------------------------------------- items
DRIFT = 14     # px of slow upward camera drift across each scene
ENTER = 0.8    # s
EXIT = 0.45    # s

class Item:
    def __init__(self, scene, t_in, order=0):
        self.s0, self.s1 = SCENE[scene]
        self.t_in = t_in
        self.t_exit = None if scene == "sign" else self.s1 - 0.55 + min(order, 4) * 0.035
    def drift(self, t): return -DRIFT * INOUT(clamp01((t - self.s0) / (self.s1 - self.s0)))
    def enter(self, t, d=ENTER): return OUT(clamp01((t - self.t_in) / d))
    def leave(self, t): return 0.0 if self.t_exit is None else IN(clamp01((t - self.t_exit) / EXIT))
    def live(self, t): return self.t_in <= t <= self.s1 + 0.02 or (self.t_exit is None and t >= self.t_in)

class MaskLine(Item):
    """A line of type that rises into view from behind its own lower edge."""
    def __init__(self, arr, x, y, scene, t_in, order=0):
        super().__init__(scene, t_in, order); self.arr, self.x, self.y = arr, x, y
        self.h = arr.shape[0]
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t), self.leave(t)
        off = (1 - p) * self.h * 1.02 - q * self.h * 1.02
        base = self.y + self.drift(t)
        composite(f, self.arr, self.x, base + off, min(1, p * 1.4) * (1 - q * 0.6), clip=(base - 4, base + self.h + 2))

class Rise(Item):
    def __init__(self, arr, x, y, scene, t_in, order=0, dist=22):
        super().__init__(scene, t_in, order); self.arr, self.x, self.y, self.dist = arr, x, y, dist
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t), self.leave(t)
        composite(f, self.arr, self.x, self.y + self.drift(t) + (1 - p) * self.dist - q * 18, p * (1 - q))

class Hairline(Item):
    """Draws left → right."""
    def __init__(self, x, y, w, scene, t_in, order=0, color=STONE, thick=2):
        super().__init__(scene, t_in, order); self.x, self.y, self.w = x, y, w
        self.arr = np.ones((thick, w, 4), np.float32); self.arr[..., :3] = np.array(color) / 255.0
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t, 0.9), self.leave(t)
        composite(f, self.arr, self.x, self.y + self.drift(t), 1 - q, xclip=(self.x, self.x + self.w * p))

class Dot(Item):
    def __init__(self, x, y, r, color, scene, t_in, order=0):
        super().__init__(scene, t_in, order); self.x, self.y, self.r, self.color = x, y, r, color
    def draw(self, f, t):
        if not self.live(t): return
        s, q = back_out((t - self.t_in) / 0.6), self.leave(t)
        r = max(0.5, self.r * s)
        size = int(self.r * 4); img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        c = size / 2; ImageDraw.Draw(img).ellipse((c - r, c - r, c + r, c + r), fill=self.color + (255,))
        composite(f, to_arr(img), self.x - c, self.y - c + self.drift(t), 1 - q)

class Counter(Item):
    """A big number that masks in, then counts from `a` to `b`."""
    def __init__(self, value, x, y, size, scene, t_in, order=0):
        super().__init__(scene, t_in, order); self.x, self.y, self.size = x, y, size
        self.cache = {}
        m = re.match(r"^([\d.]+)(\D*?)\s*→\s*([\d.]+)(\D*)$", value)
        m1 = re.match(r"^([\d.]+)(\D*)$", value)
        if m:
            self.prefix = f"{m.group(1)}{m.group(2)} → "; self.a = float(m.group(1)); self.b = float(m.group(3)); self.suffix = m.group(4); src = m.group(3)
        elif m1:
            self.prefix = ""; self.a = 0.0; self.b = float(m1.group(1)); self.suffix = m1.group(2); src = m1.group(1)
        else:
            self.prefix, self.a, self.b, self.suffix, src = value, None, None, "", ""
        self.dec = len(src.split(".")[1]) if "." in src else 0
        self.final = self.text(1.0)
        self.h = int(size * 1.25)
    def text(self, k):
        if self.a is None: return self.prefix
        v = self.a + (self.b - self.a) * k
        return f"{self.prefix}{v:.{self.dec}f}{self.suffix}"
    def arr_for(self, s):
        if s not in self.cache:
            self.cache[s] = tint(lines_of(s, INTER, self.size, 300, -0.03)[0], INK)
        return self.cache[s]
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t), self.leave(t)
        k = OUT(clamp01((t - self.t_in - 0.25) / 1.3))
        arr = self.arr_for(self.text(k))
        off = (1 - p) * self.h - q * self.h
        base = self.y + self.drift(t)
        composite(f, arr, self.x, base + off, min(1, p * 1.4) * (1 - q * 0.6), clip=(base - 4, base + self.h + 2))

class Wipe(Item):
    """Writes on left → right (for the signature)."""
    def __init__(self, arr, x, y, scene, t_in, dur=1.6):
        super().__init__(scene, t_in); self.arr, self.x, self.y, self.dur = arr, x, y, dur
    def draw(self, f, t):
        if t < self.t_in: return
        p = INOUT(clamp01((t - self.t_in) / self.dur))
        composite(f, self.arr, self.x, self.y + self.drift(t), 1.0, xclip=(self.x, self.x + self.arr.shape[1] * p + 1))

class Sphere(Item):
    """The brand gradient sphere: a soft, slowly morphing saffron→cobalt blob."""
    def __init__(self, cx, cy, size, opacity, scene, t_in, blur=0.035, order=0):
        super().__init__(scene, t_in, order)
        self.cx, self.cy, self.size, self.opacity, self.blur = cx, cy, size, opacity, blur
        n = 160; g = np.linspace(-1.25, 1.25, n)
        self.X, self.Y = np.meshgrid(g, g)
    def field(self, t):
        X, Y = self.X, self.Y; f = np.zeros_like(X)
        for k, (w, ph, r) in enumerate([(0.42, 0.0, 0.26), (0.31, 2.1, 0.22), (0.55, 4.0, 0.2)]):
            cx, cy = r * np.cos(w * t + ph), r * np.sin(w * 1.3 * t + ph)
            f += np.exp(-((X - cx) ** 2 + (Y - cy) ** 2) / (2 * 0.36 ** 2))
        a = np.clip((f - 0.62) / 0.35, 0, 1); a = a * a * (3 - 2 * a)
        ang = 0.25 * t + 0.6
        gpos = np.clip(((X * np.cos(ang) + Y * np.sin(ang)) + 1.1) / 2.2, 0, 1)[..., None]
        xs = [s for s, _ in SPHERE_STOPS]
        rgb = np.stack([np.interp(gpos[..., 0], xs, [c[i] / 255.0 for _, c in SPHERE_STOPS]) for i in range(3)], -1).astype(np.float32)
        rgb = rgb + (1 - rgb) * 0.08 * np.clip(1 - ((X + 0.35) ** 2 + (Y + 0.4) ** 2) / 0.5, 0, 1)[..., None]  # soft highlight
        img = Image.fromarray((np.dstack([rgb, a]) * 255).astype(np.uint8), "RGBA")
        return img
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t, 1.4), self.leave(t)
        scale = (0.82 + 0.18 * p) * (1 + 0.06 * q)
        size = int(self.size * scale)
        img = self.field(t).resize((size, size), Image.BICUBIC).filter(ImageFilter.GaussianBlur(size * self.blur))
        composite(f, to_arr(img), self.cx - size / 2, self.cy - size / 2 + self.drift(t) * 1.6, self.opacity * p * (1 - q))

class WorkCard(Item):
    """Taupe card rises in, then the screenshot scrolls through top → bottom."""
    def __init__(self, shot, scene, t_in, order=0):
        super().__init__(scene, t_in, order)
        self.x0, self.y0, self.x1, self.y1 = MARGIN, 96, W - MARGIN, 870
        self.pad = 36
        cw, ch = self.x1 - self.x0, self.y1 - self.y0
        iw, ih = cw - 2 * self.pad, ch - 2 * self.pad
        k = iw / shot.width
        self.shot = shot.resize((iw, max(ih, int(shot.height * k))), Image.LANCZOS)
        self.iw, self.ih, self.cw, self.ch = iw, ih, cw, ch
        m = Image.new("L", (iw, ih), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, iw - 1, ih - 1), 14, fill=255)
        self.inner_mask = m
        m2 = Image.new("L", (cw, ch), 0); ImageDraw.Draw(m2).rounded_rectangle((0, 0, cw - 1, ch - 1), 28, fill=255)
        self.card_mask = m2
        self.scroll_from, self.scroll_to = t_in + 1.0, self.s1 - 0.75
    def draw(self, f, t):
        if not self.live(t): return
        p, q = self.enter(t, 1.0), self.leave(t)
        travel = self.shot.height - self.ih
        sy = int(travel * INOUT(clamp01((t - self.scroll_from) / (self.scroll_to - self.scroll_from))))
        canvas = Image.new("RGB", (self.cw, self.ch), TAUPE)
        canvas.paste(self.shot.crop((0, sy, self.iw, sy + self.ih)), (self.pad, self.pad), self.inner_mask)
        card = canvas.convert("RGBA"); card.putalpha(self.card_mask)
        s = 0.94 + 0.06 * p
        if s < 0.999:
            card = card.resize((int(self.cw * s), int(self.ch * s)), Image.BILINEAR)
        x = self.x0 + (self.cw - card.width) / 2
        y = self.y0 + (1 - p) * 70 - q * 30 + self.drift(t)
        composite(f, to_arr(card), x, y, p * (1 - q))


# ---------------------------------------------------------------- storyboard
def build(p):
    g = p["glance"]; items = []; cues = []  # cues: (time, intensity) for the score
    mono = lambda s, size=30, c=SMOKE: tint(lines_of(s, MONO, size, None, 0.08, upper=True)[0], c)

    # 1 · Title — eyebrow, title lines masked in, sphere on the right
    a, _ = SCENE["title"]
    tl = lines_of(p["title"], INTER, 120, 300, -0.035, max_width=1200)
    block = len(tl) * int(120 * 1.06)
    y = (H - block) // 2 + 30
    ex = MARGIN + (30 if p.get("current") else 0)
    items.append(MaskLine(mono(f"Case study · {p['company']} · {p['years']}"), ex, y - 86, "title", a + 0.25, 0))
    if p.get("current"): items.append(Dot(MARGIN + 8, y - 86 + 19, 8, EMBER, "title", a + 0.35))
    for i, im in enumerate(tl):
        items.append(MaskLine(tint(im, INK), MARGIN, y + i * int(120 * 1.06), "title", a + 0.45 + i * 0.12, i + 1))
    items.append(Sphere(1560, 540, 560, 0.95, "title", a + 0.1, order=3))
    cues += [(a + 0.45, 0.8)]

    # 2 · Problem — a single statement, lines masked in
    a, _ = SCENE["problem"]
    pl = lines_of(g["problem"], INTER, 76, 300, -0.02, max_width=1420)
    lh = int(76 * 1.2); y = (H - len(pl) * lh) // 2 + 30
    items.append(MaskLine(mono("The problem"), MARGIN, y - 96, "problem", a + 0.15, 0))
    for i, im in enumerate(pl):
        items.append(MaskLine(tint(im, INK), MARGIN, y + i * lh, "problem", a + 0.3 + i * 0.1, i + 1))
    cues += [(a + 0.3, 0.7)]

    # 3 · Key decisions — one per two beats; hairline draws, number pops, text masks in
    a, _ = SCENE["decisions"]
    rows = [lines_of(d, INTER, 58, 300, -0.02, max_width=1320) for d in g["decisions"]]
    lh = int(58 * 1.18); gap = 62
    total = sum(len(r) * lh for r in rows) + gap * (len(rows) - 1)
    y = (H - total) // 2 + 40
    items.append(MaskLine(mono("Key decisions"), MARGIN, y - 110, "decisions", a + 0.15, 0))
    for i, r in enumerate(rows):
        t0 = a + 0.4 + i * 2 * BEAT
        items.append(Hairline(MARGIN, y - gap // 2, W - 2 * MARGIN, "decisions", t0, i))
        items.append(Rise(mono(f"0{i + 1}", 34, ASH), MARGIN, y + 14, "decisions", t0 + 0.1, i, dist=14))
        for j, im in enumerate(r):
            items.append(MaskLine(tint(im, INK), MARGIN + 116, y + j * lh, "decisions", t0 + 0.15 + j * 0.08, i))
        cues.append((t0 + 0.1, 0.6))
        y += len(r) * lh + gap

    # 4 · The work — card rises, screenshot scrolls; role caption
    a, _ = SCENE["work"]
    # Flatten onto the card colour: some screenshots have transparent rounded corners,
    # which a plain RGB conversion would turn black.
    raw = Image.open(os.path.join(REPO, "public", p["image"].lstrip("/"))).convert("RGBA")
    shot = Image.new("RGB", raw.size, TAUPE); shot.paste(raw, (0, 0), raw)
    items.append(WorkCard(shot, "work", a + 0.1))
    lbl = mono("My role", 28)
    items.append(MaskLine(lbl, MARGIN, 926, "work", a + 0.55, 1))
    cap = tint(lines_of(f"{g['role']} · {g['duration']}", INTER, 38, 400)[0], GRAPHITE)
    items.append(MaskLine(cap, MARGIN + lbl.shape[1] + 26, 917, "work", a + 0.65, 2))
    cues += [(a + 0.1, 0.7)]

    # 5 · Outcome — numbers count to their values, on the beat
    a, _ = SCENE["outcome"]
    outs = g["outcomes"]; col = (W - 2 * MARGIN) // len(outs)
    size = 176
    widest = max(lines_of(Counter(o["value"], 0, 0, size, "outcome", 0).final, INTER, size, 300, -0.03)[0].width for o in outs)
    if widest > col - 100: size = int(size * (col - 100) / widest)
    labs = [lines_of(o["label"], INTER, 38, 400, 0, max_width=col - 90) for o in outs]
    block = int(size * 1.25) + 26 + max(len(l) for l in labs) * int(38 * 1.3)
    y = (H - block) // 2 + 30
    items.append(MaskLine(mono("Outcome"), MARGIN, y - 100, "outcome", a + 0.15, 0))
    for i, o in enumerate(outs):
        t0 = a + 0.35 + i * BEAT; x = MARGIN + i * col
        items.append(Counter(o["value"], x, y, size, "outcome", t0, i + 1))
        for j, im in enumerate(labs[i]):
            items.append(MaskLine(tint(im, SMOKE), x + 6, y + int(size * 1.25) + 26 + j * int(38 * 1.3), "outcome", t0 + 0.25 + j * 0.06, i + 1))
        cues.append((t0, 0.9))

    # 6 · Sign-off — soft sphere halo, signature writes on, URL masks in
    a, _ = SCENE["sign"]
    sig = Image.open(os.path.join(HERE, "signature.png")).convert("RGBA")
    sig = sig.resize((int(sig.width * 300 / sig.height), 300), Image.LANCZOS)
    sx, sy = (W - sig.width) // 2, (H - sig.height) // 2 - 50
    items.append(Sphere(960, 500, 900, 0.22, "sign", a + 0.05, blur=0.06))
    items.append(Wipe(to_arr(sig), sx, sy, "sign", a + 0.2, 1.5))
    url = mono("pratikjoglekar.com")
    items.append(MaskLine(url, (W - url.shape[1]) // 2, sy + sig.height + 24, "sign", a + 1.0, 1))
    cues += [(a + 0.2, 1.0)]

    return items, cues


# ---------------------------------------------------------------- score
NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
KEY = {"c4cintegrations": "D", "usage-intelligence": "C", "cancellation": "A", "dashboard": "F", "pricing-calculator": "G"}
# One chord per scene: I – vi – IV – ii – V – I
PROG = [(0, [0, 4, 7, 11, 14]), (9, [0, 3, 7, 10, 14]), (5, [0, 4, 7, 11, 16]),
        (2, [0, 3, 7, 10, 14]), (7, [0, 5, 7, 9, 14]), (0, [0, 4, 7, 11, 14])]

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)

def score(slug, cues, sr=44100):
    n = int(sr * DUR); t = np.arange(n) / sr
    L = np.zeros(n); R = np.zeros(n)
    root = 48 + NOTE[KEY.get(slug, "C")]
    rng = np.random.default_rng(7)

    def add(sig, start, pan=0.5):
        i = int(start * sr); j = min(n, i + len(sig))
        if i >= n: return
        L[i:j] += sig[:j - i] * (1 - pan); R[i:j] += sig[:j - i] * pan

    chord_at = []
    for (name, s0, s1), (deg, q) in zip(SCENES, PROG):
        base = root + deg - (12 if deg > 6 else 0)
        chord_at.append((s0, base, q))
        end = s1 if name != "sign" else DUR
        env = np.clip((t - s0 + 0.05) / 0.6, 0, 1) * np.clip((end + 1.2 - t) / 1.2, 0, 1)
        env = env ** 1.6
        for k, iv in enumerate(q):  # pad
            f = hz(base + 12 + iv); pan = 0.5 + 0.28 * np.sin(k * 1.9)
            tone = 0.55 * np.sin(2 * np.pi * f * t) + 0.45 * np.sin(2 * np.pi * f * 1.0035 * t + k)
            L += tone * env * 0.04 * (1 - pan); R += tone * env * 0.04 * pan
        sub = np.sin(2 * np.pi * hz(base) * t) * env * 0.05
        L += sub; R += sub

    def chord_for(time):
        c = chord_at[0]
        for ch in chord_at:
            if ch[0] <= time + 1e-6: c = ch
        return c

    # Pulse: soft plucks on every beat (arpeggiating the current chord), resting under the sign-off
    j = 0; time = BEAT
    while time < SCENE["sign"][0]:
        _, base, q = chord_for(time)
        f = hz(base + 24 + q[(j * 2) % 4]); d = np.arange(int(sr * 1.6)) / sr
        add(np.sin(2 * np.pi * f * d) * np.exp(-d * 3.2) * (1 - np.exp(-d * 150)) * 0.028 * (0.85 + 0.3 * rng.random()), time, 0.3 + 0.4 * (j % 2))
        j += 1; time += BEAT

    # Chimes on key entrances (bell: inharmonic partials, fast decay)
    for k, (ct, inten) in enumerate(cues):
        _, base, q = chord_for(ct)
        f = hz(base + 36 + q[k % len(q)] % 12); d = np.arange(int(sr * 2.5)) / sr
        bell = (np.sin(2 * np.pi * f * d) * np.exp(-d * 2.2) + 0.35 * np.sin(2 * np.pi * f * 2.76 * d) * np.exp(-d * 4.5)
                + 0.12 * np.sin(2 * np.pi * f * 5.4 * d) * np.exp(-d * 8)) * (1 - np.exp(-d * 400))
        add(bell * 0.03 * inten, ct, 0.35 + 0.3 * ((k % 3) / 2))

    # Soft swells into each cut (filtered noise)
    for name, s0, _ in SCENES[1:]:
        d = np.arange(int(sr * 0.9)) / sr
        noise = np.convolve(rng.standard_normal(len(d)), np.ones(24) / 24, mode="same")
        env = np.where(d < 0.6, (d / 0.6) ** 2, np.exp(-(d - 0.6) * 14))
        add(noise * env * 0.05, s0 - 0.6, 0.5)

    # Final resolve: low chord bloom under the signature
    _, base, q = chord_at[-1]
    d = np.arange(int(sr * (DUR - SCENE["sign"][0]))) / sr
    for k, iv in enumerate(q[:4]):
        add(np.sin(2 * np.pi * hz(base + 24 + iv) * d) * np.exp(-d * 0.9) * (1 - np.exp(-d * 60)) * 0.02, SCENE["sign"][0] + 0.2 + k * 0.06, 0.3 + 0.13 * k)

    # Reverb (FFT convolution with a decaying noise tail), gentle high cut, fades, level
    ir_n = int(sr * 3.0); ir_t = np.arange(ir_n) / sr
    def ir(seed):
        r = np.random.default_rng(seed).standard_normal(ir_n) * np.exp(-ir_t * 2.0); return r / np.sqrt(np.sum(r ** 2))
    def conv(x, h):
        m = len(x) + len(h) - 1; size = 1 << (m - 1).bit_length()
        return np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(h, size), size)[:len(x)]
    L = 0.7 * L + 0.6 * conv(L, ir(1)); R = 0.7 * R + 0.6 * conv(R, ir(2))
    k = np.ones(5) / 5; L = np.convolve(L, k, mode="same"); R = np.convolve(R, k, mode="same")
    fade = np.clip(t / 0.8, 0, 1) * np.clip((DUR - t) / 1.4, 0, 1)
    L *= fade; R *= fade
    peak = max(np.abs(L).max(), np.abs(R).max())
    return np.stack([L, R], 1) / peak * 0.32, sr

def write_wav(path, data, sr):
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((np.clip(data, -1, 1) * 32767).astype("<i2").tobytes())


# ---------------------------------------------------------------- main
def main():
    slug, out, poster = sys.argv[1], sys.argv[2], sys.argv[3]
    p = {x["slug"]: x for x in json.load(open(os.path.join(HERE, "projects.json")))}[slug]
    items, cues = build(p)
    wav = os.path.join(HERE, f"{slug}.wav"); write_wav(wav, *score(slug, cues))

    base = np.empty((H, W, 3), np.float32); base[:] = np.array(EGGSHELL, np.float32) / 255.0
    ff = subprocess.Popen([FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-i", wav,
        "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out], stdin=subprocess.PIPE)

    poster_frame = int(FPS * (SCENE["work"][0] + 1.0))  # card fully in, before the scroll
    for i in range(N):
        t = i / FPS; f = base.copy()
        for it in items: it.draw(f, t)
        if i == poster_frame:
            Image.fromarray((f * 255 + 0.5).astype(np.uint8)).resize((1280, 720), Image.LANCZOS).save(poster, quality=85)
        f[H - 4:, :] = np.array(STONE) / 255.0
        f[H - 4:, : int(W * (i + 1) / N)] = np.array(INK) / 255.0
        ff.stdin.write((f * 255 + 0.5).astype(np.uint8).tobytes())
    ff.stdin.close(); ff.wait()
    print(f"{slug}: {os.path.getsize(out) / 1e6:.1f} MB")

if __name__ == "__main__":
    main()
