# PAW '26 — Plank Annual Workgathering

Static event site for PAW '26, May 28–29, 2026 in Montréal. Built for internal Plank use.

---

## Features

- **Hero with paw-click interaction** — click anywhere on the hero to spawn a randomly sized, rotated, and coloured SVG paw print that fades to 10% opacity; up to 50 paws persist at once
- **Two-column schedule** — Thursday and Friday side-by-side with time labels, event descriptions, and colour-coded tag pills (Food, Social, Optional, Activity, All Hands, Ongoing)
- **Activity highlights grid** — six feature cards covering Swag, Yoga, Walking Tour, Pottery, Volunteering, and Team Photos
- **Interactive Leaflet map** — four location markers with popups; tiles swap between light and dark CartoDB styles to match the active theme
- **Location cards** — address, event note, and direct Google Maps links for each venue
- **FAQ accordion** — single-open accordion with animated expand/collapse and keyboard support
- **Dark / light mode** — full-page theme toggle, respects `prefers-color-scheme` on first load, persisted in `localStorage`
- **Scroll-driven animations** — section content fades up on scroll using the native CSS Scroll-Driven Animations API (no JavaScript)
- **Responsive layout** — single-column mobile (< 640 px), two-column schedule collapses at 900 px, full-screen mobile nav overlay
- **Sticky nav** — backdrop blur + border on scroll; hamburger menu on mobile
- **Footer Slack links** — direct deep-links to Steve's profile and `#paw-event-2026` channel

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
| Scroll animations | CSS `animation-timeline: view()` (Scroll-Driven Animations API, Chrome 115+, Safari 18+, Firefox 132+) behind `@supports` |
| Preview server | `python3 -m http.server 8765` |

---

## Sources & Credits

- **Content** — `sources/PAW 2026 Outline.md` (schedule, FAQ, venue details, activity descriptions)
- **Schedule reference HTML** — `sources/paw_2026_schedule.html` (design inspiration for event card layout and tag colours)
- **Design tokens** — Plank design system (colour palette, type scale)
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
