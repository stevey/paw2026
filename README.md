# PAW '26 — Plank Annual Workgathering

Static event site for PAW '26, May 28–29, 2026 in Montréal. Public — but built for internal Plank use.

---

## About this project

This is a vibe coded site — built by Steve Bissonnette with Claude Code doing the heavy lifting. Steve learned a bit along the way, including a good look at how SVGs work, some Leaflet.js and map tiles, PDF download considerations, and general GitHub skills.

---

## Features

- **Hero canvas with two artwork modes** — click anywhere on the hero to spawn randomly sized, rotated, and coloured shapes that fade to 20% opacity with a soft CSS blur dissolve; up to 50 persist at once, oldest evicted first; colour palette sourced from official Plank brand guidelines
  - **✳︎ logo mode** (default) — spawns the Plank monogram SVG; sizes from 100 px up to viewport max
  - **✳︎ shape mode** — randomly picks one of 11 hand-drawn organic SVG shapes from `/svgs/`; sizes from 200 px up to viewport max; each shape uses a computed tight `viewBox` centred on its path bounds so the animation always originates from the visual centre
  - **Mode toggle** — small `✳︎ logo` / `✳︎ shape` button to the left of the clear button; switches mode without clearing existing canvas art
- **Two-column schedule** — Thursday and Friday side-by-side with time labels, event descriptions, and colour-coded tag pills (Food, Social, Optional, Activity, All Hands, Ongoing)
- **Activity highlights grid** — six feature cards covering Swag, Yoga, Walking Tour, Pottery, Volunteering, and Team Photos
- **Interactive Leaflet map** — four location markers with popups; tiles swap between light and dark CartoDB styles to match the active theme
- **Location cards** — address, event note, and direct Google Maps links for each venue
- **FAQ accordion** — single-open accordion with animated expand/collapse and keyboard support
- **Dark / light mode** — full-page theme toggle, respects `prefers-color-scheme` on first load, persisted in `localStorage`
- **Responsive layout** — single-column mobile (< 640 px), two-column schedule collapses at 900 px, full-screen mobile nav overlay
- **Sticky nav** — backdrop blur + border on scroll; hamburger menu on mobile
- **Footer Slack links** — direct deep-links to Steve's profile and `#paw-event-2026` channel
- **Vibe bar** — sticky top banner crediting the project; styled in Plank Forest Green with Sage Green text
- **Hero artwork export** — "↓ save artwork" button captures the full canvas (both logo and shape mode elements) at native resolution (×devicePixelRatio) as a PNG; blur baked in via `<feGaussianBlur>` per element; `VW`/`VH`/`PAD` computed from each element's actual `viewBox` so blur padding scales correctly for any shape size
- **Hero canvas controls** — "✕ clear" resets both logo and shape elements; all controls start inactive with a hint label and unlock progressively as artwork is created
- **Schedule PDF export** — coral "↓ Download PDF" button beside each day heading generates a single-page A4 PDF of that day's schedule; always renders in light mode with a clean white background and 10% side margins regardless of current theme

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) |
| Styles | Vanilla CSS with custom properties; no preprocessor or build step |
| Scripts | Vanilla ES6 JS; no frameworks or bundler |
| Fonts | Google Fonts — DM Serif Display (headings), DM Sans (body), DM Mono (time labels / metadata) |
| Map | [Leaflet.js v1.9.4](https://leafletjs.com/) via unpkg CDN |
| Map tiles | [CartoDB](https://carto.com/attributions) light (`light_all`) and dark (`dark_all`) via OpenStreetMap data |
| Geocoding | [Nominatim / OpenStreetMap](https://nominatim.openstreetmap.org/) used to derive accurate venue coordinates |
| PDF export | [jsPDF v2.5.1](https://github.com/parallax/jsPDF) + [html2canvas v1.4.1](https://html2canvas.hertzen.com/) via unpkg CDN |
| Preview server | `python3 -m http.server 8765` |

---

## Sources & Credits

- **Content** — `sources/PAW 2026 Outline.md` (schedule, FAQ, venue details, activity descriptions)
- **Schedule reference HTML** — `sources/paw_2026_schedule.html` (design inspiration for event card layout and tag colours)
- **Design tokens** — Plank Brand Identity Guidelines 2022 (colour palette, type scale)
- **Scroll animation technique** — [Josh Comeau, "CSS Scroll-Driven Animations"](https://www.joshwcomeau.com/css/scroll-driven-animations/)
- **Map tiles** — © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors © [CARTO](https://carto.com/attributions)
- **Leaflet.js** — © Vladimir Agafonkin, BSD 2-Clause licence

---

## Accessibility Audit

### Passes

- **Skip link** — fixed-position skip-to-content link is the first focusable element; reveals on focus
- **Semantic HTML** — page structured with landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`); headings follow a logical `h1 → h2 → h3` hierarchy
- **ARIA labels** — all interactive controls carry descriptive `aria-label`; theme toggle updates its label dynamically ("Switch to light/dark mode"); nav toggle label updates on open/close; PDF buttons announce generation state via an `aria-live` region
- **`aria-expanded`** — FAQ accordion buttons and mobile nav toggle update `aria-expanded` on open/close
- **`aria-pressed`** — dark/light mode toggle exposes pressed state to assistive technology
- **`aria-hidden`** — decorative elements hidden from the accessibility tree; hero canvas clear button uses the `hidden` attribute (not just CSS `display:none`) so it is fully absent from the tab order when inactive
- **Focus styles** — `:focus-visible` ring applied to all interactive elements; not suppressed globally
- **Keyboard navigation** — mobile nav closes on Escape and returns focus to the hamburger button; close button added inside the nav overlay; all buttons carry `type="button"`
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` guard added for hero entrance, bounce, and paw-click animations
- **External links** — all `target="_blank"` links (Google Maps, Slack) carry descriptive `aria-label` noting they open in a new tab
- **`aria-controls`** — FAQ accordion buttons reference their answer panel IDs
- **`.sr-only` utility** — visually-hidden class available for screen-reader-only content; used by the `aria-live` PDF status announcer
- **Colour contrast** — primary text combinations use Plank's `#112621` on `#fcfbfa` (≈ 14:1) and `#f0ede8` on `#1f453b` (≈ 9:1), both well above WCAG AA

### Known gaps

- **Hero click — no keyboard equivalent** — spawning logos on the canvas is mouse/touch-only; no keyboard or AT alternative
- **Mobile nav focus trap** — focus can still escape the nav overlay to background content; a full focus trap loop is not implemented
- **Map marker keyboard access** — Leaflet marker popups are not keyboard-triggerable without a plugin

---

## Running Locally

```bash
cd /path/to/paw2026
python3 -m http.server 8765
# open http://localhost:8765
```
