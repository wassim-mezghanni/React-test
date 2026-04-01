---
name: design-guidance
description: Core guidelines for the "Sovereign Curator" design system, enforcing soft minimalism, a "no-line" hierarchy, and high-contrast editorial typography.
---
# Design System Documentation: Financial Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Sovereign Curator**
This design system moves away from the "dashboard-as-a-spreadsheet" fatigue common in fintech. Instead, it adopts the persona of a high-end digital concierge—authoritative, calm, and hyper-organized. We achieve this by blending **Soft Minimalism** with **Editorial Sophistication**. 

The "template" look is intentionally disrupted through expansive white space (breathing room), intentional asymmetry in data visualization, and a hierarchy driven by tonal depth rather than structural lines. The goal is to make the user feel in control of their wealth, not overwhelmed by it.

---

## 2. Colors
Our palette is rooted in the tranquility of nature and the stability of traditional finance.

### Palette Strategy
*   **Primary (`#1A4D2E`):** A sophisticated Forest Green used for high-intent actions and brand moments.
*   **Surface (`#F8F9FA`):** Our foundation. A soft, airy grey that reduces eye strain compared to pure white.
*   **Surface-Container-Lowest (`#FFFFFF`):** Reserved for primary content cards to create a "lifted" effect.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a side navigation panel should use `surface-container-low` against a `surface` main content area. Contrast is achieved through tone, not strokes.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Level 0:** `surface` (The desk/background)
*   **Level 1:** `surface-container-low` (Subtle inset areas like sidebars)
*   **Level 2:** `surface-container-lowest` (The focal point/primary cards)

### Signature Textures & Glassmorphism
For floating elements (modals, dropdowns, or "sticky" navigation), use **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur` (e.g., 12px-20px). This ensures the layout feels integrated and airy, allowing colors from data visualizations to bleed through the interface edges.

---

## 3. Typography
We utilize a dual-typeface system to balance character with utility.

*   **Display & Headlines (Manrope):** A geometric sans-serif with a modern "tech" edge. Use `display-lg` for hero stats and `headline-md` for section titles to convey authority.
*   **Body & Labels (Inter):** A workhorse for legibility. Inter's tall x-height ensures financial figures are readable even at `body-sm`.
*   **The Editorial Scale:** Lean into high contrast. Pair a large `display-md` headline with a subtle `label-md` uppercase subheader for a premium, magazine-like hierarchy.

---

## 4. Elevation & Depth
Depth in this system is an atmospheric quality, not a structural one.

*   **The Layering Principle:** Avoid the "floating island" look. Achieve depth by stacking tiers. A `surface-container-lowest` card sitting on a `surface-container-low` section creates a natural, soft lift.
*   **Ambient Shadows:** When a shadow is necessary for elevation (e.g., on a hovered card), use an extra-diffused shadow: `box-shadow: 0 10px 30px -5px rgba(25, 28, 29, 0.05)`. The color is a tint of our `on-surface` token to mimic natural light.
*   **The "Ghost Border":** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Intentional Radii:** Use `lg` (16px) for main containers and `md` (12px) for nested components. This "cascading roundness" reinforces the friendly, approachable nature of the AI.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary-container` (`#1A4D2E`) with `on-primary` text. Use a subtle gradient transition to `primary` on hover for "soul."
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Text-only with an icon. High-letter spacing for an editorial feel.

### Cards & Lists
*   **Forbid dividers.** Use `16` (4rem) or `10` (2.5rem) vertical white space from the Spacing Scale to separate list items. 
*   **Financial Cards:** Use `surface-container-lowest` with a `lg` (1.5rem) padding to give data room to breathe.

### Input Fields
*   **Base Style:** `surface-container-high` background with a `sm` (0.25rem) radius. 
*   **Focus State:** Shift background to `surface-container-lowest` and apply a 1px "Ghost Border" using the `primary` color at 20% opacity.

### Additional Signature Components
*   **The AI Pulse:** For AI-generated insights, use a `tertiary-container` subtle background glow to distinguish "machine-thought" from "user-data."
*   **Smart Chips:** Use `secondary-container` for filter chips with `on-secondary-container` text. These should be pills (`rounded-full`).

---

## 6. Do's and Don'ts

### Do
*   **DO** use asymmetric layouts for data. Placing a chart slightly off-center creates a custom, high-end feel.
*   **DO** lean into "Overlapping." Let a card slightly overlap a background color transition to create 3D interest.
*   **DO** use icons as subtle accents (`minimal, stroked`), not as the primary way to communicate meaning.

### Don't
*   **DON'T** use pure black (#000000) for text. Use `on-surface` (#191C1D) to maintain the "airy" aesthetic.
*   **DON'T** use 1px solid dividers to separate content. It breaks the "Sovereign Curator" flow.
*   **DON'T** use aggressive, saturated red for errors. Use the `error` token (#BA1A1A) which is balanced for our forest green palette.