# Features Spec (Truthful) — Timon Biswas Portfolio

This document lists what the site can **actually** do (no demos / no placeholders).

## Public Site

### Pages
- Home (`/`)
- About (`/about`)
- Projects (`/projects`)
- Skills (`/skills`)
- Experience (`/experience`)
- Education (`/education`)
- Achievements (`/achievements`)
- Blog list + post (`/blog`, `/blog/[slug]`)
- Contact (`/contact`)

### Data Source + Fallback
- Primary: Supabase Postgres (server-side reads)
- Fallback: static content in `src/data/portfolio.ts` when Supabase is not configured

### Contact
- Contact form submits to `/api/contact` and stores messages in Supabase.

## Admin (Password + 2FA)

### Login
- Route: `/admin`
- Requires: `ADMIN_PASSWORD` + Google Authenticator 6-digit code (`TOTP_SECRET`)
- Result: sets HTTP-only session cookie `admin_session`

### Builder (CMS)
- Route: `/admin/builder`
- Guard: requires valid `admin_session`
- Capabilities:
  - Edit Personal Info (hero/about, images, quick facts, announcement, etc.)
  - CRUD Projects (create/update/delete + image upload)
  - CRUD Achievements (create/update/delete + image upload)
  - CRUD Experience / Education / Skills
  - Upload assets to Supabase Storage bucket `portfolio` (public)
  - Persists changes to Supabase and triggers revalidation (`revalidatePath`) so public pages refresh

### Resume Builder (inside Admin)
- Inside the Admin dashboard, there is a Resume Builder UI:
  - Live preview (PDF viewer)
  - Edit fields and download PDF
  - Switch Resume vs CV layout

## TOTP-only Resume/CV Preview + Download (No Admin Password)

### Purpose
If you want to download Resume/CV without logging into Admin, you can unlock a builder page using only 2FA.

### Flow
- Route: `/admin/download`
- Step 1: enter Google Authenticator 6-digit code
- Step 2: the site sets a short-lived HTTP-only cookie `totp_session` (10 minutes)
- Step 3: the page unlocks preview/edit/download

### What it uses
- Auto-fills from the latest website data (Supabase DB; falls back to static data when Supabase is missing)
- Uses `@react-pdf/renderer` client-side PDF generation for preview + download

## Admin 2FA Setup

- Route: `/admin/setup`
- Purpose: generate a new TOTP secret/QR using `TOTP_SETUP_KEY`
- Security: remove `TOTP_SETUP_KEY` after setup

## Tools

### Tools Landing
- `/tools` shows two working suites:
  - Image Suite
  - PDF Toolkit

### Image Suite (`/tools/image`)
- Resize
- Convert
- Compress
- Crop & Rotate

### PDF Toolkit (`/tools/pdf`)
- Images → PDF (client-side)
- Merge PDFs (client-side)
- Extract/Split a page range (client-side)
- Rotate all pages (client-side)

## Removed / Retired

- `/api/resume` static storage download endpoint is retired (returns 410).
  - The correct flow is `/admin/download` + `/api/totp` unlock.
