# Rebuild Plan: Interactive 3D Command Portfolio

## Phase 1 - Foundation

- [x] Replace the old visual direction with the ethereal command portfolio system
- [x] Add dark/light/system theme support
- [x] Add public navbar theme toggle
- [x] Add admin dashboard theme toggle
- [x] Add premium SVG logo and SVG favicon
- [x] Add editable home page copy through `personalInfo.stats.siteCopy`

## Phase 2 - 3D Hero

- [x] Build a mouse-reactive 3D command hero with Framer Motion and CSS 3D
- [x] Add floating profile command card
- [x] Add orbiting skill tokens
- [x] Add live stat/focus panels
- [x] Keep the scene responsive and professional

## Phase 3 - Admin CMS Completion

- [ ] Make every remaining public page heading/copy editable
- [ ] Add controls for all nav/footer text
- [ ] Add full image management for profile, logo, projects, education, and achievements
- [ ] Add stronger preview states after admin saves
- [ ] Add validation and empty-state guidance for CMS fields

## Phase 4 - Real Three.js Upgrade

- [x] Install `three`, `@react-three/fiber`, and `@react-three/drei`
- [x] Create `src/components/sections/PortfolioScene3D.tsx`
- [x] Feed owner stats and skill tokens into real 3D cards/orbits
- [x] Add dynamic client-only loading fallback
- [ ] Browser-test desktop and mobile framing

## Phase 5 - Public Section Polish

- [ ] Refine projects into premium editorial cards
- [ ] Polish skills as grouped command modules
- [ ] Improve achievements proof layout
- [ ] Improve contact section conversion
- [ ] Final responsive QA

## Phase 6 - Deployment Readiness

- [ ] Run `npm run build`
- [ ] Review Vercel environment variables
- [ ] Confirm Supabase storage/public URLs
- [ ] Confirm metadata and social sharing assets
- [ ] Final admin login and CMS save test
