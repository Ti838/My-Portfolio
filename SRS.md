# SRS — Timon Biswas Portfolio (Next.js + Supabase)

This Software Requirements Specification (SRS) defines the expected behavior of the portfolio system.
It is written to match the current implemented product (no demo features).

## 1. Purpose
- Provide a public portfolio website.
- Provide a reliable CMS-style editing experience for the owner.
- Provide a secure way to preview/edit/download Resume/CV using 2FA.
- Provide offline/client-side tools that work without paid APIs.

## 2. Scope

### In scope
- Public content pages (Home/About/Projects/Skills/Experience/Education/Achievements/Blog/Contact/Tools)
- Supabase-backed content persistence + Storage uploads
- Admin authentication (password + TOTP)
- Admin builder for CRUD edits
- Resume/CV builder with preview + download
- TOTP-only unlock page for Resume/CV preview/edit/download
- Image and PDF tools (client-side)

### Out of scope
- Paid API dependent converters (e.g., Word→PDF server conversion)
- Background processing/queues (Vercel functions are stateless)

## 3. Definitions
- **Admin session**: HTTP-only cookie `admin_session` set after password+TOTP login.
- **TOTP session**: HTTP-only cookie `totp_session` set after successful TOTP verification (short-lived).
- **Supabase admin client**: server-side client using `SUPABASE_SERVICE_ROLE_KEY`.

## 4. User Roles

### 4.1 Visitor (public)
- Can view all public pages.
- Can use Tools.
- Can submit Contact form.
- Can open Resume/CV download flow at `/admin/download` (but cannot unlock without 2FA code).

### 4.2 Owner/Admin
- Can log in at `/admin` using password + 2FA.
- Can access `/admin/builder` to edit and persist site content.
- Can unlock `/admin/download` using only 2FA.

## 5. Functional Requirements

### 5.1 Public Pages
- The system shall render public pages listed in [FEATURES_SPEC.md](FEATURES_SPEC.md).
- The system shall fetch content from Supabase when configured.
- The system shall fall back to `src/data/portfolio.ts` when Supabase is missing.

### 5.2 Contact
- The system shall accept Contact submissions and store them in Supabase via `/api/contact`.

### 5.3 Admin Login
- The system shall provide `/admin` login UI.
- The system shall verify `ADMIN_PASSWORD`.
- The system shall verify a 6-digit code using `TOTP_SECRET`.
- On success, the system shall set `admin_session` cookie.

### 5.4 Admin Builder
- The system shall restrict `/admin/builder` to valid admin sessions.
- The system shall provide CRUD for:
  - Personal info
  - Projects
  - Achievements
  - Skills
  - Experience
  - Education
  - Social links (if present in UI)
- The system shall upload images to Supabase Storage bucket `portfolio` and store returned public URLs.
- The system shall revalidate affected pages after successful writes.

### 5.5 Resume/CV Builder (Admin)
- The system shall provide a resume builder UI with live preview and PDF download.
- The system shall allow switching between Resume and CV layouts.
- The system shall use the latest website data as initial content.

### 5.6 TOTP-only Resume/CV Preview/Edit/Download
- The system shall provide `/admin/download`.
- The system shall require a valid 6-digit TOTP to unlock editing/downloading.
- The system shall set `totp_session` cookie for a short duration (10 minutes).
- The system shall disable interactions before unlock.
- The system shall auto-fill initial content from the latest website data.

### 5.7 Tools
- The system shall provide Tools landing page with Image Suite and PDF Toolkit.
- The system shall provide working client-side operations listed in [FEATURES_SPEC.md](FEATURES_SPEC.md).

## 6. Non-Functional Requirements

### Security
- Admin pages must be server-guarded (redirect when not authenticated).
- Secrets must be in environment variables, not committed.
- `/admin/setup` should be disabled by removing `TOTP_SETUP_KEY` after setup.

### Reliability
- No “demo” features should be presented as real.
- Where Supabase is not configured, the site remains usable via fallbacks.

### Performance
- Client-side tools should avoid unnecessary heavy server calls.

## 7. Interfaces

### Routes
- `/admin` — admin login (password + TOTP)
- `/admin/builder` — admin dashboard / CMS
- `/admin/download` — TOTP-only unlock + resume builder
- `/api/totp` — verify TOTP and set short-lived cookie
- `/api/admin/setup-totp` — generate secret + QR (guarded by `TOTP_SETUP_KEY`)
- `/api/resume` — retired (410)

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `TOTP_SECRET`
- `TOTP_SETUP_KEY` (temporary)

## 8. Acceptance Criteria (Checklist)

- Admin login requires password + valid TOTP.
- `/admin/builder` is not accessible without admin session.
- `/admin/download` allows unlock with only TOTP and enables preview/edit/download.
- Resume/CV downloads reflect the latest website DB content.
- Tools do not advertise non-working conversions.
