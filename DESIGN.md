# Design system

Source: Refero Styles, "ElevenLabs" style
https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26

> Warm cream editorial with whispered headlines. Eggshell paper, black ink,
> and a single violet and orange spark for product moments.

Theme: light only.

The site uses a warm off-white canvas (`#fdfcfc`), black type and one layer of
warm taupe surfaces (`#f5f3f1`). Display headlines are whisper-weight (300) with
tight -0.02em tracking; everything else is Inter 400/500. Two accent sparks,
violet `#0447ff` and orange `#ff4704`, appear only inside decorative visuals,
never as UI chrome. Components are flat with 1px hairline borders, 20px card
radii and fully pilled buttons.

All tokens live in [`app/globals.css`](app/globals.css). Reusable components
live in [`components/ds/`](components/ds/).

## Brand mark

The monogram (`components/ds/Monogram.tsx`): two slanted ink slabs joined by a mirrored
S-curve, traced from the supplied artwork. It replaces the old handwritten signature.

- **Header** (home): 28px (32px on desktop) on a 44px round hit area, links home.
- **Case-study bar:** 24px, top right, links home.
- **Favicon:** `app/icon.svg` (ink, turns eggshell in dark mode), `app/favicon.ico`
  (16/32/48px), `app/apple-icon.png` (180px, eggshell tile).
- **Link preview:** top left of `app/opengraph-image.tsx`, beside the name.
- Always single-colour (`currentColor`). Don't outline, recolour with the accent sparks,
  or add a wordmark lock-up without a reason.

## Colors

