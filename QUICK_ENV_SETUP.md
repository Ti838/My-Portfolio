# Quick Reference: Values Location Map

Use this to copy values to the RIGHT place.

---

## Where Each Value Comes From

```
┌─────────────────────────────────────────────────────────┐
│                  SUPABASE DASHBOARD                    │
│                                                         │
│  Settings (gear icon) → API                            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Project URL:                                    │   │
│  │ https://xxxxxxxxxx.supabase.co                  │   │
│  │                                                 │   │
│  │ Project API keys                                │   │
│  │ • anon public: eyJhbGc...                       │   │
│  │ • service_role: eyJhbGc... (longer)             │   │
│  │ • others...                                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
                    COPY THESE 3
                          ↓
┌─────────────────────────────────────────────────────────┐
│              VERCEL ENVIRONMENT VARIABLES               │
│                                                         │
│  Project Settings → Environment Variables              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Key: NEXT_PUBLIC_SUPABASE_URL                   │   │
│  │ Value: https://xxxxxxxxxx.supabase.co           │   │
│  │                                                 │   │
│  │ Key: NEXT_PUBLIC_SUPABASE_ANON_KEY              │   │
│  │ Value: eyJhbGc... (the anon key)                │   │
│  │                                                 │   │
│  │ Key: SUPABASE_SERVICE_ROLE_KEY                  │   │
│  │ Value: eyJhbGc... (the service_role key)        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Then: REDEPLOY                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Copy-Paste Order (DO IN THIS ORDER)

### 1️⃣ Open Supabase
- Go to https://supabase.com/dashboard
- Click your project
- Click **Settings** (gear icon)
- Click **API**

### 2️⃣ Copy Your Project URL
- Find the blue box with "Project URL"
- Click **Copy** button
- Example: `https://xxxxxxxxxx.supabase.co`

### 3️⃣ Go to Vercel
- Go to https://vercel.com/dashboard
- Click your project
- Click **Settings**
- Click **Environment Variables** (left menu)

### 4️⃣ Add First Variable
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Paste the URL you copied
- Click **Save**

### 5️⃣ Copy Anon Key
- Back to Supabase
- Find "Project API keys" section
- Click **Copy** next to "anon public" (the shorter one)
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 6️⃣ Add Second Variable (in Vercel)
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Paste the anon key
- Click **Save**

### 7️⃣ Copy Service Role Key
- Back to Supabase
- In "Project API keys" section
- Click **Copy** next to "service_role" (the LONGER one)
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (much longer)

### 8️⃣ Add Third Variable (in Vercel)
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** Paste the service role key
- Click **Save**

### 9️⃣ Redeploy in Vercel
- Go to **Deployments** tab
- Click your latest deployment
- Click **...** (three dots)
- Click **Redeploy**
- Wait 5-10 minutes

### 🔟 Test in Browser
- Visit your Vercel URL
- Open console (F12)
- Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
- Should show: `https://xxxxxxxxxx.supabase.co`
- If shows `undefined` → Variables not saved, repeat steps

---

## What NOT to Copy

❌ Don't copy the `[brackets]` or `"quotes"`  
❌ Don't add extra spaces  
❌ Don't copy "Project API Keys" label  
❌ Don't copy the key names (anon public, service_role)  
❌ Don't swap anon and service_role keys  

---

## Key Differences

| Key | Visibility | Purpose |
|-----|-----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | **PUBLIC** (in browser) | URL to Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **PUBLIC** (in browser) | Limited read access |
| `SUPABASE_SERVICE_ROLE_KEY` | **SECRET** (server only) | Full admin access |

---

## If You Make a Mistake

1. Go to Vercel → Environment Variables
2. Find the wrong variable
3. Click **...** → **Delete**
4. Re-add it correctly
5. **Redeploy** again

---

## After Adding All 3 Variables

You should see in Vercel:

```
✅ NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxx.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
✅ SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
```

---

## Common Issues

| Problem | Fix |
|---------|-----|
| "undefined" in console | Variables not in Vercel |
| 401 Error in logs | Wrong service_role key (swapped with anon) |
| "Cannot fetch data" | Missing SUPABASE_SERVICE_ROLE_KEY |
| Website shows old content | Not redeployed after adding vars |
| Still shows static data | Database tables might be empty |

---

**Print this page and follow step-by-step. You got this!** 💪
