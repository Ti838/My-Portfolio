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
- **PDF/DOCX Converters:** Built-in client-side utilities for DOCX to PDF, PDF to Image, and PDF to Word.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=your_secure_password
TOTP_SECRET=your_2fa_secret
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 🎯 How to Use the Visual Builder

1. **Access Admin Mode:** Navigate to `/admin` on your local or live site.
2. **Authenticate:** Use your configured password and 2FA code.
3. **Hover & Edit:** Once logged in, hovering over any section on the home page or sub-pages will reveal an "Edit" button.
4. **Save & Preview:** Clicking "Edit" opens a dedicated modal for that section. Save your changes to see them reflect instantly.

---

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Backend:** Supabase (Auth, Database, Storage)
- **Icons:** React Icons (Feather)
- **State:** Cookie-based Draft persistence

---
*Created by Timon Biswas.*