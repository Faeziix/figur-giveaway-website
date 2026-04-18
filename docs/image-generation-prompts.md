# Image Generation Prompts — Figur Giveaway Microsite

**Model:** `gemini-3.1-flash-image-preview` (Nano Banana 2)
**Command prefix:** `export NANOBANANA_MODEL=gemini-3.1-flash-image-preview`
**Reference images to attach per generation:**
- Figur logomark: `public/Figur logo/PNG/05 Figur logomark.png`
- Approved concept art: `docs/concept-art/direction-a-persian-celestial-approved.png`
- White fig reference: `/home/faezix/Work/My Clients/Figur/assets/Pictures/Ready 2/202604059999_271.jpg`

---

## Shared Style Block (prepended to every prompt)

Hyperrealistic illuminated Persian manuscript rendering, Safavid royal atlas aesthetic, 4K editorial quality. Palette strictly: warm cream parchment (#FFFBF4) as dominant ground, deep plum-indigo (#3D1040), oxblood burgundy (#660033), burnished gold leaf (#C5A258), soft pink (#F2E6EB), honey amber (#C88B2A), charcoal ink (#2B2B2B). NO GREEN anywhere — dried fig leaves must read pale champagne-gold, never green. Physically based materials, every surface named and real: duchess satin fabric with visible weave, raised gold-thread Persian arabesque embroidery, burnished gold leaf with fine tool texture, matte micro-pore white Smyrna fig skin (pale golden-cream pear shape, never green), aged hand-pressed cream parchment with gold-leaf veining, amber convex polished glass, oxblood silk velvet. Candlelight-warm lighting from upper-left at 35 degrees (3400K), soft lower-right fill at 25%. Hard bans: no neon, no ambient glow halos, no bloom, no lens flare, no rim light, no harsh cast shadows, no pure black background, no text, no logos as text, no cartoon style, no painterly brushwork, no storybook illustration feel, no sci-fi aesthetic, no Pixar look, no plastic surfaces, no photo-retouch digital slickness. Quiet luxury, hand-illuminated by a Persian master, editorial product photography discipline.

---

## Asset 1 — Space Background

**File:** `public/images/bg/space-plum.png`
**Resolution:** 3840×2160 (4K)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'Safavid Persian illuminated manuscript aesthetic rendered as hyperrealistic 4K digital illustration. Palette strictly: deep plum-indigo background (#3D1040), warm cream (#FFFBF4), burnished gold leaf (#C5A258), oxblood burgundy (#660033). No neon, no ambient glow, no bloom, no lens flare, no harsh shadows, no pure black, no text, no logos, no cartoon style. Quiet luxury, handcrafted, editorial quality. A deep, vast cosmic sky rendered entirely in Safavid Persian celestial atlas style. The background is a rich gradient from deep indigo-plum at the zenith fading to warm oxblood-burgundy at the lower edges — no pure black anywhere, minimum luminosity is a deep warm plum. Scattered across the sky are precisely placed Islamic geometric star constellations: eight-pointed faraj stars and hexagonal lattice rosettes crafted in burnished gold leaf, each one hand-drawn with delicate hairline strokes as if illuminated by a Persian master calligrapher. The stars are sparse and deliberate — 15 to 20 total across the full composition — not a random scatter but arranged in recognizable geometric constellation patterns like a Safavid celestial globe. Between the stars, fine gold geometric lattice lines connect them in the manner of an illuminated atlas. The overall atmosphere is one of sacred stillness, deep space reimagined as a page from a 16th-century Safavid royal manuscript. No planets, no characters, no glowing nebulae, no sci-fi elements — only the geometric starfield and the deep plum gradient sky. Wide 16:9 horizontal panoramic composition, edge-to-edge coverage.' --aspect=16:9" 2>&1
```

---

## Asset 2 — Earth-Fig Planet

**File:** `public/images/planet/earth-fig.png`
**Resolution:** 1600×1600 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'Safavid Persian illuminated manuscript aesthetic rendered as hyperrealistic 4K digital illustration. Palette strictly: deep plum-indigo background (#3D1040), warm cream (#FFFBF4), burnished gold leaf (#C5A258), oxblood burgundy (#660033), soft pink (#F2E6EB), honey amber (#C88B2A), charcoal ink (#2B2B2B). Physically based materials — aged parchment, gold-leaf veining, charcoal botanical ink. Candlelight-warm key lighting from upper-left at 35 degrees (3400K warm). No neon, no ambient glow, no bloom, no lens flare, no text, no logos. Quiet luxury, handcrafted. A spherical planet floating in deep plum space, rendered to look exactly like an aged illuminated manuscript page wrapped around a globe. The planet surface is warm cream parchment (#FFFBF4) with subtle gold-leaf geometric veining running across the curvature like map meridians. Delicate charcoal botanical illustrations of fig tree branches, leaves, and whole white figs (Smyrna variety — pale golden-cream pear-shaped, NOT green) are inked onto the parchment surface in the manner of a Safavid naturalist illustration — fine hairline strokes, precise, scientific. The planet has a thin soft-pink (#F2E6EB) atmospheric halo at its limb edges, very subtle, like candlelight through parchment. The overall lighting gives the planet surface an amber internal glow as if lit from within by candlelight. Isolated on a fully transparent background — the deep plum space around it is completely transparent. Perfect sphere. Centered in a square composition. No rings, no moons, no characters on this planet.' --aspect=1:1" 2>&1
```

---

## Asset 3 — Figland Planet with Astronaut

**File:** `public/images/planet/figland.png`
**Resolution:** 2400×1800 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'Safavid Persian illuminated manuscript aesthetic rendered as hyperrealistic 4K digital illustration. Palette strictly: warm cream (#FFFBF4), burnished gold leaf (#C5A258), oxblood burgundy (#660033), soft pink (#F2E6EB), honey amber (#C88B2A), charcoal ink (#2B2B2B), deep plum (#3D1040). Physically based materials — matte micro-pore white fig skin, duchess satin, raised gold-thread embroidery, amber convex glass, aged parchment. Candlelight-warm key lighting from upper-left at 35 degrees. No neon, no bloom, no lens flare, no harsh shadows, no pure black, no text, no logos, no cartoon style, no plastic. Quiet luxury, editorial. A fig-shaped planet — a perfect large sphere textured as aged illuminated manuscript parchment (#FFFBF4) with gold-leaf veining and charcoal fig botanical illustrations on its surface, soft pink atmospheric halo at the limb, amber internal candlelight luminosity. Standing on top of the planet is a solitary figure: a slender couture space explorer whose helmet is a white Smyrna fig fruit — pale golden-cream ovoid with natural soft split at crown revealing honey-amber interior, small brown stem stub at apex, matte micro-pore skin texture. The explorer wears a tailored pressurized space suit: smooth ivory-cream duchess satin body, deep burgundy reinforcement panels at shoulders and chest, raised gold-thread Persian arabesque embroidery medallions at seams, cream rounded boots with gold wrist clasps. The figure holds a slender hammered-gold flagpole flying a narrow burgundy silk pennant with one small embossed fig silhouette at center. The figure stands at approximately the top center of the planet sphere, seen from a slightly elevated three-quarter view angle. Floating near the figure feet are three dried pale champagne-gold fig leaves drifting weightlessly. The entire composition is isolated on fully transparent background. 4:3 landscape composition — planet fills lower three-quarters of frame, figure and flag extend into upper portion against empty transparent sky.' --aspect=4:3" 2>&1
```

---

## Asset 4 — Fig-Capsule Ship

**File:** `public/images/capsule/fig-capsule.png`
**Resolution:** 1200×1800 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'Safavid Persian illuminated manuscript aesthetic rendered as hyperrealistic 4K digital illustration. Palette strictly: warm cream (#FFFBF4), burnished gold leaf (#C5A258), oxblood burgundy (#660033), honey amber (#C88B2A), charcoal ink (#2B2B2B), deep plum (#3D1040). Physically based materials — duchess satin, raised gold-thread embroidery, amber convex glass, matte white fig skin texture. Candlelight-warm key lighting from upper-left at 35 degrees. No neon, no flames, no thruster glow, no bloom, no lens flare, no text, no logos, no cartoon style, no rockets. Quiet luxury, editorial. A spacecraft shaped exactly like a whole white Smyrna fig fruit — tall pointed crown at top (the natural fig tip), rounded belly below, a small brown stem stub at the very apex. The vessel body is smooth ivory-cream duchess satin with physically rendered volume and pressure-suit texture. Two deep burgundy (#660033) vertical panel stripes run from crown to base on left and right flanks. A wide horizontal amber convex glass window-strip wraps around the mid-belly section like a visor — amber-tinted, polished, slightly reflective, physically real glass surface. Fine gold-thread Persian arabesque embroidery lines run along all panel seams. The base of the vessel has a simple flat hexagonal landing pad in burnished gold — no thrusters, no flames, no exhaust, no glow. Three dried pale champagne-gold fig leaves float near the vessel, drifting away as if caught in its wake. The vessel is isolated on a fully transparent background, no shadows cast, centered in a vertical portrait composition. Viewed from a straight-on front elevation, slight three-quarter angle.' --aspect=2:3" 2>&1
```

---

## Asset 5 — Astronaut-Fig Standing

**File:** `public/images/astronaut/astronaut-standing.png`
**Resolution:** 800×1400 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'Safavid Persian illuminated manuscript aesthetic rendered as hyperrealistic 4K digital illustration. Physically based materials — matte micro-pore white fig skin, duchess satin suit fabric, raised gold-thread embroidery, amber convex glass. Candlelight-warm key lighting from upper-left at 35 degrees (3400K), soft lower-right fill at 25%. No neon, no ambient glow, no bloom, no text, no logos, no cartoon style, no plastic surfaces. Quiet luxury, couture, editorial. A full-length portrait of an elegant space explorer standing upright, arms slightly relaxed at sides, right hand holding a slender hammered-gold flagpole. The figure has a slender couture mannequin silhouette — fashion-proportioned, upright and dignified, NOT stocky or cartoonish. The helmet is a smooth ovoid ivory ceramic with a wide amber-tinted convex visor across the face — and the crown of the helmet transitions seamlessly into a white Smyrna fig fruit (pale golden-cream pear-shaped, natural soft split at crown revealing honey-amber interior, small brown stem stub at apex, matte micro-pore skin texture). The space suit is a tailored pressurized suit: smooth ivory-cream duchess satin body with physically rendered volume, deep plum-burgundy reinforcement panels at shoulders, chest centerline, and thigh tops, raised gold-thread Persian arabesque embroidery medallions at every seam, cream rounded boots with gold clasp at ankle. The right hand grips a gold flagpole flying a narrow burgundy silk pennant with one small cream fig silhouette embossed at center. Two dried pale champagne-gold fig leaves float near the figure feet, weightless. Fully isolated on transparent background. Front-facing three-quarter view. Entire figure visible head to toe.' --aspect=4:7" 2>&1
```

---

## Asset 6 — Ornamental Star Sprites (6 variations)

**Files:** `public/images/stars/star-01.png` through `star-06.png`
**Resolution:** 512×512 each (transparent background)
**Commands:**

```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview

# star-01: Eight-pointed faraj star
gemini --yolo "/generate 'A single eight-pointed faraj star rendered in burnished gold leaf (#C5A258) on a fully transparent background. The star has 8 perfect equidistant points, with a smaller rotated four-point star overlaid at 45 degrees creating the classic Islamic Rub el Hizb pattern. Drawn in the style of Safavid Persian manuscript illumination — hand-painted gold leaf with subtle texture variation, delicate hairline border strokes in a slightly darker gold. Physically real gold leaf — warm yellow-gold, not metallic silver, not neon. The star is perfectly centered in a square frame with generous transparent space around it. No shadow, no glow, no background. Isolated gold geometric form only.' --aspect=1:1" 2>&1

# star-02: Hexagonal lattice rosette
gemini --yolo "/generate 'A single hexagonal six-pointed geometric rosette rendered in burnished gold leaf (#C5A258) on a fully transparent background. The rosette is formed by two overlapping equilateral triangles creating a Star of David base, with each intersection filled with fine geometric lattice lines in the style of Safavid Persian manuscript illumination. The border has a thin hairline stroke in a slightly darker gold. Physically real gold leaf texture — warm yellow-gold. Perfectly centered in a square frame with generous transparent space around it. No shadow, no glow, no background. Isolated gold geometric form only.' --aspect=1:1" 2>&1

# star-03: Twelve-pointed star
gemini --yolo "/generate 'A single twelve-pointed star rendered in burnished gold leaf (#C5A258) on a fully transparent background, in the style of Safavid Persian manuscript illumination. The star has 12 equidistant sharp points radiating from a central hexagonal body filled with fine geometric crosshatch pattern. Each point is slender and elegant. Physically real gold leaf texture — warm yellow-gold. Perfectly centered in a square frame. No shadow, no glow, no background. Isolated gold geometric form only.' --aspect=1:1" 2>&1

# star-04: Small four-point compass star
gemini --yolo "/generate 'A single four-pointed compass star rendered in burnished gold leaf (#C5A258) on a fully transparent background, in the style of Safavid Persian manuscript illumination. The star has 4 elongated diamond-shaped points arranged in cardinal directions, with 4 shorter secondary points at diagonals, creating an eight-point overall silhouette. The center has a small circular void. Physically real gold leaf texture — warm yellow-gold. Perfectly centered in a square frame. No shadow, no glow, no background. Isolated gold geometric form only.' --aspect=1:1" 2>&1

# star-05: Sixteen-pointed star burst
gemini --yolo "/generate 'A single sixteen-pointed star burst rendered in burnished gold leaf (#C5A258) on a fully transparent background, in the style of Safavid Persian manuscript illumination. The star has 16 fine radiating points of alternating short and long lengths, creating a sunburst-like form. The center is a small solid gold disc. Very fine, delicate, precise. Physically real gold leaf texture — warm yellow-gold. Perfectly centered in a square frame. No shadow, no glow, no background. Isolated gold geometric form only.' --aspect=1:1" 2>&1

# star-06: Islamic eight-fold pattern tile
gemini --yolo "/generate 'A single circular Islamic eight-fold geometric star medallion rendered in burnished gold leaf (#C5A258) on a fully transparent background, in the style of Safavid Persian manuscript illumination. The medallion is a circle containing an eight-pointed star whose interstitial spaces are filled with intricate khatam geometric micro-pattern, all in gold. A thin hairline gold border ring contains the entire design. Physically real gold leaf texture — warm yellow-gold. Perfectly centered in a square frame. No shadow, no glow, no background. Isolated gold geometric medallion only.' --aspect=1:1" 2>&1
```

---

## Asset 7 — Prize Card Back

**File:** `public/images/card/card-back.png`
**Resolution:** 800×800 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'A circular disc card back design rendered in hyperrealistic 4K digital illustration in Safavid Persian manuscript style. The disc is deep plum-indigo (#3D1040) with physically real matte surface texture like aged velvet. Around the circumference is a fine gold Islamic geometric lattice border ring — double hairline strokes with khatam micro-pattern fill between them, all in burnished gold leaf (#C5A258). Inside the border is a smaller concentric gold circle. At the center of the disc is a single fig fruit silhouette: a stylized white Smyrna fig (pale golden-cream pear shape with a small stem curl at top) rendered in ivory cream (#FFFBF4) at approximately 30% of the disc diameter, slightly raised as if embossed or debossed into the surface. Surrounding the fig silhouette are four small eight-pointed faraj stars in burnished gold at cardinal positions inside the inner ring. The overall feel is of a luxury collector playing card or royal seal — handcrafted, weighty, precious. Isolated on fully transparent background. Perfect circle. Centered in a square frame with transparent corners.' --aspect=1:1" 2>&1
```

---

## Asset 8 — Prize Card Front (Reveal State)

**File:** `public/images/card/card-front.png`
**Resolution:** 800×800 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'A circular disc card front design rendered in hyperrealistic 4K digital illustration in Safavid Persian manuscript style. This is the revealed prize face of a luxury game card. The disc surface is aged parchment cream (#FFFBF4) with subtle warm texture like hand-pressed watercolor paper, slight gold-leaf veining at the edges. Around the circumference is a fine gold Islamic geometric lattice border ring in burnished gold (#C5A258) — double hairline strokes with geometric fill. Inside the border, the background parchment is smooth and minimal. At the center is a single large eight-pointed faraj star in burnished gold leaf, precisely rendered, physically real gold texture — this is where the prize content would be overlaid in the web UI so the star sits behind it as a decorative base. A thin gold horizontal rule line sits slightly below center. The overall feel is of an opened luxury invitation card or a revealed royal manuscript page — anticipation, treasure, reward. Isolated on fully transparent background. Perfect circle. Centered in a square frame with transparent corners.' --aspect=1:1" 2>&1
```

---

## Asset 9 — Manuscript Border Corner

**File:** `public/images/ornament/corner.png`
**Resolution:** 800×800 (transparent background)
**Command:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview
gemini --yolo "/generate 'A single corner ornament for a page border rendered in burnished gold leaf (#C5A258) on a fully transparent background, in the exact style of Safavid Persian illuminated manuscript margins. The ornament occupies the top-left corner of a square frame. It consists of: two straight gold border lines meeting at the corner (one horizontal, one vertical, each 2–3px weight), at the corner junction a square geometric interlocking knot in the khatam style, and from the knot extending along both lines a fine geometric lattice band approximately 40px wide filled with repeating Islamic eight-fold star pattern in gold. The lattice band extends about 60% of the way along each edge before tapering to a clean endpoint. The entire ornament is only gold on transparent — no background fill, no cream, no plum. Designed to be used in four rotations (0, 90, 180, 270 degrees) to frame a rectangular composition. Viewed from a straight-on orthographic angle, perfectly flat, no 3D perspective.' --aspect=1:1" 2>&1
```

---

## Asset 10 — Floating Fig Leaves

**Files:** `public/images/leaf/leaf-01.png`, `leaf-02.png`
**Resolution:** 400×400 each (transparent background)
**Commands:**
```bash
export NANOBANANA_MODEL=gemini-3.1-flash-image-preview

# leaf-01: Full fig leaf
gemini --yolo "/generate 'A single dried fig tree leaf rendered in hyperrealistic detail on a fully transparent background. The leaf is a pale champagne-gold color with warm amber veining — the color of aged parchment and dried leaves, not green, not brown, but pale gold-cream. The leaf shape is the classic fig leaf: large palmate with 5 rounded lobes, slightly curled at the edges as if dried and weightless, floating in zero gravity. The surface has fine botanical illustration-quality detail: veins rendered in slightly darker gold, the underside texture faintly visible. The leaf is oriented at a slight diagonal (about 30 degrees tilt). Fully isolated on transparent background. Centered in a square frame. No shadow, no glow. Physically real dried leaf, not illustrated cartoon.' --aspect=1:1" 2>&1

# leaf-02: Smaller fig leaf, different angle
gemini --yolo "/generate 'A single small dried fig tree leaf rendered in hyperrealistic detail on a fully transparent background. The leaf is pale champagne-gold with amber veining — dried, weightless, floating. Classic fig leaf palmate shape with 3–5 lobes, smaller than leaf-01, oriented at roughly 150 degree tilt (curling the other direction). Fine botanical detail in the vein structure. Fully isolated on transparent background. Centered in square frame. No shadow, no glow. Physically real, not cartoon.' --aspect=1:1" 2>&1
```

---

## Reference Image Technique

To pass the Figur logomark as a reference image, pipe it via stdin using `-p` (non-interactive) flag:

```bash
gemini --yolo -p "/generate 'Using the fig silhouette in the attached reference image as the EXACT shape...'" < "public/Figur logo/PNG/05 Figur logomark.png"
```

Use this for **any asset involving the fig shape** (card back, flag pennant, fig emblem). The curved-stem-right droplet shape must match the brand logomark precisely.

Note: `--aspect` is not a valid option for this extension. Specify aspect ratio in the prompt text instead (e.g. "wide 16:9 landscape format", "vertical portrait format").

---

## Generation Order (priority)

1. Space background (`bg/space-plum.png`) — used on every act
2. Earth-fig planet (`planet/earth-fig.png`) — Act I hero
3. Figland planet + astronaut (`planet/figland.png`) — Act III hero
4. Fig-capsule (`capsule/fig-capsule.png`) — Act II
5. Prize card back (`card/card-back.png`) — Act V
6. Prize card front (`card/card-front.png`) — Act V
7. Astronaut standalone (`astronaut/astronaut-standing.png`)
8. Star sprites × 6 (`stars/star-01` to `star-06`)
9. Border corner (`ornament/corner.png`)
10. Fig leaves × 2 (`leaf/leaf-01`, `leaf-02`)

## Move commands after generation

After each generation, nano-banana saves to `./nanobanana-output/`. Move best variant:
```bash
mv "nanobanana-output/generated-*.png" "public/images/<target-path>.png"
```

---

## Asset 11 — Rocket on Earth (Act I hero)

**File:** `public/images/planet/rocket-on-earth.png`
**Aspect:** Portrait 3:4 (specify in prompt text; `--aspect` flag not supported)
**Command:**
```bash
NANOBANANA_MODEL=gemini-3.1-flash-image-preview gemini --yolo \
  -p "/generate 'Hyperrealistic illuminated Persian manuscript rendering, Safavid royal atlas aesthetic, 4K editorial quality. Palette strictly: warm cream parchment (#FFFBF4) as dominant ground, deep plum-indigo (#3D1040), oxblood burgundy (#660033), burnished gold leaf (#C5A258), soft pink (#F2E6EB), honey amber (#C88B2A), charcoal ink (#2B2B2B). NO GREEN anywhere — dried fig leaves must read pale champagne-gold, never green. Physically based materials, every surface named and real: duchess satin fabric with visible weave, raised gold-thread Persian arabesque embroidery, burnished gold leaf with fine tool texture, aged hand-pressed cream parchment with gold-leaf veining, amber convex polished glass. Candlelight-warm lighting from upper-left at 35 degrees (3400K), soft lower-right fill at 25%. Hard bans: no neon, no ambient glow halos, no bloom, no lens flare, no rim light, no harsh cast shadows, no pure black background, no text, no logos as text, no cartoon style, no painterly brushwork, no storybook illustration feel, no sci-fi aesthetic, no Pixar look, no plastic surfaces. Quiet luxury, hand-illuminated by a Persian master, editorial product photography discipline. A single ceremonial pressurized-couture rocket vessel standing upright on a small stone dais, portrait 3:4 composition, vessel occupying central 65 percent of frame with its tapered nose at the upper third and landing feet near the lower third. The rocket hull is tailored ivory-cream duchess satin over a rigid form, physically real fabric volume, with three horizontal oxblood burgundy panel bands at nose cone base, midsection, and lower skirt, each panel edged in hairline burnished gold piping. The midsection panel displays ONE embossed burnished-gold fig emblem using the attached reference logomark shape exactly — plump teardrop silhouette with single curved stem arching to the right — centered, slightly raised as if cold-stamped into leather. Every surface of the cream satin is covered in raised gold-thread Persian arabesque and khatam geometric embroidery, visible stitchwork, like a Safavid royal garment. Four swept fins in burnished gold leaf flare from the base, each fin edge scalloped like Persian manuscript margin filigree. Two small circular portholes on the upper section glow amber through polished convex glass, each ringed in twisted gold rope detail. The dais below is weathered cream marble with fine burgundy veining, low profile. Around the base: three dried pale champagne-gold fig leaves rest on the stone — absolutely not green, color of aged parchment. Background is a warm cream parchment field with a faint soft-pink atmospheric haze at the top edge and a few sparsely placed burnished-gold eight-pointed faraj stars as flat manuscript-illumination marks, no glow. NO fire, no exhaust, no smoke, no engines firing, no thrust trail, no flame, no halo. Transparent PNG background outside the cream ground, object-centered.' --count=3" \
  < "public/Figur logo/PNG/05 Figur logomark.png"
```

---

## Asset 12 — Rocket Ascending (Act III hero)

**File:** `public/images/capsule/rocket-ascending.png`
**Aspect:** Portrait 3:4
**Command:**
```bash
NANOBANANA_MODEL=gemini-3.1-flash-image-preview gemini --yolo \
  -p "/generate 'Hyperrealistic illuminated Persian manuscript rendering, Safavid royal atlas aesthetic, 4K editorial quality. Palette strictly: warm cream parchment (#FFFBF4) as dominant ground, deep plum-indigo (#3D1040), oxblood burgundy (#660033), burnished gold leaf (#C5A258), soft pink (#F2E6EB), honey amber (#C88B2A), charcoal ink (#2B2B2B). NO GREEN anywhere — dried fig leaves must read pale champagne-gold, never green. Physically based materials, every surface named and real: duchess satin fabric with visible weave, raised gold-thread Persian arabesque embroidery, burnished gold leaf with fine tool texture, aged hand-pressed cream parchment with gold-leaf veining, amber convex polished glass. Candlelight-warm lighting from upper-left at 35 degrees (3400K), soft lower-right fill at 25%. Hard bans: no neon, no ambient glow halos, no bloom, no lens flare, no rim light, no harsh cast shadows, no pure black background, no text, no logos as text, no cartoon style, no painterly brushwork, no storybook illustration feel, no sci-fi aesthetic, no Pixar look, no plastic surfaces. Quiet luxury, hand-illuminated by a Persian master, editorial product photography discipline. The identical ceremonial rocket vessel now ascending through a deep plum-indigo Safavid celestial sky, portrait 3:4 composition, nose tilted 6 degrees right of vertical suggesting upward drift. Hull design unchanged: ivory-cream duchess satin with three oxblood burgundy panel bands edged in burnished gold piping, the embossed gold fig logomark emblem centered on the midsection burgundy band (using attached reference shape exactly — plump teardrop with single curved stem arching right), raised gold-thread Persian arabesque and khatam embroidery covering the cream satin, four swept burnished-gold scalloped fins at the base, two amber porthole windows ringed in twisted gold rope. Rocket occupies central 55 percent of the frame, floating slightly above visual center. Sky is a rich gradient from deep plum-indigo (#3D1040) at the zenith to warm oxblood burgundy (#660033) at the lower edges, absolutely no pure black anywhere, minimum luminosity is warm plum. Scattered precisely across the sky: 12 to 15 burnished gold eight-pointed faraj stars of varying sizes and a few hexagonal rosette constellations, each drawn as flat hand-painted illumination marks like a Safavid celestial atlas, NOT glowing, NOT starburst, NOT sci-fi. Fine gold geometric lattice lines connect a few star clusters as in an illuminated manuscript sky chart. Below the rocket a few curling dried pale champagne-gold fig leaves drift away — pale gold, never green. NO fire, no exhaust, no smoke, no flame, no propulsion trail, no thrust glow, no halo, no nebulae, no galaxy swirls. Candlelight-warm key on the rocket hull from lower-left at 40 degrees giving a soft gold rim along its right edge. Transparent PNG background outside the sky field.' --count=3" \
  < "public/Figur logo/PNG/05 Figur logomark.png"
```
