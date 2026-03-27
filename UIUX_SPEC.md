# UI/UX Spec — Timon Biswas Portfolio

This document describes the current UX (as implemented) so future changes stay consistent.

## Design System (Tokens)

Source of truth:
- CSS variables: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`

### Colors

**Accent (primary brand)**
- Base: `--accent` = `#3b82f6` (Tailwind `accent-500`)
- Light: `--accent-light` = `#60a5fa` (Tailwind `accent-400`)
- Dark: `--accent-dark` = `#1d4ed8` (Tailwind `accent-700`)

**Surfaces (Light mode)**
- `--surface` = `#ffffff`
- `--surface-secondary` = `#f8fafc`
- `--surface-tertiary` = `#f1f5f9`

**Surfaces (Dark mode)**
- `--surface` = `#0f172a`
- `--surface-secondary` = `#1e293b`
- `--surface-tertiary` = `#334155`

**Borders + Text**
- Border: `--border` = `#e2e8f0` (dark: `#1e293b`)
- Text primary: `--text-primary` = `#0f172a` (dark: `#f8fafc`)
- Text secondary: `--text-secondary` = `#475569` (dark: `#94a3b8`)
- Text muted: `--text-muted` = `#94a3b8` (dark: `#475569`)

### Typography

- Body: `DM Sans`
- Display headings: `Cabinet Grotesk` via `.font-display`
- Mono: `JetBrains Mono` via `.font-mono`

### Radius + Shadows

- Radius token: `--radius` = `12px`
- Shadows:
  - `--shadow-sm`, `--shadow-md`, `--shadow-lg`
  - `--shadow-accent` for hover emphasis

### Components (Global utility classes)

- Cards: `.card-base`
  - Uses `--surface-secondary`, `--border`, `--shadow-sm`
  - Hover: accent shadow + slight translate

- Buttons:
  - Primary: `.btn-primary` (accent filled pill)
  - Outline: `.btn-outline` (accent border pill)

- Pills:
  - `.tag-pill` for small section tags

### Animation utilities

- `.animate-fade-up` uses `fadeUp` keyframes
- Tailwind animations also available (see `tailwind.config.ts`): `fade-up`, `fade-in`, `slide-right`, `pulse-slow`

## Design Goals
- Keep the site fast and simple for visitors.
- Make admin editing reliable and clearly separated from public browsing.
- Avoid demo/placeholder tools: only ship features that work offline/client-side.

## Navigation Map

### Public
- Navbar routes: Home, About, Projects, Skills, Experience, Education, Achievements, Blog, Contact, Tools
- Home hero CTA:
  - Primary: Contact / Projects
  - Resume: opens `/admin/download` (TOTP-only unlock)

### Admin
- `/admin` (login)
- `/admin/builder` (admin dashboard with tabs)
  - Portfolio Editor
  - Resume Builder

### TOTP-only Download
- `/admin/download` (2FA unlock → preview/edit → download)

## Screen Specs

### 1) Admin Login (`/admin`)
**Purpose**: Protect full CMS access.

**Steps**
- Step 1: enter password
- Step 2: enter 6-digit TOTP

**Success**
- Create `admin_session` cookie (HTTP-only)
- User can access `/admin/builder`

**Errors**
- Wrong password: show error
- Wrong/expired code: show error

### 2) Admin Builder (`/admin/builder`)
**Guard**
- If not admin, redirect to `/admin`

**Layout**
- Sidebar navigation:
  - Portfolio Editor
  - Resume Builder
- Header with status

**Portfolio Editor**
- Editable inputs for main portfolio data.
- Save buttons persist to DB.
- Image uploads store files to Supabase Storage (`portfolio` bucket) and save public URLs.

**Resume Builder (Admin tab)**
- Split layout:
  - Left: form inputs
  - Right: live PDF preview (desktop)
  - Mobile: floating download button
- Supports layout switch: Resume vs CV
- Download filename depends on layout.

### 3) TOTP Setup (`/admin/setup`)
**Purpose**
- Generate and display a secret + QR.

**Gate**
- Requires `TOTP_SETUP_KEY` in the URL (server verifies it in API).
- After setup, remove the env var to disable generation.

### 4) Resume/CV Download Builder (`/admin/download`)
**Purpose**
- Let the owner unlock and download Resume/CV without admin password.

**Flow**
- Shows a 6-digit TOTP unlock input.
- Before unlock:
  - Resume builder UI is visually dimmed and interaction is disabled.
- After unlock (10 minutes):
  - Resume builder UI becomes interactive.
  - User can preview/edit/download.

**Data rules**
- Initial data is generated from the latest portfolio DB content.
- If Supabase is not configured, falls back to static data.

## UX Rules / Non-Goals
- Do not add new pages or extra “nice to have” UI unless explicitly requested.
- Keep tools accurate: no fake conversions.
