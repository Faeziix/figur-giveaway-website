# Figur Giveaway — Visual Style Guide

**Direction: Persian Celestial Heritage**
Approved concept art: `docs/concept-art/direction-a-persian-celestial-approved.png`

---

## Concept in One Line

A Safavid illuminated atlas brought to life — Figur's astronaut-fig explorer plants a flag on the fig-planet in a cosmos drawn by a Persian master illuminator.

---

## Color Palette

All colors must be defined in OKLCH. Never use hex or rgb in CSS.

| Token | OKLCH | Hex Reference | Usage |
|---|---|---|---|
| `--color-brand-burgundy` | `oklch(0.314 0.127 352)` | `#660033` | CTAs, suit panels, flag |
| `--color-brand-plum` | `oklch(0.22 0.09 310)` | `#3D1040` | Space sky, deep backgrounds |
| `--color-brand-cream` | `oklch(0.988 0.008 90)` | `#FFFBF4` | Planet surface, parchment, body text |
| `--color-brand-gold` | `oklch(0.714 0.089 77)` | `#C5A258` | Constellations, embroidery, borders, flag pole |
| `--color-brand-charcoal` | `oklch(0.274 0 0)` | `#2B2B2B` | Body text, inked botanical illustrations |
| `--color-brand-amber` | `oklch(0.72 0.12 60)` | `#C88B2A` | Visor glow, fig interior honey-amber |
| `--color-brand-soft-pink` | `oklch(0.929 0.017 350)` | `#F2E6EB` | Alt section backgrounds, planet atmosphere |

**Gradient — Space Sky:**
Deep plum-indigo at center → warm burgundy at edges. No pure black. Minimum luminosity: `oklch(0.15 0.06 300)`.

---

## Typography

| Role | Font | Weight | Style |
|---|---|---|---|
| Display / Hero headline | Playfair Display | 400–700 | Serif, italic variants for elegance |
| Body / UI | Inter | 300–500 | Clean, minimal |
| Decorative labels | Cormorant Garamond | 300 italic | For eyebrow text, form labels |

Loaded via `next/font/google`. Never import from CDN.

---

## The Ceremonial Rocket Vessel

The signature hero of this campaign — a pressurized couture spacecraft that reads as Atelier, not NASA. Rules for all illustrations of this vessel:

- **Hull body**: Ivory-cream duchess satin over a rigid pressurized form. Physically real fabric weave and volume. Three horizontal oxblood burgundy panel bands — at nose cone base, midsection, and lower skirt — each edged in hairline burnished gold piping.
- **Fig emblem**: The Figur logomark (plump teardrop silhouette, single curved stem arching right) embossed in burnished gold leaf on the midsection panel. One emblem, centered, slightly raised as cold-stamp.
- **Surface texture**: Every centimeter of cream satin is covered in raised gold-thread Persian arabesque and khatam geometric embroidery — visible stitchwork, like a Safavid royal garment.
- **Fins**: Four swept fins in burnished gold leaf flaring from the base; each fin edge scalloped like Persian manuscript margin filigree.
- **Portholes**: Two small circular windows, amber convex polished glass, each ringed in twisted gold rope detail.
- **Base**: Weathered cream marble dais with fine burgundy veining. No engines, no thrusters, no nozzles.
- **Floating elements**: Dried pale champagne-gold fig leaves (NEVER green — color of aged parchment) drifting nearby.

**What this vessel is NOT:**
- Not a generic sci-fi rocket — it reads couture atelier, not aerospace engineering
- No exhaust, no flame, no thrust trail, no propulsion marks of any kind
- Not painterly or brushwork — hyperreal, photographic, Safavid-illuminated

---

## Environment: The Figland Cosmos

### The Fig-Planet
- Round sphere textured as aged illuminated manuscript parchment: warm cream with gold-leaf veining and botanical fig-tree illustrations inked in charcoal around the curvature
- Soft amber internal luminosity — as if the parchment is gently backlit by candlelight
- Thin soft-pink atmospheric haze at the limb edge

### Space Sky
- Gradient: deep indigo-plum (`oklch(0.18 0.08 295)`) at top → warm burgundy (`oklch(0.28 0.11 352)`) at edges
- Populated with Islamic geometric star-pattern constellations: eight-pointed faraj stars and hexagonal lattices in burnished gold leaf — placed like a Safavid celestial atlas, not scattered randomly
- No nebulae. No glow clouds. No bloom. Only precise geometric starlight.

### The Manuscript Frame
- All hero compositions are framed within a cream parchment border with fine gold geometric Islamic lattice corners — like the margin of an illuminated page
- Used for full-bleed hero sections and prize card backs

