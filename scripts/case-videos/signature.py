"""Renders 'Pratik Joglekar' in Jalliya with its 'liga' ligatures applied (Pillow can't shape them)."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.freetypePen import FreeTypePen
from fontTools.pens.transformPen import TransformPen
from PIL import Image
import numpy as np

def shape(font, text):
    cmap = font.getBestCmap()
    glyphs = [cmap[ord(c)] for c in text]
    gsub = font["GSUB"].table
    idx = sorted({i for fr in gsub.FeatureList.FeatureRecord if fr.FeatureTag == "liga" for i in fr.Feature.LookupListIndex})
    for li in idx:
        lookup = gsub.LookupList.Lookup[li]
        subs = []
        for st in lookup.SubTable:
            if lookup.LookupType == 7:  # extension wrapper
                st = st.ExtSubTable
            if hasattr(st, "ligatures"):
                subs.append(st.ligatures)
        out, i = [], 0
        while i < len(glyphs):
            done = False
            for ligs in subs:
                for lig in sorted(ligs.get(glyphs[i], []), key=lambda l: -len(l.Component)):
                    n = len(lig.Component)
                    if glyphs[i + 1:i + 1 + n] == lig.Component:
                        out.append(lig.LigGlyph); i += 1 + n; done = True; break
                if done: break
            if not done:
                out.append(glyphs[i]); i += 1
        glyphs = out
    return glyphs

def render(path, text, px_height, out):
    font = TTFont(path)
    gs = font.getGlyphSet()
    upm = font["head"].unitsPerEm
    glyphs = shape(font, text)
    pen = FreeTypePen(gs)
    x = 0
    for g in glyphs:
        gs[g].draw(TransformPen(pen, (1, 0, 0, 1, x, 0)))
        x += font["hmtx"][g][0]
    scale = px_height / upm
    img = pen.image(contain=True)  # renders at 1 unit = 1px, cropped to the drawing
    # resample to the target size
    w, h = img.size
    img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    img.save(out)
    print("glyphs:", len(text), "->", len(glyphs), "| size:", img.size, "| mode:", img.mode)

render(sys.argv[1], "Pratik Joglekar", int(sys.argv[2]), sys.argv[3])
