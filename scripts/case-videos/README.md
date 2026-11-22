# Case-study summary videos

Generates the 30-second video at the top of each case study
(`public/videos/case/<slug>.mp4` + `<slug>-poster.jpg`) from `lib/projects.ts`,
using the site's design tokens, fonts and motion curve, with original
ambient music composed in code (no licensed audio).

Storyboard (cut on an 80 BPM beat grid): title + sphere (0–4.5s) → problem (–9.75s) →
three key decisions, one every two beats (–17.25s) → the work, card rises then the screenshot
scrolls (–22.5s) → outcome numbers count up (–27.75s) → signature writes on over a soft sphere (–30s).

Motion: masked line reveals, count-ups, hairlines that draw, a slow upward drift on every scene,
staggered exits. The score is composed from the same timeline: one chord per scene (I–vi–IV–ii–V–I),
chimes on key entrances, soft swells into each cut. Re-render whenever a project's facts in `lib/projects.ts` change.

## Requirements

Python 3.10+ with `pillow numpy fonttools brotli freetype-py imageio-ffmpeg`.

`render.py` expects, next to it:

- `fonts/Inter.ttf`, `fonts/GeistMono.ttf`, `fonts/Jalliya.ttf`: the site's fonts converted
  from WOFF2 (Inter and Geist Mono come from `.next/static/media` after a build;
  Jalliya from `public/fonts`), e.g. with `fontTools.ttLib.TTFont(f).save(...)` after setting `flavor = None`.
- `projects.json`: `lib/projects.ts` exported as JSON.
- `signature.png`: `python signature.py fonts/Jalliya.ttf 1400 signature.png`.
- `../ffpath`: a file containing the path to ffmpeg
  (`python -c "import imageio_ffmpeg as f; print(f.get_ffmpeg_exe())"`).

Then:

```bash
python render.py dashboard ../../public/videos/case/dashboard.mp4 ../../public/videos/case/dashboard-poster.jpg
```

Output: 1920×1080, 30fps, H.264 + AAC, about 2–3 MB, music at about −20 LUFS.
