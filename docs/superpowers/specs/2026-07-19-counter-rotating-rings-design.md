# Counter-Rotating Concentric Rings Design

## Goal

Replace the two static gold portrait borders in the home hero with four concentric gold rings whose rotation is driven by page scroll. The rings share one fixed center and use asymmetric details so their opposing movement remains visually obvious.

## Interaction

- Map hero scroll progress to ring rotation with Framer Motion.
- Ring 1 rotates clockwise, ring 2 counterclockwise, ring 3 clockwise, and ring 4 counterclockwise.
- Use different rotation ranges to create layered mechanical motion: approximately `1 : -0.82 : 1.18 : -0.68`.
- Apply spring smoothing to scroll progress so rotation eases into position without snapping.
- When scrolling stops, all rings remain at their current angles.
- The portrait and the shared ring center never translate or drift.

## Visual Design

- Render the rings as one responsive SVG positioned around the existing circular portrait.
- Give each ring a distinct asymmetric pattern:
  - outer ring: fine dashed arc, one gap, and a bright node;
  - second ring: separated solid arcs and short radial ticks;
  - third ring: irregular dash groups and two unequal nodes;
  - inner ring: two clearly visible gaps and one luminous marker.
- Use the existing gold tokens (`#D8B46A` and `#C89555`) with restrained cream highlights and soft gold glow.
- Keep line weights fine enough to match the existing celestial style while remaining visible on mobile.
- Preserve floral decorations and portrait content above the ring layer where needed.

## Component Structure

- Add a focused `CounterRotatingRings` component that owns the SVG markup and scroll-linked motion values.
- Pass the hero section reference into the component as the scroll measurement target so moving ring elements never measure themselves.
- Update `HeroSection` to create the section reference, attach it to the hero, remove the two static border spans, and render the new component around the portrait.
- Keep all ring geometry in SVG coordinates with a single `viewBox` center to guarantee alignment.

## Accessibility And Responsive Behavior

- Mark the decorative SVG `aria-hidden="true"` and disable pointer events.
- Under `prefers-reduced-motion`, render the rings at fixed, intentionally offset angles with no scroll-linked movement.
- Scale the SVG with the existing portrait container, maintaining a stable square aspect ratio on mobile and desktop.

## Verification

- Add a focused component test or source-level contract test that verifies four ring groups, alternating directions, and asymmetric SVG patterns before implementation.
- Run the test in its failing state, implement the component, then confirm the test and existing TypeScript build pass.
- Start the Vite site and inspect desktop and mobile layouts while scrolling to verify the center stays fixed, directions alternate, details remain visible, and no content overlaps.