| Name | Value | Tailwind | Role |
|------|-------|----------|------|
| Eggshell | `#fdfcfc` | `eggshell` | Page canvas, button and card surfaces. Never use pure `#fff`. |
| Warm Taupe | `#f5f3f1` | `warm-taupe` | Section bands, feature cards, secondary surface |
| Stone | `#ebe8e4` | `stone` | Hairline borders, dividers, icon plates |
| Ink | `#000000` | `ink` | Primary text, filled buttons, nav, links |
| Graphite | `#44403b` | `graphite` | Strong secondary text, section labels |
| Smoke | `#6b655e` | `smoke` | Body text, muted descriptions, captions (darkened from #777169 so it passes 4.5:1 on taupe and stone too) |
| Ash | `#a59f97` | `ash` | Faintest helper text, footnotes (decorative only: fails contrast for body text) |
| Violet Spark | `#0447ff` | `violet-spark` | Decorative visuals only |
| Ember Orange | `#ff4704` | `ember-orange` | Decorative visuals and the "current" status dot only |

Surfaces stack eggshell → taupe → stone.

The shadcn variables (`--background`, `--muted`, `--border` and so on) are
mapped onto these tokens, so `bg-muted`, `text-muted-foreground` and friends
still work and stay on-palette.

## Typography

| Role | Family | Weight | Size / line-height | Tracking | Tailwind |
|------|--------|--------|--------------------|----------|----------|
| headline | Fraunces (variable serif) | 300 | `text-hero` / `text-display` / `text-heading` | from the size token | `font-headline` |
| display | Display (Inter Light, Waldenburg substitute) | 300 | 48 / 1.08 (clamped up to 72 on wide screens via `text-hero`) | -0.02em | `text-display` |
| heading | Display | 300 | 36 / 1.17 | -0.02em | `text-heading` |
| heading-sm | Display | 300 | 32 / 1.13 | -0.02em | `text-heading-sm` |
| body-lg | Inter | 400 | 20 / 1.35 | normal | `text-body-lg` |
| subheading | Inter | 400 | 18 / 1.6 | normal | `text-subheading` |
| body | Inter | 400 | 16 / 1.5 | 0.01em | `text-body` |
| body-sm | Inter | 400/500 | 14 / 1.5 | 0.01em | `text-body-sm` |
| mono | Geist Mono | 400 | 13 / 1.69 | normal | `font-mono text-mono` |
| caption | Inter | 400 | 13 / 1.6 (minimum text size on the site) | normal | `text-caption` |

- `font-headline` (Fraunces Light, optical size automatic) gives the site its voice, and is used only for the few biggest lines: the home headline, case-study titles, case-study chapter titles, the results numbers, the next-case-study title, the footer's closing line and the 404 headline. Everything else stays sans, so the serif stays rare.
- `font-display` for the other headings 24px and up (work-row titles, section and sub-section titles, metrics), always weight 300. Never bold either. **One exception:** hovering the home headline thickens its two key phrases ("complex products", "feel simple") from 300 to 500 over 0.6s, and draws a wavy saffron-to-cobalt underline under each word, left to right and word after word, that keeps flowing while hovered (like a wavy progress indicator). Letter spacing inside each word tightens to −0.07em with the weight (and a matching 0.07em right margin gives back the space after the word), so the phrases keep their width within about a pixel and nothing else moves. Each word has its own wave so it still works where a phrase wraps. Styles: `.hero-key` and `.hero-word` in `globals.css`; Fraunces is loaded as a variable font so the weight glides. Reduced motion: the wave appears but doesn't travel.
- `font-sans` (Inter) for everything else; 500 only for buttons and emphasised links.
- Waldenburg is a commercial typeface. Inter Light stands in for it. If a
  licence is bought later, add it with `next/font/local` as `--font-display`.

## Spacing and layout

- Base unit 4px; Tailwind's default spacing scale already matches.
- Page max width 1280px (`max-w-page`), 64px outer gutters on desktop, 24px on mobile.
- Section gap 96–128px. Card padding 32px. Element gap 8–16px.

## Radius

| Element | Value | Tailwind |
|---------|-------|----------|
| Buttons, tags, tab pills | 9999px | `rounded-full` |
| Cards | 20px | `rounded-card` |
| Large cards | 24px | `rounded-card-lg` |
| Small elements | 10px | `rounded-small` |
| Inputs | 4px | `rounded-input` |

## Elevation

- `shadow-whisper`: buttons and elevated cards. `0 0 1px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.04), 0 2px 4px rgba(0,0,0,.04)`
- `shadow-hairline`: inset hairline and focus halo. `inset 0 0 0 .5px rgba(0,0,0,.075)`
- No blurred, heavy shadows. Prefer a 1px `stone` border.

## Components (`components/ds/`)

| Component | Spec |
|-----------|------|
| Button style: filled | Ink fill, eggshell text, pill, 16px horizontal padding, Inter 14/500 (e.g. Sutra's send button) |
| Button style: outline | Eggshell fill, ink text, 1px `#e5e5e5` border, pill, whisper shadow (e.g. Copy email) |
| Button style: ghost | Transparent, ink text, pill; taupe fill on hover (e.g. Sutra's close button) |

Button styles are applied per element; there is no shared Button component (the unused one was removed).
| `Tag` | Pill, 1px stone border, Inter 12/500; optional status dot (orange = current) |
| `Card tone="taupe"` | Taupe fill, 20px radius, 32px padding, no border, no shadow. The default card. |
| `Card tone="raised"` | Eggshell fill, 20px radius, whisper shadow. Use sparingly. |
| `Divider` | 1px solid stone hairline |
| `Sphere` | Soft radial violet/orange/pink gradient circle. Decorative only. |
| `SectionHeader` | Mono eyebrow + display heading |
| Work tile (`components/Projects.tsx`) | A bento grid of taupe tiles (24px radius, 10px padding), each with the case study's screen (`image` in `lib/projects.ts`) on top, then company · years, the title in the headline serif (the link; the whole tile is clickable) and the count-up metric. From 1024px: 12 columns, 150px rows: featured current project 8×3, tall tile 4×3, then 5×2 and 7×2, then a wide 12×2 tile with the screen left and text right. From 768px: the featured tile spans both columns, the other four pair up. Phones: one column. The metric sits beside the title only where the tile is wide enough, otherwise under it. Hover (mouse only, `components/BentoMotion.tsx`): on the hero sphere's spring, the hovered tile leans up to 8px toward the cursor and grows 1%, while every other tile drifts 6px directly away from it, making room; gaps between tiles hand the hover over without a bounce, and all tiles settle when the pointer leaves the grid. The screen also zooms 3%, the title underlines, a faint shadow appears and an arrow chip shows top right. Still for reduced motion and on touch. No cursor-following preview. |

## Do

- Use the display face at 300 for every headline 24px+, with -0.02em tracking.
- Make every button, tag and tab pill fully rounded.
- Use ink filled + eggshell outline as the only button hierarchy.
- Keep violet and orange inside decorative visuals.
- Separate sections with 1px stone hairlines rather than shadows.
- Stack surfaces eggshell → taupe → stone.

## Don't

- Don't bold or semibold display type (except the two home-headline phrases on hover).
- Don't use violet or orange for buttons, links, borders or text.
- Don't add heavy drop shadows.
- Don't introduce new accent colours. The palette is ~97% achromatic.
- Don't use corners under 8px on cards or panels.
- Don't use `#ffffff` backgrounds.

## Page principles

These came out of the UX audit and keep the site simple.

- **One idea per section, one way to do each thing.** No action appears twice on a page.
- **The email address is always visible** as text, in the footer of every page. Copy is secondary.
- **The footer closes with an ask:** "Hiring for a Senior+ role? Let’s talk." in the headline serif, above the email, so it says what Pratik is looking for.
- **Every claim has a number.** Project facts live once in [`lib/projects.ts`](lib/projects.ts)
  and feed the home page, the case-study "At a glance" block and link previews.
- **Home:** header (Work · About · LinkedIn · Email; About hides on phones) → intro beside the sphere (headline "I design complex products that feel simple.", one supporting line, and one grey mono line: Senior Product Designer · B2B SaaS · Enterprise · EdTech · Financial services) → work tiles (bento) → about → footer.
- **Sutra** is the site's AI assistant (header: "AI assistant · Answers from Pratik’s portfolio"). It speaks as itself and about Pratik by name, and answers only from `components/data/portfolio.txt`. It opens from the hero sphere ("Ask Sutra"), and on case studies from the "Ask Sutra about this" pill in the sticky bar (one entry point per page). Its outline is a 1.5px saffron-to-cobalt ring (`.sutra-ring`): still at rest so it never pulls at readers, one 3s turn when the page opens, and turning only while hovered or focused. Still for reduced motion. Suggested questions appear inside Sutra, not on the page.
- **Sutra's surface** (`components/AskMe.tsx`, mounted in the root layout so one conversation follows the visitor across pages): from 768px a 420px panel on the right, 12px from the window edges, that opens as a soft-edged circle (120px feather) growing out of whatever opened it over about 1s, with a gentle ease-out; the sphere's saffron and cobalt fill it, hold, then dissolve while the chat fades in underneath (fully settled at about 1.7s); it closes by shrinking back into that point. The page slides over in 1s to match. Panel and sheet have a 1.5px saffron-to-cobalt border whose colours travel around the edge once every 8s (`.sutra-border` in `globals.css`; still for reduced motion), plus a soft outer glow: the same gradient blurred 26px at 30% opacity behind the panel, turning in step with the border (`.sutra-glow`). It comes up after the panel opens and goes first on close; from 1024px the page makes room for it (`.sutra-open` pads the body by 444px; fixed bars with `.sutra-aware` move too) so reading and asking happen side by side. It's non-modal; Escape or ✕ closes it. On phones it's a bottom sheet (88% of the screen) over a dimmed page: drag the handle down, tap outside or press Escape to close. On a case study Sutra knows which one is open: the header says "On this page: …", the suggestions come from that project's `questions` in `lib/projects.ts`, and the API is told which case study "this" means. The greeting is one line; suggestions sit just above the input until the first question. The pill always sits on the centre of the sphere: up to 400px beside the intro on desktop, 240px (288px on large phones) below it, centred on the screen, on phones.
- **Sutra's logo** (`components/SutraMark.tsx`): an S drawn as one thread with tapered ends and a dot at each end; a second stroke rises from the lower left and passes in front of the right-hand turn, with a hairline gap. *Sūtra* means thread, and a sutra is knowledge distilled into the fewest words. Traced from the supplied artwork; it uses `currentColor` (ink on the site). It sits on a taupe plate in the chat header and beside "Ask Sutra".
- **Sutra loading** (`active`): the top dot appears, the thread draws through the S, the rising stroke follows, the bottom dot lands, then the thread runs out and the 2.6s loop restarts. Shown beside "Thinking…" in the chat. It holds still for reduced motion. Use longhand `animation-*` properties for it: the CSS build drops a nameless `animation` shorthand.
- **Hover on the sphere or "Ask Sutra":** driven by Motion springs, not timed transitions, so it follows the cursor and never snaps. The sphere leans up to 14px toward the pointer, tilts up to 10° and swells 6%; the pill leans 6px (less than the sphere, for depth) and lifts 2px; the logo turns with the cursor and grows 12%. Everything springs back on leave; keyboard focus gets the swell. No movement for reduced motion.
- **No résumé on the site.** LinkedIn and Email are the two calls to action, both always in the header.
- **Headings:** every page section has a real heading (section labels are `<Eyebrow as="h2">`), so screen-reader users can jump between them.
- **Keyboard:** a "Skip to content" link appears on the first Tab; focused rows get a 2px ink outline.
- **Phones:** case studies show a floating chapter pill (current chapter, progress, tap for the list).
- **Case study:** company · years · read time (`readMinutes` in `lib/projects.ts`) → title → TL;DR → "Prefer to watch?" 30-second summary video (after the text, so visitors know where they are first; it doubles as the hero visual) → At a glance (Problem · My role · Key decisions · Outcome) →
  five chapters: Context, Problem, Approach, Outcome, Reflection → next case study → footer.
- **Case-study building blocks** (`components/case-study/CaseStudy.tsx`): `DecisionLog` (Decision → Why → Tradeoff → Mitigation), `Callout`, `Figure`, `DataTable` (for findings mapped to design, and for honest attribution: decision → result it plausibly affected → evidence), and `ScreenPlaceholder` (a dashed taupe frame that says which screen still needs adding; swap it for a `Figure` once the screen exists). The integration study is the template the others should move toward: concrete pain, field findings mapped to design, a stated strategy, decisions with their cost, and claims marked as hypotheses where they are.
- **Built for skimmers:** every chapter opens with an "In short" line (the `summary` prop on `Chapter`): the chapter in one sentence, with an ink rule on the left, so reading only the headings and these lines still tells the whole story.
- **Results moment:** the Outcome chapter opens with `<Results slug>`: the outcomes from `lib/projects.ts`, set in the headline serif (48px, 56px from 1280px) between hairlines, counting up when seen. Don't repeat the same numbers in `OutcomeCard`s further down.
- **Links:** a row or card is clickable as a whole, but only its title is the link,
  so screen readers hear a short name.
- **Minimum text size** is 13px.

## Motion (Lottie)

Animations come from LottieFiles and are **recoloured to the palette** before use
(icons → ink on eggshell; the hero sphere → saffron `#FF9933` to cobalt `#0047AB` in one long, soft blend through cream (no hard edge)). Files live in
[`public/lottie/`](public/lottie/) and play through [`components/ds/Lottie.tsx`](components/ds/Lottie.tsx).

| Where | File | Behaviour |
|-------|------|-----------|
| Home intro | `sphere.json` | Saffron to cobalt. Slow loop while on screen, softly blurred; it is the "Ask Sutra" button and grows slightly on hover. Up to 400px on desktop, 240px on phones, always behind the pill. The one place for colour. |
| Case-study header | same project icon | Plays once when it scrolls into view |
| Footer | `mail.json` | Plays once when the footer scrolls into view |

- Icons sit on a taupe circular plate (40px in rows, 56px in headers).
- Every animation is decorative (`aria-hidden`) and shows a still frame when the
  visitor prefers reduced motion.
- Don't add animations that carry meaning, loop near text, or use colours outside the palette.

## Motion (layout reveals)

Built with [Motion](https://motion.dev) (`motion/react`). Primitives live in
[`components/ds/Motion.tsx`](components/ds/Motion.tsx); use them instead of writing
one-off animations.

| Token | Value |
|-------|-------|
| Ease | `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out) |
| Duration | 0.7s |
| Rise | 16px |
| Stagger | 0.08s between siblings |
| Trigger | once, when any part is 80px inside the viewport |

| Primitive | Use |
|-----------|-----|
| `<Reveal>` | Fade and rise one block on scroll; `immediate` for above-the-fold content |
| `<Stagger>` + `<StaggerItem>` | A group whose children rise one after another (hero lines, work tiles, At a glance) |

Where it's used: hero lines on load, sphere fade-in, work tiles, About, footer,
case-study header, At a glance, chapter headings, sections, callouts, decision logs and figures.

- **Everything plays once.** Nothing re-animates when scrolling back up.
- **Reduced motion:** `MotionProvider` (in `app/layout.tsx`) sets `reducedMotion="user"`,
  so those visitors get a fade only, with no movement.
- Hover effects stay in CSS (`transition-*`) and use the same ease.
- Never use a percentage `amount` for the in-view trigger: sections taller than the
  screen would never reach it and would stay invisible.

## Micro-interactions

Two signature effects, used only on the site's key moments. Don't add them to body text,
tables, ordinary links or list rows (work tiles already have a lift, zoom and arrow on
hover; a fourth signal was too much), or they stop meaning anything.

| Effect | Where | Built with |
|--------|-------|------------|
| Header hover pill: one taupe pill that appears under the first link you point at, glides between links (0.35s) and fades when you leave; adjacent links never fade their own backgrounds, which flickered | Home header nav | `components/HeaderNav.tsx` |
| Wavy underline: saffron-to-cobalt wave drawn in word by word, flowing while active | Home headline key phrases, "Next case study" title, footer email (also plays once for 1.6s after Copy) | `components/ds/WaveText.tsx` + `.wave-word` in `globals.css`. Put `wave-trigger` on the hover area, or add `wave-on` to force it. Sized in em (min 7px tall) |
| Spring follow: element leans toward the cursor and springs back | Hero sphere and "Ask Sutra" pill; "Next case study" title (12px) with its arrow on a looser spring so it trails | Motion `useSpring` (see `HeroAsk.tsx`, `NextProjectCard.tsx`). Only on large, single targets |
| Page intro: a saffron-to-cobalt gradient fills the screen, the monogram's slabs slide in along their slant and lock together at the centre (176px), then the layer dissolves (blur + fade) | Every page load and every page change, e.g. opening a case study (1s: slabs meet by 0.55s, the layer dissolves from 0.6s to 1.0s; fine film grain over the gradient); not on same-page anchor jumps. Above-the-fold animations wait for it | `components/Intro.tsx` + `.intro` in `globals.css` (pure CSS, so it shows from the first paint); `INTRO_SECONDS` / `introDelay()` in `Motion.tsx` |
| Monogram parting: the two slabs part along their slant and click back together, once | Hover or focus on the monogram in the header and case-study bar | `<Monogram part />` + `.mono-part` in `globals.css` |
| Mask reveal: headings slide up from behind an invisible edge, once | Case-study chapter numbers and titles, section titles | `MaskReveal` in `Motion.tsx` |
| Scale-in: the case-study video settles from 96% to full size | Case-study header, after the title and TL;DR | `Reveal` with `initial`/`animate` in `CaseStudy.tsx` |
| Count-up: numbers count from zero once when seen; a before → after figure keeps the "before" still and runs the "after" from it (57% → 7% counts down) | Work-row metrics, the results band, outcome cards | `components/ds/CountUp.tsx`; screen readers get the final value |

All of them hold still for reduced motion (the intro is skipped entirely).

## Case-study videos

Each case study opens with a 30-second summary (`public/videos/case/<slug>.mp4`), rendered from
`lib/projects.ts` by [`scripts/case-videos`](scripts/case-videos/README.md) in this design system:
eggshell canvas, Inter Light headlines, Geist Mono labels, taupe card, the site's ease and rise, and a
thin ink progress line. Storyboard: title → problem → three key decisions → the work → outcome → signature.
Cuts land on an 80 BPM beat grid; type reveals through masks, numbers count up, hairlines draw,
the screenshot scrolls, and the signature writes on. The brand sphere (saffron to cobalt, as on the home page) opens and closes each video.

- **Music:** original score composed in code from the video's own timeline (chord per scene, chimes on key moments,
  a different key per study), about −20 LUFS. No licensed audio.
- **Player:** poster shows the work; nothing loads or plays until "Watch" is pressed, then native controls appear.
- **Text is burned in**, so the video needs no captions; there is no speech.
- Re-render after changing a project's facts in `lib/projects.ts`.