---

## Composition Principles

- **Rule of thirds**: hero figure at center-left; flag pointing to upper-right third
- **Depth layers**: foreground (character + flag) → mid (planet surface) → background (space sky + constellations)
- **Negative space**: generous; the sky breathes
- **Framing device**: the manuscript border on hero shots, removed on form/UI screens
- **Scale relationship**: character is monumental relative to the fig-planet beneath it — a giant among planets

---

## Lighting Standard

| Source | Direction | Temperature | Intensity | Role |
|---|---|---|---|---|
| Key | Upper-left, 35° | 3400K warm candlelight | Soft, enveloping | Primary illumination of character |
| Fill | Lower-right, 15° | 3600K | 25% | Lift shadows on suit panels |
| Planet ambient | Inward from surface | 2800K amber | 10% | The parchment backlight glow |

**Hard rules:** No rim light. No neon. No ambient glow decoration. No lens flare. No bloom. No harsh cast shadows.

---

## Photography & Asset Principles

Inherited from Figur brand guide (`/home/faezix/Work/My Clients/Figur/assets/prompts/00-shared-template.json`):

- Hyperrealistic, 4K
- Physically based material rendering
- Every material named: fig skin (matte micro-pore, waxy micro-sheen), suit fabric (duchess satin), embroidery (raised gold thread), visor (polished convex amber glass)
- Clean commercial quality — no stock-photo feel
- When generating new assets, always attach real Figur product photos as reference images for accurate color and texture matching

**Reference products for texture/color matching:**
- Gold-leaf fig: `assets/Pictures/Ready 2/202604059999_271.jpg`
- Coconut Stufig: `assets/Pictures/Ready 2/202604059999_39.jpg`
- Box hero: `assets/Pictures/Ready 2/202604059999_180.jpg`

---

## Animation Principles

- **Easing**: always ease-in-out with slight overshoot (spring physics for reveals)
- **Duration**: hero narrative sequences 0.6–1.2s per beat; micro-interactions 0.15–0.3s
- **Parallax**: multi-layer depth on the space background (stars at 10% rate, planet at 40%, character at 100%)
- **Scroll-driven**: the Earth → Liftoff → Figland story is triggered by user scroll (GSAP ScrollTrigger)
- **No auto-play video**: all motion is CSS/JS, not video files
- **`prefers-reduced-motion`**: all narrative animations collapse to a single still frame + CTA; micro-interactions reduce to instant

---

## UI Components — Visual Rules

| Component | Style |
|---|---|
| Primary button | Plum-burgundy fill, cream text, Playfair Display label, gold 1px border, 4px radius |
| Ghost button | Transparent, gold 1px border, cream text |
| Input fields | Cream background, charcoal text, gold bottom-border on focus, Cormorant label |
| Card back (prize) | Deep plum with gold manuscript border pattern, fig emblem at center |
| Card front (revealed) | Cream parchment, Playfair headline, gold rule, code in bordered card |
| Form section | Cream parchment background section, centered, 600px max-width |
| Confirmation section | Deep plum background, cream and gold text |

---

## Tone of Voice — On-Screen Copy

- Short, declarative, confident — never breathless or hype-forward
- Sensory and specific — reference the actual fig, the craft, the origin
- Example: "A treasure awaits in Figland." not "You've unlocked an AMAZING prize!!!"
- Second person, present tense: "Your gift is ready."
- Gold eyebrow labels in Cormorant italic: "The Journey Begins" / "Choose Your Moon" / "Your Gift"

---

## Assets — Status

### Generate (missing, run prompts in `docs/image-generation-prompts.md`)
- [ ] `public/images/planet/rocket-on-earth.png` — ceremonial rocket on cream parchment dais, Act I hero
- [ ] `public/images/capsule/rocket-ascending.png` — same rocket ascending through plum cosmos, Act III hero

### Keep as-is
- [x] `public/images/bg/space-plum.png`
- [x] `public/images/card/card-back.png` — round Persian medallion
- [x] `public/images/card/card-front.png` — cream parchment reveal
- [x] `public/images/ornament/corner.png` — manuscript border corner
- [x] `public/images/stars/star-01.png` … `star-06.png`
- [x] `public/images/leaf/leaf-01.png`, `leaf-02.png`

### Retired (orphaned, no consumers)
- `public/images/astronaut/astronaut-standing.png`
- `public/images/capsule/fig-capsule.png`
- `public/images/planet/earth-fig.png`
- `public/images/planet/figland.png`
