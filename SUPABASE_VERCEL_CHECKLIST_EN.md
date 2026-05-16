# Supabase + Vercel Production Readiness Checklist

Use this checklist when the portfolio is already connected to GitHub and Vercel, but the production site still needs a clean Supabase + admin setup. If the repo is wired correctly, a push to the production branch should auto-deploy. The goal here is to make sure the live site actually behaves correctly after deploy.

---

## 0) What You Need To Do First

Before you push again, finish these exact tasks:

1. Set the required Vercel environment variables.
2. Import the Supabase schema SQL files.
3. Create the Supabase Storage bucket named `portfolio`.
4. Confirm the `auth_otps` table exists for admin OTP.
5. Set `NEXT_PUBLIC_SITE_URL` to your live domain.
6. Test `/admin` login and 2FA.
7. Test image upload and contact form save.
8. Run a production build locally if possible.

If any one of these is missing, the website may still deploy, but admin features or data persistence can fail in production.

---

## 1) Vercel Deployment Basics

1. Vercel Dashboard → Project → **Git**
   - Confirm the correct GitHub repo is connected.
   - Confirm the production branch, usually `main`.
2. Push to that branch.
3. Vercel Dashboard → **Deployments**
   - Verify the latest deployment becomes **Ready**.
   - Open the preview or production URL and confirm the app loads.

If the app builds locally but fails in Vercel, the problem is usually an environment variable mismatch or a missing Supabase resource.

---

## 2) Environment Variables to Set in Vercel

Vercel Dashboard → Project → **Settings → Environment Variables**

### Required for core app + admin flows
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `TOTP_SECRET`

### Required for setup / initialization flows
- `TOTP_SETUP_KEY`

### Recommended for public URLs and SEO
- `NEXT_PUBLIC_SITE_URL`

### Optional but useful
- `RESEND_API_KEY` for contact email notifications
- `NOTIFICATION_EMAIL` for where contact form messages should be forwarded

### Notes
- Never expose `SUPABASE_SERVICE_ROLE_KEY` as a `NEXT_PUBLIC_*` variable.
- `NEXT_PUBLIC_SITE_URL` is used by metadata, sitemap, and robots.txt.
- After changing any env var, redeploy so Vercel picks up the new values.

---

## 3) Supabase Database Must Exist

Run the SQL files in Supabase SQL Editor before expecting the admin to work:

- [supabase_schema.sql](supabase_schema.sql)
- [auth_otps.sql](auth_otps.sql)

### Tables expected by this app
- `personal_info`
- `projects`
- `achievements`
- `experiences`
- `education`
- `skills`
- `skill_categories`
- `social_links`
- `messages`
- `auth_otps`
- `blog_posts` if blog content is being used

### Important data and column expectations
- `personal_info` should have the seeded row with `id = 1`.
- `projects.image_url` must exist.
- `personal_info.profile_image`, `personal_info.logo_image`, `personal_info.bio_extended`, and `personal_info.stats` are used by the UI.
- `messages` is required for the contact form inbox.

If one of these tables is missing, the admin panel may fall back to draft mode or throw server errors.

---

## 4) Supabase Storage Setup

Supabase Dashboard → **Storage**

### Required bucket
- Bucket name: `portfolio`

### Recommended settings
- Public access: enabled for portfolio images and assets.
- Use public URLs for images saved from the admin panel.

### What breaks if this is wrong
- Image uploads from admin modals fail.
- Existing image URLs may 404 or fail to render.

---

## 5) RLS and Permissions

This app writes sensitive data server-side using the Supabase service role client. That means:

- Public pages can read with the anon key.
- Admin saves and uploads happen server-side.
- Contact submissions insert into `messages` on the server.

If you enabled Row Level Security, make sure your policies do not block the intended public reads or server-side writes. For a simple portfolio setup, disabling RLS on the app tables is the lowest-friction path.

---

## 6) Admin, OTP, and 2FA

### `/admin`
- Confirm `ADMIN_PASSWORD` is correct in Vercel.
- Confirm `TOTP_SECRET` matches the authenticator app setup.

### `/admin/download`
- The 6-digit TOTP code should unlock the page.
- Session expiry is expected behavior.

### Initial 2FA setup routes
- `/api/admin/setup-totp` requires `TOTP_SETUP_KEY`.
- `/api/admin/verify-setup` also requires `TOTP_SETUP_KEY`.

After 2FA is configured, keep `TOTP_SECRET` set in Vercel and do not leave setup routes exposed any longer than necessary.

---

## 7) Contact Form and Email Delivery

The contact form saves messages to Supabase and optionally sends email notifications with Resend.

### Verify these settings
- `RESEND_API_KEY` exists if email delivery is needed.
- `NOTIFICATION_EMAIL` is set if you want messages forwarded to a fixed inbox.

### If email is not configured
- The form should still save to Supabase.
- Email notifications may simply be skipped.

---

## 8) Production Smoke Test

After deploy, verify these in order:

1. Home page loads and hero content renders.
2. `/projects`, `/skills`, `/education`, `/experience`, and `/achievements` load without errors.
3. `/admin` login works.
4. Make one small content change in admin and save it.
5. Refresh the page and confirm the change persists.
6. Upload an image from admin and confirm the stored URL works after refresh.
7. Submit the contact form and confirm the message appears in Supabase.
8. Confirm sitemap and metadata use the production domain from `NEXT_PUBLIC_SITE_URL`.

---

## 9) Common Failure Points

### Admin save falls back to draft or does not persist
- `SUPABASE_SERVICE_ROLE_KEY` is missing or wrong.
- `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is wrong.
- The target table does not exist in Supabase.

### Image upload fails
- The `portfolio` bucket is missing.
- The bucket is not public or access is blocked.
- The storage URL saved in the database is malformed.

### 2FA always fails
- `TOTP_SECRET` does not match the authenticator setup.
- `TOTP_SETUP_KEY` is wrong during initial setup.
- The server and client are not using the same secret.

### Contact form fails
- `messages` table is missing.
- `SUPABASE_SERVICE_ROLE_KEY` is invalid.
- `RESEND_API_KEY` is missing if you expect email delivery.

---

## 10) Safe Deployment Routine

1. Run a local build first: `npm.cmd run build`
2. Commit and push to the production branch.
3. Confirm the Vercel deployment becomes Ready.
4. Run the smoke test above.

If local build passes and the Supabase resources are present, production deploy should be stable.

---

## 11) Quick Final Checklist

- Vercel env vars are complete.
- Supabase schema is imported.
- `auth_otps` exists.
- `portfolio` storage bucket exists.
- `NEXT_PUBLIC_SITE_URL` matches the live domain.
- Admin login and 2FA are working.
- Contact form saves to Supabase.
- Image uploads save and reload correctly.

### Minimum safe go-live condition
- The home page loads on Vercel.
- The admin login works.
- At least one save from admin persists after refresh.
- The contact form inserts into Supabase.
- Uploaded images stay available after refresh.

---

## 12) Repo-Specific Notes

- Keep brand assets in `public/images/logo.svg` and `public/favicon.svg`.
- Keep editable homepage copy in `personal_info` so admin updates persist.
- If you change the live domain, update `NEXT_PUBLIC_SITE_URL` immediately so sitemap and metadata stay correct.
