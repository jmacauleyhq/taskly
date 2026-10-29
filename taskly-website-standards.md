# Taskly — Website & Brand Standards

This document records the current design and implementation decisions for Taskly. Treat these as the defaults when building the website, unless a later decision explicitly changes them.

## 1. Brand identity

- **Product name:** Taskly
- **Style:** Modern, clean, friendly, energetic, and professional.
- **Brand feel:** A simple productivity/task-management product that feels approachable rather than overly corporate.
- **Primary brand colour:** Bright green `#22C55E` (Option 3: Bright & Energetic).

## 2. Colour palette

| Role | Colour | Intended use |
|---|---|---|
| Primary green | `#22C55E` | Main brand colour, logo symbol, primary buttons, highlights |
| Dark green | `#166534` | Dark accents, headings where appropriate, hover states |
| Mint green | `#BBF7D0` | Subtle cards, highlights, secondary surfaces |
| Light lime | `#F7FEE7` | Soft section backgrounds |
| White | `#FFFFFF` | Main page background |
| Near-black green | `#052E16` | Text on bright-green buttons and accents |
| Main text | `#171717` | Primary body text on light backgrounds |

### Colour usage rules

- Use bright green as the recognisable accent, not as the background for every section.
- Prefer white or very light backgrounds, dark readable text, and green accents.
- Use dark green for contrast and hover states.
- Use mint/light lime sparingly for visual grouping and soft backgrounds.
- Maintain sufficient contrast for text and controls. In particular, avoid white text on `#22C55E` for small text; dark text such as `#052E16` is the preferred pairing.
- Keep the palette consistent throughout the site.

## 3. Logo

- Use the Taskly logo in SVG format on the website.
- A **128 × 128** artboard is fine for a square icon SVG; SVG artwork scales without losing sharpness.
- Use a separate, wider SVG for the full logo (icon plus wordmark), if needed.
- Suggested files:
  - `public/taskly-logo.svg` — full logo/wordmark for the navbar.
  - `public/taskly-icon.svg` — square icon for favicon or app icon.
- Keep the artwork well-sized within its viewBox and avoid excessive empty space.
- If the logo needs to be recoloured with CSS, keep its SVG fills editable rather than flattening the artwork.

## 4. Typography

- **Recommended font:** Inter.
- Use Inter consistently across the site for a clean, readable interface.
- Suggested weights:
  - `400` — body text
  - `500` — navigation and supporting UI
  - `600` — buttons and smaller headings
  - `700` — hero and major headings

### Suggested type sizes

These are starting points, not strict limits. Adjust responsively for different screens.

| Element | Suggested desktop size |
|---|---:|
| Hero headline | 56–64 px |
| Section heading | 28–36 px |
| Body text | 16–18 px |
| Navigation links | 14–16 px |
| Buttons | 14–16 px |

Use smaller hero headings on mobile and avoid fixed sizing that causes overflow.

## 5. Layout and homepage

### Navbar

- Keep the navbar clean and easy to scan.
- Place the Taskly logo on the left.
- Place key navigation links and account/action controls on the right as needed.
- Use a white or light background with dark text and the bright-green brand accent.
- Ensure the navbar works on mobile as well as desktop.

### Hero section

The hero is the main section directly below the navbar.

Recommended contents:
1. A clear, large headline describing the main benefit.
2. A short supporting sentence.
3. One primary call-to-action button, such as **Get started**.
4. Optionally, a real preview of the Taskly app/dashboard.

Example copy (placeholder; change as the product becomes clearer):
- Headline: “Get things done. One task at a time.”
- Supporting text: “Organise your tasks, stay focused and make progress every day with Taskly.”
- Button: “Start organising”

### Overall layout principles

- Keep the page uncluttered and give important content room to breathe.
- Use consistent spacing, alignment, and content widths.
- Centre a section when it improves the composition, rather than centring everything by default.
- Design responsively for desktop and mobile.
- Prefer fluid, responsive sizing where appropriate, but use sensible maximum widths and breakpoints to prevent content from becoming too wide.
- Avoid excessive decoration, gradients, and competing accent colours unless deliberately introduced later.

## 6. Buttons and interactive elements

- Primary buttons should use `#22C55E` with dark text such as `#052E16`.
- Use `#166534` for hover states where appropriate.
- Keep button shapes, padding, and typography consistent.
- Make interactive controls clearly identifiable and keyboard accessible.
- Provide visible focus states and ensure text remains readable.

## 7. Next.js implementation

- The site is being built with **Next.js**.
- Use reusable React components for repeated interface elements, such as the navbar and buttons.
- Keep shared design values centralised where practical, such as in CSS variables or Tailwind theme tokens.
- Use semantic HTML elements (`nav`, `main`, `section`, headings, buttons, and links) appropriately.
- Use the SVG logo from the `public` directory, for example:

```jsx
<img src="/taskly-logo.svg" alt="Taskly" />
```

- For typography, use Next.js `next/font` where appropriate so the font can be served locally by the built application.
- Keep components readable and avoid adding abstractions before they are useful.

### Current font setup suggestion

In `app/layout.tsx`, Inter can be loaded with `next/font/google`:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

In `globals.css` with Tailwind CSS:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
}
```

Adapt this to the structure of the existing project rather than replacing working configuration blindly.

## 8. Responsive design

- The site must work well on desktop, tablet, and mobile.
- Avoid relying on a single fixed pixel size for all screens.
- Use fluid sizing when useful, with limits to keep text and layouts comfortable.
- Make sure navigation, buttons, and content do not overflow on narrow screens.
- Test the actual rendered result at more than one viewport size.

## 9. Consistency checklist

Before considering a page finished, check:

- [ ] The bright green `#22C55E` is used consistently as the primary brand accent.
- [ ] Dark text remains readable against light backgrounds and green controls.
- [ ] Inter is used consistently.
- [ ] Spacing and alignment feel intentional.
- [ ] The navbar and hero have a clear hierarchy.
- [ ] The logo SVG displays without excessive whitespace or distortion.
- [ ] Buttons have consistent styles and visible hover/focus states.
- [ ] The page is usable on mobile and desktop.
- [ ] Semantic HTML and accessible labels are used where appropriate.
- [ ] No placeholder content is presented as a finished product feature.

## 10. Decisions that are recommendations, not final requirements

The following are starting suggestions and can be changed as the product develops:

- Exact hero wording and call-to-action.
- Exact spacing, corner radii, and section dimensions.
- Whether the hero includes a dashboard preview.
- Exact font sizes at each breakpoint.
- The full-logo SVG artboard dimensions.

## Summary

Build Taskly as a clean, friendly productivity website using **bright green `#22C55E`**, dark-green accents, light backgrounds, and **Inter** typography. Keep the logo crisp as an SVG, make the navbar and hero clear, and make every page responsive, readable, and consistent.
