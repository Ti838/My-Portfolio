# Timon Biswas Portfolio

Premium personal portfolio, admin CMS, resume builder, blog, contact inbox, and client-side tools built with Next.js.

## Current Design Direction

The public portfolio uses an **Interactive 3D Command Portfolio** direction:

- Premium TB monogram logo and SVG favicon
- Dark, light, and system theme support
- Real 3D command hero built with Three.js, React Three Fiber, Drei, and Framer Motion
- Floating profile card, orbiting skill tokens, command panels, and live stats
- Polished 2D content sections for readability and speed
- Admin panel kept practical and dashboard-like for editing content

## Features

- Dynamic portfolio content from Supabase with static fallback data
- Admin login with email OTP + authenticator TOTP
- Admin editing for personal info, images, projects, stats, and home page copy
- Resume/CV builder and TOTP-only download flow
- Projects, skills, experience, education, achievements, blog, contact, and tools pages
- Image and PDF utilities that work client-side

## Tech Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS + CSS variables
- Framer Motion
- Three.js / React Three Fiber / Drei
- Supabase
- React PDF
- Vercel

## Development

```bash
npm install
npm run dev
npm run build
```

## Brand Assets

- Main logo: `public/images/logo.svg`
- Favicon: `public/favicon.svg`
- PNG favicon fallback: `public/favicon.png`
