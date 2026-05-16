# Website Manifesto: Interactive 3D Command Portfolio

## Vision

This portfolio should feel like a premium digital command center for Timon Biswas: technical, polished, personal, and memorable.

The goal is not to copy a generic 3D portfolio trend. The goal is to use 3D only where it improves first impression and brand strength, then keep the rest of the site clear, fast, and professional.

## Core Concept

**3D hero + polished 2D content sections**

The homepage hero acts as a floating workspace:

- Profile card as a central command object
- Orbiting skill tokens
- Floating stats and focus panels
- Mouse-reactive 3D tilt
- Scroll-friendly transition into content
- Theme-aware glass and metallic surfaces

The rest of the portfolio stays editorial and readable:

- Projects with strong hierarchy
- Skills as clean grouped cards
- Experience and education as scannable timelines/cards
- Achievements with credible proof
- Contact as a clear conversion point

## Design Principles

- **Premium, not noisy:** motion should feel calm and controlled.
- **Depth with purpose:** 3D supports identity, not distraction.
- **Readable first:** content must remain easy to scan.
- **Admin is operational:** no decorative complexity inside admin workflows.
- **Editable by owner:** text, images, stats, and key home copy should be controlled from admin.

## Technical Direction

Current implementation:

- Next.js App Router
- Tailwind CSS + custom CSS variables
- Framer Motion
- Three.js with `@react-three/fiber`
- `@react-three/drei` helpers for rounded geometry, text, lighting, and controls
- Supabase-backed content
- Theme support with `next-themes`

Future 3D polish:

- Feed live project thumbnails into 3D cards
- Add reduced-motion and mobile performance controls
- Add Spline import option if a `.splinecode` scene is created later

## Brand System

- Logo: premium TB monogram
- Favicon: SVG-first, PNG fallback
- Dark palette: black glass, cyan, indigo, emerald
- Light palette: white glass, soft blue shadows, clean chrome feel
- Typography: Outfit, Inter, JetBrains Mono

## Success Criteria

The site should make a visitor think:

- This developer has taste.
- This developer can build serious interfaces.
- This portfolio is unique but still professional.
- The admin system is practical and maintainable.
