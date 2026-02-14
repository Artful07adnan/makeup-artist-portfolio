# RAMSHA — Couture Bridal Makeup

A single-artist luxury bridal makeup brand site. Cinematic, minimal, and conversion-focused. Built with **HTML5**, **Tailwind CSS**, **GSAP**, **Lenis**, **Three.js**, and vanilla JavaScript. No frameworks.

## Run locally

ES modules require a local server:

```bash
node server.js
```

Then open **http://localhost:3333**.

## Brand

- **Ramsha** — couture bridal makeup artist
- Tagline: *Where Bridal Beauty Becomes Timeless Art*
- Single signature identity; no team or multi-artist references

## Tech stack

- **Tailwind CSS** (CDN)** — layout and design tokens
- **GSAP + ScrollTrigger** — preloader, hero brand reveal, scroll reveals, counters, parallax
- **Lenis** — smooth scrolling (integrated with ScrollTrigger)
- **Three.js** — subtle gradient mesh background
- **Vanilla JS** — modular entry in `js/main.js`

## Structure

- `index.html` — Hero (brand logo, tagline), Signature Services, Portfolio, Before & After, Testimonials, About, The Signature Experience, Experience Process, Instagram, Booking CTA
- `css/styles.css` — brand logo/monogram, gold gradient (#d4af37–#f5e7a1), shimmer, stat hover, glass cards, slider, carousel
- `js/main.js` — preloader then Lenis, hero, scroll-reveal, portfolio, about, contact, cursor, Three.js, particles, magnetic, before-after, testimonials
- `js/preloader.js` — RAMSHA letter reveal
- `js/hero.js` — brand block + subheading + CTAs + video zoom
- `js/about.js` — animated counters (50+, 1+, 50+)
- `js/before-after.js` — comparison slider
- `js/testimonials.js` — carousel

## Customisation

- **Hero video**: Replace the `<source>` in `#heroVideo` and booking section with your own MP4.
- **WhatsApp**: Update the `wa.me` link in the booking section with your number.
- **Instagram**: Update `@RamshaBride` and links to your handle.
