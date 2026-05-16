# UI/UX Spec - Timon Biswas Portfolio

This document describes the current design system and UX direction.

## Product Shape

The app has two connected experiences:

- **Public portfolio:** expressive, premium, 3D, memorable.
- **Admin panel:** calm, dense, practical, reliable.

The public site should create a strong first impression, while the admin panel should make editing fast and obvious.

## Visual Identity

### Brand

- Name mark: `TB`
- Main logo: `public/images/logo.svg`
- Favicon: `public/favicon.svg`
- Style: premium monogram, dark glass, cyan/indigo/emerald energy

### Theme

The site supports:

- Dark
- Light
- System

Source:

- `src/components/providers/ThemeProvider.tsx`
- `src/components/ui/ThemeToggle.tsx`
- `src/app/globals.css`

### Color Tokens

Dark mode:

- Background: `#030303`
- Surface: `#080808`
- Elevated: `#0f0f0f`
- Accent: `#6366f1`
- Accent secondary: `#06b6d4`

Light mode:

- Background: `#ffffff`
- Surface: `#fafafa`
- Elevated: `#f4f4f5`
- Accent: `#4f46e5`
- Accent secondary: `#0891b2`

## Typography

- Display: Outfit
- Body: Inter
- Mono: JetBrains Mono

Headings should feel sharp and architectural. Body copy should stay readable and calm.

## Homepage Hero

Direction: **Interactive 3D Command Portfolio**

The hero contains:

- Large name typography
- Editable hero eyebrow and summary
- Mouse-reactive 3D command scene
- Floating profile card
- Orbiting skill tokens
- Command/stat panels
- Dark/light-aware surfaces

Implementation:

- `src/components/sections/Hero.tsx`
- `src/components/sections/PortfolioScene3D.tsx`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- Framer Motion for surrounding page motion

Future upgrade path:

- Add project thumbnails as 3D cards
- Add richer material tuning and reduced-motion fallbacks
- Add browser screenshot QA for desktop and mobile framing

## Admin UX

Admin should prioritize:

- Clear sidebar navigation
- Save states
- Dense forms
- Reliable image upload
- Editable public content without code changes
- No decorative 3D in admin screens

Current editable home copy is stored inside `personalInfo.stats.siteCopy`.

## UX Rules

- Keep 3D tasteful, not game-like.
- Do not sacrifice page speed for visual effects.
- Avoid fake tools or placeholder interactions.
- Public sections can be cinematic; admin screens should be operational.
- Text must not overflow buttons/cards on mobile.
- The first viewport should clearly communicate brand, identity, and technical quality.
