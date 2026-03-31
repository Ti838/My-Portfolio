# 🚀 Unified Portfolio & Visual Builder

A professional, "Live-First" portfolio system built with **Next.js 14**, **Tailwind CSS**, and **Supabase**. This project features a seamless, WordPress-style visual editing experience integrated directly into the live site, eliminating the need for a separate admin dashboard.

---

## ✨ Key Features

### 🛠️ Live-First Visual Builder
- **Click-to-Edit:** Manage every section of your portfolio (Hero, Bio, Projects, Skills, Experience, Education, Socials) directly from the live interface. No more jumping between a dashboard and the site.
- **Centralized Admin Overlay:** A floating administrative interface for managing global settings, site-wide assets, and incoming messages.

### 🛡️ Robust Architecture (Offline-First Ready)
- **Local Draft Fallback:** Integrated cookie-based "Draft" system lets you edit and save changes even if your database is not configured. Changes are stored locally for 24 hours.
- **Fail-Safe Data Layer:** Robust data fetching ensures the site remains functional even if portions of the backend are unavailable.

### 💼 Professional Showcase
- **Animated Components:** Smooth 3D card flips, entrance animations, and sleek modern typography.
- **Dynamic Content:** Real-time GitHub repo stats and Codeforces rating integration.
- **Dark/Light Mode:** Full pixel-perfect support for both themes.

### 🧰 Integrated Web Tools
- **Image Suite:** Resize, convert, compress, crop & rotate (client-side).
- **PDF Toolkit:** Images→PDF, merge, extract/split by range, rotate (client-side).

### 🔐 Advanced Multi-Factor Security
- **Dynamic Email OTP:** Replaced fixed passwords with a 6-digit code sent to your authorized email via **Resend**.
- **Authenticator App (TOTP):** Mandatory second factor using Google Authenticator for maximum security.
- **Next.js 16 Proxy:** Migrated from `middleware.ts` to `proxy.ts` for future-proof route protection.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor:
```sql
CREATE TABLE auth_otps (
  id TIMESTAMP PRIMARY KEY DEFAULT NOW(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
```

### 3. Environment Setup
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=re_123...
TOTP_SECRET=your_2fa_secret
NOTIFICATION_EMAIL=your@email.com
```

---

## 🎯 Admin Login Flow

1. **Email Step:** Enter your registered email address (`/admin`).
2. **OTP Step:** Enter the 6-digit code sent to your email inbox.
3. **Authenticator Step:** Enter the 6-digit code from your Google Authenticator app.
4. **Access Granted:** You can now use the **Click-to-Edit** feature on any live section.

## 📚 Documentation
- Feature list (truthful): `FEATURES_SPEC.md`
- UI/UX spec: `UIUX_SPEC.md`
- SRS (requirements): `SRS.md`

---

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Backend:** Supabase (Auth, Database, Storage)
- **Icons:** React Icons (Feather)
- **State:** Cookie-based Draft persistence

---
*Created by Timon Biswas.*