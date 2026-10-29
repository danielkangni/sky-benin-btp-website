---
name: Sky Benin Structural Identity
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#45464e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#76767f'
  outline-variant: '#c6c6cf'
  surface-tint: '#515d84'
  primary: '#00020e'
  on-primary: '#ffffff'
  primary-container: '#0d1b3e'
  on-primary-container: '#7784ad'
  inverse-primary: '#b9c5f2'
  secondary: '#ac3235'
  on-secondary: '#ffffff'
  secondary-container: '#fd6d6b'
  on-secondary-container: '#6d000f'
  tertiary: '#010203'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1d1e'
  on-tertiary-container: '#838586'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b9c5f2'
  on-primary-fixed: '#0b1a3d'
  on-primary-fixed-variant: '#39456b'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3af'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8b1820'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: auto
---

## Brand & Style

The brand personality for Sky Benin is rooted in engineering precision, structural integrity, and the monumental scale of national infrastructure. The design system adopts a **Corporate / Modern** aesthetic that balances the cold technicality of construction with the human reliability required for large-scale partnerships. 

The visual language communicates "Strength through Precision." It utilizes a disciplined grid, generous white space to signify clarity of thought, and high-contrast color application to highlight critical information. The emotional response should be one of absolute confidence—moving away from the "dusty" associations of construction toward a future-facing, architectural vision.

## Colors

The palette is derived directly from the Sky Benin logo to maintain brand equity. 
- **Deep Navy Blue:** Serves as the primary foundation, used for headers, primary buttons, and structural backgrounds. It represents stability and professional depth.
- **Professional Burgundy:** Used as a high-impact accent color for call-to-actions, status indicators, and key branding elements. It adds a sense of urgency and prestige.
- **Clean White & Slate Neutrals:** These provide the "air" within the design, ensuring that the heavy navy and red do not overwhelm the user. 

Text is primarily rendered in a deep charcoal (Neutral) rather than pure black to soften the reading experience while maintaining high accessibility standards.

## Typography

This design system utilizes **Work Sans** across all levels. Work Sans was selected for its architectural proportions and its ability to feel both industrial and accessible. 

Headlines are set with heavy weights and slight negative letter-spacing to mimic the solid presence of a steel beam or concrete foundation. Body text is optimized for readability with a generous line height, ensuring that technical specifications and project descriptions are easily digestible. Labels utilize uppercase styling and bold weights to provide clear signposting within complex interfaces.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model. For desktop viewports, a 12-column grid with a maximum container width of 1280px is employed. This structure provides the necessary "blueprints" for consistent component placement.

The spacing rhythm is based on an 8px technical scale. Large vertical margins (xl) are encouraged between major sections to emphasize the scale of infrastructure projects. Padding within cards and forms should be consistent (md) to maintain a compact, efficient feel without appearing cluttered.

## Elevation & Depth

To evoke reliability, the design system avoids "airy" or floating effects. Instead, it uses **Tonal Layers** and **Low-contrast Outlines** to create depth. 

- **Surface Levels:** The primary background is Clean White. Secondary containers (like project summaries) use a subtle light gray tint to distinguish themselves.
- **Shadows:** When used, shadows are crisp and tight. They should not feel like glows; they should feel like the shadow cast by a physical object on a drafting table. Use a low-opacity navy tint in the shadow ($primary_color at 10% opacity) to maintain color harmony.
- **Borders:** 1px solid borders in a light neutral are the primary tool for defining component boundaries, ensuring a precise, technical look.

## Shapes

The shape language is **Soft (0.25rem)**. While a construction company requires strength (sharp corners), a modern digital interface requires approachability. This design system uses a minimal radius to take the "edge" off the UI while maintaining a predominantly rectangular, stable silhouette. 

- **Standard Elements:** 4px radius (buttons, input fields).
- **Large Elements:** 8px radius (project cards, hero containers).
- **Interactive Icons:** 0px (Sharp) or perfectly circular to differentiate them from structural components.

## Components

### Project Cards
Designed to showcase heavy machinery and infrastructure. Features a large image aspect ratio (16:9), a bold Navy headline, and a small Burgundy badge for project status (e.g., "In Progress"). Details like location and budget are presented in `label-bold` styling.

### Service Icons
Icons should be technical and "monoline," using a consistent 2px stroke width. They are housed in a square tile with a light Navy border. The icons themselves should use the Burgundy accent sparingly to highlight functional parts of the illustration.

### Contact & Lead Forms
Forms are the bridge to new contracts. They feature high-contrast input fields with 1px neutral borders that turn Navy on focus. Labels are always positioned above the input for maximum clarity. The primary "Submit" button is a full-width Burgundy block with white uppercase text.

### Buttons
- **Primary:** Solid Burgundy background, White text. Used for "Request a Quote" or "Get Started."
- **Secondary:** Transparent background, 2px Navy border, Navy text. Used for "View Gallery" or "Read Specifications."
- **Tertiary:** Text-only, Navy with a Burgundy underline on hover.