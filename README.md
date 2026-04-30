# PAW '26 — Plank Annual Workgathering

Static event site for PAW '26, May 28–29, 2026 in Montréal. Built for internal Plank use.

---

## About this project

This is a vibe coded site — built by Steve Bissonnette with Claude Code doing the heavy lifting. Steve learned a surprising amount along the way, including:

- **SVG internals** — diving into how the Plank monogram SVG is structured, how `viewBox`, `fill`, and `<filter>` / `<feGaussianBlur>` work, and how to manipulate SVG nodes in JavaScript for the hero artwork export
- **Leaflet.js & map tiles** — setting up an interactive map, swapping CartoDB light/dark tile layers on theme change, and debugging tile seam artefacts
- **PDF generation in the browser** — using `html2canvas` + `jsPDF` to capture a DOM element as a single-page PDF, and the nuances of forcing light-mode rendering via `onclone`
- **General GitHub skills** — branching, committing with good messages, and pushing a static site through a real workflow

---

## Features

- **Hero with logo-click interaction** — click anywhere on the hero to spawn a randomly sized, rotated, and coloured Plank monogram SVG that fades to 10% opacity with a soft CSS blur dissolve; up to 50 persist at once, colour palette sourced from official Plank brand guidelines
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
- **Hero artwork export** — "↓ save artwork" button below the hero captures the current logo collage at native resolution (×devicePixelRatio) as a PNG, correctly reflecting light or dark mode; blur is baked into each SVG via `<feGaussianBlur>` for full cross-browser fidelity
- **Hero canvas controls** — "✕ clear" button appears beside save after the first click and resets the canvas; both buttons start inactive with a hint label and unlock progressively as artwork is created
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

- **Skip link** — `#main-content` skip-to-content link is the first focusable element in the page
- **Semantic HTML** — page structured with landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`); headings follow a logical `h1 → h2 → h3` hierarchy
- **ARIA labels** — interactive controls carry `aria-label` or visible labels; map has `aria-label="Map of PAW 2026 event locations in Montréal"`
- **`aria-expanded`** — FAQ accordion buttons and mobile nav toggle update `aria-expanded` on open/close
- **`aria-pressed`** — dark/light mode toggle exposes pressed state to assistive technology
- **`aria-hidden`** — decorative elements (theme toggle icon, nav hamburger bars, hero background paws) are hidden from the accessibility tree
- **Focus styles** — `:focus-visible` ring applied to all interactive elements; not suppressed globally
- **Keyboard navigation** — all interactive elements (nav links, FAQ buttons, map markers, location card links, footer links) are reachable and operable by keyboard
- **Colour contrast** — primary text on background combinations use Plank's `#112621` on `#fcfbfa` (≈ 14:1) and `#f0ede8` on `#1f453b` (≈ 9:1), both well above the WCAG AA 4.5:1 threshold

### Known gaps

- **`prefers-reduced-motion`** — scroll-driven fade-up animations and the hero paw-click animation do not currently check `prefers-reduced-motion: reduce`; users who opt out of motion will still see them
- **Hero click — no keyboard equivalent** — clicking the hero to spawn paw prints is a mouse/touch-only interaction; no keyboard or assistive-technology alternative is provided
- **Mobile nav focus trap** — when the full-screen mobile nav overlay is open, focus can escape to background content; a proper focus trap loop is not implemented
- **Map keyboard interaction** — Leaflet's default keyboard support lets users tab to the map container and pan with arrow keys, but individual marker popups are not keyboard-triggerable without a plugin

---

## Running Locally

```bash
cd /path/to/paw2026
python3 -m http.server 8765
# open http://localhost:8765
```
